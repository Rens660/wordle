class Game {
    constructor() {
        this.won = false;
        this.guesses = 6;
        this.wordLength = 5;
        this.currentRow = 0;
        this.word = "music";
        this.tiles = document.querySelector(".tiles");
        this.createTiles();
    }
    createTiles() {
        for (let i=0; i<this.guesses; i++) {
            let tileRow = `<div class="tile-row">`;
            for (let j=0; j<this.wordLength; j++) {
                tileRow += `<div class="tile" data-state="empty"></div>`;
            }
            tileRow += `</div>`;
            this.tiles.innerHTML += tileRow;
        }
    }
    addLetter(button) {
        const currentTiles = this.tiles.childNodes[this.currentRow].childNodes;
        for (let tile of currentTiles) {
            if (tile.dataset.state == "empty") {
                tile.innerText = button.innerText;
                tile.dataset.state = "TBD";
                break;
            }
        }

        if (this.maxWordsGuessed()) {
            this.checkLetters();
        } else if (this.currentRowIsFull()) {
            this.checkLetters();
            this.currentRow += 1;
        }
    }
    currentRowIsFull() {
        const currentTiles = this.tiles.childNodes[this.currentRow].childNodes;
        let full = true;
        for (let tile of currentTiles) {
            if (tile.dataset.state == "empty") {
                full = false;
                break;
            }
        }
        return full;
    }
    maxWordsGuessed() {
        const lastTiles = this.tiles.lastChild.childNodes;
        let full = true;
        for (let tile of lastTiles) {
            if (tile.dataset.state == "empty") {
                full = false;
                break;
            }
        }
        return full;
    }
    checkGameStatus(last=false) {
        // 
    }

    checkLetters() {
        const currentTiles = this.tiles.childNodes[this.currentRow].childNodes;
        for (let [index, tile] of currentTiles.entries()) {
            const letter = tile.innerText.toLowerCase();
            if (this.word.includes(letter)) {
                if (this.word.indexOf(letter) == index) {
                    tile.dataset.state = "correctSpot";
                } else {
                    tile.dataset.state = "wrongSpot";
                }
            } else {
                tile.dataset.state = "notPresent";
            }
        }
        if (this.wordCorrectlyGuessed()) {
            disableButtons();
        }
    }
    wordCorrectlyGuessed() {
        let correctlyGuessed = true;
        const currentTiles = this.tiles.childNodes[this.currentRow].childNodes;
        for (let tile of currentTiles) {
            if (tile.dataset.state == "wrongSpot" || tile.dataset.state == "notPresent") {
                correctlyGuessed = false;
                break;
            }
        }
        return correctlyGuessed;
    }
    disableButtons() {
        let buttons = document.querySelectorAll("button");
        for (let button of buttons) {
            button.dataset.state = "disabled";
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    var game = new Game();
    let buttons = document.querySelectorAll("button");
    for (let button of buttons) {
        button.addEventListener("click", () => game.addLetter(button));
    }
})