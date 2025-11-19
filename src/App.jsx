import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

import { Chapter1Page } from './pages/vn'; 

import './styles/global.css';

function App() {
  return (
    <Router>
      <div id="mimi-visual-novel-app" className="min-h-screen bg-gray-900 text-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vn/chapter1" element={<Chapter1Page />} />
          <Route path="*" element={<h1>404 | Halaman Tidak Ditemukan</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;