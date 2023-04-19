import React from 'react';
import logo from './logo.svg';
import './App.css';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from './pages/LandingPage/LandingPage';
import { ThemeProvider } from '@mui/material';
import { theme } from './common/theme';


function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route index element={<LandingPage/>} />
        <Route element={<LoginPage />} path='/login' />
      </Routes>

      </BrowserRouter>
    </div>
    </ThemeProvider>

  );
}

export default App;
