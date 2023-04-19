
from fastapi import FastAPI, Response, Request, HTTPException
from dtos.user import UserCredentials
import database
import uuid

app = FastAPI()
db = database.Database()
db.setup()

@app.get("/api/v1/health")
async def health_check():
    return {"message": "Healthy"}

@app.post("/api/v1/register")
async def register(user: UserCredentials): 
    # TODO verify that user does not exist yet
    db.insert_new_player(user.username, user.password)
    playerTuple = db.get_player_by_username(user.username)
    return {
        "id": playerTuple[0],
        "username": playerTuple[1]
    }

@app.post("/api/v1/login")
async def login(credentials: UserCredentials, response: Response):
    # Check if username and password match in the database
    userIsWhoTheySayTheyAre = db.verify_username_password(credentials.username, credentials.password)
    
    if(userIsWhoTheySayTheyAre):
        # Generate a cookie
        sessionToken = str(uuid.uuid4())
        playerId = db.get_player_by_username(credentials.username)[0]
        # Store the cookie in the database in the users table as active_session_token
        db.set_user_session_token(playerId, sessionToken)
        # Return the cookie to the user in a Set-Cookie response header
        response.set_cookie(key="reversi_session_token", value=sessionToken)
        return {"message": "Come to the dark side, we have cookies"}
    else:
        raise HTTPException(status_code=401)

@app.post("/api/v1/logout")
async def logout(request: Request):
    token = request.cookies.get('reversi_session_token')
    db.delete_session_token(token)
    return {"message": "Logged out successfully"}

@app.get("/api/v1/leaderboard")
async def leaderboard():
    return db.leaderboard()

@app.get("/api/v1/online_players")
async def online_players():
    username=[]
    IDs=db.get_online_players()
    for i in IDs:
        username.append(db.get_username_from_playerID(i))
    return username
    
@app.post("/api/v1/games")
async def start_game():
    pass

@app.post("/api/v1/games/:id/move")
async def make_move():
    pass

@app.get("/api/v1/games/:id")
async def get_game():
    pass

@app.get("/api/v1/me")
async def me(request: Request):
    token = request.cookies.get('reversi_session_token')
    try:
        userId = db.get_user_id_from_session(token)
        return userId[0]
    except:
        raise HTTPException(status_code=401)