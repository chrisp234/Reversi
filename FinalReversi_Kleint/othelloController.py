import othelloGame
import othelloView
import numpy as np

class othelloController:
    #instantiates the model and view
    def __init__(self, size):
        self.model =  othelloGame.othelloGame(size)
        self.view = othelloView.othelloView()

    #plays the game. No actual logic here
    def play_game(self):
        player_noMoves = False
        gameType = input("Type 'local' for local game or 'cpu' for AI controlled opponent")
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
            exit
        else:
           print("Not a valid option")



if __name__ == "__main__":
    size = 8
    controller = othelloController(size)
    controller.play_game()
