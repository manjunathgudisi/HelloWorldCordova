
function GridControl() {

    var _DateTime = new DateTime();
    
      
        var ClassName = "";
        var MethodName = "";

        var MyInstance = this;

        this.ResponsiveFieldChanged = function ($scope, ResponsiveColumn) {

            try {
                OneViewConsole.Debug("ResponsiveFieldChanged Start", "GridControl.ResponsiveFieldChanged");

                var ResponsiveField = document.getElementsByName(ResponsiveColumn.FieldName);

                if (ResponsiveColumn.GroupName != undefined) {

                    var IsSelectedGroupLength = 0;
                    var IsUnSelectedGroupLength = 0;

                    for (var i = 0; i < $scope.ResponsiveData.length; i++) {

                        if (ResponsiveColumn.GroupName == $scope.ResponsiveData[i].GroupName) {

                            if ($scope.ResponsiveData[i].selected == "selected" || $scope.ResponsiveData[i].selected == true) {
                                IsSelectedGroupLength += 1;
                            }
                            else {
                                IsUnSelectedGroupLength += 1;
                            }
                        }
                    }

                    if (ResponsiveColumn.selected == false) {
                        if (IsSelectedGroupLength == 0) {
                            var ResponsiveGroup = document.getElementsByName(ResponsiveColumn.GroupName);
                            ShowColumn(ResponsiveGroup);
                        }
                        ShowColumn(ResponsiveField);
                    }
                    else {
                        if (IsSelectedGroupLength > 0) {
                            var ResponsiveGroup = document.getElementsByName(ResponsiveColumn.GroupName);
                            HideColumn(ResponsiveGroup);
                        }
                        HideColumn(ResponsiveField);
                    }
                }
                else {
                    if (ResponsiveColumn.selected == false) {

                        ShowColumn(ResponsiveField);
                    }
                    else {
                        HideColumn(ResponsiveField);
                    }
                }

                OneViewConsole.Debug("ResponsiveFieldChanged End", "GridControl.ResponsiveFieldChanged");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "GridControl.ResponsiveFieldChanged", Excep);
            }

            finally {
                ResponsiveField = null;
                IsSelectedGroupLength = null;
                IsUnSelectedGroupLength = null;
                ResponsiveGroup = null;
            }
        }

        var ShowColumn = function (ResponsiveField) {

            try {
                OneViewConsole.Debug("ShowColumn Start", "GridControl.ShowColumn");

                for (var i = 0; i < ResponsiveField.length; i++) {
                    ResponsiveField[i].className = ResponsiveField[i].className + " hide";
                }

                OneViewConsole.Debug("ShowColumn End", "GridControl.ShowColumn");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "GridControl.ShowColumn", Excep);
            }
        }

        var HideColumn = function (ResponsiveField) {

            try {
                OneViewConsole.Debug("HideColumn Start", "GridControl.HideColumn");

                    for (var i = 0; i < ResponsiveField.length; i++) {
                        var reg = new RegExp('(\\s|^)hide(\\s|$)');
                        ResponsiveField[i].className = ResponsiveField[i].className.replace(reg, ' ');
                    }

                OneViewConsole.Debug("HideColumn End", "GridControl.HideColumn");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "GridControl.HideColumn", Excep);
            }
            finally {
                reg = null;
            }
        }

        this.RegisterRowClickEvent = function (RegisteredClassName, RegisteredMethodName) {

            try {
                OneViewConsole.Debug("RegisterRowClickEvent Start", "GridControl.RegisterRowClickEvent");

                    ClassName = RegisteredClassName;
                    MethodName = RegisteredMethodName;

                OneViewConsole.Debug("RegisterRowClickEvent End", "GridControl.RegisterRowClickEvent");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "GridControl.RegisterRowClickEvent", Excep);
            }
        }

        this.LoadHeaderRow = function (GridMetaData) {

            try {
                OneViewConsole.Debug("LoadHeaderRow Start", "GridControl.LoadHeaderRow");

                var Row = "";

                var Row_Start = '<div class="row header">';
                var RowContent = '';

                for (var Column in GridMetaData) {

                    if (GridMetaData[Column].Visible == true) {

                        if (GridMetaData[Column].SubColumns == undefined) {
                            var Column = GetColumn(GridMetaData[Column]);
                            RowContent += Column;
                        }
                        else {
                            var ColumnGroup = GetColumnGroup(GridMetaData[Column]);
                            RowContent += ColumnGroup;
                        }
                    }
                }

                var Row_End = '</div>';
                Row = Row_Start + RowContent + Row_End;

                document.getElementById('gridHeader').innerHTML = Row;

                OneViewConsole.Debug("LoadHeaderRow End", "GridControl.LoadHeaderRow");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "GridControl.LoadHeaderRow", Excep);
            }
            finally {
                Row = null;
                Row_Start = null;
                RowContent = null;
                Column = null;
                ColumnGroup = null;
                Row_End = null;
            }
        }

        // <div class="col"><span>Temp</span></div>
        var GetColumn = function (ColumnObj) {

            try {
                OneViewConsole.Debug("GetColumn Start", "GridControl.GetColumn");

                    var Columnstart = '<div class="' + GetStyle(ColumnObj) + '" name="' + ColumnObj.FieldName + '">';
                    var ColumnContent = '<span>' + ColumnObj.DisplayName + '</span>';
                    var ColumnEnd = '</div>';
                    var Column = Columnstart + ColumnContent + ColumnEnd;

                OneViewConsole.Debug("GetColumn End", "GridControl.GetColumn");

                return Column;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "GridControl.GetColumn", Excep);
            }
            finally {
                Columnstart = null;
                ColumnContent = null;
                ColumnEnd = null;
                Column = null;
            }
        }

        //<div class="col col-20 text-center" ></div>
        var GetStyle = function (ColumnObj) {
            try {
                OneViewConsole.Debug("GetStyle Start", "GridControl.GetStyle");

                    var StyleHtml = 'col';
                    if (ColumnObj.Width != "Auto")
                        StyleHtml = StyleHtml + " col-" + ColumnObj.Width; //class="col"
                    if (ColumnObj.TextAlign != undefined)
                        StyleHtml = StyleHtml + " text-" + ColumnObj.TextAlign;

                OneViewConsole.Debug("GetStyle End", "GridControl.GetStyle");

                return StyleHtml;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "GridControl.GetStyle", Excep);
            }
            finally {
                StyleHtml = null;
            }
        }

        var GetColumnGroup = function (ColumnObj) {
            try {
                OneViewConsole.Debug("GetColumnGroup Start", "GridControl.GetColumnGroup");

                //<div class="col col-20">
                var Column_start = '<div class="' + GetStyle(ColumnObj) + '" name="' + ColumnObj.FieldName + '">';

                //<div class="row"> 
                //   <div class="col"><span>Cooking</span></div>
                //</div>
                var ColumnGroupHeader = '<div class="row"><div class="col"><span>' + ColumnObj.DisplayName + '</span></div></div>';

                // <div class="row grouped">
                var ColumnSubGroup_Start = '<div class="row grouped">';

                //<div class="col"><span>Temp</span></div>
                //<div class="col"><span>Time</span></div>
                //<div class="col"><span>By(#ERP)</span></div>
                var ColumnGroupContent = "";
                for (var i = 0; i < ColumnObj.SubColumns.length; i++) {
                    ColumnGroupContent += GetColumn(ColumnObj.SubColumns[i]);
                }

                var ColumnSubGroup_End = '</div>';
                var Column_End = '</div>';

                var CompleteGroupColumn = Column_start + ColumnGroupHeader + ColumnSubGroup_Start + ColumnGroupContent + ColumnSubGroup_End + Column_End;

                OneViewConsole.Debug("GetColumnGroup End", "GridControl.GetColumnGroup");

                return CompleteGroupColumn;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "GridControl.GetColumnGroup", Excep);
            }
            finally {
                Column_start = null;
                ColumnGroupHeader = null;
                ColumnSubGroup_Start = null;
                ColumnGroupContent = null;
                ColumnSubGroup_End = null;
                Column_End = null;
                CompleteGroupColumn = null;
            }
        }

        this.LoadGridOrg = function ($scope, DataSource, GraphSearchElement, HeaderMetaData, FilterRule, IsApplyFilter, DefaultExp) {
            try {
                OneViewConsole.Debug("LoadGridOrg Start", "GridControl.LoadGridOrg");

                if (DataSource.length != 0) {

                    var NormalizedData;

                    if (IsApplyFilter == true && FilterRule != null) {
                        NormalizedData = FilterDC($scope, Normalize(DataSource), FilterRule);
                        //alert(JSON.stringify(NormalizedData));
                    }
                    else {
                        NormalizedData = Normalize(DataSource);
                    }

                    if (NormalizedData.length != 0) {

                        if (GraphSearchElement.length != 0) {
                            NormalizedData = Filter(GraphSearchElement, NormalizedData, DefaultExp);
                        }

                        var RowLst = "";
                        var RowCss = "row odd";

                        for (var i = 0; i < NormalizedData.length; i++) {

                            var Row_Start = '<div id="' + i + '" DataCaptureId="' + NormalizedData[i].DataCaptureId + '" class="' + RowCss + '" onclick="new ' + ClassName + '().' + MethodName + '(' + NormalizedData[i].DataCaptureId + ',' + i + ');">';
                            var Row_Content = GetDataRow(NormalizedData[i], HeaderMetaData);
                            var Row_End = "</div>";

                            var Row = Row_Start + Row_Content + Row_End;

                            RowLst = RowLst + Row;

                            RowCss = (RowCss == "row") ? "row odd" : "row";
                        }

                        document.getElementById('gridData').innerHTML = RowLst;
                    }
                    else {
                        document.getElementById('gridData').innerHTML = "";
                    }
                }
                else {
                    document.getElementById('gridData').innerHTML = "";
                }

                OneViewConsole.Debug("LoadGridOrg End", "GridControl.LoadGridOrg");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "GridControl.LoadGridOrg", Excep);
            }
        }

        this.LoadGridOld = function ($scope, DataSource, GraphSearchElement, HeaderMetaData, FilterRule, IsApplyFilter, DefaultExp) {
            try {
                OneViewConsole.Debug("LoadGridOld Start", "GridControl.LoadGridOld");

                if (DataSource.length != 0) {

                    var NormalizedData;

                    if (IsApplyFilter == true && FilterRule != null) {                        
                        NormalizedData = FilterDC($scope, Normalize(DataSource), FilterRule);
                        //alert(JSON.stringify(NormalizedData));
                    }
                    else {
                        NormalizedData = Normalize(DataSource);
                    }

                    if (NormalizedData.length != 0) {

                        if (GraphSearchElement.length != 0) {
                            NormalizedData = Filter(GraphSearchElement, NormalizedData, DefaultExp);
                        }

                        if (NormalizedData.length != 0) {

                            var RowLst = "";
                            var RowCss = "row odd";

                            var StartRow = 0;
                            StartRow = (PageNumber == 1) ? StartRow : (PageNumber * MaxRowCount) - MaxRowCount;

                            var MaxLength = StartRow + MaxRowCount;

                            NormalizedDataCount = NormalizedData.length;
                            $scope.TotalRecordsCount = NormalizedDataCount;

                            PageCount = "" + NormalizedDataCount / MaxRowCount;
                            PageCount = PageCount.split(".");
                            PageCount = (PageCount.length > 1) ? parseInt(PageCount[0]) + 1 : PageCount;

                            $scope.TotalPageCount = PageCount;


                            if (NormalizedData.length < MaxLength) {
                                MaxLength = NormalizedData.length
                            }

                            if (NormalizedData.length >= MaxLength) {

                                for (var i = StartRow; i < MaxLength ; i++) {

                                    RowCss = (NormalizedData[i].IsAnyNC == 'true') ? RowCss + " nc" : RowCss;

                                    var Row_Start = '<div id="' + i + '" DataCaptureId="' + NormalizedData[i].DataCaptureId + '" class="' + RowCss + '" onclick="new ' + ClassName + '().' + MethodName + '(' + NormalizedData[i].DataCaptureId + ',' + i + ');">';
                                    var Row_Content = GetDataRow(NormalizedData[i], HeaderMetaData);
                                    var Row_End = "</div>";

                                    var Row = Row_Start + Row_Content + Row_End;
                                    RowLst = RowLst + Row;

                                    RowCss = (RowCss == "row odd" || RowCss == "row odd nc") ? "row" : "row odd";
                                }

                                document.getElementById('gridData').innerHTML = RowLst;
                            }

                            if (PageCount > 1) {
                                //document.getElementById('Next').disabled = "";
                                MyInstance.Show(document.getElementById('Next'));
                                
                            }
                            else {
                                //document.getElementById('Next').disabled = "disabled";
                                MyInstance.Hide(document.getElementById('Next'));
                            }
                        }
                        else {
                            MyInstance.ResetGrid($scope);
                        }
                    }
                    else {
                        MyInstance.ResetGrid($scope);
                    }
                }
                else {
                    MyInstance.ResetGrid($scope);
                }

                $scope.$apply();

                OneViewConsole.Debug("LoadGridOld End", "GridControl.LoadGridOld");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "GridControl.LoadGridOld", Excep);
            }
            finally {
                NormalizedData = null;
                RowLst = null;
                RowCss = null;
                StartRow = null;
                MaxLength = null;
                Row_Start = null;
                Row_Content = null;
                Row_End = null;
                Row = null;
            }
        }

        this.LoadGrid = function ($scope, DataSource, HeaderMetaData) {
            try {
                OneViewConsole.Debug("LoadGrid Start", "GridControl.LoadGrid");

                var IsResetGrid = false;

                if (DataSource.length != 0) {

                    var NormalizedData = Normalize(DataSource);
                    var RowLst = "";
                    var RowCss = "row odd";

                    for (var i = 0; i < NormalizedData.length ; i++) {

                        //RowCss = (NormalizedData[i].IsAnyNC == 'true') ? RowCss + " nc" : RowCss;
                        //RowCss = (NormalizedData[i].IsCompleted == 'true') ? RowCss + " completed" : RowCss;
                        //RowCss = (NormalizedData[i].IsCompleted == 'false') ? RowCss + " pending" : RowCss;

                        if (NormalizedData[i].ApprovalStatus == '2') {
                            RowCss = RowCss + " rejected";
                        }
                        else if (NormalizedData[i].IsAnyNC == 'true') {
                            RowCss = RowCss + " nc";                         
                        }                       
                        else if (NormalizedData[i].IsCompleted == 'true') {
                            RowCss = RowCss + " completed";
                        }
                        else {
                            RowCss = RowCss + " pending";
                        }

                        var IsCompleted = "'" + NormalizedData[i].IsCompleted + "'";
                        var IsSynchronized = "'" + NormalizedData[i].IsSynchronized + "'";

                        var Row_Start = '<div id="' + i + '" DataCaptureId="' + NormalizedData[i].DataCaptureId + '" class="' + RowCss + '" onclick="new ' + ClassName + '().' + MethodName + '(' + NormalizedData[i].DataCaptureId + ',' + i + ',' + IsCompleted + ',' + IsSynchronized + ');">';
                        var Row_Content = GetDataRow(NormalizedData[i], HeaderMetaData);
                        var Row_End = "</div>";

                        var Row = Row_Start + Row_Content + Row_End;
                        RowLst = RowLst + Row;

                        RowCss = (RowCss == "row odd" || RowCss == "row odd rejected" || RowCss == "row odd nc" || RowCss == "row odd completed" || RowCss == "row odd pending") ? "row" : "row odd";
                    }

                    document.getElementById('gridData').innerHTML = RowLst;
                }
                else {
                    MyInstance.ResetGrid($scope);
                    IsResetGrid = true;
                }

                $scope.$apply();

                OneViewConsole.Debug("LoadGrid End", "GridControl.LoadGrid");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "GridControl.LoadGrid", Excep);
            }
            finally {
                NormalizedData = null;
                RowLst = null;
                RowCss = null;              
                Row_Start = null;
                Row_Content = null;
                Row_End = null;
                Row = null;
            }
        }

        this.ResetGrid = function ($scope) {
            try {
                OneViewConsole.Debug("ResetGrid Start", "GridControl.ResetGrid");

                    document.getElementById('gridData').innerHTML = "";                    
                    //MyInstance.Hide(document.getElementById('Next'));
                //MyInstance.Hide(document.getElementById('Previous'));
                    MyInstance.Hide('Next');
                    MyInstance.Hide('Previous');
                    $scope.TotalPageCount = 1;
                    $scope.TotalRecordsCount = 0;

                    $scope.$apply();

                OneViewConsole.Debug("ResetGrid End", "GridControl.ResetGrid");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "GridControl.ResetGrid", Excep);
            }
        }

        this.Show = function (obj) {

            try{
                //var reg = new RegExp('(\\s|^)disabled(\\s|$)');
                //obj.className = obj.className.replace(reg, ' ');
                
                var myEl = angular.element(document.querySelector('#' + obj));
                myEl.removeClass('disabled');
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "GridControl.Show", Excep);
            }
        }

        this.Hide = function (obj) {

            try {
                //obj.className = obj.className + " disabled";

                var myEl = angular.element(document.querySelector('#' + obj));
                myEl.addClass('disabled');

            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "GridControl.Hide", Excep);
            }
        }

        //DCList :Normilized List
        //FilterRule : all rules
        var FilterDC = function ($scope, DCList, FilterRule) {
            try {
                OneViewConsole.Debug("FilterDC Start", "GridControl.FilterDC");
              
                var dcIndex = 0;
                while (true) {
                    var dc = DCList[dcIndex];                   
                    var RulesSuccessCount = 0;
                    var IsFilterRuleAccepted = true;

                    for (var j = 0; j < FilterRule.Rules.length; j++) {

                        var FilterDataObj = $scope.FilterData[FilterRule.Rules[j].ExpressionId];

                        if (FilterDataObj.selected == true || FilterDataObj.selected == "selected") {
                            var Equation = FilterRule.Rules[j].FinalEquation;
                            if (Equation != "") {                                
                                IsFilterRuleAccepted = eval(Equation);
                                if (IsFilterRuleAccepted == false) {
                                    break;
                                }
                            }
                        }
                    }
                   
                    if (IsFilterRuleAccepted == false) {
                        DCList.remove(dcIndex);
                    }
                    else {
                        dcIndex = dcIndex + 1;
                    }
                
                    if (dcIndex >= DCList.length) {
                        break;
                    }
                }

                OneViewConsole.Debug("FilterDC End", "GridControl.FilterDC");
               
                return DCList;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "GridControl.FilterDC", Excep);
            }
            finally {
                dcIndex = null;
                dc = null;
                RulesSuccessCount = null;
                IsFilterRuleAccepted = null;
                FilterDataObj = null;
                Equation = null;
            }
        }

        //filter dC wrt handover user,
        //filter dcs,which and all login user not envolved
        this.FilterDCWithHandOverUser = function (DCList, LoginUserId) {
            try {
                OneViewConsole.Debug("FilterDCWithHandOverUser Start", "GridControl.FilterDCWithHandOverUser");

                    for (var i = 0; i < DCList.length; i++) {
                        var DCObj = DCList[i];
                        for (var j = 0; j < DCObj.AnwerDetails; j++) {
                            var AnwerDetailsObj = DCObj.AnwerDetails[j];
                            if (AnwerDetailsObj.SystemUserId == LoginUserId) {

                            }
                        }
                    }

                OneViewConsole.Debug("FilterDCWithHandOverUser End", "GridControl.FilterDCWithHandOverUser");
                return DCList;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "GridControl.FilterDCWithHandOverUser", Excep);
            }
            finally {
                DCObj = null;
                AnwerDetailsObj = null;
            }
        }

        var Normalize = function (result) {

            try {
                OneViewConsole.Debug("Normalize Start", "GridControl.Normalize");

                var Finaloutput = [];

                //initail variable
                var i = 0;
                var DataCaptureId = result[0].DataCaptureId;
                var IsCompleted = result[0].IsCompleted;
                var ApprovalStatus = result[0].ApprovalStatus;
                var IsSynchronized = result[0].IsSynchronized;
                var IsAnyNC = result[0].IsAnyNC;
                var ClientDocId = result[0].ClientDocId;
                var ServiceName = result[0].ServiceName;
                var TemplateNodeName = result[0].TemplateNodeName;
                var DcPlaceName = result[0].DcPlaceName;
                var ShiftName = result[0].ShiftName;
                var DCLastUpdatedDate = result[i].DCLastUpdatedDate;
                var AttributeNodeId = result[i].AttributeNodeId;
                var DcStartDate = result[i].DcStartDate;

                var DCAnswerInfo = {
                    'DataCaptureId': DataCaptureId,
                    'IsCompleted': IsCompleted,
                    'ApprovalStatus': ApprovalStatus,
                    'IsSynchronized': IsSynchronized,
                    'IsAnyNC': IsAnyNC,
                    'ClientDocId': ClientDocId,
                    'ServiceName': ServiceName,
                    'TemplateNodeName': TemplateNodeName,
                    'DcPlaceName': DcPlaceName,
                    'ShiftName': ShiftName,
                    'DCLastUpdatedDate': DCLastUpdatedDate,
                    'AttributeAnswers': {},
                    'DcStartDate': DcStartDate
                };

                var FormatedAttributeControlAnswerDetailsDict = {};

                //Iterate the wrt Node
                while (i < result.length) {
                    if (AttributeNodeId == result[i].AttributeNodeId) {

                        var FormatedControlAnswerDetailsArray = [];
                        //{2(ControlId): [ { 'SystemUserId': 1, 'Answer': '1', 'AnswerValue': 'Chicken', 'LastUpdatedDate': '10/5/2012' },{ 'SystemUserId': 2, 'Answer': '2', 'AnswerValue': 'Chicken65', 'LastUpdatedDate': '11/5/2012' } ] }
                        var ControlId = result[i].ControlId;
                        var oLastUpdatedResult = null;
                        while (i < result.length) {
                            if (AttributeNodeId == result[i].AttributeNodeId && ControlId == result[i].ControlId) {


                                var anwerArray = result[i];

                                var AnwerDetails = { 'SystemUserId': anwerArray.SystemUserId, 'Answer': anwerArray.Answer, 'AnswerValue': anwerArray.AnswerValue, 'LastUpdatedDate': anwerArray.LastUpdatedDate, 'AnswerDataType': anwerArray.AnswerDataType }

                                if (oLastUpdatedResult == null)
                                    oLastUpdatedResult = AnwerDetails;
                                else {
                                    if (_DateTime.GetDateByString(oLastUpdatedResult.LastUpdatedDate) < _DateTime.GetDateByString(AnwerDetails.LastUpdatedDate))
                                        oLastUpdatedResult = AnwerDetails;
                                }
                                FormatedControlAnswerDetailsArray.push(AnwerDetails);

                                i = i + 1;

                                if (i == result.length) {
                                    FormatedAttributeControlAnswerDetailsDict[ControlId] = { ResultArray: FormatedControlAnswerDetailsArray, LastUpdatedResult: oLastUpdatedResult };
                                    DCAnswerInfo.AttributeAnswers[AttributeNodeId] = FormatedAttributeControlAnswerDetailsDict;
                                }
                            }
                            else {
                                // [ {2(ControlId): [ { 'SystemUserId': 1, 'Answer': '1', 'AnswerValue': 'Chicken', 'LastUpdatedDate': '10/5/2012' },{ 'SystemUserId': 2, 'Answer': '2', 'AnswerValue': 'Chicken65', 'LastUpdatedDate': '11/5/2012' } ] }]
                                FormatedAttributeControlAnswerDetailsDict[ControlId] = { ResultArray: FormatedControlAnswerDetailsArray, LastUpdatedResult: oLastUpdatedResult };
                                break;
                            }
                        }
                    }
                    else {
                        DCAnswerInfo.AttributeAnswers[AttributeNodeId] = FormatedAttributeControlAnswerDetailsDict;
                        //reset
                        FormatedAttributeControlAnswerDetailsDict = {};
                        AttributeNodeId = result[i].AttributeNodeId;
                        if (DataCaptureId != result[i].DataCaptureId) {
                            Finaloutput.push(DCAnswerInfo);
                            DataCaptureId = result[i].DataCaptureId;
                            IsCompleted = result[i].IsCompleted;
                            ApprovalStatus = result[i].ApprovalStatus;
                            IsSynchronized = result[i].IsSynchronized;
                            IsAnyNC = result[i].IsAnyNC;
                            ClientDocId = result[i].ClientDocId;
                            ServiceName = result[i].ServiceName;
                            TemplateNodeName = result[i].TemplateNodeName;
                            DcPlaceName = result[i].DcPlaceName;
                            ShiftName = result[i].ShiftName;
                            DCLastUpdatedDate = result[i].DCLastUpdatedDate;
                            DcStartDate = result[i].DcStartDate;
                            DCAnswerInfo = {
                                'DataCaptureId': DataCaptureId,
                                'IsCompleted': IsCompleted,
                                'ApprovalStatus': ApprovalStatus,
                                'IsSynchronized': IsSynchronized,
                                'IsAnyNC': IsAnyNC,
                                'ClientDocId': ClientDocId,
                                'ServiceName': ServiceName,
                                'TemplateNodeName': TemplateNodeName,
                                'DcPlaceName': DcPlaceName,
                                'ShiftName': ShiftName,
                                'DCLastUpdatedDate': DCLastUpdatedDate,
                                'AttributeAnswers': {},
                                'DcStartDate': DcStartDate
                            };
                        }
                    }
                }
                Finaloutput.push(DCAnswerInfo);

                OneViewConsole.Debug("Normalize End", "GridControl.Normalize");

                return Finaloutput;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "GridControl.Normalize", Excep);
            }
            finally {
                Finaloutput = null;
                i = null;
                DataCaptureId = null;
                IsCompleted = null;
                IsSynchronized = null;
                IsAnyNC = null;
                AttributeNodeId = null;
                DCAnswerInfo = null;
                FormatedAttributeControlAnswerDetailsDict = null;
                FormatedControlAnswerDetailsArray = null;
                ControlId = null;
                oLastUpdatedResult = null;
                anwerArray = null;
                AnwerDetails = null;
            }
        }

        var GetDataRow = function (RowDataObject, HeaderMetaData) {
            try {
                OneViewConsole.Debug("GetDataRow Start", "GridControl.GetDataRow");

                var RowContent = '';

                for (var i = 0; i < HeaderMetaData.length; i++) {
                    RowContent = GetDataColumn(RowContent, HeaderMetaData[i], RowDataObject);
                }

                OneViewConsole.Debug("GetDataRow End", "GridControl.GetDataRow");

                return RowContent;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "GridControl.GetDataRow", Excep);
            }
            finally {
                RowContent = null;
            }
        }

        //<div class="col col-20"><span>Chick BR 120 GM Iranian Roast</span></div>
        var GetDataColumn = function (html, HeaderMetaData, RowData) {
            try {
                OneViewConsole.Debug("GetDataColumn Start", "GridControl.GetDataColumn");


                //<div class="col text-center prebc">
                //   					<div>11:00</div>
                //   					<div>12:00</div>
                //   				</div>
                if (HeaderMetaData.SubDataFields != undefined) {

                    //var IsSubfieldAdded = false;
                    html = html + '<div class="col text-center prebc" name="' + HeaderMetaData.FieldName + '">';

                    for (var i = 0; i < HeaderMetaData.SubDataFields.length; i++) {

                        var ColumnValue = GetColumnValue(HeaderMetaData.SubDataFields[i], RowData);
                        //ColumnValue = (ColumnValue == "") ? "-" : ColumnValue;
                        ColumnValue = (ColumnValue == null) ? "" : ColumnValue;

                        var DisplayName = HeaderMetaData.SubDataFields[i].DisplayName;

                        if (DisplayName != "") {
                            html = html + '<div id="' + HeaderMetaData.SubDataFields[i].FieldName + RowData.DataCaptureId + '" style="color:blue">' + ColumnValue + '</div>';
                            //IsSubfieldAdded = true;
                        }
                        else {//if (IsSubfieldAdded == true) {                    
                            html = html + '<div id="' + HeaderMetaData.SubDataFields[i].FieldName + RowData.DataCaptureId + '">' + ColumnValue + '</div>';
                        }
                        //else {
                        //    html = html + '<span id="' + HeaderMetaData.FieldName + RowData.DataCaptureId + '">' + ColumnValue + '</span>';
                        //}

                    }
                    html = html + '</div>';
                }
                else if (HeaderMetaData.SubColumns != undefined) {
                    html = html + '<div class="' + GetStyle(HeaderMetaData) + '" name="' + HeaderMetaData.FieldName + '"><div class="row grouped">';
                    for (var i = 0; i < HeaderMetaData.SubColumns.length; i++) {
                        html = GetDataColumn(html, HeaderMetaData.SubColumns[i], RowData);
                    }
                    html = html + '</div></div>';
                }
                else {
                    //<div class="col text-center"><span>05</span></div>
                    var ColumnValue = GetColumnValue(HeaderMetaData, RowData);

                    if (HeaderMetaData.OneViewStyle == 'checkmark') {

                        if (ColumnValue == '1')
                            html = html + '<div id="' + HeaderMetaData.FieldName + RowData.DataCaptureId + '" class="' + GetStyle(HeaderMetaData) + '" name="' + HeaderMetaData.FieldName + '"><span>Y</span></div>';
                        else
                            html = html + '<div id="' + HeaderMetaData.FieldName + RowData.DataCaptureId + '" class="' + GetStyle(HeaderMetaData) + '" name="' + HeaderMetaData.FieldName + '"></div>';

                        //while enable icon,500 row near 700KB diffrent we notice and icon loading took  time
                        //
                        //if (ColumnValue == 'true')
                        //     html = html + '<div class="' + GetStyle(HeaderMetaData) + '"><span><i class="icon ion-checkmark"></i></span></div>';
                        //else
                        //    html = html + '<div class="' + GetStyle(HeaderMetaData) + '"></div>';

                    }
                    else
                        html = html + '<div id="' + HeaderMetaData.FieldName + RowData.DataCaptureId + '" class="' + GetStyle(HeaderMetaData) + '" name="' + HeaderMetaData.FieldName + '"><span>' + ColumnValue + '</span></div>';
                }

                OneViewConsole.Debug("GetDataColumn End", "GridControl.GetDataColumn");

                return html;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "GridControl.GetDataColumn", Excep);
            }
            finally {
                ColumnValue = null;
                DisplayName = null;
            }
        }

        var GetColumnValue = function (HeaderMetaData, RowData) {
            try {
                OneViewConsole.Debug("GetColumnValue Start", "GridControl.GetColumnValue");

                var Answer = "";

                if (HeaderMetaData.AttributeNodeId == undefined) {
                    Answer = RowData[HeaderMetaData.FieldName];
                }

                else if (RowData.AttributeAnswers[HeaderMetaData.AttributeNodeId] != undefined && RowData.AttributeAnswers[HeaderMetaData.AttributeNodeId][HeaderMetaData.ControlId] != undefined) {
                    if (RowData.AttributeAnswers[HeaderMetaData.AttributeNodeId][HeaderMetaData.ControlId].LastUpdatedResult.AnswerValue == '')
                        Answer = RowData.AttributeAnswers[HeaderMetaData.AttributeNodeId][HeaderMetaData.ControlId].LastUpdatedResult.Answer;
                    else {
                        Answer = RowData.AttributeAnswers[HeaderMetaData.AttributeNodeId][HeaderMetaData.ControlId].LastUpdatedResult.AnswerValue;
                    }
                }

                if (Answer != "" && HeaderMetaData.DisplayFormat != undefined && HeaderMetaData.DisplayFormat != "") {
                    Answer = oOneViewDateTimeFormater.Format(Answer, HeaderMetaData.DisplayFormat);
                }                

                OneViewConsole.Debug("GetColumnValue End", "GridControl.GetColumnValue");

                return Answer;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "GridControl.GetColumnValue", Excep);
            }
            finally {
                Answer = null;
            }
        }

        var Filter = function (GraphElements, DataSource, DefaultExp) {
            try {
                OneViewConsole.Debug("Filter Start", "GridControl.Filter");

                //   var oGraphElements = GraphElements;
                //for (var dcIndex = 0; dcIndex < DataSource.length; dcIndex++) {
                var dcIndex = 0;
                while (true) {
                    var _GraphElements = clone(GraphElements);

                    var SearchItem = GetValue(DataSource[dcIndex]);
                    var Isthere = IsValueThere_advance(DataSource[dcIndex], _GraphElements, DefaultExp);

                    if (Isthere != true) {
                        DataSource.remove(dcIndex);
                    }
                    else {
                        dcIndex = dcIndex + 1;
                    }

                    if (dcIndex >= DataSource.length) {
                        break;
                    }

                    //var DefaultExp = [{ 'AttributeNodeId': 10, 'ControlId': 'AddlAirlineControlId', Value: 'Ek 506' }];
                    //var Isthere = IsValueThere_advance(DataSource[dcIndex], GraphElements, DefaultExp);                                    
                }

                OneViewConsole.Debug("Filter End", "GridControl.Filter");

                return DataSource;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "GridControl.Filter", Excep);
            }
            finally {
                dcIndex = null;
                _GraphElements = null;
                SearchItem = null;
                Isthere = null;
            }
        }

        var IsValueThere_advance = function (DataSourceItem, SearchKeyArray, DefaultExp) {
            try {
                OneViewConsole.Debug("IsValueThere_advance Start", "GridControl.IsValueThere_advance");

                var SearchItem = [];
                var IsExist = false;
                var TotalMatchedindex = 0;
                var totalKeyToSearch = SearchKeyArray.length;

                if (DefaultExp != undefined)
                    IsExist = IsDefaultExpMatched(DataSourceItem.AttributeAnswers, DefaultExp);

                if ((DefaultExp == undefined) || (DefaultExp != undefined && IsExist == true)) {
                    for (AttrNodeId in DataSourceItem.AttributeAnswers) {

                        var AttrAnswerObj = DataSourceItem.AttributeAnswers[AttrNodeId];
                        TotalMatchedindex = TotalMatchedindex + TotalGraphSearchMatchCount(AttrAnswerObj, SearchKeyArray);

                        if (TotalMatchedindex >= totalKeyToSearch) {
                            OneViewConsole.Debug("IsValueThere_advance End", "GridControl.IsValueThere_advance");
                            return true;
                        }
                    }
                    OneViewConsole.Debug("IsValueThere_advance End", "GridControl.IsValueThere_advance");
                    return IsExist;
                }
                else {
                    OneViewConsole.Debug("IsValueThere_advance End", "GridControl.IsValueThere_advance");
                    return IsExist;
                }
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "GridControl.IsValueThere_advance", Excep);
            }
            finally {
                SearchItem = null;
                IsExist = null;
                TotalMatchedindex = null;
                totalKeyToSearch = null;
                AttrAnswerObj = null;
            }
        }

        var IsDefaultExpMatched = function (DataSourceItem, DefaultExp) {
            try {
                OneViewConsole.Debug("IsDefaultExpMatched Start", "GridControl.IsDefaultExpMatched");

                    var IsExist = false;
                    for (expItr in DefaultExp) {

                        //TODO:KeyIterate making probs,need to find permant solution
                        if (typeof (DefaultExp[expItr]) == "function")
                            break;

                        var oDefaultExp = DefaultExp[expItr];
                        if (DataSourceItem[oDefaultExp.AttributeNodeId] != undefined && DataSourceItem[oDefaultExp.AttributeNodeId][oDefaultExp.ControlId] != undefined) {
                            var Answer = DataSourceItem[oDefaultExp.AttributeNodeId][oDefaultExp.ControlId].LastUpdatedResult.Answer;
                            if (Answer == oDefaultExp.Value)
                                IsExist = true;
                        }
                        else {
                            IsExist = false;
                            OneViewConsole.Debug("IsDefaultExpMatched End", "GridControl.IsDefaultExpMatched");
                            return IsExist;
                        }
                    }

                OneViewConsole.Debug("IsDefaultExpMatched End", "GridControl.IsDefaultExpMatched");

                return IsExist;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "GridControl.IsDefaultExpMatched", Excep);
            }
            finally {
                IsExist = null;
                oDefaultExp = null;
                Answer = null;
            }
        }

        var TotalGraphSearchMatchCount = function (AttrAnswerObj, SearchKeyArray) {
            try {
                OneViewConsole.Debug("TotalGraphSearchMatchCount Start", "GridControl.TotalGraphSearchMatchCount");

                var TotalMatchedindex = 0;
                var totalKeyToSearch = SearchKeyArray.length;

                for (ControlId in AttrAnswerObj) {

                    var Answer;
                    if (AttrAnswerObj[ControlId].LastUpdatedResult.AnswerValue == '') {
                        Answer = AttrAnswerObj[ControlId].LastUpdatedResult.Answer;
                    }
                    else {
                        Answer = AttrAnswerObj[ControlId].LastUpdatedResult.AnswerValue;
                    }

                    if (IsMathch(Answer, SearchKeyArray))
                        TotalMatchedindex = TotalMatchedindex + 1;

                    if (TotalMatchedindex == totalKeyToSearch)
                        return TotalMatchedindex;
                }

               OneViewConsole.Debug("TotalGraphSearchMatchCount End", "GridControl.TotalGraphSearchMatchCount");

                return TotalMatchedindex;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "GridControl.TotalGraphSearchMatchCount", Excep);
            }
            finally {
                TotalMatchedindex = null;
                totalKeyToSearch = null;
                Answer = null;
            }
        }

        var IsMathch = function (Answer, SearchKeyArray) {
            try {
                OneViewConsole.Debug("IsMathch Start", "GridControl.IsMathch");

                var IsMatched = false;
                for (var i = 0; i < SearchKeyArray.length; i++) {

                    var s1 = Answer.toLowerCase();
                    var s2 = SearchKeyArray[i].toLowerCase();
                    //alert("s1 : " + s1 + ", s2 : : " + s2);
                    if (s1.indexOf(s2) != -1) {
                        SearchKeyArray.remove(i);
                        IsMatched = true;
                        break;
                    }
                }
                //alert("IsMatched : " + IsMatched);
                OneViewConsole.Debug("IsMathch End", "GridControl.IsMathch");

                return IsMatched;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "GridControl.IsMathch", Excep);
            }
            finally {
                IsMatched = null;
                s1 = null;
                s2 = null;
            }
        }

        var GetValue = function (DataSourceItem) {
            try {
                OneViewConsole.Debug("GetValue Start", "GridControl.GetValue");

                var SearchItem = [];
                for (AttrNodeId in DataSourceItem.AttributeAnswers) {
                    var AttrAnswerObj = DataSourceItem.AttributeAnswers[AttrNodeId];
                    for (ControlId in AttrAnswerObj) {
                        var ControlAnswerObj = AttrAnswerObj[ControlId].LastUpdatedResult;
                        SearchItem.push(ControlAnswerObj.Answer);
                    }
                }

              OneViewConsole.Debug("GetValue End", "GridControl.GetValue");

                return SearchItem;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "GridControl.GetValue", Excep);
            }
            finally {
                SearchItem = null;
                AttrAnswerObj = null;
                ControlAnswerObj = null;
            }
        }
}

