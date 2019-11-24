

var ResetConfiguration =
    {
        "Configuration": {
            "LastResetDate": '', // 30 days before data will be delete ( -1 means never going to delete )
            "MaxResetInDays": 30, // Once completed and synchronized how many data want to keep in db
            "MinResetInDays": 2, // Once completed and un-synchronized how many data want to keep in db ( to do : It want to change in to days)
        }
    
    }

function ResetData() {
    try {
        OneViewConsole.Debug("ResetData Start", "Framework.ResetData");

        var oDateTime = new DateTime();
        this.ResetCompleteDB = function ()
        {
            try{
                OneViewConsole.Debug("ResetCompleteDB Start", "ResetData.ResetCompleteDB");
           
                var MaxResetInDays = ResetConfiguration.Configuration.MaxResetInDays;
                var MinResetInDays = ResetConfiguration.Configuration.MinResetInDays;
                var CurrentDate = oDateTime.GetDate();
                if (OneViewLocalStorage.Get("LastResetDate") != null) {
                    ResetConfiguration.Configuration.LastResetDate = OneViewLocalStorage.Get("LastResetDate");
                    var Minday = SpiltDate(ResetConfiguration.Configuration.LastResetDate, MinResetInDays);
                    var MaxDay = SpiltDate(ResetConfiguration.Configuration.LastResetDate, MaxResetInDays);

                    OneViewConsole.Debug("ResetCompleteDB End", "ResetData.ResetCompleteDB");

                    if (Minday >= CurrentDate && MaxDay < CurrentDate) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "ResetData.ResetCompleteDB", Excep);
            }

        }

        this.Notify = function ()
        {
            try{
                OneViewConsole.Debug("Notify Start", "ResetData.Notify");

                var MinResetInDays = ResetConfiguration.Configuration.MinResetInDays;
                var CurrentDate = oDateTime.GetDate();
                if (OneViewLocalStorage.Get("LastResetDate") != null) {
                    ResetConfiguration.Configuration.LastResetDate = OneViewLocalStorage.Get("LastResetDate");
                    //ResetConfiguration.Configuration.LastResetDate = '25-09-2014';
                    var lastday = SpiltDate(ResetConfiguration.Configuration.LastResetDate, MinResetInDays);

                    OneViewConsole.Debug("Notify End", "ResetData.Notify");

                    if (lastday == CurrentDate) {
                        return 'true';
                    }
                    else {
                        return 'false';
                    }
                }
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "ResetData.Notify", Excep);
            }
        }

        var SpiltDate = function (CurrentDate, MinResetInDays)
        {
            try {
                OneViewConsole.Debug("SpiltDate Start", "ResetData.SpiltDate");

                var SplitedDate = CurrentDate.split("-");
                var SelectedDateF = SplitedDate[1] + "/" + SplitedDate[0] + "/" + SplitedDate[2];
                var myDate = new Date(SelectedDateF);
                myDate.setDate(myDate.getDate() + MinResetInDays);
                var dd = myDate.getDate();
                var mm = ('0' + (myDate.getMonth() + 1)).slice(-2);
                var y = myDate.getFullYear();
                if (dd < 10) { dd = '0' + dd }
                var lastday = dd + "-" + mm + "-" + y;

                OneViewConsole.Debug("SpiltDate End", "ResetData.SpiltDate");

                return lastday;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "ResetData.SpiltDate", Excep);
            }
        }

        OneViewConsole.Debug("ResetData End", "Framework.ResetData");

    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Framework", "ResetData.ResetData", Excep);
    }
}
