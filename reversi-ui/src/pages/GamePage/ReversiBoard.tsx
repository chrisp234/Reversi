import { makeStyles } from "@mui/styles";
import React from "react";
import classNames from "classnames";
import { useCurrentUser } from "../../stores/CurrentUserStore";
import { makeMove } from "../../services/GameService";
import { useParams } from "react-router-dom";

type TTileState = "black" | "white" | "empty";

interface IReversiBoardProps {
  state: IGameState;
}

interface IPlayer {
  username: string;
  color: Omit<TTileState, "empty">;
}

interface IGameState {
  whose_turn: Omit<TTileState, "empty">;
  board: TTileState[][];
  settings: {
    players: IPlayer[];
  };
}

interface IGamePiece {
  color: TTileState;
  interactive: boolean;
  onClick: () => void;
}

const useStyles = makeStyles({
  gamePiece: {
    borderRadius: "50%",
    border: "1px solid gray",
    height: "100%",
    width: "100%",
  },
  emptySpace: {
    backgroundColor: "transparent",
    border: "unset",
  },
  interactive: {
    "&:hover": {
      border: "1px solid gray",
      backgroundColor: "red",
    },
  },
});

export const GamePiece = ({ color, interactive, onClick }: IGamePiece) => {
  const classes = useStyles();
  return (
    <div
      style={{
        width: "32px",
        height: "32px",
        border: "1px solid pink",
        padding: "8px",
      }}
    >
      {color !== "empty" && (
        <div
          className={classes.gamePiece}
          style={{ backgroundColor: color }}
        />
      )}
      {color === "empty" && (
        <div
          onClick={onClick}
          className={classNames(
            classes.gamePiece,
            classes.emptySpace,
            interactive && classes.interactive
          )}
        />
      )}
    </div>
  );
};

export const ReversiBoard = ({ state }: IReversiBoardProps) => {
  const { board, whose_turn: whoseTurn, settings } = state;
  const { players } = settings;
  const { gameId } = useParams()

  const currentUser = useCurrentUser((state) => state.currentUser);
  const currentTurnPlayerId = players?.find(
    (player) => player.color === whoseTurn
  )?.username;

  const isYourTurn = currentTurnPlayerId === currentUser.username;

  const onSpotSelected = async(row: number, col: number) => {
    if(isYourTurn){
        await makeMove(gameId, { row, col })
    }
    // alert(`clicked on ${row}, ${col}`)
  };

  return (
    <div style={{ marginTop: "32px" }}>
      {board.map((row, rowIndex) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {row.map((piece, colIndex) => {
            return (
              <GamePiece
                color={piece}
                interactive={isYourTurn}
                onClick={() => {
                  onSpotSelected(rowIndex, colIndex);
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
