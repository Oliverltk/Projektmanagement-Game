import "https://unpkg.com/@material/web@1.0.0-pre.13/switch/switch.js?module";
window.addEventListener("DOMContentLoaded", () => {
  const startnumber = document.getElementById("start-number");
  for (let i = 1; i < 7; i++) {
    let number = document.createElement("option");
    number.innerHTML = i;
    startnumber.appendChild(number);
  }
});

//Control visibility of sections
const newgame = document.getElementById("new-btn");
newgame.addEventListener("click", () => {
  showpage("new-game");
  history.pushState({ page: "new-game" }, "");
});
var array;
var zugrichtung;
let spieler1, spieler2, spieler3, spieler4;
let endFeld1, endFeld2, endFeld3, endFeld4;
newgame.addEventListener("click", () => {
  //einfügen und färben der Spielfelder
  //gameboardCSS.appendChild(createCell(2,2));
  //createGamefield();
  //zugrichtung = createArray();   //global scope
  //spielerhinzufuegen(player_amount);
});
const gamerules = document.getElementById("gamerules-btn");
gamerules.addEventListener("click", () => {
  showpage("game-rules");
  history.pushState({ page: "game-rules" }, "");
});
const gamestart = document.getElementById("gamestart-btn");
gamestart.addEventListener("click", () => {
  showpage("main-game");
  history.pushState({ page: "main-game" }, "");
  selected_players = player_amount.value;
  createGamefield();
  endFeld1=createZiel1();
  endFeld2=createZiel2();
  endFeld3=createZiel3();
  endFeld4=createZiel4();
  zugrichtung = createArray(); //global scope
  console.log("Spieleranzahl:" + selected_players);
  spielerhinzufuegen(selected_players);
  console.log(spieler1[2].zielFeld[2].id);
});
window.addEventListener("popstate", (event) => {
  console.log(event.state);
  let page = event.state?.page || "main-menu";
  showpage(page);
});
function showpage(page) {
  document
    .querySelectorAll("body > div")
    .forEach((element) => element.classList.add("invisible"));
  document.querySelector("." + page).classList.remove("invisible");
}
function createCell(row, column) {
  let cell = document.createElement("div");
  cell.classList.add("createdcell");
  cell.style.gridRow = row;
  cell.style.gridColumn = column;
  cell.id = column + "cell" + row; //zuerst die X-Achse dann die Y-Achse
  return cell;
}
function createSpielfigur(column, row, farbe, startpunkt,ziel) {
  let cell = document.createElement("div");
  cell.classList.add("createdcell2");
  cell.style.gridRow = row;
  cell.style.gridColumn = column;
  cell.style.backgroundColor = farbe;
  cell.id = column + "figur" + row; //zuerst die X-Achse dann die Y-Achse
  cell.home = true;
  cell.counter = 0;
  cell.start = startpunkt;
  cell.momentanePos= startpunkt;
  cell.startFeld = zugrichtung[startpunkt];
  cell.zielFeld = ziel;   //jede Figur hat ein Array mit den Zielfeldern des Spielers
  cell.zielErreicht=false;
  cell.startRow=row;
  cell.startColumn=column;
  return cell;
}
function createZiel1(){
  const zlo = [
    document.getElementById("2cell6"),
    document.getElementById("3cell6"),
    document.getElementById("4cell6"),
    document.getElementById("5cell6"),
  ];
  return zlo;
}
function createZiel2(){
  const zlo = [
    document.getElementById("10cell6"),
    document.getElementById("9cell6"),
    document.getElementById("8cell6"),
    document.getElementById("7cell6"),
  ];
  return zlo;
}
function createZiel3(){
  const zlo = [
    document.getElementById("6cell2"),
    document.getElementById("6cell3"),
    document.getElementById("6cell4"),
    document.getElementById("6cell5"),
  ];
  return zlo;
}
function createZiel4(){
  const zlo = [
    document.getElementById("6cell10"),
    document.getElementById("6cell9"),
    document.getElementById("6cell8"),
    document.getElementById("6cell7"),
  ];
  return zlo;
}
function createPlayer1() {
  const spieler1 = [
    createSpielfigur(1, 1, "blue", 0,endFeld1),
    createSpielfigur(1, 2, "blue", 0,endFeld1),
    createSpielfigur(2, 1, "blue", 0,endFeld1),
    createSpielfigur(2, 2, "blue", 0,endFeld1),
  ];
  return spieler1;
}
function createPlayer2() {
  const spieler2 = [
    createSpielfigur(11, 11, "green", 20,endFeld2),
    createSpielfigur(11, 10, "green", 20,endFeld2),
    createSpielfigur(10, 11, "green", 20,endFeld2),
    createSpielfigur(10, 10, "green", 20,endFeld2),
  ];
  return spieler2;
}
function createPlayer3() {
  const spieler3 = [
    createSpielfigur(11, 1, "yellow", 10,endFeld3),
    createSpielfigur(11, 2, "yellow", 10,endFeld3),
    createSpielfigur(10, 1, "yellow", 10,endFeld3),
    createSpielfigur(10, 2, "yellow", 10,endFeld3),
  ];
  return spieler3;
}
function createPlayer4() {
  const spieler4 = [
    createSpielfigur(1, 11, "red", 30,endFeld4),
    createSpielfigur(2, 11, "red", 30,endFeld4),
    createSpielfigur(1, 10, "red", 30,endFeld4),
    createSpielfigur(2, 10, "red", 30,endFeld4),
  ];
  return spieler4;
}
function createArrow(column, row, x, y, html) {
  let arrow = document.createElement("div");
  arrow.style.display = "flex";
  arrow.style.justifyContent = x;
  arrow.style.alignItems = y;
  arrow.style.gridRow = row;
  arrow.style.gridColumn = column;
  arrow.style.fontSize = "x-large";
  arrow.innerHTML = html;
  return arrow;
}
function spielerhinzufuegen(SpielerAnzahl) {
  //fügt die Spieler dem Gameboard hinzu und füllt die Arrays Spieler1,SPieler2, etc
  spieler1 = createPlayer1();
  spieler2 = createPlayer2();
  for (let i = 0; i < spieler1.length; i++) {
    gameboardCSS.appendChild(spieler1[i]);
  }
  for (let i = 0; i < spieler1.length; i++) {
    gameboardCSS.appendChild(spieler2[i]);
  }
  if (SpielerAnzahl == 3) {
    spieler3 = createPlayer3();
    for (let i = 0; i < spieler1.length; i++) {
      gameboardCSS.appendChild(spieler3[i]);
    }
  }
  if (SpielerAnzahl == 4) {
    spieler3 = createPlayer3();
    for (let i = 0; i < spieler1.length; i++) {
      gameboardCSS.appendChild(spieler3[i]);
    }
    spieler4 = createPlayer4();
    for (let i = 0; i < spieler1.length; i++) {
      gameboardCSS.appendChild(spieler4[i]);
    }
  }
}
function createGamefield(SpielerAnzahl) {
  gameboardCSS.appendChild(
    createArrow(9, 8, "center", "flex-start", "&#8592;")
  ); //arrow Left
  gameboardCSS.appendChild(
    createArrow(3, 8, "center", "flex-start", "&#8592;")
  );
  gameboardCSS.appendChild(createArrow(9, 4, "center", "flex-end", "&#8594;")); //arrow Right
  gameboardCSS.appendChild(createArrow(3, 4, "center", "flex-end", "&#8594;"));
  gameboardCSS.appendChild(
    createArrow(8, 9, "flex-start", "center", "&#8595;")
  ); //arrow down
  gameboardCSS.appendChild(
    createArrow(8, 3, "flex-start", "center", "&#8595;")
  );
  gameboardCSS.appendChild(createArrow(4, 3, "flex-end", "center", "&#8593;")); //arrow Up
  gameboardCSS.appendChild(createArrow(4, 9, "flex-end", "center", "&#8593;"));
  for (let y = 1; y < 12; y++) {
    //column bzw Spalte |
    for (let x = 1; x < 12; x++) {
      //row bzw Zeile ------
      if (y == 1 || y == 2 || y == 10 || y == 11) {
        if (
          x == 1 ||
          x == 2 ||
          x == 5 ||
          x == 6 ||
          x == 7 ||
          x == 10 ||
          x == 11
        ) {
          gameboardCSS.appendChild(createCell(x, y));
        }
      }
      if (y == 4 || y == 3 || y == 8 || y == 9) {
        if (x == 5 || x == 6 || x == 7) {
          gameboardCSS.appendChild(createCell(x, y));
        }
      }
      if (y == 5 || y == 6 || y == 7) {
        if (y == 6 && x == 6) {
          //laesst exakt die Mitte aus by doing nothin
        } else {
          gameboardCSS.appendChild(createCell(x, y));
        }
      }
    }
  }
  document.getElementById("1cell1").style.backgroundColor = "#6495ed";
  document.getElementById("1cell2").style.backgroundColor = "#6495ed";
  document.getElementById("2cell1").style.backgroundColor = "#6495ed";
  document.getElementById("2cell2").style.backgroundColor = "#6495ed";
  document.getElementById("1cell5").style.backgroundColor = "#6495ed";
  for (let i = 2; i < 6; i++) {
    document.getElementById(i + "cell6").style.backgroundColor = "#6495ed"; //Corn Flower Blue
  }
  document.getElementById("10cell1").style.backgroundColor = "#fcf75e";
  document.getElementById("11cell2").style.backgroundColor = "#fcf75e";
  document.getElementById("10cell2").style.backgroundColor = "#fcf75e";
  document.getElementById("11cell1").style.backgroundColor = "#fcf75e";
  document.getElementById("7cell1").style.backgroundColor = "#fcf75e";
  for (let i = 2; i < 6; i++) {
    document.getElementById("6cell" + i).style.backgroundColor = "#fcf75e"; //Icetrine
  }
  document.getElementById("1cell10").style.backgroundColor = "#fa8072";
  document.getElementById("2cell10").style.backgroundColor = "#fa8072";
  document.getElementById("1cell11").style.backgroundColor = "#fa8072";
  document.getElementById("2cell11").style.backgroundColor = "#fa8072";
  document.getElementById("5cell11").style.backgroundColor = "#fa8072";
  for (let i = 7; i < 11; i++) {
    document.getElementById("6cell" + i).style.backgroundColor = "#fa8072"; //Tomato
  }
  document.getElementById("10cell10").style.backgroundColor = "#90ee90";
  document.getElementById("11cell10").style.backgroundColor = "#90ee90";
  document.getElementById("10cell11").style.backgroundColor = "#90ee90";
  document.getElementById("11cell11").style.backgroundColor = "#90ee90";
  document.getElementById("11cell7").style.backgroundColor = "#90ee90";
  for (let i = 7; i < 11; i++) {
    document.getElementById(i + "cell6").style.backgroundColor = "#90ee90"; //LIght Green
  }
}
//Adding content to gamerules

