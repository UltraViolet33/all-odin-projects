"use strict";

let container = document.querySelector("#container");
let setSquares_btn = document.querySelector("#set_squares_btn");

setSquares_btn.addEventListener("click", function () {
  let numberOfSquares = setSquares();
  let grid_container = document.querySelector("#grid_container");
  container.removeChild(grid_container);
  initGrid(numberOfSquares);
});

function setSquares() {
  let newNumberSquares = parseInt(prompt("How many squares do you want ?"));
  if (newNumberSquares > 100) {
    newNumberSquares = 100;
  } else if (newNumberSquares <= 0) {
    newNumberSquares = 1;
  } else if (isNaN(newNumberSquares)) {
    newNumberSquares = 16;
  }
  return newNumberSquares;
}

function initGrid(numberOfSquares) {
  let grid_container = document.createElement("div");
  grid_container.classList.add("grid");
  grid_container.setAttribute("id", "grid_container");

  let squareLength = 500 / numberOfSquares - 2;

  grid_container.style.gridTemplateColumns = `repeat(${numberOfSquares}, ${squareLength}px)`;
  grid_container.style.gridTemplateRows = `repeat(${numberOfSquares}, ${squareLength}px)`;

  for (let i = 0; i < numberOfSquares; i++) {
    for (let j = 0; j < numberOfSquares; j++) {
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

      square.style.background = `rgb(${randomNumber1}, ${randomNumber2}, ${randomNumber3})`;
    });
  }
}

initGrid(20);
