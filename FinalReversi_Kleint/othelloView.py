import settings
import database

class othelloView:
    def __init__(self):
        self.database = database.Database()

    def display_board(self, board):
        print(board)

    def login_screen(self):
        value = input("(1) Login, (2) Create Account, (3) Guest Login")
        if value == "1":
            try:
                # self.database.execute()
                # self.database.close()
                username = input("Enter usernameeeee: ")
                password = input("Enter passworddddddd:")
                if self.database.verify_username_password(username, password):
                    print('VALID INPUT. LOGGED IN')
                else:
                    raise TypeError('No existing username')

                #return playerID?? variable in self?


                #verify if username exists
            except:
                print("Invalid Login")
        if value == "2":
            try:
                username = input("Enter desired username: ")
                #verify its not taken
                password = input("Enter password:")
                #verify valid password
                #self.database.insert_newPlayer()
            except:
                print("Invalid Entry")
        if value == "3":
            return 1

    def display_settings(self):
        while True:
            try:
                option = input("What setting do you wish to adjust?\n(1) Size of Board\n(2) Player Color\n(3) CPU difficulty\n(4) Exit\n")
                return option
            except:
                print("Invalid input")

    def settings_options(self, option):
        if option == "1":
            size = input("What size?\n")
            settings.Settings.update_size(settings.Settings.getself, size)
            settings.Settings.save(settings.Settings.getself)
        elif option == "2":
            color = input("What color?\n")
            settings.Settings.update_color(settings.Settings.getself, color)
            settings.Settings.save(settings.Settings.getself)
        elif option == "3":
            CPU = input("What difficulty?\n")
            settings.Settings.update_CPU(settings.Settings.getself, CPU)
            settings.Settings.save(settings.Settings.getself)
        elif option == "4":
            return
            #quit



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


