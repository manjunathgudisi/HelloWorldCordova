

MyApp.controller('CreateTestDcController',
    function ($scope) {
        $scope.NewDcModel = {};

        $scope.UserList = [
                                            { Id: 4, Name: 'fsa1' },
                                            { Id: 5, Name: 'fsa2' },
                                            { Id: 6, Name: 'fsa3' }
        ];

        $scope.TemplateList = [
                                    { Id: 2, Name: 'Cooking and Blast chilling Monitoring' },
                                    { Id: 3, Name: 'Cooking and Blast chilling Verification' },
                                    { Id: 44, Name: 'Goods Receiving And Temperature Verification Records' }
        ];

        $scope.PlaceList = [
                                 { Id: 2, Name: 'EKFC1' },
                                 { Id: 3, Name: 'EKFC2' }
        ];

        $scope.CreateDc = function () {
            try {
                var oCreateTestDcFacade = new CreateTestDcFacade();

                var DcNumber = $scope.NewDcModel.NumberOfDc;

                var User = {
                    Id: $scope.NewDcModel.ddlUser.Id,
                    Name: $scope.NewDcModel.ddlUser.Name
                };

                var Template = {
                    Id: $scope.NewDcModel.ddlTemplate.Id,
                    Name: $scope.NewDcModel.ddlTemplate.Name
                };

                var Place = {
                    Id: $scope.NewDcModel.ddlPlace.Id,
                    Name: $scope.NewDcModel.ddlPlace.Name
                };

                var IsCompleted = $scope.NewDcModel.chkCompleted;
                ///alert("IsCompleted=" + IsCompleted);
                if (IsCompleted == undefined || IsCompleted == "")
                {
                    IsCompleted = false;
                }
               /// alert("After IsCompleted=" + IsCompleted);
                oCreateTestDcFacade.CreateDcTest(DcNumber, User, Template, Place, IsCompleted);

                var _oDbStructureDAO = new DbStructureDAO();
                _oDbStructureDAO.CopyDb();

                alert('In Copy Db End');
            }
            catch (Excep) {
                alert("CreateTestDcController.CreateDc" + Excep);
            }

        };


    }
);



