
import React from 'react';
import { useGameState } from './hooks/useGameState';
import { Brain, Factory, TestTube2, Share2, Users, Zap, Bot, TrendingDown, TrendingUp, BookOpen } from 'lucide-react';

function App() {
  const {
    state,
    harvestEssence,
    produceDose,
    distributeDose,
    hireDistributor,
    purchaseAutoHarvester,
    purchaseAutoProducer,
    upgradeEfficiency,
    purchaseResearch // New
  } = useGameState();

  const percentConverted = ((state.O / (state.O + state.I)) * 100).toFixed(1);
  const textColor = `rgb(${255 - (255 * Number(percentConverted) / 100)})`;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: textColor }}>
          I O 5-6
        </h1>

        {/* Core Counters - Always visible */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-blue-400" />
              <h2 className="font-semibold text-blue-400">I</h2>
            </div>
            <p className="text-3xl text-blue-400">{state.I}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-red-400" />
              <h2 className="font-semibold text-red-400">O</h2>
            </div>
            <p className="text-3xl text-red-400">{state.O}</p>
          </div>
        </div>

        {/* Resources */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {state.discoveredFeatures.harvesting && (
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-5 h-5" />
                <h2 className="font-semibold">Essence</h2>
              </div>
              <p className="text-2xl">{Math.floor(state.emotionalEssence)}</p>
            </div>
          )}
          {state.discoveredFeatures.production && (
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TestTube2 className="w-5 h-5" />
                <h2 className="font-semibold">Doses</h2>
              </div>
              <p className="text-2xl">{state.doses}</p>
            </div>
          )}
          {state.discoveredFeatures.automation && (
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Share2 className="w-5 h-5" />
                <h2 className="font-semibold">Distributors</h2>
              </div>
              <p className="text-2xl">{state.distributors}</p>
            </div>
          )}
            {state.discoveredFeatures.research && ( // New
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5" />
                <h2 className="font-semibold">Research Points</h2>
              </div>
              <p className="text-2xl">{state.researchPoints}</p>
            </div>
          )}
        