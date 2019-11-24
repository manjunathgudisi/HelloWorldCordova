

function AnswerModeUserControl(ConstructorParam) { //scope, controlId, DataSourceModelName, SearchElementModelName, ControlType) {
    try {
        OneViewConsole.Debug("AnswerModeUserControl Start", "AnswerModeUserControl");

        if (ConstructorParam.Scope != null && ConstructorParam.DataSourceModelName != null && ConstructorParam.DisplayElementModelName != null) {
            var MyInstance = this;
            var MyControl;
            var ControlType = 'OneViewAdvAnswerModeUserControl';
            if (ConstructorParam.ControlType != undefined)
                ControlType = AutoCompleteConstructorParam.ControlType;

            var controlId = ConstructorParam.ControlId;
            var DataSourceModelName = ConstructorParam.DataSourceModelName;
            var DisplayElementModelName = ConstructorParam.DisplayElementModelName;
            var scope = ConstructorParam.Scope;


            if (ControlType == 'OneViewAdvAnswerModeUserControl') {
                try {
                    MyControl = new OneViewAdvAnswerModeUserControl();
                    MyControl.ControlId = controlId;
                    MyControl.oScope = scope;
                    MyControl.DataSourceModelName = DataSourceModelName;
                    MyControl.DisplayElementModelName = DisplayElementModelName; //Display text box not using for search
                    scope[controlId] = MyInstance;
                }
                catch (Excep) {
                    alert('If ControlType ' + Excep)
                }
            }
            else {
                alert('not implemented exception');
            }
        }

        this.AnswerModes = function (TemplateNodes, AttributeNodeId) {
            try {
                OneViewConsole.Debug("AnswerModes Start", "AnswerModeUserControl.AnswerModes");

                    MyControl.AnswerModes(TemplateNodes, AttributeNodeId);

                OneViewConsole.Debug("AnswerModes End", "AnswerModeUserControl.AnswerModes");
            }

            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "AnswerModeUserControl.AnswerModes", Excep);
            }
        }

        this.Set = function (option) {
            try {
                OneViewConsole.Debug("Set Start", "AnswerModeUserControl.Set");

                    MyControl.Set(option)

                OneViewConsole.Debug("Set End", "AnswerModeUserControl.Set");
            }

            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "AnswerModeUserControl.Set", Excep);
            }
        }

        this.GetSelectedValue = function () {
            try {

                OneViewConsole.Debug("GetSelectedValue Start", "AnswerModeUserControl.GetSelectedValue");
                OneViewConsole.Debug("GetSelectedValue End", "AnswerModeUserControl.GetSelectedValue");
                return MyControl.SelectedValue;
            }

            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "AnswerModeUserControl.GetSelectedValue", Excep);
            }
        }

        this.GetSelectedText = function () {
            try {
                OneViewConsole.Debug("GetSelectedText Start", "AnswerModeUserControl.GetSelectedText");
                OneViewConsole.Debug("GetSelectedText End", "AnswerModeUserControl.GetSelectedText");

                return MyControl.SelectedText;
            }

            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "AnswerModeUserControl.GetSelectedText", Excep);
            }
        }

        this.Clear = function () {
            try {
                OneViewConsole.Debug("Clear Start", "AnswerModeUserControl.Clear");
               
                    MyControl.Clear();

                OneViewConsole.Debug("Clear End", "AnswerModeUserControl.Clear");
            }

            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "AnswerModeUserControl.Clear", Excep);
            }
        }

        this.LoadShift = function (Shifts) {
            try {
                OneViewConsole.Debug("LoadShift Start", "AnswerModeUserControl.LoadShift");

                    MyControl.LoadShift(Shifts);

                OneViewConsole.Debug("LoadShift End", "AnswerModeUserControl.LoadShift");
            }

            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "AnswerModeUserControl.LoadShift", Excep);
            }
        }

        this.LoadNCOptions = function () {
            try {
                OneViewConsole.Debug("LoadNCOptions Start", "AnswerModeUserControl.LoadNCOptions");

                MyControl.LoadNCOptions();

                OneViewConsole.Debug("LoadNCOptions End", "AnswerModeUserControl.LoadNCOptions");
            }

            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "AnswerModeUserControl.LoadShift", Excep);
            }
        }

        OneViewConsole.Debug("AnswerModeUserControl End", "AnswerModeUserControl");
    }

    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Framework", "AnswerModeUserControl", Excep);
    }

}

///to do:Band need seperate user control(each control)
function OneViewAdvAnswerModeUserControl() {
    try {
        OneViewConsole.Debug("OneViewAdvAnswerModeUserControl Start", "OneViewAdvAnswerModeUserControl");

        var MyInstance = this;
        this.DataSourceModelName;
        this.DisplayElementModelName;
        this.ControlId = '';
        this.Type = 'OneViewAdvAnswerModeUserControl';
        this.SelectedValue;
        this.SelectedText;
        this.oScope;

        this.AnswerModes = function (TemplateNodes, AttributeNodeId) {
            try {
                OneViewConsole.Debug("AnswerModes Start", "OneViewAdvAnswerModeUserControl.AnswerModes");

                var AnswerModeData = TemplateNodes[AttributeNodeId];
                if (AnswerModeData.AnswerMode[0].Type == 'Band') {
                    var BandDetailsData = AnswerModeData.AnswerMode[0].BandInfo;
                    for (var itrBand in BandDetailsData) {
                        // MyInstance.oScope[MyInstance.DataSourceModelName].push({ Id: itrBand, Name: BandDetailsData[itrBand].Name, ControlId: MyInstance.ControlId, ColourIndex: BandDetailsData[itrBand].ColourIndex, Selected: false })
                        MyInstance.oScope[MyInstance.DataSourceModelName].push({ Id: BandDetailsData[itrBand].Value, Name: BandDetailsData[itrBand].Name, 'AttributeNodeId': AttributeNodeId, ControlId: MyInstance.ControlId, ColourIndex: BandDetailsData[itrBand].ColourIndex, Selected: false })

                    }
                }

                OneViewConsole.Debug("AnswerModes End", "OneViewAdvAnswerModeUserControl.AnswerModes");
            }

            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAnswerModeUserControl.AnswerModes", Excep);
            }
            finally {
                AnswerModeData = null;
                BandDetailsData = null;
            }
        }

        this.Set = function (option) {
            try {
                OneViewConsole.Debug("Set Start", "OneViewAdvAnswerModeUserControl.Set");

                MyInstance.SelectedValue = option.Id;
                MyInstance.SelectedText = option.Name;
                SetSelectedValue(option.Name);

                if (option.Id != "" && option.Id != undefined) {

                    if (MyInstance.oScope[MyInstance.DataSourceModelName] != undefined && MyInstance.oScope[MyInstance.DataSourceModelName] != "" && MyInstance.oScope[MyInstance.DataSourceModelName] != null) {

                        for (var i = 0; i < MyInstance.oScope[MyInstance.DataSourceModelName].length; i++) {
                            var BandId = MyInstance.oScope[MyInstance.DataSourceModelName][i].Id;
                            var BandName = MyInstance.oScope[MyInstance.DataSourceModelName][i].Name;
                            
                            if (option.Id == BandId && option.Name == BandName) {
                                //alert(" Selected : " + option.selected + " BandId : " + BandId + "  BandName : " + BandName + " option.Id : " + option.Id + " option.Name : " + option.Name);
                                if (option.selected != "" && option.selected != undefined) {
                                    //("Id : " + option.Id + "  Name : " + option.Name + " selected : " + option.selected);
                                    MyInstance.oScope[MyInstance.DataSourceModelName][i].Selected = option.selected;
                                }

                            }
                            else if (option.Name == BandName) {//Static band option.Id is undefined showing 
                                if (option.selected != "" && option.selected != undefined) {
                                    //("Id : " + option.Id + "  Name : " + option.Name + " selected : " + option.selected);
                                    MyInstance.oScope[MyInstance.DataSourceModelName][i].Selected = option.selected;
                                }
                            }
                        }
                    }

                }
                OneViewConsole.Debug("Set End", "OneViewAdvAnswerModeUserControl.Set");
            }

            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAnswerModeUserControl.Set", Excep);
            }
        }

        var SetSelectedValue = function (value) {
            try {
                OneViewConsole.Debug("SetSelectedValue Start", "OneViewAdvAnswerModeUserControl.SetSelectedValue");

                var res = MyInstance.DisplayElementModelName.split('.');
                if (res.length == 1) {
                    MyInstance.oScope[MyInstance.DisplayElementModelName] = value;
                }
                else if (res.length == 2) {
                    MyInstance.oScope[res[0]][res[1]] = value;
                }
                else
                    alert('not implemented exception');

                OneViewConsole.Debug("SetSelectedValue End", "OneViewAdvAnswerModeUserControl.SetSelectedValue");
            }

            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAnswerModeUserControl.SetSelectedValue", Excep);
            }
            finally {
                res = null;
            }
        }

        this.Clear = function () {
            try {
                OneViewConsole.Debug("Clear Start", "OneViewAdvAnswerModeUserControl.Clear");

                MyInstance.Set({ Id: '', Name: '', ColourIndex: '' });
                ClearSelectedColour();

                OneViewConsole.Debug("Clear End", "OneViewAdvAnswerModeUserControl.Clear");
            }

            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAnswerModeUserControl.Clear", Excep);
            }
        }

        var ClearSelectedColour = function () {
            try {
                OneViewConsole.Debug("ClearSelectedColour Start", "OneViewAdvAnswerModeUserControl.ClearSelectedColour");

                for (var i = 0; i < MyInstance.oScope[MyInstance.DataSourceModelName].length; i++) {
                    MyInstance.oScope[MyInstance.DataSourceModelName][i].Selected = false;
                }

                OneViewConsole.Debug("ClearSelectedColour End", "OneViewAdvAnswerModeUserControl.ClearSelectedColour");
            }

            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAnswerModeUserControl.ClearSelectedColour", Excep);
            }
        }

        this.LoadShift = function (Shifts) {
            try {
                OneViewConsole.Debug("LoadShift Start", "OneViewAdvAnswerModeUserControl.LoadShift");
                for (var itr = 0; itr < Shifts.length ; itr++) {
                    var IsCurrentShift = false;
                    var DcId = OneViewSessionStorage.Get("DcId");
                    if (DcId != null) {
                        MyInstance.oScope[MyInstance.DataSourceModelName].push({ Id: Shifts[itr].ServerId, Name: Shifts[itr].Name, ControlId: MyInstance.ControlId, Selected: false })
                    }
                    else {
                        IsCurrentShift = CheckIsCurrentShift(Shifts[itr]);
                        if (IsCurrentShift == true) {
                            MyInstance.oScope[MyInstance.DataSourceModelName].push({ Id: Shifts[itr].ServerId, Name: Shifts[itr].Name, ControlId: MyInstance.ControlId, Selected: true })
                            MyInstance.Set(Shifts[itr]);
                        }

                        else {
                            MyInstance.oScope[MyInstance.DataSourceModelName].push({ Id: Shifts[itr].ServerId, Name: Shifts[itr].Name, ControlId: MyInstance.ControlId, Selected: false })
                        }
                    }

                }

                OneViewConsole.Debug("LoadShift End", "OneViewAdvAnswerModeUserControl.LoadShift");
            }

            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAnswerModeUserControl.LoadShift", Excep);
            }
            finally {
                IsCurrentShift = null;
                DcId = null;
            }
        }

        ///Load All Shifts in DC Page
        this.LoadNCOptions = function () {
            try {

                OneViewConsole.Debug("LoadNCOptions start", "OneViewAdvAnswerModeUserControl.LoadNCOptions");

                //Todo:  Name need to replace with globalization (Temporaryly added for CMFT use case)
                MyInstance.oScope[MyInstance.DataSourceModelName].push({ Id: 1, Name: (OneViewSessionStorage.Get("ServiceId") != 4) ? OneViewGlobalization[OneViewGlobalcurrentLanguage].NC : OneViewGlobalization[OneViewGlobalcurrentLanguage].Action, ControlId: 'NCControlId', Selected: true, ColourIndex: 'red' });
                MyInstance.oScope[MyInstance.DataSourceModelName].push({ Id: 2, Name: OneViewGlobalization[OneViewGlobalcurrentLanguage].Observation, ControlId: 'ObservationControlId', Selected: false, ColourIndex: 'red' })

                OneViewConsole.Debug("LoadNCOptions end", "OneViewAdvAnswerModeUserControl.LoadNCOptions");

            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAnswerModeUserControl.LoadNCOptions", Excep);
            }
            finally {
                DefaultMasterDAOObj = null;
                Shifts = null;
                oShift = null;
            }
        }

        var CheckIsCurrentShiftOLD = function (Shift) {

            try {

                OneViewConsole.Debug("CheckIsCurrentShift Start", "OneViewAdvAnswerModeUserControl.CheckIsCurrentShift");

                var IsCurrentShift = false;
                var _oDateTime = new DateTime();
                var EndDate = "";

                var StartDateParts = (Shift.StartDate).split("-");
                var tempStartDateParts = StartDateParts[2].split(" ");
                var StartDateTimeParts = tempStartDateParts[1].split(":");
                var StartDate = new Date((parseInt(tempStartDateParts[0])), (parseInt(StartDateParts[1] - 1)), (parseInt(StartDateParts[0])), (parseInt(StartDateTimeParts[0])), (parseInt(StartDateTimeParts[1])), (parseInt(StartDateTimeParts[2])));

                var EndDateParts = (Shift.EndDate).split("-");
                var tempEndDateParts = StartDateParts[2].split(" ");
                var EndDateTimeParts = tempStartDateParts[1].split(":");



                if (Shift.EndDate != "" || Shift.EndDate != undefined || Shift.EndDate != null || Shift.EndDate != " ") {
                    EndDate = new Date((parseInt(tempEndDateParts[0])), (parseInt(EndDateParts[1] - 1)), (parseInt(EndDateParts[0])), (parseInt(EndDateTimeParts[0])), (parseInt(EndDateTimeParts[1])), (parseInt(EndDateTimeParts[2])));
                }


                var appendedDate = "2013-11-02";
                var append = _oDateTime.GetDate();
                var FormattedDate1 = appendedDate + " " + Shift.StartTime;

                var startParts = (Shift.StartTime).split(":");
                var endParts = (Shift.EndTime).split(":");


                var StartTime = new Date(FormattedDate1);
                var CurrentStringDate = _oDateTime.GetDateAndTime();

                /// alert("CurrentStringDate" + CurrentStringDate);

                var currentDateParts = CurrentStringDate.split("-");
                var tempParts = currentDateParts[2].split(" ");
                var currentTimeParts = tempParts[1].split(":");
                var CurrentDate = new Date((parseInt(tempParts[0])), (parseInt(currentDateParts[1] - 1)), (parseInt(currentDateParts[0])), (parseInt(currentTimeParts[0])), (parseInt(currentTimeParts[1])), (parseInt(currentTimeParts[2])));






                var CurrentStringTime = _oDateTime.GetTime();


                ///  var CurrentDate = new Date(tempParts[0], currentDateParts[0], (currentDateParts[1] - 1), currentTimeParts[0], currentTimeParts[1], currentTimeParts[2], currentTimeParts[2]);
                /// alert("CurrentDate =" + CurrentDate);

                alert("StartDate =" + StartDate);
                alert("CurrentDate =" + CurrentDate);
                alert("EndDate =" + EndDate);

                if (StartDate <= CurrentDate && (CurrentDate <= EndDate || EndDate == "" || EndDate == undefined || EndDate == "Invalid Date"))
                    alert('Ok  4444');


                if (startParts[0] > 12 && endParts[0] < 12) {
                    appendedDate = "2013-11-03";
                }
                var FormattedDate2 = appendedDate + " " + Shift.EndTime;
                var EndTime = new Date(FormattedDate2);

                var FormattedDate3 = appendedDate + " " + CurrentStringTime;
                var CurrentTime = new Date(FormattedDate3);





                if ((StartDate <= CurrentDate && (CurrentDate <= EndDate || EndDate == "" || EndDate == undefined || EndDate == "Invalid Date")) && (StartTime.getTime() <= CurrentTime.getTime() && CurrentTime.getTime() <= EndTime.getTime())) {
                    IsCurrentShift = true;
                }

                OneViewConsole.Debug("CheckIsCurrentShift End", "OneViewAdvAnswerModeUserControl.CheckIsCurrentShift");

                return IsCurrentShift;

            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAnswerModeUserControl.CheckIsCurrentShift", Excep);
            }
            finally {
                IsCurrentShift = null;
                _oDateTime = null;
                EndDate = null;

                StartDateParts = null;
                tempStartDateParts = null;
                StartDateTimeParts = null;
                StartDate = null;
                EndDateParts = null;
                tempEndDateParts = null;
                EndDateTimeParts = null;
                appendedDate = null;
                append = null;
                FormattedDate1 = null;
                startParts = null;
                endParts = null;
                StartTime = null;
                CurrentStringDate = null;
                currentDateParts = null;
                tempParts = null;
                currentTimeParts = null;
                CurrentDate = null;
                CurrentStringTime = null;
                FormattedDate2 = null;
                EndTime = null;
                FormattedDate3 = null;
                CurrentTime = null;
            }
        }

        var CheckIsCurrentShift = function (Shift) {

            try {

                OneViewConsole.Debug("CheckIsCurrentShift Start", "OneViewAdvAnswerModeUserControl.CheckIsCurrentShift");

                var IsCurrentShift = false;
                var _oDateTime = new DateTime();
                var EndDate = "";

                /////StartDate
                var StartDateParts = (Shift.StartDate).split("-");
                var tempStartDateParts = StartDateParts[2].split(" ");
                var StartDateTimeParts = tempStartDateParts[1].split(":");
                var StartDate = new Date((parseInt(tempStartDateParts[0])), (parseInt(StartDateParts[1] - 1)), (parseInt(StartDateParts[0])), (parseInt(StartDateTimeParts[0])), (parseInt(StartDateTimeParts[1])), (parseInt(StartDateTimeParts[2])));

                /////EndDate
                var EndDateParts = (Shift.EndDate).split("-");
                var tempEndDateParts = StartDateParts[2].split(" ");
                var EndDateTimeParts = tempStartDateParts[1].split(":");
                if (Shift.EndDate != "" || Shift.EndDate != undefined || Shift.EndDate != null || Shift.EndDate != " ") {
                    EndDate = new Date((parseInt(tempEndDateParts[0])), (parseInt(EndDateParts[1] - 1)), (parseInt(EndDateParts[0])), (parseInt(EndDateTimeParts[0])), (parseInt(EndDateTimeParts[1])), (parseInt(EndDateTimeParts[2])));
                }

                /////CurrentDate
                var CurrentStringDate = _oDateTime.GetDateAndTime();
                var currentDateParts = CurrentStringDate.split("-");
                var tempParts = currentDateParts[2].split(" ");
                var currentTimeParts = tempParts[1].split(":");
                var CurrentDate = new Date((parseInt(tempParts[0])), (parseInt(currentDateParts[1] - 1)), (parseInt(currentDateParts[0])), (parseInt(currentTimeParts[0])), (parseInt(currentTimeParts[1])), (parseInt(currentTimeParts[2])));


                var CurrentStringTime = _oDateTime.GetTime();
                var startParts = (Shift.StartTime).split(":");
                var currentParts = CurrentStringTime.split(":");
                var endParts = (Shift.EndTime).split(":");



                //var StartTime = (parseInt(startParts[0]) * 3600 + parseInt(startParts[1]) * 60 + parseInt(startParts[2]));
                //var CurrentTime = (parseInt(currentParts[0]) * 3600 + parseInt(currentParts[1]) * 60 + parseInt(currentParts[2]));
                //var EndTime = (parseInt(endParts[0]) * 3600 + parseInt(endParts[1]) * 60 + parseInt(endParts[2]));

                var StartTime = ((parseInt(startParts[0] * 3600)) + (parseInt(startParts[1] * 60)) + (parseInt(startParts[2])));
                var CurrentTime = ((parseInt(currentParts[0] * 3600)) + (parseInt(currentParts[1] * 60)) + (parseInt(currentParts[2])));
                var EndTime = ((parseInt(endParts[0] * 3600)) + (parseInt(endParts[1] * 60)) + parseInt(endParts[2]));



                if (StartDate <= CurrentDate && (CurrentDate <= EndDate || EndDate == "" || EndDate == undefined || EndDate == "Invalid Date")) {

                    ///case 1-  StartTime > EndTime (20 > 02 )
                    if (StartTime > EndTime) {
                        ////case -A1 ////20 <= 21, 21 <= 02
                        if (StartTime <= CurrentTime) {
                            // end = '23:59:59';
                            EndTime = (parseInt(23) * 3600 + parseInt(59) * 60 + parseInt(59));


                            if (CurrentTime <= EndTime)
                                IsCurrentShift = true;  //////// return true;

                        }
                            ////case -A2 ////20 <= 01, 01 <= 02
                        else {
                            ///start = "00:00:00";
                            StartTime = parseInt('0');
                            if (StartTime <= CurrentTime && CurrentTime <= EndTime)
                                IsCurrentShift = true;    //////// return true;
                        }
                    }

                        ///case 2-  StartTime < EndTime (08 > 14 )    
                    else if (StartTime <= CurrentTime && CurrentTime <= EndTime) {
                        IsCurrentShift = true;             //////// return true;
                    }
                }

                OneViewConsole.Debug("CheckIsCurrentShift End", "OneViewAdvAnswerModeUserControl.CheckIsCurrentShift");

                return IsCurrentShift;

            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAnswerModeUserControl.CheckIsCurrentShift", Excep);
            }
            finally {
                IsCurrentShift = null;
                _oDateTime = null;
                EndDate = null;
                StartDateParts = null;
                tempStartDateParts = null;
                StartDateTimeParts = null;
                StartDate = null;
                EndDateParts = null;
                tempEndDateParts = null;
                EndDateTimeParts = null;
                CurrentStringDate = null;
                currentDateParts = null;
                tempParts = null;
                currentTimeParts = null;
                CurrentDate = null;
                CurrentStringTime = null;
                startParts = null;
                currentParts = null;
                endParts = null;
                StartTime = null;
                CurrentTime = null;
                EndTime = null;
            }

        }


        OneViewConsole.Debug("OneViewAdvAnswerModeUserControl End", "OneViewAdvAnswerModeUserControl");
    }

    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAnswerModeUserControl", Excep);
    }

}

function BandSelection(option) {
    try {
        OneViewConsole.Debug("BandSelection Start", "OneViewAdvAnswerModeUserControl.BandSelection");

        //alert('option' + JSON.stringify(option));
        NCSelectedAttributeId = option.AttributeNodeId;
        //if (OneViewSessionStorage.Get("ServiceName") == "Food Safety Service") {
        if (OneViewGlobalServiceTypeEnum[OneViewGlobalServiceType] == 1) {

            if (OneViewSessionStorage.Get("PageID") == 'newdc') {

                LoadFacilty(option);
            }
            if (OneViewSessionStorage.Get("TemplateId") == 44) {
                SetSelectedAttribute(option);
            }
            else if (OneViewSessionStorage.Get("TemplateId") == 483) {
                IncidentReportHandler(option);
            }
            else if (OneViewSessionStorage.Get("TemplateId") == 15629) {
                FoodSafetyShiftReportRev2Handler(option);
            }
            else if (OneViewSessionStorage.Get("TemplateId") == 442) {
                ChillerFreezerHandler(option);
            }
            else if (OneViewSessionStorage.Get("TemplateId") == 535) {
                PotTrolleyDishwashHandler(option);
                TestTypeHandler(option);
                ThermoLabelHandler(option);
            }
            else if (OneViewSessionStorage.Get("TemplateId") == 620) {
                MediaPreparationReportHandler(option);
            }
            else if (OneViewSessionStorage.Get("TemplateId") == 591) { //CurrentStockofLaboratoryMediaHandler
                CurrentStockofLaboratoryMediaHandler(option);
            }
                //else if (OneViewSessionStorage.Get("TemplateId") == 738) { //Yearly Verification Certificate
                //    YearlyVerificationCertificateHandler(option);
                //}
            else if (OneViewSessionStorage.Get("TemplateId") == 575) { // Master List of Microbiology Laboratory Equipment Calibration and Maintenance Status- Rev 1 - (ML-REF- 007)
                MasterListofMLECalibrationandMaintenanceStatusHandler(option);
            }
            else if (OneViewSessionStorage.Get("TemplateId") == 1369) { // Sampling Sheet And Food Analysis
                SamplingSheetAndFoodAnalysisHandler(option);
            }
            else if (OneViewSessionStorage.Get("TemplateId") == 1529) { // Sampling Sheet And Water Analysis
                SamplingSheetAndWaterAnalysisHandler(option);
            }
            else if (OneViewSessionStorage.Get("TemplateId") == 1655) { // Sampling Sheet And Ice Analysis
                SamplingSheetAndIceAnalysisHandler(option);
            }
            else if (OneViewSessionStorage.Get("TemplateId") == 1778) { // Sampling Sheet And Air Analysis
                SamplingSheetAndAirHandler(option);
            }
            else if (OneViewSessionStorage.Get("TemplateId") == 1808) { // Sampling Sheet And Hands Swab Analysis
                SamplingSheetAndHandsSwabHandler(option);
            }
            else if (OneViewSessionStorage.Get("TemplateId") == 1875) { // Sampling Sheet And Linen Analysis
                SamplingSheetAndLinenOrEquipmentSwabHandler(option);
            }
            else if (OneViewSessionStorage.Get("TemplateId") == 1837) { // Sampling Sheet And Equipment swab Analysis
                SamplingSheetAndLinenOrEquipmentSwabHandler(option);
            }
            else if (OneViewSessionStorage.Get("TemplateId") == 293) { // Temperature Verification of Aircraft Loading
                AircraftLoadingHandler(option);
            }
            else if (OneViewSessionStorage.Get("TemplateId") == 1917) { // Allergen Sample Collection And Report Format - Rev 0 - (HYG- 101)
                SamplingSheetAndAllergenHandler(option);
            }
            else if (OneViewSessionStorage.Get("TemplateId") == 3115) { // Airline Complaint Sample First Evaluation Report
                AirlineComplaintSampleHandler(option);
            }
            else if (OneViewSessionStorage.Get("TemplateId") == 609) { // Laminar Air Flow Monitoring-Rev 1 - (ML-FRM- 010)
                LaminarAirFlowHandler(option);
            }
            else if (OneViewSessionStorage.Get("TemplateId") == 923) { // Monthly Verification of Probe Thermometer - Rev 0 - HYG- 093
                MonthlyVerificationofProbeThermometerHandler(option);
            }
            else if (OneViewSessionStorage.Get("TemplateId") == 738) { //Yearly Verification Certificate
                YearlyVerificationofProbeThermometerHandler(option);
            }
            else if (OneViewSessionStorage.Get("TemplateId") == 937) { // Monthly Verification of IR Thermometer - Rev 0 - HYG- 094
                MonthlyVerificationofIRThermometerHandler(option);
            }
        // scope[option.ControlId].Set(option);
        }
        //else if (OneViewSessionStorage.Get("ServiceName") == "CMFT"){
        else if (OneViewGlobalServiceTypeEnum[OneViewGlobalServiceType] == 4) {
            if (OneViewSessionStorage.Get("PageID") == 'newdc') {

                LoadFacilty(option);
            }
            if (OneViewSessionStorage.Get("TemplateId") == 3) {
                //alert('option from answer mode :' + JSON.stringify(option));
                //PreAcceptanceQuestionnaireHandler(option);                
            }

            //Pre Acceptance Composition Analysis
           else if (OneViewSessionStorage.Get("TemplateId") == 91) {
                PreAcceptanceCompositionAnalysisHandler(option);
            }

            //PreAcceptanceLocalWasteStorage
           else if (OneViewSessionStorage.Get("TemplateId") == 207) {
               // PreAcceptanceLocalWasteStorageHandler(option);
            }
            //
           else if (OneViewSessionStorage.Get("TemplateId") == 743) {
                SingleDepartmentQuestionnaireHandler(option);
            }
           else if (OneViewSessionStorage.Get("TemplateId") == 830) {
                SingleDepartmentCompositionAnalysisHandler(option);
           }
           else if (OneViewSessionStorage.Get("TemplateId") == 946) {
               SingleDepartmentLocalWasteStorageHandler(option);
           }
           else if (OneViewSessionStorage.Get("TemplateId") == 1462) {
               IncidentInvestigationElementQuestionnaireHandler(option);
           }
           else if (OneViewSessionStorage.Get("TemplateId") == 1554) {
               IncidentInvestigationElemenLocalWasteStorageHandler(option);
           }
           else if (OneViewSessionStorage.Get("TemplateId") == 2070) {
               LWSEQuestionnaireHandler(option);
           }
           else if (OneViewSessionStorage.Get("TemplateId") == 2155) {
               LWSELocalWasteStorageHandler(option);
           }
           else if (OneViewSessionStorage.Get("TemplateId") == 2671) {
               SWSPAEQuestionnaireHandler(option);
           }
           else if (OneViewSessionStorage.Get("TemplateId") == 2756) {
               SingleWasteLocalWasteStorageHandler(option);
           } 
            else if (OneViewSessionStorage.Get("TemplateId") == 3271) {
                //PreAcceptanceCompositionAnalysisHandler_3271(option);
            }
            else if (OneViewSessionStorage.Get("TemplateId") == 4250) {
                BulkWasteElementHandler(option);
            }
        }
        //else if (OneViewSessionStorage.Get("ServiceName") == "TCFMService") {
        else if (OneViewGlobalServiceTypeEnum[OneViewGlobalServiceType] == 5) {
            if (OneViewSessionStorage.Get("PageID") == 'newdc') {

                LoadFacilty(option);
            }
     
            if (OneViewSessionStorage.Get("TemplateId") == 3) {               
                TescoTraningHandler(option);
            }
            else if (OneViewSessionStorage.Get("TemplateId") == 160) {

                TravisPerkinsTraningModuleHandler(option);
            }
        }
        else if (OneViewGlobalServiceTypeEnum[OneViewGlobalServiceType] == 10 || OneViewGlobalServiceTypeEnum[OneViewGlobalServiceType] == 11) {
            if (OneViewSessionStorage.Get("TemplateId") == 2) {
                AjmanIncidentReportHandler(option);
            }
        }
        else if (OneViewGlobalServiceTypeEnum[OneViewGlobalServiceType] == 13) {
            if (OneViewSessionStorage.Get("TemplateId") == 625) {
                HydeHousingIncidentReportHandler(option);
            }
        }
        //else if (OneViewGlobalServiceTypeEnum[OneViewGlobalServiceType] == 24) {
        //    if (OneViewSessionStorage.Get("TemplateId") == 3) {
        //        HnSSIncidentReportActionHandler(option);
        //    }
        //}

        //alert(OneViewSessionStorage.Get("ServiceName"))
            if (option.Selected == true) {
                scope[option.ControlId].Set(option);
            }
            else if (option.Selected == false) {
                scope[option.ControlId].Clear();
            }
        

        OneViewConsole.Debug("BandSelection End", "OneViewAdvAnswerModeUserControl.BandSelection");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAnswerModeUserControl.BandSelection", Excep);
    }
}

