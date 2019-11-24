
function RouteFramework() {

    var MyInstance = this;

    this.RedirectToPage = function (RouteKeyConfig, RouteKey, EventArgs) {
        try {
            OneViewConsole.Debug("RedirectToPage Start", "RouteFramework.RedirectToPage");
         
            
            if (RouteKeyConfig == null || RouteKeyConfig == undefined || RouteKeyConfig == "") {
                RouteKeyConfig = {
                    "SaveRouteKey": "",
                    "SubmitRouteKey": "DefaultSubmitRoute",
                    "SaveAutoSubmitRouteKey": "DefaultSaveAutoSubmitRoute",
                    "Save_UpdateRouteKey": "",
                    "Submit_UpdateRouteKey": "DefaultSubmit_UpdateRoute",
                    "SaveAutoSubmit_UpdateRouteKey": "DefaultSaveAutoSubmit_UpdateRoute",
                    "BackRouteKey": "DefaultBackRoute",
                    "InlineUpdateRouteKey": "DefaultInlineUpdateRoute"
                };

            }

            //alert('RouteKey : ' + RouteKey  +' , RouteKeyConfig : ' + JSON.stringify(RouteKeyConfig));

            if (RouteKey != null && RouteKey != undefined && RouteKey != "") {
                var RouteKeyValue = RouteKeyConfig[RouteKey];
                if (RouteKeyValue != null && RouteKeyValue != undefined && RouteKeyValue != "") {
                    MyInstance.ProcessMethod(RouteKeyValue, EventArgs);
                }
            }

            OneViewConsole.Debug("RedirectToPage End", "RouteFramework.RedirectToPage");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "RouteFramework.RedirectToPage", Excep);
        }
        finally {
        }
    }


    this.ProcessMethod = function (Key, EventArgs) {
        try {
            OneViewConsole.Debug("ProcessMethod Start", "RouteFramework.ProcessMethod");
            
            var obj = new window[Key];
            if (obj != undefined) {
                obj.Execute(EventArgs);
            }
            else {
                alert("Key doesn't exist. Key name = " + Key);
            }

            OneViewConsole.Debug("ProcessMethod End", "RouteFramework.ProcessMethod");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "RouteFramework.ProcessMethod", Excep);
        }
        finally {
        }
    }
}




function DefaultSaveRoute() {

    this.Execute = function (EventArgs) {
        try {
            OneViewConsole.Debug("Execute Start", "DefaultSaveRoute.Execute");

            //alert("Hello DefaultSaveRoute");

            OneViewConsole.Debug("Execute End", "DefaultSaveRoute.Execute");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "DefaultSaveRoute.Execute", Excep);
        }
        finally {
        }
    }
}

function DefaultSubmitRoute() {

    this.Execute = function (EventArgs) {
        try {
            OneViewConsole.Debug("Execute Start", "DefaultSubmitRoute.Execute");

            alert("Hello DefaultSubmitRoute");
            alert(EventArgs.xlatService.xlat('SavedSuccessfully'));

            OneViewConsole.Debug("Execute End", "DefaultSubmitRoute.Execute");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "DefaultSubmitRoute.Execute", Excep);
        }
        finally {
        }
    }
}

function DefaultSaveAutoSubmitRoute() {

    this.Execute = function (EventArgs) {
        try {
            OneViewConsole.Debug("Execute Start", "DefaultSaveAutoSubmitRoute.Execute");

            alert("Hello DefaultSaveAutoSubmitRoute");
            alert(EventArgs.xlatService.xlat('SavedSuccessfully'));

            OneViewConsole.Debug("Execute End", "DefaultSaveAutoSubmitRoute.Execute");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "DefaultSaveAutoSubmitRoute.Execute", Excep);
        }
        finally {
        }
    }
}

function DefaultSave_UpdateRoute() {

    this.Execute = function (EventArgs) {
        try {
            OneViewConsole.Debug("Execute Start", "DefaultSave_UpdateRoute.Execute");

            //alert("Hello DefaultSave_UpdateRoute");

            OneViewConsole.Debug("Execute End", "DefaultSave_UpdateRoute.Execute");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "DefaultSave_UpdateRoute.Execute", Excep);
        }
        finally {
        }
    }
}

