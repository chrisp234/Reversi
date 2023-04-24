


import express, { Request, Response } from 'express';
import { validateSessionToken } from '../middleware/auth';
import { createGuestSession, createUserAndSession, endSession, validatePassAndCreateSession } from '../services/SessionService';

export const makeSessionsController = (app: express.Express) => {
  app.post('/api/v1/login', login)
  app.post('/api/v1/login_as_guest', loginAsGuest)
  app.post('/api/v1/logout', logout)
  app.post('/api/v1/register', register)
  app.get('/api/v1/me', validateSessionToken, me)
}

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const token = await validatePassAndCreateSession(username, password);
    res.cookie('reversi_session_token', token)
    res.status(201).send("logged in successfully")
  }catch(e){
    res.status(401).send("Login failed")
  }
}

const loginAsGuest = async (req: Request, res: Response) => {
  try {
    const token = await createGuestSession()
    res.cookie('reversi_session_token', token)
    res.status(201).send("logged in as guest successfully")
  }catch(e){
    res.status(500).send("Something went wrong")
  }
}

const logout = async (req: Request, res: Response) => {
  const token = req.cookies.reversi_session_token
  if(token){
    await endSession(token);
    res.status(200).send("Success")
  }else{
    res.status(401).send("No session exists")
  }
}

const register = async (req: Request, res: Response) => {
  const { username, password } = req.body
  const token = await createUserAndSession(username, password)
  res.cookie('reversi_session_token', token);
  res.status(201).send("Registered and logged in successfully")
}

const me = async (req: Request, res: Response) => {
  const { username } = req.headers
  res.status(200).json({ username })
}
