
function ShowMessage() {
    
    //ex:User name must want to be min 6
    this.Error = function (MessageKey) {
        //find the localised message from messagekey
        //show it to the client
        alert(MessageKey);
    }
    this.Warning = function (MessageKey) {
        //find the localised message from messagekey
        //show it to the client
        alert(MessageKey);
    }
    //ex:Saved successfuly
    this.Info = function (MessageKey) {
        alert(MessageKey);
    }
}

function ClearGlobalVariable()
{
    //view record
    //state = null;
    GridDataSource = null;
    GridConfig = null;
    DefaultInlineEditConfig = null;
    ViewRecordsFacadeKey = null;
    FilterRuleConfig = null;
    InlineEditFinishedEventHandler = null;
    scope = null;

    //monitoring
    ionicBackdrop = null;

    //log
    OneViewLogRecord = '';
}



function removeSpecialCharacter (value) {
    try {
        if (OneViewGlobalcurrentLanguage == 'en-us') {
            if (value != undefined && value != null && value != '' && typeof (value) == 'string') {
                //value = value.replace(/\s/g, '');
                value = value.replace(/[^-_<>@:()^,&/| 0-9 .a-zA-Z]/g, ' ');

                value = value.trim();
            }
        }
        return value;
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("FrameWork", "removeSpecialCharacter.removeSpecialCharacter", Excep);
    }
    finally {
    }
}

// Local stoage
function OneViewLocalStorage() {
    
        // Save in to local storage
        this.Save = function (Key, Value) {
            try {
                // OneViewConsole.Debug("Save Start", "OneViewLocalStorage.Save");

                if (Key != "CloudManagerServiceInfo" &&
                    Key != "CloudManagerUserServiceMapping" &&
                    Key != "DeviceId" &&
                    Key != "LastLoginUserData" &&
                    Key != "APKUpgradeProcessStatus" &&
                    Key != "APKUpgradeProcessMetadata" &&
                    Key != "LoginUserCredentialsForAPKUpgradeProcess" &&
                    Key != "ManualPinValidationDetails" &&
                    Key != "StartPage") {
                    Key = "Service" + OneViewSessionStorage.Get("ServiceId") + "_" + Key;
                }

                window.localStorage.setItem(Key, Value);

                //Save in Android Local Storage                
                if (Key == "CloudManagerServiceInfo" || Key == "DeviceId" || Key == "LoginUserId" || Key == "LoginUserName") {
                    //oOneviewAndroidLocalStoragePlugin.Save(Key, Value);
                    NativeStorage.setItem(Key, Value, OneViewNativeStorage.setSuccess, OneViewNativeStorage.setError);
                }

                // OneViewConsole.Debug("Save End", "OneViewLocalStorage.Save");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "OneViewLocalStorage.Save", Excep);
            }
        }

        // Remove from local storage
        this.Remove = function (Key) {
            try {
                //  OneViewConsole.Debug("Remove Start", "OneViewLocalStorage.Remove");

                if (Key != "CloudManagerServiceInfo" &&
                    Key != "CloudManagerUserServiceMapping" &&
                    Key != "DeviceId" &&
                    Key != "LastLoginUserData" &&
                    Key != "APKUpgradeProcessStatus" &&
                    Key != "APKUpgradeProcessMetadata" &&
                    Key != "LoginUserCredentialsForAPKUpgradeProcess" &&
                    Key != "ManualPinValidationDetails" &&
                    Key != "StartPage") {
                    Key = "Service" + OneViewSessionStorage.Get("ServiceId") + "_" + Key;
                }

                window.localStorage.removeItem(Key);

                  //Remove Android Local Storage
                  if(Key == "CloudManagerServiceInfo" ||  Key == "DeviceId"){
                       //oOneviewAndroidLocalStoragePlugin.Remove(Key);
                        NativeStorage.remove(Key, OneViewNativeStorage.removeSuccess, OneViewNativeStorage.removeError);
                   }

                //  OneViewConsole.Debug("Remove End", "OneViewLocalStorage.Remove");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "OneViewLocalStorage.Remove", Excep);
            }
        }

        // Get from local storage
        this.Get = function (Key) {
            try {
                // OneViewConsole.Debug("Get Start", "OneViewLocalStorage.Get");

                if (Key != "CloudManagerServiceInfo" &&
                    Key != "CloudManagerUserServiceMapping" &&
                    Key != "DeviceId" &&
                    Key != "LastLoginUserData" &&
                    Key != "APKUpgradeProcessStatus" &&
                    Key != "APKUpgradeProcessMetadata" &&
                    Key != "LoginUserCredentialsForAPKUpgradeProcess" &&
                    Key != "ManualPinValidationDetails" &&
                    Key != "StartPage") {
                    Key = "Service" + OneViewSessionStorage.Get("ServiceId") + "_" + Key;
                }

                var Value = window.localStorage.getItem(Key);

               // OneViewConsole.Debug("Get End", "OneViewLocalStorage.Get");

                return Value;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "OneViewLocalStorage.Get", Excep);
            }
            finally {
                Value = null;
            }
        }

        // Clear local storage
        this.Clear = function () {
            try {
               // OneViewConsole.Debug("Clear Start", "OneViewLocalStorage.Clear");

                    window.localStorage.clear();

              //  OneViewConsole.Debug("Clear End", "OneViewLocalStorage.Clear");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "OneViewLocalStorage.Clear", Excep);
            }
        }
       
}

