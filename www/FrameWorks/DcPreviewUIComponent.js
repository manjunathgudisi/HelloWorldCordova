
var DcResultDetailsDict = {};
var HtmlForTesco = '<div class="margin-left">';

function DcPreviewUIComponent(param) {

    var MyInstance = this;
    var scope = param.scope;
    var xlatService = param.xlatService;
    var location = param.location;
    var compile = param.compile;
    var oActionDAO = new ActionDAO();
    var DcClientGuid = "";
    this.AnswerModeLoadType = 1;
    var DCNCMappingList = [];

    this.LoadHtml = function (Req) {
        try {
            OneViewConsole.Debug("LoadHtml Start", "DcPreviewUIComponent.LoadHtml");

            var response = MyInstance.GetHtml(Req);
            if (response.IsSuccess == true) {
                // alert('response.PageHeader' + response.PageHeader);
                MyInstance.AppendHtml('PageHeaderDivId', response.PageHeader);
                // alert('response.Html' + response.Html);
                MyInstance.AppendHtml('ContentDivId', response.Html);
            }

            OneViewConsole.Debug("LoadHtml End", "DcPreviewUIComponent.LoadHtml");
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DcPreviewUIComponent.LoadHtml", Excep);
        }
    }

    this.GetHtml = function (Req) {
        try {
            OneViewConsole.Debug("LoadHtml Start", "DcPreviewUIComponent.LoadHtml");
            var response = { IsSuccess: true, Html: "", PageHeader: "" };
            var Result = "";
            var ServiceId = OneViewSessionStorage.Get("ServiceId");

           
            var TemplateNodes = "";
            //alert(DcApprovalUIInfo.IsIndividualDcSummary);
            if (DcApprovalUIInfo.IsIndividualDcSummary == false) {

                Result = Req.Result; 
                TemplateNodes = new TemplateConfigDAO().GetMetaData(ServiceId, Req.TemplateId);
                
            }
            else {                
                var _oTemplateConfigDAO = new TemplateConfigDAO();
                TemplateNodes = _oTemplateConfigDAO.GetMetaData(ServiceId, Req.TemplateId);

                var _oDcDAO = new DcDAO();
                var Param = { 'DcId': Req.DcId, 'IsDisable': 'true' };
                Result = _oDcDAO.GetDCResultDetails(Param);
              
            }
            //var DcResultDetails = GetDCByDCId(result);

            //Get lastupdated DcResultDetails

            var DcResultDetailsDict = MyInstance.GetLastUpdatedDcResultDetails(Result);

            //DcClientGuid will be filled
            if (DcApprovalUIInfo.IsIndividualDcSummary == false) {
                DcClientGuid = Req.DcClientGuid;
            }
            else {
                var Dc = new DefaultMasterDAO('DataCaptureEntity').GetById(Req.DcId);
                DcClientGuid = Dc[0].ClientGuid;
                response.PageHeader = MyInstance.GetDcSummaryHtml({ 'DcId': Req.DcId, 'TemplateId': Req.TemplateId });
            }

            //DCNCMappingList = oActionDAO.GetNCObservation(DcClientGuid);
            
           // var DcSummaryViewData = MyInstance.GetDcSummaryData(Req.DcId);

            
            response.Html = MyInstance.FormHtml(TemplateNodes, DcResultDetailsDict, Req.TemplateId);

            OneViewConsole.Debug("LoadHtml End", "DcPreviewUIComponent.LoadHtml");

            return response;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DcPreviewUIComponent.LoadHtml", Excep);
        }
    }


    this.GetLastUpdatedDcResultDetails = function (Result) {
        try {
            OneViewConsole.Debug("GetLastUpdatedDcResultDetails Start", "DcPreviewUIComponent.GetLastUpdatedDcResultDetails");
            var TotalNACount = 0;
            //Get lastupdated DcResultDetails          

            //var _oDcDAO = new DcDAO();          
            var DcUserId = OneViewSessionStorage.Get("LoginUserId");

            //var result = _oDcDAO.GetDCResultDetailsByDCIdForLV(DcId);
            var DcResultDetails = GetDCByDCId(Result);

            for (var i = 0; i < DcResultDetails.length; i++) {

                var oAttribute = DcResultDetails[i];

                for (var j = 0; j < oAttribute.Controls.length; j++) {

                    var oControl = oAttribute.Controls[j];
                    var oFinalAnswer = GetFinalAnswerToShow(oControl.Answers, this.AnswerModeLoadType, DcUserId);

                    var ServerId = "";
                    var ClientId = "";

                    if (oFinalAnswer != null && oFinalAnswer.length >0) {
                        //alert(JSON.stringify(oFinalAnswer));

                        //var Answer = {
                        //    "ServerId": oFinalAnswer.ServerId,
                        //    "ClientId": oFinalAnswer.ClientId,
                        //    "ClientGuid": oFinalAnswer.ClientGuid,
                        //    "ControlId": oFinalAnswer.ControlId,
                        //    "Answer": oFinalAnswer.Answer,
                        //    "AnswerValue": oFinalAnswer.AnswerValue,
                        //    "AnswerFKType": oFinalAnswer.AnswerFKType,
                        //    "AnswerDataType": oFinalAnswer.AnswerDataType,
                        //    "AnswerMode": oFinalAnswer.AnswerMode,
                        //    "IsNA": oFinalAnswer.IsNA,
                        //}
                        

                        if (DcResultDetailsDict[oAttribute.AttributeNodeId] == undefined) {
                            var ControlWiseAnswer = {};
                            var AnswerList = [];
                            for (var k = 0; k < oFinalAnswer.length;k++)
                                AnswerList.push(oFinalAnswer[k]);
                            ControlWiseAnswer[oControl.ControlId] = AnswerList;
                            DcResultDetailsDict[oAttribute.AttributeNodeId] = ControlWiseAnswer;
                        }
                        else {
                            if (DcResultDetailsDict[oAttribute.AttributeNodeId][oControl.ControlId] == undefined) {
                                var AnswerList = [];
                                for (var k = 0; k < oFinalAnswer.length; k++)
                                    AnswerList.push(oFinalAnswer[k]);
                                DcResultDetailsDict[oAttribute.AttributeNodeId][oControl.ControlId] = AnswerList;
                            }
                            else {
                                var AnswerList = DcResultDetailsDict[oAttribute.AttributeNodeId][oControl.ControlId];
                                for (var k = 0; k < oFinalAnswer.length; k++)
                                    AnswerList.push(oFinalAnswer[k]);
                                DcResultDetailsDict[oAttribute.AttributeNodeId][oControl.ControlId] = AnswerList;
                            }

                        }

                        if (oFinalAnswer.IsNA == true) {
                            TotalNACount++;
                        }
                    }
                }
            }


            OneViewConsole.Debug("GetLastUpdatedDcResultDetails End", "DcPreviewUIComponent.GetLastUpdatedDcResultDetails");

            return DcResultDetailsDict;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DcPreviewUIComponent.GetLastUpdatedDcResultDetails", Excep);
        }
    }

    var GetDCByDCId = function (result) {

        try {
            OneViewConsole.Debug("GetDCByDCId Start", "LVDataCaptureBO.GetDCByDCId");

            if (result.length != 0) {
                var DataCaptureId = result[0].DataCaptureId;
                var i = 0;
                var totalLength = result.length;
                var AttributeNodeId = result[i].AttributeNodeId;
                var AttributeNodeName = result[i].AttributeNodeName;
                var FormatedAttributeAnswerDetails = [];
                var DcResultDetails = [];

                //Iterate the wrt Node
                while (true) {
                    if (result[i] != undefined && AttributeNodeId == result[i].AttributeNodeId) {

                        var FormatedControlAnswerDetails = [];
                        //{2(ControlId): [ { 'SystemUserId': 1, 'Answer': '1', 'AnswerValue': 'Chicken', 'LastUpdatedDate': '10/5/2012' },{ 'SystemUserId': 2, 'Answer': '2', 'AnswerValue': 'Chicken65', 'LastUpdatedDate': '11/5/2012' } ] }
                        var ControlId = result[i].ControlId;
                        while (true) {

                            if (result[i] != undefined && AttributeNodeId == result[i].AttributeNodeId && ControlId == result[i].ControlId) {

                                var anwerArray = result[i];

                                var AnwerDetails = {
                                    "SystemUserId": anwerArray.SystemUserId,
                                    "ServerId": anwerArray.ServerId,
                                    "ClientId": anwerArray.DcResultDetailsId,
                                    "ClientGuid": anwerArray.ClientGuid,
                                    "Comments": anwerArray.Comments,
                                    "ControlId": anwerArray.ControlId,
                                    "Answer": anwerArray.Answer,
                                    "AnswerValue": anwerArray.AnswerValue,
                                    "AnswerFKType": anwerArray.AnswerFKType,
                                    "AnswerDataType": anwerArray.AnswerDataType,
                                    "AnswerMode": anwerArray.AnswerMode,
                                    "IsManual": anwerArray.IsManual,
                                    "IsDynamicAttribute": anwerArray.IsDynamicAttribute,
                                    "IsDynamicAnswer": anwerArray.IsDynamicAnswer,
                                    "IndexId": anwerArray.IndexId,
                                    "IsMulti": anwerArray.IsMulti,
                                    "AutomaticDeviceId": anwerArray.AutomaticDeviceId,
                                    "LastUpdatedDate": anwerArray.LastUpdatedDate,
                                    "IsAttributeGroup": anwerArray.IsAttributeGroup,
                                    "Score": anwerArray.Score,
                                    "MaxScore": anwerArray.MaxScore,
                                    "Percentage": anwerArray.Percentage,
                                    "CompletedChildCount": anwerArray.CompletedChildCount,
                                    "TotalChildCount": anwerArray.TotalChildCount,
                                    "CompletedAttributeCount": anwerArray.CompletedAttributeCount,
                                    "TotalAttributeCount": anwerArray.TotalAttributeCount,
                                    "IsNA": anwerArray.IsNA,
                                    "IsBlocker": anwerArray.IsBlocker,
                                    "ESTTime": anwerArray.ESTTime,
                                    "ActualTime": anwerArray.ActualTime,
                                    "IsManualESTEnabled": anwerArray.IsManualESTEnabled
                                };

                                FormatedControlAnswerDetails.push(AnwerDetails);
                                i = i + 1;
                            }
                            else {
                                FormatedAttributeAnswerDetails.push({ "ControlId": ControlId, "Answers": FormatedControlAnswerDetails });
                                break;
                            }
                        }
                    }
                    else {
                        DcResultDetails.push({ "AttributeNodeId": AttributeNodeId, "AttributeNodeName": AttributeNodeName, "Controls": FormatedAttributeAnswerDetails });
                        FormatedAttributeAnswerDetails = [];
                        if (i < totalLength) {
                            AttributeNodeId = result[i].AttributeNodeId;
                            AttributeNodeName = result[i].AttributeNodeName;
                        }
                        else {
                            break;
                        }
                    }
                }
            }

            OneViewConsole.Debug("GetDCByDCId End", "LVDataCaptureBO.GetDCByDCId");

            return DcResultDetails;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetDCByDCId", Excep);
        }
        finally {
            result = null;
            DataCaptureId = null;
            DcResultDetails = null;
            i = null;
            totalLength = null;
            AttributeNodeId = null;
            FormatedAttributeAnswerDetails = null;
            FormatedControlAnswerDetails = null;
            ControlId = null;
            anwerArray = null;
            AnwerDetails = null;
        }
    }

    var GetFinalAnswerToShow = function (AnswerLst, AnswerModeLoadType, UserId) {
        try {
            OneViewConsole.Debug("FinalAnswer Start", "LVDataCaptureBO.FinalAnswer");

            var FinalAnswer = null;

            if (AnswerModeLoadType == 1) {
                //alert('AnswerLst : ' + JSON.stringify(AnswerLst));
                var IsMulti = GetIsMultiSelectAnswerMode(AnswerLst);
                if (IsMulti == true || IsMulti == 'true') {
                    FinalAnswer = GetLastUpdatedAnswerList(AnswerLst);
                }
                else {
                    FinalAnswer = GetLastUpdatedAnswer(AnswerLst);
                }
            }
            else if (AnswerModeLoadType == 2) {
                FinalAnswer = GetAnswerByUserId(AnswerLst, UserId);
            }
            else if (AnswerModeLoadType == 3) {
                FinalAnswer = GetMostCommonAnswer(AnswerLst);
            }
            else {
                alert("AnswerModeLoadType = " + AnswerModeLoadType + " Not implemented exception, LVDataCaptureBO.FinalAnswer");
            }

            OneViewConsole.Debug("FinalAnswer End", "LVDataCaptureBO.FinalAnswer");

            return FinalAnswer;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.FinalAnswer", Excep);
        }
        finally {
        }
    }

    var GetIsMultiSelectAnswerMode = function (AnswerLst) {
        try {
            OneViewConsole.Debug("GetIsMultiSelectAnswerMode Start", "LVDataCaptureBO.GetIsMultiSelectAnswerMode");

            var IsMulti = false;

            IsMulti = AnswerLst[0].IsMulti;

           // alert('IsMulti : ' + IsMulti);
            OneViewConsole.Debug("GetIsMultiSelectAnswerMode End", "LVDataCaptureBO.GetIsMultiSelectAnswerMode");

            return IsMulti;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetIsMultiSelectAnswerMode", Excep);
        }
        finally {
        }
    }

    var GetLastUpdatedAnswer = function (AnswerLst) {
        try {
            OneViewConsole.Debug("GetLastUpdatedAnswer Start", "LVDataCaptureBO.GetLastUpdatedAnswer");

            var LastUpdatedAnswerList = [];

            var AnswerObj = AnswerLst[0];

            var _DateTime = new DateTime();
            var LastUpdatedDate = _DateTime.GetDateByString(AnswerLst[0].LastUpdatedDate);

            if (AnswerLst.length > 1) {
                for (var i = 0; i < AnswerLst.length; i++) {
                    var Answer = AnswerLst[i];
                    if (LastUpdatedDate < _DateTime.GetDateByString(AnswerLst[i].LastUpdatedDate)) {
                        LastUpdatedDate = _DateTime.GetDateByString(AnswerLst[i].LastUpdatedDate);
                        AnswerObj = AnswerLst[i];
                    }
                }
            }

            if (AnswerObj != undefined && AnswerObj != null) {
                LastUpdatedAnswerList.push(AnswerObj);
            }

            OneViewConsole.Debug("GetLastUpdatedAnswer End", "LVDataCaptureBO.GetLastUpdatedAnswer");

            return LastUpdatedAnswerList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetLastUpdatedAnswer", Excep);
        }
        finally {
            AnswerObj = null;
            LastUpdatedDate = null;
        }
    }

     var GetLastUpdatedAnswerList = function (AnswerList) {

        try {

            OneViewConsole.Debug("GetLastUpdatedAnswerList Start", "DataCaptureBO.GetLastUpdatedAnswerList");

            var LastUpdatedAnswerList = [];

            var UniqueAnswerList = [];
            for (var i = 0 ; i < AnswerList.length ; i++) {
                if (UniqueAnswerList.length > 0) {
                    var IsExists = false;
                    for (var j = 0 ; j < UniqueAnswerList.length ; j++) {
                        if (UniqueAnswerList[j].Answer == AnswerList[i].Answer) {
                            IsExists = true;
                            break;
                        }
                    }

                    if (IsExists == false) {
                        UniqueAnswerList.push(AnswerList[i]);
                    }
                }
                else {
                    UniqueAnswerList.push(AnswerList[i]);
                }

            }
            //alert('UniqueAnswerList : ' + JSON.stringify(UniqueAnswerList));
            //alert('AnswerList : ' + JSON.stringify(AnswerList));

            var _DateTime = new DateTime();
            for (var i = 0 ; i < UniqueAnswerList.length ; i++) {
                var Details = UniqueAnswerList[i];
                var AnswerObj = null;
                var LastUpdatedDate = "";

                for (var j = 0 ; j < AnswerList.length ; j++) {
                    if (Details.Answer == AnswerList[j].Answer) {

                        if (AnswerObj == null) {
                            AnswerObj = AnswerList[j];
                            LastUpdatedDate = _DateTime.GetDateByString(AnswerObj.LastUpdatedDate);
                        }

                        else if (LastUpdatedDate < _DateTime.GetDateByString(AnswerList[j].LastUpdatedDate)) {
                            LastUpdatedDate = _DateTime.GetDateByString(AnswerList[j].LastUpdatedDate);
                            AnswerObj = AnswerList[j];
                        }
                    }
                }
                if (AnswerObj != null) {
                    LastUpdatedAnswerList.push(AnswerObj);
                }
            }


            OneViewConsole.Debug("GetLastUpdatedAnswerList End", "DataCaptureBO.GetLastUpdatedAnswerList");

            return LastUpdatedAnswerList;
        }
        catch (Excep) {
            //  alert("DataCaptureBO.GetLastUpdatedAnswerList" + Excep);
            //  alert("DataCaptureBO.GetLastUpdatedAnswerList 22 " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("BO", "DataCaptureBO.GetLastUpdatedAnswerList", Excep);
        }
        finally {
        }
    }

    var GetAnswerByUserId = function (AnswerLst, UserId) {
        try {
            OneViewConsole.Debug("GetAnswerByUserId Start", "LVDataCaptureBO.GetAnswerByUserId");

            alert("Answer By UserId Not implemented exception, LVDataCaptureBO.GetAnswerByUserId");

            OneViewConsole.Debug("GetAnswerByUserId End", "LVDataCaptureBO.GetAnswerByUserId");

            return null;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetAnswerByUserId", Excep);
        }
        finally {
        }
    }

    var GetMostCommonAnswer = function (AnswerLst) {
        try {
            OneViewConsole.Debug("GetMostCommonAnswer Start", "LVDataCaptureBO.GetMostCommonAnswer");

            alert("Most Common Answer Not implemented exception, LVDataCaptureBO.GetMostCommonAnswer");

            OneViewConsole.Debug("GetMostCommonAnswer End", "LVDataCaptureBO.GetMostCommonAnswer");

            return null;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetMostCommonAnswer", Excep);
        }
        finally {
        }
    }



    this.FormHtml = function (TemplateNodes, DcResultDetailsDict, TemplateId) {
        try {
            OneViewConsole.Debug("FormHtml Start", "DcPreviewUIComponent.FormHtml");
            var Html = "";

            var AttributeGroupHeader = "";     

            if (TemplateNodes.TemplateConfigMetaDataDetails.IsAttributeGroup == true) {
                var ChildList = TemplateNodes.TemplateConfigMetaDataDetails.Childs;
                if (ChildList != null) {
                    if (DcApprovalUIInfo.IsIndividualDcSummary == true) {
                        Html += '   <div class="margin-left">';
                    }
                    //Html += '<div class="list no-margin margin-bottom">';
                    var IsNeedToHideUnansweredattribute = MyInstance.IsRequiredToHideUnansweredattribute();
                    for (var i = 0; i < ChildList.length ; i++) {
                        var Child = ChildList[i];
                        Html += ReadChilds(Child, AttributeGroupHeader, DcResultDetailsDict, IsNeedToHideUnansweredattribute);
                    }
                    // Html += '</div></div>';
                }
            }
           
            OneViewConsole.Debug("FormHtml End", "DcPreviewUIComponent.FormHtml");

            return Html;
        }

        catch (Excep) {
           // alert('FormHtml :' + JSON.stringify(Excep) + "," + Excep);
            throw oOneViewExceptionHandler.Create("Framework", "DcPreviewUIComponent.FormHtml", Excep);
        }
    }

    var ReadChilds = function (Child, AttributeGroupHeader, DcResultDetailsDict, IsNeedToHideUnansweredattribute) {
        try {
           
            var SubChildList = Child.Childs;
            var Html = "";
          

            var _oDcHeaderFooterPreviewUIComponent = new DcHeaderFooterPreviewUIComponent();
            if (Child.IsAttributeGroup == true) {
                if (Child.Name != "") {
                    Html += _oDcHeaderFooterPreviewUIComponent.GetAGHeaderHtml(Child.Name);
                }
                if (SubChildList != null) {
                    Html += '<div class="margin-left margin-bottom">';
                    Html += '<div class="list no-margin">';

                    for (var j = 0; j < SubChildList.length; j++) {
                        var SubChild = SubChildList[j];
                        if (SubChild.IsAttributeGroup == true) {
                            Html += ReadChilds(SubChild, AttributeGroupHeader, DcResultDetailsDict);
                        }
                        else {
                            Html += MyInstance.FormAnswermodeHtml(SubChild, DcResultDetailsDict, IsNeedToHideUnansweredattribute);

                        }
                    }
                    Html += '</div></div>';
                }

            }
            else {
                Html += MyInstance.FormAnswermodeHtml(Child, DcResultDetailsDict, IsNeedToHideUnansweredattribute);

            }

            return Html;

        }
        catch (Excep) {
            //alert('ReadChilds :' + JSON.stringify(Excep) + "," + Excep);
            throw oOneViewExceptionHandler.Create("BO", "DcPreviewUIComponent.ReadChilds", Excep);
        }
    }

    this.FormAnswermodeHtml = function (TemplateData, DcResultDetailsDict, IsNeedToHideUnansweredattribute) {
        try {

            OneViewConsole.Debug("FormAnswermodeHtml Start", "DcPreviewUIComponent.FormAnswermodeHtml");

            var Html = "";
            var AttributeId = TemplateData.Id;
            var AttributeWiseAnswerDict = DcResultDetailsDict[TemplateData.Id];        
            
            var _oDcBandAnswermodePreviewUIComponent = new DcBandAnswermodePreviewUIComponent();
            var _oDcOtherAnswermodePreviewUIComponent = new DcOtherAnswermodePreviewUIComponent();
            var _oBandDetailsMasterDAO = new BandDetailsMasterDAO();
           // Html += '<label class="item" style="border-width: 1px; "> ';
            Html += ' <div class="item item-button-right"><div class="field-item"><label><span> ' + xlatService.xlat(TemplateData.Name) + '</span>';// _oDcBandAnswermodePreviewUIComponent.GetQuestionHtml(TemplateData.Name);
            for (var k = 0; k < TemplateData.AnswerModes.length; k++) {
                var AnswerList;
                var AttributeIsNA = false;
                var AnswerMode = TemplateData.AnswerModes[k];
                if (AnswerMode.Type == "DCListViewControlConfig") {

                    if (AnswerMode.ListViewDisplay == 0) {//Band                                                   
                        //  if (AnswerMode.ListViewDataSourceConfig != null) {
                        //  if (AnswerMode.ListViewDataSourceConfig.Type == "BandListViewDataSourceConfig") {
                        if (AnswerMode.SelectionType == 0 || AnswerMode.SelectionType == 'SINGLE') {
                            AnswerList = (AttributeWiseAnswerDict != undefined ? AttributeWiseAnswerDict[AnswerMode.ControlId] : []);

                            if (AnswerList.length > 0) {
                                var Color = "";
                                if (AnswerList[0].Answer != "") {
                              
                                     Color = _oBandDetailsMasterDAO.GetBandDetailsColourCodeById(AnswerList[0].Answer);
                                     Html += _oDcBandAnswermodePreviewUIComponent.GetAnswerHtml(AnswerList[0].AnswerValue, Color);
                                                                       
                                }
                                else if (AnswerList[0].IsNA == 'true') {
                                    Html += _oDcBandAnswermodePreviewUIComponent.GetAnswerHtml("NA", "grey");
                                    break;
                                }
                            }
                            //else {
                            //    Html += '<label class="item" style="border-width: 1px; "> ';
                            //    Html += _oDcBandAnswermodePreviewUIComponent.GetQuestionHtml(TemplateData.Name);
                            //    Html += '</label> ';

                            //}
                        }
                        else if (AnswerMode.SelectionType == 1 || AnswerMode.SelectionType == 'MULTI') {
                            AnswerList = (AttributeWiseAnswerDict != undefined ? AttributeWiseAnswerDict[AnswerMode.ControlId] : []);
                            //Html += '<label class="item" style="border-width: 1px; "> ';
                            //Html += _oDcBandAnswermodePreviewUIComponent.GetQuestionHtml(TemplateData.Name);
                            if (AnswerList.length > 0) {

                                for (var m = 0; m < AnswerList.length; m++) {
                                    if (AnswerList[m].Answer != "") {
                                        var Color = _oBandDetailsMasterDAO.GetBandDetailsColourCodeById(AnswerList[m].Answer);
                                        // Html += _oDcBandAnswermodePreviewUIComponent.GetAnswerHtml(AnswerList[m].AnswerValue, Color);
                                        if (Color != null && Color != "null" && Color != "" && Color != undefined) {
                                            if (Color.toUpperCase() == "AMBER") {                                               
                                                Color = "#FFBF00";
                                            }
                                        }
                                        Html += _oDcOtherAnswermodePreviewUIComponent.GetMultiSelectAnswerHtml(AnswerList[m].AnswerValue, Color);

                                    }
                                    else if (AnswerList[m].IsNA == 'true') {
                                        Html += _oDcBandAnswermodePreviewUIComponent.GetAnswerHtml("NA", "grey");
                                        AttributeIsNA = true;
                                        break;
                                    }
                                }
                            }
                            //   Html += '</label> ';

                        }
                        //}
                        // }

                    }
                    else if (AnswerMode.ListViewDisplay == 3) {//ddl
                        if (AnswerMode.SelectionType == 0 || AnswerMode.SelectionType == 'SINGLE') {
                            AnswerList = (AttributeWiseAnswerDict != undefined ? AttributeWiseAnswerDict[AnswerMode.ControlId] : []);
                            if (AnswerList.length > 0) {
                                if (AnswerList[0].IsNA == 'true') {
                                    Html += _oDcBandAnswermodePreviewUIComponent.GetAnswerHtml("NA", "grey");
                                    AttributeIsNA = true;
                                    break;
                                }
                                else {
                                    Html += _oDcOtherAnswermodePreviewUIComponent.GetAnswerHtml(AnswerList[0].AnswerValue);
                                }
                            }
                        }
                        else if (AnswerMode.SelectionType == 1 || AnswerMode.SelectionType == 'MULTI') {
                            AnswerList = (AttributeWiseAnswerDict != undefined ? AttributeWiseAnswerDict[AnswerMode.ControlId] : []);
                            //Html += '<label class="item">';
                            //Html += _oDcOtherAnswermodePreviewUIComponent.GetQuestionHtml(TemplateData.Name);
                            if (AnswerList.length > 0) {
                                for (var m = 0; m < AnswerList.length; m++) {
                                    if (AnswerList[m].IsNA == 'true') {
                                        Html += _oDcBandAnswermodePreviewUIComponent.GetAnswerHtml("NA", "grey");
                                        AttributeIsNA = true;
                                        break;
                                    }
                                    else {
                                        Html += _oDcOtherAnswermodePreviewUIComponent.GetAnswerHtml(AnswerList[m].AnswerValue);
                                    }
                                }
                            }
                            // Html +='</label>';
                        }

                    }
                    else if (AnswerMode.ListViewDisplay == 2) {
                     //   alert('vvv display 2');
                      //  alert(JSON.stringify(AttributeWiseAnswerDict[AnswerMode.ControlId]));
                        AnswerList = (AttributeWiseAnswerDict != undefined ? AttributeWiseAnswerDict[AnswerMode.ControlId] : []);
                        if (AnswerList.length > 0) {
                            //todo : Sangeeta Bhatt (06-10-2017) :  only supporting for bandDatasource for checkboxlist. Need to implement for RCO datasource.
                            for (var m = 0; m < AnswerList.length; m++) {
                                if (AnswerList[m].Answer != "") {
                                    var Color = _oBandDetailsMasterDAO.GetBandDetailsColourCodeById(AnswerList[m].Answer);
                                    // Html += _oDcBandAnswermodePreviewUIComponent.GetAnswerHtml(AnswerList[m].AnswerValue, Color);
                                    Html += _oDcOtherAnswermodePreviewUIComponent.GetMultiSelectAnswerHtml(AnswerList[m].AnswerValue, Color);

                                }
                                else if (AnswerList[m].IsNA == 'true') {
                                    Html += _oDcBandAnswermodePreviewUIComponent.GetAnswerHtml("NA", "grey");
                                    AttributeIsNA = true;
                                    break;
                                }
                            }

                            /*
                            for (var m = 0; m < AnswerList.length; m++) {
                                if (AnswerList[m].IsNA == 'true') {
                                    Html += _oDcBandAnswermodePreviewUIComponent.GetAnswerHtml("NA", "grey");
                                    AttributeIsNA = true;
                                    break;
                                }
                                else {
                                    if (m > 0 && m != AnswerList.length)
                                    {
                                        Html = Html + " | ";
                                    }
                                    Html += _oDcOtherAnswermodePreviewUIComponent.GetAnswerHtml(AnswerList[m].AnswerValue);
                                }
                            }
                            */
                           // alert('Html : ' + Html);
                        }
                    }
                    else {
                        // alert('ListViewDisplay  = ' + AnswerMode.ListViewDisplay + ' Not implemented');
                    }


                }
                else if (AnswerMode.Type == "DCImageCaptureControlConfig") {
                    // alert('AnswerMode.Type : ' + AnswerMode.Type + "Not Supported ");
                     AnswerList = (AttributeWiseAnswerDict != undefined ? AttributeWiseAnswerDict[AnswerMode.ControlId] : []);                  
                    if (AnswerList.length > 0) {
                        if (AnswerList[0].IsNA == 'true') {
                            Html += _oDcBandAnswermodePreviewUIComponent.GetAnswerHtml("NA", "grey");
                            AttributeIsNA = true;
                            break;
                        }
                        else {
                            var MultiMediaSubElementsList = oActionDAO.GetMultiMediaSubElementsByMappedEntityClientGuid(AnswerList[0].ClientGuid, DATEntityType.DCResultDetails);                           
                            if (MultiMediaSubElementsList != "" && MultiMediaSubElementsList != null) {
                                Html += MyInstance.GetMultiMediaSubElementsAnswerModeHtml(MultiMediaSubElementsList);
                            }
                        }
                    }
                }

                else if (AnswerMode.Type == "DCSignaturePadControlConfig") {
                    // alert('AnswerMode.Type : ' + AnswerMode.Type + "Not Supported ");
                     AnswerList = (AttributeWiseAnswerDict != undefined ? AttributeWiseAnswerDict[AnswerMode.ControlId] : []);                  
                    if (AnswerList.length > 0) {
                        if (AnswerList[0].IsNA == 'true') {
                            Html += _oDcBandAnswermodePreviewUIComponent.GetAnswerHtml("NA", "grey");
                            AttributeIsNA = true;
                            break;
                        }
                        else {
                          
                            var MultiMediaBlobSubElementsList = oActionDAO.GetMultiMediaBlobSubElementsByMappedEntityClientGuid(AnswerList[0].ClientGuid, DATEntityType.DCResultDetails);                          
                            if (MultiMediaBlobSubElementsList != "" && MultiMediaBlobSubElementsList != null) {
                                Html += MyInstance.GetMultiMediaBlobSubElementsAnswerModeHtml(MultiMediaBlobSubElementsList);
                            }
                            else {
                                if (AnswerList[0].Answer != "") {
                                    Html += '<input type="text" style="padding:20px;" value="Last Updated On : ' + AnswerList[0].LastUpdatedDate + '" disabled>';
                                }
                            }
                            
                        }
                    }
                }

                else {
                 
                    if (AttributeWiseAnswerDict[AnswerMode.ControlId] != undefined) {
                    AnswerList = (AttributeWiseAnswerDict != undefined ? AttributeWiseAnswerDict[AnswerMode.ControlId] : []);
                    if (AnswerList.length > 0) {
                        if (AnswerList[0].Answer != "") {
                            Html += _oDcOtherAnswermodePreviewUIComponent.GetAnswerHtml(AnswerList[0].Answer);
                        }
                        else if (AnswerList[0].IsNA == 'true') {
                            Html += _oDcBandAnswermodePreviewUIComponent.GetAnswerHtml("NA", "grey");
                            AttributeIsNA = true;
                            break;
                        }
                    }
                  }
                    //else {
                    //    Html += '<label class="item">'
                    //    Html += _oDcOtherAnswermodePreviewUIComponent.GetQuestionHtml(TemplateData.Name);
                    //    Html += '</label>';
                    //}                
                }

                if (AttributeIsNA == true) {
                    break;
                }
            }
           // Html += '</label> '; 
            Html += '</label>';
            Html += ' </div>';
            if (AnswerList.length > 0) {
                if (AnswerList[0].IsNA != 'true' && AnswerList[0].Answer != "") {                    
                    var oDcClientGuid = "'" + DcClientGuid + "'";                    
                    Html += ' <a href="javascript:void(0)" onclick="ShowAttributeInfo(' + AttributeId + ',' + oDcClientGuid + ')" class="button button-icon icon icon-bell padding" style="margin-top: 15px;"><div class="badge badge-energized" style="position: absolute; right: -6px;"></div></a>';
                }
            }
            Html += '</div>';

            //if (OneViewSessionStorage.Get("ServiceId") == 55) {
            //    if (AnswerList.length > 0) {
            //        if (AnswerList[0].IsNA != 'true' && AnswerList[0].Answer != "") {
            //        }
            //        else {
            //            Html = "";
            //        }
            //    }
            //    else {
            //        Html = "";
            //    }
            //}

            if (IsNeedToHideUnansweredattribute != undefined) {
                if (IsNeedToHideUnansweredattribute == true) {
                    if (AnswerList.length > 0) {
                        if (AnswerList[0].IsNA != 'true' && AnswerList[0].Answer != "") {
                        }
                        else {
                            Html = "";
                        }
                    }
                    else {
                        Html = "";
                    }
                }
            }

            OneViewConsole.Debug("FormAnswermodeHtml End", "DcPreviewUIComponent.FormAnswermodeHtml");
            return Html;
        }
        catch (Excep) {
            //alert('FormAnswermodeHtml :' + JSON.stringify(Excep) + "," + Excep);
            throw oOneViewExceptionHandler.Create("Framework", "DcPreviewUIComponent.FormAnswermodeHtml", Excep);
        }
    }

    this.AppendHtml = function (DivId, Html) {
        try {
            OneViewConsole.Debug("FormHtml Start", "DcPreviewUIComponent.FormHtml");

            document.getElementById(DivId).innerHTML = Html;

            OneViewConsole.Debug("FormHtml End", "DcPreviewUIComponent.FormHtml");

        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DcPreviewUIComponent.FormHtml", Excep);
        }
    }

    this.DestroyHtml = function (Id) {

        try {
            OneViewConsole.Debug("AppendHtml start", "MultipleDcApprovalBO.AppendHtml");

            document.getElementById(Id).innerHTML = "";

            OneViewConsole.Debug("AppendHtml end", "MultipleDcApprovalBO.AppendHtml");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MultipleDcApprovalBO.AppendHtml", Excep);
        }
        finally {
        }
    }


    ////********GetDcPreviewMetadata********////
    this.GetDcPreviewMetadata = function (ServiceId, DcPlaceId, DcPlaceDimension, TemplateId, DcUserId) {
        try {
            OneViewConsole.Debug("LoadHtml Start", "DcPreviewUIComponent.LoadHtml");

            var _oMobileDcPreviewMetadataDAO = new MobileDcPreviewMetadataDAO();
            var DcPreviewMetadataList = _oMobileDcPreviewMetadataDAO.GetMobileDcPreviewMetadata({"DcPlaceId":DcPlaceId,"TemplateNodeId": TemplateId, "DcUserId":DcUserId});
            if (DcPreviewMetadataList.length > 0) {

                DcPreviewMetadata["IsReferDcSummaryViewConfig"] = DcPreviewMetadataList[0].IsReferApprovalDcSummaryViewConfig;
                DcPreviewMetadata["DcSummaryViewConfig"] = JSON.parse(JSON.parse(DcPreviewMetadataList[0].DcSummaryViewConfig));
                DcPreviewMetadata["AttributeSummaryViewConfig"] = JSON.parse(JSON.parse(DcPreviewMetadataList[0].AttributeSummaryViewConfig));

            }
            else {
                DcPreviewMetadata = {

                    "IsReferDcSummaryViewConfig": true,

                    "DcSummaryViewConfig":
                    {
                        "IsTemplateNameRequired": true, "IsDcPlaceNameRequired": true, "IsNCCountRequired": true, "IsObservationCountRequired": true, "IsActionCountRequired": true, "IsBlockerCountRequired": true,
                        "IsNACountRequired": true, "IsESTTimeRequired": true, "IsActualTimeRequired": true, "IsGPSInfoRequired": true, "IsLastUpdatedDateRequired": true, "IsScoreRequired": true,
                        "IsPercentageRequired": true, "IsCommentsRequired": true, "IsListviewAnswermodeSummaryRequired": true, "IsOtherAnswermodeSummaryRequired": true
                    },

                    "AttributeSummaryViewConfig":
                    {
                        "IsNCRequired": true, "IsObservationRequired": true, "IsActionRequired": true, "IsBlockerRequired": true, "IsESTTimeRequired": true, "IsActualTimeRequired": true,
                        "IsGPSInfoRequired": true, "IsLastUpdatedDateRequired": true, "IsScoreRequired": false, "IsPercentageRequired": false, "IsCommentsRequired": true, "IsMultiMediaSubElementsRequired": true,
                        "IsMultiMediaBlobSubElementsRequired": true
                    }
                };
            }

            OneViewConsole.Debug("LoadHtml End", "DcPreviewUIComponent.LoadHtml");

        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DcPreviewUIComponent.LoadHtml", Excep);
        }
    }

    ////********GetDcSummaryData********////
    this.GetDcSummaryData = function (DcId) {
        try {
            OneViewConsole.Debug("GetDcSummaryData Start", "DcPreviewUIComponent.GetDcSummaryData");

            var DcSummaryData =
                {
                    "TemplateName": "Test TemplateName",
                    "DcPlaceName": "Test DcPlaceName",
                    "ESTTime": "",
                    "ActualTime": "",
                    "Latitude": "",
                    "Longitude": "",
                    "Score": "",
                    "Percentage": "",
                    "Comments": "",
                    "LastUpdatedDate": "",

                    "NCCount": 0,
                    "ObservationCount": 0,
                    "ActionCount": 0,
                    "BlockerCount": 0,

                    "NACount": 0,
                    "ListviewAnswermodeSummary": [],
                    "OtherAnswermodeSummary": [],
                };

            OneViewConsole.Debug("GetDcSummaryData End", "DcPreviewUIComponent.GetDcSummaryData");

            return DcSummaryData;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DcPreviewUIComponent.GetDcSummaryData", Excep);
        }
    }

    ////********GetDcSummaryHtml********////
    this.GetDcSummaryHtml = function (Req) {
        try {
            OneViewConsole.Debug("GetDcSummaryHtml Start", "DcPreviewUIComponent.GetDcSummaryHtml");

            var Html = "";
            var DcSummaryViewConfig;
            if (DcPreviewMetadata.IsReferDcSummaryViewConfig == true && ApprovalDcSummaryConfig != null) {                
                //take from approval config , saved globally  if it is not empty
                DcSummaryViewConfig = ApprovalDcSummaryConfig;
            }
            else {
                DcSummaryViewConfig = DcPreviewMetadata.DcSummaryViewConfig;
            }

            if (DcSummaryViewConfig != undefined) {
                var _oDcSummaryUIComponent = new DcSummaryUIComponent();
             
                if (DcApprovalUIInfo.IsIndividualDcSummary == false) {
                    Html += _oDcSummaryUIComponent.GetHtmlOverAllForDcLst({ DcId: Req.DcId, DcClientGuid: Req.DcClientGuid, TemplateId: Req.TemplateId, DcSummaryConfig: DcSummaryViewConfig, 'IsPreviewButtonEnable': false });
                }
                else {
                    Html += _oDcSummaryUIComponent.GetHtml({ 'DcId': Req.DcId, 'TemplateId': Req.TemplateId, 'DcSummaryConfig': DcSummaryViewConfig, 'IsPreviewButtonEnable': false });
                }
                
               // alert('Html : ' + Html);
            }
            OneViewConsole.Debug("GetDcSummaryHtml End", "DcPreviewUIComponent.GetDcSummaryHtml");

            return Html;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DcPreviewUIComponent.GetDcSummaryHtml", Excep);
        }
    }





    ////********GetDcPreviewAttributeSummaryData********////
    this.GetDcPreviewAttributeSummaryData = function (AttributeId, DcClientGuid) {
        try {
            OneViewConsole.Debug("GetDcPreviewAttributeSummaryData Start", "DcPreviewUIComponent.GetDcPreviewAttributeSummaryData");
            //alert('AttributeId : ' + AttributeId);
         
            var DCPreviewAttributeSummaryData = {};        
            /*
            if (DCNCMappingList.length) {
                DCPreviewAttributeSummaryData = MyInstance.GetNCByAttributeId(AttributeId, DCNCMappingList);
            }
            if (OneViewGlobalServiceTypeEnum[OneViewGlobalServiceType] == 17) {
                DCNCMappingList = oActionDAO.GetNCObservation(DcClientGuid);
                
                if (DCNCMappingList.length) {
                    DCPreviewAttributeSummaryData = MyInstance.GetNCByAttributeId(AttributeId, DCNCMappingList);
                }
            }
            */
            DCNCMappingList = oActionDAO.GetNCObservation(DcClientGuid);

            if (DCNCMappingList.length) {
                DCPreviewAttributeSummaryData = MyInstance.GetNCByAttributeId(AttributeId, DCNCMappingList);
            }
         

            var AttributeInfo = {};
            var ControlDetailsDict = DcResultDetailsDict[AttributeId];
            
            for (var ControlId in ControlDetailsDict) {                
                var ControlDataList = ControlDetailsDict[ControlId];
                var AnwerDetailsList = [];
                for (var i = 0; i < ControlDataList.length ; i++) {
                    var ControlData = ControlDataList[i];

                    var AnwerDetails = {
                        "SystemUserId": ControlData.SystemUserId,
                        "ServerId": ControlData.ServerId,
                        "ClientId": ControlData.DcResultDetailsId,
                        "ClientGuid": ControlData.ClientGuid,
                        "Comments": ControlData.Comments,
                        "ControlId": ControlData.ControlId,
                        "Answer": ControlData.Answer,
                        "AnswerValue": ControlData.AnswerValue,
                        "AnswerFKType": ControlData.AnswerFKType,
                        "AnswerDataType": ControlData.AnswerDataType,
                        "AnswerMode": ControlData.AnswerMode,
                        "IsManual": ControlData.IsManual,
                        "AutomaticDeviceId": ControlData.AutomaticDeviceId,
                        "LastUpdatedDate": ControlData.LastUpdatedDate,
                        "IsAttributeGroup": ControlData.IsAttributeGroup,
                        "Score": ControlData.Score,
                        "MaxScore": ControlData.MaxScore,
                        "Percentage": ControlData.Percentage,
                        "IsNA": ControlData.IsNA,
                        "IsBlocker": ControlData.IsBlocker,
                        "ESTTime": ControlData.ESTTime,
                        "ActualTime": ControlData.ActualTime,
                        "IsManualESTEnabled": ControlData.IsManualESTEnabled,
                        "Latitude": "",
                        "Longitude": "",
                        "MultiMediaSubElementsList": [],
                        "MultiMediaBlobSubElementsList": [],
                    };
                    AnwerDetailsList.push(AnwerDetails);

                    DCPreviewAttributeSummaryData.BlockerInfo = MyInstance.GetAttributeWiseBlockerData(AnwerDetails.ClientGuid);

                    //if (AnwerDetails.Answer != "") {                       

                    var MultiMediaSubElement = oActionDAO.GetMultiMediaSubElementsByMappedEntityClientGuid(AnwerDetails.ClientGuid, DATEntityType.DCResultDetails);
                    if (MultiMediaSubElement != null && MultiMediaSubElement != "") {
                        AnwerDetails.MultiMediaSubElementsList.push({ "Id": MultiMediaSubElement.Id, "ClientGuid": MultiMediaSubElement.ClientGuid, "LocalURL": MultiMediaSubElement.LocalURL, "Comments": MultiMediaSubElement.Comments });
                    }

                    var MultiMediaBlobSubElement = oActionDAO.GetMultiMediaBlobSubElementsByMappedEntityClientGuid(AnwerDetails.ClientGuid, DATEntityType.DCResultDetails);
                    if (MultiMediaBlobSubElement != null && MultiMediaBlobSubElement != "") {
                        AnwerDetails.MultiMediaBlobSubElementsList.push({ "Id": MultiMediaBlobSubElement.Id, "ClientGuid": MultiMediaBlobSubElement.ClientGuid, "LocalURL": MultiMediaBlobSubElement.LocalURL, "Comments": MultiMediaBlobSubElement.Comments });
                    }
                    //}
                }

                AttributeInfo[ControlId] = AnwerDetailsList;
                //alert('AttributeInfo : ' + JSON.stringify(AttributeInfo));
            }

            DCPreviewAttributeSummaryData.AttributeInfo = AttributeInfo;

            OneViewConsole.Debug("GetDcPreviewAttributeSummaryData End", "DcPreviewUIComponent.GetDcPreviewAttributeSummaryData");

            return DCPreviewAttributeSummaryData;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DcPreviewUIComponent.GetDcPreviewAttributeSummaryData", Excep);
        }
    }

    ////********ShowAttributeInfo********////
    this.ShowAttributeInfo = function (AttributeId, DcClientGuid) {
        try {
            OneViewConsole.Debug("ShowAttributeInfo Start", "DcPreviewUIComponent.ShowAttributeInfo");
            //alert('ShowAttributeInfo');
            scope.AttributeInfoDivShow = true;

            var DcSummaryViewData = MyInstance.GetDcPreviewAttributeSummaryData(AttributeId, DcClientGuid);
            var Html = MyInstance.GetAttributeSummaryHtml(DcSummaryViewData);
            MyInstance.AppendHtml("AttributeSummaryDivId", Html);

            scope.$apply();
            OneViewConsole.Debug("ShowAttributeInfo End", "DcPreviewUIComponent.ShowAttributeInfo");

        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DcPreviewUIComponent.ShowAttributeInfo", Excep);
        }
    }

    ////********HideAttributeInfo********////
    this.HideAttributeInfo = function () {
        try {
            OneViewConsole.Debug("HideAttributeInfo Start", "DcPreviewUIComponent.HideAttributeInfo");
            
            scope.AttributeInfoDivShow = false;
            MyInstance.DestroyHtml("AttributeSummaryDivId");
           
            OneViewConsole.Debug("HideAttributeInfo End", "DcPreviewUIComponent.HideAttributeInfo");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DcPreviewUIComponent.HideAttributeInfo", Excep);
        }
    }

    ////********GetAttributeSummaryHtml********////
    this.GetAttributeSummaryHtml = function (DcSummaryViewData) {
        try {
            OneViewConsole.Debug("GetAttributeSummaryHtml Start", "DcPreviewUIComponent.GetAttributeSummaryHtml");
            var AttributeSummaryViewConfig = DcPreviewMetadata.AttributeSummaryViewConfig;
            var Html = "";

            Html += MyInstance.GetAttributeInfoHtml(DcSummaryViewData);

            if(AttributeSummaryViewConfig.IsNCRequired == true) {
                Html += MyInstance.GetNCInfoHtml(DcSummaryViewData);
            }
            if(AttributeSummaryViewConfig.IsObservationRequired == true) {
                Html += MyInstance.GetObservationInfoHtml(DcSummaryViewData);
            }
            if(AttributeSummaryViewConfig.IsActionRequired == true) {
                Html += MyInstance.GetActionInfoHtml(DcSummaryViewData);
            }
            if(AttributeSummaryViewConfig.IsBlockerRequired == true) {
                Html += MyInstance.GetBlockerInfoHtml(DcSummaryViewData);
            }

            OneViewConsole.Debug("GetAttributeSummaryHtml End", "DcPreviewUIComponent.GetAttributeSummaryHtml");

            //alert('Html : ' + Html);
            return Html;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DcPreviewUIComponent.GetAttributeSummaryHtml", Excep);
        }
    }

    ////********GetAttributeInfoHtml********////
    this.GetAttributeInfoHtml = function (DcSummaryViewData) {
        try {
            OneViewConsole.Debug("GetAttributeInfoHtml Start", "DcPreviewUIComponent.GetAttributeInfoHtml");
            var AttributeSummary = xlatService.xlat('Attribute Summary');
            var Html = "";
            var AttributeSummaryViewConfig = DcPreviewMetadata.AttributeSummaryViewConfig;
            var AttributeInfo = DcSummaryViewData.AttributeInfo;
            if (AttributeInfo != null && Object.keys(AttributeSummaryViewConfig).length >0 ) {
                Html += '<div class="item item-divider">' + AttributeSummary + '</div>';
                var length = Object.keys(AttributeInfo).length;
                var itr = 1;
                for (var ControlId in AttributeInfo) {
                    if (length > 1) {
                        Html += "Control " + itr;
                        itr++;
                    }
                    var ControlInfoList = AttributeInfo[ControlId];
                    if (ControlInfoList != undefined) {

                        for (var i = 0; i < ControlInfoList.length ; i++) {
                            var ControlInfo = ControlInfoList[i];
                            Html += '<div class="item">';
                            if (ControlInfoList.length > 1) {
                                Html += "Answer " + (i + 1);
                            }
                            if (ControlInfo.AutomaticDeviceId != "" && ControlInfo.AutomaticDeviceId != undefined) {
                                Html += MyInstance.GetAttributePropertyHtml("Automatic Device Name", ControlInfo.AutomaticDeviceId);
                            }
                            if (ControlInfo.ESTTime != "" && AttributeSummaryViewConfig.IsESTTimeRequired == true) {
                                Html += MyInstance.GetAttributePropertyHtml("EST Time", ControlInfo.ESTTime);
                            }
                            if (ControlInfo.ActualTime != "" && AttributeSummaryViewConfig.IsActualTimeRequired == true) {
                                Html += MyInstance.GetAttributePropertyHtml("Actual Time", ControlInfo.ActualTime);
                            }
                            if (ControlInfo.Latitude != "" && AttributeSummaryViewConfig.IsGPSInfoRequired == true) {
                                Html += MyInstance.GetAttributePropertyHtml("Latitude", ControlInfo.Latitude);
                            }
                            if (ControlInfo.Longitude != "" && AttributeSummaryViewConfig.IsGPSInfoRequired == true) {
                                Html += MyInstance.GetAttributePropertyHtml("Longitude", ControlInfo.Longitude);
                            }
                            if (ControlInfo.Score != "" && AttributeSummaryViewConfig.IsScoreRequired == true) {
                                Html += MyInstance.GetAttributePropertyHtml("Score", ControlInfo.Score);
                            }
                            if (ControlInfo.Percentage != ""  && AttributeSummaryViewConfig.IsPercentageRequired == true) {
                                Html += MyInstance.GetAttributePropertyHtml("Percentage", ControlInfo.Percentage);
                            }
                            if (ControlInfo.Comments != ""  && AttributeSummaryViewConfig.IsCommentsRequired == true) {
                                Html += MyInstance.GetAttributePropertyHtml("Comments", ControlInfo.Comments);
                            }
                            if (ControlInfo.LastUpdatedDate != "" && AttributeSummaryViewConfig.IsLastUpdatedDateRequired == true) {
                                Html += MyInstance.GetAttributePropertyHtml("Last Updated Date", ControlInfo.LastUpdatedDate);
                            }
                            if (ControlInfo.MultiMediaSubElementsList != null && ControlInfo.MultiMediaSubElementsList.length > 0 && AttributeSummaryViewConfig.IsMultiMediaSubElementsRequired == true) {
                                Html += MyInstance.GetMultiMediaSubElementsHtml(ControlInfo.MultiMediaSubElementsList);
                            }
                            if (ControlInfo.MultiMediaBlobSubElementsList != null && ControlInfo.MultiMediaBlobSubElementsList.length > 0 && AttributeSummaryViewConfig.IsMultiMediaBlobSubElementsRequired == true) {
                                //not implemented
                            }

                            Html += '</div>';
                        }
                    }

                }
              
            }

            OneViewConsole.Debug("GetAttributeInfoHtml End", "DcPreviewUIComponent.GetAttributeInfoHtml");

            return Html;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DcPreviewUIComponent.GetAttributeInfoHtml", Excep);
        }
    }

    ////********GetNCInfoHtml********////
    this.GetNCInfoHtml = function (DcSummaryViewData) {
        try {
            OneViewConsole.Debug("GetNCInfoHtml Start", "DcPreviewUIComponent.GetNCInfoHtml");

            var Html = "";

            var NCInfo = DcSummaryViewData.NCInfo;
            if (NCInfo != null) {
                Html += '<div class="item item-divider">NC Summary</div>';
              
                Html += '<div class="item"> Total NC Count - ' + NCInfo.NCCount + '</div>';// MyInstance.GetAttributePropertyHtml("Total NC Count", NCInfo.NCCount);

                for (var i = 0; i < NCInfo.NCDetailsList.length ; i++) {
                    Html += '<div class="item">';

                    if (NCInfo.NCDetailsList.length > 1) {
                        Html += "NC " + (i +1);
                    }
                    var NCDetails = NCInfo.NCDetailsList[i];
                    Html += MyInstance.GetRuleDetailsHtml(NCDetails);

                    if (NCDetails.MultiMediaSubElementsList != null && NCDetails.MultiMediaSubElementsList.length > 0) {
                        Html += MyInstance.GetMultiMediaSubElementsHtml(NCDetails.MultiMediaSubElementsList);
                    }
                    if (NCDetails.MultiMediaBlobSubElementsList != null && NCDetails.MultiMediaBlobSubElementsList.length > 0) {
                        //not implemented
                    }

                    Html += '</div>';
                }
             
            }

            OneViewConsole.Debug("GetNCInfoHtml End", "DcPreviewUIComponent.GetNCInfoHtml");

            return Html;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DcPreviewUIComponent.GetNCInfoHtml", Excep);
        }
    }

    ////********GetObservationInfoHtml********////
    this.GetObservationInfoHtml = function (DcSummaryViewData) {
        try {
            OneViewConsole.Debug("GetObservationInfoHtml Start", "DcPreviewUIComponent.GetObservationInfoHtml");

            var Html = "";

            var ObservationInfo = DcSummaryViewData.ObservationInfo;
            if (ObservationInfo != null) {
                Html += '<div class="item item-divider">Observation Summary</div>';              
                Html += '<div class="item"> Total Observation Count - ' + ObservationInfo.ObservationCount + '</div>'; // MyInstance.GetAttributePropertyHtml("Total Observation Count", ObservationInfo.ObservationCount);

                for (var i = 0; i < ObservationInfo.ObservationDetailsList.length ; i++) {
                    Html += '<div class="item">';

                    if (ObservationInfo.ObservationDetailsList.length > 1) {
                        Html += "Observation " + (i + 1);
                    }
                    var ObservationDetails = ObservationInfo.ObservationDetailsList[i];
                    Html += MyInstance.GetRuleDetailsHtml(ObservationDetails);

                    if (ObservationDetails.MultiMediaSubElementsList != null && ObservationDetails.MultiMediaSubElementsList.length > 0) {
                        Html += MyInstance.GetMultiMediaSubElementsHtml(ObservationDetails.MultiMediaSubElementsList);
                    }
                    if (ObservationDetails.MultiMediaBlobSubElementsList != null && ObservationDetails.MultiMediaBlobSubElementsList.length > 0) {
                        //not implemented
                    }

                    Html += '</div>';
                }                
            }

            OneViewConsole.Debug("GetObservationInfoHtml End", "DcPreviewUIComponent.GetObservationInfoHtml");

            return Html;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DcPreviewUIComponent.GetObservationInfoHtml", Excep);
        }
    }

    ////********GetActionInfoHtml********////
    this.GetActionInfoHtml = function (DcSummaryViewData) {
        try {
            OneViewConsole.Debug("GetActionInfoHtml Start", "DcPreviewUIComponent.GetActionInfoHtml");

            var Html = "";

            var ActionInfo = DcSummaryViewData.ActionInfo;
            if (ActionInfo != null) {
                Html += '<div class="item item-divider">'+ xlatService.xlat('Action Summary') + '</div>';
             
                Html += '<div class="item">' +xlatService.xlat('Total Action Count -')  + ActionInfo.ActionCount + '</div>'; // MyInstance.GetAttributePropertyHtml("Total Action Count", ActionInfo.ActionCount);

                for (var i = 0; i < ActionInfo.ActionList.length ; i++) {
                    Html += '<div class="item">';
                    if (ActionInfo.ActionList.length > 1) {
                        Html += xlatService.xlat('Action') + " " + (i+1);
                    }
                    var ActionDetails = ActionInfo.ActionList[i];

                    Html += MyInstance.GetRuleDetailsHtml(ActionDetails);

                    if (ActionDetails.ActionComments != "") {
                        Html += MyInstance.GetAttributePropertyHtml(xlatService.xlat("Action Comments"), ActionDetails.ActionComments);
                    }
                    if (ActionDetails.IsPersonalObservation == "true") {
                       
                    }
                    //if (ActionDetails.ActionType != "") {
                    //    Html += MyInstance.GetAttributePropertyHtml("Action Type", ActionDetails.ActionType);
                    //}
                    if (ActionDetails.ActionDetailsName != "") {
                        Html += MyInstance.GetAttributePropertyHtml(xlatService.xlat("Action Details"), ActionDetails.ActionDetailsName);
                    }
                    if (ActionDetails.ActionDetailsComments != "") {
                        Html += MyInstance.GetAttributePropertyHtml(xlatService.xlat("Action Details Comments"), ActionDetails.ActionDetailsComments);
                    }

                    if (ActionDetails.ActionMultiMediaSubElementsList != null && ActionDetails.ActionMultiMediaSubElementsList.length > 0) {
                        Html += MyInstance.GetMultiMediaSubElementsHtml(ActionDetails.ActionMultiMediaSubElementsList);
                    }
                    if (ActionDetails.ActionMultiMediaBlobSubElementsList != null && ActionDetails.ActionMultiMediaBlobSubElementsList.length > 0) {
                        //not implemented
                    }

                    if (ActionDetails.ActionDetailsMultiMediaSubElementsList != null && ActionDetails.ActionDetailsMultiMediaSubElementsList.length > 0) {
                        Html += MyInstance.GetMultiMediaSubElementsHtml(ActionDetails.ActionDetailsMultiMediaSubElementsList);
                    }
                    if (ActionDetails.ActionDetailsMultiMediaBlobSubElementsList != null && ActionDetails.ActionDetailsMultiMediaBlobSubElementsList.length > 0) {
                        //not implemented
                    }
                    Html += '</div>';
                }
              
            }

            OneViewConsole.Debug("GetActionInfoHtml End", "DcPreviewUIComponent.GetActionInfoHtml");
           
            return Html;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DcPreviewUIComponent.GetActionInfoHtml", Excep);
        }
    }

    ////********GetBlockerInfoHtml********////
    this.GetBlockerInfoHtml = function (DcSummaryViewData) {
        try {
            OneViewConsole.Debug("GetBlockerInfoHtml Start", "DcPreviewUIComponent.GetBlockerInfoHtml");

            var Html = "";

            var BlockerInfo = DcSummaryViewData.BlockerInfo;
            if (BlockerInfo != null) {
                Html += '<div class="item item-divider">Blocker Summary</div>';
                Html += '<div class="item"> Total Blocker Count - ' + BlockerInfo.BlockerCount + '</div>'; // MyInstance.GetAttributePropertyHtml("Total Blocker Count", BlockerInfo.BlockerCount);
                Html += '<div class="item">';
                for (var i = 0; i < BlockerInfo.BlockerDetailsList.length ; i++) {            
                    if (BlockerInfo.BlockerDetailsList.length > 1) {
                        Html += "Blocker " + (i + 1);
                    }
                    var BlockerDetails = BlockerInfo.BlockerDetailsList[i];
                   
                    if (BlockerDetails.Name != "") {
                        Html += MyInstance.GetAttributePropertyHtml("Name", BlockerDetails.Name);
                    }                   
                }
                Html += '</div>';
            }

            OneViewConsole.Debug("GetBlockerInfoHtml End", "DcPreviewUIComponent.GetBlockerInfoHtml");

            return Html;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DcPreviewUIComponent.GetBlockerInfoHtml", Excep);
        }
    }


    ////********GetRuleDetailsHtml********////
    this.GetRuleDetailsHtml = function (RuleDetails) {
        try {
            OneViewConsole.Debug("GetNCInfoHtml Start", "DcPreviewUIComponent.GetNCInfoHtml");

            var Html = "";

            if (RuleDetails.RuleName != "") {
                Html += MyInstance.GetAttributePropertyHtml("Rule", RuleDetails.RuleName);
            }
            if (RuleDetails.RuleDescription != "") {
                Html += MyInstance.GetAttributePropertyHtml("Rule Description", RuleDetails.RuleDescription);
            }
            if (RuleDetails.Deviatedby != "") {
                Html += MyInstance.GetAttributePropertyHtml("Deviated by", RuleDetails.Deviatedby);
            }
            if (RuleDetails.ExpectedValue != "") {
                Html += MyInstance.GetAttributePropertyHtml("Expected Value", RuleDetails.ExpectedValue);
            }
            if (RuleDetails.ActualValue != "") {
                Html += MyInstance.GetAttributePropertyHtml("Actual Value", RuleDetails.ActualValue);
            }
            if (RuleDetails.Comments != "") {
                Html += MyInstance.GetAttributePropertyHtml("Comments", RuleDetails.Comments);
            }
            if (RuleDetails.LastUpdatedDate != "") {
                Html += MyInstance.GetAttributePropertyHtml("Last Updated Date", RuleDetails.LastUpdatedDate);
            }

            OneViewConsole.Debug("GetNCInfoHtml End", "DcPreviewUIComponent.GetNCInfoHtml");

            return Html;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DcPreviewUIComponent.GetNCInfoHtml", Excep);
        }
    }
    
    ////********GetAttributePropertyHtml********////
    this.GetAttributePropertyHtml = function (Name, Value) {
        try {
            OneViewConsole.Debug("GetAttributePropertyHtml Start", "DcPreviewUIComponent.GetAttributePropertyHtml");

            var Html = '<div class="row" style="border-bottom: 1px #F2F4F5 solid; font-size: 12px; margin: 10px 0px 0px 0px;">';
            Html += '<div class="col text-right" style="background: #F8FDFF;"> ' + Name + ' </div>';
            Html += '<div class="col">' + Value + '</div>';
            Html += '</div>';

            OneViewConsole.Debug("GetAttributePropertyHtml End", "DcPreviewUIComponent.GetAttributePropertyHtml");

            return Html;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DcPreviewUIComponent.GetAttributePropertyHtml", Excep);
        }
    }

    ////********GetMultiMediaSubElementsHtml********////
    this.GetMultiMediaSubElementsHtml = function (MultiMediaSubElementsList) {
        try {
            OneViewConsole.Debug("GetMultiMediaSubElementsHtml Start", "DcPreviewUIComponent.GetMultiMediaSubElementsHtml");
            
            var Html = ' <div class="row no-margin" style="border-bottom: 1px #F2F4F5 solid; font-size: 12px;">';
            Html += '<div class="col text-right" style="background: #F8FDFF;">Multimedia</div>';

            for (var i = 0; i < MultiMediaSubElementsList.length ; i++) {
                Html += ' <div class="col">';
               // Html += '<a href=' + MultiMediaSubElementsList[i].LocalURL + ' class="angularbox margin-right" title="Title goes here">';
                Html += '<img src=' + MultiMediaSubElementsList[i].LocalURL + ' style="width: 50px;" alt="No image">'//</a>';
                Html +='</div>';
            }

            Html += '</div>';

            OneViewConsole.Debug("GetMultiMediaSubElementsHtml End", "DcPreviewUIComponent.GetMultiMediaSubElementsHtml");
           
            return Html;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DcPreviewUIComponent.GetMultiMediaSubElementsHtml", Excep);
        }
    }

    

    ////********GetNCByAttributeId********////
    this.GetNCByAttributeId = function (AttributeId, DCNCMappingList) {
        try {
            OneViewConsole.Debug("GetNCByAttributeId Start", "DcPreviewUIComponent.GetNCByAttributeId");

            var DCPreviewAttributeSummaryData = {};
            var IsAnyAction = false;
            var TotalNCCount = 0;
            var TotalObservationCount = 0;
            var TotalActionCount = 0;
            var ActionClientGuidList = [];
            var CurrentAttributeDCNCMappingList = [];
            if (DCNCMappingList != null && DCNCMappingList != "" && DCNCMappingList.length > 0) {
                for (var i = 0 ; i < DCNCMappingList.length ; i++) {
                    var AnyAttrDCNCMapping = DCNCMappingList[i];                    
                    if (AnyAttrDCNCMapping.TemplateNodeIds.indexOf(AttributeId) != '-1') {
                        CurrentAttributeDCNCMappingList.push(AnyAttrDCNCMapping);
                        if (AnyAttrDCNCMapping.IsNC == 'true') {
                            TotalNCCount++;
                        }

                        else if (AnyAttrDCNCMapping.IsObservation == 'true') {
                            TotalObservationCount++;
                        }

                        if (AnyAttrDCNCMapping.ActionClientGuid != "") {
                            IsAnyAction = true;                           
                            ActionClientGuidList.push({ 'DCNCMappingId': AnyAttrDCNCMapping.Id, 'ClientGuid': AnyAttrDCNCMapping.ActionClientGuid });
                        }
                    }
                }



                if (CurrentAttributeDCNCMappingList.length > 0) {

                    var DCNCMappingMultiMediaSubElementsList = oActionDAO.GetMultiMediaSubElementsListByMappedEntityClientGuid(CurrentAttributeDCNCMappingList, DATEntityType.DCNCMapping);
                    var DCNCMappingMultiMediaBlobSubElementsList = oActionDAO.GetMultiMediaBlobSubElementsListByMappedEntityClientGuid(CurrentAttributeDCNCMappingList, DATEntityType.DCNCMapping);

                    if (ActionClientGuidList.length > 0) {

                        var ActionList = oActionDAO.GetActionListByClientGuids(ActionClientGuidList);
                        var ActionMultiMediaSubElementsList = oActionDAO.GetMultiMediaSubElementsListByMappedEntityClientGuid(ActionClientGuidList, DATEntityType.Action);
                        var ActionMultiMediaBlobSubElementsList = oActionDAO.GetMultiMediaBlobSubElementsListByMappedEntityClientGuid(ActionClientGuidList, DATEntityType.Action);

                        var ActionDetailsList = oActionDAO.GetActionDetailsListByActionClientGuids(ActionClientGuidList);

                        if (ActionDetailsList.length > 0) {

                            var ActionDetailsMultiMediaSubElementsList = oActionDAO.GetMultiMediaSubElementsListByMappedEntityClientGuid(ActionDetailsList, '23');
                            var ActionDetailsMultiMediaBlobSubElementsList = oActionDAO.GetMultiMediaBlobSubElementsListByMappedEntityClientGuid(ActionDetailsList, '23');

                            var PredefinedActionMasterIdList = [];
                            for (var i = 0 ; i < ActionDetailsList.length; i++) {
                                var ActionDetails = ActionDetailsList[i];
                                if (ActionDetails.PreDefinedActionId != 0) {
                                    PredefinedActionMasterIdList.push({ 'Id': ActionDetails.PreDefinedActionId });
                                }
                            }
                            var PredefinedActionMasterList = [];
                            if (PredefinedActionMasterIdList.length > 0) {
                                PredefinedActionMasterList = oActionDAO.GetPredefinedActionMasterListByServerIds(PredefinedActionMasterIdList);
                            }
                        }
                    }


                    /////////////////////////*******************Form response********************/////////////////////////

                    if (TotalNCCount > 0) {
                        DCPreviewAttributeSummaryData.NCInfo = {
                            'NCCount': TotalNCCount,
                            'NCDetailsList': []
                        };
                    }
                    if (TotalObservationCount > 0) {
                        DCPreviewAttributeSummaryData.ObservationInfo = {
                            "ObservationCount": TotalObservationCount,
                            "ObservationDetailsList": []
                        };

                    }

                    if (IsAnyAction == true) {
                        DCPreviewAttributeSummaryData.ActionInfo = {
                            "ActionCount": 0,
                            "ActionList": []
                        };
                    }





                    for (var i = 0 ; i < CurrentAttributeDCNCMappingList.length ; i++) {

                        var DCNCMapping = CurrentAttributeDCNCMappingList[i];
                        var RuleDetails = {
                            "RuleName": DCNCMapping.RuleName,
                            "RuleDescription": DCNCMapping.RuleDescription,
                            "RuleGroup": "",
                            "RuleCode": "",
                            "Deviatedby": DCNCMapping.Deviatedby,
                            "ExpectedValue": DCNCMapping.ExpectedValue,
                            "ActualValue": DCNCMapping.ActualValue,
                            "Comments": DCNCMapping.Comments,
                            "LastUpdatedDate": DCNCMapping.TimeStamp,

                        };



                        if (DCNCMappingMultiMediaSubElementsList != "" && DCNCMappingMultiMediaSubElementsList != null) {
                            RuleDetails.MultiMediaSubElementsList = [];
                            for (var j = 0; j < DCNCMappingMultiMediaSubElementsList.length ; j++) {
                                var DCNCMappingMultiMediaSubElements = DCNCMappingMultiMediaSubElementsList[j];
                                if (DCNCMapping.ClientGuid == DCNCMappingMultiMediaSubElements.MappedEntityClientGuid) {
                                    RuleDetails.MultiMediaSubElementsList.push({ "Id": DCNCMappingMultiMediaSubElements.Id, "LocalURL": DCNCMappingMultiMediaSubElements.LocalURL, "Comments": DCNCMappingMultiMediaSubElements.Comments })
                                }
                            }
                        }

                        if (DCNCMappingMultiMediaBlobSubElementsList != "" && DCNCMappingMultiMediaBlobSubElementsList != null) {
                            RuleDetails.MultiMediaBlobSubElementsList = [];
                            for (var j = 0; j < DCNCMappingMultiMediaBlobSubElementsList.length ; j++) {
                                var DCNCMappingMultiMediaBlobSubElements = DCNCMappingMultiMediaBlobSubElementsList[j];
                                if (DCNCMapping.ClientGuid == DCNCMappingMultiMediaBlobSubElements.MappedEntityClientGuid) {
                                    RuleDetails.MultiMediaBlobSubElementsList.push({ "Id": DCNCMappingMultiMediaBlobSubElements.Id, "DataURL": DCNCMappingMultiMediaBlobSubElements.DataURL, "Comments": DCNCMappingMultiMediaBlobSubElements.Comments })
                                }
                            }
                        }


                        if (DCNCMapping.IsNC == 'true') {                          
                            DCPreviewAttributeSummaryData.NCInfo.NCDetailsList.push(RuleDetails);                          
                        }

                        if (DCNCMapping.IsObservation == 'true') {
                            DCPreviewAttributeSummaryData.ObservationInfo.ObservationDetailsList.push(RuleDetails);
                        }

                        if (IsAnyAction == true) {
                            DCPreviewAttributeSummaryData.ActionInfo = { 'ActionCount': 0, ActionList: [] };
                        }

                        for (j = 0; j < ActionClientGuidList.length; j++) {
                            if (DCNCMapping.Id == ActionClientGuidList[j].DCNCMappingId) {
                                for (var k = 0 ; k < ActionList.length; k++) {
                                    if (ActionClientGuidList[j].ClientGuid == ActionList[k].ClientGuid) {
                                        RuleDetails.ActionId = ActionList[k].ClientGuid;
                                        RuleDetails.ActionComments = ActionList[k].Comments;

                                        if (ActionMultiMediaSubElementsList != "") {
                                            RuleDetails.ActionMultiMediaSubElementsList = [];
                                            for (var l = 0; l < ActionMultiMediaSubElementsList.length; l++) {
                                                var ActionMultiMediaSubElements = ActionMultiMediaSubElementsList[l];
                                                if (ActionClientGuidList[j].ClientGuid == ActionMultiMediaSubElements.MappedEntityClientGuid) {
                                                    RuleDetails.ActionMultiMediaSubElementsList.push({ "Id": ActionMultiMediaSubElements.Id, "LocalURL": ActionMultiMediaSubElements.LocalURL, "Comments": ActionMultiMediaSubElements.Comments })
                                                }
                                            }
                                        }

                                        if (ActionMultiMediaBlobSubElementsList != "") {                                         
                                            RuleDetails.ActionMultiMediaBlobSubElementsList = [];
                                            for (var l = 0; l < ActionMultiMediaBlobSubElementsList.length; l++) {
                                                var ActionMultiMediaBlobSubElements = ActionMultiMediaBlobSubElementsList[l];
                                                if (ActionClientGuidList[j].ClientGuid == ActionMultiMediaBlobSubElements.MappedEntityClientGuid) {
                                                    RuleDetails.ActionMultiMediaBlobSubElementsList.push({ "Id": ActionMultiMediaBlobSubElements.Id, "DataURL": ActionMultiMediaBlobSubElements.DataURL, "Comments": ActionMultiMediaBlobSubElements.Comments })
                                                }
                                            }
                                        }
                                    }
                                }

                                for (var k = 0 ; k < ActionDetailsList.length; k++) {
                                    var ActionDetails = ActionDetailsList[k];
                                    if (ActionClientGuidList[j].ClientGuid == ActionDetails.ActionClientGuid) {
                                        TotalActionCount++;
                                        RuleDetails.IsPersonalObservation = ActionDetails.IsPersonalObservation;
                                        var ActionType = "";
                                        var ActionDetailsName = "";
                                        if (ActionDetails.PreDefinedActionId != 0) {
                                            ActionType = "Predefined Action";

                                            for (var l = 0; l < PredefinedActionMasterList.length; l++) {
                                                if (PredefinedActionMasterList[l].ServerId == ActionDetails.PreDefinedActionId) {
                                                    ActionDetailsName = PredefinedActionMasterList[l].Name;
                                                    break;
                                                }
                                            }
                                        }
                                        else {
                                            ActionType = "Custom Action";
                                            ActionDetailsName = ActionDetails.CustomAction;
                                        }
                                        RuleDetails.ActionType = ActionType;
                                        RuleDetails.ActionDetailsName = ActionDetailsName;
                                        RuleDetails.ActionDetailsComments = ActionDetails.Comments;


                                        if (ActionDetailsMultiMediaSubElementsList != "") {
                                            RuleDetails.ActionDetailsMultiMediaSubElementsList = [];
                                            for (var l = 0; l < ActionDetailsMultiMediaSubElementsList.length; l++) {
                                                var ActionDetailsMultiMediaSubElements = ActionDetailsMultiMediaSubElementsList[l];
                                                if (ActionClientGuidList[j].ClientGuid == ActionDetailsMultiMediaSubElements.MappedEntityClientGuid) {
                                                    RuleDetails.ActionDetailsMultiMediaSubElementsList.push({ "Id": ActionDetailsMultiMediaSubElements.Id, "LocalURL": ActionDetailsMultiMediaSubElements.LocalURL, "Comments": ActionDetailsMultiMediaSubElements.Comments })
                                                }
                                            }
                                        }

                                        if (ActionDetailsMultiMediaSubElementsList != "") {
                                            RuleDetails.ActionDetailsMultiMediaBlobSubElementsList = [];
                                            for (var l = 0; l < ActionDetailsMultiMediaBlobSubElementsList.length; l++) {
                                                var ActionDetailsMultiMediaBlobSubElements = ActionDetailsMultiMediaBlobSubElementsList[l];
                                                if (ActionClientGuidList[j].ClientGuid == ActionDetailsMultiMediaBlobSubElements.MappedEntityClientGuid) {
                                                    RuleDetails.ActionDetailsMultiMediaBlobSubElementsList.push({ "Id": ActionDetailsMultiMediaBlobSubElements.Id, "DataURL": ActionDetailsMultiMediaBlobSubElements.DataURL, "Comments": ActionDetailsMultiMediaBlobSubElements.Comments })
                                                }
                                            }
                                        }
                                        DCPreviewAttributeSummaryData.ActionInfo.ActionList.push(JSON.parse(JSON.stringify(RuleDetails)));
                                    }
                                }
                            }
                        }
                        DCPreviewAttributeSummaryData.ActionInfo.ActionCount = TotalActionCount;
                        
                    }
                }
            }
            OneViewConsole.Debug("GetNCByAttributeId End", "DcPreviewUIComponent.GetNCByAttributeId");

           // alert('DCPreviewAttributeSummaryData : ' + JSON.stringify(DCPreviewAttributeSummaryData));
            return DCPreviewAttributeSummaryData;
        }

        catch (Excep) {
           // alert('GetNCByAttributeId exception : ' + Excep);
           // alert('GetNCByAttributeId exception : ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "DcPreviewUIComponent.GetNCByAttributeId", Excep);
        }
    }

    ////********GetAttributeWiseBlockerData********////
    this.GetAttributeWiseBlockerData = function (DrdsClientGuid) {
        try {
            OneViewConsole.Debug("GetAttributeWiseBlockerData Start", "DcPreviewUIComponent.GetAttributeWiseBlockerData");

            var BlockerInfo = null;
            var BlockerCount = 0;
            var DCBlockerDataCaptureClientGuidList = [];
            var _oDCBlockerInfoDAO = new DCBlockerInfoDAO();
            var BlockerDataList = _oDCBlockerInfoDAO.GetAttributeWiseBlockers(DcClientGuid, DrdsClientGuid);

            if (BlockerDataList != "" && BlockerDataList != null) {
                BlockerInfo = {
                    "BlockerCount": 0,
                    "BlockerDetailsList": []
                };
                for (var i = 0; i < BlockerDataList.length ; i++) {                  
                    BlockerCount++;
                    var BlockerData = BlockerDataList[i];
                    DCBlockerDataCaptureClientGuidList.push({ 'ClientGuid': BlockerData.DCBlockerDataCaptureClientGuid, 'Comments': BlockerData.Comments })
                }
                var _oDcDAO = new DcDAO();
                var BlockerDcList = _oDcDAO.GetDcListByClientGuids(DCBlockerDataCaptureClientGuidList);

                BlockerInfo.BlockerCount = BlockerCount;
                for (var i = 0; i < BlockerDcList.length ; i++) {
                    BlockerInfo.BlockerDetailsList.push({ 'Name': BlockerDcList[i].TemplateNodeName, 'DcPlaceName': BlockerDcList[i].DcPlaceName });
                }
            }                       

            OneViewConsole.Debug("GetAttributeWiseBlockerData End", "DcPreviewUIComponent.GetAttributeWiseBlockerData");

            return BlockerInfo;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DcPreviewUIComponent.GetAttributeWiseBlockerData", Excep);
        }
    }

    ////********GetMultiMediaSubElementsAnswerModeHtml********////
    this.GetMultiMediaSubElementsAnswerModeHtml = function (MultiMediaSubElementsList) {
        try {
            OneViewConsole.Debug("GetMultiMediaSubElementsAnswerModeHtml Start", "DcPreviewUIComponent.GetMultiMediaSubElementsAnswerModeHtml");

            var Html = "";
            if (MultiMediaSubElementsList.length > 0) {
                Html += "<div>";
                for (var i = 0; i < MultiMediaSubElementsList.length ; i++) {
                    // Html += '<a href=' + MultiMediaSubElementsList[i].LocalURL + ' class="angularbox margin-right" title="Title goes here">';
                    Html += '<img src=' + MultiMediaSubElementsList[i].LocalURL + ' style="width: 50px;" alt="No image">'//</a>';                
                }
                Html += "</div>";
            }
            OneViewConsole.Debug("GetMultiMediaSubElementsAnswerModeHtml End", "DcPreviewUIComponent.GetMultiMediaSubElementsAnswerModeHtml");

            return Html;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DcPreviewUIComponent.GetMultiMediaSubElementsAnswerModeHtml", Excep);
        }
    }


    ////********GetMultiMediaBlobSubElementsAnswerModeHtml********////
    this.GetMultiMediaBlobSubElementsAnswerModeHtml = function (MultiMediaSubElementsList) {
        try {
            OneViewConsole.Debug("GetMultiMediaBlobSubElementsAnswerModeHtml Start", "DcPreviewUIComponent.GetMultiMediaBlobSubElementsAnswerModeHtml");

            var Html = "";
            for (var i = 0; i < MultiMediaSubElementsList.length ; i++) {
                Html += '<input type="text" style="padding:20px;" value="Last Updated On : ' + MultiMediaSubElementsList[i].TimeStamp + '" disabled>';
            }

            OneViewConsole.Debug("GetMultiMediaBlobSubElementsAnswerModeHtml End", "DcPreviewUIComponent.GetMultiMediaBlobSubElementsAnswerModeHtml");

            return Html;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DcPreviewUIComponent.GetMultiMediaBlobSubElementsAnswerModeHtml", Excep);
        }
    }

    //Req : { 'DcPlaceId': DcPlaceId, 'DcPlaceDimension': DcPlaceDimension }
    this.LoadHtmlForDcLst = function (Req) {
        try {
            OneViewConsole.Debug("LoadHtmlForDcLst Start", "DcPreviewUIComponent.LoadHtmlForDcLst");
           
            var DcIdLstWithTemplateId = {};
            var DcIdLst = [];
            var DcClientGuidLst = [];
            var TemplateIdLst = [];

           
            var ServiceId = OneViewSessionStorage.Get("ServiceId");          
            var DcUserId = OneViewSessionStorage.Get("LoginUserId");
            ///*************Get List of DataCaptureId and ClientGuid************/
            for (var i = 0; i < DcOnDeviceApprovalInfoLst.length; i++) {
                var DcInfo = DcOnDeviceApprovalInfoLst[i].DcInfo;
                var DatacaptureId = DcInfo.Id;
                DcIdLst.push(DatacaptureId);
                DcClientGuidLst.push(DcInfo.ClientGuid);
                TemplateIdLst.push(DcInfo.TemplateNodeId);
            }
            //response.PageHeader = MyInstance.GetDcSummaryHtml(Req.DcId, Req.TemplateId);//                response.PageHeader = MyInstance.GetDcSummaryHtml({ 'DcId': Req.DcId, 'TemplateId': Req.TemplateId });
            MyInstance.GetDcPreviewMetadata(ServiceId, Req.DcPlaceId, Req.DcPlaceDimension, "0", DcUserId);
            var DcSummaryHtml = MyInstance.GetDcSummaryHtml({ 'DcId': DcIdLst, 'DcClientGuid': DcClientGuidLst, 'TemplateId': TemplateIdLst });
            
            MyInstance.AppendHtml('PageHeaderDivId', DcSummaryHtml);
           
            if (DcIdLst.length > 0) {
                var _oDcDAO = new DcDAO();
                var Result = _oDcDAO.GetDCResultByDCIdLstForLV(DcIdLst); ///*************Get all results for the list of datacapture Id*************/
                var AllDcResultDetails = {};

                for (var i = 0; i < Result.length; i++) {
                    ///*************Group DcResultdetails under DcId*************/
                    if (AllDcResultDetails[Result[i].DataCaptureId] == undefined) {
                        AllDcResultDetails[Result[i].DataCaptureId] = [];
                        AllDcResultDetails[Result[i].DataCaptureId].push(Result[i]);
                    }
                    else {
                        AllDcResultDetails[Result[i].DataCaptureId].push(Result[i]);
                    }
                }
                var Html = "";
                var IsSuccess = false;
                for (var DcId in AllDcResultDetails) {

                    var TemplateId = AllDcResultDetails[DcId][0].TemplateNodeId;
                    var DcClientGuid = AllDcResultDetails[DcId][0].DcClientGuid;
                    //var DcResultDetails = GetDCByDCId(AllDcResultDetails[DcId]);

                    var Request = { 'TemplateId': TemplateId, 'DcId': DcId, 'Result': AllDcResultDetails[DcId], 'DcClientGuid': DcClientGuid };
                    MyInstance.GetDcPreviewMetadata(ServiceId, Req.DcPlaceId, Req.DcPlaceDimension, TemplateId, DcUserId);
                    var response = MyInstance.GetHtml(Request);
                    if (response.IsSuccess == true) {                       
                        Html += response.Html;
                        IsSuccess = true;
                    }
                    //alert(Html);
                }
                if (IsSuccess == true) {
                    MyInstance.AppendHtml('ContentDivId', Html);
                }
            }
        

            OneViewConsole.Debug("LoadHtmlForDcLst End", "DcPreviewUIComponent.LoadHtmlForDcLst");
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DcPreviewUIComponent.LoadHtmlForDcLst", Excep);
        }
    }

    this.IsRequiredToHideUnansweredattribute = function (Req) {
        try {
            OneViewConsole.Debug("ViewButtonHandler start", "LandingPageFacade.ViewButtonHandler");
            var IsSuccess = false;

            var BusinessEventHandlerObjectKeys = "IsRequiredToHideUnansweredattributeForPreview";
            //var TemplateId = Req.TemplateId;

            var _BusinessEventEntityBO = new BusinessEventEntityBO();
            //   var ViewRecordHandlerObj = { RequiredBusinessEventHandlerObjectKeys: "ValidateImageExistForAction", TemplateId: "" };
            var ReqParameter = { ClassName: "HideUnansweredattributeFromPreviewComponent", MethodName: "IsRequiredToHideUnansweredattribute", RequiredBusinessEventHandlerObjectKeys: {}, IsTemplateValidationRequired: false, TemplateIdLst: "", };
            ReqParameter.RequiredBusinessEventHandlerObjectKeys[BusinessEventHandlerObjectKeys] = "";

            var _BusinessEventEntityBO = new BusinessEventEntityBO();
            var _IsBussinessEventExist = _BusinessEventEntityBO.IsBussinessEventExist(ReqParameter);

            if (_IsBussinessEventExist.BusinessEventHandlersObjectKeysDetails[BusinessEventHandlerObjectKeys] != undefined) {
                if (_IsBussinessEventExist.BusinessEventHandlersObjectKeysDetails[BusinessEventHandlerObjectKeys].IsSuccess == true) {
                    IsSuccess = true;
                }

            }

            OneViewConsole.Debug("ViewButtonHandler end", "LandingPageFacade.ViewButtonHandler");
            //alert("IsSuccess : " + IsSuccess);
            return IsSuccess;
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "LandingPageFacade.ViewButtonHandler", xlatService);
        }
    }
}



