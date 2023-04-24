import { db } from "../db/db"
import { InvalidAuthError } from "../errors/InvalidAuthError";
import { SessionNotFoundError } from "../errors/SessionNotFoundError"
import crypto from 'crypto';


/**
 * Creates a new session cookie and returns it
 * @param username Username to create session for
 */
export const createSession = async(username: string): Promise<string> => {
  const active_session_token = crypto.randomBytes(64).toString('hex');
  await db.insertInto('sessions').values({ active_session_token, username }).execute()
  return active_session_token;
}

export const validatePassAndCreateSession = async(username: string, password: string) => {
  const user = await db.selectFrom('users').where('username', '=', username).selectAll().executeTakeFirst();
  if(user?.username != username) {
    throw new InvalidAuthError()
  }
  return await createSession(username);

}

export const createGuestSession = async(): Promise<string> => {
  const guestId = `guest-${crypto.randomBytes(12).toString('hex')}`
  // create new guest user in users table
  await db.insertInto('users').values({ is_guest: true, username: guestId }).execute()
  // create session for guest user
  return await createSession(guestId);
}

/**
 * Ends a specific session
 * @param sessionToken 
 */
export const endSession = async(sessionToken: string): Promise<void> => {
  await db.deleteFrom('sessions').where('active_session_token', '=', sessionToken).execute()
}

export const getOnlinePlayers = async(): Promise<Array<string>> => {
  const res = await db.selectFrom('sessions').select('username').distinct().execute()
  return res.map((user) => user.username);
}

export const getUsernameFromSession = async(sessionToken: string): Promise<string> => {
  const res = await db.selectFrom('sessions').select('username').where('active_session_token', '=', sessionToken).executeTakeFirst();
  if(!res?.username){
    throw new SessionNotFoundError(sessionToken)
  }
  return res.username
}

export const createUserAndSession = async(username: string, password: string): Promise<string> => {
  await db.insertInto('users').values({username, password, is_guest: false}).execute();
  return await createSession(username);
}