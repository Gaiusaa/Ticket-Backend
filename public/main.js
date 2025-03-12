// DOM
const loginForm = document.querySelector(".login-form");
const buttons = document.querySelectorAll(".button");

// Variable

// Function
const loginFunction = (event) => {
    event.preventDefault();
    const form = event.target;

    const email = form.querySelector("#email");
    const password = form.querySelector("#password");
    const token = form.querySelector("#token-check");

    const fetchBody = {
        email: email.value,
        password: password.value,
        remember: token.value,
    };

    fetch("/api/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(fetchBody),
    })
    .then((response) => {
        if (!response.ok) throw new Error(`An error occurred trying to log in: ${response.status}`);
        return response.json();
    })
    .then((data) => {
        if (data.success && data.success === true) window.location.reload();
    })
    .catch((error) => console.log(`Error logging in: ${error}`));
};

const buttonPress = (event) => {
    const button = event.target;
    const action = button.getAttribute("action")

    if (action) { // Button does GET or POST
        if (action === "GET") {
            window.location = `/${button.id}`;
        } else {

        };
    } else { // Button does something else

    };
};

// Event
if (loginForm) loginForm.addEventListener("submit", loginFunction);
if (buttons) {buttons.forEach((button) => {button.addEventListener("click", buttonPress)})};