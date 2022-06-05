// This file sets up all the chess piece classes that will be used in the main application.

class BoardPiece {
    constructor(position, player) {
        this.position = position;
        this.player = player;
    }

    highlightMoves() {

    }

    move(potentialMoves) {
        
    }
}

class King extends BoardPiece {
    constructor(position, player) {
        super(position, player);
        if (player.color === 'dark') {
            this.img = 'img/Chess_kdt45.svg';
        } else {
            this.img = 'img/Chess_klt45.svg';
        }
    }

    highlightMoves() {
        const potentialMoves = []
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                // Check if cell is occupied
                // If occupied by enemy piece, add target class to that div
                // If not occupied, add div to highlight the move. 
                // Add all targets and highlighted cells to the potentialMoves array.
                let row = this.position[0] + i;
                let col = this.position[1] + j;
                // If out of bounds, break.
                if (row < 0 || row > 7 || col < 0 || row > 7) break;
                let cellEl = document.getElementById(`${row},${col}`);
                if (boardState[row][col] && boardState[row][col].player !== players[playerTurn]) {
                    potentialMoves.push([row, col]);
                    cellEl.classList.add('target');
                } else if (!boardState[row][col]) {
                    potentialMoves.push([row, col]);
                    let divEl = document.createElement('div');
                    divEl.classList.add('highlighted')
                    cellEl.appendChild(divEl);
                } 
            }
        }
        return potentialMoves;
    }
}

class Queen extends BoardPiece {
    constructor(position, player) {
        super(position, player);
        if (player.color === 'dark') {
            this.img = 'img/Chess_qdt45.svg';
        } else {
            this.img = 'img/Chess_qlt45.svg';
        }
    }

    highlightMoves() {
        
    }
}

class Bishop extends BoardPiece {
    constructor(position, player) {
        super(position, player);
        if (player.color === 'dark') {
            this.img = 'img/Chess_bdt45.svg';
        } else {
            this.img = 'img/Chess_blt45.svg';
        }
    }

    highlightMoves() {
        
    }
}

class Knight extends BoardPiece {
    constructor(position, player) {
        super(position, player);
        if (player.color === 'dark') {
            this.img = 'img/Chess_ndt45.svg';
        } else {
            this.img = 'img/Chess_nlt45.svg';
        }
    }

    highlightMoves() {
        
    }
}

class Rook extends BoardPiece {
    constructor(position, player) {
        super(position, player);
        if (player.color === 'dark') {
            this.img = 'img/Chess_rdt45.svg';
        } else {
            this.img = 'img/Chess_rlt45.svg';
        }
    }

    highlightMoves() {
        
    }
}

class Pawn extends BoardPiece {
    constructor(position, player) {
        super(position, player);
        this.firstTurn = true;
        if (player.color === 'dark') {
            this.img = 'img/Chess_pdt45.svg';
        } else {
            this.img = 'img/Chess_plt45.svg';
        }
    }

    highlightMoves() {
        
    }

    promotion() {

    }
}