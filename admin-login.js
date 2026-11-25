
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    loginMessage.textContent = "Checking login...";
    loginMessage.style.color = "#6f4228";

    try {
        const response = await fetch("http://127.0.0.1:5000/api/admin/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Login failed");
        }

        loginMessage.textContent = "Login successful! Opening dashboard...";
        loginMessage.style.color = "green";

        window.location.href = "admin.html";

    } catch (error) {
        loginMessage.textContent = "❌ " + error.message;
        loginMessage.style.color = "red";
    }
});
