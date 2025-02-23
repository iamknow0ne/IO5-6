import { useState, useEffect } from 'react';
import { GameState } from '../types/game';

interface RandomEventsProps {
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
}

export const useRandomEvents = ({ state, setState }: RandomEventsProps) => {
  useEffect(() => {
        if (!state.discoveredFeatures.events) return;

        const interval = setInterval(() => {
            if (Math.random() > 0.1) return;

            const events: GameState['events']['type'][] = ['resistance', 'outcry', 'equipment', 'supply', 'civil war', 'pay raise']; // Added new events
            const eventType = events[Math.floor(Math.random() * events.length)];

            setState(prev => ({
                ...prev,
                events: {
                active: true,
                type: eventType,
                timer: Date.now() + 3000
                }
            }));
        }, 10000);

        return () => clearInterval(interval);
    }, [state.discoveredFeatures.events, setState]);
};
