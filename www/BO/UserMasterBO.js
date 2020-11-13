
// UserMasterBO
function UserMasterBO(xlatService) {

    // Current Scope
    var MyInstance = this;


    /// <summary>
    /// Reset Password
    /// </summary>
    /// <param name="UserId">UserId</param>
    /// <param name="OldPassword">OldPassword</param>
    /// <param name="NewPassword">NewPassword</param>
    /// <param name="ConfirmPassword">ConfirmPassword</param>
    /// <returns>true or false</returns>  
    this.ResetPassword = function (UserId, OldPassword, NewPassword, ConfirmPassword) {
        try {
            OneViewConsole.Debug("ResetPassword start", "UserMasterBO.ResetPassword");

            var IsSuccess = false;

            if (OldPassword != NewPassword) {

                if (NewPassword == ConfirmPassword) {

                    var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                    var NetworkStatus = oOneViewCordovaPlugin.CheckNetworkStatus();
                    OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkStatus), "UserMasterBO.ResetPassword");

                    if (NetworkStatus.IsNetworkAvailable == true) {

                        oSetDefaultSpinner.Start("Resetting the password");

                        var _oUserMasterIL = new UserMasterIL();
                        var _oResetPasswordresponse = _oUserMasterIL.ResetPassword(UserId, OldPassword, NewPassword, ConfirmPassword);

                        if (_oResetPasswordresponse != null && _oResetPasswordresponse.isAnyException == false) {
                            var _oUserMasterDAO = new UserMasterDAO();
                            _oUserMasterDAO.ResetPassword(UserId, NewPassword);
                            IsSuccess = true;
                        }
                        else if (_oResetPasswordresponse != null && _oResetPasswordresponse.ExceptionMessage == "Old Password is not correct.") {
                            //alert(xlatService.xlat('VL-CU-MSE-004 :: Old Password is not matched'));
							navigator.notification.alert(xlatService.xlat('VL-CU-MSE-004 :: Old Password is not matched'), ['OK'], "");
                        }
                        else if (_oResetPasswordresponse != null && _oResetPasswordresponse.isAnyException == true) {
                            //alert(xlatService.xlat('ER-CU-MSE-001 ::Server error, Please contact Administrator'));
							navigator.notification.alert(xlatService.xlat('ER-CU-MSE-001 ::Server error, Please contact Administrator'), ['OK'], "");
                        }

                        oSetDefaultSpinner.Stop();
                    }
                    else {
                        navigator.notification.alert(xlatService.xlat('NoInternetConnection'), ['OK'], "");
                        OneViewConsole.Info("No Internet Connection", "UserMasterBO.ResetPassword");
                    }
                }
                else {
                    //alert(xlatService.xlat('VL-CU-MSE-005 :: New Password and Confirm Passwords are not matched'));
					navigator.notification.alert(xlatService.xlat('VL-CU-MSE-005 :: New Password and Confirm Passwords are not matched'), ['OK'], "");
                }
            }
            else {
                //alert(xlatService.xlat('VL-CU-MSE-006 :: Old Password and New Passwords are same'));
				navigator.notification.alert(xlatService.xlat('VL-CU-MSE-006 :: Old Password and New Passwords are same'), ['OK'], "");
            }

            OneViewConsole.Debug("ResetPassword end", "UserMasterBO.ResetPassword");

            return IsSuccess;
        }
        catch (Excep) {
            oSetDefaultSpinner.Stop();
            throw oOneViewExceptionHandler.Create("BO", "UserMasterBO.ResetPassword", Excep);
        }
    }
}

// UserMasterIL
function UserMasterIL() {

    // Current Scope
    var MyInstance = this;


    /// <summary>
    /// Ajax call for Reset Password
    /// </summary>
    /// <param name="UserId">UserId</param>
    /// <param name="OldPassword">OldPassword</param>
    /// <param name="NewPassword">NewPassword</param>
    /// <param name="ConfirmPassword">ConfirmPassword</param>
    /// <returns>_oResetPasswordresponse</returns>
    this.ResetPassword = function (UserId, OldPassword, NewPassword, ConfirmPassword) {
        try {
            OneViewConsole.Debug("ResetPassword start", "UserMasterIL.GetProfileDcPlaceView");

            var RequestParam = { "UserId": UserId, "OldPassword": OldPassword, "NewPassword": NewPassword, "ConfirmPassword": ConfirmPassword };

            OneViewConsole.DataLog("Request from device : " + JSON.stringify(RequestParam), "UserMasterIL.ResetPassword");

            var _oOneViewChannel = new OneViewChannel();
            // _oOneViewChannel.toaster = toaster;
            _oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/ResetPassword";
            _oOneViewChannel.parameter = JSON.stringify(RequestParam);
            var _oResetPasswordresponse = _oOneViewChannel.Send();

            OneViewConsole.Debug("GetProfileDcPlaceView end", "UserMasterIL.ResetPassword");

            if (_oResetPasswordresponse != null) {

                OneViewConsole.DataLog("Response from server : " + JSON.stringify(_oResetPasswordresponse.ResetPasswordResult), "UserMasterIL.ResetPassword");

                return _oResetPasswordresponse.ResetPasswordResult;
            }
            else {
                return _oResetPasswordresponse;
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("IL", "UserMasterIL.ResetPassword", Excep);
        }
    }
}
