import React from 'react';

function ChoiceBox({ choices, onSelect }) {
    return (
        <div className="fixed bottom-0 left-0 w-full p-6 bg-white/90 backdrop-blur-sm z-50 flex flex-col gap-4 animate-slideUp">
            {choices.map((choice, idx) => (
                <button
                    key={idx}
                    onClick={() => onSelect(idx)}
                    className="w-full px-6 py-3 bg-vn-primary text-white rounded-xl font-bold shadow hover:scale-105 transition-transform"
                >
                    {choice.text}
                </button>
            ))}
        </div>
    );
}

export default ChoiceBox;
