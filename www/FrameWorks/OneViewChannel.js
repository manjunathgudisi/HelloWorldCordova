

//to set the call back
//ex: this.error = function(XMLHttpRequest, textStatus, errorThrown) { alert(errorThrown); }
//ex: this.success = function(xml) { alert(xml); }
//ex:LoadAjax(this.success, this.error);

//TO do :Need to refactore with Factory logic,
function OneViewChannel() {
    try {
        OneViewConsole.Debug("OneViewChannel Start", "Framework.OneViewChannel");

            var MyInstance = this;
            this.AjaxMode = false;
            this.WebSocketMode = false;
            this.htttpNativeMode = true;
            this.url;
            this.webMethod = "post";
            this.parameter = "{}";
            this.async = false;
            this.timeout = 20000, //20 secs of timeout
            this.contentType = "application/json; charset=utf-8";
            this.dataType = "json";
            this.SourceObj = "";
            //this.toaster = null;
		
		this.ShowProgress = function() {
			window.MyProgressHUD.ShowProgress();
		}
		
		this.HideProgress = function() {
			window.MyProgressHUD.HideProgress();
		}

            this.Send = function (args) {
                try {
                    OneViewConsole.Debug("Send Start", "OneViewChannel.Send");

                    if (MyInstance.AjaxMode == true) {
                        OneViewConsole.Debug("Send End", "OneViewChannel.Send");
                        return MyInstance.JQAjaxExecute(args);
                    }
                    else if (MyInstance.WebSocketMode == true) {
                        OneViewConsole.Debug("Send End", "OneViewChannel.Send");
                        return MyInstance.WebSocketExecute(args);
                    }
                    else if (MyInstance.htttpNativeMode == true) {
                        OneViewConsole.Debug("Send End", "OneViewChannel.Send");
                        return MyInstance.htttpNativeExecute(args);
                    }
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "OneViewChannel.Send", Excep);
                }
            }

            this.Get = function (url) {
                try {
                    OneViewConsole.Debug("Get Start", "OneViewChannel.Get");

                    if (MyInstance.AjaxMode == true) {
                        alert("Not implemented exception");
                        return null;
                    }
                    else if (MyInstance.WebSocketMode == true) {
                        alert("Not implemented exception");
                        return null;
                    }
                    else if (MyInstance.htttpNativeMode == true) {
                        OneViewConsole.Debug("Get End", "OneViewChannel.Get");
                        return MyInstance.htttpNativeGet(url);
                    }
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "OneViewChannel.Send", Excep);
                }
            }

            this.InternetConnection = function () {
                try {
                    OneViewConsole.Debug("InternetConnection Start", "OneViewChannel.InternetConnection");

                    if (MyInstance.AjaxMode == true) {
                        OneViewConsole.Debug("InternetConnection End", "OneViewChannel.InternetConnection");
                        return true;
                    }
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "OneViewChannel.InternetConnection", Excep);
                }
            }

            this.JQAjaxExecute = function (args) {
                try {
                    OneViewConsole.Debug("JQAjaxExecute Start", "OneViewChannel.JQAjaxExecute");

                    if (this.async == false || (args != null && args.success != null && args.error != null && args.success != "" && args.error != "")) {

                        var result = "";
                        $.ajax({
                            type: this.webMethod,
                            async: this.async,
                            timeout: this.timeout,
                            url: this.url,
                            data: this.parameter,
                            contentType: this.contentType,
                            dataType: this.dataType,
                            success: function (msg) {

                                if (args != null && args.success != null && args.success != "") {
                                    args.success(args.sender, msg)
                                }
                                result = msg;
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                //alert('ajax errorThrown  :' + errorThrown);
                                result = errorThrown;
                                if (args != null && args.error != null && args.error != "") {
                                    args.error(args.sender, XMLHttpRequest, textStatus, errorThrown);
                                }
                            },
                            complete: function () {

                                if (args != null && args.complete != null && args.complete != "") {
                                    args.complete(args.sender);
                                }
                            }
                        });

                        OneViewConsole.Debug("JQAjaxExecute End", "OneViewChannel.JQAjaxExecute");
                        return result;
                    }
                    else {
                        //alert("Set Success and Error callback method");
                        //ex: this.error = function(XMLHttpRequest, textStatus, errorThrown) { alert(errorThrown); }
                        //ex: this.success = function(xml) { alert(xml); }
                        //ex:LoadAjax(this.success, this.error);
                    }
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "OneViewChannel.JQAjaxExecute", Excep);
                }
                finally {
                    result = null;
                }
            }

            this.WebSocketExecute = function (args) {
                // alert("OneViewChannel.WebSocketExecute():  ,not implemented exception");
            }

            this.htttpNativeExecute = function (args) {
                try {
                    OneViewConsole.Debug("htttpNativeExecute Start", "OneViewChannel.htttpNativeExecute");
                    //alert("OneViewChannel.htttpNativeExecute():  Start");

                    // alert(window.HttpClinetPlugin);
                    var DeviceId = OneViewLocalStorage.Get("DeviceId");
                    DeviceId = (DeviceId == null || DeviceId == 'undefined') ? "" : DeviceId;

                    var LoginUserId = OneViewSessionStorage.Get("LoginUserId");                  
                    LoginUserId = (LoginUserId == null || LoginUserId == 'undefined') ? "" : LoginUserId;

                    var LoginUserName = OneViewSessionStorage.Get("LoginUserName");
                    LoginUserName = (LoginUserName == null || LoginUserName == 'undefined') ? "" : LoginUserName;

                    var oOneViewDeviceInfoPlugin = new OneViewDeviceInfoPlugin();
                    var IpAddress = oOneViewDeviceInfoPlugin.GetIpAddress();

                    var oOneViewAppInfoPlugin = new OneViewAppInfoPlugin();
                    var LocalAppInfo = oOneViewAppInfoPlugin.GetLocalAppInfo();

                    var VersionName = LocalAppInfo.VersionName;

                    var ServiceId = OneViewSessionStorage.Get("ServiceId");
                    var ServiceName = OneViewSessionStorage.Get("ServiceName");

                    var oHttpClientResponseDTO = window.HttpClinetPlugin.Send(this.url, this.parameter, DeviceId, LoginUserId, IpAddress, LoginUserName, VersionName, ServiceId, ServiceName);
                    
                    oHttpClientResponseDTO = JSON.parse(oHttpClientResponseDTO);
                    //for normal response no wrapping,because of Gson ser issue in java
                    if (oHttpClientResponseDTO.ResponseCode == undefined || oHttpClientResponseDTO.ResponseCode == null)
                        return oHttpClientResponseDTO;

                        //if (oHttpClientResponseDTO.IsAnyException == "false" && oHttpClientResponseDTO.ResponseCode == "200") {
                        //    oHttpClientResponseDTO.Response = JSON.parse(oHttpClientResponseDTO.Response);
                        //    return oHttpClientResponseDTO.Response;
                        //}
                    
                    else if (args == undefined || (args != undefined && args.ShowExceptionMessage != false)) {
                        if (oHttpClientResponseDTO.IsAnyException == "false" && oHttpClientResponseDTO.ResponseCode == "503")//Service Unavailable
                        {
                            CloseProgressbarAndLoader();
                            // MyInstance.toaster.pop('error', 'Error :', 'Service Unavailable');
                            //alert("IN-ER-ALP-001 :: Service Unavailable");
                            navigator.notification.alert((OneViewGlobalization[CurrentLanguage].ServiceUnavailable_Message), ['OK'], "");

                            return null;

                        }
                        else if (oHttpClientResponseDTO.IsAnyException == "false" && oHttpClientResponseDTO.ResponseCode == "504")//Gateway Timeout
                        {
                            CloseProgressbarAndLoader();
                            // MyInstance.toaster.pop('error', 'Error :', 'Gateway Timeout');
                            //alert("IN-ER-ALP-002 :: Gateway Timeout");
                            alert(OneViewGlobalization[CurrentLanguage].GatewayTimeout_Message);
                            return null;
                        }
                        else if (oHttpClientResponseDTO.IsAnyException == "false" && oHttpClientResponseDTO.ResponseCode == "500")//Internal Server Error
                        {
                            CloseProgressbarAndLoader();
                            // MyInstance.toaster.pop('error', 'Error :', 'Internal Server Error');
                            //alert("IN-ER-ALP-003 :: Internal Server Error");
                            alert(OneViewGlobalization[CurrentLanguage].InternalServerError_Message);
                            return null;
                        }
                        else if (oHttpClientResponseDTO.IsAnyException == "false" && oHttpClientResponseDTO.ResponseCode == "404")//Not Found
                        {
                            CloseProgressbarAndLoader();
                            //  MyInstance.toaster.pop('error', 'Error :', 'Not Found');
                            //alert("IN-ER-ALP-004 :: Not Found");
                            alert(OneViewGlobalization[CurrentLanguage].NotFound_Message);
                            return null;
                        }
                        else if (oHttpClientResponseDTO.IsAnyException == "false" && oHttpClientResponseDTO.ResponseCode == "408")//Request Timeout
                        {
                            CloseProgressbarAndLoader();
                            // MyInstance.toaster.pop('error', 'Error :', 'Request Timeout');
                            //alert("IN-ER-ALP-005 :: Request Timeout");
                            alert(OneViewGlobalization[CurrentLanguage].RequestTimeout_Message);
                            return null;
                        }
                        else if (oHttpClientResponseDTO.IsAnyException == "false" && oHttpClientResponseDTO.ResponseCode == "400")//Bad Request
                        {
                            CloseProgressbarAndLoader();
                            //alert("IN-ER-ALP-006 :: Bad Request");
                            alert(OneViewGlobalization[CurrentLanguage].BadRequest_Message);
                            return null;
                        }
                        else {
                            CloseProgressbarAndLoader();
                            //alert(oHttpClientResponseDTO.ResponseCode);
                            //  MyInstance.toaster.pop('error', 'Error :', 'Request Timeout');                      
                            //alert("IN-ER-ALP-007 :: Connection refused, Please Check your internet connectivity and try again");
                            alert(OneViewGlobalization[CurrentLanguage].Connectionrefused_Message);
                            return null;
                        }
                    }
                    else {
                        CloseProgressbarAndLoader();
                        return null;
                    }                

                    OneViewConsole.Debug("htttpNativeExecute End", "OneViewChannel.htttpNativeExecute");

                   
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "OneViewChannel.htttpNativeExecute", Excep);
                }
                finally {
                    oHttpClientResponseDTO = null;
                }
               /// alert("OneViewChannel.htttpNativeExecute():  End");
            }

            this.htttpNativeGet = function (url) {
                try {
                    OneViewConsole.Debug("htttpNativeGet Start", "OneViewChannel.htttpNativeGet");
                    
                    var oHttpClientResponse = window.HttpClinetPlugin.Send_Get(url);

                    if (oHttpClientResponse != null) {
                        return oHttpClientResponse;
                    }
                    else {
                        CloseProgressbarAndLoader();                                
                        alert("IN-ER-ALP-007 :: Connection refused, Please Check your internet connectivity and try again");
                        return null;
                    }

                    OneViewConsole.Debug("htttpNativeGet End", "OneViewChannel.htttpNativeGet");
                }
                catch (Excep) {
                    throw oOneViewExceptionHandler.Create("Framework", "OneViewChannel.htttpNativeGet", Excep);
                }
                finally {
                    oHttpClientResponseDTO = null;
                }             
            }
            
            var CloseProgressbarAndLoader = function(){
                oSetDefaultSpinner.Stop();
                oOneViewProgressbar.Stop();
            }

        OneViewConsole.Debug("OneViewChannel End", "Framework.OneViewChannel");
    }
    catch (Excep) {      
        throw oOneViewExceptionHandler.Create("Framework", "OneViewChannel", Excep);
    }
}
