
//Description      :Login Controller for authenticating the user and loading the next page.
/// <param name="$scope">Current scope</param>
/// <param name="xlatService">xlatService for globalization</param>
/// <param name="toaster">toaster for toast messages</param>
/// <param name="SpinService">SpinService for loader</param>
/// <param name="ionicModal">UI Framework for design and style</param>
/// <param name="timeout">Delay(Time duration)</param>
var GlobalxlatService = null;
var GlobalScope = null;
var GlobalLocation = null;
MyApp.controller('LoginController', function ($scope, $location, $timeout, xlatService) {
  
    $scope.User = {'UserName' : '' ,'Password' : '' , 'OrganizationName' : '' ,'RememberCredentials' : ''};
    xlatService.setCurrentPage('2');
    GlobalxlatService = xlatService;
    GlobalScope = $scope;
    GlobalLocation = $location;
    var oLoginFacade = new LoginFacade(xlatService, $timeout);

    oLoginFacade.Init();
    oLoginFacade.ShowLastLoginUserDetails($scope);
    oLoginFacade.AutoLoginAndRefresh($scope, $location);
    //commented to stop auto-login after upgrade completes, to solve apk corrupting issue(process indicator stop issue)
    //oLoginFacade.AutoLoginOnAPKUpgradeProcessCompleted($scope, $location);
     

    $scope.preventPaste = function (e) {
        e.preventDefault();
        return false;
    };

    /// <summary>
    /// To trigger the validation after providing user credentials.
    /// </summary>
    $scope.Login = function () {
        oLoginFacade.Login($scope, $location, '', '');
    };

    $scope.CopyDbAcrossServiceEvent = function () {
        oLoginFacade.CopyDbAcrossServiceEvent();
    };

    $scope.UploadDbAcrossService = function () {
        oLoginFacade.UploadDbAcrossService();
    };

    $scope.UploadImagesAndDbAcrossService = function () {
        oLoginFacade.UploadImagesAndDbAcrossService();
    };

    $scope.$on('$destroy', function () {
        oLoginFacade.Destroy();
      
    });

})


/// <summary>
/// Login Facade Layer(Assembler code / Work flow code).
/// </summary>
/// <returns></returns>
 