function DefaultSubmit_UpdateRoute() {

    this.Execute = function (EventArgs) {
        try {
            OneViewConsole.Debug("Execute Start", "DefaultSubmit_UpdateRoute.Execute");

            alert("Hello DefaultSubmit_UpdateRoute");

            alert(EventArgs.xlatService.xlat('UpdatedSuccessfully'));

            if (EventArgs != undefined) {
                EventArgs.location.url('/ViewRecords');
            }

            OneViewConsole.Debug("Execute End", "DefaultSubmit_UpdateRoute.Execute");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "DefaultSubmit_UpdateRoute.Execute", Excep);
        }
        finally {
        }
    }
}

function DefaultSaveAutoSubmit_UpdateRoute() {

    this.Execute = function (EventArgs) {
        try {
            OneViewConsole.Debug("Execute Start", "DefaultSaveAutoSubmit_UpdateRoute.Execute");

            alert("Hello DefaultSaveAutoSubmit_UpdateRoute");

            alert(EventArgs.xlatService.xlat('UpdatedSuccessfully'));

            if (EventArgs != undefined) {
                EventArgs.location.url('/ViewRecords');
            }

            OneViewConsole.Debug("Execute End", "DefaultSaveAutoSubmit_UpdateRoute.Execute");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "DefaultSaveAutoSubmit_UpdateRoute.Execute", Excep);
        }
        finally {
        }
    }
}

function DefaultBackRoute() {

    this.Execute = function (EventArgs) {
        try {
            OneViewConsole.Debug("Execute Start", "DefaultBackRoute.Execute");

           // alert("Hello DefaultBackRoute");
            if (EventArgs != undefined) {
                scope = null;
                ionicBackdrop = null;
                if (OneViewSessionStorage.Get("DcId") != null) {
                    OneViewSessionStorage.Remove("NCInlineEdit");
                    OneViewSessionStorage.Remove("MyAuditForm");
                    EventArgs.location.url('/ViewRecords');
                    // $location.url('/newdc');
                    //$location.url('/nav/listview-group');
                }
                else if (OneViewSessionStorage.Get("MyAuditForm") == 'true') {
                    OneViewSessionStorage.Remove("NCInlineEdit");
                    OneViewSessionStorage.Remove("MyAuditEditForm");
                    //$location.path('/my-audit');these should there
                    EventArgs.location.url('/newdc');
                }
                else {
                    //$location.path('/newdc');
                    EventArgs.location.url('/newdc');
                }
            }
            OneViewConsole.Debug("Execute End", "DefaultBackRoute.Execute");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "DefaultBackRoute.Execute", Excep);
        }
        finally {
        }
    }
}

function DefaultInlineUpdateRoute() {

    this.Execute = function (EventArgs) {
        try {
            OneViewConsole.Debug("Execute Start", "DefaultInlineUpdateRoute.Execute");

            //alert("Hello DefaultInlineUpdateRoute");
            EventArgs.location.url('/ViewRecords');

            OneViewConsole.Debug("Execute End", "DefaultInlineUpdateRoute.Execute");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "DefaultInlineUpdateRoute.Execute", Excep);
        }
        finally {
        }
    }
}





///////////////////////////////***************** Platform Routing START ***************///////////////////////////

function PlatformSaveRoute() {

    this.Execute = function (EventArgs) {
        try {
            OneViewConsole.Debug("Execute Start", "PlatformSaveRoute.Execute");

           // alert('PlatformSaveRoute');
            if (EventArgs != undefined) {
                alert(EventArgs.xlatService.xlat('SavedSuccessfully'));

                var LandingPageViewInfo = OneViewSessionStorage.Get("LandingPageViewInfo");
                if (LandingPageViewInfo != null) {
                    LandingPageViewInfo = JSON.parse(LandingPageViewInfo);
                    EventArgs.location.url(LandingPageViewInfo.BackRouteKey);
                }

            }

            OneViewConsole.Debug("Execute End", "PlatformSaveRoute.Execute");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "PlatformSaveRoute.Execute", Excep);
        }
        finally {
        }
    }
}

function PlatformSubmitRoute() {

    this.Execute = function (EventArgs) {
        try {
            OneViewConsole.Debug("Execute Start", "PlatformSubmitRoute.Execute");

          //  alert('PlatformSubmitRoute');
            if (EventArgs != undefined) {
                alert(EventArgs.xlatService.xlat('SavedSuccessfully'));

                var LandingPageViewInfo = OneViewSessionStorage.Get("LandingPageViewInfo");
                if (LandingPageViewInfo != null) {
                    LandingPageViewInfo = JSON.parse(LandingPageViewInfo);
                    EventArgs.location.url(LandingPageViewInfo.BackRouteKey);
                }

            }

            OneViewConsole.Debug("Execute End", "PlatformSubmitRoute.Execute");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "PlatformSubmitRoute.Execute", Excep);
        }
        finally {
        }
    }
}

