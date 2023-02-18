#This class will define the main game loop that will use the Game and ConsoleView classes to run the game
from game import Game
from consoleView import ConsoleView

class GameController:
    def __init__(self, game, view):
        self.game = Game()
        self.view = ConsoleView(self.game)
    
    def play_game(self):
        self.view.displayBoard(self.game.board)

