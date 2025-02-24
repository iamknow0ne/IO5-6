import React from 'react';
import { Users, Brain, TestTube2, Share2, BookOpen } from 'lucide-react';

interface CoreCountersProps {
  I: number;
  O: number;
  emotionalEssence: number;
  doses: number;
  distributors: number;
  researchPoints: number;
  discoveredFeatures?: {
    harvesting: boolean;
    production: boolean;
    automation: boolean;
    research: boolean;
  };
}

const CoreCounters: React.FC<CoreCountersProps> = ({
  I,
  O,
  emotionalEssence,
  doses,
  distributors,
  researchPoints,
  discoveredFeatures = {
    harvesting: false,
    production: false,
    automation: false,
    research: false,
  }
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 counter-container">
        <div className="flex items-center gap-2 mb-1">
          <Users className="w-5 h-5 text-blue-400" />
          <h2 className="font-semibold text-blue-400">I</h2>
        </div>
        <p id="counter-I" className="text-3xl text-blue-400">{I}</p>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 counter-container">
        <div className="flex items-center gap-2 mb-1">
          <Users className="w-5 h-5 text-red-400" />
          <h2 className="font-semibold text-red-400">O</h2>
        </div>
        <p id="counter-O" className="text-3xl text-red-400">{O}</p>
      </div>
      {discoveredFeatures.harvesting && (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 counter-container">
          <div className="flex items-center gap-2 mb-1">
            <Brain className="w-5 h-5 text-purple-400" />
            <h2 className="font-semibold text-purple-400">Essence</h2>
          </div>
          <p id="counter-Essence" className="text-2xl text-purple-400">{Math.floor(emotionalEssence)}</p>
        </div>
      )}
      {discoveredFeatures.production && (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 counter-container">
          <div className="flex items-center gap-2 mb-1">
            <TestTube2 className="w-5 h-5 text-green-400" />
            <h2 className="font-semibold text-green-400">Doses</h2>
          </div>
          <p id="counter-Doses" className="text-2xl text-green-400">{doses}</p>
        </div>
      )}
      {discoveredFeatures.automation && (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 counter-container">
          <div className="flex items-center gap-2 mb-1">
            <Share2 className="w-5 h-5 text-yellow-400" />
            <h2 className="font-semibold text-yellow-400">Distributors</h2>
          </div>
          <p id="counter-Distributors" className="text-2xl text-yellow-400">{distributors}</p>
        </div>
      )}
      {discoveredFeatures.research && (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 counter-container">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-5 h-5 text-teal-400" />
            <h2 className="font-semibold text-teal-400">Research</h2>
          </div>
          <p id="counter-Research" className="text-2xl text-teal-400">{researchPoints}</p>
        </div>
      )}
    </div>
  );
};

export default CoreCounters;
