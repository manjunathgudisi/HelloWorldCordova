// ############################################################################################################## //

// Created User : Aiswarya

// Last Updated User : Aiswarya
// Last Updated Date : 17-08-2017
/***********ActionDetailsIdForApprove is hardcoded from ActionFollowupDetailsControllerpage need to check******************** */
/***********ActionDetails Multimedia need to integrate(Resolve Details multimedia integrated but not completed)******************** */

// ############################################################################################################## //


var DcApprovalUIInfo = { IsIndividualDcSummary: true };

var ActionFollowUpApprovalModel = {};



var ApprovalHeaderMessageKey = "";
var ApprovalSuccessMessageKey = "";
var ApprovalUserInfo = {
    "ApprovalUserId": 0,
    "ApprovalUserName": "",
    'IsAllAttributes': false,
    "IsReviewed": false,
    "Latitude": "",
    "Longitude": "",
    "Comments": "",
    "IsMultiMediaAttached": false
   
}


var ApprovalData = {
    ActionDetailsId: 0,
    PlaceId: 0,
    PlaceName: '',
    DcPlaceDimension: '',
    TemplateNodeId: 0,
    IsTemplateView: '',
    AttributeName: '',
    CurrentPage: 0
};

/*var ActionFollowUpOnDeviceApprovalInfo=
        [
            {
            "ActionResolveInfo":
            {
                "Id":3,"ServiceId":19,"ClientGuid":"b35cbc5d-41e1-4fc8-b98d-d66d7d01bdf2","TemplateNodeId":26,
                "TemplateNodeName":"Mobilisation","DcPlaceId":"6","DcPlaceName":"test4","DcPlaceDimension":"16",
                "Score":0,"Percentage":0,"CompletedAttributeCount":0,"TotalAttributeCount":0
            },
            "ActionFollowUpApprovalProfileInfo":
            {
                "ActionFollowUpApprovalProfile":
                {
                    "Id":1,
                    "ServerId":"59587d79d23586870bbe477a","MobileVersionId":1,"OVGuid":0,"Type":"55","Code":"null","ServiceId":19,"DcUserId":35650,"IsAnonymousDcUser":"false",
                    "TemplateNodeId":26,"DcPlaceId":-1,"DcPlaceDimension":"16","DcPlaceType":204,"AdvanceDcPlace":"",
                    "OverallApprovalLevels":1,"OnDeviceApprovalLevels":1,"ValidityStartDate":"","ValidityEndDate":"","TimeStamp":"21-08-2018 10:29:19","VSD":"","VED":""
                },
                "ActionFollowUpApprovalLevelInfo":
                [
                {
                    "Id":1,"MobileVersionId":1,"OVGuid":0,"ServiceId":19,"DcApprovalProfileId":1,"ApprovalIndex":1,"IsAnonymousUser":"false",	
                    "OnDeviceApprovalConfigJSON":
                    "{\"TotalRows\":1,\"MaxNoOfColumn\":1,\"ApprovalHeaderMessageKey\":\"59587d79d23586870bbe477a_1_ApprovalHeaderMessageKey\", \"ApprovalSuccessMessageKey\":\"59587d79d23586870bbe477a_1_ApprovalSuccessMessageKey\",\"SummaryViewConfig\":{\"IsTemplateNameRequired\":true,\"IsDcPlaceNameRequired\":true,\"IsNCCountRequired\":false,\"IsObservationCountRequired\":false, \"IsActionCountRequired\":false,\"IsBlockerCountRequired\":false,\"IsNACountRequired\":true,\"IsESTTimeRequired\":false,\"IsActualTimeRequired\":false,\"IsGPSInfoRequired\":false,\"IsLastUpdatedDateRequired\":false,\"IsScoreRequired\":false,\"IsPercentageRequired\":false,\"IsCommentsRequired\":false,\"IsListviewAnswermodeSummaryRequired\":false,\"IsOtherAnswermodeSummaryRequired\":false},\"OnDeviceApprovalConfigControls\":[{\"Type\":\"TextBoxOtherApprovalInfoControls\",\"RowIndex\":1,\"StatusList\":[\"Approved\",\"Rejected\"],\"ColIndex\":1,\"DisplayOrder\":1,\"IsManadatory\":false,\"LabelKey\":\"Comment\",\"ErrorMessageKey\":\"Comment\"}]}",
                    "IsApprovalPreviewAllowed":"false","IsApprovalReviewAllowed":"false","IsOnDeviceApproval":"true","TimeStamp":"21-08-2018 10:29:19"
                }               
                ],
                "ActionFollowUpApprovalUserDetails":
                [
                {"Id":1,"MobileVersionId":1,"OVGuid":0,"ServiceId":19,"DcApprovalLevelInfoId":1,"DcApprovalProfileId":1,"UserId":35650,"UserName":"MBUser2","TimeStamp":"21-08-2018 10:29:19"}
                ]
            },
            "NextApprovalIndex":1
            }
        ];*/

var ActionFollowUpOnDeviceApprovalInfo;
var oxlatService = null;
var olocation = null;
var oscope = null;

var IsSignatureSupporting = true;

// DcApprovalController
MyApp.controller('ActionFollowUpApprovalController', function ($scope, xlatService, $location, snapRemote, $compile, $rootScope, $timeout) {
    oxlatService=xlatService;
    var _oActionFollowUpApprovalFacade = new ActionFollowUpApprovalFacade({ 'scope': $scope, 'Mylocation': $location, 'xlatService': xlatService, 'compile': $compile, '$timeout': $timeout });
   
    _oActionFollowUpApprovalFacade.Init();
    _oActionFollowUpApprovalFacade.PageLoad();

    $scope.Approve = function () {
        _oActionFollowUpApprovalFacade.Approve();
    }

    $scope.PreviousClick = function () {
        _oActionFollowUpApprovalFacade.PreviousClick();
    }

    $scope.NextClick = function () {
        _oActionFollowUpApprovalFacade.NextClick();
    }

    $scope.Back = function () {            
        _oActionFollowUpApprovalFacade.BackClick();
    }

    $scope.PreviewDC = function () {
        _oActionFollowUpApprovalFacade.PreviewDC();
    }

    $scope.CaptureImage = function () {            
        //_oActionFollowUpApprovalFacade.BackClick();
        var _oAFApprovalDetailsDefaultApprovalInfoControlsAnswerModeComponent=new AFApprovalDetailsDefaultApprovalInfoControlsAnswerModeComponent();
        _oAFApprovalDetailsDefaultApprovalInfoControlsAnswerModeComponent.CaptureImage($scope);
    }
  
});