function DcBandAnswermodePreviewUIComponent() {

    var MyInstance = this;

    this.GetHtml = function (Question, Answer, Color) {
        try {
            OneViewConsole.Debug("GetHtml Start", "DcBandAnswermodePreviewUIComponent.GetHtml");
          //  alert(Question + "," + Answer + "," + Color);
            var Html = '<label class="item" style="border-width: 1px; "> ';
            Html += MyInstance.GetQuestionHtml(Question);
            Html += MyInstance.GetAnswerHtml(Answer, Color);
            Html += '</label> ';


            OneViewConsole.Debug("GetHtml End", "DcBandAnswermodePreviewUIComponent.GetHtml");
           // alert('GetHtml : ' + Html);
            return Html;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DcBandAnswermodePreviewUIComponent.GetHtml", Excep);
        }
    }

    this.GetQuestionHtml = function (Question) {
        try {
            OneViewConsole.Debug("GetHtml Start", "DcBandAnswermodePreviewUIComponent.GetHtml");

            // var Html = '<span class="input-label">' + Question + '</span> ';
            var Html = ' <div class="item item-button-right"><div class="field-item"><label><span> '+Question+'</span>';
            Html +='<input type="text" value="Answer" disabled>';
            Html +='</label>';                
            Html +=' </div>';
            Html += ' <a href="javascript:void(0)" onclick="ShowAttributeInfo()" class="button button-icon icon icon-bell padding" style="margin-top: 15px;"><div class="badge badge-energized" style="position: absolute; right: -6px;">23</div></a>';
            Html +='</div>';
           // alert('GetQuestionHtml : ' + Html);
            OneViewConsole.Debug("GetHtml End", "DcBandAnswermodePreviewUIComponent.GetHtml");
            
            return Html;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DcBandAnswermodePreviewUIComponent.GetHtml", Excep);
        }
    }

    this.GetAnswerHtml = function (Answer, Color) {
        try {
            OneViewConsole.Debug("GetHtml Start", "DcBandAnswermodePreviewUIComponent.GetHtml");
       
            var Style = "display: table;";
            Style += 'background-color:' + Color;
            Style += ';color:white';

          //  var Html = '<button class="button active rounded" style="' + Style + ';">' + Answer + '</button> ';
            var Html = '<button class="button active rounded margin-bottom" style="' + Style + ';">' + Answer + ' </button>';
           // alert('GetAnswerHtml : ' + Html);

            OneViewConsole.Debug("GetHtml End", "DcBandAnswermodePreviewUIComponent.GetHtml");

            return Html;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DcBandAnswermodePreviewUIComponent.GetHtml", Excep);
        }
    }

}