function LoginFacade(xlatService, $timeout) {

    //Description      :Login Configuration  list which contains what type of validation enabled and a method name.
    this.Login_ClientValidatorConfigList = [{ 'IsDefaultClientValidator': false, 'IsCustomClientValidator': true, 'ClassName': 'MandatoryValidation' }];
    var MyInstance = this;
    var oLoginBO = new LoginBO();
    var oAPKUpgradeProcessStatus = OneViewLocalStorage.Get("APKUpgradeProcessStatus");
    if (oAPKUpgradeProcessStatus != null) {
        oAPKUpgradeProcessStatus = JSON.parse(oAPKUpgradeProcessStatus);;
    }
    var oAPKUpgradeProcessBO = new APKUpgradeProcessBO();

    this.Init = function () {
        try {
            OneViewConsole.Debug("Init Start", "LoginFacade.Init");

            //if (OneViewLocalStorage.Get("OneViewGlobalRegistryURL")==undefined)
            var _oRegistryURL = OneViewLocalStorage.Get("OneViewGlobalRegistryURL");
            if (_oRegistryURL == null) {
                if (oneViewGlobalVariables.RegistryURl == "") {
                    OneViewLocalStorage.Save("OneViewGlobalRegistryURL", OneViewGlobalRegistryURlName);
                    oneViewGlobalVariables.RegistryURl = OneViewGlobalRegistryURlName;
                }
                else {
                    OneViewLocalStorage.Save("OneViewGlobalRegistryURL", oneViewGlobalVariables.RegistryURl);
                }
            }
            else {
                oneViewGlobalVariables.RegistryURl = _oRegistryURL;
            }

            OneViewConsole.Debug("Init End", "LoginFacade.Init");
        }

        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "LoginFacade.Init", xlatService);
        }
        finally {
            DefaultData = null;
        }
    }

    /// <summary>
    /// To Validate the user from the Configuration List provided.
    /// </summary>
    /// <param name="ClientValidatorConfigList">1.IsCustomClientValidator: User can change the validation configuration if it this field is true</param>
    ///2.IsDefaultClientValidator: User can't able to change the validation configuration.
    /// <returns>IsSuccess(True/False) : It returns false if the username and password is not provieded and password mismatch nor it will return true</returns>

    var DefaultValidation = function ($scope, ClientValidatorConfigList) {
        try {
            OneViewConsole.Debug("DefaultValidation Start", "AuthenticationFacade.DefaultValidation");

            var oDefaultValidationResponse = null;
            for (var i = 0; i < ClientValidatorConfigList.length; i++) {
                var _oValidator = ClientValidatorConfigList[i];
                if (_oValidator.IsDefaultClientValidator == true) {

                }
                if (_oValidator.IsCustomClientValidator == true) {
                    var oCustomClientValidator = new window[_oValidator.ClassName]();
                    oDefaultValidationResponse = oCustomClientValidator.Validate($scope.User, xlatService);

                    OneViewConsole.Debug("DefaultValidation.oDefaultValidationResponse :" + JSON.stringify(oDefaultValidationResponse), "LoginFacade.DefaultValidation");

                    if (oDefaultValidationResponse.IsSuccess == false) {
                        IsValidationSuccess = false;
                        break;
                    }
                }
            }
            OneViewConsole.Debug("DefaultValidation End", "LoginFacade.DefaultValidation");
            return oDefaultValidationResponse;
        }
        catch (Excep) {
            throw Excep;
        }
        finally {
            oDefaultValidationResponse = null;
            _oValidator = null;
            oCustomClientValidator = null;
        }
    }

    /// <summary>
    /// Authenticate: To check the user credentials provided is valid  if internet avilable and if it is valid save the token information and navigate to next Page.
    /// </summary>
    var SpinnerlastTimeOutId = null;
    var SpinnerTimeout = 500;
    this.Login = function ($scope, $location, toaster, SpinService) {
        try {
            OneViewConsole.Debug("Login Start", "LoginFacade.Login");
        
            oSetDefaultSpinner.Start();
            SchemaUpdation();
           
           // IsGlobalMobileAutoSyncEnabled = OneViewLocalStorage.Get("IsGlobalMobileAutoSyncEnabled");
          
            //CheckForNewUpdates();

            // Description      : Initialize the objects;
            var _oShowMessage = new ShowMessage();
            var _oLoginDAO = new LoginDAO();
            var _oLoginPresenter = new LoginPresenter();
            var IsDownloadCloudManagerFromServer = false;
           

            var oDefaultValidationResponse = DefaultValidation($scope, MyInstance.Login_ClientValidatorConfigList);
          
            OneViewConsole.Debug("Login.oDefaultValidationResponse :" + JSON.stringify(oDefaultValidationResponse), "LoginFacade.Login");

            if (oDefaultValidationResponse.IsSuccess == true) {

                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();
                OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkStatus), "LoginFacade.Login");

                var _oCloudManagerBO = new CloudManagerBO(xlatService);
                var IsUserExist = _oCloudManagerBO.IsUserExist($scope.User.UserName);

                if (IsUserExist == false && NetworkStatus.IsNetworkAvailable == true) {

                    IsDownloadCloudManagerFromServer = true;
                }

                else if (IsUserExist == false && NetworkStatus.IsNetworkAvailable == false) {

                    navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
                    OneViewConsole.Info("No Internet Connection", "LoginFacade.Login");
                }

                if (IsUserExist == true || IsUserExist == false || IsDownloadCloudManagerFromServer == true) {

                    var _oCloudManagerBO = new CloudManagerBO(xlatService);
                    var CloudManagerResponse = _oCloudManagerBO.GetAllServicesByUserIdFromLocal($scope.User.UserName);

                    var _oUserEntity = [];

                    if (CloudManagerResponse.ServicesLst.length > 0) {

                        _oCloudManagerBO.InitializeDBContext(CloudManagerResponse.DefautServiceId);

                        //Description :Get user details from Local DB
                        var _oUserMasterDAO = new UserMasterDAO();
                        _oUserEntity = _oUserMasterDAO.GetUserDetails($scope.User.UserName, $scope.User.OrganizationName);
                        //Description :If user not exis in local DB,will check in Oneview cloud authentications service.
                    }
                    else {
                        IsDownloadCloudManagerFromServer = true;
                    }

                    //GetMetadata for globalization
                    var oGlobalizationComponent = new GlobalizationComponent();

                    if (_oUserEntity.length == 0) {

                        if (NetworkStatus.IsNetworkAvailable == true) {

                            var _oAuthenticationServiceIL = new AuthenticationServiceIL(toaster);
                            var _oUserDTO = _oAuthenticationServiceIL.GetUserDetails($scope.User.UserName, $scope.User.Password, $scope.User.OrganizationName);

                            if (_oUserDTO != null && _oUserDTO.IsAnyException == false) {
                                //Description: Save the user information
                                if (_oUserDTO.UserName != null) {

                                    _oLoginDAO.SaveUserInfo(_oUserDTO, $scope);
                                    oLoginBO.SaveLastLoginUserDetails(_oUserDTO, $scope);

                                    var _oCloudManagerBO = new CloudManagerBO(xlatService);
                                    var CloudManagerResponse = [];

                                    CloudManagerResponse = _oCloudManagerBO.GetAllServicesByUserIdFromServer();

                                    for (var i = 0; i < CloudManagerResponse.ServicesLst.length; i++) {

                                        _oLoginDAO.SaveServiceInfo(CloudManagerResponse.ServicesLst[i].Id, CloudManagerResponse.ServicesLst[i].Name, CloudManagerResponse.ServicesLst[i].ServiceUrl, CloudManagerResponse.ServicesLst[i].SimpleStorageUrl);
                                        _oCloudManagerBO.InitializeDBContext(CloudManagerResponse.ServicesLst[i].Id);

                                        var _oDcPendingTaskBO = new DcPendingTaskBO();
                                        _oDcPendingTaskBO.Download();

                                        var _oGlobalizationMetadataBO = new GlobalizationMetadataBO(xlatService);
                                        var _IsExistGlobalizationMetdata = _oGlobalizationMetadataBO.IsExistGlobalizationMetdata();

                                        if (_IsExistGlobalizationMetdata == false) {

                                            _oGlobalizationMetadataBO.DownloadPageWiseMetadata(false);
                                        }

                                        var _oDATEntityTypesBO = new DATEntityTypesBO(xlatService);
                                        var _IsExistDATEntityTypes = _oDATEntityTypesBO.IsExistDATEntityTypes();

                                        if (_IsExistDATEntityTypes == false) {

                                            var _oDATEntityTypessuccess = _oDATEntityTypesBO.Download();
                                        }

                                        var PageIds = [];
                                        var _oDefaultPageConfigMetaDataBO = new DefaultPageConfigMetaDataBO(xlatService);
                                        var IsExistPageConfigMetaData = _oDefaultPageConfigMetaDataBO.IsExistDefaultPageConfigMetaData();

                                        var IsPageConfigMetaDataSuccess = true;
                                        if (IsExistPageConfigMetaData == false) {

                                            IsPageConfigMetaDataSuccess = _oDefaultPageConfigMetaDataBO.Download(PageIds);
                                        }

                                        if (IsPageConfigMetaDataSuccess == true) {

                                            var _oACLConfigMetaDataBO = new ACLConfigMetaDataBO(xlatService);
                                            var _IsExistACLConfigMetaData = _oACLConfigMetaDataBO.IsExistACLConfigMetaData();

                                            var IsACLConfigMetaDataSuccess = true;
                                            if (_IsExistACLConfigMetaData == false) {

                                                IsACLConfigMetaDataSuccess = _oACLConfigMetaDataBO.Download();
                                            }

                                            if (IsACLConfigMetaDataSuccess == true) {

                                                var _oMenuConfigMetaDataBO = new MenuConfigMetaDataBO(xlatService);
                                                var _IsExistMenuConfigMetaData = _oMenuConfigMetaDataBO.IsExistMenuConfigMetaData();

                                                var MenuConfigMetaDataSuccess = true;
                                                if (_IsExistMenuConfigMetaData == false) {

                                                    MenuConfigMetaDataSuccess = _oMenuConfigMetaDataBO.Download();
                                                }

                                                if (MenuConfigMetaDataSuccess == true) {

                                                    var _oRouterConfigMetaDataBO = new RouterConfigMetaDataBO(xlatService);
                                                    var _IsExistRouterConfigMetaData = _oRouterConfigMetaDataBO.IsExistRouterConfigMetaData();

                                                    if (_IsExistRouterConfigMetaData == false) {

                                                        var RouterConfigMetaDatasuccess = _oRouterConfigMetaDataBO.Download();
                                                    }
                                                }
                                            }
                                        }

                                        if (NetworkStatus.IsNetworkAvailable == true) {
                                            var _oDefaultMasterDAO = new DefaultMasterDAO("BusinessEventEntity");
                                            var IsExist = _oDefaultMasterDAO.IsTableExist();

                                            if (IsExist == true) {
                                                var _oMobileAutoSyncMetadataDownloadBO = new MobileAutoSyncMetadataDownloadBO(xlatService);
                                                var _IsExistMobileAutoSyncMetadata = _oMobileAutoSyncMetadataDownloadBO.IsExistMobileAutoSyncMetadata();
                                                if (_IsExistMobileAutoSyncMetadata == false) {
                                                    var MobileAutoSyncMetadatasuccess = _oMobileAutoSyncMetadataDownloadBO.Download();
                                                    var _oBusinessEventFramework = new BusinessEventFramework();
                                                    _oBusinessEventFramework.GenerateAutoDownloadMetadataForBE();
                                                }
                                            }
                                        }
                                    }

                                    //Description: Save the service information
                                    _oLoginDAO.SaveDefaultServiceInfo(CloudManagerResponse);
                                    _oCloudManagerBO.InitializeDBContext(CloudManagerResponse.DefautServiceId);

                                    GlobalizationMetadata = {};
                                    //GetMetadata for static pages from Db
                                    var MetaDataList = oGlobalizationComponent.LoadLocalizedMetadata(OneViewStaticPageList);
                                    //Form metadata to required structure
                                    oGlobalizationComponent.FormGlobalizationMeta(MetaDataList, OneViewGlobalcurrentLanguage);

                                    SetPlatformVariables();

                                    var _RefreshMetadataHandler = new RefreshMetadataHandler(xlatService);
                                    _RefreshMetadataHandler.Refresh();

                                    var _oOneViewRouterComponet = new OneViewRouterComponet();
                                    _oOneViewRouterComponet.ResetRouter();

                                    //For testing commented
                                    //CheckForNewUpdates();

                                    RedirectToNextPage($location, SpinService, _oLoginPresenter, $scope, _oUserDTO);
                                }
                                else {
                                    //toaster.pop('error', xlatService.xlat('Title_Error'), xlatService.xlat('InvalidCredential'));
                                    navigator.notification.alert(xlatService.xlat('InvalidCredential'), ['OK'], "");
                                    OneViewConsole.Info("Login Status : InvalidCredential", "LoginFacade.Login");
                                    FocusControl($scope, "txtUserName");
                                }
                            }
                            else if (_oUserDTO != null && _oUserDTO.IsAnyException == true) {
                                //toaster.pop('error', xlatService.xlat('Title_Error'), xlatService.xlat('ServerError'));
                                navigator.notification.alert(xlatService.xlat('ServerError'), ['OK'], "");
                                OneViewConsole.Info("Login Status : Server Error", "LoginFacade.Login");
                            }
                        }
                        else {
                            // toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('NoInternetConnection'));
                            navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
                            OneViewConsole.Info("No Internet Connection", "LoginFacade.Login");
                        }

                    }
                    else {
                        //Get Encrypted password
                        // var _oOneViewEncryptionPlugin = new OneViewEncryptionPlugin();
                        //var EncryptedPassword = _oOneViewEncryptionPlugin.GetMd5HashString($scope.User.Password);

                        // if (EncryptedPassword != "") {
                        if (_oUserEntity[0].Password != $scope.User.Password) {
                            // toaster.pop('error', xlatService.xlat('Title_Error'), xlatService.xlat('PasswordMismatch'));
                            navigator.notification.alert(xlatService.xlat('PasswordMismatch'), ['OK'], "");
                            OneViewConsole.Info("Password Mismatch", "LoginFacade.Login");
                            FocusControl($scope, "txtPassword");
                        }

                        else if (_oUserEntity[0].Password == $scope.User.Password) {
                            //Description: Save the user information
                            _oLoginDAO.SaveUserInfo(_oUserEntity[0], $scope);
                            oLoginBO.SaveLastLoginUserDetails(_oUserEntity[0], $scope);

                            var _oCloudManagerBO = new CloudManagerBO(xlatService);
                            var CloudManagerResponse = [];

                            if (IsDownloadCloudManagerFromServer == true) {
                                CloudManagerResponse = _oCloudManagerBO.GetAllServicesByUserIdFromServer();
                            }
                            else {
                                CloudManagerResponse = _oCloudManagerBO.GetAllServicesByUserIdFromLocal();
                            }

                            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                            var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();
                            OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkStatus), "LoginFacade.Login");

                            if (NetworkStatus.IsNetworkAvailable == true) {

                                for (var i = 0; i < CloudManagerResponse.ServicesLst.length; i++) {

                                    _oLoginDAO.SaveServiceInfo(CloudManagerResponse.ServicesLst[i].Id, CloudManagerResponse.ServicesLst[i].Name, CloudManagerResponse.ServicesLst[i].ServiceUrl, CloudManagerResponse.ServicesLst[i].SimpleStorageUrl);
                                    _oCloudManagerBO.InitializeDBContext(CloudManagerResponse.ServicesLst[i].Id);

                                    var _oDcPendingTaskBO = new DcPendingTaskBO();
                                    _oDcPendingTaskBO.Download();

                                    var _oGlobalizationMetadataBO = new GlobalizationMetadataBO(xlatService);
                                    var _IsExistGlobalizationMetdata = _oGlobalizationMetadataBO.IsExistGlobalizationMetdata();
                                    
                                    if (_IsExistGlobalizationMetdata == false) {
                                        _oGlobalizationMetadataBO.DownloadPageWiseMetadata(false);
                                    }

                                    var _oDATEntityTypesBO = new DATEntityTypesBO(xlatService);
                                    var _IsExistDATEntityTypes = _oDATEntityTypesBO.IsExistDATEntityTypes();

                                    if (_IsExistDATEntityTypes == false) {

                                        var _oDATEntityTypessuccess = _oDATEntityTypesBO.Download();
                                    }

                                    var PageIds = [];
                                    var _oDefaultPageConfigMetaDataBO = new DefaultPageConfigMetaDataBO(xlatService);
                                    var IsExistPageConfigMetaData = _oDefaultPageConfigMetaDataBO.IsExistDefaultPageConfigMetaData();
                                    
                                    var IsPageConfigMetaDataSuccess = true;
                                    if (IsExistPageConfigMetaData == false) {
                                       
                                        IsPageConfigMetaDataSuccess = _oDefaultPageConfigMetaDataBO.Download(PageIds);
                                    }

                                    if (IsPageConfigMetaDataSuccess == true) {

                                        var _oACLConfigMetaDataBO = new ACLConfigMetaDataBO(xlatService);
                                        var _IsExistACLConfigMetaData = _oACLConfigMetaDataBO.IsExistACLConfigMetaData();
                                       
                                        var IsACLConfigMetaDataSuccess = true;
                                        if (_IsExistACLConfigMetaData == false) {
                                           
                                            IsACLConfigMetaDataSuccess = _oACLConfigMetaDataBO.Download();
                                        }

                                        if (IsACLConfigMetaDataSuccess == true) {

                                            var _oMenuConfigMetaDataBO = new MenuConfigMetaDataBO(xlatService);
                                            var _IsExistMenuConfigMetaData = _oMenuConfigMetaDataBO.IsExistMenuConfigMetaData();
                                            
                                            var MenuConfigMetaDataSuccess = true;
                                            if (_IsExistMenuConfigMetaData == false) {
                                               
                                                MenuConfigMetaDataSuccess = _oMenuConfigMetaDataBO.Download();
                                            }

                                            if (MenuConfigMetaDataSuccess == true) {

                                                var _oRouterConfigMetaDataBO = new RouterConfigMetaDataBO(xlatService);
                                                var _IsExistRouterConfigMetaData = _oRouterConfigMetaDataBO.IsExistRouterConfigMetaData();
                                               
                                                if (_IsExistRouterConfigMetaData == false) {
                                                   
                                                    var RouterConfigMetaDatasuccess = _oRouterConfigMetaDataBO.Download();
                                                }
                                            }
                                        }
                                    }

                                    if (NetworkStatus.IsNetworkAvailable == true) {
                                        var _oDefaultMasterDAO = new DefaultMasterDAO("BusinessEventEntity");
                                        var IsExist = _oDefaultMasterDAO.IsTableExist();

                                        if (IsExist == true) {
                                            var _oMobileAutoSyncMetadataDownloadBO = new MobileAutoSyncMetadataDownloadBO(xlatService);
                                            var _IsExistMobileAutoSyncMetadata = _oMobileAutoSyncMetadataDownloadBO.IsExistMobileAutoSyncMetadata();
                                            if (_IsExistMobileAutoSyncMetadata == false) {
                                                var MobileAutoSyncMetadatasuccess = _oMobileAutoSyncMetadataDownloadBO.Download();
                                                var _oBusinessEventFramework = new BusinessEventFramework();
                                                _oBusinessEventFramework.GenerateAutoDownloadMetadataForBE();
                                            }
                                        }
                                    }

                                }
                            }

                            //Description: Save the service information
                            _oLoginDAO.SaveDefaultServiceInfo(CloudManagerResponse);
                            _oCloudManagerBO.InitializeDBContext(CloudManagerResponse.DefautServiceId);

                            GlobalizationMetadata = {};
                            //GetMetadata for static pages from Db
                            var MetaDataList = oGlobalizationComponent.LoadLocalizedMetadata(OneViewStaticPageList);
                            //Form metadata to required structure
                            oGlobalizationComponent.FormGlobalizationMeta(MetaDataList, OneViewGlobalcurrentLanguage);

                            SetPlatformVariables();

                       
                            var _RefreshMetadataHandler = new RefreshMetadataHandler(xlatService);
                            _RefreshMetadataHandler.Refresh();

                            var _oOneViewRouterComponet = new OneViewRouterComponet();
                            _oOneViewRouterComponet.ResetRouter();
                            //For testing commented
                            //CheckForNewUpdates();
                            //var _oAPKUpgradeProcessBO = new APKUpgradeProcessBO();
                            //var response = _oAPKUpgradeProcessBO.CheckIsUpgradeAvailable();
                            ////alert('OneViewLocalStorage.Get("IsAPKUpgradeOnProgress") :' + OneViewLocalStorage.Get("IsAPKUpgradeOnProgress") + ', response 2 : ' + JSON.stringify(response));

                            //if (response.IsUpgradeAvailable == true || OneViewLocalStorage.Get("IsAPKUpgradeOnProgress") == "true") {
                            //    //alert('New Upgrade Available');
                            //    $location.url('/APKUpgrade');
                            //}
                            //else {
                            //    //Description: Login and show dash board
                            //    _oLoginPresenter.LoadDashBoard($location, SpinService);
                            //}
                            RedirectToNextPage($location, SpinService, _oLoginPresenter, $scope, _oUserEntity[0]);
                        }
                        //}

                        //else
                        // {
                        //    alert(xlatService.xlat('Title_Error') + ': Password encryption failed' + xlatService.xlat('DefaultException'));
                        //}
                    }
                }
            }
            else {
                //toaster.pop('error', xlatService.xlat('Title_Error'), oDefaultValidationResponse.MessageKey);
                navigator.notification.alert(xlatService.xlat(oDefaultValidationResponse.MessageKey), ['OK'], "");
                OneViewConsole.Info(oDefaultValidationResponse.MessageKey, "LoginFacade.Login");
                FocusControl($scope, "txtUserName");
            }

            if (SpinnerlastTimeOutId != null)
                $timeout.cancel(SpinnerlastTimeOutId);
                SpinnerlastTimeOutId = $timeout(function () {
                    oSetDefaultSpinner.Stop();
                }, SpinnerTimeout);
            

            OneViewConsole.Debug("Login End", "LoginFacade.Login");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "LoginFacade.Login", xlatService);
        }
        finally {
            _oShowMessage = null;
            _oLoginDAO = null;
            _oLoginPresenter = null;
            oDefaultValidationResponse = null;
            _oUserMasterDAO = null;
            _oUserEntity = null;
            oOneViewCordovaPlugin = null;
            NetworkStatus = null;
            _oAuthenticationServiceIL = null;
            _oUserDTO = null;
        }
    }

    var RedirectToNextPage = function ($location, SpinService, _oLoginPresenter, $scope, _oUserDTO) {
        try {

            //Todo : Added By Sangeeta Bhatt (07-03-2017), temporary added for Hyde Housing client
            if (OneViewSessionStorage.Get("ServiceName") == "QaaS") {
                //Action follow-up download by default download true enabled for QaaS client
                AutoActionFollowupDownloadEnabledStatus = true;
                OneViewLocalStorage.Save("IsAutoActionFollowupDownloadEnabled", true);

                //Conflict mode change to Use Server
                OneViewGlobalConflictResolveMode = 2;
                OneViewLocalStorage.Save("OneViewGlobalConflictResolveMode", 2);
            }
            
            //Description: Login and show dash board
            if(OSType == OSTypeEnum.IOS) {
                _oLoginPresenter.LoadDashBoard($location, SpinService, $scope);
            } else {
                if (oAPKUpgradeProcessStatus != null) {
                    oAPKUpgradeProcessBO.SetUpgradeStepCompleted(oOneViewAppInfoPlugin.GetLocalAppInfo().VersionName, oAPKUpgradeProcessStatus.LatestVersion);
                    oAPKUpgradeProcessStatus = OneViewLocalStorage.Get("APKUpgradeProcessStatus");
                    if (oAPKUpgradeProcessStatus != null) {
                        oAPKUpgradeProcessStatus = JSON.parse(oAPKUpgradeProcessStatus);;
                    }
                    if (oAPKUpgradeProcessStatus.IsAPKUpgradeCompleted != true) {
                        SavenUserCredentialsForAPKUpgradeProcess($scope, _oUserDTO, oAPKUpgradeProcessStatus);
                        _oLoginPresenter.LoadAPKUpgradePage($location, $scope);
                    }
                    else {
                        MyInstance.AfterAPKUpgradeProcessCompleted($scope, $location);
                        MyInstance.ShowAPKUpgradeProcessCompleted();
                        OneViewLocalStorage.Remove("APKUpgradeProcessStatus");
                        oAPKUpgradeProcessStatus = OneViewLocalStorage.Get("APKUpgradeProcessStatus");
                        CheckForAPKUpdateAndRedirect($location, SpinService, _oLoginPresenter, $scope, _oUserDTO, oAPKUpgradeProcessStatus);
                    }
                }
                else {
                    CheckForAPKUpdateAndRedirect($location, SpinService, _oLoginPresenter, $scope, _oUserDTO, oAPKUpgradeProcessStatus);
                }
            }
        }
        catch (Excep) {
            throw Excep;
        }
    }

    var SavenUserCredentialsForAPKUpgradeProcess = function ($scope, _oUserDTO, oAPKUpgradeProcessStatus) {
        try {
            OneViewConsole.Debug("SavenUserCredentialsForAPKUpgradeProcess Start", "LoginFacade.SavenUserCredentialsForAPKUpgradeProcess");

            LoginUserCredentialsForAPKUpgradeProcess = {};
            LoginUserCredentialsForAPKUpgradeProcess.LoginUserName = _oUserDTO.UserName;
            LoginUserCredentialsForAPKUpgradeProcess.Password = _oUserDTO.Password;
            //Taking from UI coz user entity doesn't have Organization name
            LoginUserCredentialsForAPKUpgradeProcess.LoginUserOrgName = $scope.User.OrganizationName;

            if (oAPKUpgradeProcessStatus != undefined && oAPKUpgradeProcessStatus != null && oAPKUpgradeProcessStatus.IsAPKUpgradeCompleted != true && oAPKUpgradeProcessStatus.IsAPKUpgradeProcessStarted == true) {
                OneViewLocalStorage.Save("LoginUserCredentialsForAPKUpgradeProcess", JSON.stringify(LoginUserCredentialsForAPKUpgradeProcess));
            }
            OneViewConsole.Debug("SavenUserCredentialsForAPKUpgradeProcess End", "LoginFacade.SavenUserCredentialsForAPKUpgradeProcess");
        }
        catch (Excep) {
            throw Excep;
        }
    }

    var CheckForAPKUpdateAndRedirect = function ($location, SpinService, _oLoginPresenter, $scope, _oUserDTO, oAPKUpgradeProcessStatus) {
        try {
            var response = oAPKUpgradeProcessBO.CheckIsUpgradeAvailable();
            SavenUserCredentialsForAPKUpgradeProcess($scope, _oUserDTO, oAPKUpgradeProcessStatus);

            var _oDefaultMasterDAO = new DefaultMasterDAO("BusinessEventEntity");
            var IsExist = _oDefaultMasterDAO.IsTableExist();
            
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
                    if (IsUpgradeSkipAllowed == true) {

                        var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                        oOneViewCordovaPlugin.DefaultConfirmBox(xlatService.xlat('Confirmation'), xlatService.xlat(NewUpdateMsg + '\n\nDo you want to continue ?'), function (ConfirmationId) {

                            if (ConfirmationId == "2") {
                                _oLoginPresenter.LoadAPKUpgradePage($location, $scope);
                            }
                            else {
                                
                               // // if (IsGlobalMobileAutoSyncEnabled == true || IsGlobalMobileAutoSyncEnabled == 'true') {
                               // if (IsExist == true) {
                               //     var _oBusinessEventFramework = new BusinessEventFramework();
                               //     _oBusinessEventFramework.TriggerEvent("LoginPage", "PageLoad");
                               // }
                               //// }

                                //Description: Login and show dash board
                                _oLoginPresenter.LoadDashBoard($location, SpinService, $scope);
                            }
                        });
                    }
                    else {
                         alert(NewUpdateMsg);
                         _oLoginPresenter.LoadAPKUpgradePage($location, $scope);
                    }
                
                    
                }
                //else stay in login page  don't allow to login
            }
            else {
               // // if (IsGlobalMobileAutoSyncEnabled == true || IsGlobalMobileAutoSyncEnabled == 'true') {
               // if (IsExist == true) {
               //     var _oBusinessEventFramework = new BusinessEventFramework();
               //     _oBusinessEventFramework.TriggerEvent("LoginPage", "PageLoad");
               // }
               //// }

                //Description: Login and show dash board
                _oLoginPresenter.LoadDashBoard($location, SpinService, $scope);
            }
           
        }
        catch (Excep) {
            throw Excep;
        }
    }

    var CheckForNewUpdates = function () {

        try {
            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();

            if (NetworkStatus.IsNetworkAvailable == true) {

                var _oOneViewAppConfig = new OneViewAppConfig();
                _oOneViewAppConfig.CheckForNewUpdates('');
            }
        }
        catch (Excep) {
            throw Excep;
        }
    }

    var FocusControl = function ($scope, Id) {

        try {
            document.getElementById(Id).focus();
            $scope.$apply();
        }
        catch (Excep) {
            throw Excep;
        }
    }

    var SetPlatformVariables = function () {

        try {

            //to do : Need to remove IsGlobalCleaningProfiledownloadView (Once ProfiledownloadView dynamic)
            if (OneViewLocalStorage.Get("IsGlobalCleaningProfiledownloadView") != null) {
                IsGlobalCleaningProfiledownloadView = (OneViewLocalStorage.Get("IsGlobalCleaningProfiledownloadView") == 'false') ? false : true;
            }

            if (OneViewLocalStorage.Get("OneViewGlobalConflictResolveMode") != null) {
                OneViewGlobalConflictResolveMode = parseInt(OneViewLocalStorage.Get("OneViewGlobalConflictResolveMode"));
            }

            if (OneViewLocalStorage.Get("IsGlobalOVGuidCheckingEnabled") != null) {
                IsGlobalOVGuidCheckingEnabled = (OneViewLocalStorage.Get("IsGlobalOVGuidCheckingEnabled") == 'false') ? false : true;
            }

            if (OneViewLocalStorage.Get("DeviceSerialNo") == null) {
                OneViewLocalStorage.Save("DeviceSerialNo", 1)
            }

            if (OneViewLocalStorage.Get("GlobalShiftId") != null) {
                GlobalShiftId = OneViewLocalStorage.Get("GlobalShiftId");
            }
            
            if (OneViewLocalStorage.Get("IsAutoSyncEnabled") != null) {
                IsGlobalAutoSyncEnabled = (OneViewLocalStorage.Get("IsAutoSyncEnabled") == 'false') ? false : true;
            }
         
        }
        catch (Excep) {
            throw Excep;
        }
    }

    this.ShowLastLoginUserDetails = function ($scope) {
        try{
            OneViewConsole.Debug("ShowLastLoginUserDetails End", "LoginFacade.ShowLastLoginUserDetails");

            var _oLoginPresenter = new LoginPresenter();
            _oLoginPresenter.ShowLastLoginUserDetails($scope);

            OneViewConsole.Debug("ShowLastLoginUserDetails End", "LoginFacade.ShowLastLoginUserDetails");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "LoginFacade.ShowLastLoginUserDetails", xlatService);
        }
        finally {
        }
    }
  
    this.AutoLoginAndRefresh = function ($scope, $location) {
        try {
            OneViewConsole.Debug("AutoLoginAndRefresh End", "LoginFacade.AutoLoginAndRefresh");
                        
            if (oAPKUpgradeProcessStatus != null) {
                var IsAutoLoginRequired = false;
                var APKUpgradeMetadata = oAPKUpgradeProcessBO.GetAPKUpgradeProcessMetadata();
                if (APKUpgradeMetadata != null) {
                    //Get Metadata for current version
                    var APKUpgradeMetadataForCurrentVersion = oAPKUpgradeProcessBO.GetAPKUpgradeProcessMetadataForCurrentVersion(oAPKUpgradeProcessStatus.CurrentVersion, APKUpgradeMetadata);

                    if (APKUpgradeMetadataForCurrentVersion.IsRefreshValidationRequired != true) {

                        var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

                        oAPKUpgradeProcessBO.CreateUploadProcessStatusIfNotExists();
                        oAPKUpgradeProcessBO.SetUpgradeStepCompleted(oOneViewAppInfoPlugin.GetLocalAppInfo().VersionName, oAPKUpgradeProcessStatus.LatestVersion);
                        oAPKUpgradeProcessStatus = JSON.parse(OneViewLocalStorage.Get("APKUpgradeProcessStatus"));
                        var WorkflowStatus = oAPKUpgradeProcessStatus.WorkflowStatus;
                        var WorkflowStatusLength = Object.keys(WorkflowStatus).length;
                        for (var i = 1; i <= WorkflowStatusLength ; i++) {
                           
                            //if (WorkflowStatus[i] !=undefined && (WorkflowStatus[i].IsCompleted == true ||
                            //    (WorkflowStatus[i].Name == "Upload" && WorkflowStatus[i][LoginUserId] != undefined &&
                            //    WorkflowStatus[i][LoginUserId].IsCompleted == true))) {
                            //    if (i != WorkflowStatusLength && WorkflowStatus[i + 1].Name == "Refresh" && WorkflowStatus[i + 1].IsCompleted != true) {
                            //        IsAutoLoginRequired = true;
                            //        break;
                            //    }
                            //}
                            //alert('WorkflowStatus[i] : ' + JSON.stringify(WorkflowStatus[i]));
                            if (WorkflowStatus[i].Name == "Refresh" && WorkflowStatus[i].IsCompleted != true) {
                                //alert('APKUpgradeMetadataForCurrentVersion.WorkflowConfig : ' + JSON.stringify(APKUpgradeMetadataForCurrentVersion.WorkflowConfig));
                                var RefreshMetadata = APKUpgradeMetadataForCurrentVersion.WorkflowConfig["Refresh"];
                                if (RefreshMetadata.IsAutoLogin == true) {//  if (RefreshMetadata.IsAutoRefresh == true) {
                                    IsAutoLoginRequired = true;
                                    break;
                                }
                            }
                        }
                        //alert('IsAutoLoginRequired : ' + IsAutoLoginRequired);
                        if (IsAutoLoginRequired == true) {
                            if (oAPKUpgradeProcessStatus.IsAPKUpgradeCompleted != true && oAPKUpgradeProcessStatus.IsAPKUpgradeProcessStarted == true) {
                                var LoginUserCredentials = OneViewLocalStorage.Get("LoginUserCredentialsForAPKUpgradeProcess");
                                if (LoginUserCredentials != null) {
                                    LoginUserCredentials = JSON.parse(LoginUserCredentials);
                                    $scope.User.UserName = LoginUserCredentials.LoginUserName;
                                    $scope.User.Password = LoginUserCredentials.Password;
                                    $scope.User.OrganizationName = LoginUserCredentials.LoginUserOrgName;
                                    MyInstance.Login($scope, $location, '', '');
                                }
                            }
                        }
                    }
                }
            }
            
            OneViewConsole.Debug("AutoLoginAndRefresh End", "LoginFacade.AutoLoginAndRefresh");
        }
        catch (Excep) {
           // alert("LoginFacade.AutoLoginAndRefresh : " + Excep + ", " + JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "LoginFacade.AutoLoginAndRefresh", xlatService);
        }
        finally {
        }
    }

    this.AutoLoginOnAPKUpgradeProcessCompleted = function ($scope, $location) {
        try {
            OneViewConsole.Debug("AutoLoginOnAPKUpgradeProcessCompleted End", "LoginFacade.AutoLoginOnAPKUpgradeProcessCompleted");
            
            if (oAPKUpgradeProcessStatus != null) {
                if (oAPKUpgradeProcessStatus.IsAPKUpgradeCompleted == true) {
                    var LoginUserCredentials = OneViewLocalStorage.Get("LoginUserCredentialsForAPKUpgradeProcess");
                    if (LoginUserCredentials != null) {
                        LoginUserCredentials = JSON.parse(LoginUserCredentials);
                        $scope.User.UserName = LoginUserCredentials.LoginUserName;
                        $scope.User.Password = LoginUserCredentials.Password;
                        $scope.User.OrganizationName = LoginUserCredentials.LoginUserOrgName;
                        MyInstance.Login($scope, $location, '', '');
                        //UpdateAppDetails to server
                        oAPKUpgradeProcessBO.UpdateAppDetails();
                    }
                }
            }
            OneViewConsole.Debug("AutoLoginOnAPKUpgradeProcessCompleted End", "LoginFacade.AutoLoginOnAPKUpgradeProcessCompleted");
        }
        catch (Excep) {
           // alert("LoginFacade.AutoLoginOnAPKUpgradeProcessCompleted : " + Excep + ", " + JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "LoginFacade.AutoLoginOnAPKUpgradeProcessCompleted", xlatService);
        }
        finally {
        }
    }


    this.ShowAPKUpgradeProcessCompleted = function () {
        try {
            OneViewConsole.Debug("ShowAPKUpgradeProcessCompleted End", "LoginFacade.ShowAPKUpgradeProcessCompleted");

            var APKUpgradeMetadata = oAPKUpgradeProcessBO.GetAPKUpgradeProcessMetadata();
            if (APKUpgradeMetadata != null) {
                //Get Metadata for current version
                var APKUpgradeMetadataForCurrentVersion = oAPKUpgradeProcessBO.GetAPKUpgradeProcessMetadataForCurrentVersion(oAPKUpgradeProcessStatus.CurrentVersion, APKUpgradeMetadata);
                if (oAPKUpgradeProcessStatus.IsAPKUpgradeCompleted == true) {
                    alert(xlatService.xlat(APKUpgradeMetadataForCurrentVersion.ProcessCompletionMessage) + oAPKUpgradeProcessStatus.LatestVersion);
                }
            }

            OneViewConsole.Debug("ShowAPKUpgradeProcessCompleted End", "LoginFacade.ShowAPKUpgradeProcessCompleted");
        }
        catch (Excep) {
           // alert("LoginFacade.ShowAPKUpgradeProcessCompleted : " + Excep + ", " + JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "LoginFacade.ShowAPKUpgradeProcessCompleted", xlatService);
        }
        finally {
        }
    }
    
    this.CopyDbAcrossServiceEvent = function () {
        try {
            OneViewConsole.Debug("CopyDbAcrossService End", "LoginFacade.CopyDbAcrossService");

            var _oDbStructureController = new DbStructureController();
            _oDbStructureController.CopyDbAcrossServiceEvent(xlatService);

            OneViewConsole.Debug("CopyDbAcrossService End", "LoginFacade.CopyDbAcrossService");
        }
        catch (Excep) {
           // alert("LoginFacade.CopyDbAcrossService : " + Excep + ", " + JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "LoginFacade.CopyDbAcrossService", xlatService);
        }
        finally {
        }
    }

    this.UploadDbAcrossService = function () {
        try {
            OneViewConsole.Debug("UploadDbAcrossService End", "LoginFacade.UploadDbAcrossService");
            // Checking network availability
            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();
            OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "LoginFacade.UploadDbAcrossService");

            // If network is available
            if (NetworkDetails.IsNetworkAvailable == true) {
                var _oDbStructureController = new DbStructureController();
                _oDbStructureController.UploadDbAcrossService(xlatService);
            }
            else {
                navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
                OneViewConsole.Info("No Internet Connection", "LoginFacade.UploadDbAcrossService");
            }
            OneViewConsole.Debug("UploadDbAcrossService End", "LoginFacade.UploadDbAcrossService");
        }
        catch (Excep) {
            //alert("LoginFacade.UploadDbAcrossService : " + Excep + ", " + JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "LoginFacade.UploadDbAcrossService", xlatService);
        }
        finally {
        }
    }
    
    this.UploadImagesAndDbAcrossService = function () {
        try {
            OneViewConsole.Debug("UploadImagesAndDbAcrossService End", "LoginFacade.UploadImagesAndDbAcrossService");
            // Checking network availability
            var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
            var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();
            OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "LoginFacade.UploadImagesAndDbAcrossService");

            // If network is available
            if (NetworkDetails.IsNetworkAvailable == true) {
                var _oDbStructureController = new DbStructureController();
                _oDbStructureController.UploadImagesAndDbAcrossService(xlatService);
            }
            else {
                navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
                OneViewConsole.Info("No Internet Connection", "LoginFacade.UploadImagesAndDbAcrossService");
            }
            OneViewConsole.Debug("UploadImagesAndDbAcrossService End", "LoginFacade.UploadImagesAndDbAcrossService");
        }
        catch (Excep) {
            alert("LoginFacade.UploadImagesAndDbAcrossService : " + Excep + ", " + JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "LoginFacade.UploadImagesAndDbAcrossService", xlatService);
        }
        finally {
        }
    }

    //Only for this verion to avoid refresk tab
    var SchemaUpdation = function () {
        try {
            OneViewConsole.Debug("SchemaUpdation End", "LoginFacade.SchemaUpdation");

            if (OneViewLocalStorage.Get("CloudManagerServiceInfo") != null) {

                var CloudManagerServiceInfo = JSON.parse(OneViewLocalStorage.Get("CloudManagerServiceInfo"));
                var _oOneViewSqlitePlugin = new OneViewSqlitePlugin();

                for (var itr in CloudManagerServiceInfo) {

                    _oOneViewSqlitePlugin.InitializeDBContext("Service" + itr + "DB");

                    var Query = 'PRAGMA table_info("DcResultDetailsEntity")';
                    var Result = _oOneViewSqlitePlugin.ExcecuteSqlReader(Query);

                    var IsDisableColumnExist = false;

                    for (var i = 0; i < Result.length; i++) {

                        if (Result[i].name == "IsDisable") {

                            IsDisableColumnExist = true;
                        }
                    }

                    if (IsDisableColumnExist == false) {

                        var Query = 'ALTER TABLE DcResultDetailsEntity ADD COLUMN IsDisable TEXT  DEFAULT false';
                        _oOneViewSqlitePlugin.ExcecuteSql(Query);
                    }
                }
            }
            
            OneViewConsole.Debug("SchemaUpdation End", "LoginFacade.SchemaUpdation");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "LoginFacade.SchemaUpdation", xlatService);
        }
        finally {
        }
    }

    this.Destroy = function () {
        try {
            OneViewConsole.Debug("Destroy End", "LoginFacade.Destroy");
          
            xlatService.RemoveCurrentPageMetadata('2');
            GlobalxlatService = null;

            OneViewConsole.Debug("Destroy End", "LoginFacade.Destroy");
        }
        catch (Excep) {
            //alert("LoginFacade.Destroy : " + Excep + ", " + JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "LoginFacade.Destroy", xlatService);
        }
        finally {
        }
    }

    this.AfterAPKUpgradeProcessCompleted = function ($scope, $location) {
        try {
            OneViewConsole.Debug("AfterAPKUpgradeProcessCompleted End", "LoginFacade.AfterAPKUpgradeProcessCompleted");

            if (oAPKUpgradeProcessStatus != null) {
                if (oAPKUpgradeProcessStatus.IsAPKUpgradeCompleted == true) {
                   // alert('here AfterAPKUpgradeProcessCompleted');
                    var LoginUserCredentials = OneViewLocalStorage.Get("LoginUserCredentialsForAPKUpgradeProcess");
                    if (LoginUserCredentials != null) {
                        LoginUserCredentials = JSON.parse(LoginUserCredentials);
                        $scope.User.UserName = LoginUserCredentials.LoginUserName;
                        $scope.User.Password = LoginUserCredentials.Password;
                        $scope.User.OrganizationName = LoginUserCredentials.LoginUserOrgName;
                        //UpdateAppDetails to server
                        oAPKUpgradeProcessBO.UpdateAppDetails();
                    }
                }
            }
            OneViewConsole.Debug("AfterAPKUpgradeProcessCompleted End", "LoginFacade.AfterAPKUpgradeProcessCompleted");
        }
        catch (Excep) {
            //alert("LoginFacade.AfterAPKUpgradeProcessCompleted : " + Excep + ", " + JSON.stringify(Excep));
            oOneViewExceptionHandler.Catch(Excep, "LoginFacade.AfterAPKUpgradeProcessCompleted", xlatService);
        }
        finally {
        }
    }
}
  

