
// LandingPageProfileBO
function LandingPageProfileBO(xlatService) {

    // Current Scope
    var MyInstance = this;


    /// <summary>
    /// Download
    /// </summary>
    this.Download = function () {

        try {
            OneViewConsole.Debug("Download start", "LandingPageProfileBO.Download");

            var IsSuccess = true;

            try {               
                // Checking network availability
                var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
                var NetworkDetails = oOneViewCordovaPlugin.CheckNetworkStatus();

                OneViewConsole.Debug("NetworkDetails : " + JSON.stringify(NetworkDetails), "LandingPageProfileBO.Download");

                // If network is available
                if (NetworkDetails.IsNetworkAvailable == true) {
                    
                    var FilterParams = { OSGuid: OneViewSessionStorage.Get("ServiceId"), UserId: OneViewSessionStorage.Get("LoginUserId"), TemplateId: [], FromDate: '', ToDate: '', DcPlaceDimension: 0, DcPlaceIds: [] };
                    var UserProfileLst = new LandingPageProfileIL().GetAllDcProfiles(FilterParams);

                    if (UserProfileLst != null && UserProfileLst.IsAnyException == false) {

                        if (UserProfileLst.UserProfiles != null) {

                            var oDcProfileNormalizer = new DcProfileNormalizer();
                            
                            var ProfileData = null;
                        
                            if (UserProfileLst.UserProfiles.DataCaptureProfileLst.length != 0) {                              
                                ProfileData = oDcProfileNormalizer.NormalizeList(UserProfileLst.UserProfiles.DataCaptureProfileLst);                                
                            }

                            if (ProfileData != null) {
                                var _oProfileDownloadBO = new ProfileDownloadBO();
                                _oProfileDownloadBO.InsertProfiles(ProfileData);
                            }
                        }                       
                    }
                    else {
                        IsSuccess = (UserProfileLst != null) ? false : UserProfileLst;
                    }
                }

                OneViewConsole.Debug("DownLoadProfile end", "LandingPageProfileBO.Download");
            }
            // If any exception
            catch (Excep) {
                IsSuccess = false;
                throw Excep;
            }

            return IsSuccess;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageProfileBO.Download", Excep);
        }
        finally {          
        }   
    }
}

// LandingPageProfileIL
function LandingPageProfileIL() {

    // Current Scope
    var MyInstance = this;


    /// <summary>
    /// GetAllDcProfiles
    /// </summary>    
    this.GetAllDcProfiles = function (DownloadList) {
        try {
            OneViewConsole.Debug("GetLandingPageConfig Start", "LandingPageProfileIL.GetAllDcProfiles");

            var RequestParam = JSON.stringify(DownloadList);

            OneViewConsole.DataLog("Request from device : " + RequestParam, "LandingPageProfileIL.GetAllDcProfiles");

            var _oOneViewChannel = new OneViewChannel();
            // _oOneViewChannel.toaster = toaster;
            _oOneViewChannel.url = oneViewGlobalVariables.FoodSafetyServiceURL + "UserProfileFacedService.svc/GetDCProfile_test";
            _oOneViewChannel.parameter = JSON.stringify({ "req": RequestParam });
            var oUserProfileLst = _oOneViewChannel.Send();
            // alert(JSON.stringify(oUserProfileLst));
            if (oUserProfileLst != null) {
                oUserProfileLst = JSON.parse(oUserProfileLst.GetDCProfile_testResult);

                OneViewConsole.DataLog("Response from server : " + oUserProfileLst.GetDCProfile_testResult, "LandingPageProfileIL.GetAllDcProfiles");
                return oUserProfileLst;
            }
            else {
                return oUserProfileLst;
            }


            return oUserProfileLst;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("IL", "LandingPageProfileIL.GetAllDcProfiles", Excep);
        }
        finally {
            _oOneViewChannel = null;
            oLandingPageConfigDTO = null;
        }
    }
}
