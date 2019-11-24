

var QaaS_LastDcValue_DcResultDetails = null;
//Form AttributeDCHistoryMetaData from AttributeDCHistoryEntity and PreviousDCValuesEntity
function AttributeDCHistoryMetaData()
{

    //For testing /////////////////////////Start
    var CreatePreviousDCValuesEntityList = function () {

        var PreviousDCValuesLst = [];

        var obj1 = {
            "Id": "1", "ServerId": "1", "MobileVersionId": "V1", "OVGuid": "", "AttributeDCHistoryId": "1", "AttributeId": "168", "AtttibuteDimension": "10", "ControlId": "-1",
            "DcResultDetailsId": "1", "DCIndex": "1", "DCDate": "11-04-2014", "Answer": "1", "AnswerValue": "Yes", "CreatedDate": "11-04-2014", "LastsyncDate": "12-04-2014", "TimeStamp": "12-04-2014"
        }
        var obj2 = {
            "Id": "2", "ServerId": "2", "MobileVersionId": "V1", "OVGuid": "", "AttributeDCHistoryId": "2", "AttributeId": "168", "AtttibuteDimension": "10", "ControlId": "-1",
            "DcResultDetailsId": "2", "DCIndex": "2", "DCDate": "11-04-2014", "Answer": "1", "AnswerValue": "Yes", "CreatedDate": "11-04-2014", "LastsyncDate": "12-04-2014", "TimeStamp": "12-04-2014"
        }
        var obj3 = {
            "Id": "3", "ServerId": "3", "MobileVersionId": "V1", "OVGuid": "", "AttributeDCHistoryId": "3", "AttributeId": "168", "AtttibuteDimension": "10", "ControlId": "-1",
            "DcResultDetailsId": "3", "DCIndex": "3", "DCDate": "11-04-2014", "Answer": "2", "AnswerValue": "No", "CreatedDate": "11-04-2014", "LastsyncDate": "12-04-2014", "TimeStamp": "12-04-2014"
        }

        var obj5 = {
            "Id": "5", "ServerId": "5", "MobileVersionId": "V1", "OVGuid": "", "AttributeDCHistoryId": "5", "AttributeId": "168", "AtttibuteDimension": "10", "ControlId": "2",
            "DcResultDetailsId": "5", "DCIndex": "5", "DCDate": "11-04-2014", "Answer": "2", "AnswerValue": "No", "CreatedDate": "11-04-2014", "LastsyncDate": "12-04-2014", "TimeStamp": "12-04-2014"
        }
      
        var obj4 = {
            "Id": "4", "ServerId": "4", "MobileVersionId": "V1", "OVGuid": "", "AttributeDCHistoryId": "4", "AttributeId": "168", "AtttibuteDimension": "10", "ControlId": "2",
            "DcResultDetailsId": "4", "DCIndex": "4", "DCDate": "11-04-2014", "Answer": "2", "AnswerValue": "No", "CreatedDate": "11-04-2014", "LastsyncDate": "12-04-2014", "TimeStamp": "12-04-2014"
        }
        var obj6 = {
            "Id": "6", "ServerId": "6", "MobileVersionId": "V1", "OVGuid": "", "AttributeDCHistoryId": "6", "AttributeId": "168", "AtttibuteDimension": "10", "ControlId": "2",
            "DcResultDetailsId": "6", "DCIndex": "6", "DCDate": "11-04-2014", "Answer": "2", "AnswerValue": "No", "CreatedDate": "11-04-2014", "LastsyncDate": "12-04-2014", "TimeStamp": "12-04-2014"
        }

        var obj7 = {
            "Id": "7", "ServerId": "7", "MobileVersionId": "V1", "OVGuid": "", "AttributeDCHistoryId": "7", "AttributeId": "171", "AtttibuteDimension": "10", "ControlId": "2",
            "DcResultDetailsId": "7", "DCIndex": "6", "DCDate": "11-04-2014", "Answer": "1", "AnswerValue": "Yes", "CreatedDate": "11-04-2014", "LastsyncDate": "12-04-2014", "TimeStamp": "12-04-2014"
        }
        PreviousDCValuesLst.push(obj1);
        PreviousDCValuesLst.push(obj2);
        PreviousDCValuesLst.push(obj3);
        PreviousDCValuesLst.push(obj4);
        PreviousDCValuesLst.push(obj5);
        PreviousDCValuesLst.push(obj6);
        PreviousDCValuesLst.push(obj7);

        return PreviousDCValuesLst;
    }
    //For testing /////////////////////////End

    /// <summary>
    //Gives LVAttributeDCHistoryMetadata
    /// </summary>
    this.Get = function (ServiceId, DcPlaceId, DcPlaceDimension, DcUserId) {
        try {

            var TemplateNodeId = OneViewSessionStorage.Get("TemplateId");

            // alert('ServiceId :' + ServiceId + "," + 'DcPlaceId :' + DcPlaceId + "," + 'DcUserId :' + DcUserId + "," + 'TemplateNodeId :' + TemplateNodeId);

            var PreviousDCValuesLst;
            var oAttributeDCHistoryDAO = new AttributeDCHistoryDAO();

            ///todo: rename to getdata
            PreviousDCValuesLst = oAttributeDCHistoryDAO.GetMetaData(ServiceId, DcPlaceId, DcPlaceDimension, DcUserId, TemplateNodeId);
            
            var OutputDictionary = {};
            var ValueArray = [];
            var TempNode;

            if (PreviousDCValuesLst != null) {
                TempNode = PreviousDCValuesLst[0].AttributeId;

                for (var i = 0; i < PreviousDCValuesLst.length; i++) {

                    if (PreviousDCValuesLst[i].AttributeId == TempNode) {
                        ValueArray.push({
                            "Id": PreviousDCValuesLst[i].Id,
                            "AttributeDCHistoryId": PreviousDCValuesLst[i].AttributeDCHistoryId,
                            "AttributeId": PreviousDCValuesLst[i].AttributeId,
                            "AtttibuteDimension": PreviousDCValuesLst[i].AtttibuteDimension,
                            "ControlId": PreviousDCValuesLst[i].ControlId,
                            "DcResultDetailsId": PreviousDCValuesLst[i].DcResultDetailsId,
                            "DCIndex": PreviousDCValuesLst[i].DCIndex,
                            "DCDate": PreviousDCValuesLst[i].DCDate,
                            "Answer": PreviousDCValuesLst[i].Answer,
                            "AnswerValue": PreviousDCValuesLst[i].AnswerValue,
                            "DcId": PreviousDCValuesLst[i].ServerId
                        });
                    }
                    else {
                        //  OutputDictionary[TempNode] = ValueArray;
                        ValueArray = [];
                        ValueArray.push({
                            "Id": PreviousDCValuesLst[i].Id,
                            "AttributeDCHistoryId": PreviousDCValuesLst[i].AttributeDCHistoryId,
                            "AttributeId": PreviousDCValuesLst[i].AttributeId,
                            "AtttibuteDimension": PreviousDCValuesLst[i].AtttibuteDimension,
                            "ControlId": PreviousDCValuesLst[i].ControlId,
                            "DcResultDetailsId": PreviousDCValuesLst[i].DcResultDetailsId,
                            "DCIndex": PreviousDCValuesLst[i].DCIndex,
                            "DCDate": PreviousDCValuesLst[i].DCDate,
                            "Answer": PreviousDCValuesLst[i].Answer,
                            "AnswerValue": PreviousDCValuesLst[i].AnswerValue,
                            "DcId": PreviousDCValuesLst[i].ServerId
                        });
                        TempNode = PreviousDCValuesLst[i].AttributeId;
                        OutputDictionary[TempNode] = ValueArray;
                    }
                    OutputDictionary[TempNode] = ValueArray;
                };
            }
            //alert('OutputDictionary: ' + JSON.stringify(OutputDictionary));
            return OutputDictionary;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "AttributeDCHistoryMetaData.Get", Excep);
        }

    }

}

