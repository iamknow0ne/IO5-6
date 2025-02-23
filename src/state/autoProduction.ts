import { useState, useEffect } from 'react';
import { GameState } from '../types/game';

interface AutoProductionProps {
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
}

export const useAutoProduction = ({ state, setState }: AutoProductionProps) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => {
        if (prev.autoProducer === 0 || !prev.discoveredFeatures.automation) return prev; // Check for automation

        const cost = Math.ceil(8 / prev.efficiencies.production) *
          (prev.events.type === 'supply' ? 2 : 1);

        const maxProduction = Math.floor(prev.emotionalEssence / cost);
        const production = Math.min(maxProduction, prev.autoProducer);

        if (production <= 0) return prev;

        return {
          ...prev,
          emotionalEssence: prev.emotionalEssence - (cost * production),
          doses: prev.doses + production
        };
      });
    }, 100); // Faster updates

    return () => clearInterval(interval);
  }, [state.autoProducer, state.efficiencies.production, state.emotionalEssence, state.discoveredFeatures.automation, state.events.type, setState]);
};
