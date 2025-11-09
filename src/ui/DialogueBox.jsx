import React, { useState, useEffect } from 'react';
import useTypewriter from '../core/useTypewriter';

function DialogueBox({ name, text, lineKey }) {
    // Gunakan state untuk memaksa hook reset saat lineKey berubah
    const [currentText, setCurrentText] = useState(text);
    
    useEffect(() => {
        setCurrentText(text);
    }, [text, lineKey]);

    const { displayedText, isTyping } = useTypewriter(' ' + currentText, 35);

    
    const getCharacterStyle = () => {
        switch(name?.toLowerCase()) {
            case 'mimi': return { color: 'text-pink-600', bg: 'bg-pink-50' };
            case 'narrator': return { color: 'text-gray-600', bg: 'bg-gray-50' };
            default: return { color: 'text-blue-600', bg: 'bg-blue-50' };
        }
    };
    
    const { color: nameColor, bg: nameBg } = getCharacterStyle();
    
    return (
        <div 
            className="fixed bottom-0 left-0 w-full min-h-[180px] p-6 
                       bg-gradient-to-t from-white via-vn-box to-vn-box
                       shadow-[0_-4px_20px_rgba(0,0,0,0.15)] 
                       border-t-4 border-vn-primary
                       flex flex-col justify-start backdrop-blur-md 
                       transition-all duration-300 ease-in-out
                       animate-slideUp"
            style={{
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
            }}
        >
            <div className={`text-xl font-bold mb-3 p-2 px-5 
                             inline-block self-start rounded-lg 
                             ${nameBg} shadow-sm ${nameColor}
                             transition-all duration-200
                             hover:shadow-md hover:scale-105`}>
                {name === 'Narrator' ? (
                    <span className="italic text-gray-600">...</span>
                ) : (
                    <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-current"></span>
                        {name}
                    </span>
                )}
            </div>

            {/* 🔠 Efek mengetik */}
            <p className="text-lg font-normal leading-relaxed text-vn-text 
                         min-h-[80px] overflow-auto pr-2 custom-scrollbar">
                {displayedText}
                {isTyping && (
                    <span className="inline-block w-1 h-5 bg-vn-primary animate-pulse ml-1">|</span>
                )}
            </p>

            <div className="absolute bottom-4 right-6 flex flex-col items-center gap-1 animate-bounce">
                <div className="w-1 h-1 bg-vn-primary rounded-full"></div>
                <div className="w-1 h-1 bg-vn-primary rounded-full delay-75"></div>
                <div className="w-1 h-1 bg-vn-primary rounded-full delay-150"></div>
            </div>
        </div>
    );
}

export default DialogueBox;
