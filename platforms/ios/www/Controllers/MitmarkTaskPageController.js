
var DcProfileDict = {}; // {TId : {} , TId2 : {}};

// MitmarkTaskPageController
MyApp.controller('MitmarkTaskPageController', function ($scope, $document, xlatService, $timeout, $location, $templateCache, $compile, snapRemote) {

    var _oMitmarkTaskPageFacade = new MitmarkTaskPageFacade($scope, $document, xlatService, $timeout, $location, $templateCache, $compile, snapRemote);
    _oMitmarkTaskPageFacade.Init();
    _oMitmarkTaskPageFacade.PageLoad();

    $scope.$on('$destroy', function () {
        _oMitmarkTaskPageFacade.Destroy();
    });

    $scope.TaskClick = function (TemplateId) {
        _oMitmarkTaskPageFacade.TaskClick(TemplateId);
    }

    $scope.LoadNewDC = function (TemplateId) {
        _oMitmarkTaskPageFacade.LoadNewDC(TemplateId);
    }

    $scope.LoadViewDC = function (TemplateId) {
        _oMitmarkTaskPageFacade.LoadViewDC(TemplateId);
    }

    $scope.BackClick = function () {
        _oMitmarkTaskPageFacade.BackClick();
    }
});

// MitmarkTaskPageFacade
function MitmarkTaskPageFacade($scope, $document, xlatService, $timeout, $location, $templateCache, $compile, snapRemote) {

    var MyInstance = this;

    var ServiceId = OneViewSessionStorage.Get("ServiceId");
    var LoginUserId = OneViewSessionStorage.Get("LoginUserId");    
    //Temporary need to take from query string
    var TemplateGroupId = OneViewSessionStorage.Get("TemplateGroupId")// $location.search().TemplateGroupId;
    var _oMitmarkTaskPageBO = new MitmarkTaskPageBO(xlatService, $scope, $compile);
    var _oDcDAO = new DcDAO();
   

    this.Destroy = function () {

        try {
            OneViewConsole.Debug("Destroy start", "MitmarkTaskPageFacade.Destroy");

            OneViewSessionStorage.Remove("TemplateGroupId");
            DcProfileDict = {};

            OneViewConsole.Debug("Destroy end", "MitmarkTaskPageFacade.Destroy");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MitmarkTaskPageFacade.Destroy", xlatService);
        }
    }

    this.Init = function () {

        try {
            OneViewConsole.Debug("Init start", "MitmarkTaskPageFacade.Init");

            GlobalxlatService = xlatService;
            GlobalScope = $scope;
            GlobalLocation = $location;

            xlatService.setCurrentPage('19');
            document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');

            OneViewConsole.Debug("Init end", "MitmarkTaskPageFacade.Init");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MitmarkTaskPageFacade.Init", xlatService);
        }
    }

    this.PageLoad = function () {

        try {
            OneViewConsole.Debug("PageLoad start", "MitmarkTaskPageFacade.PageLoad");
            
            var MitmarkLandingPageViewReponse = _oMitmarkTaskPageBO.GetMitmarkLandingPageViewReponse(TemplateGroupId);
            //alert('MitmarkLandingPageViewReponse : ' + JSON.stringify(MitmarkLandingPageViewReponse));                      
            _oMitmarkTaskPageBO.LoadHtml(MitmarkLandingPageViewReponse);

            OneViewConsole.Debug("PageLoad end", "MitmarkTaskPageFacade.PageLoad");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MitmarkTaskPageFacade.PageLoad", xlatService);
        }
    }

    this.TaskClick = function (TemplateId) {

        try {
            OneViewConsole.Debug("TaskClick start", "MitmarkTaskPageFacade.TaskClick");

           // var DcProfileDetails = _oMitmarkTaskPageBO.GetUserDcProfileByTemplateAndSchedule(TemplateId);
           // _oMitmarkTaskPageBO.SetVariablesSession(DcProfileDetails);
            
           // var URL = '/' + TemplateId;
           //// alert('TaskClick URL : ' + URL);
           // $location.url(URL);

            OneViewConsole.Debug("TaskClick end", "MitmarkTaskPageFacade.TaskClick");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MitmarkTaskPageFacade.TaskClick", xlatService);
        }
    }

    this.LoadNewDC = function (TemplateId) {

        try {
            OneViewConsole.Debug("LoadNewDC start", "MitmarkTaskPageFacade.LoadNewDC");

            var DcProfileDetails = DcProfileDict[TemplateId];
            if (DcProfileDetails != null && DcProfileDetails.length > 0) {
                _oMitmarkTaskPageBO.SetVariablesSession(DcProfileDetails);

                var URL = '/' + TemplateId;
                // alert('TaskClick URL : ' + URL);
                $location.url(URL);
            }

            OneViewConsole.Debug("LoadNewDC end", "MitmarkTaskPageFacade.LoadNewDC");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MitmarkTaskPageFacade.LoadNewDC", xlatService);
        }
    }

    this.LoadViewDC = function (TemplateId) {

        try {
            OneViewConsole.Debug("LoadViewDC start", "MitmarkTaskPageFacade.LoadViewDC");

            var DcProfileDetails = new DcDAO().GetUserDcProfileByTemplate(ServiceId, LoginUserId, TemplateId);
            if (DcProfileDetails != null && DcProfileDetails.length > 0) {
                _oMitmarkTaskPageBO.SetVariablesSession(DcProfileDetails);
                
                var DcInfo = _oDcDAO.GetDcInfo(ServiceId, LoginUserId, TemplateId);
                //alert('DcInfo.length : ' + DcInfo.length);
                if (DcInfo.length == 1) {

                    OneViewSessionStorage.Save("DcId", DcInfo[0].Id);
                    OneViewSessionStorage.Save("IsDcCompletedBeforeEdit", DcInfo[0].IsCompleted);
                    OneViewSessionStorage.Save("IsDcSynchronizedBeforeEdit", DcInfo[0].IsSynchronized);
                    OneViewSessionStorage.Remove("NCInlineEdit");
                    OneViewSessionStorage.Remove("ViewRecordsForm");

                    var Url = '/' + TemplateId;
                    $location.url(Url);
                }
                else {
                    var IsCompleted = '-1';
                    var IsSynchronized = '-1';

                    var Url = '/ViewRecords?IsCompleted=' + IsCompleted + '&IsSynchronized=' + IsSynchronized + '';

                    $location.url(Url);
                }
            }
            OneViewConsole.Debug("LoadViewDC end", "MitmarkTaskPageFacade.LoadViewDC");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MitmarkTaskPageFacade.LoadViewDC", xlatService);
        
        }
    }

    this.BackClick = function () {

        try {
            OneViewConsole.Debug("BackClick start", "MitmarkTaskPageFacade.BackClick");

            $location.url('/MitmarkLandingPage');

            OneViewConsole.Debug("BackClick end", "MitmarkTaskPageFacade.BackClick");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "MitmarkTaskPageFacade.BackClick", xlatService);

        }
    }
}


