import type { Request, Response } from "express";
import { getUsernameFromSession } from "../services/SessionService";


export const validateSessionToken = async (req: Request, res: Response, next: any) => {
  // console.log(req)
  const token = req.cookies?.reversi_session_token;

  if (!token) {
    return res.status(401).send("This endpoint is only accessible to authenticated users");
  }

  try {
    const username = await getUsernameFromSession(token)
    req.headers.username = username
  }catch(e){
    return res.status(401).send("Session is invalid");
  }

  next()
}