function PlatformSaveAutoSubmitRoute() {

    this.Execute = function (EventArgs) {
        try {
            OneViewConsole.Debug("Execute Start", "PlatformSaveAutoSubmitRoute.Execute");

           // alert('PlatformSaveAutoSubmitRoute');

            if (EventArgs.LVDefaultNotificationComponentKey == undefined || EventArgs.LVDefaultNotificationComponentKey == "" || EventArgs.LVDefaultNotificationComponentKey == null) {
                EventArgs.LVDefaultNotificationComponentKey = "LVDefaultNotificationComponent";
            }
            var oLVFactory = new LVFactory();
            var oNotificationComponent = oLVFactory.GetNotificationComponent(EventArgs.LVDefaultNotificationComponentKey);


            if (OneViewSessionStorage.Get("IsDcCompletedBeforeEdit") == 'true' || OneViewSessionStorage.Get("IsDcCompletedBeforeEdit") == true) {

                oNotificationComponent.Notify("IN-SU-LVI-001 :: Record added successfully", EventArgs.DefaultJavaScriptAlert);

                var LandingPageViewInfo = OneViewSessionStorage.Get("LandingPageViewInfo");

                if (LandingPageViewInfo != null) {

                    LandingPageViewInfo = JSON.parse(LandingPageViewInfo);
                    EventArgs.location.url(LandingPageViewInfo.BackRouteKey);
                }
            }
            else {
                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                oOneViewCordovaPlugin.DefaultConfirmBox("Confirm", "IN-SU-LVI-001 :: Record added successfully. Are you sure, you want to navigate back ?", function (ConfirmationId) {

                    if (ConfirmationId == '2') {

                        var LandingPageViewInfo = OneViewSessionStorage.Get("LandingPageViewInfo");

                        if (LandingPageViewInfo != null) {

                            LandingPageViewInfo = JSON.parse(LandingPageViewInfo);
                            EventArgs.location.url(LandingPageViewInfo.BackRouteKey);

                            EventArgs.oScope.$apply();
                        }
                    }
                });
            }

            OneViewConsole.Debug("Execute End", "PlatformSaveAutoSubmitRoute.Execute");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "PlatformSaveAutoSubmitRoute.Execute", Excep);
        }
        finally {
        }
    }
}

function PlatformSave_UpdateRoute() {

    this.Execute = function (EventArgs) {
        try {
            OneViewConsole.Debug("Execute Start", "PlatformSave_UpdateRoute.Execute");

           // alert('PlatformSave_UpdateRoute');
            if (EventArgs != undefined) {
                alert(EventArgs.xlatService.xlat('SavedSuccessfully'));

                var LandingPageViewInfo = OneViewSessionStorage.Get("LandingPageViewInfo");
                if (LandingPageViewInfo != null) {
                    LandingPageViewInfo = JSON.parse(LandingPageViewInfo);
                    EventArgs.location.url(LandingPageViewInfo.BackRouteKey);
                }

            }

            OneViewConsole.Debug("Execute End", "PlatformSave_UpdateRoute.Execute");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "PlatformSave_UpdateRoute.Execute", Excep);
        }
        finally {
        }
    }
}

function PlatformSubmit_UpdateRoute() {

    this.Execute = function (EventArgs) {
        try {
            OneViewConsole.Debug("Execute Start", "PlatformSubmit_UpdateRoute.Execute");

         //   alert('PlatformSubmit_UpdateRoute');
            if (EventArgs != undefined) {
                alert(EventArgs.xlatService.xlat('SavedSuccessfully'));

                var LandingPageViewInfo = OneViewSessionStorage.Get("LandingPageViewInfo");
                if (LandingPageViewInfo != null) {
                    LandingPageViewInfo = JSON.parse(LandingPageViewInfo);
                    EventArgs.location.url(LandingPageViewInfo.BackRouteKey);
                }
            }
            OneViewConsole.Debug("Execute End", "PlatformSubmit_UpdateRoute.Execute");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "PlatformSubmit_UpdateRoute.Execute", Excep);
        }
        finally {
        }
    }
}

