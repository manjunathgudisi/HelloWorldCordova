//
//  LocalStorage.h
//  CordovaLib
//
//  Created by Gudisi, Manjunath on 23/11/19.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface LocalStorage : NSObject

- (void)saveValue:(NSString *)value byKey:(NSString *)key;
- (NSString *)getValueByKey:(NSString *)key;
- (void)removeByKey:(NSString *)key;

@end

NS_ASSUME_NONNULL_END
