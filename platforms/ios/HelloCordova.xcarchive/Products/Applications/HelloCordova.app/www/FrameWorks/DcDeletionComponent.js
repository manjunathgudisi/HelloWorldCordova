
// to do : Get dc deletion config cross check it
function DcDeletion() {

    var oOneViewSqlitePlugin = new OneViewSqlitePlugin();
    var MyInstance = this;

        this.ExcecuteGarbageCollector = function (TemplateId, DcPlaceId) {

            try {
                OneViewConsole.Debug("ExcecuteGarbageCollector start", "DcDeletion.ExcecuteGarbageCollector");

                MyInstance.DeleteCompleteAndSyncedData(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
                MyInstance.DeleteInCompleteAndSyncedData(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
                MyInstance.DeleteInCompleteAndSyncedDataInDays(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
                MyInstance.DeleteCompletedSyncAndApprovedData(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
                MyInstance.DeleteCompletedSyncAndOnDeviceApprovalFinishedData(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
                if (OneViewSessionStorage.Get("ServiceId") == 39) {
                    MyInstance.DeleteInActivePurchaseOrder(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
                    MyInstance.DeleteItemCompletedorInActiveInPurchaseOrder(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
                    MyInstance.DeleteCompletedItemInPurchaseOrder(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);
                }
                MyInstance.DeleteExpiredOrderItems(OneViewSessionStorage.Get("ServiceId"), TemplateId, OneViewSessionStorage.Get("LoginUserId"), DcPlaceId);

                OneViewConsole.Debug("ExcecuteGarbageCollector end", "DcDeletion.ExcecuteGarbageCollector");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("BO", "DcDeletion.ExcecuteGarbageCollector", Excep);
            }
            finally {
            }
        }

        this.DeleteCompleteAndSyncedData = function (ServiceId, TemplateNodeId, LoginUserId, DcPlaceId) {
            try {
                OneViewConsole.Debug("DeleteCompleteAndSyncedData Start", "DcDeletion.DeleteCompleteAndSyncedData");

                var _oDcDeletionBO = new DcDeletionBO();
                var DeletionData = _oDcDeletionBO.SetMetadata({ ServiceId: ServiceId, DcUserId: LoginUserId, TemplateNodeId: TemplateNodeId, DcPlaceId: DcPlaceId })
                //alert("DeleteCompleteAndSyncedData : " + JSON.stringify(DeletionData));
                if (DeletionData != null) {
                 
                    if (DeletionData.Configuration.CompletedAndSynced != -1) {
                        var ConfigCount = DeletionData.Configuration.CompletedAndSynced;
                       
                        var Query = "SELECT DISTINCT DataCaptureEntity.Id AS Id,DataCaptureEntity.ClientGuid AS ClientGuid FROM DataCaptureEntity INNER JOIN DcResultsEntity  ON DataCaptureEntity.Id=DcResultsEntity.DataCaptureId WHERE DataCaptureEntity.IsCompleted='true' AND DataCaptureEntity.IsSynchronized='true' AND DataCaptureEntity.IsForAction != 'true' AND DataCaptureEntity.IsForHistory != 'true' AND (-1=" + DeletionData.UserId + " OR  DcResultsEntity.SystemUserId=" + DeletionData.UserId + ") AND (-1=" + TemplateNodeId + " OR  DataCaptureEntity.TemplateNodeId=" + TemplateNodeId + ") AND (-1=" + DeletionData.DCPlaceNodeId + " OR  DataCaptureEntity.DcPlaceId=" + DeletionData.DCPlaceNodeId + ") AND DataCaptureEntity.Id NOT IN (SELECT Id FROM DataCaptureEntity ORDER BY TimeStamp DESC LIMIT '" + ConfigCount + "' OFFSET '0')";
                        var result = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);
                        DeleteDataCaptures(result);
                    }
                }
                OneViewConsole.Debug("DeleteCompleteAndSyncedData End", "DcDeletion.DeleteCompleteAndSyncedData");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "DcDeletion.DeleteCompleteAndSyncedData", Excep);
            }
            finally {
                //GetDataFromMetaData = null;
                DeletionData = null;
                ConfigCount = null;
                Query = null;
                result = null;
                oDcDAO = null;
                oActionDAO = null;
                _oOneViewSqlitePlugin = null;
            }
        }

        this.DeleteCompletedSyncAndApprovedData = function (ServiceId, TemplateNodeId, LoginUserId, DcPlaceId) {
            try {
                OneViewConsole.Debug("DeleteCompletedSyncAndApprovedData Start", "DcDeletion.DeleteCompletedSyncAndApprovedData");

                var _oDcDeletionBO = new DcDeletionBO();
                var DeletionData = _oDcDeletionBO.SetMetadata({ ServiceId: ServiceId, DcUserId: LoginUserId, TemplateNodeId: TemplateNodeId, DcPlaceId: DcPlaceId });
                //alert("DeleteCompletedSyncAndApprovedData : " + JSON.stringify(DeletionData));
                if (DeletionData != null) {
                 
                    if (DeletionData.Configuration.CompletedSyncedAndApproved != -1) {

                        var ConfigCount = DeletionData.Configuration.CompletedSyncedAndApproved;

                        var Query = "SELECT DISTINCT DataCaptureEntity.Id AS Id,DataCaptureEntity.ClientGuid AS ClientGuid FROM DataCaptureEntity INNER JOIN DcResultsEntity  ON DataCaptureEntity.Id=DcResultsEntity.DataCaptureId WHERE DataCaptureEntity.IsCompleted='true' AND DataCaptureEntity.IsSynchronized='true' AND DataCaptureEntity.ApprovalStatus='1' AND DataCaptureEntity.IsForAction != 'true' AND DataCaptureEntity.IsForHistory != 'true' AND (-1=" + DeletionData.UserId + " OR  DcResultsEntity.SystemUserId=" + DeletionData.UserId + ") AND (-1=" + TemplateNodeId + " OR  DataCaptureEntity.TemplateNodeId=" + TemplateNodeId + ") AND (-1=" + DeletionData.DCPlaceNodeId + " OR  DataCaptureEntity.DcPlaceId=" + DeletionData.DCPlaceNodeId + ") AND DataCaptureEntity.Id NOT IN (SELECT Id FROM DataCaptureEntity ORDER BY TimeStamp DESC LIMIT '" + ConfigCount + "' OFFSET '0')";
                        var result = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);
                        DeleteDataCaptures(result);
                    }
                }
                OneViewConsole.Debug("DeleteCompletedSyncAndApprovedData End", "DcDeletion.DeleteCompletedSyncAndApprovedData");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "DcDeletion.DeleteCompletedSyncAndApprovedData", Excep);
            }
            finally {
                //GetDataFromMetaData = null;
                DeletionData = null;
                ConfigCount = null;
                Query = null;
                result = null;
                oDcDAO = null;
                oActionDAO = null;
                _oOneViewSqlitePlugin = null;
            }
        }

        this.DeleteCompletedSyncAndOnDeviceApprovalFinishedData = function (ServiceId, TemplateNodeId, LoginUserId, DcPlaceId) {
            try {
                OneViewConsole.Debug("DeleteCompletedSyncAndOnDeviceApprovalFinishedData Start", "DcDeletion.DeleteCompletedSyncAndOnDeviceApprovalFinishedData");

                var _oDcDeletionBO = new DcDeletionBO();
                var DeletionData = _oDcDeletionBO.SetMetadata({ ServiceId: ServiceId, DcUserId: LoginUserId, TemplateNodeId: TemplateNodeId, DcPlaceId: DcPlaceId });
                //alert("DeleteCompletedSyncAndOnDeviceApprovalFinishedData : " + JSON.stringify(DeletionData));
                if (DeletionData != null) {
      
                    var IsOnDeviceApprovalFinished = DeletionData.Configuration.IsOnDeviceApprovalFinished;

                    if (IsOnDeviceApprovalFinished == true) {

                        var Query = "SELECT DISTINCT DataCaptureEntity.Id AS Id,DataCaptureEntity.ClientGuid AS ClientGuid FROM DataCaptureEntity INNER JOIN DcResultsEntity  ON DataCaptureEntity.Id=DcResultsEntity.DataCaptureId WHERE DataCaptureEntity.IsCompleted='true' AND DataCaptureEntity.IsSynchronized='true' AND DataCaptureEntity.IsOnDeviceApprovalFinished='true' AND DataCaptureEntity.IsForAction != 'true' AND DataCaptureEntity.IsForHistory != 'true' AND (-1=" + DeletionData.UserId + " OR  DcResultsEntity.SystemUserId=" + DeletionData.UserId + ") AND (-1=" + TemplateNodeId + " OR  DataCaptureEntity.TemplateNodeId=" + TemplateNodeId + ") AND (-1=" + DeletionData.DCPlaceNodeId + " OR  DataCaptureEntity.DcPlaceId=" + DeletionData.DCPlaceNodeId + ")";
                        var result = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);
                        DeleteDataCaptures(result);
                    }
                }
                OneViewConsole.Debug("DeleteCompletedSyncAndOnDeviceApprovalFinishedData End", "DcDeletion.DeleteCompletedSyncAndOnDeviceApprovalFinishedData");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "DcDeletion.DeleteCompletedSyncAndOnDeviceApprovalFinishedData", Excep);
            }
            finally {
                //GetDataFromMetaData = null;
                DeletionData = null;
                ConfigCount = null;
                Query = null;
                result = null;
                oDcDAO = null;
                oActionDAO = null;
                _oOneViewSqlitePlugin = null;
            }
        }

        this.DeleteCompleteAndUnSyncedData = function () {
            try {
                OneViewConsole.Debug("DeleteCompleteAndUnSyncedData Start", "DcDeletion.DeleteCompleteAndUnSyncedData");

                var _oDcDeletionBO = new DcDeletionBO();
                var DeletionData = _oDcDeletionBO.SetMetadata({ ServiceId: ServiceId, DcUserId: LoginUserId, TemplateNodeId: TemplateNodeId, DcPlaceId: DcPlaceId });
                //alert("DeleteCompleteAndUnSyncedData : " + JSON.stringify(DeletionData));
                if (DeletionData != null) {
                   
                    if (DeletionData.Configuration.CompletedAndUnSynced != -1) {
                        var ConfigCount = DeletionData.Configuration.CompletedAndUnSynced;

                        var Query = "SELECT DISTINCT DataCaptureEntity.Id AS Id FROM DataCaptureEntity INNER JOIN DcResultsEntity  ON DataCaptureEntity.Id=DcResultsEntity.DataCaptureId WHERE DataCaptureEntity.IsCompleted='true' AND DataCaptureEntity.IsSynchronized='false' AND DataCaptureEntity.IsForHistory != 'true' AND (-1=" + DeletionData.UserId + " OR  DcResultsEntity.SystemUserId=" + DeletionData.UserId + ") AND (-1=" + TemplateNodeId + " OR  DataCaptureEntity.TemplateNodeId=" + TemplateNodeId + ") AND (-1=" + DeletionData.DCPlaceNodeId + " OR  DataCaptureEntity.DcPlaceId=" + DeletionData.DCPlaceNodeId + ") AND DataCaptureEntity.Id NOT IN (SELECT Id FROM DataCaptureEntity ORDER BY TimeStamp DESC LIMIT '" + ConfigCount + "' OFFSET '0')";
                        var result = window.OneViewSqlite.excecuteSqlReader(Query);
                        DeleteDataCaptures(result);
                    }
                }
                OneViewConsole.Debug("DeleteCompleteAndUnSyncedData End", "DcDeletion.DeleteCompleteAndUnSyncedData");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "DcDeletion.DeleteCompleteAndUnSyncedData", Excep);
            }
            finally {
                //GetDataFromMetaData = null;
                DeletionData = null;
                ConfigCount = null;
                Query = null;
                result = null;
                oDcDAO = null;
            }
        }

        this.DeleteInCompleteAndSyncedData = function (ServiceId, TemplateNodeId, LoginUserId, DcPlaceId) {
            try {
                OneViewConsole.Debug("DeleteCompleteAndSyncedData Start", "DcDeletion.DeleteCompleteAndSyncedData");

                var _oDcDeletionBO = new DcDeletionBO();
                var DeletionData = _oDcDeletionBO.SetMetadata({ ServiceId: ServiceId, DcUserId: LoginUserId, TemplateNodeId: TemplateNodeId, DcPlaceId: DcPlaceId });
                //alert("DeleteInCompleteAndSyncedData : " + JSON.stringify(DeletionData));
                if (DeletionData != null) {
                  
                    if (DeletionData.Configuration.InCompletedAndSynced != -1) {
                        var ConfigCount = DeletionData.Configuration.InCompletedAndSynced;

                        var Query = "SELECT DISTINCT DataCaptureEntity.Id AS Id,DataCaptureEntity.ClientGuid AS ClientGuid FROM DataCaptureEntity INNER JOIN DcResultsEntity  ON DataCaptureEntity.Id=DcResultsEntity.DataCaptureId WHERE DataCaptureEntity.IsCompleted='false' AND DataCaptureEntity.IsSynchronized='true' AND DataCaptureEntity.IsForAction != 'true' AND (-1=" + DeletionData.UserId + " OR  DcResultsEntity.SystemUserId=" + DeletionData.UserId + ") AND (-1=" + TemplateNodeId + " OR  DataCaptureEntity.TemplateNodeId=" + TemplateNodeId + ") AND (-1=" + DeletionData.DCPlaceNodeId + " OR  DataCaptureEntity.DcPlaceId=" + DeletionData.DCPlaceNodeId + ") AND DataCaptureEntity.Id NOT IN (SELECT Id FROM DataCaptureEntity ORDER BY TimeStamp DESC LIMIT '" + ConfigCount + "' OFFSET '0')";
                        var result = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);
                        DeleteDataCaptures(result);
                    }
                }
                OneViewConsole.Debug("DeleteCompleteAndSyncedData End", "DcDeletion.DeleteCompleteAndSyncedData");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "DcDeletion.DeleteCompleteAndSyncedData", Excep);
            }
            finally {
                //GetDataFromMetaData = null;
                DeletionData = null;
                ConfigCount = null;
                Query = null;
                result = null;
                oDcDAO = null;
                oActionDAO = null;
                _oOneViewSqlitePlugin = null;
            }
        }

        this.DeleteInCompleteAndSyncedDataInDays = function (ServiceId, TemplateNodeId, LoginUserId, DcPlaceId) {
            try {
                OneViewConsole.Debug("DeleteInCompleteAndSyncedDataInDays Start", "DcDeletion.DeleteInCompleteAndSyncedDataInDays");

                var _oDcDeletionBO = new DcDeletionBO();
                var DeletionData = _oDcDeletionBO.SetMetadata({ ServiceId: ServiceId, DcUserId: LoginUserId, TemplateNodeId: TemplateNodeId, DcPlaceId: DcPlaceId });
                //alert("DeleteInCompleteAndSyncedDataInDays : " + JSON.stringify(DeletionData));
                if (DeletionData != null) {
                  
                    if (DeletionData.Configuration.InCompletedAndSyncedInDays != -1) {
                        var ConfigCount = DeletionData.Configuration.InCompletedAndSyncedInDays;

                        if (ConfigCount > 0) {

                            var oDateTime = new DateTime();
                            var CurrenntDateAndTime = oDateTime.GetDateAndTime();

                            var SplitedDate = CurrenntDateAndTime.split("-");
                            var SelectedDateF = SplitedDate[1] + "/" + SplitedDate[0] + "/" + SplitedDate[2];

                            var CurrentDate = new Date(SelectedDateF);
                            CurrentDate.setDate(CurrentDate.getDate() - ConfigCount);

                            var DD = CurrentDate.getDate();
                            var MM = ('0' + (CurrentDate.getMonth() + 1)).slice(-2);
                            var YYYY = CurrentDate.getFullYear();
                            if (DD < 10) { DD = '0' + DD };

                            var Lastday = YYYY + MM + DD;
                            var Query = "SELECT DISTINCT DataCaptureEntity.Id AS Id,DataCaptureEntity.ClientGuid AS ClientGuid,substr(DataCaptureEntity.CreatedDate,7,4)||substr(DataCaptureEntity.CreatedDate,4,2)||substr(DataCaptureEntity.CreatedDate,1,2) DCCreatedDate FROM DataCaptureEntity INNER JOIN DcResultsEntity  ON DataCaptureEntity.Id=DcResultsEntity.DataCaptureId WHERE DataCaptureEntity.IsCompleted='false' AND DataCaptureEntity.IsSynchronized='true' AND (-1=" + DeletionData.UserId + " OR  DcResultsEntity.SystemUserId=" + DeletionData.UserId + ") AND (-1=" + TemplateNodeId + " OR  DataCaptureEntity.TemplateNodeId=" + TemplateNodeId + ") AND (-1=" + DeletionData.DCPlaceNodeId + " OR  DataCaptureEntity.DcPlaceId=" + DeletionData.DCPlaceNodeId + ") AND DCCreatedDate <= '" + Lastday + "'";
                            var result = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);
                            DeleteDataCaptures(result);
                        }
                    }
                }
                OneViewConsole.Debug("DeleteInCompleteAndSyncedDataInDays End", "DcDeletion.DeleteInCompleteAndSyncedDataInDays");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "DcDeletion.DeleteInCompleteAndSyncedDataInDays", Excep);
            }
            finally {
               // GetDataFromMetaData = null;
                DeletionData = null;
                ConfigCount = null;
                Query = null;
                result = null;
                oDcDAO = null;
            }
        }

        this.DeleteInCompleteAndSyncedDataFromNow = function (ServiceId, TemplateNodeId, LoginUserId, DcPlaceId) {
            try {
                OneViewConsole.Debug("DeleteInCompleteAndSyncedDataFromNow Start", "DcDeletion.DeleteInCompleteAndSyncedDataFromNow");

                var _oDcDeletionBO = new DcDeletionBO();
                var DeletionData = _oDcDeletionBO.SetMetadata({ ServiceId: ServiceId, DcUserId: LoginUserId, TemplateNodeId: TemplateNodeId, DcPlaceId: DcPlaceId });
                //alert("DeleteInCompleteAndSyncedDataFromNow : " + JSON.stringify(DeletionData));
                if (DeletionData != null) {
                 
                    var DeleteInCompleteAndSyncedDataFromNow = DeletionData.Configuration.DeleteInCompleteAndSyncedDataFromNow;

                    if (DeleteInCompleteAndSyncedDataFromNow == true) {

                        var oDateTime = new DateTime();
                        var CurrenntDateAndTime = oDateTime.GetDateAndTime();

                        var SplitedDateAndTime = CurrenntDateAndTime.split(" ");
                        var SplitedDate = SplitedDateAndTime[0].split("-");
                        var SplitedTime = SplitedDateAndTime[1].split(":");

                        var CurrentTime = "" + SplitedDate[2] + SplitedDate[1] + SplitedDate[0] + SplitedTime[0] + SplitedTime[1] + SplitedTime[2];
                        var Query = "SELECT DISTINCT DataCaptureEntity.Id AS Id,DataCaptureEntity.ClientGuid AS ClientGuid,substr(DataCaptureEntity.DcStartDate,7,4)||substr(DataCaptureEntity.DcStartDate,4,2)||substr(DataCaptureEntity.DcStartDate,1,2)|| substr(DataCaptureEntity.DcStartDate, 12, 2) || substr(DataCaptureEntity.DcStartDate, 15, 2) || substr(DataCaptureEntity.DcStartDate, 18, 2) AbcStartDate FROM DataCaptureEntity INNER JOIN DcResultsEntity  ON DataCaptureEntity.Id=DcResultsEntity.DataCaptureId WHERE DataCaptureEntity.IsCompleted='false' AND DataCaptureEntity.IsSynchronized='true' AND (-1=" + DeletionData.UserId + " OR  DcResultsEntity.SystemUserId=" + DeletionData.UserId + ") AND (-1=" + TemplateNodeId + " OR  DataCaptureEntity.TemplateNodeId=" + TemplateNodeId + ") AND (-1=" + DeletionData.DCPlaceNodeId + " OR  DataCaptureEntity.DcPlaceId=" + DeletionData.DCPlaceNodeId + ") AND AbcStartDate < '" + CurrentTime + "'";
                        var result = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);
                        DeleteDataCaptures(result);
                    }
                }
                OneViewConsole.Debug("DeleteInCompleteAndSyncedDataFromNow End", "DcDeletion.DeleteInCompleteAndSyncedDataFromNow");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "DcDeletion.DeleteInCompleteAndSyncedDataFromNow", Excep);
            }
            finally {
                //GetDataFromMetaData = null;
                DeletionData = null;
                ConfigCount = null;
                Query = null;
                result = null;
                oDcDAO = null;
            }
        }

        this.DeleteInActivePurchaseOrder = function (ServiceId, TemplateNodeId, LoginUserId, DcPlaceId) {
            try {
                OneViewConsole.Debug("DeleteInActivePurchaseOrder Start", "DcDeletion.DeleteInActivePurchaseOrder");
           
                var _oDcDeletionBO = new DcDeletionBO();
               // var DeletionData = _oDcDeletionBO.SetMetadata({ ServiceId: ServiceId, DcUserId: LoginUserId, TemplateNodeId: TemplateNodeId, DcPlaceId: DcPlaceId });
         
               // if (DeletionData != null) {

                    //var DeleteInActivePurchaseOrder = DeletionData.Configuration.DeleteInActivePurchaseOrder;

                    //if (DeleteInCompleteAndSyncedDataFromNow == true) {

                        var oDateTime = new DateTime();
                        var CurrenntDateAndTime = oDateTime.GetDateAndTime();

                        var SplitedDateAndTime = CurrenntDateAndTime.split(" ");
                        var SplitedDate = SplitedDateAndTime[0].split("-");
                        var SplitedTime = SplitedDateAndTime[1].split(":");

                        var CurrentTime = "" + SplitedDate[2] + SplitedDate[1] + SplitedDate[0] + SplitedTime[0] + SplitedTime[1] + SplitedTime[2];
                        var Query = "SELECT Id FROM PurchaseOrder WHERE IsPOActive='false'";
                        var result = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);
                        DeletePurchaseOrder(result);
                   // }
                //}
                OneViewConsole.Debug("DeleteInActivePurchaseOrder End", "DcDeletion.DeleteInActivePurchaseOrder");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "DcDeletion.DeleteInActivePurchaseOrder", Excep);
            }
            finally {
                //GetDataFromMetaData = null;
                DeletionData = null;
                ConfigCount = null;
                Query = null;
                result = null;
                oDcDAO = null;
            }
        }

        this.DeleteItemCompletedorInActiveInPurchaseOrder = function (ServiceId, TemplateNodeId, LoginUserId, DcPlaceId) {
            try {
                OneViewConsole.Debug("DeleteInActiveItemInPurchaseOrder Start", "DcDeletion.DeleteInActiveItemInPurchaseOrder");

                var _oDcDeletionBO = new DcDeletionBO();
                // var DeletionData = _oDcDeletionBO.SetMetadata({ ServiceId: ServiceId, DcUserId: LoginUserId, TemplateNodeId: TemplateNodeId, DcPlaceId: DcPlaceId });

                // if (DeletionData != null) {

                //var DeleteInActivePurchaseOrder = DeletionData.Configuration.DeleteInActivePurchaseOrder;

                //if (DeleteInCompleteAndSyncedDataFromNow == true) {

                var oDateTime = new DateTime();
                var CurrenntDateAndTime = oDateTime.GetDateAndTime();

                var SplitedDateAndTime = CurrenntDateAndTime.split(" ");
                var SplitedDate = SplitedDateAndTime[0].split("-");
                var SplitedTime = SplitedDateAndTime[1].split(":");

                var CurrentTime = "" + SplitedDate[2] + SplitedDate[1] + SplitedDate[0] + SplitedTime[0] + SplitedTime[1] + SplitedTime[2];
                var Query = "SELECT Id FROM PurchaseOrder WHERE IsItemCompletedorInActive='true'";
                var result = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);
                DeletePurchaseOrder(result);
                // }
                //}
                OneViewConsole.Debug("DeleteInActiveItemInPurchaseOrder End", "DcDeletion.DeleteInActiveItemInPurchaseOrder");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "DcDeletion.DeleteInActiveItemInPurchaseOrder", Excep);
            }
            finally {
                //GetDataFromMetaData = null;
                DeletionData = null;
                ConfigCount = null;
                Query = null;
                result = null;
                oDcDAO = null;
            }
        }

        this.DeleteCompletedItemInPurchaseOrder = function (ServiceId, TemplateNodeId, LoginUserId, DcPlaceId) {
            try {
                OneViewConsole.Debug("DeleteCompletedItemInPurchaseOrder Start", "DcDeletion.DeleteCompletedItemInPurchaseOrder");

                var _oDcDeletionBO = new DcDeletionBO();
                // var DeletionData = _oDcDeletionBO.SetMetadata({ ServiceId: ServiceId, DcUserId: LoginUserId, TemplateNodeId: TemplateNodeId, DcPlaceId: DcPlaceId });

                // if (DeletionData != null) {

                //var DeleteInActivePurchaseOrder = DeletionData.Configuration.DeleteInActivePurchaseOrder;

                //if (DeleteInCompleteAndSyncedDataFromNow == true) {

                var oDateTime = new DateTime();
                var CurrenntDateAndTime = oDateTime.GetDateAndTime();

                var SplitedDateAndTime = CurrenntDateAndTime.split(" ");
                var SplitedDate = SplitedDateAndTime[0].split("-");
                var SplitedTime = SplitedDateAndTime[1].split(":");

                var CurrentTime = "" + SplitedDate[2] + SplitedDate[1] + SplitedDate[0] + SplitedTime[0] + SplitedTime[1] + SplitedTime[2];
                var Query = "SELECT Id FROM PurchaseOrder WHERE IsItemDCCompleted='true'";
                var result = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);
                DeletePurchaseOrder(result);
                // }
                //}
                OneViewConsole.Debug("DeleteCompletedItemInPurchaseOrder End", "DcDeletion.DeleteCompletedItemInPurchaseOrder");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "DcDeletion.DeleteCompletedItemInPurchaseOrder", Excep);
            }
            finally {
                //GetDataFromMetaData = null;
                DeletionData = null;
                ConfigCount = null;
                Query = null;
                result = null;
                oDcDAO = null;
            }
        }

        this.DeleteJunkData = function (ServiceId, TemplateNodeId, LoginUserId, DcPlaceId) {
            try {
                OneViewConsole.Debug("DeleteJunkData Start", "DcDeletion.DeleteJunkData");

                var _oDcDeletionBO = new DcDeletionBO();
                var DeletionData = _oDcDeletionBO.SetMetadata({ ServiceId: ServiceId, DcUserId: LoginUserId, TemplateNodeId: TemplateNodeId, DcPlaceId: DcPlaceId });
                //alert("DeleteJunkData : " + JSON.stringify(DeletionData));
                if (DeletionData != null) {
                  
                    if (DeletionData.Configuration.MaxDeletionInCountInDays != -1) {
                        var ConfigCount = DeletionData.Configuration.MaxDeletionInCountInDays;
                        var oDateTime = new DateTime();
                        var CurrenntDateAndTime = oDateTime.GetDateAndTime();
                        var SplitedDate = CurrenntDateAndTime.split("-");
                        var SelectedDateF = SplitedDate[1] + "/" + SplitedDate[0] + "/" + SplitedDate[2];
                        var myDate = new Date(SelectedDateF);
                        myDate.setDate(myDate.getDate() - ConfigCount);
                        var dd = myDate.getDate();
                        var mm = ('0' + (myDate.getMonth() + 1)).slice(-2);
                        var y = myDate.getFullYear();
                        if (dd < 10) { dd = '0' + dd }
                        var lastday = dd + "-" + mm + "-" + y;

                        var Query = "SELECT DISTINCT DataCaptureEntity.Id AS Id FROM DataCaptureEntity INNER JOIN DcResultsEntity  ON DataCaptureEntity.Id=DcResultsEntity.DataCaptureId WHERE  (-1=" + DeletionData.UserId + " OR  DcResultsEntity.SystemUserId=" + DeletionData.UserId + ") AND (-1=" + TemplateNodeId + " OR  DataCaptureEntity.TemplateNodeId=" + TemplateNodeId + ") AND (-1=" + DeletionData.DCPlaceNodeId + " OR  DataCaptureEntity.DcPlaceId=" + DeletionData.DCPlaceNodeId + ") AND DataCaptureEntity.Id AND DataCaptureEntity.TimeStamp < '" + lastday + "'";
                        var result = window.OneViewSqlite.excecuteSqlReader(Query);
                        //result = JSON.parse(result);
                        if (result.length > 0) {
                            var oDcDAO = new DcDAO();
                            oDcDAO.DeleteDcResultDetailsByDcId(result);
                        }
                    }
                }
                OneViewConsole.Debug("DeleteJunkData End", "DcDeletion.DeleteJunkData");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "DcDeletion.DeleteJunkData", Excep);
            }
            finally {
                //GetDataFromMetaData = null;
                DeletionData = null;
                ConfigCount = null;
                oDateTime = null;
                CurrenntDateAndTime = null;
                SplitedDate = null;
                SelectedDateF = null;
                myDate = null;
                dd = null;
                mm = null;
                y = null;
                lastday = null;
                Query = null;
                result = null;
                oDcDAO = null;
            }
        }

        var DeleteDataCaptures = function (result) {

            try {
                if (result.length > 0) {

                    var oDcDAO = new DcDAO();
                    var oActionDAO = new ActionDAO();

                    try {                        
                        oActionDAO.DeleteNCDcResultDetailsByDcId(result);
                        oDcDAO.DeleteDcResultDetailsByDcId(result);

                        var Exp = FomatForInConditionByClientGuid(result);
                        var Query2 = "SELECT DISTINCT ActionClientGuid AS ClientGuid FROM DCNCMapping WHERE DataCaptureClientGuid IN " + Exp;
                        var ActionResult = oOneViewSqlitePlugin.ExcecuteSqlReader(Query2);

                        var _oMultiMediaSubElementsDAO = new MultiMediaSubElementsDAO();
                        _oMultiMediaSubElementsDAO.Delete(result);
                        _oMultiMediaSubElementsDAO.Delete(ActionResult);

                        var _oDcApprovalDAO = new DcApprovalDAO();
                        _oDcApprovalDAO.DeleteByDcInfo(result);
                    }
                    catch (e) {                      
                        OneViewConsole.Error("DataCapture deletion failed", "DcDeletion.DeleteDataCaptures");
                    }
                }
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "DcDeletion.DeleteDataCaptures", Excep);
            }
            finally {
                oDcDAO = null;
                oActionDAO = null;
                Exp = null;
                Query2 = null;
                ActionResult = null;
                _oMultiMediaSubElementsDAO = null;
            }
            
        }

        this.GetFilteredDeletionMetaData = function (ServiceId, TemplateNodeId, LoginUserId, DCPlaceNodeId, GetDataFromMetaData) {
            try {
                OneViewConsole.Debug("GetFilteredDeletionMetaData Start", "DcDeletion.GetFilteredDeletionMetaData");
                var DefaultConfig = null;
                var ConfigForAllPlaceAndUser = null;
                var ConfigForAllUser = null;
                var ConfigForAllPlace = null;
                var IsOwnConfig = false;

                for (var i = 0; i < GetDataFromMetaData.length; i++) {

                    if (GetDataFromMetaData[i].UserId == LoginUserId && GetDataFromMetaData[i].DCPlaceNodeId == DCPlaceNodeId) {
                        DefaultConfig = GetDataFromMetaData[i];
                        IsOwnConfig = true;
                        break;
                    }

                    else if (GetDataFromMetaData[i].UserId == LoginUserId && GetDataFromMetaData[i].DCPlaceNodeId == -1) {
                        ConfigForAllPlace = GetDataFromMetaData[i];
                    }

                    else if (GetDataFromMetaData[i].UserId == -1 && GetDataFromMetaData[i].DCPlaceNodeId == DCPlaceNodeId) {
                        ConfigForAllUser = GetDataFromMetaData[i];
                    }

                    else if (GetDataFromMetaData[i].UserId == -1 && GetDataFromMetaData[i].DCPlaceNodeId == -1) {
                        ConfigForAllPlaceAndUser = GetDataFromMetaData[i];
                    }
                }
                if (IsOwnConfig == false) {
                    if (ConfigForAllPlace != null) {
                        DefaultConfig = ConfigForAllPlace;
                    }
                    else if (ConfigForAllUser != null) {
                        DefaultConfig = ConfigForAllUser;
                    }
                    else {
                        DefaultConfig = ConfigForAllPlaceAndUser;
                    }
                }
                OneViewConsole.Debug("GetFilteredDeletionMetaData End", "DcDeletion.GetFilteredDeletionMetaData");
                return DefaultConfig;

            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "DcDeletion.GetFilteredDeletionMetaData", Excep);
            }
            finally {
                DefaultConfig = null;
                ConfigForAllPlaceAndUser = null;
                ConfigForAllUser = null;
                ConfigForAllPlace = null;
                IsOwnConfig = null;
            }
        }

        var FomatForInConditionByClientGuid = function (Result) {
            try {
                OneViewConsole.Debug("FomatForInConditionByMappedEntityClientGuid start", "DcDeletion.FomatForInConditionByMappedEntityClientGuid");
                OneViewConsole.DataLog("Request Result : " + JSON.stringify(Result), "DcDeletion.FomatForInConditionByMappedEntityClientGuid");

                var Incondition = "(";

                for (var i = 0; i < Result.length; i++) {
                    Incondition += "'" + Result[i].ClientGuid + "'";
                    Incondition += (i <= Result.length - 2) ? "," : ")";
                }

                OneViewConsole.DataLog("Requested Incondition : " + Incondition, "DcDeletion.FomatForInConditionByMappedEntityClientGuid");
                OneViewConsole.Debug("FomatForInConditionByMappedEntityClientGuid end", "DcDeletion.FomatForInConditionByMappedEntityClientGuid");

                return Incondition;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "DcDeletion.FomatForInConditionByMappedEntityClientGuid", Excep);
            }
            finally {
                Incondition = null;
            }
        }

        var DeleteDataCaptures = function (result) {

            try {
                if (result.length > 0) {

                    var oDcDAO = new DcDAO();
                    var oActionDAO = new ActionDAO();

                    try {
                        oActionDAO.DeleteNCDcResultDetailsByDcId(result);
                        oDcDAO.DeleteDcResultDetailsByDcId(result);

                        var Exp = FomatForInConditionByClientGuid(result);
                        var Query2 = "SELECT DISTINCT ActionClientGuid AS ClientGuid FROM DCNCMapping WHERE DataCaptureClientGuid IN " + Exp;
                        var ActionResult = oOneViewSqlitePlugin.ExcecuteSqlReader(Query2);

                        var _oMultiMediaSubElementsDAO = new MultiMediaSubElementsDAO();
                        _oMultiMediaSubElementsDAO.Delete(result);
                        _oMultiMediaSubElementsDAO.Delete(ActionResult);

                        var _oDcApprovalDAO = new DcApprovalDAO();
                        _oDcApprovalDAO.DeleteByDcInfo(result);
                    }
                    catch (e) {
                        OneViewConsole.Error("DataCapture deletion failed", "DcDeletion.DeleteDataCaptures");
                    }
                }
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "DcDeletion.DeleteDataCaptures", Excep);
            }
            finally {
                oDcDAO = null;
                oActionDAO = null;
                Exp = null;
                Query2 = null;
                ActionResult = null;
                _oMultiMediaSubElementsDAO = null;
            }

        }

        var DeletePurchaseOrder = function (result) {

            try {
                if (result.length > 0) {

                    var oItemDAO = new ItemDAO();

                    try {

                        oItemDAO.DeletePurchaseOrderById(result);
      
                    }
                    catch (e) {
                        OneViewConsole.Error("DeletePurchaseOrder deletion failed", "DcDeletion.DeletePurchaseOrder");
                    }
                }
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "DcDeletion.DeletePurchaseOrder", Excep);
            }
            finally {
                oDcDAO = null;
                oActionDAO = null;
                Exp = null;
                Query2 = null;
                ActionResult = null;
                _oMultiMediaSubElementsDAO = null;
            }

        }

        this.DeleteExpiredOrderItems = function (ServiceId, TemplateNodeId, LoginUserId, DcPlaceId) {
            try {
                OneViewConsole.Debug("DeleteCompletedSyncAndOnDeviceApprovalFinishedData Start", "DcDeletion.DeleteCompletedSyncAndOnDeviceApprovalFinishedData");
       
                var _oDcDeletionBO = new DcDeletionBO();
                var DeletionData = _oDcDeletionBO.SetMetadata({ ServiceId: ServiceId, DcUserId: LoginUserId, TemplateNodeId: TemplateNodeId, DcPlaceId: DcPlaceId });
                //alert("DeleteCompletedSyncAndOnDeviceApprovalFinishedData : " + JSON.stringify(DeletionData));
                if (DeletionData != null) {

                    var ExpiredOrderItems = DeletionData.Configuration.ExpiredOrderItems;
                    
                    // if (DeletionData.Configuration.CompletedAndSynced != -1) {
                    if (parseInt(ExpiredOrderItems) !== -1) {

                        var oDateTime = new DateTime();
                        var CurrentDateAndTime = oDateTime.GetDateAndTime();

                        var currentDate = oDateTime.GetDateAndTime();
                        currentDate = oDateTime.ConvertDateTimeToInteger(currentDate);

                 

                        var Query = "SELECT DISTINCT OrdrD.ServerId,OrdrD.RCOMasterId, " +
                                    "(SUBSTR(OrdrD.OrderDate, 7, 4) || SUBSTR(OrdrD.OrderDate, 4, 2) || SUBSTR(OrdrD.OrderDate, 1, 2) || SUBSTR(OrdrD.OrderDate, 12, 2) ||  SUBSTR(OrdrD.OrderDate, 15, 2) || SUBSTR(OrdrD.OrderDate, 18, 2) ) AS OrderDate ," +
                                    //Delivered StartDate  //Changed -32 hr to -44 hr as per change request on 11/11/2019 so garbagecollector code changed from -40 to -52 hr
                                     "(SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '-52 Hours')) ,1,4) ||" +
                                     "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '-52 Hours')) ,6,2) ||" +
                                     "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '-52 Hours')) ,9,2) ||" +
                                     "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '-52 Hours')) ,12,2) ||" +
                                     "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '-52 Hours')) ,15,2) ||" +
                                     "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '-52 Hours')) ,18,2) ) as DStartDate," +
                                     //Delivered EndDate
                                      "(SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '4 Hours')) ,1,4) ||" +
                                      "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '4 Hours')) ,6,2) ||" +
                                      "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '4 Hours')) ,9,2) ||" +
                                      "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '4 Hours')) ,12,2) ||" +
                                      "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '4 Hours')) ,15,2) ||" +
                                      "SUBSTR((datetime((SUBSTR('" + CurrentDateAndTime + "', 7, 4) || '-' || SUBSTR('" + CurrentDateAndTime + "', 4, 2) || '-' || SUBSTR('" + CurrentDateAndTime + "', 1, 2) || ' ' || SUBSTR('" + CurrentDateAndTime + "', 12, 2) ||  ':' ||  SUBSTR('" + CurrentDateAndTime + "', 15, 2) ||  ':' || SUBSTR('" + CurrentDateAndTime + "', 18, 2)) , '4 Hours')) ,18,2) ) as DEndDate," +
                                      "OrdrD.DeliveredDate AS DeliveredDate," +
                                     "(SUBSTR(OrdrD.DeliveredDate, 7, 4) || SUBSTR(OrdrD.DeliveredDate, 4, 2) || SUBSTR(OrdrD.DeliveredDate, 1, 2) || SUBSTR(OrdrD.DeliveredDate, 12, 2) ||  SUBSTR(OrdrD.DeliveredDate, 15, 2) || SUBSTR(OrdrD.DeliveredDate, 18, 2) ) AS DeliveredDate1 " +
                                     " FROM  OrderDetails OrdrD " +
                                    // " INNER JOIN ItemProcessMappingEntity IPM ON IPM.DataId = OrdrD.RCOMasterId  " +
                                     " INNER JOIN RcoAndLabelMapping RLM ON RLM.RCOMasterId = OrdrD.RCOMasterId " +
                                     " WHERE (-1=" + DeletionData.DCPlaceNodeId + " OR  OrdrD.ReceiverBUId=" + DeletionData.DCPlaceNodeId + ") "+
                                    //AND (-1=" + TemplateNodeId + " OR  IPM.ProcessId=" + TemplateNodeId + ")" +                                 
                                    " AND (   DeliveredDate1 <= DStartDate  )  " +
                                    //" AND (   DeliveredDate1 < DStartDate AND    DEndDate<=DeliveredDate1  )  " +
                                     " ORDER By OrdrD.RCOMasterId";



                        //var Query = "SELECT DISTINCT OrdrD.ServerId,OrdrD.RCOMasterId, " +
                        //            "(SUBSTR(OrdrD.OrderDate, 7, 4) || SUBSTR(OrdrD.OrderDate, 4, 2) || SUBSTR(OrdrD.OrderDate, 1, 2) || SUBSTR(OrdrD.OrderDate, 12, 2) ||  SUBSTR(OrdrD.OrderDate, 15, 2) || SUBSTR(OrdrD.OrderDate, 18, 2) ) AS OrderDate ," +
                        //             //Delivered StartDate
                        //           "(SUBSTR((datetime((SUBSTR(OrdrD.DeliveredDate, 7, 4) || '-' || SUBSTR(OrdrD.DeliveredDate, 4, 2) || '-' || SUBSTR(OrdrD.DeliveredDate, 1, 2) || ' ' || SUBSTR(OrdrD.DeliveredDate, 12, 2) ||  ':' ||  SUBSTR(OrdrD.DeliveredDate, 15, 2) ||  ':' || SUBSTR(OrdrD.DeliveredDate, 18, 2)) , '-40 Hours')) ,1,4) ||" +
                        //           "SUBSTR((datetime((SUBSTR(OrdrD.DeliveredDate, 7, 4) || '-' || SUBSTR(OrdrD.DeliveredDate, 4, 2) || '-' || SUBSTR(OrdrD.DeliveredDate, 1, 2) || ' ' || SUBSTR(OrdrD.DeliveredDate, 12, 2) ||  ':' ||  SUBSTR(OrdrD.DeliveredDate, 15, 2) ||  ':' || SUBSTR(OrdrD.DeliveredDate, 18, 2)) , '-40 Hours')) ,6,2) ||" +
                        //           "SUBSTR((datetime((SUBSTR(OrdrD.DeliveredDate, 7, 4) || '-' || SUBSTR(OrdrD.DeliveredDate, 4, 2) || '-' || SUBSTR(OrdrD.DeliveredDate, 1, 2) || ' ' || SUBSTR(OrdrD.DeliveredDate, 12, 2) ||  ':' ||  SUBSTR(OrdrD.DeliveredDate, 15, 2) ||  ':' || SUBSTR(OrdrD.DeliveredDate, 18, 2)) , '-40 Hours')) ,9,2) ||" +
                        //           "SUBSTR((datetime((SUBSTR(OrdrD.DeliveredDate, 7, 4) || '-' || SUBSTR(OrdrD.DeliveredDate, 4, 2) || '-' || SUBSTR(OrdrD.DeliveredDate, 1, 2) || ' ' || SUBSTR(OrdrD.DeliveredDate, 12, 2) ||  ':' ||  SUBSTR(OrdrD.DeliveredDate, 15, 2) ||  ':' || SUBSTR(OrdrD.DeliveredDate, 18, 2)) , '-40 Hours')) ,12,2) ||" +
                        //           "SUBSTR((datetime((SUBSTR(OrdrD.DeliveredDate, 7, 4) || '-' || SUBSTR(OrdrD.DeliveredDate, 4, 2) || '-' || SUBSTR(OrdrD.DeliveredDate, 1, 2) || ' ' || SUBSTR(OrdrD.DeliveredDate, 12, 2) ||  ':' ||  SUBSTR(OrdrD.DeliveredDate, 15, 2) ||  ':' || SUBSTR(OrdrD.DeliveredDate, 18, 2)) , '-40 Hours')) ,15,2) ||" +
                        //           "SUBSTR((datetime((SUBSTR(OrdrD.DeliveredDate, 7, 4) || '-' || SUBSTR(OrdrD.DeliveredDate, 4, 2) || '-' || SUBSTR(OrdrD.DeliveredDate, 1, 2) || ' ' || SUBSTR(OrdrD.DeliveredDate, 12, 2) ||  ':' ||  SUBSTR(OrdrD.DeliveredDate, 15, 2) ||  ':' || SUBSTR(OrdrD.DeliveredDate, 18, 2)) , '-40 Hours')) ,18,2) ) as DeliveryStartDate," +
                        //           ////Delivered EndDate
                        //           // "(SUBSTR((datetime((SUBSTR(OrdrD.DeliveredDate, 7, 4) || '-' || SUBSTR(OrdrD.DeliveredDate, 4, 2) || '-' || SUBSTR(OrdrD.DeliveredDate, 1, 2) || ' ' || SUBSTR(OrdrD.DeliveredDate, 12, 2) ||  ':' ||  SUBSTR(OrdrD.DeliveredDate, 15, 2) ||  ':' || SUBSTR(OrdrD.DeliveredDate, 18, 2)) , '4 Hours')) ,1,4) ||" +
                        //           // "SUBSTR((datetime((SUBSTR(OrdrD.DeliveredDate, 7, 4) || '-' || SUBSTR(OrdrD.DeliveredDate, 4, 2) || '-' || SUBSTR(OrdrD.DeliveredDate, 1, 2) || ' ' || SUBSTR(OrdrD.DeliveredDate, 12, 2) ||  ':' ||  SUBSTR(OrdrD.DeliveredDate, 15, 2) ||  ':' || SUBSTR(OrdrD.DeliveredDate, 18, 2)) , '4 Hours')) ,6,2) ||" +
                        //           // "SUBSTR((datetime((SUBSTR(OrdrD.DeliveredDate, 7, 4) || '-' || SUBSTR(OrdrD.DeliveredDate, 4, 2) || '-' || SUBSTR(OrdrD.DeliveredDate, 1, 2) || ' ' || SUBSTR(OrdrD.DeliveredDate, 12, 2) ||  ':' ||  SUBSTR(OrdrD.DeliveredDate, 15, 2) ||  ':' || SUBSTR(OrdrD.DeliveredDate, 18, 2)) , '4 Hours')) ,9,2) ||" +
                        //           // "SUBSTR((datetime((SUBSTR(OrdrD.DeliveredDate, 7, 4) || '-' || SUBSTR(OrdrD.DeliveredDate, 4, 2) || '-' || SUBSTR(OrdrD.DeliveredDate, 1, 2) || ' ' || SUBSTR(OrdrD.DeliveredDate, 12, 2) ||  ':' ||  SUBSTR(OrdrD.DeliveredDate, 15, 2) ||  ':' || SUBSTR(OrdrD.DeliveredDate, 18, 2)) , '4 Hours')) ,12,2) ||" +
                        //           // "SUBSTR((datetime((SUBSTR(OrdrD.DeliveredDate, 7, 4) || '-' || SUBSTR(OrdrD.DeliveredDate, 4, 2) || '-' || SUBSTR(OrdrD.DeliveredDate, 1, 2) || ' ' || SUBSTR(OrdrD.DeliveredDate, 12, 2) ||  ':' ||  SUBSTR(OrdrD.DeliveredDate, 15, 2) ||  ':' || SUBSTR(OrdrD.DeliveredDate, 18, 2)) , '4 Hours')) ,15,2) ||" +
                        //           // "SUBSTR((datetime((SUBSTR(OrdrD.DeliveredDate, 7, 4) || '-' || SUBSTR(OrdrD.DeliveredDate, 4, 2) || '-' || SUBSTR(OrdrD.DeliveredDate, 1, 2) || ' ' || SUBSTR(OrdrD.DeliveredDate, 12, 2) ||  ':' ||  SUBSTR(OrdrD.DeliveredDate, 15, 2) ||  ':' || SUBSTR(OrdrD.DeliveredDate, 18, 2)) , '4 Hours')) ,18,2) ) as DEndDate," +
                        //            "OrdrD.DeliveredDate,"+
                        //           "(SUBSTR(OrdrD.DeliveredDate, 7, 4) || SUBSTR(OrdrD.DeliveredDate, 4, 2) || SUBSTR(OrdrD.DeliveredDate, 1, 2) || SUBSTR(OrdrD.DeliveredDate, 12, 2) ||  SUBSTR(OrdrD.DeliveredDate, 15, 2) || SUBSTR(OrdrD.DeliveredDate, 18, 2) ) AS DeliveredDate1 " +
                        //           " FROM  OrderDetails OrdrD " +
                        //           " INNER JOIN ItemProcessMappingEntity IPM ON IPM.DataId = OrdrD.RCOMasterId  " +
                        //           " INNER JOIN RcoAndLabelMapping RLM ON RLM.RCOMasterId = OrdrD.RCOMasterId " +
                        //           " WHERE  (-1=" + DeletionData.DCPlaceNodeId + " OR  OrdrD.ReceiverBUId=" + DeletionData.DCPlaceNodeId + ") " +
                        //          " AND  ( DeliveryStartDate <= '" + currentDate + "' ) " +
                        //           " ORDER By OrdrD.RCOMasterId";

                        var result = oOneViewSqlitePlugin.ExcecuteSqlReader(Query);
                        
                        //alert("CurrentDateAndTime : " + CurrentDateAndTime + " =>Result :" + JSON.stringify(result))
                        _oDcDeletionBO.DeleteOrderItems({ Result: result, DCPlaceNodeId: DeletionData.DCPlaceNodeId, TemplateId: TemplateNodeId });
                    }
                }
                OneViewConsole.Debug("DeleteCompletedSyncAndOnDeviceApprovalFinishedData End", "DcDeletion.DeleteCompletedSyncAndOnDeviceApprovalFinishedData");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "DcDeletion.DeleteCompletedSyncAndOnDeviceApprovalFinishedData", Excep);
            }
            finally {
                //GetDataFromMetaData = null;
                DeletionData = null;
                ConfigCount = null;
                Query = null;
                result = null;
                oDcDAO = null;
                oActionDAO = null;
                _oOneViewSqlitePlugin = null;
            }
        }

}


