window.onload = async () => {
    try {
        const resp = await fetch("http://localhost:3123/grammarLvls", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const selection = document.getElementById("gramSelect");

        const data = await resp.json();
        data.lvlArr.forEach((l) => {
            const option = document.createElement("option");
            option.text = l;

            selection.appendChild(option);
        });
    } catch (error) {
        console.log(error);
    }
};

const selection = document.getElementById("gramSelect");
const grammarSelection = document.getElementById("gPSelection").querySelector(".navChoice").querySelector("#grammarList");
selection.addEventListener("click", async (event) => {
    if(event.target && event.target.matches("option")){
        document.getElementById("grammarList").innerHTML = " ";
        const level = event.target.text;
        const resp = await fetch("http://localhost:3123/getGrammar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({level}),
        });

        const data = await resp.json();

        data.resultArr.forEach((p) => {
            const li = document.createElement("li");
            li.className = "navChoice-item";
            li.id = "exerButt";
            li.textContent = p;

            grammarSelection.appendChild(li);
        });
    }
});

const grammarUl = document.getElementById("grammarList");
grammarUl.addEventListener("click", async (event) => {
    if(event.target && event.target.matches("li")){
        const headin = document.getElementById("head");
        const gramDiv = document.getElementById("gramDivv");
        const gram = event.target.textContent;
        console.log(gram);
        const resp = await fetch("http://localhost:3123/getGramPt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({gram}),
        });

        const data = await resp.json();
        headin.innerHTML = gram;
        const explDiv = gramDiv.querySelector(".gramExpl");
        explDiv.innerHTML = " ";
        data.result.forEach((t) => {
            const p = document.createElement("p");
            p.textContent = t;
            explDiv.appendChild(p);
        });
    }
});