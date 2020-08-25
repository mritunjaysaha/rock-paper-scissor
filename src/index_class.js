class RockPaperScissors {
    /**
     *
     * @param {String} start -- id of the rock, paper and scissors selector
     * @param {String} score -- id of the score DOMElement
     * @param {String} active -- id of the section after selecting rock, paper or scissors
     * @param {Object} players -- ids of the player card and the card selected by cpu(house)
     * @param {String} result -- id of the play again text
     * @param {String} playAgain -- id of the play again button
     */
    constructor(start, score, active, players, result, playAgain) {
        // get the DOMElements
        this.start = document.querySelector(start);
        this.score = document.querySelector(score);
        this.active = document.querySelector(active);
        this.player = document.querySelector(players.player);
        this.house = document.querySelector(players.house);
        this.result = document.querySelector(result);
        this.playAgain = document.querySelector(playAgain);

        // variables
        this.playerCard = "";
        this.houseCard = "";
        this.currentScore = "";

        this.bindEvents();
    }

    bindEvents() {
        this.start.addEventListener("click", (e) => {
            this.playerCard = e.target.dataset["val"];
            if (this.playerCard) {
                this.start.style.display = "none";
                this.active.style.display = "flex";

                this.addPickedCards(this.player, this.playerCard);

                this.housePickCards();

                this.decideWinner();
            }
        });

        this.playAgain.addEventListener("click", () => {
            this.start.style.display = "flex";
            this.active.style.display = "none";
        });
    }

    /**
     * Decides the winner between the house and the player.
     * rock beats scissors, scissors beats paper, paper beats rock
     */
    decideWinner() {
        if (this.playerCard === this.houseCard) {
            this.result.innerText = "draw";
        } else if (
            (this.playerCard === "rock" && this.houseCard === "scissors") ||
            (this.playerCard === "scissors" && this.houseCard === "paper") ||
            (this.playerCard === "paper" && this.houseCard === "rock")
        ) {
            this.result.innerText = "you win";
            this.currentScore++;
            this.addRippleEffect(this.player);
        } else {
            this.result.innerText = "you lose";
            this.currentScore--;
            this.addRippleEffect(this.house);
        }

        this.score.innerText =
            this.currentScore < 10 && this.currentScore >= 0
                ? "0" + this.currentScore
                : this.currentScore;
    }

    /**
     * Adds ripple effect to the DOM element
     * @param {DOMElement} element
     */
    addRippleEffect(element) {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < 4; i++) {
            const spanElem = document.createElement("span");
            spanElem.classList.add("ripple");
            spanElem.style.animationDuration = `${i * 2.5}s`;

            fragment.appendChild(spanElem);
        }

        element.prepend(fragment);
    }

    /**
     * Adds classes to the player and the house
     * @param {DOMElement} element the classes will be added to this element
     * @param {String} selected the type of classes that will be added to the element
     */
    addPickedCards(element, selected) {
        element.classList = "";
        element.classList.add("circle-outer");
        element.classList.add(`${selected}-outer`);
        element.innerHTML = "";

        const spanElem = document.createElement("span");

        spanElem.classList.add("circle");
        spanElem.classList.add(`${selected}`);

        element.appendChild(spanElem);
    }

    /**
     * Randomly genareates a number between 0 - 3,
     * Selects the name of the card based on the number
     * and passes to the addPickedCards()
     */
    housePickCards() {
        const game = { 0: "rock", 1: "paper", 2: "scissors" };

        const selected = this.getRandomInt(3);

        this.houseCard = game[selected];

        this.addPickedCards(this.house, game[selected]);
    }

    /**
     * Generates random number between 0 and max
     * @param {Number} max
     */
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}

new RockPaperScissors(
    "#start",
    "#score",
    "#active",
    {
        player: "#player",
        house: "#house",
    },
    "#play-again-text",
    "#play-again-btn"
);
