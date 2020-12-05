//
//  BluetoothFacade.h
//  CordovaLib
//
//  Created by Gudisi, Manjunath on 22/11/20.
//

#ifndef BluetoothFacade_h
#define BluetoothFacade_h

@interface BluetoothFacade : NSObject
-(NSString *)  Send_Get : (NSString *)url;
-(NSString *)  UploadFile :  (NSString *)sourceFileUri : (NSString *)upLoadServerUri;
@end

#endif /* BluetoothFacade_h */
