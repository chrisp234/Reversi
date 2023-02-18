#This class will define the methods to display the game board, get player moves from the console, and display the winner or tie message
from game import Game

class ConsoleView:
    def __init__(self, game):
        self.game = Game()

    
    def displayBoard(self, board):
        print('  0 1 2 3 4 5 6 7')
        for i in range(8):
            row = '{} '.format(i)
            for j in range(8):
                row += '{} '.format(self.game.board[i][j])
            print(row)
        print()

    def getValidMoves(self):
        moves = []
        for y in range(8):
            for x in range(8):
                if self.game.isValidMove((x, y)):
                    moves.append((x, y))
        return moves

    def displayValidMoves(self, moves):
        # Display valid moves for current player
        moves = self.getValidMoves()
        if moves:
            print('Valid moves:', end=' ')
            for move in moves:
                print('({}, {})'.format(move[0], move[1]), end=' ')
            print()
        else:
            print('No valid moves. Skipping turn.')
    
    def getMove(self):
        # Get player move
        while True:
            try:
                move = input('Enter move (e.g. "3 4"): ')
                x, y = move.split()
                x, y = int(x), int(y)
                if not (0 <= x < 8 and 0 <= y < 8):
                    raise ValueError
                if not self.game.isValidMove((x, y)):
                    print('Invalid move. Try again.')
                    continue
                return (x, y)
            except ValueError:
                print('Invalid input. Try again.')
    
    def display_winner(self):
        # Display winner or tie
        xCount = sum(row.count('X') for row in self.game.board)
        oCount = sum(row.count('O') for row in self.game.board)
        if xCount > oCount:
            print('X wins!')
        elif oCount > xCount:
            print('O wins!')
        else:
            print('Tie game.')