/// <summary>
/// Validate the Login fields.
/// </summary>
/// <returns>_oDefaultValidationResponse</returns>

function MandatoryValidation() {
    try {
        var _oDefaultValidationResponse = new DefaultValidationResponse();

        /// <summary>
        /// To Check user credentials is provided or not.
        /// </summary>
        /// <param name="User">UserName and Password Provided</param>
        /// <returns>ValidationResponse :1. It returns false if user credentials field is empty with the message to display to user and retuns true if it is not empty</returns>
        this.Validate = function (User, xlatService) {
            try {
                OneViewConsole.Debug("Validate Start", "MandatoryValidation.Validate");
                OneViewConsole.Debug("User :", JSON.stringify(User));

                if (User == undefined) {
                    _oDefaultValidationResponse.IsSuccess = false;

                    _oDefaultValidationResponse.MessageKey = xlatService.xlat("ProvideCredentials");
                }
                else if (User.UserName != undefined && User.Password != undefined && User.UserName != "" && User.Password != "") {

                    _oDefaultValidationResponse.IsSuccess = true;
                }
                else {
                    _oDefaultValidationResponse.IsSuccess = false;

                    _oDefaultValidationResponse.MessageKey = xlatService.xlat("ProvideCredentials");
                }

                OneViewConsole.Debug("Response from validation" + JSON.stringify(_oDefaultValidationResponse), "MandatoryValidation.Validate");
                OneViewConsole.Debug("Validate End", "MandatoryValidation.Validate");

                return _oDefaultValidationResponse;
            }

            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Validation", "MandatoryValidation.Validate", Excep);
            }
        }
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Validation", "Validation.MandatoryValidation", Excep);
    }
}


