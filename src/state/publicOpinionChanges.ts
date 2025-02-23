import { useState, useEffect } from 'react';
import { GameState } from '../types/game';

interface PublicOpinionChangesProps {
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
}

export const usePublicOpinionChanges = ({ state, setState }: PublicOpinionChangesProps) => {
  useEffect(() => {
        const interval = setInterval(() => {
            setState(prev => {
                let opinionChange = 0;
                if (prev.O > prev.I) {
                    opinionChange = -1; // Negative opinion if O > I
                } else {
                    opinionChange = 0.5; // Slightly positive if I > O
                }

                // Adjust for events
                if (prev.events.type === 'outcry') {
                    opinionChange -= 2;
                } else if (prev.events.type === 'resistance') {
                    opinionChange -= 1;
                }

                const newOpinion = Math.max(-100, Math.min(100, prev.publicOpinion + opinionChange));

                return {
                    ...prev,
                    publicOpinion: newOpinion
                };
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [state.O, state.I, state.events.type, setState]);
};
