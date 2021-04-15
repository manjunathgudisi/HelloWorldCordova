// MyPortalController
MyApp.controller('PortalQRCodeScaningController', function ($scope, xlatService, $location, snapRemote, $compile, $rootScope, $timeout, $sce) {
    //alert("PortalQRCodeScaningController");
    var oPortalQRCodeScaningFacade = new PortalQRCodeScaningFacade($scope, xlatService, $location, snapRemote, $compile, $rootScope, $timeout, $sce);
    oPortalQRCodeScaningFacade.Init();


    $scope.QRCodeClickEvent = function () {
        oPortalQRCodeScaningFacade.QRCodeClickEvent();
    }
 
});

// MyPortalFacade
function PortalQRCodeScaningFacade($scope, xlatService, $location, snapRemote, $compile, $rootScope, $timeout, $sce) {
    
    var ServiceId = OneViewSessionStorage.Get("ServiceId");
    var LoginUserName = OneViewSessionStorage.Get("LoginUserName");
    var LoginUserPassword = OneViewSessionStorage.Get("LoginUserPassword");
    var LoginUserOrgName = OneViewSessionStorage.Get("LoginUserOrgName");
    var _Url = "";

    this.Init = function () {

        try {
            OneViewConsole.Debug("Init start", "MyPortalFacade.Init");             
  //alert("Init")
            var reqPage1 = $location.search().reqPage1;
            var reqPage2 = $location.search().reqPage2;
            var PageTitle = $location.search().PageTitle;
           
            var ServiceId = OneViewSessionStorage.Get("ServiceId");
            if (ServiceId == 61) {
                PortalURLName = "https://winaim.biz/RFLService/Portal/";
            }
            else if (ServiceId == 62) {
                PortalURLName = "https://winaim.biz/PAHTservice/Portal/";
            }
            _Url = PortalURLName + "Login/MobileLoginRFL?UserName=" + LoginUserName + "&Password=" + LoginUserPassword + "&OrganizationName=" + LoginUserOrgName + "&ServiceId=" + ServiceId + "&reqPage=" + reqPage1 + "/" + reqPage2 + "";
            //alert(_Url);

           // document.getElementById('PageTitle').innerHTML = PageTitle;        
           // var Url = 'nav/PortalQRCodeScaning?reqPage1=' + reqPage1 + '&reqPage2=' + reqPage2 + '&PageTitle=' + PageTitle + '';
           // $location.url(Url);
            //_Url = 'nav/PortalPageDisplay?reqPage1=' + reqPage1 + '&reqPage2=' + reqPage2 + '&PageTitle=' + PageTitle + '';

            
            OneViewConsole.Debug("Init end", "MyPortalFacade.Init");
        }
        catch (Excep) {
            //alert(Excep);
            oOneViewExceptionHandler.Catch(Excep, "MyPortalFacade.Init", xlatService);
        }
    }

    this.QRCodeClickEvent = function () {
        try {
            OneViewConsole.Debug("QRCodeClickEvent Start", "NewDcFacadeNew.QRCodeClickEvent");

            OpenQRCodeReader();

            OneViewConsole.Debug("QRCodeClickEvent End", "NewDcFacadeNew.QRCodeClickEvent");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "NewDcFacadeNew.QRCodeClickEvent", xlatService);
        }
    }

    var OpenQRCodeReader = function () {

        try {
            OneViewConsole.Debug("OpenBarcodeReader start", "DcApprovalDetailsAnswerModeComponent.OpenBarcodeReader");
     
  
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    alert("We got a barcode\n" +
                          "Result: " + result.text + "\n" +
                          "Format: " + result.format + "\n" +
                          "Cancelled: " + result.cancelled);
                },
                function (error) {
                    alert("Scanning failed: " + error);
                },
                {
                    preferFrontCamera : true, // iOS and Android
                    showFlipCameraButton : true, // iOS and Android
                    showTorchButton : true, // iOS and Android
                    formats : "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
                    //orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
                    disableAnimations : true, // iOS
                    disableSuccessBeep: false // iOS and Android
                }
             );
    
            
            
            
      
            
             OneViewConsole.Debug("OpenBarcodeReader End", "DcApprovalDetailsAnswerModeComponent.OpenBarcodeReader");
        }
        catch (Excep) {
            alert("Excep For QRScan ==>  "+Excep);
            oOneViewExceptionHandler.Catch(Excep, "DcApprovalDetailsAnswerModeComponent.OpenBarcodeReader", oxlatService);
        }
    }
}


