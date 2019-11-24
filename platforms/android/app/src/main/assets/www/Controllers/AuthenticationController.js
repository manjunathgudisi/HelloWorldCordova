
//Description      :Authentication Controller(Token) for authenticating and loading the next page.
/// <param name="$scope">Current scope</param>
/// <param name="xlatService">xlatService for globalization</param>
/// <param name="toaster">toaster for toast messages</param>
/// <param name="SpinService">SpinService for loader</param>

MyApp.controller('AuthenticationController', function ($scope, $location, xlatService) {

    $scope.User = { 'RegistryURL': '', 'Token': '' };
   
    //Description      :Set the current page name for accessing globalization names.
   // xlatService.setCurrentPage('Authentication_Page');
    xlatService.setCurrentPage('1');

    var _AuthenticationFacade = new AuthenticationFacade();
    _AuthenticationFacade.Init($scope, xlatService);
    //_AuthenticationFacade.PageLoad($scope, $location, xlatService, '', '');

    /// <summary>
    /// To trigger the validation after providing token.
    /// </summary>

    $scope.Authentication = function () {              
        _AuthenticationFacade.PageLoad($scope, $location, xlatService, '', '');
        //_AuthenticationFacade.Authenticate($scope, $location, xlatService, '', '');               
    }

    $scope.ClickSaveURL = function () {     
        _AuthenticationFacade.ClickSaveURL($scope, xlatService);
    }
});

/// <summary>
/// Authentication Facade Layer(Assembler code / Work flow code).
/// </summary>
/// <returns></returns>

