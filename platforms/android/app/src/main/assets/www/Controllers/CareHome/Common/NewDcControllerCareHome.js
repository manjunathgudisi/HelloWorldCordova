
//Description : Start the New DC(Audit) based on the Template,Dc Place and Date.


/// <param name="$scope">Current scope</param>
/// <param name="xlatService">xlatService for globalization</param>
/// <param name="toaster">toaster for toast messages</param>
/// <param name="SpinService">SpinService for loader</param>
/// <param name="ionicModal">UI Framework for design and style</param>
/// <param name="$state">Used for redirection from one page to another page</param>


var NewDcPlaceWiseTemplateList = [];
var GlobalDcProfileList = [];
var scope;
MyApp.controller('NewDCCtrl', function ($scope, $location, xlatService) {
   // xlatService.setCurrentPage('NewDC_Page');
    xlatService.setCurrentPage('9');
    scope = $scope;
    OneViewSessionStorage.Save("PageID", "newdc");

   // OneViewSessionStorage.Set("PageID") = 'newdc'
    document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');
    var oNewDcFacade = new NewDcFacade($scope, $location, xlatService, '', '');

    //Description : Call the pageload function for loading all dropdowns
    //oSetDefaultSpinner.Start();
    oNewDcFacade.PageLoad();
    //oSetDefaultSpinner.Stop();

    /// <summary>
    /// NewDc onchange event registration
    /// while end user click the NewDc, this event will invoke
    /// </summary>
    $scope.NewDc = function () {
        oNewDcFacade.NewDc();
    };

    //code need to refactor with ,new ddl nd coding standerd
    $scope.FaciltyChangeEvent = function (Facility) {
        //alert('Facility ' + JSON.stringify(Facility));
        //$scope.Facility = Facility;
        //oNewDcFacade.SelectedChange();
    }


    //code need to refactor with ,new ddl nd coding standerd
    $scope.TemplateChangeEventOLD = function (Template) {
        $scope.Template = Template;
    }

    $scope.TemplateChangeEvent = function (Template) {
        oNewDcFacade.TemplateSelectedChange();
    }

    //$scope.$on('$destroy', function () {
    //  //  alert('NewDCCtrl $destroy start');
    //    oOneViewAppInfoPlugin.ClearCache();
    //    $scope = null;
    //    oNewDcFacade = null;
    //});

    $scope.TemplateGroupChangeEvent = function (TemplateGroup) {
      
        oNewDcFacade.TemplateGroupSelectedChange();
    }

    $scope.LoadDDL = function (DcPlaceDimensions, RCOType) {
  
        //alert('DcPlaceDimensions' + JSON.stringify(DcPlaceDimensions))
        //alert('RCOType' + RCOType)
        oNewDcFacade.LoadDDL(DcPlaceDimensions, RCOType);
    }
})


