
var LandingPageSelectedStatusTypeId = 1;

var DCTaskViewInfoDTO = null;

var LandingPageViewInfo = {
	LandingPageViewName: "",
	ParentIndex: 0,
	ChildIndex: 0,
	BackRouteKey: "",
	SelectedTab: ""
};

var DcApprovalInfoList = [];
var LandingPageGraphSearchTime = 2000; // Millie seconds
var IsOnDeviceApprovalProfileNeeded = false;
var LandingPageViewDisplayConfig = null;


// DasboardController
MyApp.controller('DasboardController', function ($scope, $document, xlatService, $timeout, $location, $templateCache, $compile, snapRemote) {

	var _oDasboardFacade = new DasboardFacade($scope, $document, xlatService, $timeout, $location, $templateCache, $compile, snapRemote);
	_oDasboardFacade.Init();
	_oDasboardFacade.PageLoad();

	ServiceChangeEvent = function () {
		_oDasboardFacade.ServiceChangeEvent($location);
	}

	$scope.$on('$destroy', function () {
		_oDasboardFacade.Destroy();
	});

	$scope.StatusTypeChange = function (Id) {
		_oDasboardFacade.StatusTypeChange(Id);
	}

	$scope.TaskClick = function (LandingPageViewName, ParentIndex, ChildIndex) {
		_oDasboardFacade.TaskClick(LandingPageViewName, ParentIndex, ChildIndex);
	}

	$scope.LoadNewDC = function ($event) {
		_oDasboardFacade.LoadNewDC($event);
	}

	$scope.LoadViewDC = function ($event) {
		_oDasboardFacade.LoadViewDC($event);
	}

	$scope.$watch('MyAudit', function (TabIndex) {
		_oDasboardFacade.WatchMyAudit(TabIndex);
	});

	$scope.BackgroundVisble = function () {
		$scope.ActionSheet = false;
	}

	$scope.ViewChange = function (ViewName) {
		_oDasboardFacade.ViewChange(ViewName);
	}

	$scope.DownloadDCProfile = function ($event) {
		_oDasboardFacade.DownloadDCProfile($event);
	}

	$scope.AdvFilterChange = function () {
		_oDasboardFacade.AdvFilterChange();
	}

	$scope.UploadDC = function ($event) {
		_oDasboardFacade.UploadDC($event);
	}

	$scope.SyncTask = function () {
		_oDasboardFacade.SyncTask();
	}

	PageViewChangeEvent = function () {
		_oDasboardFacade.PageViewChangeEvent();
	}

	$scope.ClickBulkUpload = function () {
		_oDasboardFacade.ClickBulkUpload();
	}

	$scope.BulkDownload = function () {
		_oDasboardFacade.BulkDownload();
	}

	$scope.ToggleDivSmallDeviceStatusBar = function () {
		_oDasboardFacade.ToggleDivSmallDeviceStatusBar();
	}

	$scope.ApproveDC = function ($event) {
		_oDasboardFacade.ApproveDC($event);
	}

	$scope.ApproveMultipleDCEvent = function () {
		_oDasboardFacade.ApproveMultipleDC();
	}

	$scope.CloseMultipleDcApproval = function () {
		_oDasboardFacade.CloseMultipleDcApproval();
	}

	SelectDC = function (Id) {
		_oDasboardFacade.SelectDC(Id);
	}

	$scope.SyncMaster = function () {
		_oDasboardFacade.SyncMaster();
	}

	var lastTimeOutId = null;
	$scope.GraphSearch = function () {
		if (lastTimeOutId != null)
			$timeout.cancel(lastTimeOutId);
		lastTimeOutId = $timeout(function () { _oDasboardFacade.GraphSearch(); }, LandingPageGraphSearchTime);
	}

	$scope.AdvFilterChange = function () {
		_oDasboardFacade.AdvFilterChange($compile, snapRemote);
	}

	$scope.FilterDataChanged = function (obj) {
		_oDasboardFacade.FilterDataChanged(obj);
	}

	$scope.CloseGrigFilter = function () {
		_oDasboardFacade.CloseGrigFilter($compile, snapRemote);
	};

	$scope.ApplyFilter = function () {
		_oDasboardFacade.ApplyFilter(snapRemote);
	}

	$scope.ClearGraphSearchElement = function () {
		_oDasboardFacade.ClearGraphSearchElement();
	}

	$scope.DummyEvent = function ($event) {
		$event.stopPropagation();
	}
});

