import { useState, useEffect } from 'react';
import { GameState } from '../types/game';

interface EventTimerProps {
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
}

export const useEventTimer = ({ state, setState }: EventTimerProps) => {
  useEffect(() => {
    if (!state.events.active || !state.events.timer) return;

    const timeout = setTimeout(() => {
      setState(prev => ({
        ...prev,
        events: { active: false, type: null, timer: null }
      }));
    }, state.events.timer - Date.now());

    return () => clearTimeout(timeout);
  }, [state.events.active, state.events.timer, setState]);
};
