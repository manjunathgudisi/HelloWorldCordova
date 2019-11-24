//
//  LocalStorage.m
//  CordovaLib
//
//  Created by Gudisi, Manjunath on 23/11/19.
//

#import "LocalStorage.h"

@implementation LocalStorage

- (void)saveValue:(NSString *)value byKey:(NSString *)key {
    if (key != NULL && value != NULL) {
        NSUserDefaults *standardDefaults = [NSUserDefaults standardUserDefaults];
        [standardDefaults setObject:value forKey:key];
        [standardDefaults synchronize];
    }
}

- (NSString *)getValueByKey:(NSString *)key {
    if (key != NULL) {
        return [[NSUserDefaults standardUserDefaults] objectForKey:key];
    }
    return @"";
}

- (void)removeByKey:(NSString *)key {
    if (key != NULL) {
        [[NSUserDefaults standardUserDefaults] removeObjectForKey:key];
        [[NSUserDefaults standardUserDefaults] synchronize];
    }
}

@end
