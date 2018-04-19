
/*
 * GET home page.
 */

var sysconf = require('../configure/sysconfig')
  , url = require('url')
  , querystring = require('querystring');

function translater(lang, obj) {
  switch(lang) {
    default:
    case "/":
      return obj[sysconf.sysconf.defaultLang];
    case "/zh_TW":
      return obj["zh_TW"];
    case "/en":
      return obj["en"];
  }
}

exports.index = function(req, res){
  var query = url.parse(req.url).query;
  var allQueries = querystring.parse(query);
  var lang = url.parse(req.url).pathname;

  res.render('index', { 
    title: translater(lang, {'en':'UMap', "zh_TW":'UMap'}),
    searchingtext: translater(lang, {'en':'Searching Text', "zh_TW":'輸入搜尋字串'}),
    login: translater(lang, {'en':'Login Dropbox or Google Drive', "zh_TW":'登入 Dropbox 或 Google Drive'}),
    example: translater(lang, {'en':'Example', "zh_TW":'範例'}),
    point: translater(lang, {'en':'Points', "zh_TW":'點資料'}),
    line: translater(lang, {'en':'Lines', "zh_TW":'線資料'}),
    polygon: translater(lang, {'en':'Polygon', "zh_TW":'多邊形資料'}),
    custom: translater(lang, {'en':'Custom', "zh_TW":'自訂圖層'}),
    addmarker: translater(lang, {'en':'Add Marker', "zh_TW":'增加標示'}),
    addline: translater(lang, {'en':'Add Line', "zh_TW":'增加線條'}),
    addpolygon: translater(lang, {'en':'Add Polygon', "zh_TW":'增加多邊形'}),
    sourcecode: translater(lang, {'en':'Source Code', "zh_TW":'開放原始碼'}),
    changelang: translater(lang, {'en':'中文', "zh_TW":'English'}),
    changelangurl: translater(lang, {'en':'/zh_TW', "zh_TW":'/en'}),
    opinion: translater(lang, {'en':'Opinion', "zh_TW":'提供意見'}),
    loginTitle: translater(lang, {'en':'Select a service to login.', "zh_TW":'選擇一個服務登入'}),
    closeLogin: translater(lang, {'en':'Close', "zh_TW":'關閉'})
  });
};