import React from 'react';
import { Bot, Factory } from 'lucide-react';

interface AutomationProps {
  state: any;
  purchaseAutoHarvester: () => void;
  purchaseAutoProducer: () => void;
  handleButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleResourceChange: (resourceName: string, amount: number, elementId: string, icon?: React.ReactNode) => void;
}

const Automation: React.FC<AutomationProps> = ({
  state,
  purchaseAutoHarvester,
  purchaseAutoProducer,
  handleButtonClick,
  handleResourceChange
}) => {
  return (
    state.discoveredFeatures.automation && (
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <button
            onClick={(e) => {
              handleButtonClick(e);
              purchaseAutoHarvester();
              handleResourceChange('Auto Harvester', 1, 'counter-Essence', <Bot className="w-4 h-4 text-orange-400 inline-block" />);
            }}
            className="bg-orange-600 hover:bg-orange-700 w-full p-3 rounded-lg transition flex items-center gap-2 group relative"
            disabled={state.emotionalEssence < 150 * (state.autoHarvester + 1)}
          >
            <Bot className="w-5 h-5 transition-transform group-hover:rotate-6" />
            <div>
              <div className="text-sm">Auto Harvester</div>
              <div className="text-xs text-orange-300">Level {state.autoHarvester}</div>
              <div className="text-xs text-orange-200">Cost: {150 * (state.autoHarvester + 1)}</div>
            </div>
          </button>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <button
            onClick={(e) => {
              handleButtonClick(e);
              purchaseAutoProducer();
              handleResourceChange('Auto Producer', 1, 'counter-Essence', <Factory className="w-4 h-4 text-pink-400 inline-block" />);

            }}
            className="bg-pink-600 hover:bg-pink-700 w-full p-3 rounded-lg transition flex items-center gap-2 group relative"
            disabled={state.emotionalEssence < 200 * (state.autoProducer + 1)}
          >
            <Factory className="w-5 h-5 transition-transform group-hover:scale-110" />
            <div>
              <div className="text-sm">Auto Producer</div>
              <div className="text-xs text-pink-300">Level {state.autoProducer}</div>
              <div className="text-xs text-pink-200">Cost: {200 * (state.autoProducer + 1)}</div>
            </div>
          </button>
        </div>
      </div>
    )
  );
};

export default Automation;
