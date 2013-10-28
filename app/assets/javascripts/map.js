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
    navigator.geolocation.getCurrentPosition(function (data) {
        var lat = data.coords.latitude;
        var lng = data.coords.longitude;
        /* Create map. */
        var map = L.mapbox.map('mapbox', 'jakeforaker83.map-3rsqzlls')
            .setView(new L.LatLng(lat, lng + 0.005), 15);    // "+" adds some padding

        map.attributionControl.addAttribution("Party data &copy; kckn.it ");

        //place marker on click
        map.on('click', function (e) {
            placeMarker(map, e.latlng);
        });

        function placeMarker(map, latlng) {
            var LatLng = new L.LatLng(latlng.lat, latlng.lng);
            var marker = new L.Marker(LatLng, {
                icon: L.mapbox.marker.icon({'marker-color': 'CC0033'}),
//                icon: L.divIcon({
//                    className: 'map-marker',
//                    html: '<span class="dot"></span>'
//                }),
                iconSize: [15, 15],
                draggable: false
            });

            var popup =  '<h3> ' + LatLng + ' </h3><br />' +
                '<a id="newkick" href="/kicks/new?location=' + '?Lat=' + latlng.lat + '&?Lng=' + latlng.lng +'">Kick it</a> ';


            marker.on('mouseover', function(e) { this.openPopup(); })
                .bindPopup(popup, {
                closeButton: true
            });

            console.log('lat =  ' + marker._latlng.lat + 'long =  ' + marker._latlng.lng);

            marker.addTo(map);
        }


        var mapboxUrl = 'http://a.tiles.mapbox.com/v3/jakeforaker83.map-3rsqzlls.jsonp';
        wax.tilejson(mapboxUrl, function (tilejson) {
            map.addLayer(new wax.leaf.connector(tilejson));
        });

        //center map on marker click
        map.markerLayer.on('click', function (e) {
            map.panTo(e.layer.getLatLng());
        });


        /* Query foursquare API for venue recommendations near the current location. */

//        $.getJSON(config.apiUrl + 'v2/venues/explore?ll=' + lat + ',' + lng + '&client_id=' + config.clientId + '&client_secret=' + config.clientSecret, {}, function (data) {
//            venues = data.response.groups[0].items;
//            /* Place marker for each venue. */
//            for (var i = 0; i < venues.length; i++) {
//                /* Get marker's location */
//
//                var latLng = new L.LatLng(
//                    venues[i].venue.location.lat,
//                    venues[i].venue.location.lng
//                );
//                /* Build icon for each icon */
//                var leafletIcon = L.Icon.extend({
//                    options: {
//                        iconUrl: venues[i].venue.categories[0].icon,
//                        shadowUrl: null,
//                        iconSize: new L.Point(32, 32),
//                        iconAnchor: new L.Point(16, 41),
//                        popupAnchor: new L.Point(0, -51)
//                    }
//                });
//                var icon = new leafletIcon();
//                var loc = venues[i].venue.name;
//                var locationHref = loc.toString().replace(/ /g, '-');
//
//                var tpl = '<h3> ' + loc + ' </h3><br />' +
//                    '<a id="newkick" href="/kicks/new?location=' + locationHref + '">Kick it</a> ';
//                //  newkickpath;
//
//                var marker = new L.Marker(latLng, {icon: icon})
//                    .bindPopup(tpl, { closeButton: true })
//                    .on('mouseclick', function (e) {
//                        this.openPopup();
//                    });
//                // .on('mouseout', function(e) { this.closePopup(); });
//                map.addLayer(marker);
//
//            }
//        });


        $.getJSON('/index.json', {}, function(coordinates) {
            var res = coordinates;
            for (var i = 0; i < res.length; i++) {

                var lat = res[i].latitude;
                var lng = res[i].longitude;
                var title = res[i].title;

                console.log(lat + '  ' + lng);

                var latLng = new L.LatLng(
                    res[i].latitude,
                    res[i].longitude
                );
                /* Build icon for each icon */
                var kickIcon = L.Icon.extend({
                    options: {
                        iconUrl: 'https://ss1.4sqi.net/img/categories/nightlife/bar.png',
                        shadowUrl: null,
                        iconSize: new L.Point(52, 52),
                        iconAnchor: new L.Point(16, 41),
                        popupAnchor: new L.Point(0, -51)
                    }
                });
                var icon = new kickIcon();
                var tpl = '<h3> ' + title + ' </h3><br />' +
                    '<a id="newkick" href="/kicks/new?location=' + lng + '">Kick it</a> ';

                var marker = new L.Marker(latLng, {icon: icon})
                    .bindPopup(tpl, { closeButton: true })
                    .on('mouseclick', function (e) {
                        this.openPopup();
                    });
                map.addLayer(marker);

            }
        })
    });
});