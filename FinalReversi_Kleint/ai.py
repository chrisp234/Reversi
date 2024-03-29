import numpy as np
import superPlayer
import prototype

class AI(superPlayer.SuperPlayer):
    def __init__(self, name, difficulty):
        superPlayer.SuperPlayer.__init__(self, name)
        self.prototype = prototype.Prototype()
        self.difficulty = difficulty
        if(self.difficulty == "easy"):
            self.depth = 1
        elif(self.difficulty == "medium"):
            self.depth = 3
        elif(self.difficulty == "hard"):
            self.depth = 6
        #self.model = othelloGame.othelloGame(size, player)
        #self.view = othelloView.othelloView()

    def minmax(self, model, depth, alpha=-np.inf, beta=np.inf):
        if depth == 0 or self.model.get_valid_moves() == 0:
            return None, 0

        valid_moves = self.model.get_valid_moves()

        if self.model.get_curr_player() == 2:
            best_score = np.inf
            best_move = None
            for move in valid_moves:
                model_copy = self.prototype.complete_copy(self.model)
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
                model_copy = self.prototype.complete_copy(self.model)
                model_copy.make_move(move[0], move[1])
                _, score = self.minmax(model_copy, depth-1, alpha, beta)
                if score > best_score:
                    best_score = score
                    best_move = move
                alpha = max(alpha, score)
                if alpha >= beta:
                    break
        return best_move
    
    def update_model(self, mdl):
        self.model = mdl

    def get_move(self):
        return self.minmax(self.model, self.depth)
    

    # def cpu_play(self, model, view):
    #     while True:
    #         self.view.display_board(self.model.board)
    #         valid_moves = self.model.get_valid_moves()
    #         print("Valid Moves: " + str(valid_moves))
    #         if len(valid_moves) == 0:
    #             self.model.change_player()
    #             valid_moves = self.model.get_valid_moves()
    #         if len(valid_moves) == 0:
    #             break
    #         if self.model.get_curr_player() == 1:
    #             print(f"Player {self.model.get_curr_player()}'s turn")
    #             row, col = self.view.get_move()
    #             if (row, col) not in valid_moves:
    #                 print("Invalid move")
    #                 continue
    #             self.model.make_move(row, col)
    #         else:
    #             print(f"CPU's turn")
    #             difficulty = settings.Settings().get_difficulty()
    #             if(difficulty == "easy"):
    #                 row, col = self.minmax(self.model, 1)
    #             elif(difficulty == "medium"):
    #                 row, col = self.minmax(self.model, 3)
    #             elif(difficulty == "hard"):
    #                 row, col = self.minmax(self.model, 6)
    #             self.model.make_move(row, col)
                
    #         self.model.change_player()
    #     winner = self.model.get_winner()
    #     self.view.display_board(self.model.board)
    #     self.view.display_winner(winner)