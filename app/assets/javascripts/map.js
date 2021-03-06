/**
 * Created with JetBrains RubyMine.
 * User: jakeforaker
 * Date: 10/19/13
 * Time: 3:58 PM
 * To change this template use File | Settings | File Templates.
 */

load("home#index", function (controller, action) {
    var config = {
        clientId: 'BCH20MFU1KWJNGTFVQHYSOQGDA42BZ5KYWGIQJW40HT4PAOT',
        clientSecret: 'EQBJW4R53FTIB4Y1DZV0J35YX3VPBRR1B5H4TNJO12V1E25I',
        authUrl: 'https://foursquare.com/',
        apiUrl: 'https://api.foursquare.com/',
        apiVerson: '20140223'
    };

    //Get coordinates via HTML 5 geolocation
    navigator.geolocation.getCurrentPosition(function (data) {
        var lat = data.coords.latitude
            , lng = data.coords.longitude

        // Create map
            , map = L.mapbox.map('mapbox', 'jakeforaker83.map-3rsqzlls')
                .setView(new L.LatLng(lat, lng + 0.005), 15);   // "+" adds some padding

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
//                icon: L.mapbox.marker.icon({'marker-color': '3498db'}),
                icon: L.divIcon({
                    className: 'some-icon-class',
                    //html: '<img src="https://ss1.4sqi.net/img/categories/nightlife/bar.png">'
                    html: '<i class="fa fa-tint"></i>'

                }),
                //iconSize: [15, 15],
                draggable: true
            });

            //add custom popup to marker
            var popup =  '<a style="text-decoration: none id="newkick" href="/kicks/new?Lat=' + latlng.lat + '&?Lng=' + latlng.lng +'"><h1>Kick it</h1></a> ' +
                '<h5> ' + LatLng + ' </h5><br />' ;

            //bind hover popup to current marker
            marker.on('mouseover', function(e) { this.openPopup(); })
                .bindPopup(popup, {
                    closeButton: true
                });

            marker.on('dragend', function (e) {
                var coords = e.target.getLatLng();
                var lat = coords.lat;
                var lng = coords.lng;
                console.log(lat + '   ' + lng);
            });

            marker.addTo(map);
        }

        //add search functionality to map
        new L.Control.GeoSearch({
            provider: new L.GeoSearch.Provider.Google()
        }).addTo(map);

        /* ======================= Query foursquare API for venue recommendations near the current location
        ==========================
         */

        jQuery( "#foursquare-button" ).click(function() {
            $.getJSON(config.apiUrl + 'v2/venues/explore?ll=' + lat + ',' + lng + '&client_id=' + config.clientId + '&client_secret=' + config.clientSecret + '&v=' + config.apiVerson, {}, function (data) {
                venues = data.response.groups[0].items;

                // Place marker for each venue
                for (var i = 0; i < venues.length; i++) {

                    // Get marker's location
                    var latLng = new L.LatLng(
                            venues[i].venue.location.lat,
                            venues[i].venue.location.lng
                        )
                    // Build icon for each venue
                        , pref = venues[i].venue.categories[0].icon.prefix
                        , icoo = pref.slice(20)

                        , leafletIcon = L.Icon.extend({
                            options: {
                                iconUrl: 'https://foursquare.com' + icoo + '32' + venues[i].venue.categories[0].icon.suffix,
                                shadowUrl: null,
                                iconSize: new L.Point(32, 32),
                                iconAnchor: new L.Point(16, 41),
                                popupAnchor: new L.Point(0, -51)
                            }
                        })
                        , icon = new leafletIcon(),

                        lati = venues[i].venue.location.lat,
                        longi = venues[i].venue.location.lng,
                        loc = venues[i].venue.name,
                        hereNow = venues[i].venue.hereNow.count,
                        personPeople = (hereNow == 1) ? 'person' : 'people',
                        locationHref = loc.toString().replace(/ /g, '-')


                        , tpl = '<h3> ' + loc + ' </h3><br />' +
                            '<h5>' + hereNow + ' ' + personPeople + ' here now </h5>' +
                            '<a id="newkick" href="/kicks/new?spot=' + locationHref + '&?Lat=' + lati + '&?Lng=' + longi  + '">Kick it</a> '

                            //  newkickpath;

                        , marker = new L.Marker(latLng, {icon: icon})
                            .bindPopup(tpl, { closeButton: true })
                            .on('mouseclick', function (e) {
                                this.openPopup();
                            });
                    map.addLayer(marker);
                }
            });
        });

        /* ================  get kicks locations based on their saved lat/long
        ===================
         */


        jQuery.getJSON('/index.json', {}, function(coordinates) {
            var res = coordinates;
            for (var i = 0; i < res.length; i++) {

                var kickData = {
                        lat:        res[i].latitude,
                        lng:        res[i].longitude,
                        title:      res[i].title,
                        party_id:   res[i].id,
                        created_by: res[i].username
                    }

                    , latLng = new L.LatLng(
                        res[i].latitude,
                        res[i].longitude
                    )

                    , beer_data = $('#foobar').attr('data')

                // Build icon for each kick location
                    , kickIcon = L.Icon.extend({
                        options: {
                            iconUrl: beer_data,
                            shadowUrl: null,
                            iconSize: new L.Point(40, 40),
                            iconAnchor: new L.Point(16, 41),
                            popupAnchor: new L.Point(0, -51),
                            className:  'kick-map-' + kickData.party_id
                        }
                    })
                    , icon = new kickIcon()

                    , tpl =   '<h3> ' + kickData.title + ' </h3><br />' +
                        '<h5><a href="/user/'+kickData.created_by+'"> by ' + kickData.created_by + ' </a></h5><br />' +
                        '<a id="newkick" href="/kicks/new?spot=' + kickData.lng + '">Kick it | Join</a> '

                    , marker = new L.Marker(latLng, {icon: icon})
                        .bindPopup(tpl, { closeButton: true })
                        .on('mouseclick', function (e) {
                            this.openPopup();
                        });

                map.addLayer(marker);

                //create border div element behind icon (hidden until click)
                var backDiv='<div class="added to-' + kickData.party_id + '">';

                //find the array of icons
                var kickmapIcons = jQuery('.kick-map-' + kickData.party_id);

                //add border div 'before' each kick icon
                jQuery(kickmapIcons).before(backDiv);

                kickmapIcons.click(function(e){
                    e.preventDefault();

                    //get the current/previously selected kick marker
                    var old = jQuery('.leaflet-marker-pane').find('IMG.selected')[0],
                        markerArray = jQuery('.leaflet-marker-icon'),
                        myNum = this.classList[1].slice(9),
                        allBackDivs = jQuery('.added'),
                        backDiv = jQuery(".to-" + myNum )[0];

                    //grab the position of the current kick marker
                    var xAngle = jQuery(this).css('webkit-transform').slice(-9, -6) || jQuery(this).css('MozTransform').slice(-9, -6),
                        yAngle = jQuery(this).css('webkit-transform').slice(-4, -1) || jQuery(this).css('MozTransform').slice(-4, -1);

                    //and set it as the new border div's position
                    jQuery(backDiv).css('-webkit-transform', "translate3d(" + xAngle + "px," + yAngle + "px,0");
                    jQuery(markerArray).removeClass('selected');

                    //add selected class AFTER we find the PREVIOUSLY selected marker
                    jQuery(this).addClass('selected');

                    //hide all other back circle divs
                    jQuery(allBackDivs).fadeOut(100);

                    //fadein the back circle div to the current marker
                    jQuery(backDiv).fadeIn(800);

                    //animate the border circle div from the previously selected marker to the newly selected one
                    jQuery(old).animate_from_to('.kick-map-' + myNum, {
                        pixels_per_second: 1000,
                        initial_css: {
                            'background': 'transparent',
                            height: 48,
                            width: 48,
                            "z-index": 0,
                            borderRadius: 24,
                            border:"5px dashed #3498db"
                        }
                    });
                });
            }
        });
    });
});



