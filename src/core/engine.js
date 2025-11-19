import { useState, useMemo, useCallback } from 'react';
import chapter1Data from '../data/chapter1.json';

const DEFAULT_STAGE = {
  background: {
    image: null,
    overlay: 25,
    transition: null,
  },
  characters: [],
  objects: [],
};

const deepClone = (value) => JSON.parse(JSON.stringify(value));

const getEntityId = (entity = {}, fallbackPrefix = 'entity') => {
  if (entity.id) return entity.id;
  if (entity.name) return `${fallbackPrefix}-${entity.name}`;
  if (entity.slot) return `${fallbackPrefix}-${entity.slot}`;
  if (entity.image) return `${fallbackPrefix}-${entity.image}`;
  return `${fallbackPrefix}-tmp`;
};

const mergeEntities = (current = [], updates = [], fallbackPrefix = 'entity') => {
  const entityMap = new Map(
    current.map((entity) => [getEntityId(entity, fallbackPrefix), entity])
  );

  updates.forEach((update) => {
    const id = getEntityId(update, fallbackPrefix);

    if (update.visible === false || update.remove) {
      entityMap.delete(id);
      return;
    }

    const prev = entityMap.get(id) || { id };
    entityMap.set(id, { ...prev, ...update, id });
  });

  return Array.from(entityMap.values()).sort((a, b) => (a.layer ?? 0) - (b.layer ?? 0));
};

const normalizeBackground = (bg) => {
  if (typeof bg === 'string') return { image: bg };
  if (!bg) return {};
  return bg;
};

const normalizeTransition = (transition) => {
  if (!transition) return null;
  if (typeof transition === 'string') return { type: transition, duration: 600 };
  return {
    type: transition.type || 'fade',
    duration: transition.duration || 600,
  };
};

const applyStageChanges = (stageState, updates = {}) => {
  const details = { transition: null };

  if (updates.reset === true) {
    stageState.background = { ...DEFAULT_STAGE.background };
    stageState.characters = [];
    stageState.objects = [];
  }

  if (Object.prototype.hasOwnProperty.call(updates, 'background')) {
    const bgUpdate = normalizeBackground(updates.background);
    stageState.background = {
      ...stageState.background,
      ...bgUpdate,
    };
    if (bgUpdate.transition) {
      details.transition = normalizeTransition(bgUpdate.transition);
    }
  }

  if (Array.isArray(updates.characters)) {
    stageState.characters = mergeEntities(stageState.characters, updates.characters, 'character');
  }

  if (Array.isArray(updates.objects)) {
    stageState.objects = mergeEntities(stageState.objects, updates.objects, 'object');
  }

  if (updates.transition) {
    details.transition = normalizeTransition(updates.transition);
  }

  return details;
};

const sanitizeLine = (line, index) => {
  if (!line) return null;
  if (line.type === 'guide') return null;
  if (line._comment && !line.type) return null;

  return {
    ...line,
    id: line.id || `line-${index + 1}`,
    type: line.type || 'dialogue',
  };
};

const buildChapter = (rawLines = []) => {
  const stageState = deepClone(DEFAULT_STAGE);
  const normalizedLines = [];
  const idIndexMap = {};
  let transitionCounter = 0;

  rawLines.forEach((raw, idx) => {
    const line = sanitizeLine(raw, idx);
    if (!line) return;

    const lineId = line.id;
    idIndexMap[lineId] = normalizedLines.length;

    const stageChanges = line.stage || {};
    const changeDetails = applyStageChanges(stageState, stageChanges);
    const transition = normalizeTransition(line.transition) || changeDetails.transition;
    const transitionKey = transition ? `${lineId}-transition-${transitionCounter++}` : null;

    const snapshot = deepClone(stageState);

    const speakerId =
      line.speakerId ||
      line.characterId ||
      (line.stage?.characters || []).find((char) => char.isSpeaking)?.id ||
      null;

    const normalizedLine = {
      ...line,
      id: lineId,
      speakerId,
      speakerName: line.speakerName || line.character || line.speaker || null,
      text: line.text ?? line.dialogue ?? '',
      stage: snapshot,
      transition,
      transitionKey,
    };

    normalizedLines.push(normalizedLine);
  });

  return { normalizedLines, idIndexMap };
};

/**
 * Hook inti yang mengelola alur narasi, scene, dan dialog VN.
 * Mendukung:
 * - Stage state (background, multiple characters, objects)
 * - Transisi per line maupun via stage
 * - Lompat ke line tertentu dengan id
 * @param {string} chapterId
 */
export function useVNEngine(chapterId) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { normalizedLines, idIndexMap } = useMemo(() => {
    const data = chapterId === 'chapter1' ? chapter1Data : [];
    return buildChapter(data);
  }, [chapterId]);

  const extendedChapter = useMemo(
    () => [
      ...normalizedLines,
      {
        id: 'end-buffer',
        type: 'endBuffer',
        stage: deepClone(DEFAULT_STAGE),
        text: '',
      },
    ],
    [normalizedLines]
  );

  const currentLine = extendedChapter[currentIndex] || null;

  const nextLine = useCallback(() => {
    if (currentIndex < extendedChapter.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      return true;
    }
    return false;
  }, [currentIndex, extendedChapter.length]);

  const jumpToLine = useCallback(
    (target) => {
      if (typeof target === 'number' && !Number.isNaN(target)) {
        const safeIndex = Math.max(0, Math.min(target, extendedChapter.length - 1));
        setCurrentIndex(safeIndex);
        return true;
      }

      if (typeof target === 'string' && target in idIndexMap) {
        setCurrentIndex(idIndexMap[target]);
        return true;
      }

      console.warn('[useVNEngine] jumpToLine target not found:', target);
      return false;
    },
    [extendedChapter.length, idIndexMap]
  );

  const isEndOfChapter = currentIndex >= extendedChapter.length - 1;

  return {
    currentLine,
    currentIndex,
    isEndOfChapter,
    nextLine,
    jumpToLine,
  };
}

export default useVNEngine;
