
// DcApprovalBO
function DcApprovalBO() {

    var _oDcApprovalProfileDAO = new DcApprovalProfileDAO();

    // Current Scope
    var MyInstance = this;

    /// <summary>
    /// Get
    /// </summary>
    /// <param name="Req">
    /// {
    ///     ServiceId: 1,
    ///     UserId: 1,    
    ///     TemplateNodeId: 1,
    ///     PlaceId: 1,(Placeid will come)
    ///     DcPlaceDimension:16,
    ///     DCPlaceRCOType: 1,
    ///     DCPlaceKeyElementIsGroup: true or false
    ///     TemplateKeyElementIsGroup: true or false
    ///     DcClientGuidLst: [],
    /// }
    /// </param>   
    /// <returns>
    ///[{
    ///   DcInfo:  { ClientGuid: '', TemplateNodeId: '', TemplateNodeName: '', DcPlaceId: '', DcPlaceName: '', Score: '', Percentage: '', CompletedAttributeCount :'',TotalAttributeCount :''},
    ///    DcApprovalProfileInfo: {
    ///        DcApprovalProfile: {},
    ///        DcApprovalLevelInfo: [],
    ///        DcApprovalUserDetails: [],
    ///    },
    ///    NextApprovalIndex: 0,
    ///},
    ///];
    ///</returns>  

  
    this.GetApprovalInfo = function (Req) {
        try {
            OneViewConsole.Debug("GetApprovalInfo start", "DcApprovalBO.GetApprovalInfo");

            var Response = [];
            var PlaceIdLst = [];
            var TemplateIdLst = [];          
         
            var DCListForApprove = [];
            

            
            if (Req.DCPlaceKeyElementIsGroup == true) {
                PlaceIdLst = MyInstance.GetApprovalInfoByPlaceGroupId(Req);
            }
            else {
                PlaceIdLst.push(Req.PlaceId);
            }
               

            if (Req.TemplateKeyElementIsGroup == true) {
                              
                var _oDcDAO = new DcDAO();
                //TemplateIdLst = _oDcDAO.GetDcTemplateExpByTemplateGroup({ IsTemplateGroup: Req.TemplateKeyElementIsGroup, TemplateNodeId: Req.TemplateNodeId, AttributeGroupType: Req.AttributeGroupType });
                //TemplateIdLst.push(DcTemplateExp);
                var DcTemplateLst = _oDcDAO.GetDcTemplateIdsByTemplateGroupAndAttributeGroupType(Req.TemplateNodeId, Req.AttributeGroupType);
                for (var i = 0; i < DcTemplateLst.length; i++) {
                    TemplateIdLst.push( DcTemplateLst[i].Id);
                }

               // alert(JSON.stringify(TemplateIdLst));
            }
            else {              
                TemplateIdLst.push(Req.TemplateNodeId);
            }
          

          
            if (Req.DcClientGuidLst.length == 0) {
               
                var _DcApprovalProfileDAO = new DcApprovalProfileDAO();
                DCListForApprove = _DcApprovalProfileDAO.GetDCListForApproveByTemplatePlaceIdServiceIdUserId({ UserId: Req.UserId, ServiceId: Req.ServiceId, PlaceIdLst: PlaceIdLst, TemplateIdLst: TemplateIdLst });
            
            }
            else {               
                DCListForApprove = GetDcInfoForApproval({ "DcClientGuid": Req.DcClientGuidLst });              
            }

            for (var i = 0; i < DCListForApprove.length; i++) {
                DcClientGuid = DCListForApprove[i].ClientGuid;
                var RespObj = {
                    DcInfo: {},
                    DcApprovalProfileInfo: {},
                    NextApprovalIndex: 0,
                };

              

                var ApprovalProfileReq = {
                    "ServiceId": Req.ServiceId, "PlaceId": DCListForApprove[i].DcPlaceId, "DcPlaceDimension": DCListForApprove[i].DcPlaceDimension, "DCPlaceRCOType": Req.DCPlaceRCOType,
                    "TemplateNodeId": DCListForApprove[i].TemplateNodeId, "UserId": Req.UserId
                }
                var ApprovalProfile = GetApprovalProfile(ApprovalProfileReq);
                if (ApprovalProfile != null) {
                    RespObj.DcInfo = DCListForApprove[i];
                    RespObj.DcApprovalProfileInfo = ApprovalProfile.DcApprovalProfileInfo;


                    var NextApprovalIndex = GetNextApprovalIndex(DcClientGuid);
                    RespObj.NextApprovalIndex = NextApprovalIndex;

                    Response.push(RespObj);
                }

               
            }
           
            return Response;
           
           
        } catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcApprovalBO.GetApprovalInfo", Excep);
        }
        finally{
            TempApprovalProfile = {};
        }
    }

    var TempApprovalProfile = {};

    /// <summary>
    /// GetApprovalProfile
    /// </summary>
    /// <param name="Req">
    /// {
    ///     ServiceId: 1,
    ///     PlaceId: 1,    
    ///     DcPlaceDimension: 1,
    ///     DCPlaceRCOType: 1
    ///     TemplateNodeId:16,
    ///     UserId: 1,
    /// }
    /// </param>   
    /// <returns>
    ///{  
    ///    DcApprovalProfileInfo: {
    ///        DcApprovalProfile: {},
    ///        DcApprovalLevelInfo: [],
    ///        DcApprovalUserDetails: [],
    /// },
    /// }
    ///</returns> 
    var GetApprovalProfile = function (Req) {
        try {
            OneViewConsole.Debug("GetApprovalProfile start", "DcApprovalBO.GetApprovalProfile");

            var Response = {
                DcApprovalProfileInfo: {
                    DcApprovalProfile: {},
                    DcApprovalLevelInfo: [],
                    DcApprovalUserDetails: [],
                },
            };

            var ApprovalSearchKey = Req.UserId + "_" + Req.TemplateNodeId + "_" + Req.PlaceId + "_" + Req.DcPlaceDimension;

            if (TempApprovalProfile[ApprovalSearchKey] != null) {
                Response = TempApprovalProfile[ApprovalSearchKey];               
            }
            else {

                var ApprovalProfileLst = _oDcApprovalProfileDAO.GetByAllDimensions(Req);

                if (ApprovalProfileLst.length == 0) {
                    //alert("Approval profile not exist");
                    Response = null;
                }
                else if (ApprovalProfileLst.length > 0) {

                    Response.DcApprovalProfileInfo["DcApprovalProfile"] = ApprovalProfileLst[0];

                    ApprovalPrfoileResponse = GetApprovalLevelAndUserDetails(ApprovalProfileLst[0]);
                    Response.DcApprovalProfileInfo.DcApprovalLevelInfo = ApprovalPrfoileResponse.DcApprovalLevelInfo;
                    Response.DcApprovalProfileInfo.DcApprovalUserDetails = ApprovalPrfoileResponse.DcApprovalUserDetails;
                   
                    TempApprovalProfile[ApprovalSearchKey] = Response;

                }
                //else if (ApprovalProfileLst.length > 1) {
                //    alert("More than one approve profile not implemented");
                //}

            }

            OneViewConsole.Debug("GetApprovalInfoDetailsByDcClientGuid end", "DcApprovalBO.GetApprovalInfoDetailsByDcClientGuid");

            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcApprovalBO.GetApprovalProfile", Excep);
        }
    }

    this.GetApprovalInfo_Old = function (Req) {
        try {
            OneViewConsole.Debug("GetApprovalInfo start", "DcApprovalBO.GetApprovalInfo");

            var  PlaceIdLst= MyInstance.GetApprovalInfoByPlaceGroupId(Req);

            for (var i = 0;i<PlaceIdLst.length;i++) {

                Req.PlaceId = PlaceIdLst[i].ServerId;
                alert(Req.PlaceId)
            var ApprovalProfileReq = { "ServiceId": Req.ServiceId, "PlaceId": Req.PlaceId, "DcPlaceDimension": Req.DcPlaceDimension, "TemplateNodeId": Req.TemplateNodeId, "UserId": Req.UserId, "DcPlaceType": Req.DCPlaceRCOType, }
            var ApprovalProfileLst = _oDcApprovalProfileDAO.GetByAllDimensions(ApprovalProfileReq);       
         
                //Req:{Userid,:13,TemplateNodeId:3,PlaceID:4,PlaceTypeID:201}
            ApprovalProfileLst = GetApprovalProfile({ UserId: Req.UserId, TemplateNodeId: Req.TemplateNodeId, PlaceID: Req.PlaceId, DCPlaceRCOType: Req.DCPlaceRCOType, ApprovalProfileLst: ApprovalProfileLst });
            alert("ApprovalProfile : " + JSON.stringify(ApprovalProfile));
            var Response = [];

            if (ApprovalProfileLst != null) {

                if (Req.DcClientGuidLst.length > 1) {

                    alert("More than one datacapture approve not implemented");
                }
                else if (Req.DcClientGuidLst.length == 0) {

                    alert("Not implemented");
                }
                else {

                   // var DcClientGuid = Req.DcClientGuidLst[0];

                  //  var ApprovalInfoDetails = GetApprovalInfoDetailsByDcClientGuid({ "ApprovalProfileLst": ApprovalProfileLst, "DcClientGuid": DcClientGuid });
                   // Response.push(ApprovalInfoDetails); 

                }

            }
            else {
                alert("Profile Not exist");
            }

            OneViewConsole.Debug("GetApprovalInfo end", "DcApprovalBO.GetApprovalInfo");
            }

           // CheckApprove(Response);
           // return Response; 
           // MyInstance.GetApprovalInfoByPlaceGroupId(Req);
        }
        catch (Excep) {            
            throw oOneViewExceptionHandler.Create("BO", "DcApprovalBO.GetApprovalInfo", Excep);
        }
    }

    /// <summary>
    /// GetApprovalInfoDetailsByDcClientGuid
    /// </summary>
    /// <param name="Req">
    /// {
    /// ApprovalProfileLst:'',
    /// DcClientGuid: ,
    /// }
    /// <returns>
    ///       {
    ///        DcInfo:  { ClientGuid: '', TemplateNodeId: '', TemplateNodeName: '', DcPlaceId: '', DcPlaceName: '', Score: '', Percentage: '', CompletedAttributeCount :'',TotalAttributeCount :''},
    ///      DcApprovalProfileInfo: {
    ///             DcApprovalProfile: {},
    ///             DcApprovalLevelInfo: [],
    ///               DcApprovalUserDetails: [],
    ///              },
    ///       NextApprovalIndex: 0,
    ///     }
 
    ///</returns>  
    var GetApprovalInfoDetailsByDcClientGuid_Old = function (Req) {
        try {
            OneViewConsole.Debug("GetApprovalInfoDetailsByDcClientGuid start", "DcApprovalBO.GetApprovalInfoDetailsByDcClientGuid");
            
            var Response = {
                //DcInfo: { ClientGuid: '', TemplateNodeId: '', TemplateNodeName: '', DcPlaceId: '', DcPlaceName: '', Score: '', Percentage: '', CompletedAttributeCount :'',TotalAttributeCount :''},
                DcInfo: { },
                DcApprovalProfileInfo: {
                    DcApprovalProfile: {},
                    DcApprovalLevelInfo: [],
                    DcApprovalUserDetails: [],
                },
                NextApprovalIndex: 0,
            };


            var ApprovalProfileLst = Req.ApprovalProfileLst;
            var DcClientGuid = Req.DcClientGuid;

           var ApprovalProfile = GetApprovalProfile(ApprovalProfileLst);
           Response.DcApprovalProfileInfo["DcApprovalProfile"] = ApprovalProfile[0];


            if (ApprovalProfile.length == 0) {
                alert("Approval profile not exist");

            }
            else if (ApprovalProfile.length == 1) {
      
                if (IsDcApproved(DcClientGuid) == false) {
                  
                    var DcInfoForApproval = GetDcInfoForApproval({ "DcClientGuid": DcClientGuid });                 
                    Response.DcInfo = DcInfoForApproval;

                    ApprovalPrfoileResponse = GetApprovalLevelAndUserDetails(ApprovalProfile[0]);
                    Response.DcApprovalProfileInfo.DcApprovalLevelInfo=ApprovalPrfoileResponse.DcApprovalLevelInfo;
                    Response.DcApprovalProfileInfo.DcApprovalUserDetails=ApprovalPrfoileResponse.DcApprovalUserDetails;

                    var NextApprovalIndex = GetNextApprovalIndex(DcClientGuid);                 
                    Response.NextApprovalIndex = NextApprovalIndex;

                }
                else {

                    alert("Datacapture already approved");
                }

            }
            else if (ApprovalProfileLst.length > 1) {
                alert("More than one approve profile not implemented");
            }


            OneViewConsole.Debug("GetApprovalInfoDetailsByDcClientGuid end", "DcApprovalBO.GetApprovalInfoDetailsByDcClientGuid");
            
            return Response;
        }
        catch (Excep) {           
            throw oOneViewExceptionHandler.Create("BO", "DcApprovalBO.GetApprovalInfoByPlaceGroupId", Excep);
        }
    }


    /// <summary>
    /// GetApprovalInfoByPlaceGroupId
    /// </summary>
    /// <param name="Req">
    /// {
    ///     ServiceId: 1,
    ///     UserId: 1,    
    ///     TemplateNodeId: 1,
    ///     PlaceId: 1,(placegroupids will come)
    ///     DcPlaceDimension:16,
    ///     DCPlaceRCOType: 1,
    ///     DcClientGuidLst: [],
    /// }
    /// <returns>
    /// List of place
    ///</returns>  
    this.GetApprovalInfoByPlaceGroupId = function (Req) {
        try {
            OneViewConsole.Debug("GetApprovalInfoByPlaceGroupId start", "DcApprovalBO.GetApprovalInfoByPlaceGroupId");
            
            var _DcApprovalProfileDAO = new DcApprovalProfileDAO();
           // var PlaceIdLst = _DcApprovalProfileDAO.GetAllChildsWithType(2, 201, "organizationAssetsNode");
            var PlaceIdLst = _DcApprovalProfileDAO.GetAllChildsWithType(Req.PlaceId, Req.DCPlaceRCOType, "organizationAssetsNode");
           

            OneViewConsole.Debug("GetApprovalInfoByPlaceGroupId end", "DcApprovalBO.GetApprovalInfoByPlaceGroupId");            
            return PlaceIdLst;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcApprovalBO.GetApprovalInfoByPlaceGroupId", Excep);
        }
    }


    /// <summary>
    /// GetApprovalProfile
    /// </summary>
    /// <param >
    ///Req:{ UserId: 13, TemplateNodeId: 3, PlaceID: 4, DCPlaceRCOType: 201,ApprovalProfileLst: }
    /// </param>   
    /// <returns>
    /// filtered ApprovalProfile 
    ///</returns>  

    var GetApprovalProfile_chnged = function (Req) {
        try {
            OneViewConsole.Debug("GetApprovalProfile start", "DcApprovalBO.GetApprovalProfile");

            var ApprovalProfile = null;
            //U1-User   T1-Template P1-Place
            //1)    u1    t1  p1
            //2)    u1    t1  -1
            //3)    u1    -1  p1
            //4)    -1    t1  p1
            //5)    u1    -1  -1
            //6)    -1    t1  -1
            //7)    -1    -1  p1
            //8)    -1    -1  -1
            var UserId = Req.UserId;
            var TemplateNodeId = Req.TemplateNodeId;
            var DcPlaceId = Req.PlaceID;
            //var DCPlaceRCOType = Req.DCPlaceRCOType;       
            var DCPlaceRCOType = 201;
            var ApprovalProfileLst = Req.ApprovalProfileLst;
            alert("Req : " + JSON.stringify(Req));
            for (var i = 0; i < ApprovalProfileLst.length; i++) {
                
                if (ApprovalProfileLst[i].DcPlaceType == DCPlaceRCOType && ApprovalProfileLst[i].DcPlaceId == DcPlaceId && ApprovalProfileLst[i].TemplateNodeId == TemplateNodeId && ApprovalProfileLst[i].DcUserId == UserId) {
                    alert('1');
                    ApprovalProfile = ApprovalProfileLst[i];
                    break;
                }
            }

            if (ApprovalProfile == null) {

                for (var i = 0; i < ApprovalProfileLst.length; i++) {
                    if (ApprovalProfileLst[i].DcPlaceType == DCPlaceRCOType && ApprovalProfileLst[i].DcPlaceId == DcPlaceId && ApprovalProfileLst[i].TemplateNodeId == TemplateNodeId && ApprovalProfileLst[i].DcUserId == '-1') {
                        alert('2');
                        ApprovalProfile = ApprovalProfileLst[i];
                        break;
                    }
                }
            }

            if (ApprovalProfile == null) {

                for (var i = 0; i < ApprovalProfileLst.length; i++) {
                    if (ApprovalProfileLst[i].DcPlaceType == DCPlaceRCOType && ApprovalProfileLst[i].DcPlaceId == DcPlaceId && ApprovalProfileLst[i].TemplateNodeId == '-1' && ApprovalProfileLst[i].DcUserId == UserId) {
                        alert('3');
                        ApprovalProfile = ApprovalProfileLst[i];
                        break;
                    }
                }
            }

            if (ApprovalProfile == null) {

                for (var i = 0; i < ApprovalProfileLst.length; i++) {
                    if (ApprovalProfileLst[i].DcPlaceType == DCPlaceRCOType && ApprovalProfileLst[i].DcPlaceId == DcPlaceId && ApprovalProfileLst[i].TemplateNodeId == '-1' && ApprovalProfileLst[i].DcUserId == '-1') {
                        alert('4');
                        ApprovalProfile = ApprovalProfileLst[i];
                        break;
                    }
                }
            }

            if (ApprovalProfile == null) {

                for (var i = 0; i < ApprovalProfileLst.length; i++) {
                    if (ApprovalProfileLst[i].DcPlaceType == DCPlaceRCOType && ApprovalProfileLst[i].DcPlaceId == '-1' && ApprovalProfileLst[i].TemplateNodeId == TemplateNodeId && ApprovalProfileLst[i].DcUserId == UserId) {
                        alert('5');
                        ApprovalProfile = ApprovalProfileLst[i];
                        break;
                    }
                }
            }


            if (ApprovalProfile == null) {

                for (var i = 0; i < ApprovalProfileLst.length; i++) {
                    if (ApprovalProfileLst[i].DcPlaceType == DCPlaceRCOType && ApprovalProfileLst[i].DcPlaceId == '-1' && ApprovalProfileLst[i].TemplateNodeId == TemplateNodeId && ApprovalProfileLst[i].DcUserId == '-1') {
                        alert('6');
                        ApprovalProfile = ApprovalProfileLst[i];
                        break;
                    }
                }
            }

            if (ApprovalProfile == null) {

                for (var i = 0; i < ApprovalProfileLst.length; i++) {
                    alert(ApprovalProfileLst[i].DcPlaceType + "..>" + DCPlaceRCOType + '::::' + ApprovalProfileLst[i].DcPlaceId + "..>-1.......::::" + ApprovalProfileLst[i].TemplateNodeId + "..>-1.......::::" + ApprovalProfileLst[i].DcUserId + "..>" + UserId)
                    if (ApprovalProfileLst[i].DcPlaceType == DCPlaceRCOType && ApprovalProfileLst[i].DcPlaceId == '-1' && ApprovalProfileLst[i].TemplateNodeId == '-1' && ApprovalProfileLst[i].DcUserId == UserId) {
                        alert('7');
                        ApprovalProfile = ApprovalProfileLst[i];
                        break;
                    }
                }
            }

            if (ApprovalProfile == null) {

                for (var i = 0; i < ApprovalProfileLst.length; i++) {
                    if (ApprovalProfileLst[i].DcPlaceType == DCPlaceRCOType && ApprovalProfileLst[i].DcPlaceId == '-1' && ApprovalProfileLst[i].TemplateNodeId == '-1' && ApprovalProfileLst[i].DcUserId == '-1') {
                        alert('8');
                        ApprovalProfile = ApprovalProfileLst[i];
                        break;
                    }
                }
            }

            if (ApprovalProfile == null) {

                for (var i = 0; i < ApprovalProfileLst.length; i++) {
                    if (ApprovalProfileLst[i].DcPlaceType == '-1' && ApprovalProfileLst[i].DcPlaceId == DcPlaceId && ApprovalProfileLst[i].TemplateNodeId == TemplateNodeId && ApprovalProfileLst[i].DcUserId == UserId) {
                        alert('9');
                        ApprovalProfile = ApprovalProfileLst[i];
                        break;
                    }
                }
            }

            if (ApprovalProfile == null) {

                for (var i = 0; i < ApprovalProfileLst.length; i++) {
                    if (ApprovalProfileLst[i].DcPlaceType == '-1' && ApprovalProfileLst[i].DcPlaceId == '-1' && ApprovalProfileLst[i].TemplateNodeId == TemplateNodeId && ApprovalProfileLst[i].DcUserId == UserId) {
                        alert('10');
                        ApprovalProfile = ApprovalProfileLst[i];
                        break;
                    }
                }
            }

            if (ApprovalProfile == null) {

                for (var i = 0; i < ApprovalProfileLst.length; i++) {
                    if (ApprovalProfileLst[i].DcPlaceType == '-1' && ApprovalProfileLst[i].DcPlaceId == DcPlaceId && ApprovalProfileLst[i].TemplateNodeId == '-1' && ApprovalProfileLst[i].DcUserId == UserId) {
                        alert('11');
                        ApprovalProfile = ApprovalProfileLst[i];
                        break;
                    }
                }
            }

            if (ApprovalProfile == null) {

                for (var i = 0; i < ApprovalProfileLst.length; i++) {
                    if (ApprovalProfileLst[i].DcPlaceType == '-1' && ApprovalProfileLst[i].DcPlaceId == '-1' && ApprovalProfileLst[i].TemplateNodeId == '-1' && ApprovalProfileLst[i].DcUserId == UserId) {
                        alert('12');
                        ApprovalProfile = ApprovalProfileLst[i];
                        break;
                    }
                }
            }

            if (ApprovalProfile == null) {

                for (var i = 0; i < ApprovalProfileLst.length; i++) {
                    if (ApprovalProfileLst[i].DcPlaceId == '-1' && ApprovalProfileLst[i].DcPlaceType == '-1' && ApprovalProfileLst[i].TemplateNodeId == '-1' && ApprovalProfileLst[i].DcUserId == '-1') {
                        alert('13');
                        ApprovalProfile = ApprovalProfileLst[i];
                        break;
                    }
                }
            }

            if (ApprovalProfile == null) {

                for (var i = 0; i < ApprovalProfileLst.length; i++) {
                    if (ApprovalProfileLst[i].DcPlaceId == -1 && ApprovalProfileLst[i].DcPlaceType == -1 && ApprovalProfileLst[i].TemplateNodeId == -1 && ApprovalProfileLst[i].DcUserId == -1) {
                        alert('16');
                        ApprovalProfile = ApprovalProfileLst[i];
                        break;
                    }
                }
            }


            OneViewConsole.Debug("GetApprovalProfile end", "DcApprovalBO.GetApprovalProfile");

            return ApprovalProfile;
            
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcApprovalBO.GetDcApprovalLevelInfoDetails", Excep);
        }
    }


    /// <summary>
    /// GetDcClientGuidByPlaceIdTemplateId
    /// </summary>
    /// <param >
    ///Req:{ UserId: 13, TemplateNodeId: 3, PlaceID: 4, DCPlaceRCOType: 201,ApprovalProfileLst: }
    /// </param>   
    /// <returns>
    /// filtered ApprovalProfile 
    ///</returns>  

    var GetDcClientGuidByUserIdPlaceIdTemplateId = function (Req) {
        try {

            OneViewConsole.Debug("GetDcClientGuidByPlaceIdTemplateId start", "DcApprovalBO.GetDcClientGuidByPlaceIdTemplateId");

            var Result = _oDcApprovalProfileDAO.GetDcInfoByDcClientGuid(Req.DcClientGuid);

            OneViewConsole.Debug("GetDcClientGuidByPlaceIdTemplateId end", "DcApprovalBO.GetDcClientGuidByPlaceIdTemplateId");

            return Result[0];
        }
        catch (Excep) {

            throw oOneViewExceptionHandler.Create("BO", "DcApprovalBO.GetDcClientGuidByPlaceIdTemplateId", Excep);
        }
    }


    //DcInfo
    /// <summary>
    /// GetApprovalInfoByPlaceGroupId
    /// </summary>
    /// <param name="Req">
    /// { 
    ///     DcClientGuid: ,
    /// }
    /// <returns>
    /// { ClientGuid: '', TemplateNodeId: '', TemplateNodeName: '', DcPlaceId: '', DcPlaceName: '', Score: '', Percentage: '', CompletedAttributeCount :'',TotalAttributeCount :''},
    ///</returns> 
    var GetDcInfoForApproval = function (Req) {
        try {

            OneViewConsole.Debug("GetDcInfoForApproval start", "DcApprovalBO.GetDcInfoForApproval");

            var Result = _oDcApprovalProfileDAO.GetDcInfoByDcClientGuid(Req.DcClientGuid);

            OneViewConsole.Debug("GetDcInfoForApproval end", "DcApprovalBO.GetDcInfoForApproval");
      
            return Result;
        }
        catch (Excep) {
           
            throw oOneViewExceptionHandler.Create("BO", "DcApprovalBO.GetDcInfoForApproval", Excep);
        }
    }

    /// <summary>
    /// IsDcApproved
    /// </summary>
    /// <param >
    ///"DcClientGuid"
    /// </param>   
    /// <returns>
    /// true => if Dc Approved
    /// or
    /// false => if Dc not Approved
    ///</returns>  

    var IsDcApproved = function (DcClientGuid) {
        try {
            OneViewConsole.Debug("IsDcApproved start", "DcApprovalBO.IsDcApproved");


            var IsApproved = _oDcApprovalProfileDAO.IsDCApproved(DcClientGuid);
            var IsDataCptureApproved = false;
            if (IsApproved.length > 0) {
                IsDataCptureApproved = true;
            }

            OneViewConsole.Debug("IsDcApproved end", "DcApprovalBO.IsDcApproved");

            return IsDataCptureApproved;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcApprovalBO.IsDcApproved", Excep);
        }
    }

    /// <summary>
    /// GetApprovalLevelAndUserDetails
    /// </summary>
    /// <param >
    ///"object of ApprovalProfile"
    /// </param>   
    /// <returns>
    /// {   
    ///     DcApprovalLevelInfo: [],
    ///     DcApprovalUserDetails: [],    
    //},   
    ///</returns>  

    var GetApprovalLevelAndUserDetails = function (oApprovalProfile) {
        try {
            OneViewConsole.Debug("GetApprovalLevelAndUserDetails start", "DcApprovalBO.GetApprovalLevelAndUserDetails");

            var Response = {
                DcApprovalLevelInfo: [],
                DcApprovalUserDetails: [],
            }



            var DcApprovalProfileId = oApprovalProfile.Id;
            var DcApprovalLevelInfoDetails = GetDcApprovalLevelInfoDetails(DcApprovalProfileId);

            if (DcApprovalLevelInfoDetails.length > 0) {

                Response.DcApprovalLevelInfo=DcApprovalLevelInfoDetails;

                for (var i = 0; i < DcApprovalLevelInfoDetails.length; i++) {

                    if (DcApprovalLevelInfoDetails[i].IsAnonymousUser != "true") {

                        var DcApprovalLevelInfoId = DcApprovalLevelInfoDetails[i].Id;
                        var _GetDcApprovalUserDetails = GetDcApprovalUserDetails(DcApprovalProfileId);

                        if (_GetDcApprovalUserDetails.length > 0) {
                            Response.DcApprovalUserDetails=_GetDcApprovalUserDetails;
                        }
                    }

                }


            }


            OneViewConsole.Debug("GetApprovalLevelAndUserDetails end", "DcApprovalBO.GetApprovalLevelAndUserDetails");

            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcApprovalBO.GetApprovalLevelAndUserDetails", Excep);
        }
    }

    /// <summary>
    /// GetDcApprovalLevelInfoDetails
    /// </summary>
    /// <param >
    ///DcApprovalProfileId
    /// </param>   
    /// <returns>
    /// DcApprovalLevelInfo from Database  
    ///</returns>

    var GetDcApprovalLevelInfoDetails = function (DcApprovalProfileId) {
        try {
            OneViewConsole.Debug("GetDcApprovalLevelInfoDetails start", "DcApprovalBO.GetDcApprovalLevelInfoDetails");

            var _DcApprovalLevelInfoDAO = new DcApprovalLevelInfoDAO();
            var _GetDcApprovalLevelInfoDetails = _DcApprovalLevelInfoDAO.GetByAllDimensions(DcApprovalProfileId);

            OneViewConsole.Debug("GetDcApprovalLevelInfoDetails end", "DcApprovalBO.GetDcApprovalLevelInfoDetails");

            return _GetDcApprovalLevelInfoDetails;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcApprovalBO.GetDcApprovalLevelInfoDetails", Excep);
        }
    }

    /// <summary>
    /// GetDcApprovalUserDetails
    /// </summary>
    /// <param >
    ///DcApprovalLevelInfoId
    /// </param>   
    /// <returns>
    /// DcApprovalUserDetails from Database
    /// }
    ///</returns>

    var GetDcApprovalUserDetails = function (DcApprovalProfileId) {
        try {
            OneViewConsole.Debug("GetDcApprovalUserDetails start", "DcApprovalBO.GetDcApprovalUserDetails");

            var _DcApprovalUserDetailsDAO = new DcApprovalUserDetailsDAO();
            var Result = _DcApprovalUserDetailsDAO.GetByAllDimensions(DcApprovalProfileId);

            OneViewConsole.Debug("GetDcApprovalUserDetails end", "DcApprovalBO.GetDcApprovalUserDetails");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcApprovalBO.GetDcApprovalUserDetails", Excep);
        }
    }

    /// <summary>
    /// GetNextApprovalIndex
    /// </summary>
    /// <param >
    ///DcClientGuid
    /// </param>   
    /// <returns>
    /// NextApprovalIndex
    /// }
    ///</returns>

    var GetNextApprovalIndex = function (DcClientGuid) {
        try {
            OneViewConsole.Debug("GetNextApprovalIndex start", "DcApprovalBO.GetNextApprovalIndex");
            
            var _DcApprovalDAO = new DcApprovalDAO();
            var Result = _DcApprovalDAO.GetDcApprovalByDCId(DcClientGuid);
            var NextApprovalIndex = 0;

            if (Result.length > 0) {

                NextApprovalIndex = Result[0].ApprovalIndex;
            }
           
            NextApprovalIndex = parseInt(NextApprovalIndex) + 1;          

            OneViewConsole.Debug("GetNextApprovalIndex end", "DcApprovalBO.GetNextApprovalIndex");
            return NextApprovalIndex;
        }
        catch (Excep) {            
            throw oOneViewExceptionHandler.Create("BO", "DcApprovalBO.GetNextApprovalIndex", Excep);
        }
    }

    /// <summary>
    /// Validate
    /// </summary>
    /// <param name="Req">
    /// {
    ///     ServiceId: 1,
    ///     DcUserId: 1,    
    ///     TemplateNodeId: 1,
    ///     DcPlaceId: 1,
    ///     DcPlaceType: 1,
    ///     DcClientGuids: [],
    ///     OnDeviceApprovalConfigJSON: {},
    ///     ApprovalModel: {}
    /// }
    /// </param>    
    /// <returns></returns>  
    this.Validate = function (Req) {
        try {
            OneViewConsole.Debug("Approve start", "DcApprovalBO.Approve");

            OneViewConsole.Debug("Approve end", "DcApprovalBO.Approve");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcApprovalBO.Approve", Excep);
        }
    }


    /// <summary>
    /// Approve
    /// </summary>
    /// <param name=("Req")>  
    /// Req : {
    /// DcOnDeviceApprovalInfo :
    //[{
    ///   DcInfo:  { ClientGuid: '', TemplateNodeId: '', TemplateNodeName: '', DcPlaceId: '', DcPlaceName: '', Score: '', Percentage: '', CompletedAttributeCount :'',TotalAttributeCount :''},
    ///    DcApprovalProfileInfo: {
    ///        DcApprovalProfile: {},
    ///        DcApprovalLevelInfo: [],
    ///        DcApprovalUserDetails: [],
    ///    },
    ///    NextApprovalIndex: 0,(Current approval index)
    ///}
    // ],
    /// ApprovalInfo:{ApprovalUserId:'',ApprovalUserName:'','IsAllAttributes':'','IsReviewed':'',Comments:''}    
    /// OtherApprovalInfo:{}
    /// }
    /// </param> 
    /// <returns>true or false</returns>  
    this.Approve = function (Req) {
        try {

            OneViewConsole.Debug("Approve start", "DcApprovalBO.Approve");

            var IsSuccess = false;
            var _oOneViewSqlitePlugin = new OneViewSqlitePlugin();

            try {

                _oOneViewSqlitePlugin.StartTransaction();

                if (Req.DcOnDeviceApprovalInfo.length > 0) {
                   
                    var oDateTime = new DateTime();
                    var CurrenntDateAndTime = oDateTime.GetDateAndTime();

                    var DcOnDeviceApprovalInfo = Req.DcOnDeviceApprovalInfo;
                    var ApprovalInfo = Req.ApprovalInfo;
                    var OtherApprovalInfo = Req.OtherApprovalInfo;                   

                    var _oNormalizeDcApprovalEntity = new NormalizeDcApprovalEntity();
                    var _oNormalizeDcApprovalHistoryEntity = new NormalizeDcApprovalHistoryEntity();
                    

                    for (var i = 0; i < DcOnDeviceApprovalInfo.length; i++) {
                      
                        var DcInfo = DcOnDeviceApprovalInfo[i].DcInfo;                   
                        var DcApprovalProfile = DcOnDeviceApprovalInfo[i].DcApprovalProfileInfo.DcApprovalProfile;
                        var NextApprovalIndex = DcOnDeviceApprovalInfo[i].NextApprovalIndex;
                        var ServiceId=DcInfo.ServiceId;
                  
                        /***Update Datacpture isSubmit Start****/

                        if (DcOnDeviceApprovalInfo[i].NextApprovalIndex == 1) {
                            var _oDcApprovalDAO = new DcApprovalDAO();
                            _oDcApprovalDAO.UpdateDataCaptureSubmit({ ClientGuid: DcInfo.ClientGuid, IsSubmit: 'true', SubmitDate: CurrenntDateAndTime, IsSynchronized: 'false', TimeStamp: CurrenntDateAndTime });
                        }                       

                        /***Update Datacpture isSubmit End****/


                        /*********Insert DcApprovalEntity Start*********/
                        var Req = { ApprovalInfo: ApprovalInfo, DcInfo: DcInfo, DcApprovalProfile: DcApprovalProfile, NextApprovalIndex: NextApprovalIndex };
                        var DcApprovalReq = GetDcApprovalReq(Req);
                        DcApprovalReq.CurrenntDateAndTime = CurrenntDateAndTime;

                        var _oDcApprovalEntity = _oNormalizeDcApprovalEntity.Normalize(DcApprovalReq);

                        var _DcApprovalDAO = new DefaultMasterDAO("DcApprovalEntity");
                        _DcApprovalDAO.CreateMaster(_oDcApprovalEntity);

                        /***********Insert DcApprovalEntity End************/


                        /*********Insert DcApprovalHistoryEntity Start*********/
                        
                        var DcApprovalHistoryReq = GetDcApprovalHistoryReq({ DcApprovalEntity: _oDcApprovalEntity });
                        DcApprovalHistoryReq.CurrenntDateAndTime = CurrenntDateAndTime;
                       
                        var _oDcApprovalHistoryEntity = _oNormalizeDcApprovalHistoryEntity.Normalize(DcApprovalHistoryReq);
                      
                        var _DcApprovalHistoryDAO = new DefaultMasterDAO("DcApprovalHistoryEntity");
                        _DcApprovalHistoryDAO.CreateMaster(_oDcApprovalHistoryEntity);

                        /*********Insert DcApprovalHistoryEntity End*********/

                        var _oDcApprovalDAO = new DcApprovalDAO();               

                        //Insert DCApprovalOtherInfoEntity Start
                        var _oNormalizeDCApprovalOtherInfoEntity = new NormalizeDCApprovalOtherInfoEntity();
                        var _oDCApprovalOtherInfoEntity = _oNormalizeDCApprovalOtherInfoEntity.Normalize({ OtherApprovalInfo: OtherApprovalInfo, Latitude: '', Longitude: '' });
               


                        if (_oDCApprovalOtherInfoEntity != null) {
                            _oDCApprovalOtherInfoEntity.CreatedDate = CurrenntDateAndTime;

                            for (var j in OtherApprovalInfo) {
                                if (OtherApprovalInfo[j].OnDeviceApprovalControlConfig.Type == "AnonymousApproverSignatureApprovalType" && IsSignatureSupporting == true) {
                                    var _oNormalizeDCApprovalOtherInfoEntity = new NormalizeDCApprovalOtherInfoEntity();
                                    var _oMultiMediaBlobSubElements = null;
                                    _oMultiMediaBlobSubElements = _oNormalizeDCApprovalOtherInfoEntity.MultiMediaBlobSubElementsNormalize({ ServiceId: ServiceId, MappedEntityClientGuid: _oDCApprovalOtherInfoEntity.ClientGuid, Dimension: DATEntityType.DCApprovalOtherInfo, DataURL: OtherApprovalInfo[j].Answer, CreatedDate: CurrenntDateAndTime });

                                    var _MultiMediaBlobSubElements = new DefaultMasterDAO("MultiMediaBlobSubElements");
                                    _MultiMediaBlobSubElements.CreateMaster(_oMultiMediaBlobSubElements);

                                    _oDCApprovalOtherInfoEntity.IsBlobEnabled = 'true';
                                }
                            }


                            var _DCApprovalOtherDAO = new DefaultMasterDAO("DCApprovalOtherInfoEntity");
                            _DCApprovalOtherDAO.CreateMaster(_oDCApprovalOtherInfoEntity);

                            //UpdateDCApprovalOtherInfoId
                            _oDcApprovalDAO.UpdateDCApprovalOtherInfoId({ Id: _oDcApprovalEntity.Id, DCApprovalOtherInfoId: _oDCApprovalOtherInfoEntity.Id });

                        }
                        //Insert DCApprovalOtherInfoEntity End


                        /*********Update ApproveStatus in Datacapture Start*********/

                                          
                        var UpdateDcResultApproveReq = GetApproveStatusForDataCapture({ DcInfo: DcInfo, DcApprovalProfile: DcApprovalProfile, NextApprovalIndex: NextApprovalIndex, CurrenntDateAndTime: CurrenntDateAndTime });
                        _oDcApprovalDAO.UpdateDcResultApprove(UpdateDcResultApproveReq);

                        /*********Update ApproveStatus in Datacapture End*********/




                        IsSuccess = true;

                    }

                }

                _oOneViewSqlitePlugin.EndTransaction();

            }
            catch (Excep) {
                IsSuccess = false;
                _oOneViewSqlitePlugin.Rollback();
            }

            OneViewConsole.Debug("Approve end", "DcApprovalBO.Approve");
    
            return IsSuccess;
        }
        catch (Excep) {
           
            throw oOneViewExceptionHandler.Create("BO", "DcApprovalBO.Approve", Excep);
        }
    }

    /// <summary>
    /// GetApprovalReq
    /// </summary>
    /// <param name="Req">
    /// {
    ///     ApprovalInfo: {},
    ///     DcInfo: {},    
    ///     DcApprovalProfile: {},
    ///     NextApprovalIndex: 1 
    /// }
    /// </param>    
    /// <returns>
    /// { ServiceId: '', DcClientGuid: '', DcApprovalProfileId: '', ApprovalUserId: '', ApprovalUserName: '', IsAllAttributes: '', IsReviewed: '', ApprovalIndex: '', Comments: '', ApprovalStatus: '', CurrenntDateAndTime: '', Latitude: '', Longitude: '', IsMultiMediaAttached: '' }
    /// </returns>  
    var GetDcApprovalReq = function (Req) {
        try {

            OneViewConsole.Debug("GetDcApprovalReq start", "DcApprovalBO.GetDcApprovalReq");
          
            var DcApprovalReq = { ServiceId: '', DcClientGuid: '', DcApprovalProfileId: '', ApprovalUserId: '', ApprovalUserName: '', IsAllAttributes: '', IsReviewed: '', ApprovalIndex: '', Comments: '', ApprovalStatus: '', CurrenntDateAndTime: '', Latitude: '', Longitude: '', IsMultiMediaAttached: '' };
            var ApprovalInfo = Req.ApprovalInfo;
            var DcInfo = Req.DcInfo;
            var DcApprovalProfile = Req.DcApprovalProfile;
            var NextApprovalIndex = Req.NextApprovalIndex;
          
            DcApprovalReq.ApprovalUserId = ApprovalInfo.ApprovalUserId;
            DcApprovalReq.ApprovalUserName = ApprovalInfo.ApprovalUserName;
            DcApprovalReq.IsAllAttributes = ApprovalInfo.IsAllAttributes;
            DcApprovalReq.IsReviewed = ApprovalInfo.IsReviewed;
            DcApprovalReq.Comments = ApprovalInfo.Comments;
            DcApprovalReq.ApprovalStatus = 1;
            //DcApprovalReq.CurrenntDateAndTime = CurrenntDateAndTime;
           
            DcApprovalReq.ServiceId = DcInfo.ServiceId;
            DcApprovalReq.DcClientGuid = DcInfo.ClientGuid;
            DcApprovalReq.DcApprovalProfileId = DcApprovalProfile.ServerId;
            
            DcApprovalReq.ApprovalIndex = NextApprovalIndex;
           

            OneViewConsole.Debug("GetDcApprovalReq end", "DcApprovalBO.GetDcApprovalReq");
           
            return DcApprovalReq;

        }
        catch (Excep) {
  
            throw oOneViewExceptionHandler.Create("BO", "DcApprovalBO.GetDcApprovalReq", Excep);
        }
    }


    /// <summary>
    /// GetApprovalReq
    /// </summary>
    /// <param name="Req">
    /// {
    ///     DcApprovalEntity: {},
    /// }
    /// </param>    
    /// <returns>
    /// { ServiceId: '', DcApprovalId: '', PerivousApprovalStatus: '', CurrentApprovalStatus: '', ChangedByUserId: '', ChangedByUserName: '', CurrenntDateAndTime: '' }
    /// </returns>  
    var GetDcApprovalHistoryReq = function (Req) {
        try {

            OneViewConsole.Debug("GetDcApprovalHistoryReq start", "DcApprovalBO.GetDcApprovalHistoryReq");
    
            var DcApprovalHistoryReq = { ServiceId: '', DcApprovalId: '', PerivousApprovalStatus: '', CurrentApprovalStatus: '', ChangedByUserId: '', ChangedByUserName: '', CurrenntDateAndTime: '' };

            var _DcApprovalEntity = Req.DcApprovalEntity;

            DcApprovalHistoryReq.ServiceId = _DcApprovalEntity.ServiceId;
            DcApprovalHistoryReq.DcApprovalId = _DcApprovalEntity.Id;
            DcApprovalHistoryReq.CurrentApprovalStatus = _DcApprovalEntity.ApprovalStatus;
            DcApprovalHistoryReq.ChangedByUserId =_DcApprovalEntity.ApprovalUserId;
            DcApprovalHistoryReq.ChangedByUserName = _DcApprovalEntity.ApprovalUserName;

            var _DcApprovalHistoryDAO = new DcApprovalHistoryDAO();
            var _PerivousApprovalStatus = _DcApprovalHistoryDAO.GetPerivousApprovalStatus(_DcApprovalEntity.Id);

            if (_PerivousApprovalStatus.length > 0) {
                DcApprovalHistoryReq.PerivousApprovalStatus = _PerivousApprovalStatus[0].CurrentApprovalStatus;
            }

            OneViewConsole.Debug("GetDcApprovalHistoryReq end", "DcApprovalBO.GetDcApprovalHistoryReq");

            return DcApprovalHistoryReq;

        }
        catch (Excep) {

            throw oOneViewExceptionHandler.Create("BO", "DcApprovalBO.GetDcApprovalHistoryReq", Excep);
        }
    }


    /// <summary>
    /// GetApprovalReq
    /// </summary>
    /// <param name="Req">
    /// {
    ///        DcInfo: {},
    ///        DcApprovalProfile: {},
    ///        NextApprovalIndex: 0,(Current approval index)
    //         CurrenntDateAndTime: '',
    /// }
    /// </param>    
    /// <returns>
    /// { ClientGuid: '', ApprovalStatus: '', ApprovalStatusDate: Req.CurrenntDateAndTime, IsSynchronized: 'false', TimeStamp: Req.CurrenntDateAndTime }
    /// </returns>  
    var GetApproveStatusForDataCapture = function (Req) {
        try {

            OneViewConsole.Debug("GetApproveStatusForDataCapture start", "DcApprovalBO.GetApproveStatusForDataCapture");
      

            var DcApprovalProfile = DcApprovalProfile;
            var DcInfo = Req.DcInfo;

            var ApprovalStatusEnum = { None: 0, Approve: 1, Reject: 2, Pending: 3 };

            var ApproveStatusForDataCapture = { ClientGuid: '', ApprovalStatus: '', ApprovalStatusDate: Req.CurrenntDateAndTime, IsSynchronized: 'false', TimeStamp: Req.CurrenntDateAndTime,IsOnDeviceApprovalFinished:'false' }

            var ApprovalStatus = ApprovalStatusEnum.None;

            var DcApprovalProfile = Req.DcApprovalProfile;
            var OverallApprovalLevels = DcApprovalProfile.OverallApprovalLevels;
            var OnDeviceApprovalLevels = DcApprovalProfile.OnDeviceApprovalLevels;
           
            if (OverallApprovalLevels == Req.NextApprovalIndex) {
                ApprovalStatus = ApprovalStatusEnum.Approve;
            }

            if (OnDeviceApprovalLevels == Req.NextApprovalIndex) {
                ApproveStatusForDataCapture.IsOnDeviceApprovalFinished = 'true';
            }

            ApproveStatusForDataCapture.ClientGuid = DcInfo.ClientGuid;
            ApproveStatusForDataCapture.ApprovalStatus = ApprovalStatus;
     

            OneViewConsole.Debug("GetApproveStatusForDataCapture end", "DcApprovalBO.GetApproveStatusForDataCapture");

            return ApproveStatusForDataCapture;

        }
        catch (Excep) {

            throw oOneViewExceptionHandler.Create("BO", "DcApprovalBO.GetApproveStatusForDataCapture", Excep);
        }
    }


    /// <summary>
    /// Reject
    /// </summary>
    /// <param name="Req">
    /// {
    ///     ServiceId: 1,
    ///     DcUserId: 1,    
    ///     TemplateNodeId: 1,
    ///     DcPlaceId: 1,
    ///     DcPlaceType: 1,
    ///     DcClientGuids: [],
    /// }
    /// </param>    
    /// <returns>true or false</returns>  
    this.Reject = function (Req) {
        try {

            OneViewConsole.Debug("Reject start", "DcApprovalBO.Reject");

            OneViewConsole.Debug("Reject end", "DcApprovalBO.Reject");

        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "DcApprovalBO.Reject", Excep);
        }
    }

    ///TODO(23-09-2016 Siva)Need to restructre the code validation framework
    this.PreValidation = function (DcOnDeviceApprovalInfoLst) {
        var ValidationFailed = false;

        if (ValidationFailed == false) {
            ValidationFailed = PreApprovalAdvanceValidation(DcOnDeviceApprovalInfoLst);
        }
        if (ValidationFailed == false) {
            ValidationFailed = PreApprovalStorePinValidation(DcOnDeviceApprovalInfoLst);
        }

        return ValidationFailed;
    }

    var PreApprovalAdvanceValidation = function (DcOnDeviceApprovalInfoLst) {
        try {
            var ValidationFailed = false;
            var tempDcApprovalLevelInfo = '';
            for (var i = 0; i < DcOnDeviceApprovalInfoLst.length; i++) {
                var NextApprovalIndex = DcOnDeviceApprovalInfoLst[i].NextApprovalIndex;
                var oDcApprovalLevelInfo = getDcApprovalLevelInfo(DcOnDeviceApprovalInfoLst[i].DcApprovalProfileInfo.DcApprovalLevelInfo, NextApprovalIndex);
                if (i > 0) {
                    var currentoDcApprovalLevelInfoJSON = JSON.stringify(oDcApprovalLevelInfo);
                    if (currentoDcApprovalLevelInfoJSON != tempDcApprovalLevelInfo) {
                        ValidationFailed = true;
                        alert("Approval Config mismatch");
                        break;
                    }
                }
                else {
                    var tempDcApprovalLevelInfo = JSON.stringify(oDcApprovalLevelInfo);
                }
            }
            return ValidationFailed;
        } catch (e) {
            throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.SelectDC", Excep);
        }
    }

    var PreApprovalStorePinValidation = function (DcOnDeviceApprovalInfoLst) {
        try {

            var ValidationFailed = false;
            var TempPlaceId = '';
    
            var ISApprovalTypePin = false;
            for (var i = 0; i < DcOnDeviceApprovalInfoLst.length; i++) {

                var DcInfo = DcOnDeviceApprovalInfoLst[i].DcInfo;
             
                if (ISApprovalTypePin == false) {

                    var NextApprovalIndex = DcOnDeviceApprovalInfoLst[i].NextApprovalIndex;
                    var oDcApprovalLevelInfo = getDcApprovalLevelInfo(DcOnDeviceApprovalInfoLst[i].DcApprovalProfileInfo.DcApprovalLevelInfo, NextApprovalIndex);


                    var _oOnDeviceApprovalConfigJSON = JSON.parse(oDcApprovalLevelInfo.OnDeviceApprovalConfigJSON);
                    var _oOnDeviceApprovalConfigControls = _oOnDeviceApprovalConfigJSON.OnDeviceApprovalConfigControls;

                    for (var j = 0; j < _oOnDeviceApprovalConfigControls.length; j++) {

                        if (_oOnDeviceApprovalConfigControls[j].Type == "PinApprovalType") {
                            ISApprovalTypePin = true;
                            break;
                        }
                    }
                }

                if (ISApprovalTypePin == true) {
                    if (i > 0) {

                        if (DcInfo.DcPlaceId != TempPlaceId) {
                            ValidationFailed = true;
                            alert("Approval Config mismatch");
                            break;
                        }
                    }
                    else {
                        TempPlaceId = DcInfo.DcPlaceId;
                    }
                }
                else {
                    break;
                }
            }
            return ValidationFailed;
        } catch (e) {
           // alert(e + "...." + JSON.stringify(e));
            throw oOneViewExceptionHandler.Create("BO", "LandingPageFacade.SelectDC", Excep);
        }
    }

    var getDcApprovalLevelInfo = function (DcApprovalLevelInfoLst, NextApprovalIndex) {
        for (var i = 0; i < DcApprovalLevelInfoLst.length; i++) {
            if (DcApprovalLevelInfoLst[i].ApprovalIndex == NextApprovalIndex) {
                //  alert("getDcApprovalLevelInfo : " + JSON.stringify(DcApprovalLevelInfoLst[i]));
                return DcApprovalLevelInfoLst[i];
            }
        }
    }


}


