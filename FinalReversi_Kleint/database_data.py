

class game_data:
    def __init__(self):
        self.ID = None
        # self.game_type = ""
        # self.start_time = -1
        # self.end_time = -1
        self.size = 0
        self.winner = ""
        self.white_score = 0
        self.black_score = 0


class board_state_moves_data:
    def __init__(self):
        self.ID = None
        self.gID = None
        self.move_num = 0
        self.board_state_order = ""
        self.player_turn = "0"


class game_player_data:
    def __init__(self):
        self.gid = None
        self.pid = None
        self.color = "0"


class player_data:
    def __init__(self):
        self.ID = None
        self.username = ""
        self.elo = 0
