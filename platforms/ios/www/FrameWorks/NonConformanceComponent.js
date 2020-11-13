
function NCComponent(scope, TemplateNodes, toaster, xlatService) {
    try {
        OneViewConsole.Debug("NCComponent Start", "Framework.NCComponent");

        var MyInstance = this;

        var oScope = scope;
        oScope['NCComponent'] = this;
        var oTemplateNodes = TemplateNodes;

        var TemplateId = OneViewSessionStorage.Get("TemplateId");
        var TemplateName = OneViewSessionStorage.Get("TemplateName");
        var ServiceId = OneViewSessionStorage.Get("ServiceId");

        var DcPlaceId = OneViewSessionStorage.Get("DcPlaceId");
        //var DcPlaceDimension = OneViewSessionStorage.Get("DcPlaceDimension");
        var DcPlaceDimension = 'OrganizationAssetsNode';

        var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

        //
        var NCRules;

        this.BindNCSummaryHandler;

        //########### Init code start ###########
        this.Init = function () {
            try {
                OneViewConsole.Debug("Init Start", "NCComponent.Init");

                    if (OneViewSessionStorage.Get('NCMetaData') == null) {
                        var NCRuleMetaData = ReadNCMetaData(GlobalNCRuleMetaData);
                        if (NCRuleMetaData != undefined) {
                            SetNCEquation(NCRuleMetaData);
                            OneViewSessionStorage.Save('NCMetaData', JSON.stringify(NCRuleMetaData));
                            NCRules = NCRuleMetaData;
                        }
                    } else {
                       if (OneViewSessionStorage.Get('NCMetaData') !=undefined)
                            NCRules = JSON.parse(OneViewSessionStorage.Get('NCMetaData'));
                    }

                OneViewConsole.Debug("Init End", "NCComponent.Init");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "NCComponent.Init", Excep);
            }
            finally {
                NCRuleMetaData = null;
            }
        }

        var SetNCEquation = function (NCRuleMetaData) {
            try {
                OneViewConsole.Debug("SetNCEquation Start", "NCComponent.SetNCEquation");
           
                if (NCRuleMetaData != undefined) {
                    var oNCEquationBuilder = new NCEquationBuilder(TemplateNodes);

                    for (var i = 0; i < NCRuleMetaData.length; i++) {
                        var oRuleObj = NCRuleMetaData[i];

                        var NCequation = oNCEquationBuilder.GetExpression(oRuleObj.Rule);
                        oNCEquationBuilder.Main_predicateBody = null;
                        oNCEquationBuilder.Main_Leftexp = null;
                        oRuleObj.FinalJavaScriptEquation = NCequation;
                    }
                }

               OneViewConsole.Debug("SetNCEquation End", "NCComponent.SetNCEquation");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "NCComponent.SetNCEquation", Excep);
            }
            finally {
                oNCEquationBuilder = null;
                oRuleObj = null;
                NCequation = null;
            }
        }

        var ReadNCMetaData = function (GlobalNCRuleMetaData) {
            try {
                OneViewConsole.Debug("ReadNCMetaData Start", "NCComponent.ReadNCMetaData");

                    ///read Mandatory Validation metatdata
                    if (GlobalNCRuleMetaData != null || GlobalNCRuleMetaData != undefined) {
                        var NCMetaDataForService = GlobalNCRuleMetaData[ServiceId];
                        var NCMetaDataLstForTemplate = NCMetaDataForService[TemplateId];

                        if (NCMetaDataLstForTemplate != undefined) {
                            for (var itr1 = 0; itr1 < NCMetaDataLstForTemplate.length ; itr1++) {

                                if ((NCMetaDataLstForTemplate[itr1].UserId == "-1" || NCMetaDataLstForTemplate[itr1].UserId == LoginUserId)
                                    && (NCMetaDataLstForTemplate[itr1].DCPlaceNodeId == "-1" ||
                                    (NCMetaDataLstForTemplate[itr1].DCPlaceNodeId == DcPlaceId && NCMetaDataLstForTemplate[itr1].DCPlaceDimension == DcPlaceDimension))) {

                                    var NCRules = NCMetaDataLstForTemplate[itr1].NCRules;
                                    //var MandatoryMetaDataForSave = MandatoryValidationMetaDataForAll['Save']
                                    return NCRules;
                                }
                            }
                        }
                    }
                    else {
                        alert('GlobalNCRuleMetaData not found');
                    }

              OneViewConsole.Debug("ReadNCMetaData End", "NCComponent.ReadNCMetaData");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "NCComponent.ReadNCMetaData", Excep);
            }
            finally {
                NCMetaDataForService = null;
                NCMetaDataLstForTemplate = null;
                NCRules = null;
            }
        }
        //########### Init code end ###########
        this.ShowNCStatus = function (AttributeId, ControlId) {
            try {
                OneViewConsole.Debug("ShowNCStatus Start", "NCComponent.ShowNCStatus");

                    var RuleObjLst = GetNCRules(AttributeId, ControlId);
                    var DataList = [];
                    if (RuleObjLst != undefined) {
                        for (var i = 0; i < RuleObjLst.length; i++) {

                            var isNC = eval(RuleObjLst[i].FinalJavaScriptEquation);
                            DefaultBindNCSummary(isNC, RuleObjLst[i], AttributeId, ControlId);
                            if (MyInstance.BindNCSummaryHandler != null) {
                                MyInstance.BindNCSummaryHandler(isNC, RuleObjLst[i], AttributeId, ControlId);
                            }
                            DataList.push({ NCRuleId: RuleObjLst[i].RuleId, IsNC: isNC })
                        }
                    }
               OneViewConsole.Debug("ShowNCStatus End", "NCComponent.ShowNCStatus");

                return DataList;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "NCComponent.ShowNCStatus", Excep);
            }
            finally {
                RuleObjLst = null;
                DataList = null;
                isNC = null;
            }
        }

        var GetNCRules = function (AttributeId, ControlId) {
            try {
                OneViewConsole.Debug("GetNCRules Start", "NCComponent.GetNCRules");
                if (NCRules != undefined) {
                    var Rule = [];
                    for (var i = 0; i < NCRules.length; i++) {
                        var RuleObj = NCRules[i].FinalJavaScriptEquation;
                        if (RuleObj.indexOf(ControlId) > -1) {
                            Rule.push(NCRules[i]);
                        }

                    }
                }
                OneViewConsole.Debug("GetNCRules End", "NCComponent.GetNCRules");

                return Rule;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "NCComponent.GetNCRules", Excep);
            }
            finally {
                Rule = null;
                RuleObj = null;
            }
        }

        var DefaultBindNCSummary = function (NcStatus, objRule, AttributeId, ControlId) {
            try {
                OneViewConsole.Debug("DefaultBindNCSummary Start", "NCComponent.DefaultBindNCSummary");

                    var element = document.getElementById("divDeviatedValue");
                    if (NcStatus == true) {
                        //alert(xlatService.xlat('Title_Notification') + ': ' + objRule.CriteriaDisplayLabel);
						navigator.notification.alert((xlatService.xlat('Title_Notification') + ': ' + objRule.CriteriaDisplayLabel), ['OK'], "");
                        //toaster.pop('warning', 'Notification', objRule.CriteriaDisplayLabel);
                        //oScope.toggle = true;
                        //oScope.DisplayDeviatedValue = 'Bad';
                        //oScope.CriteriaDisplayLabel = objRule.CriteriaDisplayLabel;
                        //element.setAttribute("class", "col red");

                    }
                    //else {
                    //    toaster.pop('note', objRule.CriteriaDisplayLabel, "Good");
                    //    //oScope.toggle = true;
                    //    //oScope.DisplayDeviatedValue = 'Good';
                    //    //oScope.CriteriaDisplayLabel = objRule.CriteriaDisplayLabel;
                    //    //element.setAttribute("class", "col green"); //For Most Browsers
                    //}

                OneViewConsole.Debug("DefaultBindNCSummary End", "NCComponent.DefaultBindNCSummary");

            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "NCComponent.DefaultBindNCSummary", Excep);
            }
            finally {
                element = null;
            }
        }

        this.ClearNCStatus = function () {
            try {
                OneViewConsole.Debug("ClearNCStatus Start", "NCComponent.ClearNCStatus");

                    oScope.DisplayDeviatedValue = '';
                    oScope.CriteriaDisplayLabel = '';
                    //oScope.$apply();

                OneViewConsole.Debug("ClearNCStatus End", "NCComponent.ClearNCStatus");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("FrameWork", "NCComponent.ClearNCStatus", Excep);
            }
        }

        OneViewConsole.Debug("NCComponent End", "Framework.NCComponent");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Framework", "NCComponent", Excep);
    }
}

        
          


