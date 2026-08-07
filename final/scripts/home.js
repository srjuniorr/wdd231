// home page: menu, footer dates and three featured destinations

import { setupMenu, setupFooterDates, getDestinations } from "./utils.mjs";

setupMenu();
setupFooterDates();

const featuredBox = document.querySelector("#featured");

async function showFeatured() {
    const destinations = await getDestinations();

    if (destinations.length === 0) {
        featuredBox.innerHTML = "<p>Sorry, the destinations could not be loaded.</p>";
        return;
    }

    // pick three random ones for the home page
    const shuffled = [...destinations].sort(() => Math.random() - 0.5);
    const featured = shuffled.slice(0, 3);

    featured.forEach(dest => {
        const card = document.createElement("section");
        card.classList.add("dest-card");
        card.innerHTML = `
            <img src="images/${dest.image}" alt="photo of ${dest.name}" width="300" height="200" loading="lazy">
            <div class="dest-body">
                <h2>${dest.name}</h2>
                <p><span class="region-tag">${dest.region}</span> ${dest.state}</p>
                <p>${dest.description}</p>
            </div>
        `;
        featuredBox.appendChild(card);
    });
}

showFeatured();
