/*--- Constants ---*/
const NUM_ROWS = 8
const NUM_COLUMNS = 8

/*--- State ---*/
const boardState = [[],[],[],[],[],[],[],[]]
const player1 = {
    id: 'player 1',
    startRow: 7,
    color: 'dark',
    pieces: {
        king: null,
        queen: null,
        bishop1: null, bishop2: null,
        knight1: null, knight2: null,
        rook1: null, rook2: null,
        pawn1: null, pawn2: null, pawn3: null, pawn4: null, pawn5: null, pawn6: null, pawn7: null, pawn8: null
    }
}
const player2 = {
    id: 'player 2',
    startRow: 0,
    color: 'light',
    pieces: {
        king: null,
        queen: null,
        bishop1: null, bishop2: null,
        knight1: null, knight2: null,
        rook1: null, rook2: null,
        pawn1: null, pawn2: null, pawn3: null, pawn4: null, pawn5: null, pawn6: null, pawn7: null, pawn8: null
    }
}

/*--- Cache ---*/
const board = document.querySelector('#board');

/*--- Event Listeners ---*/
board.addEventListener('click', handleBoardClick);

/*--- Functions ---*/

// Programmatically sets up the 64 divs representing each board position. Sets each div's class & id and appends to board.
function boardSetup() {
    for (let i = 0; i < NUM_ROWS * NUM_COLUMNS; i++) {
        // Creating the new div element
        let divEl = document.createElement('div');
        
        // Creating unique id based on grid coordinates for each cell
        let coordinates = [Math.floor(i / 8), i % 8]
        let id = `${coordinates[0]},${coordinates[1]}`
        divEl.id = id;
        
        // Add classes to divs to create checkerboard pattern
        divEl.classList.add('board-cell')
        if (coordinates[0] % 2 && coordinates[1] % 2) {
            divEl.classList.add('light');
        } else if (!(coordinates[0] % 2) && !(coordinates[1] % 2)) {
            divEl.classList.add('light'); 
        } else {
            divEl.classList.add('dark');
        }
        board.appendChild(divEl);
    }
}

function pieceSetup() {
    // Instantiate all pieces for both sides. Will need to hard-code the coordinates.
    

}

function init() {
    boardSetup();
    pieceSetup();
}

function handleBoardClick() {
    // When a cell is clicked, take the id of the cell and check the board state to see which chess piece is there. 
    // If the chess piece we clicked belongs to the player whose turn it is, then we will proceed to highlight moves. Else, nothing happens.
}


/*--- Main ---*/
init();