// DasboardFacade
function DasboardFacade($scope, $document, xlatService, $timeout, $location, $templateCache, $compile, snapRemote) {

	var MyInstance = this;
	var _oDOM = new DOM();
	var _oLandingPageViewReponseBO = new LandingPageViewReponseBO();
	var _oCloudManagerBO = new CloudManagerBO(xlatService);
	var _oDasboardBO = new DasboardBO($scope, $document, xlatService, $timeout, $location, $templateCache, $compile, snapRemote);
	var _oDateTime = new DateTime();
	var _oMultipleDcApprovalBO = new MultipleDcApprovalBO();
	var _oOneViewGeolocationPlugin = new OneViewGeolocationPlugin();

	var ServiceId = OneViewSessionStorage.Get("ServiceId");
	var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

	this.Destroy = function () {

		try {
			OneViewConsole.Debug("Destroy start", "LandingPageFacade.Destroy");

			LandingPageSelectedStatusTypeId = 1;
			DCTaskViewInfoDTO = null;
			LandingPageViewInfo = {
				LandingPageViewName: "",
				ParentIndex: 0,
				ChildIndex: 0,
				SelectedTab: ""
			};

			_oDOM.Hide('DivServiceDropdown');

			if (IsGlobalBlueThermLiveTemperatureIndicatorEnabled == true) {
				_oDOM.SetStyle('divBlueThermLiveTemperatureIndicator', 'display', '');
			}

			IsBulkUploadEnabled = false;
			LandingPageGraphSearchTime = 2000;

			IsOnDeviceApprovalProfileNeeded = false;
			LandingPageViewDisplayConfig = null;

			//if (OneViewGlobalServiceTypeEnum[OneViewGlobalServiceType] == 18) {
			//    _oOneViewGeolocationPlugin.RemoveLocationUpdates();
			//}

			OneViewConsole.Debug("Destroy end", "LandingPageFacade.Destroy");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "LandingPageFacade.Destroy", xlatService);
		}
	}

	this.Init = function () {

		try {
			OneViewConsole.Debug("Init start", "DasboardFacade.Init");

			GlobalxlatService = xlatService;
			GlobalScope = $scope;
			GlobalLocation = $location;

			xlatService.setCurrentPage('3');
			document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');

			if (ServiceId != 32) {
				var _oDefaultMasterDAO = new DefaultMasterDAO("BusinessEventEntity");
				var IsExist = _oDefaultMasterDAO.IsTableExist();
				if (IsExist == true) {
					var _oBusinessEventFramework = new BusinessEventFramework();
					_oBusinessEventFramework.TriggerEvent("Dashboard", "PageLoad");
				}
			}
			if (ServiceId == 36) {
				$scope.DivBulkDownload = true;
			}

			if (OneViewLocalStorage.Get("IsGlobalGeoLocationValidationEnabled") == "true") {
				_oOneViewGeolocationPlugin.RequestLocationUpdates();
			}
			else {
				_oOneViewGeolocationPlugin.RemoveLocationUpdates();
			}

			if (OneViewLocalStorage.Get("IsAutoProfileDownloadEnabled") == "true") {
			   // if (ISDownLoadRequired == undefined && ISDownLoadRequired != false) {
					MyInstance.BulkDownloadConform(false);
			   // }
			}

			BulkUpload();
			LandingPageAutoSync();
			// Registering page name for globalization


			if (IsGlobalBlueThermLiveTemperatureIndicatorEnabled == true) {
				_oDOM.SetStyle('divBlueThermLiveTemperatureIndicator', 'display', 'none');
			}

			$scope.ActionSheet = false;

			$scope.MyAuditTab = ["Past", "Today", "Future"];
			$scope.MyAudit = "Today";

			$scope.TaskContentPast = false;
			$scope.TaskContentToday = true;
			$scope.TaskContentFuture = false;

			_oDasboardBO.Download();
			_oDasboardBO.LoadViews();

			var Value = _oDOM.GetValue('ViewDropdown');

			if (Value != "") {
				_oDasboardBO.SetByView(Value);
			}

			var _oDcPendingTaskBO = new DcPendingTaskBO();
			_oDcPendingTaskBO.UpdateTopRightBell(OneViewSessionStorage.Get("LoginUserId"));

			var CloudManagerResponse = _oCloudManagerBO.GetAllServicesByUserIdFromLocal();

			var OptionsHtml = '';

			for (var i = 0; i < CloudManagerResponse.ServicesLst.length; i++) {

				if (CloudManagerResponse.ServicesLst[i].Id == OneViewSessionStorage.Get("ServiceId")) {
					OptionsHtml += '<option selected>' + CloudManagerResponse.ServicesLst[i].Name + '</option>';
				}
				else {
					OptionsHtml += '<option>' + CloudManagerResponse.ServicesLst[i].Name + '</option>';
				}
			}

			_oDOM.AddInnerHtml('ServiceDropdown', OptionsHtml);

			if (CloudManagerResponse.ServicesLst.length > 1) {
				_oDOM.Show('DivServiceDropdown');
			}
			else {
				_oDOM.Hide('DivServiceDropdown');
			}

			if (OneViewGlobalDeviceDisplyMode == "Large") {
				$scope.StatusBarOtherDevice = true;
				$scope.StatusBarSmallDevice = false;
				_oDOM.AddClass("ContentId", "has-footer");
				_oDOM.SetStyle("ContentId", "bottom", "75px");
				_oDOM.SetStyle("ContentId", "top", "80px");
			}
			else {
				$scope.StatusBarOtherDevice = false;
				$scope.StatusBarSmallDevice = true;
				_oDOM.RemoveClass("ContentId", "has-footer");
				_oDOM.SetStyle("ContentId", "bottom", "0px");
				_oDOM.SetStyle("ContentId", "top", "80px");
			}

			$scope.GraphSearchElement = "";
			$scope.FilterData = [];

			if ($scope.GraphSearchElement == "") {
				$scope.BtnClearGraphSearchElementShow = false;
			}
			else {
				$scope.BtnClearGraphSearchElementShow = true;
			}

			_oDasboardBO.InitializeTaskHandler();

			OneViewConsole.Debug("Init end", "DasboardFacade.Init");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "DasboardFacade.Init", xlatService);
		}
	}

	this.PageLoad = function () {

		try {
			OneViewConsole.Debug("PageLoad start", "DasboardFacade.PageLoad");

			if (ServiceId != 32) {
				var IsExistLandingPageViewReponse = _oLandingPageViewReponseBO.IsExistLandingPageViewReponse();

				if (IsExistLandingPageViewReponse == false) {
					$scope.NoDataAvailable = true;
					$scope.DataAvailable = false;
				}
				else {
					_oDasboardBO.UpdateTaskStatus(DCTaskViewInfoDTO);
					_oDasboardBO.LoadHtml(DCTaskViewInfoDTO, LandingPageSelectedStatusTypeId);
					$scope.NoDataAvailable = false;
					$scope.DataAvailable = true;
				}

				if (OneViewGlobalDeviceDisplyMode == "Small") {
					MyInstance.UpdateFloatingBtnStatus();
				}


				if (OneViewLocalStorage.Get("IsAutoMetadataDownload") == "true") {
					MyInstance.AutomaticSyncMaster();
				}

			}
			else {
				//alert('going to MitmarkLandingPage');
				$location.url('/MitmarkLandingPage');
			}
			OneViewConsole.Debug("PageLoad end", "DasboardFacade.PageLoad");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "DasboardFacade.PageLoad", xlatService);
		}
	}

	this.ServiceChangeEvent = function ($location) {

		try {
			OneViewConsole.Debug("ServiceChangeEvent start", "DasboardFacade.ServiceChangeEvent");

			var CloudManagerResponse = _oCloudManagerBO.GetAllServicesByUserIdFromLocal();

			var ServiceInfo = {};

			var ServiceName = _oDOM.GetValue('ServiceDropdown');

			for (var i = 0; i < CloudManagerResponse.ServicesLst.length; i++) {

				if (CloudManagerResponse.ServicesLst[i].Name == ServiceName) {
					ServiceInfo = CloudManagerResponse.ServicesLst[i];
					break;
				}
			}

			//OneViewSessionStorage.Save("ServiceId", ServiceInfo.Id);
			//OneViewSessionStorage.Save("ServiceName", ServiceInfo.Name);
			//OneViewSessionStorage.Save("ServiceOMGuid", "1");
			//oneViewGlobalVariables.FoodSafetyServiceURL = ServiceInfo.ServiceUrl;
			//oneViewGlobalVariables.SimpleStorageURL = ServiceInfo.SimpleStorageUrl;

			//// DB Initialization
			//var _oCloudManagerBO = new CloudManagerBO(xlatService);
			//_oCloudManagerBO.InitializeDBContext(ServiceInfo.Id);

			//// Resetting Band, TemplateMetada, and DAT Entities
			//var _RefreshMetadataHandler = new RefreshMetadataHandler(xlatService);
			//_RefreshMetadataHandler.Refresh();

			//// Router Resetting
			//var _oOneViewRouterComponet = new OneViewRouterComponet();
			//_oOneViewRouterComponet.ResetRouter();

			//// Menu Loading
			//var _oDefaultMenuComponent = new DefaultMenuComponent();
			//_oDefaultMenuComponent.ResetMenu($scope, $compile);

			//GlobalizationMetadata = {};
			////GetMetadata for globalization
			//var oGlobalizationComponent = new GlobalizationComponent();
			//var MetaDataList = oGlobalizationComponent.LoadLocalizedMetadata(OneViewStaticPageList);

			////Form metadata to required structure
			//oGlobalizationComponent.FormGlobalizationMeta(MetaDataList, 'en-us');

			UpdateCloudManagerUserServiceMapping(ServiceInfo);

			navigator.notification.alert(xlatService.xlat('IN-SU-MDB-001 :: Service Changed successfully.Please login to Continue.'), ['OK'], "");
			$location.url('/login');

			OneViewSessionStorage.Clear();
			ClearGlobalVariable();

			$scope.$apply();

			OneViewConsole.Debug("ServiceChangeEvent end", "DasboardFacade.ServiceChangeEvent");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "DasboardFacade.ServiceChangeEvent", xlatService);
		}
	}

	var UpdateCloudManagerUserServiceMapping = function (ServiceInfo) {
		try {
			OneViewConsole.Debug("UpdateCloudManagerUserServiceMapping start", "DasboardFacade.UpdateCloudManagerUserServiceMapping");

			var UserId = OneViewSessionStorage.Get("LoginUserName");
			UserId = UserId.toLowerCase();

			var CloudManagerUserServiceMapping = {};

			if (OneViewLocalStorage.Get("CloudManagerUserServiceMapping") != null) {
				CloudManagerUserServiceMapping = JSON.parse(OneViewLocalStorage.Get("CloudManagerUserServiceMapping"));
			}

			if (CloudManagerUserServiceMapping[UserId] != undefined && ServiceInfo.Id != undefined && ServiceInfo.Name != undefined) {

				CloudManagerUserServiceMapping[UserId].DefautServiceId = ServiceInfo.Id;
				CloudManagerUserServiceMapping[UserId].DefautServiceName = ServiceInfo.Name;
			}

			OneViewLocalStorage.Save("CloudManagerUserServiceMapping", JSON.stringify(CloudManagerUserServiceMapping));

			OneViewConsole.Debug("UpdateCloudManagerUserServiceMapping end", "DasboardFacade.UpdateCloudManagerUserServiceMapping");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "DasboardFacade.UpdateCloudManagerUserServiceMapping", xlatService);
		}
	}

	this.StatusTypeChange = function (Id) {

		try {
			OneViewConsole.Debug("StatusTypeChange start", "LandingPageFacade.StatusTypeChange");

			oSetDefaultSpinner.Start();

			LandingPageSelectedStatusTypeId = Id;

			if ($scope.MyAudit == "Today") {

				if (OneViewGlobalDeviceDisplyMode == "Large") {

					var RegularExpressionForRemoveClass = new RegExp('(\\s|^)active(\\s|$)');
					var StatusTypeLst = document.getElementsByName("StatusType_" + OneViewGlobalDeviceDisplyMode);
					for (var i = 0; i < StatusTypeLst.length; i++) {
						StatusTypeLst[i].className = StatusTypeLst[i].className.replace(RegularExpressionForRemoveClass, ' ');
					}

					var CurrentStatusType = document.getElementById("StatusType" + LandingPageSelectedStatusTypeId + "_" + OneViewGlobalDeviceDisplyMode);
					if (CurrentStatusType != null) {
						CurrentStatusType.className = CurrentStatusType.className + " active";
					}
				}

				_oDasboardBO.LoadHtml(DCTaskViewInfoDTO, Id);
			}

			if (OneViewGlobalDeviceDisplyMode == "Small") {

				MyInstance.UpdateFloatingBtnStatus();
				MyInstance.CloseDivSmallDeviceStatusBar();
			}

			oSetDefaultSpinner.Stop();

			OneViewConsole.Debug("StatusTypeChange end", "LandingPageFacade.StatusTypeChange");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "LandingPageFacade.StatusTypeChange", xlatService);
		}
	}

	this.TaskClick = function (LandingPageViewName, ParentIndex, ChildIndex) {

		try {
			OneViewConsole.Debug("TaskClick start", "LandingPageFacade.TaskClick");

			if (LandingPageSelectedStatusTypeId != 4 && LandingPageSelectedStatusTypeId != 5 && LandingPageSelectedStatusTypeId != 8) {

				//LandingPageViewInfo.LandingPageViewName = LandingPageViewName;
				LandingPageViewInfo.ParentIndex = ParentIndex;
				LandingPageViewInfo.ChildIndex = ChildIndex;
				LandingPageViewInfo.SelectedTab = $scope.MyAudit;

				OneViewSessionStorage.Save("LandingPageViewInfo", JSON.stringify(LandingPageViewInfo));

				$scope.ActionSheet = true;

				if (OneViewGlobalDeviceDisplyMode == "Small") {
					MyInstance.CloseDivSmallDeviceStatusBar();
				}

				_oDasboardBO.UpdateActionSheet();

				//alert(JSON.stringify(DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex]));
			}

			OneViewConsole.Debug("TaskClick end", "LandingPageFacade.TaskClick");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "LandingPageFacade.TaskClick", xlatService);
		}
	}

	this.UpdateBackRouteKey = function (BackRouteKey) {

		try {
			OneViewConsole.Debug("UpdateBackRouteKey start", "LandingPageFacade.UpdateBackRouteKey");

			var LandingPageViewInfo = OneViewSessionStorage.Get("LandingPageViewInfo");

			if (LandingPageViewInfo != null) {

				LandingPageViewInfo = JSON.parse(LandingPageViewInfo);

				LandingPageViewInfo.BackRouteKey = BackRouteKey;

				OneViewSessionStorage.Save("LandingPageViewInfo", JSON.stringify(LandingPageViewInfo));
			}

			OneViewConsole.Debug("UpdateBackRouteKey end", "LandingPageFacade.UpdateBackRouteKey");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "LandingPageFacade.UpdateBackRouteKey", xlatService);
		}
	}

	this.LoadNewDC = function ($event) {

		try {
			OneViewConsole.Debug("LoadNewDC start", "LandingPageFacade.LoadNewDC");

			var oChild = DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex];

			var ProfileDetails = _oDasboardBO.GetProfileDetails(oChild);


			if (oChild.Occurence > 0 && oChild.Occurence == oChild.DCStatusInfo.CompletedCount) {
				//alert(xlatService.xlat("IN-NF-LDP-010 :: Task is inprogress/completed"));
							navigator.notification.alert(xlatService.xlat("IN-NF-LDP-010 :: Task is inprogress/completed"), ['OK'], "");
			}
			//else if (ProfileDetails != null && ProfileDetails.IsProfileValid == true && (oChild.Occurence == -1 || (oChild.Occurence > oChild.DCStatusInfo.OverallCount))) {
			else if (ProfileDetails != null && ProfileDetails.IsProfileValid == true && (ProfileDetails.Occurence == -1 || (ProfileDetails.Occurence > ProfileDetails.TotalDc))) {

				var IsValidationSuccess = _oDasboardBO.TemplateAccessValidationHandler(LandingPageViewInfo);

				if (IsValidationSuccess == true) {

					var ReqObjForNewDCAccessHandler = { IsShowMessage: true, oChild: oChild };
					var _oValidateActionFollowUpBeforeNewDC = new ValidateActionFollowUpBeforeNewDCHandler();
					var NewDCAccessValidationHandlerResponse = _oDasboardBO.NewDCAccessValidationHandler(ReqObjForNewDCAccessHandler);


					if(NewDCAccessValidationHandlerResponse.IsSuccess){

					OneViewSessionStorage.Save("MyAuditEditForm", false);
					OneViewSessionStorage.Save("LandingPageEditForm", true);
					OneViewSessionStorage.Remove("DcId");

					var DCStartRouteKey = "";

					if (oChild.DCPlaceKeyElementIsGroup == false && oChild.TemplateKeyElementIsGroup == false) {

						OneViewSessionStorage.Save("DcPlaceId", oChild.DCPlaceKeyId);
						OneViewSessionStorage.Save("TemplateId", oChild.TemplateKeyId);

						OneViewSessionStorage.Save("DcPlaceName", oChild.DCPlaceKeyName);
						OneViewSessionStorage.Save("TemplateName", oChild.TemplateKeyName);

						OneViewSessionStorage.Save("DcProfileId", oChild.DCProfileId);
						OneViewSessionStorage.Save("DcOccurence", oChild.Occurence);

						MyInstance.UpdateBackRouteKey('/dashboard');
						DCStartRouteKey = oChild.DCStartRouteKey;
					}
					else {
						var ShowNotStartedDCProfiles = 1;
						var ShowInProgressDCProfiles = 0;
						var ShowCompletedDCProfiles = 0;
						var ShowInProgressOrCompletedDCProfiles = 0;
						DCStartRouteKey = oChild.DCStartRouteKey + '&ShowNotStartedDCProfiles=' + ShowNotStartedDCProfiles + '&ShowInProgressDCProfiles=' + ShowInProgressDCProfiles + '&ShowCompletedDCProfiles=' + ShowCompletedDCProfiles + '&ShowInProgressOrCompletedDCProfiles=' + ShowInProgressOrCompletedDCProfiles + '';
						MyInstance.UpdateBackRouteKey(DCStartRouteKey);
					}
					if (OneViewGlobalServiceTypeEnum[OneViewGlobalServiceType] == 18) {
						var IsGeoLocationValidationEnabled = (OneViewLocalStorage.Get("IsGlobalGeoLocationValidationEnabled") != null) ? OneViewLocalStorage.Get("IsGlobalGeoLocationValidationEnabled") : false;

						if (IsGeoLocationValidationEnabled == "true") {
							var IsGeoLocationValid = GeoLocationValidation(oChild.DCPlaceKeyId);
							if (IsGeoLocationValid.IsSuccess == true) {
								$location.url(DCStartRouteKey);
							}
							else {
								navigator.notification.alert(xlatService.xlat(IsGeoLocationValid.MessageKey), ['OK'], "");
							}
						}
						else {

							$location.url(DCStartRouteKey);
						}
					}
					else {
						$location.url(DCStartRouteKey);
					}
					}
					else {
						if (NewDCAccessValidationHandlerResponse.IsActionResolvedIsMandatoryBeforeNewDc == true) {
							navigator.notification.alert(xlatService.xlat('IN-NF-MSE-017 :: Please resolve actions and Continue audit'), ['OK'], "");

							$location.url("nav/my-actions");
						}
						else{


						var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
						oOneViewCordovaPlugin.DefaultConfirmBox("Confirmation", xlatService.xlat("IN-NF-MSE-017 :: Do you want to resolve actions now?"), function (ConfirmationId) {

							if (ConfirmationId == "2") {

								$location.url("nav/my-actions");
								$scope.$apply();

							}
							else {
								OneViewSessionStorage.Save("MyAuditEditForm", false);
								OneViewSessionStorage.Save("LandingPageEditForm", true);
								OneViewSessionStorage.Remove("DcId");

								var DCStartRouteKey = "";

								if (oChild.DCPlaceKeyElementIsGroup == false && oChild.TemplateKeyElementIsGroup == false) {

									OneViewSessionStorage.Save("DcPlaceId", oChild.DCPlaceKeyId);
									OneViewSessionStorage.Save("TemplateId", oChild.TemplateKeyId);

									OneViewSessionStorage.Save("DcPlaceName", oChild.DCPlaceKeyName);
									OneViewSessionStorage.Save("TemplateName", oChild.TemplateKeyName);

									OneViewSessionStorage.Save("DcProfileId", oChild.DCProfileId);
									OneViewSessionStorage.Save("DcOccurence", oChild.Occurence);

									MyInstance.UpdateBackRouteKey('/dashboard');
									DCStartRouteKey = oChild.DCStartRouteKey;
								}
								else {
									var ShowNotStartedDCProfiles = 1;
									var ShowInProgressDCProfiles = 0;
									var ShowCompletedDCProfiles = 0;
									var ShowInProgressOrCompletedDCProfiles = 0;
									DCStartRouteKey = oChild.DCStartRouteKey + '&ShowNotStartedDCProfiles=' + ShowNotStartedDCProfiles + '&ShowInProgressDCProfiles=' + ShowInProgressDCProfiles + '&ShowCompletedDCProfiles=' + ShowCompletedDCProfiles + '&ShowInProgressOrCompletedDCProfiles=' + ShowInProgressOrCompletedDCProfiles + '';
									MyInstance.UpdateBackRouteKey(DCStartRouteKey);
								}
								if (OneViewGlobalServiceTypeEnum[OneViewGlobalServiceType] == 18) {
									var IsGeoLocationValidationEnabled = (OneViewLocalStorage.Get("IsGlobalGeoLocationValidationEnabled") != null) ? OneViewLocalStorage.Get("IsGlobalGeoLocationValidationEnabled") : false;

									if (IsGeoLocationValidationEnabled == "true") {
										var IsGeoLocationValid = GeoLocationValidation(oChild.DCPlaceKeyId);
										if (IsGeoLocationValid.IsSuccess == true) {
											$location.url(DCStartRouteKey);
										}
										else {
											navigator.notification.alert(xlatService.xlat(IsGeoLocationValid.MessageKey), ['OK'], "");
										}
									}
									else {

										$location.url(DCStartRouteKey);
									}
								}
								else {
									$location.url(DCStartRouteKey);
								}
								$scope.$apply();
							}

						});

					}

					}

					//
				}

				else {
					navigator.notification.alert(xlatService.xlat('Please_Complete_Induction'), ['OK'], "");
				}
			}
			//else if (ProfileDetails != null && ProfileDetails.IsProfileValid == true && oChild.Occurence == oChild.DCStatusInfo.OverallCount) {
			else if (ProfileDetails != null && ProfileDetails.IsProfileValid == true && ProfileDetails.Occurence == ProfileDetails.TotalDc) {
				navigator.notification.alert(xlatService.xlat("IN-NF-LDP-010 :: Task is inprogress/completed"), ['OK'], "");
			}
			else {
				navigator.notification.alert(xlatService.xlat("IN-NF-LDP-001 :: No Profile(s) are available. Please download the profile(s) and continue"), ['OK'], "");
			}

			$event.stopPropagation();
			_oDasboardBO.UpdateActionSheet();

			OneViewConsole.Debug("LoadNewDC end", "LandingPageFacade.LoadNewDC");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "LandingPageFacade.LoadNewDC", xlatService);
		}
	}

	var GeoLocationValidation = function (DcPlaceId) {
		try {
			OneViewConsole.Debug("GeoLocationValidation start", "DasboardFacade.GeoLocationValidation");

			var _OneViewGeolocationPlugin = new OneViewGeolocationPlugin();
			var IsSuccess = _OneViewGeolocationPlugin.CheckGeolocation();
			var latitude1 = "", longitude1 = "", latitude2="", longitude2="";
			var Response={"IsSuccess":true,"MessageKey":""};

			//alert('IsSuccess : ' + IsSuccess);
			if (IsSuccess == true) {
				/*oSetDefaultSpinner.Start(xlatService.xlat("Location Search"));
				var CurrentLLocation = _OneViewGeolocationPlugin.GetLatitudeAndLongitude();

				while (CurrentLLocation.Latitude == undefined) {
					CurrentLLocation = _OneViewGeolocationPlugin.GetLatitudeAndLongitude();
				}

				oSetDefaultSpinner.Stop();
				*/
				var CurrentLLocation = _OneViewGeolocationPlugin.GetLatitudeAndLongitude();
				latitude1 = CurrentLLocation.Latitude;
				longitude1 = CurrentLLocation.Longitude;
				if (CurrentLLocation.Latitude == undefined) {
					Response.IsSuccess = false;
					Response.MessageKey = "Location_Search";
				}
				else{
				var _oDefaultTreeDAO = new DefaultTreeDAO();
				var Result = _oDefaultTreeDAO.GetLatitudeAndLongitudeByPlaceId(DcPlaceId);

				if (Result.length > 0) {

					if (Result[0].Latitude != "" && Result[0].Longitude != "") {
						latitude2 = Result[0].Latitude;
						longitude2 = Result[0].Longitude;

						var Request = { "latitude1": latitude1, "longitude1": longitude1, "latitude2": latitude2, "longitude2": longitude2, "units": 'm' };
						var distance = GetLatitudeLongitudeDistance(Request);
						//alert("distance : " + distance);
						var _DistanceSpan = parseFloat(OneViewLocalStorage.Get("LocalStorageDistanceSpan"));
						if (distance > _DistanceSpan) {
							Response.IsSuccess = false;
							Response.MessageKey = "Location_GPS_Mismatch";
						}
					}
				}
			  }
			}
			else {
				Response.IsSuccess = false;
				Response.MessageKey = "Location_notfound";
			}

			return Response;
			OneViewConsole.Debug("GeoLocationValidation end", "DasboardFacade.GeoLocationValidation");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "DasboardFacade.GeoLocationValidation", xlatService);
		}
	}

	var GetLatitudeLongitudeDistance = function (Req) {
		try {
			OneViewConsole.Debug("GetLatitudeLongitudeDistance start", "DasboardFacade.GetLatitudeLongitudeDistance");

			var lat1 = Req.latitude1;
			var lat2 = Req.latitude2;

			var lon1 = Req.longitude1;
			var lon2 = Req.longitude2;

			var Unit = Req.units;

			var R = 6371; // km (change this constant to get miles)
			var dLat = (lat2 - lat1) * Math.PI / 180;
			var dLon = (lon2 - lon1) * Math.PI / 180;
			var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
				Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
				Math.sin(dLon / 2) * Math.sin(dLon / 2);
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
			var d = R * c;

			if (Unit == "km") {
				d = Math.round(d);
			}
			else {
				d = Math.round(d * 1000);
			}

			return d;

			OneViewConsole.Debug("GetLatitudeLongitudeDistance end", "DasboardFacade.GetLatitudeLongitudeDistance");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "DasboardFacade.GetLatitudeLongitudeDistance", xlatService);
		}
	}

	this.LoadViewDC = function ($event) {

		try {
			OneViewConsole.Debug("LoadViewDC start", "LandingPageFacade.LoadViewDC");

			var oChild = DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex];

			var IsProfileExist = _oDasboardBO.IsProfileExist(oChild);

			if (IsProfileExist == true) {

				OneViewSessionStorage.Save("MyAuditEditForm", false);
				OneViewSessionStorage.Save("LandingPageEditForm", true);

				if (oChild.DCPlaceKeyElementIsGroup == false && oChild.TemplateKeyElementIsGroup == false) {

					OneViewSessionStorage.Save("DcPlaceId", oChild.DCPlaceKeyId);
					OneViewSessionStorage.Save("TemplateId", oChild.TemplateKeyId);

					OneViewSessionStorage.Save("DcPlaceName", oChild.DCPlaceKeyName);
					OneViewSessionStorage.Save("TemplateName", oChild.TemplateKeyName);

					OneViewSessionStorage.Save("DcProfileId", oChild.DCProfileId);
					OneViewSessionStorage.Save("DcOccurence", oChild.Occurence);

					MyInstance.UpdateBackRouteKey('/dashboard');

					var DcInfo = _oDasboardBO.GetDcInfo(ServiceId, oChild.DCPlaceKeyId, oChild.TemplateKeyId, LoginUserId);


					if (OneViewSessionStorage.Get("ServiceId") == 36) {
						NavigateToViewDCHandoverCase(ServiceId, oChild.DCPlaceKeyId, oChild.TemplateKeyId, LoginUserId, DcInfo, oChild);
					}
					else {

						if (DcInfo.length == 0) {
							navigator.notification.alert(xlatService.xlat("IN-NF-LDP-001 :: No data available for view or edit"), ['OK'], "");
						}
						else if (DcInfo.length == 1) {

							OneViewSessionStorage.Save("DcId", DcInfo[0].Id);
							OneViewSessionStorage.Save("IsDcCompletedBeforeEdit", DcInfo[0].IsCompleted);
							OneViewSessionStorage.Save("IsDcSynchronizedBeforeEdit", DcInfo[0].IsSynchronized);
							OneViewSessionStorage.Remove("NCInlineEdit");
							OneViewSessionStorage.Remove("ViewRecordsForm");

							//$location.url(oChild.DCStartRouteKey);
							if (OneViewGlobalServiceTypeEnum[OneViewGlobalServiceType] == 18) {
								var IsGeoLocationValidationEnabled = (OneViewLocalStorage.Get("IsGlobalGeoLocationValidationEnabled") != null) ? OneViewLocalStorage.Get("IsGlobalGeoLocationValidationEnabled") : false;
								if (IsGeoLocationValidationEnabled == "true") {
									var IsGeoLocationValid = GeoLocationValidation(oChild.DCPlaceKeyId);
									if (IsGeoLocationValid.IsSuccess == true) {
										$location.url(oChild.DCStartRouteKey);
									}
									else {
										navigator.notification.alert(xlatService.xlat(IsGeoLocationValid.MessageKey), ['OK'], "");
									}
								}
								else {
									$location.url(oChild.DCStartRouteKey);
								}
							}
							else {
								$location.url(oChild.DCStartRouteKey);
							}
						}
						else {

							if (OneViewSessionStorage.Get("ServiceId") == 39 && oChild.TemplateKeyId == 14484) {
							  //  if (oChild.TemplateKeyId == 14484) {
									$location.url(oChild.DCStartRouteKey);
								//}
							}

							else {
								var IsCompleted = '-1';
								var IsSynchronized = '-1';

								var Url = '/ViewRecords?IsCompleted=' + IsCompleted + '&IsSynchronized=' + IsSynchronized + '';

								if (OneViewGlobalServiceTypeEnum[OneViewGlobalServiceType] == 18) {
									var IsGeoLocationValidationEnabled = (OneViewLocalStorage.Get("IsGlobalGeoLocationValidationEnabled") != null) ? OneViewLocalStorage.Get("IsGlobalGeoLocationValidationEnabled") : false;
									if (IsGeoLocationValidationEnabled == "true") {
										var IsGeoLocationValid = GeoLocationValidation(oChild.DCPlaceKeyId);
										if (IsGeoLocationValid.IsSuccess == true) {
											$location.url(Url);
										}
										else {
											navigator.notification.alert(xlatService.xlat(IsGeoLocationValid.MessageKey), ['OK'], "");
										}
									}
									else {
										$location.url(Url);
									}
								}
								else {
									$location.url(Url);
								}
							}
						}
					}
				}
				else {
					var IsCompleted = "-1";
					var IsSynchronized = "-1";
					var IsSubmit="-1";
					var DCViewRouteKey = oChild.DCViewRouteKey;

					var ShowNotStartedDCProfiles = 1;
					var ShowInProgressDCProfiles = 0;
					var ShowCompletedDCProfiles = 0;
					var ShowInProgressOrCompletedDCProfiles = 0;

					if (LandingPageSelectedStatusTypeId == 1 || LandingPageSelectedStatusTypeId == 7) {
						ShowNotStartedDCProfiles = 0;
						ShowInProgressDCProfiles = 0;
						ShowCompletedDCProfiles = 0;
						ShowInProgressOrCompletedDCProfiles = 1;
						IsCompleted = "-1";
						IsSynchronized = "-1";
						IsSubmit = "false";
					}
					else if (LandingPageSelectedStatusTypeId == 2) {
						ShowNotStartedDCProfiles = 1;
						ShowInProgressDCProfiles = 0;
						ShowCompletedDCProfiles = 0;
						ShowInProgressOrCompletedDCProfiles = 0;
						IsCompleted = "-1";
						IsSynchronized = "-1";
						IsSubmit = "false";
					}
					else if (LandingPageSelectedStatusTypeId == 3) {
						ShowNotStartedDCProfiles = 0;
						ShowInProgressDCProfiles = 1;
						ShowCompletedDCProfiles = 0;
						ShowInProgressOrCompletedDCProfiles = 0;
						IsCompleted = "false";
						IsSynchronized = "-1";
						IsSubmit = "false";
					}
					else if (LandingPageSelectedStatusTypeId == 6) {
						ShowNotStartedDCProfiles = 0;
						ShowInProgressDCProfiles = 0;
						ShowCompletedDCProfiles = 1;
						ShowInProgressOrCompletedDCProfiles = 0;
						IsCompleted = "true";
						IsSynchronized = "-1";
						IsSubmit = "false";
					}

					var ProfileDetails = _oDasboardBO.GetProfileDetails(oChild, IsCompleted, IsSynchronized, IsSubmit,false);

					if (ProfileDetails.TotalDc == 0) {

						navigator.notification.alert(xlatService.xlat("IN-NF-LDP-001 :: No data available for view or edit"), ['OK'], "");
					}
					else {
						DCViewRouteKey += '&ShowNotStartedDCProfiles=' + ShowNotStartedDCProfiles + '&ShowInProgressDCProfiles=' + ShowInProgressDCProfiles + '&ShowCompletedDCProfiles=' + ShowCompletedDCProfiles + '&ShowInProgressOrCompletedDCProfiles=' + ShowInProgressOrCompletedDCProfiles + '';

						MyInstance.UpdateBackRouteKey(DCViewRouteKey);
						//$location.url(DCViewRouteKey);

						if (OneViewGlobalServiceTypeEnum[OneViewGlobalServiceType] == 18) {
							var IsGeoLocationValidationEnabled = (OneViewLocalStorage.Get("IsGlobalGeoLocationValidationEnabled") != null) ? OneViewLocalStorage.Get("IsGlobalGeoLocationValidationEnabled") : false;
							if (IsGeoLocationValidationEnabled == "true") {
								var IsGeoLocationValid = GeoLocationValidation(oChild.DCPlaceKeyId);
								if (IsGeoLocationValid.IsSuccess == true) {
									$location.url(DCViewRouteKey);
								}
								else {
									navigator.notification.alert(xlatService.xlat(IsGeoLocationValid.MessageKey), ['OK'], "");
								}
							}
							else {
								$location.url(DCViewRouteKey);
							}
						}
						else {
							$location.url(DCViewRouteKey);
						}
					}
				}
			}
			else {
				navigator.notification.alert(xlatService.xlat("IN-NF-LDP-001 :: No data available for view or edit"), ['OK'], "");
			}

			$event.stopPropagation();
			_oDasboardBO.UpdateActionSheet();

			OneViewConsole.Debug("LoadViewDC end", "LandingPageFacade.LoadViewDC");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "LandingPageFacade.LoadViewDC", xlatService);
		}
	}

	this.WatchMyAudit = function (TabIndex) {

		try {
			OneViewConsole.Debug("WatchMyAudit start", "LandingPageFacade.WatchMyAudit");

			if (TabIndex != "Today") {
				_oDasboardBO.ClearTaskStatus();
			}
			else {
				_oDasboardBO.UpdateTaskStatus(DCTaskViewInfoDTO);
			}

			$scope.TaskContentPast = false;
			$scope.TaskContentToday = false;
			$scope.TaskContentFuture = false;

			$scope["TaskContent" + TabIndex] = true;

			//MyInstance.PageViewChangeEvent();

			OneViewConsole.Debug("WatchMyAudit end", "LandingPageFacade.WatchMyAudit");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "LandingPageFacade.WatchMyAudit", xlatService);
		}
	}

	this.ViewChange = function (ViewName) {

		try {
			OneViewConsole.Debug("ViewChange start", "LandingPageFacade.ViewChange");

			_oDasboardBO.SetByView(ViewName);
			MyInstance.PageLoad();

			OneViewConsole.Debug("ViewChange end", "LandingPageFacade.ViewChange");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "LandingPageFacade.ViewChange", xlatService);
		}
	}

	this.DownloadDCProfile = function ($event) {

		try {
			OneViewConsole.Debug("DownloadDCProfile start", "DasboardFacade.DownloadDCProfile");

			var IsCheckForUpdateRequired = true;
			// Checking network availability
			var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
			var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();
			OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "DasboardFacade.DownLoad");

			// If network is available
			if (NetworkDetails.IsNetworkAvailable == true) {
			  if(OSType == OSTypeEnum.IOS) {
							   IsCheckForUpdateRequired = false;
							   _oDasboardBO.DownloadDCProfile();
					  } else {

				var oAPKUpgradeProcessStatus = OneViewLocalStorage.Get("APKUpgradeProcessStatus");
				var oAPKUpgradeProcessBO = new APKUpgradeProcessBO();
				if (oAPKUpgradeProcessStatus != null) {
					oAPKUpgradeProcessStatus = JSON.parse(oAPKUpgradeProcessStatus);
					oAPKUpgradeProcessBO.SetUpgradeStepCompleted(oOneViewAppInfoPlugin.GetLocalAppInfo().VersionName, oAPKUpgradeProcessStatus.LatestVersion);
					if (oAPKUpgradeProcessStatus.IsAPKUpgradeCompleted != true) {
						IsCheckForUpdateRequired = false;
						$location.url('/APKUpgrade');
					}
					else {
						OneViewLocalStorage.Remove("APKUpgradeProcessStatus");
						//check for update
					}
				}
			  }

				if (IsCheckForUpdateRequired == true) {
					var response = oAPKUpgradeProcessBO.CheckIsUpgradeAvailable();
					if (response.IsUpgradeAvailable == true) {
					   // alert(xlatService.xlat('NewUpdateAvailablePart1') + response.LatestVersion + xlatService.xlat('NewUpdateAvailablePart2') + response.CurrentVersion);
						//download metadata
						var _oAPKUpgradeProcessMetadataDownloadBO = new APKUpgradeProcessMetadataDownloadBO(xlatService);
						var Result = _oAPKUpgradeProcessMetadataDownloadBO.DownloadMetadataFromServer();
						//Metadata downloaded , then go to APKUpgradePage
						if (Result.IsSuccess == true) {
							var IsUpgradeSkipAllowed = oAPKUpgradeProcessBO.CheckUpgradeSkipAllowed(response.CurrentVersion, Result.APKUpgradeProcessMetadata);
							//alert('IsUpgradeSkipAllowed : ' + IsUpgradeSkipAllowed);
							var IsOperationAccessAllowed = oAPKUpgradeProcessBO.ValidationForAPKUpgradeProcess("IsAllowDcProfileDownload");

							var NewUpdateMsg = oAPKUpgradeProcessBO.FormUpgradeStartMessage(xlatService);
							if (IsUpgradeSkipAllowed == true) {

								var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
								oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Confirmation'), xlatService.xlat(NewUpdateMsg + '\n\nDo you want to continue ?'), function (ConfirmationId) {

									if (ConfirmationId == "2") {
										if (IsOperationAccessAllowed == true) {
											navigator.notification.alert(('OperationAccessPermissionKey = IsAllowDcProfileDownload  , IsOperationAccessAllowed = ' + IsOperationAccessAllowed + ' , Not implemented exception.'), ['OK'], "");
										}
										else {
											//navigate to upgrade
											$location.url('/APKUpgrade');
											$scope.$apply();
										}
									}
									else {
										////Download
										_oDasboardBO.DownloadDCProfile();
									}

								});
							}
							else {
								alert(NewUpdateMsg);

								if (IsOperationAccessAllowed == true) {
									navigator.notification.alert(('OperationAccessPermissionKey = IsAllowDcProfileDownload  , IsOperationAccessAllowed = ' + IsOperationAccessAllowed + ' , Not implemented exception.'), ['OK'], "");
								}
								else {
									//navigate to upgrade
									$location.url('/APKUpgrade');
								}
							}
						}
						else {
							//go to error page
							$location.url('/notifycall?MessageKey=' + Result.Message);
						}
					}
					else {
						////Download
						_oDasboardBO.DownloadDCProfile();
					}
				}

			}
			else {
				navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
				OneViewConsole.Info("No Internet Connection", "DasboardFacade.DownLoadProfile");
			}

			$event.stopPropagation();

			OneViewConsole.Debug("DownloadDCProfile end", "LandingPageFacade.DownloadDCProfile");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.DownloadDCProfile", Excep);
		}
		finally {
		}
	}

	this.UploadDC = function ($event) {

		try {
			OneViewConsole.Debug("UploadDC start", "LandingPageFacade.UploadDC");

			var IsCheckForUpdateRequired = true;
			// Network status checking
			var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
			var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();

			if (NetworkStatus.IsNetworkAvailable == true) {
			  if(OSType == OSTypeEnum.IOS) {
				IsCheckForUpdateRequired = false;
				_oDasboardBO.UploadDC();
			  } else {
				var oAPKUpgradeProcessStatus = OneViewLocalStorage.Get("APKUpgradeProcessStatus");
				var oAPKUpgradeProcessBO = new APKUpgradeProcessBO();
				if (oAPKUpgradeProcessStatus != null) {
					oAPKUpgradeProcessStatus = JSON.parse(oAPKUpgradeProcessStatus);
					oAPKUpgradeProcessBO.SetUpgradeStepCompleted(oOneViewAppInfoPlugin.GetLocalAppInfo().VersionName, oAPKUpgradeProcessStatus.LatestVersion);
					if (oAPKUpgradeProcessStatus.IsAPKUpgradeCompleted != true) {
						IsCheckForUpdateRequired = false;
						$location.url('/APKUpgrade');
					}
					else {
						OneViewLocalStorage.Remove("APKUpgradeProcessStatus");
						//check for update
					}
				}
			  }

				if (IsCheckForUpdateRequired == true) {
					var response = oAPKUpgradeProcessBO.CheckIsUpgradeAvailable();
					if (response.IsUpgradeAvailable == true) {

						//alert(xlatService.xlat('NewUpdateAvailablePart1') + response.LatestVersion + xlatService.xlat('NewUpdateAvailablePart2') + response.CurrentVersion);
						//download metadata
						var _oAPKUpgradeProcessMetadataDownloadBO = new APKUpgradeProcessMetadataDownloadBO(xlatService);
						var Result = _oAPKUpgradeProcessMetadataDownloadBO.DownloadMetadataFromServer();

						//Metadata downloaded , then go to APKUpgradePage
						if (Result.IsSuccess == true) {
							var IsUpgradeSkipAllowed = oAPKUpgradeProcessBO.CheckUpgradeSkipAllowed(response.CurrentVersion, Result.APKUpgradeProcessMetadata);
							//alert('IsUpgradeSkipAllowed : ' + IsUpgradeSkipAllowed);
							var NewUpdateMsg = oAPKUpgradeProcessBO.FormUpgradeStartMessage(xlatService);
							var IsOperationAccessAllowed = oAPKUpgradeProcessBO.ValidationForAPKUpgradeProcess("IsAllowDcUpload");

							if (IsUpgradeSkipAllowed == true) {

								var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
								oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Confirmation'), xlatService.xlat(NewUpdateMsg + '\n\nDo you want to continue ?'), function (ConfirmationId) {

									if (ConfirmationId == "2") {
										if (IsOperationAccessAllowed == true) {
											alert('OperationAccessPermissionKey = IsAllowDcUpload  , IsOperationAccessAllowed = ' + IsOperationAccessAllowed + ' , Not implemented exception.');
										}
										else {
											$location.url('/APKUpgrade');
											$scope.$apply();
										}
									}
									else {
										////Upload
										_oDasboardBO.UploadDC();
									}
								});
							}
							else {

								alert(NewUpdateMsg);
								if (IsOperationAccessAllowed == true) {
									alert('OperationAccessPermissionKey = IsAllowDcUpload  , IsOperationAccessAllowed = ' + IsOperationAccessAllowed + ' , Not implemented exception.');
								}
								else {
									//navigate to upgrade
									$location.url('/APKUpgrade');
								}
							}
						}
						else {
							//go to error page
							$location.url('/notifycall?MessageKey=' + Result.Message);
						}
					}
					else {
						////Upload
						_oDasboardBO.UploadDC();
					}
				}


			}
			else {
				alert(xlatService.xlat('NoInternetConnection'));
				OneViewConsole.Info("No internet connection", "LandingPageFacade.Upload");
			}

			$event.stopPropagation();
			_oDasboardBO.UpdateActionSheet();

			OneViewConsole.Debug("UploadDC end", "LandingPageFacade.UploadDC");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.UploadDC", Excep);
		}
		finally {
		}
	}

	this.CheckApprovedStatusForUploadingDC = function (IsBulkUpload) {

		try {
			OneViewConsole.Debug("CheckApprovedStatusForUploadingDC start", "LandingPageFacade.CheckApprovedStatusForUploadingDC");

			var IsDCApproved = true;

			var TotalRecordsToApprove = 0;
			var ApprovalProfileReq = {
				ServiceId: OneViewSessionStorage.Get("ServiceId"),
				UserId: OneViewSessionStorage.Get("LoginUserId"),
				TemplateNodeId: "",
				PlaceId: "",
				DcPlaceDimension: 16,//Need to access from oChild
				DCPlaceRCOType: "",
				DCPlaceKeyElementIsGroup: false,
				TemplateKeyElementIsGroup: false,
				DcClientGuidLst: [],
			}

			if (IsBulkUpload != undefined && IsBulkUpload ==true) {
				var _oDcDAO = new DcDAO();
				var _oDcFilterParamRequest = new DcFilterParamRequest();
				_oDcFilterParamRequest.SystemUserId = OneViewSessionStorage.Get("LoginUserId");;
				_oDcFilterParamRequest.IsSynchronized = false;


				var DcCount = _oDcDAO.GetDCCountWithFilters(_oDcFilterParamRequest);

				if (DcCount > 0) {
					var DcPlaceIdTemplateIdList = _oDcDAO.GetAllDcPlaceIdTemplateId(OneViewSessionStorage.Get("LoginUserId"), OneViewSessionStorage.Get("ServiceId"));
					var _BusinessEventEntityBO = new BusinessEventEntityBO();
					var BusinessEventTemplateList = _BusinessEventEntityBO.GetTemplateIdDetailsOfBussinessEvent(OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("LoginUserId"),"DasboardBO","IsUploadButtonHandlerMetadataExist");
					for (var i = 0; i < DcPlaceIdTemplateIdList.length; i++) {
						var TemplateId = DcPlaceIdTemplateIdList[i].TemplateId;
						var DcPlaceId = DcPlaceIdTemplateIdList[i].DcPlaceId;

						var NeedToCheckApproveExist = false;

						if (BusinessEventTemplateList.length > 0) {
							if (BusinessEventTemplateList.indexOf(parseInt(TemplateId)) != -1) {
								NeedToCheckApproveExist = true;
							}
						}
						else {
							NeedToCheckApproveExist = true;
						}

						if (NeedToCheckApproveExist == true) {
							ApprovalProfileReq.TemplateNodeId = TemplateId;
							ApprovalProfileReq.PlaceId = DcPlaceId;
							var _oDcApprovalBO = new DcApprovalBO();
							var ApprovalInfoResponse = _oDcApprovalBO.GetApprovalInfo(ApprovalProfileReq);
							TotalRecordsToApprove += ApprovalInfoResponse.length;

							if (TotalRecordsToApprove > 0) {
								IsDCApproved = false;
							}
							else if (TotalRecordsToApprove == 0) {
								//   IsDCApproved = false;
								var _DCDAO = new DcDAO();
								var count = _DCDAO.GetPendingRecordsCount(TemplateId, DcPlaceId, OneViewSessionStorage.Get("LoginUserId"), OneViewSessionStorage.Get("ServiceId"));
								if (count > 0) {
									IsDCApproved = false;
								}

							}
						}
					}

				}


			}
			else {

				var oParent = DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex]
				var oChild = oParent.DCTaskDetaillst[LandingPageViewInfo.ChildIndex];

				ApprovalProfileReq.TemplateNodeId = oChild.TemplateKeyId;
				ApprovalProfileReq.PlaceId = oChild.DCPlaceKeyId;

				ApprovalProfileReq.DCPlaceKeyElementIsGroup = oChild.DCPlaceKeyElementIsGroup;
				ApprovalProfileReq.TemplateKeyElementIsGroup = oChild.TemplateKeyElementIsGroup;
				ApprovalProfileReq.DCPlaceRCOType = oChild.DCPlaceRCOType;
				ApprovalProfileReq.AttributeGroupType = oChild.AttributeGroupType;

				var _oDcApprovalBO = new DcApprovalBO();
				var ApprovalInfoResponse = _oDcApprovalBO.GetApprovalInfo(ApprovalProfileReq);

				TotalRecordsToApprove = ApprovalInfoResponse.length;

				if (TotalRecordsToApprove > 0) {
					IsDCApproved = false;
				}
			}







			OneViewConsole.Debug("CheckApprovedStatusForUploadingDC end", "LandingPageFacade.CheckApprovedStatusForUploadingDC");

			return IsDCApproved;
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.CheckApprovedStatusForUploadingDC", Excep);
		}
		finally {
		}
	}

	var GetTemplateIdLstForBulkUpload = function (IsBulkUpload) {

		try {
			OneViewConsole.Debug("GetTemplateIdLstForBulkUpload start", "LandingPageFacade.GetTemplateIdLstForBulkUpload");

			var IsDCApproved = true;
			var TemplateIdList = [];

			var TotalRecordsToApprove = 0;
			var ApprovalProfileReq = {
				ServiceId: OneViewSessionStorage.Get("ServiceId"),
				UserId: OneViewSessionStorage.Get("LoginUserId"),
				TemplateNodeId: "",
				PlaceId: "",
				DcPlaceDimension: 16,//Need to access from oChild
				DCPlaceRCOType: "",
				DCPlaceKeyElementIsGroup: false,
				TemplateKeyElementIsGroup: false,
				DcClientGuidLst: [],
			}

			if (IsBulkUpload != undefined && IsBulkUpload == true) {
				var _oDcDAO = new DcDAO();
				var _oDcFilterParamRequest = new DcFilterParamRequest();
				_oDcFilterParamRequest.SystemUserId = OneViewSessionStorage.Get("LoginUserId");;
				_oDcFilterParamRequest.IsSynchronized = false;


				var DcCount = _oDcDAO.GetDCCountWithFilters(_oDcFilterParamRequest);

				if (DcCount > 0) {
					var DcPlaceIdTemplateIdList = _oDcDAO.GetAllDcPlaceIdTemplateId(OneViewSessionStorage.Get("LoginUserId"), OneViewSessionStorage.Get("ServiceId"));
					for (var i = 0; i < DcPlaceIdTemplateIdList.length; i++) {
						TemplateIdList.push(DcPlaceIdTemplateIdList[i].TemplateId);

					}

				}


			}

			OneViewConsole.Debug("GetTemplateIdLstForBulkUpload end", "LandingPageFacade.GetTemplateIdLstForBulkUpload");

			return TemplateIdList;
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.GetTemplateIdLstForBulkUpload", Excep);
		}
		finally {
		}
	}

	this.SyncTask = function () {

		try {
			OneViewConsole.Debug("SyncTask start", "LandingPageFacade.SyncTask");

			var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
			var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();
			OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "DasboardFacade.SyncTask");

			// If network is available
			if (NetworkDetails.IsNetworkAvailable == true) {

				var Query = "Select count(DataCaptureEntity.Id) As TotalRecords From DataCaptureEntity" +
							" INNER JOIN DcResultsEntity ON DataCaptureEntity.Id = DcResultsEntity.DataCaptureId where DcResultsEntity.SystemUserId = " + LoginUserId +
							" And DataCaptureEntity.ServiceId = " + ServiceId + " And DataCaptureEntity.IsSynchronized = 'false'";

				var _OneViewSqlitePlugin = new OneViewSqlitePlugin();
				var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

				if (Result.length > 0 && Result[0].TotalRecords == 0) {

					var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
					oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Navigate_confirm_Title'), xlatService.xlat('Are you sure, you want to synchronize the task ?'), function (ConfirmationId) {

						if (ConfirmationId == "2") {

							oSetDefaultSpinner.Start();

							var _oLandingPageViewReponseBO = new LandingPageViewReponseBO(xlatService);
							var IsSuccess = _oLandingPageViewReponseBO.Download();

							if (IsSuccess == true) {

								var _oDcProfileSyncStatusBO = new DcProfileSyncStatusBO();
								var IsDcProfileSyncStatus = _oDcProfileSyncStatusBO.Download(xlatService);

								MyInstance.Init();
								MyInstance.PageLoad();

								navigator.notification.alert(xlatService.xlat("IN-NF-LDP-002 :: Task synchronized successfully"), ['OK'], "");
							}
							else if (IsSuccess != null && IsSuccess == false) {
								navigator.notification.alert(xlatService.xlat("IN-NF-LDP-003 :: Task synchronization failed"), ['OK'], "");
							}

							oSetDefaultSpinner.Stop();
						}
					});
				}
				else {
					navigator.notification.alert(xlatService.xlat("IN-NF-LDP-004 :: Please upload all the data captures and try again"), ['OK'], "");
				}
			}
			else {
				navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
				OneViewConsole.Info("No Internet Connection", "DasboardFacade.SyncTask");
			}

			OneViewConsole.Debug("SyncTask end", "LandingPageFacade.SyncTask");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.SyncTask", Excep);
		}
		finally {
		}
	}

	this.PageViewChangeEvent = function () {

		try {
			OneViewConsole.Debug("PageViewChangeEvent start", "LandingPageFacade.PageViewChangeEvent");

			if ($scope.MyAudit == "Today") {

				oSetDefaultSpinner.Start();

				var Value = _oDOM.GetValue('ViewDropdown');

				if (Value != "") {
					_oDasboardBO.SetByView(Value);
					MyInstance.PageLoad();
				}

				oSetDefaultSpinner.Stop();
			}

			OneViewConsole.Debug("PageViewChangeEvent end", "LandingPageFacade.PageViewChangeEvent");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.PageViewChangeEvent", Excep);
		}
		finally {
		}
	}

	this.ClickBulkUpload = function () {

		try {
			OneViewConsole.Debug("ClickBulkUpload start", "LandingPageFacade.ClickBulkUpload");

			var EnableUpload = true;
			var TemplateIdLst=GetTemplateIdLstForBulkUpload(true);
			var UploadButtonHandlerObj = { RequiredBusinessEventHandlerObjectKeys: "DisableUploadIfNotApproved", TemplateId: TemplateIdLst };
			if (_oDasboardBO.IsUploadButtonHandlerMetadataExist(UploadButtonHandlerObj) == true) {
				EnableUpload = MyInstance.CheckApprovedStatusForUploadingDC(true);
			}
			if (EnableUpload == true) {
				// Network status checking
				var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
				var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();

				if (NetworkStatus.IsNetworkAvailable == true) {
					//IsBulkUploadEnabled = true;
					//var _oOneViewAutoUploadPlugin = new OneViewAutoUploadPlugin();
					//_oOneViewAutoUploadPlugin.Start();
					var _oUploadBO = new UploadBO(xlatService, '');
					var UploadResponse = _oUploadBO.AutoUpload(true);
					if (UploadResponse != undefined && (UploadResponse.IsSuccess == true && UploadResponse.DCCount > 0)) {

						MyInstance.Init();
						MyInstance.PageLoad();
					}
				}
				else {
					navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
					OneViewConsole.Info("No internet connection", "LandingPageFacade.Upload");
				}
			}
			else {
				navigator.notification.alert(xlatService.xlat('Please complete and approve Datacapture before Upload'), ['OK'], "");
			}

			OneViewConsole.Debug("ClickBulkUpload end", "LandingPageFacade.ClickBulkUpload");
		}
		catch (Excep) {
			//IsBulkUploadEnabled = false;
			throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.ClickBulkUpload", Excep);
		}
		finally {
			//IsBulkUploadEnabled = false;
		}
	}

	this.BulkDownload = function () {

		try {
			OneViewConsole.Debug("BulkDownload start", "LandingPageFacade.BulkDownload");

			var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
			oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Navigate_confirm_Title'), xlatService.xlat('Download_confirm_Message'), function (ConfirmationId) {

				if (ConfirmationId == "2") {
					/*
					var FilterParams = {
						OSGuid: ServiceId,
						UserId: LoginUserId,
						TemplateId: [],
						FromDate: '',
						ToDate: '',
						DcPlaceDimension: 16,
						DcPlaceIds: [],
						IsDCPlaceGroup: false,
						IsTemplateGroup: false,
						IsOnDeviceApprovalProfileNeeded: IsOnDeviceApprovalProfileNeeded,
						DCPlaceRCOType: -1
					}

					var _oProfileDownloadFacade = new ProfileDownloadFacade();
					var IsDefaultProfiledownloadSuccess = _oProfileDownloadFacade.DefaultProfiledownload(FilterParams, $scope, xlatService, '', '', $location);

					if (IsDefaultProfiledownloadSuccess == true) {

						alert(xlatService.xlat("IN-SU-LNP-001 :: Profile(s) downloaded successfully"));

						oSetDefaultSpinner.Start();

						MyInstance.PageLoad();

						oSetDefaultSpinner.Stop();
					}   */
					MyInstance.BulkDownloadConform();
				}

			});

			OneViewConsole.Debug("BulkDownload end", "LandingPageFacade.BulkDownload");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("Facade", "LandingPageFacade.BulkDownload", Excep);
		}
		finally {
		}
	}

	this.BulkDownloadConform = function (IsPageLoadRequired) {

		try {
			OneViewConsole.Debug("BulkDownload start", "LandingPageFacade.BulkDownload");


					var FilterParams = {
						OSGuid: ServiceId,
						UserId: LoginUserId,
						TemplateId: [],
						FromDate: '',
						ToDate: '',
						DcPlaceDimension: 16,
						DcPlaceIds: [],
						IsDCPlaceGroup: false,
						IsTemplateGroup: false,
						IsOnDeviceApprovalProfileNeeded: IsOnDeviceApprovalProfileNeeded,
						DCPlaceRCOType: -1
					}

					var _oProfileDownloadFacade = new ProfileDownloadFacade();
					var IsDefaultProfiledownloadSuccess = _oProfileDownloadFacade.DefaultProfiledownload(FilterParams, $scope, xlatService, '', '', $location);

					if (IsDefaultProfiledownloadSuccess == true) {
						if (IsPageLoadRequired == undefined && IsPageLoadRequired != false) {

							navigator.notification.alert(xlatService.xlat("IN-SU-LNP-001 :: Profile(s) downloaded successfully"), ['Ok'], "");


							oSetDefaultSpinner.Start();


							MyInstance.PageLoad(false);

							oSetDefaultSpinner.Stop();
						}
					}


			OneViewConsole.Debug("BulkDownload end", "LandingPageFacade.BulkDownload");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("Facade", "LandingPageFacade.BulkDownload", Excep);
		}
		finally {
		}
	}

	this.UpdateFloatingBtnStatus = function () {

		try {
			OneViewConsole.Debug("UpdateFloatingBtnStatus start", "LandingPageFacade.UpdateFloatingBtnStatus");

			var CurrentTabName = "Overall";
			var CurrentStatusId = "OverallStatus";
			var ClassBadge = "badge-over-all";
			if (LandingPageSelectedStatusTypeId == 2) {
				CurrentStatusId = "NotStartedStatus";
				CurrentTabName = "Not Started";
				ClassBadge = "badge-not-started";
			}
			else if (LandingPageSelectedStatusTypeId == 3) {
				CurrentStatusId = "InProgressStatus";
				CurrentTabName = "In Progress";
				ClassBadge = "badge-in-progress";
			}
			else if (LandingPageSelectedStatusTypeId == 5) {
				CurrentStatusId = "NotSyncedStatus";
				CurrentTabName = "Not Synced";
				ClassBadge = "badge-not-synced";
			}
			else if (LandingPageSelectedStatusTypeId == 6) {
				CurrentStatusId = "CompletedStatus";
				CurrentTabName = "Completed";
				ClassBadge = "badge-completed";
			}
			else if (LandingPageSelectedStatusTypeId == 7) {
				CurrentStatusId = "SyncedStatus";
				CurrentTabName = "Synced";
				ClassBadge = "badge-synced";
			}
			_oDOM.AddInnerHtml('CurrentStatus', _oDOM.GetInnerHtml(CurrentStatusId + "_" + OneViewGlobalDeviceDisplyMode));
			_oDOM.SetAttributeValue('StatusTypeFloatingBtn', 'data-mfb-label', CurrentTabName);
			_oDOM.RemoveAllClass("StatusTypeFloatingBtn");
			_oDOM.AddClass("StatusTypeFloatingBtn", "mfb-component__button--main " + ClassBadge);

			OneViewConsole.Debug("UpdateFloatingBtnStatus end", "LandingPageFacade.UpdateFloatingBtnStatus");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.UpdateFloatingBtnStatus", Excep);
		}
		finally {
		}
	}

	this.ToggleDivSmallDeviceStatusBar = function () {

		try {
			OneViewConsole.Debug("ToggleDivSmallDeviceStatusBar start", "LandingPageFacade.ToggleDivSmallDeviceStatusBar");

			var oDivSmallDeviceStatusBar = _oDOM.GetObjectById('DivSmallDeviceStatusBar');

			if (oDivSmallDeviceStatusBar != null) {

				if (_oDOM.GetAttributeValueByObj(oDivSmallDeviceStatusBar, 'data-mfb-state') == 'open') {
					_oDOM.SetAttributeValueByObj(oDivSmallDeviceStatusBar, 'data-mfb-state', 'closed');
				}
				else {
					_oDOM.SetAttributeValueByObj(oDivSmallDeviceStatusBar, 'data-mfb-state', 'open');
				}
			}

			OneViewConsole.Debug("ToggleDivSmallDeviceStatusBar end", "LandingPageFacade.ToggleDivSmallDeviceStatusBar");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.ToggleDivSmallDeviceStatusBar", Excep);
		}
		finally {
		}
	}

	this.CloseDivSmallDeviceStatusBar = function () {

		try {
			OneViewConsole.Debug("ToggleMenu start", "LandingPageFacade.ToggleMenu");

			var oDivSmallDeviceStatusBar = _oDOM.GetObjectById('DivSmallDeviceStatusBar');

			if (oDivSmallDeviceStatusBar != null) {

				if (_oDOM.GetAttributeValueByObj(oDivSmallDeviceStatusBar, 'data-mfb-state') == 'open') {
					_oDOM.SetAttributeValueByObj(oDivSmallDeviceStatusBar, 'data-mfb-state', 'closed');
				}
			}

			OneViewConsole.Debug("ToggleMenu end", "LandingPageFacade.ToggleMenu");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.ToggleMenu", Excep);
		}
		finally {
		}
	}

	var BulkUpload = function () {
		try {
			OneViewConsole.Debug("BulkUpload start", "DasboardFacade.BulkUpload");

			// Network status checking
			var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
			var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();

			if (NetworkStatus.IsNetworkAvailable == true) {

				var EnableAutoUpload = (OneViewLocalStorage.Get("IsAutoUploadEnabled") != null) ? OneViewLocalStorage.Get("IsAutoUploadEnabled") : false;

				if (EnableAutoUpload == "true") {
					var _oUploadBO = new UploadBO(xlatService, '');
					var UploadResponse = _oUploadBO.AutoUpload();


					if (UploadResponse != undefined && (UploadResponse.IsSuccess == true && UploadResponse.DCCount > 0)) {

						var _oLandingPageViewReponseBO = new LandingPageViewReponseBO(xlatService);
						_oLandingPageViewReponseBO.DeleteLandingPageViewReponse();
					}
				}
			}

			OneViewConsole.Debug("BulkUpload end", "DasboardFacade.BulkUpload");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "DasboardFacade.BulkUpload", xlatService);
		}
	}

	var LandingPageAutoSync = function () {
		try {
			OneViewConsole.Debug("LandingPageAutoSync start", "DasboardFacade.LandingPageAutoSync");

			// Network status checking
			var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
			var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();

			if (NetworkStatus.IsNetworkAvailable == true) {

				var IsGlobalLandingpagedailysyncEnabled = (OneViewLocalStorage.Get("IsGlobalLandingpagedailysyncEnabled") != null) ? OneViewLocalStorage.Get("IsGlobalLandingpagedailysyncEnabled") : false;

				if (IsGlobalLandingpagedailysyncEnabled == "true") {

					var LastsyncDate = "";
					var _oLandingPageViewReponseDAO = new LandingPageViewReponseDAO();
					var LandingPageViewLst = _oLandingPageViewReponseDAO.GetAllViewsByServiceAndUserId(ServiceId, LoginUserId);

					if (LandingPageViewLst.length > 0) {
						LastsyncDate = LandingPageViewLst[0].LastsyncDate;
					}

					var IsValidationSuccess = false;
					if (LastsyncDate != "") {

						if (new Date().getDate() - new DateTime().GetDateByString(LastsyncDate).getDate() > 0) {
							IsValidationSuccess = true;
						}
					}

					if (ServiceId == 52) {
						IsValidationSuccess = true;
					}

					if (IsValidationSuccess == true) {

						var _oUploadBO = new UploadBO(xlatService, '');
						var UploadResponse = _oUploadBO.AutoUpload();

						if (UploadResponse != undefined && (UploadResponse.IsSuccess == true)) {

							var _oLandingPageViewReponseBO = new LandingPageViewReponseBO(xlatService);
							_oLandingPageViewReponseBO.DeleteLandingPageViewReponse();

							if (ServiceId == 52) {
								var _oLandingPageViewReponseBO = new LandingPageViewReponseBO(xlatService);
								var LandingPageViewReponseIsSuccess = _oLandingPageViewReponseBO.Download();

								if (LandingPageViewReponseIsSuccess == true) {

									var _oDcProfileSyncStatusBO = new DcProfileSyncStatusBO();
									var IsDcProfileSyncStatus = _oDcProfileSyncStatusBO.Download(xlatService);

									//MyInstance.Init();
									//MyInstance.PageLoad();

								  //  alert(xlatService.xlat("IN-NF-LDP-002 :: Task synchronized successfully"));
								}
							}


						}
					}
				}
			}

			OneViewConsole.Debug("LandingPageAutoSync end", "DasboardFacade.LandingPageAutoSync");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "DasboardFacade.LandingPageAutoSync", xlatService);
		}
	}

	this.ApproveDC = function ($event) {

		try {
			OneViewConsole.Debug("ApproveDC start", "LandingPageFacade.ApproveDC");

			var oChild = DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex];

			var IsProfileExist = _oDasboardBO.IsProfileExist(oChild);

			if (IsProfileExist == true) {

				var ApprovalProfileReq = {
					ServiceId: OneViewSessionStorage.Get("ServiceId"),
					UserId: OneViewSessionStorage.Get("LoginUserId"),
					TemplateNodeId: "",
					PlaceId: "",
					DcPlaceDimension: 16,//Need to access from oChild
					DCPlaceRCOType: "",
					DCPlaceKeyElementIsGroup: false,
					TemplateKeyElementIsGroup: false,
					DcClientGuidLst: [],
				}

				ApprovalProfileReq.TemplateNodeId = oChild.TemplateKeyId;
				ApprovalProfileReq.PlaceId = oChild.DCPlaceKeyId;

				ApprovalProfileReq.DCPlaceKeyElementIsGroup = oChild.DCPlaceKeyElementIsGroup;
				ApprovalProfileReq.TemplateKeyElementIsGroup = oChild.TemplateKeyElementIsGroup;
				ApprovalProfileReq.DCPlaceRCOType = oChild.DCPlaceRCOType;
				ApprovalProfileReq.AttributeGroupType = oChild.AttributeGroupType;

				var _oDcApprovalBO = new DcApprovalBO();
				var ApprovalInfoResponse = _oDcApprovalBO.GetApprovalInfo(ApprovalProfileReq);

				if (ApprovalInfoResponse.length == 0) {

					navigator.notification.alert(xlatService.xlat("IN-NF-LDP-001 :: No data available for approve"), ['OK'], "");
				}
				else if (ApprovalInfoResponse.length==1) {
					DcOnDeviceApprovalInfoLst = ApprovalInfoResponse;
					$location.url('/my-approval');
				}
				else if (ApprovalInfoResponse.length > 1) {
					DcOnDeviceApprovalInfoLst = [];
					$scope.MultipleDcApprovalShow = true;
					DcApprovalInfoList = ApprovalInfoResponse;
					_oMultipleDcApprovalBO.LoadHtml('DivDcToApproveId');
				}

			}
			else {
				navigator.notification.alert(xlatService.xlat("IN-NF-LDP-001 :: No data available for approve"), ['OK'], "");
			}

			$event.stopPropagation();
			_oDasboardBO.UpdateActionSheet();

			OneViewConsole.Debug("ApproveDC end", "LandingPageFacade.ApproveDC");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "LandingPageFacade.ApproveDC", xlatService);
		}
		finally {
		}
	}

	this.ApproveMultipleDC = function () {
		try {
			OneViewConsole.Debug("ApproveMultipleDC start", "LandingPageFacade.ApproveMultipleDC");

			if (DcOnDeviceApprovalInfoLst.length == 0) {
				navigator.notification.alert(xlatService.xlat("IN-NF-LDP-011 :: Approval profile not available"), ['OK'], "");
			}
			else if (DcOnDeviceApprovalInfoLst.length > 0) {

				var _oDcApprovalBO = new DcApprovalBO();
				var PreValidationStatus = _oDcApprovalBO.PreValidation(DcOnDeviceApprovalInfoLst);
				if (PreValidationStatus == false) {
					$location.url('/my-approval');
				}
			}


			OneViewConsole.Debug("ApproveMultipleDC end", "LandingPageFacade.ApproveMultipleDC");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.ApproveMultipleDC", Excep);
		}
		finally {
		}
	}

	this.CloseMultipleDcApproval = function () {

		try {
			OneViewConsole.Debug("CloseMultipleDcApproval start", "LandingPageFacade.CloseMultipleDcApproval");

			 $scope.MultipleDcApprovalShow = false;
			 DcOnDeviceApprovalInfoLst = [];

			 _oMultipleDcApprovalBO.DestroyHtml('DivDcToApproveId');

			OneViewConsole.Debug("CloseMultipleDcApproval end", "LandingPageFacade.CloseMultipleDcApproval");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.CloseMultipleDcApproval", Excep);
		}
		finally {
		}
	}

	this.SelectDC = function (Id) {

		try {
			OneViewConsole.Debug("SelectDC start", "LandingPageFacade.SelectDC");

			_oMultipleDcApprovalBO.SelectDC(Id);

			OneViewConsole.Debug("SelectDC end", "LandingPageFacade.SelectDC");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.SelectDC", Excep);
		}
		finally {
		}
	}

	this.SyncMaster = function () {

		try {
			OneViewConsole.Debug("SyncMaster start", "LandingPageFacade.SyncMaster");


			var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
			var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();
			OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkStatus), "LandingPageFacade.SyncMaster");

			if (NetworkStatus.IsNetworkAvailable == true) {

				var _oTaskSyncLogDAO = new TaskSyncLogDAO();
				var ModifiedEntityList = _oTaskSyncLogDAO.GetAllUnSyncedTasksDetails();

				if (ModifiedEntityList != null && ModifiedEntityList.length > 0) {
					oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Navigate_confirm_Title'), xlatService.xlat('SyncMaster_confirm_Message'), function (ConfirmationId) {

						if (ConfirmationId == "2") {

							var _oOneViewSqlitePlugin = new OneViewSqlitePlugin();

							try {
								_oOneViewSqlitePlugin.StartTransaction();

								var _SyncFrameworkBO = new SyncFrameworkBO();
								var DownloadMastersResponse = _SyncFrameworkBO.DownloadMasters(ModifiedEntityList, xlatService);
							  //  var LocalSyncResponse;
								var ServerSyncResponse;

								if (DownloadMastersResponse.IsSuccess == true) {
								 //   LocalSyncResponse = _SyncFrameworkBO.UpdateListLocalSyncStatus(ModifiedEntityList);

								  //  if (LocalSyncResponse.IsSuccess == true) {
										ServerSyncResponse = _SyncFrameworkBO.UpdateServerSyncStatus();

								  //  }
								}
								else {
									_oOneViewSqlitePlugin.Rollback();
									if(DownloadMastersResponse.IsSuccess !=null){
										navigator.notification.alert(xlatService.xlat(DownloadMastersResponse.Message), ['OK'], "");
									}
								}


								if (DownloadMastersResponse.IsSuccess == true && ServerSyncResponse.IsSuccess == true) { //LocalSyncResponse.IsSuccess== true &&
									_oOneViewSqlitePlugin.EndTransaction();
									navigator.notification.alert(xlatService.xlat(ServerSyncResponse.Message), ['OK'], "");
								}
							}
							catch (Excep) {
								_oOneViewSqlitePlugin.Rollback();
								navigator.notification.alert(xlatService.xlat("Sync master and metadata failed"), ['OK'], "");
							}
						}
					});
				}
				else {
					navigator.notification.alert(xlatService.xlat('No Data to Synchronize.'), ['OK'], "");
				}


			}
			else {
				navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
				OneViewConsole.Info("No Internet Connection", "LandingPageFacade.SyncMaster");
			}

			OneViewConsole.Debug("SyncMaster end", "LandingPageFacade.SyncMaster");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.SyncMaster", Excep);
		}
		finally {
		}
	}

	this.AutomaticSyncMaster = function () {
		try {
			OneViewConsole.Debug("AutomaticSyncMaster start", "LandingPageFacade.AutomaticSyncMaster");

			var _SyncFrameworkBO = new SyncFrameworkBO();
			var Response = _SyncFrameworkBO.AutomaticSyncMaster();

		   // alert('Response : ' + JSON.stringify(Response));
			OneViewConsole.Debug("AutomaticSyncMaster end", "LandingPageFacade.AutomaticSyncMaster");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "DasboardFacade.AutomaticSyncMaster", xlatService);
		}
		finally {
		}
	}

	this.GraphSearch = function () {
		try {
			OneViewConsole.Debug("GraphSearch start", "DasboardFacade.GraphSearch");

			if ($scope.GraphSearchElement == "") {
				$scope.BtnClearGraphSearchElementShow = false;
			}
			else {
				$scope.BtnClearGraphSearchElementShow = true;
			}

			oSetDefaultSpinner.Start();

			MyInstance.PageLoad();

			oSetDefaultSpinner.Stop();

			OneViewConsole.Debug("GraphSearch end", "DasboardFacade.GraphSearch");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "DasboardFacade.GraphSearch", xlatService);
		}
	}

	this.AdvFilterChange = function ($compile, snapRemote) {
		try {
			OneViewConsole.Debug("AdvFilterChange start", "DasboardFacade.AdvFilterChange");

			//LoadFilterData();
			//LoadFilterHtml($compile, snapRemote);

			OneViewConsole.Debug("AdvFilterChange end", "DasboardFacade.AdvFilterChange");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "DasboardFacade.AdvFilterChange", xlatService);
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
			oOneViewExceptionHandler.Catch(Excep, "DasboardFacade.LoadFilterHtml", xlatService);
		}
	}

	var LoadFilterData = function () {
		try {
			OneViewConsole.Debug("LoadFilterData start", "DasboardFacade.LoadFilterData");

			if($scope.FilterData.length == 0){

				if (DCTaskViewInfoDTO != null) {

					var DCTaskDTOList = DCTaskViewInfoDTO.DCTaskDTOList;

					for (var i = 0; i < DCTaskDTOList.length; i++) {

						$scope.FilterData.push({"DisplayName": DCTaskDTOList[i].GroupName, selected: "", ExpressionId: DCTaskDTOList[i].GroupName});
					}
				}
			}

			OneViewConsole.Debug("LoadFilterData end", "DasboardFacade.LoadFilterData");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("FrameWork", "DasboardFacade.LoadFilterData", Excep);
		}
	}

	this.FilterDataChanged = function (obj) {

		try {
			OneViewConsole.Debug("FilterDataChanged Start", "DasboardFacade.FilterDataChanged");

			for (var itr in $scope.FilterData) {

				if ($scope.FilterData[itr].DisplayName == obj.DisplayName) {

					//$scope.FilterData[itr].selected = "";
				}
			}

			OneViewConsole.Debug("FilterDataChanged End", "DasboardFacade.FilterDataChanged");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "DasboardFacade.FilterDataChanged", xlatService);
		}
	}

	this.CloseGrigFilter = function ($compile, snapRemote) {
		try {
			OneViewConsole.Debug("CloseGrigFilter start", "DasboardFacade.CloseGrigFilter");

			var oOneViewSidePanel = new OneViewSidePanel();
			oOneViewSidePanel.Toggle(snapRemote);
			oOneViewSidePanel.Clear();

			OneViewConsole.Debug("CloseGrigFilter end", "DasboardFacade.CloseGrigFilter");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "DasboardFacade.CloseGrigFilter", xlatService);
		}
	}

	this.ApplyFilter = function (snapRemote) {
		try {
			OneViewConsole.Debug("ApplyFilter start", "DasboardFacade.ApplyFilter");

			var _oOneViewSidePanel = new OneViewSidePanel();
			_oOneViewSidePanel.Toggle(snapRemote);

			oSetDefaultSpinner.Start();

			MyInstance.PageLoad();

			oSetDefaultSpinner.Stop();

			OneViewConsole.Debug("ApplyFilter end", "DasboardFacade.ApplyFilter");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "DasboardFacade.ApplyFilter", xlatService);
		}
	}

	this.ClearGraphSearchElement = function () {
		try {
			OneViewConsole.Debug("ClearGraphSearchElement start", "DasboardFacade.ClearGraphSearchElement");

			if ($scope.GraphSearchElement != "") {

				$scope.GraphSearchElement = "";
				$scope.BtnClearGraphSearchElementShow = false;

				oSetDefaultSpinner.Start();

				MyInstance.PageLoad();

				oSetDefaultSpinner.Stop();
			}

			OneViewConsole.Debug("ClearGraphSearchElement end", "DasboardFacade.ClearGraphSearchElement");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "DasboardFacade.ClearGraphSearchElement", xlatService);
		}
	}


	var NavigateToViewDCHandoverCase = function (ServiceId, DcPlaceId, TemplateId, UserId, DcInfo, oChild) {

		try {
			OneViewConsole.Debug("NavigateToViewDCHandoverCase start", "DasboardFacade.NavigateToViewDCHandoverCase");

			var TotalDcCount = 0;
			//alert('OneViewSessionStorage.Get("ServiceId") : ' + OneViewSessionStorage.Get("ServiceId"));
			var CurrentUserDcCount = DcInfo.length;
			var _oDcDAO = new DcDAO();
			var HandoverRecords = _oDcDAO.GetHandoverRecordsForLandingPage(TemplateId, DcPlaceId, UserId, ServiceId);

		   // alert('HandoverRecords  : ' + JSON.stringify(HandoverRecords))
			var HandoverRecordsCount = 0;
			if (HandoverRecords != null && HandoverRecords != undefined) {
				HandoverRecordsCount = HandoverRecords.length;
			}

		   // alert(CurrentUserDcCount + ' , CurrentUserDcCount   , NavigateToViewDCHandoverCase HandoverRecordsCount : ' + HandoverRecordsCount);
			if (HandoverRecordsCount != null && HandoverRecordsCount > 0) {
				TotalDcCount = parseInt(CurrentUserDcCount) + parseInt(HandoverRecordsCount);
			}
			else {
				TotalDcCount = TotalDcCount + parseInt(CurrentUserDcCount);
			}

		   // alert('DcInfo : ' + JSON.stringify(DcInfo));

			if (TotalDcCount == 0) {
				navigator.notification.alert(xlatService.xlat("IN-NF-LDP-001 :: No data available for view or edit"), ['OK'], "");
			}
			else if (TotalDcCount == 1) {
			   // alert('in TotalDcCount : ' + TotalDcCount);

				var AllDcInfo= null
				if (DcInfo == null || DcInfo.length <= 0) {
					AllDcInfo = HandoverRecords;
				}
				else {
					AllDcInfo = DcInfo;
				}

			   // alert('AllDcInfo : ' + JSON.stringify(AllDcInfo));
				OneViewSessionStorage.Save("DcId", AllDcInfo[0].Id);
				OneViewSessionStorage.Save("IsDcCompletedBeforeEdit", AllDcInfo[0].IsCompleted);
				OneViewSessionStorage.Save("IsDcSynchronizedBeforeEdit", AllDcInfo[0].IsSynchronized);
				OneViewSessionStorage.Remove("NCInlineEdit");
				OneViewSessionStorage.Remove("ViewRecordsForm");

				//$location.url(oChild.DCStartRouteKey);
				$location.url(oChild.DCStartRouteKey);

			}
			else {
			   // alert('TemplateId : ' + TemplateId);
				if (TemplateId == 14026 || TemplateId == 14217 || TemplateId == 14227 || TemplateId == 14235 || TemplateId == 14245 || TemplateId == 14254
					|| TemplateId == 14261 || TemplateId == 14268 || TemplateId == 14278 || TemplateId == 14287 || TemplateId == 14293) {
					$location.url(oChild.DCStartRouteKey);
				}
				else {
					var IsCompleted = '-1';
					var IsSynchronized = '-1';

					var Url = '/ViewRecords?IsCompleted=' + IsCompleted + '&IsSynchronized=' + IsSynchronized + '';
					$location.url(Url);
				}
			}

			OneViewConsole.Debug("NavigateToViewDCHandoverCase end", "DasboardFacade.NavigateToViewDCHandoverCase");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "DasboardFacade.NavigateToViewDCHandoverCase", xlatService);
		}
	}

}

