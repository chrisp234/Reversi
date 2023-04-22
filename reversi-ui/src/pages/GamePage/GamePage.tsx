import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { ReversiBoard } from './ReversiBoard';

export const GamePage = () => {
    return(
        <>
            <AppBar>
                <Toolbar>
                    <Typography 
                        variant="h6" 
                        component="div" 
                        sx={{flexGrow: 1}}
                    >
                        Reversi
                    </Typography>
                </Toolbar>
            </AppBar>
            <ReversiBoard state={{ 
                whoseTurn: 'black', 
                board: [['empty', 'black', 'white', 'white', 'empty', 'empty', 'white', 'black', 'black', 'white', 'black', 'black', 'white', 'black', 'black', 'white'],
                        ['empty', 'black', 'black', 'white', 'black', 'black', 'white', 'black', 'black', 'white', 'black', 'black', 'white', 'black', 'black', 'white']],
                players: [{
                    userName: 'dede',
                    id: 1,
                    color: 'black'
                },
                {
                    userName: 'testuser13',
                    id: 19,
                    color: 'white'
                },
            ]
            }}/>
        </>
    );
}