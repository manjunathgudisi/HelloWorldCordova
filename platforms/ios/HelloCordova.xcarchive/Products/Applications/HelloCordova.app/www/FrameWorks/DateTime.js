
function DateTime() {

    var m_names = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
    var d = new Date();

    var curr_date = d.getDate();
    curr_date = (curr_date <= 9) ? ("0" + curr_date) : curr_date;

    var curr_month = d.getMonth();
    //curr_month = (curr_month < 9) ? ("0" + curr_month) : curr_month;

    var curr_year = d.getFullYear();
    //curr_year = (curr_year < 9) ? ("0" + curr_year) : curr_year;

    var Curr_hours = d.getHours();
    Curr_hours = (Curr_hours <= 9) ? ("0" + Curr_hours) : Curr_hours;

    var Curr_minutes = d.getMinutes();
    Curr_minutes = (Curr_minutes <= 9) ? ("0" + Curr_minutes) : Curr_minutes;

    var Curr_seconds = d.getSeconds();
    Curr_seconds = (Curr_seconds <= 9) ? ("0" + Curr_seconds) : Curr_seconds;

    
    this.GetHours = function () {
        try {
            //OneViewConsole.Debug("GetHours Start", "DateTime.GetHours");
          //  OneViewConsole.Debug("GetHours End", "DateTime.GetHours");

            return Curr_hours;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DateTime.GetHours", Excep);
        }
    }

    this.GetMinutes = function () {
        try {
          //  OneViewConsole.Debug("GetMinutes Start", "DateTime.GetMinutes");
          //  OneViewConsole.Debug("GetMinutes End", "DateTime.GetMinutes");

            return Curr_minutes;
        }
        catch (Excep) {
          //  throw oOneViewExceptionHandler.Create("Framework", "DateTime.GetMinutes", Excep);
        }
    }

    this.GetSeconds = function () {
        try {
           // OneViewConsole.Debug("GetSeconds Start", "DateTime.GetSeconds");
           // OneViewConsole.Debug("GetSeconds End", "DateTime.GetSeconds");

            return Curr_seconds;
        }
        catch (Excep) {
            //throw oOneViewExceptionHandler.Create("Framework", "DateTime.GetSeconds", Excep);
        }
    }

    this.GetDay = function () {
        try {
            OneViewConsole.Debug("GetDay Start", "DateTime.GetDay");
            OneViewConsole.Debug("GetDay End", "DateTime.GetDay");

            return curr_date;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DateTime.GetDay", Excep);
        }
    }

    this.GetMonth = function () {
        try {
            OneViewConsole.Debug("GetMonth Start", "DateTime.GetMonth");
            OneViewConsole.Debug("GetMonth End", "DateTime.GetMonth");

            return m_names[curr_month];
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DateTime.GetMonth", Excep);
        }
    }

    this.GetYear = function () {
        try {
            OneViewConsole.Debug("GetYear Start", "DateTime.GetYear");
            OneViewConsole.Debug("GetYear End", "DateTime.GetYear");

            return curr_year;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DateTime.GetYear", Excep);
        }
    }

    this.GetDate = function () {
        try {
           // OneViewConsole.Debug("GetDate Start", "DateTime.GetDate");

                var Cuur_Date = curr_date + "-" + m_names[curr_month] + "-" + curr_year;

           // OneViewConsole.Debug("GetDate End", "DateTime.GetDate");

            return Cuur_Date;
        }
        catch (Excep) {
           // throw oOneViewExceptionHandler.Create("Framework", "DateTime.GetDate", Excep);
        }
        finally
        {
            Cuur_Date = null;
        }
    }

    this.GetTime = function () {
        try {
            OneViewConsole.Debug("GetTime Start", "DateTime.GetTime");

                var Cuur_Time = Curr_hours + ":" + Curr_minutes + ":" + Curr_seconds;    
            
            OneViewConsole.Debug("GetTime End", "DateTime.GetTime");

            return Cuur_Time;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DateTime.GetTime", Excep);
        }
        finally {
            Cuur_Time = null;
        }
    }
    
    this.GetHoursAndMinutes = function () {
        try {
            OneViewConsole.Debug("GetHoursAndMinutes Start", "DateTime.GetHoursAndMinutes");

                var Cuur_Time = Curr_hours + ":" + Curr_minutes;

            OneViewConsole.Debug("GetHoursAndMinutes End", "DateTime.GetHoursAndMinutes");
            return Cuur_Time;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DateTime.GetHoursAndMinutes", Excep);
        }
        finally {
            Cuur_Time = null;
        }
    }

    this.GetDateAndTime = function () {
        try {
            OneViewConsole.Debug("GetDateAndTime Start", "DateTime.GetDateAndTime");

                var Cuur_Time = Curr_hours + ":" + Curr_minutes + ":" + Curr_seconds;
                var Cuur_Date_Time = curr_date + "-" + m_names[curr_month] + "-" + curr_year + " " + Cuur_Time;

            OneViewConsole.Debug("GetDateAndTime End", "DateTime.GetDateAndTime");

            return Cuur_Date_Time;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DateTime.GetDateAndTime", Excep);
        }
        finally {
            Cuur_Time = null;
            Cuur_Date_Time = null;
        }
    }

    this.GetDateByCustomSeparator = function (Separator) {
        try {
            OneViewConsole.Debug("GetDateByCustomSeparator Start", "DateTime.GetDateByCustomSeparator");

                var Cuur_Date = curr_date + Separator + m_names[curr_month] + Separator + curr_year;

            OneViewConsole.Debug("GetDateByCustomSeparator End", "DateTime.GetDateByCustomSeparator");

            return Cuur_Date;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DateTime.GetDateByCustomSeparator", Excep);
        }
        finally {
            Cuur_Date = null;
        }
    }

    this.GetTimeCustomSeparator = function (Separator) {
        try {
            OneViewConsole.Debug("GetTimeCustomSeparator Start", "DateTime.GetTimeCustomSeparator");

                var Cuur_Time = Curr_hours + Separator + Curr_minutes + Separator + Curr_seconds;

            OneViewConsole.Debug("GetTimeCustomSeparator End", "DateTime.GetTimeCustomSeparator");

            return Cuur_Time;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DateTime.GetTimeCustomSeparator", Excep);
        }
        finally {
            Cuur_Time = null;
        }
    }

    this.GetDateAndTimeCustomSeparator = function (DateSeparator, TimeSeparator, DateAndTimeSeparator) {
        try {
           // OneViewConsole.Debug("GetDateAndTimeCustomSeparator Start", "DateTime.GetDateAndTimeCustomSeparator");

                var Cuur_Time = Curr_hours + TimeSeparator + Curr_minutes + TimeSeparator + Curr_seconds;
                var Cuur_Date_Time = curr_date + DateSeparator + m_names[curr_month] + DateSeparator + curr_year + DateAndTimeSeparator + Cuur_Time;

           //OneViewConsole.Debug("GetDateAndTimeCustomSeparator End", "DateTime.GetDateAndTimeCustomSeparator");

            return Cuur_Date_Time;
        }
        catch (Excep) {
            alert("GetDateAndTimeCustomSeparator : "+Excep);
            //throw oOneViewExceptionHandler.Create("Framework", "DateTime.GetDateAndTimeCustomSeparator", Excep);
        }
        finally {
            Cuur_Time = null;
            Cuur_Date_Time = null;
        }
    }

    // DateString should be "DD-MM-YYYY HH:MM::SS"
    this.GetDateByString = function (DateString) {

        try {
            OneViewConsole.Debug("GetDateByString Start", "DateTime.GetDateByString");

            var oDateSplit = DateString.split(' ');

            var oDate = oDateSplit[0].split('-');
            var oTime = oDateSplit[1].split(':');

            var OutPutDate = new Date(oDate[2], (parseInt(oDate[1]) - 1), oDate[0], oTime[0], oTime[1], oTime[2]);
           
            OneViewConsole.Debug("GetDateByString End", "DateTime.GetDateByString");

            return OutPutDate;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DateTime.GetDateByString", Excep);
        }
        finally {
            oDateSplit = null;
            oDate = null;
            oTime = null;
            OutPutDate = null;
        }       
    }

    // DateString is in any format
    this.GetDateByStringCustomSeparator = function (DateSeparator, TimeSeparator, DateAndTimeSeparator) {
        try {
            OneViewConsole.Debug("GetDateByStringCustomSeparator Start", "DateTime.GetDateByStringCustomSeparator");

            var oDateSplit = DateString.split(DateAndTimeSeparator);

            var oDate = oDateSplit[0].split(DateSeparator);
            var oTime = oDateSplit[1].split(TimeSeparator);

             var OutPutDate = new Date(oDate[2], (parseInt(oDate[1]) - 1), oDate[0], oTime[0], oTime[1], oTime[2]);

             OneViewConsole.Debug("GetDateByStringCustomSeparator End", "DateTime.GetDateByStringCustomSeparator");

             return OutPutDate;
        }
        catch (Excep) {           
            throw oOneViewExceptionHandler.Create("Framework", "DateTime.GetDateByStringCustomSeparator", Excep);
        }
        finally {
            oDateSplit = null;
            oDate = null;
            oTime = null;
            OutPutDate = null;
        }
    }

    //input date format yyyy-mm-dd
    //To Do : it need to support multiple format
    this.GetDateByControlId = function (ControlId) {
        try {
            OneViewConsole.Debug("GetDateByControlId Start", "DateTime.GetDateByControlId");

            var DateArray;
            var _oDate;
            if (document.getElementById(ControlId) != null) {
                DateArray = (document.getElementById(ControlId).value).split('-');
                _oDate = new Date(DateArray[0], parseInt(DateArray[1]) - 1, DateArray[2]);
            }

            else {
                _oDate = "";
            }
           
            OneViewConsole.Debug("GetDateByControlId End", "DateTime.GetDateByControlId");

            return _oDate
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DateTime.GetDateByControlId", Excep);
        }
        finally {
            DateArray = null;
            oDate = null;
        }
    }

    //Gives date in new Date() format
    //currently we pass date as yyyy-mm-dd to new Date
    this.GetFormattedDate = function () {
        try {
            var Cuur_Date= new Date(curr_year, parseInt(m_names[curr_month]) - 1, curr_date);
            return Cuur_Date;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DateTime.GetFormattedDate", Excep);
        }
        finally {
            Cuur_Date = null;
        }
    }
       

    //Gives difference between current date and passed date in hours
    this.GetDiffBWCurrentNSelectedDate = function (ControlId) {
        try {
           
           
            var OutPutDate ="";
            if (document.getElementById(ControlId) != null) {
                var DateString = document.getElementById(ControlId).value;
                var oDateSplit = DateString.split('-');
                // var oTime = oDateSplit[1].split(':');
                OutPutDate = new Date(oDateSplit[0], (parseInt(oDateSplit[1]) - 1), oDateSplit[2], 0, 0, 0);
            }
          
            var hours = "";
            if (OutPutDate != "") {
                var currentDate = this.GetDate();
                var SpilltedCurrentdate = currentDate.split("-");
                var DateDiffInMilliSec = ((new Date(SpilltedCurrentdate[2], (parseInt(SpilltedCurrentdate[1]) - 1), SpilltedCurrentdate[0], 0, 0, 0)) - OutPutDate);
                hours = DateDiffInMilliSec / 3600000
            }
            //alert(hours);
            return hours;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DateTime.GetDiffBWCurrentNSelectedDate", Excep);
        }
        finally {
            
        }
    }


    this.ConvertDateTimeToInteger = function (oDateTime) {
        try {
            var FinalDateTimeString = "";

            if (oDateTime != undefined && oDateTime != "" && oDateTime != null) {
                var oDateTimeSplitted = oDateTime.split(" ");
                var oDateArr = oDateTimeSplitted[0].split("-");
                var oTimeArr = oDateTimeSplitted[1].split(":");

                if (oDateArr != undefined && oDateArr != "" && oDateArr != null) {
                    if (oTimeArr != undefined && oTimeArr != "" && oTimeArr != null) {
                        FinalDateTimeString = oDateArr[2] + oDateArr[1] + oDateArr[0] + oTimeArr[0] + oTimeArr[1] + oTimeArr[2];
                    }
                }               
            }

            //alert('FinalDateTimeString : ' + FinalDateTimeString);
            return FinalDateTimeString;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DateTime.ConvertDateTimeToInteger", Excep);
        }
        finally {

        }
    }

    this.ConvertTimeToInteger = function (oTime) {
        try {
            var FinalTimeString = "";

            if (oTime != undefined && oTime != "" && oTime != null) {
                var oTimeArr = oTime.split(":");

                if (oTimeArr != undefined && oTimeArr != "" && oTimeArr != null) {
                    FinalTimeString = oTimeArr[0] + oTimeArr[1] + oTimeArr[2];
                }

            }

           // alert('FinalTimeString : ' + FinalTimeString);
            return FinalTimeString;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DateTime.ConvertTimeToInteger", Excep);
        }
        finally {

        }
    }

   
    this.GetMonthYearByControlId = function (ControlId) {
        try {
            OneViewConsole.Debug("GetMonthYearByControlId Start", "DateTime.GetMonthYearByControlId");

           // alert('date :' + curr_date);
            var DateArray;
            var _oDate;
            if (document.getElementById(ControlId) != null) {
                DateArray = (document.getElementById(ControlId).value).split('-');
                _oDate = new Date(DateArray[0], parseInt(DateArray[1]) - 1, curr_date);
                
            }

            else {
                _oDate = "";
            }

            OneViewConsole.Debug("GetMonthYearByControlId End", "DateTime.GetMonthYearByControlId");

            return _oDate
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DateTime.GetMonthYearByControlId", Excep);
        }
        finally {
            DateArray = null;
            oDate = null;
        }
    }
}


