 document.addEventListener('DOMContentLoaded', () => {
      const board = document.querySelector('.grid');
      const currentTurnDisplay = document.getElementById('currentTurn');
      const gameStatus = document.getElementById('gameStatus');
      const resetBtn = document.getElementById('resetBtn');
      const scoreX = document.getElementById('scoreX');
      const scoreO = document.getElementById('scoreO');
      
      let boardState = ['', '', '', '', '', '', '', '', ''];
      let currentPlayer = 'X';
      let gameActive = true;
      let scores = { X: 0, O: 0 };
      
      // Create board cells
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add(
          'cell', 
          'w-full', 
          'h-20', 
          'bg-white', 
          'rounded', 
          'flex', 
          'items-center', 
          'justify-center', 
          'text-4xl', 
          'font-light', 
          'cursor-pointer',
          'transition',
          'duration-200'
        );
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
      }
      
      function handleCellClick(e) {
        const cellIndex = parseInt(e.target.getAttribute('data-index'));
        
        if (boardState[cellIndex] !== '' || !gameActive) {
          return;
        }
        
        boardState[cellIndex] = currentPlayer;
        e.target.textContent = currentPlayer;
        e.target.classList.add('marked');
        
        if (checkWinner()) {
          gameStatus.textContent = `Player ${currentPlayer} wins!`;
          scores[currentPlayer]++;
          updateScores();
          gameActive = false;
          highlightWinningCells();
          return;
        }
        
        if (isDraw()) {
          gameStatus.textContent = "Game ended in a draw!";
          gameActive = false;
          return;
        }
        
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        currentTurnDisplay.textContent = currentPlayer;
      }
      
      function checkWinner() {
        const winPatterns = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
          [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
          [0, 4, 8], [2, 4, 6]             // diagonals
        ];
        
        return winPatterns.some(pattern => {
          if (
            boardState[pattern[0]] !== '' &&
            boardState[pattern[0]] === boardState[pattern[1]] &&
            boardState[pattern[1]] === boardState[pattern[2]]
          ) {
            return true;
          }
          return false;
        });
      }
      
      function isDraw() {
        return boardState.every(cell => cell !== '');
      }
      
      function highlightWinningCells() {
        const winPatterns = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
          [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
          [0, 4, 8], [2, 4, 6]             // diagonals
        ];
        
        for (const pattern of winPatterns) {
          const [a, b, c] = pattern;
          if (
            boardState[a] !== '' &&
            boardState[a] === boardState[b] &&
            boardState[b] === boardState[c]
          ) {
            const cells = document.querySelectorAll('.cell');
            cells[a].classList.add('winner');
            cells[b].classList.add('winner');
            cells[c].classList.add('winner');
            break;
          }
        }
      }
      
      function updateScores() {
        scoreX.textContent = scores.X;
        scoreO.textContent = scores.O;
      }
      
      function resetGame() {
        boardState = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        
        currentTurnDisplay.textContent = currentPlayer;
        gameStatus.textContent = '';
        
        document.querySelectorAll('.cell').forEach(cell => {
          cell.textContent = '';
          cell.classList.remove('marked', 'winner');
        });
      }
      
      resetBtn.addEventListener('click', resetGame);
    });