/// <summary>
/// Facade Layer :NewDcFacade
/// </summary>
function NewDcFacade($scope, $location, xlatService, toaster, SpinService) {

    var oMyInstance = this;

    //Description : Set the Default DAO to be called.
    this.DCProfileDAOKey = "DefaultDCProfileDAO";
    var oDateTime = new DateTime();
    var CurrenntDateAndTime = oDateTime.GetDateAndTime();

    //Description : Get the ServiceId and UserId from session stroage.
    var UserId = OneViewSessionStorage.Get("LoginUserId");
    var ServiceId = OneViewSessionStorage.Get("ServiceId");
    var oDCProfileDAOObj = new NewDCFactory(oMyInstance.DCProfileDAOKey);
    var oNewDcPresenter = new NewDcPresenter($scope);
    $scope.DcPlaceDimensions = [];//[{ Id: DATEntityType.RCOMaster_Unit, Name: "Unit", ControlId: "chkUnit", 'ColourIndex': 'green' }, { Id: DATEntityType.RCOMaster_Supplier, Name: "Supplier", ControlId: "chkSupplier", 'ColourIndex': 'green' }, { Id: DATEntityType.RCOMaster_FandBOutLet, Name: "FandBOutLet", ControlId: "chkFandBOutLet", 'ColourIndex': 'green' }, { Id: DATEntityType.RCOMaster_Location, Name: "Location", ControlId: "chkFandBOutLet", 'ColourIndex': 'green' }];
    

    /// <summary>
    /// PageLoad : It Used for calling the DAO for setting the dropdowns values onload.
    /// </summary>
    this.PageLoad = function () {
        try {
            OneViewConsole.Debug("PageLoad Start", "NewDcFacade.PageLoad");

            var CurrentShift = new LVShiftHandler().GetCurrentShift();


            var oDcScheduleCheckingComponent = new DcScheduleCheckingComponent();
            //TemplateNodeId,DcPlaceId,ServerId,ReccurenceId,Occurence,DcProfileId ,(and some other columns too)
            var DcProfileList = oDcScheduleCheckingComponent.GetDcProfileByOccurence(-1, -1, -1);

            GlobalDcProfileList = DcProfileList;



            var DcPlaceIdDetailsList = oMyInstance.GetDcPlaces();

            oNewDcPresenter.PageLoad($scope, $location, xlatService, '', '');
        
            //var ochkDcPlaceDimensions = new AnswerModeUserControl({ 'Scope': $scope, 'ControlId': 'chkDcPlaceDimensions', 'DataSourceModelName': 'DcPlaceDimensions', 'DisplayElementModelName': 'NewDCModel.chkDcPlaceDimensions' });
            //$scope.DcPlaceDimensions = [];

          
            //oMyInstance.LoadDDL(-1, $scope.DcPlaceDimensions[0].Id, DcPlaceIdDetailsList);

            oMyInstance.LoadDDL(-1, "");

            OneViewConsole.Debug("PageLoad End", "NewDcFacade.PageLoad");

        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "NewDcFacade.PageLoad", xlatService);
        }
    }
        
    this.LoadDDL = function (DcPlaceDimensions, RCOType) {
        try {
            OneViewConsole.Debug("LoadDDL Start", "NewDcFacade.LoadDDL");
            var CurrentShift = new LVShiftHandler().GetCurrentShift();

            //GetAuditTemplate : parameters not mandatory
            var TemplateData = oDCProfileDAOObj.GetAuditTemplate();
            NewDcPlaceWiseTemplateList = oNewDcPresenter.Template(TemplateData);
            //alert('LoadDDL NewDcPlaceWiseTemplateList ' + JSON.stringify(NewDcPlaceWiseTemplateList));

            var TemplateGroupList = oDCProfileDAOObj.GetAuditTemplateGroup(TemplateData);
            oNewDcPresenter.TemplateGroup(TemplateGroupList);
            
            var TemplateList = oDCProfileDAOObj.GetAuditTemplateBasedOnTemplateGroup($scope.TemplateGroup.Id);
            oNewDcPresenter.Template(TemplateList);

            var FaciltyData = oDCProfileDAOObj.GetDCPlaceByTemplate($scope.TemplateList[0].Id);
            oNewDcPresenter.Facility(FaciltyData);
                 
            //Get based on place loaded Dimensions
            var DimensionDetails = oDCProfileDAOObj.GetDCPlaceDimension(FaciltyData);
            //Set the label name for DcPlace 
            var DcPlaceDimension = DimensionDetails[0]['ChildDbElementType'];
            SetDcPlaceLabelName(DcPlaceDimension);

            OneViewConsole.Debug("LoadDDL End", "NewDcFacade.LoadDDL");

        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "NewDcFacade.LoadDDL", xlatService);
        }
    }

    var SetDcPlaceLabelName = function (DcPlaceDimension) {
        try {
            var ChildDbElementName = GetChildDbElementTypeName(DcPlaceDimension);
            $scope.PlaceData = ChildDbElementName;
        }
        catch (Excep) {
            throw Excep;
        }
    }

    var GetChildDbElementTypeName = function (ChildDbElementType) {

        try {
            var ChildDbElementName = "";
                        
            if (ChildDbElementType == 201) {
                ChildDbElementName = ChildDbElementName + "Site";
            }
            else if (ChildDbElementType == 202) {
                ChildDbElementName = ChildDbElementName + "Zone";
            }
            else if (ChildDbElementType == 203) {
                ChildDbElementName = ChildDbElementName + "Room";
            }
            else {
                ChildDbElementName = "Select";
            }

            return ChildDbElementName;
        }
        catch (Excep) {
            throw Excep;
        }
    }

    this.SelectedChange = function () {
        try {
            OneViewConsole.Debug("SelectedChange Start", "NewDcFacade.SelectedChange");

            var TemplateData = oDCProfileDAOObj.GetAuditTemplate($scope.Facility.Id, $scope.Facility.Name);
            NewDcPlaceWiseTemplateList = oNewDcPresenter.Template(TemplateData);

            var TemplateGroupList = oDCProfileDAOObj.GetAuditTemplateGroup(TemplateData);
            oNewDcPresenter.TemplateGroup(TemplateGroupList);

            //to Load template for the displayed template group
            var TemplateList = oDCProfileDAOObj.GetAuditTemplateBasedOnTemplateGroup($scope.TemplateGroup.Id);
            oNewDcPresenter.Template(TemplateList);

            RefreshDropDowns();
            
            OneViewConsole.Debug("SelectedChange End", "NewDcFacade.SelectedChange");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "NewDcFacade.SelectedChange", xlatService);
        }
    }

    this.TemplateGroupSelectedChange = function (TemplateGroupId) {
        try {
            OneViewConsole.Debug("TemplateGroupSelectedChange Start", "NewDcFacade.TemplateGroupSelectedChange");

            var TemplateList = oDCProfileDAOObj.GetAuditTemplateBasedOnTemplateGroup($scope.TemplateGroup.Id);
            oNewDcPresenter.Template(TemplateList);

            var FaciltyData = oDCProfileDAOObj.GetDCPlaceByTemplate(TemplateList[0].Id);
            oNewDcPresenter.Facility(FaciltyData);

            //Get based on place loaded Dimensions
            var DimensionDetails = oDCProfileDAOObj.GetDCPlaceDimension(FaciltyData);
            //Set the label name for DcPlace 
            var DcPlaceDimension = DimensionDetails[0]['ChildDbElementType'];
            SetDcPlaceLabelName(DcPlaceDimension);

            OneViewConsole.Debug("TemplateGroupSelectedChange End", "NewDcFacade.TemplateGroupSelectedChange");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "NewDcFacade.TemplateGroupSelectedChange", xlatService);
        }
    }

    this.TemplateSelectedChange = function (TemplateId) {
        try {
            OneViewConsole.Debug("TemplateSelectedChange Start", "NewDcFacade.TemplateSelectedChange");
           
            var FaciltyData = oDCProfileDAOObj.GetDCPlaceByTemplate($scope.Template.Id);
            oNewDcPresenter.Facility(FaciltyData);
            
            //Get based on place loaded Dimensions
            var DimensionDetails = oDCProfileDAOObj.GetDCPlaceDimension(FaciltyData);
            //Set the label name for DcPlace 
            var DcPlaceDimension = DimensionDetails[0]['ChildDbElementType'];
            SetDcPlaceLabelName(DcPlaceDimension);

            OneViewConsole.Debug("TemplateSelectedChange End", "NewDcFacade.TemplateSelectedChange");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "NewDcFacade.TemplateSelectedChange", xlatService);
        }
    }


    var RefreshDropDowns = function () {
        try {
            OneViewConsole.Debug("RefreshDropDowns Start", "NewDcFacade.RefreshDropDowns");
            var CurrentShift = new LVShiftHandler().GetCurrentShift();

            //Get Dc Profile list length before checking
            var oProfileCountBefore = GlobalDcProfileList.length
            //Update DcProfileList based on place selected and template shown
             oMyInstance.UpdateDcProfileByOccurence($scope.Facility.Id, $scope.Template.Id, CurrentShift);

            if (oProfileCountBefore > GlobalDcProfileList.length) {
                //Get DcPlaceIds
                var DcPlaceIdDetailsList = oMyInstance.GetDcPlaces();

                //Load Place
                var FaciltyData = oDCProfileDAOObj.GetDCPlace(DcPlaceIdDetailsList, $scope.DcPlaceDimensions[0].Id);
                oNewDcPresenter.Facility(FaciltyData);

                //Load Template
                var TemplateData = oDCProfileDAOObj.GetAuditTemplate($scope.Facility.Id, $scope.Facility.Name);
                NewDcPlaceWiseTemplateList = oNewDcPresenter.Template(TemplateData);

                //Get TemplateGroup based on Template
                //alert('TemplateData : '+ JSON.stringify(TemplateData));
                var TemplateGroupList = oDCProfileDAOObj.GetAuditTemplateGroup(TemplateData);

                //Load TemplateGroup based on Template
                //  alert('TemplateGroupList : ' + JSON.stringify(TemplateGroupList));
                oNewDcPresenter.TemplateGroup(TemplateGroupList);

                //to Get template for the displayed template group
                var TemplateList = oDCProfileDAOObj.GetAuditTemplateBasedOnTemplateGroup($scope.TemplateGroup.Id);

                //Load Template
                // alert('TemplateList ag : ' + JSON.stringify(TemplateList));
                oNewDcPresenter.Template(TemplateList);

                OneViewSessionStorage.Save("DcPlaceId", $scope.Facility.Id);
                OneViewSessionStorage.Save("DcPlaceName", $scope.Facility.Name);

                OneViewSessionStorage.Save("TemplateId", $scope.Template.Id);
                OneViewSessionStorage.Save("TemplateName", $scope.Template.Name);
            }

            OneViewConsole.Debug("RefreshDropDowns End", "NewDcFacade.RefreshDropDowns");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "NewDcFacade.RefreshDropDowns", xlatService);
        }
    }

    /// <summary>
    /// NewDc : It is used for calling a function to save dropdown values to session stroage and showing the next page.
    /// </summary>

    this.NewDc = function () {
        try {
            OneViewConsole.Debug("NewDc Start", "NewDcFacade.NewDc");

            //SpinService.ShowSpin();
            if ($scope.Facility == '' || $scope.Facility == undefined) {
                // toaster.pop('warning', xlatService.xlat('Title_Warning'), xlatService.xlat('SelectFacility'));
            }
            else if ($scope.Template == '' || $scope.Template == undefined) {
                //  toaster.pop('warning', xlatService.xlat('Title_Warning'), xlatService.xlat('SelectTemplate'));
            }
            else {

                oDCProfileDAOObj.SetDcVariables($scope);

                oNewDcPresenter.LoadNewAuditDc($location);
            }
            //SpinService.HideSpin();

            OneViewConsole.Debug("NewDc Start", "NewDcFacade.NewDc");

        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "NewDcFacade.NewDc", xlatService);
        }
    }


    this.GetDcPlaces = function () {
        try {
            OneViewConsole.Debug("GetDcPlaces Start", "NewDcFacade.GetDcPlaces");
            var DcPlaceIdList = [];
            var DcPlaceIdDetailsList = [];


            for (var i = 0; i < GlobalDcProfileList.length; i++) {
               // alert('GlobalDcProfileList[i].DcPlaceId' + GlobalDcProfileList[i].DcPlaceId);
                var DcPlaceDetails = { 'DcPlaceId': 0, 'CustomPlaceName': '' };
                //if (GlobalDcProfileList[i].DcPlaceId == 0) {
                //    DcPlaceDetails.DcPlaceId = 0;
                //    DcPlaceDetails.CustomPlaceName = GlobalDcProfileList[i].CustomPlaceName;
                //    DcPlaceIdDetailsList.push(DcPlaceDetails);
                //}
                //else
                    if (DcPlaceIdList.indexOf(GlobalDcProfileList[i].DcPlaceId) == -1) {
                    DcPlaceIdList.push(GlobalDcProfileList[i].DcPlaceId)
                    DcPlaceDetails.DcPlaceId = GlobalDcProfileList[i].DcPlaceId;
                    DcPlaceDetails.CustomPlaceName = '';
                    DcPlaceIdDetailsList.push(DcPlaceDetails);
                }

                   // alert('DcPlaceDetails : '+  JSON.stringify(DcPlaceDetails));
            }

            OneViewConsole.Debug("GetDcPlaces End", "NewDcFacade.GetDcPlaces");

            return DcPlaceIdDetailsList;

        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "NewDcFacade.GetDcPlaces", xlatService);
        }

    }

    this.UpdateDcProfileByOccurence = function (DcPlaceId, TemplateNodeId, CurrentShift, DcPlaceName) {
        try {
            OneViewConsole.Debug("UpdateDcProfileByOccurence Start", "NewDcFacade.UpdateDcProfileByOccurence");

            //Get Profile for particular config
            var CurrentUserDcProfiles = oDCProfileDAOObj.GetDcProfile(ServiceId, UserId, -1, CurrentShift.Id, TemplateNodeId, DcPlaceId);
         

            for (var j = 0; j < CurrentUserDcProfiles.length ; j++) {
                ////GlobalDcProfileList contains : TemplateNodeId,DcPlaceId,ServerId,ReccurenceId,Occurence,DcProfileId ,(and some other columns too)
                var count = oMyInstance.GetDcCountByDcProfile(DcPlaceId, TemplateNodeId, CurrentShift, DcPlaceName, CurrentUserDcProfiles[j].SD, CurrentUserDcProfiles[j].ED, CurrentUserDcProfiles[j].FT, CurrentUserDcProfiles[j].TT);
               // alert(CurrentUserDcProfiles[j].Occurence + "<= Occurence , count => " + count);
               // alert(CurrentUserDcProfiles[j].Occurence + "<= Occurence , count => " + count);
                if (CurrentUserDcProfiles[j].Occurence != -1 && CurrentUserDcProfiles[j].Occurence <= count) {
                    for (var i = 0; i < GlobalDcProfileList.length; i++) {
                      //  alert(" GlobalDcProfileList[i] : " + JSON.stringify(GlobalDcProfileList[i]) + 'CurrentUserDcProfiles[j] : ' + JSON.stringify(CurrentUserDcProfiles[j]));
                        if (GlobalDcProfileList[i].Id == CurrentUserDcProfiles[j].Id) {
                            GlobalDcProfileList.splice(i, 1);
                        }
                    }
                }
            }

            OneViewConsole.Debug("UpdateDcProfileByOccurence End", "NewDcFacade.UpdateDcProfileByOccurence");
           
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "NewDcFacade.UpdateDcProfileByOccurence", xlatService);
        }
    }

    this.GetDcCountByDcProfile = function (DcPlaceId, TemplateNodeId, CurrentShift, DcPlaceName, SD, ED, FT, TT) {
        try {
            OneViewConsole.Debug("GetDcCountByDcProfile Start", "NewDcFacade.GetDcCountByDcProfile");

            var ParamRequest = {
                'ServiceId': ServiceId, 'SystemUserId': UserId,
                'DcPlaceId': DcPlaceId, 'DcPlaceName': DcPlaceName, 'TemplateNodeId': TemplateNodeId,
                'ShiftId': CurrentShift.Id, 'SD': SD, 'ED': ED, 'FT': FT, 'TT': TT
            }
           
            //Get DcCount for particular user
            var DcInfoList = new DcDAO().GetAllDcInfoWithSchedule(ParamRequest);

           // alert('DcInfoList : ' + JSON.stringify(DcInfoList));
           // alert('DcInfoList.length : ' + DcInfoList.length);
            OneViewConsole.Debug("GetDcCountByDcProfile End", "NewDcFacade.GetDcCountByDcProfile");

            return DcInfoList.length;

        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "NewDcFacade.GetDcCountByDcProfile", xlatService);
        }
    }
   



}