function LoadFacilty(option)
{
    try {
        OneViewConsole.Debug("LoadFacilty BandSelection Start", "OneViewAdvAnswerModeUserControl.BandSelection");
        if (option.Id == DATEntityType.RCOMaster_Kitchen) {
            scope.LoadDDL(-1, option.Id);
        }
        else if (option.Id == DATEntityType.RCOMaster_Supplier) {
            scope.LoadDDL(-1, option.Id);
        }
        else if (option.Id == DATEntityType.RCOMaster_FandBOutLet) {
            scope.LoadDDL(-1, option.Id);
        }
        else if (option.Id == DATEntityType.RCOMaster_Location) {
            scope.LoadDDL(-1, option.Id);
        }
        else if (option.Id == DATEntityType.RCOMaster_DIA_Non_DIA) {
            scope.LoadDDL(-1, option.Id);
        }
        else if (option.Id == DATEntityType.RCOMaster_AccomodationLocation) {
            scope.LoadDDL(-1, option.Id);
        }
        else if (option.Id == DATEntityType.RCOMaster_SamplingPoint) {
            scope.LoadDDL(-1, option.Id);
        }
        else if (option.Id == DATEntityType.RCOMaster_Section) {
            scope.LoadDDL(-1, option.Id);
        }
        else if (option.Id == DATEntityType.RCOMaster_Department) {
            scope.LoadDDL(-1, option.Id);
        }
        else if (option.Id == DATEntityType.RCOMaster_Flight) {
            scope.LoadDDL(-1, option.Id);
        }
        else if (option.Id == DATEntityType.RCOMaster_CleaningType) {
            scope.LoadDDL(-1, option.Id);
        }
        else if (option.Id == DATEntityType.RCOMaster_ChemicalSupplier) {
            scope.LoadDDL(-1, option.Id);
        }
        else if (option.Id == 205) {
            scope.LoadDDL(-1, option.Id);
        }
        //scope.LoadDDL(-1, option.Id);
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAnswerModeUserControl.BandSelection", Excep);
    }
}

function SetSelectedAttribute(option) {
    try {
        OneViewConsole.Debug("BandSelection Start", "OneViewAdvAnswerModeUserControl.BandSelection");
             
        if (option.ControlId == "chkVehicleApprovalTag") {          
            if (option.Id == 1 && option.Selected == true) {
                scope.ApprovalTagNo = true;
            }
            else {
                scope.ApprovalTagNo = false;
                scope.NewDCModel.txtApprovalTagNo = "";
            }
        }        
        else if (option.ControlId == "chkGoodsType") {            
            scope.GoodsTypeId = option.Id;
            scope["chkFrozenType"].Clear();
            if (option.Id == 4 && option.Selected == true) {
                scope.FrozenState = true;
            }
            else {                              
                scope.FrozenState = false;                
            }            
        }
        else if (option.ControlId == "chkProductStatus") {            
            if (option.Id == 22 && option.Selected == true) {
                scope.SNCNo = true;               
            }
            else {
                scope.SNCNo = false;
                scope.NewDCModel.txtSNCNo = "";               
            }
        }
        else if (option.ControlId == "chkProductionDateMode") {
            if (option.Id == 55 && option.Selected == true) {
                scope.PdDate = true;
                scope.PdMonthAndYear = false;
            }
            else {
                scope.PdDate = false;
                scope.NewDCModel.DTDATEControlId = "";              
            }
            if (option.Id == 56 && option.Selected == true) {
                scope.PdMonthAndYear = true;
                scope.PdDate = false;
            }
            else {                
                scope.PdMonthAndYear = false;
                scope.NewDCModel.PdDateMonthAndYearControlId = "";
            }
            
        }
        else if (option.ControlId == "chkExpiryDateMode") {
            if (option.Id == 57 && option.Selected == true) {
                scope.EXDate = true;
                scope.EXUsedBy = false;
                scope.EXUsedBefore = false;
                scope.NewDCModel.EXDateUsedByMonthAndYearControlId = "";
                scope.NewDCModel.EXUsedBeforeControlId = "";
            }
            else if (option.Id == 58 && option.Selected == true) {
                scope.EXDate = false;
                scope.EXUsedBy = true;
                scope.EXUsedBefore = false;
                scope.NewDCModel.EXDATEControlId = "";
                scope.NewDCModel.EXUsedBeforeControlId = "";
            }
            else if (option.Id == 59 && option.Selected == true) {
                scope.EXDate = false;
                scope.EXUsedBy = false;
                scope.EXUsedBefore = true;
                scope.NewDCModel.EXDATEControlId = "";
                scope.NewDCModel.EXDateUsedByMonthAndYearControlId = "";
            }
            else {
                scope.EXDate = false;
                scope.EXUsedBy = false;
                scope.EXUsedBefore = false;
                scope.NewDCModel.EXDATEControlId = "";
                scope.NewDCModel.EXDateUsedByMonthAndYearControlId = "";
                scope.NewDCModel.EXUsedBeforeControlId = "";
            }          
            
        }

        OneViewConsole.Debug("BandSelection End", "OneViewAdvAnswerModeUserControl.BandSelection");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAnswerModeUserControl.BandSelection", Excep);
    }
}

function IncidentReportHandler(option) {

    try {
        OneViewConsole.Debug("BandSelection Start", "OneViewAdvAnswerModeUserControl.BandSelection");
       
        if (option.ControlId == "chkSourceControlId") {
            if (option.Id == 50 && option.Selected == true) {
                scope.InHouse = true;
                scope.Supplier = false;
            }
            else if (option.Id == 51 && option.Selected == true) {
                scope.InHouse = false;
                scope.Supplier = true;
            }
            else {
                scope.InHouse = false;
                scope.Supplier = false;
                //Supplier
                scope.NewDCModel.txtComplaintProductControlId = "";
                scope.NewDCModel.txtBrandControlId = "";
                scope.NewDCModel.txtBatchControlId = "";
                scope.NewDCModel.DTPdDateControlIdControlId = "";
                scope.NewDCModel.DTExDateControlIdControlId = "";
                scope["AddlSupplierControlId"].Clear();
             
                //InHouse
                scope.NewDCModel.txtItemCodeControlId = "";
                scope.NewDCModel.txtProductDescriptionControlId = "";
                scope["AddlClassControlId"].Clear();
                scope["chkIsBulkDishingControlId"].Clear();
                
            }
        }

        else if (option.ControlId == "chkCoorectiveAction") {
            if (option.Id == 1 && option.Selected == true) {
                scope.CustomCorrectiveAction = true;              
            }
            else {
                scope.CustomCorrectiveAction = false;
                scope.CustomCorrectiveActionList = [];
                scope.PreCustomCorrectiveActionList = [];
            }
        }

        else if (option.ControlId == "chkIsSampleNumberControlId") {
            if (option.Id == 1 && option.Selected == true) {
                var LoginUserId = OneViewSessionStorage.Get("LoginUserId");                             
                var DeviceId = OneViewLocalStorage.Get("DeviceId");
                var ClientDocId = OneViewLocalStorage.Get("ClientDocId");
                if (ClientDocId == null) {
                    OneViewLocalStorage.Save("ClientDocId", 1);
                    ClientDocId = OneViewLocalStorage.Get("ClientDocId");
                }
                //scope.NewDCModel.txtSampleNumberControlId = "SN_" + DeviceId + "_" + LoginUserId + "_" + ClientDocId;              
                var oOneViewDCMessageWithDCCriteriaVariable = {
                    MessageKey: "$MasterColumn$_$Month$$Day$_$DeviceId$_$ClientDocId$",
                    VariablesFinalJavaScriptEquation: {
                        "$MasterColumn$": "GetRCOMaster('AddlLocationControlId', 'Column1')",
                        "$Month$": "new DateTime().GetMonth()",
                        "$Day$": "new DateTime().GetYear()",
                        "$DeviceId$": "GetOneViewDeviceId()",
                        "$ClientDocId$": "GetOneViewClientDocId()"
                    }
                }              
                scope.NewDCModel.txtSampleNumberControlId = oOneViewDCMessageWithDCCriteriaVariableEvaluationComponent.Evaluvate(oOneViewDCMessageWithDCCriteriaVariable);
            }
            else {
                scope.NewDCModel.txtSampleNumberControlId = "";
            }
        }

        OneViewConsole.Debug("BandSelection End", "OneViewAdvAnswerModeUserControl.BandSelection");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAnswerModeUserControl.BandSelection", Excep);
    }
}

function FoodSafetyShiftReportRev2Handler(option) {

    try {
        OneViewConsole.Debug("BandSelection Start", "OneViewAdvAnswerModeUserControl.BandSelection");

        if (option.ControlId == "chkSourceControlId") {
            if (option.Id == 50 && option.Selected == true) {
                scope.InHouse = true;
                scope.Supplier = false;
            }
            else if (option.Id == 51 && option.Selected == true) {
                scope.InHouse = false;
                scope.Supplier = true;
            }
            else {
                scope.InHouse = false;
                scope.Supplier = false;
                //Supplier
                scope.NewDCModel.txtComplaintProductControlId = "";
                scope.NewDCModel.txtBrandControlId = "";
                scope.NewDCModel.txtBatchControlId = "";
                scope.NewDCModel.DTPdDateControlIdControlId = "";
                scope.NewDCModel.DTExDateControlIdControlId = "";
                scope["AddlSupplierControlId"].Clear();

                //InHouse
                scope.NewDCModel.txtItemCodeControlId = "";
                scope.NewDCModel.txtProductDescriptionControlId = "";
                scope["AddlClassControlId"].Clear();
                scope["chkIsBulkDishingControlId"].Clear();

            }
        }

        else if (option.ControlId == "chkCoorectiveAction") {
            if (option.Id == 302 && option.Selected == true) {
                scope.CustomCorrectiveAction = true;
            }
            else {
                scope.CustomCorrectiveAction = false;
                scope.CustomCorrectiveActionList = [];
                scope.PreCustomCorrectiveActionList = [];
            }
        }

        else if (option.ControlId == "chkIsSampleNumberControlId") {
            if (option.Id == 1 && option.Selected == true) {
                var LoginUserId = OneViewSessionStorage.Get("LoginUserId");
                var DeviceId = OneViewLocalStorage.Get("DeviceId");
                var ClientDocId = OneViewLocalStorage.Get("ClientDocId");
                if (ClientDocId == null) {
                    OneViewLocalStorage.Save("ClientDocId", 1);
                    ClientDocId = OneViewLocalStorage.Get("ClientDocId");
                }
                //scope.NewDCModel.txtSampleNumberControlId = "SN_" + DeviceId + "_" + LoginUserId + "_" + ClientDocId;              
                var oOneViewDCMessageWithDCCriteriaVariable = {
                    MessageKey: "$MasterColumn$_$Month$$Day$_$DeviceId$_$ClientDocId$",
                    VariablesFinalJavaScriptEquation: {
                        "$MasterColumn$": "GetRCOMaster('AddlLocationControlId', 'Column1')",
                        "$Month$": "new DateTime().GetMonth()",
                        "$Day$": "new DateTime().GetYear()",
                        "$DeviceId$": "GetOneViewDeviceId()",
                        "$ClientDocId$": "GetOneViewClientDocId()"
                    }
                }
                scope.NewDCModel.txtSampleNumberControlId = oOneViewDCMessageWithDCCriteriaVariableEvaluationComponent.Evaluvate(oOneViewDCMessageWithDCCriteriaVariable);
                scope.DivSampleNumber = true;
            }
            else {
                scope.DivSampleNumber = false;
                scope.NewDCModel.txtSampleNumberControlId = "";
            }
        }

        OneViewConsole.Debug("BandSelection End", "OneViewAdvAnswerModeUserControl.BandSelection");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAnswerModeUserControl.BandSelection", Excep);
    }
}

function ChillerFreezerHandler(option) {
    try {
        OneViewConsole.Debug("BandSelection Start", "OneViewAdvAnswerModeUserControl.BandSelection");

        if (option.ControlId == "chkType") {
            if (option.Id == 18 && option.Selected == true) {
                scope.MachineChiller = true;
                scope.MachineFreezer = false;
                scope.NewDCModel.AddlMachineFreezer = "";
                scope["AddlMachineFreezer"].Clear();
            }
            else if (option.Id == 19 && option.Selected == true) {
                scope.MachineChiller = false;
                scope.MachineFreezer = true;
                scope.NewDCModel.AddlMachineChiller = "";
                scope["AddlMachineChiller"].Clear();
            }
            else {
                scope.MachineChiller = false;
                scope.MachineFreezer = false;
                scope.NewDCModel.AddlMachineChiller = "";
                scope["AddlMachineChiller"].Clear();
                scope.NewDCModel.AddlMachineFreezer = "";
                scope["AddlMachineFreezer"].Clear();
            }
        }          
   

        OneViewConsole.Debug("BandSelection End", "OneViewAdvAnswerModeUserControl.BandSelection");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAnswerModeUserControl.BandSelection", Excep);
    }
}

function PotTrolleyDishwashHandler(option) {
    try {
        OneViewConsole.Debug("PotTrolleyDishwashHandler Start", "AnswerMode.PotTrolleyDishwashHandler");

        if (option.ControlId == "chkWashType") {
            if (option.Id == 60 && option.Selected == true) { //PotWash
                scope.PotMachineReadOnly = true;
                scope.TrolleyMachineReadOnly = false;
                scope.DishwashMachineReadOnly = false;
                scope["AddlTrolleyMachineControlId"].Clear();
                scope["AddlDishwashMachineControlId"].Clear();
                scope.NewDCModel.AddlPotMachineControlId = "";
                scope["chkTestType"].Clear();
                scope["chkThermoLabel"].Clear();
                scope.NewDCModel.txtQuadTestControlId = "";
                scope.ThermoLabelReadOnly = false;
                scope.QuadTestReadOnly = false;
                IntializeTestType_PotTrolleyDishwash();
                scope.FinalRinseHide = false;
                scope.NewDCModel.txtChlorineTestControlId = "";
                scope.ChlorineTestReadOnly = false;
                scope.NewDCModel.txtFinalRinseControlId = "";
            }
            else if (option.Id == 60 && option.Selected == false) { //PotWash
                scope.PotMachineReadOnly = false;
                scope.TrolleyMachineReadOnly = false;
                scope.DishwashMachineReadOnly = false;
                scope["AddlTrolleyMachineControlId"].Clear();
                scope["AddlDishwashMachineControlId"].Clear();
                scope["AddlPotMachineControlId"].Clear();
                scope.NewDCModel.AddlPotMachineControlId = "";
                scope["chkTestType"].Clear();
                scope["chkThermoLabel"].Clear();
                scope.NewDCModel.txtQuadTestControlId = "";
                scope.ThermoLabelReadOnly = false;
                scope.QuadTestReadOnly = false;
                IntializeTestType_PotTrolleyDishwash();
                scope.FinalRinseHide = false;
                scope.NewDCModel.txtChlorineTestControlId = "";
                scope.ChlorineTestReadOnly = false;
                scope.NewDCModel.txtFinalRinseControlId = "";
                
            }
            else if (option.Id == 61 && option.Selected == true) {//TrolleyWash
                scope.PotMachineReadOnly = false;
                scope.TrolleyMachineReadOnly = true;
                scope.DishwashMachineReadOnly = false;
                scope["AddlPotMachineControlId"].Clear();
                scope["AddlDishwashMachineControlId"].Clear();
                scope.NewDCModel.AddlTrolleyMachineControlId = "";
                scope["chkTestType"].Clear();
                scope["chkThermoLabel"].Clear();
                scope.NewDCModel.txtQuadTestControlId = "";
                scope.ThermoLabelReadOnly = false;
                scope.QuadTestReadOnly = false;
                IntializeTestType_PotTrolleyDishwash();
                scope.FinalRinseHide = false;
                scope.NewDCModel.txtChlorineTestControlId = "";
                scope.ChlorineTestReadOnly = false;
                scope.NewDCModel.txtFinalRinseControlId = "";
            }
            else if (option.Id == 61 && option.Selected == false) {//TrolleyWash
                scope.PotMachineReadOnly = false;
                scope.TrolleyMachineReadOnly = false;
                scope.DishwashMachineReadOnly = false;
                scope["AddlPotMachineControlId"].Clear();
                scope["AddlDishwashMachineControlId"].Clear();
                scope["AddlTrolleyMachineControlId"].Clear();
                scope.NewDCModel.AddlTrolleyMachineControlId = "";
                scope["chkTestType"].Clear();
                scope["chkThermoLabel"].Clear();
                scope.NewDCModel.txtQuadTestControlId = "";
                scope.ThermoLabelReadOnly = false;
                scope.QuadTestReadOnly = false;
                IntializeTestType_PotTrolleyDishwash();
                scope.FinalRinseHide = false;
                scope.NewDCModel.txtChlorineTestControlId = "";
                scope.ChlorineTestReadOnly = false;
                scope.NewDCModel.txtFinalRinseControlId = "";
            }
            else if (option.Id == 62 && option.Selected == true) {//DishWash
                scope.PotMachineReadOnly = false;
                scope.TrolleyMachineReadOnly = false;
                scope.DishwashMachineReadOnly = true;
                scope["AddlPotMachineControlId"].Clear();
                scope["AddlTrolleyMachineControlId"].Clear();
                scope.NewDCModel.AddlDishwashMachineControlId = "";
                scope["chkTestType"].Clear();
                scope["chkThermoLabel"].Clear();
                scope.NewDCModel.txtQuadTestControlId = "";
                scope.ThermoLabelReadOnly = false;
                scope.QuadTestReadOnly = false;
                IntializeTestType_PotTrolleyDishwash();
                scope.FinalRinseHide = false;
                scope.NewDCModel.txtChlorineTestControlId = "";
                scope.ChlorineTestReadOnly = false;
                scope.NewDCModel.txtFinalRinseControlId = "";
            }
            else if (option.Id == 62 && option.Selected == false) {//DishWash
                scope.PotMachineReadOnly = false;
                scope.TrolleyMachineReadOnly = false;
                scope.DishwashMachineReadOnly = false;
                scope["AddlPotMachineControlId"].Clear();
                scope["AddlTrolleyMachineControlId"].Clear();
                scope["AddlDishwashMachineControlId"].Clear();
                scope.NewDCModel.AddlDishwashMachineControlId = "";
                scope["chkTestType"].Clear();
                scope["chkThermoLabel"].Clear();
                scope.NewDCModel.txtQuadTestControlId = "";
                scope.ThermoLabelReadOnly = false;
                scope.QuadTestReadOnly = false;
                IntializeTestType_PotTrolleyDishwash();
                scope.FinalRinseHide = false;
                scope.NewDCModel.txtChlorineTestControlId = "";
                scope.ChlorineTestReadOnly = false;
                scope.NewDCModel.txtFinalRinseControlId = "";
            }

            scope.NewDCModel.txtChlorineNCDetailsControlId = "";
            scope.NewDCModel.txtFinalRinseNCDetailsControlId = "";
            scope.NewDCModel.txtNCDetailsControlId = "";
        }          
   

        OneViewConsole.Debug("PotTrolleyDishwashHandler End", "AnswerMode.PotTrolleyDishwashHandler");
    }
    catch (Excep) {
       // alert("AnswerMode.PotTrolleyDishwashHandler" + Excep + JSON.stringify(Excep))
        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.PotTrolleyDishwashHandler", Excep);
    }
}

function IntializeTestType_PotTrolleyDishwash() {
    try {
        OneViewConsole.Debug("IntializeTestType_PotTrolleyDishwash Start", "AnswerMode.IntializeTestType_PotTrolleyDishwash");

        scope['TestType'] = [];
        scope['TestType'].push({ Id: 63, Name: 'Thermo Label', 'Sequence': 1, 'ColourIndex': 'green', Selected: false, 'AttributeNodeId': 543, ControlId: 'chkTestType', });
        scope['TestType'].push({ Id: 64, Name: 'Quat Test', 'Sequence': 2, 'ColourIndex': 'green', Selected: false, 'AttributeNodeId': 543, ControlId: 'chkTestType', });
        scope['TestType'].push({ Id: 65, Name: 'Chlorine Test', 'Sequence': 3, 'ColourIndex': 'green', Selected: false, 'AttributeNodeId': 543, ControlId: 'chkTestType', });

        OneViewConsole.Debug("IntializeTestType_PotTrolleyDishwash End", "AnswerMode.IntializeTestType_PotTrolleyDishwash");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.IntializeTestType_PotTrolleyDishwash", Excep);
    }
}

function TestTypeHandler(option) {
    try {
        OneViewConsole.Debug("TestTypeHandler Start", "AnswerMode.TestTypeHandler");
        var TrolleyMachine = scope["AddlTrolleyMachineControlId"].GetSelectedText();
        var DishwashMachine = scope["AddlDishwashMachineControlId"].GetSelectedText();
        var Washtype = scope["chkWashType"].GetSelectedValue();
        var DcPlaceId = OneViewSessionStorage.Get("DcPlaceId");
        if (option.ControlId == "chkTestType") {
            if (option.Id == 63 && option.Selected == true) {//Thermo Label
                scope.ThermoLabelReadOnly = true;
                scope.QuadTestReadOnly = false;
                scope.ChlorineTestReadOnly = false;
                //scope.NewDCModel["txtQuadTestControlId"] = "";
                //scope.NewDCModel["txtChlorineTestControlId"] = "";

               // alert('scope["chkThermoLabel"]  :' + JSON.stringify(scope["chkThermoLabel"]));
                if (scope["chkThermoLabel"].GetSelectedValue() == 67) {//White
                    if (Washtype == 61) {//TrolleyWash
                        if (TrolleyMachine != "COLD KITCHEN TROLLEY WASH (1)" && TrolleyMachine != "COLD KITCHEN TROLLEY WASH (2)") {
                            scope.QuadTestReadOnly = true;
                        }

                        else {
                            scope.QuadTestReadOnly = false;
                        }

                    }
                    else if (Washtype == 62) {//DishWash
                        if (DishwashMachine != "HOBART   CR 1" && DishwashMachine != "HOBART   TC 1" && DishwashMachine != "HOBART   C 10") {
                            scope.QuadTestReadOnly = true;
                            scope.FinalRinseHide = true;
                        }
                        else {
                            scope.QuadTestReadOnly = false;
                            scope.FinalRinseHide = false;
                        }
                    }
                    //else if (Washtype == 60) {//PotWash
                    //    scope.QuadTestReadOnly = true;
                    //}
                    if (DcPlaceId == 3) {
                        scope.QuadTestReadOnly = false;
                    }
                }

                else if (scope["chkThermoLabel"].GetSelectedValue() == 66) {//Black
                    scope.QuadTestReadOnly = false;
                   // scope.NewDCModel["txtQuadTestControlId"] = "";
                }

            }
            else if (option.Id == 63 && option.Selected == false) {//Thermo Label
                scope.ThermoLabelReadOnly = false;
                scope.QuadTestReadOnly = false;
                scope.ChlorineTestReadOnly = false;
                scope["chkThermoLabel"].Clear();
                $scope.NewDCModel["txtNCDetailsControlId"] = "NA";
            }
            else if (option.Id == 64 && option.Selected == true) {//Quad Test
                scope.ThermoLabelReadOnly = false;
                scope.QuadTestReadOnly = true;
                scope.ChlorineTestReadOnly = false;
                //scope["chkThermoLabel"].Clear();
                //scope.NewDCModel["txtChlorineTestControlId"] = "";
            }
            else if (option.Id == 64 && option.Selected == false) {//Quad Test
                scope.ThermoLabelReadOnly = false;
                scope.QuadTestReadOnly = false;
                scope.ChlorineTestReadOnly = false;
                //scope["chkThermoLabel"].Clear();
                scope.NewDCModel["txtQuadTestControlId"] = "";
                scope.NewDCModel["txtQuadNCDetailsControlId "] = "NA";
                
            }
            else if (option.Id == 65 && option.Selected == true) {//Chlorine Test
                scope.ThermoLabelReadOnly = false;
                scope.QuadTestReadOnly = false;
                scope.ChlorineTestReadOnly = true;
                //scope["chkThermoLabel"].Clear();
                //scope.NewDCModel["txtQuadTestControlId"] = "";
            }
            else if (option.Id == 65 && option.Selected == false) {//Chlorine Test
                scope.ThermoLabelReadOnly = false;
                scope.QuadTestReadOnly = false;
                scope.ChlorineTestReadOnly = false;
                //scope["chkThermoLabel"].Clear();
                //scope.NewDCModel["txtQuadTestControlId"] = "";
                scope.NewDCModel["txtChlorineTestControlId"] = "";
                scope.NewDCModel["txtChlorineNCDetailsControlId"] = "NA";
                //NCFormChange(option.ControlId, scope);
            }
        }

        OneViewConsole.Debug("TestTypeHandler End", "AnswerMode.TestTypeHandler");
    }
    catch (Excep) {
        //alert('TestTypeHandler Excep' + JSON.stringify(Excep));
        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.TestTypeHandler", Excep);
    }
}

function ThermoLabelHandler(option) {
    try {
        OneViewConsole.Debug("ThermoLabelHandler Start", "AnswerMode.ThermoLabelHandler");

        var TrolleyMachine = scope["AddlTrolleyMachineControlId"].GetSelectedText();
        var DishwashMachine = scope["AddlDishwashMachineControlId"].GetSelectedText();
        // alert('TrolleyMachine :' + TrolleyMachine)
        //FinalRinseHide
        var DcPlaceId = OneViewSessionStorage.Get("DcPlaceId");
        var Washtype=scope["chkWashType"].GetSelectedValue() ;
       // alert(Washtype + "," + option.Id + "," + DishwashMachine + "," + TrolleyMachine)
        if (option.ControlId == "chkThermoLabel") {
            //if (Washtype == 61) {
            //    if (TrolleyMachine != "COLD KITCHEN TROLLEY WASH (1)" && TrolleyMachine != "COLD KITCHEN TROLLEY WASH (2)") {
            //        scope.QuadTestReadOnly = true;
            //    }

            //    else {
            //        scope.QuadTestReadOnly = false;
            //    }

            //}
            //else if (Washtype == 62) {
            //    if (DishwashMachine != "HOBART   CR 1" && DishwashMachine != "HOBART   TC 1" && DishwashMachine != "HOBART   C 10") {
            //        scope.QuadTestReadOnly = true;
            //        scope.FinalRinseHide = true;
            //    }
            //    else {
            //        scope.QuadTestReadOnly = false;
            //        scope.FinalRinseHide = false;
            //    }
            //}
            //
            if (option.Id == 67) {//White
                if (Washtype == 61) {//TrolleyWash
                    if (TrolleyMachine != "COLD KITCHEN TROLLEY WASH (1)" && TrolleyMachine != "COLD KITCHEN TROLLEY WASH (2)") {
                        scope.QuadTestReadOnly = true;
                    }

                    else {
                        scope.QuadTestReadOnly = false;
                    }

                }
                else if (Washtype == 62) {//DishWash
                    if (DishwashMachine != "HOBART   CR 1" && DishwashMachine != "HOBART   TC 1" && DishwashMachine != "HOBART   C 10") {
                        scope.QuadTestReadOnly = true;
                        scope.FinalRinseHide = false;
                    }
                    else {
                        scope.QuadTestReadOnly = false;
                        scope.FinalRinseHide = true;
                    }
                }
                //else if (Washtype == 60) {//PotWash
                //    scope.QuadTestReadOnly = true;
                //}
                if (DcPlaceId == 3) {
                    scope.QuadTestReadOnly = false;
                }
            }

            else if (option.Id == 66) {
                scope.QuadTestReadOnly = false;

            }

        }


        OneViewConsole.Debug("ThermoLabelHandler End", "AnswerMode.ThermoLabelHandler");
    }
    catch (Excep) {
        //alert('ThermoLabelHandler Excep' + JSON.stringify(Excep));
        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.ThermoLabelHandler", Excep);
    }
}

function MediaPreparationReportHandler(option) {
    try {
        OneViewConsole.Debug("MediaPreparationReportHandler Start", "AnswerMode.MediaPreparationReportHandler");

        if (option.ControlId == "chkTypeofMedia") {
            if (option.Id == 70 && option.Selected == true) { //media
                scope.NameofMediaReadOnly = true;
                scope.NameofDilieuntReadOnly = false;
                scope.NewDCModel.txtNameofMediaControlId = "";
                scope.NewDCModel.txtNameofDilieuntControlId = "";
            }
            else if (option.Id == 71 && option.Selected == true) { //diluent
                scope.NameofMediaReadOnly = false;
                scope.NameofDilieuntReadOnly = true;
                scope.NewDCModel.txtNameofMediaControlId = "";
                scope.NewDCModel.txtNameofDilieuntControlId = "";
            }
            else {
                scope.NameofMediaReadOnly = false;
                scope.NameofDilieuntReadOnly = false;
                scope.NewDCModel.txtNameofMediaControlId = "";
                scope.NewDCModel.txtNameofDilieuntControlId = "";
            }
        }


        OneViewConsole.Debug("MediaPreparationReportHandler End", "AnswerMode.MediaPreparationReportHandler");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.MediaPreparationReportHandler", Excep);
    }
}

function CurrentStockofLaboratoryMediaHandler(option) {
    try {
        OneViewConsole.Debug("CurrentStockofLaboratoryMediaHandler Start", "AnswerMode.CurrentStockofLaboratoryMediaHandler");

        if (option.ControlId == "chkStocktype") {
            if (option.Id == 72 && option.Selected == true) {//GlassWare
                scope.DivGlassware = true;
                scope.DivMedia = false;
                scope.NewDCModel.AddlParameterControlId = "";
                scope.NewDCModel.AddlMediaorReagentsControlId = "";
                scope.NewDCModel.AddlBrandNameControlId = "";

            }
            else if (option.Id == 73 && option.Selected == true) {//Media
                scope.DivGlassware = false;
                scope.DivMedia = true;
                scope.NewDCModel.AddlGlasswareControlId = "";
            }
            else {
                scope.DivGlassware = false;
                scope.DivMedia = false;
                scope.NewDCModel.AddlParameterControlId = "";
                scope.NewDCModel.AddlMediaorReagentsControlId = "";
                scope.NewDCModel.AddlBrandNameControlId = "";
                scope.NewDCModel.AddlGlasswareControlId = "";
            }
        }


        OneViewConsole.Debug("CurrentStockofLaboratoryMediaHandler End", "AnswerMode.CurrentStockofLaboratoryMediaHandler");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.CurrentStockofLaboratoryMediaHandler", Excep);
    }
}

