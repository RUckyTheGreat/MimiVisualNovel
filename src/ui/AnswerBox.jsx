import React, { useState } from 'react';

function AnswerBox({
    correctAnswer,
    hint = "Enter your answer:",
    onSubmit,
}) {
    const [answer, setAnswer] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userAnswer = answer.trim().toLowerCase();
        const correct = correctAnswer.trim().toLowerCase();
        const correct_answer = userAnswer === correct;

        setIsCorrect(correct_answer);
        setShowResult(true);

        if (onSubmit) {
            onSubmit({
                type: 'answer',
                userAnswer,
                correctAnswer,
                isCorrect: correct_answer,
            });
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center 
                        bg-black/70 backdrop-blur-sm z-50 animate-fadeIn">
            <div className="w-full max-w-2xl p-8 bg-white rounded-2xl shadow-lg 
                            border-2 border-vn-primary/30 animate-scaleIn">
                
                <h3 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r 
                               from-vn-primary to-pink-600 bg-clip-text text-transparent">
                    💭 Answer Question
                </h3>

                <p className="text-lg text-gray-700 mb-6 text-center">{hint}</p>

                {!showResult ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="
                                w-full p-3 rounded-md text-gray-900
                                placeholder-gray-400
                                bg-white border border-gray-300
                                focus:outline-none focus:ring-2 focus:ring-pink-500
                            "
                            placeholder="Type your answer..."
                            autoFocus
                        />

                        <button
                            type="submit"
                            className="w-full px-6 py-3 bg-gradient-to-r 
                                       from-vn-primary to-pink-600 text-white font-bold 
                                       rounded-xl shadow-lg hover:from-pink-600 
                                       hover:to-pink-700 transition-all transform 
                                       hover:scale-105 active:scale-95"
                        >
                            ✓ Submit
                        </button>
                    </form>
                ) : (
                    <div className={`text-center py-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                        <div className="text-7xl mb-4">{isCorrect ? '✅' : '❌'}</div>
                        <div className="text-3xl font-bold mb-2">
                            {isCorrect ? 'Correct!' : 'Incorrect!'}
                        </div>
                        {!isCorrect && (
                            <div className="text-lg text-gray-600">
                                The correct answer was: <span className="font-bold">{correctAnswer}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AnswerBox;
