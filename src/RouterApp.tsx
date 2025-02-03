import React from 'react';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from './SignUp';
import Login from './Login';

const RouterApp: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default RouterApp;
