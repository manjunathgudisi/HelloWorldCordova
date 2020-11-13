
//var AutoTemperatureEventHandlerFacade = "";
//var Scope;

//var oGlobalOneViewBluetoothTemperatureLoggerPlugin;


// OneView Bluetooth Plugin
function OneViewBluetoothPlugin() {

    // Check the bluetooth status (on or off)
    // Output : true or false (boolean)
    this.IsBluetoothOn = function () {
        try {
            OneViewConsole.Debug("IsBluetoothOn start", "OneViewBluetoothPlugin.IsBluetoothOn");

            var IsSuccess = window.BluetoothFacade.IsBluetoothOn();

            OneViewConsole.Debug("IsBluetoothOn end", "OneViewBluetoothPlugin.IsBluetoothOn");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewBluetoothPlugin.IsBluetoothOn", Excep);
        }
        finally {
            IsSuccess = null;
        }
    }


    // Enable bluetooth
    // Output : true or false (boolean)
    this.EnableBluetooth = function () {
        try {
            OneViewConsole.Debug("EnableBluetooth start", "OneViewBluetoothPlugin.EnableBluetooth");

            var IsSuccess = window.BluetoothFacade.EnableBluetooth();

            OneViewConsole.Debug("EnableBluetooth end", "OneViewBluetoothPlugin.EnableBluetooth");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewBluetoothPlugin.EnableBluetooth", Excep);
        }
        finally {
            IsSuccess = null;
        }
    }


    // Disable bluetooth
    // Output : true or false (boolean)
    this.DisableBluetooth = function () {
        try {
            OneViewConsole.Debug("DisableBluetooth start", "OneViewBluetoothPlugin.DisableBluetooth");

            var IsSuccess = window.BluetoothFacade.DisableBluetooth();

            OneViewConsole.Debug("DisableBluetooth end", "OneViewBluetoothPlugin.DisableBluetooth");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewBluetoothPlugin.DisableBluetooth", Excep);
        }
        finally {
            IsSuccess = null;
        }
    }


    // Get all unpaired devices which available in range
    // Output : List of bluetooth devices (Javascript object)
    this.GetAllUnPairedDevices = function () {
        try {
            OneViewConsole.Debug("GetAllUnPairedDevices start", "OneViewBluetoothPlugin.GetAllUnPairedDevices");

            var DeviceLst = window.BluetoothFacade.GetAllUnPairedDevices();

            OneViewConsole.Debug("GetAllUnPairedDevices end", "OneViewBluetoothPlugin.GetAllUnPairedDevices");

            return JSON.parse(DeviceLst);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewBluetoothPlugin.GetAllUnPairedDevices", Excep);
        }
        finally {
            DeviceLst = null;
        }
    }


    // Get all paired devices (which are available or not available)
    // Output : List of bluetooth devices (Javascript object)
    this.GetAllPairedDevices = function () {
        try {
            OneViewConsole.Debug("GetAllPairedDevices start", "OneViewBluetoothPlugin.GetAllPairedDevices");

            var DeviceLst = window.BluetoothFacade.GetAllPairedDevices();

            OneViewConsole.Debug("GetAllPairedDevices end", "OneViewBluetoothPlugin.GetAllPairedDevices");

            return JSON.parse(DeviceLst);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewBluetoothPlugin.GetAllPairedDevices", Excep);
        }
        finally {
            DeviceLst = null;
        }
    }


    // check device is paired or not
    // Input : DeviceId
    // Output : true or false (boolean)
    this.IsPaired = function (DeviceId) {
        try {
            OneViewConsole.Debug("IsPaired start", "OneViewBluetoothPlugin.IsPaired");

            var IsSuccess = window.BluetoothFacade.IsPaired(DeviceId);

            OneViewConsole.Debug("IsPaired end", "OneViewBluetoothPlugin.IsPaired");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewBluetoothPlugin.IsPaired", Excep);
        }
        finally {
            IsSuccess = null;
        }
    }


    // Pair the new device
    // Input : DeviceId
    // Output : true or false (boolean)
    this.Pair = function (DeviceId) {
        try {
            OneViewConsole.Debug("Pair start", "OneViewBluetoothPlugin.Pair");

            var IsSuccess = window.BluetoothFacade.Pair(DeviceId);

            OneViewConsole.Debug("Pair end", "OneViewBluetoothPlugin.Pair");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewBluetoothPlugin.Pair", Excep);
        }
        finally {
            IsSuccess = null;
        }
    }


    // unpair the already paired device
    // Input : DeviceId
    // Output : true or false (boolean)
    this.UnPair = function (DeviceId) {
        try {
            OneViewConsole.Debug("UnPair start", "OneViewBluetoothPlugin.UnPair");

            var IsSuccess = window.BluetoothFacade.UnPair(DeviceId);

            OneViewConsole.Debug("UnPair end", "OneViewBluetoothPlugin.UnPair");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewBluetoothPlugin.UnPair", Excep);
        }
        finally {
            IsSuccess = null;
        }
    }


}


