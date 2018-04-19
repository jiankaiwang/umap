/*
 * global settings
 * |- mymap : base map object
 */
var mymap;

/*
 * desc : api checker
 */
function apiChecker(callback) {
	$.ajax({
		url: '/api',
		type: 'get',
		data: {},
		error: function (xhr, ajaxOptions, thrownError) {
			callback(xhr.status + " " + thrownError + ". Cannot connect to /api.");
		},
		success: function (response) {
			if(defaultLang.length < 1) {
				// get the default language only when no other language assigning
				defaultLang = response["defaultLang"];
			}
			callback(null, "");
		}
	});
}

/*
 * desc : initial base map
 */
function initialMap(previousInfo, callback) {
	try {
		// basic setting, setView and personal information
		mymap = L.map('mapid',{
			center: crtLoc,
			zoomControl: false,
			zoom: zoomLevel,
			layers: allBaseLayers[0]
		});
		
		// map change event listener
		var prepareLayers = {};
		prepareLayers[layerTypeName["osm"]["outdoor"][defaultLang]] = allBaseLayers[0];
		prepareLayers[layerTypeName["osm"]["grey"][defaultLang]] = allBaseLayers[1];
		L.control.layers(prepareLayers, null,{position: 'bottomright'}).addTo(mymap);
		
		// catch map basemap changing into greyscale event
		mymap.on('baselayerchange', function (e) {
			if (e.name == layerTypeName["osm"]["grey"][defaultLang] && (!$('#mapid').hasClass('grayscale'))) {
				$('#mapid').addClass('grayscale');
			} else if (e.name != layerTypeName["osm"]["grey"][defaultLang] && $('#mapid').hasClass('grayscale')) {
				$('#mapid').removeClass('grayscale');
			}
		});

		//add zoom control with your options
		L.control.zoom({
			position:'bottomright'
		}).addTo(mymap);

		// success callback
		callback(null, "");
	} catch(err) {
		callback("Can not initialize the map. " + err);
	}
}

/**
 * desc: prepare the properities
 */
function prepareProperity(data) {
	var key = getDictionaryKeyList(data);
	var text = "<h5>";
	for(var i = 0 ; i < key.length ; i++) {
		text += key[i] + ": " + data[key[i]] + "<br>";
	}
	text += "</h5>";
	return text;
}

/**
 * desc: add points on the map
 */
function addPointService() {
	function onEachFeature(feature, layer) {
		// does this feature have a property named popupContent?
		if (feature.properties) {
			layer.bindPopup(prepareProperity(feature.properties));
		}
	}

	var states = [];

	var geojsonMarkerOptions = {
		radius: 6,
		fillColor: "#ff7800",
		color: "#000",
		weight: 1,
		opacity: 1,
		fillOpacity: 0.8
	};

	$.ajax({
		url: '/data/point.geojson',
		type: 'get',
		data: {},
		error: function (xhr) {
			console.log("Can not fetch data. Please contact the administator with the information.");
		},
		success: function (response) {
			//states.push(response["features"]);
			states = JSON.parse(response)["features"];
			L.geoJSON(states, {
				pointToLayer: function (feature, latlng) {
					return L.circleMarker(latlng, geojsonMarkerOptions);
				},
				onEachFeature: onEachFeature
			}).addTo(mymap);
		}
	});
}

/*
 * desc : add legend 
 */
function addLegendBody(previousInfo, callback) {
	$('.legendBody').html(
		'<div class="row legend-row"><div class="col-xs-2 col-md-2"><div class="circle circle-orange"></div></div><div class="col-xs-6 col-md-6"><span>Position</span></div></div>'
	);
}

/*
 * desc : listener
 */


/* 
 * desc : main entry 
 */
$(function() {
	async.waterfall([
		apiChecker // api checker

		// base map initialization and is dependent on apichecker
		, initialMap 

		// add button to locate your current position
		, addSelfLocBtnToMap 

		// add legend body
		, addLegendBody
	], function (err, message) {
		if(err) { 
			console.log(err); 
		}
	});
});