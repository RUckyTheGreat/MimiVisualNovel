import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-8 bg-gray-800">
      <h1 className="text-4xl font-bold mb-4 text-pink-400">🎉 MIMI VISUAL NOVEL: BERHASIL 🎉</h1>
      <p className="text-lg mb-8">Semua file inti dan routing sudah terhubung!</p>
      
      <div className="flex flex-col gap-3 w-full max-w-md">
        <Link to="/vn/showcase">
          <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-semibold transition duration-200 shadow-lg">
            🎨 UI Showcase
          </button>
        </Link>
        <Link to="/vn/chapter1">
          <button className="w-full px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-lg font-semibold transition duration-200 shadow-lg">
            Mulai Chapter 1 (Tes Rute)
          </button>
        </Link>
        <Link to="/vn/chapter2">
          <button className="w-full px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-lg font-semibold transition duration-200 shadow-lg">
            Mulai Chapter 2 (Tes Rute)
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;