function AttributeDCHistoryData () {

    this.GetDCs = function (ServiceId, TemplateId, DcPlaceId, DcPlaceDimension, DcUserId, AttributeList, HistoryCount) {
        try {
            var oPreviousDCValuesDAO = new PreviousDCValuesDAO();
            var AttributeDCHistoryDataList = oPreviousDCValuesDAO.GetDCs(ServiceId, TemplateId, DcPlaceId, DcPlaceDimension, DcUserId, AttributeList, HistoryCount);

            return AttributeDCHistoryDataList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "AttributeDCHistoryData.Get", Excep);
        }
    }

    this.GetAttributeWiseDCs = function (ServiceId, TemplateId, DcPlaceId, DcPlaceDimension, DcUserId,AttributeNodeId, HistoryCount) {
        try {
            var oPreviousDCValuesDAO = new PreviousDCValuesDAO();
            var AttributeDCHistoryDataList = oPreviousDCValuesDAO.GetDCs(ServiceId, TemplateId, DcPlaceId, DcPlaceDimension, DcUserId, AttributeNodeId, HistoryCount);

            return AttributeDCHistoryDataList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "AttributeDCHistoryData.GetAttributeWiseDCs", Excep);
        }
    }
}

//Gives DefaultValue : Based on metadata configured
function LVDefaultValueComponent() {


    //////////////////////////////////////////////////////////******************************Default Value Start********************************/////////////////////////////////////////////////////////////////////////////

    //op ex://var s = { 1 //AttributeNodeId: { 'txtName' //ControlId: { Answer: '', AnswerValue: '', AttributeNodeId: '', ControlId: '' } }, 2: { 'txtPhone': { Answer: '', AnswerValue: '', AttributeNodeId: '', ControlId: '' } } }  
    /// <summary>
    //Get default value for particular AttributeNodeId and ControlId and returns Default Value Dictionary
    /// </summary>
    ///  <param name="TemplateNodes">List of TemplateNodes for particular template/param> 
    ///  <param name="Start">start value</param> 
    ///  <param name="End">End value</param> 
    ///  <param name="TemplateId">Template Node Id for selected template</param> 
    ///  <param name="LVBreadCrumbDetails"></param> 
    ///  <param name="LoadedAttributeNodes"></param> 
    /// <returns>Default Value </returns>  
    this.GetDefaultValueExtended = function (TemplateNodes,TemplateId, Start, End,  LVBreadCrumbDetails, LoadedAttributeNodes) {
        try {
            var DefaultValueConfigResponseList = [];
            var DefaultValueConfigResponse = { "Answer": "", "AnswerValue": "", "IsAllControls": "" };
            var DefaultValueResponseDict = [];

            if (LVDefaultValueConfigMetaData != undefined) {
                //Check any config , available for template
                var DefaultValueConfig = LVDefaultValueConfigMetaData[TemplateId];
                var DefaultValueConfigList = [];
                var AttributeMasterList = [];

                if (LoadedAttributeNodes == undefined)
                    LoadedAttributeNodes = TemplateNodes;

                //if config not available for template
                if (DefaultValueConfig == undefined && LVBreadCrumbDetails != undefined) {
                    for (var i = 0; i < LVBreadCrumbDetails.length; i++) {
                        DefaultValueConfig = LVDefaultValueConfigMetaData[LVBreadCrumbDetails[i].AttributeGroupId];
                        if (DefaultValueConfig != undefined)
                            break;
                    }

                    if (DefaultValueConfig != undefined) {
                        var count = 0;
                        DefaultValueConfigList = [];
                        DefaultValueConfigList.push(DefaultValueConfig);
                        AttributeMasterList = [];
                        if (Start != undefined && End != undefined) {
                            for (var i = Start; i < End; i++) {
                                var AttributeNodeDetails = LoadedAttributeNodes[i];
                                if (AttributeNodeDetails != undefined) {
                                    if (AttributeNodeDetails.DATEntityType == DATEntityType.Attribute_Master) {
                                        AttributeMasterList.push(AttributeNodeDetails);
                                    }
                                }
                            }
                        }

                        else {
                            for (var itrAttributeNodeId in LoadedAttributeNodes) {
                                var AttributeNodeDetails = LoadedAttributeNodes[itrAttributeNodeId];
                                if (AttributeNodeDetails != undefined) {
                                    if (AttributeNodeDetails.DATEntityType == DATEntityType.Attribute_Master) {
                                        AttributeMasterList.push(AttributeNodeDetails);
                                    }
                                }
                            }
                        }
                        //Call default value component 
                        DefaultValueResponseDict = CheckDefaultValue(DefaultValueConfigList, AttributeMasterList);
                    }
                }

                //if config not available for template and LVBreadCrumbDetails is also empty,           
                if (DefaultValueConfig == undefined) {
                    DefaultValueConfigList = [];
                    //Take all loaded attributes(type 'Attribute_Master') in page
                    AttributeMasterList = [];
                    if (Start != undefined && End != undefined) {
                        for (var i = Start; i < End; i++) {
                            //Take each loaded attribute node
                            var AttributeNodeDetails = LoadedAttributeNodes[i];

                            if (AttributeNodeDetails != undefined) {
                                //Check if loaded node is of type 'Attribute_Master'
                                if (AttributeNodeDetails.DATEntityType == DATEntityType.Attribute_Master) {
                                    //Check any config available for particular attribute
                                    DefaultValueConfig = LVDefaultValueConfigMetaData[AttributeNodeDetails.Id];
                                    if (DefaultValueConfig != undefined) {
                                        //push config in DefaultValueConfigList and attribute in AttributeMasterList
                                        DefaultValueConfigList.push(DefaultValueConfig);
                                        AttributeMasterList.push(AttributeNodeDetails);
                                    }
                                }
                            }
                        }
                    }
                    else {
                        for (var itrAttributeNodeId in LoadedAttributeNodes) {
                            var AttributeNodeDetails = LoadedAttributeNodes[itrAttributeNodeId];
                            if (AttributeNodeDetails != undefined) {
                                if (AttributeNodeDetails.DATEntityType == DATEntityType.Attribute_Master) {
                                    DefaultValueConfig = LVDefaultValueConfigMetaData[AttributeNodeDetails.Id];
                                    if (DefaultValueConfig != undefined) {
                                        DefaultValueConfigList.push(DefaultValueConfig);
                                        AttributeMasterList.push(AttributeNodeDetails);
                                    }
                                }
                            }
                        }
                    }
                    if (DefaultValueConfigList.length > 0)
                        DefaultValueResponseDict = CheckDefaultValue(DefaultValueConfigList, AttributeMasterList);
                }
            }
            return DefaultValueResponseDict;
        }
        catch (Excep) {
            //alert('GetDefaultValueExtended:' + Excep);
            throw oOneViewExceptionHandler.Create("Framework", "LVDefaultValueComponent.GetDefaultValueExtended", Excep);
        }
    }

    // <summary>
    ///Checks for configuration given for particular AttributeNodeId and ControlId  and returns default value
    /// </summary>
    ///  <param name="DefaultValueConfigList">List of DefaultValue configuration/param> 
    ///  <param name="AttributeMasterList">List of Attributes</param> 
    /// <returns>Default Value Dictionary</returns>  
    var CheckDefaultValue = function (DefaultValueConfigList, AttributeMasterList) {
        try {
            var DefaultValueResponseDict = {};
            var PreviousDCValueLst = [];
            var MaxHistoryCount = 0;
            MaxHistoryCount = GetMaxHistoryCount(DefaultValueConfigList, AttributeMasterList);
            if (MaxHistoryCount > 0)
                PreviousDCValueLst = GetPreviousDCValueLst(AttributeMasterList, MaxHistoryCount);

            PreviousDCValueLst=  getLatestValue(PreviousDCValueLst);
            DefaultValueResponseDict = CalculateDefaultValue(MaxHistoryCount, DefaultValueConfigList, AttributeMasterList, PreviousDCValueLst)
            return DefaultValueResponseDict;
        }
        catch (Excep) {
            // alert('CheckDefaultValue Excep :' + JSON.stringify(Excep) + " -------------" + Excep);
            throw oOneViewExceptionHandler.Create("Framework", "LVDefaultValueComponent.CheckDefaultValue", Excep);
        }
    }

    //Gives max history count to fetch from db;
    var GetMaxHistoryCount = function (DefaultValueConfigList, AttributeMasterList) {
        try {
            var MaxHistoryCount = 0;
            if (DefaultValueConfigList.length > 1) {
                for (var j = 0; j < DefaultValueConfigList.length; j++) {
                    var DefaultValueConfig = DefaultValueConfigList[j];
                    if (DefaultValueConfig != undefined && DefaultValueConfig != null) {
                        if (DefaultValueConfig['-1'] != undefined) {
                            if (DefaultValueConfig['-1'].DefaultValueDimension != DATEntityType.DefaultValueMobileMetaData) {

                                //check most common value metadata
                                Index = GetDefaultValueIndex();
                                var oDynamicValueMobileMetaData = DefaultValueConfig['-1'].DefaultValue[Index];
                                if (oDynamicValueMobileMetaData != undefined) {
                                    if (MaxHistoryCount < oDynamicValueMobileMetaData.SampleSize)
                                        MaxHistoryCount = oDynamicValueMobileMetaData.SampleSize;
                                }
                            }
                        }
                        else {
                            var AttributeNodeDetails = AttributeMasterList[j];
                            if (AttributeNodeDetails != undefined) {
                                var ControlId;
                                var ControlList = [];
                                ////Get list of controls for particular attribute(Attribute_Master)
                                ControlList = AttributeNodeDetails.AnswerMode;
                                for (var i = 0; i < ControlList.length; i++) {
                                    ControlId = ControlList[i].ControlId;
                                   
                                    if (ControlId != undefined && DefaultValueConfig[ControlId] != undefined) {
                                        if (DefaultValueConfig[ControlId].DefaultValueDimension != DATEntityType.DefaultValueMobileMetaData) {
                                            Index = GetDefaultValueIndex();
                                            var oDynamicValueMobileMetaData = DefaultValueConfig[ControlId].DefaultValue[Index];
                                            if (oDynamicValueMobileMetaData != undefined) {
                                                if (MaxHistoryCount < oDynamicValueMobileMetaData.SampleSize)
                                                    MaxHistoryCount = oDynamicValueMobileMetaData.SampleSize;
                                            }

                                        }
                                    }
                                }

                            }
                        }

                    }
                }
            }

            else if (DefaultValueConfigList.length == 1) {
                var DefaultValueConfig = DefaultValueConfigList[0];

                if (DefaultValueConfig != undefined && DefaultValueConfig != null) {
                    if (DefaultValueConfig['-1'] != undefined) {
                        if (DefaultValueConfig['-1'].DefaultValueDimension != DATEntityType.DefaultValueMobileMetaData) {
                            //check most common value metadata
                            Index = GetDefaultValueIndex();
                            var oDynamicValueMobileMetaData = DefaultValueConfig['-1'].DefaultValue[Index];
                            if (oDynamicValueMobileMetaData != undefined) {
                                if (MaxHistoryCount < oDynamicValueMobileMetaData.SampleSize)
                                    MaxHistoryCount = oDynamicValueMobileMetaData.SampleSize;
                            }
                        }
                    }

                    else {
                        for (var k = 0; k < AttributeMasterList.length; k++) {
                            var AttributeNodeDetails = AttributeMasterList[k];
                            if (AttributeNodeDetails != undefined) {
                                var ControlId;
                                var ControlList = [];
                                ////Get list of controls for particular attribute(Attribute_Master)
                                ControlList = AttributeNodeDetails.AnswerMode; //need to do change AnswerMode to AnswerModes
                                for (var n = 0; n < ControlList.length; n++) {
                                    ControlId = ControlList[n].ControlId;
                                    if (ControlId != undefined && DefaultValueConfig[ControlId] != undefined) {
                                        if (DefaultValueConfig[ControlId].DefaultValueDimension != DATEntityType.DefaultValueMobileMetaData) {

                                            Index = GetDefaultValueIndex();
                                            var oDynamicValueMobileMetaData = DefaultValueConfig[ControlId].DefaultValue[Index];
                                            if (oDynamicValueMobileMetaData != undefined) {
                                                if (MaxHistoryCount < oDynamicValueMobileMetaData.SampleSize)
                                                    MaxHistoryCount = oDynamicValueMobileMetaData.SampleSize;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            return MaxHistoryCount;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LVDefaultValueComponent.GetMaxHistoryCount", Excep);
        }
    }

    //Calculates defaultvalue based on list of configuration passed
    var CalculateDefaultValue = function (MaxHistoryCount, DefaultValueConfigList, AttributeMasterList, PreviousDCValueLst) {
        try {
            var DefaultValueResponseDict = {};
            var TempResponseList = [];
            var DefaultValueResponse = { "Answer": "", "AnswerValue": "", "AttributeId": "", "ControlId": "" };

            if (DefaultValueConfigList.length > 1) {
                for (var j = 0; j < DefaultValueConfigList.length; j++) {
                    var tempList = [];
                    var DefaultValueConfig = DefaultValueConfigList[j];
                    tempList.push(AttributeMasterList[j]);
                    TempResponseList = GetAttributeControlWiseValue(DefaultValueConfig, tempList, PreviousDCValueLst);
                    //if control id is -1, have to form list for each control and attribute
                    DefaultValueResponseDict = FormDefaultValueResponseDict(DefaultValueResponseDict, TempResponseList, tempList);
                    // alert('DefaultValueResponseDict 1 vvv :' + JSON.stringify(DefaultValueResponseDict));

                }
            }
            else if (DefaultValueConfigList.length == 1) {
                var DefaultValueConfig = DefaultValueConfigList[0];
                TempResponseList = GetAttributeControlWiseValue(DefaultValueConfig, AttributeMasterList, PreviousDCValueLst);
                DefaultValueResponseDict = FormDefaultValueResponseDict(DefaultValueResponseDict, TempResponseList, AttributeMasterList);
                // alert('DefaultValueResponseDict here :' + JSON.stringify(DefaultValueResponseDict));
            }

            return DefaultValueResponseDict;
        }
        catch (Excep) {
            //alert('CalculateDefaultValue Excep: ' + JSON.stringify(Excep) + " -------------" + Excep);
            throw oOneViewExceptionHandler.Create("Framework", "LVDefaultValueComponent.CalculateDefaultValue", Excep);
        }
    }

    //Gives previous dc data from Dcresultdetails for list of attributes
    var GetPreviousDCValueLst = function (AttributeMasterList, HistoryCount) {
        try {
            var ServiceId = OneViewSessionStorage.Get("ServiceId");
            var TemplateId = OneViewSessionStorage.Get("TemplateId");
            var DcPlaceId;
            var DcPlaceDimension;
            var DcUserId;
            var TemplateNodeId = OneViewSessionStorage.Get("TemplateId");

            if (LVUserWiseLastDC == false || LVUserWiseLastDC == 'false') {
                DcUserId = -1;
            }
            else {
                DcUserId = OneViewSessionStorage.Get("LoginUserId");
            }


            if (LVDcPlaceWiseLastDC == false || LVDcPlaceWiseLastDC == 'false') {
                DcPlaceId = -1;
                DcPlaceDimension = -1;
            }
            else {
                DcPlaceId = OneViewSessionStorage.Get("DcPlaceId");
                DcPlaceDimension = -1;
            }

             //alert(ServiceId + "," + TemplateId + "," + DcPlaceId + "," + DcPlaceDimension + "," + DcUserId + "," + HistoryCount + "," + JSON.stringify(AttributeMasterList))

            var oPreviousDCValuesDAO = new PreviousDCValuesDAO();
            var PreviousDCValueLst = oPreviousDCValuesDAO.GetDCs(ServiceId, TemplateId, DcPlaceId, DcPlaceDimension, DcUserId, AttributeMasterList, HistoryCount);

           // alert('PreviousDCValueLst: ' + PreviousDCValueLst.length + JSON.stringify(PreviousDCValueLst))
            return PreviousDCValueLst;
        }
        catch (Excep) {
            throw Excep;
        }
    }

    //checks for DefaultValueConfig passed and returns the default value for particular control and attribute
    var GetAttributeControlWiseValue = function (DefaultValueConfig, AttributeMasterList, PreviousDCValueLst) {
        try {
            var DefaultValueResponse = { "Answer": "", "AnswerValue": "", "AttributeId": "", "ControlId": "" };
            var DynamicDefaultValueResponse = { "Answer": "", "AnswerValue": "" };
            var DefaultValueConfigResponseDict = [];

            var Index = 1;

            if (DefaultValueConfig != undefined && DefaultValueConfig != null) {
                if (DefaultValueConfig['-1'] != undefined) {
                    //Check static metadata
                    if (DefaultValueConfig['-1'].DefaultValueDimension == DATEntityType.DefaultValueMobileMetaData) {
                        DefaultValueResponse.Answer = DefaultValueConfig['-1'].DefaultValue[Index].Answer;
                        DefaultValueResponse.AnswerValue = DefaultValueConfig['-1'].DefaultValue[Index].AnswerValue;
                        DefaultValueResponse.ControlId = '-1';
                        DefaultValueConfigResponseDict.push(DefaultValueResponse);
                    }
                    else {
                        //check most common value metadata
                        Index = GetDefaultValueIndex();
                        var oDynamicValueMobileMetaData = DefaultValueConfig['-1'].DefaultValue[Index];
                        DefaultValueConfigResponseDict = GetAttributeWiseDynamicValue(oDynamicValueMobileMetaData, PreviousDCValueLst, AttributeMasterList)
                    }
                }
                else {
                    //Check for the configuration control-wise
                    var ControlId;
                    var AttributeId;
                    var AttributeNodeDetails;
                    for (var i = 0; i < AttributeMasterList.length; i++) {
                        AttributeNodeDetails = AttributeMasterList[i];
                        AttributeId = AttributeNodeDetails.Id;
                        var ControlList = [];
                        ////Get list of controls for particular attribute(Attribute_Master)
                        ControlList = AttributeNodeDetails.AnswerMode; //Need to change AnswerMode to AnswerModes
                        for (var j = 0; j < ControlList.length; j++) {
                            ControlId = ControlList[j].ControlId;
                            if (ControlId != undefined && DefaultValueConfig[ControlId] != undefined) {
                                break;
                            }
                        }

                        if (ControlId != undefined && DefaultValueConfig[ControlId] != undefined)
                            break;
                    }
                    if (ControlId != undefined && DefaultValueConfig[ControlId] != undefined) {

                        if (DefaultValueConfig[ControlId].DefaultValueDimension == DATEntityType.DefaultValueMobileMetaData) {
                            DefaultValueResponse.Answer = DefaultValueConfig[ControlId].DefaultValue[Index].Answer;
                            DefaultValueResponse.AnswerValue = DefaultValueConfig[ControlId].DefaultValue[Index].AnswerValue;
                            DefaultValueResponse.AttributeId = AttributeId;
                            DefaultValueResponse.ControlId = ControlId;
                            DefaultValueConfigResponseDict.push(DefaultValueResponse);
                        }
                        else {
                            Index = GetDefaultValueIndex();
                            var oDynamicValueMobileMetaData = DefaultValueConfig[ControlId].DefaultValue[Index];
                            DefaultValueConfigResponseDict = GetAttributeWiseDynamicValue(oDynamicValueMobileMetaData, PreviousDCValueLst, AttributeMasterList);
                        }
                    }

                }

            }

            // alert('GetAttributeControlWiseValue :' + JSON.stringify(DefaultValueConfigResponseDict));
            return DefaultValueConfigResponseDict;
        }
        catch (Excep) {
            //  alert('GetAttributeControlWiseValue Excep' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "LVDefaultValueComponent.GetAttributeControlWiseValue", Excep);
        }
    }

    //checks for dynamic DefaultValueConfig passed and returns the default value for particular control and attribute
    var GetAttributeWiseDynamicValue = function (oDynamicValueMobileMetaData, PreviousDCValueLst, AttributeMasterList) {
        try {
           //  alert('GetAttributeWiseDynamicValue : '+ JSON.stringify(PreviousDCValueLst));
            var DefaultValueResponse = { "Answer": "", "AnswerValue": "", "AttributeId": "", "ControlId": "" };
            var DynamicDefaultValueResponse = { "Answer": "", "AnswerValue": "" };
            var DefaultValueConfigResponseDict = [];

            if (oDynamicValueMobileMetaData != undefined) {
                if (oDynamicValueMobileMetaData.IsOnline == true) {
                    alert("Get Dynamic DefaultValue Online : Not implemented exception")
                }

                else {

                    for (var i = 0; i < AttributeMasterList.length; i++) {
                        var AttributeNodeDetails = AttributeMasterList[i];
                        var ControlId;
                        var ControlList = [];
                        ////Get list of controls for particular attribute(Attribute_Master)
                        ControlList = AttributeNodeDetails.AnswerMode; //need to do change AnswerMode to AnswerModes
                        for (var j = 0; j < ControlList.length; j++) {
                            ControlId = ControlList[j].ControlId;
                            DynamicDefaultValueResponse = { "Answer": "", "AnswerValue": "" };
                            DefaultValueResponse = { "Answer": "", "AnswerValue": "", "AttributeId": "", "ControlId": "" };

                            var AttributeControlWisePreviousDCList;
                            if (PreviousDCValueLst.length > 0) {
                               // alert('GetAttributeWiseDynamicValue PreviousDCValueLst :' + JSON.stringify(PreviousDCValueLst));
                                AttributeControlWisePreviousDCList = GetAttributeControlWisePreviousDCList(PreviousDCValueLst, AttributeNodeDetails.Id, ControlId, oDynamicValueMobileMetaData.SampleSize);
                               // alert('AttributeControlWisePreviousDCList :' + JSON.stringify(AttributeControlWisePreviousDCList) );
                                DynamicDefaultValueResponse = GetDynamicDefaultValue(oDynamicValueMobileMetaData.SampleSize, AttributeControlWisePreviousDCList, ControlId);
                                DefaultValueResponse.Answer = DynamicDefaultValueResponse.Answer;
                                DefaultValueResponse.AnswerValue = DynamicDefaultValueResponse.AnswerValue;
                            }
                            DefaultValueResponse.AttributeId = AttributeNodeDetails.Id;
                            DefaultValueResponse.ControlId = ControlId;
                            DefaultValueConfigResponseDict.push(DefaultValueResponse);
                        }
                    }
                }
            }
            //alert('GetAttributeWiseDynamicValue :' + JSON.stringify(DefaultValueConfigResponseDict));
            return DefaultValueConfigResponseDict;
        }
        catch (Excep) {
            //alert('GetAttributeWiseDynamicValue Excep' + Excep  + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "LVDefaultValueComponent.GetAttributeWiseDynamicValue", Excep);
        }
    }

    var getLatestValue = function (PreviousDCValueLst) {
        try {
            var LastUpdated = [];
            var _DateTime = new DateTime();
            for (var i = 0; i < PreviousDCValueLst.length; i++) {

                var DCResultDetailsInfo = PreviousDCValueLst[i];

                var AttributeNodeId = PreviousDCValueLst[i].AttributeNodeId;
                var ControlId = PreviousDCValueLst[i].ControlId;
               var LastUpdatedDate = _DateTime.GetDateByString(PreviousDCValueLst[i].LastUpdatedDate);
               for (var j = 0; j < PreviousDCValueLst.length; j++) {
                   var SecondLastUpdatedDate = _DateTime.GetDateByString(PreviousDCValueLst[j].LastUpdatedDate);
                   if (PreviousDCValueLst[j].AttributeNodeId == AttributeNodeId && PreviousDCValueLst[j].ControlId == ControlId && (SecondLastUpdatedDate > LastUpdatedDate)) {
                        DCResultDetailsInfo = PreviousDCValueLst[j];
                    }
                }

                var isExist = false;
                if (LastUpdated.length == 0)
                    LastUpdated.push(DCResultDetailsInfo);
                else {
                    for (var k = 0; k < LastUpdated.length; k++) {
                        if ((LastUpdated[k].AttributeNodeId == AttributeNodeId && LastUpdated[k].ControlId == ControlId)) {
                            isExist = true
                            break;
                        }
                    }
                    if (isExist == false) {
                        LastUpdated.push(DCResultDetailsInfo);
                        isExist = false;
                    }
                }
            }
            return LastUpdated;
        }
        catch (Excep) {
            //alert('getLatestValue Excep' + Excep  + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "LVDefaultValueComponent.getLatestValue", Excep);
        }
    }

    //Gives Dcresultdetails for particular attribute and control
    var GetAttributeControlWisePreviousDCList = function (PreviousDCValueLst, AttributeId, ControlId, HistoryCount) {
        try {
          
            var AttributeControlWisePreviousDCList = [];
            for (var i = 0; i < PreviousDCValueLst.length; i++) {
               // alert(PreviousDCValueLst[i].AttributeNodeId + "," + AttributeId + "," + PreviousDCValueLst[i].ControlId + "," + ControlId + "," + AttributeControlWisePreviousDCList.length + "," + HistoryCount)
                if (PreviousDCValueLst[i].AttributeNodeId == AttributeId && PreviousDCValueLst[i].ControlId == ControlId) {
                    if (AttributeControlWisePreviousDCList.length < HistoryCount) {                      
                        AttributeControlWisePreviousDCList.push(PreviousDCValueLst[i]);
                       // alert('AttributeControlWisePreviousDCList' + JSON.stringify(AttributeControlWisePreviousDCList));
                    }
                }
            }
            return AttributeControlWisePreviousDCList;
        }
        catch (Excep) {
            //alert(Excep);
            throw oOneViewExceptionHandler.Create("Framework", "LVDefaultValueComponent.GetAttributeControlWisePreviousDCList", Excep);
        }
    }

    var GetDefaultValueIndex = function () {

        try {
            var Index = 1;
            return 1;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LVDefaultValueComponent.GetDefaultValueIndex", Excep);
        }
    }


    /// <summary>                
    ///Gives dynamic default value : Most common value from default value
    /// </summary>
    ///  <param name="AttributeNodeId">Attribute Id/param> 
    ///  <param name="ControlId">Control Id</param> 
    /// <returns>Default Value</returns>  
    var GetDynamicDefaultValue = function (SampleSize, ControlWisePreviousDCList, ControlId) {

        try {

          //  alert(ControlId + 'GetDynamicDefaultValue ControlWisePreviousDCList :' + JSON.stringify(ControlWisePreviousDCList));
            var DefaultValueConfigResponse = { "Answer": "", "AnswerValue": "" };
            var itr3;
            var length;


            if (SampleSize == 1 && ControlWisePreviousDCList != "" && ControlWisePreviousDCList != undefined && ControlWisePreviousDCList != null) {
                DefaultValueConfigResponse.Answer = ControlWisePreviousDCList["0"].Answer;
                DefaultValueConfigResponse.AnswerValue = ControlWisePreviousDCList["0"].AnswerValue;
            }
            else if (SampleSize > 1) {

                var HighestCountData = { "Answer": "", "AnswerValue": "", "Frequency": "0" };
                //  var MaxCount = Math.floor(oDynamicValueMobileMetaData.SampleSize / 2);
                var FrequencyList = [];

                for (var itr = 0; itr < ControlWisePreviousDCList.length; itr++) {
                    var PreviousDCValueObj = ControlWisePreviousDCList[itr];

                    if (itr == 0) {
                        FrequencyList.push({ "Answer": PreviousDCValueObj.Answer, "AnswerValue": PreviousDCValueObj.AnswerValue, "Frequency": 1 });
                    }

                    else if (itr > 0) {
                        length = FrequencyList.length
                        itr3 = 0;
                        while (itr3 < length) {
                            if (FrequencyList[itr3].AnswerValue != PreviousDCValueObj.AnswerValue && itr3 == length - 1) {
                                FrequencyList.push({ "Answer": PreviousDCValueObj.Answer, "AnswerValue": PreviousDCValueObj.AnswerValue, "Frequency": 1 });
                            }
                            else if (FrequencyList[itr3].AnswerValue == PreviousDCValueObj.AnswerValue) {
                                var count = parseInt(FrequencyList[itr3].Frequency);
                                count++;
                                FrequencyList[itr3].Frequency = count;
                                break;
                            }
                            itr3++;
                        }
                    }
                }


                for (var itr4 = 0; itr4 < FrequencyList.length; itr4++) {
                    if (parseInt(HighestCountData.Frequency) < FrequencyList[itr4].Frequency) {

                        HighestCountData.Answer = FrequencyList[itr4].Answer;
                        HighestCountData.AnswerValue = FrequencyList[itr4].AnswerValue;
                        HighestCountData.Frequency = FrequencyList[itr4].Frequency;

                        DefaultValueConfigResponse.Answer = HighestCountData.Answer;
                        DefaultValueConfigResponse.AnswerValue = HighestCountData.AnswerValue;
                    }
                }
                //alert('FrequencyList' + JSON.stringify(FrequencyList));
            }

            //alert('DefaultValueConfigResponse from main' + JSON.stringify(DefaultValueConfigResponse));
            return DefaultValueConfigResponse;
        }
        catch (Excep) {
            ////alert("LVDefaultValueComponent.GetDynamicDefaultValue:" + Excep);
            throw oOneViewExceptionHandler.Create("Framework", "LVDefaultValueComponent.GetDynamicDefaultValue", Excep);
        }
    }

    //Forms the response dictionary, where attribute id is main key and control id is subkey
    var FormDefaultValueResponseDict = function (DefaultValueResponseDict, DefaultValueResponseList, AttributeMasterList) {
        try {
            var ControlWiseDict = {};
            var ValueArray = { Answer: '', AnswerValue: '', AttributeId: 0, ControlId: '' };
            for (var i = 0; i < DefaultValueResponseList.length; i++) {
                ControlWiseDict = {};
                var TempResponse = DefaultValueResponseList[i];
                if (TempResponse.AttributeId == "" && TempResponse.ControlId == '-1') {
                    for (j = 0; j < AttributeMasterList.length; j++) {
                        var AttributeNodeDetails = AttributeMasterList[i];
                        var ControlId;
                        var ControlList = [];
                        ////Get list of controls for particular attribute(Attribute_Master)
                        ControlList = AttributeNodeDetails.AnswerMode; //need to do change AnswerMode to AnswerModes
                        for (var k = 0; k < ControlList.length; k++) {
                            ControlId = ControlList[k].ControlId;
                            ValueArray = { Answer: '', AnswerValue: '', AttributeId: 0, ControlId: '' };
                            ValueArray.AttributeId = AttributeNodeDetails.Id;
                            ValueArray.Answer = TempResponse.Answer;
                            ValueArray.AnswerValue = TempResponse.AnswerValue;
                            ValueArray.ControlId = ControlId;

                            ControlWiseDict[ValueArray.ControlId] = ValueArray;
                        }
                        DefaultValueResponseDict[ValueArray.AttributeId] = ControlWiseDict;
                    }
                }
                else {
                    ValueArray = { Answer: '', AnswerValue: '', AttributeId: 0, ControlId: '' };

                    ValueArray.AttributeId = TempResponse.AttributeId;
                    ValueArray.ControlId = TempResponse.ControlId;
                    ValueArray.Answer = TempResponse.Answer;
                    ValueArray.AnswerValue = TempResponse.AnswerValue;
                    ControlWiseDict[ValueArray.ControlId] = ValueArray;
                    DefaultValueResponseDict[ValueArray.AttributeId] = ControlWiseDict;
                }


            }

            // alert('FormDefaultValueResponseDict ffff :' + JSON.stringify(DefaultValueResponseDict));
            return DefaultValueResponseDict;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LVDefaultValueComponent.FormDefaultValueResponseDict", Excep);
        }

    }

    //////////////////////////////////////////////////////////******************************Default Value End********************************/////////////////////////////////////////////////////////////////////////////

    this.GetDefaultValue = function (TemplateNodeId, ControlId) {
        try {
            var Answer = "";
            var AnswerValue = "";

            if (OneViewSessionStorage.Get("ServiceName") == "Food Safety Service") {

                if (TemplateNodeId == 8308) {
                    if (OneViewSessionStorage.Get("DcPlaceIntColumn1") == 169) {
                        Answer = OneViewSessionStorage.Get("DcPlaceIntColumn1");
                        AnswerValue = "Approved";
                    }
                    else if (OneViewSessionStorage.Get("DcPlaceIntColumn1") == 170) {
                        Answer = OneViewSessionStorage.Get("DcPlaceIntColumn1");
                        AnswerValue = "Rejected";
                    }
                    return { "Answer": Answer, "AnswerValue": AnswerValue, "IsAllControls": true };
                }
                else if (TemplateNodeId == 8309) {
                    if (OneViewSessionStorage.Get("DcPlaceIntColumn2") == 1) {
                        Answer = OneViewSessionStorage.Get("DcPlaceIntColumn2");
                        AnswerValue = "High";
                    }
                    else if (OneViewSessionStorage.Get("DcPlaceIntColumn2") == 2) {
                        Answer = OneViewSessionStorage.Get("DcPlaceIntColumn2");
                        AnswerValue = "Medium";
                    }
                    else if (OneViewSessionStorage.Get("DcPlaceIntColumn2") == 3) {
                        Answer = OneViewSessionStorage.Get("DcPlaceIntColumn2");
                        AnswerValue = "Low";
                    }
                    return { "Answer": Answer, "AnswerValue": AnswerValue, "IsAllControls": true };
                }
                else if (TemplateNodeId == 1344) {
                    if (OneViewSessionStorage.Get("DcPlaceColumn1") != null) {
                        Answer = OneViewSessionStorage.Get("DcPlaceColumn1");
                        AnswerValue = "";
                    }
                    return { "Answer": Answer, "AnswerValue": AnswerValue, "IsAllControls": true };
                }
                else if (TemplateNodeId == 1345) {
                    if (OneViewSessionStorage.Get("DcPlaceColumn2") != null) {
                        Answer = OneViewSessionStorage.Get("DcPlaceColumn2");
                        AnswerValue = "";
                    }
                    return { "Answer": Answer, "AnswerValue": AnswerValue, "IsAllControls": true };
                }
                else if (TemplateNodeId == 1346) {
                    if (OneViewSessionStorage.Get("DcPlaceColumn3") != null) {
                        Answer = OneViewSessionStorage.Get("DcPlaceColumn3");
                        AnswerValue = "";
                    }
                    return { "Answer": Answer, "AnswerValue": AnswerValue, "IsAllControls": true };
                }
                else {
                    return GetDefaultValue_562(TemplateNodeId, ControlId);
                }
            }

            else if (OneViewSessionStorage.Get("ServiceName") == "QaaS") {
                // alert('kkk QaaS_LastDcValue_DcResultDetails :' + QaaS_LastDcValue_DcResultDetails);
                var TemplateId = OneViewSessionStorage.Get("TemplateId");
                var _oDefaultValueForHydeHousing = new DefaultValueForHydeHousing();

                var PreviousDCValueLst;
                if (QaaS_LastDcValue_DcResultDetails == null || QaaS_LastDcValue_DcResultDetails == "" || QaaS_LastDcValue_DcResultDetails == undefined) {
                    //  alert('QaaS_LastDcValue_DcResultDetails : ' + QaaS_LastDcValue_DcResultDetails);
                    PreviousDCValueLst = _oDefaultValueForHydeHousing.GetDefaultValues(LVFormattedTemplateMetadata);
                    QaaS_LastDcValue_DcResultDetails = PreviousDCValueLst;
                }
                if (QaaS_LastDcValue_DcResultDetails.length > 0) {
                    var IsNotAvailable = true;
                    for (var i = 0; i < QaaS_LastDcValue_DcResultDetails.length; i++) {
                        var PreviousDCValue = QaaS_LastDcValue_DcResultDetails[i];
                        //alert(PreviousDCValue.Answer + ",AttributeNodeId : " + PreviousDCValue.AttributeNodeId + ",TemplateNodeId :  " + TemplateNodeId + ",PreviousDCValue.ControlId : " + PreviousDCValue.ControlId + " , ControlId : " + ControlId);
                        //show last audit value only for green answers
                        if (PreviousDCValue.AttributeNodeId == TemplateNodeId && PreviousDCValue.Answer == 3) {
                            IsNotAvailable = false;
                            return { "Answer": PreviousDCValue.Answer, "AnswerValue": PreviousDCValue.AnswerValue, "IsAllControls": true };
                        }
                    }

                    if (IsNotAvailable == true) {
                        return { "Answer": "", "AnswerValue": "", "IsAllControls": true };
                    }
                }

                else {
                    return { "Answer": "", "AnswerValue": "", "IsAllControls": true };
                }
            }
            else {
                return { "Answer": "", "AnswerValue": "", "IsAllControls": true };
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LVDefaultValueComponent.GetDefaultValue", Excep);
        }
    }

    var GetDefaultValue_562 = function (TemplateNodeId, ControlId) {

        var EquipmentNameAttributeId = [10633,
10645,
10657,
10669,
10681,
10693,
10705,
10717,
10729,
10741,
10753,
10765,
10777,
10789,
10801,
10813,
10825,
10837,
10849,
10861,
10873,
10885,
10897,
10909,
10921,
10933,
10945,
10957,
10969,
10981,
10993,
11005,
11017,
11029,
11041,
11053,
11065,
11077,
11089,
11101,
11113,
11125,
11137,
11149,
11161,
11173,
11185,
11197,
11209,
11221,
11233,
11245,
11257,
11269,
11281,
11293,
11305,
11317,
11329,
11341,
11353,
11365,
11377,
11389,
11401,
11413,
11425,
11437,
11449,
11461,
11473,
11485,
11497,
11509,
11521,
11533,
11545,
11557,
11569,
11581 ];
        var EquipmentCodeAttributeId = [10634,
10646,
10658,
10670,
10682,
10694,
10706,
10718,
10730,
10742,
10754,
10766,
10778,
10790,
10802,
10814,
10826,
10838,
10850,
10862,
10874,
10886,
10898,
10910,
10922,
10934,
10946,
10958,
10970,
10982,
10994,
11006,
11018,
11030,
11042,
11054,
11066,
11078,
11090,
11102,
11114,
11126,
11138,
11150,
11162,
11174,
11186,
11198,
11210,
11222,
11234,
11246,
11258,
11270,
11282,
11294,
11306,
11318,
11330,
11342,
11354,
11366,
11378,
11390,
11402,
11414,
11426,
11438,
11450,
11462,
11474,
11486,
11498,
11510,
11522,
11534,
11546,
11558,
11570,
11582 ];
        var EquipmentName = ["0001.Incubator",
"0002.Incubator",
"0003.Incubator",
"0004.Incubator",
"0005.Incubator",
"0006.Incubator",
"0007.Waterbath",
"0008.Waterbath",
"0009.Waterbath",
"0010.Refrigerator",
"0011.Refrigerator",
"0012.Refrigerator",
"0013.Refrigerator",
"0014.Refrigerator",
"0015.Refrigerator",
"0016.Biosafety cabinet",
"0017.Colony Counter",
"0018.Stomacher",
"0019.Bioluminometer",
"0020.Weighing scale",
"0021.Weighing scale",
"0022.Analytical Balance",
"0023.Compound Microscope",
"0024.Stereo Microscope",
"0025.Air Sampler",
"0026.Autoclave",
"0027.Autoclave",
"0028.Hot Air Sterilization Ove",
"0029.Hot Air Sterilization Ove",
"0030.Glass Washer",
"0031.Water Distiller",
"0032.Magnetic Stirrer Hot plat",
"0033.Membrane Filtration Unit",
"0034.pH-conductivity meter",
"0035.pH meter",
"0036.API machine",
"0037.PCR machine",
"0038.Validator Calibration Che",
"0039.Data Logger",
"0040.Data Logger",
"0041.Data Logger",
"0042.Data Logger",
"0043.Data Logger",
"0044.Data Logger",
"0045.Test Cap Range 0 C",
"0046.Test Cap Range 3 C",
"0047.Test Cap Range -18 C",
"0048.Test Cap Range 0 C",
"0049.Test Cap Range 3 C",
"0050.Test Cap Range -18 C",
"0051.Colorimeter (low range)",
"0052.Colorimeter (low range)",
"0053.Colorimeter (high range)",
"0054.Glass thermometer",
"0055.Glass thermometer",
"0056.Glass thermometer",
"0057.Glass thermometer",
"0058.Glass thermometer",
"0059.Glass thermometer",
"0060.Glass thermometer",
"0061.Glass thermometer",
"0062.Glass thermometer",
"0063.Glass thermometer",
"0064.Glass thermometer",
"0065.Glass thermometer",
"0066.Glass thermometer",
"0067.Glass thermometer",
"0068.Glass thermometer",
"0069.Glass thermometer",
"0070.Glass thermometer",
"0071.Glass thermometer",
"0072.Infra-red gun thermometer",
"0073.Infra-red gun thermometer",
"0074.Test weights (5 20 50 200",
"0075.Thermohygrometer",
"0076.Spreader machine",
"0077.UV Lamp",
"0078.Automatic Colony Counter",
"0079.PCR Thermal block",
"0080.Shaking Water bath", ];
        var EquipmentCode = ["FS/IN-01",
"FS/IN-02",
"FS/IN-03",
"FS/IN-04",
"FS/IN-05",
"FS/IN-06",
"FS/WB-01",
"FS/WB-02",
"FS/WB-03",
"FS/RF-01",
"FS/RF-02",
"FS/RF-03",
"FS/RF-04",
"FS/RF-05",
"FS/RF-06",
"FS/BC-01",
"FS/CC-01",
"FS/ST-01",
"FS/BL-01",
"FS/WS-01",
"FS/WS-02",
"FS/WS-03",
"FS/MI-01",
"FS/MI-02",
"FS/AS-01",
"FS/AU-01",
"FS/AU-02",
"FS/HO-01",
"FS/HO-02",
"FS/GW-01",
"FS/WD-01",
"FS/MS-01",
"FS/MF-01",
"FS/PH-01",
"FS/PH-02",
"FS/AP-01",
"FS/PC-01",
"FS/VC-01",
"FS/LG-01",
"FS/LG-02",
"FS/LG-06",
"FS/LG-08",
"FS/LG-09",
"FS/LG-10",
"FS/TC-01",
"FS/TC-02",
"FS/TC-03",
"FS/TC-04",
"FS/TC-05",
"FS/TC-06",
"FS/CL-01",
"FS/CL-02",
"FS/CL-03",
"FS/GT-01",
"FS/GT-04",
"FS/GT-05",
"FS/GT-06",
"FS/GT-08",
"FS/GT-09",
"FS/GT-10",
"FS/GT-11",
"FS/GT-12",
"FS/GT-13",
"FS/GT-14",
"FS/GT-15",
"FS/GT-16",
"FS/GT-17",
"FS/GT-18",
"FS/GT-19",
"FS/GT-20",
"FS/GT-21",
"FS/IT-01",
"FS/IT-02",
"FS/TW-01",
"FS/TH-01",
"FS/SP-01",
"FS/UV-01",
"FS/ACC-01",
"FS/TB-01",
"FS/SWB-01", ];

        var Answer = "";
        var AnswerValue = "";

        if(EquipmentNameAttributeId.indexOf(TemplateNodeId) != -1){
            Answer = EquipmentName[EquipmentNameAttributeId.indexOf(TemplateNodeId)];
        }
        else if (EquipmentCodeAttributeId.indexOf(TemplateNodeId) != -1) {
            Answer = EquipmentCode[EquipmentCodeAttributeId.indexOf(TemplateNodeId)];
        }

        return { "Answer": Answer, "AnswerValue": AnswerValue, "IsAllControls": true };
    }
}




//For Service Id :   13
//HydeHousing Client
function DefaultValueForHydeHousing() {

    var MyInstance = this;

    this.GetDefaultValues = function (oTemplateNodes) {
        try {

            var ServiceId = OneViewSessionStorage.Get("ServiceId");
            var TemplateId = OneViewSessionStorage.Get("TemplateId");
            var DcPlaceId = OneViewSessionStorage.Get("DcPlaceId");
            var DcPlaceDimension = 16;
            var DcUserId =-1;
            var HistoryCount = 1;
            var AttributeMasterList = [];

            for (var itrAttributeNodeId in oTemplateNodes) {
                var AttributeNodeDetails = oTemplateNodes[itrAttributeNodeId];               
                if (AttributeNodeDetails != undefined) {                   
                    if (AttributeNodeDetails.IsAttributeGroup != true) {                     
                        AttributeMasterList.push(AttributeNodeDetails);
                    }
                }
            }

            //alert(ServiceId + "," + TemplateId + "," + DcPlaceId + "," + DcPlaceDimension + "," + DcUserId + "," + HistoryCount + "," +AttributeMasterList)

            var oPreviousDCValuesDAO = new PreviousDCValuesDAO();
            var PreviousDCValueLst = oPreviousDCValuesDAO.GetDCs(ServiceId, TemplateId, DcPlaceId, DcPlaceDimension, DcUserId, AttributeMasterList, HistoryCount , true);

            //For place,template and user combinations ,if required later we can un-comment

            //if (PreviousDCValueLst == null) {
            //    PreviousDCValueLst = oPreviousDCValuesDAO.GetDCs(ServiceId, TemplateId, -1, -1, DcUserId, AttributeMasterList, HistoryCount);
            //}

            //else if (PreviousDCValueLst == null) {
            //    PreviousDCValueLst = oPreviousDCValuesDAO.GetDCs(ServiceId, TemplateId, DcPlaceId, DcPlaceDimension, -1, AttributeMasterList, HistoryCount);
            //}

            //else if (PreviousDCValueLst == null) {
            //    PreviousDCValueLst = oPreviousDCValuesDAO.GetDCs(ServiceId, TemplateId, -1, -1, -1, AttributeMasterList, HistoryCount);
            //}

            //alert('PreviousDCValueLst : ' + JSON.stringify(PreviousDCValueLst));

            return PreviousDCValueLst;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DefaultValueForHydeHousing.GetDefaultValues", Excep);
        }
    }
}