function NormalizeDcApprovalEntity() {

    this.Normalize = function (Req) {

        OneViewConsole.Debug("Normalize start", "NormalizeDcApprovalEntity.Normalize");

        try {
            var _oDcApprovalEntity = new DcApprovalEntity();

            _oDcApprovalEntity.ClientGuid = OneViewUniqueGenerator.GetGuid();           
            _oDcApprovalEntity.MobileVersionId = 1;

            _oDcApprovalEntity.Type = DATEntityType.DCApproval;

            _oDcApprovalEntity.ServiceId = Req.ServiceId;
            _oDcApprovalEntity.DataCaptureClientGuid = Req.DcClientGuid;

           // _oDcApprovalEntity.DcResultsClientGuid = '';

            _oDcApprovalEntity.DcApprovalProfileId = Req.DcApprovalProfileId;
            _oDcApprovalEntity.ApprovalUserId = Req.ApprovalUserId;
            _oDcApprovalEntity.ApprovalUserName = Req.ApprovalUserName;     

            _oDcApprovalEntity.IsAllAttributes = Req.IsAllAttributes;
            _oDcApprovalEntity.IsReviewed = Req.IsReviewed;

            //_oDcApprovalEntity.Rating = '';

            _oDcApprovalEntity.ApprovalIndex = Req.ApprovalIndex;
            _oDcApprovalEntity.Comments = Req.Comments;

            _oDcApprovalEntity.ApprovalStatus = Req.ApprovalStatus;
            _oDcApprovalEntity.ApprovalStatusDate = Req.CurrenntDateAndTime;

            _oDcApprovalEntity.Latitude = Req.Latitude;
            _oDcApprovalEntity.Longitude = Req.Longitude;

            _oDcApprovalEntity.IsMultiMediaAttached = Req.IsMultiMediaAttached;
            _oDcApprovalEntity.IsSynchronized = 'false';
            _oDcApprovalEntity.IsDisable = 'false';

            _oDcApprovalEntity.CreatedDate = Req.CurrenntDateAndTime;

            OneViewConsole.Debug("Normalize end", "NormalizeDcApprovalEntity.Normalize");

            return _oDcApprovalEntity;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalize", "NormalizeDcApprovalEntity.Normalize", Excep);
        }
    }

}

