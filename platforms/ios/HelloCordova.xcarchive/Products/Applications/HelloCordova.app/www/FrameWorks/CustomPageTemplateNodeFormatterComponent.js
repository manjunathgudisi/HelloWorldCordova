
///Convert TemplateNode Format into flat format

function CustomPageTemplateNodeFormatterComponent() {
    var MyInstance = this;
    var _oBandConverterBO = new BandConverterBO();
    //Format TemplateNodes
    this.FormatTemplateNodeNewStructure = function (TemplateNodes) {
        try {           
            var FormattedTemplate = {};          
            //var TemplateMeta = TemplateNodes.Childs;
            //for (var Key in TemplateMeta) {
            //    //If TemplateNode is a AttributeGroupMaster then check with child node
            //    if (TemplateMeta[Key].DATEntityType == DATEntityType.AttributeGroup_Master) {
            //        CheckChildNodes(TemplateMeta[Key].Childs, FormattedTemplate);
            //    }
            //        //If TemplateNode is a Attribute_Master convert to flatformat
            //    else {
            //        TemplateNodeFormatter(TemplateMeta[Key], FormattedTemplate);
            //    }
            //}

            MyInstance.NewFormatter(FormattedTemplate, TemplateNodes);

           // alert('FormattedTemplate' + JSON.stringify(FormattedTemplate));

            return FormattedTemplate;

        }
        catch (Excep) {
            //  alert('FormatTemplateNodeNewStructure :' + JSON.stringify(Excep) + "," + Excep)
            throw oOneViewExceptionHandler.Create("BO", "CustomPageTemplateNodeFormatterComponent.FormatTemplateNodeNewStructure", Excep);
        }

    }


    //Format TemplateNodes
    this.FormatTemplateNode = function (TemplateNodes) {
        try {
            var FormattedTemplate = {};
            var TemplateMeta = TemplateNodes.Childs;
            for (var Key in TemplateMeta) {
                //If TemplateNode is a AttributeGroupMaster then check with child node
                if (TemplateMeta[Key].DATEntityType == DATEntityType.AttributeGroup_Master) {
                    CheckChildNodes(TemplateMeta[Key].Childs, FormattedTemplate);
                }
                    //If TemplateNode is a Attribute_Master convert to flatformat
                else {
                    TemplateNodeFormatter(TemplateMeta[Key], FormattedTemplate);
                }
            }

         
            return FormattedTemplate;

        }
        catch (Excep) {
            //  alert('FormatTemplateNode :' + JSON.stringify(Excep) + "," + Excep)
            throw oOneViewExceptionHandler.Create("BO", "CustomPageTemplateNodeFormatterComponent.FormatTemplateNode", Excep);
        }

    }
    //Check child node with AttributeGroupMaster and convert to flatformat
    var CheckChildNodes = function (TemplateMetaData, FormattedTemplate) {
        try {
            for (var Key in TemplateMetaData) {
                if (TemplateMetaData[Key].DATEntityType == DATEntityType.AttributeGroup_Master) {
                    CheckChildNodes(TemplateMetaData[Key].Childs, FormattedTemplate);
                }
                else {
                    TemplateNodeFormatter(TemplateMetaData[Key], FormattedTemplate);
                }
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "CustomPageTemplateNodeFormatterComponent.CheckChildNodes", Excep);
        }
    }
    //TemplateNode Formatter
    var TemplateNodeFormatter = function (TemplateData, FormattedTemplate) {
        try {
            var LocalFormattedTemplate = {};
       
            //Grid["Id"] = TemplateData.Id;
            // Grid["DATEntityType"] = TemplateData.DATEntityType;
            if (JSON.stringify(TemplateData) != undefined){  
                LocalFormattedTemplate["Name"] = TemplateData.Name;
                LocalFormattedTemplate["AnswerMode"] = TemplateData.AnswerMode;
                LocalFormattedTemplate["DATEntityType"] = TemplateData.DATEntityType;
                LocalFormattedTemplate["Id"] = TemplateData.Id;
                FormattedTemplate[TemplateData.Id] = LocalFormattedTemplate;
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "CustomPageTemplateNodeFormatterComponent.TemplateNodeFormatter", Excep);
        }
    }


    this.NewFormatter = function (FormattedTemplate, TemplateNodes) {
        try {
            //TemplateMetaData_Test
            //alert('TemplateMetaData :' + TemplateMetaData);           


            if (TemplateNodes.TemplateConfigMetaDataDetails.IsAttributeGroup == true) {
                var ChildList = TemplateNodes.TemplateConfigMetaDataDetails.Childs;
                for (var i = 0; i < ChildList.length ; i++) {
                    var Child = ChildList[i];
                    FormatChilds(Child, FormattedTemplate);
                }
            }


            return FormattedTemplate;

        }
        catch (Excep) {
            //alert('NewFormatter :' + JSON.stringify(Excep) + "," + Excep)
            throw oOneViewExceptionHandler.Create("BO", "CustomPageTemplateNodeFormatterComponent.NewFormatter", Excep);
        }

    }


    var FormatChilds = function (Child, FormattedTemplate) {
        try {
            var SubChildList = Child.Childs;
            if (Child.IsAttributeGroup == true) {
                for (var j = 0; j < SubChildList.length; j++) {
                    FormatChilds(SubChildList[j]);
                }
            }
            else {
                FormatTemplateMetadata(Child, FormattedTemplate);
            }
        }
        catch (Excep) {
           // alert('FormatChilds :' + JSON.stringify(Excep) + "," + Excep)
             throw oOneViewExceptionHandler.Create("BO", "CustomPageTemplateNodeFormatterComponent.FormatChilds", Excep);
        }
    }

    var FormatTemplateMetadata = function (TemplateData, FormattedTemplate) {
        try {
            var LocalFormattedTemplate = {};

            if (JSON.stringify(TemplateData) != undefined) {
                LocalFormattedTemplate["Name"] = TemplateData.Name;

                for (var k = 0; k < TemplateData.AnswerModes.length; k++) {
                    if (TemplateData.AnswerModes[k].Type == "DCTextBoxControlConfig") {
                        TemplateData.AnswerModes[k].Type = "TEXTBOX";
                        TemplateData.AnswerModes[k].DataType = "STRING";

                    }

                    else if (TemplateData.AnswerModes[k].Type == "DCAutoTemperatureControlConfig") {
                        TemplateData.AnswerModes[k].Type = "AUTOTEMPERATURE";
                        TemplateData.AnswerModes[k].DataType = "FLOAT";
                    }

                    else if (TemplateData.AnswerModes[k].Type == "DCListViewControlConfig") {

                        if (TemplateData.AnswerModes[k].ListViewDataSourceConfig.Type == "DefaultTreeListViewDataSourceConfig" && TemplateData.AnswerModes[k].ListViewDisplay == 6) {
                            TemplateData.AnswerModes[k].Type = "ScrollList";
                            TemplateData.AnswerModes[k].DataType = "INTEGER";

                        }
                        else if (TemplateData.AnswerModes[k].ListViewDataSourceConfig.Type == "DefaultTreeListViewDataSourceConfig") {//(TemplateData.AnswerModes[k].ListViewDisplay == 3) {
                            //DDL
                            TemplateData.AnswerModes[k].Type = "DDL";
                            TemplateData.AnswerModes[k].DataType = "INTEGER";
                        }
                        else if (TemplateData.AnswerModes[k].ListViewDataSourceConfig.Type == "BandListViewDataSourceConfig" && TemplateData.AnswerModes[k].ListViewDisplay == 2) {

                            //Multi selection checkbox
                            if (TemplateData.AnswerModes[k].SelectionType == 1) {

                                //Band Dict creation code     
                                if (TemplateData.AnswerModes[k].ListViewDataSourceConfig.BandId != "" && TemplateData.AnswerModes[k].ListViewDataSourceConfig.BandId != null
                                    && TemplateData.AnswerModes[k].ListViewDataSourceConfig.BandId != undefined && TemplateData.AnswerModes[k].ListViewDataSourceConfig.BandId != 0) {

                                    TemplateData.AnswerModes[k].DataType = "INTEGER";
                                    _oBandConverterBO.CreateBandDetails(TemplateData.AnswerModes[k].ListViewDataSourceConfig.BandId);

                                    TemplateData.AnswerModes[k].BandInfo = Band[TemplateData.AnswerModes[k].ListViewDataSourceConfig.BandId];
                                }
                            }
                        }
                        else if (TemplateData.AnswerModes[k].ListViewDataSourceConfig.Type == "BandListViewDataSourceConfig") {//if (TemplateData.AnswerModes[k].ListViewDisplay == 0) {
                            //Band
                            //Band Dict creation code     
                            if (TemplateData.AnswerModes[k].ListViewDataSourceConfig.BandId != "" && TemplateData.AnswerModes[k].ListViewDataSourceConfig.BandId != null
                                && TemplateData.AnswerModes[k].ListViewDataSourceConfig.BandId != undefined && TemplateData.AnswerModes[k].ListViewDataSourceConfig.BandId != 0) {

                                _oBandConverterBO.CreateBandDetails(TemplateData.AnswerModes[k].ListViewDataSourceConfig.BandId);
                                TemplateData.AnswerModes[k].BandInfo = Band[TemplateData.AnswerModes[k].ListViewDataSourceConfig.BandId];

                            }
                            TemplateData.AnswerModes[k].DataType = "INTEGER";
                            //TemplateData.AnswerModes[k].BandInfo = Band[TemplateData.AnswerModes[k].ListViewDataSourceConfig.BandId];
                            if (TemplateData.AnswerModes[k].ListViewDataSourceConfig != null) {

                                if (TemplateData.AnswerModes[k].SelectionType == 0 || TemplateData.AnswerModes[k].SelectionType == 'SINGLE') {
                                    TemplateData.AnswerModes[k].Type = "Band";
                                    TemplateData.AnswerModes[k].SelectionType = 'SINGLE';
                                    // TemplateData.AnswerModes[k].BandInfo = Band[TemplateData.AnswerModes[k].ListViewDataSourceConfig.BandId]
                                }
                                else if (TemplateData.AnswerModes[k].SelectionType == 1 || TemplateData.AnswerModes[k].SelectionType == 'MULTI') {
                                    TemplateData.AnswerModes[k].SelectionType = 'MULTI';
                                }

                            }

                        }
                        else if (TemplateData.AnswerModes[k].ListViewDisplay == 2) {
                            //CHECKBOX
                            TemplateData.AnswerModes[k].Type = "CHECKBOX";
                            TemplateData.AnswerModes[k].DataType = "BOOLEAN";
                        }
                    }

                    else if (TemplateData.AnswerModes[k].Type == "DCDateTimeControlConfig") {

                        if (TemplateData.AnswerModes[k].DCDateTimeType == 0) {
                            //DateTime
                            TemplateData.AnswerModes[k].Type = "DATETIMELOCAL";
                            TemplateData.AnswerModes[k].DataType = "DATETIMELOCAL";
                        }

                        else if (TemplateData.AnswerModes[k].DCDateTimeType == 1) {
                            //Date
                            TemplateData.AnswerModes[k].Type = "DATE";
                            TemplateData.AnswerModes[k].DataType = "DATE";
                        }

                        else if (TemplateData.AnswerModes[k].DCDateTimeType == 2) {
                            //Time
                            TemplateData.AnswerModes[k].Type = "TIME";
                            TemplateData.AnswerModes[k].DataType = "TIME";
                        }

                        else if (TemplateData.AnswerModes[k].DCDateTimeType == 3) {
                            //MonthYear                          
                            TemplateData.AnswerModes[k].Type = "MonthYear";
                            TemplateData.AnswerModes[k].DataType = "MonthYear";
                        }
                    }

                    else if (TemplateData.AnswerModes[k].Type == "DCNumericTextBoxControlConfig") {
                        TemplateData.AnswerModes[k].Type = "TEXTBOX";
                       // TemplateData.AnswerModes[k].DataType = "INTEGER";
                    }

                    else if (TemplateData.AnswerModes[k].Type == "DCSignaturePadControlConfig") {
                        TemplateData.AnswerModes[k].Type = "SignaturePad";
                        TemplateData.AnswerModes[k].DataType = "DATAURL";
                    }

                    else if (TemplateData.AnswerModes[k].Type == "DCImageCaptureControlConfig") {
                        TemplateData.AnswerModes[k].Type = "DCImageCaptureControlConfig";
                        TemplateData.AnswerModes[k].DataType = "STRING";

                        if (TemplateData.AnswerModes[k].SelectionType == 0 || TemplateData.AnswerModes[k].SelectionType == 'SINGLE') {                            
                            TemplateData.AnswerModes[k].SelectionType = 0;
                        }
                        else if (TemplateData.AnswerModes[k].SelectionType == 1 || TemplateData.AnswerModes[k].SelectionType == 'MULTI') {
                            //alert('DCImageCaptureControlConfig SelectionType = ' + TemplateData.AnswerModes[k].SelectionType + ', Not Implemented Exception.');
                            TemplateData.AnswerModes[k].SelectionType = 1;
                        }
                       
                    }

                    

                }

                
                LocalFormattedTemplate["AnswerMode"] = TemplateData.AnswerModes;
                LocalFormattedTemplate["DATEntityType"] = DATEntityType.Attribute_Master //8;// ToDo : changed took from Dat entity should come from server
                LocalFormattedTemplate["Id"] = TemplateData.Id;
                FormattedTemplate[TemplateData.Id] = LocalFormattedTemplate;
            }
        }
        catch (Excep) {
           // alert('FormatTemplateMetadata :' + JSON.stringify(Excep) + "," + Excep)
             throw oOneViewExceptionHandler.Create("BO", "CustomPageTemplateNodeFormatterComponent.FormatTemplateMetadata", Excep);
        }
    }
}




				
				
				
				


