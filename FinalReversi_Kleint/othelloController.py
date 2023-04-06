#html and client-server files
#


import othelloGame
import othelloView
import ai
import numpy as np
import settings
import database
import player
import database_data
import time

class othelloController:
    #instantiates the model and view
    def __init__(self, size, p1, p2, view, clr):
        self.players = [p1, p2]
        self.color = clr
        self.model =  othelloGame.othelloGame(size, clr)
        self.view = view
        self.database = database.Database()
        self.gameData = database_data.game_data()
        self.gameData.size = size
        self.board_state_data = database_data.board_state_moves_data()
        self.board_state_data.player_turn = clr

    #plays the game. No actual logic here
    def play_game(self):
        player_noMoves = False
        #self.gameData.start_time = time.time()
        #self.gameData.game_type = "local"
        self.database.create_game_table(self.gameData.size)
        while True:
            for player in self.players:
                player.update_model(self.model)
            self.board_state_data.player_turn = self.model.curr_player
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
            row, col = self.players[self.model.curr_player-1].get_move()
            if (row, col) not in valid_moves:
                print("Invalid move")
                continue
            self.model.make_move(row, col)
            self.board_state_data.board_state_order = self.model.board.count_pieces()
            self.model.change_player()

        #find/displays winner
        winner = self.model.get_winner()
        self.view.display_board(self.model.board)
        self.gameData.white_score = self.model.board.W_num
        self.gameData.black_score = self.model.board.B_num
        self.gameData.end_time = time.time()
        self.gameData.winner = winner
        self.view.display_winner(winner)


if __name__ == "__main__":
    stgs = settings.Settings()
    view = othelloView.othelloView()
    username = view.login_screen()
    player1 = player.Player(username, view)
    player2 = None

    #adjust settings
    while True:
        stgs.read()
        option = othelloView.othelloView().display_settings()
        if option == "4":
            break
        else:
            othelloView.othelloView().settings_options(option)
            stgs.save()

    while(True):
        gameType = input("Type 'local' for local game or 'cpu' for AI controlled opponent : \n")

        if(gameType == "local"):
            player2 = player.Player('guest', view)
            break
        elif(gameType == "cpu"):
            diff = stgs.get_difficulty()
            player2 = ai.AI("COMPUTER", diff)
            break
        else:
            print("Not a valid option")

    size = stgs.get_size()
    color = stgs.get_player()
    controller = othelloController(size, player1, player2, view, color)
    controller.play_game()