function YearlyVerificationCertificateHandlerOLD(option) {
    try {
        OneViewConsole.Debug("YearlyVerificationCertificateHandler Start", "AnswerMode.YearlyVerificationCertificateHandler");    
       
        var oThermometerType = scope.chkThermometerType;
        var oFrequency = scope.chkFrequency;
       
        if (option.ControlId == "chkThermometerType") {
            if (oFrequency.GetSelectedValue() == 76 && option.Id == 75) {//Yearly && Probe
                scope.DivTestCap1 = true;
                scope.DivTestCap2 = true;
                scope.DivTestCap3 = true;
                scope.DivBoilingWater = true;

                scope.DivValidator = false;
            }
            else if (oFrequency.GetSelectedValue() && option.Id == 75) {//Monthly && Probe
                scope.DivTestCap1 = true;
                scope.DivTestCap2 = false;
                scope.DivTestCap3 = false;
                scope.DivBoilingWater = false;

                scope.DivValidator = false;
            }
            else if (oFrequency.GetSelectedValue() == 76 && option.Id == 74) {//Yearly && IR
                scope.DivValidator = true;

                scope.DivTestCap1 = false;
                scope.DivTestCap2 = false;
                scope.DivTestCap3 = false;
                scope.DivBoilingWater = false;
            }
        }
        else if (option.ControlId == "chkFrequency") {           
            if (option.Id == 76 && oThermometerType.GetSelectedValue() == 75) {//Yearly && Probe
                scope.DivTestCap1 = true;
                scope.DivTestCap2 = true;
                scope.DivTestCap3 = true;
                scope.DivBoilingWater = true;

                scope.DivValidator = false;
            }
            else if (option.Id == 77 && oThermometerType.GetSelectedValue() == 75) {//Monthly && Probe
                scope.DivTestCap1 = true;
                scope.DivTestCap2 = false;
                scope.DivTestCap3 = false;
                scope.DivBoilingWater = false;

                scope.DivValidator = false;
            }
            else if (option.Id == 76 && oThermometerType.GetSelectedValue() == 74) {//Yearly && IR
                scope.DivValidator = true;

                scope.DivTestCap1 = false;
                scope.DivTestCap2 = false;
                scope.DivTestCap3 = false;
                scope.DivBoilingWater = false;
            }

        }
        OneViewConsole.Debug("YearlyVerificationCertificateHandler End", "AnswerMode.YearlyVerificationCertificateHandler");
    }
    catch (Excep) {

        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.YearlyVerificationCertificateHandler", Excep);
    }
}

function YearlyVerificationCertificateHandler(option) {
    try {
        OneViewConsole.Debug("YearlyVerificationCertificateHandler Start", "AnswerMode.YearlyVerificationCertificateHandler");

        if (option.ControlId == "chkThermometerType") {
            if (option.Id == 75) {//Yearly && Probe

                scope.DivTestCap1 = true;
                scope.DivTestCap2 = true;
                scope.DivTestCap3 = true;
                scope.DivBoilingWater = true;
                scope.DivProbeThermometerSerialNo = true;

                scope.DivValidator = false;
                scope.DivICECAP = false;
                scope.DivIRThermometerSerialNo = false;

                scope['AddlIRThermometerCodeControlId'].Clear();
                scope.NewDCModel.AddlThermometerSerialNoControlId = "";
                scope.NewDCModel.AddlThermometerModelNoControlId = "";
                scope.NewDCModel.txtSectionControlId = "";
                scope.NewDCModel.txtAllocationControlId = "";
                /*
                scope.NewDCModel.txtTestCap1RefNoControlId = "";
                scope.NewDCModel.txtTestCap1StandardValueControlId = "";
                scope.NewDCModel.txtTestCap1ObservedValueControlId = "";
                scope.NewDCModel.txtTestCap1DeviationValueControlId = "";

                scope.NewDCModel.TestCap2TestCapRefNo = "";
                scope.NewDCModel.txtTestCap2StandardValueControlId = "";
                scope.NewDCModel.txtTestCap2ObservedValueControlId = "";
                scope.NewDCModel.txtTestCap2DeviationValueControlId = "";

                scope.NewDCModel.TestCap3TestCapRefNo = "";
                scope.NewDCModel.txtTestCap3StandardValueControlId = "";
                scope.NewDCModel.txtTestCap3ObservedValueControlId = "";
                scope.NewDCModel.txtTestCap3DeviationValueControlId = "";

                scope.NewDCModel.txtBoilingWaterStandardValueControlId = "";
                scope.NewDCModel.txtBoilingWaterObservedValueControlId = "";
                scope.NewDCModel.txtBoilingWaterDeviationValueControlId = "";
                */
            }
            else if (option.Id == 74) {//Yearly && IR
                scope.DivValidator = true;
                scope.DivICECAP = true;
                scope.DivIRThermometerSerialNo = true;

                scope.DivTestCap1 = false;
                scope.DivTestCap2 = false;
                scope.DivTestCap3 = false;
                scope.DivBoilingWater = false;
                scope.DivProbeThermometerSerialNo = false;

                scope['AddlThermometerCodeControlId'].Clear();
                scope.NewDCModel.AddlThermometerSerialNoControlId = "";
                scope.NewDCModel.AddlThermometerModelNoControlId = "";
                scope.NewDCModel.txtSectionControlId = "";
                scope.NewDCModel.txtAllocationControlId = "";


                /*
                scope.NewDCModel.txtICEStandardValueControlId = "";
                scope.NewDCModel.txtICEObservedValueControlId = "";
                scope.NewDCModel.txtICEDeviationValueControlId = "";
                scope.NewDCModel.txtValidatorStandardValueControlId = "";
                scope.NewDCModel.txtValidatorObservedValueControlId = "";
                scope.NewDCModel.txtValidatorDeviationValueControlId = "";
                */
            }

        }
        OneViewConsole.Debug("YearlyVerificationCertificateHandler End", "AnswerMode.YearlyVerificationCertificateHandler");
    }
    catch (Excep) {

        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.YearlyVerificationCertificateHandler", Excep);
    }
}

function MasterListofMLECalibrationandMaintenanceStatusHandler(option) {
    try {
        OneViewConsole.Debug("MasterListofMLECalibrationandMaintenanceStatusHandler Start", "AnswerMode.MasterListofMLECalibrationandMaintenanceStatusHandler");

        if (option.ControlId == "chkExternalCaliberation") {
            if (option.Id == 78 && option.Selected == true) {//yes
                scope.DivECServiceProvider = true;
                scope.DivECCaliberationDueDate = true;
                //  scope.NewDCModel.AddlParameterControlId = "";                

            }
            else {
                scope.DivECServiceProvider = false;
                scope.DivECCaliberationDueDate = false;
                scope.NewDCModel.txtECServiceProviderControlId = "";
                scope.NewDCModel.DTCaliberationDueDateControlId = "";
            }
        }
        else if (option.ControlId == "chkPreventionMaintanence") {
            if (option.Id == 78 && option.Selected == true) {//yes
                scope.DivPMServiceProvider = true;
                scope.DivPMS1stpreventiveMaintainence = true;
                scope.DivPMS2ndpreventiveMaintainence = true;
                //  scope.NewDCModel.AddlParameterControlId = "";                

            }
            else {
                scope.DivPMServiceProvider = false;
                scope.DivPMS1stpreventiveMaintainence = false;
                scope.DivPMS2ndpreventiveMaintainence = false;
                scope.NewDCModel.txtPMServiceProviderControlId = "";
                scope.NewDCModel.DT1stpreventiveMaintainenceControlId = "";
                scope.NewDCModel.DT2ndpreventiveMaintainenceControlId = "";
            }
        }

        OneViewConsole.Debug("MasterListofMLECalibrationandMaintenanceStatusHandler End", "AnswerMode.MasterListofMLECalibrationandMaintenanceStatusHandler");
    }
    catch (Excep) {

        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.MasterListofMLECalibrationandMaintenanceStatusHandler", Excep);
    }
}

function SamplingSheetAndFoodAnalysisHandler(option) {
    try {
        OneViewConsole.Debug("SamplingSheetAndFoodAnalysisHandler Start", "AnswerMode.SamplingSheetAndFoodAnalysisHandler");

        if (option.ControlId == "chkNAControlId" && option.Selected == true) {
            scope.Div_txtNARemarksControlId = true;
            scope.NewDCModel.txtNARemarksControlId = "No FSS on duty";
        }
        else if (option.ControlId == "chkNAControlId" && option.Selected == false) {
            scope.Div_txtNARemarksControlId = false;
            scope.NewDCModel.txtNARemarksControlId = "";
        }

        if (option.ControlId == "chkParameterTested") {
            if (option.Id == 122) {//TVB

                ShowHideSamplingSheetAndFoodAnalysis('TVBShow', option.Selected);
                //scope.TVBShow = true;
                //scope.ColiformsShow = false;
                //scope.EcollShow = false;
                //scope.SaureusShow = false;
                //scope.BcereusShow = false;
                //scope.VparahaemolyticusShow = false;
                //scope.SalmonellaShow = false;
                //scope.ListeriaShow = false;
                //scope.ClostridiumShow = false;
                //scope.YMCShow = false;
                //scope.CampylobacterShow = false;

                if (option.Selected == false) {
                    Clear({ Type: "DDL", ControlId: "txtEquipmentUsed1ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtVolumeOfInoculum1ControlId" });
                    Clear({ Type: "DDL", ControlId: "txtColonyCountDilutionFirst1ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtColonyCountDilutionSecond1ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtFactor1ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtResult1ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation1ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEquipmentUsedSecond1ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtTVBAnalyzedByControlId" });
                }
            }
            else if (option.Id == 123) {//Coliforms              
                ShowHideSamplingSheetAndFoodAnalysis('ColiformsShow', option.Selected);

                if (option.Selected == false) {
                    Clear({ Type: "DDL", ControlId: "txtEquipmentUsed2ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtVolumeOfInoculum2ControlId" });
                    Clear({ Type: "DDL", ControlId: "txtColonyCountDilutionFirst2ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtColonyCountDilutionSecond2ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtFactor2ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtResult2ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation2ControlId" });
                    Clear({ Type: "Band", ControlId: "chkColiformsTest1ControlId" });
                    Clear({ Type: "Band", ControlId: "chkColiformsTest2ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEquipmentUsedSecond2ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtColiAnalyzedByControlId" });
                }
            }
            else if (option.Id == 124) {//E.coll              
                ShowHideSamplingSheetAndFoodAnalysis('EcollShow', option.Selected);

                if (option.Selected == false) {
                    Clear({ Type: "DDL", ControlId: "txtEquipmentUsed3ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlPresumptiveResult1ControlId" });
                    Clear({ Type: "Band", ControlId: "chkEcoliTest1ControlId" });
                    Clear({ Type: "Band", ControlId: "chkEcoliTest2ControlId" });
                    Clear({ Type: "Band", ControlId: "chkEcoliTest3ControlId" });
                    Clear({ Type: "Band", ControlId: "chkEcoliTest4ControlId" });
                    Clear({ Type: "Band", ControlId: "chkEcoliTest5ControlId" });
                    Clear({ Type: "Band", ControlId: "chkEcoliTest6ControlId" });
                    Clear({ Type: "Band", ControlId: "chkEcoliTest7ControlId" });
                    Clear({ Type: "Band", ControlId: "txtResult3ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation3ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEquipmentUsedSecond3ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtEcoliAnalyzedByControlId" });
                }
            }
            else if (option.Id == 125) {//S.aureus              
                ShowHideSamplingSheetAndFoodAnalysis('SaureusShow', option.Selected);
                if (option.Selected == false) {
                    Clear({ Type: "DDL", ControlId: "txtEquipmentUsed4ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtVolumeOfInoculum3ControlId" });
                    Clear({ Type: "DDL", ControlId: "txtColonyCountDilutionFirst4ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtColonyCountDilutionSecond4ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtFactor4ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtResult4ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation4ControlId" });
                    Clear({ Type: "Band", ControlId: "chkSaureusTest1ControlId" });
                    Clear({ Type: "Band", ControlId: "chkSaureusTest2ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEquipmentUsedSecond4ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtSaurAnalyzedByControlId" });
                }
            }
            else if (option.Id == 126) {//B.cereus             
                ShowHideSamplingSheetAndFoodAnalysis('BcereusShow', option.Selected);
                if (option.Selected == false) {
                    Clear({ Type: "DDL", ControlId: "txtEquipmentUsed5ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtVolumeOfInoculum4ControlId" });
                    Clear({ Type: "DDL", ControlId: "txtColonyCountDilutionFirst5ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtColonyCountDilutionSecond5ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtFactor5ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtResult5ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation5ControlId" });
                    Clear({ Type: "Band", ControlId: "chkBcereusTest1ControlId" });
                    Clear({ Type: "Band", ControlId: "chkBcereusTest2ControlId" });
                    Clear({ Type: "Band", ControlId: "chkBcereusTest3ControlId" });
                    Clear({ Type: "Band", ControlId: "chkBcereusTest4ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEquipmentUsedSecond5ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtBcerAnalyzedByControlId" });
                }
            }
            else if (option.Id == 127) {//V.parahaemolyticus              
                ShowHideSamplingSheetAndFoodAnalysis('VparahaemolyticusShow', option.Selected);
                if (option.Selected == false) {
                    Clear({ Type: "DDL", ControlId: "txtEquipmentUsed6ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlPresumptiveResult2ControlId" });
                    Clear({ Type: "DDL", ControlId: "txtColonyCountDilutionFirst6ControlId" });
                    Clear({ Type: "Band", ControlId: "txtResult6ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation6ControlId" });
                    Clear({ Type: "Band", ControlId: "chkVparahaemolyticusTest1ControlId" });
                    Clear({ Type: "Band", ControlId: "chkVparahaemolyticusTest2ControlId" });
                    Clear({ Type: "Band", ControlId: "chkVparahaemolyticusTest3ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEquipmentUsedSecond6ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtVparaAnalyzedByControlId" });
                   
                }
            }
            else if (option.Id == 128) {//Salmonella             
                ShowHideSamplingSheetAndFoodAnalysis('SalmonellaShow', option.Selected);
                if (option.Selected == false) {
                    Clear({ Type: "DDL", ControlId: "txtEquipmentUsed7ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlPresumptiveResult3ControlId" }); 
                    Clear({ Type: "Band", ControlId: "chkSalmonellaTest1ControlId" });
                    Clear({ Type: "Band", ControlId: "chkSalmonellaTest2ControlId" });
                    Clear({ Type: "Band", ControlId: "chkSalmonellaTest3ControlId" });
                    Clear({ Type: "Band", ControlId: "chkSalmonellaTest4ControlId" });
                    Clear({ Type: "Band", ControlId: "chkSalmonellaTest5ControlId" });
                    Clear({ Type: "Band", ControlId: "txtResult7ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation7ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEquipmentUsedSecond7ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtSalmAnalyzedByControlId" });

                }
            }
            else if (option.Id == 129) {//Listeria monocytogenes           
                ShowHideSamplingSheetAndFoodAnalysis('ListeriaShow', option.Selected);
                if (option.Selected == false) {
                    Clear({ Type: "DDL", ControlId: "txtEquipmentUsed8ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlPresumptiveResult4ControlId" });
                    Clear({ Type: "Band", ControlId: "chkMonocytogenesTest1ControlId" });
                    Clear({ Type: "Band", ControlId: "chkMonocytogenesTest2ControlId" });
                    Clear({ Type: "Band", ControlId: "chkMonocytogenesTest3ControlId" });
                    Clear({ Type: "Band", ControlId: "chkMonocytogenesTest4ControlId" });
                    Clear({ Type: "Band", ControlId: "chkMonocytogenesTest5ControlId" });
                    Clear({ Type: "Band", ControlId: "txtResult8ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation8ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEquipmentUsedSecond8ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtListAnalyzedByControlId" });

                }
            }
            else if (option.Id == 130) {//Clostridium perfringens              
                ShowHideSamplingSheetAndFoodAnalysis('ClostridiumShow', option.Selected);
                if (option.Selected == false) {
                    Clear({ Type: "DDL", ControlId: "txtEquipmentUsed9ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtVolumeOfInoculum5ControlId" });
                    Clear({ Type: "DDL", ControlId: "txtColonyCountDilutionFirst9ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtColonyCountDilutionSecond9ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtFactor9ControlId" });
                    Clear({ Type: "Band", ControlId: "chkClostridiumTest1ControlId" });
                    Clear({ Type: "Band", ControlId: "chkClostridiumTest2ControlId" });
                    Clear({ Type: "Band", ControlId: "chkClostridiumTest3ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtResult9ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation9ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEquipmentUsedSecond9ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtClostAnalyzedByControlId" });
                }
            }
            else if (option.Id == 131) {//YMC              
                ShowHideSamplingSheetAndFoodAnalysis('YMCShow', option.Selected);
                if (option.Selected == false) {
                    Clear({ Type: "DDL", ControlId: "txtEquipmentUsed10ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtVolumeOfInoculum6ControlId" });
                    Clear({ Type: "DDL", ControlId: "txtColonyCountDilutionFirst10ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtColonyCountDilutionSecond10ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtFactor10ControlId" });
                    Clear({ Type: "Band", ControlId: "chkYMCTest1ControlId" });                  
                    Clear({ Type: "TEXTBOX", ControlId: "txtResult10ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation10ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEquipmentUsedSecond10ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtYMCAnalyzedByControlId" });
                }
            }
            else if (option.Id == 132) {//Campylobacter              
                ShowHideSamplingSheetAndFoodAnalysis('CampylobacterShow', option.Selected);
                if (option.Selected == false) {
                    Clear({ Type: "DDL", ControlId: "txtEquipmentUsed11ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlPresumptiveResult5ControlId" });
                    Clear({ Type: "Band", ControlId: "chkCampylobacterTest1ControlId" });
                    Clear({ Type: "Band", ControlId: "chkCampylobacterTest2ControlId" });
                    Clear({ Type: "Band", ControlId: "chkCampylobacterTest3ControlId" });
                    Clear({ Type: "Band", ControlId: "chkCampylobacterTest4ControlId" });
                    Clear({ Type: "Band", ControlId: "chkCampylobacterTest5ControlId" });
                    Clear({ Type: "Band", ControlId: "txtResult11ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation11ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEquipmentUsedSecond11ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtCampyAnalyzedByControlId" });

                }
            }
        }

        else if (option.ControlId == "chkConditionOfAreaOnSampling" ) {
            if (option.Id == 115 && option.Selected == true) {
                scope.AreaConditionShow = true;
            }
            else {
                scope.AreaConditionShow = false;
                scope.OthersAreaConditionShow = false;
                scope["AddlAreaConditionUnsatisfactoryControlId"].Clear();
                scope.NewDCModel.txtOthersAreaConditionControlId = "";
            }
        }
        else if (option.ControlId == "chkConditionOfSampleOnReceipt") {
            if (option.Id == 115 && option.Selected == true) {
                scope.SampleConditionShow = true;
            }
            else {
                scope.SampleConditionShow = false;
                scope.OthersSampleReceiptShow = false;
                scope["AddlSampleConditionUnsatisfactoryControlId"].Clear();
                scope.NewDCModel.txtOthersSampleReceiptControlId = "";
            }
        }
        else if (option.ControlId == "chkConditionOfSampleAnalysis") {
            if (option.Id == 115 && option.Selected == true) {
                scope.SampleAnalysisShow = true;
            }
            else {
                scope.SampleAnalysisShow = false;
                scope.OthersSampleAnalysisShow = false;
                scope["AddlSampleAnalysisUnsatisfactoryControlId"].Clear();
                scope.NewDCModel.txtOthersSampleAnalysisControlId = "";
            }
        }

        //else if (option.ControlId == "chkFoodReceivedType") {
        //    if (option.Id == 139 && option.Selected == true) {
        //        scope.SampleLocationShow = true;
        //        scope.OutSourceDetailsShow = false;

        //        //scope.NewDCModel.txtCustomerNameControlId = "";
        //        //scope.NewDCModel.txtAddressControlId = "";
        //        scope.NewDCModel.DTDateofReceiptControlId = "";
        //        scope.NewDCModel.ATReceivingTemperatureControlId = "";
        //        document.getElementById('DTTimeofReceiptControlId').value = '';
        //        scope["DTTimeofReceiptControlId_DateTime"] = "";
        //        scope.NewDCModel.DTTimeofReceiptControlId = "";
        //        scope.NewDCModel.txtTransportOfSample = "";
        //        //scope.NewDCModel.txtSampleLocationControlId = "";
              
        //    }
        //    else if (option.Id == 140 && option.Selected == true) {
        //        scope.OutSourceDetailsShow = true;

        //        scope.SampleLocationShow = true;
        //        //scope.NewDCModel.txtSampleLocationControlId = "";
        //    }
        //    else if (option.Id == 141 && option.Selected == true) {
        //        scope.SampleLocationShow = true;
        //        scope.OutSourceDetailsShow = false;

        //        //scope.NewDCModel.txtCustomerNameControlId = "";
        //        //scope.NewDCModel.txtAddressControlId = "";
        //        scope.NewDCModel.DTDateofReceiptControlId = "";
        //        scope.NewDCModel.ATReceivingTemperatureControlId = "";
        //        document.getElementById('DTTimeofReceiptControlId').value = '';
        //        scope["DTTimeofReceiptControlId_DateTime"] = "";
        //        scope.NewDCModel.DTTimeofReceiptControlId = "";
        //        scope.NewDCModel.txtTransportOfSample = "";
        //        //scope.NewDCModel.txtSampleLocationControlId = "";
        //    }
        //    else {
        //        scope.SampleLocationShow = false;
        //        //scope.NewDCModel.txtCustomerNameControlId = "";
        //        //scope.NewDCModel.txtAddressControlId = "";
        //        scope.NewDCModel.DTDateofReceiptControlId = "";
        //        scope.NewDCModel.ATReceivingTemperatureControlId = "";
        //        document.getElementById('DTTimeofReceiptControlId').value = '';
        //        scope["DTTimeofReceiptControlId_DateTime"] = "";
        //        scope.NewDCModel.DTTimeofReceiptControlId = "";
        //        scope.NewDCModel.txtTransportOfSample = "";


        //        scope.OutSourceDetailsShow = false;
        //        //scope.NewDCModel.txtSampleLocationControlId = "";
        //    }
        //}

        OneViewConsole.Debug("SamplingSheetAndFoodAnalysisHandler End", "AnswerMode.SamplingSheetAndFoodAnalysisHandler");
    }
    catch (Excep) {

        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.SamplingSheetAndFoodAnalysisHandler", Excep);
    }

  
}

function ShowHideSamplingSheetAndFoodAnalysis(ShowParameter,OptionSelected) {
    try {
        scope.TVBShow = false;
        scope.ColiformsShow = false;
        scope.EcollShow = false;
        scope.SaureusShow = false;
        scope.BcereusShow = false;
        scope.VparahaemolyticusShow = false;
        scope.SalmonellaShow = false;
        scope.ListeriaShow = false;
        scope.ClostridiumShow = false;
        scope.YMCShow = false;
        scope.CampylobacterShow = false;
        //alert("OptionSelected : " + OptionSelected)

        if ((OptionSelected == undefined && OptionSelected == "") || OptionSelected == true) {
            scope[ShowParameter] = true;
        }
        else{
            scope[ShowParameter] = false;
        }
      
    }
    catch (Excep) {

        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.ShowHideSamplingSheetAndFoodAnalysis", Excep);
    }
}

function SamplingSheetAndWaterAnalysisHandler(option) {
    try {
        OneViewConsole.Debug("SamplingSheetAndWaterAnalysisHandler Start", "AnswerMode.SamplingSheetAndWaterAnalysisHandler");

        
        if (option.ControlId == "chkNAControlId" && option.Selected == true) {
            scope.Div_txtNARemarksControlId = true;
            scope.NewDCModel.txtNARemarksControlId = "No FSS on duty";
        }
        else if (option.ControlId == "chkNAControlId" && option.Selected == false)  {
            scope.Div_txtNARemarksControlId = false;
            scope.NewDCModel.txtNARemarksControlId = "";
        }

        if (option.ControlId == "chkParameterTested") {
            if (option.Id == 133) {//TVB
                ShowHideSamplingSheetAndWaterAnalysis('TVBShow', option.Selected);
                if (option.Selected == false) {
                    Clear({ Type: "TEXTBOX", ControlId: "txtEquipmentUsed1ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtColonyCountDilutionFirst1ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtColonyCountDilutionSecond1ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtFactor1ControlId" });                  
                    Clear({ Type: "TEXTBOX", ControlId: "txtResult1ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation1ControlId" });
                    Clear({ Type: "DDL", ControlId: "txtEquipmentUsedSecond1ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtTVBAnalyzedByControlId" });
                }
            }
            else if (option.Id == 134) {//Coliforms              
                ShowHideSamplingSheetAndWaterAnalysis('ColiformsShow', option.Selected);
                if (option.Selected == false) {
                    Clear({ Type: "TEXTBOX", ControlId: "txtEquipmentUsed2ControlId" });                    
                    Clear({ Type: "Band", ControlId: "chkColiformsPresumptiveResultControlId" });
                    Clear({ Type: "Band", ControlId: "chkColiformsTest1ControlId" });

                    Clear({ Type: "TEXTBOX", ControlId: "txtColonyCountDilutionFirst2ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtColonyCountDilutionSecond2ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtFactor2ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtResult2ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation2ControlId" });
                    Clear({ Type: "DDL", ControlId: "txtEquipmentUsedSecond2ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtColiformsAnalyzedByControlId" });
                }
            }
            else if (option.Id == 135) {//E.coll              
                ShowHideSamplingSheetAndWaterAnalysis('EcollShow', option.Selected);
                if (option.Selected == false) {
                    Clear({ Type: "TEXTBOX", ControlId: "txtEquipmentUsed3ControlId" });
                    Clear({ Type: "Band", ControlId: "chkEcollPresumptiveResultControlId" });
                    Clear({ Type: "Band", ControlId: "chkEcoliTest1ControlId" });
                    Clear({ Type: "Band", ControlId: "chkEcoliTest2ControlId" });
                    Clear({ Type: "Band", ControlId: "chkEcoliTest3ControlId" });
                    Clear({ Type: "Band", ControlId: "chkEcoliTest4ControlId" });

                    Clear({ Type: "TEXTBOX", ControlId: "txtColonyCountDilutionFirst3ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtColonyCountDilutionSecond3ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtFactor3ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtResult3ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation3ControlId" });
                    Clear({ Type: "DDL", ControlId: "txtEquipmentUsedSecond3ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtEcoliAnalyzedByControlId" });
                }
            }
            else if (option.Id == 136) {//Pseudomonas             
                ShowHideSamplingSheetAndWaterAnalysis('PseudomonasShow', option.Selected);
                if (option.Selected == false) {
                    Clear({ Type: "TEXTBOX", ControlId: "txtEquipmentUsed4ControlId" });
                    Clear({ Type: "Band", ControlId: "chkPseudomonasPresumptiveResultControlId" });
                    Clear({ Type: "Band", ControlId: "chkPseudomonasTest1ControlId" });
                    Clear({ Type: "Band", ControlId: "chkPseudomonasTest2ControlId" });
                    Clear({ Type: "Band", ControlId: "chkPseudomonasTest3ControlId" });

                    Clear({ Type: "TEXTBOX", ControlId: "txtColonyCountDilutionFirst4ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtColonyCountDilutionSecond4ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtFactor4ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtResult4ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation4ControlId" });
                    Clear({ Type: "DDL", ControlId: "txtEquipmentUsedSecond4ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtPseudomonasAnalyzedByControlId" });

                }
            }
            else if (option.Id == 137) {//Enterococcus      
                ShowHideSamplingSheetAndWaterAnalysis('EnterococcusShow', option.Selected);
                if (option.Selected == false) {
                    Clear({ Type: "TEXTBOX", ControlId: "txtEquipmentUsed5ControlId" });
                    Clear({ Type: "Band", ControlId: "chkEnterococcusPresumptiveResultControlId" });
                    Clear({ Type: "Band", ControlId: "chkEnterococcusTest1ControlId" });
                    Clear({ Type: "Band", ControlId: "chkEnterococcusTest2ControlId" });
                    Clear({ Type: "Band", ControlId: "chkEnterococcusTest3ControlId" });

                    Clear({ Type: "TEXTBOX", ControlId: "txtColonyCountDilutionFirst5ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtColonyCountDilutionSecond5ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtFactor5ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtResult5ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation5ControlId" });
                    Clear({ Type: "DDL", ControlId: "txtEquipmentUsedSecond5ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtEnterococcusAnalyzedByControlId" });
                }
            }
            else if (option.Id == 138) {//SalmonellaShow          
                ShowHideSamplingSheetAndWaterAnalysis('SalmonellaShow', option.Selected);
                if (option.Selected == false) {
                    Clear({ Type: "TEXTBOX", ControlId: "txtEquipmentUsed6ControlId" });
                    Clear({ Type: "Band", ControlId: "chkSalmonellaPresumptiveResultControlId" });
                    Clear({ Type: "Band", ControlId: "chkSalmonellaTest1ControlId" });
                    Clear({ Type: "Band", ControlId: "chkSalmonellaTest2ControlId" });
                    Clear({ Type: "Band", ControlId: "chkSalmonellaTest3ControlId" });
                    Clear({ Type: "Band", ControlId: "chkSalmonellaTest4ControlId" });
                    Clear({ Type: "Band", ControlId: "chkSalmonellaTest5ControlId" });

                    Clear({ Type: "TEXTBOX", ControlId: "txtColonyCountDilutionFirst6ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtColonyCountDilutionSecond6ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtFactor6ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtResult6ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation6ControlId" });
                    Clear({ Type: "DDL", ControlId: "txtEquipmentUsedSecond6ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtSalmonellaAnalyzedByControlId" });
                }
            }
            
        }
        else if (option.ControlId == "chkConditionOfAreaOnSampling") {
            if (option.Id == 115 && option.Selected == true) {
                scope.AreaConditionShow = true;
            }
            else {
                scope.AreaConditionShow = false;
                scope.OthersAreaConditionShow = false;
                scope["AddlAreaConditionUnsatisfactoryControlId"].Clear();
                scope.NewDCModel.txtOthersAreaConditionControlId = "";
            }
        }
        else if (option.ControlId == "chkConditionOfSampleOnReceipt") {
            if (option.Id == 115 && option.Selected == true) {
                scope.SampleConditionShow = true;
            }
            else {
                scope.SampleConditionShow = false;
                scope.OthersSampleReceiptShow = false;
                scope["AddlSampleConditionUnsatisfactoryControlId"].Clear();
                scope.NewDCModel.txtOthersSampleReceiptControlId = "";
            }
        }
        else if (option.ControlId == "chkConditionOfSampleAnalysis") {
            if (option.Id == 115 && option.Selected == true) {
                scope.SampleAnalysisShow = true;
            }
            else {
                scope.SampleAnalysisShow = false;
                scope.OthersSampleAnalysisShow = false;
                scope["AddlSampleAnalysisUnsatisfactoryControlId"].Clear();
                scope.NewDCModel.txtOthersSampleAnalysisControlId = "";
            }
        }
        OneViewConsole.Debug("SamplingSheetAndWaterAnalysisHandler End", "AnswerMode.SamplingSheetAndWaterAnalysisHandler");
    }
    catch (Excep) {

        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.SamplingSheetAndWaterAnalysisHandler", Excep);
    }


}

