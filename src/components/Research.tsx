import React from 'react';
import { BookOpen } from 'lucide-react';

interface ResearchProps {
  state: any;
  purchaseResearch: (researchKey: string) => void;
  startResearchProgress: (researchKey: string, duration: number) => void;
  researchProgress: { [key: string]: number };
  handleButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleResourceChange: (resourceName: string, amount: number, elementId: string, icon?: React.ReactNode) => void;
}

const Research: React.FC<ResearchProps> = ({
  state,
  purchaseResearch,
  startResearchProgress,
  researchProgress,
  handleButtonClick,
  handleResourceChange
}) => {
  return (
    state.discoveredFeatures.research && (
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Research</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(state.research).map(([key, researchItem]) => (
            <button
              key={key}
              onClick={(e) => {
                handleButtonClick(e);
                // Start research progress and purchase
                if (!researchItem.purchased && state.researchPoints >= researchItem.cost) {
                  startResearchProgress(key, 5000); // 5 seconds for example
                  purchaseResearch(key);
                  handleResourceChange('Research', 1, 'counter-Research', <BookOpen className="w-4 h-4 text-teal-400 inline-block" />);
                }
              }}
              className={`bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition border ${researchItem.purchased ? 'border-green-500' : 'border-gray-700'} group relative`}
              disabled={researchItem.purchased || state.researchPoints < researchItem.cost}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <h3 className="font-semibold">{researchItem.name}</h3>
              </div>
              <p className="text-sm">{researchItem.effect}</p>
              <p className="text-xs text-gray-400">Cost: {researchItem.cost} RP</p>
              {researchItem.purchased && <p className="text-xs text-green-500">Purchased</p>}
              {/* Research Progress Bar */}
              {researchProgress[key] !== undefined && (
                <div className="absolute bottom-1 left-1 w-[calc(100%-0.5rem)] h-1 bg-gray-700 rounded">
                  <div
                    className="h-full bg-blue-500 rounded transition-all duration-100 ease-linear"
                    style={{ width: `${researchProgress[key]}%` }}
                  ></div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    )
  );
};

export default Research;
