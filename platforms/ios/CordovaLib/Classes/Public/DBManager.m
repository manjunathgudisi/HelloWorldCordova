//
//  DBManager.m
//  SQLite3DBSample
//
//  Created by Gabriel Theodoropoulos on 25/6/14.
//  Copyright (c) 2014 Appcoda. All rights reserved.
//

#import "DBManager.h"
#import <sqlite3.h>
#import <JavaScriptCore/JavaScriptCore.h>
#import <Foundation/NSObject.h>
#import <HttpClinetPlugin.h>

@protocol JS_TSViewController <JSExport>
-(NSString *)InitializeDBContext:(NSString *)DBName;
-(NSString *) StartTransaction;
-(NSString *) EndTransaction;
-(NSString *) Rollback;
-(NSString *)excecuteSqlReader:(NSString *)query;
-(NSString *)excecuteSql:(NSString *)query;
-(NSString *)GetAll:(NSString *)TableName;
-(NSString *)Drop:(NSString *)TableName;
-(NSString *)DeleteAll:(NSString *)TableName;
-(NSString *)CopyDatabase;
-(NSString *)RestoreDatabase;

//-(NSString *)GetDatabaseFilename;
//-(NSString *)GetDatabaseDirectory;
-(NSString *)GetDBFullpath;
-(NSString *)UploadDB : (NSString *) DestinationURI;
@end


@interface DBManager()<JS_TSViewController>

@property (nonatomic, strong) NSString *documentsDirectory;

@property (nonatomic, strong) NSString *databaseFilename;

@property (nonatomic, strong) NSMutableArray *arrResults;

@property (nonatomic) sqlite3 *sqlite3Database;


-(void)copyDatabaseIntoDocumentsDirectory;

-(void)runQuery:(const char *)query isQueryExecutable:(BOOL)queryExecutable;


@end


@implementation DBManager

#pragma mark - Initialization

-(instancetype)initWithDatabaseFilename:(NSString *)dbFilename{
    self = [super init];
    if (self) {
        // Set the documents directory path to the documentsDirectory property.
        NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
        self.documentsDirectory = [paths objectAtIndex:0];
        
        // Keep the database filename.
        self.databaseFilename = dbFilename;
        
        // Copy the database file into the documents directory if necessary.
        [self copyDatabaseIntoDocumentsDirectory];
        
        // Create a sqlite object.
        sqlite3 *sqlite3db;
        
        // Set the database file path.
        NSString *databasePath = [self.documentsDirectory stringByAppendingPathComponent:self.databaseFilename];
        
        // Open the database.
        BOOL openDatabaseResult = sqlite3_open([databasePath UTF8String], &sqlite3db);
        if(openDatabaseResult == SQLITE_OK) {
            self.sqlite3Database = sqlite3db;
        }
    }
    return self;
}


#pragma mark - Private method implementation

-(void)copyDatabaseIntoDocumentsDirectory{
    // Check if the database file exists in the documents directory.
    NSString *destinationPath = [self.documentsDirectory stringByAppendingPathComponent:self.databaseFilename];
    if (![[NSFileManager defaultManager] fileExistsAtPath:destinationPath]) {
        // The database file does not exist in the documents directory, so copy it from the main bundle now.
        NSString *sourcePath = [[[NSBundle mainBundle] resourcePath] stringByAppendingPathComponent:self.databaseFilename];
        NSError *error;
        [[NSFileManager defaultManager] copyItemAtPath:sourcePath toPath:destinationPath error:&error];
        
        // Check if any error occurred during copying and display it.
        if (error != nil) {
            NSLog(@"%@", [error localizedDescription]);
        }
    }
}

/*
 -(NSString *)GetDatabaseFilename
 {
 return @[self.databaseFilename];
 }
 
 -(NSString *)GetDatabaseDirectory
 {
 NSString *odocumentsDirectory = @[self.documentsDirectory ] ;
 return odocumentsDirectory;
 }
 */
-(NSString *)GetDBFullpath
{
    NSString *DBFullpath = [self.documentsDirectory stringByAppendingPathComponent:self.databaseFilename];
    return DBFullpath;
}
-(NSString *)UploadDB : (NSString *) DestinationURI
{
    NSString *DBFullpath = [self.documentsDirectory stringByAppendingPathComponent:self.databaseFilename];
    
    HttpClinetPlugin *oHttpClinetPlugin = [[HttpClinetPlugin alloc] init];
    NSString *resp= [oHttpClinetPlugin UploadFile :DBFullpath:DestinationURI];
    return resp;
}