function CreateTestDcFacade() {

    var MyInstance = this;
    this.CreateDcTest = function (NoOfDc, User, Template, Place, IsCompleted) {
        try {
            alert('Create Start');
            var _oDcDAO = new DcDAO();
            var count=0;
            var TemplateNodes = TemplateMetaData[1][Template.Id];
            var IsCreatedAll = false;
            var DcList = new Array();
            for (var i = 0; i < NoOfDc; i++) {
                
                var _oDataCaptureEntity = MyInstance.GetCompleteDataCaptureEntity(User, Template, Place, IsCompleted, TemplateNodes);
                //alert("GetCompleteDataCaptureEntity = " + JSON.stringify(_oDataCaptureEntity));
                //IsCreatedAll = _oDcDAO.Create(_oDataCaptureEntity);
                //if (IsCreatedAll == true)
                //    count++;

                DcList[i] = _oDataCaptureEntity;
                //alert("DcList = " +JSON.stringify(DcList[i]));
            }

            //(JSON.stringify(DcList));
           
            IsCreatedAll = _oDcDAO.InsertDCListForDCCreationTool(DcList);

             if (IsCreatedAll == true)
                alert('Create Successful');

            else
                alert('Create Failed');
        }

        catch (e) {
            alert("Test DCDAO.Create ,Exception     :" + e);
        }

    }


    this.GetCompleteDataCaptureEntity = function (User, Template, Place, IsCompleted, TemplateNodes) {
        try {
          //  alert(JSON.stringify(TemplateNodes));

            // alert('In GetCompleteDataCaptureEntity ');
            var oDateTime = new DateTime();
            var CurrenntDateAndTime = oDateTime.GetDateAndTime();

            //take  DataCaptureEntity
            var _oDataCaptureEntity = MyInstance.GetDataCaptureEntity(CurrenntDateAndTime, Template, Place, IsCompleted);
            //alert(JSON.stringify(_oDataCaptureEntity));

            //take  DCResultsEntity
            var _oDCResultsEntity = MyInstance.GetDCResultsEntity(CurrenntDateAndTime, User);
           // alert(JSON.stringify("_oDCResultsEntity=" +JSON.stringify(_oDCResultsEntity)));

            var _oDcResultDetailsEntityList;
            //take  DcResultDetailsEntityList
            if (Template.Id == 2) {
                _oDcResultDetailsEntityList = MyInstance.GetDcResultDetailsEntityForMonitoring(TemplateNodes, CurrenntDateAndTime);

                //alert("_oDcResultDetailsEntityList =" + JSON.stringify(_oDcResultDetailsEntityList));
            }
                /////call Monitoring
            else if (Template.Id == 3)
                _oDcResultDetailsEntityList = MyInstance.GetDcResultDetailsEntityForVerification(TemplateNodes, CurrenntDateAndTime);
                /////call Verification
            else if (Template.Id == 44)
                _oDcResultDetailsEntityList = MyInstance.GetDcResultDetailsEntityForGoodReceipts(TemplateNodes, CurrenntDateAndTime);


            for (var i = 0; i < _oDcResultDetailsEntityList.length; i++) {
                _oDCResultsEntity.DcResultDetailsEntityList[i] = _oDcResultDetailsEntityList[i];
               
            }
            //alert(_oDCResultsEntity.DcResultDetailsEntityList.length);
            //Code moved to SaveDC Faced,to make validation easy
            _oDataCaptureEntity.DcResultsEntitylist[0] = _oDCResultsEntity;
            ///  alert(" _oDataCaptureEntity.DcResultsEntitylist[0] =" + JSON.stringify(_oDataCaptureEntity.DcResultsEntitylist[0]));

            //   MyInstance.CreateDynamicElements(_oDcResultDetailsEntityList);

            // MyInstance.SetCompletedStatus(_oDataCaptureEntity);
            //sMyInstance.SetShift(_oDataCaptureEntity);

          
            return _oDataCaptureEntity;
        }

        catch (Excep) {

            alert("BO DataCaptureBO.GetCompleteDataCaptureEntity", Excep);
        }
    }

    this.GetDataCaptureEntity = function (CurrenntDateAndTime, Template, Place, IsCompleted) {
        try {
            var _DataCaptureEntity = new DataCaptureEntity();

            _DataCaptureEntity.OVGuid = "";
            _DataCaptureEntity.ServerId = 0;
            _DataCaptureEntity.ServiceId = '1';
            _DataCaptureEntity.ServiceName = 'Food Safty service';
            _DataCaptureEntity.ClientGuid = OneViewUniqueGenerator.GetGuid();

            //we are not updating DcProfileId,as per discussion,plan to remove this column
            _DataCaptureEntity.DcProfileId = 0;
            _DataCaptureEntity.TemplateNodeId = Template.Id;
            _DataCaptureEntity.TemplateNodeName = Template.Name;

            _DataCaptureEntity.DcPlaceDimension = DATEntityType.OrganizationAssestsNode;// TODO : Need to access from session
            _DataCaptureEntity.DcPlaceId = Place.Id;
            _DataCaptureEntity.DcPlaceName = Place.Name;

            _DataCaptureEntity.IsCompleted = IsCompleted;

            _DataCaptureEntity.DcStartDate = CurrenntDateAndTime;
            _DataCaptureEntity.CreatedDate = CurrenntDateAndTime;
            _DataCaptureEntity.LastsyncDate = ""

            _DataCaptureEntity.IsSubmit = "false";
            _DataCaptureEntity.SubmitDate = "";
            _DataCaptureEntity.ApprovalStatus = oDCApprovalStatusEnum.NONE;
            _DataCaptureEntity.ApprovalStatusDate = "";
            _DataCaptureEntity.IsSynchronized = "false";

            return _DataCaptureEntity;
        }
        catch (Excep) {
            //  alert('GetDCResultsEntity :' + Excep);
            oOneViewExceptionHandler.Create("BO", "DataCaptureBO.GetDCResultsEntity", Excep);
        }
    }

    this.GetDCResultsEntity = function (CurrenntDateAndTime, User) {
        try {
            var _DcResultsEntity = new DcResultsEntity();

            _DcResultsEntity.ServiceId = '1';

            _DcResultsEntity.ClientGuid = OneViewUniqueGenerator.GetGuid();

            _DcResultsEntity.MobileVersionId = 1;

            _DcResultsEntity.SystemUserId = User.Id;

            _DcResultsEntity.AnonymousUserId = 0;
            _DcResultsEntity.UserName = User.Name;

            _DcResultsEntity.StartDate = CurrenntDateAndTime;
            _DcResultsEntity.LastSyncDate = "";
            _DcResultsEntity.TotalTimeForDc = "";

            //if ( (ShiftInfo !=null || ShiftInfo !=undefined) && (ShiftInfo.ShiftId != null || ShiftInfo.ShiftId != undefined)) {
            //    _DcResultsEntity.ShiftId = ShiftInfo.ShiftId;
            //    _DcResultsEntity.ShiftName = ShiftInfo.ShiftName;
            //}

            _DcResultsEntity.ShiftId = 1;
            _DcResultsEntity.ShiftName = 'A';

            _DcResultsEntity.IsSynchronized = "false";
            _DcResultsEntity.CreatedDate = CurrenntDateAndTime;
            _DcResultsEntity.LastUpdatedDate = CurrenntDateAndTime;
            _DcResultsEntity.OVGuid = "";


            return _DcResultsEntity;
        }

        catch (Excep) {

            //  alert('GetDCResultsEntity :' +Excep);
            alert("BO DataCaptureBO.GetDCResultsEntity", Excep);
        }
    }

    this.GetDcResultDetailsEntityForMonitoring = function (TemplateNodes, CurrenntDateAndTime, DCId, DcResultId) {
        try {

            var _oDateTime = new DateTime();
            var time = _oDateTime.GetHoursAndMinutes();

            var DCResultDetails = [];
            for (var itrAttrId in TemplateNodes) {
                var _oAttributeInfo = TemplateNodes[itrAttrId];

                for (var _oPrimarayAnswerModeInfo in _oAttributeInfo.AnswerMode) {
                    //alert(typeof (_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo]));
                    //alert(hasown (_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo]));

                    if (typeof (_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo]) != 'function') {

                        //alert(_oPrimarayAnswerModeInfo);
                        var AttributeNodeId = itrAttrId;
                        var AttributeNodeName = _oAttributeInfo.Name;
                        var Answer = '';
                        //if answer mode is ddl,value will save here, for text box and other make it null
                        var AnswerValue = '';
                        var AnswerFKType = ''
                        var AnswerMode = '';
                        //IsDynamicElement=true => if answer mode is ddl and enter new element which is not in the drop dowen list
                        var IsDynamicAnswer = 'false';

                        ////for dropdowen,auto complete
                        //if (_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].Type == 'DDL') {
                        //    if ($scope[_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].ControlId].GetSelectedText() == undefined) {
                        //        Answer = '';
                        //        AnswerValue = '';
                        //    }
                        //    else {
                        //        Answer = $scope[_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].ControlId].GetSelectedValue();
                        //        AnswerValue = $scope[_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].ControlId].GetSelectedText();
                        //    }
                        //    AnswerFKType = $scope[_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].ControlId].GetDATEntityTypeId();
                        //    AnswerMode = 'DDL';//$scope[_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].ControlId].GetControlType();
                        //    if ((Answer == 0 || Answer == '0') && (AnswerValue != ''))
                        //        IsDynamicAnswer = 'true';

                        //}
                        //else {
                        //    //Answer = $scope.NewDCModel['NodeId_' + itrAttrId];
                        //    Answer = $scope.NewDCModel[_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].ControlId];
                        //}




                        var _DcResultDetailsEntity = new DcResultDetailsEntity();

                        _DcResultDetailsEntity.ServiceId = '1';

                        _DcResultDetailsEntity.ClientGuid = OneViewUniqueGenerator.GetGuid();
                        _DcResultDetailsEntity.MobileVersionId = 1;

                        _DcResultDetailsEntity.StartDate = CurrenntDateAndTime;

                        _DcResultDetailsEntity.AttributeNodeId = AttributeNodeId;

                        _DcResultDetailsEntity.ControlId = _oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].ControlId;

                        _DcResultDetailsEntity.AttributeNodeName = AttributeNodeName;
                        _DcResultDetailsEntity.OVGuid = "";
                        //if (_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].DataType == "BOOLEAN") {
                        //    if (Answer == true || Answer == "true") {
                        //        Answer = '1';
                        //    }
                        //    else {
                        //        Answer = "0";
                        //    }
                        //}

                        if (AttributeNodeId == '4')//product
                        {
                            _DcResultDetailsEntity.Answer = '19';
                            _DcResultDetailsEntity.AnswerValue = 'Lamb fry';

                            _DcResultDetailsEntity.AnswerFKType = '35';
                            _DcResultDetailsEntity.AnswerMode = 'DDL';
                        }

                        else if (AttributeNodeId == '5')//product type
                        {
                            _DcResultDetailsEntity.Answer = '18';
                            _DcResultDetailsEntity.AnswerValue = 'Meat';

                            _DcResultDetailsEntity.AnswerFKType = '34';
                            _DcResultDetailsEntity.AnswerMode = 'DDL';
                        }


                        else if (AttributeNodeId == '6')//p
                        {
                            _DcResultDetailsEntity.Answer = '1';
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }


                        else if (AttributeNodeId == '7')//g
                        {
                            _DcResultDetailsEntity.Answer = '1';
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }

                        else if (AttributeNodeId == '8')//r
                        {
                            _DcResultDetailsEntity.Answer = '1';
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }

                        else if (AttributeNodeId == '9')//s
                        {
                            _DcResultDetailsEntity.Answer = '0';
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }

                        else if (AttributeNodeId == '10')//Airline
                        {
                            _DcResultDetailsEntity.Answer = '56';
                            _DcResultDetailsEntity.AnswerValue = 'EK1012';

                            _DcResultDetailsEntity.AnswerFKType = '33';
                            _DcResultDetailsEntity.AnswerMode = 'DDL';
                        }

                        else if (AttributeNodeId == '11')//CoreTemp
                        {
                            _DcResultDetailsEntity.Answer = '86';
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }

                        else if (AttributeNodeId == '12')//CookingTime
                        {
                            _DcResultDetailsEntity.Answer = time;
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }

                        else if (AttributeNodeId == '13')//CookedBy
                        {
                            _DcResultDetailsEntity.Answer = 'Kate';
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }

                        else if (AttributeNodeId == '14')//PreChillerTimeIn
                        {
                            _DcResultDetailsEntity.Answer = time;
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }

                        else if (AttributeNodeId == '15')//PreChillerTempIn
                        {
                            _DcResultDetailsEntity.Answer = '85';
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }

                        else if (AttributeNodeId == '16')//PreChillerTimeOut
                        {
                            _DcResultDetailsEntity.Answer = time;
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }

                        else if (AttributeNodeId == '17')//PreChillerTempOut
                        {
                            _DcResultDetailsEntity.Answer = '85';
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }

                        else if (AttributeNodeId == '18')//BlastChillerNo
                        {
                            _DcResultDetailsEntity.Answer = '71';
                            _DcResultDetailsEntity.AnswerValue = 'chiller-05';

                            _DcResultDetailsEntity.AnswerFKType = '32';
                            _DcResultDetailsEntity.AnswerMode = 'DDL';
                        }

                        else if (AttributeNodeId == '19')//BlastChillerTimeIn
                        {
                            _DcResultDetailsEntity.Answer = time;
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }

                        else if (AttributeNodeId == '20')//BlastChillerTempIn
                        {
                            _DcResultDetailsEntity.Answer = '84';
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }
                        else if (AttributeNodeId == '21')//BlastChillerTimeOut
                        {
                            _DcResultDetailsEntity.Answer = time;
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }
                        else if (AttributeNodeId == '22')//BlastChillerTempOut
                        {
                            _DcResultDetailsEntity.Answer = '6';
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }
                        else if (AttributeNodeId == '23')//Comment
                        {
                            _DcResultDetailsEntity.Answer = '1';
                            _DcResultDetailsEntity.AnswerValue = 'Its Correct';

                            _DcResultDetailsEntity.AnswerFKType = '36';
                            _DcResultDetailsEntity.AnswerMode = 'DDL';
                        }


                        _DcResultDetailsEntity.IsManual = "true";

                        _DcResultDetailsEntity.IsSynchronized = "false";
                        _DcResultDetailsEntity.CreatedDate = CurrenntDateAndTime;

                        //_DcResultDetailsEntity.Comments = "";
                        ///_DcResultDetailsEntity.AnswerDataType = _oPrimarayAnswerModeInfo.DataType;
                        _DcResultDetailsEntity.AnswerDataType = _oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].DataType;
                        _DcResultDetailsEntity.IsDynamicAnswer = IsDynamicAnswer;


                        DCResultDetails.push(_DcResultDetailsEntity);

                        //DCResultDetails.push({
                        //    "AttributeNodeId": AttributeNodeId,
                        //    "AttributeNodeName": AttributeNodeName,
                        //    "Answer": Answer,
                        //    "AnswerValue": AnswerValue,
                        //    "IsDynamicAnswer": true,
                        //    "AnswerFKType": _oPrimarayAnswerModeInfo.EntityName,
                        //    "AnswerDataType": _oPrimarayAnswerModeInfo.DataType
                        //});

                        //return DCResultDetails;
                    }
                }

            }
            return DCResultDetails;

        }
        catch (excep) {
            alert(' GetDCResultDetailsForSave : ' + excep);
        }

    }

    this.GetDcResultDetailsEntityForVerification = function (TemplateNodes, CurrenntDateAndTime, DCId, DcResultId) {
        try {

            var _oDateTime = new DateTime();
            var time = _oDateTime.GetHoursAndMinutes();

            var DCResultDetails = [];
            for (var itrAttrId in TemplateNodes) {
                var _oAttributeInfo = TemplateNodes[itrAttrId];

                for (var _oPrimarayAnswerModeInfo in _oAttributeInfo.AnswerMode) {
                    //alert(typeof (_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo]));
                    //alert(hasown (_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo]));

                    if (typeof (_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo]) != 'function') {

                        //alert(_oPrimarayAnswerModeInfo);
                        var AttributeNodeId = itrAttrId;
                        var AttributeNodeName = _oAttributeInfo.Name;
                        var Answer = '';
                        //if answer mode is ddl,value will save here, for text box and other make it null
                        var AnswerValue = '';
                        var AnswerFKType = ''
                        var AnswerMode = '';
                        //IsDynamicElement=true => if answer mode is ddl and enter new element which is not in the drop dowen list
                        var IsDynamicAnswer = 'false';

                        ////for dropdowen,auto complete
                        //if (_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].Type == 'DDL') {
                        //    if ($scope[_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].ControlId].GetSelectedText() == undefined) {
                        //        Answer = '';
                        //        AnswerValue = '';
                        //    }
                        //    else {
                        //        Answer = $scope[_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].ControlId].GetSelectedValue();
                        //        AnswerValue = $scope[_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].ControlId].GetSelectedText();
                        //    }
                        //    AnswerFKType = $scope[_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].ControlId].GetDATEntityTypeId();
                        //    AnswerMode = 'DDL';//$scope[_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].ControlId].GetControlType();
                        //    if ((Answer == 0 || Answer == '0') && (AnswerValue != ''))
                        //        IsDynamicAnswer = 'true';

                        //}
                        //else {
                        //    //Answer = $scope.NewDCModel['NodeId_' + itrAttrId];
                        //    Answer = $scope.NewDCModel[_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].ControlId];
                        //}




                        var _DcResultDetailsEntity = new DcResultDetailsEntity();

                        _DcResultDetailsEntity.ServiceId = '1';

                        _DcResultDetailsEntity.ClientGuid = OneViewUniqueGenerator.GetGuid();
                        _DcResultDetailsEntity.MobileVersionId = 1;

                        _DcResultDetailsEntity.StartDate = CurrenntDateAndTime;

                        _DcResultDetailsEntity.AttributeNodeId = AttributeNodeId;

                        _DcResultDetailsEntity.ControlId = _oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].ControlId;

                        _DcResultDetailsEntity.AttributeNodeName = AttributeNodeName;
                        //if (_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].DataType == "BOOLEAN") {
                        //    if (Answer == true || Answer == "true") {
                        //        Answer = '1';
                        //    }
                        //    else {
                        //        Answer = "0";
                        //    }
                        //}

                        if (AttributeNodeId == '24')//product
                        {
                            _DcResultDetailsEntity.Answer = '19';
                            _DcResultDetailsEntity.AnswerValue = 'Lamb fry';

                            _DcResultDetailsEntity.AnswerFKType = '35';
                            _DcResultDetailsEntity.AnswerMode = 'DDL';
                        }

                        else if (AttributeNodeId == '25')//product type
                        {
                            _DcResultDetailsEntity.Answer = '18';
                            _DcResultDetailsEntity.AnswerValue = 'Meat';

                            _DcResultDetailsEntity.AnswerFKType = '34';
                            _DcResultDetailsEntity.AnswerMode = 'DDL';
                        }


                        else if (AttributeNodeId == '26')//p
                        {
                            _DcResultDetailsEntity.Answer = '1';
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }


                        else if (AttributeNodeId == '27')//g
                        {
                            _DcResultDetailsEntity.Answer = '1';
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }

                        else if (AttributeNodeId == '28')//r
                        {
                            _DcResultDetailsEntity.Answer = '1';
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }

                        else if (AttributeNodeId == '29')//s
                        {
                            _DcResultDetailsEntity.Answer = '0';
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }

                        else if (AttributeNodeId == '30')//Airline
                        {
                            _DcResultDetailsEntity.Answer = '56';
                            _DcResultDetailsEntity.AnswerValue = 'EK1012';

                            _DcResultDetailsEntity.AnswerFKType = '33';
                            _DcResultDetailsEntity.AnswerMode = 'DDL';
                        }

                        else if (AttributeNodeId == '31')//CoreTemp
                        {
                            _DcResultDetailsEntity.Answer = '74';
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }

                        else if (AttributeNodeId == '32')//CookingTime
                        {
                            _DcResultDetailsEntity.Answer = 'time';
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }

                        else if (AttributeNodeId == '33')//CookedBy
                        {
                            _DcResultDetailsEntity.Answer = 'Kate';
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }

                        else if (AttributeNodeId == '34')//PreChillerTimeIn
                        {
                            _DcResultDetailsEntity.Answer = time;
                            _DcResultDetailsEntity.AnswerValue ='' ;

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }

                        else if (AttributeNodeId == '35')//PreChillerTempIn
                        {
                            _DcResultDetailsEntity.Answer = '74';
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }

                        else if (AttributeNodeId == '36')//PreChillerTimeOut
                        {
                            _DcResultDetailsEntity.Answer = time;
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }

                        else if (AttributeNodeId == '37')//PreChillerTempOut
                        {
                            _DcResultDetailsEntity.Answer = '74';
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }

                        else if (AttributeNodeId == '38')//BlastChillerNo
                        {
                            _DcResultDetailsEntity.Answer = '71';
                            _DcResultDetailsEntity.AnswerValue = 'chiller-05';

                            _DcResultDetailsEntity.AnswerFKType = '32';
                            _DcResultDetailsEntity.AnswerMode = 'DDL';
                        }

                        else if (AttributeNodeId == '39')//BlastChillerTimeIn
                        {
                            _DcResultDetailsEntity.Answer = time;
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }

                        else if (AttributeNodeId == '40')//BlastChillerTempIn
                        {
                            _DcResultDetailsEntity.Answer = '73';
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }
                        else if (AttributeNodeId == '41')//BlastChillerTimeOut
                        {
                            _DcResultDetailsEntity.Answer = time;
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }
                        else if (AttributeNodeId == '42')//BlastChillerTempOut
                        {
                            _DcResultDetailsEntity.Answer = '05';
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }
                        else if (AttributeNodeId == '43')//Comment
                        {
                            _DcResultDetailsEntity.Answer = '186';
                            _DcResultDetailsEntity.AnswerValue = 'Its Fine';

                            _DcResultDetailsEntity.AnswerFKType = '36';
                            _DcResultDetailsEntity.AnswerMode = 'DDL';
                        }


                        _DcResultDetailsEntity.IsManual = "true";

                        _DcResultDetailsEntity.IsSynchronized = "false";
                        _DcResultDetailsEntity.CreatedDate = CurrenntDateAndTime;

                        //_DcResultDetailsEntity.Comments = "";
                        ///_DcResultDetailsEntity.AnswerDataType = _oPrimarayAnswerModeInfo.DataType;
                        _DcResultDetailsEntity.AnswerDataType = _oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].DataType;
                        _DcResultDetailsEntity.IsDynamicAnswer = IsDynamicAnswer;


                        DCResultDetails.push(_DcResultDetailsEntity);

                        //DCResultDetails.push({
                        //    "AttributeNodeId": AttributeNodeId,
                        //    "AttributeNodeName": AttributeNodeName,
                        //    "Answer": Answer,
                        //    "AnswerValue": AnswerValue,
                        //    "IsDynamicAnswer": true,
                        //    "AnswerFKType": _oPrimarayAnswerModeInfo.EntityName,
                        //    "AnswerDataType": _oPrimarayAnswerModeInfo.DataType
                        //});

                        //return DCResultDetails;
                    }
                }

            }
            return DCResultDetails;

        }
        catch (excep) {
            alert(' GetDCResultDetailsForSave : ' + excep);
        }

    }

    this.GetDcResultDetailsEntityForGoodReceipts = function (TemplateNodes, CurrenntDateAndTime, DCId, DcResultId) {
        try {

            var _oDateTime = new DateTime();
            var time = _oDateTime.GetHoursAndMinutes();

            var DCResultDetails = [];
            for (var itrAttrId in TemplateNodes) {
                var _oAttributeInfo = TemplateNodes[itrAttrId];

                for (var _oPrimarayAnswerModeInfo in _oAttributeInfo.AnswerMode) {
                    //alert(typeof (_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo]));
                    //alert(hasown (_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo]));

                    if (typeof (_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo]) != 'function') {

                        //alert(_oPrimarayAnswerModeInfo);
                        var AttributeNodeId = itrAttrId;
                        var AttributeNodeName = _oAttributeInfo.Name;
                        var Answer = '';
                        //if answer mode is ddl,value will save here, for text box and other make it null
                        var AnswerValue = '';
                        var AnswerFKType = ''
                        var AnswerMode = '';
                        //IsDynamicElement=true => if answer mode is ddl and enter new element which is not in the drop dowen list
                        var IsDynamicAnswer = 'false';

                        ////for dropdowen,auto complete
                        //if (_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].Type == 'DDL') {
                        //    if ($scope[_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].ControlId].GetSelectedText() == undefined) {
                        //        Answer = '';
                        //        AnswerValue = '';
                        //    }
                        //    else {
                        //        Answer = $scope[_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].ControlId].GetSelectedValue();
                        //        AnswerValue = $scope[_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].ControlId].GetSelectedText();
                        //    }
                        //    AnswerFKType = $scope[_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].ControlId].GetDATEntityTypeId();
                        //    AnswerMode = 'DDL';//$scope[_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].ControlId].GetControlType();
                        //    if ((Answer == 0 || Answer == '0') && (AnswerValue != ''))
                        //        IsDynamicAnswer = 'true';

                        //}
                        //else {
                        //    //Answer = $scope.NewDCModel['NodeId_' + itrAttrId];
                        //    Answer = $scope.NewDCModel[_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].ControlId];
                        //}




                        var _DcResultDetailsEntity = new DcResultDetailsEntity();

                        _DcResultDetailsEntity.ServiceId = '1';

                        _DcResultDetailsEntity.ClientGuid = OneViewUniqueGenerator.GetGuid();
                        _DcResultDetailsEntity.MobileVersionId = 1;

                        _DcResultDetailsEntity.StartDate = CurrenntDateAndTime;

                        _DcResultDetailsEntity.AttributeNodeId = AttributeNodeId;

                        _DcResultDetailsEntity.ControlId = _oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].ControlId;

                        _DcResultDetailsEntity.AttributeNodeName = AttributeNodeName;
                        //if (_oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].DataType == "BOOLEAN") {
                        //    if (Answer == true || Answer == "true") {
                        //        Answer = '1';
                        //    }
                        //    else {
                        //        Answer = "0";
                        //    }
                        //}

                        if (AttributeNodeId == '68')//product
                        {
                            _DcResultDetailsEntity.Answer = '19';
                            _DcResultDetailsEntity.AnswerValue = 'Lamb fry';

                            _DcResultDetailsEntity.AnswerFKType = '35';
                            _DcResultDetailsEntity.AnswerMode = 'DDL';
                        }

                        else if (AttributeNodeId == '45')//supplier
                        {
                            _DcResultDetailsEntity.Answer = '170';
                            _DcResultDetailsEntity.AnswerValue = 'test supplier';

                            _DcResultDetailsEntity.AnswerFKType = '34';
                            _DcResultDetailsEntity.AnswerMode = 'DDL';
                        }


                        else if (AttributeNodeId == '47')//Chilled
                        {
                            _DcResultDetailsEntity.Answer = '0';
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }
                        else if (AttributeNodeId == '48')//frozen
                        {
                            _DcResultDetailsEntity.Answer = '1';
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }
                        else if (AttributeNodeId == '49')//Dry
                        {
                            _DcResultDetailsEntity.Answer = '0';
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }
                        else if (AttributeNodeId == '51')//hard
                        {
                            _DcResultDetailsEntity.Answer = '0';
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }
                        else if (AttributeNodeId == '52')//Soft
                        {
                            _DcResultDetailsEntity.Answer = '1';
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }
                        else if (AttributeNodeId == '53')//Thawing
                        {
                            _DcResultDetailsEntity.Answer = '0';
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }

                        else if (AttributeNodeId == '54')//TruckTemp
                        {
                            _DcResultDetailsEntity.Answer = '56';
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }

                        else if (AttributeNodeId == '55')//TruckStripCurtains
                        {
                            _DcResultDetailsEntity.Answer = '1';
                            _DcResultDetailsEntity.AnswerValue = 'YES';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }

                        else if (AttributeNodeId == '56')//TruckCleanliness
                        {
                            _DcResultDetailsEntity.Answer = '1';
                            _DcResultDetailsEntity.AnswerValue = 'YES';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }

                        else if (AttributeNodeId == '57')//DMVehicleApprovalTag
                        {
                            _DcResultDetailsEntity.Answer = '1';
                            _DcResultDetailsEntity.AnswerValue = 'YES';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }

                        else if (AttributeNodeId == '58')//DeliveryStaffHairBeardNets
                        {
                            _DcResultDetailsEntity.Answer = '1';
                            _DcResultDetailsEntity.AnswerValue = 'YES';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }

                        else if (AttributeNodeId == '59')//DeliveryStaffUniformCondition
                        {
                            _DcResultDetailsEntity.Answer = '1';
                            _DcResultDetailsEntity.AnswerValue = 'YES';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }

                        else if (AttributeNodeId == '60')//Time
                        {
                            _DcResultDetailsEntity.Answer = time;
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }

                        else if (AttributeNodeId == '61')//SurfaceTemp
                        {
                            _DcResultDetailsEntity.Answer = '58';
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }

                        else if (AttributeNodeId == '62')//PdExDate
                        {
                            _DcResultDetailsEntity.Answer = '';
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }

                        else if (AttributeNodeId == '63')//PestSign
                        {
                            _DcResultDetailsEntity.Answer = '1';
                            _DcResultDetailsEntity.AnswerValue = 'YES';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }

                        else if (AttributeNodeId == '64')//PackagingIntegrity
                        {
                            _DcResultDetailsEntity.Answer = '1';
                            _DcResultDetailsEntity.AnswerValue = 'YES';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }
                        else if (AttributeNodeId == '65')//CommentsCorrectiveAction
                        {
                            _DcResultDetailsEntity.Answer = 'Its good';
                            _DcResultDetailsEntity.AnswerValue = '';

                            _DcResultDetailsEntity.AnswerFKType = '';
                            _DcResultDetailsEntity.AnswerMode = '';
                        }


                        _DcResultDetailsEntity.IsManual = "true";

                        _DcResultDetailsEntity.IsSynchronized = "false";
                        _DcResultDetailsEntity.CreatedDate = CurrenntDateAndTime;

                        //_DcResultDetailsEntity.Comments = "";
                        ///_DcResultDetailsEntity.AnswerDataType = _oPrimarayAnswerModeInfo.DataType;
                        _DcResultDetailsEntity.AnswerDataType = _oAttributeInfo.AnswerMode[_oPrimarayAnswerModeInfo].DataType;
                        _DcResultDetailsEntity.IsDynamicAnswer = IsDynamicAnswer;


                        DCResultDetails.push(_DcResultDetailsEntity);

                        //DCResultDetails.push({
                        //    "AttributeNodeId": AttributeNodeId,
                        //    "AttributeNodeName": AttributeNodeName,
                        //    "Answer": Answer,
                        //    "AnswerValue": AnswerValue,
                        //    "IsDynamicAnswer": true,
                        //    "AnswerFKType": _oPrimarayAnswerModeInfo.EntityName,
                        //    "AnswerDataType": _oPrimarayAnswerModeInfo.DataType
                        //});

                        //return DCResultDetails;
                    }
                }

            }
            return DCResultDetails;

        }
        catch (excep) {
            alert(' GetDCResultDetailsForSave : ' + excep);
        }

    }

}