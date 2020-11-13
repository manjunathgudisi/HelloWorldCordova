

/// <summary>
/// BlueThermLiveTemperatureIndicator controller (For event registration)
/// </summary>
MyApp.controller('BlueThermLiveTemperatureIndicatorController', function ($scope, xlatService) {
    
  
   
    var oBlueThermLiveTemperatureIndicatorFacade = new BlueThermLiveTemperatureIndicatorFacade({ 'scope': $scope, 'xlatService': xlatService});
    oBlueThermLiveTemperatureIndicatorFacade.Init();
    oBlueThermLiveTemperatureIndicatorFacade.PageLoad();

    $scope.GetProbeStatus = function () {    
        oBlueThermLiveTemperatureIndicatorFacade.GetProbeStatus();
    }

    $scope.GetNewProbeStatus = function () {
        oBlueThermLiveTemperatureIndicatorFacade.GetNewProbeStatus();
    }
    $scope.ConnectProbe = function () {
       
        oBlueThermLiveTemperatureIndicatorFacade.ConnectProbe();
    }

    $scope.$on('$destroy', function () {
        
    });
});


/// <summary>
/// BlueThermLiveTemperatureIndicator Facade / Work flow / Assembler
/// </summary>
function BlueThermLiveTemperatureIndicatorFacade(parm) {

    // BlueThermLiveTemperatureIndicatorFacade object
    OneViewConsole.Debug("BlueThermLiveTemperatureIndicatorFacade Start", "Facade.BlueThermLiveTemperatureIndicatorFacade");

    var MyInstance = this;
    var $scope = parm.scope;
    var xlatService = parm.xlatService;

    this.Init = function () {
        try {
            OneViewConsole.Debug("Init Start", "BlueThermLiveTemperatureIndicatorFacade.Init");

             //xlatService.setCurrentPage('15');

            OneViewConsole.Debug("Init End", "BlueThermLiveTemperatureIndicatorFacade.Init");
        }

        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "BlueThermLiveTemperatureIndicatorFacade.Init", xlatService);
        }
    }


    this.PageLoad = function () {
        try {
            OneViewConsole.Debug("PageLoad Start", "BlueThermLiveTemperatureIndicatorFacade.PageLoad");

            OneViewConsole.Debug("PageLoad End", "BlueThermLiveTemperatureIndicatorFacade.PageLoad");
        }

        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "BlueThermLiveTemperatureIndicatorFacade.PageLoad", xlatService);
        }
    }


    this.GetProbeStatus = function () {
        try {
            OneViewConsole.Debug("GetProbeStatus Start", "BlueThermLiveTemperatureIndicatorFacade.GetProbeStatus");
                       
            var _oSettingsBO = new SettingsBO();
            _oSettingsBO.ProbeStatus('', xlatService);

            OneViewConsole.Debug("GetProbeStatus End", "BlueThermLiveTemperatureIndicatorFacade.GetProbeStatus");
        }

        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "BlueThermLiveTemperatureIndicatorFacade.GetProbeStatus", xlatService);
        }
    }

    this.GetNewProbeStatus = function () {
        try {
            OneViewConsole.Debug("GetNewProbeStatus Start", "BlueThermLiveTemperatureIndicatorFacade.GetNewProbeStatus");

            var _oSettingsBO = new SettingsBO();
            _oSettingsBO.ProbeStatus('', xlatService);

            OneViewConsole.Debug("GetNewProbeStatus End", "BlueThermLiveTemperatureIndicatorFacade.GetNewProbeStatus");
        }

        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "BlueThermLiveTemperatureIndicatorFacade.GetNewProbeStatus", xlatService);
        }
    }

    this.ConnectProbe = function () {
        try {
            OneViewConsole.Debug("ConnectProbe Start", "BlueThermLiveTemperatureIndicatorFacade.ConnectProbe");
            oSetDefaultSpinner.Start();
            if (OneViewLocalStorage.Get("SHUTDOWNProbeDetails") != null) {
                var SHUTDOWNProbeDetails = JSON.parse(OneViewLocalStorage.Get("SHUTDOWNProbeDetails"));
              
                var _oBluetoothOnValidation = new BluetoothOnValidation();
                var oDefaultValidationResponse = _oBluetoothOnValidation.Validate($scope, xlatService);
                
                if (oDefaultValidationResponse.IsSuccess == true) {
                    if (SHUTDOWNProbeDetails[0].Name != undefined) {

                        var ProbeName = SHUTDOWNProbeDetails[0].Name;

                        var _oOneViewAppInfoPlugin = new OneViewAppInfoPlugin();
                        var ProbeDetails = _oOneViewAppInfoPlugin.ConnectNewProbe(ProbeName);

                        if (ProbeDetails.ConnectionState.toUpperCase().trim() == "CONNECTING") {
                        
                            ProbeDetails = _oOneViewAppInfoPlugin.ConnectNewProbe(ProbeName);
                            if (ProbeDetails.ConnectionState.toUpperCase().trim() == "CONNECTED") {
                                navigator.notification.alert(xlatService.xlat('ProbeConnectedSuccesfully'), ['OK'], "");
                                ConnectedProbe[0] = { "Index": 1, "Id": ProbeName, "Name": ProbeName };
                                DeleteProbeDetails();

                            }

                        }
                        else if (ProbeDetails.ConnectionState.toUpperCase().trim() == "CONNECTED") {
                            navigator.notification.alert(xlatService.xlat('ProbeConnectedSuccesfully'), ['OK'], "");
                            ConnectedProbe[0] = { "Index": 1, "Id": ProbeName, "Name": ProbeName };
                           
                            DeleteProbeDetails();
                        }
                        else if (ProbeDetails.ConnectionState.toUpperCase().trim() == "DISCONNECTED") {
                            navigator.notification.alert(xlatService.xlat('IN-MG-MSE-004 :: Probe is in Disconnceted status.Please open the probe and connect'), ['OK'], "");
                        }
                        else {
                          
                            DeleteProbeDetails();
                            navigator.notification.alert(xlatService.xlat('IN-MG-MSE-004 :: Probe is in Disconnceted status.Please open the probe and connect'), ['OK'], "");
                           

                        }
                    }
                }
            }
            oSetDefaultSpinner.Stop();
            OneViewConsole.Debug("ConnectProbe End", "BlueThermLiveTemperatureIndicatorFacade.ConnectProbe");
        }

        catch (Excep) {
            oSetDefaultSpinner.Stop();
            DeleteProbeDetails();
            navigator.notification.alert(xlatService.xlat('IN-MG-MSE-004 :: Probe is in Disconnceted status.Please open the probe and connect'), ['OK'], "");
      
            oOneViewExceptionHandler.Catch(Excep, "BlueThermLiveTemperatureIndicatorFacade.ConnectProbe", xlatService);
        }
    }

    var DeleteProbeDetails = function () {
        try {
            OneViewConsole.Debug("DeleteProbeDetails start", "BlueThermLiveTemperatureIndicatorFacade.DeleteProbeDetails");
           
            OneViewLocalStorage.Remove("SHUTDOWNProbeDetails");
            document.getElementById("divBlueThermLiveProbeConnectionButton").style.display = "none";

            OneViewConsole.Debug("DeleteProbeDetails start", "BlueThermLiveTemperatureIndicatorFacade.DeleteProbeDetails");     
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "BlueThermLiveTemperatureIndicatorFacade.DeleteProbeDetails", Excep);
        }
    }
}
