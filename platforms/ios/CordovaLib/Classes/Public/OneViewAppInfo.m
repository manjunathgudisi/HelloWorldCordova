//
//  OneViewAppInfo.m
//  CordovaLib
//
//  Created by apple on 20/02/16.
//
//

#import "OneViewAppInfo.h"
#import <JavaScriptCore/JavaScriptCore.h>
#import <Foundation/NSObject.h>
#import <HttpClinetPlugin.h>

@protocol JS_OneViewAppInfoController <JSExport>
-(NSString *)ClearCache;
-(NSString *)SetPortraitOrientation;
-(NSString *)LockOrientation;
-(NSString *)UnLockOrientation;
-(NSString *)GetRemoteAppInfo: (NSString *)orgName :(NSString *)ServiceURL;
-(NSString *)GetLocalAppInfo;
-(NSString *)GetConfigFile: (NSString *)OrgName :(NSString *)ServiceURL;
-(NSString *)DownloadJsFile:(NSString *)OrgName :(NSString *)DirectoryName :(NSString *)FileName : (NSString *)ServiceURL;
-(NSString *)DownloadApk:(NSString *)OrgName :(NSString *)ServiceURL;
-(NSString *)UpdateApk;
-(NSString *)ShowToast:(NSString *)Message :(NSString *)ServiceURL;
-(NSString *)ClearCacheFiles;
-(NSString *)ClearCacheFilesByName:(NSString *)Name;
-(NSString *)SetLandScapeOrientation;
-(BOOL)IsFileExist:(NSString *)path;
@end


@interface OneViewAppInfo()<JS_OneViewAppInfoController>
@end



@implementation OneViewAppInfo

-(NSString *) ClearCache
{
    return @"OneViewAppInfo.ClearCache : Not implemented exception";
}
-(NSString *) SetPortraitOrientation
{
    // NSNumber *value = [NSNumber numberWithInt:UIInterfaceOrientationLandscapeLeft];
    //  [[UIDevice currentDevice] setValue:value forKey:@"orientation"];
    
    return @"OneViewAppInfo.SetPortraitOrientation : Not implemented exception";
}
-(NSString *) LockOrientation
{
    return @"OneViewAppInfo.LockOrientation : Not implemented exception";
}
-(NSString *) UnLockOrientation
{
    return @"OneViewAppInfo.UnLockOrientation : Not implemented exception";
}

-(NSString *) SetLandScapeOrientation
{
    return @"OneViewAppInfo.SetLandScapeOrientation : Not implemented exception";
}



-(NSString *) GetRemoteAppInfo:(NSString *)orgName :(NSString *)ServiceURL
{
    HttpClinetPlugin *oHttpClinetPlugin = [[HttpClinetPlugin alloc] init];
    
    NSString *UniqueFileName=[self GetUniqueFileName];
    NSString *urld = [NSString stringWithFormat:@"%@ApkUpdation/%@/AppInfo.txt?time=%@",
                      ServiceURL, orgName,UniqueFileName];
    
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
-(NSString *) GetLocalAppInfo
{
    
    NSError *error = [[NSError alloc] init];
    
    NSDictionary *infoDictionary = [[NSBundle mainBundle]infoDictionary];
    
    NSString *version = infoDictionary[@"CFBundleShortVersionString"];
    NSString *build = infoDictionary[(NSString*)kCFBundleVersionKey];
    NSString *bundleName = infoDictionary[(NSString *)kCFBundleNameKey];
    
    NSDictionary *jsonDictionary = [NSDictionary dictionaryWithObjectsAndKeys:
                                    version, @"VersionName",
                                    build, @"VersionCode",
                                    nil];
    
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:jsonDictionary options:NSJSONWritingPrettyPrinted error:&error];
    NSString *resp = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    return resp;
    
}
-(NSString *) GetConfigFile :(NSString *)OrgName :(NSString *)ServiceURL
{
    return @"OneViewAppInfo.GetConfigFile : Not implemented exception";
}
-(NSString *) DownloadJsFile:(NSString *)OrgName :(NSString *)DirectoryName : (NSString *)FileName :(NSString *)ServiceURL
{
    return @"OneViewAppInfo.DownloadJsFile : Not implemented exception";
}
-(NSString *) DownloadApk : (NSString *)OrgName :(NSString *)ServiceURL
{
    return @"OneViewAppInfo.DownloadApk : Not implemented exception";
}
-(NSString *) UpdateApk
{
    return @"OneViewAppInfo.UpdateApk : Not implemented exception";
}
-(NSString *)ShowToast:(NSString *)Message :(NSString *)ServiceURL
{
    return @"OneViewAppInfo.ShowToast : Not implemented exception";
}
-(NSString *)ClearCacheFiles
{
    return @"OneViewAppInfo.ClearCacheFiles : Not implemented exception";
}
-(NSString *)ClearCacheFilesByName:(NSString *)Name
{
    return @"OneViewAppInfo.ClearCacheFilesByName : Not implemented exception";
}

-(BOOL)IsFileExist:(NSString *)path {
	return [[NSFileManager defaultManager] fileExistsAtPath:path];
}

@end
