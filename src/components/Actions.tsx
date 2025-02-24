import React from 'react';
import { Brain, TestTube2, Share2, Users } from 'lucide-react';

interface ActionsProps {
  state: any;
  harvestEssence: () => void;
  produceDose: () => void;
  distributeDose: () => void;
  hireDistributor: () => void;
  handleButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleResourceChange: (resourceName: string, amount: number, elementId: string, icon?: React.ReactNode) => void;
}

const Actions: React.FC<ActionsProps> = ({
  state,
  harvestEssence,
  produceDose,
  distributeDose,
  hireDistributor,
  handleButtonClick,
  handleResourceChange
}) => {
  const discoveredFeatures = state.discoveredFeatures || {};

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {discoveredFeatures.harvesting && (
        <button
          onClick={(e) => {
            handleButtonClick(e);
            harvestEssence();
            handleResourceChange('Essence', Math.floor((state.efficiencies.harvesting * (state.events.type === 'outcry' ? 0.5 : 1) * state.I) / 25), 'counter-Essence', <Brain className="w-4 h-4 text-purple-400 inline-block" />);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 p-3 rounded-lg transition flex items-center justify-center gap-2 group relative"
        >
          <Brain className="w-5 h-5 transition-transform group-hover:rotate-12" />
          Harvest
        </button>
      )}
      {discoveredFeatures.production && (
        <button
          onClick={(e) => {
            handleButtonClick(e);
            produceDose();
            handleResourceChange('Doses', 1, 'counter-Doses', <TestTube2 className="w-4 h-4 text-green-400 inline-block" />);
          }}
          className="bg-purple-600 hover:bg-purple-700 p-3 rounded-lg transition flex items-center justify-center gap-2 group relative"
          disabled={state.emotionalEssence < 8 / state.efficiencies.production}
        >
          <TestTube2 className="w-5 h-5 transition-transform group-hover:scale-110" />
          Produce
        </button>
      )}
      {discoveredFeatures.distribution && (
        <button
          onClick={(e) => {
            handleButtonClick(e);
            const numToConvert = Math.min(state.efficiencies.distribution, state.I);
            distributeDose();
            handleResourceChange('I/O', numToConvert, 'counter-I', <Share2 className="w-4 h-4 text-yellow-400 inline-block" />);
          }}
          className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg transition flex items-center justify-center gap-2 group relative"
          disabled={state.doses < 1 || state.I < 1}
        >
          <Share2 className="w-5 h-5 transition-transform group-hover:rotate-45" />
          Distribute
        </button>
      )}
      {discoveredFeatures.automation && (
        <button
          onClick={(e) => {
            handleButtonClick(e);
            hireDistributor();
            handleResourceChange('Distributors', 1, 'counter-Distributors', <Users className="w-4 h-4 text-yellow-400 inline-block" />);
          }}
          className="bg-green-600 hover:bg-green-700 p-3 rounded-lg transition flex items-center justify-center gap-2 group relative"
          disabled={state.emotionalEssence < 75 * (state.distributors + 1)}
        >
          <Users className="w-5 h-5 transition-transform group-hover:scale-125" />
          Hire
        </button>
      )}
    </div>
  );
};

export default Actions;