// OneView Bluetooth Temperature Logger Plugin
function OneViewBluetoothTemperatureLoggerPlugin() {
    try {
        OneViewConsole.Debug("OneViewBluetoothTemperatureLoggerPlugin start", "OneViewBluetoothTemperatureLoggerPlugin");

        ///oGlobalOneViewBluetoothTemperatureLoggerPlugin = this;
        this.AutoTemperatureEventHandler;
        var MyInstance = this;

        OneViewConsole.Debug("OneViewBluetoothTemperatureLoggerPlugin end", "OneViewBluetoothTemperatureLoggerPlugin");

    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Plugin", "OneViewBluetoothTemperatureLoggerPlugin", Excep);
    }

    // Connect the device to blue therm service
    // Input :  DeviceId
    // Output : Connection Status Info (Javascript object)
    this.Connect = function (DeviceId, DeviceType) {
        try {
            OneViewConsole.Debug("Connect start", "OneViewBluetoothTemperatureLoggerPlugin.Connect");

            var IsSuccess = window.BluetoothTempFacade.Initialize(DeviceType);
            var ConnectionStatusInfo = window.BluetoothTempFacade.Connect(DeviceId, DeviceType);

            OneViewConsole.Debug("Connect end", "OneViewBluetoothTemperatureLoggerPlugin.Connect");

            return JSON.parse(ConnectionStatusInfo);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewBluetoothTemperatureLoggerPlugin.Connect", Excep);
        }
        finally {
            IsSuccess = null;
            ConnectionStatusInfo = null;
        }
    }


    // DisConnect the device from blue therm service
    // Input :  DeviceId
    // Output : true or false (boolean)
    this.DisConnect = function (DeviceType) {
        try {
            OneViewConsole.Debug("DisConnect start", "OneViewBluetoothTemperatureLoggerPlugin.DisConnect");

            var IsSuccess = window.BluetoothTempFacade.DisConnect(DeviceType);

            OneViewConsole.Debug("DisConnect end", "OneViewBluetoothTemperatureLoggerPlugin.DisConnect");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewBluetoothTemperatureLoggerPlugin.DisConnect", Excep);
        }
        finally {
            IsSuccess = null;
        }
    }


    // Get temperature
    // Input :  DeviceId
    // Output : Temperature Info (Javascript object)
    this.GetTemperature = function (DeviceId, DeviceType) {
        try {
            OneViewConsole.Debug("GetTemperature start", "OneViewBluetoothTemperatureLoggerPlugin.GetTemperature");

            var TemperatureInfo = window.BluetoothTempFacade.GetTemperature(DeviceId, DeviceType);

            OneViewConsole.Debug("GetTemperature end", "OneViewBluetoothTemperatureLoggerPlugin.GetTemperature");

            return JSON.parse(TemperatureInfo);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewBluetoothTemperatureLoggerPlugin.GetTemperature", Excep);
        }
        finally {
            TemperatureInfo = null;
        }
    }


    // Get battery status
    // Input :  DeviceId
    // Output : Battery Info (Javascript object)
    this.GetBateryStatus = function (DeviceId, DeviceType) {
        try {
            OneViewConsole.Debug("GetBateryStatus start", "OneViewBluetoothTemperatureLoggerPlugin.GetBateryStatus");

            var BatteryInfo = window.BluetoothTempFacade.GetBateryStatus(DeviceId, DeviceType);

            OneViewConsole.Debug("GetBateryStatus end", "OneViewBluetoothTemperatureLoggerPlugin.GetBateryStatus");

            return JSON.parse(BatteryInfo);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewBluetoothTemperatureLoggerPlugin.GetBateryStatus", Excep);
        }
        finally {
            BatteryInfo = null;
        }
    }


    // Get device range
    // Input :  DeviceId
    // Output : Range Info (Javascript object)
    this.GetRangeInfo = function (DeviceId, DeviceType) {
        try {
            OneViewConsole.Debug("GetRangeInfo start", "OneViewBluetoothTemperatureLoggerPlugin.GetRangeInfo");

            var RangeInfo = window.BluetoothTempFacade.GetRangeInfo(DeviceId, DeviceType);

            OneViewConsole.Debug("GetRangeInfo end", "OneViewBluetoothTemperatureLoggerPlugin.GetRangeInfo");

            return JSON.parse(RangeInfo);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewBluetoothTemperatureLoggerPlugin.GetRangeInfo", Excep);
        }
        finally {
            RangeInfo = null;
        }
    }


    // Auto Temperature Listener for probe press event
    // Input :  Temperature Info Request from probe
    // Output : Call the OneViewAutoTemperatureListener (if it is registered)
    this.AutoTemperatureListener = function (TemperatureInfo) {
        try {
            OneViewConsole.Debug("AutoTemperatureListener start", "OneViewBluetoothTemperatureLoggerPlugin.AutoTemperatureListener");
            //alert(JSON.stringify(TemperatureInfo));
            //if (ConnectedProbe[0] == undefined) {
            //    var _oTemperatureInfo = JSON.parse(TemperatureInfo);
            //    if (_oTemperatureInfo.IsAnyException == false) {
            //        // ConnectedProbe[0]
            //        ConnectedProbe[0] = { "Index": 1, "Id": _oTemperatureInfo.Name, "Name": _oTemperatureInfo.Name };
            //    }
            //}
            //else {
            //    var _oTemperatureInfo = JSON.parse(TemperatureInfo);
            //    if (_oTemperatureInfo.IsAnyException == true) {
            //        ConnectedProbe = {};
            //    }
            //}


            var _oTemperatureInfo = JSON.parse(TemperatureInfo);
            if (_oTemperatureInfo.IsAnyException == true) {
                if (ConnectedProbe[0] != undefined) {
                    if (_oTemperatureInfo.OneViewException.ExceptionMessage == "Device SHUTDOWN") {
                        OneViewLocalStorage.Save("SHUTDOWNProbeDetails", JSON.stringify(ConnectedProbe));
                        document.getElementById("divBlueThermLiveProbeConnectionButton").style.display = "";
                    }
                    ConnectedProbe = {};
                    var obj = document.getElementById('txtTemperatureLoggerControlId');
                    if (obj != null) {
                        obj.innerHTML = "00.0000";
                    }

                }
            }
            else {
                document.getElementById("divBlueThermLiveProbeConnectionButton").style.display = "none";
            }

            if (MyInstance.AutoTemperatureEventHandler != undefined && MyInstance.AutoTemperatureEventHandler != "" && MyInstance.AutoTemperatureEventHandler != null) {
                //var obj = new window[AutoTemperatureEventHandlerFacade]();
                // obj.NotifyTemperature(Scope, JSON.parse(TemperatureInfo));
                MyInstance.AutoTemperatureEventHandler(JSON.parse(TemperatureInfo));
            }
            else {
                OneViewConsole.Debug("No AutoTemperatureListener assighned", "OneViewBluetoothTemperatureLoggerPlugin.AutoTemperatureListener");
            }

            OneViewConsole.Debug("AutoTemperatureListener end", "OneViewBluetoothTemperatureLoggerPlugin.AutoTemperatureListener");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewBluetoothTemperatureLoggerPlugin.AutoTemperatureListener", Excep);
        }
    }

    // Auto Temperature Listener for probe press event
    // Input :  Temperature Info Request from probe
    // Output : Call the OneViewAutoTemperatureListener (if it is registered)
    this.TemperatureLog = function (Temperature, BatteryPercentage, ProbeDetails) {
        try {
            OneViewConsole.Debug("AutoTemperatureListener start", "OneViewBluetoothTemperatureLoggerPlugin.AutoTemperatureListener");
            //alert(Temperature + "," + BatteryPercentage + "," + ProbeDetails);
            if (ConnectedProbe[0] != undefined) {
                if (Temperature != "" && Temperature != undefined && Temperature != null) {
                    var obj = document.getElementById('txtTemperatureLoggerControlId');
                    if (obj != null) {
                        obj.innerHTML = Temperature;
                    }

                    var BatteryPercentageobj = document.getElementById('txtBatteryPercentageControlId');
                    if (BatteryPercentageobj != null) {
                        var Html = '<span>' + BatteryPercentage + '%</span>';
                        if (BatteryPercentage >= 81) {
                            Html += '<i class="icon icon-battery"></i>';
                        }
                        else if (BatteryPercentage >= 36 && BatteryPercentage <= 80) {
                            Html += '<i class="icon icon-battery-75"></i>';
                        }
                        else if (BatteryPercentage >= 11 && BatteryPercentage <= 35) {
                            Html += '<i class="icon icon-battery-25 energized"></i>';
                        }
                        else {
                            Html += '<i class="icon icon-battery-empty assertive"></i>';
                        }
                        BatteryPercentageobj.innerHTML = Html;
                    }

                    //else {
                    //    alert("Temperature log plcae holder not found");
                    //}
                }
            }
            else {
                if (ProbeDetails != undefined && ProbeDetails != "") {
                    if (OneViewLocalStorage.Get("SHUTDOWNProbeDetails") != null) {
                        ConnectedProbe[0] = { "Index": 1, "Id": ProbeDetails, "Name": ProbeDetails };
                        OneViewLocalStorage.Remove("SHUTDOWNProbeDetails");
                        document.getElementById("divBlueThermLiveProbeConnectionButton").style.display = "none";
                        alert('IN-SU-MSE-001 :: Connected successfully');
                    }
                }
            }
            OneViewConsole.Debug("AutoTemperatureListener end", "OneViewBluetoothTemperatureLoggerPlugin.AutoTemperatureListener");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewBluetoothTemperatureLoggerPlugin.AutoTemperatureListener", Excep);
        }
    }


    // Auto Probe Off Listener
    // Input :  ConnectionStatus Info Request from probe
    // Output : Call the OneViewAutoProbeOffListener (if it is registered)
    this.AutoProbeOffListener = function (ConnectionStatusInfo) {
        try {
            OneViewConsole.Debug("AutoProbeOffListener start", "OneViewBluetoothTemperatureLoggerPlugin.AutoProbeOffListener");

            var ConnectionStatus = JSON.parse(ConnectionStatusInfo);

            // Register the OneViewAutoProbeOffListener function globally for AutoProbeOff
            // window["OneViewAutoProbeOffListener"](ConnectionStatus);

            OneViewConsole.Debug("AutoProbeOffListener end", "OneViewBluetoothTemperatureLoggerPlugin.AutoProbeOffListener");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewBluetoothTemperatureLoggerPlugin.AutoProbeOffListener", Excep);
        }
        finally {
            ConnectionStatus = null;
        }
    }
}


