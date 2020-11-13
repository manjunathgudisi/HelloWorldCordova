
 // LVDataCaptureBO
 function Tesco_LVDataCaptureBO() {

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
				 var ValidationResponse = VallidationHandler.Validate({ "LVTemplateResult": LVTemplateResult, "Operation": "SaveValidationMetaData", "xlatService": LVxlatService });
				 Response.IsSaveValidationSuccess = ValidationResponse.IsSuccess;

				 //alert(JSON.stringify(ValidationResponse));

				 if (ValidationResponse.IsSuccess == true) {
					 ValidationResponse = VallidationHandler.Validate({ "LVTemplateResult": LVTemplateResult, "Operation": "SubmitValidationMetaData", "xlatService": LVxlatService });
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
				 navigator.notification.alert("IN-SU-LVI-003 :: Perform data capture for atleast 1 attribute to save record", ['OK'], "");
			 }

			 OneViewConsole.Debug("IsValidationSuccess End", "LVDataCaptureBO.IsValidationSuccess");

			 return Response;
		 }
		 catch(Excep){
			 throw oOneViewExceptionHandler.Create("Factory", "LVDataCaptureBO.IsValidationSuccess", Excep);
		 }
	 }

	 this.Update = function (LVTemplateResult, LVDataCaptureId, LVDcResultsId, LVIsEdit, IsVallidationSuccess, LVDCSummary,IsSubmit) {

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

			 try{
				 _oOneViewSqlitePlugin.StartTransaction();

				 var oDefaultMasterDAO = new DefaultMasterDAO("DcResultDetailsEntity");
				 var DcResultDetailsEntityCount = oDefaultMasterDAO.Count();

				 var Result = { DcResultsId: LVDcResultsId, DcResultsClientGuid: LVDcResultsClientGuid, IsSuccess: true, DcResultDetails: {} };

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
						 }
						 else if (oAnswers[i].ClientId == "" && oAnswers[i].IsModified == true) {

							 var oAnswerMode = oAnswers[i];
							 var DcResultDetailsEntity = GetDcResultDetailsEntity(DataCaptureRequest, AttributeNodeId, AttributeNodeName, Comments, oAnswerMode, Latitude, Longitude, IsNA, IsBlocker, ESTTime, ActualTime, IsManualESTEnabled);
							 
							 DcResultDetailsEntity.DataCaptureId = LVDataCaptureId;
							 DcResultDetailsEntity.DataResultsId  = LVDcResultsId;
							
							 var oDcResultDetails = oDefaultMasterDAO.Create(DcResultDetailsEntity, DcResultDetailsEntityCount);
							 Result.DcResultDetails[oDcResultDetails.ControlId] = { "ClientId": oDcResultDetails.Id };
							
							 DcResultDetailsEntityCount += 1;

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
				 var _oDasboardBO = new DasboardBO(LVscope, '', LVxlatService, '', '', '', '');
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

	 this.Save = function (LVTemplateResult, LVDcStartDate, IsVallidationSuccess, LVDCSummary, IsSubmit) {

		 try {
			 OneViewConsole.Debug("Save Start", "LVDataCaptureBO.Save");

			 var IsDcSaveSuccess = false;
			 var IsActionSaveSuccess = true;
			 var DCSummary = null;
			 if(LVTemplateConfigMetaData != null){
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

				 var _oDasboardBO = new DasboardBO(LVscope, '', LVxlatService, '', '', '', '');
				 _oDasboardBO.UpdateTaskStatus_NewDC((OneViewSessionStorage.Get("IsDcCompletedBeforeEdit") == "true") ? true : false);

				 _oOneViewSqlitePlugin.EndTransaction();
				 
				 if (IsDcSaveSuccess == false || IsActionSaveSuccess == false) {
					 _oOneViewSqlitePlugin.Rollback();
				 }
			 }
			 catch (Excep) {
				 //alert(Excep);
				 //alert(JSON.stringify(Excep));
				 DcInfo = null;
				 AttributeActionInfo = null;
				 _oOneViewSqlitePlugin.Rollback();
			 }

			 OneViewConsole.Debug("Save End", "LVDataCaptureBO.Save");
			 
			 return { "DcInfo": DcInfo, "AttributeActionInfo": AttributeActionInfo };
		 }
		 catch (Excep) {
			
			 return { "DcInfo": null, "AttributeActionInfo": null };;
		 }
		 finally {
			 IsSaveSuccess = null;
			 oDataCaptureEntity = null;
			 _oDcDAO = null;
			 _oOneViewSqlitePlugin = null;
			 IsSuccess = null;
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

		 try{
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
		 catch(Excep){
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
							 "MultimediaSubElements":[]
						 };
					 }
				 }
			 }

			 //alert(JSON.stringify(LVActionResult));

			 OneViewConsole.Debug("LoadTemplateResult End", "LVDataCaptureBO.LoadTemplateResult");

			 return IsSuccess;
		 }
		 catch(Excep){
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
				 navigator.notification.alert(("AnswerModeLoadType = " + AnswerModeLoadType + " Not implemented exception, LVDataCaptureBO.FinalAnswer"), ['OK'], "");
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

	 var GetLastUpdatedAnswer = function(AnswerLst) {
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

			 navigator.notification.alert("Answer By UserId Not implemented exception, LVDataCaptureBO.GetAnswerByUserId", ['OK'], "");

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

			 navigator.notification.alert("Most Common Answer Not implemented exception, LVDataCaptureBO.GetMostCommonAnswer", ['OK'], "");
			
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
 


