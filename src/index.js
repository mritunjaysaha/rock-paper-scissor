function RockPaperScissors(start, score) {
    this.start = document.querySelector(start);
    this.score = document.querySelector(score);

    this.selectedCard = "";

    this.bindEvents();
}

RockPaperScissors.prototype.bindEvents = function () {
    this.start.addEventListener("click", (e) => {
        const selected = e.target.dataset["val"];

        this.selectedCard = selected;

        console.log(this.selectedCard);
    });
};

new RockPaperScissors("#start", "#score");