-(NSString *)runQueryadv:(const char *)query isQueryExecutable:(BOOL)queryExecutable{
    // Create a sqlite object.
    //sqlite3 *sqlite3Database;
    sqlite3 *sqlite3Database = self.sqlite3Database;
    
    NSString *JsonResult= @" ";
    
    // Set the database file path.
    //NSString *databasePath = [self.documentsDirectory stringByAppendingPathComponent:self.databaseFilename];
    
    // Initialize the results array.
    if (self.arrResults != nil) {
        [self.arrResults removeAllObjects];
        self.arrResults = nil;
    }
    self.arrResults = [[NSMutableArray alloc] init];
    
    // Initialize the column names array.
    if (self.arrColumnNames != nil) {
        [self.arrColumnNames removeAllObjects];
        self.arrColumnNames = nil;
    }
    self.arrColumnNames = [[NSMutableArray alloc] init];
    
    
    // Open the database.
    //BOOL openDatabaseResult = sqlite3_open([databasePath UTF8String], &sqlite3Database);
    if(sqlite3Database != NULL) {
        // Declare a sqlite3_stmt object in which will be stored the query after having been compiled into a SQLite statement.
        sqlite3_stmt *compiledStatement;
        
        // NSMutableDictionary *dict = [NSMutableDictionary dictionary];
        
        JsonResult= [JsonResult stringByAppendingString:@"[ "];
        NSError *JsonSerError = [[NSError alloc] init];
        // Load all data from database to memory.
        BOOL prepareStatementResult = sqlite3_prepare_v2(sqlite3Database, query, -1, &compiledStatement, NULL);
        if(prepareStatementResult == SQLITE_OK) {
            // Check if the query is non-executable.
            if (!queryExecutable){
                // In this case data must be loaded from the database.
                
                // Declare an array to keep the data for each fetched row.
                NSMutableArray *arrDataRow;
                
                bool isFirstrow=true;
                // Loop through the results and add them to the results array row by row.
                while(sqlite3_step(compiledStatement) == SQLITE_ROW) {
                    
                    NSMutableDictionary *rowDictionary = [[NSMutableDictionary alloc] init];
                    
                    if(isFirstrow ==false)
                    {
                        JsonResult=[JsonResult stringByAppendingString :@" , "];
                    }
                    isFirstrow=false;
                    
                    // Initialize the mutable array that will contain the data of a fetched row.
                    arrDataRow = [[NSMutableArray alloc] init];
                    
                    NSString  *row=@" ";
                    row= [row stringByAppendingString:@" { "];
                    
                    // Get the total number of columns.
                    int totalColumns = sqlite3_column_count(compiledStatement);
                    
                    bool isFirstcol=true;
                    // Go through all columns and fetch each column data.
                    for (int i=0; i<totalColumns; i++){
                        
                        if(isFirstcol ==false)
                        {
                            row= [row stringByAppendingString:@" , "];
                        }
                        isFirstcol=false;
                        
                        //data type
                        int type=sqlite3_column_type(compiledStatement,i);
                        
                        // Convert the column data to text (characters).
                        char *colName = (char *)sqlite3_column_name(compiledStatement, i);
                        NSString *colNameString= [NSString stringWithUTF8String:colName];
                        
                        //NSString *colNameString=@"\"";
                        //colNameString= [colNameString stringByAppendingString: [NSString stringWithUTF8String:colName]];
                        //colNameString= [colNameString stringByAppendingString: @"\""];
                        
                        // Convert the column data to text (characters).
                        
                        if(type==1) // (3 for string) (1 for int)
                        {
                            int val = (int )sqlite3_column_int(compiledStatement, i);
                            [rowDictionary setObject:[NSNumber numberWithInt:val]  forKey:colNameString];
                            
                        }
                        else if(type==5) // (5 for int64)
                        {
                            int val = (int )sqlite3_column_int(compiledStatement, i);
                            [rowDictionary setObject:[NSNumber numberWithInt:val]  forKey:colNameString];
                            
                        }
                        else {
                            char *val = (char *)sqlite3_column_text(compiledStatement, i);
                            NSString *valString=[NSString stringWithUTF8String:val];
                            [rowDictionary setObject:valString  forKey:colNameString];
                        }
                        
                        
                        
                        
                        
                        //row= [row stringByAppendingString: colNameString];
                        // row= [row stringByAppendingString:@" : "];
                        
                        // if(type==3) //(3 for string) (1 for int)
                        //{
                        
                        //[rowDictionary setObject:valString  forKey:colNameString];
                        
                        // valString=[valString stringByReplacingOccurrencesOfString :@"\\\"" withString:@"\""];
                        /*   if ([valString rangeOfString:@"\\\""].location == NSNotFound) {
                         
                         valString=[valString stringByReplacingOccurrencesOfString :@"\"" withString:@"\\\""];
                         
                         }
                         if(![valString hasPrefix:@"\""]) {
                         row= [row stringByAppendingString:@"\""];
                         }
                         row= [row stringByAppendingString:valString];
                         
                         if(![valString hasSuffix:@"\""]) {
                         row= [row stringByAppendingString:@"\""];
                         }
                         
                         */
                        // }
                        // else
                        // {
                        //  [rowDictionary setObject:valString  forKey:colNameString];
                        
                        // row= [row stringByAppendingString:valString];
                        //   row =[row stringByReplacingOccurrencesOfString:@"\"" withString:@"\ \""];
                        
                        
                        //}
                        
                        // Mutable
                        //[dict setValue:[NSString stringWithUTF8String:val] forKey:[NSString stringWithUTF8String:colName]];
                    }
                    //row= [row stringByAppendingString:@" } "];
                    
                    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:rowDictionary options:NSJSONWritingPrettyPrinted error:&JsonSerError];
                    NSString *rowObj = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
                    
                    JsonResult=[JsonResult stringByAppendingString:rowObj];
                }
                JsonResult=[JsonResult stringByAppendingString :@" ] "];
            }
            else {
                // This is the case of an executable query (insert, update, ...).
                JsonResult=@"{true}";
                // Execute the query.
                BOOL executeQueryResults = sqlite3_step(compiledStatement);
                // if (executeQueryResults == SQLITE_DONE) {
                if (executeQueryResults == YES) {
                    // Keep the affected rows.
                    self.affectedRows = sqlite3_changes(sqlite3Database);
                    
                    // Keep the last inserted row ID.
                    self.lastInsertedRowID = sqlite3_last_insert_rowid(sqlite3Database);
                }
                else {
                    JsonResult=@"{false}";
                    // If could not execute the query show the error message on the debugger.
                    NSLog(@"DB Error: %s", sqlite3_errmsg(sqlite3Database));
                }
            }
        }
        else {
            // In the database cannot be opened then show the error message on the debugger.
            NSLog(@"%s", sqlite3_errmsg(sqlite3Database));
        }
        
        // Release the compiled statement from memory.
        sqlite3_finalize(compiledStatement);
        
    }
    
    // Close the database.
    //sqlite3_close(sqlite3Database);
    
    return JsonResult;
}

