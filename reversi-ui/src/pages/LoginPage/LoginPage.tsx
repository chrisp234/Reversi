import { Button, TextField, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { login } from '../../services/AuthService';

export const LoginPage = () => {
    const isLoggedIn = false;
    const [password, setPassword] = useState<string>()
    const [username, setUsername] = useState<string>()
    const theme = useTheme()

    const onLoginClicked = () => {
        login(username!,password!)
    }

    return (
        <div style={{ height: "100vh", display: "flex", backgroundSize: 'cover', alignItems: "center", justifyContent: "center", backgroundRepeat: 'no-repeat', backgroundImage: "url('https://media.gettyimages.com/id/107690209/photo/reversi-studio-shot.jpg?s=612x612&w=gi&k=20&c=_70ot2LRkQdlqMx_PioCesKHRHzlYaG9_V0yylWbcs0=')" }}>
            <div style={{ marginTop: '16px', marginBottom: "16px", paddingTop: '16px', width: '500px', backgroundColor: theme.palette.background.default, boxShadow: '1px 1px 1px 2px lightgray' }}>
                <Typography variant="h2">Reversi</Typography>
                <Typography variant="h4">insert pun here</Typography>
                <div style={{ padding: '64px' }}>
                    <TextField label="Username" fullWidth required variant="filled" onChange={e => setUsername(e.target.value)} />
                    <TextField label="Password" variant="filled" sx={{ marginTop: '16px' }} required fullWidth type="password" onChange={e => setPassword(e.target.value)}/>
                    <Button disabled={!username || !password} fullWidth variant="contained" sx={{ marginTop: '16px' }} onClick={onLoginClicked}>Login</Button>
                </div>
                <Typography>Don't have an account? Create one, or continue as a guest</Typography>
                <div>
                    <Button>Register</Button>
                    <Button>Continue as guest</Button>
                </div>
            </div>
        </div>

    )
}