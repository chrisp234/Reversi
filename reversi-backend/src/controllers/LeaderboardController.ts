


import express, { Request, Response } from 'express';
import { validateSessionToken } from '../middleware/auth';
import { createUserAndSession, endSession, getOnlineLeaderboard, validatePassAndCreateSession } from '../services/SessionService';
import { createInvite, getAvailablePlayers, getInviteById, getPendingInvites, updateInviteById } from '../services/InviteService';
import { createGameFromInvite } from '../services/GameService';

export const makeLeaderboardController = (app: express.Express) => {
  app.get('/api/v1/leaderboard', getLeaderboard)
}

const getLeaderboard = async (req: Request, res: Response) => {
  const leaderboard = await getOnlineLeaderboard();
  res.status(201).json(leaderboard);
}
