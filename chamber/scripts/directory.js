// loads the members from the json file and shows them in grid or list view

const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#gridBtn");
const listButton = document.querySelector("#listBtn");

const levelNames = {
    1: "Member",
    2: "Silver",
    3: "Gold"
};

async function getMembers() {
    try {
        const response = await fetch("data/members.json");
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.log(error);
        membersContainer.innerHTML = "<p>Sorry, the member list could not be loaded.</p>";
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("section");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" width="300" height="200" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}">${member.website}</a>
            <p><span class="level-badge">${levelNames[member.membership]}</span></p>
        `;

        membersContainer.appendChild(card);
    });
}

// toggle between the two views
gridButton.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
    gridButton.classList.add("active-view");
    listButton.classList.remove("active-view");
});

listButton.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
    listButton.classList.add("active-view");
    gridButton.classList.remove("active-view");
});

getMembers();
