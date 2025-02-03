import { useState } from 'react'
import './App.css'
import Register from './pages/Register'
import Welcome from './pages/Welcome'
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />}/>
      </Routes>
    </BrowserRouter>
  );
}