function ShowHideSamplingSheetAndWaterAnalysis(ShowParameter, OptionSelected) {
    try {
        scope.TVBShow = false;
        scope.ColiformsShow = false;
        scope.EcollShow = false;
        scope.PseudomonasShow = false;
        scope.EnterococcusShow = false;
        scope.SalmonellaShow = false;
     

        //scope[ShowParameter] = true;
        if ((OptionSelected == undefined && OptionSelected == "") || OptionSelected == true) {
            scope[ShowParameter] = true;
        }
        else {
            scope[ShowParameter] = false;
        }
    }
    catch (Excep) {

        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.ShowHideSamplingSheetAndWaterAnalysis", Excep);
    }
}

function SamplingSheetAndIceAnalysisHandler(option) {
    try {
        OneViewConsole.Debug("SamplingSheetAndWaterAnalysisHandler Start", "AnswerMode.SamplingSheetAndWaterAnalysisHandler");

        if (option.ControlId == "chkNAControlId" && option.Selected == true) {
            scope.Div_txtNARemarksControlId = true;
            scope.NewDCModel.txtNARemarksControlId = "No FSS on duty";
        }
        else if (option.ControlId == "chkNAControlId" && option.Selected == false){
            scope.Div_txtNARemarksControlId = false;
            scope.NewDCModel.txtNARemarksControlId = "";
        }

        if (option.ControlId == "chkParameterTested") {
            if (option.Id == 133) {//TVB
                ShowHideSamplingSheetAndWaterAnalysis('TVBShow', option.Selected);
                if (option.Selected == false) {
                    Clear({ Type: "TEXTBOX", ControlId: "txtEquipmentUsed1ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtColonyCountDilutionFirst1ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtColonyCountDilutionSecond1ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtFactor1ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtResult1ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation1ControlId" });
                    Clear({ Type: "DDL", ControlId: "txtEquipmentUsedSecond1ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtTVBAnalyzedByControlId" });
                }
            }
            else if (option.Id == 134) {//Coliforms              
                ShowHideSamplingSheetAndWaterAnalysis('ColiformsShow', option.Selected);
                if (option.Selected == false) {
                    Clear({ Type: "TEXTBOX", ControlId: "txtEquipmentUsed2ControlId" });
                    Clear({ Type: "Band", ControlId: "chkColiformsPresumptiveResultControlId" });
                    Clear({ Type: "Band", ControlId: "chkColiformsTest1ControlId" });

                    Clear({ Type: "TEXTBOX", ControlId: "txtColonyCountDilutionFirst2ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtColonyCountDilutionSecond2ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtFactor2ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtResult2ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation2ControlId" });
                    Clear({ Type: "DDL", ControlId: "txtEquipmentUsedSecond2ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtColiformsAnalyzedByControlId" });
                }
            }
            else if (option.Id == 135) {//E.coll              
                ShowHideSamplingSheetAndWaterAnalysis('EcollShow', option.Selected);
                if (option.Selected == false) {
                    Clear({ Type: "TEXTBOX", ControlId: "txtEquipmentUsed3ControlId" });
                    Clear({ Type: "Band", ControlId: "chkEcollPresumptiveResultControlId" });
                    Clear({ Type: "Band", ControlId: "chkEcoliTest1ControlId" });
                    Clear({ Type: "Band", ControlId: "chkEcoliTest2ControlId" });
                    Clear({ Type: "Band", ControlId: "chkEcoliTest3ControlId" });
                    Clear({ Type: "Band", ControlId: "chkEcoliTest4ControlId" });

                    Clear({ Type: "TEXTBOX", ControlId: "txtColonyCountDilutionFirst3ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtColonyCountDilutionSecond3ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtFactor3ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtResult3ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation3ControlId" });
                    Clear({ Type: "DDL", ControlId: "txtEquipmentUsedSecond3ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtEcoliAnalyzedByControlId" });
                }
            }
            else if (option.Id == 136) {//Pseudomonas             
                ShowHideSamplingSheetAndWaterAnalysis('PseudomonasShow', option.Selected);
                if (option.Selected == false) {
                    Clear({ Type: "TEXTBOX", ControlId: "txtEquipmentUsed4ControlId" });
                    Clear({ Type: "Band", ControlId: "chkPseudomonasPresumptiveResultControlId" });
                    Clear({ Type: "Band", ControlId: "chkPseudomonasTest1ControlId" });
                    Clear({ Type: "Band", ControlId: "chkPseudomonasTest2ControlId" });
                    Clear({ Type: "Band", ControlId: "chkPseudomonasTest3ControlId" });

                    Clear({ Type: "TEXTBOX", ControlId: "txtColonyCountDilutionFirst4ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtColonyCountDilutionSecond4ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtFactor4ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtResult4ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation4ControlId" });
                    Clear({ Type: "DDL", ControlId: "txtEquipmentUsedSecond4ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtPseudomonasAnalyzedByControlId" });
                }
            }
            else if (option.Id == 137) {//Enterococcus      
                ShowHideSamplingSheetAndWaterAnalysis('EnterococcusShow', option.Selected);
                if (option.Selected == false) {
                    Clear({ Type: "TEXTBOX", ControlId: "txtEquipmentUsed5ControlId" });
                    Clear({ Type: "Band", ControlId: "chkEnterococcusPresumptiveResultControlId" });
                    Clear({ Type: "Band", ControlId: "chkEnterococcusTest1ControlId" });
                    Clear({ Type: "Band", ControlId: "chkEnterococcusTest2ControlId" });
                    Clear({ Type: "Band", ControlId: "chkEnterococcusTest3ControlId" });

                    Clear({ Type: "TEXTBOX", ControlId: "txtColonyCountDilutionFirst5ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtColonyCountDilutionSecond5ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtFactor5ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtResult5ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation5ControlId" });
                    Clear({ Type: "DDL", ControlId: "txtEquipmentUsedSecond5ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtEnterococcusAnalyzedByControlId" });
                }
            }
            else if (option.Id == 138) {//SalmonellaShow          
                ShowHideSamplingSheetAndWaterAnalysis('SalmonellaShow', option.Selected);
                if (option.Selected == false) {
                    Clear({ Type: "TEXTBOX", ControlId: "txtEquipmentUsed6ControlId" });
                    Clear({ Type: "Band", ControlId: "chkSalmonellaPresumptiveResultControlId" });
                    Clear({ Type: "Band", ControlId: "chkSalmonellaTest1ControlId" });
                    Clear({ Type: "Band", ControlId: "chkSalmonellaTest2ControlId" });
                    Clear({ Type: "Band", ControlId: "chkSalmonellaTest3ControlId" });
                    Clear({ Type: "Band", ControlId: "chkSalmonellaTest4ControlId" });
                    Clear({ Type: "Band", ControlId: "chkSalmonellaTest5ControlId" });

                    Clear({ Type: "TEXTBOX", ControlId: "txtColonyCountDilutionFirst6ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtColonyCountDilutionSecond6ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtFactor6ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtResult6ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation6ControlId" });
                    Clear({ Type: "DDL", ControlId: "txtEquipmentUsedSecond6ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtSalmonellaAnalyzedByControlId" });
                }
            }



        }
        else if (option.ControlId == "chkConditionOfAreaOnSampling") {
            if (option.Id == 115 && option.Selected == true) {
                scope.AreaConditionShow = true;
            }
            else {
                scope.AreaConditionShow = false;
                scope.OthersAreaConditionShow = false;
                scope["AddlAreaConditionUnsatisfactoryControlId"].Clear();
                scope.NewDCModel.txtOthersAreaConditionControlId = "";
            }
        }
        else if (option.ControlId == "chkConditionOfSampleOnReceipt") {
            if (option.Id == 115 && option.Selected == true) {
                scope.SampleConditionShow = true;
            }
            else {
                scope.SampleConditionShow = false;
                scope.OthersSampleReceiptShow = false;
                scope["AddlSampleConditionUnsatisfactoryControlId"].Clear();
                scope.NewDCModel.txtOthersSampleReceiptControlId = "";
            }
        }
        else if (option.ControlId == "chkConditionOfSampleAnalysis") {
            if (option.Id == 115 && option.Selected == true) {
                scope.SampleAnalysisShow = true;
            }
            else {
                scope.SampleAnalysisShow = false;
                scope.OthersSampleAnalysisShow = false;
                scope["AddlSampleAnalysisUnsatisfactoryControlId"].Clear();
                scope.NewDCModel.txtOthersSampleAnalysisControlId = "";
            }
        }
       
        OneViewConsole.Debug("SamplingSheetAndIceAnalysisHandler End", "AnswerMode.SamplingSheetAndIceAnalysisHandler");
    }
    catch (Excep) {

        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.SamplingSheetAndIceAnalysisHandler", Excep);
    }


}

function ShowHideSamplingSheetAndIceAnalysis(ShowParameter, OptionSelected) {
    try {
        scope.TVBShow = false;
        scope.ColiformsShow = false;
        scope.EcollShow = false;
        scope.PseudomonasShow = false;
        scope.EnterococcusShow = false;
        scope.SalmonellaShow = false;


        //scope[ShowParameter] = true;
        if ((OptionSelected == undefined && OptionSelected == "") || OptionSelected == true) {
            scope[ShowParameter] = true;
        }
        else {
            scope[ShowParameter] = false;
        }
    }
    catch (Excep) {

        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.ShowHideSamplingSheetAndIceAnalysis", Excep);
    }
}

function SamplingSheetAndAirHandler(option) {
    try {
        OneViewConsole.Debug("SamplingSheetAndAirHandler Start", "AnswerMode.SamplingSheetAndAirHandler");

        var ParameterTested = "";
        if (option.ControlId == "chkParameterTested") {
            if (option.Id == 142) {//TVB
                ParameterTested = "TVBShow";
                if (option.Selected == false) {
                    Clear({ Type: "TEXTBOX", ControlId: "txtActualValue1ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtTVBAnalyzedByControlId" });
                }
            }
            else if (option.Id == 143) {//Coliforms              
                ParameterTested = "ColiformsShow";
                if (option.Selected == false) {
                    Clear({ Type: "TEXTBOX", ControlId: "txtActualValue2ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation2ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtColiformsAnalyzedByControlId" });
                }
            }
            else if (option.Id == 144) {//YeasAndMould           
                ParameterTested = "YeasAndMouldShow";
                if (option.Selected == false) {
                    Clear({ Type: "TEXTBOX", ControlId: "txtActualValue3ControlId" });
                }
            }           


            scope.TVBShow = false;
            scope.ColiformsShow = false;
            scope.YeasAndMouldShow = false;           


            //scope[ParameterTested] = true;

            if (option.Selected == true) {
                scope[ParameterTested] = true;
            }
            else {
                scope[ParameterTested] = false;
            }
        }
        else if (option.ControlId == "chkTestMethod") {
            if (option.Id == 68 && option.Selected == true) {//Air Sampler
                scope.ExposureShow = false;
                scope.VolumeOfAirShow = true;
                scope.DivDTTimeControlIdShow = true;
                scope.NewDCModel.DTExposureStartTimeControlId = "";
                scope.NewDCModel.DTExposureEndTimeControlId = "";
                scope.NewDCModel.DTExposureTimeControlId = "";
                scope.Div_DTCompletionDate1ControlId = true;
                scope.Div_DTCompletionDate2ControlId = false;
                scope.NewDCModel.DTCompletionDate2ControlId = "";

                document.getElementById('lblTVBActualValue').innerHTML = "Actual Value CFU / m&#179";
                document.getElementById('lblYMCActualValue').innerHTML = "Actual Value CFU / m&#179";

                
            }
            else if (option.Id == 69 && option.Selected == true) {//Open Plate              
                scope.ExposureShow = true;
                scope.VolumeOfAirShow = false;
                scope.DivDTTimeControlIdShow = false;
                scope.NewDCModel.DTTimeControlId = "";
                scope.Div_DTCompletionDate1ControlId = false;
                scope.Div_DTCompletionDate2ControlId = true;
                scope.NewDCModel.DTCompletionDate1ControlId = "";

                document.getElementById('lblTVBActualValue').innerHTML = "Actual Value (CFU / 15 min exposure)";
                document.getElementById('lblYMCActualValue').innerHTML = "Actual Value (CFU / 15 min exposure)";
                
             
            }
            else {
                scope.ExposureShow = false;
                scope.VolumeOfAirShow = false;
                scope.DivDTTimeControlIdShow = true;
               
                scope.NewDCModel.DTExposureStartTimeControlId = "";
                scope.NewDCModel.DTExposureEndTimeControlId = "";
                scope.NewDCModel.DTExposureTimeControlId = "";

                scope.Div_DTCompletionDate1ControlId = false;
                scope.Div_DTCompletionDate2ControlId = false;
                scope.NewDCModel.DTCompletionDate1ControlId = "";
                scope.NewDCModel.DTCompletionDate2ControlId = "";

                document.getElementById('lblTVBActualValue').innerHTML = "Actual Value";
                document.getElementById('lblYMCActualValue').innerHTML = "Actual Value";

              
            }
        }

        OneViewConsole.Debug("SamplingSheetAndAirHandler End", "AnswerMode.SamplingSheetAndAirHandler");
    }
    catch (Excep) {

        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.SamplingSheetAndAirHandler", Excep);
    }

}

function SamplingSheetAndHandsSwabHandler(option) {
    try {
        OneViewConsole.Debug("SamplingSheetAndHandsSwabHandler Start", "AnswerMode.SamplingSheetAndHandsSwabHandler");

        var ParameterTested = "";
        if (option.ControlId == "chkParameterTested") {
            if (option.Id == 145) {//Staph
                ParameterTested = "StaphShow";
                if (option.Selected == false) {
                    Clear({ Type: "TEXTBOX", ControlId: "txtActualValue1ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation1ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtStaphAnalyzedByControlId" });
                }
            }
            else if (option.Id == 146) {//Ecoli              
                ParameterTested = "EcoliShow";
                if (option.Selected == false) {
                    Clear({ Type: "TEXTBOX", ControlId: "txtActualValue2ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation2ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtEcoliAnalyzedByControlId" });
                }
            }


            scope.StaphShow = false;
            scope.EcoliShow = false;


            //scope[ParameterTested] = true;
            if (option.Selected == true) {
                scope[ParameterTested] = true;
            }
            else {
                scope[ParameterTested] = false;
            }

        }

        else if (option.ControlId == "chkGeneralAppearance") {
            if (option.Id == 115 && option.Selected == true) {
                scope.AppearanceRemarksShow = true;
                
                scope.divExpectedConditions = true;
            }
            else if (option.Id == 114 && option.Selected == true) {
                scope.AppearanceRemarksShow = false;
                scope.NewDCModel.txtAppearanceRemarksControlId = "";

                scope.divExpectedConditions = false;
                scope["AddlUnsatisfactoryExpectedConditionsControlId"].Clear();
            }
            else {
                scope.AppearanceRemarksShow = false;
                scope.NewDCModel.txtAppearanceRemarksControlId = "";

                scope.divExpectedConditions = false;
                scope["AddlUnsatisfactoryExpectedConditionsControlId"].Clear();
            }


        }

        OneViewConsole.Debug("SamplingSheetAndHandsSwabHandler End", "AnswerMode.SamplingSheetAndHandsSwabHandler");
    }
    catch (Excep) {

        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.SamplingSheetAndHandsSwabHandler", Excep);
    }
}

function SamplingSheetAndLinenOrEquipmentSwabHandler(option) {
    try {
        OneViewConsole.Debug("SamplingSheetAndLinenOrEquipmentSwabHandler Start", "AnswerMode.SamplingSheetAndLinenOrEquipmentSwabHandler");

        var ParameterTested = "";
        if (option.ControlId == "chkParameterTested") {
            if (option.Id == 147) {//TVB
                ParameterTested = "TVBShow";
                if (option.Selected == false) {
                    Clear({ Type: "TEXTBOX", ControlId: "txtActualValue1ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation1ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtTVBAnalyzedByControlId" });
                }
            }
            else if (option.Id == 148) {//Coliforms              
                ParameterTested = "ColiformsShow";
                if (option.Selected == false) {
                    Clear({ Type: "TEXTBOX", ControlId: "txtActualValue2ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation2ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtColiformsAnalyzedByControlId" });
                }
            }
            else if (option.Id == 149) {//Ecoli              
                ParameterTested = "EcoliShow";
                if (option.Selected == false) {
                    Clear({ Type: "TEXTBOX", ControlId: "txtActualValue3ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation3ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtEcoliAnalyzedByControlId" });
                }
            }
            else if (option.Id == 150) {//Listeria              
                ParameterTested = "ListeriaShow";
                if (option.Selected == false) {
                    Clear({ Type: "TEXTBOX", ControlId: "txtActualValue4ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation4ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtListeriaAnalyzedByControlId" });
                }
            }
            else if (option.Id == 151) {//YeasAndMould           
                ParameterTested = "YeasAndMouldShow";
                if (option.Selected == false) {
                    Clear({ Type: "TEXTBOX", ControlId: "txtActualValue5ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation5ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtYeasAndMouldAnalyzedByControlId" });
                }
            }


            scope.TVBShow = false;
            scope.ColiformsShow = false;
            scope.EcoliShow = false;
            scope.ListeriaShow = false;
            scope.YeasAndMouldShow = false;


            // scope[ParameterTested] = true;
            if (option.Selected == true) {
                scope[ParameterTested] = true;
            }
            else {
                scope[ParameterTested] = false;
            }

        }

        OneViewConsole.Debug("SamplingSheetAndLinenOrEquipmentSwabHandler End", "AnswerMode.SamplingSheetAndLinenOrEquipmentSwabHandler");
    }
    catch (Excep) {

        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.SamplingSheetAndLinenOrEquipmentSwabHandler", Excep);
    }

}

function AircraftLoadingHandler(option) {
    try {
        OneViewConsole.Debug("AircraftLoadingHandler Start", "AnswerMode.AircraftLoadingHandler");
       
        if (option.ControlId == "chkChillerAvailability") {
            if (option.Id == 1 && option.Selected == true) {//Yes
                scope.DivGalleryChillerShow = true;
            }
            else {
                scope.DivGalleryChillerShow = false;
                scope.NewDCModel.ATGalleyChillerTempControlId = "";
            }
        }

        OneViewConsole.Debug("AircraftLoadingHandler End", "AnswerMode.AircraftLoadingHandler");
    }
    catch (Excep) {

        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.AircraftLoadingHandler", Excep);
    }

}

function SamplingSheetAndAllergenHandler(option) {
    try {
        OneViewConsole.Debug("SamplingSheetAndAllergenHandler Start", "AnswerMode.SamplingSheetAndAllergenHandler");

        var ParameterTested = "";
        if (option.ControlId == "chkParameterTested") {
            if (option.Id == 152) {//Total Milk Allergen
                ParameterTested = "DivMilkShow";

                if (option.Selected == false) {
                    Clear({ Type: "TEXTBOX", ControlId: "txtDetectionLimit1ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlUnitSecond1ControlId" });
                    Clear({ Type: "Band", ControlId: "txtDetectedValue1ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation1ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtRemarks1ControlId" });                    
                }
            }
            else if (option.Id == 153) {//Egg Allergen              
                ParameterTested = "DivEggShow";
                if (option.Selected == false) {
                    Clear({ Type: "TEXTBOX", ControlId: "txtDetectionLimit2ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlUnitSecond2ControlId" });
                    Clear({ Type: "Band", ControlId: "txtDetectedValue2ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation2ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtRemarks2ControlId" });
                }
            }
            else if (option.Id == 154) {//Almond Allergen              
                ParameterTested = "DivAlmondShow";
                if (option.Selected == false) {
                    Clear({ Type: "TEXTBOX", ControlId: "txtDetectionLimit3ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlUnitSecond3ControlId" });
                    Clear({ Type: "Band", ControlId: "txtDetectedValue3ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation3ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtRemarks3ControlId" });
                }
            }
            else if (option.Id == 155) {//Peanut Allergen              
                ParameterTested = "DivPeanutShow";
                if (option.Selected == false) {
                    Clear({ Type: "TEXTBOX", ControlId: "txtDetectionLimit4ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlUnitSecond4ControlId" });
                    Clear({ Type: "Band", ControlId: "txtDetectedValue4ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation4ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtRemarks4ControlId" });
                }
            }
            else if (option.Id == 156) {//Gladin Allergen           
                ParameterTested = "DivGladinShow";
                if (option.Selected == false) {
                    Clear({ Type: "TEXTBOX", ControlId: "txtDetectionLimit5ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlUnitSecond5ControlId" });
                    Clear({ Type: "Band", ControlId: "txtDetectedValue5ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation5ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtRemarks5ControlId" });
                }
            }
            else if (option.Id == 157) {//Mustard Allergen           
                ParameterTested = "DivMustardShow";
                if (option.Selected == false) {
                    Clear({ Type: "TEXTBOX", ControlId: "txtDetectionLimit6ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlUnitSecond6ControlId" });
                    Clear({ Type: "Band", ControlId: "txtDetectedValue6ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation6ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtRemarks6ControlId" });
                }
            }
            else if (option.Id == 158) {//Soy Allergen           
                ParameterTested = "DivSoyShow";
                if (option.Selected == false) {
                    Clear({ Type: "TEXTBOX", ControlId: "txtDetectionLimit7ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlUnitSecond7ControlId" });
                    Clear({ Type: "Band", ControlId: "txtDetectedValue7ControlId" });
                    Clear({ Type: "DDL", ControlId: "AddlEvaluation7ControlId" });
                    Clear({ Type: "TEXTBOX", ControlId: "txtRemarks7ControlId" });
                }
            }


            scope.DivMilkShow = false;
            scope.DivEggShow = false;
            scope.DivAlmondShow = false;
            scope.DivPeanutShow = false;
            scope.DivGladinShow = false;
            scope.DivMustardShow = false;
            scope.DivSoyShow = false;
            


            // scope[ParameterTested] = true;
            if (option.Selected == true) {
                scope[ParameterTested] = true;
            }
            else {
                scope[ParameterTested] = false;
            }

        }
        else if (option.ControlId == "txtDetectedValue1ControlId") {          
            if (option.Name == "<5" && option.Selected == true) {
                scope.NewDCModel.txtRemarks1ControlId = "The result obtained indicates that the sample contains less than 5 ppm of Milk Allergen sample";
            }
            else if (option.Name == "5" && option.Selected == true) {
                scope.NewDCModel.txtRemarks1ControlId = "The result obtained indicates that the sample is equal to 5 ppm of Milk Allergen sample";
            }
            else if (option.Name == ">5" && option.Selected == true) {
                scope.NewDCModel.txtRemarks1ControlId = "The result obtained indicates that the sample contains greater than 5 ppm of Milk Allergen sample";
            }
            else {
                scope.NewDCModel.txtRemarks1ControlId = "";
            }
        }
        else if (option.ControlId == "txtDetectedValue2ControlId") {
            if (option.Name == "<5" && option.Selected == true) {
                scope.NewDCModel.txtRemarks2ControlId = "The result obtained indicates that the sample contains less than 5 ppm of Egg Allergen sample";
            } 
            else if (option.Name == "5" && option.Selected == true) {
                scope.NewDCModel.txtRemarks2ControlId = "The result obtained indicates that the sample is equal to 5 ppm of Egg Allergen sample";
            }
            else if (option.Name == ">5" && option.Selected == true) {
                scope.NewDCModel.txtRemarks2ControlId = "The result obtained indicates that the sample contains greater than 5 ppm of Egg Allergen sample";
            }
            else {
                scope.NewDCModel.txtRemarks2ControlId = "";
            }
        }
        else if (option.ControlId == "txtDetectedValue3ControlId") {
            if (option.Name == "<5" && option.Selected == true) {
                scope.NewDCModel.txtRemarks3ControlId = "The result obtained indicates that the sample contains less than 5 ppm of Almond Allergen sample";
            }
            else if (option.Name == "5" && option.Selected == true) {
                scope.NewDCModel.txtRemarks3ControlId = "The result obtained indicates that the sample is equal to 5 ppm of Almond Allergen sample";
            }
            else if (option.Name == ">5" && option.Selected == true) {
                scope.NewDCModel.txtRemarks3ControlId = "The result obtained indicates that the sample contains greater than 5 ppm of Almond Allergen sample";
            }
            else {
                scope.NewDCModel.txtRemarks3ControlId = "";
            }
        }
        else if (option.ControlId == "txtDetectedValue4ControlId") {
            if (option.Name == "<5" && option.Selected == true) {
                scope.NewDCModel.txtRemarks4ControlId = "The result obtained indicates that the sample contains less than 5 ppm of Peanut Allergen sample";
            }
            else if (option.Name == "5" && option.Selected == true) {
                scope.NewDCModel.txtRemarks4ControlId = "The result obtained indicates that the sample is equal to 5 ppm of Peanut Allergen sample";
            }
            else if (option.Name == ">5" && option.Selected == true) {
                scope.NewDCModel.txtRemarks4ControlId = "The result obtained indicates that the sample contains greater than 5 ppm of Peanut Allergen sample";
            }
            else {
                scope.NewDCModel.txtRemarks4ControlId = "";
            }
        }
        else if (option.ControlId == "txtDetectedValue5ControlId") {
            if (option.Name == "<10" && option.Selected == true) {
                scope.NewDCModel.txtRemarks5ControlId = "The result obtained indicates that the sample contains less than 10 ppm of Gliadin Allergen sample";
            }
            else if (option.Name == "10" && option.Selected == true) {
                scope.NewDCModel.txtRemarks5ControlId = "The result obtained indicates that the sample is equal to 10 ppm of Gliadin Allergen sample";
            }
            else if (option.Name == ">10" && option.Selected == true) {
                scope.NewDCModel.txtRemarks5ControlId = "The result obtained indicates that the sample contains greater than 10 ppm of Gliadin Allergen sample";
            }
            else {
                scope.NewDCModel.txtRemarks5ControlId = "";
            }
        }
        else if (option.ControlId == "txtDetectedValue6ControlId") {
            if (option.Name == "<2.5" && option.Selected == true) {
                scope.NewDCModel.txtRemarks6ControlId = "The result obtained indicates that the sample contains less than 2.5 ppm of Mustard Allergen sample";
            }
            else if (option.Name == "2.5" && option.Selected == true) {
                scope.NewDCModel.txtRemarks6ControlId = "The result obtained indicates that the sample is equal to 2.5 ppm of Mustard Allergen sample";
            }
            else if (option.Name == ">2.5" && option.Selected == true) {
                scope.NewDCModel.txtRemarks6ControlId = "The result obtained indicates that the sample contains greater than 2.5 ppm of Mustard Allergen sample";
            }
            else {
                scope.NewDCModel.txtRemarks6ControlId = "";
            }
        }
        else if (option.ControlId == "txtDetectedValue7ControlId") {
            if (option.Name == "<2.5" && option.Selected == true) {
                scope.NewDCModel.txtRemarks7ControlId = "The result obtained indicates that the sample contains less than 2.5 ppm of Soy Allergen sample";
            }
            else if (option.Name == "2.5" && option.Selected == true) {
                scope.NewDCModel.txtRemarks7ControlId = "The result obtained indicates that the sample is equal to 2.5 ppm of Soy Allergen sample";
            }
            else if (option.Name == ">2.5" && option.Selected == true) {
                scope.NewDCModel.txtRemarks7ControlId = "The result obtained indicates that the sample contains greater than 2.5 ppm of Soy Allergen sample";
            }
            else {
                scope.NewDCModel.txtRemarks7ControlId = "";
            }
        }
      

        OneViewConsole.Debug("SamplingSheetAndAllergenHandler End", "AnswerMode.SamplingSheetAndAllergenHandler");
    }
    catch (Excep) {

        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.SamplingSheetAndAllergenHandler", Excep);
    }

}

function AirlineComplaintSampleHandler(option) {
    try {
        OneViewConsole.Debug("SamplingSheetAndAllergenHandler Start", "AnswerMode.SamplingSheetAndAllergenHandler");

    
        if (option.ControlId == "chkSourceofForeignObjectControlId") {              
            if (option.Id == 165 && option.Selected == true) {//Others
                scope["DivOthers"] = true;
            }
            else {
                scope["DivOthers"] = false;
                scope.NewDCModel.txtOthersControlId = "";
                
            }
        }
        else if (option.ControlId == "chkSampleSourceControlId") {
            if (option.Id == 167 && option.Selected == true) {//Supplier
                scope["DivForwardCPD"] = true;
                scope["DivFoodPoint"] = false;
                scope.NewDCModel.txtFrwdFoodPointControlId = "";
            }
            else if (option.Id == 168 && option.Selected == true) {//Food Point
                scope["DivForwardCPD"] = false;
                scope["DivFoodPoint"] = true;
                scope.NewDCModel.txtForwardingtoCPDControlId = "";
            }
            else {
                scope["DivForwardCPD"] = false;
                scope["DivFoodPoint"] = false;
                scope.NewDCModel.txtFrwdFoodPointControlId = "";
                scope.NewDCModel.txtForwardingtoCPDControlId = "";
            }
        }

        OneViewConsole.Debug("SamplingSheetAndAllergenHandler End", "AnswerMode.SamplingSheetAndAllergenHandler");
    }
    catch (Excep) {

        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.SamplingSheetAndAllergenHandler", Excep);
    }

}

