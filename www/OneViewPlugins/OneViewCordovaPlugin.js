
function OneViewCordovaPlugin() {

    this.CheckNetworkStatus = function () {

        try{
            OneViewConsole.Debug("CheckNetworkStatus start", "OneViewCordovaPlugin.CheckNetworkStatus");

            var networkState = navigator.connection.type;

            var states = {};

            states[Connection.UNKNOWN] = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI] = 'WiFi connection';
            states[Connection.CELL_2G] = 'Cell 2G connection';
            states[Connection.CELL_3G] = 'Cell 3G connection';
            states[Connection.CELL_4G] = 'Cell 4G connection';
            states[Connection.CELL] = 'Cell generic connection';
            states[Connection.NONE] = 'No network connection';

            var NetworkDetails = {};

            NetworkDetails["ConnectionType"] = states[networkState];
            //alert('Connection type: ' + states[networkState]);

            if (states[networkState] != "Unknown connection" && states[networkState] != "No network connection") {
                NetworkDetails["IsNetworkAvailable"] = true;
            }
            else {
                NetworkDetails["IsNetworkAvailable"] = false;
            }
        
            OneViewConsole.Debug("CheckNetworkStatus end", "OneViewCordovaPlugin.CheckNetworkStatus");

            return NetworkDetails;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewCordovaPlugin.CheckNetworkStatus", Excep);
        }
        finally {
            networkState = null;
            states = null;
            NetworkDetails = null;
        }
    }
 
    this.DefaultConfirmBox = function (Title, Message, SuccessCallBack) {

        try{
            navigator.notification.confirm(Message, SuccessCallBack, Title, ['Cancel', 'Ok']);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewCordovaPlugin.DefaultConfirmBox", Excep);
        }
    }
}

