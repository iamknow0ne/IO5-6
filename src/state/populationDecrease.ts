import { useState, useCallback } from 'react';
import { GameState } from '../types/game';

interface PopulationDecreaseProps {
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
}

export const usePopulationDecrease = ({ state, setState }: PopulationDecreaseProps) => {
  // New function to decrease population
    const decreasePopulation = useCallback((type: 'I' | 'O', amount: number) => {
      setState(prev => {
        // Decrease both the integer count and the accumulator
        const currentAccumulator = type === 'I' ? prev.iAccumulator : prev.oAccumulator;
        let newAccumulator = currentAccumulator - amount;
        let integerDecrease = 0;

        if (newAccumulator < 0) {
            integerDecrease = Math.ceil(newAccumulator); // Negative, so round down (towards -inf)
            newAccumulator -= integerDecrease;  // Keep it within [0, 1)
        }

        return {
            ...prev,
            [type]: Math.max(0, prev[type] + integerDecrease), // Ensure population doesn't go negative
            iAccumulator: type === 'I' ? newAccumulator : prev.iAccumulator,
            oAccumulator: type === 'O' ? newAccumulator : prev.oAccumulator,
        };
    });
}, [setState]);

  return { decreasePopulation };
};
