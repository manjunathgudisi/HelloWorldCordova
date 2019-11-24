
// DefaultLandingPageViewBO
function DefaultLandingPageViewBO() {

    this.GetHtml = function (Req) {

        var Html = "";

        var TaskDetails = GetTaskDetails(Req);
        TaskDetails = GetFormatedTaskDetails(Req, TaskDetails);
 
        for (var i = 0; i < TaskDetails.length; i++) {

            var ParentHtml = GetParentHtml(TaskDetails[i].ParentName);
            var ChildHtml = '';

            for (var j = 0; j < TaskDetails[i].Childs.length; j++) {

                ChildHtml += GetChildHtml(TaskDetails[i], TaskDetails[i].Childs[j]);
            }

            Html += ParentHtml + ChildHtml;
        }

        return Html;
    }

    var GetParentHtml = function (ParentName) {

        try {
            var Html = '<div class="item item-divider">' + ParentName + '</div>';
            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageBO.GetParentHtml", Excep);
        }
        finally {
        }
    }

    var GetChildHtml = function (oParent, oChild) {

        try {
            var Html = '<a class="item item-icon-left item-icon-right not-started-con" ng-click="TaskClick(' + oParent.ParentNodeId + ',' + oParent.IsDcPlace + ',' + oChild.ChildNodeId + ',' + oChild.IsDcPlace + ',\'' + oChild.DCStartRouteUrlKey + '\')">' +
                            '<i class="icon icon-bluetooth-audio"></i>' +
                                '<div class="row">' +
                                    '<div class="col col-80 no-padding no-margin">' +
                                        '<div class="heading">' + oChild.MainTask + '</div>' +
                                        '<div class="second-txt">' + oChild.SubTask + '</div>' +
                                    '</div>' +
                                    '<div class="col col-20 no-margin col-center no-padding text-right">' +
                                        '<i class="icon icon-social13 synced-color"></i>' +
                                        '<i class="icon icon-checkmark icon-disabled"></i>' +
                                        '<i class="icon icon-thumb-up-outline-symbol icon-disabled"></i>' +
                                        '<i class="icon icon-arrow68 icon-disabled"></i>' +
                                    '</div>' +
                                '</div>' +
                                '<i class="icon icon-ellipsis-v"></i>' +
                        '</a>';

            return Html;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageBO.GetChildHtml", Excep);
        }
        finally {
        }
    }

    var GetTaskDetails = function (Req) {
        try {
            OneViewConsole.Debug("GetTaskDetails Start", "DefaultLandingPageViewBO.GetTaskDetails");

            var TaskDetails = [];
            var _oDefaultLandingPageDAO = new DefaultLandingPageDAO();

            //alert('Req.TaskType : ' + Req.TaskType);
            if (Req.TaskType == "Overall") {              
                TaskDetails = _oDefaultLandingPageDAO.GetTaskStatusDetails(OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("LoginUserId"), Req);
            }

            else if (Req.TaskType == "NotStarted") {           
                TaskDetails = _oDefaultLandingPageDAO.GetNotStartedDcProfiles(Req.ViewConfig.LandingPageViewCriteria.TemplateNodeIdLst, Req.FromDate, Req.ToDate);
            }

            else if (Req.TaskType == "InProgress") {
                TaskDetails = _oDefaultLandingPageDAO.GetInProgressDcProfiles(Req.ViewConfig.LandingPageViewCriteria.TemplateNodeIdLst, Req.FromDate, Req.ToDate);
            }
                
            else if (Req.TaskType == "Missed") {
                alert(' Not implemented : ' + Req.TaskType);
            }

            else if (Req.TaskType == "NotSynced") {
                TaskDetails = _oDefaultLandingPageDAO.GetNotSyncedDcProfiles(Req.ViewConfig.LandingPageViewCriteria.TemplateNodeIdLst, Req.FromDate, Req.ToDate);
            }

            else if (Req.TaskType == "Completed") {
                TaskDetails = _oDefaultLandingPageDAO.GetCompletedDcProfiles(Req.ViewConfig.LandingPageViewCriteria.TemplateNodeIdLst, Req.FromDate, Req.ToDate);
            }

            else if (Req.TaskType == "Synced") {
                TaskDetails = _oDefaultLandingPageDAO.GetSyncedDcProfiles(Req.ViewConfig.LandingPageViewCriteria.TemplateNodeIdLst, Req.FromDate, Req.ToDate);
            }

            else if (Req.TaskType == "Approved") {
                TaskDetails = _oDefaultLandingPageDAO.GetApprovedDcProfiles(Req.ViewConfig.LandingPageViewCriteria.TemplateNodeIdLst, Req.FromDate, Req.ToDate);
            }
            OneViewConsole.Debug("GetTaskDetails End", "DefaultLandingPageViewBO.GetTaskDetails");

            return TaskDetails;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DefaultLandingPageViewBO.GetTaskDetails", Excep);
        }
        finally {
            _oDefaultMasterDAO = null;
        }
    }

    var GetFormatedTaskDetails = function (Req, TaskDetails) {
        try {
            OneViewConsole.Debug("GetOverallTaskStatus Start", "DefaultLandingPageViewBO.GetOverallTaskStatus");

            var LandingPageViewCriteria = Req.ViewConfig.LandingPageViewCriteria;
            var ParentViewConfig = Req.ViewConfig.ParentViewConfig;
            var ChildViewConfig = Req.ViewConfig.ChildViewConfig;
            var LandingPageGetHtmlResponse = "";

            if (ParentViewConfig.LandingPageParent == 1) {
                LandingPageGetHtmlResponse = FormatTaskDetailsForParentTypePlace(TaskDetails, ChildViewConfig);
            }
            else {
                alert("Not implemented exception : " + ParentViewConfig.LandingPageParent + ", DefaultLandingPageViewBO.GetTaskStatus");
            }
           
            return LandingPageGetHtmlResponse;

            OneViewConsole.Debug("GetOverallTaskStatus End", "DefaultLandingPageViewBO.GetOverallTaskStatus");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DefaultLandingPageViewBO.GetOverallTaskStatus", Excep);
        }
        finally {
            _oDefaultMasterDAO = null;    
        }
    }

    this.GetAllTaskStatus = function (Req) {

        try {
            OneViewConsole.Debug("GetAllTaskStatus start", "DefaultLandingPageViewBO.GetAllTaskStatus");

            var LandingPageGetAllTaskStatusResponse =
                 {
                     Overall: 0,
                     NotStarted: 0,
                     InProgress: 0,
                     Completed: 0,
                     Missed: 0,
                     Synced: 0,
                     NotSynced: 0,
                     Approved: 0,
                 };

            var LandingPageViewCriteria = Req.ViewConfig.LandingPageViewCriteria;

            if (LandingPageViewCriteria.Type == "DefaultLandingPageViewCriteria") {

                //  LandingPageViewCriteria = LandingPageConfig.LandingPageViewCriteria;

                var _oDefaultLandingPageDAO = new DefaultLandingPageDAO();
                var _GetAllTaskStatusDetails = _oDefaultLandingPageDAO.GetAllTaskStatusDetails(OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("LoginUserId"),Req);

                for (var i = 0; i < _GetAllTaskStatusDetails.length; i++) {
                    //Overall status Count
                    LandingPageGetAllTaskStatusResponse.Overall = parseInt(LandingPageGetAllTaskStatusResponse.Overall) + 1;

                    //InProgress status Count
                    if (_GetAllTaskStatusDetails[i].IsCompleted == "false") {
                        LandingPageGetAllTaskStatusResponse.InProgress = parseInt(LandingPageGetAllTaskStatusResponse.InProgress) + 1;
                    }

                    //Completed status Count
                    if (_GetAllTaskStatusDetails[i].IsCompleted == "true") {
                        LandingPageGetAllTaskStatusResponse.Completed = parseInt(LandingPageGetAllTaskStatusResponse.Completed) + 1;
                    }

                    //Synced status Count
                    if (_GetAllTaskStatusDetails[i].IsSynchronized == "true") {
                        LandingPageGetAllTaskStatusResponse.Synced = parseInt(LandingPageGetAllTaskStatusResponse.Synced) + 1;
                    }
                    //NotSynced status Count
                    if (_GetAllTaskStatusDetails[i].IsSynchronized == "false") {
                        LandingPageGetAllTaskStatusResponse.NotSynced = parseInt(LandingPageGetAllTaskStatusResponse.NotSynced) + 1;
                    }

                    //Approved status Count
                    if (_GetAllTaskStatusDetails[i].ApprovalStatus == "1") {
                        LandingPageGetAllTaskStatusResponse.Approved = parseInt(LandingPageGetAllTaskStatusResponse.Approved) + 1;
                    }
                }

                /*********Not  Started***********/

               
                var _GetNotStartedDetails = _oDefaultLandingPageDAO.GetNotStartedDcProfiles(Req.ViewConfig.LandingPageViewCriteria.TemplateNodeIdLst, Req.FromDate, Req.ToDate);
       
                for (var j = 0; j < _GetNotStartedDetails.length; j++) {
                    //Overall status Count
                    LandingPageGetAllTaskStatusResponse.Overall = parseInt(LandingPageGetAllTaskStatusResponse.Overall) + 1;
                    //Not Started Count
                    LandingPageGetAllTaskStatusResponse.NotStarted = parseInt(LandingPageGetAllTaskStatusResponse.NotStarted) + 1;

                }

                //alert("Response : " + JSON.stringify(LandingPageGetAllTaskStatusResponse));
            }
            else {
                alert("Not implemented exception : " + LandingPageViewCriteria.Type + ", DefaultLandingPageViewBO.GetAllTaskStatus");
            }
            OneViewConsole.Debug("GetAllTaskStatus End", "DefaultLandingPageViewBO.GetAllTaskStatus");
            return LandingPageGetAllTaskStatusResponse;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DefaultLandingPageViewBO.GetAllTaskStatus", Excep);
        }
        finally {
            LandingPageGetAllTaskStatusResponse = null;
            LandingPageViewCriteria = null;            
        }
    }

    var FormatTaskDetailsForParentTypePlace = function (TaskDetailsResult, ChildViewConfig) {
        try {
            OneViewConsole.Debug("FormatTaskDetails Start", "DefaultLandingPageViewBO.FormatTaskDetails");
            var TaskResponse = [];        

            for (var i = 0; i < TaskDetailsResult.length; i++) {

                var ParentViewResponse = {
                    ParentName: "",
                    ParentNodeId: 0,
                    IsLeafLevelParentNode: true,
                    IsDcPlace: true,
                    Status: {},
                    Childs: [],
                };
                var IsParentExist = false;

                if (TaskResponse.length > 0) {

                    for (var j = 0; j < TaskResponse.length; j++) {

                        if (TaskResponse[j].ParentName == TaskDetailsResult[i].DcPlaceName) {

                            ParentViewResponse = TaskResponse[j];
                            var ChildResponse = FormatChildView(ChildViewConfig, TaskDetailsResult[i], ParentViewResponse);
                            TaskResponse[j].Childs.push(ChildResponse);
                            IsParentExist = true;
                            break;
                        }
                    }
                }

                if (IsParentExist == false) {

                    ParentViewResponse.ParentName = TaskDetailsResult[i].DcPlaceName;
                    ParentViewResponse.ParentNodeId = TaskDetailsResult[i].DcPlaceId;
                    var ChildResponse = FormatChildView(ChildViewConfig, TaskDetailsResult[i], ParentViewResponse);
                    ParentViewResponse.Childs.push(ChildResponse);
                    TaskResponse.push(ParentViewResponse);

                }

            }
            
            OneViewConsole.Debug("FormatTaskDetails End", "DefaultLandingPageViewBO.FormatTaskDetails");

            return TaskResponse;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DefaultLandingPageViewBO.FormatTaskDetails", Excep);
        }
        finally {
            TaskResponse = null;

        }
    }

    var FormatChildView = function (ChildViewConfig, TaskDetailsResult, ParentViewResponse) {
        try {
            OneViewConsole.Debug("FormatChildView Start", "DefaultLandingPageViewBO.FormatChildView");
            
            var ChildViewResponse = {
                MainTask: "",
                SubTask: "",
                DCStartRouteUrlKey: "",
                DCUploadRouteUrlKey: "",
                DCProfileDownloadRouteUrlKey: "",
                Status: {},
                ChildNodeId: 0,
                IsLeafLevelChildNode: true,
                IsDcPlace: true,

            };

            if ((ChildViewConfig.MainExpression !== "" && ChildViewConfig.MainExpression !== undefined) && (ChildViewConfig.MainTaskElementDict !== "" && ChildViewConfig.MainTaskElementDict !== undefined)) {
                var MainTaskElementDict = ChildViewConfig.MainTaskElementDict;
                ChildViewResponse.MainTask = EvaluateExpression(ChildViewConfig.MainExpression, MainTaskElementDict, TaskDetailsResult);

                for (var Key in MainTaskElementDict) {

                    if (MainTaskElementDict[Key] == "DcPlace") {

                        ChildViewResponse.ChildNodeId = TaskDetailsResult.DcPlaceId;
                        ChildViewResponse.IsLeafLevelChildNode = true;
                        ChildViewResponse.IsDcPlace = true;
                    }
                    else if (MainTaskElementDict[Key] == "Template") {
                        ChildViewResponse.ChildNodeId = TaskDetailsResult.TemplateNodeId;
                        ChildViewResponse.IsLeafLevelChildNode = true;
                        ChildViewResponse.IsDcPlace = false;
                    }
                    else {
                        alert("Not implemented exception : " + Key + ", DefaultLandingPageViewBO.FormatChildView");
                    }
                }
                if (ParentViewResponse.IsLeafLevelParentNode == true && ChildViewResponse.IsLeafLevelChildNode == true) {
                    if (ChildViewResponse.IsDcPlace == true) {
                        ChildViewResponse.DCStartRouteUrlKey = "/newdc";
                    }
                    else if (ChildViewResponse.IsDcPlace == false) {
                        ChildViewResponse.DCStartRouteUrlKey = "/" + TaskDetailsResult.TemplateNodeId;
                    }
                }
                else {
                    alert("Not implemented exception IsLeafLevelParentNode: " + ParentViewResponse.IsLeafLevelParentNode + ", DefaultLandingPageViewBO.FormatChildView");
                }
            }

            if ((ChildViewConfig.SubExpression !== "" && ChildViewConfig.SubExpression !== undefined) && (ChildViewConfig.SubTaskElementDict !== "" && ChildViewConfig.SubTaskElementDict !== undefined)) {
                var SubTaskElementDict = ChildViewConfig.SubTaskElementDict;
                ChildViewResponse.SubTask = EvaluateExpression(ChildViewConfig.SubExpression, SubTaskElementDict, TaskDetailsResult);
            }
            

            OneViewConsole.Debug("FormatChildView End", "DefaultLandingPageViewBO.FormatChildView");

            return ChildViewResponse;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DefaultLandingPageViewBO.FormatChildView", Excep);
        }
        finally {
            ChildViewResponse = null;

        }
    }

    var EvaluateExpression = function (Expression, DisplayConfig, TaskDetailsResult) {
        try {
            OneViewConsole.Debug("EvaluateExpression Start", "DefaultLandingPageViewBO.EvaluateExpression");

            for (var Key in DisplayConfig) {
            
                if (DisplayConfig[Key] == "DcPlace") {
                    Expression = Expression.replace('$vn$' + Key + '$vn$', TaskDetailsResult.DcPlaceName);
                }            
                else if (DisplayConfig[Key] == "Template") {
                    Expression = Expression.replace('$vn$' + Key + '$vn$', TaskDetailsResult.TemplateName);

                }
                else {
                    alert("Not implemented exception : " + Key + ", DefaultLandingPageViewBO.EvaluateExpression");
                }
            }
      
            OneViewConsole.Debug("EvaluateExpression End", "DefaultLandingPageViewBO.EvaluateExpression");

            return Expression;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DefaultLandingPageViewBO.EvaluateExpression", Excep);
        }
        finally {
            ChildViewResponse = null;

        }
    }
}

