import { useState, useEffect, useCallback } from 'react';
import { GameState } from '../types/game';
import { INITIAL_STATE } from '../state/initialState';
import { usePopulationGrowth } from '../state/populationGrowth';
import { useFeatureDiscovery } from '../state/featureDiscovery';
import { useAutoHarvesting } from '../state/autoHarvesting';
import { useAutoProduction } from '../state/autoProduction';
import { useEssenceHarvesting } from '../state/essenceHarvesting';
import { useDoseProduction } from '../state/doseProduction';
import { useDoseDistribution } from '../state/doseDistribution';
import { useDistributorManagement } from '../state/distributorManagement';
import { useAutoHarvesterManagement } from '../state/autoHarvesterManagement';
import { useAutoProducerManagement } from '../state/autoProducerManagement';
import { useEfficiencyUpgrades } from '../state/efficiencyUpgrades';
import { useAutomationLoop } from '../state/automationLoop';
import { useRandomEvents } from '../state/randomEvents';
import { useEventTimer } from '../state/eventTimer';
import { useResearchPointGeneration } from '../state/researchPointGeneration';
import { usePublicOpinionChanges } from '../state/publicOpinionChanges';
import { useResearchPurchasing } from '../state/researchPurchasing';
import { usePopulationDecrease } from '../state/populationDecrease';
import { usePopulationConversion } from '../state/populationConversion';

export function useGameState() {
  const [state, setState] = useState<GameState>(INITIAL_STATE);
  const [growthAccumulator, setGrowthAccumulator] = useState(0);
  const [iAccumulator, setIAccumulator] = useState(0);
  const [oAccumulator, setOAccumulator] = useState(0);

  usePopulationGrowth({ state, setState, setGrowthAccumulator, setIAccumulator, setOAccumulator });
  useFeatureDiscovery({ state, setState });
  useAutoHarvesting({ state, setState });
  useAutoProduction({ state, setState });
  const { harvestEssence } = useEssenceHarvesting({ state, setState });
  const { produceDose } = useDoseProduction({ state, setState });
  const { distributeDose } = useDoseDistribution({ state, setState, setIAccumulator, setOAccumulator });
  const { hireDistributor } = useDistributorManagement({ state, setState });
  const { purchaseAutoHarvester } = useAutoHarvesterManagement({ state, setState });
  const { purchaseAutoProducer } = useAutoProducerManagement({ state, setState });
  const { upgradeEfficiency } = useEfficiencyUpgrades({ state, setState });
  useAutomationLoop({ state, setState, setIAccumulator, setOAccumulator });
  useRandomEvents({ state, setState });
  useEventTimer({ state, setState });
  useResearchPointGeneration({ state, setState });
  usePublicOpinionChanges({ state, setState });
  const { purchaseResearch } = useResearchPurchasing({ state, setState });
  const { decreasePopulation } = usePopulationDecrease({ state, setState });
  const { convertPopulation } = usePopulationConversion({ state, setState });

  return {
    state,
    setState,
    harvestEssence,
    produceDose,
    distributeDose,
    hireDistributor,
    purchaseAutoHarvester,
    purchaseAutoProducer,
    upgradeEfficiency,
    purchaseResearch,
    decreasePopulation,
    convertPopulation
  };
}
