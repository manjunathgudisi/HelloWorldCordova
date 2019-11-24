

////////////////**************** DcPeriodicsController START *******************//////////////////////////////


var IsNoProfile = false;
var oscope = null;
var TemplateGroupWiseStatusDict = {};
var PeriodicsGraphSearchTime = 0000; // Millie seconds
MyApp.controller("DcPeriodicsController", function ($scope, $location, xlatService, $compile) {

    var DailyNodeId = 339;
    var WeeklyNodeId = 340;
    var MonthlyNodeId = 341;
    var PeriodicNodeId = 338;
    CompleteLVTemplateResult = {};
    $scope.MyAuditTab = ["Daily", "Weekly", "Monthly"];
    $scope.MyAudit = "Daily";
    oscope = $scope;
    var oDcPeriodicsFacade = new DcPeriodicsFacade({ 'scope': $scope, 'location': $location, 'xlatService': xlatService, 'compile': $compile });
    oDcPeriodicsFacade.Init($location);
    oDcPeriodicsFacade.LoadSubGroup(PeriodicNodeId);
    oDcPeriodicsFacade.PageLoad();

    if (IsNoProfile == false) {
   
        $scope.LoadTask = function (TabIndex) {
            

            if (TabIndex == "Daily") {
                oDcPeriodicsFacade.LoadSubGroup(DailyNodeId);
            }
            else if (TabIndex == "Weekly") {
                oDcPeriodicsFacade.LoadSubGroup(WeeklyNodeId);
            }
            else if (TabIndex == "Monthly") {
                oDcPeriodicsFacade.LoadSubGroup(MonthlyNodeId);
            }
            //$scope.ShowBackDiv = false;
            //$scope.ShowSaveDiv = false;
            //$scope.ShowSubmitDiv = false;
            //oDcPeriodicsFacade.SelectGroup(TabIndex);
            //alert("Pending : " + $scope.divPending + ", Completed : " + $scope.divComplete + ", History : " + $scope.divUploaded);
        }
    }

  

    $scope.Back = function () {
        oDcPeriodicsFacade.Back();
    }

    $scope.Save = function () {
        oDcPeriodicsFacade.Save();
    }

    $scope.Submit = function () {
        oDcPeriodicsFacade.Submit();
    }

    LoadSubGroup = function (AttributeSubGroupId) {
        oDcPeriodicsFacade.LoadSubGroup(AttributeSubGroupId);
    }

    DCPlaceOnChange = function ()
    {
        var e = document.getElementById('ddlDCPlace');
        var PlaceName = e.options[e.selectedIndex].text;
        var value = e.options[e.selectedIndex].value;

        OneViewSessionStorage.Save("DcPlaceId", value);
        OneViewSessionStorage.Save("DcPlaceName", PlaceName);

        CompleteLVTemplateResult = {};
        oDcPeriodicsFacade.LoadSubGroup(DailyNodeId);

    }
    YNBandClick = function (Value, TemplateNodeId, AttributeId, ControlId) {
        oDcPeriodicsFacade.YNBandClick(Value, TemplateNodeId, AttributeId, ControlId);
    }

    UpdateDDLMode = function (TemplateNodeId, AttributeId, ControlId) {
        oDcPeriodicsFacade.UpdateDDLMode(TemplateNodeId, AttributeId, ControlId);
    }
    LoadTemplateList = function (TemplateGroupNodeId) {
        oDcPeriodicsFacade.LoadTemplateList(TemplateGroupNodeId);
    }
    
    UpdateTimeMode = function (TemplateNodeId, AttributeId, ControlId) {
        oDcPeriodicsFacade.UpdateTimeMode(TemplateNodeId, AttributeId, ControlId);
    }

    AttachImage = function (TemplateId) {      
        oDcPeriodicsFacade.AttachImage(TemplateId);
    }

    DeleteImage = function (TemplateId) {     
        oDcPeriodicsFacade.DeleteImage(TemplateId);
    }

    ShowInfo = function (AttributeNodeId) {       
        oDcPeriodicsFacade.ShowInfo(AttributeNodeId);
    }

    $scope.HideAttributeInfo = function () {
        oDcPeriodicsFacade.HideAttributeInfo();
    }
       
    var lastTimeOutId = null;
    $scope.GraphSearch = function () {
        if (lastTimeOutId != null)
            window.clearTimeout(lastTimeOutId);
        lastTimeOutId = window.setTimeout(oDcPeriodicsFacade.GraphSearch, PeriodicsGraphSearchTime);
    }
    

    $scope.$on('$destroy', function () {
        oDcPeriodicsFacade.Destroy();
        oscope = null;
    });

});



////////////////**************** DcPeriodicsController END *******************//////////////////////////////





var DailyNodeId = 339;
var WeeklyNodeId = 340;
var MonthlyNodeId = 341;
var CurrentSubGroupId = 0;
var FromSubGroupId = 0;
var DCFreqTemplateGroupWiseStatus = {};
////////////////**************** DcPeriodicsFacade START *******************//////////////////////////////


function DcPeriodicsFacade(param) {

    var scope = param.scope;
    var location = param.location;
    var xlatService = param.xlatService;
    var compile = param.compile;
    var MyInstance = this;
  
  

    var oPeriodicsComponent = new PeriodicsComponent(xlatService);

    
   
    //var Response = {
    //    Occurence: 0,
    //    OverAllCompletedDCCount: 0,
    //    OverAllInProgressDCCount: 0,
    //    TemplateInfo: {}
    //};

    this.Init = function ($location) {
        try {
            OneViewConsole.Debug("Init Start", "DcPeriodicsFacade.Init");
         
            //OneViewSessionStorage.Save("TemplateId", 3);
            //OneViewSessionStorage.Save("TemplateName", "TemplateName");
           // IsNoProfile= oPeriodicsComponent.LoadDCPlace()
            //if (IsNoProfile == true) {
            //    alert('No profile,Please download the profile');

            //    $location.url('/dashboard');
            //}
            //else {
                scope.periodicsGraphSearchElement = "";
                OneViewSessionStorage.Save("CurrentShiftId", 0);
                OneViewSessionStorage.Save("CurrentShiftName", "");
                oPeriodicsComponent.SetTemplateGroupCompleteMetadata();
                TemplateGroupWiseStatusDict = oPeriodicsComponent.GetTemplateGroupWiseStatus(338);
                //var DailyStatus = oPeriodicsComponent.GetTemplateGroupWiseStatus(DailyNodeId);
                //var WeeklyStatus = oPeriodicsComponent.GetTemplateGroupWiseStatus(WeeklyNodeId);
                //var MonthlyStatus = oPeriodicsComponent.GetTemplateGroupWiseStatus(MonthlyNodeId);

                //DCFreqTemplateGroupWiseStatus[DailyNodeId] = DailyStatus;
                //DCFreqTemplateGroupWiseStatus[WeeklyNodeId] = WeeklyStatus;
                //DCFreqTemplateGroupWiseStatus[MonthlyNodeId] = MonthlyStatus;

                //document.getElementById('divDaily').innerHTML = DailyStatus.OverAllCompletedDCCount + '/' + DailyStatus.Occurence;
                //document.getElementById('divWeekly').innerHTML = WeeklyStatus.OverAllCompletedDCCount + '/' + WeeklyStatus.Occurence;
                //document.getElementById('divMonthly').innerHTML = MonthlyStatus.OverAllCompletedDCCount + '/' + MonthlyStatus.Occurence;
                
                OneViewConsole.Debug("Init End", "DcPeriodicsFacade.Init");
            //}
        }
        catch (Excep) {         
            oOneViewExceptionHandler.Catch(Excep, "DcPeriodicsFacade.Init", xlatService);
        }
    }

    this.PageLoad = function () {
        try {
            OneViewConsole.Debug("PageLoad Start", "DcPeriodicsFacade.PageLoad");


            ////********Get DcPreviewMetadata*****////
            //var ServiceId = OneViewSessionStorage.Get("ServiceId");
            //var DcPlaceId = 0;
            //var DcPlaceDimension = -1;
            //var TemplateId =0;
            //var DcUserId = OneViewSessionStorage.Get("LoginUserId");
            //Req : ServiceId, DcUserId, TemplateNodeId, DcPlaceId, DcPlaceDimension
        
            
            OneViewConsole.Debug("PageLoad End", "DcPeriodicsFacade.PageLoad");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcPeriodicsFacade.PageLoad", xlatService);
        }
    }

    this.Back = function () {
        try {


            OneViewConsole.Debug("Back Start", "DcPeriodicsFacade.Back");

            if (oPeriodicsComponent.Back()==true)
            {
                scope.periodicsGraphSearchElement = "";
                scope.ShowSearchDiv = false;
                scope.ShowBackDiv = false;
                scope.ShowSaveDiv = false;
                scope.ShowSubmitDiv = false;
                scope.ShowFooterDiv = false;
                var _oDOM = new DOM();
                _oDOM.RemoveClass('MainContentDivId', 'has-header');
                _oDOM.RemoveClass('MainContentDivId', 'has-footer');
                scope.$apply();
            }
            //oPeriodicsComponent.LoadSubGroup(CurrentSubGroupId);
        
            OneViewConsole.Debug("Back End", "DcPeriodicsFacade.Back");


        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcPeriodicsFacade.Back", xlatService);
        }
    }

    this.Save = function () {
        try {
            OneViewConsole.Debug("Save Start", "DcPeriodicsFacade.Save");

            oPeriodicsComponent.Save();

            OneViewConsole.Debug("Save End", "DcPeriodicsFacade.Save");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcPeriodicsFacade.Save", xlatService);
        }
    }





    this.LoadSubGroup = function (AttributeSubGroupId) {
        try {
           
            OneViewConsole.Debug("LoadSubGroup Start", "DcPeriodicsFacade.LoadSubGroup");
            CurrentSubGroupId = AttributeSubGroupId;           

            oPeriodicsComponent.LoadSubGroup(AttributeSubGroupId);


            OneViewConsole.Debug("LoadSubGroup End", "DcPeriodicsFacade.LoadSubGroup");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcPeriodicsFacade.LoadSubGroup", xlatService);
        }
    }

    this.YNBandClick = function (Value, TemplateNodeId, AttributeId, ControlId) {
        try {
            OneViewConsole.Debug("YNBandClick Start", "DcPeriodicsFacade.YNBandClick");

            oPeriodicsComponent.YNBandClick(Value, TemplateNodeId, AttributeId, ControlId);

            OneViewConsole.Debug("YNBandClick End", "DcPeriodicsFacade.YNBandClick");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcPeriodicsFacade.YNBandClick", xlatService);
        }
    }

    this.UpdateDDLMode = function (TemplateNodeId, AttributeId, ControlId) {
        try {
            OneViewConsole.Debug("UpdateDDLMode Start", "DcPeriodicsFacade.UpdateDDLMode");

            oPeriodicsComponent.UpdateDDLMode(TemplateNodeId, AttributeId, ControlId);

            OneViewConsole.Debug("UpdateDDLMode End", "DcPeriodicsFacade.UpdateDDLMode");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcPeriodicsFacade.UpdateDDLMode", xlatService);
        }
    }

    this.LoadTemplateList = function (TemplateGroupNodeId) {
        try {
            OneViewConsole.Debug("LoadTemplateList Start", "DcPeriodicsFacade.LoadTemplateList");                     
            oPeriodicsComponent.LoadTemplateList(TemplateGroupNodeId);
            scope.ShowSearchDiv = true;        
            scope.ShowBackDiv = true;
            scope.ShowSaveDiv = true;
            scope.ShowSubmitDiv = true;
            scope.ShowFooterDiv = true;
            var _oDOM = new DOM();
            _oDOM.AddClass('MainContentDivId', 'has-header');
            _oDOM.AddClass('MainContentDivId', 'has-footer');
            scope.$apply();           
            OneViewConsole.Debug("LoadTemplateList End", "DcPeriodicsFacade.LoadTemplateList");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcPeriodicsFacade.LoadTemplateList", xlatService);
        }
    }

    this.UpdateTimeMode = function (TemplateNodeId, AttributeId, ControlId) {
        try {
            OneViewConsole.Debug("UpdateTimeMode Start", "DcPeriodicsFacade.UpdateTimeMode");

            oPeriodicsComponent.UpdateTimeMode(TemplateNodeId, AttributeId, ControlId);

            OneViewConsole.Debug("UpdateTimeMode End", "DcPeriodicsFacade.UpdateTimeMode");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcPeriodicsFacade.UpdateTimeMode", xlatService);
        }
    }

    this.Destroy = function () {
        try {
            OneViewConsole.Debug("Destroy Start", "DcPeriodicsFacade.Destroy");

            TemplateGroupWiseStatusDict = {};

            OneViewConsole.Debug("Destroy End", "DcPeriodicsFacade.Destroy");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcPeriodicsFacade.Destroy", xlatService);
        }
    }

    this.AttachImage = function (TemplateId) {
        try {
            OneViewConsole.Debug("AttachImage Start", "DcPeriodicsFacade.AttachImage");
            
            var _oOneViewCordovaCameraPlugin = new OneViewCordovaCameraPlugin();
            _oOneViewCordovaCameraPlugin.CaptureImage(function (_ImageURL) {
                var MultiMediaElement = {
                    "Id": 0,
                    "ServerId": 0,
                    "MappedEntityClientGuid": "",//""
                    "Dimension": DATEntityType.DataCapture,
                    "MultiMediaType": "image/jpg",
                    "LocalURL": _ImageURL,
                    "Comments": "",
                    "IsDisabled": false,
                };

              
                if (CompleteLVTemplateResult[TemplateId].DCImages.length == 0) {
                    CompleteLVTemplateResult[TemplateId].DCImages.push(MultiMediaElement);                   
                }
                else {
                    for (var i = 0; i < CompleteLVTemplateResult[TemplateId].DCImages.length ; i++) {
                        var ImageData = CompleteLVTemplateResult[TemplateId].DCImages[i];
                        if (ImageData.Id == 0) {
                            ImageData.LocalURL = _ImageURL;
                            break;
                        }
                        else {
                            CompleteLVTemplateResult[TemplateId].DCImages.push(MultiMediaElement);
                        }
                    }
                }
                document.getElementById("Image_" + TemplateId).src = _ImageURL;
                document.getElementById("DivImage_" + TemplateId).style.display = "";
                
                CompleteLVTemplateResult[TemplateId].IsUpdated = true;
                
            });

            OneViewConsole.Debug("AttachImage End", "DcPeriodicsFacade.AttachImage");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcPeriodicsFacade.AttachImage", xlatService);
        }
    }

    this.DeleteImage = function (TemplateId) {
        try {
            OneViewConsole.Debug("DeleteImage Start", "DcPeriodicsFacade.DeleteImage");

            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            oOneViewCordovaPlugin.DefaultConfirmBox("Confirmation", "Are you sure you want to delete ?", function (ConfirmationId) {

                if (ConfirmationId == '2') {
                    oPeriodicsComponent.DeleteDCImageEvent(TemplateId);
                }
            });

           

            OneViewConsole.Debug("DeleteImage End", "DcPeriodicsFacade.DeleteImage");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcPeriodicsFacade.DeleteImage", xlatService);
        }
    }

    this.ShowInfo = function (AttributeNodeId) {
        try {
            OneViewConsole.Debug("ShowInfo Start", "DcPeriodicsFacade.ShowInfo");

            oPeriodicsComponent.ShowInfo(AttributeNodeId);

            OneViewConsole.Debug("ShowInfo End", "DcPeriodicsFacade.ShowInfo");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcPeriodicsFacade.ShowInfo", xlatService);
        }
    }
    
    this.Submit = function () {
        try {
            OneViewConsole.Debug("Submit Start", "DcPeriodicsFacade.Submit");

            oPeriodicsComponent.Submit();

            OneViewConsole.Debug("Submit End", "DcPeriodicsFacade.Submit");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcPeriodicsFacade.Submit", xlatService);
        }
    }

    this.SelectGroup = function (TabIndex) {
        try {
            OneViewConsole.Debug("SelectGroup Start", "DcPeriodicsFacade.SelectGroup");
           
            var _oDOM = new DOM();

            if (TabIndex == "Daily") {                
                _oDOM.AddClass('BtnDaily', 'activated');

                _oDOM.RemoveClass('BtnWeekly', 'activated');
                _oDOM.RemoveClass('BtnMonthly', 'activated');
            }
            else if (TabIndex == "Weekly") {                
                _oDOM.AddClass('BtnWeekly', 'activated');

                _oDOM.RemoveClass('BtnDaily', 'activated');
                _oDOM.RemoveClass('BtnMonthly', 'activated');
            }
            else if (TabIndex == "Monthly") {                
                _oDOM.AddClass('BtnMonthly', 'activated');

                _oDOM.RemoveClass('BtnDaily', 'activated');
                _oDOM.RemoveClass('BtnWeekly', 'activated');
            }
           

            OneViewConsole.Debug("SelectGroup End", "DcPeriodicsFacade.SelectGroup");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcPeriodicsFacade.SelectGroup", xlatService);
        }
    }

    this.GraphSearch = function () {
        try {
            OneViewConsole.Debug("GraphSearch Start", "DcPeriodicsFacade.GraphSearch");
          
            oPeriodicsComponent.GraphSearch(scope);
           // alert( Object.keys(CompleteLVTemplateResult).length  + ", "  +  CurrentSubGroupId + ' , gg : ' + SearchedName);

            OneViewConsole.Debug("GraphSearch End", "DcPeriodicsFacade.GraphSearch");
        }
        catch (Excep) {
            alert('GraphSearch Excep: ' + Excep);
            oOneViewExceptionHandler.Catch(Excep, "DcPeriodicsFacade.GraphSearch", xlatService);
        }
    }

}