/// <summary>
/// Integration Layer : AuthenticationServiceIL.
/// </summary>
function AuthenticationServiceIL(toaster) {
    
    /// <summary>
    /// GetUserDetails : Get the User Details if it is anthenticate.
    /// </summary>
    /// <param name="UserName">Provided UserName</param>
    /// <param name="Password">Provided Password</param>
    /// <returns>User Details : It returns the true if it is valid and other information like (ServerId,UserName,OrganizationName ...)
    ///and returns false if the User credentials is invalid</returns>
    this.GetUserDetails = function (UserName, Password, OrganizationName) {
        try {
            OneViewConsole.Debug("GetUserDetails Start", "AuthenticationServiceIL.GetUserDetails");
            OneViewConsole.DataLog("UserName :", JSON.stringify(UserName));
            OneViewConsole.DataLog("Password :", JSON.stringify(Password));

            //Get Encrypted password
            // var _oOneViewEncryptionPlugin = new OneViewEncryptionPlugin();
            // Password= _oOneViewEncryptionPlugin.GetMd5HashString(Password);

            var _oOneViewChannel = new OneViewChannel();
            //_oOneViewChannel.toaster = toaster;
            if (oneViewGlobalVariables.RegistryURl == "") {
             
                var _oRegistryURL = OneViewLocalStorage.Get("OneViewGlobalRegistryURL");
                oneViewGlobalVariables.RegistryURl = _oRegistryURL;
            }
            _oOneViewChannel.url = oneViewGlobalVariables.RegistryURl + "OneViewTokenFacedService.svc/GetUserDetails";
            _oOneViewChannel.parameter = JSON.stringify({ "OrganizationName": OrganizationName, "UserName": UserName, "Password": Password });
            var oUserDTO = _oOneViewChannel.Send();
            OneViewConsole.Debug("GetUserDetails End", "AuthenticationServiceIL.GetUserDetails");
            if (oUserDTO != null) {
                OneViewConsole.DataLog("Response from Server" + JSON.stringify(oUserDTO.GetUserDetailsResult), "AuthenticationServiceIL.GetUserDetails");
                return oUserDTO.GetUserDetailsResult;
            }
            else {
                return oUserDTO;
            }

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("IL", "AuthenticationServiceIL.GetUserDetails", Excep);
        }
        finally {
            _oOneViewChannel = null;
            oUserDTO = null;
        }
    }


    /// <summary>
    /// GetServiceDetails : Get the Service Details for the authenticate user.
    /// </summary>
    /// <param name="UserId">Logged in userid</param>
    /// <returns>Service Details : It returns the information like (ServiceId,ServiceName,ServiceOMGuid)
    /// if service is avilable for logged in user</returns>
    this.GetServiceDetails = function (UserId) {
        try {
            OneViewConsole.Debug("GetServiceDetails Start", "AuthenticationServiceIL.GetServiceDetails");
            OneViewConsole.DataLog("UserId :", JSON.stringify(UserId));

            var _oOneViewChannel = new OneViewChannel();
            if (oneViewGlobalVariables.RegistryURl == "") {
                var _oRegistryURL = OneViewLocalStorage.Get("OneViewGlobalRegistryURL");
                oneViewGlobalVariables.RegistryURl = _oRegistryURL;
            }
            _oOneViewChannel.url = oneViewGlobalVariables.RegistryURl + "GetServiceDetails";
            _oOneViewChannel.parameter = JSON.stringify({ "UserId": UserId });
            var oServiceDTO = _oOneViewChannel.Send();

            OneViewConsole.DataLog("Response from Server" + JSON.stringify(oUserDTO.GetUserDetailsResult), "AuthenticationServiceIL.GetServiceDetails");
            OneViewConsole.Debug("GetServiceDetails End", "AuthenticationServiceIL.GetServiceDetails");

            return oServiceDTO.GetServiceDetailsResult;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("IL", "AuthenticationServiceIL.GetServiceDetails", Excep);
        }
        finally {
            _oOneViewChannel = null;
            oServiceDTO = null;
        }
    }
}


