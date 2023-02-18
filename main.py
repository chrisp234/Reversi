import consoleView
import game
import gameController

# Create instances of Model, View and Controller
game = Game()
view = ConsoleView()
controller = GameController(game, view)

# Start the game
controller.play_game()