function AuthenticationFacade() {

        var MyInstance = this;
        //Description      :Anthentication Configuration  list which contains what type of validation enabled and a method name.
        this.Authentication_ClientValidatorConfigList = [{ 'IsDefaultClientValidator': false, 'IsCustomClientValidator': true, 'ClassName': 'TokenMandatoryValidation' }];

        this.Init = function ($scope, xlatService) {
            try {
                OneViewConsole.Debug("Init Start", "AuthenticationFacade.Init");
            
                $scope.User.RegistryURL = OneViewGlobalRegistryURlName;

                OneViewLocalStorage.Save("OneViewGlobalRegistryURL", OneViewGlobalRegistryURlName);
                oneViewGlobalVariables.RegistryURl = OneViewGlobalRegistryURlName;

                OneViewConsole.Debug("Init End", "LoginFacade.Init");
            }

            catch (Excep) {               
                oOneViewExceptionHandler.Catch(Excep, "AuthenticationFacade.Init", xlatService);
            }
            finally {
                DefaultData = null;
            }
        }

        this.PageLoad = function ($scope, $location, xlatService, toaster, SpinService) {
            try {
                OneViewConsole.Debug("Init Start", "AuthenticationFacade.Init");

                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                // Description      :  Check for the Network Status.
                var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();

                OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkStatus), "AuthenticationFacade.Init");

                if (NetworkStatus.IsNetworkAvailable == true) {

                    oSetDefaultSpinner.Start(xlatService.xlat('Registering the Device'));

                    var Req = { "userId": 1, "organizationId": 2 };

                    var _oTokenAuthenticationIL = new TokenAuthenticationIL('');
                    var Response = _oTokenAuthenticationIL.GetToken(Req);
                    
                    if (Response.OneViewExceptionDTO.IsAnyException == false && Response.TokenId != "") {
                        $scope.User.Token = Response.TokenId;
                        MyInstance.Authenticate($scope, $location, xlatService, '', '');
                    }
                    else {
                        alert(xlatService.xlat('DeviceRegistrationError'));
                        OneViewConsole.Info("Error while registering the device", "AuthenticationFacade.Authenticate");
                    }

                    oSetDefaultSpinner.Stop();
                }
                else {
                    alert(xlatService.xlat('NoInternetConnectionToRegisterDevice'));
                    OneViewConsole.Info("No Internet Connection", "AuthenticationFacade.Authenticate");
                }

                OneViewConsole.Debug("Init End", "LoginFacade.Init");
            }

            catch (Excep) {
                oOneViewExceptionHandler.Catch(Excep, "AuthenticationFacade.Init", xlatService);
            }
            finally {
                DefaultData = null;
            }
        }

        /// <summary>
        /// To Validate the Token from the Configuration List provided.
        /// </summary>
        /// <param name="ClientValidatorConfigList">1.IsCustomClientValidator: User can change the validation configuration if it this field is true</param>
                                                   ///2.IsDefaultClientValidator: User can't able to change the validation configuration.
        /// <returns>IsSuccess(True/False) : It returns false if the token is not provieded nor it will return true</returns>

        var DefaultValidation = function ($scope, ClientValidatorConfigList, xlatService) {
            try {
                OneViewConsole.Debug("DefaultValidation Start", "AuthenticationFacade.DefaultValidation");
                var oDefaultValidationResponse = null;
                // validation
                for (var i = 0; i < ClientValidatorConfigList.length; i++) {
                    var _oValidator = ClientValidatorConfigList[i];
                    if (_oValidator.IsDefaultClientValidator == true) {

                    }
                    if (_oValidator.IsCustomClientValidator == true) {

                        var oCustomClientValidator = new window[_oValidator.ClassName]();

                        oDefaultValidationResponse = oCustomClientValidator.Validate($scope.User, xlatService);

                        OneViewConsole.Debug("DefaultValidation.oDefaultValidationResponse :" + JSON.stringify(oDefaultValidationResponse), "AuthenticationFacade.DefaultValidation");

                        if (oDefaultValidationResponse.IsSuccess == false) {
                            IsValidationSuccess = false;
                            break;
                        }
                    }
                }
                OneViewConsole.Debug("DefaultValidation End", "AuthenticationFacade.DefaultValidation");
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
        /// Authenticate: To check the token provided is valid or expired if internet avilable and if it is valid save the token information and navigate to next Page.
        /// </summary>

        this.Authenticate = function($scope, $location, xlatService, toaster, SpinService) {
            try {

                OneViewConsole.Debug("Authenticate Start", "AuthenticationFacade.Authenticate");
               
                if ($scope.User != undefined && $scope.User.RegistryURL != undefined && $scope.User.RegistryURL != "") {

                if(ValidateURL($scope.User.RegistryURL,xlatService)){

                //var _oRegistryUrl = $scope.User.RegistryURL + '/Registry/';
                var _oRegistryUrl = $scope.User.RegistryURL ;
            
                OneViewLocalStorage.Save("OneViewGlobalRegistryURL", _oRegistryUrl);
                oneViewGlobalVariables.RegistryURl = _oRegistryUrl;  


                //oSetDefaultSpinner.Start();
              
                var oDefaultValidationResponse = DefaultValidation($scope, MyInstance.Authentication_ClientValidatorConfigList, xlatService);

                OneViewConsole.Debug("Authenticate.oDefaultValidationResponse :" + JSON.stringify(oDefaultValidationResponse), "AuthenticationFacade.Authenticate");
                
                if (oDefaultValidationResponse.IsSuccess == true) {

                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    // Description      :  Check for the Network Status.
                    var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();

                    OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkStatus), "AuthenticationFacade.Authenticate");
                  
                    if (NetworkStatus.IsNetworkAvailable == true) {

                        var _oTokenAuthenticationServiceIL = new TokenAuthenticationIL(toaster);
                        //Description :Get the Token Details.
                        ///JSON
                        var _oOneViewDeviceInfoPlugin = new OneViewDeviceInfoPlugin();
                        var DeviceInfo = _oOneViewDeviceInfoPlugin.GetDeviceInfo();
                        var req = {
                            "TokenId": $scope.User.Token,
                            "DeviceInfo":DeviceInfo
                        }
                        //var _oUserDTO = _oTokenAuthenticationServiceIL.GetTokenDetails($scope.User.Token);
                        var _oUserDTO = _oTokenAuthenticationServiceIL.GetTokenDetailsExtended(req);
                        if (_oUserDTO != null && _oUserDTO.IsAnyException == false) {

                            if (_oUserDTO.IsInvalidToken == true) {
                               
                                if (_oUserDTO.Status == "0") {
                                    // toaster.pop('error', xlatService.xlat('Title_Error'), xlatService.xlat('TokenInvalid'));
                                    alert(xlatService.xlat('TokenInvalid'));
                                    OneViewConsole.Info("Token Status : Invalid", "AuthenticationFacade.Authenticate");
                                }

                                else if(_oUserDTO.Status == "-1"){
                                    //  toaster.pop('error', xlatService.xlat('Title_Error'), xlatService.xlat('TokenExpired'));
                                    alert(xlatService.xlat('TokenExpired'));
                                    OneViewConsole.Info("Token Status : Expired", "AuthenticationFacade.Authenticate");
                                }
                                //FocusControl($scope, "txtToken");
                            }
                            else {
                                var _oAuthenticationServiceDAO = new AuthenticationDAO();
                                // Description      : Save the Token Details Information(OneViewRegistryIp,OneViewRegistryPort,ServiceUrl,StartPage...etc).
                                var _oSaveTokenInfo = _oAuthenticationServiceDAO.SaveTokenInfo(_oUserDTO);
                                SaveDeviceId(_oUserDTO.DeviceCode);
                                //var _oDbStructureController = new DbStructureController();
                                //_oDbStructureController.ReCreate();

                                var _oTokenPresenter = new AuthenticationPresenter();
                                // Description      : Call the Presentation layer to load the next page.
                                _oTokenPresenter.LoadLogin($scope, $location, SpinService);
                            }
                        }
                        else if (_oUserDTO != null && _oUserDTO.IsAnyException == true) {
                            //toaster.pop('error', xlatService.xlat('Title_Error'), xlatService.xlat('ServerError'));
                            alert(xlatService.xlat('ServerError'));
                            OneViewConsole.Info("Token Status : Server Error", "AuthenticationFacade.Authenticate");
                        }
                    }
                    else {
                        //toaster.pop('warning', xlatService.xlat('Title_Notification'), xlatService.xlat('NoInternetConnection'));
                        alert(xlatService.xlat('NoInternetConnection'));
                        OneViewConsole.Info("No Internet Connection", "AuthenticationFacade.Authenticate");
                    }
                }
                else {                  
                    // toaster.pop('error', xlatService.xlat('Title_Error'), oDefaultValidationResponse.MessageKey);
                    alert(oDefaultValidationResponse.MessageKey);
                    OneViewConsole.Info(oDefaultValidationResponse.MessageKey, "AuthenticationFacade.Authenticate");
                    //FocusControl($scope, "txtToken");
                }

                //oSetDefaultSpinner.Stop();
                }
                }
                else {
                    alert(xlatService.xlat('MN-RQ-AUT-001 :: Please enter all fileds'));
                }
                OneViewConsole.Debug("Authenticate End", "AuthenticationFacade.Authenticate");
            }
            catch (Excep) {               
                oOneViewExceptionHandler.Catch(Excep, "AuthenticationFacade.Authenticate", xlatService);
            }

            finally {
                oDefaultValidationResponse = null;
                oOneViewCordovaPlugin = null;
                NetworkStatus = null;
                _oUserDTO = null;
                _oAuthenticationServiceDAO = null;
                _oSaveTokenInfo = null;
                _oDbStructureController = null;
                _oTokenPresenter = null;
            }
        }

        var SaveDeviceId = function (DeviceId) {
            OneViewLocalStorage.Save("DeviceId", DeviceId);
        }


        this.ClickSaveURL = function ($scope, xlatService) {
            try {
                OneViewConsole.Debug("ClickSaveURL Start", "AuthenticationFacade.ClickSaveURL");

                if ($scope.User != undefined && $scope.User.RegistryURL != undefined && $scope.User.RegistryURL != "") {
                            
                    if (ValidateURL($scope.User.RegistryURL, xlatService)) {
                        var _oRegistryUrl = $scope.User.RegistryURL;

                        OneViewLocalStorage.Save("OneViewGlobalRegistryURL", _oRegistryUrl);
                        oneViewGlobalVariables.RegistryURl = _oRegistryUrl;
                        $scope.PopupShow = false;
                    }
                }
                else {
                    alert(xlatService.xlat('MN-RQ-AUT-001 :: Please enter URL'));
                }

                OneViewConsole.Debug("ClickSaveURL End", "LoginFacade.ClickSaveURL");
            }

            catch (Excep) {                
                oOneViewExceptionHandler.Catch(Excep, "AuthenticationFacade.ClickSaveURL", xlatService);
            }
            finally {
                DefaultData = null;
            }
        }
    
        var ValidateURL = function (URL, xlatService) {
            var regexp = new RegExp("^http(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$");
            var ISSuccess = true;

            if (!regexp.test(URL)) {
                alert(xlatService.xlat('MN-RQ-AUT-002 :: Please enter valid URL'));
                ISSuccess = false;
            }
            return ISSuccess;
        }
   
}

