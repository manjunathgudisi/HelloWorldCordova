
///////////////////////////////////////************************* New DC Page Dynamic Generation Start *************************///////////////////////////////////////

//Metadata for Client (Global variable)
var NewDCPageMetadata = null;
var GlobalDcProfileList = null;
var GlobalDcPlaceServerIdByProfileList = [];
var GlobalDcTemplateServerIdByProfileList = [];
var GlobalDcPlaceDimensionList = [];
var GlobalDcTemplateDimensionList = [];
var SelectedDcPlaceDimension = null;
var SelectedDcTemplateDimension = null;

var GlobalDcPlaceByTypeDetailsList = [];
var GlobalDcTemplateByTypeDetailsList = [];


var PlaceDATEntityTypesDict = {};
var TemplateDATEntityTypesDict = {};

var oxlatService = null;

var PageState_NewDCPage = {};

var TemplateNodeId = null;
var DcPlaceId = null;
var GlobalNewDcPageRedirectValue = 0;
var olocation = null;

var DefaultControlsUIStatus = 'Disable';
var GlobalNewDcQueryStringDict = {};
var DCPlaceLst = null;
var IsPlaceSelectedUsingBarcode = false;
MyApp.controller("NewDcControllerNew", function ($scope, $location, xlatService, $compile) {
   
    var oNewDcFacadeNew = new NewDcFacadeNew($scope, $location, xlatService, $compile);
    oNewDcFacadeNew.Init();
    oNewDcFacadeNew.PageLoad();

    $scope.NewDc = function () {
        oNewDcFacadeNew.NewDc();
    }

    $scope.EditMaster = function () {
        oNewDcFacadeNew.EditMaster();
    }
    $scope.LoadViewRecordsPage = function () {
        oNewDcFacadeNew.LoadViewRecordsPage();
    }

    $scope.$on('$destroy', function () {
        oNewDcFacadeNew.Destroy();
    });

});



function NewDcFacadeNew($scope, $location, xlatService, $compile) {

    var MyInstance = this;

    var oNewDcBO = new NewDcBO($scope, $location, xlatService, $compile);
    var oNewDcPresenter = new NewDcPresenter();

    this.Init = function () {
        try {
            OneViewConsole.Debug("Init Start", "NewDcFacadeNew.Init");
            
            oxlatService=xlatService;
            xlatService.setCurrentPage('9');
            OneViewSessionStorage.Save("PageID", "newdc");
            document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');
            oNewDcBO.LoadMetadata();
           
            oNewDcBO.SetGlobalVariables();
            olocation = $location;

            OneViewConsole.Debug("Init End", "NewDcFacadeNew.Init");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "NewDcFacadeNew.Init", xlatService);
        }
    }



    this.PageLoad = function () {
        try {
            OneViewConsole.Debug("PageLoad Start", "NewDcFacadeNew.PageLoad");

            oNewDcBO.PageLoad();
            
            OneViewConsole.Debug("PageLoad End", "NewDcFacadeNew.PageLoad");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "NewDcFacadeNew.PageLoad", xlatService);
        }
    }

    this.Destroy = function () {
        try {
            OneViewConsole.Debug("Destroy Start", "NewDcFacadeNew.Destroy");

            NewDCPageMetadata = null;
            GlobalDcProfileList = null;
            GlobalDcPlaceServerIdByProfileList = [];
            GlobalDcTemplateServerIdByProfileList = [];
            GlobalDcPlaceDimensionList = [];
            GlobalDcTemplateDimensionList = [];
            SelectedDcPlaceDimension = null;
            SelectedDcTemplateDimension = null;
            oxlatService = null;
            // location = null;
            TemplateNodeId = null;
            DcPlaceId = null;
            GlobalNewDcPageRedirectValue = 0;
            olocation = null;
            PlaceDATEntityTypesDict = {};
            TemplateDATEntityTypesDict = {};
            GlobalNewDcQueryStringDict = {};

            DCPlaceLst = null;
            IsPlaceSelectedUsingBarcode = false;

            OneViewConsole.Debug("Destroy End", "NewDcFacadeNew.Destroy");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "NewDcFacadeNew.Destroy", xlatService);
        }
    }

    this.NewDc = function () {
        try {
            OneViewConsole.Debug("NewDc Start", "NewDcFacadeNew.NewDc");

            var IsBarcodeSuccess = true;
            var _NewDcBO = new NewDcBO();
            if (_NewDcBO.IsDcPlaceSelectionThroughBarcodeReading() == true) { 
                if (IsPlaceSelectedUsingBarcode == false) {
                    IsBarcodeSuccess = false;
                }
            }

            if (IsBarcodeSuccess == true) {
                var IsSuccess = oNewDcBO.ValidateDcStartDate();

                if (IsSuccess == true) {

                    oNewDcBO.setPageState_NewDCPage();
                    oNewDcPresenter.LoadDcPage($location, xlatService);

                    if (NewDCPageMetadata.IsDcStartDateSelectionEnabled == true) {
                        oNewDcBO.SetDcStartDateInSession();
                    }
                }
                else {
                    alert("IN-NF-NDC-010 :: Please select DC Start Date");
                }
            }
            else {
                alert(xlatService.xlat('Please select Aisle'));
            }

            OneViewConsole.Debug("NewDc End", "NewDcFacadeNew.NewDc");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "NewDcFacadeNew.NewDc", xlatService);
        }
    }

    this.LoadViewRecordsPage = function () {
        try {
            OneViewConsole.Debug("LoadViewRecordsPage Start", "NewDcFacadeNew.LoadViewRecordsPage");

            //var _oDcDAO = new DcDAO();
            //var TotalDcCount = _oDcDAO.GetTotalAuditCount(OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("LoginUserId"), OneViewSessionStorage.Get("TemplateId"), OneViewSessionStorage.Get("DcPlaceId"), OneViewSessionStorage.Get("DcPlaceName"));

            //if (TotalDcCount > 0) {
            //    OneViewSessionStorage.Remove("NCInlineEdit");
            //    OneViewSessionStorage.Remove("MyAuditEditForm");
            //    $location.url('/ViewRecords');
            //}
            //else {
            //    alert(xlatService.xlat('No_Records_Available'));
            //}

            var IsBarcodeSuccess = true;
            var _NewDcBO = new NewDcBO();
            if (_NewDcBO.IsDcPlaceSelectionThroughBarcodeReading() == true) { 
                if (IsPlaceSelectedUsingBarcode == false) {
                    IsBarcodeSuccess = false;
                }
            }

            if (IsBarcodeSuccess == true) {

                var ServiceId = OneViewSessionStorage.Get("ServiceId");
                var TemplateId = OneViewSessionStorage.Get("TemplateId");
                var DcPlaceId = OneViewSessionStorage.Get("DcPlaceId");
                var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

                var _oNewDcNewDAO = new NewDcNewDAO();
                var DcInfo = _oNewDcNewDAO.GetDcInfo(ServiceId, DcPlaceId, TemplateId, LoginUserId);

                if (DcInfo.length == 0) {

                    alert(xlatService.xlat('No_Records_Available'));
                }
                else if (DcInfo.length == 1) {

                    OneViewSessionStorage.Save("DcId", DcInfo[0].Id);
                    OneViewSessionStorage.Save("IsDcCompletedBeforeEdit", DcInfo[0].IsCompleted);
                    OneViewSessionStorage.Save("IsDcSynchronizedBeforeEdit", DcInfo[0].IsSynchronized);
                    OneViewSessionStorage.Remove("NCInlineEdit");
                    OneViewSessionStorage.Remove("ViewRecordsForm");

                    $location.url('/' + OneViewSessionStorage.Get("TemplateId"));
                }
                else {
                    OneViewSessionStorage.Remove("NCInlineEdit");
                    OneViewSessionStorage.Remove("MyAuditEditForm");

                    var IsCompleted = '-1';
                    var IsSynchronized = '-1';

                    var Url = '/ViewRecords?IsCompleted=' + IsCompleted + '&IsSynchronized=' + IsSynchronized + '';
                    $location.url(Url);
                }
            }
            else {
                alert(xlatService.xlat('Please select Aisle'));
            }

            OneViewConsole.Debug("LoadViewRecordsPage End", "NewDcFacadeNew.LoadViewRecordsPage");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "NewDcFacadeNew.LoadViewRecordsPage", xlatService);
        }
    }

    this.EditMaster = function () {
        try {
            OneViewConsole.Debug("EditMaster Start", "NewDcFacadeNew.EditMaster");

            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();
            OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkStatus), "NewDcFacadeNew.EditMaster");

            oNewDcBO.setPageState_NewDCPage();

            if (NetworkStatus.IsNetworkAvailable == true) {
                $location.url('/nav/my-portal');
            }

            else {
                alert(xlatService.xlat('NoInternetConnection'));
                OneViewConsole.Info("No Internet Connection", "NewDcFacadeNew.EditMaster");
            }

            OneViewConsole.Debug("EditMaster End", "NewDcFacadeNew.EditMaster");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "NewDcFacadeNew.EditMaster", xlatService);
        }
    }
}

