import player_symbol

class Cell:
    #initializes the value and symbol with each cell
    def __init__(self, val) -> None:

        if(val != 0 or val != 1 or val != 2):
            val = 0
        self.set_val(val)
        self.symbol = " "
        self.set_symbol()

    #returns the symbol in cell
    def __str__(self):
        '''
        String method for the piece

        RETURNS:
            str: the player which owns the piece for printing
        '''
        return self.symbol
    
    #sets the value
    def set_val(self, val):
        self.val = val
        self.set_symbol()

    #sets the symbol
    def set_symbol(self):
        self.symbol = str(player_symbol.PlayerSymbol(self.val).name)

    #changes the cell value
    def flip_cell(self):
        if self.val == 1:
            self.set_val(2)
        elif self.val == 2:
            self.set_val(1)
        else:
            self.set_val(0)