/// <summary>
/// DAO : LoginDAO.
/// </summary>
function LoginDAO() {

    var MyInstance = this;

    /// <summary>
    /// SaveUserInfo : Save the Login Information in session.
    /// </summary>
    /// <param name="UserDTO">It contains information like (ServerId,UserName,OrganizationName..)</param>
    this.SaveUserInfo = function (UserDTO, $scope) {
        try {
            OneViewConsole.Debug("SaveUserInfo Start", "LoginDAO.SaveUserInfo");

            OneViewSessionStorage.Save("LoginUserId", UserDTO.ServerId);
            OneViewSessionStorage.Save("LoginUserName", UserDTO.UserName);
            OneViewSessionStorage.Save("LoginUserPassword", $scope.User.Password);
            OneViewSessionStorage.Save("LoginUserOMGuid", UserDTO.OMGuid);
            OneViewSessionStorage.Save("LoginUserFirstName", UserDTO.Name);
            OneViewSessionStorage.Save("LoginUserOrgName", $scope.User.OrganizationName);
            OneViewSessionStorage.Save("OrganizationId", UserDTO.OrganizationMasterId);
            
            OneViewConsole.Debug("SaveUserInfo End", "LoginDAO.SaveUserInfo");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "LoginDAO.SaveUserInfo", Excep);
        }
    }


    /// <summary>
    /// SaveServiceInfo : Save the Serrvice Information in session.
    /// </summary>
    /// <param name="ServiceDTO">It contains information like (ServiceId,ServiceName,ServiceOMGuid)</param>
    this.SaveServiceInfo = function (ServiceId, ServiceName, ServiceUrl, SimpleStorageUrl) {
        try {
            OneViewConsole.Debug("SaveServiceInfo Start", "LoginDAO.SaveServiceInfo");

            OneViewSessionStorage.Save("ServiceId", ServiceId);
            OneViewSessionStorage.Save("ServiceName", ServiceName);
            OneViewSessionStorage.Save("ServiceOMGuid", "1");

            oneViewGlobalVariables.FoodSafetyServiceURL = ServiceUrl;
            oneViewGlobalVariables.SimpleStorageURL = SimpleStorageUrl;

            OneViewConsole.Debug("SaveServiceInfo End", "LoginDAO.SaveServiceInfo");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "LoginDAO.SaveServiceInfo", Excep);
        }
    }

    /// <summary>
    /// SaveDefaultServiceInfo : Save the default Serrvice Information in session.
    /// </summary>
    /// <param name="ServiceDTO">It contains information like (ServiceId,ServiceName,ServiceOMGuid)</param>
    this.SaveDefaultServiceInfo = function (CloudManagerResponse) {
        try {
            OneViewConsole.Debug("SaveDefaultServiceInfo Start", "LoginDAO.SaveDefaultServiceInfo");

            OneViewSessionStorage.Save("ServiceId", CloudManagerResponse.DefautServiceId);
            OneViewSessionStorage.Save("ServiceName", CloudManagerResponse.DefautServiceName);
            OneViewSessionStorage.Save("ServiceOMGuid", "1");

            for (var i = 0; i < CloudManagerResponse.ServicesLst.length; i++) {

                if (CloudManagerResponse.ServicesLst[i].Id == CloudManagerResponse.DefautServiceId) {

                    oneViewGlobalVariables.FoodSafetyServiceURL = CloudManagerResponse.ServicesLst[i].ServiceUrl;
                    oneViewGlobalVariables.SimpleStorageURL = CloudManagerResponse.ServicesLst[i].SimpleStorageUrl;
                    break;
                }
            }

            OneViewConsole.Debug("SaveDefaultServiceInfo End", "LoginDAO.SaveDefaultServiceInfo");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "LoginDAO.SaveDefaultServiceInfo", Excep);
        }
    }



    
}


