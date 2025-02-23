import { useState, useCallback } from 'react';
import { GameState } from '../types/game';

interface AutoHarvesterManagementProps {
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
}

export const useAutoHarvesterManagement = ({ state, setState }: AutoHarvesterManagementProps) => {
  const purchaseAutoHarvester = useCallback(() => {
    setState(prev => {
      const cost = 150 * (prev.autoHarvester + 1);
      if (prev.emotionalEssence < cost) return prev;

      return {
        ...prev,
        emotionalEssence: prev.emotionalEssence - cost,
        autoHarvester: prev.autoHarvester + 1
      };
    });
  }, [state.autoHarvester, state.emotionalEssence, setState]);

  return { purchaseAutoHarvester };
};
