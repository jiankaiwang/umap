/*
 * secret information
 */
var sysconf = {
    "umap_version" : "0.0.1"
    , "availableLang" : "en zh_TW"
    , "defaultLang" : "en"
    , "site_description" : "Umap is the general GIS purpose framework based on nodejs."
    , "error_emails_to" : "null"
    , "api_allow_host" : "localhost 127.0.0.1"
    , "use-redis": false
    , "redisServer": {
        "host": "",
        "port": 6379,
        "password": "",
        "ttl": 260
    }
};


/*
 * export list
 */
exports.sysconf = sysconf;