function OneViewSqlitePlugin() {

    this.InitializeDBContext = function (DBName) {

        try {
            OneViewConsole.Debug("InitializeDBContext start", "SqlitePlugin.InitializeDBContext");

            window.OneViewSqlite.InitializeDBContext(DBName);

            OneViewConsole.Debug("InitializeDBContext end", "SqlitePlugin.InitializeDBContext");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "SqlitePlugin.InitializeDBContext", Excep);
        }
    }

    this.StartTransaction = function () {

        try {
            OneViewConsole.Debug("StartTransaction start", "SqlitePlugin.StartTransaction");

            window.OneViewSqlite.StartTransaction();

            OneViewConsole.Debug("StartTransaction end", "SqlitePlugin.StartTransaction");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "SqlitePlugin.StartTransaction", Excep);
        }
    }

    this.EndTransaction = function () {

        try {
            OneViewConsole.Debug("EndTransaction start", "SqlitePlugin.EndTransaction");

            window.OneViewSqlite.EndTransaction();

            OneViewConsole.Debug("EndTransaction end", "SqlitePlugin.EndTransaction");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "SqlitePlugin.EndTransaction", Excep);
        }
    }

    this.Rollback = function () {

        try {
            OneViewConsole.Debug("Rollback start", "SqlitePlugin.Rollback");

            window.OneViewSqlite.Rollback();

            OneViewConsole.Debug("Rollback end", "SqlitePlugin.Rollback");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "SqlitePlugin.Rollback", Excep);
        }
    }

    this.ExcecuteSqlReader = function (Query) {

        try {
            OneViewConsole.Debug("ExcecuteSqlReader start", "SqlitePlugin.ExcecuteSqlReader");

            var result = window.OneViewSqlite.excecuteSqlReader(Query);

            OneViewConsole.Debug("ExcecuteSqlReader end", "SqlitePlugin.ExcecuteSqlReader");

            return JSON.parse(result);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "SqlitePlugin.ExcecuteSqlReader", Excep);
        }
        finally {
            result = null;
        }
    }

    this.ExcecuteSql = function (Query) {

        try {
            OneViewConsole.Debug("ExcecuteSql start", "SqlitePlugin.ExcecuteSql");

            window.OneViewSqlite.excecuteSql(Query);

            OneViewConsole.Debug("ExcecuteSql end", "SqlitePlugin.ExcecuteSql");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "SqlitePlugin.ExcecuteSql", Excep);
        }
    }

    this.GetAll = function (TableName) {

        try {
            OneViewConsole.Debug("GetAll start", "SqlitePlugin.GetAll");

            window.OneViewSqlite.GetAll(TableName);

            OneViewConsole.Debug("GetAll end", "SqlitePlugin.GetAll");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "SqlitePlugin.GetAll", Excep);
        }
    }

    this.Drop = function (TableName) {

        try {
            OneViewConsole.Debug("Drop start", "SqlitePlugin.Drop");

            window.OneViewSqlite.Drop(TableName);

            OneViewConsole.Debug("Drop end", "SqlitePlugin.Drop");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "SqlitePlugin.Drop", Excep);
        }
    }

    this.DeleteAll = function (TableName) {

        try {
            OneViewConsole.Debug("DeleteAll start", "SqlitePlugin.DeleteAll");

            window.OneViewSqlite.DeleteAll(TableName);

            OneViewConsole.Debug("DeleteAll end", "SqlitePlugin.DeleteAll");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "SqlitePlugin.DeleteAll", Excep);
        }
    }

    this.CopyDatabase = function () {

        try {
            OneViewConsole.Debug("CopyDatabase start", "SqlitePlugin.CopyDatabase");

            window.OneViewSqlite.CopyDatabase();

            OneViewConsole.Debug("CopyDatabase end", "SqlitePlugin.CopyDatabase");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "SqlitePlugin.CopyDatabase", Excep);
        }
    }

    this.RestoreDatabase = function () {

        try {
            OneViewConsole.Debug("RestoreDatabase start", "SqlitePlugin.RestoreDatabase");

            window.OneViewSqlite.RestoreDatabase();

            OneViewConsole.Debug("RestoreDatabase end", "SqlitePlugin.RestoreDatabase");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "SqlitePlugin.RestoreDatabase", Excep);
        }
    }
}

