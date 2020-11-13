//
//  HttpClinetPlugin.m
//  CordovaLib
//
//  Created by apple on 19/02/16.
//
//

#import <JavaScriptCore/JavaScriptCore.h>
#import <Foundation/NSObject.h>
#import <HttpClinetPlugin.h>

#import <AssetsLibrary/ALAsset.h>
#import <AssetsLibrary/ALAssetRepresentation.h>
#import <AssetsLibrary/ALAssetsLibrary.h>
#import <CFNetwork/CFNetwork.h>
#import <Cordova/CDV.h>





@protocol JS_HttpClinetPluginController <JSExport>
-(NSString *)Send_Get :(NSString *)Url ;
-(NSString *)Send :(NSString *)Url : (NSString *)ReqParm : (NSString *)DeviceId : (NSString *)LoginUserId
                  : (NSString *)IpAddress : (NSString *)LoginUserName : (NSString *)VersionName : (NSString *)ServiceId :(NSString *)ServiceName;

-(NSString *)  DownloadFile : (NSString *)ServiceURL;
- (NSString *) UploadFile :  (NSString *)sourceFileUri : (NSString *)upLoadServerUri;
@end



#import "HttpClinetPlugin.h"
@interface HttpClinetPlugin()<JS_HttpClinetPluginController>
@end

@implementation HttpClinetPlugin



- (NSString *)  DownloadFile : (NSString *)ServiceURL
{
    //return @"{OneViewAppInfo.DownloadFile : Not implemented exception}";
	
	ServiceURL = [ServiceURL stringByReplacingOccurrencesOfString:@"//" withString:@"/"];
	ServiceURL = [ServiceURL stringByReplacingOccurrencesOfString:@"\\" withString:@"/"];
    
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] init];
    [request setHTTPMethod:@"GET"];
    [request setURL:[NSURL URLWithString:ServiceURL]];

    //set the content type to JSON
    [request setValue:@"application/json" forHTTPHeaderField:@"Accept"];
    [request setValue:@"application/json" forHTTPHeaderField:@"Content-type"];
	
	NSError *error = [[NSError alloc] init];
    NSURLResponse __block *responseCode = nil;
	NSString __block *localPath = nil;
	
    //NSData *oResponseData = [NSURLConnection sendSynchronousRequest:request returningResponse:&responseCode error:&error];
    
    //NSData *oResponseData = [HttpClinetPlugin sendSynchronousRequest:request returningResponse:&responseCode error:&error];
	
	//----------------------
	dispatch_group_t group = dispatch_group_create();
    dispatch_group_enter(group);
	
	NSURLSessionDownloadTask *downloadTask = [[NSURLSession sharedSession] downloadTaskWithRequest:request completionHandler:^(NSURL *location, NSURLResponse *response, NSError *error) {
		
		//Save image
		NSString *documentsPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject];
		NSURL *documentsDirectoryURL = [NSURL fileURLWithPath:documentsPath];
		NSURL *documentURL = [documentsDirectoryURL URLByAppendingPathComponent:[response suggestedFilename]];
		BOOL exists = [[NSFileManager defaultManager] fileExistsAtPath:[documentURL path]];

		 if (exists) {
			NSLog(@"file already existed");
		 } else {
			 localPath = [documentURL absoluteString];
			 responseCode = response;
			 BOOL isMoved = [[NSFileManager defaultManager] moveItemAtURL:location toURL:documentURL error:nil];
			 if (isMoved) {
				 printf("file moved");
			 }
		}
		
		dispatch_group_leave(group);
	}];
	
	[downloadTask resume];

    dispatch_group_wait(group, DISPATCH_TIME_FOREVER);
	//----------------------
	
	
    
	if(localPath != nil) {
		 NSDictionary *jsonDictionary = [NSDictionary dictionaryWithObjectsAndKeys:
										[NSNumber numberWithInt:200], @"ResponseCode",
										 @"false", @"IsAnyException",
										 localPath, @"Response", nil];
		 
		 NSData *jsonData = [NSJSONSerialization dataWithJSONObject:jsonDictionary options:NSJSONWritingPrettyPrinted error:&error];
		 NSString *HttpClientResponseDTO = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
		 
        
     //   [NSString stringWithFormat:@"{ \"ResponseCode\" : \"%i\" ,\"IsAnyException\" : \"%@\" ,\"Response\" : \"%@\" ",
       //  [responseCode statusCode], @"true",@""];
        
		return HttpClientResponseDTO;
    } else {
        NSError *error = [[NSError alloc] init];
        
         NSNumber *errocode = @([(NSHTTPURLResponse *)responseCode statusCode]);
       // NSString *errocode =[@([responseCode statusCode]) stringValue];
        
        NSDictionary *jsonDictionaryError = [NSDictionary dictionaryWithObjectsAndKeys:
                                       errocode, @"ResponseCode",
                                        @"true", @"IsAnyException",
                                        @"error", @"Response",nil];
        
        NSData *jsonData = [NSJSONSerialization dataWithJSONObject:jsonDictionaryError options:NSJSONWritingPrettyPrinted error:&error];
        NSString *HttpClientResponseDTO = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        
        
        return HttpClientResponseDTO;
    }
	
}
- (NSString *)  Send_Get : (NSString *)url
{
       
    
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] init];
    [request setHTTPMethod:@"GET"];
    [request setURL:[NSURL URLWithString:url]];
    
    NSError *error = [[NSError alloc] init];
    NSHTTPURLResponse *responseCode = nil;
    
    //NSData *oResponseData = [NSURLConnection sendSynchronousRequest:request returningResponse:&responseCode error:&error];
    NSData *oResponseData = [HttpClinetPlugin sendSynchronousRequest:request returningResponse:&responseCode error:&error];
    
    if([responseCode statusCode] != 200){
        //NSLog(@"Error getting %@, HTTP status code %i", url, [responseCode statusCode]);
        return nil;
    }
    
     NSString *HttpClientResponseDTO = [[NSString alloc] initWithData:oResponseData encoding:NSUTF8StringEncoding];
    return HttpClientResponseDTO;
    
}

