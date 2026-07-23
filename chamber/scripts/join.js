// join page: timestamp field and membership modals

// save the date and time the form was loaded
document.querySelector("#timestamp").value = new Date().toISOString();

// open the right modal when a card button is clicked
const modalButtons = document.querySelectorAll(".membership-card button");

modalButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modal = document.querySelector(`#${button.dataset.modal}`);
        modal.showModal();
    });
});

// close buttons inside the modals
document.querySelectorAll(".close-modal").forEach(button => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});
