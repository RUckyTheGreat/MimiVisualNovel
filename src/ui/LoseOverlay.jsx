import React from 'react';

function LoseOverlay({ onRestart, onMenu }) {
    return (
        <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-black/70 backdrop-blur-sm animate-fadeIn">
            <h1 className="text-5xl font-bold text-red-600 mb-6">You Lost ❌</h1>
            <div className="flex gap-4">
                <button
                    onClick={onRestart}
                    className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:scale-105 transition-transform"
                >
                    Restart
                </button>
                <button
                    onClick={onMenu}
                    className="px-6 py-3 bg-gray-600 text-white rounded-xl font-bold hover:scale-105 transition-transform"
                >
                    Menu
                </button>
            </div>
        </div>
    );
}

export default LoseOverlay;
