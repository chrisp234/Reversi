import { AppBar, Toolbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react'
import { checkIsLoggedIn, getUserId, logout } from '../../services/AuthService';
import { acceptInvitation, declineInvitation, getInvitations } from '../../services/InvitationService';
import { useCurrentUser } from '../../stores/CurrentUserStore';
import { AboutReversi } from './AboutReversi';
import { Leaderboard } from './Leaderboard';
import { StartGameCard } from './StartGameCard';

const useStyles = makeStyles({
    logoutButton: {
        '&:hover': {
            cursor: 'pointer'
        }
    }
})

export const LandingPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>()
    const [userId, setUserId] = useState<any>()
    const {currentUser, updateCurrentUser} = useCurrentUser(state => state)
    const classes = useStyles()

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
    
    const checkForInvitations = async () => {
        const invites = await getInvitations();
        for (let invite of invites) {
            // eslint-disable-next-line no-restricted-globals
            if(confirm(`You have been invited to play by ${invite.sent_by}`)){
                const game = await acceptInvitation(invite.id)
                window.location.assign(`/game/${game.id}`)
            }else{
                await declineInvitation(invite.id);  
            }
        }
    }
 
    const fetchUserId = async () => {
        const user = await getUserId()
        updateCurrentUser(user.username as any, user.username)
        setUserId(user.username)
    }

    useEffect(()=>{
        checkLoggedIn()
        setInterval(checkForInvitations, 10000);
    }, [])

    useEffect(() => {
        fetchUserId()
    }, [isLoggedIn])

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
                <div onClick={onLoginChangeClick} className={classes.logoutButton}>{isLoggedIn ? <Typography>Logout</Typography> : <Typography>Log In</Typography>}</div>
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