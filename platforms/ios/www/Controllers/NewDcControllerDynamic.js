
///////////////////////////////////////************************* New DC Page Dynamic Generation START *************************///////////////////////////////////////

var scope;


var DATEntityTypesDict = { '201': 'Unit', '213': 'Flights', '1': 'Service', '231': 'Sampling Point' ,'212' : 'Airline' };
var TemplateDATEntityTypesDict = {};

//Metadata for Client (Global variable)
var NewDCPageMetadata = {
    "ServiceId": 1,
    "IsDcStartDateSelectionEnabled": false,
    "IsDateWiseFilterationEnabled": false,
    "NewDCPageDimension": {

        "1":
            {
                "Position": 1, "NewDCPageDimensionEnum": 1, 'HierarchyDisplayKey': 'Place Hierarchy', "NewDCDimensionHierarchy": [
                    {
                        "DimensionNodeType": 213, "TotalParentLevel": 2, "NewDCDimensionHierarchyDetailDict": { "1": 201, "2": 212 },
                    }

                ]
            },
        "2":
            {
                "Position": 2, "NewDCPageDimensionEnum": 0, 'HierarchyDisplayKey': 'Template Hierarchy', "NewDCDimensionHierarchy": null
            }

    }
}

var PlaceSelectedBandId;
var TemplateSelectedBandId;

/// <param name="$scope">Current scope</param>
/// <param name="$location">Maintains Current Location</param>
/// <param name="xlatService">xlatService for globalization</param>
MyApp.controller('NewDCDynamicCtrl', function ($scope, $location, xlatService, $compile) {

    var oNewDcFacade = new NewDcDynamicFacade($scope, $location, xlatService, $compile);

    oNewDcFacade.Init();
    oNewDcFacade.PageLoad();

    $scope.NewDc = function () {
        oNewDcFacade.NewDc();
    };

})

/// <summary>
/// Facade Layer :NewDcFacade
/// </summary>
function NewDcDynamicFacade($scope, $location, xlatService, $compile) {

    var oMyInstance = this;
   
    var oNewDCPageBO = new NewDCPageBO($scope, $location, xlatService, $compile);

    var oDcScheduleCheckingComponent = new DcScheduleCheckingComponent();

    this.DCProfileDAOKey = "DefaultDCProfileDAO";
    var oNewDCDAOFactory = new NewDCDAOFactory(oMyInstance.DCProfileDAOKey);
    
    /// <summary>
    /// Page initialization
    /// </summary> 
    this.Init = function () {
        try {
            OneViewConsole.Debug("Init start", "NewDcFacade.Init");

            xlatService.setCurrentPage('9');
            OneViewSessionStorage.Save("PageID", "newdc");
            //document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');
            oNewDCPageBO.LoadMetadata();

            //Get all DC Profiles
            GlobalDcProfileList = oDcScheduleCheckingComponent.GetDcProfileByOccurence(-1, -1, -1);

            OneViewConsole.Debug("Init end", "NewDcFacade.Init");
        }
        catch (Excep) {
            //alert("Init : "+Excep);
            //alert(JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "NewDcFacade.Init", xlatService);
        }
    }


    /// <summary>
    /// PageLoad 
    /// </summary>
    this.PageLoad = function () {
        try {
            OneViewConsole.Debug("PageLoad Start", "NewDcFacade.PageLoad");
                       
            oNewDCPageBO.PageLoad();
           
            OneViewConsole.Debug("PageLoad End", "NewDcFacade.PageLoad");

        }
        catch (Excep) {
            //alert("PageLoad : " + Excep);
            //alert(JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "NewDcFacade.PageLoad", xlatService);
        }
    }


    /// <summary>
    /// Destroy the NewDC Page Metadata
    /// After leaving the New DC Page need to destroy the metadata, because if in between any profile download happens then we have to fetch new metadata and replace the old.
    /// </summary> 
    this.Destroy = function () {
        try {
            oNewDCPageBO.Destroy();
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "NewDcFacade.Destroy", xlatService);
        }
    }

    this.NewDc = function () {
        try {
            OneViewConsole.Debug("NewDc Start", "NewDcFacade.NewDc");

            oMyInstance.SetDcVariables();
            oMyInstance.LoadNewAuditDc($location);

            OneViewConsole.Debug("NewDc Start", "NewDcFacade.NewDc");

        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "NewDcFacade.NewDc", xlatService);
        }
    }

    this.SetDcVariables = function () {
        try {
            OneViewConsole.Debug("SetDcVariables Start", "NewDcFacade.SetDcVariables");

            OneViewSessionStorage.Save("DcPlaceDimension", DATEntityType.OrganizationAssestsNode);
            OneViewSessionStorage.Remove("DefaultValueMetaData");
            OneViewSessionStorage.Remove("DcId");
            OneViewSessionStorage.Remove("NCMetaData");
            OneViewSessionStorage.Remove("MyAuditForm");
            OneViewSessionStorage.Remove("MyAuditEditForm");
            OneViewSessionStorage.Remove("NCInlineEdit");
            SetDcPlaceInfo(OneViewSessionStorage.Get("DcPlaceId"));
            SetDcProfileInfo();
            OneViewConsole.Debug("SetDcVariables End", "NewDcFacade.SetDcVariables");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "NewDcFacade.SetDcVariables", xlatService);
        }
    }

    this.LoadNewAuditDc = function ($location) {
        try {
            OneViewConsole.Debug("LoadNewAuditDc Start", "NewDcFacade.LoadNewAuditDc");

            $location.url('/' + OneViewSessionStorage.Get("TemplateId"));

            OneViewConsole.Debug("LoadNewAuditDc End", "NewDcFacade.LoadNewAuditDc");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "NewDcFacade.SetDcVariables", xlatService);
        }
    }

    var SetDcPlaceInfo = function (DcPlaceId) {
        try {
            OneViewConsole.Debug("SetDcPlaceInfo Start", "NewDcFacade.SetDcPlaceInfo");

            var _oOrganizationAssetsNodeDAO = new DefaultMasterDAO("OrganizationAssetsNode");
            var AssetsNode = _oOrganizationAssetsNodeDAO.GetByServerId(DcPlaceId);

            if (AssetsNode.length > 0) {
                var _oRcoMasterDAO = new DefaultMasterDAO("RcoMasterEntity");
                var Rco = _oRcoMasterDAO.GetByServerId(AssetsNode[0].ChildDbElementId);
                if (Rco.length > 0) {
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

            OneViewConsole.Debug("SetDcPlaceInfo End", "NewDcFacade.SetDcPlaceInfo");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "NewDcFacade.SetDcPlaceInfo", Excep);
        }
    }


    /// <summary>
    /// Check for the current valid profile and save the profile id and occurence in session 
    /// </summary>
    var SetDcProfileInfo = function () {
        try {
            OneViewConsole.Debug("CheckCurrentValidProfile Start", "DefaultDCProfileDAO.CheckCurrentValidProfile");

            //alert('TemplateId : '+  OneViewSessionStorage.Get("TemplateId"));
            //alert('DcPlaceId :' + OneViewSessionStorage.Get("DcPlaceId"));

            var oDcScheduleCheckingComponent = new DcScheduleCheckingComponent();

            var CurrentShift = new LVShiftHandler().GetCurrentShift();

            var CurrentDcProfile = oDcScheduleCheckingComponent.GetDcProfile(OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("LoginUserId"), -1, CurrentShift.Id, OneViewSessionStorage.Get("TemplateId"), OneViewSessionStorage.Get("DcPlaceId"));

            OneViewSessionStorage.Remove("DcProfileId");
            OneViewSessionStorage.Save("DcProfileId", CurrentDcProfile[0].DcProfileServerId);

            OneViewSessionStorage.Remove("DcOccurence");
            OneViewSessionStorage.Save("DcOccurence", CurrentDcProfile[0].Occurence);


            OneViewConsole.Debug("CheckCurrentValidProfile End", "DefaultDCProfileDAO.CheckCurrentValidProfile");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.CheckCurrentValidProfile", Excep);
        }
    }
}


// NewDCPageBO
function NewDCPageBO($scope, $location, xlatService,$compile) {

    var MyInstance = this;

    //Description : Get the ServiceId and UserId from session stroage.
    var ServiceId = OneViewSessionStorage.Get("ServiceId");
    var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

    //For Later use
    this.NewDCPageComponentKey = "DefaultNewDCPageComponent";
    
   
    /// <summary>
    /// LoadMetadata for NewDCPageBO
    /// LoadMetadata/Get the NewDC Page Metadata and save it in a variable
    /// Get metadata based on service and user
    /// </summary>    
    this.LoadMetadata = function () {
        try {
            OneViewConsole.Debug("LoadMetadata start", "NewDCPageBO.LoadMetadata");

            OneViewConsole.Debug("LoadMetadata end", "NewDCPageBO.LoadMetadata");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "NewDCPageBO.LoadMetadata", Excep);
        }
    }


    /// <summary>
    /// Page load for NewDCPageBO
    /// </summary>    
    /// <param name="$compile">Angular compilation for making dynamic html</param>   
    this.PageLoad = function () {
        try {
            OneViewConsole.Debug("PageLoad start", "NewDCPageBO.PageLoad");

            if (NewDCPageMetadata != null && NewDCPageMetadata != undefined && NewDCPageMetadata != "") {
                var _oNewDCPageFactory = new NewDCPageFactory();
                var _oNewDCPageComponent = _oNewDCPageFactory.GetNewDCPageComponent(this.NewDCPageComponentKey);
                _oNewDCPageComponent.Load($scope, $location, xlatService, $compile,ServiceId, LoginUserId);
            }

            OneViewConsole.Debug("PageLoad end", "NewDCPageBO.PageLoad");
        }
        catch (Excep) {
            //alert("NewDCPageBO.PageLoad : " + Excep);
            //alert(JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("BO", "NewDCPageBO.PageLoad", Excep);
        }
    }

    
    /// <summary>
    /// Destroy the NewDC Page Metadata
    /// After leaving the New DC Page need to destroy the metadata, because if in between any profile download happens then we have to fetch new metadata and replace the old.
    /// </summary> 
    this.Destroy = function () {
        try {
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "NewDCPageBO.Destroy", Excep);
        }
    }
}


