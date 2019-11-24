
// SqliteQG -> sqlite query generation

function SqliteQG() {
    try {
        OneViewConsole.Debug("SqliteQG Start", "Framework.SqliteQG");

        var myInstance = this;

        this.GetInsertQuery = function (obj) {
            try {
                OneViewConsole.Debug("GetInsertQuery Start", "SqliteQG.GetInsertQuery");

                var query = "INSERT INTO " + obj.constructor.name + " (";
                var values = " VALUES (";
                var keys = getKeys(obj);
                var type = new window[obj.constructor.name]();
                for (var i = 0; i < keys.length; i++) {
                    var DataType = formatValue(obj[keys[i]], type[keys[i]]);
                    if (DataType != null) {
                        query += keys[i] + ((i < keys.length - 1) ? "," : ") ");
                        values += DataType + ((i < keys.length - 1) ? "," : ")");
                    }
                }
                query = query + values;
                //alert(query);

                OneViewConsole.Debug("GetInsertQuery End", "SqliteQG.GetInsertQuery");

                return query;
            }
            catch (Excep) {            	
                throw oOneViewExceptionHandler.Create("Framework", "SqliteQG.GetInsertQuery", Excep);
            }
            finally {
                query = null;
                values = null;
                keys = null;
                type = null;
                DataType = null;
            }
        }

        this.GetBulkInsertQuery = function (array) {
            try {
                OneViewConsole.Debug("GetBulkInsertQuery Start", "SqliteQG.GetBulkInsertQuery");

                var query = "INSERT INTO " + array[0].constructor.name + " (";
                var values = " VALUES ";
                var keys = getKeys(array[0]);
                var type = new window[array[0].constructor.name]();

                for (var j = 0; j < array.length; j++) {
                    values += "(";
                    for (var i = 0; i < keys.length; i++) {
                        var DataType = formatValue(array[j][keys[i]], type[keys[i]]);
                        if (DataType != null) {
                            if (j == 0) {
                                query += keys[i] + ((i < keys.length - 1) ? "," : ") ");
                            }
                            values += DataType + ((i < keys.length - 1) ? "," : ")");
                        }
                    }
                    values += (j < array.length - 1) ? "," : "";
                }

                query = query + values;
                //alert(query);

                OneViewConsole.Debug("GetBulkInsertQuery End", "SqliteQG.GetBulkInsertQuery");

                return query;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "SqliteQG.GetBulkInsertQuery", Excep);
            }
            finally {
                query = null;
                values = null;
                keys = null;
                type = null;
                DataType = null;
            }
        }

        this.GetCreateTableQuery = function (obj) {
            try {
                OneViewConsole.Debug("GetCreateTableQuery Start", "SqliteQG.GetCreateTableQuery");

                    var Columns = "";
                    var keys = getKeys(obj);
                    var type = new window[obj.constructor.name]();
                    for (var i = 0; i < keys.length; i++) {
                        var DataType = formatValue_CreateTable(obj[keys[i]], type[keys[i]]);
                        // Foreign key reference checking
                        if (DataType != null) {
                            Columns += keys[i] + " " + DataType + ((i < keys.length - 1) ? ", " : "");
                        }
                    }
                    var query = 'CREATE TABLE IF NOT EXISTS ' + obj.constructor.name + ' (' + Columns + ')';
                    //alert(query);

                OneViewConsole.Debug("GetCreateTableQuery End", "SqliteQG.GetCreateTableQuery");

                return query;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "SqliteQG.GetCreateTableQuery", Excep);
            }
            finally {
                Columns = null;
                keys = null;
                type = null;
                DataType = null;
                query = null;
            }
        }

        this.GetUpdateQuery = function (obj) {
            try {
                OneViewConsole.Debug("GetUpdateQuery Start", "SqliteQG.GetUpdateQuery");

                    var query = "UPDATE " + obj.constructor.name;
                    var values = " SET ";
                    var condition = " Where ";
                    var keys = getKeys(obj);
                    var type = new window[obj.constructor.name]();
                    var PrimaryKeyId;
                    for (var i = 0; i < keys.length; i++) {
                        if (type[keys[i]] != "INT PRIMARYKEY") {
                            values += keys[i] + "=" + formatValue(obj[keys[i]], type[keys[i]]) + ((i < keys.length - 1) ? ", " : "");
                        }
                        else {
                            PrimaryKeyId = formatValue(obj[keys[i]], type[keys[i]]);
                            condition += keys[i] + "=" + PrimaryKeyId;
                        }
                    }
                    var query = query + values + condition;
                    //alert(query);

                OneViewConsole.Debug("GetUpdateQuery End", "SqliteQG.GetUpdateQuery");

                if (PrimaryKeyId != "INT PRIMARYKEY") {
                    return query;
                }
                else {
                    throw Error(" PrimaryKey is not defined while updating the entity\nSource : SqliteQG.GetUpdateQuery");
                }
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "SqliteQG.GetUpdateQuery", Excep);
            }
            finally {
                query = null;
                values = null;
                condition = null;
                keys = null;
                type = null;
            }
        }

        var formatValue = function (obj, type) {
            try {
                OneViewConsole.Debug("formatValue Start", "SqliteQG.formatValue");

                    if (obj == "INT") { return 0; }
                    else if (obj == "TEXT") { return "''"; }
                    else
                    {
                        switch (type) {
                            case "INT PRIMARYKEY": return obj;
                            case "TEXT": return "'" + obj + "'";
                            case "INT": return obj;
                            default: return null;
                        }
                    }

                OneViewConsole.Debug("formatValue End", "SqliteQG.formatValue");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "SqliteQG.formatValue", Excep);
            }
        }

        var formatValue_CreateTable = function (obj, type) {
            try {
                OneViewConsole.Debug("formatValue Start", "SqliteQG.formatValue");

                    switch (type) {
                        case "INT PRIMARYKEY": return "INT PRIMARYKEY";
                        case "TEXT": return "TEXT";
                        case "INT": return "INT";
                        case "BLOB": return "BLOB";
                        default: return null;
                    }

                OneViewConsole.Debug("formatValue End", "SqliteQG.formatValue");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "SqliteQG.formatValue", Excep);
            }
        }

        var getKeys = function (obj) {
            try {
                OneViewConsole.Debug("getKeys Start", "SqliteQG.getKeys");

                var keys = [];
                for (var key in obj) {
                    keys.push(key);
                }

                OneViewConsole.Debug("getKeys End", "SqliteQG.getKeys");

                return keys;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "SqliteQG.getKeys", Excep);
            }
            finally {
                keys = null;
            }
        }

        this.GetCriteria = function (Condition) {
            try {
                OneViewConsole.Debug("GetCriteria Start", "SqliteQG.GetCriteria");

                switch (type) {

                    case "Equal": return "=";
                    case "NotEqual": return "!=";
                    case "GreaterThan": return ">";
                    case "NotGreaterThan": return "!>";
                    case "GreaterThanOrEqual": return ">=";
                    case "LessThan": return "<";
                    case "NotLessThan": return "!<";
                    case "LessThanOrEqual": return "<=";
                    default: return null;
                }

                OneViewConsole.Debug("GetCriteria End", "SqliteQG.GetCriteria");
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "SqliteQG.GetCriteria", Excep);
            }
        }

        this.Normalize = function (oRequestedEntity, oResponseFromDB) {
            try {
                OneViewConsole.Debug("Normalize Start", "SqliteQG.Normalize");

                var Keys = getKeys(oRequestedEntity);

                for (var itrKey in Keys) {
                    if (oRequestedEntity[Keys[itrKey]] != null && Object.prototype.toString.call(oRequestedEntity[Keys[itrKey]]) != '[object Array]') {
                        oRequestedEntity[Keys[itrKey]] = oResponseFromDB[Keys[itrKey]];
                    }
                }

                OneViewConsole.Debug("Normalize End", "SqliteQG.Normalize");

                return oRequestedEntity;
            }
            catch (Excep) {
                throw oOneViewExceptionHandler.Create("Framework", "SqliteQG.Normalize", Excep);
            }
        }

        OneViewConsole.Debug("SqliteQG End", "Framework.SqliteQG");
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Framework", "SqliteQG", Excep);
    }
}

function DataType() {
    try {
        OneViewConsole.Debug("DataType Start", "Framework.DataType");

        this.String = "TEXT";
        this.Integer = "INT";

        OneViewConsole.Debug("DataType End", "Framework.DataType");

        return this;
    }
    catch (Excep) {
        throw oOneViewExceptionHandler.Create("Framework", "DataType", Excep);
    }
}


   