// To do : It should be configurable
function RCODeletion() {

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();
  
    this.DeleteJunkRCO = function () {

        try {
            var FilterQuery = "SELECT DISTINCT substr(DateTimeColumn2,7,4)||substr(DateTimeColumn2,4,2)||substr(DateTimeColumn2,1,2) date FROM RcoMasterEntity ORDER BY date DESC LIMIT -1 OFFSET 3";
            var FilterResult = _OneViewSqlitePlugin.ExcecuteSqlReader(FilterQuery);

            //alert(JSON.stringify(FilterResult));

            if (FilterResult.length > 0) {

                var WorkOrderQuery = "SELECT ServerId FROM RcoMasterEntity WHERE substr(DateTimeColumn2,7,4)||substr(DateTimeColumn2,4,2)||substr(DateTimeColumn2,1,2) IN (SELECT DISTINCT substr(DateTimeColumn2,7,4)||substr(DateTimeColumn2,4,2)||substr(DateTimeColumn2,1,2) date FROM RcoMasterEntity ORDER BY date DESC LIMIT -1 OFFSET 3) AND Type = '" + DATEntityType.RCO_WorkOrder + "'";
                var PurchaseOrderQuery = "SELECT ServerId FROM RcoMasterEntity WHERE substr(DateTimeColumn2,7,4)||substr(DateTimeColumn2,4,2)||substr(DateTimeColumn2,1,2) IN (SELECT DISTINCT substr(DateTimeColumn2,7,4)||substr(DateTimeColumn2,4,2)||substr(DateTimeColumn2,1,2) date FROM RcoMasterEntity ORDER BY date DESC LIMIT -1 OFFSET 3) AND Type = '" + DATEntityType.RCO_PurchaseOrder + "'";

                var WorkOrderResult = _OneViewSqlitePlugin.ExcecuteSqlReader(WorkOrderQuery);
                var PurchaseOrderResult = _OneViewSqlitePlugin.ExcecuteSqlReader(PurchaseOrderQuery);

                var WorkOrderExp = FomatForInConditionById(WorkOrderResult);
                var PurchaseOrderExp = FomatForInConditionById(PurchaseOrderResult);

                //alert("WorkOrderResult : " + WorkOrderResult.length);
                //alert("PurchaseOrderResult : " + PurchaseOrderResult.length);

                if (WorkOrderResult.length > 0) {
                    DeleteOrderWithExpression(WorkOrderExp);
                }
                if (PurchaseOrderResult.length > 0) {
                    DeleteOrderWithExpression(PurchaseOrderExp);
                }
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "RCODeletion.DeleteJunkRCO", Excep);
        }
        finally {
        }
    }

    var DeleteOrderWithExpression = function (Exp) {

        try {          
            var Query1 = "DELETE FROM RcoMasterEntity WHERE ServerId IN " + Exp;
            var Query2 = "DELETE FROM OrganizationAssetsNodeRCOSpecialMapping WHERE RCOMasterId IN " + Exp;

            //alert(Query1);
            //alert(Query2);

            _OneViewSqlitePlugin.ExcecuteSql(Query1);
            _OneViewSqlitePlugin.ExcecuteSql(Query2);
        }
        catch (Excep) {          
            throw oOneViewExceptionHandler.Create("Framework", "RCODeletion.DeleteJunkRCO", Excep);
        }
        finally {
        }
    }

    var FomatForInConditionById = function (Result) {
        try {
            OneViewConsole.Debug("FomatForInConditionById start", "DcDAO.FomatForInConditionById");
            OneViewConsole.DataLog("Request Result : " + JSON.stringify(Result), "DcDAO.FomatForInConditionById");

            var Incondition = "(";

            for (var i = 0; i < Result.length; i++) {
                Incondition += Result[i].ServerId;
                Incondition += (i <= Result.length - 2) ? "," : ")";
            }

            OneViewConsole.DataLog("Requested Incondition : " + Incondition, "DcDAO.FomatForInConditionById");
            OneViewConsole.Debug("FomatForInConditionById end", "DcDAO.FomatForInConditionById");

            return Incondition;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcDAO.FomatForInConditionById", Excep);
        }
        finally {
            Incondition = null;
        }
    }
}


