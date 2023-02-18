#This class will define the game logic and state variables

class Game:
    def __init__(self):
        # Initialize game state variables
        self.board = [['' for _ in range(8)] for _ in range(8)]
        self.board[3][3], self.board[4][4] = 'O', 'O'
        self.board[3][4], self.board[4][3] = 'X', 'X'
        self.currentPlayer = 'X'
    
    def updateState(self, move):
        x, y = move
        self.board[y][x] = self.currentPlayer
        self.flipDiscs(move)
        self.currentPlayer = 'O' if self.currentPlayer == 'X' else 'X'
    
    def isValidMove(self, move):
        # Check if move is valid
        x, y = move
        if self.board[y][x] != ' ':
            return False
        for dx, dy in [(0,1), (1,0), (0,-1), (-1,0), (1,1), (1,-1), (-1,1), (-1,-1)]:
            n_x, n_y = x + dx, y + dy
            if not (0 <= n_x < 8 and 0 <= n_y < 8):
                continue
            if self.board[n_y][n_x] == self.currentPlayer:
                continue
            while self.board[n_y][n_x] != ' ':
                n_x, n_y = n_x + dx, n_y + dy
                if not (0 <= n_x < 8 and 0 <= n_y < 8):
                    break
                if self.board[n_y][n_x] == self.currentPlayer:
                    return True
        return False

    def flipDiscs(self, move):
        x, y = move
        for dx, dy in [(0,1), (1,0), (0,-1), (-1,0), (1,1), (1,-1), (-1,1), (-1,-1)]:
            n_x, n_y = x + dx, y + dy
            if not (0 <= n_x < 8 and 0 <= n_y < 8):
                continue
            if self.board[n_y][n_x] == self.currentPlayer:
                continue
            discs_to_flip = []
            while self.board[n_y][n_x] != ' ':
                discs_to_flip.append((n_x, n_y))
                n_x, n_y = n_x + dx, n_y + dy
                if not (0 <= n_x < 8 and 0 <= n_y < 8):
                    break
                if self.board[n_y][n_x] == self.currentPlayer:
                    for disc in discs_to_flip:
                        self.board[disc[1]][disc[0]] = self.currentPlayer

    def isGameOver(self):
        return not self.getValidMoves()