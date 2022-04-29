const blocks = Array.from(document.querySelectorAll('.block'));
const resetButton = document.getElementById('resetButton');

let board = ['','','','','','','','',''];
let currentPlayer = 'X';
let isGameActive = true;


// 
class Results {
   constructor(X,O,tie) {
      this.xWin = X;
      this.oWin = O;
      this.tie = tie;
   }
}

// Array of basic winning solutions
const winningConditions = [
   [0,1,2],
   [3,4,5],
   [6,7,8],
   [0,3,6],
   [1,4,7],
   [2,5,8],
   [0,4,8],
   [2,4,6]
];

// this function validates whether or not a move can be made to a given square
const isValidAction = (block) => {
   if( block.innerText === 'X' || block.innerText === 'O' ) {
      return false;
   } else {
      return true;
   }
};


// function receives index and changes corresponding element to the sign of our current player
const updateBoard = (index) => {
   board[index] = currentPlayer;
}


// this function switches turns between players
const changePlayer = () => {
   playerDisplay.classList.remove(`player${currentPlayer}`);
   currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
   playerDisplay.innerText = currentPlayer;
   playerDisplay.classList.add(`player${currentPlayer}`);
}