function PlatformSaveAutoSubmit_UpdateRoute() {

    this.Execute = function (EventArgs) {
        try {
            OneViewConsole.Debug("Execute Start", "PlatformSaveAutoSubmit_UpdateRoute.Execute");

           // alert('PlatformSaveAutoSubmit_UpdateRoute');
            
            if (EventArgs.LVDefaultNotificationComponentKey == undefined || EventArgs.LVDefaultNotificationComponentKey == "" || EventArgs.LVDefaultNotificationComponentKey == null) {
                EventArgs.LVDefaultNotificationComponentKey = "LVDefaultNotificationComponent";
            }
            var oLVFactory = new LVFactory();
            var oNotificationComponent = oLVFactory.GetNotificationComponent(EventArgs.LVDefaultNotificationComponentKey);

            if (OneViewSessionStorage.Get("IsDcCompletedBeforeEdit") == 'true' || OneViewSessionStorage.Get("IsDcCompletedBeforeEdit") == true) {

                oNotificationComponent.Notify("IN-SU-LVI-002 :: Record updated successfully", EventArgs.DefaultJavaScriptAlert);

                if (OneViewSessionStorage.Get("ViewRecordsForm") == 'true') {
                    EventArgs.location.url('/ViewRecords');
                }
                else {
                    var LandingPageViewInfo = OneViewSessionStorage.Get("LandingPageViewInfo");

                    if (LandingPageViewInfo != null) {

                        LandingPageViewInfo = JSON.parse(LandingPageViewInfo);
                        EventArgs.location.url(LandingPageViewInfo.BackRouteKey);
                    }
                }
            }
            else {
                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                oOneViewCordovaPlugin.DefaultConfirmBox("Confirm", "IN-SU-LVI-002 :: Record updated successfully. Are you sure, you want to navigate back ?", function (ConfirmationId) {

                    if (ConfirmationId == '2') {

                        if (OneViewSessionStorage.Get("ViewRecordsForm") == 'true') {
                            EventArgs.location.url('/ViewRecords');
                        }
                        else {
                            var LandingPageViewInfo = OneViewSessionStorage.Get("LandingPageViewInfo");

                            if (LandingPageViewInfo != null) {

                                LandingPageViewInfo = JSON.parse(LandingPageViewInfo);
                                EventArgs.location.url(LandingPageViewInfo.BackRouteKey);

                                EventArgs.oScope.$apply();
                            }
                        }
                    }
                });
            }

            OneViewConsole.Debug("Execute End", "PlatformSaveAutoSubmit_UpdateRoute.Execute");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "PlatformSaveAutoSubmit_UpdateRoute.Execute", Excep);
        }
        finally {
        }
    }
}

function PlatformBackRoute() {

    this.Execute = function (EventArgs) {
        try {
            OneViewConsole.Debug("Execute Start", "PlatformBackRoute.Execute");

          //  alert('PlatformBackRoute');

            if (EventArgs != undefined) {
                scope = null;
                ionicBackdrop = null;
                if (OneViewSessionStorage.Get("DcId") != null && OneViewSessionStorage.Get("ViewRecordsForm") == 'true') {
                    OneViewSessionStorage.Remove("NCInlineEdit");
                    OneViewSessionStorage.Remove("MyAuditForm");
                    EventArgs.location.url('/ViewRecords');
                }
                else if (OneViewSessionStorage.Get("MyAuditEditForm") == 'true') {
                    OneViewSessionStorage.Remove("NCInlineEdit");
                    OneViewSessionStorage.Remove("MyAuditEditForm");
                    EventArgs.location.url('/my-audit');
                }
                else if (OneViewSessionStorage.Get("LandingPageEditForm") == 'true') {
                    var LandingPageViewInfo = OneViewSessionStorage.Get("LandingPageViewInfo");

                    if (LandingPageViewInfo != null) {
                        LandingPageViewInfo = JSON.parse(LandingPageViewInfo);
                        EventArgs.location.url(LandingPageViewInfo.BackRouteKey);
                    }
                }
                else {
                    EventArgs.location.url('/newdc');
                }
            }

            OneViewConsole.Debug("Execute End", "PlatformBackRoute.Execute");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "PlatformBackRoute.Execute", Excep);
        }
        finally {
        }
    }
}

function PlatformInlineUpdateRoute() {

    this.Execute = function (EventArgs) {
        try {
            OneViewConsole.Debug("Execute Start", "PlatformInlineUpdateRoute.Execute");


            OneViewConsole.Debug("Execute End", "PlatformInlineUpdateRoute.Execute");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "PlatformInlineUpdateRoute.Execute", Excep);
        }
        finally {
        }
    }
}

///////////////////////////////***************** Platform Routing END ***************///////////////////////////


