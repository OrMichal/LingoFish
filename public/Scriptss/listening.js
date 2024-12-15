const exerButt = document.getElementById("exerButt");
const exercise = document.getElementById("exerciseDiv");
const heading = document.getElementById("exerHead");

exerButt.addEventListener('click', () => {
    heading.innerHTML = exerButt;
});