const rules_content = document.getElementById("gamerules");
rules_content.innerHTML = `
  <h1>Das Spiel</h1>
  <p>Bei „Mensch ärgere dich nicht!“ handelt es sich um ein Brettspiel, welches mit 2-4 Spielern gespielt werden kann. Jeder Spieler erhält vier Spielfiguren, die er in sein Ziel bringen muss. Hierbei kann er die Spielfiguren anderer Spieler temporär aus dem Spiel werfen. Die Spielfiguren warten dann am Spielfeldrand auf ihren Einsatz.</p>
  <h1>Einstellmöglichkeiten</h1>
  <p>Die Spieleranzahl kann über ein Dropdown Menü eingestellt werden, die Spieleranzahl steht bei erstmaligem Starten des Spiels immer auf „2“.</p>
  <p>Falls kein physischer Würfel vorhanden ist oder nicht benutzt werden soll, gibt es die Möglichkeit durch Anklicken der Schaltfläche „virtueller Würfel“, einen virtuellen Würfel am Spielfeldrand zu erzeugen. Das Würfelergebnis wird mithilfe eines Zufallsgenerators erzeugt.</p>
  <p>Als Variation kann die Augenzahl von 6-10 verändert werden. Die Standardeinstellung ist 6.</p>
  <h1>Wie wird gespielt?</h1>
  <p>Jeder Spieler sucht sich zu Beginn eine Farbe aus. Zu Beginn wird eine Figur jeder Farbe auf das zugehörige Startfeld gestellt. Der jüngste Spieler beginnt, danach wird im Uhrzeigersinn gewürfelt und gezogen. Die Person die an der Reihe ist würfelt und zieht mit einer Figur die angegebene Augenzahl. Falls ein Spieler mehrere Figuren auf dem Spielfeld hat, kann die jeweilige Figur durch Anklicken gewählt werden. Sollte es sich um eine ungültige Bewegung handeln, erhält der Spieler seitlich einen Hinweis.</p>
  <p>Falls ein Spieler eine Spielfigur bewegt und mit dem letzten „Schritt“ auf das Feld einer gegnerischen Spielfigur tritt, wird die gegnerische Spielfigur geschlagen. Die gegnerische Spielfigur wird auf das zugehörige Wartefeld gestellt. Spielfiguren können nicht auf ihren eigenen Startfeldern geschlagen werden, diese müssen vom Gegner übersprungen werden.</p>
  <p>Eine Spielfigur kann aus dem Wartefeld auf das Startfeld gestellt werden, wenn die höchste Augenzahl gewürfelt wird.</p>
  <p>Sollte die höchste Augenzahl gewürfelt werden, darf der Spieler erneut würfeln.</p>
`;

