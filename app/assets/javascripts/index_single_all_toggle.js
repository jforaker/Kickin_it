/**
 * Created with JetBrains RubyMine.
 * User: jakeforaker
 * Date: 3/7/14
 * Time: 2:18 PM
 * To change this template use File | Settings | File Templates.
 */
load("home#index", function (controller, action) {

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

                //TODO -- after all is selected SOME BUG happens

                var thisparty = jQuery('.kicks-all').find('.kick-list-' + getid)[0];
                jQuery(thisparty).show();
            });
        }
        else {
            partiesArray.show();
        }

    });
});
