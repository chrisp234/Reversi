import json
import time

class Settings:
    def __init__(self):
        article_info = {
            "size" : "8",
            "color" : "black",
            "CPU difficulty" : "easy"
        }
        self.myJSON = json.dumps(article_info)

    def getself(self):
        return self

    def write_initial(self):
        with open("settings.json", "w") as jsonfile:
            jsonfile.write(self.myJSON)

    #return the info in current json
    def read(self):
        with open("settings.json", "r") as jsonfile:
            data = json.load(jsonfile) # Reading the file
            jsonfile.close()
        return data


    #save the new updated text file
    def save(self):
        with open("settings.json", "r") as jsonfile:
            data = json.load(jsonfile) # Reading the file
            jsonfile.close()
        with open("settings.json", "w") as jsonfile:
            self.myJSON = json.dump(data, jsonfile) # Writing to the file
            jsonfile.close()

           
    #update size
    def update_size(self, size):
        with open("settings.json", "r") as jsonfile:
            data = json.load(jsonfile) # Reading the file
            jsonfile.close()
        data['size'] = size
        with open("settings.json", "w") as jsonfile:
            self.myJSON = json.dump(data, jsonfile) # Writing to the file
            jsonfile.close()

    #update size
    def update_color(self, color):
        with open("settings.json", "r") as jsonfile:
            data = json.load(jsonfile) # Reading the file
            jsonfile.close()
        data['color'] = color
        with open("settings.json", "w") as jsonfile:
            self.myJSON = json.dump(data, jsonfile) # Writing to the file
            jsonfile.close()

    def update_CPU(self, CPU):
        with open("settings.json", "r") as jsonfile:
            data = json.load(jsonfile) # Reading the file
            jsonfile.close()
        data['CPU difficulty'] = CPU
        with open("settings.json", "w") as jsonfile:
            self.myJSON = json.dump(data, jsonfile) # Writing to the file
            jsonfile.close()

    def get_size(self):
        with open("settings.json", "r") as jsonfile:
            data = json.load(jsonfile) # Reading the file
            jsonfile.close()
        return int(data['size'])
    
    def get_player(self):
        with open("settings.json", "r") as jsonfile:
            data = json.load(jsonfile) # Reading the file
            jsonfile.close()
        if data['color'] == "white":
            return "2"
        else:
            return "1"
        
    def get_difficulty(self):
        with open("settings.json", "r") as jsonfile:
            data = json.load(jsonfile) # Reading the file
            jsonfile.close()
        return data['CPU difficulty']