// session storage
function OneViewSessionStorage() {
  
        // Save in to local storage
        this.Save = function (Key, Value) {
            try {
              //  OneViewConsole.Debug("Save Start", "OneViewSessionStorage.Save");

                window.sessionStorage.setItem(Key, Value);

                //Save in Android Local Storage               
                if (Key == "CloudManagerServiceInfo" || Key == "DeviceId" || Key == "LoginUserId" || Key == "LoginUserName") {
                    //oOneviewAndroidLocalStoragePlugin.Save(Key, Value);
                    NativeStorage.setItem(Key, Value, OneViewNativeStorage.setSuccess, OneViewNativeStorage.setError);
                }

               // OneViewConsole.Debug("Save End", "OneViewSessionStorage.Save");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "OneViewSessionStorage.Save", Excep);
            }
        }

        // Remove from local storage
        this.Remove = function (Key) {
            try {
             //   OneViewConsole.Debug("Remove Start", "OneViewSessionStorage.Remove");

                window.sessionStorage.removeItem(Key);

             //   OneViewConsole.Debug("Remove End", "OneViewSessionStorage.Remove");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "OneViewSessionStorage.Remove", Excep);
            }
        }

        // Get from local storage
        this.Get = function (Key) {
            try {
              //  OneViewConsole.Debug("Get Start", "OneViewSessionStorage.Get");

                var Value = window.sessionStorage.getItem(Key);

              //  OneViewConsole.Debug("Get End", "OneViewSessionStorage.Get");

                return Value;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "OneViewSessionStorage.Get", Excep);
            }
            finally {
                Value = null;
            }
        }

        // Clear local storage
        this.Clear = function () {
            try {
              //  OneViewConsole.Debug("Clear Start", "OneViewSessionStorage.Clear");

                window.sessionStorage.clear();

               // OneViewConsole.Debug("Clear End", "OneViewSessionStorage.Clear");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "OneViewSessionStorage.Clear", Excep);
            }
        }
        
}

//Native storage
function OneViewNativeStorage() {
    
    this.setSuccess = function (obj) {
        console.log(obj.name);
        NativeStorage.getItem("reference", this.getSuccess, this.getError);
    },
    this.setError = function (error) {
        console.log(error.code);
        if (error.exception !== "") console.log(error.exception);
    },
    this.getSuccess = function (obj) {
        console.log(obj.name);
        NativeStorage.remove("reference", this.removeSuccess, this.removeError);
    },
    this.getError = function (error) {
        console.log(error.code);
        if (error.exception !== "") console.log(error.exception);
    },
    this.removeSuccess = function () {
        console.log("Removed");
    },
    this.removeError = function (error) {
        console.log(error.code);
        if (error.exception !== "") console.log(error.exception);
    }
}

// OneView unique generator (Guid)
function OneViewUniqueGenerator() {

    // Get unique guid
    this.GetGuid = function() {
        try {
            OneViewConsole.Debug("GetGuid Start", "OneViewUniqueGenerator.GetGuid");

                var guid = ""; //used to assign unique id
                function createId() {
                    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
                }
                guid = (createId() + createId() + "-" + createId() + "-4" + createId().substr(0, 3) + "-" + createId() + "-" + createId() + createId() + createId()).toLowerCase();
            
            OneViewConsole.Debug("GetGuid End", "OneViewUniqueGenerator.GetGuid");

            return guid;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "OneViewUniqueGenerator.GetGuid", Excep);
        }
        finally {
            guid = null;
        }
    }
}


