const Cell = (value) => {
  const getValue = () => value;

  //   const isAvailable = () => value === 0;

  return {
    getValue,
    // isAvailable,
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

  const switchPLayerTurn = () => {
    activePLayer = activePLayer === player1 ? player2 : player1;
  };

  const getActivePlayer = () => activePLayer;

  const playerMoves = (x, y) => {
    if (gameBoard.isCellAvailable(x, y)) {
      gameBoard.updateCellValue(activePLayer, x, y);
      switchPLayerTurn();
    }

    return "cell is not available";
  };

  const getBoard = () => board;

  return {
    getBoard,
    playerMoves,
    getActivePlayer,
  };
})();

const screenController = (() => {
  const playerTurn_div = document.querySelector(".player-turn");
  const board_div = document.querySelector(".board");

  const updateScreen = () => {
    board_div.textContent = "";
    const board = gameBoard.getBoard();

    const activePLayer = gameController.getActivePlayer();

    playerTurn_div.textContent = `Player turn :  ${activePLayer.getName()} - ${activePLayer.getToken()}`;

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

    try {
        gameController.playerMoves(row, column);
    } catch (error) {
        // console.log("error");
    }
    
    updateScreen();
    
  };

  board_div.addEventListener("click", handleClick);

  return {
    updateScreen,
  };
})();

screenController.updateScreen();

// console.log(gameBoard.printBoard());

// // console.log(gameController.getPlayerTurn());

// gameController.playerMoves(0, 0);

// console.log(gameBoard.printBoard());

// gameController.playerMoves(1, 0);

// console.log(gameBoard.printBoard());

// gameController.playerMoves(1, 1);

// console.log(gameBoard.printBoard());

// console.log(gameController.playerMoves(1, 2));

// console.log(gameBoard.printBoard());