#pragma mark - Public method implementation



-(NSString *) StartTransaction
{
    BOOL prepareStatementResult = sqlite3_exec(self.sqlite3Database, "BEGIN TRANSACTION", 0, 0, 0);
    if(prepareStatementResult == SQLITE_OK){
        return @"true";
    }
    else {
        // In the database cannot be opened then show the error message on the debugger.
        NSLog(@"%s", sqlite3_errmsg(self.sqlite3Database));
        return @"false";
    }
}

-(NSString *) EndTransaction
{
    BOOL prepareStatementResult = sqlite3_exec(self.sqlite3Database, "COMMIT TRANSACTION", 0, 0, 0);
    if(prepareStatementResult == SQLITE_OK){
        return @"true";
    }
    else {
        // In the database cannot be opened then show the error message on the debugger.
        NSLog(@"%s", sqlite3_errmsg(self.sqlite3Database));
        return @"false";
    }
}

-(NSString *) Rollback
{
    BOOL prepareStatementResult = sqlite3_exec(self.sqlite3Database, "ROllBACK TRANSACTION", 0, 0, 0);
    if(prepareStatementResult == SQLITE_OK){
        return @"true";
    }
    else {
        // In the database cannot be opened then show the error message on the debugger.
        NSLog(@"%s", sqlite3_errmsg(self.sqlite3Database));
        return @"false";
    }
}