// ProcessIndicator
function ProcessIndicator() {

    try {
        OneViewConsole.Debug("ProcessIndicator Start", "Framework.ProcessIndicator");

        var StartTime = '';

        // Start the process indicator
        this.Start = function (Title, Message) {
            try {
                OneViewConsole.Debug("Start Start", "ProcessIndicator.Start");
                
                var Title = (Title != undefined) ? Title : OneViewGlobalization[OneViewGlobalcurrentLanguage].LoaderHeaderKey;
                var Message = (Message != undefined) ? Message : OneViewGlobalization[OneViewGlobalcurrentLanguage].LoaderBodyKey;
                
                //TODO:IOS Migr (ios not supporting ,need to find progress bar)
                if(OSType != OSTypeEnum.IOS)
                {
                  navigator.notification.activityStart(Title, Message);
                }
              
                StartTime = new Date().getTime();

                OneViewConsole.Debug("Start End", "ProcessIndicator.Start");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "ProcessIndicator.Start", Excep);
            }
            finally {
                Title = null;
                Message = null;
            }
        }

        // Start the process indicator with custom title and message
        this.CustomStart = function (Title, Message) {
            try {
                OneViewConsole.Debug("CustomStart Start", "ProcessIndicator.CustomStart");
                
                //TODO:IOS Migr (ios not supporting ,need to find progress bar)
                if(OSType != OSTypeEnum.IOS)
                {
                    navigator.notification.activityStart(Title, Message);
                }
                    StartTime = new Date().getTime();

                OneViewConsole.Debug("CustomStart End", "ProcessIndicator.CustomStart");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "ProcessIndicator.CustomStart", Excep);
            }
        }

        // Stop the process indicator
        this.Stop = function () {
            try {
                OneViewConsole.Debug("Stop Start", "ProcessIndicator.Stop");

                    var endTime = new Date().getTime();
                    var totaltime = endTime - StartTime;

                    if (totaltime < 200) {
                        var timeTosleep = 200 - totaltime;
                        SleepFor(timeTosleep);
                    }
                //TODO:IOS Migr (ios not supporting ,need to find progress bar)
                if(OSType != OSTypeEnum.IOS)
                {
                    navigator.notification.activityStop();
                }
                    StartTime = '';

                OneViewConsole.Debug("Stop End", "ProcessIndicator.Stop");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "ProcessIndicator.Stop", Excep);
            }
            finally {
                endTime = null;
                totaltime = null;
                timeTosleep = null;
            }
        }

        // Sleep for some time
        // SleepDuration : Sleep time (Milli seconds)
        var SleepFor = function (SleepDuration) {
            try {
                OneViewConsole.Debug("SleepFor Start", "ProcessIndicator.SleepFor");

                    var now = new Date().getTime();
                    while (new Date().getTime() < now + SleepDuration) { /* do nothing */ }

                OneViewConsole.Debug("SleepFor End", "ProcessIndicator.SleepFor");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "ProcessIndicator.SleepFor", Excep);
            }
            finally {
                now = null;
            }
        }

        OneViewConsole.Debug("ProcessIndicator End", "Framework.ProcessIndicator");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("FrameWork", "ProcessIndicator", Excep);
    }
}


// OneView exception handler
function OneViewExceptionHandler() {

    // It will catch all exceptions
    this.Catch = function (Excep, Source, xlatService) {
       
        oSetDefaultSpinner.Stop();
        oOneViewProgressbar.Stop();
  
        // If it is type of OneViewException
        if (Excep instanceof OneViewException) {

            var Message = "DevMessage : " + Excep.DevMessage + "\nClientMessage : " + xlatService.xlat('DefaultException');
            OneViewConsole.Error(Message, "OneViewExceptionHandler.Catch");
            if (IsDevelopementMode == true) {           
                alert(Message);
            }
            else {
               
                alert(xlatService.xlat('DefaultException'));
            }
            OneViewConsole.Error(Message, Source);
        }
        // If it is type of other than OneViewException
        else {
            if (IsDevelopementMode == true) {

                var Message = "DevMessage : " + Excep + "\nSource : " + Source + "\nClientMessage : " + xlatService.xlat('DefaultException');
                OneViewConsole.Error(Message, "OneViewExceptionHandler.Catch");
                if (IsDevelopementMode == true) {
                    alert(Message);
                }
                else {
                    alert(xlatService.xlat('DefaultException'));
                }
            }
            OneViewConsole.Error(Message, Source);
        }
    }

    // It will create exception
    this.Create = function (SourceType, Source, Exception, MessageKey, DevMessage) {
       
        if (Exception instanceof OneViewException) {
            return Exception;
        }
        else {
            var _oOneViewException = new OneViewException();

            _oOneViewException.SourceType = SourceType;
            _oOneViewException.Source = Source;
            _oOneViewException.Exception = Exception;

            _oOneViewException.MessageKey = (MessageKey != "" && MessageKey != undefined) ? MessageKey : "";
            _oOneViewException.DevMessage = (DevMessage != "" && DevMessage != undefined) ? DevMessage : (Exception + "\nSource : " + Source);

            return _oOneViewException;
        } 
    }
}