// DefaultLandingPageDAO
function DefaultLandingPageDAO() {

    // Sqlite plugin initialization
    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    /// <summary>
    /// GetTaskStatusDetails
    /// </summary>     
    this.GetTaskStatusDetails = function (ServiceId, UserId,Req) {

        try {
            OneViewConsole.Debug("GetTaskStatusDetails Start", "DefaultLandingPageDAO.GetTaskStatusDetails");

            var FromDate=Req.FromDate;
            var ToDate=Req.ToDate;

            var oDateTime = new DateTime();
            FromDate = oDateTime.ConvertDateTimeToInteger(FromDate);
            ToDate = oDateTime.ConvertDateTimeToInteger(ToDate);

            var Query = "SELECT DcProfileEntity.*, (SUBSTR(DcS.StartDate, 7, 4) || SUBSTR(DcS.StartDate, 4, 2) || SUBSTR(DcS.StartDate, 1, 2) || SUBSTR(DcS.StartDate, 12, 2) || "+
                        "SUBSTR(DcS.StartDate, 15, 2) || SUBSTR(DcS.StartDate, 18, 2) ) AS SD ,(SUBSTR(DcS.EndDate, 7, 4) ||SUBSTR(DcS.EndDate, 4, 2) ||"+
                        "SUBSTR(DcS.EndDate, 1, 2) || SUBSTR(DcS.EndDate, 12, 2) || SUBSTR(DcS.EndDate, 15, 2) || SUBSTR(DcS.EndDate, 18, 2) ) AS ED " +
                        "FROM DcProfileEntity INNER JOIN  DefaultScheduleEntity DcS on DcProfileEntity.Id=DcS.DcProfileId "+
                        "Where DcProfileEntity.ServiceId=" + ServiceId + " AND DcProfileEntity.DcUserId=" + UserId+" and SD <= '" + FromDate + "' AND ( ED = '' OR  ED  > '" + ToDate + "' )";
            
            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultLandingPageDAO.GetTaskStatusDetails");
            //alert(Query)
            var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultLandingPageDAO.GetTaskStatusDetails");

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DefaultLandingPageDAO.GetTaskStatusDetails");

            OneViewConsole.Debug("GetTaskStatusDetails end", "DefaultLandingPageDAO.GetTaskStatusDetails");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DefaultLandingPageDAO.GetTaskStatusDetails", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    /// <summary>
    /// GetAllTaskStatusDetails
    /// </summary>     
    this.GetAllTaskStatusDetails = function (ServiceId, UserId, Req) {

        try {
            OneViewConsole.Debug("GetAllTaskStatus start", "DefaultLandingPageDAO.GetAllTaskStatus");

            var LandingPageViewCriteria = Req.ViewConfig.LandingPageViewCriteria;
            var FromDate = Req.FromDate;
        
            var oDateTime = new DateTime();
            FromDate = oDateTime.ConvertDateTimeToInteger(FromDate);
            var Condition = "";

            if (LandingPageViewCriteria.DcPlaceNodeIdLst.length > 0) {
                //var DcPlaceIdExp = FomatForStringInCondition(LandingPageViewCriteria.DcPlaceNodeIdLst);
                //Condition = "DcPlaceId IN " + DcPlaceIdExp;
                alert("Not implemented exception : DcPlaceNodeIdLst, DefaultLandingPageDAO.GetAllTaskStatusDetails");
            }          
            else if (LandingPageViewCriteria.TemplateNodeIdLst.length > 0) {
                var TemplateNodeIdExp = FomatForInCondition(LandingPageViewCriteria.TemplateNodeIdLst);
                Condition = "Dc.TemplateNodeId IN " + TemplateNodeIdExp;
            }
            else if (LandingPageViewCriteria.ProfileServerIdLst.length > 0) {
                //var DcProfileIdExp = FomatForStringInCondition(LandingPageViewCriteria.ProfileServerIdLst);
                //Condition = "DcProfileId IN " + DcProfileIdExp;
                alert("Not implemented exception : ProfileServerIdLst, DefaultLandingPageDAO.GetAllTaskStatusDetails");
            }
        
            var Result = "";
            if (Condition != ""){
                //var Query = "SELECT DataCaptureEntity.* FROM DataCaptureEntity Where ServiceId=" + ServiceId + " AND " + Condition;
                var Query ="SELECT Dc.* ,(SUBSTR(Dc.DcStartDate, 7, 4) || SUBSTR(Dc.DcStartDate, 4, 2) || SUBSTR(Dc.DcStartDate, 1, 2) || SUBSTR(Dc.DcStartDate, 12, 2) || "+
                            "SUBSTR(Dc.DcStartDate, 15, 2) || SUBSTR(Dc.DcStartDate, 18, 2) ) AS DcSD "+ 
                            "FROM DataCaptureEntity Dc "+
                            "INNER JOIN  DcResultsEntity DcR on Dc.Id=DcR.DataCaptureId "+  
                            "Where Dc.ServiceId=" + ServiceId + " AND DcR.SystemUserId=" + UserId + " And DcSD <= '" + FromDate + "' AND " + Condition;
        
            OneViewConsole.DataLog("Requested Query : " + Query, "DefaultLandingPageDAO.GetAllTaskStatus");

            Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);
      
            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DefaultLandingPageDAO.GetAllTaskStatus");

            OneViewConsole.Debug("GetAllTaskStatus end", "DefaultLandingPageDAO.GetAllTaskStatus");
            }

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DefaultLandingPageDAO.GetAllTaskStatus", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    var FomatForInCondition = function (DcInfo) {
        try {
            OneViewConsole.Debug("FomatForInCondition Start ", "DefaultLandingPageDAO.FomatForInCondition");

            var Incondition = "(";
            for (var i = 0; i < DcInfo.length; i++) {
                Incondition += DcInfo[i] ;
                Incondition += (i <= DcInfo.length - 2) ? "," : ")";
            }
            OneViewConsole.DataLog("FomatForInCondition Incondition : " + Incondition, "DCBlockerInfoDAO.FomatForInCondition");

            OneViewConsole.Debug("FomatForInCondition end ", "DefaultLandingPageDAO.FomatForInCondition");

            return Incondition;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultLandingPageDAO.FomatForInCondition", Excep);
        }
        finally {
            Incondition = null;
        }
    }

    var FomatForStringInCondition = function (DcInfo) {
        try {
            OneViewConsole.Debug("FomatForInCondition Start ", "DefaultLandingPageDAO.FomatForInCondition");

            var Incondition = "(";
            for (var i = 0; i < DcInfo.length; i++) {
                Incondition += "'" + DcInfo[i] + "'";
                Incondition += (i <= DcInfo.length - 2) ? "," : ")";
            }
            OneViewConsole.DataLog("FomatForInCondition Incondition : " + Incondition, "DCBlockerInfoDAO.FomatForInCondition");

            OneViewConsole.Debug("FomatForInCondition end ", "DefaultLandingPageDAO.FomatForInCondition");

            return Incondition;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultLandingPageDAO.FomatForInCondition", Excep);
        }
        finally {
            Incondition = null;
        }
    }

    this.GetNotStartedDcProfiles = function (IdList, FromDate, ToDate) {
        try {
            OneViewConsole.Debug("GetNotStartedDcProfiles Start ", "DefaultLandingPageDAO.GetNotStartedDcProfiles");

            var oDateTime = new DateTime();
            FromDate = oDateTime.ConvertDateTimeToInteger(FromDate); // oDateTime.ConvertDateTimeToInteger('03-02-2016 00:00:00');//
            ToDate = oDateTime.ConvertDateTimeToInteger(ToDate);// oDateTime.ConvertDateTimeToInteger('03-02-2016 23:59:00'); //

            var Incondition = "(";
            for (var i = 0; i < IdList.length; i++) {
                Incondition += IdList[i];
                Incondition += (i <= IdList.length - 2) ? "," : ")";
            }

            //alert('Incondition : ' + Incondition);
            var Query = "Select DISTINCT  DcP.*,(SUBSTR(DcS.StartDate, 7, 4) || SUBSTR(DcS.StartDate, 4, 2) || SUBSTR(DcS.StartDate, 1, 2) || SUBSTR(DcS.StartDate, 12, 2) || " +
                                                " SUBSTR(DcS.StartDate, 15, 2) || SUBSTR(DcS.StartDate, 18, 2) ) AS SD ,(SUBSTR(DcS.EndDate, 7, 4) ||SUBSTR(DcS.EndDate, 4, 2) || " +
                                                " SUBSTR(DcS.EndDate, 1, 2) || SUBSTR(DcS.EndDate, 12, 2) || SUBSTR(DcS.EndDate, 15, 2) || SUBSTR(DcS.EndDate, 18, 2) ) AS ED " +
                                                " from DcProfileEntity AS DcP INNER JOIN DefaultScheduleEntity DcS ON DcP.Id = DcS.DcProfileId " +
                                                " LEFT JOIN DataCaptureEntity AS Dc ON Dc.TemplateNodeId = DcP.TemplateNodeId " +
                                                " WHERE SD <= '" + FromDate + "' AND ( ED = '' OR  ED  > '" + ToDate + "' ) AND DcP.TemplateNodeId  IN  " + Incondition + "AND Dc.Id is null ";
           
            //alert('Query : ' + Query);

            var Result = window.OneViewSqlite.excecuteSqlReader(Query);
            Result = JSON.parse(Result);

            //alert(Result.length);
            //alert(JSON.stringify(Result));

            OneViewConsole.DataLog("Response from db Result : " + JSON.stringify(Result), "DefaultLandingPageDAO.GetNotStartedDcProfiles");
            
            OneViewConsole.Debug("GetNotStartedDcProfiles end ", "DefaultLandingPageDAO.GetNotStartedDcProfiles");

            return Result;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DefaultLandingPageDAO.GetNotStartedDcProfiles", Excep);
        }
        finally {
            Query = null;
            Result = null;

        }
    }

    this.GetInProgressDcProfiles = function (IdList, FromDate, ToDate) {
        try {
            OneViewConsole.Debug("GetInProgressDcProfiles Start ", "DefaultLandingPageDAO.GetInProgressDcProfiles");

            var oDateTime = new DateTime();
            FromDate = oDateTime.ConvertDateTimeToInteger(FromDate); // oDateTime.ConvertDateTimeToInteger('03-02-2016 00:00:00');//
            ToDate = oDateTime.ConvertDateTimeToInteger(ToDate);// oDateTime.ConvertDateTimeToInteger('03-02-2016 23:59:00'); //

            var Incondition = "(";
            for (var i = 0; i < IdList.length; i++) {
                Incondition += IdList[i];
                Incondition += (i <= IdList.length - 2) ? "," : ")";
            }
            //alert('Incondition : ' + Incondition);
            var Query = "Select DISTINCT  DcP.*,(SUBSTR(DcS.StartDate, 7, 4) || SUBSTR(DcS.StartDate, 4, 2) || SUBSTR(DcS.StartDate, 1, 2) || SUBSTR(DcS.StartDate, 12, 2) || " +
                                                " SUBSTR(DcS.StartDate, 15, 2) || SUBSTR(DcS.StartDate, 18, 2) ) AS SD ,(SUBSTR(DcS.EndDate, 7, 4) ||SUBSTR(DcS.EndDate, 4, 2) || " +
                                                " SUBSTR(DcS.EndDate, 1, 2) || SUBSTR(DcS.EndDate, 12, 2) || SUBSTR(DcS.EndDate, 15, 2) || SUBSTR(DcS.EndDate, 18, 2) ) AS ED " +
                                                " from DcProfileEntity AS DcP INNER JOIN DefaultScheduleEntity DcS ON DcP.Id = DcS.DcProfileId " +
                                                " INNER JOIN DataCaptureEntity AS Dc ON Dc.TemplateNodeId = DcP.TemplateNodeId " +
                                                " WHERE SD <= '" + FromDate + "' AND ( ED = '' OR  ED  > '" + ToDate + "' ) AND DcP.TemplateNodeId  IN  " + Incondition ;

            //alert('Query : ' + Query);

            var Result = window.OneViewSqlite.excecuteSqlReader(Query);
            Result = JSON.parse(Result);

            //alert(Result.length);
            //alert(JSON.stringify(Result));

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DefaultLandingPageDAO.GetInProgressDcProfiles");

            OneViewConsole.Debug("GetInProgressDcProfiles end ", "DefaultLandingPageDAO.GetInProgressDcProfiles");

            return Result;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.GetInProgressDcProfiles", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetNotSyncedDcProfiles = function (IdList, FromDate, ToDate) {
        try {
            OneViewConsole.Debug("GetNotSyncedDcProfiles Start ", "DefaultLandingPageDAO.GetNotSyncedDcProfiles");

            var oDateTime = new DateTime();
            FromDate = oDateTime.ConvertDateTimeToInteger(FromDate); // oDateTime.ConvertDateTimeToInteger('03-02-2016 00:00:00');//
            ToDate = oDateTime.ConvertDateTimeToInteger(ToDate);// oDateTime.ConvertDateTimeToInteger('03-02-2016 23:59:00'); //

            var Incondition = "(";
            for (var i = 0; i < IdList.length; i++) {
                Incondition += IdList[i];
                Incondition += (i <= IdList.length - 2) ? "," : ")";
            }
            //alert('Incondition : ' + Incondition);
            var Query = "Select DISTINCT  DcP.*,(SUBSTR(DcS.StartDate, 7, 4) || SUBSTR(DcS.StartDate, 4, 2) || SUBSTR(DcS.StartDate, 1, 2) || SUBSTR(DcS.StartDate, 12, 2) || " +
                                                " SUBSTR(DcS.StartDate, 15, 2) || SUBSTR(DcS.StartDate, 18, 2) ) AS SD ,(SUBSTR(DcS.EndDate, 7, 4) ||SUBSTR(DcS.EndDate, 4, 2) || " +
                                                " SUBSTR(DcS.EndDate, 1, 2) || SUBSTR(DcS.EndDate, 12, 2) || SUBSTR(DcS.EndDate, 15, 2) || SUBSTR(DcS.EndDate, 18, 2) ) AS ED " +
                                                " from DcProfileEntity AS DcP INNER JOIN DefaultScheduleEntity DcS ON DcP.Id = DcS.DcProfileId " +
                                                " INNER JOIN DataCaptureEntity AS Dc ON Dc.TemplateNodeId = DcP.TemplateNodeId  AND Dc.IsSynchronized = 'false' " +
                                                " WHERE SD <= '" + FromDate + "' AND ( ED = '' OR  ED  > '" + ToDate + "' ) AND DcP.TemplateNodeId  IN  " + Incondition;

            //alert('Query : ' + Query);

            var Result = window.OneViewSqlite.excecuteSqlReader(Query);
            Result = JSON.parse(Result);

            //alert(Result.length);
            //alert(JSON.stringify(Result));

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DefaultLandingPageDAO.GetNotSyncedDcProfiles");

            OneViewConsole.Debug("GetNotSyncedDcProfiles end ", "DefaultLandingPageDAO.GetNotSyncedDcProfiles");

            return Result;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.GetNotSyncedDcProfiles", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetCompletedDcProfiles = function (IdList, FromDate, ToDate) {
        try {
            OneViewConsole.Debug("GetCompletedDcProfiles Start ", "DefaultLandingPageDAO.GetCompletedDcProfiles");

            var oDateTime = new DateTime();
            FromDate = oDateTime.ConvertDateTimeToInteger(FromDate); // oDateTime.ConvertDateTimeToInteger('03-02-2016 00:00:00');//
            ToDate = oDateTime.ConvertDateTimeToInteger(ToDate);// oDateTime.ConvertDateTimeToInteger('03-02-2016 23:59:00'); //

            var Incondition = "(";
            for (var i = 0; i < IdList.length; i++) {
                Incondition += IdList[i];
                Incondition += (i <= IdList.length - 2) ? "," : ")";
            }
            //alert('Incondition : ' + Incondition);
            var Query = "Select DISTINCT  DcP.*,(SUBSTR(DcS.StartDate, 7, 4) || SUBSTR(DcS.StartDate, 4, 2) || SUBSTR(DcS.StartDate, 1, 2) || SUBSTR(DcS.StartDate, 12, 2) || " +
                                                " SUBSTR(DcS.StartDate, 15, 2) || SUBSTR(DcS.StartDate, 18, 2) ) AS SD ,(SUBSTR(DcS.EndDate, 7, 4) ||SUBSTR(DcS.EndDate, 4, 2) || " +
                                                " SUBSTR(DcS.EndDate, 1, 2) || SUBSTR(DcS.EndDate, 12, 2) || SUBSTR(DcS.EndDate, 15, 2) || SUBSTR(DcS.EndDate, 18, 2) ) AS ED " +
                                                " from DcProfileEntity AS DcP INNER JOIN DefaultScheduleEntity DcS ON DcP.Id = DcS.DcProfileId " +
                                                " INNER JOIN DataCaptureEntity AS Dc ON Dc.TemplateNodeId = DcP.TemplateNodeId  AND Dc.IsCompleted = 'true' " +
                                                " WHERE SD <= '" + FromDate + "' AND ( ED = '' OR  ED  > '" + ToDate + "' ) AND DcP.TemplateNodeId  IN  " + Incondition;

            //alert('Query : ' + Query);

            var Result = window.OneViewSqlite.excecuteSqlReader(Query);
            Result = JSON.parse(Result);

            //alert(Result.length);
            //alert(JSON.stringify(Result));

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DefaultLandingPageDAO.GetCompletedDcProfiles");

            OneViewConsole.Debug("GetCompletedDcProfiles end ", "DefaultLandingPageDAO.GetCompletedDcProfiles");

            return Result;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.GetCompletedDcProfiles", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetSyncedDcProfiles = function (IdList, FromDate, ToDate) {
        try {
            OneViewConsole.Debug("GetSyncedDcProfiles Start ", "DefaultLandingPageDAO.GetSyncedDcProfiles");

            var oDateTime = new DateTime();
            FromDate = oDateTime.ConvertDateTimeToInteger(FromDate); // oDateTime.ConvertDateTimeToInteger('03-02-2016 00:00:00');//
            ToDate = oDateTime.ConvertDateTimeToInteger(ToDate);// oDateTime.ConvertDateTimeToInteger('03-02-2016 23:59:00'); //

            var Incondition = "(";
            for (var i = 0; i < IdList.length; i++) {
                Incondition += IdList[i];
                Incondition += (i <= IdList.length - 2) ? "," : ")";
            }
            //alert('Incondition : ' + Incondition);
            var Query = "Select DISTINCT  DcP.*,(SUBSTR(DcS.StartDate, 7, 4) || SUBSTR(DcS.StartDate, 4, 2) || SUBSTR(DcS.StartDate, 1, 2) || SUBSTR(DcS.StartDate, 12, 2) || " +
                                                " SUBSTR(DcS.StartDate, 15, 2) || SUBSTR(DcS.StartDate, 18, 2) ) AS SD ,(SUBSTR(DcS.EndDate, 7, 4) ||SUBSTR(DcS.EndDate, 4, 2) || " +
                                                " SUBSTR(DcS.EndDate, 1, 2) || SUBSTR(DcS.EndDate, 12, 2) || SUBSTR(DcS.EndDate, 15, 2) || SUBSTR(DcS.EndDate, 18, 2) ) AS ED " +
                                                " from DcProfileEntity AS DcP INNER JOIN DefaultScheduleEntity DcS ON DcP.Id = DcS.DcProfileId " +
                                                " INNER JOIN DataCaptureEntity AS Dc ON Dc.TemplateNodeId = DcP.TemplateNodeId  AND Dc.IsSynchronized = 'true' " +
                                                " WHERE SD <= '" + FromDate + "' AND ( ED = '' OR  ED  > '" + ToDate + "' ) AND DcP.TemplateNodeId  IN  " + Incondition;

            //alert('Query : ' + Query);

            var Result = window.OneViewSqlite.excecuteSqlReader(Query);
            Result = JSON.parse(Result);

            //alert(Result.length);
            //alert(JSON.stringify(Result));

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DefaultLandingPageDAO.GetSyncedDcProfiles");

            OneViewConsole.Debug("GetSyncedDcProfiles end ", "DefaultLandingPageDAO.GetSyncedDcProfiles");

            return Result;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.GetSyncedDcProfiles", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

    this.GetApprovedDcProfiles = function (IdList, FromDate, ToDate) {
        try {
            OneViewConsole.Debug("GetApprovedDcProfiles Start ", "DefaultLandingPageDAO.GetApprovedDcProfiles");

            var oDateTime = new DateTime();
            FromDate = oDateTime.ConvertDateTimeToInteger(FromDate); // oDateTime.ConvertDateTimeToInteger('03-02-2016 00:00:00');//
            ToDate = oDateTime.ConvertDateTimeToInteger(ToDate);// oDateTime.ConvertDateTimeToInteger('03-02-2016 23:59:00'); //

            var Incondition = "(";
            for (var i = 0; i < IdList.length; i++) {
                Incondition += IdList[i];
                Incondition += (i <= IdList.length - 2) ? "," : ")";
            }
            //alert('Incondition : ' + Incondition);
            var Query = "Select DISTINCT  DcP.*,(SUBSTR(DcS.StartDate, 7, 4) || SUBSTR(DcS.StartDate, 4, 2) || SUBSTR(DcS.StartDate, 1, 2) || SUBSTR(DcS.StartDate, 12, 2) || " +
                                                " SUBSTR(DcS.StartDate, 15, 2) || SUBSTR(DcS.StartDate, 18, 2) ) AS SD ,(SUBSTR(DcS.EndDate, 7, 4) ||SUBSTR(DcS.EndDate, 4, 2) || " +
                                                " SUBSTR(DcS.EndDate, 1, 2) || SUBSTR(DcS.EndDate, 12, 2) || SUBSTR(DcS.EndDate, 15, 2) || SUBSTR(DcS.EndDate, 18, 2) ) AS ED " +
                                                " from DcProfileEntity AS DcP INNER JOIN DefaultScheduleEntity DcS ON DcP.Id = DcS.DcProfileId " +
                                                " INNER JOIN DataCaptureEntity AS Dc ON Dc.TemplateNodeId = DcP.TemplateNodeId  AND  Dc.ApprovalStatus = 1 " +
                                                " WHERE SD <= '" + FromDate + "' AND ( ED = '' OR  ED  > '" + ToDate + "' ) AND DcP.TemplateNodeId  IN  " + Incondition;

            //alert('Query : ' + Query);

            var Result = window.OneViewSqlite.excecuteSqlReader(Query);
            Result = JSON.parse(Result);

            //alert(Result.length);
            //alert(JSON.stringify(Result));

            OneViewConsole.DataLog("Response from db : " + JSON.stringify(Result), "DefaultLandingPageDAO.GetApprovedDcProfiles");

            OneViewConsole.Debug("GetApprovedDcProfiles end ", "DefaultLandingPageDAO.GetApprovedDcProfiles");

            return Result;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "ActionDAO.GetApprovedDcProfiles", Excep);
        }
        finally {
            Query = null;
            Result = null;
        }
    }

}

var LandingPageGetHtmlRequest = {

    ViewConfig :  {
        LandingPageViewCriteria: {

            Type: "DefaultLandingPageViewCriteria",
            DcPlaceNodeIdLst: [],
            DcPlaceDimension: 16,
            TemplateNodeIdLst: [88, 448, 11592],
            ProfileServerIdLst: [],
        },

        ParentViewConfig: {

            LandingPageParent: 1,
            ParentLevel: 1,
            ParentType: 0,
            IsParentTypeMode: false
        },

        ChildViewConfig: {

            MainExpression: "$$vn$$Template$$vn$$",
            MainTaskElementDict: "",
            SubExpression: "",
            SubTaskElementDict: "",
            DCStartRouteUrlKey: "",
            DCUploadRouteUrlKey: "",
            DCProfileDownloadRouteUrlKey: "",
        }
    },  
    TaskType: "",
    FromDate : "",
    ToDate : "",
    PageSize : -1,
    PageNumber: -1,
}

var LandingPageGetHtmlResponse = [
    {
        ParentName: "",
        Status: {},
        Childs: [
            {
                MainTask: "",
                SubTask: "",
                DCStartRouteUrlKey: "",
                DCUploadRouteUrlKey: "",
                DCProfileDownloadRouteUrlKey: "",
                Status: {},
            }
        ]
    }
]



   


