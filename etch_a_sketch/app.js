"use strict";
let container = document.querySelector("#container");
initGrid();
function initGrid() {
  let grid_container = document.createElement("div");
  grid_container.classList.add("grid");
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
      let square = document.createElement("div");
      square.classList.add("square");
      grid_container.appendChild(square);
    }
  }
  container.appendChild(grid_container);
  let squaresNodeList = document.querySelectorAll(".square");
  let squares = Array.from(squaresNodeList);
  for (const square of squares) {
    square.addEventListener("mouseover", function () {
      let randomNumber1 = Math.floor(Math.random() * 300);
      let randomNumber2 = Math.floor(Math.random() * 300);
      let randomNumber3 = Math.floor(Math.random() * 300);

      console.log(randomNumber1);

      square.style.background = `rgb(${randomNumber1}, ${randomNumber2}, ${randomNumber3})`;
    });
  }
}
