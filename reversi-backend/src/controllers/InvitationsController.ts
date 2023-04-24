


import express, { Request, Response } from 'express';
import { validateSessionToken } from '../middleware/auth';
import { createUserAndSession, endSession, validatePassAndCreateSession } from '../services/SessionService';
import { createInvite, getAvailablePlayers, getInviteById, getPendingInvites, updateInviteById } from '../services/InviteService';
import { createGameFromInvite } from '../services/GameService';

export const makeInvitationsController = (app: express.Express) => {
  app.get('/api/v1/online_players', getOnlinePlayers)
  app.post('/api/v1/invites', validateSessionToken, sendInvite)
  app.get('/api/v1/invites', validateSessionToken, getInvites)
  app.get('/api/v1/invites/:id', validateSessionToken, getInviteStatus)
  app.post('/api/v1/invites/:id/cancel', validateSessionToken, cancelInvite)
  app.post('/api/v1/invites/:id/accept', validateSessionToken, acceptInvite)
  app.post('/api/v1/invites/:id/decline', validateSessionToken, declineInvite)
}

const sendInvite = async (req: Request, res: Response) => {
  const { username } = req.headers;
  const { sendTo, gameSettings } = req.body;

  const invite = await createInvite(username as string, sendTo, gameSettings)
  res.status(201).json(invite);
}

const getInvites = async (req: Request, res: Response) => {
  const { username } = req.headers;
  const invites = await getPendingInvites(username as string);
  res.status(200).json(invites)
}

const getInviteStatus = async (req: Request, res: Response) => {
  const { username } = req.headers;
  const { id } = req.params;

  const invite = await getInviteById(parseInt(id));

  if(!invite){
    res.status(404).send("Invite not found")
  }else {
    if(invite.sent_by !== username || invite.sent_to !== username){ 
      res.status(403).send("Permission denied")
    }else{
      res.status(200).json(invite)
    }
  }
}

const cancelInvite = async (req: Request, res: Response) => {
  const { username } = req.headers;
  const { id } = req.params;

  const invite = await getInviteById(parseInt(id));

  if(!invite){
    res.status(404).send("Invite not found")
  }else {
    if(invite.sent_by !== username){ 
      res.status(403).send("Permission denied")
    }else{
      await updateInviteById(parseInt(id), 'cancelled')
      res.status(201).send("Invite cancelled")
    }
  }
}

const acceptInvite = async (req: Request, res: Response) => {
  const { username } = req.headers;
  const { id } = req.params;

  const invite = await getInviteById(parseInt(id));

  if(!invite){
    res.status(404).send("Invite not found")
  }else {
    if(invite.sent_to !== username){ 
      res.status(403).send("Permission denied")
    }else{
      await updateInviteById(parseInt(id), 'accepted')
      const game = await createGameFromInvite(parseInt(id));
      // TODO here we create game, associate it with invite, and return it
      res.status(201).json(game)
    }
  }
}

const declineInvite = async (req: Request, res: Response) => {
  const { username } = req.headers;
  const { id } = req.params;

  const invite = await getInviteById(parseInt(id));

  if(!invite){
    res.status(404).send("Invite not found")
  }else {
    if(invite.sent_to !== username){ 
      res.status(403).send("Permission denied")
    }else{
      await updateInviteById(parseInt(id), 'declined')
      res.status(201).send("Invite declined")
    }
  }
}

const getOnlinePlayers = async (req: Request, res: Response) => {
  const ps = await getAvailablePlayers()
  const players = ps.map((p) => p.username)
  res.status(200).json(players)
}



