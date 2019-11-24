
function ThermoQuadChlorineTestNC() {

    this.Execute = function () {
        try {
            OneViewConsole.Debug("Execute Start", "ThermoQuadChlorineTestNC.Execute");

            var response = "";
            if (scope.chkThermoLabel.GetSelectedValue() == 67) {
                //Thermo is white - NC
                response = "Thermo label is observed as white";
                response = UpdateMachineNumber(response);
            }
        
            response=   CheckQuadAndChlorineTest(response);


            OneViewConsole.Debug("Execute End", "ThermoQuadChlorineTestNC.Execute");
            return response;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ThermoQuadChlorineTestNC.Execute", Excep);
        }
        finally {
        }
    }

    this.ExecuteOLD = function () {
        try {
            OneViewConsole.Debug("Execute Start", "ThermoQuadChlorineTestNC.Execute");

            var response = "";
            if (scope.chkThermoLabel.GetSelectedValue() == 67) {
                //Thermo is white - NC
                response = "Thermo label is observed as white for selected machine.";
            }

            response = CheckQuadAndChlorineTest(response);


            OneViewConsole.Debug("Execute End", "ThermoQuadChlorineTestNC.Execute");
            return response;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ThermoQuadChlorineTestNC.Execute", Excep);
        }
        finally {
        }
    }

    var CheckQuadAndChlorineTestOLD = function (response) {
        try {
            OneViewConsole.Debug("CheckQuadAndChlorineTest Start", "ThermoQuadChlorineTestNC.CheckQuadAndChlorineTest");

            if (((((scope.NewDCModel.txtQuadTestControlId) != undefined) && ((scope.NewDCModel.txtQuadTestControlId) != '')) &&
                    (((scope.NewDCModel.txtQuadTestControlId) < 200) && (((scope.chkWashType.GetSelectedValue()) == 60) || ((scope.chkWashType.GetSelectedValue()) == 62))))) {
                //QuadTest NC
                var temp1 = (200 - scope.NewDCModel.txtQuadTestControlId).toFixed(1);
                response = (response != "" ? (response + ", Quad Test is deviated by : " + temp1 + "ppm") : (response + " Quad Test is deviated by : " + temp1 + "ppm"));
            }
           
            if (((scope.NewDCModel.txtChlorineTestControlId) != undefined && (scope.NewDCModel.txtChlorineTestControlId) != "")) {
                if ((scope.NewDCModel.txtChlorineTestControlId) < 50) {
                    //Chlorine test NC
                    var temp2 = 50 - (scope.NewDCModel.txtChlorineTestControlId);
                    response = (response != "" ? (response + ", Chlorine Test is deviated by : " + temp2 + "ppm") : (response + " Chlorine Test is deviated by : " + temp2 + "ppm"));
                 
                }

                else {
                    if ((scope.NewDCModel.txtChlorineTestControlId) > 100) {
                        //Chlorine test NC
                        var temp3 = (scope.NewDCModel.txtChlorineTestControlId) - 100;
                        response = (response != "" ? (response + ", Chlorine Test is deviated by : " + temp3 + "ppm") : (response + " Chlorine Test is deviated by : " + temp3 + "ppm"));
                    }
                 
                }
            }

            OneViewConsole.Debug("CheckQuadAndChlorineTest End", "ThermoQuadChlorineTestNC.CheckQuadAndChlorineTest");


            return response;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ThermoQuadChlorineTestNC.CheckQuadAndChlorineTest", Excep);
        }
        finally {
        }
    }

    var CheckQuadAndChlorineTest = function (response) {
        try {
            OneViewConsole.Debug("CheckQuadAndChlorineTest Start", "ThermoQuadChlorineTestNC.CheckQuadAndChlorineTest");

            if (((((scope.NewDCModel.txtQuadTestControlId) != undefined) && ((scope.NewDCModel.txtQuadTestControlId) != '')) &&
                    (((scope.NewDCModel.txtQuadTestControlId) < 200) && (((scope.chkWashType.GetSelectedValue()) == 60) || ((scope.chkWashType.GetSelectedValue()) == 62))))) {
                //QuadTest NC
                var temp1 = (200 - scope.NewDCModel.txtQuadTestControlId).toFixed(1);
                response = (response != "" ? (response + ", Quad Test is deviated by : " + temp1 + "ppm") : (response + " Quad Test is deviated by : " + temp1 + "ppm"));
            }

            if (((scope.NewDCModel.txtChlorineTestControlId) != undefined && (scope.NewDCModel.txtChlorineTestControlId) != "")) {
                if ((scope.NewDCModel.txtChlorineTestControlId) < 50) {
                    //Chlorine test NC
                    var temp2 = 50 - (scope.NewDCModel.txtChlorineTestControlId);
                    response = (response != "" ? (response + ", Chlorine Test is deviated by : " + temp2 + "ppm") : (response + " Chlorine Test is deviated by : " + temp2 + "ppm"));

                }

                else {
                    if ((scope.NewDCModel.txtChlorineTestControlId) > 100) {
                        //Chlorine test NC
                        var temp3 = (scope.NewDCModel.txtChlorineTestControlId) - 100;
                        response = (response != "" ? (response + ", Chlorine Test is deviated by : " + temp3 + "ppm") : (response + " Chlorine Test is deviated by : " + temp3 + "ppm"));
                    }

                }
            }

            if ((scope.NewDCModel.txtFinalRinseControlId) != undefined && (scope.NewDCModel.txtFinalRinseControlId) != "" && parseFloat(scope.NewDCModel.txtFinalRinseControlId) < 82) {
                var temp3 = (82 - parseFloat(scope.NewDCModel.txtFinalRinseControlId) );
                response = response != "" ? (response + ", Final Rinse is deviated by : " + temp3 + "&deg;C") : (response + " Final Rinse is deviated by : " + temp3 + "&deg;C")
            }

            OneViewConsole.Debug("CheckQuadAndChlorineTest End", "ThermoQuadChlorineTestNC.CheckQuadAndChlorineTest");


            if (scope.chkThermoLabel.GetSelectedValue() != 67) {

                response = UpdateMachineNumber(response);
            }

            return response;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ThermoQuadChlorineTestNC.CheckQuadAndChlorineTest", Excep);
        }
        finally {
        }
    }

    var UpdateMachineNumber = function (response) {
        try {
            OneViewConsole.Debug("UpdateMachineNumber Start", "ThermoQuadChlorineTestNC.UpdateMachineNumber");

            if (response != "") {

                if (scope.chkWashType.GetSelectedValue() == 60) {
                    response += " for " + scope.AddlPotMachineControlId.GetSelectedText() + ".";
                }
                else if (scope.chkWashType.GetSelectedValue() == 61) {
                    response += " for " + scope.AddlTrolleyMachineControlId.GetSelectedText() + ".";
                }
                else if (scope.chkWashType.GetSelectedValue() == 62) {
                    response += " for " + scope.AddlDishwashMachineControlId.GetSelectedText() + ".";
                }
            }

            OneViewConsole.Debug("UpdateMachineNumber End", "ThermoQuadChlorineTestNC.UpdateMachineNumber");

            return response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "ThermoQuadChlorineTestNC.UpdateMachineNumber", Excep);
        }
        finally {
        }
    }
}

