
var GlobalUploadDbAcrossServiceDict = {};
var GlobalUploadedDbCount = 0;
var GlobalCurrentDateTimeFolderName = "";
var IsGlobalImageUploadSuccess = false;
var GlobalTotalUploadImageCount = 0;
var GlobalUploadedImageCount = 0;
var GlobalXlatService = null;

function DbStructureController() {

    var MyInstance = this;

    this.Create = function() {

        try
        {
            OneViewConsole.Debug("Create start", "DbStructureController.Create");

            var _DbStructureDAO = new DbStructureDAO();
            var IsSuccess = _DbStructureDAO.Create();

            OneViewConsole.Debug("Create end", "DbStructureController.Create");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Controller", "DbStructureController.Create", Excep);
        }
        finally {
            _DbStructureDAO = null;
            IsSuccess = null;
        }
    }

    this.Drop = function() {

        try {
            OneViewConsole.Debug("Drop start", "DbStructureController.Drop");

            var _DbStructureDAO = new DbStructureDAO();
            var IsSuccess = _DbStructureDAO.Drop();

            OneViewConsole.Debug("Drop end", "DbStructureController.Drop");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Controller", "DbStructureController.Drop", Excep);
        }
        finally {
            _DbStructureDAO = null;
            IsSuccess = null;
        }
    }

    this.ReCreate = function() {

        try {
            OneViewConsole.Debug("ReCreate start", "DbStructureController.ReCreate");

            var _DbStructureDAO = new DbStructureDAO();
            var IsSuccess = _DbStructureDAO.ReCreate();

            OneViewConsole.Debug("ReCreate end", "DbStructureController.ReCreate");
            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Controller", "DbStructureController.ReCreate", Excep);
        }
        finally {
            _DbStructureDAO = null;
            IsSuccess = null;
        }
    }
    
    this.CopyDb = function () {

        try {
            OneViewConsole.Debug("CopyDb start", "DbStructureController.CopyDb");

            var _DbStructureDAO = new DbStructureDAO();
            var IsSuccess = _DbStructureDAO.CopyDb();

            OneViewConsole.Debug("CopyDb end", "DbStructureController.CopyDb");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Controller", "DbStructureController.CopyDb", Excep);
        }
        finally {
            _DbStructureDAO = null;
            IsSuccess = null;
        }
    }

    this.UploadDb = function () {

        try {
            OneViewConsole.Debug("UploadDb start", "DbStructureController.UploadDb");

            var _DbStructureDAO = new DbStructureDAO();
            var IsSuccess = _DbStructureDAO.UploadDb();

            OneViewConsole.Debug("UploadDb end", "DbStructureController.UploadDb");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Controller", "DbStructureController.UploadDb", Excep);
        }
        finally {
            _DbStructureDAO = null;
            IsSuccess = null;
        }
    }

    this.UploadLogs = function () {
        try {

            var _DbStructureDAO = new DbStructureDAO();
            var IsSuccess = _DbStructureDAO.UploadLogs();

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Controller", "DbStructureController.UploadLogs", Excep);
        }
        finally {
            _DbStructureDAO = null;
            IsSuccess = null;
        }
    }
    
    this.RestoreDb = function () {

        try {
            OneViewConsole.Debug("RestoreDb start", "DbStructureController.RestoreDb");

            var _DbStructureDAO = new DbStructureDAO();
            return _DbStructureDAO.RestoreDb();

            OneViewConsole.Debug("RestoreDb end", "DbStructureController.RestoreDb");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Controller", "DbStructureController.RestoreDb", Excep);
        }
        finally {
            _DbStructureDAO = null;
        }
    }
    
    this.ClearAllDCAndActions = function () {

        try {          
            OneViewConsole.Debug("ClearAllDc start", "DbStructureController.ClearAllDc");

            var _DbStructureDAO = new DbStructureDAO();
            _DbStructureDAO.DeleteAllDcData();
            _DbStructureDAO.DeleteAllActionData();
            _DbStructureDAO.DeleteAuditTrialData();
            _DbStructureDAO.DeleteApprovalData();
            _DbStructureDAO.DeleteAllRows("ActionManualFollowUpEntity");

            OneViewConsole.Debug("ClearAllDc end", "DbStructureController.ClearAllDc");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Controller", "DbStructureController.ClearAllDc", Excep);
        }
        finally {
            _DbStructureDAO = null;
        }
    }
    
    this.CleanDb = function () {

        try {
            OneViewConsole.Debug("CleanDb start", "DbStructureController.CleanDb");

            var _DbStructureDAO = new DbStructureDAO();
            _DbStructureDAO.CleanDb();

            OneViewConsole.Debug("CleanDb end", "DbStructureController.CleanDb");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Controller", "DbStructureController.CleanDb", Excep);
        }
        finally {
            _DbStructureDAO = null;
        }
    }

    this.CopyDbAcrossServiceEvent = function (xlatService) {

        try {
            OneViewConsole.Debug("CopyDbAcrossServiceEvent start", "DbStructureController.CopyDbAcrossServiceEvent");
            oSetDefaultSpinner.Start();

            var ServiceResponseList = MyInstance.CopyDbAcrossService(xlatService);

            if (ServiceResponseList != undefined) {
                var ErrorMessage = "Some error occurred while copying database for ";
                for (var i = 0; i < ServiceResponseList.length; i++) {
                    var Details = ServiceResponseList[i];
                    if (Details.IsSuccess == false) {
                        if (ErrorMessage != "Some error occurred while copying database for ") {
                            ErrorMessage += ",";
                        }
                        ErrorMessage += Details.Message;
                    }

                }

                if (ErrorMessage != "Some error occurred while copying database for ") {
                    ErrorMessage += " .Please Contact Administrator.";
                }
                else {
                    alert("Databases Copied Successfully");
                }
            }
            oSetDefaultSpinner.Stop();
            OneViewConsole.Debug("CopyDbAcrossServiceEvent end", "DbStructureController.CopyDbAcrossServiceEvent");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Controller", "DbStructureController.CopyDbAcrossServiceEvent", Excep);
        }
        finally {
            _DbStructureDAO = null;
        }
    }

    this.CopyDbAcrossService = function (xlatService) {

        try {
            OneViewConsole.Debug("CopyDbAcrossService start", "DbStructureController.CopyDbAcrossService");
            var ServiceResponseList = [];
            var Response = { 'IsSuccess': false, 'Message': '' };
          
            var _DbStructureDAO = new DbStructureDAO();

            //Get all services in the device
            var _oCloudManagerBO = new CloudManagerBO(xlatService);
            var CloudManagerServiceInfo = OneViewLocalStorage.Get("CloudManagerServiceInfo");
           
            if (CloudManagerServiceInfo != null) {
                CloudManagerServiceInfo = JSON.parse(CloudManagerServiceInfo);

                for (var ServiceId in CloudManagerServiceInfo) {
                    var ServicesDetails = CloudManagerServiceInfo[ServiceId];
                    //Service setting in session
                    OneViewSessionStorage.Save("ServiceId", ServicesDetails.Id);
                    OneViewSessionStorage.Save("ServiceName", ServicesDetails.Name);
                    _oCloudManagerBO.InitializeDBContext(ServicesDetails.Id);

                    var DBName = "Service" + ServicesDetails.Id + "DB";
                    var LocalDBFolderPath = "/mnt/sdcard/OneView/DB Backup/" + DBName;

                    var IsSuccess = _DbStructureDAO.CopyDb();
                    if (IsSuccess == true) {
                        Response.IsSuccess = true;
                        Response.Message = "Database Copied Successfully";
                    }
                    else {
                        Response.IsSuccess = false;
                        Response.Message = ServicesDetails.Name;
                    }

                    ServiceResponseList.push(Response);

                }
            }
            
            OneViewConsole.Debug("CopyDbAcrossService end", "DbStructureController.CopyDbAcrossService");

            return ServiceResponseList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Controller", "DbStructureController.CopyDbAcrossService", Excep);
        }
        finally {
            _DbStructureDAO = null;
        }
    }

   
    this.UploadDbAcrossService = function (xlatService) {

        try {
            OneViewConsole.Debug("UploadDbAcrossService start", "DbStructureController.UploadDbAcrossService");
            oSetDefaultSpinner.Start();
            var ServiceResponseList = MyInstance.CopyDbAcrossService(xlatService);

            var _DbStructureDAO = new DbStructureDAO();
            
            //Get all services in the device
            var _oCloudManagerBO = new CloudManagerBO(xlatService);
            var CloudManagerServiceInfo = OneViewLocalStorage.Get("CloudManagerServiceInfo");            
            if (CloudManagerServiceInfo != null) {
                CloudManagerServiceInfo = JSON.parse(CloudManagerServiceInfo);                
                var _oOneViewDeviceInfoPlugin = new OneViewDeviceInfoPlugin();
                var IMEI = _oOneViewDeviceInfoPlugin.GetIMEINumber();

                if (IMEI == 'undefined' || IMEI == '' || IMEI == undefined) {
                    IMEI = _oOneViewDeviceInfoPlugin.GetUUID();
                }

                var FirstServiceId;
                var CountOfServices = 0;
                for (var ServiceId in CloudManagerServiceInfo) {
                    if (CountOfServices == 0) {
                        FirstServiceId = ServiceId;
                    }
                    var ServicesDetails = CloudManagerServiceInfo[ServiceId];
                    GlobalUploadDbAcrossServiceDict[ServiceId] = { 'IsUploadSuccess': false, 'IMEI': IMEI, 'CloudManagerServiceInfo': CloudManagerServiceInfo[ServiceId] };
                    CountOfServices++;
                }

                var FirstServiceDetails = GlobalUploadDbAcrossServiceDict[FirstServiceId];
                var RemoteDBUploadFolderPath = ServicesDetails.SimpleStorageUrl + "SimpleStorageService.svc/SimpleStorageService/" + FirstServiceDetails.CloudManagerServiceInfo.Name + "/" + IMEI + "/DBBackup/";
                var DBName = "Service" + FirstServiceDetails.CloudManagerServiceInfo.Id + "DB";
                var LocalDBFolderPath = "/mnt/sdcard/OneView/DB Backup/" + DBName;

                _DbStructureDAO.UploadDbAcrossService(LocalDBFolderPath, RemoteDBUploadFolderPath, FirstServiceDetails);
            }           

            OneViewConsole.Debug("UploadDbAcrossService end", "DbStructureController.UploadDbAcrossService");
        }
        catch (Excep) {
            oSetDefaultSpinner.Stop();
            //alert("DbStructureController.UploadDbAcrossService : " + Excep + ", " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Controller", "DbStructureController.UploadDbAcrossService", Excep);
        }
        finally {
            _DbStructureDAO = null;
        }
    }


    this.UploadImagesAndDbAcrossService = function (xlatService) {

        try {
            OneViewConsole.Debug("UploadImagesAndDbAcrossService start", "DbStructureController.UploadImagesAndDbAcrossService");
            oSetDefaultSpinner.Start();
            GlobalXlatService = xlatService;

            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Confirmation'), xlatService.xlat('Do you want to upload Database ?'), function (ConfirmationId) {

                var _DbStructureDAO = new DbStructureDAO();

                if (ConfirmationId == "2") {

                    var ServiceResponseList = MyInstance.CopyDbAcrossService(xlatService);


                    //Get all services in the device
                    var _oCloudManagerBO = new CloudManagerBO(xlatService);
                    var CloudManagerServiceInfo = OneViewLocalStorage.Get("CloudManagerServiceInfo");
                    if (CloudManagerServiceInfo != null) {
                        CloudManagerServiceInfo = JSON.parse(CloudManagerServiceInfo);
                        var _oOneViewDeviceInfoPlugin = new OneViewDeviceInfoPlugin();
                        var IMEI = _oOneViewDeviceInfoPlugin.GetIMEINumber();

                        if (IMEI == 'undefined' || IMEI == '' || IMEI == undefined) {
                            IMEI = _oOneViewDeviceInfoPlugin.GetUUID();
                        }

                        var FirstServiceId;
                        var CountOfServices = 0;
                        for (var ServiceId in CloudManagerServiceInfo) {
                            if (CountOfServices == 0) {
                                FirstServiceId = ServiceId;
                            }
                            var ServicesDetails = CloudManagerServiceInfo[ServiceId];
                            GlobalUploadDbAcrossServiceDict[ServiceId] = { 'IsUploadSuccess': false, 'IMEI': IMEI, 'CloudManagerServiceInfo': CloudManagerServiceInfo[ServiceId] };
                            CountOfServices++;
                        }

                        var FirstServiceDetails = GlobalUploadDbAcrossServiceDict[FirstServiceId];
                        // var PackageName = MyInstance.GetPackageName();
                        MyInstance.GetCurrentDateTimeFolderName();

                        var userName = OneViewSessionStorage.Get("LoginUserName");
                        var ServiceName = OneViewSessionStorage.Get("ServiceName");
                        //alert('userName : ' + userName);
                        //alert('ServiceName : ' + ServiceName);
                        //Upload DB for first service
                        var RemoteDBUploadFolderPath = ServicesDetails.SimpleStorageUrl + "SimpleStorageService.svc/SimpleStorageService/" + FirstServiceDetails.CloudManagerServiceInfo.Name + "/" + IMEI + "/DBBackup/" + GlobalCurrentDateTimeFolderName + "/";

                        var DBName = "Service" + FirstServiceDetails.CloudManagerServiceInfo.Id + "DB";
                        var LocalDBFolderPath = "/mnt/sdcard/OneView/DB Backup/" + DBName;

                        _DbStructureDAO.UploadDbAcrossServiceForImages(LocalDBFolderPath, RemoteDBUploadFolderPath, FirstServiceDetails);

                    }
                }
                else {
                    _DbStructureDAO.UploadLogsAfterDb(GlobalXlatService);
                    oSetDefaultSpinner.Stop();
                }
            });

            OneViewConsole.Debug("UploadImagesAndDbAcrossService end", "DbStructureController.UploadImagesAndDbAcrossService");
        }
        catch (Excep) {
            oSetDefaultSpinner.Stop();
            //alert("DbStructureController.UploadImagesAndDbAcrossService : " + Excep + ", " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Controller", "DbStructureController.UploadImagesAndDbAcrossService", Excep);
        }
        finally {
            _DbStructureDAO = null;
        }
    }


    this.GetCurrentDateTimeFolderName = function (xlatService) {

        try {
            OneViewConsole.Debug("GetCurrentDateTimeFolderName start", "DbStructureController.GetCurrentDateTimeFolderName");

            GlobalCurrentDateTimeFolderName = "";

            var _oDateTime = new DateTime();
            GlobalCurrentDateTimeFolderName = _oDateTime.GetDate() + "_" + _oDateTime.GetHours() + _oDateTime.GetMinutes() + _oDateTime.GetSeconds();

            //alert('GlobalCurrentDateTimeFolderName :' + GlobalCurrentDateTimeFolderName);
            OneViewConsole.Debug("GetCurrentDateTimeFolderName end", "DbStructureController.GetCurrentDateTimeFolderName");

            return GlobalCurrentDateTimeFolderName;
        }
        catch (Excep) {
            //alert("DbStructureController.GetCurrentDateTimeFolderName : " + Excep + ", " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Controller", "DbStructureController.GetCurrentDateTimeFolderName", Excep);
        }
        finally {
            _DbStructureDAO = null;
        }
    }

  
}

