
function JWPlayerComponent() {

    this.LoadVideo = function (Url, ThumbsImage, MediaId, Duration, DivId, VideoAttributeGroupId) {
        try {
            OneViewConsole.Debug("LoadVideo Start", "JWPlayerComponent.LoadVideo");

            //JwPlayer Video config
            var jwConfig = {
                "autostart": false,
                "controls": true,
                "displaydescription": false,
                "displaytitle": false,
                "flashplayer": "//ssl.p.jwpcdn.com/player/v/7.12.4/jwplayer.flash.swf",
                "height": 360,
                "key": "koUlu775swQrXBwwkWmCuhzxwb/p+JdvzNU5Zw==",
                "ph": 3,
                "pid": "FKDwxxm6",
                "playlist": [
                  {
                      "description": "",
                      "duration": Duration,
                      "image": ThumbsImage,
                      "mediaid": MediaId,
                      "pubdate": "Mon, 07 Aug 2017 09:54:29 -0000",
                      "sources": [

                        {
                            "duration": Duration,
                            "file": Url,
                            "height": 320,
                            "label": "180p",
                            "type": "video/mp4",
                            "width": 180
                        },

                      ],
                      "tags": "",
                      "title": "OneView Android Wear"

                  }
                ],
                "plugins": {
                    "https://assets-jpcust.jwpsrv.com/player/6/6124956/ping.js": {
                        "pixel": "https://content.jwplatform.com/ping.gif"
                    }
                },
                "preload": "none",
                "repeat": false,
                "stagevideo": false,
                "stretching": "uniform",
                "width": "100%"
            };

            // end config


            // Append to the Div Video
            jwplayer(DivId).setup(jwConfig);
                       
            scope[VideoAttributeGroupId] = {
                'StartTime': '',
                'EndTime': '',
                'TotalDuration': '',
                'WatchedDuration': 0,
                'ResumeTime': '',
                'PausedTime': '',
                'NoOfTimesWatched' :0
            };

            //alert('VideoAttributeGroupId : ' + VideoAttributeGroupId);
            //alert('scope[VideoAttributeGroupId] : ' + JSON.stringify(scope[VideoAttributeGroupId]));
            
            OneViewConsole.Debug("LoadVideo End", "JWPlayerComponent.LoadVideo");

            return true;
        }
        catch (Excep) {
            alert("JWPlayerComponent.LoadVideo Excep" + Excep);
            throw oOneViewExceptionHandler.Create("Framework", "JWPlayerComponent.LoadVideo", Excep);
        }
    }

    this.RegisterEvents = function (scope, VideoAttributeGroupId) {
        try {
            OneViewConsole.Debug("RegisterEvents Start", "JWPlayerComponent.RegisterEvents");

            

            jwplayer().on('playlist', function () {
                    try {
                        //alert('lOADED');
                        var Duration = jwplayer().getDuration();
                       
                        var JwTotalTime = Duration;
                        //alert('Duration : ' + Duration);
                        scope[TempVideoAttributeGroupId].TotalDuration = Duration;
                       // alert('scope[TempVideoAttributeGroupId] : ' + JSON.stringify(scope[TempVideoAttributeGroupId]));
                       
                    }
                    catch (Excep) {
                      //  alert('playlist Excep : ' + Excep);
                        //  alert('playlist Excep 22 : ' + JSON.stringify(Excep));
                        oOneViewExceptionHandler.Catch(Excep, "JWPlayerComponent.playlist", GlobalXlatService);
                    }
                }
               )


            jwplayer().on("play", function () {
                try{
                   // alert('play');

                    var oDateTime = new DateTime();
                    var CurrenntDateAndTime = oDateTime.GetDateAndTime();
                                       
                    if (scope[TempVideoAttributeGroupId].StartTime == '') {
                        scope[TempVideoAttributeGroupId].StartTime = CurrenntDateAndTime;
                    }
                    
                    var DateSplitted = CurrenntDateAndTime.split(' ');
                    var DateArr = DateSplitted[0].split('-');
                    var TimeArr = DateSplitted[1].split(':');

                    var DateFormatted = new Date(DateArr[2], (parseInt(DateArr[1]) - 1), DateArr[0], TimeArr[0], TimeArr[1], TimeArr[2]);
                    var JwStartTime = DateFormatted;
                    scope[TempVideoAttributeGroupId].ResumeTime = DateFormatted;
                  
                  
                }
                catch (Excep) {
                   // alert('play Excep : ' + Excep);
                    //  alert('play Excep 22 : ' + JSON.stringify(Excep));
                    oOneViewExceptionHandler.Catch(Excep, "JWPlayerComponent.play", GlobalXlatService);
                }
            }
            )

            jwplayer().on("pause", function () {
                try{
                   
                  //  alert('scope[TempVideoAttributeGroupId] : ' + JSON.stringify(scope[TempVideoAttributeGroupId]));
                var oDateTime = new DateTime();
                var CurrenntDateAndTime = oDateTime.GetDateAndTime();

                var DateSplitted = CurrenntDateAndTime.split(' ');
                var DateArr = DateSplitted[0].split('-');
                var TimeArr = DateSplitted[1].split(':');

                var DateFormatted = new Date(DateArr[2], (parseInt(DateArr[1]) - 1), DateArr[0], TimeArr[0], TimeArr[1], TimeArr[2]);
                var JwEndTime = DateFormatted;
                scope[TempVideoAttributeGroupId].PausedTime = DateFormatted;

                var JwStartTime = scope[TempVideoAttributeGroupId].ResumeTime;
                var Diff = JwEndTime.getTime() - JwStartTime.getTime();
                //var OneSecInMilliSec = 1000 * 60 * 60;
                //var TimeDiffInSec = Diff / OneSecInMilliSec;
                
                var JwElapsedTime = scope[TempVideoAttributeGroupId].WatchedDuration;
                JwElapsedTime = parseInt(JwElapsedTime) + Diff;
                scope[TempVideoAttributeGroupId].WatchedDuration = JwElapsedTime;

                
              
                }
                catch (Excep) {
                  //  alert('pause Excep : ' + Excep);
                    //  alert('pause Excep 22 : ' + JSON.stringify(Excep));
                    oOneViewExceptionHandler.Catch(Excep, "JWPlayerComponent.pause", GlobalXlatService);
                }
            }
            )

            jwplayer().on('buffer', function () {
                try{
                 //   alert('buffer' + TempVideoAttributeGroupId);
                    
                var oDateTime = new DateTime();
                var CurrenntDateAndTime = oDateTime.GetDateAndTime();
                
                var DateSplitted = CurrenntDateAndTime.split(' ');
                var DateArr = DateSplitted[0].split('-');
                var TimeArr = DateSplitted[1].split(':');

                var DateFormatted = new Date(DateArr[2], (parseInt(DateArr[1]) - 1), DateArr[0], TimeArr[0], TimeArr[1], TimeArr[2]);
                var JwStartTime = DateFormatted;
                scope[TempVideoAttributeGroupId].ResumeTime = DateFormatted;

                var JwEndTime = DateFormatted;
                scope[TempVideoAttributeGroupId].PausedTime = DateFormatted;
                
                var Diff = JwEndTime.getTime() - JwStartTime.getTime();
                
                var JwElapsedTime = scope[TempVideoAttributeGroupId].WatchedDuration;
                JwElapsedTime = parseInt(JwElapsedTime) + Diff;      
                scope[TempVideoAttributeGroupId].WatchedDuration = JwElapsedTime;
                                
               
                }
                catch (Excep) {
                   // alert('buffer Excep : ' + Excep);
                    // alert('buffer Excep 22 : ' + JSON.stringify(Excep));
                    oOneViewExceptionHandler.Catch(Excep, "JWPlayerComponent.buffer", GlobalXlatService);
                }
            }
            )

            jwplayer().on('idle', function ()
            {
               // alert('idle');
            }
            )

            jwplayer().on('complete', function () {
                try{
                  //  alert('complete' + TempVideoAttributeGroupId);
                var oDateTime = new DateTime();
                var CurrenntDateAndTime = oDateTime.GetDateAndTime();

                scope[TempVideoAttributeGroupId].EndTime = CurrenntDateAndTime;


                var DateSplitted = CurrenntDateAndTime.split(' ');
                var DateArr = DateSplitted[0].split('-');
                var TimeArr = DateSplitted[1].split(':');

                var DateFormatted = new Date(DateArr[2], (parseInt(DateArr[1]) - 1), DateArr[0], TimeArr[0], TimeArr[1], TimeArr[2]);
                var JwEndTime = DateFormatted;
                scope[TempVideoAttributeGroupId].PausedTime = DateFormatted;
                
                var JwStartTime = scope[TempVideoAttributeGroupId].ResumeTime;
             
                var Diff = JwEndTime.getTime() - JwStartTime.getTime();

                var JwElapsedTime = scope[TempVideoAttributeGroupId].WatchedDuration;
                
                JwElapsedTime = parseInt(JwElapsedTime) + Diff;
                
                scope[TempVideoAttributeGroupId].WatchedDuration = JwElapsedTime;


                scope[TempVideoAttributeGroupId].NoOfTimesWatched += 1;
                
                //alert('complete scope[TempVideoAttributeGroupId] : ' + JSON.stringify(scope[TempVideoAttributeGroupId]));
                }
                catch (Excep) {
                  //  alert('complete Excep : ' + Excep);
                    //  alert('complete Excep 22 : ' + JSON.stringify(Excep));
                    oOneViewExceptionHandler.Catch(Excep, "JWPlayerComponent.complete", GlobalXlatService);
                }
            }
            )

            jwplayer().on('seek', function () {
                //alert('seek');
               // document.getElementById("divPosition1").innerHTML = "Seek Start : " + jwplayer().getPosition();

            }
            )

            jwplayer().on('seeked', function () {
                //alert('seeked');
              //  document.getElementById("divPosition2").innerHTML = "Seek Stop : " + jwplayer().getPosition();
            }
            )

            // jwplayer().on('time', function ()
            // { //alert('time'); }
            //)

            jwplayer().on('fullscreen', function () {
               // alert('fullscreen');

            })


           
           

            OneViewConsole.Debug("RegisterEvents End", "JWPlayerComponent.RegisterEvents");
        }
        catch (Excep) {
            //alert("JWPlayerComponent.RegisterEvents Excep" + Excep);
            throw oOneViewExceptionHandler.Create("Framework", "JWPlayerComponent.RegisterEvents", Excep);
        }
    }

}
