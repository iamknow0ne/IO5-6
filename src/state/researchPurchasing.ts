import { useState, useCallback } from 'react';
import { GameState } from '../types/game';

interface ResearchPurchasingProps {
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
}

export const useResearchPurchasing = ({ state, setState }: ResearchPurchasingProps) => {
  const purchaseResearch = useCallback((researchKey: string) => {
        setState(prev => {
            const researchItem = prev.research[researchKey];
            if (!researchItem || researchItem.purchased || prev.researchPoints < researchItem.cost) {
                return prev; // Not enough points or already purchased
            }

            let updatedEfficiencies = prev.efficiencies;
            if (researchKey === 'improvedHarvesting1') {
                updatedEfficiencies = {
                    ...updatedEfficiencies,
                    harvesting: updatedEfficiencies.harvesting * 2
                };
            } else if (researchKey === 'improvedProduction1'){
                updatedEfficiencies = {
                    ...updatedEfficiencies,
                    production: updatedEfficiencies.production * 2
                }
            }

            return {
                ...prev,
                researchPoints: prev.researchPoints - researchItem.cost,
                research: {
                    ...prev.research,
                    [researchKey]: { ...researchItem, purchased: true }
                },
                efficiencies: updatedEfficiencies
            };
        });
    }, [state.research, state.researchPoints, state.efficiencies, setState]);

  return { purchaseResearch };
};
