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
