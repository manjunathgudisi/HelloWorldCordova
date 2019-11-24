var ACL =
{
    1://ServiceId
    {
        "-1"://UserId
            {
                          
            'Setting_*': false,

            },

    },
    2://ServiceId
    {
        "-1"://UserId
            {

                'Setting_*': false,

            },

    },
    3://ServiceId
   {
       "-1"://UserId
           {

               'Setting_ProbeConfiguration_*': true,
               'Setting_MyDownload_*': true,

           },

   },
    4://ServiceId
     {
         "-1"://UserId
             {

                 'Setting_ProbeConfiguration_*': true,
                 'Setting_MyDownload_*': true,

             },

     },
    5://ServiceId TCFM
    {
        "-1"://UserId
            {

                'Setting_ProbeConfiguration_*': true,
                'Setting_MyDownload_*': true,

            },

    }
};