window.game = {};

$( function () {
        var
    
        _el              = null                                             // Private reference to the jQuery element on which we draw
    ,   _game            = []                                               // Array to maintain 'LIFE'
    ,   _cell            = {}                                               // Object that keeps a record of the corresponding <td> tags
    ,   _options         = {}                                               // Private copy of the options
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
        
        if( !_el ) return;
            
        for ( item in options ) {
            _options [ item ] = options [ item ];
        }
        
        drawBoard ();
    }
    
    function drawBoard() {
        var 
            i,j
            table       = $('<table>')
        ;
        
        for ( i = 0; i < _options.size ; i++ ) {
            
            var tr = $( '<tr>' )
            
            _game [ i ] = new Array( _options.size );
            
            for ( j = 0; j < _options.size ; j++ ) {

                var td = $( '<td>' );
                $(td).attr( 'id', 'td-' + i + ',' + j );
                
                $(tr).append( td );

                _game [ i ][ j ] = 0;
                _cell [ 'td-' + i +',' + j ] = td;
                
                
                $(td).on ('click', function () {
                    $td = $(this);
                    $td.attr('class', 'active');

                    var id = $td.attr('id').split('td-')[1];
                    var X = id.split(',')[0] * 1;
                    var Y = id.split(',')[1] * 1;
                    
                    _game [ X ][ Y ] = 1;
                });
                
            }
            
            $(table).append ( tr );
        }
        
        _el.html("");
        _el.append(table);
    }
    
    window.game = engine;
} );