function NewDcBO($scope, $location, xlatService, $compile) {

    var MyInstance = this;

    var UserId = OneViewSessionStorage.Get("LoginUserId");
    var ServiceId = OneViewSessionStorage.Get("ServiceId"); 
    var PageId = 1;

    var oNewDcNewDAO = new NewDcNewDAO();
    var oNewDcCommonHtml = new NewDcCommonHtml();
    var oNewDcPresenter = new NewDcPresenter();

    this.LoadMetadata = function () {
        try {
            OneViewConsole.Debug("LoadMetadata Start", "NewDcBO.LoadMetadata");

            ////NewDCPageMetadata = NewDCPageClientMetadata;
            if (ServiceId == 1 || ServiceId == 2) {
                PlaceDATEntityTypesDict = PlaceDATEntityTypesClientDict;
                TemplateDATEntityTypesDict = TemplateDATEntityTypesClientDict;
            }
          
            var _oDefaultPageConfigMetaDataDAO = new DefaultPageConfigMetaDataDAO();
            var NewDcPageConfigFromDb = _oDefaultPageConfigMetaDataDAO.GetByServiceUserAndPageId(ServiceId, UserId, PageId);
            //alert(NewDcPageConfigFromDb.length + ' , NewDcPageConfigFromDb : ' + JSON.stringify(NewDcPageConfigFromDb));

            if (NewDcPageConfigFromDb.length > 0) {
                var NewDcPageConfigDetails = NewDcPageConfigFromDb[0].PageConfig;
                NewDcPageConfigDetails = JSON.parse(NewDcPageConfigDetails);
                NewDcPageConfigDetails = JSON.parse(NewDcPageConfigDetails);
                if (NewDcPageConfigDetails.length > 1) {
                    alert("Not Implemented Exception : NewDcPageConfigDetails.length = " + NewDcPageConfigDetails.length)
                }
                else {
                    NewDCPageMetadata = NewDcPageConfigDetails[0];
                }
            }       
           

            OneViewConsole.Debug("LoadMetadata End", "NewDcBO.LoadMetadata");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "NewDcBO.LoadMetadata", Excep);
        }
    }

    this.SetGlobalVariables = function () {
        try {
            OneViewConsole.Debug("SetGlobalVariables Start", "NewDcBO.SetGlobalVariables");

            if ($location.search().TemplateNodeId != null && $location.search().TemplateNodeId != undefined) {
                TemplateNodeId = $location.search().TemplateNodeId;
            }
            else {
                TemplateNodeId = -1
            }


            if ($location.search().DCPlaceId != null && $location.search().DCPlaceId != undefined) {
                DcPlaceId = $location.search().DCPlaceId;
            }
            else {
                DcPlaceId = -1;
            }
            

            //alert('TemplateNodeId : ' + TemplateNodeId + ' , DcPlaceId : ' + DcPlaceId);
            OneViewConsole.Debug("SetGlobalVariables End", "NewDcBO.SetGlobalVariables");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "NewDcBO.SetGlobalVariables", Excep);
        }
    }

    this.PageLoad = function () {
        try {
            OneViewConsole.Debug("PageLoad Start", "NewDcBO.PageLoad");


            var QueryStringDict = MyInstance.GetQueryString();

            GlobalNewDcQueryStringDict = QueryStringDict;
            
            var QueryStringDictLength = Object.keys(QueryStringDict).length;

            if (QueryStringDictLength > 0) {

                MyInstance.LoadDcProfiles(QueryStringDict);
                
                RedirectPageByDcProfiles();

                if (GlobalDcProfileList != null && GlobalDcProfileList.length > 0) {

                    GlobalNewDcPageRedirectValue = QueryStringDict.PageRedirectValue;

                    if (QueryStringDict.DcPlaceNodeId != 0 && QueryStringDict.TemplateNodeId != 0) {
                        oNewDcCommonHtml.SetDDLByProfile(QueryStringDict.DcPlaceGroup_Type, QueryStringDict.DCPlaceRCOType, QueryStringDict.DcPlaceNodeId, QueryStringDict.TemplateNodeId, QueryStringDict.TemplateGroup_Type, QueryStringDict.TemplateNodeType, QueryStringDict.AttributeGroupType);

                        if (NewDCPageMetadata.IsDcStartDateSelectionEnabled == true && NewDCPageMetadata.IsDateWiseFilterationEnabled == true) {
                            alert('Not Implemented Exception : IsDcStartDateSelectionEnabled = ' + NewDCPageMetadata.IsDcStartDateSelectionEnabled + ', IsDateWiseFilterationEnabled = ' + NewDCPageMetadata.IsDateWiseFilterationEnabled);
                        }

                        else if (NewDCPageMetadata.IsDcStartDateSelectionEnabled == true) {
                            var ControlId = 'DTDcStartDateControlId';
                            MyInstance.AppendCurrentDateTime(ControlId);
                        }

                        else if (NewDCPageMetadata.IsDateWiseFilterationEnabled == true) {
                            alert('Not Implemented Exception : IsDateWiseFilterationEnabled = ' + NewDCPageMetadata.IsDateWiseFilterationEnabled);
                        }
                    }

                    if (QueryStringDict.DcPlaceNodeId != 0 || QueryStringDict.TemplateNodeId != 0) {
                        var TemperoraryTemplateId = -1;
                        var TemperoraryDcPlaceNodeId = -1;
                        if (QueryStringDict.TemplateNodeId != 0) {
                            TemperoraryTemplateId = QueryStringDict.TemplateNodeId;
                        }

                        if (QueryStringDict.DcPlaceNodeId != 0) {
                            TemperoraryDcPlaceNodeId = QueryStringDict.DcPlaceNodeId;
                        }

                        //alert('TemperoraryDcPlaceNodeId : ' + TemperoraryDcPlaceNodeId + ', TemperoraryTemplateId : ' + TemperoraryTemplateId);
                        //var _oDcScheduleCheckingComponent = new DcScheduleCheckingComponent();
                        //var DcProfileList = _oDcScheduleCheckingComponent.GetDcProfileByOccurence(DATEntityType.OrganizationAssestsNode, TemperoraryTemplateId, TemperoraryDcPlaceNodeId, QueryStringDict.PageRedirectValue);

                        //alert('DcProfileList' + DcProfileList.length)
                        if (GlobalDcProfileList != null && GlobalDcProfileList.length > 0) {
                            oNewDcCommonHtml.DisableParentHierarchy(QueryStringDict.DcPlaceGroup_Type, QueryStringDict.DCPlaceRCOType, QueryStringDict.DcPlaceNodeId, QueryStringDict.TemplateNodeId, QueryStringDict.TemplateGroup_Type, QueryStringDict.TemplateNodeType);
                        }
                        else {
                            // alert('No profiles available');
                        }
                    }


                    //Show either start or edit button based on server query string
                    if (QueryStringDict.PageRedirectValue == 0) {
                        document.getElementById('StartButtonId').style.display = "";
                        document.getElementById('EditButtonId').style.display = "none";
                    }

                    else if (QueryStringDict.PageRedirectValue == 1) {
                        document.getElementById('StartButtonId').style.display = "none";
                        document.getElementById('EditButtonId').style.display = "";
                    }

                    else {
                        document.getElementById('StartButtonId').style.display = "";
                        document.getElementById('EditButtonId').style.display = "none";
                    }
                }

                var ServiceId = OneViewSessionStorage.Get("ServiceId");
                
                MyInstance.GetList_POC();

            }
            OneViewConsole.Debug("PageLoad End", "NewDcBO.PageLoad");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "NewDcBO.PageLoad", Excep);
        }
    }

    var RedirectPageByDcProfiles = function () {
        try {
            OneViewConsole.Debug("RedirectPageByDcProfiles Start", "NewDcBO.RedirectPageByDcProfiles");

            if (GlobalDcProfileList != null && GlobalDcProfileList.length > 0) {

                var Html = oNewDcCommonHtml.GetHtml(NewDCPageMetadata);
                MyInstance.AppendHtml("ContentDiv", Html);

                if (NewDCPageMetadata.IsDcStartDateSelectionEnabled == true) {
                    var IsDisabled = true;
                    if (IsNewDcPageDcStartDateSelectionEnabled == true) {
                        IsDisabled = false;
                    }
                    var ControlId = 'DTDcStartDateControlId';
                    MyInstance.AppendCurrentDateTime(ControlId)
                    oNewDcCommonHtml.EnableDisableControl(ControlId, IsDisabled);
                }
              
                if (OneViewSessionStorage.Get("ServiceId") == 5) {
                    if (SelectedDcPlaceDimension.Id == 205) {
                        $scope.EditMasterShowDiv = true;
                    }
                }
                else {
                    $scope.EditMasterShowDiv = false;
                }
               
               //// MyInstance.GetList_POC();
                //alert('PageLoad Html : ' + Html);

                //Case 3 : Code if both TemplateNodeId and DcPlaceId is passed then Data Capture page will be loaded
                ////if ((TemplateNodeId != null && TemplateNodeId != -1) && (DcPlaceId != null && DcPlaceId != -1)) {
                ////    MyInstance.setPageState_NewDCPage();
                ////    oNewDcPresenter.LoadDcPage($location, xlatService);
                ////}
            }

            else {

                var ServiceId = OneViewSessionStorage.Get("ServiceId");

                /////if Landing Page enabled client navigate to dashboard page
                //if (ServiceId == 3 || ServiceId == 4 || ServiceId == 5) {
                //    $location.url('/dashboard');
                //}
                //else {
                //    /// else navigate to notification page
                //    //Re-direct to notification page
                //    var MessageKey = "IN-NF-MAU-003 :: No profiles are available to conduct data capture";
                //    var Url = '/notifycall?MessageKey=' + MessageKey + '';
                //    $location.url(Url);
                //}

                if (ServiceId == 1 || ServiceId == 2 || ServiceId == 24) {
                    //Re-direct to notification page
                    var MessageKey = "IN-NF-MAU-003 :: No profiles are available to conduct data capture";
                    var Url = '/notifycall?MessageKey=' + MessageKey + '';
                    $location.url(Url);
                }
                else {
                    $location.url('/dashboard');
                }
            }

            OneViewConsole.Debug("RedirectPageByDcProfiles End", "NewDcBO.RedirectPageByDcProfiles");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "NewDcBO.RedirectPageByDcProfiles", Excep);
        }

    }

    this.LoadDcProfiles = function (QueryStringDict) {
        try {
            OneViewConsole.Debug("LoadDcProfiles Start", "NewDcBO.LoadDcProfiles");

            var _oDcScheduleCheckingComponent = new DcScheduleCheckingComponent();
    
            //alert($location.search().TemplateNodeId);

            //shortcut from menu support
            //var TemplateNodeId = -1;
            //if ($location.search().TemplateNodeId != null && $location.search().TemplateNodeId !=undefined)
            // TemplateNodeId =  $location.search().TemplateNodeId;   

            //var DcPlaceId = -1;
            //if ($location.search().DcPlaceId != null && $location.search().DcPlaceId != undefined)
            // DcPlaceId= $location.search().DcPlaceId;

            //Get all DC Profiles
            GlobalDcProfileList = _oDcScheduleCheckingComponent.GetDcProfileByOccurence(DATEntityType.OrganizationAssestsNode, TemplateNodeId, DcPlaceId, QueryStringDict);

            //alert('GlobalDcProfileList : ' + JSON.stringify(GlobalDcProfileList));

            if (GlobalDcProfileList != null && GlobalDcProfileList.length > 0) {
                SetProfileVariables();
            }            
           
            OneViewConsole.Debug("LoadDcProfiles End", "NewDcBO.LoadDcProfiles");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "NewDcBO.LoadDcProfiles", Excep);
        }
    }

    var SetProfileVariables = function () {
        try {
            OneViewConsole.Debug("SetProfileVariables Start", "NewDcBO.SetProfileVariables");

            MyInstance.SaveDcPlaceAndTemplateServerIdList(GlobalDcProfileList);

            GlobalDcPlaceDimensionList = oNewDcNewDAO.GetDCPlaceDimension(GlobalDcPlaceServerIdByProfileList);
            GlobalDcPlaceDimensionList = GlobalDcPlaceDimensionList.sort(OneViewArraySorting('Name', true, function (a) { return a }));
            //alert('GlobalDcPlaceDimensionList : ' + JSON.stringify(GlobalDcPlaceDimensionList));

            SelectedDcPlaceDimension = GlobalDcPlaceDimensionList[0];
            //alert('SelectedDcPlaceDimension : ' + JSON.stringify(SelectedDcPlaceDimension));


            GlobalDcPlaceByTypeDetailsList = oNewDcNewDAO.GetDCPlaceByTypeAndServerIds(SelectedDcPlaceDimension.Id, GlobalDcPlaceServerIdByProfileList);
            //alert('GlobalDcPlaceByTypeDetailsList : ' + JSON.stringify(GlobalDcPlaceByTypeDetailsList));

            GlobalDcTemplateDimensionList = oNewDcNewDAO.GetDCTemplateDimension(GlobalDcTemplateServerIdByProfileList);
            GlobalDcTemplateDimensionList = GlobalDcTemplateDimensionList.sort(OneViewArraySorting('Name', true, function (a) { return a }));
            //alert('GlobalDcTemplateDimensionList : ' + JSON.stringify(GlobalDcTemplateDimensionList));

            SelectedDcTemplateDimension = GlobalDcTemplateDimensionList[0];
            //alert('SelectedDcTemplateDimension : ' + JSON.stringify(SelectedDcTemplateDimension));

            GlobalDcTemplateByTypeDetailsList = oNewDcNewDAO.GetDCTemplateByTypeAndServerIds(SelectedDcTemplateDimension.Id, GlobalDcTemplateServerIdByProfileList);
            //alert('GlobalDcTemplateByTypeDetailsList : ' + JSON.stringify(GlobalDcTemplateByTypeDetailsList));

            var DCAttributeGroupTypeList = oNewDcNewDAO.GetDCAttributeGroupTypes(GlobalDcTemplateByTypeDetailsList);
           
            MyInstance.CreateTemplateDATDict(DCAttributeGroupTypeList);

            OneViewConsole.Debug("SetProfileVariables End", "NewDcBO.SetProfileVariables");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "NewDcBO.SetProfileVariables", Excep);
        }

    }

    this.SaveDcPlaceAndTemplateServerIdList = function (DcProfileList) {
        try {
            OneViewConsole.Debug("SaveDcPlaceAndTemplateServerIdList Start", "NewDcBO.SaveDcPlaceAndTemplateServerIdList");
            
            for (var i = 0; i < DcProfileList.length; i++) {
                if (GlobalDcPlaceServerIdByProfileList.indexOf(DcProfileList[i].DcPlaceId) == -1) {
                    GlobalDcPlaceServerIdByProfileList.push(DcProfileList[i].DcPlaceId);
                }
                if (GlobalDcTemplateServerIdByProfileList.indexOf(DcProfileList[i].TemplateNodeId) == -1) {
                    GlobalDcTemplateServerIdByProfileList.push(DcProfileList[i].TemplateNodeId);
                }
            }

            //alert('GlobalDcPlaceServerIdByProfileList : ' + JSON.stringify(GlobalDcPlaceServerIdByProfileList));
            //alert('GlobalDcTemplateServerIdByProfileList : ' + JSON.stringify(GlobalDcTemplateServerIdByProfileList));

            OneViewConsole.Debug("SaveDcPlaceAndTemplateServerIdList End", "NewDcBO.SaveDcPlaceAndTemplateServerIdList");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "NewDcBO.SaveDcPlaceAndTemplateServerIdList", Excep);
        }
    }

    this.CreateTemplateDATDict = function (DCAttributeGroupTypeList) {
        try {
            OneViewConsole.Debug("CreateTemplateDATDict start", "NewDcBO.CreateTemplateDATDict");

            for (var i = 0; i < DCAttributeGroupTypeList.length; i++) {
                var DCAttributeGroupTypeDetails = DCAttributeGroupTypeList[i];
                TemplateDATEntityTypesDict[DCAttributeGroupTypeDetails.Id] = DCAttributeGroupTypeDetails.Name;
            }

            //alert('CreateTemplateDATDict TemplateDATEntityTypesDict : ' + JSON.stringify(TemplateDATEntityTypesDict));

            OneViewConsole.Debug("CreateTemplateDATDict end", "NewDcBO.CreateTemplateDATDict");

        }
        catch (Excep) {            
            throw oOneViewExceptionHandler.Create("BO", "NewDcBO.CreateTemplateDATDict", Excep);
        }
    }


    this.CreatePlaceDATDict = function (GlobalDcPlaceDimensionList) {
        try {
            OneViewConsole.Debug("CreatePlaceDATDict start", "NewDcBO.CreatePlaceDATDict");

            for (var i = 0; i < GlobalDcPlaceDimensionList.length; i++) {
                var DcPlaceDimension = GlobalDcPlaceDimensionList[i];
                PlaceDATEntityTypesDict[DcPlaceDimension.Id] = DcPlaceDimension.Name;
            }

           // alert('PlaceDATEntityTypesDict : ' + JSON.stringify(PlaceDATEntityTypesDict));

            OneViewConsole.Debug("CreatePlaceDATDict end", "NewDcBO.CreatePlaceDATDict");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "NewDcBO.CreatePlaceDATDict", Excep);
        }
    }

    this.AppendHtml = function (Id,Html) {
        try {
            OneViewConsole.Debug("AppendHtml Start", "NewDcBO.AppendHtml");

            document.getElementById(Id).innerHTML = Html;

            OneViewConsole.Debug("AppendHtml End", "NewDcBO.AppendHtml");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "NewDcBO.AppendHtml", Excep);
        }
    }


    this.GetList_POC = function () {
        try {
            if (IsGlobal_NewDc_StateManagementEnabled == true) {
                //alert('here');
                //MyInstance.setPageState_NewDCPage();
                var totalControls = Object.keys(PageState_NewDCPage).length;
                if (totalControls > 0) {
                    // alert('PageState_NewDCPage' + JSON.stringify(PageState_NewDCPage));

                    //alert('SelectedDcPlaceDimension' + JSON.stringify(SelectedDcPlaceDimension));



                    var oNewDcBandControl = new NewDcBandControl()
                    var oNewDcHTMLDropdownControl = new NewDcHTMLDropdownControl();
                    for (var i = 0; i < totalControls; i++) {
                        var contolInfo = PageState_NewDCPage[i];
                        if (contolInfo.type == 'band') {

                            var BandId = 'Band_' + contolInfo.Value + '_' + contolInfo.DimensionEnum;
                            var Name = 'Band_' + contolInfo.DimensionEnum;
                            if (document.getElementById(BandId) != null) {
                                oNewDcBandControl.SetBandColorForSingleSelection(BandId, Name)
                                // oNewDcBandControl.OnChange(contolInfo.Value, 1, 1);
                                document.getElementById(BandId).onclick();
                            }
                            else
                                break;
                        }
                        else if (contolInfo.type == 'ddl') {

                            var ddlId = contolInfo.DimensionTypeId + "_" + contolInfo.DimensionEnum;
                            oNewDcHTMLDropdownControl.Set(ddlId, contolInfo.Value);
                        }
                    }
                    //PageState_NewDCPage = {};
                }
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "NewDcBO.setPageState_NewDCPage", Excep);
        }
    }

   
    var setSampleState = function ()
    {
        PageState_NewDCPage = {
            0: {
                type: 'band', //ban,/ddl
                Value: 231,//typeId
                DimensionEnum: 1,//1 for Place,0 for Template
            },
            1:
             {
                 type: 'ddl', //ban,/ddl
                 Value: 12405,//typeId
                 DimensionEnum: 1,
                 DimensionTypeId: 231 //SampleingPoint drop dowen
             }
        }
    }

    this.setPageState_NewDCPage = function () {
        try {
            if (IsGlobal_NewDc_StateManagementEnabled == true) {
                //alert("hi");
                PageState_NewDCPage = {};
                var _oNewDcCommonHtml = new NewDcCommonHtml()
                var NewDCPageConfig = NewDCPageMetadata.NewDCPageDimension;

                var NewDCPageConfigLength = Object.keys(NewDCPageConfig).length;
                var Position = 0;

                for (var i = 1 ; i <= NewDCPageConfigLength ; i++) {
                    if (NewDCPageConfig[i].NewDCPageDimensionEnum == 1) {

                        setPageState_NewDCPage_SetControl(Position, 'band', SelectedDcPlaceDimension.Id, 1);
                        Position = Position + 1;
                        if (NewDCPageConfig[i].NewDCDimensionHierarchy != undefined && NewDCPageConfig[i].NewDCDimensionHierarchy != null) {

                            //alert(NewDCPageConfig[i].NewDCDimensionHierarchy);

                            var SelectedNewDCDimensionHierarchy = _oNewDcCommonHtml.GetHierachyConfigByDimensionNodeType(NewDCPageConfig[i], SelectedDcPlaceDimension);
                            //  alert(SelectedNewDCDimensionHierarchy);

                            if (SelectedNewDCDimensionHierarchy != null) {
                                var NewDCDimensionHierarchyDetailDict = SelectedNewDCDimensionHierarchy.NewDCDimensionHierarchyDetailDict;

                                var NewDCDimensionHierarchyDetailDictLength = Object.keys(NewDCDimensionHierarchyDetailDict).length;
                                for (var j = 1; j <= NewDCDimensionHierarchyDetailDictLength; j++) {
                                    var DDLId = NewDCDimensionHierarchyDetailDict[j] + "_1";
                                    var value = document.getElementById(DDLId).value;
                                    setPageState_NewDCPage_SetControl(Position, 'ddl', value, 1, NewDCDimensionHierarchyDetailDict[j]);
                                    Position = Position + 1;
                                }
                            }
                            else {
                                var DDLId = SelectedDcPlaceDimension.Id + "_1";
                                var value = document.getElementById(DDLId).value;
                                setPageState_NewDCPage_SetControl(Position, 'ddl', value, 1, SelectedDcPlaceDimension.Id);
                                Position = Position + 1;
                            }

                        }

                        else {
                            var DDLId = SelectedDcPlaceDimension.Id + "_1";
                            var value = document.getElementById(DDLId).value;
                            setPageState_NewDCPage_SetControl(Position, 'ddl', value, 1, SelectedDcPlaceDimension.Id);
                            Position = Position + 1;
                        }
                    }

                    else if (NewDCPageConfig[i].NewDCPageDimensionEnum == 0) {

                        setPageState_NewDCPage_SetControl(Position, 'band', SelectedDcTemplateDimension.Id, 0);

                        if (NewDCPageConfig[i].NewDCDimensionHierarchy != undefined && NewDCPageConfig[i].NewDCDimensionHierarchy != null) {

                            var SelectedNewDCDimensionHierarchy = _oNewDcCommonHtml.GetHierachyConfigByDimensionNodeType(NewDCPageConfig[i], SelectedDcTemplateDimension);
                            if (SelectedNewDCDimensionHierarchy != null) {
                                var NewDCDimensionHierarchyDetailDict = SelectedNewDCDimensionHierarchy.NewDCDimensionHierarchyDetailDict;

                                var NewDCDimensionHierarchyDetailDictLength = Object.keys(NewDCDimensionHierarchyDetailDict).length;
                                for (var j = 1; j <= NewDCDimensionHierarchyDetailDictLength; j++) {
                                    var DDLId = NewDCDimensionHierarchyDetailDict[j] + "_0";
                                    var value = document.getElementById(DDLId).value;
                                    setPageState_NewDCPage_SetControl(Position, 'ddl', value, 0, NewDCDimensionHierarchyDetailDict[j]);
                                    Position = Position + 1;
                                }
                            } else {

                                var DDLId = SelectedDcTemplateDimension.Id + "_0";
                                var value = document.getElementById(DDLId).value;
                                setPageState_NewDCPage_SetControl(Position, 'ddl', value, 0, SelectedDcTemplateDimension.Id);
                                Position = Position + 1;
                            }
                        }

                        else {
                            var DDLId = SelectedDcTemplateDimension.Id + "_0";
                            var value = document.getElementById(DDLId).value;
                            setPageState_NewDCPage_SetControl(Position, 'ddl', value, 0, SelectedDcTemplateDimension.Id);
                            Position = Position + 1;
                        }
                    }
                }
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "NewDcBO.setPageState_NewDCPage", Excep);
        }

       
    }


    var setPageState_NewDCPage_SetControl = function (Position, _type, _Value, _DimensionEnum, _DimensionTypeId) {
        try {
            if (_type == "band") {
                PageState_NewDCPage[Position] = {
                    type: _type,
                    Value: _Value,
                    DimensionEnum: _DimensionEnum
                }
            }

            else if (_type == "ddl") {
                PageState_NewDCPage[Position] = {
                    type: _type,
                    Value: _Value,
                    DimensionEnum: _DimensionEnum,
                    DimensionTypeId: _DimensionTypeId
                }
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "NewDcBO.setPageState_NewDCPage_SetControl", Excep);
        }
    }

    this.AppendCurrentDateTime = function (Id) {
        try {
            OneViewConsole.Debug("AppendCurrentDateTime Start", "NewDcBO.AppendCurrentDateTime");

            var _oDateTime = new DateTime();
            var _oCurrentDateTime = _oDateTime.GetYear() + "-" + _oDateTime.GetMonth() + "-" + _oDateTime.GetDay() + "T" + _oDateTime.GetHours() + ":" + _oDateTime.GetMinutes();

           // alert('_oCurrentDateTime : ' + _oCurrentDateTime)
        
            document.getElementById(Id).value = _oCurrentDateTime;//'2015-12-22T11:42';//

            OneViewConsole.Debug("AppendCurrentDateTime End", "NewDcBO.AppendCurrentDateTime");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "NewDcBO.AppendCurrentDateTime", Excep);
        }
    }

    this.SetDcStartDateInSession = function () {
        try {
            OneViewConsole.Debug("SetDcStartDateInSession Start", "NewDcBO.SetDcStartDateInSession");

           
            var DcStartDate = document.getElementById('DTDcStartDateControlId').value;            
            var DateTimeSplitted = DcStartDate.split('T');           
            var DateSplitted = DateTimeSplitted[0].split('-');            
            var FormattedDate = DateSplitted[2] + "-" + DateSplitted[1] + "-" + DateSplitted[0] + " " + DateTimeSplitted[1] + ":00";
            //alert('DcStartDate : ' + DcStartDate + ' , FormattedDate :' + FormattedDate);
            
            OneViewSessionStorage.Save("DcStartDate", FormattedDate);

            OneViewConsole.Debug("SetDcStartDateInSession End", "NewDcBO.SetDcStartDateInSession");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "NewDcBO.SetDcStartDateInSession", Excep);
        }
    }

    this.ValidateDcStartDate = function () {
        try {
            OneViewConsole.Debug("ValidateDcStartDate Start", "NewDcBO.ValidateDcStartDate");

            var IsSuccess = false;
            
            if (NewDCPageMetadata.IsDcStartDateSelectionEnabled == true && IsNewDcPageDcStartDateSelectionEnabled == true && GlobalNewDcPageRedirectValue != 1) {

                var oDTDcStartDateControlId = document.getElementById('DTDcStartDateControlId');

                if (oDTDcStartDateControlId != null && oDTDcStartDateControlId.value != "") {

                    IsSuccess = true;
                }
            }
            else {
                IsSuccess = true;
            }

            OneViewConsole.Debug("ValidateDcStartDate End", "NewDcBO.ValidateDcStartDate");

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "NewDcBO.ValidateDcStartDate", Excep);
        }
    }

    this.GetQueryString = function () {
        try {
            OneViewConsole.Debug("GetQueryString start", "LandingPageFacade.GetQueryString");

            DefaultControlsUIStatus = ($location.search().DefaultControlsUIStatus != undefined ? $location.search().DefaultControlsUIStatus : DefaultControlsUIStatus);
            //alert($location.search().DefaultControlsUIStatus + ' , DefaultControlsUIStatus : ' + DefaultControlsUIStatus);
            var QueryStringDict = {};
            var TemplateKey = ($location.search().TemplateKey !=undefined ? $location.search().TemplateKey : 0);
            var DCPlaceKey = ($location.search().DCPlaceKey != undefined ? "'" + $location.search().DCPlaceKey + "'" : undefined);
            var DCPlaceId = ($location.search().DCPlaceId != undefined ? $location.search().DCPlaceId : 0);
            var TemplateNodeId = ($location.search().TemplateNodeId != undefined ? $location.search().TemplateNodeId : 0);
            var DCPlaceRCOType = ($location.search().DCPlaceRCOType != undefined ? $location.search().DCPlaceRCOType :0  );
            var PageRedirectValue = $location.search().ViewDC;
            var ShowNotStartedDCProfiles = $location.search().ShowNotStartedDCProfiles;
            var ShowInProgressDCProfiles = $location.search().ShowInProgressDCProfiles;
            var ShowCompletedDCProfiles = $location.search().ShowCompletedDCProfiles;
            var ShowInProgressOrCompletedDCProfiles = $location.search().ShowInProgressOrCompletedDCProfiles;
            var AttributeGroupType = $location.search().AttributeGroupType;

            //alert('TemplateKey : ' + TemplateKey + ', DCPlaceKey : ' + DCPlaceKey + ', DCPlaceId : ' + DCPlaceId + ', TemplateNodeId : ' + TemplateNodeId + ', DCPlaceRCOType : ' + DCPlaceRCOType + ' , PageRedirectValue : ' + PageRedirectValue);
            var DCPlaceGroupId = 0;
            if (DCPlaceKey != undefined && DCPlaceKey != '') {
                var DCPlaceGroupDetails = DCPlaceKey.split('_');              
                if (DCPlaceGroupDetails.length > 1) {
                    DCPlaceGroupId = DCPlaceGroupDetails[1].substr(1);
                    DCPlaceGroupId = DCPlaceGroupId.substring(0, DCPlaceGroupId.length - 1);
                }
            }



            var _TemplateNodeType = 0;
            if (TemplateKey != undefined && TemplateKey != '') {
                var TemplateGroupDetails = TemplateKey.split('_');               
                if (TemplateGroupDetails.length > 1) {
                    _TemplateNodeType = TemplateGroupDetails[1].substr(1);
                }
                else {
                    _TemplateNodeType = TemplateKey;
                }
            }

            if (AttributeGroupType == undefined || AttributeGroupType == null || AttributeGroupType == "") {
                AttributeGroupType = 0;
            }

            QueryStringDict = {
                'DcPlaceGroup_Type': DCPlaceGroupId, 'DCPlaceRCOType': DCPlaceRCOType, 'DcPlaceNodeId': DCPlaceId,
                'TemplateNodeId': TemplateNodeId, 'TemplateGroup_Type': _TemplateNodeType, 'TemplateNodeType': _TemplateNodeType, 'PageRedirectValue': PageRedirectValue, 'AttributeGroupType': AttributeGroupType,
                'ShowNotStartedDCProfiles': ShowNotStartedDCProfiles, 'ShowInProgressDCProfiles': ShowInProgressDCProfiles, 'ShowCompletedDCProfiles': ShowCompletedDCProfiles, 'ShowInProgressOrCompletedDCProfiles': ShowInProgressOrCompletedDCProfiles
            };
            //alert(TemplateKey + ', QueryStringDict : ' + JSON.stringify(QueryStringDict));
            OneViewConsole.Debug("GetQueryString end", "LandingPageFacade.GetQueryString");

            return QueryStringDict;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.GetQueryString", Excep);
        }
        finally {
        }
    }

    this.IsDcPlaceSelectionThroughBarcodeReading = function () {
        try {
            OneViewConsole.Debug("IsDcPlaceSelectionThroughBarcodeReading start", "LandingPageFacade.IsDcPlaceSelectionThroughBarcodeReading");

            var IsSuccess = false;

            if (OneViewSessionStorage.Get("ServiceId") == 49) {
                IsSuccess = true;
            }

            //var BusinessEventHandlerObjectKeys = "BarcodeOrQRCodeReading";           

            //var _BusinessEventEntityBO = new BusinessEventEntityBO();
            //var ReqParameter = { ClassName: "NewDcBO", MethodName: "IsDcPlaceSelectionThroughBarcodeReading", RequiredBusinessEventHandlerObjectKeys: {}, IsTemplateValidationRequired: false, TemplateIdLst: [], };
            //ReqParameter.RequiredBusinessEventHandlerObjectKeys[BusinessEventHandlerObjectKeys] = "";

            //var _BusinessEventEntityBO = new BusinessEventEntityBO();
            //var _IsBussinessEventExist = _BusinessEventEntityBO.IsBussinessEventExist(ReqParameter);

            //if (_IsBussinessEventExist.BusinessEventHandlersObjectKeysDetails[BusinessEventHandlerObjectKeys] != undefined) {
            //    if (_IsBussinessEventExist.BusinessEventHandlersObjectKeysDetails[BusinessEventHandlerObjectKeys].IsSuccess == true) {
            //        IsSuccess = true;
            //    }
            //}
                      

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.IsDcPlaceSelectionThroughBarcodeReading", Excep);
        }
        finally {
        }
    }

}

