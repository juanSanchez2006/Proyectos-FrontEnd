const miModulo = (() => {
    'use strict'
    
    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
    especiales = ['A', 'J', 'Q', 'K'];
    
    let puntosJugadores = [];

    // Referencias HTML
    const bt1 = document.querySelector('#bt1'),
          bt2 = document.querySelector('#bt2'),
          bt3 = document.querySelector('#bt3');
    
    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('small');

    // Esta funcion inicia el juego
    const iniciarJuego = ( numJudaores = 2 ) => {
        deck = crearDeck();

        puntosJugadores = [];
        for( let i = 0; i<numJudaores; i++ ) {
            puntosJugadores.push(0);
        }

        puntosHTML.forEach( elem => elem.innerText = 0 )
        divCartasJugadores.forEach( elem => elem.innerHTML = '' )
        
        bt2.disabled = false;
        bt3.disabled = false;
    }      
      
    

    // Esta funcion crea un nuevo deck
    const crearDeck = () => {

        deck = [];
        for( let i = 2; i <= 10; i++ ) {
            for( let tipo of tipos ) {
                deck.push( i + tipo )
            }
        }

        for( let tipo of tipos ) {
            for( let esp of especiales ) {
                deck.push( esp + tipo )
            }
        }
        return _.shuffle( deck );
    }

    // Esta funcion me permite tomar una carta
    const pedirCarta = () => {

        if( deck.length === 0 ) {
            throw 'No hay cartas en el deck'
        } 
        return deck.pop();;
    }

    const valorCarta = ( carta ) => {
        const valor = carta.substring(0, carta.length - 1);
        return ( isNaN( valor ) ) ? 
                ( valor === 'A' ) ? 11 : 10
                : valor * 1;
    }

    // Turno: 0 = primer jugador y el ultimo sera la cpu
    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = ( carta, turno ) => {

        const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${ carta }.png`;
            imgCarta.classList.add( 'carta' );
            divCartasJugadores[turno].append( imgCarta )

    }

    const determinarGanador = () => {

        const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

        setTimeout(() => {
            if( puntosComputadora === puntosMinimos ) {
                alert( 'Nadie Gana :(');
            } else if( puntosMinimos > 21 ) {
                alert('CPU Gana')
            } else if( puntosComputadora > 21 ) {
                alert('Jugador Gana')
            } else {
                alert('CPU Gana')
            }
        }, 900);
    }

    // Turno de la computadora 
    const turnoComputadora = ( puntosMinimos ) => {

        let puntosComputadora = 0;

        do {
            

            const carta = pedirCarta();
            puntosComputadora = acumularPuntos( carta, puntosJugadores.length - 1 );
            crearCarta( carta, puntosJugadores.length - 1 );

        } while( (puntosComputadora < puntosMinimos) && ( puntosMinimos <= 21 ) );
        
        determinarGanador();
    }

    // Eventos
    bt2.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta( carta, 0 );

        if( puntosJugador > 21 ) {
            console.warn( 'Perdiste' );
            bt2.disabled = true;
            bt3.disabled = true;
            turnoComputadora( puntosJugador );

        } else if ( puntosJugador === 21 ) {
            console.warn( '21, Genial' );
            bt2.disabled = true;
            bt3.disabled = true;
            turnoComputadora ( puntosJugador );
        }

    });

    bt3.addEventListener('click', () => {
        bt2.disabled = true;
        bt3.disabled = true;

        turnoComputadora( puntosJugadores[0] );
    
    });

    // bt1.addEventListener('click', () => {

    //     iniciarJuego();

    // });


    return {
        nuevoJuego: iniciarJuego
    };

})();






