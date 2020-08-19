function Modal(button, modal, close) {
    this.button = document.querySelector(button);
    this.modal = document.querySelector(modal);
    this.close = document.querySelector(close);

    this.bindEvents();
}

Modal.prototype.bindEvents = function () {
    this.button.addEventListener("click", () => {
        this.modal.style.display = "flex";
    });

    this.close.addEventListener("click", () => {
        this.modal.style.display = "none";
    });
};

new Modal("#rules", "#modal", "#close");
