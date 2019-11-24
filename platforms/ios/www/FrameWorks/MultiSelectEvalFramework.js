function MultiSelectEvalFamework() {

    /// <summary>
    /// Eval equation
    /// </summary> 
    /// <param name="AttributeId">AttributeId</param>
    /// <param name="ControlId">ControlId</param>   
    /// <param name="ComparisonValue">ComparisonValue (Value for comparison)</param>      
    /// <param name="ComparisonKey">(column name/ property name which will used from entity for comparison) , Ex : (Dropdown :  id,name) , (Band : value, colorindex)</param>
    /// <param name="ControlType">ControlType( Type of Multi select Control : Band , Dropdown , checkbox)</param>
    this.Eval = function (AttributeId, ControlId, Operator, ComparisonValue, ComparisonKey, ControlType, DataType) {
        try {

            var eq = "";
            var NCStatus = false;

           


            if (ControlType == "MULTI") {
                var SelectedValueList = scope[ControlId].GetSelectedValue();
                //alert('SelectedValueList : ' + JSON.stringify(SelectedValueList));
                //alert('GlobalFormattedTemplateMetadata : ' + JSON.stringify(GlobalFormattedTemplateMetadata));

                var BandDetailsData = GlobalFormattedTemplateMetadata[AttributeId].AnswerMode[0].BandInfo;
                //alert('BandDetailsData : ' + JSON.stringify(BandDetailsData));

                for (var j = 0; j < SelectedValueList.length ; j++) {
                    var SelectedValueBandDetails = BandDetailsData[SelectedValueList[j].Answer];
                    if (SelectedValueBandDetails[ComparisonKey] != undefined) {

                        if (DataType == "String") {
                            eq = "( '" + ComparisonValue + "' " + Operator + " '" + SelectedValueBandDetails[ComparisonKey] + "' )";
                        }
                        else {
                            eq = (ComparisonValue + Operator + SelectedValueBandDetails[ComparisonKey]);
                        }
                        //alert('eq : ' + eq);
                        NCStatus = eval(eq);
                        //alert('NCStatus : ' + NCStatus);
                        if (NCStatus == true) {
                            break;
                        }
                    }
                    else {
                        alert("Not implemented exception  : ComparisonKey = " + ComparisonKey);
                    }
                }

            }
            else {
                alert("Not implemented exception : ControlType = " + ControlType);
            }


            return NCStatus;
        }

        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "MultiSelectEvalFamework.Eval", Excep);
        }
    }
}