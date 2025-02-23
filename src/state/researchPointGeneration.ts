import { useState, useEffect } from 'react';
import { GameState } from '../types/game';

interface ResearchPointGenerationProps {
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
}

export const useResearchPointGeneration = ({ state, setState }: ResearchPointGenerationProps) => {
  useEffect(() => {
        const interval = setInterval(() => {
            setState(prev => ({
                ...prev,
                researchPoints: prev.researchPoints + 1
            }));
        }, 5000); // 1 research point every 5 seconds

        return () => clearInterval(interval);
    }, [setState]);
};
