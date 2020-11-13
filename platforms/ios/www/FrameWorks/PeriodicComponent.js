
var PeriodicTemplateConfigMetadata = {};
var CompletePeriodicTemplateResult = {};
var PeriodicHierarchy = {};
var BreadCrumbs = [];
var CompletePeriodicAttributeOtherConfigDict = {};
var CompletePeriodicActionNCProfileDict = {};
var CompletePeriodicActionResult = {};
var DcPeriodicDisplayMetaData = {};
var CompleteMultiMediaSubElementsAnswerModeDict = {};
var CompleteDcStatusCountDict = {};
var PeriodicPropertyToAccess = "";
var PTempMData = {};
var PlatformPeriodicHierarchyBreadCrumbs = [];
var PeriodicMainTemplateGroupId = 0;
var PlatformPeriodicCurrentSubGroupId = 0;
var CurrentRuleId = 0;
var CurrentTemplateNodeId = 0;
var CurrentAttributeId = 0;
var CurrentControlId = "";
var PeriodicMandatoryMetadata = {};
var CompletePeriodicTemplateUIEventJobConfigDict = {};
var PeriodicDCBlockerConfigProfile = {};

function PeriodicalWorkComponent(xlatService) {

    var MyInstance = this;
    var oPeriodicalWorkHtmlComponent = new PeriodicalWorkHtmlComponent(xlatService);
    var oDOM = new DOM();
    var DcPlaceId = OneViewSessionStorage.Get('DcPlaceId');
    var DcPlaceDimension = DATEntityType.OrganizationAssestsNode;
    var LoginUserId = OneViewSessionStorage.Get('LoginUserId');
    var ServiceId = OneViewSessionStorage.Get('ServiceId');
    var oModelOperationComponent = new ModelOperationComponent();

    this.GetIsProfileValid = function (PlaceId, MainGroupId) {
        try {
            OneViewConsole.Debug("GetIsProfileValid Start", "PeriodicalWorkComponent.GetIsProfileValid");
            
            var IsValid = false;

            CompleteDcStatusCountDict = MyInstance.GetDcStatusCountByTemplateGroup(MainGroupId);

            PeriodicPropertyToAccess = 'OverAllCompletedDCCount';
            if (IsPeriodicApprovalProfileExists == true) {
                PeriodicPropertyToAccess = 'OverAllApprovedDCCount';
            }

            //alert('IsApprovalProfileExists : ' + IsApprovalProfileExists + ', OverAllApprovedDCCount : ' + CompleteDcStatusCountDict.OverAllApprovedDCCount +
            //    ' , OverAllCompletedDCCount : ' + CompleteDcStatusCountDict.OverAllCompletedDCCount + ' , Occurrence : ' + CompleteDcStatusCountDict.Occurrence);

            if (IsPeriodicApprovalProfileExists == true) {
                if (CompleteDcStatusCountDict.OverAllApprovedDCCount < CompleteDcStatusCountDict.Occurrence) {
                    IsValid = true;
                }
            }
            else {
                if (CompleteDcStatusCountDict.OverAllCompletedDCCount < CompleteDcStatusCountDict.Occurrence) {
                    IsValid = true;
                }
            }

            OneViewConsole.Debug("GetIsProfileValid End", "PeriodicalWorkComponent.GetIsProfileValid");

            return IsValid;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.GetIsProfileValid", Excep);
        }
    }

    this.LoadValidTemplates = function (MainGroupId) {
        try {
            OneViewConsole.Debug("LoadValidTemplates Start", "PeriodicalWorkComponent.LoadValidTemplates");
           // alert('MainGroupId : ' + MainGroupId);

            var ValidatedHierarchyResponse = { IsAnyValid: false, 'FormedHierarchy': [] };

            var ValidTemplatesResponse = MyInstance.GetValidTemplateBySchedule(MainGroupId);
          

            if (ValidTemplatesResponse.IsAnyValidProfile == true) {
                var FullTemplateHierarchyist = MyInstance.GetAllTemplateHierarchy(MainGroupId);
                //Compare the valid templates as the schedule and FullHierarchy
                //and form the hierarchy
                var FormedHierarchy = MyInstance.SetHierarchy(FullTemplateHierarchyist, ValidTemplatesResponse.ValidProfileList);
                ValidatedHierarchyResponse = MyInstance.ValidateHierarchy(FormedHierarchy);
            }

            OneViewConsole.Debug("LoadValidTemplates End", "PeriodicalWorkComponent.LoadValidTemplates");

            return ValidatedHierarchyResponse;
            
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.LoadValidTemplates", Excep);
        }
    }

    this.GetValidTemplateBySchedule = function (MainGroupId) {
        try {
            OneViewConsole.Debug("GetValidTemplateBySchedule Start", "PeriodicalWorkComponent.GetValidTemplateBySchedule");

            var Response = { IsAnyValidProfile: false, ValidProfileList: null };
            var oExpressComponent = new ExpressComponent(xlatService, MainGroupId);
            var TemplateGroupWiseStatusDict = oExpressComponent.GetTemplateGroupWiseStatus(MainGroupId);

            if (TemplateGroupWiseStatusDict != undefined && TemplateGroupWiseStatusDict != null) {
                Response.IsAnyValidProfile = true;
                Response.ValidProfileList = TemplateGroupWiseStatusDict;
            }

            OneViewConsole.Debug("GetValidTemplateBySchedule End", "PeriodicalWorkComponent.GetValidTemplateBySchedule");
            
            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.GetValidTemplateBySchedule", Excep);
        }
    }

    this.GetAllTemplateHierarchy = function (MainGroupId) {
        try {
            OneViewConsole.Debug("GetAllTemplateHierarchy Start", "PeriodicalWorkComponent.GetAllTemplateHierarchy");
            
            var _oTemplateNodeDAO = new TemplateNodeDAO();
            var TemplateLeftRight = _oTemplateNodeDAO.GetLeftRight(MainGroupId);
            var FullTemplateHierarchyist = _oTemplateNodeDAO.GetNodeHierarchy(TemplateLeftRight[0].Left, TemplateLeftRight[0].Right);
            
            OneViewConsole.Debug("GetAllTemplateHierarchy End", "PeriodicalWorkComponent.GetAllTemplateHierarchy");

            return FullTemplateHierarchyist;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.GetAllTemplateHierarchy", Excep);
        }
    }

    this.SetHierarchy = function (FullTemplateHierarchyist, ValidProfileList) {
        try {
            OneViewConsole.Debug("SetHierarchy Start", "PeriodicalWorkComponent.SetHierarchy");

            var FormedHierarchy;

            //Compare FullTemplateHierarchyist and ValidProfileList to form hierarchy
            var MainGroupData = FullTemplateHierarchyist[0];
            var ParentNodeId=MainGroupData.ServerId;

            for (var i = 1; i < FullTemplateHierarchyist.length; i++) {
                var Level = 1;
                var Element = FullTemplateHierarchyist[i];
                ParentNodeId = Element.ServerId;
            }
            
            //Add New Properties as IsTemplate
            //PeriodicTemplateConfigMetadata

            OneViewConsole.Debug("SetHierarchy End", "PeriodicalWorkComponent.SetHierarchy");

            return FormedHierarchy;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.SetHierarchy", Excep);
        }
    }

    var GetStruct = function (Element, Level, ParentNodeId) {
        try {
            OneViewConsole.Debug("SetHierarchy Start", "PeriodicalWorkComponent.SetHierarchy");

            var FormedHierarchy;

            //Compare FullTemplateHierarchyist and ValidProfileList to form hierarchy
            var MainGroupData = FullTemplateHierarchyist[0];

            for (var i = 1; i < FullTemplateHierarchyist.length; i++) {
                var Element = FullTemplateHierarchyist[i];

            }

            //Add New Properties as IsTemplate
            //PeriodicTemplateConfigMetadata

            OneViewConsole.Debug("SetHierarchy End", "PeriodicalWorkComponent.SetHierarchy");

            return FormedHierarchy;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.SetHierarchy", Excep);
        }
    }

    this.ValidateHierarchy = function (FormedHierarchy) {
        try {
            OneViewConsole.Debug("SetHierarchy Start", "PeriodicalWorkComponent.SetHierarchy");

            var Response = { IsAnyValid: false, 'FormedHierarchy': [] };
            //Iterate full hierarchy uptil last level
            //Validate each subgroup as per the validation configured
            //Add New Properties as per validation success , as IsGroupHide , IsGroupDisable
              

            OneViewConsole.Debug("SetHierarchy End", "PeriodicalWorkComponent.SetHierarchy");

            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.SetHierarchy", Excep);
        }
    }

    this.FormHTML = function (Childs) {
        try {
            OneViewConsole.Debug("FormHTML Start", "PeriodicalWorkComponent.FormHTML");
          
            var Html = MyInstance.GetHTML(Childs);
            MyInstance.AppendHTML(Html,"TasksDivId");

            OneViewConsole.Debug("FormHTML End", "PeriodicalWorkComponent.FormHTML");
        }
        catch (Excep) {
            //alert("PeriodicalWorkComponent.FormHTML 11" + Excep);
           // alert("PeriodicalWorkComponent.FormHTML 22: " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.FormHTML", Excep);
        }
    }

    this.AppendHTML = function (Html, DivId) {
        try {
            OneViewConsole.Debug("AppendHTML Start", "PeriodicalWorkComponent.AppendHTML");
            
            var Div = document.getElementById(DivId);
            Div.innerHTML = "";
            // Div.innerHTML = Html;
            var _oOneViewCompiler = new OneViewCompiler();
            _oOneViewCompiler.CompileAndApeend(oScope, oCompile, Html, DivId);

            OneViewConsole.Debug("AppendHTML End", "PeriodicalWorkComponent.AppendHTML");
        }
        catch (Excep) {
            //alert("PeriodicalWorkComponent.AppendHTML 11" + Excep);
            //alert("PeriodicalWorkComponent.AppendHTML 22: " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.AppendHTML", Excep);
        }
    }

    this.GetHTML = function (Childs) {
        try {
            OneViewConsole.Debug("GetHTML Start", "PeriodicalWorkComponent.GetHTML");
                    
            var Html = "";
            
            
                   
            for (var i = 0; i < Childs.length; i++) {
                var IsDisable = false;
                var ElementDetails = Childs[i];
                // alert('ElementDetails : ' + JSON.stringify(ElementDetails));
                var SubGroupData = CompleteDcStatusCountDict.TemplateInfo[ElementDetails.Id];
                if (SubGroupData != undefined) {
                    //alert(PeriodicPropertyToAccess + ', SubGroupData : ' + JSON.stringify(SubGroupData) + " ," + JSON.stringify(ElementDetails));
                    if (ElementDetails.IsTemplate != true) {
                        if (SubGroupData.Occurrence <= SubGroupData[PeriodicPropertyToAccess]) {
                            IsDisable = true;
                        }
                        MyInstance.ShowHideDCButton(false);
                        Html += oPeriodicalWorkHtmlComponent.GetLevelWiseHtml(ElementDetails, SubGroupData, IsDisable);
                    }
                    else {
                        MyInstance.ShowHideDCButton(true);
                        var TemplateConfigMetadata = MyInstance.GetTemplateConfigMetadata(ElementDetails.Id);
                        Html += MyInstance.LoadLastLevel(TemplateConfigMetadata);
                    }
                }
            }

            OneViewConsole.Debug("GetHTML End", "PeriodicalWorkComponent.GetHTML");

            return Html;
        }
        catch (Excep) {
           // alert("PeriodicalWorkComponent.GetHTML 11" + Excep);
           // alert("PeriodicalWorkComponent.GetHTML 22: " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.GetHTML", Excep);
        }
    }
      
    this.LoadSubGroup = function (TemplateNodeId, IsShowBackButton, Index) {
        try {
            OneViewConsole.Debug("GetHTML Start", "PeriodicalWorkComponent.GetHTML");
                        
          
            //for (var i = 0; i < BreadCrumbs.length ; i++) {
            //    ChildDetails = ChildDetails[BreadCrumbs[i]];
            //}

            ////alert('ChildDetails : ' + JSON.stringify(ChildDetails));
            //if (ChildDetails.Childs.length > 0) {
            //    oScope.ShowBackDiv = true;
            //    oScope.ShowFooterDiv = true;
            //    oDOM.AddClass('MainContentDivId', 'has-header');
            //    oDOM.AddClass('MainContentDivId', 'has-footer');
            //    oScope.$apply();
            //    MyInstance.FormHTML(ChildDetails.Childs);
            //}

            MyInstance.LoadHierarchy(IsShowBackButton, TemplateNodeId);

            OneViewConsole.Debug("GetHTML End", "PeriodicalWorkComponent.GetHTML");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.LoadSubGroup", Excep);
        }
    }

    this.BackValidation = function () {
        try {
            OneViewConsole.Debug("BackValidation Start", "PeriodicalWorkComponent.BackValidation");

            var IsSuccess = true;

            OneViewConsole.Debug("BackValidation End", "PeriodicalWorkComponent.BackValidation");

            return IsSuccess;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.BackValidation", Excep);
        }

    }

    this.UpdateIndex = function (Index) {
        try {
            OneViewConsole.Debug("UpdateHierachy Start", "PeriodicalWorkComponent.UpdateHierachy");

            var Len = BreadCrumbs.length;
            BreadCrumbs.push(Index);
            //alert('BreadCrumbs push : ' + JSON.stringify(BreadCrumbs));
            OneViewConsole.Debug("UpdateHierachy End", "PeriodicalWorkComponent.UpdateHierachy");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.UpdateHierachy", Excep);
        }

    }

    this.UpdateHierachy = function () {
        try {
            OneViewConsole.Debug("UpdateHierachy Start", "PeriodicalWorkComponent.UpdateHierachy");
            
            if (BreadCrumbs.length > 0) {
                BreadCrumbs.pop();
            }
            //alert('BreadCrumbs pop : ' + JSON.stringify(BreadCrumbs));

            OneViewConsole.Debug("UpdateHierachy End", "PeriodicalWorkComponent.UpdateHierachy");
            
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.UpdateHierachy", Excep);
        }

    }

    this.LoadHierarchy = function (IsShowBackButton, TemplateNodeId) {
        try {
            OneViewConsole.Debug("LoadHierarchy Start", "PeriodicalWorkComponent.LoadHierarchy");
           

            PlatformPeriodicCurrentSubGroupId = TemplateNodeId;
            CompletePeriodicTemplateResult = {};
            CompleteDcStatusCountDict = {};
            CompleteDcStatusCountDict = MyInstance.GetDcStatusCountByTemplateGroup(TemplateNodeId);

            var ChildDetails = PeriodicHierarchy.TemplateConfigMetaDataDetails.Childs;

            for (var i = 0; i < BreadCrumbs.length ; i++) {
                ChildDetails = ChildDetails[BreadCrumbs[i]].Childs;
            }


            if (ChildDetails.length > 0) {

                if (IsShowBackButton == true) {
                    oScope.ShowBackDiv = true;
                    oScope.ShowFooterDiv = true;
                    oDOM.AddClass('MainContentDivId', 'has-header');
                    oDOM.AddClass('MainContentDivId', 'has-footer');
                }
                else {
                    oScope.ShowBackDiv = false;
                    oScope.ShowFooterDiv = false;
                    oDOM.RemoveClass('MainContentDivId', 'has-header');
                    oDOM.RemoveClass('MainContentDivId', 'has-footer');
                }

                oScope.$apply();
                MyInstance.LoadBlockerProfiles(TemplateNodeId);
                MyInstance.LoadTemplateConfigMetadata(TemplateNodeId);
                MyInstance.LoadAttributeOtherConfig(TemplateNodeId);
                MyInstance.LoadActionNCProfile(TemplateNodeId);
                MyInstance.LoadTemplateValidationConfigMetaData(TemplateNodeId);
                MyInstance.LoadTemplateUIEventJobConfigMetaData(TemplateNodeId)
                MyInstance.InitializeModel(ChildDetails);
                MyInstance.FormHTML(ChildDetails);
                MyInstance.PostControlEventsExecuteOnPageLoad(TemplateNodeId);
            }

            OneViewConsole.Debug("LoadHierarchy End", "PeriodicalWorkComponent.LoadHierarchy");

        }
        catch (Excep) {
           // alert("PeriodicalWorkComponent.LoadHierarchy 11" + Excep);
           // alert("PeriodicalWorkComponent.LoadHierarchy 22: " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.LoadHierarchy", Excep);
        }

    }

    this.ShowBackButton = function () {
        try {
            OneViewConsole.Debug("ShowBackButton Start", "PeriodicalWorkComponent.ShowBackButton");

            var IsSuccess = false;
            
            if (BreadCrumbs.length > 0) {
                IsSuccess = true;
            }
           
            OneViewConsole.Debug("ShowBackButton End", "PeriodicalWorkComponent.ShowBackButton");

            return IsSuccess;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.ShowBackButton", Excep);
        }

    }

    this.ShowHideDCButton = function (IsShowDCButton) {
        try {
            OneViewConsole.Debug("ShowHideDCButton Start", "PeriodicalWorkComponent.ShowHideDCButton");

            var IsSuccess = true;

            if (IsShowDCButton == true) {
                oScope.ShowSaveDiv = true;
                oScope.ShowSubmitDiv = true;
                oScope.ShowSearchDiv = true;
            }
            else {
                oScope.ShowSaveDiv = false;
                oScope.ShowSubmitDiv = false;
                oScope.ShowSearchDiv = false;
                oScope.periodicsGraphSearchElement = "";
            }
            oScope.$apply();

            OneViewConsole.Debug("ShowHideDCButton End", "PeriodicalWorkComponent.ShowHideDCButton");

            return IsSuccess;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.ShowBackButton", Excep);
        }

    }

    this.LoadLastLevel = function (TemplateConfigMetadata) {
        try {
            OneViewConsole.Debug("LoadLastLevel Start", "PeriodicalWorkComponent.LoadLastLevel");

            var Html = '';
            if (TemplateConfigMetadata != undefined) {
                var _oPeriodicDefaultAttributeComponent = new PeriodicDefaultAttributeComponent(TemplateConfigMetadata.TemplateNodeId, TemplateConfigMetadata.TemplateConfigMetaDataDetails.Childs[0].Id);
                _oPeriodicDefaultAttributeComponent.AttributeConfig = TemplateConfigMetadata.TemplateConfigMetaDataDetails.Childs[0];
                Html = _oPeriodicDefaultAttributeComponent.GetHtml();
               
            }
            else {
                alert('TemplateConfigMetadata Not available for the Template ');
            }
            OneViewConsole.Debug("LoadLastLevel End", "PeriodicalWorkComponent.LoadLastLevel");

            return Html;
        }
        catch (Excep) {
           // alert("PeriodicalWorkComponent.LoadLastLevel 11" + Excep);
           // alert("PeriodicalWorkComponent.LoadLastLevel 22: " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.LoadLastLevel", Excep);
        }

    }

    this.GetTemplateConfigMetadata = function (TemplateNodeId) {
        try {
            OneViewConsole.Debug("GetTemplateConfigMetadata Start", "PeriodicalWorkComponent.GetTemplateConfigMetadata");

            var TemplateConfigMetadata = PTempMData[TemplateNodeId];

            OneViewConsole.Debug("GetTemplateConfigMetadata End", "PeriodicalWorkComponent.GetTemplateConfigMetadata");

            return TemplateConfigMetadata;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.GetTemplateConfigMetadata", Excep);
        }

    }

    this.GetBandDetailsByBandId = function (BandId) {
        try {
            OneViewConsole.Debug("GetBandDetailsByBandId Start", "PeriodicalWorkComponent.GetBandDetailsByBandId");

            //var BandDetails=[];

            //BandDetails[1] = [
            //                { 'Id': 1, 'Name': "Yes", "Value": 0, 'Sequence': 1, 'ColourCode': 'Green' },
            //                { 'Id': 2, 'Name': "No", "Value": 1, 'Sequence': 2, 'ColourCode': 'Red' },
                           
            //];

            var _oLVBandDetailsCacheComponent = new LVBandDetailsCacheComponent();
            var DataSourceLst = _oLVBandDetailsCacheComponent.GetBandDetailsByBandId(BandId);
            //alert(' DataSourceLst aa : ' + JSON.stringify(DataSourceLst));
            OneViewConsole.Debug("GetBandDetailsByBandId End", "PeriodicalWorkComponent.GetBandDetailsByBandId");

            return DataSourceLst;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.GetBandDetailsByBandId", Excep);
        }

    }

    this.InitializeModel = function (Childs) {
        try {
            OneViewConsole.Debug("InitializeModel Start", "PeriodicalWorkComponent.InitializeModel");

            for (var i = 0; i < Childs.length; i++) {
                var ElementDetails = Childs[i];
                if (ElementDetails.IsTemplate == true) {
                    var TemplateNodeId = ElementDetails.Id;
                    var ValidProfileData = CompleteDcStatusCountDict.TemplateInfo[TemplateNodeId];
                    if (ValidProfileData != undefined) {
                        var TemplateConfigMetadata = MyInstance.GetTemplateConfigMetadata(TemplateNodeId);
                        if (TemplateConfigMetadata != undefined) {
                            var TemplateChilds = TemplateConfigMetadata.TemplateConfigMetaDataDetails.Childs[0];
                            var AttributeId = TemplateChilds.Id;
                            // var LastDcInfoList = MyInstance.GetLastDcInfo(LoginUserId, TemplateNodeId, DcPlaceId, DcPlaceDimension);
                            var TemplateDCStatus = MyInstance.GetTemplateDCStatus(LoginUserId, TemplateNodeId, DcPlaceId, DcPlaceDimension);
                            
                            if (TemplateDCStatus != null) {
                                var LastDCInfo = TemplateDCStatus.LastDCInfo;
                                var AnswerModes = TemplateChilds.AnswerModes;
                                var _LVTemplateResult = {};
                                var DataCaptureId = 0;
                                var DataCaptureClientGuid = '';
                                var DCResultId = 0;
                                var IsOnDeviceApprovalFinished = false;

                                var IsEdit = false;
                                var IsNew = false;
                               // alert('TemplateDCStatus.Occurrence  : ' + TemplateDCStatus.Occurrence   + " ," +TemplateDCStatus.OverAllInProgressDCCount + " , PeriodicPropertyToAccess : " + PeriodicPropertyToAccess + " , TemplateDCStatus[PeriodicPropertyToAccess] : " + TemplateDCStatus[PeriodicPropertyToAccess]);
                                if (TemplateDCStatus.OverAllInProgressDCCount > 0 || (PeriodicPropertyToAccess != 'OverAllCompletedDCCount' && TemplateDCStatus.OverAllCompletedDCCount > 0)) {
                                    IsEdit = true; //OverAllInProgressDCCount
                                }
                                else if (TemplateDCStatus.Occurrence > TemplateDCStatus.OverAllCompletedDCCount) {
                                    IsNew = true;
                                }

                               // alert('IsEdit : ' + IsEdit + ' , IsNew : ' + IsNew);
                                if (LastDCInfo != null && IsEdit == true) {
                                    DataCaptureId = LastDCInfo.DataCaptureId;
                                    DataCaptureClientGuid = LastDCInfo.DataCaptureClientGuid;
                                    DCResultId = LastDCInfo.DCResultId;
                                    IsOnDeviceApprovalFinished = LastDCInfo.IsOnDeviceApprovalFinished;

                                    for (var j = 0; j < AnswerModes.length ; j++) {
                                        var AnswerMode = AnswerModes[j];
                                        var ControlDCResultDetails = LastDCInfo.AttributeDCResultDetails[AttributeId];
                                        var DBAnswerList = ControlDCResultDetails[AnswerMode.ControlId];
                                        if (DBAnswerList.length > 1) {
                                            alert("More than one answer not implemented");
                                        }
                                        else if (DBAnswerList.length == 1) {
                                            DBAnswerList[0].ESTTime = TemplateChilds.ESTTime;
                                            DBAnswerList[0].IsNA = LastDCInfo.IsNA;
                                            _LVTemplateResult = oModelOperationComponent.InitModel(TemplateNodeId, TemplateConfigMetadata.TemplateName, AttributeId, DBAnswerList[0], TemplateDCStatus.DcProfileServerId, AnswerModes[j].ControlId, _LVTemplateResult, AnswerMode);
                                            MyInstance.InitializeMultiMediaSubElementsModel(AnswerMode.Type,TemplateNodeId, AttributeId, AnswerModes[j].ControlId, DCResultId, DBAnswerList[0].DCResultDetailClientGuid);
                                        }
                                        //for (var k = 0; k < LastDcInfoList.length ; k++) {
                                        //    var LastDcInfo = LastDcInfoList[k];
                                        //    DataCaptureId = LastDcInfo.DataCaptureId;
                                        //    DataCaptureClientGuid = LastDcInfo.DataCaptureClientGuid;
                                        //    DCResultId = LastDcInfo.DCResultId;
                                        //    if (AnswerMode.ControlId == LastDcInfo.ControlId) {
                                        //        _LVTemplateResult = oModelOperationComponent.InitModel(TemplateNodeId, TemplateConfigMetadata.TemplateName, AttributeId, LastDcInfo, TemplateDCStatus.DcProfileServerId, AnswerModes[j].ControlId, _LVTemplateResult, AnswerMode);
                                        //    }
                                        //}
                                    }
                                }
                                else if(IsNew == true) {
                                    var DBAnswer = { ControlId: '', DataCaptureId: 0, DCResultId: 0, DCResultDetailId: '', Answer: '', AnswerValue: '', AnswerValue: '', AnswerDataType: '', AnswerMode: '', ESTTime: TemplateChilds.ESTTime, IsNA: false,'DCResultDetailClientGuid' : '' };
                                    for (var j = 0; j < AnswerModes.length ; j++) {
                                        var AnswerMode = AnswerModes[j];
                                        _LVTemplateResult = oModelOperationComponent.InitModel(TemplateNodeId, TemplateConfigMetadata.TemplateName, AttributeId, DBAnswer, TemplateDCStatus.DcProfileServerId, AnswerModes[j].ControlId, _LVTemplateResult, AnswerMode);
                                        MyInstance.InitializeMultiMediaSubElementsModel(AnswerMode.Type, TemplateNodeId, AttributeId, AnswerModes[j].ControlId, DCResultId, DBAnswer.DCResultDetailClientGuid);
                                    }
                                }

                                if (IsNew == true || IsEdit == true) {
                                    oModelOperationComponent.CreateCompletePeriodicTemplateResult(TemplateNodeId, TemplateConfigMetadata.TemplateName, DataCaptureId, DataCaptureClientGuid, DCResultId, TemplateDCStatus.DcProfileServerId, _LVTemplateResult, TemplateDCStatus, IsOnDeviceApprovalFinished);
                                }
                            }
                        }
                        else {
                            alert('TemplateConfigMetadata Not available for the Template Id : ' + TemplateNodeId);
                        }
                    }
                }
            }

           
            OneViewConsole.Debug("InitializeModel End", "PeriodicalWorkComponent.InitializeModel");

        }
        catch (Excep) {
           // alert("PeriodicalWorkComponent.InitializeModel 11" + Excep);
           // alert("PeriodicalWorkComponent.InitializeModel 22: " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.InitializeModel", Excep);
        }

    }
    
    this.GetLastDcInfo = function (LoginUserId, TemplateNodeId, DcPlaceId, DcPlaceDimension) {
        try {
            OneViewConsole.Debug("GetLastDcInfo Start", "PeriodicalWorkComponent.GetLastDcInfo");
            
            var LastDcInfo = [];// [{'ControlId':'', DataCaptureId: 0, DCResultId: 0, DCResultDetailId: '', Answer: '', AnswerValue: '',AnswerValue: '', AnswerDataType: '' , AnswerMode : '', ESTTime :'',IsNA :''}];
        
            OneViewConsole.Debug("GetLastDcInfo End", "PeriodicalWorkComponent.GetLastDcInfo");

            return LastDcInfo;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.GetLastDcInfo", Excep);
        }

    }

    this.GetTemplateDCStatus = function (UserId, TemplateId, DCPlaceId, DcPlaceDimension) {
        try {

            var RequestParam = {
                "ServiceId": ServiceId,
                "UserId": UserId,
                "TemplateNodeId": TemplateId,
                "PlaceId": DCPlaceId,
                "DcPlaceDimension": DcPlaceDimension,
                "DCPlaceRCOType": 16,
                "IsCompleted": "-1",
                "IsSynchronized": "-1",
                "IsLastDcLstNeeded": true
            }

            //alert('RequestParam : ' + JSON.stringify(RequestParam));
            var _oPlatformPeriodicsBO = new PlatformPeriodicsBO(xlatService, PeriodicMainTemplateGroupId);
            var Response = _oPlatformPeriodicsBO.Get(RequestParam);
            //alert('PeriodicalWorkComponent.GetTemplateDCStatus Response : ' + JSON.stringify(Response));
            ////Todo : delete later only for testing
            //if (Response == null) {
            //    Response = { DcProfileServerId: 19 };
            //}
            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.GetTemplateDCStatus", Excep);
        }
    }

    this.CheckSaveValidation = function (OperationName,TemplateId) {
        try {
            OneViewConsole.Debug("CheckSaveValidation Start", "PeriodicalWorkComponent.CheckSaveValidation");

            var Response = MyInstance.SaveValidations(OperationName, TemplateId);

            OneViewConsole.Debug("CheckSaveValidation End", "PeriodicalWorkComponent.CheckSaveValidation");

            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.CheckSaveValidation", Excep);
        }
    }

    this.CheckSubmitValidation = function () {
        try {
            OneViewConsole.Debug("CheckSubmitValidation Start", "PeriodicalWorkComponent.CheckSubmitValidation");

            var IsSuccess = true;

            OneViewConsole.Debug("CheckSubmitValidation End", "PeriodicalWorkComponent.CheckSubmitValidation");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.CheckSubmitValidation", Excep);
        }
    }

    this.SaveTemplateWise = function (OperationName, IsSaveDraft) {
        try {
            OneViewConsole.Debug("SaveTemplateWise Start", "PeriodicalWorkComponent.SaveTemplateWise");

            var Response = { IsSuccess: false, 'NumOfRecordsSaved': 0, 'Message': '', IsTotalSuccess: true };//xlatService.xlat('Please enter ')
            var Message = '';
            var Count = 0;
            for (var TemplateId in CompletePeriodicTemplateResult) {
                var DcDetails = CompletePeriodicTemplateResult[TemplateId];
               // alert(DcDetails.IsOnDeviceApprovalFinished + ' , IsPeriodicApprovalProfileExists  : ' + IsPeriodicApprovalProfileExists + ' , DcDetails : ' + JSON.stringify(DcDetails));
                var TemplateDCStatus = DcDetails.TemplateDCStatus;
                var LVTemplateResult = DcDetails.LVTemplateResult;
               // alert(PeriodicPropertyToAccess + ', TemplateDCStatus : ' + JSON.stringify(TemplateDCStatus));
               // alert('LVTemplateResult : ' + JSON.stringify(LVTemplateResult));
                if ((TemplateDCStatus.Occurrence >= TemplateDCStatus[PeriodicPropertyToAccess]) && (LVTemplateResult != undefined && Object.keys(LVTemplateResult).length > 0)
                && ((IsPeriodicApprovalProfileExists == true && (DcDetails.IsOnDeviceApprovalFinished != true && DcDetails.IsOnDeviceApprovalFinished != 'true')) || IsPeriodicApprovalProfileExists != true)) {//
                    var ValidationResponse = MyInstance.CheckSaveSubmitValidation(OperationName, TemplateId);
                    //alert('ValidationResponse : ' + JSON.stringify(ValidationResponse));
                    if (ValidationResponse.IsSuccess == true) {
                       
                        var MultiMediaSubElementsAnswerModeDict = CompleteMultiMediaSubElementsAnswerModeDict[TemplateId];
                        
                        var SubmitValidation = MyInstance.CheckSaveSubmitValidation('SubmitValidationMetaData', TemplateId);
                        var IsCompleted = (IsSaveDraft == true ? false : SubmitValidation.IsSuccess);
                        var IsSubmit = (IsSaveDraft == true ? false : MyInstance.GetTemplateApprovalStatus(LVTemplateResult));

                        if (CompletePeriodicActionResult[TemplateId] != undefined) {
                            LVActionResult = CompletePeriodicActionResult[TemplateId]
                        }

                        var LVDCSummary = { 'CommentsInfo': { 'IsModified': false }, 'CommentsInfo': { 'Comments': "" }, IsBlocker: DcDetails.IsBlocker };


                        OneViewSessionStorage.Save("DcProfileId", DcDetails.DcProfileServerId);
                        OneViewSessionStorage.Save("TemplateId", DcDetails.TemplateNodeId);
                        OneViewSessionStorage.Save("TemplateName", DcDetails.TemplateNodeName);

                        var oPeriodicLVDataCaptureBO = new PeriodicLVDataCaptureBO();


                        //Save/Submit
                        if (DcDetails.DataCaptureId == 0) {
                            var LVDcStartDate = new DateTime().GetDateAndTime();

                            var TemplateWiseSaveResponse = oPeriodicLVDataCaptureBO.Save(LVTemplateResult, LVDcStartDate, IsCompleted, LVDCSummary, IsSubmit, MultiMediaSubElementsAnswerModeDict);
                            var DcInfo = TemplateWiseSaveResponse.DcInfo;
                            if (DcInfo != null) {
                                //update model
                                MyInstance.UpdatePeriodicTemplateResultModel(LVTemplateResult, DcInfo);
                                DcDetails.DataCaptureId = DcInfo.DcId;
                                DcDetails.DCResultId = DcInfo.DcResultsId;
                                Count++;


                                var ActionInfo = TemplateWiseSaveResponse.AttributeActionInfo;

                                //Update Action model if any action created
                                if (ActionInfo != null) {
                                    // alert('ActionInfo : ' + JSON.stringify(ActionInfo));

                                    var Key;
                                    for (var itrLVActionResult in LVActionResult) {
                                        LVActionResult[itrLVActionResult].ActionClientId = ActionInfo[itrLVActionResult].ActionClientId;
                                        LVActionResult[itrLVActionResult].ActionClientGuid = ActionInfo[itrLVActionResult].ActionClientGuid;
                                        LVActionResult[itrLVActionResult].DCNCMappingClientId = ActionInfo[itrLVActionResult].DCNCMappingClientId;
                                        for (var i = 0; i < LVActionResult[itrLVActionResult].Actions.length; i++) {
                                            if (LVActionResult[itrLVActionResult].Actions[i].ActionType == LVActionType.CustomAction) {
                                                Key = LVActionResult[itrLVActionResult].Actions[i].Name;
                                            }
                                            else if (LVActionResult[itrLVActionResult].Actions[i].ActionType == LVActionType.PredefinedAction) {
                                                Key = LVActionResult[itrLVActionResult].Actions[i].PreDefinedActionId;
                                            }
                                            LVActionResult[itrLVActionResult].Actions[i].ActionDetailsClientId = ActionInfo[itrLVActionResult].ActionDetails[Key].ActionDetailsClientId;
                                        }
                                        for (var j = 0; j < LVActionResult[itrLVActionResult].MultimediaSubElements.length; j++) {
                                            LVActionResult[itrLVActionResult].MultimediaSubElements[j].ClientId = ActionInfo[itrLVActionResult].MultiMediaSubElements[LVActionResult[itrLVActionResult].MultimediaSubElements[j].LocalURL].ClientId;
                                            LVActionResult[itrLVActionResult].MultimediaSubElements[j].ClientGuid = ActionInfo[itrLVActionResult].MultiMediaSubElements[LVActionResult[itrLVActionResult].MultimediaSubElements[j].LocalURL].ClientGuid;
                                        }
                                    }


                                }
                            }

                            //update multimedia model
                            var CreatedMultiMediaSubElementsAnswerModeList = TemplateWiseSaveResponse.CreatedMultiMediaSubElementsAnswerModeList;
                            if (CreatedMultiMediaSubElementsAnswerModeList != null) {
                                MyInstance.UpdateMultiMediaSubElementsAnswerModeModel(MultiMediaSubElementsAnswerModeDict, CreatedMultiMediaSubElementsAnswerModeList);
                            }
                        }

                            //Update
                        else {
                            var TemplateWiseUpdateResponse = oPeriodicLVDataCaptureBO.Update(LVTemplateResult, DcDetails.DataCaptureId, DcDetails.DCResultId, true, IsCompleted, LVDCSummary, IsSubmit, MultiMediaSubElementsAnswerModeDict);
                            if (TemplateWiseUpdateResponse.IsSuccess == true) {
                                Count++;
                                //update multimedia model
                                var CreatedMultiMediaSubElementsAnswerModeList = TemplateWiseUpdateResponse.CreatedMultiMediaSubElementsAnswerModeList;

                                if (CreatedMultiMediaSubElementsAnswerModeList != null) {
                                    MyInstance.UpdateMultiMediaSubElementsAnswerModeModel(MultiMediaSubElementsAnswerModeDict, CreatedMultiMediaSubElementsAnswerModeList);
                                }
                            }



                            //update multimedia model
                        }
                    }
                    else {
                        Response.IsTotalSuccess = false;
                        if (Message != '') {
                            Message += ', '
                        }
                        Message += xlatService.xlat(ValidationResponse.Message);
                    }
                }
                else {
                    Response.IsSuccess = true;
                }
            }
            //alert('Count : ' + Count);

            if (Count > 0) {
                Response.IsSuccess =true;
                Response.NumOfRecordsSaved = Count;
            }
            if (Message != '') {
                Response.Message += Message;

            }
            OneViewConsole.Debug("SaveTemplateWise End", "PeriodicalWorkComponent.SaveTemplateWise");

            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.SaveTemplateWise", Excep);
        }
    }

    this.GetTemplateApprovalStatus = function (LVTemplateResult) {
        try {
            OneViewConsole.Debug("GetTemplateApprovalStatus Start", "PeriodicalWorkComponent.GetTemplateApprovalStatus");

            var IsSubmit = false;
           
            OneViewConsole.Debug("GetTemplateApprovalStatus End", "PeriodicalWorkComponent.GetTemplateApprovalStatus");

            return IsSubmit;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.GetTemplateApprovalStatus", Excep);
        }
    }

    this.CheckSaveSubmitValidation = function (OperationName, TemplateId) {
        try {
            OneViewConsole.Debug("CheckSaveSubmitValidation Start", "PeriodicalWorkComponent.CheckSaveSubmitValidation");

            var IsSuccess = true;
            var Response = { 'IsSuccess': false, 'Message': "" };
                  
            if (CompletePeriodicTemplateResult[TemplateId] != undefined) {
                var LVTemplateResult = CompletePeriodicTemplateResult[TemplateId].LVTemplateResult;
                if (LVTemplateResult != undefined && Object.keys(LVTemplateResult).length > 0) {
                    if (CompletePeriodicTemplateResult[TemplateId].IsBlocker != true) {
                        var TemplateWiseMetadata = MyInstance.GetMandatoryMetadataForTemplate(TemplateId);
                        if (TemplateWiseMetadata != undefined) {
                            var TemplateWiseValidationMetaData = TemplateWiseMetadata[OperationName];
                            if (TemplateWiseValidationMetaData != undefined) {
                                if (TemplateWiseValidationMetaData.IsAgainstDC == true) {
                                    var DCValidationRuleMetaData = TemplateWiseValidationMetaData.DCValidationRuleMetaData;
                                    for (var i = 0; i < DCValidationRuleMetaData.length; i++) {
                                        var Type = DCValidationRuleMetaData[i].Type;

                                        //alert(TemplateId + ', LVTemplateResult : ' + JSON.stringify(LVTemplateResult));
                                        if (Type == 'DefaultDCValidationRuleMetaData') {
                                            var MandatoryElements = DCValidationRuleMetaData[i].MandatoryElements;
                                            for (var j = 0; j < MandatoryElements.length ; j++) {
                                                var ElementData = MandatoryElements[j];
                                                var AttributeNodeId = MandatoryElements[j].AttributeNodeId;
                                                var ControlId = MandatoryElements[j].ControlId;
                                                var DefaultValue = MandatoryElements[j].DefaultValue;
                                                DefaultValue = DefaultValue.toLowerCase();
                                                var AnswerDetails = MyInstance.GetAnswerDetailsForControl(LVTemplateResult, AttributeNodeId, ControlId);
                                                // for (var k = 0; k < LVTemplateResult[AttributeNodeId].Answers.length ; k++) {
                                                //if (LVTemplateResult[AttributeNodeId].Answers[k].ControlId == ControlId) {
                                                //alert(AnswerDetails.Answer + "," + DefaultValue + "," + LVTemplateResult[AttributeNodeId].NA + "," + LVTemplateResult[AttributeNodeId].IsBlocker);
                                                if (AnswerDetails.Answer != DefaultValue || LVTemplateResult[AttributeNodeId].NA == true || LVTemplateResult[AttributeNodeId].IsBlocker == true) {
                                                    Response.IsSuccess = true;
                                                }
                                                else {
                                                    IsSuccess = false;
                                                    Response.IsSuccess = false;
                                                    Response.Message += MandatoryElements[j].ErrorMessageKey;
                                                }
                                                // }
                                                //}
                                            }
                                        }
                                        else if (Type == 'AdvanceDCValidationRuleMetaData') {
                                            var FinalJavaScriptEquation = DCValidationRuleMetaData[i].FinalJavaScriptEquation.replace(/#/g, "'");
                                            var IsRuleSuccess = eval(FinalJavaScriptEquation);
                                            //alert('IsRuleSuccess : ' + IsRuleSuccess + " ," + FinalJavaScriptEquation);
                                            if (IsRuleSuccess == true) {
                                                Response.IsSuccess = true;
                                            }
                                            else {
                                                IsSuccess = false;
                                                Response.IsSuccess = false;
                                                Response.Message += DCValidationRuleMetaData[i].ErrorMessageKey;
                                            }
                                        }
                                    }
                                }
                                else {
                                    alert('TemplateId : ' + TemplateId + ' , TemplateWiseSaveValidationMetaData.IsAgainstDC = ' + TemplateWiseSaveValidationMetaData.IsAgainstDC);
                                }
                            }
                        }
                        else {
                            Response.IsSuccess = true;
                        }
                    }
                    else {
                        Response.IsSuccess = true;
                    }
                }
                else {
                    Response.IsSuccess = true;
                }
            }
            else {
                Response.IsSuccess = true;
            }

            if (IsSuccess == false) {

                //if (Response.Message != '') {
                //    Response.Message = + Response.Message;

                //}
                Response.IsSuccess = false;
            }

            OneViewConsole.Debug("CheckSaveSubmitValidation End", "PeriodicalWorkComponent.CheckSaveSubmitValidation");

            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.CheckSaveSubmitValidation", Excep);
        }
    }

    this.GetAnswerDetailsForControl = function (LVTemplateResult, AttributeNodeId, ControlId) {
        try {
            OneViewConsole.Debug("GetAnswerDetailsForControl Start", "PeriodicalWorkComponent.GetAnswerDetailsForControl");

            var AnswerDetails = null;
            if (LVTemplateResult[AttributeNodeId].Answers != undefined) {
                for (var k = 0; k < LVTemplateResult[AttributeNodeId].Answers.length ; k++) {
                    if (LVTemplateResult[AttributeNodeId].Answers[k].ControlId == ControlId) {
                        AnswerDetails = LVTemplateResult[AttributeNodeId].Answers[k];
                        break;
                    }
                }
            }

            OneViewConsole.Debug("GetAnswerDetailsForControl End", "PeriodicalWorkComponent.GetAnswerDetailsForControl");

            return AnswerDetails;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.GetAnswerDetailsForControl", Excep);
        }
    }

    this.GetMandatoryMetadataForTemplate = function (TemplateId) {
        try {
            OneViewConsole.Debug("CheckSubmitValidation Start", "PeriodicalWorkComponent.GetMandatoryMetadataForTemplate");

            var TemplateWiseMetadata = PeriodicMandatoryMetadata[TemplateId];

            OneViewConsole.Debug("CheckSubmitValidation End", "PeriodicalWorkComponent.GetMandatoryMetadataForTemplate");

            return TemplateWiseMetadata;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.GetMandatoryMetadataForTemplate", Excep);
        }
    }
    
    this.LoadAttributeOtherConfig = function (TemplateNodeId) {
        try {
            OneViewConsole.Debug("LoadAttributeOtherConfig Start", "PeriodicalWorkComponent.LoadAttributeOtherConfig");


            var TemplateIdList = MyInstance.GetProfiledTemplateNodeIdList(TemplateNodeId);

            for (var i = 0; i < TemplateIdList.length ; i++) {
                var TemplateId=TemplateIdList[i];
                if (CompletePeriodicAttributeOtherConfigDict[TemplateId] == undefined) {
                    var TemplateWiseMetadata = GetAttributeOtherConfigMetaData(TemplateId);
                    if (TemplateWiseMetadata != null) {
                        CompletePeriodicAttributeOtherConfigDict[TemplateId] = TemplateWiseMetadata;
                    }
                }
            }

           // alert('CompletePeriodicAttributeOtherConfigDict : ' + JSON.stringify(CompletePeriodicAttributeOtherConfigDict));
            
            /*
            var TemplateWiseMetadata = {
                80: {
                    ServiceId: 17,
                    DcPlaceId: 0,
                    DcPlaceDimension: 16,
                    DcUserId: 0,
                    TemplateNodeId: 80,
                    "NAMetaDataDict": {
                        "81":
                            { "IsNAEnabled": true, "IsExcluded": false, "OVGuid": 0, "Type": 0, "CreatedDate": "\/Date(-62135596800000)\/", "TimeStamp": null, "CreatedUserId": 0, "UpdatedUserId": 0 }
                    },
                    "HelpDocumentMetaDataDict": {
                        "81": { "Name": null, "MutiMedia": null, "Online": false, "URL": null, "HelpDocString": " Test Info 81", "OVGuid": 0, "Type": 0, "CreatedDate": "\/Date(-62135596800000)\/", "TimeStamp": null, "CreatedUserId": 0, "UpdatedUserId": 0 }
                    }
                },
                76: {
                    ServiceId: 17,
                    DcPlaceId: 0,
                    DcPlaceDimension: 16,
                    DcUserId: 0,
                    TemplateNodeId: 76,
                    "NAMetaDataDict": {
                        "77":
                            { "IsNAEnabled": true, "IsExcluded": false, "OVGuid": 0, "Type": 0, "CreatedDate": "\/Date(-62135596800000)\/", "TimeStamp": null, "CreatedUserId": 0, "UpdatedUserId": 0 }
                    },
                    "HelpDocumentMetaDataDict": {
                        "77": { "Name": null, "MutiMedia": null, "Online": false, "URL": null, "HelpDocString": " Test Info 77", "OVGuid": 0, "Type": 0, "CreatedDate": "\/Date(-62135596800000)\/", "TimeStamp": null, "CreatedUserId": 0, "UpdatedUserId": 0 }
                    }
                },
                78: {
                    ServiceId: 17,
                    DcPlaceId: 0,
                    DcPlaceDimension: 16,
                    DcUserId: 0,
                    TemplateNodeId: 78,
                    "NAMetaDataDict": {
                        "79": { "IsNAEnabled": true, "IsExcluded": false, "OVGuid": 0, "Type": 0, "CreatedDate": "\/Date(-62135596800000)\/", "TimeStamp": null, "CreatedUserId": 0, "UpdatedUserId": 0 }
                    },
                    "HelpDocumentMetaDataDict": {
                        "79": { "Name": null, "MutiMedia": null, "Online": false, "URL": null, "HelpDocString": " Test Info 79", "OVGuid": 0, "Type": 0, "CreatedDate": "\/Date(-62135596800000)\/", "TimeStamp": null, "CreatedUserId": 0, "UpdatedUserId": 0 }
                    }
                }
            };
            CompletePeriodicAttributeOtherConfigDict = TemplateWiseMetadata;
            */

            OneViewConsole.Debug("LoadAttributeOtherConfig End", "PeriodicalWorkComponent.LoadAttributeOtherConfig");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.LoadAttributeOtherConfig", Excep);
        }
    }

    this.LoadActionNCProfile = function (TemplateNodeId) {
        try {
            OneViewConsole.Debug("LoadActionNCProfile Start", "PeriodicalWorkComponent.LoadActionNCProfile");
            
            var TemplateIdList = MyInstance.GetProfiledTemplateNodeIdList(TemplateNodeId);
            
            for (var i = 0; i < TemplateIdList.length; i++) {
                var TemplateId = TemplateIdList[i];
                if (CompletePeriodicActionNCProfileDict[TemplateId] == undefined) {
                   // alert('LoadActionNCProfile : '+ ServiceId + "," + LoginUserId + "," + TemplateId + "," + DcPlaceId + "," + DcPlaceDimension);
                    var MetaData = GetActionNCMetaData(ServiceId, LoginUserId, TemplateId, DcPlaceId, DcPlaceDimension);
                    if (MetaData != null) {
                        CompletePeriodicActionNCProfileDict[TemplateId] = MetaData;
                    }
                }
            }

            //alert('CompletePeriodicActionNCProfileDict : ' + JSON.stringify(CompletePeriodicActionNCProfileDict));

            /*
            CompletePeriodicActionNCProfileDict = {
                "80": {
                    'ServiceId': 17,
                    'TemplateNodeId': 2,
                    'AttributeWiseActionNCConfig': {
                        "81": [
                                    {
                                        "Rule": null,
                                        "RuleId": 100,
                                        "ControlId": "BandControlId_81",
                                        "FinalJavaScriptEquation": "Model[#BandControlId_81#] == #2#",
                                        "CriteriaDisplayLabelKey": "",
                                        "IsNC": true,
                                        "IsActionEnable": false,
                                        "IsObservation": false,
                                        "IsManual": true,
                                        "IsNCOrObservationMandatory": false,
                                        "IsCommentsMandatory": false,
                                        "RuleName": null,
                                        "RuleDescription": null,
                                        "RuleGroup": null,
                                        "RuleCode": null,
                                        "Deviatedby": null,
                                        "ExpectedValue": null,
                                        "ActualValue": null,
                                        "CustomDisplayLabelKey": null,
                                        "ActionList": null,
                                        "IsCustomActionEnabled": true,
                                        "CustomeActionSetting": null,
                                        "MinNoOfPreDefinedAction": 0,
                                        "MinNoOfFormAction": 0,
                                        "MinNoOfCustomeAction": 0,
                                        "MaxNoOfCustomeAction": 0,
                                        "MinNoAction": 0,
                                        "ExecutionOrderEditable": false,
                                        "SLAEditable": false,
                                        "FollowupUserEditable": false,
                                        "OVGuid": 0,
                                        "Code": null,
                                        "Type": 0,
                                        "ClientGuid": null,
                                        "IsDisable": false,
                                        "DisableDate": null
                                    }
                        ]
                    },
                    'MultipleAttributeActionNCConfig': {},
                    'TemplateWiseActionNCConfig': {}
                },
                "76": {
                    'ServiceId': 17,
                    'TemplateNodeId': 2,
                    'AttributeWiseActionNCConfig': {
                        "77": [
                                    {
                                        "Rule": null,
                                        "RuleId": 101,
                                        "ControlId": "BandControlId_77",
                                        "FinalJavaScriptEquation": "Model[#BandControlId_77#] == #2#",
                                        "CriteriaDisplayLabelKey": "",
                                        "IsNC": true,
                                        "IsActionEnable": false,
                                        "IsObservation": false,
                                        "IsManual": true,
                                        "IsNCOrObservationMandatory": false,
                                        "IsCommentsMandatory": false,
                                        "RuleName": null,
                                        "RuleDescription": null,
                                        "RuleGroup": null,
                                        "RuleCode": null,
                                        "Deviatedby": null,
                                        "ExpectedValue": null,
                                        "ActualValue": null,
                                        "CustomDisplayLabelKey": null,
                                        "ActionList": null,
                                        "IsCustomActionEnabled": true,
                                        "CustomeActionSetting": null,
                                        "MinNoOfPreDefinedAction": 0,
                                        "MinNoOfFormAction": 0,
                                        "MinNoOfCustomeAction": 0,
                                        "MaxNoOfCustomeAction": 0,
                                        "MinNoAction": 0,
                                        "ExecutionOrderEditable": false,
                                        "SLAEditable": false,
                                        "FollowupUserEditable": false,
                                        "OVGuid": 0,
                                        "Code": null,
                                        "Type": 0,
                                        "ClientGuid": null,
                                        "IsDisable": false,
                                        "DisableDate": null
                                    }
                        ]
                    },
                    'MultipleAttributeActionNCConfig': {},
                    'TemplateWiseActionNCConfig': {}
                },
                "78": {
                    'ServiceId': 17,
                    'TemplateNodeId': 2,
                    'AttributeWiseActionNCConfig': {
                        "79": [
                                    {
                                        "Rule": null,
                                        "RuleId": 102,
                                        "ControlId": "BandControlId_79",
                                        "FinalJavaScriptEquation": "Model[#BandControlId_79#] == #2#",
                                        "CriteriaDisplayLabelKey": "",
                                        "IsNC": true,
                                        "IsActionEnable": false,
                                        "IsObservation": false,
                                        "IsManual": true,
                                        "IsNCOrObservationMandatory": false,
                                        "IsCommentsMandatory": false,
                                        "RuleName": null,
                                        "RuleDescription": null,
                                        "RuleGroup": null,
                                        "RuleCode": null,
                                        "Deviatedby": null,
                                        "ExpectedValue": null,
                                        "ActualValue": null,
                                        "CustomDisplayLabelKey": null,
                                        "ActionList": null,
                                        "IsCustomActionEnabled": true,
                                        "CustomeActionSetting": null,
                                        "MinNoOfPreDefinedAction": 0,
                                        "MinNoOfFormAction": 0,
                                        "MinNoOfCustomeAction": 0,
                                        "MaxNoOfCustomeAction": 0,
                                        "MinNoAction": 0,
                                        "ExecutionOrderEditable": false,
                                        "SLAEditable": false,
                                        "FollowupUserEditable": false,
                                        "OVGuid": 0,
                                        "Code": null,
                                        "Type": 0,
                                        "ClientGuid": null,
                                        "IsDisable": false,
                                        "DisableDate": null
                                    }
                        ]
                    },
                    'MultipleAttributeActionNCConfig': {},
                    'TemplateWiseActionNCConfig': {}
                }
            };
           */

            OneViewConsole.Debug("LoadActionNCProfile End", "PeriodicalWorkComponent.LoadActionNCProfile");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.LoadActionNCProfile", Excep);
        }
    }

    this.LoadDcPeriodicDiaplayMetaData = function (TemplateGroupId) {
        try {
            OneViewConsole.Debug("LoadDcPeriodicDiaplayMetaData Start", "PeriodicalWorkComponent.LoadDcPeriodicDiaplayMetaData");

            if (ServiceId == 17) {
                DcPeriodicDisplayMetaData = {
                    "ServiceId": 17, "TemplateId": 2, "User": null, "Place": null, "ButtonBarConfig": {
                        "Type": "DcPeriodicDefaultButtonBarConfig", "DcPeriodicOperationConfigDict":
                        {
                            "1": { "Operation": "Back", "Event": "", "Position": "1" },
                            "2": { "Operation": "Save", "Event": "", "Position": "2" },
                            "3": { "Operation": "Submit", "Event": "", "Position": "3" },
                        }
                    }
                   
                };
            }
            else if (ServiceId == 7) {
                DcPeriodicDisplayMetaData = {
                    "ServiceId": 7, "TemplateId": 338, "User": null, "Place": null, "ButtonBarConfig": {
                        "Type": "DcPeriodicDefaultButtonBarConfig", "DcPeriodicOperationConfigDict":
                        {
                            "1": { "Operation": "Back", "Event": "", "Position": "1" },
                            "2": { "Operation": "SaveDraft", "Event": "", "Position": "2" },
                            "3": { "Operation": "Submit", "Event": "", "Position": "3" },
                        }
                    }
                  
                };
            }
            else {
                DcPeriodicDisplayMetaData = {
                    "ServiceId": ServiceId, "TemplateId": TemplateGroupId, "User": null, "Place": null, "ButtonBarConfig": {
                        "Type": "DcPeriodicDefaultButtonBarConfig", "DcPeriodicOperationConfigDict":
                        {
                            "1": { "Operation": "Back", "Event": "", "Position": "1" },
                            "2": { "Operation": "Save", "Event": "", "Position": "2" },
                            "3": { "Operation": "Submit", "Event": "", "Position": "3" },
                        }
                    }

                };

               // alert('DcPeriodicDisplayMetaData : ' + JSON.stringify(DcPeriodicDisplayMetaData));
            }
           
            OneViewConsole.Debug("LoadDcPeriodicDiaplayMetaData End", "PeriodicalWorkComponent.LoadDcPeriodicDiaplayMetaData");

        }
        catch (Excep) {
           // alert('LoadDcPeriodicDiaplayMetaData Excep 11 : ' + Excep);
           // alert('LoadDcPeriodicDiaplayMetaData Excep  22 : ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.LoadDcPeriodicDiaplayMetaData", Excep);
        }
    }

    this.LoadButtonBar = function () {
        try {
            OneViewConsole.Debug("LoadButtonBarHtml Start", "PeriodicalWorkHtmlComponent.LoadButtonBarHtml");

           // MyInstance.LoadDcPeriodicDiaplayMetaData(PeriodicMainTemplateGroupId);
            var Html = oPeriodicalWorkHtmlComponent.GetButtonBarHtml();

            var _oOneViewCompiler = new OneViewCompiler();
            _oOneViewCompiler.CompileAndApeend(oScope, oCompile, Html, "ButtonBarDivId");

            OneViewConsole.Debug("LoadButtonBarHtml End", "PeriodicalWorkHtmlComponent.LoadButtonBarHtml");
        }
        catch (Excep) {
           // alert('LoadButtonBar Excep 11 : ' + Excep);
           // alert('LoadButtonBar Excep  22 : ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkHtmlComponent.LoadButtonBarHtml", Excep);
        }
    }

    this.GetDcPeriodicDisplayEvent = function (Position) {
        try {
            OneViewConsole.Debug("GetDcPeriodicDisplayEvent Start", "PeriodicalWorkHtmlComponent.GetDcPeriodicDisplayEvent");
            var Event = "";
            if (DcPeriodicDisplayMetaData != null) {
                if (DcPeriodicDisplayMetaData.ButtonBarConfig.Type == "DcPeriodicDefaultButtonBarConfig") {
                    var ButtonBarConfig = DcPeriodicDisplayMetaData.ButtonBarConfig.DcPeriodicOperationConfigDict[Position];
                    Event = ButtonBarConfig.Event;
                }
                else {
                    alert('DcPeriodicDisplayMetaData.ButtonBarConfig.Type = ' + DcPeriodicDisplayMetaData.ButtonBarConfig.Type + ' : Not implemented');
                }
            }
            OneViewConsole.Debug("GetDcPeriodicDisplayEvent End", "PeriodicalWorkHtmlComponent.GetDcPeriodicDisplayEvent");
            return Event;
        }
        catch (Excep) {
           // alert('LoadButtonBar Excep 11 : ' + Excep);
           // alert('LoadButtonBar Excep  22 : ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkHtmlComponent.GetDcPeriodicDisplayEvent", Excep);
        }
    }

    this.UpdatePeriodicTemplateResultModel = function (LVTemplateResult, DcInfo) {
        try {
            OneViewConsole.Debug("UpdatePeriodicTemplateResultModel Start", "PeriodicalWorkHtmlComponent.UpdatePeriodicTemplateResultModel");

            for (var itrAttributes in LVTemplateResult) {
                //alert(JSON.stringify(LVTemplateResult[itrAttributes]));
                var oAnswers = LVTemplateResult[itrAttributes].Answers;
                for (var i = 0; i < oAnswers.length; i++) {
                    oAnswers[i].ClientId = DcInfo.DcResultDetails[oAnswers[i].ControlId].ClientId;
                    oAnswers[i].ClientGuid = DcInfo.DcResultDetails[oAnswers[i].ControlId].ClientGuid;
                    // oAnswers[i].IsModified = false;
                }
            }
       
            OneViewConsole.Debug("UpdatePeriodicTemplateResultModel End", "PeriodicalWorkHtmlComponent.UpdatePeriodicTemplateResultModel");
            
        }
        catch (Excep) {
           // alert('UpdatePeriodicTemplateResultModel Excep 11 : ' + Excep);
           // alert('UpdatePeriodicTemplateResultModel Excep  22 : ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkHtmlComponent.UpdatePeriodicTemplateResultModel", Excep);
        }
    }

    this.UpdateMultiMediaSubElementsAnswerModeModel = function (MultiMediaSubElementsAnswerModeDict, CreatedMultiMediaSubElementsAnswerModeList) {
        try {
            OneViewConsole.Debug("UpdateMultiMediaSubElementsAnswerModeModel Start", "PeriodicalWorkHtmlComponent.UpdateMultiMediaSubElementsAnswerModeModel");

            for (var AttributeId in MultiMediaSubElementsAnswerModeDict) {
                var ControlWiseMultiMediaSubElementsAnswerModeDict = MultiMediaSubElementsAnswerModeDict[AttributeId];
                for (var ControlId in ControlWiseMultiMediaSubElementsAnswerModeDict) {
                    var MultiMediaSubElementsAnswerModeList = ControlWiseMultiMediaSubElementsAnswerModeDict[ControlId];
                    for (var i = 0; i < MultiMediaSubElementsAnswerModeList.length; i++) {
                        for (var j = 0; j < CreatedMultiMediaSubElementsAnswerModeList.length; j++) {
                            if (MultiMediaSubElementsAnswerModeList[i].LocalURL == CreatedMultiMediaSubElementsAnswerModeList[j].LocalURL) {
                                MultiMediaSubElementsAnswerModeList[i].Id = CreatedMultiMediaSubElementsAnswerModeList[j].Id;
                                MultiMediaSubElementsAnswerModeList[i].ServerId = (CreatedMultiMediaSubElementsAnswerModeList[j].ServerId != "INT" ? CreatedMultiMediaSubElementsAnswerModeList[j].ServerId : 0);
                                MultiMediaSubElementsAnswerModeList[i].MappedEntityClientGuid = CreatedMultiMediaSubElementsAnswerModeList[j].MappedEntityClientGuid;
                                break;
                            }
                        }
                    }

                    var UpdatedMultiMediaSubElementsAnswerModeList = [];
                    for (var i = 0; i < MultiMediaSubElementsAnswerModeList.length; i++) {
                        if (MultiMediaSubElementsAnswerModeList[i].IsDisabled != true) {
                            UpdatedMultiMediaSubElementsAnswerModeList.push(MultiMediaSubElementsAnswerModeList[i]);
                        }
                    }

                    ControlWiseMultiMediaSubElementsAnswerModeDict[ControlId] = UpdatedMultiMediaSubElementsAnswerModeList;
               
                }
            }
                       
            OneViewConsole.Debug("UpdateMultiMediaSubElementsAnswerModeModel End", "PeriodicalWorkHtmlComponent.UpdateMultiMediaSubElementsAnswerModeModel");
        }
        catch (Excep) {
            alert('UpdateMultiMediaSubElementsAnswerModeModel Excep 11 : ' + Excep);
            alert('UpdateMultiMediaSubElementsAnswerModeModel Excep  22 : ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkHtmlComponent.UpdateMultiMediaSubElementsAnswerModeModel", Excep);
        }
    }

    this.GetDcStatusCountByTemplateGroup = function (MainGroupId) {
        try {
            OneViewConsole.Debug("GetDcStatusCountByTemplateGroup Start", "PeriodicalWorkComponent.GetDcStatusCountByTemplateGroup");

            //alert('MainGroupId : ' + MainGroupId);
            var Response = {};

            var RequestParam = {
                "ServiceId": ServiceId,
                "UserId": LoginUserId,
                "TemplateNodeId": MainGroupId,
                "TemplateGroupType": 2,
                "PlaceId": DcPlaceId,
                "DcPlaceDimension": DcPlaceDimension,
                "DCPlaceRCOType": 16,
                "IsCompleted": "-1",
                "IsSynchronized": "-1"
            };

            //alert('RequestParam : ' + JSON.stringify(RequestParam));


            var _oPlatformPeriodicsBO = new PlatformPeriodicsBO();
            var Response = _oPlatformPeriodicsBO.GetByTemplateGroup(RequestParam);


            //alert('Response : ' + JSON.stringify(Response));

             //var Response = {
             //    Occurrence: 11,
             //    OverAllCompletedDCCount: 11,
             //    OverAllInProgressDCCount: 4,
             //    OverAllApprovedDCCount: 8,
             //    TemplateInfo: {
             //        75: {
             //            ReccurenceId: 1,
             //            Occurrence: 11,
             //            OverAllCompletedDCCount: 11,
             //            OverAllInProgressDCCount: 4,
             //            OverAllApprovedDCCount: 11,
             //            DcProfileServerId: 2,
             //            PeriodTypeName: '',
             //            PeriodTypeStartDate: '',
             //            PeriodTypeEndDate: '',
             //            LastDCInfo: null,
             //            TemplateIds: [76,78],
             //        },
             //        76: {
             //            ReccurenceId: 1,
             //            Occurrence: 4,
             //            OverAllCompletedDCCount: 1,
             //            OverAllInProgressDCCount: 2,
             //            OverAllApprovedDCCount: 1,
             //            DcProfileServerId: 2,
             //            PeriodTypeName: '',
             //            PeriodTypeStartDate: '',
             //            PeriodTypeEndDate: '',
             //            LastDCInfo: null,
             //            TemplateIds: [],
             //        },
             //        78: {
             //            ReccurenceId: 1,
             //            Occurrence: 7,
             //            OverAllCompletedDCCount: 2,
             //            OverAllInProgressDCCount: 2,
             //            OverAllApprovedDCCount: 1,
             //            DcProfileServerId: 2,
             //            PeriodTypeName: '',
             //            PeriodTypeStartDate: '',
             //            PeriodTypeEndDate: '',
             //            LastDCInfo: null,
             //            TemplateIds: [],
             //        }
                     
             //    }
             //};

             OneViewConsole.Debug("GetDcStatusCountByTemplateGroup End", "PeriodicalWorkComponent.GetDcStatusCountByTemplateGroup");

            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.GetDcStatusCountByTemplateGroup", Excep);
        }
    }

    this.GetApprovalProfileExists = function (PlaceId) {
        try {
            OneViewConsole.Debug("GetApprovalProfileExists Start", "PeriodicalWorkComponent.GetApprovalProfileExists");

            var IsApprovalProfileExists = true;

            OneViewConsole.Debug("GetApprovalProfileExists End", "PeriodicalWorkComponent.GetApprovalProfileExists");

            return IsApprovalProfileExists;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.GetApprovalProfileExists", Excep);
        }
    }

    this.LoadTemplateConfigMetadata = function (TemplateNodeId) {
        try {
            OneViewConsole.Debug("LoadTemplateConfigMetadata Start", "PeriodicalWorkComponent.LoadTemplateConfigMetadata");
            
            var TemplateIdList = MyInstance.GetProfiledTemplateNodeIdList(TemplateNodeId);
            //for (var TemplateId in CompleteDcStatusCountDict.TemplateInfo) {
            //    TemplateIdList.push(TemplateId);
            //}
            var TemplateConfigMetadataList = new TemplateConfigDAO().GetMetaDataList(ServiceId, TemplateIdList);

            if (TemplateConfigMetadataList != null) {
                for (var i = 0; i < TemplateConfigMetadataList.length; i++) {
                    if (PTempMData[TemplateConfigMetadataList[i].TemplateNodeId] == undefined) {
                        PTempMData[TemplateConfigMetadataList[i].TemplateNodeId] = TemplateConfigMetadataList[i];
                    }
                }
            }
            else {
                alert('Unable to get any TemplateConfigMetadata');
            }
            // alert('PTempMData : ' + JSON.stringify(PTempMData));

            /*
            PTempMData = {
                80: {
                    'Id': 80,
                    "ServiceId": 17,
                    "TemplateNodeId": 80,
                    "TemplateName": "Clean all ceiling air conditioning/heating vents",
                    "TemplateShortName": null,
                    "TemplateDescription": "CLNG_CMS_188",
                    "TemplateVersion": "CLNG_CMS_188",
                    "IsHeaderEnable": false,
                    "IsFooterEnable": false,
                    "Type": 0,
                    "IsScoringLogicEnabled": true,
                    "ScoringLogicType": 1,
                    "OVGuid": 0,
                    "ESTTime": 0,
                    "IsESTEnabled": false,
                    "ESTDisplayTimeMode": 0,
                    "PageLoadNCEvaluation": false,
                    "PageLoadUIEventJobEvaluation": false,
                    "SaveNCEvaluation": false,
                    "SaveUIEventJobEvaluation": false,
                    "RouteKeyConfig": null,
                    "AttributeGroupSummaryDisplayConfig": null,
                    "TemplateConfigMetaDataDetails": {
                        'Id': 80,
                        "Name": "Clean all ceiling air conditioning/heating vents",
                        "FontColor": null,
                        "IsAttributeGroup": true,
                        "AttributeGroupType": 0,
                        "AttributeGroupTypeName": null,
                        "Childs": [
                            {
                                'Id': 81,
                                "Name": "Clean all ceiling air conditioning/heating vents",
                                "FontColor": null,
                                "IsAttributeGroup": false,
                                "AttributeGroupType": 0,
                                "AttributeGroupTypeName": "",
                                "Childs": [],
                                "AnswerModes": [
                                    {
                                        "Type": "DCListViewControlConfig",
                                        "ControlId": "BandControlId_81",
                                        "LabelKey": null,
                                        "DataType": 0,
                                        "FKType": 39,
                                        "ListViewDataSourceConfig": {
                                            "Type": "BandListViewDataSourceConfig",
                                            "BandId": 1,
                                            "IsOnline": false,
                                            "LoadParms": null
                                        },
                                        "ListViewDisplay": 0,
                                        "DisplayMode": 0,
                                        "SelectionType": 0,
                                        "Weightage": 1,
                                        "MaxScore": 0,
                                        "DisplayOrder": 0,
                                        "DefaultHide": false,
                                        "DefaultDisable": false,
                                        "RefreshControls": null,
                                        "AutoAnswerConfig": null
                                    },
                                    //{
                                    //    "Type": "DCImageCaptureControlConfig",
                                    //    "DataType": "STRING",
                                    //    "ControlId": "DCImageControlId_81",
                                    //    "LabelKey": null,
                                    //    "DisplayOrder": 0,
                                    //    "Weightage": 0,
                                    //    "MaxScore": 0,
                                    //    "DefaultHide": false,
                                    //    "DefaultDisable": false,
                                    //    "SelectionType": 0,
                                    //    "AutoAnswerConfig": null
                                    //}

                                ],
                                "DisplayOrder": 0,
                                "TotalRows": 0,
                                "MaxNoOfColumn": 0,
                                "DefaultHide": false,
                                "DefaultDisable": false,
                                "ESTTime": 0,
                                "IsESTEnabled": false,
                                "ESTDisplayTimeMode": 0,
                                "AttributeGroupSummaryDisplayConfig": null
                            }
                        ],
                        "AnswerModes": null,
                        "DisplayOrder": 0,
                        "TotalRows": 0,
                        "MaxNoOfColumn": 0,
                        "DefaultHide": false,
                        "DefaultDisable": false,
                        "ESTTime": 0,
                        "IsESTEnabled": false,
                        "ESTDisplayTimeMode": 0,
                        "AttributeGroupSummaryDisplayConfig": null
                    }
                },
                76: {
                    'Id': 76,
                    "ServiceId": 17,
                    "TemplateNodeId": 76,
                    "TemplateName": "Wash all Tesco owned permanent car park signage including supporting poles (excluding any illuminated and JC decaux advertising signs) up to a height of 3 metres",
                    "TemplateShortName": null,
                    "TemplateDescription": "CLNG_CMS_188",
                    "TemplateVersion": "CLNG_CMS_188",
                    "IsHeaderEnable": false,
                    "IsFooterEnable": false,
                    "Type": 0,
                    "IsScoringLogicEnabled": true,
                    "ScoringLogicType": 1,
                    "OVGuid": 0,
                    "ESTTime": 0,
                    "IsESTEnabled": false,
                    "ESTDisplayTimeMode": 0,
                    "PageLoadNCEvaluation": false,
                    "PageLoadUIEventJobEvaluation": false,
                    "SaveNCEvaluation": false,
                    "SaveUIEventJobEvaluation": false,
                    "RouteKeyConfig": null,
                    "AttributeGroupSummaryDisplayConfig": null,
                    "TemplateConfigMetaDataDetails": {
                        'Id': 76,
                        "Name": "Wash all Tesco owned permanent car park signage including supporting poles (excluding any illuminated and JC decaux advertising signs) up to a height of 3 metres",
                        "FontColor": null,
                        "IsAttributeGroup": true,
                        "AttributeGroupType": 0,
                        "AttributeGroupTypeName": null,
                        "Childs": [
                            {
                                'Id': 77,
                                "Name": "Wash all Tesco owned permanent car park signage including supporting poles (excluding any illuminated and JC decaux advertising signs) up to a height of 3 metres",
                                "FontColor": null,
                                "IsAttributeGroup": false,
                                "AttributeGroupType": 0,
                                "AttributeGroupTypeName": "",
                                "Childs": [],
                                "AnswerModes": [
                                    {
                                        "Type": "DCListViewControlConfig",
                                        "ControlId": "BandControlId_77",
                                        "LabelKey": null,
                                        "DataType": 0,
                                        "FKType": 39,
                                        "ListViewDataSourceConfig": {
                                            "Type": "BandListViewDataSourceConfig",
                                            "BandId": 1,
                                            "IsOnline": false,
                                            "LoadParms": null
                                        },
                                        "ListViewDisplay": 0,
                                        "DisplayMode": 0,
                                        "SelectionType": 0,
                                        "Weightage": 1,
                                        "MaxScore": 0,
                                        "DisplayOrder": 0,
                                        "DefaultHide": false,
                                        "DefaultDisable": false,
                                        "RefreshControls": null,
                                        "AutoAnswerConfig": null
                                    },
                                    {
                                        "Type": "DCImageCaptureControlConfig",
                                        "DataType": "STRING",
                                        "ControlId": "DCImageControlId_77",
                                        "LabelKey": null,
                                        "DisplayOrder": 0,
                                        "Weightage": 0,
                                        "MaxScore": 0,
                                        "DefaultHide": false,
                                        "DefaultDisable": false,
                                        "SelectionType": 0,
                                        "AutoAnswerConfig": null
                                    }

                                ],
                                "DisplayOrder": 0,
                                "TotalRows": 0,
                                "MaxNoOfColumn": 0,
                                "DefaultHide": false,
                                "DefaultDisable": false,
                                "ESTTime": 0,
                                "IsESTEnabled": false,
                                "ESTDisplayTimeMode": 0,
                                "AttributeGroupSummaryDisplayConfig": null
                            }
                        ],
                        "AnswerModes": null,
                        "DisplayOrder": 0,
                        "TotalRows": 0,
                        "MaxNoOfColumn": 0,
                        "DefaultHide": false,
                        "DefaultDisable": false,
                        "ESTTime": 0,
                        "IsESTEnabled": false,
                        "ESTDisplayTimeMode": 0,
                        "AttributeGroupSummaryDisplayConfig": null
                    }
                },


                78: {
                    'Id': 78,
                    "ServiceId": 17,
                    "TemplateNodeId": 78,
                    "TemplateName": "Template 16",
                    "TemplateShortName": null,
                    "TemplateDescription": "CLNG_CMS_188",
                    "TemplateVersion": "CLNG_CMS_188",
                    "IsHeaderEnable": false,
                    "IsFooterEnable": false,
                    "Type": 0,
                    "IsScoringLogicEnabled": true,
                    "ScoringLogicType": 1,
                    "OVGuid": 0,
                    "ESTTime": 0,
                    "IsESTEnabled": false,
                    "ESTDisplayTimeMode": 0,
                    "PageLoadNCEvaluation": false,
                    "PageLoadUIEventJobEvaluation": false,
                    "SaveNCEvaluation": false,
                    "SaveUIEventJobEvaluation": false,
                    "RouteKeyConfig": null,
                    "AttributeGroupSummaryDisplayConfig": null,
                    "TemplateConfigMetaDataDetails": {
                        'Id': 78,
                        "Name": "Template 78",
                        "FontColor": null,
                        "IsAttributeGroup": true,
                        "AttributeGroupType": 0,
                        "AttributeGroupTypeName": null,
                        "Childs": [
                            {
                                'Id': 79,
                                "Name": "Attribute 79",
                                "FontColor": null,
                                "IsAttributeGroup": false,
                                "AttributeGroupType": 0,
                                "AttributeGroupTypeName": "",
                                "Childs": [],
                                "AnswerModes": [
                                    {
                                        "Type": "DCListViewControlConfig",
                                        "ControlId": "BandControlId_79",
                                        "LabelKey": null,
                                        "DataType": 0,
                                        "FKType": 39,
                                        "ListViewDataSourceConfig": {
                                            "Type": "BandListViewDataSourceConfig",
                                            "BandId": 1,
                                            "IsOnline": false,
                                            "LoadParms": null
                                        },
                                        "ListViewDisplay": 0,
                                        "DisplayMode": 0,
                                        "SelectionType": 0,
                                        "Weightage": 1,
                                        "MaxScore": 0,
                                        "DisplayOrder": 0,
                                        "DefaultHide": false,
                                        "DefaultDisable": false,
                                        "RefreshControls": null,
                                        "AutoAnswerConfig": null
                                    }

                                ],
                                "DisplayOrder": 0,
                                "TotalRows": 0,
                                "MaxNoOfColumn": 0,
                                "DefaultHide": false,
                                "DefaultDisable": false,
                                "ESTTime": 0,
                                "IsESTEnabled": false,
                                "ESTDisplayTimeMode": 0,
                                "AttributeGroupSummaryDisplayConfig": null
                            }
                        ],
                        "AnswerModes": null,
                        "DisplayOrder": 0,
                        "TotalRows": 0,
                        "MaxNoOfColumn": 0,
                        "DefaultHide": false,
                        "DefaultDisable": false,
                        "ESTTime": 0,
                        "IsESTEnabled": false,
                        "ESTDisplayTimeMode": 0,
                        "AttributeGroupSummaryDisplayConfig": null
                    }
                },

                18: {
                    'Id': 18,
                    "ServiceId": 17,
                    "TemplateNodeId": 18,
                    "TemplateName": " Template 18",
                    "TemplateShortName": null,
                    "TemplateDescription": "CLNG_CMS_188",
                    "TemplateVersion": "CLNG_CMS_188",
                    "IsHeaderEnable": false,
                    "IsFooterEnable": false,
                    "Type": 0,
                    "IsScoringLogicEnabled": true,
                    "ScoringLogicType": 1,
                    "OVGuid": 0,
                    "ESTTime": 0,
                    "IsESTEnabled": false,
                    "ESTDisplayTimeMode": 0,
                    "PageLoadNCEvaluation": false,
                    "PageLoadUIEventJobEvaluation": false,
                    "SaveNCEvaluation": false,
                    "SaveUIEventJobEvaluation": false,
                    "RouteKeyConfig": null,
                    "AttributeGroupSummaryDisplayConfig": null,
                    "TemplateConfigMetaDataDetails": {
                        'Id': 18,
                        "Name": "Template 18",
                        "FontColor": null,
                        "IsAttributeGroup": true,
                        "AttributeGroupType": 0,
                        "AttributeGroupTypeName": null,
                        "Childs": [
                            {
                                'Id': 225,
                                "Name": "Attribute 225",
                                "FontColor": null,
                                "IsAttributeGroup": false,
                                "AttributeGroupType": 0,
                                "AttributeGroupTypeName": "",
                                "Childs": [],
                                "AnswerModes": [
                                    {
                                        "Type": "DCListViewControlConfig",
                                        "ControlId": "BandControlId_6000",
                                        "LabelKey": null,
                                        "DataType": 0,
                                        "FKType": 39,
                                        "ListViewDataSourceConfig": {
                                            "Type": "BandListViewDataSourceConfig",
                                            "BandId": 1,
                                            "IsOnline": false,
                                            "LoadParms": null
                                        },
                                        "ListViewDisplay": 0,
                                        "DisplayMode": 0,
                                        "SelectionType": 0,
                                        "Weightage": 1,
                                        "MaxScore": 0,
                                        "DisplayOrder": 0,
                                        "DefaultHide": false,
                                        "DefaultDisable": false,
                                        "RefreshControls": null,
                                        "AutoAnswerConfig": null
                                    }

                                ],
                                "DisplayOrder": 0,
                                "TotalRows": 0,
                                "MaxNoOfColumn": 0,
                                "DefaultHide": false,
                                "DefaultDisable": false,
                                "ESTTime": 0,
                                "IsESTEnabled": false,
                                "ESTDisplayTimeMode": 0,
                                "AttributeGroupSummaryDisplayConfig": null
                            }
                        ],
                        "AnswerModes": null,
                        "DisplayOrder": 0,
                        "TotalRows": 0,
                        "MaxNoOfColumn": 0,
                        "DefaultHide": false,
                        "DefaultDisable": false,
                        "ESTTime": 0,
                        "IsESTEnabled": false,
                        "ESTDisplayTimeMode": 0,
                        "AttributeGroupSummaryDisplayConfig": null
                    }
                }
            };
            */

            OneViewConsole.Debug("LoadTemplateConfigMetadata End", "PeriodicalWorkComponent.LoadTemplateConfigMetadata");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.LoadTemplateConfigMetadata", Excep);
        }
    }

    this.GetProfiledTemplateNodeIdList = function (TemplateNodeId) {
        try {
            OneViewConsole.Debug("GetProfiledTemplateNodeIdList Start", "PeriodicalWorkComponent.GetProfiledTemplateNodeIdList");

            var TemplateIdList = [];
            for (var TemplateId in CompleteDcStatusCountDict.TemplateInfo) {
                if (TemplateId != TemplateNodeId) {
                    TemplateIdList.push(TemplateId);
                }
            }
            //alert('TemplateIdList : ' + JSON.stringify(TemplateIdList));

            OneViewConsole.Debug("GetProfiledTemplateNodeIdList End", "PeriodicalWorkComponent.GetProfiledTemplateNodeIdList");

            return TemplateIdList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.GetProfiledTemplateNodeIdList", Excep);
        }
    }


    var GetActionNCMetaData = function (ServiceId, DcUserId, TemplateNodeId, DcPlaceId, DcPlaceDimension) {
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
            //alert('GetActionNCMetaData' + Excep);
            // alert('GetActionNCMetaData vvv' +  JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.GetActionNCMetaData", Excep);
        }
    }

    var GetAttributeOtherConfigMetaData = function (TemplateId) {

        try {
            OneViewConsole.Debug("GetAttributeOtherConfigMetaData Start", "LVPageComponent.GetAttributeOtherConfigMetaData");

            //User nd place specific
            var MetaData = GetAttributeOtherConfigMetaDataFromDB(ServiceId, DcPlaceId, DcPlaceDimension, LoginUserId, TemplateId);


            if (MetaData == null) {
                //User specific
                //DcPlaceId = -1;
                //DcPlaceDimension = -1;
                MetaData = GetAttributeOtherConfigMetaDataFromDB(ServiceId, -1, -1, LoginUserId, TemplateId);
            }
            if (MetaData == null) {
                //Place specific
               // DcUserId = -1;
                MetaData = GetAttributeOtherConfigMetaDataFromDB(ServiceId, DcPlaceId, DcPlaceDimension, -1, TemplateId);
            }
            if (MetaData == null) {
                //none
                //DcPlaceId = -1;
                //DcUserId = -1;
                //DcPlaceDimension = -1;
                MetaData = GetAttributeOtherConfigMetaDataFromDB(ServiceId, -1, -1, -1, TemplateId);
            }

            //alert('GetAttributeOtherConfigMetaData : ' + JSON.stringify(MetaData));
            OneViewConsole.Debug("GetAttributeOtherConfigMetaData End", "LVPageComponent.GetAttributeOtherConfigMetaData");

            return MetaData;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.GetAttributeOtherConfigMetaData", Excep);
        }
    }

    var GetAttributeOtherConfigMetaDataFromDB = function (ServiceId, DcPlaceId, DcPlaceDimension, DcUserId, TemplateId) {
        try {
            OneViewConsole.Debug("GetAttributeOtherConfigMetaDataFromDB Start", "PeriodicalWorkComponent.GetAttributeOtherConfigMetaDataFromDB");

            var _oAttributeOtherConfigDAO = new AttributeOtherConfigDAO();
            var MetaData = _oAttributeOtherConfigDAO.GetMetaData(ServiceId, DcPlaceId, DcPlaceDimension, DcUserId, TemplateId);

            OneViewConsole.Debug("GetAttributeOtherConfigMetaDataFromDB End", "PeriodicalWorkComponent.GetAttributeOtherConfigMetaDataFromDB");

            return MetaData;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.GetAttributeOtherConfigMetaDataFromDB", Excep);
        }
    }

    this.LoadTemplateValidationConfigMetaData = function (TemplateNodeId) {
        try {
            OneViewConsole.Debug("LoadTemplateValidationConfigMetaData Start", "PeriodicalWorkComponent.LoadTemplateValidationConfigMetaData");

            var TemplateIdList = MyInstance.GetProfiledTemplateNodeIdList(TemplateNodeId);

            for (var i = 0; i < TemplateIdList.length ; i++) {
                var TemplateId = TemplateIdList[i];
                if (PeriodicMandatoryMetadata[TemplateId] == undefined) {
                    var TemplateWiseMetadata = GetTemplateValidationMetaData(TemplateId);
                    if (TemplateWiseMetadata != null) {
                        PeriodicMandatoryMetadata[TemplateId] = TemplateWiseMetadata;
                    }
                }
            }

           // alert('PeriodicMandatoryMetadata : ' + JSON.stringify(PeriodicMandatoryMetadata));

            /*
            PeriodicMandatoryMetadata[76] = {

                "SaveValidationMetaData": {
                    "IsAgainstDC": true,
                    "DCValidationRuleMetaData": [
                        {
                            "_t": "DefaultDCValidationRuleMetaData",
                            "Type": "DefaultDCValidationRuleMetaData",
                            "ExecutionOrder": 0,
                            "MandatoryElements": [
                                {
                                    "ExecutionOrder": 0,
                                    "AttributeNodeId": "77",
                                    "ControlId": "BandControlId_77",
                                    "DefaultValue": "",
                                    "DefaultValueDataType": 0,
                                    "ErrorMessageKey": "Mandatory_BandControlId_77"
                                }
                            ]
                        }
                    ]
                },
                "SubmitValidationMetaData": {
                    "IsAgainstDC": true,
                    "DCValidationRuleMetaData": [
                        {
                            "_t": "AdvanceDCValidationRuleMetaData",
                            "Type": "AdvanceDCValidationRuleMetaData",
                            "ErrorMessageKey": "Mandatory_BandControlId_77",
                            "FinalJavaScriptEquation": "(new PeriodicDefaultAnswerModeComponent(76,77,#BandControlId_77#).GetAnswer() != ##)"
                            
                        },
                        {
                            "_t": "AdvanceDCValidationRuleMetaData",
                            "Type": "AdvanceDCValidationRuleMetaData",
                            "ErrorMessageKey": "Mandatory_DropDownControlId_77",
                            "FinalJavaScriptEquation": "(new PeriodicDefaultAnswerModeComponent(76,77,#BandControlId_77#).GetAnswer() == ## || new PeriodicDefaultAnswerModeComponent(76,77,#BandControlId_77#).GetAnswer() == #1# || (new PeriodicDefaultAnswerModeComponent(76,77,#BandControlId_77#).GetAnswer() == #2# && new PeriodicDefaultAnswerModeComponent(76,77,#DropDownControlId_77#).GetAnswer() != 0))"
                            
                        },
						
						
                        {
                                "_t": "AdvanceDCValidationRuleMetaData",
                                "Type": "AdvanceDCValidationRuleMetaData",
                                "ErrorMessageKey": "Mandatory_TxtControlId_77",
                                "FinalJavaScriptEquation": "(new PeriodicDefaultAnswerModeComponent(76,77,#BandControlId_77#).GetAnswer() == ## || new PeriodicDefaultAnswerModeComponent(76,77,#BandControlId_77#).GetAnswer() == #2# || (new PeriodicDefaultAnswerModeComponent(76,77,#BandControlId_77#).GetAnswer() == #1# && new PeriodicDefaultAnswerModeComponent(76,77,#TxtControlId_77#).GetAnswer() != ##))"
                            
                        }

                    ]
                },
                "ControlEventValidationJobs": null
            }
            */
           // alert('PeriodicMandatoryMetadata : ' + JSON.stringify(PeriodicMandatoryMetadata));
            
            /*
            PeriodicMandatoryMetadata = {
                76: {
                    "Id": "",
                    "ServiceId": 17,
                    "DCPlace": {
                        "_t": "DefaultDCPlaceInfo",
                        "DCPlace": -1,
                        "DCPlaceDimension": 16,
                        "IsAnyPlace": true,
                        "DCPlaceType": 0
                    },
                    "DCTemplate": {
                        "_t": "DCTemplateInfo",
                        "DCTemplate": 76,
                        "IsAnyTemplate": false
                    },
                    "DCUser": {
                        "_t": "DefaultUserInfo",
                        "IsAnyDCUser": true,
                        "DCUser": -1,
                        "DCRole": 0,
                        "IsTeamWiseOnly": false
                    },
                    "CreateUserId": 0,
                    "LastUpdatedUserId": 0,
                    "CreateDate": "",
                    "TimeStamp": null,
                    "OVGuid": 0,
                    "Code": null,
                    "Type": 0,
                    "ClientGuid": null,
                    "IsDisable": false,
                    "DisableDate": null,
                    "SaveValidationMetaData": {
                        "IsAgainstDC": true,
                        "DCValidationRuleMetaData": [
                            {
                                "_t": "DefaultDCValidationRuleMetaData",
                                "Type": "DefaultDCValidationRuleMetaData",
                                "ExecutionOrder": 0,
                                "MandatoryElements": [
                                    {
                                        "ExecutionOrder": 0,
                                        "AttributeNodeId": "77",
                                        "ControlId": "BandControlId_77",
                                        "DefaultValue": "",
                                        "DefaultValueDataType": 0,
                                        "ErrorMessageKey": "Mandatory_BandControlId_77"
                                    }
                                ]
                            }
                        ]
                    },
                    "SubmitValidationMetaData": {
                        "IsAgainstDC": true,
                        "DCValidationRuleMetaData": [
                             {
                                 "_t": "DefaultDCValidationRuleMetaData",
                                 "Type": "DefaultDCValidationRuleMetaData",
                                 "ExecutionOrder": 0,
                                 "MandatoryElements": [
                                     {
                                         "ExecutionOrder": 0,
                                         "AttributeNodeId": "77",
                                         "ControlId": "BandControlId_77",
                                         "DefaultValue": "",
                                         "DefaultValueDataType": 0,
                                         "ErrorMessageKey": "Mandatory_BandControlId_77"
                                     }
                                 ]
                             }
                        ]
                    },
                    "ControlEventValidationJobs": null
                },

                78: {
                    "Id": "",
                    "ServiceId": 17,
                    "DCPlace": {
                        "_t": "DefaultDCPlaceInfo",
                        "DCPlace": -1,
                        "DCPlaceDimension": 16,
                        "IsAnyPlace": true,
                        "DCPlaceType": 0
                    },
                    "DCTemplate": {
                        "_t": "DCTemplateInfo",
                        "DCTemplate": 78,
                        "IsAnyTemplate": false
                    },
                    "DCUser": {
                        "_t": "DefaultUserInfo",
                        "IsAnyDCUser": true,
                        "DCUser": -1,
                        "DCRole": 0,
                        "IsTeamWiseOnly": false
                    },
                    "CreateUserId": 0,
                    "LastUpdatedUserId": 0,
                    "CreateDate": "",
                    "TimeStamp": null,
                    "OVGuid": 0,
                    "Code": null,
                    "Type": 0,
                    "ClientGuid": null,
                    "IsDisable": false,
                    "DisableDate": null,
                    "SaveValidationMetaData": {
                        "IsAgainstDC": true,
                        "DCValidationRuleMetaData": [
                            {
                                "_t": "DefaultDCValidationRuleMetaData",
                                "Type": "DefaultDCValidationRuleMetaData",
                                "ExecutionOrder": 0,
                                "MandatoryElements": [
                                    {
                                        "ExecutionOrder": 0,
                                        "AttributeNodeId": "79",
                                        "ControlId": "BandControlId_79",
                                        "DefaultValue": "",
                                        "DefaultValueDataType": 0,
                                        "ErrorMessageKey": "Mandatory_BandControlId_79"
                                    }
                                ]
                            }
                        ]
                    },
                    "SubmitValidationMetaData": {
                        "IsAgainstDC": true,
                        "DCValidationRuleMetaData": [
                             {
                                 "_t": "DefaultDCValidationRuleMetaData",
                                 "Type": "DefaultDCValidationRuleMetaData",
                                 "ExecutionOrder": 0,
                                 "MandatoryElements": [
                                     {
                                         "ExecutionOrder": 0,
                                         "AttributeNodeId": "79",
                                         "ControlId": "BandControlId_79",
                                         "DefaultValue": "",
                                         "DefaultValueDataType": 0,
                                         "ErrorMessageKey": "Mandatory_BandControlId_79"
                                     }
                                 ]
                             }
                        ]
                    },
                    "ControlEventValidationJobs": null
                }

            };
           
            */
            OneViewConsole.Debug("LoadTemplateValidationConfigMetaData End", "PeriodicalWorkComponent.LoadTemplateValidationConfigMetaData");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.LoadTemplateValidationConfigMetaData", Excep);
        }
    }

    var GetTemplateValidationMetaData = function (TemplateId) {
        try {

            //  alert('Request : ' + ServiceId + "," + LoginUserId + "," + TemplateId + "," + DcPlaceId + "," + DcPlaceDimension);
            var _oTemplatValidationConfigMetaDataDAO = new TemplatValidationConfigMetaDataDAO();
            var MetaDataList = _oTemplatValidationConfigMetaDataDAO.GetMetaData(ServiceId, LoginUserId, TemplateId, DcPlaceId, DcPlaceDimension);
            
            if (MetaDataList == null) {
                //User specific
                // DcPlaceId = -1;
                //  DcPlaceDimension = -1
                MetaDataList = _oTemplatValidationConfigMetaDataDAO.GetMetaData(ServiceId, LoginUserId, TemplateId, -1, -1);
            }

            if (MetaDataList == null) {
                //Place specific
                // LoginUserId = -1;
                MetaDataList = _oTemplatValidationConfigMetaDataDAO.GetMetaData(ServiceId, -1, TemplateId, DcPlaceId, DcPlaceDimension);
            }

            if (MetaDataList == null) {
                //none
                //DcPlaceId = -1;
                //LoginUserId = -1;
                //DcPlaceDimension = -1
                MetaDataList = _oTemplatValidationConfigMetaDataDAO.GetMetaData(ServiceId, -1, TemplateId, -1, DcPlaceDimension);
            }

            return MetaDataList;
        }
        catch (Excep) {
            // alert('GetTemplateValidationMetaData Excep 11' + Excep);
            // alert('GetTemplateValidationMetaData Excep 22' +  JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.GetTemplateValidationMetaData", Excep);
        }
    }

    this.GraphSearch = function (scope) {
        try {
            
            var TemplateNodeIdList = new DcDAO().GetDcTemplateIdsByTemplateGroupAndAttributeGroupType(PlatformPeriodicCurrentSubGroupId, 2);
            var SearchedName = scope.periodicsGraphSearchElement;

            for (var i = 0; i < TemplateNodeIdList.length; i++) {
                var TemplateId = TemplateNodeIdList[i].Id;
                if (CompletePeriodicTemplateResult[TemplateId] != undefined) {
                    var AttributeDataDict = CompletePeriodicTemplateResult[TemplateId].LVTemplateResult;
                    if (AttributeDataDict != undefined) {
                        for (var AttibuteId in AttributeDataDict) {
                            var AttributeDetails = AttributeDataDict[AttibuteId];
                            if (AttributeDetails.Name.indexOf(SearchedName) == -1) {
                                document.getElementById("TemplateNodeBlock_" + AttibuteId).style.display = "none";
                            }
                            else {
                                document.getElementById("TemplateNodeBlock_" + AttibuteId).style.display = "";
                            }
                        }
                    }
                }
            }
          

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.GraphSearch", Excep);
        }
    }

    this.LoadTemplateUIEventJobConfigMetaData = function (TemplateNodeId) {
        try {
            OneViewConsole.Debug("LoadTemplateUIEventJobConfigMetaData Start", "PeriodicalWorkComponent.LoadTemplateUIEventJobConfigMetaData");
           
            var TemplateIdList = MyInstance.GetProfiledTemplateNodeIdList(TemplateNodeId);

            for (var i = 0; i < TemplateIdList.length ; i++) {
                var TemplateId = TemplateIdList[i];
                if (CompletePeriodicTemplateUIEventJobConfigDict[TemplateId] == undefined) {
                    var TemplateWiseMetadata = GetTemplateUIEventJobConfigMetaData(TemplateId);
                    if (TemplateWiseMetadata != null) {
                        CompletePeriodicTemplateUIEventJobConfigDict[TemplateId] = TemplateWiseMetadata;
                    }
                }
            }
            
           // alert('CompletePeriodicTemplateUIEventJobConfigDict  : ' + JSON.stringify(CompletePeriodicTemplateUIEventJobConfigDict));
            /*
            CompletePeriodicTemplateUIEventJobConfigDict = {

                76: {
                    "ControlEventUIJobs":
                        {

                            77:
                            {
                                "BandControlId_77": {
                                    "ControlId": "BandControlId_77",
                                    "PreControlUIJobs": null,
                                    "PostControlUIJobs": [
                                        {
                                            "_t": "DefaultControlUIOperationsRule",
                                            "Type": "DefaultControlUIOperationsRule",
                                            "AttributeValidationCriteria": null,
                                            "FinalJavaScriptEquation": "Model[#BandControlId_77#] == ##",
                                            "EnableControls": null,
                                            "DisableControls": null,
                                            "HideControls": {
                                                "77": [
                                                    "DropDownControlId_77",
                                                    "TxtControlId_77"
                                                ]
                                            },
                                            "ShowControls": null,
                                            "RefreshControls": null,
                                            "ClearControls": {
                                                "77": [
                                                    "DropDownControlId_77",
                                                    "TxtControlId_77"
                                                ]
                                            },
                                            "NAControls": null,
                                            "MessageKey": null,
                                            "UIValidationType": 0
                                        },
                                        {
                                            "_t": "DefaultControlUIOperationsRule",
                                            "Type": "DefaultControlUIOperationsRule",
                                            "AttributeValidationCriteria": null,
                                            "FinalJavaScriptEquation": "Model[#BandControlId_77#] == #1#",
                                            "EnableControls": null,
                                            "DisableControls": null,
                                            "HideControls": {
                                                "77": [
                                                    "DropDownControlId_77"
                                                ]
                                            },
                                            "ShowControls": {
                                                "77": [
                                                    "TxtControlId_77"
                                                ]
                                            },
                                            "RefreshControls": null,
                                            "ClearControls" : {
                                                "77" : [
                                                    "DropDownControlId_77"
                                                ]
                                            },
                                            "NAControls": null,
                                            "MessageKey": null,
                                            "UIValidationType": 0
                                        },
                                        {
                                            "_t": "DefaultControlUIOperationsRule",
                                            "Type": "DefaultControlUIOperationsRule",
                                            "AttributeValidationCriteria": null,
                                            "FinalJavaScriptEquation": "Model[#BandControlId_77#] == #2#",
                                            "EnableControls": null,
                                            "DisableControls": null,
                                            "HideControls": {
                                                "77": [
                                                    "TxtControlId_77"
                                                ]
                                            },
                                            "ShowControls": {
                                                "77": [
                                                    "DropDownControlId_77"
                                                ]
                                            },
                                            "RefreshControls": null,
                                            "ClearControls": {
                                                "77": [
                                                    "TxtControlId_77"
                                                ]
                                            },
                                            "NAControls": null,
                                            "MessageKey": null,
                                            "UIValidationType": 0
                                        }
                                        
                                    ]
                                }
                            }

                        }
                }
            };
            */
            OneViewConsole.Debug("LoadTemplateUIEventJobConfigMetaData End", "PeriodicalWorkComponent.LoadTemplateUIEventJobConfigMetaData");
        }
        catch (Excep) {
           // alert("PeriodicalWorkComponent.LoadTemplateUIEventJobConfigMetaData 11" + Excep);
           // alert("PeriodicalWorkComponent.LoadTemplateUIEventJobConfigMetaData 22: " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.LoadTemplateUIEventJobConfigMetaData", Excep);
        }
    }
    
    var GetTemplateUIEventJobConfigMetaData = function (TemplateNodeId) {
        try {
            var _oTemplateUIEventJobConfigMetaDataDAO = new TemplateUIEventJobConfigMetaDataDAO();
            var MetaData = _oTemplateUIEventJobConfigMetaDataDAO.GetMetaData(ServiceId, LoginUserId, TemplateNodeId, DcPlaceId, DcPlaceDimension);

            if (MetaData == null) {
                //User specific
                // DcPlaceId = -1;
                //  DcPlaceDimension = -1
                MetaData = _oTemplateUIEventJobConfigMetaDataDAO.GetMetaData(ServiceId, LoginUserId, TemplateNodeId, -1, -1);
            }

            if (MetaData == null) {
                //Place specific
                // DcUserId = -1;
                MetaData = _oTemplateUIEventJobConfigMetaDataDAO.GetMetaData(ServiceId, -1, TemplateNodeId, DcPlaceId, DcPlaceDimension);
            }

            if (MetaData == null) {
                //none
                //DcPlaceId = -1;
                //DcUserId = -1;
                //DcPlaceDimension = -1
                MetaData = _oTemplateUIEventJobConfigMetaDataDAO.GetMetaData(ServiceId, -1, TemplateNodeId, -1, DcPlaceDimension);
            }

            return MetaData;
        }
        catch (Excep) {
            // alert('GetTemplateUIEventJobConfigMetaData' + Excep);
            // alert('GetTemplateUIEventJobConfigMetaData 444' +  JSON.stringify(Excep));
            throw Excep;
        }
    }

    this.PostControlEventsExecuteOnPageLoad = function (TemplateNodeId) {
        try {
            OneViewConsole.Debug("PostControlEventsExecuteOnPageLoad Start", "PeriodicalWorkComponent.PostControlEventsExecuteOnPageLoad");

            var TemplateIdList = MyInstance.GetProfiledTemplateNodeIdList(TemplateNodeId);

            for (var i = 0; i < TemplateIdList.length ; i++) {
                var TemplateId = TemplateIdList[i];
                if (CompletePeriodicTemplateResult[TemplateId] != undefined) {
                    var LVTemplateResult = CompletePeriodicTemplateResult[TemplateId].LVTemplateResult;
                    if (LVTemplateResult != undefined) {
                        for (var AttributeId in LVTemplateResult) {
                            var AttributeDataDict = LVTemplateResult[AttributeId];
                            if (AttributeDataDict != undefined) {
                                var Answers = AttributeDataDict.Answers;
                                for (var j = 0; j < Answers.length; j++) {
                                    var ControlId = Answers[j].ControlId;
                                    var res = new PeriodicUIEventJobHandler(TemplateId, AttributeId, ControlId).PostControlEventsExecute(true);
                                }
                            }
                        }
                    }
                }
            }

            OneViewConsole.Debug("PostControlEventsExecuteOnPageLoad End", "PeriodicalWorkComponent.PostControlEventsExecuteOnPageLoad");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.PostControlEventsExecuteOnPageLoad", Excep);
        }
    }

    this.InitializeMultiMediaSubElementsModel = function (Type,TemplateId, AttributeId, ControlId, DcResultDetailsId, DCResultDetailClientGuid) {
        try {
            OneViewConsole.Debug("InitializeMultiMediaSubElementsModel Start", "PeriodicalWorkComponent.InitializeMultiMediaSubElementsModel");

            if (Type == 'DCImageCaptureControlConfig') {
                var Req = {
                    'TemplateId': TemplateId,
                    'AttributeId': AttributeId,
                    'ControlId': ControlId,
                    'DcResultDetailsId': DcResultDetailsId,
                    'DCResultDetailClientGuid': DCResultDetailClientGuid,
                };
                //alert('Req : ' + JSON.stringify(Req));

                //var _oPlatformPeriodicsBO = new PlatformPeriodicsBO();
                //var Response = _oPlatformPeriodicsBO.GetMultiMediaSubElementsByDcResultDetailsId(Req);


                var Dimension = DATEntityType.DCResultDetails;
                var Request = { 'Dimension': Dimension, 'MappedClientGuid': DCResultDetailClientGuid };
                var _oMultiMediaSubElementsDAO = new MultiMediaSubElementsDAO();
                var Response = _oMultiMediaSubElementsDAO.GetMultiMediaSubElementsByMappedEntityClientGuidDimension(Request);


               // alert('Response : ' + JSON.stringify(Response));

                if (Response != null && Response.length > 0) {
                    var MultiMediaElementList = [];
                    for (var i = 0; i < Response.length ; i++) {
                        var MultiMediaElement = {
                            "Id": Response[i].Id,
                            "ServerId": Response[i].ServerId,
                            "MappedEntityClientGuid": Response[i].MappedEntityClientGuid,
                            "Dimension": DATEntityType.DCResultDetails,
                            "MultiMediaType": "image/jpg",
                            "LocalURL": Response[i].LocalURL,
                            "Comments": Response[i].Comments,
                            "IsDisabled": Response[i].IsDisabled
                        };

                        MultiMediaElementList.push(MultiMediaElement);
                    }

                    var ControlDict = {};
                    ControlDict[ControlId] = MultiMediaElementList;

                    var AttributeDict = {};
                    AttributeDict[AttributeId] = ControlDict;

                    CompleteMultiMediaSubElementsAnswerModeDict[TemplateId] = AttributeDict;

                    //alert('CompleteMultiMediaSubElementsAnswerModeDict : ' + JSON.stringify(CompleteMultiMediaSubElementsAnswerModeDict));
                }
                else {
                    CompleteMultiMediaSubElementsAnswerModeDict[TemplateId] = undefined;
                }
            }
            OneViewConsole.Debug("InitializeMultiMediaSubElementsModel End", "PeriodicalWorkComponent.InitializeMultiMediaSubElementsModel");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.InitializeMultiMediaSubElementsModel", Excep);
        }
    }

    this.GetTotalNumOfLevels = function (MainGroupId) {
        try {
            OneViewConsole.Debug("GetProfiledTemplateNodeIdList Start", "PeriodicalWorkComponent.GetProfiledTemplateNodeIdList");

            var _oTemplateNodeDAO = new TemplateNodeDAO();
            var LeftRightData = _oTemplateNodeDAO.GetLeftRight(MainGroupId);
            
            var result = _oTemplateNodeDAO.GetSingleTemplate(LeftRightData[0].Left, LeftRightData[0].Right);

            var TotalLevels= _oTemplateNodeDAO.GetTotalLevelsByParent(result[0].Left, result[0].Right , LeftRightData[0].Left, LeftRightData[0].Right);

            OneViewConsole.Debug("GetProfiledTemplateNodeIdList End", "PeriodicalWorkComponent.GetProfiledTemplateNodeIdList");

           return TotalLevels;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.GetProfiledTemplateNodeIdList", Excep);
        }
    }

    this.DisableTemplate = function (TemplateGroupId) {
        try {
            OneViewConsole.Debug("DisableTemplate Start", "PeriodicalWorkComponent.DisableTemplate");
            
            CompleteDcStatusCountDict = {};
            CompleteDcStatusCountDict = MyInstance.GetDcStatusCountByTemplateGroup(TemplateGroupId);

            var _oDOM = new DOM();
            for (var TemplateId in CompleteDcStatusCountDict.TemplateInfo) {
                if (TemplateId != TemplateGroupId) {
                    var SubGroupData = CompleteDcStatusCountDict.TemplateInfo[TemplateId];
                    if (SubGroupData != undefined) {
                         //alert(PeriodicPropertyToAccess + ', SubGroupData : ' + JSON.stringify(SubGroupData));
                        if (SubGroupData.Occurrence <= SubGroupData[PeriodicPropertyToAccess]) {
                            var TemplateConfigMetadata = PTempMData[TemplateId];
                            if (TemplateConfigMetadata != undefined) {
                                var TemplateChilds = TemplateConfigMetadata.TemplateConfigMetaDataDetails.Childs[0];
                                var AttributeId = TemplateChilds.Id;
                                
                                _oDOM.AddClass('TemplateNodeBlock_' + AttributeId, "np");
                                var DcTaskDivId = 'DivDcTaskStatus_' + TemplateId;
                                _oDOM.Hide(DcTaskDivId);

                                //hide blocker button if exists
                                var BlockerButtonId = 'TemplateNodeBlocker_' + TemplateId;
                                _oDOM.Hide(BlockerButtonId);

                                var AnswerModes = TemplateChilds.AnswerModes;
                                for (var j = 0; j < AnswerModes.length ; j++) {
                                    var AnswerMode = AnswerModes[j];//AnswerMode.ControlId
                                    _oDOM.Hide('Div_' + AnswerMode.ControlId);
                                }
                            }
                        }
                    }
                }
            }


            OneViewConsole.Debug("DisableTemplate End", "PeriodicalWorkComponent.DisableTemplate");


        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.DisableTemplate", Excep);
        }
    }

    this.LoadBlockerProfiles = function (TemplateGroupId) {
        try {
            OneViewConsole.Debug("LoadBlockerProfiles Start", "PeriodicalWorkComponent.LoadBlockerProfiles");

            var _oPlatformPeriodicsBlockerHandler = new PlatformPeriodicsBlockerHandler(PeriodicMainTemplateGroupId);
            _oPlatformPeriodicsBlockerHandler.LoadBlockerProfiles();

            OneViewConsole.Debug("LoadBlockerProfiles End", "PeriodicalWorkComponent.LoadBlockerProfiles");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.LoadBlockerProfiles", Excep);
        }
    }
}

function PeriodicalWorkHtmlComponent(xlatService) {

    var MyInstance = this;

    this.GetLevelWiseHtml = function (ElementDetails, SubGroupData, IsDisable) {
        try {
            OneViewConsole.Debug("GetLevelWiseHtml Start", "PeriodicalWorkComponent.GetLevelWiseHtml");
                     
            var ActualVsPlannedHtml = MyInstance.GetActualVsPlannedHtml(ElementDetails.Id, SubGroupData.OverAllCompletedDCCount, SubGroupData.Occurrence);
            var Html = MyInstance.GetGroupBlockHtml(ElementDetails.Id, ElementDetails.Name, ActualVsPlannedHtml, ElementDetails.Index, IsDisable);

            //for (var i = 0; i < Childs.length; i++) {
            //    var ElementDetails = Childs[i];
            //    if (ElementDetails.IsTemplate != true) {
            //        var ActualVsPlannedHtml = MyInstance.GetActualVsPlannedHtml(ElementDetails.Id, ElementDetails.CompletedCount, ElementDetails.TotalCount);
            //        Html += MyInstance.GetGroupBlockHtml(ElementDetails.Id, ElementDetails.Name, ActualVsPlannedHtml, ElementDetails.Index);
            //    }
            //    else {
            //        //todo : Need to change have to form answermode
            //        alert('generate html for template');
                  
            //    }
            //}

            OneViewConsole.Debug("GetLevelWiseHtml End", "PeriodicalWorkComponent.GetLevelWiseHtml");

            return Html;

        }
        catch (Excep) {
           // alert("PeriodicalWorkComponent.GetLevelWiseHtml 11" + Excep);
           // alert("PeriodicalWorkComponent.GetLevelWiseHtml 22: " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.GetLevelWiseHtml", Excep);
        }
    }

    this.GetGroupBlockHtml = function (TemplateNodeId, TemplateNodeName, ActualVsPlannedHtml, Index, IsDisable) {
        try {
            OneViewConsole.Debug("GetGroupBlockHtml Start", "PeriodicalWorkHtmlComponent.GetGroupBlockHtml");
          
            var bgColor = "";
            if (IsDisable == true) {
                bgColor="grey";
            }
            

            var Html = '<div class="item item-icon-right" style="color:#333;background-color:' + bgColor + '" id="TemplateNodeBlock_' + TemplateNodeId + '">' +
                                                            '<div onclick="LoadSubGroup(' + TemplateNodeId + ',' + Index + ');">' +
                                                                  TemplateNodeName +
                                                                  ActualVsPlannedHtml +
                                                            '</div>' +
                                                            '<i class="icon icon-angle-right i-arrow"></i>' +
                                                        '</div>';
            //alert('Html : ' + Html);
            OneViewConsole.Debug("GetGroupBlockHtml End", "PeriodicalWorkHtmlComponent.GetGroupBlockHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkHtmlComponent.GetGroupBlockHtml", Excep);
        }
    }

    this.GetActualVsPlannedHtml = function (TemplateNodeId, CompletedCount, TotalCount) {
        try {
            OneViewConsole.Debug("GetHTML Start", "PeriodicalWorkHtmlComponent.GetHTML");

            var Html = '<div id="DivPlanActualCount_' + TemplateNodeId + '" class="badge badge-energized" style="color: #fff; background: #7fab0b; line-height: 6px; left: inherit; top: 17px; margin-left: 3px; padding: 5px; border-radius: 5px; font-size: 11px;">' + CompletedCount + '/' + TotalCount + '</div>';

            OneViewConsole.Debug("GetHTML End", "PeriodicalWorkHtmlComponent.GetHTML");
            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ExpressComponent.GetActualVsPlannedHtml", Excep);
       
        }
    }
    
    this.GetLastLevelHtml = function (TemplateNodeId, TemplateNodeName, AnswerModesHtml, IsDisableDC, NAHtml, Index) {
        try {
            OneViewConsole.Debug("GetLastLevelHtml Start", "PeriodicalWorkComponent.GetLastLevelHtml");

            var AppendClass = "";

            var Html = '<div class="item attribute item-button-right item-button-l ' + AppendClass + '" style="border-color: #d4d9dc;' + background + ' margin:0px;" id="TemplateNodeBlock_' + TemplateNodeId + '">' +
                                                NAHtml +
                                               '<span>' + TemplateNodeName + '</span>' +
                                                AnswerModesHtml +
                                               '<button class="button more-btn" onclick="ShowInfo(' + TemplateNodeId + ')">' +
                                             '<i class="icon icon-info-circle" style="margin-left: -12px; color:#b3b3b3;"></i>' +
                                             '</button>' +
                                           '</div>';

            OneViewConsole.Debug("GetLastLevelHtml End", "PeriodicalWorkComponent.GetLastLevelHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.GetLastLevelHtml", Excep);
        }
    }
     
    this.GetButtonBarHtml = function () {
        try {
            OneViewConsole.Debug("GetButtonBarHtml Start", "PeriodicalWorkHtmlComponent.GetButtonBarHtml");
            var Html = '';

            if (DcPeriodicDisplayMetaData != null) {
                if (DcPeriodicDisplayMetaData.ButtonBarConfig.Type == "DcPeriodicDefaultButtonBarConfig") {
                    for (var Position in DcPeriodicDisplayMetaData.ButtonBarConfig.DcPeriodicOperationConfigDict) {
                        var ButtonBarConfig = DcPeriodicDisplayMetaData.ButtonBarConfig.DcPeriodicOperationConfigDict[Position];
                        var Operation = xlatService.xlat(ButtonBarConfig.Operation);
                        if (Operation == "Back") {
                            Html += '<div class="col text-center no-padding no-margin" ng-show="ShowBackDiv">' +
                                    '<a ng-click="Back(' + Position + ')" class="button button-block button-clear"><i class="icon icon-chevron-left"></i>' + Operation + '</a>' +
                                    '</div>';
                        }
                        else if (Operation == "Save") {
                            Html += ' <div class="col text-center no-padding no-margin" ng-show="ShowSaveDiv">' +
                                    ' <a ng-click="Save(' + Position + ')" class="button button-block button-clear"><i class="icon icon-plus"></i>' + Operation + '</a>' +
                                    '</div>';
                        }
                        else if (Operation == "SaveDraft") {
                            Html += ' <div class="col text-center no-padding no-margin" ng-show="ShowSaveDiv">' +
                                   ' <a ng-click="SaveDraft(' + Position + ')" class="button button-block button-clear"><i class="icon icon-plus"></i>' + Operation + '</a>' +
                                   '</div>';
                        }
                        else if (Operation == "Submit") {
                            Html += '<div class="col text-center no-padding no-margin" ng-show="ShowSubmitDiv">' +
                                    '<a ng-click="Submit(' + Position + ')" class="button button-block button-clear"><i class="icon icon-plus"></i>' + Operation + '</a>' +
                                    '</div>';
                        }
                        else if (Operation == "Approve") {
                            Html += '<div class="col text-center no-padding no-margin" ng-show="ShowApproveDiv">' +
                                    '<a ng-click="Approve(' + Position + ')" class="button button-block button-clear"><i class="icon icon-plus"></i>' + Operation + '</a>' +
                                    '</div>';
                        }
                        else {
                            alert('Operation = ' + Operation + ' Not implemented');
                        }
                    }
                }
                else {
                    alert('DcPeriodicDisplayMetaData.ButtonBarConfig.Type = ' + DcPeriodicDisplayMetaData.ButtonBarConfig.Type + ' : Not implemented');
                }
            }

            //alert('GetButtonBarHtml : ' + Html);
            OneViewConsole.Debug("GetButtonBarHtml End", "PeriodicalWorkHtmlComponent.GetButtonBarHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkHtmlComponent.GetButtonBarHtml", Excep);
        }
    }

 

}


function PeriodicDefaultAttributeComponent(TemplateId, AttributeId) {
    
    var MyInstance = this;
    this.AttributeConfig = null;

    this.GetHtml = function () {
        try {
            OneViewConsole.Debug("GetHtml Start", "PeriodicDefaultAttributeComponent.GetHtml");
           
            var AnswerModeHtml = "";
            var IsDisable = false;

            var SubGroupData = CompleteDcStatusCountDict.TemplateInfo[TemplateId];
            if (SubGroupData != undefined) {
                // alert(PeriodicPropertyToAccess + ', SubGroupData : ' + JSON.stringify(SubGroupData));
               // alert('CompletePeriodicTemplateResult[TemplateId] : ' + CompletePeriodicTemplateResult[TemplateId]);
                if (CompletePeriodicTemplateResult[TemplateId] != undefined) {
                    var LVTemplateResult = CompletePeriodicTemplateResult[TemplateId].LVTemplateResult;
                    if ((SubGroupData.Occurrence <= SubGroupData[PeriodicPropertyToAccess]) || (LVTemplateResult == undefined || Object.keys(LVTemplateResult).length <= 0)) {
                        IsDisable = true;
                    }
                }
                else {
                    IsDisable = true;
                }
            }

    
            if (IsDisable == false) {
                AnswerModeHtml = GetAnswerModeHtml();
            }
            else {
                var Answers = null;
                if (CompletePeriodicTemplateResult[TemplateId] != undefined) {
                    var LVTemplateResult = CompletePeriodicTemplateResult[TemplateId].LVTemplateResult;
                    
                    if (LVTemplateResult != undefined && LVTemplateResult[AttributeId] !=undefined) {
                        Answers = LVTemplateResult[AttributeId].Answers;
                    }

                }
               
                if (Answers != null) { // Last DC Info
                    AnswerModeHtml = GetAnswerModeHtml();
                }
            }
            
            var DCBlockerHtml = GetDcBlockerHtml(IsDisable);
            var DcTaskStatusHtml = GetDcTaskStatusGridHtml();
            var NAHtml = GetNAHtml();
            var AppendClass = '';
            var background = '';
            var InfoHtml = GetInfoHtml();
            var Style = '';

            if (IsDisable == true) {
                //disable div
                AppendClass = "np";
            }
            else {
                if (NAHtml == "") {
                    Style += "padding-left:10px;";
                }
                if (CompletePeriodicTemplateResult[TemplateId] != undefined) {
                    var LVTemplateResult = CompletePeriodicTemplateResult[TemplateId].LVTemplateResult;
                    AppendClass = (LVTemplateResult[AttributeId].NA == true) ? "na" : "";
                }
            }
            if (InfoHtml == "") {
                Style += "padding-right:10px;";
            }
            
            var Html = '<div class="item attribute item-button-right item-button-l ' + AppendClass + '" style="border-color: #d4d9dc;' + Style + background + ' margin:0px;" id="TemplateNodeBlock_' + AttributeId + '">' +
                                              NAHtml +
                                             '<span>' + oXlatService.xlat(MyInstance.AttributeConfig.Name) + '</span>' +
                                              DcTaskStatusHtml +
                                              DCBlockerHtml +
                                              AnswerModeHtml +
                                              InfoHtml +
                                         '</div>';

            //alert('Html: ' + Html);
            OneViewConsole.Debug("GetHtml End", "PeriodicDefaultAttributeComponent.GetHtml");

            return Html;

        }
        catch (Excep) {
           // alert("PeriodicDefaultAttributeComponent.GetHtml 11" + Excep);
           // alert("PeriodicDefaultAttributeComponent.GetHtml 22: " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultAttributeComponent.GetHtml", Excep);
        }

    }

    /// <summary>
    /// Get AnswerMode Html
    /// </summary>
    /// <returns>Html</returns>
    var GetAnswerModeHtml = function () {

        try {
            
            var Html = "";
            for (k = 0; k < MyInstance.AttributeConfig.AnswerModes.length; k++) {
                var _oPeriodicDefaultAnswerModeComponent = new PeriodicDefaultAnswerModeComponent(TemplateId, AttributeId, MyInstance.AttributeConfig.AnswerModes[k].ControlId);
                _oPeriodicDefaultAnswerModeComponent.AnswerModeConfig = MyInstance.AttributeConfig.AnswerModes[k];
                Html += _oPeriodicDefaultAnswerModeComponent.GetHtml();
               
            }
          
            return Html;
        }
        catch (Excep) {
           // alert("PeriodicDefaultAttributeComponent.GetAnswerModeHtml 11" + Excep);
           // alert("PeriodicDefaultAttributeComponent.GetAnswerModeHtml 22: " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultAttributeComponent.GetAnswerModeHtml", Excep);
        }
        finally {
        }
    }


    var GetDcTaskStatusGridHtml = function () {
        try {
            OneViewConsole.Debug("GetDcTaskStatusGridHtml Start", "PeriodicalWorkComponent.GetDcTaskStatusGridHtml");

            var Html = '';
            if (CompletePeriodicTemplateResult[TemplateId] != undefined) {
                var TemplateDCStatus = CompletePeriodicTemplateResult[TemplateId].TemplateDCStatus;
                //alert('CompletePeriodicTemplateResult[TemplateId].TemplateDCStatus : ' + JSON.stringify(CompletePeriodicTemplateResult[TemplateId].TemplateDCStatus));
                ////Todo : for testing need to delete after live api
                //TemplateDCStatus = { 'DcProfileServerId': 19, 'Occurrence': 5, 'OverAllCompletedDCCount': 1, 'OverAllInProgressDCCount': 2, 'PeriodTypeName': 'Test', 'PeriodTypeStartDate': '01-07-2017 22:12:22', 'PeriodTypeEndDate': '12-07-2017 22:30:06' };

                var PeriodTypeEndDateSplitted = TemplateDCStatus.PeriodTypeEndDate.split(' ');
                var DateArr = PeriodTypeEndDateSplitted[0].split('-');
                var TimeArr = PeriodTypeEndDateSplitted[1].split(':');

                var TaskEndDate = new Date(DateArr[2], (parseInt(DateArr[1]) - 1), DateArr[0], TimeArr[0], TimeArr[1], TimeArr[2]);
                var CurrentDate = new Date();
                var TaskEndBy = GetTimeDiffString(CurrentDate, TaskEndDate);
                var DivId = 'DivDcTaskStatus_' + TemplateId;
                var Status = ' , <b> ' + oXlatService.xlat('Status') + ' - </b>  <span style="color:#266684;">' + TemplateDCStatus.OverAllCompletedDCCount + '/' + TemplateDCStatus.Occurrence + '</span>';
                var DueStatus = ', <b> ' + oXlatService.xlat('Due by') + ' - </b> <span style="color:#576f15;">' + TaskEndBy + ' </span>'; //+ oXlatService.xlat(' Left!')
                Html = '<div style="font-size: 11px;" id="' + DivId + '"><b>' + oXlatService.xlat('Starts On') + ' - </b> <span style="color:#266684;">' + PeriodTypeEndDateSplitted[0] + ' </span> ' + '&nbsp;&nbsp;' + Status + '&nbsp;&nbsp;' + DueStatus + '</div>';

                //alert('Html : ' + Html);
            }
            OneViewConsole.Debug("GetDcTaskStatusGridHtml End", "PeriodicalWorkComponent.GetDcTaskStatusGridHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.GetDcTaskStatusGridHtml", Excep);
        }
    }

    var GetTimeDiffString = function (CurrentDate, TaskEndDate) {
        try {
            OneViewConsole.Debug("GetTimeDiffString Start", "PeriodicalWorkComponent.GetTimeDiffString");

            var TimeDiff = '';
            //Get 1 day in milliseconds
            var OneDayInMilliSec = 1000 * 60 * 60 * 24;
            var OneHourInMilliSec = 1000 * 60 * 60;
            var OneMinuteInMilliSec = 1000 * 60;

            // Convert both dates to milliseconds
            var CurrentDateInMilliSec = CurrentDate.getTime();
            var TaskEndDateInMilliSec = TaskEndDate.getTime();

             //alert('CurrentDateInMilliSec : ' + CurrentDateInMilliSec + ' , TaskEndDateInMilliSec : ' + TaskEndDateInMilliSec );


            // Calculate the difference in milliseconds
            var TimeDiffInMilliSec = TaskEndDateInMilliSec - CurrentDateInMilliSec;

            var TimeDiffInDays = Math.round(TimeDiffInMilliSec / OneDayInMilliSec);
            var TimeDiffInHours = Math.round(TimeDiffInMilliSec / OneHourInMilliSec);
            var TimeDiffInMinutes = Math.round(TimeDiffInMilliSec / OneMinuteInMilliSec);

            //alert('TimeDiffInMilliSec : '+TimeDiffInMilliSec +' , TimeDiffInMinutes : ' + TimeDiffInMinutes + ' , TimeDiffInHours : ' + TimeDiffInHours + ' , TimeDiffInDays : ' + TimeDiffInDays);

            if (TimeDiffInMinutes < 60) {
                TimeDiff = TimeDiffInMinutes + oXlatService.xlat(' Minutes ');
            }
            else if (TimeDiffInHours < 24) {
                TimeDiff = TimeDiffInHours + oXlatService.xlat(' Hours ');
            }
            else {
                TimeDiff = TimeDiffInDays + oXlatService.xlat(' Days ');
            }

            OneViewConsole.Debug("GetTimeDiffString End", "PeriodicalWorkComponent.GetTimeDiffString");

            return TimeDiff;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ExpressComponent.GetTimeDiffString", Excep);
        }
    }

    var GetNAHtml = function () {
        try {
            OneViewConsole.Debug("GetNAHtml Start", "PeriodicDefaultAttributeComponent.GetNAHtml");
                        
            var Html = '';
            var NAMetaDataDict = (CompletePeriodicAttributeOtherConfigDict[TemplateId] != undefined ? CompletePeriodicAttributeOtherConfigDict[TemplateId].NAMetaDataDict : null);
            
            if (NAMetaDataDict != null && Object.keys(NAMetaDataDict).length > 0 && NAMetaDataDict[AttributeId].IsNAEnabled == true) {
                var LVTemplateResult = CompletePeriodicTemplateResult[TemplateId] !=undefined ? CompletePeriodicTemplateResult[TemplateId].LVTemplateResult : undefined;
                if (LVTemplateResult != undefined) {
                    var IsNAselected = (LVTemplateResult[AttributeId] != undefined && LVTemplateResult[AttributeId].NA == true) ? true : false;
                    var _oPeriodicDefaultNAComponent = new PeriodicDefaultNAComponent(TemplateId);
                    Html = _oPeriodicDefaultNAComponent.GetHtml(AttributeId, IsNAselected);
                }
            }

            OneViewConsole.Debug("GetNAHtml End", "PeriodicDefaultAttributeComponent.GetNAHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultAttributeComponent.GetNAHtml", Excep);
        }
    }

    var GetInfoHtml = function () {
        try {
            OneViewConsole.Debug("GetNAHtml Start", "PeriodicDefaultAttributeComponent.GetInfoHtml");

            var Html = new PeriodicDefaultHelpComponent(TemplateId).GetHtml(AttributeId);

            OneViewConsole.Debug("GetNAHtml End", "PeriodicDefaultAttributeComponent.GetInfoHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultAttributeComponent.GetInfoHtml", Excep);
        }
    }
    
    this.Clear = function () {
        try {
            OneViewConsole.Debug("Clear Start", "PeriodicDefaultAttributeComponent.Clear");
            
            for (i = 0; i < MyInstance.AttributeConfig.AnswerModes.length; i++) {
                var _oPeriodicDefaultAnswerModeComponent = new PeriodicDefaultAnswerModeComponent(TemplateId, AttributeId, MyInstance.AttributeConfig.AnswerModes[i].ControlId);
                _oPeriodicDefaultAnswerModeComponent.AnswerModeConfig = MyInstance.AttributeConfig.AnswerModes[i];
                 _oPeriodicDefaultAnswerModeComponent.Clear();
            }

            OneViewConsole.Debug("Clear End", "PeriodicDefaultAttributeComponent.Clear");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultAttributeComponent.Clear", Excep);
        }

    }

    var GetDcBlockerHtml = function (IsDisable) {

        try {

            var Html = "";

            if (IsDisable != true) {
                var _oPlatformPeriodicsBlockerHandler = new PlatformPeriodicsBlockerHandler(PeriodicMainTemplateGroupId);
                var BlockerProfile = _oPlatformPeriodicsBlockerHandler.GetBlockerProfile(TemplateId, AttributeId);

                if (BlockerProfile != undefined) {
                    if (BlockerProfile.IsAttributeGroup == true) {
                        var _oPlatformPeriodicsBlockerUIComponent = new PlatformPeriodicsBlockerUIComponent();
                        Html = _oPlatformPeriodicsBlockerUIComponent.GetHtml(TemplateId, AttributeId, oXlatService.xlat("Access Denied"));
                    }
                }
            }

            return Html;
        }
        catch (Excep) {
            // alert("PeriodicDefaultAttributeComponent.GetDcBlockerHtml 11" + Excep);
            // alert("PeriodicDefaultAttributeComponent.GetDcBlockerHtml 22: " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultAttributeComponent.GetDcBlockerHtml", Excep);
        }
        finally {
        }
    }



}

function PeriodicDefaultAnswerModeComponent(TemplateId, AttributeId, ControlId) {

    var MyInstance = this;
    this.AttributeConfig = null;
    this.AnswerModeConfig = null;
    var oPeriodicFactory = new PeriodicFactory();

    this.GetHtml = function () {
        try {
            OneViewConsole.Debug("GetHtml Start", "PeriodicDefaultAnswerModeComponent.GetHtml");

            var AnswerModeComponent = null;

            switch (MyInstance.AnswerModeConfig.Type) {
                case "DCListViewControlConfig": {
                    AnswerModeComponent = oPeriodicFactory.GetAnswerModeComponent(TemplateId, AttributeId, ControlId, MyInstance.AnswerModeConfig.Type);
                };
                case "DCImageCaptureControlConfig": {
                    AnswerModeComponent = oPeriodicFactory.GetAnswerModeComponent(TemplateId, AttributeId, ControlId, MyInstance.AnswerModeConfig.Type);
                }
                case "DCDateTimeControlConfig": {
                    AnswerModeComponent = oPeriodicFactory.GetAnswerModeComponent(TemplateId, AttributeId, ControlId, MyInstance.AnswerModeConfig.Type);
                }
                default: '';
            }
            if (AnswerModeComponent != '') {
                AnswerModeComponent.AnswerModeConfig = MyInstance.AnswerModeConfig;
                AnswerModeComponent.AttributeConfig = MyInstance.AttributeConfig;
            }
          
            var Html = AnswerModeComponent.GetHtml();
           // alert('PeriodicDefaultAnswerModeComponent Html' + Html);
            OneViewConsole.Debug("GetHtml End", "PeriodicDefaultAnswerModeComponent.GetHtml");

            return Html;

        }
        catch (Excep) {
           // alert("PeriodicDefaultAnswerModeComponent.GetHtml 11" + Excep);
           // alert("PeriodicDefaultAnswerModeComponent.GetHtml 22: " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultAnswerModeComponent.GetHtml", Excep);
        }

    }

    this.GetAnswer = function () {
        try {
            OneViewConsole.Debug("GetAnswer Start", "PeriodicDefaultAttributeComponent.GetAnswer");

            var Answer = '';

            var LVTemplateResult = CompletePeriodicTemplateResult[TemplateId].LVTemplateResult;
            var Answers = LVTemplateResult[AttributeId].Answers;
            for (var i = 0; i < Answers.length; i++) {
                if (Answers[i].ControlId == ControlId) {
                    Answer = Answers[i].Answer;
                    break;
                }
            }
            
            OneViewConsole.Debug("GetAnswer End", "PeriodicDefaultAttributeComponent.GetAnswer");

            return Answer;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultAttributeComponent.GetAnswer", Excep);
        }
    }

    this.GetAnswerValue = function () {
        try {
            OneViewConsole.Debug("GetAnswerValue Start", "PeriodicDefaultAttributeComponent.GetAnswerValue");

            var AnswerValue = '';

            var LVTemplateResult = CompletePeriodicTemplateResult[TemplateId].LVTemplateResult;
            var Answers = LVTemplateResult[AttributeId].Answers;
            for (var i = 0; i < Answers.length; i++) {
                if (Answers[i].ControlId == ControlId) {
                    AnswerValue = Answers[i].AnswerValue;
                    break;
                }
            }
            OneViewConsole.Debug("GetAnswerValue End", "PeriodicDefaultAttributeComponent.GetAnswerValue");

            return AnswerValue;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultAttributeComponent.GetAnswerValue", Excep);
        }
    }

    this.ClearAnswerModel = function (AttributeId, ControlId) {

        try {
            OneViewConsole.Debug("ClearAnswerModel Start", "PeriodicDefaultAttributeComponent.ClearAnswerModel");
            var LVTemplateResult = (CompletePeriodicTemplateResult[TemplateId] !=undefined ? CompletePeriodicTemplateResult[TemplateId].LVTemplateResult : undefined);
            
            if (LVTemplateResult !=undefined && LVTemplateResult[AttributeId] != undefined) {

                LVTemplateResult[AttributeId].Comments = "";

                for (var i = 0; i < LVTemplateResult[AttributeId].Answers.length; i++) {
                    if (ControlId == undefined || (ControlId != undefined && LVTemplateResult[AttributeId].Answers[i].ControlId == ControlId)) {
                        LVTemplateResult[AttributeId].Answers[i].Answer = "";
                        LVTemplateResult[AttributeId].Answers[i].AnswerValue = "";
                        LVTemplateResult[AttributeId].Answers[i].Comments = "";
                        LVTemplateResult[AttributeId].Answers[i].Score = 0;
                        LVTemplateResult[AttributeId].Answers[i].MaxScore = 0;
                        LVTemplateResult[AttributeId].Answers[i].Percentage = 0;
                        LVTemplateResult[AttributeId].Answers[i].CompletedChildCount = 0;
                        LVTemplateResult[AttributeId].Answers[i].TotalChildCount = 0;
                        LVTemplateResult[AttributeId].Answers[i].CompletedAttributeCount = 0;
                        LVTemplateResult[AttributeId].Answers[i].TotalAttributeCount = 0;
                        LVTemplateResult[AttributeId].Answers[i].IsModified = true;

                    }

                }
            }

            OneViewConsole.Debug("ClearAnswerModel End", "PeriodicDefaultAttributeComponent.ClearAnswerModel");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultAttributeComponent.ClearAnswerModel", Excep);
        }
        finally {
           
        }
    }

    this.Clear = function () {
        try {
            OneViewConsole.Debug("Clear Start", "PeriodicDefaultAttributeComponent.Clear");

            var AnswerModeComponent = oPeriodicFactory.GetAnswerModeComponent(TemplateId, AttributeId, ControlId, MyInstance.AnswerModeConfig.Type);
          
            if (AnswerModeComponent != '') {
                AnswerModeComponent.AnswerModeConfig = MyInstance.AnswerModeConfig;
                AnswerModeComponent.AttributeConfig = MyInstance.AttributeConfig;
                AnswerModeComponent.Clear();
            }

            OneViewConsole.Debug("Clear End", "PeriodicDefaultAttributeComponent.Clear");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultAttributeComponent.Clear", Excep);
        }

    }

    this.ClearUIEvent = function () {
        try {
            OneViewConsole.Debug("ClearUIEvent Start", "PeriodicDefaultAttributeComponent.ClearUIEvent");

            MyInstance.Clear();

           // alert('CompletePeriodicTemplateResult : ' + JSON.stringify(CompletePeriodicTemplateResult));

            OneViewConsole.Debug("ClearUIEvent End", "PeriodicDefaultAttributeComponent.ClearUIEvent");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultAttributeComponent.ClearUIEvent", Excep);
        }

    }

}

function PeriodicDefaultListViewAnswerModeComponent(TemplateId, AttributeId, ControlId) {

    var MyInstance = this;
    this.AttributeConfig = null;
    this.AnswerModeConfig = null;

    this.GetHtml = function () {
        try {
            OneViewConsole.Debug("GetHtml Start", "PeriodicDefaultListViewAnswerModeComponent.GetHtml");

            var Html = '';
            var DataSourceLst = null;

            if (MyInstance.AnswerModeConfig.ListViewDataSourceConfig.Type == "BandListViewDataSourceConfig") {
                DataSourceLst = GetBandDetailsByBandId(MyInstance.AnswerModeConfig.ListViewDataSourceConfig.BandId);
            }
            else if (MyInstance.AnswerModeConfig.ListViewDataSourceConfig.Type == "DefaultTreeListViewDataSourceConfig") {
                DataSourceLst = GetChildTypeIdandParmas(MyInstance.AnswerModeConfig.ListViewDataSourceConfig);
            }

            if (MyInstance.AnswerModeConfig.ListViewDisplay == 0) {
                var _oPeriodicDefaultBandListViewAnswerModeComponent = new PeriodicDefaultBandListViewAnswerModeComponent(TemplateId, AttributeId, ControlId);
                _oPeriodicDefaultBandListViewAnswerModeComponent.AnswerModeConfig = MyInstance.AnswerModeConfig;
                _oPeriodicDefaultBandListViewAnswerModeComponent.DataSourceLst = DataSourceLst;
                Html = _oPeriodicDefaultBandListViewAnswerModeComponent.GetHtml();
            }

            else if (MyInstance.AnswerModeConfig.ListViewDisplay == 3) {
                var _oPeriodicDefaultDropDownListViewAnswerModeComponent = new PeriodicDefaultDropDownListViewAnswerModeComponent(TemplateId, AttributeId, ControlId);
                _oPeriodicDefaultDropDownListViewAnswerModeComponent.AnswerModeConfig = MyInstance.AnswerModeConfig;
                _oPeriodicDefaultDropDownListViewAnswerModeComponent.DataSourceLst = DataSourceLst;
                Html = _oPeriodicDefaultDropDownListViewAnswerModeComponent.GetHtml();
            }

            OneViewConsole.Debug("GetHtml End", "PeriodicDefaultListViewAnswerModeComponent.GetHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultListViewAnswerModeComponent.GetHtml", Excep);
        }

    }

    var GetBandDetailsByBandId = function (BandId) {
        try {
            OneViewConsole.Debug("GetBandDetailsByBandId Start", "PeriodicalWorkComponent.GetBandDetailsByBandId");

            //var BandDetails = {};

            //BandDetails[1] = [
            //                { 'Id': 1, 'Name': "Yes", "Value": 0, 'Sequence': 1, 'ColourCode': 'Green' },
            //                { 'Id': 2, 'Name': "No", "Value": 1, 'Sequence': 2, 'ColourCode': 'Red' },

            //];

            var _oLVBandDetailsCacheComponent = new LVBandDetailsCacheComponent();
            var DataSourceLst = _oLVBandDetailsCacheComponent.GetBandDetailsByBandId(BandId);
            //alert('DataSourceLst : ' + JSON.stringify(DataSourceLst));


            OneViewConsole.Debug("GetBandDetailsByBandId End", "PeriodicalWorkComponent.GetBandDetailsByBandId");

            return DataSourceLst;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.GetBandDetailsByBandId", Excep);
        }

    }

    this.Clear = function () {
        try {
            OneViewConsole.Debug("Clear Start", "PeriodicDefaultListViewAnswerModeComponent.Clear");
           
            if (MyInstance.AnswerModeConfig.ListViewDisplay == 0) {
                var _oPeriodicDefaultBandListViewAnswerModeComponent = new PeriodicDefaultBandListViewAnswerModeComponent(TemplateId, AttributeId, ControlId);
                _oPeriodicDefaultBandListViewAnswerModeComponent.AnswerModeConfig = MyInstance.AnswerModeConfig;
                _oPeriodicDefaultBandListViewAnswerModeComponent.Clear();
            }

            else if (MyInstance.AnswerModeConfig.ListViewDisplay == 3) {
                var _oPeriodicDefaultDropDownListViewAnswerModeComponent = new PeriodicDefaultDropDownListViewAnswerModeComponent(TemplateId, AttributeId, ControlId);
                _oPeriodicDefaultDropDownListViewAnswerModeComponent.AnswerModeConfig = MyInstance.AnswerModeConfig;
                _oPeriodicDefaultDropDownListViewAnswerModeComponent.Clear();
            }

            OneViewConsole.Debug("Clear End", "PeriodicDefaultListViewAnswerModeComponent.Clear");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultListViewAnswerModeComponent.Clear", Excep);
        }

    }

    var GetChildTypeIdandParmas = function (config) {
        try {
            OneViewConsole.Debug("GetBandDetailsByBandId Start", "PeriodicalWorkComponent.GetBandDetailsByBandId");
            var DataSourceLst = [];
            //alert('config : ' + JSON.stringify(config));
  
            //Assestnode
            if (config.TreeDATEntityTypeId == 16) {
                if (config.LoadParms['DCPlaceId'] != undefined) {
                     var DcPlaceId = OneViewSessionStorage.Get("DcPlaceId");
                    //var DcPlaceId = 10004; //Todo : for testing purpose config hard coded

                    var _oDefaultTreeDAO = new DefaultTreeDAO();
                    DataSourceLst = _oDefaultTreeDAO.GetAllChildsByParentNodeIdAndType(DcPlaceId, config.ChildDbElementTypeId, 'OrganizationAssetsNode');
                }
            }

            else if (config.TreeDATEntityTypeId == 15) {
                alert('TreeDATEntityTypeId = 15 Not implemented');

               //if (config.LoadParms['DCUserId'] != undefined) {
                   
               //}
               //else if (config.LoadParms['DCRoleId'] != undefined) {

               //}
            }

            //alert('DataSourceLst : ' + JSON.stringify(DataSourceLst));
            //todo : for testing
            //DataSourceLst.push({
            //    'Id': 256, 'Name': "Test",
            //    "IsDynamicElement": false,
            //    "Value": 0,
            //    "Sequence": 0,
            //    "ColourCode": "",
            //});
            //DataSourceLst.push({
            //    'Id': 14, 'Name': "Catch 14",
            //    "IsDynamicElement": false,
            //    "Value": 0,
            //    "Sequence": 0,
            //    "ColourCode": "",
            //});
            //DataSourceLst.push({
            //    'Id': 89, 'Name': "Eclipse",
            //    "IsDynamicElement": false,
            //    "Value": 0,
            //    "Sequence": 0,
            //    "ColourCode": "",
            //});
            OneViewConsole.Debug("GetBandDetailsByBandId End", "PeriodicalWorkComponent.GetBandDetailsByBandId");
           
            return DataSourceLst;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicalWorkComponent.GetBandDetailsByBandId", Excep);
        }

    }

}


function PeriodicDefaultBandListViewAnswerModeComponent(TemplateId, AttributeId, ControlId) {

    var MyInstance = this;

    this.DataSourceLst = [];
    this.AnswerModeConfig = null;

    this.GetHtml = function () {
        try {
            OneViewConsole.Debug("GetHtml Start", "PeriodicDefaultBandListViewAnswerModeComponent.GetHtml");

            var Html = '';
            if (MyInstance.AnswerModeConfig.DisplayMode == 0) {
                Html = GetBandHorizontalHtml();
            }
            else {
                alert("AnswerMode DisplayMode : " + MyInstance.AnswerModeConfig.DisplayMode + " Not implemented exception, DcDefaultBandListViewAnswerModeComponent.GetBandHtml)");
            }

            OneViewConsole.Debug("GetHtml End", "PeriodicDefaultBandListViewAnswerModeComponent.GetHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultBandListViewAnswerModeComponent.GetHtml", Excep);
        }

    }


    var GetBandHorizontalHtml = function () {
        try {
            OneViewConsole.Debug("GetHtml Start", "PeriodicDefaultBandListViewAnswerModeComponent.GetHtml");

            var AttributeNodeId = "'" + AttributeId + "'";
            var ControlId = "'" + MyInstance.AnswerModeConfig.ControlId + "'";
            var SelectionType = "'" + MyInstance.AnswerModeConfig.SelectionType + "'";

            var Html = '<div class="row responsive-sm" id="Div_' + MyInstance.AnswerModeConfig.ControlId + '" >';
           
            for (var i = 0; i < MyInstance.DataSourceLst.length; i++) {

                var BandDetail = MyInstance.DataSourceLst[i];

                var ColourCode = "'" + BandDetail.ColourCode + "'";
                var Id = BandDetail.Name + MyInstance.AnswerModeConfig.ControlId;

                var BandDetailId = "'" + BandDetail.Id + "'";
                var BandDetailName = "'" + BandDetail.Name + "'";
                var Value = BandDetail.Value;

                var TagId = "'" + Id + "'";

                var Style = "";

                var Answerlst = MyInstance.GetAnswerList(TemplateId); //Get from model
                if (Answerlst != undefined) {
                    for (var j = 0; j < Answerlst.length; j++) {
                        if (Answerlst[j].Answer == BandDetail.Id) {
                            Style += 'background-color:' + BandDetail.ColourCode;
                            Style += ';color:white';
                            break;
                        }
                    }
                }
                Html += '<div class="col"><button class="button button-block" style="' + Style + '" name="' + MyInstance.AnswerModeConfig.ControlId + '" id="' + Id + '" onclick="new PeriodicDefaultBandListViewAnswerModeComponent('+ TemplateId + ',' + AttributeNodeId + ',' + ControlId + ').UpdateAnswerModel(' + BandDetailId + ',' + BandDetailName + ',' + TagId + ',' + ColourCode + ',' + SelectionType + ',' + Value + ');">' + BandDetail.Name + '</button></div>';
            }

            Html += '</div>';

            OneViewConsole.Debug("GetHtml End", "PeriodicDefaultBandListViewAnswerModeComponent.GetHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultBandListViewAnswerModeComponent.GetHtml", Excep);
        }

    }


    this.UpdateAnswerModel = function (BandDetailId, BandDetailName, TagId, ColourCode, SelectionType, Value) {
        try {
            OneViewConsole.Debug("UpdateAnswerModel Start", "PeriodicDefaultAttributeComponent.UpdateAnswerModel");

            var LVTemplateResult = CompletePeriodicTemplateResult[TemplateId].LVTemplateResult;
            var AttributeLVTemplateResult = LVTemplateResult[AttributeId];
            if (AttributeLVTemplateResult != undefined && AttributeLVTemplateResult.NA != true && AttributeLVTemplateResult.IsBlocker != true) {
            
                MyInstance.UpdateAnswerUIAndModel(AttributeLVTemplateResult.Answers, BandDetailId, BandDetailName, ColourCode, ControlId, TagId);
                         
                var _oPeriodicUIEventJobHandler = new PeriodicUIEventJobHandler(TemplateId, AttributeId, ControlId);
                var Response = _oPeriodicUIEventJobHandler.PostControlEventsExecute();

                var DataCaptureClientGuid = (CompletePeriodicTemplateResult[TemplateId].DataCaptureClientGuid != undefined) ? CompletePeriodicTemplateResult[TemplateId].DataCaptureClientGuid : "";
                var _oPeriodicActionNCUIComponent = new PeriodicActionNCUIComponent(oScope, oXlatService, oSnapRemote, oCompile);
                _oPeriodicActionNCUIComponent.Excecute("", TemplateId, AttributeId, ControlId, DataCaptureClientGuid);
            }
        
            OneViewConsole.Debug("UpdateAnswerModel End", "PeriodicDefaultAttributeComponent.UpdateAnswerModel");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultAttributeComponent.UpdateAnswerModel", Excep);
        }

    }

    this.GetAnswerList = function (TemplateId) {
        try {
            OneViewConsole.Debug("GetAnswerList Start", "PeriodicDefaultBandListViewAnswerModeComponent.GetAnswerList");
            var Answers;
            if (CompletePeriodicTemplateResult[TemplateId] != undefined) {
                var LVTemplateResult = CompletePeriodicTemplateResult[TemplateId].LVTemplateResult;
                if (LVTemplateResult != undefined) {
                    var Answers =(LVTemplateResult[AttributeId] !=undefined ? LVTemplateResult[AttributeId].Answers : undefined);
                }
            }
            OneViewConsole.Debug("GetAnswerList End", "PeriodicDefaultBandListViewAnswerModeComponent.GetAnswerList");
            return Answers;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultBandListViewAnswerModeComponent.GetAnswerList", Excep);
        }

    }

    this.UpdateAnswerUIAndModel = function (AnswerList, Answer, AnswerValue, ColourCode, ControlId,Id) {
        try {
            OneViewConsole.Debug("UpdateAnswerUI Start", "PeriodicDefaultAttributeComponent.UpdateAnswerUI");

            for (var i = 0; i < AnswerList.length; i++) {
               var ModelAnswerDetails = AnswerList[i];
               if (ModelAnswerDetails.ControlId == ControlId) {
                   if (ModelAnswerDetails.Answer != Answer) {
                       MyInstance.ClearControl(ControlId);
                       MyInstance.SetControl(Id, ColourCode);

                       //Update Model
                       ModelAnswerDetails.Answer = Answer;
                       ModelAnswerDetails.AnswerValue = AnswerValue;
                       //ModelAnswerDetails.AnswerFKType = BandDetailId;
                       //ModelAnswerDetails.AnswerDataType = BandDetailId;
                       //ModelAnswerDetails.AnswerMode = BandDetailId;
                       //ModelAnswerDetails.ClientId = BandDetailId;
                   }
                }
            }


            OneViewConsole.Debug("UpdateAnswerUI End", "PeriodicDefaultAttributeComponent.UpdateAnswerUI");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultAttributeComponent.UpdateAnswerUI", Excep);
        }
    }


    this.ClearControl = function (ControlId) {
        try {
            OneViewConsole.Debug("UpdateAnswerUI Start", "PeriodicDefaultAttributeComponent.UpdateAnswerUI");

            var AllBand = document.getElementsByName(ControlId);
            if (AllBand != null) {
                for (var i = 0; i < AllBand.length; i++) {
                    AllBand[i].style.backgroundColor = "";
                    AllBand[i].style.color = "Black";
                }
            }

            OneViewConsole.Debug("UpdateAnswerUI End", "PeriodicDefaultAttributeComponent.UpdateAnswerUI");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultAttributeComponent.UpdateAnswerUI", Excep);
        }
    }

    this.SetControl = function (Id, ColourCode) {
        try {
            OneViewConsole.Debug("UpdateAnswerUI Start", "PeriodicDefaultAttributeComponent.UpdateAnswerUI");

            var Band = document.getElementById(Id);
            Band.style.backgroundColor = ColourCode;
            Band.style.color = "white";

            OneViewConsole.Debug("UpdateAnswerUI End", "PeriodicDefaultAttributeComponent.UpdateAnswerUI");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultAttributeComponent.UpdateAnswerUI", Excep);
        }
    }


    this.ClearAnswerModel = function () {

        try {
            OneViewConsole.Debug("ClearAnswerModel Start", "PeriodicDefaultBandListViewAnswerModeComponent.ClearAnswerModel");

            //alert("AttributeId : " + AttributeId + ", ControlId : " + ControlId);
            MyInstance.ClearControl(ControlId);

            var _oPeriodicDefaultAnswerModeComponent = new PeriodicDefaultAnswerModeComponent(TemplateId, AttributeId, ControlId);
            _oPeriodicDefaultAnswerModeComponent.ClearAnswerModel(AttributeId, ControlId);

            OneViewConsole.Debug("ClearAnswerModel End", "PeriodicDefaultBandListViewAnswerModeComponent.ClearAnswerModel");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultBandListViewAnswerModeComponent.ClearAnswerModel", Excep);
        }
        finally {
            AllObj = null;
            CurrentObj = null;
        }
    }

    this.Clear = function () {
        try {
            OneViewConsole.Debug("Clear Start", "PeriodicDefaultAttributeComponent.Clear");

            MyInstance.ClearAnswerModel();

            OneViewConsole.Debug("Clear End", "PeriodicDefaultAttributeComponent.Clear");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultAttributeComponent.Clear", Excep);
        }

    }

}

function PeriodicDefaultDateTimeListViewAnswerModeComponent(TemplateId, AttributeId, ControlId) {

    var MyInstance = this;

    this.DataSourceLst = [];
    //this.AnswerModeConfig = null;

    this.GetHtml = function () {
        try {
            OneViewConsole.Debug("GetHtml Start", "PeriodicDefaultDateTimeListViewAnswerModeComponent.GetHtml");
            //alert('GetHtml : ' + MyInstance.AnswerModeConfig.DisplayMode);
            var Html = '';
            Html = GeDateTimeHtml();

            OneViewConsole.Debug("GetHtml End", "PeriodicDefaultDateTimeListViewAnswerModeComponent.GetHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultDateTimeListViewAnswerModeComponent.GetHtml", Excep);
        }

    }


    var GeDateTimeHtml = function () {
        try {
            OneViewConsole.Debug("GeDateTimeHtml Start", "PeriodicDefaultDateTimeListViewAnswerModeComponent.GeDateTimeHtml");
            
            var AttributeNodeId = "'" + AttributeId + "'";
            var Id = MyInstance.AnswerModeConfig.ControlId;
            var ControlId = "'" + MyInstance.AnswerModeConfig.ControlId + "'";

            var InputType = GetInputType(MyInstance.AnswerModeConfig.DataType);
            var DataType = MyInstance.AnswerModeConfig.DataType;
            DataType = "'" + DataType + "'";
        
            var Answer = "";

            var Answerlst = MyInstance.GetAnswerList(TemplateId); //Get from model
            
            for (var j = 0; j < Answerlst.length; j++) {
                if (Answerlst[j].Answer != "") {
                    Answer = GetFormatedValueForUI(MyInstance.AnswerModeConfig, Answerlst[j].Answer);
                }
            }

            var Html = '<div class="row responsive-sm" id="Div_' + MyInstance.AnswerModeConfig.ControlId + '" ><div class="col"><div class="field-item with-icon">';
            Html += '<label>';
            Html += '<input value="' + Answer + '" type="' + InputType + '" id="' + MyInstance.AnswerModeConfig.ControlId + '" oninput="new PeriodicDefaultDateTimeListViewAnswerModeComponent(' + TemplateId + ',' + AttributeNodeId + ',' + ControlId + ').UpdateAnswerModel(' + AttributeNodeId + ',' + ControlId + ',this,' + DataType + ');"/>';
            var Icon = (MyInstance.AnswerModeConfig.DataType == "TIME") ? "clock" : "calendar";
            Html += '<i class="icon icon-' + Icon + '-o"></i>';
            Html += '</label>';
            Html += '</div></div></div>';
           
            OneViewConsole.Debug("GeDateTimeHtml End", "PeriodicDefaultDateTimeListViewAnswerModeComponent.GeDateTimeHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultDateTimeListViewAnswerModeComponent.GeDateTimeHtml", Excep);
        }

    }


    this.UpdateAnswerModel = function (TemplateNodeId, ControlId, DOMObj,DataType) {
        try {
            OneViewConsole.Debug("UpdateAnswerModel Start", "PeriodicDefaultDateTimeListViewAnswerModeComponent.UpdateAnswerModel");

            var ControlConfig = { DataType: DataType };
            var LVTemplateResult = CompletePeriodicTemplateResult[TemplateId].LVTemplateResult;
            var AttributeLVTemplateResult = LVTemplateResult[AttributeId];
            if (AttributeLVTemplateResult != undefined && AttributeLVTemplateResult.NA != true && AttributeLVTemplateResult.IsBlocker != true) {
                Answer = GetFormatedValue(ControlConfig, DOMObj);
                MyInstance.UpdateAnswerUIAndModel(AttributeLVTemplateResult.Answers, Answer, "",  ControlId);

               /* var DataCaptureClientGuid = (CompletePeriodicTemplateResult[TemplateId].DataCaptureClientGuid != undefined) ? CompletePeriodicTemplateResult[TemplateId].DataCaptureClientGuid : "";
                var _oPeriodicActionNCUIComponent = new PeriodicActionNCUIComponent(oScope, oXlatService, oSnapRemote, oCompile);
                _oPeriodicActionNCUIComponent.Excecute("", TemplateId, AttributeId, "", DataCaptureClientGuid);*/
            }

            OneViewConsole.Debug("UpdateAnswerModel End", "PeriodicDefaultDateTimeListViewAnswerModeComponent.UpdateAnswerModel");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultDateTimeListViewAnswerModeComponent.UpdateAnswerModel", Excep);
        }

    }

    this.GetAnswerList = function (TemplateId) {
        try {
            OneViewConsole.Debug("GetAnswerList Start", "PeriodicDefaultDateTimeListViewAnswerModeComponent.GetAnswerList");

            var LVTemplateResult = CompletePeriodicTemplateResult[TemplateId].LVTemplateResult;
            var Answers = LVTemplateResult[AttributeId].Answers;

            OneViewConsole.Debug("GetAnswerList End", "PeriodicDefaultDateTimeListViewAnswerModeComponent.GetAnswerList");
            return Answers;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultDateTimeListViewAnswerModeComponent.GetAnswerList", Excep);
        }

    }

    this.UpdateAnswerUIAndModel = function (AnswerList, Answer, AnswerValue,ControlId) {
        try {
            OneViewConsole.Debug("UpdateAnswerUIAndModel Start", "PeriodicDefaultDateTimeListViewAnswerModeComponent.UpdateAnswerUIAndModel");
            
            for (var i = 0; i < AnswerList.length; i++) {
                var ModelAnswerDetails = AnswerList[i];
               
                if (ModelAnswerDetails.ControlId == ControlId) {
                    if (ModelAnswerDetails.Answer != Answer) {
                       // MyInstance.ClearControl(ControlId);
                        //MyInstance.SetControl(Id, ColourCode);

                        //Update Model
                        ModelAnswerDetails.Answer = Answer;
                        //ModelAnswerDetails.AnswerValue = AnswerValue;
                        //ModelAnswerDetails.AnswerFKType = BandDetailId;
                        //ModelAnswerDetails.AnswerDataType = BandDetailId;
                        //ModelAnswerDetails.AnswerMode = BandDetailId;
                        //ModelAnswerDetails.ClientId = BandDetailId;

                      
                    }
                }
            }
            
            OneViewConsole.Debug("UpdateAnswerUIAndModel End", "PeriodicDefaultDateTimeListViewAnswerModeComponent.UpdateAnswerUIAndModel");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultDateTimeListViewAnswerModeComponent.UpdateAnswerUIAndModel", Excep);
        }
    }


    this.ClearControl = function (ControlId) {
        try {
            OneViewConsole.Debug("ClearControl Start", "PeriodicDefaultDateTimeListViewAnswerModeComponent.ClearControl");

            var _oDOM = new DOM();
            _oDOM.Clear(ControlId);

            OneViewConsole.Debug("ClearControl End", "PeriodicDefaultDateTimeListViewAnswerModeComponent.ClearControl");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultDateTimeListViewAnswerModeComponent.ClearControl", Excep);
        }
    }

    this.SetControl = function (Id) {
        try {
            OneViewConsole.Debug("SetControl Start", "PeriodicDefaultDateTimeListViewAnswerModeComponent.SetControl");

          

            OneViewConsole.Debug("SetControl End", "PeriodicDefaultDateTimeListViewAnswerModeComponent.SetControl");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultDateTimeListViewAnswerModeComponent.SetControl", Excep);
        }
    }


    this.ClearAnswerModel = function () {

        try {
            OneViewConsole.Debug("ClearAnswerModel Start", "PeriodicDefaultDateTimeListViewAnswerModeComponent.ClearAnswerModel");

            //alert("AttributeId : " + AttributeId + ", ControlId : " + ControlId);
            MyInstance.ClearControl(ControlId);

            var _oPeriodicDefaultAnswerModeComponent = new PeriodicDefaultAnswerModeComponent(TemplateId, AttributeId, ControlId);
            _oPeriodicDefaultAnswerModeComponent.ClearAnswerModel(AttributeId, ControlId);

            OneViewConsole.Debug("ClearAnswerModel End", "PeriodicDefaultDateTimeListViewAnswerModeComponent.ClearAnswerModel");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultDateTimeListViewAnswerModeComponent.ClearAnswerModel", Excep);
        }
        finally {
            AllObj = null;
            CurrentObj = null;
        }
    }

    this.Clear = function () {
        try {
            OneViewConsole.Debug("Clear Start", "PeriodicDefaultDateTimeListViewAnswerModeComponent.Clear");

            MyInstance.ClearAnswerModel();

            OneViewConsole.Debug("Clear End", "PeriodicDefaultDateTimeListViewAnswerModeComponent.Clear");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultDateTimeListViewAnswerModeComponent.Clear", Excep);
        }

    }

    var GetInputType = function (DataType) {

        try {
            OneViewConsole.Debug("GetInputType Start", "PeriodicDefaultDateTimeListViewAnswerModeComponent.GetInputType");

            switch (DataType) {
                case "STRING": return "text";
                case "INTEGER": return "tel";
                case "TIME": return "time";
                case "DATE": return "date";
                case "DATETIME": return "datetime-local";
                case "DATETIMELOCAL": return "datetime-local";
                case "MONTHYEAR": return "month";
                case "PASSWORD": return "password";
                default: return "text";
            }

            OneViewConsole.Debug("GetInputType Start", "PeriodicDefaultDateTimeListViewAnswerModeComponent.GetInputType");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultDateTimeListViewAnswerModeComponent.GetInputType", Excep);
        }
    }

    /// <summary>
    /// Check
    /// </summary>
    /// <param name="ControlConfig">ControlConfig</param>
    /// <param name="DOMObj">DOMObj</param>
    /// <returns>Formated Value</returns>
    var GetFormatedValue = function (ControlConfig, DOMObj) {

        try {
            OneViewConsole.Debug("GetFormatedValue Start", "PeriodicDefaultDateTimeListViewAnswerModeComponent.GetFormatedValue");

            var Answer = DOMObj.value;

            if (ControlConfig.DataType == "DATETIMELOCAL" || ControlConfig.DataType == "DATETIME") {
                if (DOMObj != null && DOMObj.value.indexOf('T') != -1) {
                    var DateTime = DOMObj.value.split('T');
                    var Date = DateTime[0].split('-');
                    Answer = Date[2] + "-" + Date[1] + "-" + Date[0] + " " + DateTime[1] + ":00";
                }
            }
            else if (ControlConfig.DataType == "DATE") {
                if (DOMObj != null && DOMObj.value.indexOf('-') != -1) {
                    var Date = DOMObj.value.split('-');
                    Answer = Date[2] + "-" + Date[1] + "-" + Date[0];
                }
            }
            else if (ControlConfig.DataType == "MONTHYEAR") {
                if (DOMObj != null && DOMObj.value.indexOf('-') != -1) {
                    var Date = DOMObj.value.split('-');
                    Answer = Date[1] + "-" + Date[0];
                }
            }

            OneViewConsole.Debug("GetFormatedValue End", "PeriodicDefaultDateTimeListViewAnswerModeComponent.GetFormatedValue");

            return Answer;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultDateTimeListViewAnswerModeComponent.GetFormatedValue", Excep);
        }
    }


    /// <summary>
    /// Check
    /// </summary>
    /// <param name="ControlConfig">ControlConfig</param>
    /// <param name="DOMObj">DOMObj</param>
    /// <returns>Formated Value</returns>
    var GetFormatedValueForUI = function (AnswerMode, Answer) {

        try {
            OneViewConsole.Debug("GetFormatedValueForUI Start", "PeriodicDefaultDateTimeListViewAnswerModeComponent.GetFormatedValueForUI");

            if (AnswerMode.DataType == "DATETIMELOCAL" || AnswerMode.DataType == "DATETIME") {
                if (Answer != "" && Answer.indexOf(' ') != -1) {
                    var DateTime = Answer.split(' ');
                    var Date = DateTime[0].split('-');
                    Answer = Date[2] + "-" + Date[1] + "-" + Date[0] + "T" + DateTime[1];
                }
            }
            else if (AnswerMode.DataType == "DATE") {
                if (Answer != "" && Answer.indexOf('-') != -1) {
                    var Date = Answer.split('-');
                    Answer = Date[2] + "-" + Date[1] + "-" + Date[0];
                }
            }
            else if (AnswerMode.DataType == "MONTHYEAR") {
                if (Answer != "" && Answer.indexOf('-') != -1) {
                    var Date = Answer.split('-');
                    Answer = Date[1] + "-" + Date[0];
                }
            }

            OneViewConsole.Debug("GetFormatedValueForUI End", "PeriodicDefaultDateTimeListViewAnswerModeComponent.GetFormatedValueForUI");

            return Answer;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultDateTimeListViewAnswerModeComponent.GetFormatedValueForUI", Excep);
        }
    }
}

function PeriodicFactory() {

    this.GetAnswerModeComponent = function (TemplateId, AttributeId, ControlId, Type) {

        try {
            OneViewConsole.Debug("GetHtml Start", "PeriodicFactory.GetHtml");

            switch (Type) {

                case "DCListViewControlConfig": {
                    return new PeriodicDefaultListViewAnswerModeComponent(TemplateId, AttributeId, ControlId);
                };
                case "DCImageCaptureControlConfig": {
                    return new PeriodicDefaultCameraAnswerModeComponent(TemplateId, AttributeId, ControlId);
                };
                case "DCDateTimeControlConfig": {
                    return new PeriodicDefaultDateTimeListViewAnswerModeComponent(TemplateId, AttributeId, ControlId);
                };
                default: '';
            }

            OneViewConsole.Debug("GetHtml End", "PeriodicFactory.GetHtml");
        }
        catch (Excep) {
           // alert("PeriodicFactory.GetAnswerModeComponent 11" + Excep);
           // alert("PeriodicFactory.GetAnswerModeComponent 22: " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicFactory.GetAnswerModeComponent", Excep);
        }
        finally {
        }
    }

}


function ModelOperationComponent() {

    var MyInstance = this;

    this.CreateModel = function (LVTemplateResult, TemplateNodeId, TemplateNodeName, ControlId, DCResultDetailId, Answer, AnswerValue, AnswerFKType, AnswerDataType, AnswerMode, ESTTime, IsNA, ControlAnswerMode, LastDCInfo) {

        try {
            OneViewConsole.Debug("CreateModel Start", "ModelOperationComponent.CreateModel");

            var IsNewControl = false;
            if (Answer == undefined)
                Answer = '';

            if (LVTemplateResult[TemplateNodeId] == undefined) {
                LVTemplateResult[TemplateNodeId] = {
                    IsAttributeGroup: false,
                    NA: IsNA,
                    IsBlocker: false,
                    Comments: "",
                    Id: TemplateNodeId,
                    Name: TemplateNodeName,
                    Answers: [],
                    ESTTime: ESTTime,
                    ActualTime: 0,
                    IsManualESTEnabled: true,
                    IsSubmitMandatoryExist: false,
                    IsSaveMandatoryExist: false,
                    SaveMandatoryInfo: {},
                    SubmitMandatoryInfo: {},
                //Multi :  {
                //    ControlId : []
                //        }
                }
                IsNewControl = true;
            }
            else {
                for (var i = 0; i < LVTemplateResult[TemplateNodeId].Answers.length; i++) {
                    if (LVTemplateResult[TemplateNodeId].Answers[i].ControlId == ControlId) {
                        IsNewControl = false;
                        break;
                    }
                    else {
                        IsNewControl = true;
                    }
                }
            }
            if (IsNewControl == true) {

                // DC Result Detail Table info
                var AnswerModeObj = {
                    "ServerId": '',
                    "ClientId": DCResultDetailId, // Primary key of the DC Result Detail
                    "ClientGuid": (LastDCInfo != undefined ? LastDCInfo.DCResultDetailClientGuid : ''),
                    "ControlId": ControlId,
                    "Comments": '',
                    "Answer": Answer,
                    "AnswerValue": AnswerValue,
                    "AnswerFKType": AnswerFKType,
                    "AnswerDataType": AnswerDataType,
                    "AnswerMode": ControlAnswerMode.Type,
                    "IsModified": true,
                    "IsManual": true,
                    "IsDynamicAttribute": false,
                    "IsDynamicAnswer": false,
                    "IndexId": 0,
                    "IsMulti": false,
                    "AutomaticDeviceId": "",
                    "Score": 0,
                    "MaxScore": 0,
                    "Percentage": 0,
                    "CompletedChildCount": 0,
                    "TotalChildCount": 0,
                    "CompletedAttributeCount": 0,
                    "TotalAttributeCount": 0,
                    "ActionInfo": {}
                }

                LVTemplateResult[TemplateNodeId].Answers.push(AnswerModeObj);
            }

            OneViewConsole.Debug("CreateModel End", "ModelOperationComponent.CreateModel");

            return LVTemplateResult;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ModelOperationComponent.CreateModel", Excep);
        }

    }

    this.InitModel = function (TemplateNodeId, TemplateNodeName, AttributeId, LastDCInfo, DcProfileServerId, ControlId, _LVTemplateResult, AnswerMode) {
        try {
            
            var _LVTemplateResult = MyInstance.CreateModel(_LVTemplateResult, AttributeId, TemplateNodeName, ControlId, LastDCInfo.DCResultDetailId, LastDCInfo.Answer, LastDCInfo.AnswerValue, AnswerMode.FKType, LastDCInfo.AnswerDataType, LastDCInfo.AnswerMode, LastDCInfo.ESTTime, LastDCInfo.IsNA, AnswerMode, LastDCInfo);
            return _LVTemplateResult;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ExpressComponent.InitModel", Excep);
        }

    }


    this.CreateCompletePeriodicTemplateResult = function (TemplateNodeId, TemplateNodeName, DataCaptureId, DataCaptureClientGuid, DCResultId, DcProfileServerId, _LVTemplateResult, TemplateDCStatus, IsOnDeviceApprovalFinished) {
        try {
            var IsBlocker = false;
            CompletePeriodicTemplateResult[TemplateNodeId] =
                {
                    TemplateNodeId: TemplateNodeId,
                    TemplateNodeName: TemplateNodeName,
                    DataCaptureId: DataCaptureId,
                    DcProfileServerId: DcProfileServerId,
                    DataCaptureClientGuid: DataCaptureClientGuid,
                    DCResultId: DCResultId,
                    'IsOnDeviceApprovalFinished' : IsOnDeviceApprovalFinished,
                    LVTemplateResult: _LVTemplateResult,
                    IsUpdated: false,
                    IsBlocker: IsBlocker,
                    TemplateDCStatus: TemplateDCStatus
                };
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ExpressComponent.InitModel", Excep);
        }
    }


}

function PeriodicHierarchyComponent() {

    var MyInstance = this;
    var TemplateNodes = [];
    

    this.GetFormattedTemplateNodes = function (TemplateNodeId) {
        try {
            OneViewConsole.Debug("GetFormattedTemplateNodes Start", "PeriodicHierarchyComponent.GetFormattedTemplateNodes");

            var TemplateGroupHierarchy = null;

            var _oDefaultTreeDAO = new DefaultTreeDAO();
            var ParentNode = _oDefaultTreeDAO.GetNodeById(TemplateNodeId, "TemplateNode");

            var MainCompletedCount = 0;
            var MainInProgressCount = 0;
            var MainApprovedCount = 0;
            var MainTotalCount = 0;
            var Index = 0;

            TemplateGroupHierarchy = {
                'TemplateNodeId': ParentNode[0].ServerId, 'TemplateName': ParentNode[0].ChildDbElementName, 'ChildDbElementType': ParentNode[0].ChildDbElementType, 'Left': ParentNode[0].Left, 'Right': ParentNode[0].Right,
                'ParentNodeId': ParentNode[0].ParentNodeId, 'IsAttributeGroup': true, 'IsTemplate': false, 'InProgressCount': MainInProgressCount,
                'CompletedCount': MainCompletedCount, 'ApprovedCount': MainApprovedCount, 'TotalCount': MainTotalCount, 'Index': Index, 'Level': 'L0',
                'TemplateConfigMetaDataDetails': {
                    'Name': ParentNode[0].Name, 'Childs': []
                }
            };

            TemplateNodes = GetTemplateNodes(ParentNode);
            var Index = 0;
            for (var i = 0; i < TemplateNodes.length; i++) {
                var IsTemplate = false;
                var Level = 1;
                // alert('TemplateNodes[i] : ' + JSON.stringify(TemplateNodes[i]));
                if (TemplateNodes[i].ParentNodeId == TemplateNodeId) {
                    var InProgressCount = 0;
                    var CompletedCount = 0;
                    var ApprovedCount = 0;
                    var TotalCount = 0;
                    //alert(Index + ',Level: ' + Level + ' , PeriodicTotalNoOfLevels: ' + PeriodicTotalNoOfLevels);
                    if (Level == (PeriodicTotalNoOfLevels - 1)) {
                        IsTemplate = true;
                    }
                    var RowData = GetStructure(TemplateNodes[i], true, IsTemplate, InProgressCount, CompletedCount, ApprovedCount, TotalCount, Index, Level);
                    var Childs = AddChilds(RowData, Level, 0);
                    TemplateGroupHierarchy.TemplateConfigMetaDataDetails.Childs.push(Childs);
                    Index++;
                    //}
                }
            }

            OneViewConsole.Debug("GetFormattedTemplateNodes End", "PeriodicHierarchyComponent.GetFormattedTemplateNodes");

            return TemplateGroupHierarchy;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicHierarchyComponent.GetFormattedTemplateNodes", Excep);
        }
    }

    var AddChilds = function (Obj, Level, Index) {
        try {
            OneViewConsole.Debug("AddChilds Start", "PeriodicHierarchyComponent.AddChilds");
            Level++;
            Obj["Childs"] = [];
      

            for (var i = 0; i < TemplateNodes.length; i++) {
                var IsTemplate = false;
                var InProgressCount = 0;
                var CompletedCount = 0;
                var ApprovedCount = 0;
                var TotalCount = 0;
               // alert('TemplateNodes[i] 22 : ' + JSON.stringify(TemplateNodes[i]));
                if (TemplateNodes[i].ParentNodeId == Obj.Id && TemplateNodes[i].ChildDbElementType != 8) {
                    // alert(Index + ',  jjj Level: ' + Level + ' , PeriodicTotalNoOfLevels: ' + PeriodicTotalNoOfLevels);
                    if (Level == (PeriodicTotalNoOfLevels - 1)) {
                        IsTemplate = true;
                    }
                    var RowData = GetStructure(TemplateNodes[i], true, IsTemplate, InProgressCount, CompletedCount, ApprovedCount, TotalCount, Index, Level);
                    Obj.Childs.push(RowData);
                    Index++;
                    AddChilds(RowData, Level, Index);
                }
            }
            OneViewConsole.Debug("AddChilds End", "PeriodicHierarchyComponent.AddChilds");
            return Obj
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicHierarchyComponent.AddChilds", Excep);
        }
    }

    var GetTemplateNodes = function (ParentNode) {
        try {
            OneViewConsole.Debug("GetTemplateNodes Start", "PeriodicHierarchyComponent.GetTemplateNodes");
          
            var TemplateNodes = new TemplateNodeDAO().GetAllChilds(ParentNode);

            //var TemplateNodes = [
            //    { Id: 2, ChildDbElementName: "Area 1", ParentNodeId: 1 },
            //    { Id: 3, ChildDbElementName: "Area 2", ParentNodeId: 1 },
            //    { Id: 4, ChildDbElementName: "Section 1", ParentNodeId: 2 },
            //    { Id: 5, ChildDbElementName: "Section 2", ParentNodeId: 2 },
            //    { Id: 6, ChildDbElementName: "Section 3", ParentNodeId: 3 },
            //    { Id: 7, ChildDbElementName: "Template 1", ParentNodeId: 4 },
            //    { Id: 8, ChildDbElementName: "Template 2", ParentNodeId: 5 },
            //    { Id: 9, ChildDbElementName: "Template 3", ParentNodeId: 6 },
            //    { Id: 10, ChildDbElementName: "Attribute 1", ParentNodeId: 7 },
            //    { Id: 11, ChildDbElementName: "Attribute 2", ParentNodeId: 8 },
            //    { Id: 12, ChildDbElementName: "Attribute 3", ParentNodeId: 9 }
            //];

            OneViewConsole.Debug("GetTemplateNodes End", "PeriodicHierarchyComponent.GetTemplateNodes");

            return TemplateNodes;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicHierarchyComponent.GetTemplateNodes", Excep);
        }
    }

    var GetStructure = function (Node, IsAttributeGroup, IsTemplate, InProgressCount, CompletedCount, ApprovedCount, TotalCount, Index, Level) {
        try {
            OneViewConsole.Debug("GetTemplateNodes Start", "PeriodicHierarchyComponent.GetTemplateNodes");


            var RowProperties = {
                'Id': Node.ServerId, 'Name': Node.ChildDbElementName, 'ChildDbElementType': Node.ChildDbElementType, 'Left': Node.Left, 'Right': Node.Right, 'ParentNodeId': Node.ParentNodeId,
                'IsAttributeGroup': IsAttributeGroup, 'IsTemplate': IsTemplate, 'InProgressCount': InProgressCount,
                'CompletedCount': CompletedCount, 'ApprovedCount': ApprovedCount, 'TotalCount': TotalCount, 'Index': Index, 'Level': 'L' + Level
            };

            OneViewConsole.Debug("GetTemplateNodes End", "PeriodicHierarchyComponent.GetTemplateNodes");

            return RowProperties;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicHierarchyComponent.GetTemplateNodes", Excep);
        }
    }

}


function PeriodicDefaultNAComponent(TemplateId) {

    var MyInstance = this;
  

    /// <summary>
    /// Get NA html
    /// </summary>
    /// <param name="IsNAselected">NA will select or not</param>
    /// <returns>NA html</returns>
    this.GetHtml = function (AttributeId, IsNAselected) {

        try {
            OneViewConsole.Debug("GetHtml Start", "PeriodicDefaultNAComponent.GetHtml");

            var NAHtml = '';
          
            if (IsNAselected != true) {
                NAHtml = '<div class="na-but item-left-edit visible active">' +
                                '<button class="button" onclick="new PeriodicDefaultNAComponent(' + TemplateId + ').UpdateModel(' + AttributeId + ',this);">N/A</button>' +
                         '</div>';
            }
            else {
                NAHtml = '<div class="na-but item-left-edit visible active">' +
                                '<button class="button active" onclick="new PeriodicDefaultNAComponent(' + TemplateId + ').UpdateModel(' + AttributeId + ',this);">N/A</button>' +
                         '</div>';
            }

            OneViewConsole.Debug("GetHtml End", "PeriodicDefaultNAComponent.GetHtml");

            return NAHtml;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultNAComponent.GetHtml", Excep);
        }
    }

    /// <summary>
    /// Update Model
    /// </summary>
    /// <param name="TemplateNodeId">Template Node Id</param>
    /// <param name="DOMObj">DOMObj</param>
    this.UpdateModel = function (AttributeId, DOMObj) {

        try {
            OneViewConsole.Debug("UpdateModel Start", "PeriodicDefaultNAComponent.UpdateModel");

            var _oDOM = new DOM();
            var AttrDivId = "TemplateNodeBlock_" + AttributeId;
            var LVTemplateResult = CompletePeriodicTemplateResult[TemplateId].LVTemplateResult;
            if (LVTemplateResult[AttributeId] != undefined) {
                SetColor(AttributeId, DOMObj);
                LVTemplateResult[AttributeId].NA = !(LVTemplateResult[AttributeId].NA);

                var TemplateConfigMetadata = PTempMData[TemplateId];
                var AttributeConfig = TemplateConfigMetadata.TemplateConfigMetaDataDetails.Childs[0];
                                
                if (LVTemplateResult[AttributeId].NA == true) {
                    //for (i = 0; i < AttributeConfig.AnswerModes.length; i++) {
                    //    var AnswerModeConfig = AttributeConfig.AnswerModes[i];
                    //    if (AnswerModeConfig.Type = 'DCListViewControlConfig') {

                    //        if (AnswerModeConfig.ListViewDisplay == 0) {
                    //            var _oPeriodicDefaultBandListViewAnswerModeComponent = new PeriodicDefaultBandListViewAnswerModeComponent(TemplateId, AttributeId, AnswerModeConfig.ControlId);
                    //            _oPeriodicDefaultBandListViewAnswerModeComponent.ClearAnswerModel();
                    //        }
                    //    }
                    //}

                    var _oPeriodicDefaultAttributeComponent = new PeriodicDefaultAttributeComponent(TemplateId, AttributeId);
                    _oPeriodicDefaultAttributeComponent.AttributeConfig = PTempMData[TemplateId].TemplateConfigMetaDataDetails.Childs[0];
                    _oPeriodicDefaultAttributeComponent.Clear();
                           
                    var DataCaptureClientGuid = (CompletePeriodicTemplateResult[TemplateId].DataCaptureClientGuid != undefined) ? CompletePeriodicTemplateResult[TemplateId].DataCaptureClientGuid : "";
                
                    PostControlEventsExecute(TemplateId, AttributeId);
                    
                    var _oPeriodicActionNCUIComponent = new PeriodicActionNCUIComponent(oScope, oXlatService, oSnapRemote, oCompile);
                    _oPeriodicActionNCUIComponent.Excecute("", TemplateId, AttributeId, "", DataCaptureClientGuid);

                    _oDOM.AddClass(AttrDivId, "na");
                }
                else {
                    _oDOM.RemoveClass(AttrDivId, "na");
                }
            }

            OneViewConsole.Debug("UpdateModel End", "PeriodicDefaultNAComponent.UpdateModel");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultNAComponent.UpdateModel", Excep);
        }
    }

    var SetColor = function (AttributeId, DOMObj) {

        try {
            OneViewConsole.Debug("SetColor Start", "LVDefaultNAComponent.SetColor");

            var _oDOM = new DOM();

            if (CompletePeriodicTemplateResult[TemplateId].LVTemplateResult[AttributeId].NA) {
                _oDOM.RemoveClassByObj(DOMObj, "active");
            }
            else {
                _oDOM.AddClassByObj(DOMObj, "active");
            }

            OneViewConsole.Debug("SetColor End", "LVDefaultNAComponent.SetColor");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LVDefaultNAComponent.SetColor", Excep);
        }
    }

    var PostControlEventsExecute = function (TemplateId, AttributeId) {

        try {
            OneViewConsole.Debug("SetColor Start", "LVDefaultNAComponent.SetColor");
            
            if (CompletePeriodicTemplateResult[TemplateId] != undefined) {
                var LVTemplateResult = CompletePeriodicTemplateResult[TemplateId].LVTemplateResult;
                if (LVTemplateResult != undefined) {
                    var Answers = LVTemplateResult[AttributeId].Answers;
                    for (var i = 0; i < Answers.length ; i++) {
                        var res = new PeriodicUIEventJobHandler(TemplateId, AttributeId, Answers[i].ControlId).PostControlEventsExecute(false);
                    }
                }
            }
           
            OneViewConsole.Debug("SetColor End", "LVDefaultNAComponent.SetColor");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LVDefaultNAComponent.SetColor", Excep);
        }
    }
}

function PeriodicDefaultHelpComponent(TemplateId) {

    var MyInstance = this;
       
    this.GetHtml = function (AttributeId) {

        try {
            OneViewConsole.Debug("GetHtml Start", "PeriodicDefaultHelpComponent.GetHtml");

            var Html = '';
            var HelpDocumentMetaDataDict = (CompletePeriodicAttributeOtherConfigDict[TemplateId] !=undefined ? CompletePeriodicAttributeOtherConfigDict[TemplateId].HelpDocumentMetaDataDict : null ) ;
            if (HelpDocumentMetaDataDict != null && HelpDocumentMetaDataDict[AttributeId] != undefined) {
                Html = '<button class="button more-btn" onclick="new PeriodicDefaultHelpComponent(' + TemplateId + ').ShowInfo(' + AttributeId + ')">' +
                        '<i class="icon icon-info-circle" style="margin-left: -12px; color:#b3b3b3;"></i>' +
                         '</button>';
            }

            OneViewConsole.Debug("GetHtml End", "PeriodicDefaultHelpComponent.GetHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultHelpComponent.GetHtml", Excep);
        }
    }
        
    this.ShowInfo = function (AttributeId) {

        try {
            OneViewConsole.Debug("ShowInfo Start", "PeriodicDefaultHelpComponent.ShowInfo");

            var HelpDocumentMetaDataDict = CompletePeriodicAttributeOtherConfigDict[TemplateId].HelpDocumentMetaDataDict;

            alert(oXlatService.xlat(HelpDocumentMetaDataDict[AttributeId].HelpDocString));

            OneViewConsole.Debug("ShowInfo End", "PeriodicDefaultHelpComponent.ShowInfo");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultHelpComponent.ShowInfo", Excep);
        }
    }

}

function PeriodicActionNCUIComponent($scope, xlatService, snapRemote, $compile) {

    var MyInstance = this;

    var ActionNCConfigList = [];

    this.Excecute = function (Value, TemplateNodeId, AttributeId, ControlId, DataCaptureClientGuid) {
        try {
            OneViewConsole.Debug("Excecute Start", "PeriodicActionNCUIComponent.Excecute");
            
            var oActionNCConfig = GetActionNCConfig(TemplateNodeId, AttributeId);

            CurrentTemplateNodeId = TemplateNodeId;
            CurrentAttributeId = AttributeId;
            CurrentControlId = ControlId;

            //ActionNCConfigList = [
            //  {
            //      TemplateNodeIds: "," + AttributeId + ",",
            //      RuleId: TemplateNodeId,
            //      IsNC: true,
            //      IsObservation: false,
            //      IsManual: true,
            //      IsCustomActionEnabled: true
            //  },
            //];

            //CreateNCModel(TemplateNodeId, AttributeId, ControlId);

           // var IsRuleViolated = MyInstance.EvaluateActionNCStatus(TemplateNodeId, AttributeId);

                  
           
            if (oActionNCConfig != undefined && oActionNCConfig.length > 0) {
                if (oActionNCConfig.length > 1) {
                    alert("LVActionNCComponent.CheckActionNC for multiple rules : Not implemented exception");
                }
                else {
                    ActionNCConfigList = oActionNCConfig;
                    CurrentRuleId = ActionNCConfigList[0].RuleId;
                    if (ActionNCConfigList[0].IsRuleViolated == true) {
                        if (ActionNCConfigList[0].IsNC == true && ActionNCConfigList[0].IsManual == true) {
                            Load(TemplateNodeId, AttributeId, ControlId, DataCaptureClientGuid, ActionNCConfigList[0].RuleId);
                        }
                        else  if (ActionNCConfigList[0].IsNC == true && ActionNCConfigList[0].IsManual == false) {
                            alert('PeriodicActionNCUIComponent Not implemented Exception IsNC =true and IsManual = false');
                        }
                        else {
                            alert('PeriodicActionNCUIComponent Not implemented Exception');
                        }
                    }
                    else {
                        UpdateModel(TemplateNodeId, AttributeId, ControlId, DataCaptureClientGuid, ActionNCConfigList[0].RuleId);
                        MyInstance.DeleteRule(TemplateNodeId, ActionNCConfigList[0].RuleId);
                    }
                }
            }
                        
            OneViewConsole.Debug("Excecute End", "PeriodicActionNCUIComponent.Excecute");
        }
        catch (Excep) {
            //alert("PeriodicActionNCUIComponent.Excecute" + Excep);
            //alert("PeriodicActionNCUIComponent.Excecute" + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicActionNCUIComponent.Excecute", Excep);
        }
    }

    var Load = function (TemplateNodeId, AttributeId, ControlId, DataCaptureClientGuid, RuleId) {
        try {
            OneViewConsole.Debug("Load Start", "PeriodicActionNCUIComponent.Load");

            $scope.CustomAction = "";
            $scope.CustomActions = [];
            $scope.ActionMultiMediaSubElements = [];

            UpdateModel(TemplateNodeId, AttributeId, ControlId, DataCaptureClientGuid, RuleId);
            LoadCustomActions(ActionNCConfigList[0], TemplateNodeId);
            LoadActionMultimediaSubElements(ActionNCConfigList[0], TemplateNodeId);

            var _oOneViewSidePanel = new OneViewSidePanel(snapRemote);
            _oOneViewSidePanel.Clear();

            var Html = '<div class="bar bar-header no-padding">' +
                               '<div class="button-bar my-audit">' +
                                    '<a class="button button-clear"><i class="icon icon-edit"></i> {{"Action" | xlat}}</a>' +
                               '</div>' +
                           '</div>' +
                           '<div class="scroll-content has-header has-footer action" style="background: #eef3f5;">' +
                               '<div class="full-height scrollable" id="RightPanelContent">' +
                                    GetHtml(TemplateNodeId, AttributeId, ControlId, DataCaptureClientGuid) +
                               '</div>' +
                            '</div>' +
                            '<div class="bar bar-footer no-padding">' +
                                '<div class="row">' +
                                    '<div class="col"><a class="button button-block button-clear" ng-click="CloseRightPanel()"><i class="icon icon-cancel-circle"></i> {{"Close" | xlat}}</a></div>' +
                                '</div>' +
                            '</div>';

            var _oOneViewCompiler = new OneViewCompiler();
            _oOneViewCompiler.CompileAndApeend($scope, $compile, Html, "divAutocomplatePopUp");

            _oOneViewSidePanel.Toggle(snapRemote);

            OneViewConsole.Debug("Load End", "PeriodicActionNCUIComponent.Load");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicActionNCUIComponent.Load", Excep);
        }
    }

    var UpdateModel = function (TemplateNodeId, AttributeId, ControlId, DataCaptureClientGuid, RuleId) {
        try {
            OneViewConsole.Debug("Load Start", "PeriodicActionNCUIComponent.UpdateModel");
          
            if (CompletePeriodicActionResult[TemplateNodeId] == undefined) {

                CompletePeriodicActionResult[TemplateNodeId] = {}
                var LVActionResult = CompletePeriodicActionResult[TemplateNodeId];

                var _oActionDAO = new ActionDAO();
                var ActionDCNCMappings = _oActionDAO.GetAllActionsByDataCaptureClientGuidAndRuleId(DataCaptureClientGuid, RuleId);

                //alert(JSON.stringify(ActionDCNCMappings));
                
                for (var i = 0; i < ActionDCNCMappings.length; i++) {

                    if (ActionDCNCMappings[i] != undefined) {
                        if (LVActionResult[ActionDCNCMappings[i].RuleId] != undefined) {
                            LVActionResult[ActionDCNCMappings[i].RuleId].Actions.push({
                                "PreDefinedActionId": (ActionDCNCMappings[i].CustomAction != "") ? 0 : ActionDCNCMappings[i].PreDefinedActionId,
                                "Name": ActionDCNCMappings[i].CustomAction,
                                "ActionDetailsClientId": ActionDCNCMappings[i].ActionDetailsClientId,
                                "IsDisable": false,
                                "ActionType": (ActionDCNCMappings[i].CustomAction != "") ? LVActionType.CustomAction : LVActionType.PredefinedAction,
                                "ActionDetailsServerId": ActionDCNCMappings[i].ActionDetailsServerId,
                            });
                        }
                        else {
                            LVActionResult[ActionDCNCMappings[i].RuleId] = {
                                "IsDisable": false,
                                "IsNC": (ActionDCNCMappings[i].IsNC == "true") ? true : false,
                                "IsObservation": (ActionDCNCMappings[i].IsObservation == "true") ? true : false,
                                "IsManualRule": (ActionDCNCMappings[i].IsManualRule == "true") ? true : false,
                                "ActionClientId": ActionDCNCMappings[i].ActionClientId,
                                "ActionClientGuid": ActionDCNCMappings[i].ActionClientGuid,
                                "DCNCMappingClientId": ActionDCNCMappings[i].DCNCMappingClientId,
                                "DNNCMappimgServerId": ActionDCNCMappings[i].DNNCMappimgServerId,
                                "TemplateNodeIds": ActionDCNCMappings[i].TemplateNodeIds,
                                "Actions": [
                                    {
                                        "PreDefinedActionId": (ActionDCNCMappings[i].CustomAction != "") ? 0 : ActionDCNCMappings[i].PreDefinedActionId,
                                        "Name": ActionDCNCMappings[i].CustomAction,
                                        "ActionDetailsClientId": ActionDCNCMappings[i].ActionDetailsClientId,
                                        "IsDisable": false,
                                        "ActionType": (ActionDCNCMappings[i].CustomAction != "") ? LVActionType.CustomAction : LVActionType.PredefinedAction,
                                        "ActionDetailsServerId": ActionDCNCMappings[i].ActionDetailsServerId,
                                    }
                                ],
                                "MultimediaSubElements": []
                            };
                        }
                    }
                }
            }
          
            OneViewConsole.Debug("Load End", "PeriodicActionNCUIComponent.UpdateModel");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicActionNCUIComponent.UpdateModel", Excep);
        }
    }

    var LoadCustomActions = function (oActionNCConfig, TemplateNodeId) {

        try {
            OneViewConsole.Debug("LoadCustomActions Start", "PeriodicActionNCUIComponent.LoadCustomActions");

            var LVActionResult = CompletePeriodicActionResult[TemplateNodeId];

            if (LVActionResult != undefined) {

                if (LVActionResult[oActionNCConfig.RuleId] != undefined && LVActionResult[oActionNCConfig.RuleId].IsDisable == false) {
                    for (var i = 0; i < LVActionResult[oActionNCConfig.RuleId].Actions.length; i++) {
                        if (LVActionResult[oActionNCConfig.RuleId].Actions[i].IsDisable == false && LVActionResult[oActionNCConfig.RuleId].Actions[i].ActionType == LVActionType.CustomAction) {
                            $scope.CustomActions.push({ "RuleId": oActionNCConfig.RuleId, "label": LVActionResult[oActionNCConfig.RuleId].Actions[i].Name });
                        }
                    }
                }
            }

            OneViewConsole.Debug("LoadCustomActions End", "PeriodicActionNCUIComponent.LoadCustomActions");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicActionNCUIComponent.LoadCustomActions", Excep);
        }
    }

    var LoadActionMultimediaSubElements = function (oActionNCConfig, TemplateNodeId) {

        try {
            OneViewConsole.Debug("LoadActionMultimediaSubElements Start", "PeriodicActionNCUIComponent.LoadActionMultimediaSubElements");

            var LVActionResult = CompletePeriodicActionResult[TemplateNodeId];

            if (LVActionResult != undefined) {

                if (LVActionResult[oActionNCConfig.RuleId] != undefined && LVActionResult[oActionNCConfig.RuleId].IsDisable == false) {
                    if (LVActionResult[oActionNCConfig.RuleId].MultimediaSubElements.length == 0 && LVActionResult[oActionNCConfig.RuleId].ActionClientGuid != "") {
                        var _oActionDAO = new ActionDAO();
                        var MediaSubElements = _oActionDAO.GetAllMultiMediaSubElementsByActionClientGuid(LVActionResult[oActionNCConfig.RuleId].ActionClientGuid);
                        for (j = 0; j < MediaSubElements.length; j++) {
                            var Picture = {
                                "ClientId": MediaSubElements[j].Id,
                                "ClientGuid": MediaSubElements[j].ClientGuid,
                                "ServerId": MediaSubElements[j].ServerId,
                                "MappedEntityClientGuid": MediaSubElements[j].MappedEntityClientGuid,
                                "Dimension": MediaSubElements[j].Dimension,
                                "MultiMediaType": MediaSubElements[j].MultiMediaType,
                                "LocalURL": MediaSubElements[j].LocalURL,
                                "AlternateName": "No Image",
                                "Comments": MediaSubElements[j].Comments,
                                "IsDisabled": (MediaSubElements[j].IsDisabled == 'true') ? true : false,
                            }
                            $scope.ActionMultiMediaSubElements.push(Picture);
                            LVActionResult[oActionNCConfig.RuleId].MultimediaSubElements.push(Picture);
                        }
                    }
                    else {
                        for (var i = 0; i < LVActionResult[oActionNCConfig.RuleId].MultimediaSubElements.length; i++) {
                            if (LVActionResult[oActionNCConfig.RuleId].MultimediaSubElements[i].IsDisabled == false) {
                                $scope.ActionMultiMediaSubElements.push(LVActionResult[oActionNCConfig.RuleId].MultimediaSubElements[i]);
                            }
                        }
                    }
                    $scope.$apply();
                }
            }

            OneViewConsole.Debug("LoadActionMultimediaSubElements End", "PeriodicActionNCUIComponent.LoadActionMultimediaSubElements");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicActionNCUIComponent.LoadActionMultimediaSubElements", Excep);
        }
    }

    var GetHtml = function (TemplateNodeId, AttributeId, ControlId, DataCaptureClientGuid) {
        try {
            OneViewConsole.Debug("GetHtml Start", "PeriodicActionNCUIComponent.GetHtml");

            var Html = '';

            var TemplateNodeIds = "'" + ActionNCConfigList[0].TemplateNodeIds + "'";
                        
            var CustomHtml = '<div class="list">' +
                               '<div class="item item-divider item-icon-left">' +
                                   '<i class="icon icon-edit"></i> {{"Custom Actions" | xlat}}' +
                               '</div>' +
                               '<div class="item no-padding">' +
                                   '<div class="cus-action">' +
                                     '<div class="list no-margin">' +
                                       '<div class="item item-button-right" ng-repeat="CustomAction in CustomActions" style="text-overflow: inherit;white-space: normal;overflow: inherit;">' +
                                         '{{CustomAction.label}}' +
                                         '<a class="button button-clear hide" ng-click="DeleteCustomAction(CustomAction,' + TemplateNodeId + ')"><i class="icon icon-minus-circle"></i></a>' +
                                       '</div>' +
                                     '</div>' +
                                     '<div class="item item-input-inset">' +
                                       '<label class="item-input-wrapper"><textarea msd-elastic="/n/n" ng-model="CustomAction"></textarea></label>' +
                                       '<a class="button button-calm" ng-click="AddCustomAction(CustomAction,' + ActionNCConfigList[0].RuleId + ',' + ActionNCConfigList[0].IsNC + ',' + ActionNCConfigList[0].IsObservation + ',' + ActionNCConfigList[0].IsManual + ',' + TemplateNodeIds + ',' + TemplateNodeId + ')"><i class="icon icon-plus"></i> {{"Add" | xlat}}</a>' +
                                     '</div>' +
                                   '</div>' +
                               '</div>' +
                             '</div>';

            var MediaHtml = '<div class="list">' +
                                '<div class="item item-divider item-icon-left">' +
                                    '<i class="icon icon-photo"></i> {{"Add Media" | xlat}}' +
                                '</div>' +
                                '<div class="item">' +
                                    '<a class="button button-block button-calm no-margin" ng-click="AttachPictureToAction(' + ActionNCConfigList[0].RuleId + ',' + ActionNCConfigList[0].IsNC + ',' + ActionNCConfigList[0].IsObservation + ',' + ActionNCConfigList[0].IsManual + ',' + TemplateNodeId + ')"><i class="icon icon-camera"></i> {{"Camera" | xlat}}</a>' +
                                    '<div class="cam-photo">' +
                                        '<div ng-repeat="MultiMediaSubElement in ActionMultiMediaSubElements">' +
                                            '<a href="{{MultiMediaSubElement.LocalURL}}" class="angularbox" rel="' + Math.random() + '" id="' + ActionNCConfigList[0].RuleId + '"><img src="{{MultiMediaSubElement.LocalURL}}" alt="{{MultiMediaSubElement.AlternateName}}"></a>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>';

            
            if (ActionNCConfigList[0].IsCustomActionEnabled == true) {
                Html += CustomHtml;
            }
            Html += MediaHtml;
            //alert(Html);

            OneViewConsole.Debug("GetHtml End", "PeriodicActionNCUIComponent.GetHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicActionNCUIComponent.GetHtml", Excep);
        }
    }

    this.DeleteRule = function (TemplateNodeId, RuleId) {
        try {
            OneViewConsole.Debug("DeleteRule Start", "PeriodicActionNCUIComponent.DeleteRule");
            var LVActionResult = CompletePeriodicActionResult[TemplateNodeId];
          
            if (LVActionResult != undefined) {
                if (LVActionResult[RuleId] != undefined) {
                    if (LVActionResult[RuleId].DCNCMappingClientId == "") {
                        delete LVActionResult[RuleId];
                    }
                    else {
                        LVActionResult[RuleId].IsDisable = true;
                        LVActionResult[RuleId].IsNC = false;
                        for (var k = 0; k < LVActionResult[RuleId].Actions.length; k++) {
                            LVActionResult[RuleId].Actions[k].IsDisable = true;
                        }
                    }
                }
            }
       
            OneViewConsole.Debug("DeleteRule End", "PeriodicActionNCUIComponent.DeleteRule");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicActionNCUIComponent.DeleteRule", Excep);
        }
    }

    this.SnapRemoteClose = function () {
        try {
            OneViewConsole.Debug("SnapRemoteClose Start", "PeriodicActionNCUIComponent.SnapRemoteClose");
            
            var LVActionResult = CompletePeriodicActionResult[CurrentTemplateNodeId];
            
            if (LVActionResult != undefined) {

                var ActionResult = LVActionResult[CurrentRuleId];
               
                if (ActionResult != undefined) {

                    var IsActionAvailable = false;

                    if (ActionResult.IsDisable == false) {

                        for (var j = 0; j < ActionResult.Actions.length; j++) {

                            if (ActionResult.Actions[j].IsDisable == false) {

                                IsActionAvailable = true;
                                break;
                            }
                        }
                    }

                    if (IsActionAvailable == false) {
                        if (CompletePeriodicActionResult[CurrentTemplateNodeId] != undefined) {
                            // MyInstance.ClearRAGBand(CurrentTemplateNodeId, CurrentAttributeId);
                            var _oPeriodicDefaultAttributeComponent = new PeriodicDefaultAttributeComponent(CurrentTemplateNodeId, CurrentAttributeId);
                            _oPeriodicDefaultAttributeComponent.AttributeConfig = PTempMData[CurrentTemplateNodeId].TemplateConfigMetaDataDetails.Childs[0];
                            _oPeriodicDefaultAttributeComponent.Clear();
                        }
                    }
                }
                else {
                    if (CompletePeriodicActionResult[CurrentTemplateNodeId] != undefined) {
                        // MyInstance.ClearRAGBand(CurrentTemplateNodeId, CurrentAttributeId);
                        var _oPeriodicDefaultAttributeComponent = new PeriodicDefaultAttributeComponent(CurrentTemplateNodeId, CurrentAttributeId);
                        _oPeriodicDefaultAttributeComponent.AttributeConfig = PTempMData[CurrentTemplateNodeId].TemplateConfigMetaDataDetails.Childs[0];
                        _oPeriodicDefaultAttributeComponent.Clear();
                    }
                }
            }

            OneViewConsole.Debug("SnapRemoteClose End", "PeriodicActionNCUIComponent.SnapRemoteClose");
        }
        catch (Excep) {
            //alert('SnapRemoteClose Excep : ' + Excep);
            //alert('SnapRemoteClose Excep 22 : ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicActionNCUIComponent.SnapRemoteClose", Excep);
        }
    }

    this.ClearRAGBand = function (TemplateNodeId, AttributeId) {
        try {
            var ControlId = 'BandControlId_' + AttributeId;
            var LVTemplateResult = CompletePeriodicActionResult[TemplateNodeId].LVTemplateResult;

            //TODO:check old value and new value
            CompletePeriodicActionResult[TemplateNodeId].IsUpdated = true;


            //Band make it null
            LVTemplateResult[AttributeId].Answers[0].Answer = '';

            //Band Answer value make it null
            LVTemplateResult[AttributeId].Answers[0].AnswerValue = '';

            //If any blocker make it false
            CompletePeriodicActionResult[TemplateNodeId].IsBlocker = false;

            //IsCompleted make it false
            CompletePeriodicActionResult[TemplateNodeId].IsCompleted = false;

            //IsCompleted make it false
            CompletePeriodicActionResult[TemplateNodeId].IsSubmit = false;


            //Clear Controls
            //Clear band Controls
            var RBand = document.getElementById("R_" + ControlId);
            if (RBand != null) {
                RBand.style.backgroundColor = "";
                RBand.style.color = "black";
            }

            var ABand = document.getElementById("A_" + ControlId);
            if (ABand != null) {
                ABand.style.backgroundColor = "";
                ABand.style.color = "black";
            }

            var GBand = document.getElementById("G_" + ControlId);
            if (GBand != null) {
                GBand.style.backgroundColor = "";
                GBand.style.color = "black";
            }

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ExpressComponent.ClearRAGBand", Excep);
        }
    }

    this.EvaluateActionNCStatus = function (TemplateNodeId, AttributeId) {
        try {
            var IsRuleViolated = false;

            var _oCPActionNCComponent = new CPActionNCComponent($scope, '', '', xlatService);
            var ActionNCList = _oCPActionNCComponent.GetActionNCStatus(AttributeId, false);

            ActionNCConfigList.push(ActionNCList[0].ActionNCConfigSetting);
           
            //for (var i = 0; i < ActionNCList.length; i++) {
            if (ActionNCConfigList[0].IsManual == true) {
                IsRuleViolated = ActionNCList[0].IsRuleViolated;
            }
            // }

            return IsRuleViolated;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ExpressComponent.ClearRAGBand", Excep);
        }
    }

    var CreateNCModel = function (TemplateNodeId, AttributeId, ControlId) {

        try {
            OneViewConsole.Debug("CreateNCModel Start", "PeriodicActionNCUIComponent.CreateNCModel");

            var IsSuccess = false;

            var LVTemplateResult = CompletePeriodicTemplateResult[TemplateNodeId].LVTemplateResult;
            var oAttribute = LVTemplateResult[AttributeId];

            if (oAttribute != undefined) {

                if (oAttribute.Answers.length > 1) {
                    if ((oAttribute.Answers[1].AnswerMode == "DCListViewControlConfig" && oAttribute.Answers[1].Answer == "") || (oAttribute.Answers[0].AnswerMode == "DCListViewControlConfig" && oAttribute.Answers[0].Answer == "")) { // Need to change
                        return false;
                    }
                    else {
                        Model[oAttribute.Answers[0].ControlId] = oAttribute.Answers[0].Answer;
                        Model[oAttribute.Answers[1].ControlId] = oAttribute.Answers[1].Answer;
                    }
                }
                else {
                    if (oAttribute.Answers[0].Answer == "") { // Need to change
                        return false;
                    }
                    else {
                        Model[oAttribute.Answers[0].ControlId] = oAttribute.Answers[0].Answer;
                    }
                }

            }

            OneViewConsole.Debug("CreateNCModel End", "PeriodicActionNCUIComponent.CreateNCModel");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicActionNCUIComponent.CreateNCModel", Excep);
        }
    }

    var GetActionNCConfig = function (TemplateId, AttributeId) {

        try {
            OneViewConsole.Debug("GetActionNCConfig Start", "PeriodicActionNCUIComponent.GetActionNCConfig");

            var oActionNCConfig = new Array();
            var ActionNCProfile = CompletePeriodicActionNCProfileDict[TemplateId];
            
            if (ActionNCProfile != undefined) {
                var AttributeWiseActionNCConfigList = CheckAttributeActionNCConfig(ActionNCProfile, TemplateId, AttributeId);
                var MultipleAttributeActionNCConfigList = CheckMultipleAttributeActionNCConfig(ActionNCProfile, TemplateId, AttributeId);

                if (AttributeWiseActionNCConfigList.length > 0 && MultipleAttributeActionNCConfigList.length == 0) {
                    oActionNCConfig = AttributeWiseActionNCConfigList;
                }

                else if (AttributeWiseActionNCConfigList.length == 0 && MultipleAttributeActionNCConfigList.length > 0) {
                    oActionNCConfig = MultipleAttributeActionNCConfigList;
                }

                else if (AttributeWiseActionNCConfigList.length > 0 && MultipleAttributeActionNCConfigList.length > 0) {
                    oActionNCConfig.concat(AttributeWiseActionNCConfigList, MultipleAttributeActionNCConfigList)
                }
            }
            OneViewConsole.Debug("GetActionNCConfig End", "PeriodicActionNCUIComponent.GetActionNCConfig");

            return oActionNCConfig;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicActionNCUIComponent.GetActionNCConfig", Excep);
        }
    }

    var CheckAttributeActionNCConfig = function (ActionNCProfile, TemplateId, AttributeId) {

        try {
            OneViewConsole.Debug("CheckAttributeActionNCConfig Start", "PeriodicActionNCUIComponent.CheckAttributeActionNCConfig");

            var AttributeWiseActionNCConfigList = ActionNCProfile.AttributeWiseActionNCConfig[AttributeId];

            if (AttributeWiseActionNCConfigList == undefined) {
                AttributeWiseActionNCConfigList = new Array();
            }
            else {
                for (var i = 0; i < AttributeWiseActionNCConfigList.length; i++) {
                    AttributeWiseActionNCConfigList[i].TemplateNodeIds = "," + AttributeId + ",";
                    AttributeWiseActionNCConfigList[i]['IsRuleViolated'] = ValidateRule(AttributeWiseActionNCConfigList[i].FinalJavaScriptEquation, TemplateId, AttributeId);
                }
            }

            OneViewConsole.Debug("CheckAttributeActionNCConfig End", "PeriodicActionNCUIComponent.CheckAttributeActionNCConfig");

            return AttributeWiseActionNCConfigList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicActionNCUIComponent.CheckAttributeActionNCConfig", Excep);
        }
    }


    /// <summary>
    /// Get NA html
    /// </summary>
    /// <param name="AttributeNodeIds">Node id of the attribute</param>
    /// <returns>ActionNCConfig</returns>
    var CheckMultipleAttributeActionNCConfig = function (ActionNCProfile, TemplateId, AttributeId) {

        try {
            OneViewConsole.Debug("CheckMultipleAttributeActionNCConfig Start", "PeriodicActionNCUIComponent.CheckMultipleAttributeActionNCConfig");

            var MultipleAttributeActionNCConfigList = new Array();
            var MultipleAttributeActionNCConfigDict = ActionNCProfile.MultipleAttributeActionNCConfig;

            var IsSuccess = false;

            for (var irtMultipleAttributeActionNCConfigDict in MultipleAttributeActionNCConfigDict) {

                var AttributeKeys = irtMultipleAttributeActionNCConfigDict.split(':');
                var TemplateNodeIds = irtMultipleAttributeActionNCConfigDict.replace(/:/g, ",");

                for (var i = 0; i < AttributeKeys.length; i++) {
                    if (AttributeKeys[i] == AttributeId) {
                        MultipleAttributeActionNCConfigList = MultipleAttributeActionNCConfigDict[irtMultipleAttributeActionNCConfigDict];
                        if (MultipleAttributeActionNCConfigList == undefined) {
                            MultipleAttributeActionNCConfigList = new Array();
                        }
                        else {
                            for (var i = 0; i < MultipleAttributeActionNCConfigList.length; i++) {
                                MultipleAttributeActionNCConfigList[i].TemplateNodeIds = "," + TemplateNodeIds + ",";
                                MultipleAttributeActionNCConfigList[i]['IsRuleViolated'] = ValidateRule(MultipleAttributeActionNCConfigList[i].FinalJavaScriptEquation, TemplateId, AttributeId);
                            }
                        }
                        IsSuccess = true;
                        break;
                    }
                }
            }

            OneViewConsole.Debug("CheckMultipleAttributeActionNCConfig End", "PeriodicActionNCUIComponent.CheckMultipleAttributeActionNCConfig");

            return MultipleAttributeActionNCConfigList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicActionNCUIComponent.CheckMultipleAttributeActionNCConfig", Excep);
        }
    }


    /// <summary>
    /// Validate Rule
    /// </summary>
    /// <param name="Rule">Rule</param>
    /// <returns>true or false</returns>
    var ValidateRule = function (Rule, TemplateId, AttributeId) {

        try {
            OneViewConsole.Debug("ValidateRule Start", "PeriodicActionNCUIComponent.ValidateRule");

            var IsSuccess = false;
            var Model = {};
            var LVTemplateResult = CompletePeriodicTemplateResult[TemplateId].LVTemplateResult;
            var oAttribute = LVTemplateResult[AttributeId];

            if (oAttribute != undefined) {

                //for (var i = 0; i < oAttribute.Answers.length; i++) {
                //    if (oAttribute.Answers[i].Answer == "") { // Need to change
                //        return false;
                //    }
                //    else {
                //        Model[oAttribute.Answers[i].ControlId] = oAttribute.Answers[i].Answer;
                //    }
                //}
                if (oAttribute.Answers.length > 1) {
                    //if ((oAttribute.Answers[1].AnswerMode == "DCListViewControlConfig" && oAttribute.Answers[1].Answer == "") || (oAttribute.Answers[0].AnswerMode == "DCListViewControlConfig" && oAttribute.Answers[0].Answer == "")) { // Need to change
                    //    return false;
                    //}
                    //else {
                    //    Model[oAttribute.Answers[0].ControlId] = oAttribute.Answers[0].Answer;
                    //    Model[oAttribute.Answers[1].ControlId] = oAttribute.Answers[1].Answer;
                    //}

                    for (var i = 0; i < oAttribute.Answers.length ; i++) {
                        if (oAttribute.Answers[i].Answer != "") {
                            Model[oAttribute.Answers[i].ControlId] = oAttribute.Answers[i].Answer;
                        }
                    }
                }
                else {
                    if (oAttribute.Answers[0].Answer == "") { // Need to change
                        return false;
                    }
                    else {
                        Model[oAttribute.Answers[0].ControlId] = oAttribute.Answers[0].Answer;
                    }
                }
                if (Object.keys(Model).length > 0) {
                    Rule = Rule.replace(/#/g, "'");
                    IsSuccess = eval(Rule);
                }
            }

            OneViewConsole.Debug("ValidateRule End", "PeriodicActionNCUIComponent.ValidateRule");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicActionNCUIComponent.ValidateRule", Excep);
        }
    }

    
}

// PeriodicLVDataCaptureBO
function PeriodicLVDataCaptureBO() {

    var MyInstance = this;

    var oLVFactory = new LVFactory();
    this.AttributeGroupComponentKey = "LVDefaultAttributeGroupComponent";
    this.VallidationHandler = "LVDefaultVallidationHandler";
    this.AnswerModeComponentKey = "LVDefaultAnswerModeComponent";
    this.DefaultNotificationKey = "DefaultJavaScriptAlert";
    this.LVDefaultNotificationComponentKey = "LVDefaultNotificationComponent";

    var oAnswerModeComponent = oLVFactory.GetAnswerModeComponent(MyInstance.AnswerModeComponentKey);

    this.IsValidationSuccess = function (LVTemplateResult) {

        try {
            OneViewConsole.Debug("IsValidationSuccess Start", "LVDataCaptureBO.IsValidationSuccess");

            //IsSuccess = false;
            //if (Object.keys(LVTemplateResult).length > 0) {
            //    IsSuccess = true;
            //}

            var Response = { IsSaveValidationSuccess: false, IsSubmitValidationSuccess: false };

            if (LVTemplateResult != null && Object.keys(LVTemplateResult).length > 0) {

                var VallidationHandler = oLVFactory.GetDefaultVallidationHandler(MyInstance.VallidationHandler);
                var ValidationResponse = VallidationHandler.Validate({ "LVTemplateResult": LVTemplateResult, "Operation": "SaveValidationMetaData", "xlatService": oXlatService });
                Response.IsSaveValidationSuccess = ValidationResponse.IsSuccess;

                //alert(JSON.stringify(ValidationResponse));

                if (ValidationResponse.IsSuccess == true) {
                    ValidationResponse = VallidationHandler.Validate({ "LVTemplateResult": LVTemplateResult, "Operation": "SubmitValidationMetaData", "xlatService": oXlatService });
                    Response.IsSubmitValidationSuccess = ValidationResponse.IsSuccess;
                }
                else {
                    var _oLVFactory = new LVFactory();
                    var _oNotificationComponent = _oLVFactory.GetNotificationComponent(MyInstance.LVDefaultNotificationComponentKey);
                    _oNotificationComponent.Notify(ValidationResponse.ErrorMessage, MyInstance.DefaultNotificationKey);
                }

                //alert(JSON.stringify(ValidationResponse));
            }
            else {
                alert("IN-SU-LVI-003 :: Perform data capture for atleast 1 attribute to save record");
            }

            OneViewConsole.Debug("IsValidationSuccess End", "LVDataCaptureBO.IsValidationSuccess");

            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Factory", "LVDataCaptureBO.IsValidationSuccess", Excep);
        }
    }

    this.Update = function (LVTemplateResult, LVDataCaptureId, LVDcResultsId, LVIsEdit, IsVallidationSuccess, LVDCSummary, IsSubmit, MultiMediaSubElementsAnswerModeDict) {

        try {
            OneViewConsole.Debug("Update Start", "LVDataCaptureBO.Update");

            var DataCaptureRequest = MakeGetCompleteDataCaptureRequest(LVDcStartDate);

            if (LVDcResultsId == 0) {

                var oDcResultsEntity = GetDcResultsEntity(DataCaptureRequest, LVDCSummary);
                oDcResultsEntity.DataCaptureId = LVDataCaptureId;

                var oDefaultMasterDAO = new DefaultMasterDAO("DcResultsEntity");
                var oResultDcResultsEntity = oDefaultMasterDAO.CreateMaster(oDcResultsEntity);

                LVDcResultsId = oResultDcResultsEntity.Id;
                LVDcResultsClientGuid = oResultDcResultsEntity.ClientGuid;
            }

            //alert(JSON.stringify(LVTemplateResult));
            var IsSuccess = true;

            var _DateTime = new DateTime();
            var CurrenntDateAndTime = _DateTime.GetDateAndTime();

            var _oOneViewGeolocationPlugin = new OneViewGeolocationPlugin();
            var IsGeolocationSuccess = _oOneViewGeolocationPlugin.CheckGeolocation();
            var Latitude = "";
            var Longitude = "";

            if (IsGeolocationSuccess == true) {
                var GeolocationInfo = _oOneViewGeolocationPlugin.GetLatitudeAndLongitude();
                if (GeolocationInfo.IsAnyException == false) {
                    Latitude = GeolocationInfo.Latitude;
                    Longitude = GeolocationInfo.Longitude;
                }
            }

            var _oOneViewSqlitePlugin = new OneViewSqlitePlugin();

            try {
                _oOneViewSqlitePlugin.StartTransaction();

                var oDefaultMasterDAO = new DefaultMasterDAO("DcResultDetailsEntity");
                var DcResultDetailsEntityCount = oDefaultMasterDAO.Count();

                var Result = { DcResultsId: LVDcResultsId, DcResultsClientGuid: LVDcResultsClientGuid, IsSuccess: true, DcResultDetails: {}, 'CreatedMultiMediaSubElementsAnswerModeList': null };

                var CreatedMultiMediaSubElementsAnswerModeList;
                var DCSummary = null;
                if (LVTemplateConfigMetaData != null) {
                    DCSummary = GetDCSummary();
                }
                for (var itrAttributes in LVTemplateResult) {

                    var DataCaptureRequest = MakeGetCompleteDataCaptureRequest(LVDcStartDate);
                    var AttributeNodeId = LVTemplateResult[itrAttributes].Id;
                    var AttributeNodeName = LVTemplateResult[itrAttributes].Name;
                    var Comments = LVTemplateResult[itrAttributes].Comments;
                    var IsNA = LVTemplateResult[itrAttributes].NA;
                    var IsBlocker = LVTemplateResult[itrAttributes].IsBlocker;
                    var ESTTime = LVTemplateResult[itrAttributes].ESTTime;
                    var ActualTime = LVTemplateResult[itrAttributes].ActualTime;
                    var IsManualESTEnabled = LVTemplateResult[itrAttributes].IsManualESTEnabled;

                    var oAnswers = LVTemplateResult[itrAttributes].Answers;

                    //alert(JSON.stringify(LVTemplateResult[itrAttributes]));
                   
                    for (var i = 0; i < oAnswers.length; i++) {

                        //alert(JSON.stringify(oAnswers[i]));
                      
                        if (oAnswers[i].ClientId != "" && oAnswers[i].IsModified == true) {

                            var Query = "UPDATE DcResultDetailsEntity SET Answer='" + oAnswers[i].Answer + "',AnswerValue='" + oAnswers[i].AnswerValue + "' ,IsSynchronized='false',LastUpdatedDate ='" + CurrenntDateAndTime +
                                "',Comments = '" + Comments + "',IsNA = '" + IsNA + "',IsBlocker = '" + IsBlocker + "',Score = " + oAnswers[i].Score + ",MaxScore=" + oAnswers[i].MaxScore + ",Percentage=" + oAnswers[i].Percentage + ",CompletedChildCount=" + oAnswers[i].CompletedChildCount +
                                ",TotalChildCount=" + oAnswers[i].TotalChildCount + ",CompletedAttributeCount=" + oAnswers[i].CompletedAttributeCount + ",TotalAttributeCount=" + oAnswers[i].TotalAttributeCount + ",TimeStamp = '" + CurrenntDateAndTime +
                                "',ESTTime=" + ESTTime + ",ActualTime=" + ActualTime + ",IsManualESTEnabled='" + IsManualESTEnabled +
                                "',Latitude = '" + Latitude + "',Longitude = '" + Longitude + "' WHERE Id=" + oAnswers[i].ClientId;
                            //alert(Query);
                            window.OneViewSqlite.excecuteSql(Query);
                            oAnswers[i].IsModified = false;

                            var LocalDcResultDetails = { 'Id': oAnswers[i].ClientId, 'ClientGuid': oAnswers[i].ClientGuid, 'ControlId': oAnswers[i].ControlId };
                            
                            Result.CreatedMultiMediaSubElementsAnswerModeList = UpdateMultiMediaSubElementsAnswerMode(AttributeNodeId, LocalDcResultDetails, MultiMediaSubElementsAnswerModeDict);
                        }
                        else if (oAnswers[i].ClientId == "" && oAnswers[i].IsModified == true) {

                            var oAnswerMode = oAnswers[i];
                            var DcResultDetailsEntity = GetDcResultDetailsEntity(DataCaptureRequest, AttributeNodeId, AttributeNodeName, Comments, oAnswerMode, Latitude, Longitude, IsNA, IsBlocker, ESTTime, ActualTime, IsManualESTEnabled);

                            DcResultDetailsEntity.DataCaptureId = LVDataCaptureId;
                            DcResultDetailsEntity.DataResultsId = LVDcResultsId;

                            var oDcResultDetails = oDefaultMasterDAO.Create(DcResultDetailsEntity, DcResultDetailsEntityCount);
                            Result.DcResultDetails[oDcResultDetails.ControlId] = { "ClientId": oDcResultDetails.Id };

                            DcResultDetailsEntityCount += 1;
                            
                            Result.CreatedMultiMediaSubElementsAnswerModeList = UpdateMultiMediaSubElementsAnswerMode(AttributeNodeId, oDcResultDetails, MultiMediaSubElementsAnswerModeDict);

                            //alert(JSON.stringify(DcResultDetailsEntity));
                        }
                    }
                }

                var _ActionDAO = new ActionDAO();

                var Actions = {};
                var IsNC = false;

                for (var itrLVActionResult in LVActionResult) {
                    if (LVActionResult[itrLVActionResult].IsNC == true) {
                        IsNC = true;
                    }
                    //alert(JSON.stringify(LVActionResult[itrLVActionResult]));
                    if (LVActionResult[itrLVActionResult].DCNCMappingClientId == "") {
                        var oAction = GetAction(DataCaptureRequest, LVDataCaptureClientGuid, LVDcResultsClientGuid, itrLVActionResult, "", LVActionResult[itrLVActionResult]);
                        Actions[itrLVActionResult] = oAction;
                        //alert(JSON.stringify(oAction));
                    }
                    else if (LVActionResult[itrLVActionResult].IsDisable == true) {
                        //alert("DCNCMapping : " + LVActionResult[itrLVActionResult].IsDisable + ", RuleId : " + itrLVActionResult + ", DNNCMappimgServerId : " + LVActionResult[itrLVActionResult].DNNCMappimgServerId);
                        if (LVActionResult[itrLVActionResult].DNNCMappimgServerId == 0) {
                            _ActionDAO.DeleteAction(LVDataCaptureClientGuid, itrLVActionResult);
                        }
                        else {
                            //alert("Disable action");
                            _ActionDAO.DisableAction(LVDataCaptureClientGuid, itrLVActionResult);
                        }
                        delete LVActionResult[itrLVActionResult];
                    }
                    else {
                        var DeletedActionIndexLst = [];
                        for (var i = 0; i < LVActionResult[itrLVActionResult].Actions.length; i++) {
                            //alert("ActionsDetails : " + JSON.stringify(LVActionResult[itrLVActionResult].Actions[i]));
                            if (LVActionResult[itrLVActionResult].Actions[i].IsDisable == true) {
                                if (LVActionResult[itrLVActionResult].Actions[i].ActionDetailsServerId == 0) {
                                    _ActionDAO.DeleteActionDetails(LVActionResult[itrLVActionResult].Actions[i].ActionDetailsClientId);
                                }
                                else {
                                    _ActionDAO.DisableActionDetails(LVActionResult[itrLVActionResult].Actions[i].ActionDetailsClientId, LVDataCaptureClientGuid, itrLVActionResult);
                                }
                                //LVActionResult[itrLVActionResult].Actions.splice(i, 1);
                                DeletedActionIndexLst.push(i);
                            }
                            else if (LVActionResult[itrLVActionResult].Actions[i].ActionDetailsClientId == "") {
                                //alert(JSON.stringify(LVActionResult[itrLVActionResult].Actions[i]));
                                var _oActionDetailsEntity = GetActionDetailsEntity(DataCaptureRequest, LVActionResult[itrLVActionResult].ActionClientGuid, "", LVActionResult[itrLVActionResult].Actions[i]);
                                //alert(JSON.stringify(_oActionDetailsEntity));

                                var _oActionDetailsDAO = new DefaultMasterDAO("ActionDetailsEntity");
                                _oActionDetailsEntity = _oActionDetailsDAO.CreateMaster(_oActionDetailsEntity);

                                _ActionDAO.UpdateSyncStatusForDCNCMappingAndAction(LVDataCaptureClientGuid, itrLVActionResult);

                                LVActionResult[itrLVActionResult].Actions[i].ActionDetailsClientId = _oActionDetailsEntity.Id;

                                //alert(JSON.stringify(LVActionResult[itrLVActionResult]));
                            }
                        }
                        for (var i = 0; i < DeletedActionIndexLst.length; i++) {
                            LVActionResult[itrLVActionResult].Actions.splice(DeletedActionIndexLst[i], 1);
                        }
                        var DeletedMultimediaSubElements = [];
                        for (var j = 0; j < LVActionResult[itrLVActionResult].MultimediaSubElements.length; j++) {
                            if (LVActionResult[itrLVActionResult].MultimediaSubElements[j].IsDisabled == true) {
                                if (LVActionResult[itrLVActionResult].MultimediaSubElements[j].ServerId == 0) {
                                    _ActionDAO.DeleteMultiMediaSubElements(LVActionResult[itrLVActionResult].MultimediaSubElements[j].ClientId);
                                }
                                else {
                                    _ActionDAO.DisableMultiMediaSubElements(LVActionResult[itrLVActionResult].MultimediaSubElements[j].ClientId, LVDataCaptureClientGuid, itrLVActionResult);
                                }
                                //LVActionResult[itrLVActionResult].MultimediaSubElements.splice(j, 1);
                                DeletedMultimediaSubElements.push(j);
                            }
                            else if (LVActionResult[itrLVActionResult].MultimediaSubElements[j].ClientId == "") {
                                LVActionResult[itrLVActionResult].MultimediaSubElements[j].MappedEntityClientGuid = LVActionResult[itrLVActionResult].ActionClientGuid;
                                var _oMultiMediaSubElements = GetMultiMediaSubElement(DataCaptureRequest, LVActionResult[itrLVActionResult].MultimediaSubElements[j]);

                                var _oMultiMediaSubElementsDAO = new DefaultMasterDAO("MultiMediaSubElements");
                                _oMultiMediaSubElements = _oMultiMediaSubElementsDAO.CreateMaster(_oMultiMediaSubElements);

                                _ActionDAO.UpdateSyncStatusForDCNCMappingAndAction(LVDataCaptureClientGuid, itrLVActionResult);

                                LVActionResult[itrLVActionResult].MultimediaSubElements[j].ClientId = _oMultiMediaSubElements.Id;
                                LVActionResult[itrLVActionResult].MultimediaSubElements[j].ClientGuid = _oMultiMediaSubElements.ClientGuid;
                            }
                        }
                        for (var j = 0; j < DeletedMultimediaSubElements.length; j++) {
                            LVActionResult[itrLVActionResult].MultimediaSubElements.splice(DeletedMultimediaSubElements[j], 1);
                        }
                    }
                }

                if (JSON.stringify(Actions) != '{}') {
                    var ActionInfo = _ActionDAO.CreateActions(Actions);

                    var Key;
                    for (var itrLVActionResult in LVActionResult) {
                        if (ActionInfo[itrLVActionResult] != undefined) {
                            LVActionResult[itrLVActionResult].ActionClientId = ActionInfo[itrLVActionResult].ActionClientId;
                            LVActionResult[itrLVActionResult].ActionClientGuid = ActionInfo[itrLVActionResult].ActionClientGuid;
                            LVActionResult[itrLVActionResult].DCNCMappingClientId = ActionInfo[itrLVActionResult].DCNCMappingClientId;
                            for (var i = 0; i < LVActionResult[itrLVActionResult].Actions.length; i++) {
                                if (LVActionResult[itrLVActionResult].Actions[i].ActionType == LVActionType.CustomAction) {
                                    Key = LVActionResult[itrLVActionResult].Actions[i].Name;
                                }
                                else if (LVActionResult[itrLVActionResult].Actions[i].ActionType == LVActionType.PredefinedAction) {
                                    Key = LVActionResult[itrLVActionResult].Actions[i].PreDefinedActionId;
                                }
                                LVActionResult[itrLVActionResult].Actions[i].ActionDetailsClientId = ActionInfo[itrLVActionResult].ActionDetails[Key].ActionDetailsClientId;
                            }
                            for (var j = 0; j < LVActionResult[itrLVActionResult].MultimediaSubElements.length; j++) {
                                LVActionResult[itrLVActionResult].MultimediaSubElements[j].ClientId = ActionInfo[itrLVActionResult].MultiMediaSubElements[LVActionResult[itrLVActionResult].MultimediaSubElements[j].LocalURL].ClientId;
                                LVActionResult[itrLVActionResult].MultimediaSubElements[j].ClientGuid = ActionInfo[itrLVActionResult].MultiMediaSubElements[LVActionResult[itrLVActionResult].MultimediaSubElements[j].LocalURL].ClientGuid;
                            }
                        }
                    }
                }
               
                var IsBlocker = false;
                ///update blocker status
                if (LVDCSummary.IsBlocker != undefined)
                    IsBlocker = LVDCSummary.IsBlocker;

                var DataCaptureUpdateQuery = "UPDATE DataCaptureEntity SET IsSynchronized='false',TimeStamp = '" + CurrenntDateAndTime + "',IsAnyNC = '" + IsNC + "',IsBlocker = '" + IsBlocker + "',IsCompleted = '" + IsVallidationSuccess +
                    "' WHERE Id=" + LVDataCaptureId;
                window.OneViewSqlite.excecuteSql(DataCaptureUpdateQuery);

                var DcComments = (LVDCSummary.CommentsInfo.IsModified == true) ? LVDCSummary.CommentsInfo.Comments : "";

                var DCResultsUpdateQuery = "UPDATE DcResultsEntity SET IsSynchronized='false',TimeStamp = '" + CurrenntDateAndTime + "',LastUpdatedDate = '" + CurrenntDateAndTime + "',Comments = '" + DcComments +
                    "',ShiftId = " + DataCaptureRequest.ShiftId + ",ShiftName = '" + DataCaptureRequest.ShiftName + "' WHERE Id=" + LVDcResultsId;
                window.OneViewSqlite.excecuteSql(DCResultsUpdateQuery);

                SaveDCBlockers(LVDcStartDate);

                var IsCompleted = IsVallidationSuccess;
                if (DCSummary != null) {
                    if (IsVallidationSuccess == false) {
                        IsCompleted = (DCSummary.CompletedCount == DCSummary.TotalCount) ? true : false;
                    }
                }
                var _oDasboardBO = new DasboardBO(LVscope, '', oXlatService, '', '', '', '');
                _oDasboardBO.UpdateTaskStatus_EditDC(IsCompleted);

                if (DCSummary != null) {
                    UpdateScore(LVDataCaptureId, LVDcResultsId, DCSummary, false, IsVallidationSuccess, IsSubmit);
                }
                UpdateCompletedAndSubmitStatus(LVDataCaptureId, IsVallidationSuccess, IsSubmit);
                         

                _oOneViewSqlitePlugin.EndTransaction();
            }
            catch (Excep) {
                //alert(Excep);
                //alert(JSON.stringify(Excep));
                Result.IsSuccess = false;
                Result.DcResultDetails = null;
                _oOneViewSqlitePlugin.Rollback();
            }

            OneViewConsole.Debug("Update End", "LVDataCaptureBO.Update");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.Update", Excep);
        }
        finally {
            IsSuccess = null;
            _DateTime = null;
            CurrenntDateAndTime = null;
            _oOneViewSqlitePlugin = null;
            DataCaptureRequest = null;
            AttributeNodeId = null;
            AttributeNodeName = null;
            Comments = null;
            oAnswers = null;
        }
    }

    this.Save = function (LVTemplateResult, LVDcStartDate, IsVallidationSuccess, LVDCSummary, IsSubmit, MultiMediaSubElementsAnswerModeDict) {

        try {
            OneViewConsole.Debug("Save Start", "LVDataCaptureBO.Save");
            
            var IsDcSaveSuccess = false;
            var IsActionSaveSuccess = true;
            var DCSummary = null;
            if (LVTemplateConfigMetaData != null) {
                DCSummary = GetDCSummary();
            }

            var oDataCaptureAndActionEntity = GetCompleteDataCaptureAndActionEntity(LVTemplateResult, LVDcStartDate, LVDCSummary);


            var oDataCaptureEntity = oDataCaptureAndActionEntity.oDataCaptureEntity;
            oDataCaptureEntity.IsCompleted = IsVallidationSuccess;
            var Actions = oDataCaptureAndActionEntity.Actions;

            var _oDcDAO = new DcDAO();
            var _oActionDAO = new ActionDAO();

            var _oOneViewSqlitePlugin = new OneViewSqlitePlugin();

            try {
                _oOneViewSqlitePlugin.StartTransaction();

                var DcInfo = _oDcDAO.CreateAndReturn(oDataCaptureEntity, false);

                IsDcSaveSuccess = (DcInfo != null) ? true : false;
                
                var CreatedMultiMediaSubElementsAnswerModeList = CreateMultiMediaSubElementsAnswerMode(oDataCaptureEntity, MultiMediaSubElementsAnswerModeDict);

                var IsMultiMediaSubElementsAnswerModeSuccess = (CreatedMultiMediaSubElementsAnswerModeList != null ? true : false);
               
                var AttributeActionInfo = null;

                if (JSON.stringify(Actions) != '{}') {
                    AttributeActionInfo = _oActionDAO.CreateActions(Actions);
                    IsActionSaveSuccess = (AttributeActionInfo != null) ? true : false;
                }

                if (DcInfo != null && DcInfo != "" && DcInfo != undefined) {

                    LVDataCaptureId = DcInfo.DcId;
                    LVDcResultsId = DcInfo.DcResultsId;

                    SaveDCBlockers(LVDcStartDate);

                    if (DCSummary != null) {
                        UpdateScore(LVDataCaptureId, LVDcResultsId, DCSummary, true, IsVallidationSuccess, IsSubmit);
                    }
                    UpdateCompletedAndSubmitStatus(LVDataCaptureId, IsVallidationSuccess, IsSubmit);
                }

                var _oDasboardBO = new DasboardBO(LVscope, '', oXlatService, '', '', '', '');
                _oDasboardBO.UpdateTaskStatus_NewDC((OneViewSessionStorage.Get("IsDcCompletedBeforeEdit") == "true") ? true : false);

                _oOneViewSqlitePlugin.EndTransaction();

                if (IsDcSaveSuccess == false || IsActionSaveSuccess == false || IsMultiMediaSubElementsAnswerModeSuccess ==false) {
                    _oOneViewSqlitePlugin.Rollback();
                }
            }
            catch (Excep) {
                //alert(Excep);
                //alert(JSON.stringify(Excep));
                DcInfo = null;
                AttributeActionInfo = null;
                CreatedMultiMediaSubElementsAnswerModeList = null;
                _oOneViewSqlitePlugin.Rollback();
            }

            OneViewConsole.Debug("Save End", "LVDataCaptureBO.Save");

            return { "DcInfo": DcInfo, "AttributeActionInfo": AttributeActionInfo, "CreatedMultiMediaSubElementsAnswerModeList": CreatedMultiMediaSubElementsAnswerModeList };
        }
        catch (Excep) {

            return { "DcInfo": null, "AttributeActionInfo": null, "CreatedMultiMediaSubElementsAnswerModeList": null };
        }
        finally {
            IsSaveSuccess = null;
            oDataCaptureEntity = null;
            _oDcDAO = null;
            _oOneViewSqlitePlugin = null;
            IsSuccess = null;
        }
    }

    var CreateMultiMediaSubElementsAnswerMode = function (oDataCaptureEntity, MultiMediaSubElementsAnswerModeDict) {

        try {
            OneViewConsole.Debug("CreateMultiMediaSubElementsAnswerMode Start", "LVDataCaptureBO.CreateMultiMediaSubElementsAnswerMode");
           
            var CreatedMultiMediaSubElementsAnswerModeList = [];

            var _oPlatformPeriodicsDcMultimediaHandler = new PlatformPeriodicsDcMultimediaHandler();

            for (var AttributeNodeId in MultiMediaSubElementsAnswerModeDict) {
                var ControlWiseMultiMediaSubElementsAnswerModeDict = MultiMediaSubElementsAnswerModeDict[AttributeNodeId];
                for (var ControlId in ControlWiseMultiMediaSubElementsAnswerModeDict) {
                    var MultiMediaSubElementsList = ControlWiseMultiMediaSubElementsAnswerModeDict[ControlId];

                    for (var i = 0; i < oDataCaptureEntity.DcResultsEntitylist[0].DcResultDetailsEntityList.length ; i++) {
                        var DcResultDetail = oDataCaptureEntity.DcResultsEntitylist[0].DcResultDetailsEntityList[i];
                        if (AttributeNodeId == DcResultDetail.AttributeNodeId && ControlId == DcResultDetail.ControlId) {
                            ModifyMultiMediaSubElementsAnswerMode(DcResultDetail, MultiMediaSubElementsList, CreatedMultiMediaSubElementsAnswerModeList, _oPlatformPeriodicsDcMultimediaHandler);
                            //for (var j = 0; j < MultiMediaSubElementsList.length; j++) {
                            //    var MultiMediaSubElements = MultiMediaSubElementsList[j];
                            //    if (MultiMediaSubElements.IsDisabled == true) {
                            //        _oPlatformPeriodicsDcMultimediaHandler.Update(MultiMediaSubElements);
                            //    }
                            //    else {
                            //        var LocalMultiMediaSubElements = _oPlatformPeriodicsDcMultimediaHandler.Get(DcResultDetail.ClientGuid, DATEntityType.DCResultDetails);
                            //        if (LocalMultiMediaSubElements != null && LocalMultiMediaSubElements.length == 1) {
                            //            //update
                            //            MultiMediaSubElements.Id = LocalMultiMediaSubElements[0].Id;
                            //            MultiMediaSubElements.ServerId = (LocalMultiMediaSubElements[0].ServerId != "INT" ? LocalMultiMediaSubElements[0].ServerId : 0);
                            //            _oPlatformPeriodicsDcMultimediaHandler.UpdateMultiMedia(MultiMediaSubElements);
                            //            CreatedMultiMediaSubElementsAnswerModeList.push(MultiMediaSubElements);
                            //        }
                            //        else {
                            //            //create
                            //            MultiMediaSubElements.MappedEntityClientGuid = DcResultDetail.ClientGuid;
                            //            var CreatedMultiMediaSubElements = _oPlatformPeriodicsDcMultimediaHandler.Save(MultiMediaSubElements);
                            //            CreatedMultiMediaSubElementsAnswerModeList.push(CreatedMultiMediaSubElements);
                            //        }
                            //    }
                            //}
                        }

                    }
                }
            }

            OneViewConsole.Debug("CreateMultiMediaSubElementsAnswerMode End", "LVDataCaptureBO.CreateMultiMediaSubElementsAnswerMode");

            return CreatedMultiMediaSubElementsAnswerModeList;
        }
        catch (Excep) {
            alert("LVDataCaptureBO.CreateMultiMediaSubElementsAnswerMode : " + Excep);
            alert("LVDataCaptureBO.CreateMultiMediaSubElementsAnswerMode 22 : " + JSON.stringify(Excep));
            CreatedMultiMediaSubElementsAnswerModeList = null;
            throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.CreateMultiMediaSubElementsAnswerMode", Excep);
        }
        finally {

        }
    }

    var UpdateMultiMediaSubElementsAnswerMode = function (AttributeNodeId, DcResultDetail, MultiMediaSubElementsAnswerModeDict) {

        try {
            OneViewConsole.Debug("UpdateMultiMediaSubElementsAnswerMode Start", "LVDataCaptureBO.UpdateMultiMediaSubElementsAnswerMode");

            //alert('MultiMediaSubElementsAnswerModeDict : ' + MultiMediaSubElementsAnswerModeDict);

            var CreatedMultiMediaSubElementsAnswerModeList = [];
            var _oPlatformPeriodicsDcMultimediaHandler = new PlatformPeriodicsDcMultimediaHandler();

            if (MultiMediaSubElementsAnswerModeDict != undefined) {
                var ControlWiseMultiMediaSubElementsAnswerModeDict = MultiMediaSubElementsAnswerModeDict[AttributeNodeId];
                if (MultiMediaSubElementsAnswerModeDict != undefined) {
                    var MultiMediaSubElementsList = ControlWiseMultiMediaSubElementsAnswerModeDict[DcResultDetail.ControlId];
                    ModifyMultiMediaSubElementsAnswerMode(DcResultDetail, MultiMediaSubElementsList, CreatedMultiMediaSubElementsAnswerModeList, _oPlatformPeriodicsDcMultimediaHandler);
                    //if (MultiMediaSubElementsList != null && MultiMediaSubElementsList.length > 0) {
                    //    for (var j = 0; j < MultiMediaSubElementsList.length; j++) {
                    //        var MultiMediaSubElements = MultiMediaSubElementsList[j];
                    //        if (MultiMediaSubElements.IsDisabled == true) {
                    //            _oPlatformPeriodicsDcMultimediaHandler.Update(MultiMediaSubElements);
                    //        }
                    //        else {
                    //            var LocalMultiMediaSubElements = _oPlatformPeriodicsDcMultimediaHandler.Get(DcResultDetail.ClientGuid, DATEntityType.DCResultDetails);
                    //            if (LocalMultiMediaSubElements != null && LocalMultiMediaSubElements.length == 1) {
                    //                //update
                    //                MultiMediaSubElements.Id = LocalMultiMediaSubElements[0].Id;
                    //                MultiMediaSubElements.ServerId = (LocalMultiMediaSubElements[0].ServerId !="INT" ? LocalMultiMediaSubElements[0].ServerId : 0);
                    //                _oPlatformPeriodicsDcMultimediaHandler.UpdateMultiMedia(MultiMediaSubElements);
                    //                CreatedMultiMediaSubElementsAnswerModeList.push(MultiMediaSubElements);
                    //            }
                    //            else {
                    //                //create
                    //                MultiMediaSubElements.MappedEntityClientGuid = DcResultDetail.ClientGuid;
                    //                var CreatedMultiMediaSubElements = _oPlatformPeriodicsDcMultimediaHandler.Save(MultiMediaSubElements);
                    //                CreatedMultiMediaSubElementsAnswerModeList.push(CreatedMultiMediaSubElements);
                    //            }
                    //        }
                    //    }
                    //}
                }
            }
            OneViewConsole.Debug("UpdateMultiMediaSubElementsAnswerMode End", "LVDataCaptureBO.UpdateMultiMediaSubElementsAnswerMode");

            return CreatedMultiMediaSubElementsAnswerModeList;
        }
        catch (Excep) {
            alert("LVDataCaptureBO.UpdateMultiMediaSubElementsAnswerMode : " + Excep);
            alert("LVDataCaptureBO.UpdateMultiMediaSubElementsAnswerMode 22 : " + JSON.stringify(Excep));
            CreatedMultiMediaSubElementsAnswerModeList = null;
            throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.UpdateMultiMediaSubElementsAnswerMode", Excep);
        }
        finally {

        }
    }

    var ModifyMultiMediaSubElementsAnswerMode = function (DcResultDetail, MultiMediaSubElementsList, CreatedMultiMediaSubElementsAnswerModeList, _oPlatformPeriodicsDcMultimediaHandler) {

        try {
            OneViewConsole.Debug("ModifyMultiMediaSubElementsAnswerMode Start", "LVDataCaptureBO.ModifyMultiMediaSubElementsAnswerMode");

            if (MultiMediaSubElementsList != null && MultiMediaSubElementsList.length > 0) {
                for (var j = 0; j < MultiMediaSubElementsList.length; j++) {
                    var MultiMediaSubElements = MultiMediaSubElementsList[j];
                    if (MultiMediaSubElements.IsDisabled == true) {
                        _oPlatformPeriodicsDcMultimediaHandler.Update(MultiMediaSubElements);
                    }
                    else {
                        var LocalMultiMediaSubElements = _oPlatformPeriodicsDcMultimediaHandler.Get(DcResultDetail.ClientGuid, DATEntityType.DCResultDetails);
                        if (LocalMultiMediaSubElements != null && LocalMultiMediaSubElements.length == 1) {
                            //update
                            MultiMediaSubElements.Id = LocalMultiMediaSubElements[0].Id;
                            MultiMediaSubElements.ServerId = (LocalMultiMediaSubElements[0].ServerId != "INT" ? LocalMultiMediaSubElements[0].ServerId : 0);
                            _oPlatformPeriodicsDcMultimediaHandler.UpdateMultiMedia(MultiMediaSubElements);
                            CreatedMultiMediaSubElementsAnswerModeList.push(MultiMediaSubElements);
                        }
                        else {
                            //create
                            MultiMediaSubElements.MappedEntityClientGuid = DcResultDetail.ClientGuid;
                            var CreatedMultiMediaSubElements = _oPlatformPeriodicsDcMultimediaHandler.Save(MultiMediaSubElements);
                            CreatedMultiMediaSubElementsAnswerModeList.push(CreatedMultiMediaSubElements);
                        }
                    }
                }
            }
            OneViewConsole.Debug("ModifyMultiMediaSubElementsAnswerMode End", "LVDataCaptureBO.ModifyMultiMediaSubElementsAnswerMode");

            return CreatedMultiMediaSubElementsAnswerModeList;
        }
        catch (Excep) {
            alert("LVDataCaptureBO.UpdateMultiMediaSubElementsAnswerMode : " + Excep);
            alert("LVDataCaptureBO.UpdateMultiMediaSubElementsAnswerMode 22 : " + JSON.stringify(Excep));
            CreatedMultiMediaSubElementsAnswerModeList = null;
            throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.UpdateMultiMediaSubElementsAnswerMode", Excep);
        }
        finally {

        }
    }


    var GetDCSummary = function () {

        try {
            OneViewConsole.Debug("GetSummary Start", "LVDataCaptureBO.GetSummary");

            var oAttributeGroupComponent = oLVFactory.GetAttributeGroupComponent(MyInstance.AttributeGroupComponentKey);
            var Summary = oAttributeGroupComponent.GetSummary(LVTemplateConfigMetaData.TemplateConfigMetaDataDetails, true, true);

            OneViewConsole.Debug("GetSummary End", "LVDataCaptureBO.GetSummary");

            return Summary;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetSummary", Excep);
        }
        finally {

        }
    }

    var UpdateScore = function (LVDataCaptureId, LVDcResultsId, DCSummary, IsSave, IsVallidationSuccess, IsSubmit) {

        try {
            OneViewConsole.Debug("UpdateScore Start", "LVDataCaptureBO.UpdateScore");

            var _oOneViewSqlitePlugin = new OneViewSqlitePlugin();

            var _DateTime = new DateTime();
            var CurrenntDateAndTime = _DateTime.GetDateAndTime();

            var IsCompleted = IsVallidationSuccess;
            if (IsVallidationSuccess == false) {
                IsCompleted = (DCSummary.CompletedCount == DCSummary.TotalCount) ? true : false;
            }

            var IsAnyDCBlocker = GetDcBlockerStatus(LVDataCaptureClientGuid);

            var DataCaptureUpdateQuery = "UPDATE DataCaptureEntity SET Score=" + DCSummary.Score + ",MaxScore=" + DCSummary.MaxScore + ",Percentage=" + DCSummary.Percentage + ",CompletedChildCount=" + DCSummary.CompletedCount +
                ",TotalChildCount=" + DCSummary.TotalCount + ",CompletedAttributeCount=" + DCSummary.CompletedAttributeCount + ",TotalAttributeCount=" + DCSummary.TotalAttributeCount + ",IsCompleted='" + IsCompleted + "',IsSubmit='" + IsSubmit + "',SubmitDate='" + CurrenntDateAndTime +
                "',ESTTime = " + DCSummary.ESTTime + ",ActualTime = " + DCSummary.ActualTime + ",IsSynchronized='false',TimeStamp = '" + CurrenntDateAndTime + "',IsAnyDCBlocker = '" + IsAnyDCBlocker + "' WHERE Id=" + LVDataCaptureId;

            _oOneViewSqlitePlugin.ExcecuteSql(DataCaptureUpdateQuery);

            var DCResultsUpdateQuery = "UPDATE DcResultsEntity SET Score=" + DCSummary.Score + ",MaxScore=" + DCSummary.MaxScore + ",Percentage=" + DCSummary.Percentage + ",CompletedChildCount=" + DCSummary.CompletedCount +
                ",TotalChildCount=" + DCSummary.TotalCount + ",CompletedAttributeCount=" + DCSummary.CompletedAttributeCount + ",TotalAttributeCount=" + DCSummary.TotalAttributeCount + ",IsSynchronized='false',TimeStamp = '" + CurrenntDateAndTime +
                "',ActualTime = " + DCSummary.ActualTime + ",LastUpdatedDate = '" + CurrenntDateAndTime + "' WHERE Id=" + LVDcResultsId;

            _oOneViewSqlitePlugin.ExcecuteSql(DCResultsUpdateQuery);

            var _oDcPendingTaskBO = new DcPendingTaskBO();
            _oDcPendingTaskBO.UpdateStatus(IsSave, IsCompleted);

            OneViewSessionStorage.Save("IsDcCompletedBeforeEdit", IsCompleted);
            OneViewSessionStorage.Save("IsDcSynchronizedBeforeEdit", 'false');

            OneViewConsole.Debug("UpdateScore End", "LVDataCaptureBO.UpdateScore");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.UpdateScore", Excep);
        }
        finally {

        }
    }

    var SaveDCBlockers = function (LVDcStartDate) {

        try {
            OneViewConsole.Debug("SaveDCBlockers Start", "LVDataCaptureBO.SaveDCBlockers");

            var _oDcDAO = new DcDAO();
            var DataCaptureRequest = MakeGetCompleteDataCaptureRequest(LVDcStartDate);

            var _DateTime = new DateTime();
            var CurrenntDateAndTime = _DateTime.GetDateAndTime();

            var _oOneViewGeolocationPlugin = new OneViewGeolocationPlugin();
            var IsGeolocationSuccess = _oOneViewGeolocationPlugin.CheckGeolocation();
            var Latitude = "";
            var Longitude = "";

            if (IsGeolocationSuccess == true) {
                var GeolocationInfo = _oOneViewGeolocationPlugin.GetLatitudeAndLongitude();
                if (GeolocationInfo.IsAnyException == false) {
                    Latitude = GeolocationInfo.Latitude;
                    Longitude = GeolocationInfo.Longitude;
                }
            }

            var _oDCBlockerInfoDAO = new DCBlockerInfoDAO();

            var oDefaultMasterDAO = new DefaultMasterDAO("DcResultDetailsEntity");
            var DcResultDetailsEntityCount = oDefaultMasterDAO.Count();

            for (var itrDCBlockerTemplateResult in LVDCBlockerTemplateResult) {
                //alert(LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].IsDisable);
                //alert(LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].DCBlockerInfoServerId);
                if (LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].IsDisable == true) {
                    if (LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].DCBlockerInfoServerId == 0) {
                        _oDCBlockerInfoDAO.DeleteDCBlocker(LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].DCBlockerInfoClientId, LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].DataCaptureClientId);
                    }
                    else {
                        _oDCBlockerInfoDAO.DisableDCBlocker(LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].DCBlockerInfoClientId, LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].DataCaptureClientId);
                    }
                }
                if (LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].DataCaptureClientId == "" && LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].IsDisable == false) {

                    DataCaptureRequest.TemplateNodeId = LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].DCBlockerTemplateId;
                    DataCaptureRequest.TemplateNodeName = "Cleaning NP Template"; // Need to change

                    var oDataCaptureEntity = GetCompleteDataCaptureEntity(LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].LVTemplateResult, LVDcStartDate, DataCaptureRequest);
                    oDataCaptureEntity.IsForDCBlocker = true;
                    oDataCaptureEntity.IsAnyDCBlocker = false;

                    var DcInfo = _oDcDAO.CreateAndReturn(oDataCaptureEntity, false);
                    //alert(JSON.stringify(DcInfo));
                    //alert(JSON.stringify(LVDCBlockerTemplateResult[itrDCBlockerTemplateResult]));
                    var Query = "SELECT ClientGuid FROM DcResultDetailsEntity WHERE AttributeNodeId = '" + itrDCBlockerTemplateResult + "' AND DataResultsId = " + LVDcResultsId;
                    var Result = window.OneViewSqlite.excecuteSqlReader(Query);
                    Result = JSON.parse(Result);
                    var ClientGuid = "";
                    if (Result.length > 0) {
                        ClientGuid = Result[0].ClientGuid;
                    }

                    var oDCBlockerInfoEntity = GetDCBlockerInfoEntity(DataCaptureRequest, LVDataCaptureClientGuid, LVDcResultsClientGuid, ClientGuid, DcInfo.ClientGuid);
                    //alert(JSON.stringify(oDCBlockerInfoEntity));

                    var _oDCBlockerInfoDAO = new DefaultMasterDAO("DCBlockerInfoEntity");
                    _oDCBlockerInfoEntity = _oDCBlockerInfoDAO.CreateMaster(oDCBlockerInfoEntity);

                    //alert(JSON.stringify(_oDCBlockerInfoEntity));

                    LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].DataCaptureClientId = DcInfo.DcId;
                    LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].DataCaptureClientGuid = DcInfo.ClientGuid;
                    LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].DCBlockerInfoClientId = _oDCBlockerInfoEntity.Id;

                    for (var itrAttributes in LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].LVTemplateResult) {
                        //alert(JSON.stringify(LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].LVTemplateResult[itrAttributes]));
                        var oAnswers = LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].LVTemplateResult[itrAttributes].Answers;
                        for (var i = 0; i < oAnswers.length; i++) {
                            oAnswers[i].ClientId = DcInfo.DcResultDetails[oAnswers[i].ControlId].ClientId;
                            oAnswers[i].ClientGuid = DcInfo.DcResultDetails[oAnswers[i].ControlId].ClientGuid;
                            oAnswers[i].IsModified = false;
                        }
                    }
                    //alert(JSON.stringify(LVDCBlockerTemplateResult[itrDCBlockerTemplateResult]));
                }
                else {
                    for (var itrAttributes in LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].LVTemplateResult) {

                        var DataCaptureRequest = MakeGetCompleteDataCaptureRequest(LVDcStartDate);
                        var AttributeNodeId = LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].LVTemplateResult[itrAttributes].Id;
                        var AttributeNodeName = LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].LVTemplateResult[itrAttributes].Name;
                        var Comments = LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].LVTemplateResult[itrAttributes].Comments;
                        var IsNA = LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].LVTemplateResult[itrAttributes].NA;
                        var IsBlocker = LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].LVTemplateResult[itrAttributes].IsBlocker;
                        var ESTTime = LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].LVTemplateResult[itrAttributes].ESTTime;
                        var ActualTime = LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].LVTemplateResult[itrAttributes].ActualTime;
                        var IsManualESTEnabled = LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].LVTemplateResult[itrAttributes].IsManualESTEnabled;

                        var oAnswers = LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].LVTemplateResult[itrAttributes].Answers;

                        //alert(JSON.stringify(LVDCBlockerTemplateResult[itrDCBlockerTemplateResult].LVTemplateResult[itrAttributes]));

                        for (var i = 0; i < oAnswers.length; i++) {

                            //alert(JSON.stringify(oAnswers[i]));

                            if (oAnswers[i].ClientId != "" && oAnswers[i].IsModified == true) {

                                var Query = "UPDATE DcResultDetailsEntity SET Answer='" + oAnswers[i].Answer + "',AnswerValue='" + oAnswers[i].AnswerValue + "' ,IsSynchronized='false',LastUpdatedDate ='" + CurrenntDateAndTime +
                                    "',Comments = '" + Comments + "',IsNA = '" + IsNA + "',IsBlocker = '" + IsBlocker + "',Score = " + oAnswers[i].Score + ",MaxScore=" + oAnswers[i].MaxScore + ",Percentage=" + oAnswers[i].Percentage + ",CompletedChildCount=" + oAnswers[i].CompletedChildCount +
                                    ",TotalChildCount=" + oAnswers[i].TotalChildCount + ",CompletedAttributeCount=" + oAnswers[i].CompletedAttributeCount + ",TotalAttributeCount=" + oAnswers[i].TotalAttributeCount + ",TimeStamp = '" + CurrenntDateAndTime +
                                    ",ESTTime=" + ESTTime + ",ActualTime=" + ActualTime + ",IsManualESTEnabled='" + IsManualESTEnabled + "'" +
                                    "',Latitude = '" + Latitude + "',Longitude = '" + Longitude + "' WHERE Id=" + oAnswers[i].ClientId;
                                //alert(Query);
                                window.OneViewSqlite.excecuteSql(Query);
                                oAnswers[i].IsModified = false;
                            }
                            else if (oAnswers[i].ClientId == "" && oAnswers[i].IsModified == true) {

                                var oAnswerMode = oAnswers[i];
                                var DcResultDetailsEntity = GetDcResultDetailsEntity(DataCaptureRequest, AttributeNodeId, AttributeNodeName, Comments, oAnswerMode, Latitude, Longitude, IsNA, IsBlocker, ESTTime, ActualTime, IsManualESTEnabled);

                                DcResultDetailsEntity.DataCaptureId = LVDataCaptureId;
                                DcResultDetailsEntity.DataResultsId = LVDcResultsId;

                                var oDcResultDetails = oDefaultMasterDAO.Create(DcResultDetailsEntity, DcResultDetailsEntityCount);

                                DcResultDetailsEntityCount += 1;

                                //alert(JSON.stringify(DcResultDetailsEntity));
                            }
                        }
                    }
                }
            }

            OneViewConsole.Debug("SaveDCBlockers End", "LVDataCaptureBO.SaveDCBlockers");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.SaveDCBlockers", Excep);
        }
        finally {
        }
    }

    var GetDcBlockerStatus = function (DataCaptureClientGuid) {

        try {
            OneViewConsole.Debug("GetDcBlockerStatus Start", "LVDataCaptureBO.GetDcBlockerStatus");

            var DcBlockerStatus = false;

            if (DataCaptureClientGuid != "" && DataCaptureClientGuid != null && DataCaptureClientGuid != undefined) {

                var DCBlockerQuery = "SELECT IsDisable FROM DCBlockerInfoEntity WHERE DataCaptureClientGuid = '" + DataCaptureClientGuid + "'";
                var DCBlockerResult = window.OneViewSqlite.excecuteSqlReader(DCBlockerQuery);
                DCBlockerResult = JSON.parse(DCBlockerResult);

                for (i = 0; i < DCBlockerResult.length; i++) {
                    if (DCBlockerResult[i].IsDisable == 'false') {
                        DcBlockerStatus = true;
                        break;
                    }
                }
            }

            return DcBlockerStatus;

            OneViewConsole.Debug("GetDcBlockerStatus Start", "LVDataCaptureBO.GetDcBlockerStatus");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetDcBlockerStatus", Excep);
        }
        finally {
            DcBlockerStatus = null;
            DCBlockerQuery = null;
            DCBlockerResult = null;
        }
    }

    var GetCompleteDataCaptureEntity = function (LVTemplateResult, LVDcStartDate, DataCaptureRequest) {

        try {
            OneViewConsole.Debug("GetCompleteDataCaptureEntity Start", "LVDataCaptureBO.GetCompleteDataCaptureEntity");

            var oDataCaptureEntity = new DataCaptureEntity(DataCaptureRequest);

            oDataCaptureEntity = GetDataCaptureEntity(DataCaptureRequest);
            oDataCaptureEntity.DcResultsEntitylist[0] = GetDcResultsEntity(DataCaptureRequest);

            var _oOneViewGeolocationPlugin = new OneViewGeolocationPlugin();
            var IsGeolocationSuccess = _oOneViewGeolocationPlugin.CheckGeolocation();

            var Latitude = "";
            var Longitude = "";

            if (IsGeolocationSuccess == true) {
                var GeolocationInfo = _oOneViewGeolocationPlugin.GetLatitudeAndLongitude();
                if (GeolocationInfo.IsAnyException == false) {
                    Latitude = GeolocationInfo.Latitude;
                    Longitude = GeolocationInfo.Longitude;
                }
            }

            var Count = 0;

            for (var itrAttributes in LVTemplateResult) {

                var TemplateNode = LVTemplateResult[itrAttributes];

                var AttributeNodeId = TemplateNode.Id;
                var AttributeNodeName = TemplateNode.Name;
                var Comments = TemplateNode.Comments;
                var IsNA = TemplateNode.NA;
                var IsBlocker = TemplateNode.IsBlocker;
                var ESTTime = TemplateNode.ESTTime;
                var ActualTime = TemplateNode.ActualTime;
                var IsManualESTEnabled = TemplateNode.IsManualESTEnabled;

                for (var i = 0; i < TemplateNode.Answers.length; i++) {
                    oDataCaptureEntity.DcResultsEntitylist[0].DcResultDetailsEntityList[Count] = GetDcResultDetailsEntity(DataCaptureRequest, AttributeNodeId, AttributeNodeName, Comments, TemplateNode.Answers[i], Latitude, Longitude, IsNA, IsBlocker, ESTTime, ActualTime, IsManualESTEnabled);
                    Count += 1;
                }
            }

            //oDataCaptureEntity.IsForDCBlocker = true;

            OneViewConsole.Debug("GetCompleteDataCaptureEntity End", "LVDataCaptureBO.GetCompleteDataCaptureEntity");

            return oDataCaptureEntity;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetCompleteDataCaptureEntity", Excep);
        }
        finally {
            oDataCaptureEntity = null;
        }
    }

    var GetCompleteDataCaptureAndActionEntity = function (LVTemplateResult, LVDcStartDate, LVDCSummary) {

        try {
            OneViewConsole.Debug("GetCompleteDataCaptureAndActionEntity Start", "LVDataCaptureBO.GetCompleteDataCaptureAndActionEntity");

            var DataCaptureRequest = MakeGetCompleteDataCaptureRequest(LVDcStartDate);

            var oDataCaptureEntity = new DataCaptureEntity(DataCaptureRequest);

            oDataCaptureEntity = GetDataCaptureEntity(DataCaptureRequest);

            ///update blocker status
            if (LVDCSummary.IsBlocker != undefined)
                oDataCaptureEntity.IsBlocker = LVDCSummary.IsBlocker;



            oDataCaptureEntity.DcResultsEntitylist[0] = GetDcResultsEntity(DataCaptureRequest, LVDCSummary);

            var _oOneViewGeolocationPlugin = new OneViewGeolocationPlugin();
            var IsGeolocationSuccess = _oOneViewGeolocationPlugin.CheckGeolocation();

            var Latitude = "";
            var Longitude = "";

            if (IsGeolocationSuccess == true) {
                var GeolocationInfo = _oOneViewGeolocationPlugin.GetLatitudeAndLongitude();
                if (GeolocationInfo.IsAnyException == false) {
                    Latitude = GeolocationInfo.Latitude;
                    Longitude = GeolocationInfo.Longitude;
                }
            }

            var Count = 0;

            var Actions = {};

            for (var itrAttributes in LVTemplateResult) {

                var TemplateNode = LVTemplateResult[itrAttributes];

                var AttributeNodeId = TemplateNode.Id;
                var AttributeNodeName = TemplateNode.Name;
                var Comments = TemplateNode.Comments;
                var IsNA = TemplateNode.NA;
                var IsBlocker = TemplateNode.IsBlocker;
                var ESTTime = TemplateNode.ESTTime;
                var ActualTime = TemplateNode.ActualTime;
                var IsManualESTEnabled = TemplateNode.IsManualESTEnabled;

                for (var i = 0; i < TemplateNode.Answers.length; i++) {

                    oDataCaptureEntity.DcResultsEntitylist[0].DcResultDetailsEntityList[Count] = GetDcResultDetailsEntity(DataCaptureRequest, AttributeNodeId, AttributeNodeName, Comments, TemplateNode.Answers[i], Latitude, Longitude, IsNA, IsBlocker, ESTTime, ActualTime, IsManualESTEnabled);
                    Count += 1;
                }
            }

            var IsNC = false;

            for (var itrLVActionResult in LVActionResult) {
                var oAction = GetAction(DataCaptureRequest, oDataCaptureEntity.ClientGuid, oDataCaptureEntity.DcResultsEntitylist[0].ClientGuid, itrLVActionResult, "", LVActionResult[itrLVActionResult]);
                Actions[itrLVActionResult] = oAction;
                //alert(JSON.stringify(oAction));
                if (LVActionResult[itrLVActionResult].IsNC == true) {
                    IsNC = true;
                }
            }

            oDataCaptureEntity.IsAnyNC = IsNC;



            LVDataCaptureClientGuid = oDataCaptureEntity.ClientGuid;
            LVDcResultsClientGuid = oDataCaptureEntity.DcResultsEntitylist[0].ClientGuid;

            OneViewConsole.Debug("GetCompleteDataCaptureAndActionEntity End", "LVDataCaptureBO.GetCompleteDataCaptureAndActionEntity");

            return { "oDataCaptureEntity": oDataCaptureEntity, "Actions": Actions };
        }
        catch (Excep) {

            throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetCompleteDataCaptureEntity", Excep);
        }
        finally {
            oDataCaptureEntity = null;
        }
    }

    var GetAction = function (DataCaptureRequest, DataCaptureClientGuid, DcResultsClientGuid, NCRuleId, DcResultDetailsClientGuid, ActionResultItem) {

        try {
            OneViewConsole.Debug("GetAction Start", "LVDataCaptureBO.GetAction");

            var _oActionEntity = new ActionEntity();
            _oActionEntity = GetActionEntity(DataCaptureRequest);

            var ActionDetailsCount = 0;

            for (var i = 0; i < ActionResultItem.Actions.length; i++) {
                _oActionEntity.ActionDetailsEntityList[ActionDetailsCount] = GetActionDetailsEntity(DataCaptureRequest, _oActionEntity.ClientGuid, "", ActionResultItem.Actions[i]);
                ActionDetailsCount += 1;
            }

            var _oDCNCMapping = GetDCNCMapping(DataCaptureRequest, DataCaptureClientGuid, DcResultsClientGuid, NCRuleId, DcResultDetailsClientGuid, _oActionEntity.ClientGuid, ActionResultItem);

            var MultiMediaSubElements = new Array();
            for (var i = 0; i < ActionResultItem.MultimediaSubElements.length; i++) {
                ActionResultItem.MultimediaSubElements[i].MappedEntityClientGuid = _oActionEntity.ClientGuid;
                MultiMediaSubElements[i] = GetMultiMediaSubElement(DataCaptureRequest, ActionResultItem.MultimediaSubElements[i]);
            }

            OneViewConsole.Debug("GetAction End", "LVDataCaptureBO.GetAction");

            return { "ActionEntity": _oActionEntity, "DCNCMapping": _oDCNCMapping, "MultiMediaSubElements": MultiMediaSubElements }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetAction", Excep);
        }
        finally {

        }
    }

    var GetActionEntity = function (DataCaptureRequest) {

        try {
            OneViewConsole.Debug("GetActionEntity Start", "LVDataCaptureBO.GetActionEntity");

            var _oActionEntity = new ActionEntity();

            _oActionEntity.ClientGuid = OneViewUniqueGenerator.GetGuid();
            _oActionEntity.MobileVersionId = 1;

            _oActionEntity.ServiceId = DataCaptureRequest.ServiceId;

            _oActionEntity.ActionRaisedBySystemUserId = DataCaptureRequest.SystemUserId;
            _oActionEntity.ActionRaisedByUserName = DataCaptureRequest.UserName;

            _oActionEntity.IsApproved = "false";
            _oActionEntity.ActionContext = DATActionContext.DataCapture;

            _oActionEntity.IsSubmited = "true";
            _oActionEntity.SubmitedDate = DataCaptureRequest.CurrenntDateAndTime;

            _oActionEntity.CreatedDate = DataCaptureRequest.CurrenntDateAndTime;
            _oActionEntity.IsSynchronized = "false";
            _oActionEntity.IsDisable = "false";

            OneViewConsole.Debug("GetActionEntity End", "LVDataCaptureBO.GetActionEntity");

            return _oActionEntity;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetActionEntity", Excep);
        }
        finally {

        }
    }

    var GetActionDetailsEntity = function (DataCaptureRequest, ActionClientGuid, DataCaptureClientGuid, Action) {

        try {
            OneViewConsole.Debug("GetActionDetailsEntity Start", "LVDataCaptureBO.GetActionDetailsEntity");

            var _oActionDetailsEntity = new ActionDetailsEntity();

            _oActionDetailsEntity.ClientGuid = OneViewUniqueGenerator.GetGuid();
            _oActionDetailsEntity.MobileVersionId = 1;

            _oActionDetailsEntity.ServiceId = DataCaptureRequest.ServiceId;

            _oActionDetailsEntity.ActionClientGuid = ActionClientGuid;

            if (Action.ActionType == LVActionType.PredefinedAction) {
                _oActionDetailsEntity.PreDefinedActionId = Action.PreDefinedActionId;
                _oActionDetailsEntity.CustomAction = "";
            }
            else if (Action.ActionType == LVActionType.CustomAction) {
                _oActionDetailsEntity.CustomAction = Action.Name;
                _oActionDetailsEntity.PreDefinedActionId = 0;
            }

            _oActionDetailsEntity.DataCaptureClientGuid = DataCaptureClientGuid;

            _oActionDetailsEntity.IsPersonalObservation = "true";

            _oActionDetailsEntity.CreatedDate = DataCaptureRequest.CurrenntDateAndTime;
            _oActionDetailsEntity.IsSynchronized = "false";
            _oActionDetailsEntity.IsDisable = "false";

            OneViewConsole.Debug("GetActionDetailsEntity End", "LVDataCaptureBO.GetActionDetailsEntity");

            return _oActionDetailsEntity;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetActionDetailsEntity", Excep);
        }
        finally {

        }
    }

    var GetDCNCMapping = function (DataCaptureRequest, DataCaptureClientGuid, DcResultsClientGuid, NCRuleId, DcResultDetailsClientGuid, ActionClientGuid, ActionResultItem) {

        try {
            OneViewConsole.Debug("GetDCNCMapping Start", "LVDataCaptureBO.GetDCNCMapping");

            var _oDCNCMapping = new DCNCMapping();

            _oDCNCMapping.ClientGuid = OneViewUniqueGenerator.GetGuid();
            _oDCNCMapping.MobileVersionId = 1;

            _oDCNCMapping.ServiceId = DataCaptureRequest.ServiceId;
            _oDCNCMapping.RaisedBySystemUserId = DataCaptureRequest.SystemUserId;

            _oDCNCMapping.NCRuleId = NCRuleId;
            _oDCNCMapping.IsNC = ActionResultItem.IsNC;
            _oDCNCMapping.IsObservation = ActionResultItem.IsObservation;
            _oDCNCMapping.IsManualRule = ActionResultItem.IsManualRule;
            _oDCNCMapping.TemplateNodeIds = ActionResultItem.TemplateNodeIds;

            _oDCNCMapping.DataCaptureClientGuid = DataCaptureClientGuid;
            _oDCNCMapping.DcResultsClientGuid = DcResultsClientGuid;
            _oDCNCMapping.DcResultDetailsClientGuid = DcResultDetailsClientGuid;
            _oDCNCMapping.ActionClientGuid = ActionClientGuid;

            _oDCNCMapping.CreatedDate = DataCaptureRequest.CurrenntDateAndTime;
            _oDCNCMapping.IsSynchronized = "false";
            _oDCNCMapping.IsDisable = "false";

            OneViewConsole.Debug("GetDCNCMapping End", "LVDataCaptureBO.GetDCNCMapping");

            return _oDCNCMapping;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetDCNCMapping", Excep);
        }
    }

    var GetMultiMediaSubElement = function (DataCaptureRequest, _oMultiMediaSubElement) {

        try {

            OneViewConsole.Debug("GetMultiMediaSubElement Start", "LVDataCaptureBO.MakeGetCompleteDataCaptureRequest");

            var _oMultiMediaSubElements = new MultiMediaSubElements();

            _oMultiMediaSubElements.ClientGuid = OneViewUniqueGenerator.GetGuid();
            _oMultiMediaSubElements.MobileVersionId = 1;
            _oMultiMediaSubElements.ServiceId = DataCaptureRequest.ServiceId;

            _oMultiMediaSubElements.MappedEntityClientGuid = _oMultiMediaSubElement.MappedEntityClientGuid;
            _oMultiMediaSubElements.Dimension = _oMultiMediaSubElement.Dimension;
            _oMultiMediaSubElements.MultiMediaType = _oMultiMediaSubElement.MultiMediaType;
            _oMultiMediaSubElements.LocalURL = _oMultiMediaSubElement.LocalURL;

            _oMultiMediaSubElements.Comments = _oMultiMediaSubElement.Comments;
            _oMultiMediaSubElements.CreatedDate = DataCaptureRequest.CurrenntDateAndTime;
            _oMultiMediaSubElements.TimeStamp = DataCaptureRequest.CurrenntDateAndTime;
            _oMultiMediaSubElements.IsSynchronized = false;
            _oMultiMediaSubElements.IsMultiMediaSynchronized = false;
            _oMultiMediaSubElements.IsDisabled = _oMultiMediaSubElement.IsDisabled;

            OneViewConsole.Debug("GetMultiMediaSubElement End", "LVDataCaptureBO.MakeGetCompleteDataCaptureRequest");

            return _oMultiMediaSubElements;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetMultiMediaSubElement", Excep);
        }
    }

    var MakeGetCompleteDataCaptureRequest = function (LVDcStartDate) {

        try {
            OneViewConsole.Debug("MakeGetCompleteDataCaptureRequest Start", "LVDataCaptureBO.MakeGetCompleteDataCaptureRequest");

            var DataCaptureRequest = {

                CurrenntDateAndTime: new DateTime().GetDateAndTime(),

                ServiceId: OneViewSessionStorage.Get("ServiceId"),
                ServiceName: OneViewSessionStorage.Get("ServiceName"),

                TemplateNodeId: OneViewSessionStorage.Get("TemplateId"),
                TemplateNodeName: OneViewSessionStorage.Get("TemplateName"),

                DcPlaceId: OneViewSessionStorage.Get("DcPlaceId"),
                DcPlaceName: OneViewSessionStorage.Get("DcPlaceName"),

                ShiftId: OneViewSessionStorage.Get("CurrentShiftId"),
                ShiftName: OneViewSessionStorage.Get("CurrentShiftName"),

                SystemUserId: OneViewSessionStorage.Get("LoginUserId"),
                UserName: OneViewSessionStorage.Get("LoginUserName"),

                DcProfileId: OneViewSessionStorage.Get("DcProfileId"),

                DcPlaceDimension: (OneViewSessionStorage.Get("DcPlaceId") > 0) ? DATEntityType.OrganizationAssestsNode : 0, // Need to access from session

                DcStartDate: LVDcStartDate
            }

            OneViewConsole.Debug("MakeGetCompleteDataCaptureRequest End", "LVDataCaptureBO.MakeGetCompleteDataCaptureRequest");

            return DataCaptureRequest;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.MakeGetCompleteDataCaptureRequest", Excep);
        }
    }

    var GetDataCaptureEntity = function (DataCaptureRequest) {

        try {
            OneViewConsole.Debug("GetDataCaptureEntity Start", "LVDataCaptureBO.GetDataCaptureEntity");

            var _oDataCaptureEntity = new DataCaptureEntity();

            _oDataCaptureEntity.ClientGuid = OneViewUniqueGenerator.GetGuid();
            _oDataCaptureEntity.MobileVersionId = 1;

            _oDataCaptureEntity.ServiceId = DataCaptureRequest.ServiceId;
            _oDataCaptureEntity.ServiceName = DataCaptureRequest.ServiceName;

            _oDataCaptureEntity.TemplateNodeId = DataCaptureRequest.TemplateNodeId;
            _oDataCaptureEntity.TemplateNodeName = DataCaptureRequest.TemplateNodeName;

            _oDataCaptureEntity.DcPlaceDimension = DataCaptureRequest.DcPlaceDimension;
            _oDataCaptureEntity.DcPlaceId = DataCaptureRequest.DcPlaceId;
            _oDataCaptureEntity.DcPlaceName = DataCaptureRequest.DcPlaceName;

            _oDataCaptureEntity.DcProfileId = DataCaptureRequest.DcProfileId;

            _oDataCaptureEntity.IsCompleted = "false";
            _oDataCaptureEntity.IsSynchronized = "false";

            _oDataCaptureEntity.IsSubmit = "false";
            _oDataCaptureEntity.ApprovalStatus = oDCApprovalStatusEnum.NONE;

            _oDataCaptureEntity.IsDynamicDCPlace = "false";
            _oDataCaptureEntity.IsDynamicAttribute = "false";
            _oDataCaptureEntity.IsDynamicAnswer = "false";

            _oDataCaptureEntity.IsAnyNC = "false";
            _oDataCaptureEntity.IsAnyObservation = "false";
            _oDataCaptureEntity.IsAnyAction = "false";
            _oDataCaptureEntity.IsForAction = "false";
            _oDataCaptureEntity.IsForHistory = 'false';
            _oDataCaptureEntity.IsForDCBlocker = 'false';
            _oDataCaptureEntity.IsMultiMediaAttached = 'false';

            _oDataCaptureEntity.DcStartDate = DataCaptureRequest.DcStartDate;
            _oDataCaptureEntity.CreatedDate = DataCaptureRequest.CurrenntDateAndTime;

            OneViewConsole.Debug("GetDataCaptureEntity End", "LVDataCaptureBO.GetDataCaptureEntity");

            return _oDataCaptureEntity;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetDataCaptureEntity", Excep);
        }
        finally {
            _oDataCaptureEntity = null;
            CurrenntDateAndTime = null
        }
    }

    var GetDcResultsEntity = function (DataCaptureRequest, LVDCSummary) {

        try {
            OneViewConsole.Debug("GetDcResultsEntity Start", "LVDataCaptureBO.GetDcResultsEntity");

            var _oDcResultsEntity = new DcResultsEntity();

            _oDcResultsEntity.ClientGuid = OneViewUniqueGenerator.GetGuid();
            _oDcResultsEntity.MobileVersionId = 1;

            _oDcResultsEntity.ServiceId = DataCaptureRequest.ServiceId;

            _oDcResultsEntity.SystemUserId = DataCaptureRequest.SystemUserId;
            _oDcResultsEntity.UserName = DataCaptureRequest.UserName;

            _oDcResultsEntity.ShiftId = DataCaptureRequest.ShiftId;
            _oDcResultsEntity.ShiftName = DataCaptureRequest.ShiftName;

            _oDcResultsEntity.IsSynchronized = "false";

            _oDcResultsEntity.StartDate = DataCaptureRequest.DcStartDate;

            _oDcResultsEntity.IsSubmit = "false";
            _oDcResultsEntity.SubmitDate = "";
            _oDcResultsEntity.SubmitedUserId = DataCaptureRequest.SystemUserId;
            _oDcResultsEntity.AnonymousUserId = 0;

            _oDcResultsEntity.ApprovalStatus = oDCApprovalStatusEnum.NONE;

            _oDcResultsEntity.IsDynamicAttribute = "false";
            _oDcResultsEntity.IsDynamicAnswer = "false";
            _oDcResultsEntity.IsMultiMediaAttached = 'false';

            _oDcResultsEntity.Comments = (LVDCSummary != undefined) ? ((LVDCSummary.CommentsInfo.IsModified == true) ? LVDCSummary.CommentsInfo.Comments : "") : "";

            _oDcResultsEntity.CreatedDate = DataCaptureRequest.CurrenntDateAndTime;
            _oDcResultsEntity.LastUpdatedDate = DataCaptureRequest.CurrenntDateAndTime;

            OneViewConsole.Debug("GetDcResultsEntity End", "LVDataCaptureBO.GetDcResultsEntity");

            return _oDcResultsEntity;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetDcResultsEntity", Excep);
        }
        finally {
            _oDcResultsEntity = null;
            CurrenntDateAndTime = null
        }
    }

    var GetDcResultDetailsEntity = function (DataCaptureRequest, AttributeNodeId, AttributeNodeName, Comments, oAnswerMode, Latitude, Longitude, IsNA, IsBlocker, ESTTime, ActualTime, IsManualESTEnabled) {

        try {
            OneViewConsole.Debug("GetDcResultDetailsEntity Start", "LVDataCaptureBO.GetDcResultDetailsEntity");

            var _oDcResultDetailsEntity = new DcResultDetailsEntity();

            _oDcResultDetailsEntity.ServiceId = DataCaptureRequest.ServiceId;
            _oDcResultDetailsEntity.ClientGuid = OneViewUniqueGenerator.GetGuid();

            _oDcResultDetailsEntity.MobileVersionId = 1;

            _oDcResultDetailsEntity.StartDate = DataCaptureRequest.CurrenntDateAndTime;

            _oDcResultDetailsEntity.IsManual = oAnswerMode.IsManual;
            _oDcResultDetailsEntity.IsSynchronized = "false";

            _oDcResultDetailsEntity.AttributeNodeId = AttributeNodeId;
            _oDcResultDetailsEntity.ControlId = oAnswerMode.ControlId;
            _oDcResultDetailsEntity.AttributeNodeName = AttributeNodeName;

            _oDcResultDetailsEntity.Answer = oAnswerMode.Answer;
            _oDcResultDetailsEntity.AnswerValue = oAnswerMode.AnswerValue;
            _oDcResultDetailsEntity.AnswerFKType = (oAnswerMode.AnswerFKType != undefined) ? oAnswerMode.AnswerFKType : "";
            _oDcResultDetailsEntity.AnswerDataType = oAnswerMode.AnswerDataType;
            _oDcResultDetailsEntity.AnswerMode = oAnswerMode.AnswerMode;

            _oDcResultDetailsEntity.IsDynamicAttribute = oAnswerMode.IsDynamicAttribute;
            _oDcResultDetailsEntity.IsDynamicAnswer = oAnswerMode.IsDynamicAnswer;

            _oDcResultDetailsEntity.IndexId = oAnswerMode.IndexId;
            _oDcResultDetailsEntity.IsMulti = oAnswerMode.IsMulti;

            _oDcResultDetailsEntity.Latitude = Latitude;
            _oDcResultDetailsEntity.Longitude = Longitude;

            _oDcResultDetailsEntity.Comments = Comments;

            _oDcResultDetailsEntity.Score = oAnswerMode.Score;
            _oDcResultDetailsEntity.MaxScore = oAnswerMode.MaxScore;
            _oDcResultDetailsEntity.Percentage = oAnswerMode.Percentage;
            _oDcResultDetailsEntity.CompletedChildCount = oAnswerMode.CompletedChildCount;
            _oDcResultDetailsEntity.TotalChildCount = oAnswerMode.TotalChildCount;
            _oDcResultDetailsEntity.CompletedAttributeCount = oAnswerMode.CompletedAttributeCount;
            _oDcResultDetailsEntity.TotalAttributeCount = oAnswerMode.TotalAttributeCount;

            _oDcResultDetailsEntity.IsNA = IsNA;
            _oDcResultDetailsEntity.IsBlocker = IsBlocker;

            _oDcResultDetailsEntity.ESTTime = ESTTime;
            _oDcResultDetailsEntity.ActualTime = ActualTime;
            _oDcResultDetailsEntity.IsManualESTEnabled = IsManualESTEnabled;
            _oDcResultDetailsEntity.IsMultiMediaAttached = 'false';

            _oDcResultDetailsEntity.CreatedDate = DataCaptureRequest.CurrenntDateAndTime;
            _oDcResultDetailsEntity.LastUpdatedDate = DataCaptureRequest.CurrenntDateAndTime;

            OneViewConsole.Debug("GetDcResultDetailsEntity End", "LVDataCaptureBO.GetDcResultDetailsEntity");

            return _oDcResultDetailsEntity;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetDcResultDetailsEntity", Excep);
        }
        finally {
            _oDcResultDetailsEntity = null;
            CurrenntDateAndTime = null
        }
    }

    var GetDCBlockerInfoEntity = function (DataCaptureRequest, DataCaptureClientGuid, DcResultsClientGuid, DcResultDetailsClientGuid, DCBlockerDataCaptureClientGuid) {

        try {
            OneViewConsole.Debug("GetDCBlockerInfoEntity Start", "LVDataCaptureBO.GetDCBlockerInfoEntity");

            var _oDCBlockerInfoEntity = new DCBlockerInfoEntity();

            _oDCBlockerInfoEntity.ClientGuid = OneViewUniqueGenerator.GetGuid();
            _oDCBlockerInfoEntity.MobileVersionId = 1;

            _oDCBlockerInfoEntity.ServiceId = DataCaptureRequest.ServiceId;

            _oDCBlockerInfoEntity.DataCaptureClientGuid = DataCaptureClientGuid;
            _oDCBlockerInfoEntity.DcResultsClientGuid = DcResultsClientGuid;
            _oDCBlockerInfoEntity.DcResultDetailsClientGuid = DcResultDetailsClientGuid;
            _oDCBlockerInfoEntity.DCBlockerDataCaptureClientGuid = DCBlockerDataCaptureClientGuid;

            _oDCBlockerInfoEntity.CreatedDate = DataCaptureRequest.CurrenntDateAndTime;
            _oDCBlockerInfoEntity.IsSynchronized = "false";
            _oDCBlockerInfoEntity.IsDisable = "false";

            OneViewConsole.Debug("GetDCBlockerInfoEntity End", "LVDataCaptureBO.GetDCBlockerInfoEntity");

            return _oDCBlockerInfoEntity;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.GetDCBlockerInfoEntity", Excep);
        }
        finally {

        }
    }

    this.LoadTemplateResult = function (DcId, DcUserId, AnswerModeLoadType) {

        try {
            OneViewConsole.Debug("LoadTemplateResult Start", "LVDataCaptureBO.LoadTemplateResult");

            var IsSuccess = true;

            var _oDcDAO = new DcDAO();
            var Dc = _oDcDAO.GetDCById(DcId);

            LVDataCaptureId = Dc.Id;
            LVDcResultsId = 0;
            LVDataCaptureClientGuid = Dc.ClientGuid;
            LVDcResultsClientGuid = "";

            var DcResultDetailsForDcUser = {};
            for (var i = 0; i < Dc.DcResultsEntitylist.length; i++) {

                if (Dc.DcResultsEntitylist[i].SystemUserId == DcUserId) {

                    LVDcResultsId = Dc.DcResultsEntitylist[i].Id;
                    LVDcResultsClientGuid = Dc.DcResultsEntitylist[i].ClientGuid;

                    for (var j = 0; j < Dc.DcResultsEntitylist[i].DcResultDetailsEntityList.length; j++) {

                        var DcResultsDetails = Dc.DcResultsEntitylist[i].DcResultDetailsEntityList[j];
                        DcResultDetailsForDcUser[DcResultsDetails.ControlId] = { "ClientId": DcResultsDetails.Id, "ServerId": DcResultsDetails.ServerId };
                    }
                }
            }

            SetDcComments(Dc.DcResultsEntitylist, AnswerModeLoadType, DcUserId);

            var result = new DcDAO().GetDCResultDetailsByDCIdForLV(DcId);
            var DcResultDetails = GetDCByDCId(result);
            //alert(JSON.stringify(DcResultDetails));

            for (var i = 0; i < DcResultDetails.length; i++) {

                var oAttribute = DcResultDetails[i];

                LVTemplateResult[oAttribute.AttributeNodeId] = {
                    IsAttributeGroup: false,
                    NA: false,
                    IsBlocker: false,
                    Comments: "",
                    Id: oAttribute.AttributeNodeId,
                    Name: oAttribute.AttributeNodeName,
                    Answers: [],
                    ESTTime: 0,
                    ActualTime: 0,
                    IsManualESTEnabled: true,
                    MultiMediaSubElements: [],
                    ActionInfo: { ActionClientId: "", DCNCMappingClientId: "", Actions: {} },
                    IsSubmitMandatoryExist: false,
                    IsSaveMandatoryExist: false,
                    SaveMandatoryInfo: {},
                    SubmitMandatoryInfo: {}
                }

                for (var j = 0; j < oAttribute.Controls.length; j++) {

                    var oControl = oAttribute.Controls[j];
                    var oFinalAnswer = GetFinalAnswerToShow(oControl.Answers, AnswerModeLoadType, DcUserId);

                    var ServerId = "";
                    var ClientId = "";

                    if (oFinalAnswer != null) {

                        if (oFinalAnswer.AnswerMode == "") {
                            ServerId = oFinalAnswer.ServerId;
                            ClientId = oFinalAnswer.ClientId;
                        }
                        else {
                            var oCurrentUserAnswer = DcResultDetailsForDcUser[oFinalAnswer.ControlId];

                            if (oCurrentUserAnswer != undefined) {
                                ServerId = oCurrentUserAnswer.ServerId;
                                ClientId = oCurrentUserAnswer.ClientId;
                            }
                        }

                        //alert(JSON.stringify(oFinalAnswer));

                        var Answer = {
                            "ServerId": ServerId,
                            "ClientId": ClientId,
                            "ClientGuid": oFinalAnswer.ClientGuid,
                            "Comments": oFinalAnswer.Comments,
                            "ControlId": oFinalAnswer.ControlId,
                            "Answer": oFinalAnswer.Answer,
                            "AnswerValue": oFinalAnswer.AnswerValue,
                            "AnswerFKType": oFinalAnswer.AnswerFKType,
                            "AnswerDataType": oFinalAnswer.AnswerDataType,
                            "AnswerMode": oFinalAnswer.AnswerMode,
                            "IsModified": false,
                            "IsManual": (oFinalAnswer.IsManual == 'true') ? true : false,
                            "IsDynamicAttribute": (oFinalAnswer.IsDynamicAttribute == 'true') ? true : false,
                            "IsDynamicAnswer": (oFinalAnswer.IsDynamicAnswer == 'true') ? true : false,
                            "IndexId": oFinalAnswer.IndexId,
                            "IsMulti": (oFinalAnswer.IsMulti == 'true') ? true : false,
                            "AutomaticDeviceId": oFinalAnswer.AutomaticDeviceId,
                            "Score": oFinalAnswer.Score,
                            "MaxScore": oFinalAnswer.MaxScore,
                            "Percentage": oFinalAnswer.Percentage,
                            "CompletedChildCount": oFinalAnswer.CompletedChildCount,
                            "TotalChildCount": oFinalAnswer.TotalChildCount,
                            "CompletedAttributeCount": oFinalAnswer.CompletedAttributeCount,
                            "TotalAttributeCount": oFinalAnswer.TotalAttributeCount
                        }

                        LVTemplateResult[oAttribute.AttributeNodeId].Comments = oFinalAnswer.Comments;
                        LVTemplateResult[oAttribute.AttributeNodeId].NA = (oFinalAnswer.IsNA == 'true') ? true : false,
                        LVTemplateResult[oAttribute.AttributeNodeId].IsBlocker = (oFinalAnswer.IsBlocker == 'true') ? true : false,
                        LVTemplateResult[oAttribute.AttributeNodeId].IsAttributeGroup = (oFinalAnswer.IsAttributeGroup == 'true') ? true : false;
                        LVTemplateResult[oAttribute.AttributeNodeId].ESTTime = oFinalAnswer.ESTTime;
                        LVTemplateResult[oAttribute.AttributeNodeId].ActualTime = oFinalAnswer.ActualTime;
                        LVTemplateResult[oAttribute.AttributeNodeId].IsManualESTEnabled = (oFinalAnswer.IsManualESTEnabled == 'true') ? true : false;
                        LVTemplateResult[oAttribute.AttributeNodeId].Answers.push(Answer);

                        oAnswerModeComponent.RefreshMandatoryInfo(oAttribute.AttributeNodeId, oFinalAnswer.ControlId);
                        oAnswerModeComponent.UpdateMandatoryInfoCurrentStatus(oAttribute.AttributeNodeId, oFinalAnswer.ControlId);

                        //alert(JSON.stringify(LVTemplateResult[oAttribute.AttributeNodeId]));
                    }
                    else {
                        IsSuccess = false;

                        OneViewConsole.Debug("LoadTemplateResult End", "LVDataCaptureBO.LoadTemplateResult");

                        return IsSuccess;
                    }
                }
            }

            //alert(JSON.stringify(LVTemplateResult));
            //alert(LVDcResultsId);

            var _oActionDAO = new ActionDAO();
            var ActionDCNCMappings = _oActionDAO.GetAllActions(LVDataCaptureClientGuid);

            //alert(JSON.stringify(ActionDCNCMappings));

            for (var i = 0; i < ActionDCNCMappings.length; i++) {

                if (ActionDCNCMappings[i] != undefined) {
                    if (LVActionResult[ActionDCNCMappings[i].RuleId] != undefined) {
                        LVActionResult[ActionDCNCMappings[i].RuleId].Actions.push({
                            "PreDefinedActionId": (ActionDCNCMappings[i].CustomAction != "") ? 0 : ActionDCNCMappings[i].PreDefinedActionId,
                            "Name": ActionDCNCMappings[i].CustomAction,
                            "ActionDetailsClientId": ActionDCNCMappings[i].ActionDetailsClientId,
                            "IsDisable": false,
                            "ActionType": (ActionDCNCMappings[i].CustomAction != "") ? LVActionType.CustomAction : LVActionType.PredefinedAction,
                            "ActionDetailsServerId": ActionDCNCMappings[i].ActionDetailsServerId,
                        });
                    }
                    else {
                        LVActionResult[ActionDCNCMappings[i].RuleId] = {
                            "IsDisable": false,
                            "IsNC": (ActionDCNCMappings[i].IsNC == "true") ? true : false,
                            "IsObservation": (ActionDCNCMappings[i].IsObservation == "true") ? true : false,
                            "IsManualRule": (ActionDCNCMappings[i].IsManualRule == "true") ? true : false,
                            "ActionClientId": ActionDCNCMappings[i].ActionClientId,
                            "ActionClientGuid": ActionDCNCMappings[i].ActionClientGuid,
                            "DCNCMappingClientId": ActionDCNCMappings[i].DCNCMappingClientId,
                            "DNNCMappimgServerId": ActionDCNCMappings[i].DNNCMappimgServerId,
                            "TemplateNodeIds": ActionDCNCMappings[i].TemplateNodeIds,
                            "Actions": [
                                {
                                    "PreDefinedActionId": (ActionDCNCMappings[i].CustomAction != "") ? 0 : ActionDCNCMappings[i].PreDefinedActionId,
                                    "Name": ActionDCNCMappings[i].CustomAction,
                                    "ActionDetailsClientId": ActionDCNCMappings[i].ActionDetailsClientId,
                                    "IsDisable": false,
                                    "ActionType": (ActionDCNCMappings[i].CustomAction != "") ? LVActionType.CustomAction : LVActionType.PredefinedAction,
                                    "ActionDetailsServerId": ActionDCNCMappings[i].ActionDetailsServerId,
                                }
                            ],
                            "MultimediaSubElements": []
                        };
                    }
                }
            }

            //alert(JSON.stringify(LVActionResult));

            OneViewConsole.Debug("LoadTemplateResult End", "LVDataCaptureBO.LoadTemplateResult");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.LoadTemplateResult", Excep);
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
                FinalAnswer = GetLastUpdatedAnswer(AnswerLst);
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

    var SetDcComments = function (DcResultsEntitylist, AnswerModeLoadType, DcUserId) {
        try {
            OneViewConsole.Debug("SetDcComments Start", "LVDataCaptureBO.SetDcComments");

            var DcResult = GetFinalAnswerToShow(DcResultsEntitylist, AnswerModeLoadType, DcUserId);

            new LVShiftHandler().SetAndSaveShift(DcResult.ShiftId, DcResult.ShiftName);

            LVDCSummary.CommentsInfo.Comments = DcResult.Comments;

            OneViewConsole.Debug("SetDcComments End", "LVDataCaptureBO.SetDcComments");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.SetDcComments", Excep);
        }
        finally {
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

    var UpdateCompletedAndSubmitStatus = function (LVDataCaptureId, IsVallidationSuccess, IsSubmit) {

        try {
            OneViewConsole.Debug("UpdateCompletedAndSubmitStatus Start", "LVDataCaptureBO.UpdateCompletedAndSubmitStatus");

            var _oOneViewSqlitePlugin = new OneViewSqlitePlugin();

            var _DateTime = new DateTime();
            var CurrenntDateAndTime = _DateTime.GetDateAndTime();

            var IsCompleted = IsVallidationSuccess;

            var DataCaptureUpdateQuery = "UPDATE DataCaptureEntity SET IsCompleted='" + IsCompleted + "',IsSubmit='" + IsSubmit + "',SubmitDate='" + CurrenntDateAndTime + "' WHERE Id=" + LVDataCaptureId;

            _oOneViewSqlitePlugin.ExcecuteSql(DataCaptureUpdateQuery);

            OneViewSessionStorage.Save("IsDcCompletedBeforeEdit", IsCompleted);

            OneViewConsole.Debug("UpdateCompletedAndSubmitStatus End", "LVDataCaptureBO.UpdateCompletedAndSubmitStatus");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LVDataCaptureBO.UpdateCompletedAndSubmitStatus", Excep);
        }
        finally {

        }
    }

}

function PeriodicDefaultCameraAnswerModeComponent(TemplateId, AttributeId, ControlId) {

    var MyInstance = this;

    this.GetHtml = function () {
        try {
            OneViewConsole.Debug("GetHtml Start", "PeriodicDefaultCameraAnswerModeComponent.GetHtml");
            var CtrlId = "'" + ControlId + "'";
            var ImageHtml = MyInstance.GetImageHtml();
            var  InsertPhoto = oXlatService.xlat('Insert Photo');
           // var Html = '<div class="item-left-edit visible active" id="DivImage_"' + TemplateId + '><button class="button" onclick="new PeriodicDefaultCameraAnswerModeComponent().CaptureImage();"><i style="color:#b3b3b3;" class="icon icon-camera"></i></button></div>';
            var Html = '   <div class="col rounded light-bg" id="Div_' + ControlId + '">' +
                                '<div class="item item-button-right no-margin" style="padding: 0px 210px 0px 0px; border:0px;">' +
                                   ' <div class="field-item">' +
                                       ' <label>' +
                                           ' <span>' + InsertPhoto + '</span>' +
                                           ' <input type="text" id="txtInsertPhotoControlId" readonly="true">' +
                                       ' </label>' +
                                   ' </div>' +
                                  ' <div id="DivImage_' + ControlId + '">' +
                                  ImageHtml +
                                 ' </div>'+
                                   ' <div class="button no-padding" style="right: 75px; border:0px;" onclick="new PeriodicDefaultCameraAnswerModeComponent(' + TemplateId + ',' + AttributeId + ',' + CtrlId + ').CaptureImage();">' +
                                      '  <a class="button button-calm" style="padding: 9px 20px;"><i class="icon icon-camera"></i></a>'+
                                   ' </div>'+
                                  '  <div class="button no-padding" style="right: 5px; border:0px;" onclick="new PeriodicDefaultCameraAnswerModeComponent(' + TemplateId + ',' + AttributeId + ',' + CtrlId + ').DeleteImage();">' +
                                       ' <a class="button button-calm" style="padding: 9px 20px;"><i class="icon icon-cancel-circle"></i></a>'+
                                   ' </div>'+
                               ' </div>'+
                            '</div>';

            OneViewConsole.Debug("GetHtml End", "PeriodicDefaultCameraAnswerModeComponent.GetHtml");
            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultCameraAnswerModeComponent.GetHtml", Excep);
        }
    }

    this.GetImageHtml = function () {
        try {
            OneViewConsole.Debug("GetImageHtml Start", "PeriodicDefaultCameraAnswerModeComponent.GetImageHtml");

            var Html = '';
            var SelectionType = GetSelectionType();

            var MultiMediaSubElementsAnswerModeDict = CompleteMultiMediaSubElementsAnswerModeDict[TemplateId];
            if (MultiMediaSubElementsAnswerModeDict != undefined) {
                var AttributeWiseMultiMediaSubElementsAnswerModeDict = MultiMediaSubElementsAnswerModeDict[AttributeId];
                if (AttributeWiseMultiMediaSubElementsAnswerModeDict != undefined) {
                    var MultiMediaSubElementsAnswerModeList = AttributeWiseMultiMediaSubElementsAnswerModeDict[ControlId];
                    if (SelectionType == 1) {
                        alert("Multiple image capture not implemented");
                    }
                    else {
                        if (MultiMediaSubElementsAnswerModeList.length > 1) {
                            for (var i = 0; i < MultiMediaSubElementsAnswerModeList.length ; i++) {
                                if (MultiMediaSubElementsAnswerModeList[i].IsDisabled != true) {
                                    Html += GetImageHtml(ControlId, MultiMediaSubElementsAnswerModeList[i].LocalURL);
                                        break; //only image saved
                                }
                            }
                        }
                        else if (MultiMediaSubElementsAnswerModeList.length == 1) {
                            Html += GetImageHtml(ControlId, MultiMediaSubElementsAnswerModeList[0].LocalURL);
                        }
                    }
                }
            }
         
            OneViewConsole.Debug("GetImageHtml End", "PeriodicDefaultCameraAnswerModeComponent.GetImageHtml");
            //alert('Html : ' + Html);
            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultCameraAnswerModeComponent.GetImageHtml", Excep);
        }
    }

    var GetImageHtml = function (ControlId, LocalURL) {
        try {
            OneViewConsole.Debug("GetImageHtml Start", "PeriodicDefaultCameraAnswerModeComponent.GetImageHtml");
           
            var Html = ' <a id="Image_' + ControlId + '" href="' + LocalURL + '" class="angularbox" rel="' + LocalURL + '">' +
                                                     ' <img src="' + LocalURL + '" alt="No Image" style="margin: 0px 0px 0px 0px; border: 1px #ccc solid; padding: 0px;height:52px;width:52px"  />' +
                                                 ' </a>';
                       
            // button no-padding" style="right: 145px; border:0px;
            OneViewConsole.Debug("GetImageHtml End", "PeriodicDefaultCameraAnswerModeComponent.GetImageHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultCameraAnswerModeComponent.GetImageHtml", Excep);
        }
    }

    
    this.CaptureImage = function () {
        try {
            OneViewConsole.Debug("AttachImage Start", "PeriodicDefaultCameraAnswerModeComponent.AttachImage");
           
            var _oOneViewCordovaCameraPlugin = new OneViewCordovaCameraPlugin();
            _oOneViewCordovaCameraPlugin.CaptureImage(function (_ImageURL) {
                MyInstance.UpdateAnswerModel(_ImageURL);
            });

            OneViewConsole.Debug("AttachImage End", "PeriodicDefaultCameraAnswerModeComponent.AttachImage");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultCameraAnswerModeComponent.AttachImage", Excep);
        }
    }
    
    this.UpdateAnswerModel = function (_ImageURL) {
        try {
            OneViewConsole.Debug("UpdateAnswerModel Start", "PeriodicDefaultCameraAnswerModeComponent.UpdateAnswerModel");
           
            var SelectionType = GetSelectionType();
            var MultiMediaSubElementsAnswerMode = null;

            var MultiMediaSubElementsAnswerModeDict = CompleteMultiMediaSubElementsAnswerModeDict[TemplateId];
            if (MultiMediaSubElementsAnswerModeDict != undefined) {
                var AttributeWiseMultiMediaSubElementsAnswerModeDict = MultiMediaSubElementsAnswerModeDict[AttributeId];
                if (AttributeWiseMultiMediaSubElementsAnswerModeDict != undefined) {
                    var MultiMediaSubElementsAnswerModeList = AttributeWiseMultiMediaSubElementsAnswerModeDict[ControlId];
                    if (MultiMediaSubElementsAnswerModeList != undefined && MultiMediaSubElementsAnswerModeList != null && MultiMediaSubElementsAnswerModeList.length != 0) {
                        if (SelectionType == 0) {
                            var IsUpdated = false;
                            if (MultiMediaSubElementsAnswerModeList.length > 1) {
                                for (var i = 0; i < MultiMediaSubElementsAnswerModeList.length ; i++) {
                                    UpdateMultiMediaElement(i, _ImageURL, MultiMediaSubElementsAnswerModeList, IsUpdated);
                                }
                            }
                            else if (MultiMediaSubElementsAnswerModeList.length == 1) {
                                UpdateMultiMediaElement(0, _ImageURL, MultiMediaSubElementsAnswerModeList, IsUpdated);
                            }
                            
                        }
                        else if (SelectionType == 1) {
                            alert("Multiple image capture not implemented");
                        }
                    }
                    else {
                        MultiMediaSubElementsAnswerModeList = [];
                        MultiMediaSubElementsAnswerMode = CreateMultiMediaElement(_ImageURL);
                        MultiMediaSubElementsAnswerModeList.push(MultiMediaSubElementsAnswerMode);
                    }
                }
                else {
                    var AttributeWiseMultiMediaSubElementsAnswerModeDict = {};
                    MultiMediaSubElementsAnswerMode = CreateMultiMediaElement(_ImageURL);
                    AttributeWiseMultiMediaSubElementsAnswerModeDict[AttributeId][ControlId].push(MultiMediaSubElementsAnswerMode);
                }
                
            }
            else {
                var AttributeWiseMultiMediaSubElementsAnswerModeDict = {};
                MultiMediaSubElementsAnswerMode = CreateMultiMediaElement(_ImageURL);
                var MultiMediaSubElementsAnswerModeList = [];
                MultiMediaSubElementsAnswerModeList.push(MultiMediaSubElementsAnswerMode);
                var ControlWiseMultiMediaSubElementsAnswerModeDict = {};
                ControlWiseMultiMediaSubElementsAnswerModeDict[ControlId] = MultiMediaSubElementsAnswerModeList;
                AttributeWiseMultiMediaSubElementsAnswerModeDict[AttributeId] = ControlWiseMultiMediaSubElementsAnswerModeDict;
                
                CompleteMultiMediaSubElementsAnswerModeDict[TemplateId] = AttributeWiseMultiMediaSubElementsAnswerModeDict;
            }

            var ImageDOM = document.getElementById("Image_" + TemplateId);
          
            if (ImageDOM != null) {
                document.getElementById("Image_" + TemplateId).src = _ImageURL;
            }
            else {
                var Html = GetImageHtml(ControlId, _ImageURL);
                var DivId = '' + 'DivImage_' + ControlId + '';
                var Div = document.getElementById(DivId);
                Div.innerHTML = "";
              //  Div.innerHTML = Html;

                var _oOneViewCompiler = new OneViewCompiler();
                _oOneViewCompiler.CompileAndApeend(oScope, oCompile, Html, DivId);

            }

            //alert('CompleteMultiMediaSubElementsAnswerModeDict : ' + JSON.stringify(CompleteMultiMediaSubElementsAnswerModeDict));
            OneViewConsole.Debug("UpdateAnswerModel End", "PeriodicDefaultCameraAnswerModeComponent.UpdateAnswerModel");
        }
        catch (Excep) {
            alert("PeriodicDefaultCameraAnswerModeComponent.UpdateAnswerModel : " + Excep);
            alert("PeriodicDefaultCameraAnswerModeComponent.UpdateAnswerModel 22 : " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultCameraAnswerModeComponent.UpdateAnswerModel", Excep);
        }

    }

    var CreateMultiMediaElement = function (_ImageURL) {
        try {
            OneViewConsole.Debug("CreateMultiMediaElement Start", "PeriodicDefaultCameraAnswerModeComponent.CreateMultiMediaElement");

            var MultiMediaElement = {
                "Id": 0,
                "ServerId": 0,
                "MappedEntityClientGuid": "",//""
                "Dimension": DATEntityType.DCResultDetails,
                "MultiMediaType": "image/jpg",
                "LocalURL": _ImageURL,
                "Comments": "",
                "IsDisabled": false,
            };

            OneViewConsole.Debug("CreateMultiMediaElement End", "PeriodicDefaultCameraAnswerModeComponent.CreateMultiMediaElement");
            return MultiMediaElement;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultCameraAnswerModeComponent.CreateMultiMediaElement", Excep);
        }
    }

    var UpdateMultiMediaElement = function (i, _ImageURL, MultiMediaSubElementsAnswerModeList, IsUpdated) {
        try {
            OneViewConsole.Debug("UpdateMultiMediaElement Start", "PeriodicDefaultCameraAnswerModeComponent.UpdateMultiMediaElement");
            
            var MultiMediaSubElements = MultiMediaSubElementsAnswerModeList[i];

            if (MultiMediaSubElements.Id == 0) {
                IsUpdated = true;
                MultiMediaSubElements.LocalURL = _ImageURL; //only image saving
            }
            else if (MultiMediaSubElements.ServerId == 0) {
                MultiMediaSubElements.IsDisabled = true; //disabling old images
            }

            if ((MultiMediaSubElementsAnswerModeList.length == (i + 1)) && IsUpdated != true) {
                MultiMediaSubElementsAnswerModeList.push(CreateMultiMediaElement(_ImageURL));
            }
                       
            OneViewConsole.Debug("UpdateMultiMediaElement End", "PeriodicDefaultCameraAnswerModeComponent.UpdateMultiMediaElement");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultCameraAnswerModeComponent.UpdateMultiMediaElement", Excep);
        }
    }

    this.DeleteImage = function () {
        try {
            OneViewConsole.Debug("DeleteImage Start", "PeriodicDefaultCameraAnswerModeComponent.DeleteImage");
            
            var IsDelete = CheckAnyImageAvailable();
            if (IsDelete == true) {
                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                oOneViewCordovaPlugin.DefaultConfirmBox(oXlatService.xlat("Confirmation"), oXlatService.xlat("Are you sure you want to delete ?"), function (ConfirmationId) {

                    if (ConfirmationId == '2') {
                        DeleteImage();
                    }
                });
            }
            else {
                navigator.notification.alert(xlatService.xlat('No Image Available'), ['OK'], "");
            }
            OneViewConsole.Debug("DeleteImage End", "PeriodicDefaultCameraAnswerModeComponent.DeleteImage");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultCameraAnswerModeComponent.DeleteImage", Excep);
        }
    }


    var DeleteImage = function () {
        try {
            OneViewConsole.Debug("DeleteImage Start", "PeriodicDefaultCameraAnswerModeComponent.DeleteImage");
            
            var SelectionType = GetSelectionType();
            if (SelectionType == 1) {
                alert("Multiple image capture not implemented");
            }
            else {
                var MultiMediaSubElementsAnswerModeDict = CompleteMultiMediaSubElementsAnswerModeDict[TemplateId];

                if (MultiMediaSubElementsAnswerModeDict != undefined) {
                    var AttributeWiseMultiMediaSubElementsAnswerModeDict = MultiMediaSubElementsAnswerModeDict[AttributeId];
                    if (AttributeWiseMultiMediaSubElementsAnswerModeDict != undefined) {
                        var MultiMediaSubElementsAnswerModeList = AttributeWiseMultiMediaSubElementsAnswerModeDict[ControlId];
                        if (MultiMediaSubElementsAnswerModeList != undefined) {
                            if (MultiMediaSubElementsAnswerModeList.length > 1) {
                                for (var i = 0; i < MultiMediaSubElementsAnswerModeList.length ; i++) {
                                    DeleteMultiMediaElement(MultiMediaSubElementsAnswerModeList, i);
                                }
                            }
                            else if (MultiMediaSubElementsAnswerModeList.length == 1) {
                                DeleteMultiMediaElement(MultiMediaSubElementsAnswerModeList, 0);
                            }
                        }
                    }
                }
              
                if (MultiMediaSubElementsAnswerModeList == undefined || MultiMediaSubElementsAnswerModeList.length == 0) {
                    CompleteMultiMediaSubElementsAnswerModeDict[TemplateId] = undefined;
                    MyInstance.ClearControl(ControlId);
                    //var DivId = '' + 'DivImage_' + ControlId + '';
                    //var Div = document.getElementById(DivId);
                    //Div.innerHTML = "";
                }
                else if (MultiMediaSubElementsAnswerModeList.length == 1) {
                    if (MultiMediaSubElementsAnswerModeList[0].ServerId != 0 && MultiMediaSubElementsAnswerModeList[0].IsDisabled == true) {
                        CompleteMultiMediaSubElementsAnswerModeDict[TemplateId] = undefined;
                        MyInstance.ClearControl(ControlId);
                    }
                }
            }
                       

            OneViewConsole.Debug("DeleteImage End", "PeriodicDefaultCameraAnswerModeComponent.DeleteImage");
        }
        catch (Excep) {
            alert("PeriodicDefaultCameraAnswerModeComponent.DeleteImage : " + Excep);
            alert("PeriodicDefaultCameraAnswerModeComponent.DeleteImage 22 : " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultCameraAnswerModeComponent.DeleteImage", Excep);
        }
    }

    var CheckAnyImageAvailable = function () {
        try {
            OneViewConsole.Debug("CheckAnyImageAvailable Start", "PeriodicDefaultCameraAnswerModeComponent.CheckAnyImageAvailable");

            var IsDelete = false;
            var MultiMediaSubElementsAnswerModeDict = CompleteMultiMediaSubElementsAnswerModeDict[TemplateId];
            if (MultiMediaSubElementsAnswerModeDict != undefined) {
                var AttributeWiseMultiMediaSubElementsAnswerModeDict = MultiMediaSubElementsAnswerModeDict[AttributeId];
                if (AttributeWiseMultiMediaSubElementsAnswerModeDict != undefined) {
                    var MultiMediaSubElementsAnswerModeList = AttributeWiseMultiMediaSubElementsAnswerModeDict[ControlId];

                    for (var i = 0; i < MultiMediaSubElementsAnswerModeList.length ; i++) {
                        if (MultiMediaSubElementsAnswerModeList[i].IsDisabled != true) {
                            IsDelete = true;
                            break;
                        }
                    }


                }
            }

            OneViewConsole.Debug("CheckAnyImageAvailable End", "PeriodicDefaultCameraAnswerModeComponent.CheckAnyImageAvailable");
            return IsDelete;
        }
        catch (Excep) {
            alert("PeriodicDefaultCameraAnswerModeComponent.CheckAnyImageAvailable : " + Excep);
            alert("PeriodicDefaultCameraAnswerModeComponent.CheckAnyImageAvailable 22 : " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultCameraAnswerModeComponent.CheckAnyImageAvailable", Excep);
        }
    }

    var DeleteMultiMediaElement = function (MultiMediaSubElementsAnswerModeList, i) {
        try {
            OneViewConsole.Debug("UpdateMultiMediaElement Start", "PeriodicDefaultCameraAnswerModeComponent.UpdateMultiMediaElement");
            
            if (MultiMediaSubElementsAnswerModeList[i].ServerId == 0) {
                MultiMediaSubElementsAnswerModeList.splice(i, 1);
            }
            else if (MultiMediaSubElementsAnswerModeList[i].ServerId != 0) {
                MultiMediaSubElementsAnswerModeList[i].IsDisabled = true; //disabling old images
            }
            

            OneViewConsole.Debug("UpdateMultiMediaElement End", "PeriodicDefaultCameraAnswerModeComponent.UpdateMultiMediaElement");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultCameraAnswerModeComponent.UpdateMultiMediaElement", Excep);
        }
    }


    var GetSelectionType = function () {
        try {
            OneViewConsole.Debug("GetSelectionType Start", "PeriodicDefaultCameraAnswerModeComponent.GetSelectionType");
            var Child = PTempMData[TemplateId].TemplateConfigMetaDataDetails.Childs[0];
            var SelectionType;
            for (var i = 0; i < Child.AnswerModes.length ; i++) {
                var AnswerMode = Child.AnswerModes[i];
                if (AnswerMode.ControlId == ControlId) {
                    if (AnswerMode.Type == "DCImageCaptureControlConfig") {
                        if (AnswerMode.SelectionType == 0) { //SINGLE
                            SelectionType = 0;
                        }
                        else if (AnswerMode.SelectionType == 1) { //MULTI
                            SelectionType = 1;
                        }
                        break;
                    }
                }
            }
                       
            OneViewConsole.Debug("GetSelectionType End", "PeriodicDefaultCameraAnswerModeComponent.GetSelectionType");

            return SelectionType;
        }
        catch (Excep) {
            alert("PeriodicDefaultCameraAnswerModeComponent.GetSelectionType : " + Excep);
            alert("PeriodicDefaultCameraAnswerModeComponent.GetSelectionType 22 : " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultCameraAnswerModeComponent.GetSelectionType", Excep);
        }
    }

    this.Clear = function () {
        try {
            OneViewConsole.Debug("Clear Start", "PeriodicDefaultCameraAnswerModeComponent.Clear");

            MyInstance.ClearAnswerModel();

            OneViewConsole.Debug("Clear End", "PeriodicDefaultCameraAnswerModeComponent.Clear");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultCameraAnswerModeComponent.Clear", Excep);
        }

    }


    this.ClearAnswerModel = function () {

        try {
            OneViewConsole.Debug("ClearAnswerModel Start", "PeriodicDefaultCameraAnswerModeComponent.ClearAnswerModel");

            //alert("AttributeId : " + AttributeId + ", ControlId : " + ControlId);
            DeleteImage();

            var _oPeriodicDefaultAnswerModeComponent = new PeriodicDefaultAnswerModeComponent(TemplateId, AttributeId, ControlId);
            _oPeriodicDefaultAnswerModeComponent.ClearAnswerModel(AttributeId, ControlId);

            OneViewConsole.Debug("ClearAnswerModel End", "PeriodicDefaultCameraAnswerModeComponent.ClearAnswerModel");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultCameraAnswerModeComponent.ClearAnswerModel", Excep);
        }
        finally {
            AllObj = null;
            CurrentObj = null;
        }
    }

    this.ClearControl = function (ControlId) {
        try {
            OneViewConsole.Debug("UpdateAnswerUI Start", "PeriodicDefaultCameraAnswerModeComponent.UpdateAnswerUI");
            
            var DivId = '' + 'DivImage_' + ControlId + '';
            var DOMObj = document.getElementById(DivId);
            if (DOMObj != null) {
                DOMObj.innerHTML = "";
            }

            OneViewConsole.Debug("UpdateAnswerUI End", "PeriodicDefaultCameraAnswerModeComponent.UpdateAnswerUI");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultCameraAnswerModeComponent.UpdateAnswerUI", Excep);
        }
    }

    this.GetAnswer = function () {
        try {
            OneViewConsole.Debug("GetAnswer Start", "PeriodicDefaultCameraAnswerModeComponent.GetAnswer");

            var SelectionType = GetSelectionType();
            var LocalURL = "";

            var MultiMediaSubElementsAnswerModeDict = CompleteMultiMediaSubElementsAnswerModeDict[TemplateId];
            if (MultiMediaSubElementsAnswerModeDict != undefined) {
                var AttributeWiseMultiMediaSubElementsAnswerModeDict = MultiMediaSubElementsAnswerModeDict[AttributeId];
                if (AttributeWiseMultiMediaSubElementsAnswerModeDict != undefined) {
                    var MultiMediaSubElementsAnswerModeList = AttributeWiseMultiMediaSubElementsAnswerModeDict[ControlId];
                    if (MultiMediaSubElementsAnswerModeList != undefined && MultiMediaSubElementsAnswerModeList != null && MultiMediaSubElementsAnswerModeList.length != 0) {
                        if (SelectionType == 0) {
                            if (MultiMediaSubElementsAnswerModeList.length > 1) {
                                for (var i = 0; i < MultiMediaSubElementsAnswerModeList.length ; i++) {
                                    var MultiMediaSubElementsAnswerMode = MultiMediaSubElementsAnswerModeList[i];
                                    if (MultiMediaSubElementsAnswerMode.IsDisabled != true && MultiMediaSubElementsAnswerMode.IsDisabled != 'true') {
                                        LocalURL = MultiMediaSubElementsAnswerMode.LocalURL;
                                        break;
                                    }

                                }
                            }
                            else if (MultiMediaSubElementsAnswerModeList.length == 1) {
                                var MultiMediaSubElementsAnswerMode = MultiMediaSubElementsAnswerModeList[0];
                                if (MultiMediaSubElementsAnswerMode.IsDisabled != true && MultiMediaSubElementsAnswerMode.IsDisabled != 'true') {
                                    LocalURL = MultiMediaSubElementsAnswerMode.LocalURL;
                                }
                            }
                        }
                        else if (SelectionType == 1) {
                            alert("GetAnswer : Multiple image capture not implemented");
                        }
                    }

                }
            }
            
            OneViewConsole.Debug("GetAnswer End", "PeriodicDefaultCameraAnswerModeComponent.GetAnswer");

            return LocalURL;

        }
        catch (Excep) {
            alert("PeriodicDefaultCameraAnswerModeComponent.GetAnswer 11 : " + Excep);
            alert("PeriodicDefaultCameraAnswerModeComponent.GetAnswer 22 : " + JSON.stringify( Excep));
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultCameraAnswerModeComponent.GetAnswer", Excep);
        }
    }

}



function PlatformPeriodicsDcMultimediaHandler() {

    var MyInstance = this;
    var oDateTime = new DateTime();
    var CurrenntDateAndTime = oDateTime.GetDateAndTime();
    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();


    this.Get = function (MappedEntityClientGuid, Dimension) {

        try {
            OneViewConsole.Debug("Get start", "PeriodicsDcMultimediaEventHandler.Get");

            var Query = "SELECT * FROM MultiMediaSubElements WHERE IsDisabled = 'false' AND MappedEntityClientGuid = '" + MappedEntityClientGuid + "' AND Dimension = '" + Dimension + "'";
            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            return Result;

            OneViewConsole.Debug("Get end", "PeriodicsDcMultimediaEventHandler.Get");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "PeriodicsDcMultimediaEventHandler.Get", Excep);
        }
        finally {
        }
    }

    this.Update = function (oMultiMediaSubElement) {

        try {
            OneViewConsole.Debug("Update start", "PeriodicsDcMultimediaEventHandler.Update");

            if (oMultiMediaSubElement.ServerId != 0) {

                var UpdateQuery = "UPDATE MultiMediaSubElements SET TimeStamp='" + CurrenntDateAndTime + "',IsSynchronized='false',IsDisabled='true' WHERE Id = " + oMultiMediaSubElement.Id;
                _OneViewSqlitePlugin.ExcecuteSql(UpdateQuery);
            }
            else {
                var DeleteQuery = "DELETE FROM MultiMediaSubElements WHERE Id = " + oMultiMediaSubElement.Id;
                _OneViewSqlitePlugin.ExcecuteSql(DeleteQuery);
            }

            OneViewConsole.Debug("Update end", "PeriodicsDcMultimediaEventHandler.Update");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "PeriodicsDcMultimediaEventHandler.Update", Excep);
        }
        finally {
        }
    }

    this.Create = function (oMultiMediaSubElement) {

        try {
            OneViewConsole.Debug("Create start", "PeriodicsDcMultimediaEventHandler.Create");

            var _oMultiMediaSubElements = new MultiMediaSubElements();

            _oMultiMediaSubElements.ClientGuid = OneViewUniqueGenerator.GetGuid();
            _oMultiMediaSubElements.MobileVersionId = 1;
            _oMultiMediaSubElements.ServiceId = OneViewSessionStorage.Get("ServiceId");

            _oMultiMediaSubElements.MappedEntityClientGuid = oMultiMediaSubElement.MappedEntityClientGuid;
            _oMultiMediaSubElements.Dimension = oMultiMediaSubElement.Dimension;
            _oMultiMediaSubElements.MultiMediaType = oMultiMediaSubElement.MultiMediaType;
            _oMultiMediaSubElements.LocalURL = oMultiMediaSubElement.LocalURL;
            _oMultiMediaSubElements.Comments = oMultiMediaSubElement.Comments;

            _oMultiMediaSubElements.CreatedDate = CurrenntDateAndTime;
            _oMultiMediaSubElements.TimeStamp = CurrenntDateAndTime;

            _oMultiMediaSubElements.IsSynchronized = false;
            _oMultiMediaSubElements.IsMultiMediaSynchronized = false;
            _oMultiMediaSubElements.IsDisabled = oMultiMediaSubElement.IsDisabled;

            return _oMultiMediaSubElements;

            OneViewConsole.Debug("Create end", "PeriodicsDcMultimediaEventHandler.Create");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "PeriodicsDcMultimediaEventHandler.Create", Excep);
        }
        finally {
        }
    }
    
    this.Save = function (oMultiMediaSubElement) {

        try {
            OneViewConsole.Debug("Save start", "PeriodicsDcMultimediaEventHandler.Save");

            var NormalizedMultiMediaSubElement = MyInstance.Create(oMultiMediaSubElement);
            var _oDcResultDetailsEntityDAO = new DefaultMasterDAO("MultiMediaSubElements");
            var Result = _oDcResultDetailsEntityDAO.CreateMaster(NormalizedMultiMediaSubElement);

            OneViewConsole.Debug("Save end", "PeriodicsDcMultimediaEventHandler.Save");
            return Result;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "PeriodicsDcMultimediaEventHandler.Save", Excep);
        }
        finally {
        }
    }

    this.UpdateMultiMedia = function (oMultiMediaSubElement) {

        try {
            OneViewConsole.Debug("Update start", "PeriodicsDcMultimediaEventHandler.Update");

            var UpdateQuery = "UPDATE MultiMediaSubElements SET TimeStamp='" + CurrenntDateAndTime + "',LocalURL= '" + oMultiMediaSubElement.LocalURL + "' WHERE Id = " + oMultiMediaSubElement.Id;
            //alert('UpdateQuery : ' + UpdateQuery);
            _OneViewSqlitePlugin.ExcecuteSql(UpdateQuery);

            OneViewConsole.Debug("Update end", "PeriodicsDcMultimediaEventHandler.Update");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "PeriodicsDcMultimediaEventHandler.Update", Excep);
        }
        finally {
        }
    }




}

function PeriodicDefaultDropDownListViewAnswerModeComponent(TemplateId, AttributeId, ControlId) {

    var MyInstance = this;

    this.DataSourceLst = [];
    this.AnswerModeConfig = null;

    this.GetHtml = function () {
        try {
            OneViewConsole.Debug("GetHtml Start", "PeriodicDefaultDropDownListViewAnswerModeComponent.GetHtml");

            var Html = '';
            if (MyInstance.AnswerModeConfig.DisplayMode == 0) {
                Html = GetDropDownHtml();
            }
            else {
                alert("AnswerMode DisplayMode : " + MyInstance.AnswerModeConfig.DisplayMode + " Not implemented exception, PeriodicDefaultDropDownListViewAnswerModeComponent.GetHtml)");
            }

            OneViewConsole.Debug("GetHtml End", "PeriodicDefaultDropDownListViewAnswerModeComponent.GetHtml");
           
            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultDropDownListViewAnswerModeComponent.GetHtml", Excep);
        }

    }

    var GetDropDownHtml = function () {
        try {
            OneViewConsole.Debug("GetHtml Start", "PeriodicDefaultDropDownListViewAnswerModeComponent.GetHtml");

            var AttributeNodeId = "'" + AttributeId + "'";
            var ControlId = "'" + MyInstance.AnswerModeConfig.ControlId + "'";
            var SelectionType = "'" + MyInstance.AnswerModeConfig.SelectionType + "'";

            var Hide = "";
            var style = ' style = "display:' + Hide + '"';

            var Id = MyInstance.AnswerModeConfig.ControlId;
            var Value = '';
            
            var Html = '<div class="row responsive-md" id="Div_' + MyInstance.AnswerModeConfig.ControlId + '" > <div class="col">';
            Html += ' <select id=' + ControlId + style + '" onchange="new PeriodicDefaultDropDownListViewAnswerModeComponent(' + TemplateId + ',' + AttributeId + ',' + ControlId + ').UpdateAnswerModel(this);">';
            Html += MyInstance.GetSelectOptionHtml();

            var Answerlst = MyInstance.GetAnswerList(TemplateId); //Get from model
            
            for (var i = 0; i < MyInstance.DataSourceLst.length; i++) {
                var IsCreated = false;
                var DataSource = MyInstance.DataSourceLst[i];
                for (var j = 0; j < Answerlst.length; j++) {
                    if (Answerlst[j].Answer == DataSource.Id) {
                        Html += MyInstance.GetOptionHtml(true, DataSource);
                        IsCreated = true;
                        break;
                    }
                }
               
                if (IsCreated != true) {
                    Html += MyInstance.GetOptionHtml(false, DataSource);
                }
            }

            Html += '</select></div></div>';
          
            OneViewConsole.Debug("GetHtml End", "PeriodicDefaultDropDownListViewAnswerModeComponent.GetHtml");

            return Html;
        }
        catch (Excep) {
            //alert("PeriodicDefaultDropDownListViewAnswerModeComponent.GetHtml" + Excep);
            //alert("PeriodicDefaultDropDownListViewAnswerModeComponent.GetHtml 22 " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultDropDownListViewAnswerModeComponent.GetHtml", Excep);
        }

    }


    this.GetAnswerList = function (TemplateId) {
        try {
            OneViewConsole.Debug("GetAnswerList Start", "PeriodicDefaultDropDownListViewAnswerModeComponent.GetAnswerList");

            var LVTemplateResult = CompletePeriodicTemplateResult[TemplateId].LVTemplateResult;
            var Answers = LVTemplateResult[AttributeId].Answers;

            OneViewConsole.Debug("GetAnswerList End", "PeriodicDefaultDropDownListViewAnswerModeComponent.GetAnswerList");
            return Answers;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultDropDownListViewAnswerModeComponent.GetAnswerList", Excep);
        }

    }

    this.GetOptionHtml = function (IsSelected, DataSource) {
        try {
            OneViewConsole.Debug("GetOptionHtml Start", "PeriodicDefaultAttributeComponent.GetOptionHtml");

            var selected = '';
            if (IsSelected == true) {
                selected = ' selected';
            }
            var Html = ' <option  value="' + DataSource.Id + '"' + selected + '>' + DataSource.Name + '</option>';
          
            OneViewConsole.Debug("GetOptionHtml End", "PeriodicDefaultAttributeComponent.GetOptionHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultAttributeComponent.GetOptionHtml", Excep);
        }

    }

    this.GetSelectOptionHtml = function () {
        try {
            OneViewConsole.Debug("GetSelectOptionHtml Start", "PeriodicDefaultAttributeComponent.GetSelectOptionHtml");

            var SelectData = oXlatService.xlat('Please Select');

            var Html = ' <option  value="0" selected> ' + SelectData + ' </option>';

            OneViewConsole.Debug("GetSelectOptionHtml End", "PeriodicDefaultAttributeComponent.GetSelectOptionHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultAttributeComponent.GetSelectOptionHtml", Excep);
        }

    }

    this.UpdateAnswerModel = function (DOMObj) {
        try {
            OneViewConsole.Debug("UpdateAnswerModel Start", "PeriodicDefaultDropDownListViewAnswerModeComponent.UpdateAnswerModel");

            if (DOMObj != null) {
                var text = DOMObj.options[DOMObj.selectedIndex].text;
                var LVTemplateResult = CompletePeriodicTemplateResult[TemplateId].LVTemplateResult;
                var Answers = LVTemplateResult[AttributeId].Answers;
                for (var i = 0; i < Answers.length ; i++) {
                    if (Answers[i].ControlId == ControlId) {
                        Answers[i].Answer= DOMObj.value;
                        Answers[i].AnswerValue = text;
                        break;
                    }
                }
            }
            OneViewConsole.Debug("UpdateAnswerModel End", "PeriodicDefaultDropDownListViewAnswerModeComponent.UpdateAnswerModel");
            
        }
        catch (Excep) {
           // alert('PeriodicDefaultDropDownListViewAnswerModeComponent.UpdateAnswerModel Excep : ' + Excep);
           // alert('PeriodicDefaultDropDownListViewAnswerModeComponent.UpdateAnswerModel Excep : ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultDropDownListViewAnswerModeComponent.UpdateAnswerModel", Excep);
        }

    }

    this.Clear = function () {
        try {
            OneViewConsole.Debug("Clear Start", "PeriodicDefaultDropDownListViewAnswerModeComponent.Clear");

            MyInstance.ClearAnswerModel();

            OneViewConsole.Debug("Clear End", "PeriodicDefaultDropDownListViewAnswerModeComponent.Clear");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultDropDownListViewAnswerModeComponent.Clear", Excep);
        }

    }

    this.ClearAnswerModel = function () {

        try {
            OneViewConsole.Debug("ClearAnswerModel Start", "PeriodicDefaultDropDownListViewAnswerModeComponent.ClearAnswerModel");

            //alert("AttributeId : " + AttributeId + ", ControlId : " + ControlId);
            MyInstance.ClearControl(ControlId);

            var _oPeriodicDefaultAnswerModeComponent = new PeriodicDefaultAnswerModeComponent(TemplateId, AttributeId, ControlId);
            _oPeriodicDefaultAnswerModeComponent.ClearAnswerModel(AttributeId, ControlId);

            OneViewConsole.Debug("ClearAnswerModel End", "PeriodicDefaultDropDownListViewAnswerModeComponent.ClearAnswerModel");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultDropDownListViewAnswerModeComponent.ClearAnswerModel", Excep);
        }
        finally {
            AllObj = null;
            CurrentObj = null;
        }
    }

    this.ClearControl = function (ControlId) {
        try {
            OneViewConsole.Debug("ClearControl Start", "PeriodicDefaultDropDownListViewAnswerModeComponent.ClearControl");

            var DOMObj = document.getElementById(ControlId);
            if (DOMObj != null) {
                DOMObj.selectedIndex = 0;
            }

            OneViewConsole.Debug("ClearControl End", "PeriodicDefaultDropDownListViewAnswerModeComponent.ClearControl");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicDefaultDropDownListViewAnswerModeComponent.ClearControl", Excep);
        }
    }


}


function PeriodicUIEventJobHandler(TemplateId, AttributeId, ControlId) {

    var MyInstance = this;

    this.PostControlEventsExecute = function (IsPageLoad) {
        try {
            OneViewConsole.Debug("PostControlEventsExecute Start", "PeriodicUIEventJobHandler.PostControlEventsExecute");

            var oDefaultValidationResponse = null;
            if (CompletePeriodicTemplateUIEventJobConfigDict[TemplateId] != undefined) {
                var EventArgs = {
                    'ControlEventUIJobs': CompletePeriodicTemplateUIEventJobConfigDict[TemplateId].ControlEventUIJobs,
                    'AttributeId': AttributeId,
                    'ControlId': ControlId,
                    'oScope': oScope,
                    'oEvent': ''
                };


                oDefaultValidationResponse = MyInstance.EvaluatePostControlUIJobs(EventArgs, IsPageLoad);
            }
            OneViewConsole.Debug("PostControlEventsExecute End", "PeriodicUIEventJobHandler.PostControlEventsExecute");

            return oDefaultValidationResponse;
        }
        catch (Excep) {
            alert("PeriodicUIEventJobHandler.PostControlEventsExecute : " + Excep);
            alert("PeriodicUIEventJobHandler.PostControlEventsExecute 22 : " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicUIEventJobHandler.PostControlEventsExecute", Excep);
        }
    }
    
    this.EvaluatePostControlUIJobs = function (EventArgs, IsPageLoad) {//ControlEventUIJobs, AttributeId, ControlId, oScope, TemplateNodes, $event, AnswerModeObject, AnswerToBind
        try {
            OneViewConsole.Debug("EvaluatePostControlUIJobs Start", "UIEventJobHandler.EvaluatePostControlUIJobs");

            var oDefaultValidationResponse = new DefaultValidationResponse();
            oDefaultValidationResponse.IsSuccess = true;

            var UIJobsEventArgs = MyInstance.GetUIJobsEventArgs(EventArgs, 'PostControlUIJobs');
           
            if (UIJobsEventArgs != null) {
                oDefaultValidationResponse = MyInstance.EvaluateUIJobs(UIJobsEventArgs, IsPageLoad);//ControlWiseControlEventUIJobs.PostControlUIJobs, oScope, TemplateNodes, $event, AttributeId, ControlId, AnswerModeObject, AnswerToBind
            }

            OneViewConsole.Debug("EvaluatePostControlUIJobs End", "UIEventJobHandler.EvaluatePostControlUIJobs");
           
            return oDefaultValidationResponse;
        }
        catch (Excep) {
            alert("PeriodicUIEventJobHandler.EvaluatePostControlUIJobs : " + Excep);
            alert("PeriodicUIEventJobHandler.EvaluatePostControlUIJobs 22 : " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("FrameWork", "UIEventJobHandler.EvaluatePostControlUIJobs", Excep);
        }
    }

    this.GetUIJobsEventArgs = function (EventArgs, UIJobsType) {
        try {
            var UIJobsEventArgs = null;

            //todo :
            var ControlEventUIJobs = EventArgs.ControlEventUIJobs;
          
            var AttributeId = EventArgs.AttributeId;
            var ControlId = EventArgs.ControlId;

            var ControlWiseControlEventUIJobs = (ControlEventUIJobs[AttributeId] != undefined ? (ControlEventUIJobs[AttributeId][ControlId] != undefined ? ControlEventUIJobs[AttributeId][ControlId] : null) : null)

            if (ControlWiseControlEventUIJobs != null && ControlWiseControlEventUIJobs[UIJobsType] != null) {
                UIJobsEventArgs = {
                    'ControlUIJobs': ControlWiseControlEventUIJobs[UIJobsType],
                    'AttributeId': EventArgs.AttributeId,
                    'ControlId': EventArgs.ControlId,
                    'oScope': EventArgs.oScope,
                    'oEvent': EventArgs.oEvent
                };
            }
            return UIJobsEventArgs;
        }
        catch (Excep) {
            alert("PeriodicUIEventJobHandler.GetUIJobsEventArgs : " + Excep);
            alert("PeriodicUIEventJobHandler.GetUIJobsEventArgs 22 : " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("FramwWork", "UIEventJobHandler.GetUIJobsEventArgs", Excep);
        }
        finally {

        }
    }

    this.EvaluateUIJobs = function (UIJobsEventArgs, IsPageLoad) {//ControlUIJobs, oScope, TemplateNodes, $event, AttributeId, ControlId, AnswerModeObject, AnswerToBind
        try {
            OneViewConsole.Debug("EvaluateUIJobs Start", "UIEventJobHandler.EvaluateUIJobs");
            

            var oDefaultValidationResponse = new DefaultValidationResponse();
            oDefaultValidationResponse.IsSuccess = true;

            var ControlUIJobs = UIJobsEventArgs.ControlUIJobs;
            var AttributeId = UIJobsEventArgs.AttributeId;
            var ControlId = UIJobsEventArgs.ControlId;
            var oScope = UIJobsEventArgs.oScope;
            var oEvent = UIJobsEventArgs.oEvent;

            var Model = {};
            MyInstance.CreateUIEventModel(Model);
           // alert('Model : ' + JSON.stringify(Model));
            var SuccessResponseList = [];
            for (var i = 0; i < ControlUIJobs.length; i++) {

                var Job = ControlUIJobs[i];
                if (Job.Type == "DefaultControlUIOperationsRule") {
                    Job.FinalJavaScriptEquation = Job.FinalJavaScriptEquation.replace(/#/g, "'");
               
                    var IsRuleViolated = eval(Job.FinalJavaScriptEquation);
                   // alert('IsRuleViolated : ' + IsRuleViolated + ' , Job.FinalJavaScriptEquation : ' + Job.FinalJavaScriptEquation);
                    SuccessResponseList.push(IsRuleViolated);
                    if (IsRuleViolated == true) {
                        oDefaultValidationResponse.IsSuccess = false;
                        //alert('Job.RefreshControls : ' + Job.RefreshControls);
                        if (Job.MessageKey != "" && Job.MessageKey != null && Job.MessageKey != undefined && IsPageLoad != true) {
                            //alert(Job.MessageKey);
                            oDefaultValidationResponse.MessageKey = Job.MessageKey;
                            new ShowMessage().Error(oDefaultValidationResponse.MessageKey);
                        }



                        if (Job.EnableControls != null) {
                            // "1" implies Enable
                            MyInstance.IterateControls(Job.EnableControls, oScope, null, "1");
                        }

                        if (Job.DisableControls != null) {
                            if (Job.UIValidationType == 0) {
                                // "2" implies Disable
                                MyInstance.IterateControls(Job.DisableControls, oScope, null, "2");
                                if (oEvent != null && oEvent != "") {
                                    StopEventPropagation(oEvent);
                                }
                            }
                        }

                        if (Job.HideControls != null) {
                            // "3" implies Hide
                            MyInstance.IterateControls(Job.HideControls, oScope, null, "3");
                        }

                        if (Job.ShowControls != null) {
                            // "4" implies Show
                            MyInstance.IterateControls(Job.ShowControls, oScope, null, "4");
                        }

                        if (Job.RefreshControls != null) {
                            // "5" implies Refresh
                            MyInstance.IterateControls(Job.RefreshControls, oScope, null, "5");
                        }

                        if (Job.ClearControls != null) {
                            // "6" implies Clear
                            MyInstance.IterateControls(Job.ClearControls, oScope, null, "6");
                        }

                        if (Job.NAControls != null) {
                            // "7" implies NA
                        }

                    }

                    else {
                        oDefaultValidationResponse.IsSuccess = true;
                        ////Enable controls
                        //MyInstance.IterateControls(Job.DisableControls, oScope, TemplateNodes, "1");
                    }

                }

                else if (Job.Type == "CustomControlUIOperationsRule") {
                    alert('UIEventJobHandler.EvaluateUIJobs Job.Type = ' + Job.Type + 'Not Implemented Exception.');
                }

                else {
                    alert('UIEventJobHandler.EvaluateUIJobs Job.Type = ' + Job.Type + 'Not Implemented Exception.');
                }
            }

            OneViewConsole.Debug("EvaluateUIJobs End", "UIEventJobHandler.EvaluateUIJobs");
                       
            return oDefaultValidationResponse;

        }
        catch (Excep) {
            alert("UIEventJobHandler.EvaluateUIJobs : " + Excep);
            alert("UIEventJobHandler.EvaluateUIJobs 22 : " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("FrameWork", "UIEventJobHandler.EvaluateUIJobs", Excep);
        }

    }


    this.IterateControls = function (AttributeDict, oScope, TemplateNodes, EventTodo) {
        try {
            OneViewConsole.Debug("Validate Start", "UIEventJobHandler.Validate");

            for (var attrId in AttributeDict) {
              //  var AttributeData = TemplateNodes[attrId];
                //for (var i = 0; i < AttributeData.AnswerMode.length ; i++) {
                //    var ControlData = AttributeData.AnswerMode[i];

                var ControlList = AttributeDict[attrId];
              
                for (j = 0; j < ControlList.length; j++) {
                  
                       // if (ControlData.ControlId == ControlList[j]) {

                            if (EventTodo == "1") {
                               // MyInstance.EnableControl(ControlData, oScope);
                            }

                            else if (EventTodo == "2") {
                               // MyInstance.DisableControl(ControlData, oScope);
                            }

                            else if (EventTodo == "3") {
                                MyInstance.HideControl(ControlList[j], oScope);
                            }

                            else if (EventTodo == "4") {
                                MyInstance.ShowControl(ControlList[j], oScope);
                            }

                            else if (EventTodo == "5") {
                               // MyInstance.RefreshControl(ControlData, oScope);
                            }

                            else if (EventTodo == "6") {
                                MyInstance.ClearControl(TemplateId, attrId, ControlList[j]);
                            }


                        }
                   // }
                //}

            }
            OneViewConsole.Debug("Validate End", "UIEventJobHandler.Validate");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "UIEventJobHandler.Validate", Excep);
        }

    }

    this.GetControlData = function (TemplateNodes, AttributeId, ControlId, oScope) {
        try {
            OneViewConsole.Debug("GetControlData Start", "UIEventJobHandler.GetControlData");

            var Response = { 'AnswerModeInfo': '', 'Value': '' };
            var AttributeData = TemplateNodes[AttributeId];
            for (var k = 0; k < AttributeData.AnswerMode.length ; k++) {
                var _oPrimarayAnswerModeInfo = AttributeData.AnswerMode[k];
                if (_oPrimarayAnswerModeInfo.Type == 'Band') {
                    if (_oPrimarayAnswerModeInfo.ControlId == ControlId) {
                        var Id = oScope[_oPrimarayAnswerModeInfo.ControlId].GetSelectedValue();
                        if (Id != undefined && Id != null && Id != "") {
                            option = {
                                "Id": oScope[_oPrimarayAnswerModeInfo.ControlId].GetSelectedValue(),
                                "ControlId": ControlId,
                                "AttributeNodeId": AttributeId,
                                'Name': (_oPrimarayAnswerModeInfo.BandInfo != undefined ? _oPrimarayAnswerModeInfo.BandInfo[Id].Name : ''),
                                'Sequence': (_oPrimarayAnswerModeInfo.BandInfo != undefined ? _oPrimarayAnswerModeInfo.BandInfo[Id].Sequence : ''),
                                'ColourIndex': (_oPrimarayAnswerModeInfo.BandInfo != undefined ? _oPrimarayAnswerModeInfo.BandInfo[Id].ColourIndex : ''),
                                'Selected': true
                            }
                        }

                        else {
                            option = {
                                "Id": "",
                                "ControlId": ControlId,
                                "AttributeNodeId": AttributeId,
                                'Name': "",
                                'Sequence': "",
                                'ColourIndex': "",
                                'Selected': false
                            }
                        }

                    }

                    Response.AnswerModeInfo = _oPrimarayAnswerModeInfo;
                    Response.Value = option;
                }

                else if (_oPrimarayAnswerModeInfo.Type == 'DCListViewControlConfig') {
                    Response.AnswerModeInfo = _oPrimarayAnswerModeInfo;
                    Response.Value = '';
                }

            }

            OneViewConsole.Debug("GetControlData End", "UIEventJobHandler.GetControlData");

            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "UIEventJobHandler.GetControlData", Excep);
        }
    }


    this.HideControl = function (ControlId, oScope) {
        try {
            var DivId = 'Div_' + ControlId;
            if (document.getElementById(DivId) != null) {
                
                document.getElementById(DivId).style.display = 'none';
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "UIEventJobHandler.HideControl", Excep);
        }
    }

    this.ShowControl = function (ControlId, oScope) {
        try {
            var DivId = 'Div_' + ControlId;
            if (document.getElementById(DivId) != null) {
                document.getElementById(DivId).style.display = '';
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "UIEventJobHandler.ShowControl", Excep);
        }
    }


    this.CreateUIEventModel = function (Model) {
        try {
            OneViewConsole.Debug("CreateUIEventModel Start", "PeriodicUIEventJobHandler.CreateUIEventModel");
                 
            if (CompletePeriodicTemplateResult[TemplateId] != undefined) {
                var LVTemplateResult = CompletePeriodicTemplateResult[TemplateId].LVTemplateResult;
                if (LVTemplateResult != undefined) {
                    var oAttribute = LVTemplateResult[AttributeId];

                    if (oAttribute != undefined) {

                        if (oAttribute.Answers.length > 1) {
                            for (var i = 0; i < oAttribute.Answers.length ; i++) {
                                Model[oAttribute.Answers[i].ControlId] = oAttribute.Answers[i].Answer;
                            }
                        }
                        else {
                            if (oAttribute.Answers[0].Answer == "") { // Need to change
                                return false;
                            }
                            else {
                                Model[oAttribute.Answers[0].ControlId] = oAttribute.Answers[0].Answer;
                            }
                        }

                    }
                }
            }

            OneViewConsole.Debug("CreateUIEventModel End", "PeriodicUIEventJobHandler.CreateUIEventModel");
        }
        catch (Excep) {
            alert("UIEventJobHandler.CreateUIEventModel : " + Excep);
            alert("UIEventJobHandler.CreateUIEventModel 22 : " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicUIEventJobHandler.CreateUIEventModel", Excep);
        }
    }

    this.ClearControl = function (TemplateId, AttributeId, ControlId) {
        try {
            OneViewConsole.Debug("ClearControl Start", "UIEventJobHandler.ClearControl");

            var AttributeConfig = PTempMData[TemplateId].TemplateConfigMetaDataDetails.Childs[0];
            
            var AnswerModeConfig = null;
            for (i = 0; i < AttributeConfig.AnswerModes.length; i++) {
                if (AttributeConfig.AnswerModes[i].ControlId == ControlId) {
                    AnswerModeConfig = AttributeConfig.AnswerModes[i];
                    break;
                }
            }
                       
            var _oPeriodicDefaultAnswerModeComponent = new PeriodicDefaultAnswerModeComponent(TemplateId, AttributeId, ControlId);
            _oPeriodicDefaultAnswerModeComponent.AttributeConfig = AttributeConfig;
            _oPeriodicDefaultAnswerModeComponent.AnswerModeConfig = AnswerModeConfig;
            _oPeriodicDefaultAnswerModeComponent.ClearUIEvent();

            OneViewConsole.Debug("ClearControl Start", "UIEventJobHandler.ClearControl");
            
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "UIEventJobHandler.ClearControl", Excep);
        }
    }



    this.PageLoadPostControlEventsExecute = function () {
        try {
            OneViewConsole.Debug("PageLoadPostControlEventsExecute Start", "PeriodicUIEventJobHandler.PageLoadPostControlEventsExecute");


            var EventArgs = {
                'ControlEventUIJobs': CompletePeriodicTemplateUIEventJobConfigDict[TemplateId].ControlEventUIJobs,
                'AttributeId': AttributeId,
                'ControlId': ControlId,
                'oScope': oScope,
                'oEvent': ''
            };


            var oDefaultValidationResponse = MyInstance.PageLoadEvaluatePostControlUIJobs(EventArgs);

            OneViewConsole.Debug("PageLoadPostControlEventsExecute End", "PeriodicUIEventJobHandler.PageLoadPostControlEventsExecute");

            return oDefaultValidationResponse;
        }
        catch (Excep) {
            alert("PeriodicUIEventJobHandler.PageLoadPostControlEventsExecute : " + Excep);
            alert("PeriodicUIEventJobHandler.PageLoadPostControlEventsExecute 22 : " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicUIEventJobHandler.PageLoadPostControlEventsExecute", Excep);
        }
    }


    this.PageLoadEvaluatePostControlUIJobs = function (EventArgs) {//ControlEventUIJobs, AttributeId, ControlId, oScope, TemplateNodes, $event, AnswerModeObject, AnswerToBind
        try {
            OneViewConsole.Debug("PageLoadEvaluatePostControlUIJobs Start", "UIEventJobHandler.PageLoadEvaluatePostControlUIJobs");

            var oDefaultValidationResponse = new DefaultValidationResponse();
            oDefaultValidationResponse.IsSuccess = true;

            var UIJobsEventArgs = MyInstance.GetUIJobsEventArgs(EventArgs, 'PostControlUIJobs');

            if (UIJobsEventArgs != null) {
                oDefaultValidationResponse = MyInstance.EvaluateUIJobs(UIJobsEventArgs);//ControlWiseControlEventUIJobs.PostControlUIJobs, oScope, TemplateNodes, $event, AttributeId, ControlId, AnswerModeObject, AnswerToBind
            }

            OneViewConsole.Debug("PageLoadEvaluatePostControlUIJobs End", "UIEventJobHandler.PageLoadEvaluatePostControlUIJobs");

            return oDefaultValidationResponse;
        }
        catch (Excep) {
            alert("PeriodicUIEventJobHandler.PageLoadEvaluatePostControlUIJobs : " + Excep);
            alert("PeriodicUIEventJobHandler.PageLoadEvaluatePostControlUIJobs 22 : " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("FrameWork", "UIEventJobHandler.PageLoadEvaluatePostControlUIJobs", Excep);
        }
    }


}

function PlatformPeriodicsBlockerHandler(MainGroupId) {

    var MyInstance = this;

    this.LoadBlockerProfiles = function () {

        try {
            OneViewConsole.Debug("LoadBlockerProfiles start", "PlatformPeriodicsBlockerHandler.LoadBlockerProfiles");
            
           // alert(MainGroupId + ', OneViewGlobalServiceTypeEnum[OneViewGlobalServiceType] : ' + OneViewGlobalServiceTypeEnum[OneViewGlobalServiceType])
            //Todo : Later take from db instead of hard-coding
            if (OneViewGlobalServiceTypeEnum[OneViewGlobalServiceType] == 7) {
                var DCBlockerConfigProfile = {
                    338: {
                        "TemplateNodeId": 338,
                        "IsAttributeGroup": true,
                        "IsAllAttribute": false,
                        "TemplateId": '',
                        "IsCommantIsMandatory": false,
                        "MinimumChar": 0,
                        "MaxChar": 0
                    }
                };
                PeriodicDCBlockerConfigProfile = DCBlockerConfigProfile;
            }
            
        

            OneViewConsole.Debug("LoadBlockerProfiles end", "PlatformPeriodicsBlockerHandler.LoadBlockerProfiles");


        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PlatformPeriodicsBlockerHandler.LoadBlockerProfiles", Excep);
        }
        finally {
        }
    }

    this.GetBlockerProfile = function (TemplateNodeId, AtrributeNodeId) {

        try {
            OneViewConsole.Debug("GetBlockerProfile start", "PlatformPeriodicsBlockerHandler.GetBlockerProfile");

            if (PeriodicDCBlockerConfigProfile != undefined) {
                var BlockerProfile = PeriodicDCBlockerConfigProfile[MainGroupId];
                if (BlockerProfile == undefined) {
                    BlockerProfile = PeriodicDCBlockerConfigProfile[TemplateNodeId];
                }
            }
           
            OneViewConsole.Debug("GetBlockerProfile end", "PlatformPeriodicsBlockerHandler.GetBlockerProfile");

            return BlockerProfile;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PlatformPeriodicsBlockerHandler.GetBlockerProfile", Excep);
        }
        finally {
        }
    }

}

function PlatformPeriodicsBlockerUIComponent() {

    var MyInstance = this;
    
    this.GetHtml = function (TemplateId, AttributeNodeId, DisplayName) {
        try {
            OneViewConsole.Debug("GetHtml start", "PlatformPeriodicsBlockerUIComponent.GetHtml");

            var Html = '<button class="button button-clear info np-but" id="TemplateNodeBlocker_' + TemplateId + '" onclick="new PlatformPeriodicsBlockerUIComponent().UpdateModel(' + TemplateId + ',' + AttributeNodeId + ',this);">' + DisplayName + '</button>';
            
            OneViewConsole.Debug("GetHtml end", "PlatformPeriodicsBlockerUIComponent.GetHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PlatformPeriodicsBlockerUIComponent.GetHtml", Excep);
        }
        finally {
        }
    }

    this.UpdateModel = function (TemplateId, AttributeId, DOMObj) {

        try {
            OneViewConsole.Debug("GetBlockerProfile start", "PlatformPeriodicsBlockerUIComponent.GetBlockerProfile");

            
            if (CompletePeriodicTemplateResult[TemplateId] != undefined) {
               
                var _oDOM = new DOM();
                var AttrDivId = "TemplateNodeBlock_" + AttributeId;
             
                SetColor(TemplateId, DOMObj);
                CompletePeriodicTemplateResult[TemplateId].IsBlocker = !CompletePeriodicTemplateResult[TemplateId].IsBlocker;
                

                var TemplateConfigMetadata = PTempMData[TemplateId];
                var AttributeConfig = TemplateConfigMetadata.TemplateConfigMetaDataDetails.Childs[0];

                if (CompletePeriodicTemplateResult[TemplateId].IsBlocker == true) {
                   
                    var _oPeriodicDefaultAttributeComponent = new PeriodicDefaultAttributeComponent(TemplateId, AttributeId);
                    _oPeriodicDefaultAttributeComponent.AttributeConfig = PTempMData[TemplateId].TemplateConfigMetaDataDetails.Childs[0];
                    _oPeriodicDefaultAttributeComponent.Clear();

                    var DataCaptureClientGuid = (CompletePeriodicTemplateResult[TemplateId].DataCaptureClientGuid != undefined) ? CompletePeriodicTemplateResult[TemplateId].DataCaptureClientGuid : "";

                    PostControlEventsExecute(TemplateId, AttributeId);

                    var _oPeriodicActionNCUIComponent = new PeriodicActionNCUIComponent(oScope, oXlatService, oSnapRemote, oCompile);
                    _oPeriodicActionNCUIComponent.Excecute("", TemplateId, AttributeId, "", DataCaptureClientGuid);

                    _oDOM.AddClass(AttrDivId, "np");
                }
                else {
                    _oDOM.RemoveClass(AttrDivId, "np");
                }

                //alert('CompletePeriodicTemplateResult[TemplateId].IsBlocker : ' + CompletePeriodicTemplateResult[TemplateId].IsBlocker);
                
            }
            OneViewConsole.Debug("GetBlockerProfile end", "PlatformPeriodicsBlockerUIComponent.GetBlockerProfile");
        }
        catch (Excep) {
            alert('UpdateModel Excep :  ' + Excep);
            alert('UpdateModel Excep 22 :  ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "PlatformPeriodicsBlockerUIComponent.UpdateModel", Excep);
        }
        finally {
        }
    }

    var SetColor = function (TemplateId, DOMObj) {

        try {
            OneViewConsole.Debug("SetColor Start", "LVDefaultNAComponent.SetColor");

            var _oDOM = new DOM();

            if (CompletePeriodicTemplateResult[TemplateId].IsBlocker) {
                _oDOM.RemoveClassByObj(DOMObj, "active");
            }
            else {
                _oDOM.AddClassByObj(DOMObj, "active");
            }

            OneViewConsole.Debug("SetColor End", "LVDefaultNAComponent.SetColor");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LVDefaultNAComponent.SetColor", Excep);
        }
    }

    var PostControlEventsExecute = function (TemplateId, AttributeId) {

        try {
            OneViewConsole.Debug("SetColor Start", "LVDefaultNAComponent.SetColor");

            if (CompletePeriodicTemplateResult[TemplateId] != undefined) {
                var LVTemplateResult = CompletePeriodicTemplateResult[TemplateId].LVTemplateResult;
                if (LVTemplateResult != undefined) {
                    var Answers = LVTemplateResult[AttributeId].Answers;
                    for (var i = 0; i < Answers.length ; i++) {
                        var res = new PeriodicUIEventJobHandler(TemplateId, AttributeId, Answers[i].ControlId).PostControlEventsExecute(false);
                    }
                }
            }

            OneViewConsole.Debug("SetColor End", "LVDefaultNAComponent.SetColor");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LVDefaultNAComponent.SetColor", Excep);
        }
    }


}
//var PeriodicHierarchy = {
//    'TemplateNodeId': 2, 'TemplateName': 'Periodic', 'Left': 2, 'Right': 665, 'ParentNodeId': 1, 'Level': 'L1', 'IsAttributeGroup': true, 'IsTemplate': false, 'IsNextLevelAttributeGroup': true, 'CompletedCount': 0, 'ApprovedCount': 0, 'TotalCount': 6,
//    'TemplateConfigMetaDataDetails': {
//        "Name": 'Periodic',
//        'Childs': [


//          {  'Id': 8, 'Name': 'Region1', 'Left': 5, 'Right': 10, 'ParentNodeId': 2, 'Level': 'L2', 'IsAttributeGroup': true, 'IsTemplate': false, 'IsNextLevelAttributeGroup': true, 'CompletedCount': 1, 'ApprovedCount': 0, 'TotalCount': 3, 'Index': 0,
//              'Childs': [

//                  {
//                      'Id': 12, 'Name': 'Other External Areas', 'Left': 5, 'Right': 10, 'ParentNodeId': 2, 'Level': 'L2', 'IsAttributeGroup': true, 'IsTemplate': false, 'IsNextLevelAttributeGroup': true, 'CompletedCount': 1, 'ApprovedCount': 0, 'TotalCount': 2, 'Index': 0,
//                      'Childs': [
//                          {
//                              'Id': 13, 'Name': 'Wash all Tesco owned permanent car park signage including supporting poles (excluding any illuminated and JC decaux advertising signs) up to a height of 3 metres',
//                              'Left': 6, 'Right': 9, 'ParentNodeId': 12, 'Level': 'L3', 'IsAttributeGroup': true, 'IsTemplate': true, 'IsNextLevelAttributeGroup': false, 'CompletedCount': 1, 'ApprovedCount': 0, 'TotalCount': 1, 'Index': 0,
//                              //'Childs': [
//                              //                {
//                              //                    'Id': 14, 'Name': 'Wash all Tesco owned permanent car park signage including supporting poles (excluding any illuminated and JC decaux advertising signs) up to a height of 3 metres',
//                              //                    'Left': 7, 'Right': 8, 'ParentNodeId': 13, 'Level': 'L4', 'IsAttributeGroup': false, 'IsTemplate': false, 'IsNextLevelAttributeGroup': false, 'CompletedCount': 1, 'ApprovedCount': 0, 'TotalCount': 1,
//                              //                    'Childs': []
//                              //                }
//                              //],
                            
//                          }
//                      ]
//                  },

//              {
//                      'Id': 11, 'Name': 'Area2', 'Left': 5, 'Right': 10, 'ParentNodeId': 2, 'Level': 'L2', 'IsAttributeGroup': true, 'IsTemplate': false, 'IsNextLevelAttributeGroup': true, 'CompletedCount': 1, 'ApprovedCount': 0, 'TotalCount': 1, 'Index': 1,
//              'Childs': [
//                  {
//                      'Id': 189, 'Name': 'Template 3333',
//                      'Left': 6, 'Right': 9, 'ParentNodeId': 12, 'Level': 'L3', 'IsAttributeGroup': true, 'IsTemplate': true, 'IsNextLevelAttributeGroup': false, 'CompletedCount': 1, 'ApprovedCount': 0, 'TotalCount': 1, 'Index': 0,
//                      'Childs': [
//                                      {
//                                          'Id': 14, 'Name': 'Attribute 3333',
//                                          'Left': 7, 'Right': 8, 'ParentNodeId': 13, 'Level': 'L4', 'IsAttributeGroup': false, 'IsTemplate': false, 'IsNextLevelAttributeGroup': false, 'CompletedCount': 1, 'ApprovedCount': 0, 'TotalCount': 1,
//                                          'Childs': []
//                                      }
//                      ]
//                  }
//              ]
//          }
//              ]
//          },

//           {  'Id': 9, 'Name': 'Region2', 'Left': 5, 'Right': 10, 'ParentNodeId': 2, 'Level': 'L2', 'IsAttributeGroup': true, 'IsTemplate': false, 'IsNextLevelAttributeGroup': true, 'CompletedCount': 3, 'ApprovedCount': 0, 'TotalCount': 6, 'Index': 1,
//               'Childs': [
//                        {
//                            'Id': 15, 'Name': 'Windows', 'Left': 11, 'Right': 28, 'ParentNodeId': 2, 'Level': 'L2', 'IsAttributeGroup': true, 'IsTemplate': false, 'IsNextLevelAttributeGroup': true, 'CompletedCount': 2, 'ApprovedCount': 0, 'TotalCount': 4, 'Index': 0,
//                            'Childs': [
//                                {
//                                    'Id': 16, 'Name': 'Clean all ground floor windows, inside & out inc. frames/Sills',
//                                    'Left': 12, 'Right': 15, 'ParentNodeId': 15, 'Level': 'L3', 'IsAttributeGroup': true, 'IsTemplate': true, 'IsNextLevelAttributeGroup': false, 'CompletedCount': 1, 'ApprovedCount': 0, 'TotalCount': 2, 'Index': 0,
//                                    'Childs': [
//                                                    {
//                                                        'Id': 17, 'Name': 'Clean all ground floor windows, inside & out inc. frames/Sills',
//                                                        'Left': 13, 'Right': 14, 'ParentNodeId': 16, 'Level': 'L4', 'IsAttributeGroup': false, 'IsTemplate': false, 'IsNextLevelAttributeGroup': false, 'CompletedCount': 1, 'ApprovedCount': 0, 'TotalCount': 2,
//                                                        'Childs': []
//                                                    }
//                                    ]
//                                },

//                                {
//                                    'Id': 18, 'Name': 'Clean all 1st floor windows (above 3.5m) inside & out inc. frames/sills',
//                                    'Left': 16, 'Right': 19, 'ParentNodeId': 15, 'Level': 'L3', 'IsAttributeGroup': true, 'IsTemplate': true, 'IsNextLevelAttributeGroup': false, 'CompletedCount': 1, 'ApprovedCount': 0, 'TotalCount': 2, 'Index': 1,
//                                    'Childs': [
//                                                    {
//                                                        'Id': 19, 'Name': 'Clean all 1st floor windows (above 3.5m) inside & out inc. frames/sills',
//                                                        'Left': 17, 'Right': 18, 'ParentNodeId': 16, 'Level': 'L4', 'IsAttributeGroup': false, 'IsTemplate': false, 'IsNextLevelAttributeGroup': false, 'CompletedCount': 1, 'ApprovedCount': 0, 'TotalCount': 2,
//                                                        'Childs': []
//                                                    }
//                                    ]
//                                }
//                            ]
//                        }
//               ]
//           },

//            {
//                'Id': 10, 'Name': 'Region3', 'Left': 5, 'Right': 10, 'ParentNodeId': 2, 'Level': 'L2', 'IsAttributeGroup': true, 'IsTemplate': false, 'IsNextLevelAttributeGroup': true, 'CompletedCount': 0, 'ApprovedCount': 0, 'TotalCount': 1, 'Index': 2,
//                'Childs': [

//                    {
//                        'Id': 22, 'Name': 'Sales Floor', 'Left': 29, 'Right': 62, 'ParentNodeId': 2, 'Level': 'L2', 'IsAttributeGroup': true, 'IsTemplate': false, 'IsNextLevelAttributeGroup': false, 'CompletedCount': 0, 'ApprovedCount': 0, 'TotalCount': 1, 'Index': 0,
//                        'Childs': [

//                            {
//                                'Id': 19, 'Name': 'Template bbbbb',
//                                'Left': 17, 'Right': 18, 'ParentNodeId': 16, 'Level': 'L4', 'IsAttributeGroup': true, 'IsTemplate': true, 'IsNextLevelAttributeGroup': false, 'CompletedCount': 1, 'ApprovedCount': 0, 'TotalCount': 2, 'Index': 0,
//                                'Childs': [
//                                    {
//                                        'Id': 333, 'Name': 'Attribute bbbbb',
//                                        'Left': 17, 'Right': 18, 'ParentNodeId': 16, 'Level': 'L4', 'IsAttributeGroup': false, 'IsTemplate': false, 'IsNextLevelAttributeGroup': false, 'CompletedCount': 1, 'ApprovedCount': 0, 'TotalCount': 2,
//                                        'Childs': []
//                                    }
//                                ]
//                            }
//                        ]
//                    }
//                        ]
//            }
//        ]
//    }


//};



/*
var ValidationMetadata = {
    'TemplateGroupId': 2, 'IsAllMandatoryForSubmit': true, 'TotalLevels' : 3,'IsNAEnabled' : true,'IsCameraEnabled' : true, 'IsBackNavigate' :true,
    'PeriodicUIValidation': {
        'Type' : 'Default',
        '1': true,
        'IsSynchronized': '',
        'IsApproved': true,
        'TemplateStatus': 'Hide',
        'GroupStatus': 'Hide'
    },
    'UIGridConfig': {
        'Type': 'Default',
        'Equation': ''
    }
        //{
        //        'Type': 'Advanced',
        //'MethodName': 'UIStructure' //Class Name
       
        //}
};
*/



//var PeriodicHierarchy = {
//    'TemplateNodeId': 2, 'TemplateName': 'Periodic', 'Left': 2, 'Right': 665, 'ParentNodeId': 1, 'Level': 'L1', 'IsAttributeGroup': true, 'IsTemplate': false, 'IsNextLevelAttributeGroup': true,'CompletedCount' : 0, 'ApprovedCount': 0 , 'TotalCount' : 6,
//    'TemplateConfigMetaDataDetails' : {
//        "Name" : 'Periodic',
//        'Childs': [
//            {
//                'Id': 12, 'Name': 'Other External Areas', 'Left': 5, 'Right': 10, 'ParentNodeId': 2, 'Level': 'L2', 'IsAttributeGroup': true, 'IsTemplate': false, 'IsNextLevelAttributeGroup': true, 'CompletedCount' : 1, 'ApprovedCount': 0 , 'TotalCount' : 1,'Index' : 0,
//                'Childs': [
//                    {
//                        'Id': 13, 'Name': 'Wash all Tesco owned permanent car park signage including supporting poles (excluding any illuminated and JC decaux advertising signs) up to a height of 3 metres',
//                        'Left': 6, 'Right': 9, 'ParentNodeId': 12, 'Level': 'L3', 'IsAttributeGroup': true, 'IsTemplate': true, 'IsNextLevelAttributeGroup': false, 'CompletedCount': 1, 'ApprovedCount': 0, 'TotalCount': 1, 'Index': 0,
//                        'Childs': [
//                                        {
//                                            'Id': 14, 'Name': 'Wash all Tesco owned permanent car park signage including supporting poles (excluding any illuminated and JC decaux advertising signs) up to a height of 3 metres',
//                                            'Left': 7, 'Right': 8, 'ParentNodeId': 13, 'Level': 'L4', 'IsAttributeGroup': false, 'IsTemplate': false, 'IsNextLevelAttributeGroup': false, 'CompletedCount' : 1, 'ApprovedCount': 0 , 'TotalCount' : 1,
//                                            'Childs': []
//                                        }
//                                    ]
//                    }
//                ]
//            },

//            {
//                'Id': 15, 'Name': 'Windows', 'Left': 11, 'Right': 28, 'ParentNodeId': 2, 'Level': 'L2', 'IsAttributeGroup': true, 'IsTemplate': false, 'IsNextLevelAttributeGroup': true, 'CompletedCount': 2, 'ApprovedCount': 0, 'TotalCount': 4, 'Index': 1,
//                'Childs': [
//                    {
//                        'Id': 16, 'Name': 'Clean all ground floor windows, inside & out inc. frames/Sills',
//                        'Left': 12, 'Right': 15, 'ParentNodeId': 15, 'Level': 'L3', 'IsAttributeGroup': true, 'IsTemplate': true, 'IsNextLevelAttributeGroup': false, 'CompletedCount': 1, 'ApprovedCount': 0, 'TotalCount': 2, 'Index': 0,
//                        'Childs': [
//                                        {
//                                            'Id': 17, 'Name': 'Clean all ground floor windows, inside & out inc. frames/Sills',
//                                            'Left': 13, 'Right': 14, 'ParentNodeId': 16, 'Level': 'L4', 'IsAttributeGroup': false, 'IsTemplate': false, 'IsNextLevelAttributeGroup': false, 'CompletedCount': 1, 'ApprovedCount': 0, 'TotalCount': 2,
//                                            'Childs': []
//                                        }
//                                ]
//                    },

//                    {
//                        'Id': 18, 'Name': 'Clean all 1st floor windows (above 3.5m) inside & out inc. frames/sills',
//                        'Left': 16, 'Right': 19, 'ParentNodeId': 15, 'Level': 'L3', 'IsAttributeGroup': true, 'IsTemplate': true, 'IsNextLevelAttributeGroup': false, 'CompletedCount': 1, 'ApprovedCount': 0, 'TotalCount': 2, 'Index': 1,
//                        'Childs': [
//                                        {
//                                            'Id': 19, 'Name': 'Clean all 1st floor windows (above 3.5m) inside & out inc. frames/sills',
//                                            'Left': 17, 'Right': 18, 'ParentNodeId': 16, 'Level': 'L4', 'IsAttributeGroup': false, 'IsTemplate': false, 'IsNextLevelAttributeGroup': false, 'CompletedCount': 1, 'ApprovedCount': 0, 'TotalCount': 2,
//                                            'Childs': []
//                                        }
//                                ]
//                    }
//                ]
//            },

//            {
//                'Id': 22, 'Name': 'Sales Floor', 'Left': 29, 'Right': 62, 'ParentNodeId': 2, 'Level': 'L2', 'IsAttributeGroup': true, 'IsTemplate': false, 'IsNextLevelAttributeGroup': true, 'CompletedCount': 0, 'ApprovedCount': 0, 'TotalCount': 1, 'Index': 2,
//                'Childs': [
//                        ]
//            }
//            ]
//        }
    

//};



