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
-(NSString *) Get :(NSString *)ServiceURL ;
@end



#import "HttpClinetPlugin.h"
@interface HttpClinetPlugin()<JS_HttpClinetPluginController>
@end

@implementation HttpClinetPlugin



- (NSString *)  DownloadFile : (NSString *)ServiceURL
{
    return @"OneViewAppInfo.DownloadFile : Not implemented exception";
}
- (NSString *)  Send_Get : (NSString *)url
{
       
    
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] init];
    [request setHTTPMethod:@"GET"];
    [request setURL:[NSURL URLWithString:url]];
    
    NSError *error = [[NSError alloc] init];
    NSHTTPURLResponse *responseCode = nil;
    
    NSData *oResponseData = [NSURLConnection sendSynchronousRequest:request returningResponse:&responseCode error:&error];
    
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
    upLoadServerUri = [upLoadServerUri stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    
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
    NSData *oResponseData = [NSURLConnection sendSynchronousRequest:req returningResponse:&responseCode error:&error];
    
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

-(NSString *) Get:(NSString *)ServiceURL
{
    HttpClinetPlugin *oHttpClinetPlugin = [[HttpClinetPlugin alloc] init];
    
    NSString *UniqueFileName=[self GetUniqueFileName];
    NSString *urld = [NSString stringWithFormat:@"%@?time=%@",
                      ServiceURL,UniqueFileName];
    
    NSString  *output=[oHttpClinetPlugin Send_Get:urld];
    
    return output;
}

-(NSString *) GetUniqueFileName {
    
    
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    [dateFormatter setDateFormat:@"dd/mm/yyyy hh:mm:sss"];
    NSDate* date = [NSDate date];
    NSCalendar *calendar = [NSCalendar currentCalendar];
    NSDateComponents *components = [calendar components:(NSCalendarUnitHour | NSCalendarUnitMinute) fromDate:date];
    NSInteger year = [components year];
    NSInteger minute = [components minute];
    NSInteger day = [components day];
    NSInteger nanosecond = [components nanosecond];
    
    NSString *UniqueFileName =[NSString stringWithFormat:@"%ld%ld%ld%ld",
                               minute, day,year,nanosecond];
    
    return UniqueFileName;
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
//    [request setValue:DeviceId forHTTPHeaderField:@"DeviceId"];
//    [request setValue:LoginUserId forHTTPHeaderField:@"LoginUserId"];
//    [request setValue:IpAddress forHTTPHeaderField:@"IpAddress"];
//    [request setValue:LoginUserName forHTTPHeaderField:@"LoginUserName"];
//    [request setValue:VersionName forHTTPHeaderField:@"VersionName"];
//    [request setValue:ServiceId forHTTPHeaderField:@"ServiceId"];
//    [request setValue:ServiceName forHTTPHeaderField:@"ServiceName"];
    
    NSError *error = [NSError errorWithDomain:@"some_domain"
        code:100
    userInfo:@{
                NSLocalizedDescriptionKey:@"Something went wrong"
    }];
    NSURLResponse *responseCode = nil;
    
    //NSData *oResponseData = [NSURLConnection sendSynchronousRequest:request returningResponse:&responseCode error:&error];
    NSData *oResponseData = [HttpClinetPlugin sendSynchronousRequest:request returningResponse:&responseCode error:&error];

    if([(NSHTTPURLResponse *)responseCode statusCode] == 200)
    {
        NSString *HttpClientResponseDTO =
        [[NSString alloc] initWithData:oResponseData encoding:NSUTF8StringEncoding];
        return HttpClientResponseDTO;


     //   [NSString stringWithFormat:@"{ \"ResponseCode\" : \"%i\" ,\"IsAnyException\" : \"%@\" ,\"Response\" : \"%@\" ",
       //  [responseCode statusCode], @"true",@""];

    }
    else
    {

        NSLog(@"SOME ERROR OCCURED");
        
        NSNumber *errocode = @([(NSHTTPURLResponse *)responseCode statusCode]);
       // NSString *errocode =[@([responseCode statusCode]) stringValue];

        NSDictionary *jsonDictionaryError = [NSDictionary dictionaryWithObjectsAndKeys:
                                       errocode, @"ResponseCode",
                                        @"true", @"IsAnyException",
                                        error.localizedDescription, @"Response",nil];

        NSData *jsonData = [NSJSONSerialization dataWithJSONObject:jsonDictionaryError options:NSJSONWritingPrettyPrinted error:&error];
        NSString *HttpClientResponseDTO = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];

       // NSString *HttpClientResponseDTO =
      //  [NSString stringWithFormat:@"{ \"ResponseCode\" : \"%i\" ,\"IsAnyException\" : \"%@\" ,\"Response\" : \"%@\" ",
       //  [responseCode statusCode], @"true",@""];


        //NSLog(@"Error getting %@, HTTP status code %i", url, [responseCode statusCode]);
        return HttpClientResponseDTO;
    }
    
    //  return [[NSString alloc] initWithData:oResponseData encoding:NSUTF8StringEncoding];
    
    
    
}

+ (NSData *)sendSynchronousRequest:(NSURLRequest *)request
    returningResponse:(__autoreleasing NSURLResponse **)responsePtr
    error:(__autoreleasing NSError **)errorPtr {
    
    
    dispatch_semaphore_t    sem;
    __block NSData *        result;

    result = nil;

    sem = dispatch_semaphore_create(0);

    [[[NSURLSession sharedSession] dataTaskWithRequest:request
        completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
        if (errorPtr != NULL) {
            *errorPtr = error;
        }
        if (responsePtr != NULL) {
            *responsePtr = response;
        }
        if (error == nil) {
            result = data;
        }
        dispatch_semaphore_signal(sem);
    }] resume];

    dispatch_semaphore_wait(sem, DISPATCH_TIME_FOREVER);

   return result;
}

@end








