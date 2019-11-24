

function CheckBoxAnswerModeFramework(AttributeId, ControlId) {

    this.Init = function (Scope, DataSourceModelName) {
        try {
            OneViewConsole.Debug("Init Start", "CheckBoxAnswerModeFramework.Init");

            Scope[DataSourceModelName] = [];

            OneViewConsole.Debug("Init End", "CheckBoxAnswerModeFramework.Init");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "CheckBoxAnswerModeFramework.Init", Excep);
        }
        finally {
        }
    }

    this.Load = function (Scope, DataSourceModelName, BandInfo) {
        try {
            OneViewConsole.Debug("Load Start", "CheckBoxAnswerModeFramework.Load");

            for (var BandDetailsId in BandInfo) {
                var Details = BandInfo[BandDetailsId];
                var BandData = { Answer: BandDetailsId, AnswerValue: Details.Name, Selected: false };
                Scope[DataSourceModelName].push(BandData);
            }

            //alert('Scope[DataSourceModelName] : ' + JSON.stringify(Scope[DataSourceModelName]));

            OneViewConsole.Debug("Load End", "CheckBoxAnswerModeFramework.Load");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "CheckBoxAnswerModeFramework.Load", Excep);
        }
        finally {
        }
    }

    this.GetSelectedValueList = function (Scope, DataSourceModelName) {
        try {
            OneViewConsole.Debug("GetSelectedValueList Start", "CheckBoxAnswerModeFramework.GetSelectedValueList");

            var ResponseList = [];

            var DataList = Scope[DataSourceModelName];

            for (var i = 0 ; i < DataList.length ; i++) {
                var Data = DataList[i];
                if (Data.Selected == true) {
                    ResponseList.push(Data.Answer);
                }
            }

            OneViewConsole.Debug("GetSelectedValueList End", "CheckBoxAnswerModeFramework.GetSelectedValueList");

            return ResponseList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "CheckBoxAnswerModeFramework.GetSelectedValueList", Excep);
        }
        finally {
        }
    }

    this.GetSelectedTextList = function (Scope, DataSourceModelName) {
        try {
            OneViewConsole.Debug("GetSelectedTextList Start", "CheckBoxAnswerModeFramework.GetSelectedTextList");

            var ResponseList = [];

            var DataList = Scope[DataSourceModelName];

            for (var i = 0 ; i < DataList.length ; i++) {
                var Data = DataList[i];
                if (Data.Selected == true) {
                    ResponseList.push(Data.AnswerValue);
                }
            }

            OneViewConsole.Debug("GetSelectedTextList End", "CheckBoxAnswerModeFramework.GetSelectedTextList");

            return ResponseList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "CheckBoxAnswerModeFramework.GetSelectedTextList", Excep);
        }
        finally {
        }
    }

    this.Clear = function (Scope, DataSourceModelName) {
        try {
            OneViewConsole.Debug("Load Start", "CheckBoxAnswerModeFramework.Load");           

            if(Scope[DataSourceModelName] !=undefined){
                for (var i = 0; i < Scope[DataSourceModelName].length ;i ++ ) {
                    Scope[DataSourceModelName][i].Selected = false;
                }
            }
            //alert('Scope[DataSourceModelName] : ' + JSON.stringify(Scope[DataSourceModelName]));

            OneViewConsole.Debug("Load End", "CheckBoxAnswerModeFramework.Load");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "CheckBoxAnswerModeFramework.Load", Excep);
        }
        finally {
        }
    }

    this.IsSelectedValueExists = function (Scope, DataSourceModelName , Value) {
        try {
            OneViewConsole.Debug("IsSelectedValueExists Start", "CheckBoxAnswerModeFramework.IsSelectedValueExists");

            var IsExists = false;

            var DataList = Scope[DataSourceModelName];

            for (var i = 0 ; i < DataList.length ; i++) {
                var Data = DataList[i];
                if (Data.Answer == Value && Data.Selected == true) {
                    IsExists = true;
                    break;
                }
            }

            OneViewConsole.Debug("IsSelectedValueExists End", "CheckBoxAnswerModeFramework.IsSelectedValueExists");

            return IsExists;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "CheckBoxAnswerModeFramework.IsSelectedValueExists", Excep);
        }
        finally {
        }
    }

    this.IsSelectedTextExists = function (Scope, DataSourceModelName, Text) {
        try {
            OneViewConsole.Debug("IsSelectedTextExists Start", "CheckBoxAnswerModeFramework.IsSelectedTextExists");

            var IsExists = false;

            var DataList = Scope[DataSourceModelName];

            for (var i = 0 ; i < DataList.length ; i++) {
                var Data = DataList[i];
                if (Data.AnswerValue == Text && Data.Selected == true) {
                    IsExists = true;
                    break;
                }
            }

            OneViewConsole.Debug("IsSelectedTextExists End", "CheckBoxAnswerModeFramework.IsSelectedTextExists");

            return IsExists;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "CheckBoxAnswerModeFramework.IsSelectedTextExists", Excep);
        }
        finally {
        }
    }
    
}
