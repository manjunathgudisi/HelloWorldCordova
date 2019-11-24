//
//  OneViewDeviceInfo.m
//  CordovaLib
//
//  Created by apple on 20/02/16.
//
//

#import "OneViewDeviceInfo.h"
#import <sys/utsname.h>
#import <JavaScriptCore/JavaScriptCore.h>
#import <Foundation/NSObject.h>
#include <ifaddrs.h>
#include <arpa/inet.h>
//#import "Message/NetworkController.h"

@protocol JS_OneViewDeviceInfoController <JSExport>
//-(NSString *) GetUUID;
//-(NSString *) GetOSVersion;
-(NSString *)GetManufacturer;
-(NSString *)GetBrand;
-(NSString *)GetIpAddress;
-(NSString *)GetSimSerialNumber;
-(NSString *)GetIMEINumber;
-(NSString *)GetLine1PhoneNumber;
-(NSString *)machineName;
@end


@interface OneViewDeviceInfo()<JS_OneViewDeviceInfoController>
@end


@implementation OneViewDeviceInfo

-(NSString *) GetManufacturer
{
    //TODO:(20Feb2016 Harshil) : Need to check with Android api and server log
    return @"apple";
}
-(NSString *)GetBrand
{
    //TODO:(20Feb2016 Harshil) : Need to check with Android api and server log
    return  [self machineName];
}

-(NSString *)GetIpAddress
{
    NSString *address = @"error";
    struct ifaddrs *interfaces = NULL;
    struct ifaddrs *temp_addr = NULL;
    int success = 0;
    // retrieve the current interfaces - returns 0 on success
    success = getifaddrs(&interfaces);
    if (success == 0) {
        // Loop through linked list of interfaces
        temp_addr = interfaces;
        while(temp_addr != NULL) {
            if(temp_addr->ifa_addr->sa_family == AF_INET) {
                // Check if interface is en0 which is the wifi connection on the iPhone
                if([[NSString stringWithUTF8String:temp_addr->ifa_name] isEqualToString:@"en0"]) {
                    // Get NSString from C String
                    address = [NSString stringWithUTF8String:inet_ntoa(((struct sockaddr_in *)temp_addr->ifa_addr)->sin_addr)];
                    
                }
                
            }
            
            temp_addr = temp_addr->ifa_next;
        }
    }
    // Free memory
    freeifaddrs(interfaces);
    return address;
    
    
}
-(NSString *)GetSimSerialNumber
{
    
    return @"OneViewAppInfo.GetSimSerialNumber : Not implemented exception";
}
-(NSString *)GetIMEINumber
{
    //NetworkController *ntc=[[NetworkController sharedInstance] autorelease];
    // NSString *imeistring = [ntc IMEI];
    
    return @"OneViewAppInfo.GetManufacturer : Not implemented exception";
}
-(NSString *)GetLine1PhoneNumber
{
    return @"OneViewAppInfo.GetManufacturer : Not implemented exception";
}


-(NSString *)machineName
{
    
    struct utsname systemInfo;
    uname(&systemInfo);
    
    return [NSString stringWithCString:systemInfo.machine
                              encoding:NSUTF8StringEncoding];
}



@end
