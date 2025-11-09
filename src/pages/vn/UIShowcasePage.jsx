import React, { useState } from 'react';
import { 
    Background, 
    CharacterSprite, 
    DialogueBox, 
    ChoiceBox,
    TransitionOverlay,
    AnswerBox
} from '../../ui';

/**
 * Halaman showcase untuk melihat semua UI komponen Visual Novel
 */
function UIShowcasePage() {
    const [currentScene, setCurrentScene] = useState(0);
    const [showChoiceBox, setShowChoiceBox] = useState(false);
    const [showAnswerBox, setShowAnswerBox] = useState(false);
    const [showTransition, setShowTransition] = useState(false);
    const [transitionType, setTransitionType] = useState('fade');
    const [autoPlay, setAutoPlay] = useState(false);
    const [skip, setSkip] = useState(false);

    const handleChoiceSelect = (index) => {
        console.log('Choice selected:', index);
        setShowChoiceBox(false);
        alert(`You selected choice ${index + 1}!`);
    };

    const handleAnswerSubmit = (isCorrect, answer) => {
        console.log('Answer submitted:', answer, isCorrect ? 'CORRECT!' : 'WRONG');
        if (isCorrect) {
            alert('🎉 Correct answer! Well done!');
        } else {
            alert('❌ Wrong answer. Try again!');
        }
    };

    // Real scenes showcasing all features
    // NOTE: Add your images to public/assets/bg/ and public/assets/sprites/
    // The current URLs are expired Discord links - replace with your actual images!
    const scenes = [
        {
            bg: null, // Will show placeholder gradient
            character: {
                name: 'Monica',
                sprite: null, // Will show placeholder
                portrait: null, // Will show avatar placeholder
                position: 'center',
                emotion: 'happy'
            },
            dialogue: {
                name: 'Monica',
                text: 'Welcome to my Visual Novel! ✨ I\'m Monica, your guide through this showcase. Let me show you all the amazing features we have! Note: Add your images to see them here! 🖼️'
            }
        },
        {
            bg: null,
            character: {
                name: 'Monica',
                sprite: null,
                portrait: null,
                position: 'left',
                emotion: 'normal'
            },
            dialogue: {
                name: 'Monica',
                text: 'Look at that beautiful background! 🎨 We support full-screen backgrounds with custom overlays for the perfect atmosphere. Add your background images to public/assets/bg/'
            }
        },
        {
            bg: null,
            character: {
                name: 'Monica',
                sprite: null,
                portrait: null,
                position: 'right',
                emotion: 'happy'
            },
            dialogue: {
                name: 'Monica',
                text: 'Characters can appear in different positions - left, center, or right! Each position creates a dynamic storytelling experience. 📖'
            }
        },
        {
            bg: null,
            character: {
                name: 'Monica',
                sprite: null,
                portrait: null,
                position: 'center',
                emotion: 'happy'
            },
            dialogue: {
                name: 'Monica',
                text: 'Notice the portrait above the dialogue box? 👤 Character portraits change based on emotions - happy, sad, angry, or normal - each with unique colors and effects!'
            }
        },
        {
            bg: null,
            character: {
                name: 'Monica',
                sprite: null,
                portrait: null,
                position: 'left',
                emotion: 'normal'
            },
            dialogue: {
                name: 'Monica',
                text: 'Try clicking the Auto Play or Skip buttons in the top right! 🎮 These controls let you customize your reading experience.'
            }
        },
        {
            bg: null,
            character: {
                name: 'Monica',
                sprite: null,
                portrait: null,
                position: 'center',
                emotion: 'happy'
            },
            dialogue: {
                name: 'Monica',
                text: 'Check out those transition buttons! 🌟 You can create smooth scene changes with fade, slide, or circle transitions. Perfect for dramatic moments!'
            }
        },
        {
            bg: null,
            character: {
                name: 'Monica',
                sprite: null,
                portrait: null,
                position: 'right',
                emotion: 'happy'
            },
            dialogue: {
                name: 'Monica',
                text: 'Click "Show Choice Box" to see interactive decision points! ❓ These choices let players shape the story with beautiful animated options.'
            }
        },
        {
            bg: null,
            character: {
                name: 'Monica',
                sprite: null,
                portrait: null,
                position: 'center',
                emotion: 'normal'
            },
            dialogue: {
                name: 'Monica',
                text: 'That\'s all for now! 🎭 Navigate through the scenes using "Next Scene" to replay the showcase. Have fun creating your own Visual Novel!'
            }
        }
    ];

    const currentSceneData = scenes[currentScene];

    const nextScene = () => {
        if (currentScene < scenes.length - 1) {
            setCurrentScene(currentScene + 1);
        } else {
            setCurrentScene(0);
        }
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-gray-900">
            {/* Background with real image */}
            <Background 
                image={currentSceneData.bg}
                overlay={20}
            />

            {/* Character Sprite */}
            <CharacterSprite 
                name={currentSceneData.character.name}
                image={currentSceneData.character.sprite}
                position={currentSceneData.character.position}
                emotion={currentSceneData.character.emotion}
            />

            {/* Game Controls */}
            <GameControls
                onMenuClick={() => alert('Back to menu!')}
                autoPlay={autoPlay}
                skip={skip}
                onAutoPlayToggle={() => setAutoPlay(!autoPlay)}
                onSkipToggle={() => setSkip(!skip)}
            />

            {/* Demo Controls */}
            <div className="fixed bottom-40 left-4 right-4 flex flex-wrap gap-3 z-30">
                <button
                    onClick={nextScene}
                    className="px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl 
                             shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 
                             font-bold text-base hover:scale-105 active:scale-95 border-2 border-white/20
                             backdrop-blur-sm"
                >
                    ⏭️ Next Scene
                </button>
                <button
                    onClick={() => setShowChoiceBox(true)}
                    className="px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl 
                             shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 
                             font-semibold hover:scale-105 active:scale-95 border-2 border-white/20
                             backdrop-blur-sm"
                >
                    💬 Choice Box
                </button>
                <button
                    onClick={() => setShowAnswerBox(true)}
                    className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl 
                             shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 
                             font-semibold hover:scale-105 active:scale-95 border-2 border-white/20
                             backdrop-blur-sm"
                >
                    ✍️ Answer Box
                </button>
                <button
                    onClick={() => {
                        setTransitionType('fade');
                        setShowTransition(true);
                        setTimeout(() => setShowTransition(false), 1000);
                    }}
                    className="px-5 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl 
                             shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 
                             font-semibold hover:scale-105 active:scale-95 border-2 border-white/20
                             backdrop-blur-sm"
                >
                    ✨ Fade
                </button>
                <button
                    onClick={() => {
                        setTransitionType('slide');
                        setShowTransition(true);
                        setTimeout(() => setShowTransition(false), 1000);
                    }}
                    className="px-5 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl 
                             shadow-2xl hover:shadow-red-500/50 transition-all duration-300 
                             font-semibold hover:scale-105 active:scale-95 border-2 border-white/20
                             backdrop-blur-sm"
                >
                    ⚡ Slide
                </button>
                <button
                    onClick={() => {
                        setTransitionType('circle');
                        setShowTransition(true);
                        setTimeout(() => setShowTransition(false), 1000);
                    }}
                    className="px-5 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl 
                             shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 
                             font-semibold hover:scale-105 active:scale-95 border-2 border-white/20
                             backdrop-blur-sm"
                >
                    🌊 Circle
                </button>
            </div>

            {/* Dialogue Box */}
            <div>
                <DialogueBox 
                    name={currentSceneData.dialogue.name}
                    text={currentSceneData.dialogue.text}
                    isTyping={false}
                />
            </div>

            {/* Modals */}
            {showChoiceBox && (
                <ChoiceBox
                    choices={[
                        "This is the first choice option!",
                        "Here's a second choice with different text.",
                        "And a third choice for variety."
                    ]}
                    onSelect={handleChoiceSelect}
                />
            )}

            {showAnswerBox && (
                <AnswerBox
                    correctAnswer="Monica"
                    hint="What is the name of the character in this Visual Novel?"
                    onSubmit={handleAnswerSubmit}
                    onClose={() => setShowAnswerBox(false)}
                />
            )}

            {showTransition && (
                <TransitionOverlay
                    isActive={showTransition}
                    duration={500}
                    type={transitionType}
                />
            )}

            {/* Info Banner */}
            <div className="fixed top-4 left-4 bg-black/80 backdrop-blur-md 
                          text-white px-5 py-3 rounded-xl shadow-2xl z-50 border-2 border-white/20">
                <p className="text-sm font-bold flex items-center gap-2">
                    <span className="text-2xl">🎨</span>
                    UI Showcase - Scene {currentScene + 1}/{scenes.length}
                </p>
            </div>

            {/* Scene Progress Indicator */}
            <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-30">
                <div className="flex gap-2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                    {scenes.map((_, index) => (
                        <div
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === currentScene 
                                    ? 'bg-pink-400 w-8 shadow-lg shadow-pink-400/50' 
                                    : 'bg-white/30 hover:bg-white/50'
                            }`}
                            onClick={() => setCurrentScene(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UIShowcasePage;

