import { useState, useEffect } from 'react';
import { GameState } from '../types/game';

interface AutomationLoopProps {
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
  setIAccumulator: React.Dispatch<React.SetStateAction<number>>;
  setOAccumulator: React.Dispatch<React.SetStateAction<number>>;
}

export const useAutomationLoop = ({ state, setState, setIAccumulator, setOAccumulator }: AutomationLoopProps) => {
  useEffect(() => {
    if (state.distributors === 0 || !state.discoveredFeatures.automation) return; // Check for automation

    const interval = setInterval(() => {
      if (state.events.type === 'equipment') return;

      setState(prev => {
        if (prev.doses < prev.distributors || prev.I < 1) return prev;

        const numToConvert = Math.min(
          prev.efficiencies.distribution * prev.distributors,
          prev.I
        );

          let newOAccumulator = prev.oAccumulator + numToConvert;
          let integerOIncrease = Math.floor(newOAccumulator);
          setOAccumulator(newOAccumulator - integerOIncrease);

          let newIAccumulator = prev.iAccumulator - numToConvert;
          let integerIDecrease = Math.floor(newIAccumulator);
          if(newIAccumulator < 0){
              integerIDecrease = Math.ceil(newIAccumulator)
          }
          setIAccumulator(newIAccumulator - integerIDecrease);

        return {
          ...prev,
          doses: prev.doses - prev.distributors,
          O: prev.O + integerOIncrease,
          oAccumulator: newOAccumulator - integerOIncrease,
          I: prev.I + integerIDecrease,
          iAccumulator: newIAccumulator - integerIDecrease
        };
      });
    }, 1000 / state.efficiencies.automation);

    return () => clearInterval(interval);
}, [state.distributors, state.efficiencies.automation, state.events.type, state.doses, state.I, state.discoveredFeatures.automation, state.oAccumulator, state.iAccumulator, setState, setIAccumulator, setOAccumulator]);
};