//creating the dice
const dice_target = document.getElementById("dice-target");
const dice_btn = document.querySelector("md-switch");

const header = document.createElement("h1");
header.innerHTML = "&nbspWürfel";
dice_target.appendChild(header);

let random_number = null;

const gamestart_btn = document.getElementById("gamestart-btn");
gamestart_btn.disabled = false;
gamestart_btn.addEventListener("click", () => {
  gamestart_btn.disabled = true;
  if (dice_btn.selected) {
    let number_result = document.createElement("input");
    number_result.type = "number";
    number_result.classList.add("sidebar-margin");
    let linebreak = document.createElement("br");
    const start_dice = document.createElement("button");
    start_dice.classList.add("sidebar-margin");
    start_dice.innerHTML = "Neue Zahl";
    dice_target.appendChild(number_result);
    dice_target.appendChild(linebreak);
    dice_target.appendChild(start_dice);
    start_dice.addEventListener("click", () => {
      console.log("click");
      random_number = parseInt(Math.random() * 6) + 1;
      console.log(random_number);
      number_result.value = random_number;
      console.log(number_result);
      switch (random_number) {
        case 1:
          alternierend(1);
          break;
        case 2:
          alternierend(2);
          break;
        case 3:
          alternierend(3);
          break;
        case 4:
          alternierend(4);
          break;
        case 5:
          alternierend(5);
          break;
        case 6:
          alternierend(6);
          break;
      }
    });
  } else {
    for (let i = 1; i < 7; i++) {
      const number_btn = document.createElement("button");
      number_btn.setAttribute("class", "number-btn");
      number_btn.innerHTML = i;
      number_btn.id = "button" + i;
      dice_target.appendChild(number_btn);
    }
    button1.addEventListener("click", () => {
      alternierend(1);
    });
    button2.addEventListener("click", () => {
      alternierend(2);
    });
    button3.addEventListener("click", () => {
      alternierend(3);
    });
    button4.addEventListener("click", () => {
      alternierend(4);
    });
    button5.addEventListener("click", () => {
      alternierend(13);
    });
    button6.addEventListener("click", () => {
      alternierend(6);
    });
  }
});
async function alternierend(zahl) {
  
  switch (getcurrentcolor()) {
    case "Blau":
      await eventSpielfigur(spieler1, zahl);
      break;
    case "Grün":
      await eventSpielfigur(spieler2, zahl);
      break;
    case "Gelb":
      await eventSpielfigur(spieler3, zahl);
      break;
    case "Rot":
      await eventSpielfigur(spieler4, zahl);
      break;
  }
  alternation++;

  currentplayer(getcurrentcolor());
  /*
  //alternierendes hinzufügen der Funktion eventSpielfigur
  if (selected_players == 2) {
    if (alternation % 2 == 0) {
      console.log("Spieler Blau ist an der Reihe");
      alternation++;
      await eventSpielfigur(spieler1, zahl);
      currentplayer("");
    } else {
      currentplayer("Grün");
      eventSpielfigur(spieler2, zahl);
      console.log("Spieler Grün ist an der Reihe");
      alternation++;
    }
  } else if (selected_players == 3) {
    if (alternation % 3 == 0) {
      currentplayer("Blau");
      eventSpielfigur(spieler1, zahl);
      console.log("Spieler Blau ist an der Reihe");
      alternation++;
    } else if (alternation % 3 == 1) {
      eventSpielfigur(spieler2, zahl);
      currentplayer("Grün");
      console.log("Spieler Grün ist an der Reihe");
      alternation++;
    } else if (alternation % 3 == 2) {
      eventSpielfigur(spieler3, zahl);
      currentplayer("Gelb");
      console.log("Spieler Gelb ist an der Reihe");
      alternation++;
    }
  } else if (selected_players == 4) {
    if (alternation % 4 == 0) {
      eventSpielfigur(spieler1, zahl);
      currentplayer("Blau");
      console.log("Spieler Blau ist an der Reihe");
      alternation++;
    } else if (alternation % 4 == 1) {
      eventSpielfigur(spieler2, zahl);
      currentplayer("Grün");
      console.log("Spieler Grün ist an der Reihe");
      alternation++;
    } else if (alternation % 4 == 2) {
      eventSpielfigur(spieler3, zahl);
      currentplayer("Gelb");
      console.log("Spieler Gelb ist an der Reihe");
      alternation++;
    } else if (alternation % 4 == 3) {
      eventSpielfigur(spieler4, zahl);
      currentplayer("Rot");
      console.log("Spieler Rot ist an der Reihe");
      alternation++;
    }
  }*/
}
function getcurrentcolor() {
  //alternierendes hinzufügen der Funktion eventSpielfigur
  if (selected_players == 2) {
    if (alternation % 2 == 0) {
      return "Blau";
    } else {
      return "Grün";
    }
  } else if (selected_players == 3) {
    if (alternation % 3 == 0) {
      return "Blau";
    } else if (alternation % 3 == 1) {
      return "Grün";
    } else if (alternation % 3 == 2) {
      return "Gelb";
    }
  } else if (selected_players == 4) {
    if (alternation % 4 == 0) {
      return "Blau";
    } else if (alternation % 4 == 1) {
      return "Grün";
    } else if (alternation % 4 == 2) {
      return "Gelb";
    } else if (alternation % 4 == 3) {
      return "Rot";
    }
  }
}
const currentheader = document.createElement("h1");
currentheader.classList.add("sidebar-margin");
currentheader.innerHTML = "Aktueller Spieler";

