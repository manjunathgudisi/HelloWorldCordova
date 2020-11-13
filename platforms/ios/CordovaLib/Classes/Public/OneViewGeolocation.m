//
//  OneViewGeolocation.m
//  CordovaLib
//
//  Created by apple on 23/02/16.
//
//

#import "OneViewGeolocation.h"
#import <JavaScriptCore/JavaScriptCore.h>


@protocol JS_OOneViewGeolocationController <JSExport>

-(NSString *)CheckGeolocation;
-(NSString *)OpenGPSSettings;
-(NSString *)GetLatitudeAndLangtitude;
- (void)RemoveLocationUpdates;

@end


@interface OneViewGeolocation()<JS_OOneViewGeolocationController>
@end


@implementation OneViewGeolocation

-(NSString *) CheckGeolocation
{
    ////TODO:IOS Migr
    return false;
}
-(NSString *)OpenGPSSettings
{
    //TODO:IOS Migr
    return  @"//TODO:IOS Migr";
}

//TODO:IOS Migr (Need to test this code)
-(NSString *)GetLatitudeAndLangtitude
{
    CLLocationCoordinate2D coordinate = [self getLocationCoordinates];
    NSString *latitude = [NSString stringWithFormat:@"%f", coordinate.latitude];
    NSString *longitude = [NSString stringWithFormat:@"%f", coordinate.longitude];
    return [NSString stringWithFormat:@"%@, %@", latitude, longitude];
}

-(CLLocationCoordinate2D) getLocationCoordinates {
    
    CLLocationManager *locationManager = [[CLLocationManager alloc] init];
    locationManager.delegate = self;
    locationManager.desiredAccuracy = kCLLocationAccuracyBest;
    locationManager.distanceFilter = kCLDistanceFilterNone;
    [locationManager startUpdatingLocation];
    CLLocation *location = [locationManager location];
    CLLocationCoordinate2D coordinate = [location coordinate];
    
    return coordinate;
}

- (void)RemoveLocationUpdates {
    
}

@end