function DCFilterEquationBuilder() {
    
        var myInstance = this;

        var Main_predicateBody = null;
        var Main_Leftexp = null;
        var Main_Rightexp = null;

        this.GetExpression = function (criteriaObj) {
            try {
                OneViewConsole.Debug("GetExpression Start", "DCFilterEquationBuilder.GetExpression");

                if (criteriaObj.CriteriaType == 'OneViewDCAdvCriteria') {
                    var i = 0;
                    do {
                        var criteriaObjleft = criteriaObj.FilterParms[i];
                        if (Main_predicateBody == null) {
                            Main_Leftexp = myInstance.GetExpression(criteriaObjleft);
                            i = i + 1;
                        }
                        else {
                            Main_Leftexp = Main_predicateBody;
                        }

                        var criteriaObjRight = criteriaObj.FilterParms[i];
                        var Main_Rightexp = myInstance.GetExpression(criteriaObjRight); //Get Complex Query
                        i = i + 1;
                        Main_predicateBody = myInstance.CombineExpression(Main_Leftexp, Main_Rightexp, criteriaObj.Condition);//Method Combine
                    }
                    while (i < criteriaObj.FilterParms.length);
                }

                else if (criteriaObj.CriteriaType == 'OneViewDCResultDetailsPrimaryCriteria') {

                    Main_predicateBody = myInstance.GetDCResultDetailsPrimaryExpression(criteriaObj);
                }

                else if (criteriaObj.CriteriaType == 'OneViewDCPrimaryCriteria') {

                    Main_predicateBody = myInstance.GetDCPrimaryExpression(criteriaObj);
                }

                OneViewConsole.Debug("GetExpression End", "DCFilterEquationBuilder.GetExpression");

                return Main_predicateBody;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "DCFilterEquationBuilder.GetExpression", Excep);
            }
            finally {
                i = null;
                criteriaObjleft = null;
                criteriaObjRight = null;
                Main_Rightexp = null;
            }
        }

        this.CombineExpression = function (left, right, Condition) {
            try {
                OneViewConsole.Debug("CombineExpression Start", "DCFilterEquationBuilder.CombineExpression");

                    var Expression = "(" + left + " " + GetCriteria(Condition) + " " + right + ")";

                OneViewConsole.Debug("CombineExpression End", "DCFilterEquationBuilder.CombineExpression");

                return Expression;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "DCFilterEquationBuilder.CombineExpression", Excep);
            }
            finally {
                Expression = null;
            }
        }

        this.GetDCResultDetailsPrimaryExpression = function (filterparm) {
            try {
                OneViewConsole.Debug("GetDCResultDetailsPrimaryExpression Start", "DCFilterEquationBuilder.GetDCResultDetailsPrimaryExpression");

                    var Expression = "(dc.AttributeAnswers[" + filterparm.NodeId + "]['" + filterparm.ControlId + "'].LastUpdatedResult.Answer  " + GetCriteria(filterparm.Condition) + " '" + filterparm.value + "')";

                OneViewConsole.Debug("GetDCResultDetailsPrimaryExpression End", "DCFilterEquationBuilder.GetDCResultDetailsPrimaryExpression");

                return Expression;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "DCFilterEquationBuilder.GetDCResultDetailsPrimaryExpression", Excep);
            }
            finally {
                Expression = null;
            }
        }

        this.GetDCPrimaryExpression = function (filterparm) {
            try {
                OneViewConsole.Debug("GetDCPrimaryExpression Start", "DCFilterEquationBuilder.GetDCPrimaryExpression");

                    var Expression = "(dc['" + filterparm.ColumnName + "'] " + GetCriteria(filterparm.Condition) + " '" + filterparm.value + "')";

                OneViewConsole.Debug("GetDCPrimaryExpression End", "DCFilterEquationBuilder.GetDCPrimaryExpression");

                return Expression;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "DCFilterEquationBuilder.GetDCPrimaryExpression", Excep);
            }
            finally {
                Expression = null;
            }
        }       
}

