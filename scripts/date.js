// puts the current year and the last modified date in the footer

const today = new Date();
document.querySelector("#currentyear").textContent = today.getFullYear();

document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;
