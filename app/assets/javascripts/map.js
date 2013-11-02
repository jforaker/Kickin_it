/**
 * Created with JetBrains RubyMine.
 * User: jakeforaker
 * Date: 10/19/13
 * Time: 3:58 PM
 * To change this template use File | Settings | File Templates.
 */



jQuery( document ).ready(function() {



    var config = {
        clientId: 'BCH20MFU1KWJNGTFVQHYSOQGDA42BZ5KYWGIQJW40HT4PAOT',
        clientSecret: 'EQBJW4R53FTIB4Y1DZV0J35YX3VPBRR1B5H4TNJO12V1E25I',
        authUrl: 'https://foursquare.com/',
        apiUrl: 'https://api.foursquare.com/'
    };

    //Get coordinates via HTML 5 geolocation
    navigator.geolocation.getCurrentPosition(function (data) {
        var lat = data.coords.latitude;
        var lng = data.coords.longitude;

        // Create map
        var map = L.mapbox.map('mapbox', 'jakeforaker83.map-3rsqzlls')
            .setView(new L.LatLng(lat, lng + 0.005), 15);    // "+" adds some padding

        //lets disable zoom
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();

        //copright
        map.attributionControl.addAttribution("Kicks &copy; kckn.it");

        //place marker on click
        map.on('click', function (e) {
            placeMarker(map, e.latlng);
        });

        function placeMarker(map, latlng) {
            var LatLng = new L.LatLng(latlng.lat, latlng.lng);
            var marker = new L.Marker(LatLng, {
                icon: L.mapbox.marker.icon({'marker-color': 'AA0978'}),
//                icon: L.divIcon({
//                    className: 'map-marker',
//                    html: '<span class="dot"></span>'
//                }),
                iconSize: [15, 15],
                draggable: false
            });

            //add custom popup to marker
            var popup =  '<h3> ' + LatLng + ' </h3><br />' +
                '<a id="newkick" href="/kicks/new?location=' + '?Lat=' + latlng.lat + '&?Lng=' + latlng.lng +'">Kick it</a> ';

            //bind hover popup to current marker
            marker.on('mouseover', function(e) { this.openPopup(); })
                .bindPopup(popup, {
                closeButton: true
            });

            console.log('lat =  ' + marker._latlng.lat + 'long =  ' + marker._latlng.lng);

            marker.addTo(map);
        }

        //add search functionality to map
        new L.Control.GeoSearch({
            provider: new L.GeoSearch.Provider.Google()
        }).addTo(map);



        // Query foursquare API for venue recommendations near the current location
        jQuery( "#foursquare-button" ).click(function() {
            $.getJSON(config.apiUrl + 'v2/venues/explore?ll=' + lat + ',' + lng + '&client_id=' + config.clientId + '&client_secret=' + config.clientSecret, {}, function (data) {
                venues = data.response.groups[0].items;

                // Place marker for each venue
                for (var i = 0; i < venues.length; i++) {

                    // Get marker's location
                    var latLng = new L.LatLng(
                        venues[i].venue.location.lat,
                        venues[i].venue.location.lng
                    );
                    // Build icon for each venue
                    var leafletIcon = L.Icon.extend({
                        options: {
                            iconUrl: venues[i].venue.categories[0].icon,
                            shadowUrl: null,
                            iconSize: new L.Point(32, 32),
                            iconAnchor: new L.Point(16, 41),
                            popupAnchor: new L.Point(0, -51)
                        }
                    });
                    var icon = new leafletIcon();
                    var loc = venues[i].venue.name;
                    var locationHref = loc.toString().replace(/ /g, '-');

                    var tpl = '<h3> ' + loc + ' </h3><br />' +
                        '<a id="newkick" href="/kicks/new?location=' + locationHref + '">Kick it</a> ';
                    //  newkickpath;

                    var marker = new L.Marker(latLng, {icon: icon})
                        .bindPopup(tpl, { closeButton: true })
                        .on('mouseclick', function (e) {
                            this.openPopup();
                        });
                    // .on('mouseout', function(e) { this.closePopup(); });
                    map.addLayer(marker);
                }
            });
        });

        //get kicks locations based on their saved lat/long
        jQuery.getJSON('/index.json', {}, function(coordinates) {
            var res = coordinates;
            for (var i = 0; i < res.length; i++) {

                var lat = res[i].latitude;
                var lng = res[i].longitude;
                var title = res[i].title;
                var party_id = res[i].id;

                console.log(lat + '  ' + lng + '  ' + party_id);

                var latLng = new L.LatLng(
                    res[i].latitude,
                    res[i].longitude
                );

                // Build icon for each kick location
                var kickIcon = L.Icon.extend({
                    options: {
                        iconUrl: 'https://ss1.4sqi.net/img/categories/nightlife/bar.png',
                        shadowUrl: null,
                        iconSize: new L.Point(52, 52),
                        iconAnchor: new L.Point(16, 41),
                        popupAnchor: new L.Point(0, -51),
                        className:  'kick-map-' + party_id
                    }
                });
                var icon = new kickIcon();
                var tpl = '<h3> ' + title + ' </h3><br />' +
                    '<a id="newkick" href="/kicks/new?location=' + lng + '">Kick it</a> ';

                var marker = new L.Marker(latLng, {icon: icon})
                    .bindPopup(tpl, { closeButton: true })
                    .on('mouseclick', function (e) {
                        this.openPopup();
                    })
                    .on('mouseout', function (e){
                        //partiesArray.fadeIn();
                    });
                map.addLayer(marker);

                //create border div element behind icon
                var backDiv='<div class="added to-' + party_id + '">';

                var kickmapIcons = jQuery('.kick-map-' + party_id);

                //add border div 'before' each kick icon
                jQuery(kickmapIcons).before(backDiv);

                kickmapIcons.click(function(e){
                    e.preventDefault();

                    //get the current/previously selected kick marker
                    var old = jQuery('.leaflet-marker-pane').find('IMG.selected')[0];
                    var markerArray = jQuery('.leaflet-marker-icon');
                    var myNum = this.classList[1].slice(9);
                    var allBackDivs = jQuery('.added');
                    var backDiv = jQuery(".to-" + myNum )[0];

                    //grab the position of the current kick marker
                    var xAngle = jQuery(this).css('webkit-transform').slice(-9, -6) || jQuery(this).css('MozTransform').slice(-9, -6),
                        yAngle = jQuery(this).css('webkit-transform').slice(-4, -1) || jQuery(this).css('MozTransform').slice(-4, -1);

                    jQuery(allBackDivs).fadeOut(400);
                    jQuery(backDiv).fadeIn(400);

                    //and set it as the new border div's position
                    jQuery(backDiv).css('-webkit-transform', "translate3d(" + xAngle + "px," + yAngle + "px,0");
                    jQuery(markerArray).removeClass('selected');

                    //add selected class AFTER we find the PREVIOUSLY selected marker
                    jQuery(this).addClass('selected');

                    //animate the border circle div from the previously selected marker to the newly selected one
                    jQuery(old).animate_from_to('.kick-map-' + myNum, {
                        pixels_per_second: 1000,
                        initial_css: {
                            'background': 'transparent',
                            height: 70,
                            width: 70,
                            "z-index": 0,
                            borderRadius: 35,
                            border:"5px dashed red"
                        }
                    });
                    return false;
                });
            }
        });

        jQuery( "#single-all" ).click(function(){
            jQuery(this).toggleClass('single-view');

            var me = jQuery(this);
            me.text() == me.data("text-single") ? me.text(me.data("text-all")) : me.text(me.data("text-single"));

            //show only the first Kick
            var partiesArray = jQuery('.kick-contr');
            partiesArray.hide();
            jQuery(partiesArray[0]).show();

            if (jQuery(this).hasClass('single-view')) {

                jQuery('.leaflet-marker-icon').click(function (e) {
                    partiesArray.hide();
                    var getid = this.classList[1].slice(9);
                    console.log(getid);

                    //show only the Kick that is clicked on

                    //TODO --

                    var thisparty = jQuery('.kicks-all').find('.kick-list-' + getid)[0];
                    jQuery(thisparty).show();
                });
            }
            else {
                partiesArray.show();
            }

        });
    });

});