import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

import { Chapter1Page, Chapter2Page, ChapterSpecial, UIShowcasePage } from './pages/vn'; 

import './styles/global.css';

function App() {
  return (
    <Router>
      <div id="mimi-visual-novel-app" className="min-h-screen bg-gray-900 text-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vn/chapter1" element={<Chapter1Page />} />
          <Route path="/vn/chapter2" element={<Chapter2Page />} />
          <Route path="/vn/special" element={<ChapterSpecial />} />
          <Route path="/vn/showcase" element={<UIShowcasePage />} />
          
          <Route path="*" element={<h1>404 | Halaman Tidak Ditemukan</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;