/**
 * Created with JetBrains RubyMine.
 * User: jakeforaker
 * Date: 10/19/13
 * Time: 3:58 PM
 * To change this template use File | Settings | File Templates.
 */



$( document ).ready(function() {
    var config = {
        clientId: 'BCH20MFU1KWJNGTFVQHYSOQGDA42BZ5KYWGIQJW40HT4PAOT',
        clientSecret: 'EQBJW4R53FTIB4Y1DZV0J35YX3VPBRR1B5H4TNJO12V1E25I',
        authUrl: 'https://foursquare.com/',
        apiUrl: 'https://api.foursquare.com/'
    };

    /* HTML 5 geolocation. */
    navigator.geolocation.getCurrentPosition(function(data) {
        var lat = data['coords']['latitude'];
        var lng = data['coords']['longitude'];
        /* Create map. */
        var map = L.mapbox.map('mapbox', 'jakeforaker83.map-3rsqzlls')
            .setView(new L.LatLng(lat, lng), 15);

        //place marker on click

//    map.on('click', function(e){
//        placeMarker(map, e.latlng);
//    });
//
//    function placeMarker(map, latlng) {
//        var LatLng = new L.LatLng(latlng.lat, latlng.lng);
//        var marker = new L.Marker(LatLng, {
//            icon: L.mapbox.marker.icon({'marker-color': 'CC0033'}),
//            draggable: true
//        });
//
//        console.log(marker);
//
//        marker.addTo(map);
//    }



        var mapboxUrl = 'http://a.tiles.mapbox.com/v3/jakeforaker83.map-3rsqzlls.jsonp';
        wax.tilejson(mapboxUrl, function(tilejson) {
            map.addLayer(new wax.leaf.connector(tilejson));
        });

        //center map on marker click
        map.markerLayer.on('click', function(e) {
            map.panTo(e.layer.getLatLng());
        });

        /* Query foursquare API for venue recommendations near the current location. */
        $.getJSON(config.apiUrl + 'v2/venues/explore?ll=' + lat + ',' + lng + '&client_id=' + config.clientId + '&client_secret=' + config.clientSecret, {}, function(data) {
            venues = data['response']['groups'][0]['items'];
            /* Place marker for each venue. */
            for (var i = 0; i < venues.length; i++) {
                /* Get marker's location */

                var isBar = venues[i].venue.categories[0].name == "Bar";

//                for (var i = 0; i < isBar.length; i++){
//
//                    console.log(isBar.length)
//                }

                var latLng = new L.LatLng(
                    venues[i]['venue']['location']['lat'],
                    venues[i]['venue']['location']['lng']
                );
                /* Build icon for each icon */
                var leafletIcon = L.Icon.extend({
                    options:{
                        iconUrl: venues[i]['venue']['categories'][0]['icon'],
                        shadowUrl: null,
                        iconSize: new L.Point(32,32),
                        iconAnchor: new L.Point(16, 41),
                        popupAnchor: new L.Point(0, -51)
                    }
                });
                var icon = new leafletIcon();

                var loc = venues[i]['venue']['name'];

                var location = loc.toString().replace(/ /g, '-');


//            var newkickpath =
//                '<%= link_to "Kick it", { :controller => :kicks, :action => :new, :location => 'loca'   } %>';

                var tpl = '<h3> ' + venues[i]['venue']['name'] + ' </h3><br />' +
                    '<a id="newkick" href="/kicks/new?location=' + location + '">Kick it</a> ';
                //  newkickpath;

                var marker = new L.Marker(latLng, {icon: icon})
                    .bindPopup(tpl, { closeButton: true })
                    .on('mouseclick', function(e) { this.openPopup(); })
                // .on('mouseout', function(e) { this.closePopup(); });
                map.addLayer(marker);

            }
        })
    })




    // var map = L.map('map').setView([40.739966 , -73.990131], 13);

//    L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
//        maxZoom: 18,
//        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
//    }).addTo(map);
//
//
//    L.marker([40.739966 , -73.990131]).addTo(map)
//        .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
//
//    L.circle([40.739966 , -73.990131], 500, {
//        color: 'red',
//        fillColor: '#f03',
//        fillOpacity: 0.5
//    }).addTo(map).bindPopup("I am a circle.");
//
////    L.polygon([
////        [51.509, -0.08],
////        [51.503, -0.06],
////        [51.51, -0.047]
////    ]).addTo(map).bindPopup("I am a polygon.");
//
//
//    var popup = L.popup();
//
//    function onMapClick(e) {
//        popup
//            .setLatLng(e.latlng)
//            .setContent("You clicked the map at " + e.latlng.toString())
//            .openOn(map);
//    }
//
//      map.on('click', onMapClick);

                                    //https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id=CLIENT_ID&client_secret=CLIENT_SECRET&v=YYYYMMDD

});