-(NSString *)excecuteSqlReader:(NSString *)query{
    // Run the query and indicate that is not executable.
    // The query string is converted to a char* object.
    NSString *JsonResult=  [self runQueryadv:[query UTF8String] isQueryExecutable:NO];
    // Returned the loaded results.
    return JsonResult;
    
}
-(NSString *)excecuteSql:(NSString *)query{
    // Run the query and indicate that is not executable.
    // The query string is converted to a char* object.
    NSString *JsonResult=  [self runQueryadv:[query UTF8String] isQueryExecutable:YES];
    // Returned the loaded results.
    return JsonResult;
    
}

-(NSString *)GetAll:(NSString *)TableName{
    // Run the query and indicate that is not executable.
    // The query string is converted to a char* object.
    //NSString *JsonResult=  [self runQueryadv:[query UTF8String] isQueryExecutable:NO];
    // Returned the loaded results.
    return @"Not implemented exception";
    
}
-(NSString *)Drop:(NSString *)TableName{
    // Run the query and indicate that is not executable.
    // The query string is converted to a char* object.
    //NSString *JsonResult=  [self runQueryadv:[query UTF8String] isQueryExecutable:NO];
    // Returned the loaded results.
    ///return @"Not implemented exception";
    
    // DROP TABLE IF EXISTS TABLE_NAME;
    
    NSString *query = [NSString stringWithFormat:@"DROP TABLE IF EXISTS %@",TableName];
    NSString *JsonResult=  [self runQueryadv:[query UTF8String] isQueryExecutable:YES];
    return JsonResult;
    
}
-(NSString *)DeleteAll:(NSString *)TableName{
    // Run the query and indicate that is not executable.
    // The query string is converted to a char* object.
    //NSString *JsonResult=  [self runQueryadv:[query UTF8String] isQueryExecutable:NO];
    // Returned the loaded results.
    return @"Not implemented exception";
    
}
-(NSString *)CopyDatabase{
    
    
    
    
    
    
    /*File dbfile = new File(DB_PATH+DBName);
     
     String AbsolutePath = dbfile.getAbsolutePath();
     
     final String inFileName = AbsolutePath;
     
     File dbFile = new File(inFileName);
     FileInputStream fis = new FileInputStream(dbFile);
     
     String PATH = "/mnt/sdcard/OneView/DB Backup/";
     File file = new File(PATH);
     
     if(file.exists() == false){
     file.mkdirs();
     }
     
     //String outFileName = "/storage/sdcard0/EKFC/" + "OneView";
     String outFileName = PATH + DBName;
     
     // Open the empty db as the output stream
     OutputStream output = new FileOutputStream(outFileName);
     
     // Transfer bytes from the inputfile to the outputfile
     byte[] buffer = new byte[1024];
     int length;
     while ((length = fis.read(buffer)) > 0) {
     output.write(buffer, 0, length);
     }
     
     // Close the streams
     output.flush();
     output.close();
     
     
     fis.close(); */
    
    
    return @"Not implemented exception";
}
-(NSString *)RestoreDatabase{
    // Run the query and indicate that is not executable.
    // The query string is converted to a char* object.
    //NSString *JsonResult=  [self runQueryadv:[query UTF8String] isQueryExecutable:NO];
    // Returned the loaded results.
    //return JsonResult;
    return @"Not implemented exception";
    
}

-(NSString *)INDBContext1:(NSString *)query{
    // Run the query and indicate that is not executable.
    // The query string is converted to a char* object.
    NSString *JsonResult=  [self runQueryadv:[query UTF8String] isQueryExecutable:YES];
    // Returned the loaded results.
    return JsonResult;
    
}

-(NSString *)InitializeDBContext:(NSString *)DBName{
    
    // NSString *dbFilename=  [@"Service" stringByAppendingString:ServiceId];
    //  dbFilename=[dbFilename stringByAppendingString:@"DB"];
    
    NSString *JsonResult=  [self initWithDatabaseFilename: DBName];
    return DBName;
    
    
}


@end