var FocusControl = function ($scope, Id) {

    try {
        document.getElementById(Id).focus();
        $scope.$apply();
    }
    catch (Excep) {
        oOneViewExceptionHandler.Catch(Excep, "LoginFacade.FocusUserName", xlatService);
    }
}

/// <summary>
/// Validate the Token fields.
/// </summary>
/// <returns>_oDefaultValidationResponse</returns>

function TokenMandatoryValidation() {
    try {
        
        var _oDefaultValidationResponse = new DefaultValidationResponse();

  
        /// <summary>
        /// To Check token is provided or not.
        /// </summary>
        /// <param name="User">Logged in user</param>
        /// <returns>ValidationResponse : 1. It returns false if token field is empty with the message to display to user and retuns true if it is not empty</returns>
        this.Validate = function (User, xlatService) {
            try{
                OneViewConsole.Debug("Validate Start", "TokenMandatoryValidation.Validate");
                OneViewConsole.Debug("User :", JSON.stringify(User));
                if (User == undefined) {
                    _oDefaultValidationResponse.IsSuccess = false;
                    _oDefaultValidationResponse.MessageKey = xlatService.xlat("ProvideTokenDetails");
                }
                else if (User.Token != "") {
                    _oDefaultValidationResponse.IsSuccess = true;
                }
                else {
                    _oDefaultValidationResponse.IsSuccess = false;
                    _oDefaultValidationResponse.MessageKey = xlatService.xlat("ProvideTokenDetails");
                }
                OneViewConsole.Debug("Response from validation" + JSON.stringify(_oDefaultValidationResponse), "TokenMandatoryValidation.Validate");
                OneViewConsole.Debug("Validate End", "TokenMandatoryValidation.Validate");
                return _oDefaultValidationResponse;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Validation", "TokenMandatoryValidation.Validate", Excep);
            }

        }
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Validation", "Validation.TokenMandatoryValidation", Excep);
    }
}

