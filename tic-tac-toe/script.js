const Cell = (value) => {
  const getValue = () => value;

  return {
    getValue,
  };
};

const gameBoard = (() => {
  const _board = [];

  const boardValues = {
    X: "X",
    O: "O",
    EMPTY: "0",
  };

  const getBoardValues = (value) => {
    return boardValues[value];
  };

  for (let i = 0; i < 3; i++) {
    _board[i] = [];

    for (let j = 0; j < 3; j++) {
      _board[i][j] = Cell(boardValues.EMPTY);
    }
  }

  const getBoard = () => _board;

  const isCellAvailable = (x, y) => {
    return _board[x][y].getValue() === boardValues.EMPTY;
  };

  const updateCellValue = (player, x, y) => {
    _board[x][y] = Cell(player.getToken());
  };

  const printBoard = () => {
    return _board.map((row) => row.map((cell) => cell.getValue()));
  };

  return {
    getBoard,
    printBoard,
    isCellAvailable,
    updateCellValue,
    getBoardValues,
  };
})();

const Player = (name, token) => {
  const _name = name;
  const _token = token;

  const getName = () => _name;
  const getToken = () => _token;

  return {
    getName,
    getToken,
  };
};

const gameController = (() => {
  const player1 = Player("bob", gameBoard.getBoardValues("X"));
  const player2 = Player("roger", gameBoard.getBoardValues("O"));
  const board = gameBoard.getBoard();

  let activePLayer = player1;
  const getActivePlayer = () => activePLayer;
  const switchPLayerTurn = () => {
    activePLayer = activePLayer === player1 ? player2 : player1;
  };

  let gameResult;
  const setGameResult = (result) => {
    gameResult = result;
  };
  const getGameResult = () => {
    return gameResult;
  };

  let gameOver = false;
  const isGameOver = () => gameOver;
  const setGameOver = () => {
    gameOver = !gameOver;
  };

  const checkIfPlayerWon = (player) => {
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0].getValue() === player.getToken() &&
        board[i][1].getValue() === player.getToken() &&
        board[i][2].getValue() === player.getToken()
      ) {
        return true;
      }
    }

    for (let i = 0; i < 3; i++) {
      if (
        board[0][i].getValue() === player.getToken() &&
        board[1][i].getValue() === player.getToken() &&
        board[2][i].getValue() === player.getToken()
      ) {
        return true;
      }
    }

    if (
      board[0][0].getValue() === player.getToken() &&
      board[1][1].getValue() === player.getToken() &&
      board[2][2].getValue() === player.getToken()
    ) {
      return true;
    }

    if (
      board[0][2].getValue() === player.getToken() &&
      board[1][1].getValue() === player.getToken() &&
      board[2][0].getValue() === player.getToken()
    ) {
      return true;
    }

    return false;
  };

  const stopGame = (winner) => {
    const result = `Player ${winner.getName()} won !!`;

    setGameResult(result);
    setGameOver();
  };

  const playerMoves = (x, y) => {
    if (gameBoard.isCellAvailable(x, y)) {
      gameBoard.updateCellValue(activePLayer, x, y);
      if (checkIfPlayerWon(activePLayer)) {
        stopGame(activePLayer);
      } else {
        switchPLayerTurn();
      }
      return;
    }

    return "cell is not available";
  };

  const getBoard = () => board;

  return {
    getBoard,
    playerMoves,
    getActivePlayer,
    checkIfPlayerWon,
    isGameOver,
    getGameResult,
  };
})();

const screenController = (() => {
  const playerTurn_div = document.querySelector(".player-turn");
  const board_div = document.querySelector(".board");

  const updateScreen = () => {
    board_div.textContent = "";
    const board = gameBoard.getBoard();
    if (gameController.isGameOver()) {
      playerTurn_div.textContent = gameController.getGameResult();
      board_div.removeEventListener("click", handleClick);
    } else {
      const activePLayer = gameController.getActivePlayer();
      playerTurn_div.textContent = `Player turn :  ${activePLayer.getName()} - ${activePLayer.getToken()}`;
    }

    board.forEach((row, indexRow) => {
      row.forEach((cell, indexCol) => {
        const cell_button = document.createElement("button");
        cell_button.dataset.column = indexCol;
        cell_button.dataset.row = indexRow;
        cell_button.classList.add("cell");
        cell_button.textContent = cell.getValue();
        board_div.appendChild(cell_button);
      });
    });
  };

  const handleClick = (e) => {
    const column = e.target.dataset.column;
    const row = e.target.dataset.row;
    gameController.playerMoves(row, column);
    updateScreen();
  };

  board_div.addEventListener("click", handleClick);

  return {
    updateScreen,
  };
})();

screenController.updateScreen();
