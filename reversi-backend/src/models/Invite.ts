import { Generated } from "kysely";

export interface InviteTable {
  id: Generated<number>;
  created_at: Generated<string>
  sent_by: string;
  sent_to: string;
  game_settings: any;
  game_id: number | undefined;
  status: string;
}