function Clear(_oPrimarayAnswerModeInfo) {
    try {
        OneViewConsole.Debug("Clear Start", "AnswerMode.Clear");
    //var _oPrimarayAnswerModeInfo = TemplateNodes[itrAttrId].AnswerMode[0];
        //alert(_oPrimarayAnswerModeInfo.Type + _oPrimarayAnswerModeInfo.ControlId);

       // var scope
    if (_oPrimarayAnswerModeInfo.Type == 'CHECKBOX') {
        scope.NewDCModel[_oPrimarayAnswerModeInfo.ControlId] = false;
    }
    else if (_oPrimarayAnswerModeInfo.Type == 'DDL') {
        //(JSON.stringify(_oPrimarayAnswerModeInfo));
        var _oddl = scope[_oPrimarayAnswerModeInfo.ControlId];
        _oddl.Clear();
    }
    else if (_oPrimarayAnswerModeInfo.Type == 'Band') {
        var _oddl = scope[_oPrimarayAnswerModeInfo.ControlId];
        _oddl.Clear();
    }
    else if (_oPrimarayAnswerModeInfo.Type == 'TIME') {
        var temp = document.getElementById(_oPrimarayAnswerModeInfo.ControlId);
        if (temp != null)
            temp.value = '';    
    }
    else if (_oPrimarayAnswerModeInfo.Type == 'DATAURL') {
        scope.lblSignature = "";
        if (document.getElementById('lblEnterName') != null) {
            document.getElementById('lblEnterName').value = "";
        }

        if (scope[_oPrimarayAnswerModeInfo.ControlId + "_lblSignature"] != undefined || scope[_oPrimarayAnswerModeInfo.ControlId + "_lblSignature"] != "") {
            scope[_oPrimarayAnswerModeInfo.ControlId + "_lblSignature"] = "";
        }

        if (scope[_oPrimarayAnswerModeInfo.ControlId + "_SignaturePad"] != undefined && scope[_oPrimarayAnswerModeInfo.ControlId + "_SignaturePad"] != "") {
            scope[_oPrimarayAnswerModeInfo.ControlId + "_SignaturePad"] = "";
        }
    }
    else {
        scope.NewDCModel[_oPrimarayAnswerModeInfo.ControlId] = '';
    }
    OneViewConsole.Debug("Clear End", "AnswerMode.Clear");
}
    catch (Excep) {
        //alert(Excep);
        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.SamplingSheetAndAllergenHandler", Excep);
    }
}


function LaminarAirFlowHandler(option) {
    try {
        OneViewConsole.Debug("LaminarAirFlowHandler Start", "AnswerMode.LaminarAirFlowHandler");

        if (option.ControlId == "chkTestMethod") {
            if (option.Id == 68 && option.Selected == true) {//Air Sampler
                scope.AirSamplerDetailsShow = true;
                scope.OpenPlateDetailsShow = false;
                scope.NewDCModel.DTExposureStartTimeControlId = "";
                scope.NewDCModel.DTExposureEndTimeControlId = "";
                scope.NewDCModel.DTExposureTimeControlId = "";

                scope.DTExposureStartTimeControlId_DateTime = "";
                scope.DTExposureEndTimeControlId_DateTime = "";
                scope.DTExposureTimeControlId_DateTime = "";

                document.getElementById('lblTVBColonyCount').innerHTML = "Colony Count CFU / m&#179";
                document.getElementById('lblYMCColonyCount').innerHTML = "Colony Count CFU / m&#179";
                
                
            }
            else if (option.Id == 69 && option.Selected == true) {//Open Plate              
                scope.AirSamplerDetailsShow = false;
                scope.OpenPlateDetailsShow = true;
                scope.NewDCModel.txtVolumeOfAirControlId = "";
                scope.NewDCModel.DTTimeControlId = "";

                document.getElementById('lblTVBColonyCount').innerHTML = "Colony Count CFU / 15 min exposure";
                document.getElementById('lblYMCColonyCount').innerHTML = "Colony Count CFU / 15 min exposure";
            }
            else {
                scope.AirSamplerDetailsShow = false;
                scope.OpenPlateDetailsShow = false;

                scope.NewDCModel.txtVolumeOfAirControlId = "";
                scope.NewDCModel.DTTimeControlId = "";

                scope.NewDCModel.DTExposureStartTimeControlId = "";
                scope.NewDCModel.DTExposureEndTimeControlId = "";
                scope.NewDCModel.DTExposureTimeControlId = "";

                scope.DTExposureStartTimeControlId_DateTime = "";
                scope.DTExposureEndTimeControlId_DateTime = "";
                scope.DTExposureTimeControlId_DateTime = "";

                document.getElementById('lblTVBColonyCount').innerHTML = "Colony Count CFU / m&#179";
                document.getElementById('lblYMCColonyCount').innerHTML = "Colony Count CFU / m&#179";

            }
        }
        else if (option.ControlId == "chkParameterTested") {
            if (option.Id == 179 && option.Selected == true) {//TVB
                scope.TVBShow = true;
                scope.YMCShow = false;
            }
            else if (option.Id == 179 && option.Selected == false) {
                scope.TVBShow = false;
                scope.NewDCModel.txtColonyCountControlId = "";
                scope.NewDCModel.AddlEvaluationControlId = "";
                scope.NewDCModel.txtResultControlId = "";
            }
            if (option.Id == 180 && option.Selected == true) {//YMC
                scope.TVBShow = false;
                scope.YMCShow = true;
            }
            else if (option.Id == 180 && option.Selected == false) {
               // scope.TVBShow = false;
                scope.YMCShow = false;
             

                scope.NewDCModel.txtColonyCount2ControlId = "";
                scope.NewDCModel.AddlEvaluation2ControlId = "";
                scope.NewDCModel.txtResult2ControlId = "";
            }
        }

        OneViewConsole.Debug("LaminarAirFlowHandler End", "AnswerMode.LaminarAirFlowHandler");
    }
    catch (Excep) {

        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.LaminarAirFlowHandler", Excep);
    }

}

function MonthlyVerificationofProbeThermometerHandler(option) {
    try {
        OneViewConsole.Debug("MonthlyVerificationofProbeThermometerHandler Start", "AnswerMode.MonthlyVerificationofProbeThermometerHandler");

        if (option.ControlId == "ChkThermometerStatusControlId") {

            if (option.Name == "Not Available" && option.Selected == true) {//Air Sampler



                scope.DateOfVerificationShow = false;
                scope.ICECAPmethodShow = false;
                scope.ValidatorMethodShow = false;
                scope.OtherhermometerStatusShow = false;
                scope.NewDCModel.txtTOtherThermometerStatusControlId = "";
            }
            else if (option.Name == "Not Available" && option.Selected == false) {

                scope.DateOfVerificationShow = true;
                scope.ICECAPmethodShow = true;
                scope.ValidatorMethodShow = true;
                scope.OtherhermometerStatusShow = false;
                scope.NewDCModel.txtTOtherThermometerStatusControlId = "";
            }

            if (option.Name == "Damage" && option.Selected == true) {//Air Sampler


                scope.DateOfVerificationShow = false;
                scope.ICECAPmethodShow = false;
                scope.ValidatorMethodShow = false;
                scope.OtherhermometerStatusShow = false;
                scope.NewDCModel.txtTOtherThermometerStatusControlId = "";
            }
            else if (option.Name == "Damage" && option.Selected == false) {

                scope.DateOfVerificationShow = true;
                scope.ICECAPmethodShow = true;
                scope.ValidatorMethodShow = true;
                scope.OtherhermometerStatusShow = false;
                scope.NewDCModel.txtTOtherThermometerStatusControlId = "";
            }

            if (option.Name == "Lost" && option.Selected == true) {//Air Sampler

                scope.DateOfVerificationShow = false;
                scope.ICECAPmethodShow = false;
                scope.ValidatorMethodShow = false;
                scope.OtherhermometerStatusShow = false;
                scope.NewDCModel.txtTOtherThermometerStatusControlId = "";
            }
            else if (option.Name == "Lost" && option.Selected == false) {

                scope.DateOfVerificationShow = true;
                scope.ICECAPmethodShow = true;
                scope.ValidatorMethodShow = true;
                scope.OtherhermometerStatusShow = false;
                scope.NewDCModel.txtTOtherThermometerStatusControlId = "";
            }

            if (option.Name == "Other" && option.Selected == true) {//Air Sampler


                scope.DateOfVerificationShow = false;
                scope.ICECAPmethodShow = false;
                scope.ValidatorMethodShow = false;
                scope.OtherhermometerStatusShow = true;
            }
            else if (option.Name == "Other" && option.Selected == false) {

                scope.DateOfVerificationShow = true;
                scope.ICECAPmethodShow = true;
                scope.ValidatorMethodShow = true;
                scope.OtherhermometerStatusShow = false;
                scope.NewDCModel.txtTOtherThermometerStatusControlId = "";
            }

        }
        OneViewConsole.Debug("MonthlyVerificationofProbeThermometerHandler End", "AnswerMode.MonthlyVerificationofProbeThermometerHandler");
    }
    catch (Excep) {
        //alert("Excep : " + Excep)
        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.MonthlyVerificationofProbeThermometerHandler", Excep);
    }

}


function YearlyVerificationofProbeThermometerHandler(option) {
    try {
        OneViewConsole.Debug("YearlyVerificationofProbeThermometerHandler Start", "AnswerMode.YearlyVerificationofProbeThermometerHandler");

        if (option.ControlId == "ChkThermometerStatusControlId") {

            if (option.Name == "Not Available" && option.Selected == true) {//Air Sampler

                scope.DateOfVerificationShow = false;
                scope.TestCap1methodShow = false;
                scope.TestCap2methodShow = false;
                scope.TestCap3methodShow = false;
                scope.BoilingWaterShow = false;
                scope.OtherhermometerStatusShow = false;
                scope.NewDCModel.txtTOtherThermometerStatusControlId = "";
            }
            else if (option.Name == "Not Available" && option.Selected == false) {

                scope.DateOfVerificationShow = true;
                scope.TestCap1methodShow = true;
                scope.TestCap2methodShow = true;
                scope.TestCap3methodShow = true;
                scope.BoilingWaterShow = true;
                scope.OtherhermometerStatusShow = false;
                scope.NewDCModel.txtTOtherThermometerStatusControlId = "";
            }

            if (option.Name == "Damage" && option.Selected == true) {//Air Sampler


                scope.DateOfVerificationShow = false;
                scope.TestCap1methodShow = false;
                scope.TestCap2methodShow = false;
                scope.TestCap3methodShow = false;
                scope.BoilingWaterShow = false;
                scope.OtherhermometerStatusShow = false;
                scope.NewDCModel.txtTOtherThermometerStatusControlId = "";
            }
            else if (option.Name == "Damage" && option.Selected == false) {

                scope.DateOfVerificationShow = true;
                scope.TestCap1methodShow = true;
                scope.TestCap2methodShow = true;
                scope.TestCap3methodShow = true;
                scope.BoilingWaterShow = true;
                scope.OtherhermometerStatusShow = false;
                scope.NewDCModel.txtTOtherThermometerStatusControlId = "";
            }

            if (option.Name == "Lost" && option.Selected == true) {//Air Sampler

                scope.DateOfVerificationShow = false;
                scope.TestCap1methodShow = false;
                scope.TestCap2methodShow = false;
                scope.TestCap3methodShow = false;
                scope.BoilingWaterShow = false;
                scope.OtherhermometerStatusShow = false;
                scope.NewDCModel.txtTOtherThermometerStatusControlId = "";
            }
            else if (option.Name == "Lost" && option.Selected == false) {

                scope.DateOfVerificationShow = true;
                scope.TestCap1methodShow = true;
                scope.TestCap2methodShow = true;
                scope.TestCap3methodShow = true;
                scope.BoilingWaterShow = true;
                scope.OtherhermometerStatusShow = false;
                scope.NewDCModel.txtTOtherThermometerStatusControlId = "";
            }

            if (option.Name == "Other" && option.Selected == true) {//Air Sampler


                scope.DateOfVerificationShow = false;
                scope.TestCap1methodShow = false;
                scope.TestCap2methodShow = false;
                scope.TestCap3methodShow = false;
                scope.BoilingWaterShow = false;
                scope.OtherhermometerStatusShow = true;
            }
            else if (option.Name == "Other" && option.Selected == false) {

                scope.DateOfVerificationShow = true;
                scope.TestCap1methodShow = true;
                scope.TestCap2methodShow = true;
                scope.TestCap3methodShow = true;
                scope.BoilingWaterShow = true;
                scope.OtherhermometerStatusShow = false;
                scope.NewDCModel.txtTOtherThermometerStatusControlId = "";
            }

        }
        OneViewConsole.Debug("YearlyVerificationofProbeThermometerHandler End", "AnswerMode.YearlyVerificationofProbeThermometerHandler");
    }
    catch (Excep) {
        alert("Excep : " + Excep)
        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.YearlyVerificationofProbeThermometerHandler", Excep);
    }

}

function MonthlyVerificationofIRThermometerHandler(option) {
    try {
        OneViewConsole.Debug("MonthlyVerificationofIRThermometerHandler Start", "AnswerMode.MonthlyVerificationofIRThermometerHandler");

        if (option.ControlId == "ChkThermometerStatusControlId") {

            if (option.Name == "Not Available" && option.Selected == true) {//Air Sampler



                scope.DateOfVerificationShow = false;
                scope.ICECAPmethodShow = false;
                scope.ValidatorMethodShow = false;
                scope.OtherhermometerStatusShow = false;
                scope.NewDCModel.txtTOtherThermometerStatusControlId = "";
            }
            else if (option.Name == "Not Available" && option.Selected == false) {

                scope.DateOfVerificationShow = true;
                scope.ICECAPmethodShow = true;
                scope.ValidatorMethodShow = true;
                scope.OtherhermometerStatusShow = false;
                scope.NewDCModel.txtTOtherThermometerStatusControlId = "";
            }

            if (option.Name == "Damage" && option.Selected == true) {//Air Sampler


                scope.DateOfVerificationShow = false;
                scope.ICECAPmethodShow = false;
                scope.ValidatorMethodShow = false;
                scope.OtherhermometerStatusShow = false;
                scope.NewDCModel.txtTOtherThermometerStatusControlId = "";
            }
            else if (option.Name == "Damage" && option.Selected == false) {

                scope.DateOfVerificationShow = true;
                scope.ICECAPmethodShow = true;
                scope.ValidatorMethodShow = true;
                scope.OtherhermometerStatusShow = false;
                scope.NewDCModel.txtTOtherThermometerStatusControlId = "";
            }

            if (option.Name == "Lost" && option.Selected == true) {//Air Sampler

                scope.DateOfVerificationShow = false;
                scope.ICECAPmethodShow = false;
                scope.ValidatorMethodShow = false;
                scope.OtherhermometerStatusShow = false;
                scope.NewDCModel.txtTOtherThermometerStatusControlId = "";
            }
            else if (option.Name == "Lost" && option.Selected == false) {

                scope.DateOfVerificationShow = true;
                scope.ICECAPmethodShow = true;
                scope.ValidatorMethodShow = true;
                scope.OtherhermometerStatusShow = false;
                scope.NewDCModel.txtTOtherThermometerStatusControlId = "";
            }

            if (option.Name == "Other" && option.Selected == true) {//Air Sampler


                scope.DateOfVerificationShow = false;
                scope.ICECAPmethodShow = false;
                scope.ValidatorMethodShow = false;
                scope.OtherhermometerStatusShow = true;
            }
            else if (option.Name == "Other" && option.Selected == false) {

                scope.DateOfVerificationShow = true;
                scope.ICECAPmethodShow = true;
                scope.ValidatorMethodShow = true;
                scope.OtherhermometerStatusShow = false;
                scope.NewDCModel.txtTOtherThermometerStatusControlId = "";
            }

        }
        OneViewConsole.Debug("MonthlyVerificationofIRThermometerHandler End", "AnswerMode.MonthlyVerificationofIRThermometerHandler");
    }
    catch (Excep) {
        alert("Excep : " + Excep)
        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.MonthlyVerificationofIRThermometerHandler", Excep);
    }

}


function PreAcceptanceQuestionnaireHandler2222(option) {
    try {
        OneViewConsole.Debug("PreAcceptanceQuestionnaireHandler Start", "OneViewAdvAnswerModeUserControl.PreAcceptanceQuestionnaireHandler");

        if (option.ControlId == "chkLocalWasteProcedureControlId") {
            if (option.Id == 1 && option.Selected == true) {
                scope.Div_AwareofProcedure = true;               
             
            }
            else if (option.Id == 1 && option.Selected == false) {
                scope.Div_AwareofProcedure = false;
                scope["chkAwareofProcedureControlId"].Clear();
                scope.NewDCModel.txtAwareofProcedureCommentControlId = "";
            }
            else {
                scope.Div_AwareofProcedure = false;
                scope["chkAwareofProcedureControlId"].Clear();
                scope.NewDCModel.txtAwareofProcedureCommentControlId = "";
            }
        }
        if (option.ControlId == "chkSegregationChartControlId") {
            if (option.Id == 1 && option.Selected == true) {
                scope.Div_Location = true;

            }
            else if (option.Id == 1 && option.Selected == false) {
                scope.Div_Location = false;               
                scope.NewDCModel.txtLocationControlId = "";
            }
            else {
                scope.Div_Location = false;         
                scope.NewDCModel.txtLocationControlId = "";
            }
        }
        if (option.ControlId == "chkGeneralDomesticControlId" ) {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkGDContainerTypeControlId"].Clear();
            }          
        }
        if (option.ControlId == "chkGeneralDomesticglassControlId" ) {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkGDGlassContainerTypeControlId"].Clear();
            }
        }
        if ( option.ControlId == "chkConfidentialWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkConfidentialWasteContainerTypeControlId"].Clear();
            }
        }
        if ( option.ControlId == "chkPrinterCartridgesControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkPrintercartridgesContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkCytotoxicSharpsControlId" ) {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkCytotoxicSharpsContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkNonsharpwasteControlId" ) {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkNonsharpwasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkCytotoxicIncontinenceWasteControlId" ) {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkCytotoxicIncontinenceWasteContainerTypeControlId"].Clear();
            }
        }
        if ( option.ControlId == "chkMedicinallysharpsControlId" ) {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkMedicinallyContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkNonsharpsMedicinalControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkNonsharpsMedicinalContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkControlledDrugsControlId" ) {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkControlledDrugsContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkSharpsWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkSharpsWasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkNonSharpsWasteControlId" ) {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkNonSharpsWasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkNonCytotoxicControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkNonCytotoxicContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkNonMedicinalSharpsControlId" ) {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkNonMedicinalSharpsContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkInfectiousWasteControlId" ) {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkInfectiousWasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkOffensiveWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkOffensiveWasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkAutoclavedWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkAutoclavedWasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkAnatomicalWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkAnatomicalWasteContainerTypeControlId"].Clear();
            }
        }
        
        if (option.ControlId == "chkAmalgamControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkAmalgamContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkGypsumControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkGypsumContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkHandGelPouchesControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkHandGelPouchesContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkWasteChemicalsControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkWasteChemicalsContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkCatAdiagnosticsControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkCatAdiagnosticsContainerTypeControlId"].Clear();
            }
        }

        OneViewConsole.Debug("PreAcceptanceQuestionnaireHandler End", "OneViewAdvAnswerModeUserControl.PreAcceptanceQuestionnaireHandler");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAnswerModeUserControl.BandSelection", Excep);
    }
}


///////////////////////////////////***************************************CMFT Code START******************************************////////////////////////////////


function PreAcceptanceCompositionAnalysisHandler(option) {
    try {
        OneViewConsole.Debug("PreAcceptanceCompositionAnalysisHandler Start", "AnswerMode.PreAcceptanceCompositionAnalysisHandler");

        if (option.ControlId == "ChkContainerTypeDummyBandControlId") {

            if (option.Name == "Sharps Bin") {//Sharps Bin
                ShowHidePreAcceptanceCompositionAnalysis('SharpsBinShow', option.Selected);
                if (option.Selected == false) {
                    //hide others
                    scope.SharpsBinOthersShow = false;
                    Clear({ Type: "Band", ControlId: "chkSharpsBinContainerTypeControlId" });                   
                }
            }
            else if (option.Name == "Rigid container Plastic") {//Rigid container Plastic
                ShowHidePreAcceptanceCompositionAnalysis('RigidPlasticShow', option.Selected);
                if (option.Selected == false) {
                    //hide others
                    scope.RigidPlasticOthersShow = false;
                    Clear({ Type: "Band", ControlId: "chkRigidPlasticContainerTypeControlId" });
                }
            }
            else if (option.Name == "Rigid Container Card") {//Rigid Container Card
                ShowHidePreAcceptanceCompositionAnalysis('RigidCardShow', option.Selected);
                if (option.Selected == false) {
                    //hide others
                    scope.RigidCardOthersShow = false;
                    Clear({ Type: "Band", ControlId: "chkRigidCardContainerTypeControlId" });
                }
            }
            else if (option.Name == "Bag") {//Bag
                ShowHidePreAcceptanceCompositionAnalysis('BagShow', option.Selected);
                if (option.Selected == false) {
                    //hide others
                    scope.BagOthersShow = false;
                    Clear({ Type: "Band", ControlId: "chkBagContainerTypeControlId" });
                }
            }
            else if (option.Name == "Glass Bucket") {//Glass Bucket
                ShowHidePreAcceptanceCompositionAnalysis('GlassBucketShow', option.Selected);
                if (option.Selected == false) {
                    //hide others
                    scope.GlassBucketOthersShow = false;
                    Clear({ Type: "Band", ControlId: "chkGlassBucketContainerTypeControlId" });
                }
            }
            else if (option.Name == "Cardboard Box") {//Cardboard Box
                ShowHidePreAcceptanceCompositionAnalysis('CardboardShow', option.Selected);
                if (option.Selected == false) {
                    //hide others
                    scope.CardboardBoxOthersShow = false;
                    Clear({ Type: "Band", ControlId: "chkCardboardBoxContainerTypeControlId" });
                }
            }
            else if (option.Name == "Cartridge Re-Cycling Box") {//Cartridge Re-Cycling Box
                ShowHidePreAcceptanceCompositionAnalysis('CartridgeReCyclingBoxShow', option.Selected);
                if (option.Selected == false) {
                    //hide others
                    scope.CartridgeReCyclingBoxOthersShow = false;
                    Clear({ Type: "Band", ControlId: "chkCartridgeReCyclingBoxContainerTypeControlId" });
                }
            }

           
        }
        //Contanminates fail 
        if (option.ControlId == "chkSharpsBinScoreContainerControlId") {//SharpsBin
            if (option.Name == "F" && option.Selected == true) {//F
                scope.SharpsBinContaminatesShow = true;
            }            
            else {
                scope.SharpsBinContaminatesShow = false;
                ClearMultiSelectionDDLBand("chkSharpsAmberFailContaminatesControlId");
                ClearMultiSelectionDDLBand("chkSharpsRedFailContaminatesControlId");
            }
        }
        if (option.ControlId == "chkRigidPlasticScoreContainerControlId") {//RigidPlastic
            if (option.Name == "F" && option.Selected == true) {//F
                scope.RigidPlasticContaminatesShow = true;
            }
            else {
                scope.RigidPlasticContaminatesShow = false;
                ClearMultiSelectionDDLBand("chkRigidPlasticAmberFailContaminatesControlId");
                ClearMultiSelectionDDLBand("chkRigidPlasticRedFailContaminatesControlId");
            }
        }
        if (option.ControlId == "chkRigidCardScoreContainerControlId") {//RigidCard
            if (option.Name == "F" && option.Selected == true) {//F
                scope.RigidCardContaminatesShow = true;
            }
            else {
                scope.RigidCardContaminatesShow = false;
                ClearMultiSelectionDDLBand("chkRigidCardAmberFailContaminatesControlId");
                ClearMultiSelectionDDLBand("chkRigidCardRedFailContaminatesControlId");
            }
        }
        if (option.ControlId == "chkBagScoreContainerControlId") {//BagScore
            if (option.Name == "F" && option.Selected == true) {//F
                scope.BagContaminatesShow = true;
            }
            else {
                scope.BagContaminatesShow = false;
                ClearMultiSelectionDDLBand("chkBagAmberFailContaminatesControlId");
                ClearMultiSelectionDDLBand("chkBagRedFailContaminatesControlId");
            }
        }
        if (option.ControlId == "chkGlassBucketScoreContainerControlId") {//GlassBucket
            if (option.Name == "F" && option.Selected == true) {//F
                scope.GlassBucketContaminatesShow = true;
            }
            else {
                scope.GlassBucketContaminatesShow = false;
                ClearMultiSelectionDDLBand("chkGlassBucketAmberFailContaminatesControlId");
                ClearMultiSelectionDDLBand("chkGlassBucketRedFailContaminatesControlId");
            }
        }
        if (option.ControlId == "chkCardboardBoxScoreContainerControlId") {//CardboardBox
            if (option.Name == "F" && option.Selected == true) {//F
                scope.CardboardBoxContaminatesShow = true;
            }
            else {
                scope.CardboardBoxContaminatesShow = false;
                ClearMultiSelectionDDLBand("chkCardboardBoxAmberFailContaminatesControlId");
                ClearMultiSelectionDDLBand("chkCardboardBoxRedFailContaminatesControlId");
            }
        }
        if (option.ControlId == "chkCartridgeReCyclingBoxScoreContainerControlId") {//CartridgeReCyclingBox
            if (option.Name == "F" && option.Selected == true) {//F
                scope.CartridgeReCyclingBoxContaminatesShow = true;
            }
            else {
                scope.CartridgeReCyclingBoxContaminatesShow = false;
                ClearMultiSelectionDDLBand("chkCartridgeReCyclingBoxAmberFailContaminatesControlId");
                ClearMultiSelectionDDLBand("chkCartridgeReCyclingBoxRedFailContaminatesControlId");
            }
        }
        if (option.ControlId == "chkSharpsBinContainerTypeControlId") {
            if (option.Name == "YES" && option.Selected == true) {//YES
                scope.SharpsBinDetailsShow = true;
            }
            else {
                //hide SharpsBinDetails
                scope.SharpsBinDetailsShow = false;

                Clear({ Type: "DDL", ControlId: "AddlSharpsBinSizeControlId" });
                Clear({ Type: "DDL", ControlId: "AddlSharpsBinColourCodeControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtSharpsBinOthersControlId" });


                Clear({ Type: "Band", ControlId: "chkSharpsBinLabelUsefulControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtSharpsBinLabelUsefulCommentsControlId" });

                Clear({ Type: "Band", ControlId: "chkSharpsBinLidMatchLabelControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtSharpsBinLidMatchLabelCommentsControlId" });

                Clear({ Type: "Band", ControlId: "chkBinProperlyAssembledControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtBinProperlyAssembledCommentsControlId" });

                Clear({ Type: "Band", ControlId: "chkAssembledByLabelCompletedControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtAssembledByLabelCompletedCommentsControlId" });

                Clear({ Type: "Band", ControlId: "chkClosureMechanismInUseControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtClosureMechanismInUseCommentsControlId" });

                Clear({ Type: "Band", ControlId: "chkSharpsBinOverfilledControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtSharpsBinOverfilledCommentsControlId" });

                Clear({ Type: "Band", ControlId: "chkBinLabelUsefulControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtBinLabelUsefulCommentsControlId" });



                Clear({ Type: "Band", ControlId: "chkSharpsBinScoreContainerControlId" });

                ClearMultiSelectionDDLBand("chkSharpsAmberFailContaminatesControlId");
                ClearMultiSelectionDDLBand("chkSharpsRedFailContaminatesControlId");
            }
        }
        else if (option.ControlId == "chkRigidPlasticContainerTypeControlId") {
            if (option.Name == "YES" && option.Selected == true) {//YES
                scope.RigidPlasticDetailsShow = true;
            }
            else {
                //hide RigidPlasticDetails
                scope.RigidPlasticDetailsShow = false;


                Clear({ Type: "DDL", ControlId: "AddlRigidPlasticSizeControlId" });
                Clear({ Type: "DDL", ControlId: "AddlRigidPlasticColourCodeControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtRigidPlasticOthersControlId" });


                Clear({ Type: "Band", ControlId: "chkRigidPlasticWasteTypesBinLabelControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtRigidPlasticWasteTypesBinLabelCommentsControlId" });

                Clear({ Type: "Band", ControlId: "chkRigidPlasticBinLabelUsefulControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtRigidPlasticBinLabelUsefulCommentsControlId" });

                Clear({ Type: "Band", ControlId: "chkRigidPlasticBinLidMatchLabelControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtRigidPlasticBinLidMatchLabelControlId" });



                Clear({ Type: "Band", ControlId: "chkRigidPlasticScoreContainerControlId" });

                ClearMultiSelectionDDLBand("chkRigidPlasticAmberFailContaminatesControlId");
                ClearMultiSelectionDDLBand("chkRigidPlasticRedFailContaminatesControlId");


            }
        }
        else if (option.ControlId == "chkRigidCardContainerTypeControlId") {
            if (option.Name == "YES" && option.Selected == true) {//YES
                scope.RigidCardDetailsShow = true;

                Clear({ Type: "DDL", ControlId: "AddlRigidCardSizeControlId" });
                Clear({ Type: "DDL", ControlId: "AddlRigidCardColourCodeControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtRigidCardOthersControlId" });


                Clear({ Type: "Band", ControlId: "chkRigidCardWasteTypesBinLabelControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtRigidCardWasteTypesBinLabelCommentsControlId" });

                Clear({ Type: "Band", ControlId: "chkRigidCardBinLabelUsefulControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtRigidCardBinLabelUsefulCommentsControlId" });

                Clear({ Type: "Band", ControlId: "chkRigidCardBinLidMatchLabelControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtRigidCardBinLidMatchLabelCommentsControlId" });



                Clear({ Type: "Band", ControlId: "chkRigidCardScoreContainerControlId" });


                ClearMultiSelectionDDLBand("chkRigidCardAmberFailContaminatesControlId");
                ClearMultiSelectionDDLBand("chkRigidCardRedFailContaminatesControlId");

            }
            else {
                //hide RigidCardDetails
                scope.RigidCardDetailsShow = false;
            }
        }
        else if (option.ControlId == "chkBagContainerTypeControlId") {
            if (option.Name == "YES" && option.Selected == true) {//YES
                scope.BagDetailsShow = true;
            }
            else {
                //hide BagDetails
                scope.BagDetailsShow = false;


                Clear({ Type: "DDL", ControlId: "AddlBagSizeControlId" });
                Clear({ Type: "DDL", ControlId: "AddlBagColourCodeControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtBagOthersControlId" });


                Clear({ Type: "Band", ControlId: "chkPedalBinLabelledControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtPedalBinLabelledCommentsControlId" });

                Clear({ Type: "Band", ControlId: "chkPedalBinLabelMatchControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtPedalBinLabelMatchCommentsControlId" });

                Clear({ Type: "Band", ControlId: "chkBagOverfilledControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtBagOverfilledCommentsControlId" });

                Clear({ Type: "Band", ControlId: "chkBinDamagedControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtBinDamagedCommentsControlId" });

                Clear({ Type: "Band", ControlId: "chkBinAppropriateForBagControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtBinAppropriateForBagCommentsControlId" });



                Clear({ Type: "Band", ControlId: "chkBagScoreContainerControlId" });

                ClearMultiSelectionDDLBand("chkBagAmberFailContaminatesControlId");
                ClearMultiSelectionDDLBand("chkBagRedFailContaminatesControlId");


            }
        }
        else if (option.ControlId == "chkGlassBucketContainerTypeControlId") {
            if (option.Name == "YES" && option.Selected == true) {//YES
                scope.GlassBucketDetailsShow = true;
            }
            else {
                //hide GlassBucketDetails
                scope.GlassBucketDetailsShow = false;



                Clear({ Type: "DDL", ControlId: "AddlGlassBucketSizeControlId" });
                Clear({ Type: "DDL", ControlId: "AddlGlassBucketColourCodeControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtGlassBucketOthersControlId" });



                Clear({ Type: "Band", ControlId: "chkGlassBucketScoreContainerControlId" });


                ClearMultiSelectionDDLBand("chkGlassBucketAmberFailContaminatesControlId");
                ClearMultiSelectionDDLBand("chkGlassBucketRedFailContaminatesControlId");

            }
        }
        else if (option.ControlId == "chkCardboardBoxContainerTypeControlId") {
            if (option.Name == "YES" && option.Selected == true) {//YES
                scope.CardboardBoxDetailsShow = true;
            }
            else {
                //hide CardboardBoxDetails
                scope.CardboardBoxDetailsShow = false;



                Clear({ Type: "DDL", ControlId: "AddlCardboardBoxSizeControlId" });
                Clear({ Type: "DDL", ControlId: "AddlCardboardBoxColourCodeControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtCardboardBoxOthersControlId" });



                Clear({ Type: "Band", ControlId: "chkCardboardBoxScoreContainerControlId" });


                ClearMultiSelectionDDLBand("chkCardboardBoxAmberFailContaminatesControlId");
                ClearMultiSelectionDDLBand("chkCardboardBoxRedFailContaminatesControlId");

            }
        }
        else if (option.ControlId == "chkCartridgeReCyclingBoxContainerTypeControlId") {
            if (option.Name == "YES" && option.Selected == true) {//YES
                scope.CartridgeReCyclingBoxDetailsShow = true;
            }
            else {
                //hide CartridgeReCyclingBoxDetails
                scope.CartridgeReCyclingBoxDetailsShow = false;


                Clear({ Type: "DDL", ControlId: "AddlCartridgeReCyclingBoxSizeControlId" });
                Clear({ Type: "DDL", ControlId: "AddlCartridgeReCyclingBoxColourCodeControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtCartridgeReCyclingBoxOthersControlId" });



                Clear({ Type: "Band", ControlId: "chkCartridgeReCyclingBoxScoreContainerControlId" });


                ClearMultiSelectionDDLBand("chkCartridgeReCyclingBoxAmberFailContaminatesControlId");
                ClearMultiSelectionDDLBand("chkCartridgeReCyclingBoxRedFailContaminatesControlId");

            }
        }



        OneViewConsole.Debug("PreAcceptanceCompositionAnalysisHandler End", "AnswerMode.PreAcceptanceCompositionAnalysisHandler");
    }
    catch (Excep) {
        ////alert("Excep : " + Excep)
        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.PreAcceptanceCompositionAnalysisHandler", Excep);
    }

}

