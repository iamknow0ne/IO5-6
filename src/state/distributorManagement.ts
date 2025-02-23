import { useState, useCallback } from 'react';
import { GameState } from '../types/game';

interface DistributorManagementProps {
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
}

export const useDistributorManagement = ({ state, setState }: DistributorManagementProps) => {
  const hireDistributor = useCallback(() => {
    setState(prev => {
      const cost = 75 * (prev.distributors + 1);
      if (prev.emotionalEssence < cost) return prev;

      return {
        ...prev,
        emotionalEssence: prev.emotionalEssence - cost,
        distributors: prev.distributors + 1
      };
    });
  }, [state.distributors, state.emotionalEssence, setState]);

  return { hireDistributor };
};
