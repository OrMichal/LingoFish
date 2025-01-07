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

const card = document.getElementById("card");
card.addEventListener("click", async () => {
    card.style.transform = "rotateZ('360deg')";
    card.style.scale = "1.1";
    card.style.transition = "200ms ease";
    
    const word = card.querySelector(".gCardWord").textContent;
    const resp = await fetch("http://localhost:3123/getTranslation", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({word})
    });

    const data = await resp.json();
    card.querySelector(".gCardWord").textContent = data.translation;
});