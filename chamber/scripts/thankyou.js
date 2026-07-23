// reads the form values from the url and shows them on the page

const params = new URLSearchParams(window.location.search);

document.querySelector("#showFirstname").textContent = params.get("firstname");
document.querySelector("#showLastname").textContent = params.get("lastname");
document.querySelector("#showEmail").textContent = params.get("email");
document.querySelector("#showPhone").textContent = params.get("phone");
document.querySelector("#showOrganization").textContent = params.get("organization");

// make the timestamp easier to read
const stamp = params.get("timestamp");
if (stamp) {
    document.querySelector("#showTimestamp").textContent = new Date(stamp).toLocaleString("en-US");
}
