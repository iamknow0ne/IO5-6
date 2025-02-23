import React from 'react';
import { Zap } from 'lucide-react';

interface UpgradesProps {
  state: any;
  upgradeEfficiency: (type: keyof typeof state.efficiencies) => void;
  handleButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleResourceChange: (resourceName: string, amount: number, elementId: string, icon?: React.ReactNode) => void;
}

const Upgrades: React.FC<UpgradesProps> = ({
  state,
  upgradeEfficiency,
  handleButtonClick,
  handleResourceChange
}) => {
  return (
    state.discoveredFeatures.upgrades && (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {Object.entries(state.efficiencies).map(([type, level]) => (
          <button
            key={type}
            onClick={(e) => {
              handleButtonClick(e);
              upgradeEfficiency(type as keyof typeof state.efficiencies);
              handleResourceChange('Upgrade', 1, 'counter-Essence', <Zap className="w-4 h-4 inline-block" />);
            }}
            className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition border border-gray-700 group relative"
            disabled={state.emotionalEssence < 40 * (level + 1)}
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <Zap className="w-5 h-5 transition-transform group-hover:scale-125" />
              <h3 className="font-semibold capitalize">{type}</h3>
            </div>
            <p className="text-sm">Level {level}</p>
            <p className="text-xs text-gray-400">Cost: {40 * (level + 1)}</p>
          </button>
        ))}
      </div>
    )
  );
};

export default Upgrades;