/// <summary>
/// Presenter : LoginPresenter.
/// </summary>
function LoginPresenter() {

    var MyInstance = this;

    /// <summary>
    /// LoadDashBoard : Load the Dashboard Page.
    /// </summary>
    this.LoadDashBoard = function ($location, SpinService, $scope) {
        try {
            OneViewConsole.Debug("LoadDashBoard Start", "LoginPresenter.LoadDashBoard");

            OneViewSessionStorage.Save("StartPage", "Dashboard");
            $location.url('/nav');
            $scope.$apply();
            OneViewConsole.Debug("LoadDashBoard End", "LoginPresenter.LoadDashBoard");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Presenter", "LoginPresenter.LoadDashBoard", Excep);
        }
    }

    this.LoadAPKUpgradePage = function ($location, $scope) {
        try {
            OneViewConsole.Debug("LoadAPKUpgradePage Start", "LoginPresenter.LoadAPKUpgradePage");

            $location.url('/APKUpgrade');
            $scope.$apply();

            OneViewConsole.Debug("LoadAPKUpgradePage End", "LoginPresenter.LoadAPKUpgradePage");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Presenter", "LoginPresenter.LoadAPKUpgradePage", Excep);
        }
    }

    this.ShowLastLoginUserDetails = function ($scope) {
        try {
            OneViewConsole.Debug("ShowLastLoginUserDetails Start", "LoginPresenter.ShowLastLoginUserDetails");


            var UserData = OneViewLocalStorage.Get("LastLoginUserData");
            if (UserData != "" && UserData != undefined && UserData != null) {
                
                var LastLoginUserData = JSON.parse(UserData);

                $scope.User.UserName = LastLoginUserData.LoginUserName;
                $scope.User.Password = LastLoginUserData.Password;
                $scope.User.OrganizationName = LastLoginUserData.LoginUserOrgName;
                $scope.User.RememberCredentials = LastLoginUserData.RememberCredentials;

            }

            OneViewConsole.Debug("ShowLastLoginUserDetails End", "LoginPresenter.ShowLastLoginUserDetails");
        }
        catch (Excep) {
           // alert('ShowLastLoginUserDetails Excep : ' + Excep);
            oOneViewExceptionHandler.Catch(Excep, "LoginPresenter.ShowLastLoginUserDetails", Excep);
        }
        finally {
        }
    }
}


