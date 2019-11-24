// MyPortalController
MyApp.controller('MyPortalController', function ($scope, xlatService, $location, snapRemote, $compile, $rootScope, $timeout, $sce) {
    
    var oMyPortalFacade = new MyPortalFacade($scope, xlatService, $location, snapRemote, $compile, $rootScope, $timeout, $sce);
    oMyPortalFacade.Init();

    $scope.LoadNewDC = function () {
        oMyPortalFacade.LoadNewDC();
    }
});

// MyPortalFacade
function MyPortalFacade($scope, xlatService, $location, snapRemote, $compile, $rootScope, $timeout, $sce) {

    var ServiceId = OneViewSessionStorage.Get("ServiceId");   
    var LoginUserName = OneViewSessionStorage.Get("LoginUserName");
    var LoginUserPassword = OneViewSessionStorage.Get("LoginUserPassword");
    var LoginUserOrgName = OneViewSessionStorage.Get("LoginUserOrgName");       
    

    this.Init = function () {

        try {
            OneViewConsole.Debug("Init start", "MyPortalFacade.Init");
           
            //xlatService.setCurrentPage('12');
            //document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');
            document.getElementById('PageTitle').innerHTML = "My Portal";

            var DcPlaceId = OneViewSessionStorage.Get("DcPlaceId");
            var DcPlaceMasterId = 0;

            var _oOrganizationAssetsNodeDAO = new DefaultMasterDAO("OrganizationAssetsNode");
            var AssetsNode = _oOrganizationAssetsNodeDAO.GetByServerId(DcPlaceId);         
            var DATType = '';
            if (AssetsNode.length > 0) {
                DATType = AssetsNode[0].ChildDbElementType;
                var _oRcoMasterDAO = new DefaultMasterDAO("RcoMasterEntity");
                var Rco = _oRcoMasterDAO.GetByServerId(AssetsNode[0].ChildDbElementId);
               
                if (Rco.length > 0) {
                    DcPlaceMasterId = Rco[0].ServerId;
                }
            }
            
            var url = OneViewGlobalPortalURlName + "Login/MobileLogin?UserName=" + LoginUserName + "&Password=" + LoginUserPassword + "&OrganizationName=" + LoginUserOrgName + "&ServiceId=" + ServiceId + "&DATType=" + DATType + "&reqPage=MasterManagementView/DynamicPageConfigForMobile/" + DcPlaceMasterId;
            //alert('url : ' + url);
            //$scope.PortalUrl = $sce.trustAsResourceUrl("http://10.20.25.6:8090/OneViewDev/Portal/");
            //alert(OneViewGlobalPortalURlName + "Login/MobileLogin?UserName=" + LoginUserName + "&Password=" + LoginUserPassword + "&OrganizationName=" + LoginUserOrgName + "&ServiceId=" + ServiceId + "&reqPage=DynamicPageConfig/RCOMaster_TCFM_Employee_mobile/" + DcPlaceMasterId);
            // $scope.PortalUrl = $sce.trustAsResourceUrl(OneViewGlobalPortalURlName + "Login/MobileLogin?UserName=" + LoginUserName + "&Password=" + LoginUserPassword + "&OrganizationName=" + LoginUserOrgName + "&ServiceId=" + ServiceId + "&reqPage=DynamicPageConfig/RCOMaster_TCFM_Employee_mobile/" + DcPlaceMasterId);
            $scope.PortalUrl = $sce.trustAsResourceUrl(url);
            
            OneViewConsole.Debug("Init end", "MyPortalFacade.Init");
        }
        catch (Excep) {            
            oOneViewExceptionHandler.Catch(Excep, "MyPortalFacade.Init", xlatService);
        }
    }


    this.LoadNewDC = function () {
        try {
            OneViewConsole.Debug("LoadNewDC Start", "MyPortalFacade.LoadNewDC");

            if (OneViewSessionStorage.Get("LandingPageEditForm") == 'true') {
                var LandingPageViewInfo = OneViewSessionStorage.Get("LandingPageViewInfo");
                if (LandingPageViewInfo != null) {
                    LandingPageViewInfo = JSON.parse(LandingPageViewInfo);
                    $location.url(LandingPageViewInfo.BackRouteKey);
                }
            }
            else {
                $location.url('/newdc');
            }
            OneViewConsole.Debug("LoadNewDC End", "MyPortalFacade.LoadNewDC");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MyPortalFacade.LoadNewDC", xlatService);
        }
    }
}