
//Description      :Login Controller for authenticating the user and loading the next page.

/// <param name="$scope">Current scope</param>
/// <param name="xlatService">xlatService for globalization</param>
/// <param name="toaster">toaster for toast messages</param>
/// <param name="SpinService">SpinService for loader</param>
/// <param name="ionicModal">UI Framework for design and style</param>
/// <param name="timeout">Delay(Time duration)</param>

MyApp.controller('LoginController', function ($scope, $location, $timeout, xlatService) {
    //Description      :Set the current page name for accessing global names.
   // xlatService.setCurrentPage('Login_Page');
    xlatService.setCurrentPage('2');
   // oSetDefaultSpinner.Start();
    //$ionicPlatform.onHardwareBackButton(function (event) {
    //    try {
    //        alert('start onHardwareBackButton');
    //    event.preventDefault();
    //    event.stopPropagation();
    //    alert('going back now y');
    //    } catch (e) {
    //        alert('inside bacjk excep : ' + e);
    //    }
    //});

    //http://ionicframework.com/docs/api/service/$ionicPlatform/
   

    //Description      :Services JSON Object is for showing what and all service avilable for logdin user(Now for checking we made static.)
    $scope.Services = [
			            { "Id": 1, "Name": "Cleaning" },
			            { "Id": 2, "Name": "Fire & Safety" },
    ];

    //Description      :Load the Service model from the given template URL
   

    /// <summary>
    /// Service selection PopUp.
    /// </summary>
    /// <returns></returns>
    $scope.onItemChanged = function(item) {
        var oLoginFacade = new LoginFacade(xlatService);
        
        oLoginFacade.HideServicePopUp($scope, $location, $timeout);
    };
    
    $scope.preventPaste = function (e) {
        e.preventDefault();
        return false;
    };

    /// <summary>
    /// To trigger the validation after providing user credentials.
    /// </summary>
   
    $scope.Login = function () {
        var oLoginFacade = new LoginFacade(xlatService);               
        oLoginFacade.Login($scope, $location, '', '');
    };

   

})

/// <summary>
/// Login Facade Layer(Assembler code / Work flow code).
/// </summary>
/// <returns></returns>
 