function NewDcCommonHtml() {

    var MyInstance = this;

    var oNewDcNewDAO = new NewDcNewDAO();
    var oNewDcHTMLDropdownControl = new NewDcHTMLDropdownControl();
    var oNewDcBandControl = new NewDcBandControl();
    var oNewDcDateTimeControl = new NewDcDateTimeControl();
    var oNewDcCheckboxControl = new NewDcCheckboxControl();
    var ServiceId = OneViewSessionStorage.Get("ServiceId");

    this.GetHeaderLabel = function (DisplayName) {
        try {
            OneViewConsole.Debug("GetHeaderLabel End", "NewDcCommonHtml.GetHeaderLabel");

            var Html = '<div class="title-bar rounded">' + DisplayName + '</div>';

            OneViewConsole.Debug("GetHeaderLabel Start", "NewDcCommonHtml.GetHeaderLabel");

            return Html;
        }
        catch (Excep) {            
            throw oOneViewExceptionHandler.Create("FrameWork", "NewDcCommonHtml.GetHeaderLabel", Excep);
        }
    }

    this.GetHtml = function (NewDCPageMetadata) {
        try {
            OneViewConsole.Debug("GetHtml End", "NewDcCommonHtml.GetHtml");

            var ResponseData = null;
            var Html = "";
            var SelectedNodeId = 0;

           
           // else {               
                var NewDCPageConfig = NewDCPageMetadata.NewDCPageDimension;

                var NewDCPageConfigLength= Object.keys(NewDCPageConfig).length;

                for (var i = 1 ; i <= NewDCPageConfigLength ; i++) {

                    Html += '<div id="Position_' + i + '">';
                    if (NewDCPageConfig[i].Position > 1) {
                        SelectedNodeId = ResponseData.SelectedNode.Id;
                    }

                    var SelectedNewDCDimensionHierarchy = null;

                    if (NewDCPageConfig[i].NewDCPageDimensionEnum == 1) {

                        var DcPlaceDimensionList = [];
                        var DcPlaceLeftRightList = [];

                        if (NewDCPageConfig[i].Position == "1") {
                            DcPlaceLeftRightList = GlobalDcPlaceByTypeDetailsList;
                            DcPlaceDimensionList = GlobalDcPlaceDimensionList;
                        }
                        else {
                            var DcPlaceIdList = MyInstance.GetDcPlacesByTemplateId(SelectedNodeId);
                            DcPlaceDimensionList = oNewDcNewDAO.GetDCPlaceDimension(DcPlaceIdList);
                            DcPlaceDimensionList = DcPlaceDimensionList.sort(OneViewArraySorting('Name', true, function (a) { return a }));
                            SelectedDcPlaceDimension = DcPlaceDimensionList[0];
                            DcPlaceLeftRightList = oNewDcNewDAO.GetDCPlaceByTypeAndServerIds(SelectedDcPlaceDimension.Id, DcPlaceIdList);
                        }
                                                

                        SelectedNewDCDimensionHierarchy = MyInstance.GetHierachyConfigByDimensionNodeType(NewDCPageConfig[i], SelectedDcPlaceDimension);
                        ResponseData = MyInstance.GetPlaceHierarchyHtml(SelectedNewDCDimensionHierarchy, NewDCPageConfig[i].Position, NewDCPageConfig[i].NewDCPageDimensionEnum, NewDCPageConfig[i].HierarchyDisplayKey, DcPlaceDimensionList, DcPlaceLeftRightList);
                        Html += ResponseData.Html;
                    }

                    else if (NewDCPageConfig[i].NewDCPageDimensionEnum == 0) {

                        var DcTemplateDimensionList = [];
                        var DcTemplateLeftRightList = [];

                        if (NewDCPageConfig[i].Position == "1") {
                            DcTemplateLeftRightList = GlobalDcTemplateByTypeDetailsList;
                            DcTemplateDimensionList = GlobalDcTemplateDimensionList;
                        }
                        else {
                            var DcTemplateIdList = MyInstance.GetDcTemplatesByPlaceId(SelectedNodeId);
                            DcTemplateDimensionList = oNewDcNewDAO.GetDCTemplateDimension(DcTemplateIdList);
                            DcTemplateDimensionList = DcTemplateDimensionList.sort(OneViewArraySorting('Name', true, function (a) { return a }));
                            SelectedDcTemplateDimension = DcTemplateDimensionList[0];
                            DcTemplateLeftRightList = oNewDcNewDAO.GetDCTemplateByTypeAndServerIds(SelectedDcTemplateDimension.Id, DcTemplateIdList);
                        }

                        SelectedNewDCDimensionHierarchy = MyInstance.GetHierachyConfigByDimensionNodeType(NewDCPageConfig[i], SelectedDcTemplateDimension);
                        ResponseData = MyInstance.GetTemplateHierarchyHtml(SelectedNewDCDimensionHierarchy, NewDCPageConfig[i].Position, NewDCPageConfig[i].NewDCPageDimensionEnum, NewDCPageConfig[i].HierarchyDisplayKey, DcTemplateDimensionList, DcTemplateLeftRightList);
                        Html += ResponseData.Html;
                    }

                    else {
                        alert('Not Implemented Exception : NewDCPageDimensionEnum = ' + NewDCPageConfig[i].NewDCPageDimensionEnum);
                    }

                    Html += '</div>';
                }
            //}


                if (NewDCPageMetadata.IsDcStartDateSelectionEnabled == true && NewDCPageMetadata.IsDateWiseFilterationEnabled == true) {
                    alert('Not Implemented Exception : IsDcStartDateSelectionEnabled = ' + NewDCPageMetadata.IsDcStartDateSelectionEnabled + ', IsDateWiseFilterationEnabled = ' + NewDCPageMetadata.IsDateWiseFilterationEnabled);
                }

                else if (NewDCPageMetadata.IsDcStartDateSelectionEnabled == true) {
                    //alert('Not Implemented Exception : IsDcStartDateSelectionEnabled = ' + NewDCPageMetadata.IsDcStartDateSelectionEnabled);
                    var property = '';
                    if (IsNewDcPageDcStartDateSelectionEnabled == false || (IsNewDcPageDcStartDateSelectionEnabled == true && GlobalNewDcPageRedirectValue != 0)) {
                        property = 'none';
                    }

                    Html += ' <div class="row no-padding responsive-sm multi-col" style="display:' + property + '" >';
                    Html += oNewDcDateTimeControl.GetHtml(oxlatService.xlat('DcStartDate'), "DTDcStartDateControlId", '');
                    Html += '</div>';
                }

                else if (NewDCPageMetadata.IsDateWiseFilterationEnabled == true) {
                    alert('Not Implemented Exception : IsDateWiseFilterationEnabled = ' + NewDCPageMetadata.IsDateWiseFilterationEnabled);
                }

            OneViewConsole.Debug("GetHtml Start", "NewDcCommonHtml.GetHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "NewDcCommonHtml.GetHtml", Excep);
        }
    }

    this.GetHierachyConfigByDimensionNodeType = function (NewDCPageDimensionConfig, SelectedDcPlaceDimension) {
        try {
            OneViewConsole.Debug("GetHierachyConfigByDimensionNodeType End", "NewDcCommonHtml.GetHierachyConfigByDimensionNodeType");
           
            var SelectedNewDCDimensionHierarchy = null;
            if (NewDCPageDimensionConfig.NewDCDimensionHierarchy != null) {
                for (var i = 0; i < NewDCPageDimensionConfig.NewDCDimensionHierarchy.length; i++) {
                    if (NewDCPageDimensionConfig.NewDCDimensionHierarchy[i].DimensionNodeType == SelectedDcPlaceDimension.Id) {
                        SelectedNewDCDimensionHierarchy = NewDCPageDimensionConfig.NewDCDimensionHierarchy[i];
                        break;
                    }
                }
            }

            

            OneViewConsole.Debug("GetHierachyConfigByDimensionNodeType Start", "NewDcCommonHtml.GetHierachyConfigByDimensionNodeType");
            return SelectedNewDCDimensionHierarchy;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "NewDcCommonHtml.GetHierachyConfigByDimensionNodeType", Excep);
        }
    }

    this.GetPlaceHierarchyHtml = function (SelectedNewDCDimensionHierarchy, Position, NewDCPageDimensionEnum, HierarchyDisplayKey, DcPlaceDimensionList, DcPlaceLeftRightList) {
        try {
            OneViewConsole.Debug("GetPlaceHierarchyHtml End", "NewDcCommonHtml.GetPlaceHierarchyHtml");

            var ResponseData = { 'Html': '', 'SelectedNode': 0 };
            var Html = "";
            var ParentNodeId = 0;
            var DDL_DATId = 0;
            var DataSourceList = [];
            
            //Html += MyInstance.GetHeaderHTML(HierarchyDisplayKey);
            Html += MyInstance.GetBandHTML(DcPlaceDimensionList, Position, NewDCPageDimensionEnum);
           
            if (SelectedNewDCDimensionHierarchy != null) {                
                var NewDCDimensionHierarchyDetailDictLength = Object.keys(SelectedNewDCDimensionHierarchy.NewDCDimensionHierarchyDetailDict).length;                
                for (var i = 1; i <= NewDCDimensionHierarchyDetailDictLength ; i++) {                    
                    DDL_DATId = SelectedNewDCDimensionHierarchy.NewDCDimensionHierarchyDetailDict[i];                    
                    DataSourceList = MyInstance.GetSortedDCPlaceDataSourceList(DcPlaceLeftRightList, DDL_DATId, ParentNodeId);

                    var _NewDcBO = new NewDcBO();
                    if (_NewDcBO.IsDcPlaceSelectionThroughBarcodeReading() == true && SelectedNewDCDimensionHierarchy.DimensionNodeType == DDL_DATId) {

                      
                       
                            Html += MyInstance.GetPlaceByBarCodeHtml(DataSourceList, DDL_DATId, Position, NewDCPageDimensionEnum, i);
                            ParentNodeId = DataSourceList[0].Id;
                            MyInstance.GetSelectedTemplateOrPlaceAndSaveInSession(SelectedNewDCDimensionHierarchy.DimensionNodeType, DDL_DATId, NewDCPageDimensionEnum, DataSourceList[0]);
                            DCPlaceLst = DataSourceList;
                            //alert("DCPlaceLst : " + JSON.stringify(DataSourceList));
                       
                    }
                    else {
                        Html += MyInstance.GetPlaceHtml(DataSourceList, DDL_DATId, Position, NewDCPageDimensionEnum, i);
                        ParentNodeId = DataSourceList[0].Id;
                        MyInstance.GetSelectedTemplateOrPlaceAndSaveInSession(SelectedNewDCDimensionHierarchy.DimensionNodeType, DDL_DATId, NewDCPageDimensionEnum, DataSourceList[0]);
                        //alert("DataSourceList : " + JSON.stringify(DataSourceList));
                    }                  
                }
            }
            else {                
                DDL_DATId = SelectedDcPlaceDimension.Id;                
                //ParentNodeId = 0;
                DataSourceList = MyInstance.GetSortedDCPlaceDataSourceList(DcPlaceLeftRightList, DDL_DATId, ParentNodeId);                
                Html += MyInstance.GetPlaceHtml(DataSourceList, DDL_DATId, Position, NewDCPageDimensionEnum, 1);

                OneViewSessionStorage.Save("DcPlaceId", DataSourceList[0].Id);
                OneViewSessionStorage.Save("DcPlaceName", DataSourceList[0].Name);
            }

            ResponseData.Html = Html;
            ResponseData.SelectedNode = DataSourceList[0];

            OneViewConsole.Debug("GetPlaceHierarchyHtml Start", "NewDcCommonHtml.GetPlaceHierarchyHtml");
            return ResponseData;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "NewDcCommonHtml.GetPlaceHierarchyHtml", Excep);
        }
    }

    this.GetSortedDCPlaceDataSourceList = function (LeftRightList, TypeId, ParentNodeId) {
        try {
            OneViewConsole.Debug("GetSortedDCPlaceDataSourceList End", "NewDcCommonHtml.GetSortedDCPlaceDataSourceList");

            var DataSourceList = oNewDcNewDAO.GetDCPlaceParentByLeftRightAndParentTypeId(LeftRightList, TypeId, ParentNodeId);
            DataSourceList = DataSourceList.sort(OneViewArraySorting('Name', true, function (a) { return a }));

            OneViewConsole.Debug("GetSortedDCPlaceDataSourceList Start", "NewDcCommonHtml.GetSortedDCPlaceDataSourceList");

            return DataSourceList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "NewDcCommonHtml.GetSortedDCPlaceDataSourceList", Excep);
        }
    }

    this.GetPlaceHtml = function (DataSourceList, DDL_DATId, Position, NewDCPageDimensionEnum ,Level) {
        try {
            OneViewConsole.Debug("GetPlaceHtml End", "NewDcCommonHtml.GetPlaceHtml");

            var DDLId = DDL_DATId + "_" + NewDCPageDimensionEnum;
            
            if (ServiceId != 1 && ServiceId != 2) {
                if (PlaceDATEntityTypesDict[DDL_DATId] == undefined) {
                    var DATEntityDetails = oNewDcNewDAO.GetDATEntityTypesByServerId(DDL_DATId);
                    if (DATEntityDetails.length > 0) {
                        PlaceDATEntityTypesDict[DATEntityDetails[0].Id] = DATEntityDetails[0].Name;
                    }
                }
            }
            var Html = oNewDcHTMLDropdownControl.GetHtml(DataSourceList, PlaceDATEntityTypesDict[DDL_DATId], DDLId, Position, Level);

            //alert('GetPlaceHtml Html : ' + Html);

            OneViewConsole.Debug("GetPlaceHtml Start", "NewDcCommonHtml.GetPlaceHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "NewDcCommonHtml.GetPlaceHtml", Excep);
        }
    }

    this.GetPlaceByBarCodeHtml = function (DataSourceList, DDL_DATId, Position, NewDCPageDimensionEnum, Level) {
        try {
            OneViewConsole.Debug("GetPlaceByBarCodeHtml End", "NewDcCommonHtml.GetPlaceByBarCodeHtml");

            var DDLId = DDL_DATId + "_" + NewDCPageDimensionEnum;
            if (ServiceId != 1 && ServiceId != 2) {
                if (PlaceDATEntityTypesDict[DDL_DATId] == undefined) {
                    var DATEntityDetails = oNewDcNewDAO.GetDATEntityTypesByServerId(DDL_DATId);
                    if (DATEntityDetails.length > 0) {
                        PlaceDATEntityTypesDict[DATEntityDetails[0].Id] = DATEntityDetails[0].Name;
                    }
                }
            }

            var Html = oNewDcHTMLDropdownControl.GetBarCodeHtml(DataSourceList, PlaceDATEntityTypesDict[DDL_DATId], DDLId, Position, Level);

            //alert('GetPlaceHtml Html : ' + Html);

            OneViewConsole.Debug("GetPlaceByBarCodeHtml Start", "NewDcCommonHtml.GetPlaceByBarCodeHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "NewDcCommonHtml.GetPlaceByBarCodeHtml", Excep);
        }
    }

    this.GetHeaderHTML = function (DisplayName) {
        try {
            OneViewConsole.Debug("GetHeaderHTML End", "NewDcCommonHtml.GetHeaderHTML");

            var Html = '<div class="title-bar rounded">' + DisplayName + '</div>';

            OneViewConsole.Debug("GetHeaderHTML Start", "NewDcCommonHtml.GetHeaderHTML");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "NewDcCommonHtml.GetHeaderHTML", Excep);
        }
    }

    this.GetBandHTML = function (DimensionList, Position, NewDCPageDimensionEnum) {
        try {
            OneViewConsole.Debug("GetBandHTML End", "NewDcCommonHtml.GetBandHTML");

            var Html = oNewDcBandControl.GetHtml(DimensionList, Position, NewDCPageDimensionEnum);

            OneViewConsole.Debug("GetBandHTML Start", "NewDcCommonHtml.GetBandHTML");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "NewDcCommonHtml.GetBandHTML", Excep);
        }
    }

    this.GetTemplateHierarchyHtml = function (SelectedNewDCDimensionHierarchy, Position, NewDCPageDimensionEnum, HierarchyDisplayKey, DcTemplateDimensionList, DcTemplateLeftRightList) {
        try {
            OneViewConsole.Debug("GetTemplateHierarchyHtml End", "NewDcCommonHtml.GetTemplateHierarchyHtml");

            var ResponseData = { 'Html': '', 'SelectedNode': 0 };
            var Html = "";
            var ParentNodeId = 0;
            var DDL_DATId = 0;
            var DataSourceList = [];

           // Html += MyInstance.GetHeaderHTML(HierarchyDisplayKey);
            Html += MyInstance.GetBandHTML(DcTemplateDimensionList, Position, NewDCPageDimensionEnum);


            if (SelectedNewDCDimensionHierarchy != null) {
                var NewDCDimensionHierarchyDetailDictLength = Object.keys(SelectedNewDCDimensionHierarchy.NewDCDimensionHierarchyDetailDict).length;
                for (var i = 1; i <= NewDCDimensionHierarchyDetailDictLength ; i++) {
                    DDL_DATId = SelectedNewDCDimensionHierarchy.NewDCDimensionHierarchyDetailDict[i];
                    DataSourceList = MyInstance.GetSortedDCTemplateDataSourceList(DcTemplateLeftRightList, DDL_DATId, ParentNodeId);
                    Html += MyInstance.GetTemplateHtml(DataSourceList, DDL_DATId, Position, NewDCPageDimensionEnum,i);
                    ParentNodeId = DataSourceList[0].Id;
                    MyInstance.GetSelectedTemplateOrPlaceAndSaveInSession(SelectedNewDCDimensionHierarchy.DimensionNodeType, DDL_DATId, NewDCPageDimensionEnum, DataSourceList[0]);
                }
            }
            else {
                DDL_DATId = SelectedDcTemplateDimension.Id;
                ParentNodeId = 0;
                DataSourceList = MyInstance.GetSortedDCTemplateDataSourceList(DcTemplateLeftRightList, DDL_DATId, ParentNodeId);
                Html += MyInstance.GetTemplateHtml(DataSourceList, DDL_DATId, Position, NewDCPageDimensionEnum, 1);

                OneViewSessionStorage.Save("TemplateId", DataSourceList[0].Id);
                OneViewSessionStorage.Save("TemplateName", DataSourceList[0].Name);
            }

            ResponseData.Html = Html;
            ResponseData.SelectedNode = DataSourceList[0];

            OneViewConsole.Debug("GetTemplateHierarchyHtml Start", "NewDcCommonHtml.GetTemplateHierarchyHtml");

            return ResponseData;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "NewDcCommonHtml.GetTemplateHierarchyHtml", Excep);
        }
    }

    this.GetSortedDCTemplateDataSourceList = function (LeftRightList, TypeId, ParentNodeId) {
        try {
            OneViewConsole.Debug("GetSortedDCTemplateDataSourceList End", "NewDcCommonHtml.GetSortedDCTemplateDataSourceList");

            var DataSourceList = oNewDcNewDAO.GetDCTemplateParentByLeftRightAndParentTypeId(LeftRightList, TypeId, ParentNodeId);
            DataSourceList = DataSourceList.sort(OneViewArraySorting('Name', true, function (a) { return a }));

            OneViewConsole.Debug("GetSortedDCTemplateDataSourceList Start", "NewDcCommonHtml.GetSortedDCTemplateDataSourceList");

            return DataSourceList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "NewDcCommonHtml.GetSortedDCTemplateDataSourceList", Excep);
        }
    }

    this.GetTemplateHtml = function (DataSourceList, DDL_DATId, Position, NewDCPageDimensionEnum, Level) {
        try {
            OneViewConsole.Debug("GetTemplateHtml End", "NewDcCommonHtml.GetTemplateHtml");

            var DDLId = DDL_DATId + "_" + NewDCPageDimensionEnum;
            if (ServiceId != 1 && ServiceId != 2) {
                if (TemplateDATEntityTypesDict[DDL_DATId] == undefined) {
                    var AttributeGroupTypeDetails = oNewDcNewDAO.GetAttributeGroupTypeByServerId(DDL_DATId);
                    if (AttributeGroupTypeDetails.length > 0) {
                        TemplateDATEntityTypesDict[AttributeGroupTypeDetails[0].Id] = AttributeGroupTypeDetails[0].Name;
                    }
                }
            }
            var Html = oNewDcHTMLDropdownControl.GetHtml(DataSourceList, TemplateDATEntityTypesDict[DDL_DATId], DDLId, Position, Level);

            //alert('GetTemplateHtml Html : ' + Html);

            OneViewConsole.Debug("GetTemplateHtml Start", "NewDcCommonHtml.GetTemplateHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "NewDcCommonHtml.GetTemplateHtml", Excep);
        }
    }

    this.GetDcPlacesByTemplateId = function (TemplateNodeId) {
        try {
            OneViewConsole.Debug("GetDcPlacesByTemplateId End", "NewDcCommonHtml.GetDcPlacesByTemplateId");

            var DcPlaceIdList = [];
            //alert('TemplateNodeId : '+ TemplateNodeId + ' , GlobalDcProfileList : ' + JSON.stringify(GlobalDcProfileList));
            for (var i = 0; i < GlobalDcProfileList.length; i++) {
                if (GlobalDcProfileList[i].TemplateNodeId == TemplateNodeId && DcPlaceIdList.indexOf(GlobalDcProfileList[i].DcPlaceId) == -1) {
                    DcPlaceIdList.push(GlobalDcProfileList[i].DcPlaceId);
                }
            }

            
            OneViewConsole.Debug("GetDcPlacesByTemplateId Start", "NewDcCommonHtml.GetDcPlacesByTemplateId");

            //alert('DcPlaceIdList : ' + JSON.stringify(DcPlaceIdList));
            return DcPlaceIdList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "NewDcCommonHtml.GetDcPlacesByTemplateId", Excep);
        }
    }

    this.GetDcTemplatesByPlaceId = function (DcPlaceId) {
        try {
            OneViewConsole.Debug("GetDcTemplatesByPlaceId End", "NewDcCommonHtml.GetDcTemplatesByPlaceId");

            var DcTemplateIdList = [];

            for (var i = 0; i < GlobalDcProfileList.length; i++) {
                if (GlobalDcProfileList[i].DcPlaceId == DcPlaceId && DcTemplateIdList.indexOf(GlobalDcProfileList[i].TemplateNodeId) == -1) {
                    DcTemplateIdList.push(GlobalDcProfileList[i].TemplateNodeId);
                }
            }

            
            OneViewConsole.Debug("GetDcTemplatesByPlaceId Start", "NewDcCommonHtml.GetDcTemplatesByPlaceId");

            return DcTemplateIdList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "NewDcCommonHtml.GetDcTemplatesByPlaceId", Excep);
        }
    }

    this.GetDcPlaceDimensionLeftRightList = function (NewDCPageConfig, SelectedNodeId, SelectedDcPlaceDimensionLocal) {
        try {
            OneViewConsole.Debug("GetDcPlaceDimensionLeftRightList End", "NewDcCommonHtml.GetDcPlaceDimensionLeftRightList");

            var Response = {'DcPlaceDimensionList' : null , 'DcPlaceLeftRightList' : null};
            var DcPlaceDimensionList = [];
            var DcPlaceLeftRightList = [];

            if (NewDCPageConfig.Position == "1") {
                DcPlaceLeftRightList = GlobalDcPlaceByTypeDetailsList;
                DcPlaceDimensionList = GlobalDcPlaceDimensionList;
            }
            else {
                var DcPlaceIdList = MyInstance.GetDcPlacesByTemplateId(SelectedNodeId);
                DcPlaceDimensionList = oNewDcNewDAO.GetDCPlaceDimension(DcPlaceIdList);
                DcPlaceDimensionList = DcPlaceDimensionList.sort(OneViewArraySorting('Name', true, function (a) { return a }));
                if (SelectedDcPlaceDimensionLocal == undefined) {
                    SelectedDcPlaceDimension = DcPlaceDimensionList[0];
                    SelectedDcPlaceDimensionLocal = DcPlaceDimensionList[0];
                }
                
                DcPlaceLeftRightList = oNewDcNewDAO.GetDCPlaceByTypeAndServerIds(SelectedDcPlaceDimensionLocal.Id, DcPlaceIdList);
            }

            Response.DcPlaceDimensionList =DcPlaceDimensionList;
            Response.DcPlaceLeftRightList =DcPlaceLeftRightList;

            OneViewConsole.Debug("GetDcPlaceDimensionLeftRightList Start", "NewDcCommonHtml.GetDcPlaceDimensionLeftRightList");

            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "NewDcCommonHtml.GetDcPlaceDimensionLeftRightList", Excep);
        }
    }

    this.GetDcTemplateDimensionLeftRightList = function (NewDCPageConfig, SelectedNodeId, SelectedDcTemplateDimensionLocal) {
        try {
            OneViewConsole.Debug("GetDcPlaceDimensionLeftRightList End", "NewDcCommonHtml.GetDcPlaceDimensionLeftRightList");

            var Response = { 'DcTemplateDimensionList': null, 'DcTemplateLeftRightList': null };
           
            var DcTemplateDimensionList = [];
            var DcTemplateLeftRightList = [];

            if (NewDCPageConfig.Position == "1") {
                DcTemplateLeftRightList = GlobalDcTemplateByTypeDetailsList;
                DcTemplateDimensionList = GlobalDcTemplateDimensionList;
            }
            else {
                var DcTemplateIdList = MyInstance.GetDcTemplatesByPlaceId(SelectedNodeId);
                DcTemplateDimensionList = oNewDcNewDAO.GetDCTemplateDimension(DcTemplateIdList);
                DcTemplateDimensionList = DcTemplateDimensionList.sort(OneViewArraySorting('Name', true, function (a) { return a }));
                if (SelectedDcTemplateDimensionLocal == undefined) {
                    SelectedDcTemplateDimension = DcTemplateDimensionList[0];
                    SelectedDcTemplateDimensionLocal = DcTemplateDimensionList[0];
                }
                DcTemplateLeftRightList = oNewDcNewDAO.GetDCTemplateByTypeAndServerIds(SelectedDcTemplateDimensionLocal.Id, DcTemplateIdList);
            }

            Response.DcTemplateDimensionList = DcTemplateDimensionList;
            Response.DcTemplateLeftRightList = DcTemplateLeftRightList;
            
            OneViewConsole.Debug("GetDcPlaceDimensionLeftRightList Start", "NewDcCommonHtml.GetDcPlaceDimensionLeftRightList");

            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "NewDcCommonHtml.GetDcPlaceDimensionLeftRightList", Excep);
        }
    }
      
    this.GetSelectedTemplateOrPlaceAndSaveInSession = function (DimensionNodeType, DDL_DATId, NewDCPageDimensionEnum, DataSource) {
        try {
            OneViewConsole.Debug("GetSelectedTemplateOrPlaceAndSaveInSession End", "NewDcCommonHtml.GetSelectedTemplateOrPlaceAndSaveInSession");

           // alert('DimensionNodeType : ' + DimensionNodeType + ", DDL_DATId : " + DDL_DATId + " , DataSource.Id : " + DataSource.Id);
            if (DimensionNodeType == DDL_DATId) {
                if (NewDCPageDimensionEnum == 1) {
                    OneViewSessionStorage.Save("DcPlaceId", DataSource.Id);
                    OneViewSessionStorage.Save("DcPlaceName", DataSource.Name);
                }
                else if (NewDCPageDimensionEnum == 0) {
                    OneViewSessionStorage.Save("TemplateId", DataSource.Id);
                    OneViewSessionStorage.Save("TemplateName", DataSource.Name);
                }
            }
            
            OneViewConsole.Debug("GetSelectedTemplateOrPlaceAndSaveInSession Start", "NewDcCommonHtml.GetSelectedTemplateOrPlaceAndSaveInSession");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "NewDcCommonHtml.GetSelectedTemplateOrPlaceAndSaveInSession", Excep);
        }
    }

    this.EnableDisableControl = function (ControlId, Status) {
        try {
            OneViewConsole.Debug("EnableDisableControl Start", "NewDcCommonHtml.EnableDisableControl");
         
            document.getElementById(ControlId).disabled = Status;

            OneViewConsole.Debug("EnableDisableControl End", "NewDcCommonHtml.EnableDisableControl");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "NewDcCommonHtml.EnableDisableControl", Excep);
        }
    }
 
    this.DisableParentHierarchy = function (DcPlaceGroup_Type, DCPlaceRCOType,DcPlaceNodeId, TemplateNodeId, TemplateGroup_Type, TemplateNodeType) {
        try {
            OneViewConsole.Debug("DisableParentHierarchy Start", "NewDcCommonHtml.DisableParentHierarchy");

            var NewDCPageConfig = NewDCPageMetadata.NewDCPageDimension;
            var NewDCPageConfigLength = Object.keys(NewDCPageConfig).length;
           
            for (var i = 1 ; i <= NewDCPageConfigLength ; i++) {
                var SelectedNewDCDimensionHierarchy = null;
                var DDL_DATId = 0;
                var DDLId = "";
               
                if (NewDCPageConfig[i].NewDCPageDimensionEnum == 1) {
                    SelectedNewDCDimensionHierarchy = MyInstance.GetHierachyConfigByDimensionNodeType(NewDCPageConfig[i], { Id: DCPlaceRCOType });
                   
                    if (SelectedNewDCDimensionHierarchy != null) {
                        var NewDCDimensionHierarchyDetailDictLength = Object.keys(SelectedNewDCDimensionHierarchy.NewDCDimensionHierarchyDetailDict).length;
                        for (var j = 1; j <= NewDCDimensionHierarchyDetailDictLength ; j++) {
                            DDL_DATId = SelectedNewDCDimensionHierarchy.NewDCDimensionHierarchyDetailDict[j];
                           // alert(DcPlaceGroup_Type + " ," + DDL_DATId);
                            DDLId = 'Div_' + DDL_DATId + "_1";

                            if (DefaultControlsUIStatus === 'Hide') {
                                document.getElementById(DDLId).style.display = "none";
                            }
                            if (DefaultControlsUIStatus == 'Disable') {
                                document.getElementById(DDL_DATId + "_1").disabled = true;
                            }

                            if (DcPlaceGroup_Type == DDL_DATId) {
                                break;
                            }
                        }
                    }
                    else if (DCPlaceRCOType != 0) {                        
                        DDL_DATId = DCPlaceRCOType;
                        DDLId = 'Div_' + DDL_DATId + "_1";
                        if (DefaultControlsUIStatus === 'Hide') {
                            document.getElementById(DDLId).style.display = "none";
                        }
                        if (DefaultControlsUIStatus == 'Disable') {
                            document.getElementById(DDL_DATId + "_1").disabled = true;
                        }
                    }

                    var divBandContainerId = "divBandContainerId_" + NewDCPageConfig[i].NewDCPageDimensionEnum;
                    var divBandContainerObj = document.getElementById(divBandContainerId);
                    divBandContainerObj.style.display = "none";

                   // var BandName = 'Band_' + NewDCPageConfig[i].NewDCPageDimensionEnum;
                   // var BandId = 'Band_' + DCPlaceRCOType + "_" + NewDCPageConfig[i].NewDCPageDimensionEnum;

                   // var oBandName = document.getElementsByName(BandName);
                   //// var oBandId = document.getElementById(BandId);

                   // if (oBandName != null) {
                   //     for (var l = 0; l < oBandName.length; l++) {
                   //         oBandName[l].style.display = "none";
                   //     }
                   //     //oBandId.style.display = "";
                   // }

                }

                else if (NewDCPageConfig[i].NewDCPageDimensionEnum == 0) {
                    if (TemplateNodeType === 'Template') {
                        TemplateNodeType = 2;
                    }
                    if (TemplateGroup_Type === 'Template') {
                        TemplateGroup_Type = 2;
                    }
                    SelectedNewDCDimensionHierarchy = MyInstance.GetHierachyConfigByDimensionNodeType(NewDCPageConfig[i], { Id: TemplateNodeType });
                    
                    if (SelectedNewDCDimensionHierarchy != null) {
                        var NewDCDimensionHierarchyDetailDictLength = Object.keys(SelectedNewDCDimensionHierarchy.NewDCDimensionHierarchyDetailDict).length;                        
                        for (var j = 1; j <= NewDCDimensionHierarchyDetailDictLength ; j++) {
                            DDL_DATId = SelectedNewDCDimensionHierarchy.NewDCDimensionHierarchyDetailDict[j];                            
                            DDLId = 'Div_' + DDL_DATId + "_0";
                          
                            if (DefaultControlsUIStatus === 'Hide') {
                                document.getElementById(DDLId).style.display = "none";
                            }
                            if (DefaultControlsUIStatus == 'Disable') {
                                document.getElementById(DDL_DATId + "_0").disabled = true;
                            }
                            if (TemplateGroup_Type == DDL_DATId) {
                                break;
                            }
                        }
                    }

                    else if (TemplateNodeType != 0) {                       
                        if (TemplateNodeType === 'Template') {
                            TemplateNodeType = 2;
                        }

                        DDL_DATId = TemplateNodeType;
                        DDLId = 'Div_' + DDL_DATId + "_0";
                        if (DefaultControlsUIStatus === 'Hide') {                         
                            document.getElementById(DDLId).style.display = "none";
                        }
                        if (DefaultControlsUIStatus == 'Disable') {
                            document.getElementById(DDL_DATId + "_0").disabled = true;
                        }
                    }
                }
            }


            OneViewConsole.Debug("DisableParentHierarchy End", "NewDcCommonHtml.DisableParentHierarchy");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "NewDcCommonHtml.DisableParentHierarchy", Excep);
        }
    }

    this.SetDDLByProfile = function (DcPlaceGroup_Type, DCPlaceRCOType, DcPlaceNodeId, TemplateNodeId, TemplateGroup_Type, TemplateNodeType, AttributeGroupType) {
        try {
            OneViewConsole.Debug("SetDDLByProfile Start", "NewDcCommonHtml.SetDDLByProfile");

            var NewDCPageConfig = NewDCPageMetadata.NewDCPageDimension;
            var NewDCPageConfigLength = Object.keys(NewDCPageConfig).length;

            for (var i = 1 ; i <= NewDCPageConfigLength ; i++) {
                var SelectedNewDCDimensionHierarchy = null;
                var DDL_DATId = 0;
                var DDLId = "";

                if (NewDCPageConfig[i].NewDCPageDimensionEnum == 1) {
                    SelectedNewDCDimensionHierarchy = MyInstance.GetHierachyConfigByDimensionNodeType(NewDCPageConfig[i], { Id: DCPlaceRCOType });
                    //Set current Place Dimension 
                    SelectedDcPlaceDimension = { 'Id': DCPlaceRCOType, 'Name': PlaceDATEntityTypesDict[DCPlaceRCOType] };
                    //Set Current Place Band in UI                  
                    oNewDcBandControl.SetBandColorForSingleSelection('Band_' + SelectedDcPlaceDimension.Id + "_1", 'Band_1');
                    //Call OnChange for Band when Dc Place Dimension changes;
                    oNewDcBandControl.OnChange(SelectedDcPlaceDimension.Id, i, 1);
                    
                    var PlaceIdList = [];
                    PlaceIdList.push(DcPlaceNodeId);
                    var DCPlaceList = oNewDcNewDAO.GetDCPlaceByTypeAndServerIds(DcPlaceGroup_Type, PlaceIdList);


                    if (SelectedNewDCDimensionHierarchy != null) {
                        var NewDCDimensionHierarchyDetailDictLength = Object.keys(SelectedNewDCDimensionHierarchy.NewDCDimensionHierarchyDetailDict).length;
                        if (NewDCDimensionHierarchyDetailDictLength > 1) {
                            DDL_DATId = SelectedNewDCDimensionHierarchy.NewDCDimensionHierarchyDetailDict["1"];
                        }
                        if (DcPlaceGroup_Type == 0) {
                            DcPlaceGroup_Type = DDL_DATId;
                        }
                        var FirstPlaceParentInHierarchyList = oNewDcNewDAO.GetDCPlaceParentByLeftRightAndParentTypeId(DCPlaceList, DDL_DATId);
                       
                        document.getElementById(DcPlaceGroup_Type + "_1").value = FirstPlaceParentInHierarchyList[0].Id;
                        oNewDcHTMLDropdownControl.OnChange(i, "1");
                    }
                    else {
                        if (DcPlaceGroup_Type == 0) {
                            DcPlaceGroup_Type = DCPlaceRCOType;
                        }
                       
                        document.getElementById(DcPlaceGroup_Type + "_1").value = DCPlaceList[0].Id;
                        oNewDcHTMLDropdownControl.OnChange(i, "1");
                    }
                }

                else if (NewDCPageConfig[i].NewDCPageDimensionEnum == 0) {
                    //if (TemplateNodeType === 'Template') {                     
                    //    TemplateNodeType = AttributeGroupType;
                    //}
                    var TemplateIdList = [];
                    TemplateIdList.push(TemplateNodeId);
                    var DCAttributeGroupTypes = [];

                    var TemplateNodeTypeName = TemplateNodeType;
                    TemplateNodeType = AttributeGroupType;
                    var DCTemplateIdList = oNewDcNewDAO.GetDCTemplateLeftRightByServerIds(TemplateIdList); //remove the grouptype checking

                    DCAttributeGroupTypes = oNewDcNewDAO.GetDCAttributeGroupTypes(DCTemplateIdList);

                    for (var AttrGrpType = 0; AttrGrpType < DCAttributeGroupTypes.length; AttrGrpType++) {                        
                        if (DCAttributeGroupTypes[AttrGrpType].Name === TemplateNodeTypeName) {
                            TemplateGroup_Type = DCAttributeGroupTypes[AttrGrpType].Id;
                            break;
                        }
                    }

                    //TemplateGroup_Type = DCAttributeGroupTypes[0].Id;
                    SelectedNewDCDimensionHierarchy = MyInstance.GetHierachyConfigByDimensionNodeType(NewDCPageConfig[i], { Id: TemplateNodeType });
                    //Set current Template Dimension 
                    SelectedDcTemplateDimension = { 'Id': TemplateNodeType, 'Name': TemplateDATEntityTypesDict[TemplateNodeType] };
                    //Set Current Template Band in UI    
                    oNewDcBandControl.SetBandColorForSingleSelection('Band_' + SelectedDcTemplateDimension.Id + "_0", 'Band_0');
                    //Call OnChange for Band when Dc Template Dimension changes;
                    oNewDcBandControl.OnChange(SelectedDcTemplateDimension.Id, i, 0);
                    

                    if (SelectedNewDCDimensionHierarchy != null) {
                        var NewDCDimensionHierarchyDetailDictLength = Object.keys(SelectedNewDCDimensionHierarchy.NewDCDimensionHierarchyDetailDict).length;
                        if (NewDCDimensionHierarchyDetailDictLength > 1) {
                            DDL_DATId = SelectedNewDCDimensionHierarchy.NewDCDimensionHierarchyDetailDict["1"];
                        }
                        var FirstTemplateParentInHierarchyList = oNewDcNewDAO.GetDCTemplateParentByLeftRightAndParentTypeId(DCTemplateIdList, DDL_DATId);

                        document.getElementById(TemplateGroup_Type + "_0").value = FirstTemplateParentInHierarchyList[0].Id;
                        oNewDcHTMLDropdownControl.OnChange(i, "1");
                    }
                    else {
                            document.getElementById(TemplateGroup_Type + "_0").value = DCTemplateIdList[0].Id;
                            oNewDcHTMLDropdownControl.OnChange(i, "1");   
                    }
                }
            }

                        

            OneViewConsole.Debug("SetDDLByProfile End", "NewDcCommonHtml.SetDDLByProfile");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "NewDcCommonHtml.SetDDLByProfile", Excep);
        }
    }

    this.AppendCurrentDateTime = function (Id) {
        try {
            OneViewConsole.Debug("AppendCurrentDateTime Start", "NewDcCommonHtml.AppendCurrentDateTime");

            var _oDateTime = new DateTime();
            var _oCurrentDateTime = _oDateTime.GetYear() + "-" + _oDateTime.GetMonth() + "-" + _oDateTime.GetDay() + "T" + _oDateTime.GetHours() + ":" + _oDateTime.GetMinutes();

            // alert('_oCurrentDateTime : ' + _oCurrentDateTime)

            document.getElementById(Id).value = _oCurrentDateTime;//'2015-12-22T11:42';//

            OneViewConsole.Debug("AppendCurrentDateTime End", "NewDcCommonHtml.AppendCurrentDateTime");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "NewDcCommonHtml.AppendCurrentDateTime", Excep);
        }
    }
}

