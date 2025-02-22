export interface GameState {
  emotionalEssence: number;
  doses: number;
  I: number;
  O: number;
  distributors: number;
  autoHarvester: number;
  autoProducer: number;
  populationGrowthRate: number;
  discoveredFeatures: {
    harvesting: boolean;
    production: boolean;
    distribution: boolean;
    automation: boolean;
    upgrades: boolean;
    events: boolean;
    research: boolean; // New
    publicRelations: boolean; // New
  };
  efficiencies: {
    harvesting: number;
    production: number;
    distribution: number;
    automation: number;
  };
  events: {
    active: boolean;
    type: 'resistance' | 'outcry' | 'equipment' | 'supply' | null;
    timer: number | null;
  };
  milestones: number[];
  gameOver: boolean;
  researchPoints: number; // New
  publicOpinion: number; // New, ranges from -100 (very negative) to 100 (very positive)
  research: { // New
    [key: string]: {
      name: string;
      cost: number;
      effect: string;
      purchased: boolean;
    };
  };
}

export const INITIAL_STATE: GameState = {
  emotionalEssence: 0,
  doses: 0,
  I: 1,
  O: 0,
  distributors: 0,
  autoHarvester: 0,
  autoProducer: 0,
  populationGrowthRate: 5,
  discoveredFeatures: {
    harvesting: false,
    production: false,
    distribution: false,
    automation: false,
    upgrades: false,
    events: false,
    research: false, // New
    publicRelations: false, // New
  },
  efficiencies: {
    harvesting: 1,
    production: 1,
    distribution: 1,
    automation: 1
  },
  events: {
    active: false,
    type: null,
    timer: null
  },
  milestones: [],
  gameOver: false,
  researchPoints: 0, // New
  publicOpinion: 50, // New, start at a neutral 50
  research: { // New
    improvedHarvesting1: {
      name: "Improved Harvesting I",
      cost: 50,
      effect: "Doubles harvesting efficiency.",
      purchased: false,
    },
    improvedProduction1: {
      name: "Improved Production I",
      cost: 75,
      effect: "Doubles production efficiency.",
      purchased: false
    }
  }
};
