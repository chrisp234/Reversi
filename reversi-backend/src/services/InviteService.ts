import { db } from "../db/db";
import { InviteTable } from "../models/Invite";

export const createInvite = async (
  sender: string,
  sendee: string,
  gameSettings: any
) => {
  const invite = await db
    .insertInto("invites")
    .values({
      sent_by: sender,
      sent_to: sendee,
      status: "pending",
      game_settings: JSON.stringify(gameSettings),
    })
    .returningAll()
    .executeTakeFirst();

  return invite;
};

export const getPendingInvites = async (username: string) => {
  const invites = await db
    .selectFrom("invites")
    .where("sent_to", "=", username)
    .where("status", "=", "pending")
    .selectAll()
    .execute();
  return invites;
};

export const getInviteById = async (id: number) => {
  return await db
    .selectFrom("invites")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
};

export const updateInviteById = async (id: number, status: string) => {
  return await db
    .updateTable("invites")
    .where("id", "=", id)
    .set({ status })
    .execute();
};

export const getAvailablePlayers = async() => {
  return await db.selectFrom('sessions').select('username').distinct().execute()
}