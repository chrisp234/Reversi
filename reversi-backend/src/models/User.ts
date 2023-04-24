import { Generated } from "kysely";

export interface UserTable {
  username: string;
  password: string | null
  is_guest: boolean
  elo: Generated<number>;
}