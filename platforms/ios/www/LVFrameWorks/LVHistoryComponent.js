

function LVHistoryComponent() {

    //////////////////////////////**************************Get Attributewise History : START ***********************/////////////////////////////// 
    /// <summary>
    //Gives history 
    //Gives attribute-wise history - based on the metadata set for the attributes
    /// </summary>
    this.GetHistoryValues = function (AttributeNodeId) {
        try {
           
            var oHistoryResponse = [];
            var AttributeWiseMetaData;

            if (LVHistoryConfigMetaData != null)
                AttributeWiseMetaData = LVHistoryConfigMetaData[AttributeNodeId];

            if (AttributeWiseMetaData != undefined)
                oHistoryResponse = GetAttributeWiseHistory(AttributeWiseMetaData, AttributeNodeId);

            return oHistoryResponse;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LVHistoryComponent.GetHistoryValues", Excep);
        }
    }

   
    var GetAttributeWiseHistory = function (AttributeWiseMetaData, AttributeNodeId) {
        try {

            var AttributeWiseHistoryLst = [];
            var AttributeWiseHistory = { "Answer": "", "AnswerValue": "" };

            if (AttributeWiseMetaData.IsOnline == true) {
                alert('GetAttributeWiseHistory IsOnline true: Not Implementation');
            }

            else {

                var PreviousDCValueList = GetPreviousDCValues(AttributeNodeId,AttributeWiseMetaData.HistoryCount)

          
                for (var i = 0; i < PreviousDCValueList.length; i++) {
                    var PreviousDCValue = PreviousDCValueList[i];
                    AttributeWiseHistory.Answer = PreviousDCValue.Answer;
                    AttributeWiseHistory.AnswerValue = PreviousDCValue.AnswerValue;
                    AttributeWiseHistoryLst.push(AttributeWiseHistory);
                }

            }

            //alert('AttributeWiseHistoryLst : ' + JSON.stringify(AttributeWiseHistoryLst));
            return AttributeWiseHistoryLst;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LVHistoryComponent.GetAttributeWiseHistory", Excep);
        }
    }

    var GetPreviousDCValues = function (AttributeNodeId, HistoryCount) {
        try {
            var ServiceId = OneViewSessionStorage.Get("ServiceId");
            var TemplateNodeId = OneViewSessionStorage.Get("TemplateId");
            var DcPlaceId = OneViewSessionStorage.Get("DcPlaceId");
            var DcPlaceDimension = 13;

            if (TemplateNodeId == "153" || TemplateNodeId == 153)
                DcPlaceDimension = -1;
            
            var DcUserId = OneViewSessionStorage.Get("LoginUserId");

            var oPreviousDCValuesDAO = new PreviousDCValuesDAO();
            var PreviousDCValueLst = oPreviousDCValuesDAO.GetAttributeWiseDCs(ServiceId, TemplateNodeId, DcPlaceId, DcPlaceDimension, DcUserId, AttributeNodeId, HistoryCount);

            return PreviousDCValueLst;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LVHistoryComponent.GetPreviousDCValues", Excep);
        }
    }
    //////////////////////////////**************************Get Attributewise History : END ***********************/////////////////////////////// 






    //////////////////////////////**************************Get Attribute and Control wise History : START ***********************/////////////////////////////// 
    //Gives history 
    //Gives attribute-wise history - based on the metadata set for the attributes
    this.GetControlWiseHistoryValues = function (AttributeNodeId , ControlId) {
        try {
            // alert('in GetHistoryComponent');
            var oHistoryResponse = [];
            var AttributeWiseMetaData;

            if (LVHistoryConfigMetaData != undefined)
                AttributeWiseMetaData = LVHistoryConfigMetaData[AttributeNodeId];

            if (AttributeWiseMetaData != undefined)
                oHistoryResponse = GetAttributeControlWiseHistory(AttributeWiseMetaData, AttributeNodeId, ControlId);

            return oHistoryResponse;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LVHistoryComponent.GetHistoryValues", Excep);
        }
    }

    var GetAttributeControlWiseHistory = function (AttributeWiseMetaData, AttributeNodeId, ControlId) {
        try {

            var AttributeControlWiseHistoryLst = [];
            var AttributeControlWiseHistory = { "Answer": "", "AnswerValue": "" };

            if (AttributeWiseMetaData.IsOnline == true) {
                alert('GetAttributeControlWiseHistory IsOnline true: Not Implemented');
            }

            else  {

                var PreviousDCValueList = GetPreviousDCValues(AttributeNodeId, AttributeWiseMetaData.HistoryCount);
                
                if (PreviousDCValueLst != undefined) {
                    var length = 0;

                    for (var i = 0; i < PreviousDCValueList.length; i++) {
                        var PreviousDCValue = PreviousDCValueList[i];
                        if (PreviousDCValue.ControlId == ControlId) {
                            AttributeControlWiseHistory.Answer = PreviousDCValue.Answer;
                            AttributeControlWiseHistory.AnswerValue = PreviousDCValue.AnswerValue;
                            AttributeControlWiseHistoryLst.push(AttributeControlWiseHistory);
                        }
                    }
                }
            }

            //alert('AttributeControlWiseHistoryLst : ' + JSON.stringify(AttributeControlWiseHistoryLst));
            return AttributeControlWiseHistoryLst;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LVHistoryComponent.GetAttributeControlWiseHistory", Excep);
        }
    }

    //////////////////////////////**************************Get Attribute and Control wise History : END ***********************/////////////////////////////// 





    //////////////////////////////**************************Update History : START ***********************/////////////////////////////// 
    /// <summary>
    ///Update History data when any new Dc is created/updated
    /// </summary>
    ///  <param name="DcId">DataCapture Id/param> 
    ///  <param name="DcResultDetailsDict">DcResultDetails List/param> 
    ///  <param name="IsLVEdit">True/False (Edit-True/Create-False Dc)/param> 
    ///  <param name="DcDate">DataCapture Date</param> 
    /// <returns></returns>
    this.UpdateAttributeDCHistory = function (DcId, DcResultDetailsDict, IsLVEdit, DcDate) {
        try {
            
            //alert('UpdateAttributeDCHistory :' + DcId + " IsLVEdit : " + IsLVEdit + " DcResultDetailsList : " + JSON.stringify(DcResultDetailsDict))

            if (DcId != undefined && DcResultDetailsDict != undefined) {
                if (IsLVEdit == false) {
                    //insert or update existing data while new Dc                   
                    UpdateHistoryOnNewDc(DcId, DcResultDetailsDict, DcDate);
                }

                else {
                    //insert or update existing data while editing existing Dc                   
                    UpdateHistoryOnEditDc(DcId, DcResultDetailsDict, DcDate)
                }
            }
        }
        catch (Excep) {
            alert('LVHistoryComponent.UpdateAttributeDCHistory : ' + Excep);
           // throw oOneViewExceptionHandler.Create("Framework", "LVHistoryComponent.UpdateAttributeDCHistory", Excep);
        }
    }

    //////////////////////////////**************************Update History : END ***********************/////////////////////////////// 





    ////////////////////////////*********************Update History While creating new Dc : START *********************//////////////////////////////////

    var UpdateHistoryOnNewDc = function (DcId, DcResultDetailsDict, DcDate) {
        try {
            for (var itrAttributeId in LVDefaultValueConfigMetaData) {

                var DcResultDetailObj = DcResultDetailsDict[itrAttributeId];
               // alert('DcResultDetailObj :' + JSON.stringify(DcResultDetailObj));

                var DefaultValueConfig = LVDefaultValueConfigMetaData[itrAttributeId];

                if (DefaultValueConfig != undefined && DefaultValueConfig != null && DcResultDetailObj != undefined) {
                    if (DefaultValueConfig['-1'] != undefined) {
                       // alert('ControlId : -1')
                        InsertHistoryByControl(DcId, DefaultValueConfig, DcResultDetailObj, '-1', DcDate);
                    }

                    else {
                        for (var i = 0; i < DcResultDetailObj.Answers; i++) {
                            var ControlDetails = DcResultDetailObj.Answers[i];
                            if (ControlDetails.ControlId != undefined && DefaultValueConfig[ControlDetails.ControlId] != undefined) {
                                InsertHistoryByControl(DcId, DefaultValueConfig, DcResultDetailObj, ControlDetails.ControlId, DcDate);
                            }
                        }
                    }
                }
            }
        }
        catch (Excep) {
            alert('LVHistoryComponent.UpdateHistoryOnNewDc : ' + Excep);
            //throw oOneViewExceptionHandler.Create("Framework", "LVHistoryComponent.UpdateHistoryOnNewDc", Excep);
        }
    }

    var InsertHistoryByControl = function (DcId, DefaultValueConfig, DcResultDetailObj, ControlId, DcDate) {
        try {
            var AttributeDCHistoryList;
            if (DefaultValueConfig[ControlId].DefaultValueDimension != DATEntityType.DefaultValueMobileMetaData) {
                var Index = GetIndex();
                var DynamicValueMobileMetaData = DefaultValueConfig[ControlId].DefaultValue[Index];
                if (DynamicValueMobileMetaData.IsOnline == true) {
                    alert('not implemented');
                }

                else if (DynamicValueMobileMetaData.IsOfflineCalculation == true) {
                    var CountOfPreviousDc = 0;
                    AttributeDCHistoryList = LVAttributeDCHistoryMetadata[DcResultDetailObj.Id];
                    // alert('AttributeDCHistoryList :' + JSON.stringify(AttributeDCHistoryList));

                    var AttributeControlDCHistoryList = [];
                    for (var j = 0; j < DcResultDetailObj.Answers.length; j++) {
                        var ControlDetails = DcResultDetailObj.Answers[j];
                        for (var i = 0; i < AttributeDCHistoryList.length; i++) {
                            var AttributeDCHistoryObj = AttributeDCHistoryList[i];
                            if (AttributeDCHistoryObj.ControlId == ControlDetails.ControlId) {
                                CountOfPreviousDc++;
                                AttributeControlDCHistoryList.push(AttributeDCHistoryObj);
                            }
                        }
                        //  alert('AttributeControlDCHistoryList :' + JSON.stringify(AttributeControlDCHistoryList));
                       // alert(DynamicValueMobileMetaData.SampleSize + " , " + CountOfPreviousDc);
                        if (DynamicValueMobileMetaData.SampleSize > CountOfPreviousDc) {
                            var HistoryValueFromDb = InsertHistoryValueInDb(DcId, DcResultDetailObj.Id, ControlDetails, DcDate);
                            AttributeDCHistoryList = InsertHistoryValueInMetaData(DcResultDetailObj.Id, ControlDetails.Answer, ControlDetails.AnswerValue, HistoryValueFromDb.AttributeDCHistoryEntity.Id, ControlId, ControlDetails.ClientId, "0", DcId, AttributeDCHistoryList, DcDate);
                            LVAttributeDCHistoryMetadata[DcResultDetailObj.Id] = AttributeDCHistoryList;
                           // alert('updated metadata' + JSON.stringify(LVAttributeDCHistoryMetadata));
                        }

                        else if (DynamicValueMobileMetaData.SampleSize == CountOfPreviousDc) {
                           // alert('AttributeControlDCHistoryList :' + AttributeControlDCHistoryList.length + "," + JSON.stringify(AttributeControlDCHistoryList));
                            var AtttibuteDimension = 14;
                            var DCIndex = "0";

                            /////////////////////////update in db and metadata
                            //////update history in db
                            AttributeControlDCHistoryList = UpdateHistory(AttributeControlDCHistoryList, ControlDetails, AtttibuteDimension, DcResultDetailObj.Id, DcDate, DcId, DCIndex);
                            //////update history in metadata
                            LVAttributeDCHistoryMetadata[DcResultDetailObj.Id] = AttributeControlDCHistoryList;
                        }
                    }

                }
            }
        }
        catch (Excep) {
            alert('LVHistoryComponent.InsertHistoryByControl : ' + Excep);
            //  throw oOneViewExceptionHandler.Create("Framework", "LVHistoryComponent.InsertHistoryByControl", Excep);
        }
    }

    var GetIndex = function () {

        try {
            var Index = 1;
            return Index;
        }
        catch (Excep) {
            alert('LVHistoryComponent.GetIndex : ' + Excep);
           // throw oOneViewExceptionHandler.Create("Framework", "LVHistoryComponent.GetIndex", Excep);
        }
    }
       
  
  
    var InsertInAttributeDCHistoryEntity = function (DcId,ServiceId, DcPlaceId, DcUserId, TemplateNodeId, CurrenntDateAndTime)
    {
        try {
            OneViewConsole.Debug("InsertInAttributeDCHistoryEntity Start", "LVHistoryComponent.InsertInAttributeDCHistoryEntity");
        
            var oAttributeDCHistoryEntity = new AttributeDCHistoryEntity();
            oAttributeDCHistoryEntity.ServerId = DcId;
            oAttributeDCHistoryEntity.MobileVersionId = 0;
            oAttributeDCHistoryEntity.OVGuid = 0;
            oAttributeDCHistoryEntity.ServiceId = ServiceId;
            oAttributeDCHistoryEntity.DcPlaceId = DcPlaceId;
            oAttributeDCHistoryEntity.DcUserId = DcUserId;
            oAttributeDCHistoryEntity.TemplateNodeId = TemplateNodeId;
            oAttributeDCHistoryEntity.CreatedDate = CurrenntDateAndTime;
            oAttributeDCHistoryEntity.LastsyncDate = CurrenntDateAndTime;
            oAttributeDCHistoryEntity.TimeStamp = CurrenntDateAndTime;

           // alert('AttributeDCHistoryEntity: ' + JSON.stringify(oAttributeDCHistoryEntity));
            var oAttributeDCHistoryDAO = new DefaultMasterDAO("AttributeDCHistoryEntity");
            var CreatedAttributeDCHistoryEntity = oAttributeDCHistoryDAO.CreateMaster(oAttributeDCHistoryEntity);

            OneViewConsole.Debug("InsertInAttributeDCHistoryEntity End", "LVHistoryComponent.InsertInAttributeDCHistoryEntity");

            return CreatedAttributeDCHistoryEntity;

        }
        catch (Excep) {
            alert('LVHistoryComponent.InsertInAttributeDCHistoryEntity : ' + Excep);
          //  throw oOneViewExceptionHandler.Create("Framework", "LVHistoryComponent.InsertInAttributeDCHistoryEntity", Excep);
        }
        finally {
            oAttributeDCHistoryEntity = null;
            oAttributeDCHistoryDAO = null;
            CreatedAttributeDCHistoryEntity = null;
        }
    }

    var InsertInPreviousDCValuesEntity = function (AttributeId, ControlId, DcResultDetailsId, Answer, AnswerValue, AttributeDCHistoryId, CurrenntDateAndTime, DcDate) {
        try {
            OneViewConsole.Debug("InsertInPreviousDCValuesEntity Start", "LVHistoryComponent.InsertInPreviousDCValuesEntity");

            var AtttibuteDimension = "14";
            var oPreviousDCValuesEntity = new PreviousDCValuesEntity();
            //this.Id = "INT PRIMARYKEY";
            //this.ServerId = "TEXT";

            oPreviousDCValuesEntity.MobileVersionId = 0;
            oPreviousDCValuesEntity.OVGuid = 0;

            oPreviousDCValuesEntity.AttributeDCHistoryId = AttributeDCHistoryId;
            oPreviousDCValuesEntity.AttributeId = AttributeId;
            oPreviousDCValuesEntity.AtttibuteDimension = AtttibuteDimension;
            oPreviousDCValuesEntity.ControlId = ControlId;

            oPreviousDCValuesEntity.DcResultDetailsId = DcResultDetailsId;
            oPreviousDCValuesEntity.DCIndex = 0;
            oPreviousDCValuesEntity.DCDate = DcDate;

            oPreviousDCValuesEntity.Answer = Answer;
            oPreviousDCValuesEntity.AnswerValue = AnswerValue;

            oPreviousDCValuesEntity.CreatedDate = CurrenntDateAndTime;
            oPreviousDCValuesEntity.LastsyncDate = CurrenntDateAndTime;
            oPreviousDCValuesEntity.TimeStamp = CurrenntDateAndTime;

            //alert('PreviousDCValuesEntity: ' + JSON.stringify(oPreviousDCValuesEntity));

            var oPreviousDCValuesDAO = new DefaultMasterDAO("PreviousDCValuesEntity");
            var CreatedPreviousDCValuesEntity = oPreviousDCValuesDAO.CreateMaster(oPreviousDCValuesEntity);

            OneViewConsole.Debug("InsertInPreviousDCValuesEntity End", "LVHistoryComponent.InsertInPreviousDCValuesEntity");

            return CreatedPreviousDCValuesEntity;

        }
        catch (Excep) {
            alert('LVHistoryComponent.InsertInPreviousDCValuesEntity : ' + Excep);
            //throw oOneViewExceptionHandler.Create("Framework", "LVHistoryComponent.InsertInPreviousDCValuesEntity", Excep);
        }
        finally {
            oAttributeDCHistoryEntity = null;
            oAttributeDCHistoryDAO = null;
            CreatedAttributeDCHistoryEntity = null;
        }
    }

    var UpdateHistoryInDb = function (params) {
        try {
            var oPreviousDCValuesDAO = new PreviousDCValuesDAO();
            oPreviousDCValuesDAO.Update(params.AttributeDCHistoryId, params.AttributeId, params.Answer, params.AnswerValue)
        }
        catch (Excep) {
            alert('LVHistoryComponent.UpdateHistoryInDb : ' + Excep);
          //  throw oOneViewExceptionHandler.Create("Framework", "LVHistoryComponent.UpdateHistoryInDb", Excep);
        }
    }

    ////////////////////////////*********************Update History While creating new Dc : END *********************//////////////////////////////////





    /////////////////////***********Common API : START***********////////////////////////////

    var InsertHistoryValueInDb = function (DcId, AttributeId, ControlDetails, DcDate) {
        try {

            var ServiceId = OneViewSessionStorage.Get("ServiceId");
            var TemplateNodeId = OneViewSessionStorage.Get("TemplateId");
            var DcPlaceDimension = -1;
            var DcPlaceId = (LVDcPlaceWiseLastDC == 'false') ? -1 : OneViewSessionStorage.Get("DcPlaceId");
            var DcUserId = (LVUserWiseLastDC == 'false') ? -1 : OneViewSessionStorage.Get("LoginUserId");

            //  alert(ServiceId + "," + TemplateNodeId + "," + DcPlaceDimension + "," + DcPlaceId + "," + DcUserId);

            var _DateTime = new DateTime();
            var CurrenntDateAndTime = _DateTime.GetDateAndTime();

            var CreatedAttributeDCHistoryEntity = InsertInAttributeDCHistoryEntity(DcId, ServiceId, DcPlaceId, DcUserId, TemplateNodeId, CurrenntDateAndTime);

            var CreatedPreviousDCValuesEntity = InsertInPreviousDCValuesEntity(AttributeId, ControlDetails.ControlId, ControlDetails.ClientId, ControlDetails.Answer, ControlDetails.AnswerValue, CreatedAttributeDCHistoryEntity.Id, CurrenntDateAndTime, DcDate);

            var Response = { "AttributeDCHistoryEntity": CreatedAttributeDCHistoryEntity, "PreviousDCValuesEntity": CreatedPreviousDCValuesEntity };

            return Response;
        }
        catch (Excep) {
            alert('LVHistoryComponent.InsertHistoryValueInDb : ' + Excep);
            //  throw oOneViewExceptionHandler.Create("Framework", "LVHistoryComponent.InsertHistoryValueInDb", Excep);
        }
    }

    var InsertHistoryValueInMetaData = function (AttributeId, Answer, AnswerValue, AttributeDCHistoryId, ControlId, DcResultDetailsId, DCIndex, DcId, AttributeDCHistoryList, DcDate) {
        try {
            // alert('InsertHistoryValueInMetaData :' + AttributeDCHistoryList.length);
            var _DateTime = new DateTime();
            var CurrenntDateAndTime = _DateTime.GetDateAndTime();
            var AtttibuteDimension = "14";

            AttributeDCHistoryList.push({
                "AttributeDCHistoryId": AttributeDCHistoryId,
                "AttributeId": AttributeId,
                "AtttibuteDimension": AtttibuteDimension,
                "ControlId": ControlId,
                "DcResultDetailsId": DcResultDetailsId,
                "DCIndex": DCIndex,
                "DCDate": DcDate,
                "Answer": Answer,
                "AnswerValue": AnswerValue,
                "DcId": DcId,
                "TimeStamp": CurrenntDateAndTime
            });

            alert('AttributeDCHistoryList :' + AttributeDCHistoryList.length + "," + JSON.stringify(AttributeDCHistoryList));
            return AttributeDCHistoryList;
        }
        catch (Excep) {
            alert('LVHistoryComponent.InsertHistoryValueInMetaData : ' + Excep);
            // throw oOneViewExceptionHandler.Create("Framework", "LVHistoryComponent.InsertHistoryValueInMetaData", Excep);
        }
    }
    
    var UpdateHistory = function (AttributeControlDCHistoryList, ControlDetails, AtttibuteDimension, AttributeId, DcDate, DcId, DCIndex) {
        try {

            var AttributeControlDCHistoryObj = AttributeControlDCHistoryList["0"];
            var ServiceId = OneViewSessionStorage.Get("ServiceId");
            var TemplateNodeId = OneViewSessionStorage.Get("TemplateId");
            var DcPlaceDimension = -1;
            var DcPlaceId = (LVDcPlaceWiseLastDC == 'false') ? -1 : OneViewSessionStorage.Get("DcPlaceId");
            var DcUserId = (LVUserWiseLastDC == 'false') ? -1 : OneViewSessionStorage.Get("LoginUserId");


            //UpdateHistory in db
            //Update AttributeDCHistoryEntity
            var oAttributeDCHistoryDAO = new AttributeDCHistoryDAO();
            oAttributeDCHistoryDAO.Update(AttributeControlDCHistoryObj.AttributeDCHistoryId, DcId, ServiceId, DcPlaceId, DcUserId, TemplateNodeId);

            //Update PreviousDCValuesEntity
            var oPreviousDCValuesDAO = new PreviousDCValuesDAO();
            oPreviousDCValuesDAO.UpdateAllColumns(AttributeControlDCHistoryObj.AttributeDCHistoryId, AttributeId, AtttibuteDimension, ControlDetails.ControlId, ControlDetails.ClientId,
                                                    DCIndex, DcDate, ControlDetails.Answer, ControlDetails.AnswerValue);


            //UpdateHistory in metadata
            AttributeControlDCHistoryList["0"].AttributeId = AttributeId;
            AttributeControlDCHistoryList["0"].AtttibuteDimension = AtttibuteDimension;
            AttributeControlDCHistoryList["0"].AttributeId = ControlDetails.ControlId;
            AttributeControlDCHistoryList["0"].DcResultDetailsId = ControlDetails.ClientId;
            AttributeControlDCHistoryList["0"].DCIndex = DCIndex;
            AttributeControlDCHistoryList["0"].DCDate = DcDate;
            AttributeControlDCHistoryList["0"].Answer = ControlDetails.Answer;
            AttributeControlDCHistoryList["0"].AnswerValue = ControlDetails.AnswerValue;
            AttributeControlDCHistoryList["0"].DcId = DcId;

            //return updated list to save in global variable
            return AttributeControlDCHistoryList;
        }
        catch (Excep) {
            alert('LVHistoryComponent.UpdateHistory : ' + Excep);
            //  throw oOneViewExceptionHandler.Create("Framework", "LVHistoryComponent.UpdateHistory", Excep);
        }
    }

    /////////////////////***********Common API : END***********////////////////////////////






    ////////////////////////////**************************Update History While edit existing Dc (Sync/Not Sync) : START ***************************//////////////////////////////////

    var UpdateHistoryOnEditDc = function (DcId, DcResultDetailsDict, DcDate) {
        try {
            for (var itrAttributeId in LVDefaultValueConfigMetaData) {

                var DcResultDetailObj = DcResultDetailsDict[itrAttributeId];


                var AttributeWiseDCHistoryList = LVAttributeDCHistoryMetadata[itrAttributeId];
                var DefaultValueConfig = LVDefaultValueConfigMetaData[itrAttributeId];

                if (DefaultValueConfig != undefined && DefaultValueConfig != null && DcResultDetailObj != undefined) {
                    if (DefaultValueConfig['-1'] != undefined) {
                        // alert('ControlId : -1')
                        InsertByControlOnEdit(DcId, DefaultValueConfig, DcResultDetailObj, '-1', DcDate);
                    }

                    else {
                        for (var i = 0; i < DcResultDetailObj.Answers; i++) {
                            var ControlDetails = DcResultDetailObj.Answers[i];
                            if (ControlDetails.ControlId != undefined && DefaultValueConfig[ControlDetails.ControlId] != undefined) {
                                InsertByControlOnEdit(DcId, DefaultValueConfig, DcResultDetailObj, ControlDetails.ControlId, DcDate);
                            }
                        }
                    }
                }
            }
        }
        catch (Excep) {
            alert('LVHistoryComponent.UpdateHistoryOnEditDc : ' + Excep);
            //  throw oOneViewExceptionHandler.Create("Framework", "LVHistoryComponent.UpdateHistoryOnEditDc", Excep);
        }
    }

    var InsertByControlOnEdit = function (DcId, DefaultValueConfig, DcResultDetailObj, ControlId, DcDate) {
        try {
            var AttributeDCHistoryList;
            if (DefaultValueConfig[ControlId].DefaultValueDimension != DATEntityType.DefaultValueMobileMetaData) {
                var Index = GetIndex();
                var DynamicValueMobileMetaData = DefaultValueConfig[ControlId].DefaultValue[Index];
                if (DynamicValueMobileMetaData.IsOnline == true) {
                    alert('not implemented');
                }

                else if (DynamicValueMobileMetaData.IsOfflineCalculation == true) {
                    var CountOfPreviousDc = 0;
                    AttributeDCHistoryList = LVAttributeDCHistoryMetadata[DcResultDetailObj.Id];
                    // alert('AttributeDCHistoryList :' + JSON.stringify(AttributeDCHistoryList));

                    var AttributeControlDCHistoryList = [];
                    var IsDcPresent = false;
                    for (var j = 0; j < DcResultDetailObj.Answers.length; j++) {
                        var ControlDetails = DcResultDetailObj.Answers[j];
                        for (var i = 0; i < AttributeDCHistoryList.length; i++) {
                            var AttributeDCHistoryObj = AttributeDCHistoryList[i];
                            if (AttributeDCHistoryObj.ControlId == ControlDetails.ControlId) {
                                CountOfPreviousDc++;
                                AttributeControlDCHistoryList.push(AttributeDCHistoryObj);
                            }

                            if (AttributeDCHistoryObj.DcId == DcId)
                                IsDcPresent = true;
                        }


                        if (IsDcPresent == true) {
                            var AtttibuteDimension = 14;
                            var DCIndex = "0";

                            ////************update in db and metadata
                            //////update history in db
                            AttributeControlDCHistoryList = UpdateHistory(AttributeControlDCHistoryList, ControlDetails, AtttibuteDimension, DcResultDetailObj.Id, DcDate, DcId, DCIndex);
                            //////update history in metadata
                            LVAttributeDCHistoryMetadata[DcResultDetailObj.Id] = AttributeControlDCHistoryList;
                        }

                        else {

                            //  alert('AttributeControlDCHistoryList :' + JSON.stringify(AttributeControlDCHistoryList));
                            // alert(DynamicValueMobileMetaData.SampleSize + " , " + CountOfPreviousDc);
                            if (DynamicValueMobileMetaData.SampleSize > CountOfPreviousDc) {
                                var HistoryValueFromDb = InsertHistoryValueInDb(DcId, DcResultDetailObj.Id, ControlDetails, DcDate);
                                AttributeDCHistoryList = InsertHistoryValueInMetaData(DcResultDetailObj.Id, ControlDetails.Answer, ControlDetails.AnswerValue, HistoryValueFromDb.AttributeDCHistoryEntity.Id, ControlId, ControlDetails.ClientId, "0", DcId, AttributeDCHistoryList, DcDate);
                                LVAttributeDCHistoryMetadata[DcResultDetailObj.Id] = AttributeDCHistoryList;
                                // alert('updated metadata' + JSON.stringify(LVAttributeDCHistoryMetadata));
                            }

                            else if (DynamicValueMobileMetaData.SampleSize == CountOfPreviousDc) {
                                // alert('AttributeControlDCHistoryList :' + AttributeControlDCHistoryList.length + "," + JSON.stringify(AttributeControlDCHistoryList));
                                var AtttibuteDimension = 14;
                                var DCIndex = "0";

                                ////************update in db and metadata
                                //////update history in db
                                AttributeControlDCHistoryList = UpdateHistory(AttributeControlDCHistoryList, ControlDetails, AtttibuteDimension, DcResultDetailObj.Id, DcDate, DcId, DCIndex);
                                //////update history in metadata
                                LVAttributeDCHistoryMetadata[DcResultDetailObj.Id] = AttributeControlDCHistoryList;
                            }
                        }
                    }

                }
            }
        }
        catch (Excep) {
            alert('LVHistoryComponent.InsertByControlOnEdit : ' + Excep);
            //  throw oOneViewExceptionHandler.Create("Framework", "LVHistoryComponent.InsertByControlOnEdit", Excep);
        }
    }

 
    ////////////////////////////**************************Update History While edit existing Dc (Sync/Not Sync) : END ***************************//////////////////////////////////

}