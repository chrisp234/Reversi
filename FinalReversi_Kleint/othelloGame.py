import numpy as np
import board
import player
import copy

class othelloGame:
    #initializes board and player
    def __init__(self, size, clr):
        self.board = board.Board(size)
        self.size = size
        self.curr_player = int(clr)
        middle = int(np.round(size / 2))
        self.board.set_cell(middle - 1, middle - 1, 2)
        self.board.set_cell(middle, middle, 2)
        self.board.set_cell(middle - 1, middle, 1)
        self.board.set_cell(middle, middle - 1, 1)

    #returns current player
    def get_curr_player(self):
        return self.curr_player

    #returns a copy of the grid
    def get_board(self):
        return self.board.grid.copy()

    #adjusts the current player to the other
    def change_player(self):
        self.curr_player = 3 - self.curr_player
        pass

    #determines if a move is valid or now -- returns True or False
    def is_valid_move(self, player, row, col):
        cell = self.board.get_cell(row, col)
        if cell != 0:
            return False
        other_player = 3 - player

        #Loop through surrounding cells of a cell
        for dr in [-1, 0, 1]:
            for dc in [-1, 0, 1]:
                #skip middle one cause its one we checking
                if dr == 0 and dc == 0:
                    continue

                r, c = row + dr, col + dc
                neighbor_cell = self.board.get_cell(r, c)
                if neighbor_cell != other_player:
                    continue

                while True:
                    r += dr
                    c += dc
                    neighbor_cell = self.board.get_cell(r, c)
                    if neighbor_cell == -1 or neighbor_cell == 0:
                        break

                    if self.board.get_cell(r, c) == player:
                        return True
                    
        return False

    #returns an array of all valid possible moves
    def get_valid_moves(self):
        moves = []
        for row in range(self.board.size):
            for col in range(self.board.size):
                if self.is_valid_move(self.curr_player, row, col):
                    moves.append((row, col))
        return moves
    
    #function involved in making a move and flipping necessary pieces
    def make_move(self, row, col):
        
        if not self.is_valid_move(self.curr_player, row, col):
            raise ValueError("Invalid move")
        if self.board.set_cell(row, col, self.curr_player) == -1:
            return -1

        other_player = 3 - self.curr_player

        #loops in all directions around each cell
        for dr in [-1, 0, 1]:
            for dc in [-1, 0, 1]:
                if dr == 0 and dc == 0:
                    continue
                r, c = row + dr, col + dc

                cell = self.board.get_cell(r, c)
                if cell != other_player:
                    continue

                positions_to_flip = []
                while True:
                    positions_to_flip.append((r, c))
                    r += dr
                    c += dc

                    cell = self.board.get_cell(r, c)
                    if cell == 0 or cell == -1:
                        break

                    if cell == self.curr_player:
                        for flip_row, flip_col in positions_to_flip:
                            if self.board.set_cell(flip_row, flip_col, self.curr_player) == -1:
                                return -1
                        break

    #returns the value associated with the winner -- 2 (white wins), 1 (black wins), 3 (tie)
    def get_winner(self):
        W_num, B_num = self.board.get_piece_count()
        if(W_num > B_num):
            return 2
        elif(W_num < B_num):
            return 1
        elif(W_num == B_num):
            return 3
        else:
            return -1
        
    #returns a copy of the game state, which can be used by the AI class to calculate moves
    def clone(self):
        return copy.deepcopy(self)
    
