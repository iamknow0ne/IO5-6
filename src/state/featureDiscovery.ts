import { useState, useEffect } from 'react';
import { GameState } from '../types/game';

interface FeatureDiscoveryProps {
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
}

export const useFeatureDiscovery = ({ state, setState }: FeatureDiscoveryProps) => {
  useEffect(() => {
    setState(prev => {
      const updates = { ...prev.discoveredFeatures };

      if (prev.I >= 10 && !prev.discoveredFeatures.harvesting) {
        updates.harvesting = true;
      }
      if (prev.emotionalEssence >= 30 && !prev.discoveredFeatures.production) {
        updates.production = true;
      }
      if (prev.doses >= 3 && !prev.discoveredFeatures.distribution) {
        updates.distribution = true;
      }
      if (prev.O >= 20 && !prev.discoveredFeatures.automation) {
        updates.automation = true;
      }
      if (prev.distributors >= 1 && !prev.discoveredFeatures.upgrades) {
        updates.upgrades = true;
      }
      if (prev.O >= 50 && !prev.discoveredFeatures.events) {
        updates.events = true;
      }
      if (prev.researchPoints >= 25 && !prev.discoveredFeatures.research) { // New
        updates.research = true;
      }
      if (prev.O >= 10 && !prev.discoveredFeatures.publicRelations) { // New - Unlock early
          updates.publicRelations = true;
      }

      return {
        ...prev,
        discoveredFeatures: updates
      };
    });
  }, [state.I, state.emotionalEssence, state.doses, state.O, state.distributors, state.discoveredFeatures, state.researchPoints, setState]);
};