- (NSString *)  UploadFile :  (NSString *)sourceFileUri : (NSString *)upLoadServerUri
{
    
    // String fileName = sourceFileUri.split("/")[sourceFileUri.split("/").length-1];
    // NSArray* fileName=
    
    NSArray * sourceFileUriArray = [sourceFileUri componentsSeparatedByString: @"/"];
    NSString *  fileName = sourceFileUriArray[[sourceFileUriArray count]-1];
    
    NSArray* words = [upLoadServerUri componentsSeparatedByCharactersInSet :[NSCharacterSet whitespaceAndNewlineCharacterSet]];
    upLoadServerUri = [words componentsJoinedByString:@""];
    
    NSString* const kFormBoundary = @"+++++org.apache.cordova.formBoundary";
    
    ////TODO:IOS Migr (Need to support with space)
    //upLoadServerUri = [upLoadServerUri stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
	upLoadServerUri = [upLoadServerUri stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLQueryAllowedCharacterSet]];
    
    // sourceFileUri=[NSString stringByAddingPercentEscapesUsingEncoding:sourceFileUri];
    
    NSURL* url = [NSURL URLWithString:upLoadServerUri];
    if (!url) {
        
        return @"File Transfer Error: Invalid server URL";
    }
    NSMutableURLRequest* req = [NSMutableURLRequest requestWithURL:url];
    
    
    
    [req setHTTPMethod:@"POST"];
    NSString* contentType = [NSString stringWithFormat:@"multipart/form-data; boundary=%@", kFormBoundary];
    [req setValue:contentType forHTTPHeaderField:@"Content-Type"];
    
    
    NSData* formBoundaryData = [[NSString stringWithFormat:@"--%@\r\n", kFormBoundary] dataUsingEncoding:NSUTF8StringEncoding];
    NSMutableData* postBodyBeforeFile = [NSMutableData data];
    
    
    [postBodyBeforeFile appendData:formBoundaryData];
    [postBodyBeforeFile appendData:[[NSString stringWithFormat:@"Content-Disposition: form-data; name=\"%@\"; filename=\"%@\"\r\n", @"file", fileName] dataUsingEncoding:NSUTF8StringEncoding]];
    
    
    
    NSData *fileData = [NSData dataWithContentsOfFile:sourceFileUri];
    
    [postBodyBeforeFile appendData:[[NSString stringWithFormat:@"Content-Length: %ld\r\n\r\n", (long)[fileData length]] dataUsingEncoding:NSUTF8StringEncoding]];
    NSData* postBodyAfterFile = [[NSString stringWithFormat:@"\r\n--%@--\r\n", kFormBoundary] dataUsingEncoding:NSUTF8StringEncoding];
    
    long long totalPayloadLength = [fileData length];
    if (true) {
        totalPayloadLength += [postBodyBeforeFile length] + [postBodyAfterFile length];
    }
    [req setValue:[[NSNumber numberWithLongLong:totalPayloadLength] stringValue] forHTTPHeaderField:@"Content-Length"];
    
    
    [postBodyBeforeFile appendData:fileData];
    [postBodyBeforeFile appendData:postBodyAfterFile];
    [req setHTTPBody:postBodyBeforeFile];
    
    
    
    NSHTTPURLResponse *responseCode = nil;
    NSError *error = [[NSError alloc] init];
    //NSData *oResponseData = [NSURLConnection sendSynchronousRequest:req returningResponse:&responseCode error:&error];
    NSData *oResponseData = [HttpClinetPlugin sendSynchronousRequest:req returningResponse:&responseCode error:&error];
    
    if([responseCode statusCode] == 200)
    {
        NSString *resp =
        [[NSString alloc] initWithData:oResponseData encoding:NSUTF8StringEncoding];
        
        
        NSError *error = [[NSError alloc] init];
        
        NSDictionary *jsonDictionary = [NSDictionary dictionaryWithObjectsAndKeys:
                                        @"200", @"ResponseCode",
                                        @"false", @"IsAnyException",
                                        resp, @"Response",nil];
        
        NSData *jsonData = [NSJSONSerialization dataWithJSONObject:jsonDictionary options:NSJSONWritingPrettyPrinted error:&error];
        NSString *HttpClientResponseDTO = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        
        
        return HttpClientResponseDTO;
        
    }
    else
    {
        
        NSError *error = [[NSError alloc] init];
        
        NSNumber *errocode = @([responseCode statusCode]);
               
        NSDictionary *jsonDictionary = [NSDictionary dictionaryWithObjectsAndKeys:
                                        errocode, @"ResponseCode",
                                        @"true", @"IsAnyException",
                                        "", @"Response",nil];
        
        NSData *jsonData = [NSJSONSerialization dataWithJSONObject:jsonDictionary options:NSJSONWritingPrettyPrinted error:&error];
        NSString *HttpClientResponseDTO = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        
        
        return HttpClientResponseDTO;
    }
    
    
}