function RefreshMetadataHandler(xlatService) {

    this.Refresh = function () {
        try {
            OneViewConsole.Debug("Refresh Start", "RefreshMetadataHandler.Refresh");

   
            var _oServiceId = OneViewSessionStorage.Get("ServiceId");
            var _LoginUserId = OneViewSessionStorage.Get("LoginUserId");


            TempServiceId = _oServiceId;
            RefreshACLMetadata(_oServiceId, _LoginUserId)

            OneViewGlobalServiceType = "Service_" + _oServiceId;
            //alert(OneViewGlobalServiceTypeEnum[OneViewGlobalServiceType]);


             if (_oServiceId != 1 && _oServiceId != 2) {
                 RefreshDatEntity(_oServiceId, _LoginUserId);
             }
             else {
                 DATEntityType = eval("DATEntityType_ServiceID_" + _oServiceId);
                 PlaceDATEntityTypesClientDict = eval("PlaceDATEntityTypesClientDict_ServiceID_" + _oServiceId);
                 TemplateDATEntityTypesClientDict = eval("TemplateDATEntityTypesClientDict_ServiceID_" + _oServiceId);

                 DATBand = eval("DATBand_ServiceID_" + _oServiceId);
                 Band = eval("Band_ServiceID_" + _oServiceId);
                 TemplateMetaData = eval("TemplateMetaData_ServiceID_" + _oServiceId);

                 BandEntity = eval("BandEntity_ServiceID_" + _oServiceId);
                 BandDetailsEntity = eval("BandDetailsEntity_ServiceID_" + _oServiceId);
             }

             if (_oServiceId == 3 || _oServiceId == 5 || _oServiceId == 10 || _oServiceId == 11 || _oServiceId == 13) {
                 TemplateMetaData = eval("TemplateMetaData_ServiceID_" + _oServiceId);
             }

           
            OneViewConsole.Debug("Refresh End", "RefreshMetadataHandler.Refresh");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "RefreshMetadataHandler.Refresh", xlatService);
        }
      
    }

    var RefreshACLMetadata = function (ServiceId, LoginUserId) {
        try {
            OneViewConsole.Debug("Refresh Start", "RefreshMetadataHandler.RefreshACLMetadata");

            var _oACLConfigMetaDataDAO = new ACLConfigMetaDataDAO();
            var ACLResult = _oACLConfigMetaDataDAO.GetByServiceId(ServiceId, LoginUserId);
            if (ACLResult.length == 0) {
                ACLResult = _oACLConfigMetaDataDAO.GetByServiceId(ServiceId, -1);
            }

            if (ACLResult.length > 0) {
                var _ACL = ACLResult[0].ACLConfig;

                if (_ACL != "" && _ACL.length > 0) {
                    _ACL = JSON.parse(_ACL);
                    _ACL = JSON.parse(_ACL);
                    ACL = _ACL;
                }

                //alert(JSON.stringify(ACL));
            }
          

            OneViewConsole.Debug("Refresh End", "RefreshMetadataHandler.RefreshACLMetadata");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "RefreshMetadataHandler.RefreshACLMetadata", xlatService);
        }


    }

    var RefreshDatEntity = function (ServiceId, LoginUserId) {
        try {
            OneViewConsole.Debug("Refresh Start", "RefreshMetadataHandler.RefreshACLMetadata");
            
        
            var _oDATEntityTypesDAO = new DATEntityTypesDAO();
            var DatEntityResult = _oDATEntityTypesDAO.GetDatEntity(ServiceId);
            //alert("DatEntityResult : " + JSON.stringify(DatEntityResult));
            var DATEntityTypeList = {};
            if (DatEntityResult.length > 0) {
                for (var i = 0; i < DatEntityResult.length ; i++) {
                    DATEntityTypeList[DatEntityResult[i].Name] = DatEntityResult[i].ServerId;
                }
            }
            else {
                DATEntityTypeList = null;
            }
            if (DATEntityTypeList != null) {
                DATEntityType = DATEntityTypeList;
               
            }
    
            OneViewConsole.Debug("Refresh End", "RefreshMetadataHandler.RefreshACLMetadata");
        }
        catch (Excep) {
            oOneViewExceptionHandler.Catch(Excep, "RefreshMetadataHandler.RefreshACLMetadata", xlatService);
        }

    }
  
}


