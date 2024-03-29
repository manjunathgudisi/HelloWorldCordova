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
            else {
                PortalURLName = GetURlForIFrame();
                if (PortalURLName == "") {
                    PortalURLName = OneViewGlobalPortalURlName;
                }
            }
            
            /*
            PortalURLName = GetURlForIFrame();
            if (PortalURLName == "") {
                PortalURLName = OneViewGlobalPortalURlName;
            }
            */
          
        

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
    
    setTimeout(function(){ LoadQRcodescanPortalPage();}, 1000);
}


function LoadPatientDetails() {
 alert("LoadPatientDetails =>" +document.getElementsByTagName('iframe')[0].contentWindow.document.getElementById("idPatientDetails"))

var _idPatientDetails=document.getElementsByTagName('iframe')[0].contentWindow.document.getElementById("idPatientDetails");
if(_idPatientDetails!=null){
_idPatientDetails.addEventListener("click", function() {
     cordova.plugins.barcodeScanner.scan(
                     function (result) {
                         if (!result.cancelled) {

                             if (result.format == "QR_CODE") {
                                alert(result.text);
                                //idPatientRef
                                document.getElementsByTagName('iframe')[0].contentWindow.document.getElementById("idPatientRef").value=result.text;
                             }
                         }
                     },
              function (error) {

                  alert("Scanning failed: " + error);
              },
              {
                          "resultDisplayDuration":0
              }
              );


});
    
    setTimeout(function(){ LoadQRcodescanPortalPage(); }, 1000);

}
}

function LoadQRcodescanPortalPage() {
   // alert("QRcodescan =>" + document.getElementsByTagName('iframe')[0].contentWindow.document.getElementById("id_Qr_scane"))
    if (document.getElementsByTagName('iframe')[0] != undefined) {
        var _QRcodescan = document.getElementsByTagName('iframe')[0].contentWindow.document.getElementById("id_Qr_scane");
        if (_QRcodescan != null) {
            _QRcodescan.addEventListener("click", function () {

                //  alert("_idPatientDetails Click");

                cordova.plugins.barcodeScanner.scan(
                    function (result) {
                        if (!result.cancelled) {

                            //if (result.format == "QR_CODE") {
                                //alert(result.text);
                               document.getElementsByTagName('iframe')[0].contentWindow.document.getElementById("idPatientRef").value = result.text;
                             //  var message = "We got a QR_CODE\n" +
                                "Result: " + result.text + "\n" ;
                               
                                
                                //console.log(message);
                                
                               // navigator.notification.alert(message,  ['OK'], "");
                            //}
                        }
                    },
                    function (error) {
                        // ReturnMessage.Text = "Scanning failed: " + error;
                        alert("Scanning failed: " + error);
                    },
                    {
                        "resultDisplayDuration": 0
                    }
                );


            });


        }
    }
}

function GetURlForIFrame() {
    try {
        OneViewConsole.Debug("GetURlForIFrame start", "LandingPageFacade.GetURlForIFrame");
        
        var Url = "";
      
        var ServiceId = OneViewSessionStorage.Get("ServiceId");
        var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

        var _MobileAutoSyncMetadataDAO = new MobileAutoSyncMetadataDAO();
        var BusinessEventDetails = _MobileAutoSyncMetadataDAO.GetBusinessEventEntityByServiceAndUserId(ServiceId, LoginUserId);
        //alert(JSON.stringify(BusinessEventDetails))
        if (BusinessEventDetails.length > 0) {

            for (var i = 0; i < BusinessEventDetails.length; i++) {
                if (BusinessEventDetails[i].ClassName == "IFrameUrl") {
                  
                    var BusinessEventDefinition = BusinessEventDetails[i].BusinessEventDefinition;
                    if (BusinessEventDefinition.BusinessEventEvaluatorObjectKey != "") {
                        Url = BusinessEventDefinition.BusinessEventEvaluatorObjectKey;
                    }
                }

            }

        }
        OneViewConsole.Debug("GetURlForIFrame start", "LandingPageFacade.GetURlForIFrame");
        return Url;
    }
    catch (Excep) {
        return "";
       // throw oOneViewExceptionHandler.Create("GetURlForIFrame", "LandingPageFacade.GetURlForIFrame", Excep);
    }
    finally {
    }
}

