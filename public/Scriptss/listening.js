const exerButts = document.querySelectorAll("#exerButt");
const exercise = document.getElementById("exerciseDiv");
const heading = document.getElementById("exerHead");
const audioPlayer = document.getElementById("audio");

exerButts.forEach((button) => {
    button.addEventListener('click', () => {
        const exName = button.querySelector(".nChItem").textContent;

        heading.innerHTML = exName;
        exercise.querySelector(".audio").querySelector(".source").src = "../audio/" + exName + ".mp3";
        audioPlayer.style.display = "flex";
        document.getElementById("questons").style.display = "block";
        exercise.querySelector(".audio").load();
    });
});

