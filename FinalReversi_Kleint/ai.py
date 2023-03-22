import othelloGame
import othelloView
import copy
import numpy as np

class AI:
    def __init__(self, size, player):
        self.model = othelloGame.othelloGame(size, player)
        self.view = othelloView.othelloView()

    def minmax(self, model, depth, alpha=-np.inf, beta=np.inf):
        if depth == 0 or self.model.get_valid_moves() == 0:
            return None, 0

        valid_moves = self.model.get_valid_moves()

        if self.model.get_curr_player() == 2:
            best_score = np.inf
            best_move = None
            for move in valid_moves:
                model_copy = copy.deepcopy(self.model)
                model_copy.make_move(move[0], move[1])
                _, score = self.minmax(model_copy, depth-1, alpha, beta)
                if score < best_score:
                    best_score = score
                    best_move = move
                beta = min(beta, score)
                if alpha >= beta:
                    break
        else:
            best_score = -np.inf
            best_move = None
            for move in valid_moves:
                model_copy = copy.deepcopy(self.model)
                model_copy.make_move(move[0], move[1])
                _, score = self.minmax(model_copy, depth-1, alpha, beta)
                if score > best_score:
                    best_score = score
                    best_move = move
                alpha = max(alpha, score)
                if alpha >= beta:
                    break
        return best_move
    
    def cpu_play(self, model, view):
        while True:
            self.view.display_board(self.model.board)
            valid_moves = self.model.get_valid_moves()
            print("Valid Moves: " + str(valid_moves))
            if len(valid_moves) == 0:
                self.model.change_player()
                valid_moves = self.model.get_valid_moves()
            if len(valid_moves) == 0:
                break
            if self.model.get_curr_player() == 1:
                print(f"Player {self.model.get_curr_player()}'s turn")
                row, col = self.view.get_move()
                if (row, col) not in valid_moves:
                    print("Invalid move")
                    continue
                self.model.make_move(row, col)
            else:
                print(f"CPU's turn")
                row, col = self.minmax(self.model, 3)
                self.model.make_move(row, col)
            self.model.change_player()
        winner = self.model.get_winner()
        self.view.display_board(self.model.board)
        self.view.display_winner(winner)