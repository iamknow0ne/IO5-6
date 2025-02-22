import React, { useState, useRef, useEffect } from 'react';
import { useGameState } from './hooks/useGameState';
import { Brain, Factory, TestTube2, Share2, Users, Zap, Bot, TrendingDown, TrendingUp, BookOpen, ThumbsUp, ThumbsDown, AlertTriangle } from 'lucide-react';

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
    purchaseResearch
  } = useGameState();

  const [notifications, setNotifications] = useState<{ id: number; text: string; top: number; left: number }[]>([]);
  const notificationId = useRef(0);

  const addNotification = (text: string, top: number, left: number) => {
    const id = notificationId.current++;
    setNotifications(prev => [...prev, { id, text, top, left }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 2000);
  };

    // Simplified handleResourceChange (no longer needs the action function)
    const handleResourceChange = (resourceName: string, amount: number, elementId: string) => {
        const element = document.getElementById(elementId);
        if (element) {
            const rect = element.getBoundingClientRect();
            const top = rect.top + window.scrollY;
            const left = rect.left + rect.width / 2 + window.scrollX;
            addNotification(`${amount > 0 ? '+' : ''}${amount} ${resourceName}`, top - 40, left); // Show notification
        }
    };

    // Simplified handleButtonClick (only handles adding/removing the animation class)
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    button.classList.add('animate-sparkle');
    setTimeout(() => {
      button.classList.remove('animate-sparkle');
    }, 300); //  0.3 seconds matches the CSS animation duration
  };

  const percentConverted = ((state.O / (state.O + state.I)) * 100).toFixed(1);
  const textColor = `rgb(${255 - (255 * Number(percentConverted) / 100)})`;
    const backgroundColor = `rgba(${255 * (Number(percentConverted) / 100)}, 0, ${255 - (255 * (Number(percentConverted) / 100))}, 0.1)`;

    const publicOpinionIcon = () => {
        if (state.publicOpinion >= 75) {
            return <ThumbsUp className="w-6 h-6 text-green-500" />;
        } else if (state.publicOpinion >= 25) {
            return <TrendingUp className="w-6 h-6 text-yellow-500" />;
        } else {
            return <TrendingDown className="w-6 h-6 text-red-500" />;
        }
    };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 transition-colors duration-500" style={{ backgroundColor: backgroundColor }}>
      <div className="max-w-6xl mx-auto relative"> {/* Added relative for absolute positioning of notifications */}
        <h1 className="text-4xl font-bold mb-6 text-center" style={{ color: textColor }}>
          I O 5-6
        </h1>

        {/* Core Counters */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 counter-container">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-5 h-5 text-blue-400" />
              <h2 className="font-semibold text-blue-400">I</h2>
            </div>
            <p id="counter-I" className="text-3xl text-blue-400">{state.I}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 counter-container">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-5 h-5 text-red-400" />
              <h2 className="font-semibold text-red-400">O</h2>
            </div>
            <p id="counter-O" className="text-3xl text-red-400">{state.O}</p>
          </div>
          {state.discoveredFeatures.harvesting && (
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 counter-container">
              <div className="flex items-center gap-2 mb-1">
                <Brain className="w-5 h-5 text-purple-400" />
                <h2 className="font-semibold text-purple-400">Essence</h2>
              </div>
              <p id="counter-Essence" className="text-2xl text-purple-400">{Math.floor(state.emotionalEssence)}</p>
            </div>
          )}
          {state.discoveredFeatures.production && (
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 counter-container">
              <div className="flex items-center gap-2 mb-1">
                <TestTube2 className="w-5 h-5 text-green-400" />
                <h2 className="font-semibold text-green-400">Doses</h2>
              </div>
              <p id="counter-Doses" className="text-2xl text-green-400">{state.doses}</p>
            </div>
          )}
          {state.discoveredFeatures.automation && (
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 counter-container">
              <div className="flex items-center gap-2 mb-1">
                <Share2 className="w-5 h-5 text-yellow-400" />
                <h2 className="font-semibold text-yellow-400">Distributors</h2>
              </div>
              <p id="counter-Distributors" className="text-2xl text-yellow-400">{state.distributors}</p>
            </div>
          )}
          {state.discoveredFeatures.research && (
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 counter-container">
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="w-5 h-5 text-teal-400" />
                <h2 className="font-semibold text-teal-400">Research</h2>
              </div>
              <p id="counter-Research" className="text-2xl text-teal-400">{state.researchPoints}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {state.discoveredFeatures.harvesting && (
            <button
                onClick={(e) => {
                    handleButtonClick(e); // Add sparkle
                    harvestEssence();  // Call the action directly
                    handleResourceChange('Essence', Math.floor((state.efficiencies.harvesting * (state.events.type === 'outcry' ? 0.5 : 1) * state.I) / 25), 'counter-Essence'); // Update notification
                }}
              className="bg-indigo-600 hover:bg-indigo-700 p-3 rounded-lg transition flex items-center justify-center gap-2 group relative"
            >
              <Brain className="w-5 h-5 transition-transform group-hover:rotate-12" />
              Harvest
            </button>
          )}
          {state.discoveredFeatures.production && (
            <button
                onClick={(e) => {
                    handleButtonClick(e);
                    produceDose();
                    handleResourceChange('Doses', 1, 'counter-Doses');
                }}
              className="bg-purple-600 hover:bg-purple-700 p-3 rounded-lg transition flex items-center justify-center gap-2 group relative"
              disabled={state.emotionalEssence < 8 / state.efficiencies.production}
            >
              <TestTube2 className="w-5 h-5 transition-transform group-hover:scale-110" />
              Produce
            </button>
          )}
          {state.discoveredFeatures.distribution && (
            <button
                onClick={(e) => {
                    handleButtonClick(e);
                    const numToConvert = Math.min(state.efficiencies.distribution, state.I);
                    distributeDose();
                    handleResourceChange('I/O', numToConvert, 'counter-I');
                }}
              className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg transition flex items-center justify-center gap-2 group relative"
              disabled={state.doses < 1 || state.I < 1}
            >
              <Share2 className="w-5 h-5 transition-transform group-hover:rotate-45" />
              Distribute
            </button>
          )}
          {state.discoveredFeatures.automation && (
            <button
                onClick={(e) => {
                    handleButtonClick(e);
                    hireDistributor();
                    handleResourceChange( 'Distributors', 1, 'counter-Distributors');
                }}
              className="bg-green-600 hover:bg-green-700 p-3 rounded-lg transition flex items-center justify-center gap-2 group relative"
              disabled={state.emotionalEssence < 75 * (state.distributors + 1)}
            >
              <Users className="w-5 h-5 transition-transform group-hover:scale-125" />
              Hire
            </button>
          )}
        </div>

        {/* Automation */}
        {state.discoveredFeatures.automation && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <button
                onClick={(e) => {
                    handleButtonClick(e);
                    purchaseAutoHarvester();
                    handleResourceChange('Auto Harvester', 1, 'counter-Essence');
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
                    handleResourceChange('Auto Producer', 1, 'counter-Essence');

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
        )}

        {/* Upgrades */}
        {state.discoveredFeatures.upgrades && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {Object.entries(state.efficiencies).map(([type, level]) => (
              <button
                key={type}
                onClick={(e) => {
                    handleButtonClick(e);
                    upgradeEfficiency(type as keyof typeof state.efficiencies);
                    handleResourceChange('Upgrade', 1, 'counter-Essence');
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
        )}

        {/* Research */}
        {state.discoveredFeatures.research && (
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Research</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(state.research).map(([key, researchItem]) => (
                        <button
                            key={key}
                            onClick={(e) => {
                                handleButtonClick(e);
                                purchaseResearch(key);
                                handleResourceChange('Research', 1, 'counter-Research')
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
                        </button>
                    ))}
                </div>
            </div>
        )}

        {/* Public Opinion */}
        {state.discoveredFeatures.publicRelations && (
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mb-6 flex items-center justify-between">
                <div className='flex items-center gap-2'>
                    {publicOpinionIcon()}
                    <h2 className="text-lg font-semibold">Public Opinion:</h2>
                </div>

                <span className="text-xl">{state.publicOpinion}</span>
            </div>
        )}

        {/* Events */}
        {state.events.active && state.discoveredFeatures.events && (
          <div className="bg-red-900/50 p-4 rounded-lg mb-6 text-center border border-red-700 transition-all animate-pulse">
            <p className="text-lg flex items-center justify-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              {state.events.type === 'resistance' && "Resistance Attack: Doses destroyed!"}
              {state.events.type === 'outcry' && "Public Outcry: Harvesting efficiency halved!"}
              {state.events.type === 'equipment' && "Equipment Failure: Automation disabled!"}
              {state.events.type === 'supply' && "Supply Disruption: Production costs doubled!"}
            </p>
          </div>
        )}

        {/* Progress */}
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex justify-between mb-2">
            <span>Conversion Progress</span>
            <span>{percentConverted}% O</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-red-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${percentConverted}%` }}
            />
          </div>
        </div>

        {/* Floating Notifications */}
        {notifications.map(n => (
          <div
            key={n.id}
            className="absolute pointer-events-none text-white text-sm p-1 rounded transition-opacity duration-1000 notification"
            style={{ top: n.top, left: n.left}}
          >
            {n.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