function DbStructureDAO() {

    var MyInstance = this;

    var _oOneViewSqlitePlugin = new OneViewSqlitePlugin();

    this.Create = function () {
        try {
            OneViewConsole.Debug("Create start", "DbStructureDAO.Create");

            CreateDbStructure();

            OneViewConsole.Debug("Create end", "DbStructureDAO.Create");

            return true;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DbStructureDAO.Create", Excep);
        }
    }

    this.Drop = function () {

        try {
            OneViewConsole.Debug("Drop start", "DbStructureDAO.Drop");

            DropDbStructure();

            OneViewConsole.Debug("Drop end", "DbStructureDAO.Drop");

            return true;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DbStructureDAO.Drop", Excep);
        }
    }

    this.ReCreate = function () {

        try {
            OneViewConsole.Debug("ReCreate start", "DbStructureDAO.ReCreate");

            MyInstance.Drop();
            MyInstance.Create();
            EnableIndexing();

            OneViewConsole.Debug("ReCreate end", "DbStructureDAO.ReCreate");

            return true;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DbStructureDAO.ReCreate", Excep);
        }
    }


    this.CopyDb = function () {

        try {
            OneViewConsole.Debug("CopyDb start", "DbStructureDAO.CopyDb");

            _oOneViewSqlitePlugin.CopyDatabase();

            OneViewConsole.Debug("CopyDb end", "DbStructureDAO.CopyDb");

            return true;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DbStructureDAO.CopyDb", Excep);
        }
    }

    this.RestoreDb = function () {

        try {
            OneViewConsole.Debug("RestoreDb start", "DbStructureDAO.RestoreDb");

            _oOneViewSqlitePlugin.RestoreDatabase();

            OneViewConsole.Debug("RestoreDb end", "DbStructureDAO.RestoreDb");

            return true;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DbStructureDAO.RestoreDb", Excep);
        }
    }


    var CreateDbStructure = function () {

        try {
            OneViewConsole.Debug("CreateDbStructure start", "DbStructureDAO.CreateDbStructure");

            var oSqliteQG = new SqliteQG();
            for (var itrSqliteDataContext = 0; itrSqliteDataContext < SqliteDataContext.length; itrSqliteDataContext++) {
                var Query = oSqliteQG.GetCreateTableQuery(new window[SqliteDataContext[itrSqliteDataContext]]);
                CreateTable(Query);
            }

            OneViewConsole.Debug("CreateDbStructure end", "DbStructureDAO.CreateDbStructure");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DbStructureDAO.CreateDbStructure", Excep);
        }
        finally {
            oSqliteQG = null;
            Query = null;
        }
    }

    this.UploadDb = function () {

        try {
            OneViewConsole.Debug("UploadDb start", "DbStructureDAO.UploadDb");

            //MyInstance.CopyDb();

            
            var userName = OneViewSessionStorage.Get("LoginUserName");
            var ServiceName = OneViewSessionStorage.Get("ServiceName");
         
            //todo:Need to read from live db
            var OrganizationName = "EKFC";
            
            if(OSType != OSTypeEnum.IOS) //Android
            {

            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = "OneView";
            options.httpMethod = 'POST';

           // var userName = OneViewSessionStorage.Get("LoginUserName");
           // var ServiceName = OneViewSessionStorage.Get("ServiceName");
           // var OrganizationName = "EKFC";

            var DBName = "Service" + OneViewSessionStorage.Get("ServiceId") + "DB";

            // Todo: Siva
            // Temporarily added for solving arabic text not supporting in url
            // Need to migrate all clients like below way or fix the arabic text issue in url
            var ServiceId = OneViewSessionStorage.Get("ServiceId");
            if (ServiceId == 10) {
                ServiceName = ServiceId;
                OrganizationName = OneViewSessionStorage.Get("OrganizationId");
                userName = OneViewSessionStorage.Get("LoginUserId");
            }

            //var params = {};
            // params.UserName = userName;
           // params.OrgName = ServiceName;

           // options.params = params; 
            var ft = new FileTransfer();
            //http://winaim.biz/SimpleStorageService/SimpleStorageService.svc/SimpleStorageService
            ////http://10.20.25.6:8090/UploadNew/Operations/UploadDatabase
            //ft.upload("/mnt/sdcard/OneView/DB Backup/OneView", encodeURI("http://10.20.25.158/WINAIMStorageService/SimpleStorageService.svc/SimpleStorageService/" + ServiceName + "/" + OrganizationName + "/" + userName + "/DBBackup/"), UploadDbSuccess, UploadDbfail, options, true);
            //ft.upload("/mnt/sdcard/OneView/DB Backup/OneView", encodeURI("http://10.20.25.158/SimpleStorageService/SimpleStorageService.svc/SimpleStorageService/" + ServiceName + "/" + OrganizationName + "/" + userName + "/DBBackup/"), UploadDbSuccess, UploadDbfail, options, true);

            ////ft.upload("/mnt/sdcard/OneView/DB Backup/OneView", encodeURI("http://winaim.biz/SimpleStorageService/SimpleStorageService.svc/SimpleStorageService/" + ServiceName + "/" + OrganizationName + "/" + userName + "/DBBackup/"), UploadDbSuccess, UploadDbfail, options, true);

            ft.upload("/mnt/sdcard/OneView/DB Backup/" + DBName, encodeURI(oneViewGlobalVariables.SimpleStorageURL + "SimpleStorageService.svc/SimpleStorageService/" + ServiceName + "/" + OrganizationName + "/" + userName + "/DBBackup/"), UploadDbSuccess, UploadDbfail, options, true);
            }
            if(OSType ==OSTypeEnum.IOS) //ios
            {
                var uri=oneViewGlobalVariables.SimpleStorageURL + "SimpleStorageService.svc/SimpleStorageService/" + ServiceName + "/" + OrganizationName + "/" + userName + "/DBBackup/";
                var resp=window.OneViewSqlite.UploadDB(uri);
                
                var resp=JSON.parse(resp);
                if(resp.IsAnyException=="false")
                {
                    alert('DB uploaded successfully');
                }
                else
                {
                    alert('Error downloading file');
                    //alert(JSON.stringify(details));
                }
            }
            OneViewConsole.Debug("UploadDb end", "DbStructureDAO.UploadDb");
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DbStructureDAO.UploadDb", Excep);
        }
        finally {
            options = null;
            LoginUserName = null;
            ServiceName = null;
            params = null;
            ft = null;
        }
    }

    this.UploadLogs = function () {
        try {
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = "Log.txt";
            options.httpMethod = 'POST';

            var userName = OneViewSessionStorage.Get("LoginUserName");
            var ServiceName = OneViewSessionStorage.Get("ServiceName");
            var OrganizationName = "EKFC";

            // Todo: Siva
            // Temporarily added for solving arabic text not supporting in url
            // Need to migrate all clients like below way or fix the arabic text issue in url
            var ServiceId = OneViewSessionStorage.Get("ServiceId");
            if (ServiceId == 10) {
                ServiceName = ServiceId;
                OrganizationName = OneViewSessionStorage.Get("OrganizationId");
                userName = OneViewSessionStorage.Get("LoginUserId");
            }

           // var params = {};
           // params.UserName = LoginUserName;
           // params.OrgName = ServiceName;

          //  var _oDateTime = new DateTime();
           // var CurrentDate = _oDateTime.GetDate();

            //options.params = params;
            var ft = new FileTransfer();
            ////////////http://10.20.25.6:8090/UploadNew/Operations/UploadLog
            //http://10.20.25.158/WINAIMStorageService/SimpleStorageService.svc/SimpleStorageService

            ////ft.upload("/mnt/sdcard/OneView/Log Files/" + ServiceName + "/" + userName + "/Log.txt", encodeURI("http://10.20.25.158/WINAIMStorageService/SimpleStorageService.svc/SimpleStorageService/" + ServiceName + "/" + OrganizationName + "/" + userName + "/LogFiles/"), UploadLogsSuccess, UploadLogfail, options, true);
           // ft.upload("/mnt/sdcard/OneView/Log Files/" + ServiceName + "/" + userName + "/Log.txt", encodeURI("http://10.20.25.158/SimpleStorageService/SimpleStorageService.svc/SimpleStorageService/" + ServiceName + "/" + OrganizationName + "/" + userName + "/LogFiles/"), UploadLogsSuccess, UploadLogfail, options, true);

           ////// ft.upload("/mnt/sdcard/OneView/Log Files/" + ServiceName + "/" + userName + "/Log.txt", encodeURI("http://winaim.biz/SimpleStorageService/SimpleStorageService.svc/SimpleStorageService/" + ServiceName + "/" + OrganizationName + "/" + userName + "/LogFiles/"), UploadLogsSuccess, UploadLogfail, options, true);

            ft.upload("/mnt/sdcard/OneView/Log Files/" + ServiceName + "/" + userName + "/Log.txt", encodeURI(oneViewGlobalVariables.SimpleStorageURL+"SimpleStorageService.svc/SimpleStorageService/" + ServiceName + "/" + OrganizationName + "/" + userName + "/LogFiles/"), UploadLogsSuccess, UploadLogfail, options, true);

        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DbStructureDAO.UploadLogs", Excep);
        }
        finally {
            options = null;
            LoginUserName = null;
            ServiceName = null;
            params = null;
            ft = null;
        }
    }



    ///////////////start With directory structure to delete ////////////

    var GetFromLocalStorage = function () {
        try {

            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, GotFSTodelete, Deletefail);
        }
        catch (e) {
            alert(e);
        }
    }

    var GotFSTodelete = function (fileSystem) {
        try {
            //var _oDateTime = new DateTime();
            //var CurrentDate = _oDateTime.GetDate();
            var userName = OneViewSessionStorage.Get("LoginUserName");
            var ServiceName = OneViewSessionStorage.Get("ServiceName");

            fileSystem.root.getFile("OneView/Log Files/" + ServiceName + "/" + userName + "/Log.txt", { create: true, exclusive: false }, GotFileEntryToDelete, Deletefail);

        }

        catch (e) {
            alert('GotFSTodelete' + e);
        }
        finally {
            userName = null;
            ServiceName = null;
        }
    }

    var GotFileEntryToDelete = function (fileEntry) {
        try {
            fileEntry.file(function (fileObj) {
                fileEntry.remove(LocalLogDeleteWin, Deletefail);
            });
        }
        catch (e) {
            alert(e);
        }


    }

    ///////////////end With directory structure to delete ////////////


    this.DownloadLogs = function (Source, Destination)
    {
        alert("DownloadLogs");
        var oDateTime = new DateTime();    
        var FileName = "Log_" + oDateTime.GetDateByCustomSeparator("-") + "_" + oDateTime.GetTimeCustomSeparator("-") + ".txt";

        var ServiceName = OneViewSessionStorage.Get("ServiceName");
        var OrganizationName = "EKFC";
        var userName = OneViewSessionStorage.Get("LoginUserName");

        SaveToLocalStorage();
       //// Source = "http://winaim.biz/SimpleStorageService/SimpleStorageService.svc/SimpleStorageService/" + ServiceName + "/" + OrganizationName + "/" + userName + "/LogFiles/Log.txt"; 
        Source = "http://10.20.25.158/SimpleStorageService/SimpleStorageService.svc/SimpleStorageService/" + ServiceName + "/" + OrganizationName + "/" + userName + "/LogFiles/Log.txt";

        Destination = "file:///mnt/sdcard/OneView/downloads/" + ServiceName + "/" + OrganizationName + "/" + userName + "/LogFiles/" + FileName;

        var fileTransfer = new FileTransfer();
        var uri = encodeURI(Source);

        fileTransfer.download(
            uri,
            Destination,
            DownloadSuccessCallback,
            DownloadErrorCallback,      //error codes
            false,
            {
                headers: {
                    "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                }
            }
        );
    }

    var DownloadSuccessCallback = function (url) {
        alert("File downloaded successfully to location :" + JSON.stringify(url));
    }

   var DownloadErrorCallback = function (details) {
        alert('Error downloading file');
        alert(JSON.stringify(details));
   }


    ///////////////Create Directory structure for DOWNLOADED Logs---- Start ////////////

   var SaveToLocalStorage = function () {
       window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, GettFSForDownloadedLogs, fail);
   }

   var GettFSForDownloadedLogs = function (fileSystem) {

       //var _oDateTime = new DateTime();
       //var CurrentDate = _oDateTime.GetDate();
       var ServiceName = OneViewSessionStorage.Get("ServiceName");

       fileSystem.root.getDirectory("OneView/downloads/" + ServiceName, { create: true, exclusive: false }, GotServiceDirectoryEntry, fail);

   }

   var GotServiceDirectoryEntry = function (directoryEntry) {
       //var _oDateTime = new DateTime();
       //var CurrentDate = _oDateTime.GetDate();
       var ServiceName = OneViewSessionStorage.Get("ServiceName");
       var OrganizationName = "EKFC";
       var userName = OneViewSessionStorage.Get("LoginUserName");

       window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
           fileSystem.root.getDirectory("OneView/downloads/" + ServiceName + "/" + OrganizationName, { create: true, exclusive: false }, GetOrgDirectoryEntry, fail);
       }, fail);

   }

   var GetOrgDirectoryEntry = function (directoryEntry) {
       //var _oDateTime = new DateTime();
       //var CurrentDate = _oDateTime.GetDate();
       var ServiceName = OneViewSessionStorage.Get("ServiceName");
       var OrganizationName = "EKFC";
       var userName = OneViewSessionStorage.Get("LoginUserName");

       window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
           fileSystem.root.getDirectory("OneView/downloads/" + ServiceName + "/" + OrganizationName + "/" + userName, { create: true, exclusive: false }, GotUserDirectoryEntry, fail);
       }, fail);

   }

   var GotUserDirectoryEntry = function (directoryEntry) {
       //var _oDateTime = new DateTime();
       //var CurrentDate = _oDateTime.GetDate();
       //var CurrentTime = _oDateTime.GetHours() + "-" + _oDateTime.GetMinutes() + "-" + _oDateTime.GetSeconds();
       var ServiceName = OneViewSessionStorage.Get("ServiceName");
       var OrganizationName = "EKFC";
       var userName = OneViewSessionStorage.Get("LoginUserName");


       window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
           fileSystem.root.getDirectory("OneView/downloads/" + ServiceName + "/" + OrganizationName + "/" + userName, { create: true, exclusive: false }, GotLogDirectoryEntry, fail);
       }, fail);

   }

   var GotLogDirectoryEntry = function (directoryEntry) {
       //var _oDateTime = new DateTime();
       //var CurrentDate = _oDateTime.GetDate();
       //var CurrentTime = _oDateTime.GetHours() + "-" + _oDateTime.GetMinutes() + "-" + _oDateTime.GetSeconds();
       var ServiceName = OneViewSessionStorage.Get("ServiceName");
       var OrganizationName = "EKFC";
       var userName = OneViewSessionStorage.Get("LoginUserName");

       window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
           fileSystem.root.getDirectory("OneView/downloads/" + ServiceName + "/" + OrganizationName + "/" + userName + "/LogFiles/", { create: true, exclusive: false }, win, fail);
       }, fail);

   }

   var win = function () {
   }

   var fail = function (error) {
       alert("Download Error Code: "+error.code);
   }
    ///////////////Create Directory structure for DOWNLOADED Logs---- End ////////////



    var LocalLogDeleteWin = function (r) {
        //alert('Local log deleted successfully');       
    }
    var UploadDbSuccess = function (r) {
        alert(OneViewGlobalization[CurrentLanguage].DB_uploaded_successfully);        
    }

    var UploadLogsSuccess = function (r) {
        alert('Log uploaded successfully');
        GetFromLocalStorage();
    }

    var UploadDbfail = function (error) {
        //alert("Error Code: " + error.code);//FileTransferError.FILE_NOT_FOUND_ERR
        //alert(JSON.stringify(error));
        //if (error.code == 1) {
        //    alert("No DB avialable to upload");
        //}
        //else {
        //    alert("DB Upload failed");
        //}
       // alert("Please contact administrator, Error Code : " + error.http_status);
        alert(OneViewGlobalization[CurrentLanguage].DB_Upload_Failed);
    }

    var UploadLogfail = function (error) {
       // alert("Error : " + JSON.stringify(error));
       // alert("Error Code: " + error.code);//FileTransferError.FILE_NOT_FOUND_ERR
        //if (error.code == 1) {
        //    alert("No logs available to upload");
        //}
        //else {
        //    alert("Log Upload failed");
        //}
        alert("Please contact administrator, Error Code : " + error.http_status);
    }

    var Deletefail = function (error) {
        //alert("No log file exists to delete");
    }

    var DropDbStructure = function () {

        try {
            OneViewConsole.Debug("DropDbStructure start", "DbStructureDAO.DropDbStructure");

            for (var itrSqliteDataContext = 0; itrSqliteDataContext < SqliteDataContext.length; itrSqliteDataContext++) {
                DropTable(SqliteDataContext[itrSqliteDataContext]);
            }

            OneViewConsole.Debug("DropDbStructure end", "DbStructureDAO.DropDbStructure");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DbStructureDAO.DropDbStructure", Excep);
        }
    }

    var CreateTable = function (Query) {

        try {
            OneViewConsole.Debug("CreateTable start", "DbStructureDAO.CreateTable");

            _oOneViewSqlitePlugin.ExcecuteSql(Query);

            OneViewConsole.Debug("CreateTable end", "DbStructureDAO.CreateTable");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DbStructureDAO.CreateTable", Excep);
        }       
    }

    var DropTable = function (TableName) {

        try {
            OneViewConsole.Debug("DropTable start", "DbStructureDAO.DropTable");

            _oOneViewSqlitePlugin.Drop(TableName);

            OneViewConsole.Debug("DropTable end", "DbStructureDAO.DropTable");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DbStructureDAO.DropTable", Excep);
        }      
    }
 
    this.DeleteAllTableRows = function (TableNamelst) {

        try {
            OneViewConsole.Debug("DeleteAllTableRows start", "DbStructureDAO.DeleteAllTableRows");

            for (var i = 0; i < TableNamelst.length; i++) {
                MyInstance.DeleteAllRows(TableNamelst[i]);
            }

            OneViewConsole.Debug("DeleteAllTableRows end", "DbStructureDAO.DeleteAllTableRows");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DbStructureDAO.DeleteAllTableRows", Excep);
        }      
    }

    this.DeleteAllRows = function (TableName) {

        try {
            OneViewConsole.Debug("DeleteAllRows start", "DbStructureDAO.DeleteAllRows");

            _oOneViewSqlitePlugin.DeleteAll(TableName);

            OneViewConsole.Debug("DeleteAllRows end", "DbStructureDAO.DeleteAllRows");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DbStructureDAO.DeleteAllRows", Excep);
        }      
    }

    this.DeleteAllMasterData = function () {

        try {
            OneViewConsole.Debug("DeleteAllMasterData start", "DbStructureDAO.DeleteAllMasterData");

            MyInstance.DeleteAllTableRows(MasterTables);

            OneViewConsole.Debug("DeleteAllMasterData end", "DbStructureDAO.DeleteAllMasterData");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DbStructureDAO.DeleteAllMasterData", Excep);
        }        
    }

    this.DeleteAllNodeData = function () {

        try {
            OneViewConsole.Debug("DeleteAllNodeData start", "DbStructureDAO.DeleteAllNodeData");

            MyInstance.DeleteAllTableRows(NodeTables);

            OneViewConsole.Debug("DeleteAllNodeData end", "DbStructureDAO.DeleteAllNodeData");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DbStructureDAO.DeleteAllNodeData", Excep);
        }       
    }

    this.DeleteAllProfileData = function () {

        try {
            OneViewConsole.Debug("DeleteAllProfileData start", "DbStructureDAO.DeleteAllProfileData");

            MyInstance.DeleteAllTableRows(ProfileTables);

            OneViewConsole.Debug("DeleteAllProfileData end", "DbStructureDAO.DeleteAllProfileData");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DbStructureDAO.DeleteAllProfileData", Excep);
        }      
    }

    this.DeleteAllActionData = function () {

        try {
            OneViewConsole.Debug("DeleteAllActionData start", "DbStructureDAO.DeleteAllActionData");

            MyInstance.DeleteAllTableRows(ActionTables);

            OneViewConsole.Debug("DeleteAllActionData end", "DbStructureDAO.DeleteAllActionData");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DbStructureDAO.DeleteAllActionData", Excep);
        }      
    }

    this.DeleteAllDcData = function () {

        try {
            OneViewConsole.Debug("DeleteAllDcData start", "DbStructureDAO.DeleteAllDcData");

            MyInstance.DeleteAllTableRows(DcTables);

            OneViewConsole.Debug("DeleteAllDcData end", "DbStructureDAO.DeleteAllDcData");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DbStructureDAO.DeleteAllDcData", Excep);
        }      
    }

    this.DeleteAuditTrialData = function () {

        try {
            OneViewConsole.Debug("DeleteAuditTrialData start", "DbStructureDAO.DeleteAuditTrialData");

            MyInstance.DeleteAllTableRows(AuditTrialTables);

            OneViewConsole.Debug("DeleteAuditTrialData end", "DbStructureDAO.DeleteAuditTrialData");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DbStructureDAO.DeleteAuditTrialData", Excep);
        }
    }

    this.DeleteApprovalData = function () {

        try {
            OneViewConsole.Debug("DeleteApprovalData start", "DbStructureDAO.DeleteApprovalData");

            MyInstance.DeleteAllTableRows(DcApprovalTables);

            OneViewConsole.Debug("DeleteApprovalData end", "DbStructureDAO.DeleteApprovalData");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DbStructureDAO.DeleteApprovalData", Excep);
        }
    }

    this.DeleteMasterDataRegistry = function () {

        try {
            OneViewConsole.Debug("DeleteMasterDataRegistry start", "DbStructureDAO.DeleteMasterDataRegistry");

            MyInstance.DeleteAllRows("MasterdataRegistry");

            OneViewConsole.Debug("DeleteMasterDataRegistry end", "DbStructureDAO.DeleteMasterDataRegistry");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DbStructureDAO.DeleteMasterDataRegistry", Excep);
        }     
    }

    this.CleanDb = function () {

        try {
            OneViewConsole.Debug("CleanDb start", "DbStructureDAO.CleanDb");

            MyInstance.DeleteAllTableRows(SqliteDataContext);

            OneViewConsole.Debug("CleanDb end", "DbStructureDAO.CleanDb");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DbStructureDAO.CleanDb", Excep);
        }      
    }

    var EnableIndexing = function() {

        try {
            OneViewConsole.Debug("EnableIndexing start", "DbStructureDAO.EnableIndexing");

            var IndexConfig = [
                {
                    TableName: "DcProfileEntity",
                    Columns: ["Id", "ServiceId", "ServerId", "DcUserId", "TemplateNodeId", "DcPlaceId", "DcPlaceDimension"]
                },
                {
                    TableName: "DefaultScheduleEntity",
                    Columns: ["Id", "ServerId", "ReccurenceId", "FromTime", "ToTime", "ShiftId", "StartDate", "EndDate", "DcProfileId"]
                },
                {
                    TableName: "DcProfileSyncStatus",
                    Columns: ["Id", "ServiceId", "DcProfileId", "TemplateNodeId", "DcPlaceId", "DcPlaceDimension", "DcUserId"]
                },
                {
                    TableName: "DcPendingTaskEntity",
                    Columns: ["Id", "ServiceId", "DcProfileId", "DcUserId", "DcPlaceId", "DcPlaceDimension", "TemplateNodeId", "ShiftId", "ReccurenceId", "StartDate", "EndDate", "FromTime", "ToTime"]
                },
                {
                    TableName: "DataCaptureEntity",
                    Columns: ["Id", "ClientGuid", "ServiceId", "TemplateNodeId", "DcProfileId", "DcPlaceDimension", "DcPlaceId", "DcPlaceName", "TemplateNodeName", "IsCompleted", "IsSynchronized", "IsSubmit", "ApprovalStatus", "IsBlocker"]
                },
                {
                    TableName: "DcResultsEntity",
                    Columns: ["Id", "ClientGuid", "ServiceId", "DataCaptureId", "SystemUserId", "ShiftId"]
                },
                {
                    TableName: "DcResultDetailsEntity",
                    Columns: ["Id", "ClientGuid", "ServiceId", "DataCaptureId", "DataResultsId", "AttributeNodeId", "ControlId", "AttributeNodeName", "AnswerValue", "Answer", "LastUpdatedDate"]
                },
                {
                    TableName: "AttributeOtherConfigEntity",
                    Columns: ["Id", "ServiceId", "DcPlaceId", "DcPlaceDimension", "DcUserId", "TemplateNodeId"]
                },
                {
                    TableName: "ActionNCProfileEntity",
                    Columns: ["Id", "ServerId", "ServiceId", "DcUserId", "TemplateNodeId", "DcPlaceId", "DcPlaceDimension"]
                },
                {
                    TableName: "DCNCMapping",
                    Columns: ["Id", "ClientGuid", "DataCaptureClientGuid", "DcResultsClientGuid", "DcResultDetailsClientGuid", "ActionClientGuid", "NCRuleId"]
                },
                {
                    TableName: "ActionEntity",
                    Columns: ["Id", "ClientGuid"]
                },
                {
                    TableName: "ActionDetailsEntity",
                    Columns: ["Id", "ClientGuid", "DataCaptureClientGuid", "ActionClientGuid"]
                },
                {
                    TableName: "DCBlockerInfoEntity",
                    Columns: ["Id", "ClientGuid", "DataCaptureClientGuid", "DcResultsClientGuid", "DcResultDetailsClientGuid", "DCBlockerDataCaptureClientGuid"]
                },
                {
                    TableName: "MultiMediaSubElements",
                    Columns: ["Id", "ClientGuid", "MappedEntityClientGuid", "Dimension"]
                },
                {
                    TableName: "MultiMediaBlobSubElements",
                    Columns: ["Id", "ClientGuid", "MappedEntityClientGuid", "Dimension"]
                },
                {
                    TableName: "DcApprovalProfileEntity",
                    Columns: ["Id", "ServerId", "ServiceId", "DcUserId", "TemplateNodeId", "DcPlaceId", "DcPlaceDimension", "ValidityStartDate", "ValidityEndDate"]
                },
                {
                    TableName: "DcApprovalLevelInfoEntity",
                    Columns: ["Id", "ServiceId", "DcApprovalProfileId", "ApprovalIndex"]
                },
                {
                    TableName: "DcApprovalUserDetailsEntity",
                    Columns: ["Id", "ServiceId", "DcApprovalLevelInfoId", "DcApprovalProfileId", "UserId"]
                },
                {
                    TableName: "BusinessCalendarEntity",
                    Columns: ["Id", "ClientGuid", "ServerId", "ServiceId", "StartDate", "EndDate"]
                },
                {
                    TableName: "PeriodTypeEntity",
                    Columns: ["Id", "ClientGuid", "ServerId", "ServiceId"]
                },
                {
                    TableName: "PeriodEntity",
                    Columns: ["Id", "ClientGuid", "ServerId", "BusinessCalendarServerId", "PeriodTypeServerId", "ServiceId", "StartDate", "EndDate"]
                },
            ]

            for (var i = 0; i < IndexConfig.length; i++) {
                for (var j = 0; j < IndexConfig[i].Columns.length; j++) {
                    _oOneViewSqlitePlugin.ExcecuteSql('CREATE INDEX index_' + IndexConfig[i].TableName + '_' + IndexConfig[i].Columns[j] + ' on ' + IndexConfig[i].TableName + ' ("' + IndexConfig[i].Columns[j] + '")');
                }
            }

            OneViewConsole.Debug("EnableIndexing end", "DbStructureDAO.EnableIndexing");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DbStructureDAO.EnableIndexing", Excep);
        }
    }

    this.UploadDbAcrossService = function (LocalDBFolderPath, RemoteDBUploadFolderPath, ServiceDetails) {
        try {
            OneViewConsole.Debug("UploadDbAcrossService start", "DbStructureDAO.UploadDbAcrossService");
          
            MyInstance.UploadDbForParticularService(LocalDBFolderPath, RemoteDBUploadFolderPath, ServiceDetails);

            OneViewConsole.Debug("UploadDbAcrossService end", "DbStructureDAO.UploadDbAcrossService");
        }
        catch (Excep) {
            //alert("DbStructureDAO.UploadDbAcrossService : " + Excep + ", " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("DAO", "DbStructureDAO.UploadDbAcrossService", Excep);
        }
    }


    this.UploadDbForParticularService = function (LocalDBFolderPath, RemoteDBUploadFolderPath, ServiceDetails) {
        try {
            OneViewConsole.Debug("UploadDbForParticularService start", "DbStructureDAO.UploadDbForParticularService");
            
            if (OSType != OSTypeEnum.IOS) //Android
            {
                //Service setting in session
                OneViewSessionStorage.Save("ServiceId", ServiceDetails.CloudManagerServiceInfo.Id);
                OneViewSessionStorage.Save("ServiceName", ServiceDetails.CloudManagerServiceInfo.Name);

                var options = new FileUploadOptions();
                options.fileKey = "file";
                options.fileName = "OneView";
                options.httpMethod = 'POST';

                var ft = new FileTransfer();
                ft.upload(LocalDBFolderPath, encodeURI(RemoteDBUploadFolderPath), UploadDbAcrossServiceSuccess, UploadDbAcrossServiceFail, options, true);
            }
            else if (OSType == OSTypeEnum.IOS) //ios
            {
                alert("Not Implemented For IOS");
            }

            OneViewConsole.Debug("UploadDbForParticularService end", "DbStructureDAO.UploadDbForParticularService");
        }
        catch (Excep) {
           // alert("DbStructureDAO.UploadDbForParticularService : " + Excep + ", " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("DAO", "DbStructureDAO.UploadDbForParticularService", Excep);
        }
    }


    var UploadDbAcrossServiceSuccess = function (r) {
        try {
            OneViewConsole.Debug("UploadDbAcrossServiceSuccess start", "DbStructureDAO.UploadDbAcrossServiceSuccess");

            var ServiceId = OneViewSessionStorage.Get("ServiceId");
            //Update Uploaded Db status
            GlobalUploadDbAcrossServiceDict[ServiceId].IsUploadSuccess = true;
            GlobalUploadedDbCount++;

            var DictLength = Object.keys(GlobalUploadDbAcrossServiceDict).length;
           // alert(GlobalUploadedDbCount + ', DictLength : ' + DictLength + ', ServiceId : ' + ServiceId + ', GlobalUploadDbAcrossServiceDict[ServiceId] : ' + GlobalUploadDbAcrossServiceDict[ServiceId]);

            if (GlobalUploadedDbCount < DictLength) {
                var UploadServiceId;
                var IsDone = false
                for (var TempServiceId in GlobalUploadDbAcrossServiceDict) {
                    if (IsDone == true) {
                        UploadServiceId = TempServiceId;
                        break;
                    }
                    if (TempServiceId == ServiceId) {
                        IsDone = true;
                    }
                }

                var UploadServiceDetails = GlobalUploadDbAcrossServiceDict[UploadServiceId];
                var RemoteDBUploadFolderPath = UploadServiceDetails.CloudManagerServiceInfo.SimpleStorageUrl + "SimpleStorageService.svc/SimpleStorageService/" + UploadServiceDetails.CloudManagerServiceInfo.Name + "/" + UploadServiceDetails.IMEI + "/DBBackup/";
                var DBName = "Service" + UploadServiceDetails.CloudManagerServiceInfo.Id + "DB";
                var LocalDBFolderPath = "/mnt/sdcard/OneView/DB Backup/" + DBName;

                MyInstance.UploadDbAcrossService(LocalDBFolderPath, RemoteDBUploadFolderPath, UploadServiceDetails);                
            }
            else {
                var ErrorMessage = "Some error occurred while uploading database for ";

                for (var ServiceId in GlobalUploadDbAcrossServiceDict) {
                    var ServiceUploadData = GlobalUploadDbAcrossServiceDict[ServiceId];
                    if (ServiceUploadData.IsUploadSuccess == false) {
                        if (ServiceUploadData.IsUploadSuccess == false) {
                            if (ErrorMessage != "Some error occurred while uploading database for ") {
                                ErrorMessage += ",";
                            }
                            ErrorMessage += ServiceUploadData.Message;
                        }

                    }
                }

                if (ErrorMessage != "Some error occurred while uploading database for ") {
                    ErrorMessage += " .Please Contact Administrator.";
                    alert(ErrorMessage);
                    oSetDefaultSpinner.Stop();
                }
                else {
                    oSetDefaultSpinner.Stop();
                    GlobalUploadDbAcrossServiceDict = {};
                    GlobalUploadedDbCount = 0;
                    alert("Databases Uploaded Successfully");
                }

            }
            OneViewConsole.Debug("UploadDbAcrossServiceSuccess end", "DbStructureDAO.UploadDbAcrossServiceSuccess");
        }
        catch (Excep) {
            oSetDefaultSpinner.Stop();
            //alert("DbStructureDAO.UploadDbAcrossServiceSuccess : " + Excep + ", " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("DAO", "DbStructureDAO.UploadDbAcrossServiceSuccess", Excep);
        }
    }


    var UploadDbAcrossServiceFail = function (error) {
        try {
            OneViewConsole.Debug("UploadDbAcrossServiceFail start", "DbStructureDAO.UploadDbAcrossServiceFail");
            oSetDefaultSpinner.Stop();
            var ServiceId = OneViewSessionStorage.Get("ServiceId");
            var ServiceName = OneViewSessionStorage.Get("ServiceName");
            //Update failed Db status
            GlobalUploadDbAcrossServiceDict[ServiceId].IsUploadSuccess = false;

            GlobalUploadDbAcrossServiceDict = {};
            GlobalUploadedDbCount = 0;

            if (error.http_status != null && error.http_status != undefined && error.http_status != "") {
                alert("Some error occured while uploading database for " + ServiceName + ". Please Contact Administrator. Error details are : " + error.http_status);
            }
            else {
                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();
                OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "DbStructureDAO.UploadDbAcrossServiceFail");

                // If network is available
                if (NetworkDetails.IsNetworkAvailable == true) {
                    alert("Some error occured while uploading database for " + ServiceName + ". Please Contact Administrator.");
                }
                else {
                    alert(xlatService.xlat('NoInternetConnection'));
                }

            }

            OneViewConsole.Debug("UploadDbAcrossServiceFail end", "DbStructureDAO.UploadDbAcrossServiceFail");
        }
        catch (Excep) {
            oSetDefaultSpinner.Stop();
            //alert("DbStructureDAO.UploadDbAcrossServiceFail : " + Excep + ", " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("DAO", "DbStructureDAO.UploadDbAcrossServiceFail", Excep);
        }
    }

    ///////////////////////////////////////**************************** Upload DB for Images Uploaded START **************************///////////////////////////////////

    this.UploadDbAcrossServiceForImages = function (LocalDBFolderPath, RemoteDBUploadFolderPath, ServiceDetails) {
        try {
            OneViewConsole.Debug("UploadDbAcrossServiceForImages start", "DbStructureDAO.UploadDbAcrossServiceForImages");

            MyInstance.UploadDbForParticularServiceForImages(LocalDBFolderPath, RemoteDBUploadFolderPath, ServiceDetails);

            OneViewConsole.Debug("UploadDbAcrossServiceForImages end", "DbStructureDAO.UploadDbAcrossServiceForImages");
        }
        catch (Excep) {
            //alert("DbStructureDAO.UploadDbAcrossServiceForImages : " + Excep + ", " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("DAO", "DbStructureDAO.UploadDbAcrossServiceForImages", Excep);
        }
    }

    this.UploadDbForParticularServiceForImages = function (LocalDBFolderPath, RemoteDBUploadFolderPath, ServiceDetails) {
        try {
            OneViewConsole.Debug("UploadDbForParticularServiceForImages start", "DbStructureDAO.UploadDbForParticularServiceForImages");
           
            if (OSType != OSTypeEnum.IOS) //Android
            {
                //Service setting in session
                OneViewSessionStorage.Save("ServiceId", ServiceDetails.CloudManagerServiceInfo.Id);
                OneViewSessionStorage.Save("ServiceName", ServiceDetails.CloudManagerServiceInfo.Name);

                var options = new FileUploadOptions();
                options.fileKey = "file";
                options.fileName = "OneView";
                options.httpMethod = 'POST';

                var ft = new FileTransfer();
                ft.upload(LocalDBFolderPath, encodeURI(RemoteDBUploadFolderPath), UploadDbAcrossServiceSuccessForImages, UploadDbAcrossServiceFailForImages, options, true);
            }
            else if (OSType == OSTypeEnum.IOS) //ios
            {
                alert("Not Implemented For IOS");
            }

            OneViewConsole.Debug("UploadDbForParticularServiceForImages end", "DbStructureDAO.UploadDbForParticularServiceForImages");
        }
        catch (Excep) {
            // alert("DbStructureDAO.UploadDbForParticularServiceForImages : " + Excep + ", " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("DAO", "DbStructureDAO.UploadDbForParticularServiceForImages", Excep);
        }
    }


    var UploadDbAcrossServiceSuccessForImages = function (r) {
        try {
            OneViewConsole.Debug("UploadDbAcrossServiceSuccessForImages start", "DbStructureDAO.UploadDbAcrossServiceSuccessForImages");
           
            var ServiceId = OneViewSessionStorage.Get("ServiceId");
            //Update Uploaded Db status
            GlobalUploadDbAcrossServiceDict[ServiceId].IsUploadSuccess = true;
            GlobalUploadedDbCount++;

            var DictLength = Object.keys(GlobalUploadDbAcrossServiceDict).length;
            // alert(GlobalUploadedDbCount + ', DictLength : ' + DictLength + ', ServiceId : ' + ServiceId + ', GlobalUploadDbAcrossServiceDict[ServiceId] : ' + GlobalUploadDbAcrossServiceDict[ServiceId]);

            if (GlobalUploadedDbCount < DictLength) {
                var UploadServiceId;
                var IsDone = false
                for (var TempServiceId in GlobalUploadDbAcrossServiceDict) {
                    if (IsDone == true) {
                        UploadServiceId = TempServiceId;
                        break;
                    }
                    if (TempServiceId == ServiceId) {
                        IsDone = true;
                    }
                }

                var UploadServiceDetails = GlobalUploadDbAcrossServiceDict[UploadServiceId];
                var RemoteDBUploadFolderPath = UploadServiceDetails.CloudManagerServiceInfo.SimpleStorageUrl + "SimpleStorageService.svc/SimpleStorageService/" + UploadServiceDetails.CloudManagerServiceInfo.Name + "/" + UploadServiceDetails.IMEI + "/DBBackup/" + GlobalCurrentDateTimeFolderName + "/";
                
                var DBName = "Service" + UploadServiceDetails.CloudManagerServiceInfo.Id + "DB";
                var LocalDBFolderPath = "/mnt/sdcard/OneView/DB Backup/" + DBName;

                MyInstance.UploadDbAcrossServiceForImages(LocalDBFolderPath, RemoteDBUploadFolderPath, UploadServiceDetails);
            }
            else {
                var ErrorMessage = "Some error occurred while uploading database for ";

                for (var ServiceId in GlobalUploadDbAcrossServiceDict) {
                    var ServiceUploadData = GlobalUploadDbAcrossServiceDict[ServiceId];
                    if (ServiceUploadData.IsUploadSuccess == false) {
                        if (ServiceUploadData.IsUploadSuccess == false) {
                            if (ErrorMessage != "Some error occurred while uploading database for ") {
                                ErrorMessage += ",";
                            }
                            ErrorMessage += ServiceUploadData.Message;
                        }

                    }
                }

                if (ErrorMessage != "Some error occurred while uploading database for ") {
                    ErrorMessage += " .Please Contact Administrator.";
                    alert(ErrorMessage);
                    oSetDefaultSpinner.Stop();
                }
                else {
                    
                    GlobalUploadDbAcrossServiceDict = {};
                    GlobalUploadedDbCount = 0;                    
                    

                    //Upload Images (one time for all services which are available in cloud manager)                    
                    MyInstance.UploadImagesAcrossService();                  
                    //alert('IsGlobalImageUploadSuccess : ' + IsGlobalImageUploadSuccess);

                    if (IsGlobalImageUploadSuccess == true) {                      
                        if (GlobalTotalUploadImageCount > 0) {
                            if (GlobalUploadedImageCount == GlobalTotalUploadImageCount) {
                                alert(GlobalXlatService.xlat("IN-SU-DBS-001 :: Databases Uploaded Successfully.\n\n Total Images Uploaded : ") + GlobalUploadedImageCount);
                            }
                            else {
                                alert(GlobalXlatService.xlat("IN-SU-DBS-002 :: Databases Uploaded Successfully.\n Total Images Uploaded : ") + GlobalUploadedImageCount + "/" + GlobalTotalUploadImageCount);
                            }
                        }
                        else {
                            alert(GlobalXlatService.xlat("IN-SU-DBS-003 :: Databases Uploaded Successfully"));
                        }
                      
                    }
                    else {
                        var FailedImageCount = GlobalTotalUploadImageCount - GlobalUploadedImageCount;
                        alert(GlobalXlatService.xlat("IN-ER-DBS-001 :: Databases Uploaded Successfully.") + " \n" + FailedImageCount + GlobalXlatService.xlat(" out of ") + GlobalTotalUploadImageCount + GlobalXlatService.xlat(" Image upload failed, please contact administrator."));
                    }

                    //Upload Log after db and images upload with a confirmation messsages
                    MyInstance.UploadLogsAfterDb(GlobalXlatService);
                    oSetDefaultSpinner.Stop();
                    
                }

            }
            OneViewConsole.Debug("UploadDbAcrossServiceSuccessForImages end", "DbStructureDAO.UploadDbAcrossServiceSuccessForImages");
        }
        catch (Excep) {
            oSetDefaultSpinner.Stop();
            //alert("DbStructureDAO.UploadDbAcrossServiceSuccessForImages : " + Excep + ", " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("DAO", "DbStructureDAO.UploadDbAcrossServiceSuccessForImages", Excep);
        }
    }


    var UploadDbAcrossServiceFailForImages = function (error) {
        try {
            OneViewConsole.Debug("UploadDbAcrossServiceFailForImages start", "DbStructureDAO.UploadDbAcrossServiceFailForImages");
            oSetDefaultSpinner.Stop();
            var ServiceId = OneViewSessionStorage.Get("ServiceId");
            var ServiceName = OneViewSessionStorage.Get("ServiceName");
            //Update failed Db status
            GlobalUploadDbAcrossServiceDict[ServiceId].IsUploadSuccess = false;

            GlobalUploadDbAcrossServiceDict = {};
            GlobalUploadedDbCount = 0;

            if (error.http_status != null && error.http_status != undefined && error.http_status != "") {
                alert("Some error occured while uploading database for " + ServiceName + ". Please Contact Administrator. Error details are : " + error.http_status);

                //Upload Log after db and images upload with a confirmation messsages
                MyInstance.UploadLogsAfterDb(GlobalXlatService);
            }
            else {
                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();
                OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "DbStructureDAO.UploadDbAcrossServiceFailForImages");

                // If network is available
                if (NetworkDetails.IsNetworkAvailable == true) {
                    alert("Some error occured while uploading database for " + ServiceName + ". Please Contact Administrator.");

                    //Upload Log after db and images upload with a confirmation messsages
                    MyInstance.UploadLogsAfterDb(GlobalXlatService);
                }
                else {
                    alert(xlatService.xlat('NoInternetConnection'));
                }

            }

            OneViewConsole.Debug("UploadDbAcrossServiceFailForImages end", "DbStructureDAO.UploadDbAcrossServiceFailForImages");
        }
        catch (Excep) {
            oSetDefaultSpinner.Stop();
            //alert("DbStructureDAO.UploadDbAcrossServiceFailForImages : " + Excep + ", " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("DAO", "DbStructureDAO.UploadDbAcrossServiceFailForImages", Excep);
        }
    }

    /// <summary>
    /// Upload All images for particular package(across the services)
    /// </summary>
    this.UploadImagesAcrossService = function () {

        try {
            OneViewConsole.Debug("UploadImagesAcrossService start", "DbStructureDAO.UploadImagesAcrossService");

            GlobalTotalUploadImageCount = 0;
            GlobalUploadedImageCount = 0;

            var CloudManagerServiceInfo = OneViewLocalStorage.Get("CloudManagerServiceInfo");
            if (CloudManagerServiceInfo != null) {
                CloudManagerServiceInfo = JSON.parse(CloudManagerServiceInfo);
                IsGlobalImageUploadSuccess = true;
                var FirstServiceId = "";

                for (var ServiceId in CloudManagerServiceInfo) {
                    FirstServiceId = ServiceId;
                    break;
                }

                var FirstServiceDetails = CloudManagerServiceInfo[FirstServiceId];
                
                var PackageName = MyInstance.GetPackageName();
                var _oOneViewDeviceInfoPlugin = new OneViewDeviceInfoPlugin();
                var IMEI = _oOneViewDeviceInfoPlugin.GetIMEINumber();
                if (IMEI == 'undefined' || IMEI == '' || IMEI == undefined) {
                    IMEI = _oOneViewDeviceInfoPlugin.GetUUID();
                }
          
                var RemoteImageUploadFolderPath = FirstServiceDetails.SimpleStorageUrl + "SimpleStorageService.svc/SimpleStorageService/ImageRecovery/" + IMEI + "/" + GlobalCurrentDateTimeFolderName + "/";

                MyInstance.UploadFolderImages(RemoteImageUploadFolderPath);
            }


            OneViewConsole.Debug("UploadImagesAcrossService end", "DbStructureDAO.UploadImagesAcrossService");

        }
        catch (Excep) {
            //alert("DbStructureDAO.UploadImagesAcrossService : " + Excep + ", " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Controller", "DbStructureDAO.UploadImagesAcrossService", Excep);
        }
        finally {
            _DbStructureDAO = null;
        }
    }


    this.GetPackageName = function () {

        try {
            OneViewConsole.Debug("GetPackageName start", "DbStructureController.GetPackageName");

            var PackageName = oOneViewAppInfoPlugin.GetPackageName();

            OneViewConsole.Debug("GetPackageName end", "DbStructureController.GetPackageName");

            return PackageName;
        }
        catch (Excep) {
           // alert("DbStructureController.GetPackageName : " + Excep + ", " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Controller", "DbStructureController.GetPackageName", Excep);
        }
        finally {
            _DbStructureDAO = null;
        }
    }

    /// <summary>
    /// Upload Images of particular folder
    /// </summary>  
    /// <param name="LocalFolderPath">Local Folder Path</param>
    /// <param name="RemoteUploadFolderPath">RemoteUploadFolderPath where need to upload</param> 
    this.UploadFolderImages = function (RemoteUploadFolderPath) {

        try {
            OneViewConsole.Debug("UploadFolderImages start", "DbStructureDAO.UploadFolderImages");

            var ListOfImageFiles = oOneViewAppInfoPlugin.GetListOfImageFiles();
            if (ListOfImageFiles != null) {
                GlobalTotalUploadImageCount = ListOfImageFiles.length;
                for (var i = 0; i < ListOfImageFiles.length; i++) {
                    var LocalFilePath = ListOfImageFiles[i];
                    var IsImageUploadSuccess = MyInstance.UploadFileSync(LocalFilePath, RemoteUploadFolderPath);
                    //alert('IsImageUploadSuccess : ' + IsImageUploadSuccess);
                    if (IsImageUploadSuccess == true) {
                        GlobalUploadedImageCount++;
                    }
                    else {
                        IsGlobalImageUploadSuccess = false;
                    }
                }
            }
            OneViewConsole.Debug("UploadFolderImages end", "DbStructureDAO.UploadFolderImages");
        }
        catch (Excep) {
           // alert("DbStructureDAO.UploadFolderImages : " + Excep + ", " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Controller", "DbStructureDAO.UploadFolderImages", Excep);
        }
        finally {

        }
    }


    this.UploadFileSync = function (LocalFilePath, RemoteUploadFolderPath) {

        try {
            OneViewConsole.Debug("UploadFileSync start", "DbStructureDAO.UploadFileSync");
            var IsSuccess = true;

            //Synchronous call
            var oHttpClientResponseDTO = window.HttpClinetPlugin.UploadFile(LocalFilePath, RemoteUploadFolderPath);

            oHttpClientResponseDTO = JSON.parse(oHttpClientResponseDTO);
            //alert('oHttpClientResponseDTO : ' + JSON.stringify(oHttpClientResponseDTO));

            if (oHttpClientResponseDTO == null || oHttpClientResponseDTO == "") {
                IsSuccess = false;
                // alert(OneViewGlobalization[CurrentLanguage].Connectionrefused_Message);  
            }
            else if (oHttpClientResponseDTO.IsAnyException == true || oHttpClientResponseDTO.IsAnyException == "true") {
                IsSuccess = false;
            }
                //else if (oHttpClientResponseDTO.Response != "") {
                //    IsSuccess = true;
                //}
            else if (oHttpClientResponseDTO.IsAnyException == "false" && oHttpClientResponseDTO.ResponseCode == "503")//Service Unavailable
            {
                IsSuccess = false;
                // alert(OneViewGlobalization[CurrentLanguage].ServiceUnavailable_Message);             

            }
            else if (oHttpClientResponseDTO.IsAnyException == "false" && oHttpClientResponseDTO.ResponseCode == "504")//Gateway Timeout
            {
                IsSuccess = false;
                //alert(OneViewGlobalization[CurrentLanguage].GatewayTimeout_Message);

            }
            else if (oHttpClientResponseDTO.IsAnyException == "false" && oHttpClientResponseDTO.ResponseCode == "500")//Internal Server Error
            {
                IsSuccess = false;
                // alert(OneViewGlobalization[CurrentLanguage].InternalServerError_Message);

            }
            else if (oHttpClientResponseDTO.IsAnyException == "false" && oHttpClientResponseDTO.ResponseCode == "404")//Not Found
            {
                IsSuccess = false;
                //alert(OneViewGlobalization[CurrentLanguage].NotFound_Message);

            }
            else if (oHttpClientResponseDTO.IsAnyException == "false" && oHttpClientResponseDTO.ResponseCode == "408")//Request Timeout
            {
                IsSuccess = false;
                //alert(OneViewGlobalization[CurrentLanguage].RequestTimeout_Message);

            }
            else if (oHttpClientResponseDTO.IsAnyException == "false" && oHttpClientResponseDTO.ResponseCode == "400")//Bad Timeout
            {
                IsSuccess = false;
                // alert(OneViewGlobalization[CurrentLanguage].BadRequest_Message);

            }

            //alert('IsSuccess ' + IsSuccess);
            OneViewConsole.Debug("UploadFileSync end", "DbStructureDAO.UploadFileSync");

            return IsSuccess;
        }
        catch (Excep) {
            //alert("DbStructureDAO.UploadFileSync : " + Excep + ", " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Controller", "DbStructureDAO.UploadFileSync", Excep);
        }
        finally {
           
        }
    }
    ///////////////////////////////////////**************************** Upload DB for Images Uploaded START **************************///////////////////////////////////


    this.UploadLogsAfterDb = function (xlatService) {

        try {
            OneViewConsole.Debug("UploadLogsAfterDb start", "DbStructureDAO.UploadLogsAfterDb");
           
            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Confirmation'), xlatService.xlat('Do you want to upload logs ?'), function (ConfirmationId) {
                if (ConfirmationId == "2") {
                    //Step 1: Zip Folder
                    oOneViewAppInfoPlugin.ZipFolder("/mnt/sdcard/OneView/Log Files/","/mnt/sdcard/OneView/ZippedLogs.zip");
                    //Step 2: Upload Logs
                    MyInstance.UploadAllLogs(xlatService);
                }
            });

            OneViewConsole.Debug("UploadLogsAfterDb end", "DbStructureDAO.UploadLogsAfterDb");
        }
        catch (Excep) {
            // alert("DbStructureDAO.UploadLogsAfterDb : " + Excep + ", " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Controller", "DbStructureDAO.UploadLogsAfterDb", Excep);
        }
        finally {

        }
    }

    this.UploadAllLogs = function (xlatService) {

        try {
            OneViewConsole.Debug("UploadAllLogs start", "DbStructureDAO.UploadAllLogs");


            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = "Log.txt";
            options.httpMethod = 'POST';


            // var params = {};
            // params.UserName = LoginUserName;
            // params.OrgName = ServiceName;

            //  var _oDateTime = new DateTime();
            // var CurrentDate = _oDateTime.GetDate();

            //options.params = params;


            var _oOneViewDeviceInfoPlugin = new OneViewDeviceInfoPlugin();
            var IMEI = _oOneViewDeviceInfoPlugin.GetIMEINumber();

            if (IMEI == 'undefined' || IMEI == '' || IMEI == undefined) {
                IMEI = _oOneViewDeviceInfoPlugin.GetUUID();
            }

        
          
            var ServicesDetails;
            var _oCloudManagerBO = new CloudManagerBO(xlatService);
            var CloudManagerServiceInfo = OneViewLocalStorage.Get("CloudManagerServiceInfo");            
            if (CloudManagerServiceInfo != null) {
                CloudManagerServiceInfo = JSON.parse(CloudManagerServiceInfo);
                for (var ServiceId in CloudManagerServiceInfo) {                   
                    ServicesDetails = CloudManagerServiceInfo[ServiceId];
                    break;
                }              
            }

            if (ServicesDetails != undefined && ServicesDetails != null) {
                //var ft = new FileTransfer();                
                //var LocalPath = "/mnt/sdcard/OneView/Log Files/Common/Log.txt";
                //var RemotePath = ServicesDetails.SimpleStorageUrl + "SimpleStorageService.svc/SimpleStorageService/Common/" + IMEI + "/LogFiles/";
                //alert('LocalPath : ' + LocalPath + ', RemotePath : ' + RemotePath);
                //ft.upload(LocalPath, encodeURI(RemotePath), UploadCommonLogsSuccess, UploadCommonLogfail, options, true);

                MyInstance.UploadZippedLogs(ServicesDetails);
            }
            OneViewConsole.Debug("UploadAllLogs end", "DbStructureDAO.UploadAllLogs");
        }
        catch (Excep) {
           // alert("DbStructureDAO.UploadAllLogs : " + Excep + ", " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("DAO", "DbStructureDAO.UploadAllLogs", Excep);
        }
        finally {

        }
    }

    var UploadCommonLogsSuccess = function (r) {
        alert('Log uploaded successfully');
        GetCommonLogFromLocalStorage();
    }

    var GetCommonLogFromLocalStorage = function () {
        try {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, GotCommonLoginFSTodelete, Deletefail);
        }
        catch (e) {
            alert(e);
        }
    }

    var GotCommonLoginFSTodelete = function (fileSystem) {
        try {
            fileSystem.root.getFile("OneView/Log Files/Common/Log.txt", { create: true, exclusive: false }, GotCommonFileEntryToDelete, Deletefail);
        }
        catch (e) {
            alert('GotCommonLoginFSTodelete' + e);
        }
        finally {
        }
    }

    var UploadCommonLogfail = function (error) {
       // alert("Error Code: " + error.code);//FileTransferError.FILE_NOT_FOUND_ERR
        if (error.code == 1) {
             alert("No logs available to upload");
            //Upload ServiceWise Logs

            var userName = OneViewSessionStorage.Get("LoginUserName");
            var ServiceName = OneViewSessionStorage.Get("ServiceName");
            alert('userName fff: ' + userName);
            alert('ServiceName : ' + ServiceName);

            if (userName != null) {
              MyInstance.UploadLogsForAllServices();
            }
        }
        else {
            //  alert("Log Upload failed");
            alert("Please contact administrator, Error Code : " + error.http_status);
        }
       
    }


    var GotCommonFileEntryToDelete = function (fileEntry) {
        try {
            fileEntry.file(function (fileObj) {
                fileEntry.remove(LocalCommonLogDeleteWin, DeleteCommonFilefail);
            });
        }
        catch (e) {
            alert(e);
        }
    }

    var LocalCommonLogDeleteWin = function (r) {
        //alert('Local log deleted successfully');  
        //Upload ServiceWise Logs

        var userName = OneViewSessionStorage.Get("LoginUserName");
        var ServiceName = OneViewSessionStorage.Get("ServiceName");
        alert('userName 222 : ' + userName);
        alert('ServiceName 333 : ' + ServiceName);

    }

    var DeleteCommonFilefail = function (error) {
        //alert("No log file exists to delete");
        //Upload ServiceWise Logs

        var userName = OneViewSessionStorage.Get("LoginUserName");
        var ServiceName = OneViewSessionStorage.Get("ServiceName");
        alert('userName 44 : ' + userName);
        alert('ServiceNameb  : ' + ServiceName);
    }


    this.UploadLogsForAllServices = function () {

        try {

            var FirstServiceId;
            var CountOfServices = 0;

            //Get all services in the device
            var _oCloudManagerBO = new CloudManagerBO(GlobalXlatService);
            var CloudManagerServiceInfo = OneViewLocalStorage.Get("CloudManagerServiceInfo");
            alert('CloudManagerServiceInfo : ' + CloudManagerServiceInfo);
            if (CloudManagerServiceInfo != null) {
                CloudManagerServiceInfo = JSON.parse(CloudManagerServiceInfo);
                for (var ServiceId in CloudManagerServiceInfo) {
                    if (CountOfServices == 0) {
                        FirstServiceId = ServiceId;
                    }
                    var ServicesDetails = CloudManagerServiceInfo[ServiceId];
                    GlobalUploadDbAcrossServiceDict[ServiceId] = { 'IsUploadSuccess': false, 'IMEI': IMEI, 'CloudManagerServiceInfo': CloudManagerServiceInfo[ServiceId] };
                    CountOfServices++;
                }

                //var FirstServiceDetails = GlobalUploadDbAcrossServiceDict[FirstServiceId];
                //var RemoteDBUploadFolderPath = ServicesDetails.SimpleStorageUrl + "SimpleStorageService.svc/SimpleStorageService/" + FirstServiceDetails.CloudManagerServiceInfo.Name + "/" + IMEI + "/DBBackup/";
                //var DBName = "Service" + FirstServiceDetails.CloudManagerServiceInfo.Id + "DB";
                //var LocalDBFolderPath = "/mnt/sdcard/OneView/DB Backup/" + DBName;
            }
        }
        catch (excep) {
            alert('UploadLogsForAllServices excep : ' + excep);
        }
    }


    this.UploadZippedLogs = function (ServicesDetails) {
        try {
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = "ZippedLogs.zip";
            options.httpMethod = 'POST';
            
            // var params = {};
            // params.UserName = LoginUserName;
            // params.OrgName = ServiceName;

              var _oDateTime = new DateTime();
              var CurrentDate = _oDateTime.GetDate();

              var _oOneViewDeviceInfoPlugin = new OneViewDeviceInfoPlugin();
              var IMEI = _oOneViewDeviceInfoPlugin.GetIMEINumber();

              if (IMEI == 'undefined' || IMEI == '' || IMEI == undefined) {
                  IMEI = _oOneViewDeviceInfoPlugin.GetUUID();
              }
            //options.params = params;
            var ft = new FileTransfer();
            var Remotepath = ServicesDetails.SimpleStorageUrl + "SimpleStorageService.svc/SimpleStorageService/SnapShotLogs/" + IMEI + "/";
           // var Remotepath = ServicesDetails.SimpleStorageUrl + "SimpleStorageService.svc/SimpleStorageService/TestFolder/";
           // alert('Remotepath : ' + Remotepath);
            ft.upload("/mnt/sdcard/OneView/ZippedLogs.zip", encodeURI(Remotepath), UploadZippedLogsSuccess, UploadZippedLogfail, options, true);

            // ft.upload("/mnt/sdcard/OneView/MyFolder4.zip", encodeURI(path), UploadLogsSuccess, UploadLogfail, options, true);

        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DbStructureDAO.UploadLogs", Excep);
        }
        finally {
            options = null;
            LoginUserName = null;
            ServiceName = null;
            params = null;
            ft = null;
        }
    }

    var UploadZippedLogsSuccess = function (r) {
        alert('Log uploaded successfully');
        GetZippedLogsFromLocalStorage();
    }

    var GetZippedLogsFromLocalStorage = function () {
        try {

            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, GotZippedLogsFSTodelete, Deletefail);
        }
        catch (e) {
            alert(e);
        }
    }
    var GotZippedLogsFSTodelete = function (fileSystem) {
        try {          
            fileSystem.root.getFile("OneView/ZippedLogs.zip", { create: true, exclusive: false }, GotFileEntryToDelete, Deletefail);

        }

        catch (e) {
            alert('GotZippedLogsFSTodelete' + e);
        }
        finally {
            userName = null;
            ServiceName = null;
        }
    }

    var UploadZippedLogfail = function (error) {
        alert("Error : " + JSON.stringify(error));
        alert("Error Code: " + error.code);//FileTransferError.FILE_NOT_FOUND_ERR
        //if (error.code == 1) {
        //    alert("No logs available to upload");
        //}
        //else {
        //    alert("Log Upload failed");
        //}
        alert("DBC-01 : Please contact administrator, Error Code : " + error.http_status);
    }

}