function NCEquationBuilder(TemplateNodes) {
    try {
        OneViewConsole.Debug("NCEquationBuilder Start", "Framework.NCEquationBuilder");

        var MyInstance = this;
        this.Main_predicateBody = null;
        this.Main_Leftexp = null;
        // this.Main_Rightexp = null;
        this.ModelPreFix = 'NewDCModel';

        this.GetExpression = function (criteriaObj) {
            try {
                OneViewConsole.Debug("GetExpression Start", "NCEquationBuilder.GetExpression");

                if (criteriaObj.CriteriaType == 'OneViewDCAdvCriteria') {
                    var i = 0;
                    do {
                        var criteriaObjleft = criteriaObj.FilterParms[i];
                        if (MyInstance.Main_predicateBody == null) {
                            MyInstance.Main_Leftexp = MyInstance.GetExpression(criteriaObjleft);
                            i = i + 1;
                        }
                        else {
                            MyInstance.Main_Leftexp = MyInstance.Main_predicateBody;
                        }

                        var criteriaObjRight = criteriaObj.FilterParms[i];
                        var Main_Rightexp = MyInstance.GetExpression(criteriaObjRight); //Get Complex Query
                        i = i + 1;
                        MyInstance.Main_predicateBody = MyInstance.CombineExpression(MyInstance.Main_Leftexp, Main_Rightexp, criteriaObj.Condition);//Method Combine
                    }
                    while (i < criteriaObj.FilterParms.length);
                }

                else
                    if (criteriaObj.CriteriaType == 'OneViewDCPrimaryCriteria') {

                        MyInstance.Main_predicateBody = MyInstance.GetPrimaryExpression(criteriaObj);
                    }

                OneViewConsole.Debug("GetExpression End", "NCEquationBuilder.GetExpression");

                return MyInstance.Main_predicateBody;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "NCEquationBuilder.GetExpression", Excep);
            }
            finally {
                i = null;
                criteriaObjleft = null;
                criteriaObjRight = null;
                Main_Rightexp = null;
            }
        }

        this.CombineExpression = function (left, right, Condition) {
            try {
                OneViewConsole.Debug("CombineExpression Start", "NCEquationBuilder.CombineExpression");

                var Expression;
                if (Condition == 'AND') {
                    Expression = "( " + left + '&&' + right + ")";
                }
                else
                    if (Condition == 'OR') {
                        Expression = "( " + left + '||' + right + ")";
                    }
                    else
                        if (Condition == 'NotEqual') {
                            Expression = "( " + left + '!=' + right + ")";
                        }
                        else
                            alert('not implemented exception');

               OneViewConsole.Debug("CombineExpression End", "NCEquationBuilder.CombineExpression");

                return Expression;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "NCEquationBuilder.CombineExpression", Excep);
            }
            finally {
                Expression = null;
            }
        }

        var GetAnswerMode = function (AttributeNodeId, ControlId) {
            try {
                OneViewConsole.Debug("GetAnswerMode Start", "NCEquationBuilder.GetAnswerMode");
               
                var AnswerModeObj;

                if (TemplateNodes[AttributeNodeId] != undefined) {
                    var AnswerModelst = TemplateNodes[AttributeNodeId].AnswerMode;
                    for (var i = 0; i < AnswerModelst.length; i++) {
                        if (AnswerModelst[i].ControlId == ControlId) {
                            AnswerModeObj = AnswerModelst[i];
                            break;
                        }
                    }
                }
                OneViewConsole.Debug("GetAnswerMode End", "NCEquationBuilder.GetAnswerMode");

                if (AnswerModeObj == null) {
                    alert('Exception : AttributeId and ControlId not matched with template metadata')

                }
                else
                    return AnswerModeObj;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "NCEquationBuilder.GetAnswerMode", Excep);
            }
            finally {
                AnswerModeObj = null;
                AnswerModelst = null;
            }

        }

        var ModelName = function (ControlId) {
            try {
                OneViewConsole.Debug("ModelName Start", "NCEquationBuilder.ModelName");
                OneViewConsole.Debug("ModelName End", "NCEquationBuilder.ModelName");

                if (MyInstance.ModelPreFix != undefined && MyInstance.ModelPreFix != '')
                    return MyInstance.ModelPreFix + "." + ControlId;
                else
                    return ControlId;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "NCEquationBuilder.ModelName", Excep);
            }
        }

        this.GetPrimaryExpression = function (filterparm) {
            try {
                OneViewConsole.Debug("GetPrimaryExpression Start", "NCEquationBuilder.GetPrimaryExpression");

                var _ModelName = ModelName(filterparm.ControlId);
                var Expression = '';

                if (filterparm.Condition == "Equal") {

                    var AnswerMode = GetAnswerMode(filterparm.TemplateNodeId, filterparm.ControlId);
                    if (AnswerMode.Type == 'DDL')
                        //$scope[_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].ControlId].GetSelectedValue()
                        Expression = Expression + " ( oScope." + filterparm.ControlId + ".GetSelectedValue()  == '" + filterparm.value + "')";
                    else
                        Expression = Expression + " ( oScope." + _ModelName + "  == '" + filterparm.value + "')";

                }
                else if (filterparm.Condition == "NotEqual") {

                    var AnswerMode = GetAnswerMode(filterparm.TemplateNodeId, filterparm.ControlId);

                    if (AnswerMode.Type == 'DDL')
                        //$scope[_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].ControlId].GetSelectedValue()

                        Expression = Expression + " ( oScope." + filterparm.ControlId + ".GetSelectedValue()  != '" + filterparm.value + "')";


                    else
                        Expression = Expression + " ( oScope." + _ModelName + "  != '" + filterparm.value + "')";
                }
                else if (filterparm.Condition == "LessThan") {

                    var AnswerMode = GetAnswerMode(filterparm.TemplateNodeId, filterparm.ControlId);
                    if (AnswerMode.Type == 'DDL')
                        //$scope[_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].ControlId].GetSelectedValue()
                        Expression = Expression + " ( oScope." + filterparm.ControlId + ".GetSelectedValue()  != '" + filterparm.value + "')";
                    else
                        Expression = Expression + " ( oScope." + _ModelName + "  < " + filterparm.value + ")";
                }
                else if (filterparm.Condition == "LessThanOrEqual") {

                    var AnswerMode = GetAnswerMode(filterparm.TemplateNodeId, filterparm.ControlId);
                    if (AnswerMode.Type == 'DDL')
                        //$scope[_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].ControlId].GetSelectedValue()
                        Expression = Expression + " ( oScope." + filterparm.ControlId + ".GetSelectedValue()  != '" + filterparm.value + "')";
                    else
                        Expression = Expression + " ( oScope." + _ModelName + "  <= " + filterparm.value + ")";
                }

                else if (filterparm.Condition == "GreaterThan") {

                    var AnswerMode = GetAnswerMode(filterparm.TemplateNodeId, filterparm.ControlId);
                    if (AnswerMode.Type == 'DDL')
                        //$scope[_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].ControlId].GetSelectedValue()
                        Expression = Expression + " ( oScope." + filterparm.ControlId + ".GetSelectedValue()  != '" + filterparm.value + "')";
                    else
                        Expression = Expression + " ( oScope." + _ModelName + "  > " + filterparm.value + ")";
                }

                OneViewConsole.Debug("GetPrimaryExpression End", "NCEquationBuilder.GetPrimaryExpression");

                return Expression;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "NCEquationBuilder.GetPrimaryExpression", Excep);
            }
            finally {
                _ModelName = null;
                Expression = null;
                AnswerMode = null;
            }
        }

        OneViewConsole.Debug("NCEquationBuilder End", "Framework.NCEquationBuilder");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Framework", "NCEquationBuilder", Excep);
    }
}
                       