function NormalizeDcApprovalHistoryEntity() {

    this.Normalize = function (Req) {

        OneViewConsole.Debug("Normalize start", "NormalizeDcApprovalHistoryEntity.Normalize");

        try {
            var _oDcApprovalHistoryEntity = new DcApprovalHistoryEntity();
            
            _oDcApprovalHistoryEntity.ClientGuid = OneViewUniqueGenerator.GetGuid();
            _oDcApprovalHistoryEntity.MobileVersionId = 1;

            _oDcApprovalHistoryEntity.Type = DATEntityType.DCApprovalHistory;

            _oDcApprovalHistoryEntity.ServiceId = Req.ServiceId;
            _oDcApprovalHistoryEntity.DcApprovalId = Req.DcApprovalId;
            _oDcApprovalHistoryEntity.PerivousApprovalStatus = Req.PerivousApprovalStatus;
         
            _oDcApprovalHistoryEntity.CurrentApprovalStatus = Req.CurrentApprovalStatus;
            _oDcApprovalHistoryEntity.ChangedByUserId = Req.ChangedByUserId;
            _oDcApprovalHistoryEntity.ChangedByUserName = Req.ChangedByUserName;
            _oDcApprovalHistoryEntity.IsSynchronized = 'false';
            _oDcApprovalHistoryEntity.IsDisable = 'false';

            _oDcApprovalHistoryEntity.CreatedDate = Req.CurrenntDateAndTime;

            OneViewConsole.Debug("Normalize end", "NormalizeDcApprovalHistoryEntity.Normalize");

            return _oDcApprovalHistoryEntity;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalize", "NormalizeDcApprovalHistoryEntity.Normalize", Excep);
        }
    }

}

