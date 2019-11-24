var FormattedTemplateConfigMetadataForTesco = {};
MyApp.controller("ActionPreviewController", function ($scope, $location, xlatService, $compile) {

    var _oActionPreviewFacade = new ActionPreviewFacade({'scope' : $scope,'location':  $location, 'xlatService' :  xlatService, 'compile' : $compile});
    _oActionPreviewFacade.Init();
    _oActionPreviewFacade.PageLoad();

    $scope.Back = function () {
        _oActionPreviewFacade.Back();
    }


    ShowAttributeInfo = function (AttributeId, DcClientGuid) {
        _oActionPreviewFacade.ShowAttributeInfo(AttributeId, DcClientGuid);
    }

    $scope.HideAttributeInfo = function () {        
        _oActionPreviewFacade.HideAttributeInfo();
    }
    
    $scope.$on('$destroy', function () {
        _oActionPreviewFacade.Destroy();
    });

});

var DcPreviewMetadata = {};
function ActionPreviewFacade(param) {

    var scope = param.scope;
    var location = param.location;
    var xlatService = param.xlatService;
    var compile = param.compile;
    var _oActionPreviewUIComponent = new ActionPreviewUIComponent(param);

    this.Init = function () {
        try {
            OneViewConsole.Debug("Init Start", "DcPreviewFacade.Init");

            document.getElementById('PageTitle').innerHTML = "Preview";

            OneViewConsole.Debug("Init End", "DcPreviewFacade.Init");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcPreviewFacade.Init", xlatService);
        }
    }

    this.PageLoad = function () {
        try {
            OneViewConsole.Debug("PageLoad Start", "DcPreviewFacade.PageLoad");           


            ////********Get DcPreviewMetadata*****////
            var ServiceId = OneViewSessionStorage.Get("ServiceId");
            var DcPlaceId = 0;
            var DcPlaceDimension = -1;
            var TemplateId = location.search().TemplateId;
            var DcUserId = OneViewSessionStorage.Get("LoginUserId");
       
            
            if (DcApprovalUIInfo.IsIndividualDcSummary == false) {
                _oActionPreviewUIComponent.LoadHtmlForDcLst({ 'DcPlaceId': DcPlaceId, 'DcPlaceDimension': DcPlaceDimension });
            }
            else {


                //Req : ServiceId, DcUserId, TemplateNodeId, DcPlaceId, DcPlaceDimension
                _oActionPreviewUIComponent.GetDcPreviewMetadata(ServiceId, DcPlaceId, DcPlaceDimension, TemplateId, DcUserId);

                //alert('location.search().TemplateId : ' + location.search().TemplateId);
                //alert('location.search().DcId : ' + location.search().DcId);
                _oActionPreviewUIComponent.LoadHtml({ 'TemplateId': location.search().TemplateId, 'DcId': location.search().DcId });
            }
            
            OneViewConsole.Debug("PageLoad End", "DcPreviewFacade.PageLoad");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcPreviewFacade.PageLoad", xlatService);
        }
    }

    this.Back = function () {
        try {
            OneViewConsole.Debug("Back Start", "DcPreviewFacade.Back");

            var PageName = location.search().PageName;
         
            if (PageName != undefined) {              
                if (PageName == '/ActionFollowUpApproval') {                   
                    PageName = PageName + '?ActionDetailsId=' + ApprovalData.ActionDetailsId + '&PlaceId=' + ApprovalData.PlaceId + '&PlaceName=' + ApprovalData.PlaceName + '&DcPlaceDimension=' + ApprovalData.DcPlaceDimension + '&TemplateNodeId=' + ApprovalData.TemplateNodeId + '&IsTemplateView=' + ApprovalData.IsTemplateView + '&AttributeName=' + ApprovalData.AttributeName + '&CurrentPage=' + ApprovalData.CurrentPage + '';                   
                  //  var Url = '/ActionFollowUpApproval?ActionDetailsId=' + ActionDetailsId + '&PlaceId=' + $scope.MyActionId + '&PlaceName=' + $scope.MyActionName + '&DcPlaceDimension=' + DcPlaceDimension + '&TemplateNodeId=' + TemplateNodeId + '&IsTemplateView=' + $scope.MyActionIsTemplateView + '&AttributeName=' + AttributeName + '';
                }
                else {
                    PageName = PageName + '?ActionDetailsId=' + FollowupPageData.ActionDetailsId + '&Id=' + FollowupPageData.Id + '&Name=' + FollowupPageData.Name + '&IsTemplateView=' + FollowupPageData.IsTemplateView + '&AttributeName=' + FollowupPageData.AttributeName + '&CurrentPage=' + FollowupPageData.CurrentPage + '';
                }
                //alert('22 PageName : ' + PageName);
                location.url(PageName);
            }
            else {
                location.url('/my-approval');
            }

            OneViewConsole.Debug("Back End", "DcPreviewFacade.Back");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcPreviewFacade.Back", xlatService);
        }
    }

    this.ShowAttributeInfo = function (AttributeId, DcClientGuid) {
        try {
            OneViewConsole.Debug("ShowAttributeInfo Start", "DcPreviewFacade.ShowAttributeInfo");            
            _oActionPreviewUIComponent.ShowAttributeInfo(AttributeId, DcClientGuid);

            OneViewConsole.Debug("ShowAttributeInfo End", "DcPreviewFacade.ShowAttributeInfo");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcPreviewFacade.ShowAttributeInfo", xlatService);
        }
    }

    this.HideAttributeInfo = function () {
        try {
            OneViewConsole.Debug("HideAttributeInfo Start", "DcPreviewFacade.HideAttributeInfo");

            _oActionPreviewUIComponent.HideAttributeInfo();

            OneViewConsole.Debug("HideAttributeInfo End", "DcPreviewFacade.HideAttributeInfo");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcPreviewFacade.HideAttributeInfo", xlatService);
        }
    }

    this.Destroy = function () {
        try {
            OneViewConsole.Debug("Destroy Start", "DcPreviewFacade.Destroy");

            DcResultDetailsDict = {};
            HtmlForTesco = "";
            PeriodicTemplateConfigMetadata = {};
            FormattedTemplateConfigMetadataForTesco = {};
            //TemplateGroupIdForTesco = "";
            OneViewConsole.Debug("Destroy End", "DcPreviewFacade.Destroy");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcPreviewFacade.Destroy", xlatService);
        }
    }
}


