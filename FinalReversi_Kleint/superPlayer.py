from abc import ABC, abstractmethod

class SuperPlayer:
    
    def __init__(self, user):
        self.username = user
        
    @abstractmethod
    def update_model(self, mdl):
        pass

    @abstractmethod
    def get_move(self):
        pass 



