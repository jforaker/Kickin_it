/**
 * Created with JetBrains RubyMine.
 * User: jakeforaker
 * Date: 10/21/13
 * Time: 2:22 PM
 * To change this template use File | Settings | File Templates.
 */

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

$(document).ready(function(){
//    var locurl = getURLParameter("location");
//    var location = locurl.toString().replace(/-/g, ' ');
    var lat = getURLParameter("Lat");
    var lng = getURLParameter("Lng");

//    if (location !== undefined && location !== "null"){
//        $('input#kick_location').val(location);
//    }

    if (lat !== undefined && lat !== "null"){
        $('input#kick_latitude').val(lat);
    }

    if (lng !== undefined && lng !== "null"){
        $('input#kick_longitude').val(lng);
    }
});

$( document ).ready(function() {
    //get the url parameter ?location= and populate the form with it




    var slidervals = {
        quietlevels: {
            0: "Quiet",
            25: "Open for conversations",
            50: "Middle of the road",
            75: "Life of the party",
            100: "Loudmouth"
        },
        wastedlevels: {
            0: "Don't drink",
            25: "I like a beer once in a while",
            50: "Enjoy frothy beverages now and then",
            75: "Show me the bar... NOW",
            100: "Waste case"
        },
        intellect: {
            0: "Geico commercial star",
            25: "reeding iz guhd",
            50: "GED is good for me",
            75: "75",
            100: "100"
        }
    };

    var $sliderArray = [
        $("#slider1"),
        $("#slider2"),
        $("#slider3")
    ]

    var sliderLabelArr = [
        $("#levels1"),
        $("#levels2"),
        $("#levels3")
    ]

    //add custom strings to slider ui

//    for (var i = 0; i < $sliderArray.length; i ++) {
//        $sliderArray[i].slider({
//            min: 0,
//            max: 100,
//            step: 25
//        });
//    }
    $sliderArray[0].slider({
        min: 0,
        max: 100,
        step: 25,
        slide: function(event, ui){
            $("#levels1").val(slidervals.quietlevels[ui.value]);
        }
    })
    sliderLabelArr[0].val(slidervals.quietlevels[$($sliderArray[0]).slider("value")]);


    $sliderArray[1].slider({
        min: 0,
        max: 100,
        step: 25,
        slide: function(event, ui){
            $("#levels2").val(slidervals.wastedlevels[ui.value]);
        }
    })
    sliderLabelArr[1].val(slidervals.wastedlevels[$($sliderArray[1]).slider("value")]);

    $sliderArray[2].slider({
        min: 0,
        max: 100,
        step: 25,
        slide: function(event, ui){
            $("#levels3").val(slidervals.intellect[ui.value]);
        }
    })
    sliderLabelArr[2].val(slidervals.intellect[$($sliderArray[2]).slider("value")]);




});

