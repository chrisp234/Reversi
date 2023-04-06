from abc import ABC, abstractmethod
class State(ABC):
    def __init__(self, account):
        self.account = account

    @abstractmethod
    def deposit(self, amount):
        pass

    @abstractmethod
    def withdraw(self, amount):
        pass
    
    @abstractmethod
    def pay_interest(self):
        pass