function LoginBO() {

    /// <summary>
    /// SaveLastLoginUserDetails : Save the Login Information in session.
    /// </summary>
    /// <param name="UserDTO">It contains information like (ServerId,UserName,Password..)</param>
    this.SaveLastLoginUserDetails = function (UserDTO, $scope) {
        try {
            OneViewConsole.Debug("SaveLastLoginUserDetails Start", "LoginBO.SaveLastLoginUserDetails");

            var LastLoginUserData = { 'LoginUserName': '', 'Password': '', 'LoginUserOrgName': '' };

            if ($scope.User.RememberCredentials == true || $scope.User.RememberCredentials == 'true') {
                LastLoginUserData.LoginUserName = UserDTO.UserName;
                LastLoginUserData.Password = UserDTO.Password;
            }

            //Taking from UI coz user entity doesn't have Organization name
            LastLoginUserData.LoginUserOrgName = $scope.User.OrganizationName;

            LastLoginUserData.RememberCredentials = $scope.User.RememberCredentials;

            OneViewLocalStorage.Save("LastLoginUserData", JSON.stringify(LastLoginUserData));

            OneViewConsole.Debug("SaveLastLoginUserDetails End", "LoginBO.SaveLastLoginUserDetails");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "LoginBO.SaveLastLoginUserDetails", Excep);
        }
    }
}
//----------------------------------------------End----------------------------------------------//


   

