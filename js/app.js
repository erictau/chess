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
const players = [player1, player2];
let selectedPiece = null;
let playerTurn = 0;

/*--- Cache ---*/
const board = document.querySelector('#board');

/*--- Event Listeners ---*/
board.addEventListener('click', handleBoardClick);

/*--- Functions ---*/
function init() { 
    playerTurn = 0;
    resetPieces();
    boardSetup();
    pieceSetup();
    renderPieces();
}


function resetPieces() {
    // Clear board
    for (let i = 0; i < boardState.length; i++) {
        for (let j = 0; j < boardState.length; j++) {
            boardState[i][j] = null;
        }
    }
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
    let coordinates = evt.target.parentElement.id.split(',');
    let piece = selectPieceFromState(coordinates);
    if (selectedPiece) {
        // Checks if the player clicked on the same piece to deselect it.
        let clickedID = evt.target.parentElement.id.split(',');
        if (isMatchingArray(clickedID, selectedPiece.position)) {
            clearRenderedMoves();
            selectedPiece = null;
            return;
        } 
        
        // Checks if player clicked on a potential move to move piece to that location.
        for (let i = 0; i < selectedPiece.potentialMoves.target.length; i++) {
            if (isMatchingArray(clickedID, selectedPiece.potentialMoves.target[i])) {
                selectedPiece.eat();
                clearRenderedMoves();
                clearMoveState();
                return;
            }
        }
        for (let i = 0; i < selectedPiece.potentialMoves.highlight.length; i++) {
            if (isMatchingArray(clickedID, selectedPiece.potentialMoves.highlight[i])) {
                selectedPiece.move();
                clearRenderedMoves();
                clearMoveState();
                return;
            }
        }
        

        // deselect or move
        // clear potentialMoves
        // clear rendered moves
        // change selectedPiece to null
        
    } else if (evt.target.tagName === 'IMG') {
        // select piece and add its potential moves to potentialMoves
        // render the potential moves
        // Set selectedPiece to clicked piece
        if (piece.player === players[playerTurn]){
            piece.highlightMoves();
        }
    } else {
        return;
    }
}


function clearRenderedMoves() {
    selectedPiece.potentialMoves.target.forEach(cell => {
        selectPieceFromDOM(cell).classList.remove('target')
    })
    selectedPiece.potentialMoves.highlight.forEach(cell => {
        selectPieceFromDOM(cell).innerHTML = '';
    })
}

function clearMoveState() {
    selectedPiece.potentialMoves.target = [];
    selectedPiece.potentialMoves.highlight = [];
    selectedPiece = null;
}

function selectPieceFromState(coordinates) {
    return boardState[coordinates[0]][coordinates[1]];
}


function selectPieceFromDOM(coordinates) {
    return document.getElementById(`${coordinates[0]},${coordinates[1]}`);
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

function addTarget(row, col, piece) {
    piece.potentialMoves.target.push([row, col]);
    selectedPiece = piece;
}

function addHighlight(row, col, piece) {
    piece.potentialMoves.highlight.push([row, col]);
    selectedPiece = piece;
}

function renderMoves(piece) {
    for (target of piece.potentialMoves.target) {
        selectPieceFromDOM(target).classList.add('target');
    }
    for (highlight of piece.potentialMoves.highlight) {
        let cellEl = selectPieceFromDOM(highlight);
        let divEl = document.createElement('div');
        divEl.classList.add('highlighted');
        cellEl.appendChild(divEl);
    }
}



function isOutOfBounds(row, col) {
    return row < 0 || row >= NUM_ROWS || col < 0 || col >= NUM_COLUMNS;
}

function isEnemyPiece(row, col) {
    return boardState[row][col] && boardState[row][col].player !== players[playerTurn];
}

function isEmptyCell(row, col) {
    return !boardState[row][col];
}

// Compares 2 arrays and returns true or false based on if all elements in the arrays match.
function isMatchingArray(arrA, arrB) {
    if (arrA.length !== arrB.length) return false;

    for (let i = 0; i < arrA.length; i++) {
        if (arrA[i].toString() !== arrB[i].toString()) return false;
    }
    return true;
}
/*--- Main ---*/
init();
