import copy

class Prototype():
    def __init__(self):
        pass
    def complete_copy(self, model):
        return copy.deepcopy(model)