function NewDcHTMLDropdownControl() {

    var MyInstance = this;


    this.GetHtml = function (DataSourceList, DisplayName, DDLId, Position, Level) {
        try {
            OneViewConsole.Debug("GetHtml Start", "NewDcHTMLDropdownControl.GetHtml");

            //alert('NewDCPageMetadata : ' + JSON.stringify(NewDCPageMetadata));
            var property = '';
            //short cut feature from menu,hide logic
            var NewDCPageDimensionEnum = NewDCPageMetadata.NewDCPageDimension[Position].NewDCPageDimensionEnum;

            //if ((TemplateNodeId != null && TemplateNodeId != -1) &&  (DcPlaceId != null && DcPlaceId != -1)) {
            //    //dont hide
            //}

            //else if (NewDCPageDimensionEnum == 0 && (TemplateNodeId != null && TemplateNodeId != -1)) {
            //    property = 'none';
            //}
            //else if (NewDCPageDimensionEnum == 1 && (DcPlaceId != null && DcPlaceId != -1)) {
            //    property = 'none';
            //}
           
            var Html = '  <div class="row no-padding responsive-sm multi-col" style="display:' + property + '" id="Div_' + DDLId + '">' +
                                 '<div class="col rounded light-bg">' +
                                    ' <div class="field-item with-icon select-box">' +
                                        ' <label>' +
                                           '  <span>' + oxlatService.xlat(DisplayName) + ' </span>' +                                          
                                            ' <select id="' + DDLId + '" onChange = "new NewDcHTMLDropdownControl().OnChange(' + Position + ',' + Level + ')">' +
                                                 MyInstance.GetOptionsHtml(DataSourceList) +
                                             '</select>' +
                                             ' <i class="icon icon-chevron-down"></i>' +
                                         ' </label>' +
                                      '</div>' +
                                    '</div>' +
                            '</div>';


            OneViewConsole.Debug("GetHtml End", "NewDcHTMLDropdownControl.GetHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "NewDcHTMLDropdownControl.GetHtml", Excep);
        }
    }

    this.GetOptionsHtml = function (DataSourceList) {
        try {
            OneViewConsole.Debug("GetOptionsHtml Start", "NewDcHTMLDropdownControl.GetOptionsHtml");

            var OptionsHtml = '';

            for (var i = 0; i < DataSourceList.length; i++) {
                OptionsHtml += '<option value="' + DataSourceList[i].Id + '">' + DataSourceList[i].Name + '</option>';
            }

            OneViewConsole.Debug("GetOptionsHtml End", "NewDcHTMLDropdownControl.GetOptionsHtml");

            return OptionsHtml;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "NewDcHTMLDropdownControl.GetOptionsHtml", Excep);
        }
    }

    this.OnChange = function (Position, Level) {

        try {
            OneViewConsole.Debug("OnChange Start", "NewDcHTMLDropdownControl.OnChange");

            //alert('OnChange : ' + Position + "," + Level);
            MyInstance.RefreshStructure(Position, Level);
        }
        catch (Excep) {
            //alert('NewDcHTMLDropdownControl Excep :' + Excep + 'Excep :' + JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "NewDcHTMLDropdownControl.OnChange", oxlatService);
        }
    }

    this.RefreshStructure = function (Position, Level) {
        try {
            OneViewConsole.Debug("RefreshStructure Start", "NewDcHTMLDropdownControl.RefreshStructure");

            //alert('OnChange : ' + Position + "," + Level);

            var _oNewDcNewDAO = new NewDcNewDAO();
            var _oNewDcCommonHtml = new NewDcCommonHtml();
            var _oNewDcPresenter = new NewDcPresenter();
            var _oNewDcBandControl = new NewDcBandControl();
            var IsBarcodeHtml = false;

            Level = parseInt(Level);
            Position = parseInt(Position);

            var HierachyConfig = null;
            var ResponseData = { 'Html': '', 'SelectedNode': 0 };
            var DataSourceList;
            var NewDCPageDimensionEnum = NewDCPageMetadata.NewDCPageDimension[Position].NewDCPageDimensionEnum;
            var IsStructureRecreate = true;

            if (NewDCPageDimensionEnum == 1) {                
                HierachyConfig = _oNewDcCommonHtml.GetHierachyConfigByDimensionNodeType(NewDCPageMetadata.NewDCPageDimension[Position], SelectedDcPlaceDimension);               
            }
            else if (NewDCPageDimensionEnum == 0) {
                HierachyConfig = _oNewDcCommonHtml.GetHierachyConfigByDimensionNodeType(NewDCPageMetadata.NewDCPageDimension[Position], SelectedDcTemplateDimension);
            }

            var RefreshDATId;
            var ParentDATId;
            var SelectedDDL;
            var ParentNodeId;
            var ParentNodeName;
            var DataSource;
            if (HierachyConfig != null) {

                RefreshDATId = HierachyConfig.NewDCDimensionHierarchyDetailDict[(Level + 1)]
                ParentDATId = HierachyConfig.NewDCDimensionHierarchyDetailDict[Level];
                SelectedDDL = document.getElementById(ParentDATId + "_" + NewDCPageDimensionEnum);

                if (SelectedDDL.options[SelectedDDL.selectedIndex] != undefined) {
                    ParentNodeId = SelectedDDL.value;
                    ParentNodeName = SelectedDDL.options[SelectedDDL.selectedIndex].text;
                    DataSource = { 'Id': ParentNodeId, Name: ParentNodeName };



                    if (NewDCPageDimensionEnum == 1) {
                        _oNewDcCommonHtml.GetSelectedTemplateOrPlaceAndSaveInSession(SelectedDcPlaceDimension.Id, ParentDATId, NewDCPageDimensionEnum, DataSource);
                    }
                    else if (NewDCPageDimensionEnum == 0) {
                        _oNewDcCommonHtml.GetSelectedTemplateOrPlaceAndSaveInSession(SelectedDcTemplateDimension.Id, ParentDATId, NewDCPageDimensionEnum, DataSource);
                    }



                    //alert('RefreshDATId : ' + RefreshDATId + "," + ParentDATId + "," + ParentNodeId);

                    if (RefreshDATId != undefined) {
                        
                        if (NewDCPageDimensionEnum == 1) {

                            if (HierachyConfig.DimensionNodeType == RefreshDATId) {
                                var _NewDcBO = new NewDcBO();
                                if (_NewDcBO.IsDcPlaceSelectionThroughBarcodeReading() == true) {
                                    IsBarcodeHtml = true;
                                   
                                    IsPlaceSelectedUsingBarcode = false;
                                    document.getElementById("txtDcPlaceNme").value = "";
                                }
                            }
                            //if (IsBarcodeHtml==false){
                            var Response = _oNewDcCommonHtml.GetDcPlaceDimensionLeftRightList(NewDCPageMetadata.NewDCPageDimension[Position], OneViewSessionStorage.Get("TemplateId"), SelectedDcPlaceDimension);
                            //alert('Response 1: ' + JSON.stringify(Response));
                            DataSourceList = _oNewDcNewDAO.GetDCPlaceParentByLeftRightAndParentTypeId(Response.DcPlaceLeftRightList, RefreshDATId, ParentNodeId);
                            //alert('DataSourceList 1 : ' + JSON.stringify(DataSourceList));          
                            if (IsBarcodeHtml == true) {
                                DCPlaceLst = DataSourceList;
                            }

                            _oNewDcCommonHtml.GetSelectedTemplateOrPlaceAndSaveInSession(SelectedDcPlaceDimension.Id, ParentDATId, NewDCPageDimensionEnum, DataSourceList[0]);
                         // }
                        }
                        else if (NewDCPageDimensionEnum == 0) {
                            var Response = _oNewDcCommonHtml.GetDcTemplateDimensionLeftRightList(NewDCPageMetadata.NewDCPageDimension[Position], OneViewSessionStorage.Get("DcPlaceId"), SelectedDcTemplateDimension);
                            //alert('Response 0: ' + JSON.stringify(Response));
                            DataSourceList = _oNewDcNewDAO.GetDCTemplateParentByLeftRightAndParentTypeId(Response.DcTemplateLeftRightList, RefreshDATId, ParentNodeId);
                            //alert('DataSourceList 0 : ' + JSON.stringify(DataSourceList));

                            _oNewDcCommonHtml.GetSelectedTemplateOrPlaceAndSaveInSession(SelectedDcTemplateDimension.Id, ParentDATId, NewDCPageDimensionEnum, DataSourceList[0]);
                        }
                        if (IsBarcodeHtml==false){
                        var OptionsList = MyInstance.GetOptionsHtml(DataSourceList);
                        _oNewDcPresenter.LoadHtml(OptionsList, RefreshDATId + "_" + NewDCPageDimensionEnum);
                        }


                    }
                    else {
                        IsStructureRecreate = false;
                        //if (NewDCPageMetadata.NewDCPageDimension[Position + 1] != undefined) {

                        //    var BandId;
                        //    var Name;

                        //    var NewDCPageConfig = NewDCPageMetadata.NewDCPageDimension[Position + 1];
                        //    if (NewDCPageConfig.NewDCPageDimensionEnum == 1) {
                        //        var Response = _oNewDcCommonHtml.GetDcPlaceDimensionLeftRightList(NewDCPageConfig, ParentNodeId);
                        //        var SelectedNewDCDimensionHierarchy = _oNewDcCommonHtml.GetHierachyConfigByDimensionNodeType(NewDCPageConfig, SelectedDcPlaceDimension);
                        //        ResponseData = _oNewDcCommonHtml.GetPlaceHierarchyHtml(SelectedNewDCDimensionHierarchy, NewDCPageConfig.Position, NewDCPageConfig.NewDCPageDimensionEnum, NewDCPageConfig.HierarchyDisplayKey, Response.DcPlaceDimensionList, Response.DcPlaceLeftRightList);
                        //        BandId = 'Band_' + SelectedDcPlaceDimension.Id + "_" + NewDCPageConfig.NewDCPageDimensionEnum;

                        //    }
                        //    else if (NewDCPageConfig.NewDCPageDimensionEnum == 0) {
                        //        var Response = _oNewDcCommonHtml.GetDcTemplateDimensionLeftRightList(NewDCPageConfig, ParentNodeId);
                        //        var SelectedNewDCDimensionHierarchy = _oNewDcCommonHtml.GetHierachyConfigByDimensionNodeType(NewDCPageConfig, SelectedDcTemplateDimension);
                        //        ResponseData = _oNewDcCommonHtml.GetTemplateHierarchyHtml(SelectedNewDCDimensionHierarchy, NewDCPageConfig.Position, NewDCPageConfig.NewDCPageDimensionEnum, NewDCPageConfig.HierarchyDisplayKey, Response.DcTemplateDimensionList, Response.DcTemplateLeftRightList);
                        //        BandId = 'Band_' + SelectedDcTemplateDimension.Id + "_" + NewDCPageConfig.NewDCPageDimensionEnum;
                        //    }

                        //    //alert(NewDCPageConfig.Position + 'ResponseData.Html : ' + ResponseData.Html)
                        //    _oNewDcPresenter.LoadHtml(ResponseData.Html, 'Position_' + NewDCPageConfig.Position);

                        //    Name = 'Band_' + NewDCPageConfig.NewDCPageDimensionEnum;
                        //    _oNewDcBandControl.SetBandColorForSingleSelection(BandId, Name);
                        //}

                        MyInstance.Get(Position, ParentNodeId, _oNewDcCommonHtml, _oNewDcBandControl, _oNewDcPresenter);
                    }

                }
                else {
                    var ServiceId = OneViewSessionStorage.Get("ServiceId");

                    /////if Landing Page enabled client navigate to dashboard page
                    //if (ServiceId == 3 || ServiceId == 4 || ServiceId == 5) {
                    //    olocation.url('/dashboard');
                    //}
                    //else {
                    //    /// else navigate to notification page
                    //    //Re-direct to notification page
                    //    var MessageKey = "IN-NF-MAU-003 :: No profiles are available to conduct data capture";
                    //    var Url = '/notifycall?MessageKey=' + MessageKey + '';
                    //    olocation.url(Url);
                    //}


                   
                    if (ServiceId == 1 || ServiceId == 2 || ServiceId == 24) {
                        /// navigate to notification page
                        //Re-direct to notification page
                        var MessageKey = "IN-NF-MAU-003 :: No profiles are available to conduct data capture";
                        var Url = '/notifycall?MessageKey=' + MessageKey + '';
                        olocation.url(Url);
                    }
                    else {
                        /// Landing Page enabled client navigate to dashboard page
                        olocation.url('/dashboard');
                 
                    }
                }


                if (RefreshDATId != undefined) {
                    if (IsBarcodeHtml == false) {
                        MyInstance.OnChange(Position, Level + 1);
                    }
                }

                else {
                    if (NewDCPageMetadata.NewDCPageDimension[Position + 1] != undefined && IsStructureRecreate == true) {
                        MyInstance.OnChange(Position + 1, 1);
                    }
                }

            }

            else {
                IsStructureRecreate = false;

                if (NewDCPageMetadata.NewDCPageDimension[Position].NewDCPageDimensionEnum == 1) {
                    ParentDATId = SelectedDcPlaceDimension.Id;
                    SelectedDDL = document.getElementById(ParentDATId + "_" + NewDCPageDimensionEnum);

                }
                else if (NewDCPageMetadata.NewDCPageDimension[Position].NewDCPageDimensionEnum == 0) {
                    ParentDATId = SelectedDcTemplateDimension.Id;
                    SelectedDDL = document.getElementById(ParentDATId + "_" + NewDCPageDimensionEnum);
                }

                ParentNodeId = SelectedDDL.value;
                ParentNodeName = SelectedDDL.options[SelectedDDL.selectedIndex].text;
                DataSource = { 'Id': ParentNodeId, Name: ParentNodeName };

                if (NewDCPageDimensionEnum == 1) {
                    _oNewDcCommonHtml.GetSelectedTemplateOrPlaceAndSaveInSession(SelectedDcPlaceDimension.Id, ParentDATId, NewDCPageDimensionEnum, DataSource);
                }
                else if (NewDCPageDimensionEnum == 0) {
                    _oNewDcCommonHtml.GetSelectedTemplateOrPlaceAndSaveInSession(SelectedDcTemplateDimension.Id, ParentDATId, NewDCPageDimensionEnum, DataSource);
                }

                if (NewDCPageMetadata.NewDCPageDimension[Position + 1] != undefined) {                   

                    ////////////new code
                    //RefreshDATId = 0;
                  

                    //if (NewDCPageMetadata.NewDCPageDimension[Position + 1] != undefined) {

                    //    var BandId;
                    //    var Name;

                    //    var NewDCPageConfig = NewDCPageMetadata.NewDCPageDimension[Position + 1];
                    //    if (NewDCPageConfig.NewDCPageDimensionEnum == 1) {
                    //        var Response = _oNewDcCommonHtml.GetDcPlaceDimensionLeftRightList(NewDCPageConfig, ParentNodeId);
                    //        var SelectedNewDCDimensionHierarchy = _oNewDcCommonHtml.GetHierachyConfigByDimensionNodeType(NewDCPageConfig, SelectedDcPlaceDimension);
                    //        ResponseData = _oNewDcCommonHtml.GetPlaceHierarchyHtml(SelectedNewDCDimensionHierarchy, NewDCPageConfig.Position, NewDCPageConfig.NewDCPageDimensionEnum, NewDCPageConfig.HierarchyDisplayKey, Response.DcPlaceDimensionList, Response.DcPlaceLeftRightList);
                    //        BandId = 'Band_' + SelectedDcPlaceDimension.Id + "_" + NewDCPageConfig.NewDCPageDimensionEnum;

                    //    }
                    //    else if (NewDCPageConfig.NewDCPageDimensionEnum == 0) {
                    //        var Response = _oNewDcCommonHtml.GetDcTemplateDimensionLeftRightList(NewDCPageConfig, ParentNodeId);
                    //        var SelectedNewDCDimensionHierarchy = _oNewDcCommonHtml.GetHierachyConfigByDimensionNodeType(NewDCPageConfig, SelectedDcTemplateDimension);
                    //        ResponseData = _oNewDcCommonHtml.GetTemplateHierarchyHtml(SelectedNewDCDimensionHierarchy, NewDCPageConfig.Position, NewDCPageConfig.NewDCPageDimensionEnum, NewDCPageConfig.HierarchyDisplayKey, Response.DcTemplateDimensionList, Response.DcTemplateLeftRightList);
                    //        BandId = 'Band_' + SelectedDcTemplateDimension.Id + "_" + NewDCPageConfig.NewDCPageDimensionEnum;
                    //    }

                    //    //alert(NewDCPageConfig.Position + 'case 2 here ResponseData.Html : ' + ResponseData.Html)
                    //    _oNewDcPresenter.LoadHtml(ResponseData.Html, 'Position_' + NewDCPageConfig.Position);

                    //    Name = 'Band_' + NewDCPageConfig.NewDCPageDimensionEnum;
                    //    _oNewDcBandControl.SetBandColorForSingleSelection(BandId, Name);
                    //}

                    MyInstance.Get(Position, ParentNodeId, _oNewDcCommonHtml, _oNewDcBandControl, _oNewDcPresenter);
                }
            }

            OneViewConsole.Debug("RefreshStructure End", "NewDcHTMLDropdownControl.RefreshStructure");
        }
        catch (Excep) {
           // alert('NewDcHTMLDropdownControl.RefreshStructure Excep :' + Excep + 'Excep :' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "NewDcHTMLDropdownControl.RefreshStructure", Excep);
        }
    }


    this.Get = function (Position, ParentNodeId, _oNewDcCommonHtml, _oNewDcBandControl, _oNewDcPresenter) {
            try {
                OneViewConsole.Debug("Get Start", "NewDcHTMLDropdownControl.Get");

                var ResponseData = { 'Html': '', 'SelectedNode': 0 };

                if (NewDCPageMetadata.NewDCPageDimension[Position + 1] != undefined) {

                    var BandId;
                    var Name;

                    var NewDCPageConfig = NewDCPageMetadata.NewDCPageDimension[Position + 1];
                    if (NewDCPageConfig.NewDCPageDimensionEnum == 1) {
                        var Response = _oNewDcCommonHtml.GetDcPlaceDimensionLeftRightList(NewDCPageConfig, ParentNodeId);
                        var SelectedNewDCDimensionHierarchy = _oNewDcCommonHtml.GetHierachyConfigByDimensionNodeType(NewDCPageConfig, SelectedDcPlaceDimension);
                        ResponseData = _oNewDcCommonHtml.GetPlaceHierarchyHtml(SelectedNewDCDimensionHierarchy, NewDCPageConfig.Position, NewDCPageConfig.NewDCPageDimensionEnum, NewDCPageConfig.HierarchyDisplayKey, Response.DcPlaceDimensionList, Response.DcPlaceLeftRightList);                        
                        BandId = 'Band_' + SelectedDcPlaceDimension.Id + "_" + NewDCPageConfig.NewDCPageDimensionEnum;

                    }
                    else if (NewDCPageConfig.NewDCPageDimensionEnum == 0) {
                        var Response = _oNewDcCommonHtml.GetDcTemplateDimensionLeftRightList(NewDCPageConfig, ParentNodeId);
                        var SelectedNewDCDimensionHierarchy = _oNewDcCommonHtml.GetHierachyConfigByDimensionNodeType(NewDCPageConfig, SelectedDcTemplateDimension);
                        ResponseData = _oNewDcCommonHtml.GetTemplateHierarchyHtml(SelectedNewDCDimensionHierarchy, NewDCPageConfig.Position, NewDCPageConfig.NewDCPageDimensionEnum, NewDCPageConfig.HierarchyDisplayKey, Response.DcTemplateDimensionList, Response.DcTemplateLeftRightList);
                        BandId = 'Band_' + SelectedDcTemplateDimension.Id + "_" + NewDCPageConfig.NewDCPageDimensionEnum;
                    }

                    //alert(NewDCPageConfig.Position + 'ResponseData.Html : ' + ResponseData.Html)
                    _oNewDcPresenter.LoadHtml(ResponseData.Html, 'Position_' + NewDCPageConfig.Position);

                    Name = 'Band_' + NewDCPageConfig.NewDCPageDimensionEnum;
                    _oNewDcBandControl.SetBandColorForSingleSelection(BandId, Name);
                }


                OneViewConsole.Debug("Get End", "NewDcHTMLDropdownControl.Get");

            }
            catch (Excep) {
                //alert('NewDcHTMLDropdownControl.Get Excep :' + Excep + 'Excep :' + JSON.stringify(Excep));
                throw oOneViewExceptionHandler.Create("Framework", "NewDcHTMLDropdownControl.Get", Excep);
            }
    }

    this.Set = function (Id,Value)
    {
        try {
            OneViewConsole.Debug("Get Start", "NewDcHTMLDropdownControl.Get");

            var ddlObj = document.getElementById(Id);
            //alert('ddlObj' + ddlObj);
            if (ddlObj != null) {
                var totalItem = ddlObj.options.length;
                for (var i = 0; i < totalItem; i++) {
                    //alert(ddlObj.options[i].value);

                    if (ddlObj.options[i].value == Value) {
                        ddlObj.value = Value;
                        ddlObj.onchange()
                        
                    }
                }
            }

            OneViewConsole.Debug("Get Start", "NewDcHTMLDropdownControl.Get");
        }
        catch (Excep)
        {
            throw oOneViewExceptionHandler.Create("Framework", "NewDcHTMLDropdownControl.Set", Excep);
        }
      
    }

    this.GetBarCodeHtml = function (DataSourceList, DisplayName, DDLId, Position, Level) {
        try {
            OneViewConsole.Debug("GetBarCodeHtml Start", "NewDcHTMLDropdownControl.GetBarCodeHtml");


            var property = '';

            var NewDCPageDimensionEnum = NewDCPageMetadata.NewDCPageDimension[Position].NewDCPageDimensionEnum;
      

            var Html = '<div class="row no-padding responsive-sm multi-col" id="Div_' + DDLId + '">' +
                        '<div class="col rounded light-bg">' +
                          '<div class="row no-padding no-margin">' +
                    ' <div class="col no-padding no-margin">' +
                        '<div class="field-item">' +
                         oxlatService.xlat(DisplayName) +
                        '</div> <label><input type="text" id="txtDcPlaceNme" readonly/> </label>' +
                        '</div>' +
                           '<div class="col col-10 no-padding no-margin text-center">' +
                    '   <a href="javascript:void(0)" onclick="new NewDcHTMLDropdownControl().OpenBarcodeReader()" class="button button-icon"><i class="icon icon-qrcode"></i></a>' +
                    ' </div>' +
                    ' </div>' +
                    ' </div>' +
                    ' </div>';
           
          


            OneViewConsole.Debug("GetBarCodeHtml End", "NewDcHTMLDropdownControl.GetBarCodeHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "NewDcHTMLDropdownControl.GetBarCodeHtml", Excep);
        }
    }

    this.OpenBarcodeReader = function () {

        try {
            OneViewConsole.Debug("OpenBarcodeReader start", "DcApprovalDetailsAnswerModeComponent.OpenBarcodeReader");
            //alert(Response + "--" + JSON.stringify(DCPlaceLst));
            //oGlobalOneviewBarcodeReaderPlugin.BarcodeReaderEventHandler = this.BarcodeReaderEventHandler;
            //oGlobalOneviewBarcodeReaderPlugin.ScanCode();


            cordova.plugins.barcodeScanner.scan(
                   function (result) {
                       if (!result.cancelled) {

                           if (result.format == "QR_CODE") {                        
                               MyInstance.BarcodeReaderEventHandler(result.text);                           
                           }
                       }
                   },
            function (error) {
               // ReturnMessage.Text = "Scanning failed: " + error;
                alert("Scanning failed: " + error);
            },
            {
                        "resultDisplayDuration":0
            }
            );


            OneViewConsole.Debug("OpenBarcodeReader End", "DcApprovalDetailsAnswerModeComponent.OpenBarcodeReader");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcApprovalDetailsAnswerModeComponent.OpenBarcodeReader", oxlatService);
        }
    }

    this.BarcodeReaderEventHandler = function (Response) {

        try {
            OneViewConsole.Debug("BarcodeReaderEventHandler start", "DcApprovalDetailsAnswerModeComponent.BarcodeReaderEventHandler");

            //alert(Response + "--" + JSON.stringify(DCPlaceLst));

            var IsSuccess = false;

            if (DCPlaceLst.length > 0) {

                for (var i = 0; i < DCPlaceLst.length; i++) {

                    if (parseInt(DCPlaceLst[i].Id) == parseInt(Response)) {

                        IsSuccess = true;
                        IsPlaceSelectedUsingBarcode = true;
                        OneViewSessionStorage.Save("DcPlaceId", DCPlaceLst[i].Id);
                        OneViewSessionStorage.Save("DcPlaceName", DCPlaceLst[i].Name);
                        document.getElementById("txtDcPlaceNme").value = DCPlaceLst[i].Name;
                        break;
                    }
                }
            }

            if (IsSuccess == false) {
              
                IsPlaceSelectedUsingBarcode = false;
                document.getElementById("txtDcPlaceNme").value = "";
                alert(oxlatService.xlat('User is not responsible to any of the Aisle in this DC'));
            }

            OneViewConsole.Debug("BarcodeReaderEventHandler End", "DcApprovalDetailsAnswerModeComponent.BarcodeReaderEventHandler");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "DcApprovalDetailsAnswerModeComponent.BarcodeReaderEventHandler", oxlatService);
        }
    }
}

