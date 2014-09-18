window.game = {};

$( function () {
        var
    
        _el              = null                                             // Private reference to the jQuery element on which we draw
    ,   _game            = []                                               // Array to maintain 'LIFE'
    ,   _player1         = []                                               // Not sure if I need this, but Player one needs some space I thik
    ,   _player2         = []                                               // So does player 2
    ,   _cell            = {}                                               // Object that keeps a record of the corresponding <td> tags
    ,   _options         = {}                                               // Private copy of the options
    ,   _count           = 0                                                // Running time
    ,   _score1          = 0                                                // Player 1's scrore
    ,   _score2          = 0                                                // Player 2's scrore
    ,   _playerTurn      = false                                            // Altering turns for Player 1 & 2 with a true:false flag
    ;
    
    var engine = {
        init : init
    }
    
    
    function scanForWinner( X, Y ) {
        var i, j, score=0;
        _playerTurn && console.log('Point: g(' + X + ',' + Y + ') = ' + _game[X][Y]);

        if ( X == Y ) {
            
                
            for ( score=0, i=0, j=0 ; i < _options.size ; i++, j++ ) {               // Scan diagonaly
                score += _game[i][j];
            }
            if( declareWinner(score) ) return;
		}

		if ( X == _options.size-1-Y ) {
            for ( score=0, i=0, j=_options.size-1; i < _options.size ; i++, j-- ) {               // Scan diagonaly
                score += _game[i][j];
            }
            console.log(score);
            if( declareWinner(score) ) return;


              
        }
        
            for ( score=0, i=X, j=0 ; j < _options.size ; j++ ) {               // Scan VERTICALLY
                score += _game[i][j];
            }
            if( declareWinner(score) ) return;
            
            
            
            for ( score=0, i=0, j=Y ; i < _options.size ; i++ ) {               // Scan HORIZONTALLY
                score += _game[i][j];
            }
            if( declareWinner(score) ) return;
            
            
     
        
        

        
    }
    
    function declareWinner ( score ) {
        if (score < _options.size)                          {   return false;   }
        if ( score == _options.size && !_playerTurn )       {   alert ('Player 2 won'); return true;    }
        if ( score == (2 * _options.size) && _playerTurn)   {   alert ('Player 1 won'); return true;    }
        return false;
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
                    

                    var id = $td.attr('id').split('td-')[1];
                    var X = id.split(',')[0] * 1;
                    var Y = id.split(',')[1] * 1;
                    
                   
                    
                    if ( _playerTurn ){
                        $td.attr('class', 'player1');
                        _game [ X ][ Y ] = 1;
                        _playerTurn = false;
                    } else {
                        $td.attr('class', 'player2');
                        _game [ X ][ Y ] = 2;
                        _playerTurn = true;
                    }
                    
                    scanForWinner( X, Y );
                    $td.off();
                });
                
            }
            
            $(table).append ( tr );
        }
        
        _el.html("");
        _el.append(table);
    }
    
    window.game = engine;
} );