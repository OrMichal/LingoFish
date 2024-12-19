window.onload = async () => {
    document.getElementById("contDiv").style.display ="none";
    try {
        const querr = "čtení";
        const resp = await fetch("http://localhost:3123/storrHeadings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({querr})
        });

        if (!resp.ok) {
            console.error("Chyba při komunikaci se serverem:", resp.status);
            return;
        }

        const data = await resp.json();

        const storrList = document.getElementById("storiesList");

        if (!data.headings || !Array.isArray(data.headings)) {
            console.error("Neplatná data přijatá ze serveru:", data);
            return;
        }

        data.headings.forEach((h) => {
            const li = document.createElement("li");
            li.className = "navChoice-item";
            li.id = "exerButt";

            const a = document.createElement("a");
            a.className = "navChoice-link";

            const span = document.createElement("span");
            span.className = "nChItem";
            span.id = "exerName";
            span.textContent = h;

            a.appendChild(span);
            li.appendChild(a);
            storrList.appendChild(li);
        });
    } catch (error) {
        console.error("Nastala chyba při načítání dat:", error);
    }
};

const storrList = document.getElementById("storiesList");

storrList.addEventListener("click", async (event) => {
    if (event.target && event.target.matches("li#exerButt a span.nChItem")) {
        document.getElementById("contDiv").style.display ="flex";
        const exName = event.target.textContent;
        const exercise = document.getElementById("exerciseDiv");
        const heading = document.getElementById("exerHead");
        const contentDiv = document.getElementById("contDiv");

        heading.innerHTML = exName;
        const resp = await fetch("http://localhost:3123/rQuestons", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ exName }),
        });

        if (!resp.ok) {
            alert("oopsie daisie nastal problém při komunikaci se serverem");
            return;
        }

        const data = await resp.json();

        const exerCont = document.getElementById("contDiv");
        const textArr = data.content.split(';');
        textArr.forEach((t) => {
            const p = document.createElement("p");
            p.textContent = t;
            p.className = "textP"

            exerCont.appendChild(p);
        });

        const exerDiv = document.getElementById("questionsList");
        exerDiv.innerHTML = "";

        data.questions.forEach((q) => {
            const li = document.createElement("li");
            li.className = "ExQLItem";

            const qDiv = document.createElement("div");
            qDiv.className = "QBox";
            qDiv.id = "qbox";

            li.appendChild(qDiv);

            const spanQ = document.createElement("span");
            spanQ.className = "question";
            spanQ.textContent = q;

            qDiv.appendChild(spanQ);

            const divAnsw = document.createElement("div");
            divAnsw.style.display = "flex";
            divAnsw.style.flexDirection = "column";

            const input = document.createElement("input");
            input.type = "checkbox";
            input.className = "chBox";
            input.name = data.answers[data.questions.indexOf(q)];

            const spanA = document.createElement("span");
            spanA.className = "answerText";
            spanA.textContent = data.answers[data.questions.indexOf(q)];

            divSingleAnswer = document.createElement("div");
            divSingleAnswer.appendChild(input);
            divSingleAnswer.appendChild(spanA);

            divAnsw.appendChild(divSingleAnswer);

            let othersAnsws = data.allAnswers[data.questions.indexOf(q)];
            othersAnsws.forEach((randAnsw) => {
                
                const spanAA = document.createElement("span");
                const divSingleAnswerr = document.createElement("div");

                spanAA.textContent = randAnsw;
                spanAA.className = "answerText";

                const inputt = document.createElement("input");
                inputt.type = "checkbox";
                inputt.className = "chBox";
                inputt.name = randAnsw;

                divSingleAnswerr.appendChild(inputt);
                divSingleAnswerr.appendChild(spanAA);

                divAnsw.appendChild(divSingleAnswerr);
            });

            qDiv.appendChild(divAnsw);

            
            exerDiv.appendChild(qDiv);
        });

        const answSubmitButton = document.createElement("button");
        answSubmitButton.type = "button";
        answSubmitButton.className = "submitAnswsButton";
        answSubmitButton.textContent = "Vyhodnotit";

        const msgP = document.createElement("p");
        msgP.textContent = " ";
        msgP.className = "resultMsg";
        
        exerDiv.appendChild(msgP);
        exerDiv.appendChild(answSubmitButton);
    }
});
