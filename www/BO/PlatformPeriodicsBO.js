//PlatformPeriodicsBO

function PlatformPeriodicsBO() {

    // Current Scope
    var MyInstance = this;


    /// <summary>
    /// Get


    //
    //return {
    //    Occurrence: 10,
    //    ReccurenceId: 1,
    //    OverAllCompletedDCCount: 9,
    //    OverAllInProgressDCCount: 0,

    //    PeriodTypeName:'Daily ',
    //    PeriodTypeStartDate:'13/10/2016 22:12:22',
    //    PeriodTypeEndDate:'13/10/2016 22:12:22',

    //    LastDCInfo: {
    //        DCResultDetailId_YNBand: 0,
    //        DCResultDetailId_Time: 0,
    //        DCResultDetailId_Reason: 0,
    //        DataCaptureId: 0,
    //        DCResultId: 0,

    //        TaskAttributeId: 1,
    //        BandControlAnswer: '',
    //        BandControlValue: '',
    //        Time: '',
    //        Reason: ''
    //    }
    // };
    /// </summary>
    /// <param name="Req">Req</param> 
    /// <returns>Response</returns>  
    this.Get = function (Req) {

        try {
            OneViewConsole.Debug("GetProfileDetails start", "DcProfileDAO.GetProfileDetails");

            var Response = {
                ReccurenceId: 0,
                Occurrence: 0,
                OverAllCompletedDCCount: 0,
                OverAllInProgressDCCount: 0,
                OverAllApprovedDCCount: 0,
                DcProfileServerId: 0,
                PeriodTypeName: '',
                PeriodTypeStartDate: '',
                PeriodTypeEndDate: '',
                LastDCInfo: null
            }

            var _oDcProfileDAO = new DcProfileDAO();

            var _DateTime = new DateTime();
            var currentDateTime = _DateTime.GetDateAndTime();
            Req.StartDate = currentDateTime;
            Req.EndDate = currentDateTime;

            var Result = _oDcProfileDAO.GetDcScheduleDetails(Req);


            //if (Req.TemplateNodeId == 604)
            //alert('Result : ' + JSON.stringify(Result));

            if (Result.length > 0) {

                Response.Occurrence = Result[0].Occurence;
                Response.ReccurenceId = Result[0].ReccurenceId;
                Response.DcProfileServerId = Result[0].DcProfileServerId;
                var TotalDcCount = 0;
                var ServerIds = null;

                var CurrentPeriod = [];

                //******** Recurrence validation exclude sunday kind of use cases
                //TODO : Code make it neat 
                if (Result[0].ReccurenceId > 0) {

                    var StartDate = _DateTime.ConvertDateTimeToInteger(Req.StartDate);
                    var EndDate = _DateTime.ConvertDateTimeToInteger(Req.EndDate);

                    //ProfileValidityResponse.IsProfileValid = MyInstance.GetCurrentPeriod({ PeriodTypeServerId: Result[0].ReccurenceId, StartDate: StartDate, EndDate: EndDate });
                    CurrentPeriod = _oDcProfileDAO.GetCurrentPeriod({ PeriodTypeServerId: Result[0].ReccurenceId, StartDate: StartDate, EndDate: EndDate });


                    if (CurrentPeriod.length == 0) {
                        return null;
                    }
                }


                Req["DcProfileServerId"] = Result[0].DcProfileServerId;
                if (Response.Occurrence > 0) {

                    var _oDcProfileSyncStatusDetails = GetDcProfileSyncStatusDetails(Req);

                    //if (Req.TemplateNodeId == 604)
                    //    alert('_oDcProfileSyncStatusDetails' + JSON.stringify(_oDcProfileSyncStatusDetails));

                    if (_oDcProfileSyncStatusDetails.ServerIds.length > 0) {
                        ServerIds = _oDcProfileSyncStatusDetails.ServerIds;
                        Response.OverAllCompletedDCCount = _oDcProfileSyncStatusDetails.OverAllCompletedDCCount;
                        Response.OverAllInProgressDCCount = _oDcProfileSyncStatusDetails.OverAllInProgressDCCount;
                        //Response.OverAllApprovedDCCount = _oDcProfileSyncStatusDetails.OverAllApprovedDCCount;
                    }

                    if (Result[0].ReccurenceId > 0) {

                        //var StartDate = _DateTime.ConvertDateTimeToInteger(Req.StartDate);
                        //var EndDate = _DateTime.ConvertDateTimeToInteger(Req.EndDate);

                        ////ProfileValidityResponse.IsProfileValid = MyInstance.GetCurrentPeriod({ PeriodTypeServerId: Result[0].ReccurenceId, StartDate: StartDate, EndDate: EndDate });
                        //var CurrentPeriod = _oDcProfileDAO.GetCurrentPeriod({ PeriodTypeServerId: Result[0].ReccurenceId, StartDate: StartDate, EndDate: EndDate });


                        //if (Req.TemplateNodeId == 604)
                        //    alert('CurrentPeriod' + JSON.stringify(CurrentPeriod));

                        //needed only for Task page loading time
                        if (Req.IsLastDcLstNeeded != undefined && Req.IsLastDcLstNeeded == true && CurrentPeriod.length > 0) {

                            Response.PeriodTypeName = _oDcProfileDAO.GetPeriodTypeNameById(Result[0].ReccurenceId);
                            Response.PeriodTypeStartDate = CurrentPeriod[0].StartDate;
                            Response.PeriodTypeEndDate = CurrentPeriod[0].EndDate;

                            Req.StartDate = CurrentPeriod[0].StartDate;
                            Req.EndDate = CurrentPeriod[0].EndDate;

                        }

                        if (CurrentPeriod.length > 0) {
                            Req.StartDate = CurrentPeriod[0].StartDate;
                            Req.EndDate = CurrentPeriod[0].EndDate;

                        }

                    }
                    else {
                        Req.StartDate = Result[0].StartDate;
                        Req.EndDate = Result[0].EndDate;
                    }

                }
                else {
                    Req.StartDate = Result[0].StartDate;
                    Req.EndDate = Result[0].EndDate;

                    Response.PeriodTypeStartDate = Result[0].StartDate;
                    Response.PeriodTypeEndDate = Result[0].EndDate;
                }

                if (ServerIds != null) {
                    Req["ServerIds"] = ServerIds;
                }
                Req["IsSubmit"] = "-1";
                var DcResult = _oDcProfileDAO.GetDcDetailsByServiceUserIdTemplatePlaceIDAndDate(Req);

                //if (Req.TemplateNodeId == 604)
                //   alert('DcResult ' + JSON.stringify(DcResult));

                if (DcResult.length > 0) {

                    for (var i = 0; i < DcResult.length ; i++) {

                        if (DcResult[i].IsCompleted == "true") {
                            Response.OverAllCompletedDCCount = parseInt(Response.OverAllCompletedDCCount + 1);
                        }
                        else {
                            Response.OverAllInProgressDCCount = parseInt(Response.OverAllInProgressDCCount + 1);
                        }
                        if (DcResult[i].IsSubmit == "true") {
                            Response.OverAllApprovedDCCount = parseInt(Response.OverAllApprovedDCCount + 1);
                        }
                    }
                }

                if (Req.IsLastDcLstNeeded != undefined && Req.IsLastDcLstNeeded == true) {

                    var LastDcLst = _oDcProfileDAO.GetAllLastCreatedDcIdByUserIdTemplatePlaceIdAndDate(Req);

                    //if (Req.TemplateNodeId == 604)
                    //    alert('LastDcLst ' + JSON.stringify(LastDcLst));

                    if (LastDcLst.length > 0) {
                        var LastDcId = LastDcLst[0].DcId;
                        var LastClientGuid = LastDcLst[0].ClientGuid;
                        //alert('LastDcLst[0] : ' + JSON.stringify(LastDcLst[0]));
                        Response.LastDCInfo = GetLastDcStatus({ DcId: LastDcId, DataCaptureClientGuid: LastClientGuid, DcRId: LastDcLst[0].DcRId, IsCompleted: LastDcLst[0].IsCompleted, IsSubmit: LastDcLst[0].IsSubmit, 'IsOnDeviceApprovalFinished': LastDcLst[0].IsOnDeviceApprovalFinished });

                        // }
                    }
                }


            }
            //alert("Response : " + JSON.stringify(Response));

            OneViewConsole.Debug("ExpressBO end", "ExpressBO.Get");

            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ExpressBO.Get", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    var GetDcProfileSyncStatusDetails = function (Req) {
        try {
            OneViewConsole.Debug("GetDcProfileSyncStatusDetails Start", "ExpressBO.GetDcProfileSyncStatusDetails");
            var _oDcProfileDAO = new DcProfileDAO();
            //ServerIds : completed DC Counts
            var Response = { ServerIds: [], InProgressServerIds: [], ApprovedServerIds: [], OverAllCompletedDCCount: 0, OverAllInProgressDCCount: 0, OverAllApprovedDCCount: 0 };

            var _oDcProfileSyncStatusResult = _oDcProfileDAO.GetDcProfileSyncStatus(Req);

            if (_oDcProfileSyncStatusResult.length > 0) {

                if (_oDcProfileSyncStatusResult[0]["InprogressServerIds"] != "") {
                    var InprogressServerIds = _oDcProfileSyncStatusResult[0]["InprogressServerIds"];
                    //InprogressServerIds = (InprogressServerIds.length && InprogressServerIds[0] == ',') ? InprogressServerIds.slice(1) : InprogressServerIds;
                    //Response.InProgressServerIds.push(InprogressServerIds);

                    var InprogressServerIdsArray = InprogressServerIds.split(",");
                    for (var inprg = 1; inprg < InprogressServerIdsArray.length; inprg++) {
                        Response.InProgressServerIds.push(parseInt(InprogressServerIdsArray[inprg]));
                    }
                }
                if (_oDcProfileSyncStatusResult[0]["CompletedServerIds"] != "") {
                    var CompletedServerIds = _oDcProfileSyncStatusResult[0]["CompletedServerIds"];
                    //CompletedServerIds = (CompletedServerIds.length && CompletedServerIds[0] == ',') ? CompletedServerIds.slice(1) : CompletedServerIds;
                    //Response.ServerIds.push(CompletedServerIds);

                    var CompletedServerIdsArray = CompletedServerIds.split(",");
                    for (var Cmpltd = 1; Cmpltd < CompletedServerIdsArray.length; Cmpltd++) {
                        Response.ServerIds.push(parseInt(CompletedServerIdsArray[Cmpltd]));
                    }
                }
                
                if (_oDcProfileSyncStatusResult[0]["ApprovedServerIds"] != "") {
                    var ApprovedServerIds = _oDcProfileSyncStatusResult[0]["ApprovedServerIds"];

                    var ApprovedServerIdsArray = ApprovedServerIds.split(",");
                    for (var Apprvd = 1; Apprvd < ApprovedServerIdsArray.length; Apprvd++) {
                        Response.ApprovedServerIds.push(parseInt(ApprovedServerIdsArray[Apprvd]));
                    }
                }
                

                Response.OverAllCompletedDCCount = _oDcProfileSyncStatusResult[0]["CompletedCount"];
                Response.OverAllInProgressDCCount = _oDcProfileSyncStatusResult[0]["InprogressCount"];
                Response.OverAllApprovedDCCount = _oDcProfileSyncStatusResult[0]["ApprovedCount"];
            }

            OneViewConsole.Debug("GetDcProfileSyncStatusDetails Start", "ExpressBO.GetDcProfileSyncStatusDetails");
            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ExpressBO.GetDcProfileSyncStatusDetails", Excep);
        }
    }

    var GetLastDcStatus = function (Req) {
        try {
            OneViewConsole.Debug("GetLastDcStatus Start", "LVDataCaptureBO.GetLastDcStatus");

            var Response = {
                DataCaptureId: '',
                DataCaptureClientGuid: '',
                DCResultId: '',
                DCResultDetailId_YNBand: '',
                DCResultDetailId_Time: '',
                DCResultDetailId_Reason: '',

                TaskAttributeId: 0,
                BandControlAnswer: '',
                BandControlValue: '',
                Time: '',
                Reason: '',
                IsCompleted: '',
                IsSubmit: '',
                IsOnDeviceApprovalFinished : '',
                AttributeDCResultDetails: {}

            };
            //IsCompleted: 'false',
            //IsSubmit: 'false'
            var _oDcDAO = new DcDAO();
            var Result = _oDcDAO.GetDCResultDetailsByDCIdForLV(Req.DcId);


            var DcResultDetails = GetDCByDCId(Result);

            for (var i = 0; i < DcResultDetails.length; i++) {
                var oAttribute = DcResultDetails[i];

                Response.TaskAttributeId = DcResultDetails[i].AttributeNodeId;
                Response.DataCaptureId = Req.DcId;
                Response.DataCaptureClientGuid = Req.DataCaptureClientGuid;
                Response.DCResultId = Req.DcRId;
                Response.IsCompleted = Req.IsCompleted;
                Response.IsSubmit = Req.IsSubmit;
                Response.IsOnDeviceApprovalFinished = Req.IsOnDeviceApprovalFinished;

                var AttributeId = DcResultDetails[i].AttributeNodeId;


                for (var j = 0; j < oAttribute.Controls.length; j++) {

                    var oControl = oAttribute.Controls[j];
                    var oFinalAnswer = GetLastUpdatedAnswer(oControl.Answers);
                    var ControlId = oFinalAnswer.ControlId;
                    /*if (oFinalAnswer.ControlId.indexOf("BandControlId_") != "-1") {
                        Response.DCResultDetailId_YNBand = oFinalAnswer.ClientId;
                        Response.BandControlAnswer = oFinalAnswer.Answer;
                        Response.BandControlValue = oFinalAnswer.AnswerValue;
                        Response.IsNA = (oFinalAnswer.IsNA == 'true' ? true : false);
                    }
                    else if (oFinalAnswer.ControlId.indexOf("TIMEControlId_") != "-1") {
                        Response.DCResultDetailId_Time = oFinalAnswer.ClientId;
                        Response.Time = oFinalAnswer.Answer;
                    }
                    else if (oFinalAnswer.ControlId.indexOf("ReasonControlId_") != "-1") {
                        Response.DCResultDetailId_Reason = oFinalAnswer.ClientId;
                        Response.Reason = oFinalAnswer.Answer;
                    }*/

                    Response.IsNA = (oFinalAnswer.IsNA == 'true' ? true : false);
                    if (Response.AttributeDCResultDetails[AttributeId] == undefined) {
                        Response.AttributeDCResultDetails[AttributeId] = {};
                        Response.AttributeDCResultDetails[AttributeId][ControlId] = [{ 'DCResultDetailId': oFinalAnswer.ClientId, 'DCResultDetailClientGuid': oFinalAnswer.ClientGuid, ControlId: oFinalAnswer.ControlId, Answer: oFinalAnswer.Answer, AnswerValue: oFinalAnswer.AnswerValue }];
                    }
                    else {
                        if (Response.AttributeDCResultDetails[AttributeId][ControlId] == undefined) {
                            Response.AttributeDCResultDetails[AttributeId][ControlId] = [{ 'DCResultDetailId': oFinalAnswer.ClientId, 'DCResultDetailClientGuid': oFinalAnswer.ClientGuid, ControlId: oFinalAnswer.ControlId, Answer: oFinalAnswer.Answer, AnswerValue: oFinalAnswer.AnswerValue }];
                        }
                        else {
                            Response.AttributeDCResultDetails[AttributeId][ControlId].push({ 'DCResultDetailId': oFinalAnswer.ClientId, 'DCResultDetailClientGuid': oFinalAnswer.ClientGuid, ControlId: oFinalAnswer.ControlId, Answer: oFinalAnswer.Answer, AnswerValue: oFinalAnswer.AnswerValue });
                        }
                    }

                }

            }

            //alert(JSON.stringify(Response));

            OneViewConsole.Debug("GetLastDcStatus Start", "LVDataCaptureBO.GetLastDcStatus");

            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcSummaryBO.GetLastDcStatus", Excep);
        }
    }

    var GetLastUpdatedAnswer = function (AnswerLst) {
        try {
            OneViewConsole.Debug("GetLastUpdatedAnswer Start", "ExpressBO.GetLastUpdatedAnswer");

            var AnswerObj = AnswerLst[0];

            var _DateTime = new DateTime();
            var LastUpdatedDate = _DateTime.GetDateByString(AnswerLst[0].LastUpdatedDate);

            if (AnswerLst.length > 1) {
                for (var i = 0; i < AnswerLst.length; i++) {
                    if (LastUpdatedDate < _DateTime.GetDateByString(AnswerLst[i].LastUpdatedDate)) {
                        LastUpdatedDate = _DateTime.GetDateByString(AnswerLst[i].LastUpdatedDate);
                        AnswerObj = AnswerLst[i];
                    }
                }
            }

            OneViewConsole.Debug("GetLastUpdatedAnswer End", "ExpressBO.GetLastUpdatedAnswer");

            return AnswerObj;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ExpressBO.GetLastUpdatedAnswer", Excep);
        }
        finally {
            AnswerObj = null;
            LastUpdatedDate = null;
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


    this.GetByTemplateGroup = function (Req) {

        try {
            OneViewConsole.Debug("GetByTemplateGroup start", "ExpressBO.GetByTemplateGroup");

            var TemplateGroup = Req.TemplateNodeId;
            var TemplateGroupType = Req.TemplateGroupType;
            var Response = {
                Occurrence: 0,
                OverAllCompletedDCCount: 0,
                OverAllInProgressDCCount: 0,
                OverAllApprovedDCCount: 0,
                TemplateInfo: {}
            };

            var _oDcDAO = new DcDAO();
            var TemplateLst = _oDcDAO.GetDcTemplateIdsByTemplateGroupAndAttributeGroupType(TemplateGroup, TemplateGroupType);
            Req.TemplateNodeId = TemplateLst;
            Req["IsSubmit"] = "-1";
            var _DateTime = new DateTime();
            var currentDateTime = _DateTime.GetDateAndTime();
            Req.StartDate = currentDateTime;
            Req.EndDate = currentDateTime;

            var ByTemplateLstResult = GetByTemplateLst(Req, TemplateGroup, TemplateGroupType);

            var CopyByTemplateLstResult = clone(ByTemplateLstResult);

            for (var itr in ByTemplateLstResult.TemplateInfo) {
                if (ByTemplateLstResult.TemplateInfo[itr].Occurrence == 0) {
                    delete CopyByTemplateLstResult.TemplateInfo[itr];
                }
            }

            /*
            for (var i = 0; i < TemplateLst.length; i++) {
                Req.TemplateNodeId = TemplateLst[i].Id;
                var Result = MyInstance.Get(Req);

                if (Result != null) {
                    Response.Occurence += parseInt(Result.Occurrence);

                    Response.OverAllCompletedDCCount += parseInt(Result.OverAllCompletedDCCount);

                    Response.OverAllInProgressDCCount += parseInt(Result.OverAllInProgressDCCount);

                    Response.TemplateInfo[TemplateLst[i].Id] = Result;
                }
            }

            alert("Response : " + JSON.stringify(Response));       
            */

            //alert("CopyByTemplateLstResult : " + JSON.stringify(CopyByTemplateLstResult));
            return CopyByTemplateLstResult;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ExpressBO.GetByTemplateGroup", Excep);
        }
        finally {
            Response = null;
        }
    }

    var GetByTemplateLst = function (Req, TemplateGroup, TemplateGroupType) {
        try {

            OneViewConsole.Debug("GetByTemplateLst Start", "ExpressBO.GetByTemplateLst");

            var Response = {
                Occurrence: 0,
                OverAllCompletedDCCount: 0,
                OverAllInProgressDCCount: 0,
                OverAllApprovedDCCount: 0,
                TemplateInfo: {}
            };


            var _oDcProfileDAO = new DcProfileDAO();

            var DcScheduleLst = _oDcProfileDAO.GetDcScheduleDetailsByTemplateIdLst(Req);
            var DcResultList = _oDcProfileDAO.GetDcDetailsByServiceUserIdPlaceIdDateAndTemplateLst(Req);
            var PeriodEntityLst = _oDcProfileDAO.GetAllCurrentPeriod(Req);
            //var PeriodEntityLst = _oDcProfileDAO.GetAllCurrentPeriod(Req);

            var _oDcDAO = new DcDAO();
            var DcTemplateChildResult = _oDcDAO.GetDcTemplateIdsByTemplateGroupAndAttributeGroupType(TemplateGroup, "-1");

            Response.TemplateInfo = GetAttributeGroupWiseCount(TemplateGroup, TemplateGroupType);


            for (var i = 0; i < DcScheduleLst.length; i++) {
                Req["DcProfileServerId"] = DcScheduleLst[i].DcProfileServerId;

                //Response.Occurrence += parseInt(DcScheduleLst[i].Occurence);

                var PeriodStartDateToInteger = null;
                var PeriodEndDateToInteger = null;
                var PeriodTypeName = null;
                var PeriodTypeStartDate = null;
                var PeriodTypeEndDate = null;

                var _DateTime = new DateTime();




                var ScheduleSearchKey = Req.UserId + "_" + DcScheduleLst[i].TemplateNodeId + "_" + Req.PlaceId + "_" + Req.DcPlaceDimension;

                for (var p = 0; p < PeriodEntityLst.length; p++) {

                    if (PeriodEntityLst[p].PeriodTypeServerId == DcScheduleLst[i].ReccurenceId) {
                        PeriodStartDateToInteger = PeriodEntityLst[p].SD;
                        PeriodEndDateToInteger = PeriodEntityLst[p].ED;
                        PeriodTypeName = PeriodEntityLst[p].Name;
                        PeriodTypeStartDate = PeriodEntityLst[p].StartDate;
                        PeriodTypeEndDate = PeriodEntityLst[p].EndDate;
                        Req.StartDate = PeriodEntityLst[p].StartDate;;
                        Req.EndDate = PeriodEntityLst[p].EndDate;

                        break;
                    }
                }


                if (PeriodStartDateToInteger != null && PeriodEndDateToInteger != null) {
                    Response.Occurrence += parseInt(DcScheduleLst[i].Occurence);
                    Req.TemplateNodeId = DcScheduleLst[i].TemplateNodeId;

                    var IsDcResultExist = false;


                    var Request = { Req: Req, DcResultList: DcResultList, ScheduleSearchKey: ScheduleSearchKey, PeriodStartDateToInteger: PeriodStartDateToInteger, PeriodEndDateToInteger: PeriodEndDateToInteger };
                    var DcResultResponse = GetDcResultCount(Request);

                    Response.OverAllCompletedDCCount += parseInt(DcResultResponse.OverAllCompletedDCCount);
                    Response.OverAllInProgressDCCount += parseInt(DcResultResponse.OverAllInProgressDCCount);
                    Response.OverAllApprovedDCCount += parseInt(DcResultResponse.OverAllApprovedDCCount);

                    for (var itrTemplateInfo in Response.TemplateInfo) {

                        if (Response.TemplateInfo[itrTemplateInfo].TemplateIds.indexOf(DcScheduleLst[i].TemplateNodeId) != -1) {

                            Response.TemplateInfo[itrTemplateInfo].Occurrence += parseInt(DcScheduleLst[i].Occurence);
                            Response.TemplateInfo[itrTemplateInfo].OverAllCompletedDCCount += parseInt(DcResultResponse.OverAllCompletedDCCount);
                            Response.TemplateInfo[itrTemplateInfo].OverAllInProgressDCCount += parseInt(DcResultResponse.OverAllInProgressDCCount);
                            Response.TemplateInfo[itrTemplateInfo].OverAllApprovedDCCount += parseInt(DcResultResponse.OverAllApprovedDCCount);

                        }
                    }
                    if (Response.TemplateInfo[DcScheduleLst[i].TemplateNodeId] != undefined) {

                        Response.TemplateInfo[DcScheduleLst[i].TemplateNodeId].PeriodTypeName = PeriodTypeName;
                        Response.TemplateInfo[DcScheduleLst[i].TemplateNodeId].PeriodTypeStartDate = PeriodTypeStartDate;
                        Response.TemplateInfo[DcScheduleLst[i].TemplateNodeId].PeriodTypeEndDate = PeriodTypeEndDate;
                        Response.TemplateInfo[DcScheduleLst[i].TemplateNodeId].ReccurenceId = DcScheduleLst[i].ReccurenceId;
                        Response.TemplateInfo[DcScheduleLst[i].TemplateNodeId].Occurrence += parseInt(DcScheduleLst[i].Occurence);
                        Response.TemplateInfo[DcScheduleLst[i].TemplateNodeId].OverAllCompletedDCCount += parseInt(DcResultResponse.OverAllCompletedDCCount);
                        Response.TemplateInfo[DcScheduleLst[i].TemplateNodeId].OverAllInProgressDCCount += parseInt(DcResultResponse.OverAllInProgressDCCount);
                        Response.TemplateInfo[DcScheduleLst[i].TemplateNodeId].OverAllApprovedDCCount += parseInt(DcResultResponse.OverAllApprovedDCCount);


                    }

                }

            }

            return Response;

            OneViewConsole.Debug("GetByTemplateLst End", "ExpressBO.GetByTemplateLst");
        }
        catch (Excep) {
            // alert("GetByTemplateLst : " + ex + "..." + JSON.stringify(ex));
            throw oOneViewExceptionHandler.Create("DAO", "ExpressBO.GetByTemplateLst", Excep);
        }
    }

    var GetAttributeGroupWiseCount = function (TemplateGroup, TemplateGroupType) {
        try {
            OneViewConsole.Debug("GetAttributeGroupWiseCount Start", "ExpressBO.GetAttributeGroupWiseCount");

            var Response = {};


            var _oDcDAO = new DcDAO();
            var DcTemplateChildResult = _oDcDAO.GetDcTemplateIdsByTemplateGroupAndAttributeGroupType(TemplateGroup, "-1");

            for (var i = 0; i < DcTemplateChildResult.length; i++) {
                Response[DcTemplateChildResult[i].TemplateNodeId] = {
                    ReccurenceId: 0,
                    Occurrence: 0,
                    OverAllCompletedDCCount: 0,
                    OverAllInProgressDCCount: 0,
                    OverAllApprovedDCCount: 0,
                    DcProfileServerId: 0,
                    PeriodTypeName: '',
                    PeriodTypeStartDate: '',
                    PeriodTypeEndDate: '',
                    LastDCInfo: null,
                    TemplateIds: [],
                }
            }

            for (var i = 0; i < DcTemplateChildResult.length; i++) {

                for (var j = 0; j < DcTemplateChildResult.length; j++) {

                    if (DcTemplateChildResult[j].AttributeGroupTypeId == 2 &&
                        DcTemplateChildResult[j].Left >= DcTemplateChildResult[i].Left &&
                        DcTemplateChildResult[j].Right <= DcTemplateChildResult[i].Right
                        ) {
                        Response[DcTemplateChildResult[i].TemplateNodeId].TemplateIds.push(DcTemplateChildResult[j].TemplateNodeId);
                    }
                }
            }

            OneViewConsole.Debug("GetAttributeGroupWiseCount End", "ExpressBO.GetAttributeGroupWiseCount");

            return Response;


        }
        catch (Excep) {
            //alert("GetAttributeGroupWiseCount : " + ex + "..." + JSON.stringify(ex));
            throw oOneViewExceptionHandler.Create("DAO", "ExpressBO.GetAttributeGroupWiseCount", Excep);
        }
    }

    var GetDcResultCount = function (Request) {
        try {
            OneViewConsole.Debug("GetDcResultCount Start", "ExpressBO.GetDcResultCount");

            var IsDcResultExist = false;

            var DcResultList = Request.DcResultList;
            var ScheduleSearchKey = Request.ScheduleSearchKey;
            var PeriodStartDateToInteger = Request.PeriodStartDateToInteger;
            var PeriodEndDateToInteger = Request.PeriodEndDateToInteger;

            var Response = { OverAllCompletedDCCount: 0, OverAllInProgressDCCount: 0, OverAllApprovedDCCount: 0 };


            var _oDcProfileSyncStatusDetails = GetDcProfileSyncStatusDetails(Request.Req);

            for (var j = 0; j < DcResultList.length; j++) {

                var DcSearchKey = DcResultList[j].SystemUserId + "_" + DcResultList[j].TemplateNodeId + "_" + DcResultList[j].DcPlaceId + "_" + DcResultList[j].DcPlaceDimension;
                var DcStartDate = DcResultList[j].DcSD;

                if (ScheduleSearchKey == DcSearchKey && DcStartDate >= PeriodStartDateToInteger && DcStartDate <= PeriodEndDateToInteger) {
                    /*
                    IsDcResultExist = true;
                 
                    if (_oDcProfileSyncStatusDetails.ServerIds.length > 0 && _oDcProfileSyncStatusDetails.ServerIds.indexOf(DcResultList[j].ServerId) != -1) {
                        Response.OverAllCompletedDCCount += parseInt(_oDcProfileSyncStatusDetails.OverAllCompletedDCCount);
                    
                    }
                    else if (_oDcProfileSyncStatusDetails.InProgressServerIds.length > 0 && _oDcProfileSyncStatusDetails.InProgressServerIds.indexOf(DcResultList[j].ServerId) != -1 && DcResultList[j].IsCompleted != "true") {
                        Response.OverAllInProgressDCCount += parseInt(_oDcProfileSyncStatusDetails.OverAllInProgressDCCount);                       
                    }
                    else {
                        if (DcResultList[j].IsCompleted == "true") {
                            Response.OverAllCompletedDCCount += parseInt(1);                            
                        }
                        else {
                            Response.OverAllInProgressDCCount += parseInt(1);                          
                        }
                    }
                    */

                    if (_oDcProfileSyncStatusDetails.ServerIds.length > 0 && _oDcProfileSyncStatusDetails.ServerIds.indexOf(DcResultList[j].ServerId) != -1) {
                        _oDcProfileSyncStatusDetails.OverAllCompletedDCCount = parseInt(_oDcProfileSyncStatusDetails.OverAllCompletedDCCount - 1);

                    }
                    if (_oDcProfileSyncStatusDetails.InProgressServerIds.length > 0 && _oDcProfileSyncStatusDetails.InProgressServerIds.indexOf(DcResultList[j].ServerId) != -1) {
                        _oDcProfileSyncStatusDetails.OverAllInProgressDCCount = parseInt(_oDcProfileSyncStatusDetails.OverAllInProgressDCCount - 1);
                    }

                    if (_oDcProfileSyncStatusDetails.ApprovedServerIds.length > 0 && _oDcProfileSyncStatusDetails.ApprovedServerIds.indexOf(DcResultList[j].ServerId) != -1) {
                        _oDcProfileSyncStatusDetails.OverAllApprovedDCCount = parseInt(_oDcProfileSyncStatusDetails.OverAllApprovedDCCount - 1);
                    }

                    if (DcResultList[j].IsCompleted == "true") {
                        Response.OverAllCompletedDCCount += parseInt(1);
                    }
                    else {
                        Response.OverAllInProgressDCCount += parseInt(1);
                    }

                    if (DcResultList[j].IsSubmit == "true") {
                        Response.OverAllApprovedDCCount += parseInt(1);
                    }
                }

            }

            if (_oDcProfileSyncStatusDetails.OverAllCompletedDCCount > 0) {
                Response.OverAllCompletedDCCount += parseInt(_oDcProfileSyncStatusDetails.OverAllCompletedDCCount);
            }
            if (_oDcProfileSyncStatusDetails.OverAllInProgressDCCount > 0) {
                Response.OverAllInProgressDCCount += parseInt(_oDcProfileSyncStatusDetails.OverAllInProgressDCCount);
            }
            if (_oDcProfileSyncStatusDetails.OverAllApprovedDCCount > 0) {
                Response.OverAllApprovedDCCount += parseInt(_oDcProfileSyncStatusDetails.OverAllApprovedDCCount);
            }
            //if (IsDcResultExist == false) {

            //    if (_oDcProfileSyncStatusDetails.ServerIds.length > 0 || _oDcProfileSyncStatusDetails.InProgressServerIds.length > 0) {

            //        Response.OverAllCompletedDCCount += parseInt(_oDcProfileSyncStatusDetails.OverAllCompletedDCCount);
            //        Response.OverAllInProgressDCCount += parseInt(_oDcProfileSyncStatusDetails.OverAllInProgressDCCount);

            //    }
            //}

            OneViewConsole.Debug("GetDcResultCount End", "ExpressBO.GetDcResultCount");
            return Response;

        }
        catch (Excep) {
            //  alert("GetByTemplateLst : "+ex + "..." + JSON.stringify(ex));
            throw oOneViewExceptionHandler.Create("DAO", "ExpressBO.GetDcResultCount", Excep);
        }
    }

    this.CheckAnyUnApprovedDCExists = function (Req) {

        try {
            OneViewConsole.Debug("CheckAnyUnApprovedDCExists start", "PlatformPeriodicsBO.CheckAnyUnApprovedDCExists");

            var IsExists = false;       
            var _oDcDAO = new DcDAO();
            var Result = _oDcDAO.GetUnApprovedDcCountByAllDimensions(Req);

            if (Result[0].DcCount > 0) {                
                IsExists = true;
            }

            OneViewConsole.Debug("CheckAnyUnApprovedDCExists end", "PlatformPeriodicsBO.CheckAnyUnApprovedDCExists");
            return IsExists;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "PlatformPeriodicsBO.CheckAnyUnApprovedDCExists", Excep);
        }
        finally {
        }
    }
   
    this.GetMultiMediaSubElementsByDcResultDetailsId = function (Req) {

        try {
            OneViewConsole.Debug("GetMultiMediaSubElementsByDcResultDetailsId start", "PlatformPeriodicsBO.GetMultiMediaSubElementsByDcResultDetailsId");

            var Response = null;

            var TemplateId = Req.TemplateId;
            var AttributeId = Req.AttributeId;
            var ControlId = Req.ControlId;
            var DcResultDetailsId = Req.DcResultDetailsId;
            var DCResultDetailClientGuid = Req.DCResultDetailClientGuid;

            var Dimension = DATEntityType.DCResultDetails;
            var Request = { 'Dimension': Dimension, 'MappedClientGuid': DCResultDetailClientGuid };
            var _oMultiMediaSubElementsDAO = new MultiMediaSubElementsDAO();
            var Result = _oMultiMediaSubElementsDAO.GetMultiMediaSubElementsByMappedEntityClientGuidDimension(Request);

            var MultiMediaSubElementsResult = [];

            if (Result.length > 0) {
                MultiMediaSubElementsResult.push(Result);
                Response = {};

                Response[TemplateId] = {
                    AttributeId: { ControlId: { DcResultDetailsId: DcResultDetailsId, MultiMediaSubElementsLst: MultiMediaSubElementsResult } }
                }
            }
            OneViewConsole.Debug("GetMultiMediaSubElementsByDcResultDetailsId end", "PlatformPeriodicsBO.GetMultiMediaSubElementsByDcResultDetailsId");
            return Response;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "PlatformPeriodicsBO.GetMultiMediaSubElementsByDcResultDetailsId", Excep);
        }
        finally {
        }
    }
}