function NewDcBandControl() {

    var MyInstance = this;
     
    this.GetHtml = function (DimensionList, Position, NewDCPageDimensionEnum) {
        try {
            OneViewConsole.Debug("GetHtml End", "NewDcBandControl.GetHtml");

            var property = 'none';

            if (DimensionList.length > 1) {
                property = "";
            }

            //short cut feature from menu,hide logic
            if (NewDCPageDimensionEnum == 0 && TemplateNodeId != null)
                property = "none";
           




            var Html = '<div Id="divBandContainerId_' +NewDCPageDimensionEnum+'" class="row no-padding responsive-sm multi-col" style="display:' + property + '"><div class="col rounded light-bg"><div class="field-item"><div class="multiselect-button button-bar">';
          
            var BandId = 'Band_' + DimensionList[0].Id + "_" + NewDCPageDimensionEnum;
            var Name = 'Band_' +  NewDCPageDimensionEnum;

            Html += '<button class="button" style="background-color:Green;color:white" id = "' + BandId + '" name ="' + Name + '" onclick="new NewDcBandControl().OnChange(' + DimensionList[0].Id + ' , ' + Position + ' , ' + NewDCPageDimensionEnum + ')">' + oxlatService.xlat(DimensionList[0].Name) + '</button>';



            for (var i = 1; i < DimensionList.length; i++) {
                BandId = 'Band_' + DimensionList[i].Id + "_" + NewDCPageDimensionEnum;
                Html += '<button class="button" style="background-color:Grey;color:Black" id = "' + BandId + '" name ="' + Name + '" onclick="new NewDcBandControl().OnChange(' + DimensionList[i].Id + ' , ' + Position + ' , ' + NewDCPageDimensionEnum + ')">' + oxlatService.xlat(DimensionList[i].Name) + '</button>';
            }
         
            Html += '</div></div></div></div>';

            OneViewConsole.Debug("GetHtml Start", "NewDcBandControl.GetHtml");
  
            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "NewDcBandControl.GetHtml", Excep);
        }
    }

    this.OnChange = function (Id, Position, NewDCPageDimensionEnum) {
        try {
            OneViewConsole.Debug("OnChange End", "NewDcBandControl.OnChange");

            var BandId = 'Band_' + Id + "_" + NewDCPageDimensionEnum;
            var Name = 'Band_' + NewDCPageDimensionEnum;

            //alert(Id + "," + Position + "," + NewDCPageDimensionEnum + "," + BandId + "," + Name);
            var _oNewDcNewDAO = new NewDcNewDAO();
            var _oNewDcCommonHtml = new NewDcCommonHtml();
            var _oNewDcPresenter = new NewDcPresenter();

            if (NewDCPageDimensionEnum == 1) {                
                SelectedDcPlaceDimension = { 'Id': Id, 'Name': PlaceDATEntityTypesDict[Id] };                
            }
            else if (NewDCPageDimensionEnum == 0) {
                SelectedDcTemplateDimension = { 'Id': Id, 'Name': TemplateDATEntityTypesDict[Id] };
            }            

            if (Position == "1") {

                var Html = "";
                if (NewDCPageDimensionEnum == 1) {
                    GlobalDcPlaceByTypeDetailsList = _oNewDcNewDAO.GetDCPlaceByTypeAndServerIds(SelectedDcPlaceDimension.Id, GlobalDcPlaceServerIdByProfileList);
                    Html = _oNewDcCommonHtml.GetHtml(NewDCPageMetadata);
                }
                else if (NewDCPageDimensionEnum == 0) {
                    GlobalDcTemplateByTypeDetailsList = _oNewDcNewDAO.GetDCTemplateByTypeAndServerIds(SelectedDcTemplateDimension.Id, GlobalDcTemplateServerIdByProfileList);
                    Html = _oNewDcCommonHtml.GetHtml(NewDCPageMetadata);
                }

                //alert('NewDcBandControl.OnChange Html :' + Html)
                document.getElementById("ContentDiv").innerHTML = Html;

            }

            else {

                var NewDCPageConfig = NewDCPageMetadata.NewDCPageDimension[Position];

                if (NewDCPageConfig.NewDCPageDimensionEnum == 1) {
                    var Response = _oNewDcCommonHtml.GetDcPlaceDimensionLeftRightList(NewDCPageConfig, OneViewSessionStorage.Get("TemplateId"), SelectedDcPlaceDimension);
                    var SelectedNewDCDimensionHierarchy = _oNewDcCommonHtml.GetHierachyConfigByDimensionNodeType(NewDCPageConfig, SelectedDcPlaceDimension);
                    ResponseData = _oNewDcCommonHtml.GetPlaceHierarchyHtml(SelectedNewDCDimensionHierarchy, NewDCPageConfig.Position, NewDCPageConfig.NewDCPageDimensionEnum, NewDCPageConfig.HierarchyDisplayKey, Response.DcPlaceDimensionList, Response.DcPlaceLeftRightList);

                }
                else if (NewDCPageConfig.NewDCPageDimensionEnum == 0) {
                    var Response = _oNewDcCommonHtml.GetDcTemplateDimensionLeftRightList(NewDCPageConfig, OneViewSessionStorage.Get("DcPlaceId"), SelectedDcTemplateDimension);
                    var SelectedNewDCDimensionHierarchy = _oNewDcCommonHtml.GetHierachyConfigByDimensionNodeType(NewDCPageConfig, SelectedDcTemplateDimension);
                    ResponseData = _oNewDcCommonHtml.GetTemplateHierarchyHtml(SelectedNewDCDimensionHierarchy, NewDCPageConfig.Position, NewDCPageConfig.NewDCPageDimensionEnum, NewDCPageConfig.HierarchyDisplayKey, Response.DcTemplateDimensionList, Response.DcTemplateLeftRightList);
                }

                //alert(NewDCPageConfig.Position + '     ResponseData.Html :' + ResponseData.Html)
                _oNewDcPresenter.LoadHtml(ResponseData.Html, 'Position_' + NewDCPageConfig.Position);

            }

            MyInstance.SetBandColorForSingleSelection(BandId, Name);

            if (NewDCPageMetadata.IsDcStartDateSelectionEnabled == true) {
                var ControlId = 'DTDcStartDateControlId';
                _oNewDcCommonHtml.AppendCurrentDateTime(ControlId);
            }

            else if (NewDCPageMetadata.IsDateWiseFilterationEnabled == true) {
                alert('Not Implemented Exception : IsDateWiseFilterationEnabled = ' + NewDCPageMetadata.IsDateWiseFilterationEnabled);
            }

            OneViewConsole.Debug("OnChange Start", "NewDcBandControl.OnChange");

        }
        catch (Excep) {
            //alert('NewDcBandControl.OnChange Excep :' + Excep + 'Excep :' + JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "NewDcBandControl.OnChange", oxlatService);
        }

    }



    this.SetBandColorForSingleSelection = function (ControlId, Name) {

        try {
            OneViewConsole.Debug("SetBandColorForSingleSelection Start", "NewDcBandControl.SetBandColorForSingleSelection");

            var CurrentObj = document.getElementById(ControlId);
            if (CurrentObj != undefined && CurrentObj != null && CurrentObj != "") {
                MyInstance.ClearAllColors(Name);
                CurrentObj.style.backgroundColor = "Green";
                CurrentObj.style.color = "white";
            }

            OneViewConsole.Debug("SetBandColorForSingleSelection End", "NewDcBandControl.SetBandColorForSingleSelection");
        }
        catch (Excep) {            
            throw oOneViewExceptionHandler.Create("Framework", "NewDcBandControl.SetBandColorForSingleSelection", Excep);
        }
        finally {
            CurrentObj = null;
        }
    }

    this.ClearAllColors = function (Name) {
        try {
            OneViewConsole.Debug("ClearAllColors Start", "NewDcBandControl.ClearAllColors");

            var AllObj = document.getElementsByName(Name);
            if (AllObj != null) {
                for (var i = 0; i < AllObj.length; i++) {
                    AllObj[i].style.backgroundColor = "Grey";
                    AllObj[i].style.color = "Black";
                }
            }

            OneViewConsole.Debug("ClearAllColors End", "NewDcBandControl.ClearAllColors");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "NewDcBandControl.ClearAllColors", Excep);
        }
        finally {
            AllObj = null;
        }
    }


}