function LoginFacade(xlatService) {
    
        //Description      :Login Configuration  list which contains what type of validation enabled and a method name.
        this.Login_ClientValidatorConfigList = [{ 'IsDefaultClientValidator': false, 'IsCustomClientValidator': true, 'ClassName': 'MandatoryValidation' }];
        var MyInstance = this;


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

        this.Login = function ($scope, $location, toaster, SpinService) {        
            try {                            
                OneViewConsole.Debug("Login Start", "LoginFacade.Login");
 				
                oSetDefaultSpinner.Start();

                CheckForNewUpdates();
 				
                // Description      : Initialize the objects; 
                var _oShowMessage = new ShowMessage();
                var _oLoginDAO = new LoginDAO();
                var _oLoginPresenter = new LoginPresenter();


                var oDefaultValidationResponse = DefaultValidation($scope, MyInstance.Login_ClientValidatorConfigList);

                OneViewConsole.Debug("Login.oDefaultValidationResponse :" + JSON.stringify(oDefaultValidationResponse), "LoginFacade.Login");

                if (oDefaultValidationResponse.IsSuccess == true) {

                    //Description :Get user details from Local DB
                    var _oUserMasterDAO = new UserMasterDAO();
                    var _oUserEntity = _oUserMasterDAO.GetUserDetails($scope.User.UserName);
                    //Description :If user not exis in local DB,will check in Oneview cloud authentications service.

                    if (_oUserEntity.length == 0) {
                        var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                        var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();
                        OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkStatus), "LoginFacade.Login");

                        if (NetworkStatus.IsNetworkAvailable == true) {
                           
                            var _oAuthenticationServiceIL = new AuthenticationServiceIL(toaster);
                            var _oUserDTO = _oAuthenticationServiceIL.GetUserDetails($scope.User.UserName, $scope.User.Password);
                            
                            if (_oUserDTO != null && _oUserDTO.IsAnyException == false) {
                                //Description: Save the user information
                                if (_oUserDTO.UserName !=null) {

                                    _oLoginDAO.SaveUserInfo(_oUserDTO);
                                    //Description: Save the service information
                                    _oLoginDAO.SaveServiceInfo();

                                    var _oGlobalizationMetadataBO = new GlobalizationMetadataBO(xlatService);
                                    _oGlobalizationMetadataBO.DownloadPageWiseMetadata(false);

                                    var _oDcPendingTaskBO = new DcPendingTaskBO();
                                    _oDcPendingTaskBO.Download();

                                    //GetMetadata for static pages from Db
                                    var MetaDataList = oGlobalizationComponent.LoadLocalizedMetadata(OneViewStaticPageList);
                                    //Form metadata to required structure
                                    oGlobalizationComponent.FormGlobalizationMeta(MetaDataList, 'en-us');


                                    //Description: Login and show dash board
                                    _oLoginPresenter.LoadDashBoard($location, SpinService);
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
                    else
                    {
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
                                _oLoginDAO.SaveUserInfo(_oUserEntity[0]);
                                //Description: Save the service information
                                _oLoginDAO.SaveServiceInfo();

                                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                                var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();
                                OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkStatus), "LoginFacade.Login");

                                if (NetworkStatus.IsNetworkAvailable == true) {

                                    var _oGlobalizationMetadataBO = new GlobalizationMetadataBO(xlatService);
                                    _oGlobalizationMetadataBO.DownloadPageWiseMetadata(false);

                                    var _oDcPendingTaskBO = new DcPendingTaskBO();
                                    _oDcPendingTaskBO.Download();
                                }

                                //GetMetadata for static pages from Db
                                var MetaDataList = oGlobalizationComponent.LoadLocalizedMetadata(OneViewStaticPageList);
                                //Form metadata to required structure
                                oGlobalizationComponent.FormGlobalizationMeta(MetaDataList, 'en-us');
                                
                                //Description: Login and show dash board
                                _oLoginPresenter.LoadDashBoard($location, SpinService);
                            }
                        //}

                        //else
                       // {
                        //    alert(xlatService.xlat('Title_Error') + ': Password encryption failed' + xlatService.xlat('DefaultException'));
                        //}
                    }
                    
                }
                else {                    
                    //toaster.pop('error', xlatService.xlat('Title_Error'), oDefaultValidationResponse.MessageKey);
                    navigator.notification.alert(xlatService.xlat(oDefaultValidationResponse.MessageKey), ['OK'], "");
                    OneViewConsole.Info(oDefaultValidationResponse.MessageKey, "LoginFacade.Login");
                    FocusControl($scope, "txtUserName");
                }
                
                oSetDefaultSpinner.Stop();
                
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

            try{
                document.getElementById(Id).focus();
                $scope.$apply();
            }
            catch (Excep) {
                throw Excep;
            }
        }

        /// <summary>
        /// Hide the service selection PopUp
        /// </summary>
        /// <param name="$scope"></param>
        /// <param name="$state"></param>
        /// <param name="$timeout"></param>

        this.HideServicePopUp = function ($scope, $location, $timeout) {
            try {
                OneViewConsole.Debug("HideServicePopUp Start", "LoginFacade.HideServicePopUp");

                var _oLoginPresenter = new LoginPresenter();
                _oLoginPresenter.HideServicePopUp($scope, $location, $timeout);

                OneViewConsole.Debug("HideServicePopUp End", "LoginFacade.HideServicePopUp");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "LoginFacade.HideServicePopUp", xlatService);
            }
            finally {
                _oLoginPresenter = null;
            }
        }

        /// <summary>
        /// Show the service selection PopUp
        /// </summary>
        /// <param name="$scope"></param>
        /// <param name="$state"></param>
        /// <param name="$timeout"></param>

        this.ShowServicePopUp = function ($scope) {
            try {
                OneViewConsole.Debug("ShowServicePopUp Start", "LoginFacade.ShowServicePopUp");

                var _oLoginPresenter = new LoginPresenter();
                _oLoginPresenter.ShowServicePopUp($scope);

                OneViewConsole.Debug("ShowServicePopUp End", "LoginFacade.ShowServicePopUp");
            }
            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "LoginFacade.ShowServicePopUp", xlatService);
            }
            finally {
                _oLoginPresenter = null;
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
    try {
        var myIns = this;
        /// <summary>
        /// GetUserDetails : Get the User Details if it is anthenticate.
        /// </summary>
        /// <param name="UserName">Provided UserName</param>
        /// <param name="Password">Provided Password</param>
        /// <returns>User Details : It returns the true if it is valid and other information like (ServerId,UserName,OrganizationName ...) 
        ///and returns false if the User credentials is invalid</returns>
        this.GetUserDetails = function (UserName, Password) {
            try {
                OneViewConsole.Debug("GetUserDetails Start", "AuthenticationServiceIL.GetUserDetails");
                OneViewConsole.DataLog("UserName :", JSON.stringify(UserName));
                OneViewConsole.DataLog("Password :", JSON.stringify(Password));

                //Get Encrypted password
               // var _oOneViewEncryptionPlugin = new OneViewEncryptionPlugin();
               // Password= _oOneViewEncryptionPlugin.GetMd5HashString(Password);

                var _oOneViewChannel = new OneViewChannel();
                //_oOneViewChannel.toaster = toaster;
                _oOneViewChannel.url = oneViewGlobalVariables.RegistryURl + "OneViewTokenFacedService.svc/GetUserDetails";
                _oOneViewChannel.parameter = JSON.stringify({ "UserName": UserName, "Password": Password });
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
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("IL", "IL.AuthenticationServiceIL", Excep);
    }
}

/// <summary>
/// DAO : LoginDAO.
/// </summary>

function LoginDAO() {
    try {
        var MyInstance = this;

        /// <summary>
        /// SaveUserInfo : Save the Login Information in session.
        /// </summary>
        /// <param name="UserDTO">It contains information like (ServerId,UserName,OrganizationName..)</param>

        this.SaveUserInfo = function (UserDTO) {
            try {
                OneViewConsole.Debug("SaveUserInfo Start", "LoginDAO.SaveUserInfo");

                OneViewSessionStorage.Save("LoginUserId", UserDTO.ServerId);
                OneViewSessionStorage.Save("LoginUserName", UserDTO.UserName);
                OneViewSessionStorage.Save("LoginUserOMGuid", UserDTO.OMGuid);
                OneViewSessionStorage.Save("LoginUserOrgName", UserDTO.OrganizationName);
                OneViewSessionStorage.Save("OrganizationId", '1');

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
        this.SaveServiceInfo = function (ServiceDTO) {
            try {
                OneViewConsole.Debug("SaveServiceInfo Start", "LoginDAO.SaveServiceInfo");

                OneViewSessionStorage.Save("ServiceId", "1");
                OneViewSessionStorage.Save("ServiceName", "Maintenance Service");
                OneViewSessionStorage.Save("ServiceOMGuid", "1");

                OneViewConsole.Debug("SaveServiceInfo End", "LoginDAO.SaveServiceInfo");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "LoginDAO.SaveServiceInfo", Excep);
            }
        }
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("DAO", "DAO.LoginDAO", Excep);
    }
}

/// <summary>
/// Presenter : LoginPresenter.
/// </summary>

function LoginPresenter() {
    try {
        var MyInstance = this;

        /// <summary>
        /// LoadDashBoard : Load the Dashboard Page.
        /// </summary>

        this.LoadDashBoard = function ($location, SpinService) {
            try {
                OneViewConsole.Debug("LoadDashBoard Start", "LoginPresenter.LoadDashBoard");

                OneViewSessionStorage.Save("StartPage", "Dashboard");
                $location.url('/nav');
                
                OneViewConsole.Debug("LoadDashBoard End", "LoginPresenter.LoadDashBoard");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Presenter", "LoginPresenter.LoadDashBoard", Excep);
            }
        }

        /// <summary>
        /// HideServicePopUp : Hide the service popup with delay provided.
        /// </summary>

        this.HideServicePopUp = function ($scope, $location, $timeout) {
            try {
                OneViewConsole.Debug("HideServicePopUp Start", "LoginPresenter.HideServicePopUp");

                $timeout(function () {
                    $scope.modal.hide(); //close the popup after 1 seconds for some reason
                    //$state.go('app.dashboard');
                }, 300);

                OneViewConsole.Debug("HideServicePopUp End", "LoginPresenter.HideServicePopUp");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Presenter", "LoginPresenter.HideServicePopUp", Excep);
            }
        }

        /// <summary>
        /// ShowServicePopUp : Show the service popup.
        /// </summary>
        /// <param name="$scope"></param>

        this.ShowServicePopUp = function ($scope) {
            try {
                OneViewConsole.Debug("ShowServicePopUp Start", "LoginPresenter.ShowServicePopUp");

                $scope.modal.show();

                OneViewConsole.Debug("ShowServicePopUp End", "LoginPresenter.ShowServicePopUp");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Presenter", "LoginPresenter.ShowServicePopUp", Excep);
            }
        }
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Presenter", "Presenter.LoginPresenter", Excep);
    }
}

//----------------------------------------------End----------------------------------------------//


   