/// <summary>
/// Integration Layer : TokenAuthenticationIL.
/// </summary>

function TokenAuthenticationIL(toaster) {
    try {
        var MyInstance = this;

        /// <summary>
        /// GetTokenDetails : Get the Token Details from the service if the token is valid and not expired.
        /// </summary>
        /// <param name="Token">Provided Token</param>
        /// <returns>Token Details : It returns the true if it is valid and other information like (OneViewRegistryIp,OneViewRegistryPort,ServiceUrl ...) 
        ///and returns false if the token is invalid and expired</returns>

        this.GetTokenDetails = function (Token) {
            try {
                OneViewConsole.Debug("GetTokenDetails Start", "TokenAuthenticationIL.GetTokenDetails");
                OneViewConsole.Debug("Token :", JSON.stringify(Token));
                var _oOneViewChannel = new OneViewChannel();
                //_oOneViewChannel.toaster = toaster;
                _oOneViewChannel.url = oneViewGlobalVariables.RegistryURl + "OneViewTokenFacedService.svc/GetAppDetails";
                _oOneViewChannel.parameter = JSON.stringify({ "tokenId": Token });
                var oUserDTO = _oOneViewChannel.Send();
                OneViewConsole.Debug("GetTokenDetails End", "TokenAuthenticationIL.GetTokenDetails");
                if (oUserDTO != null) {
                    OneViewConsole.DataLog("Response from Server" + JSON.stringify(oUserDTO.GetAppDetailsResult), "TokenAuthenticationIL.GetTokenDetails");
                    return oUserDTO.GetAppDetailsResult;
                }
                else {
                    return oUserDTO;
                }

            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("IL", "TokenAuthenticationIL.GetTokenDetails", Excep);
            }
            finally {
                _oOneViewChannel = null;
                oUserDTO = null;
            }
        }

        this.GetTokenDetailsExtended = function (Req) {
            try {
                OneViewConsole.Debug("GetTokenDetails Start", "TokenAuthenticationIL.GetTokenDetails");
                OneViewConsole.Debug("Req :", JSON.stringify(Req));
                var _oOneViewChannel = new OneViewChannel();
                //_oOneViewChannel.toaster = toaster;
                _oOneViewChannel.url = oneViewGlobalVariables.RegistryURl + "OneViewTokenFacedService.svc/GetAppDetailsExtended";
                _oOneViewChannel.parameter = JSON.stringify({ "Req": JSON.stringify(Req) });
                var oUserDTO = _oOneViewChannel.Send();
               
                OneViewConsole.Debug("GetTokenDetails End", "TokenAuthenticationIL.GetTokenDetails");
                if (oUserDTO != null) {
                    OneViewConsole.DataLog("Response from Server" + JSON.stringify(oUserDTO.GetAppDetailsExtendedResult), "TokenAuthenticationIL.GetTokenDetails");
                    return oUserDTO.GetAppDetailsExtendedResult;
                }
                else {
                    return oUserDTO;
                }

            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("IL", "TokenAuthenticationIL.GetTokenDetails", Excep);
            }
            finally {
                _oOneViewChannel = null;
                oUserDTO = null;
            }
        }

        this.GetToken = function (Req) {
            try {
                OneViewConsole.Debug("GetToken Start", "TokenAuthenticationIL.GetToken");
                
                var _oOneViewChannel = new OneViewChannel();
                _oOneViewChannel.url = oneViewGlobalVariables.RegistryURl + "OneViewTokenFacedService.svc/GetToken";
                _oOneViewChannel.parameter = JSON.stringify(Req);
                var oTokenDTO = _oOneViewChannel.Send();
                
                OneViewConsole.Debug("GetToken End", "TokenAuthenticationIL.GetToken");

                if (oTokenDTO != null) {
                    OneViewConsole.DataLog("Response from Server" + JSON.stringify(oTokenDTO.GetTokenResult), "TokenAuthenticationIL.GetToken");
                    return oTokenDTO.GetTokenResult;
                }
                else {
                    return oTokenDTO;
                }

            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("IL", "TokenAuthenticationIL.GetTokenDetails", Excep);
            }
            finally {
                _oOneViewChannel = null;
                oTokenDTO = null;
            }
        }
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("IL", "IL.TokenAuthenticationIL", Excep);
    }
}

