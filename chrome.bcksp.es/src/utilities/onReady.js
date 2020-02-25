/*----------------------------------------*\
  bcksp.es - jQuery.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-06-07 16:56:44
  @Last Modified time: 2020-02-20 20:03:38
\*----------------------------------------*/


let isReady = false;
let readyBound = false;
let readyList = [];
let DOMContentLoaded;

if ( document.addEventListener ) {
    DOMContentLoaded = function() {
        document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
        ready();
    };
} else if ( document.attachEvent ) {
    DOMContentLoaded = function() {
        if ( document.readyState === "complete" ) {
            document.detachEvent( "onreadystatechange", DOMContentLoaded );
            ready();
        }
    };
}

export function onReady(fn){
    bindReady();
    if ( isReady ) {
        fn();
    } else if ( readyList ) {
        readyList.push( fn );
    }
} 

function ready() {
    if ( !isReady ) {
        if ( !document.body ) {
            return setTimeout( ready, 13 );
        }
        isReady = true;
        if ( readyList ) {
            var fn, i = 0;
            while ( (fn = readyList[ i++ ]) ) {
                fn();
            }
            readyList = null;
        }
    }
};

function bindReady () {
    if ( readyBound ) {
        return;
    }
    readyBound = true;

    if ( document.readyState === "complete" ) {
        return ready();
    }
    if ( document.addEventListener ) {
        document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );
        window.addEventListener( "load", ready, false );
    } else if ( document.attachEvent ) {
        document.attachEvent("onreadystatechange", DOMContentLoaded);
        window.attachEvent( "onload", ready );
        var toplevel = false;
        try {
            toplevel = window.frameElement == null;
        } catch(e) {}
        if ( document.documentElement.doScroll && toplevel ) {
            doScrollCheck();
        }
    }
};

function doScrollCheck() {
    if ( isReady ) {
        return;
    }
    try {
        document.documentElement.doScroll("left");
    } catch(e) {
        setTimeout( doScrollCheck, 1 );
        return;
    }
    ready();
}
