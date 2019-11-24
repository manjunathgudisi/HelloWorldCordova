

function ActionNCMetaDataComponent() {

    //////////////////////////////**************************Get Metadata : START ***********************/////////////////////////////// 
    /// <summary>
    ///Get MetaData for Action and NC
    /// </summary>
    this.Load = function () {
        try {
            // alert('LoadMetaData');

            var ServiceId = OneViewSessionStorage.Get("ServiceId");
            var TemplateNodeId = OneViewSessionStorage.Get("TemplateId");
            var DcPlaceId = OneViewSessionStorage.Get("DcPlaceId");
            var DcPlaceDimension;
           // DcPlaceDimension = 13;
          //  if (TemplateNodeId == "153" || TemplateNodeId == 153)
           //     DcPlaceDimension = -1;
                

            var DcUserId = OneViewSessionStorage.Get("LoginUserId");

            //alert(ServiceId + "," + DcUserId + "," + TemplateNodeId + "," + DcPlaceId + "," + DcPlaceDimension);
            var MetaData = GetActionNCMetaData(ServiceId, DcUserId, TemplateNodeId, DcPlaceId, DcPlaceDimension);


            if (MetaData != null) {
                NCActionProfileMetaData = MetaData;             
            }

            //alert('NCActionProfileMetaData here 11:' + JSON.stringify(NCActionProfileMetaData));


        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ActionNCMetaDataComponent.Load", Excep);
        }
    }

    

    var GetActionNCMetaData = function (ServiceId, DcUserId, TemplateNodeId,DcPlaceId, DcPlaceDimension) {
        try {
            var _oActionNCProfilingDAO = new ActionNCProfilingDAO();
            var MetaData = _oActionNCProfilingDAO.GetMetaData(ServiceId, DcUserId, TemplateNodeId, DcPlaceId, DcPlaceDimension);

            if (MetaData == null) {
                //User specific
                // DcPlaceId = -1;
                //  DcPlaceDimension = -1
                MetaData = _oActionNCProfilingDAO.GetMetaData(ServiceId, DcUserId, TemplateNodeId, -1, -1);
            }

            if (MetaData == null) {
                //Place specific
                // DcUserId = -1;
                MetaData = _oActionNCProfilingDAO.GetMetaData(ServiceId, -1, TemplateNodeId, DcPlaceId, DcPlaceDimension);
            }

            if (MetaData == null) {
                //none
                DcPlaceId = -1;
                DcUserId = -1;
                //DcPlaceDimension = -1
                MetaData = _oActionNCProfilingDAO.GetMetaData(ServiceId, DcUserId, TemplateNodeId, DcPlaceId, DcPlaceDimension);
            }

            return MetaData;
        }
        catch (Excep) {
           // alert('GetActionNCMetaData' + Excep);
           // alert('GetActionNCMetaData 444' +  JSON.stringify(Excep));
            throw Excep;
        }
    }

 
    this.IsActionImageMandatory = function (Req) {
        try {
            OneViewConsole.Debug("ViewButtonHandler start", "LandingPageFacade.ViewButtonHandler");
            var IsSuccess = false;
        
            var BusinessEventHandlerObjectKeys = "ValidateImageExistForAction";
            //var TemplateId = Req.TemplateId;

            var _BusinessEventEntityBO = new BusinessEventEntityBO();
         //   var ViewRecordHandlerObj = { RequiredBusinessEventHandlerObjectKeys: "ValidateImageExistForAction", TemplateId: "" };
            var ReqParameter = { ClassName: "ActionNCMetaDataComponent", MethodName: "IsActionImageMandatory", RequiredBusinessEventHandlerObjectKeys: {}, IsTemplateValidationRequired: false, TemplateIdLst: "", };
            ReqParameter.RequiredBusinessEventHandlerObjectKeys[BusinessEventHandlerObjectKeys] = "";

            var _BusinessEventEntityBO = new BusinessEventEntityBO();
            var _IsBussinessEventExist = _BusinessEventEntityBO.IsBussinessEventExist(ReqParameter);

            if (_IsBussinessEventExist.BusinessEventHandlersObjectKeysDetails[BusinessEventHandlerObjectKeys] != undefined) {
                if (_IsBussinessEventExist.BusinessEventHandlersObjectKeysDetails[BusinessEventHandlerObjectKeys].IsSuccess == true) {
                    IsSuccess = true;
                }

            }

            OneViewConsole.Debug("ViewButtonHandler end", "LandingPageFacade.ViewButtonHandler");

            return IsSuccess;
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "LandingPageFacade.ViewButtonHandler", xlatService);
        }
    }
}