// DcApprovalFacade
function ActionFollowUpApprovalFacade(parm) {

    var ServiceId = OneViewSessionStorage.Get("ServiceId");
    var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

    var MyInstance = this;
    var $scope = parm.scope;
    var $document = parm.document;
    var $location = parm.Mylocation;
    var xlatService = parm.xlatService;
    var $compile = parm.compile;
    var $timeout = parm.$timeout;   


    var ActionResolveApprovalStatus={IsExist:false,ActionResolveApprovalDataLst:[]};

    var _ActionFollowUpDetailsBO = new ActionFollowUpDetailsBO({ 'scope': $scope, 'xlatService': xlatService, 'compile': $compile, '$timeout': $timeout });
    /// <summary>
    /// Init event registration
    /// </summary>   
    this.Init = function () {

        try {
            OneViewConsole.Debug("Init start", "DcApprovalFacade.Init");         
         
            xlatService.setCurrentPage('23');
            document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');     
            ApprovalUserInfo.ApprovalUserId=OneViewSessionStorage.Get("LoginUserId");

            $scope.DisablePrevious = true;
            $scope.AFApprovalMultiMediaSubElements=[];
           

            OneViewConsole.Debug("Init End", "DcApprovalFacade.Init");
        }
        catch (Excep) {           
            oOneViewExceptionHandler.Catch(Excep, "DcApprovalFacade.Init", xlatService);
        }
    }


    /// <summary>
    /// Page load event registration
    /// </summary>   
    this.PageLoad = function () {

        try {
            OneViewConsole.Debug("PageLoad start", "ActionFollowUpApprovalFacade.PageLoad");

            var ActionDetailsId = $location.search().ActionDetailsId;
            var PlaceId = $location.search().PlaceId;
            var TemplateNodeId=$location.search().TemplateNodeId;
            var MyActionName = $location.search().PlaceName;
            var MyActionIsTemplateView = $location.search().IsTemplateView;
            var AttributeName = $location.search().AttributeName;
            var DcPlaceDimension = $location.search().DcPlaceDimension;
            //alert("ActionDetailsId : "+ActionDetailsId+"....MyActionName : "+MyActionName+"...AttributeName : "+AttributeName);

            $scope.ActionDetailsList = _ActionFollowUpDetailsBO.MakeActionDetailsId(ActionDetailsId);
            var Reqparam={ServiceId:OneViewSessionStorage.Get("ServiceId"),UserId:OneViewSessionStorage.Get("LoginUserId"),"TemplateNodeId":TemplateNodeId,"PlaceId":PlaceId,PlaceDimension:$location.search().DcPlaceDimension,ActionDetailsId:$scope.ActionDetailsList[0]};
            /*var _oActionFollowUpApprovalUIComponent = new ActionFollowUpApprovalUIComponent(parm);
            _oActionFollowUpApprovalUIComponent.LoadHtml(Reqparam);*/

            ActionFollowUpApprovalUILoad(Reqparam);


            if ($scope.ActionDetailsList.length > 0) {
                $scope.CurrentPage = 1;
                $scope.PageCount = $scope.ActionDetailsList.length;
                //alert("$scope.PageCount :"+$scope.PageCount);
                if ($scope.ActionDetailsList.length > 1) {
                    //$scope.DisableNext = false;
                    $scope.NextButton = "Next";
                }
                else {
                    $scope.NextButton = "Close";
                }
            }
            
            MyInstance.LoadApprovalData(ActionDetailsId, PlaceId, MyActionName, DcPlaceDimension, TemplateNodeId, MyActionIsTemplateView, AttributeName);

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
           
            OneViewConsole.Debug("PageLoad End", "ActionFollowUpApprovalFacade.PageLoad");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpApprovalFacade.PageLoad", xlatService);
        }
    }

    var ActionFollowUpApprovalUILoad=function(Req){
        try {
            OneViewConsole.Debug("ActionFollowUpApprovalUILoad start", "ActionFollowUpApprovalFacade.ActionFollowUpApprovalUILoad");
        
            ActionResolveApprovalStatus.ActionResolveApprovalDataLst=[];
            ActionResolveApprovalStatus.IsExist=false;
            $scope.AFApprovalMultiMediaSubElements=[];

            var Reqparam={ServiceId:OneViewSessionStorage.Get("ServiceId"),UserId:OneViewSessionStorage.Get("LoginUserId"),"TemplateNodeId":Req.TemplateNodeId,"PlaceId":Req.PlaceId,PlaceDimension:Req.PlaceDimension,ActionDetailsId:Req.ActionDetailsId};
            var _oActionFollowUpApprovalUIComponent = new ActionFollowUpApprovalUIComponent(parm);
            _oActionFollowUpApprovalUIComponent.LoadHtml(Reqparam);
            ApprovalUserInfo.Comments ="";

             /*-----Load Approval Element if Exist ---------- START-----------*/
             
             var _oAFApprovalUILoadComponent=new AFApprovalUILoadComponent(parm);
             var ApprovalStatus=_oAFApprovalUILoadComponent.GettActionResolveApproval();
          
             
             ActionResolveApprovalStatus.IsExist=ApprovalStatus.IsExist;             
             ActionResolveApprovalStatus.ActionResolveApprovalDataLst=ApprovalStatus.ActionResolveApprovalDataLst;            


             /*-----Load Approval Element if Exist ------------ END-------------*/

            OneViewConsole.Debug("ActionFollowUpApprovalUILoad End", "ActionFollowUpApprovalFacade.ActionFollowUpApprovalUILoad");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpApprovalFacade.ActionFollowUpApprovalUILoad", xlatService);
        }
    }    
   

     /// <summary>
    /// Next
    /// </summary>  
    this.NextClick = function () {
        try { 
            var IsSuccess = MyInstance.Approve();
           // if (IsSuccess == true) {
                if ($scope.NextButton == "Close") {
                    MyInstance.BackClick();
                }
                if ($scope.CurrentPage != $scope.PageCount) {
                    $scope.CurrentPage += 1;
                    ApprovalData.CurrentPage = $scope.CurrentPage;
                    //alert(($scope.CurrentPage - 1)+"..NextClick : "+$scope.ActionDetailsList[$scope.CurrentPage - 1]);
                    var Reqparam = { ServiceId: OneViewSessionStorage.Get("ServiceId"), UserId: OneViewSessionStorage.Get("LoginUserId"), "TemplateNodeId": $location.search().TemplateNodeId, "PlaceId": $location.search().PlaceId, PlaceDimension: $location.search().DcPlaceDimension, ActionDetailsId: $scope.ActionDetailsList[$scope.CurrentPage - 1] };
                    ActionFollowUpApprovalUILoad(Reqparam);
                    $scope.DisablePrevious = false;
                    if ($scope.CurrentPage == $scope.PageCount) {
                        //$scope.DisableNext = true;
                        $scope.NextButton = "Close";
                    }

                }
           // }
          
        }
        catch (Excep) {
           // alert("NextClick: " + JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpApprovalFacade.NextClick", xlatService);
        }
    }


    /// <summary>
    /// Previous
    /// </summary>  
    this.PreviousClick = function () {
        try {
             
            var IsSuccess = MyInstance.Approve();
            //if (IsSuccess == true) {
                if ($scope.CurrentPage > 1) {
                    $scope.CurrentPage -= 1;
                    //alert(($scope.CurrentPage-1 )+"....PreviousClick : "+$scope.ActionDetailsList[$scope.CurrentPage-1]);
                    var Reqparam = { ServiceId: OneViewSessionStorage.Get("ServiceId"), UserId: OneViewSessionStorage.Get("LoginUserId"), "TemplateNodeId": $location.search().TemplateNodeId, "PlaceId": $location.search().PlaceId, PlaceDimension: $location.search().DcPlaceDimension, ActionDetailsId: $scope.ActionDetailsList[$scope.CurrentPage - 1] };
                    ActionFollowUpApprovalUILoad(Reqparam);
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
            //}

            ApprovalData.CurrentPage = $scope.CurrentPage;
           
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpApprovalFacade.PreviousClick", xlatService);
        }
    }


       /// <summary>
    /// Back
    /// </summary>  
    this.BackClick = function () {
        try {

            ApprovalData.CurrentPage = $scope.CurrentPage;
            //var Url = '/ActionFollowupApprovalPlaceSelection';
            var id=$location.search().PlaceId;
            var Name=$location.search().PlaceName;
            var IsTemplateView=$location.search().IsTemplateView;

            var Url = '/ActionFollowUpApprovalSelection?Id=' + id + '&Name=' + Name + '&IsTemplateView=' + IsTemplateView + '';
            //alert(Url);
            $location.url(Url);
            //       var Url = '/ActionFollowUpApproval?ActionDetailsId=' + ActionDetailsId + '&PlaceId=' + $scope.MyActionId + '&PlaceName=' + $scope.MyActionName + '&DcPlaceDimension=' + DcPlaceDimension + '&TemplateNodeId=' + TemplateNodeId + '&IsTemplateView=' + $scope.MyActionIsTemplateView + '&AttributeName=' + AttributeName + '';
   
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpApprovalFacade.BackClick", xlatService);
        }
    }

       /// <summary>
    /// Approve event registration
    /// </summary>   
    this.Approve = function () {

        try {
            OneViewConsole.Debug("Approve start", "ActionFollowUpApprovalFacade.Approve");

            var IsSuccess = false;

            if(document.getElementById("chk_Approved").checked)//************Need to change once different type of approvalconfig adding now will work only for DefaultApprovalInfoControls */
            {
                var _oActionFollowupApprovalBO = new ActionFollowupApprovalBO();

                if(ActionResolveApprovalStatus.IsExist ==true){
                    //************Need to change once different type of approvalconfig adding now will work only for DefaultApprovalInfoControls */
                    var reqparam={Comments:document.getElementById("DefaultApprovalInfoControlsControlId").value,"ActionResolveApprovalMultiMediaInfo": $scope.AFApprovalMultiMediaSubElements,"ActionResolveApprovalDataLst":ActionResolveApprovalStatus.ActionResolveApprovalDataLst};

                    _oActionFollowupApprovalBO.UpdateApprove(reqparam);
                    IsSuccess = true;

                    //alert(xlatService.xlat("Updated Successfully"));
                }
                else{
                    
                var Req = {
                    //"DcOnDeviceApprovalInfo": DcOnDeviceApprovalInfoLst,
                     "ActionResolveOnDeviceApprovalInfo":ActionFollowUpOnDeviceApprovalInfo,
                    "ActionResolveApprovalInfo": ApprovalUserInfo,
                    "ActionResolveOtherApprovalInfo": ActionFollowUpApprovalModel,
                    "ActionResolveApprovalMultiMediaInfo": $scope.AFApprovalMultiMediaSubElements,
                };               
                IsSuccess = _oActionFollowupApprovalBO.Approve(Req);

                if(IsSuccess==true){
                    alert(xlatService.xlat("Approved Successfully"));
                   // $location.url('/ActionFollowUpApprovalSelection');
                }
        
                }
            }
            else{
              //  alert(xlatService.xlat("Please Approve Resolve Action"));

              var _oActionFollowupApprovalBO = new ActionFollowupApprovalBO();
               
              if(ActionResolveApprovalStatus.IsExist ==true){
               
                  var reqparam={Comments:document.getElementById("DefaultApprovalInfoControlsControlId").value,ResolveClientGuid:ActionFollowUpOnDeviceApprovalInfo[0].ActionResolveInfo[0].ClientGuid,"ActionResolveApprovalDataLst":ActionResolveApprovalStatus.ActionResolveApprovalDataLst};
                  _oActionFollowupApprovalBO.DeleteApprove(reqparam);
                  IsSuccess = true;

                  //alert(xlatService.xlat("Updated Successfully"));
              }
            }


            OneViewConsole.Debug("Approve End", "ActionFollowUpApprovalFacade.Approve");
            return IsSuccess;
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpApprovalFacade.Approve", xlatService);
        }
    }

    this.LoadApprovalData = function (ActionDetailsId, MyActionId, MyActionName, DcPlaceDimension, TemplateNodeId, MyActionIsTemplateView, AttributeName) {
        try {
            //alert(ActionDetailsId + "," + MyActionId + "," + MyActionName + "," + DcPlaceDimension + "," + TemplateNodeId + "," + MyActionIsTemplateView + "," + AttributeName);

            ApprovalData.ActionDetailsId = ActionDetailsId;
            ApprovalData.PlaceId = MyActionId;
            ApprovalData.PlaceName = MyActionName;
            ApprovalData.DcPlaceDimension = DcPlaceDimension;
            ApprovalData.TemplateNodeId = TemplateNodeId;
            ApprovalData.IsTemplateView = MyActionIsTemplateView;
            ApprovalData.AttributeName = AttributeName;
            ApprovalData.CurrentPage = $scope.CurrentPage;

           // alert('ApprovalData : ' + JSON.stringify(ApprovalData));
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpDetailsFacade.LoadApprovalData", xlatService);
        }
    }

    this.PreviewDC = function () {
        try {
            OneViewConsole.Debug("PreviewDC Start", "ActionFollowUpApprovalFacade.PreviewDC");

            var TemplateNodeId = 0;
            var DcId;

            // alert('$scope.CurrentPage : ' + $scope.CurrentPage);
            var ActionDetailId = $scope.ActionDetailsList[$scope.CurrentPage - 1];
            if (ActionDetailId != null) {
                var _oActionFollowUpDetailsDAO = new ActionFollowUpDetailsDAO();
                var response = _oActionFollowUpDetailsDAO.GetDcAndTemplateIdFromActionFollowUp(ActionDetailId);

                //alert('response : ' + JSON.stringify(response));
                if (response != null && response.length > 0) {
                    TemplateNodeId = response[0].TemplateNodeId;
                    //alert('TemplateNodeId : ' + TemplateNodeId);

                    var DcData = new DcDAO().GetDcIdByDcServerId(response[0].DataCaptureServerId);

                    if (DcData != null && DcData.length > 0) {
                        DcId = DcData[0].Id;
                        //alert('DcId : ' + DcId);

                        //var ActionDetailsId = $location.search().ActionDetailsId;
                        //var PlaceId = $location.search().PlaceId;
                        //var MyActionName = $location.search().PlaceName;
                        //var MyActionIsTemplateView = $location.search().IsTemplateView;
                        //var AttributeName = $location.search().AttributeName;
                        //var DcPlaceDimension = $location.search().DcPlaceDimension;



                        //    var URL = '/ActionPreview?TemplateId=' + TemplateNodeId + '&DcId=' + DcId + '&PageName=/ActionFollowUpApproval?ActionDetailsId=' + ActionDetailsId + '&PlaceId=' + PlaceId + '&PlaceName=' + MyActionName + '&DcPlaceDimension=' + DcPlaceDimension + '&TemplateNodeId=' + TemplateNodeId + '&IsTemplateView=' + MyActionIsTemplateView + '&AttributeName=' + AttributeName + '';
                        var URL = '/ActionPreview?TemplateId=' + TemplateNodeId + '&DcId=' + DcId + '&PageName=/ActionFollowUpApproval';
                       // alert('URL : ' + URL);
                      
                        $location.url(URL);
                        $scope.$apply();
                    }
                    else {
                        alert('Data capture for preview not found, please contact administrator');
                    }
                }
            }


            OneViewConsole.Debug("PreviewDC End", "ActionFollowUpApprovalFacade.PreviewDC");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpApprovalFacade.PreviewDC", xlatService);
        }
    }

}

function ActionFollowUpApprovalUIComponent(parm){

    var $scope = parm.scope;
    var $document = parm.document;
    var $location = parm.Mylocation;
    var xlatService = parm.xlatService;
    var $compile = parm.compile;
    var $timeout = parm.$timeout;

    var oDOM = new DOM();

    this.LoadHtml = function (Reqparam) {

        try {
            OneViewConsole.Debug("LoadHtml start", "ActionFollowUpApprovalUIComponent.LoadHtml");

            /***********ActionFollowUpApprovalProfile       START******************* */
            //var parm1={ServiceId:OneViewSessionStorage.Get("ServiceId"),UserId:OneViewSessionStorage.Get("LoginUserId"),TemplateNodeId:3,PlaceId:26,PlaceDimension:16};
            var _oActionFollowupApprovalBO=new ActionFollowupApprovalBO();
            ActionFollowUpOnDeviceApprovalInfo=_oActionFollowupApprovalBO.GetActionFollowUpApprovalInfo(Reqparam);

            /***********ActionFollowUpApprovalProfile       END******************* */
           
            var _oGetActionResolveDetailsUIComponent = new GetActionResolveDetailsUIComponent(parm);
            var ActionandResolveDetailsobj=_oGetActionResolveDetailsUIComponent.GetActionandResolveDetails(Reqparam.ActionDetailsId);
            
            var html="";

            if(ActionandResolveDetailsobj.ActionFollowUpDetails !=""){
                html +=GetActionFollowUpDetailsHtml(ActionandResolveDetailsobj.ActionFollowUpDetails);
            }

            if(ActionandResolveDetailsobj.ActionResolveData!=""){
                html +=GetActionResolvewithMultimediaHtml(ActionandResolveDetailsobj.ActionResolveData,ActionandResolveDetailsobj.MultiMediaSubElements);
            }
            
            
           

            
            html +=GetActionFollowUpApprovalProfileHtml(ActionFollowUpOnDeviceApprovalInfo);
            
            

            //html +=GetActionFollowUpApprovalProfileHtml(ActionFollowUpOnDeviceApprovalInfo);
          
            html='<div class="list">'+html+ '</div>';

           
            //oDOM.AddInnerHtml("DcSummartyHtmlContainer", html);
            //alert('html : ' + html);
            var DivId = "DcSummartyHtmlContainer";

            var DivData = document.getElementById(DivId);
            DivData.innerHTML = "";
            // Div.innerHTML = Html;
            var _oOneViewCompiler = new OneViewCompiler();
            _oOneViewCompiler.CompileAndApeend($scope, $compile, html, DivId);


            OneViewConsole.Debug("LoadHtml End", "ActionFollowUpApprovalUIComponent.LoadHtml");           
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpApprovalUIComponent.LoadHtml", xlatService);
        }
    }

    var GetActionFollowUpDetailsHtml=function(ActionFollowUpDetails){
        try {
            OneViewConsole.Debug("GetActionFollowUpDetailsHtml start", "ActionFollowUpApprovalUIComponent.GetActionFollowUpDetailsHtml");
            

            var ActionFollowUpDetailshtml="";            

            if(ActionFollowUpDetails.length>0){

                for (var i = 0; i < ActionFollowUpDetails.length; i++) {                    

                    var DcPlaceNameHierarchyLst=ActionFollowUpDetails[i].DcPlaceNameHierarchyLst;
                    for (var Name in DcPlaceNameHierarchyLst){
                        ActionFollowUpDetailshtml +=GenerateHtml(Name,DcPlaceNameHierarchyLst[Name]);
                    }

                    var FollowUpUserInfo=ActionFollowUpDetails[i].FollowUpUserInfo;
                    for (var User in FollowUpUserInfo){
                        ActionFollowUpDetailshtml +=GenerateHtml(User,FollowUpUserInfo[User]);
                    }

                    ActionFollowUpDetailshtml += GenerateHtml("Source", ActionFollowUpDetails[i].TemplateNodeName);

                   var  DcPlaceName=ActionFollowUpDetails[i].DcPlaceName;

                    if(DcPlaceName !=""){
                        ActionFollowUpDetailshtml += GenerateHtml("Unit",DcPlaceName);
                    }

                    var AttributeNames=ActionFollowUpDetails[i].AttributeNames;
                    if(AttributeNames !=""){
                        var ActionAttributeInfo=JSON.parse(ActionFollowUpDetails[i].ActionAttributeInfo);
                        for (var j=0;j<ActionAttributeInfo.length;j++){
                            ActionFollowUpDetailshtml += GenerateHtml("Attribute", ActionAttributeInfo[j].AttributeNodeName);
                        }
                    }

                    var ActionNCRuleInfo=JSON.parse( ActionFollowUpDetails[i].ActionNCRuleInfo);
                    if(AttributeNames !=""){
                        
                        if(ActionNCRuleInfo.ActualValue !="" && ActionNCRuleInfo.ActualValue !=undefined){
                            ActionFollowUpDetailshtml += GenerateHtml("Captured Value",ActionNCRuleInfo.ActualValue);
                        }
                        if(ActionNCRuleInfo.ExpectedValue !="" && ActionNCRuleInfo.ExpectedValue !=undefined){
                            ActionFollowUpDetailshtml += GenerateHtml("Expected Value",ActionNCRuleInfo.ExpectedValue);
                        }
                        if(ActionNCRuleInfo.DeviatedBy !="" && ActionNCRuleInfo.DeviatedBy !=undefined){
                            ActionFollowUpDetailshtml += GenerateHtml("Deviation from Expected",ActionNCRuleInfo.DeviatedBy);
                        }
                        if (ActionNCRuleInfo.ActionResponsibleFor != "" && ActionNCRuleInfo.ActionResponsibleFor != undefined) {
                            ActionFollowUpDetailshtml += GenerateHtml("Responsibility", ActionNCRuleInfo.ActionResponsibleFor);
                        }
                    }



                    var ActionName="";

                    if (ActionFollowUpDetails[i].CustomAction == "") {
                        ActionName = ActionFollowUpDetails[i].PredefinedActionName;
                    }
                    else {
                        ActionName = ActionFollowUpDetails[i].CustomAction;
                    }

                     ActionFollowUpDetailshtml +=GenerateHtml("Action",ActionName);
                     ActionFollowUpDetailshtml +=GenerateHtml("Raised By",ActionFollowUpDetails[i].ActionRaisedUserName);
                     ActionFollowUpDetailshtml +=GenerateHtml("Raised Date",ActionFollowUpDetails[i].ActionRaisedDate);
                     if(ActionFollowUpDetails[i].RectificationTime !="" || ActionFollowUpDetails[i].RectificationTime !=null){
                         ActionFollowUpDetailshtml += GenerateHtml("Due date", ActionFollowUpDetails[i].RectificationTime);
                     }
                     
                }

            }

            var PreviewButtonhtml = "";
            var ServiceId = OneViewSessionStorage.Get("ServiceId");
            if (ServiceId != 36) {
                PreviewButtonhtml =  '<div style="float:right"  ng-click="PreviewDC()"><i class="icon icon-eye"></i>' + xlatService.xlat("  Preview") + '</div>' 
            }

            ActionFollowUpDetailshtml = '<div class="item item-divider">' + xlatService.xlat("Action Details") + PreviewButtonhtml + '</div>' + ActionFollowUpDetailshtml;
           //alert("ActionFollowUpDetailshtml 0000: "+ActionFollowUpDetailshtml);
  
            OneViewConsole.Debug("GetActionFollowUpDetailsHtml End", "ActionFollowUpApprovalUIComponent.GetActionFollowUpDetailsHtml");   
            
            return ActionFollowUpDetailshtml;
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpApprovalUIComponent.GetActionFollowUpDetailsHtml", xlatService);
        }
    }

    var GetActionResolvewithMultimediaHtml=function(ActionResolveData,MultiMediaSubElements){
        try {
            OneViewConsole.Debug("GetActionResolveHtml start", "ActionFollowUpApprovalUIComponent.GetActionResolveHtml");
            
            
            var ActionResolvehtml=""; 

            if(ActionResolveData.length>0){

                for(var r=0;r<ActionResolveData.length;r++){
                    if(ActionResolveData[r].Comments!=""){
                        ActionResolvehtml +=GenerateHtml("Comments",ActionResolveData[r].Comments);
                    }                    
                    if (ActionResolveData[r].FollowUpUserName != "") {
                        ActionResolvehtml += GenerateHtml("Resolved By", ActionResolveData[r].FollowUpUserName);
                    }
                    if(ActionResolveData[r].ActionResolveDate!=""){
                        ActionResolvehtml +=GenerateHtml("Resolve Date",ActionResolveData[r].ActionResolveDate);
                    }
                    
                }

            }

            
            if(MultiMediaSubElements!=""){

                if (MultiMediaSubElements.length > 0) {                    
                  var MultiMediaSubElementshtml ="";
                  
                  for (var m = 0; m < MultiMediaSubElements.length ; m++) {
                    var LocalURL = "'" + MultiMediaSubElements[m].LocalURL + "'";                
                    MultiMediaSubElementshtml += '' +
                    ' <a href="{{' + LocalURL + '}}" class="angularbox"><img src=' + LocalURL + ' rel=' + LocalURL + ' alt="No Image"></a>' ;                   
                  }                  
                  //ActionResolvehtml +=' <div class="row margin-bottom"><div class="col rounded light-bg cam-photo">'+MultiMediaSubElementshtml+  '</div></div>' ;
                  ActionResolvehtml +='<div class="item no-padding"><div class="row"><div class="col col-33 padding stable-bg border-right text-right">' + xlatService.xlat("Evidences") + ' </div><div class="col rounded light-bg cam-photo">'+MultiMediaSubElementshtml+  '</div></div></div>' ;
                }
                //ActionResolvehtml +=ActionResolvehtml1;
             }
           
             if(ActionResolvehtml!=""){
                 ActionResolvehtml = '<div class="item item-divider">' + xlatService.xlat("Resolution Details") + '</div>' + ActionResolvehtml;
             }
  
            // alert('ActionResolvehtml : ' + ActionResolvehtml);
            OneViewConsole.Debug("GetActionResolveHtml End", "ActionFollowUpApprovalUIComponent.GetActionResolveHtml");   
            
            return ActionResolvehtml;
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpApprovalUIComponent.GetActionResolveHtml", xlatService);
        }
    }

    var GetActionFollowUpApprovalProfileHtml=function(ActionFollowUpOnDeviceApprovalInfo){
        try {
            OneViewConsole.Debug("GetActionFollowUpApprovalProfileHtml start", "ActionFollowUpApprovalUIComponent.GetActionFollowUpApprovalProfileHtml");
            
            var ActionFollowUpApprovalLevelInfo=ActionFollowUpOnDeviceApprovalInfo[0].ActionFollowUpApprovalProfileInfo.ActionFollowUpApprovalLevelInfo;
            var ActionFollowUpOnDeviceApprovalConfigControls;
            var Html="";

            if(ActionFollowUpApprovalLevelInfo.length>0){

                for(var i=0;i<ActionFollowUpApprovalLevelInfo.length;i++){

                    var OnDeviceApprovalConfigJSON = JSON.parse(ActionFollowUpApprovalLevelInfo[i].OnDeviceApprovalConfigJSON);
                  
                    ActionFollowUpOnDeviceApprovalConfigControls = OnDeviceApprovalConfigJSON.OnDeviceApprovalConfigControls;
                    break;

                }

                if (ActionFollowUpOnDeviceApprovalConfigControls.length > 0) {

                    var _oActionFollowUpApprovalDetailsAnswerModeComponent = new ActionFollowUpApprovalDetailsAnswerModeComponent(parm);                    
                    _oActionFollowUpApprovalDetailsAnswerModeComponent.CreateModel (ActionFollowUpOnDeviceApprovalConfigControls);      

                   for (var i = 0; i < ActionFollowUpOnDeviceApprovalConfigControls.length; i++) {
                    Html += _oActionFollowUpApprovalDetailsAnswerModeComponent.GetHtml(ActionFollowUpOnDeviceApprovalConfigControls[i]);
                   }
                   
                }
                else {
                    alert( xlatService.xlat("OnDevice Action FollowUp approval configuration not found. Please contact administrator"));
                }

            }
            var Html = '<div class="title-bar rounded margin-top">' + xlatService.xlat("Review Details") + '</div>' + Html;

            OneViewConsole.Debug("GetActionFollowUpApprovalProfileHtml End", "ActionFollowUpApprovalUIComponent.GetActionFollowUpApprovalProfileHtml"); 
            return Html;
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpApprovalUIComponent.GetActionFollowUpApprovalProfileHtml", xlatService);
        }
    }

    var GenerateHtml = function (Name, Data) {
        try {
            OneViewConsole.Debug("GenerateHtml start", "ActionFollowUpApprovalUIComponent.GenerateHtml");
           
            var Html = '<div class="item no-padding">' +
                      '<div class="row">' +
                      '<div class="col col-33 padding stable-bg border-right text-right">' + xlatService.xlat(Name) + ' </div>' +
                      '<div class="col padding" style="white-space:normal;">' + xlatService.xlat(Data) + '</div>' +
                      '</div>' +
                      '</div>';
            

            OneViewConsole.Debug("GenerateHtml end", "ActionFollowUpApprovalUIComponent.GenerateHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowUpDetailsBO.GenerateHtml", Excep);
        }
        finally {
            Result = null;
            ActionFollowUpList = null;
        }
    }
    
    var GenerateMultimediaHtml = function () {
        try {
            OneViewConsole.Debug("GenerateMultimediaHtml start", "ActionFollowUpApprovalUIComponent.GenerateMultimediaHtml");
           
            var Html = 
                '<div class="item no-padding" ng-show="ActionMultiMediaSubElements.length">'+
                    '<div class="row">'+
                    '<div class="col col-33 padding stable-bg border-right text-right">' + xlatService.xlat(Attachments) + '</div>'+
                    '<div class="col rounded light-bg cam-photo">'+
                    '<div ng-repeat="Element in ActionMultiMediaSubElements">      '+
                    ' <a href="{{Element.LocalURL}}" class="angularbox"><img src="{{Element.LocalURL}}" alt="No Image"></a>'+
                    '</div>  '+           
                    '</div>'+
                    '</div>'+
                    '</div>';

         
            return Html;

            OneViewConsole.Debug("GenerateMultimediaHtml end", "ActionFollowUpApprovalUIComponent.GenerateMultimediaHtml");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("ActionFollowUpApprovalUIComponent", "ActionFollowUpApprovalUIComponent.GenerateMultimediaHtml", Excep);
        }
        
    }

}


function GetActionResolveDetailsUIComponent(parm){

    var $scope = parm.scope;
    var $document = parm.document;
    var $location = parm.Mylocation;
    var xlatService = parm.xlatService;
    var $compile = parm.compile;
    var $timeout = parm.$timeout;

    var _ActionFollowUpDetailsBO = new ActionFollowUpDetailsBO({ 'scope': $scope, 'xlatService': xlatService, 'compile': $compile, '$timeout': $timeout });

    this.GetActionandResolveDetails = function (ActionDetailsIds) {

        try {
            OneViewConsole.Debug("GetActionandResolveDetails start", "GetActionDetailsUIComponent.GetActionandResolveDetails");

            var ActionandResolveDetails={"ActionFollowUpDetails":"",ActionResolveData:"",MultiMediaSubElements:""};
        
            //ActionDetailsIdForApprove="22,";
            //$scope.ActionDetailsList = _ActionFollowUpDetailsBO.MakeActionDetailsId(ActionDetailsIds);          

            //For ActionFollowUpPage
            var _oActionFollowUpDetailsDAO = new ActionFollowUpDetailsDAO();
            var ActionFollowUpDetails = _oActionFollowUpDetailsDAO.GetActionFollowUpDetailsByActionDetailsId(ActionDetailsIds,OneViewSessionStorage.Get("LoginUserId"));
         
            if(ActionFollowUpDetails.length>0){
                
                ActionandResolveDetails.ActionFollowUpDetails=ActionFollowUpDetails;               
                ActionandResolveDetails.ActionFollowUpDetails[0]["DcPlaceNameHierarchyLst"]=GenerateMaterializedPathLst(ActionFollowUpDetails[0].DcPlaceNameHierarchy);   
                ActionandResolveDetails.ActionFollowUpDetails[0]["FollowUpUserInfo"]=GenerateMaterializedPathLst(ActionFollowUpDetails[0].FollowUpUserInfo);                             
               
            }

            //For ActionResolve Data
            var _oActionResolveDAO = new ActionResolveDAO();
            var ActionResolveData = _oActionResolveDAO.GetActionResolveId(ActionDetailsIds);

            if(ActionResolveData.length>0){
                ActionFollowUpOnDeviceApprovalInfo[0].ActionResolveInfo=ActionResolveData;
                ActionandResolveDetails.ActionResolveData=ActionResolveData; 

                //For MultiMediaSubElements Data
                var MultiMediaSubElements=GetMultimediaSubElements(ActionResolveData[0].ClientGuid);
                ActionandResolveDetails.MultiMediaSubElements=MultiMediaSubElements;
                //alert("ActionResolveInfo :"+JSON.stringify(ActionFollowUpOnDeviceApprovalInfo[0].ActionResolveInfo));
            }
            
            return ActionandResolveDetails;
           
            OneViewConsole.Debug("GetActionandResolveDetails End", "GetActionDetailsUIComponent.GetActionandResolveDetails");           
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "GetActionDetailsUIComponent.GetActionandResolveDetails", xlatService);
        }
    }


    var GenerateMaterializedPathLst = function (MaterializedPathLst) {
        try {
            OneViewConsole.Debug("GenerateMaterializedPathLst start", "GetActionDetailsUIComponent.GenerateMaterializedPathLst");
            
            var MaterializedPathLstobj={};
            if(MaterializedPathLst !=""  && MaterializedPathLst.indexOf(",")!=-1){

                var MaterializedPathLstArray = MaterializedPathLst.split(",");
          
                for (var i = 0; i < MaterializedPathLstArray.length; i++) {

                    var MaterializedPathHierarchyDetails = MaterializedPathLstArray[i].split("$$");               
                     
                    var Index = MaterializedPathHierarchyDetails.indexOf(":");
                    if (Index !=-1) {  
                        
                        var Displaystatus="true";

                        var DisplayIndex = MaterializedPathHierarchyDetails.indexOf("=");

                        if(DisplayIndex !=-1)
                        {
                        
                    		if(MaterializedPathHierarchyDetails[(DisplayIndex - 1)]=="IsDisplay"){
                            	var Displayvalue=MaterializedPathHierarchyDetails[(DisplayIndex + 1)];
                                if(Displayvalue=="true" || Displayvalue=="false"){
                                	Displaystatus=Displayvalue;
                                }
                            }   
                     		
                        }

                        if(Displaystatus=="true"){
                            var key=MaterializedPathHierarchyDetails[(Index - 1)];
                            var keyvalue=MaterializedPathHierarchyDetails[(Index + 1)];
                            MaterializedPathLstobj[key] = keyvalue;
                        }

                    }
                } 
            }
            OneViewConsole.Debug("GenerateMaterializedPathLst end", "GetActionDetailsUIComponent.GenerateMaterializedPathLst");

            return MaterializedPathLstobj;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("GetActionDetailsUIComponent", "GetActionDetailsUIComponent.GenerateMaterializedPathLst", Excep);
        }
        finally {
       
        }
    }


    var GetMultimediaSubElements = function (MappedClientGuid) {
        try {
            OneViewConsole.Debug("GetMultimediaSubElements start", "GetActionDetailsUIComponent.GetMultimediaSubElements");

            var MultiMediaSubElements = [];
            if (MappedClientGuid != "") {
            
                var _oMultiMediaSubElementsDAO = new MultiMediaSubElementsDAO();
                var MultiMediaSubElementsResult = _oMultiMediaSubElementsDAO.GetMultiMediaSubElements(MappedClientGuid);
               
                for (var i = 0; i < MultiMediaSubElementsResult.length; i++) {

                    MultiMediaSubElements.push({
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
            
            OneViewConsole.Debug("GetMultimediaSubElements start", "GetActionDetailsUIComponent.GetMultimediaSubElements");

            return MultiMediaSubElements;
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "GetActionDetailsUIComponent.GetMultimediaSubElements", xlatService);
        }
    }


}

function ActionFollowUpApprovalDetailsAnswerModeComponent(parm) {

    var oxlatService = parm.xlatService;

    this.GetHtml = function (OnDeviceApprovalControlConfig) {

        try {
            OneViewConsole.Debug("GetHtml start", "ActionFollowUpApprovalDetailsAnswerModeComponent.GetHtml");

            var Html = '';           
            //var  ActionResolveApprovalLst = GettActionResolveApproval();
            if (OnDeviceApprovalControlConfig.Type == "DefaultApprovalInfoControls") {
                Html = new AFApprovalDetailsDefaultApprovalInfoControlsAnswerModeComponent().GetHtml(OnDeviceApprovalControlConfig);
             
            }
           else{
             //  alert("Not Implemented");
           }

            OneViewConsole.Debug("GetHtml End", "ActionFollowUpApprovalDetailsAnswerModeComponent.GetHtml");

            return Html;
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ActionFollowUpApprovalDetailsAnswerModeComponent.GetHtml", oxlatService);
        }
    }

    this.CreateModel = function (OnDeviceApprovalConfigControls) {

        try {
            OneViewConsole.Debug("CreateModel start", "DcApprovalDetailsUIComponent.CreateModel");

            ActionFollowUpApprovalModel = {};

            for (var i = 0; i < OnDeviceApprovalConfigControls.length; i++) {

                ActionFollowUpApprovalModel[OnDeviceApprovalConfigControls[i].Type] = {
                    OnDeviceApprovalControlConfig: OnDeviceApprovalConfigControls[i],
                    Answer: "",
                    AnswerValue: "",
                    Comment:""
                }
            }
            
            OneViewConsole.Debug("CreateModel End", "DcApprovalDetailsUIComponent.CreateModel");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcApprovalDetailsUIComponent.CreateModel", xlatService);
        }
    }

    var GettActionResolveApproval=function(){
        try {
            OneViewConsole.Debug("ActionFollowUpApprovalExist start", "DcApprovalFacade.ActionFollowUpApprovalExist");

            /*-----Checking already approved or not START-----------*/
       
            var ResolveClientGuid=ActionFollowUpOnDeviceApprovalInfo[0].ActionResolveInfo[0].ClientGuid;
            var ReParam={ActionResolveClientGuid:ResolveClientGuid};   
            var _oActionFollowUpApprovalDAO=new ActionFollowUpApprovalDAO();
            var ActionResolveApprovalLst =_oActionFollowUpApprovalDAO.GetActionResolveApprovalByActionResolveClientGuid(ReParam);
            //alert("GettActionResolveApproval : "+JSON.stringify(ActionResolveApprovalLst));
          

            /*-----Checking already approved or not END-------------*/
           
            OneViewConsole.Debug("ActionFollowUpApprovalExist End", "DcApprovalFacade.ActionFollowUpApprovalExist");

            return ActionResolveApprovalLst; 
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcApprovalFacade.ActionFollowUpApprovalExist", oxlatService);
        }
    }

}


// AFApprovalDetailsDefaultApprovalInfoControlsAnswerModeComponent  DefaultApprovalInfoControls
function AFApprovalDetailsDefaultApprovalInfoControlsAnswerModeComponent() {

    var MyInstance = this;
    //var oxlatService = parm.xlatService;
    var _oAFApprovalCameraAnswerModeComponent=new AFApprovalCameraAnswerModeComponent();

    this.GetHtml = function (OnDeviceApprovalControlConfig) {

        try {
            OneViewConsole.Debug("GetHtml start", "AFApprovalDetailsDefaultApprovalInfoControlsAnswerModeComponent.GetHtml");
            var LabelName = OnDeviceApprovalControlConfig.LabelKey;
            var Type = "'" + OnDeviceApprovalControlConfig.Type + "'";
            

            var Html=MyInstance.GetStatusListHtml(OnDeviceApprovalControlConfig.StatusList,Type);
      
            Html += '<div class="row no-padding responsive-sm multi-col custom-view">' +
                        '<div class="col rounded light-bg">' +
                        '<div class="field-item">' +
                        '<label>' +
                        '<span>' + oxlatService.xlat(LabelName) + '</span>' +
                        '<input type="text" id="' + OnDeviceApprovalControlConfig.Type + 'ControlId" oninput="new AFApprovalDetailsDefaultApprovalInfoControlsAnswerModeComponent().Set(this.value, ' + Type + ',true)">' +
                       // '<input type="text" id="' + OnDeviceApprovalControlConfig.Type + 'ControlId">' +
                        '</label>' +
                        '</div>' +
                        '</div>' +
                        ' </div>';

                Html += MyInstance.GetMultiMediaHtml();
            OneViewConsole.Debug("GetHtml End", "AFApprovalDetailsDefaultApprovalInfoControlsAnswerModeComponent.GetHtml");
            
            return Html;
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "AFApprovalDetailsDefaultApprovalInfoControlsAnswerModeComponent.GetHtml", oxlatService);
        }
    }

    this.GetStatusListHtml = function (StatusList,Type) {
        try {
            OneViewConsole.Debug("GetMultiMediaHtml Start", "AFApprovalDetailsDefaultApprovalInfoControlsAnswerModeComponent.GetMultiMediaHtml");
           
            var Html="";
            for(var i=0;i<StatusList.length;i++){
                var StatusName=StatusList[i];
                Html +=
                '<div class="item item-checkbox">' +
                '<label class="checkbox">' +
                '    <input type="checkbox" id="chk_'+StatusName+'" onclick="new AFApprovalDetailsDefaultApprovalInfoControlsAnswerModeComponent().Set('+StatusName+', ' + Type + ',false)">' +
                '</label>' + oxlatService.xlat(StatusName) +               
                '</div>' ;

            }
           
            OneViewConsole.Debug("GetMultiMediaHtml End", "AFApprovalDetailsDefaultApprovalInfoControlsAnswerModeComponent.GetMultiMediaHtml");          
            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "AFApprovalDetailsDefaultApprovalInfoControlsAnswerModeComponent.GetHtml", Excep);
        }
    }


    this.GetMultiMediaHtml = function () {
        try {
            OneViewConsole.Debug("GetMultiMediaHtml Start", "AFApprovalDetailsDefaultApprovalInfoControlsAnswerModeComponent.GetMultiMediaHtml");
           
            var Html ='<div class="title-bar rounded">{{"MultiMedia Details" | xlat}}</div>'+
                        '<div class="row margin-bottom"><div class="col rounded light-bg cam-photo">'+
                        '<div ng-repeat="ApprovalMultiMediaSubElement in AFApprovalMultiMediaSubElements">' +
                        '<a href="{{ApprovalMultiMediaSubElement.LocalURL}}" class="angularbox" ><img src="{{ApprovalMultiMediaSubElement.LocalURL}}" alt="{{ApprovalMultiMediaSubElement.AlternateName}}"></a>' +
                        '</div>' +
                        '<a class="button" ng-click="CaptureImage();"><i class="icon icon-camera"></i> {{"Add" | xlat}}</a>'+
                        '</div></div>';

            OneViewConsole.Debug("GetMultiMediaHtml End", "AFApprovalDetailsDefaultApprovalInfoControlsAnswerModeComponent.GetMultiMediaHtml");          
            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "AFApprovalDetailsDefaultApprovalInfoControlsAnswerModeComponent.GetHtml", Excep);
        }
    }

    this.Set = function (Answer, Type,IsComment,StatusName) {

        try {
            OneViewConsole.Debug("Set start", "AFApprovalDetailsDefaultApprovalInfoControlsAnswerModeComponent.Set");
            
            if(IsComment=='true'||IsComment==true){

                ApprovalUserInfo.Comments =Answer;   
                //alert(Answer+"....."+ApprovalUserInfo.Comments);

                if(document.getElementById("chk_Approved").checked){
                    ActionFollowUpApprovalModel[Type].Answer = "Approved";
                }
               
            }
            else{
                ActionFollowUpApprovalModel[Type].Answer = Answer;
            }        
            
            OneViewConsole.Debug("Set End", "AFApprovalDetailsDefaultApprovalInfoControlsAnswerModeComponent.Set");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "AFApprovalDetailsDefaultApprovalInfoControlsAnswerModeComponent.Set", oxlatService);
        }
    }
    
    this.CaptureImage = function (scope) {
        try {
            OneViewConsole.Debug("CaptureImage Start", "AFApprovalDetailsDefaultApprovalInfoControlsAnswerModeComponent.CaptureImage");
           
            var _oOneViewCordovaCameraPlugin = new OneViewCordovaCameraPlugin();
            _oOneViewCordovaCameraPlugin.CaptureImage(function (LocalURL) {              
               // MyInstance.UpdateAnswerModel(_ImageURL);
               
               
               var Picture = {
                "Id":0,
                "ClientId": '',
                "ClientGuid": '',
                "ServerId": 0,
                "MappedEntityClientGuid": '',
                "Dimension":  DATEntityType.ActionFollowUpStatusApproval,
                "MultiMediaType": "image/jpg",
                "LocalURL": LocalURL,
                "AlternateName": "No Image",
                "Comments": "",
                "IsDisabled": false,
            }
           
            scope.AFApprovalMultiMediaSubElements.push(Picture);            
            scope.$apply();

            });

            OneViewConsole.Debug("CaptureImage End", "AFApprovalDetailsDefaultApprovalInfoControlsAnswerModeComponent.CaptureImage");
        }
        catch (Excep) {            
            throw oOneViewExceptionHandler.Create("Framework", "AFApprovalDetailsDefaultApprovalInfoControlsAnswerModeComponent.CaptureImage", Excep);
        }
    }


   
}

