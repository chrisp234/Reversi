import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';

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
        {/* <ReversiBoard></ReversiBoard> */}
        </>
    );
}