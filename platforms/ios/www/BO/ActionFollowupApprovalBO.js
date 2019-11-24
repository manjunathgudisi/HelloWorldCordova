// ############################################################################################################## //
// ActionFollowupApprovalBO
// Created User : Aiswarya

// Last Updated User : Aiswarya
// Last Updated Date : 20-08-2017
/***********Multiplelevel approve not implemented******************* */
/***********"PlaceId": -1, "PlaceDimension": 16 hardcoded******************** */
/************ActionResolveInfo in response not added*************************** */

// ############################################################################################################## //


function ActionFollowupApprovalBO() {

    var _oActionFollowUpApprovalProfileDAO = new ActionFollowUpApprovalProfileDAO();

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
    ///     PlaceDimension:16,
    ///     ActionClientGuidLst: [],
    /// }
    /// </param>   
    /// <returns>
    ///[{
    ///   ActionResolveInfo:  { ClientGuid: '', TemplateNodeId: '', TemplateNodeName: '', DcPlaceId: '', DcPlaceName: ''},
    ///    ActionFollowupApprovalProfileInfo: {
    ///        ActionFollowUpApprovalProfile: {},
    ///        ActionFollowupApprovalLevelInfo: [],
    ///        ActionFollowupApprovalUserDetails: [],
    /// },
    ///    NextApprovalIndex: 0,
    ///},
    ///];
    ///</returns>  

  
    this.GetActionFollowUpApprovalInfo = function (Req) {
        try {
            OneViewConsole.Debug("GetActionFollowUpApprovalInfo start", "DcApprovalBO.GetActionFollowUpApprovalInfo");
            
            var Response = [];

            var RespObj = {
                ActionResolveInfo: {},
                ActionFollowUpApprovalProfileInfo: {},
                NextApprovalIndex: 0,
            };

          

            var ApprovalProfileReq = {
                "ServiceId": Req.ServiceId, "PlaceId":  Req.PlaceId, "PlaceDimension": Req.ServiceId, 
                //"DCPlaceRCOType": Req.DCPlaceRCOType,
                "TemplateNodeId": Req.TemplateNodeId, "UserId": Req.UserId,ActionDetailsId:Req.ActionDetailsId,ActionFollowUpUserId:-1
            }
            var ApprovalProfile = GetActionFollowUpApprovalProfile(ApprovalProfileReq);
            
            if (ApprovalProfile != null) {        
                RespObj.ActionFollowUpApprovalProfileInfo = ApprovalProfile.ActionFollowUpApprovalProfileInfo;

                Response.push(RespObj);
            }
           
            return Response;
           
           
        } catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowupApprovalBO.GetActionFollowUpApprovalInfo", Excep);
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
    ///     PlaceDimension: 1,
    ///     PlaceRCOType: 1
    ///     TemplateNodeId:16,
    ///     UserId: 1,
    /// }
    /// </param>   
    /// <returns>
    ///{  
    ///    ActionFollowUpApprovalProfileInfo: {
    ///        ActionFollowupApprovalProfile: {},
    ///        ActionFollowupApprovalLevelInfo: [],
    ///        ActionFollowupApprovalUserDetails: [],
    /// },
    /// }
    ///</returns> 
    var GetActionFollowUpApprovalProfile = function (Req) {
        try {
            OneViewConsole.Debug("GetActionFollowUpApprovalProfile start", "DcApprovalBO.GetActionFollowUpApprovalProfile");

            var Response = {
                ActionFollowUpApprovalProfileInfo: {
                    ActionFollowUpApprovalProfile: {},
                    ActionFollowUpApprovalLevelInfo: [],
                    ActionFollowUpApprovalUserDetails: [],
                },
            };

           /* var ApprovalSearchKey = Req.UserId + "_" + Req.TemplateNodeId + "_" + Req.PlaceId + "_" + Req.DcPlaceDimension;

            if (TempApprovalProfile[ApprovalSearchKey] != null) {
                Response = TempApprovalProfile[ApprovalSearchKey];               
            }
            else {*/
                /***************Checking FollowUpUserid by ByActionDetailsId to get Approval Profile by FollowupuserId also**************** */
                var ActionFollowUpLst=_oActionFollowUpApprovalProfileDAO.GetFollowUpUserByActionDetailsId(Req);
                //alert("ActionFollowUpLst :"+JSON.stringify(ActionFollowUpLst));
                
                if(ActionFollowUpLst.length>0){
                    var ActionFollowUpUserId=ActionFollowUpLst[0].FollowUpUserId;
                    Req.ActionFollowUpUserId=ActionFollowUpUserId;
                    //alert("ActionDetailsId : "+Req.ActionDetailsId+"....Req.ActionFollowUpUserId : "+Req.ActionFollowUpUserId);
                }
                /***************Checking FollowUpUserid by ByActionDetailsId to get Approval Profile by FollowupuserId also**************** */
               
                //alert("")

                var ActionFollowupApprovalProfileLst = _oActionFollowUpApprovalProfileDAO.GetByAllDimensions(Req);
                
                if (ActionFollowupApprovalProfileLst.length == 0) {                    
                    Response = null;
                }
                else if (ActionFollowupApprovalProfileLst.length > 0) {

                    Response.ActionFollowUpApprovalProfileInfo.ActionFollowUpApprovalProfile = ActionFollowupApprovalProfileLst[0];

                    ApprovalPrfoileResponse = GetActionFollowUpApprovalLevelAndUserDetails(ActionFollowupApprovalProfileLst[0]);
                    Response.ActionFollowUpApprovalProfileInfo.ActionFollowUpApprovalLevelInfo = ApprovalPrfoileResponse.ActionFollowupApprovalLevelInfo;
                    Response.ActionFollowUpApprovalProfileInfo.ActionFollowUpApprovalUserDetails = ApprovalPrfoileResponse.ActionFollowupApprovalUserDetails;
                   
                    //TempApprovalProfile[ApprovalSearchKey] = Response;

                }

            //}

            OneViewConsole.Debug("GetActionFollowUpApprovalProfile end", "ActionFollowupApprovalBO.GetActionFollowUpApprovalProfile");

            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowupApprovalBO.GetActionFollowUpApprovalProfile", Excep);
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

    var GetActionFollowUpApprovalLevelAndUserDetails = function (oActionFollowupApprovalProfile) {
        try {
            OneViewConsole.Debug("GetActionFollowUpApprovalLevelAndUserDetails start", "ActionFollowupApprovalBO.GetActionFollowUpApprovalLevelAndUserDetails");
            
            var Response = {
                ActionFollowupApprovalLevelInfo: [],
                ActionFollowupApprovalUserDetails: [],
            }

            var ActionFollowupApprovalProfileId = oActionFollowupApprovalProfile.Id;
            var ActionFollowupApprovalLevelInfoDetailsLst = GetActionFollowUpApprovalLevelInfoDetails(ActionFollowupApprovalProfileId);
            
            if (ActionFollowupApprovalLevelInfoDetailsLst.length > 0) {

                Response.ActionFollowupApprovalLevelInfo=ActionFollowupApprovalLevelInfoDetailsLst;
        
                for (var i = 0; i < ActionFollowupApprovalLevelInfoDetailsLst.length; i++) {

                    if (ActionFollowupApprovalLevelInfoDetailsLst[i].IsAnonymousUser != "true") {

                        //var DcApprovalLevelInfoId = ActionFollowupApprovalLevelInfoDetailsLst[i].Id;

                        var _ActionFollowUpApprovalUserDetailsLst = GetActionFollowUpApprovalUserDetails(ActionFollowupApprovalProfileId);
                        
                        if (_ActionFollowUpApprovalUserDetailsLst.length > 0) {
                            Response.ActionFollowupApprovalUserDetails=_ActionFollowUpApprovalUserDetailsLst;
                        }
                    }

                }


            }

         
            OneViewConsole.Debug("GetActionFollowUpApprovalLevelAndUserDetails end", "ActionFollowupApprovalBO.GetActionFollowUpApprovalLevelAndUserDetails");

            return Response;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowupApprovalBO.GetActionFollowUpApprovalLevelAndUserDetails", Excep);
        }
    }

    /// <summary>
    /// GetActionFollowUpApprovalLevelInfoDetails
    /// </summary>
    /// <param >
    ///ActionFollowUpApprovalProfileId
    /// </param>   
    /// <returns>
    /// ActionFollowupApprovalLevelInfoDetails from Database  
    ///</returns>

    var GetActionFollowUpApprovalLevelInfoDetails = function (ActionFollowUpApprovalProfileId) {
        try {
            OneViewConsole.Debug("GetActionFollowUpApprovalLevelInfoDetails start", "ActionFollowupApprovalBO.GetActionFollowUpApprovalLevelInfoDetails");

            var _ActionFollowUpApprovalLevelInfoDAO = new ActionFollowUpApprovalLevelInfoDAO();
            var ActionFollowupApprovalLevelInfoDetailsLst = _ActionFollowUpApprovalLevelInfoDAO.GetByAllDimensions(ActionFollowUpApprovalProfileId);

            OneViewConsole.Debug("GetActionFollowUpApprovalLevelInfoDetails end", "ActionFollowupApprovalBO.GetActionFollowUpApprovalLevelInfoDetails");

            return ActionFollowupApprovalLevelInfoDetailsLst;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowupApprovalBO.GetActionFollowUpApprovalLevelInfoDetails", Excep);
        }
    }

    /// <summary>
    /// GetActionFollowUpApprovalUserDetails
    /// </summary>
    /// <param >
    ///DcApprovalLevelInfoId
    /// </param>   
    /// <returns>
    /// DcApprovalUserDetails from Database
    /// }
    ///</returns>

    var GetActionFollowUpApprovalUserDetails = function (ActionFollowUpApprovalProfileId) {
        try {
            OneViewConsole.Debug("GetActionFollowUpApprovalUserDetails start", "ActionFollowupApprovalBO.GetActionFollowUpApprovalUserDetails");

            var _ActionFollowUpApprovalUserDetailsDAO = new ActionFollowUpApprovalUserDetailsDAO();
            var Result = _ActionFollowUpApprovalUserDetailsDAO.GetByAllDimensions(ActionFollowUpApprovalProfileId);

            OneViewConsole.Debug("GetActionFollowUpApprovalUserDetails end", "ActionFollowupApprovalBO.GetActionFollowUpApprovalUserDetails");

            return Result;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("BO", "ActionFollowupApprovalBO.GetActionFollowUpApprovalUserDetails", Excep);
        }
    }


 /// <summary>
    /// Approve
    /// </summary>
    /// <param name=("Req")>   

/*
    /// Req : {
    /// ActionResolveOnDeviceApprovalInfo :
    //[{
    ///   ActionResolveInfo:  { ClientGuid: '', TemplateNodeId: '', TemplateNodeName: '', DcPlaceId: '', DcPlaceName: '',ServiceId:''},
    ///    ActionFollowupApprovalProfileInfo: {
    ///        ActionFollowUpApprovalProfile: {},
    ///        ActionFollowupApprovalLevelInfo: [],
    ///        ActionFollowupApprovalUserDetails: [],
    ///    },
    ///    NextApprovalIndex: 0,(Current approval index)
    ///}
    // ],    
      ActionResolveApprovalInfo:{
    "ApprovalUserId": 0,
    "ApprovalUserName": "",
    'IsAllAttributes': false,
    "IsReviewed": false,
    "Latitude": "",
    "Longitude": "",
    "IsMultiMediaAttached": false,
    "Comments": ""
    },
     ActionResolveOtherApprovalInfo:{}   
    /// }
    /// </param> 
    /// <returns>true or false</returns>  

 */

     this.Approve = function (Req) {
        try {

            OneViewConsole.Debug("Approve start", "ActionFollowupApprovalBO.Approve");

            var IsSuccess = false;
            var _oOneViewSqlitePlugin = new OneViewSqlitePlugin();

            try {

                _oOneViewSqlitePlugin.StartTransaction();

            var _oActionFollowUpApprovalDAO=new ActionFollowUpApprovalDAO();
            var oDateTime = new DateTime();
            var CurrenntDateAndTime = oDateTime.GetDateAndTime();
            var _oNormalizeActionResolveApprovalEntity = new NormalizeActionResolveApprovalEntity();


            if (Req.ActionResolveOnDeviceApprovalInfo.length > 0) {

                var ActionResolveOnDeviceApprovalInfo=Req.ActionResolveOnDeviceApprovalInfo;

                var DcOnDeviceApprovalInfo = Req.DcOnDeviceApprovalInfo;
                var ActionResolveApprovalInfo = Req.ActionResolveApprovalInfo;
                var ActionResolveOtherApprovalInfo = Req.ActionResolveOtherApprovalInfo; 


                for (var i = 0; i < ActionResolveOnDeviceApprovalInfo.length; i++) {

                    var ActionResolveInfo=ActionResolveOnDeviceApprovalInfo[i].ActionResolveInfo[0];
                    var ActionFollowUpApprovalProfile = ActionResolveOnDeviceApprovalInfo[i].ActionFollowUpApprovalProfileInfo.ActionFollowUpApprovalProfile;
                    var NextApprovalIndex = ActionResolveOnDeviceApprovalInfo[i].NextApprovalIndex;
                    var ServiceId=ActionResolveInfo.ServiceId;



                     /***Update ActionResolveEntity isSubmit Start(Need to change once Multilevel approval implementing 23/08/18)****/

                     //if (NextApprovalIndex == 1) {  
                         //alert("ActionResolveInfo : "+JSON.stringify(ActionResolveInfo));             
                        _oActionFollowUpApprovalDAO.UpdateActionResolveSubmit({ ClientGuid: ActionResolveInfo.ClientGuid, IsSubmit: 'true', SubmitDate: CurrenntDateAndTime, IsSynchronized: 'false', TimeStamp: CurrenntDateAndTime });
                     //}                       
                 
                     /***Update ActionResolveEntity isSubmit End****/
                 
                     /*********Insert DcApprovalEntity Start*********/
                     var ReqForApprovalEntity = { ActionResolveApprovalInfo: ActionResolveApprovalInfo, ActionResolveInfo: ActionResolveInfo, ActionFollowUpApprovalProfile: ActionFollowUpApprovalProfile, NextApprovalIndex: NextApprovalIndex };
                     var ActionResolveApprovalReq = GetActionResolveApprovalReq(ReqForApprovalEntity);
                     ActionResolveApprovalReq.CurrenntDateAndTime = CurrenntDateAndTime;
                     
                     var NormalizeActionResolveApprovalLst = _oNormalizeActionResolveApprovalEntity.Normalize(ActionResolveApprovalReq);
                     
                     var _oDefaultMasterDAO = new DefaultMasterDAO("ActionResolveApprovalEntity");
                     _oDefaultMasterDAO.CreateMaster(NormalizeActionResolveApprovalLst);                
                    
                 
                     /***********Insert DcApprovalEntity End************/

                    /*********Insert Multimediasubelemnt Start*********/

                    var ActionResolveApprovalMultiMediaInfo=Req.ActionResolveApprovalMultiMediaInfo;
                    if(ActionResolveApprovalMultiMediaInfo.length>0){
                        
                        var ReqForApprovalMultiMedia ={ActionResolveApprovalMultiMediaInfo:ActionResolveApprovalMultiMediaInfo,CurrentActionResolveApprovalClientGuid:NormalizeActionResolveApprovalLst.ClientGuid};
                        var _oNormalizeMultiMediaForActionResolveApprovalEntity=new NormalizeMultiMediaForActionResolveApprovalEntity();
                        _oNormalizeMultiMediaForActionResolveApprovalEntity.Normalize(ReqForApprovalMultiMedia);
                    }

                    /*********Insert Multimediasubelemnt End***********/



                    /*********Update ApproveStatus in Datacapture Start(Need to change once Multilevel approval implementing 23/08/18)*********/
                    
                     var ApproveStatusReq = { ClientGuid: ActionResolveInfo.ClientGuid, ApprovalStatus: 1, ApprovalStatusDate: CurrenntDateAndTime, IsSynchronized: 'false', TimeStamp: CurrenntDateAndTime,IsOnDeviceApprovalFinished:'true' }
                    _oActionFollowUpApprovalDAO.UpdateActionResolveForApprove(ApproveStatusReq);

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
            OneViewConsole.Debug("Approve End", "ActionFollowupApprovalBO.Approve");

            return IsSuccess;
            
        }
        catch (Excep) {
            //alert("Excep : "+JSON.stringify(Excep)+Excep);
            throw oOneViewExceptionHandler.Create("ActionFollowupApprovalBO", "ActionFollowupApprovalBO.Approve", Excep);
        }
    }


    /// <summary>
    /// GetApprovalReq
    /// </summary>
    /// <param name="Req">
    /// {
    ///     ActionResolveOnDeviceApprovalInfo: {},
    ///     ActionResolveInfo: {},    
    ///     ActionFollowUpApprovalProfile: {},
    ///     NextApprovalIndex: 1 
    /// }
    /// </param>    
    /// <returns>
    /// { ServiceId: '', ActionResolveClientGuid: '', DcApprovalProfileId: '', ApprovalUserId: '', ApprovalUserName: '',  ApprovalIndex: '', Comments: '', ApprovalStatus: '', CurrenntDateAndTime: '', Latitude: '', Longitude: '', IsMultiMediaAttached: '' }
    /// </returns>  
    var GetActionResolveApprovalReq = function (Req) {
        try {

            OneViewConsole.Debug("GetActionResolveApprovalReq start", "DcApprovalBO.GetActionResolveApprovalReq");
          
            
            var ActionResolveApprovalReq = { ServiceId: '', ActionResolveClientGuid: '', ActionFollowUpApprovalProfileId: '', ApprovalUserId: '', ApprovalUserName: '',  ApprovalIndex: '', Comments: '', ApprovalStatus: '', CurrenntDateAndTime: '', Latitude: '', Longitude: '', IsMultiMediaAttached: '' };
            var ApprovalInfo = Req.ActionResolveApprovalInfo;
            var ActionResolveInfo = Req.ActionResolveInfo;
            var ActionFollowUpApprovalProfile = Req.ActionFollowUpApprovalProfile;
            var NextApprovalIndex = Req.NextApprovalIndex;
          
            ActionResolveApprovalReq.ApprovalUserId = ApprovalInfo.ApprovalUserId;
            ActionResolveApprovalReq.ApprovalUserName = ApprovalInfo.ApprovalUserName;
            //DcApprovalReq.IsAllAttributes = ApprovalInfo.IsAllAttributes;
           //DcApprovalReq.IsReviewed = ApprovalInfo.IsReviewed;
           ActionResolveApprovalReq.Comments = ApprovalInfo.Comments;
            
           ActionResolveApprovalReq.ApprovalStatus = 1;
            //DcApprovalReq.CurrenntDateAndTime = CurrenntDateAndTime;
            
            ActionResolveApprovalReq.ServiceId = ActionResolveInfo.ServiceId;
            ActionResolveApprovalReq.ActionResolveClientGuid = ActionResolveInfo.ClientGuid;
            ActionResolveApprovalReq.ActionFollowUpApprovalProfileId = ActionFollowUpApprovalProfile.ServerId;
            
            ActionResolveApprovalReq.ApprovalIndex = NextApprovalIndex;
           

            //alert("GetActionResolveApprovalReq : "+JSON.stringify(DcApprovalReq));

            OneViewConsole.Debug("GetActionResolveApprovalReq end", "DcApprovalBO.GetActionResolveApprovalReq");
           
            return ActionResolveApprovalReq;

        }
        catch (Excep) {
  
            throw oOneViewExceptionHandler.Create("BO", "DcApprovalBO.GetActionResolveApprovalReq", Excep);
        }
    }



    this.UpdateApprove =function(Req){
        try {

            OneViewConsole.Debug("UpdateApprove start", "ActionFollowupApprovalBO.UpdateApprove");
           
            var IsSuccess = false;
            var _oOneViewSqlitePlugin = new OneViewSqlitePlugin();

            try {
                
                _oOneViewSqlitePlugin.StartTransaction();

                var ActionResolveApprovalDataLst=Req.ActionResolveApprovalDataLst;
                var Id=ActionResolveApprovalDataLst[0].Id;
                var ActionResolveApprovalClientGuid=ActionResolveApprovalDataLst[0].ClientGuid;                

                var oDateTime = new DateTime();
                var CurrenntDateAndTime = oDateTime.GetDateAndTime();
                // Comments='" + Req.Comments + "',ApprovalStatusDate='" + Req.ApprovalStatusDate + "',IsSynchronized='" + Req.IsSynchronized + "'  Where Id='" + Req.Id + "'";
                var Updateparam={Comments:Req.Comments,ApprovalStatusDate:CurrenntDateAndTime,IsSynchronized:'false',Id:Id};
                
                
                var _oActionFollowUpApprovalDAO=new ActionFollowUpApprovalDAO();
                _oActionFollowUpApprovalDAO.UpdateActionResolveApprovalById(Updateparam);

                
                /*********Insert Multimediasubelemnt Start*********/

                var ActionResolveApprovalMultiMediaInfo=Req.ActionResolveApprovalMultiMediaInfo;
                if(ActionResolveApprovalMultiMediaInfo.length>0){                   
                    
                    var ReqForApprovalMultiMedia ={ActionResolveApprovalMultiMediaInfo:ActionResolveApprovalMultiMediaInfo,CurrentActionResolveApprovalClientGuid:ActionResolveApprovalClientGuid};
                    var _oNormalizeMultiMediaForActionResolveApprovalEntity=new NormalizeMultiMediaForActionResolveApprovalEntity();
                    _oNormalizeMultiMediaForActionResolveApprovalEntity.Normalize(ReqForApprovalMultiMedia);
                }

                /*********Insert Multimediasubelemnt End***********/
            


                _oOneViewSqlitePlugin.EndTransaction();

            }
            catch (Excep) {
                IsSuccess = false;
                _oOneViewSqlitePlugin.Rollback();
            }
            OneViewConsole.Debug("UpdateApprove End", "ActionFollowupApprovalBO.UpdateApprove");

            return IsSuccess;

           
            
        }
        catch (Excep) {
            //alert("Excep : "+JSON.stringify(Excep)+Excep);
            throw oOneViewExceptionHandler.Create("ActionFollowupApprovalBO", "ActionFollowupApprovalBO.Approve", Excep);
        }
    }

    this.DeleteApprove =function(Req){
        try {

            OneViewConsole.Debug("DeleteApprove start", "ActionFollowupApprovalBO.DeleteApprove");           
            var IsSuccess = false;
            var _oOneViewSqlitePlugin = new OneViewSqlitePlugin();

            try {
                _oOneViewSqlitePlugin.StartTransaction();

                var ActionResolveApprovalDataLst=Req.ActionResolveApprovalDataLst;
                var Id=ActionResolveApprovalDataLst[0].Id;
                var ActionResolveApprovalClientGuid=ActionResolveApprovalDataLst[0].ClientGuid;

                var _oActionFollowUpApprovalDAO=new ActionFollowUpApprovalDAO();

                var oDateTime = new DateTime();
                var CurrenntDateAndTime = oDateTime.GetDateAndTime();

                var ApproveStatusReq = { ResolveClientGuid: Req.ResolveClientGuid,IsSubmit: 'false', SubmitedDate: "", ApprovalStatus: 0, ApprovalStatusDate: "", IsSynchronized: 'false', TimeStamp: CurrenntDateAndTime,IsOnDeviceApprovalFinished:'false' }
                
                _oActionFollowUpApprovalDAO.UpdateApprovalStatusInActionResolveByClientGuid(ApproveStatusReq);
                _oActionFollowUpApprovalDAO.DeleteActionResolveApprovalById({Id:Id});
                
                var _oMultiMediaSubElementsDAO = new MultiMediaSubElementsDAO();
                _oMultiMediaSubElementsDAO.DeleteByMappedEntityClientGuid(ActionResolveApprovalClientGuid);

                _oOneViewSqlitePlugin.EndTransaction();

            }
            catch (Excep) {
                IsSuccess = false;
                _oOneViewSqlitePlugin.Rollback();
            }
                
            OneViewConsole.Debug("DeleteApprove End", "ActionFollowupApprovalBO.DeleteApprove");

            return IsSuccess;
            
        }
        catch (Excep) {
            //alert("Excep : "+JSON.stringify(Excep)+Excep);
            throw oOneViewExceptionHandler.Create("ActionFollowupApprovalBO", "ActionFollowupApprovalBO.DeleteApprove", Excep);
        }
    }

}



function NormalizeActionResolveApprovalEntity() {

    this.Normalize = function (Req) {

        OneViewConsole.Debug("Normalize start", "NormalizeActionResolveApprovalEntity.Normalize");

        try {
            var _oActionResolveApprovalEntity = new ActionResolveApprovalEntity();
            
            _oActionResolveApprovalEntity.ClientGuid = OneViewUniqueGenerator.GetGuid();           
            _oActionResolveApprovalEntity.MobileVersionId = 1;

            _oActionResolveApprovalEntity.Type = DATEntityType.ActionFollowUpStatusApproval;

            _oActionResolveApprovalEntity.ServiceId = Req.ServiceId;
            _oActionResolveApprovalEntity.ActionResolveClientGuid = Req.ActionResolveClientGuid;

            _oActionResolveApprovalEntity.ActionFollowUpApprovalProfileId = Req.ActionFollowUpApprovalProfileId;
           _oActionResolveApprovalEntity.ApprovalUserId = Req.ApprovalUserId;
           _oActionResolveApprovalEntity.ApprovalUserName = Req.ApprovalUserName;     

            _oActionResolveApprovalEntity.ApprovalIndex = Req.ApprovalIndex;

            Req.Comments=removeSpecialCharacter(Req.Comments);
            _oActionResolveApprovalEntity.Comments = Req.Comments;

            _oActionResolveApprovalEntity.ApprovalStatus = Req.ApprovalStatus;
            _oActionResolveApprovalEntity.ApprovalStatusDate = Req.CurrenntDateAndTime;

            _oActionResolveApprovalEntity.Latitude = Req.Latitude;
            _oActionResolveApprovalEntity.Longitude = Req.Longitude;

            _oActionResolveApprovalEntity.IsMultiMediaAttached = Req.IsMultiMediaAttached;
            _oActionResolveApprovalEntity.IsSynchronized = 'false';
            _oActionResolveApprovalEntity.IsDisable = 'false';

            _oActionResolveApprovalEntity.CreatedDate = Req.CurrenntDateAndTime;

            OneViewConsole.Debug("Normalize end", "NormalizeActionResolveApprovalEntity.Normalize");
            //alert("_oActionResolveApprovalEntity : "+JSON.stringify(_oActionResolveApprovalEntity))
            return _oActionResolveApprovalEntity;
        }
        catch (Excep) {
           // throw oOneViewExceptionHandler.Create("Normalize", "NormalizeActionResolveApprovalEntity.Normalize", Excep);
           throw oOneViewExceptionHandler.Create("BO", "NormalizeActionResolveApprovalEntity.Normalize", Excep);
        }
    }

}


function NormalizeMultiMediaForActionResolveApprovalEntity(){

this.Normalize = function (Req) {
    try {
       
        var AFApprovalMultiMediaSubElementsList=Req.ActionResolveApprovalMultiMediaInfo;
    
        for (var i = 0; i < AFApprovalMultiMediaSubElementsList.length; i++) {

            //if (DcId == null) {
               // AFApprovalMultiMediaSubElementsList[i].MappedEntityClientGuid = Req.CurrentActionResolveApprovalClientGuid;
            //}

            if (AFApprovalMultiMediaSubElementsList[i].Id == 0 && (AFApprovalMultiMediaSubElementsList[i].IsDisabled == false || AFApprovalMultiMediaSubElementsList[i].IsDisabled == 'false')) {

                var oDateTime = new DateTime();
                var CurrenntDateAndTime = oDateTime.GetDateAndTime();

                var _oMultiMediaSubElements = new MultiMediaSubElements();

                _oMultiMediaSubElements.ClientGuid = OneViewUniqueGenerator.GetGuid();
                _oMultiMediaSubElements.MobileVersionId = 1;
                _oMultiMediaSubElements.ServiceId = OneViewSessionStorage.Get("ServiceId");

                _oMultiMediaSubElements.MappedEntityClientGuid = Req.CurrentActionResolveApprovalClientGuid;
                _oMultiMediaSubElements.Dimension = AFApprovalMultiMediaSubElementsList[i].Dimension;
                _oMultiMediaSubElements.MultiMediaType = AFApprovalMultiMediaSubElementsList[i].MultiMediaType;
                _oMultiMediaSubElements.LocalURL = AFApprovalMultiMediaSubElementsList[i].LocalURL;

                _oMultiMediaSubElements.Comments = AFApprovalMultiMediaSubElementsList[i].Comments;
                _oMultiMediaSubElements.CreatedDate = CurrenntDateAndTime;
                _oMultiMediaSubElements.TimeStamp = CurrenntDateAndTime;
                _oMultiMediaSubElements.IsSynchronized = "false";
                _oMultiMediaSubElements.IsMultiMediaSynchronized = "false";
                _oMultiMediaSubElements.IsDisabled = AFApprovalMultiMediaSubElementsList[i].IsDisabled;
                
                var _oDcResultDetailsEntityDAO = new DefaultMasterDAO("MultiMediaSubElements");
                _oDcResultDetailsEntityDAO.CreateMaster(_oMultiMediaSubElements);
            }
        }
    }
    catch (Excep) {
        
        throw oOneViewExceptionHandler.Create("BO", "DataCaptureBO.CreateMultiMediaSubElements", Excep);
    }
}

}

