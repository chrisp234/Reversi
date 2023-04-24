


import express, { Request, Response } from 'express';
import { getScoreCounts, hasAnyMovesLeft, isMoveValid, updateBoardWithNewMove } from '../logic/boardLogic';
import { validateSessionToken } from '../middleware/auth';
import { getEloByUsername, getGameById, updateBoardAndTurn, updateElo } from '../services/GameService';

export const makeGameController = (app: express.Express) => {
  app.post('/api/v1/games', validateSessionToken, createGame)
  app.get('/api/v1/games/:id', getGame)
  app.post('/api/v1/games/:id/move', validateSessionToken, makeMove)
}

const createGame = (req: Request, res: Response) => {
  // 2 types of games created through this endpoint: 
  // -- local
  // -- ai
  // -- (online is created when the 2nd person accepts invite to game)
}

const getGame = async(req: Request, res: Response) => {
  const { id } = req.params
  const game = await getGameById(parseInt(id));
  res.status(200).json(game)
  // Anyone can view status of a game
}



const makeMove = async(req: Request, res: Response) => {
  const { id } = req.params;
  const { username } = req.headers;
  const { position }  = req.body;
  
  const game = await getGameById(id as any);
  if(!game){
    res.status(404).send("Game not found")
  }else{
    if(game.status === 'complete'){
      res.status(403).send("You cannot make moves once a game is completed");
    }
    if(game.whose_turn !== game.settings.players.find((player: any) => player.username === username).color) {
      res.status(403).send("Bad boi, its not ur turn")
    }
  
    if (isMoveValid(game.board, position, game.whose_turn)){
      const newBoard = updateBoardWithNewMove(game.board, position, game.whose_turn)
      const nextTurnColor = game.whose_turn == 'white' ? 'black' : 'white'
      const hasMovesLeft = hasAnyMovesLeft(newBoard, nextTurnColor);
      if(!hasMovesLeft){
        const { white, black } = getScoreCounts(newBoard);
        const winningColor = white < black ? 'black' : 'white'
        console.log(game.settings)
        // If it's a tie, then we don't change ELOs at all
        if(white !== black){
          for (let person of game.settings.players) {
            const { elo } = await getEloByUsername(person.username) as any
            if(person.color === winningColor) {
              await updateElo(person.username, parseInt(elo)+50)
            }else{
              await updateElo(person.username, parseInt(elo)-50)
            }
          }
        }

      }
      const updatedGame = updateBoardAndTurn(game.id, newBoard, nextTurnColor, hasMovesLeft ? 'in-progress' : 'complete')
      res.status(200).json(updatedGame)
    }else{
      res.status(500).send("Move is invalid")
    }
    

  }

}
