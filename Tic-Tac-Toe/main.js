const blocks = Array.from(document.querySelectorAll('.block'));
const resetButton = document.getElementById('resetButton');
const playerDisplay = document.querySelector('.display-player');
const announcer = document.querySelector('.announcer');

let board = ['','','','','','','','',''];
let currentPlayer = 'X';
let isGameActive = true;



// this object represents the potential results of the game
let results = {
   xWin : 'PLAYERX_WON',
   oWin : 'PLAYERO_WON',
   tie : 'TIE',
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

// this function takes the end game type and announces the result in the default hidden announcer section
const announce = (type) => {
   switch(type){
      case results.xWin:
         announcer.innerHTML = 'Player <span class="playerX">X</span> Wins!';
         break;
      case results.oWin:
         announcer.innerHTML = 'Player <span class="playerO">O</span> Wins!';
         break;
      case results.tie:
         announcer.innerHTML = 'It\'s a Tie!';
   }
   announcer.classList.remove('hide');
};

// this function analyzes the spots on the board to evaluate whether or not the conditions for a finished game are met (i.e.X,O,Tie). One they are met, the game cues the announced result function and the game is no longer active
function handleResultValidation() {
   let roundWon =false;
   for (let i =0; i <=7; i++) {
      const winCondition = winningConditions[i];
      const a = board[winCondition[0]];
      const b = board[winCondition[1]];
      const c = board[winCondition[2]];
      if (a=== '' || b === '' || c=== '') {
         continue;
      }
      if (a===b && b===c) {
         roundWon = true;
         break;
      }
   }

   if(roundWon) {
      announce(currentPlayer === 'X' ? results.xWin : results.oWin);
      isGameActive = false;
      return;
   }
   if(!board.includes('')) announce(tie);
}

// this function evaluates user actions on the board and calls the necessary functions to switch turns/finish game
const userAction = (block,index) => {
   if(isValidAction(block) && isGameActive) {
      block.innerText = currentPlayer;
      block.classList.add(`player${currentPlayer}`);
      updateBoard(index);
      handleResultValidation();
      changePlayer();
   }
};

// this function loops through the blocks array and adds eventlisteners to retrieve user input
blocks.forEach( (block,index) => {
   block.addEventListener('click', () => userAction(block,index) );
});


// this function resets game, including the board, inner text, and makes sure X is always the starting player
const resetBoard = () => {
   board = ['','','','','','','','',''];
   isGameActive = true;
   announcer.classList.add('hide');

   if(currentPlayer === 'O') {
      changePlayer();
   }

   blocks.forEach(block => {
      block.innerText = '';
      block.classList.remove('playerX');
      block.classList.remove('playerO');
   });
}


resetButton.addEventListener('click', resetBoard);