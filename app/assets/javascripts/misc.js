/**
/**
 * Created with JetBrains RubyMine.
 * User: jakeforaker
 * Date: 10/21/13
 * Time: 2:22 PM
 * To change this template use File | Settings | File Templates.
 */

load({
    controllers: {
        kicks: ['new', 'edit']
    }
}, function (controller, action) {

    function pick(data){
        console.log(data);
        var photo = data.fpfile.url;
        var ele = jQuery('.res')[0];
        var imgres = '<img src=" ' + photo + ' ">';
        jQuery(ele).fadeIn(800).append(imgres);
    }

    //get the url parameter ?location= and populate the form with it

    function getURLParameter(name) {
        return decodeURI(
            (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
        );
    }

    var spoturl = getURLParameter("spot"),
        lat = getURLParameter("Lat"),
        lng = getURLParameter("Lng"),
        spot = spoturl.toString().replace(/-/g, ' ');


    if (lat !== undefined && lat !== "null"){
        $('input#kick_latitude').val(lat);
    }

    if (lng !== undefined && lng !== "null"){
        $('input#kick_longitude').val(lng);
    }

    //TODO -- something if its a user kick

    if (spoturl != "null"){
        $('input#kick_location').val(spot);
    }

    jQuery('#timepicker').timepicker({ 'scrollDefaultNow': true })
        .on('changeTime', function() {
            console.log(jQuery(this).val());
        });

    //slider

    var debScale = jQuery("#deb-scale");

    var debVals = {
        scale: {
            0: "Sipping some pinot",
            25: "Definitely more than one",
            50: "Could get ugly",
            75: "A total riot",
            100: "Jail in our future"
        }
    };

    debScale.slider({
        min: 0,
        max: 100,
        step: 25,
        slide: function(event, ui){
            $("#deb-input").val(debVals.scale[ui.value]);
        }
    });
    jQuery(debScale.val(debVals.scale[$(debScale).slider("value")]));

    var theVal = jQuery(debScale.val(debVals.scale[$(debScale).slider("value")])).val();
    console.log(theVal)

    // create kick

    jQuery('#kick-create').click(function(e){

        var obj = {
            scale: ''
        };

        obj.scale = jQuery(debScale.val(debVals.scale[$(debScale).slider("value")])).val();
        console.log(obj);
    });


});


load("user#edit", function (controller, action) {

    console.log(this)      ;

    jQuery.getJSON('user/edit.json', {}, function(data) {
        console.log(data);

    });

    var slidervals = {
        loudness: {
            0: "Quiet",
            25: "Open for conversations",
            50: "Middle of the road",
            75: "Life of the party",
            100: "Loudmouth"
        },
        drunkness: {
            0: "Don't drink",
            25: "I like a beer once in a while",
            50: "Enjoy a crisp Chardonnay",
            75: "Show me the bar... NOW",
            100: "Shots and beers!"
        },
        smartness: {
            0: "reeding iz guhd",
            25: "Keanu Reeves",
            50: "5th year of community college",
            75: "An intellectual",
            100: "PhD"
        }
    };

    var $sliderArray = [
        $("#slider1"),
        $("#slider2"),
        $("#slider3")
    ];

    var sliderLabelArr = [
        $("#levels1"),
        $("#levels2"),
        $("#levels3")
    ];

    $sliderArray[0].slider({
        min: 0,
        max: 100,
        step: 25,
        slide: function(event, ui){
            $("#levels1").val(slidervals.loudness[ui.value]);
        }
    });
    sliderLabelArr[0].val(slidervals.loudness[$($sliderArray[0]).slider("value")]);

    $sliderArray[1].slider({
        min: 0,
        max: 100,
        step: 25,
        slide: function(event, ui){
            $("#levels2").val(slidervals.drunkness[ui.value]);
        }
    });
    sliderLabelArr[1].val(slidervals.drunkness[$($sliderArray[1]).slider("value")]);

    $sliderArray[2].slider({
        min: 0,
        max: 100,
        step: 25,
        slide: function(event, ui){
            $("#levels3").val(slidervals.smartness[ui.value]);
        }
    });
    sliderLabelArr[2].val(slidervals.smartness[$($sliderArray[2]).slider("value")]);


    jQuery('#save-profile').click(function(e){

        var obj = {
            one: '',
            two: '',
            three: ''
        };

        var one = jQuery(sliderLabelArr[2].val(slidervals.smartness[$($sliderArray[2]).slider("value")])[0]).val();
        var two = jQuery(sliderLabelArr[1].val(slidervals.drunkness[$($sliderArray[1]).slider("value")])[0]).val();
        var three = jQuery(sliderLabelArr[0].val(slidervals.loudness[$($sliderArray[0]).slider("value")])[0]).val();

        obj.one = one;
        obj.two = two;
        obj.three = three;

        console.log(obj);

        $.ajax({
            url: 'create',
            type: 'POST',
            dataType: 'script',
            data: obj,
            success: function (data){
                if (data){
                    console.log(data);

                }
                else {
                    console.log('fail');
                }
            }
        });
    });
});


load("registrations#new", function (controller, action) {



    var slidervals = {
        loudness: {
            0: "Quiet",
            25: "Open for conversations",
            50: "Middle of the road",
            75: "Life of the party",
            100: "Loudmouth"
        },
        drunkness: {
            0: "Don't drink",
            25: "I like a beer once in a while",
            50: "Enjoy a crisp Chardonnay",
            75: "Show me the bar... NOW",
            100: "Shots and beers!"
        },
        smartness: {
            0: "reeding iz guhd",
            25: "GED is good for me",
            50: "5th year of community college",
            75: "Average Joe",
            100: "PhD"
        }
    };

    var $sliderArray = [
        $("#slider1"),
        $("#slider2"),
        $("#slider3")
    ];

    var sliderLabelArr = [
        $("#levels1"),
        $("#levels2"),
        $("#levels3")
    ];

    $sliderArray[0].slider({
        min: 0,
        max: 100,
        step: 25,
        slide: function(event, ui){
            $("#levels1").val(slidervals.loudness[ui.value]);
        }
    });
    sliderLabelArr[0].val(slidervals.loudness[$($sliderArray[0]).slider("value")]);

    $sliderArray[1].slider({
        min: 0,
        max: 100,
        step: 25,
        slide: function(event, ui){
            $("#levels2").val(slidervals.drunkness[ui.value]);
        }
    });
    sliderLabelArr[1].val(slidervals.drunkness[$($sliderArray[1]).slider("value")]);

    $sliderArray[2].slider({
        min: 0,
        max: 100,
        step: 25,
        slide: function(event, ui){
            $("#levels3").val(slidervals.smartness[ui.value]);
        }
    });
    sliderLabelArr[2].val(slidervals.smartness[$($sliderArray[2]).slider("value")]);


    //TODO --was #save-profile with ajax

    jQuery('#new-profile').click(function(e){

        var obj = {
            one: '',
            two: '',
            three: ''
        };

        var one = jQuery(sliderLabelArr[2].val(slidervals.smartness[$($sliderArray[2]).slider("value")])[0]).val(),
            two = jQuery(sliderLabelArr[1].val(slidervals.drunkness[$($sliderArray[1]).slider("value")])[0]).val(),
            three = jQuery(sliderLabelArr[0].val(slidervals.loudness[$($sliderArray[0]).slider("value")])[0]).val();

        obj.one = one;
        obj.two = two;
        obj.three = three;

        console.log(obj);
//
//        $.ajax({
//            url: 'create',
//            type: 'POST',
//            dataType: 'script',
//            data: obj,
//            success: function (data){
//                if (data){
//                    console.log(data);
//
//                }
//                else {
//                    console.log('fail');
//                }
//            }
//        });
    });
});

load("kicks#show", function (controller, action) {
    var icon = jQuery('#time')[0];

    var url = window.kickURL,
        currentTime = window.currentTime,
        signInTime = window.signInTime;

    if (moment())

        console.log(currentTime + '    ' + signInTime);

    jQuery.getJSON(url, {}, function(data) {

        var kickTimeAmPm = data.time,
            kickTime = kickTimeAmPm.slice(0, -2);

        console.log(kickTime)

        if (currentTime > kickTime){
            jQuery(icon).addClass('late');
        }

    });


});

load("home#index", function (controller, action) {
    var icons = jQuery('.fa.fa-clock-o');
    var currentTime = window.currentTime,
        signInTime = window.signInTime;


    console.log(moment().format(currentTime) + '    ' + moment().format(signInTime));



    jQuery.getJSON('/index.json', {}, function(data) {

        for (var i = 0; i < icons.length; i ++){

            var icon = icons[i];

            var kickTimeAmPm = data[i].time,
                kickCreatedAt = data[i].created_at,
                kickTime = kickTimeAmPm.slice(0, -2);


            var kickWasMade = moment(kickCreatedAt)._d;

            if ((moment(kickWasMade).unix()) < (moment(currentTime).unix())){     //if kick is before current time = add class green
                  jQuery(icon).addClass('early');
                console.log('early')   ;
            }

            if (moment(currentTime).isBefore(moment(kickWasMade)._d)){
                jQuery(icon).addClass('late');
                console.log('late')

            }

        }
    });

    var mapbox = jQuery('#mapbox')[0];
    var fs = jQuery('#fs')[0];
    jQuery(mapbox).hover(function(){
        jQuery(fs).fadeIn(500).addClass('showing');

    });





});