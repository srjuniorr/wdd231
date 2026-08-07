// shared functions used by all pages

export function setupMenu() {
    const menuButton = document.querySelector("#menu");
    const navigation = document.querySelector(".navigation");

    menuButton.addEventListener("click", () => {
        navigation.classList.toggle("open");

        if (navigation.classList.contains("open")) {
            menuButton.innerHTML = "&#10006;";
        } else {
            menuButton.innerHTML = "&#9776;";
        }
    });
}

export function setupFooterDates() {
    document.querySelector("#currentyear").textContent = new Date().getFullYear();
    document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;
}

export async function getDestinations() {
    try {
        const response = await fetch("data/destinations.json");
        if (!response.ok) {
            throw new Error("could not load the data file");
        }
        const data = await response.json();
        return data.destinations;
    } catch (error) {
        console.log(error);
        return [];
    }
}
