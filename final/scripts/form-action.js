// shows the values sent by the contact form

import { setupMenu, setupFooterDates } from "./utils.mjs";

setupMenu();
setupFooterDates();

const params = new URLSearchParams(window.location.search);

document.querySelector("#showName").textContent = params.get("fullname");
document.querySelector("#showEmail").textContent = params.get("email");
document.querySelector("#showSubject").textContent = params.get("subject");
document.querySelector("#showMessage").textContent = params.get("message");
