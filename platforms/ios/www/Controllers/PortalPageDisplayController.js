// MyPortalController
MyApp.controller('PortalPageDisplayController', function ($scope, xlatService, $location, snapRemote, $compile, $rootScope, $timeout, $sce) {
    
    var oPortalPageDisplayFacade = new PortalPageDisplayFacade($scope, xlatService, $location, snapRemote, $compile, $rootScope, $timeout, $sce);
    oPortalPageDisplayFacade.Init();

    $scope.$on('$destroy', function () {
        oPortalPageDisplayFacade.Destroy();
    });

  
});

// MyPortalFacade
function PortalPageDisplayFacade($scope, xlatService, $location, snapRemote, $compile, $rootScope, $timeout, $sce) {

    var ServiceId = OneViewSessionStorage.Get("ServiceId");   
    var LoginUserName = OneViewSessionStorage.Get("LoginUserName");
    var LoginUserPassword = OneViewSessionStorage.Get("LoginUserPassword");
    var LoginUserOrgName = OneViewSessionStorage.Get("LoginUserOrgName");
    var _oDOM = new DOM();
    

    this.Init = function () {

        try {
            OneViewConsole.Debug("Init start", "MyPortalFacade.Init");
            oSetDefaultSpinner.Start();
            var reqPage1 = $location.search().reqPage1;
            var reqPage2 = $location.search().reqPage2;
            var PageTitleName = $location.search().PageTitle;

            document.getElementById('PageTitle').innerHTML = xlatService.xlat(PageTitleName);

            var PortalURLName = OneViewGlobalPortalURlName;

            if (IsGlobalBlueThermLiveTemperatureIndicatorEnabled == true) {
                _oDOM.SetStyle('divBlueThermLiveTemperatureIndicator', 'display', 'none');
            }

            if (ServiceId == 61) {                
                PortalURLName = "https://winaim.biz/RFLService/Portal/";
            }
            else if (ServiceId == 62) {
                PortalURLName = "https://winaim.biz/PAHTservice/Portal/";
            }
        

            //var url = OneViewGlobalPortalURlName + "Login/MobileLoginRFL?UserName=" + LoginUserName + "&Password=" + LoginUserPassword + "&OrganizationName=" + LoginUserOrgName + "&ServiceId=" + ServiceId + "&reqPage=" + reqPage1 + "/" + reqPage2 + "";
            var url = PortalURLName + "Login/MobileLoginRFL?UserName=" + LoginUserName + "&Password=" + LoginUserPassword + "&OrganizationName=" + LoginUserOrgName + "&ServiceId=" + ServiceId + "&reqPage=" + reqPage1 + "/" + reqPage2 + "";
           // url="https://blog.minhazav.dev/research/html5-qrcode#:~:text=You%20can%20use%20Html5QrcodeScanner%23clear,with%20the%20decoded%20message%20html5QrcodeScanner";
           //var url = "https://jbialobr.github.io/JsQRScanner/";
            //$scope.PortalUrl = $sce.trustAsResourceUrl(url);
            
            addIframe(url);
            
            OneViewConsole.Debug("Init end", "MyPortalFacade.Init");
        }
        catch (Excep) {
            oSetDefaultSpinner.Start();
            oOneViewExceptionHandler.Catch(Excep, "MyPortalFacade.Init", xlatService);
        }
    }
    
    var addIframe = function (url) {
            //alert("addIframe =>" + url);
            var target = document.getElementById("ContentId");
            var newFrame = document.createElement("iframe");
            newFrame.setAttribute("style", "height:100%;width:100%; margin:0px; padding:10px;");
            newFrame.setAttribute("allow", "camera *;");
            newFrame.setAttribute("onLoad", "UploadDone()");
            newFrame.setAttribute("src",url);
            target.appendChild(newFrame);
        }
        
    
    this.Destroy = function () {

        try {
            OneViewConsole.Debug("PortalPageDisplay start", "LandingPageFacade.Destroy");

            if (IsGlobalBlueThermLiveTemperatureIndicatorEnabled == true) {
                _oDOM.SetStyle('divBlueThermLiveTemperatureIndicator', 'display', '');
            }
            oSetDefaultSpinner.Stop();
         
            OneViewConsole.Debug("Destroy end", "PortalPageDisplay.Destroy");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "PortalPageDisplays.Destroy", xlatService);
        }
    }
}

function UploadDone() {
    //alert("UploadDone => UploadDone");
    oSetDefaultSpinner.Stop();
}
