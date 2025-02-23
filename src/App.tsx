import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useGameState } from './hooks/useGameState';
import CoreCounters from './components/CoreCounters';
import Actions from './components/Actions';
import Automation from './components/Automation';
import Upgrades from './components/Upgrades';
import Research from './components/Research';
import PublicOpinion from './components/PublicOpinion';
import Events from './components/Events';
import { Representative } from './types/game';
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
    purchaseResearch,
    decreasePopulation, // Get the new function
    convertPopulation
  } = useGameState();

  const [notifications, setNotifications] = useState<{ id: number; text: string; top: number; left: number, icon?: React.ReactNode }[]>([]); // Added icon
  const notificationId = useRef(0);
  const [researchProgress, setResearchProgress] = useState<{ [key: string]: number }>({}); // Track research progress
  const [representatives, setRepresentatives] = useState<Representative[]>([]);
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the container

  const addNotification = (text: string, top: number, left: number, icon?: React.ReactNode) => { // Added icon parameter
    const id = notificationId.current++;
    setNotifications(prev => [...prev, { id, text, top, left, icon }]); // Store the icon
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 2000);
  };

  // Simplified handleResourceChange (no longer needs the action function)
  const handleResourceChange = (resourceName: string, amount: number, elementId: string, icon?: React.ReactNode) => { // Added icon
    const element = document.getElementById(elementId);
    if (element) {
      const rect = element.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const left = rect.left + rect.width / 2 + window.scrollX;
      addNotification(`${amount > 0 ? '+' : ''}${amount} ${resourceName}`, top - 40, left, icon); // Show notification, pass icon

      // Add dynamic size class
      element.classList.add('counter-increase');
      setTimeout(() => {
        element.classList.remove('counter-increase');
      }, 300); // Match CSS animation duration
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

  // Function to start research progress
  const startResearchProgress = (researchKey: string, duration: number) => {
    setResearchProgress(prev => ({ ...prev, [researchKey]: 0 }));
    const interval = setInterval(() => {
      setResearchProgress(prev => {
        const currentProgress = prev[researchKey] || 0;
        if (currentProgress >= 100) {
          clearInterval(interval);
          return prev;
        }
        return { ...prev, [researchKey]: currentProgress + (100 / (duration / 100)) }; // Update every 100ms
      });
    }, 100);
  };

  // Manage representatives in state (add/remove)
  useEffect(() => {
    const maxReps = 20;
    const currentIReps = representatives.filter(r => r.type === 'I').length;
    const currentOReps = representatives.filter(r => r.type === 'O').length;
    const targetIReps = Math.min(state.I / 10, maxReps);  // One 'I' rep per 10 I
    const targetOReps = Math.min(state.O / 10, maxReps); // One 'O' rep per 10 O

    let newReps = [...representatives];

    // Add or remove I representatives
    const iDiff = targetIReps - currentIReps;
    if (iDiff > 0) {
      for (let i = 0; i < iDiff; i++) {
        newReps.push({
          id: `I-${Date.now()}-${i}`,
          type: 'I',
          top: Math.random() * 100,
          left: Math.random() * 100,
          dx: (Math.random() * 2) - 1,
          dy: (Math.random() * 2) - 1,
          size: Math.min(2 + (state.I / 10) * 0.2, 10), // Scale size, max 10px
        });
      }
    } else if (iDiff < 0) {
      let iCount = 0;
      newReps = newReps.filter(rep => {
        if (rep.type === 'I') {
          iCount++;
          return iCount <= targetIReps;
        }
        return true;
      });
    }

    // Add or remove O representatives
    const oDiff = targetOReps - currentOReps;
    if (oDiff > 0) {
      for (let i = 0; i < oDiff; i++) {
        newReps.push({
          id: `O-${Date.now()}-${i}`,
          type: 'O',
          top: Math.random() * 100,
          left: Math.random() * 100,
          dx: (Math.random() * 2) - 1,
          dy: (Math.random() * 2) - 1,
          size: Math.min(2 + (state.O / 10) * 0.2, 10), // Scale size, max 10px
        });
      }
    } else if (oDiff < 0) {
      let oCount = 0;
      newReps = newReps.filter(rep => {
        if (rep.type === 'O') {
          oCount++;
          return oCount <= targetOReps;
        }
        return true;
      });
    }

    setRepresentatives(newReps);
  }, [state.I, state.O]);


  // Update representative positions (bouncing) using requestAnimationFrame
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    let animationFrameId: number;

    const updatePositions = () => {
      setRepresentatives(prevReps =>
        prevReps.map(rep => {
          let { top, left, dx, dy, size, type, id } = rep;

          // Update position based on velocity
          let newTop = top + dy * 0.5;  // Adjust speed here
          let newLeft = left + dx * 0.5;

          // Bounce off top/bottom walls (adjusting for size)
          if (newTop < 0) {
            newTop = 0;
            dy = -dy;
          } else if (newTop > (100 - (size / containerHeight) * 100)) {
            newTop = 100 - (size / containerHeight) * 100;
            dy = -dy;
          }

          // Bounce off left/right walls
          if (newLeft < 0) {
            newLeft = 0;
            dx = -dx;
          } else if (newLeft > (100 - (size / containerWidth) * 100)) {
            newLeft = 100 - (size / containerWidth) * 100;
            dx = -dx;
          }

          // Collision detection (only during events)
          if (state.events.active && (state.events.type === 'civil war' || state.events.type === 'pay raise')) {
            for (const otherRep of prevReps) {
              if (otherRep.id === rep.id) continue; // Don't collide with self

              // Simple bounding box collision detection
              const repLeft = (newLeft / 100) * containerWidth;
              const repTop = (newTop / 100) * containerHeight;
              const otherRepLeft = (otherRep.left / 100) * containerWidth;
              const otherRepTop = (otherRep.top / 100) * containerHeight;


              if (
                repLeft < otherRepLeft + otherRep.size &&
                repLeft + rep.size > otherRepLeft &&
                repTop < otherRepTop + otherRep.size &&
                repTop + rep.size > otherRepTop
              ) {
                // Collision detected!
                if (state.events.type === 'civil war') {
                  // Civil War: Both dots disappear
                  decreasePopulation(rep.type, 10); // Assuming clusterSize = 10
                  decreasePopulation(otherRep.type, 10);
                  return null; // Remove the current representative

                } else if (state.events.type === 'pay raise' && rep.type === "O" && otherRep.type === "I") {
                  // Pay Raise: Convert O to I
                  convertPopulation()
                  return { ...rep, type: "I", dx: otherRep.dx, dy: otherRep.dy, size: otherRep.size, id: rep.id }
                } else {
                  return { ...rep, top: newTop, left: newLeft, dx, dy };
                }
              }
            }
          }

          return { ...rep, top: newTop, left: newLeft, dx, dy };
        }).filter(rep => rep !== null) as Representative[] //removes null from collisions
      );

      animationFrameId = requestAnimationFrame(updatePositions);
    };

    animationFrameId = requestAnimationFrame(updatePositions);

    return () => cancelAnimationFrame(animationFrameId);
  }, [state.events.active, state.events.type, decreasePopulation, convertPopulation]);  //  dependency array is correct

  // Memoize the representative elements
  const representativeElements = useMemo(() => {
    return representatives.map((rep) => (
      <div
        key={rep.id}
        className={`w-2 h-2 rounded-full absolute ${rep.type === 'I' ? 'bg-blue-500' : 'bg-red-500'}`}
        style={{
          top: `${rep.top}%`,
          left: `${rep.left}%`,
          transform: `translate(${rep.translateX}px, ${rep.translateY}px)`,
          transition: 'transform 0.016s linear', // 60 FPS
          width: `${rep.size}px`,
          height: `${rep.size}px`,
          opacity: rep.type === 'I' ? Math.min(1, 0.3 + (rep.size / 10) * 0.7) : Math.min(1, 0.3 + (rep.size / 10) * 0.7), // Adjust opacity based on size
        }}
      />
    ));
  }, [representatives]);



  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 transition-colors duration-500" style={{ backgroundColor: backgroundColor }}>
      <div className="max-w-6xl mx-auto relative"> {/* Added relative for absolute positioning of notifications */}
        <h1 className="text-4xl font-bold mb-6 text-center" style={{ color: textColor }}>
          I O 5-6
        </h1>

        {/* Core Counters */}
        <CoreCounters
          I={state.I}
          O={state.O}
          emotionalEssence={state.emotionalEssence}
          doses={state.doses}
          distributors={state.distributors}
          researchPoints={state.researchPoints}
          discoveredFeatures={state.discoveredFeatures}
        />

        {/* Actions */}
        <Actions
          state={state}
          harvestEssence={harvestEssence}
          produceDose={produceDose}
          distributeDose={distributeDose}
          hireDistributor={hireDistributor}
          handleButtonClick={handleButtonClick}
          handleResourceChange={handleResourceChange}
        />

        {/* Automation */}
        <Automation
          state={state}
          purchaseAutoHarvester={purchaseAutoHarvester}
          purchaseAutoProducer={purchaseAutoProducer}
          handleButtonClick={handleButtonClick}
          handleResourceChange={handleResourceChange}
        />

        {/* Upgrades */}
        <Upgrades
          state={state}
          upgradeEfficiency={upgradeEfficiency}
          handleButtonClick={handleButtonClick}
          handleResourceChange={handleResourceChange}
        />

        {/* Research */}
        <Research
          state={state}
          researchProgress={researchProgress}
          startResearchProgress={startResearchProgress}
          purchaseResearch={purchaseResearch}
          handleButtonClick={handleButtonClick}
          handleResourceChange={handleResourceChange}
          setResearchProgress={setResearchProgress}
        />

        {/* Public Opinion */}
        <PublicOpinion
          state={state}
          publicOpinionIcon={publicOpinionIcon}
        />

        {/* Events */}
        <Events state={state} />

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
            style={{ top: n.top, left: n.left }}
          >
            {n.icon} {n.text}
          </div>
        ))}
      </div>
      {/* Wandering Representatives */}
      <div className="border border-gray-700 rounded-lg p-4 mt-6 h-64 relative overflow-hidden">
        <div ref={containerRef} className="absolute inset-0">
          {representativeElements}
        </div>
        <p className="text-center text-gray-400">Population Dynamics</p>
      </div>
    </div>
  );
}

export default App;
