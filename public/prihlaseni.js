const inputName = document.getElementById('username');
const inputPswrd = document.getElementById('password');
const LgnButton = document.getElementById("logInButton");

LgnButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const username = inputName.value;
    const password = inputPswrd.value;

    try {
        const resp = await fetch("http://localhost:3123/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await resp.json();
        if (resp.ok) {
            alert("Login successful");
            console.log("Token: ", data.token);

            localStorage.setItem("authToken", data.token);
        } else {
            alert(data.message || "Login failed");
        }

    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred during login");
    }
});
