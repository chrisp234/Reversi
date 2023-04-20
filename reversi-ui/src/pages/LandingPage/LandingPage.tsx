import { AppBar, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { checkIsLoggedIn, getUserId, logout } from '../../services/AuthService';
import { acceptInvitation, declineInvitation, getInvitations } from '../../services/InvitationService';
import { AboutReversi } from './AboutReversi';
import { Leaderboard } from './Leaderboard';
import { StartGameCard } from './StartGameCard';

export const LandingPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>()
    const [userId, setUserId] = useState<number>()

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
        console.log(userId)
        const myInvites: Array<any> = invites.filter((invite: any) =>  invite.recipientId===userId && invite.status==="pending");
        for (let invite of myInvites) {
            // eslint-disable-next-line no-restricted-globals
            if(confirm(`You have been invited to play by ${invite.sender}`)){
                await acceptInvitation(invite.inviteId)
            }else{
                await declineInvitation(invite.inviteId);  
            }
        }
    }
 
    const fetchUserId = async () => {
        const uId = await getUserId()
        setUserId(uId)
    }

    useEffect(()=>{
        checkLoggedIn()
        setInterval(checkForInvitations, 1000);
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