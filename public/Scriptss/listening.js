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

            const divA = document.createElement("div");

            const input = document.createElement("input");
            input.type = "checkbox";
            input.className = "chBox";

            const spanA = document.createElement("span");
            spanA.className = "answerText";
            spanA.textContent = data.answers[data.questions.indexOf(q)];

            divA.appendChild(input);
            divA.appendChild(spanA);

            data.allAnswers.forEach((randAnsw) => {
                spanA.textContent = data.allAnswers[data.questions.indexOf(q)];
                //dodělat!
                divA.appendChild(input);
                divA.appendChild(spanA);
            });

            qDiv.appendChild(divA);

            exerDiv.appendChild(qDiv);
        });
    }
});
