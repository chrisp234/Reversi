import numpy as np
import board


class othelloGame:
    def __init__(self, size):
        self.board = board.Board(size)
        middle = int(np.round(size / 2))
        self.board.set_cell(middle - 1, middle - 1, 2)
        self.board.set_cell(middle, middle, 2)
        self.board.set_cell(middle - 1, middle, 1)
        self.board.set_cell(middle, middle - 1, 1)

    def get_board(self):
        return self.board.grid.copy()

    # def change_player(self):
    #     #self.curr_player = 3 - self.curr_player
    #     pass

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

    def get_valid_moves(self, player):
        moves = []
        for row in range(self.board.size):
            for col in range(self.board.size):
                if self.is_valid_move(player, row, col):
                    moves.append((row, col))
        return moves
    

    def make_move(self, player, row, col):
        if not self.is_valid_move(player, row, col):
            raise ValueError("Invalid move")
        if self.board.set_cell(row, col, player) == -1:
            return -1

        other_player = 3 - player
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

                    if cell == player:
                        for flip_row, flip_col in positions_to_flip:
                            if self.board.set_cell(flip_row, flip_col, player) == -1:
                                return -1
                        break

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
        
    
