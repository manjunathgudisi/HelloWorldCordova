MyApp.controller('MyAlertsController', function ($scope, $state, $stateParams, xlatService, toaster) {
    xlatService.setCurrentPage('MyAlerts_Page');
    document.getElementById('PageTitle').innerHTML = xlatService.xlat('PageTitle');
    //var oOneViewCordovaPlugin = new OneViewCordovaPlugin();
    var UploadStatus = null;


    $scope.ResetDB = function () {
        //var oResetData = new ResetData();
        //var Status = oResetData.ResetCompleteDB();
        //if (Status == true) {
        var Message = null;
        if (UploadStatus == true) {
            Message = "Are you sure you want to reset the DB ?";
        }
        else {
            Message = "DB is not synced.Are you sure you want to reset the DB ?";
        }
        var IsSuccess = oOneViewDefaultConfirmBox.Show(Message);

        if (IsSuccess == true) {
            oSetDefaultSpinner.Start();
            var oDbStructureController = new DbStructureController();
            oDbStructureController.CleanDb();
            var oDateTime = new DateTime();
            var CurrentDate = oDateTime.GetDate();
            OneViewLocalStorage.Remove("LastResetDate");
            OneViewLocalStorage.Save("LastResetDate", CurrentDate);
            toaster.pop('success', 'Success', 'DB Cleaned successfully');
            if ($scope.NewDCModel['NotifyCount'] == 1) {
                $scope.NewDCModel['NotifyCount'] = '';
            }
            else {
                $scope.NewDCModel['NotifyCount'] -= 1;
            }
            oSetDefaultSpinner.Stop();
            $state.go('login');
        }
        //}
        //else {
        //    toaster.pop('error', 'Error', 'DB Cleaned unsuccessfully');
        //}
    }
    $scope.UPLOAD = function () {
        try {
            var Message = "Are you sure you want to upload DB ?";
            var IsSuccess = oOneViewDefaultConfirmBox.Show(Message);

            if (IsSuccess == true) {
                var _oUploadBO = new UploadBO(xlatService, toaster);
                UploadStatus = _oUploadBO.BulkUpload();               
            }
        }
        catch (Excep) {

        }
    }

    $scope.$on('$destroy', function () {
        // alert('MyAlertsController $destroy start');
        oOneViewAppInfoPlugin.ClearCache();
        $scope = null;
        UploadStatus = null;
    });

});