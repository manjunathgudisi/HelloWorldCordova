var state = null;
var GridDataSource = null;
var RowIndex = -1;
var GridConfig = null;
var DefaultInlineEditConfig = null;
var ViewRecordsFacadeKey = null;
var FilterRuleConfig = null;
var InlineEditFinishedEventHandler = null;
var GraphSearchTime = 0000; // Millie seconds
var MaxRowCount = 11;
var PageNumber = 1;
var PageCount = 0;
var NormalizedDataCount = 0;
var scope = null;
var Mylocation = null;
var DcInfoViewRecords = null
var oxlatService = null;
var GridMetaData = {};
var FilterMetaData = {};
//var ViewRecordsNCRuleId = 0;

var ViewRecordsNCRuleHandler = [];

MyApp.controller('ViewRecordsController', function ($scope, xlatService, $location, $templateCache, $timeout, $compile, snapRemote) {
	  
    //oSetDefaultSpinner.Start();
   
    $scope.IsCompleted = $location.search().IsCompleted;
    $scope.IsSynchronized = $location.search().IsSynchronized;

    var oOneViewSidePanel = new OneViewSidePanel();
    oOneViewSidePanel.Clear();

    var _oViewRecordsBO = new ViewRecordsBO();
    _oViewRecordsBO.LoadMetadata();
    _oViewRecordsBO.SetGridConfig();
    var oViewRecordsFacade = ViewRecordsFacadeFactory($scope, xlatService, '');

    oViewRecordsFacade.Init($location);
    $scope.divNCButton = false;
    oViewRecordsFacade.PageLoad();
     
    //oSetDefaultSpinner.Stop();

    //$scope.$on('$viewContentLoaded', function () {
    //    alert('monitor viewContentLoaded 1234');
    //    AutoCompleteDestroyHTML();
    //    AutoCompleteGenerateHTML();
    //});

    $scope.$on('$destroy', function () {       
        oOneViewSidePanel.Clear();
        oGlobalOneViewBluetoothTemperatureLoggerPlugin.AutoTemperatureEventHandler = null;
        oOneViewAppInfoPlugin.UnLockOrientation();

        GridDataSource = null;
        GridConfig = null;
        DefaultInlineEditConfig = null;
        ViewRecordsFacadeKey = null;
        FilterRuleConfig = null;
        InlineEditFinishedEventHandler = null;
        DcInfoViewRecords = null;
        GridMetaData = {};
        FilterMetaData = {};

    });

    var lastTimeOutId = null;
    $scope.GraphSearch = function () {
        if (lastTimeOutId != null)
            window.clearTimeout(lastTimeOutId);
        lastTimeOutId = window.setTimeout(oViewRecordsFacade.GraphSearch, GraphSearchTime);
    }

    $scope.ShowResponsiveFilter = function ($event) {
        document.body.classList.add('platform-ios');
        $scope.filter.show($event);        
    };
    $scope.CloseResponsiveFilter = function () {
        $scope.filter.hide();
        document.body.classList.remove('platform-ios');        
    };

    $scope.ShowGrigFilter = function ($event) {
        //var TemplateNodeId = OneViewSessionStorage.Get("TemplateId");        
        //if (TemplateNodeId != '44') {
            document.body.classList.add('platform-ios');
            $scope.drop.show($event);
        //}
    };
    $scope.CloseGrigFilter = function () {
        oOneViewSidePanel.Toggle(snapRemote);        
        _oOneViewSidePanel.Clear();
        //$scope.drop.hide();
        //document.body.classList.remove('platform-ios');       
    };

    $scope.EditNCRecords = function (){
        // $state.go('app.NCFormAction' + OneViewSessionStorage.Get("TemplateId"));
        // $location.path('/app-' + OneViewSessionStorage.Get("TemplateId"));    
        OneViewSessionStorage.Save("ViewRecordsForm", true);
        $location.url('/' + OneViewSessionStorage.Get("TemplateId"));
        OneViewSessionStorage.Save("NCInlineEdit", 'true');
    }
   
    $scope.ResponsiveFieldChanged = function (ResponsiveColumn) {       
        oViewRecordsFacade.ResponsiveFieldChanged(ResponsiveColumn);
    }

    $scope.ApplyFilter = function () {       
        oViewRecordsFacade.ApplyFilter(snapRemote);
        //$scope.drop.hide();
        //document.body.classList.remove('platform-ios');
    }

    $scope.GoBack = function () {        
        oViewRecordsFacade.GoBack();
    }

    $scope.EditRecords = function () {        
        oViewRecordsFacade.EditRecords($location);       
    }

    $scope.Previous = function () {       
        oViewRecordsFacade.Previous();        
    }

    $scope.Next = function () {       
        oViewRecordsFacade.Next();        
    }

    $scope.GetProbeStatus = function () {
        oViewRecordsFacade.GetProbeStatus();
    };

    $scope.ToggleFilterPopUp = function () {
        oViewRecordsFacade.ToggleFilterPopUp($compile, snapRemote);
    }

    $scope.ToggleResponsivePopUp = function () {
        oViewRecordsFacade.ToggleResponsivePopUp($compile, snapRemote);
    }

    $scope.ResetResposiveFilter = function () {
        //alert("Comming soon ....");
        oViewRecordsFacade.ResetResposiveFilter();
        oOneViewSidePanel.Toggle(snapRemote);
    }

    $scope.ProbeTesting = function () {
      //  alert('ProbeTesting');
        oViewRecordsFacade.ProbeTesting();
        
    }

    $scope.LoadNewDc = function () {
        oViewRecordsFacade.LoadNewDc($location);
    }

    $scope.FilterDataChanged = function (Header) {        
        oViewRecordsFacade.FilterDataChanged(Header);
    }
});