function OneViewAppInfoPlugin() {

    this.ClearCache = function () {
        try {

            OneViewConsole.Debug("ClearCache Start", "OneViewAppInfoPlugin.ClearCache");

            window.OneViewAppInfo.ClearCache();

            OneViewConsole.Debug("ClearCache End", "OneViewAppInfoPlugin.ClearCache");
        }
        catch (Excep) {
            alert('OneViewAppInfoPlugin.ClearCache ,Exception :' + Excep);
            //throw oOneViewExceptionHandler.Create("Plugin", "OneViewAppInfoPlugin.ClearCache", Excep);
        }
    }

    this.SetPortraitOrientation = function () {
        try {

            OneViewConsole.Debug("SetPortraitOrientation Start", "OneViewAppInfoPlugin.SetPortraitOrientation");

            window.OneViewAppInfo.SetPortraitOrientation();

            OneViewConsole.Debug("SetPortraitOrientation End", "OneViewAppInfoPlugin.SetPortraitOrientation");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewAppInfoPlugin.SetPortraitOrientation", Excep);
        }
    }

    this.SetLandScapeOrientation = function () {
        try {

            OneViewConsole.Debug("SetLandScapeOrientation Start", "OneViewAppInfoPlugin.SetLandScapeOrientation");

            window.OneViewAppInfo.SetLandScapeOrientation();

            OneViewConsole.Debug("SetLandScapeOrientation End", "OneViewAppInfoPlugin.SetLandScapeOrientation");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewAppInfoPlugin.SetLandScapeOrientation", Excep);
        }
    }

    this.LockOrientation = function () {
        try {

            OneViewConsole.Debug("LockOrientation Start", "OneViewAppInfoPlugin.LockOrientation");

            window.OneViewAppInfo.LockOrientation();

            OneViewConsole.Debug("LockOrientation End", "OneViewAppInfoPlugin.LockOrientation");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewAppInfoPlugin.LockOrientation", Excep);
        }
    }

    this.UnLockOrientation = function () {
        try {

            OneViewConsole.Debug("UnLockOrientation Start", "OneViewAppInfoPlugin.UnLockOrientation");

            window.OneViewAppInfo.UnLockOrientation();

            OneViewConsole.Debug("UnLockOrientation End", "OneViewAppInfoPlugin.UnLockOrientation");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewAppInfoPlugin.UnLockOrientation", Excep);
        }
    }

    this.GetRemoteAppInfo = function (OrgName, ServiceURL) {
        try {

            OneViewConsole.Debug("GetRemoteAppInfo Start", "OneViewAppInfoPlugin.GetRemoteAppInfo");

            var response = { 'IsAnyException': false, 'AppInfo': "", 'Message': '' };
            var AppInfo = window.OneViewAppInfo.GetRemoteAppInfo(OrgName, ServiceURL);
            try {
                if (AppInfo != "") {
                    response.AppInfo = JSON.parse(AppInfo);
                    // return JSON.parse(AppInfo);
                }
                else {
                    response.IsAnyException = true;
                    response.AppInfo = AppInfo;
                    response.Message = 'IN-ER-AUP-021 :: No upgrade data found , please contact administrator.';
                    // return AppInfo;
                }
            }

            catch (Exc) {
                response.IsAnyException = true;
                response.AppInfo = AppInfo;
                response.Message = 'IN-ER-AUP-022 ::  No upgrade file found , please contact administrator.';
            }
            OneViewConsole.Debug("GetRemoteAppInfo End", "OneViewAppInfoPlugin.GetRemoteAppInfo");

            return response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewAppInfoPlugin.GetRemoteAppInfo", Excep);
        }
        finally {
            AppInfo = null;
        }
    }

    this.GetLocalAppInfo = function () {
        try {

            OneViewConsole.Debug("GetLocalAppInfo Start", "OneViewAppInfoPlugin.GetLocalAppInfo");

            var AppInfo = window.OneViewAppInfo.GetLocalAppInfo();
            return JSON.parse(AppInfo);

            OneViewConsole.Debug("GetLocalAppInfo End", "OneViewAppInfoPlugin.GetLocalAppInfo");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewAppInfoPlugin.GetLocalAppInfo", Excep);
        }
        finally {
            AppInfo = null;
        }
    }

    this.GetConfigFile = function (OrgName, ServiceURL) {
        try {

            OneViewConsole.Debug("GetConfigFile Start", "OneViewAppInfoPlugin.GetConfigFile");

            var AppInfo = window.OneViewAppInfo.DownloadConfigFile(OrgName, ServiceURL);
            return JSON.parse(AppInfo);

            OneViewConsole.Debug("GetConfigFile End", "OneViewAppInfoPlugin.GetConfigFile");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewAppInfoPlugin.GetConfigFile", Excep);
        }
        finally {
            AppInfo = null;
        }
    }

    this.DownloadJsFile = function (OrgName, DirectoryName, FileName, ServiceURL) {
        try {

            OneViewConsole.Debug("DownloadJsFile Start", "OneViewAppInfoPlugin.DownloadJsFile");

            window.OneViewAppInfo.DownloadJsFile(OrgName, DirectoryName, FileName, ServiceURL);

            OneViewConsole.Debug("DownloadJsFile End", "OneViewAppInfoPlugin.DownloadJsFile");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewAppInfoPlugin.DownloadJsFile", Excep);
        }
    }

    this.DownloadApk = function (OrgName, ServiceURL) {

        try {
            OneViewConsole.Debug("DownloadApk start", "OneViewAppInfoPlugin.DownloadApk");

            var IsSuccess = window.OneViewAppInfo.DownloadApk(OrgName, ServiceURL);
            return IsSuccess;

            OneViewConsole.Debug("DownloadApk end", "OneViewAppInfoPlugin.DownloadApk");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Controller", "OneViewAppInfoPlugin.DownloadApk", Excep);
        }
    }

    this.UpdateApk = function () {

        try {
            OneViewConsole.Debug("UpdateApk start", "OneViewAppInfoPlugin.UpdateApk");

            window.OneViewAppInfo.UpdateApk();

            OneViewConsole.Debug("UpdateApk end", "OneViewAppInfoPlugin.UpdateApk");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Controller", "OneViewAppInfoPlugin.UpdateApk", Excep);
        }
    }

    this.ShowToast = function (Message) {
        try {

            OneViewConsole.Debug("ShowToast Start", "OneViewAppInfoPlugin.ShowToast");

            window.OneViewAppInfo.ShowToast(Message);

            OneViewConsole.Debug("ShowToast End", "OneViewAppInfoPlugin.ShowToast");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewAppInfoPlugin.ShowToast", Excep);
        }
    }

    this.ClearCacheFiles = function () {
        try {

            OneViewConsole.Debug("ClearCacheFiles Start", "OneViewAppInfoPlugin.ClearCacheFiles");

            window.OneViewAppInfo.ClearCacheFiles();

            OneViewConsole.Debug("ClearCacheFiles End", "OneViewAppInfoPlugin.ClearCacheFiles");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewAppInfoPlugin.ClearCacheFiles", Excep);
        }
    }

    this.ClearCacheFilesByName = function (Name) {
        try {

            OneViewConsole.Debug("ClearCacheFilesByName Start", "OneViewAppInfoPlugin.ClearCacheFilesByName");

            window.OneViewAppInfo.ClearCacheFilesByName(Name);

            OneViewConsole.Debug("ClearCacheFilesByName End", "OneViewAppInfoPlugin.ClearCacheFilesByName");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewAppInfoPlugin.ClearCacheFilesByName", Excep);
        }
    }

    this.RedirectToAppStore = function () {
        try {

            OneViewConsole.Debug("RedirectToAppStore Start", "OneViewAppInfoPlugin.RedirectToAppStore");

            //alert('here RedirectToAppStore');
            window.OneViewAppInfo.RedirectToAppStore();

            OneViewConsole.Debug("RedirectToAppStore End", "OneViewAppInfoPlugin.RedirectToAppStore");

        }
        catch (Excep) {
            //alert('RedirectToAppStore Excep 11 : ' + Excep);
            // alert('RedirectToAppStore Excep 22 : ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewAppInfoPlugin.RedirectToAppStore", Excep);
        }
        finally {

        }
    }

    this.IsFileExist = function (Path) {
        try {

            OneViewConsole.Debug("IsFileExist Start", "OneViewAppInfoPlugin.IsFileExist");

            var IsExist = window.OneViewAppInfo.IsFileExist(Path);

            OneViewConsole.Debug("IsFileExist End", "OneViewAppInfoPlugin.IsFileExist");

            return IsExist;
        }
        catch (Excep) {
            //alert('IsFileExist : ' + Excep);
            //alert('IsFileExist : ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewAppInfoPlugin.IsFileExist", Excep);
        }
        finally {

        }
    }

    this.GetPackageName = function () {
        try {

            OneViewConsole.Debug("GetPackageName Start", "OneViewAppInfoPlugin.GetPackageName");

            var PackageName = window.OneViewAppInfo.GetPackageName();

            OneViewConsole.Debug("GetPackageName End", "OneViewAppInfoPlugin.GetPackageName");

            return PackageName;
        }
        catch (Excep) {
            //alert('GetPackageName : ' + Excep);
            //alert('GetPackageName : ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewAppInfoPlugin.GetPackageName", Excep);
        }
        finally {

        }
    }

    this.GetListOfImageFiles = function () {
        try {

            OneViewConsole.Debug("GetListOfImageFiles Start", "OneViewAppInfoPlugin.GetListOfImageFiles");

            var ListOfImageFiles = window.OneViewAppInfo.GetListOfImageFiles();
            ListOfImageFiles = JSON.parse(ListOfImageFiles);

            OneViewConsole.Debug("GetListOfImageFiles End", "OneViewAppInfoPlugin.GetListOfImageFiles");

            return ListOfImageFiles;
        }
        catch (Excep) {
            //alert('GetListOfImageFiles : ' + Excep);
            // alert('GetListOfImageFiles : ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewAppInfoPlugin.GetListOfImageFiles", Excep);
        }
        finally {

        }
    }

    this.ZipFolder = function (InputFolderPath, OutputZipPath) {
        try {

            OneViewConsole.Debug("ZipFolder Start", "OneViewAppInfoPlugin.ZipFolder");

            //InputFolderPath = '/mnt/sdcard/OneView/Log Files/';
            //OutputZipPath = '/mnt/sdcard/OneView/ZippedLogs.zip';

            var res = window.OneViewAppInfo.ZipFolder(InputFolderPath, OutputZipPath);

            OneViewConsole.Debug("ZipFolder End", "OneViewAppInfoPlugin.ZipFolder");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewAppInfoPlugin.ZipFolder", Excep);
        }
        finally {
            AppInfo = null;
        }
    }

    this.Scan = function () {
        try {
            OneViewConsole.Debug("Scan start", "OneViewAppInfoPlugin.Scan");

            //  alert('Scan');
            var ProbeNameList = [];
            var ProbeDetails = window.OneViewAppInfo.Scan();
            if (ProbeDetails != "") {
                ProbeNameList = JSON.parse(ProbeDetails);
            }

            // alert('ProbeNameList : ' + JSON.stringify(ProbeNameList));
            OneViewConsole.Debug("Scan end", "OneViewAppInfoPlugin.Scan");
            // alert(ProbeDetails.BLEDevice);
            //   ProbeDetails = JSON.parse(ProbeDetails);

            return ProbeNameList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewAppInfoPlugin.Scan", Excep);
        }
        finally {
            IsSuccess = null;
        }
    }


    this.ConnectNewProbe = function (Name) {
        try {
            OneViewConsole.Debug("Scan start", "OneViewAppInfoPlugin.Scan");

            var ProbeDetails = window.OneViewAppInfo.ConnectNewProbe(Name);
            ProbeDetails = JSON.parse(ProbeDetails);

            OneViewConsole.Debug("Scan end", "OneViewAppInfoPlugin.Scan");
            // alert(ProbeDetails.BLEDevice);
            //   ProbeDetails = JSON.parse(ProbeDetails);

            return ProbeDetails;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewAppInfoPlugin.Scan", Excep);
        }
        finally {
            IsSuccess = null;
        }
    }

    this.DisconnectNewProbe = function (Name) {
        try {
            OneViewConsole.Debug("Scan start", "OneViewAppInfoPlugin.Scan");
            // alert('DisconnectNewProbe');
            var ProbeDetailsConnectionStatus = window.OneViewAppInfo.DisconnectNewProbe(Name);
            ProbeDetailsConnectionStatus = JSON.parse(ProbeDetailsConnectionStatus);
            //  alert('DisConnectNewProbe : ' + JSON.stringify(ProbeDetails));


            OneViewConsole.Debug("Scan end", "OneViewAppInfoPlugin.Scan");
            return ProbeDetailsConnectionStatus.ConnectionState;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewAppInfoPlugin.Scan", Excep);
        }
        finally {
            IsSuccess = null;
        }
    }

    this.GetConnectionStatus = function (Name) {
        try {
            OneViewConsole.Debug("GetConnectionStatus start", "OneViewAppInfoPlugin.GetConnectionStatus");
            // alert('DisconnectNewProbe');
            var ProbeDetailsConnectionStatus = window.OneViewAppInfo.GetConnectionStatus(Name);
            ProbeDetailsConnectionStatus = JSON.parse(ProbeDetailsConnectionStatus);
            // alert('GetConnectionStatus : ' + JSON.stringify(ProbeDetailsConnectionStatus));


            OneViewConsole.Debug("GetConnectionStatus end", "OneViewAppInfoPlugin.GetConnectionStatus");
            return ProbeDetailsConnectionStatus;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewAppInfoPlugin.GetConnectionStatus", Excep);
        }
        finally {
            IsSuccess = null;
        }
    }


}