// DcProfileDeletionComponent
function DcProfileDeletionComponent() {

    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    this.DeleteExpiredAndUnUsedProfiles = function () {

        try {
            OneViewConsole.Debug("DeleteExpiredAndUnUsedProfiles start", "DcProfileDeletionComponent.DeleteExpiredAndUnUsedProfiles");

            var oDateTime = new DateTime();
            var CurrenntDateAndTime = oDateTime.GetDateAndTime();

            var SplitedDateAndTime = CurrenntDateAndTime.split(" ");
            var SplitedDate = SplitedDateAndTime[0].split("-");
            var SplitedTime = SplitedDateAndTime[1].split(":");

            var CurrentTime = "" + SplitedDate[2] + SplitedDate[1] + SplitedDate[0] + SplitedTime[0] + SplitedTime[1] + SplitedTime[2];

            var ExpiredProfilesQuery = "SELECT dcp.Id,dcp.ServerId,dcp.TemplateNodeId,dcp.DcPlaceId,substr(ds.EndDate,7,4)||substr(ds.EndDate,4,2)||substr(ds.EndDate,1,2)||substr(ds.EndDate, 12, 2)||substr(ds.EndDate, 15, 2)||substr(ds.EndDate, 18, 2) ProfileEndDate " +
                                       "FROM DcProfileEntity As dcp INNER JOIN DefaultScheduleEntity As ds ON dcp.Id = ds.DcProfileId WHERE ds.EndDate != '' AND ProfileEndDate < '" + CurrentTime + "'";
            
            var ExpiredProfilesResult = _OneViewSqlitePlugin.ExcecuteSqlReader(ExpiredProfilesQuery);
            

            if (ExpiredProfilesResult.length > 0) {

                var UsedDcProfilesQuery = "SELECT DISTINCT DcProfileId,TemplateNodeId,DcPlaceId FROM DataCaptureEntity";
               
                var UsedDcProfilesResult = _OneViewSqlitePlugin.ExcecuteSqlReader(UsedDcProfilesQuery);
                

                for (var i = 0; i < UsedDcProfilesResult.length; i++) {

                    for (var j = 0; j < ExpiredProfilesResult.length; j++) {

                        if (UsedDcProfilesResult[i].DcProfileId == ExpiredProfilesResult[j].ServerId &&
                            UsedDcProfilesResult[i].TemplateNodeId == ExpiredProfilesResult[j].TemplateNodeId &&
                            UsedDcProfilesResult[i].DcPlaceId == ExpiredProfilesResult[j].DcPlaceId) {

                            ExpiredProfilesResult.splice(j, 1);
                            j--;
                        }
                    }
                }
            }

            if (ExpiredProfilesResult.length > 0) {

                var Exp = FomatForInConditionById(ExpiredProfilesResult);
                var DcProfileDeleteQuery = "DELETE FROM DcProfileEntity WHERE Id IN " + Exp;                
                var DcScheduleDeleteQuery = "DELETE FROM DefaultScheduleEntity WHERE DcProfileId IN " + Exp;
               
                _OneViewSqlitePlugin.ExcecuteSql(DcProfileDeleteQuery);
                _OneViewSqlitePlugin.ExcecuteSql(DcScheduleDeleteQuery);
            }

            OneViewConsole.Debug("DeleteExpiredAndUnUsedProfiles end", "DcProfileDeletionComponent.DeleteExpiredAndUnUsedProfiles");
        }
        catch (Excep) {           
            throw oOneViewExceptionHandler.Create("Framework", "DcProfileDeletionComponent.DeleteExpiredAndUnUsedProfiles", Excep);
        }
        finally {
        }
    }

    var FomatForInConditionById = function (Result) {
        try {
            OneViewConsole.Debug("DcProfileDeletion start", "DcProfileDeletion.FomatForInConditionById");
            OneViewConsole.DataLog("Request Result : " + JSON.stringify(Result), "DcProfileDeletion.FomatForInConditionById");

            var Incondition = "(";

            for (var i = 0; i < Result.length; i++) {
                Incondition += Result[i].Id;
                Incondition += (i <= Result.length - 2) ? "," : ")";
            }

            OneViewConsole.DataLog("Requested Incondition : " + Incondition, "DcProfileDeletion.FomatForInConditionById");
            OneViewConsole.Debug("FomatForInConditionById end", "DcProfileDeletion.FomatForInConditionById");

            return Incondition;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DcProfileDeletion.FomatForInConditionById", Excep);
        }
        finally {
            Incondition = null;
        }
    }
}