// DasboardBO
function DasboardBO($scope, $document, xlatService, $timeout, $location, $templateCache, $compile, snapRemote) {

	var MyInstance = this;
	var _oDOM = new DOM();
	var _oDateTime = new DateTime();
	var _oLandingPageViewReponseDAO = new LandingPageViewReponseDAO();
	var _oLandingPageViewReponseBO = new LandingPageViewReponseBO(xlatService);
	var _oDcProfileDAO = new DcProfileDAO();
	var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

	var ServiceId = OneViewSessionStorage.Get("ServiceId");
	var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

	this.LoadHtml = function (DCTaskViewInfoDTO, StatusType) {

		try {
			OneViewConsole.Debug("LoadHtml start", "DasboardBO.LoadHtml");

			if (DCTaskViewInfoDTO != null) {

				var Html = '';
				var CurrentTab = 'TaskContent' + $scope.MyAudit;

				_oDOM.RemoveInnerHtml(CurrentTab);

				Html = GetHtml(DCTaskViewInfoDTO, StatusType);

				if (Html != '') {
					var _oOneViewCompiler = new OneViewCompiler();
					_oOneViewCompiler.CompileAndApeend($scope, $compile, Html, CurrentTab);
				}
			}

			OneViewConsole.Debug("LoadHtml end", "DasboardBO.LoadHtml");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "DasboardBO.LoadHtml", Excep);
		}
		finally {
		}
	}

	this.UpdateTaskStatus = function (DCTaskViewInfoDTO) {

		try {
			OneViewConsole.Debug("UpdateTaskStatus start", "DasboardBO.UpdateTaskStatus");

			if (DCTaskViewInfoDTO != null) {

				_oDOM.AddInnerHtml('OverallStatus_' + OneViewGlobalDeviceDisplyMode, DCTaskViewInfoDTO.OverallCount + DCTaskViewInfoDTO.NotStartedCount);
				_oDOM.AddInnerHtml('NotStartedStatus_' + OneViewGlobalDeviceDisplyMode, DCTaskViewInfoDTO.NotStartedCount);
				_oDOM.AddInnerHtml('InProgressStatus_' + OneViewGlobalDeviceDisplyMode, DCTaskViewInfoDTO.InProgressCount);
				_oDOM.AddInnerHtml('MissedStatus_' + OneViewGlobalDeviceDisplyMode, DCTaskViewInfoDTO.MissedCount);
				_oDOM.AddInnerHtml('NotSyncedStatus_' + OneViewGlobalDeviceDisplyMode, DCTaskViewInfoDTO.NotSyncedCount);
				_oDOM.AddInnerHtml('CompletedStatus_' + OneViewGlobalDeviceDisplyMode, DCTaskViewInfoDTO.CompletedCount);
				_oDOM.AddInnerHtml('SyncedStatus_' + OneViewGlobalDeviceDisplyMode, DCTaskViewInfoDTO.SyncedCount);
				_oDOM.AddInnerHtml('ApprovedStatus_' + OneViewGlobalDeviceDisplyMode, DCTaskViewInfoDTO.ApprovedCount);
			}

			OneViewConsole.Debug("UpdateTaskStatus end", "DasboardBO.UpdateTaskStatus");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "DasboardBO.UpdateTaskStatus", Excep);
		}
		finally {
		}
	}

	this.ClearTaskStatus = function () {

		try {
			OneViewConsole.Debug("ClearTaskStatus start", "DasboardBO.ClearTaskStatus");

			_oDOM.AddInnerHtml('OverallStatus_' + OneViewGlobalDeviceDisplyMode, 0);
			_oDOM.AddInnerHtml('NotStartedStatus_' + OneViewGlobalDeviceDisplyMode, 0);
			_oDOM.AddInnerHtml('InProgressStatus_' + OneViewGlobalDeviceDisplyMode, 0);
			_oDOM.AddInnerHtml('MissedStatus_' + OneViewGlobalDeviceDisplyMode, 0);
			_oDOM.AddInnerHtml('NotSyncedStatus_' + OneViewGlobalDeviceDisplyMode, 0);
			_oDOM.AddInnerHtml('CompletedStatus_' + OneViewGlobalDeviceDisplyMode, 0);
			_oDOM.AddInnerHtml('SyncedStatus_' + OneViewGlobalDeviceDisplyMode, 0);
			_oDOM.AddInnerHtml('ApprovedStatus_' + OneViewGlobalDeviceDisplyMode, 0);

			OneViewConsole.Debug("ClearTaskStatus end", "DasboardBO.ClearTaskStatus");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "DasboardBO.ClearTaskStatus", Excep);
		}
		finally {
		}
	}

	this.LoadViews = function () {

		try {
			OneViewConsole.Debug("LoadViews start", "DasboardBO.LoadViews");

			var LandingPageViewName = "";
			var LandingPageViewInfo = OneViewSessionStorage.Get("LandingPageViewInfo");

			if (LandingPageViewInfo != null) {

				LandingPageViewInfo = JSON.parse(LandingPageViewInfo);
				LandingPageViewName = LandingPageViewInfo.LandingPageViewName;
			}

			var LandingPageViewLst = _oLandingPageViewReponseDAO.GetAllViewsByServiceAndUserId(ServiceId, LoginUserId);

			var OptionsHtml = '';

			for (var i = 0; i < LandingPageViewLst.length; i++) {

				if (LandingPageViewName != "" && LandingPageViewLst[i].LandingPageViewName == LandingPageViewName) {
					OptionsHtml += '<option selected>' + LandingPageViewLst[i].LandingPageViewName + '</option>';
				}
				else {
					OptionsHtml += '<option>' + LandingPageViewLst[i].LandingPageViewName + '</option>';
				}
			}

			_oDOM.AddInnerHtml('ViewDropdown', OptionsHtml);

			if (LandingPageViewLst.length > 0) {
				_oDOM.AddInnerHtml("TaskSyncStatus", LandingPageViewLst[0].LastsyncDate);
			}

			OneViewConsole.Debug("LoadViews end", "DasboardBO.LoadViews");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "DasboardBO.LoadViews", Excep);
		}
		finally {
		}
	}

	this.SetByView = function (ViewName) {

		try {
			OneViewConsole.Debug("SetByView start", "DasboardBO.SetByView");

			var LandingPageViewReponse = _oLandingPageViewReponseDAO.GetByServiceUserAndLandingPageViewName(ServiceId, LoginUserId, ViewName);

			if (LandingPageViewReponse.length > 0) {

				IsOnDeviceApprovalProfileNeeded = (LandingPageViewReponse[0].IsOnDeviceApprovalProfileNeeded == "true") ? true : false;
				LandingPageViewDisplayConfig = (LandingPageViewReponse[0].LandingPageViewDisplayConfig != "") ? JSON.parse(LandingPageViewReponse[0].LandingPageViewDisplayConfig) : null;

				if ($scope.MyAudit == "Past") {
					DCTaskViewInfoDTO = JSON.parse(LandingPageViewReponse[0].LandingPageViewReponsePast);
				}
				if ($scope.MyAudit == "Today") {
					DCTaskViewInfoDTO = JSON.parse(LandingPageViewReponse[0].LandingPageViewReponseToday);
				}
				else {
					DCTaskViewInfoDTO = JSON.parse(LandingPageViewReponse[0].LandingPageViewReponseFuture);
				}
			}

			LandingPageViewInfo.LandingPageViewName = ViewName;

			//alert(JSON.stringify(DCTaskViewInfoDTO));

			OneViewConsole.Debug("SetByView end", "DasboardBO.SetByView");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "DasboardBO.SetByView", Excep);
		}
		finally {
		}
	}

	this.Download = function () {

		try {
			OneViewConsole.Debug("Download start", "DasboardBO.Download");

			var _DefaultMasterDAO = new DefaultMasterDAO("LandingPageViewReponseEntity");
			var IsTableExist = _DefaultMasterDAO.IsTableExist();

			var IsExistLandingPageViewReponse = false;

			if (IsTableExist == true) {
				IsExistLandingPageViewReponse = _oLandingPageViewReponseBO.IsExistLandingPageViewReponse();
			}

			if (IsExistLandingPageViewReponse == false) {

				IsExistLandingPageViewReponse = _oLandingPageViewReponseBO.Download();
			}

			OneViewConsole.Debug("Download end", "DasboardBO.Download");

			return IsExistLandingPageViewReponse
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "DasboardBO.Download", Excep);
		}
		finally {
		}
	}

	this.DownloadDCProfile = function () {

		try {
			OneViewConsole.Debug("DownloadDCProfile start", "DasboardBO.DownloadDCProfile");

			var oParent = DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex]
			var oChild = oParent.DCTaskDetaillst[LandingPageViewInfo.ChildIndex];

			var FilterParams = {
				OSGuid: ServiceId,
				UserId: LoginUserId,
				TemplateId: [],
				FromDate: '',
				ToDate: '',
				DcPlaceDimension: 0,
				DcPlaceIds: [],
				IsDCPlaceGroup: false,
				IsTemplateGroup: false,
				IsOnDeviceApprovalProfileNeeded: false,
				DCPlaceRCOType: -1
			}

			FilterParams.TemplateId.push(oChild.TemplateKeyId);
			FilterParams.DcPlaceIds.push(oChild.DCPlaceKeyId);
			FilterParams.DcPlaceDimension = oChild.DCPlaceKeyDimension;
			FilterParams.IsDCPlaceGroup = oChild.DCPlaceKeyElementIsGroup;
			FilterParams.IsTemplateGroup = oChild.TemplateKeyElementIsGroup;
			FilterParams.IsOnDeviceApprovalProfileNeeded = IsOnDeviceApprovalProfileNeeded;
			FilterParams.DCPlaceRCOType = oChild.DCPlaceRCOType;

			if (oChild.Occurence > 0 && oChild.Occurence == oChild.DCStatusInfo.CompletedCount) {
				navigator.notification.alert(xlatService.xlat("IN-NF-LDP-010 :: Task is inprogress/completed"), ['OK'], "");
			}

			var IsValidationSuccess = MyInstance.TemplateAccessValidationHandler(LandingPageViewInfo);

			if (IsValidationSuccess == true) {
				//else if (oChild.TemplateKeyElementIsGroup == false) {

				oSetDefaultSpinner.Start();

				var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
				oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Navigate_confirm_Title'), xlatService.xlat('Download_confirm_Message'), function (ConfirmationId) {

					if (ConfirmationId == "2") {

						var _oProfileDownloadFacade = new ProfileDownloadFacade();
						var IsDefaultProfiledownloadSuccess = _oProfileDownloadFacade.DefaultProfiledownload(FilterParams, $scope, xlatService, '', '', $location);

						if (IsDefaultProfiledownloadSuccess == true) {

							navigator.notification.alert(xlatService.xlat("IN-SU-LNP-001 :: Profile(s) downloaded successfully"), ['Ok'], "");

							MyInstance.SetByView(LandingPageViewInfo.LandingPageViewName);
							MyInstance.UpdateTaskStatus(DCTaskViewInfoDTO);
							MyInstance.LoadHtml(DCTaskViewInfoDTO, LandingPageSelectedStatusTypeId);
							MyInstance.UpdateActionSheet();
							$scope.$apply();
						}
					}
					oSetDefaultSpinner.Stop();
				});
				//}
			}
			else {
				navigator.notification.alert(xlatService.xlat('Please_Complete_Induction'), ['OK'], "");
			}
			OneViewConsole.Debug("DownloadDCProfile end", "DasboardBO.DownloadDCProfile");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "DasboardBO.DownloadDCProfile", Excep);
		}
		finally {
		}
	}

	this.UploadDC = function () {

		try {
			OneViewConsole.Debug("UploadDC start", "DasboardBO.UploadDC");

			var oChild = DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex];

			//if (oChild.TemplateKeyElementIsGroup == false) {

				MyAuditUploadProgressValue = 0;
				MyAuditUploadBatchNumber = 1;

				var _oDcFilterParamRequest = new DcFilterParamRequest();
				var _oDcDAO = new DcDAO();

				if (oChild.DCPlaceKeyElementIsGroup == false && oChild.TemplateKeyElementIsGroup == false) {

					_oDcFilterParamRequest = MakeDcFilterRequestForPlaceAndTemplate(oChild);
					MyAuditTotalDCCountForUpload = _oDcDAO.GetDCCountWithFilters(_oDcFilterParamRequest);
				}
				else {//if (oChild.DCPlaceKeyElementIsGroup == true && oChild.TemplateKeyElementIsGroup == false) {

					_oDcFilterParamRequest = MakeDcFilterRequestForPlaceGroupAndTemplate(oChild);
					MyAuditTotalDCCountForUpload = _oDcDAO.GetDCCountWithFiltersAdv(_oDcFilterParamRequest);
				}

				var TotalBatches = MyAuditTotalDCCountForUpload / MyAuditUploadLimit;
				TotalBatches = Math.ceil(TotalBatches);

				MyAuditUploadProgressValue = 100 / TotalBatches;

				if (MyAuditTotalDCCountForUpload > 0) {

					var IsSuccess = UploadDC(_oDcFilterParamRequest);

					if (IsSuccess == true) {

						oSetDefaultSpinner.Start();

						if (oChild.DCPlaceKeyElementIsGroup == false && oChild.TemplateKeyElementIsGroup == false) {

							ExcecuteGarbageCollector(oChild.TemplateKeyId, oChild.DCPlaceKeyId);
						}
						else if (oChild.DCPlaceKeyElementIsGroup == true && oChild.TemplateKeyElementIsGroup == false) {

							var DcPlaceChildResult = _oDcDAO.GetDcPlaceIdsByPlaceGroupAndDCPlaceRCOType(oChild.DCPlaceKeyId, oChild.DCPlaceRCOType);

							for (var i = 0; i < DcPlaceChildResult.length; i++) {

								ExcecuteGarbageCollector(oChild.TemplateKeyId, DcPlaceChildResult[i].Id);
							}
						}
						else if (oChild.DCPlaceKeyElementIsGroup == false && oChild.TemplateKeyElementIsGroup == true) {

							var DcTemplateChildResult = _oDcDAO.GetDcTemplateIdsByTemplateGroupAndAttributeGroupType(oChild.TemplateKeyId, oChild.AttributeGroupType);

							for (var i = 0; i < DcTemplateChildResult.length; i++) {

								ExcecuteGarbageCollector(DcTemplateChildResult[i].Id, oChild.DCPlaceKeyId);
							}
						}
						else if (oChild.DCPlaceKeyElementIsGroup == true && oChild.TemplateKeyElementIsGroup == true) {

							var DcTemplateChildResult = _oDcDAO.GetDcTemplateIdsByTemplateGroupAndAttributeGroupType(oChild.TemplateKeyId, oChild.AttributeGroupType);
							var DcPlaceChildResult = _oDcDAO.GetDcPlaceIdsByPlaceGroupAndDCPlaceRCOType(oChild.DCPlaceKeyId, oChild.DCPlaceRCOType);

							for (var i = 0; i < DcTemplateChildResult.length; i++) {

								for (var j = 0; j < DcPlaceChildResult.length; j++) {

									ExcecuteGarbageCollector(DcTemplateChildResult[i].Id, DcPlaceChildResult[j].Id);
								}
							}
						}

						MyInstance.UpdateSyncStatus(oChild);
						MyInstance.SetByView(LandingPageViewInfo.LandingPageViewName);
						MyInstance.UpdateTaskStatus(DCTaskViewInfoDTO);
						MyInstance.LoadHtml(DCTaskViewInfoDTO, LandingPageSelectedStatusTypeId);

						oSetDefaultSpinner.Stop();

					   // CheckForNewUpdates();
					}
				}
				else {
					//toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('NoDataForUpload'));
					navigator.notification.alert(xlatService.xlat('NoDataForUpload'), ['OK'], "");
					OneViewConsole.Info("No dc available", "DasboardBO.UploadDcAndAction");
				}
			//}

			OneViewConsole.Debug("UploadDC end", "DasboardBO.UploadDC");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "DasboardBO.UploadDC", Excep);
		}
		finally {
		}
	}

	this.DownlaodActionFollowUpDetails = function (Req) {

		try {
			OneViewConsole.Debug("DownlaodActionFollowUpDetails start", "DasboardBO.DownlaodActionFollowUpDetails");

			var oParent = DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex];
			var oChild = oParent.DCTaskDetaillst[LandingPageViewInfo.ChildIndex];

			var FilterParams = {
				OSGuid: ServiceId,
				UserId: LoginUserId,
				TemplateId: [],
				FromDate: '',
				ToDate: '',
				DcPlaceDimension: 0,
				DcPlaceIds: [],
				IsDCPlaceGroup: false,
				IsTemplateGroup: false,
				IsOnDeviceApprovalProfileNeeded: false,
				DCPlaceRCOType: -1
			}

			FilterParams.TemplateId.push(oChild.TemplateKeyId);
			FilterParams.DcPlaceIds.push(oChild.DCPlaceKeyId);
			FilterParams.DcPlaceDimension = oChild.DCPlaceKeyDimension;
			FilterParams.IsDCPlaceGroup = oChild.DCPlaceKeyElementIsGroup;
			FilterParams.IsTemplateGroup = oChild.TemplateKeyElementIsGroup;
			FilterParams.IsOnDeviceApprovalProfileNeeded = IsOnDeviceApprovalProfileNeeded;
			FilterParams.DCPlaceRCOType = oChild.DCPlaceRCOType;

			var _oValidateActionFollowUpBeforeNewDC = new ValidateActionFollowUpBeforeNewDCHandler(xlatService);
			var ReqObjForValidateActionFollowUpBeforeNewDC = { TemplateIdLst: FilterParams.TemplateId, IsTemplateValidationRequired: Req.IsTemplateValidationRequired };

			if (_oValidateActionFollowUpBeforeNewDC.IsNeedToValidateActionFollowUpBeforeNewDC(ReqObjForValidateActionFollowUpBeforeNewDC)) {

				_oValidateActionFollowUpBeforeNewDC.Download(FilterParams, xlatService, "false");

			}

			OneViewConsole.Debug("DownlaodActionFollowUpDetails end", "DasboardBO.DownlaodActionFollowUpDetails");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "DasboardBO.DownlaodActionFollowUpDetails", Excep);
		}
		finally {
		}
	}


	var MakeDcFilterRequestForPlaceAndTemplate = function (oChild) {

		try {
			OneViewConsole.Debug("MakeDcFilterRequestForPlaceAndTemplate start", "LandingPageFacade.MakeDcFilterRequestForPlaceAndTemplate");

			var _oDcFilterParamRequest = new DcFilterParamRequest();
			_oDcFilterParamRequest.DcPlaceId = oChild.DCPlaceKeyId;
			_oDcFilterParamRequest.TemplateNodeId = oChild.TemplateKeyId;
			_oDcFilterParamRequest.SystemUserId = LoginUserId;
			_oDcFilterParamRequest.DcPlaceName = "";
			_oDcFilterParamRequest.IsSynchronized = false;
			//_oDcFilterParamRequest.ApprovalStatus = false;

			OneViewConsole.Debug("MakeDcFilterRequestForPlaceAndTemplate end", "LandingPageFacade.MakeDcFilterRequestForPlaceAndTemplate");

			return _oDcFilterParamRequest;
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.MakeDcFilterRequest", Excep);
		}
		finally {
		}
	}

	var MakeDcFilterRequestForPlaceGroupAndTemplate = function (oChild) {

		try {
			OneViewConsole.Debug("MakeDcFilterRequestForPlaceGroupAndTemplate start", "LandingPageFacade.MakeDcFilterRequestForPlaceGroupAndTemplate");

			var _oDcFilterParamRequest = new DcFilterParamRequest();
			_oDcFilterParamRequest.DcPlaceId = oChild.DCPlaceKeyId;
			_oDcFilterParamRequest.TemplateNodeId = oChild.TemplateKeyId;
			_oDcFilterParamRequest.SystemUserId = LoginUserId;
			_oDcFilterParamRequest.DcPlaceName = "";
			_oDcFilterParamRequest.IsSynchronized = false;
			//_oDcFilterParamRequest.ApprovalStatus = false;
			_oDcFilterParamRequest.IsDCPlaceGroup = oChild.DCPlaceKeyElementIsGroup;
			_oDcFilterParamRequest.IsTemplateGroup = oChild.TemplateKeyElementIsGroup;
			_oDcFilterParamRequest.DCPlaceRCOType = oChild.DCPlaceRCOType;
			_oDcFilterParamRequest.AttributeGroupType = oChild.AttributeGroupType;

			OneViewConsole.Debug("MakeDcFilterRequestForPlaceGroupAndTemplate end", "LandingPageFacade.MakeDcFilterRequestForPlaceGroupAndTemplate");

			return _oDcFilterParamRequest;
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.MakeDcFilterRequestForPlaceGroupAndTemplate", Excep);
		}
		finally {
		}
	}

	var UploadDC = function (_oDcFilterParamRequest) {

		try {
			OneViewConsole.Debug("UploadDC start", "LandingPageFacade.UploadDC");

			var Message = xlatService.xlat('Upload_confirm_Message');

			var MultiMediaValidationResponse = MultiMediaValidation();
			if (MultiMediaValidationResponse.IsSuccess == false) {
				Message = xlatService.xlat(MultiMediaValidationResponse.MessageKey) ;
			}

			var IsSuccess = false;

			oOneViewProgressbar.Start(xlatService.xlat("Uploading"));
			var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
			oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Navigate_confirm_Title'), Message, function (ConfirmationId) {
				if (ConfirmationId == "2") {

					if (MultiMediaValidationResponse.IsSuccess == false) {
						DeleteUnAvailableMultiMediaSubElements(MultiMediaValidationResponse.ValidationFailedMultiMediaSubElements);
					}

					var _oUploadBO = new UploadBO(xlatService, '');

					var _oDcPendingTaskBO = new DcPendingTaskBO();
					_oDcPendingTaskBO.Download();

					var IsMultiMediaSubElementsSuccess = _oUploadBO.UploadMultiMediaSubElements();

					if (IsMultiMediaSubElementsSuccess != null && IsMultiMediaSubElementsSuccess == true) {

						var IsSyncDynamicRcoAndAssetNodesSuccess = _oUploadBO.SyncDynamicRcoAndAssetNodes(true);

						if (IsSyncDynamicRcoAndAssetNodesSuccess != null && IsSyncDynamicRcoAndAssetNodesSuccess == true) {

							IsSuccess = _oUploadBO.BatchUploadAdv(_oDcFilterParamRequest);
						}
						else if (IsSyncDynamicRcoAndAssetNodesSuccess != null && IsSyncDynamicRcoAndAssetNodesSuccess == false) {
							navigator.notification.alert(xlatService.xlat('UploadFailed'), ['OK'], "");
							IsSuccess = false;
						}
					}
					else if (IsMultiMediaSubElementsSuccess != null && IsMultiMediaSubElementsSuccess == false) {
						navigator.notification.alert(xlatService.xlat('UploadFailed'), ['OK'], "");
						IsSuccess = false;
					}
				}
				oOneViewProgressbar.Stop();
			});

			OneViewConsole.Debug("UploadDC end", "LandingPageFacade.UploadDC");

			return IsSuccess;
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.UploadDC", Excep);
		}
		finally {
		}
	}

	var MultiMediaValidation = function () {

		try {
			OneViewConsole.Debug("MultiMediaValidation start", "LandingPageFacade.MultiMediaValidation");

			var Result = { IsSuccess: true, MessageKey: "", ValidationFailedMultiMediaSubElements: [] };

			var _oMultiMediaSubElementsDAO = new MultiMediaSubElementsDAO();
			var Response = _oMultiMediaSubElementsDAO.GetAllMultiMediaUnSyncMultiMediaSubElement();

			var _OneViewAppInfoPlugin = new OneViewAppInfoPlugin();
			//var ValidationFailedMultiMediaSubElements = [];
			var IsFileExist = true;


			for (var i = 0; i < Response.length; i++) {
				var IsFileExist = _OneViewAppInfoPlugin.IsFileExist(Response[i].LocalURL.substring(7));
				if (IsFileExist == false) {
					Result.ValidationFailedMultiMediaSubElements.push(Response[i]);
				}
			}

			if (Result.ValidationFailedMultiMediaSubElements.length > 0) {
				Result.IsSuccess = false;
				//Result.MessageKey = "IN-MG-LDP-001 :: File not exist In local.Are you sure you want to Upload?";
				Result.MessageKey = "Upload_confirm_Message_ForMultiMediaValidation";
			}
			//alert("Result : " + JSON.stringify(Result));
			OneViewConsole.Debug("MultiMediaValidation end", "LandingPageFacade.MultiMediaValidation");
			return Result;

		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.MultiMediaValidation", Excep);
		}
		finally {
		}
	}

	var DeleteUnAvailableMultiMediaSubElements = function (ValidationFailedMultiMediaSubElementsLst) {

		try {
			OneViewConsole.Debug("DeleteUnAvailableMultiMediaSubElements start", "LandingPageFacade.DeleteUnAvailableMultiMediaSubElements");

			if (ValidationFailedMultiMediaSubElementsLst.length > 0) {
				var _oMultiMediaSubElements = new DefaultMasterDAO("MultiMediaSubElements");
				var MultiMediaSubElementsList = _oMultiMediaSubElements.DeleteByProperty(ValidationFailedMultiMediaSubElementsLst, "Id", "INT");
			}

			OneViewConsole.Debug("DeleteUnAvailableMultiMediaSubElements end", "LandingPageFacade.DeleteUnAvailableMultiMediaSubElements");

		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.DeleteUnAvailableMultiMediaSubElements", Excep);
		}
		finally {
		}
	}

	var ExcecuteGarbageCollector = function (TemplateId, DcPlaceId) {

			try {
				OneViewConsole.Debug("ExcecuteGarbageCollector start", "LandingPageFacade.ExcecuteGarbageCollector");

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

				OneViewConsole.Debug("ExcecuteGarbageCollector end", "LandingPageFacade.ExcecuteGarbageCollector");
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.UploadDC", Excep);
			}
			finally {
			}
		}


	var CheckForNewUpdates = function () {

		try {
			OneViewConsole.Debug("CheckForNewUpdates start", "LandingPageFacade.CheckForNewUpdates");

			var _oOneViewAppConfig = new OneViewAppConfig();
			_oOneViewAppConfig.CheckForNewUpdates('');

			OneViewConsole.Debug("CheckForNewUpdates end", "LandingPageFacade.CheckForNewUpdates");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.CheckForNewUpdates", Excep);
		}
		finally {
		}
	}

	this.IsProfileExist = function (oChild) {

		try {
			OneViewConsole.Debug("IsProfileExist start", "DasboardBO.IsProfileExist");

			var IsProfileExist = false;

			var ProfileDetails = MyInstance.GetProfileDetails(oChild);

			if (ProfileDetails != null) {
				IsProfileExist = ProfileDetails.IsProfileValid;
			}

			OneViewConsole.Debug("IsProfileExist end", "DasboardBO.IsProfileExist");

			return IsProfileExist;
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "DasboardBO.IsProfileExist", Excep);
		}
		finally {
		}
	}

	this.GetDcInfo = function (ServiceId, DcPlaceId, TemplateId, LoginUserId) {

		try {
			OneViewConsole.Debug("GetDcInfo start", "DasboardBO.GetDcInfo");

			var Query = "";

			// Temperaryly added for Elcita release (As per discussion with harshil).
			// Need to replace once handover feature enabed from landing page.
			if (ServiceId == 18) {

				Query = "SELECT DataCaptureEntity.* FROM  DataCaptureEntity" +
						" WHERE DataCaptureEntity.ServiceId=" + ServiceId + " AND DataCaptureEntity.DcPlaceId=" + DcPlaceId + " AND DataCaptureEntity.TemplateNodeId=" + TemplateId +
						" AND DataCaptureEntity.IsSubmit != 'true'";
			}
			else {
				Query = "SELECT DataCaptureEntity.* FROM  DataCaptureEntity INNER JOIN DcResultsEntity ON DcResultsEntity.DataCaptureId = DataCaptureEntity.Id" +
						" WHERE DataCaptureEntity.ServiceId=" + ServiceId + " AND DataCaptureEntity.DcPlaceId=" + DcPlaceId + " AND DataCaptureEntity.TemplateNodeId=" + TemplateId +
						" AND DcResultsEntity.SystemUserId=" + LoginUserId + " AND DataCaptureEntity.IsSubmit != 'true'";
			}

			//Added to stop view and edit of history records
			Query += " AND DataCaptureEntity.IsForHistory != 'true'";

			var Result = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

			OneViewConsole.Debug("GetDcInfo end", "DasboardBO.GetDcInfo");

			return Result;
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "DasboardBO.GetDcInfo", Excep);
		}
		finally {
		}
	}

	this.GetProfileDetails = function (oChild, IsCompleted, IsSynchronized, IsSubmit, IsNewDc) {

		try {
			OneViewConsole.Debug("GetProfileDetails start", "DasboardBO.GetProfileDetails");

			var ProfileDetails = null;

			var RequestParam = {
				"ServiceId": ServiceId,
				"UserId": LoginUserId,
				"TemplateNodeId": 0,
				"PlaceId": 0,
				"DcPlaceDimension": 0,
				"DCPlaceRCOType": 0,
				"StartDate": "",
				"EndDate": "",
				"IsCompleted": "-1",
				"IsSynchronized": "-1",
				"IsSubmit": "-1",
				"DCPlaceKeyElementIsGroup": false,
				"TemplateKeyElementIsGroup": false,
				"AttributeGroupType": 0,
				"IsNewDc":true
			}

			RequestParam.PlaceId = oChild.DCPlaceKeyId;
			RequestParam.TemplateNodeId = oChild.TemplateKeyId;
			RequestParam.DcPlaceDimension = oChild.DCPlaceKeyDimension;
			RequestParam.DCPlaceRCOType = oChild.DCPlaceRCOType;
			RequestParam.DCPlaceKeyElementIsGroup = oChild.DCPlaceKeyElementIsGroup;
			RequestParam.TemplateKeyElementIsGroup = oChild.TemplateKeyElementIsGroup;
			RequestParam.AttributeGroupType = oChild.AttributeGroupType;

			if (IsCompleted != undefined) {
				RequestParam.IsCompleted = IsCompleted;
			}
			if (IsSynchronized != undefined) {
				RequestParam.IsSynchronized = IsSynchronized;
			}
			if (IsSubmit != undefined) {
				RequestParam.IsSubmit = IsSubmit;
			}
			if (IsNewDc != undefined) {
				RequestParam.IsNewDc = IsNewDc;
			}

			if ($scope.MyAudit == "Today") {
				RequestParam.StartDate = _oDateTime.GetDate() + " " + "00:00:00";
				RequestParam.EndDate = _oDateTime.GetDate() + " " + "23:59:59";
			}
			var _oDcProfileVsActualBO = new DcProfileVsActualBO();

			if (oChild.DCPlaceKeyElementIsGroup == false && oChild.TemplateKeyElementIsGroup == false) {

				ProfileDetails = _oDcProfileDAO.GetProfileDetails(RequestParam);
			}
			else{
				ProfileDetails = _oDcProfileVsActualBO.Get(RequestParam);
			}

			OneViewConsole.Debug("GetProfileDetails end", "DasboardBO.GetProfileDetails");

			return ProfileDetails;
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "DasboardBO.GetProfileDetails", Excep);
		}
		finally {
		}
	}

	var GetHtml = function (DCTaskViewInfoDTO, StatusType) {

		try {
			OneViewConsole.Debug("GetHtml start", "DasboardBO.GetHtml");

			var Html = "";

			if (DCTaskViewInfoDTO != null) {

				var DCTaskDTOList = DCTaskViewInfoDTO.DCTaskDTOList;

				for (var i = 0; i < DCTaskDTOList.length; i++) {

					//if (IsFilterSuccess(DCTaskDTOList[i].GroupName)) {

						var ParentHtml = GetParentHtml(DCTaskDTOList[i].GroupName);
						var ChildHtml = '';

						var IsSearchValidationSuccessForGroup = IsGraphSearchValidationSuccess(DCTaskDTOList[i].GroupName);

						for (var j = 0; j < DCTaskDTOList[i].DCTaskDetaillst.length; j++) {

							var IsSearchValidationSuccessForTaskDetaills = false;

							if (IsValidChild(DCTaskDTOList[i].DCTaskDetaillst[j], StatusType)){

								if (IsSearchValidationSuccessForGroup == false) {
									IsSearchValidationSuccessForTaskDetaills = IsGraphSearchValidationSuccess(DCTaskDTOList[i].GroupName + " " + DCTaskDTOList[i].DCTaskDetaillst[j].TaskHeader + " " + DCTaskDTOList[i].DCTaskDetaillst[j].TaskDetails);
								}

								if (IsSearchValidationSuccessForGroup == true || IsSearchValidationSuccessForTaskDetaills == true) {
									ChildHtml += GetChildHtml(DCTaskViewInfoDTO.LandingPageViewName, i, j, DCTaskDTOList[i].DCTaskDetaillst[j], StatusType);
								}
							}
						}

						if (ChildHtml != '') {
							Html += ParentHtml + ChildHtml;
						}
					//}
				}
			}

			OneViewConsole.Debug("GetHtml end", "DasboardBO.GetHtml");

			return Html;
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "DasboardBO.GetHtml", Excep);
		}
		finally {
		}
	}

	var IsGraphSearchValidationSuccess = function (Value) {

		try {
			OneViewConsole.Debug("IsGraphSearchValidationSuccess start", "DasboardBO.IsGraphSearchValidationSuccess");

			var IsSuccess = (Value != "") ? true : false;

			var GraphSearchElement = $scope.GraphSearchElement;

			if (GraphSearchElement != "" && Value != "" && Value != undefined) {

				IsSuccess = false;

				Value = Value.toLowerCase();
				GraphSearchElement = GraphSearchElement.toLowerCase();

				if (GraphSearchElement.indexOf(" ") != -1) {

					var GraphSearchElementArray = GraphSearchElement.split(" ");

					for (var i = 0; i < GraphSearchElementArray.length; i++) {

						if (Value.indexOf(GraphSearchElementArray[i]) != -1) {

							IsSuccess = true;
						}
						else {
							IsSuccess = false;
							break;
						}
					}

				}
				else if (Value.indexOf(GraphSearchElement) != -1) {

					IsSuccess = true;
				}
			}

			OneViewConsole.Debug("IsGraphSearchValidationSuccess end", "DasboardBO.IsGraphSearchValidationSuccess");

			return IsSuccess;
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "DasboardBO.IsGraphSearchValidationSuccess", Excep);
		}
		finally {
		}
	}

	var IsFilterSuccess = function (Value) {

		try {
			OneViewConsole.Debug("IsGraphSearchValidationSuccess start", "DasboardBO.IsGraphSearchValidationSuccess");

			var IsSuccess = true;

			if (IsFilterSelected()) {

				IsSuccess = false;

				for (var i = 0; i < $scope.FilterData.length; i++) {

					if ($scope.FilterData[i].selected == "selected" && Value == $scope.FilterData[i].DisplayName) {

						IsSuccess = true;
					}
				}
			}

			OneViewConsole.Debug("IsGraphSearchValidationSuccess end", "DasboardBO.IsGraphSearchValidationSuccess");

			return IsSuccess;
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "DasboardBO.IsGraphSearchValidationSuccess", Excep);
		}
		finally {
		}
	}

	var IsFilterSelected = function () {

		try {
			OneViewConsole.Debug("IsFilterSelected start", "DasboardBO.IsFilterSelected");

			var IsSuccess = false;

			for (var i = 0; i < $scope.FilterData.length; i++) {

				if ($scope.FilterData[i].selected == "selected") {

					IsSuccess = true;
					break;
				}
			}

			OneViewConsole.Debug("IsFilterSelected end", "DasboardBO.IsFilterSelected");

			return IsSuccess;
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "DasboardBO.IsFilterSelected", Excep);
		}
		finally {
		}
	}

	var IsValidChild = function (oChild, StatusType) {

		try {
			OneViewConsole.Debug("IsValidChild start", "DasboardBO.IsValidChild");

			var IsValidChild = false;
			var DCStatusInfo = oChild.DCStatusInfo;

			if (DCStatusInfo != null) {

				if (StatusType == 1) {

					IsValidChild = true;
				}
				else if (StatusType == 2) {

					if (DCStatusInfo.NotStartedCount > 0) {

						IsValidChild = true;
					}
				}
				else if (StatusType == 3) {

					if (DCStatusInfo.InProgressCount > 0) {

						IsValidChild = true;
					}
				}
				else if (StatusType == 4) {

					if (DCStatusInfo.MissedCount > 0) {

						IsValidChild = true;
					}
				}
				else if (StatusType == 5) {

					if (DCStatusInfo.NotSyncedCount > 0) {

						IsValidChild = true;
					}
				}
				else if (StatusType == 6) {

					if (DCStatusInfo.CompletedCount > 0) {

						IsValidChild = true;
					}
				}
				else if (StatusType == 7) {

					//if (DCStatusInfo.SyncedCount > 0) {
					if (DCStatusInfo.OverallCount > 0 && DCStatusInfo.NotSyncedCount == 0) {

						IsValidChild = true;
					}
				}
				else if (StatusType == 8) {

					if (DCStatusInfo.ApprovedCount > 0) {

						IsValidChild = true;
					}
				}
			}
			else {
				IsValidChild = true;
			}

			OneViewConsole.Debug("IsValidChild end", "DasboardBO.IsValidChild");

			return IsValidChild;
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "DasboardBO.IsValidChild", Excep);
		}
		finally {
		}
	}

	var GetParentHtml = function (GroupName) {

		try {
			OneViewConsole.Debug("GetParentHtml start", "DasboardBO.GetParentHtml");

			var Html = '<div class="item item-divider">' + GroupName + '</div>';

			OneViewConsole.Debug("GetParentHtml end", "DasboardBO.GetParentHtml");

			return Html;
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "DasboardBO.GetParentHtml", Excep);
		}
		finally {
		}
	}

	var GetChildHtml = function (LandingPageViewName, ParentIndex, ChildIndex, oChild, StatusType) {

		try {
			OneViewConsole.Debug("GetChildHtml start", "DasboardBO.GetChildHtml");

			var ProfileDetails = MyInstance.GetProfileDetails(oChild);

			var DownloadStatusHtml = ProfileDetails.IsProfileValid == true
				? '<i class="icon icon-social13 synced-color"></i>'
				: '<i class="icon icon-social13 icon-disabled"></i>';

			var CompletedStatusHtml = ((oChild.Occurence != -1 && oChild.DCStatusInfo.OverallCount > 0 && oChild.DCStatusInfo.NotStartedCount == 0 && oChild.DCStatusInfo.OverallCount == oChild.DCStatusInfo.CompletedCount) ||
				(oChild.Occurence == -1 && oChild.DCStatusInfo.OverallCount > 0 && oChild.DCStatusInfo.NotStartedCount == 0 && oChild.DCStatusInfo.OverallCount == oChild.DCStatusInfo.CompletedCount))
				? '<i class="icon icon-checkmark completed-color"></i>'
				: '<i class="icon icon-checkmark icon-disabled"></i>';

			var ApprovedStatusHtml = ((oChild.DCStatusInfo.OverallCount > 0) && oChild.DCStatusInfo.OverallCount == oChild.DCStatusInfo.ApprovedCount)
			? '<i class="icon icon-thumb-up-outline-symbol approved-color"></i>'
			: '<i class="icon icon-thumb-up-outline-symbol icon-disabled"></i>';
			//var ApprovedStatusHtml = '<i class="icon icon-thumb-up-outline-symbol icon-disabled"></i>';

			var UploadedStatusHtml = ((oChild.DCStatusInfo.OverallCount > 0) && oChild.DCStatusInfo.OverallCount == oChild.DCStatusInfo.SyncedCount)
				? '<i class="icon icon-arrow68"></i>'
				: '<i class="icon icon-arrow68 icon-disabled"></i>';

			var TaskStatus = oChild.Occurence == -1
				? oChild.DCStatusInfo.OverallCount
				: GetTaskStatusHtml(oChild, StatusType);
			var TaskStatusHtml = '<span class="badge badge-positive" style="margin-right:5px;">' + TaskStatus + '</span>'

			var TaskDetails = oChild.TaskDetails;

			if (TaskDetails == "") {
				TaskDetails = "&nbsp";
			}

			// If Icon not Exist for Task
			var TaskClassName = "item item-icon-right not-started-con";
			var IconHtml = '';

			// To Do : Need to replace with dynamic icon from task downloaded from server
			// If Icon Exist for Task
			//var TaskClassName = "item item-icon-left item-icon-right not-started-con";
			//var IconHtml = '<i class="icon icon-bluetooth-audio"></i>'; // Icon will come come task details (Dynamically)

			var Html = '<a class="' + TaskClassName + '" ng-click="TaskClick(\'' + LandingPageViewName + '\',' + ParentIndex + ',' + ChildIndex + ')">' +
								IconHtml +
								'<div class="row responsive-sm">' +
									'<div class="col col-80 no-padding no-margin">' +
										'<div class="heading">' + oChild.TaskHeader + '</div>' +
										'<div class="second-txt">' + TaskDetails + '</div>' +
									'</div>' +
									'<div class="col col-20 no-margin col-center no-padding text-right">' +
										DownloadStatusHtml +
										CompletedStatusHtml +
										ApprovedStatusHtml +
										UploadedStatusHtml +
										TaskStatusHtml +
									'</div>' +
								'</div>' +
								'<i class="icon icon-ellipsis-v"></i>' +
						'</a>';

			OneViewConsole.Debug("GetChildHtml end", "DasboardBO.GetChildHtml");

			return Html;
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "DasboardBO.GetChildHtml", Excep);
		}
		finally {
		}
	}

	var GetTaskStatusHtml = function (oChild, StatusType) {

		try {
			OneViewConsole.Debug("GetTaskStatusHtml start", "DasboardBO.GetTaskStatusHtml");

			var TaskStatus = "";
			var TotalCount = oChild.DCStatusInfo.OverallCount + oChild.DCStatusInfo.NotStartedCount;

			if (StatusType == 1) {
				TaskStatus = oChild.DCStatusInfo.OverallCount + '/' + TotalCount;
			}
			else if (StatusType == 2) {
				TaskStatus = oChild.DCStatusInfo.NotStartedCount + '/' + TotalCount;
			}
			else if (StatusType == 3) {
				TaskStatus = oChild.DCStatusInfo.InProgressCount + '/' + TotalCount;
			}
			else if (StatusType == 4) {
				TaskStatus = oChild.DCStatusInfo.MissedCount + '/' + TotalCount;
			}
			else if (StatusType == 5) {
				TaskStatus = oChild.DCStatusInfo.NotSyncedCount + '/' + TotalCount;
			}
			else if (StatusType == 6) {
				TaskStatus = oChild.DCStatusInfo.CompletedCount + '/' + TotalCount;
			}
			else if (StatusType == 7) {
				TaskStatus = oChild.DCStatusInfo.SyncedCount + '/' + TotalCount;
			}
			else if (StatusType == 8) {
				TaskStatus = oChild.DCStatusInfo.ApprovedCount + '/' + TotalCount;
			}

			return TaskStatus;

			OneViewConsole.Debug("GetTaskStatusHtml end", "DasboardBO.GetTaskStatusHtml");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "DasboardBO.GetTaskStatusHtml", Excep);
		}
		finally {
		}
	}

	this.UpdateTaskStatus_NewDC = function (IsCompleted) {

		try {
			OneViewConsole.Debug("UpdateTaskStatus_NewDC start", "DasboardBO.UpdateTaskStatus_NewDC");

			var LandingPageViewInfo = OneViewSessionStorage.Get("LandingPageViewInfo");

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

						//alert(JSON.stringify(DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex]));

						DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.OverallCount += 1;

						if (DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.NotStartedCount > 0) {
							DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.NotStartedCount -= 1;
						}

						DCTaskViewInfoDTO.OverallCount += 1;

						if (DCTaskViewInfoDTO.NotStartedCount > 0) {
							DCTaskViewInfoDTO.NotStartedCount -= 1;
						}

						if (IsCompleted == true) {

							DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.CompletedCount += 1;

							DCTaskViewInfoDTO.CompletedCount += 1;
						}

						else if (IsCompleted == false) {

							DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.InProgressCount += 1;

							DCTaskViewInfoDTO.InProgressCount += 1;
						}

						DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.NotSyncedCount += 1;
						DCTaskViewInfoDTO.NotSyncedCount += 1;

						if (LandingPageViewInfo.SelectedTab == "Today") {
							_oLandingPageViewReponseDAO.UpdateLandingPageViewReponseToday(ServiceId, LoginUserId, LandingPageViewInfo.LandingPageViewName, JSON.stringify(DCTaskViewInfoDTO));
						}

						//alert(JSON.stringify(DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex]));
					}
				}
			}

			OneViewConsole.Debug("UpdateTaskStatus_NewDC end", "DasboardBO.UpdateTaskStatus_NewDC");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "DasboardBO.UpdateTaskStatus_NewDC", Excep);
		}
		finally {
		}
	}

	this.UpdateTaskStatus_EditDC = function (IsCompleted) {

		try {
			OneViewConsole.Debug("UpdateTaskStatus_EditDC start", "DasboardBO.UpdateTaskStatus_EditDC");

			var LandingPageViewInfo = OneViewSessionStorage.Get("LandingPageViewInfo");

			if (LandingPageViewInfo != null) {

				var IsDcCompletedBeforeEdit = OneViewSessionStorage.Get("IsDcCompletedBeforeEdit");
				var IsDcSynchronizedBeforeEdit = OneViewSessionStorage.Get("IsDcSynchronizedBeforeEdit");

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

						//alert(JSON.stringify(DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex]));
						//alert(IsCompleted + "," + IsDcCompletedBeforeEdit);

						if (IsCompleted == true && (IsDcCompletedBeforeEdit == "false" || IsDcCompletedBeforeEdit == false)) {

							if (DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.InProgressCount > 0) {
								DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.InProgressCount -= 1;
							}

							DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.CompletedCount += 1;

							if (DCTaskViewInfoDTO.InProgressCount > 0) {
								DCTaskViewInfoDTO.InProgressCount -= 1;
							}

							DCTaskViewInfoDTO.CompletedCount += 1;
						}

						else if (IsCompleted == false && (IsDcCompletedBeforeEdit == "true" || IsDcCompletedBeforeEdit == true)) {

							if (DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.CompletedCount > 0) {
								DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.CompletedCount -= 1;
							}

							DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.InProgressCount += 1;

							if (DCTaskViewInfoDTO.CompletedCount > 0) {
								DCTaskViewInfoDTO.CompletedCount -= 1;
							}

							DCTaskViewInfoDTO.InProgressCount += 1;
						}

						if (IsDcSynchronizedBeforeEdit == "true" || IsDcSynchronizedBeforeEdit == true) {

							if (DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.NotSyncedCount < DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.OverallCount) {
								DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.NotSyncedCount += 1;
							}

							if (DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.SyncedCount > 0) {
								DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.SyncedCount -= 1;
							}

							if (DCTaskViewInfoDTO.NotSyncedCount < DCTaskViewInfoDTO.OverallCount) {
								DCTaskViewInfoDTO.NotSyncedCount += 1;
							}

							if (DCTaskViewInfoDTO.SyncedCount > 0) {
								DCTaskViewInfoDTO.SyncedCount -= 1;
							}
						}

						if (LandingPageViewInfo.SelectedTab == "Today") {
							_oLandingPageViewReponseDAO.UpdateLandingPageViewReponseToday(ServiceId, LoginUserId, LandingPageViewInfo.LandingPageViewName, JSON.stringify(DCTaskViewInfoDTO));
						}

						//alert(JSON.stringify(DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex]));
					}
				}
			}

			OneViewConsole.Debug("UpdateTaskStatus_EditDC end", "DasboardBO.UpdateTaskStatus_EditDC");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "DasboardBO.UpdateTaskStatus_EditDC", Excep);
		}
		finally {
		}
	}

	this.UpdateTaskStatus_ApproveDC = function (ApprovedDcCount) {

		try {
			OneViewConsole.Debug("UpdateTaskStatus_ApproveDC start", "DasboardBO.UpdateTaskStatus_ApproveDC");

			var LandingPageViewInfo = OneViewSessionStorage.Get("LandingPageViewInfo");

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

						DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.ApprovedCount += 1;
						DCTaskViewInfoDTO.ApprovedCount += 1;

						DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex].DCStatusInfo.NotSyncedCount += ApprovedDcCount;
						DCTaskViewInfoDTO.NotSyncedCount += ApprovedDcCount;

						if (LandingPageViewInfo.SelectedTab == "Today") {
							_oLandingPageViewReponseDAO.UpdateLandingPageViewReponseToday(ServiceId, LoginUserId, LandingPageViewInfo.LandingPageViewName, JSON.stringify(DCTaskViewInfoDTO));
						}

						//alert(JSON.stringify(DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex].DCTaskDetaillst[LandingPageViewInfo.ChildIndex]));
					}
				}
			}

			OneViewConsole.Debug("UpdateTaskStatus_ApproveDC end", "DasboardBO.UpdateTaskStatus_ApproveDC");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "DasboardBO.UpdateTaskStatus_ApproveDC", Excep);
		}
		finally {
		}
	}

	this.UpdateSyncStatus = function (oChild) {

		try {
			OneViewConsole.Debug("UpdateSyncStatus start", "DasboardBO.UpdateSyncStatus");

			var LandingPageViewInfo = OneViewSessionStorage.Get("LandingPageViewInfo");

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

			OneViewConsole.Debug("UpdateSyncStatus end", "DasboardBO.UpdateSyncStatus");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "DasboardBO.UpdateSyncStatus", Excep);
		}
		finally {
		}
	}

	this.UpdateActionSheet = function () {

		try {
			OneViewConsole.Debug("UpdateActionSheet start", "LandingPageFacade.UpdateActionSheet");

			var oParent = DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex];
			var oChild = oParent.DCTaskDetaillst[LandingPageViewInfo.ChildIndex];

			var ActionSheetHeaderHtml = oParent.GroupName;
			if (oChild.TaskHeader != "") {
				ActionSheetHeaderHtml += " - " + oChild.TaskHeader;
			}
			if (oChild.TaskDetails != "") {
				ActionSheetHeaderHtml += " - " + oChild.TaskDetails;
			}

			_oDOM.AddInnerHtml("ActionSheetHeader", ActionSheetHeaderHtml);
			UpdateActionSheetBody();

			var ProfileDetails = MyInstance.GetProfileDetails(oChild);

			if (ProfileDetails.IsProfileValid == true) {
				_oDOM.AddClass("BtnDownload", "step--complete step--active");
			}
			else {
				_oDOM.AddClass("BtnDownload", "step--incomplete step--active");
			}

			if (ProfileDetails.IsProfileValid == true) {

				if (oChild.Occurence > 0 && oChild.Occurence == oChild.DCStatusInfo.OverallCount) {
					_oDOM.AddClass("BtnNewDC", "step--complete step--inactive step--disabled");
				}
				else {
					_oDOM.AddClass("BtnNewDC", "step--incomplete step--active");
				}

				if (oChild.DCStatusInfo.OverallCount > 0) {

					var TotalRecordsToEdit = 0;
					if (oChild.DCPlaceKeyElementIsGroup == false && oChild.TemplateKeyElementIsGroup == false) {

						var DcInfo = MyInstance.GetDcInfo(ServiceId, oChild.DCPlaceKeyId, oChild.TemplateKeyId, LoginUserId);
						TotalRecordsToEdit = DcInfo.length;
					}
					else {
						var IsCompleted = "-1";
						var IsSynchronized = "-1";
						var IsSubmit = "-1";
						var DCViewRouteKey = oChild.DCViewRouteKey;

						var ShowNotStartedDCProfiles = 1;
						var ShowInProgressDCProfiles = 0;
						var ShowCompletedDCProfiles = 0;
						var ShowInProgressOrCompletedDCProfiles = 0;

						if (LandingPageSelectedStatusTypeId == 1 || LandingPageSelectedStatusTypeId == 7) {
							ShowNotStartedDCProfiles = 0;
							ShowInProgressDCProfiles = 0;
							ShowCompletedDCProfiles = 0;
							ShowInProgressOrCompletedDCProfiles = 1;
							IsCompleted = "-1";
							IsSynchronized = "-1";
							IsSubmit = "false";
						}
						else if (LandingPageSelectedStatusTypeId == 2) {
							ShowNotStartedDCProfiles = 1;
							ShowInProgressDCProfiles = 0;
							ShowCompletedDCProfiles = 0;
							ShowInProgressOrCompletedDCProfiles = 0;
							IsCompleted = "-1";
							IsSynchronized = "-1";
							IsSubmit = "false";
						}
						else if (LandingPageSelectedStatusTypeId == 3) {
							ShowNotStartedDCProfiles = 0;
							ShowInProgressDCProfiles = 1;
							ShowCompletedDCProfiles = 0;
							ShowInProgressOrCompletedDCProfiles = 0;
							IsCompleted = "false";
							IsSynchronized = "-1";
							IsSubmit = "false";
						}
						else if (LandingPageSelectedStatusTypeId == 6) {
							ShowNotStartedDCProfiles = 0;
							ShowInProgressDCProfiles = 0;
							ShowCompletedDCProfiles = 1;
							ShowInProgressOrCompletedDCProfiles = 0;
							IsCompleted = "true";
							IsSynchronized = "-1";
							IsSubmit = "false";
						}

						var ProfileDetails = MyInstance.GetProfileDetails(oChild, IsCompleted, IsSynchronized, IsSubmit, false);
						TotalRecordsToEdit = ProfileDetails.TotalDc;
					}

					//alert('TotalRecordsToEdit : ' + TotalRecordsToEdit  + " , " + oChild.Occurence + " , oChild.DCStatusInfo.CompletedCount : " + oChild.DCStatusInfo.CompletedCount + " , oChild.DCStatusInfo.SyncedCount : " + oChild.DCStatusInfo.SyncedCount
					//    + " , oChild.DCStatusInfo.InProgressCount : " + oChild.DCStatusInfo.InProgressCount);

					var IsViewDCActive = false;
					var IsUploadActive = false;
					if (TotalRecordsToEdit > 0  && (oChild.Occurence > 0 && (oChild.DCStatusInfo.CompletedCount == oChild.Occurence && oChild.DCStatusInfo.CompletedCount != oChild.DCStatusInfo.SyncedCount) &&
					 (oChild.DCStatusInfo.CompletedCount >= 0 || oChild.DCStatusInfo.InProgressCount >= 0))) {
						_oDOM.AddClass("BtnViewDC", "step--complete step--active");
						IsViewDCActive = true;
					}
					else if ((oChild.DCStatusInfo.CompletedCount == oChild.DCStatusInfo.SyncedCount && oChild.DCStatusInfo.InProgressCount <= 0)
						|| (oChild.DCStatusInfo.CompletedCount <= 0 && oChild.DCStatusInfo.InProgressCount <= 0)) {
						_oDOM.AddClass("BtnViewDC", "step--complete step--inactive step--disabled");
					}
					else if (TotalRecordsToEdit == 0) {
						_oDOM.AddClass("BtnViewDC", "step--incomplete step--inactive");
					}
					else {
						_oDOM.AddClass("BtnViewDC", "step--incomplete step--active");
						IsViewDCActive = true;
					}
				   // alert('IsViewDCActive : ' + IsViewDCActive + " , TotalRecordsToEdit : " + TotalRecordsToEdit);
					if (IsViewDCActive != true) {
						ActivateViewDCButtonHandoverCase(ServiceId, oChild.DCPlaceKeyId, oChild.TemplateKeyId, LoginUserId);
						IsUploadActive = ActivateUploadDCButtonHandoverCase(ServiceId, oChild.DCPlaceKeyId, oChild.TemplateKeyId, LoginUserId, oChild)
					}
					//alert('IsUploadActive : ' + IsUploadActive);
					var TotalRecordsToApprove = 0;
					var ApprovalProfileReq = {
						ServiceId: OneViewSessionStorage.Get("ServiceId"),
						UserId: OneViewSessionStorage.Get("LoginUserId"),
						TemplateNodeId: "",
						PlaceId: "",
						DcPlaceDimension: 16,//Need to access from oChild
						DCPlaceRCOType: "",
						DCPlaceKeyElementIsGroup: false,
						TemplateKeyElementIsGroup: false,
						DcClientGuidLst: [],
					}

					ApprovalProfileReq.TemplateNodeId = oChild.TemplateKeyId;
					ApprovalProfileReq.PlaceId = oChild.DCPlaceKeyId;

					ApprovalProfileReq.DCPlaceKeyElementIsGroup = oChild.DCPlaceKeyElementIsGroup;
					ApprovalProfileReq.TemplateKeyElementIsGroup = oChild.TemplateKeyElementIsGroup;
					ApprovalProfileReq.DCPlaceRCOType = oChild.DCPlaceRCOType;
					ApprovalProfileReq.AttributeGroupType = oChild.AttributeGroupType;

					var _oDcApprovalBO = new DcApprovalBO();
					var ApprovalInfoResponse = _oDcApprovalBO.GetApprovalInfo(ApprovalProfileReq);

					TotalRecordsToApprove = ApprovalInfoResponse.length;

					if (oChild.DCStatusInfo.ApprovedCount == oChild.Occurence) {
						_oDOM.AddClass("BtnApproveDC", "step--complete step--inactive step--disabled");
					}
					else if (TotalRecordsToApprove == 0) {
						_oDOM.AddClass("BtnApproveDC", "step--incomplete step--inactive");
					}
					else {
						_oDOM.AddClass("BtnApproveDC", "step--incomplete step--active");
					}

					if (oChild.DCStatusInfo.SyncedCount == oChild.Occurence) {
						if (OneViewSessionStorage.Get("ServiceId") != 36) {
							_oDOM.AddClass("BtnUploadDC", "step--complete step--inactive step--disabled");
						}
						else if (OneViewSessionStorage.Get("ServiceId") == 36 && IsUploadActive != true) {
							_oDOM.AddClass("BtnUploadDC", "step--complete step--inactive step--disabled");
						}
					}
					else if (oChild.DCStatusInfo.NotSyncedCount == 0) {

						if (OneViewSessionStorage.Get("ServiceId") == 39) {
							var UnSyncDcCount = GetUnSyncDcCount();
							if (UnSyncDcCount > 0) {
								_oDOM.AddClass("BtnUploadDC", "step--incomplete step--active");
							}
						}
						else if (OneViewSessionStorage.Get("ServiceId") != 36) {
							_oDOM.AddClass("BtnUploadDC", "step--incomplete step--inactive");
						}
						else if (OneViewSessionStorage.Get("ServiceId") == 36 && IsUploadActive != true) {
							_oDOM.AddClass("BtnUploadDC", "step--incomplete step--inactive");
						}
					}
					else {

						var UploadButtonHandlerObj = { RequiredBusinessEventHandlerObjectKeys: "DisableUploadIfNotApproved", TemplateId: [oChild.TemplateKeyId] };

						if (MyInstance.IsUploadButtonHandlerMetadataExist(UploadButtonHandlerObj) == true) {
							if (TotalRecordsToApprove > 0) {
								_oDOM.AddClass("BtnUploadDC", "step--incomplete step--inactive step--disabled");
							}
							else if (TotalRecordsToApprove == 0) {
							   // var _DCDAO = new DcDAO();
							  //  var count = _DCDAO.GetPendingRecordsCount(oChild.TemplateKeyId, oChild.DCPlaceKeyId, OneViewSessionStorage.Get("LoginUserId"), OneViewSessionStorage.Get("ServiceId"));
								if (TotalRecordsToEdit > 0) {
									  _oDOM.AddClass("BtnUploadDC", "step--incomplete step--inactive step--disabled");

								}
								else {
									_oDOM.AddClass("BtnUploadDC", "step--incomplete step--active");
								}

							}
							else {
								_oDOM.AddClass("BtnUploadDC", "step--incomplete step--active");
							}
						}
						else{
							_oDOM.AddClass("BtnUploadDC", "step--incomplete step--active");
						}

					}
				}
				else {
					if (OneViewSessionStorage.Get("ServiceId") == 36) {
						ActivateViewDCButtonHandoverCase(ServiceId, oChild.DCPlaceKeyId, oChild.TemplateKeyId, LoginUserId);
						//Todo(30-10-2018) : Added by Sangeeta Bhatt :  Temporary fix, to activate UploadDC button, when handover DC is edited.
						ActivateUploadDCButtonHandoverCase(ServiceId, oChild.DCPlaceKeyId, oChild.TemplateKeyId, LoginUserId, oChild)
					}
					else {
						_oDOM.AddClass("BtnViewDC", "step--incomplete step--inactive");
						_oDOM.AddClass("BtnUploadDC", "step--incomplete step--inactive");
					}
					_oDOM.AddClass("BtnApproveDC", "step--incomplete step--inactive");
				}
			}
			else {
				_oDOM.AddClass("BtnNewDC", "step--incomplete step--inactive");
				_oDOM.AddClass("BtnViewDC", "step--incomplete step--inactive");
				_oDOM.AddClass("BtnApproveDC", "step--incomplete step--inactive");
				_oDOM.AddClass("BtnUploadDC", "step--incomplete step--inactive");
			}

			var ViewRecordHandlerObj = { RequiredBusinessEventHandlerObjectKeys: "HideViewButton", TemplateId: [oChild.TemplateKeyId] };
			var IsViewButtonNeedToHide = MyInstance.ViewButtonHandler(ViewRecordHandlerObj, xlatService);
			if (IsViewButtonNeedToHide == true) {
				$scope.BtnViewDCHide = true;
			}

			OneViewConsole.Debug("UpdateActionSheet end", "LandingPageFacade.UpdateActionSheet");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "DasboardBO.UpdateActionSheet", xlatService);
		}
	}

	var GetUnSyncDcCount = function () {

		try {
			OneViewConsole.Debug("GetUnSyncDcCount start", "LandingPageFacade.GetUnSyncDcCount");

			var oParent = DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex];
			var oChild = oParent.DCTaskDetaillst[LandingPageViewInfo.ChildIndex];

			var MyAuditTotalDCCountForUpload = 0
			var _oDcFilterParamRequest = new DcFilterParamRequest();
			var _oDcDAO = new DcDAO();

			if (oChild.DCPlaceKeyElementIsGroup == false && oChild.TemplateKeyElementIsGroup == false) {

				_oDcFilterParamRequest = MakeDcFilterRequestForPlaceAndTemplate(oChild);
				MyAuditTotalDCCountForUpload = _oDcDAO.GetDCCountWithFilters(_oDcFilterParamRequest);
			}
			else {//if (oChild.DCPlaceKeyElementIsGroup == true && oChild.TemplateKeyElementIsGroup == false) {

				_oDcFilterParamRequest = MakeDcFilterRequestForPlaceGroupAndTemplate(oChild);
				MyAuditTotalDCCountForUpload = _oDcDAO.GetDCCountWithFiltersAdv(_oDcFilterParamRequest);
			}

			OneViewConsole.Debug("GetUnSyncDcCount end", "LandingPageFacade.GetUnSyncDcCount");

			return MyAuditTotalDCCountForUpload;
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "DasboardBO.GetUnSyncDcCount", xlatService);
		}
	}


	var UpdateActionSheetBody = function () {

		try {
			OneViewConsole.Debug("UpdateActionSheetBody start", "LandingPageFacade.UpdateActionSheetBody");

			var Html = '<li class="step" ng-click="DownloadDCProfile($event)" ng-hide="BtnDownloadHide" id="BtnDownload">' +
				'<span class="step__icon"></span>' +
				'<i class="icon icon-social13"></i>' +
				'<span class="step__label">{{ "Download" | xlat }}</span>' +
				'</li>' +
				'<li class="step" ng-click="LoadNewDC($event)" ng-hide="BtnNewDCHide" id="BtnNewDC">' +
				'<span class="step__icon"></span>' +
				'<i class="icon icon-edit"></i>' +
				'<span class="step__label">{{ "New DC" | xlat }}</span>' +
				'</li>' +
				'<li class="step" ng-click="LoadViewDC($event)" ng-hide="BtnViewDCHide" id="BtnViewDC">' +
				'<span class="step__icon"></span>' +
				'<i class="icon icon-eye"></i>' +
				'<span class="step__label">{{ "View/Edit" | xlat }}</span>' +
				'</li>' +
				'<li class="step" ng-click="ApproveDC($event)" ng-hide="BtnApproveDCHide" id="BtnApproveDC">' +
				'<span class="step__icon"></span>' +
				'<i class="icon icon-thumb-up-outline-symbol"></i>' +
				'<span class="step__label">{{ "Approve" | xlat }}</span>' +
				'</li>' +
				'<li class="step" ng-click="UploadDC($event)" ng-hide="BtnUploadDCHide" id="BtnUploadDC">' +
				'<span class="step__icon"></span>' +
				'<i class="icon icon-arrow68"></i>' +
				'<span class="step__label">{{ "Upload" | xlat }}</span>' +
				'</li>';

			_oDOM.RemoveInnerHtml("ActionSheetBody");

			var _oOneViewCompiler = new OneViewCompiler();
			_oOneViewCompiler.CompileAndApeend($scope, $compile, Html, "ActionSheetBody");

			MyInstance.InitializeTaskHandler();

			OneViewConsole.Debug("UpdateActionSheetBody end", "LandingPageFacade.UpdateActionSheetBody");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "DasboardBO.UpdateActionSheetBody", xlatService);
		}
	}

	this.InitializeTaskHandler = function () {
			try {
				OneViewConsole.Debug("InitializeTaskHandler start", "DasboardFacade.InitializeTaskHandler");

				$scope.BtnDownloadHide = false;
				$scope.BtnNewDCHide = false;
				$scope.BtnViewDCHide = false;
				$scope.BtnApproveDCHide = false;
				$scope.BtnUploadDCHide = false;

				if (LandingPageViewDisplayConfig != null) {

					var OperationBarDisplayConfig = LandingPageViewDisplayConfig.OperationBarDisplayConfig;

					if (OperationBarDisplayConfig != null) {

						$scope.BtnDownloadHide = !(OperationBarDisplayConfig.IsDownloadButtonEnable);
						$scope.BtnNewDCHide = !(OperationBarDisplayConfig.IsNewDcButtonEnable);
						$scope.BtnViewDCHide = !(OperationBarDisplayConfig.IsViewDcButtonEnable);
						$scope.BtnApproveDCHide = !(OperationBarDisplayConfig.IsApproveButtonEnable);
						$scope.BtnUploadDCHide = !(OperationBarDisplayConfig.IsUploadButtonEnable);
					}
				}
						   
				if (ServiceId == 36 || ServiceId == 39 || ServiceId == 50 || ServiceId == 51 || ServiceId == 52 || ServiceId == 61) {
					$scope.BtnApproveDCHide = true;
				}

				OneViewConsole.Debug("InitializeTaskHandler end", "DasboardFacade.InitializeTaskHandler");
			}
			catch (Excep) {
				oOneViewExceptionHandler.Catch(Excep, "DasboardBO.InitializeTaskHandler", xlatService);
			}
	}

	this.TemplateAccessValidationHandler = function (LandingPageViewInfo) {
		try {
			OneViewConsole.Debug("TemplateAccessValidationHandler start", "DasboardBO.TemplateAccessValidationHandler");

			var IsSuccess = true;

			if (ServiceId == 5) {

				var oParent = DCTaskViewInfoDTO.DCTaskDTOList[LandingPageViewInfo.ParentIndex]
				var oChild = oParent.DCTaskDetaillst[LandingPageViewInfo.ChildIndex];
				var TemplateId = oChild.TemplateKeyId;
				//alert('TemplateId : ' + TemplateId);
				var InductionTemplateId = 942;
				if (TemplateId != InductionTemplateId) { //Check for all template apart from Induction Template
					var InductionTotalDcCountFromServer = 0;
					var IsExists = false;

					for (var i = 0; i < DCTaskViewInfoDTO.DCTaskDTOList.length; i++) {
						var Data = DCTaskViewInfoDTO.DCTaskDTOList[i];
						for (var j = 0; j < Data.DCTaskDetaillst.length; j++) {
							var TaskDetails = Data.DCTaskDetaillst[j];
							//alert('TaskDetails.TemplateKeyId : ' + TaskDetails.TemplateKeyId);
							if (TaskDetails.TemplateKeyId == InductionTemplateId) {
								IsExists=true;
								InductionTotalDcCountFromServer = TaskDetails.DCStatusInfo.OverallCount;
								break;
							}
						}

						if (IsExists == true) {
							break;
						}
					}

				   // var InductionTotalDcCountFromLocal = new DcDAO().GetTotalDcCountByTemplateAndUser(ServiceId, LoginUserId, InductionTemplateId);
				   // alert('InductionTotalDcCountFromServer : ' + InductionTotalDcCountFromServer);
					//Server and Local both counts
					if (InductionTotalDcCountFromServer <= 0) {
						IsSuccess = false;
					}
				}
			}
			//alert('IsSuccess : ' + IsSuccess);

			OneViewConsole.Debug("TemplateAccessValidationHandler end", "DasboardBO.TemplateAccessValidationHandler");

			return IsSuccess;
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "DasboardBO.TemplateAccessValidationHandler", Excep);
		}
	}

	var ActivateViewDCButtonHandoverCase = function (ServiceId, DcPlaceId, TemplateId, UserId) {

		try {
			OneViewConsole.Debug("ActivateViewDCButtonHandoverCase start", "LandingPageFacade.ActivateViewDCButtonHandoverCase");

			//alert('OneViewSessionStorage.Get("ServiceId") : ' + OneViewSessionStorage.Get("ServiceId"));
			if (OneViewSessionStorage.Get("ServiceId") == 36) {

				var _oDcDAO = new DcDAO();
				var HandoverRecordsCount = _oDcDAO.GetHandoverRecordsCount(TemplateId, DcPlaceId, UserId, ServiceId);

				//alert('HandoverRecordsCount : ' + HandoverRecordsCount);
				if (HandoverRecordsCount != null && HandoverRecordsCount > 0) {
					_oDOM.RemoveClass("BtnViewDC", "step--complete step--inactive step--disabled");
					_oDOM.RemoveClass("BtnViewDC", "step--incomplete step--inactive");
					_oDOM.AddClass("BtnViewDC", "step--incomplete step--active");
				}
				else {
					_oDOM.RemoveClass("BtnViewDC", "step--incomplete step--active");
					_oDOM.AddClass("BtnViewDC", "step--incomplete step--inactive");
				}
			}

			OneViewConsole.Debug("ActivateViewDCButtonHandoverCase end", "LandingPageFacade.ActivateViewDCButtonHandoverCase");
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "DasboardBO.ActivateViewDCButtonHandoverCase", xlatService);
		}
	}

	var ActivateUploadDCButtonHandoverCase = function (ServiceId, DcPlaceId, TemplateId, UserId, oChild) {

		try {
			OneViewConsole.Debug("ActivateUploadDCButtonHandoverCase start", "LandingPageFacade.ActivateUploadDCButtonHandoverCase");
			var IsUploadActive = false;
			if (OneViewSessionStorage.Get("ServiceId") == 36) {

				var _oDcFilterParamRequest = new DcFilterParamRequest();
				var _oDcDAO = new DcDAO();
				var MyAuditTotalDCCountForUpload=0
				if (oChild.DCPlaceKeyElementIsGroup == false && oChild.TemplateKeyElementIsGroup == false) {
					_oDcFilterParamRequest = MakeDcFilterRequestForPlaceAndTemplate(oChild);
					MyAuditTotalDCCountForUpload = _oDcDAO.GetDCCountWithFilters(_oDcFilterParamRequest);
				}
				else {//if (oChild.DCPlaceKeyElementIsGroup == true && oChild.TemplateKeyElementIsGroup == false) {
					_oDcFilterParamRequest = MakeDcFilterRequestForPlaceGroupAndTemplate(oChild);
					MyAuditTotalDCCountForUpload = _oDcDAO.GetDCCountWithFiltersAdv(_oDcFilterParamRequest);
				}
				//alert('MyAuditTotalDCCountForUpload : ' + MyAuditTotalDCCountForUpload);

				if (MyAuditTotalDCCountForUpload > 0) {
					IsUploadActive = true;
					_oDOM.AddClass("BtnUploadDC", "step--incomplete step--active");
				}
				else {
					IsUploadActive = false;
					_oDOM.AddClass("BtnUploadDC", "step--incomplete step--inactive");
				}
			}

			OneViewConsole.Debug("ActivateUploadDCButtonHandoverCase end", "LandingPageFacade.ActivateUploadDCButtonHandoverCase");

			return IsUploadActive;
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "DasboardBO.ActivateUploadDCButtonHandoverCase", xlatService);
		}
	}

	this.NewDCAccessValidationHandler = function (Req) {
		try {
			OneViewConsole.Debug("NewDCAccessValidationHandler start", "DasboardBO.NewDCAccessValidationHandler");

			//var IsSuccess = true;
			var _ValidateActionFollowUpBeforeNewDCHandler = new ValidateActionFollowUpBeforeNewDCHandler();
			var _TemplateIdLst = [];
			var Response = { IsSuccess: true, RedirectURL: "", IsActionResolvedIsMandatoryBeforeNewDc: false };
			var oChild=Req.oChild;

			if (oChild.DCPlaceKeyElementIsGroup == false && oChild.TemplateKeyElementIsGroup == false) {

				if (Req.oChild.TemplateKeyElementIsGroup == false) {
					_TemplateIdLst.push(Req.oChild.TemplateKeyId);
				}
				var ReqObjForValidateActionFollowUpBeforeNewDC = { TemplateIdLst: _TemplateIdLst };


				if (_ValidateActionFollowUpBeforeNewDCHandler.IsNeedToValidateActionFollowUpBeforeNewDC(ReqObjForValidateActionFollowUpBeforeNewDC)) {

					var _MyActionBO = new MyActionBO($scope, $compile, $location, xlatService);
					var IsActionResolved = _MyActionBO.IsAllActionResolved(Req.oChild);
					if (IsActionResolved == false) {
						Response.IsSuccess = false;
					}
					var IsActionResolveIsMandatory = _MyActionBO.IsActionResolvedIsMandatoryBeforeNewDc(Req.oChild);

					Response.IsActionResolvedIsMandatoryBeforeNewDc = IsActionResolveIsMandatory;

				}
			}


			OneViewConsole.Debug("NewDCAccessValidationHandler end", "DasboardBO.NewDCAccessValidationHandler");

			return Response;
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "DasboardBO.TemplateAccessValidationHandler", Excep);
		}
	}

	this.ViewButtonHandler = function (Req, xlatService) {
		try {
			OneViewConsole.Debug("ViewButtonHandler start", "LandingPageFacade.ViewButtonHandler");
			var IsSuccess = false;

			var BusinessEventHandlerObjectKeys = Req.RequiredBusinessEventHandlerObjectKeys;
			var TemplateId = Req.TemplateId;

			var _BusinessEventEntityBO = new BusinessEventEntityBO();
			var ReqParameter = { ClassName: "ViewButtonHandler", MethodName: "ViewButtonChangeEvents", RequiredBusinessEventHandlerObjectKeys: {}, IsTemplateValidationRequired: true, TemplateIdLst: TemplateId, };
			ReqParameter.RequiredBusinessEventHandlerObjectKeys[BusinessEventHandlerObjectKeys] = "";

			var _BusinessEventEntityBO = new BusinessEventEntityBO();
			var _IsBussinessEventExist = _BusinessEventEntityBO.IsBussinessEventExist(ReqParameter);

			if (_IsBussinessEventExist.BusinessEventHandlersObjectKeysDetails[BusinessEventHandlerObjectKeys] != undefined) {
				if (_IsBussinessEventExist.BusinessEventHandlersObjectKeysDetails[BusinessEventHandlerObjectKeys].IsSuccess == true) {
					IsSuccess = true;
				}

			}

			OneViewConsole.Debug("ViewButtonHandler end", "LandingPageFacade.ViewButtonHandler");

			return IsSuccess;
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "LandingPageFacade.ViewButtonHandler", xlatService);
		}
	}

	this.IsUploadButtonHandlerMetadataExist = function (Req) {

		try {
			OneViewConsole.Debug("IsUploadButtonHandlerMetadataExist start", "DasboardFacade.IsUploadButtonHandlerMetadataExist");

			//var IsSuccess = false;
			//if (OneViewSessionStorage.Get("ServiceId") == 45 || OneViewSessionStorage.Get("ServiceId") == 49) {
			//    IsSuccess = true;
			//}

			var IsSuccess = false;

			var BusinessEventHandlerObjectKeys = Req.RequiredBusinessEventHandlerObjectKeys;
			var TemplateId = Req.TemplateId;

			var _BusinessEventEntityBO = new BusinessEventEntityBO();
			var ReqParameter = { ClassName: "DasboardBO", MethodName: "IsUploadButtonHandlerMetadataExist", RequiredBusinessEventHandlerObjectKeys: {}, TemplateIdLst: TemplateId, };
			ReqParameter.RequiredBusinessEventHandlerObjectKeys[BusinessEventHandlerObjectKeys] = "";

			var _BusinessEventEntityBO = new BusinessEventEntityBO();
			var _IsBussinessEventExist = _BusinessEventEntityBO.IsBussinessEventExistWithOrWithoutTemplateId(ReqParameter);

			if (_IsBussinessEventExist.BusinessEventHandlersObjectKeysDetails[BusinessEventHandlerObjectKeys] != undefined) {
				if (_IsBussinessEventExist.BusinessEventHandlersObjectKeysDetails[BusinessEventHandlerObjectKeys].IsSuccess == true) {
					IsSuccess = true;
				}
			}


			OneViewConsole.Debug("IsUploadButtonHandlerMetadataExist end", "DasboardFacade.IsUploadButtonHandlerMetadataExist");

			return IsSuccess;
		}
		catch (Excep) {
			oOneViewExceptionHandler.Catch(Excep, "DasboardFacade.IsUploadButtonHandlerMetadataExist", xlatService);
		}
	}
}

