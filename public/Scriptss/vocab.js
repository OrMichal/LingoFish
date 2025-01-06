const gameChoiceDiv = document.getElementById("gChDiv");
let active = " ";
gameChoiceDiv.addEventListener("click", async (event) => {
    if(event.target && event.target.matches("li.gameLi")){
        active = event.target.textContent;
    }

    const gContn = document.getElementById("gCont");
    const resp = await fetch("http://localhost:3123/getRandWord", {
        method: "POST",
        headers : {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({})
    });

    const data = await resp.json();
    gContn.querySelector(".gCard").querySelector(".gCardWord").textContent = data.word;
});