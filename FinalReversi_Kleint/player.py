# make AI class
# settings
import superPlayer

class Player(superPlayer.SuperPlayer):
    def __init__(self, user, view):
        superPlayer.SuperPlayer.__init__(self, user)
        self.elo = 1500
        self.view = view

    def get_move(self):
        return self.view.get_move()

    # def getPlayerNum(self):
    #     return self.currPlayer



