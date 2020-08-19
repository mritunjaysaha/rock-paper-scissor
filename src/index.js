function RockPaperScissors(start, score, active, players, result, playAgain) {
    this.start = document.querySelector(start);
    this.score = document.querySelector(score);
    this.active = document.querySelector(active);
    this.player = document.querySelector(players.player);
    this.house = document.querySelector(players.house);
    this.result = document.querySelector(result);
    this.playAgain = document.querySelector(playAgain);

    this.playerCard = "";
    this.houseCard = "";
    this.currentScore = 0;
    this.bindEvents();
}

/**
 * Binds the starting cards section and
 * the play again button to respond when they are clicked
 */
RockPaperScissors.prototype.bindEvents = function () {
    this.start.addEventListener("click", (e) => {
        const selected = e.target.dataset["val"];

        this.playerCard = selected;

        this.start.style.display = "none";
        this.active.style.display = "flex";

        this.addPickedCards(this.player, this.playerCard);

        this.housePickCards();

        this.decideWinner();
    });

    this.playAgain.addEventListener("click", () => {
        this.start.style.display = "flex";
        this.active.style.display = "none";

        this.removeCards();
    });
};

RockPaperScissors.prototype.removeCards = function () {};

RockPaperScissors.prototype.decideWinner = function () {
    if (this.playerCard === this.houseCard) {
        this.result.innerText = "draw";
        console.log("draw");
    } else if (
        (this.playerCard === "rock" && this.houseCard === "scissors") ||
        (this.playerCard === "scissors" && this.houseCard === "paper") ||
        (this.playerCard === "paper" && this.houseCard === "rock")
    ) {
        this.result.innerText = "you win";
        this.currentScore++;
    } else {
        this.result.innerText = "you lose";
        this.currentScore--;
    }

    this.score.innerText =
        this.currentScore < 10 && this.currentScore >= 0
            ? "0" + this.currentScore
            : this.currentScore;
};

RockPaperScissors.prototype.addPickedCards = function (element, selected) {
    element.classList = "";
    element.classList.add("circle-outer");
    element.classList.add(`${selected}-outer`);
    element.innerHTML = "";

    console.log({ element });
    const spanElem = document.createElement("span");

    spanElem.classList.add("circle");
    spanElem.classList.add(`${selected}`);

    element.appendChild(spanElem);
};

RockPaperScissors.prototype.housePickCards = function () {
    const game = { 0: "rock", 1: "paper", 2: "scissors" };

    const selected = this.getRandomInt(3);

    this.houseCard = game[selected];

    this.addPickedCards(this.house, game[selected]);
};

RockPaperScissors.prototype.getRandomInt = function (max) {
    return Math.floor(Math.random() * Math.floor(max));
};

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
