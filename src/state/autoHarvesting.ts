import { useState, useEffect } from 'react';
import { GameState } from '../types/game';

interface AutoHarvestingProps {
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
}

export const useAutoHarvesting = ({ state, setState }: AutoHarvestingProps) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => {
        if (prev.autoHarvester === 0 || !prev.discoveredFeatures.automation) return prev; // Check for automation

        const multiplier = prev.events.type === 'outcry' ? 0.5 : 1;
        // Increased the base harvesting rate, and made it exponential
        const harvested = Math.floor(
          (prev.efficiencies.harvesting * multiplier * prev.I * prev.autoHarvester) * (1 + (prev.autoHarvester * 0.1)) / 25
        );

        return {
          ...prev,
          emotionalEssence: prev.emotionalEssence + harvested
        };
      });
    }, 100); // Faster updates

    return () => clearInterval(interval);
  }, [state.autoHarvester, state.efficiencies.harvesting, state.I, state.discoveredFeatures.automation, state.events.type, setState]);
};
