
// ListView DefaultHelpDocument Component
function LVDefaultHelpDocumentComponent() {

    /// <summary>
    /// Help document exist or not
    /// </summary>
    /// <param name="AttributeId">Attribute Node Id</param>   
    /// <returns>true or false</returns>  
    this.IsExist = function (AttributeId) {

        try {
            OneViewConsole.Debug("IsExist start", "LVDefaultHelpDocumentComponent.IsExist");

            var IsExist = false;
           
            if (LVHelpDocumentConfigMetaData != null && LVHelpDocumentConfigMetaData[AttributeId] != undefined) {
                IsExist = true;
            }
           
            OneViewConsole.Debug("IsExist start", "LVDefaultHelpDocumentComponent.IsExist");

            return IsExist;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LVDefaultHelpDocumentComponent.IsExist", Excep);
        }
    }

    /// <summary>
    /// Get help document
    /// </summary>
    /// <param name="AttributeId">Attribute Node Id</param>   
    /// <returns>details about attribute</returns>  
    this.Get = function (AttributeId) {

        try {
            OneViewConsole.Debug("Get start", "LVDefaultHelpDocumentComponent.Get");

            var AttributeHelpDocDetails = null;

            if (LVHelpDocumentConfigMetaData != null) {

                AttributeHelpDocDetails = LVHelpDocumentConfigMetaData[AttributeId];

                if (AttributeHelpDocDetails != undefined) {

                    if (AttributeHelpDocDetails.Online == 'true' || AttributeHelpDocDetails.Online == true) {
                        alert("LVDefaultHelpDocumentComponent Online : Not Implemented");
                    }
                    else {
                        if (AttributeHelpDocDetails.MutiMedia == null || AttributeHelpDocDetails.MutiMedia == 'null') {
                            if(OneViewGlobalServiceTypeEnum[OneViewGlobalServiceType] == 36){
                                return AttributeHelpDocDetails;
                            }
                            else{
                                return AttributeHelpDocDetails.HelpDocString;
                            }
                           
                        }
                        else if (AttributeHelpDocDetails.MutiMedia == 0 || AttributeHelpDocDetails.MutiMedia == '0') {
                            alert("LVDefaultHelpDocumentComponent MutiMedia Video : Not Implemented");
                        }
                        else if (AttributeHelpDocDetails.MutiMedia == 1 || AttributeHelpDocDetails.MutiMedia == '1') {
                            alert("LVDefaultHelpDocumentComponent MutiMedia Audio : Not Implemented");
                        }
                        else if (AttributeHelpDocDetails.MutiMedia == 2 || AttributeHelpDocDetails.MutiMedia == '2') {
                            alert("LVDefaultHelpDocumentComponent MutiMedia Pic : Not Implemented");
                        }
                        else if (AttributeHelpDocDetails.MutiMedia == 3 || AttributeHelpDocDetails.MutiMedia == '3') {
                            alert("LVDefaultHelpDocumentComponent MutiMedia Doc : Not Implemented");
                        }
                        else if (AttributeHelpDocDetails.MutiMedia == 4 || AttributeHelpDocDetails.MutiMedia == '4') {
                            alert("LVDefaultHelpDocumentComponent MutiMedia PDF : Not Implemented");
                        }
                    }
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }

            OneViewConsole.Debug("Get start", "LVDefaultHelpDocumentComponent.Get");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "LVDefaultHelpDocumentComponent.Get", Excep);
        }
    }
}

//var LVHelpDocumentConfigMetaData = {

//    1008: {
//        Online: false,
//        MutiMedia: null,
//        HelpDocString: 'Info : ALTO-SHAAM Oven maintained clean'
//    },
//    1009: {
//        Online: false,
//        MutiMedia: null,
//        HelpDocString: 'Info : BLANCO Food warmers cleaned as schedule'
//    }
//}