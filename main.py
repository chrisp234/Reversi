import consoleView 
import game 
import gameController 

# Create instances of Model, View and Controller
game = game.Game()
view = consoleView.ConsoleView(game)
controller = gameController.GameController(game, view)

# Start the game
controller.play_game()