function DcOtherAnswermodePreviewUIComponent() {

    var MyInstance = this;

    this.GetHtml = function (Question, Answer) {
        try {
            OneViewConsole.Debug("GetHtml Start", "DcOtherAnswermodePreviewUIComponent.GetHtml");

            var Html = '<label class="item">';
            Html += MyInstance.GetQuestionHtml(Question);
            Html += MyInstance.GetAnswerHtml(Answer);
            Html += '</label>';

            OneViewConsole.Debug("GetHtml End", "DcOtherAnswermodePreviewUIComponent.GetHtml");

            //alert('GetHtml : ' + Html);

            return Html;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DcOtherAnswermodePreviewUIComponent.GetHtml", Excep);
        }
    }

    this.GetQuestionHtml = function (Question) {
        try {
            OneViewConsole.Debug("GetHtml Start", "DcOtherAnswermodePreviewUIComponent.GetHtml");

            var Html = '<span class="input-label">' + Question + '</span> ';

            OneViewConsole.Debug("GetHtml End", "DcOtherAnswermodePreviewUIComponent.GetHtml");
           // alert('GetQuestionHtml : ' + Html);
            return Html;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DcOtherAnswermodePreviewUIComponent.GetHtml", Excep);
        }
    }

    this.GetAnswerHtml = function (Answer) {
        try {
            OneViewConsole.Debug("GetHtml Start", "DcOtherAnswermodePreviewUIComponent.GetHtml");

            var Html = '<input type="text" style="padding:20px;" value="' + Answer + '" disabled>';

            OneViewConsole.Debug("GetHtml End", "DcOtherAnswermodePreviewUIComponent.GetHtml");
           // alert('GetAnswerHtml : ' + Html);
            return Html;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DcOtherAnswermodePreviewUIComponent.GetHtml", Excep);
        }
    }

    this.GetMultiSelectAnswerHtml = function (Answer, Color) {
        try {
            OneViewConsole.Debug("GetMultiSelectAnswerHtml Start", "DcOtherAnswermodePreviewUIComponent.GetMultiSelectAnswerHtml");

            var Html = ' <span class="input-label" style="color:' + Color + ';">' + Answer + '</span>';

            OneViewConsole.Debug("GetMultiSelectAnswerHtml End", "DcOtherAnswermodePreviewUIComponent.GetMultiSelectAnswerHtml");

            return Html;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DcOtherAnswermodePreviewUIComponent.GetHtml", Excep);
        }
    }

}

