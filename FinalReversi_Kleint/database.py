from __future__ import division
from getpass import getpass
import psycopg2
import textwrap

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

            self.cursor = self.conn.cursor()
        except:
            pass

    def setup(self):
        setup_text = '''CREATE TABLE IF NOT EXISTS player (
                        id SERIAL PRIMARY KEY, 
                        username VARCHAR(100) NOT NULL UNIQUE, 
                        password VARCHAR(100) NOT NULL, 
                        ELO INT 
                        ); 

                        CREATE TABLE IF NOT EXISTS game (
                        gid SERIAL PRIMARY KEY,
                        timestamp_start TIMESTAMP,
                        timestamp_end TIMESTAMP,
                        final_score INT DEFAULT NULL,
                        winner_ID INT REFERENCES player(id),
                        size_val INT
                        );

                        CREATE TABLE IF NOT EXISTS player_game (
                        playerID INT REFERENCES player(id),
                        gameID INT REFERENCES game(gid),
                        player_color VARCHAR(100),
                        PRIMARY KEY(playerID, gameID)
                        );

                        CREATE TABLE IF NOT EXISTS board_states (
                        sid SERIAL PRIMARY KEY,
                        gid INT REFERENCES game(gid),
                        move_num INT,
                        board_state VARCHAR(1000),
                        player_color_turn VARCHAR(100)
                        );'''
        self.cursor.execute(setup_text)
        self.conn.commit()


    def verify_username_password(self, username, password):
        verify_text = "SELECT player.username, player.password FROM player WHERE player.username=%s AND player.password=%s"
        self.cursor.execute(verify_text, (username, password))
        result = self.cursor.fetchall()

        if self.cursor.rowcount != 0:
            return True
        else:
            return False
        
    def verify_username(self, username):
        verify_text = "SELECT * FROM player WHERE player.username=%s"
        self.cursor.execute(verify_text, username)
        result = self.cursor.fetchall()

        if self.cursor.rowcount == 0:
            return True
        else:
            return False

    def insert_new_player(self, username, password):
        insert_text = "INSERT INTO player (username, password, elo) VALUES (%s, %s, %s);"
        self.cursor.execute(insert_text, (username, password, 1500))
        self.conn.commit()

    def update_elo(self, player_id, new_elo):
        update_text = "UPDATE player SET elo = %s WHERE id = %s;"
        self.cursor.execute(update_text, (new_elo, player_id))
        self.conn.commit()

    def get_all_players(self):
        select_text = "SELECT * FROM player;"
        self.cursor.execute(select_text)
        return self.cursor.fetchall()

    def get_player_by_id(self, player_id):
        select_text = "SELECT * FROM player WHERE id = %s;"
        self.cursor.execute(select_text, (player_id,))
        return self.cursor.fetchone()

    def close(self):
        self.cursor.close()
        self.conn.close()

    def expected(self, A, B):
        return 1 / (1 + 10 ** ((B - A) / 400))

    def elo(self, old_score, expected, actual_score, k_factor):
        return old_score + k_factor * (actual_score - expected)
