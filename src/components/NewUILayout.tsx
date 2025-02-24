import React from 'react';
import { Brain, TestTube2, Share2, Users, Bot, Factory, Zap, BookOpen, TrendingDown, TrendingUp, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

import { GameState } from '../types/game';

interface NewUILayoutProps {
  state: GameState;
  harvestEssence: () => void;
  produceDose: () => void;
  distributeDose: () => void;
  hireDistributor: () => void;
  purchaseAutoHarvester: () => void;
  purchaseAutoProducer: () => void;
  upgradeEfficiency: (type: keyof GameState['efficiencies']) => void;
  purchaseResearch: (researchKey: string) => void;
  startResearchProgress: (researchKey: string, duration: number) => void;
  researchProgress: { [key: string]: number };
  handleButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleResourceChange: (resourceName: string, amount: number, elementId: string, icon?: React.ReactNode) => void;
  setResearchProgress: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
  publicOpinionIcon: () => React.ReactNode;
}

const NewUILayout: React.FC<NewUILayoutProps> = ({
  state,
  harvestEssence,
  produceDose,
  distributeDose,
  hireDistributor,
  purchaseAutoHarvester,
  purchaseAutoProducer,
  upgradeEfficiency,
  purchaseResearch,
  startResearchProgress,
  researchProgress,
  handleButtonClick,
  handleResourceChange,
  setResearchProgress,
  publicOpinionIcon
}) => {
  const discoveredFeatures = state.discoveredFeatures || {};

  return (
    <div className="p-6 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Game UI</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Actions */}
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4">Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {discoveredFeatures.harvesting && (
              <button
                onClick={(e) => {
                  handleButtonClick(e);
                  harvestEssence();
                  handleResourceChange('Essence', Math.floor((state.efficiencies.harvesting * (state.events.type === 'outcry' ? 0.5 : 1) * state.I) / 25), 'counter-Essence', <Brain className="w-4 h-4 text-purple-400 inline-block" />);
                }}
                className="bg-indigo-600 hover:bg-indigo-700 p-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center gap-2 group relative"
              >
                <motion.div
                  whileHover={{ rotate: 12 }}
                  transition={{ duration: 0.3 }}
                >
                  <Brain className="w-5 h-5" />
                </motion.div>
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
                className="bg-purple-600 hover:bg-purple-700 p-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center gap-2 group relative"
                disabled={state.emotionalEssence < 8 / state.efficiencies.production}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <TestTube2 className="w-5 h-5" />
                </motion.div>
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
                className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center gap-2 group relative"
                disabled={state.doses < 1 || state.I < 1}
              >
                <motion.div
                  whileHover={{ rotate: 45 }}
                  transition={{ duration: 0.3 }}
                >
                  <Share2 className="w-5 h-5" />
                </motion.div>
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
                className="bg-green-600 hover:bg-green-700 p-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center gap-2 group relative"
                disabled={state.emotionalEssence < 75 * (state.distributors + 1)}
              >
                <motion.div
                  whileHover={{ scale: 1.25 }}
                  transition={{ duration: 0.3 }}
                >
                  <Users className="w-5 h-5" />
                </motion.div>
                Hire
              </button>
            )}
          </div>
        </div>

        {/* Automation */}
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4">Automation</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <button
                onClick={(e) => {
                  handleButtonClick(e);
                  purchaseAutoHarvester();
                  handleResourceChange('Auto Harvester', 1, 'counter-Essence', <Bot className="w-4 h-4 text-orange-400 inline-block" />);
                }}
                className="bg-orange-600 hover:bg-orange-700 w-full p-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2 group relative"
                disabled={state.emotionalEssence < 150 * (state.autoHarvester + 1)}
              >
                <motion.div
                  whileHover={{ rotate: 6 }}
                  transition={{ duration: 0.3 }}
                >
                  <Bot className="w-5 h-5" />
                </motion.div>
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
                className="bg-pink-600 hover:bg-pink-700 w-full p-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2 group relative"
                disabled={state.emotionalEssence < 200 * (state.autoProducer + 1)}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Factory className="w-5 h-5" />
                </motion.div>
                <div>
                  <div className="text-sm">Auto Producer</div>
                  <div className="text-xs text-pink-300">Level {state.autoProducer}</div>
                  <div className="text-xs text-pink-200">Cost: {200 * (state.autoProducer + 1)}</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Upgrades */}
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4">Upgrades</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(state.efficiencies).map(([type, level]) => (
              <button
                key={type}
                onClick={(e) => {
                  handleButtonClick(e);
                  upgradeEfficiency(type as keyof typeof state.efficiencies);
                  handleResourceChange('Upgrade', 1, 'counter-Essence', <Zap className="w-4 h-4 inline-block" />);
                }}
                className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 border border-gray-700 group relative"
                disabled={state.emotionalEssence < 40 * (level + 1)}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <motion.div
                    whileHover={{ scale: 1.25 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Zap className="w-5 h-5" />
                  </motion.div>
                  <h3 className="font-semibold capitalize">{type}</h3>
                </div>
                <p className="text-sm">Level {level}</p>
                <p className="text-xs text-gray-400">Cost: {40 * (level + 1)}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Research */}
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4">Research</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(state.research).map(([key, researchItem]) => (
              <button
                key={key}
                onClick={(e) => {
                  handleButtonClick(e);
                  if (!researchItem.purchased && state.researchPoints >= researchItem.cost) {
                    startResearchProgress(key, 5000);
                    purchaseResearch(key);
                    handleResourceChange('Research', 1, 'counter-Research', <BookOpen className="w-4 h-4 text-teal-400 inline-block" />);
                  }
                }}
                className={`bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 border ${researchItem.purchased ? 'border-green-500' : 'border-gray-700'} group relative`}
                disabled={researchItem.purchased || state.researchPoints < researchItem.cost}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-semibold">{researchItem.name}</h3>
                </div>
                <p className="text-sm">{researchItem.effect}</p>
                <p className="text-xs text-gray-400">Cost: {researchItem.cost} RP</p>
                {researchItem.purchased && <p className="text-xs text-green-500">Purchased</p>}
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

        {/* Public Opinion */}
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4">Public Opinion</h2>
          <div className="flex items-center justify-between">
            <div className='flex items-center gap-2'>
              {publicOpinionIcon()}
              <h2 className="text-lg font-semibold text-white">Public Opinion:</h2>
            </div>
            <motion.span
              className="text-xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {state.publicOpinion}
            </motion.span>
          </div>
        </div>

        {/* Events */}
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4">Events</h2>
          {state.events.active && state.discoveredFeatures.events && (
            <div className="bg-red-900/50 p-4 rounded-lg mb-6 text-center border border-red-700 transition-all animate-pulse">
              <p className="text-lg flex items-center justify-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <AlertTriangle className="w-5 h-5" />
                </motion.div>
                {state.events.type === 'resistance' && "Resistance Attack: Doses destroyed!"}
                {state.events.type === 'outcry' && "Public Outcry: Harvesting efficiency halved!"}
                {state.events.type === 'equipment' && "Equipment Failure: Automation disabled!"}
                {state.events.type === 'supply' && "Supply Disruption: Production costs doubled!"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewUILayout;
