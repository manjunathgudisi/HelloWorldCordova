
// BandConverterBO
function BandConverterBO() {

    // Current Scope
    var MyInstance = this;

    this.CreateDict = function (BandDetails, BandId) {
        try {
            OneViewConsole.Debug("CreateDict Start", "BandConverterBO.CreateDict");

            var BandDetailDict = {};
            for (var i = 0; i < BandDetails.length ; i++) {
                var BandDetailData = BandDetails[i];
                if (BandDetailDict[BandDetailData.ServerId] == undefined) {
                    BandDetailDict[BandDetailData.ServerId] = { 'Id': BandDetailData.ServerId, 'Name': BandDetailData.Name, 'Value': BandDetailData.Value, 'Sequence': BandDetailData.Sequence, 'ColourIndex': BandDetailData.ColourCode,'IsCorrectSelection': BandDetailData.IsCorrectSelection  };
                }
            }

            if (Object.keys(BandDetailDict).length > 0) {
                Band[BandId] = BandDetailDict;
            }
          
            OneViewConsole.Debug("CreateDict End", "BandConverterBO.CreateDict");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "BandConverterBO.CreateDict", Excep);
        }
    }

    this.CreateBandDetails = function (BandId) {
        try {
            OneViewConsole.Debug("CreateBandDetails Start", "BandConverterBO.CreateBandDetails");

            //Get BandDetails
            var _oBandDetailsMasterDAO = new BandDetailsMasterDAO();
            var BandDetails = _oBandDetailsMasterDAO.GetBandDetailsByBandId(BandId);

            if (BandDetails != null) {
                MyInstance.CreateDict(BandDetails, BandId);
            }
            else {
                alert("No BandDetails exist for the band = " + BandId);
            }
            OneViewConsole.Debug("CreateBandDetails End", "BandConverterBO.CreateBandDetails");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "BandConverterBO.CreateBandDetails", Excep);
        }
    }
}

