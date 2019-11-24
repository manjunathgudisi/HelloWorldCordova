var DcDeletionConfiguration =
{

    1://ServiceId
        {
            0: [{//All Template
                "UserId": -1, //All User
                "DCPlaceNodeId": -1, //All DcPlace
                "Configuration": {
                    //"MaxDeletionInCountInDays": 30, // 30 days before data will be delete ( -1 means never going to delete ) // 30 days before datacaptures
                    "CompletedAndSynced": 0, // Once completed and synchronized how many data want to keep in db
                    //"CompletedAndUnSynced": -1, // Once completed and un-synchronized how many data want to keep in db ( to do : It want to change in to days)
                    "InCompletedAndSynced": -1, // Once Incompleted and synchronized how many data want to keep in db ( -1 means never going to delete )
                    //"InCompletedAndUnSynced": -1, // Once Incompleted and un-synchronized how many data want to keep in db ( to do : It want to change in to days)

                    //"CompletedAndSyncedInDays": 0, // Once completed and synchronized how many days want to keep in db
                    //"CompletedAndUnSyncedInDays": -1, // Once completed and un-synchronized how many days want to keep in db ( to do : It want to change in to days)
                    "InCompletedAndSyncedInDays": -1, // Once Incompleted and synchronized how many days want to keep in db
                    //"InCompletedAndUnSyncedInDays": 0, // Once Incompleted and un-synchronized how many days want to keep in db ( to do : It want to change in to days)
                }
            }
            ],
            6252: [{//INVENTORY - CURRENT STOCK OF LABORATORY MEDIA
                "UserId": -1, //All User
                "DCPlaceNodeId": -1, //All DcPlace
                "Configuration": {
                    //"MaxDeletionInCountInDays": 30, // 30 days before data will be delete ( -1 means never going to delete ) // 30 days before datacaptures
                    "CompletedAndSynced": 0, // Once completed and synchronized how many data want to keep in db
                    //"CompletedAndUnSynced": -1, // Once completed and un-synchronized how many data want to keep in db ( to do : It want to change in to days)
                    "InCompletedAndSynced": 0, // Once Incompleted and synchronized how many data want to keep in db
                    //"InCompletedAndUnSynced": -1, // Once Incompleted and un-synchronized how many data want to keep in db ( to do : It want to change in to days)

                    //"CompletedAndSyncedInDays": 0, // Once completed and synchronized how many days want to keep in db
                    //"CompletedAndUnSyncedInDays": -1, // Once completed and un-synchronized how many days want to keep in db ( to do : It want to change in to days)
                    "InCompletedAndSyncedInDays": -1, // Once Incompleted and synchronized how many days want to keep in db (-1 means never going to delete)
                    //"InCompletedAndUnSyncedInDays": -1, // Once Incompleted and un-synchronized how many days want to keep in db ( to do : It want to change in to days)
                }
            }
            ],
            8272: [{//DISPATCHING
                "UserId": -1, //All User
                "DCPlaceNodeId": -1, //All DcPlace
                "Configuration": {
                    //"MaxDeletionInCountInDays": 30, // 30 days before data will be delete ( -1 means never going to delete ) // 30 days before datacaptures
                    "CompletedAndSynced": 0, // Once completed and synchronized how many data want to keep in db
                    //"CompletedAndUnSynced": -1, // Once completed and un-synchronized how many data want to keep in db ( to do : It want to change in to days)
                    "InCompletedAndSynced": -1, // Once Incompleted and synchronized how many data want to keep in db
                    //"InCompletedAndUnSynced": -1, // Once Incompleted and un-synchronized how many data want to keep in db ( to do : It want to change in to days)

                    //"CompletedAndSyncedInDays": 0, // Once completed and synchronized how many days want to keep in db
                    //"CompletedAndUnSyncedInDays": -1, // Once completed and un-synchronized how many days want to keep in db ( to do : It want to change in to days)
                    "InCompletedAndSyncedInDays": 1, // Once Incompleted and synchronized how many days want to keep in db (-1 means never going to delete)
                    //"InCompletedAndUnSyncedInDays": -1, // Once Incompleted and un-synchronized how many days want to keep in db ( to do : It want to change in to days)
                }
            }
            ]
        },
    2:
       {
           0: [{//All Template
               "UserId": -1, //All User
               "DCPlaceNodeId": -1, //All DcPlace
               "Configuration": {
                   //"MaxDeletionInCountInDays": 30, // 30 days before data will be delete ( -1 means never going to delete ) // 30 days before datacaptures
                   "CompletedAndSynced": 0, // Once completed and synchronized how many data want to keep in db
                   //"CompletedAndUnSynced": -1, // Once completed and un-synchronized how many data want to keep in db ( to do : It want to change in to days)
                   "InCompletedAndSynced": -1, // Once Incompleted and synchronized how many data want to keep in db ( -1 means never going to delete )
                   //"InCompletedAndUnSynced": -1, // Once Incompleted and un-synchronized how many data want to keep in db ( to do : It want to change in to days)

                   //"CompletedAndSyncedInDays": 0, // Once completed and synchronized how many days want to keep in db
                   //"CompletedAndUnSyncedInDays": -1, // Once completed and un-synchronized how many days want to keep in db ( to do : It want to change in to days)
                   "InCompletedAndSyncedInDays": -1, // Once Incompleted and synchronized how many days want to keep in db
                   //"InCompletedAndUnSyncedInDays": 0, // Once Incompleted and un-synchronized how many days want to keep in db ( to do : It want to change in to days)
               }
           }
           ]
       }
}