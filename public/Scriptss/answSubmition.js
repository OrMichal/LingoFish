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
    if (event.target && event.target.classList.contains("submitAnswsButton")) {
        const allQBoxes = document.querySelectorAll(".QBox");
        const heading = document.getElementById("exerHead").textContent;

        let answs = [];
        allQBoxes.forEach((qBox) => {
            const selectedBox = qBox.querySelector(".chBox:checked");
            if (selectedBox) {
                answs.push(selectedBox.name); // Používám name pro identifikaci odpovědi
            } else {
                answs.push(null); // Pokud není odpověď vybrána
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

            // Změna barev odpovědí na základě výsledků
            allQBoxes.forEach((qBox, index) => {
                const checkBoxes = qBox.querySelectorAll(".chBox");

                checkBoxes.forEach((box) => {
                    const isChecked = box.checked;
                    const isCorrect = result.answse.includes(box.name);

                    if (isCorrect && isChecked) {
                        box.parentElement.style.backgroundColor = "green"; // Správná odpověď
                    } else if (isChecked) {
                        box.parentElement.style.backgroundColor = "red"; // Špatná odpověď
                    } else {
                        box.parentElement.style.backgroundColor = ""; // Reset barvy
                    }
                });
            });

            ExQList.querySelector(".resultMsg").textContent ="Gratuluji, počet správných odpovědí: " +  result.points;
        } catch (error) {
            console.error(error);
            alert("Nastala chyba při komunikaci se serverem.");
        }
    }
});
