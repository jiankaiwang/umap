/** 
 * desc : add menus
*/

/**
 * para@previous : previous parameters
 * para@callback : callback function
 */
function addMenu(previous,callback) {
    try{
        var optionBtn = L.control({ position: 'topleft' });
        optionBtn.onAdd = function (map) {
            var div = L.DomUtil.create('div', 'leaflet-control-zoom leaflet-bar leaflet-control');
            div.style.backgroundColor = 'white';
            var control_htm = '';
            /*control_htm += 
                '<div class="searchInput"><div class="input-group search-group">' +
                '<span class="input-group-addon send-hover" onclick="showNavInfo();"><i class="fa fa-bars" aria-hidden="true"></i></span>' + 
                '</div></div>';
            control_htm += '<div class="searchInput"><div class="additionalInfo display-none">' + 
            '<div class="row"><div class="col-xs-12 col-md-12"><div class="list-group no-margin search-list"></div>' + 
            '</div></div></div></div>';*/

            control_htm += '<a class="leaflet-control-zoom-in" href="#" title="'
                + frontTranslation("selfLocBtn",defaultLang)
                + '" role="button" onclick="showNavInfo();"><i class="fa fa-bars ubtn" aria-hidden="true"></i></a>';
            div.innerHTML = control_htm;
            div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
            L.DomEvent.disableClickPropagation(div);
            return div;
        };
        optionBtn.addTo(mymap);	
        callback(null, "");
    } catch(err) {
        callback(err);
    }
}

/**
 * 
 */
function showNavInfo() {
	$("#nav").animate({
		width: ($("#nav").width() > 0 ? 0 : 280) + 'px',
		height: '100%'
	},200);
}

/**
 * 
 */
function showDetailList() {
    if($('.detail').hasClass('display-none')) {
        $('.detail').removeClass('display-none');
        // show tips
        $('.show-detail').find('i').removeClass('fa-external-link-square');
        $('.show-detail').find('i').addClass('fa-times');
    } else {
        $('.detail').addClass('display-none');
        // show tips
        $('.show-detail').find('i').removeClass('fa-times');
        $('.show-detail').find('i').addClass('fa-external-link-square');
    }
}