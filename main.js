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
newgame.addEventListener("click", () => {   //einfügen und färben der Spielfelder
  //gameboardCSS.appendChild(createCell(2,2));
  createGamefield();
  const array=createArray();
  console.log(array[1].id);
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
function createCell(row,column){
      let cell = document.createElement("div");
      cell.style.borderRadius= "50%";
      cell.style.gridRow=row;
      cell.style.gridColumn=column;
      cell.style.borderColor="black";
      cell.style.borderWidth="1px";
      cell.style.borderStyle="solid";
      cell.style.backgroundColor="lightgrey";
      cell.id=column+"cell"+row; //zuerst die X-Achse dann die Y-Achse
      console.log(cell.id);
      return cell;
}
function createGamefield(){
  
   for (let y=1; y<12;y++){ //column bzw Spalte |
      for (let x=1;x<12;x++){ //row bzw Zeile ------
          if(y==1 || y==2 || y==10 || y==11){
            if(x==1 || x==2 || x==5 || x==6 || x==7 || x==10 || x==11){
              gameboardCSS.appendChild(createCell(x,y));
            }
          }
          if(y==4 || y==3 || y==8 || y==9){
            if(x==5 || x==6 || x==7){
              gameboardCSS.appendChild(createCell(x,y));
            }
          }
          if(y==5 || y==6 || y==7){
            if(y==6 && x==6){
                //laesst exakt die Mitte aus by doing nothin
            } else {
              gameboardCSS.appendChild(createCell(x,y));
            }
          }

      }
   }
   document.getElementById("1cell1").style.backgroundColor="blue";
   document.getElementById("1cell2").style.backgroundColor="blue";
   document.getElementById("2cell1").style.backgroundColor="blue";
   document.getElementById("2cell2").style.backgroundColor="blue";
   document.getElementById("5cell1").style.backgroundColor="blue";
   for(let i=2;i<6;i++){
    document.getElementById("6cell"+i).style.backgroundColor="#6495ed"; //Corn Flower Blue
   }
   document.getElementById("10cell1").style.backgroundColor="yellow";
   document.getElementById("11cell2").style.backgroundColor="yellow";
   document.getElementById("10cell2").style.backgroundColor="yellow";
   document.getElementById("11cell1").style.backgroundColor="yellow";
   document.getElementById("11cell5").style.backgroundColor="yellow";
   for(let i=7;i<11;i++){
    document.getElementById(i+"cell6").style.backgroundColor="#fcf75e"; //Icetrine
   }
   document.getElementById("1cell10").style.backgroundColor="red";
   document.getElementById("2cell10").style.backgroundColor="red";
   document.getElementById("1cell11").style.backgroundColor="red";
   document.getElementById("2cell11").style.backgroundColor="red";
   document.getElementById("1cell7").style.backgroundColor="red";
   for(let i=2;i<6;i++){
    document.getElementById(i+"cell6").style.backgroundColor="#fa8072"; //Tomato
   }
   document.getElementById("10cell10").style.backgroundColor="green";
   document.getElementById("11cell10").style.backgroundColor="green";
   document.getElementById("10cell11").style.backgroundColor="green";
   document.getElementById("11cell11").style.backgroundColor="green";
   document.getElementById("7cell11").style.backgroundColor="green";
   for(let i=7;i<11;i++){
    document.getElementById("6cell"+i).style.backgroundColor="#90ee90"; //Lightgreen
   }
}
function createArray(){
  const felder =[];
  felder[0]=document.getElementById("5cell1");
  felder[1]=document.getElementById("6cell1");
  return felder;
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