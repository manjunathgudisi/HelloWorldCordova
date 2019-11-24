
// OneViewRouterComponet
function OneViewRouterComponet() {

    // Current Scope
    var MyInstance = this;


    /// <summary>
    /// Reset Router
    /// </summary>   
    this.ResetRouter = function () {
        try {
            OneViewConsole.Debug("ResetRouter start", "OneViewRouterComponet.ResetRouter");

            if (OneViewRouteSegmentProvider != null && OneViewLocalStorage.Get("RouterMetaData") != null) {

                var RouterMetaData = JSON.parse(OneViewLocalStorage.Get("RouterMetaData"));

                var iLoop = 0, currentRoute;

                for (iLoop = 0; iLoop < RouterMetaData.length; iLoop++) {

                    currentRoute = RouterMetaData[iLoop];

                    if (currentRoute.Type == "DefaultRouterView") {

                        var routeName = "/" + currentRoute.KeyName;
                        OneViewRouteSegmentProvider.when(routeName, 'nav.' + currentRoute.KeyName)

                        OneViewRouteSegmentProvider.within().segment(currentRoute.KeyName, {

                            templateUrl: currentRoute.PageUrls,

                            resolve: {
                                data: function ($timeout) {
                                    return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
                                }
                            },

                            untilResolved: {
                                templateUrl: 'Templates/loading.html'
                            }

                        })
                    }

                    else if (currentRoute.Type == "ListView") {

                        for (var j = 0; j < currentRoute.KeyList.length ; j++) {

                            var routeName = "/" + currentRoute.KeyList[j];
                            OneViewRouteSegmentProvider.when(routeName, 'nav.' + currentRoute.RouteName)
                        }

                        OneViewRouteSegmentProvider.within().segment(currentRoute.RouteName, {

                            templateUrl: currentRoute.PageUrls,

                            resolve: {
                                data: function ($timeout) {
                                    return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
                                }
                            },

                            untilResolved: {
                                templateUrl: 'Templates/loading.html'
                            }

                        })
                    }
                }

                //alert(OneViewRouteSegmentProvider);
                //alert(JSON.stringify(OneViewRouteSegmentProvider));
            }
            
            OneViewConsole.Debug("ResetRouter end", "OneViewRouterComponet.ResetRouter");          
        }
        catch (Excep) {
            oSetDefaultSpinner.Stop();
            throw oOneViewExceptionHandler.Create("BO", "OneViewRouterComponet.ResetRouter", Excep);
        }
    }
}

