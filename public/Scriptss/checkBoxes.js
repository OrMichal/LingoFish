let checkBoxes = document.querySelectorAll(".answer");
let chBoxList = [];
const ExQLItems = document.querySelectorAll(".ExQLItem");

ExQLItems.forEach((item) => {
    const checkBoxes = [];
    item.querySelector(".QBox").querySelectorAll(".answer").forEach((answ) => {
        checkBoxes.push(answ.querySelector(".chBox"));
    });

    checkBoxes.forEach((box) => {
        box.addEventListener('change', (event) => {
            if (event.target.checked) {
                checkBoxes.forEach((b) => {
                    if (b !== event.target) {
                        b.checked = false;
                    }
                });
            }
        });
    });
});
