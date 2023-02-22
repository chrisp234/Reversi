import othelloGame
import othelloView
import numpy as np

class othelloController:
    def __init__(self, size):
        self.model =  othelloGame.othelloGame(size)
        self.view = othelloView.othelloView()

    #move to game class?
    def play_game(self):
        while True:
            self.view.display_board(self.model.board)
            valid_moves = self.model.get_valid_moves()
            print("Valid Moves: " + str(valid_moves))
            if len(valid_moves) == 0:
                break
            print(f"Player {self.model.get_curr_player()}'s turn")
            row, col = self.view.get_move()
            if (row, col) not in valid_moves:
                print("Invalid move")
                continue
            self.model.make_move(row, col)
            self.model.change_player()
        winner = self.model.get_winner()
        self.view.display_board(self.model.board)
        self.view.display_winner(winner)


if __name__ == "__main__":
    size = 4
    controller = othelloController(size)
    controller.play_game()