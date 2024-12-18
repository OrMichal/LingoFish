window.onload = async () => {
    try {
        const resp = await fetch("http://localhost:3123/storrHeadings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
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
        const exName = event.target.textContent;
        const exercise = document.getElementById("exerciseDiv");
        const heading = document.getElementById("exerHead");
        const audioPlayer = document.getElementById("audio");

        heading.innerHTML = exName;
        exercise.querySelector(".audio").querySelector(".source").src = "../audio/" + exName + ".mp3";
        audioPlayer.style.display = "flex";
        document.getElementById("questons").style.display = "block";
        exercise.querySelector(".audio").load();

        const resp = await fetch("http://localhost:3123/lQuestons", {
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

            data.allAnswers.forEach((randAnsw) => {
                
                const spanAA = document.createElement("span");
                const divSingleAnswerr = document.createElement("div");

                spanAA.textContent = randAnsw;
                spanAA.className = "answerText";

                const inputt = document.createElement("input");
                inputt.type = "checkbox";
                inputt.className = "chBox";
                input.name = randAnsw;

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
        exerDiv.appendChild(answSubmitButton);
    }
});
