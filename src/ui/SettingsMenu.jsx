import React, { useState } from 'react';

/**
 * Komponen untuk menampilkan menu Settings.
 * @param {object} props
 * @param {function} props.onClose - Callback untuk menutup menu.
 * @param {object} props.settings - Objek settings saat ini.
 * @param {function} props.onSettingsChange - Callback ketika settings berubah.
 */
function SettingsMenu({ onClose, settings = {}, onSettingsChange }) {
    const [localSettings, setLocalSettings] = useState({
        volume: settings.volume || 100,
        textSpeed: settings.textSpeed || 50,
        autoPlay: settings.autoPlay || false,
        skipUnread: settings.skipUnread || false,
        fullscreen: settings.fullscreen || false,
    });

    const handleSettingChange = (key, value) => {
        const newSettings = { ...localSettings, [key]: value };
        setLocalSettings(newSettings);
        onSettingsChange && onSettingsChange(newSettings);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center 
                       bg-black/70 backdrop-blur-sm z-50 animate-fadeIn">
            <div className="w-full max-w-2xl mx-4 bg-gradient-to-br 
                          from-white via-vn-box to-white 
                          rounded-2xl shadow-2xl border-2 border-vn-primary/30
                          animate-scaleIn">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold bg-gradient-to-r 
                                 from-vn-primary to-pink-600 
                                 bg-clip-text text-transparent">
                        ⚙️ Settings
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center 
                                  rounded-full bg-gray-100 hover:bg-gray-200 
                                  transition-colors text-gray-600 font-bold
                                  hover:rotate-90 duration-300"
                    >
                        ✕
                    </button>
                </div>

                {/* Settings Content */}
                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    
                    {/* Volume Setting */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-lg font-semibold text-vn-text">
                                🔊 Volume
                            </label>
                            <span className="text-sm text-gray-600">
                                {localSettings.volume}%
                            </span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={localSettings.volume}
                            onChange={(e) => handleSettingChange('volume', parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                                     accent-vn-primary"
                        />
                    </div>

                    {/* Text Speed Setting */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-lg font-semibold text-vn-text">
                                ⚡ Text Speed
                            </label>
                            <span className="text-sm text-gray-600">
                                {localSettings.textSpeed}%
                            </span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            value={localSettings.textSpeed}
                            onChange={(e) => handleSettingChange('textSpeed', parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                                     accent-vn-primary"
                        />
                    </div>

                    {/* Auto Play Toggle */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                            <label className="text-lg font-semibold text-vn-text block">
                                ▶️ Auto Play
                            </label>
                            <p className="text-sm text-gray-600">
                                Automatically advance dialogue
                            </p>
                        </div>
                        <button
                            onClick={() => handleSettingChange('autoPlay', !localSettings.autoPlay)}
                            className={`relative w-14 h-8 rounded-full transition-colors
                                      ${localSettings.autoPlay ? 'bg-vn-primary' : 'bg-gray-300'}`}
                        >
                            <span className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full 
                                           transition-transform shadow-md
                                           ${localSettings.autoPlay ? 'translate-x-6' : 'translate-x-0'}`}>
                            </span>
                        </button>
                    </div>

                    {/* Skip Unread Toggle */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                            <label className="text-lg font-semibold text-vn-text block">
                                ⏩ Skip Unread
                            </label>
                            <p className="text-sm text-gray-600">
                                Allow skipping unread text
                            </p>
                        </div>
                        <button
                            onClick={() => handleSettingChange('skipUnread', !localSettings.skipUnread)}
                            className={`relative w-14 h-8 rounded-full transition-colors
                                      ${localSettings.skipUnread ? 'bg-vn-primary' : 'bg-gray-300'}`}
                        >
                            <span className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full 
                                           transition-transform shadow-md
                                           ${localSettings.skipUnread ? 'translate-x-6' : 'translate-x-0'}`}>
                            </span>
                        </button>
                    </div>

                    {/* Fullscreen Toggle */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                            <label className="text-lg font-semibold text-vn-text block">
                                🔲 Fullscreen
                            </label>
                            <p className="text-sm text-gray-600">
                                Toggle fullscreen mode
                            </p>
                        </div>
                        <button
                            onClick={() => handleSettingChange('fullscreen', !localSettings.fullscreen)}
                            className={`relative w-14 h-8 rounded-full transition-colors
                                      ${localSettings.fullscreen ? 'bg-vn-primary' : 'bg-gray-300'}`}
                        >
                            <span className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full 
                                           transition-transform shadow-md
                                           ${localSettings.fullscreen ? 'translate-x-6' : 'translate-x-0'}`}>
                            </span>
                        </button>
                    </div>

                </div>

                {/* Footer */}
                <div className="p-4 bg-gray-50 border-t border-gray-200 rounded-b-2xl">
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-3 bg-vn-primary text-white 
                                     rounded-xl font-semibold hover:bg-pink-600 
                                     transition-colors shadow-md"
                        >
                            ✓ Apply & Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SettingsMenu;

