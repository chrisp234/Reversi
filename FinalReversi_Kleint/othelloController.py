import othelloGame
import othelloView
import copy
import ai
import numpy as np
import settings


class othelloController:
    #instantiates the model and view
    def __init__(self, size, player):
        self.model =  othelloGame.othelloGame(size, player)
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

    #plays the game. No actual logic here
    def play_game(self):
        player_noMoves = False
        gameType = input("Type 'local' for local game or 'cpu' for AI controlled opponent : \n")
        if gameType == "local":
            while True:
                self.view.display_board(self.model.board)
                valid_moves = self.model.get_valid_moves()
                print("Valid Moves: " + str(valid_moves))
                #if no valid moves for player1-> check if player2 has moves and continue loop
                if len(valid_moves) == 0:
                    if player_noMoves:
                        break
                    self.model.change_player()
                    player_noMoves = True
                    continue
                print(f"Player {self.model.get_curr_player()}'s turn")
                row, col = self.view.get_move()
                if (row, col) not in valid_moves:
                    print("Invalid move")
                    continue
                self.model.make_move(row, col)
                self.model.change_player()
            #find/displays winner
            winner = self.model.get_winner()
            self.view.display_board(self.model.board)
            self.view.display_winner(winner)
        elif gameType == "cpu":
            newAI = ai.AI(self.model.size, self.model.curr_player)
            newAI.cpu_play(self.model, self.view)
        else:
           print("Not a valid option")

if __name__ == "__main__":
    othelloView.othelloView().login_screen()

    #adjust settings
    while True:
        settings.Settings().read()
        option = othelloView.othelloView().display_settings()
        if option == "4":
            break
        else:
            othelloView.othelloView().settings_options(option)
            settings.Settings().save()

    size = settings.Settings().get_size()
    player = settings.Settings().get_player()
    controller = othelloController(size, player)
    controller.play_game()