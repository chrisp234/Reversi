import { Card, Button, Modal, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { fetchOnlinePlayers } from '../../services/LeaderboardService';
interface IStartGameCardProps {
    isLoggedIn: boolean | undefined
}

type TGameMode = 'local' | 'ai' | 'online';

interface INewGameModalProps {
    gameMode: TGameMode
    onClose: () => void;
}

const NewGameModal = ({gameMode, onClose}: INewGameModalProps) => {

    const [onlinePlayers, setOnlinePlayers] = useState<any>([]);

    const loadOnlinePlayers =async () => {
        const foo = await fetchOnlinePlayers();
        setOnlinePlayers(foo)  
    }

    useEffect(()=>{
        loadOnlinePlayers()
    }, [])
    const difficultyOptions = [{
        label: 'easy',
        value: 'easy'
    },{
        label: 'medium',
        value: 'medium'
    },{
        label: 'hard',
        value: 'hard'
    }]

    const colorOptions =[{
        label: 'white',
        value: 'white'
    },{
        label: 'black',
        value: 'black'
    }]
    return(
        <Dialog open sx={{padding: '32px'}} onClose={onClose}>
            <DialogTitle sx={{width: '500px'}}>
                Game Setup
            </DialogTitle>
            <DialogContent>
            <TextField sx={{marginBottom: '32px'}}type="number" variant="filled" label="Board Size" helperText="How many rows/columns the board should contain" fullWidth/>
            <TextField  sx={{marginBottom: '32px'}} fullWidth variant="filled" label="Color" select>
            {colorOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
                </TextField>
            {gameMode==="ai" && <TextField fullWidth variant="filled" label="Difficulty" select>
            {difficultyOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
                </TextField>}

            {gameMode==="online" && <TextField fullWidth variant="filled" label="Opponent" select helperText="Select an opponent to play against">
            {onlinePlayers.map((p: any) => (
            <MenuItem key={p} value={p}>
              {p}
            </MenuItem>
          ))}
                </TextField>}
            </DialogContent>

            <DialogActions sx={{paddingBottom: '24px', paddingRight:'24px'}}>
                <Button variant="outlined" onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={onClose}>Create game</Button>
            </DialogActions>
        </Dialog>
    );
}

export const StartGameCard = ({isLoggedIn}: IStartGameCardProps) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [gameMode, setGameMode] = useState<TGameMode>();
    const onGameStartClicked = (gameMode: TGameMode) => {
        setGameMode(gameMode);
        setModalOpen(true)
    }

    return(
        <>
        {modalOpen && <NewGameModal gameMode={gameMode!} onClose={()=>setModalOpen(false)}/>}
        <Card elevation={5} sx={{margin: '16px', padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Button onClick={()=>onGameStartClicked('ai')} variant="outlined">Play against AI</Button>
            <Button onClick={()=>onGameStartClicked('local')} variant="outlined">Play against a friend locally</Button>
            <Button onClick={()=>onGameStartClicked('online')} variant="outlined">Play against an online player</Button>
        </Card>
        </>
    );
}