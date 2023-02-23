import cell
import debug

class Board:
    def __init__(self, size):
        self.size = size
        self.grid = [[cell.Cell(0) for j in range(size)] for i in range (size)]
        self.W_num = 2
        self.B_num = 2

    def __str__(self):
        '''
        Board String method

        RETURNS:
            (str): string representation of the board for printing
        '''
        #create the return string with starting whitespace for top row labels
        return_string = '   '

        #add the column labels to the first line of the string
        for i in range(self.size):
            return_string += f'  {i} '
        return_string += '\n'

        i = 0
        for row in self.grid:
            #add a horizontal row of dashes offset slighlty for each row
            return_string += ('   ' + '-' * 4 * self.size + '-\n')

            #print the row label
            if i < 10:
                return_string += f' {i} '
            else:
                return_string += f' {i} '

            i+=1

            #print the value of each piece in the grid if it exists properly spaced with vertical seperation
            for piece in row:
                return_string += '|'
                if(piece):
                    if(f' {piece} ' == ' _ '):
                        return_string += '   '
                    else:
                        return_string += f' {piece} '
                else:
                    return_string += '   '
            return_string += '|\n'
        return_string += ('   ' + '-' * 4 * self.size + '-\n')

        return return_string
    


    def set_cell(self, r, c, player):
        if(r < 0 or r >= self.size or c < 0 or c >=self.size):
            debug.log("ERROR IN GRID: Set Cell out of bounds")
            return -1
        
        self.grid[r][c].set_val(player)

    def get_cell(self, r, c):
        if(r < 0 or r >= self.size or c < 0 or c >=self.size):
            debug.log("ERROR IN GRID: Get Cell out of bounds")
            return -1
        
        return self.grid[r][c].val
    

    def get_size(self):
        return self.size
    
    def count_pieces(self):
        '''
        counts the number of pieces for each player and stores in member O_num and X_num
        '''
        W_num = 0
        B_num = 0

        #loop through all cells and count the number of each player's piece
        for i in range(self.size):
            for j in range(self.size):
                if(self.get_cell(i, j) == 2):
                    W_num += 1
                elif(self.get_cell(i, j) == 1):
                    B_num += 1

        self.W_num = W_num
        self.B_num = B_num

    def get_piece_count(self):
        '''
        returns the a tuple containing the number of pieces for each player
        
        RETURN:
            ((int, int)): tuple containing number of O pieces followed by number of X pieces
        '''
        self.count_pieces()
        return (self.W_num, self.B_num)