function OneViewDeviceInfoPlugin() {

    var MyInstance = this;

    var oOneViewCordovaDeviceInfo = new OneViewCordovaDeviceInfo();

    this.GetDeviceInfo = function () {

        var _oOneViewAppInfoPlugin = new OneViewAppInfoPlugin();
        var LocalAppInfo = _oOneViewAppInfoPlugin.GetLocalAppInfo();

        var OrganizationId = OneViewSessionStorage.Get("OrganizationId");
        OrganizationId = (OrganizationId == null) ? "" : OrganizationId;

        var ServiceId = OneViewSessionStorage.Get("ServiceId");
        ServiceId = (ServiceId == null) ? "" : ServiceId;

        var LoginUserId = OneViewSessionStorage.Get("LoginUserId");
        LoginUserId = (LoginUserId == null) ? "" : LoginUserId;

        var UUID = MyInstance.GetUUID();
        var IMEI = MyInstance.GetIMEINumber();

        IMEI = (IMEI == 'undefined' || IMEI == '' || IMEI == undefined) ? UUID : IMEI;

        try {
            var result = {

                "CordovaVersion": MyInstance.GetCordovaVersion(),
                "Model": MyInstance.GetDeviceModel(),
                "Platform": MyInstance.GetPlatform(),
                "PlatformVersion": MyInstance.GetOSVersion(),
                "UUID": MyInstance.GetUUID(),
                "Manufacturer": MyInstance.GetManufacturer(),
                "Brand": MyInstance.GetBrand(),
                "SimSerialNumber": MyInstance.GetSimSerialNumber(),
                "IMEI": IMEI,
                "Line1PhoneNumber": MyInstance.GetLine1PhoneNumber(),
                "OneViewVersionCode": LocalAppInfo.VersionCode,
                "OneViewVersionName": LocalAppInfo.VersionName,
                "IPAddress": MyInstance.GetIpAddress(),
                "Code": "",
                "WebKitName": "",
                "WebKitVersion": "",
                "OrganizationId": OrganizationId,
                "ServiceId": ServiceId,
                "UserId": LoginUserId
            }

            return result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewDeviceInfoPlugin.GetDeviceInfo", Excep);
        }
    }

    this.GetCordovaVersion = function () {

        try {
            OneViewConsole.Debug("GetCordovaVersion start", "OneViewDeviceInfoPlugin.GetCordovaVersion");

            var result = oOneViewCordovaDeviceInfo.GetCordovaVersion();
            return result;

            OneViewConsole.Debug("GetCordovaVersion end", "OneViewDeviceInfoPlugin.GetCordovaVersion");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewDeviceInfoPlugin.GetCordovaVersion", Excep);
        }
    }

    this.GetDeviceModel = function () {

        try {
            OneViewConsole.Debug("GetDeviceModel start", "OneViewDeviceInfoPlugin.GetDeviceModel");

            var result = oOneViewCordovaDeviceInfo.GetDeviceModel();
            return result;

            OneViewConsole.Debug("GetDeviceModel end", "OneViewDeviceInfoPlugin.GetDeviceModel");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewDeviceInfoPlugin.GetDeviceModel", Excep);
        }
    }

    this.GetPlatform = function () {

        try {
            OneViewConsole.Debug("GetPlatform start", "OneViewDeviceInfoPlugin.GetPlatform");

            var result = oOneViewCordovaDeviceInfo.GetPlatform();
            return result;

            OneViewConsole.Debug("GetPlatform end", "OneViewDeviceInfoPlugin.GetPlatform");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewDeviceInfoPlugin.GetPlatform", Excep);
        }
    }

    this.GetUUID = function () {

        try {
            OneViewConsole.Debug("GetUUID start", "OneViewDeviceInfoPlugin.GetUUID");

            var result = oOneViewCordovaDeviceInfo.GetUUID();
            return result;

            OneViewConsole.Debug("GetUUID end", "OneViewDeviceInfoPlugin.GetUUID");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewDeviceInfoPlugin.GetUUID", Excep);
        }
    }

    this.GetOSVersion = function () {

        try {
            OneViewConsole.Debug("GetOSVersion start", "OneViewDeviceInfoPlugin.GetOSVersion");

            var result = oOneViewCordovaDeviceInfo.GetOSVersion();
            return result;

            OneViewConsole.Debug("GetOSVersion end", "OneViewDeviceInfoPlugin.GetOSVersion");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewDeviceInfoPlugin.GetOSVersion", Excep);
        }
    }

    this.GetManufacturer = function () {

        try {
            OneViewConsole.Debug("GetManufacturerName start", "OneViewDeviceInfoPlugin.GetManufacturerName");

            var result = window.OneViewDeviceInfo.GetManufacturer();
            return result;

            OneViewConsole.Debug("GetManufacturerName end", "OneViewDeviceInfoPlugin.GetManufacturerName");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewDeviceInfoPlugin.GetManufacturerName", Excep);
        }
    }

    this.GetBrand = function () {

        try {
            OneViewConsole.Debug("GetBrandName start", "OneViewDeviceInfoPlugin.GetBrandName");

            var result = window.OneViewDeviceInfo.GetBrand();
            return result;

            OneViewConsole.Debug("GetBrandName end", "OneViewDeviceInfoPlugin.GetBrandName");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewDeviceInfoPlugin.GetBrandName", Excep);
        }
    }

    this.GetIpAddress = function () {

        try {
            OneViewConsole.Debug("GetIpAddress start", "OneViewDeviceInfoPlugin.GetIpAddress");

            var result = window.OneViewDeviceInfo.GetIpAddress();
            return result;

            OneViewConsole.Debug("GetIpAddress end", "OneViewDeviceInfoPlugin.GetIpAddress");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewDeviceInfoPlugin.GetIpAddress", Excep);
        }
    }

    this.GetSimSerialNumber = function () {

        try {
            OneViewConsole.Debug("GetSimSerialNumber start", "OneViewDeviceInfoPlugin.GetSimSerialNumber");

            var result = window.OneViewDeviceInfo.GetSimSerialNumber();
            return result;

            OneViewConsole.Debug("GetSimSerialNumber end", "OneViewDeviceInfoPlugin.GetSimSerialNumber");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewDeviceInfoPlugin.GetSimSerialNumber", Excep);
        }
    }

    this.GetIMEINumber = function () {

        try {
            OneViewConsole.Debug("GetImeiNumber start", "OneViewDeviceInfoPlugin.GetImeiNumber");

            var result = window.OneViewDeviceInfo.GetIMEINumber();
            return result;

            OneViewConsole.Debug("GetImeiNumber end", "OneViewDeviceInfoPlugin.GetImeiNumber");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewDeviceInfoPlugin.GetImeiNumber", Excep);
        }
    }

    this.GetLine1PhoneNumber = function () {

        try {
            OneViewConsole.Debug("GetLine1Number start", "OneViewDeviceInfoPlugin.GetLine1Number");

            var result = window.OneViewDeviceInfo.GetLine1PhoneNumber();
            return result;

            OneViewConsole.Debug("GetLine1Number end", "OneViewDeviceInfoPlugin.GetLine1Number");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewDeviceInfoPlugin.GetLine1Number", Excep);
        }
    }

    this.Scan = function () {
        try {
            OneViewConsole.Debug("Scan start", "OneViewDeviceInfoPlugin.Scan");

            //alert('OneViewDeviceInfoPlugin.Scan');
            var IsSuccess = window.OneViewAppInfo.Scan();

            // alert('Scan : ' + IsSuccess);
            OneViewConsole.Debug("Scan end", "OneViewDeviceInfoPlugin.Scan");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewDeviceInfoPlugin.Scan", Excep);
        }
        finally {
            IsSuccess = null;
        }
    }
}

