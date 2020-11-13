
// ############################################################################################################## //

// Created User : Siva Prasad
// Created Date : 15-06-2014 09:30 AM

// Last Updated User : Siva Prasad
// Last Updated Date : 12-05-2016 12:10 PM

// Note : Any updation or changes required, Need to discuss with created user or last updated user or full team

// ############################################################################################################## //


// Dont change / remove below variables
	var Profiles = [];

	// ProfileDownloadPageConfiguration for displaying content element
	var ProfileDownloadPageConfiguration = { 'ContentElement': "TemplateNode" };

	// Controller
	MyApp.controller('ProfileDownloadController', function ($scope, $timeout, xlatService, $location, $routeSegment) {

			GlobalxlatService = xlatService;
			var IsNavigate = false;
			var Url;
			var IsCheckForUpdateRequired = true;
			////////////////*********************** Validation for Internet checking before going to ProfileDownload page when any profile are there only************************ START///////////////////////////

			var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
			var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

			// If network is available
			if (NetworkDetails.IsNetworkAvailable == true) {

				//var _oOneViewAppConfig = new OneViewAppConfig();
				//_oOneViewAppConfig.CheckForNewUpdates('');
				////$location.url('/nav/downloads');
				//IsNavigate = true;

				var oAPKUpgradeProcessStatus = OneViewLocalStorage.Get("APKUpgradeProcessStatus");
				var oAPKUpgradeProcessBO = new APKUpgradeProcessBO();
				if (oAPKUpgradeProcessStatus != null) {
					oAPKUpgradeProcessStatus = JSON.parse(oAPKUpgradeProcessStatus);
					oAPKUpgradeProcessBO.SetUpgradeStepCompleted(oOneViewAppInfoPlugin.GetLocalAppInfo().VersionName, oAPKUpgradeProcessStatus.LatestVersion);

					if (oAPKUpgradeProcessStatus.IsAPKUpgradeCompleted != true) {
						IsCheckForUpdateRequired = false;
						IsNavigate = false;
						Url = '/APKUpgrade';
						$location.url('/APKUpgrade');
					}
					else {
						OneViewLocalStorage.Remove("APKUpgradeProcessStatus");
						//check for update
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
							var NewUpdateMsg = oAPKUpgradeProcessBO.FormUpgradeStartMessage(xlatService);

							if (IsUpgradeSkipAllowed == true) {

								var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
								oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Confirmation'), xlatService.xlat(NewUpdateMsg + '\n\nDo you want to continue ?'), function (ConfirmationId) {

									if (ConfirmationId == "2") {
										IsNavigate = false;
										Url = '/APKUpgrade';
										$location.url(Url);
										$scope.$apply();
									}
									else {
										$scope.$routeSegment = $routeSegment;

										//oSetDefaultSpinner.Start();

										var oProfileDownloadFacade = new ProfileDownloadFacade();

										// Initialize page
										oProfileDownloadFacade.Init($scope, xlatService);

										// Page load
										oProfileDownloadFacade.PageLoad($scope, $timeout, xlatService, '', '');
										$scope.$apply();
									}
								});
							}
							else {
								alert(NewUpdateMsg);
								var IsOperationAccessAllowed = oAPKUpgradeProcessBO.ValidationForAPKUpgradeProcess("IsAllowDcProfileDownload");
								if (IsOperationAccessAllowed == true) {
								  navigator.notification.alert(('OperationAccessPermissionKey = IsAllowDcProfileDownload  , IsOperationAccessAllowed = ' + IsOperationAccessAllowed + ' , Not implemented exception.'), ['OK'], "");

								}
								else {
									//navigate to upgrade
									IsNavigate = false;
									Url = '/APKUpgrade';
								}
							}
						}
						else {
							//go to error page
							IsNavigate = false;
							Url = '/notifycall?MessageKey=' + Result.Message;
						}
					}
					else {
						IsNavigate = true;
					}
				}
			}
			else {
				//alert('Notification : ' + OneViewGlobalization[CurrentLanguage].NoInternetConnection);
				var MessageKey = 'Notification : ' + OneViewGlobalization[CurrentLanguage].NoInternetConnection;
				Url = '/notifycall?MessageKey=' + MessageKey + '';
			}

			////////////////*********************** Validation for Internet checking before going to ProfileDownload page when any profile are there only************************ END///////////////////////////

			//alert('ProfileDownloadController IsNavigate : ' + IsNavigate);

			if (IsNavigate == true) {
				$scope.$routeSegment = $routeSegment;
				//oSetDefaultSpinner.Start();

				var oProfileDownloadFacade = new ProfileDownloadFacade();

				// Initialize page
				oProfileDownloadFacade.Init($scope, xlatService);

				// Page load
				oProfileDownloadFacade.PageLoad($scope, $timeout, xlatService, '', '');
			}
			else {
				$location.url(Url);
				$scope.$apply();
			}



			DownloadFilter = function () {
				ToggleSidePanel();
			}

		//oSetDefaultSpinner.Stop();

		/// <summary>
		/// This method is under construction
		/// </summary>
		$scope.onFacilitylistItemChanged = function (item) {

			for (var i = 0; i < $scope.Selectedfacilitys.length; i++){
				var Facility = $scope.Selectedfacilitys[i];
				if (Facility.Id == item.Id) {
					Facility.selected = !(item.selected);
				}
			}
		};

		/// <summary>
		/// Select all contents event registration
		/// </summary>
		$scope.SelectAllContents = function () {

			var _oProfileDownloadFacade = new ProfileDownloadFacade();
			_oProfileDownloadFacade.SelectAllContents($scope, '', xlatService);
		};

		/// <summary>
		/// Profile download event registration
		/// </summary>
		$scope.DownLoad = function () {
			var oProfileDownloadFacade = new ProfileDownloadFacade();
			oProfileDownloadFacade.DownLoad($scope, xlatService, '', '', $location);
		};


		/// <summary>
		/// GraphSearch event registration
		/// </summary>
		$scope.GraphSearch = function () {
			var oProfileDownloadFacade = new ProfileDownloadFacade();
			oProfileDownloadFacade.GraphSearch($scope, $scope.GraphSearchElement);
		}

		/// <summary>
		/// Change Dimension
		/// </summary>
		$scope.ChangeDimension = function () {
			var oProfileDownloadFacade = new ProfileDownloadFacade();
			oProfileDownloadFacade.ChangeDimension($scope, $timeout, xlatService, '', '');
		}

		$scope.$on('$destroy', function () {
			$scope.Dimension = "Template";
			ProfileDownloadPageConfiguration = { 'ContentElement': "TemplateNode" };
		});

		$scope.UnitChangeEvent = function (Unit) {
			var oProfileDownloadFacade = new ProfileDownloadFacade();
			oProfileDownloadFacade.UnitChangeEvent($scope, xlatService, Unit);
		}

		$scope.AirlineChangeEvent = function (Airline) {
			var oProfileDownloadFacade = new ProfileDownloadFacade();
			oProfileDownloadFacade.AirlineChangeEvent($scope, xlatService, Airline);
		}
	})

	// Facade (Assembler code / Work flow code)
	function ProfileDownloadFacade() {

		// ProfileDownloadFacade object
		var MyInstance = this;


		/// <summary>
		/// Select all contents
		/// </summary>
		/// <param name="$scope">Current scope</param>
		/// <param name="xlatService">xlatService for globalization</param>
		this.Init = function ($scope, xlatService) {
			try {
				OneViewConsole.Debug("Init start", "ProfileDownloadFacade.Init");

				// Registering page name for globalization
				// xlatService.setCurrentPage('ProfileDownload_Page');
				xlatService.setCurrentPage('5');
				document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');

				$scope.UnitList = [];
				$scope.AirlineList = [];

				if (IsGlobalCleaningProfiledownloadView == true) {
					$scope.Dimension = "Template";
					ProfileDownloadPageConfiguration = { 'ContentElement': "DcPlace" };
					$scope.ImmediateParentColumn = true;
					$scope.FilterDropdown2 = "Section";
				}
				else {
					$scope.Dimension = "Place";
					ProfileDownloadPageConfiguration = { 'ContentElement': "TemplateNode" };
					$scope.ImmediateParentColumn = false;
					$scope.FilterDropdown2 = "Airline";
				}

				OneViewConsole.Debug("Init end", "ProfileDownloadFacade.Init");
			}
			catch (Excep) {
				oOneViewExceptionHandler.Catch(Excep, "ProfileDownloadFacade.Init", xlatService);
			}
		}


		/// <summary>
		/// Select all contents
		/// </summary>
		/// <param name="$scope">Current scope</param>
		/// <param name="xlatService">xlatService for globalization</param>
		/// <param name="toaster">toaster for toast messages</param>
		/// <param name="SpinService">SpinService for loader</param>
		this.PageLoad = function ($scope, $timeout, xlatService, toaster, SpinService) {
			try {
				OneViewConsole.Debug("PageLoad start", "ProfileDownloadFacade.PageLoad");

				var IsLoadView = true;
				var _oProfileDownloadPresenter = new ProfileDownloadPresenter();
				_oProfileDownloadPresenter.PageLoad($scope, $timeout, xlatService, toaster, SpinService);

				//LoadContentBlock($scope, OneViewSessionStorage.Get("LoginUserId"), OneViewSessionStorage.Get("ServiceId"), SpinService, toaster, xlatService);

				$scope.Selectedfacilitys = [];

				if (ProfileDownloadPageConfiguration.ContentElement == "TemplateNode") {
					LoadTemplateContentBlock($scope, OneViewSessionStorage.Get("LoginUserId"), OneViewSessionStorage.Get("ServiceId"), SpinService, toaster, xlatService);
				}
					//Load all Dc places if Content element is Dc place
				else {
					var IsSuccess = LoadUnits($scope, OneViewSessionStorage.Get("LoginUserId"), OneViewSessionStorage.Get("ServiceId"), SpinService, toaster, xlatService);
					IsLoadView = IsSuccess;

					if (IsSuccess == true) {
						var IsSuccess = LoadAirlines($scope, OneViewSessionStorage.Get("LoginUserId"), OneViewSessionStorage.Get("ServiceId"), SpinService, toaster, xlatService, $scope.Unit.Id);
						if (IsSuccess == true) {
							LoadPlaceContentBlock($scope, OneViewSessionStorage.Get("LoginUserId"), OneViewSessionStorage.Get("ServiceId"), SpinService, toaster, xlatService, $scope.Airline.Id);
						}
					}

					if (IsLoadView == false) {
						$scope.ImmediateParentColumn = false;
						//alert(xlatService.xlat('NoProfiles'));
						navigator.notification.alert(xlatService.xlat('NoProfiles'), ['OK'], "");
					}
				}


				OneViewConsole.Debug("PageLoad end", "ProfileDownloadFacade.PageLoad");
				return IsLoadView;
			}
			catch (Excep) {
				oOneViewExceptionHandler.Catch(Excep, "ProfileDownloadFacade.PageLoad", xlatService);
			}
		}


		this.UnitChangeEvent = function ($scope, xlatService, Parent) {
			try {
				OneViewConsole.Debug("UnitChangeEvent start", "ProfileDownloadFacade.UnitChangeEvent");

				oSetDefaultSpinner.Start();

				var IsSuccess = LoadAirlines($scope, OneViewSessionStorage.Get("LoginUserId"), OneViewSessionStorage.Get("ServiceId"), '', '', xlatService, Parent.Id);
				if (IsSuccess == true) {
					LoadPlaceContentBlock($scope, OneViewSessionStorage.Get("LoginUserId"), OneViewSessionStorage.Get("ServiceId"), '', '', xlatService, $scope.Airline.Id);
				}

				oSetDefaultSpinner.Stop();

				OneViewConsole.Debug("UnitChangeEvent end", "ProfileDownloadFacade.UnitChangeEvent");
			}
			catch (Excep) {
				oOneViewExceptionHandler.Catch(Excep, "ProfileDownloadFacade.UnitChangeEvent", xlatService);
			}
		}

		this.AirlineChangeEvent = function ($scope, xlatService, Parent) {
			try {
				OneViewConsole.Debug("AirlineChangeEvent start", "ProfileDownloadFacade.AirlineChangeEvent");

				oSetDefaultSpinner.Start();

				LoadPlaceContentBlock($scope, OneViewSessionStorage.Get("LoginUserId"), OneViewSessionStorage.Get("ServiceId"), '', '', xlatService, Parent.Id);

				oSetDefaultSpinner.Stop();

				OneViewConsole.Debug("AirlineChangeEvent end", "ProfileDownloadFacade.AirlineChangeEvent");
			}
			catch (Excep) {
				oOneViewExceptionHandler.Catch(Excep, "ProfileDownloadFacade.AirlineChangeEvent", xlatService);
			}
		}

		var LoadUnits = function ($scope, UserId, ServiceId, SpinService, toaster, xlatService) {
			try {
				// Checking network availability
				var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
				var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();
				$scope.UnitList = [];

				OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "ProfileDownloadFacade.LoadImmediateParentPlaces");

				// If network is available
				if (NetworkDetails.IsNetworkAvailable == true) {

					var UserProfileViewLst = "";
					var _oDcProfileDAO = new DcProfileDAO();

					//Load all template nodes
					UserProfileViewLst = new ProfileDownloadIL(toaster).GetParentPlacesByDATType(ServiceId, UserId, 0, DATEntityType.RCOMaster_Kitchen, (IsGlobalCleaningProfiledownloadView == true) ? DATEntityType.RCOMaster_CleaningType : DATEntityType.RCOMaster_Flight);

					//Adding user profile list datas into selected facilitys array list
					if (UserProfileViewLst != null) {

						UserProfileViewLst = UserProfileViewLst.sort(OneViewArraySorting('Name', true, function (a) { return a }));

						if (UserProfileViewLst.length > 0) {
							for (r = 0; r < UserProfileViewLst.length; r++) {
								$scope.UnitList.push({ Name: UserProfileViewLst[r].Name, Id: UserProfileViewLst[r].Id });
							}
							$scope.Unit = $scope.UnitList[0];
							return true;
						}
						else {
							return false;
						}
					}

				}
					//If internet connection is not available
				else {
					return false;
					// toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('NoInternetConnection'));
					navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
					//alert(xlatService.xlat('NoInternetConnection'));
					OneViewConsole.Info("No Internet Connection", "ProfileDownloadFacade.LoadImmediateParentPlaces");
				}

				OneViewConsole.Debug("LoadContentBlock end", "ProfileDownloadFacade.LoadImmediateParentPlaces");
			}
			catch (Excep) {
				oOneViewExceptionHandler.Catch(Excep, "ProfileDownloadFacade.LoadImmediateParentPlaces", xlatService);
			}
		}

		var LoadAirlines = function ($scope, UserId, ServiceId, SpinService, toaster, xlatService, ParentId) {
			try {
				// Checking network availability
				var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
				var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();
				$scope.AirlineList = [];

				OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "ProfileDownloadFacade.LoadImmediateParentPlaces");

				// If network is available
				if (NetworkDetails.IsNetworkAvailable == true) {

					var UserProfileViewLst = "";
					var _oDcProfileDAO = new DcProfileDAO();

					//Load all template nodes
					UserProfileViewLst = new ProfileDownloadIL(toaster).GetParentPlacesByDATType(ServiceId, UserId, ParentId, (IsGlobalCleaningProfiledownloadView == true) ? DATEntityType.RCOMaster_CleaningSection : DATEntityType.RCOMaster_Airline, (IsGlobalCleaningProfiledownloadView == true) ? DATEntityType.RCOMaster_CleaningType : DATEntityType.RCOMaster_Flight);

					//Adding user profile list datas into selected facilitys array list
					if (UserProfileViewLst != null) {

						UserProfileViewLst = UserProfileViewLst.sort(OneViewArraySorting('Name', true, function (a) { return a }));

						if (UserProfileViewLst.length > 0) {
							for (r = 0; r < UserProfileViewLst.length; r++) {
								$scope.AirlineList.push({ Name: UserProfileViewLst[r].Name, Id: UserProfileViewLst[r].Id });
							}
							$scope.Airline = $scope.AirlineList[0];
							return true;
						}
						else {
							return false;
						}
					}
				}
					//If internet connection is not available
				else {
					return false;
					// toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('NoInternetConnection'));
					navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
					//alert(xlatService.xlat('NoInternetConnection'));
					OneViewConsole.Info("No Internet Connection", "ProfileDownloadFacade.LoadImmediateParentPlaces");
				}

				OneViewConsole.Debug("LoadContentBlock end", "ProfileDownloadFacade.LoadImmediateParentPlaces");
			}
			catch (Excep) {
				oOneViewExceptionHandler.Catch(Excep, "ProfileDownloadFacade.LoadImmediateParentPlaces", xlatService);
			}
		}

		/// <summary>
		/// Select all contents
		/// </summary>
		/// <param name="$scope">Current scope</param>
		/// <param name="SpinService">SpinService for loader</param>
		this.SelectAllContents = function ($scope, SpinService, xlatService) {
			try {
				OneViewConsole.Debug("SelectAllContents start", "ProfileDownloadFacade.SelectAllContents");

				var _oProfileDownloadPresenter = new ProfileDownloadPresenter();
				_oProfileDownloadPresenter.SelectAllContents($scope);

				OneViewConsole.Debug("SelectAllContents end", "ProfileDownloadFacade.SelectAllContents");
			}
			catch (Excep) {
				oOneViewExceptionHandler.Catch(Excep, "ProfileDownloadFacade.SelectAllContents", xlatService);
			}

		}


		/// <summary>
		/// Download the selected profiles by login user
		/// </summary>
		/// <param name="$scope">Current scope</param>
		/// <param name="xlatService">xlatService for globalization</param>
		/// <param name="toaster">toaster for toast messages</param>
		/// <param name="SpinService">SpinService for loader</param>
		this.DownLoad = function ($scope, xlatService, toaster, SpinService, $location, reqParm) {
			try {
				OneViewConsole.Debug("DownLoad start", "ProfileDownloadFacade.DownLoad");

				// Checking network availability
				var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
				var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();
				OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "ProfileDownloadFacade.DownLoad");

				// If network is available
				if (NetworkDetails.IsNetworkAvailable == true) {
					var FilterParams;
					if (reqParm != undefined) {
						FilterParams = reqParm;
					}
					else {
						//selected contents
						FilterParams = NormalizeDownloadDataReqParm($scope.Selectedfacilitys, OneViewSessionStorage.Get("LoginUserId"), OneViewSessionStorage.Get("ServiceId"));
					}

					//If selected content elements are template nodes
					if (ProfileDownloadPageConfiguration.ContentElement == "TemplateNode") {

						if (FilterParams.TemplateId.length > 0) {

							var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
							oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Download_confirm_Title'), xlatService.xlat('Download_confirm_Message'), function (ConfirmationId) {

								if (ConfirmationId == "2") {
									DefaultProfiledownload(FilterParams, $scope, xlatService, toaster, SpinService, $location, reqParm);
								}
							});
						}
						else {
						  navigator.notification.alert(xlatService.xlat('NoTemplatesSelected'), ['OK'], "");
							//alert(xlatService.xlat('NoTemplatesSelected'));
							// toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('NoTemplatesSelected'));
						}
					}
					//If selected content elements are Dc places
					else {

						if (FilterParams.DcPlaceIds.length > 0) {

							var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
							oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Download_confirm_Title'), xlatService.xlat('Download_confirm_Message'), function (ConfirmationId) {

								if (ConfirmationId == "2") {
									DefaultProfiledownload(FilterParams, $scope, xlatService, toaster, SpinService, $location, reqParm);
								}
							});
						}
						else {
						  navigator.notification.alert(xlatService.xlat('NoPlacesSelected'), ['OK'], "");
							//alert(xlatService.xlat('NoPlacesSelected'));
						}
					}
				}
				else {
				  navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
					//alert(xlatService.xlat('NoInternetConnection'));
					OneViewConsole.Info("No Internet Connection", "ProfileDownloadFacade.DownLoadProfile");
				}

				OneViewConsole.Debug("DownLoad end", "ProfileDownloadFacade.DownLoad");
			}
			catch (Excep) {
				oOneViewExceptionHandler.Catch(Excep, "ProfileDownloadFacade.DownLoad", xlatService);
			}
		}


		/// <summary>
		/// DefaultProfiledownload
		/// </summary>
		/// <param name="$scope">Current scope</param>
		/// <param name="xlatService">xlatService for globalization</param>
		/// <param name="toaster">toaster for toast messages</param>
		/// <param name="SpinService">SpinService for loader</param>
		this.DefaultProfiledownload = function (FilterParams, $scope, xlatService, toaster, SpinService, $location) {

			try {
				OneViewConsole.Debug("DefaultProfiledownload start", "ProfileDownloadFacade.DefaultProfiledownload");

				try {
					var IsDefaultProfiledownloadSuccess = false;
					var _oProfileDownloadPresenter = new ProfileDownloadPresenter();
					var _oOneViewSqlitePlugin = new OneViewSqlitePlugin();

					oOneViewProgressbar.Start(xlatService.xlat("Downloading"));
					oOneViewProgressbar.SetProgressValue(10);

					var IsSyncDynamicDataSuccess = false;
					var IsCompleteMasterDataSuccess = false;
					var IsDownLoadProfileSuccess = false;
					var IsAttributeOtherConfigMetaDataSuccess = false;
					var IsMobileViewRecordsMetadataSuccess = false;
					var IsGarbageCollectorMetadataSuccess = false;
					var IsActionNCProfileSuccess = false;
					var IsHistoryMetaDataSuccess = false;
					var IsTemplateConfigSuccess = false;
					var IsDCDisplayMetaDataSuccess = false;
					var IsGlobalizationMetdataSuccess = false;
					var IsRouterMetaDataSuccess = false;
					var IsTemplatValidationConfigMetaDataSuccess = false;
					var IsTemplateUIEventJobConfigMetaDataSuccess = false;
					var IsDcCustomPageHtmlSuccess = false;
					var IsDcProfileSyncStatus = false;
					var IsMobileDcPreviewMetadataSuccess = false;
					var IsRollBack = false;

					var _oUploadBO = new UploadBO($scope, $location, xlatService, toaster);
					IsSyncDynamicDataSuccess = _oUploadBO.SyncDynamicRcoAndAssetNodes(false);
					//alert("IsSyncDynamicDataSuccess : " + IsSyncDynamicDataSuccess);

					if (IsSyncDynamicDataSuccess != null && IsSyncDynamicDataSuccess == true) {

						try {
							OneViewConsole.Debug("DefaultProfiledownload transaction start", "ProfileDownloadFacade.DefaultProfiledownload");

							_oOneViewSqlitePlugin.StartTransaction();
							oOneViewProgressbar.SetProgressValue(15);

							IsCompleteMasterDataSuccess = true;
							//var IsCompleteMasterDataSuccess = DownLoadCompleteMasterData(FilterParams, xlatService, toaster, SpinService, $location, $scope);
							//alert("IsCompleteMasterDataSuccess : " + IsCompleteMasterDataSuccess);

							if (IsCompleteMasterDataSuccess != null && IsCompleteMasterDataSuccess == true) {

								IsDownLoadProfileSuccess = DownLoadProfile(FilterParams, xlatService, toaster, SpinService, $location, $scope);
								//alert("IsDownLoadProfileSuccess : " + IsDownLoadProfileSuccess);
								oOneViewProgressbar.SetProgressValue(30);

								if (IsDownLoadProfileSuccess != null && IsDownLoadProfileSuccess == true) {

									if (ProfileDownloadPageConfiguration.ContentElement != "TemplateNode" && FilterParams.DcPlaceIds.length > 0) {

										var Incondition = "(";

										for (var i = 0; i < FilterParams.DcPlaceIds.length; i++) {
											Incondition += FilterParams.DcPlaceIds[i];
											Incondition += (i <= FilterParams.DcPlaceIds.length - 2) ? "," : ")";
										}

										var _OneViewSqlitePlugin = new OneViewSqlitePlugin();
										var Query = "SELECT TemplateNodeId FROM DcProfileEntity WHERE DcUserId = " + FilterParams.UserId + " AND DcPlaceId IN " + Incondition;

										var DcProfiles = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

										for (var i = 0; i < DcProfiles.length; i++) {
											FilterParams.TemplateId.push(DcProfiles[i].TemplateNodeId);
										}
									}

									IsAttributeOtherConfigMetaDataSuccess = DownloadMetaData(toaster, FilterParams, oOneViewProgressbar);
									//alert("IsAttributeOtherConfigMetaDataSuccess : " + IsAttributeOtherConfigMetaDataSuccess);
									oOneViewProgressbar.SetProgressValue(35);

									if (IsAttributeOtherConfigMetaDataSuccess != null && IsAttributeOtherConfigMetaDataSuccess == true) {

										IsMobileViewRecordsMetadataSuccess = DownloadMobileViewRecordsMetadata(FilterParams);
										oOneViewProgressbar.SetProgressValue(40);

										if (IsMobileViewRecordsMetadataSuccess != null && IsMobileViewRecordsMetadataSuccess == true) {

											IsActionNCProfileSuccess = DownloadActionNCProfile(toaster, FilterParams, oOneViewProgressbar);
											//alert("IsActionNCProfileSuccess : " + IsActionNCProfileSuccess);
											oOneViewProgressbar.SetProgressValue(45);

											if (IsActionNCProfileSuccess != null && IsActionNCProfileSuccess == true) {

												IsHistoryMetaDataSuccess = true;
												//IsHistoryMetaDataSuccess = DownloadHistoryMetaData(toaster, FilterParams, oOneViewProgressbar);
												//alert("IsHistoryMetaDataSuccess : " + IsHistoryMetaDataSuccess);
												oOneViewProgressbar.SetProgressValue(50);

												if (IsHistoryMetaDataSuccess != null && IsHistoryMetaDataSuccess == true) {

													IsTemplateConfigSuccess = true;
													IsTemplateConfigSuccess = DownloadTemplateConfigMetaData(toaster, FilterParams, oOneViewProgressbar);
													//alert("IsTemplateConfigSuccess : " + IsTemplateConfigSuccess);
													oOneViewProgressbar.SetProgressValue(55);

													if (IsTemplateConfigSuccess != null && IsTemplateConfigSuccess == true) {

														IsDCDisplayMetaDataSuccess = true;
														//IsDCDisplayMetaDataSuccess = DownloadDCDisplayMetaData(toaster, FilterParams, oOneViewProgressbar);
														//alert("IsDCDisplayMetaDataSuccess : " + IsDCDisplayMetaDataSuccess);
														oOneViewProgressbar.SetProgressValue(60);

														if (IsDCDisplayMetaDataSuccess != null && IsDCDisplayMetaDataSuccess == true) {

															IsGlobalizationMetdataSuccess = true;
															var _oGlobalizationMetadataBO = new GlobalizationMetadataBO();
															//FilterParams.TemplateId.push(8272); // Need to remove once server side enabled place wise
															IsGlobalizationMetdataSuccess = _oGlobalizationMetadataBO.DownloadTemplateWiseMetadata(FilterParams);
															//alert("IsGlobalizationMetdataSuccess : " + IsGlobalizationMetdataSuccess);
															oOneViewProgressbar.SetProgressValue(65);

															if (IsGlobalizationMetdataSuccess != null && IsGlobalizationMetdataSuccess == true) {

																IsRouterMetaDataSuccess = true;
																if (EnableRouterMetaDataDownload == true) {
																	//IsRouterMetaDataSuccess = DownloadRouterMetaData();
																	//oOneViewProgressbar.SetProgressValue(97);

																	var _oRouterConfigMetaDataBO = new RouterConfigMetaDataBO(xlatService);
																	var IsRouterMetaDataSuccess = _oRouterConfigMetaDataBO.Download();
																	oOneViewProgressbar.SetProgressValue(70);
																}

																if (IsRouterMetaDataSuccess != null && IsRouterMetaDataSuccess == true) {

																	IsTemplatValidationConfigMetaDataSuccess = DownloadTemplatValidationConfigMetaData(FilterParams);
																	//alert('IsTemplatValidationConfigMetaDataSuccess : ' + IsTemplatValidationConfigMetaDataSuccess);
																	oOneViewProgressbar.SetProgressValue(75);

																	if (IsTemplatValidationConfigMetaDataSuccess != null && IsTemplatValidationConfigMetaDataSuccess == true) {

																		IsTemplateUIEventJobConfigMetaDataSuccess = DownloadTemplateUIEventJobConfigMetaData(FilterParams);
																		//alert('IsTemplateUIEventJobConfigMetaDataSuccess : ' + IsTemplateUIEventJobConfigMetaDataSuccess);
																		oOneViewProgressbar.SetProgressValue(80);

																		if (IsTemplateUIEventJobConfigMetaDataSuccess != null && IsTemplateUIEventJobConfigMetaDataSuccess == true) {

																			IsDcCustomPageHtmlSuccess = DownloadDcCustomPageHtml(FilterParams);
																			//alert('IsDcCustomPageHtmlSuccess : ' + IsDcCustomPageHtmlSuccess);
																			oOneViewProgressbar.SetProgressValue(85);

																			if (IsDcCustomPageHtmlSuccess != null && IsDcCustomPageHtmlSuccess == true) {

																				var _oDcProfileSyncStatusBO = new DcProfileSyncStatusBO();
																				IsDcProfileSyncStatus = _oDcProfileSyncStatusBO.Download(xlatService);

																				//alert('IsDcProfileSyncStatus : ' + IsDcProfileSyncStatus);
																				oOneViewProgressbar.SetProgressValue(90);

																				if (IsDcProfileSyncStatus != null && IsDcProfileSyncStatus == true) {

																					IsGarbageCollectorMetadataSuccess = DownloadGarbageCollectorMetadata(FilterParams);

																					//alert('IsGarbageCollectorMetadataSuccess : ' + IsGarbageCollectorMetadataSuccess);
																					oOneViewProgressbar.SetProgressValue(95);

																					if (IsGarbageCollectorMetadataSuccess != null && IsGarbageCollectorMetadataSuccess == true) {

																						IsExcludedAttributeMetadataSuccess = true;
																						IsExcludedAttributeMetadataSuccess = MyInstance.DownloadExcludedAttributeMetadata(FilterParams);
																						//alert("IsExcludedAttributeMetadataSuccess : " + IsExcludedAttributeMetadataSuccess);
																						oOneViewProgressbar.SetProgressValue(96);

																						if (IsExcludedAttributeMetadataSuccess != null && IsExcludedAttributeMetadataSuccess == true) {

																							IsMobileDcPreviewMetadataSuccess = DownloadMobileDcPreviewMetadata(FilterParams);

																							//alert('IsMobileDcPreviewMetadataSuccess : ' + IsMobileDcPreviewMetadataSuccess);
																							oOneViewProgressbar.SetProgressValue(97);

																							if (IsMobileDcPreviewMetadataSuccess != null && IsMobileDcPreviewMetadataSuccess == true) {

																								var _oDcPendingTaskBO = new DcPendingTaskBO();
																								_oDcPendingTaskBO.Download();

																								oOneViewProgressbar.SetProgressValue(98);
																								MyInstance.DownlaodActionFollowUpDetails(FilterParams);

																								//Todo : ( 20-03-2017 Added by Sangeeta Bhatt) :  Need to call this API asynchronously shold not effect the main profiledownload API
																								//Currently because of asynchronous 20 seconds time issue API is not asynchronously
																								//Update Server Sync Status
																								var _SyncFrameworkBO = new SyncFrameworkBO();
																								_SyncFrameworkBO.UpdateServerSyncStatus();
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}

							if (IsSyncDynamicDataSuccess == null || IsCompleteMasterDataSuccess == null || IsDownLoadProfileSuccess == null || IsAttributeOtherConfigMetaDataSuccess == null || IsMobileViewRecordsMetadataSuccess == null || IsActionNCProfileSuccess == null || IsHistoryMetaDataSuccess == null || IsTemplateConfigSuccess == null || IsDCDisplayMetaDataSuccess == null || IsGlobalizationMetdataSuccess == null || IsRouterMetaDataSuccess == null || IsTemplatValidationConfigMetaDataSuccess == null || IsTemplateUIEventJobConfigMetaDataSuccess == null || IsDcCustomPageHtmlSuccess == null || IsDcProfileSyncStatus == null || IsGarbageCollectorMetadataSuccess == null || IsMobileDcPreviewMetadataSuccess == null) {
								oOneViewProgressbar.Stop();

								OneViewConsole.Debug("DefaultProfiledownload transaction going to rollback", "ProfileDownloadFacade.DefaultProfiledownload");
								_oOneViewSqlitePlugin.Rollback();
								OneViewConsole.Debug("DefaultProfiledownload transaction successfully rollbacked", "ProfileDownloadFacade.DefaultProfiledownload");
							}

							else {
								if (IsSyncDynamicDataSuccess == true && IsCompleteMasterDataSuccess == true && IsDownLoadProfileSuccess == true && IsAttributeOtherConfigMetaDataSuccess == true && IsMobileViewRecordsMetadataSuccess == true && IsActionNCProfileSuccess == true && IsHistoryMetaDataSuccess == true && IsTemplateConfigSuccess == true && IsDCDisplayMetaDataSuccess == true && IsGlobalizationMetdataSuccess == true && IsRouterMetaDataSuccess == true && IsTemplatValidationConfigMetaDataSuccess == true && IsTemplateUIEventJobConfigMetaDataSuccess == true && IsDcCustomPageHtmlSuccess == true && IsDcProfileSyncStatus == true && IsGarbageCollectorMetadataSuccess == true && IsMobileDcPreviewMetadataSuccess == true) {

									IsDefaultProfiledownloadSuccess = true;
									SetLastResetDate();
									//UpdateDownloadStatus($scope, FilterParams);

									var oRCODeletion = new RCODeletion();
									oRCODeletion.DeleteJunkRCO();

									var oDcProfileDeletionComponent = new DcProfileDeletionComponent();
									oDcProfileDeletionComponent.DeleteExpiredAndUnUsedProfiles();

									//To-do : (Dated : 18-02-2016 :  Need to change , we need to call garbage collector as per garbage collector metadata
									if (OneViewGlobalServiceTypeEnum[OneViewGlobalServiceType] == 1 || OneViewGlobalServiceTypeEnum[OneViewGlobalServiceType] == 2) {
										var _oDcDeletion = new DcDeletion(); // For dispatching process (Need to remove)
										_oDcDeletion.DeleteInCompleteAndSyncedDataFromNow(1, 8272, -1, -1);
										_oDcDeletion.DeleteInCompleteAndSyncedDataFromNow(2, 8272, -1, -1);
									}
									//


									var _oDefaultMasterDAO = new DefaultMasterDAO("DcResultDetailsHistory");
									_oDefaultMasterDAO.Delete();

									oOneViewProgressbar.SetProgressValue(100);
									oOneViewProgressbar.Stop();
								}
								else {
									oOneViewProgressbar.Stop();
									_oProfileDownloadPresenter.ShowDownloadFailed(xlatService);

									OneViewConsole.Debug("Sync tree : " + IsSyncDynamicDataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
									OneViewConsole.Debug("Complete Master : " + IsCompleteMasterDataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
									OneViewConsole.Debug("Profile download : " + IsDownLoadProfileSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
									OneViewConsole.Debug("Attribute Other Config : " + IsAttributeOtherConfigMetaDataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
									OneViewConsole.Debug("Mobile ViewRecords Metadata : " + IsMobileViewRecordsMetadataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
									OneViewConsole.Debug("Action NC Profile : " + IsActionNCProfileSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
									OneViewConsole.Debug("History MetaData : " + IsHistoryMetaDataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
									OneViewConsole.Debug("TemplateConfig MetaData : " + IsTemplateConfigSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
									OneViewConsole.Debug("DCDisplay MetaData : " + IsDCDisplayMetaDataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
									OneViewConsole.Debug("Globalization Metdata : " + IsGlobalizationMetdataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
									OneViewConsole.Debug("Router Metdata : " + IsRouterMetaDataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
									OneViewConsole.Debug("TemplatValidationConfig Metdata : " + IsTemplatValidationConfigMetaDataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
									OneViewConsole.Debug("TemplateUIEventJobConfig Metdata : " + IsTemplateUIEventJobConfigMetaDataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
									OneViewConsole.Debug("DcCustomPageHtmlSuccess : " + IsDcCustomPageHtmlSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
									OneViewConsole.Debug("IsDcProfileSyncStatus : " + IsDcProfileSyncStatus, "ProfileDownloadFacade.DefaultProfiledownload");
									OneViewConsole.Debug("IsGarbageCollectorMetadataSuccess : " + IsGarbageCollectorMetadataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
									OneViewConsole.Debug("IsMobileDcPreviewMetadataSuccess : " + IsMobileDcPreviewMetadataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");

									OneViewConsole.Debug("DefaultProfiledownload transaction going to rollback", "ProfileDownloadFacade.DefaultProfiledownload");
									_oOneViewSqlitePlugin.Rollback();
									OneViewConsole.Debug("DefaultProfiledownload transaction successfully rollbacked", "ProfileDownloadFacade.DefaultProfiledownload");

									IsRollBack = true;
								}

								if (IsRollBack == false) {
									_oOneViewSqlitePlugin.EndTransaction();
									OneViewConsole.Debug("DefaultProfiledownload transaction commit", "ProfileDownloadFacade.DefaultProfiledownload");
								}

								$scope.$apply();
							}

							oOneViewProgressbar.Stop();
						}
						catch (Excep) {
							oOneViewProgressbar.Stop();
							_oProfileDownloadPresenter.ShowDownloadFailed(xlatService);

							OneViewConsole.Debug("DefaultProfiledownload transaction going to rollback", "ProfileDownloadFacade.DefaultProfiledownload");
							_oOneViewSqlitePlugin.Rollback();
							OneViewConsole.Debug("DefaultProfiledownload transaction successfully rollbacked", "ProfileDownloadFacade.DefaultProfiledownload");
						}
					}
					else {
						oOneViewProgressbar.Stop();
						_oProfileDownloadPresenter.ShowDownloadFailed(xlatService);

						OneViewConsole.Debug("Sync tree : " + IsSyncDynamicDataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
						OneViewConsole.Debug("Complete Master : " + IsCompleteMasterDataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
						OneViewConsole.Debug("Profile download : " + IsDownLoadProfileSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
						OneViewConsole.Debug("Attribute Other Config : " + IsAttributeOtherConfigMetaDataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
						OneViewConsole.Debug("Mobile ViewRecords Metadata : " + IsMobileViewRecordsMetadataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
						OneViewConsole.Debug("Action NC Profile : " + IsActionNCProfileSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
						OneViewConsole.Debug("History MetaData : " + IsHistoryMetaDataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
						OneViewConsole.Debug("TemplateConfig MetaData : " + IsTemplateConfigSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
						OneViewConsole.Debug("DCDisplay MetaData : " + IsDCDisplayMetaDataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
						OneViewConsole.Debug("Globalization Metdata : " + IsGlobalizationMetdataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
						OneViewConsole.Debug("Router Metdata : " + IsRouterMetaDataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
						OneViewConsole.Debug("TemplatValidationConfig Metdata : " + IsTemplatValidationConfigMetaDataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
						OneViewConsole.Debug("TemplateUIEventJobConfig Metdata : " + IsTemplateUIEventJobConfigMetaDataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
						OneViewConsole.Debug("DcCustomPageHtmlSuccess : " + IsDcCustomPageHtmlSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
						OneViewConsole.Debug("IsDcProfileSyncStatus : " + IsDcProfileSyncStatus, "ProfileDownloadFacade.DefaultProfiledownload");
						OneViewConsole.Debug("IsGarbageCollectorMetadataSuccess : " + IsGarbageCollectorMetadataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
						OneViewConsole.Debug("IsMobileDcPreviewMetadataSuccess : " + IsMobileDcPreviewMetadataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
					}

					return IsDefaultProfiledownloadSuccess;
				}
				catch (Excep) {
					throw oOneViewExceptionHandler.Create("Facade", "ProfileDownloadFacade.DefaultProfiledownload", Excep);
				}

				OneViewConsole.Debug("DefaultProfiledownload end", "ProfileDownloadFacade.DefaultProfiledownload");
			}
			catch (Excep) {
				oOneViewExceptionHandler.Catch(Excep, "ProfileDownloadFacade.DefaultProfiledownload", xlatService);
			}
		}


		/// <summary>
		/// DefaultProfiledownload
		/// </summary>
		/// <param name="$scope">Current scope</param>
		/// <param name="xlatService">xlatService for globalization</param>
		/// <param name="toaster">toaster for toast messages</param>
		/// <param name="SpinService">SpinService for loader</param>
		var DefaultProfiledownload = function (FilterParams, $scope, xlatService, toaster, SpinService, $location, reqParm) {

			try{
				var _oProfileDownloadPresenter = new ProfileDownloadPresenter();
				var _oOneViewSqlitePlugin = new OneViewSqlitePlugin();

				oOneViewProgressbar.Start(xlatService.xlat("Downloading"));
				oOneViewProgressbar.SetProgressValue(10);

				var IsSyncDynamicDataSuccess = false;
				var IsCompleteMasterDataSuccess = false;
				var IsDownLoadProfileSuccess = false;
				var IsAttributeOtherConfigMetaDataSuccess = false;
				var IsMobileViewRecordsMetadataSuccess = false;
				var IsGarbageCollectorMetadataSuccess = false;
				var IsActionNCProfileSuccess = false;
				var IsHistoryMetaDataSuccess = false;
				var IsTemplateConfigSuccess = false;
				var IsDCDisplayMetaDataSuccess = false;
				var IsGlobalizationMetdataSuccess = false;
				var IsRouterMetaDataSuccess = false;
				var IsTemplatValidationConfigMetaDataSuccess = false;
				var IsTemplateUIEventJobConfigMetaDataSuccess = false;
				var IsDcCustomPageHtmlSuccess = false;
				var IsDcProfileSyncStatus = false;
				var IsMobileDcPreviewMetadataSuccess = false;
				var IsRollBack = false;

				var _oUploadBO = new UploadBO($scope, $location, xlatService, toaster);
				IsSyncDynamicDataSuccess = _oUploadBO.SyncDynamicRcoAndAssetNodes(false);
				//alert("IsSyncDynamicDataSuccess : " + IsSyncDynamicDataSuccess);

				if (IsSyncDynamicDataSuccess != null && IsSyncDynamicDataSuccess == true) {

					try {
						OneViewConsole.Debug("DefaultProfiledownload transaction start", "ProfileDownloadFacade.DefaultProfiledownload");

						_oOneViewSqlitePlugin.StartTransaction();
						oOneViewProgressbar.SetProgressValue(15);

						IsCompleteMasterDataSuccess = true;
						//var IsCompleteMasterDataSuccess = DownLoadCompleteMasterData(FilterParams, xlatService, toaster, SpinService, $location, $scope);
						//alert("IsCompleteMasterDataSuccess : " + IsCompleteMasterDataSuccess);

						if (IsCompleteMasterDataSuccess != null && IsCompleteMasterDataSuccess == true) {

							IsDownLoadProfileSuccess = DownLoadProfile(FilterParams, xlatService, toaster, SpinService, $location, $scope);
							//alert("IsDownLoadProfileSuccess : " + IsDownLoadProfileSuccess);
							oOneViewProgressbar.SetProgressValue(30);

							if (IsDownLoadProfileSuccess != null && IsDownLoadProfileSuccess == true) {

								if (ProfileDownloadPageConfiguration.ContentElement != "TemplateNode" && FilterParams.DcPlaceIds.length > 0) {

									var Incondition = "(";

									for (var i = 0; i < FilterParams.DcPlaceIds.length; i++) {
										Incondition += FilterParams.DcPlaceIds[i];
										Incondition += (i <= FilterParams.DcPlaceIds.length - 2) ? "," : ")";
									}

									var _OneViewSqlitePlugin = new OneViewSqlitePlugin();
									var Query = "SELECT TemplateNodeId FROM DcProfileEntity WHERE DcUserId = " + FilterParams.UserId + " AND DcPlaceId IN " + Incondition;

									var DcProfiles = _OneViewSqlitePlugin.ExcecuteSqlReader(Query);

									for (var i = 0; i < DcProfiles.length; i++) {
										FilterParams.TemplateId.push(DcProfiles[i].TemplateNodeId);
									}
								}

								IsAttributeOtherConfigMetaDataSuccess = DownloadMetaData(toaster, FilterParams, oOneViewProgressbar);
								//alert("IsAttributeOtherConfigMetaDataSuccess : " + IsAttributeOtherConfigMetaDataSuccess);
								oOneViewProgressbar.SetProgressValue(35);

								if (IsAttributeOtherConfigMetaDataSuccess != null && IsAttributeOtherConfigMetaDataSuccess == true) {

									IsMobileViewRecordsMetadataSuccess = DownloadMobileViewRecordsMetadata(FilterParams);
									oOneViewProgressbar.SetProgressValue(40);

									if (IsMobileViewRecordsMetadataSuccess != null && IsMobileViewRecordsMetadataSuccess == true) {

										IsActionNCProfileSuccess = DownloadActionNCProfile(toaster, FilterParams, oOneViewProgressbar);
										//alert("IsActionNCProfileSuccess : " + IsActionNCProfileSuccess);
										oOneViewProgressbar.SetProgressValue(45);

										if (IsActionNCProfileSuccess != null && IsActionNCProfileSuccess == true) {

											IsHistoryMetaDataSuccess = true;
											//IsHistoryMetaDataSuccess = DownloadHistoryMetaData(toaster, FilterParams, oOneViewProgressbar);
											//alert("IsHistoryMetaDataSuccess : " + IsHistoryMetaDataSuccess);
											oOneViewProgressbar.SetProgressValue(50);

											if (IsHistoryMetaDataSuccess != null && IsHistoryMetaDataSuccess == true) {

												IsTemplateConfigSuccess = true;
												IsTemplateConfigSuccess = DownloadTemplateConfigMetaData(toaster, FilterParams, oOneViewProgressbar);
												//alert("IsTemplateConfigSuccess : " + IsTemplateConfigSuccess);
												oOneViewProgressbar.SetProgressValue(55);

												if (IsTemplateConfigSuccess != null && IsTemplateConfigSuccess == true) {

													IsDCDisplayMetaDataSuccess = true;
													//IsDCDisplayMetaDataSuccess = DownloadDCDisplayMetaData(toaster, FilterParams, oOneViewProgressbar);
													//alert("IsDCDisplayMetaDataSuccess : " + IsDCDisplayMetaDataSuccess);
													oOneViewProgressbar.SetProgressValue(60);

													if (IsDCDisplayMetaDataSuccess != null && IsDCDisplayMetaDataSuccess == true) {

														IsGlobalizationMetdataSuccess = true;
														var _oGlobalizationMetadataBO = new GlobalizationMetadataBO();
														FilterParams.TemplateId.push(8272); // Need to remove once server side enabled place wise
														IsGlobalizationMetdataSuccess = _oGlobalizationMetadataBO.DownloadTemplateWiseMetadata(FilterParams);
														//alert("IsGlobalizationMetdataSuccess : " + IsGlobalizationMetdataSuccess);
														oOneViewProgressbar.SetProgressValue(65);

														if (IsGlobalizationMetdataSuccess != null && IsGlobalizationMetdataSuccess == true) {

															IsRouterMetaDataSuccess = true;
															if (EnableRouterMetaDataDownload == true) {
																//IsRouterMetaDataSuccess = DownloadRouterMetaData();
																//oOneViewProgressbar.SetProgressValue(97);

																var _oRouterConfigMetaDataBO = new RouterConfigMetaDataBO(xlatService);
																var IsRouterMetaDataSuccess = _oRouterConfigMetaDataBO.Download();
																oOneViewProgressbar.SetProgressValue(70);
															}

															if (IsRouterMetaDataSuccess != null && IsRouterMetaDataSuccess == true) {

																IsTemplatValidationConfigMetaDataSuccess = DownloadTemplatValidationConfigMetaData(FilterParams);
																//alert('IsTemplatValidationConfigMetaDataSuccess : ' + IsTemplatValidationConfigMetaDataSuccess);
																oOneViewProgressbar.SetProgressValue(75);

																if (IsTemplatValidationConfigMetaDataSuccess != null && IsTemplatValidationConfigMetaDataSuccess == true) {

																	IsTemplateUIEventJobConfigMetaDataSuccess = DownloadTemplateUIEventJobConfigMetaData(FilterParams);
																	//alert('IsTemplateUIEventJobConfigMetaDataSuccess : ' + IsTemplateUIEventJobConfigMetaDataSuccess);
																	oOneViewProgressbar.SetProgressValue(80);

																	if (IsTemplateUIEventJobConfigMetaDataSuccess != null && IsTemplateUIEventJobConfigMetaDataSuccess == true) {

																		IsDcCustomPageHtmlSuccess = DownloadDcCustomPageHtml(FilterParams);
																		//alert('IsDcCustomPageHtmlSuccess : ' + IsDcCustomPageHtmlSuccess);
																		oOneViewProgressbar.SetProgressValue(85);

																		if (IsDcCustomPageHtmlSuccess != null && IsDcCustomPageHtmlSuccess == true) {

																			IsDcProfileSyncStatus = true; // From my audit we are not downloading (Because of ekfc only using this page)
																			//var _oDcProfileSyncStatusBO = new DcProfileSyncStatusBO();
																			//IsDcProfileSyncStatus = _oDcProfileSyncStatusBO.Download(xlatService);

																			//alert('IsDcProfileSyncStatus : ' + IsDcProfileSyncStatus);
																			oOneViewProgressbar.SetProgressValue(90);

																			if (IsDcProfileSyncStatus != null && IsDcProfileSyncStatus == true) {

																				IsGarbageCollectorMetadataSuccess = DownloadGarbageCollectorMetadata(FilterParams);

																				//alert('IsGarbageCollectorMetadataSuccess : ' + IsGarbageCollectorMetadataSuccess);
																				oOneViewProgressbar.SetProgressValue(95);

																				if (IsGarbageCollectorMetadataSuccess != null && IsGarbageCollectorMetadataSuccess == true) {

																					IsExcludedAttributeMetadataSuccess = true;
																					IsExcludedAttributeMetadataSuccess = MyInstance.DownloadExcludedAttributeMetadata(FilterParams);
																					//alert("IsExcludedAttributeMetadataSuccess : " + IsExcludedAttributeMetadataSuccess);
																					oOneViewProgressbar.SetProgressValue(96);
																					if (IsExcludedAttributeMetadataSuccess != null && IsExcludedAttributeMetadataSuccess == true) {

																						IsMobileDcPreviewMetadataSuccess = DownloadMobileDcPreviewMetadata(FilterParams);

																						//alert('IsMobileDcPreviewMetadataSuccess : ' + IsMobileDcPreviewMetadataSuccess);
																						oOneViewProgressbar.SetProgressValue(97);

																						if (IsMobileDcPreviewMetadataSuccess != null && IsMobileDcPreviewMetadataSuccess == true) {

																							var _oDcPendingTaskBO = new DcPendingTaskBO();
																							_oDcPendingTaskBO.Download();

																							oOneViewProgressbar.SetProgressValue(98);
																							MyInstance.DownlaodActionFollowUpDetails(FilterParams);

																							//Todo : ( 20-03-2017 Added by Sangeeta Bhatt) :  Need to call this API asynchronously shold not effect the main profiledownload API
																							//Currently because of asynchronous 20 seconds time issue API is not asynchronously
																							//Update Server Sync Status
																							var _SyncFrameworkBO = new SyncFrameworkBO();
																							_SyncFrameworkBO.UpdateServerSyncStatus();
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}

						if (IsSyncDynamicDataSuccess == null || IsCompleteMasterDataSuccess == null || IsDownLoadProfileSuccess == null || IsAttributeOtherConfigMetaDataSuccess == null || IsMobileViewRecordsMetadataSuccess == null || IsActionNCProfileSuccess == null || IsHistoryMetaDataSuccess == null || IsTemplateConfigSuccess == null || IsDCDisplayMetaDataSuccess == null || IsGlobalizationMetdataSuccess == null || IsRouterMetaDataSuccess == null || IsTemplatValidationConfigMetaDataSuccess == null || IsTemplateUIEventJobConfigMetaDataSuccess == null || IsDcCustomPageHtmlSuccess == null || IsDcProfileSyncStatus == null || IsGarbageCollectorMetadataSuccess == null || IsMobileDcPreviewMetadataSuccess == null) {
							oOneViewProgressbar.Stop();

							OneViewConsole.Debug("DefaultProfiledownload transaction going to rollback", "ProfileDownloadFacade.DefaultProfiledownload");
							_oOneViewSqlitePlugin.Rollback();
							OneViewConsole.Debug("DefaultProfiledownload transaction successfully rollbacked", "ProfileDownloadFacade.DefaultProfiledownload");
						}

						else {
							if (IsSyncDynamicDataSuccess == true && IsCompleteMasterDataSuccess == true && IsDownLoadProfileSuccess == true && IsAttributeOtherConfigMetaDataSuccess == true && IsMobileViewRecordsMetadataSuccess == true && IsActionNCProfileSuccess == true && IsHistoryMetaDataSuccess == true && IsTemplateConfigSuccess == true && IsDCDisplayMetaDataSuccess == true && IsGlobalizationMetdataSuccess == true && IsRouterMetaDataSuccess == true && IsTemplatValidationConfigMetaDataSuccess == true || IsTemplateUIEventJobConfigMetaDataSuccess == true && IsDcCustomPageHtmlSuccess == true && IsDcProfileSyncStatus == true && IsGarbageCollectorMetadataSuccess == true && IsMobileDcPreviewMetadataSuccess == true) {

								SetLastResetDate();
								if (reqParm == undefined) {
									UpdateDownloadStatus($scope, FilterParams);
								}
								var oRCODeletion = new RCODeletion();
								oRCODeletion.DeleteJunkRCO();

								var oDcProfileDeletionComponent = new DcProfileDeletionComponent();
								oDcProfileDeletionComponent.DeleteExpiredAndUnUsedProfiles();


								//To-do : (Dated : 18-02-2016 :  Need to change , we need to call garbage collector as per garbage collector metadata
								if (OneViewGlobalServiceTypeEnum[OneViewGlobalServiceType] == 1 || OneViewGlobalServiceTypeEnum[OneViewGlobalServiceType] == 2) {
									var _oDcDeletion = new DcDeletion(); // For dispatching process (Need to remove)
									_oDcDeletion.DeleteInCompleteAndSyncedDataFromNow(1, 8272, -1, -1);
									_oDcDeletion.DeleteInCompleteAndSyncedDataFromNow(2, 8272, -1, -1);
								}
								//


								var _oDefaultMasterDAO = new DefaultMasterDAO("DcResultDetailsHistory");
								_oDefaultMasterDAO.Delete();

								oOneViewProgressbar.SetProgressValue(100);
								oOneViewProgressbar.Stop();

								var IsFollowUpUser = CheckIsFollowUpUser();

								var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
								oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Navigate_confirm_Title'), xlatService.xlat('Navigate_confirm_Message'), function (ConfirmationId) {

									if (ConfirmationId == "2") {
										var oDcScheduleCheckingComponent = new DcScheduleCheckingComponent();
										var IsProfileExists = oDcScheduleCheckingComponent.CheckIsAnyValidProfileExists(-1, -1, -1);

										if (IsProfileExists == true) {
											if (IsFollowUpUser != true) {
												$location.url('/newdc');
												$scope.$apply();
											}
											else {
												$location.url('/nav/my-audit');
												$scope.$apply();
											}
										}
										else {
											alert("IN-NF-PD-001 :: No valid profiles available. Please go to MyAudits page to edit existing records.");
										}
									}
									else {
										$scope.$apply();
									}
								});
							}
							else {
								oOneViewProgressbar.Stop();
								_oProfileDownloadPresenter.ShowDownloadFailed(xlatService);

								OneViewConsole.Debug("Sync tree : " + IsSyncDynamicDataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
								OneViewConsole.Debug("Complete Master : " + IsCompleteMasterDataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
								OneViewConsole.Debug("Profile download : " + IsDownLoadProfileSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
								OneViewConsole.Debug("Attribute Other Config : " + IsAttributeOtherConfigMetaDataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
								OneViewConsole.Debug("Mobile ViewRecords Metadata : " + IsMobileViewRecordsMetadataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
								OneViewConsole.Debug("Action NC Profile : " + IsActionNCProfileSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
								OneViewConsole.Debug("History MetaData : " + IsHistoryMetaDataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
								OneViewConsole.Debug("TemplateConfig MetaData : " + IsTemplateConfigSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
								OneViewConsole.Debug("DCDisplay MetaData : " + IsDCDisplayMetaDataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
								OneViewConsole.Debug("Globalization Metdata : " + IsGlobalizationMetdataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
								OneViewConsole.Debug("Router Metdata : " + IsRouterMetaDataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
								OneViewConsole.Debug("TemplatValidationConfig Metdata : " + IsTemplatValidationConfigMetaDataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
								OneViewConsole.Debug("TemplateUIEventJobConfig Metdata : " + IsTemplateUIEventJobConfigMetaDataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
								OneViewConsole.Debug("DcCustomPageHtmlSuccess : " + IsDcCustomPageHtmlSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
								OneViewConsole.Debug("IsDcProfileSyncStatus : " + IsDcProfileSyncStatus, "ProfileDownloadFacade.DefaultProfiledownload");
								OneViewConsole.Debug("IsGarbageCollectorMetadataSuccess : " + IsGarbageCollectorMetadataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
								OneViewConsole.Debug("IsMobileDcPreviewMetadataSuccess : " + IsMobileDcPreviewMetadataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");

								OneViewConsole.Debug("DefaultProfiledownload transaction going to rollback", "ProfileDownloadFacade.DefaultProfiledownload");
								_oOneViewSqlitePlugin.Rollback();
								OneViewConsole.Debug("DefaultProfiledownload transaction successfully rollbacked", "ProfileDownloadFacade.DefaultProfiledownload");

								IsRollBack = true;
							}

							if (IsRollBack == false) {
								_oOneViewSqlitePlugin.EndTransaction();
								OneViewConsole.Debug("DefaultProfiledownload transaction commit", "ProfileDownloadFacade.DefaultProfiledownload");
							}

							$scope.$apply();
						}

						oOneViewProgressbar.Stop();
					}
					catch (Excep) {
						oOneViewProgressbar.Stop();
						_oProfileDownloadPresenter.ShowDownloadFailed(xlatService);

						OneViewConsole.Debug("DefaultProfiledownload transaction going to rollback", "ProfileDownloadFacade.DefaultProfiledownload");
						_oOneViewSqlitePlugin.Rollback();
						OneViewConsole.Debug("DefaultProfiledownload transaction successfully rollbacked", "ProfileDownloadFacade.DefaultProfiledownload");
					}
				}
				else {
					oOneViewProgressbar.Stop();
					_oProfileDownloadPresenter.ShowDownloadFailed(xlatService);

					OneViewConsole.Debug("Sync tree : " + IsSyncDynamicDataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
					OneViewConsole.Debug("Complete Master : " + IsCompleteMasterDataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
					OneViewConsole.Debug("Profile download : " + IsDownLoadProfileSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
					OneViewConsole.Debug("Attribute Other Config : " + IsAttributeOtherConfigMetaDataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
					OneViewConsole.Debug("Mobile ViewRecords Metadata : " + IsMobileViewRecordsMetadataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
					OneViewConsole.Debug("Action NC Profile : " + IsActionNCProfileSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
					OneViewConsole.Debug("History MetaData : " + IsHistoryMetaDataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
					OneViewConsole.Debug("TemplateConfig MetaData : " + IsTemplateConfigSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
					OneViewConsole.Debug("DCDisplay MetaData : " + IsDCDisplayMetaDataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
					OneViewConsole.Debug("Globalization Metdata : " + IsGlobalizationMetdataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
					OneViewConsole.Debug("Router Metdata : " + IsRouterMetaDataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
					OneViewConsole.Debug("TemplatValidationConfig Metdata : " + IsTemplatValidationConfigMetaDataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
					OneViewConsole.Debug("TemplateUIEventJobConfig Metdata : " + IsTemplateUIEventJobConfigMetaDataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
					OneViewConsole.Debug("DcCustomPageHtmlSuccess : " + IsDcCustomPageHtmlSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
					OneViewConsole.Debug("IsDcProfileSyncStatus : " + IsDcProfileSyncStatus, "ProfileDownloadFacade.DefaultProfiledownload");
					OneViewConsole.Debug("IsGarbageCollectorMetadataSuccess : " + IsGarbageCollectorMetadataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
					OneViewConsole.Debug("IsMobileDcPreviewMetadataSuccess : " + IsMobileDcPreviewMetadataSuccess, "ProfileDownloadFacade.DefaultProfiledownload");
				}
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Facade", "ProfileDownloadFacade.DefaultProfiledownload", Excep);
			}
		}


		this.DownlaodActionFollowUpDetails = function (Req) {

			try {
				OneViewConsole.Debug("DownlaodActionFollowUpDetails start", "DasboardBO.DownlaodActionFollowUpDetails");

				//if (Req.TemplateNodeId == undefined && Req["TemplateId"] != undefined) {
				//    Req["TemplateNodeId"] = Req.TemplateId;
				//}
				//if (Req.DcPlaceId == undefined && Req["DcPlaceIds"] != undefined) {
				//    Req["DcPlaceId"] = Req.DcPlaceIds;
				//}

				var _oValidateActionFollowUpBeforeNewDC = new ValidateActionFollowUpBeforeNewDCHandler(GlobalxlatService);
				_oValidateActionFollowUpBeforeNewDC.DownlaodActionFollowUpDetails(Req);

				OneViewConsole.Debug("DownlaodActionFollowUpDetails end", "DasboardBO.DownlaodActionFollowUpDetails");
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("BO", "DasboardBO.DownlaodActionFollowUpDetails", Excep);
			}
			finally {
			}
		}


		/// <summary>
		/// Graph Search
		/// </summary>
		/// <param name="$scope">Current scope</param>
		/// <param name="GraphSearchElement">Graph Search Element</param>
		this.GraphSearch = function ($scope, GraphSearchElement) {

			$scope.Selectedfacilitys = [];

			if (GraphSearchElement != "") {

				GraphSearchElement = GraphSearchElement.split(" ");

				var SearchedProfilesIndex = 0;
				var SearchedProfiles = new Array();

				for (var i = 0; i < Profiles.length; i++) {

					var IsSuccess = IsSearchElementsExist(Profiles[i].label, GraphSearchElement);

					if (IsSuccess == true) {
						SearchedProfiles[SearchedProfilesIndex] = Profiles[i];
						SearchedProfilesIndex += 1;
					}
				}

				$scope.Selectedfacilitys = SearchedProfiles;
			}
			else {
				$scope.Selectedfacilitys = Profiles;
			}
		}


		/// <summary>
		/// Change Dimension (Templatewise or Placewise)
		/// </summary>
		/// <param name="$scope">Current scope</param>
		/// <param name="xlatService">xlatService for globalization</param>
		/// <param name="toaster">toaster for toast messages</param>
		/// <param name="SpinService">SpinService for loader</param>
		this.ChangeDimension = function ($scope, $timeout, xlatService, toaster, SpinService) {

			try {
				oSetDefaultSpinner.Start();

				if ($scope.Dimension == "Place") {
					$scope.Dimension = "Template";
					ProfileDownloadPageConfiguration = { 'ContentElement': "DcPlace" };
					//$scope.ImmediateParentColumn = true;
				}
				else {
					$scope.Dimension = "Place";
					ProfileDownloadPageConfiguration = { 'ContentElement': "TemplateNode" };
					//$scope.ImmediateParentColumn = false;
				}

				$scope.GraphSearchElement = "";


				var IsLoadView = MyInstance.PageLoad($scope, $timeout, xlatService, toaster, SpinService);


				if ($scope.Dimension == "Template") {
					if (IsLoadView == true) {
						$scope.ImmediateParentColumn = true;
					}
					else {
						$scope.ImmediateParentColumn = false;
						//alert(xlatService.xlat('NoProfiles'));
					}
				}
				else {
					$scope.ImmediateParentColumn = false;
				}

				if (IsGlobalCleaningProfiledownloadView == true) {
					$scope.FilterDropdown2 = "Section";
				}
				else {
					$scope.FilterDropdown2 = "Airline";
				}

				oSetDefaultSpinner.Stop();
			}
			catch (Excep) {
				oOneViewExceptionHandler.Catch(Excep, "ProfileDownloadFacade.ChangeDimension", xlatService);
			}
		}


		/// <summary>
		/// Search Elements Exist or not
		/// </summary>
		/// <param name="SourceKey">Source Key</param>
		/// <param name="SearchKeys">Search Keys</param>
		var IsSearchElementsExist = function (SourceKey, SearchKeys) {

			try {
				var IsSuccess = true;

				SourceKey = SourceKey.toLowerCase();

				for (var i = 0; i < SearchKeys.length; i++) {
					if (SourceKey.indexOf(SearchKeys[i].toLowerCase()) == -1) {
						IsSuccess = false;
						break;
					}
				}

				return IsSuccess;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Facade", "ProfileDownloadFacade.IsSearchElementsExist", Excep);
			}
		}


		/// <summary>
		/// Download the selected profiles by login user
		/// Steps for download profile
		/// Step 1 : Get all login user profiles from server (with master data , hanover dc and partial dc)
		/// Step 2 : Check if any profiles are available or not
		/// Step 3 : If Profiles are available Normalize the profiles, master data, hanover dc and partial dc
		/// Step 4 : Insert profiles, master data, hanover dc and partial dc into local db (if same version is not available)
		/// TODO (Siva, 24-07-2014) Enable transaction (sqlite)
		/// </summary>
		/// <param name="FilterParams">Download profiles list</param>
		/// <param name="xlatService">xlatService for globalization</param>
		/// <param name="toaster">toaster for toast messages</param>
		/// <param name="SpinService">SpinService for loader</param>
		var DownLoadProfile = function (FilterParams, xlatService, toaster, SpinService, $location, $scope) {

			var IsDownLoadProfileSuccess = true;

			try {
				OneViewConsole.Debug("DownLoadProfile start", "ProfileDownloadFacade.DownLoadProfile");

				// Checking network availability
				var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
				var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

				OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "ProfileDownloadFacade.DownLoadProfile");

				// If network is available
				if (NetworkDetails.IsNetworkAvailable == true) {

						// Step 1
						//Profile data download based on the request.
						OneViewConsole.Debug("Going to call profile download service", "ProfileDownloadFacade.DownLoadProfile");
						var UserProfileLst = new ProfileDownloadIL(toaster).GetAdvanceDcProfile(FilterParams);
						oOneViewProgressbar.SetProgressValue(25);
						OneViewConsole.Debug("Profile download service successfully get response", "ProfileDownloadFacade.DownLoadProfile");

						//alert("IsAnyException : " + UserProfileLst.IsAnyException);
						//alert("ExceptionMessage : " + UserProfileLst.ExceptionMessage);
						//alert(JSON.stringify(UserProfileLst));

						if (UserProfileLst != null && UserProfileLst.IsAnyException == false) {

							OneViewConsole.Debug("Profile download service exception status : " + UserProfileLst.IsAnyException, "ProfileDownloadFacade.DownLoadProfile");
							OneViewConsole.DataLog("Profile download service Response : " + JSON.stringify(UserProfileLst), "ProfileDownloadFacade.DownLoadProfile");

							if (UserProfileLst.UserProfiles != null && UserProfileLst.UserProfileMasterData != null) {

								var oDcNormalizer = new DataCaptureNormalizer();
								var oDcProfileNormalizer = new DcProfileNormalizer();
								var _oDcDAO = new DcDAO();

								var MasterData = null;
								var ProfileData = null;
								var HandOverDcData = null;
								var PartialDcData = null;
								var ActionDcData = null;

								// Step 3.1
								// Normalize the Master data
								if (UserProfileLst.UserProfileMasterData != null) {
									OneViewConsole.Debug("Going to normalize master data , Total count : " + UserProfileLst.UserProfileMasterData, "ProfileDownloadFacade.DownLoadProfile");
									MasterData = NormalizeMasterAndNodeData(UserProfileLst.UserProfileMasterData);
									OneViewConsole.Debug("Master data successfully normalized", "ProfileDownloadFacade.DownLoadProfile");
								}

								//alert(JSON.stringify(MasterData));

								// Step 3.2
								// Normalize the profile data
								if (UserProfileLst.UserProfiles.DataCaptureProfileLst.length != 0) {
									OneViewConsole.Debug("Going to normalize profile data , Total count : " + UserProfileLst.UserProfiles.DataCaptureProfileLst.length, "ProfileDownloadFacade.DownLoadProfile");
									ProfileData = oDcProfileNormalizer.NormalizeList(UserProfileLst.UserProfiles.DataCaptureProfileLst);
									OneViewConsole.Debug("Profile data successfully normalized", "ProfileDownloadFacade.DownLoadProfile");
								}

								//alert(JSON.stringify(ProfileData));

								// Step 3.3
								// Normalize the HandOverDcData
								if (UserProfileLst.HandOverDC.DataCaptureDTO.length != 0) {
									OneViewConsole.Debug("Going to normalize handover data , Total count : " + UserProfileLst.HandOverDC.DataCaptureDTO.length, "ProfileDownloadFacade.DownLoadProfile");
									HandOverDcData = oDcNormalizer.NormalizeList(UserProfileLst.HandOverDC.DataCaptureDTO);
									OneViewConsole.Debug("hanover data successfully normalized", "ProfileDownloadFacade.DownLoadProfile");
								}

								//alert(JSON.stringify(HandOverDcData));

								// Step 3.4
								// Normalize the PartialDcData
								if (UserProfileLst.PartialDC.DataCaptureDTO.length != 0) {
									OneViewConsole.Debug("Going to normalize partial data , Total count : " + UserProfileLst.HandOverDC.DataCaptureDTO.length, "ProfileDownloadFacade.DownLoadProfile");
									PartialDcData = oDcNormalizer.NormalizeList(UserProfileLst.PartialDC.DataCaptureDTO);
									OneViewConsole.Debug("Partial data successfully normalized", "ProfileDownloadFacade.DownLoadProfile");
								}

								//alert(JSON.stringify(PartialDcData));
								var oProfileDownloadBO = new ProfileDownloadBO();

								// Step 4.1
								// Going to insert MasterData
								var IsSuccessMasterData = true;
								if (MasterData != null) {
									OneViewConsole.Debug("Going to insert master data , Total count : " + MasterData.length, "ProfileDownloadFacade.DownLoadProfile");
									IsSuccessMasterData = oProfileDownloadBO.InsertMaterData(MasterData);
									OneViewConsole.Debug("Master data successfully inserted", "ProfileDownloadFacade.DownLoadProfile");
								}

								//alert("Master data inserted");

								// Step 4.2
								// Going to insert ProfileData
								var IsSuccessProfileData = true;
								if (ProfileData != null) {
									OneViewConsole.Debug("Going to insert profile data , Total count : " + ProfileData.length, "ProfileDownloadFacade.DownLoadProfile");
									IsSuccessProfileData = oProfileDownloadBO.InsertProfiles(ProfileData);
									OneViewConsole.Debug("Profile data successfully inserted", "ProfileDownloadFacade.DownLoadProfile");
								}

								//alert("Profile data inserted");

								// Step 4.3
								// Going to insert HandOverDcData
								var IsSuccessHandOverDcData = true;
								if (HandOverDcData != null) {
									OneViewConsole.Debug("Going to insert hanover data , Total count : " + HandOverDcData.length, "ProfileDownloadFacade.DownLoadProfile");
									IsSuccessHandOverDcData = oProfileDownloadBO.InsertDcLst(HandOverDcData);
									OneViewConsole.Debug("Handover data successfully inserted", "ProfileDownloadFacade.DownLoadProfile");
								}

								//alert("HandOverDcData data inserted");

								// Step 4.4
								// Going to insert PartialDcData
								var IsSuccessPartialDcData = true;
								if (PartialDcData != null) {
									OneViewConsole.Debug("Going to insert partial data , Total count : " + PartialDcData.length, "ProfileDownloadFacade.DownLoadProfile");
									IsSuccessPartialDcData = oProfileDownloadBO.InsertDcLst(PartialDcData);
									OneViewConsole.Debug("Partial data successfully inserted", "ProfileDownloadFacade.DownLoadProfile");
								}

								//alert("PartialDcData data inserted");
								//alert(UserProfileLst.ActionDC.DataCaptureDTO.length);
								//alert(UserProfileLst.IsAction);

								var IsActionSuccess = true;
								var IsActionDcSuccess = true;
								if (UserProfileLst.IsAction == true) {

									//alert(UserProfileLst.IsAction);
									//alert(UserProfileLst.ActionDC.DataCaptureDTO.length);

									// Normalize the ActionDcData and insert
									if (UserProfileLst.ActionDC.DataCaptureDTO.length != 0) {

										OneViewConsole.Debug("Going to normalize action dc data , Total count : " + UserProfileLst.ActionDC.DataCaptureDTO.length, "ProfileDownloadFacade.DownLoadProfile");

										ActionDcData = oDcNormalizer.NormalizeList(UserProfileLst.ActionDC.DataCaptureDTO);

										OneViewConsole.Debug("Action data successfully normalized", "ProfileDownloadFacade.DownLoadProfile");

										OneViewConsole.Debug("Going to insert action dc data , Total count : " + ActionDcData.length, "ProfileDownloadFacade.DownLoadProfile");
										OneViewConsole.DataLog("Action Data dc log : " + JSON.stringify(ActionDcData), "ProfileDownloadFacade.DownLoadProfile");

										IsActionDcSuccess = _oDcDAO.InsertDCList(ActionDcData);

										OneViewConsole.Debug("Action dc data successfully inserted", "ProfileDownloadFacade.DownLoadProfile");
									}

									//alert("Action dc data inserted");
									//alert(JSON.stringify(UserProfileLst.Action));

									// Insert Action
									var _oActionBO = new ActionBO();

									OneViewConsole.Debug("Going to insert action data", "ProfileDownloadFacade.DownLoadProfile");

									IsActionSuccess = _oActionBO.InsertAction(UserProfileLst.Action);

									OneViewConsole.Debug("Action data successfully inserted", "ProfileDownloadFacade.DownLoadProfile");

									//alert("Action data inserted");
								}

								if (UserProfileLst.DCBlockerDTO != null && UserProfileLst.DCBlockerDTO != undefined) {
									//alert(JSON.stringify(UserProfileLst.DCBlockerDTO.DataCaptureDTO));
									//alert(JSON.stringify(UserProfileLst.DCBlockerDTO.DCBlockerInfoDTO));
									if (UserProfileLst.DCBlockerDTO.DataCaptureDTO.length != 0) {
										oProfileDownloadBO.InsertDcLst(oDcNormalizer.NormalizeList(UserProfileLst.DCBlockerDTO.DataCaptureDTO));
									}
									if (UserProfileLst.DCBlockerDTO.DCBlockerInfoDTO.length != 0) {
										oProfileDownloadBO.InsertDCBlockerInfo(new DCBlockerInfoNormalizer().NormalizeList(UserProfileLst.DCBlockerDTO.DCBlockerInfoDTO));
									}
								}

								if (UserProfileLst.MultiMediaMappingLst != null && UserProfileLst.MultiMediaMappingLst != undefined) {
									if (UserProfileLst.MultiMediaMappingLst.length != 0) {
										oProfileDownloadBO.InsertMultiMediaSubElements(new MultiMediaSubElementsNormalizer().NormalizeList(UserProfileLst.MultiMediaMappingLst), xlatService);
									}
								}

								if (UserProfileLst.OnDeviceApproval != null && UserProfileLst.OnDeviceApproval.DcApprovalProfileDTOLst != null && UserProfileLst.OnDeviceApproval.DcApprovalProfileDTOLst.length > 0) {
									var oProfileDownloadBO = new ProfileDownloadBO();
									oProfileDownloadBO.InsertDcApprovalProfileLst(new DcApprovalProfileNormalizer().NormalizeList(UserProfileLst.OnDeviceApproval.DcApprovalProfileDTOLst));
								}

							}
							// If no profiles available
							else {
								IsDownLoadProfileSuccess = false;
							}
						}
						else {
							IsDownLoadProfileSuccess = (UserProfileLst != null) ? false : UserProfileLst;
						}

				}
				//If no internet connection
				else {
					IsDownLoadProfileSuccess = false;
					navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
					//alert(xlatService.xlat('NoInternetConnection'));
					OneViewConsole.Info("No Internet Connection", "ProfileDownloadFacade.DownLoadProfile");
				}
				OneViewConsole.Debug("DownLoadProfile end", "ProfileDownloadFacade.DownLoadProfile");
			}
			// If any exception
			catch (Excep) {
				IsDownLoadProfileSuccess = false;
				throw Excep;
			}

			return IsDownLoadProfileSuccess;
		}


		/// <summary>
		/// Download the selected profiles by login user
		/// Steps for download profile
		/// Step 1 : Get all login user profiles from server (with master data , hanover dc and partial dc)
		/// Step 2 : Check if any profiles are available or not
		/// Step 3 : If Profiles are available Normalize the profiles, master data, hanover dc and partial dc
		/// Step 4 : Insert profiles, master data, hanover dc and partial dc into local db (if same version is not available)
		/// TODO (Siva, 24-07-2014) Enable transaction (sqlite)
		/// </summary>
		/// <param name="DownloadList">Downloaded profiles list</param>
		/// <param name="xlatService">xlatService for globalization</param>
		/// <param name="toaster">toaster for toast messages</param>
		/// <param name="SpinService">SpinService for loader</param>
		var DownLoadCompleteMasterData = function () {

			var IsSuccessMasterData = false;

			try {
				OneViewConsole.Debug("DownLoadProfile start", "ProfileDownloadFacade.DownLoadCompleteMasterData");

				// Checking network availability
				var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
				var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

				OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "ProfileDownloadFacade.DownLoadProfile");

				// If network is available
				if (NetworkDetails.IsNetworkAvailable == true) {

					// Step 1
					//Profile data download based on the request.
					OneViewConsole.Debug("Going to call profile download service", "ProfileDownloadFacade.DownLoadCompleteMasterData");
					var UserProfileLst = new ProfileDownloadIL('').GetAdvanceDcProfileForWorkOrder();
					OneViewConsole.Debug("Profile download service successfully get response", "ProfileDownloadFacade.DownLoadCompleteMasterData");

					//alert(UserProfileLst.IsAnyException);
					if (UserProfileLst != null && UserProfileLst.IsAnyException == false) {

						OneViewConsole.Debug("Profile download service exception status : " + UserProfileLst.IsAnyException, "ProfileDownloadFacade.DownLoadCompleteMasterData");
						OneViewConsole.DataLog("Profile download service Response : " + JSON.stringify(UserProfileLst), "ProfileDownloadFacade.DownLoadCompleteMasterData");

						if (UserProfileLst.UserProfiles != null && UserProfileLst.UserProfileMasterData != null) {

							var _oDcDAO = new DcDAO();
							var _oOneViewSqlitePlugin = new OneViewSqlitePlugin();

							var MasterData = null;

							// Step 3.1
							// Normalize the Master data
							if (UserProfileLst.UserProfileMasterData != null) {
								MasterData = NormalizeMasterAndNodeData(UserProfileLst.UserProfileMasterData);
								OneViewConsole.Debug("Master data successfully normalized", "ProfileDownloadFacade.DownLoadProfile");
							}
							// Step 4.1
							// Going to insert MasterData

							var oProfileDownloadBO = new ProfileDownloadBO();

							if (MasterData != null) {

								OneViewConsole.Debug("Going to insert master data , Total count : " + MasterData.length, "ProfileDownloadFacade.DownLoadCompleteMasterData");

								try {
									_oOneViewSqlitePlugin.StartTransaction();

									IsSuccessMasterData = oProfileDownloadBO.InsertMaterData(MasterData);

									_oOneViewSqlitePlugin.EndTransaction();
								}
								catch (Excep) {
									IsSuccessMasterData = false;
									OneViewConsole.Error("Download Failed ,Exception :" + JSON.stringify(Excep), "ProfileDownloadFacade.DownLoadCompleteMasterData");
									_oOneViewSqlitePlugin.Rollback();
									oOneViewProgressbar.Stop();
								}

								OneViewConsole.Debug("Profile download transaction successfully rollbacked", "ProfileDownloadFacade.DownLoadCompleteMasterData");
							}
						}
					}
					else {
						IsSuccessMasterData = (UserProfileLst != null) ? false : UserProfileLst;
					}
				}
				//If no internet connection
				else {
					IsDownLoadProfileSuccess = false;
					navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
					//alert(xlatService.xlat('NoInternetConnection'));
					OneViewConsole.Info("No Internet Connection", "ProfileDownloadFacade.DownLoadProfile");
				}
			}
			catch (Excep) {
				IsSuccessMasterData = false;
				throw Excep;
			}

			return IsSuccessMasterData;
		}


		/// <summary>
		/// Update the download status for icon (black to orange)
		/// </summary>
		/// <param name="$scope">Current scope</param>
		/// <param name="DownloadList">Downloaded profiles list</param>
		var UpdateDownloadStatus = function ($scope, DownloadList) {

			try{
				for (var i = 0; i < DownloadList.TemplateId.length; i++) {
					for (j = 0; j < $scope.Selectedfacilitys.length; j++){
						if (DownloadList.TemplateId[i] == $scope.Selectedfacilitys[j].Id) {
							$scope.Selectedfacilitys[j].downloaded = true;
							$scope.Selectedfacilitys[j].selected = false;
						}
					}
				}
				for (var i = 0; i < DownloadList.DcPlaceIds.length; i++) {
					for (j = 0; j < $scope.Selectedfacilitys.length; j++) {
						if (DownloadList.DcPlaceIds[i] == $scope.Selectedfacilitys[j].Id) {
							$scope.Selectedfacilitys[j].downloaded = true;
							$scope.Selectedfacilitys[j].selected = false;
						}
					}
				}
			}
			catch (Excep) {
				throw Excep;
			}
		}


		/// <summary>
		/// API for download metadata
		/// </summary>
		/// <param name="toaster">toaster for toast messages</param>
		/// <param name="DownloadList">Downloaded profiles list</param>
		/// <param name="oOneViewProgressbar">For progress bar updation</param>
		var DownloadMetaData = function (toaster, DownloadList, oOneViewProgressbar) {

			var IsMetaDataSuccess = false;

			try {
				// Checking network availability
				var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
				var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

				OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "ProfileDownloadFacade.DownLoadProfile");

				// If network is available
				if (NetworkDetails.IsNetworkAvailable == true) {

					var MetaDataDTO = new ProfileDownloadIL('').GetMetaData(DownloadList);

					//alert(MetaDataDTO.IsAnyException);
					//alert(JSON.stringify(MetaDataDTO));

					if (MetaDataDTO != null && MetaDataDTO.IsAnyException == false) {

						if (MetaDataDTO.MobileMataDataDTOLst.length > 0) {

							for (i = 0; i < MetaDataDTO.MobileMataDataDTOLst.length; i++) {

								var oAttributeOtherConfig = MetaDataDTO.MobileMataDataDTOLst[i].AttributeOtherConfigMetaData;

								if (oAttributeOtherConfig != null && oAttributeOtherConfig != "") {

									var oProfileDownloadBO = new ProfileDownloadBO();

									var AttributeOtherConfigMetaData = new AttributeOtherConfigNormalizer().Normalize(oAttributeOtherConfig);
									IsMetaDataSuccess = oProfileDownloadBO.InsertAttributeOtherConfigMetaData(AttributeOtherConfigMetaData);
								}
								else {
									IsMetaDataSuccess = true;
								}
							}
						}
						else {
							IsMetaDataSuccess = true;
						}
					}
					else {
						IsMetaDataSuccess = (MetaDataDTO != null) ? false : MetaDataDTO;
					}
				}
				//If no internet connection
				else {
					IsDownLoadProfileSuccess = false;
					navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
					//alert(xlatService.xlat('NoInternetConnection'));
					OneViewConsole.Info("No Internet Connection", "ProfileDownloadFacade.DownLoadProfile");
				}
			}
			catch (Excep) {
				IsMetaDataSuccess = false;
				throw Excep;
			}

			return IsMetaDataSuccess;
		}


		/// <summary>
		/// API for download history metadata
		/// </summary>
		/// <param name="toaster">toaster for toast messages</param>
		/// <param name="DownloadList">Downloaded profiles list</param>
		/// <param name="oOneViewProgressbar">For progress bar updation</param>
		var DownloadHistoryMetaData = function (toaster, DownloadList, oOneViewProgressbar) {

			var IsHistoryMetaDataSuccess = false;

			try {

				// Checking network availability
				var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
				var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

				OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "ProfileDownloadFacade.DownLoadProfile");

				// If network is available
				if (NetworkDetails.IsNetworkAvailable == true) {

					var HistoryRequest = MakeHistoryRequestForTemplateWise(DownloadList);
					// alert("HistoryRequest : " + JSON.stringify(HistoryRequest));

					var HistoryResponseDTO = new ProfileDownloadIL('').GetHistoryMetaData(HistoryRequest);

					if (HistoryResponseDTO != null && HistoryResponseDTO.IsAnyException == false) {

						if (HistoryResponseDTO.DataCaptureDTO.length > 0) {

							var oProfileDownloadBO = new ProfileDownloadBO();
							var oDcNormalizer = new DataCaptureNormalizer();

							IsHistoryMetaDataSuccess = oProfileDownloadBO.InsertDcLst(oDcNormalizer.NormalizeList(HistoryResponseDTO.DataCaptureDTO, true));
						}
						else {
							IsHistoryMetaDataSuccess = true;
						}
					}
					else {
						IsHistoryMetaDataSuccess = (HistoryResponseDTO != null) ? false : HistoryResponseDTO;
					}
				}
				//If no internet connection
				else {
					IsDownLoadProfileSuccess = false;
					navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
					//alert(xlatService.xlat('NoInternetConnection'));
					OneViewConsole.Info("No Internet Connection", "ProfileDownloadFacade.DownLoadProfile");
				}
			}
			catch (Excep) {
				IsHistoryMetaDataSuccess = false
				throw Excep;
			}

			return IsHistoryMetaDataSuccess;
		}


		/// <summary>
		/// Making request for download history metadata
		/// </summary>
		/// <param name="toaster">toaster for toast messages</param>
		/// <returns>Request param for history metadata download</returns>
		var MakeHistoryRequestForTemplateWise = function (DownloadList) {

			try {
				var DownloadListInfo = [];

				var _oDcDAO = new DcDAO();
				var oDcFilterParamRequest = new DcFilterParamRequest();

				for (var i = 0; i < DownloadList.TemplateId.length; i++) {

					var DcInfo = [];

					oDcFilterParamRequest.TemplateNodeId = DownloadList.TemplateId[i];
					var oDcInfo = _oDcDAO.GetAllDcInfoForHistoryMetaData(oDcFilterParamRequest);

					for (var j = 0; j < oDcInfo.length; j++) {
						DcInfo.push({ "ServerId": oDcInfo[j].ServerId, "ClientGuid": oDcInfo[j].ClientGuid, "CreatedDate": oDcInfo[j].CreatedDate, "OVGuid": oDcInfo[j].OVGuid });
					}

					DownloadListInfo.push({ "TemplateNodeId": DownloadList.TemplateId[i], "DcPlaceId": -1, "DcPlaceDimension": -1, "DcInfo": DcInfo });
				}

				var RequestParam = {
					"ServiceId": OneViewSessionStorage.Get("ServiceId"),
					"UserId": OneViewSessionStorage.Get("LoginUserId"),
					"DownloadListInfo": DownloadListInfo
				};

				return RequestParam;
			}
			catch (Excep) {
				throw Excep;
			}
		}


		/// <summary>
		/// API for SetLastResetDate
		/// </summary>
		var SetLastResetDate = function () {
			try
			{
				OneViewConsole.Debug("SetLastResetDate start", "ProfileDownloadFacade.SetLastResetDate");

				if (OneViewLocalStorage.Get("LastResetDate") == null) {
					var oDateTime = new DateTime();
					var CurrentDate = oDateTime.GetDate();
					OneViewLocalStorage.Save("LastResetDate", CurrentDate);
				}

				OneViewConsole.Debug("SetLastResetDate end", "ProfileDownloadFacade.SetLastResetDate");

			}
			catch (Excep) {
				throw Excep;
			}
		}


		/// <summary>
		/// Normalize master and node lists
		/// </summary>
		/// <param name="MasterData">Master data lists</param>
		var NormalizeMasterAndNodeData = function (MasterData) {
			try {
				OneViewConsole.Debug("NormalizeMasterAndNodeData start", "ProfileDownloadFacade.NormalizeMasterAndNodeData");

				var MasterList = new Array();

				var oMasterNormalizer = new MasterNormalizer();
				var oNodeNormalizer = new NodeNormalizer();

				var ServiceMasterList = oMasterNormalizer.NormalizeList("ServiceMasterEntity", MasterData["ServiceDTO"]);
				MasterList[0] = ServiceMasterList;

				var OrganizationMasterList = oMasterNormalizer.NormalizeList("OrganizationMasterEntity", MasterData["OrganiznationDTO"]);
				MasterList[1] = OrganizationMasterList;
				var OrganizationGroupMasterList = oMasterNormalizer.NormalizeList("OrganizationGroupMasterEntity", MasterData["OrganizantionGroupDTO"]);
				MasterList[2] = OrganizationGroupMasterList;
				var OrganizationGroupTypeMasterList = oMasterNormalizer.NormalizeList("OrganizationGroupType", MasterData["OrganizantionGroupTypeDTO"]);
				MasterList[3] = OrganizationGroupTypeMasterList;

				var RoleMasterList = oMasterNormalizer.NormalizeList("RoleMasterEntity", MasterData["RoleDTO"]);
				MasterList[4] = RoleMasterList;
				var UserMasterList = oMasterNormalizer.NormalizeList("UserMasterEntity", MasterData["UserDTO"]);
				MasterList[5] = UserMasterList;

				var RcoMasterList = oMasterNormalizer.NormalizeList("RcoMasterEntity", MasterData["RCODTO"]);
				MasterList[6] = RcoMasterList;
				var RcoTypeMasterList = oMasterNormalizer.NormalizeList("RcoType", MasterData["RCOTypeDTO"]);
				MasterList[7] = RcoTypeMasterList;

				var AttributeGroupTypeMasterList = oMasterNormalizer.NormalizeList("AttributeGroupType", MasterData["AttributeGroupTypeDTO"]);
				MasterList[8] = AttributeGroupTypeMasterList;
				var AttributeGroupMasterList = oMasterNormalizer.NormalizeList("AttributeGroupMasterEntity", MasterData["AttributeGroupDTO"]);
				MasterList[9] = AttributeGroupMasterList;
				var AttributeMasterList = oMasterNormalizer.NormalizeList("AttributeMasterEntity", MasterData["AttributeDTO"]);
				MasterList[10] = AttributeMasterList;

				var LabelMasterList = oMasterNormalizer.NormalizeList("Label", MasterData["LabelDTO"]);
				MasterList[11] = LabelMasterList;
				var LabelMasterList = oMasterNormalizer.NormalizeList("LabelType", MasterData["LabelTypeDTO"]);
				MasterList[12] = LabelMasterList;

				var ShiftMasterList = oMasterNormalizer.NormalizeList("ShiftMasterEntity", MasterData["ShiftDTO"]);
				MasterList[13] = ShiftMasterList;
				var ShiftDetailsMasterList = oMasterNormalizer.NormalizeList("ShiftDetailsMasterEntity", MasterData["ShiftDetailsDTO"]);
				MasterList[14] = ShiftDetailsMasterList;

				var IncidentMasterList = oMasterNormalizer.NormalizeList("IncidentMasterEntity", MasterData["IncidentMasterDTO"]);
				MasterList[15] = IncidentMasterList;
				var IncidentTypeList = oMasterNormalizer.NormalizeList("IncidentType", MasterData["IncidentTypeDTO"]);
				MasterList[16] = IncidentTypeList;
				var RiskMasterList = oMasterNormalizer.NormalizeList("RiskMasterEntity", MasterData["RiskMasterDTO"]);
				MasterList[17] = RiskMasterList;

				var BandMasterList = oMasterNormalizer.NormalizeList("BandMasterEntity", MasterData["BandDTO"]);
				MasterList[18] = BandMasterList;
				var BandDetailsMasterList = oMasterNormalizer.NormalizeList("BandDetailsMasterEntity", MasterData["BandDetailsDTO"]);
				MasterList[19] = BandDetailsMasterList;

				var BusinessCalendarList = oMasterNormalizer.NormalizeList("BusinessCalendarEntity", MasterData["BusinessCalendarDTO"]);
				MasterList[20] = BusinessCalendarList;
				var PeriodTypeList = oMasterNormalizer.NormalizeList("PeriodTypeEntity", MasterData["PeriodTypeDTO"]);
				MasterList[21] = PeriodTypeList;
				var PeriodList = oMasterNormalizer.NormalizeList("PeriodEntity", MasterData["PeriodDTO"]);
				MasterList[22] = PeriodList;

				var OrganizationHierarchyNodeList = oNodeNormalizer.NormalizeList("OrganizationHierarchyNode", MasterData["OrganizationHierarchyDTO"]);
				MasterList[23] = OrganizationHierarchyNodeList;
				var OrganizationAssetsNodeList = oNodeNormalizer.NormalizeList("OrganizationAssetsNode", MasterData["OrganizationAssetsDTO"]);
				MasterList[24] = OrganizationAssetsNodeList;
				var TemplateNodeList = oNodeNormalizer.NormalizeList("TemplateNode", MasterData["TemplateNodeDTO"]);
				MasterList[25] = TemplateNodeList;

				var OrganizationAssetsNodeRCOSpecialMappingList = new OrganizationAssetsNodeRCOSpecialMappingNormalizer().NormalizeList("OrganizationAssetsNodeRCOSpecialMapping", MasterData["OrganizationAssetRCOSpecialDTO"]);
				MasterList[26] = OrganizationAssetsNodeRCOSpecialMappingList;

				var OrderDetailsList = new OrderDetailsNormalizer().NormalizeList("OrderDetails", MasterData["OrderDetailsDTO"]);
				MasterList[27] = OrderDetailsList;
			   // alert('OrderDetailsList : ' + JSON.stringify(OrderDetailsList));

				var RcoAndLabelMappingList = new RcoAndLabelMappingNormalizer().NormalizeList("RcoAndLabelMapping", MasterData["RcoAndLabelEntityMappingDTO"]);
				MasterList[28] = RcoAndLabelMappingList;
			   // alert('RcoAndLabelMappingList : ' + JSON.stringify(RcoAndLabelMappingList));

				var ItemProcessMappingList = new ItemProcessMappingNormalizer().NormalizeList("ItemProcessMappingEntity", MasterData["ItemProcessMappingConfigDTO"]);
				MasterList[29] = ItemProcessMappingList;
			   // alert('ItemProcessMappingList : ' + JSON.stringify(ItemProcessMappingList));

				var PurchaseOrderList = new PurchaseOrderNormalizer().NormalizeList("PurchaseOrder", MasterData["PurchaseOrderDTO"]);
				MasterList[30] = PurchaseOrderList;
				//  alert('PurchaseOrderList : ' + JSON.stringify(PurchaseOrderList));

				if (MasterData["WorkOrderItemDetailsDTO"] != undefined) {
					var WorkOrderItemDetailsList = new WorkOrderItemDetailsNormalizer().NormalizeList("WorkOrderItemDetails", MasterData["WorkOrderItemDetailsDTO"]);
					MasterList[31] = WorkOrderItemDetailsList;
				}
				else {
					MasterList[31] = [];
				}


				if (MasterData["FlightBeltPlanDTO"] != undefined) {
					var FlightBeltPlanDetailsList = new FlightBeltPlanDetailsNormalizer().NormalizeList("FlightBeltPlanDetails", MasterData["FlightBeltPlanDTO"]);
					MasterList[32] = FlightBeltPlanDetailsList;
				}
				else {
					MasterList[32] = [];
				}

				if (MasterData["FlightCellPlanDTO"] != undefined) {
					var FlightCellPlanDetailsList = new FlightCellPlanDetailsNormalizer().NormalizeList("FlightCellPlanDetails", MasterData["FlightCellPlanDTO"]);
					MasterList[33] = FlightCellPlanDetailsList;
				}
				else {
					MasterList[33] = [];
				}

				if (MasterData["FlightOALPlanDTO"] != undefined) {
					var FlightOALPlanDetailsList = new FlightOALPlanDetailsNormalizer().NormalizeList("FlightOALPlanDetails", MasterData["FlightOALPlanDTO"]);
					MasterList[34] = FlightOALPlanDetailsList;
				}
				else {
					MasterList[34] = [];
				}

				if (MasterData["PickListMasterDTO"] != undefined) {
					var PickListMasterDetailsList = new PickListMasterDetailsNormalizer().NormalizeList("PickListMasterDetails", MasterData["PickListMasterDTO"]);
					MasterList[35] = PickListMasterDetailsList;
				}
				else {
					MasterList[35] = [];
				}


				if (MasterData["ASOWorkOrderDTO"] != undefined) {
					var ASOWorkOrderDetailsList = new ASOWorkOrderDetailsNormalizer().NormalizeList("ASOWorkOrderDetails", MasterData["ASOWorkOrderDTO"]);
					MasterList[36] = ASOWorkOrderDetailsList;
				}
				else {
					MasterList[36] = [];
				}

				if (MasterData["RFLWorkOrderDTO"] != undefined) {
					var RFLWorkOrderList = new RFLWorkOrderNormalizer().NormalizeList("RFLWorkOrder", MasterData["RFLWorkOrderDTO"]);
					MasterList[37] = RFLWorkOrderList;
				}
				else {
					MasterList[37] = [];
				}
				//  alert('PurchaseOrderList : ' + JSON.stringify(WorkOrderItemDetailsList));

				OneViewConsole.Debug("NormalizeMasterAndNodeData end", "ProfileDownloadFacade.NormalizeMasterAndNodeData");

				return MasterList;
			}
			catch (Excep) {
				throw Excep;
			}

		}


		/// <summary>
		/// Content loading based on profile download page configuration
		/// TODO (Siva , 24-07-2014) 1.) Need to change page setting( how to display) 2.) Presenter code need to be change
		/// </summary>
		/// <param name="$scope">Current scope</param>
		/// <param name="UserId">User id</param>
		/// <param name="ServiceId">Server id</param>
		var LoadContentBlock = function ($scope, UserId, ServiceId, SpinService, toaster, xlatService) {
			try {
				OneViewConsole.Debug("LoadContentBlock start", "ProfileDownloadFacade.LoadContentBlock");

				Profiles = [];

				// Checking network availability
				var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
				var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

				OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "ProfileDownloadFacade.LoadContentBlock");

				// If network is available
				if (NetworkDetails.IsNetworkAvailable == true) {

					var UserProfileViewLst = "";
					$scope.Selectedfacilitys = [];
					var _oDcProfileDAO = new DcProfileDAO();

					//Load all template nodes if Content element is template node
					if (ProfileDownloadPageConfiguration.ContentElement == "TemplateNode") {
						UserProfileViewLst = new ProfileDownloadIL(toaster).GetProfileTemplateView(ServiceId, UserId);
					}
					//Load all Dc places if Content element is Dc place
					else {
						UserProfileViewLst = new ProfileDownloadIL(toaster).GetProfileDcPlaceView(ServiceId, UserId);
					}

					//Adding user profile list datas into selected facilitys array list
					if (UserProfileViewLst != null) {

						UserProfileViewLst = UserProfileViewLst.sort(OneViewArraySorting('Name', true, function (a) { return a }));

						if (UserProfileViewLst.length > 0) {
							for (r = 0; r < UserProfileViewLst.length; r++) {
								var IsDownloaded = false;
								if (ProfileDownloadPageConfiguration.ContentElement == "TemplateNode") {
									IsDownloaded = _oDcProfileDAO.IsTemplateExist(ServiceId, UserId, UserProfileViewLst[r].Id);
								}
								else {
									IsDownloaded = _oDcProfileDAO.IsDcPlaceExist(ServiceId, UserId, UserProfileViewLst[r].Id);
								}
								//$scope.Selectedfacilitys.push({ label: UserProfileViewLst[r].Name, selected: false, downloaded: IsDownloaded, icon: 'icon icon-square-o', Id: UserProfileViewLst[r].Id, Dimensions: UserProfileViewLst[r].Dimension });
								Profiles.push({ label: UserProfileViewLst[r].Name, selected: false, downloaded: IsDownloaded, icon: 'icon icon-square-o', Id: UserProfileViewLst[r].Id, Dimensions: UserProfileViewLst[r].Dimension });
								$scope.Selectedfacilitys = Profiles;
							}
						}
						else {
							// toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('NoProfiles'));
							navigator.notification.alert(xlatService.xlat('NoProfiles'), ['OK'], "");
							//alert(xlatService.xlat('NoProfiles'));
							OneViewConsole.Info("NoProfiles", "ProfileDownloadFacade.LoadContentBlock");
						}
					}
				}
					//If internet connection is not available
				else {

					// toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('NoInternetConnection'));
					navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
					//alert(xlatService.xlat('NoInternetConnection'));
					OneViewConsole.Info("No Internet Connection", "ProfileDownloadFacade.LoadContentBlock");
				}

				OneViewConsole.Debug("LoadContentBlock end", "ProfileDownloadFacade.LoadContentBlock");
			}
			catch (Excep) {
				throw Excep;
			}
		}


		/// <summary>
		/// Content loading based on profile download page configuration
		/// TODO (Siva , 24-07-2014) 1.) Need to change page setting( how to display) 2.) Presenter code need to be change
		/// </summary>
		/// <param name="$scope">Current scope</param>
		/// <param name="UserId">User id</param>
		/// <param name="ServiceId">Server id</param>
		var LoadTemplateContentBlock = function ($scope, UserId, ServiceId, SpinService, toaster, xlatService) {
			try {
				OneViewConsole.Debug("LoadContentBlock start", "ProfileDownloadFacade.LoadContentBlock");

				Profiles = [];

				// Checking network availability
				var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
				var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

				OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "ProfileDownloadFacade.LoadContentBlock");

				// If network is available
				if (NetworkDetails.IsNetworkAvailable == true) {

					var UserProfileViewLst = "";
					$scope.Selectedfacilitys = [];
					var _oDcProfileDAO = new DcProfileDAO();

					//Load all template nodes
					UserProfileViewLst = new ProfileDownloadIL(toaster).GetProfileTemplateView(ServiceId, UserId);

					//Adding user profile list datas into selected facilitys array list
					if (UserProfileViewLst != null) {

						UserProfileViewLst = UserProfileViewLst.sort(OneViewArraySorting('Name', true, function (a) { return a }));

						if (UserProfileViewLst.length > 0) {
							for (r = 0; r < UserProfileViewLst.length; r++) {
								var IsDownloaded = false;
								IsDownloaded = _oDcProfileDAO.IsTemplateExist(ServiceId, UserId, UserProfileViewLst[r].Id);

								//$scope.Selectedfacilitys.push({ label: UserProfileViewLst[r].Name, selected: false, downloaded: IsDownloaded, icon: 'icon icon-square-o', Id: UserProfileViewLst[r].Id, Dimensions: UserProfileViewLst[r].Dimension });
								Profiles.push({ label: UserProfileViewLst[r].Name, selected: false, downloaded: IsDownloaded, icon: 'icon icon-square-o', Id: UserProfileViewLst[r].Id, Dimensions: UserProfileViewLst[r].Dimension });
								$scope.Selectedfacilitys = Profiles;
							}
						}
						else {
							// toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('NoProfiles'));
							navigator.notification.alert(xlatService.xlat('NoProfiles'), ['OK'], "");
							//alert(xlatService.xlat('NoProfiles'));
							OneViewConsole.Info("NoProfiles", "ProfileDownloadFacade.LoadContentBlock");
						}
					}
				}
					//If internet connection is not available
				else {

					// toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('NoInternetConnection'));
					navigator.notification.alert(xlatService.xlat('NoProfiles'), ['OK'], "");
					//alert(xlatService.xlat('NoInternetConnection'));
					OneViewConsole.Info("No Internet Connection", "ProfileDownloadFacade.LoadContentBlock");
				}

				OneViewConsole.Debug("LoadContentBlock end", "ProfileDownloadFacade.LoadContentBlock");
			}
			catch (Excep) {
				throw Excep;
			}
		}


		/// <summary>
		/// Content loading based on profile download page configuration
		/// TODO (Siva , 24-07-2014) 1.) Need to change page setting( how to display) 2.) Presenter code need to be change
		/// </summary>
		/// <param name="$scope">Current scope</param>
		/// <param name="UserId">User id</param>
		/// <param name="ServiceId">Server id</param>
		var LoadPlaceContentBlock = function ($scope, UserId, ServiceId, SpinService, toaster, xlatService, ParentNodeId) {
			try {
				OneViewConsole.Debug("LoadContentBlock start", "ProfileDownloadFacade.LoadContentBlock");

				Profiles = [];

				// Checking network availability
				var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
				var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

				OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "ProfileDownloadFacade.LoadContentBlock");

				// If network is available
				if (NetworkDetails.IsNetworkAvailable == true) {

					var UserProfileViewLst = "";
					$scope.Selectedfacilitys = [];
					var _oDcProfileDAO = new DcProfileDAO();

					UserProfileViewLst = new ProfileDownloadIL(toaster).GetProfileDcPlaceView(ServiceId, UserId, ParentNodeId, (IsGlobalCleaningProfiledownloadView == true) ? DATEntityType.RCOMaster_CleaningType : DATEntityType.RCOMaster_Flight);

					//Adding user profile list datas into selected facilitys array list
					if (UserProfileViewLst != null) {

						UserProfileViewLst = UserProfileViewLst.sort(OneViewArraySorting('Name', true, function (a) { return a }));

						if (UserProfileViewLst.length > 0) {
							for (r = 0; r < UserProfileViewLst.length; r++) {
								var IsDownloaded = false;
								IsDownloaded = _oDcProfileDAO.IsDcPlaceExist(ServiceId, UserId, UserProfileViewLst[r].Id);

								//$scope.Selectedfacilitys.push({ label: UserProfileViewLst[r].Name, selected: false, downloaded: IsDownloaded, icon: 'icon icon-square-o', Id: UserProfileViewLst[r].Id, Dimensions: UserProfileViewLst[r].Dimension });
								Profiles.push({ label: UserProfileViewLst[r].Name, selected: false, downloaded: IsDownloaded, icon: 'icon icon-square-o', Id: UserProfileViewLst[r].Id, Dimensions: UserProfileViewLst[r].Dimension });
								$scope.Selectedfacilitys = Profiles;
							}
						}
						else {
							// toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('NoProfiles'));
							//alert(xlatService.xlat('NoProfiles'));
							navigator.notification.alert(xlatService.xlat('No Flights available'), ['OK'], "");
							//alert(xlatService.xlat('No Flights available'));
							OneViewConsole.Info("NoProfiles", "ProfileDownloadFacade.LoadContentBlock");
						}
					}
				}
					//If internet connection is not available
				else {

					// toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('NoInternetConnection'));
					//alert(xlatService.xlat('NoInternetConnection'));
					navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
					OneViewConsole.Info("No Internet Connection", "ProfileDownloadFacade.LoadContentBlock");
				}

				OneViewConsole.Debug("LoadContentBlock end", "ProfileDownloadFacade.LoadContentBlock");
			}
			catch (Excep) {
				throw Excep;
			}
		}


		/// <summary>
		/// Request parameter for advance profile download (with filter parameters)
		/// </summary>
		/// <param name="DcDownloadList">Filter parameters</param>
		/// <param name="UserId">User id</param>
		/// <param name="ServiceId">Service id</param>
		/// <returns>Request param for profile download</returns>
		var NormalizeDownloadDataReqParm = function (DcDownloadList, UserId, ServiceId) {
			try {
				OneViewConsole.Debug("NormalizeDownloadDataReqParm start", "ProfileDownloadFacade.NormalizeDownloadDataReqParm");

				var filterList = [];

				var reqParm = { OSGuid: ServiceId, UserId: UserId, TemplateId: '', FromDate: '', ToDate: '', DcPlaceDimension: 0, DcPlaceIds: '', IsDCPlaceGroup: false, IsTemplateGroup: false, IsOnDeviceApprovalProfileNeeded: false, DCPlaceRCOType: -1 };

				for (i = 0; i < DcDownloadList.length ; i++) {
					if (DcDownloadList[i].selected == "selected" || DcDownloadList[i].selected == true) {
						filterList.push(DcDownloadList[i].Id);
					}
				}
				if (ProfileDownloadPageConfiguration.ContentElement == 'TemplateNode') {
					reqParm.TemplateId = filterList;
					reqParm.DcPlaceIds = new Array();
				}
				else {
					reqParm.DcPlaceIds = filterList;
					reqParm.TemplateId = new Array();
				}

				//reqParm = { OSGuid: ServiceId, UserId: UserId, TemplateId: [2], FromDate: '', ToDate: '', DcPlaceDimension: 0, DcPlaceIds: [] };
				OneViewConsole.Debug("NormalizeDownloadDataReqParm end", "ProfileDownloadFacade.NormalizeDownloadDataReqParm");
				return reqParm;
			}
			catch (Excep) {
				throw Excep;
			}
		}


		/// <summary>
		/// API for download ActionNCProfile
		/// </summary>
		/// <param name="toaster">toaster for toast messages</param>
		/// <param name="DownloadList">Downloaded profiles list</param>
		/// <param name="oOneViewProgressbar">For progress bar updation</param>
		var DownloadActionNCProfile = function (toaster, DownloadList, oOneViewProgressbar) {

			var ActionNCProfileSaveSuccess = false;
			var PreDefinedActionSaveSuccess = false;

			try {
				// Checking network availability
				var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
				var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

				OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "ProfileDownloadFacade.DownLoadProfile");

				// If network is available
				if (NetworkDetails.IsNetworkAvailable == true) {

					var ActionNCDTO = new ProfileDownloadIL('').GetActionNCProfile(DownloadList);

					// alert('DownloadActionNCProfile ActionNCDTO' + ActionNCDTO.IsAnyException + "," + JSON.stringify(ActionNCDTO));
					if (ActionNCDTO != null && ActionNCDTO.IsAnyException == false) {

						if (ActionNCDTO.ActionNCProfileDTOLst.length > 0) {

							var oProfileDownloadBO = new ProfileDownloadBO();

							var ActionNCProfileList = new ActionNCProfileNormalizer().NormalizeList(ActionNCDTO.ActionNCProfileDTOLst);
							ActionNCProfileSaveSuccess = oProfileDownloadBO.InsertActionNCProfiles(ActionNCProfileList);

							if (ActionNCDTO.PreDefinedActionDTOLst !=undefined && ActionNCDTO.PreDefinedActionDTOLst != null && ActionNCDTO.PreDefinedActionDTOLst.length > 0) {
								var PreDefinedActionDTOLst = new MasterNormalizer().NormalizeList("PredefinedActionMasterEntity", ActionNCDTO.PreDefinedActionDTOLst);
								PreDefinedActionSaveSuccess = oProfileDownloadBO.InsertPreDefinedActions(PreDefinedActionDTOLst);
							}
							else {
								PreDefinedActionSaveSuccess = true;
							}
						}
						else {
							ActionNCProfileSaveSuccess = true;
						}
					}
					else {
						ActionNCProfileSaveSuccess = (ActionNCDTO != null) ? false : ActionNCDTO;
					}
				}
				//If no internet connection
				else {
					IsDownLoadProfileSuccess = false;
					navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
					//alert(xlatService.xlat('NoInternetConnection'));
					OneViewConsole.Info("No Internet Connection", "ProfileDownloadFacade.DownLoadProfile");
				}
			}
			catch (Excep) {
				ActionNCProfileSaveSuccess = false;
				throw Excep;
			}

			return ActionNCProfileSaveSuccess;
		}


		/// <summary>
		/// API for download TemplateConfigMetaData
		/// </summary>
		/// <param name="toaster">toaster for toast messages</param>
		/// <param name="DownloadList">Downloaded profiles list</param>
		/// <param name="oOneViewProgressbar">For progress bar updation</param>
		var DownloadTemplateConfigMetaData = function (toaster, DownloadList, oOneViewProgressbar) {

			var TemplateConfigMetaDataSuccess = false;

			try {
				// Checking network availability
				var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
				var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

				OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "ProfileDownloadFacade.DownloadTemplateConfigMetaData");

				// If network is available
				if (NetworkDetails.IsNetworkAvailable == true) {

					var TemplateConfigDTO = new ProfileDownloadIL('').GetTemplateConfig(DownloadList);
					//alert('TemplateConfig Metadata Response From Server : ' + JSON.stringify(TemplateConfigDTO));

					if (TemplateConfigDTO != null && TemplateConfigDTO.IsAnyException == false) {

						if (TemplateConfigDTO.TemplateConfigMetaDataDTOLst.length > 0) {

							var oProfileDownloadBO = new ProfileDownloadBO();

							var TemplateConfigMetaDataDTOLst = new TemplateConfigNormalizer().NormalizeList(TemplateConfigDTO.TemplateConfigMetaDataDTOLst);
							//alert('TemplateConfigMetaDataDTOLst : ' + JSON.stringify(TemplateConfigMetaDataDTOLst));

							TemplateConfigMetaDataSuccess = oProfileDownloadBO.InsertTemplateConfig(TemplateConfigMetaDataDTOLst);
						}
						else {
							TemplateConfigMetaDataSuccess = true;
						}
					}
					else {
						TemplateConfigMetaDataSuccess = (TemplateConfigDTO != null) ? false : TemplateConfigDTO;
					}
				}
				// If no internet connection
				else {
					IsDownLoadProfileSuccess = false;
					navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
					//alert(xlatService.xlat('NoInternetConnection'));
					OneViewConsole.Info("No Internet Connection", "ProfileDownloadFacade.DownloadTemplateConfigMetaData");
				}
			}
			catch (Excep) {
				TemplateConfigMetaDataSuccess = false;
				throw Excep;
			}

			return TemplateConfigMetaDataSuccess;
		}


		/// <summary>
		/// API for download DCDisplayMetaData
		/// </summary>
		/// <param name="toaster">toaster for toast messages</param>
		/// <param name="DownloadList">Downloaded profiles list</param>
		/// <param name="oOneViewProgressbar">For progress bar updation</param>
		var DownloadDCDisplayMetaData = function (toaster, DownloadList, oOneViewProgressbar) {

			var DownloadDCDisplayMetaDataSuccess = false;

			try {
				// Checking network availability
				var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
				var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

				OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "ProfileDownloadFacade.DownloadDCDisplayMetaData");

				// If network is available
				if (NetworkDetails.IsNetworkAvailable == true) {

					var DCDisplayMetaDataDTO = new ProfileDownloadIL('').GetDCDisplayMetaData(DownloadList);

					// alert('Download DCDisplayMetaDataDTO' + DCDisplayMetaDataDTO.IsAnyException + "," + JSON.stringify(DCDisplayMetaDataDTO));
					if (DCDisplayMetaDataDTO != null && DCDisplayMetaDataDTO.IsAnyException == false) {

						if (DCDisplayMetaDataDTO.DCDisplayMetaDataDTOLst.length > 0) {

							var oProfileDownloadBO = new ProfileDownloadBO();

							var DCDisplayMetaDataDTOLst = new DCDisplayMetaDataNormalizer().NormalizeList(DCDisplayMetaDataDTO.DCDisplayMetaDataDTOLst);
							DownloadDCDisplayMetaDataSuccess = oProfileDownloadBO.InsertDCDisplayMetaData(DCDisplayMetaDataDTOLst);
						}
						else {
							DownloadDCDisplayMetaDataSuccess = true;
						}
					}
					else {
						DownloadDCDisplayMetaDataSuccess = (DCDisplayMetaDataDTO != null) ? false : DCDisplayMetaDataDTO;
					}
				}
					//If no internet connection
				else {
					IsDownLoadProfileSuccess = false;
					navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
					//alert(xlatService.xlat('NoInternetConnection'));
					OneViewConsole.Info("No Internet Connection", "ProfileDownloadFacade.DownloadDCDisplayMetaData");
				}
			}
			catch (Excep) {
				DownloadDCDisplayMetaDataSuccess = false;
				throw Excep;
			}

			return DownloadDCDisplayMetaDataSuccess;
		}


		/// <summary>
		/// API for download RouterMetaData
		/// </summary>
		var DownloadRouterMetaData = function () {

			var DownloadRouterMetaDataSuccess = false;

			try {
				// Checking network availability
				var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
				var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

				OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "ProfileDownloadFacade.DownloadRouterMetaData");

				// If network is available
				if (NetworkDetails.IsNetworkAvailable == true) {

					var RouterMetaDataDTO = new ProfileDownloadIL('').GetRouterMetaData();

					//alert('Download RouterMetaDataDTO' + RouterMetaDataDTO.IsAnyException + "," + JSON.stringify(RouterMetaDataDTO));
					if (RouterMetaDataDTO != null && RouterMetaDataDTO.IsAnyException == false) {

						if (RouterMetaDataDTO.RouterMetaData != "" && RouterMetaDataDTO.RouterMetaData != null) {
							OneViewLocalStorage.Save("RouterMetaData", RouterMetaDataDTO.RouterMetaData);
							DownloadRouterMetaDataSuccess = true;
							//alert(OneViewLocalStorage.Get("RouterMetaData"));

							var _oOneViewRouterComponet = new OneViewRouterComponet();
							_oOneViewRouterComponet.ResetRouter();
						}
						else {
							DownloadRouterMetaDataSuccess = true;
						}
					}
					else {
						DownloadRouterMetaDataSuccess = (RouterMetaDataDTO != null) ? false : RouterMetaDataDTO;
					}
				}
					//If no internet connection
				else {
					IsDownLoadProfileSuccess = false;
					navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
					//alert(xlatService.xlat('NoInternetConnection'));
					OneViewConsole.Info("No Internet Connection", "ProfileDownloadFacade.DownloadRouterMetaData");
				}
			}
			catch (Excep) {
				DownloadRouterMetaDataSuccess = false;
				throw Excep;
			}

			return DownloadRouterMetaDataSuccess;
		}


		/// <summary>
		/// API for download TemplatValidationConfigMetaData
		/// </summary
		var DownloadTemplatValidationConfigMetaData = function (DownloadList) {

			var IsTemplatValidationConfigMetaDataSuccess = false;

			try {
				// Checking network availability
				var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
				var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

				OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "ProfileDownloadFacade.DownloadTemplatValidationConfigMetaData");

				// If network is available
				if (NetworkDetails.IsNetworkAvailable == true) {

					var MetaDataDTO = new ProfileDownloadIL('').GetTemplatValidationConfigMetaData(DownloadList);

					//alert(MetaDataDTO.IsAnyException);
					//alert(JSON.stringify(MetaDataDTO));

					if (MetaDataDTO != null && MetaDataDTO.IsAnyException == false) {

						if (MetaDataDTO.TemplatValidationConfigMetaDataDTOLst.length > 0) {

							var oProfileDownloadBO = new ProfileDownloadBO();

							var TemplatValidationConfigMetaDataDTOLst = new TemplateValidationConfigNormalizer().NormalizeList(MetaDataDTO.TemplatValidationConfigMetaDataDTOLst);
							IsTemplatValidationConfigMetaDataSuccess = oProfileDownloadBO.InsertTemplateValidationConfigMetadata(TemplatValidationConfigMetaDataDTOLst);
						}
						else {
							IsTemplatValidationConfigMetaDataSuccess = true;
						}
					}
					else {
						IsTemplatValidationConfigMetaDataSuccess = (MetaDataDTO != null) ? false : MetaDataDTO;
					}
				}
					//If no internet connection
				else {
					IsDownLoadProfileSuccess = false;
					navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
					//alert(xlatService.xlat('NoInternetConnection'));
					OneViewConsole.Info("No Internet Connection", "ProfileDownloadFacade.DownloadTemplatValidationConfigMetaData");
				}
			}
			catch (Excep) {
				IsTemplatValidationConfigMetaDataSuccess = false;
				throw Excep;
			}

			return IsTemplatValidationConfigMetaDataSuccess;
		}


		/// <summary>
		/// API for download TemplateUIEventJobConfigMetaData
		/// </summary
		var DownloadTemplateUIEventJobConfigMetaData = function (DownloadList) {

			var IsTemplateUIEventJobConfigMetaDataSuccess = false;

			try {
				// Checking network availability
				var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
				var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

				OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "ProfileDownloadFacade.DownloadTemplateUIEventJobConfigMetaData");

				// If network is available
				if (NetworkDetails.IsNetworkAvailable == true) {

					var MetaDataDTO = new ProfileDownloadIL('').GetTemplateUIEventJobConfigMetaData(DownloadList);

					//alert(MetaDataDTO.IsAnyException);
					//alert(JSON.stringify(MetaDataDTO));

					if (MetaDataDTO != null && MetaDataDTO.IsAnyException == false) {

						if (MetaDataDTO.TemplatUIEventJobConfigMetaDataDTOLst.length > 0) {

							var oProfileDownloadBO = new ProfileDownloadBO();

							var TemplatUIEventJobConfigMetaDataDTOLst = new TemplateUIEventJobConfigNormalizer().NormalizeList(MetaDataDTO.TemplatUIEventJobConfigMetaDataDTOLst);
							IsTemplateUIEventJobConfigMetaDataSuccess = oProfileDownloadBO.InsertTemplateUIEventJobConfigMetadata(TemplatUIEventJobConfigMetaDataDTOLst);
						}
						else {
							IsTemplateUIEventJobConfigMetaDataSuccess = true;
						}
					}
					else {
						IsTemplateUIEventJobConfigMetaDataSuccess = (MetaDataDTO != null) ? false : MetaDataDTO;
					}
				}
				//If no internet connection
				else {
				  navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
					//alert(xlatService.xlat('NoInternetConnection'));
					OneViewConsole.Info("No Internet Connection", "ProfileDownloadFacade.DownloadTemplateUIEventJobConfigMetaData");
				}
			}
			catch (Excep) {
				IsTemplateUIEventJobConfigMetaDataSuccess = false;
				throw Excep;
			}

			return IsTemplateUIEventJobConfigMetaDataSuccess;
		}


		/// <summary>
		/// API for download MobileViewRecordsMetadata
		/// </summary
		var DownloadMobileViewRecordsMetadata = function (DownloadList) {

			var IsMobileViewRecordsMetadataSuccess = false;

			try {
				// Checking network availability
				var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
				var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

				OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "ProfileDownloadFacade.DownloadMobileViewRecordsMetadata");

				// If network is available
				if (NetworkDetails.IsNetworkAvailable == true) {

					var MetaDataDTO = new ProfileDownloadIL('').GetMobileViewRecordsMetadata(DownloadList);

					//alert(MetaDataDTO.IsAnyException);
					//alert(JSON.stringify(MetaDataDTO));

					if (MetaDataDTO != null && MetaDataDTO.IsAnyException == false) {

						if (MetaDataDTO.MobileViewRecordsMetadataDTOLst.length > 0) {

							var oProfileDownloadBO = new ProfileDownloadBO();

							var MobileViewRecordsMetadataDTOLst = new MobileViewRecordsMetadataNormalizer().NormalizeList(MetaDataDTO.MobileViewRecordsMetadataDTOLst);
							IsMobileViewRecordsMetadataSuccess = oProfileDownloadBO.InsertMobileViewRecordsMetadata(MobileViewRecordsMetadataDTOLst);
						}
						else {
							IsMobileViewRecordsMetadataSuccess = true;
						}
					}
					else {
						IsMobileViewRecordsMetadataSuccess = (MetaDataDTO != null) ? false : MetaDataDTO;
					}
				}
				//If no internet connection
				else {
				  navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
					//alert(xlatService.xlat('NoInternetConnection'));
					OneViewConsole.Info("No Internet Connection", "ProfileDownloadFacade.DownloadMobileViewRecordsMetadata");
				}
			}
			catch (Excep) {
				IsMobileViewRecordsMetadataSuccess = false;
				throw Excep;
			}

			return IsMobileViewRecordsMetadataSuccess;
		}


		/// <summary>
		/// API for download GarbageCollectorMetadata
		/// </summary
		var DownloadGarbageCollectorMetadata = function (DownloadList) {

			var IsGarbageCollectorMetadataSuccess = false;

			try {
				// Checking network availability
				var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
				var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

				OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "ProfileDownloadFacade.DownloadGarbageCollectorMetadata");

				// If network is available
				if (NetworkDetails.IsNetworkAvailable == true) {

					var MetaDataDTO = new ProfileDownloadIL('').GetGarbageCollectorMetadata(DownloadList);

					//alert(MetaDataDTO.IsAnyException);
					//alert(JSON.stringify(MetaDataDTO));

					if (MetaDataDTO != null && MetaDataDTO.IsAnyException == false) {

						if (MetaDataDTO.GarbageCollectorMetadataDTOLst.length > 0) {

							var oProfileDownloadBO = new ProfileDownloadBO();

							var GarbageCollectorMetadataDTOLst = new GarbageCollectorMetadataNormalizer().NormalizeList(MetaDataDTO.GarbageCollectorMetadataDTOLst);
							IsGarbageCollectorMetadataSuccess = oProfileDownloadBO.InsertGarbageCollectorMetadata(GarbageCollectorMetadataDTOLst);
						}
						else {
							IsGarbageCollectorMetadataSuccess = true;
						}
					}
					else {
						IsGarbageCollectorMetadataSuccess = (MetaDataDTO != null) ? false : MetaDataDTO;
					}
				}
					//If no internet connection
				else {
				  navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
					//alert(xlatService.xlat('NoInternetConnection'));
					OneViewConsole.Info("No Internet Connection", "ProfileDownloadFacade.DownloadGarbageCollectorMetadata");
				}
			}
			catch (Excep) {
				IsGarbageCollectorMetadataSuccess = false;
				throw Excep;
			}

			return IsGarbageCollectorMetadataSuccess;
		}


		/// <summary>
		/// API for download DcCustomPageHtml
		/// </summary
		this.DownloadDcCustomPageHtml = function (DownloadList, IsDevPageTestEnable) {

			try {
				return DownloadDcCustomPageHtml(DownloadList, IsDevPageTestEnable);
			}
			catch (Excep) {
				throw Excep;
			}
		}


		/// <summary>
		/// API for download DcCustomPageHtml
		/// </summary
		var DownloadDcCustomPageHtml = function (DownloadList, IsDevPageTestEnable) {

			var DcCustomPageHtmlSuccess = false;

			try {
				// Checking network availability
				var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
				var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

				OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "ProfileDownloadFacade.DownloadDcCustomPageHtml");

				// If network is available
				if (NetworkDetails.IsNetworkAvailable == true) {

					var DcCustomPageHtmlDTO = new ProfileDownloadIL('').GetDcCustomPageHtml(DownloadList);

					//alert(DcCustomPageHtmlDTO.IsAnyException);
					//alert(JSON.stringify(DcCustomPageHtmlDTO));

					if (DcCustomPageHtmlDTO != null && DcCustomPageHtmlDTO.IsAnyException == false) {

						if (DcCustomPageHtmlDTO.DcCustomPageHtmlDTOLst.length > 0) {

							var oProfileDownloadBO = new ProfileDownloadBO();

							var DcCustomPageHtmlDTOLst = DownloadDcCustomPageHtmlUsingHttpGet(DcCustomPageHtmlDTO.DcCustomPageHtmlDTOLst, IsDevPageTestEnable);

							if (DcCustomPageHtmlDTOLst != null) {

								DcCustomPageHtmlDTOLst = new DcCustomPageHtmlNormalizer().NormalizeList(DcCustomPageHtmlDTOLst);
								DcCustomPageHtmlSuccess = oProfileDownloadBO.InsertDcCustomPageHtml(DcCustomPageHtmlDTOLst, IsDevPageTestEnable);
							}
							else {
								DcCustomPageHtmlSuccess = null;
							}
						}
						else {
							DcCustomPageHtmlSuccess = true;
						}
					}
					else {
						DcCustomPageHtmlSuccess = (DcCustomPageHtmlDTO != null) ? false : DcCustomPageHtmlDTO;
					}
				}
					//If no internet connection
				else {
				  navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
					//alert(xlatService.xlat('NoInternetConnection'));
					OneViewConsole.Info("No Internet Connection", "ProfileDownloadFacade.DownloadDcCustomPageHtml");
				}
			}
			catch (Excep) {
				DcCustomPageHtmlSuccess = false;
				throw Excep;
			}

			return DcCustomPageHtmlSuccess;
		}


		/// <summary>
		/// API for download DcCustomPageHtml
		/// </summary
		var DownloadDcCustomPageHtmlUsingHttpGet = function (DcCustomPageHtmlDTOLst, IsDevPageTestEnable) {

			try {
				// Checking network availability
				var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
				var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

				OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "ProfileDownloadFacade.DownloadDcCustomPageHtmlUsingHttpGet");

				// If network is available
				if (NetworkDetails.IsNetworkAvailable == true) {

					var _oDcCustomPageHtmlDAO = new DcCustomPageHtmlDAO();
					var oRegExp = new RegExp("'", 'g');

					for (var i = 0; i < DcCustomPageHtmlDTOLst.length; i++) {

						// Checking this data is already available in local db
						var obj = _oDcCustomPageHtmlDAO.GetByAllDimensions(DcCustomPageHtmlDTOLst[i].ServiceId, DcCustomPageHtmlDTOLst[i].TemplateNodeId);

						if (obj.length == 0 || (obj.length > 0 && obj[0].OVGuid != DcCustomPageHtmlDTOLst[i].OVGuid) || IsDevPageTestEnable == true) {

							if (IsDevPageTestEnable == true) {
								UpdateDcCustomPageHtmlUrlsForDevTest(DcCustomPageHtmlDTOLst[i]);
							}

							var Html = new ProfileDownloadIL('').GetDcCustomPageHtmlUsingHttpGet(DcCustomPageHtmlDTOLst[i].HtmlUrl);

							if (Html != null) {

								DcCustomPageHtmlDTOLst[i].Html = Html;

								var CodeHtml = new ProfileDownloadIL('').GetDcCustomPageHtmlUsingHttpGet(DcCustomPageHtmlDTOLst[i].CodeUrl);

								if (CodeHtml != null) {

									DcCustomPageHtmlDTOLst[i].Code = CodeHtml;

									DcCustomPageHtmlDTOLst[i].Html = DcCustomPageHtmlDTOLst[i].Html.replace(oRegExp, "~");
									DcCustomPageHtmlDTOLst[i].Code = DcCustomPageHtmlDTOLst[i].Code.replace(oRegExp, "~");
								}
								else {
									return null;
								}
							}
							else {
								return null;
							}
						}
					}

					return DcCustomPageHtmlDTOLst;
				}
				//If no internet connection
				else {
				  navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
					//alert(xlatService.xlat('NoInternetConnection'));
					OneViewConsole.Info("No Internet Connection", "ProfileDownloadFacade.DownloadDcCustomPageHtmlUsingHttpGet");
					return null;
				}
			}
			catch (Excep) {
				throw Excep;
			}
		}


		/// <summary>
		/// API for UpdateDcCustomPageHtmlUrlsForDevTest
		/// </summary
		var UpdateDcCustomPageHtmlUrlsForDevTest = function (DcCustomPageHtmlDTO) {

			try {
				var HtmlUrl = DcCustomPageHtmlDTO.HtmlUrl.split('/');
				var CodeUrl = DcCustomPageHtmlDTO.CodeUrl.split('/');
				DcCustomPageHtmlDTO.HtmlUrl = DevPageTestUrl + (HtmlUrl[HtmlUrl.length - 4]) + "/" + (HtmlUrl[HtmlUrl.length - 3]) + "/" + (HtmlUrl[HtmlUrl.length - 2]) + "/" + (HtmlUrl[HtmlUrl.length - 1]);
				DcCustomPageHtmlDTO.CodeUrl = DevPageTestUrl + (CodeUrl[CodeUrl.length - 4]) + "/" + (CodeUrl[CodeUrl.length - 3]) + "/" + (CodeUrl[CodeUrl.length - 2]) + "/" + (CodeUrl[CodeUrl.length - 1]);
			}
			catch (Excep) {
				throw Excep;
			}
		}


		/// <summary>
		/// API for download MobileDcPreviewMetadata
		/// </summary
		var DownloadMobileDcPreviewMetadata = function (DownloadList) {

			var IsMobileDcPreviewMetadataSuccess = false;

			try {
				// Checking network availability
				var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
				var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

				OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "ProfileDownloadFacade.DownloadMobileDcPreviewMetadata");

				// If network is available
				if (NetworkDetails.IsNetworkAvailable == true) {

					var MetaDataDTO = new ProfileDownloadIL('').GetMobileDcPreviewMetadata(DownloadList);

					//alert(MetaDataDTO.IsAnyException);
					//alert(JSON.stringify(MetaDataDTO));

					if (MetaDataDTO != null && MetaDataDTO.IsAnyException == false) {

						if (MetaDataDTO.MobileDcPreviewMetadataDTOLst.length > 0) {

							var oProfileDownloadBO = new ProfileDownloadBO();

							var MobileDcPreviewMetadataDTOLst = new MobileDcPreviewMetadataNormalizer().NormalizeList(MetaDataDTO.MobileDcPreviewMetadataDTOLst);
							IsMobileDcPreviewMetadataSuccess = oProfileDownloadBO.InsertMobileDcPreviewMetadata(MobileDcPreviewMetadataDTOLst);
						}
						else {
							IsMobileDcPreviewMetadataSuccess = true;
						}
					}
					else {
						IsMobileDcPreviewMetadataSuccess = (MetaDataDTO != null) ? false : MetaDataDTO;
					}
				}
					//If no internet connection
				else {
				  navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
					//alert(xlatService.xlat('NoInternetConnection'));
					OneViewConsole.Info("No Internet Connection", "ProfileDownloadFacade.DownloadMobileDcPreviewMetadata");
				}
			}
			catch (Excep) {
				IsMobileDcPreviewMetadataSuccess = false;
				throw Excep;
			}

			return IsMobileDcPreviewMetadataSuccess;
		}

		/// API for download ExcludedAttributeMetadataEntity
		/// </summary
		var DownloadExcludedAttributeMetadata = function (DownloadList) {

			var IsExcludedAttributeMetadataSuccess = false;

			try {
				// Checking network availability
				var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
				var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

				OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "ProfileDownloadFacade.DownloadMobileDcPreviewMetadata");

				// If network is available
				if (NetworkDetails.IsNetworkAvailable == true) {

					var MetaDataDTO = new ProfileDownloadIL('').GetExcludedAttributeMetadata(DownloadList);

					//alert(MetaDataDTO.IsAnyException);
					//alert(JSON.stringify(MetaDataDTO));

					if (MetaDataDTO != null && MetaDataDTO.isAnyException == false) {

						if (MetaDataDTO.ExcludedAttributeMetadataDTOLst.length > 0) {

							var oProfileDownloadBO = new ProfileDownloadBO();

							var ExcludedAttributeMetadataDTOLst = new ExcludedAttributeMetadataNormalizer().NormalizeList(MetaDataDTO.ExcludedAttributeMetadataDTOLst);
							IsExcludedAttributeMetadataSuccess = oProfileDownloadBO.InsertExcludedAttributeMetadata(ExcludedAttributeMetadataDTOLst);
						}
						else {
							IsExcludedAttributeMetadataSuccess = true;
						}
					}
					else {
						IsExcludedAttributeMetadataSuccess = (MetaDataDTO != null) ? false : MetaDataDTO;
					}
				}
					//If no internet connection
				else {
				  navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
					//alert(xlatService.xlat('NoInternetConnection'));
					OneViewConsole.Info("No Internet Connection", "ProfileDownloadFacade.DownloadMobileDcPreviewMetadata");
				}
			}
			catch (Excep) {
				IsExcludedAttributeMetadataSuccess = false;
				throw Excep;
			}

			return IsExcludedAttributeMetadataSuccess;
		}

		/// API for download ExcludedAttributeMetadataEntity
		/// </summary
		this.DownloadExcludedAttributeMetadata = function (DownloadList) {

			var IsExcludedAttributeMetadataSuccess = false;
			try {

				var _oBusinessEventEntityBO = new BusinessEventEntityBO();
				var TemplateId = DownloadList.TemplateId;
				var Req = { RequiredBusinessEventHandlerObjectKeys: "ExcludeAttribteFeatureForNA", TemplateId: TemplateId, ClassName: "ExcludedAttributeMetadataDAO", MethodName: "IsExcludeAttribteFeatureRequired" };
				var IsSuccess = _oBusinessEventEntityBO.IsBusinessEventMetadataExist(Req);
				if (IsSuccess == true) {
					IsExcludedAttributeMetadataSuccess = DownloadExcludedAttributeMetadata(DownloadList);
				}
				else {
					IsExcludedAttributeMetadataSuccess = true;
				}
			}
			catch (Excep) {
				IsExcludedAttributeMetadataSuccess = false;
				throw Excep;
			}

			return IsExcludedAttributeMetadataSuccess;
		}

		//Note: Only for IFFCO Client -(Follow-up user is determined by Column1 value in UserMasterEntity)
		var CheckIsFollowUpUser = function () {

			var IsFollowUpUser = false;

			try {

				if (OneViewGlobalServiceTypeEnum[OneViewGlobalServiceType] == 24) {

					var LoginUserId = OneViewSessionStorage.Get("LoginUserId");
					var _oDefaultMasterDAO = new DefaultMasterDAO("UserMasterEntity");
					var UserDetails = _oDefaultMasterDAO.GetByServerId(LoginUserId);
					//alert('UserDetails : ' + JSON.stringify(UserDetails));
					if (UserDetails != null && UserDetails.length > 0) {
						if (UserDetails[0].Column1 == "AFU") {
							IsFollowUpUser = true;
						}
					}
				}

				return IsFollowUpUser;
			}
			catch (Excep) {
				IsFollowUpUser = false;
				throw Excep;
			}

			return IsFollowUpUser;
		}
	}

	// Presenter
	function ProfileDownloadPresenter() {

		/// <summary>
		/// Select all contents
		/// </summary>
		this.PageLoad = function ($scope, $timeout, xlatService, toaster, SpinService) {
			try {
				OneViewConsole.Debug("PageLoad start", "ProfileDownloadPresenter.PageLoad");

				// Bydefault content selection is false for all
				$scope.IsAllSelected = false;

				OneViewConsole.Debug("PageLoad end", "ProfileDownloadPresenter.PageLoad");
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Presenter", "ProfileDownloadPresenter.PageLoad", Excep);
			}
		}


		this.ShowDownloadFailed = function (xlatService) {
			try {
				OneViewConsole.Debug("ShowDownloadFailed start", "ProfileDownloadPresenter.ShowDownloadFailed");

				alert(xlatService.xlat('DownloadFailed'));
				OneViewConsole.Info("Download Failed", "ProfileDownloadFacade.ShowDownloadFailed");

				OneViewConsole.Debug("ShowDownloadFailed end", "ProfileDownloadPresenter.ShowDownloadFailed");
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Presenter", "ProfileDownloadPresenter.ShowDownloadFailed", Excep);
			}
		}

		/// <summary>
		/// Select all contents
		/// </summary>
		/// <param name="$scope">Current scope</param>
		this.SelectAllContents = function ($scope) {
			try {
				OneViewConsole.Debug("SelectAllContents start", "ProfileDownloadPresenter.SelectAllContents");

				if ($scope.IsAllSelected == false) {
					$scope.IsAllSelected = true;
				}
				else {
					$scope.IsAllSelected = false;
				}

				for (i = 0; i < $scope.Selectedfacilitys.length; i++) {
					if ($scope.IsAllSelected == true) {
						$scope.Selectedfacilitys[i].selected = "selected";
					}
					else {
						$scope.Selectedfacilitys[i].selected = "";
					}
				}

				OneViewConsole.Debug("SelectAllContents end", "ProfileDownloadPresenter.SelectAllContents");
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Presenter", "ProfileDownloadPresenter.SelectAllContents", Excep);
			}
		}
	}

	// Integration
	function ProfileDownloadIL(toaster) {

		// ProfileDownloadIL object
		var MyInstance = this;


		/// <summary>
		/// Ajax call for Download Profile
		/// </summary>
		/// <param name="OSGuid">Service id</param>
		/// <param name="UserId">User id</param>
		/// <returns>UserProfiles list with masterdata</returns>
		this.GetProfile = function (OSGuid, UserId) {
			try {
				OneViewConsole.Debug("GetProfile start", "ProfileDownloadIL.GetProfile");

				var RequestParam = { "OSGuid": OSGuid, "UserId": UserId };

				OneViewConsole.DataLog("Request from device : " + JSON.stringify(RequestParam), "ProfileDownloadIL.GetProfile");

				var _oOneViewChannel = new OneViewChannel();
			   // _oOneViewChannel.toaster = toaster;
				_oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetDCProfile";
				_oOneViewChannel.parameter = JSON.stringify(RequestParam);
				var oUserProfileLst = _oOneViewChannel.Send();

				OneViewConsole.Debug("GetProfile end", "ProfileDownloadIL.GetProfile");

				if (oUserProfileLst != null) {
					OneViewConsole.DataLog("Response from server : " + JSON.stringify(oUserProfileLst.GetDCProfileResult), "ProfileDownloadIL.GetProfile");
					return oUserProfileLst.GetDCProfileResult;
				}
				else
				{
					return oUserProfileLst
				}
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("IL", "ProfileDownloadIL.GetProfile", Excep);
			}
		}


		/// <summary>
		/// Ajax call for Download Profile with filter params
		/// TODO (Siva, 24-07-2014) Need to change 'FoodSafetyServiceURL' to  'ServiceURL'
		/// </summary>
		/// <param name="DownloadList"></param>
		/// <returns>UserProfiles list with master data, partial and handover dc</returns>
		this.GetAdvanceDcProfile = function (DownloadList) {
			try {
				OneViewConsole.Debug("GetAdvanceDcProfile start", "ProfileDownloadIL.GetAdvanceDcProfile");

				var RequestParam = JSON.stringify(DownloadList);

				OneViewConsole.DataLog("Request from device : " + RequestParam, "ProfileDownloadIL.GetAdvanceDcProfile");

				var _oOneViewChannel = new OneViewChannel();
			   // _oOneViewChannel.toaster = toaster;
				_oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/AdvGetDCProfile_test";
				_oOneViewChannel.parameter = JSON.stringify({ "req": RequestParam });
				var oUserProfileLst = _oOneViewChannel.Send();
			   // alert(JSON.stringify(oUserProfileLst));
				if (oUserProfileLst != null) {
					oUserProfileLst = JSON.parse(oUserProfileLst.AdvGetDCProfile_testResult);

					OneViewConsole.DataLog("Response from server : " + oUserProfileLst.AdvGetDCProfile_testResult, "ProfileDownloadIL.GetAdvanceDcProfile");
					return oUserProfileLst;
				}
				else
				{
					return oUserProfileLst;
				}

				OneViewConsole.Debug("GetAdvanceDcProfile end", "ProfileDownloadIL.GetAdvanceDcProfile");
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("IL", "ProfileDownloadIL.GetAdvanceDcProfile", Excep);
			}
		}

		/// <summary>
		/// Ajax call for Download Profile with filter params
		/// TODO (Siva, 24-07-2014) Need to change 'FoodSafetyServiceURL' to  'ServiceURL'
		/// </summary>
		/// <param name="DownloadList"></param>
		/// <returns>UserProfiles list with master data, partial and handover dc</returns>
		this.GetAdvanceDcProfileForWorkOrder = function (DownloadList) {
			try {
				OneViewConsole.Debug("GetAdvanceDcProfile start", "ProfileDownloadIL.GetAdvanceDcProfile");

				var RequestParam = JSON.stringify(DownloadList);

				OneViewConsole.DataLog("Request from device : " + RequestParam, "ProfileDownloadIL.GetAdvanceDcProfile");

				var _oOneViewChannel = new OneViewChannel();
				// _oOneViewChannel.toaster = toaster;
				_oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/MasterDataDownload_Json";
				_oOneViewChannel.parameter = JSON.stringify({ "req": "siva" });
				var oUserProfileLst = _oOneViewChannel.Send();
				//alert(JSON.stringify(oUserProfileLst));
				if (oUserProfileLst != null) {
					oUserProfileLst = JSON.parse(oUserProfileLst.MasterDataDownload_JsonResult);

					OneViewConsole.DataLog("Response from server : " + oUserProfileLst.MasterDataDownload_JsonResult, "ProfileDownloadIL.GetAdvanceDcProfile");
					return oUserProfileLst;
				}
				else {
					return oUserProfileLst;
				}

				OneViewConsole.Debug("GetAdvanceDcProfile end", "ProfileDownloadIL.GetAdvanceDcProfile");
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("IL", "ProfileDownloadIL.GetAdvanceDcProfile", Excep);
			}
		}


		/// <summary>
		/// Ajax call for Download MetaData
		/// TODO (Siva, 24-07-2014) Need to change 'FoodSafetyServiceURL' to  'ServiceURL'
		/// </summary>
		/// <param name="DownloadList"></param>
		/// <returns>MetaData list</returns>
		this.GetMetaData = function (DownloadList) {
			try {
				OneViewConsole.Debug("GetMetaData start", "ProfileDownloadIL.GetMetaData");

				var RequestParam = JSON.stringify(DownloadList);

				OneViewConsole.DataLog("Request from device : " + RequestParam, "ProfileDownloadIL.GetMetaData");

				var _oOneViewChannel = new OneViewChannel();
				// _oOneViewChannel.toaster = toaster;
				_oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/AdvGetMetaData";
				_oOneViewChannel.parameter = JSON.stringify({ "req": RequestParam });
				var oUserProfileLst = _oOneViewChannel.Send();
				// alert(JSON.stringify(oUserProfileLst));
				if (oUserProfileLst != null) {
					oUserProfileLst = JSON.parse(oUserProfileLst.AdvGetMetaDataResult);

					OneViewConsole.DataLog("Response from server : " + oUserProfileLst.AdvGetMetaDataResult, "ProfileDownloadIL.GetMetaData");
					return oUserProfileLst;
				}
				else {
					return oUserProfileLst;
				}

				OneViewConsole.Debug("GetMetaData end", "ProfileDownloadIL.GetMetaData");

			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("IL", "ProfileDownloadIL.GetAdvanceDcProfile", Excep);
			}
		}


		/// <summary>
		/// Ajax call for Download History MetaData
		/// TODO (Siva, 24-07-2014) Need to change 'FoodSafetyServiceURL' to  'ServiceURL'
		/// </summary>
		/// <param name="HistoryRequestParam"></param>
		/// <returns>History MetaData list</returns>
		this.GetHistoryMetaData = function (HistoryRequestParam) {
			try {
				OneViewConsole.Debug("GetMetaData start", "ProfileDownloadIL.GetMetaData");

				var RequestParam = JSON.stringify(HistoryRequestParam);

				OneViewConsole.DataLog("Request from device : " + RequestParam, "ProfileDownloadIL.GetMetaData");

				var _oOneViewChannel = new OneViewChannel();
				// _oOneViewChannel.toaster = toaster;
				_oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/AdvGetHistoryMetaData";
				_oOneViewChannel.parameter = JSON.stringify({ "req": RequestParam });
				var oAdvGetHistoryMetaDataLst = _oOneViewChannel.Send();
				// alert(JSON.stringify(oUserProfileLst));
				if (oAdvGetHistoryMetaDataLst != null) {
					oAdvGetHistoryMetaDataLst = JSON.parse(oAdvGetHistoryMetaDataLst.AdvGetHistoryMetaDataResult);

					OneViewConsole.DataLog("Response from server : " + oAdvGetHistoryMetaDataLst.AdvGetHistoryMetaDataResult, "ProfileDownloadIL.GetMetaData");
					return oAdvGetHistoryMetaDataLst;
				}
				else {
					return oAdvGetHistoryMetaDataLst;
				}

				OneViewConsole.Debug("GetMetaData end", "ProfileDownloadIL.GetMetaData");

			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("IL", "ProfileDownloadIL.GetAdvanceDcProfile", Excep);
			}
		}


		/// <summary>
		/// Ajax call for get all templates
		/// </summary>
		/// <param name="OSGuid">Service id</param>
		/// <param name="UserId">User id</param>
		/// <returns>Template list</returns>
		this.GetProfileTemplateView = function (OSGuid, UserId) {
			try {
				OneViewConsole.Debug("GetProfileTemplateView start", "ProfileDownloadIL.GetProfileTemplateView");

				var RequestParam = { "OSGuid": OSGuid, "UserId": UserId };

				OneViewConsole.DataLog("Request from device : " + JSON.stringify(RequestParam), "ProfileDownloadIL.GetProfileTemplateView");

				var _oOneViewChannel = new OneViewChannel();
			   // _oOneViewChannel.toaster = toaster;
				_oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetDcTemplates";
				_oOneViewChannel.parameter = JSON.stringify(RequestParam);
				var oUserTemplateViewLst = _oOneViewChannel.Send();

				//alert(oUserTemplateViewLst.GetDcTemplatesResult);
				//alert(JSON.stringify(oUserTemplateViewLst.GetDcTemplatesResult));

				OneViewConsole.Debug("GetProfileTemplateView end", "ProfileDownloadIL.GetProfileTemplateView");

				if (oUserTemplateViewLst != null) {

					OneViewConsole.DataLog("Response from server : " + JSON.stringify(oUserTemplateViewLst.GetDcTemplatesResult), "ProfileDownloadIL.GetProfileTemplateView");

					return oUserTemplateViewLst.GetDcTemplatesResult;
				}
				else{
					return oUserTemplateViewLst;
				}
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("IL", "ProfileDownloadIL.GetProfileTemplateView", Excep);
			}
		}


		/// <summary>
		/// Ajax call for get all dc places
		/// </summary>
		/// <param name="OSGuid">Service id</param>
		/// <param name="UserId">User id</param>
		/// <returns>Dc place list</returns>
		this.GetProfileDcPlaceView = function (OSGuid, UserId, ParentNodeId, DCPlaceRCOType) {
			try {

				OneViewConsole.Debug("GetProfileDcPlaceView start", "ProfileDownloadIL.GetProfileDcPlaceView");

				var RequestParam = { "OSGuid": OSGuid, "UserId": UserId, "ParentNodeId": ParentNodeId, "DCPlaceRCOType": DCPlaceRCOType };

				OneViewConsole.DataLog("Request from device : " + JSON.stringify(RequestParam), "ProfileDownloadIL.GetProfileDcPlaceView");

				var _oOneViewChannel = new OneViewChannel();
			   // _oOneViewChannel.toaster = toaster;
				_oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetDcPlaces";
				_oOneViewChannel.parameter = JSON.stringify(RequestParam);
				var oUserDcPlaceViewLst = _oOneViewChannel.Send();

				OneViewConsole.Debug("GetProfileDcPlaceView end", "ProfileDownloadIL.GetProfileDcPlaceView");

				if (oUserDcPlaceViewLst != null) {

					OneViewConsole.DataLog("Response from server : " + JSON.stringify(oUserDcPlaceViewLst.GetDcPlacesResult), "ProfileDownloadIL.GetProfileDcPlaceView");

					return oUserDcPlaceViewLst.GetDcPlacesResult;
				}
				else{
					return oUserDcPlaceViewLst;
				}
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("IL", "ProfileDownloadIL.GetProfileDcPlaceView", Excep);
			}
		}


		/// <summary>
		/// Ajax call for get all dc places
		/// </summary>
		/// <param name="OSGuid">Service id</param>
		/// <param name="UserId">User id</param>
		/// <returns>Dc place list</returns>
		this.GetParentPlacesByDATType = function (OSGuid, UserId, ImmediateParentId, DcChildPlaceRCOType, DCPlaceRCOType) {
			try {

				OneViewConsole.Debug("GetProfileDcPlaceView start", "ProfileDownloadIL.GetProfileDcPlaceView");

				var RequestParam = { "OSGuid": OSGuid, "UserId": UserId, "ImmediateParentId": ImmediateParentId, "DcChildPlaceRCOType": DcChildPlaceRCOType, "DCPlaceRCOType": DCPlaceRCOType };

				OneViewConsole.DataLog("Request from device : " + JSON.stringify(RequestParam), "ProfileDownloadIL.GetProfileDcPlaceView");

				var _oOneViewChannel = new OneViewChannel();
				// _oOneViewChannel.toaster = toaster;
				_oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetParentPlacesByDATType";
				_oOneViewChannel.parameter = JSON.stringify(RequestParam);
				var oUserDcPlaceViewLst = _oOneViewChannel.Send();

				OneViewConsole.Debug("GetProfileDcPlaceView end", "ProfileDownloadIL.GetProfileDcPlaceView");

				if (oUserDcPlaceViewLst != null) {

					OneViewConsole.DataLog("Response from server : " + JSON.stringify(oUserDcPlaceViewLst.GetParentPlacesByDATTypeResult), "ProfileDownloadIL.GetProfileDcPlaceView");

					return oUserDcPlaceViewLst.GetParentPlacesByDATTypeResult;
				}
				else {
					return oUserDcPlaceViewLst;
				}
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("IL", "ProfileDownloadIL.GetProfileDcPlaceView", Excep);
			}
		}


		/// <summary>
		/// Ajax call for get Action-NC profile
		/// </summary>
		/// <param name="DownloadList">(Which Service ,Place, User, Template)</param>
		/// <returns>Action-NC profile list</returns>
		this.GetActionNCProfile = function (DownloadList) {
			try {
				OneViewConsole.Debug("GetActionNCProfile start", "ProfileDownloadIL.GetActionNCProfile");

				var RequestParam = JSON.stringify(DownloadList);

				OneViewConsole.DataLog("Request from device : " + RequestParam, "ProfileDownloadIL.GetActionNCProfile");

				var _oOneViewChannel = new OneViewChannel();
				// _oOneViewChannel.toaster = toaster;
				_oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetActionNC_Json";
				_oOneViewChannel.parameter = JSON.stringify({ "req": RequestParam });
				var oActionNCProfileList = _oOneViewChannel.Send();


				if (oActionNCProfileList != null) {

					OneViewConsole.DataLog("Response from server : " + oActionNCProfileList.GetActionNC_JsonResult, "ProfileDownloadIL.GetActionNCProfile");

					return JSON.parse(oActionNCProfileList.GetActionNC_JsonResult);
				}
				else {
					return oActionNCProfileList;
				}

				OneViewConsole.Debug("GetActionNCProfile end", "ProfileDownloadIL.GetActionNCProfile");
			}
			catch (Excep) {
				//alert('Excep' + Excep)
				//alert('Excep  ' + JSON.stringify(Excep))
				throw oOneViewExceptionHandler.Create("IL", "ProfileDownloadIL.GetActionNCProfile", Excep);
			}
		}


		/// <summary>
		/// Ajax call for get Template Config
		/// </summary>
		/// <param name="DownloadList">(Which Service ,Place, User, Template)</param>
		/// <returns>Action-NC profile list</returns>
		this.GetTemplateConfig = function (DownloadList) {
			try {
				OneViewConsole.Debug("GetTemplateConfig start", "ProfileDownloadIL.GetTemplateConfig");

				var RequestParam = JSON.stringify(DownloadList);

				OneViewConsole.DataLog("Request from device : " + RequestParam, "ProfileDownloadIL.GetTemplateConfig");

				var _oOneViewChannel = new OneViewChannel();
				// _oOneViewChannel.toaster = toaster;
				_oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetTemplateConfigMetaData_json";
				_oOneViewChannel.parameter = JSON.stringify({ "req": RequestParam });
				var oTemplateConfigList = _oOneViewChannel.Send();

				if (oTemplateConfigList != null) {

					OneViewConsole.DataLog("Response from server : " + oTemplateConfigList.GetTemplateConfigMetaData_jsonResult, "ProfileDownloadIL.GetTemplateConfig");

					return JSON.parse(oTemplateConfigList.GetTemplateConfigMetaData_jsonResult);
				}
				else {
					return oTemplateConfigList;
				}

				OneViewConsole.Debug("GetTemplateConfig end", "ProfileDownloadIL.GetTemplateConfig");
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("IL", "ProfileDownloadIL.GetTemplateConfig", Excep);
			}
		}


		/// <summary>
		/// Ajax call for get DC Display MetaData
		/// </summary>
		/// <param name="DownloadList">(Which Service ,Place, User, Template)</param>
		/// <returns>Action-NC profile list</returns>
		this.GetDCDisplayMetaData = function (DownloadList) {
			try {
				OneViewConsole.Debug("GetActionNCProfile start", "ProfileDownloadIL.GetDCDisplayMetaData");

				var RequestParam = JSON.stringify(DownloadList);

				OneViewConsole.DataLog("Request from device : " + RequestParam, "ProfileDownloadIL.GetDCDisplayMetaData");

				var _oOneViewChannel = new OneViewChannel();
				// _oOneViewChannel.toaster = toaster;
				_oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetDCDisplayMetaData_Json";
				_oOneViewChannel.parameter = JSON.stringify({ "req": RequestParam });
				var oDCDisplayMetaDataList = _oOneViewChannel.Send();

				if (oDCDisplayMetaDataList != null) {

					OneViewConsole.DataLog("Response from server : " + oDCDisplayMetaDataList.GetDCDisplayMetaData_JsonResult, "ProfileDownloadIL.GetDCDisplayMetaData");

					return JSON.parse(oDCDisplayMetaDataList.GetDCDisplayMetaData_JsonResult);
				}
				else {
					return oDCDisplayMetaDataList;
				}

				OneViewConsole.Debug("GetActionNCProfile end", "ProfileDownloadIL.GetDCDisplayMetaData");
			}
			catch (Excep) {
				//alert('Excep' + Excep)
				//alert('Excep  ' + JSON.stringify(Excep))
				throw oOneViewExceptionHandler.Create("IL", "ProfileDownloadIL.GetDCDisplayMetaData", Excep);
			}
		}


		/// <summary>
		/// Ajax call for get Router MetaData
		/// </summary>
		/// <param name="DownloadList">(Which Service ,Place, User, Template)</param>
		/// <returns>Router MetaData list</returns>
		this.GetRouterMetaData = function () {
			try {
				OneViewConsole.Debug("GetRouterMetaData start", "ProfileDownloadIL.GetRouterMetaData");

				var _oOneViewChannel = new OneViewChannel();
				_oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetRouterMetaData_Json";

				var oRouterMetaData = _oOneViewChannel.Send();

				if (oRouterMetaData != null) {

					OneViewConsole.DataLog("Response from server : " + oRouterMetaData.GetRouterMetaData_JsonResult, "ProfileDownloadIL.GetRouterMetaData");

					return JSON.parse(oRouterMetaData.GetRouterMetaData_JsonResult);
				}
				else {
					return oRouterMetaData;
				}

				OneViewConsole.Debug("GetActionNCProfile end", "ProfileDownloadIL.GetRouterMetaData");
			}
			catch (Excep) {
				//alert('Excep' + Excep)
				//alert('Excep  ' + JSON.stringify(Excep))
				throw oOneViewExceptionHandler.Create("IL", "ProfileDownloadIL.GetRouterMetaData", Excep);
			}
		}


		/// <summary>
		/// Ajax call for Download TemplatValidationConfigMetaData
		/// TODO (Siva, 24-07-2014) Need to change 'FoodSafetyServiceURL' to  'ServiceURL'
		/// </summary>
		/// <param name="DownloadList"></param>
		/// <returns>MetaData list</returns>
		this.GetTemplatValidationConfigMetaData = function (DownloadList) {
			try {
				OneViewConsole.Debug("GetTemplatValidationConfigMetaData start", "ProfileDownloadIL.GetTemplatValidationConfigMetaData");

				var RequestParam = JSON.stringify(DownloadList);

				OneViewConsole.DataLog("Request from device : " + RequestParam, "ProfileDownloadIL.GetTemplatValidationConfigMetaData");

				var _oOneViewChannel = new OneViewChannel();

				_oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetTemplatValidationConfigMetaData_json";
				_oOneViewChannel.parameter = JSON.stringify({ "req": RequestParam });
				var oTemplatValidationConfigMetaData = _oOneViewChannel.Send();
				// alert(JSON.stringify(oTemplatValidationConfigMetaData));
				if (oTemplatValidationConfigMetaData != null) {
					oTemplatValidationConfigMetaData = JSON.parse(oTemplatValidationConfigMetaData.GetTemplatValidationConfigMetaData_jsonResult);

					OneViewConsole.DataLog("Response from server : " + oTemplatValidationConfigMetaData.GetTemplatValidationConfigMetaData_jsonResult, "ProfileDownloadIL.GetTemplatValidationConfigMetaData");
					return oTemplatValidationConfigMetaData;
				}
				else {
					return oTemplatValidationConfigMetaData;
				}

				OneViewConsole.Debug("GetTemplatValidationConfigMetaData end", "ProfileDownloadIL.GetTemplatValidationConfigMetaData");

			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("IL", "ProfileDownloadIL.GetTemplatValidationConfigMetaData", Excep);
			}
		}


		/// <summary>
		/// Ajax call for Download TemplateUIEventJobConfigMetaData
		/// </summary>
		/// <param name="DownloadList"></param>
		/// <returns>MetaData list</returns>
		this.GetTemplateUIEventJobConfigMetaData = function (DownloadList) {
			try {
				OneViewConsole.Debug("GetTemplateUIEventJobConfigMetaData start", "ProfileDownloadIL.GetTemplateUIEventJobConfigMetaData");

				var RequestParam = JSON.stringify(DownloadList);

				OneViewConsole.DataLog("Request from device : " + RequestParam, "ProfileDownloadIL.GetTemplateUIEventJobConfigMetaData");

				var _oOneViewChannel = new OneViewChannel();

				_oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetTemplateUIEventJobConfigMetaData_json";
				_oOneViewChannel.parameter = JSON.stringify({ "req": RequestParam });
				var oTemplateUIEventJobConfigMetaData = _oOneViewChannel.Send();
				// alert(JSON.stringify(oTemplateUIEventJobConfigMetaData));
				if (oTemplateUIEventJobConfigMetaData != null) {
					oTemplateUIEventJobConfigMetaData = JSON.parse(oTemplateUIEventJobConfigMetaData.GetTemplateUIEventJobConfigMetaData_jsonResult);

					OneViewConsole.DataLog("Response from server : " + oTemplateUIEventJobConfigMetaData.GetTemplateUIEventJobConfigMetaData_jsonResult, "ProfileDownloadIL.GetTemplateUIEventJobConfigMetaData");
					return oTemplateUIEventJobConfigMetaData;
				}
				else {
					return oTemplateUIEventJobConfigMetaData;
				}

				OneViewConsole.Debug("GetTemplateUIEventJobConfigMetaData end", "ProfileDownloadIL.GetTemplateUIEventJobConfigMetaData");

			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("IL", "ProfileDownloadIL.GetTemplateUIEventJobConfigMetaData", Excep);
			}
		}


		/// <summary>
		/// Ajax call for Download MobileViewRecordsMetadata
		/// </summary>
		/// <param name="DownloadList"></param>
		/// <returns>MetaData list</returns>
		this.GetMobileViewRecordsMetadata = function (DownloadList) {
			try {
				OneViewConsole.Debug("GetMobileViewRecordsMetadata start", "ProfileDownloadIL.GetMobileViewRecordsMetadata");

				var RequestParam = JSON.stringify(DownloadList);

				OneViewConsole.DataLog("Request from device : " + RequestParam, "ProfileDownloadIL.GetMobileViewRecordsMetadata");

				var _oOneViewChannel = new OneViewChannel();

				_oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetMobileViewRecordsMetadata_json";
				_oOneViewChannel.parameter = JSON.stringify({ "req": RequestParam });
				var oMobileViewRecordsMetadata = _oOneViewChannel.Send();
				 //alert(JSON.stringify(oMobileViewRecordsMetadata));
				if (oMobileViewRecordsMetadata != null) {
					oMobileViewRecordsMetadata = JSON.parse(oMobileViewRecordsMetadata.GetMobileViewRecordsMetadata_jsonResult);

					OneViewConsole.DataLog("Response from server : " + oMobileViewRecordsMetadata.GetMobileViewRecordsMetadata_jsonResult, "ProfileDownloadIL.GetMobileViewRecordsMetadata");
					return oMobileViewRecordsMetadata;
				}
				else {
					return oMobileViewRecordsMetadata;
				}

				OneViewConsole.Debug("GetMobileViewRecordsMetadata end", "ProfileDownloadIL.GetMobileViewRecordsMetadata");

			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("IL", "ProfileDownloadIL.GetMobileViewRecordsMetadata", Excep);
			}
		}


		/// <summary>
		/// Ajax call for Download MobileViewRecordsMetadata
		/// </summary>
		/// <param name="DownloadList"></param>
		/// <returns>MetaData list</returns>
		this.GetGarbageCollectorMetadata = function (DownloadList) {
			try {
				OneViewConsole.Debug("GetGarbageCollectorMetadata start", "ProfileDownloadIL.GetGarbageCollectorMetadata");

				var RequestParam = JSON.stringify(DownloadList);

				OneViewConsole.DataLog("Request from device : " + RequestParam, "ProfileDownloadIL.GetGarbageCollectorMetadata");

				var _oOneViewChannel = new OneViewChannel();

				_oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetMobileGarbageCollectorMetadata_json";
				_oOneViewChannel.parameter = JSON.stringify({ "req": RequestParam });
				var oGarbageCollectorMetadata = _oOneViewChannel.Send();
				//alert(JSON.stringify(oGarbageCollectorMetadata));
				if (oGarbageCollectorMetadata != null) {
					oGarbageCollectorMetadata = JSON.parse(oGarbageCollectorMetadata.GetMobileGarbageCollectorMetadata_jsonResult);

					OneViewConsole.DataLog("Response from server : " + oGarbageCollectorMetadata.GetMobileGarbageCollectorMetadata_jsonResult, "ProfileDownloadIL.GetGarbageCollectorMetadata");
					return oGarbageCollectorMetadata;
				}
				else {
					return oGarbageCollectorMetadata;
				}

				OneViewConsole.Debug("GetGarbageCollectorMetadata end", "ProfileDownloadIL.GetGarbageCollectorMetadata");

			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("IL", "ProfileDownloadIL.GetGarbageCollectorMetadata", Excep);
			}
		}


		/// <summary>
		/// Ajax call for Download GetDcCustomPageHtml
		/// </summary>
		/// <param name="DownloadList"></param>
		/// <returns>DcCustomPageHtml list</returns>
		this.GetDcCustomPageHtml = function (DownloadList) {
			try {
				OneViewConsole.Debug("GetDcCustomPageHtml start", "ProfileDownloadIL.GetDcCustomPageHtml");

				var RequestParam = JSON.stringify(DownloadList);

				OneViewConsole.DataLog("Request from device : " + RequestParam, "ProfileDownloadIL.GetDcCustomPageHtml");

				var _oOneViewChannel = new OneViewChannel();

				_oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetDcCustomPageHtml_json";
				_oOneViewChannel.parameter = JSON.stringify({ "req": RequestParam });
				var oDcCustomPageHtml = _oOneViewChannel.Send();
				// alert(JSON.stringify(oDcCustomPageHtml));
				if (oDcCustomPageHtml != null) {
					oDcCustomPageHtml = JSON.parse(oDcCustomPageHtml.GetDcCustomPageHtml_jsonResult);

					OneViewConsole.DataLog("Response from server : " + oDcCustomPageHtml.GetDcCustomPageHtml_jsonResult, "ProfileDownloadIL.GetDcCustomPageHtml");
					return oDcCustomPageHtml;
				}
				else {
					return oDcCustomPageHtml;
				}

				OneViewConsole.Debug("GetDcCustomPageHtml end", "ProfileDownloadIL.GetDcCustomPageHtml");

			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("IL", "ProfileDownloadIL.GetDcCustomPageHtml", Excep);
			}
		}


		/// <summary>
		/// Ajax call for Download GetDcCustomPageHtml
		/// </summary>
		/// <param name="DownloadList"></param>
		/// <returns>DcCustomPageHtml list</returns>
		this.GetDcCustomPageHtmlUsingHttpGet = function (url) {
			try {
				OneViewConsole.Debug("GetDcCustomPageHtmlUsingHttpGet start", "ProfileDownloadIL.GetDcCustomPageHtmlUsingHttpGet");

				OneViewConsole.DataLog("Requested url : " + url, "ProfileDownloadIL.GetDcCustomPageHtmlUsingHttpGet");

				var _oOneViewChannel = new OneViewChannel();
				var oDcCustomPageHtml = _oOneViewChannel.Get(url);
				//alert(url);

				return oDcCustomPageHtml;

				OneViewConsole.Debug("GetDcCustomPageHtmlUsingHttpGet end", "ProfileDownloadIL.GetDcCustomPageHtmlUsingHttpGet");

			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("IL", "ProfileDownloadIL.GetDcCustomPageHtmlUsingHttpGet", Excep);
			}
		}


		/// <summary>
		/// Ajax call for Download MobileDcPreviewMetadata
		/// </summary>
		/// <param name="DownloadList"></param>
		/// <returns>MetaData list</returns>
		this.GetMobileDcPreviewMetadata = function (DownloadList) {
			try {
				OneViewConsole.Debug("GetMobileDcPreviewMetadata start", "ProfileDownloadIL.GetMobileDcPreviewMetadata");

				var RequestParam = JSON.stringify(DownloadList);

				OneViewConsole.DataLog("Request from device : " + RequestParam, "ProfileDownloadIL.GetMobileDcPreviewMetadata");

				var _oOneViewChannel = new OneViewChannel();

				_oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetMobileDcPreviewMetadata_json";
				_oOneViewChannel.parameter = JSON.stringify({ "req": RequestParam });
				var oMobileDcPreviewMetadata = _oOneViewChannel.Send();
				//alert(JSON.stringify(oMobileDcPreviewMetadata));
				if (oMobileDcPreviewMetadata != null) {
					oMobileDcPreviewMetadata = JSON.parse(oMobileDcPreviewMetadata.GetMobileDcPreviewMetadata_jsonResult);

					OneViewConsole.DataLog("Response from server : " + oMobileDcPreviewMetadata.GetMobileDcPreviewMetadata_jsonResult, "ProfileDownloadIL.GetMobileDcPreviewMetadata");
					return oMobileDcPreviewMetadata;
				}
				else {
					return oMobileDcPreviewMetadata;
				}

				OneViewConsole.Debug("GetMobileDcPreviewMetadata end", "ProfileDownloadIL.GetMobileDcPreviewMetadata");

			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("IL", "ProfileDownloadIL.GetMobileDcPreviewMetadata", Excep);
			}
		}



		/// <summary>
		/// Ajax call for Download ExcludedAttributeMetadata
		/// </summary>
		/// <param name="DownloadList"></param>
		/// <returns>MetaData list</returns>
		this.GetExcludedAttributeMetadata = function (DownloadList) {
			try {
				OneViewConsole.Debug("GetExcludedAttributeMetadata start", "ProfileDownloadIL.GetExcludedAttributeMetadata");

				var RequestParam = JSON.stringify(DownloadList);

				OneViewConsole.DataLog("Request from device : " + RequestParam, "ProfileDownloadIL.GetExcludedAttributeMetadata");

				var _oOneViewChannel = new OneViewChannel();

				_oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetExcludedAttributeMetadata_json";
				_oOneViewChannel.parameter = JSON.stringify({ "req": RequestParam });
				var oExcludedAttributeMetadata = _oOneViewChannel.Send();
				//alert(JSON.stringify(oMobileDcPreviewMetadata));
				if (oExcludedAttributeMetadata != null) {
					oExcludedAttributeMetadata = JSON.parse(oExcludedAttributeMetadata.GetExcludedAttributeMetadata_jsonResult);

					OneViewConsole.DataLog("Response from server : " + oExcludedAttributeMetadata.GetExcludedAttributeMetadata_jsonResult, "ProfileDownloadIL.GetExcludedAttributeMetadata");
					return oExcludedAttributeMetadata;
				}
				else {
					return oExcludedAttributeMetadata;
				}

				OneViewConsole.Debug("GetExcludedAttributeMetadata end", "ProfileDownloadIL.GetExcludedAttributeMetadata");

			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("IL", "ProfileDownloadIL.GetExcludedAttributeMetadata", Excep);
			}
		}
	}

	// BO
	function ProfileDownloadBO() {

		/// <summary>
		/// Insert all master data related to profile
		/// </summary>
		/// <param name="MasterEntitieslst">Master entity list</param>
		/// <returns>true or false</returns>
		this.InsertMaterData = function (MasterEntitieslst) {
			try {
				OneViewConsole.Debug("InsertMaterData start", "ProfileDownloadBO.InsertMaterData");

				var _oDcProfileDAO = new DcProfileDAO();
				var _oDcApprovalUserDetailsDAO = new DcApprovalUserDetailsDAO();
				var _oActionFollowUpDAO = new ActionFollowUpDAO();
				var _oTaskSyncLogDAO = new TaskSyncLogDAO();

				// Master data insertion
				for (i = 0; i < MasterTables.length; i++) {

					//alert(MasterTables[i] + " : " + MasterEntitieslst[i].length);

					var _oDefaultMasterDAO = new DefaultMasterDAO(MasterTables[i]);

					var Count = _oDefaultMasterDAO.Count();

					// Get all server id's and ovguid's
					var DuplicateCheckDic = _oDefaultMasterDAO.GetAllInfoWithServerIdDict();
					//alert(MasterTables[i] + ":" + JSON.stringify(DuplicateCheckDic));

					for (var j = 0; j < MasterEntitieslst[i].length; j++) {

						// If its not available, create new master
						if (DuplicateCheckDic[MasterEntitieslst[i][j].ServerId] == undefined) {
							_oDefaultMasterDAO.Create(MasterEntitieslst[i][j], Count);
							Count += 1;
						}

						// If its available, check the OVGuid
						// If OVGuid is mismatch
						else if (IsGlobalOVGuidCheckingEnabled == true && DuplicateCheckDic[MasterEntitieslst[i][j].ServerId].OVGuid != MasterEntitieslst[i][j].OVGuid) {

							_oDefaultMasterDAO.DeleteByServerId(MasterEntitieslst[i][j].ServerId);
							_oDefaultMasterDAO.Create(MasterEntitieslst[i][j], Count);


							if (IsGlobalAutoSyncEnabled == true) {
								//Sync TaskSyncLogEntity
								var IsTaskSyncSuccess = _oTaskSyncLogDAO.UpdateLocalSyncStatus(MasterEntitieslst[i][j].ServerId, MasterEntitieslst[i][j].Type);
							}
							// If its Name mismatch
							if (DuplicateCheckDic[MasterEntitieslst[i][j].ServerId].Name != MasterEntitieslst[i][j].Name) {

								// If its UserMasterEntity
								if (MasterTables[i] == "UserMasterEntity") {

									// Updating UserName in existing dc profiles
									_oDcProfileDAO.UpdateUserNameByDcUserId(MasterEntitieslst[i][j].ServerId, MasterEntitieslst[i][j].Name);

									// Updating UserName in existing approval profiles
									_oDcApprovalUserDetailsDAO.UpdateUserNameByUserId(MasterEntitieslst[i][j].ServerId, MasterEntitieslst[i][j].Name);

									// Updating FollowUpUserName in existing action followup profiles
									_oActionFollowUpDAO.UpdateFollowUpUserNameByFollowUpUserId(MasterEntitieslst[i][j].ServerId, MasterEntitieslst[i][j].Name);
								}
							}

							Count += 1;
						}

						// If its available, check the OVGuid (UserMasterEntity)
						// If OVGuid is mismatch and UserMasterEntity
						else if (MasterTables[i] == "UserMasterEntity") {
							_oDefaultMasterDAO.DeleteByServerId(MasterEntitieslst[i][j].ServerId);
							_oDefaultMasterDAO.Create(MasterEntitieslst[i][j], Count);
							Count += 1;
						}
					}
				}

				// Node data insertion
				for (i = 0; i < NodeTables.length; i++) {

					//alert(NodeTables[i] + " : " + MasterEntitieslst[i + 23].length);

					var _oDefaultMasterDAO = new DefaultMasterDAO(NodeTables[i]);
					var _oDefaultTreeDAO = new DefaultTreeDAO();

					var Count = _oDefaultMasterDAO.Count();

					// Get all server id's and ovguid's
					var DuplicateCheckDic = {};

					if (NodeTables[i] == "ItemProcessMappingEntity") {
					   // alert('ItemProcessMappingEntity Count : ' + Count);
						DuplicateCheckDic = _oDefaultTreeDAO.GetAllInfoWithServerIdItemProcessMappingDict();
					}
					else if (NodeTables[i] == "RcoAndLabelMapping") {
						// alert('RcoAndLabelMapping Count : ' + Count);
						DuplicateCheckDic = _oDefaultTreeDAO.GetAllInfoWithServerIdRcoAndLabelMappingDict();
					}
					else if (NodeTables[i] == "OrderDetails") {
						// alert('OrderDetails Count : ' + Count);
						DuplicateCheckDic = _oDefaultTreeDAO.GetAllInfoWithServerIdOrderDetailsDict();
					}
					else if (NodeTables[i] == "PurchaseOrder") {
						// alert('PurchaseOrder Count : ' + Count);
						 DuplicateCheckDic = _oDefaultTreeDAO.GetAllInfoWithServerIdPurchaseOrderDict();
						// alert(NodeTables[i] + ":" + JSON.stringify(DuplicateCheckDic));
					}
					else if (NodeTables[i] == "WorkOrderItemDetails") {
						// alert('OrderDetails Count : ' + Count);
						DuplicateCheckDic = _oDefaultTreeDAO.GetAllInfoWithServerIdWorkOrderItemDetailsDict();
					}
					else if (NodeTables[i] == "FlightBeltPlanDetails") {
						// alert('OrderDetails Count : ' + Count);
						DuplicateCheckDic = _oDefaultTreeDAO.GetAllInfoWithServerIdFlightBeltPlanDetailsDict();
					}
					else if (NodeTables[i] == "FlightCellPlanDetails") {
						// alert('OrderDetails Count : ' + Count);
						DuplicateCheckDic = _oDefaultTreeDAO.GetAllInfoWithServerIdFlightCellPlanDetailsDict();
					}
					else if (NodeTables[i] == "FlightOALPlanDetails") {
						// alert('OrderDetails Count : ' + Count);
						DuplicateCheckDic = _oDefaultTreeDAO.GetAllInfoWithServerIdFlightOALPlanDetailsDict();
					}
					else if (NodeTables[i] == "PickListMasterDetails") {
						// alert('OrderDetails Count : ' + Count);
						DuplicateCheckDic = _oDefaultTreeDAO.GetAllInfoWithServerIdPickListMasterDetailsDict();
					}
					else if (NodeTables[i] == "ASOWorkOrderDetails") {
						// alert('OrderDetails Count : ' + Count);
						DuplicateCheckDic = _oDefaultTreeDAO.GetAllInfoWithServerIdASOWorkOrderDetailsDict();
					}
					else if (NodeTables[i] == "RFLWorkOrder") {
						// alert('OrderDetails Count : ' + Count);
						DuplicateCheckDic = _oDefaultTreeDAO.GetAllInfoWithServerIdRFLWorkOrderDict();
					}
					else if (NodeTables[i] != "OrganizationAssetsNodeRCOSpecialMapping") {
						DuplicateCheckDic = _oDefaultTreeDAO.GetAllInfoWithServerIdDict(NodeTables[i]);
					}
					else {
						DuplicateCheckDic = _oDefaultMasterDAO.GetAllServerIdAndId();
					}
					//alert(NodeTables[i] + ":" + JSON.stringify(DuplicateCheckDic));

					for (var j = 0; j < MasterEntitieslst[i + 23].length; j++) {

						// If its not available, create new profile
						if (DuplicateCheckDic[MasterEntitieslst[i + 23][j].ServerId] == undefined) {
							_oDefaultMasterDAO.Create(MasterEntitieslst[i + 23][j], Count);
							Count += 1;
						}

						// If its available, check the OVGuid
						// If OVGuid is mismatch
						else if (IsGlobalOVGuidCheckingEnabled == true && DuplicateCheckDic[MasterEntitieslst[i + 23][j].ServerId].OVGuid != MasterEntitieslst[i + 23][j].OVGuid) {

							_oDefaultMasterDAO.DeleteByServerId(MasterEntitieslst[i + 23][j].ServerId);
							_oDefaultMasterDAO.Create(MasterEntitieslst[i + 23][j], Count);

							////For Future if changing on any of these entity any other entities should be modified
							/*
							if (NodeTables[i] == "ItemProcessMappingEntity") {
								if (DuplicateCheckDic[MasterEntitieslst[i + 23][j].ServerId].ProcessId != MasterEntitieslst[i + 23][j].ProcessId && DuplicateCheckDic[MasterEntitieslst[i + 23][j].ServerId].DataId != MasterEntitieslst[i + 23][j].DataId) {
								   // alert('ItemProcessMappingEntity update case');
								}
							}

							else if (NodeTables[i] == "RcoAndLabelMapping") {
							   // alert('RcoAndLabelMapping update case');
							}
							else if (NodeTables[i] == "OrderDetails") {
							 //   alert('OrderDetails update case');
							}
							*/

							// If its not OrganizationAssetsNodeRCOSpecialMapping
							if (NodeTables[i] != "OrganizationAssetsNodeRCOSpecialMapping") {

								// If its OrganizationAssetsNode and Name mismatch
								if (DuplicateCheckDic[MasterEntitieslst[i + 23][j].ServerId].ChildDbElementName != MasterEntitieslst[i + 23][j].ChildDbElementName) {

									// If its Name mismatch
									if (NodeTables[i] == "OrganizationAssetsNode") {

										// Updating DcPlaceName in existing dc profiles
										_oDcProfileDAO.UpdateDcPlaceNameByDcPlaceId(MasterEntitieslst[i + 23][j].ServerId, MasterEntitieslst[i + 23][j].ChildDbElementName);

										// Updating DcPlaceName in existing action followup profiles
										_oActionFollowUpDAO.UpdateDcPlaceNameByDcPlaceId(MasterEntitieslst[i + 23][j].ServerId, MasterEntitieslst[i + 23][j].ChildDbElementName);

									}
									// If its TemplateNode
									else if (NodeTables[i] == "TemplateNode") {

										// Updating TemplateName in existing dc profiles
										_oDcProfileDAO.UpdateTemplateNameByTemplateNodeId(MasterEntitieslst[i + 23][j].ServerId, MasterEntitieslst[i + 23][j].ChildDbElementName);

										// Updating TemplateName in existing action followup profiles
										_oActionFollowUpDAO.UpdateTemplateNodeNameByTemplateNodeId(MasterEntitieslst[i + 23][j].ServerId, MasterEntitieslst[i + 23][j].ChildDbElementName);
									}
								}
							}

							Count += 1;
						}

						else if (OneViewSessionStorage.Get("ServiceId") == 36 && NodeTables[i] == "OrderDetails" && DuplicateCheckDic[MasterEntitieslst[i + 23][j].ServerId].OVGuid != MasterEntitieslst[i + 23][j].OVGuid) {
						   _oDefaultMasterDAO.DeleteByServerId(MasterEntitieslst[i + 23][j].ServerId);
						   _oDefaultMasterDAO.Create(MasterEntitieslst[i + 23][j], Count);
						   Count += 1;
						}
					}
				}

				OneViewConsole.Debug("InsertMaterData end", "ProfileDownloadBO.InsertMaterData");

				return true;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("BO", "ProfileDownloadBO.InsertMaterData", Excep);
			}
		}


		/// <summary>
		/// Insert all profiles
		/// </summary>
		/// <param name="Profilelst">Profile list</param>
		/// <returns>true or false</returns>
		this.InsertProfiles = function (Profilelst) {
			try {
				OneViewConsole.Debug("InsertProfiles start", "ProfileDownloadBO.InsertProfiles");

				var _oProfileDefaultMasterDAO = new DefaultMasterDAO("DcProfileEntity");
				var _oScheduleDefaultMasterDAO = new DefaultMasterDAO("DefaultScheduleEntity");

				var _oDcProfileDAO = new DcProfileDAO();

				// Check the count of DcProfileEntity
				var DcProfileEntityCount = _oProfileDefaultMasterDAO.Count();

				// Check the count of DefaultScheduleEntity
				var DefaultScheduleEntityCount = _oScheduleDefaultMasterDAO.Count();

				for (var i = 0; i < Profilelst.length; i++) {

					// Cheking this profile is already available in local db
					//var obj = _oProfileDefaultMasterDAO.GetByServerId(Profilelst[i].ServerId);

					var obj = _oDcProfileDAO.GetByAllDimensions(Profilelst[i].ServerId, Profilelst[i].DcPlaceId, Profilelst[i].TemplateNodeId, Profilelst[i].DcUserId);

					// If its not available, create new profile
					if (obj.length == 0) {

						_oProfileDefaultMasterDAO.Create(Profilelst[i], DcProfileEntityCount);

						for (var j = 0; j < Profilelst[i].DefaultScheduleEntityList.length; j++) {

							Profilelst[i].DefaultScheduleEntityList[j].DcProfileId = Profilelst[i].Id;

							_oScheduleDefaultMasterDAO.Create(Profilelst[i].DefaultScheduleEntityList[j], DefaultScheduleEntityCount);

							DefaultScheduleEntityCount += 1;
						}

						DcProfileEntityCount += 1;
					}

					// If its available, check the OVGuid
					// If OVGuid is mismatch
					else if (IsGlobalOVGuidCheckingEnabled == true && obj[0].OVGuid != Profilelst[i].OVGuid) {

						_oDcProfileDAO.DeleteById(obj[0].Id);

						_oProfileDefaultMasterDAO.Create(Profilelst[i], DcProfileEntityCount);

						for (var j = 0; j < Profilelst[i].DefaultScheduleEntityList.length; j++) {

							Profilelst[i].DefaultScheduleEntityList[j].DcProfileId = Profilelst[i].Id;

							_oScheduleDefaultMasterDAO.Create(Profilelst[i].DefaultScheduleEntityList[j], DefaultScheduleEntityCount);

							DefaultScheduleEntityCount += 1;
						}

						DcProfileEntityCount += 1;
					}
				}

				OneViewConsole.Debug("InsertProfiles end", "ProfileDownloadBO.InsertProfiles");

				return true;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("BO", "ProfileDownloadBO.InsertProfiles", Excep);
			}
		}


		/// <summary>
		/// Insert dc's
		/// </summary>
		/// <param name="DcLst">Dc list</param>
		/// <returns>true or false</returns>
		this.InsertDcLst = function (DcLst) {

			try {
				OneViewConsole.Debug("InsertDcLst start", "ProfileDownloadBO.InsertDcLst");

				var _oDcDAO = new DcDAO();

				//var _oDefaultMasterDAO = new DefaultMasterDAO("DataCaptureEntity");

				//// Get all server id's and ovguid's
				//var DuplicateCheckDic = _oDefaultMasterDAO.GetAllServerIdAndOVGuid();
				////alert(JSON.stringify(DuplicateCheckDic));

				//for (var i = 0; i < DcLst.length; i++) {

				//    // Cheking this dc is already available in local db
				//    //var obj = _oDefaultMasterDAO.GetByServerId(DcLst[i].ServerId);

				//    // If its not available
				//    if (DuplicateCheckDic[DcLst[i].ServerId] == undefined) {
				//        _oDcDAO.Create(DcLst[i], true);
				//    }

				//    // If its available, check the OVGuid
				//    // If OVGuid is mismatch
				//    else if (DuplicateCheckDic[DcLst[i].ServerId] != DcLst[i].OVGuid) {
				//        alert("DataCapture Updation (OVGuid mismatch) : Not implemented exception");
				//        OneViewConsole.Debug("Insert DC : Not implemented exception", "ProfileDownloadBO.InsertDcLst");
				//    }
				//}

				_oDcDAO.InsertDCList(DcLst);

				OneViewConsole.Debug("InsertDcLst end", "ProfileDownloadBO.InsertDcLst");

				return true;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("BO", "ProfileDownloadBO.InsertDcLst", Excep);
			}
		}


		/// <summary>
		/// Insert DcApprovalProfile's
		/// </summary>
		/// <param name="DcApprovalProfileLst">DcApprovalProfile list</param>
		/// <returns>true or false</returns>
		this.InsertDcApprovalProfileLst = function (DcApprovalProfileLst) {

			try {
				OneViewConsole.Debug("InsertDcApprovalProfileLst start", "ProfileDownloadBO.InsertDcApprovalProfileLst");

				var _oDefaultDcApprovalProfileDAO = new DefaultMasterDAO("DcApprovalProfileEntity");
				var _oDefaultDcApprovalLevelInfoDAO = new DefaultMasterDAO("DcApprovalLevelInfoEntity");
				var _oDefaultDcApprovalUserDetailsDAO = new DefaultMasterDAO("DcApprovalUserDetailsEntity");
				var _oDcApprovalProfileDAO = new DcApprovalProfileDAO();

				var DcApprovalProfileCount = _oDefaultDcApprovalProfileDAO.Count();
				var DcApprovalLevelInfoCount = _oDefaultDcApprovalLevelInfoDAO.Count();
				var DcApprovalUserDetailsCount = _oDefaultDcApprovalUserDetailsDAO.Count();

				for (var i = 0; i < DcApprovalProfileLst.length; i++) {

					var obj = _oDcApprovalProfileDAO.GetByAllDimensions_Profiledownload(DcApprovalProfileLst[i].DcPlaceType, DcApprovalProfileLst[i].DcPlaceId, DcApprovalProfileLst[i].TemplateNodeId, DcApprovalProfileLst[i].DcUserId);

					// Cheking this dc is already available in local db
					// If its not available
					if (obj.length == 0) {

						var _oDcApprovalProfile = _oDefaultDcApprovalProfileDAO.Create(DcApprovalProfileLst[i], DcApprovalProfileCount);

						for (var j = 0; j < DcApprovalProfileLst[i].DcApprovalLevelInfoEntityList.length; j++) {

							DcApprovalProfileLst[i].DcApprovalLevelInfoEntityList[j].DcApprovalProfileId = _oDcApprovalProfile.Id;

							var _oDcApprovalLevelInfo = _oDefaultDcApprovalLevelInfoDAO.Create(DcApprovalProfileLst[i].DcApprovalLevelInfoEntityList[j], DcApprovalLevelInfoCount);

							for (var k = 0; k < DcApprovalProfileLst[i].DcApprovalLevelInfoEntityList[j].DcApprovalUserDetailsEntityList.length; k++) {

								DcApprovalProfileLst[i].DcApprovalLevelInfoEntityList[j].DcApprovalUserDetailsEntityList[k].DcApprovalProfileId = _oDcApprovalProfile.Id;
								DcApprovalProfileLst[i].DcApprovalLevelInfoEntityList[j].DcApprovalUserDetailsEntityList[k].DcApprovalLevelInfoId = _oDcApprovalLevelInfo.Id;

								_oDefaultDcApprovalUserDetailsDAO.Create(DcApprovalProfileLst[i].DcApprovalLevelInfoEntityList[j].DcApprovalUserDetailsEntityList[k], DcApprovalUserDetailsCount);

								DcApprovalUserDetailsCount++;
							}

							DcApprovalLevelInfoCount++;
						}

						DcApprovalProfileCount++;
					}

					// If its available, check the OVGuid
					// If OVGuid is mismatch
					else if (IsGlobalOVGuidCheckingEnabled == true && obj[0].OVGuid != DcApprovalProfileLst[i].OVGuid) {

						_oDcApprovalProfileDAO.DeleteByByAllDimensions(DcApprovalProfileLst[i].DcPlaceType, DcApprovalProfileLst[i].DcPlaceId, DcApprovalProfileLst[i].TemplateNodeId, DcApprovalProfileLst[i].DcUserId);

						var _oDcApprovalProfile = _oDefaultDcApprovalProfileDAO.Create(DcApprovalProfileLst[i], DcApprovalProfileCount);

						for (var j = 0; j < DcApprovalProfileLst[i].DcApprovalLevelInfoEntityList.length; j++) {

							DcApprovalProfileLst[i].DcApprovalLevelInfoEntityList[j].DcApprovalProfileId = _oDcApprovalProfile.Id;

							var _oDcApprovalLevelInfo = _oDefaultDcApprovalLevelInfoDAO.Create(DcApprovalProfileLst[i].DcApprovalLevelInfoEntityList[j], DcApprovalLevelInfoCount);

							for (var k = 0; k < DcApprovalProfileLst[i].DcApprovalLevelInfoEntityList[j].DcApprovalUserDetailsEntityList.length; k++) {

								DcApprovalProfileLst[i].DcApprovalLevelInfoEntityList[j].DcApprovalUserDetailsEntityList[k].DcApprovalProfileId = _oDcApprovalProfile.Id;
								DcApprovalProfileLst[i].DcApprovalLevelInfoEntityList[j].DcApprovalUserDetailsEntityList[k].DcApprovalLevelInfoId = _oDcApprovalLevelInfo.Id;

								_oDefaultDcApprovalUserDetailsDAO.Create(DcApprovalProfileLst[i].DcApprovalLevelInfoEntityList[j].DcApprovalUserDetailsEntityList[k], DcApprovalUserDetailsCount);

								DcApprovalUserDetailsCount++;
							}

							DcApprovalLevelInfoCount++;
						}

						DcApprovalProfileCount++;
					}
				}

				OneViewConsole.Debug("InsertDcApprovalProfileLst end", "ProfileDownloadBO.InsertDcApprovalProfileLst");

				return true;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("BO", "ProfileDownloadBO.InsertDcApprovalProfileLst", Excep);
			}
		}


		/// <summary>
		/// Insert AttributeOtherConfig's
		/// </summary>
		/// <param name="AttributeOtherConfigLst">AttributeOtherConfig list</param>
		/// <returns>true or false</returns>
		this.InsertAttributeOtherConfigMetaData = function (AttributeOtherConfigobj) {

			try {
				OneViewConsole.Debug("InsertAttributeOtherConfigMetaData start", "ProfileDownloadBO.InsertAttributeOtherConfigMetaData");

				var _oDefaultMasterDAO = new DefaultMasterDAO("AttributeOtherConfigEntity");
				var _oAttributeOtherConfigDAO = new AttributeOtherConfigDAO();
				var _oTaskSyncLogDAO = new TaskSyncLogDAO();

				var Count = _oDefaultMasterDAO.Count();

				// Cheking this master is already available in local db
				var obj = _oAttributeOtherConfigDAO.GetByAllDimensions(AttributeOtherConfigobj.DcPlaceId, AttributeOtherConfigobj.TemplateNodeId, AttributeOtherConfigobj.DcUserId);


				// If its not available, create new master
				if (obj.length == 0) {
					_oDefaultMasterDAO.Create(AttributeOtherConfigobj, Count);
				}

				// If its available, check the OVGuid
				// If OVGuid is mismatch
				else { //if (obj[0].OVGuid != AttributeOtherConfigobj.OVGuid) {
					_oAttributeOtherConfigDAO.UpdateById(AttributeOtherConfigobj, obj[0].Id);
				}

				if (IsGlobalAutoSyncEnabled == true) {
					//Sync TaskSyncLogEntity
					var IsTaskSyncSuccess = _oTaskSyncLogDAO.UpdateLocalSyncStatus(AttributeOtherConfigobj.ServerId, AttributeOtherConfigobj.Type);
				}

				OneViewConsole.Debug("InsertAttributeOtherConfigMetaData end", "ProfileDownloadBO.InsertAttributeOtherConfigMetaData");

				return true;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("BO", "ProfileDownloadBO.InsertAttributeOtherConfigMetaData", Excep);
			}
		}


		/// <summary>
		/// Inserts Action-NC profiles
		/// </summary>
		/// <param name="ActionNCProfileList">Action-NC profile list</param>
		/// <returns>true or false</returns>
		this.InsertActionNCProfiles = function (ActionNCProfileList) {
			try {
				OneViewConsole.Debug("InsertActionNCProfiles start", "ProfileDownloadBO.InsertActionNCProfiles");

				var _oActionNCProfileDefaultMasterDAO = new DefaultMasterDAO("ActionNCProfileEntity");


				var _oActionNCProfilingDAO = new ActionNCProfilingDAO();

				// Check the count of ActionNCProfile
				var ActionNCProfileCount = _oActionNCProfileDefaultMasterDAO.Count();
				var _oTaskSyncLogDAO = new TaskSyncLogDAO();

				for (var i = 0; i < ActionNCProfileList.length; i++) {

					// Cheking this profile is already available in local db
					var obj = _oActionNCProfilingDAO.GetByAllDimensions(ActionNCProfileList[i].DcPlaceId, ActionNCProfileList[i].TemplateNodeId, ActionNCProfileList[i].DcUserId);

					// If its not available, create new profile
					if (obj.length == 0) {
						//alert('ActionNCProfileList[i]:' + JSON.stringify(ActionNCProfileList[i]));
						_oActionNCProfileDefaultMasterDAO.Create(ActionNCProfileList[i], ActionNCProfileCount);
						ActionNCProfileCount += 1;
					}

					// If its available, check the OVGuid
					// If OVGuid is mismatch
					//else if (obj[0].OVGuid != ActionNCProfileList[i].OVGuid) {
					//    alert("Insert Action-NC Profiles : Not implemented exception");
					//    OneViewConsole.Debug("Insert Action-NC Profiles : Not implemented exception", "ProfileDownloadBO.InsertActionNCProfiles");

					//    //_oActionNCProfilingDAO.UpdateById(ActionNCProfileList[i], obj[0].Id);
					//}

					else {
						_oActionNCProfileDefaultMasterDAO.DeleteById(obj[0].Id);

						_oActionNCProfileDefaultMasterDAO.Create(ActionNCProfileList[i], ActionNCProfileCount);
						ActionNCProfileCount += 1;
					}

					if (IsGlobalAutoSyncEnabled == true) {
						//Sync TaskSyncLogEntity
						var IsTaskSyncSuccess = _oTaskSyncLogDAO.UpdateLocalSyncStatus(ActionNCProfileList[i].ServerId, ActionNCProfileList[i].Type);
					}
				}

				OneViewConsole.Debug("InsertApprovalProfiles end", "ProfileDownloadBO.InsertActionNCProfiles");
				return true;
			}
			catch (Excep) {
			   // alert('InsertActionNCProfiles' + Excep);
			   // alert('InsertActionNCProfiles' + JSON.stringify(Excep));
				throw oOneViewExceptionHandler.Create("BO", "ProfileDownloadBO.InsertActionNCProfiles", Excep);
			}
		}


		/// <summary>
		/// Inserts PreDefined Actions
		/// </summary>
		/// <param name="PreDefinedActionDTOLst">PreDefined Action list</param>
		/// <returns>true or false</returns>
		this.InsertPreDefinedActions = function (PreDefinedActionDTOLst) {

			try {
				OneViewConsole.Debug("InsertPreDefinedActions start", "ProfileDownloadBO.InsertPreDefinedActions");

				var _oDefaultMasterDAO = new DefaultMasterDAO("PredefinedActionMasterEntity");
				var _oTaskSyncLogDAO = new TaskSyncLogDAO();
				var Count = _oDefaultMasterDAO.Count();

				// Get all server id's and ovguid's
				var DuplicateCheckDic = _oDefaultMasterDAO.GetAllServerIdAndOVGuid();

				for (i = 0; i < PreDefinedActionDTOLst.length; i++) {
					if (DuplicateCheckDic[PreDefinedActionDTOLst[i].ServerId] == undefined) {
						_oDefaultMasterDAO.Create(PreDefinedActionDTOLst[i], Count);
						Count += 1;
					}
					else {
						_oDefaultMasterDAO.DeleteByServerId(PreDefinedActionDTOLst[i].ServerId);
						_oDefaultMasterDAO.Create(PreDefinedActionDTOLst[i], Count);
						Count += 1;
					}

					if (IsGlobalAutoSyncEnabled == true) {
						//Sync TaskSyncLogEntity
						var IsTaskSyncSuccess = _oTaskSyncLogDAO.UpdateLocalSyncStatus(PreDefinedActionDTOLst[i].ServerId, PreDefinedActionDTOLst[i].Type);
					}
				}

				OneViewConsole.Debug("InsertPreDefinedActions end", "ProfileDownloadBO.InsertPreDefinedActions");

				return true;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("BO", "ProfileDownloadBO.InsertPreDefinedActions", Excep);
			}
		}


		/// <summary>
		/// Inserts Action Manual FollowUp
		/// </summary>
		/// <param name="ActionManualFollowUpLst">Action Manual FollowUp list</param>
		/// <returns>true or false</returns>
		this.InsertActionManualFollowUpLst = function (ActionManualFollowUpLst) {

			try {
				OneViewConsole.Debug("InsertActionManualFollowUpLst start", "ProfileDownloadBO.InsertActionManualFollowUpLst");

				var _oDefaultMasterDAO = new DefaultMasterDAO("ActionManualFollowUpEntity");
				var Count = _oDefaultMasterDAO.Count();

				// Get all server id's and ovguid's
				var DuplicateCheckDic = _oDefaultMasterDAO.GetAllServerIdAndOVGuid();

				for (i = 0; i < ActionManualFollowUpLst.length; i++) {

					if (DuplicateCheckDic[ActionManualFollowUpLst[i].ServerId] == undefined) {
						_oDefaultMasterDAO.Create(ActionManualFollowUpLst[i], Count);
						Count += 1;
					}
					else {
						_oDefaultMasterDAO.DeleteByServerId(ActionManualFollowUpLst[i].ServerId);
						_oDefaultMasterDAO.Create(ActionManualFollowUpLst[i], Count);
						Count += 1;
					}
				}

				OneViewConsole.Debug("InsertActionManualFollowUpLst end", "ProfileDownloadBO.InsertActionManualFollowUpLst");

				return true;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("BO", "ProfileDownloadBO.InsertActionManualFollowUpLst", Excep);
			}
		}


		/// <summary>
		/// Inserts TemplateConfig list
		/// </summary>
		/// <param name="TemplateConfigList">TemplateConfig list</param>
		/// <returns>true or false</returns>
		this.InsertTemplateConfig = function (TemplateConfigList) {
			try {
				OneViewConsole.Debug("InsertTemplateConfig start", "ProfileDownloadBO.InsertTemplateConfig");

				var _oTemplateConfigMetaData = new DefaultMasterDAO("TemplateConfigMetaData");

				var _oTemplateConfigDAO = new TemplateConfigDAO();
				var _oTaskSyncLogDAO = new TaskSyncLogDAO();

				// Check the count
				var Count = _oTemplateConfigMetaData.Count();

				for (var i = 0; i < TemplateConfigList.length; i++) {

					// Cheking it is already available in local db
					var obj = _oTemplateConfigDAO.GetByServiceIdAndTemplateNodeId(TemplateConfigList[i].ServiceId, TemplateConfigList[i].TemplateNodeId);

					// If its not available, create new
					if (obj.length == 0) {
						_oTemplateConfigMetaData.Create(TemplateConfigList[i], Count);
						Count += 1;
					}
					else {
						_oTemplateConfigMetaData.DeleteById(obj[0].Id);

						_oTemplateConfigMetaData.Create(TemplateConfigList[i], Count);
						Count += 1;
					}

					if (IsGlobalAutoSyncEnabled == true) {
						//Sync TaskSyncLogEntity
						var IsTaskSyncSuccess = _oTaskSyncLogDAO.UpdateLocalSyncStatus(TemplateConfigList[i].ServerId, TemplateConfigList[i].Type);
					}

				}

				OneViewConsole.Debug("InsertTemplateConfig end", "ProfileDownloadBO.InsertTemplateConfig");
				return true;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("BO", "ProfileDownloadBO.InsertTemplateConfig", Excep);
			}
		}


		/// <summary>
		/// Inserts DCDisplayMetaData list
		/// </summary>
		/// <param name="DCDisplayMetaDataList">DCDisplayMetaData list</param>
		/// <returns>true or false</returns>
		this.InsertDCDisplayMetaData = function (DCDisplayMetaDataList) {
			try {
				OneViewConsole.Debug("InsertDCDisplayMetaData start", "ProfileDownloadBO.InsertDCDisplayMetaData");

				var _oDCDisplayMetaData = new DefaultMasterDAO("DCDisplayMetaData");

				var _oDCDisplayMetaDataDAO = new DCDisplayMetaDataDAO();

				// Check the count
				var Count = _oDCDisplayMetaData.Count();

				for (var i = 0; i < DCDisplayMetaDataList.length; i++) {

					// Cheking it is already available in local db
					var obj = _oDCDisplayMetaDataDAO.GetByServerId(DCDisplayMetaDataList[i].ServerId);

					// If its not available, create new
					if (obj.length == 0) {
						_oDCDisplayMetaData.Create(DCDisplayMetaDataList[i], Count);
						Count += 1;
					}
					else {
						_oDCDisplayMetaData.DeleteById(obj[0].Id);

						_oDCDisplayMetaData.Create(DCDisplayMetaDataList[i], Count);
						Count += 1;
					}
				}

				OneViewConsole.Debug("InsertDCDisplayMetaData end", "ProfileDownloadBO.InsertDCDisplayMetaData");
				return true;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("BO", "ProfileDownloadBO.InsertDCDisplayMetaData", Excep);
			}
		}


		/// <summary>
		/// Inserts DCBlockerInfo list
		/// </summary>
		/// <param name="DCBlockerInfoList">DCBlockerInfo list</param>
		/// <returns>true or false</returns>
		this.InsertDCBlockerInfo = function (DCBlockerInfoList) {
			try {
				OneViewConsole.Debug("InsertDCBlockerInfo start", "ProfileDownloadBO.InsertDCBlockerInfo");

				var _oDCBlockerInfoDAO = new DefaultMasterDAO("DCBlockerInfoEntity");

				// Check the count
				var Count = _oDCBlockerInfoDAO.Count();

				for (var i = 0; i < DCBlockerInfoList.length; i++) {

					// Cheking it is already available in local db
					var obj = _oDCBlockerInfoDAO.GetByServerId(DCBlockerInfoList[i].ServerId);

					// If its not available, create new
					if (obj.length == 0) {
						_oDCBlockerInfoDAO.Create(DCBlockerInfoList[i], Count);
						Count += 1;
					}
					else {
						_oDCBlockerInfoDAO.DeleteById(obj[0].Id);

						_oDCBlockerInfoDAO.Create(DCBlockerInfoList[i], Count);
						Count += 1;
					}
				}

				OneViewConsole.Debug("InsertDCBlockerInfo end", "ProfileDownloadBO.InsertDCBlockerInfo");
				return true;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("BO", "ProfileDownloadBO.InsertDCBlockerInfo", Excep);
			}
		}


		/// <summary>
		/// Insert MultiMediaSubElements list
		/// </summary>
		/// <param name="MultiMediaSubElementsLst">MultiMediaSubElements list</param>
		/// <returns>true or false</returns>
		this.InsertMultiMediaSubElements = function (MultiMediaSubElementsLst, xlatService) {
			try {
				OneViewConsole.Debug("InsertMultiMediaSubElements start", "ProfileDownloadBO.InsertMultiMediaSubElements");

				var IsSuccess = true;
				var MultiMediaSubElementsToDownloadFromSimpleStorage = [];

				var _oDefaultMasterDAO = new DefaultMasterDAO("MultiMediaSubElements");

				var Count = _oDefaultMasterDAO.Count();

				// Get all server id's and ovguid's
				var DuplicateCheckDic = _oDefaultMasterDAO.GetAllServerIdAndOVGuid();

				for (i = 0; i < MultiMediaSubElementsLst.length; i++) {
					if (DuplicateCheckDic[MultiMediaSubElementsLst[i].ServerId] == undefined) {
						var NewMultiMediaSubElement = _oDefaultMasterDAO.Create(MultiMediaSubElementsLst[i], Count);
						MultiMediaSubElementsToDownloadFromSimpleStorage.push(NewMultiMediaSubElement);
						Count += 1;
					}
				}
				if (MultiMediaSubElementsToDownloadFromSimpleStorage.length > 0) {
					var _oUploadBO = new UploadBO(xlatService, '');
					IsSuccess = _oUploadBO.DownloadMultiMediaSubElements(MultiMediaSubElementsToDownloadFromSimpleStorage);
				}

				OneViewConsole.Debug("InsertMultiMediaSubElements end", "ProfileDownloadBO.InsertMultiMediaSubElements");
			}
			catch (Excep) {
				IsSuccess = false;
				throw oOneViewExceptionHandler.Create("BO", "ProfileDownloadBO.InsertMultiMediaSubElements", Excep);
			}

			return IsSuccess;
		}


		/// <summary>
		/// Inserts Template Validation Config
		/// </summary>
		/// <param name="TemplateValidationConfigList">Template Validation Config list</param>
		/// <returns>true or false</returns>
		this.InsertTemplateValidationConfigMetadata = function (TemplateValidationConfigList) {
			try {
				OneViewConsole.Debug("InsertTemplateValidationConfigMetadata start", "ProfileDownloadBO.InsertTemplateValidationConfigMetadata");

				var _oTemplateValidationConfigDefaultMasterDAO = new DefaultMasterDAO("TemplateValidationConfigMetaDataEntity");


				var _oTemplatValidationConfigMetaDataDAO = new TemplatValidationConfigMetaDataDAO();

				var _oTaskSyncLogDAO = new TaskSyncLogDAO();

				// Check the count of ActionNCProfile
				var TemplatValidationConfigCount = _oTemplateValidationConfigDefaultMasterDAO.Count();

				for (var i = 0; i < TemplateValidationConfigList.length; i++) {

					// Cheking this profile is already available in local db
					var obj = _oTemplatValidationConfigMetaDataDAO.GetByAllDimensions(TemplateValidationConfigList[i].DcPlaceId, TemplateValidationConfigList[i].TemplateNodeId, TemplateValidationConfigList[i].DcUserId);

					// If its not available, create new profile
					if (obj.length == 0) {
						//alert('TemplateValidationConfigList[i]:' + JSON.stringify(TemplateValidationConfigList[i]));
						_oTemplateValidationConfigDefaultMasterDAO.Create(TemplateValidationConfigList[i], TemplatValidationConfigCount);
						TemplatValidationConfigCount += 1;
					}

						// If its available, check the OVGuid
						// If OVGuid is mismatch
						//else if (obj[0].OVGuid != TemplateValidationConfigList[i].OVGuid) {
						//    alert("Insert TemplateValidationConfig : Not implemented exception");
						//    OneViewConsole.Debug("Insert TemplateValidationConfig : Not implemented exception", "ProfileDownloadBO.InsertTemplateValidationConfigMetadata");

						//    //_oTemplatValidationConfigMetaDataDAO.UpdateById(TemplateValidationConfigList[i], obj[0].Id);
						//}

					else {
						_oTemplateValidationConfigDefaultMasterDAO.DeleteById(obj[0].Id);

						_oTemplateValidationConfigDefaultMasterDAO.Create(TemplateValidationConfigList[i], TemplatValidationConfigCount);
						TemplatValidationConfigCount += 1;
					}

					if (IsGlobalAutoSyncEnabled == true) {
						//Sync TaskSyncLogEntity
						var IsTaskSyncSuccess = _oTaskSyncLogDAO.UpdateLocalSyncStatus(TemplateValidationConfigList[i].ServerId, TemplateValidationConfigList[i].Type);
					}

				}

				OneViewConsole.Debug("InsertTemplateValidationConfigMetadata end", "ProfileDownloadBO.InsertTemplateValidationConfigMetadata");
				return true;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("BO", "ProfileDownloadBO.InsertTemplateValidationConfigMetadata", Excep);
			}
		}


		/// <summary>
		/// Inserts MobileViewRecordsMetadata
		/// </summary>
		/// <param name="MobileViewRecordsMetadataList">MobileViewRecordsMetadata list</param>
		/// <returns>true or false</returns>
		this.InsertMobileViewRecordsMetadata = function (MobileViewRecordsMetadataList) {
			try {
				OneViewConsole.Debug("InsertMobileViewRecordsMetadata start", "ProfileDownloadBO.InsertMobileViewRecordsMetadata");

				var _oDefaultMasterDAO = new DefaultMasterDAO("MobileViewRecordsMetadataEntity");


				var _oMobileViewRecordsMetadataDAO = new MobileViewRecordsMetadataDAO();
				var _oTaskSyncLogDAO = new TaskSyncLogDAO();

				// Check the count of ActionNCProfile
				var MobileViewRecordsMetadataCount = _oDefaultMasterDAO.Count();

				for (var i = 0; i < MobileViewRecordsMetadataList.length; i++) {

					// Cheking this profile is already available in local db
					var obj = _oMobileViewRecordsMetadataDAO.GetByAllDimensions(MobileViewRecordsMetadataList[i].DcPlaceId, MobileViewRecordsMetadataList[i].TemplateNodeId, MobileViewRecordsMetadataList[i].DcUserId);

					// If its not available, create new profile
					if (obj.length == 0) {

						_oDefaultMasterDAO.Create(MobileViewRecordsMetadataList[i], MobileViewRecordsMetadataCount);
						MobileViewRecordsMetadataCount += 1;
					}

					else {
						_oDefaultMasterDAO.DeleteById(obj[0].Id);

						_oDefaultMasterDAO.Create(MobileViewRecordsMetadataList[i], MobileViewRecordsMetadataCount);
						MobileViewRecordsMetadataCount += 1;
					}

					if (IsGlobalAutoSyncEnabled == true) {
						//Sync TaskSyncLogEntity
						var IsTaskSyncSuccess = _oTaskSyncLogDAO.UpdateLocalSyncStatus(MobileViewRecordsMetadataList[i].ServerId, MobileViewRecordsMetadataList[i].Type);
					}

				}

				OneViewConsole.Debug("InsertMobileViewRecordsMetadata end", "ProfileDownloadBO.InsertMobileViewRecordsMetadata");

				return true;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("BO", "ProfileDownloadBO.InsertMobileViewRecordsMetadata", Excep);
			}
		}


		/// <summary>
		/// Inserts GarbageCollectorMetadata
		/// </summary>
		/// <param name="GarbageCollectorMetadataList">GarbageCollectorMetadata list</param>
		/// <returns>true or false</returns>
		this.InsertGarbageCollectorMetadata = function (GarbageCollectorMetadataList) {
			try {
				OneViewConsole.Debug("InsertGarbageCollectorMetadata start", "ProfileDownloadBO.InsertGarbageCollectorMetadata");

				var _oDefaultMasterDAO = new DefaultMasterDAO("GarbageCollectorMetadataEntity");
				var _oTaskSyncLogDAO = new TaskSyncLogDAO();


				var _oGarbageCollectorMetadataDAO = new GarbageCollectorMetadataDAO();

				// Check the count of ActionNCProfile
				var GarbageCollectorMetadataCount = _oDefaultMasterDAO.Count();

				for (var i = 0; i < GarbageCollectorMetadataList.length; i++) {

					// Cheking this profile is already available in local db
					var obj = _oGarbageCollectorMetadataDAO.GetByAllDimensions(GarbageCollectorMetadataList[i].DcPlaceId, GarbageCollectorMetadataList[i].TemplateNodeId, GarbageCollectorMetadataList[i].DcUserId);

					// If its not available, create new profile
					if (obj.length == 0) {

						_oDefaultMasterDAO.Create(GarbageCollectorMetadataList[i], GarbageCollectorMetadataCount);
						GarbageCollectorMetadataCount += 1;
					}

					else {
						_oDefaultMasterDAO.DeleteById(obj[0].Id);

						_oDefaultMasterDAO.Create(GarbageCollectorMetadataList[i], GarbageCollectorMetadataCount);
						GarbageCollectorMetadataCount += 1;
					}

					if (IsGlobalAutoSyncEnabled == true) {
						//Sync TaskSyncLogEntity
						var IsTaskSyncSuccess = _oTaskSyncLogDAO.UpdateLocalSyncStatus(GarbageCollectorMetadataList[i].ServerId, GarbageCollectorMetadataList[i].Type);
					}

				}

				OneViewConsole.Debug("InsertGarbageCollectorMetadata end", "ProfileDownloadBO.InsertGarbageCollectorMetadata");

				return true;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("BO", "ProfileDownloadBO.InsertGarbageCollectorMetadata", Excep);
			}
		}


		/// <summary>
		/// Inserts TemplateUIEventJobConfig
		/// </summary>
		/// <param name="TemplateUIEventJobConfigList">TemplateUIEventJobConfig list</param>
		/// <returns>true or false</returns>
		this.InsertTemplateUIEventJobConfigMetadata = function (TemplateUIEventJobConfigList) {
			try {
				OneViewConsole.Debug("InsertTemplateUIEventJobConfigMetadata start", "ProfileDownloadBO.InsertTemplateUIEventJobConfigMetadata");

				var _oTemplateUIEventJobConfigDAO = new DefaultMasterDAO("TemplateUIEventJobConfigMetaDataEntity");


				var _oTemplateUIEventJobConfigMetaDataDAO = new TemplateUIEventJobConfigMetaDataDAO();
				var _oTaskSyncLogDAO = new TaskSyncLogDAO();

				// Check the count of ActionNCProfile
				var TemplatUIEventJobConfigCount = _oTemplateUIEventJobConfigDAO.Count();

				for (var i = 0; i < TemplateUIEventJobConfigList.length; i++) {

					// Cheking this profile is already available in local db
					var obj = _oTemplateUIEventJobConfigMetaDataDAO.GetByAllDimensions(TemplateUIEventJobConfigList[i].DcPlaceId, TemplateUIEventJobConfigList[i].TemplateNodeId, TemplateUIEventJobConfigList[i].DcUserId);

					// If its not available, create new profile
					if (obj.length == 0) {

						_oTemplateUIEventJobConfigDAO.Create(TemplateUIEventJobConfigList[i], TemplatUIEventJobConfigCount);
						TemplatUIEventJobConfigCount += 1;
					}

					else {
						_oTemplateUIEventJobConfigDAO.DeleteById(obj[0].Id);

						_oTemplateUIEventJobConfigDAO.Create(TemplateUIEventJobConfigList[i], TemplatUIEventJobConfigCount);
						TemplatUIEventJobConfigCount += 1;
					}

					if (IsGlobalAutoSyncEnabled == true) {
						//Sync TaskSyncLogEntity
						var IsTaskSyncSuccess = _oTaskSyncLogDAO.UpdateLocalSyncStatus(TemplateUIEventJobConfigList[i].ServerId, TemplateUIEventJobConfigList[i].Type);
					}
				}

				OneViewConsole.Debug("InsertTemplateUIEventJobConfigMetadata end", "ProfileDownloadBO.InsertTemplateUIEventJobConfigMetadata");

				return true;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("BO", "ProfileDownloadBO.InsertTemplateUIEventJobConfigMetadata", Excep);
			}
		}


		/// <summary>
		/// Inserts DcCustomPageHtml
		/// </summary>
		/// <param name="DcCustomPageHtmlList">DcCustomPageHtml list</param>
		/// <returns>true or false</returns>
		this.InsertDcCustomPageHtml = function (DcCustomPageHtmlList, IsDevPageTestEnable) {
			try {
				OneViewConsole.Debug("InsertDcCustomPageHtml start", "ProfileDownloadBO.InsertDcCustomPageHtml");

				var _oDefaultMasterDAO = new DefaultMasterDAO("DcCustomPageHtmlEntity");
				var _oDcCustomPageHtmlDAO = new DcCustomPageHtmlDAO();

				// Check the count of ActionNCProfile
				var DcCustomPageHtmlCount = _oDefaultMasterDAO.Count();

				for (var i = 0; i < DcCustomPageHtmlList.length; i++) {

					// Checking this profile is already available in local db
					var obj = _oDcCustomPageHtmlDAO.GetByAllDimensions(DcCustomPageHtmlList[i].ServiceId, DcCustomPageHtmlList[i].TemplateNodeId);

					// If its not available, create new profile
					if (obj.length == 0) {

						_oDefaultMasterDAO.Create(DcCustomPageHtmlList[i], DcCustomPageHtmlCount);
						DcCustomPageHtmlCount += 1;
					}

					else if ((obj[0].OVGuid != DcCustomPageHtmlList[i].OVGuid) || IsDevPageTestEnable == true) {

						_oDefaultMasterDAO.DeleteById(obj[0].Id);

						_oDefaultMasterDAO.Create(DcCustomPageHtmlList[i], DcCustomPageHtmlCount);
						DcCustomPageHtmlCount += 1;
					}
				}

				OneViewConsole.Debug("InsertDcCustomPageHtml end", "ProfileDownloadBO.InsertDcCustomPageHtml");

				return true;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("BO", "ProfileDownloadBO.InsertDcCustomPageHtml", Excep);
			}
		}


		/// <summary>
		/// Inserts MobileDcPreviewMetadata
		/// </summary>
		/// <param name="MobileDcPreviewMetadataList">MobileDcPreviewMetadata list</param>
		/// <returns>true or false</returns>
		this.InsertMobileDcPreviewMetadata = function (MobileDcPreviewMetadataList) {
			try {
				OneViewConsole.Debug("InsertMobileDcPreviewMetadata start", "ProfileDownloadBO.InsertMobileDcPreviewMetadata");

				var _oDefaultMasterDAO = new DefaultMasterDAO("MobileDcPreviewMetadataEntity");
				var _oTaskSyncLogDAO = new TaskSyncLogDAO();


				var _oMobileDcPreviewMetadataDAO = new MobileDcPreviewMetadataDAO();

				// Check the count of ActionNCProfile
				var MobileDcPreviewMetadataCount = _oDefaultMasterDAO.Count();

				for (var i = 0; i < MobileDcPreviewMetadataList.length; i++) {

					// Cheking this profile is already available in local db
					var obj = _oMobileDcPreviewMetadataDAO.GetByAllDimensions(MobileDcPreviewMetadataList[i].DcPlaceId, MobileDcPreviewMetadataList[i].TemplateNodeId, MobileDcPreviewMetadataList[i].DcUserId);

					// If its not available, create new profile
					if (obj.length == 0) {

						_oDefaultMasterDAO.Create(MobileDcPreviewMetadataList[i], MobileDcPreviewMetadataCount);
						MobileDcPreviewMetadataCount += 1;
					}

					else {
						_oDefaultMasterDAO.DeleteById(obj[0].Id);

						_oDefaultMasterDAO.Create(MobileDcPreviewMetadataList[i], MobileDcPreviewMetadataCount);
						MobileDcPreviewMetadataCount += 1;
					}

					if (IsGlobalAutoSyncEnabled == true) {
						//Sync TaskSyncLogEntity
						var IsTaskSyncSuccess = _oTaskSyncLogDAO.UpdateLocalSyncStatus(MobileDcPreviewMetadataList[i].ServerId, MobileDcPreviewMetadataList[i].Type);
					}

				}

				OneViewConsole.Debug("InsertMobileDcPreviewMetadata end", "ProfileDownloadBO.InsertMobileDcPreviewMetadata");

				return true;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("BO", "ProfileDownloadBO.InsertMobileDcPreviewMetadata", Excep);
			}
		}




		/// <summary>
		///InsertExcludedAttributeMetadata list
		/// </summary>
		/// <param name="ExcludedAttributeMetadataList">ExcludedAttributeMetadata list</param>
		/// <returns>true or false</returns>
		this.InsertExcludedAttributeMetadata = function (ExcludedAttributeMetadataList) {
			try {
				OneViewConsole.Debug("InsertTemplateConfig start", "ProfileDownloadBO.InsertTemplateConfig");

				var _oExcludedAttributeMetadata = new DefaultMasterDAO("ExcludedAttributeMetadataEntity");

				var _oExcludedAttributeMetadataDAO = new ExcludedAttributeMetadataDAO();
				var _oTaskSyncLogDAO = new TaskSyncLogDAO();

				// Check the count
				var Count = _oExcludedAttributeMetadata.Count();

				for (var i = 0; i < ExcludedAttributeMetadataList.length; i++) {

					// Cheking it is already available in local db
					var obj = _oExcludedAttributeMetadataDAO.GetByServiceIdPlaceIDAndTemplateNodeId(ExcludedAttributeMetadataList[i].ServiceId, ExcludedAttributeMetadataList[i].TemplateNodeId, ExcludedAttributeMetadataList[i].PlaceId);

					// If its not available, create new
					if (obj.length == 0) {
						_oExcludedAttributeMetadata.Create(ExcludedAttributeMetadataList[i], Count);
						Count += 1;
					}
					else {
						_oExcludedAttributeMetadata.DeleteById(obj[0].Id);

						_oExcludedAttributeMetadata.Create(ExcludedAttributeMetadataList[i], Count);
						Count += 1;
					}

				}

				OneViewConsole.Debug("InsertTemplateConfig end", "ProfileDownloadBO.InsertTemplateConfig");
				return true;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("BO", "ProfileDownloadBO.InsertTemplateConfig", Excep);
			}
		}
	}

	// Master normalizer
	function MasterNormalizer() {

		// MasterNormalizer object
		var MyInstance = this;


		/// <summary>
		/// DTO to master entity conversion
		/// </summary>
		/// <param name="Entityobj">Entity object (Mobile entity object)</param>
		/// <param name="MasterDataJsonobj">Master data object (DTO from server)</param>
		/// <returns>Master entity object (Mobile entity format)</returns>
		this.Normalize = function (Entityobj, MasterDataJsonobj) {
			try {
				OneViewConsole.Debug("Normalize start", "MasterNormalizer.Normalize");

				Entityobj.OVGuid = MasterDataJsonobj.OVGuid;
				Entityobj.ServerId = MasterDataJsonobj.ServerId;
				Entityobj.MobileVersionId = 1;

				if (Entityobj.constructor.name == _TableNamesEnum.ServiceMasterEntity || Entityobj.constructor.name == _TableNamesEnum.MasterdataRegistry) {
					Entityobj.OSGuid = MasterDataJsonobj.OSGuid;
				}

				if (Entityobj.constructor.name != _TableNamesEnum.ServiceMasterEntity) {
					Entityobj.OMGuid = MasterDataJsonobj.OMGuid;
				}

				if (Entityobj.constructor.name != _TableNamesEnum.MasterdataRegistry) {
					Entityobj.Name = MasterDataJsonobj.Name;
					Entityobj.Type = MasterDataJsonobj.Type;
				}

				if (Entityobj.constructor.name != _TableNamesEnum.MasterdataRegistry
					&& Entityobj.constructor.name != _TableNamesEnum.BandMasterEntity
					&& Entityobj.constructor.name != _TableNamesEnum.BandDetailsMasterEntity
					&& Entityobj.constructor.name != _TableNamesEnum.BusinessCalendarEntity
					&& Entityobj.constructor.name != _TableNamesEnum.PeriodTypeEntity
					&& Entityobj.constructor.name != _TableNamesEnum.PeriodEntity
					) {
					Entityobj.Column1 = MasterDataJsonobj.Column1;
					Entityobj.Column2 = MasterDataJsonobj.Column2;
					Entityobj.Column3 = MasterDataJsonobj.Column3;
					Entityobj.Column4 = MasterDataJsonobj.Column4;
					Entityobj.Column5 = MasterDataJsonobj.Column5;
				}
				else if (Entityobj.constructor.name == _TableNamesEnum.MasterdataRegistry){
					Entityobj.EntityName = MasterDataJsonobj.EntityName;
				}

				if (Entityobj.constructor.name == _TableNamesEnum.OrganizationGroupMasterEntity) {
					Entityobj.OrganizationGroupTypeId = MasterDataJsonobj.OrganizationGroupTypeId;
				}

				if (Entityobj.constructor.name == _TableNamesEnum.IncidentMasterEntity || Entityobj.constructor.name == _TableNamesEnum.IncidentType || Entityobj.constructor.name == _TableNamesEnum.RiskMasterEntity) {
					Entityobj.DiplayIndex = MasterDataJsonobj.DiplayIndex;
					Entityobj.ColourCode = MasterDataJsonobj.OSGuid;
					Entityobj.Code = MasterDataJsonobj.Code;
					Entityobj.OrganizationId = MasterDataJsonobj.OrganizationId;
					Entityobj.Description = MasterDataJsonobj.Description;
				}

				if (Entityobj.constructor.name == _TableNamesEnum.IncidentMasterEntity) {
					Entityobj.IncidentTypeId = MasterDataJsonobj.IncidentTypeId;
				}

				if (Entityobj.constructor.name == _TableNamesEnum.RcoMasterEntity) {
					//alert(JSON.stringify(MasterDataJsonobj));
					Entityobj.RcoTypeId = MasterDataJsonobj.RcoTypeId;
					Entityobj.Description = MasterDataJsonobj.Description;
					Entityobj.Code = MasterDataJsonobj.Code;
					Entityobj.Pin = MasterDataJsonobj.Pin;

					Entityobj.Column6 = MasterDataJsonobj.Column6;
					Entityobj.Column7 = MasterDataJsonobj.Column7;
					Entityobj.Column8 = MasterDataJsonobj.Column8;
					Entityobj.Column9 = MasterDataJsonobj.Column9;
					Entityobj.Column10 = MasterDataJsonobj.Column10;

					Entityobj.IntColumn1 = MasterDataJsonobj.IntColumn1;
					Entityobj.IntColumn2 = MasterDataJsonobj.IntColumn2;
					Entityobj.IntColumn3 = MasterDataJsonobj.IntColumn3;
					Entityobj.IntColumn4 = MasterDataJsonobj.IntColumn4;
					Entityobj.IntColumn5 = MasterDataJsonobj.IntColumn5;

					Entityobj.DateTimeColumn1 = MasterDataJsonobj.DateTimeColumn1;
					Entityobj.DateTimeColumn2 = MasterDataJsonobj.DateTimeColumn2;
					Entityobj.DateTimeColumn3 = MasterDataJsonobj.DateTimeColumn3;
					Entityobj.DateTimeColumn4 = MasterDataJsonobj.DateTimeColumn4;
					Entityobj.DateTimeColumn5 = MasterDataJsonobj.DateTimeColumn5;

					Entityobj.CreatedDate = MasterDataJsonobj.CreatedDate;
				}

				if (Entityobj.constructor.name == _TableNamesEnum.AttributeGroupMasterEntity) {
					Entityobj.AttributeGroupTypeId = MasterDataJsonobj.AttributeGroupTypeId;
					Entityobj.Pin = MasterDataJsonobj.Pin;
				}

				if (Entityobj.constructor.name == _TableNamesEnum.Label) {
					Entityobj.LabelTypeId = MasterDataJsonobj.LabelTypeId;
				}

				if (Entityobj.constructor.name == _TableNamesEnum.UserMasterEntity) {
					Entityobj.MiddleName = MasterDataJsonobj.MiddleName;
					Entityobj.LastName = MasterDataJsonobj.LastName;
					Entityobj.Email = MasterDataJsonobj.Email;
					Entityobj.LandlineNo = MasterDataJsonobj.LandlineNo;
					Entityobj.MobileNo = MasterDataJsonobj.MobileNo;
					Entityobj.UserName = MasterDataJsonobj.UserName;
					Entityobj.Password = MasterDataJsonobj.Password;
					Entityobj.OrganizationMasterId = MasterDataJsonobj.OrganizationMasterId;
					Entityobj.Pin = MasterDataJsonobj.Pin;
				}

				if (Entityobj.constructor.name == _TableNamesEnum.ShiftMasterEntity) {
					Entityobj.ServiceId = MasterDataJsonobj.ServiceId;
					Entityobj.StartDate = MasterDataJsonobj.StartDate;
					Entityobj.EndDate = MasterDataJsonobj.EndDate;
					Entityobj.ColorCode = MasterDataJsonobj.ColorCode;
					Entityobj.Icon = MasterDataJsonobj.Icon;
				}

				if (Entityobj.constructor.name == _TableNamesEnum.ShiftDetailsMasterEntity) {
					Entityobj.StartTime = MasterDataJsonobj.StartTime;
					Entityobj.EndTime = MasterDataJsonobj.EndTime;
					Entityobj.ColorCode = MasterDataJsonobj.ColorCode;
					Entityobj.Icon = MasterDataJsonobj.Icon;
					Entityobj.ShiftMasterId = MasterDataJsonobj.ShiftMasterId;
				}

				if (Entityobj.constructor.name == _TableNamesEnum.BandMasterEntity) {
					Entityobj.Code = MasterDataJsonobj.Code;
				}
				if (Entityobj.constructor.name == _TableNamesEnum.BandDetailsMasterEntity) {
					Entityobj.Code = MasterDataJsonobj.Code;
					Entityobj.Value = MasterDataJsonobj.Value;
					Entityobj.Sequence = MasterDataJsonobj.Sequence;
					Entityobj.ColourCode = MasterDataJsonobj.ColourCode;
					Entityobj.BandMasterId = MasterDataJsonobj.BandMasterId;
					Entityobj.IsCorrectSelection = MasterDataJsonobj.IsCorrectSelection;
				}

				if (Entityobj.constructor.name == _TableNamesEnum.BusinessCalendarEntity) {
					Entityobj.ServiceId = MasterDataJsonobj.ServiceId;
					Entityobj.Description = MasterDataJsonobj.Description;
					Entityobj.StartDate = MasterDataJsonobj.StartDate;
					Entityobj.EndDate = MasterDataJsonobj.EndDate;
					Entityobj.IsDisable = false;
				}
				if (Entityobj.constructor.name == _TableNamesEnum.PeriodTypeEntity) {
					Entityobj.ServiceId = MasterDataJsonobj.ServiceId;
					Entityobj.Description = MasterDataJsonobj.Description;
					Entityobj.IsDisable = false;
				}
				if (Entityobj.constructor.name == _TableNamesEnum.PeriodEntity) {
					Entityobj.ServiceId = MasterDataJsonobj.ServiceId;
					Entityobj.BusinessCalendarServerId = MasterDataJsonobj.BusinessCalendarServerId;
					Entityobj.PeriodTypeServerId = MasterDataJsonobj.PeriodTypeServerId;
					Entityobj.Description = MasterDataJsonobj.Description;
					Entityobj.StartDate = MasterDataJsonobj.StartDate;
					Entityobj.EndDate = MasterDataJsonobj.EndDate;
					Entityobj.IsDisable = false;
				}

				if (Entityobj.constructor.name != _TableNamesEnum.RcoType &&
					Entityobj.constructor.name != _TableNamesEnum.MasterdataRegistry &&
					Entityobj.constructor.name != _TableNamesEnum.AnonymousUserMasterEntity &&
					Entityobj.constructor.name != _TableNamesEnum.PredefinedActionMasterEntity &&
					Entityobj.constructor.name != _TableNamesEnum.BusinessCalendarEntity &&
					Entityobj.constructor.name != _TableNamesEnum.PeriodTypeEntity &&
					Entityobj.constructor.name != _TableNamesEnum.PeriodEntity) {
					Entityobj.ImageIcon = MasterDataJsonobj.ImageIcon;
					Entityobj.FontIconId = MasterDataJsonobj.FontIconId;
				}
				if (Entityobj.constructor.name == _TableNamesEnum.OrganizationMasterEntity ||
					Entityobj.constructor.name == _TableNamesEnum.UserMasterEntity ||
					Entityobj.constructor.name == _TableNamesEnum.RcoMasterEntity) {
					Entityobj.Latitude = MasterDataJsonobj.Latitude;
					Entityobj.Longitude = MasterDataJsonobj.Longitude;
				}

				OneViewConsole.Debug("Normalize end", "MasterNormalizer.Normalize");

				return Entityobj;

			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Normalizer", "MasterNormalizer.Normalize", Excep);
			}
		}


		/// <summary>
		/// DTO list to master entity list conversion
		/// </summary>
		/// <param name="EntityName">Entity name</param>
		/// <param name="MasterEntitylst">Master entity list (DTO from server)</param>
		/// <returns>Master entity list (Mobile entity format)</returns>
		this.NormalizeList = function (EntityName, MasterEntitylst) {
			try {
				OneViewConsole.Debug("NormalizeList start", "MasterNormalizer.NormalizeList");

				var MasterEntityList = new Array();
				for (var i = 0; i < MasterEntitylst.length; i++) {

					var Entityobj = new window[EntityName]();
					var MasterEntityobj = MyInstance.Normalize(Entityobj, MasterEntitylst[i]);
					MasterEntityList[i] = MasterEntityobj;
				}

				OneViewConsole.Debug("NormalizeList end", "MasterNormalizer.NormalizeList");

				return MasterEntityList;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Normalizer", "MasterNormalizer.NormalizeList", Excep);
			}
		}
	}

	// Node normalizer
	function NodeNormalizer() {

		// NodeNormalizer object
		var MyInstance = this;


		/// <summary>
		/// DTO to node conversion
		/// </summary>
		/// <param name="Nodeobj">Node object (Mobile entity object)</param>
		/// <param name="NodeJsonobj">Node data object (DTO from server)</param>
		/// <returns>Node object (Mobile entity format)</returns>
		this.Normalize = function (Nodeobj, NodeJsonobj) {
			try {
				OneViewConsole.Debug("Normalize start", "MasterNormalizer.Normalize");

				Nodeobj.ServerId = NodeJsonobj.ServerId;
				Nodeobj.MobileVersionId = 1;

				Nodeobj.OSGuid = NodeJsonobj.OSGuid;
				Nodeobj.OVGuid = NodeJsonobj.OVGuid;

				Nodeobj.Code = NodeJsonobj.Code;

				// TODO : Need to change 'TypeEnum' to 'Type'(Once its comming from server)
				Nodeobj.Type = NodeJsonobj.Type;

				Nodeobj.Left = NodeJsonobj.Left;
				Nodeobj.Right = NodeJsonobj.Right;

				Nodeobj.ParentNodeId = NodeJsonobj.ParentNodeId;
				Nodeobj.ParentNodeClientGuid = NodeJsonobj.ParentNodeClientGuid;

				Nodeobj.ChildDbElementId = NodeJsonobj.ChildDbElementId;
				Nodeobj.ChildDbElementName = NodeJsonobj.ChildDbElementName;
				Nodeobj.ChildDbElementCode = NodeJsonobj.ChildDbElementCode;
				Nodeobj.ChildDbElementType = NodeJsonobj.ChildDbElementType;

				Nodeobj.ParentDbElementId = NodeJsonobj.ParentDbElementId;
				Nodeobj.ParentDbElementCode = NodeJsonobj.ParentDbElementCode;
				Nodeobj.ParentDbElementType = NodeJsonobj.ParentDbElementType;

				if (Nodeobj.constructor.name == _TableNamesEnum.OrganizationAssetsNode) {
					Nodeobj.LabelId1 = NodeJsonobj.LabelId1;
					Nodeobj.LabelId2 = NodeJsonobj.LabelId2;
					Nodeobj.LabelId3 = NodeJsonobj.LabelId3;
					Nodeobj.LabelId4 = NodeJsonobj.LabelId4;
					Nodeobj.LabelId5 = NodeJsonobj.LabelId5;
				}

				//Nodeobj.SequenceId = NodeJsonobj.SequenceId;

				// TODO : Need to change (Once its comming from server)
				Nodeobj.SequenceId = 0;

				OneViewConsole.Debug("Normalize end", "MasterNormalizer.Normalize");

				return Nodeobj;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Normalizer", "NodeNormalizer.Normalize", Excep);
			}
		}


		/// <summary>
		/// DTO list to node list conversion
		/// </summary>
		/// <param name="NodeName">Node name</param>
		/// <param name="MasterNodelst">Master node list (DTO from server)</param>
		/// <returns>Node list (Mobile entity format)</returns>
		this.NormalizeList = function (NodeName, MasterNodelst) {
			try {
				OneViewConsole.Debug("NormalizeList start", "MasterNormalizer.NormalizeList");

				var NodesList = new Array();
				for (var i = 0; i < MasterNodelst.length; i++) {

					var Nodeobj = new window[NodeName]();
					var MasterNodesobj = MyInstance.Normalize(Nodeobj, MasterNodelst[i]);
					NodesList[i] = MasterNodesobj;
				}

				OneViewConsole.Debug("NormalizeList end", "MasterNormalizer.NormalizeList");

				return NodesList;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Normalizer", "NodeNormalizer.NormalizeList", Excep);
			}
		}
	}

	// OrganizationAssetsNodeRCOSpecialMappingNormalizer
	function OrganizationAssetsNodeRCOSpecialMappingNormalizer() {

		// NodeNormalizer object
		var MyInstance = this;


		/// <summary>
		/// DTO to node conversion
		/// </summary>
		/// <param name="Nodeobj">Node object (Mobile entity object)</param>
		/// <param name="NodeJsonobj">Node data object (DTO from server)</param>
		/// <returns>Node object (Mobile entity format)</returns>
		this.Normalize = function (Nodeobj, NodeJsonobj) {
			try {
				OneViewConsole.Debug("Normalize start", "OrganizationAssetsNodeRCOSpecialMappingNormalizer.Normalize");

				Nodeobj.ServerId = NodeJsonobj.ServerId;
				Nodeobj.MobileVersionId = 1;
				Nodeobj.CreatedDate = NodeJsonobj.CreatedDate;

				Nodeobj.OSGuid = NodeJsonobj.OSGuid;
				Nodeobj.OVGuid = NodeJsonobj.OVGuid;

				Nodeobj.Code = NodeJsonobj.Code;

				// TODO : Need to change 'TypeEnum' to 'Type'(Once its comming from server)
				Nodeobj.Type = NodeJsonobj.Type;

				Nodeobj.OrganizationAssetsNodeId = NodeJsonobj.OrganizationAssetsNodeId;
				Nodeobj.RCOMasterId = NodeJsonobj.RCOMasterId;
				Nodeobj.RCOTypeId = NodeJsonobj.RCOTypeId;

				Nodeobj.IsSynchronized = 'true';

				OneViewConsole.Debug("Normalize end", "OrganizationAssetsNodeRCOSpecialMappingNormalizer.Normalize");

				return Nodeobj;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Normalizer", "OrganizationAssetsNodeRCOSpecialMappingNormalizer.Normalize", Excep);
			}
		}


		/// <summary>
		/// DTO list to node list conversion
		/// </summary>
		/// <param name="NodeName">Node name</param>
		/// <param name="MasterNodelst">Master node list (DTO from server)</param>
		/// <returns>Node list (Mobile entity format)</returns>
		this.NormalizeList = function (NodeName, MasterNodelst) {
			try {
				OneViewConsole.Debug("NormalizeList start", "OrganizationAssetsNodeRCOSpecialMappingNormalizer.NormalizeList");

				var NodesList = new Array();
				for (var i = 0; i < MasterNodelst.length; i++) {

					var Nodeobj = new window[NodeName]();
					var MasterNodesobj = MyInstance.Normalize(Nodeobj, MasterNodelst[i]);
					NodesList[i] = MasterNodesobj;
				}

				OneViewConsole.Debug("NormalizeList end", "OrganizationAssetsNodeRCOSpecialMappingNormalizer.NormalizeList");

				return NodesList;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Normalizer", "OrganizationAssetsNodeRCOSpecialMappingNormalizer.NormalizeList", Excep);
			}
		}
	}

	// DataCapture normalizer
	function DataCaptureNormalizer() {

		// DcNormalizer object
		var MyInstance = this;


		/// <summary>
		/// DTO to Dc conversion
		/// </summary>
		/// <param name="Dcobj">Dc dto (DTO from server)</param>
		/// <returns>Dc entity (Mobile entity format)</returns>
		this.Normalize = function (Dcobj, IsForHistory) {
			try {
				OneViewConsole.Debug("Normalize start", "DataCaptureNormalizer.Normalize");

				var _oDataCaptureEntity = new DataCaptureEntity();

				_oDataCaptureEntity.ServerId = Dcobj.ServerId;

				_oDataCaptureEntity.ClientGuid = Dcobj.ClientGuid;
				_oDataCaptureEntity.ClientDocId = (Dcobj.ClientDocId != undefined && Dcobj.ClientDocId != null) ? Dcobj.ClientDocId : "";
				_oDataCaptureEntity.OVGuid = Dcobj.OVGuid;

				_oDataCaptureEntity.ServiceId = Dcobj.ServiceId;
				_oDataCaptureEntity.ServiceName = Dcobj.ServiceName;

				_oDataCaptureEntity.TemplateNodeId = Dcobj.TemplateNodeId;
				_oDataCaptureEntity.TemplateNodeName = Dcobj.TemplateNodeName;
				_oDataCaptureEntity.DcProfileId = Dcobj.DcProfileId;

				_oDataCaptureEntity.DcPlaceDimension = Dcobj.DcPlaceDimension;
				_oDataCaptureEntity.DcPlaceId = Dcobj.DcPlaceId;
				_oDataCaptureEntity.DcPlaceName = Dcobj.DcPlaceName;

				_oDataCaptureEntity.IsCompleted = Dcobj.IsCompleted;
				// _oDataCaptureEntity.IsSynchronized = Dcobj.IsSynchronized;
				_oDataCaptureEntity.IsSynchronized = 'true';

				_oDataCaptureEntity.IsSubmit = Dcobj.IsSubmit;
				_oDataCaptureEntity.SubmitDate = Dcobj.SubmitDate;
				_oDataCaptureEntity.ApprovalStatus = (Dcobj.ApprovalStatus != undefined && Dcobj.ApprovalStatus != null) ? Dcobj.ApprovalStatus : oDCApprovalStatusEnum.NONE;
				_oDataCaptureEntity.ApprovalStatusDate = (Dcobj.ApprovalStatusDate != undefined && Dcobj.ApprovalStatusDate != null) ? Dcobj.ApprovalStatusDate : "";

				_oDataCaptureEntity.IsDynamicDCPlace = Dcobj.IsDynamicDCPlace;
				_oDataCaptureEntity.IsDynamicAttribute = Dcobj.IsDynamicAttribute;
				_oDataCaptureEntity.IsDynamicAnswer = Dcobj.IsDynamicAnswer;

				//IsANYNC=true => Dc contains some non-conformance info.
				_oDataCaptureEntity.IsAnyNC = Dcobj.IsAnyNC;

				_oDataCaptureEntity.IsAnyObservation = Dcobj.IsAnyObservation;

				//IsAnyAction=true => Dc contains some action(Action which are not related NC) info.
				_oDataCaptureEntity.IsAnyAction = Dcobj.IsAnyAction;

				//IsForAction=true => Dc created for(EX : BOut NC Form) action.
				_oDataCaptureEntity.IsForAction = Dcobj.IsForAction;

				//IsForHistory=true => Dc downloaded for history (Most common value finding).
				_oDataCaptureEntity.IsForHistory = (Dcobj.IsForHistory != undefined) ? Dcobj.IsForHistory : "false";
				//_oDataCaptureEntity.IsForHistory = Dcobj.IsForHistory;

				_oDataCaptureEntity.IsForDCBlocker = Dcobj.IsForDCBlocker;
				_oDataCaptureEntity.IsAnyDCBlocker = Dcobj.IsAnyDCBlocker;
				_oDataCaptureEntity.IsBlocker = Dcobj.IsBlocker;

				_oDataCaptureEntity.DcStartDate = Dcobj.DcStartDate;
				_oDataCaptureEntity.CreatedDate = Dcobj.CreatedDate;
				_oDataCaptureEntity.LastsyncDate = Dcobj.LastsyncDate;
				_oDataCaptureEntity.TimeStamp = Dcobj.TimeStamp;

				_oDataCaptureEntity.Score = (Dcobj.Score != undefined) ? Dcobj.Score : 0;
				_oDataCaptureEntity.MaxScore = (Dcobj.MaxScore != undefined) ? Dcobj.MaxScore : 0;
				_oDataCaptureEntity.Percentage = (Dcobj.Percentage != undefined) ? Dcobj.Percentage : 0;
				_oDataCaptureEntity.CompletedChildCount = (Dcobj.CompletedChildCount != undefined) ? Dcobj.CompletedChildCount : 0;
				_oDataCaptureEntity.TotalChildCount = (Dcobj.TotalChildCount != undefined) ? Dcobj.TotalChildCount : 0;
				_oDataCaptureEntity.CompletedAttributeCount = (Dcobj.CompletedAttributeCount != undefined) ? Dcobj.CompletedAttributeCount : 0;
				_oDataCaptureEntity.TotalAttributeCount = (Dcobj.TotalAttributeCount != undefined) ? Dcobj.TotalAttributeCount : 0;

				_oDataCaptureEntity.IsMultiMediaAttached = (Dcobj.IsMultiMediaAttached != undefined) ? Dcobj.IsMultiMediaAttached : "false";

				_oDataCaptureEntity.ESTTime = (Dcobj.ESTTime != undefined) ? Dcobj.ESTTime : 0;
				_oDataCaptureEntity.ActualTime = (Dcobj.ActualTime != undefined) ? Dcobj.ActualTime : 0;

				_oDataCaptureEntity.ServerValidationStatus = (Dcobj.ServerValidationStatus != undefined) ? Dcobj.ServerValidationStatus : 0;
				_oDataCaptureEntity.ServerValidationCode = Dcobj.ServerValidationCode;
				_oDataCaptureEntity.ServerValidationMessage = Dcobj.ServerValidationMessage;
				_oDataCaptureEntity.ServerValidationDate = Dcobj.ServerValidationDate;

				_oDataCaptureEntity.DcTime = Dcobj.DcTime;
				_oDataCaptureEntity.DcTimeLogs = Dcobj.DcTimeLogs;

				_oDataCaptureEntity.Latitude = (Dcobj.Latitude != undefined) ? Dcobj.Latitude : "";
				_oDataCaptureEntity.Longitude = (Dcobj.Longitude != undefined) ? Dcobj.Longitude : "";
				_oDataCaptureEntity.IsOnDeviceApprovalFinished = (Dcobj.IsOnDeviceApprovalFinished != undefined) ? Dcobj.IsOnDeviceApprovalFinished : "false";

				var DcResults = Dcobj.DcResultsEntitylist;

				for (var j = 0; j < DcResults.length; j++) {

					var _oDcResultsEntity = new DcResultsEntity();

					_oDcResultsEntity.ServerId = DcResults[j].ServerId;

					_oDcResultsEntity.ClientGuid = DcResults[j].ClientGuid;
					_oDcResultsEntity.OVGuid = DcResults[j].OVGuid;

					_oDcResultsEntity.DataCaptureId = DcResults[j].DataCaptureId;
					_oDcResultsEntity.ServiceId = DcResults[j].ServiceId;

					_oDcResultsEntity.SystemUserId = DcResults[j].SystemUserId;
					_oDcResultsEntity.AnonymousUserId = DcResults[j].AnonymousUserId;
					_oDcResultsEntity.UserName = DcResults[j].UserName;

					_oDcResultsEntity.ShiftId = DcResults[j].ShiftId;
					_oDcResultsEntity.ShiftName = DcResults[j].ShiftName;

					_oDcResultsEntity.IsSynchronized = 'true';

					_oDcResultsEntity.StartDate = DcResults[j].StartDate;
					_oDcResultsEntity.LastSyncDate = DcResults[j].LastSyncDate;
					_oDcResultsEntity.TotalTimeForDc = DcResults[j].TotalTimeForDc;

					_oDcResultsEntity.IsSubmit = DcResults[j].IsSubmit;
					_oDcResultsEntity.SubmitDate = DcResults[j].SubmitDate;
					_oDcResultsEntity.SubmitedUserId = DcResults[j].SubmitedUserId;
					_oDcResultsEntity.SubmitedAnonymousUserId = DcResults[j].SubmitedAnonymousUserId;

					_oDcResultsEntity.ApprovalStatus = (DcResults[j].ApprovalStatus != undefined && DcResults[j].ApprovalStatus != null) ? DcResults[j].ApprovalStatus : oDCApprovalStatusEnum.NONE;
					_oDcResultsEntity.ApprovalStatusDate = (DcResults[j].ApprovalStatusDate != undefined && DcResults[j].ApprovalStatusDate != null) ? DcResults[j].ApprovalStatusDate : "";

					_oDcResultsEntity.IsDynamicAttribute = DcResults[j].IsDynamicAttribute;
					_oDcResultsEntity.IsDynamicAnswer = DcResults[j].IsDynamicAnswer;
					_oDcResultsEntity.Comments = (DcResults[j].Comments != undefined) ? DcResults[j].Comments : "";

					_oDcResultsEntity.LastUpdatedDate = (DcResults[j].TimeStamp != undefined && DcResults[j].TimeStamp != "") ? DcResults[j].TimeStamp : DcResults[j].CreatedDate;

					_oDcResultsEntity.Score = (DcResults[j].Score != undefined) ? DcResults[j].Score : 0;
					_oDcResultsEntity.MaxScore = (DcResults[j].MaxScore != undefined) ? DcResults[j].MaxScore : 0;
					_oDcResultsEntity.Percentage = (DcResults[j].Percentage != undefined) ? DcResults[j].Percentage : 0;
					_oDcResultsEntity.CompletedChildCount = (DcResults[j].CompletedChildCount != undefined) ? DcResults[j].CompletedChildCount : 0;
					_oDcResultsEntity.TotalChildCount = (DcResults[j].TotalChildCount != undefined) ? DcResults[j].TotalChildCount : 0;
					_oDcResultsEntity.CompletedAttributeCount = (DcResults[j].CompletedAttributeCount != undefined) ? DcResults[j].CompletedAttributeCount : 0;
					_oDcResultsEntity.TotalAttributeCount = (DcResults[j].TotalAttributeCount != undefined) ? DcResults[j].TotalAttributeCount : 0;

					_oDcResultsEntity.IsMultiMediaAttached = (DcResults[j].IsMultiMediaAttached != undefined) ? DcResults[j].IsMultiMediaAttached : "false";

					_oDcResultsEntity.ActualTime = (DcResults[j].ActualTime != undefined) ? DcResults[j].ActualTime : 0;

					_oDcResultsEntity.Latitude = (DcResults[j].Latitude != undefined) ? DcResults[j].Latitude : "";
					_oDcResultsEntity.Longitude = (DcResults[j].Longitude != undefined) ? DcResults[j].Longitude : "";

					_oDcResultsEntity.DcTime = DcResults[j].DcTime;

					_oDcResultsEntity.CreatedDate = DcResults[j].CreatedDate;

					_oDataCaptureEntity.DcResultsEntitylist[j] = _oDcResultsEntity;

					var DcResultDetails = DcResults[j].DcResultDetailsEntityList;

					for (var k = 0; k < DcResultDetails.length; k++) {

						var _oDcResultDetailsEntity = new DcResultDetailsEntity();

						_oDcResultDetailsEntity.ServerId = DcResultDetails[k].ServerId;

						_oDcResultDetailsEntity.ClientGuid = DcResultDetails[k].ClientGuid;
						_oDcResultDetailsEntity.ServiceId = DcResultDetails[k].ServiceId;

						_oDcResultDetailsEntity.OVGuid = DcResultDetails[k].OVGuid;

						_oDcResultDetailsEntity.DataCaptureId = DcResultDetails[k].DataCaptureId;
						_oDcResultDetailsEntity.DataResultsId = DcResultDetails[k].DataResultsId;

						_oDcResultDetailsEntity.StartDate = DcResultDetails[k].StartDate;
						_oDcResultDetailsEntity.LastSyncDate = DcResultDetails[k].LastSyncDate;
						_oDcResultDetailsEntity.IsSynchronized = "true";
						_oDcResultDetailsEntity.ControlId = DcResultDetails[k].ControlId;

						_oDcResultDetailsEntity.AttributeNodeId = DcResultDetails[k].AttributeNodeId;
						_oDcResultDetailsEntity.AttributeNodeName = DcResultDetails[k].AttributeNodeName;

						_oDcResultDetailsEntity.Answer = DcResultDetails[k].Answer;
						_oDcResultDetailsEntity.AnswerValue = DcResultDetails[k].AnswerValue;

						_oDcResultDetailsEntity.AnswerFKType = DcResultDetails[k].AnswerFKType;
						_oDcResultDetailsEntity.AnswerMode = DcResultDetails[k].AnswerMode;
						_oDcResultDetailsEntity.AnswerDataType = DcResultDetails[k].AnswerDataType;

						_oDcResultDetailsEntity.IsDynamicAttribute = DcResultDetails[k].IsDynamicAttribute;
						_oDcResultDetailsEntity.IsDynamicAnswer = DcResultDetails[k].IsDynamicAnswer;

						_oDcResultDetailsEntity.IndexId = DcResultDetails[k].IndexId;
						_oDcResultDetailsEntity.IsManual = DcResultDetails[k].IsManual;
						_oDcResultDetailsEntity.Comments = DcResultDetails[k].Comments;
						_oDcResultDetailsEntity.IsNA = (DcResultDetails[k].IsNA != undefined) ? DcResultDetails[k].IsNA : false;
						_oDcResultDetailsEntity.IsBlocker = (DcResultDetails[k].IsBlocker != undefined) ? DcResultDetails[k].IsBlocker : false;

						_oDcResultDetailsEntity.Score = (DcResultDetails[k].Score != undefined) ? DcResultDetails[k].Score : 0;
						_oDcResultDetailsEntity.MaxScore = (DcResultDetails[k].MaxScore != undefined) ? DcResultDetails[k].MaxScore : 0;
						_oDcResultDetailsEntity.Percentage = (DcResultDetails[k].Percentage != undefined) ? DcResultDetails[k].Percentage : 0;
						_oDcResultDetailsEntity.CompletedChildCount = (DcResultDetails[k].CompletedChildCount != undefined) ? DcResultDetails[k].CompletedChildCount : 0;
						_oDcResultDetailsEntity.TotalChildCount = (DcResultDetails[k].TotalChildCount != undefined) ? DcResultDetails[k].TotalChildCount : 0;
						_oDcResultDetailsEntity.CompletedAttributeCount = (DcResultDetails[k].CompletedAttributeCount != undefined) ? DcResultDetails[k].CompletedAttributeCount : 0;
						_oDcResultDetailsEntity.TotalAttributeCount = (DcResultDetails[k].TotalAttributeCount != undefined) ? DcResultDetails[k].TotalAttributeCount : 0;

						_oDcResultDetailsEntity.IsMultiMediaAttached = (DcResultDetails[k].IsMultiMediaAttached != undefined) ? DcResultDetails[k].IsMultiMediaAttached : "false";

						_oDcResultDetailsEntity.ESTTime = (DcResultDetails[k].ESTTime != undefined) ? DcResultDetails[k].ESTTime : 0;
						_oDcResultDetailsEntity.ActualTime = (DcResultDetails[k].ActualTime != undefined) ? DcResultDetails[k].ActualTime : 0;
						_oDcResultDetailsEntity.IsManualESTEnabled = (DcResultDetails[k].IsManualESTEnabled != undefined) ? DcResultDetails[k].IsManualESTEnabled : 0;

						_oDcResultDetailsEntity.AutomaticDeviceId = DcResultDetails[k].AutomaticDeviceId;

						_oDcResultDetailsEntity.Latitude = (DcResultDetails[k].Latitude != undefined) ? DcResultDetails[k].Latitude : "";
						_oDcResultDetailsEntity.Longitude = (DcResultDetails[k].Longitude != undefined) ? DcResultDetails[k].Longitude : "";

						_oDcResultDetailsEntity.IsDisable = (DcResultDetails[k].IsDisable != undefined) ? DcResultDetails[k].IsDisable : "";

						_oDcResultDetailsEntity.CreatedDate = DcResultDetails[k].CreatedDate;
						_oDcResultDetailsEntity.LastUpdatedDate = DcResultDetails[k].LastUpdatedDate;

						_oDcResultDetailsEntity.IsMulti = DcResultDetails[k].IsMulti;

						_oDataCaptureEntity.DcResultsEntitylist[j].DcResultDetailsEntityList[k] = _oDcResultDetailsEntity;
					}
				}

				OneViewConsole.Debug("Normalize end", "DataCaptureNormalizer.Normalize");

				return _oDataCaptureEntity;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Normalizer", "DataCaptureNormalizer.Normalize", Excep);
			}
		}


		/// <summary>
		/// DTO list to Dc list conversion
		/// </summary>
		/// <param name="Dclst">Dc dto list (DTO from server)</param>
		/// <returns>Dc entity list (Mobile entity format)</returns>
		this.NormalizeList = function (Dclst, IsForHistory) {
			try {
				OneViewConsole.Debug("NormalizeList start", "DataCaptureNormalizer.NormalizeList");

				var DcEntityLst = new Array();

				for (var i = 0; i < Dclst.length; i++) {

					DcEntityLst[i] = MyInstance.Normalize(Dclst[i], IsForHistory);
				}

				OneViewConsole.Debug("NormalizeList end", "DataCaptureNormalizer.NormalizeList");

				return DcEntityLst;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Normalizer", "DataCaptureNormalizer.NormalizeList", Excep);
			}
		}
	}

	// DcProfile normalizer
	function DcProfileNormalizer() {

		// DcProfileNormalizer object
		var MyInstance = this;


		/// <summary>
		/// DTO to Dc profile conversion
		/// </summary>
		/// <param name="DcProfileObj">Dc profile dto (DTO from server)</param>
		/// <returns>Dc profile entity (Mobile entity format)</returns>
		this.Normalize = function (DcProfileObj) {
			try {
				OneViewConsole.Debug("Normalize start", "DcProfileNormalizer.Normalize");

				var _DcProfileEntity = new DcProfileEntity();

				// NEED TO CHANGE ONCE GOPI IS SENDING SERVICE ID
				//_DcProfileEntity.ServiceId = 1;
				_DcProfileEntity.ServiceId = OneViewSessionStorage.Get("ServiceId"); // Need to remove

				_DcProfileEntity.ServerId = DcProfileObj.ServerId;
				_DcProfileEntity.MobileVersionId = 1;
				_DcProfileEntity.OVGuid = DcProfileObj.OVGuid;

				_DcProfileEntity.IsAnonymousDcUser = DcProfileObj.IsAnonymousDcUser;
				_DcProfileEntity.DcUserId = DcProfileObj.DcUserId;
				_DcProfileEntity.UserName = DcProfileObj.UserName;

				_DcProfileEntity.TemplateNodeId = DcProfileObj.TemplateNodeId;
				_DcProfileEntity.TemplateName = DcProfileObj.TemplateName;

				_DcProfileEntity.ScheduleDimension = (DcProfileObj.ScheduleDimension != null) ? DcProfileObj.ScheduleDimension : "";
				_DcProfileEntity.DcPlaceId = DcProfileObj.DcPlaceId;
				_DcProfileEntity.DcPlaceName = DcProfileObj.DcPlaceName;
				_DcProfileEntity.DcPlaceDimension = DcProfileObj.DcPlaceDimension;
				_DcProfileEntity.CustomPlaceName = DcProfileObj.CustomPlaceName;
				_DcProfileEntity.AdvanceDcPlace = (DcProfileObj.AdvanceDcPlace != null) ? DcProfileObj.AdvanceDcPlace : "";

				_DcProfileEntity.DCPlaceNodeHierarchyInfo = (DcProfileObj.DCPlaceNodeHierarchyInfo != undefined && DcProfileObj.DCPlaceNodeHierarchyInfo != null) ? DcProfileObj.DCPlaceNodeHierarchyInfo : "";
				_DcProfileEntity.DCPlaceNodeHierarchyCompleteInfo = (DcProfileObj.DCPlaceNodeHierarchyCompleteInfo != undefined && DcProfileObj.DCPlaceNodeHierarchyCompleteInfo != null) ? JSON.stringify(DcProfileObj.DCPlaceNodeHierarchyCompleteInfo) : "";
				_DcProfileEntity.TemplateNodeHierarchyInfo = (DcProfileObj.TemplateNodeHierarchyInfo != undefined && DcProfileObj.TemplateNodeHierarchyInfo != null) ? DcProfileObj.TemplateNodeHierarchyInfo : "";
				_DcProfileEntity.TemplateNodeHierarchyCompleteInfo = (DcProfileObj.TemplateNodeHierarchyCompleteInfo != undefined && DcProfileObj.TemplateNodeHierarchyCompleteInfo != null) ? JSON.stringify(DcProfileObj.TemplateNodeHierarchyCompleteInfo) : "";
				_DcProfileEntity.OverallDCCount = (DcProfileObj.OverallDCCount != undefined) ? DcProfileObj.OverallDCCount : 0;
				_DcProfileEntity.OverallDCIds = (DcProfileObj.OverallDCIds != undefined && DcProfileObj.OverallDCIds != null) ? DcProfileObj.OverallDCIds : "";
				_DcProfileEntity.InProgressDCCount = (DcProfileObj.InProgressDCCount != undefined) ? DcProfileObj.InProgressDCCount : 0;
				_DcProfileEntity.InProgressDCIds = (DcProfileObj.InProgressDCIds != undefined && DcProfileObj.InProgressDCIds != null) ? DcProfileObj.InProgressDCIds : "";
				_DcProfileEntity.CompletedDCCount = (DcProfileObj.CompletedDCCount != undefined) ? DcProfileObj.CompletedDCCount : 0;
				_DcProfileEntity.CompletedDCIds = (DcProfileObj.CompletedDCIds != undefined && DcProfileObj.CompletedDCIds != null) ? DcProfileObj.CompletedDCIds : "";
				_DcProfileEntity.ApprovedDCCount = (DcProfileObj.ApprovedDCCount != undefined) ? DcProfileObj.ApprovedDCCount : 0;
				_DcProfileEntity.ApprovedDCIds = (DcProfileObj.ApprovedDCIds != undefined && DcProfileObj.ApprovedDCIds != null) ? DcProfileObj.ApprovedDCIds : "";

				for (var j = 0; j < DcProfileObj.DefaultScheduleDTO.length; j++) {

					var _DefaultScheduleEntity = new DefaultScheduleEntity();

					_DefaultScheduleEntity.ServerId = DcProfileObj.DefaultScheduleDTO[j].ServerId;
					_DefaultScheduleEntity.MobileVersionId = 1;
					_DefaultScheduleEntity.OVGuid = DcProfileObj.DefaultScheduleDTO[j].OVGuid;

					_DefaultScheduleEntity.ReccurenceId = (DcProfileObj.DefaultScheduleDTO[j].ReccurenceId != null) ? DcProfileObj.DefaultScheduleDTO[j].ReccurenceId : 0;
					_DefaultScheduleEntity.ReccurenceName = (DcProfileObj.DefaultScheduleDTO[j].ReccurenceName != null) ? DcProfileObj.DefaultScheduleDTO[j].ReccurenceName : "";
					_DefaultScheduleEntity.Occurence = DcProfileObj.DefaultScheduleDTO[j].Occurence;
					_DefaultScheduleEntity.StartDate = (DcProfileObj.DefaultScheduleDTO[j].StartDate != null) ? DcProfileObj.DefaultScheduleDTO[j].StartDate : "";
					_DefaultScheduleEntity.EndDate = DcProfileObj.DefaultScheduleDTO[j].EndDate;

					_DefaultScheduleEntity.ShiftId = DcProfileObj.DefaultScheduleDTO[j].ShiftId;
					_DefaultScheduleEntity.FromTime = DcProfileObj.DefaultScheduleDTO[j].FromTime;
					_DefaultScheduleEntity.ToTime = (DcProfileObj.DefaultScheduleDTO[j].ToTime != null) ? DcProfileObj.DefaultScheduleDTO[j].ToTime : "";

					_DcProfileEntity.DefaultScheduleEntityList[j] = _DefaultScheduleEntity;
				}

				OneViewConsole.Debug("Normalize end", "DcProfileNormalizer.Normalize");

				return _DcProfileEntity;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Normalizer", "DcProfileNormalizer.Normalize", Excep);
			}
		}


		/// <summary>
		/// DTO list to Dc profile list conversion
		/// </summary>
		/// <param name="DcProfilelst">Dc profile list dto (DTO from server)</param>
		/// <returns>Dc profile list entity (Mobile entity format)</returns>
		this.NormalizeList = function (DcProfilelst) {
			try {
				OneViewConsole.Debug("NormalizeList start", "DcProfileNormalizer.NormalizeList");

				var ProfilesList = new Array();

				for (var i = 0; i < DcProfilelst.length; i++) {

					ProfilesList[i] = MyInstance.Normalize(DcProfilelst[i]);
				}

				OneViewConsole.Debug("NormalizeList end", "DcProfileNormalizer.NormalizeList");

				return ProfilesList;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Normalizer", "DcProfileNormalizer.NormalizeList", Excep);
			}
		}
	}

	// AttributeDCHistory normalizer
	function AttributeDCHistoryNormalizer() {

		var _oDateTime = new DateTime();
		var CurrentDateAndTime = _oDateTime.GetDateAndTime();

		/// <summary>
		/// DTO to AttributeDCHistory conversion
		/// </summary>
		/// <param name="AttributeDCHistoryObj">AttributeDCHistory dto (DTO from server)</param>
		/// <returns>AttributeDCHistory entity (Mobile entity format)</returns>
		this.NormalizeList = function (AttributeDCHistoryObj) {

			try {
				OneViewConsole.Debug("Normalize start", "AttributeDCHistoryNormalizer.Normalize");

				var AttributeDCHistoryLst = new Array();

				for (var i = 0; i < AttributeDCHistoryObj.length; i++) {

					var _oAttributeDCHistoryEntity = new AttributeDCHistoryEntity();

					_oAttributeDCHistoryEntity.ServerId = (AttributeDCHistoryObj[i].ServerId != undefined) ? AttributeDCHistoryObj[i].ServerId : "";
					_oAttributeDCHistoryEntity.MobileVersionId = 1;
					_oAttributeDCHistoryEntity.OVGuid = (AttributeDCHistoryObj[i].OVGuid != undefined) ? AttributeDCHistoryObj[i].OVGuid : 0;

					_oAttributeDCHistoryEntity.ServiceId = AttributeDCHistoryObj[i].ServiceId;
					_oAttributeDCHistoryEntity.DcPlaceId = AttributeDCHistoryObj[i].DcPlaceId;
					_oAttributeDCHistoryEntity.DcUserId = AttributeDCHistoryObj[i].DcUserId;
					_oAttributeDCHistoryEntity.TemplateNodeId = AttributeDCHistoryObj[i].TemplateNodeId;

					_oAttributeDCHistoryEntity.CreatedDate = (AttributeDCHistoryObj[i].CreatedDate != undefined) ? AttributeDCHistoryObj[i].CreatedDate : "";
					_oAttributeDCHistoryEntity.LastsyncDate = CurrentDateAndTime;

					for (var j = 0; j < AttributeDCHistoryObj[i].PreviousDCValues.length; j++) {

						var _oPreviousDCValuesEntity = new PreviousDCValuesEntity();

						_oPreviousDCValuesEntity.ServerId = (AttributeDCHistoryObj[i].PreviousDCValues[j].ServerId != undefined) ? AttributeDCHistoryObj[i].PreviousDCValues[j].ServerId : "";
						_oPreviousDCValuesEntity.MobileVersionId = 1;
						_oPreviousDCValuesEntity.OVGuid = (AttributeDCHistoryObj[i].PreviousDCValues[j].OVGuid != undefined) ? AttributeDCHistoryObj[i].PreviousDCValues[j].OVGuid : 0;

						_oPreviousDCValuesEntity.AttributeDCHistoryId = AttributeDCHistoryObj[i].PreviousDCValues[j].AttributeDCHistoryId;
						_oPreviousDCValuesEntity.AttributeId = AttributeDCHistoryObj[i].PreviousDCValues[j].AttributeId;
						_oPreviousDCValuesEntity.AtttibuteDimension = AttributeDCHistoryObj[i].PreviousDCValues[j].AtttibuteDimension;
						_oPreviousDCValuesEntity.ControlId = AttributeDCHistoryObj[i].PreviousDCValues[j].ControlId;

						_oPreviousDCValuesEntity.DcResultDetailsId = AttributeDCHistoryObj[i].PreviousDCValues[j].DcResultDetailsId;
						_oPreviousDCValuesEntity.DCIndex = AttributeDCHistoryObj[i].PreviousDCValues[j].DCIndex;
						_oPreviousDCValuesEntity.DCDate = AttributeDCHistoryObj[i].PreviousDCValues[j].DCDate;

						_oPreviousDCValuesEntity.Answer = AttributeDCHistoryObj[i].PreviousDCValues[j].Answer;
						_oPreviousDCValuesEntity.AnswerValue = AttributeDCHistoryObj[i].PreviousDCValues[j].AnswerValue;

						_oPreviousDCValuesEntity.CreatedDate = (AttributeDCHistoryObj[i].PreviousDCValues[j].CreatedDate != undefined) ? AttributeDCHistoryObj[i].PreviousDCValues[j].CreatedDate : "";
						_oPreviousDCValuesEntity.LastsyncDate = CurrentDateAndTime;

						_oAttributeDCHistoryEntity.PreviousDCValuesEntityList[j] = _oPreviousDCValuesEntity;

						AttributeDCHistoryLst[i] = _oAttributeDCHistoryEntity;
					}
				}

				return AttributeDCHistoryLst;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Normalizer", "AttributeDCHistoryNormalizer.Normalize", Excep);
			}
		}
	}

	// AttributeOtherConfig normalizer
	function AttributeOtherConfigNormalizer() {

		var _oDateTime = new DateTime();
		var CurrentDateAndTime = _oDateTime.GetDateAndTime();

		/// <summary>
		/// DTO to AttributeOtherConfig conversion
		/// </summary>
		/// <param name="AttributeOtherConfigObj">AttributeOtherConfig dto (DTO from server)</param>
		/// <returns>AttributeOtherConfig entity (Mobile entity format)</returns>
		this.Normalize = function (AttributeOtherConfigObj) {

			try {
				OneViewConsole.Debug("Normalize start", "AttributeOtherConfigNormalizer.Normalize");


				var Entityobj = new AttributeOtherConfigEntity();

				Entityobj.ServerId = (AttributeOtherConfigObj.ServerId != undefined) ? AttributeOtherConfigObj.ServerId : "";
				Entityobj.MobileVersionId = 1;
				Entityobj.OVGuid = (AttributeOtherConfigObj.OVGuid != undefined) ? AttributeOtherConfigObj.OVGuid : 0;
				Entityobj.Type = AttributeOtherConfigObj.Type;

				Entityobj.ServiceId = AttributeOtherConfigObj.ServiceId;
				Entityobj.DcPlaceId = AttributeOtherConfigObj.DcPlaceId;
				Entityobj.DcPlaceDimension = AttributeOtherConfigObj.DcPlaceDimension;
				Entityobj.DcUserId = AttributeOtherConfigObj.DcUserId;
				Entityobj.TemplateNodeId = AttributeOtherConfigObj.TemplateNodeId;

				Entityobj.UserWiseLastDC = AttributeOtherConfigObj.UserWiseLastDC;
				Entityobj.DcPlaceWiseLastDC = AttributeOtherConfigObj.DcPlaceWiseLastDC;

				Entityobj.AttributeDefaultValueMetaDataDict = JSON.stringify(AttributeOtherConfigObj.AttributeDefaultValueMetaDataDict);
				Entityobj.HistoryMetaDataDict = JSON.stringify(AttributeOtherConfigObj.HistoryMetaDataDict);
				Entityobj.NAMetaDataDict = JSON.stringify(AttributeOtherConfigObj.NAMetaDataDict);
				Entityobj.MutiMediaSubElementMetaDataDict = JSON.stringify(AttributeOtherConfigObj.MutiMediaSubElementMetaDataDict);
				Entityobj.HelpDocumentMetaDataDict = JSON.stringify(AttributeOtherConfigObj.HelpDocumentMetaDataDict);

				Entityobj.CreatedDate = (AttributeOtherConfigObj.CreatedDate != undefined) ? AttributeOtherConfigObj.CreatedDate : "";
				Entityobj.LastsyncDate = CurrentDateAndTime;

				OneViewConsole.Debug("Normalize end", "AttributeOtherConfigNormalizer.Normalize");

				return Entityobj;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Normalizer", "AttributeOtherConfigNormalizer.Normalize", Excep);
			}
		}
	}

	//ActionNCProfile Normalizer
	function ActionNCProfileNormalizer() {

		var MyInstance = this;

		/// <summary>
		/// DTO to Action-NC profile conversion
		/// </summary>
		/// <param name="ActionNCProfileDTO">Action-NC profile DTO (DTO from server)</param>
		/// <returns>ActionNCProfile (Mobile entity format)</returns>
		this.Normalize = function (ActionNCProfileDTO) {
			try {
				OneViewConsole.Debug("Normalize start", "ActionNCProfileNormalizer.Normalize");

				var _oActionNCProfile = new ActionNCProfileEntity();
				_oActionNCProfile.ServerId = (ActionNCProfileDTO.ServerId != undefined) ? ActionNCProfileDTO.ServerId : "";
				_oActionNCProfile.ServiceId = ActionNCProfileDTO.ServiceId;
				_oActionNCProfile.MobileVersionId = 1;
				_oActionNCProfile.OVGuid = (ActionNCProfileDTO.OVGuid != undefined) ? ActionNCProfileDTO.OVGuid : 0;
				_oActionNCProfile.Type = ActionNCProfileDTO.Type;
				_oActionNCProfile.DcUserId = ActionNCProfileDTO.DcUserId;
				_oActionNCProfile.TemplateNodeId = ActionNCProfileDTO.TemplateNodeId;
				_oActionNCProfile.DcPlaceId = ActionNCProfileDTO.DcPlaceId;
				_oActionNCProfile.DcPlaceDimension = ActionNCProfileDTO.DcPlaceDimension;
				_oActionNCProfile.AdvanceDcPlace = ActionNCProfileDTO.AdvanceDcPlace;

				var AttributeWiseActionNCConfig = '';
				var MultipleAttributeActionNCConfig = '';
				var TemplateWiseActionNCConfig = '';

				if (ActionNCProfileDTO.AttributeWiseActionNCConfig != null)
					AttributeWiseActionNCConfig = JSON.parse(ActionNCProfileDTO.AttributeWiseActionNCConfig);

				if (ActionNCProfileDTO.MultipleAttributeActionNCConfig != null)
					MultipleAttributeActionNCConfig = JSON.parse(ActionNCProfileDTO.MultipleAttributeActionNCConfig);

				if (ActionNCProfileDTO.AttributeWiseActionNCConfig != null)
					TemplateWiseActionNCConfig = JSON.parse(ActionNCProfileDTO.TemplateWiseActionNCConfig);

				_oActionNCProfile.AttributeWiseActionNCConfigJson =  JSON.stringify(AttributeWiseActionNCConfig);
				_oActionNCProfile.MultipleAttributeActionNCConfigJson = JSON.stringify(MultipleAttributeActionNCConfig);
				_oActionNCProfile.TemplateWiseActionNCConfigJson = JSON.stringify(TemplateWiseActionNCConfig);

			   // alert('_oActionNCProfile :' + JSON.stringify(_oActionNCProfile));
				return _oActionNCProfile;
			}
			catch (Excep) {
			  //  alert(' ActionNCProfileNormalizer 1' + Excep);
			  // alert(' ActionNCProfileNormalizer 2' + JSON.stringify(Excep));
				throw oOneViewExceptionHandler.Create("Normalizer", "ActionNCProfileNormalizer.Normalize", Excep);
			}
		}

		/// <summary>
		/// DTO list to Action-NC profile list conversion
		/// </summary>
		/// <param name="ActionNCProfileDTOList">Action-NC profile list dto (DTO from server)</param>
		/// <returns>ActionNCProfile list (Mobile entity format)</returns>
		this.NormalizeList = function (ActionNCProfileDTOList) {
			try {
				OneViewConsole.Debug("NormalizeList start", "ActionNCProfileNormalizer.NormalizeList");

				var ActionNCProfileList = new Array();
				for (var i = 0; i < ActionNCProfileDTOList.length; i++) {

					ActionNCProfileList[i] = MyInstance.Normalize(ActionNCProfileDTOList[i]);
				}

				OneViewConsole.Debug("NormalizeList end", "ActionNCProfileNormalizer.NormalizeList");

				return ActionNCProfileList;
			}
			catch (Excep) {
				//alert('NormalizeList' + Excep);
			   // alert('NormalizeList' + JSON.stringify(Excep));
				throw oOneViewExceptionHandler.Create("Normalizer", "ActionNCProfileNormalizer.NormalizeList", Excep);
			}
		}
	}

	//TemplateConfig Normalizer
	function TemplateConfigNormalizer() {

		var MyInstance = this;

		/// <summary>
		/// DTO to TemplateConfig conversion
		/// </summary>
		/// <param name="TemplateConfigDTO">TemplateConfig DTO (DTO from server)</param>
		/// <returns>TemplateConfig (Mobile entity format)</returns>
		this.Normalize = function (TemplateConfigDTO) {
			try {
				OneViewConsole.Debug("Normalize start", "TemplateConfigNormalizer.Normalize");

				var _oTemplateConfigMetaData = new TemplateConfigMetaData();

				_oTemplateConfigMetaData.ServerId = (TemplateConfigDTO.ServerId != undefined) ? TemplateConfigDTO.ServerId : "";
				_oTemplateConfigMetaData.ServiceId = TemplateConfigDTO.ServiceId;
				_oTemplateConfigMetaData.MobileVersionId = 1;
				_oTemplateConfigMetaData.OVGuid = (TemplateConfigDTO.OVGuid != undefined) ? TemplateConfigDTO.OVGuid : 0;
				_oTemplateConfigMetaData.Type = TemplateConfigDTO.Type;

				_oTemplateConfigMetaData.TemplateNodeId = TemplateConfigDTO.TemplateNodeId;
				_oTemplateConfigMetaData.TemplateName = TemplateConfigDTO.TemplateName;
				_oTemplateConfigMetaData.TemplateShortName = TemplateConfigDTO.TemplateShortName;

				_oTemplateConfigMetaData.IsHeaderEnable = TemplateConfigDTO.IsHeaderEnable;
				_oTemplateConfigMetaData.IsFooterEnable = TemplateConfigDTO.IsFooterEnable;

				_oTemplateConfigMetaData.IsScoringLogicEnabled = TemplateConfigDTO.IsScoringLogicEnabled;
				_oTemplateConfigMetaData.ScoringLogicType = TemplateConfigDTO.ScoringLogicType;

				_oTemplateConfigMetaData.RouteKeyConfig = (TemplateConfigDTO.RouteKeyConfig != undefined) ? TemplateConfigDTO.RouteKeyConfig : "";
				_oTemplateConfigMetaData.AttributeGroupSummaryDisplayConfig = (TemplateConfigDTO.AttributeGroupSummaryDisplayConfig != undefined && TemplateConfigDTO.AttributeGroupSummaryDisplayConfig != null) ? TemplateConfigDTO.AttributeGroupSummaryDisplayConfig : "";

				var TemplateConfigMetaDataDetails = '';

				if (TemplateConfigDTO.TemplateConfigMetaDataDetails != null)
					TemplateConfigMetaDataDetails = JSON.parse(TemplateConfigDTO.TemplateConfigMetaDataDetails);

				_oTemplateConfigMetaData.TemplateConfigMetaDataDetails = JSON.stringify(TemplateConfigMetaDataDetails);

				return _oTemplateConfigMetaData;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Normalizer", "TemplateConfigNormalizer.Normalize", Excep);
			}
		}

		/// <summary>
		/// DTO list to TemplateConfig list conversion
		/// </summary>
		/// <param name="TemplateConfigDTOList">TemplateConfig list dto (DTO from server)</param>
		/// <returns>TemplateConfig list (Mobile entity format)</returns>
		this.NormalizeList = function (TemplateConfigDTOList) {
			try {
				OneViewConsole.Debug("NormalizeList start", "TemplateConfigNormalizer.NormalizeList");

				var TemplateConfigList = new Array();
				for (var i = 0; i < TemplateConfigDTOList.length; i++) {

					TemplateConfigList[i] = MyInstance.Normalize(TemplateConfigDTOList[i]);
				}

				OneViewConsole.Debug("NormalizeList end", "TemplateConfigNormalizer.NormalizeList");

				return TemplateConfigList;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Normalizer", "TemplateConfigNormalizer.NormalizeList", Excep);
			}
		}
	}

	//DCDisplayMetaData Normalizer
	function DCDisplayMetaDataNormalizer() {

		var MyInstance = this;

		/// <summary>
		/// DTO to DCDisplayMetaData conversion
		/// </summary>
		/// <param name="DCDisplayMetaDataDTO">DCDisplayMetaData DTO (DTO from server)</param>
		/// <returns>DCDisplayMetaData (Mobile entity format)</returns>
		this.Normalize = function (DCDisplayMetaDataDTO) {
			try {
				OneViewConsole.Debug("Normalize start", "DCDisplayMetaDataNormalizer.Normalize");

				var _oDCDisplayMetaData = new DCDisplayMetaData();

				_oDCDisplayMetaData.ServerId = (DCDisplayMetaDataDTO.ServerId != undefined) ? DCDisplayMetaDataDTO.ServerId : "";
				_oDCDisplayMetaData.ServiceId = DCDisplayMetaDataDTO.ServiceId;
				_oDCDisplayMetaData.MobileVersionId = 1;
				_oDCDisplayMetaData.OVGuid = (DCDisplayMetaDataDTO.OVGuid != undefined) ? DCDisplayMetaDataDTO.OVGuid : 0;

				_oDCDisplayMetaData.DeviceDisplyMode = DCDisplayMetaDataDTO.DeviceDisplyMode;
				_oDCDisplayMetaData.IsShortNameDisplay = DCDisplayMetaDataDTO.IsShortNameDisplay;
				_oDCDisplayMetaData.IsImageDisplay = DCDisplayMetaDataDTO.IsImageDisplay;
				_oDCDisplayMetaData.IsTypeIconDisplay = DCDisplayMetaDataDTO.IsTypeIconDisplay;
				_oDCDisplayMetaData.IsMandatoryDisplay = DCDisplayMetaDataDTO.IsMandatoryDisplay;

				OneViewConsole.Debug("Normalize end", "DCDisplayMetaDataNormalizer.Normalize");

				return _oDCDisplayMetaData;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Normalizer", "DCDisplayMetaDataNormalizer.Normalize", Excep);
			}
		}

		/// <summary>
		/// DTO list to DCDisplayMetaData list conversion
		/// </summary>
		/// <param name="DCDisplayMetaDataDTOList">DCDisplayMetaData list dto (DTO from server)</param>
		/// <returns>DCDisplayMetaData list (Mobile entity format)</returns>
		this.NormalizeList = function (DCDisplayMetaDataDTOList) {
			try {
				OneViewConsole.Debug("NormalizeList start", "DCDisplayMetaDataNormalizer.NormalizeList");

				var DCDisplayMetaDataList = new Array();
				for (var i = 0; i < DCDisplayMetaDataDTOList.length; i++) {

					DCDisplayMetaDataList[i] = MyInstance.Normalize(DCDisplayMetaDataDTOList[i]);
				}

				OneViewConsole.Debug("NormalizeList end", "DCDisplayMetaDataNormalizer.NormalizeList");

				return DCDisplayMetaDataList;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Normalizer", "DCDisplayMetaDataNormalizer.NormalizeList", Excep);
			}
		}
	}

	// DCBlockerInfoNormalizer
	function DCBlockerInfoNormalizer() {

		// DcProfileNormalizer object
		var MyInstance = this;

		var _oDateTime = new DateTime();
		var CurrentDateAndTime = _oDateTime.GetDateAndTime();

		/// <summary>
		/// DTO to DCBlockerInfo conversion
		/// </summary>
		/// <param name="DCBlockerInfoObj">DCBlockerInfo dto (DTO from server)</param>
		/// <returns>DCBlockerInfo entity (Mobile entity format)</returns>
		this.Normalize = function (DCBlockerInfoObj) {
			try {
				OneViewConsole.Debug("Normalize start", "DCBlockerInfoNormalizer.Normalize");

				var _DCBlockerInfoEntity = new DCBlockerInfoEntity();

				_DCBlockerInfoEntity.ServiceId = DCBlockerInfoObj.ServiceId;;
				_DCBlockerInfoEntity.ServerId = DCBlockerInfoObj.ServerId;
				_DCBlockerInfoEntity.MobileVersionId = 1;
				_DCBlockerInfoEntity.OVGuid = DCBlockerInfoObj.OVGuid;
				_DCBlockerInfoEntity.ClientGuid = DCBlockerInfoObj.ClientGuid;

				_DCBlockerInfoEntity.DataCaptureClientGuid = DCBlockerInfoObj.DataCaptureClientGuid;
				_DCBlockerInfoEntity.DcResultsClientGuid = DCBlockerInfoObj.DcResultsClientGuid;
				_DCBlockerInfoEntity.DcResultDetailsClientGuid = DCBlockerInfoObj.DcResultDetailsClientGuid;
				_DCBlockerInfoEntity.DCBlockerDataCaptureClientGuid = DCBlockerInfoObj.DCBlockerDataCaptureClientGuid;
				_DCBlockerInfoEntity.Comments = DCBlockerInfoObj.Comments;

				_DCBlockerInfoEntity.CreatedUserId = DCBlockerInfoObj.CreatedUserId;
				_DCBlockerInfoEntity.CreatedDate = DCBlockerInfoObj.CreatedDate;
				_DCBlockerInfoEntity.LastsyncDate = CurrentDateAndTime;
				_DCBlockerInfoEntity.IsSynchronized = true;
				_DCBlockerInfoEntity.IsDisable = false;

				OneViewConsole.Debug("Normalize end", "DCBlockerInfoNormalizer.Normalize");

				return _DCBlockerInfoEntity;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Normalizer", "DCBlockerInfoNormalizer.Normalize", Excep);
			}
		}


		/// <summary>
		/// DTO list to DCBlockerInfo list conversion
		/// </summary>
		/// <param name="DCBlockerInfolst">DCBlockerInfo list dto (DTO from server)</param>
		/// <returns>DCBlockerInfo list entity (Mobile entity format)</returns>
		this.NormalizeList = function (DCBlockerInfolst) {
			try {
				OneViewConsole.Debug("NormalizeList start", "DCBlockerInfoNormalizer.NormalizeList");

				var DCBlockerInfoList = new Array();

				for (var i = 0; i < DCBlockerInfolst.length; i++) {

					DCBlockerInfoList[i] = MyInstance.Normalize(DCBlockerInfolst[i]);
				}

				OneViewConsole.Debug("NormalizeList end", "DCBlockerInfoNormalizer.NormalizeList");

				return DCBlockerInfoList;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Normalizer", "DCBlockerInfoNormalizer.NormalizeList", Excep);
			}
		}
	}

	//TemplateValidationConfig Normalizer
	function TemplateValidationConfigNormalizer() {

		// TemplateValidationConfigNormalizer object
		var MyInstance = this;

		var _oDateTime = new DateTime();
		var CurrentDateAndTime = _oDateTime.GetDateAndTime();

		/// <summary>
		/// DTO to TemplateValidationConfig conversion
		/// </summary>
		/// <param name="TemplateValidationConfigDTO">TemplateValidationConfig DTO (DTO from server)</param>
		/// <returns>TemplateValidationConfig (Mobile entity format)</returns>
		this.Normalize = function (TemplateValidationConfigDTO) {
			try {
				OneViewConsole.Debug("Normalize start", "TemplateValidationConfigNormalizer.Normalize");

				var _oTemplateValidationConfigMetaDataEntity = new TemplateValidationConfigMetaDataEntity();

				_oTemplateValidationConfigMetaDataEntity.ServerId = (TemplateValidationConfigDTO.ServerId != undefined) ? TemplateValidationConfigDTO.ServerId : "";
				_oTemplateValidationConfigMetaDataEntity.ServiceId = TemplateValidationConfigDTO.ServiceId;
				_oTemplateValidationConfigMetaDataEntity.MobileVersionId = 1;
				_oTemplateValidationConfigMetaDataEntity.OVGuid = (TemplateValidationConfigDTO.OVGuid != undefined) ? TemplateValidationConfigDTO.OVGuid : 0;
				_oTemplateValidationConfigMetaDataEntity.Type = TemplateValidationConfigDTO.Type;

				_oTemplateValidationConfigMetaDataEntity.DcUserId = TemplateValidationConfigDTO.DcUserId;
				_oTemplateValidationConfigMetaDataEntity.TemplateNodeId = TemplateValidationConfigDTO.TemplateNodeId;
				_oTemplateValidationConfigMetaDataEntity.DcPlaceId = TemplateValidationConfigDTO.DcPlaceId;
				_oTemplateValidationConfigMetaDataEntity.DcPlaceDimension = TemplateValidationConfigDTO.DcPlaceDimension;

				//var SaveValidationMetaData = '';
				//var SubmitValidationMetaData = '';
				//var ControlEventValidationJobs = '';

				if (TemplateValidationConfigDTO.SaveValidationMetaData != null){
					_oTemplateValidationConfigMetaDataEntity.SaveValidationMetaData = JSON.stringify(TemplateValidationConfigDTO.SaveValidationMetaData);
				}
				if (TemplateValidationConfigDTO.SubmitValidationMetaData != null) {
					_oTemplateValidationConfigMetaDataEntity.SubmitValidationMetaData = JSON.stringify(TemplateValidationConfigDTO.SubmitValidationMetaData);
				}
				if (TemplateValidationConfigDTO.ControlEventValidationJobs != null) {
					_oTemplateValidationConfigMetaDataEntity.ControlEventValidationJobs = JSON.stringify(TemplateValidationConfigDTO.ControlEventValidationJobs);
				}

				//_oTemplateValidationConfigMetaDataEntity.SaveValidationMetaData = JSON.stringify(SaveValidationMetaData);
				//_oTemplateValidationConfigMetaDataEntity.SubmitValidationMetaData = JSON.stringify(SubmitValidationMetaData);
				//_oTemplateValidationConfigMetaDataEntity.ControlEventValidationJobs = JSON.stringify(ControlEventValidationJobs);

				_oTemplateValidationConfigMetaDataEntity.CreatedDate = (TemplateValidationConfigDTO.CreatedDate != undefined) ? TemplateValidationConfigDTO.CreatedDate : "";
				_oTemplateValidationConfigMetaDataEntity.LastsyncDate = CurrentDateAndTime;

				return _oTemplateValidationConfigMetaDataEntity;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Normalizer", "TemplateValidationConfigNormalizer.Normalize", Excep);
			}
		}


		/// <summary>
		/// DTO list to TemplateValidationConfig list conversion
		/// </summary>
		/// <param name="TemplateValidationConfigDTOList">TemplateValidationConfig list dto (DTO from server)</param>
		/// <returns>TemplateValidationConfig list (Mobile entity format)</returns>
		this.NormalizeList = function (TemplateValidationConfigDTOList) {
			try {
				OneViewConsole.Debug("NormalizeList start", "TemplateValidationConfigNormalizer.NormalizeList");

				var TemplateValidationConfigList = new Array();
				for (var i = 0; i < TemplateValidationConfigDTOList.length; i++) {
					TemplateValidationConfigList[i] = MyInstance.Normalize(TemplateValidationConfigDTOList[i]);
				}

				OneViewConsole.Debug("NormalizeList end", "TemplateValidationConfigNormalizer.NormalizeList");

				return TemplateValidationConfigList;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Normalizer", "TemplateValidationConfigNormalizer.NormalizeList", Excep);
			}
		}
	}

	//TemplateUIEventJobConfig Normalizer
	function TemplateUIEventJobConfigNormalizer() {

		// TemplateUIEventJobConfigNormalizer object
		var MyInstance = this;

		var _oDateTime = new DateTime();
		var CurrentDateAndTime = _oDateTime.GetDateAndTime();

		/// <summary>
		/// DTO to TemplateUIEventJobConfigMetaDataEntity conversion
		/// </summary>
		/// <param name="TemplateUIEventJobConfigDTO">TemplateUIEventJobConfig DTO (DTO from server)</param>
		/// <returns>TemplateUIEventJobConfig (Mobile entity format)</returns>
		this.Normalize = function (TemplateUIEventJobConfigDTO) {
			try {
				OneViewConsole.Debug("Normalize start", "TemplateUIEventJobConfigNormalizer.Normalize");

				var _oTemplateUIEventJobConfigMetaDataEntity = new TemplateUIEventJobConfigMetaDataEntity();

				_oTemplateUIEventJobConfigMetaDataEntity.ServerId = (TemplateUIEventJobConfigDTO.ServerId != undefined) ? TemplateUIEventJobConfigDTO.ServerId : "";
				_oTemplateUIEventJobConfigMetaDataEntity.ServiceId = TemplateUIEventJobConfigDTO.ServiceId;
				_oTemplateUIEventJobConfigMetaDataEntity.MobileVersionId = 1;
				_oTemplateUIEventJobConfigMetaDataEntity.OVGuid = (TemplateUIEventJobConfigDTO.OVGuid != undefined) ? TemplateUIEventJobConfigDTO.OVGuid : 0;
				_oTemplateUIEventJobConfigMetaDataEntity.Type = TemplateUIEventJobConfigDTO.Type;

				_oTemplateUIEventJobConfigMetaDataEntity.DcUserId = TemplateUIEventJobConfigDTO.DcUserId;
				_oTemplateUIEventJobConfigMetaDataEntity.TemplateNodeId = TemplateUIEventJobConfigDTO.TemplateNodeId;
				_oTemplateUIEventJobConfigMetaDataEntity.DcPlaceId = TemplateUIEventJobConfigDTO.DcPlaceId;
				_oTemplateUIEventJobConfigMetaDataEntity.DcPlaceDimension = TemplateUIEventJobConfigDTO.DcPlaceDimension;

				if (TemplateUIEventJobConfigDTO.ControlEventUIJobs != null) {
					_oTemplateUIEventJobConfigMetaDataEntity.ControlEventUIJobs = JSON.stringify(TemplateUIEventJobConfigDTO.ControlEventUIJobs);
				}

				_oTemplateUIEventJobConfigMetaDataEntity.CreatedDate = (TemplateUIEventJobConfigDTO.CreatedDate != undefined) ? TemplateUIEventJobConfigDTO.CreatedDate : "";
				_oTemplateUIEventJobConfigMetaDataEntity.LastsyncDate = CurrentDateAndTime;

				return _oTemplateUIEventJobConfigMetaDataEntity;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Normalizer", "TemplateUIEventJobConfigNormalizer.Normalize", Excep);
			}
		}


		/// <summary>
		/// DTO list to TemplateUIEventJobConfig list conversion
		/// </summary>
		/// <param name="TemplateUIEventJobConfigDTOList">TemplateUIEventJobConfig list dto (DTO from server)</param>
		/// <returns>TemplateUIEventJobConfig list (Mobile entity format)</returns>
		this.NormalizeList = function (TemplateUIEventJobConfigDTOList) {
			try {
				OneViewConsole.Debug("NormalizeList start", "TemplateUIEventJobConfigNormalizer.NormalizeList");

				var TemplateUIEventJobConfigList = new Array();
				for (var i = 0; i < TemplateUIEventJobConfigDTOList.length; i++) {
					TemplateUIEventJobConfigList[i] = MyInstance.Normalize(TemplateUIEventJobConfigDTOList[i]);
				}

				OneViewConsole.Debug("NormalizeList end", "TemplateUIEventJobConfigNormalizer.NormalizeList");

				return TemplateUIEventJobConfigList;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Normalizer", "TemplateUIEventJobConfigNormalizer.NormalizeList", Excep);
			}
		}
	}

	//MobileViewRecordsMetadata Normalizer
	function MobileViewRecordsMetadataNormalizer() {

		// MobileViewRecordsMetadataNormalizer object
		var MyInstance = this;

		var _oDateTime = new DateTime();
		var CurrentDateAndTime = _oDateTime.GetDateAndTime();

		/// <summary>
		/// DTO to MobileViewRecordsMetadataEntity conversion
		/// </summary>
		/// <param name="MobileViewRecordsMetadataDTO">MobileViewRecordsMetadata DTO (DTO from server)</param>
		/// <returns>MobileViewRecordsMetadata (Mobile entity format)</returns>
		this.Normalize = function (MobileViewRecordsMetadataDTO) {
			try {
				OneViewConsole.Debug("Normalize start", "MobileViewRecordsMetadataNormalizer.Normalize");

				var _oMobileViewRecordsMetadataEntity = new MobileViewRecordsMetadataEntity();

				_oMobileViewRecordsMetadataEntity.ServerId = MobileViewRecordsMetadataDTO.ServerId;
				_oMobileViewRecordsMetadataEntity.ServiceId = MobileViewRecordsMetadataDTO.ServiceId;
				_oMobileViewRecordsMetadataEntity.MobileVersionId = 1;
				_oMobileViewRecordsMetadataEntity.OVGuid = MobileViewRecordsMetadataDTO.OVGuid;
				_oMobileViewRecordsMetadataEntity.Type = MobileViewRecordsMetadataDTO.Type;

				_oMobileViewRecordsMetadataEntity.DcUserId = MobileViewRecordsMetadataDTO.DcUserId;
				_oMobileViewRecordsMetadataEntity.TemplateNodeId = MobileViewRecordsMetadataDTO.TemplateNodeId;
				_oMobileViewRecordsMetadataEntity.DcPlaceId = MobileViewRecordsMetadataDTO.DcPlaceId;
				_oMobileViewRecordsMetadataEntity.DcPlaceDimension = MobileViewRecordsMetadataDTO.DcPlaceDimension;

				_oMobileViewRecordsMetadataEntity.ViewRecordsFacadeKey = MobileViewRecordsMetadataDTO.ViewRecordsFacadeKey;

				if (MobileViewRecordsMetadataDTO.Config != null) {
					_oMobileViewRecordsMetadataEntity.Config = JSON.stringify(MobileViewRecordsMetadataDTO.Config);
				}

				if (MobileViewRecordsMetadataDTO.InlineEditConfig != null) {
					_oMobileViewRecordsMetadataEntity.InlineEditConfig = JSON.stringify(MobileViewRecordsMetadataDTO.InlineEditConfig);
				}

				if (MobileViewRecordsMetadataDTO.AutoTemperatureListnerControlConfig != null) {
					_oMobileViewRecordsMetadataEntity.AutoTemperatureListnerControlConfig = JSON.stringify(MobileViewRecordsMetadataDTO.AutoTemperatureListnerControlConfig);
				}

				if (MobileViewRecordsMetadataDTO.Rules != null) {
					_oMobileViewRecordsMetadataEntity.Rules = JSON.stringify(MobileViewRecordsMetadataDTO.Rules);
				}

				if (MobileViewRecordsMetadataDTO.DefaultSearchConfig != null) {
					_oMobileViewRecordsMetadataEntity.DefaultSearchConfig = JSON.stringify(MobileViewRecordsMetadataDTO.DefaultSearchConfig);
				}

				_oMobileViewRecordsMetadataEntity.CreatedDate = (MobileViewRecordsMetadataDTO.CreatedDate != undefined) ? MobileViewRecordsMetadataDTO.CreatedDate : "";
				_oMobileViewRecordsMetadataEntity.LastsyncDate = CurrentDateAndTime;

				return _oMobileViewRecordsMetadataEntity;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Normalizer", "MobileViewRecordsMetadataNormalizer.Normalize", Excep);
			}
		}


		/// <summary>
		/// DTO list to MobileViewRecordsMetadata list conversion
		/// </summary>
		/// <param name="MobileViewRecordsMetadataDTOList">MobileViewRecordsMetadata list dto (DTO from server)</param>
		/// <returns>MobileViewRecordsMetadata list (Mobile entity format)</returns>
		this.NormalizeList = function (MobileViewRecordsMetadataDTOList) {
			try {
				OneViewConsole.Debug("NormalizeList start", "MobileViewRecordsMetadataNormalizer.NormalizeList");

				var MobileViewRecordsMetadataList = new Array();
				for (var i = 0; i < MobileViewRecordsMetadataDTOList.length; i++) {
					MobileViewRecordsMetadataList[i] = MyInstance.Normalize(MobileViewRecordsMetadataDTOList[i]);
				}

				OneViewConsole.Debug("NormalizeList end", "MobileViewRecordsMetadataNormalizer.NormalizeList");

				return MobileViewRecordsMetadataList;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Normalizer", "MobileViewRecordsMetadataNormalizer.NormalizeList", Excep);
			}
		}
	}

	//GarbageCollectorMetadata Normalizer
	function GarbageCollectorMetadataNormalizer() {

		// GarbageCollectorMetadataNormalizer object
		var MyInstance = this;

		var _oDateTime = new DateTime();
		var CurrentDateAndTime = _oDateTime.GetDateAndTime();

		/// <summary>
		/// DTO to GarbageCollectorMetadataEntity conversion
		/// </summary>
		/// <param name="GarbageCollectorMetadataDTO">GarbageCollectorMetadata DTO (DTO from server)</param>
		/// <returns>GarbageCollectorMetadata (Mobile entity format)</returns>
		this.Normalize = function (GarbageCollectorMetadataDTO) {
			try {
				OneViewConsole.Debug("Normalize start", "GarbageCollectorMetadataNormalizer.Normalize");

				var _oGarbageCollectorMetadataEntity = new GarbageCollectorMetadataEntity();

				_oGarbageCollectorMetadataEntity.ServerId = GarbageCollectorMetadataDTO.ServerId;
				_oGarbageCollectorMetadataEntity.ServiceId = GarbageCollectorMetadataDTO.ServiceId;
				_oGarbageCollectorMetadataEntity.MobileVersionId = 1;
				_oGarbageCollectorMetadataEntity.OVGuid = GarbageCollectorMetadataDTO.OVGuid;
				_oGarbageCollectorMetadataEntity.Type = GarbageCollectorMetadataDTO.Type;

				_oGarbageCollectorMetadataEntity.DcUserId = GarbageCollectorMetadataDTO.DcUserId;
				_oGarbageCollectorMetadataEntity.TemplateNodeId = GarbageCollectorMetadataDTO.TemplateNodeId;
				_oGarbageCollectorMetadataEntity.DcPlaceId = GarbageCollectorMetadataDTO.DcPlaceId;
				_oGarbageCollectorMetadataEntity.DcPlaceDimension = GarbageCollectorMetadataDTO.DcPlaceDimension;

				if (GarbageCollectorMetadataDTO.Configuration != null) {
					_oGarbageCollectorMetadataEntity.Configuration = JSON.stringify(GarbageCollectorMetadataDTO.Configuration);
				}

				_oGarbageCollectorMetadataEntity.CreatedDate = (GarbageCollectorMetadataDTO.CreatedDate != undefined) ? GarbageCollectorMetadataDTO.CreatedDate : "";
				_oGarbageCollectorMetadataEntity.LastsyncDate = CurrentDateAndTime;

				return _oGarbageCollectorMetadataEntity;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Normalizer", "GarbageCollectorMetadataNormalizer.Normalize", Excep);
			}
		}


		/// <summary>
		/// DTO list to GarbageCollectorMetadata list conversion
		/// </summary>
		/// <param name="GarbageCollectorMetadataDTOList">GarbageCollectorMetadata list dto (DTO from server)</param>
		/// <returns>GarbageCollectorMetadata list (Mobile entity format)</returns>
		this.NormalizeList = function (GarbageCollectorMetadataDTOList) {
			try {
				OneViewConsole.Debug("NormalizeList start", "GarbageCollectorMetadataNormalizer.NormalizeList");

				var GarbageCollectorMetadataList = new Array();
				for (var i = 0; i < GarbageCollectorMetadataDTOList.length; i++) {
					GarbageCollectorMetadataList[i] = MyInstance.Normalize(GarbageCollectorMetadataDTOList[i]);
				}

				OneViewConsole.Debug("NormalizeList end", "GarbageCollectorMetadataNormalizer.NormalizeList");

				return GarbageCollectorMetadataList;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Normalizer", "GarbageCollectorMetadataNormalizer.NormalizeList", Excep);
			}
		}
	}

	//DcCustomPageHtml Normalizer
	function DcCustomPageHtmlNormalizer() {

		// DcCustomPageHtmlEntity object
		var MyInstance = this;

		var _oDateTime = new DateTime();
		var CurrentDateAndTime = _oDateTime.GetDateAndTime();

		/// <summary>
		/// DTO to DcCustomPageHtmlEntity conversion
		/// </summary>
		/// <param name="DcCustomPageHtmlDTO">DcCustomPageHtml DTO (DTO from server)</param>
		/// <returns>DcCustomPageHtmlEntity (Mobile entity format)</returns>
		this.Normalize = function (DcCustomPageHtmlDTO) {
			try {
				OneViewConsole.Debug("Normalize start", "DcCustomPageHtmlNormalizer.Normalize");

				var _oDcCustomPageHtmlEntity = new DcCustomPageHtmlEntity();

				_oDcCustomPageHtmlEntity.ServerId = (DcCustomPageHtmlDTO.ServerId != undefined) ? DcCustomPageHtmlDTO.ServerId : "";
				_oDcCustomPageHtmlEntity.ServiceId = DcCustomPageHtmlDTO.ServiceId;
				_oDcCustomPageHtmlEntity.MobileVersionId = 1;
				_oDcCustomPageHtmlEntity.OVGuid = (DcCustomPageHtmlDTO.OVGuid != undefined) ? DcCustomPageHtmlDTO.OVGuid : 0;

				_oDcCustomPageHtmlEntity.TemplateNodeId = DcCustomPageHtmlDTO.TemplateNodeId;
				_oDcCustomPageHtmlEntity.Html = DcCustomPageHtmlDTO.Html;
				_oDcCustomPageHtmlEntity.Code = DcCustomPageHtmlDTO.Code;

				_oDcCustomPageHtmlEntity.CreatedDate = (DcCustomPageHtmlDTO.CreatedDate != undefined) ? DcCustomPageHtmlDTO.CreatedDate : "";
				_oDcCustomPageHtmlEntity.LastsyncDate = CurrentDateAndTime;

				return _oDcCustomPageHtmlEntity;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Normalizer", "DcCustomPageHtmlNormalizer.Normalize", Excep);
			}
		}


		/// <summary>
		/// DTO list to DcCustomPageHtmlEntity list conversion
		/// </summary>
		/// <param name="DcCustomPageHtmlDTOList">DcCustomPageHtmlDTO list dto (DTO from server)</param>
		/// <returns>DcCustomPageHtmlEntity list (Mobile entity format)</returns>
		this.NormalizeList = function (DcCustomPageHtmlDTOList) {
			try {
				OneViewConsole.Debug("NormalizeList start", "DcCustomPageHtmlNormalizer.NormalizeList");

				var DcCustomPageHtmlList = new Array();
				for (var i = 0; i < DcCustomPageHtmlDTOList.length; i++) {
					DcCustomPageHtmlList[i] = MyInstance.Normalize(DcCustomPageHtmlDTOList[i]);
				}

				OneViewConsole.Debug("NormalizeList end", "DcCustomPageHtmlNormalizer.NormalizeList");

				return DcCustomPageHtmlList;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Normalizer", "DcCustomPageHtmlNormalizer.NormalizeList", Excep);
			}
		}
	}

	// DcApprovalProfile normalizer
	function DcApprovalProfileNormalizer() {

		// DcApprovalProfileNormalizer object
		var MyInstance = this;


		/// <summary>
		/// DTO to DcApprovalProfile conversion
		/// </summary>
		/// <param name="DcApprovalProfileobj">DcApprovalProfile dto (DTO from server)</param>
		/// <returns>DcApprovalProfile entity (Mobile entity format)</returns>
		this.Normalize = function (DcApprovalProfileobj) {
			try {
				OneViewConsole.Debug("Normalize start", "DcApprovalProfileNormalizer.Normalize");

				var _oDcApprovalProfileEntity = new DcApprovalProfileEntity();

				_oDcApprovalProfileEntity.ServerId = DcApprovalProfileobj.ServerId;
				_oDcApprovalProfileEntity.MobileVersionId = 1;
				_oDcApprovalProfileEntity.OVGuid = DcApprovalProfileobj.OVGuid;

				_oDcApprovalProfileEntity.Type = DcApprovalProfileobj.Type;
				_oDcApprovalProfileEntity.Code = DcApprovalProfileobj.Code;

				_oDcApprovalProfileEntity.ServiceId = DcApprovalProfileobj.ServiceId;

				_oDcApprovalProfileEntity.DcUserId = DcApprovalProfileobj.DcUserId;
				_oDcApprovalProfileEntity.IsAnonymousDcUser = DcApprovalProfileobj.IsAnonymousDcUser;

				_oDcApprovalProfileEntity.TemplateNodeId = DcApprovalProfileobj.TemplateNodeId;

				_oDcApprovalProfileEntity.DcPlaceId = DcApprovalProfileobj.DcPlaceId;
				_oDcApprovalProfileEntity.DcPlaceDimension = DcApprovalProfileobj.DcPlaceDimension;
				_oDcApprovalProfileEntity.DcPlaceType = DcApprovalProfileobj.DcPlaceType;
				_oDcApprovalProfileEntity.AdvanceDcPlace = DcApprovalProfileobj.AdvanceDcPlace;

				_oDcApprovalProfileEntity.OverallApprovalLevels = DcApprovalProfileobj.OverallApprovalLevels;
				_oDcApprovalProfileEntity.OnDeviceApprovalLevels = DcApprovalProfileobj.OnDeviceApprovalLevels;

				_oDcApprovalProfileEntity.ValidityStartDate = DcApprovalProfileobj.ValidityStartDate;
				_oDcApprovalProfileEntity.ValidityEndDate = DcApprovalProfileobj.ValidityEndDate;
				_oDcApprovalProfileEntity.TimeStamp = DcApprovalProfileobj.TimeStamp;

				var DcApprovalLevelInfoDTOList = DcApprovalProfileobj.DcApprovalLevelInfoDTOList;

				for (var j = 0; j < DcApprovalLevelInfoDTOList.length; j++) {

					var _oDcApprovalLevelInfoEntity = new DcApprovalLevelInfoEntity();

					_oDcApprovalLevelInfoEntity.MobileVersionId = 1;
					_oDcApprovalLevelInfoEntity.OVGuid = DcApprovalLevelInfoDTOList[j].OVGuid;

					_oDcApprovalLevelInfoEntity.ServiceId = DcApprovalLevelInfoDTOList[j].ServiceId;
					_oDcApprovalLevelInfoEntity.ApprovalIndex = DcApprovalLevelInfoDTOList[j].ApprovalIndex;
					_oDcApprovalLevelInfoEntity.IsAnonymousUser = DcApprovalLevelInfoDTOList[j].IsAnonymousUser;

					_oDcApprovalLevelInfoEntity.OnDeviceApprovalConfigJSON = DcApprovalLevelInfoDTOList[j].OnDeviceApprovalConfigJSON;

					_oDcApprovalLevelInfoEntity.IsApprovalPreviewAllowed = DcApprovalLevelInfoDTOList[j].IsApprovalPreviewAllowed;
					_oDcApprovalLevelInfoEntity.IsApprovalReviewAllowed = DcApprovalLevelInfoDTOList[j].IsApprovalReviewAllowed;
					_oDcApprovalLevelInfoEntity.IsOnDeviceApproval = DcApprovalLevelInfoDTOList[j].IsOnDeviceApproval;

					_oDcApprovalLevelInfoEntity.TimeStamp = DcApprovalLevelInfoDTOList[j].TimeStamp;

					_oDcApprovalProfileEntity.DcApprovalLevelInfoEntityList[j] = _oDcApprovalLevelInfoEntity;

					var DcApprovalUserDetailsDTOList = DcApprovalLevelInfoDTOList[j].DcApprovalUserDetailsDTOList;

					for (var k = 0; k < DcApprovalUserDetailsDTOList.length; k++) {

						var _oDcApprovalUserDetailsEntity = new DcApprovalUserDetailsEntity();

						_oDcApprovalUserDetailsEntity.MobileVersionId = 1;
						_oDcApprovalUserDetailsEntity.OVGuid = DcApprovalUserDetailsDTOList[k].OVGuid;

						_oDcApprovalUserDetailsEntity.ServiceId = DcApprovalUserDetailsDTOList[k].ServiceId;

						_oDcApprovalUserDetailsEntity.UserId = DcApprovalUserDetailsDTOList[k].UserId;
						_oDcApprovalUserDetailsEntity.UserName = DcApprovalUserDetailsDTOList[k].UserName;

						_oDcApprovalUserDetailsEntity.TimeStamp = DcApprovalUserDetailsDTOList[k].TimeStamp;

						_oDcApprovalProfileEntity.DcApprovalLevelInfoEntityList[j].DcApprovalUserDetailsEntityList[k] = _oDcApprovalUserDetailsEntity;
					}
				}

				OneViewConsole.Debug("Normalize end", "DcApprovalProfileNormalizer.Normalize");

				return _oDcApprovalProfileEntity;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Normalizer", "DcApprovalProfileNormalizer.Normalize", Excep);
			}
		}


		/// <summary>
		/// DTO list to DcApprovalProfile list conversion
		/// </summary>
		/// <param name="DcApprovalProfilelst">DcApprovalProfile dto list (DTO from server)</param>
		/// <returns>DcApprovalProfile entity list (Mobile entity format)</returns>
		this.NormalizeList = function (DcApprovalProfilelst) {
			try {
				OneViewConsole.Debug("NormalizeList start", "DcApprovalProfileNormalizer.NormalizeList");

				var DcApprovalProfileEntityLst = new Array();

				for (var i = 0; i < DcApprovalProfilelst.length; i++) {

					DcApprovalProfileEntityLst[i] = MyInstance.Normalize(DcApprovalProfilelst[i]);
				}

				OneViewConsole.Debug("NormalizeList end", "DcApprovalProfileNormalizer.NormalizeList");

				return DcApprovalProfileEntityLst;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Normalizer", "DcApprovalProfileNormalizer.NormalizeList", Excep);
			}
		}
	}

	//MobileDcPreviewMetadata Normalizer
	function MobileDcPreviewMetadataNormalizer() {

		// MobileDcPreviewMetadataNormalizer object
		var MyInstance = this;

		var _oDateTime = new DateTime();
		var CurrentDateAndTime = _oDateTime.GetDateAndTime();

		/// <summary>
		/// DTO to MobileDcPreviewMetadataEntity conversion
		/// </summary>
		/// <param name="MobileDcPreviewMetadataDTO">MobileDcPreviewMetadata DTO (DTO from server)</param>
		/// <returns>MobileDcPreviewMetadata (Mobile entity format)</returns>
		this.Normalize = function (MobileDcPreviewMetadataDTO) {
			try {
				OneViewConsole.Debug("Normalize start", "MobileDcPreviewMetadataNormalizer.Normalize");

				var _oMobileDcPreviewMetadataEntity = new MobileDcPreviewMetadataEntity();

				_oMobileDcPreviewMetadataEntity.ServerId = MobileDcPreviewMetadataDTO.ServerId;
				_oMobileDcPreviewMetadataEntity.ServiceId = MobileDcPreviewMetadataDTO.ServiceId;
				_oMobileDcPreviewMetadataEntity.MobileVersionId = 1;
				_oMobileDcPreviewMetadataEntity.OVGuid = MobileDcPreviewMetadataDTO.OVGuid;

				_oMobileDcPreviewMetadataEntity.DcUserId = MobileDcPreviewMetadataDTO.DcUserId;
				_oMobileDcPreviewMetadataEntity.TemplateNodeId = MobileDcPreviewMetadataDTO.TemplateNodeId;
				_oMobileDcPreviewMetadataEntity.DcPlaceId = MobileDcPreviewMetadataDTO.DcPlaceId;
				_oMobileDcPreviewMetadataEntity.DcPlaceDimension = MobileDcPreviewMetadataDTO.DcPlaceDimension;

				_oMobileDcPreviewMetadataEntity.IsReferApprovalDcSummaryViewConfig = MobileDcPreviewMetadataDTO.IsReferApprovalDcSummaryViewConfig;

				if (MobileDcPreviewMetadataDTO.DcSummaryViewConfig != null) {
					_oMobileDcPreviewMetadataEntity.DcSummaryViewConfig = JSON.stringify(MobileDcPreviewMetadataDTO.DcSummaryViewConfig);
				}

				if (MobileDcPreviewMetadataDTO.AttributeSummaryViewConfig != null) {
					_oMobileDcPreviewMetadataEntity.AttributeSummaryViewConfig = JSON.stringify(MobileDcPreviewMetadataDTO.AttributeSummaryViewConfig);
				}

				_oMobileDcPreviewMetadataEntity.CreatedDate = (MobileDcPreviewMetadataDTO.CreatedDate != undefined) ? MobileDcPreviewMetadataDTO.CreatedDate : "";
				_oMobileDcPreviewMetadataEntity.LastsyncDate = CurrentDateAndTime;

				return _oMobileDcPreviewMetadataEntity;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Normalizer", "MobileDcPreviewMetadataNormalizer.Normalize", Excep);
			}
		}


		/// <summary>
		/// DTO list to MobileDcPreviewMetadata list conversion
		/// </summary>
		/// <param name="MobileDcPreviewMetadataDTOList">MobileDcPreviewMetadata list dto (DTO from server)</param>
		/// <returns>MobileDcPreviewMetadata list (Mobile entity format)</returns>
		this.NormalizeList = function (MobileDcPreviewMetadataDTOList) {
			try {
				OneViewConsole.Debug("NormalizeList start", "MobileDcPreviewMetadataNormalizer.NormalizeList");

				var MobileDcPreviewMetadataList = new Array();
				for (var i = 0; i < MobileDcPreviewMetadataDTOList.length; i++) {
					MobileDcPreviewMetadataList[i] = MyInstance.Normalize(MobileDcPreviewMetadataDTOList[i]);
				}

				OneViewConsole.Debug("NormalizeList end", "MobileDcPreviewMetadataNormalizer.NormalizeList");

				return MobileDcPreviewMetadataList;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Normalizer", "MobileDcPreviewMetadataNormalizer.NormalizeList", Excep);
			}
		}
	}

	// RcoAndLabelMappingNormalizer
	function RcoAndLabelMappingNormalizer() {

		// NodeNormalizer object
		var MyInstance = this;


		/// <summary>
		/// DTO to node conversion
		/// </summary>
		/// <param name="Nodeobj">Node object (Mobile entity object)</param>
		/// <param name="NodeJsonobj">Node data object (DTO from server)</param>
		/// <returns>Node object (Mobile entity format)</returns>
		this.Normalize = function (Nodeobj, NodeJsonobj) {
			try {
				OneViewConsole.Debug("Normalize start", "RcoAndLabelMappingNormalizer.Normalize");

				Nodeobj.ServerId = NodeJsonobj.ServerId;
				Nodeobj.MobileVersionId = 1;
				Nodeobj.CreatedDate = NodeJsonobj.CreatedDate;
				Nodeobj.OSGuid = NodeJsonobj.OSGuid;
				Nodeobj.OVGuid = NodeJsonobj.OVGuid;
				Nodeobj.Code = NodeJsonobj.Code;
				Nodeobj.Type = NodeJsonobj.Type;

				Nodeobj.RCOMasterId = NodeJsonobj.RCOMasterEntityId;
				Nodeobj.RCOTypeId = NodeJsonobj.RCOTypeId;
				Nodeobj.LabelTypeId = NodeJsonobj.LabelTypeId;
				Nodeobj.LabelTypeName = NodeJsonobj.LabelTypeName;
				Nodeobj.LabelId = NodeJsonobj.LabelId;
				Nodeobj.LabelName = NodeJsonobj.LabelName;

				Nodeobj.IsSynchronized = 'true';


				OneViewConsole.Debug("Normalize end", "RcoAndLabelMappingNormalizer.Normalize");

				return Nodeobj;
			}
			catch (Excep) {
				alert('RcoAndLabelMappingNormalizer.Normalize Excep : ' + Excep);
				alert('RcoAndLabelMappingNormalizer.Normalize Excep 22 : ' + JSON.stringify(Excep));
				throw oOneViewExceptionHandler.Create("Normalizer", "RcoAndLabelMappingNormalizer.Normalize", Excep);
			}
		}


		/// <summary>
		/// DTO list to node list conversion
		/// </summary>
		/// <param name="NodeName">Node name</param>
		/// <param name="MasterNodelst">Master node list (DTO from server)</param>
		/// <returns>Node list (Mobile entity format)</returns>
		this.NormalizeList = function (NodeName, MasterNodelst) {
			try {
				OneViewConsole.Debug("NormalizeList start", "RcoAndLabelMappingNormalizer.NormalizeList");
			   // alert(MasterNodelst.length + ',RcoAndLabelMappingNormalizer MasterNodelst : ' + MasterNodelst);
				var NodesList = new Array();
				for (var i = 0; i < MasterNodelst.length; i++) {

					var Nodeobj = new window[NodeName]();
					var MasterNodesobj = MyInstance.Normalize(Nodeobj, MasterNodelst[i]);
					NodesList[i] = MasterNodesobj;
				}

				OneViewConsole.Debug("NormalizeList end", "RcoAndLabelMappingNormalizer.NormalizeList");

				return NodesList;
			}
			catch (Excep) {
				//alert('RcoAndLabelMappingNormalizer.NormalizeList Excep : ' + Excep);
				//alert('RcoAndLabelMappingNormalizer.NormalizeList Excep 22 : ' + JSON.stringify(Excep));
				throw oOneViewExceptionHandler.Create("Normalizer", "RcoAndLabelMappingNormalizer.NormalizeList", Excep);
			}
		}
	}

	// OrderDetailsNormalizer
	function OrderDetailsNormalizer() {

		// NodeNormalizer object
		var MyInstance = this;


		/// <summary>
		/// DTO to node conversion
		/// </summary>
		/// <param name="Nodeobj">Node object (Mobile entity object)</param>
		/// <param name="NodeJsonobj">Node data object (DTO from server)</param>
		/// <returns>Node object (Mobile entity format)</returns>
		this.Normalize_OLD = function (Nodeobj, NodeJsonobj) {
			try {
				OneViewConsole.Debug("Normalize start", "OrderDetailsNormalizer.Normalize");

				Nodeobj.ServerId = NodeJsonobj.ServerId;
				Nodeobj.MobileVersionId = 1;
				Nodeobj.CreatedDate = NodeJsonobj.CreatedDate;
				Nodeobj.OSGuid = NodeJsonobj.OSGuid;
				Nodeobj.OVGuid = NodeJsonobj.OVGuid;
				Nodeobj.Code = NodeJsonobj.Code;
				Nodeobj.Type = NodeJsonobj.Type;

				Nodeobj.ReceiverBUId = NodeJsonobj.ReceiverBUId;
				Nodeobj.SupplierBUId = NodeJsonobj.SupplierBUId;
				Nodeobj.STNo = NodeJsonobj.STNo;
				Nodeobj.OTNo = NodeJsonobj.OTNo;
				Nodeobj.RCOMasterId = NodeJsonobj.ItemMasterId;
				Nodeobj.RCOMasterName = NodeJsonobj.ItemMasterName;
				Nodeobj.RCOTypeId = NodeJsonobj.RCOTypeId;

				Nodeobj.ItemSection = NodeJsonobj.ItemSection;
				Nodeobj.Unit = NodeJsonobj.Unit;
				Nodeobj.OrderQuantity = NodeJsonobj.OrderQuantity;
				Nodeobj.OrderDate = NodeJsonobj.OrderDate;
				Nodeobj.DeliveredQuantity = NodeJsonobj.OrderDeliveredQuantity;
				Nodeobj.DeliveredDate = NodeJsonobj.DeliveryDate;
				Nodeobj.OrderType = NodeJsonobj.OrderType;

				Nodeobj.IsSynchronized = 'true';


				OneViewConsole.Debug("Normalize end", "OrderDetailsNormalizer.Normalize");

				return Nodeobj;
			}
			catch (Excep) {
				//alert('OrderDetailsNormalizer.Normalize Excep : ' + Excep);
				//alert('OrderDetailsNormalizer.Normalize Excep 22 : ' + JSON.stringify(Excep));
				throw oOneViewExceptionHandler.Create("Normalizer", "OrderDetailsNormalizer.Normalize", Excep);
			}
		}

		/// <summary>
		/// DTO to node conversion
		/// </summary>
		/// <param name="Nodeobj">Node object (Mobile entity object)</param>
		/// <param name="NodeJsonobj">Node data object (DTO from server)</param>
		/// <returns>Node object (Mobile entity format)</returns>
		this.Normalize = function (Nodeobj, NodeJsonobj) {
			try {
				OneViewConsole.Debug("Normalize start", "OrderDetailsNormalizer.Normalize");

				Nodeobj.Id = NodeJsonobj.Id;
				Nodeobj.ClientGuid = NodeJsonobj.ClientGuid;
				Nodeobj.ServerId = NodeJsonobj.ServerId;
				Nodeobj.OSGuid = NodeJsonobj.OSGuid;
				Nodeobj.OVGuid = NodeJsonobj.OVGuid;
				Nodeobj.MobileVersionId = NodeJsonobj.MobileVersionId;
				Nodeobj.Code = NodeJsonobj.Code;
				Nodeobj.Type = NodeJsonobj.Type;
				Nodeobj.ReceiverBUId = NodeJsonobj.ReceiverBUId;
				Nodeobj.SupplierBUId = NodeJsonobj.SupplierBUId;
				Nodeobj.STNo = NodeJsonobj.STNo;
				Nodeobj.OTNo = NodeJsonobj.OTNo;
				Nodeobj.RCOMasterId = NodeJsonobj.RCOMasterId;
				Nodeobj.RCOMasterName = NodeJsonobj.RCOMasterName;
				//Nodeobj.RCOMasterClientGuid = NodeJsonobj.RCOMasterClientGuid;
				//Nodeobj.RCOTypeId = NodeJsonobj.RCOTypeId;
				//Nodeobj.ItemSection = NodeJsonobj.ItemSection;
				Nodeobj.Unit = NodeJsonobj.Unit;
				Nodeobj.OrderQuantity = NodeJsonobj.OrderQuantity;
				Nodeobj.OrderDate = NodeJsonobj.OrderDate;
				Nodeobj.DeliveredQuantity = NodeJsonobj.DeliveredQuantity;
				Nodeobj.DeliveredDate = NodeJsonobj.DeliveredDate;
				//Nodeobj.OrderType = NodeJsonobj.OrderType;
				Nodeobj.IsSynchronized = NodeJsonobj.IsSynchronized;
				Nodeobj.CreatedDate = NodeJsonobj.CreatedDate;
				Nodeobj.TimeStamp = NodeJsonobj.TimeStamp;
				Nodeobj.RCOMasterType = NodeJsonobj.RCOMasterType;
				Nodeobj.Col1 = NodeJsonobj.Col1;
				Nodeobj.Col2 = NodeJsonobj.Col2;
				Nodeobj.Col3 = NodeJsonobj.Col3;
				Nodeobj.Col4 = NodeJsonobj.Col4;
				Nodeobj.Col5 = NodeJsonobj.Col5;
				Nodeobj.Col6 = NodeJsonobj.Col6;
				Nodeobj.Col7 = NodeJsonobj.Col7;
				Nodeobj.Col8 = NodeJsonobj.Col8;
				Nodeobj.Col9 = NodeJsonobj.Col9;
				Nodeobj.Col10 = NodeJsonobj.Col10;
				Nodeobj.Col11 = NodeJsonobj.Col11;
				Nodeobj.Col12 = NodeJsonobj.Col12;
				Nodeobj.Col13 = NodeJsonobj.Col13;
				Nodeobj.Col14 = NodeJsonobj.Col14;
				Nodeobj.Col15 = NodeJsonobj.Col15;


				OneViewConsole.Debug("Normalize end", "OrderDetailsNormalizer.Normalize");

				return Nodeobj;
			}
			catch (Excep) {
				//alert('OrderDetailsNormalizer.Normalize Excep : ' + Excep);
				//alert('OrderDetailsNormalizer.Normalize Excep 22 : ' + JSON.stringify(Excep));
				throw oOneViewExceptionHandler.Create("Normalizer", "OrderDetailsNormalizer.Normalize", Excep);
			}
		}


		/// <summary>
		/// DTO list to node list conversion
		/// </summary>
		/// <param name="NodeName">Node name</param>
		/// <param name="MasterNodelst">Master node list (DTO from server)</param>
		/// <returns>Node list (Mobile entity format)</returns>
		this.NormalizeList = function (NodeName, MasterNodelst) {
			try {
				OneViewConsole.Debug("NormalizeList start", "OrderDetailsNormalizer.NormalizeList");
			  //  alert(MasterNodelst.length + ',OrderDetailsNormalizer MasterNodelst : ' + MasterNodelst);
				var NodesList = new Array();
				for (var i = 0; i < MasterNodelst.length; i++) {

					var Nodeobj = new window[NodeName]();
					var MasterNodesobj = MyInstance.Normalize(Nodeobj, MasterNodelst[i]);
					NodesList[i] = MasterNodesobj;
				}

				OneViewConsole.Debug("NormalizeList end", "OrderDetailsNormalizer.NormalizeList");

				return NodesList;
			}
			catch (Excep) {
				//alert('OrderDetailsNormalizer.NormalizeList Excep : ' + Excep);
				//alert('OrderDetailsNormalizer.NormalizeList Excep 22 : ' + JSON.stringify(Excep));
				throw oOneViewExceptionHandler.Create("Normalizer", "OrderDetailsNormalizer.NormalizeList", Excep);
			}
		}
	}

// ItemProcessMappingNormalizer
	function ItemProcessMappingNormalizer() {

		// NodeNormalizer object
		var MyInstance = this;


		/// <summary>
		/// DTO to node conversion
		/// </summary>
		/// <param name="Nodeobj">Node object (Mobile entity object)</param>
		/// <param name="NodeJsonobj">Node data object (DTO from server)</param>
		/// <returns>Node object (Mobile entity format)</returns>
		this.Normalize = function (Nodeobj, NodeJsonobj) {
			try {
				OneViewConsole.Debug("Normalize start", "ItemProcessMappingNormalizer.Normalize");
				/*
				Nodeobj.ServerId = NodeJsonobj.ServerId;
				Nodeobj.MobileVersionId = 1;
				Nodeobj.ServiceId = NodeJsonobj.ServiceId;

				Nodeobj.ProcessId = NodeJsonobj.ProcessId;
				Nodeobj.ProcessName = NodeJsonobj.ProcessName;
				Nodeobj.ProcessSequence = NodeJsonobj.ProcessSequence;

				Nodeobj.DataId = NodeJsonobj.DataId;
				Nodeobj.DataName = NodeJsonobj.DataName;
				Nodeobj.DataType = NodeJsonobj.DataType;
				*/

				Nodeobj.Id                     =  NodeJsonobj.Id ;
				Nodeobj.ServerId               =  NodeJsonobj.ServerId   ;
				Nodeobj.MobileVersionId        =  NodeJsonobj.MobileVersionId  ;
				Nodeobj.OVGuid                 =  NodeJsonobj.OVGuid    ;
				Nodeobj.ServiceId              =  NodeJsonobj.ServiceId ;
				Nodeobj.ProcessMappingDetails  =  NodeJsonobj.ProcessMappingDetails;
				Nodeobj.TimeStamp              =  NodeJsonobj.TimeStamp    ;



			   // Nodeobj.CreatedDate = NodeJsonobj.CreatedDate;

			   // alert('ItemProcessMappingNormalizer.Normalize Nodeobj : ' + JSON.stringify(Nodeobj));

				OneViewConsole.Debug("Normalize end", "ItemProcessMappingNormalizer.Normalize");

				return Nodeobj;
			}
			catch (Excep) {
				alert('ItemProcessMappingNormalizer.Normalize Excep : ' + Excep);
				alert('ItemProcessMappingNormalizer.Normalize Excep 22 : ' + JSON.stringify(Excep));
				throw oOneViewExceptionHandler.Create("Normalizer", "ItemProcessMappingNormalizer.Normalize", Excep);
			}
		}


		/// <summary>
		/// DTO list to node list conversion
		/// </summary>
		/// <param name="NodeName">Node name</param>
		/// <param name="MasterNodelst">Master node list (DTO from server)</param>
		/// <returns>Node list (Mobile entity format)</returns>
		this.NormalizeList = function (NodeName, MasterNodelst) {
			try {
				OneViewConsole.Debug("NormalizeList start", "ItemProcessMappingNormalizer.NormalizeList");
			  //  alert(MasterNodelst.length + ', ItemProcessMappingNormalizer MasterNodelst : ' + MasterNodelst);
				var NodesList = new Array();
				for (var i = 0; i < MasterNodelst.length; i++) {

					var Nodeobj = new window[NodeName]();
					var MasterNodesobj = MyInstance.Normalize(Nodeobj, MasterNodelst[i]);
					NodesList[i] = MasterNodesobj;
				}

				OneViewConsole.Debug("NormalizeList end", "ItemProcessMappingNormalizer.NormalizeList");

				return NodesList;
			}
			catch (Excep) {
			   // alert('ItemProcessMappingNormalizer.NormalizeList Excep : ' + Excep);
			   // alert('ItemProcessMappingNormalizer.NormalizeList Excep 22 : ' + JSON.stringify(Excep));
				throw oOneViewExceptionHandler.Create("Normalizer", "ItemProcessMappingNormalizer.NormalizeList", Excep);
			}
		}
	}

	// PurchaseOrderNormalizer
	function PurchaseOrderNormalizer() {

		// NodeNormalizer object
		var MyInstance = this;


		/// <summary>
		/// DTO to node conversion
		/// </summary>
		/// <param name="Nodeobj">Node object (Mobile entity object)</param>
		/// <param name="NodeJsonobj">Node data object (DTO from server)</param>
		/// <returns>Node object (Mobile entity format)</returns>
		this.Normalize = function (Nodeobj, NodeJsonobj) {
			try {
				OneViewConsole.Debug("Normalize start", "PurchaseOrderNormalizer.Normalize");

				Nodeobj.ServerId = NodeJsonobj.ServerId;
				Nodeobj.MobileVersionId = 1;
				Nodeobj.CreatedDate = NodeJsonobj.CreatedDate;
				Nodeobj.OSGuid = NodeJsonobj.OSGuid;
				Nodeobj.OVGuid = NodeJsonobj.OVGuid;
				Nodeobj.Code = NodeJsonobj.Code;
				Nodeobj.Type = NodeJsonobj.Type;

				Nodeobj.BusinessUnitId = NodeJsonobj.BusinessUnitId;
				Nodeobj.BusinessUnitName = NodeJsonobj.BusinessUnitName;
				Nodeobj.ItemMasterId = NodeJsonobj.ItemMasterId;
				Nodeobj.ItemMasterName = NodeJsonobj.ItemMasterName;
				Nodeobj.ItemCode = NodeJsonobj.ItemCode;
				Nodeobj.RcoTypeId = NodeJsonobj.RcoTypeId;

				Nodeobj.PurchaseOrderNo = NodeJsonobj.PurchaseOrderNo;
				Nodeobj.PurchaseOrderType = NodeJsonobj.PurchaseOrderType;
				Nodeobj.CompanyCode = NodeJsonobj.CompanyCode;
				Nodeobj.SupplierCode = NodeJsonobj.SupplierCode;
				Nodeobj.SupplierName = NodeJsonobj.SupplierName;
				Nodeobj.RequestDate = NodeJsonobj.RequestDate;
				Nodeobj.DeliveryDate = NodeJsonobj.DeliveryDate;

				Nodeobj.IsSynchronized = 'true';

			 //   if (NodeJsonobj.IsPOInActive == null) {
				Nodeobj.IsPOActive = 'true';
				Nodeobj.IsItemCompletedorInActive = 'false';
				Nodeobj.IsItemDCCompleted = 'false';
			   // }

				OneViewConsole.Debug("Normalize end", "PurchaseOrderNormalizer.Normalize");

				return Nodeobj;
			}
			catch (Excep) {
				//alert('PurchaseOrderNormalizer.Normalize Excep : ' + Excep);
				//alert('PurchaseOrderNormalizer.Normalize Excep 22 : ' + JSON.stringify(Excep));
				throw oOneViewExceptionHandler.Create("Normalizer", "PurchaseOrderNormalizer.Normalize", Excep);
			}
		}


		/// <summary>
		/// DTO list to node list conversion
		/// </summary>
		/// <param name="NodeName">Node name</param>
		/// <param name="MasterNodelst">Master node list (DTO from server)</param>
		/// <returns>Node list (Mobile entity format)</returns>
		this.NormalizeList = function (NodeName, MasterNodelst) {
			try {
				OneViewConsole.Debug("NormalizeList start", "PurchaseOrderNormalizer.NormalizeList");
				//  alert(MasterNodelst.length + ',PurchaseOrderNormalizer MasterNodelst : ' + MasterNodelst);
				var NodesList = new Array();
				for (var i = 0; i < MasterNodelst.length; i++) {

					var Nodeobj = new window[NodeName]();
					var MasterNodesobj = MyInstance.Normalize(Nodeobj, MasterNodelst[i]);
					NodesList[i] = MasterNodesobj;
				}

				OneViewConsole.Debug("NormalizeList end", "PurchaseOrderNormalizer.NormalizeList");

				return NodesList;
			}
			catch (Excep) {
				//alert('PurchaseOrderNormalizer.NormalizeList Excep : ' + Excep);
				//alert('PurchaseOrderNormalizer.NormalizeList Excep 22 : ' + JSON.stringify(Excep));
				throw oOneViewExceptionHandler.Create("Normalizer", "PurchaseOrderNormalizer.NormalizeList", Excep);
			}
		}
	}

	//TemplateValidationConfig Normalizer
	function ExcludedAttributeMetadataNormalizer() {

		// ExcludedAttributeMetadataNormalizer object
		var MyInstance = this;

		var _oDateTime = new DateTime();
		var CurrentDateAndTime = _oDateTime.GetDateAndTime();

		/// <summary>
		/// DTO to ExcludedAttributeMetadata conversion
		/// </summary>
		/// <param name="ExcludedAttributeMetadataDTO">ExcludedAttributeMetadata DTO (DTO from server)</param>
		/// <returns>TemplateValidationConfig (Mobile entity format)</returns>
		this.Normalize = function (ExcludedAttributeMetadataDTO) {
			try {
				OneViewConsole.Debug("Normalize start", "ExcludedAttributeMetadataNormalizer.Normalize");

				var _oExcludedAttributeMetadataEntity = new ExcludedAttributeMetadataEntity();

				_oExcludedAttributeMetadataEntity.ServerId = (ExcludedAttributeMetadataDTO.ServerId != undefined) ? ExcludedAttributeMetadataDTO.ServerId : "";
				_oExcludedAttributeMetadataEntity.ServiceId = ExcludedAttributeMetadataDTO.ServiceId;
				_oExcludedAttributeMetadataEntity.MobileVersionId = 1;
				_oExcludedAttributeMetadataEntity.OVGuid = (ExcludedAttributeMetadataDTO.OVGuid != undefined) ? ExcludedAttributeMetadataDTO.OVGuid : 0;


				_oExcludedAttributeMetadataEntity.UserId = ExcludedAttributeMetadataDTO.UserId;
				_oExcludedAttributeMetadataEntity.TemplateNodeId = ExcludedAttributeMetadataDTO.TemplateNodeId;
				_oExcludedAttributeMetadataEntity.PlaceId = ExcludedAttributeMetadataDTO.PlaceId;
				_oExcludedAttributeMetadataEntity.AttributeIdLst = ExcludedAttributeMetadataDTO.AttributeIdLst;



				_oExcludedAttributeMetadataEntity.CreatedDate = (ExcludedAttributeMetadataDTO.CreatedDate != undefined) ? ExcludedAttributeMetadataDTO.CreatedDate : "";
				_oExcludedAttributeMetadataEntity.TimeStamp = CurrentDateAndTime;

				return _oExcludedAttributeMetadataEntity;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Normalizer", "ExcludedAttributeMetadataNormalizer.Normalize", Excep);
			}
		}


		/// <summary>
		/// DTO list to ExcludedAttributeMetadata list conversion
		/// </summary>
		/// <param name="ExcludedAttributeMetadataDTOList">ExcludedAttributeMetadataDTO list dto (DTO from server)</param>
		/// <returns>TemplateValidationConfig list (Mobile entity format)</returns>
		this.NormalizeList = function (ExcludedAttributeMetadataDTOList) {
			try {
				OneViewConsole.Debug("NormalizeList start", "ExcludedAttributeMetadataNormalizer.NormalizeList");

				var ExcludedAttributeMetadataList = new Array();
				for (var i = 0; i < ExcludedAttributeMetadataDTOList.length; i++) {
					ExcludedAttributeMetadataList[i] = MyInstance.Normalize(ExcludedAttributeMetadataDTOList[i]);
				}

				OneViewConsole.Debug("NormalizeList end", "ExcludedAttributeMetadataNormalizer.NormalizeList");

				return ExcludedAttributeMetadataList;
			}
			catch (Excep) {
				throw oOneViewExceptionHandler.Create("Normalizer", "ExcludedAttributeMetadataNormalizer.NormalizeList", Excep);
			}
		}
	}

	// WorkOrderItemDetailsNormalizer
	function WorkOrderItemDetailsNormalizer() {

		// NodeNormalizer object
		var MyInstance = this;


		/// <summary>
		/// DTO to node conversion
		/// </summary>
		/// <param name="Nodeobj">Node object (Mobile entity object)</param>
		/// <param name="NodeJsonobj">Node data object (DTO from server)</param>
		/// <returns>Node object (Mobile entity format)</returns>
		this.Normalize = function (Nodeobj, NodeJsonobj) {
			try {
				OneViewConsole.Debug("Normalize start", "PurchaseOrderNormalizer.Normalize");


				Nodeobj.ServerId = NodeJsonobj.ServerId;
				Nodeobj.OSGuid = NodeJsonobj.OSGuid;
				Nodeobj.OVGuid = NodeJsonobj.OVGuid;
				Nodeobj.MobileVersionId =1;
				Nodeobj.Type = NodeJsonobj.Type;

				Nodeobj.BusinessUnitId = NodeJsonobj.BusinessUnitId;
				Nodeobj.BusinessUnitName = NodeJsonobj.BusinessUnitName;
				Nodeobj.BusinessUnitCode = NodeJsonobj.BusinessUnitCode;
				Nodeobj.SectionId = NodeJsonobj.SectionId;
				Nodeobj.SectionName = NodeJsonobj.SectionName;
				Nodeobj.SectionCode = NodeJsonobj.SectionCode;
				Nodeobj.WorkOrderNo = NodeJsonobj.WorkOrderNo;
				Nodeobj.ItemMasterId = NodeJsonobj.ItemMasterId;
				Nodeobj.ItemMasterName = NodeJsonobj.ItemMasterName;
				Nodeobj.ItemMasterCode = NodeJsonobj.ItemMasterCode;
				Nodeobj.RequestDate = NodeJsonobj.RequestDate;
				Nodeobj.StartDate = NodeJsonobj.StartDate;
				Nodeobj.ParentItemMasterId = NodeJsonobj.ParentItemMasterId;
				Nodeobj.ParentItemMasterName = NodeJsonobj.ParentItemMasterName;
				Nodeobj.ParentItemMasterCode = NodeJsonobj.ParentItemMasterCode;
				Nodeobj.Sector = NodeJsonobj.Sector;
				Nodeobj.AirlineId = NodeJsonobj.AirlineId;
				Nodeobj.AirlineName = NodeJsonobj.AirlineName;
				Nodeobj.FlightId = NodeJsonobj.FlightId;
				Nodeobj.FlightName = NodeJsonobj.FlightName;
				Nodeobj.Class = NodeJsonobj.Class;
				Nodeobj.MealTypeName = NodeJsonobj.MealTypeName;
				Nodeobj.CompanyMasterId = NodeJsonobj.CompanyMasterId;
				Nodeobj.RequiredQuantity = NodeJsonobj.RequiredQuantity;
				Nodeobj.UOM = NodeJsonobj.UOM;
				Nodeobj.Status = NodeJsonobj.Status;
				Nodeobj.ParentInfo = NodeJsonobj.ParentInfo;

				OneViewConsole.Debug("Normalize end", "PurchaseOrderNormalizer.Normalize");

				return Nodeobj;
			}
			catch (Excep) {
				//alert('PurchaseOrderNormalizer.Normalize Excep : ' + Excep);
				//alert('PurchaseOrderNormalizer.Normalize Excep 22 : ' + JSON.stringify(Excep));
				throw oOneViewExceptionHandler.Create("Normalizer", "PurchaseOrderNormalizer.Normalize", Excep);
			}
		}


		/// <summary>
		/// DTO list to node list conversion
		/// </summary>
		/// <param name="NodeName">Node name</param>
		/// <param name="MasterNodelst">Master node list (DTO from server)</param>
		/// <returns>Node list (Mobile entity format)</returns>
		this.NormalizeList = function (NodeName, MasterNodelst) {
			try {
				OneViewConsole.Debug("NormalizeList start", "WorkOrderItemDetailsNormalizer.NormalizeList");
				//  alert(MasterNodelst.length + ',PurchaseOrderNormalizer MasterNodelst : ' + MasterNodelst);
				var NodesList = new Array();
				for (var i = 0; i < MasterNodelst.length; i++) {

					var Nodeobj = new window[NodeName]();
					var MasterNodesobj = MyInstance.Normalize(Nodeobj, MasterNodelst[i]);
					NodesList[i] = MasterNodesobj;
				}

				OneViewConsole.Debug("NormalizeList end", "WorkOrderItemDetailsNormalizer.NormalizeList");

				return NodesList;
			}
			catch (Excep) {
				//alert('PurchaseOrderNormalizer.NormalizeList Excep : ' + Excep);
				//alert('PurchaseOrderNormalizer.NormalizeList Excep 22 : ' + JSON.stringify(Excep));
				throw oOneViewExceptionHandler.Create("Normalizer", "WorkOrderItemDetailsNormalizer.NormalizeList", Excep);
			}
		}
	}


	function FlightBeltPlanDetailsNormalizer() {

		// NodeNormalizer object
		var MyInstance = this;


		/// <summary>
		/// DTO to node conversion
		/// </summary>
		/// <param name="Nodeobj">Node object (Mobile entity object)</param>
		/// <param name="NodeJsonobj">Node data object (DTO from server)</param>
		/// <returns>Node object (Mobile entity format)</returns>
		this.Normalize = function (Nodeobj, NodeJsonobj) {
			try {
				OneViewConsole.Debug("Normalize start", "FlightBeltPlanDetailsNormalizer.Normalize");


				Nodeobj.ServerId = NodeJsonobj.ServerId;
				Nodeobj.OSGuid = NodeJsonobj.OSGuid;
				Nodeobj.OVGuid = NodeJsonobj.OVGuid;
				Nodeobj.MobileVersionId = 1;
				Nodeobj.Type = NodeJsonobj.Type;

				Nodeobj.Airline = NodeJsonobj.Airline;
				Nodeobj.FlightNo = NodeJsonobj.FlightNo;
				Nodeobj.AircraftType = NodeJsonobj.AircraftType;
				Nodeobj.Regn = NodeJsonobj.Regn;
				Nodeobj.SDD = NodeJsonobj.SDD;
				Nodeobj.ETD = NodeJsonobj.ETD;
				Nodeobj.FlightPlanFrom = NodeJsonobj.From;
				Nodeobj.FlightPlanTo = NodeJsonobj.To;
				Nodeobj.FCONo = NodeJsonobj.FCONo;
				Nodeobj.Rev = NodeJsonobj.Rev;
				Nodeobj.Class = NodeJsonobj.Class;
				Nodeobj.Config = NodeJsonobj.Config;
				Nodeobj.Load = NodeJsonobj.Load;
				Nodeobj.Normal = NodeJsonobj.Normal;
				Nodeobj.SPMLTotal = NodeJsonobj.SPMLTotal;
				Nodeobj.SPML = NodeJsonobj.SPML;
				Nodeobj.CompanyName = NodeJsonobj.CompanyName;
				Nodeobj.CompanyId = NodeJsonobj.CompanyId;
				Nodeobj.BeltName = NodeJsonobj.BeltName;
				Nodeobj.BeltId = NodeJsonobj.BeltId;
				Nodeobj.UPLift = NodeJsonobj.UPLift;

				OneViewConsole.Debug("Normalize end", "FlightBeltPlanDetailsNormalizer.Normalize");

				return Nodeobj;
			}
			catch (Excep) {
				//alert('PurchaseOrderNormalizer.Normalize Excep : ' + Excep);
				//alert('PurchaseOrderNormalizer.Normalize Excep 22 : ' + JSON.stringify(Excep));
				throw oOneViewExceptionHandler.Create("Normalizer", "FlightBeltPlanDetailsNormalizer.Normalize", Excep);
			}
		}


		/// <summary>
		/// DTO list to node list conversion
		/// </summary>
		/// <param name="NodeName">Node name</param>
		/// <param name="MasterNodelst">Master node list (DTO from server)</param>
		/// <returns>Node list (Mobile entity format)</returns>
		this.NormalizeList = function (NodeName, MasterNodelst) {
			try {
				OneViewConsole.Debug("NormalizeList start", "FlightBeltPlanDetailsNormalizer.NormalizeList");
				//  alert(MasterNodelst.length + ',PurchaseOrderNormalizer MasterNodelst : ' + MasterNodelst);
				var NodesList = new Array();
				for (var i = 0; i < MasterNodelst.length; i++) {

					var Nodeobj = new window[NodeName]();
					var MasterNodesobj = MyInstance.Normalize(Nodeobj, MasterNodelst[i]);
					NodesList[i] = MasterNodesobj;
				}

				OneViewConsole.Debug("NormalizeList end", "FlightBeltPlanDetailsNormalizer.NormalizeList");

				return NodesList;
			}
			catch (Excep) {
				//alert('PurchaseOrderNormalizer.NormalizeList Excep : ' + Excep);
				//alert('PurchaseOrderNormalizer.NormalizeList Excep 22 : ' + JSON.stringify(Excep));
				throw oOneViewExceptionHandler.Create("Normalizer", "FlightBeltPlanDetailsNormalizer.NormalizeList", Excep);
			}
		}
	}


	function FlightCellPlanDetailsNormalizer() {

		// NodeNormalizer object
		var MyInstance = this;


		/// <summary>
		/// DTO to node conversion
		/// </summary>
		/// <param name="Nodeobj">Node object (Mobile entity object)</param>
		/// <param name="NodeJsonobj">Node data object (DTO from server)</param>
		/// <returns>Node object (Mobile entity format)</returns>
		this.Normalize = function (Nodeobj, NodeJsonobj) {
			try {
				OneViewConsole.Debug("Normalize start", "FlightBeltPlanDetailsNormalizer.Normalize");


				Nodeobj.ServerId = NodeJsonobj.ServerId;
				Nodeobj.OSGuid = NodeJsonobj.OSGuid;
				Nodeobj.OVGuid = NodeJsonobj.OVGuid;
				Nodeobj.MobileVersionId = 1;
				Nodeobj.Type = NodeJsonobj.Type;

				Nodeobj.Airline = NodeJsonobj.Airline;
				Nodeobj.FlightNo = NodeJsonobj.FlightNo;
				Nodeobj.AircraftType = NodeJsonobj.AircraftType;
				Nodeobj.Regn = NodeJsonobj.Regn;
				Nodeobj.SDD = NodeJsonobj.SDD;
				Nodeobj.ETD = NodeJsonobj.ETD;
				Nodeobj.FlightPlanFrom = NodeJsonobj.From;
				Nodeobj.FlightPlanTo = NodeJsonobj.To;
				Nodeobj.FCONo = NodeJsonobj.FCONo;
				Nodeobj.Rev = NodeJsonobj.Rev;
				Nodeobj.Class = NodeJsonobj.Class;
				Nodeobj.Config = NodeJsonobj.Config;
				Nodeobj.Load = NodeJsonobj.Load;
				Nodeobj.Normal = NodeJsonobj.Normal;
				Nodeobj.SPMLTotal = NodeJsonobj.SPMLTotal;
				Nodeobj.SPML = NodeJsonobj.SPML;
				Nodeobj.CompanyName = NodeJsonobj.CompanyName;
				Nodeobj.CompanyId = NodeJsonobj.CompanyId;
				Nodeobj.CellName = NodeJsonobj.CellName;
				Nodeobj.CellId = NodeJsonobj.CellId;
				Nodeobj.UPLift = NodeJsonobj.UPLift;

				OneViewConsole.Debug("Normalize end", "FlightBeltPlanDetailsNormalizer.Normalize");

				return Nodeobj;
			}
			catch (Excep) {
				//alert('PurchaseOrderNormalizer.Normalize Excep : ' + Excep);
				//alert('PurchaseOrderNormalizer.Normalize Excep 22 : ' + JSON.stringify(Excep));
				throw oOneViewExceptionHandler.Create("Normalizer", "FlightBeltPlanDetailsNormalizer.Normalize", Excep);
			}
		}


		/// <summary>
		/// DTO list to node list conversion
		/// </summary>
		/// <param name="NodeName">Node name</param>
		/// <param name="MasterNodelst">Master node list (DTO from server)</param>
		/// <returns>Node list (Mobile entity format)</returns>
		this.NormalizeList = function (NodeName, MasterNodelst) {
			try {
				OneViewConsole.Debug("NormalizeList start", "FlightCellPlanDetailsNormalizer.NormalizeList");
				//  alert(MasterNodelst.length + ',PurchaseOrderNormalizer MasterNodelst : ' + MasterNodelst);
				var NodesList = new Array();
				for (var i = 0; i < MasterNodelst.length; i++) {

					var Nodeobj = new window[NodeName]();
					var MasterNodesobj = MyInstance.Normalize(Nodeobj, MasterNodelst[i]);
					NodesList[i] = MasterNodesobj;
				}

				OneViewConsole.Debug("NormalizeList end", "FlightCellDetailsNormalizer.NormalizeList");

				return NodesList;
			}
			catch (Excep) {
				//alert('PurchaseOrderNormalizer.NormalizeList Excep : ' + Excep);
				//alert('PurchaseOrderNormalizer.NormalizeList Excep 22 : ' + JSON.stringify(Excep));
				throw oOneViewExceptionHandler.Create("Normalizer", "FlightCellPlanDetailsNormalizer.NormalizeList", Excep);
			}
		}
	}



	function FlightOALPlanDetailsNormalizer() {

		// NodeNormalizer object
		var MyInstance = this;


		/// <summary>
		/// DTO to node conversion
		/// </summary>
		/// <param name="Nodeobj">Node object (Mobile entity object)</param>
		/// <param name="NodeJsonobj">Node data object (DTO from server)</param>
		/// <returns>Node object (Mobile entity format)</returns>
		this.Normalize = function (Nodeobj, NodeJsonobj) {
			try {
				OneViewConsole.Debug("Normalize start", "FlightOALPlanDetailsNormalizer.Normalize");


				Nodeobj.ServerId = NodeJsonobj.ServerId;
				Nodeobj.OSGuid = NodeJsonobj.OSGuid;
				Nodeobj.OVGuid = NodeJsonobj.OVGuid;
				Nodeobj.MobileVersionId = 1;
				Nodeobj.Type = NodeJsonobj.Type;

				Nodeobj.Airline = NodeJsonobj.Airline;
				Nodeobj.FlightNo = NodeJsonobj.FlightNo;
				Nodeobj.FlightId = NodeJsonobj.FlightId;
				Nodeobj.AircraftType = NodeJsonobj.AircraftType;
				Nodeobj.Regn = NodeJsonobj.Regn;
				Nodeobj.SDD = NodeJsonobj.SDD;
				Nodeobj.ETD = NodeJsonobj.ETD;
				Nodeobj.FlightPlanFrom = NodeJsonobj.From;
				Nodeobj.FlightPlanTo = NodeJsonobj.To;
				Nodeobj.FCONo = NodeJsonobj.FCONo;
				Nodeobj.Rev = NodeJsonobj.Rev;
				Nodeobj.Class = NodeJsonobj.Class;
				Nodeobj.Config = NodeJsonobj.Config;
				Nodeobj.Load = NodeJsonobj.Load;
				Nodeobj.Normal = NodeJsonobj.Normal;
				Nodeobj.SPMLTotal = NodeJsonobj.SPMLTotal;
				Nodeobj.SPML = NodeJsonobj.SPML;
				Nodeobj.CompanyName = NodeJsonobj.CompanyName;
				Nodeobj.CompanyId = NodeJsonobj.CompanyId;
				Nodeobj.CellName = NodeJsonobj.BeltName;
				Nodeobj.CellId = NodeJsonobj.BeltId;
				Nodeobj.UPLift = NodeJsonobj.UPLift;

				OneViewConsole.Debug("Normalize end", "FlightOALPlanDetailsNormalizer.Normalize");

				return Nodeobj;
			}
			catch (Excep) {
				//alert('PurchaseOrderNormalizer.Normalize Excep : ' + Excep);
				//alert('PurchaseOrderNormalizer.Normalize Excep 22 : ' + JSON.stringify(Excep));
				throw oOneViewExceptionHandler.Create("Normalizer", "FlightOALPlanDetailsNormalizer.Normalize", Excep);
			}
		}


		/// <summary>
		/// DTO list to node list conversion
		/// </summary>
		/// <param name="NodeName">Node name</param>
		/// <param name="MasterNodelst">Master node list (DTO from server)</param>
		/// <returns>Node list (Mobile entity format)</returns>
		this.NormalizeList = function (NodeName, MasterNodelst) {
			try {
				OneViewConsole.Debug("NormalizeList start", "FlightOALPlanDetailsNormalizer.NormalizeList");
				//  alert(MasterNodelst.length + ',PurchaseOrderNormalizer MasterNodelst : ' + MasterNodelst);
				var NodesList = new Array();
				for (var i = 0; i < MasterNodelst.length; i++) {

					var Nodeobj = new window[NodeName]();
					var MasterNodesobj = MyInstance.Normalize(Nodeobj, MasterNodelst[i]);
					NodesList[i] = MasterNodesobj;
				}

				OneViewConsole.Debug("NormalizeList end", "FlightOALPlanDetailsNormalizer.NormalizeList");

				return NodesList;
			}
			catch (Excep) {
				//alert('PurchaseOrderNormalizer.NormalizeList Excep : ' + Excep);
				//alert('PurchaseOrderNormalizer.NormalizeList Excep 22 : ' + JSON.stringify(Excep));
				throw oOneViewExceptionHandler.Create("Normalizer", "FlightOALPlanDetailsNormalizer.NormalizeList", Excep);
			}
		}
	}


	function PickListMasterDetailsNormalizer() {

		// NodeNormalizer object
		var MyInstance = this;


		/// <summary>
		/// DTO to node conversion
		/// </summary>
		/// <param name="Nodeobj">Node object (Mobile entity object)</param>
		/// <param name="NodeJsonobj">Node data object (DTO from server)</param>
		/// <returns>Node object (Mobile entity format)</returns>
		this.Normalize = function (Nodeobj, NodeJsonobj) {
			try {
				OneViewConsole.Debug("Normalize start", "PickListMasterDetailsNormalizer.Normalize");


				Nodeobj.ServerId = NodeJsonobj.ServerId;
				Nodeobj.OSGuid = NodeJsonobj.OSGuid;
				Nodeobj.OVGuid = NodeJsonobj.OVGuid;
				Nodeobj.MobileVersionId = 1;
				Nodeobj.Type = NodeJsonobj.Type;

				Nodeobj.FlightPlanType = NodeJsonobj.FlightPlanType;
				Nodeobj.FlightPlanId = NodeJsonobj.FlightPlanId;
				Nodeobj.ScheduleDate = NodeJsonobj.ScheduleDate;
				Nodeobj.ITEMCode = NodeJsonobj.ITEMCode;
				Nodeobj.ItemName = NodeJsonobj.ItemName;


				OneViewConsole.Debug("Normalize end", "PickListMasterDetailsNormalizer.Normalize");

				return Nodeobj;
			}
			catch (Excep) {
				//alert('PurchaseOrderNormalizer.Normalize Excep : ' + Excep);
				//alert('PurchaseOrderNormalizer.Normalize Excep 22 : ' + JSON.stringify(Excep));
				throw oOneViewExceptionHandler.Create("Normalizer", "PickListMasterDetailsNormalizer.Normalize", Excep);
			}
		}


		/// <summary>
		/// DTO list to node list conversion
		/// </summary>
		/// <param name="NodeName">Node name</param>
		/// <param name="MasterNodelst">Master node list (DTO from server)</param>
		/// <returns>Node list (Mobile entity format)</returns>
		this.NormalizeList = function (NodeName, MasterNodelst) {
			try {
				OneViewConsole.Debug("NormalizeList start", "PickListMasterDetailsNormalizer.NormalizeList");
				//  alert(MasterNodelst.length + ',PurchaseOrderNormalizer MasterNodelst : ' + MasterNodelst);
				var NodesList = new Array();
				for (var i = 0; i < MasterNodelst.length; i++) {

					var Nodeobj = new window[NodeName]();
					var MasterNodesobj = MyInstance.Normalize(Nodeobj, MasterNodelst[i]);
					NodesList[i] = MasterNodesobj;
				}

				OneViewConsole.Debug("NormalizeList end", "PickListMasterDetailsNormalizer.NormalizeList");

				return NodesList;
			}
			catch (Excep) {
				//alert('PurchaseOrderNormalizer.NormalizeList Excep : ' + Excep);
				//alert('PurchaseOrderNormalizer.NormalizeList Excep 22 : ' + JSON.stringify(Excep));
				throw oOneViewExceptionHandler.Create("Normalizer", "PickListMasterDetailsNormalizer.NormalizeList", Excep);
			}
		}
	}

	function ASOWorkOrderDetailsNormalizer() {

		// NodeNormalizer object
		var MyInstance = this;


		/// <summary>
		/// DTO to node conversion
		/// </summary>
		/// <param name="Nodeobj">Node object (Mobile entity object)</param>
		/// <param name="NodeJsonobj">Node data object (DTO from server)</param>
		/// <returns>Node object (Mobile entity format)</returns>
		this.Normalize = function (Nodeobj, NodeJsonobj) {
			try {
				OneViewConsole.Debug("Normalize start", "ASOWorkOrderDetailsNormalizer.Normalize");

				Nodeobj.ServerId = NodeJsonobj.ServerId;
				Nodeobj.OSGuid = NodeJsonobj.OSGuid;
				Nodeobj.OVGuid = NodeJsonobj.OVGuid;
				Nodeobj.MobileVersionId = 1;
				Nodeobj.Type = NodeJsonobj.Type;

				Nodeobj.AirlineId = NodeJsonobj.AirlineId;
				Nodeobj.Airline = NodeJsonobj.Airline;
				Nodeobj.FlightId = NodeJsonobj.FlightId;
				Nodeobj.FlightNo = NodeJsonobj.FlightNo;
				Nodeobj.Sector = NodeJsonobj.Sector;
				Nodeobj.Class = NodeJsonobj.Class;
				Nodeobj.ItemCode = NodeJsonobj.ItemCode;
				Nodeobj.ItemName = NodeJsonobj.ItemName;
				Nodeobj.MealType = NodeJsonobj.MealType;
				Nodeobj.DespatchGroup = NodeJsonobj.DespatchGroup;
				Nodeobj.ETA = NodeJsonobj.ETA;
				Nodeobj.ETD = NodeJsonobj.ETD;
				Nodeobj.WorkOrderFrom = NodeJsonobj.From;
				Nodeobj.WorkOrderTo = NodeJsonobj.To;
				Nodeobj.IsChecked = NodeJsonobj.IsChecked;
				Nodeobj.IsNC = NodeJsonobj.IsNC;
				Nodeobj.CompanyId = NodeJsonobj.CompanyId;
				Nodeobj.CompanyName = NodeJsonobj.CompanyName;

				OneViewConsole.Debug("Normalize end", "ASOWorkOrderDetailsNormalizer.Normalize");

				return Nodeobj;
			}
			catch (Excep) {
				//alert('PurchaseOrderNormalizer.Normalize Excep : ' + Excep);
				//alert('PurchaseOrderNormalizer.Normalize Excep 22 : ' + JSON.stringify(Excep));
				throw oOneViewExceptionHandler.Create("Normalizer", "ASOWorkOrderDetailsNormalizer.Normalize", Excep);
			}
		}


		/// <summary>
		/// DTO list to node list conversion
		/// </summary>
		/// <param name="NodeName">Node name</param>
		/// <param name="MasterNodelst">Master node list (DTO from server)</param>
		/// <returns>Node list (Mobile entity format)</returns>
		this.NormalizeList = function (NodeName, MasterNodelst) {
			try {
				OneViewConsole.Debug("NormalizeList start", "ASOWorkOrderDetailsNormalizer.NormalizeList");
				//  alert(MasterNodelst.length + ',PurchaseOrderNormalizer MasterNodelst : ' + MasterNodelst);
				var NodesList = new Array();
				for (var i = 0; i < MasterNodelst.length; i++) {

					var Nodeobj = new window[NodeName]();
					var MasterNodesobj = MyInstance.Normalize(Nodeobj, MasterNodelst[i]);
					NodesList[i] = MasterNodesobj;
				}

				OneViewConsole.Debug("NormalizeList end", "ASOWorkOrderDetailsNormalizer.NormalizeList");

				return NodesList;
			}
			catch (Excep) {
				//alert('PurchaseOrderNormalizer.NormalizeList Excep : ' + Excep);
				//alert('PurchaseOrderNormalizer.NormalizeList Excep 22 : ' + JSON.stringify(Excep));
				throw oOneViewExceptionHandler.Create("Normalizer", "ASOWorkOrderDetailsNormalizer.NormalizeList", Excep);
			}
		}
	}

	function RFLWorkOrderNormalizer() {

		// NodeNormalizer object
		var MyInstance = this;


		/// <summary>
		/// DTO to node conversion
		/// </summary>
		/// <param name="Nodeobj">Node object (Mobile entity object)</param>
		/// <param name="NodeJsonobj">Node data object (DTO from server)</param>
		/// <returns>Node object (Mobile entity format)</returns>
		this.Normalize = function (Nodeobj, NodeJsonobj) {
			try {
				OneViewConsole.Debug("Normalize start", "RFLWorkOrderNormalizer.Normalize");

				Nodeobj.ServerId = NodeJsonobj.ServerId;
				Nodeobj.OSGuid = NodeJsonobj.OSGuid;
				Nodeobj.OVGuid = NodeJsonobj.OVGuid;
				Nodeobj.MobileVersionId = 1;
				Nodeobj.Type = NodeJsonobj.Type;

				Nodeobj.WardId = NodeJsonobj.WardId;
				Nodeobj.ItemName = NodeJsonobj.ItemName;
				Nodeobj.ItemId = NodeJsonobj.ItemId;
				Nodeobj.OrderTypeId = NodeJsonobj.OrderTypeId;
				Nodeobj.OrderTypeName = NodeJsonobj.OrderTypeName;
				Nodeobj.DietCode = NodeJsonobj.DietCode;
				Nodeobj.Allergens = NodeJsonobj.Allergens;
				Nodeobj.ServiceDate = NodeJsonobj.ServiceDate;
				Nodeobj.Quantity = NodeJsonobj.Quantity;
				Nodeobj.OrderDetails = NodeJsonobj.OrderDetails;
				Nodeobj.PackedQuantity = NodeJsonobj.PackedQuantity;
				Nodeobj.PackedDetails = NodeJsonobj.PackedDetails;
				Nodeobj.PackedRemarks = NodeJsonobj.PackedRemarks;
				Nodeobj.CookedQuantity = NodeJsonobj.CookedQuantity;
				Nodeobj.CookedDate = NodeJsonobj.CookedDate;
				Nodeobj.CookedRemarks = NodeJsonobj.CookedRemarks;
				Nodeobj.CookedDetails = NodeJsonobj.CookedDetails;
				Nodeobj.CreatedDate = NodeJsonobj.CreatedDate;
				Nodeobj.OrderStatus = NodeJsonobj.OrderStatus;
				Nodeobj.CurrentStatus = NodeJsonobj.CurrentStatus;

				OneViewConsole.Debug("Normalize end", "RFLWorkOrderNormalizer.Normalize");

				return Nodeobj;
			}
			catch (Excep) {
				//alert('PurchaseOrderNormalizer.Normalize Excep : ' + Excep);
				//alert('PurchaseOrderNormalizer.Normalize Excep 22 : ' + JSON.stringify(Excep));
				throw oOneViewExceptionHandler.Create("Normalizer", "RFLWorkOrderNormalizer.Normalize", Excep);
			}
		}


		/// <summary>
		/// DTO list to node list conversion
		/// </summary>
		/// <param name="NodeName">Node name</param>
		/// <param name="MasterNodelst">Master node list (DTO from server)</param>
		/// <returns>Node list (Mobile entity format)</returns>
		this.NormalizeList = function (NodeName, MasterNodelst) {
			try {
				OneViewConsole.Debug("NormalizeList start", "RFLWorkOrderNormalizer.NormalizeList");
				//  alert(MasterNodelst.length + ',PurchaseOrderNormalizer MasterNodelst : ' + MasterNodelst);
				var NodesList = new Array();
				for (var i = 0; i < MasterNodelst.length; i++) {

					var Nodeobj = new window[NodeName]();
					var MasterNodesobj = MyInstance.Normalize(Nodeobj, MasterNodelst[i]);
					NodesList[i] = MasterNodesobj;
				}

				OneViewConsole.Debug("NormalizeList end", "RFLWorkOrderNormalizer.NormalizeList");

				return NodesList;
			}
			catch (Excep) {
				//alert('PurchaseOrderNormalizer.NormalizeList Excep : ' + Excep);
				//alert('PurchaseOrderNormalizer.NormalizeList Excep 22 : ' + JSON.stringify(Excep));
				throw oOneViewExceptionHandler.Create("Normalizer", "RFLWorkOrderNormalizer.NormalizeList", Excep);
			}
		}
	}

