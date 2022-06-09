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
        // Checks if the piece is a Pawn and it has reached the last row before invoking the promotion method.
        if (this instanceof Pawn && this.position[0] === this.player.startRow + this.player.forwardMove * 7) {
            checkWinCondition();
            if (!winner) {
                this.promotion();
            }
        }
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
        this.potentialMoves.target = [];
        this.potentialMoves.highlight = [];
        
        // Straights
        for (let i = -1; i <= 1; i += 2) {
        recursiveCheck(this.position[0], this.position[1], i, 0, this)
        recursiveCheck(this.position[0], this.position[1], 0, i, this)
        }

        // Diagonals
        for (let i = -1; i <= 1; i += 2) {
            for (let j = -1; j <= 1; j += 2) {
                recursiveCheck(this.position[0], this.position[1], i, j, this)
            }
        }
        renderMoves(this);
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
        this.potentialMoves.target = [];
        this.potentialMoves.highlight = [];
        
        // Diagonals only
        for (let i = -1; i <= 1; i += 2) {
            for (let j = -1; j <= 1; j += 2) {
                recursiveCheck(this.position[0], this.position[1], i, j, this)
            }
        }
        renderMoves(this);
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
        this.potentialMoves.target = [];
        this.potentialMoves.highlight = [];

        // Hardcoded the knight's movement patterns. 
        let knightMovement = [[2, 1], [-2, -1], [2, -1], [-2, 1], [1, 2], [-1, -2], [-1, 2], [1, -2]];

        for (let i = 0; i < knightMovement.length; i++) {
            let row = this.position[0] + knightMovement[i][0];
            let col = this.position[1] + knightMovement[i][1];
            if (isOutOfBounds(row, col)) continue;

            if (isEnemyPiece(row, col)) {
                addTarget(row, col, this);
            } else if (isEmptyCell(row, col)) {
                addHighlight(row, col, this);
            }
        }
        renderMoves(this);
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
        this.potentialMoves.target = [];
        this.potentialMoves.highlight = [];
        
        // Straights only
        for (let i = -1; i <= 1; i += 2) {
        recursiveCheck(this.position[0], this.position[1], i, 0, this)
        recursiveCheck(this.position[0], this.position[1], 0, i, this)
        }
        renderMoves(this);
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
                    if (this.firstTurn && isEmptyCell(row, col)) {
                        addHighlight(row, col, this);
                    }
                }
            }
        } 
        renderMoves(this);
    }

    promotion() {
        isPawnPromoting = true;
        // Give player option for promotion. Render a message and new buttons in a dashboard area.
        renderPromotion(this.player);
        let id = `Player${this.player.id.charAt(this.player.id.length-1)}`
        let thisObj = selectPieceFromPieces(this, this.player)
        document.querySelector(`#${id} .player-msg`).addEventListener('click', (evt) => {
            // Once selected, instantiate the appropriate piece and replace "this" with the new piece. aka, this = new Queen(...)
            if (evt.target.innerText === 'Queen') {
                this.player.pieces[thisObj] = new Queen(this.position, this.player);
            } else if (evt.target.innerText === 'Bishop') {
                this.player.pieces[thisObj] = new Bishop(this.position, this.player);
            } else if (evt.target.innerText === 'Knight') {
                this.player.pieces[thisObj] = new Knight(this.position, this.player);
            } else if (evt.target.innerText === 'Rook') {
                this.player.pieces[thisObj] = new Rook(this.position, this.player);
            }
            boardState[this.position[0]][this.position[1]] = this.player.pieces[thisObj];
            
            // Remove the options and message.
            isPawnPromoting = false;
            renderPromotion(this.player);
            renderPieces();
            changeTurn();
        })
    }
}