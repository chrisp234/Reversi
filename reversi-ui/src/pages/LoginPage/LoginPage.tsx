import { Alert, Button, TextField, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { login, loginAsGuest } from '../../services/AuthService';

export const LoginPage = () => {
    const isLoggedIn = false;
    const [password, setPassword] = useState<string>()
    const [username, setUsername] = useState<string>()
    const [error, setError] = useState<string>();
    const theme = useTheme()

    const onLoginClicked = async () => {
        try {
            await login(username!, password!)
            setError(undefined)
            window.location.assign('/')
        } catch (e) {
            setError("Login credentials invalid; Please try again")
        }
    }

    const onContinueAsGuestClicked = async() => {
        await loginAsGuest()
        window.location.assign('/')
    }

    return (
        <div style={{ height: "100vh", display: "flex", backgroundSize: 'cover', alignItems: "center", justifyContent: "center", backgroundRepeat: 'no-repeat', backgroundImage: "url('https://i.ibb.co/cTZ19VP/othello-Board.png')" }}>
            <div style={{ marginTop: '16px', marginBottom: "16px", paddingTop: '16px', width: '500px', backgroundColor: theme.palette.background.default, boxShadow: '1px 1px 1px 2px lightgray' }}>
                <Typography variant="h2">Reversi</Typography>
                <Typography variant="button">A game of strategy</Typography>
                <div style={{ padding: '64px' }}>
                    {error && <Alert variant="filled" severity="error" sx={{ marginBottom: '16px' }}>{error}</Alert>}
                    <TextField 
                        label="Username" 
                        fullWidth 
                        required 
                        variant="filled" 
                        onChange={e => setUsername(e.target.value)} 
                    />
                    <TextField 
                        label="Password" 
                        variant="filled" 
                        sx={{ marginTop: '16px' }} 
                        required 
                        fullWidth 
                        type="password" 
                        onChange={e => setPassword(e.target.value)} 
                    />
                    <Button 
                        disabled={!username || !password} 
                        fullWidth 
                        variant="contained" 
                        sx={{ marginTop: '16px' }} 
                        onClick={onLoginClicked}
                    >
                        Login
                    </Button>
                </div>
                <Typography>Don't have an account? Create one, or continue as a guest</Typography>
                <div>
                    <Button onClick={() => window.location.assign('/register')}>Register</Button>
                    <Button onClick={onContinueAsGuestClicked}>Continue as guest</Button>
                </div>
            </div>
        </div>

    )
}