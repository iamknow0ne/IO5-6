import { useState, useCallback } from 'react';
import { GameState } from '../types/game';

interface EfficiencyUpgradesProps {
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
}

export const useEfficiencyUpgrades = ({ state, setState }: EfficiencyUpgradesProps) => {
  const upgradeEfficiency = useCallback((type: keyof GameState['efficiencies']) => {
    setState(prev => {
      const cost = 40 * (prev.efficiencies[type] + 1);
      if (prev.emotionalEssence < cost) return prev;

      return {
        ...prev,
        emotionalEssence: prev.emotionalEssence - cost,
        efficiencies: {
          ...prev.efficiencies,
          [type]: prev.efficiencies[type] + 1
        }
      };
    });
  }, [state.efficiencies, state.emotionalEssence, setState]);

  return { upgradeEfficiency };
};
