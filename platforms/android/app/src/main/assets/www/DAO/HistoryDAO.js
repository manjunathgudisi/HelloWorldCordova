
function DcResultDetailsHistoryDAO() {

    // API for create data capture
    this.Create = function (DcResultDetailsHistoryObj) {
        try {
            OneViewConsole.Debug("Create start", "DcResultDetailsHistoryDAO.Create");
            var _oDcResultDetailsHistoryDAO = new DefaultMasterDAO("DcResultDetailsHistory");
            var DcResultDetailsHistoryCount = _oDcResultDetailsHistoryDAO.Count();

            for (var i = 0; i < DcResultDetailsHistoryObj.length; i++) {

                _oDcResultDetailsHistoryDAO.Create(DcResultDetailsHistoryObj[i], DcResultDetailsHistoryCount);
                DcResultDetailsHistoryCount += 1;
            }
            OneViewConsole.Debug("Create end", "DcResultDetailsHistoryDAO.Create");

            return true;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("DAO", "DcResultDetailsHistoryDAO.Create", Excep);
        }
        finally {
            _DateTime = null;
            CurrenntDateAndTime = null;
            DataCaptureEntityCount = null;
            DcResultsEntityCount = null;
            DcResultDetailsEntityCount = null;
        }
    }
}