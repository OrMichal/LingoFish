var slovoNaPreklad = document.getElementById("slovoNaPreklad")
slovoNaPreklad = addEventListener("keyup", prelozitDe)

var nemeckaSlova = ["sein", "sterben"];
var SlovnikCzSlova = ["být", "umřít"];

const baseUrl = "http://localhost:3123";
function prelozitDe() {


  var preklad = document.getElementById("preklad");

  if (slovoNaPreklad === "sein") {
    preklad.innerHTML = "random";
  }

  for (var i = 0; i < nemeckaSlova.length; i += 1) {
    if (slovoNaPreklad === nemeckaSlova[i]) {
      preklad.innerHTML = ceskaSlova_doNemciny[i].toString();
    }
  }

}



/*
var CzslovoNaPridani = document.getElementById("cesky").value;
var DeSlovoNaPridani = document.getElementById("nemecky").value;
*/


function pridatSlovoDe(){

  var CzslovoNaPridani = document.getElementById("cesky").value;
  var DeSlovoNaPridani = document.getElementById("nemecky").value;

  if (SlovnikDeSlova.includes(DeSlovoNaPridani)) {
    document.getElementById("vzkaz").innerHTML = "slovo už máš ve svém slovníku";
  } else {
    SlovnikCzSlova.push(CzslovoNaPridani);
    SlovnikDeSlova.push(DeSlovoNaPridani);
    document.getElementById("vzkaz").innerHTML = "přidáno! :--: "  + SlovnikCzSlova + "\n" + SlovnikDeSlova;
  }

  CzslovoNaPridani.value = '';
  DeSlovoNaPridani.value = '';

  
}



function setHunter(){
  document.getElementById("hunterGame").style.visibility = "visible";
  document.getElementById("cardGame").style.visibility = "hidden";
  document.getElementById("startBtn").style.visibility = "visible";
}

function setCards(){
  document.getElementById("cardGame").style.visibility = "visible";
  document.getElementById("word").innerHTML = "slovo na překlad";
  document.getElementById("hunterGame").style.visibility = "hidden";
}


function showTranslat(){
  let cardItem = document.getElementById("card")

  cardItem.style.transform = "rotateY(360deg)";
  let word = document.getElementById("word").innerHTML = "překlad toho slova";
}

function fetchWord() {
      fetch('http://localhost:3000/word')
        .then(response => response.text())
        .then(word => {
          document.getElementById('word').innerText = word;
        })
        .catch(error => console.error('Error fetching word:', error));
      
        
}

function vyhodnotitHans(){
  document.getElementById("qqq").style.display = "none";


  let corrAnsws = 0;
  let Answ1 = document.getElementById("answBox1");
  let Answ2 = document.getElementById("answBox2");
  let Answ3 = document.getElementById("answBox3");

  checkBoxes = document.querySelectorAll("input[name='check']");
  for (let index = 0; index < checkBoxes.length; index++) {
    if (checkBoxes[index].checked == true && checkBoxes[index].value == "correct"){
      corrAnsws += 1;
    }
    
  }

  document.getElementById("vysledek").style.display = "Block";
  document.getElementById("pocetSprav").innerHTML = corrAnsws.toString();
}



function setA1(){
  document.getElementById("A1div").style.display = "Block";
  document.getElementById("A2div").style.display = "none";
}

function setA2(){
  document.getElementById("A2div").style.display = "Block";
  document.getElementById("A1div").style.display = "none";
}