function DcHeaderFooterPreviewUIComponent() {

    var MyInstance = this;

    this.GetAGHeaderHtml = function (DisplayHeaderName) {
        try {
            OneViewConsole.Debug("GetAGHeaderHtml Start", "DcHeaderFooterPreviewUIComponent.GetAGHeaderHtml");

            var Html = '<div class="title-bar rounded margin-top">' + DisplayHeaderName + '</div>';

            OneViewConsole.Debug("GetAGHeaderHtml End", "DcHeaderFooterPreviewUIComponent.GetAGHeaderHtml");
           // alert('GetAGHeaderHtml Html : ' + Html);
            return Html;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DcHeaderFooterPreviewUIComponent.GetAGHeaderHtml", Excep);
        }
    }

    this.GetPageHeaderHtml = function (PageHeaderName) {
        try {
            OneViewConsole.Debug("GetPageHeaderHtml Start", "DcHeaderFooterPreviewUIComponent.GetPageHeaderHtml");

            var Html = '<div class="bar sub-header item-input-inset no-padding">'+
                          '<a href="javascript:void(0)" class="button button-clear" onclick=""><i class="icon icon-chevron-left"></i>Back</a>'+
                          '<label class="item-input-wrapper">'+
                          '</label>'+
                          '<div class="margin-right">' + PageHeaderName + '</div>' +
                        '</div>';

            OneViewConsole.Debug("GetPageHeaderHtml End", "DcHeaderFooterPreviewUIComponent.GetPageHeaderHtml");

            return Html;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DcHeaderFooterPreviewUIComponent.GetPageHeaderHtml", Excep);
        }
    }
}


