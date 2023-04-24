import { Generated } from "kysely";

export interface GameTable {
  id: Generated<number>
  type: "ai" | "online" | "local"
  status: "in-progress" | "complete"
  board: any;
  settings: any;
  whose_turn: string;
}