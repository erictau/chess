/*--- Constants ---*/
const NUM_ROWS = 8
const NUM_COLUMNS = 8

/*--- State ---*/
let boardState = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null]]
let player1 = {
    id: 'player 1',
    startRow: 7,
    forwardMove: -1,
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
let player2 = {
    id: 'player 2',
    startRow: 0,
    forwardMove: 1,
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
const players = [player1, player2]
let playerTurn = 0;

/*--- Cache ---*/
const board = document.querySelector('#board');

/*--- Event Listeners ---*/
board.addEventListener('click', handleBoardClick);

/*--- Functions ---*/
function init() {
    boardState = [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null]]
    player1 = {
        id: 'player 1',
        startRow: 7,
        forwardMove: -1,
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
    player2 = {
        id: 'player 2',
        startRow: 0,
        forwardMove: 1,
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
    playerTurn = 0;
    boardSetup();
    pieceSetup();
    renderPieces();
}

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
    players.forEach(player => {
        // Major pieces in 1st row
        player.pieces.rook1 = new Rook([player.startRow, 0], player);
        player.pieces.knight1 = new Knight([player.startRow, 1], player);
        player.pieces.bishop1 = new Bishop([player.startRow, 2], player);
        player.pieces.queen = new Queen([player.startRow, 3], player);
        player.pieces.king = new King([player.startRow, 4], player);
        player.pieces.bishop2 = new Bishop([player.startRow, 5], player);
        player.pieces.knight2 = new Knight([player.startRow, 6], player);
        player.pieces.rook2 = new Rook([player.startRow, 7], player);

        // Pawns in 2nd row
        player.pieces.pawn1 = new Pawn([player.startRow + player.forwardMove, 0], player);
        player.pieces.pawn2 = new Pawn([player.startRow + player.forwardMove, 1], player);
        player.pieces.pawn3 = new Pawn([player.startRow + player.forwardMove, 2], player);
        player.pieces.pawn4 = new Pawn([player.startRow + player.forwardMove, 3], player);
        player.pieces.pawn5 = new Pawn([player.startRow + player.forwardMove, 4], player);
        player.pieces.pawn6 = new Pawn([player.startRow + player.forwardMove, 5], player);
        player.pieces.pawn7 = new Pawn([player.startRow + player.forwardMove, 6], player);
        player.pieces.pawn8 = new Pawn([player.startRow + player.forwardMove, 7], player);
    })

    // Update board state
    players.forEach(player => {
        for (let piece in player.pieces) {
            boardState[player.pieces[piece].position[0]][player.pieces[piece].position[1]] = player.pieces[piece];
        }
    })
}


function handleBoardClick(evt) {
    // When a cell is clicked, take the id of the cell and check the board state to see which chess piece is there. 
    // If the chess piece we clicked belongs to the player whose turn it is, then we will proceed to highlight moves. Else, nothing happens.
    if (evt.target.tagName === 'IMG') {
        let coordinates = evt.target.parentElement.id.split(',');
        selectPiece(coordinates);
    }
}


function selectPiece(coordinates) {
    const piece = boardState[coordinates[0]][coordinates[1]];
    if (piece.player === players[playerTurn]) {
        piece.highlightMoves();
        console.log("test");
    }
}

function renderPieces() {
    boardState.forEach((row, i) => {
        row.forEach((cell, j) => {
            // Clear the contents of the board before adding a new img element.
            board.children[`${i},${j}`].innerHTML = ''
            if (cell) {
                let imgEl = document.createElement('img');
                imgEl.src = cell.img;
                board.children[`${i},${j}`].appendChild(imgEl);
            }
        })
    })
}


function changeTurn() {
    playerTurn = (playerTurn + 1) % 2
}

/*--- Main ---*/
init();