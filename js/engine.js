window.game = {};

$( function () {
        var
    
        _el              = null                                             // Private reference to the html element on which we draw
    ,   _game            = []                                               // Array to maintain 'LIFE'
    ,   _cell            = {}                                               // Object that keeps a record of the corresponding <td> tags
    ,   _options         = { }                                              // Private copy of the options
    ,   _count           = 0                                                // Running time
    ;
    
    var engine = {
        init : init
    }
    
    
    function init  ( el, options ) {
        if ( el instanceof jQuery )
            _el = el
        else if ( el instanceof HTMLElement || el instanceof String )
            _el = $(el);
        
            
        if ( ! _el instanceof HTMLElement ) return;
            
        
    }
    
    window.game = {};
} );