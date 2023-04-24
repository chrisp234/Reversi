import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from './pages/LandingPage/LandingPage';
import { ThemeProvider } from '@mui/material';
import { theme } from './common/theme';
import { GamePage } from './pages/GamePage/GamePage';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import { useCurrentUser } from './stores/CurrentUserStore';
import { getUserId } from './services/AuthService';


function App() {
  const { currentUser, updateCurrentUser} = useCurrentUser()

  const loadCurrentUser = async () => {
    const user = await getUserId()
    updateCurrentUser(user.username as any, user.username)
}

  useEffect(() => {
      loadCurrentUser()
  }, [])
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route index element={<LandingPage/>} />
        <Route element={<LoginPage />} path='/login' />
        <Route element={<GamePage />} path='/game/:gameId' />
        <Route element={<RegistrationPage />} path='/register' />
      </Routes>

      </BrowserRouter>
    </div>
    </ThemeProvider>

  );
}

export default App;