function NewDcNewDAO() {
    var MyInstance = this;

    this.GetDCPlaceDimension = function (DcPlaceIdList) {
        try {

            OneViewConsole.Debug("GetDCPlaceDimension Start", "NewDcNewDAO.GetDCPlaceDimension");
            OneViewConsole.Debug("DcPlaceIdList :", JSON.stringify(DcPlaceIdList));
            var DCPlaceDimensionList = [];
            var DCPlaceDimensionIdList = [];

            var Incondition = "(";

            for (var i = 0; i < DcPlaceIdList.length; i++) {
                Incondition += DcPlaceIdList[i];
                Incondition += (i <= DcPlaceIdList.length - 2) ? "," : ")";
            }

            var DcPlaceDimensionIdQuery = "SELECT DISTINCT ChildDbElementType As Id FROM OrganizationAssetsNode WHERE ServerId in " + Incondition;

            DCPlaceDimensionIdList = window.OneViewSqlite.excecuteSqlReader(DcPlaceDimensionIdQuery);
            DCPlaceDimensionIdList = JSON.parse(DCPlaceDimensionIdList);
            //alert('DCPlaceDimensionIdList : ' + JSON.stringify(DCPlaceDimensionIdList));



            ////Currently DATEntity doesnt exists in DB after adding we can use this code
            //Incondition = "(";

            //for (var i = 0; i < DCPlaceDimensionIdList.length; i++) {
            //    Incondition += DCPlaceDimensionIdList[i];
            //    Incondition += (i <= DCPlaceDimensionIdList.length - 2) ? "," : ")";
            //}

            //var DcPlaceDimensionQuery = "SELECT DISTINCT ServerId As Id, Name FROM DATEntityTypes WHERE ServerId in" + Incondition;

            //DCPlaceDimensionList = window.OneViewSqlite.excecuteSqlReader(DcPlaceDimensionQuery);
            //DCPlaceDimensionList = JSON.parse(DCPlaceDimensionList);


            var ServiceId = OneViewSessionStorage.Get("ServiceId");

            if (ServiceId != 1 && ServiceId != 2) {
                DCPlaceDimensionList = MyInstance.GetDATEntityTypes(DCPlaceDimensionIdList);
            }
            else {
                for (var i = 0; i < DCPlaceDimensionIdList.length; i++) {
                    if (PlaceDATEntityTypesDict[DCPlaceDimensionIdList[i].Id] != undefined) {
                        DCPlaceDimensionList.push({ 'Id': DCPlaceDimensionIdList[i].Id, 'Name': PlaceDATEntityTypesDict[DCPlaceDimensionIdList[i].Id] });
                    }
                    else {
                        alert('NewDcNewDAO.GetDCPlaceDimension : In PlaceDATEntityTypesDict Name Not found Exception');
                    }
                }
            }


            //for (var i = 0; i< DCPlaceDimensionIdList.length; i++) {
            //    if (PlaceDATEntityTypesDict[DCPlaceDimensionIdList[i].Id] != undefined) {
            //        DCPlaceDimensionList.push({ 'Id': DCPlaceDimensionIdList[i].Id, 'Name': PlaceDATEntityTypesDict[DCPlaceDimensionIdList[i].Id] });
            //    }
            //    else {
            //        alert('NewDcNewDAO.GetDCPlaceDimension : In PlaceDATEntityTypesDict Name Not found Exception');
            //    }
            //}
           

            OneViewConsole.Debug("Response from GetDCPlaceDimension" + JSON.stringify(DCPlaceDimensionIdList), "NewDcNewDAO.GetDCPlaceDimension");
            OneViewConsole.Debug("GetDCPlaceDimension End", "NewDcNewDAO.GetDCPlaceDimension");

            return DCPlaceDimensionList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "NewDcNewDAO.GetDCPlaceDimension", Excep);
        }
    }

    this.GetDCTemplateDimension = function (DcTemplateIdList) {
        try {

            OneViewConsole.Debug("GetDCTemplateDimension Start", "NewDcNewDAO.GetDCTemplateDimension");
            OneViewConsole.Debug("DcTemplateIdList :", JSON.stringify(DcTemplateIdList));

            var DCTemplateDimensionList = [];
            
            var Incondition = "(";

            for (var i = 0; i < DcTemplateIdList.length; i++) {
                Incondition += DcTemplateIdList[i];
                Incondition += (i <= DcTemplateIdList.length - 2) ? "," : ")";
            }

            var DcTemplateDimensionQuery = "SELECT DISTINCT AGT.ServerId AS Id,AGT.Name from TemplateNode as Temp INNER JOIN AttributeGroupMasterEntity as AG on Temp.childDbElementId = AG.ServerId " +
                                                "INNER JOIN AttributeGroupType as AGT on AG.AttributeGroupTypeId = AGT.ServerId and Temp.ServerId in " + Incondition;

            //alert('DcTemplateDimensionQuery : ' + DcTemplateDimensionQuery);

            DCTemplateDimensionList = window.OneViewSqlite.excecuteSqlReader(DcTemplateDimensionQuery);
            DCTemplateDimensionList = JSON.parse(DCTemplateDimensionList);

            //alert('DCTemplateDimensionList : ' + JSON.stringify(DCTemplateDimensionList));

            OneViewConsole.Debug("Response from GetDCTemplateDimension" + JSON.stringify(DCTemplateDimensionList), "NewDcNewDAO.GetDCTemplateDimension");
            OneViewConsole.Debug("GetDCTemplateDimension End", "NewDcNewDAO.GetDCTemplateDimension");


            return DCTemplateDimensionList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "NewDcNewDAO.GetDCTemplateDimension", Excep);
        }
    }

    this.GetDCPlaceByTypeAndServerIds = function (TypeId, IdList) {
        try {
            OneViewConsole.Debug("GetDCPlaceByTypeAndServerIds Start", "NewDcNewDAO.GetDCPlaceByTypeAndServerIds");

            var Incondition = "(";

            for (var i = 0; i < IdList.length; i++) {
                Incondition += IdList[i];
                Incondition += (i <= IdList.length - 2) ? "," : ")";
            }

            var DCPlaceList = [];
            var DcPlaceQuery = "SELECT DISTINCT ServerId As Id,ChildDbElementName As Name, Left,Right FROM OrganizationAssetsNode WHERE ServerId IN " + Incondition;

            if (TypeId != null && TypeId != undefined && TypeId != "" && TypeId != 0) {
                DcPlaceQuery += " AND ChildDbElementType = " + TypeId;
            }

            //alert('DcPlaceQuery : ' + DcPlaceQuery);

            DCPlaceList = window.OneViewSqlite.excecuteSqlReader(DcPlaceQuery);
            DCPlaceList = JSON.parse(DCPlaceList);

            OneViewConsole.Debug("GetDCPlaceByTypeAndServerIds End", "NewDcNewDAO.GetDCPlaceByTypeAndServerIds");

            return DCPlaceList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "NewDcNewDAO.GetDCPlaceByTypeAndServerIds", Excep);
        }
    }

    /// <summary>
    /// GetDCPlaceParentByLeftRightAndParentTypeId
    /// </summary>
    /// <param name="LeftRightList">Left and Right List of Profiled DcPlaces for particular dimension</param>
    /// <param name="TypeId">ParentNodeType id</param>
    /// <param name="ParentNodeId">ParentNodeId </param>
    /// <returns>Returns the List of DcPlaces</returns>
    this.GetDCPlaceParentByLeftRightAndParentTypeId = function (LeftRightList, TypeId, ParentNodeId) {
        try {
            OneViewConsole.Debug("GetDCPlaceParentByLeftRightAndParentTypeId Start", "NewDcNewDAO.GetDCPlaceParentByLeftRightAndParentTypeId");

            var DCPlaceHierachyList = [];
            var DCPlaceHierachyQuery = "SELECT ServerId AS Id, ChildDbElementName AS Name FROM OrganizationAssetsNode WHERE ChildDbElementType = " + TypeId + " AND ";

            DCPlaceHierachyQuery += "(";

            for (var i = 0; i < LeftRightList.length ; i++) {
                DCPlaceHierachyQuery += "(Left <=" + LeftRightList[i].Left + " AND Right >= " + LeftRightList[i].Right + ") ";
                DCPlaceHierachyQuery += (i <= LeftRightList.length - 2) ? " OR " : "";
            }

            DCPlaceHierachyQuery += ")";

            if (ParentNodeId != undefined && ParentNodeId != 0) {
                var ParentNodeQuery = "SELECT Left,Right FROM OrganizationAssetsNode WHERE ServerId = " + ParentNodeId;
                var ParentNoderesult = window.OneViewSqlite.excecuteSqlReader(ParentNodeQuery);
                ParentNoderesult = JSON.parse(ParentNoderesult);

                if (ParentNoderesult.length > 0) {
                    DCPlaceHierachyQuery += " AND (Left >= " + ParentNoderesult[0].Left + " And Right <= " + ParentNoderesult[0].Right + ")";
                }

            }

            //alert('DCPlaceHierachyQuery : ' + DCPlaceHierachyQuery);
            DCPlaceHierachyList = window.OneViewSqlite.excecuteSqlReader(DCPlaceHierachyQuery);
            DCPlaceHierachyList = JSON.parse(DCPlaceHierachyList);

            //alert('DCPlaceHierachyList : ' + JSON.stringify(DCPlaceHierachyList));

            OneViewConsole.Debug("GetDCPlaceParentByLeftRightAndParentTypeId End", "NewDcNewDAO.GetDCPlaceParentByLeftRightAndParentTypeId");

            return DCPlaceHierachyList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "NewDcNewDAO.GetDCPlaceParentByLeftRightAndParentTypeId", Excep);
        }
    }
    
  
    //To do : need to change type checking : currently no type checking
    this.GetDCTemplateByTypeAndServerIds = function (TypeId, IdList) {
        try {
            OneViewConsole.Debug("GetDCTemplateByTypeAndServerIds Start", "NewDcNewDAO.GetDCTemplateByTypeAndServerIds");

            var Incondition = "(";

            //alert('IdList :' + JSON.stringify(IdList));
            for (var i = 0; i < IdList.length; i++) {
                Incondition += IdList[i];
                Incondition += (i <= IdList.length - 2) ? "," : ")";
            }

            var DCTemplateList = [];
            //var DCTemplateQuery = "SELECT DISTINCT ServerId As Id,ChildDbElementName As Name , Left,Right FROM TemplateNode WHERE ServerId IN " + Incondition;

            var DCTemplateQuery = "SELECT temp.ServerId AS Id,temp.ChildDbElementName AS Name , temp.Left, temp.Right from TemplateNode AS temp INNER JOIN AttributeGroupMasterEntity AS AG on temp.ChildDbElementId = AG.ServerId " +
           "INNER JOIN AttributeGroupType AS AGT on AG.AttributeGroupTypeId = AGT.ServerId Where AGT.ServerId = " + TypeId + " AND temp.ServerId IN " + Incondition;


            ////if (TypeId != null && TypeId != undefined && TypeId != "") {
            ////    DCTemplateQuery += " AND ChildDbElementType = " + TypeId;
            ////}

            //alert('DCTemplateQuery : ' + DCTemplateQuery);

            DCTemplateList = window.OneViewSqlite.excecuteSqlReader(DCTemplateQuery);
            DCTemplateList = JSON.parse(DCTemplateList);


            OneViewConsole.Debug("GetDCTemplateByTypeAndServerIds End", "NewDcNewDAO.GetDCTemplateByTypeAndServerIds");

            return DCTemplateList;
        }
        catch (Excep) {
            //alert('Excep : ' + Excep + ", " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("DAO", "NewDcNewDAO.GetDCTemplateByTypeAndServerIds", Excep);
        }
    }

    /// <summary>
    /// GetDCTemplateParentByLeftRightAndParentTypeId
    /// </summary>
    /// <param name="LeftRightList">Left and Right List of Profiled DcTemplate for particular dimension</param>
    /// <param name="TypeId">ParentNodeType id</param>
    /// <param name="ParentNodeId">ParentNodeId </param>
    /// <returns>Returns the List of DcTemplates</returns>
    this.GetDCTemplateParentByLeftRightAndParentTypeId = function (LeftRightList, TypeId, ParentNodeId) {
        try {
            OneViewConsole.Debug("GetDCTemplateParentByLeftRightAndParentTypeId Start", "NewDcNewDAO.GetDCTemplateParentByLeftRightAndParentTypeId");

            var DCTemplateHierachyList = [];

            var DCTemplateHierachyQuery = "SELECT temp.ServerId AS Id,temp.ChildDbElementName AS Name from TemplateNode AS temp INNER JOIN AttributeGroupMasterEntity AS AG on temp.ChildDbElementId = AG.ServerId  AND temp.ChildDbElementType = AG.Type " +
            "INNER JOIN AttributeGroupType AS AGT on AG.AttributeGroupTypeId = AGT.ServerId Where AGT.ServerId = " + TypeId;

            DCTemplateHierachyQuery += " AND (";

            for (var i = 0; i < LeftRightList.length ; i++) {
                DCTemplateHierachyQuery += "(Left <=" + LeftRightList[i].Left + " AND Right >= " + LeftRightList[i].Right + ") ";
                DCTemplateHierachyQuery += (i <= LeftRightList.length - 2) ? " OR " : "";
            }

            DCTemplateHierachyQuery += ")";

            if (ParentNodeId != undefined && ParentNodeId != 0) {
                var ParentNodeQuery = "SELECT Left,Right FROM TemplateNode WHERE ServerId = " + ParentNodeId;
                var ParentNoderesult = window.OneViewSqlite.excecuteSqlReader(ParentNodeQuery);
                ParentNoderesult = JSON.parse(ParentNoderesult);

                if (ParentNoderesult.length > 0) {
                    DCTemplateHierachyQuery += " AND (Left >= " + ParentNoderesult[0].Left + " And Right <= " + ParentNoderesult[0].Right + ")";
                }

            }


            //alert('DCTemplateHierachyQuery : ' + DCTemplateHierachyQuery);

            DCTemplateHierachyList = window.OneViewSqlite.excecuteSqlReader(DCTemplateHierachyQuery);
            DCTemplateHierachyList = JSON.parse(DCTemplateHierachyList);

            //alert('DCTemplateHierachyList : ' + JSON.stringify(DCTemplateHierachyList));

            OneViewConsole.Debug("GetDCTemplateParentByLeftRightAndParentTypeId End", "NewDcNewDAO.GetDCTemplateParentByLeftRightAndParentTypeId");

            return DCTemplateHierachyList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "NewDcNewDAO.GetDCTemplateParentByLeftRightAndParentTypeId", Excep);
        }
    }

    this.GetDCAttributeGroupTypes = function (LeftRightList) {
        try {
            OneViewConsole.Debug("GetDCAttributeGroupTypes Start", "NewDcNewDAO.GetDCAttributeGroupTypes");

            var DCAttributeGroupTypeList = [];

            var DCAttributeGroupTypeQuery = "SELECT DISTINCT AGT.ServerId AS Id,AGT.Name AS Name from TemplateNode AS temp INNER JOIN AttributeGroupMasterEntity AS AG on temp.ChildDbElementId = AG.ServerId AND temp.ChildDbElementType = AG.Type " +
            "INNER JOIN AttributeGroupType AS AGT on AG.AttributeGroupTypeId = AGT.ServerId Where ";

            DCAttributeGroupTypeQuery += " (";

            for (var i = 0; i < LeftRightList.length ; i++) {
                DCAttributeGroupTypeQuery += "(Left <=" + LeftRightList[i].Left + " AND Right >= " + LeftRightList[i].Right + ") ";
                DCAttributeGroupTypeQuery += (i <= LeftRightList.length - 2) ? " OR " : "";
            }

            DCAttributeGroupTypeQuery += ")";


            //alert('DCAttributeGroupTypeQuery : ' + DCAttributeGroupTypeQuery);

            DCAttributeGroupTypeList = window.OneViewSqlite.excecuteSqlReader(DCAttributeGroupTypeQuery);
            DCAttributeGroupTypeList = JSON.parse(DCAttributeGroupTypeList);

            //alert('DCAttributeGroupTypeList : ' + JSON.stringify(DCAttributeGroupTypeList));

            OneViewConsole.Debug("GetDCAttributeGroupTypes End", "NewDcNewDAO.GetDCAttributeGroupTypes");

            return DCAttributeGroupTypeList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "NewDcNewDAO.GetDCAttributeGroupTypes", Excep);
        }
    }

    this.GetDcInfo = function (ServiceId, DcPlaceId, TemplateId, LoginUserId) {

        try {
            OneViewConsole.Debug("GetDcInfo start", "NewDcNewDAO.GetDcInfo");

            var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

            var Query = "SELECT DataCaptureEntity.* FROM  DataCaptureEntity INNER JOIN DcResultsEntity ON DcResultsEntity.DataCaptureId = DataCaptureEntity.Id" +
                        " WHERE DataCaptureEntity.ServiceId=" + ServiceId + " AND DataCaptureEntity.DcPlaceId=" + DcPlaceId + " AND DataCaptureEntity.TemplateNodeId=" + TemplateId +
                        " AND DcResultsEntity.SystemUserId=" + LoginUserId;

            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.Debug("GetDcInfo end", "NewDcNewDAO.GetDcInfo");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "NewDcNewDAO.GetDcInfo", Excep);
        }
        finally {
        }
    }

    this.GetDATEntityTypes = function (DATEntityIdList) {

        try {
            OneViewConsole.Debug("GetDATEntityTypes start", "NewDcNewDAO.GetDATEntityTypes");
            
            var Incondition = "(";

            for (var i = 0; i < DATEntityIdList.length; i++) {
                Incondition += DATEntityIdList[i].Id;
                Incondition += (i <= DATEntityIdList.length - 2) ? "," : ")";
            }

            var Query = "SELECT DISTINCT ServerId As Id, DisplayName AS Name FROM DATEntityTypes WHERE ServerId in " + Incondition;
            //alert('Query : ' + Query);

            var Result = window.OneViewSqlite.excecuteSqlReader(Query);
            Result = JSON.parse(Result);

            //alert('Result : ' + JSON.stringify(Result));

            OneViewConsole.Debug("GetDATEntityTypes end", "NewDcNewDAO.GetDATEntityTypes");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "NewDcNewDAO.GetDATEntityTypes", Excep);
        }
        finally {
        }
    }

    this.GetDATEntityTypesByServerId = function (ServerId) {

        try {
            OneViewConsole.Debug("GetDATEntityTypesByServerId start", "NewDcNewDAO.GetDATEntityTypesByServerId");
            
            var Query = "SELECT DISTINCT ServerId As Id, DisplayName AS Name FROM DATEntityTypes WHERE ServerId = " + ServerId;
            //alert('Query : ' + Query);

            var Result = window.OneViewSqlite.excecuteSqlReader(Query);
            Result = JSON.parse(Result);

            //alert('DATEntityTypes Result : ' + JSON.stringify(Result));

            OneViewConsole.Debug("GetDATEntityTypesByServerId end", "NewDcNewDAO.GetDATEntityTypesByServerId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "NewDcNewDAO.GetDATEntityTypesByServerId", Excep);
        }
        finally {
        }
    }

    this.GetAttributeGroupTypeByServerId = function (ServerId) {

        try {
            OneViewConsole.Debug("GetAttributeGroupTypeByServerId start", "NewDcNewDAO.GetAttributeGroupTypeByServerId");

            var Query = "SELECT DISTINCT ServerId As Id, Name FROM AttributeGroupType WHERE ServerId = " + ServerId;
            //alert('Query : ' + Query);

            var Result = window.OneViewSqlite.excecuteSqlReader(Query);
            Result = JSON.parse(Result);

            //alert('AttributeGroupType Result : ' + JSON.stringify(Result));

            OneViewConsole.Debug("GetAttributeGroupTypeByServerId end", "NewDcNewDAO.GetAttributeGroupTypeByServerId");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "NewDcNewDAO.GetAttributeGroupTypeByServerId", Excep);
        }
        finally {
        }
    }

    this.GetDCPlaceByServerId = function (ServerId) {
        try {
            OneViewConsole.Debug("GetDCPlaceByServerId Start", "NewDcNewDAO.GetDCPlaceByServerId");

            var DCPlaceList = [];
            var DcPlaceQuery = "SELECT DISTINCT ServerId As Id,ChildDbElementName As Name, Left,Right FROM OrganizationAssetsNode WHERE ServerId = " + ServerId;
            
            //alert('DcPlaceQuery : ' + DcPlaceQuery);

            DCPlaceList = window.OneViewSqlite.excecuteSqlReader(DcPlaceQuery);
            DCPlaceList = JSON.parse(DCPlaceList);

            OneViewConsole.Debug("GetDCPlaceByServerId End", "NewDcNewDAO.GetDCPlaceByServerId");

            return DCPlaceList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "NewDcNewDAO.GetDCPlaceByServerId", Excep);
        }
    }

    this.GetDCPlaceByLeftRightAndTypeId = function (LeftRightList, TypeId) {
        try {
            OneViewConsole.Debug("GetDCPlaceByLeftRightAndTypeId Start", "NewDcNewDAO.GetDCPlaceByLeftRightAndTypeId");

            var DCPlaceList = [];
            var DCPlaceQuery = "SELECT ServerId AS Id, ChildDbElementName AS Name FROM OrganizationAssetsNode WHERE ChildDbElementType = " + TypeId ;

            if (LeftRightList.length > 0) {
                DCPlaceQuery += " AND (Left >= " + LeftRightList[0].Left + " And Right <= " + LeftRightList[0].Right + ")";
            }            

            //alert('DCPlaceQuery : ' + DCPlaceQuery);

            DCPlaceList = window.OneViewSqlite.excecuteSqlReader(DCPlaceQuery);
            DCPlaceList = JSON.parse(DCPlaceList);

            //alert('GetDCPlaceByLeftRightAndTypeId DCPlaceList : ' + JSON.stringify(DCPlaceList));

            OneViewConsole.Debug("GetDCPlaceByLeftRightAndTypeId End", "NewDcNewDAO.GetDCPlaceByLeftRightAndTypeId");

            return DCPlaceList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "NewDcNewDAO.GetDCPlaceByLeftRightAndTypeId", Excep);
        }
    }

    this.GetDCTemplateLeftRightByServerIds = function (IdList) {
        try {
            OneViewConsole.Debug("GetDCTemplateLeftRightByServerIds Start", "NewDcNewDAO.GetDCTemplateLeftRightByServerIds");

            var Incondition = "(";

            for (var i = 0; i < IdList.length; i++) {
                Incondition += IdList[i];
                Incondition += (i <= IdList.length - 2) ? "," : ")";
            }

            var DCTemplateList = [];

            var DCTemplateQuery = "SELECT ServerId AS Id,ChildDbElementName AS Name , Left, Right from TemplateNode Where ServerId IN " + Incondition;

            //alert('DCTemplateLeftRightQuery : ' + DCTemplateQuery);

            DCTemplateList = window.OneViewSqlite.excecuteSqlReader(DCTemplateQuery);
            DCTemplateList = JSON.parse(DCTemplateList);


            OneViewConsole.Debug("GetDCTemplateLeftRightByServerIds End", "NewDcNewDAO.GetDCTemplateLeftRightByServerIds");

            return DCTemplateList;
        }
        catch (Excep) {
            //alert('Excep : ' + Excep + ", " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("DAO", "NewDcNewDAO.GetDCTemplateLeftRightByServerIds", Excep);
        }
    }


}

