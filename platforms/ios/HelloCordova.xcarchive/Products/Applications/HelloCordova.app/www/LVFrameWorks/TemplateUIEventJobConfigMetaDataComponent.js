

function TemplateUIEventJobConfigMetaDataComponent() {

    //////////////////////////////**************************Get Metadata : START ***********************/////////////////////////////// 
    /// <summary>
    ///Get MetaData for Action and NC
    /// </summary>
    this.Load = function (ServiceId, TemplateNodeId, DcPlaceId, DcPlaceDimension, DcUserId) {
        try {
            // alert('LoadMetaData');

            //alert(ServiceId + "," + DcUserId + "," + TemplateNodeId + "," + DcPlaceId + "," + DcPlaceDimension);
            var MetaData = GetTemplateUIEventJobConfigMetaData(ServiceId, DcUserId, TemplateNodeId, DcPlaceId, DcPlaceDimension);


            if (MetaData != null) {
                GlobalTemplateUIEventJobConfigMetaData = MetaData;
            }

            //alert('GlobalTemplateUIEventJobConfigMetaData here 11:' + JSON.stringify(GlobalTemplateUIEventJobConfigMetaData));


        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "TemplateUIEventJobConfigMetaDataComponent.Load", Excep);
        }
    }

    

    var GetTemplateUIEventJobConfigMetaData = function (ServiceId, DcUserId, TemplateNodeId,DcPlaceId, DcPlaceDimension) {
        try {
            var _oTemplateUIEventJobConfigMetaDataDAO = new TemplateUIEventJobConfigMetaDataDAO();
            var MetaData = _oTemplateUIEventJobConfigMetaDataDAO.GetMetaData(ServiceId, DcUserId, TemplateNodeId, DcPlaceId, DcPlaceDimension);

            if (MetaData == null) {
                //User specific
                // DcPlaceId = -1;
                //  DcPlaceDimension = -1
                MetaData = _oTemplateUIEventJobConfigMetaDataDAO.GetMetaData(ServiceId, DcUserId, TemplateNodeId, -1, -1);
            }

            if (MetaData == null) {
                //Place specific
                // DcUserId = -1;
                MetaData = _oTemplateUIEventJobConfigMetaDataDAO.GetMetaData(ServiceId, -1, TemplateNodeId, DcPlaceId, DcPlaceDimension);
            }

            if (MetaData == null) {
                //none
                DcPlaceId = -1;
                DcUserId = -1;
                //DcPlaceDimension = -1
                MetaData = _oTemplateUIEventJobConfigMetaDataDAO.GetMetaData(ServiceId, DcUserId, TemplateNodeId, DcPlaceId, DcPlaceDimension);
            }

            return MetaData;
        }
        catch (Excep) {
           // alert('GetTemplateUIEventJobConfigMetaData' + Excep);
           // alert('GetTemplateUIEventJobConfigMetaData 444' +  JSON.stringify(Excep));
            throw Excep;
        }
    }

 

}