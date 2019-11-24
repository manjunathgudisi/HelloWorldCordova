
/// <summary>
///Looks on NC Metadata and returns the NC(true/false along with form/message)
/// </summary>


var NCActionProfileMetaData;


function CPActionNCComponent($scope, TemplateNodes, toaster, xlatService) {

    OneViewConsole.Debug("NCComponent Start", "Framework.NCComponent");

    var MyInstance = this;

    var oScope = $scope;
    //oScope['CPActionNCComponent'] = this;
    var oTemplateNodes = TemplateNodes;

    var TemplateId = OneViewSessionStorage.Get("TemplateId");
    var TemplateName = OneViewSessionStorage.Get("TemplateName");
    var ServiceId = OneViewSessionStorage.Get("ServiceId");

    var DcPlaceId = OneViewSessionStorage.Get("DcPlaceId");
    //var DcPlaceDimension = OneViewSessionStorage.Get("DcPlaceDimension");
    var DcPlaceDimension = 'OrganizationAssetsNode';

    var LoginUserId = OneViewSessionStorage.Get("LoginUserId");

    //var NCActionProfileMetaData;

    this.BindNCSummaryHandler;

    this.Init = function () {
        try {
            OneViewConsole.Debug("Init Start", "NCComponent.Init");
           
            var oActionNCMetaDataComponent = new ActionNCMetaDataComponent();
            oActionNCMetaDataComponent.Load();
    
           // SetNCEquation();
            

            //alert('Init NCActionProfileMetaData' + JSON.stringify(NCActionProfileMetaData));
            OneViewConsole.Debug("Init End", "NCComponent.Init");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "NCComponent.Init", Excep);
        }
        finally {
        }
    }

    var SetNCEquation = function () {
        try {
            OneViewConsole.Debug("SetNCEquation Start", "NCComponent.SetNCEquation");

            if (NCActionProfileMetaData != undefined) {
                var oNCEquationBuilder = new NCEquationBuilder(TemplateNodes);

               // var AttributeWiseActionNCConfigDict = NCActionProfileMetaData.AttributeWiseActionNCConfig;
               // var MultipleAttributeActionNCConfigDict = NCActionProfileMetaData.MultipleAttributeActionNCConfig;
               // var TemplateWiseActionNCConfigDict = NCActionProfileMetaData.TemplateWiseActionNCConfig;

                if (NCActionProfileMetaData.AttributeWiseActionNCConfig != '')
                    GetActionNCConfig(NCActionProfileMetaData.AttributeWiseActionNCConfig);

                if (NCActionProfileMetaData.MultipleAttributeActionNCConfig != '')
                    GetActionNCConfig(NCActionProfileMetaData.MultipleAttributeActionNCConfig);

                if (NCActionProfileMetaData.TemplateWiseActionNCConfig != '')
                    GetTemplateWiseActionNCConfig(NCActionProfileMetaData.TemplateWiseActionNCConfig);
            }

            return NCActionProfileMetaData;

            OneViewConsole.Debug("SetNCEquation End", "NCComponent.SetNCEquation");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "NCComponent.SetNCEquation", Excep);
        }
        finally {
            oNCEquationBuilder = null;
            AttributeWiseRule = null;
            NCequation = null;
        }
    }

    var GetActionNCConfig = function (ActionNCConfigDict) {
        try {
            var oNCEquationBuilder = new NCEquationBuilder(TemplateNodes);

            for (var itrRule in ActionNCConfigDict) {
                var AttributeWiseRuleList = ActionNCConfigDict[itrRule];
                for (var i = 0; i < AttributeWiseRuleList.length; i++) {
                    var AttributeWiseRule = AttributeWiseRuleList[i];

                    //Need to chnage later START : hard coded for testing, coz controlId coming wrong from server
                    //alert('controlid :'+AttributeWiseRule.ControlId);
                    if (AttributeWiseRule.ControlId == '') {
                      
                        //alert('AttributeWiseRule.Rule.TemplateNodeId :' + AttributeWiseRule.Rule.TemplateNodeId);
                        var AttributeDetails = oTemplateNodes[AttributeWiseRule.Rule.TemplateNodeId];
                        //alert('AttributeDetails' + AttributeDetails +"," + JSON.stringify(AttributeDetails));
                        if (AttributeDetails !=undefined)
                            AttributeWiseRule.Rule.ControlId = AttributeDetails.AnswerMode[0].ControlId;
                        //alert('AttributeWiseRule' + JSON.stringify(AttributeWiseRule));
                        
                    }
                    //Need to chnage later END : hard coded for testing, coz controlId coming wrong from server
                   // alert('AttributeWiseRule' + JSON.stringify(AttributeWiseRule.Rule));
                    var NCequation = oNCEquationBuilder.GetExpression(AttributeWiseRule.Rule);
                    //alert('NCequation' + NCequation);
                    
                    oNCEquationBuilder.Main_predicateBody = null;
                    oNCEquationBuilder.Main_Leftexp = null;
                    AttributeWiseRule.FinalJavaScriptEquation = NCequation;
                }
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "CPActionNCComponent.GetActionNCConfig", Excep);
        }
        finally {
            oNCEquationBuilder = null;
            AttributeWiseRuleList = null;
            NCequation = null;
            AttributeWiseRule = null;
        }
    }

    var GetTemplateWiseActionNCConfig = function (TemplateWiseActionNCConfig) {
        alert('GetTemplateWiseActionNCConfig : Not implemented ');
    }


  

    this.ShowNCStatus = function (AttributeId, ControlId) {
        try {
            OneViewConsole.Debug("ShowNCStatus Start", "CPActionNCComponent.ShowNCStatus");
            var Rules = [];

            Rules = GetNCRules(AttributeId, ControlId);

            var NCResponseList = [];
            if (Rules != undefined) {

                for (var i = 0; i < Rules.length; i++) {
                    var DataObj = { NCRuleId: '', IsNC: false, IsAction: false, 'Rule': '' };
                    var isNC = eval(Rules[i].FinalJavaScriptEquation);

                    if (Rules[i].IsNC == true && isNC == true) {
                        DataObj = { NCRuleId: Rules[i].RuleId, IsNC: isNC, IsAction: false, 'Rule': Rules[i] };
                        DefaultBindNCSummary(isNC, Rules[i], AttributeId, ControlId, IsShowMessage);
                    }
                    else if (Rules[i].IsNC == true) {
                        DataObj = { NCRuleId: Rules[i].RuleId, IsNC: isNC, IsAction: false, 'Rule': Rules[i] };
                    }

                    else if (Rules[i].IsNC == false) {
                        DataObj = { NCRuleId: Rules[i].RuleId, IsNC: isNC, IsAction: false, 'Rule': Rules[i] };
                    }
                    NCResponseList.push(DataObj);
                }
            }
          
            //alert('NCResponseList' + JSON.stringify(NCResponseList));
            OneViewConsole.Debug("ShowNCStatus End", "CPActionNCComponent.ShowNCStatus");
            return NCResponseList;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "CPActionNCComponent.ShowNCStatus", Excep);
        }
        finally {
            Rules = null;
            NCRules = null;
            ActionRules = null;
            DataList = null;
            isNC = null;
        }
    }

    var ShowAction = function (ActionRule, IsViolated) {
        try {
            var Response
            if (ActionRule != undefined) {
                var ActionList = ActionRule.ActionList;
                if (ActionList != undefined) {
                    for (var j = 0; j < ActionList.length; j++) {
                        var ActionDetails = ActionList[j];
                        if (ActionDetails.ActionConfigDimension == "FormActionConfig") {
                            var FormActionTemplateNodeId = ActionDetails.FormActionTemplateNodeId;
                            //if (FormActionTemplateNodeId == 2 || FormActionTemplateNodeId == 3) {
                                if (IsViolated == true) {
                                    // alert('call form')
                                    Response = { NCRuleId: ActionRule.RuleId, IsNC: IsViolated, IsAction: true };
                                }

                                else
                                    Response = { NCRuleId: ActionRule.RuleId, IsNC: IsViolated, IsAction: true };


                            //}
                            //else {
                            //    alert(' Need to implement code for this template');
                           // }
                        }
                        if (ActionDetails.ActionConfigDimension == "PredefinedActionConfig") {
                            alert('Not implemented : PreDefinedAction');
                        }
                    }
                }

            }

            // alert('Response' + JSON.stringify(Response));
            return Response;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "NCComponent.ShowAction", Excep);
        }
        finally {

        }
    }


    var ShowActionOLD = function (ActionRules, DataList) {
        try {
            if (ActionRules != undefined) {

                if (ActionRules.length > 1) {
                    alert('More than one action : Not implemented');
                }
                else {
                    for (var i = 0; i < ActionRules.length; i++) {

                        var ActionRule = ActionRules[i];
                        var IsViolated = eval(ActionRule.FinalJavaScriptEquation);

                        var ActionList = ActionRule.ActionList;
                        if (ActionList != undefined) {
                            for (var j = 0; j < ActionList.length; j++) {
                                var ActionDetails = ActionList[j];
                                if (ActionDetails.ActionConfigDimension == "FormActionConfig") {
                                    var FormActionTemplateNodeId = ActionDetails.FormActionTemplateNodeId;
                                    
                                    //if (FormActionTemplateNodeId == 2 || FormActionTemplateNodeId == 3) {
                                        if (IsViolated == true) {
                                            // alert('call form')
                                            var DataObj = { NCRuleId: ActionRule.RuleId, IsNC: IsViolated ,IsAction : true};

                                            if (DataList == undefined || DataList=="")
                                                DataList = [];

                                            DataList.push(DataObj);
                                        }
                                    //}
                                    //else {
                                    //    alert(' Need to implement code for this template');
                                    //}
                                }
                                if (ActionDetails.ActionConfigDimension == "PredefinedActionConfig") {
                                    alert('Not implemented : PreDefinedAction');
                                }
                            }
                        }
                        
                       
                       
                    }
                }
            }

            return DataList;

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "NCComponent.ShowAction", Excep);
        }
        finally {
           
        }
    }

    var GetNCRules = function (AttributeId, ControlId) {
        try {
            OneViewConsole.Debug("GetActionNCRules Start", "NCComponent.GetActionNCRules");
            var Rules = [];// { 'NCRules': '', 'ActionRules': '' };


            if (NCActionProfileMetaData != undefined) {
                var oNCEquationBuilder = new NCEquationBuilder(TemplateNodes);

                var AttributeWiseActionNCConfigDict = NCActionProfileMetaData.AttributeWiseActionNCConfig;
                var MultipleAttributeActionNCConfigDict = NCActionProfileMetaData.MultipleAttributeActionNCConfig;
                var TemplateWiseActionNCConfigDict = NCActionProfileMetaData.TemplateWiseActionNCConfig;


                if (AttributeWiseActionNCConfigDict != '') {
                    GetAttributeWiseNCRules(AttributeWiseActionNCConfigDict, AttributeId, ControlId, Rules);
                }

                //alert(MultipleAttributeActionNCConfigDict);
                if (MultipleAttributeActionNCConfigDict != '') {
                    GetMultipleAttributeNCRules(MultipleAttributeActionNCConfigDict, AttributeId, ControlId, Rules);
                }

            }

            OneViewConsole.Debug("GetActionNCRules End", "NCComponent.GetNCRules");

            // alert('GetActionNCRules ' + JSON.stringify(Rules));
            return Rules;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "NCComponent.GetNCRules", Excep);
        }
        finally {
            Rule = null;
            RuleObj = null;
        }
    }

    var GetAttributeWiseNCRules = function (AttributeWiseActionConfigDict, AttributeId, ControlId, Rules) {
        try {
            var AttributeWiseRuleList;

            AttributeWiseRuleList = AttributeWiseActionConfigDict[AttributeId];
            if (AttributeWiseRuleList != undefined) {
                for (var i = 0; i < AttributeWiseRuleList.length; i++) {
                    Rules.push(AttributeWiseRuleList[i]);
                }
            }
            return Rules;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "CPActionNCComponent.GetAttributeWiseNCRules", Excep);
        }
        finally {
            AttributeWiseRuleList = null;
            AttributeWiseRule = null;
            Rule = null;
        }
    }

    var GetMultipleAttributeNCRules = function (MultipleAttributeActionNCConfigDict, AttributeId, ControlId, Rules) {
        try {
            //Check attributeId exists in this rule id       
            for (var itrRuleId in MultipleAttributeActionNCConfigDict) {
                var IdList = itrRuleId.split(":");
                var IsAttributeExistsInKey = false;
                for (var i = 0; i < IdList.length; i++) {
                    if (IdList[i] == AttributeId) {
                        IsAttributeExistsInKey = true;
                        break;
                    }
                }

                if (IsAttributeExistsInKey == true) {
                    var MultipleAttributeWiseRuleList = MultipleAttributeActionNCConfigDict[itrRuleId];
                    if (MultipleAttributeWiseRuleList != undefined) {
                        for (var i = 0; i < AttributeWiseRuleList.length; i++) {
                            Rules.push(AttributeWiseRuleList[i]);
                        }
                    }
                }
            }

            return Rules;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "CPActionNCComponent.GetMultipleAttributeNCRules", Excep);
        }
        finally {
            AttributeWiseRuleList = null;
            AttributeWiseRule = null;
            Rule = null;
        }
    }


    var GetActionNCRules = function (AttributeId, ControlId) {
        try {
            OneViewConsole.Debug("GetActionNCRules Start", "NCComponent.GetActionNCRules");
            var Rules =[];// { 'NCRules': '', 'ActionRules': '' };
            

            if (NCActionProfileMetaData != undefined) {
                var oNCEquationBuilder = new NCEquationBuilder(TemplateNodes);

                var AttributeWiseActionNCConfigDict = NCActionProfileMetaData.AttributeWiseActionNCConfig;
                var MultipleAttributeActionNCConfigDict = NCActionProfileMetaData.MultipleAttributeActionNCConfig;
                var TemplateWiseActionNCConfigDict = NCActionProfileMetaData.TemplateWiseActionNCConfig;

         
                if (AttributeWiseActionNCConfigDict != '') {
                    GetAttributeWiseActionNCRules(AttributeWiseActionNCConfigDict, AttributeId, ControlId, Rules);                  
                }

                //alert(MultipleAttributeActionNCConfigDict);
                if (MultipleAttributeActionNCConfigDict != '') {
                    Rules = GetMultipleAttributeActionNCRules(MultipleAttributeActionNCConfigDict, AttributeId, ControlId, Rules);               
                }

            }

            OneViewConsole.Debug("GetActionNCRules End", "NCComponent.GetActionNCRules");

           // alert('GetActionNCRules ' + JSON.stringify(Rules));
            return Rules;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "NCComponent.GetActionNCRules", Excep);
        }
        finally {
            Rule = null;
            RuleObj = null;
        }
    }

    var GetAttributeWiseActionNCRules = function (AttributeWiseActionConfigDict, AttributeId, ControlId, Rules) {
        try {
            var AttributeWiseRuleList;

            AttributeWiseRuleList = AttributeWiseActionConfigDict[AttributeId];
            if (AttributeWiseRuleList != undefined) {
                Rules=  CheckNCActionRules(AttributeWiseRuleList, Rules);
            }
            return Rules;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "CPActionNCComponent.GetAttributeWiseActionNCRules", Excep);
        }
        finally {
            AttributeWiseRuleList = null;
            AttributeWiseRule = null;
            Rule = null;
        }
    }

    var GetMultipleAttributeActionNCRules = function (MultipleAttributeActionNCConfigDict, AttributeId, ControlId, Rules) {
        try {
            //Check attributeId exists in this rule id       
            for (var itrRuleId in MultipleAttributeActionNCConfigDict) {
                var IdList = itrRuleId.split(":");
                var IsAttributeExistsInKey = false;
                for (var i = 0; i < IdList.length; i++) {
                    if (IdList[i] == AttributeId) {
                        IsAttributeExistsInKey = true;
                        break;
                    }
                }

                if (IsAttributeExistsInKey == true) {
                    var MultipleAttributeWiseRuleList = MultipleAttributeActionNCConfigDict[itrRuleId];
                    if (MultipleAttributeWiseRuleList != undefined) {
                        Rules = CheckNCActionRules(MultipleAttributeWiseRuleList, Rules);
                    }
                }
            }

            return Rules;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "CPActionNCComponent.GetMultipleAttributeActionNCRules", Excep);
        }
        finally {
            AttributeWiseRuleList = null;
            AttributeWiseRule = null;
            Rule = null;
        }
    }

    var CheckNCActionRules = function (AttributeWiseRuleList, Rules) {
        try {


            if (AttributeWiseRuleList != undefined) {
                for (var i = 0; i < AttributeWiseRuleList.length; i++) {
                    var AttributeWiseRule = AttributeWiseRuleList[i];
                    var FinalJavaScriptEquation = AttributeWiseRule.FinalJavaScriptEquation;
                    if (AttributeWiseRule.IsNC == true) {
                        Rules.push(AttributeWiseRule);

                    }

                    else if (AttributeWiseRule.IsActionEnable == true) {
                        if (AttributeWiseRule.IsCustomActionEnabled == true) {
                            alert('Not implemented : CustomAction');
                        }

                        var ActionList = AttributeWiseRule.ActionList;
                        for (var j = 0; j < ActionList.length; j++) {
                            var ActionDetails = ActionList[i];
                            if (ActionDetails.ActionConfigDimension == "FormActionConfig") {
                                var FormActionTemplateNodeId = ActionDetails.FormActionTemplateNodeId;
                                //if (FormActionTemplateNodeId == 2 || FormActionTemplateNodeId == 3) {
                             
                                    Rules.push(AttributeWiseRule);
                                //}
                                //else {
                                //    alert(' Need to implement code for this template');
                                //}
                            }
                            if (ActionDetails.ActionConfigDimension == "PredefinedActionConfig") {
                                alert('Not implemented : PreDefinedAction');
                            }
                        }


                    }
                }
            }
           // Rules = { 'NCRules': NCRules, 'ActionRules': ActionRules }

            //alert('CheckNCActionRules ' + JSON.stringify(Rules));
            return Rules;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "CPActionNCComponent.CheckNCActionRules", Excep);
        }
        finally {
            AttributeWiseRuleList = null;
            AttributeWiseRule = null;
            Rule = null;
        }
    }


    var GetTemplateWiseActionNCRules = function (AttributeWiseActionConfigDict, AttributeId, ControlId, Rules) {
        alert('GetTemplateWiseActionNCRules :Not implemeted')
    }

    var DefaultBindNCSummary = function (NcStatus, objRule, AttributeId, ControlId) {
        try {
            OneViewConsole.Debug("DefaultBindNCSummary Start", "NCComponent.DefaultBindNCSummary");

            var element = document.getElementById("divDeviatedValue");
          //  if (IsShowMessage == true) {
                alert(xlatService.xlat('Title_Notification') + ':' + objRule.CriteriaDisplayLabelKey);
                //toaster.pop('warning', 'Notification', objRule.CriteriaDisplayLabel);
                //oScope.toggle = true;
                //oScope.DisplayDeviatedValue = 'Bad';
                //oScope.CriteriaDisplayLabel = objRule.CriteriaDisplayLabel;
                //element.setAttribute("class", "col red");

           // }
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





    /////////////////////////////////****************************** Get Action-NC STATUS START **************************///////////////////////////////////////////////////////

    this.GetActionNCStatus = function (AttributeId, IsViewRecordsPage) {
        try {
            // alert('NCActionProfileMetaData:' + JSON.stringify(NCActionProfileMetaData));
            var ActionNCConfigSettingList = [];
            GetActionNCConfigSettings(AttributeId, ActionNCConfigSettingList);

           // alert('ActionNCConfigSettingList : ' + JSON.stringify(ActionNCConfigSettingList));
            var ActionNCResponseList = [];
            if (ActionNCConfigSettingList != undefined) {


                for (var i = 0; i < ActionNCConfigSettingList.length; i++) {
                    //alert(IsViewRecordsPage + 'ActionNCConfigSettingList[i].IsManual :' + ActionNCConfigSettingList[i].IsManual + "," + JSON.stringify(ActionNCConfigSettingList[i]));
                    if ((IsViewRecordsPage != true) || (IsViewRecordsPage == true && ActionNCConfigSettingList[i].IsManual == false)) {
                        var ActionNCResponse = { RuleId: '', isRuleViolated: '', 'ActionNCConfigSetting': '' };

                        // alert('ActionNCConfigSettingList[i].FinalJavaScriptEquation' + ActionNCConfigSettingList[i].FinalJavaScriptEquation);
                        var IsRuleViolated = EvaluateJavaScriptEquation(ActionNCConfigSettingList[i].FinalJavaScriptEquation);
                        //  alert('IsRuleViolated:' + IsRuleViolated);
                        var Deviatedby = null;
                        var ExpectedValue = null;
                        var ActualValue = null;
                        if (IsRuleViolated == true) {
                            Deviatedby = EvaluvateOneViewDCMessageWithDCCriteriaVariable(ActionNCConfigSettingList[i].Deviatedby);
                      
                            ExpectedValue = EvaluvateOneViewDCMessageWithDCCriteriaVariable(ActionNCConfigSettingList[i].ExpectedValue);
                            ActualValue = EvaluvateOneViewDCMessageWithDCCriteriaVariable(ActionNCConfigSettingList[i].ActualValue);
                          
                        }

                    

                        ActionNCResponse = { 'RuleId': ActionNCConfigSettingList[i].RuleId, 'IsRuleViolated': IsRuleViolated, 'ActionNCConfigSetting': ActionNCConfigSettingList[i], 'Deviatedby': Deviatedby, 'ExpectedValue': ExpectedValue, 'ActualValue': ActualValue }; //ActionNCConfigSetting
                        ActionNCResponseList.push(ActionNCResponse);
                    }
                }
            }

           //  alert('CPActionNCComponent ActionNCResponseList ' + JSON.stringify(ActionNCResponseList));
            return ActionNCResponseList;
        }
        catch (Excep) {
            //alert(Excep);
            throw oOneViewExceptionHandler.Create("FrameWork", "CPActionNCComponent.GetActionNCStatus", Excep);
        }
        finally {
            Rules = null;
            NCRules = null;
            ActionRules = null;
            DataList = null;
            isNC = null;
        }
    }

    var GetActionNCConfigSettings = function (AttributeId, ActionNCConfigSettingList) {
        try {
            //alert('NCActionProfileMetaData ' + JSON.stringify(NCActionProfileMetaData));

            if (NCActionProfileMetaData != undefined) {

                var AttributeWiseActionNCConfigDict = NCActionProfileMetaData.AttributeWiseActionNCConfig;
                var MultipleAttributeActionNCConfigDict = NCActionProfileMetaData.MultipleAttributeActionNCConfig;
                //var TemplateWiseActionNCConfigDict = NCActionProfileMetaData.TemplateWiseActionNCConfig;


                if (AttributeWiseActionNCConfigDict != '') {
                    GetAttributeWiseActionNCConfig(AttributeWiseActionNCConfigDict, AttributeId, ActionNCConfigSettingList);
                }

                //alert(MultipleAttributeActionNCConfigDict);
                if (MultipleAttributeActionNCConfigDict != '') {
                    GetMultipleAttributeActionNCConfig(MultipleAttributeActionNCConfigDict, AttributeId, ActionNCConfigSettingList);
                }

            }

            //  alert('GetActionNCConfigSettings ' + JSON.stringify(ActionNCConfigSettingList));
            return ActionNCConfigSettingList;
        }
        catch (Excep) {
            // alert(Excep);
            throw oOneViewExceptionHandler.Create("FrameWork", "CPActionNCComponent.GetActionNCConfigSettings", Excep);
        }
        finally {
            Rule = null;
            RuleObj = null;
        }
    }

    var GetAttributeWiseActionNCConfig = function (AttributeWiseActionConfigDict, AttributeId, ActionNCConfigSettingList) {
        try {
            var AttributeWiseRuleList;

            AttributeWiseRuleList = AttributeWiseActionConfigDict[AttributeId];
          
            if (AttributeWiseRuleList != undefined) {
                for (var i = 0; i < AttributeWiseRuleList.length; i++) {
                    AttributeWiseRuleList[i].TemplateNodeIds = "," + AttributeId + ",";
                    ActionNCConfigSettingList.push(AttributeWiseRuleList[i]);
                }
            }
            return ActionNCConfigSettingList;
        }
        catch (Excep) {
            //alert(Excep);
            throw oOneViewExceptionHandler.Create("FrameWork", "CPActionNCComponent.GetAttributeWiseActionNCConfig", Excep);
        }
        finally {
            AttributeWiseRuleList = null;
            AttributeWiseRule = null;
            Rule = null;
        }
    }

    var GetMultipleAttributeActionNCConfig = function (MultipleAttributeActionNCConfigDict, AttributeId, ActionNCConfigSettingList) {
        try {
         
            
            //Check attributeId exists in this rule id       
            for (var itrRuleId in MultipleAttributeActionNCConfigDict) {
                var IdList = itrRuleId.split(":");
                var IsAttributeExistsInKey = false;
                for (var i = 0; i < IdList.length; i++) {
                    if (IdList[i] == AttributeId) {
                        IsAttributeExistsInKey = true;
                        break;
                    }
                }

                if (IsAttributeExistsInKey == true) {
                    var MultipleAttributeWiseRuleList = MultipleAttributeActionNCConfigDict[itrRuleId];
                    if (MultipleAttributeWiseRuleList != undefined) {
                        for (var i = 0; i < MultipleAttributeWiseRuleList.length; i++) {
                            var TemplateNodeIds = itrRuleId.replace(/:/g, ",");
                            MultipleAttributeWiseRuleList[i].TemplateNodeIds = "," + TemplateNodeIds + ",";
                            ActionNCConfigSettingList.push(MultipleAttributeWiseRuleList[i]);
                        }
                    }
                }
            }

            return ActionNCConfigSettingList;
        }
        catch (Excep) {
            //alert(Excep);
            throw oOneViewExceptionHandler.Create("FrameWork", "CPActionNCComponent.GetMultipleAttributeActionNCConfig", Excep);
        }
        finally {
            AttributeWiseRuleList = null;
            AttributeWiseRule = null;
            Rule = null;
        }
    }

    var EvaluateJavaScriptEquation = function (FinalJavaScriptEquation) {
        try {
            FinalJavaScriptEquation = FinalJavaScriptEquation.replace(/#/g, "'");

            ////FinalJavaScriptEquation = FinalJavaScriptEquation.replace(/"undefined"/g, "undefined");
          
           // alert('EvaluateJavaScriptEquation' + FinalJavaScriptEquation);
            var isNC = eval(FinalJavaScriptEquation);
           //  alert('isNC' + isNC);

          //  alert('isNC : ' + isNC + ' ,    EvaluateJavaScriptEquation : ' + FinalJavaScriptEquation);
            return isNC;
        }
        catch (Excep) {
            //alert('CPActionNCComponent.EvaluateJavaScriptEquation 11' + Excep);
            //alert('CPActionNCComponent.EvaluateJavaScriptEquation 22' + JSON.stringify( Excep));
            throw oOneViewExceptionHandler.Create("FrameWork", "CPActionNCComponent.EvaluateJavaScriptEquation", Excep);
        }
        finally {
            isNC = null;
        }
    }

    ///TODO:Harshil(1/Dec/2105 ,eval from 'OneViewDCMessageWithDCCriteriaVariableEvaluationComponent') , remove following code
    var EvaluvateOneViewDCMessageWithDCCriteriaVariable = function (OneViewDCMessageWithDCCriteriaVariable) {
        try {
            var messageKey = null;
            if (OneViewDCMessageWithDCCriteriaVariable != undefined && OneViewDCMessageWithDCCriteriaVariable != null) {              
                messageKey = OneViewDCMessageWithDCCriteriaVariable.MessageKey;            
                for (var key in OneViewDCMessageWithDCCriteriaVariable.VariablesFinalJavaScriptEquation) {
             
                    if (OneViewDCMessageWithDCCriteriaVariable.VariablesFinalJavaScriptEquation[key] != undefined && OneViewDCMessageWithDCCriteriaVariable.VariablesFinalJavaScriptEquation[key] != null) {
                        OneViewDCMessageWithDCCriteriaVariable.VariablesFinalJavaScriptEquation[key] = OneViewDCMessageWithDCCriteriaVariable.VariablesFinalJavaScriptEquation[key].replace(/#/g, "'");

                      //  alert('22 OneViewDCMessageWithDCCriteriaVariable.VariablesFinalJavaScriptEquation[key] ' + OneViewDCMessageWithDCCriteriaVariable.VariablesFinalJavaScriptEquation[key]);
                        var value = eval(OneViewDCMessageWithDCCriteriaVariable.VariablesFinalJavaScriptEquation[key]);
                      
                        ///TODO:Its temp way to find issue in clinet site,Deviated by came with wrong data
                        //once issue find need to change log mode to datalog
                        OneViewConsole.DataLog("EvaluvateOneViewDCMessageWithDCCriteriaVariable , Equation : " + OneViewDCMessageWithDCCriteriaVariable.VariablesFinalJavaScriptEquation[key] + " , Value :" + value, "CPActionNCComponent.EvaluvateOneViewDCMessageWithDCCriteriaVariable");

                        // alert('value :' + value);                     
                      
                      //  alert('value :' + value + '     OneViewDCMessageWithDCCriteriaVariable.VariablesFinalJavaScriptEquation[key]       : ' + OneViewDCMessageWithDCCriteriaVariable.VariablesFinalJavaScriptEquation[key]);

                        messageKey = messageKey.replace(key, value);
                    }
                }
            }
            return messageKey;
        }
        catch (Excep) {
             //alert('CPActionNCComponent.EvaluvateOneViewDCMessageWithDCCriteriaVariable 11' + Excep);
            // alert('CPActionNCComponent.EvaluvateOneViewDCMessageWithDCCriteriaVariable 22' + JSON.stringify( Excep));
            throw oOneViewExceptionHandler.Create("FrameWork", "CPActionNCComponent.EvaluvateOneViewDCMessageWithDCCriteriaVariable", Excep);
        }
        finally {

        }
    }

    /////////////////////////////////****************************** Get Action-NC STATUS END **************************///////////////////////////////////////////////////////


    ////////////New///////////////

    this.EvaluateAction = function (ActionNCConfigSetting, IsRuleViolated) {
        try {
         
            AttributeWiseRule = ActionNCConfigSetting.ActionNCConfigSetting;
            var ActionResponse = { 'IsRuleViolated': '', RuleId: '', IsCustomActionEnabled: false, 'CustomeActionSetting': '', IsFormAction: false, 'FormActionList': [], 'PredinedActionList': [], 'RuleName': '', 'RuleDescription': '', 'RuleGroup': '', 'RuleCode': '', 'Deviatedby': '', 'ExpectedValue': '','ActualValue' : '','TemplateNodeIds':'' };
            ActionResponse.IsRuleViolated = IsRuleViolated;
            ActionResponse.RuleId = AttributeWiseRule.RuleId;
            ActionResponse.RuleName = AttributeWiseRule.RuleName;
            ActionResponse.RuleDescription = AttributeWiseRule.RuleDescription;
            ActionResponse.RuleGroup = AttributeWiseRule.RuleGroup;
            ActionResponse.RuleCode = AttributeWiseRule.RuleCode;
            ActionResponse.Deviatedby = ActionNCConfigSetting.Deviatedby;
            ActionResponse.ExpectedValue = ActionNCConfigSetting.ExpectedValue;
            ActionResponse.ActualValue = ActionNCConfigSetting.ActualValue;
            ActionResponse.TemplateNodeIds = AttributeWiseRule.TemplateNodeIds;
           // alert('AttributeWiseRule' + JSON.stringify(AttributeWiseRule));
            var FormActionList = [];
            var PredinedActionList = [];
            if (AttributeWiseRule.IsCustomActionEnabled == true) {
                alert('Not implemented : CustomAction');
            }

            var ActionList = AttributeWiseRule.ActionList;
            for (var j = 0; j < ActionList.length; j++) {
                var ActionDetails = ActionList[j];

                if (ActionDetails.ActionConfigDimension == "FormActionConfig") {
                    // alert('EvaluateAction ActionDetails.ActionConfig : ' + JSON.stringify(ActionDetails.ActionConfig));
                    var FormActionTemplateNodeId = ActionDetails.ActionConfig.TemplateNodeId;
                    //if (FormActionTemplateNodeId == 2 || FormActionTemplateNodeId == 3) {
                        ActionResponse.IsFormAction = true;
                        // ActionResponse.FormActionTemplateNodeId = FormActionTemplateNodeId;
                        if (ActionResponse.FormActionList.indexOf(FormActionTemplateNodeId) == -1)
                            ActionResponse.FormActionList.push(FormActionTemplateNodeId)
                    //}
                    //else {
                    //    alert(' Need to implement code for this template');
                    //}
                }
                else if (ActionDetails.ActionConfigDimension == "PredefinedActionConfig") {
                    alert('Not implemented : PreDefinedAction');
                    // ActionResponse.PredinedActionList.push(ActionDetails)
                }
            }

            // alert('EvaluateAction ActionResponse' + ActionResponse + JSON.stringify(ActionResponse));
            return ActionResponse;
        }
        catch (Excep) {
            //alert('CPActionNCComponent.EvaluateAction Excep ' + Excep);
           // alert('CPActionNCComponent.EvaluateAction Excep ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("BO", "CPActionNCComponent.EvaluateAction", Excep);
        }
        finally {
            ActionResponse = null;
            ActionList = null;
        }
    }

}






/////////for testing purpose static metadata


//var NCActionProfileMetaData =
//    {

//        "AttributeWiseActionNCConfig": {
//            56:  [{
//            'RuleId': '56',
//               'CriteriaDisplayLabelKey': 'Surface is expected to be greater than 65',
//               "FinalJavaScriptEquation": "",
//               'ControlId': 'txtCoreTempControlId',
//               'Rule': {
//                   'CriteriaType': 'OneViewDCAdvCriteria',
//                   'Condition': 'AND',
//                   'FilterParms': [{
//                       'CriteriaType': 'OneViewDCPrimaryCriteria',
//                       'TemplateNodeId': '56',
//                       'ControlId': 'chkTruckCleanliness',
//                       'Condition': 'Equal',
//                       'value': '2'
//                   }, {
//                       'CriteriaType': 'OneViewDCPrimaryCriteria',
//                       'TemplateNodeId': '61',
//                       'ControlId': 'ATSurfaceTempControlId',
//                       'Condition': 'LessThanOrEqual',
//                       'value': '65'
//                   }]
//               },
//               "IsNC": true,
//               "IsActionEnable": false,
//               "IsCustomActionEnabled": false,
//               "CustomActionSetting": {
//                   "MinimumChar": 5,
//                   "MaxChar": 20
//               },
//               "ActionList": [],
//               "MinNoOfPreDefinedAction": 0,
//               "MinNoOfFormAction": 0,
//               "MinNoOfCustomAction": 0,
//               "MaxNoOfCustomAction": -1,
//               "MinNoOfAction": 0,
//               "IsExecutionOrderEditable": true,
//               "IsSLAEditable": true,
//               "IsFollowupUserEditable": true
//           }]
//    },
//    "MultipleAttributeActionNCConfig": '',
//    "TemplateWiseActionNCConfig": ''
//};





//var NCActionProfileMetaData = {

//       "AttributeWiseActionNCConfig": { 
//           22: [{
//               'RuleId': '3',
//               'CriteriaDisplayLabelKey': 'Blast chiller TempOut is expected to be less than 8',
//               "FinalJavaScriptEquation": "",
//               'ControlId': '',
//               'Rule': {
//                   'CriteriaType': 'OneViewDCPrimaryCriteria',
//                   'TemplateNodeId': 22, //Bout
//                   'ControlId': 'ATBlastChillerTempOutControlId',
//                   'Condition': 'GreaterThan',
//                   'value': '8'
//               },
//               "IsNC": true,
//               "IsActionEnable": true,
//               "IsCustomActionEnabled": false,
//               "CustomActionSetting": {
//                   "MinimumChar": 5,
//                   "MaxChar": 20
//               },
//               "ActionList": [
//                   {
//                       "ActionConfig": {
//                           "TemplateNodeId": 2
//                       },

//                       "ActionConfigDimension": "FormActionConfig",
//                       "DisplayOrder": 1,
//                       "IsMandatory": false,
//                       "ExecutionOrder": 1
//                   }
//               ],
//               "MinNoOfPreDefinedAction": 0,
//               "MinNoOfFormAction": 0,
//               "MinNoOfCustomAction": 0,
//               "MaxNoOfCustomAction": -1,
//               "MinNoOfAction": 0,
//               "IsExecutionOrderEditable": true,
//               "IsSLAEditable": true,
//               "IsFollowupUserEditable": true
//           }],
//           17: [{
//               'RuleId': '4',
//               'CriteriaDisplayLabelKey': 'Pre-chiller Temp Out is expected to be less than or equal to 5',
//               "FinalJavaScriptEquation": "",
//               'ControlId': '',
//               'Rule': {
//                   'CriteriaType': 'OneViewDCPrimaryCriteria',
//                   'TemplateNodeId': 17, //Bout
//                   'ControlId': 'ATPreChillerTempOutControlId',
//                   'Condition': 'GreaterThan',
//                   'value': '5'
//               },
//               "IsNC": true,
//               "IsActionEnable": true,
//               "IsCustomActionEnabled": false,
//               "CustomActionSetting": {
//                   "MinimumChar": 5,
//                   "MaxChar": 20
//               },
//               "ActionList": [
//                   {
//                       "ActionConfig": {
//                           "TemplateNodeId": 2
//                       },

//                       "ActionConfigDimension": "FormActionConfig",
//                       "DisplayOrder": 1,
//                       "IsMandatory": false,
//                       "ExecutionOrder": 1
//                   }
//               ],
//               "MinNoOfPreDefinedAction": 0,
//               "MinNoOfFormAction": 0,
//               "MinNoOfCustomAction": 0,
//               "MaxNoOfCustomAction": -1,
//               "MinNoOfAction": 0,
//               "IsExecutionOrderEditable": true,
//               "IsSLAEditable": true,
//               "IsFollowupUserEditable": true
//           }],
//       },
//       "MultipleAttributeActionNCConfig":
//           {
//               '5:11': [{
//                   'RuleId': '201',
//                   'CriteriaDisplayLabelKey': 'CoreTemp is expected to be greater than 74',
//                   "FinalJavaScriptEquation": "",
//                   'ControlId': 'txtCoreTempControlId',
//                   'Rule': {
//                       'CriteriaType': 'OneViewDCAdvCriteria',
//                       'Condition': 'AND',
//                       'FilterParms': [{
//                           'CriteriaType': 'OneViewDCPrimaryCriteria',
//                           'TemplateNodeId': '5',
//                           'ControlId': 'AddlProductTypeControlId',
//                           'Condition': 'Equal',
//                           'value': '4'
//                       }, {
//                           'CriteriaType': 'OneViewDCPrimaryCriteria',
//                           'TemplateNodeId': '11',
//                           'ControlId': 'txtCoreTempControlId',
//                           'Condition': 'LessThanOrEqual',
//                           'value': '74'
//                       }]
//                   },
//                   "IsNC": true,
//                   "IsActionEnable": false,
//                   "IsCustomActionEnabled": false,
//                   "CustomActionSetting": {
//                       "MinimumChar": 5,
//                       "MaxChar": 20
//                   },
//                   "ActionList": [],
//                   "MinNoOfPreDefinedAction": 0,
//                   "MinNoOfFormAction": 0,
//                   "MinNoOfCustomAction": 0,
//                   "MaxNoOfCustomAction": -1,
//                   "MinNoOfAction": 0,
//                   "IsExecutionOrderEditable": true,
//                   "IsSLAEditable": true,
//                   "IsFollowupUserEditable": true
//               },
//               {
//                   'RuleId': '202',
//                   'CriteriaDisplayLabelKey': 'CoreTemp is expected to be greater than 65',
//                   "FinalJavaScriptEquation": "",
//                   'ControlId': 'txtCoreTempControlId',
//                   'Rule': {
//                       'CriteriaType': 'OneViewDCAdvCriteria',
//                       'Condition': 'AND',
//                       'FilterParms': [{
//                           'CriteriaType': 'OneViewDCPrimaryCriteria',
//                           'TemplateNodeId': '5',
//                           'ControlId': 'AddlProductTypeControlId',
//                           'Condition': 'Equal',
//                           'value': '6'
//                       }, {
//                           'CriteriaType': 'OneViewDCPrimaryCriteria',
//                           'TemplateNodeId': '11',
//                           'ControlId': 'txtCoreTempControlId',
//                           'Condition': 'LessThanOrEqual',
//                           'value': '65'
//                       }]
//                   },
//                   "IsNC": true,
//                   "IsActionEnable": false,
//                   "IsCustomActionEnabled": false,
//                   "CustomActionSetting": {
//                       "MinimumChar": 5,
//                       "MaxChar": 20
//                   },
//                   "ActionList": [],
//                   "MinNoOfPreDefinedAction": 0,
//                   "MinNoOfFormAction": 0,
//                   "MinNoOfCustomAction": 0,
//                   "MaxNoOfCustomAction": -1,
//                   "MinNoOfAction": 0,
//                   "IsExecutionOrderEditable": true,
//                   "IsSLAEditable": true,
//                   "IsFollowupUserEditable": true
//               },
//               {
//                   'RuleId': '203',
//                   'CriteriaDisplayLabelKey': 'CoreTemp is expected to be greater than 74',
//                   "FinalJavaScriptEquation": "",
//                   'ControlId': 'txtCoreTempControlId',
//                   'Rule': {
//                       'CriteriaType': 'OneViewDCAdvCriteria',
//                       'Condition': 'AND',
//                       'FilterParms': [{
//                           'CriteriaType': 'OneViewDCPrimaryCriteria',
//                           'TemplateNodeId': '5',
//                           'ControlId': 'AddlProductTypeControlId',
//                           'Condition': 'Equal',
//                           'value': '8'
//                       }, {
//                           'CriteriaType': 'OneViewDCPrimaryCriteria',
//                           'TemplateNodeId': '11',
//                           'ControlId': 'txtCoreTempControlId',
//                           'Condition': 'LessThanOrEqual',
//                           'value': '74'
//                       }]
//                   },
//                   "IsNC": true,
//                   "IsActionEnable": false,
//                   "IsCustomActionEnabled": false,
//                   "CustomActionSetting": {
//                       "MinimumChar": 5,
//                       "MaxChar": 20
//                   },
//                   "ActionList": [],
//                   "MinNoOfPreDefinedAction": 0,
//                   "MinNoOfFormAction": 0,
//                   "MinNoOfCustomAction": 0,
//                   "MaxNoOfCustomAction": -1,
//                   "MinNoOfAction": 0,
//                   "IsExecutionOrderEditable": true,
//                   "IsSLAEditable": true,
//                   "IsFollowupUserEditable": true
//               },
//               {
//                   'RuleId': '204',
//                   'CriteriaDisplayLabelKey': 'CoreTemp is expected to be greater than 65',
//                   "FinalJavaScriptEquation": "",
//                   'ControlId': 'txtCoreTempControlId',
//                   'Rule': {
//                       'CriteriaType': 'OneViewDCAdvCriteria',
//                       'Condition': 'AND',
//                       'FilterParms': [{
//                           'CriteriaType': 'OneViewDCPrimaryCriteria',
//                           'TemplateNodeId': '5',
//                           'ControlId': 'AddlProductTypeControlId',
//                           'Condition': 'Equal',
//                           'value': '10'
//                       }, {
//                           'CriteriaType': 'OneViewDCPrimaryCriteria',
//                           'TemplateNodeId': '11',
//                           'ControlId': 'txtCoreTempControlId',
//                           'Condition': 'LessThanOrEqual',
//                           'value': '65'
//                       }]
//                   },
//                   "IsNC": true,
//                   "IsActionEnable": false,
//                   "IsCustomActionEnabled": false,
//                   "CustomActionSetting": {
//                       "MinimumChar": 5,
//                       "MaxChar": 20
//                   },
//                   "ActionList": [],
//                   "MinNoOfPreDefinedAction": 0,
//                   "MinNoOfFormAction": 0,
//                   "MinNoOfCustomAction": 0,
//                   "MaxNoOfCustomAction": -1,
//                   "MinNoOfAction": 0,
//                   "IsExecutionOrderEditable": true,
//                   "IsSLAEditable": true,
//                   "IsFollowupUserEditable": true
//               }
//               ],           
//           },
//       "TemplateWiseActionNCConfig": ''
//   };
