import {
  Card,
  Button,
  Modal,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { createGame } from "../../services/GameService";
import { createInvitation } from "../../services/InvitationService";
import { fetchOnlinePlayers } from "../../services/LeaderboardService";
import { useCurrentUser } from "../../stores/CurrentUserStore";
interface IStartGameCardProps {
  isLoggedIn: boolean | undefined;
}

type TGameMode = "local" | "ai" | "online";

interface INewGameModalProps {
  gameMode: TGameMode;
  onClose: () => void;
}

const NewGameModal = ({ gameMode, onClose }: INewGameModalProps) => {
  const [onlinePlayers, setOnlinePlayers] = useState<any>([]);
  const [opponent, setOpponent] = useState<string>();
  const [boardSize, setBoardSize] = useState<string>("8");
  const [color, setColor] = useState<string>("white");
  const otherColor = color === "white" ? "black" : "white";
  const { currentUser } = useCurrentUser();

  const loadOnlinePlayers = async () => {
    console.log(currentUser);
    const foo = await fetchOnlinePlayers();
    setOnlinePlayers(foo.filter((player) => player !== currentUser.username));
  };

  useEffect(() => {
    loadOnlinePlayers();
  }, []);

  const difficultyOptions = [
    {
      label: "easy",
      value: "easy",
    },
    {
      label: "medium",
      value: "medium",
    },
    {
      label: "hard",
      value: "hard",
    },
  ];

  const colorOptions = [
    {
      label: "white",
      value: "white",
    },
    {
      label: "black",
      value: "black",
    },
  ];

  const onSubmit = async () => {
    if (gameMode === "online") {
      await createInvitation(opponent!, {
        boardSize,
        players: [
          {
            color,
            username: currentUser.username,
          },
          { color: otherColor, username: opponent },
        ],
      });
    }
    if (gameMode === "local") {
      const game = await createGame("local", { boardSize });
      window.location.assign(`/game/${game.id}`);
    }
    if (gameMode === 'ai') {
        const settings = {
            boardSize,
            players: [
                {
                    username: currentUser.username,
                    color: 'white'
                },
                {
                    username: 'ai',
                    color: 'black'
                }
            ]
        }
        const game = await createGame("ai", settings)
        window.location.assign(`/game/${game.id}`)
    }
  };

  return (
    <Dialog open sx={{ padding: "32px" }} onClose={onClose}>
      <DialogTitle sx={{ width: "500px" }}>Game Setup</DialogTitle>
      <DialogContent>
        <TextField
          onChange={(e) => {
            setBoardSize(e.target.value);
          }}
          sx={{ marginBottom: "32px" }}
          type="number"
          variant="filled"
          label="Board Size"
          defaultValue={8}
          helperText="How many rows/columns the board should contain"
          fullWidth
        />
        {gameMode !== "local" && (
          <TextField
            sx={{ marginBottom: "32px" }}
            fullWidth
            variant="filled"
            label="Color"
            defaultValue="white"
            onChange={(e) => {
              setColor(e.target.value);
            }}
            select
          >
            {colorOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )}
        {gameMode === "ai" && (
          <TextField fullWidth variant="filled" label="Difficulty" select>
            {difficultyOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )}

        {gameMode === "online" && (
          <TextField
            fullWidth
            variant="filled"
            label="Opponent"
            select
            onChange={(e) => {
              setOpponent(e.target.value);
            }}
            helperText="Select an opponent to play against"
          >
            {onlinePlayers.map((p: any) => (
              <MenuItem key={p} value={p}>
                {p}
              </MenuItem>
            ))}
          </TextField>
        )}
      </DialogContent>

      <DialogActions sx={{ paddingBottom: "24px", paddingRight: "24px" }}>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={onSubmit}>
          Create game
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const StartGameCard = ({ isLoggedIn }: IStartGameCardProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [gameMode, setGameMode] = useState<TGameMode>();
  const onGameStartClicked = (gameMode: TGameMode) => {
    setGameMode(gameMode);
    setModalOpen(true);
  };

  return (
    <>
      {modalOpen && (
        <NewGameModal
          gameMode={gameMode!}
          onClose={() => setModalOpen(false)}
        />
      )}
      <Card
        elevation={5}
        sx={{
          margin: "16px",
          padding: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={() => onGameStartClicked("ai")} variant="outlined">
          Play against AI
        </Button>
        <Button onClick={() => onGameStartClicked("local")} variant="outlined">
          Play against a friend locally
        </Button>
        <Button onClick={() => onGameStartClicked("online")} variant="outlined">
          Play against an online player
        </Button>
      </Card>
    </>
  );
};
