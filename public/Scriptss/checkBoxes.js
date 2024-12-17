const { FineTuningJobsPage } = require("openai/resources/fine-tuning/index.mjs");

let checkBoxes = document.querySelectorAll(".answer");
let chBoxList = []
const ExQLItems = document.querySelectorAll(".ExQLItem");
ExQLItems.forEach((item) => {
    item.querySelector(".QBox").querySelectorAll(".answer").forEach((answ) => {
        chBoxList.push(answ.querySelector(".chBox"));
    });
});

chBoxList.forEach((box) => {
    function isSmthChecked(){
        chBoxList.forEach((cBox) => {
            if(cBox.checked == true){
                return false;
            }
        });
        return false;
    }

    
});