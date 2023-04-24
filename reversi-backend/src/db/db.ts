import { Pool } from 'pg'
import {
  Kysely,
  PostgresDialect,
} from 'kysely'
import { UserTable } from '../models/User'
import { SessionsTable } from '../models/Session'
import { InviteTable } from '../models/Invite';
import { GameTable } from '../models/Game';

interface Database {
  users: UserTable;
  sessions: SessionsTable;
  invites: InviteTable;
  games: GameTable;
}

const { POSTGRES_DB, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_PASSWORD, POSTGRES_USER, DATABASE_URL } = process.env

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: DATABASE_URL
      // host: POSTGRES_HOST,
      // database: POSTGRES_DB,
      // port: parseInt(POSTGRES_PORT ?? ""),
      // user: POSTGRES_USER,
      // password: POSTGRES_PASSWORD,
    })
  })
})

