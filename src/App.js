// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import Recommend from './pages/recommend';
import Detect from './pages/detect';
import Chatbot from './pages/chatbot';
import Irrigation from './pages/irrigation';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/detect" element={<Detect />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/irrigation" element={<Irrigation />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;