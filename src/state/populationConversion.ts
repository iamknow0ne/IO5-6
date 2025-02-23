import { useState, useCallback } from 'react';
import { GameState } from '../types/game';

interface PopulationConversionProps {
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
}

export const usePopulationConversion = ({ state, setState }: PopulationConversionProps) => {
  const convertPopulation = useCallback(() => {
      setState((prevState) => {
          let newIAccumulator = prevState.iAccumulator + 1;
          let integerIIncrease = Math.floor(newIAccumulator);
          let newOAccumulator = prevState.oAccumulator - 1;
          let integerODecrease = Math.floor(newOAccumulator);
          if(newOAccumulator < 0){
            integerODecrease = Math.ceil(newOAccumulator)
          }
        return {
          ...prevState,
          I: prevState.I + integerIIncrease,
          iAccumulator: newIAccumulator - integerIIncrease,
          O: prevState.O + integerODecrease,
          oAccumulator: newOAccumulator - integerODecrease
        }
      })
    }, [setState]);

  return { convertPopulation };
};