function ViewRecordsFacade($scope, xlatService, toaster) {
	
	var MyInstance = this;
	var _oViewRecordsBO = new ViewRecordsBO(xlatService, toaster);
	var _oSettingsBO = new SettingsBO();
	this.AutoTemperature = "";

	this.Init = function ($location) {
		
        try {
            OneViewConsole.Debug("Init start", "ViewRecordsFacade.Init");

            oOneViewAppInfoPlugin.SetLandScapeOrientation();

            //xlatService.setCurrentPage('ViewRecords_Page');
            xlatService.setCurrentPage('11');
            document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');
			Mylocation = $location;
			scope = $scope;
			oxlatService = xlatService;
			$scope.HeaderHeight = 0;
			RowIndex = -1;
			PageNumber = 1;
			PageCount = 0;
			ViewRecordsNCRuleHandler = [];
			var oGridControl = new GridControl();							
			$scope.GridInstance = oGridControl;		
			_oViewRecordsBO.SetFilterRuleConfig();
			
			if(GridConfig != null){				
				oGridControl.LoadHeaderRow(GridConfig);
				_oViewRecordsBO.LoadResponsiveData($scope, GridConfig);				
			}
			if(FilterRuleConfig != null){
				_oViewRecordsBO.LoadFilterData($scope, FilterRuleConfig);		
			}

			OneViewConsole.Debug("Init end", "ViewRecordsFacade.Init");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.Init", xlatService);
		}
        finally {
            oGridControl = null;
        }
    }

	this.PageLoad = function ($compile) {
        try {
            OneViewConsole.Debug("PageLoad start", "ViewRecordsFacade.PageLoad");
            
			_oViewRecordsBO.SetHeaderHeight($scope);			
			if(FilterRuleConfig != null){
				_oViewRecordsBO.SetDCFilterEquation(FilterRuleConfig);	
			}
			if (GridConfig != null) {
			    _oViewRecordsBO.GetDataSource($scope);
			    _oViewRecordsBO.LoadSearchGrid($scope, GridDataSource);			  
			}

			$scope.CurrentPage = PageNumber;
		
			if (PageCount == 1) {
			    $scope.GridInstance.Hide('Previous');
			    $scope.GridInstance.Hide('Next');			    
			}
			else if (PageCount > 1) {			    
			    $scope.GridInstance.Show('Next');
			}
			
			_oSettingsBO.ShowAutoManualStatus(scope);

			OneViewConsole.Debug("PageLoad end", "ViewRecordsFacade.PageLoad");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.PageLoad", xlatService);
		}        
	}

	this.ToggleFilterPopUp = function ($compile, snapRemote) {
	    try {
	        if (FilterRuleConfig != null) {
	            LoadFilterHtml($compile, snapRemote);
	        }
	    }
	    catch (Excep) {
	        oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.ToggleFilterPopUp", xlatService);
	    }
	}

	this.ToggleResponsivePopUp = function ($compile, snapRemote) {
	    try {
	        if (GridConfig != null) {
	            LoadResposiveHtml($compile, snapRemote);
	        }
	    }
	    catch (Excep) {
	        oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.ToggleResponsivePopUp", xlatService);
	    }	    
	}

	this.ResetResposiveFilter = function () {
	    try {
	        for (var i = 0; i < $scope.ResponsiveData.length; i++) {
	            if ($scope.ResponsiveData[i].selected != "selected") {
	                $scope.ResponsiveData[i].selected = "selected";
	                this.ResponsiveFieldChanged($scope.ResponsiveData[i]);
	            }
	        }
	    }
	    catch (Excep) {
	        oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.ResetResposiveFilter", xlatService);
	    }	    
	}

	var LoadResposiveHtml = function ($compile, snapRemote) {
        
	    try{
	        var _oOneViewSidePanel = new OneViewSidePanel(snapRemote);
	        _oOneViewSidePanel.Clear();

	        //var Html = '<div class="bar bar-header"><h3>Show/Hide</h3></div><div class="scroll-content scrollable has-header has-footer">' +
	        var Html = '<div class="bar bar-header"><h3>' + xlatService.xlat('Show/Hide') + '</h3></div><div class="scroll-content scrollable has-header has-footer">' +
                            '<tick-list multiple="true" selected-icon="ion-checkmark">' +
                               '<tick-list-item ng-repeat="header in ResponsiveData" selected="{{header.selected}}" selected-icon="{{facility.icon}}" model="header" on-change="ResponsiveFieldChanged(header)">{{header.DisplayName}}</tick-list-item>' +
                           '</tick-list></div>' +
                       '<div class="bar bar-footer no-padding"><div class="row"><div class="col"><a class="button button-block button-clear" ng-click="CloseGrigFilter()">' + xlatService.xlat('Close') + '</a></div><div class="col"><a class="button button-block button-clear" ng-click="ResetResposiveFilter()">' + xlatService.xlat('Reset') + '</a></div></div></div>';

	        var _oOneViewCompiler = new OneViewCompiler();
	        _oOneViewCompiler.CompileAndApeend($scope, $compile, Html, "divAutocomplatePopUp");

	        _oOneViewSidePanel.Toggle(snapRemote);
	    }
	    catch (Excep) {
	        oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.LoadResposiveHtml", xlatService);
	    }
	}

	var LoadFilterHtml = function ($compile, snapRemote) {

	    try {
	        var _oOneViewSidePanel = new OneViewSidePanel();
	        _oOneViewSidePanel.Clear();

	        var Html = '<div class="bar bar-header"><h3>' + xlatService.xlat('Filter') + '</h3></div><div class="scroll-content scrollable has-header has-footer">' +
                            '<tick-list multiple="true" selected-icon="ion-checkmark">' +
                                '<tick-list-item ng-repeat="header in FilterData" selected="{{header.selected}}" selected-icon="{{facility.icon}}" model="header" on-change="FilterDataChanged(header)">{{header.DisplayName}}</tick-list-item>' +
                            '</tick-list></div>' +
                            '<div class="bar bar-footer no-padding"><div class="row">' +
                                '<div class="col"><a class="button button-block button-clear" ng-click="CloseGrigFilter()"><i class="icon ion-close-round"></i>' + xlatService.xlat('Close') + '</a></div>' +
                                '<div class="col"><a class="button button-block button-clear" ng-click="ApplyFilter()"><i class="icon ion-close-round"></i>' + xlatService.xlat('Apply') + '</a></div>' +
                            '</div>' +
                       '</div>';

	        var _oOneViewCompiler = new OneViewCompiler();
	        _oOneViewCompiler.CompileAndApeend($scope, $compile, Html, "divAutocomplatePopUp");

	        _oOneViewSidePanel.Toggle(snapRemote);
	    }
	    catch (Excep) {
	        oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.LoadFilterHtml", xlatService);
	    }
	}

    this.GraphSearch = function () {
        try {
            OneViewConsole.Debug("GraphSearch start", "ViewRecordsFacade.GraphSearch");

            DcInfoViewRecords = null;

            PageNumber = 1;
            $scope.CurrentPage = PageNumber;

            _oViewRecordsBO.GetDataSourceWithFilters($scope, FilterRuleConfig);
            _oViewRecordsBO.LoadSearchGrid($scope, GridDataSource);
           
            ResetGridStatus($scope);

            OneViewConsole.Debug("GraphSearch end", "ViewRecordsFacade.GraphSearch");
		}
		catch (Excep) {
		    oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.GraphSearch", xlatService);
		}    
    }

    var ResetGridStatus = function ($scope) {

        try {
            OneViewConsole.Debug("ResetGridStatus start", "ViewRecordsFacade.ResetGridStatus");
           
            var IsResetGrid = false;

            if ($scope.TotalRecordsCount == 0) {
                $scope.GridInstance.ResetGrid($scope);
                IsResetGrid = true;
            }
            else if ($scope.TotalPageCount == 1 && IsResetGrid == false) {
                $scope.GridInstance.Hide('Previous');
                $scope.GridInstance.Hide('Next');
            }
            else if ($scope.TotalPageCount > 1 && IsResetGrid == false) {
                $scope.GridInstance.Show('Next');
            }

            OneViewConsole.Debug("ResetGridStatus end", "ViewRecordsFacade.ResetGridStatus");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.ResetGridStatus", xlatService);
        }
    }

    this.RowClick = function (DcId, IndexId, IsCompleted, IsSynchronized) {
        try {
            OneViewConsole.Debug("RowClick start", "ViewRecordsFacade.RowClick");

                if (RowIndex != -1) {
                    _oViewRecordsBO.RemoveRowColor(RowIndex);
                }

                RowIndex = IndexId;

                _oViewRecordsBO.SetRowColor(RowIndex);
                _oViewRecordsBO.SaveDcIdIntoSession(DcId);

                OneViewSessionStorage.Save("IsDcCompletedBeforeEdit", IsCompleted);
                OneViewSessionStorage.Save("IsDcSynchronizedBeforeEdit", IsSynchronized);

                var NCDcId = new DataCaptureBO().GetNCDcID(DcId);
                if (NCDcId != undefined) {
                    scope.divNCButton = true;
                }
                else {
                    scope.divNCButton = false;
                }
                scope.$apply();
          
			 OneViewConsole.Debug("RowClick end", "ViewRecordsFacade.RowClick");
		}
        catch (Excep) {           
            oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.RowClick", xlatService);
		}     
    }

    this.EditRecords = function ($location) {
        try {
            OneViewConsole.Debug("EditRecords start", "ViewRecordsFacade.EditRecords");

            if (RowIndex != -1) {
                OneViewSessionStorage.Save("ViewRecordsForm", true);
			    var TemplateNodeId = OneViewSessionStorage.Get("TemplateId");				
				if (TemplateNodeId == '153') {            
					$location.url('/153');
				}
				else {
						OneViewSessionStorage.Remove("NCInlineEdit");
						//_oViewRecordsBO.Navigate('app.'+TemplateNodeId);
						// $location.path('/app-' + TemplateNodeId);
						$location.url('/' + TemplateNodeId);
						_oViewRecordsBO.Init();     
				}				
			}
			else {                      
				_oViewRecordsBO.ShowMsg(xlatService, toaster, "Select_Record");
			}

			OneViewConsole.Debug("EditRecords end", "ViewRecordsFacade.EditRecords");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.EditRecords", xlatService);
        }		                 
    }
  
    this.SetTemperature = function (TemperatureInfo) {
        try {
            OneViewConsole.Debug("SetTemperature start", "ViewRecordsFacade.SetTemperature");
           
           // alert('SetTemperature');
            if (TemperatureInfo != null && TemperatureInfo != undefined && TemperatureInfo != "" && TemperatureInfo.Temperature != "" && TemperatureInfo.Temperature != null && TemperatureInfo.Temperature != undefined) {

                if (RowIndex != -1) {

                    //var _oDataCaptureBO = new DataCaptureBO();
                    //_oDataCaptureBO.SetMandatoryMetaData();

                    //var SaveDCValidatorConfigList = [{ 'IsDefaultClientValidator': false, 'IsCustomClientValidator': true, 'ClassName': 'MandatoryValidator' }];
                    //var AryDcResultDetails = _oDataCaptureBO.GetLastUpdatedDcResultDetailsForViewRecordsInlineEdit(OneViewSessionStorage.Get("DcId"));

                    //var isCompleted = false;
                    //var TemplateId = OneViewSessionStorage.Get("TemplateId");
                    //TODO:Its just temp solution(need to handle via frame wok)
                    //if (TemplateId == 2 || TemplateId == 3) {
                    //    isCompleted = _oDataCaptureBO.CookingAndBlastChillingEKFC1Validation(AryDcResultDetails);
                    //}
                    //else {
                    //    var parm = { DataCaptureEntity: AryDcResultDetails, scope: scope, toaster: '', xlatService: oxlatService, ClientValidatorConfigList: SaveDCValidatorConfigList, Operation: 'Submit' }
                    //    var _oVallidationHandler = new VallidationHandler();
                    //    var oDefaultValidationResponse = _oVallidationHandler.Validate(parm);
                    //    isCompleted = oDefaultValidationResponse.IsSuccess;
                    //}

                    //if (isCompleted) {

                        MyInstance.AutoTemperature = parseFloat(TemperatureInfo.Temperature);

                        var Title = OneViewGlobalization[CurrentLanguage].AutoTemperature_Confirm_Title
                        var Message = OneViewGlobalization[CurrentLanguage].AutoTemperature_Confirm_Message + " : " + MyInstance.AutoTemperature + "\u2103";

                        var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                        oOneViewCordovaPlugin.DefaultConfirmBox(Title, Message, InlineEdit);
                   // }
                }
                else {
                    _oViewRecordsBO.ShowMsg(xlatService, toaster, "Select_Record");
                    $scope.$apply();
                }
            }
            else {
                alert("Please press the probe button again");
            }

            OneViewConsole.Debug("SetTemperature end", "ViewRecordsFacade.SetTemperature");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.SetTemperature", xlatService);
        }
        finally {
            Title = null;
            Message = null;
            oOneViewCordovaPlugin = null;
        }
    }

    this.InlineNCFormEventHandler;

    var InlineEditOLD = function (ConfirmationId) {

        try {
            OneViewConsole.Debug("InlineEdit start", "ViewRecordsFacade.InlineEdit");

            if (DefaultInlineEditConfig != null) {
                var TemplateId = OneViewSessionStorage.Get("TemplateId");
                var TemplateName = OneViewSessionStorage.Get("TemplateName");
                var ServiceId = OneViewSessionStorage.Get("ServiceId");
                var TemplateNodes = TemplateMetaData[ServiceId][TemplateId];
                var _oDataCaptureBO = new DataCaptureBO({ 'scope': $scope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': toaster, 'TemplateId': TemplateId, 'TemplateName': TemplateName });
                _oDataCaptureBO.SetMandatoryMetaData();
               
                if (ConfirmationId == '2' && MyInstance.AutoTemperature != "" && MyInstance.AutoTemperature != 'NaN') {

                    document.getElementById(DefaultInlineEditConfig.FieldName + OneViewSessionStorage.Get('DcId')).innerHTML = MyInstance.AutoTemperature;

                    var AttributesList = [{ "AttributeNodeId": DefaultInlineEditConfig.AttributeNodeId, "ControlId": DefaultInlineEditConfig.ControlId, "AnswerValue": "", "Answer": MyInstance.AutoTemperature, "AnswerFKType": "" }];
                   
                        new DataCaptureBO().UpdateDCRecords(OneViewSessionStorage.Get('DcId'), AttributesList);

                        if (InlineEditFinishedEventHandler != null) {
                            InlineEditFinishedEventHandler();
                        }

                        if (TemplateId == "2" || TemplateId == "3") {
                            if (MyInstance.AutoTemperature > '5') {
                                OneViewSessionStorage.Save("NCInlineEdit", 'true');

                                var Title = OneViewGlobalization[CurrentLanguage].NCForm_Confirm_Title;
                                var Message = OneViewGlobalization[CurrentLanguage].NCForm_Confirm_Message;

                                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                                oOneViewCordovaPlugin.DefaultConfirmBox(Title, Message, function (ConfirmationId) {

                                    if (ConfirmationId == '2') {
                                        // state.go('app.' + OneViewSessionStorage.Get("TemplateId"));
                                        // Mylocation.path('/cookingblastchilling');
                                        // Mylocation.path('/app-' + OneViewSessionStorage.Get("TemplateId"));
                                        Mylocation.url('/' + OneViewSessionStorage.Get("TemplateId"));
                                        scope.$apply();
                                    }
                                    else {
                                        var NextRow = document.getElementById(RowIndex + 1);

                                        if (NextRow != null) {

                                            _oViewRecordsBO.RemoveRowColor(RowIndex);
                                            _oViewRecordsBO.SetRowColor(RowIndex + 1);

                                            var DataCaptureId = NextRow.attributes['DataCaptureId'].value;
                                            _oViewRecordsBO.SaveDcIdIntoSession(DataCaptureId);

                                            RowIndex = RowIndex + 1;
                                        }
                                    }
                                });
                            }
                            else {
                                var NCDcId = new DataCaptureBO().GetNCDcID(DCId);
                                if (NCDcId != undefined) {
                                    new DataCaptureBO().DeleteNCReleatedData(NCDcId);
                                }
                                scope.divNCButton = false;
                                scope.$apply();
                                OneViewSessionStorage.Save("NCInlineEdit", 'false');

                                var NextRow = document.getElementById(RowIndex + 1);

                                if (NextRow != null) {

                                    _oViewRecordsBO.RemoveRowColor(RowIndex);
                                    _oViewRecordsBO.SetRowColor(RowIndex + 1);

                                    var DataCaptureId = NextRow.attributes['DataCaptureId'].value;
                                    _oViewRecordsBO.SaveDcIdIntoSession(DataCaptureId);

                                    RowIndex = RowIndex + 1;
                                }

                            }
                        }
                        else {
                            var NextRow = document.getElementById(RowIndex + 1);

                            if (NextRow != null) {

                                _oViewRecordsBO.RemoveRowColor(RowIndex);
                                _oViewRecordsBO.SetRowColor(RowIndex + 1);

                                var DataCaptureId = NextRow.attributes['DataCaptureId'].value;
                                _oViewRecordsBO.SaveDcIdIntoSession(DataCaptureId);

                                RowIndex = RowIndex + 1;
                            }
                        }

                        _oViewRecordsBO.GetDataSource($scope);
                }
            }

            OneViewConsole.Debug("InlineEdit end", "ViewRecordsFacade.InlineEdit");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.InlineEdit", xlatService);
        }
        finally {
            Title = null;
            Message = null;
            _oOneViewSqlitePlugin = null;
        }
    }

    var InlineEdit = function (ConfirmationId) {

        try {
            OneViewConsole.Debug("InlineEdit start", "ViewRecordsFacade.InlineEdit");

           // alert('InlineEdit');
            if (DefaultInlineEditConfig != null) {
                var TemplateId = OneViewSessionStorage.Get("TemplateId");
                var TemplateName = OneViewSessionStorage.Get("TemplateName");
                var ServiceId = OneViewSessionStorage.Get("ServiceId");
                var TemplateNodes = TemplateMetaData[ServiceId][TemplateId];
                var oScope = $scope;

              
               // alert('TemplateNodes.Childs' + TemplateNodes.Childs);
                //if (TemplateId == '2' || TemplateId == '3' || TemplateId == '44' || TemplateId == '99' || TemplateId == '128' || TemplateId == '140' || TemplateId == '282' || TemplateId == '325' || TemplateId == '342') {
                if (TemplateNodes.Childs != undefined) {
                    var _oCustomPageTemplateNodeFormatterComponent = new CustomPageTemplateNodeFormatterComponent();
                    TemplateNodes = _oCustomPageTemplateNodeFormatterComponent.FormatTemplateNode(TemplateNodes);
                }
                //}



               // alert(ServiceId +","+ TemplateId);
              //  alert('TemplateNodes :' + JSON.stringify(TemplateNodes));
                //Call NC-Action component to load metadata for particular template
              ///  AppendValuesToScope(TemplateNodes, oScope);
                var _oCPActionNCComponent = new CPActionNCComponent(oScope, TemplateNodes, '', xlatService);
                _oCPActionNCComponent.Init();

                var _oDataCaptureBO = new DataCaptureBO({ 'scope': oScope, 'TemplateNodes': TemplateNodes, 'xlatService': xlatService, 'toaster': toaster, 'TemplateId': TemplateId, 'TemplateName': TemplateName });
                _oDataCaptureBO.SetMandatoryMetaData();

               
                if (ConfirmationId == '2' && MyInstance.AutoTemperature != "" && MyInstance.AutoTemperature != 'NaN') {

                    document.getElementById(DefaultInlineEditConfig.FieldName + OneViewSessionStorage.Get('DcId')).innerHTML = MyInstance.AutoTemperature;

                    var AttributesList = [{ "AttributeNodeId": DefaultInlineEditConfig.AttributeNodeId, "ControlId": DefaultInlineEditConfig.ControlId, "AnswerValue": "", "Answer": MyInstance.AutoTemperature, "AnswerFKType": "" }];

                    var _oVRDataCaptureBO = new DataCaptureBO();
                    //_oVRDataCaptureBO.UpdateDCRecords(OneViewSessionStorage.Get('DcId'), AttributesList);

                    AppendValuesToScope(TemplateNodes, oScope, AttributesList[0].AttributeNodeId, AttributesList[0].Answer);

                    if (InlineEditFinishedEventHandler != null) {                        
                        var InlineAttributesList = InlineEditFinishedEventHandler(_oDataCaptureBO);
                        if (InlineAttributesList != undefined && InlineAttributesList != null) {
                           
                            //alert(JSON.stringify(InlineAttributesList));
                            AppendValuesToScope(TemplateNodes, oScope, AttributesList[0].AttributeNodeId, AttributesList[0].Answer, InlineAttributesList[0].AttributeNodeId, InlineAttributesList[0].Answer);                          
                            _oDataCaptureBO.EvaluateActionNCStatus(InlineAttributesList[0].AttributeNodeId, '', true);
                        }
                    }
                    else {                       
                        AppendValuesToScope(TemplateNodes, oScope, AttributesList[0].AttributeNodeId, AttributesList[0].Answer);
                     
                    }
                   
                    var ActionResponseList = _oDataCaptureBO.EvaluateActionNCStatus(AttributesList[0].AttributeNodeId, '', true);

                    _oDataCaptureBO.UpdateDCRecords(OneViewSessionStorage.Get('DcId'), AttributesList);

                    if (AttributesList != undefined) {

                        for (var n = 0; n < AttributesList.length; n++) {
                            // alert('AttributesList[n].AttributeNodeId' + AttributesList[n].AttributeNodeId)
                           
                            //var ActionResponseList = _oDataCaptureBO.EvaluateActionNCStatus(AttributesList[n].AttributeNodeId, '', true);


                            if (ActionResponseList != undefined) {
                                if (ActionResponseList.length > 1) {
                                    navigator.notification.alert(('More than one action for a single attribute : Not implemeneted'), ['OK'], "");
                                }
                                else {
                                    if (ActionResponseList.length > 0) {
                                        for (var i = 0; i < ActionResponseList.length; i++) {
                                            if (ActionResponseList[i].FormActionList != undefined) {
                                               // alert('ActionResponseList[i].FormActionList' + JSON.stringify(ActionResponseList[i].FormActionList))
                                                for (var j = 0; j < ActionResponseList[i].FormActionList.length ; j++) {
                                                   // alert('ActionResponseList[i].FormActionList[j]' + ActionResponseList[i].FormActionList[j])
                                                    //if ((ActionResponseList[i].FormActionList[j] == 2 || ActionResponseList[i].FormActionList[j] == '2') || (ActionResponseList[i].FormActionList[j] == 3 || ActionResponseList[i].FormActionList[j] == '3')) {
                                                        if ((ActionResponseList[i].IsFormAction == true || ActionResponseList[i].IsFormAction == 'true') && (ActionResponseList[i].IsRuleViolated == true || ActionResponseList[i].IsRuleViolated == 'true')) {
                                                            OneViewSessionStorage.Save("NCInlineEdit", 'true');
                                                            var tempHandler = {
                                                                'NCRuleId': ActionResponseList[i].RuleId,
                                                                'IsNC': ActionResponseList[i].IsRuleViolated,
                                                                "IsObservation": false,
                                                                "Comments": "",
                                                                "IsManualRule": false,
                                                                "RuleName": ActionResponseList[i].RuleName,
                                                                "RuleDescription": ActionResponseList[i].RuleDescription,
                                                                "AttributeGroupId": AttributesList[n].AttributeNodeId,
                                                                "RuleGroup": ActionResponseList[i].RuleGroup,
                                                                "RuleCode": ActionResponseList[i].RuleCode,
                                                                'Deviatedby': ActionResponseList[i].Deviatedby,
                                                                'ExpectedValue': ActionResponseList[i].ExpectedValue,
                                                                'ActualValue': ActionResponseList[i].ActualValue,
                                                                'TemplateNodeIds': ActionResponseList[i].TemplateNodeIds
                                                            };

                                                           // alert(JSON.stringify(tempHandler));
                                                            ViewRecordsNCRuleHandler.push(tempHandler);

                                                            var Title = OneViewGlobalization[CurrentLanguage].NCForm_Confirm_Title;
                                                            var Message = OneViewGlobalization[CurrentLanguage].NCForm_Confirm_Message;
                                                            //var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                                                            //oOneViewCordovaPlugin.DefaultConfirmBox(Title, Message, function (ConfirmationId) {

                                                               
                                                                //if (ConfirmationId == '2') {
                                                                   // alert('here');
                                                                   // alert(OneViewSessionStorage.Get("TemplateId"));
                                                                    // state.go('app.' + OneViewSessionStorage.Get("TemplateId"));
                                                                    // Mylocation.path('/cookingblastchilling');
                                                                    // Mylocation.path('/app-' + OneViewSessionStorage.Get("TemplateId"));

                                                                  //  ViewRecordsNCRuleId = ActionResponseList[i].RuleId;
                                                                    
                                                                    
                                                                  
                                                                
                                                                    

                                                               

                                                                    Mylocation.url('/' + OneViewSessionStorage.Get("TemplateId"));
                                                                    scope.$apply();
                                                                   // alert('33');
                                                               // }
                                                               // else {
                                                                    //var NextRow = document.getElementById(RowIndex + 1);

                                                                    //if (NextRow != null) {

                                                                    //    _oViewRecordsBO.RemoveRowColor(RowIndex);
                                                                    //    _oViewRecordsBO.SetRowColor(RowIndex + 1);

                                                                    //    var DataCaptureId = NextRow.attributes['DataCaptureId'].value;
                                                                    //    _oViewRecordsBO.SaveDcIdIntoSession(DataCaptureId);

                                                                    //    RowIndex = RowIndex + 1;
                                                                    //}
                                                                //}
                                                            //});
                                                        }

                                                       
                                                        else {
                                                            //alert('ActionResponseList :' + JSON.stringify(ActionResponseList));
                                                            var DataCaptureId = OneViewSessionStorage.Get('DcId');
                                                            var NCDcId = new DataCaptureBO().GetNCDcID(DataCaptureId);
                                                            if (NCDcId != undefined) {
                                                                _oDataCaptureBO.DeleteNCDataByActionClientGuid(NCDcId, undefined, ActionResponseList[i].RuleId, undefined, ActionResponseList[i].RuleGroup);
                                                                _oDataCaptureBO.UpdateDataCaptureNCStatusForInlineEdit(DataCaptureId);
                                                            }
                                                            scope.divNCButton = false;
                                                            scope.$apply();
                                                            OneViewSessionStorage.Save("NCInlineEdit", 'false');

                                                            var NextRow = document.getElementById(RowIndex + 1);

                                                            if (NextRow != null) {

                                                                _oViewRecordsBO.RemoveRowColor(RowIndex);
                                                                _oViewRecordsBO.SetRowColor(RowIndex + 1);

                                                                var DataCaptureId = NextRow.attributes['DataCaptureId'].value;
                                                                _oViewRecordsBO.SaveDcIdIntoSession(DataCaptureId);

                                                                RowIndex = RowIndex + 1;
                                                            }

                                                        }
                                                    //}
                                                }
                                            }

                                        }
                                    }
                                    else {
                                       // alert('here UpdateDCRecords');
                                        //_oDataCaptureBO.UpdateDCRecords(OneViewSessionStorage.Get('DcId'), AttributesList);

                                        var NextRow = document.getElementById(RowIndex + 1);

                                        if (NextRow != null) {

                                            _oViewRecordsBO.RemoveRowColor(RowIndex);
                                            _oViewRecordsBO.SetRowColor(RowIndex + 1);

                                            var DataCaptureId = NextRow.attributes['DataCaptureId'].value;
                                            _oViewRecordsBO.SaveDcIdIntoSession(DataCaptureId);

                                            RowIndex = RowIndex + 1;
                                        }
                                    }

                                }
                            }
                        }
                    }
                    _oViewRecordsBO.GetDataSource($scope);                   
                }
            }
          
            

            if (document.getElementById('divHide') != null)
                document.getElementById('divHide').innerHTML = "";

            scope.$apply();
            OneViewConsole.Debug("InlineEdit end", "ViewRecordsFacade.InlineEdit");
        }
        catch (Excep) {
         //   alert('ViewRecordsFacade.InlineEdit Excep ' + Excep);
         //   alert('ViewRecordsFacade.InlineEdit Excep ' + JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.InlineEdit", xlatService);
        }
        finally {
            Title = null;
            Message = null;
            _oOneViewSqlitePlugin = null;
        }
    }

    var AppendValuesToScope = function (oTemplateNodes, oScope, AttributeNodeId, NewAnswer, AttributeNodeId2, NewAnswer2) {
        try {
            OneViewConsole.Debug("AppendValuesToScope start", "ViewRecordsFacade.AppendValuesToScope");
            
            oScope.NewDCModel = [];
            var DCId = OneViewSessionStorage.Get('DcId');
            //alert('DCId' + DCId);
            var DCDetailFromDB = GetDCByDCId(DCId);
            for (NodeId in oTemplateNodes) {
                if (typeof (oTemplateNodes[NodeId]) != 'function') {

                    var TemplateNodeObject = oTemplateNodes[NodeId];
                    for (itrAnswerMode in TemplateNodeObject.AnswerMode) {

                        if (typeof (TemplateNodeObject.AnswerMode[itrAnswerMode]) != 'function') {
                           // var PreEditControlValues = {};
                            var AnswerModeObject = TemplateNodeObject.AnswerMode[itrAnswerMode];
                            var ControlId = AnswerModeObject.ControlId;
                            var AttributeAnswers = DCDetailFromDB.AttributeAnswers[NodeId];
                            if (AttributeAnswers != undefined) {
                                if (AttributeAnswers[ControlId] != undefined) {
                                    var AnswerList = AttributeAnswers[ControlId];
                                    //TODO:This logic may change,need remove coupling between this logic (for ex:Clinet need his own data to view),now couple with LastUpdated Answer

                                   // alert('AnswerList : ' + JSON.stringify(AnswerList))
                                    var AnswerToBind = GetLastUpdatedAnswer(AnswerList);

                                   
                                    if (AttributeNodeId == NodeId) {
                                        AnswerToBind.Answer = NewAnswer;
                                    }
                                    if (AttributeNodeId2 == NodeId) {
                                        AnswerToBind.Answer = NewAnswer2;
                                    }

                                   // alert('AttributeNodeId : ' + AttributeNodeId + "," + NodeId + JSON.stringify(AnswerToBind));
                                    //alert('oScope[ControlId] before' + oScope.NewDCModel[ControlId]);
                                   // alert('AnswerToBind :' + JSON.stringify(AnswerToBind));
                                   // alert('AnswerModeObject :' + JSON.stringify(AnswerModeObject));
                                

                                    
                                    SetEditValuesInControls(oScope, AnswerModeObject, AnswerToBind, NodeId, oTemplateNodes)
                                    //alert('oScope[ControlId] after' + oScope.NewDCModel[ControlId]);
                                    //MyInstance.SetEditValuesInControls(scope, AnswerModeObject, AnswerToBind);
                                    //PreEditControlValues[ControlId] = { Answer: AnswerToBind.Answer }
                                }
                                //else {
                                //    oScope[ControlId] = { Answer: '' };
                                //   // PreEditControlValues[ControlId] = { Answer: '' }
                                //}
                            }
                            //MyInstance.PreEditValues[NodeId] = PreEditControlValues;
                        }
                    }
                }
            }

            OneViewConsole.Debug("AppendValuesToScope end", "ViewRecordsFacade.AppendValuesToScope");
        }
        catch (Excep) {
            //alert('AppendValuesToScope' + Excep + JSON.stringify(Excep))
            oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.AppendValuesToScope", xlatService);
        }
    }


    var SetEditValuesInControls = function (oScope, AnswerModeObject, AnswerToBind, AttributeNodeId, oTemplateNodes) {
        try {
            OneViewConsole.Debug("SetEditValuesInControls start", "ViewRecordsFacade.SetEditValuesInControls");
            OneViewConsole.DataLog("AnswerModeObject : " + JSON.stringify(AnswerModeObject), "ViewRecordsFacade.SetEditValuesInControls");
            OneViewConsole.DataLog("AnswerToBind : " + JSON.stringify(AnswerToBind), "ViewRecordsFacade.SetEditValuesInControls");


            if (AnswerModeObject.Type == 'DDL') {
                //alert('AnswerModeObject : ' + JSON.stringify(AnswerModeObject) + AttributeNodeId);
                var oddl = new AutoCompleteUserControl({ 'Scope': oScope, 'ControlId': AnswerModeObject.ControlId, 'DataSourceModelName': AnswerModeObject.ControlId, 'DisplayElementModelName': 'NewDCModel.' + AnswerModeObject.ControlId, 'DATEntityTypeId': 0, 'xlatService': xlatService, 'ToasterService': '', 'AttributeNodeId': AttributeNodeId });
                oddl.Set({ Id: AnswerToBind.Answer, Name: AnswerToBind.AnswerValue, "IsDynamicElement": false });
            }
            //else if (AnswerModeObject.DataType == "BOOLEAN") {
            //    if (AnswerToBind.Answer == "1") {
            //        oScope.NewDCModel[AnswerModeObject.ControlId] = true;
            //    }
            //    else {
            //        oScope.NewDCModel[AnswerModeObject.ControlId] = false;
            //    }
            //}
            else if (AnswerModeObject.Type == 'Band') {
                if (AnswerToBind.Answer != "") {
                    oScope[AnswerModeObject.ControlId] = [];
                    var oBand = new AnswerModeUserControl({ 'Scope': oScope, 'ControlId': AnswerModeObject.ControlId, 'DataSourceModelName': AnswerModeObject.ControlId, 'DisplayElementModelName': 'NewDCModel.' + AnswerModeObject.ControlId });
                   // oBand.AnswerModes(oTemplateNodes, AttributeNodeId);
                    var Colour = AnswerModeObject.BandInfo[AnswerToBind.Answer];
                    if (AnswerModeObject.IsStaticDataSource == undefined || AnswerModeObject.IsStaticDataSource == false) {
                        oBand.Set({ Id: AnswerToBind.Answer, Name: AnswerToBind.AnswerValue, ColourIndex: Colour.ColourIndex, selected: true });
                    }
                    else if (AnswerModeObject.IsStaticDataSource == true) {
                        //alert(AnswerToBind.Answer + " : " + AnswerModeObject.BandInfo[AnswerToBind.Answer]);
                        oBand.Set({ Id: AnswerToBind.Answer, Name: AnswerToBind.Answer, ColourIndex: Colour.ColourIndex, selected: true });
                    }
                }
            }
            else if (AnswerModeObject.Type == 'AUTOTEMPERATURE' && AnswerModeObject.DataType == "FLOAT") {
                if (AnswerToBind.Answer == "") {
                    oScope.NewDCModel[AnswerModeObject.ControlId] = AnswerToBind.Answer;
                }
                else {
                    oScope.NewDCModel[AnswerModeObject.ControlId] = parseFloat(AnswerToBind.Answer);
                }

            }
            //else if (AnswerModeObject.Type == "DATE" && AnswerToBind.Answer != '') {
            //    var date = AnswerToBind.Answer.split('-');
            //    oScope.NewDCModel[AnswerModeObject.ControlId] = new Date(date[2], date[1], date[0]);
            //}
            else if (AnswerModeObject.Type == "TIME") {
                var DateTimeValue = AnswerToBind.Answer.split(' ');
                //oScope.NewDCModel[AnswerModeObject.ControlId] = new Date(0, 0, 0, Time[0], Time[1]);
                if (AnswerToBind.Answer != "") {
                    var x = document.createElement("INPUT");
                    x.setAttribute("id", AnswerModeObject.ControlId);
                    x.setAttribute("type", "time");
                    x.setAttribute("value", DateTimeValue[1]);

                    oScope[AnswerModeObject.ControlId + "_DateTime"] = AnswerToBind.Answer;
                    x.value = AnswerToBind.Answer.split(" ")[1]; //take time 
                    oScope.NewDCModel[AnswerModeObject.ControlId] = x.value;
                    //document.body.appendChild(x);

                    document.getElementById('divHide').appendChild(x);
                }
            }
            //else if (AnswerModeObject.Type == "DATETIMELOCAL") {
            //   // var DateTime = AnswerToBind.Answer.split(' ');
            //    //oScope.NewDCModel[AnswerModeObject.ControlId] = new Date(0, 0, 0, Time[0], Time[1]);
            //    //if (AnswerToBind.Answer != "") {
                 
            //        oScope.NewDCModel[AnswerModeObject.ControlId] = AnswerToBind.Answer;
            //        // oScope[AnswerModeObject.ControlId + "_DateTime"] = AnswerToBind.Answer;

                    
            //   // }
                //}
            else if (AnswerModeObject.Type == "DATETIMELOCAL") {
                // var DateTime = AnswerToBind.Answer.split(' ');
                //oScope.NewDCModel[AnswerModeObject.ControlId] = new Date(0, 0, 0, Time[0], Time[1]);
                //if (AnswerToBind.Answer != "") {
                var temp = "";

                //oScope.NewDCModel[AnswerModeObject.ControlId] = temp;
                if (AnswerToBind.Answer != undefined && AnswerToBind.Answer != "") { 
                    temp = new DateTime().GetDateByString(AnswerToBind.Answer);                  
                }
                oScope.NewDCModel[AnswerModeObject.ControlId] = temp;


                // }
            }
            else {
                if (AnswerModeObject.Type == 'AUTOTEMPERATURE' && AnswerModeObject.DataType == "INTEGER" ) {

                    if (AnswerToBind.Answer != "")
                        oScope.NewDCModel[AnswerModeObject.ControlId] = parseInt(AnswerToBind.Answer);

                    else
                        oScope.NewDCModel[AnswerModeObject.ControlId] = AnswerToBind.Answer;

                }

                //else {
                //    //alert('ssss' + "," + AnswerToBind.Answer + "," + AnswerModeObject.ControlId);
                //    oScope.NewDCModel[AnswerModeObject.ControlId] = AnswerToBind.Answer;
                //}
            }

           
            OneViewConsole.Debug("SetEditValuesInControls end", "ViewRecordsFacade.SetEditValuesInControls");

        }
        catch (Excep) {
            //alert('SetEditValuesInControls' + Excep + JSON.stringify(Excep))
            throw oOneViewExceptionHandler.Create("BO", "ViewRecordsFacade.SetEditValuesInControls", Excep);
        }
        finally {
            Colour = null;
        }
    }


    var GetDCByDCId = function (DCId) {
        try {
            OneViewConsole.Debug("GetDCByDCId start", "ViewRecordsFacade.GetDCByDCId");
            OneViewConsole.DataLog("DCId : " + DCId, "ViewRecordsFacade.GetDCByDCId");

            var oDataCaptureDAO = new DcDAO();
            var result = oDataCaptureDAO.GetDCResultDetailsByDCId_DAO(DCId);

            if (result.length != 0) {
                var DataCaptureId = result[0].DataCaptureId;
                var DCAnswerInfo = { 'DataCaptureId': DataCaptureId, 'AttributeAnswers': {} };
                var i = 0;
                var totalLength = result.length;
                var AttributeNodeId = result[i].AttributeNodeId;
                var FormatedAttributeAnswerDetails = [];

                //Iterate the wrt Node
                while (true) {
                    if (result[i] != undefined && AttributeNodeId == result[i].AttributeNodeId) {

                        var FormatedControlAnswerDetails = [];
                        //{2(ControlId): [ { 'SystemUserId': 1, 'Answer': '1', 'AnswerValue': 'Chicken', 'LastUpdatedDate': '10/5/2012' },{ 'SystemUserId': 2, 'Answer': '2', 'AnswerValue': 'Chicken65', 'LastUpdatedDate': '11/5/2012' } ] }
                        var ControlId = result[i].ControlId;
                        while (true) {
                            if (result[i] != undefined && AttributeNodeId == result[i].AttributeNodeId && ControlId == result[i].ControlId) {
                                var anwerArray = result[i];
                                var AnwerDetails = { 'SystemUserId': anwerArray.SystemUserId, 'Answer': anwerArray.Answer, 'AnswerValue': anwerArray.AnswerValue, 'LastUpdatedDate': anwerArray.LastUpdatedDate, 'AttributeNodeId': AttributeNodeId, 'ControlId': ControlId }
                                FormatedControlAnswerDetails.push(AnwerDetails);
                                i = i + 1;
                            }
                            else {
                                FormatedAttributeAnswerDetails[ControlId] = FormatedControlAnswerDetails;
                                break;
                            }
                        }
                    }
                    else {
                        DCAnswerInfo.AttributeAnswers[AttributeNodeId] = FormatedAttributeAnswerDetails;
                        FormatedAttributeAnswerDetails = [];
                        if (i < totalLength)
                            AttributeNodeId = result[i].AttributeNodeId;
                        else {
                            break;
                        }
                    }
                }
            }
            OneViewConsole.Debug("GetDCByDCId end", "ViewRecordsFacade.GetDCByDCId");
            return DCAnswerInfo;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ViewRecordsFacade.GetDCByDCId", Excep);
        }
        finally {
            result = null;
            DataCaptureId = null;
            DCAnswerInfo = null;
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

    var GetLastUpdatedAnswer = function (AnswerLst) {
        try {
            OneViewConsole.Debug("GetLastUpdatedAnswer start", "ViewRecordsFacade.GetLastUpdatedAnswer");
            OneViewConsole.DataLog("AnswerList : " + JSON.stringify(AnswerLst), "ViewRecordsFacade.GetLastUpdatedAnswer");

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
            OneViewConsole.Debug("GetLastUpdatedAnswer end", "ViewRecordsFacade.GetLastUpdatedAnswer");
            return AnswerObj;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ViewRecordsFacade.GetLastUpdatedShift", Excep);
        }
        finally {
            AnswerObj = null;
            LastUpdatedDate = null;
        }
    }

    var EvaluateActionNCStatus = function (AttributeId) {
        try {
            OneViewConsole.Debug("EvaluateActionNCStatus Start", "ViewRecordsFacade.EvaluateActionNCStatus");
            var ActionResponseList = _oDataCaptureBO.EvaluateActionNCStatus(AttributeId);
            return ActionResponseList;
            OneViewConsole.Debug("EvaluateActionNCStatus End", "ViewRecordsFacade.EvaluateActionNCStatus");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.InlineEdit", xlatService);
        }
        finally {
        }
    }


    this.ResponsiveFieldChanged = function (ResponsiveColumn) {
        try {
            OneViewConsole.Debug("ResponsiveFieldChanged start", "ViewRecordsFacade.ResponsiveFieldChanged");

            $scope.GridInstance.ResponsiveFieldChanged($scope, ResponsiveColumn);

            OneViewConsole.Debug("ResponsiveFieldChanged end", "ViewRecordsFacade.ResponsiveFieldChanged");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.ResponsiveFieldChanged", xlatService);
		}     
    }

    this.ApplyFilter = function (snapRemote) {
        try {
            OneViewConsole.Debug("ApplyFilter start", "ViewRecordsFacade.ApplyFilter");

            DcInfoViewRecords = null;

            PageNumber = 1;
            $scope.CurrentPage = PageNumber;

            _oViewRecordsBO.GetDataSourceWithFilters($scope, FilterRuleConfig);
            _oViewRecordsBO.LoadSearchGrid($scope, GridDataSource);

            ResetGridStatus($scope);

            var _oOneViewSidePanel = new OneViewSidePanel();
            _oOneViewSidePanel.Toggle(snapRemote);

			OneViewConsole.Debug("ApplyFilter end", "ViewRecordsFacade.ApplyFilter");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.ApplyFilter", xlatService);
		}      
    }

    this.GoBack = function () {
        try {
            OneViewConsole.Debug("GoBack start", "ViewRecordsFacade.GoBack");

			var TemplateNodeId = OneViewSessionStorage.Get("TemplateId");
			_oViewRecordsBO.RemoveDcIdFromSession();
			
			if (OneViewSessionStorage.Get("MyAuditEditForm") == 'true') {
				 
			    //_oViewRecordsBO.Navigate('app.my-audit');
			    Mylocation.url('/nav/my-audit');
			}
			else if (OneViewSessionStorage.Get("LandingPageEditForm") == 'true') {

			    //_oViewRecordsBO.Navigate('app.my-audit');
			    //Mylocation.url('/nav/landingPage');

			    var LandingPageViewInfo = OneViewSessionStorage.Get("LandingPageViewInfo");			    

			    if (LandingPageViewInfo != null) {

			        LandingPageViewInfo = JSON.parse(LandingPageViewInfo);			        
			        Mylocation.url(LandingPageViewInfo.BackRouteKey);
			    }
			}
			else
			{
			    //_oViewRecordsBO.Navigate('app.'+TemplateNodeId);
			    Mylocation.url('/' + TemplateNodeId);
			}
			
			_oViewRecordsBO.Init();

			OneViewConsole.Debug("GoBack end", "ViewRecordsFacade.GoBack");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.GoBack", xlatService);
		}                  
    }

    this.Previous = function () {
        try {
            OneViewConsole.Debug("Previous start", "ViewRecordsFacade.Previous");

            if (PageNumber > 1) {
                PageNumber = PageNumber - 1;
                $scope.CurrentPage = PageNumber;

                _oViewRecordsBO.GetDataSource($scope);
                _oViewRecordsBO.LoadSearchGrid($scope, GridDataSource);
                //document.getElementById('Next').disabled = "";
                $scope.GridInstance.Show('Next');

                if (PageNumber == 1) {
                    //document.getElementById('Previous').disabled = "disabled";
                    $scope.GridInstance.Hide('Previous');
                }
            }

            OneViewConsole.Debug("Previous end", "ViewRecordsFacade.Previous");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.Previous", xlatService);
        }
    }

    this.Next = function () {
        try {
            OneViewConsole.Debug("Next start", "ViewRecordsFacade.Next");

            if (PageCount != PageNumber) {          
                PageNumber += 1;
                $scope.CurrentPage = PageNumber;

                _oViewRecordsBO.GetDataSource($scope);
                _oViewRecordsBO.LoadSearchGrid($scope, GridDataSource);
                //document.getElementById('Previous').disabled = "";
                $scope.GridInstance.Show('Previous');

                if (PageCount == PageNumber) {
                    //document.getElementById('Next').disabled = "disabled";
                    $scope.GridInstance.Hide('Next');
                }
            }

            OneViewConsole.Debug("Next end", "ViewRecordsFacade.Next");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.Next", xlatService);
        }
    }

    ///Gets the probe connected or diconnected Status
    this.GetProbeStatus = function () {
        try {
            OneViewConsole.Debug("GetProbeStatus Start", "CookingAndBlastChillingMonitoringFacade.GetProbeStatus");

            _oSettingsBO.ProbeStatus(toaster, xlatService);
           
            OneViewConsole.Debug("GetProbeStatus End", "CookingAndBlastChillingMonitoringFacade.GetProbeStatus");

        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "CookingAndBlastChillingMonitoringFacade.GetProbeStatus", xlatService);
        }
    }

    this.ProbeTesting = function () {
        try {
            var TempFromProbe = $scope.NewDCModel.txtTestTempControlId;
            //alert('TempFromProbe :' + TempFromProbe);
            var TemperatureInfo = { 'Temperature': TempFromProbe };

            //DefaultInlineEditConfig.ControlId
            //alert('DefaultInlineEditConfig.ControlId :' + DefaultInlineEditConfig.ControlId);
           // var ControlId = DefaultInlineEditConfig.ControlId;
          //  $scope.NewDCModel[ControlId] = TempFromProbe;

           // alert(' $scope.NewDCModel[ControlId]  :' + $scope.NewDCModel[ControlId]);

            MyInstance.SetTemperature(TemperatureInfo);

        }
        catch (Excep) {
            // alert(JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.ProbeTesting", xlatService);
        }
    }

    this.LoadNewDc = function ($location) {
        try {
            OneViewConsole.Debug("LoadNewDc Start", "ViewRecordsFacade.LoadNewDc");

            $location.url('/newdc');

            OneViewConsole.Debug("LoadNewDc End", "ViewRecordsFacade.LoadNewDc");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "PreAcceptanceCompositionAnalysisFacade2.LoadNewDc", xlatService);
        }
    }

    this.FilterDataChanged = function (Header) {

        try {
            OneViewConsole.Debug("FilterDataChanged Start", "ViewRecordsFacade.FilterDataChanged");

            if (Header.CriteriaType == "OneViewDCResultDetailsPrimaryCriteria" || Header.CriteriaType == "OneViewGraphSearchCriteria") {
                for (var itr in $scope.FilterData) {
                    if ($scope.FilterData[itr].DisplayName != Header.DisplayName &&
                        ($scope.FilterData[itr].CriteriaType == "OneViewDCResultDetailsPrimaryCriteria" || $scope.FilterData[itr].CriteriaType == "OneViewGraphSearchCriteria") &&
                        ($scope.FilterData[itr].selected == true || $scope.FilterData[itr].selected == "selected")) {
                        $scope.FilterData[itr].selected = "";
                    }
                }
            }

            OneViewConsole.Debug("FilterDataChanged End", "ViewRecordsFacade.FilterDataChanged");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "PreAcceptanceCompositionAnalysisFacade2.FilterDataChanged", xlatService);
        }        
    }
}

function EkfcViewRecords() {

    var InlineEditSetDateTime = function () {
        try {
            var SetDateandTime = new DateTime().GetDateAndTime();
            //var Value = "";
            //if (SetDateandTime != undefined && SetDateandTime != "") {
            //    Value = new DateTime().GetDateByString(SetDateandTime);

            //    var dformat = [
            //                          Value.getDate(), Value.getMonth() + 1,
            //                          Value.getFullYear()].join('-') + ' ' +
            //                         [Value.getHours(),
            //                          Value.getMinutes(),
            //                          "00"].join(':');
            //    //alert("dformat : " + dformat);
            //    Value = dformat;

            //}
            return SetDateandTime;
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "ViewRecordsFacade.InlineEditSetDateTime", xlatService);
        }
    }

    this.InlineEditFinished = function (_oDataCaptureBO, DefaultInlineEditConfig) {
        
        try {
            OneViewConsole.Debug("InlineEditFinished start", "EkfcViewRecords.InlineEditFinished");

            var TemplateNodeId = OneViewSessionStorage.Get("TemplateId");
            var DcId = OneViewSessionStorage.Get('DcId');

            var oDateTime = new DateTime();
            var Value = oDateTime.GetDate() + " " + oDateTime.GetHoursAndMinutes();
            //alert(Value);

          //  var _oDataCaptureBO = new DataCaptureBO();

            if (TemplateNodeId == '2') {
                var ColumnId = "BCTimeOut" + DcId;
                //var Value = new DateTime().GetHoursAndMinutes();
                Value = InlineEditSetDateTime();
                UpdateColumn(ColumnId, Value);
                var AttributesList = [{ "AttributeNodeId": 21, "ControlId": "DTBlastChillerTimeOutControlId", "AnswerValue": "", "Answer": Value, "AnswerFKType": "" }];
                                 
                _oDataCaptureBO.UpdateDCRecords(OneViewSessionStorage.Get('DcId'), AttributesList);

                return AttributesList;
            }

            else if (TemplateNodeId == '3') {
                var ColumnId = "BCTimeOut" + DcId;
                //var Value = new DateTime().GetHoursAndMinutes();
                Value = InlineEditSetDateTime();
                UpdateColumn(ColumnId, Value);
                var AttributesList = [{ "AttributeNodeId": 41, "ControlId": "DTBlastChillerTimeOutControlId", "AnswerValue": "", "Answer": Value, "AnswerFKType": "" }];
               
                _oDataCaptureBO.UpdateDCRecords(OneViewSessionStorage.Get('DcId'), AttributesList);

                return AttributesList;
            }

            else if (TemplateNodeId == '325') {
                var ColumnId = "BCTimeOut" + DcId;
                //var Value = new DateTime().GetHoursAndMinutes();
                Value = InlineEditSetDateTime();
                UpdateColumn(ColumnId, Value);
                var AttributesList = [{ "AttributeNodeId": 339, "ControlId": "DTBlastChillerTimeOutControlId", "AnswerValue": "", "Answer": Value, "AnswerFKType": "" }];

                _oDataCaptureBO.UpdateDCRecords(OneViewSessionStorage.Get('DcId'), AttributesList);

                return AttributesList;
            }

            else if (TemplateNodeId == '342') {
                var ColumnId = "BCTimeOut" + DcId;
                //var Value = new DateTime().GetHoursAndMinutes();
                Value = InlineEditSetDateTime();
                UpdateColumn(ColumnId, Value);
                var AttributesList = [{ "AttributeNodeId": 356, "ControlId": "DTBlastChillerTimeOutControlId", "AnswerValue": "", "Answer": Value, "AnswerFKType": "" }];

                _oDataCaptureBO.UpdateDCRecords(OneViewSessionStorage.Get('DcId'), AttributesList);

                return AttributesList;
            }

            else if (TemplateNodeId == '77') {
                var ColumnId = "TimeChecked" + DcId;
                //var Value = new DateTime().GetHoursAndMinutes();
                UpdateColumn(ColumnId, Value);
                var AttributesList = [{ "AttributeNodeId": 85, "ControlId": "DTTimeCheckedControlId", "AnswerValue": "", "Answer": Value, "AnswerFKType": "" }];

                _oDataCaptureBO.UpdateDCRecords(OneViewSessionStorage.Get('DcId'), AttributesList);

                return AttributesList;
            }

            else if (TemplateNodeId == '99') {
                var ColumnId = "TimeofHiLoader" + DcId;
                //var Value = new DateTime().GetHoursAndMinutes();
                UpdateColumn(ColumnId, Value);
                var AttributesList = [{ "AttributeNodeId": 111, "ControlId": "DTMovingTimeControlId", "AnswerValue": "", "Answer": Value, "AnswerFKType": "" }];

                _oDataCaptureBO.UpdateDCRecords(OneViewSessionStorage.Get('DcId'), AttributesList);

                return AttributesList;
            }

            else if (TemplateNodeId == '88') {
                var ColumnId = "BlastChillerTimeOut" + DcId;
                //var Value = new DateTime().GetHoursAndMinutes();
                Value = InlineEditSetDateTime();
                UpdateColumn(ColumnId, Value);
                var AttributesList = [{ "AttributeNodeId": 96, "ControlId": "DTBlastChillerTimeOutControlId", "AnswerValue": "", "Answer": Value, "AnswerFKType": "" }];

                _oDataCaptureBO.UpdateDCRecords(OneViewSessionStorage.Get('DcId'), AttributesList);

                return AttributesList;
            }

            else if (TemplateNodeId == '282') {
                var ColumnId = "FinishingTimeOut" + DcId;
                //var Value = new DateTime().GetHoursAndMinutes();
                Value = InlineEditSetDateTime();
                UpdateColumn(ColumnId, Value);
                var AttributesList = [{ "AttributeNodeId": 290, "ControlId": "TMFinishingTimeOutControlId", "AnswerValue": "", "Answer": Value, "AnswerFKType": "" }];

                _oDataCaptureBO.UpdateDCRecords(OneViewSessionStorage.Get('DcId'), AttributesList);

                return AttributesList;
            }

            else if (TemplateNodeId == '140') {
                var ColumnId = "FinishingTimeOut" + DcId;
                //var Value = new DateTime().GetHoursAndMinutes();
                Value = InlineEditSetDateTime();
                UpdateColumn(ColumnId, Value);
                var AttributesList = [{ "AttributeNodeId": 148, "ControlId": "DTFinishingTimeOutControlId", "AnswerValue": "", "Answer": Value, "AnswerFKType": "" }];

                _oDataCaptureBO.UpdateDCRecords(OneViewSessionStorage.Get('DcId'), AttributesList);

                return AttributesList;
            }

            else if (TemplateNodeId == '116') {
                var ColumnId = "FinishingTimeOut" + DcId;
                //var Value = new DateTime().GetHoursAndMinutes();
                Value = InlineEditSetDateTime();
                UpdateColumn(ColumnId, Value);
                var AttributesList = [{ "AttributeNodeId": 124, "ControlId": "DTFinishingTimeOutControlId", "AnswerValue": "", "Answer": Value, "AnswerFKType": "" }];

                _oDataCaptureBO.UpdateDCRecords(OneViewSessionStorage.Get('DcId'), AttributesList);

                return AttributesList;
            }

            //else if (TemplateNodeId == '293') {
            //    var ColumnId = "AircraftLoadingTime" + DcId;
            //    //var Value = new DateTime().GetHoursAndMinutes();
            //    UpdateColumn(ColumnId, Value);
            //    var AttributesList = [{ "AttributeNodeId": 298, "ControlId": "TMAircraftLoadingTimeControlId", "AnswerValue": "", "Answer": Value, "AnswerFKType": "" }];

            //    _oDataCaptureBO.UpdateDCRecords(OneViewSessionStorage.Get('DcId'), AttributesList);
            //}

            else if (TemplateNodeId == '128') {
                var ColumnId = "FinishingTimeOut" + DcId;
                //var Value = new DateTime().GetHoursAndMinutes();
                Value = InlineEditSetDateTime();
                UpdateColumn(ColumnId, Value);
                var AttributesList = [{ "AttributeNodeId": 136, "ControlId": "DTFinishingTimeOutControlId", "AnswerValue": "", "Answer": Value, "AnswerFKType": "" }];

                _oDataCaptureBO.UpdateDCRecords(OneViewSessionStorage.Get('DcId'), AttributesList);

                return AttributesList;
            }

            else if (TemplateNodeId == '452') {
                var ColumnId = "LoadingTime" + DcId;
                //var Value = new DateTime().GetHoursAndMinutes();
                UpdateColumn(ColumnId, Value);
                var AttributesList = [{ "AttributeNodeId": 455, "ControlId": "DTLoadingTimeControlId", "AnswerValue": "", "Answer": Value, "AnswerFKType": "" }];

                _oDataCaptureBO.UpdateDCRecords(OneViewSessionStorage.Get('DcId'), AttributesList);

                return AttributesList;
            }

            else if (TemplateNodeId == '8272') {

                if (DefaultInlineEditConfig.ControlId == "ATDeliveryTempControlId") {
                    var ColumnId = "DeliveryTime" + DcId;
                    //var Value = new DateTime().GetHoursAndMinutes();
                    UpdateColumn(ColumnId, Value);
                    var AttributesList = [{ "AttributeNodeId": 8291, "ControlId": "DTDeliveryTimeControlId", "AnswerValue": "", "Answer": Value, "AnswerFKType": "" }];

                    _oDataCaptureBO.UpdateDCRecords(OneViewSessionStorage.Get('DcId'), AttributesList);

                    return AttributesList;
                }
                else if (DefaultInlineEditConfig.ControlId == "ATDispatchTempControlId") {
                    var ColumnId = "DispatchTime" + DcId;
                    //var Value = new DateTime().GetHoursAndMinutes();
                    UpdateColumn(ColumnId, Value);
                    var AttributesList = [{ "AttributeNodeId": 8294, "ControlId": "DTDispatchTimeControlId", "AnswerValue": "", "Answer": Value, "AnswerFKType": "" }];

                    _oDataCaptureBO.UpdateDCRecords(OneViewSessionStorage.Get('DcId'), AttributesList);

                    return AttributesList;
                }
                
            }

            else if (TemplateNodeId == '8314') {
                var ColumnId = "BCTimeOut" + DcId;
                //var Value = new DateTime().GetHoursAndMinutes();
                Value = InlineEditSetDateTime();
                UpdateColumn(ColumnId, Value);
                var AttributesList = [{ "AttributeNodeId": 8328, "ControlId": "DTBlastChillerTimeOutControlId", "AnswerValue": "", "Answer": Value, "AnswerFKType": "" }];

                _oDataCaptureBO.UpdateDCRecords(OneViewSessionStorage.Get('DcId'), AttributesList);

                return AttributesList;
            }

            else if (TemplateNodeId == '442') {
                var ColumnId = "VariationinTemp" + DcId;
                //var Value = new DateTime().GetHoursAndMinutes();
                Value = eval('( ( (scope.NewDCModel.ATGaugeTempControlId != undefined && scope.NewDCModel.ATGaugeTempControlId != "") && (scope.NewDCModel.ATAirProbeTempControlId != undefined && scope.NewDCModel.ATAirProbeTempControlId != "")) ? (((scope.NewDCModel.ATGaugeTempControlId) - (scope.NewDCModel.ATAirProbeTempControlId)).toFixed(1) ) : "")');              
                UpdateColumn(ColumnId, Value);
                var AttributesList = [{ "AttributeNodeId": 450, "ControlId": "ATVariationinTempControlId", "AnswerValue": "", "Answer": Value, "AnswerFKType": "" }];

                _oDataCaptureBO.UpdateDCRecords(OneViewSessionStorage.Get('DcId'), AttributesList);

                return AttributesList;

            }
            

            OneViewConsole.Debug("InlineEditFinished end", "EkfcViewRecords.InlineEditFinished");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("EkfcViewRecords Component", "EkfcViewRecords.InlineEditFinished", Excep);
        }
        finally {
            TemplateNodeId = null;
            DcId = null;
            ColumnId = null;
            Value = null;
            AttributesList = null;
            _oDataCaptureBO = null;
        }
    }

    var UpdateColumn = function (ColumnId, Value) {
        try {
            OneViewConsole.Debug("UpdateColumn start", "EkfcViewRecords.UpdateColumn");

            if (document.getElementById(ColumnId) != null) {
                document.getElementById(ColumnId).innerHTML = Value;
            }

            OneViewConsole.Debug("UpdateColumn end", "EkfcViewRecords.UpdateColumn");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("EkfcViewRecords Component", "EkfcViewRecords.UpdateColumn", Excep);
        }
    }
}

function ViewRecordsFacadeFactory($scope, xlatService, toaster) {
    try {
        OneViewConsole.Debug("ViewRecordsFacadeFactory start", "ViewRecordsFacadeFactory");

        var oViewRecordsFacade = null;

        if (ViewRecordsFacadeKey == "EKFC") {
            oViewRecordsFacade = new ViewRecordsFacade($scope, xlatService, toaster);
            InlineEditFinishedEventHandler = new EkfcViewRecords().InlineEditFinished;


            oGlobalOneViewBluetoothTemperatureLoggerPlugin.AutoTemperatureEventHandler = oViewRecordsFacade.SetTemperature;
        }
        else if (ViewRecordsFacadeKey == "Default") {
            oViewRecordsFacade = new ViewRecordsFacade($scope, xlatService, toaster);
        }

        OneViewConsole.Debug("ViewRecordsFacadeFactory end", "ViewRecordsFacadeFactory");

        return oViewRecordsFacade;
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Factory", "ViewRecordsFacadeFactory", Excep);
    }
}





