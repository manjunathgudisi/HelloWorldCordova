var UploadedDcResponseLst = [];
var DataCaptureValidationStatusEnum = { None:0, NotValidated:1, NotStarted:2, InProgress:3, Completed:4 };

function UploadBO(xlatService, toaster) {

	var MyInstance = this;

	/// <summary>
	/// BatchUpload
	/// For particulat user (Login user)
	/// </summary>
	/// <param name="_oDcFilterParamRequest">_oDcFilterParamRequest</param>
	this.BatchUploadAdv = function (_oDcFilterParamRequest, oChild, DashBoardReq) {

		var _oOneViewSqlitePlugin = new OneViewSqlitePlugin();

		try {
			OneViewConsole.Debug("BatchUploadAdv start", "UploadBO.BatchUploadAdv");

			var IsSuccess = true;

			var _oDcDAO = new DcDAO();
			//var DcInfo = _oDcDAO.GetAllDcInfoWithFilters(_oDcFilterParamRequest);

			var _oMyAuditDAO = new MyAuditDAO();
			var DcInfo = _oMyAuditDAO.GetAllDCAdv(_oDcFilterParamRequest);

			if (DcInfo.length > 0) {

				_oDcDAO.UpdateDcProcessCountByDcInfo(DcInfo);
				var DataCaptureDTOLst = _oDcDAO.GetDcList(DcInfo);

				Update_UnSync_RcoProcessCount();
				var DynamicRCOData = GetAll_UnSync_DynamicRco();

				Update_UnSync_AssetNodeProcessCount();
				var DynamicOrgAssetNodeData = GetAll_UnSync_DynamicAssetNode();

				Update_UnSync_MultiMediaBlobSubElementsProcessCount();
				var MultiMediaBlobSubElementLst = GetAll_UnSync_MultiMediaBlobSubElements();

				Update_UnSync_MultiMediaSubElementsProcessCount();
				var MultiMediaSubElementLst = GetAll_UnSync_MultiMediaSubElements();

				Update_UnSync_AuditTrailDC();
				var AuditTrailDCLst = GetAll_UnSync_AuditTrailDC();

				//alert(JSON.stringify(AuditTrailDCLst));

				var _oActionDAO = new ActionDAO();
				var ActionResponse = _oActionDAO.GetAllUnSyncActionsForUpload(DcInfo);

				var _oDCBlockerInfoDAO = new DCBlockerInfoDAO();
				var DCBlockerInfoRequest = _oDCBlockerInfoDAO.GetAllDCBlockerInfoForUpload(DcInfo);
				//alert(JSON.stringify(DCBlockerInfoRequest));

				var _oDcApprovalDAO = new DcApprovalDAO();
				var DcApprovalDTOLst = _oDcApprovalDAO.GetAllDcApprovalInfoForUpload(DcInfo);

				var oUploadrequest = MakeUploadRequest(DataCaptureDTOLst, DynamicRCOData, DynamicOrgAssetNodeData, ActionResponse, MultiMediaBlobSubElementLst, AuditTrailDCLst, MultiMediaSubElementLst, DCBlockerInfoRequest, DcApprovalDTOLst);

				//alert(JSON.stringify(oUploadrequest));
				//oUploadResponse = null;
				var _UploadDcIL = new UploadDcIL();
				var oUploadResponse = _UploadDcIL.Upload(oUploadrequest);

				//alert(oUploadResponse.IsAnyException);
				//alert(oUploadResponse.ExceptionMessage);

				if (oUploadResponse != null && oUploadResponse.IsAnyException == false) {

					try {
						_oOneViewSqlitePlugin.StartTransaction();

						Update_Upload_Response(oUploadResponse);

						Save_Uploaded_DcResponse(oUploadResponse.DCResponseDTO.DCSyncStatusDTOlst);

						oOneViewProgressbar.SetProgressValue(MyAuditUploadProgressValue * MyAuditUploadBatchNumber);

						MyAuditUploadBatchNumber += 1;

						var _oDcProfileSyncStatusBO = new DcProfileSyncStatusBO();
						var IsDcProfileSyncStatus = _oDcProfileSyncStatusBO.Download(xlatService);

						_oOneViewSqlitePlugin.EndTransaction();

						MyInstance.BatchUploadAdv(_oDcFilterParamRequest, oChild, DashBoardReq);
						//ExecuteGarbageCollector();
					}
					catch (Excep) {

						//alert(Excep);
						//alert(JSON.stringify(Excep));

						var Msg = xlatService.xlat('Upload_Status') + " :"+xlatService.xlat('Failed')+"\n" +
								  xlatService.xlat('Upload_Summary_TotalRecords') + " : " + MyAuditTotalDCCountForUpload + "\n" +
								  xlatService.xlat('Upload_Summary_UploadedRecords') + " : " + (MyAuditUploadLimit * (MyAuditUploadBatchNumber - 1)) + "\n" +
								  xlatService.xlat('Upload_Summary_FailedRecords') + " : " + (MyAuditTotalDCCountForUpload - (MyAuditUploadLimit * (MyAuditUploadBatchNumber - 1)));

						Msg = Msg + Update_Uploaded_Dc_Validation_Summary();

						var Title = xlatService.xlat('Upload_Summary_Title');

						oOneViewCordovaDialogs.alert(Msg, Title);
						IsSuccess = false;

						//toaster.pop('error', xlatService.xlat('Error'), xlatService.xlat('UploadFailedLocal'));
						navigator.notification.alert(xlatService.xlat('UploadFailedLocal'), ['OK'], "");
						UploadedDcResponseLst = [];
						OneViewConsole.Error("Upload failed local", "UploadBO.BatchUploadAdv");

						_oOneViewSqlitePlugin.Rollback();
					}
				}
				else if (oUploadResponse != null && oUploadResponse.IsAnyException == true) {

					var Msg = xlatService.xlat('Upload_Status') + " : "+xlatService.xlat('Failed')+"\n" +
							  xlatService.xlat('Upload_Summary_TotalRecords') + " : " + MyAuditTotalDCCountForUpload + "\n" +
							  xlatService.xlat('Upload_Summary_UploadedRecords') + " : " + (MyAuditUploadLimit * (MyAuditUploadBatchNumber - 1)) + "\n" +
							  xlatService.xlat('Upload_Summary_FailedRecords') + " : " + (MyAuditTotalDCCountForUpload - (MyAuditUploadLimit * (MyAuditUploadBatchNumber - 1)));

					Msg = Msg + Update_Uploaded_Dc_Validation_Summary();

					var Title = xlatService.xlat('Upload_Summary_Title');

					oOneViewCordovaDialogs.alert(Msg, Title);
					IsSuccess = false;

					// toaster.pop('error', xlatService.xlat('Error'), xlatService.xlat('UploadFailed'));
					navigator.notification.alert(xlatService.xlat('UploadFailed'), ['OK'], "");
					UploadedDcResponseLst = [];
					OneViewConsole.Info("Upload failed", "UploadBO.BatchUploadAdv");
				}
			}
			else {

				var Msg = xlatService.xlat('Upload_Status') + " : "+xlatService.xlat('Success')+"\n" +
						  xlatService.xlat('Upload_Summary_TotalRecords') + " : " + MyAuditTotalDCCountForUpload + "\n" +
						  xlatService.xlat('Upload_Summary_UploadedRecords') + " : " + MyAuditTotalDCCountForUpload + "\n" +
						  xlatService.xlat('Upload_Summary_FailedRecords') + " : " + 0;

				Msg = Msg + Update_Uploaded_Dc_Validation_Summary();

				var Title = xlatService.xlat('Upload_Summary_Title');

				DownloadActionFollowUp(xlatService);
				MyInstance.DownlaodActionFollowUpDetails(_oDcFilterParamRequest);
				MyInstance.DownlaodExcludedAttributeDetails(_oDcFilterParamRequest);

				oOneViewCordovaDialogs.alert(Msg, Title);
				IsSuccess = true;

				// toaster.pop('success', xlatService.xlat('Success'), xlatService.xlat('UploadSuccess'));
				navigator.notification.alert(xlatService.xlat('UploadSuccess'), ['OK'], "");
				UploadedDcResponseLst = [];
				
				PostUploadSuccessExecuteAPI(oChild, DashBoardReq);
				
				OneViewConsole.Info("Upload success", "UploadBO.Upload");
			}

			return IsSuccess;

			OneViewConsole.Debug("BatchUploadAdv end", "UploadBO.BatchUploadAdv");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.BatchUploadAdv", Excep);
		}
		finally {
			_oDcDAO = null;
			DcInfo = null;
			DataCaptureDTOLst = null;
			DynamicRCOData = null;
			DynamicOrgAssetNodeData = null;
			MultiMediaBlobSubElementLst = null;
			_oActionDAO = null;
			ActionResponse = null;
			oUploadrequest = null;
			_UploadDcIL = null;
			oUploadResponse = null;
			Msg = null;
			Title = null;
		}
	}
	
	/// <summary>
		/// PostUploadSuccessExecuteAPI
		/// </summary>
		/// <param name="DCSyncStatusDTOlst">oChild</param>
		var PostUploadSuccessExecuteAPI = function (oChild, DashBoardReq) {

			try {
				OneViewConsole.Debug("PostUploadSuccessFunction start", "UploadBO.PostUploadSuccessFunction");
			   
				//var DashBoardReq = {
				//    '$scope': $scope, '$document': $document, 'xlatService': xlatService,
				//    '$timeout': $timeout, '$location': $location, '$templateCache': $templateCache, '$compile': $compile, 'snapRemote': snapRemote,
				//    'LandingPageViewName': LandingPageViewInfo.LandingPageViewName,
				//    'DCTaskViewInfoDTO': DCTaskViewInfoDTO,
				//    'LandingPageSelectedStatusTypeId': LandingPageSelectedStatusTypeId

				//};

				var ServiceId = OneViewSessionStorage.Get("ServiceId");
				if (ServiceId != 1 || ServiceId != 2) {
					oSetDefaultSpinner.Start();
					var _oDasboardBO = new DasboardBO(DashBoardReq.$scope, DashBoardReq.$document, DashBoardReq.xlatService, DashBoardReq.$timeout, DashBoardReq.$location, DashBoardReq.$templateCache, DashBoardReq.$compile, DashBoardReq.snapRemote);

					ExecuteGrabageCollectorForBatchUploadAdv(oChild);

					_oDasboardBO.UpdateSyncStatus(oChild);
					_oDasboardBO.SetByView(DashBoardReq.LandingPageViewName);
					_oDasboardBO.UpdateTaskStatus(DashBoardReq.DCTaskViewInfoDTO);
					_oDasboardBO.LoadHtml(DashBoardReq.DCTaskViewInfoDTO, DashBoardReq.LandingPageSelectedStatusTypeId);


					if (ServiceId == 61 && (oChild.TemplateKeyId == 326 || oChild.TemplateKeyId == 339 || oChild.TemplateKeyId == 350 || oChild.TemplateKeyId == 378 || oChild.TemplateKeyId == 391)) {
						//alert('AutoSync');
						LandingPageAutoSync(DashBoardReq);
					}

					oSetDefaultSpinner.Stop();
				}
				OneViewConsole.Debug("PostUploadSuccessFunction end", "UploadBO.PostUploadSuccessFunction");
			}
			catch (Excep) {
				oSetDefaultSpinner.Stop();
				throw oOneViewExceptionHandler.Create("BO", "UploadBO.PostUploadSuccessFunction", Excep);
			}
			finally {
				_oDcDAO = null;
			}
		}


		var ExecuteGrabageCollectorForBatchUploadAdv = function (oChild) {

			try {
				OneViewConsole.Debug("ExecuteGrabageCollectorForBatchUploadAdv start", "UploadBO.ExecuteGrabageCollectorForBatchUploadAdv");

				if (oChild.DCPlaceKeyElementIsGroup == false && oChild.TemplateKeyElementIsGroup == false) {

					BatchUploadExcecuteGarbageCollector(oChild.TemplateKeyId, oChild.DCPlaceKeyId);
				}
				else if (oChild.DCPlaceKeyElementIsGroup == true && oChild.TemplateKeyElementIsGroup == false) {

					var DcPlaceChildResult = _oDcDAO.GetDcPlaceIdsByPlaceGroupAndDCPlaceRCOType(oChild.DCPlaceKeyId, oChild.DCPlaceRCOType);

					for (var i = 0; i < DcPlaceChildResult.length; i++) {

						BatchUploadExcecuteGarbageCollector(oChild.TemplateKeyId, DcPlaceChildResult[i].Id);
					}
				}
				else if (oChild.DCPlaceKeyElementIsGroup == false && oChild.TemplateKeyElementIsGroup == true) {

					var DcTemplateChildResult = _oDcDAO.GetDcTemplateIdsByTemplateGroupAndAttributeGroupType(oChild.TemplateKeyId, oChild.AttributeGroupType);

					for (var i = 0; i < DcTemplateChildResult.length; i++) {

						BatchUploadExcecuteGarbageCollector(DcTemplateChildResult[i].Id, oChild.DCPlaceKeyId);
					}
				}
				else if (oChild.DCPlaceKeyElementIsGroup == true && oChild.TemplateKeyElementIsGroup == true) {

					var DcTemplateChildResult = _oDcDAO.GetDcTemplateIdsByTemplateGroupAndAttributeGroupType(oChild.TemplateKeyId, oChild.AttributeGroupType);
					var DcPlaceChildResult = _oDcDAO.GetDcPlaceIdsByPlaceGroupAndDCPlaceRCOType(oChild.DCPlaceKeyId, oChild.DCPlaceRCOType);

					for (var i = 0; i < DcTemplateChildResult.length; i++) {

						for (var j = 0; j < DcPlaceChildResult.length; j++) {

							BatchUploadExcecuteGarbageCollector(DcTemplateChildResult[i].Id, DcPlaceChildResult[j].Id);
						}
					}
				}


				OneViewConsole.Debug("ExecuteGrabageCollectorForBatchUploadAdv end", "UploadBO.ExecuteGrabageCollectorForBatchUploadAdv");
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("BO", "UploadBO.ExecuteGrabageCollectorForBatchUploadAdv", Excep);
			}
			finally {
				_oDcDAO = null;
			}
		}
	   

		var BatchUploadExcecuteGarbageCollector = function (TemplateId, DcPlaceId) {

			try {
				OneViewConsole.Debug("BatchUploadExcecuteGarbageCollector start", "LandingPageFacade.BatchUploadExcecuteGarbageCollector");

				var _oDcDeletion = new DcDeletion();
				_oDcDeletion.DeleteCompleteAndSyncedData(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
				_oDcDeletion.DeleteInCompleteAndSyncedData(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
				_oDcDeletion.DeleteInCompleteAndSyncedDataInDays(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
				_oDcDeletion.DeleteCompletedSyncAndApprovedData(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
				_oDcDeletion.DeleteCompletedSyncAndOnDeviceApprovalFinishedData(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
				if (OneViewSessionStorage.Get("ServiceId") == 39) {
					_oDcDeletion.DeleteInActivePurchaseOrder(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
					_oDcDeletion.DeleteItemCompletedorInActiveInPurchaseOrder(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
					_oDcDeletion.DeleteCompletedItemInPurchaseOrder(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
				}

				_oDcDeletion.DeleteExpiredOrderItems(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
				_oDcDeletion.DeleteCompletedItemFromWorkOrder(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
				_oDcDeletion.DeleteExpiredItemFromWorkOrder(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);

				if (OneViewSessionStorage.Get("ServiceId") == 51) {
					_oDcDeletion.DeleteCompletedItemForFlightPreparation(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
					_oDcDeletion.DeleteExpiredItemForFlightPreparation(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
				}
				else if (OneViewSessionStorage.Get("ServiceId") == 52) {
					_oDcDeletion.DeleteCompletedItemForASOWorkOrder(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
					_oDcDeletion.DeleteExpiredItemForASOWorkOrder(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
				}
				else if (OneViewSessionStorage.Get("ServiceId") == 61) {
					_oDcDeletion.DeleteCompletedItemFromRFLWorkOrder(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
					_oDcDeletion.DeleteExpiredItemFromRFLWorkOrder(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);

				}

				OneViewConsole.Debug("BatchUploadExcecuteGarbageCollector end", "LandingPageFacade.BatchUploadExcecuteGarbageCollector");
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.UploadDC", Excep);
			}
			finally {
			}
		}


		var LandingPageAutoSync = function (DashBoardReq) {
			try {
				OneViewConsole.Debug("LandingPageAutoSync start", "DasboardFacade.LandingPageAutoSync");

				// Network status checking
				var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
				var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();

				if (NetworkStatus.IsNetworkAvailable == true) {

					var ServiceId = OneViewSessionStorage.Get("ServiceId");
					var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

					//var _oUploadBO = new UploadBO(xlatService, '');
					var UploadResponse = MyInstance.AutoUpload();

					if (UploadResponse != undefined && (UploadResponse.IsSuccess == true)) {

						var _oLandingPageViewReponseBO = new LandingPageViewReponseBO(xlatService);
						_oLandingPageViewReponseBO.DeleteLandingPageViewReponse();

					  
						var _oLandingPageViewReponseBO = new LandingPageViewReponseBO(xlatService);
						var LandingPageViewReponseIsSuccess = _oLandingPageViewReponseBO.Download();
						
						if (LandingPageViewReponseIsSuccess == true) {
						
							var _oDcProfileSyncStatusBO = new DcProfileSyncStatusBO();
							var IsDcProfileSyncStatus = _oDcProfileSyncStatusBO.Download(xlatService);
						
							//MyInstance.Init();
							//MyInstance.PageLoad();
							//var _oDasboardBO = new DasboardBO(DashBoardReq.$scope, DashBoardReq.$document, DashBoardReq.xlatService, DashBoardReq.$timeout, DashBoardReq.$location, DashBoardReq.$templateCache, DashBoardReq.$compile, DashBoardReq.snapRemote);
							var _oDasboardFacade = new DasboardFacade(DashBoardReq.$scope, DashBoardReq.$document, DashBoardReq.xlatService, DashBoardReq.$timeout, DashBoardReq.$location, DashBoardReq.$templateCache, DashBoardReq.$compile, DashBoardReq.snapRemote);
							_oDasboardFacade.Init();
							_oDasboardFacade.PageLoad();
						
						}
					}
					
				}

				OneViewConsole.Debug("LandingPageAutoSync end", "DasboardFacade.LandingPageAutoSync");
			}
			catch (Excep) {
				oOneViewExceptionHandler.Catch(Excep, "DasboardFacade.LandingPageAutoSync", xlatService);
			}
		}


	/// <summary>
	/// BatchUpload
	/// For particulat user (Login user)
	/// </summary>
	/// <param name="_oDcFilterParamRequest">_oDcFilterParamRequest</param>
	this.BatchUpload = function (_oDcFilterParamRequest) {

		var _oOneViewSqlitePlugin = new OneViewSqlitePlugin();

		try {
			OneViewConsole.Debug("BatchUpload start", "UploadBO.BatchUpload");

			var _oDcDAO = new DcDAO();
			//var DcInfo = _oDcDAO.GetAllDcInfoWithFilters(_oDcFilterParamRequest);

			var _oMyAuditDAO = new MyAuditDAO();
			var DcInfo = _oMyAuditDAO.GetAllDC(_oDcFilterParamRequest);

				if (DcInfo.length > 0) {

					_oDcDAO.UpdateDcProcessCountByDcInfo(DcInfo);
					var DataCaptureDTOLst = _oDcDAO.GetDcList(DcInfo);

					Update_UnSync_RcoProcessCount();
					var DynamicRCOData = GetAll_UnSync_DynamicRco();

					Update_UnSync_AssetNodeProcessCount();
					var DynamicOrgAssetNodeData = GetAll_UnSync_DynamicAssetNode();

					Update_UnSync_MultiMediaBlobSubElementsProcessCount();
					var MultiMediaBlobSubElementLst = GetAll_UnSync_MultiMediaBlobSubElements();

					Update_UnSync_MultiMediaSubElementsProcessCount();
					var MultiMediaSubElementLst = GetAll_UnSync_MultiMediaSubElements();

					Update_UnSync_AuditTrailDC();
					var AuditTrailDCLst = GetAll_UnSync_AuditTrailDC();

					//alert(JSON.stringify(AuditTrailDCLst));

					var _oActionDAO = new ActionDAO();
					var ActionResponse = _oActionDAO.GetAllUnSyncActionsForUpload(DcInfo);

					var _oDCBlockerInfoDAO = new DCBlockerInfoDAO();
					var DCBlockerInfoRequest = _oDCBlockerInfoDAO.GetAllDCBlockerInfoForUpload(DcInfo);
					//alert(JSON.stringify(DCBlockerInfoRequest));

					var _oDcApprovalDAO = new DcApprovalDAO();
					var DcApprovalDTOLst = _oDcApprovalDAO.GetAllDcApprovalInfoForUpload(DcInfo);

					var oUploadrequest = MakeUploadRequest(DataCaptureDTOLst, DynamicRCOData, DynamicOrgAssetNodeData, ActionResponse, MultiMediaBlobSubElementLst, AuditTrailDCLst, MultiMediaSubElementLst, DCBlockerInfoRequest, DcApprovalDTOLst);

					//alert(JSON.stringify(oUploadrequest));
					//oUploadResponse = null;
					var _UploadDcIL = new UploadDcIL();
					var oUploadResponse = _UploadDcIL.Upload(oUploadrequest);

					//alert(oUploadResponse.IsAnyException);
					//alert(oUploadResponse.ExceptionMessage);

					if (oUploadResponse != null && oUploadResponse.IsAnyException == false) {

						try {
							_oOneViewSqlitePlugin.StartTransaction();

							Update_Upload_Response(oUploadResponse);

							Save_Uploaded_DcResponse(oUploadResponse.DCResponseDTO.DCSyncStatusDTOlst);

							oOneViewProgressbar.SetProgressValue(MyAuditUploadProgressValue * MyAuditUploadBatchNumber);

							MyAuditUploadBatchNumber += 1;

							_oOneViewSqlitePlugin.EndTransaction();

							MyInstance.BatchUpload(_oDcFilterParamRequest);
						}
						catch (Excep) {

							//alert(Excep);
							//alert(JSON.stringify(Excep));

							var Msg = xlatService.xlat('Upload_Status') + " : Failed\n" +
									  xlatService.xlat('Upload_Summary_TotalRecords') + " : " + MyAuditTotalDCCountForUpload + "\n" +
									  xlatService.xlat('Upload_Summary_UploadedRecords') + " : " + (MyAuditUploadLimit * (MyAuditUploadBatchNumber - 1)) + "\n" +
									  xlatService.xlat('Upload_Summary_FailedRecords') + " : " + (MyAuditTotalDCCountForUpload - (MyAuditUploadLimit * (MyAuditUploadBatchNumber - 1)));

							Msg = Msg + Update_Uploaded_Dc_Validation_Summary();

							var Title = xlatService.xlat('Upload_Summary_Title');

							oOneViewCordovaDialogs.alert(Msg, Title);

							//toaster.pop('error', xlatService.xlat('Error'), xlatService.xlat('UploadFailedLocal'));
							navigator.notification.alert(xlatService.xlat('UploadFailedLocal'), ['OK'], "");
							UploadedDcResponseLst = [];
							OneViewConsole.Error("Upload failed local", "UploadBO.BatchUpload");

							_oOneViewSqlitePlugin.Rollback();
						}
					}
					else if (oUploadResponse != null && oUploadResponse.IsAnyException == true) {

						var Msg = xlatService.xlat('Upload_Status') + " : Failed\n" +
								  xlatService.xlat('Upload_Summary_TotalRecords') + " : " + MyAuditTotalDCCountForUpload + "\n" +
								  xlatService.xlat('Upload_Summary_UploadedRecords') + " : " + (MyAuditUploadLimit * (MyAuditUploadBatchNumber - 1)) + "\n" +
								  xlatService.xlat('Upload_Summary_FailedRecords') + " : " + (MyAuditTotalDCCountForUpload - (MyAuditUploadLimit * (MyAuditUploadBatchNumber - 1)));

						Msg = Msg + Update_Uploaded_Dc_Validation_Summary();

						var Title = xlatService.xlat('Upload_Summary_Title');

						oOneViewCordovaDialogs.alert(Msg, Title);

						// toaster.pop('error', xlatService.xlat('Error'), xlatService.xlat('UploadFailed'));
						navigator.notification.alert(xlatService.xlat('UploadFailed'), ['OK'], "");
						UploadedDcResponseLst = [];
						OneViewConsole.Info("Upload failed", "UploadBO.BatchUpload");
					}
				}
				else {

					var Msg = xlatService.xlat('Upload_Status') + " : Success\n" +
							  xlatService.xlat('Upload_Summary_TotalRecords') + " : " + MyAuditTotalDCCountForUpload + "\n" +
							  xlatService.xlat('Upload_Summary_UploadedRecords') + " : " + MyAuditTotalDCCountForUpload + "\n" +
							  xlatService.xlat('Upload_Summary_FailedRecords') + " : " + 0;

					Msg = Msg + Update_Uploaded_Dc_Validation_Summary();

					var Title = xlatService.xlat('Upload_Summary_Title');

					DownloadActionFollowUp(xlatService);
					MyInstance.DownlaodActionFollowUpDetails(_oDcFilterParamRequest);
					MyInstance.DownlaodExcludedAttributeDetails(_oDcFilterParamRequest);

					oOneViewCordovaDialogs.alert(Msg, Title);

					// toaster.pop('success', xlatService.xlat('Success'), xlatService.xlat('UploadSuccess'));
					navigator.notification.alert(xlatService.xlat('UploadSuccess'), ['OK'], "");
					UploadedDcResponseLst = [];
					OneViewConsole.Info("Upload success", "UploadBO.Upload");
				}

			OneViewConsole.Debug("BatchUpload end", "UploadBO.BatchUpload");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.BatchUpload", Excep);
		}
		finally {
			_oDcDAO = null;
			DcInfo = null;
			DataCaptureDTOLst = null;
			DynamicRCOData = null;
			DynamicOrgAssetNodeData = null;
			MultiMediaBlobSubElementLst = null;
			_oActionDAO = null;
			ActionResponse = null;
			oUploadrequest = null;
			_UploadDcIL = null;
			oUploadResponse = null;
			Msg = null;
			Title = null;
		}
	}


	/// <summary>
	/// BatchUpload
	/// For all users
	/// </summary>
	this.BulkUpload = function (IsHideSuccessMsg) {

		var _oOneViewSqlitePlugin = new OneViewSqlitePlugin();

		try {
			if (IsHideSuccessMsg != true) {
				oSetDefaultSpinner.Start();
			}
			//oOneViewProgressbar.Start("Uploading");

			var IsSuccess = true;

			var IsMultiMediaSubElementsSuccess = MyInstance.UploadMultiMediaSubElements();

			if (IsMultiMediaSubElementsSuccess != null && IsMultiMediaSubElementsSuccess == true) {

				var IsSyncDynamicRcoAndAssetNodesSuccess = MyInstance.SyncDynamicRcoAndAssetNodes(true, true);

				//alert(IsSyncDynamicRcoAndAssetNodesSuccess);

				if (IsSyncDynamicRcoAndAssetNodesSuccess != null && IsSyncDynamicRcoAndAssetNodesSuccess == true) {

					//oOneViewProgressbar.SetProgressValue(25);

					OneViewConsole.Debug("BulkUpload start", "UploadBO.BulkUpload");
					var _oDcDAO = new DcDAO();

					Update_UnSync_DC_ProcessCount();
					var DataCaptureDTOLst = _oDcDAO.GetAllUnSyncDc();

					if (DataCaptureDTOLst.length > 0) {

						//oOneViewProgressbar.SetProgressValue(50);

						Update_UnSync_RcoProcessCount();
						var DynamicRCOData = GetAll_UnSync_DynamicRco();

						Update_UnSync_AssetNodeProcessCount();
						var DynamicOrgAssetNodeData = GetAll_UnSync_DynamicAssetNode();

						Update_UnSync_MultiMediaBlobSubElementsProcessCount();
						var MultiMediaBlobSubElementLst = GetAll_UnSync_MultiMediaBlobSubElements();

						Update_UnSync_MultiMediaSubElementsProcessCount();
						var MultiMediaSubElementLst = GetAll_UnSync_MultiMediaSubElements();

						Update_UnSync_AuditTrailDC();
						var AuditTrailDCLst = GetAll_UnSync_AuditTrailDC();

						var _oActionDAO = new ActionDAO();
						var ActionResponse = _oActionDAO.GetAllUnSyncActionsForUpload(DataCaptureDTOLst);

						var _oDCBlockerInfoDAO = new DCBlockerInfoDAO();
						var DCBlockerInfoRequest = _oDCBlockerInfoDAO.GetAllDCBlockerInfoForUpload(DataCaptureDTOLst);

						var _oDcApprovalDAO = new DcApprovalDAO();
						var DcApprovalDTOLst = _oDcApprovalDAO.GetAllDcApprovalInfoForUpload(DataCaptureDTOLst);

						var oUploadrequest = MakeUploadRequest(DataCaptureDTOLst, DynamicRCOData, DynamicOrgAssetNodeData, ActionResponse, MultiMediaBlobSubElementLst, AuditTrailDCLst, MultiMediaSubElementLst, DCBlockerInfoRequest, DcApprovalDTOLst);

						//alert(JSON.stringify(oUploadrequest));

						var _UploadDcIL = new UploadDcIL(toaster);
						var oUploadResponse = _UploadDcIL.Upload(oUploadrequest);

						//alert(JSON.stringify(oUploadResponse));
						//alert(oUploadResponse.IsAnyException);

						if (oUploadResponse != null && oUploadResponse.IsAnyException == false) {

							try {
								//oOneViewProgressbar.SetProgressValue(75);

								_oOneViewSqlitePlugin.StartTransaction();

								Update_Upload_Response(oUploadResponse);

								_oOneViewSqlitePlugin.EndTransaction();

								DownloadActionFollowUp(xlatService);
								MyInstance.DownlaodActionFollowUpDetails();

								//oOneViewProgressbar.SetProgressValue(100);

								// toaster.pop('success', xlatService.xlat('Success'), xlatService.xlat('UploadSuccess'));
								if (IsHideSuccessMsg != true) {
									navigator.notification.alert(xlatService.xlat('UploadSuccess'), ['OK'], "");
								}
								OneViewConsole.Info("Upload success", "UploadBO.Upload");
							}
							catch (Excep) {
								// toaster.pop('error', xlatService.xlat('Error'), xlatService.xlat('UploadFailedLocal'));
								if (IsHideSuccessMsg != true) {
									navigator.notification.alert(xlatService.xlat('UploadFailedLocal'), ['OK'], "");
								}
								OneViewConsole.Info("Upload failed local", "UploadBO.BulkUpload");
								_oOneViewSqlitePlugin.Rollback();
								IsSuccess = false;
							}
						}
						else {
							//toaster.pop('error', xlatService.xlat('Error'), xlatService.xlat('UploadFailed'));
							if (IsHideSuccessMsg != true) {
								navigator.notification.alert(xlatService.xlat('UploadFailed'), ['OK'], "");
							}
							OneViewConsole.Info("Upload failed", "UploadBO.BulkUpload");
							IsSuccess = false;
						}
					}
					else {
						// toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('NoDataForUpload'));
						if (IsHideSuccessMsg != true) {
							navigator.notification.alert(xlatService.xlat('NoDataForUpload'), ['OK'], "");
						}
						OneViewConsole.Info("No dc available", "UploadBO.Upload");
					}
				}
				else {
					//toaster.pop('error', xlatService.xlat('Error'), xlatService.xlat('UploadFailed'));
					if (IsHideSuccessMsg != true) {
						navigator.notification.alert(xlatService.xlat('UploadFailed'), ['OK'], "");
					}
					OneViewConsole.Info("Upload failed", "UploadBO.BulkUpload");
					IsSuccess = false;
				}
			}
			else {
				IsSuccess = false;
			}

			OneViewConsole.Debug("Upload end", "UploadBO.BulkUpload");
			//oOneViewProgressbar.Stop();
			if (IsHideSuccessMsg != true) {
				oSetDefaultSpinner.Stop();
			}
			return IsSuccess;
		}

		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.BulkUpload", Excep);
			return false;
		}

		finally {
			IsSuccess = null;
			IsSyncDynamicRcoAndAssetNodesSuccess = null;
			_oDcDAO = null;
			DataCaptureDTOLst = null;
			DynamicRCOData = null;
			DynamicOrgAssetNodeData = null;
			MultiMediaBlobSubElementLst = null;
			_oActionDAO = null;
			ActionResponse = null;
			oUploadrequest = null;
			_UploadDcIL = null;
			oUploadResponse = null;
		}
	}


	/// <summary>
	/// AutoUpload
	/// For all users
	/// </summary>
	this.AutoUpload = function (IsBulkUploadEnabled) {

		//alert("Auto Upload Started ...");

		var _oOneViewSqlitePlugin = new OneViewSqlitePlugin();
		var _oOneViewAutoUploadPlugin = new OneViewAutoUploadPlugin();
		var EnableAutoUpload = (OneViewLocalStorage.Get("IsAutoUploadEnabled") != null) ? OneViewLocalStorage.Get("IsAutoUploadEnabled") : false;

		try {
			OneViewConsole.Debug("AutoUpload start", "UploadBO.AutoUpload");

			var Response = { "IsSuccess": true, "DCCount": 0 }
			var IsSuccess = true;

			//var _oDcDAO = new DcDAO();
			//var DcCount = _oDcDAO.GetAllUnSyncDcCount();

			var _oDcFilterParamRequest = new DcFilterParamRequest();
			_oDcFilterParamRequest.SystemUserId = OneViewSessionStorage.Get("LoginUserId");;
			_oDcFilterParamRequest.IsSynchronized = false;

			var _oDcDAO = new DcDAO();
			var DcCount = _oDcDAO.GetDCCountWithFilters(_oDcFilterParamRequest);

			if (DcCount > 0) {

				var ConfirmationSuccess = true;
//                if (IsBulkUploadEnabled!=undefined && IsBulkUploadEnabled == true) {
//                    var Message = 'IN-MG-LDP-001 :: Are you sure you want to Upload?';
//                    ConfirmationSuccess = oOneViewDefaultConfirmBox.Show(Message);
//                }
//
				oOneViewProgressbar.Start("Uploading");
				var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
				oOneViewCordovaPlugin.DefaultConfirmBox("Confirm", 'IN-MG-LDP-001 :: Are you sure you want to Upload?', function (ConfirmationId) {
					if (ConfirmationId == "2") {

						var _oOneViewAutoUploadPlugin = new OneViewAutoUploadPlugin();

						var IsMultiMediaSubElementsSuccess = MyInstance.UploadMultiMediaSubElements(false);
						ProgressBarStatus(IsBulkUploadEnabled, 10);
						//alert("IsMultiMediaSubElementsSuccess : " + IsMultiMediaSubElementsSuccess);

						if (IsMultiMediaSubElementsSuccess != null && IsMultiMediaSubElementsSuccess == true) {

							var IsSyncDynamicRcoAndAssetNodesSuccess = MyInstance.SyncDynamicRcoAndAssetNodes(true, false);

							//alert("IsSyncDynamicRcoAndAssetNodesSuccess : " + IsSyncDynamicRcoAndAssetNodesSuccess);
							ProgressBarStatus(IsBulkUploadEnabled,20);
							if (IsSyncDynamicRcoAndAssetNodesSuccess != null && IsSyncDynamicRcoAndAssetNodesSuccess == true) {

								var _oDcDAO = new DcDAO();

								//Update_UnSync_DC_ProcessCount();
								//var DataCaptureDTOLst = _oDcDAO.GetAllUnSyncDc();
								var _oMyAuditDAO = new MyAuditDAO();
								var DcInfo = _oMyAuditDAO.GetAllDCAdv(_oDcFilterParamRequest);

								if (DcInfo.length > 0) {

									_oDcDAO.UpdateDcProcessCountByDcInfo(DcInfo);
									var DataCaptureDTOLst = _oDcDAO.GetDcList(DcInfo);

									Update_UnSync_RcoProcessCount();
									var DynamicRCOData = GetAll_UnSync_DynamicRco();

									Update_UnSync_AssetNodeProcessCount();
									var DynamicOrgAssetNodeData = GetAll_UnSync_DynamicAssetNode();

									Update_UnSync_MultiMediaBlobSubElementsProcessCount();
									var MultiMediaBlobSubElementLst = GetAll_UnSync_MultiMediaBlobSubElements();

									Update_UnSync_MultiMediaSubElementsProcessCount();
									var MultiMediaSubElementLst = GetAll_UnSync_MultiMediaSubElements();

									Update_UnSync_AuditTrailDC();
									var AuditTrailDCLst = GetAll_UnSync_AuditTrailDC();

									var _oActionDAO = new ActionDAO();
									var ActionResponse = _oActionDAO.GetAllUnSyncActionsForUpload(DataCaptureDTOLst);

									var _oDCBlockerInfoDAO = new DCBlockerInfoDAO();
									var DCBlockerInfoRequest = _oDCBlockerInfoDAO.GetAllDCBlockerInfoForUpload(DataCaptureDTOLst);

									var _oDcApprovalDAO = new DcApprovalDAO();
									var DcApprovalDTOLst = _oDcApprovalDAO.GetAllDcApprovalInfoForUpload(DcInfo);

									var oUploadrequest = MakeUploadRequest(DataCaptureDTOLst, DynamicRCOData, DynamicOrgAssetNodeData, ActionResponse, MultiMediaBlobSubElementLst, AuditTrailDCLst, MultiMediaSubElementLst, DCBlockerInfoRequest, DcApprovalDTOLst);
									ProgressBarStatus(IsBulkUploadEnabled,25);



									var _UploadDcIL = new UploadDcIL(toaster);
									var oUploadResponse = _UploadDcIL.Upload(oUploadrequest, false);
									ProgressBarStatus(IsBulkUploadEnabled,50);
									//alert(JSON.stringify(oUploadResponse));
									//if (oUploadResponse != null) {
									//    alert(oUploadResponse.IsAnyException);
									//}

									if (oUploadResponse != null && oUploadResponse.IsAnyException == false) {

										try {
											_oOneViewSqlitePlugin.StartTransaction();

											Update_Upload_Response(oUploadResponse);
											ProgressBarStatus(IsBulkUploadEnabled, 60);

											ExecuteGarbageCollector();
											ProgressBarStatus(IsBulkUploadEnabled, 70);

											var _oLandingPageViewReponseBO = new LandingPageViewReponseBO(xlatService);
											var LandingPageViewReponseBOIsSuccess = _oLandingPageViewReponseBO.Download();
											ProgressBarStatus(IsBulkUploadEnabled, 80);

											var _oDcProfileSyncStatusBO = new DcProfileSyncStatusBO();
											var IsDcProfileSyncStatus = _oDcProfileSyncStatusBO.Download(xlatService);
											ProgressBarStatus(IsBulkUploadEnabled, 90);

											_oOneViewSqlitePlugin.EndTransaction();
											DownloadActionFollowUp(xlatService);

											MyInstance.DownlaodActionFollowUpDetails();

											if (OneViewSessionStorage.Get("ServiceId") == 32) {
												ProgressBarStatus(IsBulkUploadEnabled, 95);
												var DownloadedTGIdList = MyInstance.GetTemplateGroupIds();
												if (DownloadedTGIdList != null && DownloadedTGIdList.length > 0) {
													var IsMitmarkLandingPageViewReponseSuccess = new MitmarkLandingPageViewReponseBO(xlatService).Download(DownloadedTGIdList);
												}
											}

											ProgressBarStatus(IsBulkUploadEnabled, 100);

											if (IsBulkUploadEnabled != undefined && IsBulkUploadEnabled == true) {
												//alert(xlatService.xlat('IN-SU-LDP-001 :: Data uploaded successfully'));
												navigator.notification.alert(xlatService.xlat('IN-SU-LDP-001 :: Data uploaded successfully'), ['OK'], "");
											}
											_oOneViewAutoUploadPlugin.Stop();
											oOneViewProgressbar.Stop();

											OneViewConsole.Info("Upload success", "UploadBO.AutoUpload");
										}
										catch (Excep) {
											_oOneViewAutoUploadPlugin.Stop();
											oOneViewProgressbar.Stop();
											if (IsBulkUploadEnabled != undefined && IsBulkUploadEnabled == true) {

												//alert(xlatService.xlat("IN-ER-LDP-003 :: Upload failed. Please try again"));
												navigator.notification.alert(xlatService.xlat("IN-ER-LDP-003 :: Upload failed. Please try again"), ['OK'], "");
											}
											OneViewConsole.Info("Upload failed local", "UploadBO.AutoUpload");
											_oOneViewSqlitePlugin.Rollback();
											IsSuccess = false;

										}
									}
									else {
										_oOneViewAutoUploadPlugin.Stop();
										oOneViewProgressbar.Stop();
										if (IsBulkUploadEnabled != undefined && IsBulkUploadEnabled == true) {

											//alert(xlatService.xlat("IN-ER-MAU-001 :: Server error please contact Administrator"));
											navigator.notification.alert(xlatService.xlat("IN-ER-MAU-001 :: Server error please contact Administrator"), ['OK'], "");
										}
										OneViewConsole.Info("Upload failed", "UploadBO.AutoUpload");
										IsSuccess = false;

									}
								}
								else {
									_oOneViewAutoUploadPlugin.Stop();
									oOneViewProgressbar.Stop();
									if (IsBulkUploadEnabled != undefined && IsBulkUploadEnabled == true) {

										//navigator.notification.alert(xlatService.xlat("IN-IN-LDP-001 :: No data available for Upload"), ['OK'], "");
										navigator.notification.alert(xlatService.xlat("IN-IN-LDP-001 :: No data available for Upload"), ['OK'], "");
									}
									OneViewConsole.Info("No dc available", "UploadBO.AutoUpload");
								}
							}
							else {
								_oOneViewAutoUploadPlugin.Stop();
								oOneViewProgressbar.Stop();
								if (IsBulkUploadEnabled != undefined && IsBulkUploadEnabled == true) {

									//alert(xlatService.xlat("IN-ER-MAU-001 :: Server error please contact Administrator"));
									navigator.notification.alert(xlatService.xlat("IN-ER-MAU-001 :: Server error please contact Administrator"), ['OK'], "");
								}
								OneViewConsole.Info("Upload failed", "UploadBO.AutoUpload");
								IsSuccess = false;
							}
						}

						OneViewConsole.Debug("AutoUpload end", "UploadBO.AutoUpload");
					}
					oOneViewProgressbar.Stop();
				});
			}
			else {
				if (IsBulkUploadEnabled != undefined && IsBulkUploadEnabled == true) {
					navigator.notification.alert(xlatService.xlat("IN-IN-LDP-001 :: No data available for Upload"), ['OK'], "");
				}
				var _oOneViewAutoUploadPlugin = new OneViewAutoUploadPlugin();
				_oOneViewAutoUploadPlugin.Stop();
				OneViewConsole.Info("No dc available", "UploadBO.AutoUpload");
			}

			Response.IsSuccess = IsSuccess;
			Response.DCCount = DcCount;
			return Response;
		}

		catch (Excep) {
			//alert("Excep : " + Excep + JSON.stringify(Excep));
			_oOneViewAutoUploadPlugin.Stop();
			IsBulkUploadEnabled = false;
			oOneViewExceptionHandler.Create("BO", "UploadBO.AutoUpload", Excep);
			return false;
		}

		finally {
			IsSuccess = null;
			IsSyncDynamicRcoAndAssetNodesSuccess = null;
			_oDcDAO = null;
			DataCaptureDTOLst = null;
			DynamicRCOData = null;
			DynamicOrgAssetNodeData = null;
			MultiMediaBlobSubElementLst = null;
			_oActionDAO = null;
			ActionResponse = null;
			oUploadrequest = null;
			_UploadDcIL = null;
			oUploadResponse = null;
			IsBulkUploadEnabled = false;
		}
	}

	/// <summary>
	/// Save_Uploaded_DcResponse
	/// </summary>
	/// <param name="DCSyncStatusDTOlst">DCSyncStatusDTOlst</param>
	var Save_Uploaded_DcResponse = function (DCSyncStatusDTOlst) {

		try {
			OneViewConsole.Debug("Save_Uploaded_DcResponse start", "UploadBO.Save_Uploaded_DcResponse");

			for (var i = 0; i < DCSyncStatusDTOlst.length; i++) {
				UploadedDcResponseLst.push(DCSyncStatusDTOlst[i]);
			}

			OneViewConsole.Debug("Save_Uploaded_DcResponse end", "UploadBO.Save_Uploaded_DcResponse");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.Save_Uploaded_DcResponse", Excep);
		}
		finally {
			_oDcDAO = null;
		}
	}

	/// <summary>
	/// Get_Uploaded_Dc_Validation_Summary
	/// </summary>
	var Update_Uploaded_Dc_Validation_Summary = function () {

		try {
			OneViewConsole.Debug("Update_Uploaded_Dc_Validation_Summary start", "UploadBO.Update_Uploaded_Dc_Validation_Summary");

			var ValidationMessage = '';
			var Response = Get_Uploaded_Dc_Validation_Summary();

			if (Response.ValidationFailedRecordsCount > 0) {
				ValidationMessage += "\n" + xlatService.xlat('Validation Failed Records') + " : " + Response.ValidationFailedRecordsCount + "\n";
				ValidationMessage += Response.ValidationSummary;
			}

			return ValidationMessage;

			OneViewConsole.Debug("Update_Uploaded_Dc_Validation_Summary end", "UploadBO.Update_Uploaded_Dc_Validation_Summary");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.Update_Uploaded_Dc_Validation_Summary", Excep);
		}
		finally {
			_oDcDAO = null;
		}
	}

	/// <summary>
	/// Get_Uploaded_Dc_Validation_Summary
	/// </summary>
	var Get_Uploaded_Dc_Validation_Summary = function () {

		try {
			OneViewConsole.Debug("Get_Uploaded_Dc_Validation_Summary start", "UploadBO.Get_Uploaded_Dc_Validation_Summary");

			var Response = {
				ValidationFailedRecordsCount: 0,
				ValidationSummary: "\n\n**** Validation Summary ****\n"
			};

			for (var i = 0; i < UploadedDcResponseLst.length; i++) {

				if (UploadedDcResponseLst[i].ValidationStatus == 4) {

					Response.ValidationFailedRecordsCount++;

					Response.ValidationSummary += "\n\n" + UploadedDcResponseLst[i].ServerDCDocId + " : " + UploadedDcResponseLst[i].ValidationMessage;
				}
			}

			OneViewConsole.Debug("Get_Uploaded_Dc_Validation_Summary end", "UploadBO.Get_Uploaded_Dc_Validation_Summary");

			return Response;
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.Get_Uploaded_Dc_Validation_Summary", Excep);
		}
		finally {
			_oDcDAO = null;
		}
	}

	var ProgressBarStatus = function (IsBulkUploadEnabled ,Meassage) {
		try {
			OneViewConsole.Debug("ProgressBarStatus start", "UploadBO.ProgressBarStatus");

			if (IsBulkUploadEnabled!=undefined && IsBulkUploadEnabled == true) {
				oOneViewProgressbar.SetProgressValue(Meassage);
			}

			OneViewConsole.Debug("ProgressBarStatus end", "UploadBO.ProgressBarStatus");
		}
		catch (Excep) {
			//alert("Excep : " + JSON.stringify(Excep) + Excep)
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.ProgressBarStatus", Excep);
		}
	}

	var ExecuteGarbageCollector = function () {
			try {
				OneViewConsole.Debug("ExecuteGarbageCollector start", "UploadBO.ExecuteGarbageCollector");

		   
				var _oDcDAO = new DcDAO();
				DcPlaceIdTemplateIdList = _oDcDAO.GetDcPlaceIdTemplateId(OneViewSessionStorage.Get("LoginUserId"), OneViewSessionStorage.Get("ServiceId"));
				var _oDcDeletion = new DcDeletion();
			 
			   
				for (var i = 0; i < DcPlaceIdTemplateIdList.length; i++) {
					var TemplateId = DcPlaceIdTemplateIdList[i].TemplateId;
					var DcPlaceId =DcPlaceIdTemplateIdList[i].DcPlaceId;
					//alert("TemplateId1 : " + TemplateId + " DcPlaceId1 : " + DcPlaceId);
					_oDcDeletion.DeleteCompleteAndSyncedData(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
					_oDcDeletion.DeleteInCompleteAndSyncedData(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
					_oDcDeletion.DeleteInCompleteAndSyncedDataInDays(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
					_oDcDeletion.DeleteInCompleteAndSyncedDataFromNow(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
					_oDcDeletion.DeleteCompletedSyncAndApprovedData(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
					_oDcDeletion.DeleteCompletedSyncAndOnDeviceApprovalFinishedData(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
					if (OneViewSessionStorage.Get("ServiceId") == 39) {
						_oDcDeletion.DeleteInActivePurchaseOrder(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
						_oDcDeletion.DeleteItemCompletedorInActiveInPurchaseOrder(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
						_oDcDeletion.DeleteCompletedItemInPurchaseOrder(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
					}
					_oDcDeletion.DeleteExpiredOrderItems(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
					_oDcDeletion.DeleteCompletedItemFromWorkOrder(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
					_oDcDeletion.DeleteExpiredItemFromWorkOrder(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);



					if (OneViewSessionStorage.Get("ServiceId") == 51) {
						_oDcDeletion.DeleteCompletedItemForFlightPreparation(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
						_oDcDeletion.DeleteExpiredItemForFlightPreparation(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
					}
					else if (OneViewSessionStorage.Get("ServiceId") == 52) {
						_oDcDeletion.DeleteCompletedItemForASOWorkOrder(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
						_oDcDeletion.DeleteExpiredItemForASOWorkOrder(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
					}
					else if (OneViewSessionStorage.Get("ServiceId") == 61) {
						_oDcDeletion.DeleteCompletedItemFromRFLWorkOrder(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
						_oDcDeletion.DeleteExpiredItemFromRFLWorkOrder(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
					   
					}
				}

				OneViewConsole.Debug("ExecuteGarbageCollector end", "UploadBO.ExecuteGarbageCollector");
			}
			catch (Excep) {
				//alert("Excep : " + JSON.stringify(Excep) + Excep)
				throw oOneViewExceptionHandler.Create("BO", "UploadBO.ExecuteGarbageCollector", Excep);
			}
		}


	var DownloadActionFollowUp = function (xlatService) {

		try {
			OneViewConsole.Debug("DownloadActionFollowUp start", "UploadBO.DownloadActionFollowUp");

			if (OneViewLocalStorage.Get("IsAutoActionFollowupDownloadEnabled") == true || OneViewLocalStorage.Get("IsAutoActionFollowupDownloadEnabled") == 'true') {

				var FilterParams = {
					OSGuid: OneViewSessionStorage.Get("ServiceId"),
					UserId: OneViewSessionStorage.Get("LoginUserId"),
					TemplateId: [],
					FromDate: '',
					ToDate: '',
					DcPlaceDimension: 0,
					DcPlaceIds: []
				}

				var _oActionFollowUpDownloadFacade = new ActionFollowUpDownloadFacade();
				_oActionFollowUpDownloadFacade.DefaultProfiledownload(FilterParams, xlatService);
			}

			OneViewConsole.Debug("DownloadActionFollowUp end", "UploadBO.DownloadActionFollowUp");
		}
		catch (Excep) {
		}
		finally {
		}
	}

	this.DownlaodActionFollowUpDetails = function (Req) {

		try {
			OneViewConsole.Debug("DownlaodActionFollowUpDetails start", "DasboardBO.DownlaodActionFollowUpDetails");

			var _oValidateActionFollowUpBeforeNewDC = new ValidateActionFollowUpBeforeNewDCHandler(xlatService);
			_oValidateActionFollowUpBeforeNewDC.DownlaodActionFollowUpDetails(Req);

			OneViewConsole.Debug("DownlaodActionFollowUpDetails end", "DasboardBO.DownlaodActionFollowUpDetails");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "DasboardBO.DownlaodActionFollowUpDetails", Excep);
		}
		finally {
		}
	}

	this.DownlaodExcludedAttributeDetails = function (FilterParamUpload) {
		try {
			OneViewConsole.Debug("DownlaodExcludedAttributeDetails start", "DasboardBO.DownlaodExcludedAttributeDetails");

			var FilterParams = {
				OSGuid: FilterParamUpload.ServiceId,
				UserId: FilterParamUpload.SystemUserId,
				TemplateId: [],
				FromDate: '',
				ToDate: '',
				DcPlaceDimension: 16,
				DcPlaceIds: [],
				IsDCPlaceGroup: false,
				IsTemplateGroup: false,
				IsOnDeviceApprovalProfileNeeded: false,
				DCPlaceRCOType: -1
			}

			FilterParams.TemplateId.push(FilterParamUpload.TemplateNodeId);
			FilterParams.DcPlaceIds.push(FilterParamUpload.DcPlaceId);
			FilterParams.IsDCPlaceGroup = FilterParamUpload.IsDCPlaceGroup;
			FilterParams.IsTemplateGroup = FilterParamUpload.IsTemplateGroup;

			var _oProfileDownloadFacade = new ProfileDownloadFacade();
			_oProfileDownloadFacade.DownloadExcludedAttributeMetadata(FilterParams);


			OneViewConsole.Debug("DownlaodExcludedAttributeDetails end", "DasboardBO.DownlaodExcludedAttributeDetails");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "DasboardBO.DownlaodExcludedAttributeDetails", Excep);
		}
		finally {
		}
	}

	/// <summary>
	/// SyncDynamicRcoAndAssetNodes
	/// </summary>
	/// <param name="IsUpload">true or false</param>  (true => for upload, false => for profile download)
	this.SyncDynamicRcoAndAssetNodes = function (IsUpload, ShowExceptionMessage) {

		try {
			OneViewConsole.Debug("SyncDynamicRcoAndAssetNodes start", "UploadBO.SyncDynamicRcoAndAssetNodes");

			var IsSuccess = true;

			var _oOneViewSqlitePlugin = new OneViewSqlitePlugin();

			Update_UnSync_RcoProcessCount();
			var DynamicRCOData = GetAll_UnSync_DynamicRco();

			if (IsUpload == false || (IsUpload == true && DynamicRCOData.length > 0)) {

				Update_UnSync_AssetNodeProcessCount();
				var DynamicOrgAssetNodeData = GetAll_UnSync_DynamicAssetNode();

				Update_UnSync_OrgAssetNodeRCOSpecialMappingProcessCount();
				var OrgAssetNodeRCOSpecialMappingData = GetAll_UnSync_OrgAssetNodeRCOSpecialMapping();

				//alert(OrgAssetNodeRCOSpecialMappingData.length);

				var OrgAssetNodeData = GetAll_AssetNode();

				if (OrgAssetNodeData.length > 0 || OrgAssetNodeRCOSpecialMappingData.length > 0) {

					var DynamicRcoAndAssetNodesRequest = MakeSyncDynamicRcoAndAssetNodesRequest(DynamicRCOData, DynamicOrgAssetNodeData, OrgAssetNodeData, OrgAssetNodeRCOSpecialMappingData);
					//alert(JSON.stringify(DynamicRcoAndAssetNodesRequest));

					var _UploadDcIL = new UploadDcIL(toaster);
					var oUploadResponse = _UploadDcIL.SyncDynamicRcoAndAssetNodes(DynamicRcoAndAssetNodesRequest, ShowExceptionMessage);

					//alert(JSON.stringify(oUploadResponse));
					//alert(oUploadResponse.IsAnyException);
					//alert(oUploadResponse.ExceptionMessage);
					//alert(oUploadResponse.DynamicRCOData.length);
					//alert(oUploadResponse.DynamicOrgAssetNodeData.length);
					//alert(oUploadResponse.OrgAssetNodeData.length);
					//alert(oUploadResponse.OrgAssetNodeRCOSpecialMappingData.length);

					if (oUploadResponse != null && oUploadResponse.IsAnyException == false) {

						try {
							_oOneViewSqlitePlugin.StartTransaction();

							Update_DynamicRcoAndAssetNodes_Response(oUploadResponse);

							_oOneViewSqlitePlugin.EndTransaction();
						}
						catch (Excep) {
							OneViewConsole.Error("Sync Dynamic Rco And AssetNodes failed local", "UploadBO.SyncDynamicRcoAndAssetNodes");
							IsSuccess = false;
							_oOneViewSqlitePlugin.Rollback();
						}
					}
					else {
						IsSuccess = (oUploadResponse != null) ? false : oUploadResponse;
					}
				}
			}

			OneViewConsole.Debug("SyncDynamicRcoAndAssetNodes end", "UploadBO.SyncDynamicRcoAndAssetNodes");

			return IsSuccess;
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.SyncDynamicRcoAndAssetNodes", Excep);
			return false;
		}
		finally {
			IsSuccess = null;
			_oOneViewSqlitePlugin = null;
			DynamicRCOData = null;
			DynamicOrgAssetNodeData = null;
			OrgAssetNodeData = null;
			DynamicRcoAndAssetNodesRequest = null;
			_UploadDcIL = null;
			oUploadResponse = null;
		}
	}


	/// <summary>
	/// Update_UnSync_DC_ProcessCount
	/// </summary>
	var Update_UnSync_DC_ProcessCount = function () {

		try {
			OneViewConsole.Debug("Update_UnSync_DC_ProcessCount start", "UploadDcFacade.Update_UnSync_DC_ProcessCount");

			// Update ProcessCount in DataCaptureEntity
			new DefaultMasterDAO("DataCaptureEntity").UpdateProcessCountForUnsyncData();

			// Update ProcessCount in DcResultsEntity
			new DefaultMasterDAO("DcResultsEntity").UpdateProcessCountForUnsyncData();

			// Update ProcessCount in DcResultDetailsEntity
			new DefaultMasterDAO("DcResultDetailsEntity").UpdateProcessCountForUnsyncData();

			OneViewConsole.Debug("Update_UnSync_DC_ProcessCount end", "UploadDcFacade.Update_UnSync_DC_ProcessCount");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.Update_UnSync_DC_ProcessCount", Excep);
		}
	}


	/// <summary>
	/// Update_UnSync_RcoProcessCount
	/// </summary>
	var Update_UnSync_RcoProcessCount = function () {

		try {
			OneViewConsole.Debug("Update_UnSync_RcoProcessCount start", "UploadBO.Update_UnSync_RcoProcessCount");

			// Update ProcessCount in RcoMasterEntity
			new DefaultMasterDAO("RcoMasterEntity").UpdateProcessCountForUnsyncData();

			OneViewConsole.Debug("Update_UnSync_RcoProcessCount end", "UploadBO.Update_UnSync_RcoProcessCount");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.Update_UnSync_RcoProcessCount", Excep);
		}
	}


	/// <summary>
	/// Update_UnSync_AssetNodeProcessCount
	/// </summary>
	var Update_UnSync_AssetNodeProcessCount = function () {

		try {
			OneViewConsole.Debug("Update_UnSync_AssetNodeProcessCount start", "UploadBO.Update_UnSync_AssetNodeProcessCount");

			// Update ProcessCount in OrganizationAssetsNode
			new DefaultMasterDAO("OrganizationAssetsNode").UpdateProcessCountForUnsyncData();

			OneViewConsole.Debug("Update_UnSync_AssetNodeProcessCount end", "UploadBO.Update_UnSync_AssetNodeProcessCount");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.Update_UnSync_AssetNodeProcessCount", Excep);
		}
	}


	/// <summary>
	/// Update_UnSync_OrgAssetNodeRCOSpecialMappingProcessCount
	/// </summary>
	var Update_UnSync_OrgAssetNodeRCOSpecialMappingProcessCount = function () {

		try {
			OneViewConsole.Debug("Update_UnSync_OrgAssetNodeRCOSpecialMappingProcessCount start", "UploadBO.Update_UnSync_OrgAssetNodeRCOSpecialMappingProcessCount");

			// Update ProcessCount in OrganizationAssetsNodeRCOSpecialMapping
			new DefaultMasterDAO("OrganizationAssetsNodeRCOSpecialMapping").UpdateProcessCountForUnsyncData();

			OneViewConsole.Debug("Update_UnSync_OrgAssetNodeRCOSpecialMappingProcessCount end", "UploadBO.Update_UnSync_OrgAssetNodeRCOSpecialMappingProcessCount");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.Update_UnSync_OrgAssetNodeRCOSpecialMappingProcessCount", Excep);
		}
	}


	/// <summary>
	/// Update_UnSync_MultiMediaBlobSubElementsProcessCount
	/// </summary>
	var Update_UnSync_MultiMediaBlobSubElementsProcessCount = function () {

		try {
			OneViewConsole.Debug("Update_UnSync_MultiMediaBlobSubElementsProcessCount start", "UploadBO.Update_UnSync_MultiMediaBlobSubElementsProcessCount");

			// Update ProcessCount in MultiMediaBlobSubElements
			new MultiMediaBlobSubElementsDAO().UpdateProcessCountForUnSyncData();

			OneViewConsole.Debug("Update_UnSync_MultiMediaBlobSubElementsProcessCount end", "UploadBO.Update_UnSync_MultiMediaBlobSubElementsProcessCount");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.Update_UnSync_MultiMediaBlobSubElementsProcessCount", Excep);
		}
	}


	/// <summary>
	/// Update_UnSync_MultiMediaSubElementsProcessCount
	/// </summary>
	var Update_UnSync_MultiMediaSubElementsProcessCount = function () {

		try {
			OneViewConsole.Debug("Update_UnSync_MultiMediaSubElementsProcessCount start", "UploadBO.Update_UnSync_MultiMediaSubElementsProcessCount");

			// Update ProcessCount in MultiMediaSubElements
			new DefaultMasterDAO("MultiMediaSubElements").UpdateProcessCountForUnsyncData();

			OneViewConsole.Debug("Update_UnSync_MultiMediaSubElementsProcessCount end", "UploadBO.Update_UnSync_MultiMediaSubElementsProcessCount");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.Update_UnSync_MultiMediaSubElementsProcessCount", Excep);
		}
	}

	/// <summary>
	/// Update_UnSync_AuditTrailDC
	/// </summary>
	var Update_UnSync_AuditTrailDC = function () {

		try {
			OneViewConsole.Debug("Update_UnSync_AuditTrailDC start", "UploadBO.Update_UnSync_AuditTrailDC");

			// Update ProcessCount in DcResultDetailsHistory
			new DefaultMasterDAO("DcResultDetailsHistory").UpdateProcessCountForUnsyncData();

			OneViewConsole.Debug("Update_UnSync_AuditTrailDC end", "UploadBO.Update_UnSync_AuditTrailDC");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.Update_UnSync_AuditTrailDC", Excep);
		}
	}


	/// <summary>
	/// GetAll_UnSync_DynamicRco
	/// </summary>
	var GetAll_UnSync_DynamicRco = function () {

		try {
			OneViewConsole.Debug("GetAll_UnSync_DynamicRco start", "UploadBO.GetAll_UnSync_DynamicRco");

			// Get all dynamic rco's
			var DynamicRcoList = new DefaultMasterDAO("RcoMasterEntity").GetAllUnSyncMasters();

			OneViewConsole.Debug("GetAll_UnSync_DynamicRco end", "UploadBO.GetAll_UnSync_DynamicRco");

			return DynamicRcoList;
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.GetAll_UnSync_DynamicRco", Excep);
		}
		finally {
			DynamicRcoList = null;
		}
	}


	/// <summary>
	/// GetAll_UnSync_DynamicAssetNode
	/// </summary>
	var GetAll_UnSync_DynamicAssetNode = function () {

		try {
			OneViewConsole.Debug("GetAll_UnSync_DynamicAssetNode start", "UploadBO.GetAll_UnSync_DynamicAssetNode");

			// Get all dynamic org asset nodes
			var DynamicAssetList = new DefaultMasterDAO("OrganizationAssetsNode").GetAllUnSyncMasters();

			OneViewConsole.Debug("GetAll_UnSync_DynamicAssetNode end", "UploadBO.GetAll_UnSync_DynamicAssetNode");

			return DynamicAssetList;
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.GetAll_UnSync_DynamicAssetNode", Excep);
		}
		finally {
			DynamicAssetList = null;
		}
	}


	/// <summary>
	/// GetAll_UnSync_OrgAssetNodeRCOSpecialMapping
	/// </summary>
	var GetAll_UnSync_OrgAssetNodeRCOSpecialMapping = function () {

		try {
			OneViewConsole.Debug("GetAll_UnSync_OrgAssetNodeRCOSpecialMapping start", "UploadBO.GetAll_UnSync_OrgAssetNodeRCOSpecialMapping");

			// Get all dynamic org asset nodes
			var DynamicAssetList = new DefaultMasterDAO("OrganizationAssetsNodeRCOSpecialMapping").GetAllUnSyncMasters();

			OneViewConsole.Debug("GetAll_UnSync_OrgAssetNodeRCOSpecialMapping end", "UploadBO.GetAll_UnSync_OrgAssetNodeRCOSpecialMapping");

			return DynamicAssetList;
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.GetAll_UnSync_OrgAssetNodeRCOSpecialMapping", Excep);
		}
		finally {
			DynamicAssetList = null;
		}
	}


	/// <summary>
	/// GetAll_AssetNode
	/// </summary>
	var GetAll_AssetNode = function () {

		try {
			OneViewConsole.Debug("GetAll_AssetNode start", "UploadBO.GetAll_AssetNode");

			// Get all org asset nodes
			var AssetList = new DefaultMasterDAO("OrganizationAssetsNode").GetAllMasters();

			OneViewConsole.Debug("GetAll_AssetNode end", "UploadBO.GetAll_AssetNode");

			return AssetList;
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.GetAll_AssetNode", Excep);
		}
		finally {
			AssetList = null;
		}
	}


	/// <summary>
	/// GetAll_UnSync_MultiMediaBlobSubElements
	/// </summary>
	var GetAll_UnSync_MultiMediaBlobSubElements = function () {

		try {
			OneViewConsole.Debug("GetAll_UnSync_MultiMediaBlobSubElements start", "UploadBO.GetAll_UnSync_MultiMediaBlobSubElements");

			// Get all un-sync MultiMediaBlobSubElements
			var MultiMediaBlobSubElementsList = new MultiMediaBlobSubElementsDAO().GetAll_UnSync_MultiMediaBlobSubElements();

			OneViewConsole.Debug("GetAll_UnSync_MultiMediaBlobSubElements end", "UploadBO.GetAll_UnSync_MultiMediaBlobSubElements");

			return MultiMediaBlobSubElementsList;
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.GetAll_UnSync_MultiMediaBlobSubElements", Excep);
		}
		finally {
			MultiMediaBlobSubElementsList = null;
		}
	}

	/// <summary>
	/// GetAll_UnSync_MultiMediaSubElements
	/// </summary>
	var GetAll_UnSync_MultiMediaSubElements = function () {

		try {
			OneViewConsole.Debug("GetAll_UnSync_MultiMediaSubElements start", "UploadBO.GetAll_UnSync_MultiMediaSubElements");

			// Get all un-sync GetAll_UnSync_MultiMediaSubElements
			var MultiMediaSubElementsList = new DefaultMasterDAO("MultiMediaSubElements").GetAllUnSyncMasters();

			OneViewConsole.Debug("GetAll_UnSync_MultiMediaSubElements end", "UploadBO.GetAll_UnSync_MultiMediaSubElements");

			return MultiMediaSubElementsList;
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.GetAll_UnSync_MultiMediaSubElements", Excep);
		}
		finally {
			MultiMediaSubElementsList = null;
		}
	}

	/// <summary>
	/// GetAll_UnSync_AuditTrailDC
	/// </summary>
	var GetAll_UnSync_AuditTrailDC = function () {

		try {
			OneViewConsole.Debug("GetAll_UnSync_AuditTrailDC start", "UploadBO.GetAll_UnSync_AuditTrailDC");

			// Get all un-sync DcResultDetailsHistory
			//var DcResultDetailsHistoryList = new DefaultMasterDAO("DcResultDetailsHistory").GetAllUnSyncMasters();
			var DcResultDetailsHistoryList = new Array(); // Need to remove

			OneViewConsole.Debug("GetAll_UnSync_AuditTrailDC end", "UploadBO.GetAll_UnSync_AuditTrailDC");

			return DcResultDetailsHistoryList;
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.GetAll_UnSync_AuditTrailDC", Excep);
		}
		finally {
			DcResultDetailsHistoryList = null;
		}
	}


	/// <summary>
	/// Update_Upload_Response
	/// </summary>
	/// <param name="oUploadResponse">oUploadResponse</param>
	var Update_Upload_Response = function (oUploadResponse) {

		try {
			OneViewConsole.Debug("Update_Upload_Response start", "UploadBO.Update_Upload_Response");
			Update_Uploaded_Rco_Response(oUploadResponse.DCResponseDTO.DynamicRCOData);
			Update_Uploaded_AssetNode_Response(oUploadResponse.DCResponseDTO.DynamicOrgAssetNodeLst);
			Update_Uploaded_Dc_Response(oUploadResponse.DCResponseDTO.DCSyncStatusDTOlst);
			Update_Dynamic_Answers(oUploadResponse.DCResponseDTO.DynamicOrgAssetNodeLst);
			Update_MultiMediaBlobSubElements_Response(oUploadResponse.DCResponseDTO.MultiMediaBlobSubElementResponceLst);
			Update_MultiMediaSubElements_Response(oUploadResponse.DCResponseDTO.MultiMediaMappingResponceLst);
			if (oUploadResponse.ActionResponseDTO != null) {
				Update_Action_Response(oUploadResponse.ActionResponseDTO);
			}
			if (oUploadResponse.HistoryResponceDTO != null) {
				Update_AuditTrail_Response(oUploadResponse.HistoryResponceDTO.DCHistoryResponceLst);
			}
			if (oUploadResponse.DCBlockerInfoResponceDTO != null) {
				Update_DCBlockerInfo_Response(oUploadResponse.DCBlockerInfoResponceDTO.DCBlockerInfoResponceLst)
			}
			if (oUploadResponse.DCApprovalInfoResponceDTO != null) {
				Update_DcApprovalInfo_Response(oUploadResponse.DCApprovalInfoResponceDTO.DcApprovalInfoResponceLst)
			}

			OneViewConsole.Debug("Update_Upload_Response end", "UploadBO.Update_Upload_Response");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.Update_Upload_Response", Excep);
		}
	}


	/// <summary>
	/// Update_Uploaded_Rco_Response
	/// </summary>
	/// <param name="DynamicRCOResponse">oUploadResponse</param>
	var Update_Uploaded_Rco_Response = function (DynamicRCOResponse) {

		try {
			OneViewConsole.Debug("Update_Uploaded_Rco_Response start", "UploadBO.Update_Uploaded_Rco_Response");

			// Update server id's in RcoMasterEntity (For dynamic rco's)
			if (DynamicRCOResponse.length != 0) {
				var oDefaultRcoMasterDAO = new DefaultMasterDAO("RcoMasterEntity");
				oDefaultRcoMasterDAO.UpdateMasterServerIds(DynamicRCOResponse);
			}

			OneViewConsole.Debug("Update_Uploaded_Rco_Response end", "UploadBO.Update_Uploaded_Rco_Response");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.Update_Uploaded_Rco_Response", Excep);
		}
		finally {
			oDefaultRcoMasterDAO = null;
		}
	}


	/// <summary>
	/// Update_Uploaded_AssetNode_Response
	/// </summary>
	/// <param name="DynamicAssetNodeResponse">DynamicAssetNodeResponse</param>
	var Update_Uploaded_AssetNode_Response = function (DynamicAssetNodeResponse) {

		try {
			OneViewConsole.Debug("Update_Uploaded_AssetNode_Response start", "UploadBO.Update_Uploaded_AssetNode_Response");

			// Update server id's in OrganizationAssetsNode (For dynamic OrganizationAssetsNode's)
			if (DynamicAssetNodeResponse.length != 0) {
				var oDefaultOrgAssetNodeDAO = new DefaultMasterDAO("OrganizationAssetsNode");
				oDefaultOrgAssetNodeDAO.UpdateNodeServerIds(DynamicAssetNodeResponse);
			}

			OneViewConsole.Debug("Update_Uploaded_AssetNode_Response end", "UploadBO.Update_Uploaded_AssetNode_Response");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.Update_Uploaded_AssetNode_Response", Excep);
		}
		finally {
			oDefaultOrgAssetNodeDAO = null;
		}
	}


	/// <summary>
	/// Update_DynamicRcoAndAssetNodes_Response
	/// </summary>
	/// <param name="oUploadResponse">oUploadResponse</param>
	var Update_DynamicRcoAndAssetNodes_Response = function (oUploadResponse) {

		try {
			OneViewConsole.Debug("Update_DynamicRcoAndAssetNodes_Response start", "UploadBO.Update_DynamicRcoAndAssetNodes_Response");

			Update_Uploaded_Rco_Response(oUploadResponse.DynamicRCOData);
			Update_Uploaded_AssetNode_Response(oUploadResponse.DynamicOrgAssetNodeData);
			Update_Dynamic_Answers(oUploadResponse.DynamicOrgAssetNodeData, oUploadResponse.OrgAssetNodeRCOSpecialMappingData);
			Update_AssetNode_Tree(oUploadResponse.OrgAssetNodeData);
			Update_OrganizationAssetsNodeRCOSpecialMapping(oUploadResponse.OrgAssetNodeRCOSpecialMappingData);

			OneViewConsole.Debug("Update_DynamicRcoAndAssetNodes_Response end", "UploadBO.Update_DynamicRcoAndAssetNodes_Response");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.Update_DynamicRcoAndAssetNodes_Response", Excep);
		}
	}


	/// <summary>
	/// Update_AssetNode_Tree
	/// </summary>
	/// <param name="OrgAssetNodeLst">OrgAssetNodeLst</param>
	var Update_AssetNode_Tree = function (OrgAssetNodeLst) {

		try {
			OneViewConsole.Debug("Update_AssetNode_Tree start", "UploadBO.Update_AssetNode_Tree");

			var _oDcProfileDAO = new DcProfileDAO();
			var _oActionFollowUpDAO = new ActionFollowUpDAO();
			var _oDefaultTreeDAO = new DefaultTreeDAO();

			var DuplicateCheckDic = _oDefaultTreeDAO.GetAllInfoWithServerIdDict("OrganizationAssetsNode");

			var _oOrganizationAssetsNodeDAO = new OrganizationAssetsNodeDAO();
			_oOrganizationAssetsNodeDAO.Update_AssetNode_Tree(OrgAssetNodeLst);

			for (var i = 0; i < OrgAssetNodeLst.length; i++) {

				// If its OrganizationAssetsNode and Name mismatch
				if (DuplicateCheckDic[OrgAssetNodeLst[i].ServerId].ChildDbElementName != OrgAssetNodeLst[i].ChildDbElementName) {

					// Updating DcPlaceName in existing dc profiles
					_oDcProfileDAO.UpdateDcPlaceNameByDcPlaceId(OrgAssetNodeLst[i].ServerId, OrgAssetNodeLst[i].ChildDbElementName);

					// Updating DcPlaceName in existing action followup profiles
					_oActionFollowUpDAO.UpdateDcPlaceNameByDcPlaceId(OrgAssetNodeLst[i].ServerId, OrgAssetNodeLst[i].ChildDbElementName);
				}
			}

			OneViewConsole.Debug("Update_AssetNode_Tree end", "UploadBO.Update_AssetNode_Tree");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.Update_AssetNode_Tree", Excep);
		}
		finally {
			_oOrganizationAssetsNodeDAO = null;
		}
	}


	/// <summary>
	/// Update_OrganizationAssetsNodeRCOSpecialMapping
	/// </summary>
	/// <param name="OrgAssetNodeRCOSpecialMappingDataLst">OrgAssetNodeRCOSpecialMappingDataLst</param>
	var Update_OrganizationAssetsNodeRCOSpecialMapping = function (OrgAssetNodeRCOSpecialMappingDataLst) {

		try {
			OneViewConsole.Debug("Update_OrganizationAssetsNodeRCOSpecialMapping start", "UploadBO.Update_OrganizationAssetsNodeRCOSpecialMapping");

			var _oOrganizationAssetsNodeRCOSpecialMappingDAO = new OrganizationAssetsNodeRCOSpecialMappingDAO();
			_oOrganizationAssetsNodeRCOSpecialMappingDAO.Update_Mapping(OrgAssetNodeRCOSpecialMappingDataLst);

			OneViewConsole.Debug("Update_OrganizationAssetsNodeRCOSpecialMapping end", "UploadBO.Update_OrganizationAssetsNodeRCOSpecialMapping");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.Update_OrganizationAssetsNodeRCOSpecialMapping", Excep);
		}
		finally {
			_oOrganizationAssetsNodeDAO = null;
		}
	}


	/// <summary>
	/// Update_Uploaded_Dc_Response
	/// </summary>
	/// <param name="DcResponse">DcResponse</param>
	var Update_Uploaded_Dc_Response = function (DcResponse) {

		try {
			OneViewConsole.Debug("Update_Uploaded_Dc_Response start", "UploadBO.Update_Uploaded_Dc_Response");

			// Update server id's in DataCaptureEntity
			if (DcResponse.length != 0) {
				var _oDcDAO = new DcDAO();
				_oDcDAO.UpdateDc(DcResponse);
			}

			OneViewConsole.Debug("Update_Uploaded_Dc_Response end", "UploadBO.Update_Uploaded_Dc_Response");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.Update_Uploaded_Dc_Response", Excep);
		}
		finally {
			_oDcDAO = null;
		}
	}


	/// <summary>
	/// Update_DcApprovalInfo_Response
	/// </summary>
	/// <param name="DcResponse">DcResponse</param>
	var Update_DcApprovalInfo_Response = function (DcApprovalInfoResponse) {

		try {
			OneViewConsole.Debug("Update_DcApprovalInfo_Response start", "UploadBO.Update_DcApprovalInfo_Response");

			// Update server id's in DataCaptureEntity
			if (DcApprovalInfoResponse.length != 0) {
				var _oDcApprovalDAO = new DcApprovalDAO();
				_oDcApprovalDAO.UpdateDcApprovalInfo(DcApprovalInfoResponse);
			}

			OneViewConsole.Debug("Update_DcApprovalInfo_Response end", "UploadBO.Update_DcApprovalInfo_Response");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.Update_DcApprovalInfo_Response", Excep);
		}
		finally {
			_oDcDAO = null;
		}
	}


	/// <summary>
	/// Update_Dynamic_Answers
	/// </summary>
	/// <param name="DynamicAnswers">DynamicAnswers</param>
	/// <param name="OrgAssetNodeRCOSpecialMappingData">OrgAssetNodeRCOSpecialMappingData</param>
	var Update_Dynamic_Answers = function (DynamicAnswers, OrgAssetNodeRCOSpecialMappingData) {

		try {
			OneViewConsole.Debug("Update_Dynamic_Answers start", "UploadBO.Update_Dynamic_Answers");

			// Dynamic answers updation in DataCaptureEntity

			//alert("Update_Dynamic_Answers : " + JSON.stringify(DynamicAnswers));
			var _oDcDAO = new DcDAO();

			if (DynamicAnswers.length != 0) {
				_oDcDAO.UpdateDynamicAnswers(DynamicAnswers);
			}

			if (OrgAssetNodeRCOSpecialMappingData != undefined && OrgAssetNodeRCOSpecialMappingData.length != 0) {
				_oDcDAO.UpdateDynamicAnswers(OrgAssetNodeRCOSpecialMappingData);
			}

			OneViewConsole.Debug("Update_Dynamic_Answers end", "UploadBO.Update_Dynamic_Answers");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.Update_Dynamic_Answers", Excep);
		}
		finally {
			_oDcDAO = null;
		}
	}


	/// <summary>
	/// Update_Action_Response
	/// </summary>
	/// <param name="ActionResponseDTO">ActionResponseDTO</param>
	var Update_Action_Response = function (ActionResponseDTO) {

		try {
			OneViewConsole.Debug("Update_Action_Response start", "UploadBO.Update_Action_Response");

			var _oActionBO = new ActionBO();
			_oActionBO.UpdateActionUploadResponse(ActionResponseDTO);

			OneViewConsole.Debug("Update_Action_Response end", "UploadBO.Update_Action_Response");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.Update_Action_Response", Excep);
		}
		finally {
			_oActionBO = null;
		}
	}


	/// <summary>
	/// Update_AuditTrail_Response
	/// </summary>
	/// <param name="DCHistoryResponceLst">DCHistoryResponceLst</param>
	var Update_AuditTrail_Response = function(DCHistoryResponceLst){

		try {
			OneViewConsole.Debug("Update_AuditTrail_Response start", "UploadBO.Update_AuditTrail_Response");

			// Date : 19-02-2015
			// Name : Siva
			// Once history uploaded it will delete from mobile (As per discussion with harshil)
			// Note : any requirement comming we have to change deletion to updation
			var oDefaultRcoMasterDAO = new DefaultMasterDAO("DcResultDetailsHistory");

			// Delete DcResultDetailsHistory by server id
			for (var i = 0; i < DCHistoryResponceLst.length; i++) {
				oDefaultRcoMasterDAO.DeleteById(DCHistoryResponceLst[i].Id);
			}

			OneViewConsole.Debug("Update_AuditTrail_Response end", "UploadBO.Update_AuditTrail_Response");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.Update_AuditTrail_Response", Excep);
		}
		finally {
			oDefaultRcoMasterDAO = null;
		}
	}


	/// <summary>
	///  Update_DCBlockerInfo_Response
	/// </summary>
	/// <param name="DCBlockerInfoResponse">DCBlockerInfoResponse</param>
	var Update_DCBlockerInfo_Response = function (DCBlockerInfoResponse) {

		try {
			OneViewConsole.Debug("Update_Uploaded_Rco_Response start", "UploadBO.Update_Uploaded_Rco_Response");

			// Update server id's in DCBlockerInfoResponse
			if (DCBlockerInfoResponse.length != 0) {
				var oDefaultRcoMasterDAO = new DefaultMasterDAO("DCBlockerInfoEntity");
				oDefaultRcoMasterDAO.UpdateMasterServerIds(DCBlockerInfoResponse);
			}

			OneViewConsole.Debug("Update_Uploaded_Rco_Response end", "UploadBO.Update_Uploaded_Rco_Response");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.Update_Uploaded_Rco_Response", Excep);
		}
		finally {
			oDefaultRcoMasterDAO = null;
		}
	}


	/// <summary>
	/// Update_MultiMediaBlobSubElements_Response
	/// </summary>
	/// <param name="MultiMediaBlobSubElementsResponseDTO">MultiMediaBlobSubElementsResponseDTO</param>
	var Update_MultiMediaBlobSubElements_Response = function (MultiMediaBlobSubElementsResponseDTO) {

		try {
			OneViewConsole.Debug("Update_MultiMediaBlobSubElements_Response start", "UploadBO.Update_MultiMediaBlobSubElements_Response");

			// Update server id's in MultiMediaBlobSubElements
			if (MultiMediaBlobSubElementsResponseDTO.length != 0) {
				var oDefaultRcoMasterDAO = new DefaultMasterDAO("MultiMediaBlobSubElements");
				oDefaultRcoMasterDAO.UpdateMasterServerIds(MultiMediaBlobSubElementsResponseDTO);
			}
			OneViewConsole.Debug("Update_MultiMediaBlobSubElements_Response end", "UploadBO.Update_MultiMediaBlobSubElements_Response");

		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.Update_MultiMediaBlobSubElements_Response", Excep);
		}
		finally {
			oDefaultRcoMasterDAO = null;
		}
	}


	/// <summary>
	/// Update_MultiMediaSubElements_Response
	/// </summary>
	/// <param name="MultiMediaSubElementsResponseDTO">MultiMediaSubElementsResponseDTO</param>
	var Update_MultiMediaSubElements_Response = function (MultiMediaSubElementsResponseDTO) {

		try {
			OneViewConsole.Debug("Update_MultiMediaSubElements_Response start", "UploadBO.Update_MultiMediaSubElements_Response");
			// alert(MultiMediaSubElementsResponseDTO.length);
			// Update server id's in MultiMediaBlobSubElements
			if (MultiMediaSubElementsResponseDTO.length != 0) {
				var oDefaultRcoMasterDAO = new DefaultMasterDAO("MultiMediaSubElements");
				oDefaultRcoMasterDAO.UpdateMasterServerIds(MultiMediaSubElementsResponseDTO);
			}
			OneViewConsole.Debug("Update_MultiMediaSubElements_Response end", "UploadBO.Update_MultiMediaSubElements_Response");

		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.Update_MultiMediaBlobSubElements_Response", Excep);
		}
		finally {
			oDefaultRcoMasterDAO = null;
		}
	}


	/// <summary>
	/// MakeUploadRequest
	/// </summary>
	/// <param name="DataCaptureDTOLst">DataCaptureDTOLst</param>
	/// <param name="DynamicRCOData">DynamicRCOData</param>
	/// <param name="DynamicOrgAssetNodeData">DynamicOrgAssetNodeData</param>
	/// <param name="ActionResponse">ActionResponse</param>
	/// <param name="MultiMediaBlobSubElementLst">MultiMediaBlobSubElementLst</param>
	/// <param name="AuditTrailDCLst">AuditTrailDCLst</param>
	var MakeUploadRequest = function (DataCaptureDTOLst, DynamicRCOData, DynamicOrgAssetNodeData, ActionResponse, MultiMediaBlobSubElementLst, AuditTrailDCLst, MultiMediaSubElementLst, DCBlockerInfoRequest, DcApprovalDTOLst) {

		try {
			OneViewConsole.Debug("MakeUploadRequest start", "UploadBO.MakeUploadRequest");

			var DcInfoList = {
				"DataCaptureDTOLst": DataCaptureDTOLst,
				"ActionDCDTOLst": (ActionResponse != null) ? ActionResponse.ActionDCDTOLst : new Array(),
				"DynamicRCOData": DynamicRCOData,
				"DynamicOrgAssetNodeData": DynamicOrgAssetNodeData,
				"DynamicOrgHiNodeData": new Array(),
				"DynamicTemplateNodeData": new Array(),
				"DynamicAttributeData": new Array(),
				"DynamicUserData": new Array(),
				"MultiMediaBlobSubElementLst": MultiMediaBlobSubElementLst,
				"MultiMediaMappingLst": MultiMediaSubElementLst,
			};

			var oUploadrequest = {
				"ActionRequest": (ActionResponse != null) ? ActionResponse.ActionInfoList : null,
				"DataCaptureRequest": DcInfoList,
				"HistoryRequest": {
					"DCHistoryDTOLst": AuditTrailDCLst
				},
				"DCBlockerInfoRequest": (DCBlockerInfoRequest != undefined) ? DCBlockerInfoRequest : null,
				"DcApprovalInfoRequest": {
					"DcApprovalDTOLst": DcApprovalDTOLst
				}
			}

			OneViewConsole.Debug("MakeUploadRequest end", "UploadBO.MakeUploadRequest");

			return oUploadrequest;
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.MakeUploadRequest", Excep);
		}
		finally {
			DcInfoList = null;
			oUploadrequest = null;
		}
	}


	/// <summary>
	/// MakeSyncDynamicRcoAndAssetNodesRequest
	/// </summary>
	/// <param name="DynamicRCOData">DynamicRCOData</param>
	/// <param name="DynamicOrgAssetNodeData">DynamicOrgAssetNodeData</param>
	/// <param name="OrgAssetNodeData">OrgAssetNodeData</param>
	/// <param name="OrgAssetNodeRCOSpecialMappingData">OrgAssetNodeRCOSpecialMappingData</param>
	var MakeSyncDynamicRcoAndAssetNodesRequest = function (DynamicRCOData, DynamicOrgAssetNodeData, OrgAssetNodeData, OrgAssetNodeRCOSpecialMappingData) {

		try {
			OneViewConsole.Debug("MakeSyncDynamicRcoAndAssetNodesRequest start", "UploadBO.MakeSyncDynamicRcoAndAssetNodesRequest");

			var RcoAndAssetNodesList = {
				"DynamicRCOData": DynamicRCOData,
				"DynamicOrgAssetNodeData": DynamicOrgAssetNodeData,
				"OrgAssetNodeData": OrgAssetNodeData,
				"OrgAssetNodeRCOSpecialMappingData": OrgAssetNodeRCOSpecialMappingData
			};

			OneViewConsole.Debug("MakeSyncDynamicRcoAndAssetNodesRequest end", "UploadBO.MakeSyncDynamicRcoAndAssetNodesRequest");

			return RcoAndAssetNodesList;
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.MakeSyncDynamicRcoAndAssetNodesRequest", Excep);
		}
		finally {
			RcoAndAssetNodesList = null;
		}
	}


	/// <summary>
	/// UploadMultiMediaSubElements
	/// </summary>
	this.UploadMultiMediaSubElements = function (ShowExceptionMessage) {

		try{
			OneViewConsole.Debug("UploadMultiMediaSubElements start", "UploadBO.UploadMultiMediaSubElements");

			var IsSuccess = true;

			var oDateTime = new DateTime();
			var CurrenntDateAndTime = oDateTime.GetDateAndTime();
			var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

			var _oMultiMediaSubElements = new DefaultMasterDAO("MultiMediaSubElements");
			_oMultiMediaSubElements.UpdateProcessCountForUnsyncData();
			var MultiMediaSubElementsList = _oMultiMediaSubElements.GetAllUnSyncMasters();

			//var ServiceName = (OneViewSessionStorage.Get("ServiceName")).replace(/\s/g, "");
			//var OrganizationName = "EKFC";
			//var LoginUserName = OneViewSessionStorage.Get("LoginUserName").replace(/\s/g, "");


			var ServiceName = OneViewSessionStorage.Get("ServiceName");
			var OrganizationName = "EKFC";
			var LoginUserName = OneViewSessionStorage.Get("LoginUserName");


			// Todo: Siva
			// Temporarily added for solving arabic text not supporting in url
			// Need to migrate all clients like below way or fix the arabic text issue in url
			var ServiceId = OneViewSessionStorage.Get("ServiceId");
			if (ServiceId == 10) {
				ServiceName = ServiceId;
				OrganizationName = OneViewSessionStorage.Get("OrganizationId");
				LoginUserName = OneViewSessionStorage.Get("LoginUserId");
			}

			var options = { 'httpMethod': 'POST' };
			//var DestinationPath = "http://10.20.25.6:8090/EKFCLive/SimpleStorageService.svc/SimpleStorageService/" + ServiceName + "/" + OrganizationName + "/" + LoginUserName + "/";
			var DestinationPath = oneViewGlobalVariables.SimpleStorageURL+"/SimpleStorageService.svc/SimpleStorageService/" + ServiceName + "/" + OrganizationName + "/" + LoginUserName + "/";

			var oOneViewCordovaFileTransferPlugin = new OneViewCordovaFileTransferPlugin();
			//alert(MultiMediaSubElementsList.length);
			for (var i = 0; i < MultiMediaSubElementsList.length; i++) {
				if (MultiMediaSubElementsList[i].IsDisabled == 'true' || MultiMediaSubElementsList[i].IsDisabled == true) {
					var oHttpClientResponseDTO = window.HttpClinetPlugin.DeleteFile(oneViewGlobalVariables.SimpleStorageURL + "/SimpleStorageService.svc/SimpleStorageService" + MultiMediaSubElementsList[i].RemoteURL);
					//alert(oHttpClientResponseDTO);
				}
				else if ((MultiMediaSubElementsList[i].IsMultiMediaSynchronized != "true" && MultiMediaSubElementsList[i].IsMultiMediaSynchronized == true) || MultiMediaSubElementsList[i].RemoteURL == ""){
					var oHttpClientResponseDTO = window.HttpClinetPlugin.UploadFile(MultiMediaSubElementsList[i].LocalURL.substring(7), DestinationPath);
					oHttpClientResponseDTO = JSON.parse(oHttpClientResponseDTO);

					if (oHttpClientResponseDTO.IsAnyException == true || oHttpClientResponseDTO.IsAnyException == "true") {
						IsSuccess = false;
						break;
					}
					else if (oHttpClientResponseDTO.Response != "") {
						var Response = JSON.parse(oHttpClientResponseDTO.Response);
						var Query = "Update MultiMediaSubElements SET IsMultiMediaSynchronized = 'true', RemoteURL = '" + Response.CreateResult + "', MultiMediaSyncDate = '" + CurrenntDateAndTime + "', TimeStamp = '" + CurrenntDateAndTime + "' WHERE Id = " + MultiMediaSubElementsList[i].Id;
						//alert(Query);
						_OneViewSqlitePlugin.ExcecuteSql(Query);
					}
					else if (ShowExceptionMessage != false) {
						if (oHttpClientResponseDTO.IsAnyException == "false" && oHttpClientResponseDTO.ResponseCode == "503")//Service Unavailable
						{
							CloseProgressbarAndLoader();
							//alert("IN-ER-ALP-001 :: Service Unavailable");
							navigator.notification.alert((OneViewGlobalization[CurrentLanguage].ServiceUnavailable_Message), ['OK'], "");
							return null;

						}
						else if (oHttpClientResponseDTO.IsAnyException == "false" && oHttpClientResponseDTO.ResponseCode == "504")//Gateway Timeout
						{
							CloseProgressbarAndLoader();
							//alert("IN-ER-ALP-002 :: Gateway Timeout");
							alert(OneViewGlobalization[CurrentLanguage].GatewayTimeout_Message);
							return null;
						}
						else if (oHttpClientResponseDTO.IsAnyException == "false" && oHttpClientResponseDTO.ResponseCode == "500")//Internal Server Error
						{
							CloseProgressbarAndLoader();
							//alert("IN-ER-ALP-003 :: Internal Server Error");
							alert(OneViewGlobalization[CurrentLanguage].InternalServerError_Message);
							return null;
						}
						else if (oHttpClientResponseDTO.IsAnyException == "false" && oHttpClientResponseDTO.ResponseCode == "404")//Not Found
						{
							CloseProgressbarAndLoader();
							//alert("IN-ER-ALP-004 :: Not Found");
							alert(OneViewGlobalization[CurrentLanguage].NotFound_Message);
							return null;
						}
						else if (oHttpClientResponseDTO.IsAnyException == "false" && oHttpClientResponseDTO.ResponseCode == "408")//Request Timeout
						{
							CloseProgressbarAndLoader();
							//alert("IN-ER-ALP-005 :: Request Timeout");
							alert(OneViewGlobalization[CurrentLanguage].RequestTimeout_Message);
							return null;
						}
						else if (oHttpClientResponseDTO.IsAnyException == "false" && oHttpClientResponseDTO.ResponseCode == "400")//Bad Timeout
						{
							CloseProgressbarAndLoader();
							//alert("IN-ER-ALP-006 :: Bad Request");
							alert(OneViewGlobalization[CurrentLanguage].BadRequest_Message);
							return null;
						}
						else {
							CloseProgressbarAndLoader();
							//alert("IN-ER-ALP-007 :: Connection refused, Please Check your internet connectivity and try again");
							alert(OneViewGlobalization[CurrentLanguage].Connectionrefused_Message);
							return null;
						}
					}
				}
			}

			return IsSuccess;

			OneViewConsole.Debug("UploadMultiMediaSubElements end", "UploadBO.UploadMultiMediaSubElements");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.UploadMultiMediaSubElements", Excep);
			return false;
		}
		finally {

		}
	}


	/// <summary>
	/// CloseProgressbarAndLoader
	/// </summary>
	var CloseProgressbarAndLoader = function () {
		oSetDefaultSpinner.Stop();
		oOneViewProgressbar.Stop();
	}


	/// <summary>
	/// DownloadMultiMediaSubElements
	/// </summary>
	this.DownloadMultiMediaSubElements = function (MultiMediaSubElementsList) {

		try {
			OneViewConsole.Debug("DownloadMultiMediaSubElements start", "UploadBO.DownloadMultiMediaSubElements");

			var IsSuccess = true;

			var oDateTime = new DateTime();
			var CurrenntDateAndTime = oDateTime.GetDateAndTime();

			var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

			var options = { 'httpMethod': 'GET' };

			for (var i = 0; i < MultiMediaSubElementsList.length; i++) {
				var _oRegExp = new RegExp(' ', 'g');
				var RemoteURL = MultiMediaSubElementsList[i].RemoteURL.replace(_oRegExp, '%20');
				var ServiceURL = oneViewGlobalVariables.SimpleStorageURL + "/SimpleStorageService.svc/SimpleStorageService" + RemoteURL;
				var oHttpClientResponseDTO = window.HttpClinetPlugin.DownloadFile(ServiceURL);
				oHttpClientResponseDTO = JSON.parse(oHttpClientResponseDTO);
				if (oHttpClientResponseDTO.IsAnyException == true || oHttpClientResponseDTO.IsAnyException == "true") {
					IsSuccess = false;
					break;
				}
				else if (oHttpClientResponseDTO.Response != "") {
					var Query = "Update MultiMediaSubElements SET IsMultiMediaSynchronized = 'true', LocalURL = '" + oHttpClientResponseDTO.Response + "', MultiMediaSyncDate = '" + CurrenntDateAndTime + "', TimeStamp = '" + CurrenntDateAndTime + "' WHERE Id = " + MultiMediaSubElementsList[i].Id;
					_OneViewSqlitePlugin.ExcecuteSql(Query);
				}
			}

			return IsSuccess;

			OneViewConsole.Debug("DownloadMultiMediaSubElements end", "UploadBO.DownloadMultiMediaSubElements");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.DownloadMultiMediaSubElements", Excep);
			return false;
		}
		finally {

		}
	}


	////////********************************* Methods For APK Upgrade Batch Upload START ****************************////////

	this.APKUpgradeUpload = function (IsHideSuccessMsg) {

		try {

			var IsSuccess = false;
			MyAuditUploadProgressValue = 0;
			MyAuditUploadBatchNumber = 1;

			var _oDcDAO = new DcDAO();
			MyAuditTotalDCCountForUpload = _oDcDAO.GetServiceWiseUnSyncDcCount(OneViewSessionStorage.Get("ServiceId"));
			var TotalBatches = MyAuditTotalDCCountForUpload / MyAuditUploadLimit;
			TotalBatches = Math.ceil(TotalBatches);
			MyAuditUploadProgressValue = 100 / TotalBatches;
			//alert('MyAuditTotalDCCountForUpload : ' + MyAuditTotalDCCountForUpload);
			//alert('TotalBatches : ' + TotalBatches);
			//alert('MyAuditUploadProgressValue : ' + MyAuditUploadProgressValue);
			if (MyAuditTotalDCCountForUpload > 0) {
				IsSuccess = UploadDC();
			}
			else {
				IsSuccess = true;
			}
			return IsSuccess;
		}
		catch (Excep) {
			//alert("UploadBO.APKUpgradeUpload : " + Excep);
			//alert("UploadBO.APKUpgradeUpload 22 : " + JSON.stringify(Excep));
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.APKUpgradeUpload", Excep);
		}

		finally {
		}
	}

	var UploadDC = function () {

		try {
			OneViewConsole.Debug("UploadDC start", "UploadBO.UploadDC");

			//var Message = xlatService.xlat('Upload_confirm_Message');

			//var MultiMediaValidationResponse = MultiMediaValidation();
			//if (MultiMediaValidationResponse.IsSuccess == false) {
			//    Message = xlatService.xlat(MultiMediaValidationResponse.MessageKey);
			//}

			var IsSuccess = false;// oOneViewDefaultConfirmBox.Show(Message);


			oOneViewProgressbar.Start(xlatService.xlat("Uploading"));

			//if (MultiMediaValidationResponse.IsSuccess == false) {
			//    DeleteUnAvailableMultiMediaSubElements(MultiMediaValidationResponse.ValidationFailedMultiMediaSubElements);
			//}



			var IsMultiMediaSubElementsSuccess = MyInstance.UploadMultiMediaSubElements();

			if (IsMultiMediaSubElementsSuccess != null && IsMultiMediaSubElementsSuccess == true) {

				var IsSyncDynamicRcoAndAssetNodesSuccess = MyInstance.SyncDynamicRcoAndAssetNodes(true);

				if (IsSyncDynamicRcoAndAssetNodesSuccess != null && IsSyncDynamicRcoAndAssetNodesSuccess == true) {
					IsSuccess = MyInstance.APKUpgradeBatchUpload();
				}
				else if (IsSyncDynamicRcoAndAssetNodesSuccess != null && IsSyncDynamicRcoAndAssetNodesSuccess == false) {
					//navigator.notification.alert(xlatService.xlat('UploadFailed'), ['OK'], "");
					IsSuccess = false;
				}
			}
			else if (IsMultiMediaSubElementsSuccess != null && IsMultiMediaSubElementsSuccess == false) {
				//navigator.notification.alert(xlatService.xlat('UploadFailed'), ['OK'], "");
				IsSuccess = false;
			}
			oOneViewProgressbar.Stop();


			OneViewConsole.Debug("UploadDC end", "UploadBO.UploadDC");

			return IsSuccess;
		}
		catch (Excep) {
			oOneViewProgressbar.Stop();
			//alert("UploadBO.UploadDC : " + Excep);
			//alert("UploadBO.UploadDC 22 : " + JSON.stringify(Excep));
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.UploadDC", Excep);
		}
		finally {
		}
	}

	this.APKUpgradeBatchUpload = function () {

		var _oOneViewSqlitePlugin = new OneViewSqlitePlugin();

		try {
			OneViewConsole.Debug("APKUpgradeBatchUpload start", "UploadBO.APKUpgradeBatchUpload");

			var IsSuccess = true;

			var _oDcDAO = new DcDAO();
			var DcInfo = _oDcDAO.GetServiceWiseUnSyncDc(MyAuditUploadLimit);
			//alert('DcInfo.length : ' + DcInfo.length);
			if (DcInfo.length > 0) {

				_oDcDAO.UpdateDcProcessCountByDcInfo(DcInfo);
				var DataCaptureDTOLst = _oDcDAO.GetDcList(DcInfo);

				Update_UnSync_RcoProcessCount();
				var DynamicRCOData = GetAll_UnSync_DynamicRco();

				Update_UnSync_AssetNodeProcessCount();
				var DynamicOrgAssetNodeData = GetAll_UnSync_DynamicAssetNode();

				Update_UnSync_MultiMediaBlobSubElementsProcessCount();
				var MultiMediaBlobSubElementLst = GetAll_UnSync_MultiMediaBlobSubElements();

				Update_UnSync_MultiMediaSubElementsProcessCount();
				var MultiMediaSubElementLst = GetAll_UnSync_MultiMediaSubElements();

				Update_UnSync_AuditTrailDC();
				var AuditTrailDCLst = GetAll_UnSync_AuditTrailDC();

				//alert(JSON.stringify(AuditTrailDCLst));

				var _oActionDAO = new ActionDAO();
				var ActionResponse = _oActionDAO.GetAllUnSyncActionsForUpload(DcInfo);

				var _oDCBlockerInfoDAO = new DCBlockerInfoDAO();
				var DCBlockerInfoRequest = _oDCBlockerInfoDAO.GetAllDCBlockerInfoForUpload(DcInfo);
				//alert(JSON.stringify(DCBlockerInfoRequest));

				var _oDcApprovalDAO = new DcApprovalDAO();
				var DcApprovalDTOLst = _oDcApprovalDAO.GetAllDcApprovalInfoForUpload(DcInfo);

				var oUploadrequest = MakeUploadRequest(DataCaptureDTOLst, DynamicRCOData, DynamicOrgAssetNodeData, ActionResponse, MultiMediaBlobSubElementLst, AuditTrailDCLst, MultiMediaSubElementLst, DCBlockerInfoRequest, DcApprovalDTOLst);

				//alert(JSON.stringify(oUploadrequest));
				//oUploadResponse = null;
				var _UploadDcIL = new UploadDcIL();
				var oUploadResponse = _UploadDcIL.Upload(oUploadrequest);

				//alert(oUploadResponse.IsAnyException);
				//alert(oUploadResponse.ExceptionMessage);

				if (oUploadResponse != null && oUploadResponse.IsAnyException == false) {

					try {
						_oOneViewSqlitePlugin.StartTransaction();

						Update_Upload_Response(oUploadResponse);

						Save_Uploaded_DcResponse(oUploadResponse.DCResponseDTO.DCSyncStatusDTOlst);

						oOneViewProgressbar.SetProgressValue(MyAuditUploadProgressValue * MyAuditUploadBatchNumber);

						MyAuditUploadBatchNumber += 1;

						var _oDcProfileSyncStatusBO = new DcProfileSyncStatusBO();
						var IsDcProfileSyncStatus = _oDcProfileSyncStatusBO.Download(xlatService);

						_oOneViewSqlitePlugin.EndTransaction();

						MyInstance.APKUpgradeBatchUpload();
					}
					catch (Excep) {

						//alert(Excep);
						//alert(JSON.stringify(Excep));

						var Msg = xlatService.xlat('Upload_Status') + " :" + xlatService.xlat('Failed') + "\n" +
								  xlatService.xlat('Upload_Summary_TotalRecords') + " : " + MyAuditTotalDCCountForUpload + "\n" +
								  xlatService.xlat('Upload_Summary_UploadedRecords') + " : " + (MyAuditUploadLimit * (MyAuditUploadBatchNumber - 1)) + "\n" +
								  xlatService.xlat('Upload_Summary_FailedRecords') + " : " + (MyAuditTotalDCCountForUpload - (MyAuditUploadLimit * (MyAuditUploadBatchNumber - 1)));

						Msg = Msg + Update_Uploaded_Dc_Validation_Summary();

						var Title = xlatService.xlat('Upload_Summary_Title');

					  //  oOneViewCordovaDialogs.alert(Msg, Title);
						var DisplayMsg = Title + "\n" + Msg;
						alert(DisplayMsg);
						IsSuccess = false;

						//toaster.pop('error', xlatService.xlat('Error'), xlatService.xlat('UploadFailedLocal'));
						// navigator.notification.alert(xlatService.xlat('UploadFailedLocal'), ['OK'], "");
						UploadedDcResponseLst = [];
						OneViewConsole.Error("APKUpgradeBatchUpload failed local", "UploadBO.APKUpgradeBatchUpload");

						_oOneViewSqlitePlugin.Rollback();
					}
				}
				else if (oUploadResponse != null && oUploadResponse.IsAnyException == true) {

					var Msg = xlatService.xlat('Upload_Status') + " : " + xlatService.xlat('Failed') + "\n" +
							  xlatService.xlat('Upload_Summary_TotalRecords') + " : " + MyAuditTotalDCCountForUpload + "\n" +
							  xlatService.xlat('Upload_Summary_UploadedRecords') + " : " + (MyAuditUploadLimit * (MyAuditUploadBatchNumber - 1)) + "\n" +
							  xlatService.xlat('Upload_Summary_FailedRecords') + " : " + (MyAuditTotalDCCountForUpload - (MyAuditUploadLimit * (MyAuditUploadBatchNumber - 1)));

					Msg = Msg + Update_Uploaded_Dc_Validation_Summary();

					var Title = xlatService.xlat('Upload_Summary_Title');

					// oOneViewCordovaDialogs.alert(Msg, Title);
					var DisplayMsg = Title + "\n" + Msg;
					alert(DisplayMsg);
					IsSuccess = false;

					// toaster.pop('error', xlatService.xlat('Error'), xlatService.xlat('UploadFailed'));
					// navigator.notification.alert(xlatService.xlat('UploadFailed'), ['OK'], "");
					UploadedDcResponseLst = [];
					OneViewConsole.Info("APKUpgradeBatchUpload failed", "UploadBO.APKUpgradeBatchUpload");
				}
			}
			else {
				var Msg = xlatService.xlat('Upload_Status') + " : " + xlatService.xlat('Success') + "\n" +
						  xlatService.xlat('Upload_Summary_TotalRecords') + " : " + MyAuditTotalDCCountForUpload + "\n" +
						  xlatService.xlat('Upload_Summary_UploadedRecords') + " : " + MyAuditTotalDCCountForUpload + "\n" +
						  xlatService.xlat('Upload_Summary_FailedRecords') + " : " + 0;

				Msg = Msg + Update_Uploaded_Dc_Validation_Summary();

				var Title = xlatService.xlat('Upload_Summary_Title');

				// oOneViewCordovaDialogs.alert(Msg, Title);
				var DisplayMsg = Title + "\n" + Msg;
				alert(DisplayMsg);
				IsSuccess = true;

				// toaster.pop('success', xlatService.xlat('Success'), xlatService.xlat('UploadSuccess'));
				// navigator.notification.alert(xlatService.xlat('UploadSuccess'), ['OK'], "");
				UploadedDcResponseLst = [];

				OneViewConsole.Info("APKUpgradeBatchUpload success", "UploadBO.APKUpgradeBatchUpload");
			}

			OneViewConsole.Debug("APKUpgradeBatchUpload end", "UploadBO.APKUpgradeBatchUpload");

			return IsSuccess;

		}
		catch (Excep) {
			//alert("UploadBO.APKUpgradeBatchUpload : " + Excep);
			//alert("UploadBO.APKUpgradeBatchUpload 22 : " + JSON.stringify(Excep));
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.APKUpgradeBatchUpload", Excep);
		}
		finally {
			_oDcDAO = null;
			DcInfo = null;
			DataCaptureDTOLst = null;
			DynamicRCOData = null;
			DynamicOrgAssetNodeData = null;
			MultiMediaBlobSubElementLst = null;
			_oActionDAO = null;
			ActionResponse = null;
			oUploadrequest = null;
			_UploadDcIL = null;
			oUploadResponse = null;
			Msg = null;
			Title = null;
		}
	}

	////////********************************* Methods For APK Upgrade Batch Upload END ****************************////////


	/// <summary>
	/// BatchAutoUpload
	/// For particulat user (Login user)
	/// </summary>
	/// <param name="_oDcFilterParamRequest">_oDcFilterParamRequest</param>
	this.BatchAutoUpload = function (_oDcFilterParamRequest, PlaceFilterParam, TemplateFilterParam) {

		var _oOneViewSqlitePlugin = new OneViewSqlitePlugin();

		try {
			OneViewConsole.Debug("BatchAutoUpload start", "UploadBO.BatchAutoUpload");

			var IsSuccess = true;

			var _oDcDAO = new DcDAO();
			//var DcInfo = _oDcDAO.GetAllDcInfoWithFilters(_oDcFilterParamRequest);

			var _oMyAuditDAO = new MyAuditDAO();
			var DcInfo = _oMyAuditDAO.GetAllDCForAutoUpload(_oDcFilterParamRequest, '', PlaceFilterParam, TemplateFilterParam);

			if (DcInfo.length > 0) {

				_oDcDAO.UpdateDcProcessCountByDcInfo(DcInfo);
				var DataCaptureDTOLst = _oDcDAO.GetDcList(DcInfo);

				Update_UnSync_RcoProcessCount();
				var DynamicRCOData = GetAll_UnSync_DynamicRco();

				Update_UnSync_AssetNodeProcessCount();
				var DynamicOrgAssetNodeData = GetAll_UnSync_DynamicAssetNode();

				Update_UnSync_MultiMediaBlobSubElementsProcessCount();
				var MultiMediaBlobSubElementLst = GetAll_UnSync_MultiMediaBlobSubElements();

				Update_UnSync_MultiMediaSubElementsProcessCount();
				var MultiMediaSubElementLst = GetAll_UnSync_MultiMediaSubElements();

				Update_UnSync_AuditTrailDC();
				var AuditTrailDCLst = GetAll_UnSync_AuditTrailDC();

				//alert(JSON.stringify(AuditTrailDCLst));

				var _oActionDAO = new ActionDAO();
				var ActionResponse = _oActionDAO.GetAllUnSyncActionsForUpload(DcInfo);

				var _oDCBlockerInfoDAO = new DCBlockerInfoDAO();
				var DCBlockerInfoRequest = _oDCBlockerInfoDAO.GetAllDCBlockerInfoForUpload(DcInfo);
				//alert(JSON.stringify(DCBlockerInfoRequest));

				var _oDcApprovalDAO = new DcApprovalDAO();
				var DcApprovalDTOLst = _oDcApprovalDAO.GetAllDcApprovalInfoForUpload(DcInfo);

				var oUploadrequest = MakeUploadRequest(DataCaptureDTOLst, DynamicRCOData, DynamicOrgAssetNodeData, ActionResponse, MultiMediaBlobSubElementLst, AuditTrailDCLst, MultiMediaSubElementLst, DCBlockerInfoRequest, DcApprovalDTOLst);

				//alert(JSON.stringify(oUploadrequest));
				//oUploadResponse = null;
				var _UploadDcIL = new UploadDcIL();
				var oUploadResponse = _UploadDcIL.Upload(oUploadrequest);

				//alert(oUploadResponse.IsAnyException);
				//alert(oUploadResponse.ExceptionMessage);

				if (oUploadResponse != null && oUploadResponse.IsAnyException == false) {

					try {
						_oOneViewSqlitePlugin.StartTransaction();

						Update_Upload_Response(oUploadResponse);

						Save_Uploaded_DcResponse(oUploadResponse.DCResponseDTO.DCSyncStatusDTOlst);

						oOneViewProgressbar.SetProgressValue(MyAuditUploadProgressValue * MyAuditUploadBatchNumber);

						MyAuditUploadBatchNumber += 1;

						var _oDcProfileSyncStatusBO = new DcProfileSyncStatusBO();
						var IsDcProfileSyncStatus = _oDcProfileSyncStatusBO.Download(xlatService);
						//alert('IsDcProfileSyncStatus 22 : ' + IsDcProfileSyncStatus);

						//for particular template and place
						ExecuteAutoUploadGarbageCollector();

						var _oLandingPageViewReponseBO = new LandingPageViewReponseBO(GlobalxlatService);
						var LandingPageViewReponseBOIsSuccess = _oLandingPageViewReponseBO.Download();

						//alert('1111' + LandingPageViewReponseBOIsSuccess);
						if (LandingPageViewReponseBOIsSuccess != true) {
							MyInstance.UpdateSyncStatus();
						}
						_oOneViewSqlitePlugin.EndTransaction();

						MyInstance.BatchAutoUpload(_oDcFilterParamRequest, PlaceFilterParam, TemplateFilterParam);
					}
					catch (Excep) {

					   // alert(Excep);
						//alert(JSON.stringify(Excep));
						var Msg = xlatService.xlat('Upload_Status') + " :" + xlatService.xlat('Failed') + "\n" +
								  xlatService.xlat('Upload_Summary_TotalRecords') + " : " + MyAuditTotalDCCountForUpload + "\n" +
								  xlatService.xlat('Upload_Summary_UploadedRecords') + " : " + (MyAuditUploadLimit * (MyAuditUploadBatchNumber - 1)) + "\n" +
								  xlatService.xlat('Upload_Summary_FailedRecords') + " : " + (MyAuditTotalDCCountForUpload - (MyAuditUploadLimit * (MyAuditUploadBatchNumber - 1)));

						Msg = Msg + Update_Uploaded_Dc_Validation_Summary();

						var Title = xlatService.xlat('Upload_Summary_Title');

						//oOneViewCordovaDialogs.alert(Msg, Title);
						IsSuccess = false;

						//toaster.pop('error', xlatService.xlat('Error'), xlatService.xlat('UploadFailedLocal'));
						//navigator.notification.alert(xlatService.xlat('UploadFailedLocal'), ['OK'], "");
						UploadedDcResponseLst = [];
						OneViewConsole.Error("BatchAutoUpload failed local", "UploadBO.BatchAutoUpload");

						_oOneViewSqlitePlugin.Rollback();
					}
				}
				else if (oUploadResponse != null && oUploadResponse.IsAnyException == true) {

					var Msg = xlatService.xlat('Upload_Status') + " : " + xlatService.xlat('Failed') + "\n" +
							  xlatService.xlat('Upload_Summary_TotalRecords') + " : " + MyAuditTotalDCCountForUpload + "\n" +
							  xlatService.xlat('Upload_Summary_UploadedRecords') + " : " + (MyAuditUploadLimit * (MyAuditUploadBatchNumber - 1)) + "\n" +
							  xlatService.xlat('Upload_Summary_FailedRecords') + " : " + (MyAuditTotalDCCountForUpload - (MyAuditUploadLimit * (MyAuditUploadBatchNumber - 1)));

					Msg = Msg + Update_Uploaded_Dc_Validation_Summary();

					var Title = xlatService.xlat('Upload_Summary_Title');

					//oOneViewCordovaDialogs.alert(Msg, Title);
					IsSuccess = false;

					// toaster.pop('error', xlatService.xlat('Error'), xlatService.xlat('UploadFailed'));
				   // navigator.notification.alert(xlatService.xlat('UploadFailed'), ['OK'], "");
					UploadedDcResponseLst = [];
					OneViewConsole.Info("BatchAutoUpload failed", "UploadBO.BatchAutoUpload");
				}
			}
			else {

				var Msg = xlatService.xlat('Upload_Status') + " : " + xlatService.xlat('Success') + "\n" +
						  xlatService.xlat('Upload_Summary_TotalRecords') + " : " + MyAuditTotalDCCountForUpload + "\n" +
						  xlatService.xlat('Upload_Summary_UploadedRecords') + " : " + MyAuditTotalDCCountForUpload + "\n" +
						  xlatService.xlat('Upload_Summary_FailedRecords') + " : " + 0;

				Msg = Msg + Update_Uploaded_Dc_Validation_Summary();

				var Title = xlatService.xlat('Upload_Summary_Title');

				DownloadActionFollowUp(xlatService);

				//oOneViewCordovaDialogs.alert(Msg, Title);
				IsSuccess = false;

				// toaster.pop('success', xlatService.xlat('Success'), xlatService.xlat('UploadSuccess'));
			   // navigator.notification.alert(xlatService.xlat('UploadSuccess'), ['OK'], "");
				UploadedDcResponseLst = [];
				OneViewConsole.Info("BatchAutoUpload success", "UploadBO.BatchAutoUpload");
			}


			OneViewConsole.Debug("BatchAutoUpload end", "UploadBO.BatchAutoUpload");

			return IsSuccess;

		}
		catch (Excep) {
		   // alert('BatchAutoUpload : ' + Excep);
		   // alert('BatchAutoUpload 22 : ' + JSON.stringify(Excep));
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.BatchAutoUpload", Excep);
		}
		finally {
			_oDcDAO = null;
			DcInfo = null;
			DataCaptureDTOLst = null;
			DynamicRCOData = null;
			DynamicOrgAssetNodeData = null;
			MultiMediaBlobSubElementLst = null;
			_oActionDAO = null;
			ActionResponse = null;
			oUploadrequest = null;
			_UploadDcIL = null;
			oUploadResponse = null;
			Msg = null;
			Title = null;
		}
	}

	var ExecuteAutoUploadGarbageCollector = function () {
		try {
			OneViewConsole.Debug("ExecuteAutoUploadGarbageCollector start", "UploadBO.ExecuteAutoUploadGarbageCollector");


			var _oDcDAO = new DcDAO();
			DcPlaceIdTemplateIdList = _oDcDAO.GetDcPlaceIdTemplateId(OneViewSessionStorage.Get("LoginUserId"), OneViewSessionStorage.Get("ServiceId"));
			var _oDcDeletion = new DcDeletion();

			for (var i = 0; i < DcPlaceIdTemplateIdList.length; i++) {
				var TemplateId = DcPlaceIdTemplateIdList[i].TemplateId;
				var DcPlaceId = DcPlaceIdTemplateIdList[i].DcPlaceId;
				//alert("TemplateId1 : " + TemplateId + " DcPlaceId1 : " + DcPlaceId);
				_oDcDeletion.DeleteCompleteAndSyncedData(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
				_oDcDeletion.DeleteInCompleteAndSyncedData(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
				_oDcDeletion.DeleteInCompleteAndSyncedDataInDays(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
				_oDcDeletion.DeleteInCompleteAndSyncedDataFromNow(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
				_oDcDeletion.DeleteCompletedSyncAndApprovedData(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
				_oDcDeletion.DeleteCompletedSyncAndOnDeviceApprovalFinishedData(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);

				if (OneViewSessionStorage.Get("ServiceId") == 39) {
					_oDcDeletion.DeleteInActivePurchaseOrder(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
					_oDcDeletion.DeleteItemCompletedorInActiveInPurchaseOrder(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
					_oDcDeletion.DeleteCompletedItemInPurchaseOrder(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
				}

				_oDcDeletion.DeleteExpiredOrderItems(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
				_oDcDeletion.DeleteCompletedItemFromWorkOrder(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
				_oDcDeletion.DeleteExpiredItemFromWorkOrder(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);


				if (OneViewSessionStorage.Get("ServiceId") == 51) {
					_oDcDeletion.DeleteCompletedItemForFlightPreparation(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
					_oDcDeletion.DeleteExpiredItemForFlightPreparation(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
				}
			}

			OneViewConsole.Debug("ExecuteAutoUploadGarbageCollector end", "UploadBO.ExecuteAutoUploadGarbageCollector");
		}
		catch (Excep) {
			//alert("Excep : " + JSON.stringify(Excep) + Excep)
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.ExecuteAutoUploadGarbageCollector", Excep);
		}
	}

	this.UpdateSyncStatus = function () {

		try {
			OneViewConsole.Debug("UpdateSyncStatus start", "UploadBO.UpdateSyncStatus");

			var _oLandingPageViewReponseDAO = new LandingPageViewReponseDAO();
			var LandingPageViewInfo = OneViewSessionStorage.Get("LandingPageViewInfo");
			var ServiceId = OneViewSessionStorage.Get("ServiceId");
			var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

			if (LandingPageViewInfo != null) {

				LandingPageViewInfo = JSON.parse(LandingPageViewInfo);

				var LandingPageViewReponse = _oLandingPageViewReponseDAO.GetByServiceUserAndLandingPageViewName(ServiceId, LoginUserId, LandingPageViewInfo.LandingPageViewName);
				var DCTaskViewInfoDTO = null;

				if (LandingPageViewReponse.length > 0) {

					if (LandingPageViewInfo.SelectedTab == "Past") {
						DCTaskViewInfoDTO = JSON.parse(LandingPageViewReponse[0].LandingPageViewReponsePast);
					}
					if (LandingPageViewInfo.SelectedTab == "Today") {
						DCTaskViewInfoDTO = JSON.parse(LandingPageViewReponse[0].LandingPageViewReponseToday);
					}
					else {
						DCTaskViewInfoDTO = JSON.parse(LandingPageViewReponse[0].LandingPageViewReponseFuture);
					}

					if (DCTaskViewInfoDTO != null) {

						DCTaskViewInfoDTO.SyncedCount += DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.NotSyncedCount;

						if (DCTaskViewInfoDTO.NotSyncedCount > 0) {
							DCTaskViewInfoDTO.NotSyncedCount -= DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.NotSyncedCount;
						}

						DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.SyncedCount += DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.NotSyncedCount;
						DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.NotSyncedCount = 0;

						if (LandingPageViewInfo.SelectedTab == "Today") {
							_oLandingPageViewReponseDAO.UpdateLandingPageViewReponseToday(ServiceId, LoginUserId, LandingPageViewInfo.LandingPageViewName, JSON.stringify(DCTaskViewInfoDTO));
						}
					}
				}
			}

			OneViewConsole.Debug("UpdateSyncStatus end", "UploadBO.UpdateSyncStatus");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.UpdateSyncStatus", Excep);
		}
		finally {
		}
	}

	this.GetTemplateGroupIds = function () {

		try {
			OneViewConsole.Debug("GetTemplateGroupIds start", "UploadBO.GetTemplateGroupIds");

			var MitmarkLandingPageConfigList = new MitmarkLandingPageConfigDAO().GetTemplateGroupsByServiceAndUserId(OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("LoginUserId"));

			var TemplateGroupIdList = [];
			if (MitmarkLandingPageConfigList != null) {
				for (var i = 0; i < MitmarkLandingPageConfigList.length; i++) {
					var Config = MitmarkLandingPageConfigList[i].MitmarkLandingPageConfig;
					Config = JSON.parse(Config);
					for (var j = 0; j < Config.length; j++) {
						TemplateGroupIdList.push(Config[j].Id);
					}

				}
			}

			OneViewConsole.Debug("GetTemplateGroupIds end", "UploadBO.GetTemplateGroupIds");

			return TemplateGroupIdList;
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "UploadBO.GetTemplateGroupIds", Excep);
		}
		finally {
		}
	}

}

function UploadDcIL(toaster) {

	// UploadDcIL object
	var MyInstance = this;


	/// <summary>
	/// Upload
	/// </summary>
	/// <param name="UploadReq">UploadReq</param>
	this.Upload = function (UploadReq, ShowExceptionMessage) {

		try {
			OneViewConsole.Debug("Upload start", "UploadDcIL.Upload");

			var RequestParam = JSON.stringify(UploadReq);

			OneViewConsole.DataLog("RequestParam : " + RequestParam, "UploadDcIL.Upload");

			var _oOneViewChannel = new OneViewChannel();
		   // _oOneViewChannel.toaster = toaster;
			_oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/AdvActionDCUpload";
			_oOneViewChannel.parameter = JSON.stringify({ "req": RequestParam });
			var oUploadResponse = _oOneViewChannel.Send({ "ShowExceptionMessage": (ShowExceptionMessage != undefined) ? ShowExceptionMessage : true });

			OneViewConsole.Debug("Upload end", "UploadDcIL.Upload");

			if (oUploadResponse != null) {

				oUploadResponse = JSON.parse(oUploadResponse.AdvActionDCUploadResult);

				OneViewConsole.DataLog("Response from server : " + JSON.stringify(oUploadResponse), "UploadDcIL.Upload");
			}

			return oUploadResponse;
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("IL", "UploadDcIL.Upload", Excep);
		}
		finally {
			RequestParam = null;
			_oOneViewChannel = null;
			oUploadResponse = null;
		}
	}


	/// <summary>
	/// SyncDynamicRcoAndAssetNodes
	/// </summary>
	/// <param name="UploadReq">UploadReq</param>
	this.SyncDynamicRcoAndAssetNodes = function (UploadReq, ShowExceptionMessage) {

		try {
			OneViewConsole.Debug("SyncDynamicRcoAndAssetNodes start", "UploadDcIL.SyncDynamicRcoAndAssetNodes");

			var RequestParam = JSON.stringify(UploadReq);

			OneViewConsole.DataLog("RequestParam : " + RequestParam, "UploadDcIL.SyncDynamicRcoAndAssetNodes");

			var _oOneViewChannel = new OneViewChannel();
		   // _oOneViewChannel.toaster = toaster;
			_oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/AdvCreateAndSyncNode";
			_oOneViewChannel.parameter = JSON.stringify({ "req": RequestParam });
			var oUploadResponse = _oOneViewChannel.Send({ "ShowExceptionMessage": (ShowExceptionMessage != undefined) ? ShowExceptionMessage : true });

			OneViewConsole.Debug("SyncDynamicRcoAndAssetNodes end", "UploadDcIL.SyncDynamicRcoAndAssetNodes");

			if (oUploadResponse != null) {

				oUploadResponse = JSON.parse(oUploadResponse.AdvCreateAndSyncNodeResult);

				OneViewConsole.DataLog("Response from server : " + JSON.stringify(oUploadResponse), "UploadDcIL.SyncDynamicRcoAndAssetNodes");
			}

			return oUploadResponse;
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("IL", "UploadDcIL.SyncDynamicRcoAndAssetNodes", Excep);
		}
		finally {
			RequestParam = null;
			_oOneViewChannel = null;
			oUploadResponse = null;
		}
	}
}

