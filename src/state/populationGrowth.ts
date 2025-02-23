import { useState, useEffect } from 'react';
import { GameState } from '../types/game';

interface PopulationGrowthProps {
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
  setGrowthAccumulator: React.Dispatch<React.SetStateAction<number>>;
  setIAccumulator: React.Dispatch<React.SetStateAction<number>>;
  setOAccumulator: React.Dispatch<React.SetStateAction<number>>;
}

export const usePopulationGrowth = ({ state, setState, setGrowthAccumulator, setIAccumulator, setOAccumulator }: PopulationGrowthProps) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => {
        let growthRate = prev.populationGrowthRate / 1000; // Base growth rate (adjust divisor for speed)

        // Exponential growth based on current population
        let growthFactor = 1 + (prev.I / 500); // Increased impact of I, adjust divisor to control exponentiality
        let growth = growthRate * growthFactor;
        let newGrowthAccumulator = prev.growthAccumulator + growth;
        let integerGrowth = Math.floor(newGrowthAccumulator);
        setGrowthAccumulator(newGrowthAccumulator - integerGrowth);

        // Update I and the I accumulator
        let newIAccumulator = prev.iAccumulator + integerGrowth;
        let integerIIncrease = Math.floor(newIAccumulator);
        setIAccumulator(newIAccumulator - integerIIncrease);

        const newI = prev.I + integerIIncrease; // Calculate new I value

        return {
          ...prev,
          I: newI,
          iAccumulator: newIAccumulator - integerIIncrease, // Store fractional part
          growthAccumulator: newGrowthAccumulator - integerGrowth
        };
      });
    }, 20);  // Reduced interval for faster updates

    return () => clearInterval(interval);
  }, [state.populationGrowthRate, state.I, state.growthAccumulator, state.iAccumulator, setState, setGrowthAccumulator, setIAccumulator]);
};
