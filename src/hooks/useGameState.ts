import { useState, useEffect, useCallback } from 'react';
import { GameState, INITIAL_STATE } from '../types/game';

export function useGameState() {
  const [state, setState] = useState<GameState>(INITIAL_STATE);

  // Population growth - Core mechanic that starts immediately
  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => {
        const growth = Math.max(1, Math.floor(prev.I * (prev.populationGrowthRate / 100)));
        return {
          ...prev,
          I: prev.I + growth
        };
      });
    }, 2000);  // Every 2 seconds

    return () => clearInterval(interval);
  }, [state.populationGrowthRate]); // Added populationGrowthRate to dependency array

  // Unlock features based on population growth and other conditions
    useEffect(() => {
    setState(prev => {
      const updates = { ...prev.discoveredFeatures };

      if (prev.I >= 10 && !prev.discoveredFeatures.harvesting) {
        updates.harvesting = true;
      }
      if (prev.emotionalEssence >= 30 && !prev.discoveredFeatures.production) {
        updates.production = true;
      }
      if (prev.doses >= 3 && !prev.discoveredFeatures.distribution) {
        updates.distribution = true;
      }
      if (prev.O >= 20 && !prev.discoveredFeatures.automation) {
        updates.automation = true;
      }
      if (prev.distributors >= 1 && !prev.discoveredFeatures.upgrades) {
        updates.upgrades = true;
      }
      if (prev.O >= 50 && !prev.discoveredFeatures.events) {
        updates.events = true;
      }
      if (prev.researchPoints >= 25 && !prev.discoveredFeatures.research) { // New
        updates.research = true;
      }
      if (prev.O >= 10 && !prev.discoveredFeatures.publicRelations) { // New - Unlock early
          updates.publicRelations = true;
      }

      return {
        ...prev,
        discoveredFeatures: updates
      };
    });
  }, [state.I, state.emotionalEssence, state.doses, state.O, state.distributors, state.discoveredFeatures, state.researchPoints]);

    // Auto harvesting
  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => {
        if (prev.autoHarvester === 0 || !prev.discoveredFeatures.automation) return prev; // Check for automation

        const multiplier = prev.events.type === 'outcry' ? 0.5 : 1;
        const harvested = Math.floor(
          (prev.efficiencies.harvesting * multiplier * prev.I * prev.autoHarvester) / 50
        );

        return {
          ...prev,
          emotionalEssence: prev.emotionalEssence + harvested
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.autoHarvester, state.efficiencies.harvesting, state.I, state.discoveredFeatures.automation, state.events.type]);

  // Auto production
  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => {
        if (prev.autoProducer === 0 || !prev.discoveredFeatures.automation) return prev; // Check for automation

        const cost = Math.ceil(8 / prev.efficiencies.production) *
          (prev.events.type === 'supply' ? 2 : 1);

        const maxProduction = Math.floor(prev.emotionalEssence / cost);
        const production = Math.min(maxProduction, prev.autoProducer);

        if (production <= 0) return prev;

        return {
          ...prev,
          emotionalEssence: prev.emotionalEssence - (cost * production),
          doses: prev.doses + production
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.autoProducer, state.efficiencies.production, state.emotionalEssence, state.discoveredFeatures.automation, state.events.type]);


  const harvestEssence = useCallback(() => {
    setState(prev => {
      const multiplier = prev.events.type === 'outcry' ? 0.5 : 1;
      const harvested = Math.floor(
        (prev.efficiencies.harvesting * multiplier * prev.I) / 25
      );
      return {
        ...prev,
        emotionalEssence: prev.emotionalEssence + harvested
      };
    });
  }, [state.efficiencies.harvesting, state.I, state.events.type]);

  const produceDose = useCallback(() => {
    setState(prev => {
      const cost = Math.ceil(8 / prev.efficiencies.production) *
        (prev.events.type === 'supply' ? 2 : 1);

      if (prev.emotionalEssence < cost) return prev;

      return {
        ...prev,
        emotionalEssence: prev.emotionalEssence - cost,
        doses: prev.doses + 1
      };
    });
  }, [state.efficiencies.production, state.emotionalEssence, state.events.type]);

  const distributeDose = useCallback(() => {
    setState(prev => {
      if (prev.doses < 1 || prev.I < 1) return prev;

      const numToConvert = Math.min(
        prev.efficiencies.distribution,
        prev.I
      );

      return {
        ...prev,
        doses: prev.doses - 1,
        O: prev.O + numToConvert,
        I: prev.I - numToConvert,
      };
    });
  }, [state.doses, state.I, state.efficiencies.distribution]);

  const hireDistributor = useCallback(() => {
    setState(prev => {
      const cost = 75 * (prev.distributors + 1);
      if (prev.emotionalEssence < cost) return prev;

      return {
        ...prev,
        emotionalEssence: prev.emotionalEssence - cost,
        distributors: prev.distributors + 1
      };
    });
  }, [state.distributors, state.emotionalEssence]);

  const purchaseAutoHarvester = useCallback(() => {
    setState(prev => {
      const cost = 150 * (prev.autoHarvester + 1);
      if (prev.emotionalEssence < cost) return prev;

      return {
        ...prev,
        emotionalEssence: prev.emotionalEssence - cost,
        autoHarvester: prev.autoHarvester + 1
      };
    });
  }, [state.autoHarvester, state.emotionalEssence]);

  const purchaseAutoProducer = useCallback(() => {
    setState(prev => {
      const cost = 200 * (state.autoProducer + 1);
      if (prev.emotionalEssence < cost) return prev;

      return {
        ...prev,
        emotionalEssence: prev.emotionalEssence - cost,
        autoProducer: prev.autoProducer + 1
      };
    });
  }, [state.autoProducer, state.emotionalEssence]);

  const upgradeEfficiency = useCallback((type: keyof GameState['efficiencies']) => {
    setState(prev => {
      const cost = 40 * (prev.efficiencies[type] + 1);
      if (prev.emotionalEssence < cost) return prev;

      return {
        ...prev,
        emotionalEssence: prev.emotionalEssence - cost,
        efficiencies: {
          ...prev.efficiencies,
          [type]: prev.efficiencies[type] + 1
        }
      };
    });
  }, [state.efficiencies, state.emotionalEssence]);

  // Automation loop (Distributors)
  useEffect(() => {
    if (state.distributors === 0 || !state.discoveredFeatures.automation) return; // Check for automation

    const interval = setInterval(() => {
      if (state.events.type === 'equipment') return;

      setState(prev => {
        if (prev.doses < prev.distributors || prev.I < 1) return prev;

        const numToConvert = Math.min(
          prev.efficiencies.distribution * prev.distributors,
          prev.I
        );

        return {
          ...prev,
          doses: prev.doses - prev.distributors,
          O: prev.O + numToConvert,
          I: prev.I - numToConvert,
        };
      });
    }, 1000 / state.efficiencies.automation);

    return () => clearInterval(interval);
}, [state.distributors, state.efficiencies.automation, state.events.type, state.doses, state.I, state.discoveredFeatures.automation]);

  // Random events
  useEffect(() => {
    if (!state.discoveredFeatures.events) return;

    const interval = setInterval(() => {
      if (Math.random() > 0.1) return;

      const events: GameState['events']['type'][] = ['resistance', 'outcry', 'equipment', 'supply'];
      const eventType = events[Math.floor(Math.random() * events.length)];

      setState(prev => ({
        ...prev,
        events: {
          active: true,
          type: eventType,
          timer: Date.now() + 3000
        }
      }));
    }, 10000); // Reduced to 10 seconds for testing

    return () => clearInterval(interval);
  }, [state.discoveredFeatures.events]);

  // Event timer
  useEffect(() => {
    if (!state.events.active || !state.events.timer) return;

    const timeout = setTimeout(() => {
      setState(prev => ({
        ...prev,
        events: { active: false, type: null, timer: null }
      }));
    }, state.events.timer - Date.now());

    return () => clearTimeout(timeout);
  }, [state.events.active, state.events.timer]);

    // Research Point Generation
    useEffect(() => {
        const interval = setInterval(() => {
            setState(prev => ({
                ...prev,
                researchPoints: prev.researchPoints + 1
            }));
        }, 5000); // 1 research point every 5 seconds

        return () => clearInterval(interval);
    }, []);

    // Public Opinion Changes
    useEffect(() => {
        const interval = setInterval(() => {
            setState(prev => {
                let opinionChange = 0;
                if (prev.O > prev.I) {
                    opinionChange = -1; // Negative opinion if O > I
                } else {
                    opinionChange = 0.5; // Slightly positive if I > O
                }

                // Adjust for events
                if (prev.events.type === 'outcry') {
                    opinionChange -= 2;
                } else if (prev.events.type === 'resistance') {
                    opinionChange -= 1;
                }

                const newOpinion = Math.max(-100, Math.min(100, prev.publicOpinion + opinionChange));

                return {
                    ...prev,
                    publicOpinion: newOpinion
                };
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [state.O, state.I, state.events.type]);

    const purchaseResearch = useCallback((researchKey: string) => {
        setState(prev => {
            const researchItem = prev.research[researchKey];
            if (!researchItem || researchItem.purchased || prev.researchPoints < researchItem.cost) {
                return prev; // Not enough points or already purchased
            }

            let updatedEfficiencies = prev.efficiencies;
            if (researchKey === 'improvedHarvesting1') {
                updatedEfficiencies = {
                    ...updatedEfficiencies,
                    harvesting: updatedEfficiencies.harvesting * 2
                };
            } else if (researchKey === 'improvedProduction1'){
                updatedEfficiencies = {
                    ...updatedEfficiencies,
                    production: updatedEfficiencies.production * 2
                }
            }

            return {
                ...prev,
                researchPoints: prev.researchPoints - researchItem.cost,
                research: {
                    ...prev.research,
                    [researchKey]: { ...researchItem, purchased: true }
                },
                efficiencies: updatedEfficiencies
            };
        });
    }, [state.research, state.researchPoints, state.efficiencies]);

  return {
    state,
    harvestEssence,
    produceDose,
    distributeDose,
    hireDistributor,
    purchaseAutoHarvester,
    purchaseAutoProducer,
    upgradeEfficiency,
    purchaseResearch // New
  };
}