function OneViewEncryptionPlugin() {

    this.GetMd5HashString = function (Parm) {

        try {
            var HashString = window.OneViewEncryption.GetMd5HashString(Parm);
            return HashString;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewEncryptionPlugin.GetMd5HashString", Excep);
        }
    }
}

function OneViewGeolocationPlugin() {

    this.CheckGeolocation = function () {
        try {

            var IsSuccess = window.OneViewGeolocation.CheckGeolocation();
            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewGeolocationPlugin.CheckGeolocation", Excep);
        }
    }

    this.OpenGPSSettings = function () {
        try {
            window.OneViewGeolocation.OpenGPSSettings();
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewGeolocationPlugin.OpenGPSSettings", Excep);
        }
    }
    this.GetLatitudeAndLongitude = function (SuccessCalback) {
        try {
            var result = window.OneViewGeolocation.GetLatitudeAndLangtitude();
            return JSON.parse(result);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewGeolocationPlugin.GetLatitudeAndLongitude", Excep);
        }
    }

    this.RequestLocationUpdates = function () {
        try {
            window.OneViewGeolocation.RequestLocationUpdates();
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewGeolocationPlugin.RequestLocationUpdates", Excep);
        }
    }

    this.RemoveLocationUpdates = function () {
        try {
            window.OneViewGeolocation.RemoveLocationUpdates();
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewGeolocationPlugin.RemoveLocationUpdates", Excep);
        }
    }
}

