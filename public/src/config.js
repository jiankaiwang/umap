/*
 * global variables for multiple purposes
 * |- defaultLang : system default language
 * |- baseMapZoomConf : the max and min zoom
 * |- allBaseLayers : available layers added to the basemap
 * |- layerTypeName : define all layer names
 */
var defaultLang = ""; 
var baseMapZoomConf = { "min" : 3, "max" : 16 }; 
var crtLoc = [23.785273, 121.018374];
var zoomLevel = 7;
var allBaseLayers = [];
var layerTypeName = {};

/****************************************************************
 * desc : language translation
 ****************************************************************/
function getLang() {
	var pn = window.location.pathname;
	if (pn.length > 0) {
		return pn.substr(1,pn.length);
	} else {
		return "";
	}
}
defaultLang = getLang();

/****************************************************************
 * base map issue
 ****************************************************************/
/*
 * desc : design base map layer
 */ 
var baseMapUri ={
	"osm" : {
		"outdoor" : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
		"grey" :  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
	}
}

layerTypeName = {
	"osm" : {
		"outdoor" : { "zh_TW" : "一般", "en" : "Outdoor" },
		"grey" : { "zh_TW" : "灰階", "en" : "Gray" }
	}
} 
 
var attributionInfo = {
	"osm" : 'Mapdata &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>, UMap &copy; 2017'
};

var outdoorLayer = L.tileLayer(
	baseMapUri["osm"]["outdoor"], 
	{ attribution: attributionInfo["osm"], maxZoom: baseMapZoomConf["max"], minZoom: baseMapZoomConf["min"] }
), greyLayer = L.tileLayer(
	baseMapUri["osm"]["grey"], 
	{ attribution: attributionInfo["osm"], maxZoom: baseMapZoomConf["max"], minZoom: baseMapZoomConf["min"] }
);	

allBaseLayers = [outdoorLayer, greyLayer];

/****************************************************************
 * language translation
 ****************************************************************/
/**
 * desc : get the translation
 */
function frontTranslation(item, lang) {
	return front_translation[item][lang];
}

/**
 * language translation
 */
var front_translation = {
    "selfLocBtn": { "en": "Current Position", "zh_TW": "定位" }
};