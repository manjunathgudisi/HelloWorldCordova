function DefaultValueComponent() {

    this.SetDefaultValue = function (Scope, UserId, TemplateNodeId, AuditPlaceNodeId, AuditPlaceDimension) {
        try {
            OneViewConsole.Debug("SetDefaultValue Start", "DefaultValueComponent.SetDefaultValue");

                alert('not implemented exception');

            OneViewConsole.Debug("SetDefaultValue End", "DefaultValueComponent.SetDefaultValue");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Framework", "DefaultValueComponent.SetDefaultValue", Excep);
        }
    }


        //{ ServiceId: ServiceId, LoginUserId: LoginUserId ,TemplateNodeId:TemplateId,DCPlaceNodeId:DcPlaceId,DCPlaceDimension:DcPlaceDimension}
        this.GetDefaultValueMetaData = function (Scope,reqParm) {
            try {
                OneViewConsole.Debug("GetDefaultValueMetaData Start", "DefaultValueComponent.GetDefaultValueMetaData");

                    var _oDefaultValueMetaData = null;
                    for (var i = 0; i < GlobalDefaultValueMetaData.length; i++) {

                        if (GlobalDefaultValueMetaData[i].ServiceId == reqParm.ServiceId) {

                            var oServiceDefaultValueMetaDatas = GlobalDefaultValueMetaData[i].ServiceDefaultValueMetaData;
                     
                            for (var r = 0; r < oServiceDefaultValueMetaDatas.length; r++) {

                                if (reqParm.LoginUserId == oServiceDefaultValueMetaDatas[r].UserId || oServiceDefaultValueMetaDatas[r].UserId == 0) {

                                    var userDefaultValue = oServiceDefaultValueMetaDatas[r].DefaultValueMetaDatas;
                         
                                    for (var z = 0; z < userDefaultValue.length; z++) {
        
                                        if (reqParm.TemplateNodeId == userDefaultValue[z].TemplateNodeId && (userDefaultValue[z].DCPlaceNodeId == "0" || (reqParm.DCPlaceNodeId == userDefaultValue[z].DCPlaceNodeId && reqParm.DCPlaceDimension == userDefaultValue[z].DCPlaceDimension)))
                                        {
                                            _oDefaultValueMetaData = userDefaultValue[z].DefaultValue;      
                                            break;
                                        }
                                    }
                                    if(_oDefaultValueMetaData !=null)
                                       break;
                                }
                            }
                            break;
                        }
                    }
                    OneViewConsole.Debug("GetDefaultValueMetaData End", "DefaultValueComponent.GetDefaultValueMetaData");
                    return _oDefaultValueMetaData;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "DefaultValueComponent.GetDefaultValueMetaData", Excep);
            }
            finally {
                _oDefaultValueMetaData = null;
                oServiceDefaultValueMetaDatas = null;
                userDefaultValue = null;
            }
           
          
        }

        var  GetLastUpdatedAnswer=function(AnswerLst) {
            try {
                OneViewConsole.Debug("GetLastUpdatedAnswer start", "DataCaptureBO.GetLastUpdatedAnswer");
                OneViewConsole.DataLog("AnswerList : " + JSON.stringify(AnswerLst), "DataCaptureBO.GetLastUpdatedAnswer");
                // alert('AnswerLst :' + JSON.stringify(AnswerLst));
                var AnswerObj = AnswerLst[0];
                //  var LastUpdatedDate = AnswerLst[0].LastUpdatedDate;
                var _DateTime = new DateTime();
                var LastUpdatedDate = _DateTime.GetDateByString(AnswerLst[0].LastUpdatedDate);

                if (AnswerLst.length > 1) {
                    for (var i = 0; i < AnswerLst.length; i++) {
                        if (LastUpdatedDate < _DateTime.GetDateByString(AnswerLst[i].LastUpdatedDate)) {
                            LastUpdatedDate = _DateTime.GetDateByString(AnswerLst[i].LastUpdatedDate);
                            AnswerObj = AnswerLst[i];
                        }
                    }
                }
                OneViewConsole.Debug("GetLastUpdatedAnswer end", "DataCaptureBO.GetLastUpdatedAnswer");
                return AnswerObj;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "DefaultValueComponent.GetLastUpdatedAnswer", Excep);
            }
            finally {
                AnswerObj = null;
                LastUpdatedDate = null;
            }
        }

    //TODO : Handle datatype boolean,float etc..   
        this.SetDefaultValueInControls = function (scope, DefaultValue, TemplateNodes, DCDetailFromDBList) {
            try {
                OneViewConsole.Debug("SetDefaultValueInControls Start", "DefaultValueComponent.SetDefaultValueInControls");

                //alert('DefaultValue : ' + JSON.stringify(DefaultValue));
                //DefaultValue = {
                //    "13": { "txtCookedByControlId": { Answer: "EK Chef", AnswerValue: '',       AttributeNodeId: '13', ControlId: "txtCookedByControlId" } },
                //    "10": { "AddlAirlineControlId": { Answer: "EK",      AnswerValue: '3852',   AttributeNodeId: '10', ControlId: "AddlAirlineControlId" } }
                //};

                // alert(JSON.stringify(DefaultValue));

                //for (var itrAttrId in TemplateNodes) {
                //    for (var Key in DefaultValue) {
                //        if (Key == itrAttrId) {
                //            var _oPrimarayAnswerModeInfo = TemplateNodes[itrAttrId].AnswerMode[0];
                //            if (_oPrimarayAnswerModeInfo.Type == 'DDL') {
                //                scope[_oPrimarayAnswerModeInfo.ControlId].Set({ Id: DefaultValue[Key][_oPrimarayAnswerModeInfo.ControlId].AnswerValue, Name: DefaultValue[Key][_oPrimarayAnswerModeInfo.ControlId].Answer, IsDynamicElement: true });
                //            }
                //            else {
                //                scope.NewDCModel[_oPrimarayAnswerModeInfo.ControlId] = DefaultValue[Key][_oPrimarayAnswerModeInfo.ControlId].Answer;
                //            }
                //            break;
                //        }
                //    }
                //}


                /*
                for (var itrAttrId in TemplateNodes) {
                   
                        var _oPrimarayAnswerModeInfo = TemplateNodes[itrAttrId].AnswerMode[0];                       
                        for (var i = 0; i < DefaultValue.length; i++) {
                 
                            if (DefaultValue[i].AttributeNodeId == itrAttrId) {
                                if (_oPrimarayAnswerModeInfo.Type == 'DDL') {
                                   scope[_oPrimarayAnswerModeInfo.ControlId].Set({ Id: DefaultValue[i].AnswerValue, Name: DefaultValue[i].Answer ,IsDynamicElement:true});
                                }
                                else {
                                    //  scope.NewDCModel['NodeId_' + itrAttrId] = DefaultValue[i].Answer;
                                    scope.NewDCModel[_oPrimarayAnswerModeInfo.ControlId] = DefaultValue[i].Answer;
                                }
                            }
                        }
                        
                    }
                */


                for (var itrAttrId in TemplateNodes) {
                    var IsAnswerExists = this.CheckAnswerExists(itrAttrId, TemplateNodes[itrAttrId].AnswerMode[0].ControlId, DCDetailFromDBList);
                   // alert('IsAnswerExists' + IsAnswerExists);
                    if (IsAnswerExists == false) {
                        for (var Key in DefaultValue) {
                            if (Key == itrAttrId) {
                                var _oPrimarayAnswerModeInfo = TemplateNodes[itrAttrId].AnswerMode[0];
                                // alert(_oPrimarayAnswerModeInfo.ControlId)
                                //alert(DefaultValue[Key][_oPrimarayAnswerModeInfo.ControlId].Answer);
                                if (_oPrimarayAnswerModeInfo.Type == 'DDL') {
                                    scope[_oPrimarayAnswerModeInfo.ControlId].Set({ Id: DefaultValue[Key][_oPrimarayAnswerModeInfo.ControlId].Answer, Name: DefaultValue[Key][_oPrimarayAnswerModeInfo.ControlId].AnswerValue, IsDynamicElement: false });
                                }
                                else if (_oPrimarayAnswerModeInfo.Type == 'Band') {

                                    if ((_oPrimarayAnswerModeInfo.BandInfo[DefaultValue[Key][_oPrimarayAnswerModeInfo.ControlId].Answer] != "") && (_oPrimarayAnswerModeInfo.BandInfo[DefaultValue[Key][_oPrimarayAnswerModeInfo.ControlId].Answer] != undefined)) {
                                        var Colour = _oPrimarayAnswerModeInfo.BandInfo[DefaultValue[Key][_oPrimarayAnswerModeInfo.ControlId].Answer];                                       
                                        if (_oPrimarayAnswerModeInfo.IsStaticDataSource != undefined && _oPrimarayAnswerModeInfo.IsStaticDataSource == true) {
                                            scope[_oPrimarayAnswerModeInfo.ControlId].Set({ Id: DefaultValue[Key][_oPrimarayAnswerModeInfo.ControlId].Answer, Name: DefaultValue[Key][_oPrimarayAnswerModeInfo.ControlId].Answer, ColourIndex: Colour.ColourIndex, selected: true });
                                        }

                                        else {
                                            scope[_oPrimarayAnswerModeInfo.ControlId].Set({ Id: DefaultValue[Key][_oPrimarayAnswerModeInfo.ControlId].Answer, Name: DefaultValue[Key][_oPrimarayAnswerModeInfo.ControlId].AnswerValue, ColourIndex: Colour.ColourIndex, selected: true });
                                        }
                                    }
                                }
                                else if (_oPrimarayAnswerModeInfo.Type == "TIME") {

                                    if (DefaultValue[Key][_oPrimarayAnswerModeInfo.ControlId].Answer != "") {

                                        scope.NewDCModel[_oPrimarayAnswerModeInfo.ControlId + "_DateTime"] = DefaultValue[Key][_oPrimarayAnswerModeInfo.ControlId].Answer;


                                        if (document.getElementById(_oPrimarayAnswerModeInfo.ControlId) != null) {
                                            document.getElementById(_oPrimarayAnswerModeInfo.ControlId).value = DefaultValue[Key][_oPrimarayAnswerModeInfo.ControlId].Answer.split(" ")[1]; //take time 
                                            scope.NewDCModel[_oPrimarayAnswerModeInfo.ControlId] = document.getElementById(_oPrimarayAnswerModeInfo.ControlId).value;
                                        }
                                        scope.$apply();
                                    }
                                }
                                else if (_oPrimarayAnswerModeInfo.Type == "DATETIMELOCAL") {
                                    if (DefaultValue[Key][_oPrimarayAnswerModeInfo.ControlId].Answer != "") {
                                        //  alert("DefaultValue[Key][_oPrimarayAnswerModeInfo.ControlId].Answer : " + new DateTime().GetDateByString(DefaultValue[Key][_oPrimarayAnswerModeInfo.ControlId].Answer) + " : " + DefaultValue[Key][_oPrimarayAnswerModeInfo.ControlId].Answer);
                                        scope.NewDCModel[_oPrimarayAnswerModeInfo.ControlId] = new DateTime().GetDateByString(DefaultValue[Key][_oPrimarayAnswerModeInfo.ControlId].Answer);
                                    }
                                }
                                else if (_oPrimarayAnswerModeInfo.Type == "DATE") {
                                    var date = DefaultValue[Key][_oPrimarayAnswerModeInfo.ControlId].Answer;
                                   
                                    if (date != "") {
                                        date = date.split('-');
                                        scope.NewDCModel[_oPrimarayAnswerModeInfo.ControlId] = new Date(date[2], date[1] - 1, date[0]);
                                        scope.$apply();
                                    }
                                }
                                else {
                                    if (_oPrimarayAnswerModeInfo.DataType == "FLOAT") {
                                        if (DefaultValue[Key][_oPrimarayAnswerModeInfo.ControlId].Answer == "") {
                                            scope.NewDCModel[_oPrimarayAnswerModeInfo.ControlId] = DefaultValue[Key][_oPrimarayAnswerModeInfo.ControlId].Answer;
                                        }
                                        else {
                                            scope.NewDCModel[_oPrimarayAnswerModeInfo.ControlId] = parseFloat(DefaultValue[Key][_oPrimarayAnswerModeInfo.ControlId].Answer);
                                        }
                                    }
                                    else {
                                        scope.NewDCModel[_oPrimarayAnswerModeInfo.ControlId] = DefaultValue[Key][_oPrimarayAnswerModeInfo.ControlId].Answer;
                                    }
                                    scope.$apply();
                                    //alert('here:'+ scope.NewDCModel[_oPrimarayAnswerModeInfo.ControlId]);
                                }
                                break;
                            }
                        }
                    }
                }
                OneViewConsole.Debug("SetDefaultValueInControls End", "DefaultValueComponent.SetDefaultValueInControls");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "DefaultValueComponent.SetDefaultValueInControls", Excep);
            }
            finally {
                _oPrimarayAnswerModeInfo = null;
            }
        }
 
        this.CheckAnswerExists = function (AttributeNodeId, ControlId, DCDetailFromDBList) {
            try {
                OneViewConsole.Debug("CheckAnswerExists Start", "DefaultValueComponent.CheckAnswerExists");
                var IsExists = false;
                if (DCDetailFromDBList != null && DCDetailFromDBList != undefined && DCDetailFromDBList != '') {
                    var AttributeAnswers = DCDetailFromDBList.AttributeAnswers[AttributeNodeId];
                    if (AttributeAnswers != undefined) {
                        if (AttributeAnswers[ControlId] != undefined) {
                            var AnswerList = AttributeAnswers[ControlId];
                            //TODO:This logic may change,need remove coupling between this logic (for ex:Clinet need his own data to view),now couple with LastUpdated Answer

                            var AnswerToBind = GetLastUpdatedAnswer(AnswerList);
                            if (AnswerToBind.Answer != '' && AnswerToBind.Answer != null && AnswerToBind.Answer != undefined) {
                                IsExists = true;
                            }
                        }
                    }
                }
                OneViewConsole.Debug("CheckAnswerExists End", "DefaultValueComponent.CheckAnswerExists");
                return IsExists;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "DefaultValueComponent.CheckAnswerExists", Excep);
            }
            finally {
            }
        }
}
