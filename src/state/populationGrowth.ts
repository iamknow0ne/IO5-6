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
        let growthRate = Math.max(prev.populationGrowthRate / 100 / 20, 3000 / 100 / 20); // Ensure minimum growth rate of 3000

        // Exponential growth based on current population
        let growthFactor = 1 + (prev.I / 1000); // Adjust the divisor to control the rate of exponential growth
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
    }, 50);  // Every 50ms

    return () => clearInterval(interval);
  }, [state.populationGrowthRate, state.I, state.growthAccumulator, state.iAccumulator, setState, setGrowthAccumulator, setIAccumulator]);
};