function DcDeletionBO() {

    var MyInstance = this;

    this.SetMetadata = function (Req) {
        try {
            OneViewConsole.Debug("SetMetadata start", "DcDeletionBO.SetMetadata");

            var _oGarbageCollectorMetadataDAO = new GarbageCollectorMetadataDAO();
            var GarbageCollectorMetadata = _oGarbageCollectorMetadataDAO.GetGarbageCollectorMetadata(Req);
            var DcDeletionConfiguration = {};


            if (GarbageCollectorMetadata != null) {

                var GarbageCollectorConfig = {};
                var GarbageCollectorList = [];

                var TemplateNodeId = GarbageCollectorMetadata.TemplateNodeId;
                if (TemplateNodeId == -1) {
                    TemplateNodeId = 0;
                }

                //GarbageCollectorList.push({
                //    UserId: GarbageCollectorMetadata.DcUserId,
                //    DCPlaceNodeId: GarbageCollectorMetadata.DcPlaceId,
                //    Configuration: GarbageCollectorMetadata.Configuration
                //})

                //GarbageCollectorConfig[TemplateNodeId] = GarbageCollectorList;
                //DcDeletionConfiguration[GarbageCollectorMetadata.ServiceId] = GarbageCollectorConfig;
                DcDeletionConfiguration = {
                    UserId: GarbageCollectorMetadata.DcUserId,
                    DCPlaceNodeId: GarbageCollectorMetadata.DcPlaceId,
                    Configuration: GarbageCollectorMetadata.Configuration
                };
                //alert("DcDeletionConfiguration : " + DcDeletionConfiguration);
            }
            else {
                DcDeletionConfiguration = null;
            }

            OneViewConsole.Debug("SetMetadata end", "DcDeletionBO.SetMetadata");

            return DcDeletionConfiguration;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcDeletionBO.SetMetadata", Excep);
        }
        finally {
        }
    }

    this.DeleteOrderItems = function (Req) {
        try {
            OneViewConsole.Debug("DeleteOrderItems start", "DcDeletionBO.DeleteOrderItems");
            if (Req.Result.length > 0) {

                var oItemDAO = new ItemDAO();

                try {
                    oItemDAO.DeleteItemOrders(Req);
                }
                catch (e) {
                    OneViewConsole.Error("DeleteOrderItems deletion failed", "DcDeletion.DeleteOrderItems");
                }
            }


            OneViewConsole.Debug("DeleteOrderItems end", "DcDeletionBO.DeleteOrderItems");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcDeletionBO.DeleteOrderItems", Excep);
        }
        finally {
        }
    }

}