var WasteType22 = 0;
function PreAcceptanceLocalWasteStorageHandler22(option) {

    try {        
        OneViewConsole.Debug("PreAcceptanceLocalWasteStorageHandler Start", "AnswerMode.PreAcceptanceLocalWasteStorageHandler");
       
        if (option.ControlId == "chkWasteSegregationType_" + WasteType) {

            if (option.Name == "Dedicated wheelie bin" && option.Selected == true) {
                scope["Others_" + WasteType] = false;
                scope["DedicatedWhellieBin_" + WasteType] = true;
                Clear({ Type: "TEXTBOX", ControlId: "txtOthers_" + WasteType });
            }
            else if (option.Name == "Other" && option.Selected == true) {
                scope["Others_" + WasteType] = true;
                scope["DedicatedWhellieBin_" + WasteType] = false;
                Clear({ Type: "Band", ControlId: "chkCorrectlyColurCoded_" + WasteType });
                //Clear({ Type: "Band", ControlId: "chkHaswheeliebinbeenclosed_" + WasteType });
                //Clear({ Type: "Band", ControlId: "chkHaswheeliebinbeenLocked_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkIswheeliebinlockfunctional_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkIswheeliebindamaged_" + WasteType });
            }
            else {
                scope["Others_" + WasteType] = false;
                scope["DedicatedWhellieBin_" + WasteType] = false;
                Clear({ Type: "TEXTBOX", ControlId: "txtOthers_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkCorrectlyColurCoded_" + WasteType });
                //Clear({ Type: "Band", ControlId: "chkHaswheeliebinbeenclosed_" + WasteType });
                //Clear({ Type: "Band", ControlId: "chkHaswheeliebinbeenLocked_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkIswheeliebinlockfunctional_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkIswheeliebindamaged_" + WasteType });
            }
        }
        else if (option.ControlId == "chkIsIswastetypesegregated_" + WasteType) {          
            //if (option.Name == "E" || option.Name == "P" || option.Selected == false) {
            if (option.Id == 580 || option.Id == 578 || option.Selected == false) {
                scope["Contaminants_" + WasteType] = false;
                scope["chkAmbercontaminants_" + WasteType].Clear();
                scope["chkRedcontaminants_" + WasteType].Clear();
            }           
            //else if (option.Name == "F") {
            else if (option.Id == 579) {
                scope["Contaminants_" + WasteType] = true;
            }           
        }
        if (option.ControlId == "txtWasteType_" + WasteType) {

            var WasteTypeInfo = {
                1: "General Domestic",
                2: "General domestic glass",
                3: "Confidential Waste",
                4: "Printer cartridges",
                5: "Cytotoxic/cytostatic sharps",
                6: "Non-sharp cytotoxic/cytostatic waste",
                7: "Cytotoxic/cytostatic incontinence waste",
                8: "Medicinally contaminated sharps",
                9: "Non-sharps Medicinal waste",
                10: "Controlled drugs",
                11: "Sharps waste contaminated with bodily fluids and hazardous chemicals",
                12: "Non-sharps waste contaminated with bodily fluids and hazardous chemicals",
                13: "Non-cytotoxic/cytostatic medicines in packaging",
                14: "Non-medicinal sharps",
                15: "Non-sharps Infectious waste (NB all non-medicinal waste from an isolation patient is treated as infectious)",
                16: "Offensive/Hygiene waste",
                17: "Autoclaved  waste not containing chemicals",
                18: "Recognisable anatomical waste",
                19: "Amalgam",
                20: "Gypsum",
                21: "Hand gel pouches",
                22: "Waste chemicals including contaminated packaging/auto analyser cartridges",
                23: "Cat A diagnostics/cultures"
            }
          
            if (option.Name == "YES" && option.Selected == true) {//YES
                scope["Div_" + option.ControlId] = true;
                document.getElementById('WasteType' + WasteType).innerHTML = WasteTypeInfo[WasteType] + '<i class="icon icon-hourglass"></i>';
            }
            else {
                scope["Div_" + option.ControlId] = false;
                document.getElementById('WasteType' + WasteType).innerHTML = WasteTypeInfo[WasteType];
            }
        }
        

        OneViewConsole.Debug("PreAcceptanceLocalWasteStorageHandler End", "AnswerMode.PreAcceptanceLocalWasteStorageHandler");
    }
    catch (Excep) {
        ////alert("Excep : " + Excep)
        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.PreAcceptanceLocalWasteStorageHandler", Excep);
    }
}

function ShowHidePreAcceptanceCompositionAnalysis(ShowParameter, OptionSelected) {
    try {
        scope.SharpsBinShow = false;
        scope.RigidPlasticShow = false;
        scope.RigidCardShow = false;
        scope.BagShow = false;
        scope.GlassBucketShow = false;
        scope.CardboardShow = false;
        scope.CartridgeReCyclingBoxShow = false;

        //scope[ShowParameter] = true;
        if ((OptionSelected == undefined && OptionSelected == "") || OptionSelected == true) {
            scope[ShowParameter] = true;
        }
        else {
            scope[ShowParameter] = false;
        }
    }
    catch (Excep) {

        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.ShowHideSamplingSheetAndWaterAnalysis", Excep);
    }
}

function ClearMultiSelectionDDLBand(ControlId){
    try {
        scope[ControlId].Clear();

    }
    catch (Excep) {

        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.ClearMultiSelectionDDLBand", Excep);
    }
}

function SetContainerType(ControlId, Value) {
    scope.NewDCModel[ControlId] = Value;
}

function SingleDepartmentQuestionnaireHandler(option) {
    try {
        OneViewConsole.Debug("SingleDepartmentQuestionnaireHandler Start", "OneViewAdvAnswerModeUserControl.SingleDepartmentQuestionnaireHandler");

        if (option.ControlId == "chkLocalWasteProcedureControlId") {
            if (option.Id == 1 && option.Selected == true) {
                scope.Div_AwareofProcedure = true;

            }
            else if (option.Id == 1 && option.Selected == false) {
                scope.Div_AwareofProcedure = false;
                scope["chkAwareofProcedureControlId"].Clear();
                scope.NewDCModel.txtAwareofProcedureCommentControlId = "";
            }
            else {
                scope.Div_AwareofProcedure = false;
                scope["chkAwareofProcedureControlId"].Clear();
                scope.NewDCModel.txtAwareofProcedureCommentControlId = "";
            }
        }
        if (option.ControlId == "chkSegregationChartControlId") {
            if (option.Id == 1 && option.Selected == true) {
                scope.Div_Location = true;

            }
            else if (option.Id == 1 && option.Selected == false) {
                scope.Div_Location = false;
                scope.NewDCModel.txtLocationControlId = "";
            }
            else {
                scope.Div_Location = false;
                scope.NewDCModel.txtLocationControlId = "";
            }
        }
        if (option.ControlId == "chkGeneralDomesticControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkGDContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkGeneralDomesticglassControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkGDGlassContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkConfidentialWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkConfidentialWasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkPrinterCartridgesControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkPrintercartridgesContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkCytotoxicSharpsControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkCytotoxicSharpsContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkNonsharpwasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkNonsharpwasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkCytotoxicIncontinenceWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkCytotoxicIncontinenceWasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkMedicinallysharpsControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkMedicinallyContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkNonsharpsMedicinalControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkNonsharpsMedicinalContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkControlledDrugsControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkControlledDrugsContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkSharpsWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkSharpsWasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkNonSharpsWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkNonSharpsWasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkNonCytotoxicControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkNonCytotoxicContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkNonMedicinalSharpsControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkNonMedicinalSharpsContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkInfectiousWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkInfectiousWasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkOffensiveWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkOffensiveWasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkAutoclavedWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkAutoclavedWasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkAnatomicalWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkAnatomicalWasteContainerTypeControlId"].Clear();
            }
        }

        if (option.ControlId == "chkAmalgamControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkAmalgamContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkGypsumControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkGypsumContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkHandGelPouchesControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkHandGelPouchesContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkWasteChemicalsControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkWasteChemicalsContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkCatAdiagnosticsControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkCatAdiagnosticsContainerTypeControlId"].Clear();
            }
        }

        OneViewConsole.Debug("SingleDepartmentQuestionnaireHandler End", "OneViewAdvAnswerModeUserControl.SingleDepartmentQuestionnaireHandler");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAnswerModeUserControl.BandSelection", Excep);
    }
}

function SingleDepartmentCompositionAnalysisHandler(option) {
    try {
        OneViewConsole.Debug("SingleDepartmentCompositionAnalysisHandler Start", "AnswerMode.SingleDepartmentCompositionAnalysisHandler");

        if (option.ControlId == "ChkContainerTypeDummyBandControlId") {

            if (option.Name == "Sharps Bin") {//Sharps Bin
                ShowHidePreAcceptanceCompositionAnalysis('SharpsBinShow', option.Selected);
                if (option.Selected == false) {
                    //hide others
                    scope.SharpsBinOthersShow = false;
                    Clear({ Type: "Band", ControlId: "chkSharpsBinContainerTypeControlId" });
                }
            }
            else if (option.Name == "Rigid container Plastic") {//Rigid container Plastic
                ShowHidePreAcceptanceCompositionAnalysis('RigidPlasticShow', option.Selected);
                if (option.Selected == false) {
                    //hide others
                    scope.RigidPlasticOthersShow = false;
                    Clear({ Type: "Band", ControlId: "chkRigidPlasticContainerTypeControlId" });
                }
            }
            else if (option.Name == "Rigid Container Card") {//Rigid Container Card
                ShowHidePreAcceptanceCompositionAnalysis('RigidCardShow', option.Selected);
                if (option.Selected == false) {
                    //hide others
                    scope.RigidCardOthersShow = false;
                    Clear({ Type: "Band", ControlId: "chkRigidCardContainerTypeControlId" });
                }
            }
            else if (option.Name == "Bag") {//Bag
                ShowHidePreAcceptanceCompositionAnalysis('BagShow', option.Selected);
                if (option.Selected == false) {
                    //hide others
                    scope.BagOthersShow = false;
                    Clear({ Type: "Band", ControlId: "chkBagContainerTypeControlId" });
                }
            }
            else if (option.Name == "Glass Bucket") {//Glass Bucket
                ShowHidePreAcceptanceCompositionAnalysis('GlassBucketShow', option.Selected);
                if (option.Selected == false) {
                    //hide others
                    scope.GlassBucketOthersShow = false;
                    Clear({ Type: "Band", ControlId: "chkGlassBucketContainerTypeControlId" });
                }
            }
            else if (option.Name == "Cardboard Box") {//Cardboard Box
                ShowHidePreAcceptanceCompositionAnalysis('CardboardShow', option.Selected);
                if (option.Selected == false) {
                    //hide others
                    scope.CardboardBoxOthersShow = false;
                    Clear({ Type: "Band", ControlId: "chkCardboardBoxContainerTypeControlId" });
                }
            }
            else if (option.Name == "Cartridge Re-Cycling Box") {//Cartridge Re-Cycling Box
                ShowHidePreAcceptanceCompositionAnalysis('CartridgeReCyclingBoxShow', option.Selected);
                if (option.Selected == false) {
                    //hide others
                    scope.CartridgeReCyclingBoxOthersShow = false;
                    Clear({ Type: "Band", ControlId: "chkCartridgeReCyclingBoxContainerTypeControlId" });
                }
            }


        }
        //Contanminates fail 
        if (option.ControlId == "chkSharpsBinScoreContainerControlId") {//SharpsBin
            if (option.Name == "F" && option.Selected == true) {//F
                scope.SharpsBinContaminatesShow = true;
            }
            else {
                scope.SharpsBinContaminatesShow = false;
                ClearMultiSelectionDDLBand("chkSharpsAmberFailContaminatesControlId");
                ClearMultiSelectionDDLBand("chkSharpsRedFailContaminatesControlId");
            }
        }
        if (option.ControlId == "chkRigidPlasticScoreContainerControlId") {//RigidPlastic
            if (option.Name == "F" && option.Selected == true) {//F
                scope.RigidPlasticContaminatesShow = true;
            }
            else {
                scope.RigidPlasticContaminatesShow = false;
                ClearMultiSelectionDDLBand("chkRigidPlasticAmberFailContaminatesControlId");
                ClearMultiSelectionDDLBand("chkRigidPlasticRedFailContaminatesControlId");
            }
        }
        if (option.ControlId == "chkRigidCardScoreContainerControlId") {//RigidCard
            if (option.Name == "F" && option.Selected == true) {//F
                scope.RigidCardContaminatesShow = true;
            }
            else {
                scope.RigidCardContaminatesShow = false;
                ClearMultiSelectionDDLBand("chkRigidCardAmberFailContaminatesControlId");
                ClearMultiSelectionDDLBand("chkRigidCardRedFailContaminatesControlId");
            }
        }
        if (option.ControlId == "chkBagScoreContainerControlId") {//BagScore
            if (option.Name == "F" && option.Selected == true) {//F
                scope.BagContaminatesShow = true;
            }
            else {
                scope.BagContaminatesShow = false;
                ClearMultiSelectionDDLBand("chkBagAmberFailContaminatesControlId");
                ClearMultiSelectionDDLBand("chkBagRedFailContaminatesControlId");
            }
        }
        if (option.ControlId == "chkGlassBucketScoreContainerControlId") {//GlassBucket
            if (option.Name == "F" && option.Selected == true) {//F
                scope.GlassBucketContaminatesShow = true;
            }
            else {
                scope.GlassBucketContaminatesShow = false;
                ClearMultiSelectionDDLBand("chkGlassBucketAmberFailContaminatesControlId");
                ClearMultiSelectionDDLBand("chkGlassBucketRedFailContaminatesControlId");
            }
        }
        if (option.ControlId == "chkCardboardBoxScoreContainerControlId") {//CardboardBox
            if (option.Name == "F" && option.Selected == true) {//F
                scope.CardboardBoxContaminatesShow = true;
            }
            else {
                scope.CardboardBoxContaminatesShow = false;
                ClearMultiSelectionDDLBand("chkCardboardBoxAmberFailContaminatesControlId");
                ClearMultiSelectionDDLBand("chkCardboardBoxRedFailContaminatesControlId");
            }
        }
        if (option.ControlId == "chkCartridgeReCyclingBoxScoreContainerControlId") {//CartridgeReCyclingBox
            if (option.Name == "F" && option.Selected == true) {//F
                scope.CartridgeReCyclingBoxContaminatesShow = true;
            }
            else {
                scope.CartridgeReCyclingBoxContaminatesShow = false;
                ClearMultiSelectionDDLBand("chkCartridgeReCyclingBoxAmberFailContaminatesControlId");
                ClearMultiSelectionDDLBand("chkCartridgeReCyclingBoxRedFailContaminatesControlId");
            }
        }
        if (option.ControlId == "chkSharpsBinContainerTypeControlId") {
            if (option.Name == "YES" && option.Selected == true) {//YES
                scope.SharpsBinDetailsShow = true;
            }
            else {
                //hide SharpsBinDetails
                scope.SharpsBinDetailsShow = false;

                Clear({ Type: "DDL", ControlId: "AddlSharpsBinSizeControlId" });
                Clear({ Type: "DDL", ControlId: "AddlSharpsBinColourCodeControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtSharpsBinOthersControlId" });


                Clear({ Type: "Band", ControlId: "chkSharpsBinLabelUsefulControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtSharpsBinLabelUsefulCommentsControlId" });

                Clear({ Type: "Band", ControlId: "chkSharpsBinLidMatchLabelControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtSharpsBinLidMatchLabelCommentsControlId" });

                Clear({ Type: "Band", ControlId: "chkBinProperlyAssembledControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtBinProperlyAssembledCommentsControlId" });

                Clear({ Type: "Band", ControlId: "chkAssembledByLabelCompletedControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtAssembledByLabelCompletedCommentsControlId" });

                Clear({ Type: "Band", ControlId: "chkClosureMechanismInUseControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtClosureMechanismInUseCommentsControlId" });

                Clear({ Type: "Band", ControlId: "chkSharpsBinOverfilledControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtSharpsBinOverfilledCommentsControlId" });

                Clear({ Type: "Band", ControlId: "chkBinLabelUsefulControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtBinLabelUsefulCommentsControlId" });



                Clear({ Type: "Band", ControlId: "chkSharpsBinScoreContainerControlId" });

                ClearMultiSelectionDDLBand("chkSharpsAmberFailContaminatesControlId");
                ClearMultiSelectionDDLBand("chkSharpsRedFailContaminatesControlId");
            }
        }
        else if (option.ControlId == "chkRigidPlasticContainerTypeControlId") {
            if (option.Name == "YES" && option.Selected == true) {//YES
                scope.RigidPlasticDetailsShow = true;
            }
            else {
                //hide RigidPlasticDetails
                scope.RigidPlasticDetailsShow = false;


                Clear({ Type: "DDL", ControlId: "AddlRigidPlasticSizeControlId" });
                Clear({ Type: "DDL", ControlId: "AddlRigidPlasticColourCodeControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtRigidPlasticOthersControlId" });


                Clear({ Type: "Band", ControlId: "chkRigidPlasticWasteTypesBinLabelControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtRigidPlasticWasteTypesBinLabelCommentsControlId" });

                Clear({ Type: "Band", ControlId: "chkRigidPlasticBinLabelUsefulControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtRigidPlasticBinLabelUsefulCommentsControlId" });

                Clear({ Type: "Band", ControlId: "chkRigidPlasticBinLidMatchLabelControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtRigidPlasticBinLidMatchLabelControlId" });



                Clear({ Type: "Band", ControlId: "chkRigidPlasticScoreContainerControlId" });

                ClearMultiSelectionDDLBand("chkRigidPlasticAmberFailContaminatesControlId");
                ClearMultiSelectionDDLBand("chkRigidPlasticRedFailContaminatesControlId");


            }
        }
        else if (option.ControlId == "chkRigidCardContainerTypeControlId") {
            if (option.Name == "YES" && option.Selected == true) {//YES
                scope.RigidCardDetailsShow = true;

                Clear({ Type: "DDL", ControlId: "AddlRigidCardSizeControlId" });
                Clear({ Type: "DDL", ControlId: "AddlRigidCardColourCodeControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtRigidCardOthersControlId" });


                Clear({ Type: "Band", ControlId: "chkRigidCardWasteTypesBinLabelControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtRigidCardWasteTypesBinLabelCommentsControlId" });

                Clear({ Type: "Band", ControlId: "chkRigidCardBinLabelUsefulControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtRigidCardBinLabelUsefulCommentsControlId" });

                Clear({ Type: "Band", ControlId: "chkRigidCardBinLidMatchLabelControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtRigidCardBinLidMatchLabelCommentsControlId" });



                Clear({ Type: "Band", ControlId: "chkRigidCardScoreContainerControlId" });


                ClearMultiSelectionDDLBand("chkRigidCardAmberFailContaminatesControlId");
                ClearMultiSelectionDDLBand("chkRigidCardRedFailContaminatesControlId");

            }
            else {
                //hide RigidCardDetails
                scope.RigidCardDetailsShow = false;
            }
        }
        else if (option.ControlId == "chkBagContainerTypeControlId") {
            if (option.Name == "YES" && option.Selected == true) {//YES
                scope.BagDetailsShow = true;
            }
            else {
                //hide BagDetails
                scope.BagDetailsShow = false;


                Clear({ Type: "DDL", ControlId: "AddlBagSizeControlId" });
                Clear({ Type: "DDL", ControlId: "AddlBagColourCodeControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtBagOthersControlId" });


                Clear({ Type: "Band", ControlId: "chkPedalBinLabelledControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtPedalBinLabelledCommentsControlId" });

                Clear({ Type: "Band", ControlId: "chkPedalBinLabelMatchControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtPedalBinLabelMatchCommentsControlId" });

                Clear({ Type: "Band", ControlId: "chkBagOverfilledControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtBagOverfilledCommentsControlId" });

                Clear({ Type: "Band", ControlId: "chkBinDamagedControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtBinDamagedCommentsControlId" });

                Clear({ Type: "Band", ControlId: "chkBinAppropriateForBagControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtBinAppropriateForBagCommentsControlId" });



                Clear({ Type: "Band", ControlId: "chkBagScoreContainerControlId" });

                ClearMultiSelectionDDLBand("chkBagAmberFailContaminatesControlId");
                ClearMultiSelectionDDLBand("chkBagRedFailContaminatesControlId");


            }
        }
        else if (option.ControlId == "chkGlassBucketContainerTypeControlId") {
            if (option.Name == "YES" && option.Selected == true) {//YES
                scope.GlassBucketDetailsShow = true;
            }
            else {
                //hide GlassBucketDetails
                scope.GlassBucketDetailsShow = false;



                Clear({ Type: "DDL", ControlId: "AddlGlassBucketSizeControlId" });
                Clear({ Type: "DDL", ControlId: "AddlGlassBucketColourCodeControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtGlassBucketOthersControlId" });



                Clear({ Type: "Band", ControlId: "chkGlassBucketScoreContainerControlId" });


                ClearMultiSelectionDDLBand("chkGlassBucketAmberFailContaminatesControlId");
                ClearMultiSelectionDDLBand("chkGlassBucketRedFailContaminatesControlId");

            }
        }
        else if (option.ControlId == "chkCardboardBoxContainerTypeControlId") {
            if (option.Name == "YES" && option.Selected == true) {//YES
                scope.CardboardBoxDetailsShow = true;
            }
            else {
                //hide CardboardBoxDetails
                scope.CardboardBoxDetailsShow = false;



                Clear({ Type: "DDL", ControlId: "AddlCardboardBoxSizeControlId" });
                Clear({ Type: "DDL", ControlId: "AddlCardboardBoxColourCodeControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtCardboardBoxOthersControlId" });



                Clear({ Type: "Band", ControlId: "chkCardboardBoxScoreContainerControlId" });


                ClearMultiSelectionDDLBand("chkCardboardBoxAmberFailContaminatesControlId");
                ClearMultiSelectionDDLBand("chkCardboardBoxRedFailContaminatesControlId");

            }
        }
        else if (option.ControlId == "chkCartridgeReCyclingBoxContainerTypeControlId") {
            if (option.Name == "YES" && option.Selected == true) {//YES
                scope.CartridgeReCyclingBoxDetailsShow = true;
            }
            else {
                //hide CartridgeReCyclingBoxDetails
                scope.CartridgeReCyclingBoxDetailsShow = false;


                Clear({ Type: "DDL", ControlId: "AddlCartridgeReCyclingBoxSizeControlId" });
                Clear({ Type: "DDL", ControlId: "AddlCartridgeReCyclingBoxColourCodeControlId" });
                Clear({ Type: "TEXTBOX", ControlId: "txtCartridgeReCyclingBoxOthersControlId" });



                Clear({ Type: "Band", ControlId: "chkCartridgeReCyclingBoxScoreContainerControlId" });


                ClearMultiSelectionDDLBand("chkCartridgeReCyclingBoxAmberFailContaminatesControlId");
                ClearMultiSelectionDDLBand("chkCartridgeReCyclingBoxRedFailContaminatesControlId");

            }
        }



        OneViewConsole.Debug("SingleDepartmentCompositionAnalysisHandler End", "AnswerMode.SingleDepartmentCompositionAnalysisHandler");
    }
    catch (Excep) {
        ////alert("Excep : " + Excep)
        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.SingleDepartmentCompositionAnalysisHandler", Excep);
    }

}

function SingleDepartmentLocalWasteStorageHandler(option) {

    try {
        OneViewConsole.Debug("SingleDepartmentLocalWasteStorageHandler Start", "AnswerMode.SingleDepartmentLocalWasteStorageHandler");

        if (option.ControlId == "chkWasteSegregationType_" + WasteType) {

            if (option.Name == "Dedicated wheelie bin" && option.Selected == true) {
                scope["Others_" + WasteType] = false;
                scope["DedicatedWhellieBin_" + WasteType] = true;
                Clear({ Type: "TEXTBOX", ControlId: "txtOthers_" + WasteType });
            }
            else if (option.Name == "Other" && option.Selected == true) {
                scope["Others_" + WasteType] = true;
                scope["DedicatedWhellieBin_" + WasteType] = false;
                Clear({ Type: "Band", ControlId: "chkCorrectlyColurCoded_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkHaswheeliebinbeenclosed_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkHaswheeliebinbeenLocked_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkIswheeliebinlockfunctional_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkIswheeliebindamaged_" + WasteType });
            }
            else {
                scope["Others_" + WasteType] = false;
                scope["DedicatedWhellieBin_" + WasteType] = false;
                Clear({ Type: "TEXTBOX", ControlId: "txtOthers_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkCorrectlyColurCoded_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkHaswheeliebinbeenclosed_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkHaswheeliebinbeenLocked_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkIswheeliebinlockfunctional_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkIswheeliebindamaged_" + WasteType });
            }
        }
        else if (option.ControlId == "chkIsIswastetypesegregated_" + WasteType) {
            // if (option.Name == "E" || option.Name == "P" || option.Selected == false) {
            if (option.Id == 580 || option.Id == 578 || option.Selected == false) {
                scope["Contaminants_" + WasteType] = false;
                scope["chkAmbercontaminants_" + WasteType].Clear();
                scope["chkRedcontaminants_" + WasteType].Clear();
            }
            //else if (option.Name == "F") {
            else if (option.Id == 579) {
                scope["Contaminants_" + WasteType] = true;
            }
        }
        if (option.ControlId == "txtWasteType_" + WasteType) {

            var WasteTypeInfo = {
                1: "General Domestic",
                2: "General domestic glass",
                3: "Confidential Waste",
                4: "Printer cartridges",
                5: "Cytotoxic/cytostatic sharps",
                6: "Non-sharp cytotoxic/cytostatic waste",
                7: "Cytotoxic/cytostatic incontinence waste",
                8: "Medicinally contaminated sharps",
                9: "Non-sharps Medicinal waste",
                10: "Controlled drugs",
                11: "Sharps waste contaminated with bodily fluids and hazardous chemicals",
                12: "Non-sharps waste contaminated with bodily fluids and hazardous chemicals",
                13: "Non-cytotoxic/cytostatic medicines in packaging",
                14: "Non-medicinal sharps",
                15: "Non-sharps Infectious waste (NB all non-medicinal waste from an isolation patient is treated as infectious)",
                16: "Offensive/Hygiene waste",
                17: "Autoclaved  waste not containing chemicals",
                18: "Recognisable anatomical waste",
                19: "Amalgam",
                20: "Gypsum",
                21: "Hand gel pouches",
                22: "Waste chemicals including contaminated packaging/auto analyser cartridges",
                23: "Cat A diagnostics/cultures"
            }

            if (option.Name == "YES" && option.Selected == true) {//YES
                scope["Div_" + option.ControlId] = true;
                document.getElementById('WasteType' + WasteType).innerHTML = WasteTypeInfo[WasteType] + '<i class="icon icon-hourglass"></i>';
            }
            else {
                scope["Div_" + option.ControlId] = false;
                document.getElementById('WasteType' + WasteType).innerHTML = WasteTypeInfo[WasteType];
            }
        }


        OneViewConsole.Debug("SingleDepartmentLocalWasteStorageHandler End", "AnswerMode.SingleDepartmentLocalWasteStorageHandler");
    }
    catch (Excep) {
        ////alert("Excep : " + Excep)
        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.SingleDepartmentLocalWasteStorageHandler", Excep);
    }
}

