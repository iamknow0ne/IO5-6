import { useState, useCallback } from 'react';
import { GameState } from '../types/game';

interface DoseDistributionProps {
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
  setIAccumulator: React.Dispatch<React.SetStateAction<number>>;
  setOAccumulator: React.Dispatch<React.SetStateAction<number>>;
}

export const useDoseDistribution = ({ state, setState, setIAccumulator, setOAccumulator }: DoseDistributionProps) => {
  const distributeDose = useCallback(() => {
        setState(prev => {
            if (prev.doses < 1 || prev.I < 1) return prev;

            const numToConvert = Math.min(prev.efficiencies.distribution, prev.I);
            let newOAccumulator = prev.oAccumulator + numToConvert;
            let integerOIncrease = Math.floor(newOAccumulator);
            setOAccumulator(newOAccumulator - integerOIncrease);

            // Assuming you also want to decrease 'I' and its accumulator
            let newIAccumulator = prev.iAccumulator - numToConvert;
            let integerIDecrease = Math.floor(newIAccumulator);
            if(newIAccumulator < 0){
                integerIDecrease = Math.ceil(newIAccumulator)
            }
            setIAccumulator(newIAccumulator - integerIDecrease);

            return {
                ...prev,
                doses: prev.doses - 1,
                O: prev.O + integerOIncrease,
                oAccumulator: newOAccumulator - integerOIncrease,
                I: prev.I + integerIDecrease,
                iAccumulator: newIAccumulator - integerIDecrease
            };
        });
    }, [state.doses, state.I, state.efficiencies.distribution, state.oAccumulator, state.iAccumulator, setState, setIAccumulator, setOAccumulator]); // Include accumulators

  return { distributeDose };
};
