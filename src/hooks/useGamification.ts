import { useState, useEffect } from 'react';

export interface GamificationState {
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalXp: number;
}

const XP_PER_LEVEL = 100;
const XP_MULTIPLIER = 1.2;

export function useGamification() {
  const [state, setState] = useState<GamificationState>({
    level: 1,
    xp: 0,
    xpToNextLevel: XP_PER_LEVEL,
    totalXp: 0,
  });

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('gamification');
    if (saved) {
      setState(JSON.parse(saved));
    }
  }, []);

  const calculateLevel = (totalXp: number) => {
    let level = 1;
    let xpNeeded = XP_PER_LEVEL;
    let xpCounted = 0;

    while (totalXp >= xpCounted + xpNeeded) {
      xpCounted += xpNeeded;
      level++;
      xpNeeded = Math.floor(XP_PER_LEVEL * Math.pow(XP_MULTIPLIER, level - 1));
    }

    return {
      level,
      xp: totalXp - xpCounted,
      xpToNextLevel: xpNeeded,
    };
  };

  const addXp = (amount: number) => {
    const newTotalXp = state.totalXp + amount;
    const newState = {
      ...calculateLevel(newTotalXp),
      totalXp: newTotalXp,
    };
    
    setState(newState);
    localStorage.setItem('gamification', JSON.stringify(newState));

    // Check for level up
    if (newState.level > state.level) {
      return { leveledUp: true, newLevel: newState.level };
    }
    return { leveledUp: false };
  };

  const reset = () => {
    const initialState = {
      level: 1,
      xp: 0,
      xpToNextLevel: XP_PER_LEVEL,
      totalXp: 0,
    };
    setState(initialState);
    localStorage.setItem('gamification', JSON.stringify(initialState));
  };

  return {
    ...state,
    addXp,
    reset,
    progressPercent: (state.xp / state.xpToNextLevel) * 100,
  };
}
