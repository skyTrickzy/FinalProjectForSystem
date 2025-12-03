import { toast } from "../components/toast.js";

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const errorMessage = document.getElementById("error-message");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the form from submitting

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Clear previous error message
        errorMessage.style.display = "none";
        errorMessage.textContent = "";

        // Validate credentials
        if (username === "admin" && password === "admin") {
            alert("Login Sucessful");
            localStorage.setItem("user", "admin");
            window.location.href = "dashboard.html";
        } else {
            errorMessage.style.display = "block";
            errorMessage.textContent = "Invalid username or password.";
        }
    });
});


export function withAuth() {
    const authToken = localStorage.getItem('user');

    return authToken ? true : false;
}