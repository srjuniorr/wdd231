// responsive hamburger menu

const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    // change the icon between hamburger and X
    if (navigation.classList.contains("open")) {
        menuButton.innerHTML = "&#10006;";
    } else {
        menuButton.innerHTML = "&#9776;";
    }
});
