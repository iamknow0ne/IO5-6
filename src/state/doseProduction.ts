import { useState, useCallback } from 'react';
import { GameState } from '../types/game';

interface DoseProductionProps {
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
}

export const useDoseProduction = ({ state, setState }: DoseProductionProps) => {
  const produceDose = useCallback(() => {
    setState(prev => {
      const cost = Math.ceil(8 / prev.efficiencies.production) *
        (prev.events.type === 'supply' ? 2 : 1);

      if (prev.emotionalEssence < cost) return prev;

      return {
        ...prev,
        emotionalEssence: prev.emotionalEssence - cost,
        doses: prev.doses + 1
      };
    });
  }, [state.efficiencies.production, state.emotionalEssence, state.events.type, setState]);

  return { produceDose };
};