function AFApprovalCameraAnswerModeComponent() {

    this.AFApproveMultiMediaSubElementsList = [];

    var CreateMultiMediaElement = function (_ImageURL) {
        try {
            OneViewConsole.Debug("CreateMultiMediaElement Start", "AFApprovalCameraAnswerModeComponent.CreateMultiMediaElement");

            var MultiMediaElement = {
                "Id": 0,
                "ServerId": 0,
                "MappedEntityClientGuid": "",//""
                //"Dimension": DATEntityType.ActionFollowUpStatusApproval,
                "Dimension": 103,
                "MultiMediaType": "image/jpg",
                "LocalURL": _ImageURL,
                "Comments": "",
                "IsDisabled": false,
            };

            AFApproveMultiMediaSubElementsList.push(MultiMediaElement);

            OneViewConsole.Debug("CreateMultiMediaElement End", "AFApprovalCameraAnswerModeComponent.CreateMultiMediaElement");
            //return MultiMediaElement;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "AFApprovalCameraAnswerModeComponent.CreateMultiMediaElement", Excep);
        }
    }

    var LoadMultimediaSubElements = function (MappedClientGuid) {
        try {
            OneViewConsole.Debug("LoadMultimediaSubElements Start", "AFApprovalCameraAnswerModeComponent.LoadMultimediaSubElements");

            

            OneViewConsole.Debug("LoadMultimediaSubElements Start", "AFApprovalCameraAnswerModeComponent.LoadMultimediaSubElements");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "AFApprovalCameraAnswerModeComponent.LoadMultimediaSubElements", xlatService);
        }
    }

 
}