////////////////**************** DcPeriodicsFacade END *******************//////////////////////////////






////////////////**************** PeriodicsComponent START *******************//////////////////////////////

var PeriodicTemplateConfigMetadata = {};
var CurrentTemplateSubGroupConfigList = [];
var CompleteLVTemplateResult = {};



function PeriodicsComponent(vxlatService) {

    var MyInstance = this;
    var oxlatService = vxlatService;
    var oPeriodicsDcMultimediaEventHandler = new PeriodicsDcMultimediaEventHandler();
    var oPeriodicBO = new PeriodicBO();
    this.SetTemplateGroupCompleteMetadata = function () {
        try {

            var ServiceId = OneViewSessionStorage.Get("ServiceId");

            var PeriodicalWorksNodeId = 338;


            var PeriodicAGMetaData = MyInstance.GetTemplateGroupMetadata(ServiceId, PeriodicalWorksNodeId, 'Periodic Template');

            //TODO SQLLITE

            // var FreqAGList = [{ ServerId: 111, ChildDbElementName: 'Daily' }, { ServerId: 222, ChildDbElementName: 'weekly' }, { ServerId: 333, ChildDbElementName: 'Monthly' }];
            // var FreqAGList = MyInstance.GetOrganizationAssetsNodeByParentNode_DAO(PeriodicalWorksNodeId);

            // for (var i = 0; i < FreqAGList.length; i++) {
            //  var AG_FreqNode = FreqAGList[i];
            // var AG_FreqMetaData = MyInstance.GetTemplateGroupMetadata(ServiceId, AG_FreqNode.ServerId, AG_FreqNode.ChildDbElementName);
            // PeriodicAGMetaData.TemplateSubGroupConfigMetaDataDetails.push(AG_FreqMetaData);

            //add Area List under the Frequency sub TempateGroups
            //TODO SQLLITE
            //var AreaList = [{ ServerId: 1, ChildDbElementName: 'Area 1' }, { ServerId: 2, ChildDbElementName: 'Area 3' }];
            var AreaList = MyInstance.GetOrganizationAssetsNodeByParentNode_DAO(PeriodicalWorksNodeId);
            
            for (var j = 0; j < AreaList.length; j++) {

                var AG_AreaNode = AreaList[j];
                var AG_AreaMetaData = MyInstance.GetTemplateGroupMetadata(ServiceId, AG_AreaNode.ServerId, AG_AreaNode.ChildDbElementName);
                    
                //  AG_FreqMetaData.TemplateSubGroupConfigMetaDataDetails.push(AG_AreaMetaData);
                PeriodicAGMetaData.TemplateSubGroupConfigMetaDataDetails.push(AG_AreaMetaData);
                //add task TemplateList
                //TODO SQLLITE
                // var Task_TemplateList = [{ ServerId: 101, ChildDbElementName: 'Pallet/Cage Storage areas' }, { ServerId: 102, ChildDbElementName: 'Perimeter Area' }];
                var Task_TemplateList = MyInstance.GetOrganizationAssetsNodeByParentNode_DAO(AG_AreaNode.ServerId);
                //var Task_TemplateList = [{ ServerId: 101, ChildDbElementName: 'Pallet/Cage Storage areas' }];
                for (var k = 0; k < Task_TemplateList.length; k++) {
                    var Template_TaskNode = Task_TemplateList[k];

                    //TODO SQLLITE
                    // var AttributeNodeId = 111;
                    //  var AttributeNodeId = Template_TaskNode.ServerId;
                      
                    var AttributeNodeIdList = MyInstance.GetOrganizationAssetsNodeByParentNode_DAO(Template_TaskNode.ServerId);
                    // alert('AttributeNodeIdList : ' + JSON.stringify(AttributeNodeIdList));
                    var AttributeNodeId = AttributeNodeIdList[0].ServerId;
                    //alert('AttributeNodeId : ' + AttributeNodeId);
                    var Template_Metadata = MyInstance.GetTemplate(ServiceId, Template_TaskNode.ServerId, Template_TaskNode.ChildDbElementName, AttributeNodeId);

                    AG_AreaMetaData.TemplateConfigMetaDataDetails.push(Template_Metadata);
                }

            }
            // }
            PeriodicTemplateConfigMetadata = PeriodicAGMetaData;
            //alert('PeriodicTemplateConfigMetadata : ' + JSON.stringify(PeriodicTemplateConfigMetadata));
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.SetTemplateGroupCompleteMetadata", Excep);
        }
    }

    this.GetTemplateGroupMetadata = function (ServiceId, TemplateGroupNodeId, TemplateGroupName) {
        try {

            var TemplateGroup = {

                "ServiceId": ServiceId,
                "TemplateGroupNodeId": TemplateGroupNodeId,
                "TemplateGroupName": TemplateGroupName,
                "TemplateeGroupShortName": null,
                "TemplateeGroupDescription": "",
                "TemplateeGroupVersion": "",
                "OVGuid": 0,
                "TemplateSubGroupConfigMetaDataDetails": [],
                "TemplateConfigMetaDataDetails": []
            }
            return TemplateGroup;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.GetTemplateGroupMetadata", Excep);
        }
    }

    this.GetTemplate = function (ServiceId, TemplateId, TemplateName, TaskAttributeId) {
        try {
            var Template1 = {

                "ServiceId": ServiceId,
                "TemplateNodeId": TemplateId,
                "TemplateName": TemplateName,
                "TemplateShortName": null,
                "TemplateDescription": "",
                "TemplateVersion": "",
                "IsHeaderEnable": false,
                "IsFooterEnable": false,
                "IsScoringLogicEnabled": false,
                "ScoringLogicType": 1,
                "OVGuid": 0,
                "ESTTime": 0,
                "IsESTEnabled": false,
                "ESTDisplayTimeMode": 0,
                "PageLoadNCEvaluation": false,
                "PageLoadUIEventJobEvaluation": false,
                "SaveNCEvaluation": false,
                "SaveUIEventJobEvaluation": false,
                "TemplateConfigMetaDataDetails": {
                    "_id": TaskAttributeId,
                    "Name": TemplateName,
                    "ShortName": null,
                    "ImageUrl": null,
                    "TypeIcon": null,
                    "IsAttributeGroup": true,
                    "AttributeGroupType": 0,
                    "AttributeGroupTypeName": null,
                    "Childs": [
                        {
                            "_id": TaskAttributeId,
                            "Name": TemplateName,
                            "ShortName": null,
                            "ImageUrl": null,
                            "TypeIcon": null,
                            "IsAttributeGroup": false,
                            "AttributeGroupType": 0,
                            "AttributeGroupTypeName": null,
                            "Childs": [],
                            "AnswerModes": [

                                {
                                    "_t": "DCListViewControlConfig",
                                    "Type": "DCListViewControlConfig",
                                    "ControlId": "BandControlId_" + TaskAttributeId,
                                    "LabelKey": "Are Jobs done?",
                                    "DataType": 0,
                                    "ListViewDataSourceConfig": {
                                        "_t": "BandListViewDataSourceConfig",
                                        "Type": "BandListViewDataSourceConfig",
                                        "BandId": 1,
                                        "IsOnline": false
                                    },
                                    "ListViewDisplay": 0,
                                    "DisplayMode": 0,
                                    "SelectionType": 0,
                                    "Weightage": 1,
                                    "MaxScore": 1,
                                    "DisplayOrder": 0,
                                    "DefaultHide": false,
                                    "DefaultDisable": false
                                },
                                   {
                                       "_t": "DCTextBoxControlConfig",
                                       "Type": "DCTextBoxControlConfig",
                                       "DataType": "DATETIMELOCAL",
                                       "ControlId": "TIMEControlId_" + TaskAttributeId,
                                       "LabelKey": "Time",
                                       "IsManualAllowed": false,
                                       "TextBoxType": 0,
                                       "MaxLength": 0,
                                       "MinLength": 0,
                                       "DisplayOrder": 1,
                                       "Weightage": 0,
                                       "MaxScore": 0,
                                       "DefaultHide": false,
                                       "DefaultDisable": false
                                   },
                                 {
                                     "_t": "DCTextBoxControlConfig",
                                     "Type": "DCTextBoxControlConfig",
                                     "DataType": "STRING",
                                     "ControlId": "ReasonControlId_" + TaskAttributeId,
                                     "LabelKey": "Reason",
                                     "IsManualAllowed": false,
                                     "TextBoxType": 0,
                                     "MaxLength": 0,
                                     "MinLength": 0,
                                     "DisplayOrder": 0,
                                     "Weightage": 0,
                                     "MaxScore": 0,
                                     "DefaultHide": false,
                                     "DefaultDisable": false
                                 }
                            ],
                            "DisplayOrder": 1,
                            "RowIndex": 0,
                            "ColIndex": 0,
                            "TotalRows": 0,
                            "MaxNoOfColumn": 0,
                            "DefaultHide": false,
                            "DefaultDisable": false
                        }

                    ],
                    "AnswerModes": null,
                    "DisplayOrder": 0,
                    "RowIndex": 0,
                    "ColIndex": 0,
                    "TotalRows": 0,
                    "MaxNoOfColumn": 0,
                    "DefaultHide": false,
                    "DefaultDisable": false,
                    "ESTTime": 0.0000000000000000,
                    "IsESTEnabled": false,
                    "ESTDisplayTimeMode": 0
                }
            }
            return Template1;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.GetTemplate", Excep);
        }
    }

   

    ///Load Freq wise Area List
    //Create Area List
    this.LoadSubGroup = function (AttributeSubGroupId) {
        try {
            
            var IsSaveRequired = false;
            for (var key in CompleteLVTemplateResult) {
                var DCData = CompleteLVTemplateResult[key];
                IsSaveRequired = DCData.IsUpdated;
                if (IsSaveRequired == true)
                    break;
            }

            var IsLoadPage = true;

            if (IsSaveRequired == true) {
                var msg = oxlatService.xlat('Unsaved data will be lost. Are you sure want to leave the page?');
                var ConfirmationStatus = confirm(msg);
                if (ConfirmationStatus == true) {
                    IsLoadPage = true;
                    CompleteLVTemplateResult = {};
                }
                else {
                    IsLoadPage = false;
                }

            }
           
            if (IsLoadPage == true) {
               
                FromSubGroupId = AttributeSubGroupId;

                MyInstance.SelectGroup(CurrentSubGroupId);
                oscope.ShowSearchDiv = false;
                oscope.ShowBackDiv = false;
                oscope.ShowSaveDiv = false;
                oscope.ShowSubmitDiv = false;
                oscope.ShowFooterDiv = false;
                var _oDOM = new DOM();
                _oDOM.RemoveClass('MainContentDivId', 'has-header');
                _oDOM.RemoveClass('MainContentDivId', 'has-footer');


               
               
                var AreaListhtml = '';
                //get AreaSubList
                CurrentTemplateSubGroupConfigList = MyInstance.GetSubGroup(AttributeSubGroupId, PeriodicTemplateConfigMetadata);               
                for (var i = 0; i < CurrentTemplateSubGroupConfigList.length; i++) {
                    var TemplateSubGroupConfig = CurrentTemplateSubGroupConfigList[i];
                    //  AreaListhtml += '<li onclick="LoadTemplateList(' + TemplateSubGroupConfig.TemplateGroupNodeId + ');">' + TemplateSubGroupConfig.TemplateGroupName + '</li>';

                    var AttributeGroupBlokHtml = '<div class="item item-icon-right" style="color:#333;" id="TemplateNodeBlock_' + TemplateSubGroupConfig.TemplateGroupNodeId + '">' +
                                                    '<div onclick="LoadTemplateList(' + TemplateSubGroupConfig.TemplateGroupNodeId + ');">' +
                                                          TemplateSubGroupConfig.TemplateGroupName +
                                                          MyInstance.GetActualVsPlanHtml(TemplateSubGroupConfig.TemplateGroupNodeId, TemplateGroupWiseStatusDict.TemplateInfo) +
                                                        //'<span class="item-note">' +

                                                          //  '' +
                                                        //'</span>' +
                                                    '</div>' +
                                                    '<i class="icon icon-angle-right i-arrow"></i>' +
                                                    //'<button class="button more-btn">' +
                                                    //   '<i class="icon icon-ellipsis-v"></i>' +
                                                    // '</button>' +
                                                '</div>';
                    AreaListhtml += AttributeGroupBlokHtml;


                }

                var domUlAreaList = document.getElementById('divAreaList');
                var DOMdivTaskList = document.getElementById('divTaskList');
                DOMdivTaskList.innerHTML = '';

                domUlAreaList.innerHTML = AreaListhtml;
            }
            else {

                //  alert('else IsLoadPage' + IsLoadPage);
                CurrentSubGroupId = FromSubGroupId;
            }

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.LoadSubGroup", Excep);
        }
    }


    this.SelectGroup = function (CurrentSubGroupId) {
        try {
            OneViewConsole.Debug("SelectGroup Start", "DcPeriodicsFacade.SelectGroup");

            var _oDOM = new DOM();

            if (CurrentSubGroupId == DailyNodeId) {
                _oDOM.AddClass('BtnDaily', 'activated');

                _oDOM.RemoveClass('BtnWeekly', 'activated');
                _oDOM.RemoveClass('BtnMonthly', 'activated');
            }
            else if (CurrentSubGroupId == WeeklyNodeId) {
                _oDOM.AddClass('BtnWeekly', 'activated');

                _oDOM.RemoveClass('BtnDaily', 'activated');
                _oDOM.RemoveClass('BtnMonthly', 'activated');
            }
            else if (CurrentSubGroupId == MonthlyNodeId) {
                _oDOM.AddClass('BtnMonthly', 'activated');

                _oDOM.RemoveClass('BtnDaily', 'activated');
                _oDOM.RemoveClass('BtnWeekly', 'activated');
            }


            OneViewConsole.Debug("SelectGroup End", "DcPeriodicsFacade.SelectGroup");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.SelectGroup", Excep);
        }
    }

    this.GetSubGroup = function (AttributeSubGroupId, PeriodicTemplateConfigMetadata) {
        try {
            //Daily,weekly,
            //alert('PeriodicTemplateConfigMetadata.TemplateSubGroupConfigMetaDataDetails.length : ' + PeriodicTemplateConfigMetadata.TemplateSubGroupConfigMetaDataDetails.length);
            //for (var i = 0; i < PeriodicTemplateConfigMetadata.TemplateSubGroupConfigMetaDataDetails.length; i++) {
            //    var TemplateSubGroupConfig = PeriodicTemplateConfigMetadata.TemplateSubGroupConfigMetaDataDetails[i];
            //  //  alert('TemplateSubGroupConfig : ' + JSON.stringify(TemplateSubGroupConfig));
            //    if (TemplateSubGroupConfig.TemplateGroupNodeId == AttributeSubGroupId) {
            //        return TemplateSubGroupConfig.TemplateSubGroupConfigMetaDataDetails;
            //    }
            //}
            return PeriodicTemplateConfigMetadata.TemplateSubGroupConfigMetaDataDetails;
        }
        catch (Excep) {           
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.GetSubGroup", Excep);
        }
    }
    
    var CurrentArea_TemplateGroupNodeId = 0;
    //Load task list
    this.LoadTemplateList = function (TemplateGroupNodeId) {
        try {
            CurrentSubGroupId = TemplateGroupNodeId;
            
            CompleteLVTemplateResult = {};

            CurrentArea_TemplateGroupNodeId = TemplateGroupNodeId;
            // alert('CompleteLVTemplateResult : ' + JSON.stringify(CompleteLVTemplateResult));
            var TemplateList = [];
            for (var i = 0; i < CurrentTemplateSubGroupConfigList.length; i++) {
                var TemplateSubGroupConfig = CurrentTemplateSubGroupConfigList[i];
                if (TemplateSubGroupConfig.TemplateGroupNodeId == TemplateGroupNodeId) {
                    TemplateList = TemplateSubGroupConfig.TemplateConfigMetaDataDetails;
                    break;
                }
            }

            //TODO:
            var DCPlaceId = OneViewSessionStorage.Get('DcPlaceId');
            var DcPlaceDimension = 16;

            var DCUser = OneViewSessionStorage.Get('LoginUserId');
            ///Create HTML

            var TaskListhtml = '';

            for (var i = 0; i < TemplateList.length; i++) {

                var TemplateConfig = TemplateList[i];
                var AttributeId = TemplateConfig.TemplateConfigMetaDataDetails.Childs[0]._id;
                var TemplateDCStatus = MyInstance.GetTemplateDCStatus(DCUser, TemplateConfig.TemplateNodeId, DCPlaceId, DcPlaceDimension);
                var LastDCInfo = { DataCaptureId: 0, DCResultId: 0, DCResultDetailId_YNBand: '', DCResultDetailId_Time: '', DCResultDetailId_Reason: '', BandControlAnswer: '', BandControlValue: '', Time: '', Reason: '' };
                if (TemplateDCStatus != null) {


                    if ((TemplateDCStatus.Occurrence > TemplateDCStatus.OverAllCompletedDCCount) ||
                        (TemplateDCStatus.Occurrence == TemplateDCStatus.OverAllCompletedDCCount && TemplateDCStatus.LastDCInfo != null)) {

                        if (TemplateDCStatus.LastDCInfo != null)
                            LastDCInfo = TemplateDCStatus.LastDCInfo;



                        //init the model for List view framework
                        MyInstance.InitModel(TemplateConfig.TemplateNodeId, TemplateConfig.TemplateName, AttributeId, LastDCInfo, TemplateDCStatus.DcProfileServerId);

                        //  var Labelhtml = MyInstance.GetLabelHtml(TemplateConfig, AttributeId);
                        var AnswerModeHtml = "";
                        for (j = 0; j < TemplateConfig.TemplateConfigMetaDataDetails.Childs[0].AnswerModes.length; j++) {

                            var AnserMode = TemplateConfig.TemplateConfigMetaDataDetails.Childs[0].AnswerModes[j];
                            var ControlId = AnserMode.ControlId;

                            var html = '';
                            if (AnserMode.Type == 'DCListViewControlConfig') {
                                html = MyInstance.GetYNBand(TemplateConfig.TemplateNodeId, AttributeId, ControlId, LastDCInfo)
                            }
                            else if (AnserMode.DataType == 'DATETIMELOCAL') {
                                html = MyInstance.GetDateTimeHtml(TemplateConfig.TemplateNodeId, AttributeId, ControlId, LastDCInfo)
                            }
                            else if (AnserMode.DataType == 'STRING') {
                                html = MyInstance.GetReasonHtml(TemplateConfig.TemplateNodeId, AttributeId, ControlId, LastDCInfo)
                            }
                            AnswerModeHtml = AnswerModeHtml + html;
                        }




                        //TaskListhtml = TaskListhtml + "<br>";
                        var CameraHtml = MyInstance.GetCameraHtml(TemplateConfig.TemplateNodeId);

                        var ImageUrl = "";
                        var DCImages = CompleteLVTemplateResult[TemplateConfig.TemplateNodeId].DCImages;
                        if (DCImages.length > 0) {
                            var ImageResponse = MyInstance.ShowImage(DCImages);
                            ImageUrl = ImageResponse.LocalURL;
                        }
                        //var ImagesHtml = MyInstance.GetImagesHtml(TemplateConfig.TemplateNodeId, ImageUrl);
                        //AnswerModeHtml += CameraHtml + ImagesHtml;

                        //TODO:Integrate the DCTaskStatusHTML
                        var DCTaskStatusHTML = MyInstance.GetDCTaskStatusHTML(TemplateDCStatus, true);
                        //alert('DCTaskStatusHTML : ' + DCTaskStatusHTML);

                        AnswerModeHtml = DCTaskStatusHTML + AnswerModeHtml;
                        var Labelhtml = MyInstance.GetLabelHtml(TemplateConfig, AnswerModeHtml, AttributeId, ImageUrl, false);
                        TaskListhtml = TaskListhtml + Labelhtml;
                    }

                    else //Disable HTML 
                    {
                        var ImageUrl = "";
                        //  var Labelhtml = MyInstance.GetLabelHtml(TemplateConfig, AttributeId);
                        var AnswerModeHtml = "";
                        //for (j = 0; j < TemplateConfig.TemplateConfigMetaDataDetails.Childs[0].AnswerModes.length; j++) {

                        //    var AnserMode = TemplateConfig.TemplateConfigMetaDataDetails.Childs[0].AnswerModes[j];
                        //    var ControlId = AnserMode.ControlId;

                        //    var html = '';
                        //    if (AnserMode.Type == 'DCListViewControlConfig') {
                        //        html = MyInstance.GetYNBand(TemplateConfig.TemplateNodeId, AttributeId, ControlId, LastDCInfo)
                        //    }
                        //    else if (AnserMode.DataType == 'DATETIMELOCAL') {
                        //        html = MyInstance.GetDateTimeHtml(TemplateConfig.TemplateNodeId, AttributeId, ControlId, LastDCInfo)
                        //    }
                        //    else if (AnserMode.DataType == 'STRING') {
                        //        html = MyInstance.GetReasonHtml(TemplateConfig.TemplateNodeId, AttributeId, ControlId, LastDCInfo)
                        //    }
                        //    AnswerModeHtml = AnswerModeHtml + html;
                        //}



                        if (TemplateDCStatus.LastDCInfo != null)
                            LastDCInfo = TemplateDCStatus.LastDCInfo;



                        //init the model for List view framework
                        MyInstance.InitModel(TemplateConfig.TemplateNodeId, TemplateConfig.TemplateName, AttributeId, LastDCInfo, TemplateDCStatus.DcProfileServerId);

                        //TaskListhtml = TaskListhtml + "<br>";
                        //var CameraHtml = MyInstance.GetCameraHtml(TemplateConfig.TemplateNodeId);

                        //var ImageUrl = "";
                        //var DCImages = CompleteLVTemplateResult[TemplateConfig.TemplateNodeId].DCImages;
                        //if (DCImages.length > 0) {
                        //    var ImageResponse = MyInstance.ShowImage(DCImages);
                        //    ImageUrl = ImageResponse.LocalURL;
                        //}
                        //var ImagesHtml = MyInstance.GetImagesHtml(TemplateConfig.TemplateNodeId, ImageUrl);
                        //AnswerModeHtml += CameraHtml + ImagesHtml;

                        //TODO:Integrate the DCTaskStatusHTML
                        var DCTaskStatusHTML = MyInstance.GetDCTaskStatusHTML(TemplateDCStatus, false);
                        //alert('DCTaskStatusHTML : ' + DCTaskStatusHTML);

                        AnswerModeHtml = DCTaskStatusHTML + AnswerModeHtml;
                        var Labelhtml = MyInstance.GetLabelHtml(TemplateConfig, AnswerModeHtml, AttributeId, ImageUrl, true);
                        TaskListhtml = TaskListhtml + Labelhtml;

                    }
                }
            }
            var DOMUlTaskList = document.getElementById('divTaskList');
            DOMUlTaskList.innerHTML = TaskListhtml;
            var DOMdivAreaList = document.getElementById('divAreaList');
            DOMdivAreaList.innerHTML = '';

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.LoadTemplateList", Excep);
        }
    }

    this.GetTemplateGroupWiseStatus = function (TemplateGroupNodeId) {
        try {


            var RequestParam = {
                "ServiceId": OneViewSessionStorage.Get('ServiceId'),
                "UserId": OneViewSessionStorage.Get('LoginUserId'),
                "TemplateNodeId": TemplateGroupNodeId,
                "TemplateGroupType": 2,
                "PlaceId": OneViewSessionStorage.Get('DcPlaceId'),
                "DcPlaceDimension": 16,
                "DCPlaceRCOType": 16,
                "IsCompleted": "-1",
                "IsSynchronized": "-1"
            }

            var TemplateGroupWiseStatus = oPeriodicBO.GetByTemplateGroup(RequestParam);

            return TemplateGroupWiseStatus;
          
        } catch (ex) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.GetTemplateGroupWiseStatus", Excep);
        }
    }


    this.GetTemplateDCStatus = function (UserId, TemplateId, DCPlaceId, DcPlaceDimension) {
        try {
            //var ScheduleDetails = GetDefaultScheduleDetails(UserId, TemplateId, DCPlaceId, DcPlaceDimension);
            //var CompletedDCCount = GetCompletedDCCount(ScheduleDetails);
            //var InProgressDCCount = GetInProgressDCCount(ScheduleDetails);

          
            var RequestParam = {
                "ServiceId": OneViewSessionStorage.Get('ServiceId'),
                "UserId": OneViewSessionStorage.Get('LoginUserId'),
                "TemplateNodeId": TemplateId,
                "PlaceId": DCPlaceId,
                "DcPlaceDimension": DcPlaceDimension,
                "DCPlaceRCOType": 16,
                "IsCompleted": "-1",
                "IsSynchronized": "-1",
                "IsLastDcLstNeeded":true
            }
           
            //alert('RequestParam :' + JSON.stringify(RequestParam));


            var DCInfo = oPeriodicBO.Get(RequestParam);
            // alert('DCInfo  :' + JSON.stringify(DCInfo));

            return DCInfo;

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
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.GetTemplateDCStatus", Excep);
        }
    }

    this.InitModel = function (TemplateNodeId, TemplateNodeName, AttributeId, LastDCInfo, DcProfileServerId) {
        try {
            var _LVTemplateResult = {};
            var bandControlId = 'BandControlId_' + AttributeId;
            var timeControlId = 'TIMEControlId_' + AttributeId;
            var ReasonControlId = 'ReasonControlId_' + AttributeId;

            MyInstance.CreateModel(_LVTemplateResult, AttributeId, TemplateNodeName, bandControlId, LastDCInfo.DCResultDetailId_YNBand, LastDCInfo.BandControlAnswer, LastDCInfo.BandControlValue, "0", "STRING", "DCListViewControlConfig",0);
            MyInstance.CreateModel(_LVTemplateResult, AttributeId, TemplateNodeName, timeControlId, LastDCInfo.DCResultDetailId_Time, LastDCInfo.Time, "", "0", "DATETIMELOCAL", "DCTextBoxControlConfig", 0);
            MyInstance.CreateModel(_LVTemplateResult, AttributeId, TemplateNodeName, ReasonControlId, LastDCInfo.DCResultDetailId_Reason, LastDCInfo.Reason, "", "0", "STRING", "DCTextBoxControlConfig", 0);

            var _DCImages = [];
            if (LastDCInfo.DataCaptureClientGuid != '' && LastDCInfo.DataCaptureClientGuid != undefined && LastDCInfo.DataCaptureClientGuid != null) {
                var oActionDAO = new ActionDAO();
                _DCImages =  oActionDAO.GetMultiMediaSubElementsByMappedEntityClientGuid(LastDCInfo.DataCaptureClientGuid, DATEntityType.DataCapture);
            }

            var IsBlocker = false;
            if (LastDCInfo.BandControlAnswer == "N" && LastDCInfo.Reason == "Tesco Access Denied")
            {
                IsBlocker = true;
               
            }

            CompleteLVTemplateResult[TemplateNodeId] =
                {
                    TemplateNodeId: TemplateNodeId,
                    TemplateNodeName: TemplateNodeName,
                    DataCaptureId: LastDCInfo.DataCaptureId,
                    DcProfileServerId: DcProfileServerId,
                    DataCaptureClientGuid:LastDCInfo.DataCaptureClientGuid,
                    DCResultId: LastDCInfo.DCResultId,
                    LVTemplateResult: _LVTemplateResult,
                    IsUpdated:false,
                    DCImages: _DCImages, //{ "IsDeleted": false, "Id": 0,"ServerId": 0,"MappedEntityClientGuid": "","Dimension": DATEntityType.DataCapture, "MultiMediaType": "image/jpg","LocalURL": _ImageURL,"Comments": "", "IsDisabled": false,},
                    IsBlocker: IsBlocker
                };


            //  alert('CompleteLVTemplateResult' + JSON.stringify(CompleteLVTemplateResult));
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.InitModel", Excep);
        }

    }

    this.CreateModel = function (LVTemplateResult, TemplateNodeId, TemplateNodeName, ControlId, DCResultDetailId, Answer, AnswerValue, AnswerFKType, AnswerDataType, AnswerMode, ESTTime) {

        try {
            // OneViewConsole.Debug("CreateModel Start", "LVDefaultAnswerModeComponent.CreateModel");

            var IsNewControl = false;
            if (Answer == undefined)
                Answer = '';

            if (LVTemplateResult[TemplateNodeId] == undefined) {
                LVTemplateResult[TemplateNodeId] = {
                    IsAttributeGroup: false,
                    NA: false,
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
                    SubmitMandatoryInfo: {}
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
                    "ClientGuid": '',
                    "ControlId": ControlId,
                    "Comments": '',
                    "Answer": Answer,
                    "AnswerValue": AnswerValue,
                    "AnswerFKType": AnswerFKType,
                    "AnswerDataType": AnswerDataType,
                    "AnswerMode": AnswerMode,
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

                // MyInstance.RefreshMandatoryInfo(TemplateNodeId, ControlId);
                LVTemplateResult[TemplateNodeId].Answers.push(AnswerModeObj);
                //alert(JSON.stringify(LVTemplateResult[TemplateNodeId]));
            }

            //  OneViewConsole.Debug("CreateModel End", "LVDefaultAnswerModeComponent.CreateModel");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.CreateModel", Excep);
        }

    }






    /////////////////////////////****************** Html START *********************////////////////////

    this.GetReasonHtml = function (TemplateNodeId, AttributeId, ControlId, LastDCInfo) {
        try {
            var IsIndex1_Selected = '';
            var IsIndex2_Selected = '';
            var IsIndex3_Selected = '';
            if (LastDCInfo != null && LastDCInfo.Reason != '') {
                if (LastDCInfo.Reason == "Tesco Access Denied")
                    IsIndex1_Selected = 'selected="selected"';
                else if (LastDCInfo.Reason == "TCFM Resource Absence")
                    IsIndex2_Selected = 'selected="selected"';
                else if (LastDCInfo.Reason == "Resource Allocation Amendment")
                    IsIndex3_Selected = 'selected="selected"';
            }

            var isHide = "none";
            if (LastDCInfo != null && LastDCInfo.BandControlAnswer == 'N')
                isHide = "";
            if (LastDCInfo != null && LastDCInfo.BandControlAnswer == 'Y')
                isHide = "none";


            // var reson = ' <select   id=' + ControlId + '  style="display:none" onchange="UpdateDDLMode(' + TemplateNodeId + ',' + AttributeId + ',' + ControlId + ');">   <option ' + IsIndex1_Selected + ' value="">Tesco Access Denied</option>   <option ' + IsIndex2_Selected + '  value="">TCFM Resource Absence</option>   <option ' + IsIndex3_Selected + '  value="">Resource Allocation Amendment</option>  </select>';

            //todo need to hide the row not select field
            var reson = '<div class="row responsive-md" >' +
                          '<div class="col">'+
                             ' <select id=' + ControlId + '  style="display:' + isHide + '" onchange="UpdateDDLMode(' + TemplateNodeId + ',' + AttributeId + ',' + ControlId + ');">' +
                                 ' <option ' + IsIndex1_Selected + ' value="">Tesco Access Denied</option>' +
                                '  <option ' + IsIndex2_Selected + ' value="">TCFM Resource Absence</option>' +
                                  '<option ' + IsIndex3_Selected + ' value="">Resource Allocation Amendment</option>' +
                             ' </select>'+
                         ' </div>'+
                      '</div>';

          
            return reson;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.GetReasonHtml", Excep);
        }
    }

    this.GetLabelHtml = function (Template, AnswerModeHtml, AttributeNodeId, ImageUrl,IsCameraDisabled) {
        try {
            // return '<label onclick="alert(' + Template.TemplateNodeId + ')">' + Template.TemplateName + '</label>';
           
            var AttributeHtml = '<span>' + Template.TemplateName + '</span>'
            //var AttributeBlokHtml = '<div class="item attribute item-button-right item-button-l" style="border-color: #929b9e;" id="TemplateNodeBlock_' + TemplateNodeId + '"><div class="item-left-edit visible active"><button class="button"><i style="color:#b3b3b3;" class="icon icon-camera"></i></button></div>' +
            //                                  AttributeHtml +
            //                                  '<div style="font-size: 11px;"><b>Freq - </b><span style="color:#266684;">Daily-2</span>&nbsp;&nbsp;&nbsp; <b>Due -</b> <span style="color:#576f15;">12/12/2016</span></div>' +
            //                                  AnswerModeHtml +
            //                                  '<button class="button more-btn" onclick="ShowInfo(' + AttributeNodeId + ')">' +
            //                                '<i class="icon icon-info-circle" style="margin-left: -12px; color:#b3b3b3;"></i>' +
            //                                '</button>' +                                             
            //                              '</div>';

            var IsHideImage = "none";
            if (ImageUrl != "") {
                IsHideImage = "";
            }

            var background = "";
            if (IsCameraDisabled == true) {
                background = "background:#F2F6F7;";
            }

            var AttributeBlokHtml = '<div class="item attribute item-button-right item-button-l" style="border-color: #d4d9dc;' + background + ' margin:0px;" id="TemplateNodeBlock_' + Template.TemplateNodeId + '">' +
                                            MyInstance.GetCameraHtml(Template.TemplateNodeId, IsCameraDisabled) +
                                             AttributeHtml +
                                             ////'<div style="font-size: 11px;"><b>Freq - </b><span style="color:#266684;">Daily-2</span>&nbsp;&nbsp;&nbsp; <b>Due -</b> <span style="color:#576f15;">12/12/2016</span></div>' +
                                             AnswerModeHtml +
                                            MyInstance.GetImagesHtml(Template.TemplateNodeId, ImageUrl, IsHideImage) +
                                             '<button class="button more-btn" onclick="ShowInfo(' + AttributeNodeId + ')">' +
                                           '<i class="icon icon-info-circle" style="margin-left: -12px; color:#b3b3b3;"></i>' +
                                           '</button>' +
                                         '</div>';

            //<div class="row responsive-md" id="DivImage_' + TemplateId + '"  style="display:none"  >'+
            //     '</div>';
            return AttributeBlokHtml;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.GetLabelHtml", Excep);
        }
    }

    this.GetYNBand = function (TemplateNodeId, AttributeId, ControlId, LastDCInfo) {
        try {
            var YSelected = '';
            var NSelected = '';
            if (LastDCInfo != null && LastDCInfo.BandControlAnswer == 'Y')
                YSelected = "background-color: #00ff00 ;color:white"
            if (LastDCInfo != null && LastDCInfo.BandControlAnswer == 'N')
                NSelected = "background-color: #ff0000 ;color:white"

           
   
            var hts = ' <div class="row responsive-md"> <div class="col"><div class="button-bar"> ';
            var Yband = '<button class="button" style="' + YSelected + '" name="' + ControlId + '" id="Y_' + ControlId + '" onclick="YNBandClick(\'Y\',' + TemplateNodeId + ',' + AttributeId + ',\'' + ControlId + '\');">Y</button>';
            var Nband = '<button class="button" style="' + NSelected + '" name="' + ControlId + '" id="N_' + ControlId + '" onclick="YNBandClick(\'N\',' + TemplateNodeId + ',' + AttributeId + ',\'' + ControlId + '\');">N</button>';

            var Html = hts + Yband + Nband + "</div></div></div>";
            //alert('Html : ' + Html);
            return Html;
            //return '<input type="button" id="btnSave" value="Y" onclick="YNBandClick(\'Y\');" /> <input type="button" id="btnSave" value="N" onclick="YNBandClick("N",' + TemplateNodeId + ',' + AttributeId + ',"' + ControlId + '");"/>';
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.GetYNBand", Excep);
        }
    }

    this.GetDateTimeHtml = function (TemplateNodeId, AttributeId, ControlId, LastDCInfo) {
        try {           
            var Answer = '';
            var isHide = "none";
            if (LastDCInfo != null && LastDCInfo.Time != '' &&  LastDCInfo.Time != undefined) {
                Answer = LastDCInfo.Time;

                if (Answer != "" && Answer.indexOf(' ') != -1) {
                    var DateTime = Answer.split(' ');
                    var Date = DateTime[0].split('-');
                    Answer = Date[2] + "-" + Date[1] + "-" + Date[0] + "T" + DateTime[1];
                }
            }

            if (Answer == undefined)
                Answer = '';

            if (LastDCInfo != null && LastDCInfo.BandControlAnswer == 'N')
                isHide = "none";
            if (LastDCInfo != null && LastDCInfo.BandControlAnswer == 'Y')
                isHide = "";

            //var Html = '<div  style="display:' + isHide + '" class="row responsive-md"><div class="col"> <label> <input value="' + time + '" type= "datetime-local" id="' + ControlId + '" oninput="UpdateTimeMode(' + TemplateNodeId + ',' + AttributeId + ',' + ControlId + ');" /> </label></div>';

            //todo : moved id from datetime to div , need to check any other place using datetime control id
            var Html = ' <div class="row responsive-md" id="Div_' + ControlId + '" style="display:' + isHide + '" >' +
                           ' <div class="col">'+
                               ' <div class="field-item with-icon">'+
                                   ' <label>'+
                                       ' <input type="datetime-local" id="' + ControlId + '" value="' + Answer + '"  oninput="UpdateTimeMode(' + TemplateNodeId + ',' + AttributeId + ',\'' + ControlId + '\');" >' +
                                       ' <i class="icon icon-clock-o"></i>'+
                                   ' </label>'+
                               ' </div>'+
                           ' </div>'+
                       ' </div>';

           
            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.GetDateTimeHtml", Excep);
        }
    }

    this.GetCameraHtml = function (TemplateId, IsCameraDisabled) {
        try {
            //var Html = '<div class="row responsive-md">'+
            //                '<div class="col">'+
            //                    '<div class="button-bar"><button class="button" onclick="AttachImage(' + TemplateId + ');"><i class="icon icon-camera"></i></button></div>' +
            //               ' </div>'+
            //           ' </div>';

            var disabled = '';
            if (IsCameraDisabled==true)
                disabled = 'disabled';

            var Html = '<div class="item-left-edit visible active"><button class="button" ' + disabled + ' onclick="AttachImage(' + TemplateId + ');"><i style="color:#b3b3b3;" class="icon icon-camera"></i></button></div>';

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.GetCameraHtml", Excep);
        }
    }

    this.GetImagesHtml = function (TemplateId, ImageUrl, isHide) {
        try {
           
            var Html = ' <div class="row responsive-md" id="DivImage_' + TemplateId + '"  style="display:' + isHide + '" >' +
                           ' <div class="col"><img src="' + ImageUrl + '" style="height: 150px;" id="Image_' + TemplateId + '" class="margin-right" alt="No Image" onclick="DeleteImage(' + TemplateId + ');" /></div>' +
                        '</div>';

            //alert('Html : ' + Html);
            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.GetImagesHtml", Excep);
        }
    }


    this.daysBetween = function (date1, date2) {
        try {
            //Get 1 day in milliseconds
            var one_day = 1000 * 60 * 60 * 24;

            // Convert both dates to milliseconds
            var date1_ms = date1.getTime();
            var date2_ms = date2.getTime();

            // Calculate the difference in milliseconds
            var difference_ms = date2_ms - date1_ms;

            // Convert back to days and return
            return Math.round(difference_ms / one_day);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.daysBetween", Excep);
        }
    }

   
    //date2:PeriodEndDate
    //date1:CurrentDate

    this.TaskDueTimeDiff = function (date1, date2) {
        try {
            //Get 1 day in milliseconds
            var one_day = 1000 * 60 * 60 * 24;
            var one_hour = 1000 * 60 * 60;
            var one_Minutes = 1000 * 60;

            // Convert both dates to milliseconds
            var date1_ms = date1.getTime();
            var date2_ms = date2.getTime();

            // alert('date1_ms : ' + date1_ms + ' , date2_ms : ' + date2_ms );


            // Calculate the difference in milliseconds
            var difference_ms = date2_ms - date1_ms;

            var difference_inMinutes = Math.round(difference_ms / one_Minutes);
            var difference_inHour = Math.round(difference_ms / one_hour);
            var difference_inDay = Math.round(difference_ms / one_day);

            //alert('difference_ms : '+difference_ms +' , difference_inMinutes : ' + difference_inMinutes + ' , difference_inHour : ' + difference_inHour + ' , difference_inDay : ' + difference_inDay);

            if (difference_inMinutes < 60)
                return difference_inMinutes + ' Minutes ';
            else if (difference_inHour < 24) {
                return difference_inHour + ' Hours ';
            }
            else
                return difference_inDay + ' Days ';
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.TaskDueTimeDiff", Excep);
        }
    }


    //Daiy 5 Task, Status 2/5 ,Task due on : 10/Jan/2016 , 2 Hours more to finish the task.
    this.GetDCTaskStatusHTML = function (TemplateDCStatus, ViewDueStatus) {
        try {
            //var TaskEndDate = new Date(TemplateDCStatus.PeriodTypeEndDate); //dd/mm/yyyy 
            var _DateArray = TemplateDCStatus.PeriodTypeEndDate.split(' ')[0].split('-');
            var _TimeArray = TemplateDCStatus.PeriodTypeEndDate.split(' ')[1].split(':');

            var TaskEndDate = new Date(_DateArray[2], (parseInt(_DateArray[1]) - 1), _DateArray[0], _TimeArray[0], _TimeArray[1], _TimeArray[2]);
            var CurrentDate = new Date();
            var TaskEndFor = MyInstance.TaskDueTimeDiff(CurrentDate, TaskEndDate);

            //'<div style="font-size: 11px;"><b>Freq - </b><span style="color:#266684;">Daily-2</span>&nbsp;&nbsp;&nbsp; <b>Due -</b> <span style="color:#576f15;">12/12/2016</span></div>' +
            var status = ', <b> Status - </b>  <span style="color:#266684;">' + TemplateDCStatus.OverAllCompletedDCCount + '/' + TemplateDCStatus.Occurrence + '</span>';

            var DueStatus = '';
            if (ViewDueStatus == true)
                DueStatus = '<b>Due by - </b> <span style="color:#576f15;">' + TemplateDCStatus.PeriodTypeEndDate.split(' ')[0] + ' - ' + TaskEndFor + ' Left! </span>'

            // var Html = '<div style="font-size: 11px;"><b>Periodic - </b><span style="color:#266684;">' + TemplateDCStatus.PeriodTypeName + ' - ' + TemplateDCStatus.Occurrence + '</span>&nbsp;&nbsp;&nbsp; <b>Due by - </b> <span style="color:#576f15;">' + TemplateDCStatus.PeriodTypeEndDate + ' - ' + TaskEndFor + ' More! </span></div>';
            var Html = '<div style="font-size: 11px;"><b>Periodic - </b><span style="color:#266684;">' + TemplateDCStatus.PeriodTypeName + ' </span> ' + status + '&nbsp;&nbsp;&nbsp;' + DueStatus + '</div>';
            // var Html = '<div style="font-size: 11px;"><b>Periodic - </b><span style="color:#266684;">' + TemplateDCStatus.PeriodTypeName + '  ' + status + '</span>&nbsp;&nbsp;&nbsp; <b>Due by - </b> <span style="color:#576f15;">' + TemplateDCStatus.PeriodTypeEndDate.split(' ')[0] + ' - ' + TaskEndFor + ' More! </span></div>';
            //return TemplateDCStatus.PeriodTypeName + ' - ' + TemplateDCStatus.Occurrence + ' Status :  ' + TemplateDCStatus.OverAllCompletedDCCount
            //    + '/' + TemplateDCStatus.Occurrence + "  Taske Due on :" + TaskEndDate + "  " + TaskEndFor + " More!";

            // alert('Html :' + Html);
            return Html;

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
            // };]
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.GetDCTaskStatusHTML", Excep);
        }
    }

    this.GetActualVsPlanHtml = function (TemplateGroupNodeId, TemplateInfoDict) {
        try {
            var TemplateGroupNodeCountData = TemplateInfoDict[TemplateGroupNodeId];
            // alert('TemplateGroupNodeCountData : ' + JSON.stringify(TemplateGroupNodeCountData));
            var Html = '<div id="DivPlanActualCount_' + TemplateGroupNodeId + '" class="badge badge-energized" style="color: #fff; background: #7fab0b; line-height: 6px; left: inherit; top: 17px; margin-left: 3px; padding: 5px; border-radius: 5px; font-size: 11px;">' + TemplateGroupNodeCountData.OverAllCompletedDCCount + '/' + TemplateGroupNodeCountData.Occurrence + '</div>';

            //alert('Html : ' + Html);
            return Html;
        }
        catch (Excep) {          
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.GetActualVsPlanHtml", Excep);
        }
    }
    /////////////////////////////****************** Html END *********************////////////////////









    /////////////////////////////****************** Html Event START *********************////////////////////

 

    this.YNBandClick = function (Value, TemplateNodeId, AttributeId, ControlId) {
        try {
           
            var DivtimeControlId = 'Div_TIMEControlId_' + AttributeId;
            var timeControlId = 'TIMEControlId_' + AttributeId;
            var ReasonControlId = 'ReasonControlId_' + AttributeId;
            var LVTemplateResult = CompleteLVTemplateResult[TemplateNodeId].LVTemplateResult;

            //TODO:check old value and new value
            CompleteLVTemplateResult[TemplateNodeId].IsUpdated = true;

            if (LVTemplateResult[AttributeId].Answers[0].Answer != Value) {
                if (Value == "Y") {

                    
                    var YBand = document.getElementById("Y_" + ControlId);
                    YBand.style.backgroundColor = "#00ff00";
                    YBand.style.color = "white";

                    var NBand = document.getElementById("N_" + ControlId);
                    NBand.style.backgroundColor = "";
                    NBand.style.color = "black";

                    document.getElementById(DivtimeControlId).style.display = "";
                    document.getElementById(ReasonControlId).style.display = "none";

                    //Reason make it null on model
                    LVTemplateResult[AttributeId].Answers[2].Answer = '';
                    CompleteLVTemplateResult[TemplateNodeId].IsBlocker = false;


                    //MyInstance.UpdateDDLMode(TemplateNodeId, AttributeId, ReasonControlId);
                }
                else if (Value == "N") {
                    var NBand = document.getElementById("N_" + ControlId);
                    NBand.style.backgroundColor = "#ff0000";
                    NBand.style.color = "white";

                    var YBand = document.getElementById("Y_" + ControlId);
                    YBand.style.backgroundColor = "";
                    YBand.style.color = "black";

                    document.getElementById(DivtimeControlId).style.display = "none";
                    document.getElementById(ReasonControlId).style.display = "";
                    document.getElementById(timeControlId).value = '';

                    //Time make it null on model
                    LVTemplateResult[AttributeId].Answers[1].Answer = '';

                    MyInstance.UpdateDDLMode(TemplateNodeId, AttributeId, ReasonControlId);

                }

                //answer mode first postion is YN band
                if (Value == undefined)
                    Value = '';

                LVTemplateResult[AttributeId].Answers[0].Answer = Value;
                LVTemplateResult[AttributeId].Answers[0].AnswerValue = "";
            }
            else //un select answer
            {
                var confirmStatus= confirm('Are you really want to uncheck the task Status ?');

                if (confirmStatus == true) {
                    //if (LVTemplateResult[AttributeId].Answers[0].Answer == Value) {

                    //Band make it null
                    LVTemplateResult[AttributeId].Answers[0].Answer = '';

                    //Band Answer value make it null
                    LVTemplateResult[AttributeId].Answers[0].AnswerValue = '';

                    //Date make it null
                    LVTemplateResult[AttributeId].Answers[1].Answer = '';

                    //Reason make it null on model
                    LVTemplateResult[AttributeId].Answers[2].Answer = '';

                    //If any blocker make it false
                    CompleteLVTemplateResult[TemplateNodeId].IsBlocker = false;

                    //IsCompleted make it false
                    CompleteLVTemplateResult[TemplateNodeId].IsCompleted = false;

                    //IsCompleted make it false
                    CompleteLVTemplateResult[TemplateNodeId].IsSubmit = false;


                    //Clear Controls
                    //Clear band Controls
                    var YBand = document.getElementById("Y_" + ControlId);
                    YBand.style.backgroundColor = "";
                    YBand.style.color = "black";

                    var NBand = document.getElementById("N_" + ControlId);
                    NBand.style.backgroundColor = "";
                    NBand.style.color = "black";

                    //hide Time control
                    document.getElementById(DivtimeControlId).style.display = "none";
                    //clear Time control
                    document.getElementById(timeControlId).value = '';

                    //hide reason control
                    document.getElementById(ReasonControlId).style.display = "none";

                    //delete the Images
                    MyInstance.DeleteDCImageEvent(TemplateNodeId);
                    //}
                }

            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.YNBandClick", Excep);
        }
    }


    this.UpdateDDLMode = function (TemplateNodeId, AttributeId, ControlId) {
        try {
            //alert(TemplateNodeId + ", " + AttributeId + ", " + ControlId);
            var ReasonControlId = 'ReasonControlId_' + AttributeId;
            var e = document.getElementById(ReasonControlId);
            var reason = e.options[e.selectedIndex].text;
          
            var LVTemplateResult = CompleteLVTemplateResult[TemplateNodeId].LVTemplateResult;

            //TODO:check old value and new value
            CompleteLVTemplateResult[TemplateNodeId].IsUpdated = true;

            if (reason == undefined)
                reason = '';

            //answer mode third postion is reason
            LVTemplateResult[AttributeId].Answers[2].Answer = reason;
            LVTemplateResult[AttributeId].Answers[2].AnswerValue = "";

            if (reason == "Tesco Access Denied")
                CompleteLVTemplateResult[TemplateNodeId].IsBlocker = 'true';
            else
                CompleteLVTemplateResult[TemplateNodeId].IsBlocker = 'false';

           
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.UpdateDDLMode", Excep);
        }
    }


    this.UpdateTimeMode = function (TemplateNodeId, AttributeId, ControlId) {
        try {

            //TODO:check old value and new value
            CompleteLVTemplateResult[TemplateNodeId].IsUpdated = true;


            // var time = document.getElementById(ControlId).value;
            var Answer = '';
            var DOMObj = document.getElementById(ControlId);
            if (DOMObj != null && DOMObj.value.indexOf('T') != -1) {
                var DateTime = DOMObj.value.split('T');
                var Date = DateTime[0].split('-');
                Answer = Date[2] + "-" + Date[1] + "-" + Date[0] + " " + DateTime[1] + ":00";
            }

            var LVTemplateResult = CompleteLVTemplateResult[TemplateNodeId].LVTemplateResult;

            if (Answer == undefined)
                Answer = '';

            //answer mode second postion is time
            LVTemplateResult[AttributeId].Answers[1].Answer = Answer;
            LVTemplateResult[AttributeId].Answers[1].AnswerValue = "";

            // alert(time);
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.UpdateTimeMode", Excep);
        }

    }

    this.ShowInfo = function (AttributeNodeId) {
        try {
            var response = MyInstance.GetAttributeWiseInfoDAO(AttributeNodeId);

            if (response != null && response.length > 0) {
                //alert('More Information : ' + response[0].Info);
                oOneViewCordovaDialogs.alert('CLEAN LOOK LIKE : ' + response[0].Info, 'Attribute Information');
            }
            else {
                alert("IN-DC-PWT-001 ::No Information available");
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.ShowInfo", Excep);
        }

    }


    
    /////////////////////////////****************** Html Event END *********************////////////////////






    /////////////////////////////****************** DC Event START *********************////////////////////


    this.Back = function ()
    {
        try {

            var RedirectPage = false;
            var IsSaveRequired = false;
            for (var key in CompleteLVTemplateResult) {
                var DCData = CompleteLVTemplateResult[key];
                IsSaveRequired = DCData.IsUpdated;
                if (IsSaveRequired == true)
                    break;
            }

            MyInstance.ReloadStatus();
            if (IsSaveRequired == true) {

                var msg = oxlatService.xlat('Unsaved data will be lost. Are you sure want to leave the page?');

                var ConfirmationStatus = confirm(msg);
                if (ConfirmationStatus == true) {
                    CompleteLVTemplateResult = {};
                    MyInstance.LoadSubGroup(CurrentSubGroupId);
                    RedirectPage = true;
                }
            }
            else {
                MyInstance.LoadSubGroup(CurrentSubGroupId);
                RedirectPage = true;
            }
            return RedirectPage;
        }
        catch (Excep) {           
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.Back", Excep);
        }
    }

    //this.Back = function () {

    //    var RedirectPage = MyInstance.ReloadTaskPage();
    //    return RedirectPage;
    //}

    //this.Back = function () {
    //    var RedirectPage = false;
    //    // var TemplateIDsForClearModel = [];
    //    var IsSaveRequired = false;
    //    for (var key in CompleteLVTemplateResult) {

    //        var DCData = CompleteLVTemplateResult[key];

    //        alert('DCData.DataCaptureId : ' + DCData.DataCaptureId +" : DCData.IsUpdated : "+DCData.IsUpdated);


    //            IsSaveRequired = DCData.IsUpdated;
    //            if (IsSaveRequired == true)
    //                break;



    //        //if (DCData.DataCaptureId > 0 && DCData.IsUpdated == true)  ///Update DC case
    //        //{
    //        //    IsSaveRequired = true;
    //        //    break;
    //        //}
    //        //if (DCData.DataCaptureId == 0) {
    //        //    ///NEW DC case
    //        //    IsSaveRequired = MyInstance.CheckIfSaveRequired(DCData.LVTemplateResult);
    //        //    break;
    //        //}

    //    }

        //if (IsSaveRequired == true) {
        //    var ConfirmationStatus = confirm('Are you want to leave the page ? there some record still pending to Save!');
        //    if (ConfirmationStatus == true) {
        //        CompleteLVTemplateResult = {};
        //        MyInstance.LoadSubGroup(CurrentSubGroupId);
        //        RedirectPage = true;
        //    }
        //}
        //else {
        //    MyInstance.LoadSubGroup(CurrentSubGroupId);
        //    RedirectPage = true;
        //}
        //return RedirectPage;
    //}


    this.Save = function () {
        try {

            oSetDefaultSpinner.Start();
            var i = 0;
            var IsSubmit = false;
            // CompleteLVTemplateResult
            for (var key in CompleteLVTemplateResult) {
               
                var DCData = CompleteLVTemplateResult[key];
                var IsSaveRequired = MyInstance.CheckIfSaveRequired(DCData.LVTemplateResult);
                if (IsSaveRequired == true || DCData.DataCaptureId > 0) {
                   
                    var IsCompleted = MyInstance.GetIsCompletedStatus(DCData.LVTemplateResult);

                    OneViewSessionStorage.Save("TemplateId", DCData.TemplateNodeId);
                    OneViewSessionStorage.Save("TemplateName", DCData.TemplateNodeName);

                    if (DCData.DataCaptureId > 0 && DCData.IsUpdated == true) { //Update
                        i = i + 1;
                       
                        OneViewSessionStorage.Save("DcProfileId", DCData.DcProfileServerId);
                        var LVDCSummary = { 'CommentsInfo': { 'IsModified': false }, 'CommentsInfo': { 'Comments': "" }, IsBlocker: DCData.IsBlocker };
                        var DataCaptureClientGuid = DCData.DataCaptureClientGuid;
                        var oTesco_LVDataCaptureBO = new Tesco_LVDataCaptureBO();
                      
                        var response = oTesco_LVDataCaptureBO.Update(DCData.LVTemplateResult, DCData.DataCaptureId, DCData.DCResultId, true, false, LVDCSummary, IsSubmit);
                        response.DcInfo = { 'ClientGuid': DataCaptureClientGuid };                       
                        MyInstance.SaveDCImages(response.DcInfo, DCData.DCImages, key);

                        DCData.IsUpdated = false;
                        //alert('Update successfully');
                    }
                    else if (DCData.DataCaptureId == 0 || DCData.DataCaptureId == undefined || DCData.DataCaptureId == '') { //New
                        i = i + 1;
                        var LVDCSummary = { 'CommentsInfo': { 'IsModified': false }, 'CommentsInfo': { 'Comments': "" }, IsBlocker: DCData.IsBlocker };
                        OneViewSessionStorage.Save("DcProfileId", DCData.DcProfileServerId);

                        var oTesco_LVDataCaptureBO = new Tesco_LVDataCaptureBO();
                        var LVDcStartDate = new DateTime().GetDateAndTime();
                        var response = oTesco_LVDataCaptureBO.Save(DCData.LVTemplateResult, LVDcStartDate, false, LVDCSummary, IsSubmit);
                        MyInstance.SaveDCImages(response.DcInfo, DCData.DCImages, key);


                       var AttributeId=0
                       for (var tempkey in DCData.LVTemplateResult)
                       {
                           AttributeId = tempkey;
                       }

                       

                       //MyInstance.ReloadtheModel(OneViewSessionStorage.Get('LoginUserId'), DCData.TemplateNodeId, DCData.TemplateNodeName, AttributeId, OneViewSessionStorage.Get("DcPlaceId"), 16);                    
                        //response { "DcInfo": DcInfo, "AttributeActionInfo": AttributeActionInfo }
                       // alert('Save successfully');
                    }
                }  
            }
            if (i == 0) {
                oSetDefaultSpinner.Stop();
                alert('VL-CU-PWT-004 :: There is no record to Save');
            }
            else {
               // MyInstance.ReloadStatus();
                //reload the page     
                MyInstance.LoadTemplateList(CurrentArea_TemplateGroupNodeId);
                MyInstance.GraphSearch(oscope);
                oSetDefaultSpinner.Stop();
                alert('VL-CU-PWT-005 :: Saved successfully');

            }
        }
        catch (Excep) {
            oSetDefaultSpinner.Stop();
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.Save", Excep);
        }
    }
    
    this.ReloadtheModel = function (DCUser, TemplateNodeId, TemplateName, AttributeId, DCPlaceId, DcPlaceDimension) {
        try {
            var TemplateDCStatus = MyInstance.GetTemplateDCStatus(DCUser, TemplateNodeId, DCPlaceId, DcPlaceDimension);
            if (TemplateDCStatus !=null && TemplateDCStatus.LastDCInfo != null && Object.keys(TemplateDCStatus.LastDCInfo).length > 0) {
                LastDCInfo = TemplateDCStatus.LastDCInfo;
                MyInstance.InitModel(TemplateNodeId, TemplateName, AttributeId, LastDCInfo, TemplateDCStatus.DcProfileServerId);
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.ReloadtheModel", Excep);
        }
    }

    // DCImages : {MultiMediaSubElementsId:1, ImageURL:'11'}
    // DcInfo   :
    this.SaveDCImages = function (DcInfo, DCImages, TemplateId) {
        try {           
            if (DCImages.length > 1) {
                for (var i = 0; i < DCImages.length ; i++) {
                    var ImageData = DCImages[i];

                    if (ImageData.IsDeleted == true || ImageData.Id != 0) {
                        //delete or disable
                        oPeriodicsDcMultimediaEventHandler.Update(ImageData);
                        CompleteLVTemplateResult[TemplateId].DCImages.splice(i, 1);
                    }
                    else if (ImageData.Id == 0 && ImageData.IsDeleted != true) {
                        ImageData.MappedEntityClientGuid = DcInfo.ClientGuid;
                        var SavedImageDetails = oPeriodicsDcMultimediaEventHandler.Save(ImageData);
                        CompleteLVTemplateResult[TemplateId].DCImages[i].Id = SavedImageDetails.Id;
                    }

                    //else {
                    //    //delete or disable
                    //    oPeriodicsDcMultimediaEventHandler.Update(ImageData);
                    //}
                }
            }
            else if (DCImages.length == 1) {             
                if (DCImages[0].IsDeleted == true) {
                    oPeriodicsDcMultimediaEventHandler.Update(DCImages[0]);
                    CompleteLVTemplateResult[TemplateId].DCImages.splice(0, 1);
                }
                else {
                    DCImages[0].MappedEntityClientGuid = DcInfo.ClientGuid;
                    var SavedImageDetails = oPeriodicsDcMultimediaEventHandler.Save(DCImages[0]);
                    CompleteLVTemplateResult[TemplateId].DCImages[0].Id = SavedImageDetails.Id;
                }
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.SaveDCImages", Excep);
        }
    }

    this.GetIsCompletedStatus = function (LVTemplateResult) {
        try {
            var IsCompleted = false;
            for (var attrId in LVTemplateResult) {

                var TaskStatus = LVTemplateResult[attrId].Answers[0].Answer;
                var Time = LVTemplateResult[attrId].Answers[1].Answer;
                var Reason = LVTemplateResult[attrId].Answers[2].Answer;

                if (TaskStatus == "Y" && Time != '' && Time != undefined) {
                    IsCompleted = true;
                    break;
                }
                if (TaskStatus == "N" && Reason != '' && Reason != undefined) {
                    IsCompleted = true;
                    break;
                }
            }
            return IsCompleted;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.GetIsCompletedStatus", Excep);
        }
    }

    this.CheckIfSaveRequired = function (LVTemplateResult) {
       try {
            var IsSaveRequired = false;
            for (var attrId in LVTemplateResult) {
              
                var TaskStatus = LVTemplateResult[attrId].Answers[0].Answer;
                if (TaskStatus == 'Y' || TaskStatus == 'N')
                    IsSaveRequired = true;
            }
            return IsSaveRequired;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.CheckIfSaveRequired", Excep);
        }
    }

    this.ShowImage = function (DCImages) {
        try {          
            var response = null;
            if (DCImages.length > 1) {
                for (var i = 0; i < DCImages.length ; i++) {
                    var ImageData = DCImages[i];
                    if (ImageData.IsDisabled !=true) { //coz always saving one image not need to check last updated.
                        response = DCImages[i];
                        break;
                    }
                }
            }
            else if (DCImages.length == 1) {
                response = DCImages[0];
            }

            return response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.ShowImage", Excep);
        }
    }

    this.Submit = function () {
        try {
            oSetDefaultSpinner.Start();
            var IsAnyDcSubmitted = false;
            var itr = 1;
            var ValidationMessage = "";
            for (var key in CompleteLVTemplateResult) {
                var Message = "";
                var IsSubmit = true;
                var IsCompleted = true;
                var IsSaveRequired = true;
                var DCData = CompleteLVTemplateResult[key];
                var LVTemplateResult = DCData.LVTemplateResult;
                //var IsSaveRequired = MyInstance.CheckIfSaveRequired(LVTemplateResult);

                //if (IsSaveRequired == true) {                
                var AttributeNodeId = 0
                for (var attrId in LVTemplateResult) {
                    AttributeNodeId = attrId;

                    var TaskStatus = LVTemplateResult[attrId].Answers[0].Answer;
                    var Time = LVTemplateResult[attrId].Answers[1].Answer;
                    var Reason = LVTemplateResult[attrId].Answers[2].Answer;

                   // alert('TaskStatus : ' + TaskStatus + ', Time : ' + Time + ', Reason : ' + Reason);
                    

                    if (TaskStatus == "Y" && (Time == '' || Time == undefined)) {
                        IsSubmit = false;
                        IsCompleted = false;
                        Message += itr + ". " + DCData.TemplateNodeName + " :: " + "Please capture time ";
                        break;
                    }
                    else if (TaskStatus == "N" && (Reason == '' || Reason == undefined)) {
                        IsSubmit = false;
                        IsCompleted = false;
                        Message += itr + ". " + DCData.TemplateNodeName + " :: " + "Please capture reason ";
                        break;
                    }
                    else if (TaskStatus == "" || TaskStatus == undefined || TaskStatus == null) {
                        IsSaveRequired = false;
                        IsSubmit = false;
                        IsCompleted = false;
                        ///  Message = itr + ". " + DCData.TemplateNodeName + " :: " + "Please capture answer ";
                        break;
                    }
                    else {
                        break;
                    }
                }
              
                if (IsSaveRequired == true) {
                    var AttributeInfo = MyInstance.GetAttributeWiseInfoDAO(AttributeNodeId);
                    //alert('AttributeInfo : ' + JSON.stringify(AttributeInfo));

                    if (AttributeInfo[0].MandatoryStatus == 'Y') {
                        //alert('DCData.DCImages : ' + JSON.stringify(DCData.DCImages));
                        //check for images
                        if (DCData.DCImages.length == 0) {
                            //failed validation
                            IsSubmit = false;
                            if (Message == "") {
                                Message += itr + ". " + DCData.TemplateNodeName + " :: " + "Please capture image ";
                            }
                            else {
                                Message += " and image";
                            }

                        }
                    }
                    
                    //alert('IsCompleted :  ' + IsCompleted + ', IsSubmit :  ' + IsSubmit)
                    if (IsSubmit == true) {
                        //Submit after validation success  

                        OneViewSessionStorage.Save("TemplateId", DCData.TemplateNodeId);
                        OneViewSessionStorage.Save("TemplateName", DCData.TemplateNodeName);

                        //if (DCData.DataCaptureId > 0 && (DCData.IsUpdated == true && ) { //Update
                        if (DCData.DataCaptureId > 0) { //Update
                            IsAnyDcSubmitted = true;
                            OneViewSessionStorage.Save("DcProfileId", DCData.DcProfileServerId);
                            var LVDCSummary = { 'CommentsInfo': { 'IsModified': false }, 'CommentsInfo': { 'Comments': "" }, IsBlocker: DCData.IsBlocker };
                            var DataCaptureClientGuid = DCData.DataCaptureClientGuid;
                            var oTesco_LVDataCaptureBO = new Tesco_LVDataCaptureBO();

                            var response = oTesco_LVDataCaptureBO.Update(DCData.LVTemplateResult, DCData.DataCaptureId, DCData.DCResultId, true, IsCompleted, LVDCSummary, IsSubmit);
                            response.DcInfo = { 'ClientGuid': DataCaptureClientGuid };
                            MyInstance.SaveDCImages(response.DcInfo, DCData.DCImages, key);

                            DCData.IsUpdated = false;

                            //clear the model
                            delete CompleteLVTemplateResult[key];
                            //CompleteLVTemplateResult[key] = undefined;
                            //alert('Update successfully');
                        }
                        else if (DCData.DataCaptureId == 0 || DCData.DataCaptureId == undefined || DCData.DataCaptureId == '') { //New
                            IsAnyDcSubmitted = true;
                            var LVDCSummary = { 'CommentsInfo': { 'IsModified': false }, 'CommentsInfo': { 'Comments': "" }, IsBlocker: DCData.IsBlocker };
                            OneViewSessionStorage.Save("DcProfileId", DCData.DcProfileServerId);

                            var oTesco_LVDataCaptureBO = new Tesco_LVDataCaptureBO();
                            var LVDcStartDate = new DateTime().GetDateAndTime();
                            var response = oTesco_LVDataCaptureBO.Save(DCData.LVTemplateResult, LVDcStartDate, IsCompleted, LVDCSummary, IsSubmit);
                            MyInstance.SaveDCImages(response.DcInfo, DCData.DCImages, key);

                            //clear the model
                            delete CompleteLVTemplateResult[key];
                           // CompleteLVTemplateResult[key] = undefined;

                            //MyInstance.ReloadtheModel(OneViewSessionStorage.Get('LoginUserId'), DCData.TemplateNodeId, DCData.TemplateNodeName, AttributeNodeId, OneViewSessionStorage.Get("DcPlaceId"), 16);
                            //response { "DcInfo": DcInfo, "AttributeActionInfo": AttributeActionInfo }
                            // alert('Save successfully');
                        }

                    }

                    else if (Message != "") {                     
                        itr++;
                        ValidationMessage += Message + '\n';
                    }
                }
                // }

                IsSubmit = true;
                IsCompleted = true;
                IsSaveRequired = true;
            }

            if (ValidationMessage != "") {
                oSetDefaultSpinner.Stop();
                alert('VL-CU-PWT-003 :: ' + ValidationMessage);
            }
            else if (IsAnyDcSubmitted == false) {
                oSetDefaultSpinner.Stop();
                alert('VL-CU-PWT-002 :: No records for Submit');
            }
            else {

               // MyInstance.ReloadStatus();
                oSetDefaultSpinner.Stop();
                //reload the page     
                MyInstance.LoadTemplateList(CurrentArea_TemplateGroupNodeId);
                MyInstance.GraphSearch(oscope);
                alert('VL-CU-PWT-001 :: Submitted Successfully');
               
            }


        }
        catch (Excep) {
            oSetDefaultSpinner.Stop();
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.Submit", Excep);
        }
    }


    this.ReloadStatus = function () {
        try {

           
            var Status = MyInstance.GetTemplateGroupWiseStatus(CurrentSubGroupId);

           // var CurrentSubGroupStatus=Status.TemplateInfo[CurrentSubGroupId];
            TemplateGroupWiseStatusDict.TemplateInfo[CurrentSubGroupId] = Status.TemplateInfo[CurrentSubGroupId];
            //document.getElementById("DivPlanActualCount_" + CurrentSubGroupId).innerHTML = CurrentSubGroupStatus.OverAllCompletedDCCount + '/' + CurrentSubGroupStatus.Occurrence;
            //if (CurrentSubGroupId == DailyNodeId) {
            //    DCFreqTemplateGroupWiseStatus[DailyNodeId] = Status;
            //    document.getElementById('divDaily').innerHTML = Status.OverAllCompletedDCCount + '/' + Status.Occurence;
            //}

            //else if (CurrentSubGroupId == WeeklyNodeId) {
            //    DCFreqTemplateGroupWiseStatus[WeeklyNodeId] = Status;
            //    document.getElementById('divWeekly').innerHTML = Status.OverAllCompletedDCCount + '/' + Status.Occurence;

            //}
            //else if (CurrentSubGroupId == MonthlyNodeId) {
            //    DCFreqTemplateGroupWiseStatus[MonthlyNodeId] = Status;
            //    document.getElementById('divMonthly').innerHTML = Status.OverAllCompletedDCCount + '/' + Status.Occurence;
            //}



        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.ReloadStatus", Excep);
        }
    }


    this.DeleteDCImageEvent = function (TemplateId) {
        try {          
            var SelectedImageDOM = document.getElementById("Image_" + TemplateId);
            var SelectedImageUrl = SelectedImageDOM.src;
            //IsDeleted
            var DCData = CompleteLVTemplateResult[TemplateId];

           
            var DCImages = DCData.DCImages;

            if (DCImages.length > 1) {
                for (var i = 0; i < DCImages.length ; i++) {
                    var ImageData = DCImages[i];
                    if (ImageData.LocalURL == SelectedImageUrl) {
                        if (ImageData.Id == 0) {                          
                            CompleteLVTemplateResult[TemplateId].DCImages.splice(i, 1);
                        }
                        else {
                            CompleteLVTemplateResult[TemplateId].IsUpdated = true;
                            CompleteLVTemplateResult[TemplateId].DCImages[i]["IsDeleted"] = true;
                        }
                        //alert('22 CompleteLVTemplateResult[TemplateId].DCImages[i] : ' + JSON.stringify(CompleteLVTemplateResult[TemplateId].DCImages[i]));
                        SelectedImageDOM.src = "";
                        //hide
                        document.getElementById("DivImage_" + TemplateId).style.display = "none";
                        break;
                    }
                }
            }
            else if (DCImages.length == 1) {
                if (DCImages[0].Id == 0) {                 
                    CompleteLVTemplateResult[TemplateId].DCImages.splice(0, 1);
                }
                else {
                    CompleteLVTemplateResult[TemplateId].IsUpdated = true;
                    CompleteLVTemplateResult[TemplateId].DCImages[0]["IsDeleted"] = true;
                }
               // alert('44 CompleteLVTemplateResult[TemplateId].DCImages[i] : ' + JSON.stringify(CompleteLVTemplateResult[TemplateId].DCImages[0]));
                SelectedImageDOM.src = "";
                document.getElementById("DivImage_" + TemplateId).style.display = "none";
            }

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.DeleteDCImageEvent", Excep);
        }
    }

    
    /////////////////////////////****************** DC Event END *********************////////////////////





    /////////////////////////////****************** DAO START *********************////////////////////

    this.GetOrganizationAssetsNodeByParentNode_DAO = function (ParentNodeId) {
        try {
            
            var Query = "SELECT ServerId , ChildDbElementName FROM TemplateNode WHERE ParentNodeId = " + ParentNodeId + "";

           // alert('Query : ' + Query);

            var result = window.OneViewSqlite.excecuteSqlReader(Query);
            result = JSON.parse(result);

            //alert('DAO : ' + JSON.stringify(result));

            return result;
        }
        catch (Excep) {           
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.GetOrganizationAssetsNodeByParentNode_DAO", Excep);
        }
    }


    //this.LoadDCPlace = function () {
    //    try {
    //        var IsNoProfile = true;
    //        var ddlPlace = '<div class="row responsive-md" >' +
    //                      '<div class="col">' +
    //                         ' <select id="ddlDCPlace"   onchange="DCPlaceOnChange();">';

    //        var oDcProfileDAO = new DcProfileDAO();
    //        var DCPlaceList = oDcProfileDAO.GetAllDcPlacesByTemplateGroupId({ TemplateNodeId: 338, TemplateGroupType: 2 })

    //        if (DCPlaceList !=undefined && DCPlaceList.length > 0) {
    //            IsNoProfile = false;

    //            for (var i = 0; i < DCPlaceList.length; i++) {
    //                var ddlPlace = ddlPlace + ' <option value=' + DCPlaceList[i].Id + '>' + DCPlaceList[i].Name + '</option>';
    //            }

    //            ddlPlace = ddlPlace +
    //                             ' </select>' +
    //                         ' </div>' +
    //                      '</div>';

    //            OneViewSessionStorage.Save("DcPlaceId", DCPlaceList[0].Id);
    //            OneViewSessionStorage.Save("DcPlaceName", DCPlaceList[0].Name);

    //            document.getElementById('divDDLDCPlace').innerHTML = ddlPlace;
    //        }
          
    //        return IsNoProfile;
            
    //    } catch (ex) {
          
    //        return IsNoProfile;

    //        //TODO Siva:Need check this exception
    //        //alert('LoadDCPlace: ' + JSON.stringify(ex));
    //    }
    //}

    this.GetAttributeWiseInfoDAO = function (AttributeNodeId) {
        try {

            
            var Query = "SELECT AM.Id, AM.Name , AM.Column1 AS Info , AM.Column2 AS MandatoryStatus from TemplateNode TN " +
                        "INNER JOIN AttributeMasterEntity AM on AM.ServerId = TN.childDbElementId " +
                        "WHERE TN.ServerId = " + AttributeNodeId;

            //alert('Query : ' + Query);

            var result = window.OneViewSqlite.excecuteSqlReader(Query);
            result = JSON.parse(result);

            //alert('GetAttributeWiseInfoDAO : ' + JSON.stringify(result));

            return result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.GetAttributeWiseInfoDAO", Excep);
        }
    }


    /////////////////////////////****************** DAO END *********************////////////////////



    this.GraphSearch = function (scope) {
        try {
            
            var SearchedName = scope.periodicsGraphSearchElement;
            var CurrentTemplateGroupData = CompleteLVTemplateResult[CurrentSubGroupId];            
            for (var TGId in CompleteLVTemplateResult) {
                var TGDataDict = CompleteLVTemplateResult[TGId];
                // alert('TGDataDict.TemplateNodeName : ' + TGDataDict.TemplateNodeName);
                if (TGDataDict.TemplateNodeName.indexOf(SearchedName) == -1) {
                    document.getElementById("TemplateNodeBlock_" + TGId).style.display = "none";
                }
                else {
                    document.getElementById("TemplateNodeBlock_" + TGId).style.display = "";
                }
            }

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "PeriodicsComponent.GraphSearch", Excep);
        }
    }



}

////////////////**************** PeriodicsComponent END *******************//////////////////////////////








////////////////**************** PeriodicBO START *******************//////////////////////////////

// PeriodicBO
function PeriodicBO() {

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
                DcProfileServerId: 0,
                PeriodTypeName:'',
                PeriodTypeStartDate:'',
                PeriodTypeEndDate:'',
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
                    }
                }

                if (Req.IsLastDcLstNeeded != undefined && Req.IsLastDcLstNeeded == true) {
                    var LastDcLst = _oDcProfileDAO.GetLastCreatedDcIdByUserIdTemplatePlaceIdAndDate(Req);

                    //if (Req.TemplateNodeId == 604)
                    //    alert('LastDcLst ' + JSON.stringify(LastDcLst));

                    if (LastDcLst.length > 0) {
                        var LastDcId = LastDcLst[0].DcId;
                        var LastClientGuid = LastDcLst[0].ClientGuid;
                        Response.LastDCInfo = GetLastDcStatus({ DcId: LastDcId, DataCaptureClientGuid: LastClientGuid, DcRId: LastDcLst[0].DcRId });

                        // }
                    }
                }


            }
            // alert("Response : " + JSON.stringify(Response));

            OneViewConsole.Debug("PeriodicBO end", "PeriodicBO.Get");

            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "PeriodicBO.Get", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    var GetDcProfileSyncStatusDetails = function (Req) {
        try {
            OneViewConsole.Debug("GetDcProfileSyncStatusDetails Start", "PeriodicBO.GetDcProfileSyncStatusDetails");
            var _oDcProfileDAO = new DcProfileDAO();
            //ServerIds : completed DC Counts
            var Response = { ServerIds: [],InProgressServerIds:[], OverAllCompletedDCCount: 0, OverAllInProgressDCCount: 0 };

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

                Response.OverAllCompletedDCCount = _oDcProfileSyncStatusResult[0]["CompletedCount"];
                Response.OverAllInProgressDCCount = _oDcProfileSyncStatusResult[0]["InprogressCount"];
            }

            OneViewConsole.Debug("GetDcProfileSyncStatusDetails Start", "PeriodicBO.GetDcProfileSyncStatusDetails");
            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "PeriodicBO.GetDcProfileSyncStatusDetails", Excep);
        }
    }

    var GetLastDcStatus = function (Req) {
        try {
            OneViewConsole.Debug("GetLastDcStatus Start", "LVDataCaptureBO.GetLastDcStatus");

            var Response = {
                DataCaptureId: '',
                DataCaptureClientGuid:'',
                DCResultId: '',
                DCResultDetailId_YNBand: '',
                DCResultDetailId_Time: '',
                DCResultDetailId_Reason: '',

                TaskAttributeId: 0,
                BandControlAnswer: '',
                BandControlValue: '',
                Time: '',
                Reason: ''
            };

            var _oDcDAO = new DcDAO();
            var Result = _oDcDAO.GetDCResultDetailsByDCIdForLV(Req.DcId);

          
            var DcResultDetails = GetDCByDCId(Result);

            for (var i = 0; i < DcResultDetails.length; i++) {
                var oAttribute = DcResultDetails[i];

                Response.TaskAttributeId = DcResultDetails[i].AttributeNodeId;
                Response.DataCaptureId = Req.DcId;
                Response.DataCaptureClientGuid = Req.DataCaptureClientGuid;
                Response.DCResultId = Req.DcRId;

                for (var j = 0; j < oAttribute.Controls.length; j++) {

                    var oControl = oAttribute.Controls[j];
                    var oFinalAnswer = GetLastUpdatedAnswer(oControl.Answers);

                    if (oFinalAnswer.ControlId.indexOf("BandControlId_") != "-1") {
                        Response.DCResultDetailId_YNBand = oFinalAnswer.ClientId;
                        Response.BandControlAnswer = oFinalAnswer.Answer;
                        Response.BandControlValue = oFinalAnswer.AnswerValue;
                    }
                    else if (oFinalAnswer.ControlId.indexOf("TIMEControlId_") != "-1") {
                        Response.DCResultDetailId_Time = oFinalAnswer.ClientId;
                        Response.Time = oFinalAnswer.Answer;
                    }
                    else if (oFinalAnswer.ControlId.indexOf("ReasonControlId_") != "-1") {
                        Response.DCResultDetailId_Reason = oFinalAnswer.ClientId;
                        Response.Reason = oFinalAnswer.Answer;
                    }
                }

            }



            OneViewConsole.Debug("GetLastDcStatus Start", "LVDataCaptureBO.GetLastDcStatus");
            
            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcSummaryBO.GetLastDcStatus", Excep);
        }
    }

    var GetLastUpdatedAnswer = function (AnswerLst) {
        try {
            OneViewConsole.Debug("GetLastUpdatedAnswer Start", "PeriodicBO.GetLastUpdatedAnswer");

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

            OneViewConsole.Debug("GetLastUpdatedAnswer End", "PeriodicBO.GetLastUpdatedAnswer");

            return AnswerObj;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "PeriodicBO.GetLastUpdatedAnswer", Excep);
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
            OneViewConsole.Debug("GetByTemplateGroup start", "PeriodicBO.GetByTemplateGroup");

            var TemplateGroup = Req.TemplateNodeId;
            var TemplateGroupType = Req.TemplateGroupType;
            var Response = {
                Occurrence: 0,
                OverAllCompletedDCCount: 0,
                OverAllInProgressDCCount: 0,
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
   
            
            return ByTemplateLstResult;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "PeriodicBO.GetByTemplateGroup", Excep);
        }
        finally {
            Response = null;
        }
    }

    var GetByTemplateLst = function (Req, TemplateGroup, TemplateGroupType) {
        try {

            OneViewConsole.Debug("GetByTemplateLst Start", "PeriodicBO.GetByTemplateLst");

            var Response = {
                Occurrence: 0,
                OverAllCompletedDCCount: 0,
                OverAllInProgressDCCount: 0,
                TemplateInfo: {}
            };


            var _oDcProfileDAO = new DcProfileDAO();
           
            var DcScheduleLst = _oDcProfileDAO.GetDcScheduleDetailsByTemplateIdLst(Req);
            var DcResultList = _oDcProfileDAO.GetDcDetailsByServiceUserIdPlaceIdDateAndTemplateLst(Req);
            var PeriodEntityLst = _oDcProfileDAO.GetAllCurrentPeriod(Req);
            var PeriodEntityLst = _oDcProfileDAO.GetAllCurrentPeriod(Req);

             var _oDcDAO = new DcDAO();
            var DcTemplateChildResult = _oDcDAO.GetDcTemplateIdsByTemplateGroupAndAttributeGroupType(TemplateGroup, "-1");

            Response.TemplateInfo = GetAttributeGroupWiseCount(TemplateGroup, TemplateGroupType);
       

            for (var i = 0; i < DcScheduleLst.length; i++) {
                Req["DcProfileServerId"] = DcScheduleLst[i].DcProfileServerId;

                Response.Occurrence += parseInt(DcScheduleLst[i].Occurence);

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

                    Req.TemplateNodeId = DcScheduleLst[i].TemplateNodeId;

                    var IsDcResultExist = false;


                    var Request = { Req: Req, DcResultList: DcResultList, ScheduleSearchKey: ScheduleSearchKey, PeriodStartDateToInteger: PeriodStartDateToInteger, PeriodEndDateToInteger: PeriodEndDateToInteger };
                    var DcResultResponse = GetDcResultCount(Request);

                    Response.OverAllCompletedDCCount += parseInt(DcResultResponse.OverAllCompletedDCCount);
                    Response.OverAllInProgressDCCount += parseInt(DcResultResponse.OverAllInProgressDCCount);

                    for (var itrTemplateInfo in Response.TemplateInfo) {

                        if (Response.TemplateInfo[itrTemplateInfo].TemplateIds.indexOf(DcScheduleLst[i].TemplateNodeId) != -1) {
                        
                            Response.TemplateInfo[itrTemplateInfo].Occurrence += parseInt(DcScheduleLst[i].Occurence);
                            Response.TemplateInfo[itrTemplateInfo].OverAllCompletedDCCount += parseInt(DcResultResponse.OverAllCompletedDCCount);
                            Response.TemplateInfo[itrTemplateInfo].OverAllInProgressDCCount += parseInt(DcResultResponse.OverAllInProgressDCCount);

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

                       
                    }

                }

            }          
           
            return Response;

            OneViewConsole.Debug("GetByTemplateLst End", "PeriodicBO.GetByTemplateLst");
        }
        catch (ex) {
           // alert("GetByTemplateLst : " + ex + "..." + JSON.stringify(ex));
            throw oOneViewExceptionHandler.Create("DAO", "PeriodicBO.GetByTemplateLst", Excep);
        }
    }   

    var GetAttributeGroupWiseCount = function (TemplateGroup, TemplateGroupType) {
        try {
            OneViewConsole.Debug("GetAttributeGroupWiseCount Start", "PeriodicBO.GetAttributeGroupWiseCount");

            var Response = {};


            var _oDcDAO = new DcDAO();
            var DcTemplateChildResult = _oDcDAO.GetDcTemplateIdsByTemplateGroupAndAttributeGroupType(TemplateGroup, "-1");
           
            for (var i = 0; i < DcTemplateChildResult.length; i++) {
                Response[DcTemplateChildResult[i].TemplateNodeId] = {
                    ReccurenceId: 0,
                    Occurrence: 0,
                    OverAllCompletedDCCount: 0,
                    OverAllInProgressDCCount: 0,
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

            OneViewConsole.Debug("GetAttributeGroupWiseCount End", "PeriodicBO.GetAttributeGroupWiseCount");
           
            return Response;


        }
        catch (ex) {
            //alert("GetAttributeGroupWiseCount : " + ex + "..." + JSON.stringify(ex));
            throw oOneViewExceptionHandler.Create("DAO", "PeriodicBO.GetAttributeGroupWiseCount", Excep);
        }
    }

    var GetDcResultCount = function (Request) {
        try {
            OneViewConsole.Debug("GetDcResultCount Start", "PeriodicBO.GetDcResultCount");

            var IsDcResultExist = false;

            var DcResultList = Request.DcResultList;
            var ScheduleSearchKey = Request.ScheduleSearchKey;           
            var PeriodStartDateToInteger = Request.PeriodStartDateToInteger;
            var PeriodEndDateToInteger = Request.PeriodEndDateToInteger;           

            var Response = {OverAllCompletedDCCount: 0, OverAllInProgressDCCount: 0 };

       
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
                        _oDcProfileSyncStatusDetails.OverAllCompletedDCCount = parseInt(_oDcProfileSyncStatusDetails.OverAllCompletedDCCount-1);

                    }
                    if (_oDcProfileSyncStatusDetails.InProgressServerIds.length > 0 && _oDcProfileSyncStatusDetails.InProgressServerIds.indexOf(DcResultList[j].ServerId) != -1) {
                        _oDcProfileSyncStatusDetails.OverAllInProgressDCCount = parseInt(_oDcProfileSyncStatusDetails.OverAllInProgressDCCount-1);
                    }
             
                    if (DcResultList[j].IsCompleted == "true") {
                        Response.OverAllCompletedDCCount += parseInt(1);
                    }
                    else {
                        Response.OverAllInProgressDCCount += parseInt(1);
                    }
                   
                }

            }

            if (_oDcProfileSyncStatusDetails.OverAllCompletedDCCount > 0) {
                Response.OverAllCompletedDCCount += parseInt(_oDcProfileSyncStatusDetails.OverAllCompletedDCCount);
            }
            if (_oDcProfileSyncStatusDetails.OverAllInProgressDCCount > 0) {
                Response.OverAllInProgressDCCount += parseInt(_oDcProfileSyncStatusDetails.OverAllInProgressDCCount);
            }

            //if (IsDcResultExist == false) {
             
            //    if (_oDcProfileSyncStatusDetails.ServerIds.length > 0 || _oDcProfileSyncStatusDetails.InProgressServerIds.length > 0) {
                   
            //        Response.OverAllCompletedDCCount += parseInt(_oDcProfileSyncStatusDetails.OverAllCompletedDCCount);
            //        Response.OverAllInProgressDCCount += parseInt(_oDcProfileSyncStatusDetails.OverAllInProgressDCCount);

            //    }
            //}
           
            OneViewConsole.Debug("GetDcResultCount End", "PeriodicBO.GetDcResultCount");
            return Response;

        }
        catch (ex) {
            //  alert("GetByTemplateLst : "+ex + "..." + JSON.stringify(ex));
            throw oOneViewExceptionHandler.Create("DAO", "PeriodicBO.GetDcResultCount", Excep);
        }
    }

}


////////////////**************** PeriodicBO END *******************//////////////////////////////







////////////////**************** PeriodicsDcMultimediaEventHandler START *******************//////////////////////////////

function PeriodicsDcMultimediaEventHandler() {

    var oDateTime = new DateTime();
    var CurrenntDateAndTime = oDateTime.GetDateAndTime();

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    this.Save = function (oMultiMediaSubElement) {

        try {
            OneViewConsole.Debug("Save start", "PeriodicsDcMultimediaEventHandler.Save");

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

            var _oDcResultDetailsEntityDAO = new DefaultMasterDAO("MultiMediaSubElements");
            var Result = _oDcResultDetailsEntityDAO.CreateMaster(_oMultiMediaSubElements);

            return Result;

            OneViewConsole.Debug("Save end", "PeriodicsDcMultimediaEventHandler.Save");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "PeriodicsDcMultimediaEventHandler.Save", Excep);
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
}

////////////////**************** PeriodicsDcMultimediaEventHandler END *******************//////////////////////////////



