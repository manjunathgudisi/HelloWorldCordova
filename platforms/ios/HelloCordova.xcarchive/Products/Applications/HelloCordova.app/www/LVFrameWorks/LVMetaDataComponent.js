

function LVMetaDataComponent() {

    //////////////////////////////**************************Get Metadata : START ***********************/////////////////////////////// 
    /// <summary>
    ///Get MetaData for DefaultValue,History ,NA ,HelpDocument
    /// </summary>
    this.Load = function () {
        try {
            // alert('LoadMetaData');

            var ServiceId = OneViewSessionStorage.Get("ServiceId");
            var TemplateNodeId = OneViewSessionStorage.Get("TemplateId");
            var DcPlaceId = OneViewSessionStorage.Get("DcPlaceId");//- 1;
            var DcPlaceDimension = 13;

            if (TemplateNodeId == "153" || TemplateNodeId == 153)
                DcPlaceDimension = -1;
                

            var DcUserId = OneViewSessionStorage.Get("LoginUserId");// - 1;

            var MetaData = GetAttributeOtherConfigMetaData(ServiceId, DcPlaceId, DcPlaceDimension, DcUserId, TemplateNodeId);

            if (MetaData != null) {
                LVDefaultValueConfigMetaData = MetaData.AttributeDefaultValueMetaDataDict;
                LVHistoryConfigMetaData = MetaData.HistoryMetaDataDict;
                LVNAConfigMetaData = MetaData.NAMetaDataDict;
                LVHelpDocumentConfigMetaData = MetaData.HelpDocumentMetaDataDict;
                LVUserWiseLastDC = MetaData.UserWiseLastDC;
                LVDcPlaceWiseLastDC = MetaData.DcPlaceWiseLastDC;

               
                 //alert('LVDefaultValueConfigMetaData:' + JSON.stringify(LVDefaultValueConfigMetaData));
                // alert('LVHistoryConfigMetaData:' + JSON.stringify(LVHistoryConfigMetaData));
            }

            //alert('LVDefaultValueConfigMetaData' + LVDefaultValueConfigMetaData);
           // alert('LVDefaultValueConfigMetaData' + JSON.stringify(LVDefaultValueConfigMetaData));
            //LVDefaultValueConfigMetaData = {
            //    "13": { "txtCookedByControlId": { "ControlId": "txtCookedByControlId", "DefaultValueDimension": 669, "DefaultValue": { "1": { "Answer": "EK-Chef", "AnswerValue": "0", "IsOnline": false } } } },
            //    "10": { "AddlAirlineControlId": { "ControlId": "AddlAirlineControlId", "DefaultValueDimension": 670, "DefaultValue": { "1": { "SampleSize": 1, "IsOnline": false } } } }
            //};
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LVMetaDataComponent.Load", Excep);
        }
    }

    

    var GetAttributeOtherConfigMetaData = function (ServiceId, DcPlaceId, DcPlaceDimension, DcUserId, TemplateNodeId) {
        try {
            var _oAttributeOtherConfigDAO = new AttributeOtherConfigDAO();
            var MetaData = _oAttributeOtherConfigDAO.GetMetaData(ServiceId, DcPlaceId, DcPlaceDimension, DcUserId, TemplateNodeId);

            if (MetaData == null) {
                //User specific
                // DcPlaceId = -1;
                //  DcPlaceDimension = -1
                MetaData = _oAttributeOtherConfigDAO.GetMetaData(ServiceId, -1, -1, DcUserId, TemplateNodeId);
            }

            if (MetaData == null) {
                //Place specific
                // DcUserId = -1;
                MetaData = _oAttributeOtherConfigDAO.GetMetaData(ServiceId, DcPlaceId, DcPlaceDimension, -1, TemplateNodeId);
            }

            if (MetaData == null) {
                //none
                DcPlaceId = -1;
                DcUserId = -1;
                //DcPlaceDimension = -1
                MetaData = _oAttributeOtherConfigDAO.GetMetaData(ServiceId, DcPlaceId, DcPlaceDimension, DcUserId, TemplateNodeId);
            }

            return MetaData;
        }
        catch (Excep) {
            throw Excep;
        }
    }

    //////////////////////////////**************************Get Metadata : END ***********************/////////////////////////////// 




    /// <summary>
    ///Get MetaData for DefaultValue,History ,NA ,HelpDocument , NC(Non-Conformance)
    /// </summary>
    this.LoadNew = function () {
        try {
            // alert('LoadMetaData');

            var ServiceId = OneViewSessionStorage.Get("ServiceId");
            var TemplateNodeId = OneViewSessionStorage.Get("TemplateId");
            var DcPlaceId = OneViewSessionStorage.Get("DcPlaceId");
            var DcPlaceDimension = 13;

            if (TemplateNodeId == "153" || TemplateNodeId == 153)
                DcPlaceDimension = -1;


            var DcUserId = OneViewSessionStorage.Get("LoginUserId");

            var MetaDataList = GetAttributeOtherConfigMetaData(ServiceId, DcPlaceId, DcPlaceDimension, DcUserId, TemplateNodeId);


            if (MetaDataList != null) {
                CheckAnyMetaDataEmpty(MetaDataList);
                //LVDefaultValueConfigMetaData = MetaData.AttributeDefaultValueMetaDataDict;
                //LVHistoryConfigMetaData = MetaData.HistoryMetaDataDict;
                //LVNAConfigMetaData = MetaData.NAMetaDataDict;
                //LVHelpDocumentConfigMetaData = MetaData.HelpDocumentMetaDataDict;
                //LVUserWiseLastDC = MetaData.UserWiseLastDC;
                //LVDcPlaceWiseLastDC = MetaData.DcPlaceWiseLastDC;

                ////LVDefaultValueConfigMetaData = { "10": { "AddlAirlineControlId": { "ControlId": "AddlAirlineControlId", "DefaultValueDimension": 670, "DefaultValue": { "1": { "SampleSize": 1, "IsOnline": false } } } } };
                // alert('LVDefaultValueConfigMetaData:' + JSON.stringify(LVDefaultValueConfigMetaData));
                // alert('LVHistoryConfigMetaData:' + JSON.stringify(LVHistoryConfigMetaData));
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LVMetaDataComponent.Load", Excep);
        }
    }

    var GetAttributeOtherConfigMetaDataNew = function (ServiceId, DcPlaceId, DcPlaceDimension, DcUserId, TemplateNodeId) {
        try {
            var _oAttributeOtherConfigDAO = new AttributeOtherConfigDAO();
            var MetaDataList = _oAttributeOtherConfigDAO.GetMetaData(ServiceId, DcPlaceId, DcPlaceDimension, DcUserId, TemplateNodeId);

            //if (MetaDataList == null) {
            //    //User specific
            //    // DcPlaceId = -1;
            //    //  DcPlaceDimension = -1
            //    MetaData = _oAttributeOtherConfigDAO.GetMetaData(ServiceId, -1, -1, DcUserId, TemplateNodeId);
            //}

            //if (MetaDataList == null) {
            //    //Place specific
            //    // DcUserId = -1;
            //    MetaData = _oAttributeOtherConfigDAO.GetMetaData(ServiceId, DcPlaceId, DcPlaceDimension, -1, TemplateNodeId);
            //}

            //if (MetaDataList == null) {
            //    //none
            //    DcPlaceId = -1;
            //    DcUserId = -1;
            //    //DcPlaceDimension = -1
            //    MetaDataList = _oAttributeOtherConfigDAO.GetMetaData(ServiceId, DcPlaceId, DcPlaceDimension, DcUserId, TemplateNodeId);
            //}

            return MetaDataList;
        }
        catch (Excep) {
            throw Excep;
        }
    }

    var CheckAnyMetaDataEmpty = function (MetaDataList, ServiceId, DcPlaceId, DcPlaceDimension, DcUserId, TemplateNodeId) {
        try {
            for (var i = 0; i < MetaDataList.length; i++) {
                var MetaData = MetaDataList[i];

                //var MetaDataList = GetAttributeOtherConfigMetaData(ServiceId, DcPlaceId, DcPlaceDimension, DcUserId, TemplateNodeId);

                if (MetaData == null) {
                    //User specific
                    // DcPlaceId = -1;
                    //  DcPlaceDimension = -1
                    MetaData = _oAttributeOtherConfigDAO.GetMetaData(ServiceId, -1, -1, DcUserId, TemplateNodeId);
                }

                if (MetaDataList == null) {
                    //Place specific
                    // DcUserId = -1;
                    MetaData = _oAttributeOtherConfigDAO.GetMetaData(ServiceId, DcPlaceId, DcPlaceDimension, -1, TemplateNodeId);
                }

                if (MetaData == null) {
                    //none
                    DcPlaceId = -1;
                    DcUserId = -1;
                    //DcPlaceDimension = -1
                    MetaData = _oAttributeOtherConfigDAO.GetMetaData(ServiceId, DcPlaceId, DcPlaceDimension, DcUserId, TemplateNodeId);
                }
            }
        }
        catch (Excep) {
            throw Excep;
        }
    }


    var Check = function () {

    }


}