


import express, { Request, Response } from 'express';
import { elo, findAvailableSpot, getScoreCounts, hasAnyMovesLeft, isMoveValid, updateBoardWithNewMove } from '../logic/boardLogic';
import { validateSessionToken } from '../middleware/auth';
import { createNewGame, getEloByUsername, getGameById, updateBoardAndTurn, updateElo } from '../services/GameService';

export const makeGameController = (app: express.Express) => {
  app.post('/api/v1/games', validateSessionToken, createGame)
  app.get('/api/v1/games/:id', getGame)
  app.post('/api/v1/games/:id/move', validateSessionToken, makeMove)
}

/**
 * 
 * @param req {
    type: 'local',
    settings: {
        boardSize: 4
    }
}
 * @param res 
 */

const createGame = async (req: Request, res: Response) => {
  const { username } = req.headers
  const { type, settings } = req.body;

  if(type === 'local') {
    const newSettings = {
      ...settings,
      players: [{
        username,
        color: 'white'
      },{
        username,
        color: 'black'
      }]
    }
    const game = await createNewGame(type, newSettings)
    res.status(201).json(game)
  }else{
    const game = await createNewGame(type, settings)
    res.status(201).json(game)
  }
}

const getGame = async(req: Request, res: Response) => {
  const { id } = req.params
  const game = await getGameById(parseInt(id));
  res.status(200).json(game)
  // Anyone can view status of a game
}

const makeMoveHelper = async(gameId: any, username: any, position: any) => {

  const game = await getGameById(gameId);
  if(!game){
    return game;
  }else{
    if(game.status === 'complete'){
      return game;
    }

    const playersWithMatchingUsername = game.settings.players.filter((player: any) => player.username === username);
    if(!playersWithMatchingUsername.map((player: any) => player.color).includes(game.whose_turn)) {
      return game;
    }
  
    if (isMoveValid(game.board, position, game.whose_turn)){
      const newBoard = updateBoardWithNewMove(game.board, position, game.whose_turn)
      const nextTurnColor = game.whose_turn == 'white' ? 'black' : 'white'
      const hasMovesLeft = hasAnyMovesLeft(newBoard, nextTurnColor);
      if(!hasMovesLeft && game.type === 'online'){
        const { white, black } = getScoreCounts(newBoard);
        const winningColor = white < black ? 'black' : 'white'
        // console.log(game.settings)
        // If it's a tie, then we don't change ELOs at all
        const oldElos = [null, null]
        if(white !== black){
          for (let person of game.settings.players) {
            const { elo } = await getEloByUsername(person.username) as any
            if(person.color === winningColor) {
              oldElos[0] = elo
              // await updateElo(person.username, parseInt(elo)+50)
            }else{
              oldElos[1] = elo
              // await updateElo(person.username, parseInt(elo)-50)
            }
          }
          const newElos = elo(oldElos, 32)

          for (let person of game.settings.players) {
            const { elo } = await getEloByUsername(person.username) as any
            if(person.color === winningColor) {
              await updateElo(person.username, Math.round(newElos[0]))
            }else{
              await updateElo(person.username, Math.round(newElos[1]))
            }
          }
        }

      }
      let updatedGame = await updateBoardAndTurn(game.id, newBoard, nextTurnColor, hasMovesLeft ? 'in-progress' : 'complete')
      return updatedGame;
    }else{
      return game;
    }
    

  }
}

const makeMove = async(req: Request, res: Response) => {
  const { id } = req.params;
  const { username } = req.headers;
  const { position }  = req.body;
  
  const game = await getGameById(id as any);
  if(!game){
    res.status(404).send("Game not found")
    return;
  }else{
    if(game.status === 'complete'){
      res.status(403).send("You cannot make moves once a game is completed");
      return;
    }

    const playersWithMatchingUsername = game.settings.players.filter((player: any) => player.username === username);
    if(!playersWithMatchingUsername.map((player: any) => player.color).includes(game.whose_turn)) {
      res.status(403).send("Bad boi, its not ur turn")
      return;
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
        const oldElos = [null, null]
        if(white !== black){
          for (let person of game.settings.players) {
            const { elo } = await getEloByUsername(person.username) as any
            if(person.color === winningColor) {
              oldElos[0] = elo
              // await updateElo(person.username, parseInt(elo)+50)
            }else{
              oldElos[1] = elo
              // await updateElo(person.username, parseInt(elo)-50)
            }
          }
          const newElos = elo(oldElos, 32)

          for (let person of game.settings.players) {
            const { elo } = await getEloByUsername(person.username) as any
            if(person.color === winningColor) {
              await updateElo(person.username, Math.round(newElos[0]))
            }else{
              await updateElo(person.username, Math.round(newElos[1]))
            }
          }
        }

      }
      let updatedGame = await updateBoardAndTurn(game.id, newBoard, nextTurnColor, hasMovesLeft ? 'in-progress' : 'complete')
      if(updatedGame?.settings.players.find((player: any) => player.color === updatedGame!.whose_turn).username === 'ai'){
        const move= findAvailableSpot(updatedGame.board, updatedGame.whose_turn)
        updatedGame = await makeMoveHelper(id, 'ai', move)
      }
      res.status(200).json(updatedGame)
      return;
    }else{
      res.status(500).send("Move is invalid")
      return;
    }
    

  }

}