function IncidentInvestigationElementQuestionnaireHandler(option) {
    try {
        OneViewConsole.Debug("IncidentInvestigationElementQuestionnaireHandler Start", "OneViewAdvAnswerModeUserControl.IncidentInvestigationElementQuestionnaireHandler");

        if (option.ControlId == "chkLocalWasteProcedureControlId") {
            if (option.Id == 1 && option.Selected == true) {
                scope.Div_AwareofProcedure = true;

            }
            else if (option.Id == 1 && option.Selected == false) {
                scope.Div_AwareofProcedure = false;
                scope["chkAwareofProcedureControlId"].Clear();
                scope.NewDCModel.txtAwareofProcedureCommentControlId = "";
            }
            else {
                scope.Div_AwareofProcedure = false;
                scope["chkAwareofProcedureControlId"].Clear();
                scope.NewDCModel.txtAwareofProcedureCommentControlId = "";
            }
        }
        if (option.ControlId == "chkSegregationChartControlId") {
            if (option.Id == 1 && option.Selected == true) {
                scope.Div_Location = true;

            }
            else if (option.Id == 1 && option.Selected == false) {
                scope.Div_Location = false;
                scope.NewDCModel.txtLocationControlId = "";
            }
            else {
                scope.Div_Location = false;
                scope.NewDCModel.txtLocationControlId = "";
            }
        }
        if (option.ControlId == "chkGeneralDomesticControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkGDContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkGeneralDomesticglassControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkGDGlassContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkConfidentialWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkConfidentialWasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkPrinterCartridgesControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkPrintercartridgesContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkCytotoxicSharpsControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkCytotoxicSharpsContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkNonsharpwasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkNonsharpwasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkCytotoxicIncontinenceWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkCytotoxicIncontinenceWasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkMedicinallysharpsControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkMedicinallyContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkNonsharpsMedicinalControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkNonsharpsMedicinalContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkControlledDrugsControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkControlledDrugsContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkSharpsWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkSharpsWasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkNonSharpsWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkNonSharpsWasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkNonCytotoxicControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkNonCytotoxicContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkNonMedicinalSharpsControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkNonMedicinalSharpsContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkInfectiousWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkInfectiousWasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkOffensiveWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkOffensiveWasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkAutoclavedWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkAutoclavedWasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkAnatomicalWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkAnatomicalWasteContainerTypeControlId"].Clear();
            }
        }

        if (option.ControlId == "chkAmalgamControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkAmalgamContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkGypsumControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkGypsumContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkHandGelPouchesControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkHandGelPouchesContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkWasteChemicalsControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkWasteChemicalsContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkCatAdiagnosticsControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkCatAdiagnosticsContainerTypeControlId"].Clear();
            }
        }

        OneViewConsole.Debug("IncidentInvestigationElementQuestionnaireHandler End", "OneViewAdvAnswerModeUserControl.IncidentInvestigationElementQuestionnaireHandler");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAnswerModeUserControl.BandSelection", Excep);
    }
}

function IncidentInvestigationElemenLocalWasteStorageHandler(option) {

    try {
        OneViewConsole.Debug("IncidentInvestigationElemenLocalWasteStorageHandler Start", "AnswerMode.IncidentInvestigationElemenLocalWasteStorageHandler");

        if (option.ControlId == "chkWasteSegregationType_" + WasteType) {

            if (option.Name == "Dedicated wheelie bin" && option.Selected == true) {
                scope["Others_" + WasteType] = false;
                scope["DedicatedWhellieBin_" + WasteType] = true;
                Clear({ Type: "TEXTBOX", ControlId: "txtOthers_" + WasteType });
            }
            else if (option.Name == "Other" && option.Selected == true) {
                scope["Others_" + WasteType] = true;
                scope["DedicatedWhellieBin_" + WasteType] = false;
                Clear({ Type: "Band", ControlId: "chkCorrectlyColurCoded_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkHaswheeliebinbeenclosed_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkHaswheeliebinbeenLocked_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkIswheeliebinlockfunctional_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkIswheeliebindamaged_" + WasteType });
            }
            else {
                scope["Others_" + WasteType] = false;
                scope["DedicatedWhellieBin_" + WasteType] = false;
                Clear({ Type: "TEXTBOX", ControlId: "txtOthers_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkCorrectlyColurCoded_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkHaswheeliebinbeenclosed_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkHaswheeliebinbeenLocked_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkIswheeliebinlockfunctional_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkIswheeliebindamaged_" + WasteType });
            }
        }
        else if (option.ControlId == "chkIsIswastetypesegregated_" + WasteType) {
            //if (option.Name == "E" || option.Name == "P" || option.Selected == false) {
            if (option.Id == 580 || option.Id == 578 || option.Selected == false) {
                scope["Contaminants_" + WasteType] = false;
                scope["chkAmbercontaminants_" + WasteType].Clear();
                scope["chkRedcontaminants_" + WasteType].Clear();
            }
            //else if (option.Name == "F") {
            else if (option.Id == 579) {
                scope["Contaminants_" + WasteType] = true;
            }
        }
        if (option.ControlId == "txtWasteType_" + WasteType) {

            var WasteTypeInfo = {
                1: "General Domestic",
                2: "General domestic glass",
                3: "Confidential Waste",
                4: "Printer cartridges",
                5: "Cytotoxic/cytostatic sharps",
                6: "Non-sharp cytotoxic/cytostatic waste",
                7: "Cytotoxic/cytostatic incontinence waste",
                8: "Medicinally contaminated sharps",
                9: "Non-sharps Medicinal waste",
                10: "Controlled drugs",
                11: "Sharps waste contaminated with bodily fluids and hazardous chemicals",
                12: "Non-sharps waste contaminated with bodily fluids and hazardous chemicals",
                13: "Non-cytotoxic/cytostatic medicines in packaging",
                14: "Non-medicinal sharps",
                15: "Non-sharps Infectious waste (NB all non-medicinal waste from an isolation patient is treated as infectious)",
                16: "Offensive/Hygiene waste",
                17: "Autoclaved  waste not containing chemicals",
                18: "Recognisable anatomical waste",
                19: "Amalgam",
                20: "Gypsum",
                21: "Hand gel pouches",
                22: "Waste chemicals including contaminated packaging/auto analyser cartridges",
                23: "Cat A diagnostics/cultures"
            }

            if (option.Name == "YES" && option.Selected == true) {//YES
                scope["Div_" + option.ControlId] = true;
                document.getElementById('WasteType' + WasteType).innerHTML = WasteTypeInfo[WasteType] + '<i class="icon icon-hourglass"></i>';
            }
            else {
                scope["Div_" + option.ControlId] = false;
                document.getElementById('WasteType' + WasteType).innerHTML = WasteTypeInfo[WasteType];
            }
        }


        OneViewConsole.Debug("IncidentInvestigationElemenLocalWasteStorageHandler End", "AnswerMode.IncidentInvestigationElemenLocalWasteStorageHandler");
    }
    catch (Excep) {
        ////alert("Excep : " + Excep)
        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.IncidentInvestigationElemenLocalWasteStorageHandler", Excep);
    }
}

function LWSEQuestionnaireHandler(option) {
    try {
        OneViewConsole.Debug("LWSEQuestionnaireHandler Start", "OneViewAdvAnswerModeUserControl.LWSEQuestionnaireHandler");

        if (option.ControlId == "chkLocalWasteProcedureControlId") {
            if (option.Id == 1 && option.Selected == true) {
                scope.Div_AwareofProcedure = true;

            }
            else if (option.Id == 1 && option.Selected == false) {
                scope.Div_AwareofProcedure = false;
                scope["chkAwareofProcedureControlId"].Clear();
                scope.NewDCModel.txtAwareofProcedureCommentControlId = "";
            }
            else {
                scope.Div_AwareofProcedure = false;
                scope["chkAwareofProcedureControlId"].Clear();
                scope.NewDCModel.txtAwareofProcedureCommentControlId = "";
            }
        }
        if (option.ControlId == "chkSegregationChartControlId") {
            if (option.Id == 1 && option.Selected == true) {
                scope.Div_Location = true;

            }
            else if (option.Id == 1 && option.Selected == false) {
                scope.Div_Location = false;
                scope.NewDCModel.txtLocationControlId = "";
            }
            else {
                scope.Div_Location = false;
                scope.NewDCModel.txtLocationControlId = "";
            }
        }
        if (option.ControlId == "chkGeneralDomesticControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkGDContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkGeneralDomesticglassControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkGDGlassContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkConfidentialWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkConfidentialWasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkPrinterCartridgesControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkPrintercartridgesContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkCytotoxicSharpsControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkCytotoxicSharpsContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkNonsharpwasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkNonsharpwasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkCytotoxicIncontinenceWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkCytotoxicIncontinenceWasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkMedicinallysharpsControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkMedicinallyContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkNonsharpsMedicinalControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkNonsharpsMedicinalContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkControlledDrugsControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkControlledDrugsContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkSharpsWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkSharpsWasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkNonSharpsWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkNonSharpsWasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkNonCytotoxicControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkNonCytotoxicContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkNonMedicinalSharpsControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkNonMedicinalSharpsContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkInfectiousWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkInfectiousWasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkOffensiveWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkOffensiveWasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkAutoclavedWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkAutoclavedWasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkAnatomicalWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkAnatomicalWasteContainerTypeControlId"].Clear();
            }
        }

        if (option.ControlId == "chkAmalgamControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkAmalgamContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkGypsumControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkGypsumContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkHandGelPouchesControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkHandGelPouchesContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkWasteChemicalsControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkWasteChemicalsContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkCatAdiagnosticsControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkCatAdiagnosticsContainerTypeControlId"].Clear();
            }
        }

        OneViewConsole.Debug("LWSEQuestionnaireHandler End", "OneViewAdvAnswerModeUserControl.LWSEQuestionnaireHandler");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAnswerModeUserControl.BandSelection", Excep);
    }
}

function LWSELocalWasteStorageHandler(option) {

    try {
        OneViewConsole.Debug("LWSELocalWasteStorageHandler Start", "AnswerMode.LWSELocalWasteStorageHandler");

        if (option.ControlId == "chkWasteSegregationType_" + WasteType) {

            if (option.Name == "Dedicated wheelie bin" && option.Selected == true) {
                scope["Others_" + WasteType] = false;
                scope["DedicatedWhellieBin_" + WasteType] = true;
                Clear({ Type: "TEXTBOX", ControlId: "txtOthers_" + WasteType });
            }
            else if (option.Name == "Other" && option.Selected == true) {
                scope["Others_" + WasteType] = true;
                scope["DedicatedWhellieBin_" + WasteType] = false;
                Clear({ Type: "Band", ControlId: "chkCorrectlyColurCoded_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkHaswheeliebinbeenclosed_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkHaswheeliebinbeenLocked_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkIswheeliebinlockfunctional_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkIswheeliebindamaged_" + WasteType });
            }
            else {
                scope["Others_" + WasteType] = false;
                scope["DedicatedWhellieBin_" + WasteType] = false;
                Clear({ Type: "TEXTBOX", ControlId: "txtOthers_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkCorrectlyColurCoded_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkHaswheeliebinbeenclosed_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkHaswheeliebinbeenLocked_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkIswheeliebinlockfunctional_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkIswheeliebindamaged_" + WasteType });
            }
        }
        else if (option.ControlId == "chkIsIswastetypesegregated_" + WasteType) {
            //if (option.Name == "E" || option.Name == "P" || option.Selected == false) {
            if (option.Id == 580 || option.Id == 578 || option.Selected == false) {
                scope["Contaminants_" + WasteType] = false;
                scope["chkAmbercontaminants_" + WasteType].Clear();
                scope["chkRedcontaminants_" + WasteType].Clear();
            }
            //else if (option.Name == "F") {

            else if (option.Id == 579) {
                scope["Contaminants_" + WasteType] = true;
            }
        }
        if (option.ControlId == "txtWasteType_" + WasteType) {

            var WasteTypeInfo = {
                1: "General Domestic",
                2: "General domestic glass",
                3: "Confidential Waste",
                4: "Printer cartridges",
                5: "Cytotoxic/cytostatic sharps",
                6: "Non-sharp cytotoxic/cytostatic waste",
                7: "Cytotoxic/cytostatic incontinence waste",
                8: "Medicinally contaminated sharps",
                9: "Non-sharps Medicinal waste",
                10: "Controlled drugs",
                11: "Sharps waste contaminated with bodily fluids and hazardous chemicals",
                12: "Non-sharps waste contaminated with bodily fluids and hazardous chemicals",
                13: "Non-cytotoxic/cytostatic medicines in packaging",
                14: "Non-medicinal sharps",
                15: "Non-sharps Infectious waste (NB all non-medicinal waste from an isolation patient is treated as infectious)",
                16: "Offensive/Hygiene waste",
                17: "Autoclaved  waste not containing chemicals",
                18: "Recognisable anatomical waste",
                19: "Amalgam",
                20: "Gypsum",
                21: "Hand gel pouches",
                22: "Waste chemicals including contaminated packaging/auto analyser cartridges",
                23: "Cat A diagnostics/cultures"
            }

            if (option.Name == "YES" && option.Selected == true) {//YES
                scope["Div_" + option.ControlId] = true;
                document.getElementById('WasteType' + WasteType).innerHTML = WasteTypeInfo[WasteType] + '<i class="icon icon-hourglass"></i>';
            }
            else {
                scope["Div_" + option.ControlId] = false;
                document.getElementById('WasteType' + WasteType).innerHTML = WasteTypeInfo[WasteType];
            }
        }


        OneViewConsole.Debug("LWSELocalWasteStorageHandler End", "AnswerMode.LWSELocalWasteStorageHandler");
    }
    catch (Excep) {
        ////alert("Excep : " + Excep)
        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.LWSELocalWasteStorageHandler", Excep);
    }
}

function SWSPAEQuestionnaireHandler(option) {
    try {
        OneViewConsole.Debug("SWSPAEQuestionnaireHandler Start", "OneViewAdvAnswerModeUserControl.SWSPAEQuestionnaireHandler");

        if (option.ControlId == "chkLocalWasteProcedureControlId") {
            if (option.Id == 1 && option.Selected == true) {
                scope.Div_AwareofProcedure = true;

            }
            else if (option.Id == 1 && option.Selected == false) {
                scope.Div_AwareofProcedure = false;
                scope["chkAwareofProcedureControlId"].Clear();
                scope.NewDCModel.txtAwareofProcedureCommentControlId = "";
            }
            else {
                scope.Div_AwareofProcedure = false;
                scope["chkAwareofProcedureControlId"].Clear();
                scope.NewDCModel.txtAwareofProcedureCommentControlId = "";
            }
        }
        if (option.ControlId == "chkSegregationChartControlId") {
            if (option.Id == 1 && option.Selected == true) {
                scope.Div_Location = true;

            }
            else if (option.Id == 1 && option.Selected == false) {
                scope.Div_Location = false;
                scope.NewDCModel.txtLocationControlId = "";
            }
            else {
                scope.Div_Location = false;
                scope.NewDCModel.txtLocationControlId = "";
            }
        }
        if (option.ControlId == "chkGeneralDomesticControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkGDContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkGeneralDomesticglassControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkGDGlassContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkConfidentialWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkConfidentialWasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkPrinterCartridgesControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkPrintercartridgesContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkCytotoxicSharpsControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkCytotoxicSharpsContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkNonsharpwasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkNonsharpwasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkCytotoxicIncontinenceWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkCytotoxicIncontinenceWasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkMedicinallysharpsControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkMedicinallyContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkNonsharpsMedicinalControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkNonsharpsMedicinalContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkControlledDrugsControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkControlledDrugsContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkSharpsWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkSharpsWasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkNonSharpsWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkNonSharpsWasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkNonCytotoxicControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkNonCytotoxicContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkNonMedicinalSharpsControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkNonMedicinalSharpsContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkInfectiousWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkInfectiousWasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkOffensiveWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkOffensiveWasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkAutoclavedWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkAutoclavedWasteContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkAnatomicalWasteControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkAnatomicalWasteContainerTypeControlId"].Clear();
            }
        }

        if (option.ControlId == "chkAmalgamControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkAmalgamContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkGypsumControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkGypsumContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkHandGelPouchesControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkHandGelPouchesContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkWasteChemicalsControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkWasteChemicalsContainerTypeControlId"].Clear();
            }
        }
        if (option.ControlId == "chkCatAdiagnosticsControlId") {
            if ((option.Id == 2 && option.Selected == true) || option.Selected == false) {
                scope["chkCatAdiagnosticsContainerTypeControlId"].Clear();
            }
        }

        OneViewConsole.Debug("SWSPAEQuestionnaireHandler End", "OneViewAdvAnswerModeUserControl.SWSPAEQuestionnaireHandler");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAnswerModeUserControl.SWSPAEQuestionnaireHandler", Excep);
    }
}


function SingleWasteLocalWasteStorageHandler(option) {

    try {
        OneViewConsole.Debug("SingleWasteLocalWasteStorageHandler Start", "AnswerMode.SingleWasteLocalWasteStorageHandler");

        if (option.ControlId == "chkWasteSegregationType_" + WasteType) {

            if (option.Name == "Dedicated wheelie bin" && option.Selected == true) {
                scope["Others_" + WasteType] = false;
                scope["DedicatedWhellieBin_" + WasteType] = true;
                Clear({ Type: "TEXTBOX", ControlId: "txtOthers_" + WasteType });
            }
            else if (option.Name == "Other" && option.Selected == true) {
                scope["Others_" + WasteType] = true;
                scope["DedicatedWhellieBin_" + WasteType] = false;
                Clear({ Type: "Band", ControlId: "chkCorrectlyColurCoded_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkHaswheeliebinbeenclosed_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkHaswheeliebinbeenLocked_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkIswheeliebinlockfunctional_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkIswheeliebindamaged_" + WasteType });
            }
            else {
                scope["Others_" + WasteType] = false;
                scope["DedicatedWhellieBin_" + WasteType] = false;
                Clear({ Type: "TEXTBOX", ControlId: "txtOthers_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkCorrectlyColurCoded_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkHaswheeliebinbeenclosed_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkHaswheeliebinbeenLocked_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkIswheeliebinlockfunctional_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkIswheeliebindamaged_" + WasteType });
            }
        }
        else if (option.ControlId == "chkIsIswastetypesegregated_" + WasteType) {
            //if (option.Name == "E" || option.Name == "P" || option.Selected == false) {
            if (option.Id == 580 || option.Id == 578 || option.Selected == false) {
                scope["Contaminants_" + WasteType] = false;
                scope["chkAmbercontaminants_" + WasteType].Clear();
                scope["chkRedcontaminants_" + WasteType].Clear();
            }
            //else if (option.Name == "F") {
            else if (option.Id == 579) {
                scope["Contaminants_" + WasteType] = true;
            }
        }
        if (option.ControlId == "txtWasteType_" + WasteType) {

            var WasteTypeInfo = {
                1: "General Domestic",
                2: "General domestic glass",
                3: "Confidential Waste",
                4: "Printer cartridges",
                5: "Cytotoxic/cytostatic sharps",
                6: "Non-sharp cytotoxic/cytostatic waste",
                7: "Cytotoxic/cytostatic incontinence waste",
                8: "Medicinally contaminated sharps",
                9: "Non-sharps Medicinal waste",
                10: "Controlled drugs",
                11: "Sharps waste contaminated with bodily fluids and hazardous chemicals",
                12: "Non-sharps waste contaminated with bodily fluids and hazardous chemicals",
                13: "Non-cytotoxic/cytostatic medicines in packaging",
                14: "Non-medicinal sharps",
                15: "Non-sharps Infectious waste (NB all non-medicinal waste from an isolation patient is treated as infectious)",
                16: "Offensive/Hygiene waste",
                17: "Autoclaved  waste not containing chemicals",
                18: "Recognisable anatomical waste",
                19: "Amalgam",
                20: "Gypsum",
                21: "Hand gel pouches",
                22: "Waste chemicals including contaminated packaging/auto analyser cartridges",
                23: "Cat A diagnostics/cultures"
            }

            if (option.Name == "YES" && option.Selected == true) {//YES
                scope["Div_" + option.ControlId] = true;
                document.getElementById('WasteType' + WasteType).innerHTML = WasteTypeInfo[WasteType] + '<i class="icon icon-hourglass"></i>';
            }
            else {
                scope["Div_" + option.ControlId] = false;
                document.getElementById('WasteType' + WasteType).innerHTML = WasteTypeInfo[WasteType];
            }
        }


        OneViewConsole.Debug("SingleWasteLocalWasteStorageHandler End", "AnswerMode.SingleWasteLocalWasteStorageHandler");
    }
    catch (Excep) {
        ////alert("Excep : " + Excep)
        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.SingleWasteLocalWasteStorageHandler", Excep);
    }
}

