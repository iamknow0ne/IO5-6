import { useState, useCallback } from 'react';
import { GameState } from '../types/game';

interface AutoProducerManagementProps {
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
}

export const useAutoProducerManagement = ({ state, setState }: AutoProducerManagementProps) => {
  const purchaseAutoProducer = useCallback(() => {
    setState(prev => {
      const cost = 200 * (prev.autoProducer + 1);
      if (prev.emotionalEssence < cost) return prev;

      return {
        ...prev,
        emotionalEssence: prev.emotionalEssence - cost,
        autoProducer: prev.autoProducer + 1
      };
    });
  }, [state.autoProducer, state.emotionalEssence, setState]);

  return { purchaseAutoProducer };
};
