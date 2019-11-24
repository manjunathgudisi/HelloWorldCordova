//
//  UIWebView+TS_JavaScriptContext.m
//
//  Created by Nicholas Hodapp on 11/15/13.
//  Copyright (c) 2013 CoDeveloper, LLC. All rights reserved.
//

#import "UIWebView+TS_JavaScriptContext.h"

#import <JavaScriptCore/JavaScriptCore.h>
#import <objc/runtime.h>
#import "DBManager.h"
#import "HttpClinetPlugin.h"
#import "OneViewAppInfo.h"
#import "OneViewDeviceInfo.h"
#import "OneViewGeolocation.h"


@protocol JS_TSViewController <JSExport>
- (NSString *) Start_VoidMethod1;
@end

static const char kTSJavaScriptContext[] = "ts_javaScriptContext";

static NSHashTable* g_webViews = nil;

@interface UIWebView (TS_JavaScriptCore_private) <JS_TSViewController>
- (void) ts_didCreateJavaScriptContext:(JSContext *)ts_javaScriptContext;
@end

@protocol TSWebFrame <NSObject>
- (id) parentFrame;
@end

@implementation NSObject (TS_JavaScriptContext)

- (void) webView: (id) unused didCreateJavaScriptContext: (JSContext*) ctx forFrame: (id<TSWebFrame>) frame
{
    NSParameterAssert( [frame respondsToSelector: @selector( parentFrame )] );
    
    // only interested in root-level frames
    if ( [frame respondsToSelector: @selector( parentFrame) ] && [frame parentFrame] != nil )
        return;
    
    void (^notifyDidCreateJavaScriptContext)() = ^{
        
        for ( UIWebView* webView in g_webViews )
        {
            NSString* cookie = [NSString stringWithFormat: @"ts_jscWebView_%lud", (unsigned long)webView.hash ];
            
            [webView stringByEvaluatingJavaScriptFromString: [NSString stringWithFormat: @"var %@ = '%@'", cookie, cookie ] ];
            
            if ( [ctx[cookie].toString isEqualToString: cookie] )
            {
                [webView ts_didCreateJavaScriptContext: ctx];
                return;
            }
        }
    };
    
    if ( [NSThread isMainThread] )
    {
        notifyDidCreateJavaScriptContext();
    }
    else
    {
        dispatch_async( dispatch_get_main_queue(), notifyDidCreateJavaScriptContext );
    }
}

@end


@implementation UIWebView (TS_JavaScriptContext)

+ (id) allocWithZone:(struct _NSZone *)zone
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        
        g_webViews = [NSHashTable weakObjectsHashTable];
    });
    
    NSAssert( [NSThread isMainThread], @"uh oh - why aren't we on the main thread?");
    
    id webView = [super allocWithZone: zone];
    
    [g_webViews addObject: webView];
    
    return webView;
}

- (void) ts_didCreateJavaScriptContext:(JSContext *)ts_javaScriptContext
{
    [self willChangeValueForKey: @"ts_javaScriptContext"];
    
    objc_setAssociatedObject( self, kTSJavaScriptContext, ts_javaScriptContext, OBJC_ASSOCIATION_RETAIN);
    
    [self didChangeValueForKey: @"ts_javaScriptContext"];
    
    
    ts_javaScriptContext[@"sayHello"] = ^{
        
        dispatch_async( dispatch_get_main_queue(), ^{
            
            UIAlertView* av = [[UIAlertView alloc] initWithTitle: @"Hello, World!"
                                                         message: nil
                                                        delegate: nil
                                               cancelButtonTitle: @"OK"
                                               otherButtonTitles: nil];
            
            [av show];
        });
    };
    
    //Test *Testobject = [[Test alloc] init];
    // ts_javaScriptContext[@"viewController1"] = Testobject;
    
    // set up OneViewSqlite
    DBManager *DBManagerobj = [[DBManager alloc] init];
    ts_javaScriptContext[@"OneViewSqlite"] = DBManagerobj;
    //[DBManagerobj initWithDatabaseFilename: @"testdb"];
    
    // set up OneViewSqlite
    HttpClinetPlugin *httpClinetPlugin = [[HttpClinetPlugin alloc] init];
    ts_javaScriptContext[@"HttpClinetPlugin"] = httpClinetPlugin;
    
    // set up OneViewSqlite
    OneViewDeviceInfo *oOneViewDeviceInfo = [[OneViewDeviceInfo alloc] init];
    ts_javaScriptContext[@"OneViewDeviceInfo"] = oOneViewDeviceInfo;
    
    // set up OneViewAppInfo
    OneViewAppInfo *oOneViewAppInfo = [[OneViewAppInfo alloc] init];
    ts_javaScriptContext[@"OneViewAppInfo"] = oOneViewAppInfo;
    
    // set up OneViewAppInfo
    OneViewGeolocation *oOneViewGeolocation = [[OneViewGeolocation alloc] init];
    ts_javaScriptContext[@"OneViewGeolocation"] = oOneViewGeolocation;
    
    
    if ( [self.delegate respondsToSelector: @selector(webView:didCreateJavaScriptContext1:)] )
    {
        id<TSWebViewDelegate> delegate = ( id<TSWebViewDelegate>)self.delegate;
        [delegate webView: self didCreateJavaScriptContext1: ts_javaScriptContext];
    }
    
    // id<TSWebViewDelegate> delegate = ( id<TSWebViewDelegate>)self.delegate;
    //[delegate webView: self didCreateJavaScriptContext1: ts_javaScriptContext];
}

- (NSString *) Start_VoidMethod1
{
    return @"fff";
    //UIAlertView* av = [[UIAlertView alloc] initWithTitle: @"Goodbye, World!"
    //                                           message: nil
    ///                                        delegate: nil
    //                               cancelButtonTitle: @"OK"
    //                              otherButtonTitles: nil];
    
    // [av show];
}

- (JSContext*) ts_javaScriptContext
{
    JSContext* javaScriptContext = objc_getAssociatedObject( self, kTSJavaScriptContext );
    
    return javaScriptContext;
}

@end