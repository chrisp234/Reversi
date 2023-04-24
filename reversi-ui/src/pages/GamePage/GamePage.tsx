/* eslint-disable react-hooks/exhaustive-deps */
import { AppBar, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ReversiBoard } from './ReversiBoard';
import { useParams } from 'react-router-dom';
import { getGameById } from '../../services/GameService';

const getScoreCounts = (board: any) => {
    let counts = {
        white: 0,
        black: 0,
        empty: 0
    }
    board.forEach((row: Array<'white' | 'black' | 'empty'>) => {
        row.forEach((cell: 'white' | 'black' | 'empty') => {
            counts[cell] += 1;
        })
    })

    return counts
}


export const GamePage = () => {
    const { gameId } = useParams()
    const [gameState, setGameState] = useState<any>({board: [], settings: { players: [] }});

    const isGameOver = gameState.status === 'complete'
    const scores = getScoreCounts(gameState.board)
    

    const updateGameState = async() => {
        const state = await getGameById(gameId)
        setGameState(state);
    }


    useEffect(()=>{
        updateGameState()
        setInterval(updateGameState, 2000);
    }, [])

    return(
        <>
            <AppBar>
                <Toolbar>
                    <Typography 
                        variant="h6" 
                        component="div" 
                        sx={{flexGrow: 1}}
                        onClick={()=>{window.location.assign('/')}}
                    >
                        Reversi
                    </Typography>
                </Toolbar>
            </AppBar>
            <div style={{width: '100%', height: '104px'}}/>
            {isGameOver && 
                <div>
                    <Typography variant="h4">Game Over!</Typography>
                </div>
            }
            <ReversiBoard state={gameState}/>
            <div style={{marginTop: '32px'}}>
                <Typography variant="body1">Current Turn: {gameState.whose_turn}</Typography>
                <Typography variant="h5">Score:</Typography>
                {gameState.settings.players.map((player: any) => (<Typography>{player.username} ({player.color}): {(scores as any)[player.color]}</Typography>))}
            </div>
        </>
    );
}