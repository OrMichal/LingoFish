const ExQList = document.getElementById("questionsList");

// Listener pro click na checkboxy
ExQList.addEventListener("click", (event) => {
    if (event.target && event.target.classList.contains("chBox")) {
        const parentDiv = event.target.closest(".QBox");
        if (!parentDiv) return;

        // Najdi všechny checkboxy v rámci jednoho QBox
        const checkBoxes = parentDiv.querySelectorAll(".chBox");

        // Zajisti, že pouze jeden checkbox může být zaškrtnut
        checkBoxes.forEach((box) => {
            if (box !== event.target) {
                box.checked = false;
            }
        });
    }
});

// Listener pro tlačítko odeslání odpovědí
ExQList.addEventListener("click", async (event) => {
    console.log("kliknuto na tlačítko");


    if (event.target && event.target.classList.contains("submitAnswsButton")) {
        console.log("submit tlačítko detekováno");
        const allQBoxes = document.querySelectorAll(".QBox");
        const heading = document.getElementById("exerHead").textContent;

        let answs = [];
        allQBoxes.forEach((qBox) => {
            // Najdi zaškrtnutý checkbox v aktuálním QBox
            const selectedBox = qBox.querySelector(".chBox:checked");
            if (selectedBox) {
                answs.push(selectedBox.name); // Přidej jméno odpovědi
            } else {
                answs.push(null); // Pokud nic není vybrané, přidej null
            }
        });

        try {
            const resp = await fetch("http://localhost:3123/answCheck", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ answs, heading }),
            });
            
            if (!resp.ok) {
                return alert("Chyba serveru při vyhodnocování odpovědí.");
            }            

            const result = await resp.json();
            return alert(`Gratuluji, získal jsi ${result.points} bodů.`);
        } catch (error) {
            console.error(error);
            alert("Nastala chyba při komunikaci se serverem.");
        }
    }
});
