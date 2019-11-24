
function DcProfileVsActualBO() {
    /// </summary>
    /// <param name="Req">Req</param> 
    //"ServiceId": ServiceId,
    //"UserId": LoginUserId,
    //"TemplateNodeId": 0,
    //"PlaceId": 0,
    //"DcPlaceDimension": 0,
    //"DCPlaceRCOType": 0,
    //"StartDate": "",
    //"EndDate": "",
    //"IsCompleted": "-1",
    //"IsSynchronized": "-1",
    //"IsSubmit": "-1",
    //"DCPlaceKeyElementIsGroup": false,
    //"TemplateKeyElementIsGroup": false,
    //"AttributeGroupType": 0,
    //"IsNewDc":true
    //
    /// <returns>Response</returns>  
    
    this.Get = function (Req) {
        try {

            OneViewConsole.Debug("Get start", "DcProfileVsActualBO.Get");

            var _oDcProfileDAO = new DcProfileDAO();

            var ProfileValidityResponse = {
                IsProfileValid: false,
                Occurence: 0,
                TotalDc: 0,
                OverAllCompletedDCCount: 0,
                OverAllInProgressDCCount: 0

            }
  
            var _oDcDAO = new DcDAO();
            Req["DcPlaceExp"] = "";

            if (Req.DCPlaceKeyElementIsGroup == true) {
                Req.DcPlaceExp = _oDcDAO.GetDcPlaceExpByPlaceGroup({ IsDCPlaceGroup: Req.DCPlaceKeyElementIsGroup, DcPlaceId: Req.PlaceId, DCPlaceRCOType: Req.DCPlaceRCOType });

            }

            Req["DcTemplateExp"] = "";

            if (Req.TemplateKeyElementIsGroup == true) {
                Req.DcTemplateExp = _oDcDAO.GetDcTemplateExpByTemplateGroup({ IsTemplateGroup: Req.TemplateKeyElementIsGroup, TemplateNodeId: Req.TemplateNodeId, AttributeGroupType: Req.AttributeGroupType });
            }

            var ScheduleProfileDetailsResult = _oDcProfileDAO.GetByAllDimensionsAndSchedule(Req);
            var DcResultList = _oDcProfileDAO.GetDcDetailsByServiceUserIdPlaceInfoDateAndTemplateInfo(Req);

            var _DateTime = new DateTime();
            var currentDateTime = _DateTime.GetDateAndTime();
            Req.StartDate = currentDateTime;
            Req.EndDate = currentDateTime;

            var PeriodEntityLst = _oDcProfileDAO.GetAllCurrentPeriod(Req);
            var DcProfileSyncStatusResult = "";
            if (Req.IsNewDc == true) {
                DcProfileSyncStatusResult = _oDcProfileDAO.GetAllDcProfileSyncStatus(Req);
            }


            if (ScheduleProfileDetailsResult.length > 0) {

                ProfileValidityResponse.IsProfileValid = true;
                var _oDcProfileSyncStatusDetails = { ServerIds: [], InProgressServerIds: [], OverAllCompletedDCCount: 0, OverAllInProgressDCCount: 0 };

                for (var i = 0; i < ScheduleProfileDetailsResult.length; i++) {

                    var ScheduleSearchKey = Req.UserId + "_" + ScheduleProfileDetailsResult[i].TemplateNodeId + "_" + ScheduleProfileDetailsResult[i].DcPlaceId + "_" + Req.DcPlaceDimension;                   

                    var StartDateToInteger = ScheduleProfileDetailsResult[i].SD;
                    var EndDateToInteger = ScheduleProfileDetailsResult[i].ED;

                    if (ScheduleProfileDetailsResult[i].Occurence > 0) {
                        ProfileValidityResponse.Occurence += parseInt(ScheduleProfileDetailsResult[i].Occurence);


                        if (ScheduleProfileDetailsResult[i].ReccurenceId > 0) {

                            for (var p = 0; p < PeriodEntityLst.length; p++) {

                                if (PeriodEntityLst[p].PeriodTypeServerId == ScheduleProfileDetailsResult[i].ReccurenceId) {

                                    Req.StartDate = PeriodEntityLst[p].StartDate;
                                    Req.EndDate = PeriodEntityLst[p].EndDate;
                                    StartDateToInteger = PeriodEntityLst[p].SD;
                                    EndDateToInteger = PeriodEntityLst[p].ED;

                                    break;
                                }
                            }
                        }

                        var DcProfileSyncStatusResponse = GetDcProfileSyncStatusDetails({ DcProfileSyncStatusResult: DcProfileSyncStatusResult, ScheduleSearchKey: ScheduleSearchKey, DcProfileId: ScheduleProfileDetailsResult[i].DcProfileServerId, StartDateToInteger: StartDateToInteger, EndDateToInteger: EndDateToInteger, MainReq: Req });
                        _oDcProfileSyncStatusDetails.ServerIds = DcProfileSyncStatusResponse.ServerIds;
                        _oDcProfileSyncStatusDetails.InProgressServerIds = DcProfileSyncStatusResponse.InProgressServerIds;
                        _oDcProfileSyncStatusDetails.OverAllCompletedDCCount = DcProfileSyncStatusResponse.OverAllCompletedDCCount;
                        _oDcProfileSyncStatusDetails.OverAllInProgressDCCount = DcProfileSyncStatusResponse.OverAllInProgressDCCount;                      
                    }
                 
                    var GetDcResult = GetDcResultCount({ DcResultList: DcResultList, ScheduleSearchKey: ScheduleSearchKey, StartDateToInteger: StartDateToInteger, EndDateToInteger: EndDateToInteger, MainReq: Req, _oDcProfileSyncStatusDetails: _oDcProfileSyncStatusDetails });

                  
                    ProfileValidityResponse.TotalDc += parseInt(GetDcResult.TotalDc);
                    ProfileValidityResponse.OverAllCompletedDCCount += parseInt(GetDcResult.OverAllCompletedDCCount);
                    ProfileValidityResponse.OverAllInProgressDCCount += parseInt(GetDcResult.OverAllInProgressDCCount);
                  
                }

                if (ProfileValidityResponse.Occurence == 0) {
                    ProfileValidityResponse.Occurence = -1;
                }

            }


            OneViewConsole.Debug("Get end", "DcProfileVsActualBO.Get");
            //alert("Get : " + JSON.stringify(ProfileValidityResponse));
            return ProfileValidityResponse;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcProfileVsActualBO.Get", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }


    var GetDcProfileSyncStatusDetails = function (Req) {
        try {
            OneViewConsole.Debug("GetDcProfileSyncStatusDetails Start", "DcProfileVsActualBO.GetDcProfileSyncStatusDetails");
         
            var Response = { ServerIds: [], InProgressServerIds: [], OverAllCompletedDCCount: 0, OverAllInProgressDCCount: 0 };

            var DcProfileSyncStatusResult = Req.DcProfileSyncStatusResult;         
            var DcProfileId = Req.DcProfileId;
            var StartDateToInteger = Req.StartDateToInteger;
            var EndDateToInteger = Req.EndDateToInteger;
            var MainReq = Req.MainReq;
            var ScheduleSearchKey = Req.ScheduleSearchKey;
            
            if (MainReq.IsNewDc == true) {
                if (DcProfileSyncStatusResult.length > 0) {

                    for (var s = 0; s < DcProfileSyncStatusResult.length ; s++) {

                        var DcProfileSyncSearchKey = DcProfileSyncStatusResult[s].DcUserId + "_" + DcProfileSyncStatusResult[s].TemplateNodeId + "_" + DcProfileSyncStatusResult[s].DcPlaceId + "_" + DcProfileSyncStatusResult[s].DcPlaceDimension;
                       
                        if (ScheduleSearchKey == DcProfileSyncSearchKey && DcProfileSyncStatusResult[s].DcProfileId == DcProfileId && DcProfileSyncStatusResult[s].SD <= StartDateToInteger && DcProfileSyncStatusResult[s].ED >= EndDateToInteger) {
                            
                            if (DcProfileSyncStatusResult[s]["InprogressServerIds"] != "") {
                                var InprogressServerIds = DcProfileSyncStatusResult[s]["InprogressServerIds"];
                                var InprogressServerIdsArray = InprogressServerIds.split(",");
                                for (var inprg = 1; inprg < InprogressServerIdsArray.length; inprg++) {
                                    Response.InProgressServerIds.push(parseInt(InprogressServerIdsArray[inprg]));
                                }
                            }
                            if (DcProfileSyncStatusResult[s]["CompletedServerIds"] != "") {

                                var CompletedServerIds = DcProfileSyncStatusResult[s]["CompletedServerIds"];
                                var CompletedServerIdsArray = CompletedServerIds.split(",");
                                for (var Cmpltd = 1; Cmpltd < CompletedServerIdsArray.length; Cmpltd++) {
                                    Response.ServerIds.push(parseInt(CompletedServerIdsArray[Cmpltd]));
                                }

                            }
                            Response.OverAllCompletedDCCount = DcProfileSyncStatusResult[s]["CompletedCount"];
                            Response.OverAllInProgressDCCount = DcProfileSyncStatusResult[s]["InprogressCount"];

                            break;

                        }
                    }
                   
                }
             
            }

            OneViewConsole.Debug("GetDcProfileSyncStatusDetails Start", "DcProfileVsActualBO.GetDcProfileSyncStatusDetails");
            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcProfileVsActualBO.GetDcProfileSyncStatusDetails", Excep);
        }
    }

    var GetDcResultCount = function (Req) {
        try {
            OneViewConsole.Debug("GetDcResultCount Start", "DcProfileVsActualBO.GetDcResultCount");

            Response = { TotalDc: 0, OverAllInProgressDCCount: 0, OverAllCompletedDCCount: 0 };

            var DcResultList = Req.DcResultList;
            var ScheduleSearchKey = Req.ScheduleSearchKey;
            var StartDateToInteger = Req.StartDateToInteger;
            var EndDateToInteger = Req.EndDateToInteger;
            var _oDcProfileSyncStatusDetails = Req._oDcProfileSyncStatusDetails;

            if (DcResultList.length > 0) {

                for (var j = 0; j < DcResultList.length; j++) {

                    var DcSearchKey = DcResultList[j].SystemUserId + "_" + DcResultList[j].TemplateNodeId + "_" + DcResultList[j].DcPlaceId + "_" + DcResultList[j].DcPlaceDimension;
                    var DcStartDate = DcResultList[j].DcSD;
                    var IsEndDateValid=(EndDateToInteger!="") ?  DcStartDate <= EndDateToInteger : true;
                    
                    if (ScheduleSearchKey == DcSearchKey && DcStartDate >= StartDateToInteger && IsEndDateValid) {
                      
                        if (_oDcProfileSyncStatusDetails.ServerIds.length > 0 && _oDcProfileSyncStatusDetails.ServerIds.indexOf(DcResultList[j].ServerId) != -1) {
                            _oDcProfileSyncStatusDetails.OverAllCompletedDCCount = parseInt(_oDcProfileSyncStatusDetails.OverAllCompletedDCCount - 1);

                        }
                        if (_oDcProfileSyncStatusDetails.InProgressServerIds.length > 0 && _oDcProfileSyncStatusDetails.InProgressServerIds.indexOf(DcResultList[j].ServerId) != -1) {
                            _oDcProfileSyncStatusDetails.OverAllInProgressDCCount = parseInt(_oDcProfileSyncStatusDetails.OverAllInProgressDCCount - 1);
                        }

                        Response.TotalDc += parseInt(1);

                        if (DcResultList[j].IsCompleted != "true") {
                            Response.OverAllInProgressDCCount += parseInt(1);
                        }
                        else {
                            Response.OverAllCompletedDCCount += parseInt(1);
                        }

                    }

                }
            }

            if (_oDcProfileSyncStatusDetails.OverAllCompletedDCCount > 0) {
                Response.TotalDc += parseInt(_oDcProfileSyncStatusDetails.OverAllCompletedDCCount);
                Response.OverAllCompletedDCCount += parseInt(_oDcProfileSyncStatusDetails.OverAllCompletedDCCount);
            }
            if (_oDcProfileSyncStatusDetails.OverAllInProgressDCCount > 0) {
                Response.TotalDc += parseInt(_oDcProfileSyncStatusDetails.OverAllInProgressDCCount);
                Response.OverAllInProgressDCCount += parseInt(_oDcProfileSyncStatusDetails.OverAllInProgressDCCount);
            }

            OneViewConsole.Debug("GetDcResultCount End", "DcProfileVsActualBO.GetDcResultCount");
            return Response;

        }
        catch (Excep) {
            //  alert("GetByTemplateLst : "+ex + "..." + JSON.stringify(ex));
            throw oOneViewExceptionHandler.Create("BO", "DcProfileVsActualBO.GetDcResultCount", Excep);
        }
    }

}