/// <summary>
/// DAO : AuthenticationDAO.
/// </summary>

function AuthenticationDAO() {
    try{
        var MyInstance = this;
        /// <summary>
        /// SaveTokenInfo : Save the Token Information like (OneViewRegistryIp,OneViewRegistryPort,ServiceUrl ...) in session and set the next page to load.
        /// </summary>
        this.SaveTokenInfo = function (TokenDTO) {
            try {
                OneViewConsole.Debug("SaveTokenInfo start", "AuthenticationDAO.SaveTokenInfo");
                OneViewConsole.Debug("TokenDTO :", JSON.stringify(TokenDTO));
                OneViewLocalStorage.Save("OneViewRegistryIp", TokenDTO.OneViewRegistryIp);
                OneViewLocalStorage.Save("OneViewRegistryPort", TokenDTO.OneViewRegistryPort);
                OneViewLocalStorage.Save("OneViewRegistryApp", TokenDTO.OneViewRegistryApp);
                OneViewLocalStorage.Save("Protocol", TokenDTO.Protocol);
                OneViewLocalStorage.Save("ServiceUrl", TokenDTO.ServiceUrl);
                OneViewLocalStorage.Save("StartPage", "Login");
                OneViewConsole.Debug("SaveTokenInfo end", "AuthenticationDAO.SaveTokenInfo");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("DAO", "AuthenticationDAO.SaveTokenInfo", Excep);
            }
        }
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("DAO", "DAO.AuthenticationDAO", Excep);
    }
}

/// <summary>
/// Presenter : AuthenticationPresenter.
/// </summary>

function AuthenticationPresenter() {
    try{
        var MyInstance = this;       
        /// <summary>
        /// LoadLogin : Load the Login Page.
        /// </summary>
        this.LoadLogin = function ($scope, $location, SpinService) {
            try {
                OneViewConsole.Debug("LoadLogin start", "AuthenticationPresenter.LoadLogin");
                $location.url('/login');
                OneViewConsole.Debug("LoadLogin end", "AuthenticationPresenter.LoadLogin");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Presenter", "AuthenticationPresenter.LoadLogin", Excep);
            }
        }
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Presenter", "Presenter.AuthenticationPresenter", Excep);
    }
}

//----------------------------------------------End----------------------------------------------//

    