// MultipleDcApprovalBO
function MultipleDcApprovalBO() {


	var MyInstance = this;

	this.LoadHtml = function (Id) {

		try {
			OneViewConsole.Debug("LoadHtml start", "MultipleDcApprovalBO.LoadHtml");

			var Html = MyInstance.GetHtml();

			MyInstance.AppendHtml(Id, Html);

			OneViewConsole.Debug("LoadHtml end", "MultipleDcApprovalBO.LoadHtml");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "MultipleDcApprovalBO.LoadHtml", Excep);
		}
		finally {
		}
	}


	this.GetHtml = function () {

		try {
			OneViewConsole.Debug("GetHtml start", "MultipleDcApprovalBO.GetHtml");

			var Html = MyInstance.GetSelectAllHtml();
			for (var i = 0; i < DcApprovalInfoList.length; i++) {
				var Data = DcApprovalInfoList[i];
				Html += MyInstance.GetDcHtml(Data);
			}

			OneViewConsole.Debug("GetHtml end", "MultipleDcApprovalBO.GetHtml");

			return Html;
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "MultipleDcApprovalBO.GetHtml", Excep);
		}
		finally {
		}
	}


	this.AppendHtml = function (Id, Html) {

		try {
			OneViewConsole.Debug("AppendHtml start", "MultipleDcApprovalBO.AppendHtml");

			document.getElementById(Id).innerHTML = Html;

			OneViewConsole.Debug("AppendHtml end", "MultipleDcApprovalBO.AppendHtml");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "MultipleDcApprovalBO.AppendHtml", Excep);
		}
		finally {
		}
	}

	this.DestroyHtml = function (Id) {

		try {
			OneViewConsole.Debug("AppendHtml start", "MultipleDcApprovalBO.AppendHtml");

			document.getElementById(Id).innerHTML = "";

			OneViewConsole.Debug("AppendHtml end", "MultipleDcApprovalBO.AppendHtml");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "MultipleDcApprovalBO.AppendHtml", Excep);
		}
		finally {
		}
	}

	this.GetSelectAllHtml=  function () {

		try {
			OneViewConsole.Debug("GetSelectAllHtml start", "MultipleDcApprovalBO.GetSelectAllHtml");

			var SelectAll = -1;

			var Html = '<a class="item item-icon-right"  id="-1" onclick="SelectDC(' + SelectAll + ')"> Select All </a>';

			OneViewConsole.Debug("GetSelectAllHtml end", "MultipleDcApprovalBO.GetSelectAllHtml");

			return Html;
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "MultipleDcApprovalBO.GetSelectAllHtml", Excep);
		}
		finally {
		}
	}


	this.GetDcHtml = function (Data) {

		try {
			OneViewConsole.Debug("GetDcHtml start", "MultipleDcApprovalBO.GetDcHtml");

			var DcInfo = Data.DcInfo;

			var Html = '<a class="item item-icon-right"  id="' + DcInfo.Id + '" onclick="SelectDC(' + DcInfo.Id + ')">' + DcInfo.TemplateNodeName + " - " + DcInfo.DcPlaceName +
						'<div class="side-item-sub-txt padding-top-5">Score : <span style="color: red;">' + DcInfo.Score + '</span></div>' +
						 '<div class="side-item-sub-txt">Pending Approval Level : <span style="color: #333;"> ' + Data.NextApprovalIndex + '</span></div>' +
						'</a>';

			////Need to add later after Score
			////'<div class="side-item-sub-txt">Auditor : <span style="color: #333;">User Name1</span>, <span style="color: #333;">User Name1</span></div>' +
			//// '<div class="side-item-sub-txt">Approver : <span style="color: #333;">Approval User Name1</span>, <span style="color: #333;">Approval User Name2</span></div>'+
			OneViewConsole.Debug("GetDcHtml end", "MultipleDcApprovalBO.GetDcHtml");

			return Html;
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "MultipleDcApprovalBO.GetDcHtml", Excep);
		}
		finally {
		}
	}

	this.SelectDC = function (Id) {
		try {
			OneViewConsole.Debug("SelectDC start", "MultipleDcApprovalBO.SelectDC");

			var IsSelected = MyInstance.CheckDcSelected(Id, 'active');
			if (Id == -1) {
				MyInstance.FormResponse(Id, IsSelected);
			}
			else {
				MyInstance.FormResponse(Id, false, IsSelected);
			}

			OneViewConsole.Debug("SelectDC end", "MultipleDcApprovalBO.SelectDC");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "MultipleDcApprovalBO.SelectDC", Excep);
		}
		finally {
		}
	}

	this.FormResponse = function (Id, IsSelectAll, IsAdd) {

		try {
			OneViewConsole.Debug("SelectDCHtml start", "MultipleDcApprovalBO.SelectDCHtml");

			if (Id == -1) {
				if (IsSelectAll == true) {
					MyInstance.AppendClass(Id, 'active');
					MyInstance.AppendIcon(Id);
					MyInstance.AddDC(Id, true);
				}
				else {
					MyInstance.RemoveClass(Id, 'active');
					MyInstance.RemoveIcon(Id);
					MyInstance.RemoveDC(Id, true);
				}
			}
			else if (Id != -1) {
				if (IsAdd == true) {
					MyInstance.AddDC(Id);
				}
				else {
					MyInstance.RemoveDC(Id);
				}
			}

			OneViewConsole.Debug("SelectDCHtml end", "MultipleDcApprovalBO.SelectDCHtml");

		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "MultipleDcApprovalBO.SelectDCHtml", Excep);
		}
		finally {
		}
	}


	this.AddDC = function (Id, IsAddAll) {
		try {
			OneViewConsole.Debug("AddDC start", "MultipleDcApprovalBO.AddDC");

			for (var i = 0; i < DcApprovalInfoList.length ; i++) {
				var Data = DcApprovalInfoList[i];
				var DcInfo = Data.DcInfo;
				if (DcInfo.Id == Id || IsAddAll== true) {
					MyInstance.AppendClass(DcInfo.Id, 'active');
					MyInstance.AppendIcon(DcInfo.Id);
					DcOnDeviceApprovalInfoLst.push(Data);
					if (IsAddAll != true) {
						break;
					}
				}
			}

			OneViewConsole.Debug("AddDC end", "MultipleDcApprovalBO.AddDC");

		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "MultipleDcApprovalBO.AddDC", Excep);
		}
		finally {
		}
	}

	this.RemoveDC = function (Id, IsRemoveAll) {
		try {
			OneViewConsole.Debug("RemoveDC start", "MultipleDcApprovalBO.RemoveDC");

			for (var i = 0; i < DcOnDeviceApprovalInfoLst.length ; i++) {
				var Data = DcOnDeviceApprovalInfoLst[i];
				var DcInfo = Data.DcInfo;
				if (DcInfo.Id == Id || IsRemoveAll == true) {
					MyInstance.RemoveClass(DcInfo.Id, 'active');
					MyInstance.RemoveIcon(DcInfo.Id);
					DcOnDeviceApprovalInfoLst.splice(i, 1);
					i--;
					if (IsRemoveAll != true) {
						break;
					}
				}
			}

			OneViewConsole.Debug("RemoveDC end", "MultipleDcApprovalBO.RemoveDC");

		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "MultipleDcApprovalBO.RemoveDC", Excep);
		}
		finally {
		}
	}

	this.AddIconHtml = function (Id) {

		try {
			OneViewConsole.Debug("AddIconHtml start", "MultipleDcApprovalBO.AddIconHtml");

			var Html = '<i class="icon icon-check" style="margin-right: 10px; font-size: 22px;" id="Icon_"' + Id + '"></i>';

			OneViewConsole.Debug("AddIconHtml end", "MultipleDcApprovalBO.AddIconHtml");

		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "MultipleDcApprovalBO.AddIconHtml", Excep);
		}
		finally {
		}
	}

	this.CheckDcSelected = function (Id, ClassName) {
		try {
			OneViewConsole.Debug("AppendClass start", "ViewRecordsBO.AppendClass");

			var IsSelected = false;
			var DivData = document.getElementById(Id);
			if (DivData != null) {
				if (DivData.className.indexOf(ClassName) == '-1') {
					IsSelected = true;
				}
			}

			OneViewConsole.Debug("AppendClass end", "ViewRecordsBO.AppendClass");

			return IsSelected;
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "ViewRecordsBO.AppendClass", Excep);
		}
		finally {
			DivData = null;
		}
	}


	this.AppendClass = function (Id, ClassName) {
		try {
			OneViewConsole.Debug("AppendClass start", "ViewRecordsBO.AppendClass");

			var DivData = document.getElementById(Id);
			if (DivData != null) {
				DivData.className = DivData.className + " " + ClassName;
			}

			OneViewConsole.Debug("AppendClass end", "ViewRecordsBO.AppendClass");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "ViewRecordsBO.AppendClass", Excep);
		}
		finally {
			DivData = null;
		}
	}

	this.RemoveClass = function (Id, ClassName) {
		try {
			OneViewConsole.Debug("RemoveClass start", "ViewRecordsBO.RemoveClass");

			var RegularExpressionForRemoveClass = new RegExp('(\\s|^)' + ClassName + '(\\s|$)');
			var DivData = document.getElementById(Id);
			if (DivData != null) {
				DivData.className = DivData.className.replace(RegularExpressionForRemoveClass, ' ');
			}

			OneViewConsole.Debug("RemoveClass end", "ViewRecordsBO.RemoveClass");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "ViewRecordsBO.RemoveClass", Excep);
		}
		finally {
			RegularExpressionForRemoveClass = null;
			DivData = null;
		}
	}

	this.AppendIcon = function (Id) {
		try {
			OneViewConsole.Debug("AppendIcon start", "ViewRecordsBO.AppendIcon");

			var Icon = document.createElement("i");
			Icon.setAttribute('id', "Icon_" + Id);
			Icon.setAttribute('class', "icon icon-check");
			Icon.setAttribute("style", "margin-right: 10px; font-size: 22px;");

			var DivData = document.getElementById(Id);
			if (DivData != null) {
				document.getElementById(Id).appendChild(Icon);
			}

			OneViewConsole.Debug("AppendIcon end", "ViewRecordsBO.AppendIcon");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "ViewRecordsBO.AppendIcon", Excep);
		}
		finally {
			DivData = null;
		}
	}


	this.RemoveIcon = function (Id) {
		try {
			OneViewConsole.Debug("RemoveIcon start", "ViewRecordsBO.RemoveIcon");

			var Icon = document.getElementById("Icon_" + Id)
			Icon.removeAttribute('id', "Icon_" + Id);
			Icon.removeAttribute('class', "icon icon-check");
			Icon.removeAttribute("style", "margin-right: 10px; font-size: 22px;");

			var DivData = document.getElementById(Id);
			if (DivData != null) {
				document.getElementById(Id).removeChild(Icon);
			}

			OneViewConsole.Debug("RemoveIcon end", "ViewRecordsBO.RemoveIcon");
		}
		catch (Excep) {
			throw oOneViewExceptionHandler.Create("BO", "ViewRecordsBO.RemoveIcon", Excep);
		}
		finally {
			DivData = null;
		}
	}

}