function PreAcceptanceCompositionAnalysisHandler_3271_22(option) {
    try {
        OneViewConsole.Debug("PreAcceptanceCompositionAnalysisHandler_3271 Start", "AnswerMode.PreAcceptanceCompositionAnalysisHandler_3271");




        ///////////////////////////***************************************************** Sharps Bin Start ******************************************/////////////////////////////////

        if (option.ControlId == "chkSharpsBinContainerTypeControlId_" + ComositionAnalysisSubContainerTypeId) {
            if (option.Name == "YES" && option.Selected == true) {//YES
                scope["SharpsBinDetailsShow_" + ComositionAnalysisSubContainerTypeId] = true;
                document.getElementById('ContainerTypeSubTab' + ComositionAnalysisSubContainerTypeId).innerHTML = ComositionAnalysisSubContainerTypeId + '<i class="icon icon-hourglass"></i>';
            }
            else {
                //hide SharpsBinDetails
                scope["SharpsBinDetailsShow_" + ComositionAnalysisSubContainerTypeId] = false;
                scope["SharpsBinContaminatesShow_" + ComositionAnalysisSubContainerTypeId] = false;
                document.getElementById('ContainerTypeSubTab' + ComositionAnalysisSubContainerTypeId).innerHTML = ComositionAnalysisSubContainerTypeId;

                Clear({ Type: "TEXTBOX", ControlId: "txtSharpsBinContainerNoControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "DDL", ControlId: "AddlSharpsBinSizeControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "DDL", ControlId: "AddlSharpsBinColourCodeControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "TEXTBOX", ControlId: "txtSharpsBinOthersControlId_" + ComositionAnalysisSubContainerTypeId });


                Clear({ Type: "Band", ControlId: "chkSharpsBinLabelUsefulControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "TEXTBOX", ControlId: "txtSharpsBinLabelUsefulCommentsControlId_" + ComositionAnalysisSubContainerTypeId });

                Clear({ Type: "Band", ControlId: "chkSharpsBinLidMatchLabelControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "TEXTBOX", ControlId: "txtSharpsBinLidMatchLabelCommentsControlId_" + ComositionAnalysisSubContainerTypeId });

                Clear({ Type: "Band", ControlId: "chkBinProperlyAssembledControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "TEXTBOX", ControlId: "txtBinProperlyAssembledCommentsControlId_" + ComositionAnalysisSubContainerTypeId });

                Clear({ Type: "Band", ControlId: "chkAssembledByLabelCompletedControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "TEXTBOX", ControlId: "txtAssembledByLabelCompletedCommentsControlId_" + ComositionAnalysisSubContainerTypeId });

                Clear({ Type: "Band", ControlId: "chkClosureMechanismInUseControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "TEXTBOX", ControlId: "txtClosureMechanismInUseCommentsControlId_" + ComositionAnalysisSubContainerTypeId });

                Clear({ Type: "Band", ControlId: "chkSharpsBinOverfilledControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "TEXTBOX", ControlId: "txtSharpsBinOverfilledCommentsControlId_" + ComositionAnalysisSubContainerTypeId });

                Clear({ Type: "Band", ControlId: "chkBinLabelUsefulControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "TEXTBOX", ControlId: "txtBinLabelUsefulCommentsControlId_" + ComositionAnalysisSubContainerTypeId });



                Clear({ Type: "Band", ControlId: "chkSharpsBinScoreContainerControlId_" + ComositionAnalysisSubContainerTypeId });

                ClearMultiSelectionDDLBand("chkSharpsAmberFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
                ClearMultiSelectionDDLBand("chkSharpsRedFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);

               

            }
        }

        if (option.ControlId == "chkSharpsBinScoreContainerControlId_" + ComositionAnalysisSubContainerTypeId) {//SharpsBin
            if (option.Name == "Fail" && option.Selected == true) {//F
                scope["SharpsBinContaminatesShow_" + ComositionAnalysisSubContainerTypeId] = true;
            }
            else {
                scope["SharpsBinContaminatesShow_" + ComositionAnalysisSubContainerTypeId] = false;
                ClearMultiSelectionDDLBand("chkSharpsAmberFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
                ClearMultiSelectionDDLBand("chkSharpsRedFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
            }
        }

        ///////////////////////////***************************************************** Sharps Bin End ******************************************/////////////////////////////////







        ///////////////////////////***************************************************** Rigid container Plastic Start ******************************************/////////////////////////////////

        if (option.ControlId == "chkRigidPlasticContainerTypeControlId_" + ComositionAnalysisSubContainerTypeId) {
            if (option.Name == "YES" && option.Selected == true) {//YES
                scope["RigidPlasticDetailsShow_" + ComositionAnalysisSubContainerTypeId] = true;
                document.getElementById('ContainerTypeSubTab' + ComositionAnalysisSubContainerTypeId).innerHTML = ComositionAnalysisSubContainerTypeId + '<i class="icon icon-hourglass"></i>';
            }
            else {
                //hide SharpsBinDetails
                scope["RigidPlasticDetailsShow_" + ComositionAnalysisSubContainerTypeId] = false;
                scope["RigidPlasticContaminatesShow_" + ComositionAnalysisSubContainerTypeId] = false;
                document.getElementById('ContainerTypeSubTab' + ComositionAnalysisSubContainerTypeId).innerHTML = ComositionAnalysisSubContainerTypeId;

                Clear({ Type: "TEXTBOX", ControlId: "txtRigidPlasticContainerNoControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "DDL", ControlId: "AddlRigidPlasticSizeControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "DDL", ControlId: "AddlRigidPlasticColourCodeControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "TEXTBOX", ControlId: "txtRigidPlasticOthersControlId_" + ComositionAnalysisSubContainerTypeId });


                Clear({ Type: "Band", ControlId: "chkRigidPlasticWasteTypesBinLabelControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "TEXTBOX", ControlId: "txtRigidPlasticWasteTypesBinLabelCommentsControlId_" + ComositionAnalysisSubContainerTypeId });

                Clear({ Type: "Band", ControlId: "chkRigidPlasticBinLabelUsefulControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "TEXTBOX", ControlId: "txtRigidPlasticBinLabelUsefulCommentsControlId_" + ComositionAnalysisSubContainerTypeId });

                Clear({ Type: "Band", ControlId: "chkRigidPlasticBinLidMatchLabelControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "TEXTBOX", ControlId: "txtRigidPlasticBinLidMatchLabelControlId_" + ComositionAnalysisSubContainerTypeId });



                Clear({ Type: "Band", ControlId: "chkRigidPlasticScoreContainerControlId_" + ComositionAnalysisSubContainerTypeId });

                ClearMultiSelectionDDLBand("chkRigidPlasticAmberFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
                ClearMultiSelectionDDLBand("chkRigidPlasticRedFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);

            }
        }

        if (option.ControlId == "chkRigidPlasticScoreContainerControlId_" + ComositionAnalysisSubContainerTypeId) {//Rigid container Plastic
            if (option.Name == "Fail" && option.Selected == true) {//F
                scope["RigidPlasticContaminatesShow_" + ComositionAnalysisSubContainerTypeId] = true;
            }
            else {
                scope["RigidPlasticContaminatesShow_" + ComositionAnalysisSubContainerTypeId] = false;
                ClearMultiSelectionDDLBand("chkRigidPlasticAmberFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
                ClearMultiSelectionDDLBand("chkRigidPlasticRedFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
            }
        }


        ///////////////////////////***************************************************** Rigid container Plastic End ******************************************/////////////////////////////////






        ///////////////////////////***************************************************** Rigid Card Start ******************************************/////////////////////////////////


        if (option.ControlId == "chkRigidCardContainerTypeControlId_" + ComositionAnalysisSubContainerTypeId) {
            if (option.Name == "YES" && option.Selected == true) {//YES
                scope["RigidCardDetailsShow_" + ComositionAnalysisSubContainerTypeId] = true;
                document.getElementById('ContainerTypeSubTab' + ComositionAnalysisSubContainerTypeId).innerHTML = ComositionAnalysisSubContainerTypeId + '<i class="icon icon-hourglass"></i>';
            }
            else {
                //hide SharpsBinDetails
                scope["RigidCardDetailsShow_" + ComositionAnalysisSubContainerTypeId] = false;
                scope["RigidCardContaminatesShow_" + ComositionAnalysisSubContainerTypeId] = false;
                document.getElementById('ContainerTypeSubTab' + ComositionAnalysisSubContainerTypeId).innerHTML = ComositionAnalysisSubContainerTypeId;

                Clear({ Type: "TEXTBOX", ControlId: "txtRigidCardContainerNoControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "DDL", ControlId: "AddlRigidCardSizeControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "DDL", ControlId: "AddlRigidCardColourCodeControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "TEXTBOX", ControlId: "txtRigidCardOthersControlId_" + ComositionAnalysisSubContainerTypeId });


                Clear({ Type: "Band", ControlId: "chkRigidCardWasteTypesBinLabelControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "TEXTBOX", ControlId: "txtRigidCardWasteTypesBinLabelCommentsControlId_" + ComositionAnalysisSubContainerTypeId });

                Clear({ Type: "Band", ControlId: "chkRigidCardBinLabelUsefulControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "TEXTBOX", ControlId: "txtRigidCardBinLabelUsefulCommentsControlId_" + ComositionAnalysisSubContainerTypeId });

                Clear({ Type: "Band", ControlId: "chkRigidCardBinLidMatchLabelControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "TEXTBOX", ControlId: "txtRigidCardBinLidMatchLabelCommentsControlId_" + ComositionAnalysisSubContainerTypeId });



                Clear({ Type: "Band", ControlId: "chkRigidCardScoreContainerControlId_" + ComositionAnalysisSubContainerTypeId });


                ClearMultiSelectionDDLBand("chkRigidCardAmberFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
                ClearMultiSelectionDDLBand("chkRigidCardRedFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
            }
        }

        if (option.ControlId == "chkRigidCardScoreContainerControlId_" + ComositionAnalysisSubContainerTypeId) {//Rigid Card 
            if (option.Name == "Fail" && option.Selected == true) {//F
                scope["RigidCardContaminatesShow_" + ComositionAnalysisSubContainerTypeId] = true;
            }
            else {
                scope["RigidCardContaminatesShow_" + ComositionAnalysisSubContainerTypeId] = false;
                ClearMultiSelectionDDLBand("chkRigidCardAmberFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
                ClearMultiSelectionDDLBand("chkRigidCardRedFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
            }
        }

        ///////////////////////////***************************************************** Rigid Card End ******************************************/////////////////////////////////






        ///////////////////////////***************************************************** Bag Start ******************************************/////////////////////////////////


        if (option.ControlId == "chkBagContainerTypeControlId_" + ComositionAnalysisSubContainerTypeId) {
            if (option.Name == "YES" && option.Selected == true) {//YES
                scope["BagDetailsShow_" + ComositionAnalysisSubContainerTypeId] = true;
                document.getElementById('ContainerTypeSubTab' + ComositionAnalysisSubContainerTypeId).innerHTML = ComositionAnalysisSubContainerTypeId + '<i class="icon icon-hourglass"></i>';
            }
            else {
                //hide SharpsBinDetails
                scope["BagDetailsShow_" + ComositionAnalysisSubContainerTypeId] = false;
                scope["BagContaminatesShow_" + ComositionAnalysisSubContainerTypeId] = false;
                document.getElementById('ContainerTypeSubTab' + ComositionAnalysisSubContainerTypeId).innerHTML = ComositionAnalysisSubContainerTypeId;

                Clear({ Type: "TEXTBOX", ControlId: "txtBagContainerNoControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "DDL", ControlId: "AddlBagSizeControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "DDL", ControlId: "AddlBagColourCodeControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "TEXTBOX", ControlId: "txtBagOthersControlId_" + ComositionAnalysisSubContainerTypeId });


                Clear({ Type: "Band", ControlId: "chkPedalBinLabelledControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "TEXTBOX", ControlId: "txtPedalBinLabelledCommentsControlId_" + ComositionAnalysisSubContainerTypeId });

                Clear({ Type: "Band", ControlId: "chkPedalBinLabelMatchControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "TEXTBOX", ControlId: "txtPedalBinLabelMatchCommentsControlId_" + ComositionAnalysisSubContainerTypeId });

                Clear({ Type: "Band", ControlId: "chkBagOverfilledControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "TEXTBOX", ControlId: "txtBagOverfilledCommentsControlId_" + ComositionAnalysisSubContainerTypeId });

                Clear({ Type: "Band", ControlId: "chkBinDamagedControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "TEXTBOX", ControlId: "txtBinDamagedCommentsControlId_" + ComositionAnalysisSubContainerTypeId });

                Clear({ Type: "Band", ControlId: "chkBinAppropriateForBagControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "TEXTBOX", ControlId: "txtBinAppropriateForBagCommentsControlId_" + ComositionAnalysisSubContainerTypeId });



                Clear({ Type: "Band", ControlId: "chkBagScoreContainerControlId_" + ComositionAnalysisSubContainerTypeId });

                ClearMultiSelectionDDLBand("chkBagAmberFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
                ClearMultiSelectionDDLBand("chkBagRedFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
            }
        }

        if (option.ControlId == "chkBagScoreContainerControlId_" + ComositionAnalysisSubContainerTypeId) {//Bag
            if (option.Name == "Fail" && option.Selected == true) {//F
                scope["BagContaminatesShow_" + ComositionAnalysisSubContainerTypeId] = true;
            }
            else {
                scope["BagContaminatesShow_" + ComositionAnalysisSubContainerTypeId] = false;
                ClearMultiSelectionDDLBand("chkBagAmberFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
                ClearMultiSelectionDDLBand("chkBagRedFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
            }
        }

        ///////////////////////////***************************************************** Bag End ******************************************/////////////////////////////////






        ///////////////////////////***************************************************** Glass Bucket Start ******************************************/////////////////////////////////


        if (option.ControlId == "chkGlassBucketContainerTypeControlId_" + ComositionAnalysisSubContainerTypeId) {
            if (option.Name == "YES" && option.Selected == true) {//YES
                scope["GlassBucketDetailsShow_" + ComositionAnalysisSubContainerTypeId] = true;
                document.getElementById('ContainerTypeSubTab' + ComositionAnalysisSubContainerTypeId).innerHTML = ComositionAnalysisSubContainerTypeId + '<i class="icon icon-hourglass"></i>';
            }
            else {
                //hide SharpsBinDetails
                scope["GlassBucketDetailsShow_" + ComositionAnalysisSubContainerTypeId] = false;
                scope["GlassBucketContaminatesShow_" + ComositionAnalysisSubContainerTypeId] = false;
                document.getElementById('ContainerTypeSubTab' + ComositionAnalysisSubContainerTypeId).innerHTML = ComositionAnalysisSubContainerTypeId;

                Clear({ Type: "TEXTBOX", ControlId: "txtGlassBucketContainerNoControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "DDL", ControlId: "AddlGlassBucketSizeControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "DDL", ControlId: "AddlGlassBucketColourCodeControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "TEXTBOX", ControlId: "txtGlassBucketOthersControlId_" + ComositionAnalysisSubContainerTypeId });



                Clear({ Type: "Band", ControlId: "chkGlassBucketScoreContainerControlId_" + ComositionAnalysisSubContainerTypeId });


                ClearMultiSelectionDDLBand("chkGlassBucketAmberFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
                ClearMultiSelectionDDLBand("chkGlassBucketRedFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
            }
        }

        if (option.ControlId == "chkGlassBucketScoreContainerControlId_" + ComositionAnalysisSubContainerTypeId) {//Glass Bucket
            if (option.Name == "Fail" && option.Selected == true) {//F
                scope["GlassBucketContaminatesShow_" + ComositionAnalysisSubContainerTypeId] = true;
            }
            else {
                scope["GlassBucketContaminatesShow_" + ComositionAnalysisSubContainerTypeId] = false;
                ClearMultiSelectionDDLBand("chkGlassBucketAmberFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
                ClearMultiSelectionDDLBand("chkGlassBucketRedFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
            }
        }

        ///////////////////////////***************************************************** Glass Bucket End ******************************************/////////////////////////////////






        ///////////////////////////***************************************************** CardboardBox Start ******************************************/////////////////////////////////


        if (option.ControlId == "chkCardboardBoxContainerTypeControlId_" + ComositionAnalysisSubContainerTypeId) {
            if (option.Name == "YES" && option.Selected == true) {//YES
                scope["CardboardBoxDetailsShow_" + ComositionAnalysisSubContainerTypeId] = true;
                document.getElementById('ContainerTypeSubTab' + ComositionAnalysisSubContainerTypeId).innerHTML = ComositionAnalysisSubContainerTypeId + '<i class="icon icon-hourglass"></i>';
            }
            else {
                //hide SharpsBinDetails
                scope["CardboardBoxDetailsShow_" + ComositionAnalysisSubContainerTypeId] = false;
                scope["CardboardBoxContaminatesShow_" + ComositionAnalysisSubContainerTypeId] = false;
                document.getElementById('ContainerTypeSubTab' + ComositionAnalysisSubContainerTypeId).innerHTML = ComositionAnalysisSubContainerTypeId;

                Clear({ Type: "TEXTBOX", ControlId: "txtCardboardBoxContainerNoControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "DDL", ControlId: "AddlCardboardBoxSizeControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "DDL", ControlId: "AddlCardboardBoxColourCodeControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "TEXTBOX", ControlId: "txtCardboardBoxOthersControlId_" + ComositionAnalysisSubContainerTypeId });



                Clear({ Type: "Band", ControlId: "chkCardboardBoxScoreContainerControlId_" + ComositionAnalysisSubContainerTypeId });


                ClearMultiSelectionDDLBand("chkCardboardBoxAmberFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
                ClearMultiSelectionDDLBand("chkCardboardBoxRedFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
            }
        }

        if (option.ControlId == "chkCardboardBoxScoreContainerControlId_" + ComositionAnalysisSubContainerTypeId) {//CardboardBox
            //if (option.Name == "F" && option.Selected == true) {//F
            if (option.Name == "Fail" && option.Selected == true) {//F
                scope["CardboardBoxContaminatesShow_" + ComositionAnalysisSubContainerTypeId] = true;
            }
            else {
                scope["CardboardBoxContaminatesShow_" + ComositionAnalysisSubContainerTypeId] = false;
                ClearMultiSelectionDDLBand("chkCardboardBoxAmberFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
                ClearMultiSelectionDDLBand("chkCardboardBoxRedFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
            }
        }

        ///////////////////////////***************************************************** CardboardBox End ******************************************/////////////////////////////////






        ///////////////////////////***************************************************** CartridgeReCyclingBox Start ******************************************/////////////////////////////////


        if (option.ControlId == "chkCartridgeReCyclingBoxContainerTypeControlId_" + ComositionAnalysisSubContainerTypeId) {
            if (option.Name == "YES" && option.Selected == true) {//YES
                scope["CartridgeReCyclingBoxDetailsShow_" + ComositionAnalysisSubContainerTypeId] = true;
                document.getElementById('ContainerTypeSubTab' + ComositionAnalysisSubContainerTypeId).innerHTML = ComositionAnalysisSubContainerTypeId + '<i class="icon icon-hourglass"></i>';
            }
            else {
                //hide SharpsBinDetails
                scope["CartridgeReCyclingBoxDetailsShow_" + ComositionAnalysisSubContainerTypeId] = false;
                scope["CartridgeReCyclingBoxContaminatesShow_" + ComositionAnalysisSubContainerTypeId] = false;
                document.getElementById('ContainerTypeSubTab' + ComositionAnalysisSubContainerTypeId).innerHTML = ComositionAnalysisSubContainerTypeId;

                Clear({ Type: "TEXTBOX", ControlId: "txtCartridgeReCyclingBoxContainerNoControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "DDL", ControlId: "AddlCartridgeReCyclingBoxSizeControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "DDL", ControlId: "AddlCartridgeReCyclingBoxColourCodeControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "TEXTBOX", ControlId: "txtCartridgeReCyclingBoxOthersControlId_" + ComositionAnalysisSubContainerTypeId });



                Clear({ Type: "Band", ControlId: "chkCartridgeReCyclingBoxScoreContainerControlId_" + ComositionAnalysisSubContainerTypeId });


                ClearMultiSelectionDDLBand("chkCartridgeReCyclingBoxAmberFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
                ClearMultiSelectionDDLBand("chkCartridgeReCyclingBoxRedFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
            }
        }

        if (option.ControlId == "chkCartridgeReCyclingBoxScoreContainerControlId_" + ComositionAnalysisSubContainerTypeId) {//CartridgeReCyclingBox
            //if (option.Name == "F" && option.Selected == true) {//F
            if (option.Name == "Fail" && option.Selected == true) {//F
                scope["CartridgeReCyclingBoxContaminatesShow_" + ComositionAnalysisSubContainerTypeId] = true;
            }
            else {
                scope["CartridgeReCyclingBoxContaminatesShow_" + ComositionAnalysisSubContainerTypeId] = false;
                ClearMultiSelectionDDLBand("chkCartridgeReCyclingBoxAmberFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
                ClearMultiSelectionDDLBand("chkCartridgeReCyclingBoxRedFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
            }
        }

        ///////////////////////////***************************************************** CartridgeReCyclingBox End ******************************************/////////////////////////////////



        ///////////////////////////***************************************************** Controlled drugs destruction kit Start ******************************************/////////////////////////////////


        if (option.ControlId == "chkControlleddrugsdestructionkitContainerTypeControlId_" + ComositionAnalysisSubContainerTypeId) {
            if (option.Name == "YES" && option.Selected == true) {//YES
                scope["ControlleddrugsdestructionkitDetailsShow_" + ComositionAnalysisSubContainerTypeId] = true;
                document.getElementById('ContainerTypeSubTab' + ComositionAnalysisSubContainerTypeId).innerHTML = ComositionAnalysisSubContainerTypeId + '<i class="icon icon-hourglass"></i>';
            }
            else {
                //hide SharpsBinDetails
                scope["ControlleddrugsdestructionkitDetailsShow_" + ComositionAnalysisSubContainerTypeId] = false;
                scope["ControlleddrugsdestructionkitContaminatesShow_" + ComositionAnalysisSubContainerTypeId] = false;
                document.getElementById('ContainerTypeSubTab' + ComositionAnalysisSubContainerTypeId).innerHTML = ComositionAnalysisSubContainerTypeId;

                Clear({ Type: "TEXTBOX", ControlId: "txtControlleddrugsdestructionkitContainerNoControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "DDL", ControlId: "AddlControlleddrugsdestructionkitSizeControlId_" + ComositionAnalysisSubContainerTypeId });
                //Clear({ Type: "DDL", ControlId: "AddlCartridgeReCyclingBoxColourCodeControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "TEXTBOX", ControlId: "txtControlleddrugsdestructionkitOthersControlId_" + ComositionAnalysisSubContainerTypeId });



                Clear({ Type: "Band", ControlId: "chkControlleddrugsdestructionkitScoreContainerControlId_" + ComositionAnalysisSubContainerTypeId });


                ClearMultiSelectionDDLBand("chkControlleddrugsdestructionkitAmberFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
                ClearMultiSelectionDDLBand("chkControlleddrugsdestructionkitRedFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
            }
        }

        if (option.ControlId == "chkControlleddrugsdestructionkitScoreContainerControlId_" + ComositionAnalysisSubContainerTypeId) {//CartridgeReCyclingBox
            //if (option.Name == "F" && option.Selected == true) {//F
            if (option.Name == "Fail" && option.Selected == true) {//F
                scope["ControlleddrugsdestructionkitContaminatesShow_" + ComositionAnalysisSubContainerTypeId] = true;
            }
            else {
                scope["ControlleddrugsdestructionkitContaminatesShow_" + ComositionAnalysisSubContainerTypeId] = false;
                ClearMultiSelectionDDLBand("chkControlleddrugsdestructionkitAmberFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
                ClearMultiSelectionDDLBand("chkControlleddrugsdestructionkitRedFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
            }
        }

        ///////////////////////////***************************************************** Controlled drugs destruction kit End ******************************************/////////////////////////////////


        ///////////////////////////***************************************************** Mercury amalgam container Start ******************************************/////////////////////////////////


        if (option.ControlId == "chkMercuryamalgamcontainerContainerTypeControlId_" + ComositionAnalysisSubContainerTypeId) {
            if (option.Name == "YES" && option.Selected == true) {//YES
                scope["MercuryamalgamcontainerDetailsShow_" + ComositionAnalysisSubContainerTypeId] = true;
                document.getElementById('ContainerTypeSubTab' + ComositionAnalysisSubContainerTypeId).innerHTML = ComositionAnalysisSubContainerTypeId + '<i class="icon icon-hourglass"></i>';
            }
            else {
                //hide SharpsBinDetails
                scope["MercuryamalgamcontainerDetailsShow_" + ComositionAnalysisSubContainerTypeId] = false;
                scope["MercuryamalgamcontainerContaminatesShow_" + ComositionAnalysisSubContainerTypeId] = false;
                document.getElementById('ContainerTypeSubTab' + ComositionAnalysisSubContainerTypeId).innerHTML = ComositionAnalysisSubContainerTypeId;

                Clear({ Type: "TEXTBOX", ControlId: "txtMercuryamalgamcontainerContainerNoControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "DDL", ControlId: "AddlMercuryamalgamcontainerSizeControlId_" + ComositionAnalysisSubContainerTypeId });
                //Clear({ Type: "DDL", ControlId: "AddlCartridgeReCyclingBoxColourCodeControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "TEXTBOX", ControlId: "txtMercuryamalgamcontainerOthersControlId_" + ComositionAnalysisSubContainerTypeId });



                Clear({ Type: "Band", ControlId: "chkMercuryamalgamcontainerScoreContainerControlId_" + ComositionAnalysisSubContainerTypeId });


                ClearMultiSelectionDDLBand("chkMercuryamalgamcontainerAmberFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
                ClearMultiSelectionDDLBand("chkMercuryamalgamcontainerRedFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
            }
        }

        if (option.ControlId == "chkMercuryamalgamcontainerScoreContainerControlId_" + ComositionAnalysisSubContainerTypeId) {//CartridgeReCyclingBox
            //if (option.Name == "F" && option.Selected == true) {//F
            if (option.Name == "Fail" && option.Selected == true) {//F
                scope["MercuryamalgamcontainerContaminatesShow_" + ComositionAnalysisSubContainerTypeId] = true;
            }
            else {
                scope["MercuryamalgamcontainerContaminatesShow_" + ComositionAnalysisSubContainerTypeId] = false;
                ClearMultiSelectionDDLBand("chkMercuryamalgamcontainerAmberFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
                ClearMultiSelectionDDLBand("chkMercuryamalgamcontainerRedFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
            }
        }

        ///////////////////////////***************************************************** Mercury amalgam container End ******************************************/////////////////////////////////

        ///////////////////////////***************************************************** Waste Hand gel container Start ******************************************/////////////////////////////////


        if (option.ControlId == "chkWasteHandgelcontainerContainerTypeControlId_" + ComositionAnalysisSubContainerTypeId) {
            if (option.Name == "YES" && option.Selected == true) {//YES
                scope["WasteHandgelcontainerDetailsShow_" + ComositionAnalysisSubContainerTypeId] = true;
                document.getElementById('ContainerTypeSubTab' + ComositionAnalysisSubContainerTypeId).innerHTML = ComositionAnalysisSubContainerTypeId + '<i class="icon icon-hourglass"></i>';
            }
            else {
                //hide SharpsBinDetails
                scope["WasteHandgelcontainerDetailsShow_" + ComositionAnalysisSubContainerTypeId] = false;
                scope["WasteHandgelcontainerContaminatesShow_" + ComositionAnalysisSubContainerTypeId] = false;
                document.getElementById('ContainerTypeSubTab' + ComositionAnalysisSubContainerTypeId).innerHTML = ComositionAnalysisSubContainerTypeId;

                Clear({ Type: "TEXTBOX", ControlId: "txtWasteHandgelcontainerContainerNoControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "DDL", ControlId: "AddlWasteHandgelcontainerSizeControlId_" + ComositionAnalysisSubContainerTypeId });
                //Clear({ Type: "DDL", ControlId: "AddlCartridgeReCyclingBoxColourCodeControlId_" + ComositionAnalysisSubContainerTypeId });
                Clear({ Type: "TEXTBOX", ControlId: "txtWasteHandgelcontainerOthersControlId_" + ComositionAnalysisSubContainerTypeId });



                Clear({ Type: "Band", ControlId: "chkWasteHandgelcontainerScoreContainerControlId_" + ComositionAnalysisSubContainerTypeId });


                ClearMultiSelectionDDLBand("chkWasteHandgelcontainerAmberFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
                ClearMultiSelectionDDLBand("chkWasteHandgelcontainerRedFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
            }
        }

        if (option.ControlId == "chkWasteHandgelcontainerScoreContainerControlId_" + ComositionAnalysisSubContainerTypeId) {//CartridgeReCyclingBox
            //if (option.Name == "F" && option.Selected == true) {//F
            if (option.Name == "Fail" && option.Selected == true) {//F
                scope["WasteHandgelcontainerContaminatesShow_" + ComositionAnalysisSubContainerTypeId] = true;
            }
            else {
                scope["WasteHandgelcontainerContaminatesShow_" + ComositionAnalysisSubContainerTypeId] = false;
                ClearMultiSelectionDDLBand("chkWasteHandgelcontainerAmberFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
                ClearMultiSelectionDDLBand("chkWasteHandgelcontainerRedFailContaminatesControlId_" + ComositionAnalysisSubContainerTypeId);
            }
        }

        ///////////////////////////***************************************************** Waste Hand gel container End ******************************************/////////////////////////////////


        OneViewConsole.Debug("PreAcceptanceCompositionAnalysisHandler_3271 End", "AnswerMode.PreAcceptanceCompositionAnalysisHandler_3271");
    }
    catch (Excep) {
        ////alert("Excep : " + Excep)
        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.PreAcceptanceCompositionAnalysisHandler_3271", Excep);
    }

}

function BulkWasteElementHandler(option) {

    try {
        OneViewConsole.Debug("BulkWasteElementHandler Start", "AnswerMode.BulkWasteElementHandler");

        if (option.ControlId == "chkWasteStoredatYardType_" + WasteType) {

            if (option.Name == "Dedicated wheelie bin" && option.Selected == true) {
                scope["Others_" + WasteType] = false;
                scope["Compactorskip_" + WasteType] = false;
                scope["DedicatedWhellieBin_" + WasteType] = true;
                Clear({ Type: "TEXTBOX", ControlId: "txtOthers_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkIsskipsecured_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkIscompactorskiplockoff_" + WasteType });
            }
            else if (option.Name == "Compactor skip" && option.Selected == true) {
                scope["Others_" + WasteType] = false;
                scope["DedicatedWhellieBin_" + WasteType] = false;
                scope["Compactorskip_" + WasteType] = true;
                Clear({ Type: "TEXTBOX", ControlId: "txtOthers_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkIsskipsecured_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkCorrectlyColurCoded_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkHaswheeliebinbeenclosed_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkHaswheeliebinbeenLocked_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkIswheeliebinlockfunctional_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkIswheeliebindamaged_" + WasteType });
            }
            else if (option.Name == "Other" && option.Selected == true) {
                scope["Others_" + WasteType] = true;
                scope["DedicatedWhellieBin_" + WasteType] = false;
                Clear({ Type: "Band", ControlId: "chkCorrectlyColurCoded_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkHaswheeliebinbeenclosed_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkHaswheeliebinbeenLocked_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkIswheeliebinlockfunctional_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkIswheeliebindamaged_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkIscompactorskiplockoff_" + WasteType });
            }
            else {
                scope["Others_" + WasteType] = false;
                scope["DedicatedWhellieBin_" + WasteType] = false;
                scope["Compactorskip_" + WasteType] = false;
                Clear({ Type: "TEXTBOX", ControlId: "txtOthers_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkIsskipsecured_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkCorrectlyColurCoded_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkHaswheeliebinbeenclosed_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkHaswheeliebinbeenLocked_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkIswheeliebinlockfunctional_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkIswheeliebindamaged_" + WasteType });
                Clear({ Type: "Band", ControlId: "chkIscompactorskiplockoff_" + WasteType });
            }
        }
        else if (option.ControlId == "chkContainerStatus_" + WasteType) {
            //if (option.Name == "E" || option.Name == "P" || option.Selected == false) {
           
            if (option.Id == 580 || option.Id == 578 || option.Selected == false) {
                scope["Contaminants_" + WasteType] = false;
                scope["chkAmbercontaminants_" + WasteType].Clear();
                scope["chkRedcontaminants_" + WasteType].Clear();
            }
            //else if (option.Name == "F") {
            else if (option.Id == 579) {
                scope["Contaminants_" + WasteType] = true;
            }
        }
        if (option.ControlId == "txtWasteType_" + WasteType) {

            var WasteTypeInfo = {
                1: "General Domestic",
                2: "General domestic glass",
                3: "Confidential Waste",
                4: "Printer cartridges",
                5: "Cytotoxic/cytostatic sharps",
                6: "Non-sharp cytotoxic/cytostatic waste",
                7: "Cytotoxic/cytostatic incontinence waste",
                8: "Medicinally contaminated sharps",
                9: "Non-sharps Medicinal waste",
                10: "Controlled drugs",
                11: "Sharps waste contaminated with bodily fluids and hazardous chemicals",
                12: "Non-sharps waste contaminated with bodily fluids and hazardous chemicals",
                13: "Non-cytotoxic/cytostatic medicines in packaging",
                14: "Non-medicinal sharps",
                15: "Non-sharps Infectious waste (NB all non-medicinal waste from an isolation patient is treated as infectious)",
                16: "Offensive/Hygiene waste",
                17: "Autoclaved  waste not containing chemicals",
                18: "Recognisable anatomical waste",
                19: "Amalgam",
                20: "Gypsum",
                21: "Hand gel pouches",
                22: "Waste chemicals including contaminated packaging/auto analyser cartridges",
                23: "Cat A diagnostics/cultures"
            }

            if (option.Name == "YES" && option.Selected == true) {//YES
                scope["Div_" + option.ControlId] = true;
                document.getElementById('WasteType' + WasteType).innerHTML = WasteTypeInfo[WasteType] + '<i class="icon icon-hourglass"></i>';
            }
            else {
                scope["Div_" + option.ControlId] = false;
                document.getElementById('WasteType' + WasteType).innerHTML = WasteTypeInfo[WasteType];
            }
        }


        OneViewConsole.Debug("BulkWasteElementHandler End", "AnswerMode.BulkWasteElementHandler");
    }
    catch (Excep) {
        ////alert("Excep : " + Excep)
        throw oOneViewExceptionHandler.Create("Framework", "AnswerMode.BulkWasteElementHandler", Excep);
    }
}

///////////////////////////////////***************************************CMFT Code END******************************************////////////////////////////////=======


/**************************Traning START*********************************/
function TescoTraningHandler(option) {
    try {
        OneViewConsole.Debug("TescoTraningHandler Start", "OneViewAdvAnswerModeUserControl.TescoTraningHandler");

        if (option.ControlId == "chkTraningTypeControlId") {
            if (option.Name == "Induction" && option.Selected == true) {
                scope.DivInduction = true;
                scope.DivTask = false;
                scope.DivEquipment = false;
                
            }
            else if (option.Name == "Task" && option.Selected == true) {
                scope.DivInduction = false;
                scope.DivTask = true;
                scope.DivEquipment = false;
                
            }
            else if (option.Name == "Equipment" && option.Selected == true) {
                scope.DivInduction = false;
                scope.DivTask = false;
                scope.DivEquipment = true;
            }
            else {
                scope.DivInduction = false;
                scope.DivTask = false;
                scope.DivEquipment = false;
              
            }
        }
        
        OneViewConsole.Debug("TescoTraningHandler End", "OneViewAdvAnswerModeUserControl.TescoTraningHandler");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAnswerModeUserControl.BandSelection", Excep);
    }
}

function TravisPerkinsTraningModuleHandler(option) {
    try {
        OneViewConsole.Debug("TravisPerkinsTraningModuleHandler Start", "OneViewAdvAnswerModeUserControl.TravisPerkinsTraningModuleHandler");

        if (option.ControlId == "chkTraningTypeControlId") {
            if (option.Name == "Induction" && option.Selected == true) {
                scope.DivInduction = true;
                scope.DivTask = false;
                scope.DivEquipment = false;

            }
            else if (option.Name == "Task" && option.Selected == true) {
                scope.DivInduction = false;
                scope.DivTask = true;
                scope.DivEquipment = false;

            }
            else if (option.Name == "Equipment" && option.Selected == true) {
                scope.DivInduction = false;
                scope.DivTask = false;
                scope.DivEquipment = true;
            }
            else {
                scope.DivInduction = false;
                scope.DivTask = false;
                scope.DivEquipment = false;

            }
        }

        OneViewConsole.Debug("TravisPerkinsTraningModuleHandler End", "OneViewAdvAnswerModeUserControl.TravisPerkinsTraningModuleHandler");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Framework", "OneViewAdvAnswerModeUserControl.BandSelection", Excep);
    }
}

/**************************Traning End*********************************/





//////////////////////////////////////////************************************Band Intialize framework START******************************************//////////////////////////////////////////

function BandIntializeFramework() {

    this.SingleSelectIntialize = function (TemplateNodes, $scope) {
        try {
            OneViewConsole.Debug("SingleSelectIntialize Start", "BandIntializeFramework.SingleSelectIntialize");

            for (NodeId in TemplateNodes) {

                if (typeof (TemplateNodes[NodeId]) != 'function') {

                    var TemplateNodeObject = TemplateNodes[NodeId];

                    for (itrAnswerMode in TemplateNodeObject.AnswerMode) {

                        if (typeof (TemplateNodeObject.AnswerMode[itrAnswerMode]) != 'function') {

                            if (TemplateNodeObject.AnswerMode[itrAnswerMode].Type == "Band") {

                                var DataSourceName = "Band_" + NodeId + "_" + TemplateNodeObject.AnswerMode[itrAnswerMode].ControlId + "_DataSource";
                                $scope[DataSourceName] = [];

                                var _oAnswerModeUserControl = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': TemplateNodeObject.AnswerMode[itrAnswerMode].ControlId, 'DataSourceModelName': DataSourceName, 'DisplayElementModelName': 'NewDCModel.' + [TemplateNodeObject.AnswerMode[itrAnswerMode].ControlId] });
                                _oAnswerModeUserControl.AnswerModes(TemplateNodes, NodeId);
                            }
                        }
                    }
                }
            }

            OneViewConsole.Debug("SingleSelectIntialize End", "BandIntializeFramework.SingleSelectIntialize");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "BandIntializeFramework.SingleSelectIntialize", Excep);
        }

    }

    //if no event is there to register then oMultiSelectPostCloseEventHandler should be passed as null
    this.MultiSelectIntialize = function (TemplateNodes, $scope, oMultiSelectPostCloseEventHandler) {
        try {
            OneViewConsole.Debug("MultiSelectIntialize Start", "BandIntializeFramework.MultiSelectIntialize");

            for (NodeId in TemplateNodes) {

                if (typeof (TemplateNodes[NodeId]) != 'function') {

                    var TemplateNodeObject = TemplateNodes[NodeId];

                    for (itrAnswerMode in TemplateNodeObject.AnswerMode) {

                        if (typeof (TemplateNodeObject.AnswerMode[itrAnswerMode]) != 'function') {

                            if (TemplateNodeObject.AnswerMode[itrAnswerMode].Type == "DCListViewControlConfig" && TemplateNodeObject.AnswerMode[itrAnswerMode].SelectionType == "MULTI") {
                                                              
                                var _oOneViewAdvMultiSelectAnswerModeUserControl = new OneViewAdvMultiSelectAnswerModeUserControl({ "TemplateNode": TemplateNodes[NodeId], "Scope": $scope, "AttributeId": NodeId, "ControlId": TemplateNodeObject.AnswerMode[itrAnswerMode].ControlId, 'oMultiSelectPostCloseEventHandler': oMultiSelectPostCloseEventHandler });
                                _oOneViewAdvMultiSelectAnswerModeUserControl.Init();
                                
                            }
                        }
                    }
                }
            }

            OneViewConsole.Debug("MultiSelectIntialize End", "BandIntializeFramework.MultiSelectIntialize");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "BandIntializeFramework.MultiSelectIntialize", Excep);
        }

    }


    
}


//////////////////////////////////////////************************************Band Intialize framework END******************************************//////////////////////////////////////////