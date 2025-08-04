let container = document.getElementById("container");
let gameMenu = document.getElementById("gameMenu");
let menuButtons = Array.from(document.querySelectorAll("div.gameMenu button.toMenu"));
let modals = document.querySelectorAll("div.menu");
let settings = document.getElementById("settings");

function menu(displayMe) {
    container.classList.add("blur");
    displayMe.classList.remove("hide");
}

function ok(hideMe) {
    hideMe.classList.add("hide");
    container.classList.remove("blur");
}

menuButtons.forEach(button => {
    button.addEventListener("click", () => {
        let index = +button.getAttribute("data-menu"); // convert to number
        let targetModal = modals[index];
        if (targetModal) {
            menu(targetModal);
        }
    });
});