function OneViewAutoUploadPlugin() {

    var ServiceId = OneViewSessionStorage.Get("ServiceId");
    var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

    this.Start = function () {

        try {
            OneViewConsole.Debug("Start start", "SqlitePlugin.Start");

            var EnableAutoUpload = false;

            //if (IsBulkUploadEnabled == true) {
            //    EnableAutoUpload = "true";
            //}
            //else{
            //var EnableAutoUpload = (AutoUploadMetaData != null && AutoUploadMetaData[ServiceId] != undefined) ? AutoUploadMetaData[ServiceId].EnableAutoUpload : false;
            EnableAutoUpload = (OneViewLocalStorage.Get("IsAutoUploadEnabled") != null) ? OneViewLocalStorage.Get("IsAutoUploadEnabled") : false;
            // }
            if (EnableAutoUpload == "true") {

                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();

                OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkStatus), "OneViewAutoUploadPlugin.start");

                if (NetworkStatus.IsNetworkAvailable == true) {
					if (window.OneViewAutoUpload) {
						window.OneViewAutoUpload.Start();
					}
                }
                //else {

                //    if (IsBulkUploadEnabled == true) {
                //        IsBulkUploadEnabled = false;
                //        alert("IN-ER-ALP-007 :: Connection refused, Please Check your internet connectivity and try again");
                //    }
                //}
            }

            OneViewConsole.Debug("Start end", "SqlitePlugin.Start");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "SqlitePlugin.OneViewAutoUploadPlugin", Excep);
        }
    }

    this.Stop = function () {

        try {
            OneViewConsole.Debug("Stop start", "OneViewAutoUploadPlugin.Stop");

			if (window.OneViewAutoUpload) {
				window.OneViewAutoUpload.Stop();
			}

            OneViewConsole.Debug("Stop end", "OneViewAutoUploadPlugin.Stop");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewAutoUploadPlugin.Stop", Excep);
        }
    }
}

