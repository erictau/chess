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
                if (isOutOfBounds(row, col)) break;
                if (isEnemyPiece(row, col)) {
                    addTarget(row, col, potentialMoves);
                } else if (isEmptyCell(row, col)) {
                    addHighlight(row, col, potentialMoves);
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
        const potentialMoves = [];
        // Check diagonal positions for opponent pieces first.
        for (let i = -1; i <= 1; i++) {
            let row = this.position[0] + this.player.forwardMove;
            let col = this.position[1] + i;

            if (i !== 0) {
                if (isEnemyPiece(row, col)) {
                    addTarget(row, col, potentialMoves);
                }
            } else {
                if (isEmptyCell(row, col)) {
                    addHighlight(row, col, potentialMoves);
                    // Updates row value and checks the next cell if it is the pawn's first turn.
                    row = row + this.player.forwardMove;
                    if (isEmptyCell(row, col) && this.firstTurn) {
                        addHighlight(row, col, potentialMoves);
                    }
                }
            }
        }
        return potentialMoves;
    }

    promotion() {

    }
}