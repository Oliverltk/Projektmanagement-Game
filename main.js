import "https://unpkg.com/@material/web@1.0.0-pre.13/switch/switch.js?module";
window.addEventListener("DOMContentLoaded", () => {
  const startnumber = document.getElementById("start-number");
  for (let i = 1; i < 7; i++) {
    let number = document.createElement("option");
    number.innerHTML = i;
    startnumber.appendChild(number);
  }
});
const newgame = document.getElementById("new");
newgame.addEventListener("click", () => {
  document.querySelector(".new-game").classList.remove("invisible");
  document.querySelector(".main-menu").classList.add("invisible");
  history.pushState({ page: "new-game" }, "");
});
window.addEventListener("popstate", (event) => {
  console.log(event.state);
  if (!event.state) {
    document.querySelector(".new-game").classList.add("invisible");
    document.querySelector(".main-menu").classList.remove("invisible");
  } else if (event.state.page === "new-game") {
    document.querySelector(".new-game").classList.remove("invisible");
    document.querySelector(".main-menu").classList.add("invisible");
  }
});