function MitmarkTaskPageBO(xlatService, $scope, $compile) {

    var MyInstance = this;

    var ServiceId = OneViewSessionStorage.Get("ServiceId");
    var LoginUserId = OneViewSessionStorage.Get("LoginUserId");
    var _oMitmarkLandingPageViewReponseDAO = new MitmarkLandingPageViewReponseDAO();
    var _oDOM = new DOM();

    this.GetMitmarkLandingPageViewReponse = function (TemplateGroupId) {

        try {
            OneViewConsole.Debug("GetMitmarkLandingPageViewReponse start", "MitmarkTaskPageBO.GetMitmarkLandingPageViewReponse");

            var MitmarkLandingPageViewReponse = _oMitmarkLandingPageViewReponseDAO.GetByServiceUserAndTemplateGroup(ServiceId, LoginUserId, TemplateGroupId);
          
            OneViewConsole.Debug("GetMitmarkLandingPageViewReponse end", "MitmarkTaskPageBO.GetMitmarkLandingPageViewReponse");

            return MitmarkLandingPageViewReponse;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MitmarkTaskPageBO.GetMitmarkLandingPageViewReponse", Excep);
        }
        finally {
        }
    }
    
    this.LoadHtml = function (MitmarkLandingPageViewReponse) {

        try {
            OneViewConsole.Debug("LoadHtml start", "MitmarkTaskPageBO.LoadHtml");
             
            var DivId = 'TaskDivId';
            _oDOM.RemoveInnerHtml(DivId);

            var Html = MyInstance.GetHtml(MitmarkLandingPageViewReponse);
            if (Html != '') {
                var _oOneViewCompiler = new OneViewCompiler();
                _oOneViewCompiler.CompileAndApeend($scope, $compile, Html, DivId);
            }

            OneViewConsole.Debug("LoadHtml end", "MitmarkTaskPageBO.LoadHtml");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MitmarkTaskPageBO.LoadHtml", Excep);
        }
        finally {
        }
    }

    this.GetHtml = function (MitmarkLandingPageViewReponse) {

        try {
            OneViewConsole.Debug("GetHtml start", "MitmarkTaskPageBO.GetHtml");

            var Html = "";

            var HeaderHtml = '<div class="title-bar rounded">' + xlatService.xlat(MitmarkLandingPageViewReponse[0].TemplateGroupName) + '</div>';

            var LandingPageViewConfig = MitmarkLandingPageViewReponse[0].LandingPageViewConfig;
            LandingPageViewConfig = JSON.parse(LandingPageViewConfig);
            var TasksHtml = "";
            for (var i = 0; i < LandingPageViewConfig.length; i++) {
                var TaskDetails = LandingPageViewConfig[i];
                var TemplateId=TaskDetails.TemplateId;

                var DcProfileDetails = MyInstance.GetUserDcProfileByTemplateAndSchedule(TemplateId);

                if (DcProfileDict != undefined) {
                    DcProfileDict[TemplateId] = DcProfileDetails;
                }
                var AssesmentHtml = "";
                var DcCount = new DcDAO().GetTotalDcCountByTemplateAndUser(ServiceId, LoginUserId, TemplateId);
                var LocalLastDcDate = new DcDAO().GetLocalLastDcDateTemplateAndUser(ServiceId, LoginUserId, TemplateId);
                var AssessedDate = MyInstance.GetLastDcDateFromServerNLocal(TaskDetails.LastDCDate, LocalLastDcDate);
                if (AssessedDate != "") {
                    AssesmentHtml = xlatService.xlat('Last Submitted on ') + AssessedDate;
                }

                var StartButtonHtml = "";
                if (DcProfileDetails != null && DcProfileDetails.length > 0) {
                    StartButtonHtml = '<a class="button button-calm" ng-click="LoadNewDC(' + TemplateId + ')">' + xlatService.xlat("Start ") + '<i class="icon icon-chevron-right"></i></a>';
                }

                //alert('DcCount : ' + DcCount);
                var EditButtonHtml = "";
                //if any data is available locally enable edit button
                if (DcCount > 0) {
                    EditButtonHtml = '<a class="button button-calm" ng-click="LoadViewDC(' + TemplateId + ')">' + xlatService.xlat("Edit ") + '<i class="icon icon-pencil"></i></a>';
                }
               
                if (StartButtonHtml != "" || EditButtonHtml != "") {
                    TasksHtml += ' <div class="row no-padding responsive-sm margin-bottom" ng-click="TaskClick(' + TemplateId + ')">' +
                                    '<div class="col rounded light-bg current-attr">' +
                                    '<div class="row responsive-sm">' +
                                        '<div class="col rounded light-bg">' +
                                             '<div><b>' + xlatService.xlat(TaskDetails.TemplateName) + '</b></div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="row responsive-sm">' +
                                        '<div class="col rounded light-bg">' +
                                            '<div>' + AssesmentHtml +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="col rounded light-bg">' +
                                            '<div style="float:right">' + EditButtonHtml + ' &nbsp;&nbsp;' +
                                           StartButtonHtml +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +                                   
                                     '</div>' +
                                    '</div>';

                }
            }

            Html = HeaderHtml + TasksHtml;
            //alert('Html : ' + Html);

            OneViewConsole.Debug("GetHtml end", "MitmarkTaskPageBO.GetHtml");

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MitmarkTaskPageBO.GetHtml", Excep);
        }
        finally {
        }
    }

    this.GetUserDcProfileByTemplateAndSchedule = function (TemplateId) {

        try {
            OneViewConsole.Debug("GetUserDcProfileByTemplateAndSchedule start", "MitmarkTaskPageBO.GetUserDcProfileByTemplateAndSchedule");
            
            var oDateTime = new DateTime();
            var DCDateTime = oDateTime.GetDateAndTime(); // CurrentDateTime : (dd-mm-yyyy hh:mm:ss)
            DCDateTime = oDateTime.ConvertDateTimeToInteger(DCDateTime);

            var DcProfileDetails = new DcDAO().GetUserDcProfileByTemplateAndSchedule(ServiceId, LoginUserId, DCDateTime, TemplateId);
            //alert('DcProfileDetails : ' + JSON.stringify(DcProfileDetails));

            OneViewConsole.Debug("GetUserDcProfileByTemplateAndSchedule end", "MitmarkTaskPageBO.GetUserDcProfileByTemplateAndSchedule");

            return DcProfileDetails;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MitmarkTaskPageBO.GetUserDcProfileByTemplateAndSchedule", Excep);
        }
        finally {
        }
    }

    this.SetVariablesSession = function (DcProfileDetails) {

        try {
            OneViewConsole.Debug("GetUserDcProfileByTemplateAndSchedule start", "MitmarkTaskPageBO.GetUserDcProfileByTemplateAndSchedule");
           // alert('DcProfileDetails[0] : ' + JSON.stringify(DcProfileDetails[0]));
            //alert("DcPlaceId  : " + DcProfileDetails[0].DcPlaceId + " , DcProfileDetails[0].TemplateNodeId : " + DcProfileDetails[0].TemplateNodeId
            //    + " , DcProfileDetails[0].DcPlaceName : " + DcProfileDetails[0].DcPlaceName + " , DcProfileDetails[0].TemplateName : " + DcProfileDetails[0].TemplateName
            //    + " , DcProfileDetails[0].DcProfileServerId : " + DcProfileDetails[0].DcProfileServerId + " , DcProfileDetails[0].Occurence : " + DcProfileDetails[0].Occurence);

            OneViewSessionStorage.Save("DcPlaceId", DcProfileDetails[0].DcPlaceId);
            OneViewSessionStorage.Save("TemplateId", DcProfileDetails[0].TemplateNodeId);

            OneViewSessionStorage.Save("DcPlaceName", DcProfileDetails[0].DcPlaceName);
            OneViewSessionStorage.Save("TemplateName", DcProfileDetails[0].TemplateName);

            OneViewSessionStorage.Save("DcProfileId", DcProfileDetails[0].DcProfileServerId);
            OneViewSessionStorage.Save("DcOccurence", DcProfileDetails[0].Occurence);

            OneViewConsole.Debug("GetUserDcProfileByTemplateAndSchedule end", "MitmarkTaskPageBO.GetUserDcProfileByTemplateAndSchedule");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MitmarkTaskPageBO.GetUserDcProfileByTemplateAndSchedule", Excep);
        }
        finally {
        }
    }

    this.GetLastDcDateFromServerNLocal = function (ServerLastDcDate, LocalLastDcDate) {

        try {
            OneViewConsole.Debug("GetLastDcDateFromServerNLocal start", "MitmarkTaskPageBO.GetLastDcDateFromServerNLocal");

            var IsServerDateFormat = false;
            var AssessedDate = "";

            // ServerLastDcDate = '2018-09-18 03:42:24';
           // ServerLastDcDate = '2018-08-01 11:48:40';
            //alert('ServerLastDcDate : ' + ServerLastDcDate);
           // alert('LocalLastDcDate : ' + LocalLastDcDate);

           

            var LocalDT = "";
            var LocalLastDcDateSplitted = "";
            var LocalDateSplitted = "";
            var LocalTimeSplitted = "";
            var LocalSecs = "";
            if (LocalLastDcDate != "") {
                LocalLastDcDateSplitted = LocalLastDcDate.split(" ");
                LocalDateSplitted = LocalLastDcDateSplitted[0].split("-");
                LocalTimeSplitted = LocalLastDcDateSplitted[1].split(":");
                LocalSecs = LocalTimeSplitted[2].split(".")[0];

                LocalDT = new Date(LocalDateSplitted[2], (LocalDateSplitted[1] - 1), LocalDateSplitted[0], LocalTimeSplitted[0], LocalTimeSplitted[1], LocalSecs);
            }

            var ServerDT = "";
            var ServerLastDcDateSplitted = "";
            var ServerDateSplitted = "";
            var ServerTimeSplitted = "";
            var ServerSecs = "";
            if (ServerLastDcDate != "") {
                ServerLastDcDateSplitted = ServerLastDcDate.split(" ");
                ServerDateSplitted = ServerLastDcDateSplitted[0].split("-");
                ServerTimeSplitted = ServerLastDcDateSplitted[1].split(":");
                ServerSecs = ServerTimeSplitted[2].split(".")[0];

                ServerDT = new Date(ServerDateSplitted[0], (ServerDateSplitted[1] - 1), ServerDateSplitted[2], ServerTimeSplitted[0], ServerTimeSplitted[1], ServerSecs);
            }

            //alert('LocalDT : ' + LocalDT);
            //alert('ServerDT : ' + ServerDT);
            if (LocalDT != "" && ServerDT != "") {
              
                if (LocalDT > ServerDT) {
                    AssessedDate = LocalLastDcDate;
                    IsServerDateFormat = false;
                }
                else if (LocalDT == ServerDT) {
                    AssessedDate = LocalLastDcDate;
                    IsServerDateFormat = false;                  
                }
                else {
                    AssessedDate = ServerLastDcDate;
                    IsServerDateFormat = true;
                }
            }
            else {
                if (LocalLastDcDate != "") {
                    AssessedDate = LocalLastDcDate;
                    IsServerDateFormat = false;
                }
                else {
                    AssessedDate = ServerLastDcDate;
                    IsServerDateFormat = true;
                }
            }

            var FormattedDate = "";
            if (ServerLastDcDate != "" || LocalLastDcDate != "") {
                const monthNames = ["Jan", "Feb", "Mar", "April", "May", "June",
                                    "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
               
                if (IsServerDateFormat == true) {
                    FormattedDate = ServerDateSplitted[2] + "-" + xlatService.xlat(monthNames[ServerDT.getMonth()]) + "-" + ServerDateSplitted[0] + " " + ServerTimeSplitted[0] + ":" + ServerTimeSplitted[1] + ":" + ServerSecs;
                }
                else {
                    FormattedDate = LocalDateSplitted[0] + "-" + xlatService.xlat(monthNames[LocalDT.getMonth()]) + "-" + LocalDateSplitted[2] + " " + LocalTimeSplitted[0] + ":" + LocalTimeSplitted[1] + ":" + LocalSecs;
                }
            }
            OneViewConsole.Debug("GetLastDcDateFromServerNLocal end", "MitmarkTaskPageBO.GetLastDcDateFromServerNLocal");

           // alert('AssessedDate : ' + AssessedDate);
           // alert('FormattedDate : ' + FormattedDate);
            return FormattedDate;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "MitmarkTaskPageBO.GetLastDcDateFromServerNLocal", Excep);
        }
        finally {
        }
    }

}
