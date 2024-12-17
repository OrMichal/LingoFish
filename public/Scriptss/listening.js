const exerButts = document.querySelectorAll("#exerButt");
const exercise = document.getElementById("exerciseDiv");
const heading = document.getElementById("exerHead");
const audioPlayer = document.getElementById("audio");

exerButts.forEach((button) => {
    button.addEventListener('click', async () => {
        const exName = button.querySelector(".nChItem").textContent;

        heading.innerHTML = exName;
        exercise.querySelector(".audio").querySelector(".source").src = "../audio/" + exName + ".mp3";
        audioPlayer.style.display = "flex";
        document.getElementById("questons").style.display = "block";
        exercise.querySelector(".audio").load();

        try {
            const resp = await fetch("localhost:3123/Listening", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ exName }),
            });

            if(!resp.ok){
                return alert("oopsie daisie nastal problém při komunikaci se serverem");
            }

            const data = await resp.json();

            
        } catch (error) {
            alert("ajeje chybička",error)
        }


    });
});