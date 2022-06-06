// This file sets up all the chess piece classes that will be used in the main application.

class BoardPiece {
    constructor(position, player) {
        this.position = position;
        this.player = player;
        this.potentialMoves = {target: [], highlight: []};
    }

    highlightMoves() {
        // To be overloaded in sub classes.
    }

    move(newCell) {
        boardState[this.position[0]][this.position[1]] = null;
        this.position = newCell;
        boardState[this.position[0]][this.position[1]] = this;
    }

    eat(newCell) {
        selectPieceFromState(newCell).position = 'removed';
        this.move(newCell);
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
        this.potentialMoves.target = [];
        this.potentialMoves.highlight = [];
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                let row = this.position[0] + i;
                let col = this.position[1] + j;
                if (isOutOfBounds(row, col)) continue;
                if (isEnemyPiece(row, col)) {
                    addTarget(row, col, this);
                } else if (isEmptyCell(row, col)) {
                    addHighlight(row, col, this);
                }
            }
        }
        renderMoves(this);
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
        this.potentialMoves.target = [];
        this.potentialMoves.highlight = [];

        // Sets state of "first turn" prior to highlighting any potential moves
        if (this.position[0] !== this.player.startRow + this.player.forwardMove) this.firstTurn = false;

        // Check diagonal positions for opponent pieces first.
        for (let i = -1; i <= 1; i++) {
            let row = this.position[0] + this.player.forwardMove;
            let col = this.position[1] + i;
            if (isOutOfBounds(row, col)) continue;

            // Pawns can only eat other pieces diagonally. Therefore, we can only add a opponent piece as a target when i != 0.
            if (i !== 0) {
                if (isEnemyPiece(row, col)) {
                    addTarget(row, col, this);
                }
            } else {
                if (isEmptyCell(row, col)) {
                    addHighlight(row, col, this);
                    // Updates row value and checks the next cell if it is the pawn's first turn.
                    row = row + this.player.forwardMove;
                    if (isEmptyCell(row, col) && this.firstTurn) {
                        addHighlight(row, col, this);
                    }
                }
            }
        } 
        renderMoves(this);
    }

    promotion() {

    }
}