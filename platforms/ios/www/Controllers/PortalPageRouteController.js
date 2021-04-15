// MyPortalController
MyApp.controller('PortalPageRouteController', function ($scope, xlatService, $location, snapRemote, $compile, $rootScope, $timeout, $sce) {
    
    var oPortalPageRouteFacade = new PortalPageRouteFacade($scope, xlatService, $location, snapRemote, $compile, $rootScope, $timeout, $sce);
    oPortalPageRouteFacade.Init();

 
});

// MyPortalFacade
function PortalPageRouteFacade($scope, xlatService, $location, snapRemote, $compile, $rootScope, $timeout, $sce) {    
    

    this.Init = function () {

        try {
            OneViewConsole.Debug("Init start", "MyPortalFacade.Init");             
  
            var reqPage1 = $location.search().reqPage1;
            var reqPage2 = $location.search().reqPage2;
            var PageTitle = $location.search().PageTitle;
           

           // document.getElementById('PageTitle').innerHTML = PageTitle;        
            var Url = 'nav/PortalPageDisplay?reqPage1=' + reqPage1 + '&reqPage2=' + reqPage2 + '&PageTitle=' + PageTitle + '';
    
            if (reqPage2 == "BedPatientMapping") {
                           Url = 'nav/PortalQRCodeScaning?reqPage1=' + reqPage1 + '&reqPage2=' + reqPage2 + '&PageTitle=' + PageTitle + '';
                       }
       
         
           
            

            $location.url(Url);

            
            OneViewConsole.Debug("Init end", "MyPortalFacade.Init");
        }
        catch (Excep) {            
            oOneViewExceptionHandler.Catch(Excep, "MyPortalFacade.Init", xlatService);
        }
    }


}
