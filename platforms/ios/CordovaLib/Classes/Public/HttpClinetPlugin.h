//
//  HttpClinetPlugin.h
//  CordovaLib
//
//  Created by apple on 19/02/16.
//
//

#import <Foundation/Foundation.h>


@interface HttpClinetPlugin : NSObject
-(NSString *)  Send_Get : (NSString *)url;
-(NSString *)  UploadFile :  (NSString *)sourceFileUri : (NSString *)upLoadServerUri;
@end