function AFApprovalUILoadComponent(parm){
    var xlatService = parm.xlatService;
    var $scope = parm.scope;

    this.GettActionResolveApproval=function(){
        try {
            OneViewConsole.Debug("ActionFollowUpApprovalExist start", "AFApprovalUILoadComponent.ActionFollowUpApprovalExist");

            var ApprovalStatus={IsExist:false,ActionResolveApprovalDataLst:[]};
            /*-----Checking already approved or not START-----------*/
       
            var ResolveClientGuid=ActionFollowUpOnDeviceApprovalInfo[0].ActionResolveInfo[0].ClientGuid;
            var ReParam={ActionResolveClientGuid:ResolveClientGuid};   
            var _oActionFollowUpApprovalDAO=new ActionFollowUpApprovalDAO();
            var ActionResolveApprovalLst =_oActionFollowUpApprovalDAO.GetActionResolveApprovalByActionResolveClientGuid(ReParam);
            
          
            if(ActionResolveApprovalLst.length>0){
                
                 //************Need to change once different type of approvalconfig adding now will work only for DefaultApprovalInfoControls */
                if(ActionResolveApprovalLst[0].ApprovalStatus==1 || ActionResolveApprovalLst[0].ApprovalStatus=="1"){
                    document.getElementById("chk_Approved").checked=true;
                }                
                document.getElementById("DefaultApprovalInfoControlsControlId").value=ActionResolveApprovalLst[0].Comments;

                
                
                ApprovalStatus.IsExist=true;
                ApprovalStatus.ActionResolveApprovalDataLst.push(ActionResolveApprovalLst[0]);

                GettActionResolveApprovalMultiMedia(ActionResolveApprovalLst[0].ClientGuid);
            }
      
           
            OneViewConsole.Debug("ActionFollowUpApprovalExist End", "AFApprovalUILoadComponent.ActionFollowUpApprovalExist");

            return ApprovalStatus; 
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "AFApprovalUILoadComponent.ActionFollowUpApprovalExist", xlatService);
        }
    }

    var GettActionResolveApprovalMultiMedia=function(ActionResolveApprovalClientGuid){
        try {
            OneViewConsole.Debug("GettActionResolveApprovalMultiMedia start", "AFApprovalUILoadComponent.GettActionResolveApprovalMultiMedia");  

            var _oMultiMediaSubElementsDAO = new MultiMediaSubElementsDAO();
            var ApprovalMultiMediaSubElementsResult = _oMultiMediaSubElementsDAO.GetMultiMediaSubElements(ActionResolveApprovalClientGuid);

            if(ApprovalMultiMediaSubElementsResult.length>0){                

                for (var i = 0; i < ApprovalMultiMediaSubElementsResult.length; i++) {

                    $scope.AFApprovalMultiMediaSubElements.push({
                        "Id": ApprovalMultiMediaSubElementsResult[i].Id,
                        "MappedEntityClientGuid": ApprovalMultiMediaSubElementsResult[i].MappedEntityClientGuid,
                        "Dimension": ApprovalMultiMediaSubElementsResult[i].Dimension,
                        "MultiMediaType": "image/jpg",
                        "LocalURL": ApprovalMultiMediaSubElementsResult[i].LocalURL,
                        "AlternateName": "No Image",
                        "Comments": ApprovalMultiMediaSubElementsResult[i].Comments,
                        "IsDisabled": false,
                    });
                }

            }

           
            OneViewConsole.Debug("GettActionResolveApprovalMultiMedia End", "AFApprovalUILoadComponent.GettActionResolveApprovalMultiMedia");

            //return ActionResolveApprovalLst; 
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "AFApprovalUILoadComponent.GettActionResolveApprovalMultiMedia", xlatService);
        }
    }
}