function GetCriteria(Condition) {

    try {
        OneViewConsole.Debug("GetCriteria Start", "Framework.GetCriteria");

            switch (Condition) {

                case "AND": return "&&";
                case "OR": return "||";
                case "Equal": return "==";
                case "NotEqual": return "!=";
                case "GreaterThan": return ">";
                case "NotGreaterThan": return "!>";
                case "GreaterThanOrEqual": return ">=";
                case "LessThan": return "<";
                case "NotLessThan": return "!<";
                case "LessThanOrEqual": return "<=";
                default: return null;
            }

       OneViewConsole.Debug("GetCriteria End", "Framework.GetCriteria");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Framework", "GetCriteria", Excep);
    }
}

Array.prototype.remove = function (from, to) {

    try {
        OneViewConsole.Debug("Array.prototype.remove Start", "Framework.Array.prototype.remove");

            var rest = this.slice((to || from) + 1 || this.length);
            this.length = from < 0 ? this.length + from : from;

        OneViewConsole.Debug("Array.prototype.remove End", "Framework.Array.prototype.remove");

        return this.push.apply(this, rest);

    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Framework", "Array.prototype.remove", Excep);
    }
};

function clone(obj) {

    try {
        OneViewConsole.Debug("clone Start", "Framework.clone");

        if (obj == null || typeof (obj) != 'object') {
            OneViewConsole.Debug("clone End", "Framework.clone");
            return obj;
        }

        var temp = obj.constructor(); // changed

        for (var key in obj)
            temp[key] = clone(obj[key]);

        OneViewConsole.Debug("clone End", "Framework.clone");

        return temp;

    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Framework", "clone", Excep);
    }
}