function OneViewDefaultConfirmBox() {

    this.Show = function (Message) {
        var IsSuccess = confirm(Message);
        return IsSuccess;
    }
}

function OneViewSidePanel() {

    // Clear the side panel content
    this.Clear = function () {

        try{
            document.getElementById('divAutocomplatePopUp').innerHTML = "";
        }
        catch(Excep){
            throw oOneViewExceptionHandler.Create("Framework", "OneViewSidePanel.Clear", Excep);
        }
    }

    // Open the side panel
    this.Open = function (snapRemote, Side) {

        try {
            var Side = (Side == undefined) ? "right" : Side;
            snapRemote.open(Side);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneViewSidePanel.Open", Excep);
        }
        
    }

    // Close the side panel
    this.Close = function (snapRemote) {

        try {
            var Side = (Side == undefined) ? "right" : Side;
            snapRemote.close(Side);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneViewSidePanel.Close", Excep);
        }        
    }

    // Toggle the side panel
    this.Toggle = function (snapRemote) {

        try {
            var Side = (Side == undefined) ? "right" : Side;
            snapRemote.toggle(Side);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneViewSidePanel.Toggle", Excep);
        }        
    }
}

function OneViewCompiler() {

    // Parse HTML into DOM element    
    this.ParseHTML = function (Html) {

        try {
            var Result = angular.element(Html);
            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneViewCompiler.ParseHTML", Excep);
        }
    }

    // Compile the ParsedHtml
    this.Compile = function ($compile, ParsedHtml) {

        try {
            var Result = $compile(ParsedHtml);
            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneViewCompiler.Compile", Excep);
        }
    }

    // Link the compiled html with the scope
    this.AttachScope = function ($scope, CompiledHtml) {

        try {
            var Result = CompiledHtml($scope);
            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneViewCompiler.AttachScope", Excep);
        }
    }

    // Append to DOM
    this.AppendToDOM = function (DOMId, CompiledHtmlWithAttachedScope) {

        try {
            var DomObj = document.getElementById(DOMId);
            if (DomObj != null) {
                var Result = angular.element(DomObj);
                Result.append(CompiledHtmlWithAttachedScope);
                return true;
            }
            else {
                return false;
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneViewCompiler.AppendToDOM", Excep);
        }
    }

    // Compile and append the html
    this.CompileAndApeend = function ($scope, $compile, Html, DOMId) {

        try {
            var ParsedHtml = this.ParseHTML(Html);
            var CompiledHtml = this.Compile($compile, ParsedHtml);
            var CompiledHtmlWithAttachedScope = this.AttachScope($scope, CompiledHtml);
            var IsSuccess = this.AppendToDOM(DOMId, CompiledHtmlWithAttachedScope);

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneViewCompiler.CompileAndApeend", Excep);
        }
    }
}

// For sorting the array
var OneViewArraySorting = function(field, reverse, primer){

   var key = primer ? 
       function(x) {return primer(x[field])} : 
       function(x) {return x[field]};

   reverse = [-1, 1][+!!reverse];

   return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     } 
}

// OnewViewEventListener
function OnewViewEventListener(Key) {

    this.DefaultKey = "JavaScriptEventListener";

    this.RegisterSelectedFieldEvent = function () {

        try {
            if (Key == undefined) {
                var _oOnewViewEventListener = new window[this.DefaultKey]();
                _oOnewViewEventListener.RegisterSelectedFieldEvent();
            }
            else {
                alert("OnewViewEventListener.RegisterSelectedFieldEvent : Not implemented exception");
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "OnewViewEventListener.RegisterSelectedFieldEvent", Excep);
        }
    }

    this.RemoveAll = function () {

        try {
            if (Key == undefined) {
                var _oOnewViewEventListener = new window[this.DefaultKey]();
                _oOnewViewEventListener.RemoveAll();
            }
            else {
                alert("OnewViewEventListener.RemoveAll : Not implemented exception");
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "OnewViewEventListener.RemoveAll", Excep);
        }
    }
}