let currenttext = document.createElement("p");
currenttext.textContent = "Spieler Blau ist an der Reihe.";
currenttext.classList.add("sidebar-margin");
currenttext.setAttribute("id", "currenttext");

let currentplayer_target = document.getElementById("currentplayer_target");

currentplayer_target.appendChild(currentheader);
currentplayer_target.appendChild(currenttext);
function currentplayer(playercolor) {
  currenttext.innerHTML = "Spieler " + playercolor + " ist an der Reihe.";
  currentplayer_target.appendChild(currenttext);
}

var playerAnzahl = 4;
var alternation = 0;
//const selected_players = player_amount.value;
function eventSpielfigur(spieler, zahl) {
  return new Promise((resolve) => {
    const controller = new AbortController();
    const { signal } = controller;
    for (let i = 0; i < 4; i++) {
      spieler[i].addEventListener(
        "click",
        () => {
          console.log("Hi");   //hier prüfen ob die bewegung überhaupt möglich
          movement(zahl, spieler[i], spieler);
          controller.abort();
          resolve();
        },
        { signal }
      );
    }
  });
}
async function gültigerMove(zahl,figur,spieler){
     let endziel =figur.momentanePos+zahl;
    if(endziel<40){
    let finalRow=zugrichtung[endziel].style.gridRow;
    let finalColumn=zugrichtung[endziel].style.gridColumn;
    for(let i=0;i<4;i++){
      if(finalRow==spieler1[i].style.gridRow && finalColumn==spieler1[i].style.gridColumn ){
        console.log("Ich schlage deine Blaue Figur");
        schlageFigur(zahl,spieler1[i]);
      }
      else if(finalRow==spieler2[i].style.gridRow && finalColumn==spieler2[i].style.gridColumn ){
        console.log("Ich schlage deine Grüne Figur");
        schlageFigur(zahl,spieler2[i]);
      }
      else if(selected_players==3 || selected_players==4){  //out of bounds Fehler verhindern
      if(finalRow==spieler3[i].style.gridRow && finalColumn==spieler3[i].style.gridColumn ){
        console.log("Ich schlage deine Gelbe Figur");
        await delay(zahl*180);
        spieler3[i].style.gridRow=spieler3[i].startRow;
        spieler3[i].style.gridColumn=spieler3[i].startColumn;
      }
    }
    else if(selected_players==4){  //out of bounds Fehler verhindern
      if(finalRow==spieler4[i].style.gridRow && finalColumn==spieler4[i].style.gridColumn ){
        console.log("Ich schlage deine Rote Figur");
        await delay(zahl*200);
        spieler4[i].style.gridRow=spieler4[i].startRow;
        spieler4[i].style.gridColumn=spieler4[i].startColumn;
      }
    }
    }
  }
}
async function schlageFigur(zahl,spielfigur){
  await delay(zahl*200);
        spielfigur.style.gridRow=spielfigur.startRow;
        spielfigur.style.gridColumn=spielfigur.startColumn;
        spielfigur.counter=0;
        spielfigur.home=true;
        spielfigur.momentanePos=spielfigur.start;
}
async function movement(zahl, figur, spieler) {
  if(!figur.home){
    gültigerMove(zahl,figur,spieler);
  }
    if (figur.home && zahl==6) {
      var occupied = false;
      for (let i = 0; i < 4; i++) {   //prüft ob auf dem startfeld schon eine Figur steht
        if (
          spieler[i].style.gridRow == spieler[i].startFeld.style.gridRow &&
          spieler[i].style.gridColumn == spieler[i].startFeld.style.gridColumn
        ) {
          occupied = true;
        }
      }
      if (!occupied && figur.home) {
        figur.style.gridRow = figur.startFeld.style.gridRow;
        figur.style.gridColumn = figur.startFeld.style.gridColumn;
        figur.home = false;
      }
    } else if(!figur.home){
      for (let z = 0; z < zahl; z++) {
        figur.momentanePos = figur.momentanePos + 1;
        figur.counter++;
        if (figur.momentanePos > 39) {
          figur.momentanePos = 0;
        }
        if(figur.counter<40){
        figur.style.gridRow = zugrichtung[figur.momentanePos].style.gridRow;
        figur.style.gridColumn = zugrichtung[figur.momentanePos].style.gridColumn;
        await delay(100);
      } else if(figur.counter<44 && figur.counter>39){
        figur.zielErreicht=true;
        figur.style.gridRow = figur.zielFeld[figur.counter-40].style.gridRow;
        figur.style.gridColumn = figur.zielFeld[figur.counter-40].style.gridColumn;
        await delay(100);
      }
      }
    }
    if (spieler[0].zielErreicht && spieler[1].zielErreicht && spieler[2].zielErreicht && spieler[3].zielErreicht){
      console.log("Das Spiel wurde gewonnen!");
      //Currentplayer als Variable anlegen und hier Currentplayer ausgeben
    }
    
}
const player_amount = document.getElementById("player-amount");
let selected_players = player_amount.value;

