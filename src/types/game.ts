export interface GameState {
  emotionalEssence: number;
  doses: number;
  I: number;
  O: number;
  distributors: number;
  autoHarvester: number;
  autoProducer: number;
  populationGrowthRate: number;
  growthAccumulator: number;
  iAccumulator: number;
  oAccumulator: number;
  discoveredFeatures: {
    harvesting: boolean;
    production: boolean;
    distribution: boolean;
    automation: boolean;
    upgrades: boolean;
    events: boolean;
    research: boolean;
    publicRelations: boolean;
  };
  efficiencies: {
    harvesting: number;
    production: number;
    distribution: number;
    automation: number;
  };
  events: {
    active: boolean;
    type: 'resistance' | 'outcry' | 'equipment' | 'supply' | 'civil war' | 'pay raise' | null;
    timer: number | null;
  };
  milestones: number[];
  gameOver: boolean;
  researchPoints: number;
  publicOpinion: number;
  research: {
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
  populationGrowthRate: 15,
  growthAccumulator: 0,
  iAccumulator: 0,
  oAccumulator: 0,
  discoveredFeatures: {
    harvesting: false,
    production: false,
    distribution: false,
    automation: false,
    upgrades: false,
    events: false,
    research: false,
    publicRelations: false,
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
  researchPoints: 0,
  publicOpinion: 50,
  research: {
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