function NewDcPresenter() {

    var MyInstance = this;

    this.LoadHtml = function (HTML, DivId) {

        try {
            OneViewConsole.Debug("LoadHtml start", "NewDcPresenter.LoadHtml");
            
            document.getElementById(DivId).innerHTML = HTML;

            OneViewConsole.Debug("LoadHtml end", "NewDcPresenter.LoadHtml");
        }
        catch (Excep) {
            //alert('NewDcPresenter.LoadHtml Excep :' + Excep + 'Excep :' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Presenter", "NewDcPresenter.LoadHtml", Excep);
        }
    }

    this.LoadDcPage = function ($location, xlatService) {

        try {
            OneViewConsole.Debug("LoadDcPage start", "NewDcPresenter.LoadDcPage");

            var NewDCAccessValidationHandlerResponse = MyInstance.NewDCAccessValidationHandler();     
            
            if (NewDCAccessValidationHandlerResponse.IsSuccess) {
                MyInstance.SetDcVariables();
                //alert('OneViewSessionStorage.Get("DcPlaceId") : ' + OneViewSessionStorage.Get("DcPlaceId") + ',  OneViewSessionStorage.Get("TemplateId") : ' + OneViewSessionStorage.Get("TemplateId"));
                $location.url('/' + OneViewSessionStorage.Get("TemplateId"));
            }
            else {

                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                oOneViewCordovaPlugin.DefaultConfirmBox("Confirmation", xlatService.xlat("IN-NF-MSE-017 :: Do you want to resolve actions now?"), function (ConfirmationId) {
                    if (ConfirmationId == "2") {

                        $location.url("nav/my-actions");
                        $scope.$apply();

                    }
                    else {

                        MyInstance.SetDcVariables();                       
                        $location.url('/' + OneViewSessionStorage.Get("TemplateId"));
                        $scope.$apply();

                    }
                });

            }

            OneViewConsole.Debug("LoadDcPage end", "NewDcPresenter.LoadDcPage");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Presenter", "NewDcPresenter.LoadDcPage", Excep);
        }
    }

    this.SetDcVariables = function () {
        try {
            OneViewConsole.Debug("SetDcVariables Start", "NewDcPresenter.SetDcVariables");

            OneViewSessionStorage.Save("DcPlaceDimension", DATEntityType.OrganizationAssestsNode);
            OneViewSessionStorage.Remove("DefaultValueMetaData");
            OneViewSessionStorage.Remove("DcId");
            OneViewSessionStorage.Remove("NCMetaData");
            OneViewSessionStorage.Remove("MyAuditForm");
            OneViewSessionStorage.Remove("MyAuditEditForm");
            OneViewSessionStorage.Remove("NCInlineEdit");

            SetDcPlaceInfo(OneViewSessionStorage.Get("DcPlaceId"));

            SetDcProfileInfo();

            OneViewConsole.Debug("SetDcVariables End", "NewDcPresenter.SetDcVariables");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Presenter", "NewDcPresenter.SetDcVariables", Excep);
        }
    }

    this.NewDCAccessValidationHandler = function () {
        try {
            OneViewConsole.Debug("NewDCAccessValidationHandler start", "DasboardBO.NewDCAccessValidationHandler");

            var Response = { IsSuccess: true, RedirectURL: "" }
            var _TemplateIdLst = [];

            var _ValidateActionFollowUpBeforeNewDCHandler = new ValidateActionFollowUpBeforeNewDCHandler();       
              

            _TemplateIdLst.push(OneViewSessionStorage.Get("TemplateId"));
            var ReqObjForValidateActionFollowUpBeforeNewDC = { TemplateIdLst: _TemplateIdLst };


            if (_ValidateActionFollowUpBeforeNewDCHandler.IsNeedToValidateActionFollowUpBeforeNewDC(ReqObjForValidateActionFollowUpBeforeNewDC)) {

                var _MyActionBO = new MyActionBO($scope, $compile, $location, xlatService);

                var ReqObj = { DCPlaceKeyId: OneViewSessionStorage.Get("DcPlaceId"), TemplateKeyId: OneViewSessionStorage.Get("TemplateId") };
                var IsActionResolved = _MyActionBO.IsAllActionResolved(ReqObj);
                if (IsActionResolved == false) {
                    Response.IsSuccess = false;
                }

            }
    


            OneViewConsole.Debug("NewDCAccessValidationHandler end", "DasboardBO.NewDCAccessValidationHandler");

            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DasboardBO.TemplateAccessValidationHandler", Excep);
        }
    }

    var SetDcPlaceInfo = function (DcPlaceId) {
        try {
            OneViewConsole.Debug("SetDcPlaceInfo Start", "NewDcPresenter.SetDcPlaceInfo");

            var _oOrganizationAssetsNodeDAO = new DefaultMasterDAO("OrganizationAssetsNode");
            var AssetsNode = _oOrganizationAssetsNodeDAO.GetByServerId(DcPlaceId);

            if (AssetsNode.length > 0) {
                var _oRcoMasterDAO = new DefaultMasterDAO("RcoMasterEntity");
                var Rco = _oRcoMasterDAO.GetByServerId(AssetsNode[0].ChildDbElementId);
                if (Rco.length > 0) {
                    OneViewSessionStorage.Save("DcPlaceNodeId", AssetsNode[0].ServerId);
                    OneViewSessionStorage.Save("DcPlaceMasterId", Rco[0].ServerId);
                    OneViewSessionStorage.Save("DcPlaceCode", Rco[0].Code);
                    OneViewSessionStorage.Save("DcPlaceType", Rco[0].Type);
                    OneViewSessionStorage.Save("DcPlaceDescription", Rco[0].Description);
                    OneViewSessionStorage.Save("DcPlaceColumn1", Rco[0].Column1);
                    OneViewSessionStorage.Save("DcPlaceColumn2", Rco[0].Column2);
                    OneViewSessionStorage.Save("DcPlaceColumn3", Rco[0].Column3);
                    OneViewSessionStorage.Save("DcPlaceColumn4", Rco[0].Column4);
                    OneViewSessionStorage.Save("DcPlaceColumn5", Rco[0].Column5);
                    OneViewSessionStorage.Save("DcPlaceColumn6", Rco[0].Column6);
                    OneViewSessionStorage.Save("DcPlaceColumn7", Rco[0].Column7);
                    OneViewSessionStorage.Save("DcPlaceColumn8", Rco[0].Column8);
                    OneViewSessionStorage.Save("DcPlaceColumn9", Rco[0].Column9);
                    OneViewSessionStorage.Save("DcPlaceColumn10", Rco[0].Column10);
                    OneViewSessionStorage.Save("DcPlaceIntColumn1", Rco[0].IntColumn1);
                    OneViewSessionStorage.Save("DcPlaceIntColumn2", Rco[0].IntColumn2);
                    OneViewSessionStorage.Save("DcPlaceIntColumn3", Rco[0].IntColumn3);
                    OneViewSessionStorage.Save("DcPlaceIntColumn4", Rco[0].IntColumn4);
                    OneViewSessionStorage.Save("DcPlaceIntColumn5", Rco[0].IntColumn5);
                    OneViewSessionStorage.Save("DcPlaceDateTimeColumn1", Rco[0].DateTimeColumn1);
                    OneViewSessionStorage.Save("DcPlaceDateTimeColumn2", Rco[0].DateTimeColumn2);
                    OneViewSessionStorage.Save("DcPlaceDateTimeColumn3", Rco[0].DateTimeColumn3);
                    OneViewSessionStorage.Save("DcPlaceDateTimeColumn4", Rco[0].DateTimeColumn4);
                    OneViewSessionStorage.Save("DcPlaceDateTimeColumn5", Rco[0].DateTimeColumn5);
                }
            }

            OneViewConsole.Debug("SetDcPlaceInfo End", "NewDcPresenter.SetDcPlaceInfo");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Presenter", "NewDcPresenter.SetDcPlaceInfo", Excep);
        }
    }

    /// <summary>
    /// Check for the current valid profile and save the profile id and occurence in session 
    /// </summary>
    var SetDcProfileInfo = function () {
        try {
            OneViewConsole.Debug("CheckCurrentValidProfile Start", "NewDcPresenter.CheckCurrentValidProfile");

            var oDcScheduleCheckingComponent = new DcScheduleCheckingComponent();

           // var CurrentShift = new LVShiftHandler().GetCurrentShift();
           
            //alert(OneViewSessionStorage.Get("TemplateId") + " , DcPlaceId" + OneViewSessionStorage.Get("DcPlaceId"));
           // var CurrentDcProfile = oDcScheduleCheckingComponent.GetDcProfile(OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("LoginUserId"), -1, CurrentShift.Id, OneViewSessionStorage.Get("TemplateId"), OneViewSessionStorage.Get("DcPlaceId"));
            var CurrentDcProfile = oDcScheduleCheckingComponent.GetDcProfile(OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("LoginUserId"), -1, undefined, OneViewSessionStorage.Get("TemplateId"), OneViewSessionStorage.Get("DcPlaceId"));

            OneViewSessionStorage.Remove("DcProfileId");
            OneViewSessionStorage.Save("DcProfileId", CurrentDcProfile[0].DcProfileServerId);

            OneViewSessionStorage.Remove("DcOccurence");
            OneViewSessionStorage.Save("DcOccurence", CurrentDcProfile[0].Occurence);


            OneViewConsole.Debug("CheckCurrentValidProfile End", "NewDcPresenter.CheckCurrentValidProfile");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Presenter", "NewDcPresenter.SetDcProfileInfo", Excep);
        }
    }

}

