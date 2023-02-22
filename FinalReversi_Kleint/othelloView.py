class othelloView:
    def display_board(self, board):
        print(board)

    def get_move(self):
        while True:
            try:
                move = input("Enter row and column (e.g. 3 4): ")
                row, col = map(int, move.split())
                return row, col
            except:
                print("Invalid input")

    def display_winner(self, winner):
        if winner == 1:
            print("Black wins!")
        elif winner == 2:
            print("White wins!")
        elif winner == 3:
            print("It's a tie!")
        else:
            print("Error: Invalid winner")


