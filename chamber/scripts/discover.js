// discover page: builds the cards and shows the last visit message

import { places } from "../data/discover.mjs";

// visit message using localStorage
const messageBox = document.querySelector("#visit-message");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
    messageBox.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const dayMs = 24 * 60 * 60 * 1000;
    const days = Math.floor((now - Number(lastVisit)) / dayMs);

    if (days < 1) {
        messageBox.textContent = "Back so soon! Awesome!";
    } else if (days === 1) {
        messageBox.textContent = "You last visited 1 day ago.";
    } else {
        messageBox.textContent = `You last visited ${days} days ago.`;
    }
}

localStorage.setItem("lastVisit", now);

// build the eight cards
const grid = document.querySelector("#discover-grid");

places.forEach(place => {
    const card = document.createElement("section");
    card.classList.add("discover-card");

    card.innerHTML = `
        <h2>${place.name}</h2>
        <figure>
            <img src="images/${place.image}" alt="photo of ${place.name}" width="300" height="200" loading="lazy">
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button>Learn More</button>
    `;

    grid.appendChild(card);
});
