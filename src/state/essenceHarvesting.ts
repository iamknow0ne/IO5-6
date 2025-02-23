import { useState, useCallback } from 'react';
import { GameState } from '../types/game';

interface EssenceHarvestingProps {
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
}

export const useEssenceHarvesting = ({ state, setState }: EssenceHarvestingProps) => {
  const harvestEssence = useCallback(() => {
    setState(prev => {
      const multiplier = prev.events.type === 'outcry' ? 0.5 : 1;
        // Increased base harvest, and made it slightly exponential
        const harvested = Math.floor(
            (prev.efficiencies.harvesting * multiplier * prev.I) * (1 + (prev.efficiencies.harvesting * 0.05)) / 25
        );
      return {
        ...prev,
        emotionalEssence: prev.emotionalEssence + harvested
      };
    });
  }, [state.efficiencies.harvesting, state.I, state.events.type, setState]);

  return { harvestEssence };
};
