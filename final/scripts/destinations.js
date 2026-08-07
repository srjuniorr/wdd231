// destinations page: cards, region filter, details modal and favorites

import { setupMenu, setupFooterDates, getDestinations } from "./utils.mjs";

setupMenu();
setupFooterDates();

const grid = document.querySelector("#dest-grid");
const filterBox = document.querySelector("#filters");
const modal = document.querySelector("#destModal");
const modalContent = document.querySelector("#modalContent");

let allDestinations = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function displayDestinations(list) {
    grid.innerHTML = "";

    list.forEach(dest => {
        const isFav = favorites.includes(dest.name);
        const card = document.createElement("section");
        card.classList.add("dest-card");
        card.innerHTML = `
            <img src="images/${dest.image}" alt="photo of ${dest.name}" width="300" height="200" loading="lazy">
            <div class="dest-body">
                <h2>${dest.name}</h2>
                <p><span class="region-tag">${dest.region}</span> ${dest.state}</p>
                <p><strong>Type:</strong> ${dest.type}</p>
                <p><strong>Best season:</strong> ${dest.bestSeason}</p>
                <div class="card-buttons">
                    <button class="details-btn" data-name="${dest.name}">Details</button>
                    <button class="fav-btn" data-name="${dest.name}" aria-label="favorite ${dest.name}">${isFav ? "★" : "☆"}</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function openModal(dest) {
    modalContent.innerHTML = `
        <h2>${dest.name}</h2>
        <p><span class="region-tag">${dest.region}</span> ${dest.state} - ${dest.type}</p>
        <p>${dest.description}</p>
        <p><strong>Best season to visit:</strong> ${dest.bestSeason}</p>
    `;
    modal.showModal();
}

document.querySelector("#closeModal").addEventListener("click", () => {
    modal.close();
});

// one listener for the whole grid handles both buttons
grid.addEventListener("click", (event) => {
    const name = event.target.dataset.name;
    if (!name) return;

    if (event.target.classList.contains("details-btn")) {
        const dest = allDestinations.find(d => d.name === name);
        openModal(dest);
    }

    if (event.target.classList.contains("fav-btn")) {
        if (favorites.includes(name)) {
            favorites = favorites.filter(f => f !== name);
            event.target.textContent = "☆";
        } else {
            favorites.push(name);
            event.target.textContent = "★";
        }
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
});

// region filter buttons
filterBox.addEventListener("click", (event) => {
    if (event.target.tagName !== "BUTTON") return;

    document.querySelectorAll("#filters button").forEach(b => b.classList.remove("active-filter"));
    event.target.classList.add("active-filter");

    const region = event.target.dataset.region;
    if (region === "all") {
        displayDestinations(allDestinations);
    } else if (region === "favorites") {
        displayDestinations(allDestinations.filter(d => favorites.includes(d.name)));
    } else {
        displayDestinations(allDestinations.filter(d => d.region === region));
    }
});

async function init() {
    allDestinations = await getDestinations();

    if (allDestinations.length === 0) {
        grid.innerHTML = "<p>Sorry, the destinations could not be loaded.</p>";
        return;
    }

    displayDestinations(allDestinations);
}

init();
