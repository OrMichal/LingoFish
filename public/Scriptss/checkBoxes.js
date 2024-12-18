const questionsList = document.getElementById("questionsList");

questionsList.addEventListener("change", (event) => {
    if (event.target && event.target.classList.contains("chBox")) {
        const parentDiv = event.target.closest(".QBox");
        const checkBoxes = parentDiv.querySelectorAll(".chBox");

        if (event.target.checked) {
            checkBoxes.forEach((b) => {
                if (b !== event.target) {
                    b.checked = false;
                }
            });
        }
    }
});