/// <summary>
/// Presenter : It is used for normalizing the data and pushing to HTML for view.
/// </summary>

function NewDcPresenter($scope) {
    try {

        this.PageLoad = function ($scope, $state, xlatService, toaster, SpinService) {
            try {
                OneViewConsole.Debug("PageLoad Start", "NewDcPresenter.PageLoad");


                OneViewConsole.Debug("PageLoad End", "NewDcPresenter.PageLoad");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Presenter", "NewDcPresenter.PageLoad", Excep);
            }
        }

        this.Facility = function (FaciltyData) {
            try {
                OneViewConsole.Debug("Facility Start", "NewDcPresenter.Facility");

                $scope.FacilityList = [];
                for (i = 0; i < FaciltyData.length ; i++) {
                    $scope.FacilityList.push({ "Id": FaciltyData[i].Id, "Name": FaciltyData[i].Name });
                }
                
                $scope.Facility = $scope.FacilityList[0];

                OneViewConsole.Debug("Facility End", "NewDcPresenter.Facility");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Presenter", "NewDcPresenter.Facility", Excep);
            }
        }

        this.Template = function (TemplateData) {
            try {
                OneViewConsole.Debug("Template Start", "NewDcPresenter.Template");

                $scope.TemplateList = [];

                for (i = 0; i < TemplateData.length ; i++) {
                    $scope.TemplateList.push({ "Id": TemplateData[i].Id, "Name": TemplateData[i].Name });
                }

               // $scope.TemplateList.push({ "Id": "282", "Name": "Cold Meal Dishing Verification Template" });
               // $scope.TemplateList.push({ "Id": "293", "Name": "Aircraft Loading Verification Template" });

               // $scope.TemplateList.push({ "Id": "325", "Name": "Cooking Blast Chilling Monitoring Form - EKFC 2 - Rev 13 (HYG 03A)" });
               // $scope.TemplateList.push({ "Id": "342", "Name": "Cooking Blast Chilling Verification Form - EKFC 2 - Rev 11 (HYG 03)" });

                //$scope.TemplateList.push({ "Id": "620", "Name": "Media Preparation Report-Rev 1 - (ML-FRM- 016)" });
                //$scope.TemplateList.push({ "Id": "609", "Name": "Laminar Air Flow Monitoring-Rev 1 - (ML-FRM- 010)" });
                //$scope.TemplateList.push({ "Id": "634", "Name": "Monthly Verification of Weighing Balance- Rev 1 - (ML-FRM- 018)" });

               // $scope.TemplateList.push({ "Id": "1369", "Name": "Sampling Sheet and Food Analysis" });
                //$scope.TemplateList.push({ "Id": "1529", "Name": "Sampling Sheet and Water Analysis" });
                
                $scope.Template = $scope.TemplateList[0];

                
                
                OneViewConsole.Debug("Template End", "NewDcPresenter.Template");

                return $scope.TemplateList;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Presenter", "NewDcPresenter.Template", Excep);
            }
        }

        this.TemplateGroup = function (TemplateGroupData) {
            try {
                OneViewConsole.Debug("TemplateGroup Start", "NewDcPresenter.TemplateGroup");

                $scope.TemplateGroupList = [];

                for (i = 0; i < TemplateGroupData.length ; i++) {
                    $scope.TemplateGroupList.push({ "Id": TemplateGroupData[i].ServerId, "Name": TemplateGroupData[i].ChildDbElementName });
                }
                //ServerId,ChildDbElementId,ChildDbElementName
                $scope.TemplateGroup = $scope.TemplateGroupList[0];

                OneViewConsole.Debug("TemplateGroup End", "NewDcPresenter.TemplateGroup");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Presenter", "NewDcPresenter.TemplateGroup", Excep);
            }
        }

        this.LoadNewAuditDc = function ($location) {
            try {
                OneViewConsole.Debug("LoadNewAuditDc Start", "NewDcPresenter.LoadNewAuditDc");
                
                $location.url('/' + OneViewSessionStorage.Get("TemplateId"));                

                OneViewConsole.Debug("LoadNewAuditDc End", "NewDcPresenter.LoadNewAuditDc");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Presenter", "NewDcPresenter.LoadNewAuditDc", Excep);
            }
        }
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Presenter", "Presenter.NewDcPresenter", Excep);
    }
}