// JavaScriptEventListener
function JavaScriptEventListener() {

    /// <summary>
    /// RegisterSelectedFieldEvent   
    /// For current attribute selection
    /// </summary>    
    this.RegisterSelectedFieldEvent = function () {

        try {
            var alldiv = document.getElementById("ContentId");
            if (alldiv != null) {
                var colelements = alldiv.getElementsByClassName('light-bg');
                if (colelements != null) {
                    for (var i = 0; i < colelements.length; i++) {
                        var selement = colelements[i];
                        selement.addEventListener("click", function () { AddClassEvent(this, colelements); });
                    }
                }
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "OnewViewEventListener.RegisterSelectedFieldEvent", Excep);
        }
    }

    /// <summary>
    /// AddClassEvent
    /// </summary>
    /// <param name="selementold">Current attribute cell</param> 
    /// <param name="colelements">All attribute cells</param> 
    var AddClassEvent = function (selementold, colelements) {

        try {
            for (var i = 0; i < colelements.length; i++) {
                var selement = colelements[i];
                selement.className = selement.className.replace(" current-attr", "");
            }
            selementold.className = selementold.className + " current-attr";
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "OnewViewEventListener.AddClassEvent", Excep);
        }
    }

    /// <summary>
    /// RemoveAll
    /// RemoveAll selected colours from current page (For clear controls)
    /// </summary>  
    this.RemoveAll = function () {

        try {
            var alldiv = document.getElementById("ContentId");
            if (alldiv != null) {
                var colelements = alldiv.getElementsByClassName('light-bg');
                if (colelements != null) {
                    for (var i = 0; i < colelements.length; i++) {
                        var selement = colelements[i];
                        selement.className = selement.className.replace(" current-attr", "");
                    }
                }
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "NCColorComponent.Remove", Excep);
        }
    }
}

// NCColorComponent
function NCColorComponent() {

    /// <summary>
    /// Show
    /// Show the nc colour for current attribute column
    /// </summary>
    /// <param name="AttributeId">AttributeId</param> 
    this.Show = function (AttributeId) {

        try {                                
            var AttributeColumn = angular.element(document.querySelector('#Column_' + AttributeId));
            if (AttributeColumn.length > 0) {               
                AttributeColumn.removeClass('current-attr');
                AttributeColumn.addClass('alert-nc');
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "NCColorComponent.Show", Excep);
        }
    }

    /// <summary>
    /// Remove
    /// Remove the nc colour for current attribute column
    /// </summary>
    /// <param name="AttributeId">AttributeId</param> 
    this.Remove = function (AttributeId) {

        try {
            var AttributeColumn = angular.element(document.querySelector('#Column_' + AttributeId));
            if (AttributeColumn.length > 0) {
                AttributeColumn.removeClass('alert-nc');
                AttributeColumn.addClass('current-attr');
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "NCColorComponent.Remove", Excep);
        }
    }

    /// <summary>
    /// RemoveAll
    /// RemoveAll nc colours from current page (For clear controls)
    /// </summary>  
    this.RemoveAll = function () {

        try {
            var alldiv = document.getElementById("ContentId");
            if (alldiv != null) {
                var colelements = alldiv.getElementsByClassName('light-bg');
                if (colelements != null) {
                    for (var i = 0; i < colelements.length; i++) {
                        var selement = colelements[i];
                        selement.className = selement.className.replace(" alert-nc", "");
                    }
                }
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "NCColorComponent.Remove", Excep);
        }
    }
}

// OneViewSampleGenerator
function OneViewSampleGenerator() {

    /// <summary>
    /// GetNewSampleNumber
    /// </summary>
    /// <param name="Prefix">Prefix</param>
    /// <returns>Prefix_DeviceId_DayCode</returns>
    this.GetNewSampleNumber = function (Prefix) {

        try {
            var m_names = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");

            var _oDateTime = new DateTime();
            var DayCode = "" + _oDateTime.GetYear() + m_names[_oDateTime.GetMonth()] + _oDateTime.GetDay() + _oDateTime.GetHours() + _oDateTime.GetMinutes() + _oDateTime.GetSeconds();

            var Result = (Prefix != undefined && Prefix != "") ? Prefix + "_" + OneViewLocalStorage.Get("DeviceId") + "_" + GetClientDocId() : OneViewLocalStorage.Get("DeviceId") + "_" + GetClientDocId();

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "OneViewSampleGenerator.GetNewSampleNumber", Excep);
        }
    }


    /// <summary>
    /// GetClientDocId
    /// </summary>
    /// <returns>ClientDocId</returns>
    var GetClientDocId = function () {

        try {                      
            var ClientDocId = OneViewLocalStorage.Get("ClientDocId");

            if (ClientDocId == null) {
                OneViewLocalStorage.Save("ClientDocId", 1);
                ClientDocId = OneViewLocalStorage.Get("ClientDocId");
            }

            OneViewLocalStorage.Save("ClientDocId", parseInt(ClientDocId) + 1);

            return ClientDocId;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "OneViewSampleGenerator.SetClientDocId", Excep);
        }
    }
}

