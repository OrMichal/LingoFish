const inputNamee = document.getElementById("regUsername");
const inputPsw = document.getElementById("regPassword");
const regButt = document.getElementById("registerButton");
const msg = document.getElementById("msg");

inputPsw.addEventListener('change', () => {
    msg.style.display = "none";
    msg.innerHTML = " ";
});

regButt.addEventListener('click', async (event) => {
    event.preventDefault();

    username = inputNamee.value;
    password = inputPsw.value;

    console.log("Received: ", username, " ", password);

    if(password !== document.getElementById("regConfirmPassword").value){
        msg.innerHTML = "Zadaná hesla nejsou stejná :(";
        msg.style.display = "block";
        msg.style.color = "red";
    }

    try {
        const resp = await fetch("http://localhost:3123/signup", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
    
        const data = await resp.json();
        if(resp.ok){
            msg.innerHTML = "Účet byl úspěšně vytvořen :)";
            msg.style.color = "green";
        }else{
            msg.innerHTML = data.message;
            msg.style.display = "block";
            msg.style.color = "red";
        }
    } catch (error) {
        console.log("error: ", error);
        alert("Oops an error occurred");
    }
});