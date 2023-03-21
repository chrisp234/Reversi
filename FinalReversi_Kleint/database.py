from __future__ import division
from getpass import getpass
import psycopg2

class Database():
    def __init__(self):
        try:
            self.conn = psycopg2.connect(
                database='othello',
                host='localhost',
                user='postgres',
                password='postgres',
                port = 5432
            )

            cursor = self.conn.cursor()
        except:
            pass
            
    def setup(self):
        #run the set-up table stuff
        pass


    def verify_username_password(self, username, password):
        cursor = self.conn.cursor()
        #cursor.execute("select username, password from player where username==%s and password ==%s" (username, password))
        if cursor.fetchall:
            return True
        else:
            return False

    def verify_password(self):
        pass

    def insert_newPlayer(self):
        cursor = self.conn.cursor()
        cursor.execute("insert into player values(00003, 'bob, 'password123', 1500);")
        self.conn.commit()

    def execute(self):
        cursor = self.conn.cursor()
        cursor.execute("insert into player values(00002, 'joe', 'password123', 504);")
        self.conn.commit()
        print(cursor.execute("Select * From Player" ))

    def close(self):
        self.conn.close()

    #expect score of A in a match against B
    def expected(self, A, B):
        return 1 / (1 + 10 ** ((B - A) / 400))

    #calculate new ELO rating for player A
    def elo(self, old_score, expected, actual_score, k_factor):
        return old_score + k_factor * (actual_score - expected)


'''

---------------------------
-- Create the tables
---------------------------

CREATE TABLE IF NOT EXISTS player (
id int PRIMARY KEY, 
username varchar(100) default NULL, 
password varchar(100) default NULL, 
ELO int 
); 

CREATE TABLE IF NOT EXISTS game (
  gid int PRIMARY KEY,
  timestamp_start varchar(100),
  timestamp_end varchar(100),
  final_score int default NULL,
  winner_ID int,
  size_val int
);

CREATE TABLE IF NOT EXISTS player_game (
  playerID int REFERENCES player(id),
  gameID int REFERENCES game(gid),
  player_color varchar(100),
  PRIMARY KEY(playerID, gameID)
);


CREATE TABLE IF NOT EXISTS board_states (
  sid int PRIMARY KEY,
  gid int REFERENCES game(gid),
  move_num varchar(100),
  board_state varchar(1000),
  player_color_turn varchar(100)
);
'''