// OneViewDateTimeFormater
function OneViewDateTimeFormater() {

    /// <summary>
    /// GetClientDocId
    /// <param name="DateTime">DD-MM-YYYY HH:MM:SS / DD-MM-YYYY HH:MM</param>
    /// <param name="Format">DD-MM-YYYY / MM-DD-YYYY / YYYY-MM-DD / YYYY-DD-MM / DD-MM / DD-YYYY / MM-YYYY / HH:MM:SS / HH:MM / HH:SS / MM:SS</param>   
    /// </summary>
    /// <returns>Converted Format</returns>  
    this.Format = function (DateTime, Format) {

        try {                      
            var ConvertedFormat = DateTime;

            var oDateAndTime = new Array();
            var oDate = new Array();
            var oTime = new Array();

            if (DateTime.indexOf(" ") != -1) {
                oDateAndTime = DateTime.split(" ");
                if (oDateAndTime[0].indexOf("-") != -1) {
                    oDate = oDateAndTime[0].split("-");
                }
                if (oDateAndTime[1].indexOf(":") != -1) {
                    oTime = oDateAndTime[1].split(":");
                }
            }

            if (Format == 'DD-MM-YYYY' && oDate.length == 3) {
                ConvertedFormat = oDate[0] + ":" + oDate[1] + ":" + oDate[2];
            }
            else if (Format == 'MM-DD-YYYY' && oDate.length == 3) {
                ConvertedFormat = oDate[1] + ":" + oDate[0] + ":" + oDate[2];
            }
            else if (Format == 'YYYY-MM-DD' && oDate.length == 3) {
                ConvertedFormat = oDate[2] + ":" + oDate[1] + ":" + oDate[0];
            }
            else if (Format == 'YYYY-DD-MM' && oDate.length == 3) {
                ConvertedFormat = oDate[2] + ":" + oDate[0] + ":" + oDate[1];
            }
            else if (Format == 'DD-MM' && oDate.length >= 2) {
                ConvertedFormat = oDate[0] + ":" + oDate[1];
            }
            else if (Format == 'DD-YYYY' && oDate.length == 3) {
                ConvertedFormat = oDate[0] + ":" + oDate[2];
            }
            else if (Format == 'MM-YYYY' && oDate.length == 3) {
                ConvertedFormat = oDate[1] + ":" + oDate[2];
            }
            else if (Format == 'HH:MM:SS' && oTime.length == 3) {
                ConvertedFormat = oTime[0] + ":" + oTime[1] + ":" + oTime[2];
            }
            else if (Format == 'HH:MM' && oTime.length >= 2) {
                ConvertedFormat = oTime[0] + ":" + oTime[1];
            }
            else if (Format == 'HH:SS' && oTime.length == 3) {
                ConvertedFormat = oTime[0] + ":" + oTime[2];
            }
            else if (Format == 'MM:SS' && oTime.length == 3) {
                ConvertedFormat = oTime[1] + ":" + oTime[2];
            }

            return ConvertedFormat;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "OneViewDateTimeFormater.Format", Excep);
        }
    }
}

// GetOneViewDeviceId
function GetOneViewDeviceId() {
    try{
        return OneViewLocalStorage.Get("DeviceId");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("FrameWork", "GetOneViewDeviceId", Excep);
    }
}

// GetOneViewClientDocId
function GetOneViewClientDocId() {
    try {
        var ClientDocId = OneViewLocalStorage.Get("ClientDocId");

        if (ClientDocId == null) {
            OneViewLocalStorage.Save("ClientDocId", 1);
            ClientDocId = OneViewLocalStorage.Get("ClientDocId");
        }

        OneViewLocalStorage.Save("ClientDocId", parseInt(ClientDocId) + 1);

        return ClientDocId;
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("FrameWork", "GetOneViewDeviceId", Excep);
    }  
}