// NewDCPageFactory
function NewDCPageFactory() {

    /// <summary>
    /// Get NewDCPageComponent
    /// </summary>
    /// <param name="NewDCPageComponentKey">Key</param>
    /// <returns>NewDCPageComponent object</returns>  
    this.GetNewDCPageComponent = function (NewDCPageComponentKey) {

        try {
            switch (NewDCPageComponentKey) {
                case "DefaultNewDCPageComponent": {
                    var _oDefaultNewDCPageComponent = new DefaultNewDCPageComponent();
                    return _oDefaultNewDCPageComponent;
                };
                default: null;
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Factory", "NewDCPageFactory.GetNewDCPageComponent", Excep);
        }
    }
}


// DefaultNewDCPageComponent
function DefaultNewDCPageComponent() {

    var MyInstance = this;

    var oNewDCPageDefaultHtmlDropdownControl = new NewDCPageDefaultHtmlDropdownControl();

    this.DCProfileDAOKey = "DefaultDCProfileDAO";
    var oNewDCDAOFactory = new NewDCDAOFactory(MyInstance.DCProfileDAOKey);

    this.Load = function ($scope, $location, xlatService, $compile, ServiceId, LoginUserId) {

        try {
            // OneViewConsole.Debug("Load start", "DefaultNewDCPageComponent.Load");

            var CompleteHTML = MyInstance.GenerateFullHierachyWithData();


            this.LoadHtml(CompleteHTML, "ContentDiv");

            //Highlight the selected band
            oNewDCPageDefaultHtmlDropdownControl.SetBandColorForSingleSelection(PlaceSelectedBandId + "_1", 'BandType_1');
            oNewDCPageDefaultHtmlDropdownControl.SetBandColorForSingleSelection(TemplateSelectedBandId + "_0", 'BandType_0');
            //  OneViewConsole.Debug("Load end", "DefaultNewDCPageComponent.Load");
        }
        catch (Excep) {
            //alert("DefaultNewDCPageComponent.Load : " + Excep);
            throw oOneViewExceptionHandler.Create("Framework", "DefaultNewDCPageComponent.Load", Excep);
        }
    }

    this.GenerateFullHierachyWithData = function () {
        try {
            OneViewConsole.Debug("GenerateFullHierachyWithData start", "DefaultNewDCPageComponent.GenerateFullHierachyWithData");
            var CompleteHTML = "";
            var response = { "HTML": "", "DataSource": '' };

            if (NewDCPageMetadata.IsDateWiseFilterationEnabled == true) {
                alert("DefaultNewDCPageComponent.Load DateWiseFilteration : Not implemented");
            }

            if (NewDCPageMetadata.IsDcStartDateSelectionEnabled == true) {
                alert("DefaultNewDCPageComponent.Load DateWiseFilteration : Not implemented");
            }

            var NewDCDimensionDictLength = Object.keys(NewDCPageMetadata.NewDCPageDimension).length;
            var DataSource = null;

            for (var dimension = 1; dimension <= NewDCDimensionDictLength; dimension++) {
                var DimensionWiseConfig = NewDCPageMetadata.NewDCPageDimension[dimension];

                response = MyInstance.GenerateDimensionWiseHierarchy(DimensionWiseConfig, dimension, DataSource);
                DataSource = response.DataSource;
                //alert('start DataSource :' + JSON.stringify( DataSource));
                CompleteHTML += response.HTML;
            }
            OneViewConsole.Debug("GenerateFullHierachyWithData end", "DefaultNewDCPageComponent.GenerateFullHierachyWithData");

            return CompleteHTML;
        }
        catch (Excep) {
            //alert("DefaultNewDCPageComponent.GenerateFullHierachyWithData : " + Excep);
            throw oOneViewExceptionHandler.Create("Framework", "DefaultNewDCPageComponent.GenerateFullHierachyWithData", Excep);
        }
    }

    this.GetDCDimensionList = function (DimensionWiseConfig, DataSource) {
        try {
            OneViewConsole.Debug("GetDCDimensionList start", "DefaultNewDCPageComponent.GetDCDimensionList");

            var DcPlaceOrTemplateIdList = MyInstance.GetDcPlaceOrTemplateByNewDCPageDimensionEnum(DimensionWiseConfig.NewDCPageDimensionEnum, DataSource);
            var DCDimensionDetailsList = [];

            //Place
            if (DimensionWiseConfig.NewDCPageDimensionEnum == 1) {
                DCDimensionDetailsList = oNewDCDAOFactory.GetDCPlaceDimension(DcPlaceOrTemplateIdList);
            }
                //Template
            else if (DimensionWiseConfig.NewDCPageDimensionEnum == 0) {
                DCDimensionDetailsList = oNewDCDAOFactory.GetDCTemplateDimension(DcPlaceOrTemplateIdList);

               //var LeftRightList= oNewDCDAOFactory.GetDCTemplateLeftRightListByServerIds(DcPlaceOrTemplateIdList);
               //var DCAttributeGroupTypeList = oNewDCDAOFactory.GetDCAttributeGroupTypes(LeftRightList);
               //MyInstance.CreateTemplateDATDict(DCAttributeGroupTypeList);
            }

            OneViewConsole.Debug("GetDCDimensionList end", "DefaultNewDCPageComponent.GetDCDimensionList");

            return DCDimensionDetailsList;
        }
        catch (Excep) {
            //alert("DefaultNewDCPageComponent.GetDCDimensionList : " + Excep);
            throw oOneViewExceptionHandler.Create("Framework", "DefaultNewDCPageComponent.GetDCDimensionList", Excep);
        }
    }

    this.CreateTemplateDATDict = function (DCAttributeGroupTypeList) {
        try {
            OneViewConsole.Debug("CreateTemplateDATDict start", "DefaultNewDCPageComponent.CreateTemplateDATDict");          

            alert('DCAttributeGroupTypeList : ' + JSON.stringify(DCAttributeGroupTypeList));
            for (var i = 0; i < DCAttributeGroupTypeList.length; i++) {
                var DCAttributeGroupTypeDetails = DCAttributeGroupTypeList[i];
                TemplateDATEntityTypesDict[DCAttributeGroupTypeDetails.Id] = DCAttributeGroupTypeDetails.Name;
            }

            OneViewConsole.Debug("CreateTemplateDATDict end", "DefaultNewDCPageComponent.CreateTemplateDATDict");

        }
        catch (Excep) {
            //alert("DefaultNewDCPageComponent.CreateTemplateDATDict : " + Excep);
            throw oOneViewExceptionHandler.Create("Framework", "DefaultNewDCPageComponent.CreateTemplateDATDict", Excep);
        }
    }

    this.FormBandIdStructureList = function (DCDimensionDetailsList, NewDCPageDimensionEnum) {
        try {
            OneViewConsole.Debug("FormBandIdStructureList start", "DefaultNewDCPageComponent.FormBandIdStructureList");
            var TypeList = [];

            if (DCDimensionDetailsList != null) {
                for (var i = 0 ; i < DCDimensionDetailsList.length ; i++) {
                    var TypeDetails = { 'Id': DCDimensionDetailsList[i].Id + "_" + NewDCPageDimensionEnum, 'Name': DCDimensionDetailsList[i].Name };
                    TypeList.push(TypeDetails);
                }
            }

            OneViewConsole.Debug("FormBandIdStructureList end", "DefaultNewDCPageComponent.GetDCDimensionList");

            return TypeList;
        }
        catch (Excep) {
            //alert("DefaultNewDCPageComponent.FormBandIdStructureList : " + Excep);
            throw oOneViewExceptionHandler.Create("Framework", "DefaultNewDCPageComponent.FormBandIdStructureList", Excep);
        }
    }

    this.GetSelectedBandId = function (DimensionWiseConfig, DCDimensionDetailsList) {
        try {
            OneViewConsole.Debug("GetSelectedBandId start", "DefaultNewDCPageComponent.GetSelectedBandId");

            var SelectedBandId = null;
            var NewDCDimensionHierarchy = DimensionWiseConfig.NewDCDimensionHierarchy;
            if (NewDCDimensionHierarchy == null) {
                SelectedBandId = DCDimensionDetailsList[0].Id;

            }
            else if (NewDCDimensionHierarchy != null && NewDCDimensionHierarchy.length != 0) {

                for (var i = 0; i < NewDCDimensionHierarchy.length ; i++) {
                    for (var j = 0; j < DCDimensionDetailsList.length ; j++) {
                        if (NewDCDimensionHierarchy[i].DimensionNodeType == DCDimensionDetailsList[j].Id) {
                            SelectedBandId = DCDimensionDetailsList[j].Id;
                            break;
                        }
                    }
                    if (SelectedBandId != null) {
                        break;
                    }
                }


            }

            if (SelectedBandId == null) {
                SelectedBandId = DCDimensionDetailsList[0].Id;                
            }
            //alert('SelectedBandId :' + SelectedBandId);
            OneViewConsole.Debug("GetSelectedBandId end", "DefaultNewDCPageComponent.GetDCDimensionList");

            return SelectedBandId;
        }
        catch (Excep) {
            //alert("DefaultNewDCPageComponent.GetSelectedBandId : " + Excep);
            throw oOneViewExceptionHandler.Create("Framework", "DefaultNewDCPageComponent.GetSelectedBandId", Excep);
        }
    }

    this.GenerateDimensionWiseHierarchy = function (DimensionWiseConfig, dimension, DataSource) {
        try {
            OneViewConsole.Debug("GenerateDimensionWiseHierarchy start", "DefaultNewDCPageComponent.GenerateDimensionWiseHierarchy");

            var response = { "HTML": "", "DataSource": '' };
            var CompleteHTML = "";

            //Create type(implies unit/AGT etc) band if more than one type/hierarchy exists based on dcProfile(this is for type) and NewDCPageMetadata(this is for hierarchy) 
            //Get all types
            //alert('DataSource : ' + JSON.stringify(DataSource));
            var DCDimensionDetailsList = MyInstance.GetDCDimensionList(DimensionWiseConfig, DataSource);
            //alert('DCDimensionDetailsList : ' + JSON.stringify(DCDimensionDetailsList));            
            var TypeList = MyInstance.FormBandIdStructureList(DCDimensionDetailsList, DimensionWiseConfig.NewDCPageDimensionEnum);
            //alert('TypeList : ' + JSON.stringify(TypeList));
            //var Id1 = 205;
            //var Id2 = 206;
            //TypeList = [{ 'Id': Id1 + "_" + DimensionWiseConfig.NewDCPageDimensionEnum }, { 'Id': Id2 + "_" + DimensionWiseConfig.NewDCPageDimensionEnum }]; //for testing hard code

            //Header
            var HeaderHTML = oNewDCPageDefaultHtmlDropdownControl.GetHeaderHTML(DimensionWiseConfig.HierarchyDisplayKey);
            //Band

            var HeaderBandHTML = "";
            if (TypeList.length > 1) {
                HeaderBandHTML = oNewDCPageDefaultHtmlDropdownControl.GetHeaderBandHTML(TypeList, DimensionWiseConfig.NewDCPageDimensionEnum, dimension, DimensionWiseConfig.Position);
            }
            //alert('HeaderBandHTML : ' + HeaderBandHTML);
            //SelectedBand
            var SelectedBandId = MyInstance.GetSelectedBandId(DimensionWiseConfig, DCDimensionDetailsList);
            if (DimensionWiseConfig.NewDCPageDimensionEnum == 1) {
                PlaceSelectedBandId = SelectedBandId;
            }
            else if (DimensionWiseConfig.NewDCPageDimensionEnum == 0) {
                TemplateSelectedBandId = SelectedBandId;
            }
            //alert('SelectedBandId :' + SelectedBandId);            
            //Full Hierarchy
            response = MyInstance.GetHierarchyWithoutBand(DimensionWiseConfig, SelectedBandId, DataSource);
            var InnerHierarchyHTML = response.HTML;
            CompleteHTML = '<div id="FullHierarchy_' + DimensionWiseConfig.Position + '">' + HeaderHTML + HeaderBandHTML + InnerHierarchyHTML + '</div>';
            response.HTML = CompleteHTML;
            //alert('GenerateDimensionWiseHierarchy response' + JSON.stringify(response));
            OneViewConsole.Debug("GenerateDimensionWiseHierarchy end", "DefaultNewDCPageComponent.GenerateDimensionWiseHierarchy");

            return response;
        }
        catch (Excep) {
            //alert("DefaultNewDCPageComponent.GenerateDimensionWiseHierarchy : " + Excep);
            throw oOneViewExceptionHandler.Create("Framework", "DefaultNewDCPageComponent.GenerateDimensionWiseHierarchy", Excep);
        }
    }

    this.GetHierarchyWithoutBand = function (DimensionWiseConfig, SelectedBandId, DataSource, IsEvent) {
        try {
            OneViewConsole.Debug("GetHierarchyWithoutBand start", "DefaultNewDCPageComponent.GetHierarchyWithoutBand");

            var response = { "HTML": "", "DataSource": '' };
            response = MyInstance.GetHierarchy(DimensionWiseConfig, SelectedBandId, DataSource);

            if (IsEvent != true) {
                var InnerHierarchyHTML = '<div id="HierarchyContainer_' + DimensionWiseConfig.Position + '">' + response.HTML + '</div>';
                response.HTML = InnerHierarchyHTML;
            }

            OneViewConsole.Debug("GetHierarchyWithoutBand end", "DefaultNewDCPageComponent.GetHierarchyWithoutBand");

            return response;
        }
        catch (Excep) {
            //alert("DefaultNewDCPageComponent.GetHierarchyWithoutBand : " + Excep);
            throw oOneViewExceptionHandler.Create("Framework", "DefaultNewDCPageComponent.GetHierarchyWithoutBand", Excep);
        }
    }

    this.GetHierarchy = function (NewDCPageDimensionDetail, SelectedBandId, PrevDataSource) {
        try {
            OneViewConsole.Debug("GetHierarchy start", "DefaultNewDCPageComponent.GetHierarchy");

            var HTML = "";
            var DataSourceLst = [];//[{ Id: 1, Name: "Option1" }, { Id: 1, Name: "Option2" }];
            var DCPlaceLeftRightList = [];
            var DCTemplateLeftRightList = [];
            var DcTemplateIdByProfileList = [];
            var CompleteHierarchyResponse = { 'HTML': '', 'DataSource': '' };;
            var response = { 'HTML': HTML, 'DataSource': '' };

            var Position = NewDCPageDimensionDetail.Position;
            var IsProfileOnUpperHrchyRequired = false;
            //If position is 1 then no need to take profiles based on template/place
            if (Position == "1") {
                IsProfileOnUpperHrchyRequired = false;
            }
            else if (Position == "2") {
                IsProfileOnUpperHrchyRequired = true;
            }

            //Place
            if (NewDCPageDimensionDetail.NewDCPageDimensionEnum == 1) {
                var DcPlaceIdByProfileList = [];
                //alert('IsProfileOnUpperHrchyRequired : ' + IsProfileOnUpperHrchyRequired + 'PrevDataSource : ' + JSON.stringify(PrevDataSource));
                //alert('GlobalDcProfileList : ' + JSON.stringify(GlobalDcProfileList));
                for (var i = 0; i < GlobalDcProfileList.length; i++) {
                    if (IsProfileOnUpperHrchyRequired == false && DcPlaceIdByProfileList.indexOf(GlobalDcProfileList[i].DcPlaceId) == -1) {
                        DcPlaceIdByProfileList.push({ 'Id': GlobalDcProfileList[i].DcPlaceId });
                    }
                    else if (IsProfileOnUpperHrchyRequired == true && (PrevDataSource != null && GlobalDcProfileList[i].TemplateNodeId == PrevDataSource.Id)
                        && DcPlaceIdByProfileList.indexOf(GlobalDcProfileList[i].DcPlaceId) == -1) {
                        DcPlaceIdByProfileList.push({ 'Id': GlobalDcProfileList[i].DcPlaceId });
                    }
                }
                //alert('DcPlaceIdByProfileList 1 : ' + JSON.stringify(DcPlaceIdByProfileList));
                DcPlaceIdByProfileList = oNewDCDAOFactory.GetDCPlaceByTypeAndServerIds(SelectedBandId, DcPlaceIdByProfileList);
                //alert('DcPlaceIdByProfileList 2 : ' + JSON.stringify(DcPlaceIdByProfileList));
                DCPlaceLeftRightList = oNewDCDAOFactory.GetDCPlaceLeftRightListByServerIds(DcPlaceIdByProfileList);
                //alert('DCPlaceLeftRightList : ' + JSON.stringify(DCPlaceLeftRightList));

            }
                //Template
            else if (NewDCPageDimensionDetail.NewDCPageDimensionEnum == 0) {
                var DcTemplateIdByProfileList = [];
                //alert('IsProfileOnUpperHrchyRequired : ' + IsProfileOnUpperHrchyRequired + 'PrevDataSource : ' + JSON.stringify(PrevDataSource));
                //alert('GlobalDcProfileList : ' + JSON.stringify(GlobalDcProfileList));
                for (var i = 0; i < GlobalDcProfileList.length; i++) {

                    if (IsProfileOnUpperHrchyRequired == false && DcTemplateIdByProfileList.indexOf(GlobalDcProfileList[i].TemplateNodeId) == -1) {
                        DcTemplateIdByProfileList.push({ 'Id': GlobalDcProfileList[i].TemplateNodeId });
                    }
                    else if (IsProfileOnUpperHrchyRequired == true && (PrevDataSource != null && GlobalDcProfileList[i].DcPlaceId == PrevDataSource.Id)
                        && DcTemplateIdByProfileList.indexOf(GlobalDcProfileList[i].TemplateNodeId) == -1) {
                        DcTemplateIdByProfileList.push({ 'Id': GlobalDcProfileList[i].TemplateNodeId });
                    }
                }
                //alert('DcTemplateIdByProfileList : ' + JSON.stringify(DcTemplateIdByProfileList));
                DcTemplateIdByProfileList = oNewDCDAOFactory.GetDCTemplateByTypeAndServerIds(SelectedBandId, DcTemplateIdByProfileList);
                //alert('DcTemplateIdByProfileList : ' + JSON.stringify(DcTemplateIdByProfileList));
                DCTemplateLeftRightList = oNewDCDAOFactory.GetDCTemplateLeftRightListByServerIds(DcTemplateIdByProfileList);
                //alert('DCTemplateLeftRightList : ' + JSON.stringify(DCTemplateLeftRightList));
            }


            if (NewDCPageDimensionDetail.NewDCDimensionHierarchy != null && NewDCPageDimensionDetail.NewDCDimensionHierarchy.length != 0) {
                //var NewDCDimensionHierarchyDetailDict = NewDCPageDimensionDetail.NewDCDimensionHierarchy[0].NewDCDimensionHierarchyDetailDict;
                var HierarchyBySelectedBandId = MyInstance.GetNewDCDimensionHierarchyForSelectedBandId(NewDCPageDimensionDetail, SelectedBandId);
                if (HierarchyBySelectedBandId != null) {
                    CompleteHierarchyResponse = MyInstance.GetCompleteHierarchy(NewDCPageDimensionDetail, SelectedBandId);
                    HTML += CompleteHierarchyResponse.HTML;
                }

            }




            //alert('CompleteHierarchyResponse 11 : ' + JSON.stringify(CompleteHierarchyResponse));
            var ParentNodeId = (CompleteHierarchyResponse.DataSource != undefined && CompleteHierarchyResponse.DataSource != '') ? CompleteHierarchyResponse.DataSource.Id : 0;
            //Place
            if (NewDCPageDimensionDetail.NewDCPageDimensionEnum == 1) {
                if (DCPlaceLeftRightList != null && DCPlaceLeftRightList != undefined && DCPlaceLeftRightList != "" && DCPlaceLeftRightList.length != 0) {
                    DataSourceLst = oNewDCDAOFactory.GetDCPlaceParentByLeftRightAndParentTypeId(DCPlaceLeftRightList, SelectedBandId, ParentNodeId);
                }
            }
                //Template
            else if (NewDCPageDimensionDetail.NewDCPageDimensionEnum == 0) {
                if (DCTemplateLeftRightList != null && DCTemplateLeftRightList != undefined && DCTemplateLeftRightList != "" && DCTemplateLeftRightList.length != 0) {

                    DataSourceLst = oNewDCDAOFactory.GetDCTemplateParentByLeftRightAndParentTypeId(DCTemplateLeftRightList, SelectedBandId, ParentNodeId);
                    //alert('DataSourceLst : ' + JSON.stringify(DataSourceLst));
                }
            }

            if (DataSourceLst != null && DataSourceLst != undefined && DataSourceLst != "") {
                DataSourceLst = DataSourceLst.sort(OneViewArraySorting('Name', true, function (a) { return a }));
            }
            //alert("DataSourceLst GetHierarchy :" + JSON.stringify(DataSourceLst));
            HTML += oNewDCPageDefaultHtmlDropdownControl.GetHtml(NewDCPageDimensionDetail.Position, NewDCPageDimensionDetail.NewDCPageDimensionEnum, SelectedBandId, DataSourceLst, 0);
            //alert("HTML GetHierarchy :" + HTML);

            response = { 'HTML': HTML, 'DataSource': DataSourceLst[0] };
            //alert("response GetHierarchy :" + JSON.stringify(response));
            OneViewConsole.Debug("GetHierarchy end", "DefaultNewDCPageComponent.GetHierarchy");

            return response;
        }
        catch (Excep) {
            //alert("DefaultNewDCPageComponent.GetHierarchy :" + Excep);
            //alert("DefaultNewDCPageComponent.GetHierarchy :" + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "DefaultNewDCPageComponent.GetHierarchy", Excep);
        }

    }


    this.GetTemplateByDcProfile = function () {
        try {
            //OneViewConsole.Debug("GetTemplateByDcProfile start", "DefaultNewDCPageComponent.GetTemplateByDcProfile");

            //OneViewConsole.Debug("GetTemplateByDcProfile end", "DefaultNewDCPageComponent.GetTemplateByDcProfile");
        }
        catch (Excep) {
            //alert("DefaultNewDCPageComponent.GetTemplateByDcProfile" + Excep);
            throw oOneViewExceptionHandler.Create("Framework", "DefaultNewDCPageComponent.GetTemplateByDcProfile", Excep);
        }
    }

    this.GetCompleteHierarchy = function (NewDCPageDimensionDetail, SelectedBandId) {
        try {
            //OneViewConsole.Debug("GetCompleteHierarchy start", "DefaultNewDCPageComponent.GetCompleteHierarchy");
            var response = { 'HTML': '', 'DataSource': '' };

            var HTML = "";
            var RefreshDDLId = 0;
            //alert('NewDCPageDimensionDetail : ' + JSON.stringify(NewDCPageDimensionDetail) + ", SelectedBandId :" + SelectedBandId);
            //Get upper parent of the current hierarchy           
            var HierarchyDataList = [];
            var DCPlaceLeftRightList = [];
            var DCTemplateLeftRightList = [];

            var Position = NewDCPageDimensionDetail.Position;
            var IsProfileOnUpperHrchyRequired = false;
            //If position is 1 then no need to take profiles based on template/place
            if (Position == "1") {
                IsProfileOnUpperHrchyRequired = false;
            }
            else if (Position == "2") {
                IsProfileOnUpperHrchyRequired = true;
            }

            //Place
            if (NewDCPageDimensionDetail.NewDCPageDimensionEnum == 1) {

                var DcPlaceIdByProfileList = [];
                for (var i = 0; i < GlobalDcProfileList.length; i++) {
                    if (IsProfileOnUpperHrchyRequired == false && DcPlaceIdByProfileList.indexOf(GlobalDcProfileList[i].DcPlaceId) == -1) {
                        DcPlaceIdByProfileList.push({ 'Id': GlobalDcProfileList[i].DcPlaceId });
                    }
                    else if (IsProfileOnUpperHrchyRequired == true && (PrevDataSource != null && GlobalDcProfileList[i].TemplateNodeId == PrevDataSource.Id)
                        && DcPlaceIdByProfileList.indexOf(GlobalDcProfileList[i].DcPlaceId) == -1) {
                        DcPlaceIdByProfileList.push({ 'Id': GlobalDcProfileList[i].DcPlaceId });
                    }
                }
                DcPlaceIdByProfileList = oNewDCDAOFactory.GetDCPlaceByTypeAndServerIds(SelectedBandId, DcPlaceIdByProfileList);
                DCPlaceLeftRightList = oNewDCDAOFactory.GetDCPlaceLeftRightListByServerIds(DcPlaceIdByProfileList);
            }

                //Template
            else if (NewDCPageDimensionDetail.NewDCPageDimensionEnum == 0) {
                var DcTemplateIdByProfileList = [];
                for (var i = 0; i < GlobalDcProfileList.length; i++) {
                    if (IsProfileOnUpperHrchyRequired == false && DcTemplateIdByProfileList.indexOf(GlobalDcProfileList[i].TemplateNodeId) == -1) {
                        DcTemplateIdByProfileList.push({ 'Id': GlobalDcProfileList[i].TemplateNodeId });
                    }
                    else if (IsProfileOnUpperHrchyRequired == true && (PrevDataSource != null && GlobalDcProfileList[i].DcPlaceId == PrevDataSource.Id)
                        && DcTemplateIdByProfileList.indexOf(GlobalDcProfileList[i].TemplateNodeId) == -1) {
                        DcTemplateIdByProfileList.push({ 'Id': GlobalDcProfileList[i].TemplateNodeId });
                    }
                }
                DcTemplateIdByProfileList = oNewDCDAOFactory.GetDCTemplateByTypeAndServerIds(SelectedBandId, DcTemplateIdByProfileList);
                //alert('DcTemplateIdByProfileList : ' + JSON.stringify(DcTemplateIdByProfileList));
                DCTemplateLeftRightList = oNewDCDAOFactory.GetDCTemplateLeftRightListByServerIds(DcTemplateIdByProfileList);
            }

            var DataSourceLst = [];
            //var NewDCDimensionHierarchyDetailDict = NewDCPageDimensionDetail.NewDCDimensionHierarchy[0].NewDCDimensionHierarchyDetailDict;
            var HierarchyBySelectedBandId = MyInstance.GetNewDCDimensionHierarchyForSelectedBandId(NewDCPageDimensionDetail, SelectedBandId);
            var NewDCDimensionHierarchyDetailDict = HierarchyBySelectedBandId.NewDCDimensionHierarchyDetailDict;
            var NewDCDimensionHierarchyDetailDictLength = Object.keys(NewDCDimensionHierarchyDetailDict).length;
            for (var level = 1; level <= NewDCDimensionHierarchyDetailDictLength ; level++) {
                if (level <= NewDCDimensionHierarchyDetailDictLength - 1) {
                    RefreshDDLId = NewDCDimensionHierarchyDetailDict[level + 1]
                }
                else if (level == NewDCDimensionHierarchyDetailDictLength) {
                    //RefreshDDLId = NewDCPageDimensionDetail.NewDCDimensionHierarchy[0].DimensionNodeType;
                    RefreshDDLId = HierarchyBySelectedBandId.DimensionNodeType;
                }
                var Type = NewDCDimensionHierarchyDetailDict[level];
                //Generate DDL/HTML for the given "Type"
                var ParentNodeId = (DataSourceLst != null && DataSourceLst.length > 0) ? DataSourceLst[0].Id : 0;
                //Place
                if (NewDCPageDimensionDetail.NewDCPageDimensionEnum == 1) {
                    if (DCPlaceLeftRightList != null && DCPlaceLeftRightList != undefined && DCPlaceLeftRightList != "" && DCPlaceLeftRightList.length != 0) {
                        DataSourceLst = oNewDCDAOFactory.GetDCPlaceParentByLeftRightAndParentTypeId(DCPlaceLeftRightList, Type, ParentNodeId);
                    }
                }

                    //Template
                else if (NewDCPageDimensionDetail.NewDCPageDimensionEnum == 0) {
                    if (DCTemplateLeftRightList != null && DCTemplateLeftRightList != undefined && DCTemplateLeftRightList != "" && DCTemplateLeftRightList.length != 0) {
                        DataSourceLst = oNewDCDAOFactory.GetDCTemplateParentByLeftRightAndParentTypeId(DCTemplateLeftRightList, Type, ParentNodeId);
                    }
                }

                DataSourceLst = DataSourceLst.sort(OneViewArraySorting('Name', true, function (a) { return a }));

                alert(RefreshDDLId  + 'DataSourceLst GetCompleteHierarchy : ' + JSON.stringify(DataSourceLst));
                HTML += oNewDCPageDefaultHtmlDropdownControl.GetHtml(NewDCPageDimensionDetail.Position, NewDCPageDimensionDetail.NewDCPageDimensionEnum, Type, DataSourceLst, RefreshDDLId);

                //alert('HTML GetCompleteHierarchy : ' + HTML);
            }

            response.HTML = HTML;
            response.DataSource = DataSourceLst[0];
            //OneViewConsole.Debug("GetCompleteHierarchy end", "DefaultNewDCPageComponent.GetCompleteHierarchy");

            return response;
        }
        catch (Excep) {
            //alert("DefaultNewDCPageComponent.GetCompleteHierarchy" + Excep);
            throw oOneViewExceptionHandler.Create("Framework", "DefaultNewDCPageComponent.GetCompleteHierarchy", Excep);
        }
    }

    /// <summary>
    /// LoadHtml on page
    /// </summary>
    /// <param name="$scope">Current scope</param>
    /// <param name="$compile">Angular compilation for making dynamic html</param>
    this.LoadHtml = function (HTML, DivId) {

        try {
            //OneViewConsole.Debug("LoadHtml start", "DefaultNewDCPageComponent.LoadHtml");
            ////document.getElementById(DivId).innerHTML = "";
            document.getElementById(DivId).innerHTML = HTML;

            //OneViewConsole.Debug("LoadHtml end", "DefaultNewDCPageComponent.LoadHtml");
        }
        catch (Excep) {
            //alert(Excep);
            throw oOneViewExceptionHandler.Create("Framework", "DefaultNewDCPageComponent.LoadHtml", Excep);
        }
    }

    this.GetDcPlaceOrTemplateByNewDCPageDimensionEnum = function (NewDCPageDimensionEnum, DataSource) {
        try {
            OneViewConsole.Debug("GetDcPlaceOrTemplateByNewDCPageDimensionEnum Start", "DefaultNewDCPageComponent.GetDcPlaceOrTemplateByNewDCPageDimensionEnum");
            var DcPlaceOrTemplateIdList = [];
            var Id = null;

            //alert('DataSource : ' + DataSource + 'NewDCPageDimensionEnum : ' + NewDCPageDimensionEnum + 'GlobalDcProfileList : ' + JSON.stringify(GlobalDcProfileList));

            for (var i = 0; i < GlobalDcProfileList.length; i++) {

                //Place
                if (NewDCPageDimensionEnum == 1) {
                    //alert(GlobalDcProfileList[i].TemplateNodeId + ' : PlacId : ' + JSON.stringify(DataSource));
                    if (DataSource != null && (GlobalDcProfileList[i].TemplateNodeId == DataSource.Id)) {                        
                        Id = GlobalDcProfileList[i].DcPlaceId;
                    }
                    else if (DataSource == null){
                        Id = GlobalDcProfileList[i].DcPlaceId;
                    }
                }
                    //Template
                else if (NewDCPageDimensionEnum == 0) {
                    //alert(GlobalDcProfileList[i].DcPlaceId + ' : TemplateNodeId : ' + JSON.stringify(DataSource));
                    if (DataSource != null && (GlobalDcProfileList[i].DcPlaceId == DataSource.Id)) {                        
                        Id = GlobalDcProfileList[i].TemplateNodeId;
                    }
                    else if (DataSource == null) {
                        Id = GlobalDcProfileList[i].TemplateNodeId;
                    }
                }

                if (DcPlaceOrTemplateIdList.indexOf(Id) == -1 && Id != null) {                    
                    DcPlaceOrTemplateIdList.push(Id)
                }

            }

            OneViewConsole.Debug("GetDcPlaceOrTemplateByNewDCPageDimensionEnum End", "DefaultNewDCPageComponent.GetDcPlaceOrTemplateByNewDCPageDimensionEnum");

            return DcPlaceOrTemplateIdList;

        }
        catch (Excep) {
            //alert("DefaultNewDCPageComponent.GetDcPlaceOrTemplateByNewDCPageDimensionEnum" + Excep);
            throw oOneViewExceptionHandler.Create("Framework", "DefaultNewDCPageComponent.GetHierarchy", Excep);
        }

    }

    this.UpdateHierarchyValuesOnDDLChange = function (DDLUniqueId, Position, NewDCPageDimensionEnum, SelectedBandId, SelectedDDLId, RefreshDDLId) {
        try {
            OneViewConsole.Debug("UpdateHierarchyValuesOnDDLChange End", "DefaultNewDCPageComponent.UpdateHierarchyValuesOnDDLChange");

            //alert('UpdateHierarchyValuesOnDDLChange ');
            //alert('DDLUniqueId : ' + DDLUniqueId + " , Position : " + Position + ", NewDCPageDimensionEnum : " + NewDCPageDimensionEnum + " , SelectedBandId : " + SelectedBandId + " , SelectedDDLId : " + SelectedDDLId + " , RefreshDDLId : " + RefreshDDLId);

            var DimensionWiseConfig;
            var response = { "HTML": "", "DataSource": '' };
            var IsEvent = true;
            if (Position == "1") {
                var DataSource = { 'Id': SelectedDDLId, 'Name': '' };
                if (RefreshDDLId != 0) {
                    //Generate First hierarchy without header and band
                    DimensionWiseConfig = NewDCPageMetadata.NewDCPageDimension[Position];
                    response = MyInstance.GetHierarchyWithoutBand(DimensionWiseConfig, SelectedBandId, DataSource, IsEvent);
                    DataSource = response.DataSource;
                    var InnerHierarchyHTML = response.HTML;
                    var DivId = 'HierarchyContainer_' + Position;
                    MyInstance.LoadHtml(InnerHierarchyHTML, DivId);
                }
                //Generate Second hierarchy full
                DimensionWiseConfig = NewDCPageMetadata.NewDCPageDimension["2"];
                var FullHierarchyDivId = 'FullHierarchy_' + DimensionWiseConfig.Position
                response = MyInstance.GenerateDimensionWiseHierarchy(DimensionWiseConfig, "2", DataSource);
                MyInstance.LoadHtml(response.HTML, FullHierarchyDivId);

            }
            else if (Position == "2") {
                //Generate Second hierarchy without header and band
                DimensionWiseConfig = NewDCPageMetadata.NewDCPageDimension[Position];
                response = MyInstance.GetHierarchyWithoutBand(DimensionWiseConfig, SelectedBandId, DataSource, IsEvent);
                DataSource = response.DataSource;
                var InnerHierarchyHTML = response.HTML;
                var DivId = 'HierarchyContainer_' + Position;
                MyInstance.LoadHtml(InnerHierarchyHTML, DivId);

            }

            OneViewConsole.Debug("UpdateHierarchyValuesOnDDLChange Start", "DefaultNewDCPageComponent.UpdateHierarchyValuesOnDDLChange");

        }
        catch (Excep) {
            //alert("DefaultNewDCPageComponent.UpdateHierarchyValuesOnDDLChange : " + Excep);
            throw oOneViewExceptionHandler.Create("FrameWork", "DefaultNewDCPageComponent.UpdateHierarchyValuesOnDDLChange", Excep);
        }
    }

    this.GetNewDCDimensionHierarchyForSelectedBandId = function (DimensionWiseConfig, SelectedBandId) {
        try {
            OneViewConsole.Debug("GetNewDCDimensionHierarchyForSelectedBandId start", "DefaultNewDCPageComponent.GetNewDCDimensionHierarchyForSelectedBandId");

            var ResponseHierarchy = null;
            var NewDCDimensionHierarchy = DimensionWiseConfig.NewDCDimensionHierarchy;
            for (var i = 0; i < NewDCDimensionHierarchy.length ; i++) {
                if (NewDCDimensionHierarchy[i].DimensionNodeType == SelectedBandId) {
                    ResponseHierarchy = NewDCDimensionHierarchy[i];
                    break;
                }
            }

            OneViewConsole.Debug("GetNewDCDimensionHierarchyForSelectedBandId end", "DefaultNewDCPageComponent.GetNewDCDimensionHierarchyForSelectedBandId");

            return ResponseHierarchy;
        }
        catch (Excep) {
            //alert("DefaultNewDCPageComponent.GetNewDCDimensionHierarchyForSelectedBandId : " + Excep);
            throw oOneViewExceptionHandler.Create("Framework", "DefaultNewDCPageComponent.GetNewDCDimensionHierarchyForSelectedBandId", Excep);
        }
    }
}


// NewDCPageDefaultHtmlDropdownControl
function NewDCPageDefaultHtmlDropdownControl() {

    var MyInstance = this;

    this.GetHeaderHTML = function (HierarchyDisplayKey) {
        try {
            OneViewConsole.Debug("GetHeaderHTML End", "NewDCPageDefaultHtmlDropdownControl.GetHeaderHTML");

            var Html = '<div class="title-bar rounded">' + HierarchyDisplayKey + '</div>';

            OneViewConsole.Debug("GetHeaderHTML Start", "NewDCPageDefaultHtmlDropdownControl.GetHeaderHTML");

            return Html;
        }
        catch (Excep) {
            //alert(Excep);
            throw oOneViewExceptionHandler.Create("FrameWork", "NewDCPageDefaultHtmlDropdownControl.GetHeaderHTML", Excep);
        }
    }

    //NewDCPageDimensionId and Position are same things need to change API and pass only one
    this.GetHeaderBandHTML = function (TypeList, TypeEnum, NewDCPageDimensionId, Position) {
        try {
            OneViewConsole.Debug("GetHeaderBandHTML End", "NewDCPageDefaultHtmlDropdownControl.GetHeaderBandHTML");

            var NewDCDimensionHierarchyDimensionNodeTypeId = (TypeList[0].Id).split("_")[0];
            var GlobalizedName = MyInstance.GetBandGlobalization(NewDCDimensionHierarchyDimensionNodeTypeId, TypeEnum);
            var Html = '<div class="row responsive-md">';

            Html += '<div class="col"><button class="button button-block" style="background-color:Green;color:white" name="BandType_' + TypeEnum + '" id="' + TypeList[0].Id + '" Type="' + TypeEnum + '" NewDCPageDimensionId="' + NewDCPageDimensionId + '" Position="' + Position + '" onclick="new NewDCPageDefaultHtmlDropdownControl().UpdateHierarchy(\'' + TypeList[0].Id + '\',' + TypeEnum + ',' + NewDCPageDimensionId + ',' + NewDCDimensionHierarchyDimensionNodeTypeId + ',' + Position + ');">' + GlobalizedName + '</button></div>';

            for (var i = 1; i < TypeList.length; i++) {
                NewDCDimensionHierarchyDimensionNodeTypeId = (TypeList[i].Id).split("_")[0];
                Html += MyInstance.CreateBandHTML(TypeEnum, TypeList[i].Id, NewDCPageDimensionId, Position, NewDCDimensionHierarchyDimensionNodeTypeId)
            }

            Html += '</div>';
            OneViewConsole.Debug("GetHeaderBandHTML Start", "NewDCPageDefaultHtmlDropdownControl.GetHeaderBandHTML");

            return Html;
        }
        catch (Excep) {
            //alert(Excep + " GetHeaderBandHTML, " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("FrameWork", "NewDCPageDefaultHtmlDropdownControl.GetHeaderBandHTML", Excep);
        }
    }

    this.CreateBandHTML = function (TypeEnum, Id, NewDCPageDimensionId, Position, NewDCDimensionHierarchyDimensionNodeTypeId) {
        try {
            OneViewConsole.Debug("CreateBandHTML End", "NewDCPageDefaultHtmlDropdownControl.CreateBandHTML");

            var GlobalizedName = MyInstance.GetBandGlobalization(NewDCDimensionHierarchyDimensionNodeTypeId, TypeEnum);

            var Html = '<div class="col"><button class="button button-block" style="background-color:Grey;color:Black" name="BandType_' + TypeEnum + '" id="' + Id + '" Type="' + TypeEnum + '" NewDCPageDimensionId="' + NewDCPageDimensionId + '" Position="' + Position + '" onclick="new NewDCPageDefaultHtmlDropdownControl().UpdateHierarchy(\'' + Id + '\',' + TypeEnum + ',' + NewDCPageDimensionId + ',' + NewDCDimensionHierarchyDimensionNodeTypeId + ',' + Position + ');">' + GlobalizedName + '</button></div>';

            OneViewConsole.Debug("CreateBandHTML Start", "NewDCPageDefaultHtmlDropdownControl.CreateBandHTML");

            return Html;
        }
        catch (Excep) {
            //alert(Excep + " CreateBandHTML, " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("FrameWork", "NewDCPageDefaultHtmlDropdownControl.CreateBandHTML", Excep);
        }
    }

    this.UpdateAnswerModel = function (ControlId, Name) {

        try {
            //OneViewConsole.Debug("UpdateAnswerModel Start", "NewDCPageDefaultHtmlDropdownControl.UpdateAnswerModel");

            MyInstance.SetBandColorForSingleSelection(ControlId, 'BandType_' + Name);

            // OneViewConsole.Debug("UpdateAnswerModel End", "NewDCPageDefaultHtmlDropdownControl.UpdateAnswerModel");
        }
        catch (Excep) {
            //alert(Excep + " UpdateAnswerModel, " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("FrameWork", "NewDCPageDefaultHtmlDropdownControl.UpdateAnswerModel", Excep);
        }
    }

    this.SetBandColorForSingleSelection = function (ControlId, Name) {

        try {
            //OneViewConsole.Debug("SetBandColorForSingleSelection Start", "LVDefaultBandControl.SetBandColorForSingleSelection");

            var CurrentObj = document.getElementById(ControlId);
            if (CurrentObj != undefined && CurrentObj != null && CurrentObj != "") {
                MyInstance.ClearAllColors(Name);
                CurrentObj.style.backgroundColor = "Green";
                CurrentObj.style.color = "white";
            }
            //OneViewConsole.Debug("SetBandColorForSingleSelection End", "LVDefaultBandControl.SetBandColorForSingleSelection");
        }
        catch (Excep) {
            //alert(Excep + " SetBandColorForSingleSelection, " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "LVDefaultBandControl.SetBandColorForSingleSelection", Excep);
        }
        finally {
            CurrentObj = null;
        }
    }

    this.ClearAllColors = function (Name) {
        try {
            OneViewConsole.Debug("ClearAllColors Start", "LVDefaultBandControl.ClearAllColors");

            var AllObj = document.getElementsByName(Name);
            if (AllObj != null) {
                for (var i = 0; i < AllObj.length; i++) {
                    AllObj[i].style.backgroundColor = "Grey";
                    AllObj[i].style.color = "Black";
                }
            }

            OneViewConsole.Debug("ClearAllColors End", "LVDefaultBandControl.ClearAllColors");
        }
        catch (Excep) {
            //alert(Excep + " ClearAllColors, " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("Framework", "LVDefaultBandControl.ClearAllColors", Excep);
        }
        finally {
            AllObj = null;
        }
    }

    this.UpdateHierarchy = function (ControlId, Name, NewDCPageDimensionId, NewDCDimensionHierarchyDimensionNodeTypeId, Position) {

        try {
            OneViewConsole.Debug("UpdateHierarchy Start", "NewDCPageDefaultHtmlDropdownControl.UpdateHierarchy");
            
            var response = { "HTML": "", "DataSource": '' };
            var DimensionWiseConfig;
            var BandWiseConfig = [];
            var NewDCDimensionHierarchyList = NewDCPageMetadata.NewDCPageDimension[NewDCPageDimensionId].NewDCDimensionHierarchy;
            if (NewDCDimensionHierarchyList != null && NewDCDimensionHierarchyList != undefined && NewDCDimensionHierarchyList != "" && NewDCDimensionHierarchyList.length > 0) {
                for (var i = 0; i < NewDCDimensionHierarchyList.length ; i++) {
                    if (NewDCDimensionHierarchyList[i].DimensionNodeType == NewDCDimensionHierarchyDimensionNodeTypeId) {
                        BandWiseConfig = NewDCDimensionHierarchyList[i];
                        break;
                    }
                }
            }

            
            MyInstance.SetBandColorForSingleSelection(ControlId, 'BandType_' + Name);

            var NewDCPageDimensionDetail = { "Position": Position, "NewDCPageDimensionEnum": Name, "NewDCDimensionHierarchy": null }
            if (BandWiseConfig != null && BandWiseConfig != undefined && BandWiseConfig != "") {
                NewDCPageDimensionDetail.NewDCDimensionHierarchy = [];
                NewDCPageDimensionDetail.NewDCDimensionHierarchy.push(BandWiseConfig);
            }

           
            var _oDefaultNewDCPageComponent = new DefaultNewDCPageComponent()
            var SelectedBandId = ControlId.split("_")[0];
            var IsEvent = true;
            if (Position == "1") {
                var DataSource = null;
                //Generate First hierarchy without header and band
                DimensionWiseConfig= NewDCPageMetadata.NewDCPageDimension[NewDCPageDimensionId];
                response = _oDefaultNewDCPageComponent.GetHierarchyWithoutBand(NewDCPageDimensionDetail, SelectedBandId, DataSource, IsEvent);
               
                DataSource = response.DataSource;
                var InnerHierarchyHTML = response.HTML;
                var DivId = 'HierarchyContainer_' + Position;
                
                _oDefaultNewDCPageComponent.LoadHtml(InnerHierarchyHTML, DivId);

                
                //Generate Second hierarchy full
                DimensionWiseConfig = NewDCPageMetadata.NewDCPageDimension["2"];
                var FullHierarchyDivId = 'FullHierarchy_' + DimensionWiseConfig.Position
                response = _oDefaultNewDCPageComponent.GenerateDimensionWiseHierarchy(DimensionWiseConfig, "2", DataSource);
                
                _oDefaultNewDCPageComponent.LoadHtml(response.HTML, FullHierarchyDivId);

            }
            else if (Position == "2") {
                //Generate Second hierarchy without header and band
                DimensionWiseConfig = NewDCPageMetadata.NewDCPageDimension[NewDCPageDimensionId];
                response = _oDefaultNewDCPageComponent.GetHierarchyWithoutBand(NewDCPageDimensionDetail, SelectedBandId, DataSource, IsEvent);
                DataSource = response.DataSource;
                var InnerHierarchyHTML = response.HTML;
                var DivId = 'HierarchyContainer_' + Position;
                _oDefaultNewDCPageComponent.LoadHtml(InnerHierarchyHTML, DivId);

            }

             OneViewConsole.Debug("UpdateHierarchy End", "NewDCPageDefaultHtmlDropdownControl.UpdateHierarchy");
        }
        catch (Excep) {
            //alert(Excep + " UpdateHierarchy, " + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("FrameWork", "NewDCPageDefaultHtmlDropdownControl.UpdateHierarchy", Excep);
        }
    }

    /// <summary>
    /// Get Html
    /// </summary>
    /// <param name="Position">Position</param> 
    /// <param name="NewDCPageDimensionEnum">NewDCPageDimensionEnum</param> 
    /// <param name="TypeId">TypeId</param> 
    /// <returns>Html</returns>
    this.GetHtml = function (Position, NewDCPageDimensionEnum, TypeId, DataSourceLst,RefreshDDLId) {

        try {
            OneViewConsole.Debug("GetHtml Start", "NewDCPageDefaultHtmlDropdownControl.GetHtml");
            
            if (TypeId == null || TypeId == undefined || TypeId == "") {
                TypeId = 0;
            }
            var UniqueId = Position + '_' + NewDCPageDimensionEnum + '_' + TypeId;

            var Html = '  <div class="row no-padding responsive-sm multi-col">' +
                                '<div class="col rounded light-bg">' +
                                   ' <div class="field-item with-icon select-box">' +
                                       ' <label>' +
                                          '  <span>' + MyInstance.GetBandGlobalization(TypeId, NewDCPageDimensionEnum) + ' </span>' +
                                           ' <select id="' + UniqueId + '"onChange="new NewDCPageDefaultHtmlDropdownControl().DDLChangeEvent(\'' + UniqueId + '\',' + Position + ',' + NewDCPageDimensionEnum + ',' + TypeId + ',' + RefreshDDLId + ')">' +
                                                GetOptionsHtml(DataSourceLst) +
                                            '</select>' +
                                            ' <i class="icon icon-chevron-down"></i>' +
                                        ' </label>' +
                                     '</div>' +
                                   '</div>' +
                           '</div>';

            //Place
            if (RefreshDDLId == 0 && NewDCPageDimensionEnum == 1) {
                OneViewSessionStorage.Save("DcPlaceId", DataSourceLst[0].Id);
                OneViewSessionStorage.Save("DcPlaceName", DataSourceLst[0].Name);
            }
            else if (RefreshDDLId == 0 && NewDCPageDimensionEnum == 0) {
                OneViewSessionStorage.Save("TemplateId", DataSourceLst[0].Id);
                OneViewSessionStorage.Save("TemplateName", DataSourceLst[0].Name);
            }

            OneViewConsole.Debug("GetHtml End", "NewDCPageDefaultHtmlDropdownControl.GetHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "NewDCPageDefaultHtmlDropdownControl.GetHtml", Excep);
        }
    }


    /// <summary>
    /// Get Options
    /// </summary>
    /// <param name="DataSourceLst">DataSource list</param>
    /// <returns>Html</returns>
    var GetOptionsHtml = function (DataSourceLst) {

        try {
            //OneViewConsole.Debug("GetOptionsHtml Start", "NewDCPageDefaultHtmlDropdownControl.GetOptionsHtml");

            var Options = '';

            for (var i = 0; i < DataSourceLst.length; i++) {
                Options += '<option value="' + DataSourceLst[i].Id + '">' + DataSourceLst[i].Name + '</option>';
            }

            //OneViewConsole.Debug("GetOptionsHtml End", "NewDCPageDefaultHtmlDropdownControl.GetOptionsHtml");

            return Options;
        }
        catch (Excep) {
            //alert(Excep);
            throw oOneViewExceptionHandler.Create("FrameWork", "NewDCPageDefaultHtmlDropdownControl.GetOptionsHtml", Excep);
        }
    }


    this.DDLChangeEvent = function (DDLUniqueId, Position, NewDCPageDimensionEnum, TypeId, RefreshDDLId) {
        try {
            OneViewConsole.Debug("DDLChangeEvent End", "NewDCPageDefaultHtmlDropdownControl.DDLChangeEvent");

            
            var SelectedDDL = document.getElementById(DDLUniqueId);
            var SelectedDDLId = SelectedDDL.value;
            var SelectedDDLName = SelectedDDL.options[SelectedDDL.selectedIndex].text;

            //alert('DDLUniqueId : ' + DDLUniqueId + " , Position : " + Position + ", NewDCPageDimensionEnum : " + NewDCPageDimensionEnum + " , TypeId : " + TypeId + " , SelectedDDLId : " + SelectedDDLId + " , RefreshDDLId : " + RefreshDDLId);

            //if (RefreshDDLId == 0 && Position != "2") {            
            if ((Position == "1") || (Position == "2" && RefreshDDLId != 0)) {
                var _oDefaultNewDCPageComponent = new DefaultNewDCPageComponent()
                _oDefaultNewDCPageComponent.UpdateHierarchyValuesOnDDLChange(DDLUniqueId, Position, NewDCPageDimensionEnum, TypeId, SelectedDDLId, RefreshDDLId);
            }

            //Place
            if (RefreshDDLId == 0 && NewDCPageDimensionEnum == 1) {
                OneViewSessionStorage.Save("DcPlaceId", SelectedDDLId);
                OneViewSessionStorage.Save("DcPlaceName", SelectedDDLName);
            }
            else if (RefreshDDLId == 0 && NewDCPageDimensionEnum == 0) {
                OneViewSessionStorage.Save("TemplateId", SelectedDDLId);
                OneViewSessionStorage.Save("TemplateName", SelectedDDLName);
            }

            OneViewConsole.Debug("DDLChangeEvent Start", "NewDCPageDefaultHtmlDropdownControl.DDLChangeEvent");                        
        }
        catch (Excep) {
            //alert("NewDCPageDefaultHtmlDropdownControl.DDLChangeEvent : "  + Excep);
            throw oOneViewExceptionHandler.Create("FrameWork", "NewDCPageDefaultHtmlDropdownControl.DDLChangeEvent", Excep);
        }
    }

    //To do : Need to take from DB
    this.GetBandGlobalization = function (SelectedBandId, TypeEnum) {
        try {
            OneViewConsole.Debug("GetBandGlobalization End", "NewDCPageDefaultHtmlDropdownControl.GetBandGlobalization");
            var Name = SelectedBandId;

            //Place
            if (TypeEnum == 1) {
                if (DATEntityTypesDict[SelectedBandId] != undefined) {
                    Name = DATEntityTypesDict[SelectedBandId]
                }
            }

            //Template
            else if (TypeEnum == 0) {
                if (TemplateDATEntityTypesDict[SelectedBandId] != undefined) {
                    Name = TemplateDATEntityTypesDict[SelectedBandId]
                }
            }                   

            OneViewConsole.Debug("GetBandGlobalization Start", "NewDCPageDefaultHtmlDropdownControl.GetBandGlobalization");

            return Name;
        }
        catch (Excep) {
            //alert(Excep);
            throw oOneViewExceptionHandler.Create("FrameWork", "NewDCPageDefaultHtmlDropdownControl.GetBandGlobalization", Excep);
        }
    }
    
}


/// <summary>
/// Factory : NewDCDAOFactory
/// </summary>
/// <param name="key">Which DAO is configured</param>
/// <returns>Returns the DAO object</returns>
function NewDCDAOFactory(key) {
    try {
        OneViewConsole.Debug("NewDCDAOFactory Start", "Factory.NewDCDAOFactory");

        if (key == "DefaultDCProfileDAO") {
            return new DefaultDCProfileDAO();

        }
        else if (key == "AdvanceDCProfileDAO") {
            return new AdvanceDCProfileDAO();
        }

        OneViewConsole.Debug("NewDCDAOFactory End", "Factory.NewDCDAOFactory");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Factory", "Factory.NewDCDAOFactory", Excep);
    }
}


/// <summary>
/// DAO : DefaultDCProfileDAO
/// </summary>

function DefaultDCProfileDAO() {
    try {
        
        this.GetDCPlaceDimension = function (DcPlaceIdList) {
            try {
                
                OneViewConsole.Debug("GetDCPlaceDimension Start", "DefaultDCProfileDAO.GetDCPlaceDimension");
                OneViewConsole.Debug("DcPlaceIdList :", JSON.stringify(DcPlaceIdList));
                var DCPlaceDimensionList = [];
                var DCPlaceDimensionIdList = [];
               
                var Incondition = "(";

                for (var i = 0; i < DcPlaceIdList.length; i++) {                   
                    Incondition += DcPlaceIdList[i];
                    Incondition += (i <= DcPlaceIdList.length - 2) ? "," : ")";                   
                }
               
                var DcPlaceDimensionIdQuery = "SELECT DISTINCT ChildDbElementType As Id FROM OrganizationAssetsNode WHERE ServerId in" + Incondition;
             
                DCPlaceDimensionIdList = window.OneViewSqlite.excecuteSqlReader(DcPlaceDimensionIdQuery);
                DCPlaceDimensionIdList = JSON.parse(DCPlaceDimensionIdList);
               


                ////Currently DATEntity doesnt exists in DB after adding we can use this code
                //Incondition = "(";

                //for (var i = 0; i < DCPlaceDimensionIdList.length; i++) {
                //    Incondition += DCPlaceDimensionIdList[i];
                //    Incondition += (i <= DCPlaceDimensionIdList.length - 2) ? "," : ")";
                //}

                //var DcPlaceDimensionQuery = "SELECT DISTINCT ServerId As Id, Name FROM DATEntityTypes WHERE ServerId in" + Incondition;

                //DCPlaceDimensionList = window.OneViewSqlite.excecuteSqlReader(DcPlaceDimensionQuery);
                //DCPlaceDimensionList = JSON.parse(DCPlaceDimensionList);


                OneViewConsole.Debug("Response from GetDCPlaceDimension" + JSON.stringify(DCPlaceDimensionIdList), "DefaultDCProfileDAO.GetDCPlaceDimension");
                OneViewConsole.Debug("GetDCPlaceDimension End", "DefaultDCProfileDAO.GetDCPlaceDimension");

                return DCPlaceDimensionIdList;
            }
            catch (Excep) {
                //alert("DefaultDCProfileDAO.GetDCPlaceDimension : " + Excep);
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetDCPlaceDimension", Excep);
            }
        }

        this.GetDCTemplateDimension_OLD_Structure = function (DcTemplateIdList) {
            try {

                OneViewConsole.Debug("GetDCTemplateDimension Start", "DefaultDCProfileDAO.GetDCTemplateDimension");
                OneViewConsole.Debug("DcTemplateIdList :", JSON.stringify(DcTemplateIdList));

                var DCTemplateDimensionList = [];
                var DCTemplateDimensionIdList = [];

                var Incondition = "(";

                for (var i = 0; i < DcTemplateIdList.length; i++) {
                    Incondition += DcTemplateIdList[i];
                    Incondition += (i <= DcTemplateIdList.length - 2) ? "," : ")";
                }

                var DcTemplateDimensionIdQuery = "SELECT DISTINCT ChildDbElementType As Id FROM TemplateNode WHERE ServerId in" + Incondition;

                DCTemplateDimensionIdList = window.OneViewSqlite.excecuteSqlReader(DcTemplateDimensionIdQuery);
                DCTemplateDimensionIdList = JSON.parse(DCTemplateDimensionIdList);

                //alert('DCTemplateDimensionIdList : ' + JSON.stringify(DCTemplateDimensionIdList));


                ////Currently DATEntity doesnt exists in DB after adding we can use this code
                //Incondition = "(";

                //for (var i = 0; i < DCTemplateDimensionIdList.length; i++) {
                //    Incondition += DCTemplateDimensionIdList[i];
                //    Incondition += (i <= DCTemplateDimensionIdList.length - 2) ? "," : ")";
                //}

                //var DcTemplateDimensionQuery = "SELECT DISTINCT ServerId As Id, Name FROM DATEntityTypes WHERE ServerId in" + Incondition;

                //DCTemplateDimensionList = window.OneViewSqlite.excecuteSqlReader(DcTemplateDimensionQuery);
                //DCTemplateDimensionList = JSON.parse(DCTemplateDimensionList);


                OneViewConsole.Debug("Response from GetDCTemplateDimension" + JSON.stringify(DCTemplateDimensionIdList), "DefaultDCProfileDAO.GetDCTemplateDimension");
                OneViewConsole.Debug("GetDCTemplateDimension End", "DefaultDCProfileDAO.GetDCTemplateDimension");

                
                return DCTemplateDimensionIdList;
            }
            catch (Excep) {
                //alert("DefaultDCProfileDAO.GetDCTemplateDimension : " + Excep);
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetDCTemplateDimension", Excep);
            }
        }

        this.GetDCTemplateDimension = function (DcTemplateIdList) {
            try {

                OneViewConsole.Debug("GetDCTemplateDimension Start", "DefaultDCProfileDAO.GetDCTemplateDimension");
                OneViewConsole.Debug("DcTemplateIdList :", JSON.stringify(DcTemplateIdList));

                var DCTemplateDimensionList = [];
                var DCTemplateDimensionIdList = [];

                var Incondition = "(";

                for (var i = 0; i < DcTemplateIdList.length; i++) {
                    Incondition += DcTemplateIdList[i];
                    Incondition += (i <= DcTemplateIdList.length - 2) ? "," : ")";
                }

                var DcTemplateDimensionIdQuery = "SELECT DISTINCT AGT.ServerId AS Id,AGT.Name from TemplateNode as Temp INNER JOIN AttributeGroupMasterEntity as AG on Temp.childDbElementId = AG.ServerId " +
                                                    "INNER JOIN AttributeGroupType as AGT on AG.AttributeGroupTypeId = AGT.ServerId and Temp.ServerId in " + Incondition;
                
                DCTemplateDimensionIdList = window.OneViewSqlite.excecuteSqlReader(DcTemplateDimensionIdQuery);
                DCTemplateDimensionIdList = JSON.parse(DCTemplateDimensionIdList);

                //alert('DCTemplateDimensionIdList : ' + JSON.stringify(DCTemplateDimensionIdList));
                
                OneViewConsole.Debug("Response from GetDCTemplateDimension" + JSON.stringify(DCTemplateDimensionIdList), "DefaultDCProfileDAO.GetDCTemplateDimension");
                OneViewConsole.Debug("GetDCTemplateDimension End", "DefaultDCProfileDAO.GetDCTemplateDimension");


                return DCTemplateDimensionIdList;
            }
            catch (Excep) {
                //alert("DefaultDCProfileDAO.GetDCTemplateDimension : " + Excep);
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetDCTemplateDimension", Excep);
            }
        }

        this.GetTemplateParentMasterIdByServerId = function (TemplateIdList) {
            try {

                OneViewConsole.Debug("GetTemplateParentMasterIdByServerId Start", "DefaultDCProfileDAO.GetTemplateParentMasterIdByServerId");
                OneViewConsole.Debug("TemplateIdList :", JSON.stringify(TemplateIdList));
                
                var DcTemplateParentList = [];
                var DcTemplateTypeIdList = [];
                var DcTemplateDimensionList = [];

                var Incondition = "(";

                for (var i = 0; i < TemplateIdList.length; i++) {
                    Incondition += TemplateIdList[i];
                    Incondition += (i <= TemplateIdList.length - 2) ? "," : ")";
                }

                var DcTemplateParentQuery = "SELECT DISTINCT ParentDbElementId FROM TemplateNode WHERE ServerId in" + Incondition;
                DcTemplateParentList = window.OneViewSqlite.excecuteSqlReader(DcTemplateParentQuery);
                DcTemplateParentList = JSON.parse(DcTemplateParentList);
                
                OneViewConsole.Debug("Response from GetTemplateParentMasterIdByServerId" + JSON.stringify(DcTemplateDimensionList), "DefaultDCProfileDAO.GetTemplateParentMasterIdByServerId");
                OneViewConsole.Debug("GetTemplateParentMasterIdByServerId End", "DefaultDCProfileDAO.GetTemplateParentMasterIdByServerId");

                return DcTemplateParentList;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetTemplateParentMasterIdByServerId", Excep);
            }
        }

        this.GetAttributeGroupByAGTypeIds = function (IdList) {
            try {

                OneViewConsole.Debug("GetAttributeGroupByAGTypeIds Start", "DefaultDCProfileDAO.GetAttributeGroupByAGTypeIds");
                OneViewConsole.Debug("IdList :", JSON.stringify(IdList));

                var AttributeGroupList = [];
                
                var Incondition = "(";
                
                for (var i = 0; i < IdList.length; i++) {
                    Incondition += IdList[i];
                    Incondition += (i <= IdList.length - 2) ? "," : ")";
                }

                var AttributeGroupQuery = "SELECT DISTINCT AttributeGroupMasterEntity.AttributeGroupTypeId AS AttributeGroupTypeId FROM TemplateNode INNER JOIN AttributeGroupMasterEntity " +
                                              "ON AttributeGroupMasterEntity.Id = TemplateNode.ChildDbElementId AND TemplateNode.ServerId in " + Incondition;
                AttributeGroupList = window.OneViewSqlite.excecuteSqlReader(AttributeGroupQuery);
                AttributeGroupList = JSON.parse(AttributeGroupList);

                OneViewConsole.Debug("Response from GetAttributeGroupByAGTypeIds" + JSON.stringify(AttributeGroupList), "DefaultDCProfileDAO.GetAttributeGroupByAGTypeIds");
                OneViewConsole.Debug("GetAttributeGroupByAGTypeIds End", "DefaultDCProfileDAO.GetAttributeGroupByAGTypeIds");

                return AttributeGroupList;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetAttributeGroupByAGTypeIds", Excep);
            }
        }
        
        this.GetAttributeGroupTypeByServerIds = function (ServerIdList) {
            try {

                OneViewConsole.Debug("GetAttributeGroupTypeByServerIds Start", "DefaultDCProfileDAO.GetAttributeGroupTypeByServerIds");
                OneViewConsole.Debug("ServerIdList :", JSON.stringify(ServerIdList));

                var AttributeGroupTypeList = [];

                var Incondition = "(";

                for (var i = 0; i < ServerIdList.length; i++) {
                    Incondition += ServerIdList[i];
                    Incondition += (i <= ServerIdList.length - 2) ? "," : ")";
                }

                var AttributeGroupTypeQuery = "SELECT ServerId AS Id,Name FROM AttributeGroupType WHERE ServerId in " + Incondition;
                AttributeGroupTypeList = window.OneViewSqlite.excecuteSqlReader(AttributeGroupTypeQuery);
                AttributeGroupTypeList = JSON.parse(AttributeGroupTypeList);


                OneViewConsole.Debug("Response from GetAttributeGroupTypeByServerIds" + JSON.stringify(AttributeGroupTypeList), "DefaultDCProfileDAO.GetAttributeGroupTypeByServerIds");
                OneViewConsole.Debug("GetAttributeGroupTypeByServerIds End", "DefaultDCProfileDAO.GetAttributeGroupTypeByServerIds");

                return AttributeGroupTypeList;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetAttributeGroupTypeByServerIds", Excep);
            }
        }

        this.GetDCPlaceByType = function (TypeId) {
            try {
                OneViewConsole.Debug("GetDCPlaceByType Start", "DefaultDCProfileDAO.GetDCPlaceByType");

                var DCPlaceList = [];
                var DcPlaceQuery = "SELECT DISTINCT ServerId As Id,ChildDbElementName As Name FROM OrganizationAssetsNode WHERE ChildDbElementType =" + TypeId;

                DCPlaceList = window.OneViewSqlite.excecuteSqlReader(DcPlaceQuery);
                DCPlaceList = JSON.parse(DCPlaceList);
                
                OneViewConsole.Debug("GetDCPlaceByType End", "DefaultDCProfileDAO.GetDCPlaceByType");

                return DCPlaceList;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetDCPlaceByType", Excep);
            }
        }

        this.GetDCPlaceByTypeAndServerIds = function (TypeId, IdList) {
            try {
                OneViewConsole.Debug("GetDCPlaceByTypeAndServerIds Start", "DefaultDCProfileDAO.GetDCPlaceByTypeAndServerIds");

                var Incondition = "(";

                for (var i = 0; i < IdList.length; i++) {
                    Incondition += IdList[i].Id;
                    Incondition += (i <= IdList.length - 2) ? "," : ")";
                }

                var DCPlaceList = [];
                var DcPlaceQuery = "SELECT DISTINCT ServerId As Id,ChildDbElementName As Name FROM OrganizationAssetsNode WHERE ServerId IN " + Incondition;

                if (TypeId != null && TypeId != undefined && TypeId != "") {
                    DcPlaceQuery += " AND ChildDbElementType = " + TypeId;
                }

                //alert('DcPlaceQuery : ' + DcPlaceQuery);

                DCPlaceList = window.OneViewSqlite.excecuteSqlReader(DcPlaceQuery);
                DCPlaceList = JSON.parse(DCPlaceList);

                OneViewConsole.Debug("GetDCPlaceByTypeAndServerIds End", "DefaultDCProfileDAO.GetDCPlaceByTypeAndServerIds");

                return DCPlaceList;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetDCPlaceByTypeAndServerIds", Excep);
            }
        }

        this.GetDCTemplateByType = function (TypeId) {
            try {
                OneViewConsole.Debug("GetDCTemplateByType Start", "DefaultDCProfileDAO.GetDCTemplateByType");

                var DCTemplateList = [];
                var DcTemplateQuery = "SELECT DISTINCT ServerId As Id,ChildDbElementName As Name FROM TemplateNode WHERE ChildDbElementType =" + TypeId;

                ////Need to remove :: Later after template and template group childtype is inserted properly we'll remove it, currently this is to remove template group from template list
                //DcTemplateQuery += " AND ParentNodeId != 1";

                DCTemplateList = window.OneViewSqlite.excecuteSqlReader(DcTemplateQuery);
                DCTemplateList = JSON.parse(DCTemplateList);

                OneViewConsole.Debug("GetDCTemplateByType End", "DefaultDCProfileDAO.GetDCTemplateByType");

                return DCTemplateList;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetDCTemplateByType", Excep);
            }
        }

        this.GetDCTemplateByTypeAndServerIds_OLD_Structure = function (TypeId, IdList) {
            try {
                OneViewConsole.Debug("GetDCTemplateByTypeAndServerIds Start", "DefaultDCProfileDAO.GetDCTemplateByTypeAndServerIds");

                var Incondition = "(";

                //alert('IdList :' + JSON.stringify(IdList));
                for (var i = 0; i < IdList.length; i++) {
                    Incondition += IdList[i].Id;
                    Incondition += (i <= IdList.length - 2) ? "," : ")";
                }

                var DCTemplateList = [];
                var DCTemplateQuery = "SELECT DISTINCT ServerId As Id,ChildDbElementName As Name FROM TemplateNode WHERE ServerId IN " + Incondition;

                if (TypeId != null && TypeId != undefined && TypeId != "") {
                    DCTemplateQuery += " AND ChildDbElementType = " + TypeId;
                }

                //alert('DCTemplateQuery : ' + DCTemplateQuery);

                DCTemplateList = window.OneViewSqlite.excecuteSqlReader(DCTemplateQuery);
                DCTemplateList = JSON.parse(DCTemplateList);

                OneViewConsole.Debug("GetDCTemplateByTypeAndServerIds End", "DefaultDCProfileDAO.GetDCTemplateByTypeAndServerIds");

                return DCTemplateList;
            }
            catch (Excep) {
                //alert('Excep : ' + Excep + ", " + JSON.stringify(Excep));
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetDCTemplateByTypeAndServerIds", Excep);
            }
        }

        this.GetDCTemplateByTypeAndServerIds = function (TypeId, IdList) {
            try {
                OneViewConsole.Debug("GetDCTemplateByTypeAndServerIds Start", "DefaultDCProfileDAO.GetDCTemplateByTypeAndServerIds");

                var Incondition = "(";

                //alert('IdList :' + JSON.stringify(IdList));
                for (var i = 0; i < IdList.length; i++) {
                    Incondition += IdList[i].Id;
                    Incondition += (i <= IdList.length - 2) ? "," : ")";
                }

                var DCTemplateList = [];
                var DCTemplateQuery = "SELECT DISTINCT ServerId As Id,ChildDbElementName As Name FROM TemplateNode WHERE ServerId IN " + Incondition;

                ////if (TypeId != null && TypeId != undefined && TypeId != "") {
                ////    DCTemplateQuery += " AND ChildDbElementType = " + TypeId;
                ////}

                //alert('DCTemplateQuery : ' + DCTemplateQuery);

                DCTemplateList = window.OneViewSqlite.excecuteSqlReader(DCTemplateQuery);
                DCTemplateList = JSON.parse(DCTemplateList);

                OneViewConsole.Debug("GetDCTemplateByTypeAndServerIds End", "DefaultDCProfileDAO.GetDCTemplateByTypeAndServerIds");

                return DCTemplateList;
            }
            catch (Excep) {
                //alert('Excep : ' + Excep + ", " + JSON.stringify(Excep));
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetDCTemplateByTypeAndServerIds", Excep);
            }
        }

        this.GetDCPlaceParentByLeftRightAndParentTypeIdOLD = function (LeftRightList, TypeId) {
            try {
                OneViewConsole.Debug("GetDCPlaceParentByLeftRightAndParentTypeId Start", "DefaultDCProfileDAO.GetDCPlaceParentByLeftRightAndParentTypeId");

                var DCPlaceHierachyList = [];
                var DCPlaceHierachyQuery = "SELECT ServerId AS Id, ChildDbElementName AS Name FROM OrganizationAssetsNode WHERE ChildDbElementType = " + TypeId + " AND ";

                for (var i = 0; i < LeftRightList.length ; i++) {
                    DCPlaceHierachyQuery += "(Left <=" + LeftRightList[i].Left + "AND Right >= " + LeftRightList[i].Right + ") ";
                    DCPlaceHierachyQuery += (i <= LeftRightList.length - 2) ? "OR" : ")";
                }

                DCPlaceHierachyList = window.OneViewSqlite.excecuteSqlReader(DCPlaceHierachyQuery);
                DCPlaceHierachyList = JSON.parse(DCPlaceHierachyList);

                OneViewConsole.Debug("GetDCPlaceParentByLeftRightAndParentTypeId End", "DefaultDCProfileDAO.GetDCPlaceParentByLeftRightAndParentTypeId");

                return DCPlaceHierachyList;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetDCPlaceParentByLeftRightAndParentTypeId", Excep);
            }
        }

        this.GetDCPlaceParentByLeftRightAndParentTypeId = function (LeftRightList, TypeId, ParentNodeId) {
            try {
                OneViewConsole.Debug("GetDCPlaceParentByLeftRightAndParentTypeId Start", "DefaultDCProfileDAO.GetDCPlaceParentByLeftRightAndParentTypeId");

                var DCPlaceHierachyList = [];
                var DCPlaceHierachyQuery = "SELECT ServerId AS Id, ChildDbElementName AS Name FROM OrganizationAssetsNode WHERE ChildDbElementType = " + TypeId + " AND ";

                DCPlaceHierachyQuery += "(";

                for (var i = 0; i < LeftRightList.length ; i++) {
                    DCPlaceHierachyQuery += "(Left <=" + LeftRightList[i].Left + " AND Right >= " + LeftRightList[i].Right + ") ";
                    DCPlaceHierachyQuery += (i <= LeftRightList.length - 2) ? " OR " : "";
                }
              
                if (ParentNodeId != undefined && ParentNodeId != 0) {
                    var ParentNodeQuery = "SELECT Left,Right FROM OrganizationAssetsNode WHERE ServerId = " + ParentNodeId;
                    var ParentNoderesult = window.OneViewSqlite.excecuteSqlReader(ParentNodeQuery);
                    ParentNoderesult = JSON.parse(ParentNoderesult);

                    if (ParentNoderesult.length > 0) {
                        DCPlaceHierachyQuery += " AND (Left >= " + ParentNoderesult[0].Left + " And Right <= " + ParentNoderesult[0].Right + ")";
                    }

                }


                DCPlaceHierachyQuery += ")";

                //alert('DCPlaceHierachyQuery : ' + DCPlaceHierachyQuery);
                DCPlaceHierachyList = window.OneViewSqlite.excecuteSqlReader(DCPlaceHierachyQuery);
                DCPlaceHierachyList = JSON.parse(DCPlaceHierachyList);

                OneViewConsole.Debug("GetDCPlaceParentByLeftRightAndParentTypeId End", "DefaultDCProfileDAO.GetDCPlaceParentByLeftRightAndParentTypeId");

                return DCPlaceHierachyList;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetDCPlaceParentByLeftRightAndParentTypeId", Excep);
            }
        }


        this.GetDCPlaceLeftRightListByServerIds = function (IdList) {
            try {
                OneViewConsole.Debug("GetDCPlaceLeftRightListByServerIds Start", "DefaultDCProfileDAO.GetDCPlaceLeftRightListByServerIds");

                var Incondition = "(";

                for (var i = 0; i < IdList.length; i++) {
                    Incondition += IdList[i].Id;
                    Incondition += (i <= IdList.length - 2) ? "," : ")";
                }

                var DCPlaceLeftRightList = [];
                var DCPlaceLeftRightQuery = "SELECT Left,Right FROM OrganizationAssetsNode WHERE ServerId IN " + Incondition ;
                
                //alert(DCPlaceLeftRightQuery);
                DCPlaceLeftRightList = window.OneViewSqlite.excecuteSqlReader(DCPlaceLeftRightQuery);
                DCPlaceLeftRightList = JSON.parse(DCPlaceLeftRightList);

                OneViewConsole.Debug("GetDCPlaceLeftRightListByServerIds End", "DefaultDCProfileDAO.GetDCPlaceLeftRightListByServerIds");

                return DCPlaceLeftRightList;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetDCPlaceLeftRightListByServerIds", Excep);
            }
        }

        this.GetDCTemplateParentByLeftRightAndParentTypeIdOLD = function (LeftRightList, TypeId, ParentNodeId) {
            try {
                OneViewConsole.Debug("GetDCTemplateParentByLeftRightAndParentTypeId Start", "DefaultDCProfileDAO.GetDCTemplateParentByLeftRightAndParentTypeId");

                var DCTemplateHierachyList = [];
                var DCTemplateHierachyQuery = "SELECT ServerId AS Id, ChildDbElementName AS Name FROM TemplateNode WHERE ChildDbElementType = " + TypeId + " AND ";

                DCTemplateHierachyQuery += "(";

                for (var i = 0; i < LeftRightList.length ; i++) {
                    DCTemplateHierachyQuery += "(Left <=" + LeftRightList[i].Left + " AND Right >= " + LeftRightList[i].Right + ") ";
                    DCTemplateHierachyQuery += (i <= LeftRightList.length - 2) ? " OR " : "";
                }

                if (ParentNodeId != undefined && ParentNodeId != 0) {
                    var ParentNodeQuery = "SELECT Left,Right FROM TemplateNode WHERE ServerId = " + ParentNodeId;
                    var ParentNoderesult = window.OneViewSqlite.excecuteSqlReader(ParentNodeQuery);
                    ParentNoderesult = JSON.parse(ParentNoderesult);

                    if (ParentNoderesult.length > 0) {
                        DCTemplateHierachyQuery += " AND (Left >= " + ParentNoderesult[0].Left + " And Right <= " + ParentNoderesult[0].Right + ")";
                    }
                }

                DCTemplateHierachyQuery += ")";

                //alert('DCTemplateHierachyQuery : ' + DCTemplateHierachyQuery);

                DCTemplateHierachyList = window.OneViewSqlite.excecuteSqlReader(DCTemplateHierachyQuery);
                DCTemplateHierachyList = JSON.parse(DCTemplateHierachyList);

                OneViewConsole.Debug("GetDCTemplateParentByLeftRightAndParentTypeId End", "DefaultDCProfileDAO.GetDCTemplateParentByLeftRightAndParentTypeId");

                return DCTemplateHierachyList;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetDCTemplateParentByLeftRightAndParentTypeId", Excep);
            }
        }

        this.GetDCTemplateParentByLeftRightAndParentTypeId_OLD_Structure = function (LeftRightList, TypeId, ParentNodeId) {
            try {
                OneViewConsole.Debug("GetDCTemplateParentByLeftRightAndParentTypeId Start", "DefaultDCProfileDAO.GetDCTemplateParentByLeftRightAndParentTypeId");

                var DCTemplateHierachyList = [];
                var DCTemplateHierachyQuery = "SELECT ServerId AS Id, ChildDbElementName AS Name FROM TemplateNode WHERE ChildDbElementType = " + TypeId + " AND ";

                DCTemplateHierachyQuery += "(";

                for (var i = 0; i < LeftRightList.length ; i++) {
                    DCTemplateHierachyQuery += "(Left <=" + LeftRightList[i].Left + " AND Right >= " + LeftRightList[i].Right + ") ";
                    DCTemplateHierachyQuery += (i <= LeftRightList.length - 2) ? " OR " : "";
                }

                if (ParentNodeId != undefined && ParentNodeId != 0) {
                    var ParentNodeQuery = "SELECT Left,Right FROM TemplateNode WHERE ServerId = " + ParentNodeId;
                    var ParentNoderesult = window.OneViewSqlite.excecuteSqlReader(ParentNodeQuery);
                    ParentNoderesult = JSON.parse(ParentNoderesult);

                    if (ParentNoderesult.length > 0) {
                        DCTemplateHierachyQuery += " AND (Left >= " + ParentNoderesult[0].Left + " And Right <= " + ParentNoderesult[0].Right + ")";
                    }
                }

                DCTemplateHierachyQuery += ")";

                //alert('DCTemplateHierachyQuery : ' + DCTemplateHierachyQuery);

                DCTemplateHierachyList = window.OneViewSqlite.excecuteSqlReader(DCTemplateHierachyQuery);
                DCTemplateHierachyList = JSON.parse(DCTemplateHierachyList);

                OneViewConsole.Debug("GetDCTemplateParentByLeftRightAndParentTypeId End", "DefaultDCProfileDAO.GetDCTemplateParentByLeftRightAndParentTypeId");

                return DCTemplateHierachyList;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetDCTemplateParentByLeftRightAndParentTypeId", Excep);
            }
        }

        this.GetDCTemplateParentByLeftRightAndParentTypeId = function (LeftRightList, TypeId, ParentNodeId) {
            try {
                OneViewConsole.Debug("GetDCTemplateParentByLeftRightAndParentTypeId Start", "DefaultDCProfileDAO.GetDCTemplateParentByLeftRightAndParentTypeId");

                var DCTemplateHierachyList = [];
               
                var DCTemplateHierachyQuery = "SELECT temp.ServerId AS Id,temp.ChildDbElementName AS Name from TemplateNode AS temp INNER JOIN AttributeGroupMasterEntity AS AG on temp.ChildDbElementId = AG.ServerId " +
                "INNER JOIN AttributeGroupType AS AGT on AG.AttributeGroupTypeId = AGT.ServerId Where AGT.ServerId = " + TypeId;
                
                DCTemplateHierachyQuery += " AND (";

                for (var i = 0; i < LeftRightList.length ; i++) {
                    DCTemplateHierachyQuery += "(Left <=" + LeftRightList[i].Left + " AND Right >= " + LeftRightList[i].Right + ") ";
                    DCTemplateHierachyQuery += (i <= LeftRightList.length - 2) ? " OR " : "";
                }

                DCTemplateHierachyQuery += ")";
               

                //alert('DCTemplateHierachyQuery : ' + DCTemplateHierachyQuery);

                DCTemplateHierachyList = window.OneViewSqlite.excecuteSqlReader(DCTemplateHierachyQuery);
                DCTemplateHierachyList = JSON.parse(DCTemplateHierachyList);

                OneViewConsole.Debug("GetDCTemplateParentByLeftRightAndParentTypeId End", "DefaultDCProfileDAO.GetDCTemplateParentByLeftRightAndParentTypeId");

                return DCTemplateHierachyList;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetDCTemplateParentByLeftRightAndParentTypeId", Excep);
            }
        }

        this.GetDCTemplateLeftRightListByServerIds = function (IdList) {
            try {
                OneViewConsole.Debug("GetDCTemplateLeftRightListByServerIds Start", "DefaultDCProfileDAO.GetDCTemplateLeftRightListByServerIds");

                var Incondition = "(";

                for (var i = 0; i < IdList.length; i++) {
                    Incondition += IdList[i].Id;
                    Incondition += (i <= IdList.length - 2) ? "," : ")";
                }

                var DCTemplateLeftRightList = [];
                var DCTemplateLeftRightQuery = "SELECT Left,Right FROM TemplateNode WHERE ServerId IN " + Incondition;
                
                //alert(DCTemplateLeftRightQuery);
                DCTemplateLeftRightList = window.OneViewSqlite.excecuteSqlReader(DCTemplateLeftRightQuery);
                DCTemplateLeftRightList = JSON.parse(DCTemplateLeftRightList);

                OneViewConsole.Debug("GetDCTemplateLeftRightListByServerIds End", "DefaultDCProfileDAO.GetDCTemplateLeftRightListByServerIds");

                return DCTemplateLeftRightList;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetDCTemplateLeftRightListByServerIds", Excep);
            }
        }

        this.GetTemplateTypeByServerIdList = function (IdList) {
            try {
                OneViewConsole.Debug("GetTemplateTypeByServerIdList Start", "DefaultDCProfileDAO.GetTemplateTypeByServerIdList");

                var Incondition = "(";

                for (var i = 0; i < IdList.length; i++) {
                    Incondition += IdList[i];
                    Incondition += (i <= IdList.length - 2) ? "," : ")";
                }

                var TemplateTypeList = [];
                var Query = "SELECT DISTINCT ChildDbElementType FROM TemplateNode WHERE ServerId IN " + Incondition;
                                
                //alert('Query : ' + Query);

                TemplateTypeList = window.OneViewSqlite.excecuteSqlReader(Query);
                TemplateTypeList = JSON.parse(TemplateTypeList);

                OneViewConsole.Debug("GetTemplateTypeByServerIdList End", "DefaultDCProfileDAO.GetTemplateTypeByServerIdList");

                return TemplateTypeList;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetTemplateTypeByServerIdList", Excep);
            }
        }

        this.GetTemplateTypeByServerId = function (Id) {
            try {
                OneViewConsole.Debug("GetTemplateTypeByServerId Start", "DefaultDCProfileDAO.GetTemplateTypeByServerId");

                var TemplateType = null;
                var Query = "SELECT ChildDbElementType FROM TemplateNode WHERE ServerId = " + Id;

                //alert('Query : ' + Query);

                TemplateType = window.OneViewSqlite.excecuteSqlReader(Query);
                TemplateType = JSON.parse(TemplateType);

                OneViewConsole.Debug("GetTemplateTypeByServerId End", "DefaultDCProfileDAO.GetTemplateTypeByServerId");

                return TemplateType;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetTemplateTypeByServerId", Excep);
            }
        }

        this.GetPlaceTypeByServerIdList = function (IdList) {
            try {
                OneViewConsole.Debug("GetPlaceTypeByServerIdList Start", "DefaultDCProfileDAO.GetPlaceTypeByServerIdList");

                var Incondition = "(";

                for (var i = 0; i < IdList.length; i++) {
                    Incondition += IdList[i];
                    Incondition += (i <= IdList.length - 2) ? "," : ")";
                }

                var PlaceTypeList = [];
                var Query = "SELECT DISTINCT ChildDbElementType FROM OrganizationAssetsNode WHERE ServerId IN " + Incondition;

                //alert('Query : ' + Query);

                PlaceTypeList = window.OneViewSqlite.excecuteSqlReader(Query);
                PlaceTypeList = JSON.parse(PlaceTypeList);

                OneViewConsole.Debug("GetPlaceTypeByServerIdList End", "DefaultDCProfileDAO.GetPlaceTypeByServerIdList");

                return PlaceTypeList;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetPlaceTypeByServerIdList", Excep);
            }
        }

        this.GetPlaceTypeByServerId = function (Id) {
            try {
                OneViewConsole.Debug("GetPlaceTypeByServerId Start", "DefaultDCProfileDAO.GetPlaceTypeByServerId");

                var TemplateType = null;
                var Query = "SELECT ChildDbElementType FROM TemplateNode WHERE ServerId = " + Id;

                //alert('Query : ' + Query);

                TemplateType = window.OneViewSqlite.excecuteSqlReader(Query);
                TemplateType = JSON.parse(TemplateType);

                OneViewConsole.Debug("GetPlaceTypeByServerId End", "DefaultDCProfileDAO.GetPlaceTypeByServerId");

                return TemplateType;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetPlaceTypeByServerId", Excep);
            }
        }

        this.GetDCAttributeGroupTypes = function (LeftRightList) {
            try {
                OneViewConsole.Debug("GetDCAttributeGroupTypes Start", "DefaultDCProfileDAO.GetDCAttributeGroupTypes");

                var DCAttributeGroupTypeList = [];

                var DCAttributeGroupTypeQuery = "SELECT AGT.ServerId AS Id,AGT.Name AS Name from TemplateNode AS temp INNER JOIN AttributeGroupMasterEntity AS AG on temp.ChildDbElementId = AG.ServerId " +
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

                OneViewConsole.Debug("GetDCAttributeGroupTypes End", "DefaultDCProfileDAO.GetDCAttributeGroupTypes");

                return DCAttributeGroupTypeList;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetDCAttributeGroupTypes", Excep);
            }
        }

    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("DAO", "DAO.DefaultDCProfileDAO", Excep);
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

    this.GetDcProfileByOccurence = function (DcPlaceDimension, TemplateNodeId, DcPlaceId) {
        try {
            OneViewConsole.Debug("GetDcProfileByOccurence START", "NewDcFacade.GetDcProfileByOccurence");
            var CurrentShift = new LVShiftHandler().GetCurrentShift();


            ////Start time
            //var start = new Date();
            oDcProfileList = MyInstance.GetDcProfile(ServiceId, UserId, DcPlaceDimension, CurrentShift.Id, TemplateNodeId, DcPlaceId);

            ////end time
            //var end = new Date();
            //var diff = end - start;
            //alert('GetDcProfileByOccurence oDcProfileList.length : ' + oDcProfileList.length+  ' start :' + start + ",        end: " + end + ",       diff: " + diff);


            //Get DcProfiles by occurence
            var oCopyDcProfileList = clone(oDcProfileList);

            var Profiles = [];

            for (var i = 0; i < oCopyDcProfileList.length ; i++) {
                MyInstance.UpdateDcProfileByOccurence(oCopyDcProfileList[i], CurrentShift);
            }

            OneViewConsole.Debug("GetDcProfileByOccurence End", "NewDcFacade.GetDcProfileByOccurence");

            return oDcProfileList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DcScheduleCheckingComponent", "DcScheduleCheckingComponent.GetDcProfileByOccurence", Excep);
        }
    }

    this.CheckIsAnyValidProfileExists = function (DcPlaceDimension, TemplateNodeId, DcPlaceId) {
        try {
            OneViewConsole.Debug("GetDcProfileByOccurence START", "NewDcFacade.GetDcProfileByOccurence");

            var IsProfileExists = false;
            var CurrentShift = new LVShiftHandler().GetCurrentShift();

            oDcProfileList = MyInstance.GetDcProfile(ServiceId, UserId, DcPlaceDimension, CurrentShift.Id, TemplateNodeId, DcPlaceId);

            var oCopyDcProfileList = clone(oDcProfileList);

            for (var i = 0; i < oCopyDcProfileList.length ; i++) {
                var CurrentDcProfile = oCopyDcProfileList[i];
                var count = MyInstance.GetDcCountByDcProfile(CurrentDcProfile.DcPlaceId, CurrentDcProfile.TemplateNodeId, CurrentShift, CurrentDcProfile.CustomPlaceName,
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

            var query = "SELECT  DcProfileEntity.*, DcProfileEntity.ServerId AS DcProfileServerId ," +
                            "(SUBSTR(DefaultScheduleEntity.StartDate, 7, 4) || SUBSTR(DefaultScheduleEntity.StartDate, 4, 2) || SUBSTR(DefaultScheduleEntity.StartDate, 1, 2) || SUBSTR(DefaultScheduleEntity.StartDate, 12, 2) || " +
                           " SUBSTR(DefaultScheduleEntity.StartDate, 15, 2) || SUBSTR(DefaultScheduleEntity.StartDate, 18, 2) ) AS SD ,(SUBSTR(DefaultScheduleEntity.EndDate, 7, 4) ||SUBSTR(DefaultScheduleEntity.EndDate, 4, 2) ||" +
                           "SUBSTR(DefaultScheduleEntity.EndDate, 1, 2) || SUBSTR(DefaultScheduleEntity.EndDate, 12, 2) || SUBSTR(DefaultScheduleEntity.EndDate, 15, 2) || SUBSTR(DefaultScheduleEntity.EndDate, 18, 2) ) AS ED," +
                           "(SUBSTR(DefaultScheduleEntity.FromTime, 1, 2) || SUBSTR(DefaultScheduleEntity.FromTime, 4, 2) || SUBSTR(DefaultScheduleEntity.FromTime, 7, 2) ) AS FT, ( SUBSTR(DefaultScheduleEntity.ToTime, 1, 2) || " +
                          " SUBSTR(DefaultScheduleEntity.ToTime, 4, 2) || SUBSTR(DefaultScheduleEntity.ToTime, 7, 2) ) AS TT , DefaultScheduleEntity.* FROM DcProfileEntity " +
                           "INNER JOIN  DefaultScheduleEntity on DcProfileEntity.Id=DefaultScheduleEntity.DcProfileId  WHERE DcUserId=" + UserId + " and " +
                           "DcProfileEntity.ServiceId=" + ServiceId + " and (-1=" + DcPlaceDimension + " or  DcProfileEntity.DcPlaceDimension = " + DcPlaceDimension + ")" +
                           "AND (-1=" + TemplateNodeId + " or  DcProfileEntity.TemplateNodeId=" + TemplateNodeId + ") AND (-1=" + DcPlaceId + " or  DcProfileEntity.DcPlaceId=" + DcPlaceId + ")" +
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
            var CurrentUserDcProfiles = MyInstance.GetDcProfile(ServiceId, UserId, -1, CurrentShift.Id, TemplateNodeId, DcPlaceId);

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

    this.UpdateDcProfileByOccurence = function (CurrentDcProfile, CurrentShift) {
        try {
            OneViewConsole.Debug("UpdateDcProfileByOccurence Start", "DcScheduleCheckingComponent.UpdateDcProfileByOccurence");

            //alert('CurrentDcProfile :' + JSON.stringify(CurrentDcProfile));
            ////oDcProfileList contains : TemplateNodeId,DcPlaceId,ServerId,ReccurenceId,Occurence,DcProfileId ,(and some other columns too)
            var count = MyInstance.GetDcCountByDcProfile(CurrentDcProfile.DcPlaceId, CurrentDcProfile.TemplateNodeId, CurrentShift, CurrentDcProfile.CustomPlaceName,
                CurrentDcProfile.StartDate, CurrentDcProfile.EndDate, CurrentDcProfile.FromTime, CurrentDcProfile.ToTime);
            //alert('count ' + count);
            if (CurrentDcProfile.Occurence != -1 && CurrentDcProfile.Occurence <= count) {
                for (var i = 0; i < oDcProfileList.length; i++) {
                    if (oDcProfileList[i].Id == CurrentDcProfile.Id) {
                        oDcProfileList.splice(i, 1);
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

    this.GetDcCountByDcProfile = function (DcPlaceId, TemplateNodeId, CurrentShift, DcPlaceName, SD, ED, FT, TT) {
        try {
            OneViewConsole.Debug("GetDcCountByDcProfile Start", "DcScheduleCheckingComponent.GetDcCountByDcProfile");

            var ParamRequest = {
                'ServiceId': ServiceId, 'SystemUserId': UserId,
                'DcPlaceId': DcPlaceId, 'DcPlaceName': DcPlaceName, 'TemplateNodeId': TemplateNodeId,
                'ShiftId': CurrentShift.Id, 'SD': SD, 'ED': ED, 'FT': FT, 'TT': TT
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
///////////////////////////////////////************************* New DC Page Dynamic Generation END *************************///////////////////////////////////////




