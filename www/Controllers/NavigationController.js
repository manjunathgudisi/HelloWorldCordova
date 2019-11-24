

//////////////////////////////////***************************************Nav Controller START************************************/////////////////////////////////////////////////////

MyApp.controller('NavController', function ($scope, $routeSegment, loader, xlatService, $compile) {

    var _oNavigationFacade = new NavigationFacade({ 'scope': $scope, 'xlatService': xlatService, 'compile': $compile });
    _oNavigationFacade.Init();
    _oNavigationFacade.PageLoad();

    $scope.$on('$destroy', function () {
        _oNavigationFacade.Destroy();
    });

});


//////////////////////////////////***************************************Nav Controller END************************************/////////////////////////////////////////////////////




function NavigationFacade(parm) {

    var MyInstance = this;
    var $scope = parm.scope;
    var $compile = parm.compile;
    var xlatService = parm.xlatService;
    var oDefaultMenuComponent = new DefaultMenuComponent();

    this.Init = function () {
        try {
            OneViewConsole.Debug("Init start", "NavigationFacade.Init");

            xlatService.setCurrentPage('10');
            oDefaultMenuComponent.LoadMetadata();

            OneViewConsole.Debug("Init end", "NavigationFacade.Init");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "NavigationFacade.Init", xlatService);
        }
        finally {

        }
    }

    this.PageLoad = function () {
        try {
            OneViewConsole.Debug("PageLoad start", "NavigationFacade.PageLoad");


            // Menu Loading
            var _oDefaultMenuComponent = new DefaultMenuComponent();
            _oDefaultMenuComponent.ResetMenu($scope, $compile);

            OneViewConsole.Debug("PageLoad end", "NavigationFacade.PageLoad");
        }
        catch (Excep) {
            //alert("NavigationFacade Excep : " + Excep + "  *  " + JSON.stringify(Excep))
            oOneViewExceptionHandler.Catch(Excep, "NavigationFacade.PageLoad", xlatService);
        }
        finally {
        }
    }


    this.Destroy = function () {
        try {
            OneViewConsole.Debug("Destroy start", "NavigationFacade.Destroy");

            oDefaultMenuComponent.Destroy();

            OneViewConsole.Debug("Destroy end", "NavigationFacade.Destroy");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "NavigationFacade.Destroy", xlatService);
        }
        finally {

        }
    }
}
