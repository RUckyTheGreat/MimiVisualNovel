import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useVNEngine from '../../core/engine';

import Background from '../../ui/Background';
import DialogueBox from '../../ui/DialogueBox';
import SceneTextBox from '../../ui/SceneTextBox';
import CharacterSprite from '../../ui/CharacterSprite';
import ChoiceBox from '../../ui/ChoiceBox';
import AnswerBox from '../../ui/AnswerBox';
import LoseOverlay from '../../ui/LoseOverlay';

import TransitionOverlay from '../../ui/TransitionOverlay';
import useSceneTransition from '../../core/useSceneTransition';

function Chapter1Page() {
  const { currentLine, currentIndex, isEndOfChapter, nextLine, jumpToLine } = useVNEngine('chapter1');
  
  const [showChoice, setShowChoice] = useState(false);
  const [currentChoices, setCurrentChoices] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answerData, setAnswerData] = useState({});
  const [isLose, setIsLose] = useState(false);

  const { transitionActive, transitionType, transitionDuration } = useSceneTransition(currentLine);

  const activeStage = currentLine?.stage;
  const activeSpeakerId = currentLine?.speakerId;
  const displayName = useMemo(() => {
    if (currentLine?.speakerName) return currentLine.speakerName;
    if (!activeStage?.characters?.length || !activeSpeakerId) return currentLine?.character || null;
    const speakingChar = activeStage.characters.find(char => char.id === activeSpeakerId);
    return speakingChar?.name || speakingChar?.id || null;
  }, [activeSpeakerId, activeStage?.characters, currentLine?.character, currentLine?.speakerName]);

  // Reset UI tiap line
  useEffect(() => {
    setShowChoice(false);
    setShowAnswer(false);

    if (currentLine?.type === 'choice') {
      setCurrentChoices(currentLine.choices || []);
      setShowChoice(true);
    } 
    else if (currentLine?.type === 'question') {
      setAnswerData({
        correctAnswer: currentLine.correctAnswer,
        hint: currentLine.hint,
        consequenceIfCorrect: currentLine.consequenceIfCorrect || 'continue',
        consequenceIfWrong: currentLine.consequenceIfWrong || 'neutral',
      });
      setShowAnswer(true);
    }
  }, [currentLine]);

  const handleScreenClick = () => {
    if (!isEndOfChapter && !showChoice && !showAnswer && !isLose) {
      nextLine();
    }
  };

  const handleResult = (result) => {
    const { result: res, jumpTo } = result;

    if (jumpTo) jumpToLine(jumpTo);
    else if (res === 'lose') setIsLose(true);
    else nextLine();
  };

  const handleChoiceSelect = (index) => {
    const choice = currentChoices[index];
    setShowChoice(false);

    handleResult({
      type: 'choice',
      result: choice.result || 'neutral',
      jumpTo: choice.jumpTo || null
    });
  };

  const handleAnswerSubmit = (res) => {
    setShowAnswer(false);

    const resultType = res.isCorrect ? answerData.consequenceIfCorrect : answerData.consequenceIfWrong;

    handleResult({
      type: 'answer',
      ...res,
      result: resultType
    });
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden cursor-pointer"
      onClick={handleScreenClick}
    >
      {/*transition */}
      {transitionType && (
        <TransitionOverlay active={transitionActive} type={transitionType} duration={transitionDuration} />
      )}



      {/* Background */}
      <Background image={activeStage?.background?.image} overlay={activeStage?.background?.overlay ?? 20} />

      {/* Stage objects */}
      {activeStage?.objects?.map((obj) => (
        <CharacterSprite
          key={`object-${obj.id}`}
          name={obj.name || obj.id}
          image={obj.image}
          position={obj.position || 'center'}
          movement={obj.movement}
          variant="object"
          layer={obj.layer ?? 10}
          scale={obj.scale ?? 0.6}
          offsetY={obj.offsetY ?? 0}
          assetType={obj.assetType || 'sprites'}
        />
      ))}

      {/* Characters */}
      {activeStage?.characters?.map((character) => (
        <CharacterSprite
          key={`char-${character.id}`}
          name={character.name || character.id}
          image={character.image}
          position={character.position || 'center'}
          movement={character.movement}
          layer={character.layer ?? 20}
          scale={character.scale ?? 1}
          offsetY={character.offsetY ?? 0}
          isFocused={
            activeSpeakerId
              ? character.id === activeSpeakerId
              : character.isSpeaking || false
          }
          assetType={character.assetType || 'sprites'}
        />
      ))}

      <AnimatePresence mode="wait">
        {/* Dialogue */}
        {currentLine?.type === 'dialogue' && !isEndOfChapter && (
          <motion.div
            key={`dialogue-${currentIndex}`}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 25 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 z-20 flex flex-col justify-end"
          >
            <DialogueBox name={displayName} text={currentLine.text} />
          </motion.div>
        )}

        {/* Narration */}
        {currentLine?.type === 'narration' && !isEndOfChapter && (
          <motion.div
            key={`narration-${currentIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 z-20"
          >
            <SceneTextBox text={currentLine.text} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Choice */}
      {showChoice && !isLose && (
        <ChoiceBox
          choices={currentChoices}
          onSelect={handleChoiceSelect}
        />
      )}

      {/* Answer */}
      {showAnswer && !isLose && (
        <AnswerBox
          correctAnswer={answerData.correctAnswer}
          hint={answerData.hint}
          onSubmit={handleAnswerSubmit}
        />
      )}

      {/* Lose */}
      {isLose && (
        <LoseOverlay
          onRestart={() => window.location.reload()}
          onMenu={() => window.location.href = '/'}
        />
      )}

      {/* End Chapter */}
      {isEndOfChapter && !isLose && (
        <motion.div
          key="chapter-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 z-30 flex flex-col justify-center items-center bg-black/70"
        >
          <h1 className="text-5xl font-bold text-white mb-6">The End</h1>
          <button
            className="px-6 py-3 bg-vn-primary text-white rounded-lg"
            onClick={() => window.location.href = '/'}
          >
            Back to Menu
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default Chapter1Page;
