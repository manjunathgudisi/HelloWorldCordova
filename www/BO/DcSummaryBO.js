
// DcSummaryBO
function DcSummaryBO() {

    // Current Scope
    var MyInstance = this;


    /// <summary>
    /// Get
    /// </summary>
    /// <param name="Req">Req</param>   
    // Req={DcId:'',DcSummaryConfig:{
    /// IsTemplateNameRequired :true,
    /// IsDcPlaceNameRequired :true,
    /// 
    /// IsNCCountRequired:true,
    /// IsObservationCountRequired :true,
    /// IsActionCountRequired :true,
    /// IsBlockerCountRequired :true,
    /// IsNACountRequired :true,
    /// 
    /// IsESTTimeRequired :true,
    /// IsActualTimeRequired:true,
    /// IsGPSInfoRequired:true,
    /// IsLastUpdatedDateRequired :true,
    /// IsScoreRequired :true,
    /// IsPercentageRequired :true,
    /// IsCommentsRequired :true,

     //}}

    /// <returns>Response</returns>  
    this.Get = function (Req) {
        try {
            var Response = {
                "TemplateName": "",
                "DcPlaceName": "",
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
                "OtherAnswermodeSummary": 0,
            };
            
            OneViewConsole.Debug("Get start", "DcSummaryBO.Get");

            var DcClientGuid = '';
            var DcSummaryConfig = Req.DcSummaryConfig;
            var DataResultsId = '';

            

            var PreValidationStatus = MyInstance.PreValidation({ DcSummaryConfig: Req.DcSummaryConfig });
 
 
            var _oDcDAO = new DcDAO();
            var DcResult = _oDcDAO.GetDcDetailsByDcId(Req.DcId);
            var DcResultLst = _oDcDAO.GetLastUpdatedDcResultId(Req.DcId);
            if (DcResultLst.length > 0) {
                DataResultsId = DcResultLst[0].Id;
            }

            if (DcResult.length > 0) {
                if(DcSummaryConfig.IsTemplateNameRequired==true){
                    Response.TemplateName = DcResult[0].TemplateNodeName;
                }
                if(DcSummaryConfig.IsDcPlaceNameRequired==true){
                    Response.DcPlaceName = DcResult[0].DcPlaceName;
                }
                if(DcSummaryConfig.IsESTTimeRequired==true){
                    Response.ESTTime = DcResult[0].ESTTime;
                }
                if(DcSummaryConfig.IsActualTimeRequired==true){
                    Response.ActualTime = DcResult[0].ActualTime;
                }
                if(DcSummaryConfig.IsGPSInfoRequired==true){
                    Response.Latitude = DcResult[0].Latitude;
                    Response.Longitude = DcResult[0].Longitude;
                }
                if(DcSummaryConfig.IsScoreRequired==true){
                    Response.Score = DcResult[0].Score;
                }
                if(DcSummaryConfig.IsPercentageRequired==true){
                    Response.Percentage = DcResult[0].Percentage;
                }
                if(DcSummaryConfig.IsCommentsRequired==true){
                    Response.Comments = DcResultLst[0].Comments;
                }
                if(DcSummaryConfig.IsLastUpdatedDateRequired==true){
                    Response.LastUpdatedDate = DcResult[0].TimeStamp;
                }

                DcClientGuid = DcResult[0].ClientGuid;
            }
         
            if (PreValidationStatus.IsNCObservationtActionRequired == true) {
                var NCObservationtActionCount = GetNCObservationActionCount({ DcClientGuid: DcClientGuid, DcSummaryConfig: DcSummaryConfig });
            
                Response.NCCount = NCObservationtActionCount.NCCount;
                Response.ObservationCount = NCObservationtActionCount.ObservationCount;
                Response.ActionCount = NCObservationtActionCount.ActionCount;
            }

            if (DcSummaryConfig.IsBlockerCountRequired == true) {
                var _oDCBlockerInfoDAO = new DCBlockerInfoDAO();
                var DCBlockerResult = _oDCBlockerInfoDAO.GetBlockerByDcClientGuid(DcClientGuid);
               
                if (DCBlockerResult.length > 0) {
                    Response.BlockerCount = DCBlockerResult[0].BlockerCount;
                }
            }
       
            var ListviewAnswermodeSummaryResult = GetAnswermodeSummaryCount({ DcId: Req.DcId });
            Response.ListviewAnswermodeSummary = ListviewAnswermodeSummaryResult.ListviewAnswermodeSummary;
            Response.OtherAnswermodeSummary = ListviewAnswermodeSummaryResult.OtherAnswermodeSummary;

            if (DcSummaryConfig.IsNACountRequired == true) {              
                Response.NACount = ListviewAnswermodeSummaryResult.NACount;
            }

            OneViewConsole.Debug("Get start", "DcSummaryBO.Get");
           
            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcSummaryBO.Get", Excep);
        }
    }

    /// <summary>
    /// Get
    /// <param name="Req">Req</param>   
    /// Req={DcClientGuid:'',DcSummaryConfig:{}}
    /// Response={NCCount: 1, ObservationCount: 2, ActionCount: 1}
    /// </summary>
    var GetNCObservationActionCount = function (Req) {
        try {
            
            var _oActionDAO = new ActionDAO();
            var NCObservationList = _oActionDAO.GetNCObservation(Req.DcClientGuid);
            var DcSummaryConfig = Req.DcSummaryConfig;

          /*  "NCCount": 0,
               "ObservationCount": 0,
               "ActionCount": 0,*/
            var NCCount = 0;
            var ObservationCount = 0;
            var ActionCount = 0;
            var ActionClientGuidLst = [];

            if (NCObservationList.length > 0) {

                for (var i = 0; i < NCObservationList.length; i++) {

                    if (NCObservationList[i].IsNC == 'true' && DcSummaryConfig.IsNCCountRequired==true) {
                        NCCount = parseInt(NCCount + 1);
                    }
                    if (NCObservationList[i].IsObservation == 'true' && DcSummaryConfig.IsObservationCountRequired == true) {
                        ObservationCount = parseInt(ObservationCount + 1);
                    }
                    if (NCObservationList[i].ActionClientGuid != "" && DcSummaryConfig.IsActionCountRequired == true) {
                        ActionClientGuidLst.push(NCObservationList[i].ActionClientGuid);
                    }
                }
            }

            if (ActionClientGuidLst.length > 0) {
                var ActionCountResult = _oActionDAO.GetActionCountByActionClientGuid(ActionClientGuidLst);
                if (ActionCountResult.length > 0) {
                    ActionCount = parseInt(ActionCount + ActionCountResult[0].ActionCount);
                }
            }

            var Response = { NCCount: NCCount, ObservationCount: ObservationCount, ActionCount: ActionCount };
            return Response;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcSummaryBO.GetNCCountObservationCountActionCount", Excep);
        }
    }


    /// <summary>
    /// PreValidation
    /// </summary>
    /// <param name="Req">Req</param>   
    // Req={DcSummaryConfig:{
    /// IsTemplateNameRequired :true,
    /// IsDcPlaceNameRequired :true,
    /// 
    /// IsNCCountRequired:true,
    /// IsObservationCountRequired :true,
    /// IsActionCountRequired :true,
    /// IsBlockerCountRequired :true,
    /// IsNACountRequired :true,
    /// 
    /// IsESTTimeRequired :true,
    /// IsActualTimeRequired:true,
    /// IsGPSInfoRequired:true,
    /// IsLastUpdatedDateRequired :true,
    /// IsScoreRequired :true,
    /// IsPercentageRequired :true,
    /// IsCommentsRequired :true,

    //}}
    /// <returns>= {  IsNCObservationtActionRequired: false }</returns> 
    this.PreValidation = function (Req) {
        try {
            var Response = { IsNCObservationtActionRequired: false }
            var DcSummaryConfig=Req.DcSummaryConfig;

            //if (DcSummaryConfig.IsTemplateNameRequired == true || DcSummaryConfig.IsDcPlaceNameRequired == true || DcSummaryConfig.IsESTTimeRequired == true || DcSummaryConfig.IsActualTimeRequired == true || DcSummaryConfig.IsGPSInfoRequired == true || DcSummaryConfig.IsLastUpdatedDateRequired == true || DcSummaryConfig.IsScoreRequired == true || DcSummaryConfig.IsPercentageRequired == true || DcSummaryConfig.IsCommentsRequired == true) {
            //    Response.IsDcRequired = true;
            //}
            if (DcSummaryConfig.IsNCCountRequired == true || DcSummaryConfig.IsObservationCountRequired == true || DcSummaryConfig.IsActionCountRequired == true) {
                Response.IsNCObservationtActionRequired = true;
            }

        return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcSummaryBO.PreValidation", Excep);
        }
    }

    /// <summary>
    /// Get
    /// <param name="Req">Req</param>   
    /// Req={DcId:''}
    /// Response={NACount: 0, ListviewAnswermodeSummary: [{Yes:{ Name: Yes, Count: 3, Color: 'green',Sequence:'1' },No:{ Name: No, Count: 1, Color: 'red',Sequence:'2' }}], OtherAnswermodeSummary: 0}
    /// </summary>
    var GetAnswermodeSummaryCount = function (Req) {
        try {
            var Response = {
                "NACount":0,
                "ListviewAnswermodeSummary": [],
                "OtherAnswermodeSummary": 0,
            };
            var OtherInfoCount = 0;
            var ListviewAnswermodeSummary = {};
            var NACount = 0;
            var BandDetailsServerIdLst = [];


            var _oDcDAO = new DcDAO();
            //var Dc = _oDcDAO.GetDCById(Req.DcId);
            //var DcUserId = OneViewSessionStorage.Get("LoginUserId");

            var Result = _oDcDAO.GetDCResultDetailsByDCIdForLV(Req.DcId);
            var DcResultDetails = GetDCByDCId(Result);
            for (var i = 0; i < DcResultDetails.length; i++) {
                var oAttribute = DcResultDetails[i];

                for (var j = 0; j < oAttribute.Controls.length; j++) {
                    var oControl = oAttribute.Controls[j];
                    var oFinalAnswer = GetLastUpdatedAnswer(oControl.Answers);

                    if (oFinalAnswer.IsNA == "true") {
                        NACount = parseInt(NACount) + 1;
                        break;
                    }
                    else {
                        if (oFinalAnswer.Answer != "") {
                            //if (oFinalAnswer.AnswerMode == "DCListViewControlConfig" && oFinalAnswer.AnswerFKType == 0) {
                            if (oFinalAnswer.AnswerMode == "DCListViewControlConfig" || (oFinalAnswer.Answer != "" && oFinalAnswer.AnswerValue != "" && oFinalAnswer.AnswerFKType == 39)) {//Need to configure for band only : FKType need to update
                                BandDetailsServerIdLst.push(oFinalAnswer.Answer);
                                if (ListviewAnswermodeSummary[oFinalAnswer.Answer] == undefined) {
                                    ListviewAnswermodeSummary[oFinalAnswer.Answer] = { Name: oFinalAnswer.AnswerValue, Count: 1, Color: '',Sequence:'' };
                                }
                                else {
                                    ListviewAnswermodeSummary[oFinalAnswer.Answer].Count = parseInt(ListviewAnswermodeSummary[oFinalAnswer.Answer].Count + 1);
                                }
                            }
                            else {
                                OtherInfoCount = parseInt(OtherInfoCount + 1);
                            }
                        }
                    }
                    
                }

            }

            if (BandDetailsServerIdLst.length > 0) {
                var _oBandDetailsMasterDAO = new BandDetailsMasterDAO();
                var BandDetailsLst = _oBandDetailsMasterDAO.GetBandDetailsByServerId(BandDetailsServerIdLst);

                if (BandDetailsLst.length > 0) {
                    for (var j = 0; j < BandDetailsLst.length; j++) {

                        ListviewAnswermodeSummary[BandDetailsLst[j].ServerId].Color = BandDetailsLst[j].ColourCode;
                        ListviewAnswermodeSummary[BandDetailsLst[j].ServerId].Sequence = BandDetailsLst[j].Sequence;
                    }
                   
                }
                Response.ListviewAnswermodeSummary.push(ListviewAnswermodeSummary);
            }

           // alert("ListviewAnswermodeSummary 2 :" + JSON.stringify(ListviewAnswermodeSummary));

            Response.OtherAnswermodeSummary = OtherInfoCount;
            Response.NACount = NACount;
           // alert("Response  :" + JSON.stringify(Response));
            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcSummaryBO.GetNCCountObservationCountActionCount", Excep);
        }
    }

    var GetLastUpdatedAnswer = function (AnswerLst) {
        try {
            OneViewConsole.Debug("GetLastUpdatedAnswer Start", "LVDataCaptureBO.GetLastUpdatedAnswer");

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

            OneViewConsole.Debug("GetLastUpdatedAnswer End", "LVDataCaptureBO.GetLastUpdatedAnswer");

            return AnswerObj;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetLastUpdatedAnswer", Excep);
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


    /*DcSummary For List of DataCapture(Eg: Configured for Periodics templates) Start*/
    //{ DcId: Req.DcId, DcClientGuid: Req.DcClientGuid, DcSummaryConfig: Req.DcSummaryConfig }
    this.GetDcSummaryByDcIdLst = function (Req) {
        try {
            var Response = {
                "TemplateName": "",
                "DcPlaceName": "",
                "ESTTime": "",
                "ActualTime": "",
                "Latitude": "",
                "Longitude": "",
                "Score": 0,
                "Percentage": "",
                "Comments": "",
                "LastUpdatedDate": "",

                "NCCount": 0,
                "ObservationCount": 0,
                "ActionCount": 0,
                "BlockerCount": 0,

                "NACount": 0,
                "ListviewAnswermodeSummary": [],
                "OtherAnswermodeSummary": 0,
            };

            OneViewConsole.Debug("Get start", "DcSummaryBO.Get");

            var DcClientGuid = '';
            var DcSummaryConfig = Req.DcSummaryConfig;
            var DataResultsId = '';



            var PreValidationStatus = MyInstance.PreValidation({ DcSummaryConfig: Req.DcSummaryConfig });


            var _oDcDAO = new DcDAO();
            var DcResult = _oDcDAO.GetDcDetailsByDcIdLst(Req.DcId);

            //var DcResultLst = _oDcDAO.GetLastUpdatedDcResultId(Req.DcId);     

            if (DcResult.length > 0) {
                /*if (DcSummaryConfig.IsTemplateNameRequired == true) {
                    Response.TemplateName = DcResult[0].TemplateNodeName;
                }
                if (DcSummaryConfig.IsDcPlaceNameRequired == true) {
                    Response.DcPlaceName = DcResult[0].DcPlaceName;
                }
                if (DcSummaryConfig.IsESTTimeRequired == true) {
                    Response.ESTTime = DcResult[0].ESTTime;
                }
                if (DcSummaryConfig.IsActualTimeRequired == true) {
                    Response.ActualTime = DcResult[0].ActualTime;
                }
                if (DcSummaryConfig.IsGPSInfoRequired == true) {
                    Response.Latitude = DcResult[0].Latitude;
                    Response.Longitude = DcResult[0].Longitude;
                }*/
                if (DcSummaryConfig.IsScoreRequired == true) {
                    Response.Score += DcResult[0].Score;
                }
                if (DcSummaryConfig.IsPercentageRequired == true) {
                    //Response.Percentage = DcResult[0].Percentage;
                }
                /*if (DcSummaryConfig.IsCommentsRequired == true) {
                    Response.Comments = "";
                }
                if (DcSummaryConfig.IsLastUpdatedDateRequired == true) {
                    Response.LastUpdatedDate = DcResult[0].TimeStamp;
                }*/

                //DcClientGuid = DcResult[0].ClientGuid;
                if (DcSummaryConfig.IsDcPlaceNameRequired == true) {
                    Response.DcPlaceName = DcResult[0].DcPlaceName;
                }
                for (var i = 0; i < DcResult.length; i++) {
                    if (DcSummaryConfig.IsScoreRequired == true) {
                        Response.Score += DcResult[i].Score;
                    }
                    if (DcSummaryConfig.IsPercentageRequired == true) {
                        //Response.Percentage = DcResult[i].Percentage;
                    }
                }
            }

            if (PreValidationStatus.IsNCObservationtActionRequired == true) {
                var NCObservationtActionCount = GetNCObservationActionCountByClientGuidLst({ DcClientGuid: Req.DcClientGuid, DcSummaryConfig: DcSummaryConfig });

                Response.NCCount = NCObservationtActionCount.NCCount;
                Response.ObservationCount = NCObservationtActionCount.ObservationCount;
                Response.ActionCount = NCObservationtActionCount.ActionCount;
            }

            if (DcSummaryConfig.IsBlockerCountRequired == true) {
                var _oDCBlockerInfoDAO = new DCBlockerInfoDAO();
                var DCBlockerResult = _oDCBlockerInfoDAO.GetBlockerByDcClientGuidLst(Req.DcClientGuid);
                if (DCBlockerResult.length > 0) {
                    for (var blkr = 0; blkr < DCBlockerResult.length; blkr++) {
                        Response.BlockerCount += DCBlockerResult[blkr].BlockerCount;
                    }
                }
            }


            var ListviewAnswermodeSummaryResult = GetAnswermodeSummaryCountForDcIdLst({ DcId: Req.DcId });
            Response.ListviewAnswermodeSummary = ListviewAnswermodeSummaryResult.ListviewAnswermodeSummary;
            Response.OtherAnswermodeSummary = ListviewAnswermodeSummaryResult.OtherAnswermodeSummary;

            if (DcSummaryConfig.IsNACountRequired == true) {
                Response.NACount = ListviewAnswermodeSummaryResult.NACount;
            }

            OneViewConsole.Debug("GetDcSummaryByDcIdLst start", "DcSummaryBO.GetDcSummaryByDcIdLst");

            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcSummaryBO.GetDcSummaryByDcIdLst", Excep);
        }
    }



    /// <summary>
    /// Get
    /// <param name="Req">Req</param>   
    /// Req={DcClientGuid:'',DcSummaryConfig:{}}
    /// Response={NCCount: 1, ObservationCount: 2, ActionCount: 1}
    /// </summary>
    var GetNCObservationActionCountByClientGuidLst = function (Req) {
        try {

            var _oActionDAO = new ActionDAO();
            var NCObservationList = _oActionDAO.GetNCObservationByDcClientGuidLst(Req.DcClientGuid);
            var DcSummaryConfig = Req.DcSummaryConfig;
            //alert(JSON.stringify(NCObservationList));
            /*  "NCCount": 0,
                 "ObservationCount": 0,
                 "ActionCount": 0,*/
            var NCCount = 0;
            var ObservationCount = 0;
            var ActionCount = 0;
            var ActionClientGuidLst = [];

            if (NCObservationList.length > 0) {

                for (var i = 0; i < NCObservationList.length; i++) {

                    if (NCObservationList[i].IsNC == 'true' && DcSummaryConfig.IsNCCountRequired == true) {
                        NCCount = parseInt(NCCount + 1);
                    }
                    if (NCObservationList[i].IsObservation == 'true' && DcSummaryConfig.IsObservationCountRequired == true) {
                        ObservationCount = parseInt(ObservationCount + 1);
                    }
                    if (NCObservationList[i].ActionClientGuid != "" && DcSummaryConfig.IsActionCountRequired == true) {
                        ActionClientGuidLst.push(NCObservationList[i].ActionClientGuid);
                    }
                }
            }

            if (ActionClientGuidLst.length > 0) {
                var ActionCountResult = _oActionDAO.GetActionCountByActionClientGuid(ActionClientGuidLst);
                if (ActionCountResult.length > 0) {
                    ActionCount = parseInt(ActionCount + ActionCountResult[0].ActionCount);
                }
            }


            var Response = { NCCount: NCCount, ObservationCount: ObservationCount, ActionCount: ActionCount };
            //alert(JSON.stringify(Response));
            return Response;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcSummaryBO.GetNCCountObservationCountActionCount", Excep);
        }
    }


    /// <summary>
    /// Get
    /// <param name="Req">Req</param>   
    /// Req={DcId:''}
    /// Response={NACount: 0, ListviewAnswermodeSummary: [{Yes:{ Name: Yes, Count: 3, Color: 'green',Sequence:'1' },No:{ Name: No, Count: 1, Color: 'red',Sequence:'2' }}], OtherAnswermodeSummary: 0}
    /// </summary>
    var GetAnswermodeSummaryCountForDcIdLst = function (Req) {
        try {
            var Response = {
                "NACount": 0,
                "ListviewAnswermodeSummary": [],
                "OtherAnswermodeSummary": 0,
            };
            var OtherInfoCount = 0;
            var ListviewAnswermodeSummary = {};
            var NACount = 0;
            var BandDetailsServerIdLst = [];
            var AllDcResultDetails = {};


            var _oDcDAO = new DcDAO();
            var Result = _oDcDAO.GetDCResultByDCIdLstForLV(Req.DcId);

            
            for (var i = 0; i < Result.length; i++) {
                if (AllDcResultDetails[Result[i].DataCaptureId] == undefined) {
                    AllDcResultDetails[Result[i].DataCaptureId] = [];
                    AllDcResultDetails[Result[i].DataCaptureId].push(Result[i]);
                }
                else {
                    AllDcResultDetails[Result[i].DataCaptureId].push(Result[i]);
                }
            }
            
            for (var DcId in AllDcResultDetails) {
                var DcResultDetails = GetDCByDCId(AllDcResultDetails[DcId]);
                for (var i = 0; i < DcResultDetails.length; i++) {
                    var oAttribute = DcResultDetails[i];

                    for (var j = 0; j < oAttribute.Controls.length; j++) {
                        var oControl = oAttribute.Controls[j];
                        var oFinalAnswer = GetLastUpdatedAnswer(oControl.Answers);

                        if (oFinalAnswer.IsNA == "true") {
                            NACount = parseInt(NACount) + 1;
                            break;
                        }
                        else {
                            if (oFinalAnswer.Answer != "") {
                                //if (oFinalAnswer.AnswerMode == "DCListViewControlConfig" && oFinalAnswer.AnswerFKType == 0) {
                                if (oFinalAnswer.AnswerMode == "DCListViewControlConfig" || (oFinalAnswer.Answer != "" && oFinalAnswer.AnswerValue != "" && oFinalAnswer.AnswerFKType == 39)) {//Need to configure for band only : FKType need to update
                                    if (BandDetailsServerIdLst.indexOf(oFinalAnswer.Answer) == -1) {
                                        BandDetailsServerIdLst.push(oFinalAnswer.Answer);
                                    }
                                    if (ListviewAnswermodeSummary[oFinalAnswer.Answer] == undefined) {
                                        ListviewAnswermodeSummary[oFinalAnswer.Answer] = { Name: oFinalAnswer.AnswerValue, Count: 1, Color: '', Sequence: '' };
                                    }
                                    else {
                                        ListviewAnswermodeSummary[oFinalAnswer.Answer].Count = parseInt(ListviewAnswermodeSummary[oFinalAnswer.Answer].Count + 1);
                                    }
                                }
                                else {
                                    OtherInfoCount = parseInt(OtherInfoCount + 1);
                                }
                            }
                        }

                    }

                }
            }


            if (BandDetailsServerIdLst.length > 0) {
                var _oBandDetailsMasterDAO = new BandDetailsMasterDAO();
                var BandDetailsLst = _oBandDetailsMasterDAO.GetBandDetailsByServerId(BandDetailsServerIdLst);

                if (BandDetailsLst.length > 0) {
                    for (var j = 0; j < BandDetailsLst.length; j++) {

                        ListviewAnswermodeSummary[BandDetailsLst[j].ServerId].Color = BandDetailsLst[j].ColourCode;
                        ListviewAnswermodeSummary[BandDetailsLst[j].ServerId].Sequence = BandDetailsLst[j].Sequence;
                    }

                }

            }

            Response.ListviewAnswermodeSummary.push(ListviewAnswermodeSummary);
            Response.OtherAnswermodeSummary = OtherInfoCount;
            Response.NACount = NACount;
            //alert("Response  :" + JSON.stringify(Response));
            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcSummaryBO.GetNCCountObservationCountActionCount", Excep);
        }
    }


    /*DcSummary For List of DataCapture(Eg: Configured for Periodics templates) End*/
}
