import React from 'react';
import { motion } from 'framer-motion';
import { GameState } from '../types/game';
import { Brain, TestTube2, Share2, Users, Bot, Factory, Zap, BookOpen, TrendingDown, TrendingUp, AlertTriangle } from 'lucide-react';

interface DebugMenuProps {
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
  isVisible: boolean;
}

const DebugMenu: React.FC<DebugMenuProps> = ({ state, setState, isVisible }) => {
  if (!isVisible) return null;

  const handleChange = (key: keyof GameState, value: any) => {
    setState(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed bottom-0 left-0 w-full bg-gray-800 p-6 border-t border-gray-700 z-50"
    >
      <h2 className="text-2xl font-semibold mb-4">Debug Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Emotional Essence</h3>
          <input
            type="number"
            value={state.emotionalEssence}
            onChange={(e) => handleChange('emotionalEssence', Number(e.target.value))}
            className="w-full p-2 bg-gray-600 text-white rounded"
          />
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Doses</h3>
          <input
            type="number"
            value={state.doses}
            onChange={(e) => handleChange('doses', Number(e.target.value))}
            className="w-full p-2 bg-gray-600 text-white rounded"
          />
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">I</h3>
          <input
            type="number"
            value={state.I}
            onChange={(e) => handleChange('I', Number(e.target.value))}
            className="w-full p-2 bg-gray-600 text-white rounded"
          />
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">O</h3>
          <input
            type="number"
            value={state.O}
            onChange={(e) => handleChange('O', Number(e.target.value))}
            className="w-full p-2 bg-gray-600 text-white rounded"
          />
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Distributors</h3>
          <input
            type="number"
            value={state.distributors}
            onChange={(e) => handleChange('distributors', Number(e.target.value))}
            className="w-full p-2 bg-gray-600 text-white rounded"
          />
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Auto Harvester</h3>
          <input
            type="number"
            value={state.autoHarvester}
            onChange={(e) => handleChange('autoHarvester', Number(e.target.value))}
            className="w-full p-2 bg-gray-600 text-white rounded"
          />
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Auto Producer</h3>
          <input
            type="number"
            value={state.autoProducer}
            onChange={(e) => handleChange('autoProducer', Number(e.target.value))}
            className="w-full p-2 bg-gray-600 text-white rounded"
          />
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Population Growth Rate</h3>
          <input
            type="number"
            value={state.populationGrowthRate}
            onChange={(e) => handleChange('populationGrowthRate', Number(e.target.value))}
            className="w-full p-2 bg-gray-600 text-white rounded"
          />
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Research Points</h3>
          <input
            type="number"
            value={state.researchPoints}
            onChange={(e) => handleChange('researchPoints', Number(e.target.value))}
            className="w-full p-2 bg-gray-600 text-white rounded"
          />
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Public Opinion</h3>
          <input
            type="number"
            value={state.publicOpinion}
            onChange={(e) => handleChange('publicOpinion', Number(e.target.value))}
            className="w-full p-2 bg-gray-600 text-white rounded"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default DebugMenu;