function AirthmeticOperation() {
    
    var MyInstance = this;

    this.GetFormattedDateTimeOLD = function (ControlId) {
        try {
            OneViewConsole.Debug("GetFormattedDateTime Start", "DataCaptureBO.GetFormattedDateTime");

            var Value = scope[ControlId + "_DateTime"]; 
            var FormattedDateTime = undefined;
            if (Value != undefined && Value != null && Value != "") {
                var ValueSplittedBySpace = Value.split(" ");
                var ValueSplittedByHifen = (ValueSplittedBySpace[0]).split("-");
                var ValueSplittedByColon = (ValueSplittedBySpace[1]).split(":");
                FormattedDateTime = new Date(ValueSplittedByHifen[2], (ValueSplittedByHifen[1] - 1), ValueSplittedByHifen[0], ValueSplittedByColon[0], ValueSplittedByColon[1]);
            }
            OneViewConsole.Debug("GetFormattedDateTime End", "DataCaptureBO.GetFormattedDateTime");

            return FormattedDateTime;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "AirthmeticOperation.GetFormattedDateTime", Excep);
        }
    }



    this.GetFormattedDateTime = function (ControlId) {
        try {
            OneViewConsole.Debug("GetFormattedDateTime Start", "DataCaptureBO.GetFormattedDateTime");

            var Answer = undefined;
            if (document.getElementById(ControlId) != null) {
                Answer = document.getElementById(ControlId).value;
            }


            if (Answer == null || Answer == undefined || Answer == "") {
                Answer = undefined;
            }
            else {

                if (scope[ControlId + "_DateTime"] != null && scope[ControlId + "_DateTime"] != '') {

                    Answer = scope[ControlId + "_DateTime"].split(' ')[0] + " " + Answer;
                }
                else {
                    var oDateTime = new DateTime();
                    Answer = oDateTime.GetDate() + " " + Answer;
                }

                if (Answer != undefined && Answer != null && Answer != "") {
                    var ValueSplittedBySpace = Answer.split(" ");
                    var ValueSplittedByHifen = (ValueSplittedBySpace[0]).split("-");
                    var ValueSplittedByColon = (ValueSplittedBySpace[1]).split(":");
                    Answer = new Date(ValueSplittedByHifen[2], (ValueSplittedByHifen[1] - 1), ValueSplittedByHifen[0], ValueSplittedByColon[0], ValueSplittedByColon[1]);
                }
            }

            return Answer;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "AirthmeticOperation.GetFormattedDateTime", Excep);
        }
    }
    
    //Equation will be evaluate as : (Left - Right)
    this.GetDifferenceBtwTwoDateTime = function (LeftAttributeId, LeftControlId, RightAttributeId, RightControlId) {
        try {

            //var ServiceId = OneViewSessionStorage.Get("ServiceId");
            //var TemplateId = OneViewSessionStorage.Get("TemplateId");
            //var TemplateName = OneViewSessionStorage.Get("TemplateName");
            //var TemplateNodes = TemplateMetaData[ServiceId][TemplateId];

            var LeftValue = MyInstance.GetFormattedDateTime(LeftControlId); //GetControlValue(TemplateNodes, LeftAttributeId, LeftControlId);
            var RightValue = MyInstance.GetFormattedDateTime(RightControlId); //GetControlValue(TemplateNodes, RightAttributeId, RightControlId);
            var Diff = null;
            if ((LeftValue != undefined && LeftValue != null) && (RightValue != undefined && RightValue != null)) {
                Diff = LeftValue - RightValue; //difference is in milliseconds
                Diff = (Diff / 60000); // Difference in minutes              
                return Diff;
            }

            else {
                //always need to return (if we are returning something else , evaluation will work not properly
                return false;
            }
          
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "AirthmeticOperation.GetDifferenceBtwTwoDateTime", Excep);
        }
    }


    var GetControlValue = function (TemplateNodes, AttributeId, ControlId) {
        try {
            var Value = null;
            for (var itrAttrId in TemplateNodes) {
                if (itrAttrId == AttributeId) {
                    var _oAttributeInfo = TemplateNodes[itrAttrId];
                    for (var _oPrimarayAnswerModeInfo in _oAttributeInfo.AnswerMode) {
                        if (typeof (_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo]) != 'function') {
                            if (_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].ControlId == ControlId) {

                                //Check for Time
                                if (_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].Type == 'TIME') {
                                    Value = MyInstance.GetFormattedDateTime(ControlId);
                                    break;
                                }
                            }
                        }
                    }
                }

                if (Value != null) {
                    break;
                }

            }

            return Value;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "AirthmeticOperation.GetDifferenceBtwTwoDateTime", Excep);
        }
    }
}