/// <summary>
/// To check Profiles are valid or not
/// </summary>
function DcScheduleCheckingComponent() {

    var MyInstance = this;
    var oDcProfileList = [];
    var UserId = OneViewSessionStorage.Get("LoginUserId");
    var ServiceId = OneViewSessionStorage.Get("ServiceId");

    this.GetDcProfileByOccurence = function (DcPlaceDimension, TemplateNodeId, DcPlaceId, QueryStringDict) {
        try {
            OneViewConsole.Debug("GetDcProfileByOccurence START", "NewDcFacade.GetDcProfileByOccurence");

            oDcProfileList = MyInstance.GetDcProfile(ServiceId, UserId, DcPlaceDimension, undefined, TemplateNodeId, DcPlaceId);
           


            if (QueryStringDict.PageRedirectValue == 1) { //View-Dc                
                oDcProfileList = MyInstance.GetDcProfileForViewDC(oDcProfileList, QueryStringDict);

            }
            else {   //New-Dc
                oDcProfileList = MyInstance.GetDcProfileForNewDC(oDcProfileList, ServiceId, UserId, DcPlaceDimension, TemplateNodeId, DcPlaceId);
            }
           
            OneViewConsole.Debug("GetDcProfileByOccurence End", "NewDcFacade.GetDcProfileByOccurence");

            return oDcProfileList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DcScheduleCheckingComponent", "DcScheduleCheckingComponent.GetDcProfileByOccurence", Excep);
        }
    }

    this.GetDcProfileForNewDC = function (oDcProfileList, ServiceId, UserId, DcPlaceDimension, TemplateNodeId, DcPlaceId) {
        try {
            OneViewConsole.Debug("GetDcProfileForNewDC START", "NewDcFacade.GetDcProfileForNewDC");

            var oDateTime = new DateTime();
            var DCDateTime = oDateTime.GetDateAndTime();

            var Req = {
                "ServiceId": ServiceId,
                "UserId": UserId,
                "TemplateNodeId": TemplateNodeId,
                "PlaceId": DcPlaceId,
                "DcPlaceDimension": DcPlaceDimension,
                "DCPlaceRCOType": 0,
                "StartDate": DCDateTime,
                "EndDate": DCDateTime,
                "IsCompleted": "-1",
                "IsSynchronized": "-1",
                "IsSubmit": "-1",
                "DCPlaceKeyElementIsGroup": false,
                "TemplateKeyElementIsGroup": false,
                "AttributeGroupType": 0,
                "DcProfileServerId": 0
            };

            //Get all periods based on current date-time
            var _oDcProfileDAO = new DcProfileDAO();
            var PeriodEntityLst = _oDcProfileDAO.GetAllCurrentPeriod(Req);


            for (var i = 0 ; i < oDcProfileList.length ; i++) {
                var IsProfileValid = false;
                var CurrentDcProfile = oDcProfileList[i];               
                var DcStartDate;
                var DcEndDate;
                if (CurrentDcProfile.ReccurenceId > 0 && PeriodEntityLst.length > 0) {
                    for (var p = 0; p < PeriodEntityLst.length; p++) {
                        if (PeriodEntityLst[p].PeriodTypeServerId == CurrentDcProfile.ReccurenceId) {
                            IsProfileValid = true;                           
                            DcStartDate = PeriodEntityLst[p].StartDate;
                            DcEndDate = PeriodEntityLst[p].EndDate;
                            break;
                        }
                    }
                }
                else {
                    IsProfileValid = true;
                    DcStartDate = CurrentDcProfile.StartDate;
                    DcEndDate = CurrentDcProfile.EndDate;
                }


                if (IsProfileValid == true) {
                    IsProfileValid = false;
                    //Get valid profiles based on ocurrence from DcProfileSyncStatus

                    Req = {
                        "ServiceId": CurrentDcProfile.ServiceId,
                        "UserId": CurrentDcProfile.DcUserId,
                        "TemplateNodeId": CurrentDcProfile.TemplateNodeId,
                        "PlaceId": CurrentDcProfile.DcPlaceId,
                        "DcPlaceDimension": CurrentDcProfile.DcPlaceDimension,
                        "DCPlaceRCOType": 0,
                        "StartDate": DCDateTime,
                        "EndDate": DCDateTime,
                        "IsCompleted": "-1",
                        "IsSynchronized": "-1",
                        "IsSubmit": "-1",
                        "DCPlaceKeyElementIsGroup": false,
                        "TemplateKeyElementIsGroup": false,
                        "AttributeGroupType": 0,
                        "DcProfileServerId": CurrentDcProfile.DcProfileServerId
                    };

                    var DcProfileSyncStatusDetails = _oDcProfileDAO.GetDcProfileSyncStatus(Req);
                    var InprogressServerIds = "";
                    var CompletedServerIds = "";
                    var InprogressCount = 0;
                    var CompletedCount = 0;


                    if (DcProfileSyncStatusDetails.length > 0) {
                        InprogressCount = DcProfileSyncStatusDetails[0].InprogressCount;
                        CompletedCount = DcProfileSyncStatusDetails[0].CompletedCount;

                        InprogressServerIds = DcProfileSyncStatusDetails[0].InprogressServerIds;
                        CompletedServerIds = DcProfileSyncStatusDetails[0].CompletedServerIds;
                        InprogressServerIds = ((InprogressServerIds != undefined && InprogressServerIds != "") ? InprogressServerIds.substring(1, InprogressServerIds.length) : "");
                        CompletedServerIds = ((CompletedServerIds != undefined && CompletedServerIds != "") ? CompletedServerIds.substring(1, CompletedServerIds.length) : "");

                    }


                    var LocalDcInfoList = MyInstance.GetDcDetailsByDcProfileAndSyncStatus(CurrentDcProfile.DcPlaceId, CurrentDcProfile.TemplateNodeId, undefined, CurrentDcProfile.CustomPlaceName,
                        DcStartDate, DcEndDate, "", "", InprogressServerIds, CompletedServerIds);
                   

                    var StartedProfilesCount = LocalDcInfoList.length + InprogressCount + CompletedCount;

                    if (CurrentDcProfile.Occurence == -1 || StartedProfilesCount < CurrentDcProfile.Occurence) {
                        IsProfileValid = true;
                    }

                }


                if (IsProfileValid != true) {
                    //remove profile
                    oDcProfileList.splice(i, 1);
                    i--;
                }

            }


            OneViewConsole.Debug("GetDcProfileForNewDC End", "NewDcFacade.GetDcProfileForNewDC");

            return oDcProfileList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DcScheduleCheckingComponent", "DcScheduleCheckingComponent.GetDcProfileForNewDC", Excep);
        }
    }

    this.GetDcProfileForViewDC = function (oDcProfileList, QueryStringDict) {
        try {
            OneViewConsole.Debug("GetDcProfileForViewDC START", "NewDcFacade.GetDcProfileForViewDC");

            for (var i = 0 ; i < oDcProfileList.length ; i++) {
                var IsProfileValid = false;
                var CurrentDcProfile = oDcProfileList[i];
                //Check from local db
                var DcInfoList = MyInstance.GetDcByDcProfile(CurrentDcProfile.DcPlaceId, CurrentDcProfile.TemplateNodeId, undefined, CurrentDcProfile.CustomPlaceName,
                                CurrentDcProfile.StartDate, CurrentDcProfile.EndDate, CurrentDcProfile.FromTime, CurrentDcProfile.ToTime);

                //alert(' DcInfoList.length : ' + DcInfoList.length + 'QueryStringDict : ' + JSON.stringify(QueryStringDict));

                if (QueryStringDict.ShowInProgressDCProfiles == 1) {
                    for (var j = 0; j < DcInfoList.length; j++) {
                        if (DcInfoList[j].IsCompleted == 'false') {
                            IsProfileValid = true;
                            break;
                        }
                    }
                }
                    //Completed
                else if (QueryStringDict.ShowCompletedDCProfiles == 1) {
                    for (var j = 0; j < DcInfoList.length; j++) {
                        if (DcInfoList[j].IsCompleted == 'true' && DcInfoList[j].IsSubmit != 'true') {
                            IsProfileValid = true;
                            break;
                        }
                    }
                }
                    //In-progress or Completed 
                else if (QueryStringDict.ShowInProgressOrCompletedDCProfiles == 1) {

                    for (var j = 0; j < DcInfoList.length; j++) {
                        if (DcInfoList[j].IsSubmit != 'true') {
                            IsProfileValid = true;
                            break;
                        }
                    }
                }
                else {
                    alert("NewDcFacade.GetDcProfileForViewDC : Query string not implemented");
                }

                if (IsProfileValid != true) {
                    //remove profile
                    oDcProfileList.splice(i, 1);
                    i--;
                }
            }

            OneViewConsole.Debug("GetDcProfileForViewDC End", "NewDcFacade.GetDcProfileForViewDC");

            return oDcProfileList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DcScheduleCheckingComponent", "DcScheduleCheckingComponent.GetDcProfileForViewDC", Excep);
        }
    }


    this.CheckIsAnyValidProfileExists = function (DcPlaceDimension, TemplateNodeId, DcPlaceId) {
        try {
            OneViewConsole.Debug("GetDcProfileByOccurence START", "NewDcFacade.GetDcProfileByOccurence");

            var IsProfileExists = false;
            //var CurrentShift = new LVShiftHandler().GetCurrentShift();

            //oDcProfileList = MyInstance.GetDcProfile(ServiceId, UserId, DcPlaceDimension, CurrentShift.Id, TemplateNodeId, DcPlaceId);
            oDcProfileList = MyInstance.GetDcProfile(ServiceId, UserId, DcPlaceDimension, undefined, TemplateNodeId, DcPlaceId);

            var oCopyDcProfileList = clone(oDcProfileList);

            for (var i = 0; i < oCopyDcProfileList.length ; i++) {
                var CurrentDcProfile = oCopyDcProfileList[i];
                var count = MyInstance.GetDcCountByDcProfile(CurrentDcProfile.DcPlaceId, CurrentDcProfile.TemplateNodeId, undefined, CurrentDcProfile.CustomPlaceName,
                CurrentDcProfile.StartDate, CurrentDcProfile.EndDate, CurrentDcProfile.FromTime, CurrentDcProfile.ToTime);
                //alert('count ' + count);
                if (CurrentDcProfile.Occurence != -1 && CurrentDcProfile.Occurence <= count) {
                }
                else {
                    IsProfileExists = true;
                    break;
                }
            }

            OneViewConsole.Debug("GetDcProfileByOccurence End", "NewDcFacade.GetDcProfileByOccurence");

            return IsProfileExists;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DcScheduleCheckingComponent", "DcScheduleCheckingComponent.GetDcProfileByOccurence", Excep);
        }

    }


    this.GetDcProfile = function (ServiceId, UserId, DcPlaceDimension, Shift, TemplateNodeId, DcPlaceId) {
        try {
            OneViewConsole.Debug("GetDcProfile START", "NewDcFacade.GetDcProfile");

            var oDateTime = new DateTime();
            var DCDateTime = oDateTime.GetDateAndTime(); // CurrentDateTime : (dd-mm-yyyy hh:mm:ss)
            var CurrentTime = oDateTime.GetTime();// CurrentTime : (hh:mm:ss)

            DCDateTime = oDateTime.ConvertDateTimeToInteger(DCDateTime);
            CurrentTime = oDateTime.ConvertTimeToInteger(CurrentTime);

            var query = MyInstance.GetDCProfile_Query(ServiceId, UserId, DcPlaceDimension, DCDateTime, CurrentTime, Shift, TemplateNodeId, DcPlaceId);
            var result = window.OneViewSqlite.excecuteSqlReader(query);

            var DcProfileResult = JSON.parse(result);

            //TemplateNodeId,DcPlaceId,ServerId,ReccurenceId,Occurence,DcProfileId ,(and some other columns too)
            //alert('DcProfileResult : ' + JSON.stringify(DcProfileResult));

            OneViewConsole.Debug("GetDcProfile End", "NewDcFacade.GetDcProfile");

            return DcProfileResult;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DcScheduleCheckingComponent", "DcScheduleCheckingComponent.GetDcProfile", Excep);
        }
    }

    this.GetDCProfile_Query = function (ServiceId, UserId, DcPlaceDimension, DCDateTime, CurrentTime, Shift, TemplateNodeId, DcPlaceId) {
        try {
            OneViewConsole.Debug("GetDCProfile_Query Start", "DcScheduleCheckingComponent.GetDCProfile_Query");

            var _oDcDAO = new DcDAO();

            //Place Group profile
            var DcPlaceExp;
            if (GlobalNewDcQueryStringDict != undefined && Object.keys(GlobalNewDcQueryStringDict).length > 0 && GlobalNewDcQueryStringDict.DcPlaceGroup_Type != 0) {
                var InCondition = _oDcDAO.GetDcPlaceExpByPlaceGroup({ 'IsDCPlaceGroup': true, 'DcPlaceId': GlobalNewDcQueryStringDict.DcPlaceNodeId, 'DCPlaceRCOType': GlobalNewDcQueryStringDict.DCPlaceRCOType });
                DcPlaceExp = " AND DcProfileEntity.DcPlaceId IN " + InCondition;
            }
            else {
                DcPlaceExp = " AND (-1=" + DcPlaceId + " or  DcProfileEntity.DcPlaceId=" + DcPlaceId + ")";
            }

            var DcTemplateExp = "";
            //Template Group profile
            if (GlobalNewDcQueryStringDict != undefined && Object.keys(GlobalNewDcQueryStringDict).length > 0 && GlobalNewDcQueryStringDict.AttributeGroupType != 0) {
                var DcTemplateInCondition = _oDcDAO.GetDcTemplateExpByTemplateGroup({ 'IsTemplateGroup': true, 'TemplateNodeId': GlobalNewDcQueryStringDict.TemplateNodeId, 'AttributeGroupType': GlobalNewDcQueryStringDict.AttributeGroupType });
                DcTemplateExp = " AND DcProfileEntity.TemplateNodeId IN " + DcTemplateInCondition;
            }
            else {
                DcTemplateExp = "AND (-1=" + TemplateNodeId + " or  DcProfileEntity.TemplateNodeId=" + TemplateNodeId + ") ";
            }

            var query = "SELECT  DcProfileEntity.*, DcProfileEntity.ServerId AS DcProfileServerId ," +
                            "(SUBSTR(DefaultScheduleEntity.StartDate, 7, 4) || SUBSTR(DefaultScheduleEntity.StartDate, 4, 2) || SUBSTR(DefaultScheduleEntity.StartDate, 1, 2) || SUBSTR(DefaultScheduleEntity.StartDate, 12, 2) || " +
                           " SUBSTR(DefaultScheduleEntity.StartDate, 15, 2) || SUBSTR(DefaultScheduleEntity.StartDate, 18, 2) ) AS SD ,(SUBSTR(DefaultScheduleEntity.EndDate, 7, 4) ||SUBSTR(DefaultScheduleEntity.EndDate, 4, 2) ||" +
                           "SUBSTR(DefaultScheduleEntity.EndDate, 1, 2) || SUBSTR(DefaultScheduleEntity.EndDate, 12, 2) || SUBSTR(DefaultScheduleEntity.EndDate, 15, 2) || SUBSTR(DefaultScheduleEntity.EndDate, 18, 2) ) AS ED," +
                           "(SUBSTR(DefaultScheduleEntity.FromTime, 1, 2) || SUBSTR(DefaultScheduleEntity.FromTime, 4, 2) || SUBSTR(DefaultScheduleEntity.FromTime, 7, 2) ) AS FT, ( SUBSTR(DefaultScheduleEntity.ToTime, 1, 2) || " +
                          " SUBSTR(DefaultScheduleEntity.ToTime, 4, 2) || SUBSTR(DefaultScheduleEntity.ToTime, 7, 2) ) AS TT , DefaultScheduleEntity.* FROM DcProfileEntity " +
                           "INNER JOIN  DefaultScheduleEntity on DcProfileEntity.Id=DefaultScheduleEntity.DcProfileId  WHERE DcUserId=" + UserId + " and " +
                           "DcProfileEntity.ServiceId=" + ServiceId + " and (-1=" + DcPlaceDimension + " or  DcProfileEntity.DcPlaceDimension = " + DcPlaceDimension + ")" +
                            DcTemplateExp +
                            DcPlaceExp +
                            " and SD <=  '" + DCDateTime + "' and ( '" + DCDateTime + "'  <  ED or  '' = ED )";


            //Todo : Coommented coz time not working when we r checking for two different days
            //and ((ShiftId ='0' and (FT <= '" + CurrentTime + "' and  '" + CurrentTime + "'  < TT )) or ShiftId= " + Shift + " )";

            //alert('GetDCProfile_Query : ' + query);
            OneViewConsole.Debug("GetDCProfile_Query End", "DcScheduleCheckingComponent.GetDCProfile_Query");
            return query;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcScheduleCheckingComponent.GetDCProfile_Query", Excep);
        }
    }

    this.UpdateDcProfileByOccurenceOLD = function (DcPlaceId, TemplateNodeId, CurrentShift, DcPlaceName) {
        try {
            OneViewConsole.Debug("UpdateDcProfileByOccurence Start", "DcScheduleCheckingComponent.UpdateDcProfileByOccurence");

            //Get Profile for particular config
            var CurrentUserDcProfiles = MyInstance.GetDcProfile(ServiceId, UserId, -1, CurrentShift, TemplateNodeId, DcPlaceId);

            // alert('CurrentUserDcProfiles : ' + JSON.stringify(CurrentUserDcProfiles));

            for (var j = 0; j < CurrentUserDcProfiles.length ; j++) {
                ////oDcProfileList contains : TemplateNodeId,DcPlaceId,ServerId,ReccurenceId,Occurence,DcProfileId ,(and some other columns too)
                var count = MyInstance.GetDcCountByDcProfile(DcPlaceId, TemplateNodeId, CurrentShift, DcPlaceName, CurrentUserDcProfiles[j].SD, CurrentUserDcProfiles[j].ED, CurrentUserDcProfiles[j].FT, CurrentUserDcProfiles[j].TT);
                if (CurrentUserDcProfiles[j].Occurence != -1 && CurrentUserDcProfiles[j].Occurence <= count) {
                    for (var i = 0; i < oDcProfileList.length; i++) {
                        //alert(" oDcProfileList[i] : " + JSON.stringify(oDcProfileList[i]) + 'CurrentUserDcProfiles[j] : ' + JSON.stringify(CurrentUserDcProfiles[j]));
                        if (oDcProfileList[i].Id == CurrentUserDcProfiles[j].Id) {
                            oDcProfileList.splice(i, 1);

                        }
                    }
                }
            }

            // alert('updated profiles :' + JSON.stringify(oDcProfileList));
            OneViewConsole.Debug("UpdateDcProfileByOccurence End", "DcScheduleCheckingComponent.UpdateDcProfileByOccurence");


        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcScheduleCheckingComponent.UpdateDcProfileByOccurence", Excep);
        }
    }

    //To do :  need to clone the list oDcProfileList and use it in for loop. coz iterating the same list and splice from same list will give prob
    this.UpdateDcProfileByOccurence = function (CurrentDcProfile, CurrentShift, QueryStringDict) {
        try {
            OneViewConsole.Debug("UpdateDcProfileByOccurence Start", "DcScheduleCheckingComponent.UpdateDcProfileByOccurence");

            //alert(JSON.stringify(QueryStringDict));
            
            if (QueryStringDict.ShowNotStartedDCProfiles == 1) {
                //alert('CurrentDcProfile :' + JSON.stringify(CurrentDcProfile));
                ////oDcProfileList contains : TemplateNodeId,DcPlaceId,ServerId,ReccurenceId,Occurence,DcProfileId ,(and some other columns too)
                var count = MyInstance.GetDcCountByDcProfile(CurrentDcProfile.DcPlaceId, CurrentDcProfile.TemplateNodeId, CurrentShift, CurrentDcProfile.CustomPlaceName,
                    CurrentDcProfile.StartDate, CurrentDcProfile.EndDate, CurrentDcProfile.FromTime, CurrentDcProfile.ToTime);
                //alert('count ' + count);
                if (CurrentDcProfile.Occurence != -1 && CurrentDcProfile.Occurence <= count) {
                    MyInstance.RemoveDcProfile(oDcProfileList, CurrentDcProfile);
                }
            }
            else if (QueryStringDict.ShowInProgressDCProfiles == 1) {

                var DcInfoList = MyInstance.GetDcByDcProfile(CurrentDcProfile.DcPlaceId, CurrentDcProfile.TemplateNodeId, CurrentShift, CurrentDcProfile.CustomPlaceName,
                    CurrentDcProfile.StartDate, CurrentDcProfile.EndDate, CurrentDcProfile.FromTime, CurrentDcProfile.ToTime);
                var isAnyInProgressdDC = false;
               
                for (var i = 0; i < DcInfoList.length; i++) {
                    if (DcInfoList[i].IsCompleted == 'false') {
                        isAnyInProgressdDC = true;
                        break;
                    }
                }
               
                if (isAnyInProgressdDC == false) {
                    MyInstance.RemoveDcProfile(oDcProfileList, CurrentDcProfile);
                }
            }
            else if (QueryStringDict.ShowCompletedDCProfiles == 1) {

                var DcInfoList = MyInstance.GetDcByDcProfile(CurrentDcProfile.DcPlaceId, CurrentDcProfile.TemplateNodeId, CurrentShift, CurrentDcProfile.CustomPlaceName,
                    CurrentDcProfile.StartDate, CurrentDcProfile.EndDate, CurrentDcProfile.FromTime, CurrentDcProfile.ToTime);
                var IsAnyCompletedNotSubmittedDC = false;

                for (var i = 0; i < DcInfoList.length; i++) {
                    if (DcInfoList[i].IsCompleted == 'true' && DcInfoList[i].IsSubmit != 'true') {
                        IsAnyCompletedNotSubmittedDC = true;
                        break;
                    }
                }
                if (IsAnyCompletedNotSubmittedDC == false) {
                    MyInstance.RemoveDcProfile(oDcProfileList, CurrentDcProfile);
                }                
            }
            else if (QueryStringDict.ShowInProgressOrCompletedDCProfiles == 1) {

                var DcInfoList = MyInstance.GetDcByDcProfile(CurrentDcProfile.DcPlaceId, CurrentDcProfile.TemplateNodeId, CurrentShift, CurrentDcProfile.CustomPlaceName,
                    CurrentDcProfile.StartDate, CurrentDcProfile.EndDate, CurrentDcProfile.FromTime, CurrentDcProfile.ToTime);

                if (DcInfoList.length == 0) {
                    MyInstance.RemoveDcProfile(oDcProfileList, CurrentDcProfile);
                }

                else if (DcInfoList.length > 0) {
                    var IsAnyNotSubmittedDC = false;

                    for (var i = 0; i < DcInfoList.length; i++) {
                        if (DcInfoList[i].IsSubmit != 'true') {
                            IsAnyNotSubmittedDC = true;
                            break;
                        }
                    }

                    if (IsAnyNotSubmittedDC == false) {
                        MyInstance.RemoveDcProfile(oDcProfileList, CurrentDcProfile);
                    }
                }
            }



            // alert('updated profiles :' + JSON.stringify(oDcProfileList));
            OneViewConsole.Debug("UpdateDcProfileByOccurence End", "DcScheduleCheckingComponent.UpdateDcProfileByOccurence");


        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcScheduleCheckingComponent.UpdateDcProfileByOccurence", Excep);
        }
    }

    this.RemoveDcProfile = function (oDcProfileList, CurrentDcProfile) {
        try {
            OneViewConsole.Debug("GetDcCountByDcProfile Start", "DcScheduleCheckingComponent.GetDcCountByDcProfile");

            for (var i = 0; i < oDcProfileList.length; i++) {
                if (oDcProfileList[i].Id == CurrentDcProfile.Id) {
                    oDcProfileList.splice(i, 1);
                }
            }

            OneViewConsole.Debug("GetDcCountByDcProfile End", "DcScheduleCheckingComponent.GetDcCountByDcProfile");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcScheduleCheckingComponent.GetDcCountByDcProfile", Excep);
        }
    }

    ///TODO:Harshil (29/Mar/2017) need to disucss with Sangeetha and explain the process
    this.GetDcByDcProfile = function (DcPlaceId, TemplateNodeId, CurrentShift, DcPlaceName, SD, ED, FT, TT) {
        try {
            OneViewConsole.Debug("GetDcCountByDcProfile Start", "DcScheduleCheckingComponent.GetDcCountByDcProfile");

            var ParamRequest = {
                'ServiceId': ServiceId, 'SystemUserId': UserId,
                'DcPlaceId': DcPlaceId, 'DcPlaceName': DcPlaceName, 'TemplateNodeId': TemplateNodeId,
                'ShiftId': CurrentShift, 'SD': SD, 'ED': ED, 'FT': FT, 'TT': TT
            }

            //Get DcCount for particular user
            var DcInfoList = new DcDAO().GetDcCountByDcProfileAndSchedule(ParamRequest);
            return DcInfoList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcScheduleCheckingComponent.GetDcCountByDcProfile", Excep);
        }
    }

    this.GetDcDetailsByDcProfileAndSyncStatus = function (DcPlaceId, TemplateNodeId, CurrentShift, DcPlaceName, SD, ED, FT, TT, InprogressServerIds, CompletedServerIds) {
        try {
            OneViewConsole.Debug("GetDcCountByDcProfile Start", "DcScheduleCheckingComponent.GetDcCountByDcProfile");

            var ParamRequest = {
                'ServiceId': ServiceId, 'SystemUserId': UserId,
                'DcPlaceId': DcPlaceId, 'DcPlaceName': DcPlaceName, 'TemplateNodeId': TemplateNodeId,
                'ShiftId': CurrentShift, 'SD': SD, 'ED': ED, 'FT': FT, 'TT': TT, 'InprogressServerIds': InprogressServerIds, 'CompletedServerIds': CompletedServerIds
            }

            //Get DcCount for particular user
            var DcInfoList = new DcDAO().GetDcDetailsByDcProfileScheduleAndSyncStatus(ParamRequest);
            return DcInfoList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcScheduleCheckingComponent.GetDcCountByDcProfile", Excep);
        }
    }

    this.GetDcCountByDcProfile = function (DcPlaceId, TemplateNodeId, CurrentShift, DcPlaceName, SD, ED, FT, TT) {
        try {
            OneViewConsole.Debug("GetDcCountByDcProfile Start", "DcScheduleCheckingComponent.GetDcCountByDcProfile");

            var ParamRequest = {
                'ServiceId': ServiceId, 'SystemUserId': UserId,
                'DcPlaceId': DcPlaceId, 'DcPlaceName': DcPlaceName, 'TemplateNodeId': TemplateNodeId,
                'ShiftId': CurrentShift, 'SD': SD, 'ED': ED, 'FT': FT, 'TT': TT
            }

            //Get DcCount for particular user
            var DcInfoList = new DcDAO().GetDcCountByDcProfileAndSchedule(ParamRequest);

            // alert('DcInfoList : ' + JSON.stringify(DcInfoList));
            //alert('DcInfoList.length : ' + DcInfoList.length);
            OneViewConsole.Debug("GetDcCountByDcProfile End", "DcScheduleCheckingComponent.GetDcCountByDcProfile");

            return DcInfoList.length;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcScheduleCheckingComponent.GetDcCountByDcProfile", Excep);
        }
    }


}


function NewDcDateTimeControl() {

    var MyInstance = this;

    this.GetHtml = function (DisplayName, ControlId, IsDisplayControl) {
        try {
            OneViewConsole.Debug("GetHtml Start", "NewDcDateTimeControl.GetHtml");

            var DivId = "Div_" + ControlId;
            var Html = '<div class="col rounded light-bg" style="display:' + IsDisplayControl + '" id=' + DivId + ' >' +
                          '<div class="field-item with-icon">' +
                                ' <label>' +
                                      '  <span>' + DisplayName + ' </span>' +
                                       '<input type="datetime-local" controlid=' + ControlId + ' id=' + ControlId + '  onChange = "new NewDcDateTimeControl().OnChange(\'' + ControlId + '\')" disabled>' +
                                        '  <i class="icon icon-clock-o"></i> ' +
                                 ' </label>' +
                            '</div>' +
                       '</div>';


            OneViewConsole.Debug("GetHtml End", "NewDcDateTimeControl.GetHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "NewDcDateTimeControl.GetHtml", Excep);
        }
    }
    
    this.OnChange = function (ControlId) {

        try {
            OneViewConsole.Debug("OnChange Start", "NewDcDateTimeControl.OnChange");

            //alert("NewDcDateTimeControl.OnChange : " + ControlId);

           
            OneViewConsole.Debug("OnChange End", "NewDcDateTimeControl.OnChange");

        }
        catch (Excep) {
            //alert('NewDcDateTimeControl Excep :' + Excep + 'Excep :' + JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "NewDcDateTimeControl.OnChange", oxlatService);
        }
    }
    
}


function NewDcCheckboxControl() {

    var MyInstance = this;

    this.GetHtml = function (DisplayName, ControlId, IsDisplayControl) {
        try {
            OneViewConsole.Debug("GetHtml Start", "NewDcCheckboxControl.GetHtml");
            
            var Html = ' <div class="col rounded light-bg" style="display:' + IsDisplayControl + '">' +
                               ' <div class="field-item with-icon" >' +
                                    ' <label class="checkbox">' +
                                       '<input type="checkbox" checked="" controlid=' + ControlId + ' id=' + ControlId + '  onChange ="new NewDcCheckboxControl().OnChange(\'' + ControlId + '\')"> ' + DisplayName + ' </label>' +
                                  '</div>' +
                         '</div>';


            OneViewConsole.Debug("GetHtml End", "NewDcCheckboxControl.GetHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "NewDcCheckboxControl.GetHtml", Excep);
        }
    }

    this.OnChange = function (ControlId) {

        try {
            OneViewConsole.Debug("OnChange Start", "NewDcCheckboxControl.OnChange");

            //alert("NewDcCheckboxControl.OnChange ");
            
            var IsChecked = document.getElementById(ControlId).checked;
           
            var DcStartDate = document.getElementById('DTDcStartDateControlId');
           
            if (IsChecked == true) {
                //var _oDateTime = new DateTime();
                //var date1111 = _oDateTime.GetDate() + "T" + _oDateTime.GetHours() + ":"+  _oDateTime.GetMinutes();
                //alert('date1111 : ' + date1111)
                DcStartDate.value = '2015-01-02T11:42';
             
            }
            else {
                DcStartDate.value = '';
               
            }

            OneViewConsole.Debug("OnChange End", "NewDcCheckboxControl.OnChange");

        }
        catch (Excep) {
            //alert('NewDcDateTimeControl Excep :' + Excep + 'Excep :' + JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "NewDcDateTimeControl.OnChange", oxlatService);
        }
    }

}
///////////////////////////////////////************************* New DC Page Dynamic Generation End *************************///////////////////////////////////////