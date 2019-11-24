
var IsDataLogModeEnabled = false;
var IsDebugModeEnabled = false;
var IsInfoModeEnabled = false;
var IsWarnModeEnabled = false;
var IsErrorModeEnabled = true;
var IsFatalModeEnabled = false;

var OneViewLogRecord = "";


var OneViewConsole = new OneViewLogFramework();

function OneViewLogFramework() {
    
    var myInstance = this;
   
    // Only for Data resultst, IL result
    this.DataLog = function (Msg, ClassDetails) {
        if (IsDataLogModeEnabled == true) {
            CreateLog("DATALOG", Msg, ClassDetails);
        }
    }

    this.Debug = function (Msg, ClassDetails){
        if (IsDebugModeEnabled == true) {
            CreateLog("DEBUG", Msg, ClassDetails);
        }
    }

    this.Info = function (Msg, ClassDetails) {
        if (IsDebugModeEnabled == true || IsInfoModeEnabled == true) {
            CreateLog("INFO", Msg, ClassDetails);
        }
    }

    this.Warn = function (Msg, ClassDetails) {
        if (IsDebugModeEnabled == true || IsInfoModeEnabled == true || IsWarnModeEnabled == true) {
            Msg += "** ";
            CreateLog("WARN", Msg, ClassDetails);
        }
    }

    this.Error = function (Msg, ClassDetails) {
        if (IsDebugModeEnabled == true || IsInfoModeEnabled == true || IsWarnModeEnabled == true || IsErrorModeEnabled == true) {
            Msg += "*** ";
            CreateLog("ERROR", Msg, ClassDetails);
        }
    }

    this.Fatal = function (Msg, ClassDetails) {
        if (IsDebugModeEnabled == true || IsInfoModeEnabled == true || IsWarnModeEnabled == true || IsErrorModeEnabled == true || IsFatalModeEnabled == true) {
            Msg += "**** ";
            CreateLog("FATAL", Msg, ClassDetails);
        }
    }

    var CreateLogOrg = function (Mode, Msg, ClassDetails) {//save in to local storage

        var NewLine = "\n";

        var oDateTime = new DateTime();
        var LogTime = oDateTime.GetDateAndTimeCustomSeparator("-", ":", " ");
		
        var OneViewLogRecord = NewLine + LogTime + " " + Mode + " " + ClassDetails + " - " + Msg;        
        OneViewLocalStorage.Save("OneViewLogRecord", OneViewLocalStorage.Get("OneViewLogRecord") + OneViewLogRecord);            
    }

    var CreateLog = function (Mode, Msg, ClassDetails) {//save in to internal storage

        var NewLine = "\n";

        var oDateTime = new DateTime();
        var LogTime = oDateTime.GetDateAndTimeCustomSeparator("-", ":", " ");
      
        OneViewLogRecord += NewLine + LogTime + " " + Mode + " " + ClassDetails + " - " + Msg;
       
        SaveToLocalStorage();
    }

    var SaveToLocalStorage = function () {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, GotFS, fail);
    }

    
    ///////////////Create Directory structure for Logs---- Start ////////////
    var GotFS = function (fileSystem) {

        //var _oDateTime = new DateTime();
        //var CurrentDate = _oDateTime.GetDate();
        var ServiceName = OneViewSessionStorage.Get("ServiceName");

       // alert('ServiceName : ' + ServiceName);
        if (ServiceName != null && ServiceName != '') {
            fileSystem.root.getDirectory("OneView/Log Files/" + ServiceName, { create: true, exclusive: false }, GotDateDirectoryEntry, fail);
        }
        else {
            fileSystem.root.getDirectory("OneView/Log Files/Common/", { create: true, exclusive: false }, GetFilePathForCommon, fail);
        }

    }

    var GetFilePathForCommon = function (directoryEntry) {

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
            fileSystem.root.getFile("OneView/Log Files/Common/Log.txt", { create: true, exclusive: false }, GotFileEntry, fail);
        }, fail);

    }


    var GotDateDirectoryEntry = function (directoryEntry) {
        //var _oDateTime = new DateTime();
        //var CurrentDate = _oDateTime.GetDate();
        var ServiceName = OneViewSessionStorage.Get("ServiceName");
        var userName = OneViewSessionStorage.Get("LoginUserName");

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
            fileSystem.root.getDirectory("OneView/Log Files/" + ServiceName + "/" + userName, { create: true, exclusive: false }, GotUserDirectoryEntry, fail);
        }, fail);

    }

    var GotUserDirectoryEntry = function (directoryEntry) {

        //var _oDateTime = new DateTime();
        //var CurrentDate = _oDateTime.GetDate();
        //var CurrentTime = _oDateTime.GetHours() + "-" + _oDateTime.GetMinutes() + "-" + _oDateTime.GetSeconds();
        var ServiceName = OneViewSessionStorage.Get("ServiceName");
        var userName = OneViewSessionStorage.Get("LoginUserName");

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
            fileSystem.root.getFile("OneView/Log Files/" + ServiceName + "/" + userName + "/Log.txt", { create: true, exclusive: false }, GotFileEntry, fail);
        }, fail);

    }

    ///////////////Create Directory structure for Logs---- End ////////////



    var GotFileEntry = function (fileEntry) {             
                fileEntry.createWriter(GotFileWriter, fail);     
    }

    var GotFileWriter = function(writer) {

        if (OneViewLogRecord != ""){
            // Take the current length for appending
          
            writer.seek(writer.length);
           
            // Write the data
            writer.write(OneViewLogRecord);

            OneViewLogRecord = "";
        }

    }

    var fail = function (error) {
        //alert("Error Code: " + error.code);
        //alert('error: ' + JSON.stringify(error));
    }

    
    this.Clear = function () {
       
        OneViewLocalStorage.Remove("OneViewLogRecord");
    }
    
    this.UpLoadLog = function () {

        var Log = FormatOneViewLogRecord();

        UploadLogToServer(Log);
    }   
    
    var FormatOneViewLogRecord = function () {
        
        var oDateTime = new DateTime();
        var DateAndTime = oDateTime.GetDateAndTimeCustomSeparator("-", ":", " ");
    	
    	var Header = "\n\n************************ OneViewLog Start : " + DateAndTime + " ************************\n\n";
    	
    	var Footer = "\n\n************************ OneViewLog End : " + DateAndTime + " ************************\n\n";
    	
    	var result = "";
    	
    	var LoginUserDetails = "Login UserName : " + OneViewSessionStorage.Get("LoginUserName") + ", ServiceName : " + OneViewSessionStorage.Get("ServiceName")+"\n";

    	var result = Header + LoginUserDetails + OneViewLocalStorage.Get("OneViewLogRecord") + Footer;
    	
    	return result;   
    }

    var UploadLogToServer = function (Log) {

        var Url = "http://10.20.25.159:8080/OneViewMobileTestServices/Log/UpLoad";

        $.ajax({
            type: "post",
            async: false,
            crossDomain: true,
            timeout: 20000,
            xhrFields: {
                withCredentials: true
            },
            url: Url,
            data: JSON.stringify({ 'req': Log }),
            contentType: "application/json; charset=utf-8",
            dataType: "text",           
            success: function (msg) {              
                myInstance.Clear();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (IsDevelopementMode == true) {
                    alert('UploadLog Error  :' + errorThrown);
                }
                else {
                    OneViewConsole.Error("Upload log failed", "OneViewLogFramework.UploadLogToServer");
                }
            }          
        });
    }






}