function delay(milliseconds) {
  // delay Funktion wird mit "await delay(ms)" benutzt
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

function createArray() {
  const felder = [];
  felder[0] = document.getElementById("1cell5"); //blaues Startfeld
  felder[1] = document.getElementById("2cell5");
  felder[2] = document.getElementById("3cell5");
  felder[3] = document.getElementById("4cell5");
  felder[4] = document.getElementById("5cell5");
  felder[5] = document.getElementById("5cell4");
  felder[6] = document.getElementById("5cell3");
  felder[7] = document.getElementById("5cell2");
  felder[8] = document.getElementById("5cell1");
  felder[9] = document.getElementById("6cell1");
  felder[10] = document.getElementById("7cell1"); //gelbes Startfeld
  felder[11] = document.getElementById("7cell2");
  felder[12] = document.getElementById("7cell3");
  felder[13] = document.getElementById("7cell4");
  felder[14] = document.getElementById("7cell5");
  felder[15] = document.getElementById("8cell5");
  felder[16] = document.getElementById("9cell5");
  felder[17] = document.getElementById("10cell5");
  felder[18] = document.getElementById("11cell5");
  felder[19] = document.getElementById("11cell6");
  felder[20] = document.getElementById("11cell7"); //grünes Startfeld
  felder[21] = document.getElementById("10cell7");
  felder[22] = document.getElementById("9cell7");
  felder[23] = document.getElementById("8cell7");
  felder[24] = document.getElementById("7cell7");
  felder[25] = document.getElementById("7cell8");
  felder[26] = document.getElementById("7cell9");
  felder[27] = document.getElementById("7cell10");
  felder[28] = document.getElementById("7cell11");
  felder[29] = document.getElementById("6cell11");
  felder[30] = document.getElementById("5cell11"); //rotes Startfeld
  felder[31] = document.getElementById("5cell10");
  felder[32] = document.getElementById("5cell9");
  felder[33] = document.getElementById("5cell8");
  felder[34] = document.getElementById("5cell7");
  felder[35] = document.getElementById("4cell7");
  felder[36] = document.getElementById("3cell7");
  felder[37] = document.getElementById("2cell7");
  felder[38] = document.getElementById("1cell7");
  felder[39] = document.getElementById("1cell6");
  return felder;
}

//detect winner
let winner; //Spieler
let winnertext = document.getElementById("winnertext");
winnertext.innerHTML = "Gewinner: Spieler " + winner;