function NormalizeDCApprovalOtherInfoEntity() {

    this.Normalize = function (Req) {

        OneViewConsole.Debug("Normalize start", "NormalizeDCApprovalOtherInfoEntity.Normalize");

        try {

            var _oDCApprovalOtherInfoEntity = null;
            var OtherApprovalInfo = Req.OtherApprovalInfo;
            var IsOtherApprovalInfo = false;
            for (var i in OtherApprovalInfo) {
                if (OtherApprovalInfo[i].OnDeviceApprovalControlConfig.Type == "AnonymousApproverNameApprovalType" || OtherApprovalInfo[i].OnDeviceApprovalControlConfig.Type == "AnonymousApproverPositionApprovalType" || OtherApprovalInfo[i].OnDeviceApprovalControlConfig.Type == "AnonymousApproverLeadNameApprovalType" || OtherApprovalInfo[i].OnDeviceApprovalControlConfig.Type == "AnonymousApproverSignatureApprovalType") {
                    //OtherApprovalInfo: OtherApprovalInfo[i].OnDeviceApprovalControlConfig, Answer: OtherApprovalInfo[i].Answer, AnswerValue: OtherApprovalInfo[i].AnswerValue, Latitude: '', Longitude: ''

                    var ApprovalType = OtherApprovalInfo[i].OnDeviceApprovalControlConfig.Type;

                    var Answer = OtherApprovalInfo[i].Answer;
                    var AnswerValue = OtherApprovalInfo[i].AnswerValue;

                    if (IsOtherApprovalInfo == false) {
                        IsOtherApprovalInfo = true;
                        _oDCApprovalOtherInfoEntity = new DCApprovalOtherInfoEntity();
                        _oDCApprovalOtherInfoEntity.ClientGuid = OneViewUniqueGenerator.GetGuid();
                        _oDCApprovalOtherInfoEntity.MobileVersionId = 1;

                        _oDCApprovalOtherInfoEntity.Type = DATEntityType.DCApprovalOtherInfo;
                    }



                    if (ApprovalType == "AnonymousApproverNameApprovalType") {
                        _oDCApprovalOtherInfoEntity.AnonymousApproverName = Answer;

                    }

                    if (ApprovalType == "AnonymousApproverSignatureApprovalType") {
                        if (IsSignatureSupporting == false) {
                            _oDCApprovalOtherInfoEntity.AnonymousApproverAlternateNameForSignature = Answer;
                        }
                    }
                    if (ApprovalType == "AnonymousApproverPositionApprovalType") {
                        _oDCApprovalOtherInfoEntity.AnonymousApproverPosition = Answer;
                    }
                    if (ApprovalType == "AnonymousApproverLeadNameApprovalType") {
                        _oDCApprovalOtherInfoEntity.AnonymousApproverLeadName = Answer;
                    }

                    if (ApprovalType == "TextBoxOtherApprovalInfoControls") {
                        _oDCApprovalOtherInfoEntity[OtherApprovalInfo.CustomColumName] = Answer;
                    }
                    _oDCApprovalOtherInfoEntity.IsBlobEnabled = 'false';
                    _oDCApprovalOtherInfoEntity.IsDisable = 'false';

                    //  _oDCApprovalOtherInfoEntity.Latitude = Req.Latitude;
                    // _oDCApprovalOtherInfoEntity.Longitude = Req.Longitude;

                    _oDCApprovalOtherInfoEntity.IsSynchronized = 'false';

                    /*Need to Add based on Server config */

                    //_oDCApprovalOtherInfoEntity.BooleanColumn1 = Req.BooleanColumn1;
                    //_oDCApprovalOtherInfoEntity.BooleanColumn2 = Req.BooleanColumn2;

                    //_oDCApprovalOtherInfoEntity.IntColumn1 = Req.IntColumn1;
                    //_oDCApprovalOtherInfoEntity.IntColumn2 = Req.IntColumn2;

                    //_oDCApprovalOtherInfoEntity.DateTimeColumn1 = Req.DateTimeColumn1;
                    //_oDCApprovalOtherInfoEntity.DateTimeColumn2 = Req.DateTimeColumn2;
                }
            }

            return _oDCApprovalOtherInfoEntity;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalize", "NormalizeDCApprovalOtherInfoEntity.Normalize", Excep);
        }
    }

    this.MultiMediaBlobSubElementsNormalize = function (Req) {

        OneViewConsole.Debug("Normalize start", "MultiMediaBlobSubElementsNormalize.Normalize");

        try {
            var _oMultiMediaBlobSubElements = new MultiMediaBlobSubElements();
          
            _oMultiMediaBlobSubElements.ClientGuid = OneViewUniqueGenerator.GetGuid();
            _oMultiMediaBlobSubElements.MobileVersionId = 1;
            _oMultiMediaBlobSubElements.ServiceId = Req.ServiceId;

            _oMultiMediaBlobSubElements.Type = DATEntityType.MultiMediaBlobSubElements;
        
            _oMultiMediaBlobSubElements.MappedEntityClientGuid = Req.MappedEntityClientGuid;       
            _oMultiMediaBlobSubElements.Dimension = Req.Dimension;
         
            _oMultiMediaBlobSubElements.MultiMediaType = "image/png";
            _oMultiMediaBlobSubElements.DataURL = Req.DataURL;
  
            _oMultiMediaBlobSubElements.IsSynchronized = "false";
            _oMultiMediaBlobSubElements.CreatedDate = Req.CreatedDate;

            return _oMultiMediaBlobSubElements;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("Normalize", "MultiMediaBlobSubElementsNormalize.Normalize", Excep);
        }
    }

}
