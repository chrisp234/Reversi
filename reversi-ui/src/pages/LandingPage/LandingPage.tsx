import { AppBar, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { checkIsLoggedIn, logout } from '../../services/AuthService';
import { AboutReversi } from './AboutReversi';
import { Leaderboard } from './Leaderboard';
import { StartGameCard } from './StartGameCard';

export const LandingPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>()

    const onLoginChangeClick = async() => {
        if(isLoggedIn){
            await logout()
            await checkLoggedIn()
        }else{
            window.location.assign("/login")
        }
    }

    const checkLoggedIn = async()=>{
        const loggedIn = await checkIsLoggedIn()
        setIsLoggedIn(loggedIn)
    }

    useEffect(()=>{
        checkLoggedIn()
    }, [])

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
                <div onClick={onLoginChangeClick}>{isLoggedIn ? <Typography>Logout</Typography> : <Typography>LogIn</Typography>}</div>
            </Toolbar>
        </AppBar>
        <div style={{display: 'flex', marginTop: '104px'}}>
            <Leaderboard />
            <AboutReversi />
        </div>
        <StartGameCard isLoggedIn={isLoggedIn} />
        </>
    )
}