const btn_user_choice = document.querySelectorAll("button");
const player_choice_div = document.querySelector("#player-choice");
const computer_choice_div = document.querySelector("#computer-choice");
const result_div = document.querySelector("#result");
const score_player_element = document.querySelector("#score-player");
const score_computer_element = document.querySelector("#score-computer");
const winner_element = document.querySelector("#winner");

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * choices.length)];
}

function playRound(playerSelection, computerSelection) {
  const paper = {
    name: "paper",
    win: "rock",
    lose: "scissors",
  };

  const rock = {
    name: "rock",
    win: "scissors",
    lose: "paper",
  };

  const scissors = {
    name: "scissors",
    win: "paper",
    lose: "rock",
  };

  const rules = [rock, paper, scissors];

  playerSelection = playerSelection.toLowerCase();
  computerSelection = computerSelection.toLowerCase();

  if (playerSelection == computerSelection) {
    return "no winner !";
  }

  for (const rule of rules) {
    if (playerSelection == rule.name) {
      if (computerSelection == rule.win) {
        console.log(computerSelection);
        console.log(`You win ${playerSelection} beats ${computerSelection}`);
        return "player";
      }
      console.log(`You lose ${computerSelection} beats ${playerSelection}`);
      return "computer";
    }
  }
}

function game() {
  let scoreComputer = 0;
  let scorePlayer = 0;

  btn_user_choice.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      winner_element.textContent = "";
      let playerSelection = e.target.id;

      player_choice_div.textContent = `Player chose ${playerSelection}`;
      const computerSelection = getComputerChoice();
      computer_choice_div.textContent = `Computer chose ${computerSelection}`;

      let winner = playRound(playerSelection, computerSelection);

      result_div.textContent = `Winner for this turn is ${winner}`;

      if (winner == "player") {
        scorePlayer++;
      } else if (winner == "computer") {
        scoreComputer++;
      } else {
      }
      score_player_element.textContent = scorePlayer;
      score_computer_element.textContent = scoreComputer;

      if (scorePlayer === 5 || scoreComputer === 5) {
        winner = scoreComputer > scorePlayer ? "computer" : "player";
        if (scoreComputer > scorePlayer) {
          winner = "Computer";
          winner_element.style.color = "red";
          winner_element.textContent = `You lose !`;
        } else if (scoreComputer < scorePlayer) {
          winner = "Player";
          winner_element.style.color = "green";
          winner_element.textContent = `You are the winner !`;
        } else {
          winner = "No winner";
          winner_element.textContent = `There is no winner !`;
        }

        score_player_element.textContent = "";
        score_computer_element.textContent = "";
        scoreComputer = 0;
        scorePlayer = 0;
      }
    });
  });
}

game();
