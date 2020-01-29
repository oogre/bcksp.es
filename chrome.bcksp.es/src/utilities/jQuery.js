/*----------------------------------------*\
  bcksp.es - jQuery.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-06-07 16:56:44
  @Last Modified time: 2019-06-07 16:56:52
\*----------------------------------------*/
export function jQuery( selector, context ) {}

let rootjQuery;
let readyBound = false;
let readyList = [];
let DOMContentLoaded;

jQuery.fn = {
    ready: function( fn ) {
        jQuery.bindReady();
        if ( jQuery.isReady ) {
            fn.call( document, jQuery );
        } else if ( readyList ) {
            readyList.push( fn );
        }
        return this;
    }
};
jQuery.isReady = false;
jQuery.ready = function() {
        if ( !jQuery.isReady ) {
            if ( !document.body ) {
                return setTimeout( jQuery.ready, 13 );
            }
            jQuery.isReady = true;
            if ( readyList ) {
                var fn, i = 0;
                while ( (fn = readyList[ i++ ]) ) {
                    fn.call( document, jQuery );
                }
                readyList = null;
            }
        }
    };
jQuery.bindReady = function() {
    if ( readyBound ) {
        return;
    }
    readyBound = true;

    if ( document.readyState === "complete" ) {
        return jQuery.ready();
    }
    if ( document.addEventListener ) {
        document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );
        window.addEventListener( "load", jQuery.ready, false );
    } else if ( document.attachEvent ) {

        document.attachEvent("onreadystatechange", DOMContentLoaded);
        window.attachEvent( "onload", jQuery.ready );

        var toplevel = false;
        try {
            toplevel = window.frameElement == null;
        } catch(e) {}
        if ( document.documentElement.doScroll && toplevel ) {
            doScrollCheck();
        }
    }
};
rootjQuery = jQuery(document);
if ( document.addEventListener ) {
    DOMContentLoaded = function() {
        document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
        jQuery.ready();
    };
} else if ( document.attachEvent ) {
    DOMContentLoaded = function() {
        if ( document.readyState === "complete" ) {
            document.detachEvent( "onreadystatechange", DOMContentLoaded );
            jQuery.ready();
        }
    };
}
function doScrollCheck() {
    if ( jQuery.isReady ) {
        return;
    }
    try {

        document.documentElement.doScroll("left");
    } catch(e) {
        setTimeout( doScrollCheck, 1 );
        return;
    }
    jQuery.ready();
}