function OneviewAndroidLocalStoragePlugin() {

    this.Save = function (Key, Value) {
        try {

            OneViewConsole.Debug("Save Start", "OneviewAndroidLocalStoragePlugin.Save");

            wiSave(Key, Value);

            OneViewConsole.Debug("Save End", "OneviewAndroidLocalStoragePlugin.Save");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneviewAndroidLocalStoragePlugin.Save", Excep);
        }
    }

    this.Get = function (Key) {
        try {

            OneViewConsole.Debug("Get Start", "OneviewAndroidLocalStoragePlugin.Get");

            var Value = window.OneviewAndroidLocalStorage.Get(Key);

            OneViewConsole.Debug("Get End", "OneviewAndroidLocalStoragePlugin.Get");

            return Value;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneviewAndroidLocalStoragePlugin.Get", Excep);
        }
    }


    this.Remove = function (Key) {
        try {

            OneViewConsole.Debug("Remove Start", "OneviewAndroidLocalStoragePlugin.Remove");

            window.OneviewAndroidLocalStorage.Remove(Key);

            OneViewConsole.Debug("Remove End", "OneviewAndroidLocalStoragePlugin.Remove");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneviewAndroidLocalStoragePlugin.Remove", Excep);
        }
    }


}

function OneviewSyncFrameworkPlugin() {

    this.StartService = function () {
        try {

            OneViewConsole.Debug("StartService Start", "OneviewSyncFrameworkPlugin.StartService");

            var IsSuccess = window.OneviewSyncFramework.StartService();


            OneViewConsole.Debug("StartService End", "OneviewSyncFrameworkPlugin.StartService");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneviewSyncFrameworkPlugin.StartService", Excep);
        }
    }

    this.StopService = function () {
        try {

            OneViewConsole.Debug("StartService Start", "OneviewSyncFrameworkPlugin.StartService");

            var IsSuccess = window.OneviewSyncFramework.StopService();

            OneViewConsole.Debug("StartService End", "OneviewSyncFrameworkPlugin.StartService");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneviewSyncFrameworkPlugin.StartService", Excep);
        }
    }
}

function OneviewBarcodeReaderPlugin() {

    var MyInstance = this;
    this.BarcodeReaderEventHandler;

    this.ScanCode = function () {
        try {

            OneViewConsole.Debug("ScanCode Start", "OneviewBarcodeReaderPlugin.ScanCode");

            window.OneviewBarcodeReader.ScanCode();

            OneViewConsole.Debug("ScanCode End", "OneviewBarcodeReaderPlugin.ScanCode");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneviewBarcodeReaderPlugin.ScanCode", Excep);
        }
    }

    this.CallBackListener = function (CallBackInfo) {
        try {

            OneViewConsole.Debug("CallBackListener Start", "OneviewBarcodeReaderPlugin.CallBackListener");

            if (CallBackInfo != null && CallBackInfo != "") {

                CallBackInfo = JSON.parse(CallBackInfo);

                if (CallBackInfo.IsAnyException == false && CallBackInfo.Response != null && CallBackInfo.Response != "") {

                    if (MyInstance.BarcodeReaderEventHandler != undefined && MyInstance.BarcodeReaderEventHandler != "" && MyInstance.BarcodeReaderEventHandler != null) {

                        MyInstance.BarcodeReaderEventHandler(CallBackInfo.Response);
                    }
                }
            }

            OneViewConsole.Debug("CallBackListener End", "OneviewBarcodeReaderPlugin.CallBackListener");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneviewBarcodeReaderPlugin.CallBackListener", Excep);
        }
    }
}

function OneViewNewProbePlugin() {

    this.Scan = function () {
        try {
            OneViewConsole.Debug("Scan start", "OneViewNewProbePlugin.Scan");

            //  alert('OneViewNewProbePlugin');
            //
            //Scan = 1
            var id = 1;//"0x7f070077";
            var IsSuccess = window.NewProbeFacade.Hello();
            //  alert('IsSuccess : ' + IsSuccess);

            var IsSuccess = window.NewProbeFacade.onClickNew(id);
            OneViewConsole.Debug("Scan end", "OneViewNewProbePlugin.Scan");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneViewNewProbePlugin.Scan", Excep);
        }
        finally {
            IsSuccess = null;
        }
    }
}

function OneviewBarcodeScannerPlugin() {

    this.Scan = function () {
        try {
            OneViewConsole.Debug("Scan start", "OneviewBarcodeScannerPlugin.Scan");

            var ReturnMessage = {IsSuccess:false,Text:""};
            cordova.plugins.barcodeScanner.scan(
                   function (result) {
                       if (!result.cancelled) {

                           if (result.format == "QR_CODE") {
                               ReturnMessage.IsSuccess = true;
                               ReturnMessage.Text = result.text;
                               alert("ReturnMessage : " + JSON.stringify(ReturnMessage));
                           }
                       }
                   },
            function (error) {
                ReturnMessage.Text = "Scanning failed: " + error;
                //alert("Scanning failed: " + error);
            }
            );
    

            return ReturnMessage;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Plugin", "OneviewBarcodeScannerPlugin.Scan", Excep);
        }
        finally {
            ReturnMessage = null;
        }
    }
}