function OneViewCordovaProgressbarPlugin() {

    // Title and Message not mandatory
    this.Start = function (Title, Message) {

        try{
            var Title_Msg = (Title == undefined || Title == "" ) ? OneViewGlobalization[OneViewGlobalcurrentLanguage].LoaderHeaderKey : Title;
            var Body_Msg = (Message == undefined || Message == "") ? OneViewGlobalization[OneViewGlobalcurrentLanguage].LoaderBodyKey : Message;
            //TODO:IOS Migr (ios not supporting ,need to find progress bar)
			if(OSType == OSTypeEnum.IOS) {
				//ProgressIndicator.showBarWithLabel(true, 50000, Body_Msg);
				//ProgressIndicator.showSimple(true);
				ActivityIndicator.show(Title_Msg);
				//window.MyProgressHUD.ShowProgress();
				//ProgressIndicatorshowBarWithLabel(dim, timeout, message);
			} else {
            navigator.notification.progressStart(Title_Msg, Body_Msg);
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewCordovaProgressbarPlugin.Start", Excep);
        }
        finally {
            Title_Msg = null;
            Body_Msg = null;
        }
    }

    this.Stop = function () {

        try{
            //TODO:IOS Migr (ios not supporting ,need to find progress bar)
			if(OSType == OSTypeEnum.IOS) {
				ActivityIndicator.hide();
				//ProgressIndicator.hide();
				//window.MyProgressHUD.HideProgress();
			} else {
            navigator.notification.progressStop();
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewCordovaProgressbarPlugin.Stop", Excep);
        }
    }

    this.SetProgressValue = function (Value) {

        try{
            //TODO:IOS Migr (ios not supporting ,need to find progress bar)
			if(OSType == OSTypeEnum.IOS) {
				//nothing
			} else {
            navigator.notification.progressValue(Value);
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewCordovaProgressbarPlugin.SetProgressValue", Excep);
        }
    }
}

function OneViewCordovaDialogs() {
   
    // Title and Message not mandatory
    this.alert = function (Message, Title) {

        try{
            var Title_Msg = (Title == undefined || Title == "") ? "Alert" : Title;        
            navigator.notification.alert(Message, ['Ok'], Title_Msg);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewCordovaDialogs.alert", Excep);
        }
        finally {
            Title_Msg = null;
        }
    }
}

function OneViewCordovaDeviceInfo() {

    this.GetCordovaVersion = function () {

        try {           
            return device.cordova;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewCordovaDeviceInfo.CordovaVersion", Excep);
        }
    }

    this.GetDeviceModel = function () {

        try {
            return device.model;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewCordovaDeviceInfo.Model", Excep);
        }
    }

    this.GetPlatform = function () {

        try {
            return device.platform;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewCordovaDeviceInfo.Platform", Excep);
        }
    }

    this.GetUUID = function () {

        try {
            return device.uuid;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewCordovaDeviceInfo.UUID", Excep);
        }
    }

    this.GetOSVersion = function () {

        try {
            return device.version;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewCordovaDeviceInfo.OSVersion", Excep);
        }
    }
}

function OneViewCordovaGeolocation() {
 
    this.GetCurrentPosition = function (SuccessCallBack) {

        // On SuccessCallBack we can get Latitude, Longitude and Accuracy shown below
        // Latitude:  position.coords.latitude
        // Longitude:  position.coords.latitude
        // Accuracy:  position.coords.latitude
        navigator.geolocation.getCurrentPosition(SuccessCallBack, ErrorCallBack);
    }

    var ErrorCallBack = function (error) {
    }
}

//For CRUD operation on image
function OneViewCordovaCameraPlugin() {


    this.isOnlineSave = false;
    var IsAnyExceptionOnSave = false;
    var ErrorMessage = '';
    var ImageURL = '';
    //Opens camera and saves image to local file system
    //SuccessCallback :
    //Event format :SuccessCallback(path) //path:where image saved
    //ErrorCallback:
    //Event format:ErrorCallback(eventArgs) //eventArgs.ErroCode : error code
    this.CaptureImage = function (SuccessCallback, ErrorCallback) {
        try {
            OneViewConsole.Debug("CaptureImage Start", "OneviewImageFramework.CaptureImage");

            if (SuccessCallback == undefined)
                SuccessCallback = this.DefaultSuccessCallback;

            if (ErrorCallback == undefined)
                ErrorCallback = this.DefaultErrorCallback;

            navigator.camera.getPicture(SuccessCallback, ErrorCallback, {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
            });


            OneViewConsole.Debug("CaptureImage End", "OneviewImageFramework.CaptureImage");
            return ImageURL;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneviewImageFramework.CaptureImage", Excep);
        }
    }

    this.DefaultSuccessCallback = function (_ImageURL) {
        try {
            navigator.notification.confirm("Do you want to save image offline or online", function (ConfirmationId) {
                if (ConfirmationId == "2") {
                    alert('Image saved successfully');
                }
                else if (ConfirmationId == "1") {
                    //Save image Server and delete local
                    var options = { 'httpMethod': 'POST' };
                    var DestinationPath = "http://10.20.25.158/WINAIMStorageService/SimpleStorageService.svc/SimpleStorageService/service/org/template/attr/user/";
                    var oOneViewCordovaFileTransferPlugin = new OneViewCordovaFileTransferPlugin();
                    oOneViewCordovaFileTransferPlugin.Upload(_ImageURL, DestinationPath, UploadSuccessCallBack, UploadErrorCallBack, options);
                }
            }, "Confirmation Message", ['online', 'offline']);
            IsAnyExceptionOnSave = false;
            ImageURL = _ImageURL;
        }
        catch (Excep) {
            alert('DefaultSuccessCallback :' + Excep)
        }
    }


    this.DefaultErrorCallback = function () {
        IsAnyExceptionOnSave = true;
        // alert('Error while saving image, please try again');
        //  alert('Image capture failed, please try again');
        navigator.notification.alert(xlatService.xlat('Image capture failed, please try again'), ['OK'], "");
    }

    var UploadSuccessCallBack = function (response) {
        try {
            alert('Image uploaded successfully' + JSON.stringify(response));
            //alert('url' + JSON.stringify(url)); ///Have image saved location and name of server and other details
            var oOneViewCordovaFilePlugin = new OneViewCordovaFilePlugin();
            oOneViewCordovaFilePlugin.DeleteFile(ImageURL);
        }
        catch (Excep) {
            alert('UploadSuccessCallBack :' + Excep);
        }
    }

    var UploadErrorCallBack = function () {
        alert('Error uploading image');
    }


    //Views/Shows the captured image in applocation
    //If IsOnline= false : Shows image from local file system
    //If IsOnline= true : Downloads image from server , saves in local file system and shows image
    //SourcePath : where file resides ( If IsOnline=true : SourcePath is server path from where image need to be downloaded  eg:http://10.20.25.158/here/image.jpg)
    ///we can download file in any download folder for viewing purpose
    ///IsOnline =false , SourcePath is local path where file is there
    this.ViewImage = function (SourcePath, DestinationDomId, IsOnline, SuccessCallback, ErrorCallback) {
        try {
            if (SuccessCallback == undefined)
                SuccessCallback = this.DefaultViewSuccessCallBack;

            if (ErrorCallback == undefined)
                ErrorCallback = this.DefaultViewErrorCallBack;

           // alert('ViewImage');
            OneViewConsole.Debug("ViewImage Start", "OneviewImageFramework.ViewImage");
            var Image = document.getElementById(DestinationDomId);
            Image.style.display = 'block';
            if (IsOnline == true) {
                var DestinationPath = "file:///mnt/sdcard/downloads/o/hello.jpg";
                SourcePath = "http://10.20.25.158/WINAIMStorageService/SimpleStorageService.svc/SimpleStorageService/service/org/template/attr/user/Image.jpg";
                var oOneViewCordovaFileTransferPlugin = new OneViewCordovaFileTransferPlugin();
                oOneViewCordovaFileTransferPlugin.Download(SourcePath, DestinationPath, SuccessCallback, ErrorCallback)
                //Show image in div
                Image.src = DestinationPath;
            }

            else {
                //SourcePath = "file:///mnt/sdcard/downloads/o/abc.jpg"
                //Show image in div
                Image.src = SourcePath;
            }
            OneViewConsole.Debug("ViewImage End", "OneviewImageFramework.ViewImage");
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneviewImageFramework.ViewImage", Excep);
        }
    }

    this.DefaultViewSuccessCallBack = function (url) {
        try {
            alert('Image downloaded successfully');
            //alert('url' + JSON.stringify(url)); ///Have image saved location and name of server and other details
        }
        catch (Excep) {
            alert('DefaultViewSuccessCallBack :' + Excep);
        }
    }

    this.DefaultViewErrorCallBack = function (code) {
        alert('Error downloading image' + JSON.stringify(code));
    }

    //Updates images 
    this.UpdateImage = function (SourcePath, DestinationPath, IsOnline) {
        try {
            OneViewConsole.Debug("UpdateImage Start", "OneviewImageFramework.UpdateImage");
            alert('UpdateImage');
            if (IsOnline == true) {
                SourcePath = "file:///mnt/sdcard/downloads/o/abc.jpg"
                DestinationPath = "http://10.20.25.158/WINAIMStorageService/SimpleStorageService.svc/SimpleStorageService/service/org/template/attr/user/Image.jpg";
                // alert(_ImageURL);
                var options = { 'httpMethod': 'POST' };
                var oOneViewCordovaFileTransferPlugin = new OneViewCordovaFileTransferPlugin();
                oOneViewCordovaFileTransferPlugin.Upload(SourcePath, DestinationPath, UpdateImageSuccessCallBack, UpdateImageErrorCallBack, options);
            }
            else {
                var oOneViewCordovaFilePlugin = new OneViewCordovaFilePlugin();
                oOneViewCordovaFilePlugin.DeleteFile(SourcePath);
                //either capture new image or move file here ---- need to discuss
            }
            OneViewConsole.Debug("UpdateImage End", "OneviewImageFramework.UpdateImage");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneviewImageFramework.UpdateImage", Excep);
        }
    }


    var UpdateImageSuccessCallBack = function (url) {
        try {
            alert('image updated');
            //alert('url' + JSON.stringify(url)); ///Have image saved location and name of server and other details
        }
        catch (Excep) {
            alert('UpdateImageSuccessCallBack :' + Excep);
        }
    }

    var UpdateImageErrorCallBack = function () {
        alert('error while update image');
    }

    this.DeleteImage = function (SourcePath, IsOnline) {
        try {
            OneViewConsole.Debug("DeleteImage Start", "OneviewImageFramework.DeleteImage");
            alert('DeleteImage');
            if (IsOnline == true) {
                //need to delete file from given server parh i.e SourcePath
                var DestinationPath = "";
                SourcePath = "http://10.20.25.158/WINAIMStorageService/SimpleStorageService.svc/SimpleStorageService/service/org/template/attr/user/Image.jpg";
                // alert(_ImageURL);
                var oOneViewCordovaFileTransferPlugin = new OneViewCordovaFileTransferPlugin();
                oOneViewCordovaFileTransferPlugin.Upload(DestinationPath, SourcePath, DeleteImageSuccessCallBack, DeleteImageErrorCallBack);
            }
            else {
                var oOneViewCordovaFilePlugin = new OneViewCordovaFilePlugin();
                oOneViewCordovaFilePlugin.DeleteFile(SourcePath);
            }

            OneViewConsole.Debug("DeleteImage End", "OneviewImageFramework.DeleteImage");
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneviewImageFramework.DeleteImage", Excep);
        }
    }

    var DeleteImageSuccessCallBack = function (url) {
        try {
            alert('image deleted');
            //alert('url' + JSON.stringify(url)); ///Have image saved location and name of server and other details
        }
        catch (Excep) {
            alert('DeleteImageSuccessCallBack :' + Excep);
        }
    }

    var DeleteImageErrorCallBack = function (code) {
        alert('error while deleting image' + JSON.stringify(code));
    }

    //Error codes need to be written

    var sleepFor = function (sleepDuration) {
        var now = new Date().getTime();
        while (new Date().getTime() < now + sleepDuration) { /* do nothing */ }
    }

    this.BrowsePicture = function (BrowsePictureSuccess) {
        try {                    
            navigator.camera.getPicture(BrowsePictureSuccess, BrowsePictureFail, {              
                quality: 50,
                targetWidth: 2058,
                targetHeight: 1152,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY
            });
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneviewImageFramework.BrowseLocation", Excep);
        }
    }

    var BrowsePictureFail = function (Message) {
        alert('Error while opening gallery, please try again');
    }
}

//For CRUD operation on video
function OneViewCordovaMediaCapturePlugin() {

    this.isOnlineSave = false;
    var IsAnyExceptionOnSave = false;
    var ErrorMessage = '';
    var VideoURL = '';
    //Opens camera and saves video to local file system
    //options to set limit and duration:  limit capture operation to 1 video clips, no longer than 10 seconds each (by default is 1
    ////eg: var options = { limit: 1, duration: 10 };
    this.CaptureVideo = function (options, SuccessCallback, ErrorCallback) {
        try {
            OneViewConsole.Debug("CaptureVideo Start", "OneviewVideoFramework.CaptureVideo");

            if (SuccessCallback == undefined)
                SuccessCallback = this.DefaultSuccessCallback;

            if (ErrorCallback == undefined)
                ErrorCallback = this.DefaultErrorCallback;

            navigator.device.capture.captureVideo(SuccessCallback, ErrorCallback, options);


            OneViewConsole.Debug("CaptureVideo End", "OneviewVideoFramework.CaptureVideo");

            return VideoURL;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneviewVideoFramework.CaptureVideo", Excep);
        }
    }

    this.DefaultSuccessCallback = function (_VideoURL) {
        try {
            navigator.notification.confirm("Do you want to save video offline or online", function (ConfirmationId) {
                if (ConfirmationId == "2") {
                    alert('Video saved successfully');
                }
                else if (ConfirmationId == "1") {
                    //Save image Server and delete local

                    var DestinationPath = "http://10.20.25.158/WINAIMStorageService/SimpleStorageService.svc/SimpleStorageService/service/org/template/attr/user/";
                    // alert(_ImageURL);
                    var oOneViewCordovaFileTransferPlugin = new OneViewCordovaFileTransferPlugin();
                    oOneViewCordovaFileTransferPlugin.Upload(_ImageURL, DestinationPath, UploadSuccessCallBack, UploadErrorCallBack);
                    // var oTestWorker = new TestWorker();
                    //var oOneViewWebWorker = new OneViewWebWorker();
                    //  alert('going on');
                }
            }, "Confirmation Message", ['online', 'offline']);
            IsAnyExceptionOnSave = false;
            VideoURL = _VideoURL;
        }
        catch (Excep) {
            alert('DefaultSuccessCallback :' + Excep)
        }
    }


    this.DefaultErrorCallback = function () {
        IsAnyExceptionOnSave = true;
        alert('error capturing image');
    }


    var UploadSuccessCallBack = function (url) {
        try {
            alert('video uploaded');
            //alert('url' + JSON.stringify(url)); ///Have image saved location and name of server and other details
            var oOneViewCordovaFilePlugin = new OneViewCordovaFilePlugin();
            oOneViewCordovaFilePlugin.DeleteFile(ImageURL);
        }
        catch (Excep) {
            alert('UploadSuccessCallBack :' + Excep);
        }
    }

    var UploadErrorCallBack = function () {
        alert('error uploading video');
    }

    //Views/Shows the captured video in applocation
    //If IsOnline= false : Shows video from local file system
    //If IsOnline= true : Downloads video from server , saves in local file system and shows image
    //SourcePath : where file resides ( If IsOnline=true : SourcePath is server path from where video need to be downloaded  eg:http://10.20.25.158/here/video1.3gp)
    ///we can download file in any download folder for viewing purpose
    ///IsOnline =false , SourcePath is local path where file is there
    this.ViewVideo = function (SourcePath, DestinationDomId, IsOnline) {
        try {
            OneViewConsole.Debug("ViewVideo Start", "OneviewVideoFramework.ViewVideo");

            var Video = document.getElementById(DestinationDomId);
            if (IsOnline == true) {

                var DestinationPath = " file:///mnt/sdcard/downloads/o/video1.3gp";
                // SourcePath = "http://10.20.25.158/WINAIMStorageService/SimpleStorageService.svc/SimpleStorageService/service/org/template/attr/user/video1.3gp";
                var oOneViewCordovaFileTransferPlugin = new OneViewCordovaFileTransferPlugin();
                oOneViewCordovaFileTransferPlugin.Download(DestinationPath, SourcePath, function () { }, function () { })
                //Show image in div
                Video.src = DestinationPath;
            }
            else {
                //Show image in div
                Video.src = SourcePath;
            }
            OneViewConsole.Debug("ViewVideo End", "OneviewVideoFramework.ViewVideo");
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneviewVideoFramework.ViewVideo", Excep);
        }
    }

    //Updates images 
    this.UpdateVideo = function (SourcePath, DestinationPath, IsOnline) {
        try {
            OneViewConsole.Debug("UpdateImage Start", "OneviewImageFramework.UpdateImage");

            if (IsOnline == true) {
                SourcePath = "file:///mnt/sdcard/downloads/o/video1.3gp"
                DestinationPath = "http://10.20.25.158/WINAIMStorageService/SimpleStorageService.svc/SimpleStorageService/service/org/template/attr/user/video1.3gp";
                // alert(_ImageURL);
                var oOneViewCordovaFileTransferPlugin = new OneViewCordovaFileTransferPlugin();
                oOneViewCordovaFileTransferPlugin.Upload(SourcePath, DestinationPath, UpdateVideoSuccessCallBack, UpdateVideoErrorCallBack);
            }
            else {
                var oOneViewCordovaFilePlugin = new OneViewCordovaFilePlugin();
                oOneViewCordovaFilePlugin.DeleteFile(SourcePath);
                //either capture new video or move file here ---- need to discuss
            }
            OneViewConsole.Debug("UpdateImage End", "OneviewImageFramework.UpdateImage");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneviewImageFramework.UpdateImage", Excep);
        }
    }

    var UpdateVideoSuccessCallBack = function (url) {
        try {
            alert('video updated');
            //alert('url' + JSON.stringify(url)); ///Have image saved location and name of server and other details
        }
        catch (Excep) {
            alert('UpdateVideoSuccessCallBack :' + Excep);
        }
    }

    var UpdateVideoErrorCallBack = function () {
        alert('error while update video');
    }

    this.DeleteVideo = function (SourcePath, IsOnline) {
        try {
            OneViewConsole.Debug("DeleteVideo Start", "OneviewVideoFramework.DeleteVideo");


            if (IsOnline == true) {
                //need to delete file at given server location given in SourcePath
                var DestinationPath = "";
                // SourcePath = "http://10.20.25.158/WINAIMStorageService/SimpleStorageService.svc/SimpleStorageService/service/org/template/attr/user/video1.3gp";
                // alert(_ImageURL);
                var oOneViewCordovaFileTransferPlugin = new OneViewCordovaFileTransferPlugin();
                oOneViewCordovaFileTransferPlugin.Upload(SourcePath, DestinationPath, UpdateImageSuccessCallBack, UpdateImageErrorCallBack);
            }
            else {
                var oOneViewCordovaFilePlugin = new OneViewCordovaFilePlugin();
                oOneViewCordovaFilePlugin.DeleteFile(SourcePath);
            }


            OneViewConsole.Debug("DeleteVideo End", "OneviewVideoFramework.DeleteVideo");
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "OneviewVideoFramework.DeleteVideo", Excep);
        }
    }


    var DeleteVideoSuccessCallBack = function (url) {
        try {
            alert('video deleted');
            //alert('url' + JSON.stringify(url)); ///Have image saved location and name of server and other details
        }
        catch (Excep) {
            alert('DeleteVideoSuccessCallBack :' + Excep);
        }
    }

    var DeleteVideoErrorCallBack = function () {
        alert('error while deleting video');
    }


}

function OneViewCordovaFileTransferPlugin() {
    this.Upload = function (Source, Destination, SuccessCallback, ErrorCallback, oOptions) {
        try {
            if (SuccessCallback == undefined)
                SuccessCallback = this.DefaultSuccessCallback;

            if (ErrorCallback == undefined)
                ErrorCallback = this.DefaultErrorCallback;


            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = "Image.jpg";
            options.httpMethod = oOptions['httpMethod'];
            //alert(options.httpMethod);
            //options.mimeType = "";

            // options.params = params;
            //params = {"url" : "d:test/abc.jpg"};

            var ft = new FileTransfer();
            ft.upload(Source, encodeURI(Destination), SuccessCallback, ErrorCallback, options, true);
        }
        catch (Excep) {
            alert('OneViewCordovaFileTransferPlugin.Upload :' + Excep);
        }
    }

    this.DefaultSuccessCallback = function (response) {
        alert('Image saved successfully' + JSON.stringify(response));
    }

    this.DefaultErrorCallback = function (_ImageURL) {
        alert('Error saviing image');
    }

    var UploadImageSuccess = function (response) {
        alert('Image saved successfully');
    }

    var UploadImagefail = function (error) {
        //alert("Error Code: " + error.code);//FileTransferError.FILE_NOT_FOUND_ERR
        if (error.code == 1) {
            alert("No image available to save");
        }
        else {
            alert("image saving to server failed");
        }
    }

    this.Download = function (Source, Destination, SuccessCallback, ErrorCallback) {
        try {

            if (SuccessCallback == undefined)
                SuccessCallback = this.DefaultDownloadSuccessCallback;

            if (ErrorCallback == undefined)
                ErrorCallback = this.DefaultDownloadErrorCallback;

            var fileTransfer = new FileTransfer();
            var uri = encodeURI(Source);

            fileTransfer.download(
                uri,
                Destination,
                SuccessCallback,
                ErrorCallback,      //error codes
                false,
                {
                    headers: {
                        "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                    }
                }
            );

        }
        catch (Excep) {
            alert('OneViewCordovaFileTransferPlugin Download:' + Excep);
        }
    }


    this.DefaultDownloadSuccessCallback = function (url) {
        alert("Image downloaded successfully to url :" + url);
    }

    this.DefaultDownloadErrorCallback = function (details) {
        alert('Error downloading Image');
        alert(JSON.stringify(details));
    }

}

function OneViewCordovaFilePlugin() {

    var oSource = "";
    //get image file to delete locally(fro device
    this.DeleteFile = function (Source) {
        try {
            oSource = Source;
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, DeleteFileSuccess, DeleteFileError);
        }
        catch (e) {
            //alert('GetFromLocalStorage:' + e);
        }
    }

    var DeleteFileError = function (error) {
        // alert("error deleting Image");
        // alert(JSON.stringify(error));
    }

    this.GetFile = function (Source) {
        try {
            oSource = Source;
            //   window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, GotFSTodelete, Deletefail);
        }
        catch (e) {
            //alert('GetFromLocalStorage:' + e);
        }
    }

    var DeleteFileSuccess = function (fileSystem) {
        try {
            // alert(imagelocation);
            //fileSystem.root.getFile(imagelocation, { create: true, exclusive: false }, GotFileEntryToDelete, Deletefail);
            window.resolveLocalFileSystemURI(oSource, GetFileEntryToDelete, GetFSDeleteError);
        }

        catch (e) {
            //alert('GotFSTodelete' + e);
        }
    }

    var GetFileEntryToDelete = function (fileEntry) {
        try {
            fileEntry.file(function (fileObj) {
                fileEntry.remove(DeleteSuccess, DeleteError);
            });
        }
        catch (e) {
            //alert('GotFileEntryToDelete:' + e);
        }
    }

    var GetFSDeleteError = function (r) {
        //alert('Image deleted locally');       
    }

    var DeleteSuccess = function (r) {
        //alert('Image deleted locally');
    }

    var DeleteError = function (error) {
        //alert("error deleting Image");
        // alert(JSON.stringify(error));
    }

}