- (NSString *)  Send : (NSString *)Url : (NSString *)ReqParm : (NSString *)DeviceId : (NSString *)LoginUserId
                     : (NSString *)IpAddress : (NSString *)LoginUserName : (NSString *)VersionName : (NSString *)ServiceId :(NSString *)ServiceName
{
    
    NSData *requestData = [NSData dataWithBytes:[ReqParm UTF8String] length:[ReqParm length]];
    
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] init];
    [request setHTTPMethod:@"POST"];
    [request setURL:[NSURL URLWithString:Url]];
    [request setHTTPBody : requestData ];
    
    //set the content type to JSON
    [request setValue:@"application/json" forHTTPHeaderField:@"Accept"];
    [request setValue:@"application/json" forHTTPHeaderField:@"Content-type"];
	
	if (DeviceId != NULL && DeviceId.length > 0 && [DeviceId.lowercaseString isEqualToString:@"null"] == false) {
		[request setValue:DeviceId forHTTPHeaderField:@"DeviceId"];
	}
	
	if (LoginUserId != NULL && LoginUserId.length > 0 && [LoginUserId.lowercaseString isEqualToString:@"null"] == false) {
		[request setValue:LoginUserId forHTTPHeaderField:@"LoginUserId"];
	}
	
	if (IpAddress != NULL && IpAddress.length > 0 && [IpAddress.lowercaseString isEqualToString:@"null"] == false) {
		[request setValue:IpAddress forHTTPHeaderField:@"IpAddress"];
	}
	
	if (LoginUserName != NULL && LoginUserName.length > 0 && [LoginUserName.lowercaseString isEqualToString:@"null"] == false) {
		[request setValue:LoginUserName forHTTPHeaderField:@"LoginUserName"];
	}
	
	if (VersionName != NULL && VersionName.length > 0 && [VersionName.lowercaseString isEqualToString:@"null"] == false) {
		[request setValue:VersionName forHTTPHeaderField:@"VersionName"];
	}
	
	if (ServiceId != NULL && ServiceId.length > 0 && [ServiceId.lowercaseString isEqualToString:@"null"] == false) {
		[request setValue:ServiceId forHTTPHeaderField:@"ServiceId"];
	}
	
	if (ServiceName != NULL && ServiceName.length > 0 && [ServiceName.lowercaseString isEqualToString:@"null"] == false) {
		[request setValue:ServiceName forHTTPHeaderField:@"ServiceName"];
	}
    
    NSError *error = [[NSError alloc] init];
    NSHTTPURLResponse *responseCode = nil;
    
    //NSData *oResponseData = [NSURLConnection sendSynchronousRequest:request returningResponse:&responseCode error:&error];
    
    NSData *oResponseData = [HttpClinetPlugin sendSynchronousRequest:request returningResponse:&responseCode error:&error];
    
    if([responseCode statusCode] == 200)
    {
        NSString *HttpClientResponseDTO =
        [[NSString alloc] initWithData:oResponseData encoding:NSUTF8StringEncoding];
        return HttpClientResponseDTO;
        
        
     //   [NSString stringWithFormat:@"{ \"ResponseCode\" : \"%i\" ,\"IsAnyException\" : \"%@\" ,\"Response\" : \"%@\" ",
       //  [responseCode statusCode], @"true",@""];
        
    }
    else
    {
        NSError *error = [[NSError alloc] init];
        
         NSNumber *errocode = @([responseCode statusCode]);
       // NSString *errocode =[@([responseCode statusCode]) stringValue];
        
        NSDictionary *jsonDictionaryError = [NSDictionary dictionaryWithObjectsAndKeys:
                                       errocode, @"ResponseCode",
                                        @"true", @"IsAnyException",
                                        @"error", @"Response",nil];
        
        NSData *jsonData = [NSJSONSerialization dataWithJSONObject:jsonDictionaryError options:NSJSONWritingPrettyPrinted error:&error];
        NSString *HttpClientResponseDTO = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        
        
        return HttpClientResponseDTO;

        
       // NSString *HttpClientResponseDTO =
      //  [NSString stringWithFormat:@"{ \"ResponseCode\" : \"%i\" ,\"IsAnyException\" : \"%@\" ,\"Response\" : \"%@\" ",
       //  [responseCode statusCode], @"true",@""];
        
        
        //NSLog(@"Error getting %@, HTTP status code %i", url, [responseCode statusCode]);
        return HttpClientResponseDTO;
    }
    
    //  return [[NSString alloc] initWithData:oResponseData encoding:NSUTF8StringEncoding];
    
    
    
}

+ (NSData *)sendSynchronousRequest:(NSURLRequest *)request
                 returningResponse:(NSURLResponse **)response
                             error:(NSError **)error
{
    dispatch_group_t group = dispatch_group_create();
    dispatch_group_enter(group);


    NSError __block *err = NULL;
    NSData __block *data;
    NSURLResponse __block *resp;

    [[[NSURLSession sharedSession] dataTaskWithRequest:request
                                     completionHandler:^(NSData* _data, NSURLResponse* _response, NSError* _error) {
        resp = _response;
        err = _error;
        data = _data;
        dispatch_group_leave(group);

    }] resume];

    dispatch_group_wait(group, DISPATCH_TIME_FOREVER);

    if (response)
    {
        *response = resp;
    }
    if (error)
    {
        *error = err;
    }

    return data;
}


@end








