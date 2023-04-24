import { db } from "../db/db";
import { getInviteById } from "./InviteService";

export const makeBoard = (boardSize: any) => {
  // console.log(JSON.stringify(boardSize))
  const size = parseInt(boardSize)
  const board = new Array(parseInt(boardSize)).fill(null);
  const filledBoard = board.map((row) => new Array(parseInt(boardSize)).fill("empty"));
  filledBoard[Math.floor(size/2)][Math.floor(size/2)]='white'
  filledBoard[Math.floor(size/2) -1][Math.floor(size/2)-1]='white'
  filledBoard[Math.floor(size/2) -1][Math.floor(size/2)]='black'
  filledBoard[Math.floor(size/2)][Math.floor(size/2)-1]='black'

  return filledBoard;
};

export const createGameFromInvite = async (inviteId: number) => {
  const invite = await getInviteById(inviteId);
  const boardSize = invite?.game_settings.boardSize;
  const game = await db
    .insertInto("games")
    .values({
      status: "in-progress",
      type: "online",
      settings: JSON.stringify(invite?.game_settings),
      whose_turn: "white",
      board: JSON.stringify(makeBoard(boardSize)),
    })
    .returningAll()
    .executeTakeFirst();
  return game;
};

export const getGameById = async(id: number) => {
  return await db.selectFrom('games').selectAll().where('id', '=', id).executeTakeFirst()
}

export const updateBoardAndTurn = async(gameId: number, board: any, nextTurn: 'white' | 'black', status: 'in-progress' | 'complete') => {
  return await db.updateTable('games').where('id','=', gameId).returningAll().set({board: JSON.stringify(board), whose_turn: nextTurn, status}).executeTakeFirst()
}