/// <summary>
/// DAO : 
/// </summary>

function DCProfileDAO() {
    //one ScheduleEntityName rule at a time,need to inject 'ScheduleEntityName',default ScheduleEntityName is DefaultScheduleEntity;
    this.ScheduleRule = '';
}

/// <summary>
/// DAO : DefaultDCProfileDAO
/// </summary>

function DefaultDCProfileDAO() {
    try {
        //As per DC Profile
        //TemplateNodeId nullable,DCDate nullable,ShiftId  nullable 
        //if it null pass -1
        //To DO:Need look on DC Profile,DataCapture table(for occurance reached or not),ReAuditing Metadata,PastAudit,FutureAudit,


       


        /// <summary>
        /// It is used for getting the AuditPlace for particualr service and user. 
        /// </summary>
        /// <param name="ServiceId">Selected service</param>
        /// <param name="UserId">Log in User</param>
        /// <param name="TemplateNodeId">Selected template</param>
        /// <param name="DCDate">Selected Date</param>
        /// <param name="FromTime">Selected FromTime </param>
        /// <param name="ToTime">Selected ToTime</param>
        /// <returns>It returns the ChildDbElementName(Facilty)</returns>        
        this.GetDCPlace = function (DcPlaceIdDetailsList, RCOType) {
            try {
                OneViewConsole.Debug("GetDCPlace Start", "DefaultDCProfileDAO.GetDCPlace");
                OneViewConsole.Debug("DcPlaceIdDetailsList :", JSON.stringify(DcPlaceIdDetailsList));


                //alert('RCOType : '+ RCOType + 'DcPlaceIdDetailsList  : ' + JSON.stringify(DcPlaceIdDetailsList));
                var DcPlaceList = [];
                for (var i = 0; i < DcPlaceIdDetailsList.length; i++) {

                    //if (DcPlaceIdDetailsList[i].DcPlaceId != 0) {
                        var DcPlaceNodeId = DcPlaceIdDetailsList[i].DcPlaceId;
                        var DcPlace = "SELECT DISTINCT ChildDbElementName,ChildDbElementType FROM OrganizationAssetsNode WHERE ServerId=" + DcPlaceNodeId + " ORDER BY ChildDbElementName ASC";
                        //alert('DcPlace :' + DcPlace);
                        var resultData = window.OneViewSqlite.excecuteSqlReader(DcPlace);
                        var resultDcPlace = JSON.parse(resultData);
                    // alert('resultDcPlace  : ' + JSON.stringify(resultDcPlace) + "," + RCOType);
                        var DcPlaceName = resultDcPlace[0].ChildDbElementName;
                        var resObj = { Id: DcPlaceNodeId, Name: DcPlaceName, DcPlaceDimension: '' };
                        if (RCOType != "" && RCOType != null && RCOType != undefined) {
                            if (resultDcPlace[0].ChildDbElementType == RCOType) {
                                DcPlaceList.push(resObj);
                            }
                        }
                        else {
                            DcPlaceList.push(resObj);
                        }
                      //  alert('DcPlaceList 33333 : ' + JSON.stringify(DcPlaceList));
                   // }

                     //for custom Dc Place we are keeping temporary RCOType = -999 and its static name is "Sampling Point";
                     // ToDo : need to make from Profile table need to keep
                    //else if (RCOType == -999) {
                    //   // alert('RCOType' + DcPlaceIdDetailsList[i].CustomPlaceName);
                    //    var resObj = { Id: 0, Name: DcPlaceIdDetailsList[i].CustomPlaceName, DcPlaceDimension: '' };
                    //    DcPlaceList.push(resObj);
                    //}
                }

                DcPlaceList = DcPlaceList.sort(OneViewArraySorting('Name', true, function (a) { return a }));

                OneViewConsole.Debug("Response from GetDCPlace" + JSON.stringify(DcPlaceList), "DefaultDCProfileDAO.GetDCPlace");
                OneViewConsole.Debug("GetDCPlace End", "DefaultDCProfileDAO.GetDCPlace");

               // alert('DcPlaceList  : ' + JSON.stringify(DcPlaceList));

                return DcPlaceList;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetDCPlace", Excep);
            }
        }

        this.GetDCPlaceByTemplate = function (TemplateId, TemplateName) {
            try {
                OneViewConsole.Debug("GetDCPlaceByTemplate Start", "DefaultDCProfileDAO.GetDCPlaceByTemplate");               

                var DcPlaceList = [];
                var IdList = [];

                for (var i = 0 ; i < GlobalDcProfileList.length ; i++) {
                    if (TemplateId != "" && TemplateId != null && TemplateId != undefined) {
                        if (GlobalDcProfileList[i].TemplateNodeId == TemplateId) {
                            if (IdList.indexOf(GlobalDcProfileList[i].DcPlaceId) == -1) {
                                IdList.push(GlobalDcProfileList[i].DcPlaceId);
                            }
                        }
                    }
                    else {
                       
                    }
                }

                var Incondition = "(";

                if (IdList != undefined && IdList != "") {
                    for (var i = 0 ; i < IdList.length ; i++) {                        
                        Incondition += IdList[i];
                        Incondition += (i <= IdList.length - 2) ? "," : ")";
                    }
                    var DcPlaceDetails = "SELECT DISTINCT ServerId,ChildDbElementName,ChildDbElementType FROM OrganizationAssetsNode WHERE ServerId IN " + Incondition + " ORDER BY ChildDbElementName ASC";
                    
                    var resultData = window.OneViewSqlite.excecuteSqlReader(DcPlaceDetails);
                    var resultDcPlace = JSON.parse(resultData);

                    if (resultDcPlace != undefined && resultDcPlace != "" && resultDcPlace != null) {
                        for (var j = 0; j < resultDcPlace.length; j++) {
                            var resObj = { Id: resultDcPlace[j].ServerId, Name: resultDcPlace[j].ChildDbElementName, DcPlaceDimension: '' };
                            DcPlaceList.push(resObj);
                        }
                    }
                }

                DcPlaceList = DcPlaceList.sort(OneViewArraySorting('Name', true, function (a) { return a }));

                OneViewConsole.Debug("Response from GetDCPlaceByTemplate" + JSON.stringify(DcPlaceList), "DefaultDCProfileDAO.GetDCPlaceByTemplate");
                OneViewConsole.Debug("GetDCPlaceByTemplate End", "DefaultDCProfileDAO.GetDCPlaceByTemplate");
                               

                return DcPlaceList;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetDCPlaceByTemplate", Excep);
            }
        }

        this.GetDCPlaceDimension = function (DcPlaceIdDetailsList) {
            try {
               // alert('DcPlaceIdDetailsList :' + JSON.stringify(DcPlaceIdDetailsList));
                OneViewConsole.Debug("GetDCPlace Start", "DefaultDCProfileDAO.GetDCPlace");
                OneViewConsole.Debug("DcPlaceIdDetailsList :", JSON.stringify(DcPlaceIdDetailsList));
                var DCPlaceDimensionList = [];
              //  var IsCallQuery = false;
                //alert("DcPlaceIdDetailsList : " + JSON.stringify(DcPlaceIdDetailsList));
                var Incondition = "(";

                for (var i = 0; i < DcPlaceIdDetailsList.length; i++) {
                    //if (DcPlaceIdDetailsList[i].Id != 0) {

                     //   IsCallQuery = true;
                    Incondition += DcPlaceIdDetailsList[i].Id;
                        Incondition += (i <= DcPlaceIdDetailsList.length - 2) ? "," : ")";                       
                    //}

                    
                }

               // alert('Incondition :' + Incondition);

               // if (IsCallQuery == true) {
                    var DcPlaceDimensionQuery = "SELECT DISTINCT ChildDbElementType FROM OrganizationAssetsNode WHERE ServerId in" + Incondition;
                    //alert('DcPlaceDimensionQuery : ' + DcPlaceDimensionQuery);
                    DCPlaceDimensionList = window.OneViewSqlite.excecuteSqlReader(DcPlaceDimensionQuery);
                    DCPlaceDimensionList = JSON.parse(DCPlaceDimensionList);
               // }
                OneViewConsole.Debug("Response from GetDCPlace" + JSON.stringify(DCPlaceDimensionList), "DefaultDCProfileDAO.GetDCPlaceDimension");
                OneViewConsole.Debug("GetDCPlaceDimension End", "DefaultDCProfileDAO.GetDCPlaceDimension");

                return DCPlaceDimensionList;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetDCPlaceDimension", Excep);
            }
        }
        /// <summary>
        /// It is used for getting the Template for particualr service and user. 
        /// </summary>
        /// <param name="ServiceId">Selected service</param>
        /// <param name="UserId">Log in User</param>
        /// <param name="TemplateNodeId">Selected template</param>
        /// <param name="DCDate">Selected Date</param>
        /// <param name="FromTime">Selected FromTime </param>
        /// <param name="ToTime">Selected ToTime</param>
        /// <returns>It returns the ChildDbElementName(Template)</returns>
        this.GetAuditTemplate = function (DcPlaceId, DcPlaceName) {
            try {
               
                OneViewConsole.Debug("GetAuditTemplate Start", "DefaultDCProfileDAO.GetAuditTemplate");
                OneViewConsole.Debug("DcPlaceId :", JSON.stringify(DcPlaceId));
                var AuditTemplateResult = [];

                
                    //GlobalDcProfileList contains : TemplateNodeId,DcPlaceId,ServerId,ReccurenceId,Occurence,DcProfileId ,(and some other columns too)
                for (var i = 0 ; i < GlobalDcProfileList.length ; i++) {
                    if (DcPlaceId != "" && DcPlaceId != null && DcPlaceId != undefined) {
                        // alert('scope issue' + DcPlaceName);
                        //if ((DcPlaceId == 0 && GlobalDcProfileList[i].CustomPlaceName == DcPlaceName) || (GlobalDcProfileList[i].DcPlaceId == DcPlaceId)) {
                        if (GlobalDcProfileList[i].DcPlaceId == DcPlaceId) {
                            //alert('scope issue in ' + DcPlaceName);
                            if (AuditTemplateResult.indexOf(GlobalDcProfileList[i].TemplateNodeId) == -1) {
                                AuditTemplateResult.push(GlobalDcProfileList[i].TemplateNodeId);
                            }
                        }
                    }
                    else {
                        if (AuditTemplateResult.indexOf(GlobalDcProfileList[i].TemplateNodeId) == -1) {
                            AuditTemplateResult.push(GlobalDcProfileList[i].TemplateNodeId);
                        }
                    }
                }
                
              //  alert('AuditTemplateResult : ' + JSON.stringify(AuditTemplateResult));
                var TemplateLst = [];
                for (var i = 0; i < AuditTemplateResult.length; i++) {
                    var TemplateNodeId = AuditTemplateResult[i];//['TemplateNodeId'];
                    var TemplateQry = "SELECT DISTINCT ChildDbElementName FROM TemplateNode where ServerId=" + TemplateNodeId;
                   // alert('TemplateQry : ' + TemplateQry);
                    var resultData = window.OneViewSqlite.excecuteSqlReader(TemplateQry);
                    var resultDcPlace = JSON.parse(resultData);
                    var TemplateName = resultDcPlace[0].ChildDbElementName;
                    var resObj = { Id: TemplateNodeId, Name: TemplateName };
                    TemplateLst.push(resObj);
                }

                OneViewConsole.Debug("Response from GetAuditTemplate" + JSON.stringify(TemplateLst), "DefaultDCProfileDAO.GetAuditTemplate");
                OneViewConsole.Debug("GetAuditTemplate End", "DefaultDCProfileDAO.GetAuditTemplate");

                TemplateLst = TemplateLst.sort(OneViewArraySorting('Name', true, function (a) { return a }));

                return TemplateLst;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetAuditTemplate", Excep);
            }
        }
        /// <summary>
        /// Gives Template Groups for particualr service and user. 
        /// </summary>
        /// <param name="TemplateDataList">List of downloaded Template Ids</param>
        /// <returns>It returns the TemplateGroupList(List is in this format : ServerId,ChildDbElementId,ChildDbElementName)</returns>
        this.GetAuditTemplateGroup = function (TemplateDataList) {
            try {

                OneViewConsole.Debug("GetAuditTemplateGroup Start", "DefaultDCProfileDAO.GetAuditTemplateGroup");

                var TemplateNodeIdList = [];
              
                for (var i = 0; i < TemplateDataList.length; i++) {
                    if (TemplateDataList[i].Id != undefined && TemplateDataList[i].Id != null && TemplateDataList[i].Id != "") {
                        TemplateNodeIdList.push(TemplateDataList[i].Id);
                    }
                }

               // alert('TemplateNodeIdList : ' + JSON.stringify(TemplateNodeIdList));
                var query1 =GetTemplateParentList_ByTemplatesQuery(TemplateNodeIdList);
                var result1 = window.OneViewSqlite.excecuteSqlReader(query1);
                var TemplateParentList = JSON.parse(result1);
                //alert('TemplateParentList : ' + JSON.stringify(TemplateParentList));

                var IdList = [];
                for (var i = 0; i < TemplateParentList.length; i++) {
                    if (TemplateParentList[i].ParentNodeId != undefined && TemplateParentList[i].ParentNodeId != null && TemplateParentList[i].ParentNodeId != "") {
                        IdList.push(TemplateParentList[i].ParentNodeId);
                    }
                }

                //alert('IdList : ' + JSON.stringify(IdList));

                var query2 = GetTemplateGroupList_ByIdQuery(IdList);
                var result2 = window.OneViewSqlite.excecuteSqlReader(query2);
                var TemplateGroupList = JSON.parse(result2);


                TemplateGroupList = TemplateGroupList.sort(OneViewArraySorting('ChildDbElementName', true, function (a) { return a }));

                //alert('TemplateGroupList : ' + JSON.stringify(TemplateGroupList));
                OneViewConsole.Debug("GetAuditTemplateGroup End", "DefaultDCProfileDAO.GetAuditTemplateGroup");

                return TemplateGroupList;
            }
            catch (Excep) {
               // alert('GetAuditTemplateGroup Excep' + Excep)
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetAuditTemplateGroup", Excep);
            }
        }


        /// <summary>
        /// It is used for setting the facilty and template information in session. 
        /// </summary>
        this.SetDcVariables = function ($scope) {
            try {
                OneViewConsole.Debug("SetDcVariables Start", "DefaultDCProfileDAO.SetDcVariables");

                OneViewSessionStorage.Save("DcPlaceId", $scope.Facility.Id);

                OneViewSessionStorage.Save("DcPlaceDimension", DATEntityType.OrganizationAssestsNode);
               
                OneViewSessionStorage.Save("DcPlaceName", $scope.Facility.Name);
                OneViewSessionStorage.Save("TemplateId", $scope.Template.Id);
                OneViewSessionStorage.Save("TemplateName", $scope.Template.Name);
                OneViewSessionStorage.Remove("DefaultValueMetaData");
                OneViewSessionStorage.Remove("DcId");
                OneViewSessionStorage.Remove("NCMetaData");
                OneViewSessionStorage.Remove("MyAuditForm");
                OneViewSessionStorage.Remove("MyAuditEditForm");
                OneViewSessionStorage.Remove("NCInlineEdit");
                SetDcPlaceInfo($scope.Facility.Id);
                SetDcProfileInfo($scope);
                OneViewConsole.Debug("SetDcVariables End", "DefaultDCProfileDAO.SetDcVariables");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.SetDcVariables", Excep);
            }
        }

        var SetDcPlaceInfo = function (DcPlaceId) {
            try {
                OneViewConsole.Debug("SetDcPlaceInfo Start", "DefaultDCProfileDAO.SetDcPlaceInfo");

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
         
                OneViewConsole.Debug("SetDcPlaceInfo End", "DefaultDCProfileDAO.SetDcPlaceInfo");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.SetDcPlaceInfo", Excep);
            }
        }

        /// <summary>
        /// Check for the current valid profile and save the profile id and occurence in session 
        /// </summary>
        var SetDcProfileInfo = function ($scope) {
            try {
                OneViewConsole.Debug("CheckCurrentValidProfile Start", "DefaultDCProfileDAO.CheckCurrentValidProfile");

                var oDcScheduleCheckingComponent = new DcScheduleCheckingComponent();

                var CurrentShift = new LVShiftHandler().GetCurrentShift();

                var CurrentDcProfile = oDcScheduleCheckingComponent.GetDcProfile(OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("LoginUserId"), -1, CurrentShift.Id, $scope.Template.Id, $scope.Facility.Id);

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

        this.GetAuditTemplateBasedOnTemplateGroup = function (TemplateGroupId) {
            try {

                OneViewConsole.Debug("GetAuditTemplateBasedOnTemplateGroup Start", "DefaultDCProfileDAO.GetAuditTemplateBasedOnTemplateGroup");

                var LoadedTemplateList = NewDcPlaceWiseTemplateList;
              //  alert('LoadedTemplateList  ' + JSON.stringify(LoadedTemplateList));
                var TemplateList = [];
                var query1 = GetTemplates_BasedOnTemplateGroupQuery(TemplateGroupId);
               var result1 = window.OneViewSqlite.excecuteSqlReader(query1);
               var ListOfTemplatesUnderSelectedAG = JSON.parse(result1);
          
             //  alert('ListOfTemplatesUnderSelectedAG  ' + JSON.stringify(ListOfTemplatesUnderSelectedAG));
               //alert('LoadedTemplateList  ' + JSON.stringify(LoadedTemplateList));

               if (LoadedTemplateList != undefined && ListOfTemplatesUnderSelectedAG != undefined) {
                   for (var itr1=0;itr1 < LoadedTemplateList.length ;itr1++) {
                       for (var itr2=0;itr2 < ListOfTemplatesUnderSelectedAG.length ;itr2++) {
                           if (LoadedTemplateList[itr1].Id == ListOfTemplatesUnderSelectedAG[itr2].ServerId) {
                               TemplateList.push(LoadedTemplateList[itr1]);
                           }
                       }

                   }
               }
                OneViewConsole.Debug("GetAuditTemplateBasedOnTemplateGroup End", "DefaultDCProfileDAO.GetAuditTemplateBasedOnTemplateGroup");

                //alert('response TemplateList ' + JSON.stringify(TemplateList));
                return TemplateList;
            }
            catch (Excep) {
                // alert('GetAuditTemplateBasedOnTemplateGroup Excep' + Excep)
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetAuditTemplateBasedOnTemplateGroup", Excep);
            }
        }


        this.GetDcProfile = function (ServiceId, UserId, DcPlaceDimension, Shift, TemplateNodeId, DcPlaceId) {
            try {
                var oDateTime=new DateTime();
                var DCDateTime = oDateTime.GetDateAndTime(); // CurrentDateTime : (dd-mm-yyyy hh:mm:ss)
                var CurrentTime = oDateTime.GetTime();// CurrentTime : (hh:mm:ss)

                DCDateTime = oDateTime.ConvertDateTimeToInteger(DCDateTime);
                CurrentTime = oDateTime.ConvertTimeToInteger(CurrentTime);

                var DcProfileList = [];
                var query = GetDCProfile_Query(ServiceId, UserId, DcPlaceDimension, DCDateTime, CurrentTime, Shift, TemplateNodeId, DcPlaceId);
                var result = window.OneViewSqlite.excecuteSqlReader(query);

                var DcProfileResult = JSON.parse(result);

                //TemplateNodeId,DcPlaceId,ServerId,ReccurenceId,Occurence,DcProfileId ,(and some other columns too)
               // alert('DcProfileResult : ' + JSON.stringify(DcProfileResult));

                return DcProfileResult;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetDcProfile", Excep);
            }
        }

        

        var GetDCPlaceDimension_FaciltyQuery = function (ServiceId, UserId, TemplateNodeId, DCDate, FromTime, ToTime, DcPlaceDimension) {
            try {
                OneViewConsole.Debug("GetDCPlaceDimension_FaciltyQuery Start", "DefaultDCProfileDAO.GetDCPlaceDimension_FaciltyQuery");

                var query = "SELECT DISTINCT DcPlaceDimension FROM DcProfileEntity INNER JOIN  DefaultScheduleEntity on DcProfileEntity.Id=DefaultScheduleEntity.DcProfileId  WHERE DcUserId=" + UserId + " AND (-1=" + TemplateNodeId + " or  TemplateNodeId=" + TemplateNodeId + ") and DcProfileEntity.ServiceId=" + ServiceId + "";
                //  var query = "SELECT DISTINCT DcPlaceId,DcPlaceDimension FROM DcProfileEntity INNER JOIN  DefaultScheduleEntity on DcProfileEntity.Id=DefaultScheduleEntity.DcProfileId  WHERE DcUserId=" + UserId + " AND (-1=" + TemplateNodeId + " or  TemplateNodeId=" + TemplateNodeId + ") and DcProfileEntity.ServiceId=" + ServiceId + "and DcProfileEntity.DcPlaceDimension=" + DcPlaceDimension + "";

                OneViewConsole.Debug("GetDCPlaceDimension_FaciltyQuery End", "DefaultDCProfileDAO.GetDCPlaceDimension_FaciltyQuery");
                return query;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetDCPlace_FaciltyQuery", Excep);
            }
        }
        //Description : Dc Place Query
              
        var GetDCPlace_FaciltyQuery = function (ServiceId, UserId, TemplateNodeId, DCDate, FromTime, ToTime, DcPlaceDimension) {
            try {
                OneViewConsole.Debug("GetDCPlace_FaciltyQuery Start", "DefaultDCProfileDAO.GetDCPlace_FaciltyQuery");
                //alert("DcPlaceDimension" + DcPlaceDimension);
                // var query = "SELECT DISTINCT DcPlaceId FROM DcProfileEntity INNER JOIN  DefaultScheduleEntity on DcProfileEntity.Id=DefaultScheduleEntity.DcProfileId  WHERE DcUserId=" + UserId + " AND (-1=" + TemplateNodeId + " or  TemplateNodeId=" + TemplateNodeId + ") and DcProfileEntity.ServiceId=" + ServiceId + " and (-1=" + DcPlaceDimension + " or  DcProfileEntity.DcPlaceDimension = " + DcPlaceDimension + ") ";
                var query = "SELECT DISTINCT DcPlaceId FROM DcProfileEntity INNER JOIN  DefaultScheduleEntity on DcProfileEntity.Id=DefaultScheduleEntity.DcProfileId  WHERE DcUserId=" + UserId + " AND (-1=" + TemplateNodeId + " or  TemplateNodeId=" + TemplateNodeId + ") and DcProfileEntity.ServiceId=" + ServiceId + " and (-1=" + DcPlaceDimension + " or  DcProfileEntity.DcPlaceDimension = " + DcPlaceDimension + ") ";

                //  var query = "SELECT DISTINCT DcPlaceId,DcPlaceDimension FROM DcProfileEntity INNER JOIN  DefaultScheduleEntity on DcProfileEntity.Id=DefaultScheduleEntity.DcProfileId  WHERE DcUserId=" + UserId + " AND (-1=" + TemplateNodeId + " or  TemplateNodeId=" + TemplateNodeId + ") and DcProfileEntity.ServiceId=" + ServiceId + "and DcProfileEntity.DcPlaceDimension=" + DcPlaceDimension + "";

                OneViewConsole.Debug("GetDCPlace_FaciltyQuery End", "DefaultDCProfileDAO.GetDCPlace_FaciltyQuery");
                return query;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetDCPlace_FaciltyQuery", Excep);
            }
        }

        var GetDCProfile_QueryExisting = function (ServiceId, UserId, DcPlaceDimension, DCDateTime, CurrentTime,Shift) {
            try {
                OneViewConsole.Debug("GetDCProfile_Query Start", "DefaultDCProfileDAO.GetDCProfile_Query");

                var query = "SELECT  DcProfileEntity.*," +
                                "(SUBSTR(DefaultScheduleEntity.StartDate, 7, 4) || SUBSTR(DefaultScheduleEntity.StartDate, 4, 2) || SUBSTR(DefaultScheduleEntity.StartDate, 1, 2) || SUBSTR(DefaultScheduleEntity.StartDate, 12, 2) || " +
                               " SUBSTR(DefaultScheduleEntity.StartDate, 15, 2) || SUBSTR(DefaultScheduleEntity.StartDate, 18, 2) ) AS SD ,(SUBSTR(DefaultScheduleEntity.EndDate, 7, 4) ||SUBSTR(DefaultScheduleEntity.EndDate, 4, 2) ||" +
                               "SUBSTR(DefaultScheduleEntity.EndDate, 1, 2) || SUBSTR(DefaultScheduleEntity.EndDate, 12, 2) || SUBSTR(DefaultScheduleEntity.EndDate, 15, 2) || SUBSTR(DefaultScheduleEntity.EndDate, 18, 2) ) AS ED," +
                               "(SUBSTR(DefaultScheduleEntity.FromTime, 1, 2) || SUBSTR(DefaultScheduleEntity.FromTime, 4, 2) || SUBSTR(DefaultScheduleEntity.FromTime, 7, 2) ) AS FT, ( SUBSTR(DefaultScheduleEntity.ToTime, 1, 2) || " +
                              " SUBSTR(DefaultScheduleEntity.ToTime, 4, 2) || SUBSTR(DefaultScheduleEntity.ToTime, 7, 2) ) AS TT , DefaultScheduleEntity.* FROM DcProfileEntity " +
                               "INNER JOIN  DefaultScheduleEntity on DcProfileEntity.Id=DefaultScheduleEntity.DcProfileId  WHERE DcUserId=" + UserId + " and " +
                               "DcProfileEntity.ServiceId=" + ServiceId + " and (-1=" + DcPlaceDimension + " or  DcProfileEntity.DcPlaceDimension = " + DcPlaceDimension + ")" +
                                " and SD <=  '" + DCDateTime + "' and ( '" + DCDateTime + "'  <  ED or  '' = ED ) and ((ShiftId ='0' and (FT <= '" + CurrentTime + "' and  '" + CurrentTime + "'  < TT )) or ShiftId= " + Shift + " )";

               // alert('GetDCProfile_Query : ' + query);
                OneViewConsole.Debug("GetDCProfile_Query End", "DefaultDCProfileDAO.GetDCProfile_Query");
                return query;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetDCProfile_Query", Excep);
            }
        }

        var GetDCProfile_Query = function (ServiceId, UserId, DcPlaceDimension, DCDateTime, CurrentTime, Shift, TemplateNodeId, DcPlaceId) {
            try {
                OneViewConsole.Debug("GetDCProfile_Query Start", "DefaultDCProfileDAO.GetDCProfile_Query");

                var query = "SELECT  DcProfileEntity.*," +
                                "(SUBSTR(DefaultScheduleEntity.StartDate, 7, 4) || SUBSTR(DefaultScheduleEntity.StartDate, 4, 2) || SUBSTR(DefaultScheduleEntity.StartDate, 1, 2) || SUBSTR(DefaultScheduleEntity.StartDate, 12, 2) || " +
                               " SUBSTR(DefaultScheduleEntity.StartDate, 15, 2) || SUBSTR(DefaultScheduleEntity.StartDate, 18, 2) ) AS SD ,(SUBSTR(DefaultScheduleEntity.EndDate, 7, 4) ||SUBSTR(DefaultScheduleEntity.EndDate, 4, 2) ||" +
                               "SUBSTR(DefaultScheduleEntity.EndDate, 1, 2) || SUBSTR(DefaultScheduleEntity.EndDate, 12, 2) || SUBSTR(DefaultScheduleEntity.EndDate, 15, 2) || SUBSTR(DefaultScheduleEntity.EndDate, 18, 2) ) AS ED," +
                               "(SUBSTR(DefaultScheduleEntity.FromTime, 1, 2) || SUBSTR(DefaultScheduleEntity.FromTime, 4, 2) || SUBSTR(DefaultScheduleEntity.FromTime, 7, 2) ) AS FT, ( SUBSTR(DefaultScheduleEntity.ToTime, 1, 2) || " +
                              " SUBSTR(DefaultScheduleEntity.ToTime, 4, 2) || SUBSTR(DefaultScheduleEntity.ToTime, 7, 2) ) AS TT , DefaultScheduleEntity.* FROM DcProfileEntity " +
                               "INNER JOIN  DefaultScheduleEntity on DcProfileEntity.Id=DefaultScheduleEntity.DcProfileId  WHERE DcUserId=" + UserId + " and " +
                               "DcProfileEntity.ServiceId=" + ServiceId + " and (-1=" + DcPlaceDimension + " or  DcProfileEntity.DcPlaceDimension = " + DcPlaceDimension + ")" +
                               "AND (-1=" + TemplateNodeId + " or  DcProfileEntity.TemplateNodeId=" + TemplateNodeId + ") AND (-1=" + DcPlaceId + " or  DcProfileEntity.DcPlaceId=" + DcPlaceId + ")"+
                                " and SD <=  '" + DCDateTime + "' and ( '" + DCDateTime + "'  <  ED or  '' = ED )";


                //Todo : Coommented coz time not working when we r checking for two different days
                //and ((ShiftId ='0' and (FT <= '" + CurrentTime + "' and  '" + CurrentTime + "'  < TT )) or ShiftId= " + Shift + " )";

               // alert('GetDCProfile_Query : ' + query);
                OneViewConsole.Debug("GetDCProfile_Query End", "DefaultDCProfileDAO.GetDCProfile_Query");
                return query;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetDCProfile_Query", Excep);
            }
        }


        var CheckDcProfileExpired = function (param) {
            try {
                var IsDcProfileExpired = false;
                //StartDate, EndDate, FromTime, ToTime,ShiftId,Reccurence,Occurence
                var StartDate = "";
                var EndDate = "";
                var FromTime = "";
                var ToTime = "";
                var ShiftId = "";

                if (param.StartDate != "" && param.StartDate != undefined && param.StartDate != null) {
                    StartDate = GetFormattedDateTime(param.StartDate);
                   
                }

                if (param.EndDate != "" && param.EndDate != undefined && param.EndDate != null) {
                    EndDate = GetFormattedDateTime(param.EndDate);
                }

                var oDateTime = new DateTime();
                var CurrentDateTime = oDateTime.GetDateAndTime();

                if (StartDate != "" && StartDate != undefined && StartDate != null) {

                    if (StartDate > CurrentDateTime) {
                        //Dc Profile expired
                        IsDcProfileExpired = true;
                    }
                }

                else {
                    alert('invalid data : StartDate for DcProfile is mandatory')
                }

                if (EndDate != "" && EndDate != undefined && EndDate != null) {
                    if (CurrentDateTime > EndDate) {
                        //Dc Profile expired
                        IsDcProfileExpired = true;
                    }
                }


                return IsDcProfileExpired;

            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.CheckDcProfileExpired", Excep);
            }

        }


        var GetFormattedDateTime = function (Answer) {
            try {
                OneViewConsole.Debug("GetFormattedDateTime Start", "DataCaptureBO.GetFormattedDateTime");

                if (Answer != undefined && Answer != null && Answer != "") {
                    var ValueSplittedBySpace = Answer.split(" ");
                    var ValueSplittedByHifen = (ValueSplittedBySpace[0]).split("-");
                    var ValueSplittedByColon = (ValueSplittedBySpace[1]).split(":");
                    Answer = new Date(ValueSplittedByHifen[2], (ValueSplittedByHifen[1] - 1), ValueSplittedByHifen[0], ValueSplittedByColon[0], ValueSplittedByColon[1]);
                }

                return Answer;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetFormattedDateTime", Excep);
            }
        }

        
        //Description : TemplateNode Query
        var GetDCPlace_TemplateNodeQuery = function (ServiceId, UserId, TemplateNodeId, DCDate, FromTime, ToTime, DcPlaceId) {
            try {
                OneViewConsole.Debug("GetDCPlace_TemplateNodeQuery Start", "DefaultDCProfileDAO.GetDCPlace_TemplateNodeQuery");

                var query = "SELECT DISTINCT TemplateNodeId FROM DcProfileEntity INNER JOIN  DefaultScheduleEntity on DcProfileEntity.Id=DefaultScheduleEntity.DcProfileId  WHERE DcProfileEntity.DcPlaceId=" + DcPlaceId + " AND DcUserId=" + UserId + " AND (-1=" + TemplateNodeId + " or  TemplateNodeId=" + TemplateNodeId + ") and DcProfileEntity.ServiceId=" + ServiceId + "";

                OneViewConsole.Debug("GetDCPlace_TemplateNodeQuery End", "DefaultDCProfileDAO.GetDCPlace_TemplateNodeQuery");
                return query;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetDCPlace_TemplateNodeQuery", Excep);
            }
        }

        var GetTemplateParentList_ByTemplatesQuery = function (TemplateNodeIdList) {
            try {
                OneViewConsole.Debug("GetTemplateParentList_ByTemplatesQuery Start", "DefaultDCProfileDAO.GetTemplateParentList_ByTemplatesQuery");

                var query = "SELECT DISTINCT ParentNodeId FROM TemplateNode WHERE ServerId IN (" + TemplateNodeIdList + ") AND ParentDbElementType ='" + DATEntityType.AttributeGroup_Master + "'";

                OneViewConsole.Debug("GetTemplateParentList_ByTemplatesQuery End", "DefaultDCProfileDAO.GetTemplateParentList_ByTemplatesQuery");
                return query;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetTemplateParentList_ByTemplatesQuery", Excep);
            }
        }


        var GetTemplateGroupList_ByIdQuery = function (TemplateNodeIdList) {
            try {
                OneViewConsole.Debug("GetTemplateGroupList_ByIdQuery Start", "DefaultDCProfileDAO.GetTemplateGroupList_ByIdQuery");

                var query = "SELECT ServerId,ChildDbElementId,ChildDbElementName FROM TemplateNode WHERE ServerId IN (" + TemplateNodeIdList + ")";

                //alert(query);
                OneViewConsole.Debug("GetTemplateGroupList_ByIdQuery End", "DefaultDCProfileDAO.GetTemplateGroupList_ByIdQuery");
                return query;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetTemplateGroupList_ByIdQuery", Excep);
            }
        }



        var GetTemplates_BasedOnTemplateGroupQuery = function (TemplateGroupId) {
            try {
                OneViewConsole.Debug("GetTemplates_BasedOnTemplateGroupQuery Start", "DefaultDCProfileDAO.GetTemplates_BasedOnTemplateGroupQuery");

                var query = "SELECT ServerId,ChildDbElementId,ChildDbElementName FROM TemplateNode WHERE ParentNodeId =" + TemplateGroupId + " AND ParentDbElementType = '" + DATEntityType.AttributeGroup_Master + "'";

                //alert(query);
                OneViewConsole.Debug("GetTemplates_BasedOnTemplateGroupQuery End", "DefaultDCProfileDAO.GetTemplates_BasedOnTemplateGroupQuery");
                return query;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "DefaultDCProfileDAO.GetTemplates_BasedOnTemplateGroupQuery", Excep);
            }
        }

    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("DAO", "DAO.DefaultDCProfileDAO", Excep);
    }
}

/// <summary>
/// Factory : NewDCFactory
/// </summary>
/// <param name="key">Which DAO is configured</param>
/// <returns>Returns the DAO object</returns>

function NewDCFactory(key) {
    try {
        OneViewConsole.Debug("NewDCFactory Start", "Factory.NewDCFactory");

        if (key == "DefaultDCProfileDAO") {
            return new DefaultDCProfileDAO();

        }
        else if (key == "AdvanceDCProfileDAO") {
            return new AdvanceDCProfileDAO();
        }

        OneViewConsole.Debug("NewDCFactory End", "Factory.NewDCFactory");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Factory", "Factory.NewDCFactory", Excep);
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

            //alert(ServiceId + "," + UserId + "," + DcPlaceDimension + "," + DCDateTime + "," + CurrentTime + "," + Shift + "," + TemplateNodeId + "," + DcPlaceId)
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





