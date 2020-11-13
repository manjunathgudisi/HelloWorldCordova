
function ViewRecordsBO(xlatService, toaster){

    var MyInstance = this;

	this.Init = function () {
	    try {
	        OneViewConsole.Debug("Init start", "ViewRecordsBO.Init");

            state = null;
            oxlatService = null;
            otoaster = null;
            GridDataSource = null;            
            RowIndex = -1;
            DefaultInlineEditConfig = null;
            ViewRecordsFacadeKey = null;
            FilterRuleConfig = null;
            InlineEditFinishedEventHandler = null;

            OneViewConsole.Debug("Init end", "ViewRecordsBO.Init");
        }
        catch (Excep) {		
			throw oOneViewExceptionHandler.Create("BO", "ViewRecordsBO.Init", Excep);
        }
    }
	
	this.SetHeaderHeight = function ($scope) {

	    try {
	        OneViewConsole.Debug("SetHeaderHeight start", "ViewRecordsBO.SetHeaderHeight");

	        var _ogridHeaderDOM = document.getElementById('gridHeader');
	        if (_ogridHeaderDOM != null) {
	            $scope.HeaderHeight = _ogridHeaderDOM.offsetHeight + 7 + 'px';
	        }

	        OneViewConsole.Debug("SetHeaderHeight end", "ViewRecordsBO.SetHeaderHeight");
	    }
	    catch (Excep) {
	        throw oOneViewExceptionHandler.Create("BO", "ViewRecordsBO.SetHeaderHeight", Excep);
	    }
	}

    this.Navigate = function (Page) {
        try {
            OneViewConsole.Debug("Navigate start", "ViewRecordsBO.Navigate");

                state.go(Page);

            OneViewConsole.Debug("Navigate end", "ViewRecordsBO.Navigate");
        }
        catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "ViewRecordsBO.Navigate", Excep);
        }
    }

    this.ShowMsg = function (xlatService, toaster, Msgkey) {
        try {
            //toaster.pop('warning', xlatService.xlat('Notification'), xlatService.xlat(Msgkey));
            navigator.notification.alert(xlatService.xlat(Msgkey), ['OK'], "");
        }
        catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "ViewRecordsBO.ShowMsg", Excep);
        }
    }
    
    this.SetRowColor = function (RowIndex) {
        try {
            OneViewConsole.Debug("SetRowColor start", "ViewRecordsBO.SetRowColor");

                var Row = document.getElementById(RowIndex);
                if (Row != null) {
                    Row.className = Row.className + " selected";
                }

           OneViewConsole.Debug("SetRowColor end", "ViewRecordsBO.SetRowColor");
        }
        catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "ViewRecordsBO.SetRowColor", Excep);
        }
        finally {
            Row = null;
        }
    }

    this.RemoveRowColor = function (RowIndex) {
        try {
            OneViewConsole.Debug("RemoveRowColor start", "ViewRecordsBO.RemoveRowColor");

            var RegularExpressionForRemoveClass = new RegExp('(\\s|^)selected(\\s|$)');
            var Row = document.getElementById(RowIndex);
            if (Row != null) {
                Row.className = Row.className.replace(RegularExpressionForRemoveClass, ' ');
            }

            OneViewConsole.Debug("RemoveRowColor end", "ViewRecordsBO.RemoveRowColor");
        }
        catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "ViewRecordsBO.RemoveRowColor", Excep);
        }
        finally {
            RegularExpressionForRemoveClass = null;
            Row = null;
        }
    }

    this.SaveDcIdIntoSession = function (DcId) {
        try {
            OneViewConsole.Debug("SaveDcIdIntoSession start", "ViewRecordsBO.SaveDcIdIntoSession");

            OneViewSessionStorage.Save("DcId", DcId);

            OneViewConsole.Debug("SaveDcIdIntoSession end", "ViewRecordsBO.SaveDcIdIntoSession");
        }
        catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "ViewRecordsBO.SaveDcIdIntoSession", Excep);
        }
    }

    this.RemoveDcIdFromSession = function () {
        try {
            OneViewConsole.Debug("RemoveDcIdFromSession start", "ViewRecordsBO.RemoveDcIdFromSession");

            OneViewSessionStorage.Remove("DcId");

            OneViewConsole.Debug("RemoveDcIdFromSession end", "ViewRecordsBO.RemoveDcIdFromSession");
        }
        catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "ViewRecordsBO.RemoveDcIdFromSession", Excep);
        }
    }
	
	this.LoadResponsiveData = function ($scope, GridMetaData) {		
	    try {
	        OneViewConsole.Debug("LoadResponsiveData start", "ViewRecordsBO.LoadResponsiveData");

			$scope.ResponsiveData = [];

			for (var i = 0; i < GridMetaData.length; i++) {
				if (GridMetaData[i].SubColumns != undefined) {
					var SubColumns = GridMetaData[i].SubColumns;
					for (var j = 0; j < SubColumns.length; j++) {
						if (SubColumns[j].Visible == true) {
							$scope.ResponsiveData.push({ "DisplayName": SubColumns[j].DisplayName, "FieldName": SubColumns[j].FieldName, "GroupName": GridMetaData[i].FieldName, visible: true, selected: "selected" });
						}
					}
				}
				else {
				    if (GridMetaData[i].Visible == true && GridMetaData[i].IsEditButton != true) {
						$scope.ResponsiveData.push({ "DisplayName": GridMetaData[i].DisplayName, "FieldName": GridMetaData[i].FieldName, visible: true, selected: "selected" });
					}
				}
			}

			OneViewConsole.Debug("LoadResponsiveData end", "ViewRecordsBO.LoadResponsiveData");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("FrameWork", "GridControl.LoadResponsiveData", Excep);
		} 
    }

    this.LoadFilterData = function ($scope, FilterRule) {
        try {
            OneViewConsole.Debug("LoadFilterData start", "ViewRecordsBO.LoadFilterData");

			$scope.FilterData = {};

			for (var i = 0; i < FilterRule.Rules.length; i++) {
			    $scope.FilterData[FilterRule.Rules[i].ExpressionId] = { "DisplayName": FilterRule.Rules[i].DisplayLabel, selected: "", CriteriaType: FilterRule.Rules[i].Expression.CriteriaType, ExpressionId: FilterRule.Rules[i].ExpressionId };
			}

			OneViewConsole.Debug("LoadFilterData end", "ViewRecordsBO.LoadFilterData");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("FrameWork", "GridControl.LoadFilterData", Excep);
		} 
    }

    this.GetDataSourceOld = function () {		
        try {
            OneViewConsole.Debug("GetDataSourceOld start", "ViewRecordsBO.GetDataSourceOld");

			var oDcFilterParamRequest = new DcFilterParamRequest();
			oDcFilterParamRequest.DcPlaceId = OneViewSessionStorage.Get("DcPlaceId");
			oDcFilterParamRequest.DcPlaceName = OneViewSessionStorage.Get("DcPlaceName");
			oDcFilterParamRequest.TemplateNodeId = OneViewSessionStorage.Get("TemplateId");

			var _oDcDAO = new DcDAO();
			GridDataSource = _oDcDAO.GetAllDcForViewRecords(oDcFilterParamRequest);

			OneViewConsole.Debug("GetDataSourceOld end", "ViewRecordsBO.GetDataSourceOld");
		}
		catch (Excep) {
		    throw oOneViewExceptionHandler.Create("BO", "ViewRecordsBO.GetDataSourceOld", Excep);
		}
        finally {
            oDcFilterParamRequest = null;
            _oDcDAO = null;
        }
    }

    this.GetDataSource = function ($scope) {
        try {
            OneViewConsole.Debug("GetDataSource start", "ViewRecordsBO.GetDataSource");

            var oDcFilterParamRequest = new DcFilterParamRequest();
            oDcFilterParamRequest.DcPlaceId = OneViewSessionStorage.Get("DcPlaceId");
            oDcFilterParamRequest.DcPlaceName = OneViewSessionStorage.Get("DcPlaceName");
            oDcFilterParamRequest.TemplateNodeId = OneViewSessionStorage.Get("TemplateId");
            oDcFilterParamRequest.IsSubmit = false;

            if (OneViewSessionStorage.Get("TemplateId") == 483) {
                oDcFilterParamRequest.SystemUserId = OneViewSessionStorage.Get("LoginUserId");
            }

            if ($scope.IsCompleted != undefined) {
                oDcFilterParamRequest.IsCompleted = $scope.IsCompleted;
            }
            if ($scope.IsCompleted != undefined) {
                oDcFilterParamRequest.IsSynchronized = $scope.IsSynchronized;
            }

            var _oDcDAO = new DcDAO();

            if (DcInfoViewRecords == null) {

                DcInfoViewRecords = _oDcDAO.GetAllDcInfoViewRecords(oDcFilterParamRequest);
                NormalizedDataCount = DcInfoViewRecords.length;

                PageCount = "" + NormalizedDataCount / MaxRowCount;
                PageCount = PageCount.split(".");
                PageCount = (PageCount.length > 1) ? parseInt(PageCount[0]) + 1 : PageCount;

                $scope.TotalRecordsCount = NormalizedDataCount;
                $scope.TotalPageCount = PageCount;
            }

            var Start = (PageNumber * MaxRowCount) - MaxRowCount;
            var End = (PageNumber * MaxRowCount);

            var DcInfo = [];

            for (var i = Start; i < End; i++) {
                if (DcInfoViewRecords[i] != undefined && DcInfoViewRecords[i] != null) {
                    DcInfo.push(DcInfoViewRecords[i]);
                }
                else {
                    break;
                }
            }

            GridDataSource = _oDcDAO.GetAllDcForViewRecords(oDcFilterParamRequest, DcInfo);

            OneViewConsole.Debug("GetDataSource end", "ViewRecordsBO.GetDataSource");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ViewRecordsBO.GetDataSource", Excep);
        }
        finally {
            oDcFilterParamRequest = null;
            _oDcDAO = null;
        }
    }

    this.GetDataSourceWithFilters = function ($scope, FilterRule) {
        try {
            OneViewConsole.Debug("GetDataSourceWithFilters start", "ViewRecordsBO.GetDataSourceWithFilters");

            var DcResultCriteriaExp = "";
            var GraphSearchExp = "";
            var DcResultCriteriaExpCount = 0;
            var OneViewGraphSearchCriteriaElements = [];

            var oDcFilterParamRequest = new DcFilterParamRequest();
            oDcFilterParamRequest.DcPlaceId = OneViewSessionStorage.Get("DcPlaceId");
            oDcFilterParamRequest.DcPlaceName = OneViewSessionStorage.Get("DcPlaceName");
            oDcFilterParamRequest.TemplateNodeId = OneViewSessionStorage.Get("TemplateId");
            oDcFilterParamRequest.IsSubmit = false;

            if ($scope.IsCompleted != undefined) {
                oDcFilterParamRequest.IsCompleted = $scope.IsCompleted;
            }
            if ($scope.IsCompleted != undefined) {
                oDcFilterParamRequest.IsSynchronized = $scope.IsSynchronized;
            }

            if (FilterRule != null) {
                for (var j = 0; j < FilterRule.Rules.length; j++) {

                    var FilterDataObj = $scope.FilterData[FilterRule.Rules[j].ExpressionId];

                    if ((FilterDataObj != null && FilterDataObj != undefined) && (FilterDataObj.selected == true || FilterDataObj.selected == "selected")) {
                        if (FilterRule.Rules[j].Expression.CriteriaType == "OneViewDCPrimaryCriteria") {
                            oDcFilterParamRequest[FilterRule.Rules[j].Expression.ColumnName] = FilterRule.Rules[j].Expression.value;
                        }
                        else if (FilterRule.Rules[j].Expression.CriteriaType == "OneViewDCResultDetailsPrimaryCriteria") {
                            if (DcResultCriteriaExp != "") {
                                DcResultCriteriaExp += " AND ";
                            }
                            DcResultCriteriaExp += "dc.Id IN (Select DataCaptureId FROM DcResultDetailsEntity WHERE AttributeNodeId = '" + FilterRule.Rules[j].Expression.NodeId + "' AND Answer = '" + FilterRule.Rules[j].Expression.value + "'";
                            DcResultCriteriaExpCount += 1;
                        }
                        else if (FilterRule.Rules[j].Expression.CriteriaType == "OneViewGraphSearchCriteria") {
                            OneViewGraphSearchCriteriaElements.push(FilterRule.Rules[j].Expression.value);
                        }
                    }
                }
                if (FilterRule.DefaultSearchConfig != undefined) {
                    for (var j = 0; j < FilterRule.DefaultSearchConfig.length; j++) {                       
                        var Answer = ($scope[FilterRule.DefaultSearchConfig[j].ControlId] != undefined && $scope[FilterRule.DefaultSearchConfig[j].ControlId][FilterRule.DefaultSearchConfig[j].ColumnName] != undefined) ? $scope[FilterRule.DefaultSearchConfig[j].ControlId][FilterRule.DefaultSearchConfig[j].ColumnName] : "";
                        if (Answer != "") {
                            if (DcResultCriteriaExp != "") {
                                DcResultCriteriaExp += " AND AttributeNodeId = '" + FilterRule.DefaultSearchConfig[j].AttributeNodeId + "' AND Answer = '" + Answer + "'";
                            }
                            else {
                                DcResultCriteriaExp += "dc.Id IN (Select DataCaptureId FROM DcResultDetailsEntity WHERE AttributeNodeId = '" + FilterRule.DefaultSearchConfig[j].AttributeNodeId + "' AND Answer = '" + Answer + "'";
                            }
                            DcResultCriteriaExpCount += 1;
                        }
                    }
                }
            }
           
            if (DcResultCriteriaExpCount > 0) {
                for (var j = 0; j < DcResultCriteriaExpCount; j++) {
                    DcResultCriteriaExp += ")";
                }
            }
          
            if ($scope.graphSearchElement != undefined && $scope.graphSearchElement != "") {
                var GraphSearchElement = $scope.graphSearchElement.split(" ");
                for (i = 0; i < GraphSearchElement.length; i++){
                    if (GraphSearchExp != "") {
                        GraphSearchExp += " AND ";
                    }                   
                    GraphSearchExp += "(lower(GCAttributeNodeName) LIKE '%" + GraphSearchElement[i].toLowerCase() + "%' OR lower(GCAnswer) like '%" + GraphSearchElement[i].toLowerCase() + "%' OR lower(GCAnswerValue) like '%" + GraphSearchElement[i].toLowerCase() + "%' OR lower(GCComments) like '%" + GraphSearchElement[i].toLowerCase() + "%')";
                }                
            }
            for (i = 0; i < OneViewGraphSearchCriteriaElements.length; i++) {
                if (GraphSearchExp != "") {
                    GraphSearchExp += " AND ";
                }
                GraphSearchExp += "(lower(GCAnswer) like '%" + OneViewGraphSearchCriteriaElements[i].toLowerCase() + "%' OR lower(GCAnswerValue) like '%" + OneViewGraphSearchCriteriaElements[i].toLowerCase() + "%')";
            }

            var _oDcDAO = new DcDAO();

            if (DcInfoViewRecords == null) {

                if (DcResultCriteriaExp != "" || GraphSearchExp != "") {
                    DcInfoViewRecords = _oDcDAO.GetAllDcInfoWithGraphSearchViewRecords(oDcFilterParamRequest, DcResultCriteriaExp, GraphSearchExp);
                }
                else {
                    DcInfoViewRecords = _oDcDAO.GetAllDcInfoViewRecords(oDcFilterParamRequest);
                }

                NormalizedDataCount = DcInfoViewRecords.length;
                PageCount = Math.ceil(NormalizedDataCount / MaxRowCount);

                $scope.TotalRecordsCount = NormalizedDataCount;
                $scope.TotalPageCount = PageCount;
            }

            if (DcInfoViewRecords.length > 0) {
                var Start = (PageNumber * MaxRowCount) - MaxRowCount;
                var End = (PageNumber * MaxRowCount);

                var DcInfo = [];

                for (var i = Start; i < End; i++) {
                    if (DcInfoViewRecords[i] != undefined && DcInfoViewRecords[i] != null) {
                        DcInfo.push(DcInfoViewRecords[i]);
                    }
                    else {
                        break;
                    }
                }

                GridDataSource = _oDcDAO.GetAllDcForViewRecords(oDcFilterParamRequest, DcInfo);
            }            
            
            OneViewConsole.Debug("GetDataSourceWithFilters end", "ViewRecordsBO.GetDataSourceWithFilters");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ViewRecordsBO.GetDataSourceWithFilters", Excep);
        }
        finally {
            oDcFilterParamRequest = null;
            _oDcDAO = null;
        }
    }
	
	this.LoadSearchGrid = function ($scope, DataSource) {
	    try {
	        OneViewConsole.Debug("LoadSearchGrid start", "ViewRecordsBO.LoadSearchGrid");

	        if (GridDataSource != null) {
	           
	            $scope.GridInstance.RegisterRowClickEvent("ViewRecordsFacade", "RowClick");
	            $scope.GridInstance.LoadGrid($scope, DataSource, GridConfig);
	        }

	        OneViewConsole.Debug("LoadSearchGrid end", "ViewRecordsBO.LoadSearchGrid");
		}
		catch (Excep) {
		    throw oOneViewExceptionHandler.Create("BO", "ViewRecordsBO.LoadSearchGrid", Excep);
		}
	    finally {
	        GraphSearchElement = null;
	    }
        
    }

    this.SetDCFilterEquation = function (FilterRuleConfig) {
        try {
            OneViewConsole.Debug("SetDCFilterEquation start", "ViewRecordsBO.SetDCFilterEquation");

			var oDCFilterEquationBuilder = new DCFilterEquationBuilder();

			for (var i = 0; i < FilterRuleConfig.Rules.length; i++) {

				var DCFilterEquation = oDCFilterEquationBuilder.GetExpression(FilterRuleConfig.Rules[i].Expression);
				FilterRuleConfig.Rules[i].FinalEquation = DCFilterEquation;
			}

			OneViewConsole.Debug("SetDCFilterEquation end", "ViewRecordsBO.SetDCFilterEquation");
		}
		catch (Excep) {
		    throw oOneViewExceptionHandler.Create("BO", "ViewRecordsBO.SetDCFilterEquation", Excep);
		}
        finally {
            oDCFilterEquationBuilder = null;
        }
    }
	
	this.SetGridConfig=function(){  
	    try {
	        OneViewConsole.Debug("SetGridConfig start", "ViewRecordsBO.SetGridConfig");

			var ServiceId = OneViewSessionStorage.Get("ServiceId");
			var TemplateNodeId = OneViewSessionStorage.Get("TemplateId");
			var DCPlaceNodeId = OneViewSessionStorage.Get("DcPlaceId");
			var LoginUserId = OneViewSessionStorage.Get("LoginUserId");
	
			var GridConfigList = GridMetaData[ServiceId][TemplateNodeId];
			
			if(GridConfigList != undefined){
				var GridConfigForAllPlaceAndUser = null;
				var GridConfigForAllUser = null;
				var GridConfigForAllPlace = null;
				var IsOwnConfig = false;
				
				for(var i=0; i<GridConfigList.length; i++){
				
				    if (GridConfigList[i].UserId == LoginUserId && GridConfigList[i].DCPlaceNodeId == DCPlaceNodeId) {
				        ViewRecordsFacadeKey = GridConfigList[i].ViewRecordsFacadeKey;
					    GridConfig = GridConfigList[i].Config;
					    var InlineEditConfig = GridConfigList[i].DefaultInlineEditConfig;
					    if (InlineEditConfig != undefined) {
					        DefaultInlineEditConfig = InlineEditConfig;
					    }
						IsOwnConfig = true;				
						break;
					}
					
					else if(GridConfigList[i].UserId == LoginUserId && GridConfigList[i].DCPlaceNodeId == -1){
						GridConfigForAllPlace = GridConfigList[i];		
					}				
					
					else if(GridConfigList[i].UserId == -1 && GridConfigList[i].DCPlaceNodeId == DCPlaceNodeId){
						GridConfigForAllUser = GridConfigList[i];		
					}
					
					else if(GridConfigList[i].UserId == -1 && GridConfigList[i].DCPlaceNodeId == -1){
						GridConfigForAllPlaceAndUser = GridConfigList[i];		
					}
				}
				
				if(IsOwnConfig == false){
				
				    if (GridConfigForAllPlace != null) {
				        ViewRecordsFacadeKey = GridConfigForAllPlace.ViewRecordsFacadeKey;
				        GridConfig = GridConfigForAllPlace.Config;
				        if (GridConfigForAllPlace.DefaultInlineEditConfig != undefined) {
					        DefaultInlineEditConfig = GridConfigForAllPlace.DefaultInlineEditConfig;
				        }
				        if (GridConfigForAllPlace.AutoTemperatureListnerControlConfig != undefined) {
				            AutoTemperatureListnerControlConfig = GridConfigForAllPlace.AutoTemperatureListnerControlConfig;
				        }
					}
					
				    else if (GridConfigForAllUser != null) {
				        ViewRecordsFacadeKey = GridConfigForAllUser.ViewRecordsFacadeKey;
				        GridConfig = GridConfigForAllUser.Config;
				        if (GridConfigForAllUser.DefaultInlineEditConfig != undefined) {
				            DefaultInlineEditConfig = GridConfigForAllUser.DefaultInlineEditConfig;
				        }
				        if (GridConfigForAllUser.AutoTemperatureListnerControlConfig != undefined) {
				            AutoTemperatureListnerControlConfig = GridConfigForAllUser.AutoTemperatureListnerControlConfig;
				        }
					}
					
				    else {
				        ViewRecordsFacadeKey = GridConfigForAllPlaceAndUser.ViewRecordsFacadeKey;
				        GridConfig = GridConfigForAllPlaceAndUser.Config;
				        if (GridConfigForAllPlaceAndUser.DefaultInlineEditConfig != undefined) {
				            DefaultInlineEditConfig = GridConfigForAllPlaceAndUser.DefaultInlineEditConfig;
				        }
				        if (GridConfigForAllPlaceAndUser.AutoTemperatureListnerControlConfig != undefined) {
				            AutoTemperatureListnerControlConfig = GridConfigForAllPlaceAndUser.AutoTemperatureListnerControlConfig;
				        }
					}
				}				
			}
			else {
			    //ViewRecordsFacadeKey = null;
			    //GridConfigList = null;
			    //DefaultInlineEditConfig = null;

			    var CommonGridConfig = GridMetaData[ServiceId][0];

			    if (CommonGridConfig != undefined && CommonGridConfig[0] != undefined && CommonGridConfig[0].Config != undefined && CommonGridConfig[0].ViewRecordsFacadeKey != undefined) {
			        ViewRecordsFacadeKey = CommonGridConfig[0].ViewRecordsFacadeKey;
			        GridConfig = CommonGridConfig[0].Config;
			        DefaultInlineEditConfig = (CommonGridConfig[0].DefaultInlineEditConfig != undefined) ? CommonGridConfig[0].DefaultInlineEditConfig : null;
			        AutoTemperatureListnerControlConfig = (CommonGridConfig[0].AutoTemperatureListnerControlConfig != undefined) ? CommonGridConfig[0].AutoTemperatureListnerControlConfig : null;
			    }
			    else {
			        ViewRecordsFacadeKey = null;
			        GridConfigList = null;
			        DefaultInlineEditConfig = null;
			        AutoTemperatureListnerControlConfig = null;
			    }
			}

			OneViewConsole.Debug("SetGridConfig end", "ViewRecordsBO.SetGridConfig");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "ViewRecordsBO.SetGridConfig", Excep);
		}
	    finally {
	        ServiceId = null;
	        TemplateNodeId = null;
	        DCPlaceNodeId = null;
	        LoginUserId = null;
	        GridConfigList = null;
	        GridConfigForAllPlaceAndUser = null;
	        GridConfigForAllUser = null;
	        GridConfigForAllPlace = null;
	    }
    }
	
	this.SetFilterRuleConfig=function(){   
	    try {
	        OneViewConsole.Debug("SetFilterRuleConfig start", "ViewRecordsBO.SetFilterRuleConfig");

			var ServiceId = OneViewSessionStorage.Get("ServiceId");
			var TemplateNodeId = OneViewSessionStorage.Get("TemplateId");
			var DCPlaceNodeId = OneViewSessionStorage.Get("DcPlaceId");
			var LoginUserId = OneViewSessionStorage.Get("LoginUserId");
	
			var FilterConfigList = FilterMetaData[ServiceId][TemplateNodeId];
			
			if(FilterConfigList != undefined){
				var FilterRuleConfigForAllPlaceAndUser = null;
				var FilterRuleConfigForAllUser = null;
				var FilterRuleConfigForAllPlace = null;
				var IsOwnConfig = false;
				
				for(var i=0; i<FilterConfigList.length; i++){
				
					if(FilterConfigList[i].UserId == LoginUserId && FilterConfigList[i].DCPlaceNodeId == DCPlaceNodeId){
						FilterRuleConfig = FilterConfigList[i];		
						IsOwnConfig = true;				
						break;
					}
					
					else if(FilterConfigList[i].UserId == LoginUserId && FilterConfigList[i].DCPlaceNodeId == -1){
						FilterRuleConfigForAllPlace = FilterConfigList[i];		
					}				
					
					else if(FilterConfigList[i].UserId == -1 && FilterConfigList[i].DCPlaceNodeId == DCPlaceNodeId){
						FilterRuleConfigForAllUser = FilterConfigList[i];		
					}
					
					else if(FilterConfigList[i].UserId == -1 && FilterConfigList[i].DCPlaceNodeId == -1){
						FilterRuleConfigForAllPlaceAndUser = FilterConfigList[i];		
					}
				}
				
				if(IsOwnConfig == false){
				
					if(FilterRuleConfigForAllPlace != null){
						FilterRuleConfig = FilterRuleConfigForAllPlace;
					}
					
					else if(FilterRuleConfigForAllUser != null){
						FilterRuleConfig = FilterRuleConfigForAllUser;
					}
					
					else{
						FilterRuleConfig = FilterRuleConfigForAllPlaceAndUser;
					}
				}								
			}
			else{
			    //FilterRuleConfig = null;

			    var CommonFilterMetaData = FilterMetaData[ServiceId][0];

			    if (CommonFilterMetaData != undefined && CommonFilterMetaData[0] != undefined) {
			        FilterRuleConfig = CommonFilterMetaData[0];
			    }
			    else {
			        FilterRuleConfig = null;
			    }
			}

			OneViewConsole.Debug("SetFilterRuleConfig end", "ViewRecordsBO.SetFilterRuleConfig");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "ViewRecordsBO.SetFilterRuleConfig", Excep);
		}
	    finally {
	        ServiceId = null;
	        TemplateNodeId = null;
	        DCPlaceNodeId = null;
	        LoginUserId = null;
	        FilterConfigList = null;
	        FilterRuleConfigForAllPlaceAndUser = null;
	        FilterRuleConfigForAllUser = null;
	        FilterRuleConfigForAllPlace = null;
	    }
	}

	this.LoadMetadata = function () {
	    try {
	        OneViewConsole.Debug("LoadMetadata start", "ViewRecordsBO.LoadMetadata");

	        var Metadata= MyInstance.GetMetadata();
	        MyInstance.LoadMetadataDict(Metadata);

	        OneViewConsole.Debug("LoadMetadata end", "ViewRecordsBO.LoadMetadata");
	    }
	    catch (Excep) {
	        throw oOneViewExceptionHandler.Create("BO", "ViewRecordsBO.LoadMetadata", Excep);
	    }
	}


	this.GetMetadata = function () {
	    try {
	        OneViewConsole.Debug("GetMetadata start", "ViewRecordsBO.GetMetadata");

	        var ServiceId= OneViewSessionStorage.Get("ServiceId");
	        var DcUserId= OneViewSessionStorage.Get("LoginUserId");
	        var TemplateNodeId= OneViewSessionStorage.Get("TemplateId");
	        var DcPlaceId = OneViewSessionStorage.Get("DcPlaceId");
	        var DcPlaceDimension = 16;

	        var _oMobileViewRecordsMetadataDAO = new MobileViewRecordsMetadataDAO();
	        var MetaData = _oMobileViewRecordsMetadataDAO.GetMetaData(ServiceId, DcUserId, TemplateNodeId, DcPlaceId, DcPlaceDimension);

	        if (MetaData == null) {
	            //User specific
	            MetaData = _oMobileViewRecordsMetadataDAO.GetMetaData(ServiceId, DcUserId, TemplateNodeId, -1, DcPlaceDimension);
	        }

	        if (MetaData == null) {
	            //Place specific
	            MetaData = _oMobileViewRecordsMetadataDAO.GetMetaData(ServiceId, -1, TemplateNodeId, DcPlaceId, DcPlaceDimension);
	        }

	        if (MetaData == null) {
	            //none
	            DcPlaceId = -1;
	            DcUserId = -1;	           
	            MetaData = _oMobileViewRecordsMetadataDAO.GetMetaData(ServiceId, DcUserId, TemplateNodeId, DcPlaceId, DcPlaceDimension);
	        }

	        if (MetaData == null) {
	            //none
	            DcPlaceId = -1;
	            DcUserId = -1;
	            TemplateNodeId = -1;
	            MetaData = _oMobileViewRecordsMetadataDAO.GetMetaData(ServiceId, DcUserId, TemplateNodeId, DcPlaceId, DcPlaceDimension);
	        }

	        OneViewConsole.Debug("GetMetadata end", "ViewRecordsBO.GetMetadata");

	        return MetaData;
	    }
	    catch (Excep) {
	        throw oOneViewExceptionHandler.Create("BO", "ViewRecordsBO.GetMetadata", Excep);
	    }
	}

	this.LoadMetadataDict = function (MetaData) {
	    try {
	        OneViewConsole.Debug("LoadMetadataDict start", "ViewRecordsBO.LoadMetadataDict");

	        //For all templates using TemplateNodeId is comin from server -1 , but locally we are using 0 so forming the dictionay accordingly
	        var TemplateNodeId = MetaData.TemplateNodeId;
	        if (TemplateNodeId == -1) {
	            TemplateNodeId = 0;
	        }

	        //View records metadata 
	        var TemplateSpecificConfig = {};
	        var TemplateSpecificList = [];

	        TemplateSpecificList.push({
	            UserId: MetaData.DcUserId,
	            DCPlaceNodeId: MetaData.DcPlaceId,
	            ViewRecordsFacadeKey: MetaData.ViewRecordsFacadeKey,
	            DefaultInlineEditConfig: MetaData.InlineEditConfig,
	            AutoTemperatureListnerControlConfig : MetaData.AutoTemperatureListnerControlConfig,
	            Config: MetaData.Config.DisplayConfigList
	        });

	      
	        TemplateSpecificConfig[TemplateNodeId] = TemplateSpecificList;	        
	        GridMetaData[MetaData.ServiceId] = TemplateSpecificConfig;
	        //alert('GridMetaData : ' + JSON.stringify(GridMetaData));



	        //Filter records metadata 
	        var TemplateSpecificFilterMetaData = {};
	        var TemplateSpecificFilterMetaDataList = [];	        
	        TemplateSpecificFilterMetaDataList.push({
	            UserId: MetaData.DcUserId,
	            DCPlaceNodeId: MetaData.DcPlaceId,
	            Rules: MetaData.Rules,
	            DefaultSearchConfig: MetaData.DefaultSearchConfig
	        });

	        TemplateSpecificFilterMetaData[TemplateNodeId] = TemplateSpecificFilterMetaDataList;	      
	        FilterMetaData[MetaData.ServiceId] = TemplateSpecificFilterMetaData;
	       // alert('FilterMetaData : ' + JSON.stringify(FilterMetaData));

	        OneViewConsole.Debug("LoadMetadataDict end", "ViewRecordsBO.LoadMetadataDict");
	    }
	    catch (Excep) {
	        throw oOneViewExceptionHandler.Create("BO", "ViewRecordsBO.LoadMetadataDict", Excep);
	    }
	}
}
